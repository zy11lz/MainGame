
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetTalentPosCfgData extends cfg.PetTalentPosBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetTalentPosCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
