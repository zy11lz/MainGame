
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
	export class ItemData_auto extends ItemDataMgrBase
	{
		constructor()
		{
			super()
			//	 新增道具				PBG2CNewItem
			EventMgr.on(Cmd.S2C_Item_New.cmdName, this, this.onNew)
			//	 更新道具信息			PBItem
			EventMgr.on(Cmd.S2C_Item_Update.cmdName, this, this.onUpdate)
			//	 更新道具数量			PBG2CUpdateItem
			EventMgr.on(Cmd.S2C_Item_UpdateNum.cmdName, this, this.onUpdateNum)
			//	 使用道具返回			无内容
			EventMgr.on(Cmd.S2C_Item_Use.cmdName, this, this.onUse)
			//	 通用失败返回
			EventMgr.on(Cmd.S2C_Item_Common.cmdName, this, this.onCommon)
			//	 符文合成返回			PBItemSn
			EventMgr.on(Cmd.S2C_Item_RuneCompound.cmdName, this, this.onRuneCompound)
			//	 符文重铸返回			PBG2CRuneRefineAck
			EventMgr.on(Cmd.S2C_Item_RuneRefine.cmdName, this, this.onRuneRefine)
			//	 符文重铸保存返回		PBItem
			EventMgr.on(Cmd.S2C_Item_SaveRuneRefine.cmdName, this, this.onSaveRuneRefine)
			// 	 装备合成返回			失败才返回
			EventMgr.on(Cmd.S2C_Item_EquipCompound.cmdName, this, this.onEquipCompound)
			// 	 装备一键合成返回		失败才返回
			EventMgr.on(Cmd.S2C_Item_EquipAutoCompound.cmdName, this, this.onEquipAutoCompound)
			// 	 伙伴合成返回			PBG2CPetCompound
			EventMgr.on(Cmd.S2C_Item_PetCompound.cmdName, this, this.onPetCompound)
			//	 神装洗练	返回		PBG2CGodEquipRefineAck
			EventMgr.on(Cmd.S2C_Item_GodEquipRefine.cmdName, this, this.onGodEquipRefine)
			//	 神装洗练	保存返回	PBItem
			EventMgr.on(Cmd.S2C_Item_SaveGodEquipRefine.cmdName, this, this.onSaveGodEquipRefine)
			//	 查询装备合成记录		PBG2CEquipCompoundLog	
			EventMgr.on(Cmd.S2C_Item_EquipCompoundLog.cmdName, this, this.onEquipCompoundLog)
		}
		/*****
		 *	 新增道具				PBG2CNewItem
		 * @param PBG2CNewItem
		 * 		iteminfo			PBItem	
		 * 		doing			uint32	_emDoingType
		 */
		protected onNew(value: Pb_God.PBG2CNewItem): void
		{
			let doing = value.doing as Pb_God._emDoingType;
			value.iteminfo["isNew"] = true;
			this.getBagList().push(value.iteminfo);
			this.triggerChangeByItemid(value.iteminfo.itemid, value.iteminfo.itemcount);
			//EventMgr.trigger(EventNotify.Equip_Changed);
			Global.CallEventLater(EventNotify.Equip_Changed);

			Global.showItemTipsByDoingType(value.doing, value.iteminfo.itemid, value.iteminfo.itemcount);
		}

		public clearNewState()
		{
			let list = this.getBagList();
			for (let i = 0; i < list.length; i++)
			{
				let info = list[i];
				info["isNew"] && (info["isNew"] = false);
			}
		}
		/*****
		 *	 更新道具信息			PBItem
		 * @param PBItem
		 * 		itemsn			uint64	 物品流水号
		 * 		itemid			uint32	 物品ID
		 * 		itemcount			uint32	 物品数量
		 * 		flag			uint32	 标识
		 * 		skillinfo			PBSkillInfo	 被动技能数据
		 * 		randattr			PBAttrBaseInfo	 随机属性
		 * 		refineskill			PBSkillInfo	 重铸的被动技能数据
		 * 		refineattr			PBAttrBaseInfo	 随机属性
		 * 		godrefinecount			uint32	 神装洗练次数
		 * 		equippetsn			uint64	 穿戴伙伴SN
		 * 		time			uint32	 获得时间
		 */
		protected onUpdate(value: Pb_God.PBItem): void
		{
			let isEquiped = value.flag >> Pb_God._emItemFlag.ItemFlag_Equip;
			if (isEquiped)
			{
				let tmpUsesIndex = this.getUsesEquipIndex(value.itemsn as Long);
				if (tmpUsesIndex >= 0)
				{
					if (value.itemcount == 0)
					{
						this.getUsesEquip().splice(tmpUsesIndex, 1);
					}
					else
					{
						let tmpInfo = this.getUsesEquip()[tmpUsesIndex];
						for (let tmpKey in tmpInfo)
						{
							tmpInfo[tmpKey] = value[tmpKey];
						}
					}
				}
				else
				{
					let tmpBagIndex = this.getBagItemIndex(value.itemsn as Long);
					if (tmpBagIndex >= 0)
					{
						this.getBagList().splice(tmpBagIndex, 1);
						this.getUsesEquip().push(value);
					}
				}
			}
			else
			{
				let tmpBagIndex = this.getBagItemIndex(value.itemsn as Long);
				if (tmpBagIndex >= 0)
				{
					if (value.itemcount == 0)
					{
						this.getBagList().splice(tmpBagIndex, 1);
					}
					else
					{
						let tmpInfo = this.getBagList()[tmpBagIndex];
						for (let tmpKey in tmpInfo)
						{
							tmpInfo[tmpKey] = value[tmpKey];
						}
					}
				}
				else
				{
					let tmpUsesIndex = this.getUsesEquipIndex(value.itemsn as Long);
					if (tmpUsesIndex >= 0)
					{
						this.getUsesEquip().splice(tmpUsesIndex, 1);
						this.getBagList().push(value);
					}
				}
			}
			this.triggerChangeByItemid(value.itemid, value.itemcount);

			//EventMgr.trigger(EventNotify.Equip_Changed);
			Global.CallEventLater(EventNotify.Equip_Changed);
		}
		/*****
		 *	 更新道具数量			PBG2CUpdateItem
		 * @param PBG2CUpdateItem
		 * 		itemsnid			uint64	
		 * 		itemid			uint32	道具ID
		 * 		itemcount			uint32	道具的当前个数
		 * 		flag			uint32	标志 _emItemFlag
		 * 		doing			uint32	_emDoingType
		 */
		protected onUpdateNum(value: Pb_God.PBG2CUpdateItem): void
		{
			let isEquiped = value.flag >> Pb_God._emItemFlag.ItemFlag_Equip;
			if (isEquiped)
			{
				let tmpUsesIndex = this.getUsesEquipIndex(value.itemsnid as Long);
				if (tmpUsesIndex >= 0)
				{
					if (value.itemcount == 0)
					{
						this.getUsesEquip().splice(tmpUsesIndex, 1);
					}
					else
					{
						let tempItemInfo = this.getUsesEquip()[tmpUsesIndex];
						tempItemInfo.itemcount = value.itemcount;
						tempItemInfo.itemid = value.itemid;
					}
				}
				EventMgr.trigger(EventNotify.BagEquipNumChange, value.itemid, value.itemcount);
			}
			else
			{
				let tmpBagAry = this.getBagList();
				let tmpBagIndex = this.getBagItemIndex(value.itemsnid as Long);
				if (tmpBagIndex >= 0)
				{
					let tmpOldNum = tmpBagAry[tmpBagIndex].itemcount;
					if (value.itemcount == 0)
					{
						tmpBagAry.splice(tmpBagIndex, 1);
					}
					else
					{
						let tempItemInfo = tmpBagAry[tmpBagIndex];
						tempItemInfo.itemcount = value.itemcount;
						tempItemInfo.itemid = value.itemid;
						Global.showItemTipsByDoingType(value.doing, value.itemid, value.itemcount - tmpOldNum);
					}
					this.triggerChangeByItemid(value.itemid, value.itemcount);
				}
			}
			//EventMgr.trigger(EventNotify.Equip_Changed);
			Global.CallEventLater(EventNotify.Equip_Changed);
		}
		/*****
		 *	 使用道具返回			无内容
		 * @param 
		 */
		protected onUse(): void
		{

		}
		/*****
		 *	 通用失败返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	 符文合成返回			PBItemSn
		 * @param PBItemSn
		 * 		itemsn			uint64	道具SN
		 */
		protected onRuneCompound(value: Pb_God.PBItemSn): void
		{

		}
		/*****
		 *	 符文重铸返回			PBG2CRuneRefineAck
		 * @param PBG2CRuneRefineAck
		 * 		itemsn			uint64	道具SN
		 * 		refineskill			PBSkillInfo	重铸的被动技能索引
		 * 		refineattr			PBAttrBaseInfo	重铸的随机属性
		 */
		protected onRuneRefine(value: Pb_God.PBG2CRuneRefineAck): void
		{
			TipsUtils.showTipsByLanId("ui_Bag_RuneEquip_msg11");
		}
		/*****
		 *	 符文重铸保存返回		PBItem
		 * @param PBItem
		 * 		itemsn			uint64	 物品流水号
		 * 		itemid			uint32	 物品ID
		 * 		itemcount			uint32	 物品数量
		 * 		flag			uint32	 标识
		 * 		skillinfo			PBSkillInfo	 被动技能数据
		 * 		randattr			PBAttrBaseInfo	 随机属性
		 * 		refineskill			PBSkillInfo	 重铸的被动技能数据
		 * 		refineattr			PBAttrBaseInfo	 随机属性
		 * 		godrefinecount			uint32	 神装洗练次数
		 * 		equippetsn			uint64	 穿戴伙伴SN
		 * 		time			uint32	 获得时间
		 */
		protected onSaveRuneRefine(value: Pb_God.PBItem): void
		{
						TipsUtils.showTipsByLanId("ui_Bag_RuneEquip_msg12");
		}
		/*****
		 * 	 装备合成返回			失败才返回
		 * @param 
		 */
		protected onEquipCompound(): void
		{

		}
		/*****
		 * 	 装备一键合成返回		失败才返回
		 * @param 
		 */
		protected onEquipAutoCompound(): void
		{

		}
		/*****
		 * 	 伙伴合成返回			PBG2CPetCompound
		 * @param PBG2CPetCompound
		 * 		pet			PBPetStar	新增的伙伴
		 */
		protected onPetCompound(value: Pb_God.PBG2CPetCompound): void
		{

		}
		/*****
		 *	 神装洗练	返回		PBG2CGodEquipRefineAck
		 * @param PBG2CGodEquipRefineAck
		 * 		itemsn			uint64	道具SN
		 * 		refinecount			uint32	洗练次数
		 * 		refineattr			PBAttrBaseInfo	洗练的随机属性
		 */
		protected onGodEquipRefine(value: Pb_God.PBG2CGodEquipRefineAck): void
		{
			TipsUtils.showTipsByLanId("ui_Bag_RuneEquip_msg13");
		}
		/*****
		 *	 神装洗练	保存返回	PBItem
		 * @param PBItem
		 * 		itemsn			uint64	 物品流水号
		 * 		itemid			uint32	 物品ID
		 * 		itemcount			uint32	 物品数量
		 * 		flag			uint32	 标识
		 * 		skillinfo			PBSkillInfo	 被动技能数据
		 * 		randattr			PBAttrBaseInfo	 随机属性
		 * 		refineskill			PBSkillInfo	 重铸的被动技能数据
		 * 		refineattr			PBAttrBaseInfo	 随机属性
		 * 		godrefinecount			uint32	 神装洗练次数
		 * 		equippetsn			uint64	 穿戴伙伴SN
		 * 		time			uint32	 获得时间
		 */
		protected onSaveGodEquipRefine(value: Pb_God.PBItem): void
		{
			TipsUtils.showTipsByLanId("ui_Bag_RuneEquip_msg12");
		}
		/*****
		 *	 查询装备合成记录		PBG2CEquipCompoundLog	
		 * @param PBG2CEquipCompoundLog
		 * 		log			PBEquipCompoundLog	记录
		 */
		protected onEquipCompoundLog(value: Pb_God.PBG2CEquipCompoundLog): void
		{

		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}