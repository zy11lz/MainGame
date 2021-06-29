
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetEvolveCfgData extends cfg.PetEvolveBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<any>):void
		{
			super.setup(dataArr);
		}

		public static getInfoWithIdEvolve(petID:number,evolve:number):cfg.PetEvolveCfgInfo
		{
			let resultAry=this._dataArr.filter(elment=>elment.petID==petID&&elment.evolve==evolve);
			return resultAry.length>0?resultAry[0]:null;
		}
		public static getInfoWithIdArr(petID:number):cfg.PetEvolveCfgInfo[]
		{
			let resultAry=this._dataArr.filter(elment=>elment.petID==petID);
			return resultAry;
		}
		public static getIninAttrAryById(id:number):Array<AddAtterInfo>
		{
			let info=this.getInfo(id);
			if(info){
				let saveKey="Attr";
				if(info[saveKey]==null)
				{
					info[saveKey]=AddAtterInfo.parse(info.attr);
				}
				return info[saveKey];
			}
			return null;

		}




	}
}
 
