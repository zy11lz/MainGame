
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ConvenantAttrCfgData extends ConvenantAttrBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _dataDicByDoubleIndex: Object;
		//双索引，根据部位id和等级取得配置
		public static getInfoByDoubleKey(posId: number, level: number): ConvenantAttrCfgInfo
		{
			let key = posId + "_" + level;
			if (!this._dataDicByDoubleIndex) this._dataDicByDoubleIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["iD", "level"]);
			let list = this._dataDicByDoubleIndex[key];
			if (list) return list[0];
			return null;
		}

		/** 获取属性列表 */
		public static getAttrInfoArrByDoubleKey(posId: number, level: number): AddAtterInfo[]
		{
			//这里有一个坑， 本该是一个一维列表的，但还需要再用逗号分隔一下， 需要把二维的数据扁平化成一维数组。数组序列对应位置，一个位置只有一个属性。
			let info = this.getInfoByDoubleKey(posId, level);
			if (!info) return [];
			let key = "$attrInfoArr";
			let ret = info[key];
			if (ret) return ret;
			info[key] = ret = [];
			for (let strAttr of info.attr.split(","))
			{
				let attr = AddAtterInfo.parse(strAttr)[0];  //只会有一个，拿到第一个即可
				if (attr) ret.push(attr);
			}
			return ret;
		}

	}
}

