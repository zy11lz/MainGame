
/**
* 
*  配置数据访问
*/
module cfg
{
	export class BuffNewBuffGroupCfgData extends BuffNewBuffGroupBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static findGroupMutual(ugroupId: number): Array<BuffNewBuffGroupCfgInfo>
		{
			return this._dataArr.filter(element => element.newGroup == ugroupId);
		}

	}
}

