
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
	export class PlayerDataMgrBase
	{

		//---------------------------基本信息--------------------------------
		/*** uid 对应角色ID(playerid,roleId)*/
		public uid: number = 0;
		/** 世界ID*/
		public worldid: number = 0;
		/** 服务器id */
		public logicworldid: number = 0;
		/** 名称 */
		public uname: string = "";
		/** 账号ID */
		public accountid: number = 0;
		/** 昵称（微信） */
		public nickName: string = "";
		/** 性别（0男1女） */
		public gender: number = 0;
		/** 玩家等级 */
		private _level: number = -1;
		/** 当前战斗力 */
		public fightPower: number = 0;
		/** 历史最高战斗力 */
		public maxfightPower: number = 0;

		/** 今天充值总额 */
		public todayrecharge = 0;
		/** 累计充值 */
		public totalrecharge = 0;

		/** 已经改名的次数 */
		public renamecount = 0;

		/** 开放功能列表 sysId -> openTime */
		protected _systemSwitchOpenMap = new ds.StringMap<number>();
		/** 已经领奖的功能开放id映射 */
		protected _systemPrizeMap = new ds.StringMap<number>();
		/** 记录首次在挂机界面提示快速挑战特权 */
		public recordQuickFightPrivilge = 0;

		//---------------------------其他信息--------------------------------
		/** 玩家基础数据 <number,Long>*/
		private expends: ds.StringMap<number> = new ds.StringMap<number>();
		/** 是否属于GM */
		public isGM: boolean = false;
		/**创建账号时间(全服) */
		public createAccountTime: number = 0;
		/**创建角色时间 */
		public createTime: number = 0;
		/** 记录玩家登陆天数 */
		public playerLoginDays: number = 0;
		/** 记录开服天数 */
		public serverOpenDays: number = 0;
		/** 上次登陆的时间 */
		public lastLoginTime = 0;

		/** 玩家问卷调查答题进度 */
		public questionIndex = 0;
		/** 今日举报次数 */
		public todayComplainCount = 0;
		/** 最后一次举报的时间 */
		public complainLastTime = 0;

		constructor()
		{

		}

		/** 初始化当前玩家的基本信息 */
		public initPlayerInfo(playerBase: Pb_God.PBPlayerBase, account: Pb_God.PBAccount, systemswitch: Pb_God.PBPlayerSysteSwitch, worldCreateTime: Long): void
		{

			let playerdisplay = playerBase.playerdisplay;

			this.isGM = account.isgmlogin;
			this.createAccountTime = account.createTime;
			this.createTime = playerBase.createtime;
			this.uid = playerdisplay.playerid;
			this.worldid = playerdisplay.worldid;
			this.logicworldid = playerdisplay.logicworldid;
			this.uname = account.accountflag.accountname;
			this.accountid = playerBase.accountid;
			this.nickName = playerdisplay.playername;
			this._level = playerdisplay.level;
			this.fightPower = playerBase.fightpower;
			this.maxfightPower = playerBase.maxfightpower;
			this.todayrecharge = playerBase.todayrecharge;
			this.totalrecharge = playerBase.totalrecharge;
			this.gender = playerdisplay.gender;
			this.renamecount = playerBase.renamecount;
			this.lastLoginTime = playerBase.oldlogintime;

			//开放的功能
			//兼容旧账号数据，先拿id列表
			this._systemSwitchOpenMap = Global.listToStringMap(systemswitch.systemid);
			for (var openTime of systemswitch.opentime)
			{
				this._systemSwitchOpenMap.put(openTime.key, openTime.value);
			}
			this._systemPrizeMap = Global.listToStringMap(systemswitch.prize);
			//清理记录的数据
			this.recordQuickFightPrivilge = 0;

			//记录数据解析时的登陆天数\及开服天数
			this.playerLoginDays = this.getRegistDay(this.createTime);
			this.serverOpenDays = this.getRegistDay(worldCreateTime.toNumber());

			//道具
			this.expends.clear();
			playerBase.expend.forEach(element =>
			{
				this.setExpendsNum(element.expendtype, Global.longToNumber(element.value));
			});
		}

		/** 隔日重置数据 */
		public resetNewDay(): void
		{
			this.todayrecharge = 0;
		}

		/** 获取玩家账号注册天数 */
		public getRegistDay(startTime: number)
		{
			let registerZero = Global.getZeroTimeNumber(startTime * 1000);
			return Global.getPassDaysTime(registerZero);
		}

		//----------------------------------消耗品逻辑------------------------------------
		/** 获取消耗品是否足够 */
		public isExpendFull(fID: number, value: number): boolean
		{
			let tempValue = this.getExpendNum(fID);
			return tempValue >= value;
		}

		/** 获取消耗品个数 */
		public getExpendNum(fID: number): number
		{
			let tempData = this.expends.get(fID);
			if (tempData == null)
			{
				return 0;
			}

			return tempData;
		}

		/** 设置消耗品个数 */
		public setExpendsNum(fID: number, value: number)
		{

			this.expends.put(fID, value);
		}

		/** 是否可以消耗消耗品 */
		public costExpendNum(fID: number, value: number, pushEvent: boolean = true): boolean
		{
			let tempNum = this.getExpendNum(fID);
			if (value > 0 && value > tempNum)
			{
				return false;
			}
			let tempNewNum = tempNum - value;
			this.setExpendsNum(fID, tempNewNum);
			if (pushEvent)
			{
				EventMgr.trigger(EventNotify.PlayerItemNumChange, fID, tempNewNum);
			}
			//数据上报-货币消耗
			if (fID == CfgID.ItemID.Diamond)
			{
				ThirdMgr.report37SDKData(GameDataType.INGOT_CONSUME);
			}
			return true;
		}

		//----------------------------------玩家名称 -----------------------------------
		/**
		 * 获取玩家名称
		 */
		public get name()
		{
			if (this.nickName)
			{
				return this.nickName;
			}
			if (this.uname)
			{
				return this.uname;
			}
			return "user" + this.uid;
		}

		/**
		 * 设置玩家名称
		 */
		public set name(name: string)
		{
			this.nickName = name;
		}

		/** 缓存升级提示弹窗的数据， 将界面数据缓存，有以下两个作用
		 * 1. 将多次升级提示，合并成1个，避免界面过多的循环弹出
		 * 2. 开启此缓存时，收集之后接收到的功能开放协议，将对应的功能开放按钮放到升级界面内显示
		 */
		private _openLevelUpUIData: Pro.PlayerLevelUpOpenUIData;

		/** 处理延后需要弹出的升级提示框 */
		public handerWaitLevelUpPopUp(): void
		{
			let uiData = this._openLevelUpUIData;
			if (uiData && !uiData.isClose && uiData.isDelayWaitOpen)
			{
				uiData.isDelayWaitOpen = false;
				UIManager.Inst.pushAutoQueue(uiData);
			}
		}

		public getLevelUpUIOpenState(): boolean
		{
			if (!this._openLevelUpUIData)
			{
				return false;
			}
			return !this._openLevelUpUIData.isClose;
		}

		//----------------------------------玩家等级 -----------------------------------
		public setLevel(value: number, doing: Pb_God._emDoingType)
		{
			if (this._level == value)
			{
				return;
			}
			let oldValue = this._level;
			this._level = value;

			if (oldValue < 0)
			{
				return;
			} //第一次初始化，不算升级。
			if (value > oldValue)
			{ // 升级提示  // && !GuideMgr.Inst.getInAllGuide()
				FuncGuideMgr.Inst.checkGuideByLevelup(oldValue, value);
				let uiData = this._openLevelUpUIData;
				if (uiData && !uiData.isClose)
				{
					uiData.newLevel = value;
				} else
				{
					this._openLevelUpUIData = uiData = new PlayerLevelUpOpenUIData();
					uiData.oldLevel = oldValue;
					uiData.newLevel = value;
					//服务端会先把升级的消息推送，再推战斗结算，而且不好修改，但是策划要求要先弹出结算界面后再弹升级界面，所以这里需要一个等待。
					if (doing == Pb_God._emDoingType.DoingType_HookBoss)
					{
						//不弹窗，延时等待其它地方调用
						uiData.isDelayWaitOpen = true;
					} else
					{
						uiData.isDelayWaitOpen = false;
						UIManager.Inst.pushAutoQueue(uiData);
					}
				}
				//数据上报-玩家升级
				{
					ThirdMgr.report37SDKData(GameDataType.ROLE_UPDATE);
					ThirdMgr.reportH5SDKData(UploadSceneValue.UPLEVEL);
				}
				//Q1数据上报-玩家升级
				{

					ThirdMgr.sdkSystem.trackLevelUp();
				}
			}
			EventMgr.trigger(EventNotify.PlayerLevelChange, oldValue, value);

		}

		public get level(): number
		{
			return this._level;
		}

		//-------------------------------------------------功能开放-------------------------
		/** 设置功能开放 */
		public setSystemSwitchOpen(systemId: number, openTime: number): void
		{
			if (this.checkSystemSwitchOpen(systemId))
			{
				return;
			}  //已经开启了(或许是关联了相同功能的另外一个ID开启了)
			this._systemSwitchOpenMap.put(systemId, openTime);

			let systemCfgInfo = cfg.SystemSwitchSystemSwitchCfgData.getInfo(systemId);
			//先检查全局开关
			if (systemCfgInfo.open != 0)
			{
				return;
			}

			//开启引导前看看当前升级界面是不是正在显示或者准备显示中，把数据记下来，便于重新开启
			let levelupUIData = this._openLevelUpUIData;
			if (levelupUIData && levelupUIData.isClose)
			{
				levelupUIData = null;
			}
			//设置功能开放引导， 此方法内有处理：如果能正常开启，则会将当前界面与新手前期的引导中断。
			let isGuide = FuncGuideMgr.Inst.setFuncPreGuideBySystemId(systemId);
			//是否推送功能开启
			//功能开启弹窗规则： 与接收到玩家升级消息异步进行，最后合并到同一界面上显示，
			//收到玩家升级的消息时，做个标记，开始收集功能开放id， 同时将弹窗加入队列中，  直到界面关闭才停止收集功能开启提示。
			//若收到功能开启提示时，没有玩家升级为前提，则单独弹窗提示功能开启。
			if (systemCfgInfo.remindSwitch/* && !GuideMgr.Inst.getGuideStatue(false,false)*/)
			{
				if (levelupUIData)
				{
					//记录到升级提示的功能开放列表中
					levelupUIData.openSystemSwitchIds.push(systemId);
					//如果开启了功能引导，当前的升级界面需要重新拉起来
					if (isGuide)
					{
						levelupUIData.isClose = false;
						if (!levelupUIData.isDelayWaitOpen)
						{
							UIManager.Inst.forceOpen(levelupUIData);
						}
					}
				} else if (!GuideMgr.Inst.getGuideStatue(false, false))
				{
					//弹功能开放提示
					Laya.timer.once(500, null, () =>
					{
						UIManager.Inst.pushAutoQueue(new BaseOpenUIData(PanelNotify.Open_SystemSwitchOpen, systemId))
					});
					;
				}
			}
			// else if (isGuide && systemCfgInfo.stage == 0 && systemCfgInfo.level == 0) { //不弹功能开放提示时，如果是关卡开放或者等级开放的，还要等关卡结算界面结束之后再触发引导
			// 	FuncGuideMgr.Inst.checkStartFuncOpenGuide();
			// }

			EventMgr.trigger(EventNotify.System_Switch_Open_Update, systemId);
		}

		/** 检查功能是否开放
		 * @param isTipsCondition 未达到开启条件时是否提示对应的开启条件
		 * @param isNoOpenTips 功能未打开时，是否需要提示功能未开启
		 */
		public checkSystemSwitchOpen(id: Pro.emSystemSwitchType, isTipsCondition: boolean = false, isNoOpenTips: boolean = true): boolean
		{
			let cfgInfo = cfg.SystemSwitchSystemSwitchCfgData.getInfo(id);
			if (!cfgInfo)
			{
				return true;
			}
			//先检查全局开关
			if (cfgInfo.open != 0)
			{
				if (isTipsCondition && isNoOpenTips)
				{
					TipsUtils.showTipsByLanId("common_system_noOpen");
				}
				return false;
			}
			if (cfgInfo.noCondition)
			{
				return true;
			}
			//此id关联相同功能的id列表，只要有一个开启了，就算此功能已开启
			let ids = cfg.SystemSwitchSystemGroupCfgData.getCombineIds(id);
			for (var elId of ids)
			{
				if (this._systemSwitchOpenMap.get(elId))
				{
					return true;
				}
			}
			if (isTipsCondition)
			{
				this.showSystemOpenTips(cfgInfo);
			}
			return false;
		}

		public getSystemOpenTimer(systemId: emSystemSwitchType): number
		{
			return this._systemSwitchOpenMap.get(systemId) || 0;
		}

		/** 设置功能开放的奖励领取状态 */
		public setSystemPrizeState(systemId: number): void
		{
			this._systemPrizeMap.put(systemId, systemId);
		}

		/** 功能开放的奖励是否已经领取完 */
		public getSystemPrizeState(systemId: number): boolean
		{
			return !!this._systemPrizeMap.get(systemId);
		}

		/** 功能开放提示(弹出文字较长的tips，比如“玩家等级达到10级开启”) */
		public showSystemOpenTips(cfgInfo: cfg.SystemSwitchSystemSwitchCfgInfo): void
		{
			if (!cfgInfo)
			{
				return;
			}
			let conditions: string[] = [];
			if (cfgInfo.level)
			{
				conditions.push(Global.getLangStr("system_tips_msg1", cfgInfo.level));
			}
			if (cfgInfo.stage)
			{
				conditions.push(Global.getLangStr("system_tips_msg2", cfgInfo.stage));
			}
			if (cfgInfo.worldLevel)
			{
				conditions.push(Global.getLangStr("system_tips_msg3", cfgInfo.worldLevel));
			}
			if (cfgInfo.loginDays)
			{
				conditions.push(Global.getLangStr("system_tips_msg4", cfgInfo.loginDays));
			}
			let tips = conditions.join(Global.getLangStr("common_and")) + Global.getLangStr("system_tips_msg");
			TipsUtils.showTips(tips);
		}

		/** 获取短文字显示的功能开放文字描述（比如“10级开启”） */
		public getSystemOpenShortString(cfgInfo: cfg.SystemSwitchSystemSwitchCfgInfo): string
		{
			if (cfgInfo.level > 0)
			{
				return Global.getLangStr("system_msg1", cfgInfo.level);
			} else if (cfgInfo.stage > 0)
			{
				return Global.getLangStr("system_msg2", cfgInfo.stage);
			} else if (cfgInfo.loginDays > 0)
			{
				return Global.getLangStr("system_msg3", cfgInfo.loginDays);
			}
			return "";
		}

		/** 获取最近可领奖状态的功能预览 */
		public getCanGetPrizeSystemInfo(): cfg.SystemSwitchSystemSwitchCfgInfo
		{
			let allCfgList = cfg.SystemSwitchSystemSwitchCfgData.getSortList();
			for (var ele of allCfgList)
			{
				if (ele.open)
				{
					continue;
				}
				if (!ele.remindSwitch)
				{
					continue;
				}
				if (ele.sort == 0)
				{
					continue;
				}  //策划要求sort是0的也不要做功能预览显示
				if (this.checkSystemSwitchOpen(ele.iD))
				{
					//找到一个未领奖的，就O了
					if (ele.addItem && !this.getSystemPrizeState(ele.iD))
					{
						return ele;
					}
				}
			}
			return null;
		}

		/** 获取后续即将开放的功能 */
		public getNextOpenSystemSwitchInfo(): cfg.SystemSwitchSystemSwitchCfgInfo
		{
			let allCfgList = cfg.SystemSwitchSystemSwitchCfgData.getSortList();
			let lastOne: cfg.SystemSwitchSystemSwitchCfgInfo = null;
			for (var ele of allCfgList)
			{
				if (ele.open)
				{
					continue;
				}
				if (!ele.remindSwitch)
				{
					continue;
				}
				if (ele.sort == 0)
				{
					continue;
				}  //策划要求sort是0的也不要做功能预览显示
				lastOne = ele;
				if (this.checkSystemSwitchOpen(ele.iD))
				{
					continue;
				}
				return ele;
			}
			return null;
		}
	}
}