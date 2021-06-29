
/**
* 
*  配置数据访问
*/
module cfg
{
	export class WeekChampionConstInfoCfgData extends cfg.WeekChampionConstInfoBaseCfgData
	{
		constructor()
		{
			super();
		}
		private static _openDays: number[];
		public static getOpenDays(): number[]
		{
			if (!this._openDays)
			{
				this._openDays = [];
				let daysArr = this.getFirstInfo().circleDays.split(";");
				for (var el of daysArr)
				{
					this._openDays.push(parseInt(el));
				}
			}
			return this._openDays;
		}

		private static _openTimeInfo: StDateTimeInfo;
		/** 开启时间 */
		public static getOpenTimeInfo(): StDateTimeInfo
		{
			if (this._openTimeInfo) return this._openTimeInfo;
			let openTimeStr = this.getFirstInfo().openTime;
			this._openTimeInfo = StDateTimeInfo.parse(openTimeStr);
			return this._openTimeInfo;
		}

		private static _prizePreviewItemArr: AddItemInfo[];
		/** 奖励预览 */
		public static getAddItemAryByInfo(): Array<AddItemInfo>
		{
			if (!this._prizePreviewItemArr)
			{
				let info = this.getFirstInfo();
				this._prizePreviewItemArr = AddItemInfo.parse(info.prizePreview);
			}
			return this._prizePreviewItemArr;
		}
	}
}
 
