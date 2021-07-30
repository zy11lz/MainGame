
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrivilegeVipCfgData extends cfg.PrivilegeVipBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PrivilegeVipCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
