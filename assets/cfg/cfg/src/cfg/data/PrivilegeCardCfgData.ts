
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrivilegeCardCfgData extends cfg.PrivilegeCardBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PrivilegeCardCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
