
/**
* 
*  配置数据访问
*/
module cfg
{
	export class GuideCfgData extends GuideBaseCfgData
	{
		constructor()
		{
			super();
		}

		private static _hookStageMapInfo = null;
		/** 挂机关卡对应引导步骤 */
		public static getGuideStepByHookStage(value: number): GuideCfgInfo
		{
			if (!this._hookStageMapInfo)
			{
				this._hookStageMapInfo = {};
				for (let el of this._dataArr)
				{
					if (el.hookStage) this._hookStageMapInfo[el.hookStage] = el;
				}
			}
			return this._hookStageMapInfo[value];
		}
	}
}

