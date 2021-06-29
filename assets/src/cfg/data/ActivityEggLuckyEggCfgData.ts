
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityEggLuckyEggCfgData extends cfg.ActivityEggLuckyEggBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ActivityEggLuckyEggCfgInfo>):void
		{
			super.setup(dataArr);
		}
		public static getDataArr():Array<cfg.ActivityEggLuckyEggCfgInfo>{
			return this._dataArr
		}
	}
}
 
