
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityRewardPoolCfgData extends cfg.ActivityRewardPoolBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ActivityRewardPoolCfgInfo>):void
		{
			super.setup(dataArr);
		}

		/** 随机获取奖励池中某个道具ID */
		public static getRandomItemId(): number
		{
			let addItem = this.getAddItemByIndex(Math.floor(Math.random() * this._dataArr.length));
			let itemId = addItem.split('_')[0];
			return parseInt(itemId);
		}
	}
}
 
