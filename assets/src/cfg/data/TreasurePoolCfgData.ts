
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TreasurePoolCfgData extends TreasurePoolBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 根据等级与类型取得对应的groupId */
		public static getGroupIdByTypeAndLevel(type: number, level: number): number
		{
			let ret = 0;
			for (var el of this._dataArr)
			{
				if (el.type != type) continue;
				if (el.level > level) return ret;
				ret = el.group;
			}
			return ret;
		}

	}
}

