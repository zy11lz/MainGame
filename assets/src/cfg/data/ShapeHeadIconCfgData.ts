
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ShapeHeadIconCfgData extends ShapeHeadIconBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): ShapeHeadIconCfgInfo[]
		{
			return this._dataArr;
		}

	}
}

