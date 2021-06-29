
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
	export class HolyData_auto extends HolyDataMgrBase
	{
		constructor()
		{
			super()
			//	 升级返回		PBPlayerHolyInfo
			EventMgr.on(Cmd.S2C_Holy_Upgrade.cmdName, this, this.onUpgrade)
			//	 进阶返回 	PBPlayerHolyInfo
			EventMgr.on(Cmd.S2C_Holy_Advance.cmdName, this, this.onAdvance)
			//	 解锁返回 	PBPlayerHolyInfo
			EventMgr.on(Cmd.S2C_Holy_Unlock.cmdName, this, this.onUnlock)
		}
		/*****
		 *	 升级返回		PBPlayerHolyInfo
		 * @param PBPlayerHolyInfo
		 * 		pettype			uint32	 类型
		 * 		level			uint32	 等级
		 * 		exp			uint32	 当前经验
		 * 		advance			uint32	 进阶
		 */
		protected onUpgrade(value: Pb_God.PBPlayerHolyInfo): void
		{
			let tmpInfo = this.getHolyInfo(value.pettype);
			if (tmpInfo == null)
			{
				this._data.info.push(value);
			}
			else
			{
				if (tmpInfo.level < value.level)
				{
					//升级提示
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroHolyUpLevel, value));
				}
				tmpInfo.pettype = value.pettype;
				tmpInfo.level = value.level;
				tmpInfo.exp = value.exp;
				tmpInfo.advance = value.advance;
			}
		}
		/*****
		 *	 进阶返回 	PBPlayerHolyInfo
		 * @param PBPlayerHolyInfo
		 * 		pettype			uint32	 类型
		 * 		level			uint32	 等级
		 * 		exp			uint32	 当前经验
		 * 		advance			uint32	 进阶
		 */
		protected onAdvance(value: Pb_God.PBPlayerHolyInfo): void
		{
			let tmpInfo = this.getHolyInfo(value.pettype);
			if (tmpInfo == null)
			{
				this._data.info.push(value);
			}
			else
			{
				tmpInfo.pettype = value.pettype;
				tmpInfo.level = value.level;
				tmpInfo.exp = value.exp;
				tmpInfo.advance = value.advance;
			}
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroHolyUpAdvance, value));
		}
		/*****
		 *	 解锁返回 	PBPlayerHolyInfo
		 * @param PBPlayerHolyInfo
		 * 		pettype			uint32	 类型
		 * 		level			uint32	 等级
		 * 		exp			uint32	 当前经验
		 * 		advance			uint32	 进阶
		 */
		protected onUnlock(value: Pb_God.PBPlayerHolyInfo): void
		{
			let tmpInfo = this.getHolyInfo(value.pettype);
			if (tmpInfo == null)
			{
				this._data.info.push(value);
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroHolyActive, value.pettype));
			}
			else
			{
				tmpInfo.pettype = value.pettype;
				tmpInfo.level = value.level;
				tmpInfo.exp = value.exp;
				tmpInfo.advance = value.advance;
			}
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}