
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ItemGiftPackCfgData extends ItemGiftPackBaseCfgData
	{
		constructor()
		{
			super();
		}

		/**
		 * key:礼包对应道具id value:所有该道具可用的礼包
		 */
		private static itemDataDic: { [key: number]: Array<ItemGiftPackCfgInfo> } = {};

		public static setup(dataArr: Array<ItemGiftPackCfgInfo>): void
		{
			super.setup(dataArr);

			for (let i in this._dataArr)
			{
				let d = this._dataArr[i];
				if (!this.itemDataDic[d.itemID])
					this.itemDataDic[d.itemID] = [];
				this.itemDataDic[d.itemID].push(d);
			}
		}

		/**
		 * 根据道具id获取所有礼包
		 * @param value 
		 */
		public static getGiftInfoArrayByItemID(value: number): Array<ItemGiftPackCfgInfo>
		{
			if (this.itemDataDic[value])
				return this.itemDataDic[value];
			return [];
		}

		/**
		 * 获取奖励列表
		 * @param info 
		 */
		public static getAddItemAryByInfo(info: ItemGiftPackCfgInfo): Array<AddItemInfo>
		{
			if (!info) return null;
			let saveKey = "addItemAry";
			if (info[saveKey] == null)
			{
				info[saveKey] = AddItemInfo.parse(info.itemGroup);
			}
			return info[saveKey];
		}

		/**
		 * 是否精灵礼包  17200 - 17300 精灵自选礼包
		 * @param value 
		 */
		public static isHeroGift(giftId: number): boolean
		{	
			if(giftId >= 17200 && giftId <= 17300) return true;
			return false;
		}

		protected static _bookMarkListByType: Object;
		/** 根据英雄类型，获取英雄图鉴列表 */
		public static getBookMarkListByType(value: number,petType: number): PetBookCfgInfo[]
		{
			if (!this._bookMarkListByType)
			{
				let map = this._bookMarkListByType = {};
				for (var el of this._dataArr)
				{
					// if (!el.bookMark) continue;
					// let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(el.petID);
					// let arr: PetBookCfgInfo[] = map[tmpPetType];
					// if (!arr) map[tmpPetType] = arr = [];
					// arr.push(el);
				}
			}
			return this._bookMarkListByType[petType] || [];
		}
	}
}

