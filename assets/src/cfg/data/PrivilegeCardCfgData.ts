
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrivilegeCardCfgData extends PrivilegeCardBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getPrivilegeMapByCardId(cardId: number): ds.StringMap<number>
		{
			let cfgInfo = this.getInfo(cardId);
			let allKey = "_allPrivilegeMap";
			let ret = cfgInfo[allKey];
			if (ret) return ret;

			cfgInfo[allKey] = ret = new ds.StringMap<number>();
			let addPrivileges = cfgInfo.addPrivilege.split(";");
			for (let el of addPrivileges)
			{
				if (!el) continue;
				let arr = el.split("_");
				ret.put(parseInt(arr[0]), parseInt(arr[1]) || 1);
			}
			return ret;
		}

	}
}

