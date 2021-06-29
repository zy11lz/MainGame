
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TempleLevelInfoCfgData extends TempleLevelInfoBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 根据等级读取配置 */
		public static getInfoByLevel(value: number): TempleLevelInfoCfgInfo
		{
			let cfgData = null;
			for (cfgData of this._dataArr)
			{
				if (value <= cfgData.level)
					return cfgData;
			}
			return cfgData;
		}

	}
}

