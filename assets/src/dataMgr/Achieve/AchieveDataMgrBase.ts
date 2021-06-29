
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
	export class AchieveDataMgrBase
	{
		constructor()
		{

		}

		/** 数据 */
		protected _data: Pb_God.PBPlayerAchieve;

		//////////////// 简化查找的运算， 将数据列表转成map的方式 ////////////////////
		/** 主线任务的数据量较大，将成就数据保存改成map的方式， 简化查找运算 */
		protected _mainAchieveDataMap = new ds.StringMap<Pb_God.PBPlayerOneAchieve>();
		/** 主线任务的数据量较大，将已领奖的数据保存改成map的方式， 简化查找运算 */
		protected _mainFinishMap = new ds.StringMap<number>();
		/** 数据量较大，将成就数据保存改成map的方式， 简化查找运算 */
		protected _activityAchieveDataMap = new ds.StringMap<Pb_God.PBPlayerOneAchieve>();
		/** 数据量较大，将已领奖的数据保存改成map的方式， 简化查找运算 */
		protected _activityFinishMap = new ds.StringMap<number>();

		/** 图鉴完成数据*/
		protected _illustrationFinishMap = new ds.StringMap<number>();
		/** 图鉴数据 */
		protected _illustrationAchieveDataMap = new ds.StringMap<Pb_God.PBPlayerOneAchieve>();

		/** 图鉴战力完成数据*/
		protected _illustrationPowerFinishMap = new ds.StringMap<number>();
		/** 图鉴战力数据 */
		protected _illustrationPowerAchieveDataMap = new ds.StringMap<Pb_God.PBPlayerOneAchieve>();


		/** 目前显示的主线成就配置列表（经过了分组筛选过滤） */
		protected _mainAchieveList = new Array<cfg.AchieveMainAchieveCfgInfo>();

		/** 战令领取等级奖励状态（普通 1 进阶 2 both 3） */
		protected _warorderLevelPrizeMap = new ds.StringMap<number>();
		/** 战令成就数据 */
		protected _warorderAchieveDataMap = new ds.StringMap<Pb_God.PBPlayerOneAchieve>();
		/** 战令成就完成 */
		protected _warorderAchieveCompleteMap = new ds.StringMap<number>();

		/** 数据量较大，将成就数据保存改成map的方式， 简化查找运算 */
		protected _activityRisingStarDataMap = new ds.StringMap<Pb_God.PBPlayerOneAchieve>();
		/** 数据量较大，将已领奖的数据保存改成map的方式， 简化查找运算 */
		protected _activityRisingStarMap = new ds.StringMap<number>();

		/** 初始化 */
		public init(data: Pb_God.PBPlayerAchieve)
		{
			this._data = data;
			Global.listToStringMap(data.mainachieve.completeid, this._mainFinishMap, true);
			Global.listToStringMapData(data.mainachieve.achieve, "id", this._mainAchieveDataMap, true);
			Global.listToStringMap(data.activity.completeid, this._activityFinishMap, true);
			Global.listToStringMapData(data.activity.achieve, "id", this._activityAchieveDataMap, true);
			Global.listToStringMap(data.illustration.completeid, this._illustrationFinishMap, true);
			Global.listToStringMapData(data.illustration.achieve, "id", this._illustrationAchieveDataMap, true);
			Global.listToStringMap(data.illustrationpower.completeid, this._illustrationPowerFinishMap, true);
			Global.listToStringMapData(data.illustrationpower.achieve, "id", this._illustrationPowerAchieveDataMap, true);
			Global.listToStringMapData(data.acheveroad.achieve, "id", this._activityRisingStarDataMap, true);
			Global.listToStringMap(data.acheveroad.completeid, this._activityRisingStarMap, true);
			//战令
			this._warorderAchieveDataMap.clear();
			this._warorderAchieveCompleteMap.clear();
			if (data.warorder)
			{
				for (let el of data.warorder.achieves)
				{
					Global.listToStringMapData(el.achieve, "id", this._warorderAchieveDataMap, false);
					Global.listToStringMap(el.completeid, this._warorderAchieveCompleteMap, false);
				}
				this._warorderLevelPrizeMap.clear();
				for (let prize of data.warorder.prize)
				{
					this._warorderLevelPrizeMap.put(prize.key, prize.value);
				}
			}

			this.resetMainAchieveList();
			this.refreshGodGiftList();
			this.initReddotModel();
		}
		/** 隔日重置数据 */
		public resetNewDay(): void
		{
			this.clearLiveness(this._data.liveness);
			this.reddotModelSonOfDestiny.refresh();

			//重置战令数据
			let openServerDay = Math.floor((TimeController.currTimer - TimeController.worldCreateZeroTime) / (24 * 3600 * 1000));
			let openDay = cfg.AchieveConstCfgData.getFirstInfo().warOrderOpenDay - 1;
			if (openDay <= openServerDay)
			{
				if ((openServerDay - openDay) % 30 == 0)
				{ //30天全部重置
					this.getWarOrderData().exp = 0;
					this.getWarOrderData().level = 1;
					this._warorderLevelPrizeMap.clear();
					this._warorderAchieveDataMap.clear();
					this._warorderAchieveCompleteMap.clear();
				} else
				{
					let cfgList = cfg.AchieveWarOrderCfgData.getListByType(Pb_God._emWarOrderType.WarOrder_Day);
					for (let cfgInfo of cfgList)
					{
						if (cfgInfo.achieveType != Pb_God._emAchieveType.AchieveType_DailyLogin) { this._warorderAchieveDataMap.remove(cfgInfo.iD); }
						this._warorderAchieveCompleteMap.remove(cfgInfo.iD);
					}
					if ((openServerDay - openDay) % 7 == 0)
					{//周重置
						let cfgList = cfg.AchieveWarOrderCfgData.getListByType(Pb_God._emWarOrderType.WarOrder_Week);
						for (let cfgInfo of cfgList)
						{
							if (cfgInfo.achieveType != Pb_God._emAchieveType.AchieveType_DailyLogin) { this._warorderAchieveDataMap.remove(cfgInfo.iD); }
							this._warorderAchieveCompleteMap.remove(cfgInfo.iD);
						}
					}
				}
				this.reddotModelWarOrder.refresh(true);
			}
		}

		/** 隔周重置数据 */
		public resetNewServerWeek(): void
		{
			this.clearLiveness(this._data.weekliveness);
			this.reddotModel.refreshChild("week");
		}

		private clearLiveness(liveness: Pb_God.PBPlayerLiveness): void
		{
			liveness.accpetprize = [];
			liveness.completeid = [];
			liveness.livessvalue = 0;
			for (var el of liveness.achieve)
			{
				el.time = 0;
				el.value = 0;
			}
		}

		/** 刷新主线显示的成就列表 */
		protected resetMainAchieveList()
		{
			this._mainAchieveList.splice(0, this._mainAchieveList.length);
			let grpFirstIds = cfg.AchieveMainAchieveCfgData.getGroupFirstIdListByBigType(Pb_God._emAchieveBigType.AchieveBigType_Main);
			for (let id of grpFirstIds)
			{
				let cfgInfo = cfg.AchieveMainAchieveCfgData.getInfo(id);
				let noFinishInfo = this.__getNoFinishInfoByNextId(cfgInfo);
				if (noFinishInfo) { this._mainAchieveList.push(noFinishInfo); }
			}
		}
		/** 顺着后置任务ID，递归找到一个领奖的任务 */
		private __getNoFinishInfoByNextId(cfgInfo: cfg.AchieveMainAchieveCfgInfo): cfg.AchieveMainAchieveCfgInfo
		{
			if (!cfgInfo) { return null; }
			if (!this.isMainFinish(cfgInfo.iD))
			{ return cfgInfo; }
			let nextCfgInfo = cfg.AchieveMainAchieveCfgData.getInfo(cfgInfo.nextID);
			return this.__getNoFinishInfoByNextId(nextCfgInfo);
		}

		/** 日常任务的目标值 */
		private getLivenessValueById(id: number, isWeek: boolean): number
		{
			return isWeek ? cfg.AchieveWeekLivenessCfgData.getValueByID(id) : cfg.AchieveLivenessCfgData.getValueByID(id);
		}
		/** 日常任务的成就类型 */
		private getLivenessAchieveTypeByID(id: number, isWeek: boolean): number
		{
			return isWeek ? cfg.AchieveWeekLivenessCfgData.getAchieveTypeByID(id) : cfg.AchieveLivenessCfgData.getAchieveTypeByID(id);
		}

		/** 获取日常任务列表 */
		public getLiveList(isWeek: boolean, isSort: boolean = false): Pb_God.PBPlayerOneAchieve[]
		{
			let liveness = this.getLivinessData(isWeek);
			if (isSort)
			{
				liveness.achieve.sort((a: Pb_God.PBPlayerOneAchieve, b: Pb_God.PBPlayerOneAchieve) =>
				{
					let isFinishA = AchieveDataMgr.isLiveFinish(a.id, isWeek);
					let isFinishB = AchieveDataMgr.isLiveFinish(b.id, isWeek);
					if (isFinishA && !isFinishB) { return 1; }
					else if (!isFinishA && isFinishB) { return -1; }
					else
					{
						if (a["maxValue"] == null) { a["maxValue"] = this.getLivenessValueById(a.id, isWeek); }
						if (b["maxValue"] == null) { b["maxValue"] = this.getLivenessValueById(b.id, isWeek); }
						let tmpProA = a.value / a["maxValue"];
						let tmpProB = b.value / b["maxValue"];
						if (tmpProA >= 1 && tmpProB < 1) { return -1 }
						else if (tmpProA < 1 && tmpProB >= 1) { return 1; }
						else { return this.getLivenessAchieveTypeByID(a.id, isWeek) - this.getLivenessAchieveTypeByID(b.id, isWeek); }
					}
				});
			}
			return liveness.achieve;
		}

		/** 获取主线成就列表 */
		public getMainAchieveList(isSort: boolean = false): cfg.AchieveMainAchieveCfgInfo[]
		{
			if (isSort)
			{
				this._mainAchieveList.sort(function (a: cfg.AchieveMainAchieveCfgInfo, b: cfg.AchieveMainAchieveCfgInfo)
				{
					let isFinishA = AchieveDataMgr.isMainFinish(a.iD);
					let isFinishB = AchieveDataMgr.isMainFinish(b.iD);
					if (isFinishA && !isFinishB) { return 1; }
					else if (!isFinishA && isFinishB) { return -1; }
					else
					{
						if (a["maxValue"] == null) { a["maxValue"] = cfg.AchieveMainAchieveCfgData.getValueByID(a.iD); }
						if (b["maxValue"] == null) { b["maxValue"] = cfg.AchieveMainAchieveCfgData.getValueByID(b.iD); }
						let tmpProA = AchieveDataMgr.getMainValue(a.iD) / a["maxValue"];
						let tmpProB = AchieveDataMgr.getMainValue(b.iD) / b["maxValue"];
						if (tmpProA >= 1 && tmpProB < 1) { return -1; }
						else if (tmpProA < 1 && tmpProB >= 1) { return 1; }
						else { return a.iD - b.iD }
					}
				});
			}
			return this._mainAchieveList;
		}

		/**
		 * 根据每天的表数据和页签下标获取对应的列表
		 */
		public getTabItemIdListByDayInfo(act_id: number, day: number, tabIndex: number, isSort: boolean = false): cfg.ActivityAchievementCfgInfo[]
		{
			let achieve_arr = cfg.ActivityAchievementCfgData.getAchieveList(act_id, day, tabIndex + 1);
			if (!achieve_arr) { return []; }
			if (isSort)
			{
				achieve_arr.sort((a: cfg.ActivityAchievementCfgInfo, b: cfg.ActivityAchievementCfgInfo) =>
				{
					if (a.achievement == 0 && b.achievement == 0)
					{//礼包购买类型
						let buyCount_A = ActivityDataMgr.getActivityIndexDataValue(act_id, a.index, Pb_God._emActivityDataKey.Activity_Key_BuyCount);
						let buyCount_B = ActivityDataMgr.getActivityIndexDataValue(act_id, b.index, Pb_God._emActivityDataKey.Activity_Key_BuyCount);
						let hasBuyCount_A = buyCount_A ? buyCount_A : 0;
						let hasBuyCount_B = buyCount_B ? buyCount_B : 0;
						let isSoldOut_A = hasBuyCount_A >= a.count;
						let isSoldOut_B = hasBuyCount_B >= b.count;
						let cost_count_A = cfg.ActivityAchievementCfgData.getNeedItemCount(a.index);
						let cost_count_B = cfg.ActivityAchievementCfgData.getNeedItemCount(b.index);
						if (isSoldOut_A && !isSoldOut_B) { return 1; }
						else if (!isSoldOut_A && isSoldOut_B) { return -1; }
						else if (cost_count_A != cost_count_B) { return cost_count_A < cost_count_B ? -1 : 1; }
						else { return a.index < b.index ? -1 : 1; }
					}
					else
					{
						// 普通成就类型
						let isFinishA = AchieveDataMgr.isActivity_LiveFinish(a.achievement);
						let isFinishB = AchieveDataMgr.isActivity_LiveFinish(b.achievement);
						let tempNumA = AchieveDataMgr.getActivity_LiveValue(a.achievement);
						let tempNumB = AchieveDataMgr.getActivity_LiveValue(b.achievement);
						let tempAllNum_A = cfg.AchieveActivityLivenessCfgData.getValueByID(a.achievement);
						let tempAllNum_B = cfg.AchieveActivityLivenessCfgData.getValueByID(b.achievement);
						let can_get_A = tempNumA >= tempAllNum_A && !isFinishA;
						let can_get_B = tempNumB >= tempAllNum_B && !isFinishB;

						let tabCfg_A = cfg.AchieveActivityLivenessCfgData.getInfo(a.achievement);//成就配置
						let tabCfg_B = cfg.AchieveActivityLivenessCfgData.getInfo(b.achievement);

						if (isFinishA && !isFinishB) { return 1; }
						else if (!isFinishA && isFinishB) { return -1; }
						else
						{// 成就排序
							if (can_get_A && !can_get_B) { return -1; }
							else if (!can_get_A && can_get_B) { return 1; }
							else if (tabCfg_A.value != tabCfg_B.value) { return tabCfg_A.value - tabCfg_B.value; }
							else { return tabCfg_A.iD - tabCfg_B.iD; }
						}
					}
					//return a.index < b.index ? -1 : 1;
				});
			}
			return achieve_arr;
		}

		/**
		 * 根据每天的表数据和页签下标获取成就之路表数据（现在这用，之后优化）
		 */
		public getTabItemIdRisingStarInfo(act_id: number, isSort: boolean = false, day: number = 1, tabIndex: number = 1): cfg.ActivityAchieveRoadCfgInfo[]
		{
			let achieve_arr = cfg.ActivityAchieveRoadCfgData.getAchieveList(act_id, day, tabIndex);
			if (!achieve_arr) { return []; }
			if (isSort)
			{
				// 	achieve_arr.sort((a: cfg.ActivityAchieveRoadCfgInfo, b: cfg.ActivityAchieveRoadCfgInfo) =>
				// 	{
				// 		if (a.achievement == 0 && b.achievement == 0)
				// 		{//礼包购买类型
				// 			let buyCount_A = ActivityDataMgr.getActivityIndexDataValue(act_id, a.index, Pb_God._emActivityDataKey.Activity_Key_BuyCount);
				// 			let buyCount_B = ActivityDataMgr.getActivityIndexDataValue(act_id, b.index, Pb_God._emActivityDataKey.Activity_Key_BuyCount);
				// 			let hasBuyCount_A = buyCount_A ? buyCount_A : 0;
				// 			let hasBuyCount_B = buyCount_B ? buyCount_B : 0;
				// 			let isSoldOut_A = hasBuyCount_A >= a.count;
				// 			let isSoldOut_B = hasBuyCount_B >= b.count;
				// 			let cost_count_A = cfg.ActivityAchieveRoadCfgData.getNeedItemCount(a.index);
				// 			let cost_count_B = cfg.ActivityAchieveRoadCfgData.getNeedItemCount(b.index);
				// 			if (isSoldOut_A && !isSoldOut_B) return 1;
				// 			else if (!isSoldOut_A && isSoldOut_B) return -1;
				// 			else if (cost_count_A != cost_count_B) return cost_count_A < cost_count_B ? -1 : 1;
				// 			else return a.index < b.index ? -1 : 1;
				// 		}
				// 		else
				// 		{
				// 			// 普通成就类型
				// 			let isFinishA = AchieveDataMgr.isActivity_LiveFinish(a.achievement);
				// 			let isFinishB = AchieveDataMgr.isActivity_LiveFinish(b.achievement);
				// 			let tempNumA = AchieveDataMgr.getActivity_LiveValue(a.achievement);
				// 			let tempNumB = AchieveDataMgr.getActivity_LiveValue(b.achievement);
				// 			let tempAllNum_A = cfg.AchieveRoadCfgData.getValueByID(a.achievement);
				// 			let tempAllNum_B = cfg.AchieveRoadCfgData.getValueByID(b.achievement);
				// 			let can_get_A = tempNumA >= tempAllNum_A && !isFinishA;
				// 			let can_get_B = tempNumB >= tempAllNum_B && !isFinishB;

				// 			let tabCfg_A = cfg.AchieveRoadCfgData.getInfo(a.achievement);//成就配置
				// 			let tabCfg_B = cfg.AchieveRoadCfgData.getInfo(b.achievement);

				// 			if (isFinishA && !isFinishB) { return 1; }
				// 			else if (!isFinishA && isFinishB) { return -1; }
				// 			else
				// 			{// 成就排序
				// 				if (can_get_A && !can_get_B) return -1;
				// 				else if (!can_get_A && can_get_B) return 1;
				// 				else if (tabCfg_A.value != tabCfg_B.value) return tabCfg_A.value - tabCfg_B.value;
				// 				else return tabCfg_A.iD - tabCfg_B.iD;
				// 			}
				// 		}
				// 		//return a.index < b.index ? -1 : 1;
				// 	});
			}
			return achieve_arr;
		}

		/** 获取帮会任务数据 */
		public getFactionData(id: number): Pb_God.PBPlayerOneAchieve
		{
			let results = this._data.faction.achieve.filter(elment => elment.id == id);
			return results[0];
		}

		public getLivinessData(isWeek: boolean): Pb_God.PBPlayerLiveness
		{
			return isWeek ? this._data.weekliveness : this._data.liveness;
		}

		/** 获取主线任务数据 */
		protected getMainAchieveData(id: number): Pb_God.PBPlayerOneAchieve
		{
			return this._mainAchieveDataMap.get(id);
		}

		/** 获取主线任务进度 */
		public getMainValue(id: number): number
		{
			let data = this.getMainAchieveData(id);
			return data ? data.value : 0;
		}

		/** 日常任务是否已经完成 */
		public isLiveFinish(id: number, isWeek: boolean): boolean
		{
			let liveness = this.getLivinessData(isWeek);
			return liveness.completeid.indexOf(id) >= 0;
		}

		/** 主线任务是否已经完成 */
		public isMainFinish(id: number): boolean
		{
			return !!this._mainFinishMap.get(id);
		}

		/** 主线任务是否达成目标（不是指完成领奖,请区分isMainFinish） */
		public isMainComplete(id: number): boolean
		{
			if (this.isMainFinish(id)) { return true; }
			let curNum = AchieveDataMgr.getMainValue(id);
			let maxNum = cfg.AchieveMainAchieveCfgData.getValueByID(id);
			return curNum >= maxNum;
		}

		/** 活跃宝箱是否已经领取*/
		public isGiftBoxFinish(id: number, isWeek: boolean): boolean
		{
			let liveness = this.getLivinessData(isWeek);
			return liveness.accpetprize.indexOf(id) >= 0;
		}

		/** 获取累计的活跃度*/
		public getLivessValue(isWeek: boolean): number
		{
			let liveness = this.getLivinessData(isWeek);
			return liveness.livessvalue;
		}

		/** 获取7天目标任务进度 */
		public getActivity_LiveValue(id: number): number
		{
			let ahcieveData = this._activityAchieveDataMap.get(id);
			return ahcieveData ? ahcieveData.value : 0;
		}

		/** 7天目标日常任务是否已经完成 */
		public isActivity_LiveFinish(id: number): boolean
		{
			return !!this._activityFinishMap.get(id);
		}

		/** 获取成就之路任务进度 */
		public getActivity_RisingStarValue(id: number): number
		{
			let ahcieveData = this._activityRisingStarDataMap.get(id);
			return ahcieveData ? ahcieveData.value : 0;
		}

		/** 成就之路是否已经完成 */
		public isActivity_RisingStarFinish(id: number): boolean
		{
			return !!this._activityRisingStarMap.get(id);
		}

		/** 7天目标活跃宝箱是否已经领取*/
		public isActivity_GiftBoxFinish(id: number): boolean
		{
			return this._data.activity.accpetprize.indexOf(id) >= 0;
		}

		/** 7天目标获取累计的活跃度*/
		public getActivity_LivessValue(): number
		{
			return this._data.activity.livessvalue;
		}

		/**
		 * 获取7天目标累计完成的任务数
		 */
		public getActivity_FinishCount(): number
		{
			return this._data.activity.livessvalue;
		}

		/** 7天目标活跃宝箱是否有可领取，但是还未领取的宝箱*/
		private isHaveActivityGiftBoxCanGet(): boolean
		{
			let infoArr = cfg.AchieveActivityLivenessPrizeCfgData.getDataList();
			let curNum = AchieveDataMgr.getActivity_LivessValue();
			for (var index = 0; index < infoArr.length; index++)
			{
				var info: cfg.AchieveActivityLivenessPrizeCfgInfo = infoArr[index];
				let itemAry = cfg.AchieveActivityLivenessPrizeCfgData.getNeedItemAryById(info.iD);
				if (curNum < itemAry[0].itemcount) { continue; }
				let isOpend = AchieveDataMgr.isActivity_GiftBoxFinish(info.iD);
				if (!isOpend) { return true; }
			}
			return false;
		}

		/** 从成就列表内找到对应的数据进行更新 */
		protected refreshOneAchieve(list: Pb_God.PBPlayerOneAchieve[], achieve: Pb_God.PBPlayerOneAchieve)
		{
			let results = list.filter(elment => elment.id == achieve.id);
			if (results.length > 0)
			{
				for (var el of results)
				{
					el.time = achieve.time;
					el.value = achieve.value;
				}
			} else
			{
				list.push(achieve);
			}
		}

		/** 记录可领奖的神降礼包成就（只记录一条即可，界面一次只显示一个， 领完一个后再刷新检查） */
		private _canRewardGodGiftId = 0;
		/** 刷新神降礼包成就状态
		 */
		protected refreshGodGiftList(): void
		{
			this._canRewardGodGiftId = 0;
			let cfgList = cfg.AchieveMainAchieveCfgData.getListByBigType(Pb_God._emAchieveBigType.AchieveBigType_Gift);
			if (!cfgList) { return; }
			for (let achieveCfgInfo of cfgList)
			{
				if (this.checkGodGiftState(achieveCfgInfo, false))
				{ return; }
			}
		}
		/** 刷新神降礼包成就状态
		 * @param needPopupFrame 刷新时直接弹出领奖界面
		 */
		protected checkGodGiftState(achieveCfgInfo: cfg.AchieveMainAchieveCfgInfo, needPopupFrame: boolean): boolean
		{
			//已经有了， 只需要显示一个即可，等这个领完奖了再做检查
			if (this._canRewardGodGiftId) { return true; }
			//已经领取了
			if (this.isMainFinish(achieveCfgInfo.iD)) { return false; }
			let curNum = AchieveDataMgr.getMainValue(achieveCfgInfo.iD);
			let maxNum = achieveCfgInfo.value;
			if (curNum >= maxNum)
			{
				this._canRewardGodGiftId = achieveCfgInfo.iD;
				if (needPopupFrame) { UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_GodGift, this._canRewardGodGiftId)); }
				return true;
			}
			return false;
		}

		/** 获取当前可领奖的天降礼包成就id(有则有，无则无) */
		public getCanRewardGodGiftId(): number
		{
			return this._canRewardGodGiftId;
		}

		/** 天命之子活动结束时间(秒) */
		public getSonOfDestinyOverTime(): number
		{
			let openTime = PlayerDataMgr.getSystemOpenTimer(emSystemSwitchType.SonOfDestiny);
			if (!openTime) { return 0; }
			let openDay = 3;
			//往后推n天的0点结束
			let overTime = openTime + openDay * 24 * 3600;
			overTime = Global.getZeroTimeNumber(overTime * 1000);
			return overTime / 1000;
		}

		/** 获取战令数据 */
		public getWarOrderData(): Pb_God.PBWarOrder
		{
			return this._data.warorder;
		}
		/** 获取战令任务数据 */
		public getWarOrderAchieveData(id: number): Pb_God.PBPlayerOneAchieve
		{
			return this._warorderAchieveDataMap.get(id);
		}
		/** 判断战令任务是否已领奖 */
		public getWarOrderComplete(id: number): boolean
		{
			return !!this._warorderAchieveCompleteMap.get(id);
		}
		/** 判断战令等级奖励领取状态 */
		public getWarOrderLevelPrizeState(level: number): number
		{
			return this._warorderLevelPrizeMap.get(level) || 0;
		}

		/** 战令是否开启 */
		public getWarOrderIsOpen(): boolean
		{
			let openServerDay = Math.floor((TimeController.currTimer - TimeController.worldCreateZeroTime) / (24 * 3600 * 1000));
			let openDay = cfg.AchieveConstCfgData.getFirstInfo().warOrderOpenDay - 1;
			if (openDay > openServerDay) { return false; }
			//开关
			return PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.WarOrder);
		}


		//////////////////////// 红点逻辑 ///////////////////////////
		/** 红点模型 */
		public reddotModel: RedDotModel = new RedDotModel;
		/** 七天成就红点 */
		public reddotModelSevenDay: RedDotModel = new RedDotModel;
		/** 天命之子红点（入口不一样，所以与总纳分离） */
		public reddotModelSonOfDestiny: RedDotModel = new RedDotModel();
		/** 战令红点 */
		public reddotModelWarOrder: RedDotModel = new RedDotModel;

		private initReddotModel(): void
		{
			this.reddotModel.cleanUp(true);
			//日常任务
			let reddot = this.reddotModel.addChildModel("daily");
			reddot.setupCheckMethod(this, this.getDailyHaveReward);
			//周常任务
			reddot = this.reddotModel.addChildModel("week");
			reddot.setupCheckMethod(this, this.getWeekHaveReward);
			//成就任务
			reddot = this.reddotModel.addChildModel("achieve");
			reddot.setupCheckMethod(this, this.getAchieveHaveReward);

			//战令红点
			this.initWarOrderReddot();
			//7日目标成就任务
			this.initSevenDayProgressReddot();

			//天命之子红点
			this.reddotModelSonOfDestiny.cleanUp();
			this.reddotModelSonOfDestiny.setSystemSwitchId(emSystemSwitchType.SonOfDestiny);
			this.reddotModelSonOfDestiny.setupCheckMethod(this, this.checkSonOfDestinyReddot);
		}

		/** 初始化战令红点 */
		private initWarOrderReddot(): void
		{
			this.reddotModelWarOrder.cleanUp(true);
			//等级奖励
			let reddot = this.reddotModelWarOrder.addChildModel("reward");
			reddot.setSystemSwitchId(emSystemSwitchType.WarOrder);
			reddot.addGlobalEventRefresh(EventNotify.Privilege_Card_Change, Pb_God._emPrivilegeCard.PrivilegeCard_WarOrder);
			reddot.setupCheckMethod(this, () =>
			{
				if (!this.getWarOrderIsOpen()) { return false; }
				let level = this.getWarOrderData().level;
				let isOpenAdvance = PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_WarOrder);
				for (let i = 1; i <= level; i++)
				{
					let prizeState = this.getWarOrderLevelPrizeState(i);
					if (prizeState == 0) { return true; }
					if (isOpenAdvance && prizeState != 3) { return true; }
				}
				return false;
			})

			//任务奖励(再细分为三档:日、周、月)
			reddot = this.reddotModelWarOrder.addChildModel("task");
			for (let type = 1; type <= 3; type++)
			{
				let subReddot = reddot.addChildModel(type);
				subReddot.setSystemSwitchId(emSystemSwitchType.WarOrder);
				subReddot.addGlobalEventRefresh(EventNotify.Achieve_WarOrder_Update, type);
				subReddot.setupCheckMethod(this, () =>
				{
					if (!this.getWarOrderIsOpen()) { return false; }
					let cfgList = cfg.AchieveWarOrderCfgData.getListByType(type);
					for (let cfginfo of cfgList)
					{
						if (this.getWarOrderComplete(cfginfo.iD)) { continue; }
						let achieveData = this._warorderAchieveDataMap.get(cfginfo.iD);
						if (achieveData && achieveData.value >= cfginfo.value) { return true; }
					}
				});
			}
		}

		/** 初始化七天成就红点 */
		private initSevenDayProgressReddot(): void
		{

			this.reddotModelSevenDay.cleanUp(true);
			//宝箱
			let reddot = this.reddotModelSevenDay.addChildModel("achieve_boxAward");
			reddot.setupCheckMethod(this, this.isHaveActivityGiftBoxCanGet);
			reddot.addGlobalEventRefresh(CmdEvent.Achieve_ActivityLivenessPrize);
			//道具
			let sevenProgressprizeCfg = cfg.AchieveActivityLivenessPrizeCfgData.getFirstInfo();
			let needItems = cfg.AchieveActivityLivenessPrizeCfgData.getNeedItemAryById(sevenProgressprizeCfg.iD);
			reddot.setPlayerItemInfosListener(needItems); //监听道具数量变化

			reddot = this.reddotModelSevenDay;

			// 所有7天目标活动数据
			let actCfg_list = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Achievement);
			for (let act_data of actCfg_list)
			{
				if (!act_data) { continue; }
				let day_count = 7;//活动总数7天
				for (var index = 1; index <= day_count; index++)
				{
					// 每一天的红点
					let day_reddot = reddot.addChildModel(act_data.iD + "day_" + index, null, index);

					let tab_arr = cfg.ActivityCfgData.getAchieveTabArr(act_data.iD, index);
					// 每一天中的每一个页签的红点  4个页签
					for (let j = 0; j < tab_arr.length; j++)
					{
						//每一列成就id
						let sub_achieve_arr = AchieveDataMgr.getTabItemIdListByDayInfo(act_data.iD, index, j, true);;
						let day_tab_reddot = day_reddot.addChildModel("tab_" + j);
						day_tab_reddot.bindData = {};
						day_tab_reddot.bindData["act_data"] = act_data;
						day_tab_reddot.bindData["cfg_list"] = sub_achieve_arr;
						day_tab_reddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, act_data.iD);
						day_tab_reddot.addGlobalEventRefresh(EventNotify.Achieve_Activity_Update);
						day_tab_reddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward, act_data.iD);
						day_tab_reddot.addGlobalEventRefresh(EventNotify.Activity_AchiveOpenDayChange);
						day_tab_reddot.setupCheckMethod(this, this.checkSevenDayAchieveHaveReward_Tab);
					}
				}
			}
		}

		/** 天命之子红点 */
		private checkSonOfDestinyReddot(): boolean
		{
			let overTime = this.getSonOfDestinyOverTime();
			if (overTime < TimeController.currTimer / 1000) { return false; }
			let cfgList = cfg.AchieveMainAchieveCfgData.getListByBigType(Pb_God._emAchieveBigType.AchieveBigType_SonOfDestiny);
			for (let achieveCfgInfo of cfgList)
			{
				//已经领取了
				if (this.isMainFinish(achieveCfgInfo.iD)) { continue; }
				let curNum = AchieveDataMgr.getMainValue(achieveCfgInfo.iD);
				let maxNum = achieveCfgInfo.value;
				if (curNum >= maxNum) { return true; }
			}
			return false;
		}

		/** 日常任务是否有可领取任务 */
		private getDailyHaveReward(): number
		{
			for (let i = 0; i < this.getLiveList(false).length; i++)
			{
				let tempInfo = this.getLiveList(false)[i];
				let taskAllNum = this.getLivenessValueById(tempInfo.id, false);
				if (tempInfo.value >= taskAllNum && !this.isLiveFinish(tempInfo.id, false))
				{
					return 1;
				}
			}
			//活跃值奖励
			let tempLiveAry = cfg.AchieveLivenessPrizeCfgData.getDataList();
			for (let i = 0; i < tempLiveAry.length; i++)
			{
				let tempInfo = tempLiveAry[i];
				let tempItemAry = cfg.AddItemInfo.getAddItemAttr(tempInfo, tempInfo.needItem, "needItemAry");
				if (this.getLivessValue(false) >= tempItemAry[0].itemcount && !this.isGiftBoxFinish(tempInfo.iD, false))
				{
					return 1;
				}
			}

			return 0;
		}
		/** 周常任务是否有可领取任务 */
		private getWeekHaveReward(): number
		{
			for (let i = 0; i < this.getLiveList(true).length; i++)
			{
				let tempInfo = this.getLiveList(true)[i];
				let taskAllNum = this.getLivenessValueById(tempInfo.id, true);
				if (tempInfo.value >= taskAllNum && !this.isLiveFinish(tempInfo.id, true))
				{
					return 1;
				}
			}
			//活跃值奖励
			let tempLiveAry = cfg.AchieveWeekLivenessPrizeCfgData.getDataList();
			for (let i = 0; i < tempLiveAry.length; i++)
			{
				let tempInfo = tempLiveAry[i];
				let tempItemAry = cfg.AchieveWeekLivenessPrizeCfgData.getNeedItemAryById(tempInfo.iD);
				if (this.getLivessValue(true) >= tempItemAry[0].itemcount && !this.isGiftBoxFinish(tempInfo.iD, true))
				{
					return 1;
				}
			}

			return 0;
		}

		/** 成就任务是否有可领取任务 */
		private getAchieveHaveReward(): number
		{
			let tmpCfgList = this.getMainAchieveList();
			for (let i = 0; i < tmpCfgList.length; i++)
			{
				let tempInfo = tmpCfgList[i];
				let tempNum = this.getMainValue(tempInfo.iD);
				let taskAllNum = cfg.AchieveMainAchieveCfgData.getValueByID(tempInfo.iD);
				if (tempNum >= taskAllNum && !this.isMainFinish(tempInfo.iD))
				{
					return 1;
				}
			}
			return 0;
		}

		/**
		 * 检测7日目标活动对应页签红点
		 */
		private checkSevenDayAchieveHaveReward_Tab(reddotModel: RedDotModel): boolean
		{
			let act_data: cfg.ActivityCfgInfo = reddotModel.bindData["act_data"];
			let achieveID_arr: cfg.ActivityAchievementCfgInfo[] = reddotModel.bindData["cfg_list"];
			if (!ActivityDataMgr.checkActivityOpenState(act_data.iD)) { return false; }
			let cur_open_day = ActivityDataMgr.getActivityAchieveOpenDays(act_data.iD);
			for (var index = 0; index < achieveID_arr.length; index++)
			{
				var element = achieveID_arr[index];
				if (element.day > cur_open_day) { return false; }// 未到开启天数

				let is_giftType = element.achievement == 0;
				if (!is_giftType)
				{
					// 普通成就类型
					let achive_cfg = cfg.AchieveActivityLivenessCfgData.getInfo(element.achievement);
					let tempNum = AchieveDataMgr.getActivity_LiveValue(achive_cfg.iD);
					if (tempNum >= achive_cfg.value && !AchieveDataMgr.isActivity_LiveFinish(achive_cfg.iD))
					{ return true; }
				} else
				{
					//礼包购买类型
					let buyCount = ActivityDataMgr.getActivityIndexDataValue(act_data.iD, element.index, Pb_God._emActivityDataKey.Activity_Key_BuyCount);//act_data["indexData_Dic"][element.index];
					let hasBuyCount: number = buyCount ? buyCount : 0;
					// let can_buy = hasBuyCount < element.count;
					let is_VIP_canBuy = (element.vIP > 0 && PrivilegeDataMgr.vipLevel < element.vIP) || element.vIP <= 0;
					let need_count = cfg.ActivityAchievementCfgData.getNeedItemCount(element.index);
					// let own_item_count = Global.getItemNum(cfg.ActivityAchievementCfgData.getNeedItemID(element.index));

					// 可以购买
					/*if (own_item_count >= need_count && is_VIP_canBuy && hasBuyCount < element.count)
						return true;*/
					// 只有价格为0的礼包提示红点
					if (need_count == 0 && is_VIP_canBuy && hasBuyCount < element.count)
					{ return true; }
				}
			}
			return false;
		}

		/**
		 * 获取图鉴成就完成map
		 */
		public getIllustrationFinishMap()
		{
			return this._illustrationFinishMap;
		}

		/**
		 * 获取图鉴成就map
		 */
		public getIllustrationAchieveData()
		{
			return this._illustrationAchieveDataMap;
		}

		/**
		 * 获取图鉴战力成就完成map
		 */
		public getIllustrationPowerFinishMap()
		{
			return this._illustrationPowerFinishMap;
		}

		/**
		 * 获取图鉴战力成就map
		 */
		public getIllustrationPowerAchieveData()
		{
			return this._illustrationPowerAchieveDataMap;
		}


	}
}
