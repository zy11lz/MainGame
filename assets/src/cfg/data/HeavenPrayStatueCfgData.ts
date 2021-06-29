
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HeavenPrayStatueCfgData extends HeavenPrayStatueBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllInfo(): HeavenPrayStatueCfgInfo[]
		{
			return this._dataArr;
		}

		/**
		 * 根据章节id取到神像数据
		 * @param c_id 
		 */
		public static getStatueInfoByChpaterId(c_id: number): HeavenPrayStatueCfgInfo
		{
			let ret: HeavenPrayStatueCfgInfo = null;
			for (var info of this._dataArr)
			{
				if (info.needChapter > c_id) return ret;
				else ret = info;
			}
			return ret;
		}

		/**
		 * 单次祈祷消耗钻石
		 * @param info HeavenPrayStatueCfgInfo
		 */
		public static getCostItemInfo_One(info: HeavenPrayStatueCfgInfo): AddItemInfo
		{
			if (!info) return null;
			return AddItemInfo.getAddItemAttr(info, info.needItem, "$needItemInfo")[0];
		}

		/**
		 * 10次祈祷消耗钻石
		 * @param info HeavenPrayStatueCfgInfo
		 */
		public static getCostItemInfo_Ten(info: HeavenPrayStatueCfgInfo): AddItemInfo
		{
			if (!info) return null;
			return AddItemInfo.getAddItemAttr(info, info.tenNeedItem, "$tenNeedItemInfo")[0];
		}

		/**
		  * 特殊消耗道具
		 * @param info HeavenPrayStatueCfgInfo
		  */
		public static getSpecialCostItemInfo(info: HeavenPrayStatueCfgInfo): AddItemInfo
		{
			if (!info) return null;
			return AddItemInfo.getAddItemAttr(info, info.needSpecialItem, "$needSpecialItemInfo")[0];
		}
	}
}

