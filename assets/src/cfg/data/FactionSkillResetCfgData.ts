
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionSkillResetCfgData extends FactionSkillResetBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 根据当前等级，获取对应的区间配置 */
		public static getCfgInfoByLevel(level: number, isFirst: boolean): FactionSkillResetCfgInfo
		{
			let cfgData = this.getFirstInfo();
			if (isFirst) return cfgData;  //第一次重置技能时，配置单独处理
			for (cfgData of this._dataArr)
			{
				if (level <= cfgData.level)
					return cfgData;
			}
			return cfgData;
		}

	}
}

