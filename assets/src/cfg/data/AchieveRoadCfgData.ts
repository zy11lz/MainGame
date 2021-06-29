
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveRoadCfgData extends cfg.AchieveRoadBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.AchieveRoadCfgInfo>):void
		{
			super.setup(dataArr);
		}


		public static getDataList(): AchieveRoadCfgInfo[]
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
	}
}
 
