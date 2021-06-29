
/**
* 
*  配置数据访问
*/
module cfg
{
	export class IncubateSpeedUpCfgData extends cfg.IncubateSpeedUpBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.IncubateSpeedUpCfgInfo>):void
		{
			super.setup(dataArr);
		}
		public static getDataArr():Array<cfg.IncubateSpeedUpCfgInfo>{
			return this._dataArr
		}
	}
}
 
