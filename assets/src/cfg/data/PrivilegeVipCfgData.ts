
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrivilegeVipCfgData extends PrivilegeVipBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 获取当前VIP等级展示的特权列表（只显示当前等级有变化的特权） 
		 * @return 二级数组， 一级内容为[特权ID，特权数值，当前是否为新增特权]
		*/
		public static getShowPrivilegeList(vipLv: number): number[][]
		{
			let info = this.getInfo(vipLv);
			let key = "_ShowPrivilegeList";
			let ret = info[key];
			if (ret) return ret;
			let allList = this.parsePrivilegeList(info);
			if (vipLv == 0)
			{ //VIP0的特权不存在新增与变化的判断，直接返回即可
				info[key] = allList;
				return allList;
			}
			info[key] = ret = [];
			//拿到前一级的map，以便于判断是否为新增特权
			let lastMap = this.getPrivilegeMapByLevel(vipLv - 1);
			for (let privilegeArr of allList)
			{
				let id = privilegeArr[0];
				//只显示有变化的
				if (lastMap.get(id) == privilegeArr[1]) continue;
				//isNew
				privilegeArr[2] = lastMap.containsKey(id) ? 0 : 1;
				ret.push(privilegeArr);
			}
			return ret;
		}

		/** 根据VIP等级获取该对等级应的所有VIP特权映射(type 2 value) */
		public static getPrivilegeMapByLevel(level: number): ds.StringMap<number>
		{
			let info = this.getInfo(level);
			let allKey = "_allPrivilegeMap"; //本级所有特权
			let ret: ds.StringMap<number> = info[allKey];
			if (ret) return ret;

			info[allKey] = ret = new ds.StringMap<number>();
			for (var i = level; i >= 0; i--)
			{
				let allList = this.parsePrivilegeList(this.getInfo(i));
				for (let privilegeArr of allList)
				{
					let id = privilegeArr[0];
					if (!ret.containsKey(id)) ret.put(id, privilegeArr[1]);
				}
			}
			return ret;
		}

		/** 解析当前等级所有的特权列表 */
		private static parsePrivilegeList(cfgInfo: PrivilegeVipCfgInfo): number[][]
		{
			let ret = cfgInfo["_PrivilegeList"];
			if (ret) return ret;
			let addPrivileges = cfgInfo.addPrivilege.split(";");
			ret = cfgInfo["_PrivilegeList"] = [];
			for (let el of addPrivileges)
			{
				if (!el) continue;
				let arr = el.split("_");
				ret.push([parseInt(arr[0]), parseInt(arr[1]) || 1]);
			}
			return ret;
		}




		/** 最大VIP等级 */
		public static getMaxLevel(): number
		{
			return this._dataArr[this._dataArr.length - 1].vipLevel;
		}

		/** 根据VIP经验获查找VIP等级 */
		public static getVipLevlByExp(exp: number): number
		{
			let info = this._dataArr[0];
			let lastExp = Number.MAX_VALUE;
			for (var i = this._dataArr.length - 1; i >= 0; i--)
			{
				let el = this._dataArr[i];
				if (exp < lastExp && exp >= el.needExp)
				{
					info = el;
					break;
				}
				lastExp = el.needExp;
			}
			return info.vipLevel;
		}

		/** VIP至尊月卡每日礼包 */
		public static getMonthPacketAddItemInfoByVipLevel(lv: number): AddItemInfo[]
		{
			let cfgInfo = this.getInfo(lv);
			if (cfgInfo)
			{
				let saveKey = "monthPacketAddItemInfo";
				if (cfgInfo[saveKey] == null)
				{
					cfgInfo[saveKey] = AddItemInfo.parse(cfgInfo.monthPacket);
				}
				return cfgInfo[saveKey];
			}
			return [];
		}


		/** VIP礼包道具列表 */
		public static getGiftAddItemInfoByVipLevel(lv: number): AddItemInfo[]
		{
			let cfgInfo = this.getInfo(lv);
			if (cfgInfo)
			{
				let saveKey = "giftAddItemInfo";
				if (cfgInfo[saveKey] == null)
				{
					cfgInfo[saveKey] = AddItemInfo.parse(cfgInfo.addPacket);
				}
				return cfgInfo[saveKey];
			}
			return null;
		}

		/** VIP礼包的价格 */
		public static getGiftNeedItemInfoByVipLevel(lv: number): AddItemInfo
		{
			let cfgInfo = this.getInfo(lv);
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

