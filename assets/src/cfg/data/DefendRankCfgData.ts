
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DefendRankCfgData extends cfg.DefendRankBaseCfgData
	{
		protected static _dataDicByLv: Object;
		constructor()
		{
			super();
		}
		public static get dataArr():Array<cfg.DefendRankCfgInfo>{
			return this._dataArr;
		}
		
		public static setup(dataArr:Array<cfg.DefendRankCfgInfo>):void
		{
			super.setup(dataArr);
		}

		public static getInfoByLv(level: number): cfg.DefendRankCfgInfo
		{
			if (!this._dataDicByLv){
				this._dataDicByLv = TemplateUtil.converArrToDictionary(this._dataArr, "maxLevel");
			}
			return this._dataDicByLv[level];
		}

		/** 获取精灵升级消耗 */
		public static getNeedItemAryByIdLevel(level: number): Array<AddItemInfo>
		{
			let info = this.getInfoByLv(level);
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

		/** 获取精灵加Attr */
		public static getAddPetAttrAryByIndex(rank: number): Array<AddAtterInfo>
		{
			let info = this.getInfo(rank);
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
		public static getAddPetAttrByIndex(rank:number,type:Pb_God._emBattleAttribute):AddAtterInfo{
			let info = this.getInfo(rank);
			if (info)
			{
				let saveKey = "addPetAttr"+rank+"type"+type;
				if (info[saveKey] == null)
				{
					let attrAry3: Array<cfg.AddAtterInfo>=cfg.DefendRankCfgData.getAddPetAttrAryByIndex(rank); 
					let addAtter:cfg.AddAtterInfo;
					for(let i=0;i<attrAry3.length;i++){
						if(attrAry3[i].type==type){
							addAtter=attrAry3[i]
						}

					}
					if(!addAtter){
						addAtter=new cfg.AddAtterInfo();
						addAtter.type=type
						addAtter.value=0;
					}
					info[saveKey] = addAtter;
				}
				return info[saveKey];
			}
			return null;

		}
		





	}
}
 
