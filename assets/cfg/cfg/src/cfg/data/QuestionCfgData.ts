
/**
* 
*  配置数据访问
*/
module cfg
{
	export class QuestionCfgData extends cfg.QuestionBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.QuestionCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
