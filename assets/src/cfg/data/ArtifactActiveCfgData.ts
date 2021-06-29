
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ArtifactActiveCfgData extends ArtifactActiveBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): ArtifactActiveCfgInfo[]
		{
			return this._dataArr;
		}

		public static getInfoWithFun(id: number): ArtifactActiveCfgInfo[]
		{
			return this._dataArr.filter(elment => elment.iD == id);
		}

		public static getAddPrizeAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addPrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addPrize);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 激活所需道具 */
		public static getNeedItemInfoById(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem)[0];
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

