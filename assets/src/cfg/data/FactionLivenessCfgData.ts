
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionLivenessCfgData extends FactionLivenessBaseCfgData
	{
		constructor()
		{
			super();
		}


		public static getAllList(): FactionLivenessCfgInfo[]
		{
			return this._dataArr;
		}


		public static getAddAttrAryByInfo(info: FactionLivenessCfgInfo): Array<AddAtterInfo>
		{
			if (info)
			{
				let saveKey = "AddAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addAttr);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getAddItemAryByInfo(info: FactionLivenessCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "addItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addItem);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

