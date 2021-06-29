
/**
*
*  配置数据访问
*/
module cfg
{
	export class PetFormationCfgData extends PetFormationBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): PetFormationCfgInfo[]
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
					info[saveKey] = ValueOneInfo.parse(info.pos);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

