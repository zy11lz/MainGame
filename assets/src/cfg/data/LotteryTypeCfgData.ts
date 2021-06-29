
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LotteryTypeCfgData extends cfg.LotteryTypeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.LotteryTypeCfgInfo>):void
		{
			super.setup(dataArr);
		}

		/** 根据保底抽奖类型获取抽奖奖励信息 */
		public static getInfoByType(type: number): LotteryTypeCfgInfo
		{
			let lottery: Array<cfg.LotteryTypeCfgInfo> =  this._dataArr.filter(elment => elment.type == type);
			if(lottery.length > 0)return lottery[0];
			return null;
		}
	}
}
 
