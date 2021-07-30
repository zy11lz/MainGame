
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCallChangeCfgData extends cfg.PetCallChangeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetCallChangeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
