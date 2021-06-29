
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ShapeTitleCfgData extends ShapeTitleBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): ShapeTitleCfgInfo[]
		{
			return this._dataArr;
		}

		/** 获取属性加成数据 */
		public static getAddAttrListInfoByCfgInfo(info: ShapeTitleCfgInfo): AddAtterInfo[]
		{
			if (info)
			{
				let saveKey = "addAttrInfoList";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addAttr);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

