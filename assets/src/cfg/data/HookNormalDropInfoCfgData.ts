
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookNormalDropInfoCfgData extends HookNormalDropInfoBaseCfgData
	{
		protected static _dataDicBySceneID: Object;
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<HookNormalDropInfoCfgInfo>): void
		{
			super.setup(dataArr);
			this._dataDicBySceneID = TemplateUtil.createUniqIndexFromArr(dataArr, ["chapter"])
		}

		public static getDataAll(): Array<HookNormalDropInfoCfgInfo>
		{
			return this._dataArr;
		}

		public static getListWithSceneID(sceneID: number): Array<HookNormalDropInfoCfgInfo>
		{
			return this._dataDicBySceneID[sceneID];
		}

		public static getInfoWithStageID(stageID: number): HookNormalDropInfoCfgInfo
		{
			let HookNormalDropInfoCfgInfo = this._dataArr[0];
			for (let i = 0; i < this._dataArr.length; i++)
			{
				if (stageID >= this._dataArr[i].stage)
				{
					HookNormalDropInfoCfgInfo = this._dataArr[i];
				}
			}
			return HookNormalDropInfoCfgInfo;
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
			return null;
		}
	}
}

