
/**
*
*  根据 proto 文件自动生成的代码
*
* 【**不可手动修改此类**】，
*
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的proto文件】
*
* @author liuYang.AutoCreater
*
*/

module Pro
{
	export class AchieveData_auto extends AchieveDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用错误返回
			EventMgr.on(Cmd.S2C_Achieve_Common.cmdName, this, this.onCommon)
			//	 活跃完成 			PBU32
			EventMgr.on(Cmd.S2C_Achieve_LivenessComplete.cmdName, this, this.onLivenessComplete)
			//	 活跃领奖 			PBU32
			EventMgr.on(Cmd.S2C_Achieve_LivenessPrize.cmdName, this, this.onLivenessPrize)
			//	 主线完成				PBU32
			EventMgr.on(Cmd.S2C_Achieve_MainComplete.cmdName, this, this.onMainComplete)
			//	 新增主线				PBPlayerOneAchieve
			EventMgr.on(Cmd.S2C_Achieve_MainAdd.cmdName, this, this.onMainAdd)
			//	 更新成就				PBG2CAchieve_Update
			EventMgr.on(Cmd.S2C_Achieve_Update.cmdName, this, this.onUpdate)
			//	 历练完成				PBU32
			EventMgr.on(Cmd.S2C_Achieve_TrainComplete.cmdName, this, this.onTrainComplete)
			//	 更新日活跃			PBU32
			EventMgr.on(Cmd.S2C_Achieve_SynDailyLiveness.cmdName, this, this.onSynDailyLiveness)
			//	 活动活跃完成 		PBU32
			EventMgr.on(Cmd.S2C_Achieve_ActivityLivenessComplete.cmdName, this, this.onActivityLivenessComplete)
			//	 活动活跃领奖 		PBU32
			EventMgr.on(Cmd.S2C_Achieve_ActivityLivenessPrize.cmdName, this, this.onActivityLivenessPrize)
			//	 更新活动活跃			PBU32
			EventMgr.on(Cmd.S2C_Achieve_SynActivityLiveness.cmdName, this, this.onSynActivityLiveness)
			//	 周活跃完成 			PBU32
			EventMgr.on(Cmd.S2C_Achieve_WeekLivenessComplete.cmdName, this, this.onWeekLivenessComplete)
			//	 周活跃领奖 			PBU32
			EventMgr.on(Cmd.S2C_Achieve_WeekLivenessPrize.cmdName, this, this.onWeekLivenessPrize)
			//	 更新周活跃			PBU32
			EventMgr.on(Cmd.S2C_Achieve_SynWeeklyLiveness.cmdName, this, this.onSynWeeklyLiveness)
			// 	 战令完成				PBU32
			EventMgr.on(Cmd.S2C_Achieve_WarOrderComplete.cmdName, this, this.onWarOrderComplete)
			// 	 战令奖励(等级，是否进阶奖励0/1)				PBU32U32
			EventMgr.on(Cmd.S2C_Achieve_WarOrderPrize.cmdName, this, this.onWarOrderPrize)
			// 	 同步战令等级(level, exp) PBU32U32
			EventMgr.on(Cmd.S2C_Achieve_SyncWarOrderLevel.cmdName, this, this.onSyncWarOrderLevel)
			// 	 战令一键奖励			PBG2CWarOrderOneKey
			EventMgr.on(Cmd.S2C_Achieve_WarOrderPrizeOneKey.cmdName, this, this.onWarOrderPrizeOneKey)
			// 	 图鉴完成				PBU32
			EventMgr.on(Cmd.S2C_Achieve_IllustrationComplete.cmdName, this, this.onIllustrationComplete)
			// 	 图鉴战力完成		PBU32
			EventMgr.on(Cmd.S2C_Achieve_IllustrationPowerComplete.cmdName, this, this.onIllustrationPowerComplete)
			// 	 成就之路完成		PBU32
			EventMgr.on(Cmd.S2C_Achieve_AchieveRoadComplete.cmdName, this, this.onAchieveRoadComplete)
		}
		/*****
		 *	 通用错误返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	 活跃完成 			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onLivenessComplete(value: Pb_God.PBU32): void
		{
			this._data.liveness.completeid.push(value.value);
			this.reddotModel.refreshChild("daily");
			EventMgr.trigger(EventNotify.Achieve_Update);
		}
		/*****
		 *	 活跃领奖 			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onLivenessPrize(value: Pb_God.PBU32): void
		{
			this._data.liveness.accpetprize.push(value.value);
			this.reddotModel.refreshChild("daily");
			EventMgr.trigger(EventNotify.Achieve_Update);
		}
		/*****
		 *	 主线完成				PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onMainComplete(value: Pb_God.PBU32): void
		{
			this._mainFinishMap.put(value.value, value.value);
			let cfgBigType = cfg.AchieveMainAchieveCfgData.getAchieveBigTypeByID(value.value);
			if (cfgBigType == Pb_God._emAchieveBigType.AchieveBigType_Main)
			{
				this.resetMainAchieveList();
				this.reddotModel.refreshChild("achieve");
			} else if (cfgBigType == Pb_God._emAchieveBigType.AchieveBigType_Artifact)
			{  //神器
				ArtifactDataMgr.unlockRewardRedDotModel.refresh();
			} else if (cfgBigType == Pb_God._emAchieveBigType.AchieveBigType_SonOfDestiny)
			{  //天命之子活动
				this.reddotModelSonOfDestiny.refresh();
			} else if (cfgBigType == Pb_God._emAchieveBigType.AchieveBigType_Gift)
			{  //天降好礼
				this.refreshGodGiftList();
			}
			EventMgr.trigger(EventNotify.Achieve_Update);
		}
		/*****
		 *	 新增主线				PBPlayerOneAchieve
		 * @param PBPlayerOneAchieve
		 * 		id			uint32	 成就ID
		 * 		value			uint32	 当前值
		 * 		time			uint32	 完成时间
		 * 		extravalue			uint32	 额外记录值
		 */
		protected onMainAdd(value: Pb_God.PBPlayerOneAchieve): void
		{
			this._mainAchieveDataMap.put(value.id, value);
			EventMgr.trigger(EventNotify.Achieve_Update);
		}
		/*****
		 *	 更新成就				PBG2CAchieve_Update
		 * @param PBG2CAchieve_Update
		 * 		bigtype			uint32	成就大类型_emAchieveBigType
		 * 		achieve			PBPlayerOneAchieve	成就数据
		 */
		protected onUpdate(value: Pb_God.PBG2CAchieve_Update): void
		{
			let _isAcitvityAchive = false;
			if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_Daily)
			{
				this.refreshOneAchieve(this._data.liveness.achieve, value.achieve);
				this.reddotModel.refreshChild("daily");
			}
			else if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_Weekly)
			{
				this.refreshOneAchieve(this._data.weekliveness.achieve, value.achieve);
				this.reddotModel.refreshChild("week");
			}
			else if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_Main)
			{
				this._mainAchieveDataMap.put(value.achieve.id, value.achieve);

				//存在于主线成就的数据里面，有可能不是主线类型的，这是一个很蛋疼的数据判断。。。
				let mainAchieveCfgInfo = cfg.AchieveMainAchieveCfgData.getInfo(value.achieve.id);
				let cfgBigType = mainAchieveCfgInfo.achieveBigType;
				if (cfgBigType == Pb_God._emAchieveBigType.AchieveBigType_Main)
				{
					this.reddotModel.refreshChild("achieve");
				} else if (cfgBigType == Pb_God._emAchieveBigType.AchieveBigType_Artifact)
				{  //神器
					ArtifactDataMgr.unlockRewardRedDotModel.refresh();
				} else if (cfgBigType == Pb_God._emAchieveBigType.AchieveBigType_SonOfDestiny)
				{  //天命之子活动
					this.reddotModelSonOfDestiny.refresh(true);
				} else if (cfgBigType == Pb_God._emAchieveBigType.AchieveBigType_Gift)
				{  //天降好礼
					this.checkGodGiftState(mainAchieveCfgInfo, true);
				}
				else
				{
					logE(value.bigtype, value.achieve.id, cfgBigType); //临时调试
				}

			}
			else if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_Faction)
			{ //公会成就
				this.refreshOneAchieve(this._data.faction.achieve, value.achieve);
			}
			else if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_WarOrder)
			{ //战令成就
				this._warorderAchieveDataMap.put(value.achieve.id, value.achieve);
				let type = cfg.AchieveWarOrderCfgData.getTypeByID(value.achieve.id);
				EventMgr.trigger(EventNotify.Achieve_WarOrder_Update, type);
			}
			else if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_Train)
			{ //历练成就
				this.refreshOneAchieve(this._data.train.achieve, value.achieve);
			} else if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_Activity)
			{
				_isAcitvityAchive = true;
				// 7日目标成就
				this._activityAchieveDataMap.put(value.achieve.id, value.achieve);
				EventMgr.trigger(EventNotify.Achieve_Activity_Update);
			}
			else if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_Illustration)
			{
				this.refreshOneAchieve(this._data.illustration.achieve, value.achieve);
			}
			else if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_IllustrationPowe)
			{
				this.refreshOneAchieve(this._data.illustrationpower.achieve, value.achieve);
			}
			else if (value.bigtype == Pb_God._emAchieveBigType.AchieveBigType_AchieveRoad)
			{
				_isAcitvityAchive = true;
				this._activityRisingStarDataMap.put(value.achieve.id, value.achieve);
				EventMgr.trigger(EventNotify.Achieve_Activity_Update);
			}
			if (!_isAcitvityAchive)
				EventMgr.trigger(EventNotify.Achieve_Update);
		}
		/*****
		 *	 历练完成				PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onTrainComplete(value: Pb_God.PBU32): void
		{

		}
		/*****
		 *	 更新日活跃			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSynDailyLiveness(value: Pb_God.PBU32): void
		{
			this._data.liveness.livessvalue = value.value;
			this.reddotModel.refreshChild("daily");
			EventMgr.trigger(EventNotify.Achieve_Update);
		}
		/*****
		 *	 活动活跃完成 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onActivityLivenessComplete(value: Pb_God.PBU32): void
		{
			this._activityFinishMap.put(value.value, value.value);
			//this.resetMainAchieveList();
			//this.reddotModel.refreshChild("achieve");
			EventMgr.trigger(EventNotify.Achieve_Activity_Update);
		}
		/*****
		 *	 活动活跃领奖 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onActivityLivenessPrize(value: Pb_God.PBU32): void
		{
			this._data.activity.accpetprize.push(value.value);

			EventMgr.trigger(EventNotify.Achieve_Activity_Update);
		}
		/*****
		 *	 更新活动活跃			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSynActivityLiveness(value: Pb_God.PBU32): void
		{
			this._data.activity.livessvalue = value.value;

			EventMgr.trigger(EventNotify.Achieve_Activity_Update);
		}
		/*****
		 *	 周活跃完成 			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onWeekLivenessComplete(value: Pb_God.PBU32): void
		{
			this._data.weekliveness.completeid.push(value.value);
			this.reddotModel.refreshChild("week");
			EventMgr.trigger(EventNotify.Achieve_Update);
		}
		/*****
		 *	 周活跃领奖 			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onWeekLivenessPrize(value: Pb_God.PBU32): void
		{
			this._data.weekliveness.accpetprize.push(value.value);
			this.reddotModel.refreshChild("week");
			EventMgr.trigger(EventNotify.Achieve_Update);
		}
		/*****
		 *	 更新周活跃			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSynWeeklyLiveness(value: Pb_God.PBU32): void
		{
			this._data.weekliveness.livessvalue = value.value;
			this.reddotModel.refreshChild("week");
			EventMgr.trigger(EventNotify.Achieve_Update);
		}
		/*****
		 * 	 战令完成				PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onWarOrderComplete(value: Pb_God.PBU32): void
		{
			this._warorderAchieveCompleteMap.put(value.value, value.value);
			let type = cfg.AchieveWarOrderCfgData.getTypeByID(value.value);
			EventMgr.trigger(EventNotify.Achieve_WarOrder_Update, type);
		}
		/*****
		 * 	 战令奖励(等级，是否进阶奖励0/1)				PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onWarOrderPrize(value: Pb_God.PBU32U32): void
		{
			let curState = this.getWarOrderLevelPrizeState(value.key);
			curState = curState | (value.value == 0 ? 1 : 2);
			this._warorderLevelPrizeMap.put(value.key, curState);
			this.reddotModelWarOrder.refreshChild("reward");
		}
		/*****
		 * 	 同步战令等级(level, exp) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onSyncWarOrderLevel(value: Pb_God.PBU32U32): void
		{
			let data = this.getWarOrderData();
			data.exp = value.value;
			if (data.level != value.key)
			{
				data.level = value.key;
				this.reddotModelWarOrder.refreshChild("reward");
			}
		}
		/*****
		 * 	 战令一键奖励			PBG2CWarOrderOneKey
		 * @param PBG2CWarOrderOneKey
		 * 		prize			PBU32U32	 奖励的领取状态(等级，普通 1 进阶 2 both 3)(改变了的)
		 */
		protected onWarOrderPrizeOneKey(value: Pb_God.PBG2CWarOrderOneKey): void
		{
			if (!value.prize || value.prize.length == 0) return;
			for (let el of value.prize)
			{
				this._warorderLevelPrizeMap.put(el.key, el.value);
			}
			this.reddotModelWarOrder.refreshChild("reward");
		}
		/*****
		 * 	 图鉴完成				PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onIllustrationComplete(value: Pb_God.PBU32): void
		{
			this._illustrationFinishMap.put(value.value, value.value);
		}
		/*****
		 * 	 图鉴战力完成		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onIllustrationPowerComplete(value: Pb_God.PBU32): void
		{
			this._illustrationPowerFinishMap.put(value.value, value.value);
		}
		/*****
		 * 	 成就之路完成		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onAchieveRoadComplete(value: Pb_God.PBU32): void
		{
			this._activityRisingStarMap.put(value.value, value.value);
			//this.resetMainAchieveList();
			//this.reddotModel.refreshChild("achieve");
			EventMgr.trigger(EventNotify.Achieve_Activity_Update);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}