
module Pro.Net
{
	/** 各种套装模板处理 */
	export class SuitEquipInfo
	{
		/** 装备列表 */
		private EquipList: SuitEquipData[] = [];
		/**伙伴符文*/
		private RuneList: Pb_God.PBPlayerPetRune[] = [];
		/**伙伴天赋*/
		private TalentList: Pb_God.PBPlayerPetTalent[] = [];
		/**伙伴神装 */
		private GodList: Pb_God.PBPlayerPetGodEquip[] = [];

		//----------------------------------------------------------------------------
		/** 初始化 */
		public init(petEquip: Pb_God.PBPlayerPetInfo)
		{

			this.EquipList.splice(0, this.EquipList.length);
			this.RuneList.splice(0, this.RuneList.length);
			this.TalentList.splice(0, this.TalentList.length);
			this.GodList.splice(0, this.GodList.length);

			if (petEquip != null)
			{
				petEquip.equip.forEach(elment =>
				{
					let tmpEquip = new SuitEquipData();
					for (var key in elment)
					{
						tmpEquip[key] = elment[key];
					}
					this.EquipList.push(tmpEquip);
				});

				this.RuneList = this.RuneList.concat(petEquip.rune);
				this.TalentList = this.TalentList.concat(petEquip.talent);
				this.GodList = this.GodList.concat(petEquip.godequip);
			}
		}

		/** 获取装备列表 */
		public getEquipList(): SuitEquipData[]
		{
			return this.EquipList;
		}

		/** 获取符文列表 */
		public getRuneList(): Pb_God.PBPlayerPetRune[]
		{
			return this.RuneList;
		}

		/** 获取天赋列表 */
		public getTalentList(): Pb_God.PBPlayerPetTalent[]
		{
			return this.TalentList;
		}

		/** 获取神装列表 */
		public getGodList(): Pb_God.PBPlayerPetGodEquip[]
		{
			return this.GodList;
		}

		/** 获取装备部件道具 */
		public getEquip(subType: number): SuitEquipData
		{
			let resultAry = this.EquipList.filter(elment => elment.equiptype == subType);
			return resultAry.length > 0 ? resultAry[0] : null;
		}

		/** 获取符文部件道具 */
		public getRune(pos: number): Pb_God.PBPlayerPetRune
		{
			let resultAry = this.RuneList.filter(elment => elment.pos == pos);
			return resultAry.length > 0 ? resultAry[0] : null;
		}

		/** 获取符文部件道具位置 */
		public getRunePos(itemSn: Long): number
		{
			let resultAry = this.RuneList.filter(elment => (elment.itemsn as Long).equals(itemSn));
			return resultAry.length > 0 ? resultAry[0].pos : -1;
		}

		/** 获取天赋部件道具 */
		public getTalent(pos: number): Pb_God.PBPlayerPetTalent
		{
			let resultAry = this.TalentList.filter(elment => elment.pos == pos);
			return resultAry.length > 0 ? resultAry[0] : null;
		}

		/** 获取神装部件道具 */
		public getGodEquip(subType: number): Pb_God.PBPlayerPetGodEquip
		{
			let resultAry = this.GodList.filter(elment => elment.equiptype == subType);
			return resultAry.length > 0 ? resultAry[0] : null;
		}

		/** 脱装备部件 */
		public unEquipItem(subType: number)
		{
			let index = -1;
			for (let i = 0; i < this.EquipList.length; i++)
			{
				if (this.EquipList[i].equiptype == subType)
				{
					index = i;
					break;
				}
			}
			if (index == -1)
			{
				return;
			}

			this.EquipList.splice(index, 1);
		}

		/** 更新装备部件 */
		public equipItem(equipType: number, itemid: number)
		{
			let tmpOldEquip = this.getEquip(equipType);
			if (tmpOldEquip != null)
			{
				tmpOldEquip.itemid = itemid;
			}
			else
			{
				let tmpEquip = new SuitEquipData();
				tmpEquip.equiptype = equipType;
				tmpEquip.itemid = itemid;
				this.getEquipList().push(tmpEquip);
			}
		}

		/** 脱符文部件 */
		public unEquipRune(pos: number): Long
		{
			let index = -1;
			for (let i = 0; i < this.RuneList.length; i++)
			{
				if (this.RuneList[i].pos == pos)
				{
					index = i;
					break;
				}
			}

			if (index == -1)
			{
				return null;
			}

			let tempSN = this.RuneList[index].itemsn;
			this.RuneList.splice(index, 1);

			return tempSN as Long;
		}

