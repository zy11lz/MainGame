
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityLoginCfgData extends ActivityLoginBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 一个活动ID对应一个列表 */
		protected static _dataArrByActivityId: Object;
		public static getDataArrayByActivityId(value: number): ActivityLoginCfgInfo[]
		{
			if (this._dataArrByActivityId == null)
			{
				this._dataArrByActivityId = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "activityID");
			}
			return this._dataArrByActivityId[value];
		}

		/**
		 * 根据活动id和列表index获取奖励
		 * @param index 
		 */
		public static getAddItemAryByID(id: number): Array<AddItemInfo>
		{
			let cfg_info = this.getInfo(id);
			if (!cfg_info) return null;
			//存储奖励
			let saveKey = "addItemAry";
			if (cfg_info[saveKey] == null)
			{
				cfg_info[saveKey] = AddItemInfo.parse(cfg_info.addItem);
			}
			return cfg_info[saveKey];
		}
		/**
	  * 获取购买所需道具id
	  */
		public static getNeedItemID(index: number): number
		{
			let info = this.getInfo(index);
			if (info && info.needItem)
			{
				let save_key = "costItemID";
				if (info[save_key] == null)
				{
					info[save_key] = info.needItem.split("_")[0];
				}
				return info[save_key];
			}
			return undefined;
		}

		/**
		 * 获取道具消耗数量
		 * @param index 
		 */
		public static getNeedItemCount(index: number): number
		{
			let info = this.getInfo(index);
			if (info && info.needItem)
			{
				let save_key = "costItemCount";
				if (info[save_key] == null)
				{
					info[save_key] = info.needItem.split("_")[1];
				}
				return info[save_key];
			}
			return undefined;
		}

	}
}

