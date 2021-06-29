
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
	export class TabletData_auto extends TabletDataMgrBase
	{
		constructor()
		{
			super()
			// 	 放入经验返回                 PBMagicJuiceState
			EventMgr.on(Cmd.S2C_Tablet_PutExp.cmdName, this, this.onPutExp)
			//	 收获魔液返回                 PBMagicJuiceState
			EventMgr.on(Cmd.S2C_Tablet_GetMagicJuice.cmdName, this, this.onGetMagicJuice)
			//	 放置英雄返回(pos, pet sn)	PBU32U64
			EventMgr.on(Cmd.S2C_Tablet_PutHero.cmdName, this, this.onPutHero)
			//	 升级晶碑返回(level)		    PBU32
			EventMgr.on(Cmd.S2C_Tablet_Upgrade.cmdName, this, this.onUpgrade)
			//	 创造英雄返回(pet sn)		    PBU64
			EventMgr.on(Cmd.S2C_Tablet_Create.cmdName, this, this.onCreate)
			//     请求魔液状态返回             PBMagicJuiceState
			EventMgr.on(Cmd.S2C_Tablet_MagicJuice.cmdName, this, this.onMagicJuice)
			//     取回经验(魔液,exp)           PBU32U64
			EventMgr.on(Cmd.S2C_Tablet_GetBackExp.cmdName, this, this.onGetBackExp)
		}
		/*****
		 * 	 放入经验返回                 PBMagicJuiceState
		 * @param PBMagicJuiceState
		 * 		exp			uint64	剩余经验
		 * 		time			uint32	下次提取的时间
		 * 		juice			uint32	炼好的魔液
		 * 		level			uint32	当前提炼等级
		 */
		protected onPutExp(value: Pb_God.PBMagicJuiceState): void
		{

		}
		/*****
		 *	 收获魔液返回                 PBMagicJuiceState
		 * @param PBMagicJuiceState
		 * 		exp			uint64	剩余经验
		 * 		time			uint32	下次提取的时间
		 * 		juice			uint32	炼好的魔液
		 * 		level			uint32	当前提炼等级
		 */
		protected onGetMagicJuice(value: Pb_God.PBMagicJuiceState): void
		{

		}
		/*****
		 *	 放置英雄返回(pos, pet sn)	PBU32U64
		 * @param PBU32U64
		 * 		key			uint32	
		 * 		value			uint64	 
		 */
		protected onPutHero(value: Pb_God.PBU32U64): void
		{

		}
		/*****
		 *	 升级晶碑返回(level)		    PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onUpgrade(value: Pb_God.PBU32): void
		{

		}
		/*****
		 *	 创造英雄返回(pet sn)		    PBU64
		 * @param PBU64
		 * 		value			uint64	
		 */
		protected onCreate(value: Pb_God.PBU64): void
		{

		}
		/*****
		 *     请求魔液状态返回             PBMagicJuiceState
		 * @param PBMagicJuiceState
		 * 		exp			uint64	剩余经验
		 * 		time			uint32	下次提取的时间
		 * 		juice			uint32	炼好的魔液
		 * 		level			uint32	当前提炼等级
		 */
		protected onMagicJuice(value: Pb_God.PBMagicJuiceState): void
		{

		}
		/*****
		 *     取回经验(魔液,exp)           PBU32U64
		 * @param PBU32U64
		 * 		key			uint32	
		 * 		value			uint64	 
		 */
		protected onGetBackExp(value: Pb_God.PBU32U64): void
		{

		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}