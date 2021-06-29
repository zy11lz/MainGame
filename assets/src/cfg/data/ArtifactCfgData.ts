
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ArtifactCfgData extends ArtifactBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): ArtifactCfgInfo[]
		{
			return this._dataArr;
		}

		public static getLastOne(): ArtifactCfgInfo
		{
			return this._dataArr[this._dataArr.length - 1];
		}

	}
}

