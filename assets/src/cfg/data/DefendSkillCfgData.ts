
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DefendSkillCfgData extends cfg.DefendSkillBaseCfgData
	{
		protected static _dataDicByIdAndLv: Object;
		protected static _dataDicBySkillidAndLv: Object;
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.DefendSkillCfgInfo>):void
		{
			super.setup(dataArr);
			
			
		}
		public static getInfoByStar(petId: number, petStar: number): DefendSkillCfgInfo
		{
			return this.getInfoByIdLevelGroup(petId + "_" + petStar);
		}
		/** petID + "_" + petStar */
		public static getInfoByIdLevelGroup(keyIdLv: string): DefendSkillCfgInfo
		{
			if (!this._dataDicByIdAndLv) this._dataDicByIdAndLv = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["petID", "petStar"]);
			let list = this._dataDicByIdAndLv[keyIdLv];
			if (list) return list[0];
			else{
				var key: any;
				var valueArr=keyIdLv.split("_");
				var obj:any;
				var arr: any[] = [];
				this._dataDicByIdAndLv[keyIdLv]=arr;
				for (key in this._dataArr) 
				{
					let tmpObj=this._dataArr[key];
					if(tmpObj.petID==Number.parseInt(valueArr[0])){
						if(!obj){
							obj = tmpObj;
						}else if(tmpObj.petStar>obj.petStar&&tmpObj.petStar<Number.parseInt(valueArr[1])){
							obj = tmpObj;
						}
					}
				}
				arr.push(obj);
				return obj
			}
		}
		/** skillID + "_" + skillLevel */
		public static getInfoBySkillidLevelGroup(keyIdLv: string): DefendSkillCfgInfo
		{
			if (!this._dataDicBySkillidAndLv) this._dataDicBySkillidAndLv = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["skillID", "skillLevel"]);
			let list = this._dataDicBySkillidAndLv[keyIdLv];
			if (list) return list[0];
			else{
				var key: any;
				var valueArr=keyIdLv.split("_");
				var obj:any;
				var arr: any[] = [];
				this._dataDicBySkillidAndLv[keyIdLv]=arr;
				for (key in this._dataArr) 
				{
					let tmpObj=this._dataArr[key];
					if(tmpObj.petID==Number.parseInt(valueArr[0])){
						if(!obj){
							obj = tmpObj;
						}else if(tmpObj.skillLevel>obj.skillLevel&&tmpObj.skillLevel<Number.parseInt(valueArr[1])){
							obj = tmpObj;
						}
					}
				}
				arr.push(obj);
				return obj
			}
		}

		private static _petListByTypeArr:DefendSkillCfgInfo[][];
		private static _setUpPetList(dataArr:Array<cfg.DefendSkillCfgInfo>){
			this._petListByTypeArr=[[],[],[],[],[],[]];
			for(let i=0;i<dataArr.length;i++){
				let info=dataArr[i];
				if(info.petStar==5){
					let petType:number=cfg.PetCfgData.getPetTypeByPetID(info.petID);
					this._petListByTypeArr[petType].push(info);
					this._petListByTypeArr[0].push(info);
				}
			}
		}
		/** 获取指定宠物数据列表 */
		public static getPetList(petType?: Pb_God._emPetType): Array<DefendSkillCfgInfo>
		{
			if(!this._petListByTypeArr)this._setUpPetList(this._dataArr);
			return petType?this._petListByTypeArr[petType]:this._petListByTypeArr[0];
		}


		





	}
}
 
