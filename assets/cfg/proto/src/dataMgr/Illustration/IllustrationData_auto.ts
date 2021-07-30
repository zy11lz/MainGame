
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
	export class IllustrationData_auto extends IllustrationDataMgrBase
	{
		constructor()
		{
			super()
			//失败才返回
			EventMgr.on(Cmd.S2C_Illustration_Common_Ack.cmdName, this, this.onCommon_Ack)
			//往图鉴背包加 PBG2CADDPetAck
			EventMgr.on(Cmd.S2C_Illustration_addPetAck.cmdName, this, this.onAddPetAck)
			//从图鉴背包减 PBG2CRemovePetAck
			EventMgr.on(Cmd.S2C_Illustration_removePetAck.cmdName, this, this.onRemovePetAck)
			//	刷新 PBG2CFreashIllustration
			EventMgr.on(Cmd.S2C_Illustration_Freash.cmdName, this, this.onFreash)
		}
		/*****
		 *失败才返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{
			
		}
		/*****
		 *往图鉴背包加 PBG2CADDPetAck
		 * @param PBG2CADDPetAck
		 * 		indexs			uint32	  取消激活的羁绊索引数组
		 */
		protected onAddPetAck(value: Pb_God.PBG2CADDPetAck): void
		{
			
		}
		/*****
		 *从图鉴背包减 PBG2CRemovePetAck
		 * @param PBG2CRemovePetAck
		 * 		indexs			uint32	 取消激活的羁绊索引数组
		 */
		protected onRemovePetAck(value: Pb_God.PBG2CRemovePetAck): void
		{
			
		}
		/*****
		 *	刷新 PBG2CFreashIllustration
		 * @param PBG2CFreashIllustration
		 * 		petdisplay			PBPetDisplay	 精灵图鉴列  
		 * 		historyPower			uint32	 历史最高战力
		 */
		protected onFreash(value: Pb_God.PBG2CFreashIllustration): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}