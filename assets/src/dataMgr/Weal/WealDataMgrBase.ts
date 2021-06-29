
/**
* 
*	
* 保存服务器的发送的数据
* 
*  1.socket读取二进制数据----》
*  2.二进制数据转换为proto-------》 
*  3.抛出协议事件 -------》 
*  4.各个系统的dataMgr侦听事件，接收并保存服务器发过来的数据 ------》 
*  5.dataMgr抛出数据整理好的CmdEvent事件  -------》 
*  6.各个ui侦听CmdEvent事件，向各个系统的dataMgr提供的方法接口获取最新的数据，更新ui显示
* 
*  ui不负责直接侦听服务器数据事件， 也不负责保存服务器数据，
*  由各个系统的dataMgr统一管理
* 
*/

module Pro
{
	export class WealDataMgrBase
	{
		constructor()
		{

		}

		/////////////////////////////
		///////////////////////////签到
		/** 签到天数*/
		public signinDays: number;
		/** 签到状态*/
		public signinState: Pb_God._emWealSigninState;
		/** 点金次数 */
		protected _clickGoldCountMap: ds.StringMap<number> = new ds.StringMap<number>();
		/** 点金下次重置时间 */
		public clickGoldNextResetTime: number = 0;

		/** 在线奖励已经领取的进度 */
		public onlinePrizeIndex = 0;

		/**离线找回数据*/
		public FindBacks: Pb_God.PBFindBackData[];
		/**玩家离线天数*/
		public OfflineDay: number;
		/**玩家找回天数*/
		public FindBackDay: number;

		/**
		 * 玩家返利活动充值的金额
		 */
		public player_rebateMoney: number;
		/**
		 * 玩家返利活动领取状态
		 */
		public player_rebateState: Pb_God.player_FanLi_State;

		public init(data: Pb_God.PBPlayerWeal): void
		{
			this.signinDays = data.signin.signinDays;
			this.signinState = data.signin.signinState;
			if (data.fanli)
			{
				this.player_rebateMoney = data.fanli.money;
				this.player_rebateState = data.fanli.state;
			}

			this._clickGoldCountMap.clear();
			this.clickGoldNextResetTime = data.clickgold.resettime;
			for (var el of data.clickgold.info)
			{
				this._clickGoldCountMap.put(el.type, el.times);
			}

			this.onlinePrizeIndex = data.onlineprize;

			this.initRedDotModel();
		}

		/** 隔日重置数据 */
		public resetNewDay(): void
		{
			//签到
			this.signinState = Pb_God._emWealSigninState.Weal_Signin_Available;
			this.reddotModel.refreshChild("signin");
		}

		/** 隔月重置数据 */
		public resetNewMonth(): void
		{
			//签到
			this.signinDays = 0;
		}

		/** 点金剩余次数 */
		public getClickGoldLeftCountByType(type: number): number
		{
			let useCount = this._clickGoldCountMap.get(type) || 0;
			let activeAddCount = 0;
			//活动额外增加次数
			let actData = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_ClickGold);
			if (actData)
				activeAddCount = parseInt(cfg.ActivityCfgData.getParamByID(actData.id).split(";")[type] || "0");
			return cfg.WealClickgoldCfgData.getMaxTimesByType(type) + activeAddCount - useCount;
		}

		/** 获取在线礼包下一档奖励的倒计时（如果返回0，则表示当前奖励可以领了, 如果返回-1，表示已经没有奖励了） */
		public getOnlinePrizeNextTime(): number
		{
			let allCfgList = cfg.WealOnlinePrizeCfgData.getAll();
			let nextCfgInfo = allCfgList[this.onlinePrizeIndex];
			if (!nextCfgInfo) return -1; //没有了
			let onlineTime = this.getOnlineTime();
			if (nextCfgInfo.time <= onlineTime) return 0;
			return nextCfgInfo.time - onlineTime;
		}

		/** 获取在线礼包下档奖励目标时间(并非当前奖励的倒计时，而是所有奖励中最近的倒计时，如果返回0，则表示所有的奖励的时间都到了，不需要倒计时了) */
		public getOnlinePrizeAllNextTargetTime(): number
		{
			let allCfgList = cfg.WealOnlinePrizeCfgData.getAll();
			let onlineTime = this.getOnlineTime();
			for (let i = this.onlinePrizeIndex; i < allCfgList.length; i++)
			{
				let cfgInfo = allCfgList[i];
				if (cfgInfo.time > onlineTime) return TimeController.currTimer / 1000 + cfgInfo.time - onlineTime;
			}
			return 0;
		}

