
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
	export class HookDataMgrBase
	{
		/** data */
		protected _data: Pb_God.PBPlayerHook;

		/** 快速作战特权特效显示(点一次后消失) */
		public quickFightPrivilegeClick = false;

		/**是否经历过了战败引导  1经历过 2没经历*/
		public failGuideState = 1;

		/** 初始化 */
		public init(data: Pb_God.PBPlayerHook)
		{
			this._data = data;
			this.quickFightPrivilegeClick = false;
			this.initRedDotModel();
		}

		public resetNewDay(): void
		{
			this._data.daubuysweepcount = 0;
			this._data.dayfreesweepcount = 0;
		}

		/** 获取玩家当前所在挂机场景ID */
		public getSceneID(): number
		{
			return this._data.sceneid;
		}

		/** 获取当前战斗ID */
		public getStageID(): number
		{
			return this._data.stageid;
		}

		/** 获取开始时间 */
		public getBegintime(): number
		{
			return this._data.begintime;
		}

		// /** 获取下次战斗时间 */
		// public getNextFightTime():number{
		// 	return this._data.nextfighttime;
		// }

		/** 挂机领取奖励间隔时间 */
		public getRewardDurtion(): number
		{
			return 60000;
		}

		/** 挂机最大累计时长 */
		public getHookRewardMaxTime(): number
		{
			return (cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Hook, Pb_God._emConstant_Hook.C_Hook_MaxProfitTime) +
				PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_HookTime)) * 60;
		}

		/** 获取挂机时间奖励 */
		public getHookRewardTime(): number
		{
			return TimeController.currTimer - this.getBegintime() * 1000;
		}

		/** 获取关卡奖励是否已经领取 */
		public isStageRewarded(id: number): boolean
		{
			return this._data.stageprize.indexOf(id) >= 0;
		}

		/** 判断关卡奖励是否可以领取 */
		public isStegeCanReward(id: number): boolean
		{
			return this.getStageID() >= id;  //this.getPrizestageid() >= id && 
		}

		// delete by jason 2019-11-21  陈亮说prizestageid这个字段只是服务器存储用的，前端不要用。
		// /**领奖的基础关卡*/
		// public getPrizestageid():number{
		// 	return this._data.prizestageid;
		// }
		// end delete

		/**快速作战免费次数*/
		public getDayfreesweepcount(): number
		{
			let ret = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Hook, Pb_God._emConstant_Hook.C_Hook_DayFreeSweepCount) +
				PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_HookFreeCount) +
				PrivilegeDataMgr.getPrivilegeCardValue(Pb_God._emPrivilegeCard.PrivilegeCard_Hook, Pb_God._emPrivilegeType.PrivilegeType_HookFreeCount) -
				this._data.dayfreesweepcount;
			//活动额外增加2次免费次数			
			let actData = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Raid);
			if (actData)
				ret += parseInt(cfg.ActivityCfgData.getParamByID(actData.id).split(";")[1] || "0");
			return ret;
		}
		/**快速作战购买次数*/
		public getDaybuysweepcount(): number
		{
			return this._data.daubuysweepcount;
		}
		/**每日购买次数 */
		public getDayMaxBuyCount(): number
		{
			let ret = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Hook, Pb_God._emConstant_Hook.C_Hook_DayBuySweepCount) +
				PrivilegeDataMgr.getPrivilegeCardValue(Pb_God._emPrivilegeCard.PrivilegeCard_Hook, Pb_God._emPrivilegeType.PrivilegeType_HookExtraBuyCount) +
				PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_HookExtraBuyCount);
			//活动额外增加4次购买次数
			let actData = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Raid);
			if (actData)
				ret += parseInt(cfg.ActivityCfgData.getParamByID(actData.id).split(";")[2] || "0");
			return ret;
		}

		/** 当前领取挂机奖励远航是否超越上限 */
		public getHookRewardOutOfSailLimit(): boolean
		{
			let tmpCurrStageId = this.getStageID() > 0 ? this.getStageID() : 1;
			let tmpStageBossID = cfg.HookStageCfgData.getHookDropIDByStageID(tmpCurrStageId);
			let tmpHoldList = cfg.DropDropCfgData.getAddItemAryById(tmpStageBossID);
			let tmpSailInfo = tmpHoldList.filter(element => element.itemid == CfgID.ItemID.SailPoint)[0];
			let tmpPassTime = Math.floor(Math.min(this.getHookRewardTime() / 1000, 43200) / 60);
			let tmpSailGetNum = tmpSailInfo.itemcount * tmpPassTime;
			return Global.getItemNum(CfgID.ItemID.SailPoint) + tmpSailGetNum > SailDataMgr.getSailMaxPoint();
		}

		/** 当前快速作战奖励远航是否超越上限 */
		public getQuickRewardOutOfSailLimit(): boolean
		{
			let tmpCurrStageId = this.getStageID() > 0 ? this.getStageID() : 1;
			let tmpStageBossID = cfg.HookStageCfgData.getHookDropIDByStageID(tmpCurrStageId);
			let tmpHoldList = cfg.DropDropCfgData.getAddItemAryById(tmpStageBossID);
			let tmpSailInfo = tmpHoldList.filter(element => element.itemid == CfgID.ItemID.SailPoint)[0];
			let tmpPassTime = 120;
			let tmpSailGetNum = tmpSailInfo.itemcount * tmpPassTime;
			return Global.getItemNum(CfgID.ItemID.SailPoint) + tmpSailGetNum > SailDataMgr.getSailMaxPoint();
		}

		///////////////////// 红点 //////////////////////////
		/** 通关奖励红点 */
		public reddotModelPassReward: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			this.reddotModelPassReward.cleanUp(true);
			this.reddotModelPassReward.setupCheckMethod(this, this.getIsHavePassReward);
		}
		/** 获取是否有通关奖励可以领取 */
		public getIsHavePassReward(): number
		{
			let tmpCfgList = cfg.HookStagePrizeCfgData.getDataList();
			for (let i = 0; i < tmpCfgList.length; i++)
			{
				let tmpInfo = tmpCfgList[i];
				if (this.isStegeCanReward(tmpInfo.stageID))
				{
					if (!this.isStageRewarded(tmpInfo.stageID))
					{
						return 1;
					}
				}
				else
				{
					return 0;
				}
			}
		}
	}
}
