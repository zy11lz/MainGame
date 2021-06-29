
/**
* 
*  配置数据访问
*/
module cfg
{
	export class IllustrationTrammelCfgData extends cfg.IllustrationTrammelBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.IllustrationTrammelCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getAllList()
		{
			return this._dataArr;
		}

		public static getNeedSkinsAryById(id: number)
		{
			let info = this.getInfo(id);
			if (info)
			{
				let saveKey = "needSkinsAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = info.needSkins.split(";")
				}
				return info[saveKey];
			}
			return null;
		}

		public static getAddAttrAryWithId(value: number): Array<AddAtterInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addAttr);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

