
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetFormationCfgData extends cfg.PetFormationBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetFormationCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
