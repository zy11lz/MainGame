
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SoundCfgData extends cfg.SoundBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.SoundCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
