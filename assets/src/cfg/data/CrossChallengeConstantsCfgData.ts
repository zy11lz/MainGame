
/**
* 
*  配置数据访问
*/
module cfg
{
	export class CrossChallengeConstantsCfgData extends CrossChallengeConstantsBaseCfgData
	{
		constructor()
		{
			super();
		}


		public static getCanHideCountByRank(rank: number)
		{
			if (rank == 0)
				return 1;
			let RankHides = this.getFirstInfo().rankHide.split(";");

			for (let i = 0; i < RankHides.length; i++)
			{
				let needRank = RankHides[i].split("_");
				if (rank <= parseInt(needRank[0]))
				{
					return parseInt(needRank[1]);
				}
			}
			//没进入名次就默认1个
			return 1;
		}

	}
}

