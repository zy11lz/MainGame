
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionCopymapBuycountCfgData extends FactionCopymapBuycountBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 总共能购买的次数 */
		public static getTotalBuyCount(): number
		{
			return this._dataArr.length;
		}

		/** 根据次数获取需要道具 */
		public static getNeedItemInfoByCount(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (!info) return null;
			let saveKey = "needItemInfo";
			if (info[saveKey] == null)
			{
				info[saveKey] = AddItemInfo.parse(info.needItem)[0];
			}
			return info[saveKey];
		}
	}
}

