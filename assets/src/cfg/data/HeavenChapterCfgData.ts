
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HeavenChapterCfgData extends HeavenChapterBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): Array<HeavenChapterCfgInfo>
		{
			return this._dataArr;
		}
	}
}

