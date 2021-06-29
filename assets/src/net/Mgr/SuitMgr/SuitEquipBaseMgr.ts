
module Pro.Net
{
	export class SuitEquipBaseMgr
	{

		constructor()
		{
			Global.EventsNotifyControl(this.listensEvents(), false);
		}

		//-----------------------------管理自定义事件-----------------------------------
		/** 本类监听消息列表 */
		private listensEvents(): Array<any>
		{
			return [

			]
		}

		/** 伙伴装备管理器 */
		private SubEquipMgrDic: ds.StringMap<SuitEquipInfo>;

		/** 神装套装方案管理(下标加1即是ID) */
		protected _godequipSuitMgrList: Pb_God.PBPlayerGodEquipSuitInfo[] = [];

		//----------------------------------------------------------------------------
		/** 初始化数据 */
		public init(godsuit: Pb_God.PBPlayerGodEquipSuit): void
		{
			if (this.SubEquipMgrDic != null)
			{
				this.SubEquipMgrDic.clear();
			}
			this._godequipSuitMgrList = [];
			for (let el of godsuit.suitinfo)
			{
				this.setGodEquipSuitMgrInfo(el);
			}
		}

		/** 初始化 */
		public initSuitMgr(petEquip: Pb_God.PBPlayerPetInfo)
		{
			let tempSuitMgr = this.getSuitMgr(petEquip.display.sn as Long);
			tempSuitMgr.init(petEquip);
		}

		/** 获取装备管理器 */
		public getSuitMgr(petSn: Long): SuitEquipInfo
		{
			if (this.SubEquipMgrDic == null)
			{
				this.SubEquipMgrDic = new ds.StringMap<SuitEquipInfo>();
			}
			let tempPetEquip = this.SubEquipMgrDic.get(petSn.toString(0));
			if (tempPetEquip == null)
			{
				tempPetEquip = new SuitEquipInfo();
				tempPetEquip.init(null);
				this.SubEquipMgrDic.put(petSn.toString(0), tempPetEquip);
			}
			return tempPetEquip;
		}

		////////////////////////////////////////////////////////////////////////////////////
		//-------------------------------------- 英雄神装套装管理 -----------------------------
		////////////////////////////////////////////////////////////////////////////////////
		public setGodEquipSuitMgrInfo(info: Pb_God.PBPlayerGodEquipSuitInfo): void
		{
			this._godequipSuitMgrList[info.id - 1] = info;
		}
		public getAllGodEquipSuitMgr(): Pb_God.PBPlayerGodEquipSuitInfo[]
		{
			return this._godequipSuitMgrList;
		}
		public getGodEquipSuitInfoById(id: number): Pb_God.PBPlayerGodEquipSuitInfo
		{
			return this._godequipSuitMgrList[id - 1];
		}
		/** 获取英雄使用的方案ID */
		public getGodEquipSuitInfoByHeroSn(herosn: Long): Pb_God.PBPlayerGodEquipSuitInfo
		{
			for (let info of this._godequipSuitMgrList)
			{
				if (info.petsn.equals(herosn)) { return info; }
			}
			return null;
		}
		/** 判断神装是否已经存在套装方案中 */
		public checkGodEquipUseProject(itemsn: Long): boolean
		{
			for (let info of this._godequipSuitMgrList)
			{
				for (let equip of info.posequip)
				{
					if (itemsn.equals(equip.itemsn)) { return true; }
				}
			}
			return false;
		}
		/** 获取神装套装方案中， 激活的套装数量
		 * @param mgrId 套装管理ID  对应的是 GodEquipSuitMgrCfgData
		 * @param suitId 套装ID  对应的是 GodEquipSuitCfgData
		 */
		public getGodEquipSuitMgrSuitActiveNum(mgrId: number, suitId: number): number
		{
			let mgrInfo = this.getGodEquipSuitInfoById(mgrId);
			if (!mgrInfo) { return 0; }
			let itemUseParam = suitId + "";
			let ret = 0;
			for (let posEquip of mgrInfo.posequip)
			{
				let itemInfo = ItemDataMgr.getUsesPBItem(posEquip.itemsn) || ItemDataMgr.getBagPBItem(posEquip.itemsn);
				if (itemInfo && cfg.ItemCfgData.getUseParamById(itemInfo.itemid) == itemUseParam)
				{ ret++; }
			}
			return ret;
		}
	}
}