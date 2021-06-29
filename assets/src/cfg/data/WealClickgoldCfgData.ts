
/**
* 
*  配置数据访问
*/
module cfg
{
	export class WealClickgoldCfgData extends WealClickgoldBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): WealClickgoldCfgInfo[]
		{
			return this._dataArr;
		}

		/** 获取需要的钻石数 null表示免费 */
		public static getNeedItemInfoByType(type: number): AddItemInfo
		{
			let cfgInfo = this.getInfo(type);
			if (cfgInfo)
			{
				let saveKey = "needItemInfo";
				if (cfgInfo[saveKey] == null)
				{
					cfgInfo[saveKey] = AddItemInfo.parse(cfgInfo.needItem)[0];
				}
				return cfgInfo[saveKey];
			}
			return null;
		}

	}
}

