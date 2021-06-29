
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
	export class DragonBallData_auto extends DragonBallDataMgrBase
	{
		constructor()
		{
			super()
			//解锁返回 	PBU32
			EventMgr.on(Cmd.S2C_DragonBall_UnLock.cmdName, this, this.onUnLock)
			//升级(type, level) PBU32U32
			EventMgr.on(Cmd.S2C_DragonBall_Levelup.cmdName, this, this.onLevelup)
		}
		/*****
		 *解锁返回 	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onUnLock(value: Pb_God.PBU32): void
		{
			let type = value.value;
			let data = this._dataMap.get(type);
			if (!data)
			{
				data = new Pb_God.PBPlayerDragonBall();
				data.level = 1;
				data.type = type;
			} else
			{
				data.level = 1;
			}
			this._dataMap.put(type, data);
			SoundMgr.Inst().playSound("unlock");
			Pro.TipsUtils.showTips(Global.getLangStr("dragonball_msg12"));
			EventMgr.trigger(EventNotify.DragonBall_LevelChange, type, data.level);
		}
		/*****
		 *升级(type, level) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onLevelup(value: Pb_God.PBU32U32): void
		{
			let type = value.key;
			let data = this._dataMap.get(type);
			if (data) data.level = value.value;
			SoundMgr.Inst().playSound("grow");
			Pro.TipsUtils.showTips(Global.getLangStr("dragonball_msg13"));
			EventMgr.trigger(EventNotify.DragonBall_LevelChange, type, data.level);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}