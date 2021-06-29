
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DefendLevelCfgData extends cfg.DefendLevelBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.DefendLevelCfgInfo>):void
		{
			super.setup(dataArr);
		}


		/** 获取精灵球加Attr */
		public static getAddBaseAttrAryByIndex(level: number): Array<AddAtterInfo>
		{
			let info = this.getInfo(level);
			if (info)
			{
				let saveKey = "baseAttrArr";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.baseAttr);
				}
				return info[saveKey];
			}
			return null;
		}
		/** 获取精灵加Attr */
		public static getAddPetAttrAryByIndex(level: number): Array<AddAtterInfo>
		{
			let info = this.getInfo(level);
			if (info)
			{
				let saveKey = "addPetAttrArr";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addPetAttr);
				}
				return info[saveKey];
			}
			return [];
		}

		/** 获取精灵升级消耗 */
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
			return [];
		}



	}
}
 
