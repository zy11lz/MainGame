
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveMainAchieveCfgData extends AchieveMainAchieveBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _bigTypeMapGroupFirstId: Object;
		/** 分组起始ID */
		public static getGroupFirstIdListByBigType(bigType: Pb_God._emAchieveBigType): number[]
		{
			if (!this._bigTypeMapGroupFirstId)
			{
				this._bigTypeMapGroupFirstId = {};
				for (let el of this._dataArr)
				{
					let ids: number[] = this._bigTypeMapGroupFirstId[el.achieveBigType];
					if (ids == null) this._bigTypeMapGroupFirstId[el.achieveBigType] = ids = [];
					if (ids.indexOf(el.groupFirstId) < 0) ids.push(el.groupFirstId);
				}
			}
			return this._bigTypeMapGroupFirstId[bigType];
		}

		protected static _bigTypeMapList: Object;
		public static getListByBigType(bigType: Pb_God._emAchieveBigType): AchieveMainAchieveCfgInfo[]
		{
			if (!this._bigTypeMapList) this._bigTypeMapList = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["achieveBigType"]);
			return this._bigTypeMapList[bigType];
		}

		public static getDataList(): AchieveMainAchieveCfgInfo[]
		{
			return this._dataArr;
		}

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
	}
}

