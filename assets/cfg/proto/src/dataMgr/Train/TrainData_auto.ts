
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
	export class TrainData_auto extends TrainDataMgrBase
	{
		constructor()
		{
			super()
			//通用返回(失败才返回)
			EventMgr.on(Cmd.S2C_Train_CommonAck.cmdName, this, this.onCommonAck)
			//练塔购买次数返回(类型，次数)	PBU32U32
			EventMgr.on(Cmd.S2C_Train_TowerBuyCount.cmdName, this, this.onTowerBuyCount)
			//试练塔领奖返回 			PBU32
			EventMgr.on(Cmd.S2C_Train_TowerPrize.cmdName, this, this.onTowerPrize)
			//试练塔挑战次数 			PBG2CTowerFightCount
			EventMgr.on(Cmd.S2C_Train_TowerFightCount.cmdName, this, this.onTowerFightCount)
			//无尽试炼领奖				PBU32
			EventMgr.on(Cmd.S2C_Train_EndlessPrize.cmdName, this, this.onEndlessPrize)
			//无尽试炼选择buff返回		PBU32
			EventMgr.on(Cmd.S2C_Train_EndlessBuff.cmdName, this, this.onEndlessBuff)
			//无尽试炼通知buff组		PBU32
			EventMgr.on(Cmd.S2C_Train_EndlessBuffGroup.cmdName, this, this.onEndlessBuffGroup)
			//无尽试炼同步信息			PBPlayerTrainEndless
			EventMgr.on(Cmd.S2C_Train_SynEndlessInfo.cmdName, this, this.onSynEndlessInfo)
			//查询试练塔录像返回		PBWorldStageVideoInfo
			EventMgr.on(Cmd.S2C_Train_QueryTowerVideoAck.cmdName, this, this.onQueryTowerVideoAck)
			//废弃
			EventMgr.on(Cmd.S2C_Train_xxxxxxxxxxx.cmdName, this, this.onXxxxxxxxxxx)
			//废弃
			EventMgr.on(Cmd.S2C_Train_xxxxxxxxxx.cmdName, this, this.onXxxxxxxxxx)
			// 废弃
			EventMgr.on(Cmd.S2C_Train_xxxxxxxxx.cmdName, this, this.onXxxxxxxxx)
			// 购买buff返回			PBU32			
			EventMgr.on(Cmd.S2C_Train_PeakBuyBuff.cmdName, this, this.onPeakBuyBuff)
			// 购买次数返回(fight count, buy count) PBU32U32
			EventMgr.on(Cmd.S2C_Train_PeakBuyCount.cmdName, this, this.onPeakBuyCount)
		}
		/*****
		 *通用返回(失败才返回)
		 * @param 
		 */
		protected onCommonAck(): void
		{
			
		}
		/*****
		 *练塔购买次数返回(类型，次数)	PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onTowerBuyCount(value: Pb_God.PBU32U32): void
		{
			
		}
		/*****
		 *试练塔领奖返回 			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onTowerPrize(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *试练塔挑战次数 			PBG2CTowerFightCount
		 * @param PBG2CTowerFightCount
		 * 		stageid			uint32	 关卡ID
		 * 		daybuycount			uint32	 今日购买次数
		 * 		dayfightcount			uint32	 今日挑战次数
		 * 		type			uint32	 类型
		 */
		protected onTowerFightCount(value: Pb_God.PBG2CTowerFightCount): void
		{
			
		}
		/*****
		 *无尽试炼领奖				PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onEndlessPrize(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *无尽试炼选择buff返回		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onEndlessBuff(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *无尽试炼通知buff组		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onEndlessBuffGroup(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *无尽试炼同步信息			PBPlayerTrainEndless
		 * @param PBPlayerTrainEndless
		 * 		maxstageid			uint32	 当前挑战的最大关卡
		 * 		prizestage			uint32	 当前领取的最大关卡
		 * 		buffgroup			uint32	 随机的buff组
		 * 		buffid			uint32	 加成的buffid
		 * 		daybeginstage			uint32	 今日开始的关卡
		 * 		daymaxstage			uint32	 今日最高的关卡
		 * 		curfightstage			uint32	 当前挑战的关卡次数
		 * 		daybeginprizestage			uint32	 每日领奖的起始关卡
		 * 		buffstage			uint32	 选择buff的关卡
		 * 		dayclearnum			uint32	 今日已通多少关
		 */
		protected onSynEndlessInfo(value: Pb_God.PBPlayerTrainEndless): void
		{
			
		}
		/*****
		 *查询试练塔录像返回		PBWorldStageVideoInfo
		 * @param PBWorldStageVideoInfo
		 * 		stageid			uint32	关卡
		 * 		fast			PBPlayerVideoDisplay	最快
		 * 		fightpower			PBPlayerVideoDisplay	最小战力
		 * 		lately			PBPlayerVideoDisplay	最近/我的通关录像
		 */
		protected onQueryTowerVideoAck(value: Pb_God.PBWorldStageVideoInfo): void
		{
			
		}
		/*****
		 *废弃
		 * @param 
		 */
		protected onXxxxxxxxxxx(): void
		{
			
		}
		/*****
		 *废弃
		 * @param 
		 */
		protected onXxxxxxxxxx(): void
		{
			
		}
		/*****
		 * 废弃
		 * @param 
		 */
		protected onXxxxxxxxx(): void
		{
			
		}
		/*****
		 * 购买buff返回			PBU32			
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onPeakBuyBuff(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 * 购买次数返回(fight count, buy count) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onPeakBuyCount(value: Pb_God.PBU32U32): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}