
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetHighstarRebornCfgData extends cfg.PetHighstarRebornBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<any>):void
		{
			super.setup(dataArr);
		}
		
		public static getDataList(): PetHighstarRebornCfgInfo[]
		{
			return this._dataArr;
		}

		/** 根据伙伴ID 星级获取 */
		public static getInfoWithFun(petID: number, star: number): PetHighstarRebornCfgInfo
		{
			let resultAry = this._dataArr.filter(elment => elment.petID == petID && elment.star == star);
			return resultAry.length > 0 ? resultAry[0] : null;
		}


		public static getRebornItem(petID: number, star: number): Array<AddItemInfo>
		{
			let info: PetHighstarRebornCfgInfo[] = this._dataArr.filter(elment => elment.petID == petID && elment.star == star);

			if (info.length > 0)
			{
				let saveKey = "rebornItem";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info[0].rebornItem);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}
 
