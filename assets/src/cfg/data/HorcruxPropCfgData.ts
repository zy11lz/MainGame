
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HorcruxPropCfgData extends cfg.HorcruxPropBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HorcruxPropCfgInfo>):void
		{
			super.setup(dataArr);
		}

		protected static _dataDicByHorcruxInfo: Object;
		public static getHorcruxInfoByIdAndLv(id: number,level: number): HorcruxPropCfgInfo
		{
			let key = id + "_" + level;
			if (!this._dataDicByHorcruxInfo) this._dataDicByHorcruxInfo = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["iD", "level"]);
			let list = this._dataDicByHorcruxInfo[key];
			if (list) return list[0];
			return null;
		}
	}
}
 
