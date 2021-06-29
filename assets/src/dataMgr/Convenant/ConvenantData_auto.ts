
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
	export class ConvenantData_auto extends ConvenantDataMgrBase
	{
		constructor()
		{
			super()
			//解锁返回 	
			EventMgr.on(Cmd.S2C_Convenant_UnLock.cmdName, this, this.onUnLock)
			//升级返回 (level) PBU32
			EventMgr.on(Cmd.S2C_Convenant_Levelup.cmdName, this, this.onLevelup)
			//选择属性返回 (id, index 1, 2, 3) PBU32U32
			EventMgr.on(Cmd.S2C_Convenant_Attr.cmdName, this, this.onAttr)
			//计算战斗力(id, power) PBU32U32
			EventMgr.on(Cmd.S2C_Convenant_Power.cmdName, this, this.onPower)
		}
		/*****
		 *解锁返回 	
		 * @param 
		 */
		protected onUnLock(): void
		{
			this.setLevel(1);
		}
		/*****
		 *升级返回 (level) PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onLevelup(value: Pb_God.PBU32): void
		{
			this.setLevel(value.value);
		}
		/*****
		 *选择属性返回 (id, index 1, 2, 3) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onAttr(value: Pb_God.PBU32U32): void
		{
			this._partAttrMap.put(value.key, value.value);
			ConvenantSend.power(value.key);
		}
		/*****
		 *计算战斗力(id, power) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onPower(value: Pb_God.PBU32U32): void
		{
			if (this._fightValueMap) this._fightValueMap.put(value.key, value.value);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}