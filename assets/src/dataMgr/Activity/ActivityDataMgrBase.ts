
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

	/**活动开启状态 */
	export enum ActivityOpenStateType
	{
		Close = 0,//关闭
		Open,//开启
		FinishRewards,// 领取完所有奖励后关闭入口
	}

	export class ActivityDataMgrBase
	{//限时活动数据管理

		/**所有活动数据id映射（便于查找） */
		protected _activityDatasMap: ds.StringMap<Pb_God.PBPlayerActivityData>;

		/**存储所有活动的开始时间 */
		protected activityStartTimeMap = new ds.StringMap<number>();

		// 全服奖励剩余数量(等级礼包)
		private actRewardLeftCountMap = new ds.StringMap<number>();

		// 当前7日目标活动开启的天数
		private curSevenDayAchiveOpenDay: number = 0;

		constructor()
		{
		}


		/** 隔日重置数据 */
		public resetNewDay(): void
		{
			this.reddotModel.refreshChild("firstPay", true);
			this.reddotModel.refreshChild("monthFund", true);
			this.reddotModel.refreshChild("zeroBuy", true);
			this.reddotModelCommonGrp.refresh(true);

			EventMgr.trigger(EventNotify.DayLimitBuy_ResetNewDay);
		}

		/**
		 * 换账号这种 需要清除旧数据
		 */
		private clear()
		{
			/**所有活动数据id映射（便于查找） */
			this._activityDatasMap = null;
			/**存储所有活动的开始时间 */
			this.activityStartTimeMap = new ds.StringMap<number>();
			// 全服奖励剩余数量(等级礼包)
			this.actRewardLeftCountMap = new ds.StringMap<number>();
			// 当前7日目标活动开启的天数
			this.curSevenDayAchiveOpenDay = 0;
		}

		public init(data: Pb_God.PBPlayerActivity): void
		{
			this.clear();
			this.resetActList();
			this._activityDatasMap = Global.listToStringMapData(data.activitydata, "id");

			this.initReddotModel();
			ActivitySend.getStartTime([]);
		}

		private resetActList(): void
		{
			//带有全服共享数量类型的活动需要向服务器拉取一次全服剩余数量
			//坑货服务器设计，需要客户端来主动拉取每一个活动的数据
			let shareNumActList = [].concat(
				cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_LimitGift),
				cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Leveup)
			);
			for (let el of shareNumActList)
			{
				ActivitySend.getRewardNum(el.iD);
			}
		}

		/** 根据活动ID获取活动数据 */
		public getActivityDataById(id: number): Pb_God.PBPlayerActivityData
		{
			if (!this._activityDatasMap) { return null; }
			return this._activityDatasMap.get(id);
		}
		/**
		 * 同步活动数据
		 * @param id
		 */
		public updateActivityData(id: number, new_data: Pb_God.PBPlayerActivityData): void
		{
			let act_data = this.getActivityDataById(id);
			let oldIndexData = act_data ? act_data.indexdata : [];
			this._activityDatasMap = this._activityDatasMap || new ds.StringMap<Pb_God.PBPlayerActivityData>();
			this._activityDatasMap.put(id, new_data);

			let act_type = cfg.ActivityCfgData.getTypeByID(id);
			if (act_type == Pb_God._emActivityType.Activity_ShortTermGift)
			{//触发短期礼包
				this.onShortTimeActUpdate(oldIndexData, new_data);
			}
		}

		/**
		 * 短期礼包活动数据刷新逻辑
		 */
		private onShortTimeActUpdate(old_index_data: Pb_God.PBPlayerActivityIndexData[], new_act_data: Pb_God.PBPlayerActivityData): void
		{
			// 新数据长度小于旧数据 则属于关闭一个礼包活动 不执行逻辑
			if (new_act_data.indexdata.length < old_index_data.length || new_act_data.indexdata.length == 0)
			{
				EventMgr.trigger(EventNotify.Activity_ShortTimeUpdate);
				return;
			}
			// 找出最新开启的礼包活动
			let latest_act_indexData: Pb_God.PBPlayerActivityIndexData = null;
			let latest_trigger_time: number = 0;
			for (let i_data of new_act_data.indexdata)
			{
				for (let data_pair of i_data.data)
				{
					if (data_pair.key == Pb_God._emActivityDataKey.Activity_Key_TriggerGiftTime
						&& data_pair.value > latest_trigger_time)
					{
						latest_act_indexData = i_data;
						latest_trigger_time = data_pair.value;
					}
				}
			}

			// 是否触发活动弹窗提示
			let is_trigger_dialog = true;
			for (let data of old_index_data)
			{
				if (data.index == latest_act_indexData.index)
				{
					is_trigger_dialog = false;
					break;
				}
			}

			if (is_trigger_dialog && !GuideMgr.Inst.getInShowGuide())
			{
				// 打开短期礼包活动界面
				UIManager.Inst.pushAutoQueue(new BaseOpenUIData(PanelNotify.Open_LimitTimeGift));
				// let act_cfg = cfg.ActivityShortTermGiftCfgData.getInfo(latest_act_indexData.index);
				// let gift_name = cfg.ChargeCfgData.getNameByID(act_cfg.productID);
				// AlertShow.showConfirmAlert_Two(Global.getLangStr("activity_shortTime_msg1", gift_name), this, () => {
				// 	// 打开短期礼包活动界面
				// 	UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LimitTimeGift));
				// }, () => {
				// 	//这里有一个比较坑爹的新手引导设定，获得5星英雄卡的时候， 一定要等这个弹窗取消以后才正式开启引导
				// 	FuncGuideMgr.Inst.checkPreFuncGuideTag(GuideStep.Func_Pet5StarEmbattle_1);
				// }, "common_confirm", "common_cancel", 0, 0, true);
			}

			// 刷新主页短期礼包按钮
			EventMgr.trigger(EventNotify.Activity_ShortTimeUpdate);
		}

		/**
		 * 获取最新触发的短期礼包结束时间
		 */
		public getLatestShortTimeActEndTime(): number
		{
			let act_data = this.getActivityDataByType(Pb_God._emActivityType.Activity_ShortTermGift);
			if (!act_data) { return 0; }
			let result_act: Pb_God.PBPlayerActivityIndexData = null;
			let result: number = 0;
			for (let i_data of act_data.indexdata)
			{
				let trigger_time = this.getActivity_IndexDataValue(i_data, Pb_God._emActivityDataKey.Activity_Key_TriggerGiftTime);
				if (trigger_time > result)
				{
					result_act = i_data;
					result = trigger_time;
				}
			}

			if (!result_act) { return 0; }
			// //活动触发次数
			// let actTriggerCount = ActivityDataMgr.getActivity_IndexDataValue(result_act, Pb_God._emActivityDataKey.Activity_Key_TriggerGiftNum) || 1;
			// 计算出结束时间
			result = cfg.ActivityShortTermGiftCfgData.getDurationByIndex(result_act.index) * 60 + result;
			return result;
		}

		/**
		 * 指定活动类型index数据是否存在
		 * @param act_type
		 * @param index
		 */
		public isActIndexDataExist(act_type: Pb_God._emActivityType, index: number): boolean
		{
			let act_data = this.getActivityDataByType(act_type);
			if (!act_data) { return false; }
			let results = act_data.indexdata.filter(e => e.index == index);
			return results.length > 0;
		}

		/**
		 * 获取活动data数据
		 * @param act_id
		 * @param key
		 */
		public getActivity_DataValue(act_id: number, key: Pb_God._emActivityDataKey): number
		{
			let act_data = this.getActivityDataById(act_id);
			if (!act_data) { return 0; }
			let results = act_data.data.filter(e => e.key == key);
			return results.length > 0 ? results[0].value : 0;
		}

		/**
		 * 取得单个活动中一个奖励的状态数据
		 * @param cfg_id
		 */
		public getActivity_IndexDataById(act_id: number, cfg_id: number): Pb_God.PBPlayerActivityIndexData
		{
			let act_data = this.getActivityDataById(act_id);
			if (!act_data) { return null; }
			let results = act_data.indexdata.filter(e => e.index == cfg_id);
			return results.length > 0 ? results[0] : null;
		}

		/**
		 * 取得活动对应indexData值
		 * @param data
		 */
		public getActivity_IndexDataValue(data: Pb_God.PBPlayerActivityIndexData, key: Pb_God._emActivityDataKey): number
		{
			if (!data) { return 0; }
			let results = data.data.filter(e => e.key == key);
			return results.length > 0 ? results[0].value : 0;
		}

		/**
		 * 根据活动类型获取服务端数据
		 * @param type
		 */
		public getActivityDataByType(type: Pb_God._emActivityType, sonType: number = 0): Pb_God.PBPlayerActivityData
		{
			let actCfgList = this.getValidActivityCfgListByType(type, sonType, true);
			if (actCfgList.length > 0)
			{
				return this.getActivityDataById(actCfgList[0].iD);
			}
			return null;
		}

		public getActivityDataByTypeAndGroupId(groupId, type: Pb_God._emActivityType, sonType: number = 0): Pb_God.PBPlayerActivityData
		{
			let actCfgList = this.getValidActivityCfgListByType(type, sonType, true);
			if (actCfgList.length > 0)
			{
				for (let i = 0; i < actCfgList.length; i++)
				{
					if (cfg.ActivityCfgData.getInfo(actCfgList[i].iD).groupId == groupId)
					{
						return this.getActivityDataById(actCfgList[i].iD)
					}
				}
			}
			return null;
		}

		/** 获取七日登陆开启状态 */
		public getSevenLoginOpenState(): boolean
		{
			// 等级条件判断
			let isOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.ActivityLogin);
			if (!isOpen) { return false; }
			//检查活动
			let act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_7Day);
			if (!act_data) { return false; }
			//追加礼包是否全部购买完毕
			let charge_cfg_arr = PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_7DayLogin);
			for (let chargeCfgInfo of charge_cfg_arr)
			{
				let buyInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
				let hasGet = !!buyInfo && chargeCfgInfo.maxBuyCount != 0 && buyInfo.buycount >= chargeCfgInfo.maxBuyCount;
				if (!hasGet) { return true; }
			}

			let login_cfg_arr = cfg.ActivityLoginCfgData.getDataArrayByActivityId(act_data.id);
			for (let i in login_cfg_arr)
			{
				//还有奖励没领
				if (!ActivityDataMgr.isActBoxFinish(act_data.id, login_cfg_arr[i].index))
				{
					return true;
				}
			}
			return false;
		}

		/** 获取春节累登开启状态 */
		public getSpringFestivalLoginOpenState(): boolean
		{
			// // 等级条件判断
			// let isOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.ActivityLogin);
			// if (!isOpen) return false;
			//检查活动
			let act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_Total);
			if (!act_data) { return false; }

			let login_cfg_arr = cfg.ActivityLoginCfgData.getDataArrayByActivityId(act_data.id);
			for (let i in login_cfg_arr)
			{
				//还有奖励没领
				if (!ActivityDataMgr.isActBoxFinish(act_data.id, login_cfg_arr[i].index))
				{
					return true;
				}
			}
			return false;
		}

		/**
		 * 获取7天目标活动结束时间
		 */
		public getSevenDayAchieveEndTime(): number
		{
			let act_data = this.getActivityDataByType(Pb_God._emActivityType.Activity_Achievement);
			if (!act_data) { return 0; }
			let act_start_time = ActivityDataMgr.getActivity_DataValue(act_data.id, Pb_God._emActivityDataKey.Activity_Key_AchievementOpenTime);
			let act_end_time = act_start_time + 86400 * 7;//计算结束时间
			return act_end_time;
		}

		public getActivityRewardsLeftCount(act_ID: number, reward_cfg_id: number): number
		{
			let s_key = act_ID + "_" + reward_cfg_id;
			return this.actRewardLeftCountMap.get(s_key) || 0;
		}

		/**
		 * 获取活动剩余奖励数据
		 * @param act_id
		 * @param cfg_id
		 */
		public getActivityIndexDataValue(act_id: number, cfg_id: number, value_type: Pb_God._emActivityDataKey): number
		{
			let index_data = this.getActivity_IndexDataById(act_id, cfg_id);
			return this.getActivity_IndexDataValue(index_data, value_type);
		}

		/** 检查通用的分组活动入口是否可以开启（检查里面关联的活动是否开） */
		public checkCommonGroupActivityOpen(groupID: number): boolean
		{
			let grpPageList = cfg.ActivityCommonGroupPageCfgData.getListByGrpId(groupID);
			for (let pageCfg of grpPageList)
			{
				let actIdList = pageCfg.activityIds.split(";");
				for (let actString of actIdList)
				{
					//只要有一个开启的，即可
					if (ActivityDataMgr.checkActivityOpenState(parseInt(actString)))
					{
						return true;
					}
				}
			}
			return false;
		}

		/**
		 * 检测自定义活动入口是否开启
		 * @param inId 
		 */
		public checkCustomActivityOpen(inId: number): boolean
		{
			let cfgData = cfg.ActivityCustomInCfgData.getInfo(inId);
			return ActivityDataMgr.checkActivityOpenState(cfgData.activityId);
		}

		/** 检查通用分组活动中， 充值分页是否有效（还有可购买的付费道具） */
		public checkCommonGroupActChargeValid(groupInfo: cfg.ActivityCommonGroupCfgInfo | cfg.ActivityCommonGroupPageCfgInfo): boolean
		{
			let actPageCfgList = cfg.ActivityCommonGroupPageCfgData.getListByGrpId(groupInfo.groupID);
			//付费对应的活动ID
			let chargeActivityId = 0;
			//找到付费的分页
			for (let actPageCfg of actPageCfgList)
			{
				if (actPageCfg.type == 1)
				{ //1是购买类型
					//找到开启中的活动
					for (let actIdString of actPageCfg.activityIds.split(";"))
					{
						if (ActivityDataMgr.checkActivityOpenState(parseInt(actIdString)))
						{
							chargeActivityId = parseInt(actIdString);
							break;
						}
					}
					break;
				}
			}
			if (chargeActivityId == 0) { return false; }
			//再找到对应的付费列表
			let giftParams = cfg.ActivityCfgData.getParamByID(chargeActivityId).split("|");
			//再组装一下付费配置列表，便于筛选分组
			let chargeCfgList: cfg.ChargeCfgInfo[] = [];
			for (let chargeIdString of giftParams[1].split(";"))
			{
				if (!chargeIdString) { continue; }
				chargeCfgList.push(cfg.ChargeCfgData.getInfo(parseInt(chargeIdString)));
			}
			//剔除掉未满足条件的
			chargeCfgList = PlatformDataMgr.filterValidChargeList(chargeCfgList);
			for (let el of chargeCfgList)
			{
				//有限购
				if (el.maxBuyCount > 0)
				{
					let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(el);
					if (chargeInfo && chargeInfo.buycount >= el.maxBuyCount)
					{
						//已买完
						continue;
					}
				}
				return true;
			}
			return false;
		}

		/** 红点模型 */
		public reddotModel = new RedDotModel;
		/** 分组通用活动 */
		public reddotModelCommonGrp = new RedDotModel;

		private initReddotModel(): void
		{
			this.reddotModel.cleanUp(true);

			this.initCommonGroupActReddot();

			//升级礼包红点
			let reddot = this.reddotModel.addChildModel("upgradeGift");
			reddot.setSystemSwitchId(Pro.emSystemSwitchType.LimitTimeAct); //限时活动总入口限制
			let actID_list = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Leveup);
			for (let cfgInfo of actID_list)
			{
				var actId = cfgInfo.iD;
				let childReddot = reddot.addChildModel(actId, null, actId);
				childReddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, actId);
				childReddot.addGlobalEventRefresh(EventNotify.Activity_Update, actId);
				childReddot.addGlobalEventRefresh(EventNotify.PlayerLevelChange);
				childReddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward, actId);  //监听对应活动ID的领奖
				childReddot.setupCheckMethod(this, this.checkLevelUpGiftReddot);
			}

			// 计次活动
			reddot = this.reddotModel.addChildModel("countTimes");
			reddot.setSystemSwitchId(Pro.emSystemSwitchType.LimitTimeAct); //限时活动总入口限制
			actID_list = [];// 找出所有计次活动类型id
			actID_list = actID_list.concat(cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_ClickGold),
				cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Voyage),
				cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Expedition),
				cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Raid),
				cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Risk)
			);
			for (let cfgInfo of actID_list)
			{
				var actId = cfgInfo.iD;
				let childReddot = reddot.addChildModel(actId, null, actId);
				childReddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, actId);
				childReddot.addGlobalEventRefresh(EventNotify.Activity_Update, actId); //监听对应活动ID的领奖
				childReddot.setupCheckMethod(this, this.checkCountTimesActReddot);
			}

			// 限时兑换红点
			reddot = this.reddotModel.addChildModel("limitExchange");
			reddot.setPlayerItemsListener([CfgID.ItemID.TreeFruit]);
			reddot.setSystemSwitchId(emSystemSwitchType.Weal);
			reddot.setupCheckMethod(this, () => { return true; });

			let childReddot = reddot.addChildModel(0);
			childReddot.setPlayerItemsListener([CfgID.ItemID.TreeFruit]);
			childReddot.setSystemSwitchId(emSystemSwitchType.Weal);
			childReddot.setupCheckMethod(this, () => { return true; });

			//成长基金红点
			reddot = this.reddotModel.addChildModel("gradeFund");
			reddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward);
			reddot.addGlobalEventRefresh(CmdEvent.Platform_update_chargeinfo);
			reddot.addGlobalEventRefresh(EventNotify.PlayerLevelChange);
			reddot.setSystemSwitchId(emSystemSwitchType.Weal);
			reddot.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "gradeFundOpen"); //当天有没有打开过界面
			reddot.setupCheckMethod(this, this.checkGradeFundReddot);

			//超值基金红点(超值基金会对应两个档次子类型)
			reddot = this.reddotModel.addChildModel("monthFund");
			let activityIds = cfg.ActivityFundCfgData.getActivityIdList();
			for (let i = 1; i <= activityIds.length; i++)
			{
				let activityId = activityIds[i - 1];
				let childReddot = reddot.addChildModel(i, null, activityId);
				childReddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward, activityId);
				childReddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, activityId);
				childReddot.addGlobalEventRefresh(CmdEvent.Platform_update_chargeinfo);
				childReddot.setSystemSwitchId(Pro.emSystemSwitchType.Fund);
				childReddot.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "monthFundOpen" + activityId);
				childReddot.setupCheckMethod(this, this.checkMonthFundReddot);
			}

			//首充红点(多档奖励 和 当天首次点击进入)
			reddot = this.reddotModel.addChildModel("firstPay");
			let firstPayOpen = reddot.addChildModel("openUI");
			firstPayOpen.setSystemSwitchId(emSystemSwitchType.FirstPay);
			firstPayOpen.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "firstPayOpen");
			firstPayOpen.setupCheckMethod(this, () =>
			{
				return !TodayRepeatOpMgr.Inst.getTag("firstPayOpen") && !ActivityDataMgr.getFinishFirstPayAct();
			})
			for (let i = 0; i < 2; i++)
			{ //两档
				var cfgList = cfg.ActivityFirstChargeCfgData.getListByAmountIndex(i);
				var activityId = cfgList[0].activityID;
				let childReddot = reddot.addChildModel(i, null, cfgList);
				childReddot.setSystemSwitchId(emSystemSwitchType.FirstPay);
				childReddot.addGlobalEventRefresh(EventNotify.Activity_Update, activityId);
				childReddot.setupCheckMethod(this, this.checkFirstPayReddot);
			}

			// 7日登陆红点
			reddot = this.reddotModel.addChildModel("sevenDayLogin");
			let activityInfo_Arr = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_7Day);
			for (let i = 0; i < activityInfo_Arr.length; i++)
			{
				let act_cfg = activityInfo_Arr[i];
				let sub_reddot = reddot.addChildModel(i, null, act_cfg.iD);
				sub_reddot.setSystemSwitchId(emSystemSwitchType.ActivityLogin);
				sub_reddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, act_cfg.iD);
				sub_reddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward);
				sub_reddot.setupCheckMethod(this, this.checkSevenDayLoginReddot);
			}

			// 春节累登红点
			reddot = this.reddotModel.addChildModel("SpringFestivalLogin");
			let SpringFestivalActivityInfo_Arr = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_Total);
			for (let i = 0; i < SpringFestivalActivityInfo_Arr.length; i++)
			{
				let act_cfg = SpringFestivalActivityInfo_Arr[i];
				let sub_reddot = reddot.addChildModel(i, null, act_cfg.iD);
				//sub_reddot.setSystemSwitchId(emSystemSwitchType.ActivityLogin);
				sub_reddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, act_cfg.iD);
				sub_reddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward);
				sub_reddot.setupCheckMethod(this, this.checkSpringFestivalLoginReddot);
			}

			//限时礼包红点(开启后，只要点一下就够了)
			reddot = this.reddotModel.addChildModel("limitTimeGift");
			reddot.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "limitTimeGiftOpen");
			reddot.setupCheckMethod(this, () =>
			{
				//是否点了一下了。
				if (TodayRepeatOpMgr.Inst.getTag("limitTimeGiftOpen")) { return false; }
				//活动是否还在
				let act_endTime = ActivityDataMgr.getLatestShortTimeActEndTime();
				return act_endTime && TimeController.currTimer / 1000 < act_endTime;
			})

			//0元购活动红点(开启后，只要点一下就够了)
			reddot = this.reddotModel.addChildModel("zeroBuy");
			reddot.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "zeroBuyActOpen");
			reddot.setSystemSwitchId(emSystemSwitchType.ZeroBuy);
			reddot.addGlobalEventRefresh(CmdEvent.Activity_GetStartTime);
			reddot.setupCheckMethod(this, () =>
			{
				//是否点了一下了。
				if (TodayRepeatOpMgr.Inst.getTag("zeroBuyActOpen")) { return false; }
				//活动是否还在
				let activityId: number = ActivityDataMgr.getFirstValidActivityIdByType(Pb_God._emActivityType.Activity_ZeroBuy);
				if (activityId == -1)
				{
					return false;
				}
				let actData = this.getActivityDataByType(activityId);
				if (!actData)
				{
					return true;
				}
				//全部买完了就不要了, 也就是只要一个没有买就return true
				let giftList = cfg.ActivityZeroBuyCfgData.getListByActId(activityId);
				for (let cfgInfo of giftList)
				{
					if (actData.acquired.indexOf(cfgInfo.index) < 0) { return true; }
				}
				return false;
			});

			//全服限购红点（活动开启后，每天点一下就好）
			reddot = this.reddotModel.addChildModel("limitCharge");
			reddot.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "limitChargeActOpen");
			reddot.setSystemSwitchId(emSystemSwitchType.LimitChargeGift);
			reddot.addGlobalEventRefresh(CmdEvent.Activity_GetStartTime);
			reddot.setupCheckMethod(this, () =>
			{
				//是否点了一下了。
				if (TodayRepeatOpMgr.Inst.getTag("limitChargeActOpen")) { return false; }
				//活动是否还在
				let activityCfgInfo = ActivityDataMgr.getFirstValidActivityIdByType(Pb_God._emActivityType.Activity_LimitGift);
				if (activityCfgInfo == -1)
				{
					return false;
				}
				return true;
			});

			/** 周末福蛋红点 */
			reddot = this.reddotModel.addChildModel("luckyEgg");
			reddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward);
			activityId = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_LuckyEgg, 0)[0].iD;
			reddot.addGlobalEventRefresh(EventNotify.Activity_Update, activityId);
			reddot.setupCheckMethod(this, this.checkWeekWelfareReddot);

			/** 迎新战令 */
			reddot = this.reddotModel.addChildModel("welcomeWarOrderRed");
			reddot.addGlobalEventRefresh(EventNotify.WarOrderRed_Update);
			reddot.addGlobalEventRefresh(Cmd.S2C_Common_ExpendSyn.cmdName);
			reddot.addGlobalEventRefresh(Cmd.S2C_Item_UpdateNum.cmdName);
			reddot.setupCheckMethod(this, this.welcomeWarOrderRed);

			/** 进阶战令 */
			reddot = this.reddotModel.addChildModel("evolutionWarOrderRed");
			reddot.addGlobalEventRefresh(EventNotify.WarOrderRed_Update);
			reddot.addGlobalEventRefresh(Cmd.S2C_Common_ExpendSyn.cmdName);
			reddot.addGlobalEventRefresh(Cmd.S2C_Item_UpdateNum.cmdName);
			reddot.setupCheckMethod(this, this.evolutionWarOrderRed);

		}

		/** 通用分组活动红点模型初始化 */
		private initCommonGroupActReddot(): void
		{
			this.reddotModelCommonGrp.cleanUp(true);
			this.reddotModelCommonGrp.setSystemSwitchId(Pro.emSystemSwitchType.LimitTimeAct); //限时活动总入口限制
			//通用分组限时活动（比如一键牛逼）。
			let grpList = cfg.ActivityCommonGroupCfgData.getAll();
			for (let grpCfgInfo of grpList)
			{
				let grpReddotModel = this.reddotModelCommonGrp.addChildModel(grpCfgInfo.groupID, null, grpCfgInfo);
				//一个分组入口内，会有多个界面分页
				let pageList = cfg.ActivityCommonGroupPageCfgData.getListByGrpId(grpCfgInfo.groupID);
				for (let pageCfgInfo of pageList)
				{
					let pageReddot = grpReddotModel.addChildModel(pageCfgInfo.indexID, null, pageCfgInfo);
					//对应的活动列表
					let actIdList = pageCfgInfo.activityIds.split(";");
					//根据不同的类型，区分不同的数据处理
					if (pageCfgInfo.type == 1)
					{
						//付费礼包，里面会有0元购，是关联在商城模块的。
						let actId = parseInt(actIdList[0]);
						let actParams = cfg.ActivityCfgData.getParamByID(actId);
						let shopId = parseInt(actParams.split("|")[0]);
						let shopCfgInfo = cfg.ShopFixShopCfgData.getInfo(shopId);
						if (shopCfgInfo)
						{
							pageReddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, actId);
							pageReddot.addGlobalEventRefresh(EventNotify.Shop_FixBuyCount_changed, shopId);
							//检查商品还能不能再买即可
							pageReddot.setupCheckMethod(this, () =>
							{
								if (!this.checkActivityOpenState(actId)) { return false; }
								let limitBuyCount = shopCfgInfo.limitBuyCount || shopCfgInfo.dayBuyCount || shopCfgInfo.weekBuyCount || shopCfgInfo.monthBuyCount || 0;
								if (limitBuyCount > 0 && ShopDataMgr.getFixBuyCountById(shopCfgInfo.iD) >= limitBuyCount) { return false; }
								return true;
							})
						}
					} else if (pageCfgInfo.type == 2)
					{
						//累计充值红点
						for (let el of actIdList)
						{
							let actId = parseInt(el);
							let childReddot = pageReddot.addChildModel(actId, null, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_Update, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward, actId);  //监听对应活动ID的领奖
							childReddot.setupCheckMethod(this, this.checkTotalChageReddot);
						}
					} else if (pageCfgInfo.type == 3)
					{
						//充值累计天数红点
						for (let el of actIdList)
						{
							let actId = parseInt(el);
							let childReddot = pageReddot.addChildModel(actId, null, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_Update, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward, actId);  //监听对应活动ID的领奖
							childReddot.setupCheckMethod(this, this.checkTotalDayChargeReddot);
						}
					}
					else if (pageCfgInfo.type == 5)
					{
						//成就之路是否有可领取
						for (let el of actIdList)
						{
							let actId = parseInt(el);
							let childReddot = pageReddot.addChildModel(actId, null, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Achieve_Activity_Update);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_Update, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward, actId);
							childReddot.setupCheckMethod(this, this.getRisingStarReward)
						}
					}
					else if (pageCfgInfo.type == 10)
					{
						// 定制礼包 0元
						for (let el of actIdList)
						{
							let actId = parseInt(el);
							let childReddot = pageReddot.addChildModel(actId, null, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Achieve_Activity_Update);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_Update, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_DrawReward, actId);
							childReddot.setupCheckMethod(this, this.checkDiyReddot)
						}
					}
					else if(pageCfgInfo.type == 13)
					{
						for (let el of actIdList)
						{
							let actId = parseInt(el);
							let childReddot = pageReddot.addChildModel(actId, null, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_OpenTime_Update, actId);
							childReddot.addGlobalEventRefresh(EventNotify.Activity_Update, actId);
							childReddot.addGlobalEventRefresh(CmdEvent.ActivityBoss_InfoChg);
							childReddot.setupCheckMethod(this, this.checkActivityBossRedDot);
						}
					}

				}
			}
		}


		/** 成就之路是否有可领取任务 */
		private getRisingStarReward(reddotModel: RedDotModel): boolean
		{
			let activityId: number = reddotModel.bindData;
			//先检查活动是否开启
			if (!this.checkActivityOpenState(activityId)) { return false; }
			// let actCfg_list = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_AchieveRoad);

			let tmpCfgList = AchieveDataMgr.getTabItemIdRisingStarInfo(activityId);
			for (let i = 0; i < tmpCfgList.length; i++)
			{
				let tempInfo = cfg.AchieveRoadCfgData.getInfo(tmpCfgList[i].achievement);
				let tempNum = AchieveDataMgr.getActivity_RisingStarValue(tempInfo.iD);
				let taskAllNum = tempInfo.value
				if (tempNum >= taskAllNum && !AchieveDataMgr.isActivity_RisingStarFinish(tempInfo.iD))
				{
					return true;
				}
			}
			return false;

		}

		/**积天充值红点检测 */
		private checkTotalDayChargeReddot(reddotModel: RedDotModel): boolean
		{
			let activityId: number = reddotModel.bindData;
			//先检查活动是否开启
			if (!this.checkActivityOpenState(activityId)) { return false; }
			let cfg_list = cfg.ActivityChargeDaysCfgData.getListByActId(activityId);
			let _total_charge_day = this.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_ChargeDays);
			for (let cfg_data of cfg_list)
			{
				let has_get = ActivityDataMgr.isActBoxFinish(activityId, cfg_data.index);//是否已领取
				let can_get = !has_get && _total_charge_day >= cfg_data.day;//可以领取
				if (can_get)
				{//有可领取的奖励
					return true;
				}
			}
			return false;
		}

		/**
		 * 升级礼包红点检测
		 * @param reddotModel
		 */
		private checkLevelUpGiftReddot(reddotModel: RedDotModel): boolean
		{
			let activityId: number = reddotModel.bindData;
			//先检查活动是否开启
			if (!this.checkActivityOpenState(activityId)) { return false; }
			let result = false;
			let cfg_list = cfg.ActivityLevelupCfgData.getListByActId(activityId);
			let cur_lv = PlayerDataMgr.level;
			for (let cfg_data of cfg_list)
			{
				//全服奖励剩余数量
				let act_data = this.getActivityDataById(activityId);
				if (!act_data) { break; }
				let left_count = this.getActivityRewardsLeftCount(activityId, cfg_data.index);
				let has_get = ActivityDataMgr.isActBoxFinish(activityId, cfg_data.index);//是否已领取
				let can_get = !has_get && cur_lv >= cfg_data.level;//可以领取
				if (can_get && left_count >= 0)
				{//有可领取的奖励
					result = true;
					break;
				}
			}
			return result;
		}

		/**
		 * 计次活动红点检测
		 * @param reddotModel
		 */
		private checkCountTimesActReddot(reddotModel: RedDotModel): boolean
		{
			let activityId: number = reddotModel.bindData;
			//先检查活动是否开启
			if (!this.checkActivityOpenState(activityId)) { return false; }
			let result = false;
			let cfg_list = cfg.ActivityTimesCfgData.getListByActId(activityId);
			let cur_times = this.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_CompleteNum);
			for (let k in cfg_list)
			{
				let cfg_data = cfg_list[k];
				let has_get = ActivityDataMgr.isActBoxFinish(activityId, cfg_data.index);//是否已领取
				let can_get = !has_get && cur_times >= cfg_data.times;//可以领取
				if (can_get)
				{//有可领取的奖励
					result = true;
					break;
				}
			}
			return result;
		}

		/**
		 * 累计充值红点检测
		 * @param reddotModel
		 */
		private checkTotalChageReddot(reddotModel: RedDotModel): boolean
		{
			let activityId: number = reddotModel.bindData;
			//先检查活动是否开启
			if (!this.checkActivityOpenState(activityId)) { return false; }
			let cfg_list = cfg.ActivityChargeAmountCfgData.getListByActId(activityId);
			let total_charge_value = this.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_ChargeAmount);
			let result = false;
			for (let cfg_data of cfg_list)
			{
				let has_get = ActivityDataMgr.isActBoxFinish(activityId, cfg_data.index);//是否已领取
				let can_get = !has_get && total_charge_value >= cfg_data.charge;//可以领取
				if (can_get)
				{//有可领取的奖励
					result = true;
					break;
				}
			}
			return result;
		}

		/** 首充红点 */
		private checkFirstPayReddot(reddotModel: RedDotModel): boolean
		{
			let cfgList = reddotModel.bindData as cfg.ActivityFirstChargeCfgInfo[];
			if (!cfgList) { return false; }
			let activityId: number = cfgList[0].activityID;
			let chargeAmount = ActivityDataMgr.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_ChargeAmount);
			if (chargeAmount < cfgList[0].amount) { return false; } //没激活
			//     首充上次领取的时间;
			let lastGetTime = this.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_FirstChargeLastTime);
			//     首充已经领取的天数;
			let getDay = this.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_FirstChargeDay);
			//全部领完了
			if (getDay >= cfgList.length) { return false; }
			//上次领的时候是今天，也就是说今天领过了
			if (new Date(lastGetTime * 1000).toDateString() === new Date(TimeController.currTimer).toDateString()) { return false; }
			return true;
		}

		/** 检查超值月基金红点 */
		private checkMonthFundReddot(reddotModel: RedDotModel): boolean
		{
			let activityId: number = reddotModel.bindData;
			//先检查活动是否开启
			if (!this.checkActivityOpenState(activityId)) { return false; }
			//当天是否打开过界面
			let todayOpenUI = TodayRepeatOpMgr.Inst.getTag("monthFundOpen" + activityId);
			if (!todayOpenUI) { return true; }
			//再拿到充值信息检查是否激活
			let ActivityCfg = cfg.ActivityCfgData.getInfo(activityId);
			let chargeId = ActivityCfg.param;
			let chargeInfo = PlatformDataMgr.getChargeInfoByGroupId(parseInt(chargeId));
			if (!chargeInfo) { return false; }
			if (chargeInfo.buycount <= 0) { return false; }

			let activityData = ActivityDataMgr.getActivityDataById(activityId);
			if (ActivityCfg.sonType == 1)	//月基金
			{
				//如果有购买信息，还需检查一次最后的购买时间往后推30天是否还在有效期内。
				let activeEndTime = Global.getLaterDayTime(chargeInfo.lastbuytime * 1000, 30);
				let currTimer = TimeController.currTimer;
				if (activeEndTime <= currTimer) { return false; }
				//再检查当天是否有没有领过奖
				let activeDays = 30 - Math.floor((activeEndTime - currTimer) / (24 * 3600 * 1000));
				let fundCfgInfo = cfg.ActivityFundCfgData.getInfoByActivityIdAndDay(activityId, activeDays);
				if (!fundCfgInfo) { return false; }
				//当天是否已经领奖
				let todayIsGet = activityData && activityData.acquired.indexOf(fundCfgInfo.index) >= 0;
				return !todayIsGet;
			}
			else if (ActivityCfg.sonType == 2)//终身卡
			{
				//当天是否已经领奖
				let time = ActivityDataMgr.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_LifeTime_LastTime);
				let todayIsGet = activityData && time > 0;
				//已经购买且领取过的话，判断今天有没有领取
				if (todayIsGet)
				{
					let before = Global.getFormatTimeString(time * 1000, 2);//上一次领取的那天
					let today = Global.getFormatTimeString(TimeController.currTimer, 2);//今天
					todayIsGet = before != today ? false : true;
				}
				return !todayIsGet;
			}

		}

		/** 检查成长基金红点 */
		private checkGradeFundReddot(reddotModel: RedDotModel): boolean
		{
			//是否激活成长基金
			let chargeCfgInfo = PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_GrowFund)[0];
			let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
			//如果没有激活， 则检查当天是否有没有点开过界面
			if (!chargeInfo || chargeInfo.buycount <= 0) { return !TodayRepeatOpMgr.Inst.getTag("gradeFundOpen"); }
			//已经激活了，就再也不需要监听支付了
			reddotModel.removeGlobalEventListener(CmdEvent.Platform_update_chargeinfo);
			let playerLevel = PlayerDataMgr.level;
			for (var cfgInfo of cfg.ActivityGrowFundCfgData.getAll())
			{
				if (playerLevel < cfgInfo.level) { continue; }
				let activityData: Pb_God.PBPlayerActivityData = ActivityDataMgr.getActivityDataById(cfgInfo.activityID);
				if (!activityData || activityData.acquired.indexOf(cfgInfo.index) < 0) { return true; }
			}

			return false;
		}

		/**
		 * 7天登陆红点
		 * @param reddotModel
		 */
		private checkSevenDayLoginReddot(reddotModel: RedDotModel): boolean
		{
			// let act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Login);
			// if (!act_data) {
			// 	return false;
			// }
			// if (reddotModel.bindData != act_data.id) {
			// 	reddotModel.bindData == act_data.id;
			// 	reddotModel.removeGlobalEventListener(EventNotify.Activity_DrawReward);
			// 	reddotModel.addGlobalEventRefresh(EventNotify.Activity_DrawReward, act_data.id);
			// }
			let act_id = reddotModel.bindData;
			if (!this.checkActivityOpenState(act_id)) { return false; }
			let cur_day = this.getActivity_DataValue(act_id, Pb_God._emActivityDataKey.Activity_Key_LoginDays);
			let login_cfg_arr = cfg.ActivityLoginCfgData.getDataArrayByActivityId(act_id);
			for (var index = 0; index < login_cfg_arr.length; index++)
			{
				let cfg = login_cfg_arr[index];
				let has_get = this.isActBoxFinish(act_id, cfg.index);
				let can_get = cur_day >= cfg.day && !has_get;
				if (can_get)
				{ return true; }
			}
			return false;
		}

		/**
		 * 春节累登红点
		 * @param reddotModel
		 */
		private checkSpringFestivalLoginReddot(reddotModel: RedDotModel): boolean
		{

			let act_id = reddotModel.bindData;
			if (!this.checkActivityOpenState(act_id)) { return false; }
			let cur_day = this.getActivity_DataValue(act_id, Pb_God._emActivityDataKey.Activity_Key_LoginDays);
			let login_cfg_arr = cfg.ActivityLoginCfgData.getDataArrayByActivityId(act_id);
			for (var index = 0; index < login_cfg_arr.length; index++)
			{
				let cfg = login_cfg_arr[index];
				let has_get = this.isActBoxFinish(act_id, cfg.index);
				let can_get = cur_day >= cfg.day && !has_get;
				if (can_get)
				{ return true; }
			}
			return false;

		}

		/**定制礼包0元红点检测 */
		private checkDiyReddot(reddotModel: RedDotModel): boolean
		{

			// let activityId: number = reddotModel.bindData;
			// //先检查活动是否开启
			// if (!this.checkActivityOpenState(activityId)) { return false; }
			// let act_cfg = cfg.CustomGiftCfgData.getFirstInfo();
			// let has_get = ActivityDataMgr.getActBuyCount(activityId, 1) < act_cfg.limitNum;//0元是否已领取

			// if (has_get)
			// {//有可领取的奖励
			// 	return true;
			// }
			return false;  // 策划要求定制礼包不显示红点了
		}

		private checkActivityBossRedDot()
		{
			return ActivityBossDataMgr.checkChallengeRedDot();
		}


		/**
		 * 更新奖励剩余数量
		 * @param reward_data
		 */
		public updateRewardCount(reward_data: Pb_God.PBG2CActivityRewardNum): void
		{

			let act_data: any = this.getActivityDataById(reward_data.id);
			if (!act_data) { return; }
			for (let r_data of reward_data.reward)
			{
				let s_key = reward_data.id + "_" + r_data.key;
				this.actRewardLeftCountMap.put(s_key, r_data.value);
			}
		}

		/**
		 * 指定活动奖励是否已领取
		 * @param act_id
		 * @param cfg_index
		 */
		public isActBoxFinish(act_id: number, cfg_index: number): boolean
		{
			let act_data = this.getActivityDataById(act_id);
			if (!act_data) { return false; }
			return act_data.acquired.indexOf(cfg_index) >= 0;
		}

		/**
		 * 获取指定7天目标活动已开启天数
		 * @param act_data
		 */
		public getActivityAchieveOpenDays(act_id: number): number
		{
			let act_start_time = this.getActivity_DataValue(act_id, Pb_God._emActivityDataKey.Activity_Key_AchievementOpenTime);
			let cur_time = TimeController.currTimer / 1000;
			let passed_time = cur_time - act_start_time;
			let passed_day = Math.max(Math.ceil(passed_time / 86400), 1);
			if (this.curSevenDayAchiveOpenDay != passed_day)
			{ EventMgr.trigger(EventNotify.Activity_AchiveOpenDayChange); }
			this.curSevenDayAchiveOpenDay = passed_day;
			return passed_day;
		}

		/**
		 * 获取活动服务端开启时间
		 *
		 * @param act_id
		 */
		public getActivityServerOpenTime(act_id: number): number
		{
			return this.activityStartTimeMap.get(act_id) || 0;
		}

		/** 根据活动类型，获取当前开启中的活动列表配置
		 * @param checkActData 是否需要同时检查活动数据
		 */
		public getValidActivityCfgListByType(actType: Pb_God._emActivityType, sonType: number = 0, checkActData: boolean = false): cfg.ActivityCfgInfo[]
		{
			let allList = cfg.ActivityCfgData.getListByType(actType, sonType);
			let ret = [];
			for (let el of allList)
			{
				if (!this.checkActivityOpenState(el.iD))
				{
					continue;
				}
				if (checkActData && !this._activityDatasMap.get(el.iD))
				{
					continue;
				}
				ret[ret.length] = el;
			}
			return ret;
		}

		public getFirstValidActivityIdByType(actType: Pb_God._emActivityType, sonType: number = 0, checkActData: boolean = false): number
		{
			let ret = this.getValidActivityCfgListByType(actType, sonType, checkActData);
			if (ret && ret.length)
			{
				var info: cfg.ActivityCfgInfo = ret[0];
				return info.iD;
			}
			return -1;
		}

		/** 根据活动ID判断此活动是否开启中 */
		public checkActivityOpenState(activityId: number): boolean
		{
			let openState = cfg.ActivityCfgData.getOpenStateByID(activityId);
			if (openState == ActivityOpenStateType.Close)// 活动未开启
			{ return false; }

			if (cfg.ActivityCfgData.isOptionTypeActivity(activityId, Pb_God._emActivityOption.ActivityOption_NotUseTime))
			{
				// 获取活动持续天数
				let option_args = cfg.ActivityCfgData.getActivityOptionArgs(activityId, Pb_God._emActivityOption.ActivityOption_Duration);
				if (option_args.length == 0)
				{
					logE("活动参数配置错误! id:" + activityId);
				}
				let delay_day = parseInt(option_args[0]);//持续天数
				if (this.getActivityServerOpenTime(activityId) > 0)
				{
					let act_end_time = this.getActivityServerOpenTime(activityId) + delay_day * 86400;
					let cur_time = TimeController.currTimer / 1000;
					return act_end_time >= cur_time;
				}

			}

			if (openState == ActivityOpenStateType.FinishRewards)
			{
				// 此类型活动无需检测活动结束时间
				// 检测对应活动是否领取完奖励
				return !this.isActivityRewardsFinish(activityId);
			}

			// 直接读取活动的开启时间
			/*let timeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(activityId);
			if (!timeInfo) return false;
			return timeInfo.isInOpenTime(TimeController.currTimer, TimeController.worldCreateZeroTime);*/
			let openTime = this.getActivityServerOpenTime(activityId);
			return openTime != 0;
		}

		/**
		 * 对应的活动类型是否已经领取完奖励
		 * @param act_type
		 */
		private isActivityRewardsFinish(act_ID: number): boolean
		{
			let act_cfg = cfg.ActivityCfgData.getInfo(act_ID);
			if (!act_cfg) { return false; }
			switch (act_cfg.type)
			{
				case Pb_God._emActivityType.Activity_Charge_Amount:
					{//累计充值
						let cfg_list = cfg.ActivityChargeAmountCfgData.getListByActId(act_ID);
						for (let cfgInfo of cfg_list)
						{
							if (!ActivityDataMgr.isActBoxFinish(act_ID, cfgInfo.index))
							{ return false; }
						}
					}
					break;
				case Pb_God._emActivityType.Activity_Charge_Days:
					{//累天充值
						let cfg_list = cfg.ActivityChargeDaysCfgData.getListByActId(act_ID);
						for (let cfgInfo of cfg_list)
						{
							if (!ActivityDataMgr.isActBoxFinish(act_ID, cfgInfo.index))
							{ return false; }
						}
					}
					break;
				case Pb_God._emActivityType.Activity_Leveup:
					{//等级礼包
						let cfg_list = cfg.ActivityLevelupCfgData.getListByActId(act_ID);
						for (let cfgInfo of cfg_list)
						{
							if (!ActivityDataMgr.isActBoxFinish(act_ID, cfgInfo.index))
							{ return false; }
						}
					}
					break;
				case Pb_God._emActivityType.Activity_Times:
					{//计次礼包
						let cfg_list = cfg.ActivityTimesCfgData.getListByActId(act_ID);
						for (let cfgInfo of cfg_list)
						{
							if (!ActivityDataMgr.isActBoxFinish(act_ID, cfgInfo.index))
							{ return false; }
						}
					}
					break;
				default://其他类型活动暂不做领取判断 或 单独判断
					return false;
			}
			// 所有奖励已领取完
			return true;
		}

		/**
		 * 获取活动结束时间数据(用于UI显示倒计时)
		 * 有重置时间则返回重置结束时间
		 * 没有重置时间则返回活动结束时间
		 * @param act_id
		 */
		public getActivityEndTimeStamp(act_id: number): number
		{
			let currTimer = TimeController.currTimer;
			// N天后重置的活动
			if (cfg.ActivityCfgData.isOptionTypeActivity(act_id, Pb_God._emActivityOption.ActivityOption_ResetDuration))
			{
				let args = cfg.ActivityCfgData.getActivityOptionArgs(act_id, Pb_God._emActivityOption.ActivityOption_ResetDuration);
				let loopDay = 0;
				if (args.length > 0) { loopDay = parseInt(args[0]); }
				loopDay = loopDay * 86400;
				// 使用服务器活动开启时间
				let act_start_time = this.getActivityServerOpenTime(act_id);
				let act_end_time = loopDay - (currTimer / 1000 - act_start_time) % loopDay + currTimer / 1000;
				return act_end_time;

			} else if (cfg.ActivityCfgData.getRefreshTimeByID(act_id))
			{
				// 有固定重置时间的活动
				let refreshInfo = cfg.ActivityCfgData.getRefreshTimeInfoByID(act_id);

				let isMerge = cfg.ActivityCfgData.getIsMergeByID(act_id);
				let act_end_time = refreshInfo.getEndTime(currTimer, isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime)
				return act_end_time / 1000;
			}

			// ----------------------
			// 没有重置时间的活动类型 读取活动结束时间
			if (cfg.ActivityCfgData.isOptionTypeActivity(act_id, Pb_God._emActivityOption.ActivityOption_Duration))
			{
				// 有持续时长选项的活动类型
				let args = cfg.ActivityCfgData.getActivityOptionArgs(act_id, Pb_God._emActivityOption.ActivityOption_Duration);
				let add_day = 0;
				if (args.length > 0) { add_day = parseInt(args[0]); }
				add_day = add_day * 86400;

				// 读取服务器活动开启时间 计算结束时间
				let act_start_time = this.getActivityServerOpenTime(act_id);
				let act_end_time = act_start_time + add_day;
				return act_end_time;

			}

			// 只读取表格配置的活动结束时间
			if (cfg.ActivityCfgData.getOpenTimeByID(act_id))
			{
				let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(act_id);
				let isMerge = cfg.ActivityCfgData.getIsMergeByID(act_id);
				let act_end_time = openTimeInfo.getEndTime(TimeController.currTimer, isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime);
				return act_end_time / 1000;
			}

			logE("活动时间配置错误!");
			return 0;
		}

		/** 超值基金是否全部激活了 */
		public getMonthFundAllActive(): boolean
		{
			let currTimer = TimeController.currTimer;
			let isAllActive = true;
			let activityIds = cfg.ActivityFundCfgData.getActivityIdList();
			for (let i = 1; i <= activityIds.length; i++)
			{
				let activityId = activityIds[i - 1];
				if (!ActivityDataMgr.checkActivityOpenState(activityId)) { continue; }
				let chargeCfgInfo = cfg.ChargeCfgData.getInfo(parseInt(cfg.ActivityCfgData.getParamByID(activityId)));
				let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
				let isActive = false;
				if (chargeInfo && chargeInfo.buycount > 0)
				{ //如果有购买信息，还需检查一次最后的购买时间往后推30天是否还在有效期内。
					isActive = Global.getLaterDayTime(chargeInfo.lastbuytime * 1000, 30) > currTimer;
				}
				if (!isActive)
				{
					isAllActive = false;
					break;
				}
			}
			return isAllActive;
		}

		/** 首充奖励是否全部领完了 */
		public getFinishFirstPayAct(): boolean
		{
			let getTick = 0;
			let allActivity = ActivityDataMgr.getValidActivityCfgListByType(Pb_God._emActivityType.Activity_FirstCharge);
			for (let i = 0; i < allActivity.length && i < 2; i++)
			{ //两档
				var cfgList = cfg.ActivityFirstChargeCfgData.getListByAmountIndex(i);
				let actId = cfgList[0].activityID;
				let chargeAmount = ActivityDataMgr.getActivity_DataValue(actId, Pb_God._emActivityDataKey.Activity_Key_ChargeAmount);
				if (chargeAmount < cfgList[0].amount) { break; } //没激活
				//首充已经领取的天数;
				let getDay = ActivityDataMgr.getActivity_DataValue(actId, Pb_God._emActivityDataKey.Activity_Key_FirstChargeDay);
				//全部领完了
				if (getDay >= cfgList.length) { getTick++; }
			}
			return getTick >= 2;
		}

		/** 充值状态有变化时，检查首充的状态，自动弹出首充界面 */
		protected checkAndPopupFirstPayUI(actId: number): void
		{
			let firstPayType = Pb_God._emActivityType.Activity_FirstCharge;
			if (cfg.ActivityCfgData.getTypeByID(actId) != firstPayType)
			{ return; }
			//功能没开
			if (!PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.FirstPay)) { return; }
			let allActivity = ActivityDataMgr.getValidActivityCfgListByType(firstPayType);
			for (let i = 0; i < allActivity.length && i < 2; i++)
			{ //两档
				let activityCfgInfo = allActivity[i];
				var cfgList = cfg.ActivityFirstChargeCfgData.getListByAmountIndex(i);
				let activityId = activityCfgInfo.iD;
				let chargeAmount = ActivityDataMgr.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_ChargeAmount);
				if (chargeAmount < cfgList[0].amount) { continue; } //没激活
				//     首充上次领取的时间;
				let lastGetTime = this.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_FirstChargeLastTime);
				//     首充已经领取的天数;
				let getDay = this.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_FirstChargeDay);
				//全部领完了
				if (getDay >= cfgList.length) { continue; }
				//上次领的时候是今天，也就是说今天领过了
				if (new Date(lastGetTime * 1000).toDateString() === new Date(TimeController.currTimer).toDateString()) { continue; }
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FirstPay), BaseBackUIType.HideBackUI);
				return;
			}
		}

		public getDayLimitBuyData(id: number)
		{
			// let activityData = cfg.ActivityCfgData.getDayLimitBuyCfgData();
			return this._activityDatasMap.get(id);
		}

		/**
		 * 获取对应礼包已经购买的次数
		 * @param giftId
		 */
		public getDayLimitHaveBuyCount(giftId: number, id: number)
		{
			let dayLimitBuyData = this.getDayLimitBuyData(id);

			for (let i = 0; i < dayLimitBuyData.indexdata.length; i++)
			{
				if (giftId == dayLimitBuyData.indexdata[i].index)
				{ return dayLimitBuyData.indexdata[i].data.filter(element => element.key == Pb_God._emActivityDataKey.Activity_Key_BuyCount)[0].value }
			}
			return 0
		}

		/**
		 * 检测是否可以一键购买
		 * 无购买记录时 服务端这边不会下发 所以要自己判断。。。
		 *
		 */
		public checkCanOneKeyBuy(id: number)
		{
			let dayLimitBuyData = this.getDayLimitBuyData(id);
			for (let i = 0; i < dayLimitBuyData.indexdata.length; i++)
			{
				let giftId = dayLimitBuyData.indexdata[i].index;
				if (this.getDayLimitHaveBuyCount(giftId, id) >= cfg.ChargeCfgData.getInfo(giftId).maxBuyCount)
				{
					return false;
				}
			}
			return true;
		}

		//胡帕活动--------------------

		public getHuPaExChangeData()
		{
			return this._activityDatasMap.get(this.getFirstValidActivityIdByType(Pb_God._emActivityType.Activity_ExchangeEx));
		}

		public getHuPaHaveExChangeCount(index: number)
		{
			// let huPaData = this.getHuPaExChangeData();
			let huPaData = this.getActivityDataById(cfg.ActivityExchangeExCfgData.getInfo(index).activityID);
			if (!huPaData)
				return 0
			for (let i = 0; i < huPaData.indexdata.length; i++)
			{
				if (index == huPaData.indexdata[i].index)
				{ return huPaData.indexdata[i].data.filter(element => element.key == Pb_God._emActivityDataKey.Activity_Key_ExchageNum)[0].value }
			}
			return 0
		}

		//春节战令------------------
		public getWelcomeWarOrderData(id: number)
		{

			return this._activityDatasMap.get(id);
		}

		/**
		 * 检测是否已经领取了
		 */
		public checkWelcomeWarOrderHaveGet(isSpecial: boolean, info: cfg.ActivityWarOrderLevelCfgInfo)
		{
			let data = this.getWelcomeWarOrderData(info.activityID);
			if (!data) return false;
			for (let i = 0; i < data.indexdata.length; i++)
			{
				if (data.indexdata[i].index == info.level)
				{
					let tmpData = data.indexdata[i].data.filter(element => element.key == (isSpecial ? Pb_God._emWarOrderRewardKey.War_Order_Reward_Key_Special : Pb_God._emWarOrderRewardKey.War_Order_Reward_Key_General))[0];
					if (tmpData && tmpData.value)
					{ return true; }
				}
			}
			return false;
		}

		/**
		 * 迎新战令红点
		 */
		public welcomeWarOrderRed()
		{
			return this.WarOrderRed(cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_WarOrder, 1)[0].iD);
		}

		/**
		 * 进阶战令红点
		 */
		public evolutionWarOrderRed()
		{
			return this.WarOrderRed(cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_WarOrder, 2)[0].iD);
		}

		/**是否有战令奖励可以领取
		 * id  活动id
		*/
		public WarOrderRed(id: number): boolean
		{
			let allInfos = cfg.ActivityWarOrderLevelCfgData.getAllList(id);
			for (let index = 0; index < allInfos.length; index++)
			{
				let info = allInfos[index];
				let normalHaveGot = this.checkWelcomeWarOrderHaveGet(false, info);
				let specialHaveGot = this.checkWelcomeWarOrderHaveGet(true, info);
				let normalCanGot = this.checkWelcomeWarOrderCanGet(false, info);
				let specialCanGot = this.checkWelcomeWarOrderCanGet(true, info);
				if ((normalCanGot && !normalHaveGot) || (specialCanGot && !specialHaveGot))
				{
					return true;
				}
			}
			return false;
		}

		/**
		 * 检测是否可以领
		 * 只涉及战令购买以及积分达标 不涉及是否已经领取了
		 */
		public checkWelcomeWarOrderCanGet(isSpecial: boolean, info: cfg.ActivityWarOrderLevelCfgInfo)
		{
			let data = this.getWelcomeWarOrderData(info.activityID);
			if (!data) return false;
			let scoreFinish = this.getWelcomeWarOrderScore(info.activityID) >= info.score;
			return !!(scoreFinish && (isSpecial ? this.checkBuyWelcomeWarOrder(info.activityID) : 1));
		}

		/**
		 * 获取战令积分
		 */
		public getWelcomeWarOrderScore(id: number)
		{
			let warParam = cfg.ActivityCfgData.getchangeID(id);
			return Global.getItemNum(warParam.currencyID);
		}

		/**
		 *  检测是否买了战令了
		 */
		public checkBuyWelcomeWarOrder(id: number)
		{
			let tmpData = this.getWelcomeWarOrderData(id).data.filter(element => element.key == Pb_God._emActivityDataKey.Activity_Key_War_Order_Buy)[0];
			return !!(tmpData && tmpData.value);
		}

		/**是否有福蛋可以领取的福蛋 */
		public checkWeekWefare(): boolean
		{
			let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_LuckyEgg, 0)[0];
			let tmpDataArr = this._activityDatasMap.get(actCfgInfo.iD);
			if (tmpDataArr && tmpDataArr.indexdata.length > 0)
			{
				for (let i = 0; i < tmpDataArr.indexdata.length; i++)
				{
					let indexData: Pb_God.PBPlayerActivityIndexData = tmpDataArr.indexdata[i];
					for (let j = 0; j < indexData.data.length; j++)
					{
						if (indexData.data[j].key == Pb_God._emActivityDataKey.Activity_Key_LuckyEgg_Index_Status && indexData.data[j].value == Pb_God._emLuckyEggStatus.LuckyEgg_Status_Can_Get)
						{
							return true;
						}
					}
				}
			}
			return false
		}
		/** 周末福蛋红点 */
		private checkWeekWelfareReddot(): boolean
		{
			return this.checkWeekWefare();
		}

		/**
		 * 福蛋状态数据
		 * 22：周末福蛋开启倒计时 福蛋使用;
		 * 23：周末福蛋奖励状态 0：不可领取;1：领;2：已领取;3：错过领取时间;
		 */
		public getWeekWelfareData(): Pb_God.PBPlayerActivityIndexData[]
		{
			let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_LuckyEgg, 0)[0];
			let tmpDataArr = this._activityDatasMap.get(actCfgInfo.iD);
			if (tmpDataArr && tmpDataArr.indexdata)
			{
				return tmpDataArr.indexdata;
			}
			return [];
		}
		/* 领取福蛋倒计时结束时间;*/
		public getWeekWelfareEndTime(): number
		{
			let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_LuckyEgg, 0)[0];
			let tmpDataArr = this._activityDatasMap.get(actCfgInfo.iD);
			if (tmpDataArr && tmpDataArr.data.length)
			{
				return tmpDataArr.data[0].value;
			}
			return 0;

		}
		/* 活动开启;*/
		public getWeekWelfareOpen(): boolean
		{
			let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_LuckyEgg, 0)[0];
			let tmpDataArr = this._activityDatasMap.get(actCfgInfo.iD);
			if (tmpDataArr && tmpDataArr.indexdata.length > 0)
			{
				for (let i = 0; i < tmpDataArr.indexdata.length; i++)
				{
					let indexData: Pb_God.PBPlayerActivityIndexData = tmpDataArr.indexdata[i];
					for (let j = 0; j < indexData.data.length; j++)
					{
						if (indexData.data[j].key == Pb_God._emActivityDataKey.Activity_Key_LuckyEgg_Index_Status)
						{
							if (indexData.data[j].value == Pb_God._emLuckyEggStatus.LuckyEgg_Status_Can_Get || indexData.data[j].value == Pb_God._emLuckyEggStatus.LuckyEgg_Status_Already_Get)
							{
								return true;
							}

						}
					}
				}
			}
			return false;
		}
		/**所以的奖励都领取完了 */
		public getWeekWelfareAllGift(): boolean
		{
			let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_LuckyEgg, 0)[0];
			let tmpDataArr = this._activityDatasMap.get(actCfgInfo.iD);
			if (tmpDataArr && tmpDataArr.indexdata.length > 0)
			{
				for (let i = 0; i < tmpDataArr.indexdata.length; i++)
				{
					let indexData: Pb_God.PBPlayerActivityIndexData = tmpDataArr.indexdata[i];
					for (let j = 0; j < indexData.data.length; j++)
					{
						if (indexData.data[j].key == Pb_God._emActivityDataKey.Activity_Key_LuckyEgg_Index_Status)
						{
							if (indexData.data[j].value == Pb_God._emLuckyEggStatus.LuckyEgg_Status_Can_Get || indexData.data[j].value == Pb_God._emLuckyEggStatus.LuckyEgg_Status_Can_Not_Get)
							{
								return false;
							}

						}
					}
				}
			}
			//if(tmpDataArr)this._activityDatasMap.remove(actCfgInfo.iD);
			return true;
		}

		/**
		 * 指定定制活动购买次数
		 * @param act_id
		 * @param cfg_index
		 */
		public getActBuyCount(act_id: number, cfg_index: number): number
		{
			let act_data = this.getActivityDataById(act_id);
			if (!act_data) { return 0; }
			let results = act_data.data.filter(e => e.key == cfg_index);
			if (results.length > 0) return Math.max(results[0].value, 0)
			return 0;
		}
	}
}
