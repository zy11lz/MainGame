
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCfgData extends PetBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): PetCfgInfo[]
		{
			return this._dataArr;
		}

		public static setup(dataArr: Array<any>): void
		{
			super.setup(dataArr);
		}


		/**  该接口只能获取BaseSkin！ 需要获取进化后的新皮肤请使用 cfg.PetSkinCfgData.getInfo传入皮肤ID*/
		public static getSkinInfoByPetID(value: number): cfg.PetSkinCfgInfo
		{
			//已经改为skin表了 所以这里要获取对应的skinID
			let skinID = this.getBaseSkinByPetID(value);
			let skinInfo = cfg.PetSkinCfgData.getInfo(skinID)
			if (skinInfo == null)
			{
				return cfg.PetSkinBaseCfgData.getFirstInfo();
			}
			return skinInfo;
		}

		public static getInitAttrAryById(value: number): Array<AddAtterInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "initAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.initAttr);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getInfoWithFun(petType?: number, petJobType?: number): PetCfgInfo[]
		{
			if (petJobType != null && petType == null)
			{
				return this._dataArr.filter(elment => elment.petJobType == petJobType);
			}
			else if (petJobType == null && petType != null)
			{
				return this._dataArr.filter(elment => elment.petType == petType);
			}
			return this._dataArr.filter(elment => elment.petJobType == petJobType && elment.petType == petType);
		}
	}
}

