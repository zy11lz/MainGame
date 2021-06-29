
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetSkinCfgData extends cfg.PetSkinBaseCfgData
	{
		constructor()
		{
			super();
		}


		public static getAllList(): PetSkinCfgInfo[]
		{
			return this._dataArr;
		}

		public static getHeadList(): PetSkinCfgInfo[]
		{
			let arr = [];
			for (let i = 0; i < this._dataArr.length; i++)
			{
				if (this._dataArr[i].showInPlayerHead)
					arr.push(this._dataArr[i]);
			}
			return arr;
		}

		public static getShapeList(): PetSkinCfgInfo[]
		{
			let arr = [];
			for (let i = 0; i < this._dataArr.length; i++)
			{
				if (this._dataArr[i].showInPlayerBody)
					arr.push(this._dataArr[i]);
			}
			return arr;
		}

		public static setup(dataArr: Array<any>): void
		{
			super.setup(dataArr);
		}


		/** 获取属性加成数据 */
		public static getAddAttrListByCfgInfo(info: PetSkinCfgInfo): AddAtterInfo[]
		{
			if (info)
			{
				let saveKey = "addAttrInfoList";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.riskAddAttr);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取条件列表 */
		public static getConditionListByCfgInfo(info: PetSkinCfgInfo): ValueTwoInfo[]
		{
			if (info)
			{
				let saveKey = "conditionInfoList";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.riskNeedCondition);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getAddSkillAryById(value: number): Array<ValueOneInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addSkillAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueOneInfo.parse(info.addSkill);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getRoleHeight(id: number): number
		{
			return this.getDetalHeightById(id) + this.getTrueHeightById(id);
		}

		/**
		 * 根据petID获取名称 注意：只能获取到他的初始名字 如果是进阶后的精灵 请使用getFileNameById 传入skinid
		 */
		public static getFileNameByPetID(petID: number)
		{
			let cfgInfo = cfg.PetCfgData.getInfo(petID);
			if (!cfgInfo)
				return ""
			return this.getFileNameById(cfgInfo.baseSkin);
		}

		protected static _bookMarkListByType: Object;
		/** 根据英雄类型，获取英雄图鉴列表 */
		public static getBookMarkListByType(petType: number): PetSkinCfgInfo[]
		{
			if (!this._bookMarkListByType)
			{
				let allArr = [];
				let map = this._bookMarkListByType = {};
				for (var el of this._dataArr)
				{
					if (!el.showInIllustration) continue;
					let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(el.petID);
					let arr: PetSkinCfgInfo[] = map[tmpPetType];
					if (!arr) map[tmpPetType] = arr = [];
					arr.push(el);
					allArr.push(el);
				}
				map[petType] = allArr;
			}
			return this._bookMarkListByType[petType] || [];
		}

		public static getPetTypeBySkinId(skinId: number)
		{
			let petId = this.getPetIDById(skinId);
			return cfg.PetCfgData.getPetTypeByPetID(petId);
		}

		/**
		 * 图鉴增加的属性 需要用petID 和 进化阶数来获取 获取到的属性为百分比属性
		 * @param value 
		 */
		public static getAddAttrAryWithId(id: number, evole: number): Array<AddAtterInfo>
		{
			let attr = cfg.PetCfgData.getIllustrationAttrAddByPetID(id);
			if (attr)
			{
				let onIllustrationAttr = attr.split("#")[evole]
				return AddAtterInfo.parse(onIllustrationAttr);
			}
			return null;
		}
	}
}

