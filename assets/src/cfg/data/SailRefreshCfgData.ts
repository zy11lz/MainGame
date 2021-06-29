
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SailRefreshCfgData extends SailRefreshBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataAll(): Array<SailRefreshCfgInfo>
		{
			return this._dataArr;
		}

		public static getInfoWithFun(refreshTime: number): cfg.SailRefreshCfgInfo
		{
			let tmpOldRefreshTime = 0;
			let tempCfgAry = this.getDataAll();
			for (let i = 0; i < tempCfgAry.length; i++)
			{
				if (refreshTime > tmpOldRefreshTime && refreshTime <= tempCfgAry[i].refreshCount)
				{
					return tempCfgAry[i];
				}
				refreshTime = tempCfgAry[i].refreshCount;
			}

			return tempCfgAry[tempCfgAry.length - 1];
		}

		public static getNeedItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

