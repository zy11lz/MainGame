
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ShapeProvinceCfgData extends ShapeProvinceBaseCfgData
	{
		constructor()
		{
			super();
		}


		protected static _cityListByProvinceID: Object;
		/** 根据省份id取得对应的城市列表 */
		public static getCityListByProvince(value: number): Array<ShapeProvinceCfgInfo>
		{
			if (this._cityListByProvinceID == null)
			{
				this._cityListByProvinceID = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "provinceID");
			}
			return this._cityListByProvinceID[value];
		}

		protected static _dataDicByDoubleIndex: Object;
		//双索引，根据省份和城市id取得配置
		public static getCfgInfoByDoubleIndex(provinceID: number, cityId: number): ShapeProvinceCfgInfo
		{
			let key = provinceID + "_" + cityId;
			if (!this._dataDicByDoubleIndex) this._dataDicByDoubleIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["provinceID", "cityID"]);
			let list = this._dataDicByDoubleIndex[key];
			if (list) return list[0];
			return null;
		}

		/** 所有省份列表 */
		protected static _provinceList: ShapeProvinceCfgInfo[];
		public static getProvinceList(): ShapeProvinceCfgInfo[]
		{
			if (!this._provinceList)
			{
				this._provinceList = [];
				if (this._cityListByProvinceID == null)
				{
					this._cityListByProvinceID = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "provinceID");
				}
				for (var key in this._cityListByProvinceID)
				{
					let info: ShapeProvinceCfgInfo = this._cityListByProvinceID[key][0];
					this._provinceList[info.provinceID] = info;
				}
			}
			return this._provinceList;
		}
	}
}

