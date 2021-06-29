
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveTypeCfgData extends AchieveTypeBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _dataDicByTypeAndSubtype: Object;
		/** 根据类型和子类型获取对应的配置(子类型找不到时适配0) */
		public static getInfoByTypeAndSubtype(type: number, subType: number): AchieveTypeCfgInfo
		{
			if (!this._dataDicByTypeAndSubtype)
				this._dataDicByTypeAndSubtype = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["achieveType", "achieveSubType"]);
			let list = this._dataDicByTypeAndSubtype[type + "_" + subType];
			if (!list)
			{
				if (subType != 0) return this.getInfoByTypeAndSubtype(type, 0);
				else return null;
			}
			return list[0];
		}


	}
}

