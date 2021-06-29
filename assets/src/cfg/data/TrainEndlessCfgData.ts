
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TrainEndlessCfgData extends TrainEndlessBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): TrainEndlessCfgInfo[]
		{
			return this._dataArr;
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
			return [];
		}

		/** 最大关卡数 */
		public static getMaxStage(): number
		{
			return this._dataArr[this._dataArr.length - 1].stageID;
		}
	}
}

