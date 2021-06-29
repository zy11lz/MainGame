
/**
* 
*  配置数据访问
*/
module cfg
{
	export class CustomGiftGiftpoolCfgData extends cfg.CustomGiftGiftpoolBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.CustomGiftGiftpoolCfgInfo>):void
		{
			super.setup(dataArr);
		}

		protected static _dataDicByDoubleIndex: Object;
		//双索引，根据类型和等级取得配置
		public static getInfoByDoubleKey(poolId: number, index: number): cfg.CustomGiftGiftpoolCfgInfo
		{
			let key = poolId + "_" + index;
			if (!this._dataDicByDoubleIndex) this._dataDicByDoubleIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["poolID", "poolItemIndex"]);
			let list = this._dataDicByDoubleIndex[key];
			if (list) return list[0];
			return null;
		}

		public static getInfoByPoolId(poolID: number): Array<CustomGiftGiftpoolCfgInfo>
		{
			return this._dataArr.filter(element => element.poolID == poolID);
		}

		public static getIndexsBypoolIdAndpoolItemIndex(infos :Pb_God.PBU32U32[])
		{
			let indexs = [];
			for (let i = 0; i < infos.length; i++) {
				var element = infos[i];
				indexs.push(this.getInfoByDoubleKey(element.key,element.value).index);
			}
			return indexs;
		}
	}
}
 
