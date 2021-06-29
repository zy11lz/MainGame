
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCallCallCostCfgData extends PetCallCallCostBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getListByTypeAndCount(type: number, count: number): cfg.PetCallCallCostCfgInfo[]
		{
			return this._dataArr.filter(el => el.type == type && el.count == count);
		}

		private static _needItemAryMapDoubleKey = {};
		/** 根据类型取得对应的召唤卡列表，注意这个列表是采用“或”的方式消耗 */
		public static getNeedItemAryByTypeAndCount(type: number, count: number): AddItemInfo[]
		{
			let key = type + "_" + count;
			let ret = this._needItemAryMapDoubleKey[key];
			if (ret) return ret;
			this._needItemAryMapDoubleKey[key] = ret = []
			let infos = this._dataArr.filter(el => el.type == type && el.count == count);
			for (let info of infos)
			{
				let needItem = this.getNeedItemAryByInfo(info);
				ret.push(needItem);
			}
			return ret;
		}

		public static getNeedItemAryByInfo(info: cfg.PetCallCallCostCfgInfo): AddItemInfo
		{
			if (!info) return null;
			return cfg.AddItemInfo.getAddItemAttr(info, info.needItem, "needItemInfoAry")[0];
		}

	}
}

