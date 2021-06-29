
/**
*
*  配置数据访问
*/
module cfg
{
	export class FactionNameNameCfgData extends FactionNameNameBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): FactionNameNameCfgInfo[]
		{
			return this._dataArr;
		}

		static getRandomFactionName(): string
		{
			let beginIndex = Global.getRandomNum(0, this._dataArr.length - 1);
			return this._dataArr[beginIndex].name;
		}


	}
}

