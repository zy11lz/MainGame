
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetAdvanceCfgData extends cfg.PetAdvanceBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetAdvanceCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