		/** 更新符文部件 */
		public equipRune(tempClass: Pb_God.PBCAGPet_RuneEquip)
		{
			let tmpOldEquip = this.getRune(tempClass.pos);
			if (tmpOldEquip != null)
			{
				tmpOldEquip.itemsn = tempClass.itemsn;
			}
			else
			{
				let tempInfo = new Pb_God.PBPlayerPetRune();
				tempInfo.pos = tempClass.pos;
				tempInfo.itemsn = tempClass.itemsn;
				tempInfo.iteminfo = null;
				this.getRuneList().push(tempInfo);
			}
		}

		/** 脱天赋部件 */
		public unEquipTalent(subType: number): void
		{
			let index = -1;
			for (let i = 0; i < this.TalentList.length; i++)
			{
				if (this.TalentList[i].pos == subType)
				{
					index = i;
					break;
				}
			}

			if (index == -1)
			{
				return null;
			}

			this.TalentList.splice(index, 1);
		}

		/** 更新天赋部件 */
		public equipTalent(tempClass: Pb_God.PBCAGPet_Talent)
		{
			let tmpOldEquip = this.getTalent(tempClass.pos);
			if (tmpOldEquip != null)
			{
				tmpOldEquip.skillindex = tempClass.skillindex;
			}
			else
			{
				let tempInfo = new Pb_God.PBPlayerPetTalent();
				tempInfo.pos = tempClass.pos;
				tempInfo.skillindex = tempClass.skillindex;
				this.getTalentList().push(tempInfo);
			}
		}

		/** 更新神级装备部件 */
		public equipGodItem(equipItem: Pb_God.PBCAGPet_GodEquip)
		{
			let tmpOldEquip = this.getGodEquip(equipItem.pos);
			if (tmpOldEquip != null)
			{
				if (Global.longToNumber(equipItem.itemsn) == 0)
				{
					this.unEquipGodItem(tmpOldEquip.equiptype);
				}
				else
				{
					tmpOldEquip.equiptype = equipItem.pos;
					tmpOldEquip.itemsn = equipItem.itemsn;
				}
			}
			else
			{
				let tmpEquip = new Pb_God.PBPlayerPetGodEquip();
				tmpEquip.equiptype = equipItem.pos;
				tmpEquip.itemsn = equipItem.itemsn;
				this.GodList.push(tmpEquip);
			}
		}

		/** 脱神级装备部件 */
		public unEquipGodItem(subType: number)
		{
			let index = -1;
			for (let i = 0; i < this.GodList.length; i++)
			{
				if (this.GodList[i].equiptype == subType)
				{
					index = i;
					break;
				}
			}
			if (index == -1)
			{
				return;
			}

			this.GodList.splice(index, 1);
		}

		/** 脱下所有神装部件 */
		public unEquipAllGodEquip(): void
		{
			this.GodList.splice(0, this.GodList.length);
		}

		/** 获取当前部件激活的套装数 */
		public getActiveSuitNum(tempItemID: number): number
		{

			let tempItemLv = cfg.ItemCfgData.getLevelById(tempItemID);
			let tempActiveNum = 1;
			for (let i = 0; i < this.EquipList.length; i++)
			{
				let tempSuitInfo = this.EquipList[i];
				if (tempSuitInfo.itemid != tempItemID && cfg.ItemCfgData.getLevelById(tempSuitInfo.itemid) == tempItemLv)
				{
					tempActiveNum++;
				}
			}
			return tempActiveNum;
		}

		/** 获取当前部件激活的神装套装数 */
		public getActiveSuitGodNum(tempItemSN: Long): number
		{

			let tempItemInfo = ItemDataMgr.getUsesPBItem(tempItemSN);
			let suitId = cfg.ItemCfgData.getUseParamById(tempItemInfo.itemid);
			let tempActiveNum = 1;
			for (let i = 0; i < this.GodList.length; i++)
			{
				let tempSuitInfo = this.GodList[i];
				if ((tempSuitInfo.itemsn as Long).equals(tempItemSN)) continue;
				let tempSuitItem = ItemDataMgr.getUsesPBItem(tempSuitInfo.itemsn as Long);
				if (cfg.ItemCfgData.getUseParamById(tempSuitItem.itemid) == suitId)
				{
					tempActiveNum++;
				}
			}
			return tempActiveNum;
		}
	}
}