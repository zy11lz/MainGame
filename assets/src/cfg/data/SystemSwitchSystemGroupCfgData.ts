
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SystemSwitchSystemGroupCfgData extends SystemSwitchSystemGroupBaseCfgData
	{
		constructor()
		{
			super();
		}


		/** 同一个功能，可能会有多个开启条件， 此处将同一功能的多个ID关联在一起， 方便通过其中一个ID，查询到另外一个ID的开启情况 */
		private static _combineIdsMap: ds.StringMap<number[]>;
		private static initCombineIdsMap(): void
		{
			this._combineIdsMap = new ds.StringMap<number[]>();
			for (var el of this._dataArr)
			{
				let ids = el.groups.split(",");
				this.__initCombineIdsMap(ids)
			}
		}
		private static __initCombineIdsMap(ids: string[]): void
		{
			let idNums = [];
			for (var idStr of ids)
			{
				idNums.push(parseInt(idStr));
			}
			for (var idStr of ids)
			{
				this._combineIdsMap.put(idStr, idNums);
			}
		}

		//根据一个id，查找相同功能的id列表
		public static getCombineIds(id: number): number[]
		{
			if (!this._combineIdsMap) this.initCombineIdsMap();
			let ret = this._combineIdsMap.get(id);
			if (ret) return ret;
			return [id];
		}

	}
}

