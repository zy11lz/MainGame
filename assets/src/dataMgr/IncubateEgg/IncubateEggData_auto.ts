
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
	export class IncubateEggData_auto extends IncubateEggDataMgrBase
	{
		constructor()
		{
			super()
			//通用返回,错误码
			EventMgr.on(Cmd.S2C_IncubateEgg_Common.cmdName, this, this.onCommon)
			// 开始孵蛋     PBS2CIncubateEggStart
			EventMgr.on(Cmd.S2C_IncubateEgg_Start.cmdName, this, this.onStart)
			// 加速孵化     PBS2CIncubateEggSpeedUp
			EventMgr.on(Cmd.S2C_IncubateEgg_SpeedUp.cmdName, this, this.onSpeedUp)
			// 取消孵化     PBS2CIncubateEggCancel
			EventMgr.on(Cmd.S2C_IncubateEgg_Cancel.cmdName, this, this.onCancel)
			// 孵蛋破壳     PBS2CIncubateEggPip
			EventMgr.on(Cmd.S2C_IncubateEgg_Pip.cmdName, this, this.onPip)
			// 孵化结束同步 PBS2CIncubateEggEndSyn
			EventMgr.on(Cmd.S2C_IncubateEgg_EndSyn.cmdName, this, this.onEndSyn)
			// 孵蛋         PBIncubateEggData
			EventMgr.on(Cmd.S2C_IncubateEgg_SynInfo.cmdName, this, this.onSynInfo)
		}
		/*****
		 *通用返回,错误码
		 * @param 
		 */
		protected onCommon(): void
		{
			
		}
		/*****
		 * 开始孵蛋     PBS2CIncubateEggStart
		 * @param PBS2CIncubateEggStart
		 */
		protected onStart(value: Pb_God.PBS2CIncubateEggStart): void
		{
			
		}
		/*****
		 * 加速孵化     PBS2CIncubateEggSpeedUp
		 * @param PBS2CIncubateEggSpeedUp
		 */
		protected onSpeedUp(value: Pb_God.PBS2CIncubateEggSpeedUp): void
		{
			
		}
		/*****
		 * 取消孵化     PBS2CIncubateEggCancel
		 * @param PBS2CIncubateEggCancel
		 */
		protected onCancel(value: Pb_God.PBS2CIncubateEggCancel): void
		{
			
		}
		/*****
		 * 孵蛋破壳     PBS2CIncubateEggPip
		 * @param PBS2CIncubateEggPip
		 * 		Index			uint32	
		 */
		protected onPip(value: Pb_God.PBS2CIncubateEggPip): void
		{
			//UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EggHatchSucced,value.Index));
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EggHatchSucced,value.Index||IncubateEggDataMgr.IncubateEggs[0].Index));
		}
		/*****
		 * 孵化结束同步 PBS2CIncubateEggEndSyn
		 * @param PBS2CIncubateEggEndSyn
		 * 		Index			uint32	结束孵化蛋索引
		 */
		protected onEndSyn(value: Pb_God.PBS2CIncubateEggEndSyn): void
		{
			
			

			
		}
		/*****
		 * 孵蛋         PBIncubateEggData
		 * @param PBIncubateEggData
		 * 		IncubateEggs			PBIncubateEgg	正在孵化蛋数据
		 */
		protected onSynInfo(value: Pb_God.PBIncubateEggData): void
		{
			this.IncubateEggs=value.IncubateEggs;
			this.initRedDotModel()


		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}