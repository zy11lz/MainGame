
/**
* 
*  配置数据访问
*/
module cfg
{
	export class IncubatePetEggCfgData extends cfg.IncubatePetEggBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.IncubatePetEggCfgInfo>):void
		{
			super.setup(dataArr);
		}

		protected static _listByType: Object;
		/** 根据英雄类型，获取英雄图鉴列表 */
		public static getListByType(petType: number): IncubatePetEggCfgInfo[]
		{
			if (!this._listByType)
			{
				let map = this._listByType = {};
				for (var el of this._dataArr)
				{
					let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(el.petId);
					let arr: IncubatePetEggCfgInfo[] = map[tmpPetType];
					if (!arr) { map[tmpPetType] = arr = []; }
					arr.push(el);
				}
				let totalArr=[];
				for(let str in map){
					let arr:IncubatePetEggCfgInfo[]=map[str];
					arr.sort((a:IncubatePetEggCfgInfo,b:IncubatePetEggCfgInfo)=>{
						return a.petStar>=b.petStar?-1:1;

					})
					totalArr=totalArr.concat(arr);

				}
				map[0]=totalArr;
			}
			
			return this._listByType[petType] || [];
		}

		private static _needItemAry:Array<AddItemInfo>
		/** 获取消耗 */
		public static getNeedItemAry(): Array<AddItemInfo>
		{

			if(!this._needItemAry){
				let info = this.getFirstInfo();
				this._needItemAry=AddItemInfo.parse(info.eggPrice);
			}
			return this._needItemAry;
			
		}

		/** 获取精灵升级消耗 */
		public static getNeedItemAryByIndex(index: number): Array<AddItemInfo>
		{
			let info = this.getInfo(index);
			if (info)
			{
				let saveKey = "needItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.eggPrice);
				}
				return info[saveKey];
			}
			return [];
		}
			




	}
}
 
