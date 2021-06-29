
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DragonBallLevelCfgData extends DragonBallLevelBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _dataDicByDoubleIndex: Object;
		//双索引，根据类型和等级取得配置
		public static getInfoByDoubleKey(type: number, level: number): DragonBallLevelCfgInfo
		{
			let key = type + "_" + level;
			if (!this._dataDicByDoubleIndex) this._dataDicByDoubleIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["type", "level"]);
			let list = this._dataDicByDoubleIndex[key];
			if (list) return list[0];
			return null;
		}

		/** 获取属性加成列表 */
		public static getAddAttrArrByInfo(type: number, level: number): AddAtterInfo[]
		{
			let info = this.getInfoByDoubleKey(type, level);
			if (!info) return null;
			let key = "addAttrInfoArr";
			let ret = info[key];
			if (ret) return ret;
			info[key] = ret = AddAtterInfo.parse(info.attr);
			return ret;
		}

		/** 获取所需要的道具 */
		public static getNeedItemInfoByInfo(type: number, level: number): AddItemInfo
		{
			let info = this.getInfoByDoubleKey(type, level);
			if (!info) return null;
			return AddItemInfo.getAddItemAttr(info, info.needItem, "needItemInfoArr")[0];
		}
	}
}

