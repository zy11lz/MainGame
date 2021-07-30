
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrivilegeCfgData extends cfg.PrivilegeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PrivilegeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
