
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookBossDropInfoCfgData extends HookBossDropInfoBaseCfgData
	{
		protected static _dataDicBySceneID: Object;
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<HookBossDropInfoCfgInfo>): void
		{
			super.setup(dataArr);
			this._dataDicBySceneID = TemplateUtil.createUniqIndexFromArr(dataArr, ["chapter"])
		}

		public static getListWithSceneID(sceneID: number): Array<HookBossDropInfoCfgInfo>
		{
			return this._dataDicBySceneID[sceneID] || [];
		}

		public static getItemIDAryByIndex(value: number): ValueOneInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "itemListAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueOneInfo.parse(info.itemList);
				}
				return info[saveKey];
			}
			return [];
		}
	}
}

