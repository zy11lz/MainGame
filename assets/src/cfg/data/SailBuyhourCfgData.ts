
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SailBuyhourCfgData extends SailBuyhourBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataAll(): Array<SailBuyhourCfgInfo>
		{
			return this._dataArr;
		}

		public static getInfoWithFun(needHour: number): cfg.SailBuyhourCfgInfo
		{
			let tmpOldRefreshTime = 0;
			let tempCfgAry = this.getDataAll();
			for (let i = 0; i < tempCfgAry.length; i++)
			{
				if (needHour > tmpOldRefreshTime && needHour <= tempCfgAry[i].hour)
				{
					return tempCfgAry[i];
				}
				tmpOldRefreshTime = tempCfgAry[i].hour;
			}

			return tempCfgAry[tempCfgAry.length - 1];
		}
	}
}

