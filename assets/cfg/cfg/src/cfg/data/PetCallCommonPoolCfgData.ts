
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCallCommonPoolCfgData extends cfg.PetCallCommonPoolBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetCallCommonPoolCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
