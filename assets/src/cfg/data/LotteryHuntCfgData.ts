
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LotteryHuntCfgData extends cfg.LotteryHuntBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.LotteryHuntCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getInfoByType(type: number): Array<cfg.LotteryHuntCfgInfo>
		{
			return this._dataArr.filter(elment => elment.type == type);
		}

		public static getShowInfo(type: number): Array<cfg.LotteryHuntCfgInfo>
		{
			return this._dataArr.filter(elment => elment.type == type && elment.show == 1);
		}

		public static getHuPaShowInfo(type: number)
		{
			let showInfos = this.getShowInfo(type);
			let arr: Array<cfg.AddItemInfo> = [];
			showInfos.filter(elment =>
			{
				arr = arr.concat(cfg.AddItemInfo.parse(elment.addItem.split(";")[0]));
			});
			return arr;

		}
	}
}

