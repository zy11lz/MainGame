
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetBookCfgData extends cfg.PetBookBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetBookCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
