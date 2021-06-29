
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TeamCampaignStageCfgData extends TeamCampaignStageBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): TeamCampaignStageCfgInfo[]
		{
			return this._dataArr;
		}

		protected static _dataDicByDoubleKey: Object;
		public static getInfoByDoubleKey(difficulty: number, stage: number): TeamCampaignStageCfgInfo
		{
			let key = difficulty + "_" + stage;
			if (!this._dataDicByDoubleKey) this._dataDicByDoubleKey = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["difficulty", "stage"]);
			let list = this._dataDicByDoubleKey[key];
			if (list) return list[0];
			return null;
		}

		public static getListWithType(curType: number): TeamCampaignStageCfgInfo[]
		{
			return this._dataArr.filter(element => element.difficulty == curType);
		}

		private static _difficultyMapAddItemArr = new ds.StringMap<AddItemInfo[]>();
		public static getAddPrizeAryByDifficulty(difficulty: number): Array<AddItemInfo>
		{
			if (this._difficultyMapAddItemArr.containsKey(difficulty))
				return this._difficultyMapAddItemArr.get(difficulty);
			let cfgArr = this.getListWithType(difficulty);
			let addItemMap = {};
			//把ID相同的数量叠加起来
			for (let cfgInfo of cfgArr)
			{
				let addItemArr = AddItemInfo.parse(cfgInfo.addItem);
				for (let addItem of addItemArr)
				{
					if (addItemMap[addItem.itemid]) addItemMap[addItem.itemid].itemcount += addItem.itemcount;
					else addItemMap[addItem.itemid] = addItem;
				}
			}
			let ret = new Array<AddItemInfo>();
			for (var key in addItemMap)
			{
				var addItem = addItemMap[key];
				ret.push(addItem);
			}
			this._difficultyMapAddItemArr.put(difficulty, ret);
			return ret;
		}

		public static getAddPrizeAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addPrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addItem);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getFixPosAryById(value: number): Array<ValueOneInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "fixedPositionAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueOneInfo.parse(info.fixedPosition);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getConditionAryById(value: number): Array<SkillValueTypeIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "conditionAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueTypeIntInfo.parse(info.condition);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

