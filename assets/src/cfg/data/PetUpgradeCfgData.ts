
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetUpgradeCfgData extends PetUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}

		static upgradeAllList: Array<Array<AddItemInfo>>;
		public static setup(dataArr: Array<PetUpgradeCfgInfo>): void
		{
			super.setup(dataArr);

			this.upgradeAllList = [];
			for (let i = 1; i < this._dataArr.length; i++)
			{
				let tmpItemAry = this.getNeedItemAryById(this._dataArr[i].level);
				let tmpLvAry = new Array<AddItemInfo>();
				if (i > 1)
				{
					let tmpOldAry = this.upgradeAllList[i - 2];
					for (let j = 0; j < tmpItemAry.length; j++)
					{
						let tmpInfo = new AddItemInfo();
						tmpInfo.itemid = tmpOldAry[j].itemid;
						tmpInfo.itemcount = tmpOldAry[j].itemcount + tmpItemAry[j].itemcount;
						tmpLvAry.push(tmpInfo);
					}
				}
				else
				{
					tmpLvAry = tmpLvAry.concat(tmpItemAry);
				}
				this.upgradeAllList.push(tmpLvAry);
			}
		}

		public static getNeedItemAryByLv(lv: number): Array<AddItemInfo>
		{
			if (lv < 2)
			{
				return [];
			}
			return this.upgradeAllList[lv - 2];
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

