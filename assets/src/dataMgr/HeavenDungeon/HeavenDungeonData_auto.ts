
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
	export class HeavenDungeonData_auto extends HeavenDungeonDataMgrBase
	{
		constructor()
		{
			super()
			// 	 通用返回
			EventMgr.on(Cmd.S2C_HeavenDungeon_Common_ACK.cmdName, this, this.onCommon_ACK)
			//     领取章节奖品返回             PBU32
			EventMgr.on(Cmd.S2C_HeavenDungeon_ChapterReward.cmdName, this, this.onChapterReward)
			//     购买挑战次数返回             PBG2CHeavenDungeonCount
			EventMgr.on(Cmd.S2C_HeavenDungeon_BuyCount.cmdName, this, this.onBuyCount)
			//     祈祷返回                    PBG2CHeavenDungeonPray
			EventMgr.on(Cmd.S2C_HeavenDungeon_Pray.cmdName, this, this.onPray)
			//     关卡战斗或扫荡之后推送       PBG2CHeavenDungeonStageSync
			EventMgr.on(Cmd.S2C_HeavenDungeon_StageSync.cmdName, this, this.onStageSync)
		}
		/*****
		 * 	 通用返回
		 * @param 
		 */
		protected onCommon_ACK(): void
		{

		}
		/*****
		 *     领取章节奖品返回             PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onChapterReward(value: Pb_God.PBU32): void
		{
			this.updateChapterRewardData(value.value);
			EventMgr.trigger(EventNotify.Heaven_DrawChapterReward);
		}
		/*****
		 *     购买挑战次数返回             PBG2CHeavenDungeonCount
		 * @param PBG2CHeavenDungeonCount
		 * 		count			uint32	 当前挑战次数
		 * 		buycount			uint32	 已经使用的购买次数
		 */
		protected onBuyCount(value: Pb_God.PBG2CHeavenDungeonCount): void
		{
			TipsUtils.showTipsByLanId("Heaven_msg11");
			this.server_data.count = value.count;
			this.server_data.buycount = value.buycount;
			EventMgr.trigger(EventNotify.Heaven_BuyCount);
		}
		/*****
		 *     祈祷返回                    PBG2CHeavenDungeonPray
		 * @param PBG2CHeavenDungeonPray
		 * 		statue			uint32	 神像
		 * 		reward			uint32	 奖励index
		 * 		freecount			uint32	 免费次数
		 * 		times			uint32	 该神像的祈祷次数
		 */
		protected onPray(value: Pb_God.PBG2CHeavenDungeonPray): void
		{
			this.updateStatue(value);
			EventMgr.trigger(EventNotify.Heaven_StatueUpdate);
		}
		/*****
		 *     关卡战斗或扫荡之后推送       PBG2CHeavenDungeonStageSync
		 * @param PBG2CHeavenDungeonStageSync
		 * 		stage			PBPlayerHeavenDungeonStage	 关卡
		 * 		count			uint32	 当前挑战次数
		 * 		buycount			uint32	 已经使用的购买次数
		 */
		protected onStageSync(value: Pb_God.PBG2CHeavenDungeonStageSync): void
		{
			this.server_data.count = value.count;
			this.server_data.buycount = value.buycount;
			this.updateStageData(value.stage);
			EventMgr.trigger(EventNotify.Heaven_ChpaterStageUpdate);
			//Pb_God._emHeavenDungeonStarCondition.StarCondition_Formation;
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}