
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookChapterUnlockCfgData extends HookChapterUnlockBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): HookChapterUnlockBaseCfgData[]
		{
			return this._dataArr;
		}

		/**
		 * 取得该区域场景列表
		 * @param id 
		 */
		public static getSceneArrById(id: number): number[]
		{
			let info = this.getInfo(id);
			if (!info) return [];

			let save_key = "sceneListArr";
			if (!info[save_key])
			{
				info[save_key] = [];
				let s_arr = info.sceneList.split(";");
				for (let v of s_arr)
					info[save_key].push(parseInt(v));
			}

			return info[save_key];
		}
	}
}

