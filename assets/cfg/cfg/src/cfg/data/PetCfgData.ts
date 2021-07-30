
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCfgData extends cfg.PetBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
