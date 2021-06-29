
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCallFixChangeCfgData extends cfg.PetCallFixChangeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.PetCallFixChangeCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getHuPaInfo()
		{
			return this._dataArr.filter(element => element.petID == Pro.CfgID.PetID.HuPa)[0];
		}
	}
}

