
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCallCommonPoolCfgData extends PetCallCommonPoolBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataAll(): Array<PetCallCommonPoolCfgInfo>
		{
			return this._dataArr;
		}

	}
}

