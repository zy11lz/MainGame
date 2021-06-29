
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
	export class HookData_auto extends HookDataMgrBase
	{
		constructor()
		{
			super()
			//	通用错误返回
			EventMgr.on(Cmd.S2C_Hook_Common.cmdName, this, this.onCommon)
			//	收益领奖					PBG2CProfitAck	
			EventMgr.on(Cmd.S2C_Hook_ProfitAck.cmdName, this, this.onProfitAck)
			//	飞新地图返回(新地图ID)	PBU32
			EventMgr.on(Cmd.S2C_Hook_FlyNewSceneAck.cmdName, this, this.onFlyNewSceneAck)
			//	领取关卡奖励返回			PBU32
			EventMgr.on(Cmd.S2C_Hook_StagePrizeAck.cmdName, this, this.onStagePrizeAck)
			//	快速挑战返回				PBG2CSweepAck	
			EventMgr.on(Cmd.S2C_Hook_SweepAck.cmdName, this, this.onSweepAck)
			//	同步新关卡				PBG2CSynStageAck
			EventMgr.on(Cmd.S2C_Hook_SynStage.cmdName, this, this.onSynStage)
		}
		/*****
		 *	通用错误返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	收益领奖					PBG2CProfitAck	
		 * @param PBG2CProfitAck
		 * 		profittime			uint32	收益时间
		 * 		begintime			uint32	更新开始时间
		 * 		prizeitem			PBItemInfo	奖励道具
		 */
		protected onProfitAck(value: Pb_God.PBG2CProfitAck): void
		{
			this._data.begintime = value.begintime;

			let tempInfo = new QuickAwardOpenUIData();
			tempInfo.ItemList = value.prizeitem
			tempInfo.isHookReward = true;
			tempInfo.rewardTime = value.profittime;
			tempInfo.oldPlayerLv = PlayerDataMgr.level;
			tempInfo.oldPlayerExp = Global.getItemNum(CfgID.ItemID.Exp);
			UIManager.Inst.forceOpen(tempInfo);
		}
		/*****
		 *	飞新地图返回(新地图ID)	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onFlyNewSceneAck(value: Pb_God.PBU32): void
		{

		}
		/*****
		 *	领取关卡奖励返回			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onStagePrizeAck(value: Pb_God.PBU32): void
		{
			this._data.stageprize.push(value.value);
			this.reddotModelPassReward.refresh();
		}
		/*****
		 *	快速挑战返回				PBG2CSweepAck	
		 * @param PBG2CSweepAck
		 * 		dayfreesweepcount			uint32	快速作战免费次数
		 * 		daubuysweepcount			uint32	快速作战购买次数
		 * 		profittime			uint32	收益时间
		 * 		prizeitem			PBItemInfo	奖励道具
		 */
		protected onSweepAck(value: Pb_God.PBG2CSweepAck): void
		{
			this._data.dayfreesweepcount = value.dayfreesweepcount;
			this._data.daubuysweepcount = value.daubuysweepcount;

			let tempInfo = new QuickAwardOpenUIData();
			tempInfo.ItemList = value.prizeitem
			tempInfo.isHookReward = false;
			tempInfo.rewardTime = value.profittime;
			tempInfo.oldPlayerLv = PlayerDataMgr.level;
			tempInfo.oldPlayerExp = Global.getItemNum(CfgID.ItemID.Exp);
			UIManager.Inst.forceOpen(tempInfo);
		}
		/*****
		 *	同步新关卡				PBG2CSynStageAck
		 * @param PBG2CSynStageAck
		 * 		stageid			uint32	关卡ID
		 * 		nextfighttime			uint32	下次挑战时间
		 */
		protected onSynStage(value: Pb_God.PBG2CSynStageAck): void
		{
			let oldId = this._data.stageid;
			if (oldId == value.stageid) return;
			this._data.stageid = value.stageid;
			this._data.nextfighttime = value.nextfighttime;
			EventMgr.trigger(EventNotify.Fight_Hook_Changed);
			this.reddotModelPassReward.refresh();
			if (oldId != 0 && !GuideMgr.Inst.getInShowGuide())
			{
				Laya.timer.frameOnce(3, this, () =>
				{
					UIManager.Inst.pushAutoQueue(new BaseOpenUIData(PanelNotify.Open_HookNextTips, [oldId, value.stageid]));
				});
			}
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}