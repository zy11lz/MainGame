
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ArtifactUpgradeCfgData extends ArtifactUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 取得法阵最大等级 */
		public static getMaxLevelByID(id: number): number
		{
			return this._dataArr[this._dataArr.length - 1].level;
		}

		/** 获取单次消耗的刻印石 */
		public static getNeedStoneCountAryByLevel(level: number): AddItemInfo
		{
			let info = this.getInfo(level);
			if (info)
			{
				let saveKey = "needStoneCountInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needStoneCount)[0];
				}
				return info[saveKey];
			}
			return null;
		}

		public static getNeedItemAryByIdLevel(level: number): Array<AddItemInfo>
		{
			let info = this.getInfo(level);
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

		public static getAddAttrAryByIdLevel(level: number): Array<AddAtterInfo>
		{
			let info = this.getInfo(level);
			if (info)
			{
				let saveKey = "addAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addAttr);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 每一点经验增加的属性值，拿到返回数据后，还需要再乘上当前经验值作为倍数 */
		public static getExpAddAttrAryByIdLevel(level: number): Array<AddAtterInfo>
		{
			let info = this.getInfo(level);
			if (info)
			{
				let saveKey = "expAddAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.expAddAttr, true);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

