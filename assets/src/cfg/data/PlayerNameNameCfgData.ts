
/**
*
*  配置数据访问
*/
module cfg
{
	export class PlayerNameNameCfgData extends PlayerNameNameBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getRandomName(sex: number): string
		{
			let tmpInfo1 = this._dataArr[Global.getRandomNum(0, this._dataArr.length)];
			let tmpInfo2 = this._dataArr[Global.getRandomNum(0, this._dataArr.length)];
			return tmpInfo1.surName + (sex == 0 ? tmpInfo2.maleName : tmpInfo2.femaleName);
		}
	}
}

