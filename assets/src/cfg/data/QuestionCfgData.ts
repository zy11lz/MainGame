
/**
* 
*  配置数据访问
*/
module cfg
{
	export class QuestionCfgData extends QuestionBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): QuestionCfgInfo[]
		{
			return this._dataArr;
		}

	}
}

