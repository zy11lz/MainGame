
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityWarOrderLevelCfgData extends cfg.ActivityWarOrderLevelBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.ActivityWarOrderLevelCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getAllList(actId)
		{
			return this._dataArr.filter(element => element.activityID == actId);
		}

		public static getLastInfo(actId)
		{
			let data = this.getAllList(actId)
			return data[data.length - 1];
		}

		/**
		 * 获取奖励道具列表
		 * @param value 
		 */
		public static getAddItemAryById(info: cfg.ActivityWarOrderLevelCfgInfo): Array<AddItemInfo>
		{
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
		 * 获取奖励道具列表
		 * @param value 
		 */
		public static getSpecialAddItemAryById(info: cfg.ActivityWarOrderLevelCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "addSpecialItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addSpecialItem);
				}
				return info[saveKey];
			}
			return null;
		}

		/**
		 * 奖励道具合并
		 * @param value 
		 */
		public static rewardMerge(info: cfg.ActivityWarOrderLevelCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "addSpecialItemAryRewardMerge";
				if (info[saveKey] == null)
				{
					let reward = info.addItem + ";" + info.addSpecialItem;
					info[saveKey] = AddItemInfo.parse(reward);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getAllAddItems(id: number)
		{
			let arr: AddItemInfo[] = [];
			let isInit;
			let data = this.getAllList(id)
			for (let i = 0; i < data.length; i++)
			{
				let addItem = this.rewardMerge(data[i]);

				for (let j = 0; j < addItem.length; j++)
				{
					// arr.filter(element => element.itemid == addItem[j].itemid);
					isInit = false;
					arr.forEach(element =>
					{
						if (element.itemid == addItem[j].itemid)
						{
							isInit = true;
							element.itemcount += addItem[j].itemcount;
						}
					})

					if (!isInit)
					{
						let addItemInfo = new AddItemInfo();
						addItemInfo.itemid = addItem[j].itemid;
						addItemInfo.itemcount = addItem[j].itemcount;
						arr.push(addItemInfo);
					}

				}
			}
			return arr;
		}
	}
}

