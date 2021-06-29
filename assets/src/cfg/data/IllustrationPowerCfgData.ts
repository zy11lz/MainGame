
/**
* 
*  配置数据访问
*/
module cfg
{
	export class IllustrationPowerCfgData extends cfg.IllustrationPowerBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.IllustrationPowerCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getAllList()
		{
			return this._dataArr;
		}

		public static getAddItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
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

		public static getMaxPower()
		{
			let all = this.getAllList();
			return all[all.length - 1].value;
		}
	}
}

