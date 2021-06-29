
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
			if (!this.info)
				return;
			let typeInfo = this.getInfoByType(value.type);
			typeInfo.maxgrididx = value.maxgrididx;
		}
		/*****
		 * 	 重置冷却 PBG2CResonanceGridChg
		 * @param PBG2CResonanceGridChg
		 * 		type			uint32	类型
		 * 		grid			PBPlayerResonanceGrid	格子数据
		 */
		protected onResetCD(value: Pb_God.PBG2CResonanceGridChg): void
		{
			if (!this.info)
				return;
			let typeInfo = this.getInfoByType(value.type);
			for (let i = 0; i < typeInfo.grid.length; i++)
			{
				if (typeInfo.grid[i].grididx == value.grid.grididx)
					typeInfo.grid[i] = value.grid;
			}
			TipsUtils.showTipsByLanId("resonance_msg5");
		}
		/*****
		 * 	 放置共鸣 PBG2CResonanceGridChg
		 * @param PBG2CResonanceGridChg
		 * 		type			uint32	类型
		 * 		grid			PBPlayerResonanceGrid	格子数据
		 */
		protected onPlaceGrid(value: Pb_God.PBG2CResonanceGridChg): void
		{
			if (!this.info)
				return;
			let typeInfo = this.getInfoByType(value.type);
			let have = false;
			let isDown = false;
			for (let i = 0; i < typeInfo.grid.length; i++)
			{
				if (typeInfo.grid[i].grididx == value.grid.grididx)
				{
					have = true;
					typeInfo.grid[i] = value.grid;
					if (value.grid.petsn.equals(Global.initLongFromValue(0)))
						isDown = true;
				}
			}
			if (!have)
			{
				typeInfo.grid.push(value.grid);
			}
			isDown && EventMgr.trigger(EventNotify.Resonance_down);

			if (isDown)
			{
				TipsUtils.showTipsByLanId("resonance_msg8");	//卸下成功
			}
			else
			{
				if (value.type == Pb_God._emResonanceType.Resonance_Type_Star)
				{
					TipsUtils.showTipsByLanId("tips_msg75");	//放置成功
					EventMgr.trigger(EventNotify.Resonance_Select, value);
				}
				else
				{
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroResonanceResult, value));
				}
			}
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
			let typeInfo = this.getInfoByType(value.type);
			if (!typeInfo)
			{
				this.info.resonanceinfo.push(value);
			}
		}
		/*****
		 * 	 共鸣主体更新 PBG2CResonanceMainPetSn
		 * @param PBG2CResonanceMainPetSn
		 * 		type			uint32	类型
		 * 		petlist			uint64	共鸣主体
		 */
		protected onMainPetSn(value: Pb_God.PBG2CResonanceMainPetSn): void
		{
			if (!this.info)
				return;
			let typeInfo = this.getInfoByType(value.type);
			typeInfo.petlist = value.petlist;
			this.sortPets();
		}
		/*****
		 * 	 升星返回 PBG2CResonanceUpStar
		 * @param PBG2CResonanceUpStar
		 * 		oldstar			uint32	旧的星级
		 * 		petsn			uint64	宠物sn
		 */
		protected onUpStar(value: Pb_God.PBG2CResonanceUpStar): void
		{
			let grid = this.getStarGridDataByPetSn(value.petsn);
			let v1 = new Pb_God.PBG2CResonanceGridChg();
			v1.type = Pb_God._emResonanceType.Resonance_Type_Star;
			v1.grid = grid;
			// UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroResonanceResult, v1));
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}