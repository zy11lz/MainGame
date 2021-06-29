
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ItemCfgData extends ItemBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAddAttrAryById(value: number): Array<AddAtterInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "AddAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addAttri);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getSellItemInfoById(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "sellPriceInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.sellPrice)[0];
				}
				return info[saveKey];
			}
			return null;
		}

		public static getUseParamInfoById(value: number): SkillValueIntInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "useParamInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueIntInfo.parseOne(info.useParam);
				}
				return info[saveKey];
			}
			return null;
		}


		public static getArrWithType(type: Pb_God._emItemType): ItemCfgInfo[]
		{
			let resultAry = this._dataArr.filter(elment => elment.type == type);
			return resultAry;
		}

		public static getInfoWithCompoundID(type: Pb_God._emItemType, subType: number): ItemCfgInfo[]
		{
			let resultAry = this._dataArr.filter(elment => elment.type == type && elment.subType == subType && elment.compoundID > 0);
			return resultAry;
		}

		public static getInfoWithType(type: Pb_God._emItemType, subType: number): ItemCfgInfo[]
		{
			let resultAry = this._dataArr.filter(elment => elment.type == type && elment.subType == subType);
			return resultAry;
		}

		public static getInfoWithQuFun(type: Pb_God._emItemType, subType: number, quNum: number): ItemCfgInfo[]
		{
			let resultAry = this._dataArr.filter(elment => elment.type == type && elment.subType == subType && elment.quality == quNum);
			return resultAry;
		}

		public static getInfoWithLevelFun(type: Pb_God._emItemType, subType: number, level: number): ItemCfgInfo[]
		{
			let resultAry = this._dataArr.filter(elment => elment.type == type && elment.subType == subType && elment.level == level);
			return resultAry;
		}

		/**
		 * 获取所有指定星级神装道具
		 */
		public static getGodItemInfoWithQuality(minQuality: number): ItemCfgInfo[]
		{
			let resultAry = this._dataArr.filter(e => e.type == Pb_God._emItemType.ItemType_GodEquip && e.quality >= minQuality);
			return resultAry;
		}
	}
}

