
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookNormalDropInfoCfgData extends cfg.HookNormalDropInfoBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HookNormalDropInfoCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
