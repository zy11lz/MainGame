
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LotteryPoolCfgData extends cfg.LotteryPoolBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.LotteryPoolCfgInfo>):void
		{
			super.setup(dataArr);
		}

		public static getInfoByType(type: number): Array<cfg.LotteryPoolCfgInfo>
		{
			return this._dataArr.filter(elment => elment.type == type);
		}

		/** 根据抽卡类型返回展示道具 */
		public static getItemsByType(type: number): Array<cfg.AddItemInfo>
		{	
			let arr: Array<cfg.AddItemInfo> = [];
			this._dataArr.filter(elment =>{
				if(elment.type == type)
				{
					arr = arr.concat(cfg.AddItemInfo.parse(elment.item)); 
				}
			});
			return arr;
		}

		/** 获取指定保底道具信息 */
		public static getInfoByTypeAndIndex(type: number,index: number): cfg.LotteryPoolCfgInfo
		{
			let arr: Array<cfg.LotteryPoolCfgInfo> = this._dataArr.filter(elment => elment.type == type && elment.index == index);
			if(arr.length > 0)return arr[0];
			return new cfg.LotteryPoolCfgInfo();
		}
	}
}
 
