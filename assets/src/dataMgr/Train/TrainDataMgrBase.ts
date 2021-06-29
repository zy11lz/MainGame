
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
	export class TrainDataMgrBase
	{
		/** 所有数据 */
		protected _data: Pb_God.PBPlayerTrain;
		/** 试炼塔领奖状态 */
		protected _towerPrizeState = new ds.StringMap<number>();
		/** 试炼塔数据（拆开成两个不同的类型了） */
		protected _towerData = new ds.StringMap<Pb_God.PBPlayerTrainTower>();

		/** 无尽试炼战斗过程中，记录每一场战斗的奖励数据，在最后战斗结算时再统一取出来显示 */
		private _saveEndlessTowerBattlePrizes: cfg.AddItemInfo[];

		/** 巅峰挑战购买buff的数量 */
		protected _peakBuyBuffCount = 0;

		/** 初始化 */
		public init(data: Pb_God.PBPlayerTrain)
		{
			this._data = data;

			//初始化试炼塔数据
			this._towerData.clear();
			this._towerPrizeState.clear();
			for (let tower of data.towers)
			{
				this._towerData.put(tower.type, tower);
				Global.listToStringMap(tower.prizestage, this._towerPrizeState, false);
			}

			this._peakBuyBuffCount = data.peak.buff.length;
			this.resetPeakOpenDay();
			this.initRed();
		}

		/** 试炼塔红点(拆成两个试炼塔了) */
		public reddotModelTower: RedDotModel = new RedDotModel();
		/** 巅峰挑战红点 */
		public reddotModelPeak: RedDotModel = new RedDotModel();
		private initRed(): void
		{
			this.reddotModelTower.cleanUp(true);
			this.initTowerReddot(1, emSystemSwitchType.StarTower);
			this.initTowerReddot(2, emSystemSwitchType.StarTower2);

			//巅峰挑战红点
			this.reddotModelPeak.cleanUp(true);
			this.reddotModelPeak.setSystemSwitchId(emSystemSwitchType.Peak);
			this.reddotModelPeak.setupCheckMethod(this, this.checkReddotPeak);
		}

		/** 试炼塔红点（有多个） */
		private initTowerReddot(type: number, systemType: emSystemSwitchType): void
		{
			let reddotByType = this.reddotModelTower.addChildModel(type);
			//挑战红点
			let reddot = reddotByType.addChildModel("figthState", null, type);
			reddot.setSystemSwitchId(systemType);
			reddot.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "TowerTodayFaild" + type);
			reddot.addGlobalEventRefresh(CmdEvent.Train_TowerBuyCount);
			reddot.addGlobalEventRefresh(CmdEvent.Train_TowerFightCount);
			reddot.setupCheckMethod(this, () =>
			{
				//还有挑战次数(策划新要求只要有扫荡次数就显示红点 其它不显示)
				if (this.getTowerDayLastFightCount(type) > 0) return true;
				//未通关前， 今天还没有挑战到失败 （策划要求当天如果还一直没有失败过的话，红点会一直亮起，直接打不过了或者全部通关为止） 
				// if (TodayRepeatOpMgr.Inst.getTag("TowerTodayFaild" + type)) return false;
				// if (TrainDataMgr.getTowerStageID(type) >= cfg.TrainTowerCfgData.getMaxStage(type)) return false;
				return false;
			});
			//试炼塔领奖红点
			reddot = reddotByType.addChildModel("reward");
			reddot.setSystemSwitchId(systemType);
			reddot.addGlobalEventRefresh(CmdEvent.Train_TowerPrize);
			reddot.addGlobalEventRefresh(Cmd.S2C_Video_QueryTowerAck.cmdName);
			reddot.setupCheckMethod(this, this.checkReddotRewards);
		}

		/** 跨时间 */
		public resetNewDay()
		{
			//重置爬塔数据
			this.getTowerData(1).daybuycount = 0;
			this.getTowerData(1).dayfightcount = 0;
			this.getTowerData(2).daybuycount = 0;
			this.getTowerData(2).dayfightcount = 0;
			EventMgr.trigger(CmdEvent.Train_TowerFightCount);
			//重置无尽试炼数据
			let tmpInfo = cfg.TrainEndlessCfgData.getInfo(this._data.endless.maxstageid);
			if (tmpInfo != null)
			{
				this._data.endless.daybeginstage = tmpInfo.resetStageID;
				this._data.endless.daymaxstage = this._data.endless.daybeginstage;
				this._data.endless.curfightstage = this._data.endless.daybeginstage;
				this._data.endless.daybeginprizestage = tmpInfo.resetStageID;
				this._data.endless.dayclearnum = 0;
				this._data.endless.buffgroup = 0;
				this._data.endless.buffid = 0;
				EventMgr.trigger(CmdEvent.Train_EndlessPrize);
			}
			var endlessBatPlaceMgr: BatPlaceMgr = BattleMgr.Inst.getBatPlaceMgr(Pb_God._emBattleType.BattleType_Endless);
			//咵天退出战斗
			if (endlessBatPlaceMgr)
			{
				BattleMgr.Inst.exitBat(Pb_God._emBattleType.BattleType_Endless, true);
				let tmpItemResults = TrainDataMgr.getEndlessCurBattlePrize(true);
				if (tmpItemResults.length > 0)
				{
					AwardOpenUtils.showAwardOpen(tmpItemResults, null);
				}
			}

			//重置巅峰挑战数据
			this.resetPeakOpenDay();
			this._data.peak.buycount = 0;
			this._data.peak.fightcount = 0;
			this._data.peak.buff = [];
			this._peakBuyBuffCount = 0;
			this.reddotModelPeak.refresh();
			// this._data.peak.totaldamage = 0;
		}

		//--------------------------------------试炼塔-------------------------------
		protected getTowerData(type: number): Pb_God.PBPlayerTrainTower
		{
			let ret = this._towerData.get(type);
			if (!ret)
			{
				ret = new Pb_God.PBPlayerTrainTower()
				ret.type = type;
				this._towerData.put(type, ret);
			}
			return ret;
		}
		/** 试炼塔当前关卡 */
		public getTowerStageID(type: number): number
		{
			//这里因为没有打过的玩家 type2的塔数据为默认0 如果打了一层 就变成20001了 坑！
			let stageid = this.getTowerData(type).stageid;
			if (type == 2 && !stageid)
				stageid = 20000;
			return stageid
		}

		/** 试炼塔今日购买次数 */
		public getTowerDayBuyCount(type: number): number
		{
			return this.getTowerData(type).daybuycount;
		}

		/** 试炼塔今日挑战次数 */
		public getTowerDayfightcount(type: number): number
		{
			return this.getTowerData(type).dayfightcount;
		}

		/** 试炼塔当前关卡奖励是否领取 */
		public getTowerPrizedStage(id: number): boolean
		{
			return !!this._towerPrizeState.get(id);
		}

		/** 试炼塔每日免费挑战次数 */
		public getTowerFreeFightCount(): number
		{
			return cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_TrainTowerDayFreeCount);
		}

		/** 试炼塔今日剩余挑战次数 */
		public getTowerDayLastFightCount(type: number): number
		{
			return this.getTowerFreeFightCount() + this.getTowerDayBuyCount(type) - this.getTowerDayfightcount(type);
		}

		/** 试炼塔今日剩余购买次数 */
		public getTowerDayLastBuyCount(type: number): number
		{
			let noPrivilegeCount = 0; //不需要VIP特权即可购买的次数
			for (var el of cfg.TrainTowerCountCfgData.getDataList())
			{
				if (el.needVIP <= 0) noPrivilegeCount++;
			}
			return noPrivilegeCount + PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_Train) - this.getTowerDayBuyCount(type);
		}

		//--------------------------------------无尽试炼-------------------------------
		/** 无尽试练个人记录 */
		public getEndlessMaxStageID(): number
		{
			return this._data.endless.maxstageid;
		}

		/** 无尽试练成就奖励领取的最大关卡 */
		public getEndlessPrizestage(): number
		{
			return this._data.endless.prizestage;
		}

		/** 无尽试练随机的buff组 */
		public getEndlessBuffgroup(): number
		{
			return this._data.endless.buffgroup;
		}

		/** 无尽试练加成的SkillIndex */
		public getEndlessBuffSkillInfo(): cfg.SkillNewSkillCfgInfo
		{
			if (this._data.endless.buffid == 0) return null;
			return cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(this._data.endless.buffid, 1);
		}

		/** 无尽试炼今日累计挑战的关卡数 */
		public getEndlessDayStageCount(): number
		{
			return this._data.endless.dayclearnum;
		}

		/** 无尽试练今日最高的关卡 */
		public getEndlessDaymaxstage(): number
		{
			return this._data.endless.daymaxstage;
		}

		/** 无尽试练当前通关的关卡ID */
		public getEndlessCurfightstage(): number
		{
			return this._data.endless.curfightstage;
		}

		/** 无尽试练每日领奖的起始关卡 */
		public getEndlessDaybeginprizestage(): number
		{
			return this._data.endless.daybeginprizestage;
		}

		/** 无尽试炼战斗过程中，记录每一场战斗的奖励数据，在最后战斗结算时再统一取出来显示 */
		public saveEndlessCurBattlePrize(prize: any[]): void
		{
			this._saveEndlessTowerBattlePrizes = prize || [];
			// if (!this._saveEndlessTowerFightPrizes) this._saveEndlessTowerFightPrizes = new ds.StringMap<cfg.AddItemInfo>();
			// for (var el of prize) {
			// 	let addInfo = this._saveEndlessTowerFightPrizes.get(el.itemid);
			// 	if (!addInfo) {
			// 		addInfo = new cfg.AddItemInfo();
			// 		addInfo.itemid = el.itemid;
			// 		this._saveEndlessTowerFightPrizes.put(el.itemid, addInfo);
			// 	}
			// 	addInfo.itemcount += el.itemcount;
			// }
		}
		/** 无尽试炼战斗过程中，记录每一场战斗的奖励数据，在最后战斗结算时再统一取出来显示 */
		public getEndlessCurBattlePrize(isClear: boolean = true): cfg.AddItemInfo[]
		{
			let ret = this._saveEndlessTowerBattlePrizes;
			if (!ret) return [];
			if (isClear)
			{
				this._saveEndlessTowerBattlePrizes = null;
			}
			return ret;
		}

		// /** 当前无尽试炼雇佣英雄的好友id */
		// public getEndlessTowerSupportFriendId(): number {
		// 	return this._data.endless.support;
		// }

		// /** 当前是否已经使用过雇佣英雄 */
		// public getEndlessTowerIsUseSupport(): boolean {
		// 	return this._data.endless.usedsupport;
		// }

		/**
		 * 通关奖励红点
		 */
		private checkReddotRewards(reddot: RedDotModel): number
		{
			let type = reddot.bindData;
			let prizeList = cfg.TrainTowerPrizeCfgData.getListByType(type);
			for (let info of prizeList)
			{
				if (TrainDataMgr.getTowerPrizedStage(info.stageID))
					continue;// 奖励已领取
				let isActive = TrainDataMgr.getTowerStageID(type) >= info.stageID;
				let isGet = TrainDataMgr.getTowerPrizedStage(info.stageID);
				if (isActive && !isGet)
					return 1;
			}
			return 0;
		}

		/////////////////////////////////////////////////////////////////////////////////
		//-------------------------------------- 巅峰挑战 -------------------------------
		/////////////////////////////////////////////////////////////////////////////////
		private _peakOpenDay: number;
		private resetPeakOpenDay(): void
		{
			let currTime = TimeController.currTimer;
			let openSeverTime = TimeController.worldCreateZeroTime;
			let passDay = (currTime - openSeverTime) / (24 * 3600 * 1000);
			if (passDay >= 6) this._peakOpenDay = -1;
			else this._peakOpenDay = Math.floor(passDay);
		}
		/** 当前巅峰挑战开启天数（总共只有5天，返回0时表示还没有开启，-1表示活动已经结束了） */
		public getPeakOpenDay(): number
		{
			return this._peakOpenDay;
		}

		/** 巅峰挑战剩余次数 */
		public getPeakLeftCount(): number
		{
			let freeCount = cfg.TrainConstantsCfgData.getFirstInfo().freeCount;
			return freeCount + this._data.peak.buycount - this._data.peak.fightcount;
		}

		/** 巅峰挑战购买次数 */
		public getPeakBuyCount(): number
		{
			return this._data.peak.buycount;
		}

		/** 巅峰挑战购买BUFF次数 */
		public getPeakBuyBuffCount(): number
		{
			return this._peakBuyBuffCount;
		}

		/** 巅峰挑战红点		 */
		private checkReddotPeak(): boolean
		{
			if (this.getPeakOpenDay() < 1) return false;
			return this.getPeakLeftCount() > 0;
		}
	}
}
