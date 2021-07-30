
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetReplaceCfgData extends cfg.PetReplaceBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetReplaceCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
