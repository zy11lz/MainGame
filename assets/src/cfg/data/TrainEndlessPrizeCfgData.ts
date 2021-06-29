
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TrainEndlessPrizeCfgData extends TrainEndlessPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): TrainEndlessPrizeCfgInfo[]
		{
			return this._dataArr;
		}

		/** 获取距离下一次最近的关卡奖励 */
		public static getInfoWithFun(stageID: number): TrainEndlessPrizeCfgInfo
		{
			for (let i = 0; i < this._dataArr.length; i++)
			{
				if (this._dataArr[i].stageID > stageID)
				{
					return this._dataArr[i];
				}
			}
			return null;
		}

		public static getStagePrizeAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "stagePrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.stagePrize);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

