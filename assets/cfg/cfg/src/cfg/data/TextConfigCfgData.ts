
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TextConfigCfgData extends cfg.TextConfigBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.TextConfigCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
