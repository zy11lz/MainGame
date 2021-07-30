
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
	export class ResonanceData_auto extends ResonanceDataMgrBase
	{
		constructor()
		{
			super()
			// 	 开启格子返回 PBG2CResonanceOpenGrid
			EventMgr.on(Cmd.S2C_Resonance_OpenGrid.cmdName, this, this.onOpenGrid)
			// 	 重置冷却 PBG2CResonanceGridChg
			EventMgr.on(Cmd.S2C_Resonance_ResetCD.cmdName, this, this.onResetCD)
			// 	 放置共鸣 PBG2CResonanceGridChg
			EventMgr.on(Cmd.S2C_Resonance_PlaceGrid.cmdName, this, this.onPlaceGrid)
			// 	 某个共鸣开启 PBPlayerResonanceInfo
			EventMgr.on(Cmd.S2C_Resonance_SystemOpen.cmdName, this, this.onSystemOpen)
			// 	 共鸣主体更新 PBG2CResonanceMainPetSn
			EventMgr.on(Cmd.S2C_Resonance_MainPetSn.cmdName, this, this.onMainPetSn)
			// 	 升星返回 PBG2CResonanceUpStar
			EventMgr.on(Cmd.S2C_Resonance_UpStar.cmdName, this, this.onUpStar)
		}
		/*****
		 * 	 开启格子返回 PBG2CResonanceOpenGrid
		 * @param PBG2CResonanceOpenGrid
		 * 		type			uint32	类型
		 * 		maxgrididx			uint32	已开启最大格子数
		 */
		protected onOpenGrid(value: Pb_God.PBG2CResonanceOpenGrid): void
		{
			
		}
		/*****
		 * 	 重置冷却 PBG2CResonanceGridChg
		 * @param PBG2CResonanceGridChg
		 * 		type			uint32	类型
		 * 		grid			PBPlayerResonanceGrid	格子数据
		 */
		protected onResetCD(value: Pb_God.PBG2CResonanceGridChg): void
		{
			
		}
		/*****
		 * 	 放置共鸣 PBG2CResonanceGridChg
		 * @param PBG2CResonanceGridChg
		 * 		type			uint32	类型
		 * 		grid			PBPlayerResonanceGrid	格子数据
		 */
		protected onPlaceGrid(value: Pb_God.PBG2CResonanceGridChg): void
		{
			
		}
		/*****
		 * 	 某个共鸣开启 PBPlayerResonanceInfo
		 * @param PBPlayerResonanceInfo
		 * 		type			uint32	类型
		 * 		grid			PBPlayerResonanceGrid	格子数据
		 * 		maxgrididx			uint32	已开启最大格子数
		 * 		petlist			uint64	共鸣主体
		 */
		protected onSystemOpen(value: Pb_God.PBPlayerResonanceInfo): void
		{
			
		}
		/*****
		 * 	 共鸣主体更新 PBG2CResonanceMainPetSn
		 * @param PBG2CResonanceMainPetSn
		 * 		type			uint32	类型
		 * 		petlist			uint64	共鸣主体
		 */
		protected onMainPetSn(value: Pb_God.PBG2CResonanceMainPetSn): void
		{
			
		}
		/*****
		 * 	 升星返回 PBG2CResonanceUpStar
		 * @param PBG2CResonanceUpStar
		 * 		oldstar			uint32	旧的星级
		 * 		petsn			uint64	宠物sn
		 */
		protected onUpStar(value: Pb_God.PBG2CResonanceUpStar): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}