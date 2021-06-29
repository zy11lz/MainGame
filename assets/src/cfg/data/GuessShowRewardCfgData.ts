
/**
* 
*  配置数据访问
*/
module cfg
{
	export class GuessShowRewardCfgData extends cfg.GuessShowRewardBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.GuessShowRewardCfgInfo>):void
		{
			super.setup(dataArr);
		}
		/**
		 * 根据活动id和列表index获取奖励
		 * @param index 
		 */
		public static getRewardsAryByID(id: number): Array<AddItemInfo>
		{
			let cfg_info = this.getInfo(id);
			if (!cfg_info) return null;
			//存储奖励
			let saveKey = "addItemAry";
			if (cfg_info[saveKey] == null)
			{
				cfg_info[saveKey] = AddItemInfo.parse(cfg_info.rewards);
			}
			return cfg_info[saveKey];
		}
	}
}
 
