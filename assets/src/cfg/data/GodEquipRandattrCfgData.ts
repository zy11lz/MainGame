
/**
* 
*  配置数据访问
*/
module cfg
{
	export class GodEquipRandattrCfgData extends GodEquipRandattrBaseCfgData
	{
		static partTipsAry: Array<string> = [];
		constructor()
		{
			super();
		}

		public static getInfoByAtterID(star: number, part: number, atterID: number, value: number): GodEquipRandattrCfgInfo
		{
			let results = this._dataArr.filter(elment => elment.part == part && elment.star == star && elment.attrType == atterID && ((elment.attrValue.length > 0 && value > 0) || (elment.attrValue.length == 0 && value == 0)));
			return results.length > 0 ? results[0] : null;
		}

		public static getTipStrWithPart(star: number, partType: number): string
		{
			let savekey = star + "_" + partType;
			let tmpShowStr = this.partTipsAry[savekey];
			if (tmpShowStr != null)
			{
				return tmpShowStr;
			}

			tmpShowStr = "";
			let tmpInfoAry = this._dataArr.filter(elment => elment.part == partType && elment.star == star);
			for (let i = 0; i < tmpInfoAry.length; i++)
			{
				let elment = tmpInfoAry[i];
				if (elment.attrValue.length > 0)
				{
					tmpShowStr += cfg.BattleCfgData.getDescByAttrType(elment.attrType) + ":";
					let tmpValueInfo = this.getAttrValueInfoByIndex(elment.index);
					//除了前4个，其它也是百分比显示
					if (elment.attrType <= Pb_God._emBattleAttribute.BattleAttribute_Speed)
					{
						tmpShowStr += " " + Math.floor(tmpValueInfo.value1 / 100) + "-" + Math.floor(tmpValueInfo.value2 / 100);
					} else
					{
						tmpShowStr += " " + Global.parsePercentNum(tmpValueInfo.value1 / 1000000, 1) + "-" + Global.parsePercentNum(tmpValueInfo.value2 / 1000000, 1);
					}
				}
				else
				{
					tmpShowStr += cfg.BattleCfgData.getDescByAttrType(elment.attrType);
					if (elment.attrType <= 4) tmpShowStr += Global.getLangStr("common_percent"); //比";
					tmpShowStr += ":";
					let tmpRateInfo = this.getAttrRateInfoByIndex(elment.index);
					tmpShowStr += " " + Global.parsePercentNum(tmpRateInfo.value1 / 10000, 1) + "-" + Global.parsePercentNum(tmpRateInfo.value2 / 10000, 1);
				}
				if (i < tmpInfoAry.length - 1)
				{
					tmpShowStr += "\n";
				}
			}

			this.partTipsAry[savekey] = tmpShowStr;

			return tmpShowStr;
		}

		public static getAttrValueInfoByIndex(value: number): ValueTwoInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "attrValueInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.attrValue)[0];
				}
				return info[saveKey];
			}
			return null;
		}

		public static getAttrRateInfoByIndex(value: number): ValueTwoInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "attrRateInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.attrRate)[0];
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

