
/**
* 
*  配置数据访问
*/
module cfg
{
	export class StrongerQuestionCfgData extends StrongerQuestionBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): StrongerQuestionCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

