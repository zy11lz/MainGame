
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ConvenantLevelCfgData extends ConvenantLevelBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 获取升到下一级所需要的道具列表 */
		public static getNeedItemsByLevel(level: number): AddItemInfo[]
		{
			let info = this.getInfo(level);
			if (!info) return [];
			return cfg.AddItemInfo.getAddItemAttr(info, info.needItem, "$needItemInfoArr");
		}
	}
}

