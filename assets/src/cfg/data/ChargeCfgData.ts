
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ChargeCfgData extends ChargeBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _listByType: Object;
		/**
		 * 获取指定类型的列表
		 * @param type 充值类型
		 * @param sonType 匹配子类型，如果传入-1， 则忽略数据表中此字段的匹配。
		 */
		public static getListByType(type: Pb_God._emChargeType, sonType: number = -1): cfg.ChargeCfgInfo[]
		{
			if (!this._listByType)
			{
				this._listByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "chargeType");
			}
			let ret: cfg.ChargeCfgInfo[] = [];
			let allList = this._listByType[type];
			if (!allList) return ret;
			for (var el of allList)
			{
				if (sonType != -1 && sonType != el.sonType) continue;
				ret.push(el);
			}
			return ret;
		}

		public static getOpenTimeInfoByInfo(info: ChargeCfgInfo): cfg.StDateTimeInfo
		{
			if (info && info.openTime)
			{
				let saveKey = "openTimeInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = StDateTimeInfo.parse(info.openTime);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getAddItemAryByID(id: number): Array<AddItemInfo>
		{
			let cfg_info = this.getInfo(id);
			if (!cfg_info) return null;
			return AddItemInfo.getAddItemAttr(cfg_info, cfg_info.addItem, "addItemAry");
		}
		public static getFirstAddItemAryByID(id: number): Array<AddItemInfo>
		{
			let cfg_info = this.getInfo(id);
			if (!cfg_info) return null;
			return AddItemInfo.getAddItemAttr(cfg_info, cfg_info.firstAddItem, "firstAddItemAry");
		}
		public static getExtraAddItemAryByID(id: number): Array<AddItemInfo>
		{
			let cfg_info = this.getInfo(id);
			if (!cfg_info) return null;
			return AddItemInfo.getAddItemAttr(cfg_info, cfg_info.extraAddItem, "extraAddItemAry");
		}

	}
}

