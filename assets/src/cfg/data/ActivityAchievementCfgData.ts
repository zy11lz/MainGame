
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityAchievementCfgData extends ActivityAchievementBaseCfgData
	{
		constructor()
		{
			super();
		}

		// 成就列表 key: 活动id_天数_分组
		private static _dataAchieveDic: { [key: string]: ActivityAchievementCfgInfo[] } = {};

		/** 一个活动ID对应一个列表 */
		protected static _dataArrByActivityId: Object;
		public static getDataArrayByActivityId(value: number): ActivityAchievementCfgInfo[]
		{
			if (this._dataArrByActivityId == null)
			{
				this._dataArrByActivityId = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "activityID");
			}
			return this._dataArrByActivityId[value];
		}

		/**
		 * 获取成就列表
		 * @param act_id 活动id
		 * @param day 对应活动天数
		 * @param group 对应天数内的分组
		 */
		public static getAchieveList(act_id: number, day: number, group: number): ActivityAchievementCfgInfo[]
		{
			let dataArr = this.getDataArrayByActivityId(act_id);
			if (!dataArr) return undefined;
			let save_key = act_id + "_" + day + "_" + group;
			if (!this._dataAchieveDic[save_key])
			{
				this._dataAchieveDic[save_key] = [];
				for (let i in dataArr)
				{
					let i_cfg = dataArr[i];
					if (i_cfg.day == day && i_cfg.group == group)
						this._dataAchieveDic[save_key].push(i_cfg);
				}
			}

			return this._dataAchieveDic[save_key];
		}

		/**
		 * 获取奖励道具列表
		 * @param value 
		 */
		public static getAddItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addItem);
				}
				return info[saveKey];
			}
			return null;
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


		/**
		 * 获取开启的成就列表数组
		 * @param info 
		 */
		/*public static getAchievementTabItemArrayByInfo(info:cfg.ActivityAchievementCfgInfo):number[][]
		{
			return [];
		}*/
	}
}

