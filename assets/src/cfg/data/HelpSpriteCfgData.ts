
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HelpSpriteCfgData extends HelpSpriteBaseCfgData
	{
		private static _allData: HelpSpriteCfgInfo[];
		static get allData(): HelpSpriteCfgInfo[]
		{
			return HelpSpriteCfgData._allData;
		}
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<HelpSpriteCfgInfo>): void
		{
			super.setup(dataArr);
			this._allData = dataArr;
		}
	}
}

