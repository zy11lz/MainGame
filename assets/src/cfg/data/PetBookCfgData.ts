
/**
*
*  配置数据访问
*/
module cfg
{
	export class PetBookCfgData extends PetBookBaseCfgData
	{
		constructor()
		{
			super();
		}
		public static getDataList(): PetBookCfgInfo[]
		{
			return this._dataArr;
		}

		public static setup(dataArr:Array<any>):void
		{
			super.setup(dataArr);
		}

		protected static _dataDicByDoubleIndex: Object;
		//双索引，根据id和星级取得配置
		public static getInfoByDoubleKey(petID: number, star: number): PetBookCfgInfo
		{
			let key = petID + "_" + star;
			if (!this._dataDicByDoubleIndex) { this._dataDicByDoubleIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["petID", "star"]); }
			let list = this._dataDicByDoubleIndex[key];
			if (list) { return list[0]; }
			return null;
		}

		protected static _dataDicBookCfgIndex: Object;
		//根据id取得配置
		public static getInfoBookCfgKey(petID: number): PetBookCfgInfo
		{
			let key = petID + "";
			if (!this._dataDicBookCfgIndex) { this._dataDicBookCfgIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["petID"]); }
			let list = this._dataDicBookCfgIndex[key];
			if (list) { return list[0]; }
			return null;
		}

		/** 获取属性加成数据 */
		public static getAddAttrListInfoByCfgInfo(info: PetBookCfgInfo): AddAtterInfo[]
		{
			if (info)
			{
				let saveKey = "addAttrInfoList";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.attr);
				}
				return info[saveKey];
			}
			return [];
		}


		protected static _bookMarkListByType: Object;
		/** 根据英雄类型，获取英雄图鉴列表 */
		public static getBookMarkListByType(petType: number): PetBookCfgInfo[]
		{
			if (!this._bookMarkListByType)
			{
				let map = this._bookMarkListByType = {};
				let isSplice = false;
				for (let el of this._dataArr)
				{
					if (!el.bookMark) { continue; }
					let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(el.petID);
					let arr: PetBookCfgInfo[] = map[tmpPetType];
					if (!arr) { map[tmpPetType] = arr = []; }
					// isSplice = false;
					// for (let ele of arr) {
					// 	if (ele.petID == el.petID && el.star >= ele.star)
					// 	{
					// 		isSplice = true;
					// 		arr.splice(arr.indexOf(ele),1,el);
					// 	}
					// }
					// if(!isSplice)arr.push(el);
					arr.push(el)
				}
			}
			if (petType == 0)
			{
				return this._dataArr;
			}
			return this._bookMarkListByType[petType] || [];
		}

		/**
		 * 根据id获取最强属性配置
		 */
		public static getBookHeroById(id: number)
		{
			let arr = this._dataArr.filter(element => element.petID == id);
			return arr[arr.length - 1];
		}

		/** 获取在图书管展示的英雄信息 */
		public static getLibrayShowPetInfo(petId: number): PetBookCfgInfo
		{
			let results = this._dataArr.filter(elment => elment.petID == petId && elment.libraryMark > 0);
			return results[0];
		}
	}
}

