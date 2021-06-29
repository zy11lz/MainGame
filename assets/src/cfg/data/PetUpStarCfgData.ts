
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetUpStarCfgData extends PetUpStarBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): PetUpStarCfgInfo[]
		{
			return this._dataArr;
		}
				
		public static setup(dataArr:Array<any>):void
		{
			super.setup(dataArr);
		}

		public static getInfoWithFun(petID: number, star: number): PetUpStarCfgInfo
		{
			let resultAry = this._dataArr.filter(elment => elment.petID == petID && elment.star == star);
			return resultAry.length > 0 ? resultAry[0] : null;
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

		/**
		 * 伙伴ID==伙伴星级==个数
		 */
		public static getNeedStarCountAryById(value: number): Array<ValueThreeInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "NeedStarCountAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueThreeInfo.parse(info.needStarCount);
				}
				return info[saveKey];
			}
			return null;
		}

		/**
		 * 星级==个数
		 */
		public static getNeedStarPetAryById(value: number): Array<ValueTwoInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "NeedStarPetAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.needStarPet);
				}
				return info[saveKey];
			}
			return null;
		}

		/**
		 * 任意星级==个数
		 */
		public static getNeedAnyStarPetAryById(value: number): Array<ValueTwoInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needAnyStarPetAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.needAnyStarPet);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

