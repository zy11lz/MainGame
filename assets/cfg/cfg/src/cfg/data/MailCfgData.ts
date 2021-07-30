
/**
* 
*  配置数据访问
*/
module cfg
{
	export class MailCfgData extends cfg.MailBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.MailCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
