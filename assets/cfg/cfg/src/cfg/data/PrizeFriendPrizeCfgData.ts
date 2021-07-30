
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrizeFriendPrizeCfgData extends cfg.PrizeFriendPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PrizeFriendPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
