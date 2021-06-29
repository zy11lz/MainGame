
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ShapeHonorUpgradeCfgData extends ShapeHonorUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 根据当前经验值取得对应的等级配置 */
		public static getInfoByExp(value: number): ShapeHonorUpgradeCfgInfo
		{
			let el: ShapeHonorUpgradeCfgInfo = null;
			for (el of this._dataArr)
			{
				if (el.maxExp > value) return el;
			}
			return el;
		}
	}
}

