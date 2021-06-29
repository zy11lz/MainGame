
/**
* 
*  配置数据访问
*/
module cfg
{
	export class WealSigninCfgData extends WealSigninBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _dataDicByDoubleIndex: Object;
		//双索引
		public static getInfoByDoubleKey(month: number, day: number): WealSigninCfgInfo
		{
			let key = month + "_" + day;
			if (!this._dataDicByDoubleIndex) this._dataDicByDoubleIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["month", "day"]);
			let list = this._dataDicByDoubleIndex[key];
			if (list) return list[0];
			return this.getInfoByDoubleKey(0, day);  //找不到的话，就找通用月份的
		}

		/** 根据具体日期取得签到奖励数据 */
		public static getAddItemInfoByMonthDay(month: number, day: number): AddItemInfo
		{
			let cfgInfo = this.getInfoByDoubleKey(month, day);
			if (cfgInfo)
			{
				let saveKey = "addItemInfo";
				if (cfgInfo[saveKey] == null)
				{
					cfgInfo[saveKey] = AddItemInfo.parse(cfgInfo.addItem)[0];
				}
				return cfgInfo[saveKey];
			}
			return null;
		}
	}
}

