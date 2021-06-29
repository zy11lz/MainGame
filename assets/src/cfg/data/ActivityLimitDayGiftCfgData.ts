
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityLimitDayGiftCfgData extends cfg.ActivityLimitDayGiftBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.ActivityLimitDayGiftCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getInfoByDay(id: number, day: number)
		{

			return this._dataArr.filter(element => element.day == day && element.activityID == id)[0];
		}
	}
}