		/** 在线时间(秒) */
		public getOnlineTime(): number
		{
			//服务器同学说的用createtime
			return TimeController.currTimer / 1000 - PlayerDataMgr.createTime;
		}


		/** 在线奖励是否已经全部领完 */
		public getOnlinePrizeOver(): boolean
		{
			let allCfgList = cfg.WealOnlinePrizeCfgData.getAll();
			return allCfgList[allCfgList.length - 1].index <= this.onlinePrizeIndex;
		}

		public getLastOnlineAward(): cfg.AddItemInfo
		{
			let allCfgList = cfg.WealOnlinePrizeCfgData.getAll();
			var lastInfo: cfg.WealOnlinePrizeCfgInfo;
			for (var index = this.onlinePrizeIndex; index < allCfgList.length; index++)
			{
				var cfgInfo: cfg.WealOnlinePrizeCfgInfo = allCfgList[index];
				let isGet = WealDataMgr.onlinePrizeIndex >= cfgInfo.index;
				//是否可以领取
				let isCanGet = false;
				isCanGet = cfgInfo.time <= WealDataMgr.getOnlineTime();
				if (isCanGet)
				{
					lastInfo = cfgInfo;
				} else
				{
					break;
				}
			}

			if (lastInfo)
			{
				return cfg.WealOnlinePrizeCfgData.getAddItemInfoByInfo(lastInfo);
			} else
			{
				let cfgInfo = cfg.WealOnlinePrizeCfgData.getInfo(WealDataMgr.onlinePrizeIndex + 1);
				return cfg.WealOnlinePrizeCfgData.getAddItemInfoByInfo(cfgInfo);
			}
		}


		///////////////////// 红点 //////////////////////////
		public reddotModel: RedDotModel = new RedDotModel();
		public reddotModelClickGold: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			//点金（有免费次数）
			this.reddotModelClickGold.cleanUp(true);
			this.reddotModelClickGold.setSystemSwitchId(emSystemSwitchType.ClickGold);
			this.reddotModelClickGold.setupCheckMethod(this, this.checkClickGoldReddot);

			this.reddotModel.cleanUp(true);
			//签到
			let reddot = this.reddotModel.addChildModel("signin");
			reddot.setSystemSwitchId(emSystemSwitchType.Weal);
			reddot.addGlobalEventRefresh(CmdEvent.Common_AddRecharge);  //监听当天充值变化
			reddot.setupCheckMethod(this, this.checkSigninReddot);

			//签到
			let FindBacks = this.reddotModel.addChildModel("resourcesBack");
			FindBacks.addGlobalEventRefresh(CmdEvent.ResourceFindBack_GetInfo);  //监听找回资源数据变化
			FindBacks.setupCheckMethod(this, this.FindBacksReddot);
		}

		/** 点金红点 */
		private checkClickGoldReddot(reddotModel: RedDotModel): boolean
		{
			for (var el of cfg.WealClickgoldCfgData.getAll())
			{
				if (el.needItem) continue; //只算免费的
				if (this.getClickGoldLeftCountByType(el.type) > 0)
				{
					return true;
				}
			}
			return false;
		}

		/** 签到红点 */
		private checkSigninReddot(reddotModel: RedDotModel): boolean
		{
			if (this.signinState == Pb_God._emWealSigninState.Weal_Signin_Complete)
			{
				reddotModel.pauseAllGlobalEvents();
				return false;
			}
			if (this.signinState == Pb_God._emWealSigninState.Weal_Signin_Available) return true;
			reddotModel.pauseAllGlobalEvents(false);
			if (PlayerDataMgr.todayrecharge > 0) return true;
			return false;
		}

		/**资源找回红点 */
		public FindBacksReddot(reddotModel: RedDotModel): boolean
		{
			if (this.FindBacks && this.FindBacks.length > 0)
			{
				for (var index = 0; index < this.FindBacks.length; index++)
				{
					var element = this.FindBacks[index];
					if (element.Status == 1)
						return true
				}

			}
			return false;

		}
	}

}
