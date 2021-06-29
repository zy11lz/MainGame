
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SystemSwitchSystemSwitchCfgData extends SystemSwitchSystemSwitchBaseCfgData
	{
		constructor()
		{
			super();
		}
		public static setup(dataArr: Array<SystemSwitchSystemSwitchCfgInfo>): void
		{
			dataArr.sort((a: SystemSwitchSystemSwitchCfgInfo, b: SystemSwitchSystemSwitchCfgInfo) =>
			{
				return a.sort - b.sort;
			})
			super.setup(dataArr);
		}

		public static getSortList(): SystemSwitchSystemSwitchCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

