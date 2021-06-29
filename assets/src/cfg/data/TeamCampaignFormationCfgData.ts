
/**
*
*  配置数据访问
*/
module cfg
{
	export class TeamCampaignFormationCfgData extends TeamCampaignFormationBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): TeamCampaignFormationCfgInfo[]
		{
			return this._dataArr;
		}

		public static getPosAryById(value: number): Array<ValueOneInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "posAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueOneInfo.parse(info.position);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

