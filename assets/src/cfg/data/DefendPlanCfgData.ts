
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DefendPlanCfgData extends cfg.DefendPlanBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.DefendPlanCfgInfo>):void
		{
			super.setup(dataArr);
		}
		/** 开启方案消耗 */
		public static getNeedItemAryByIndex(index: number): Array<AddItemInfo>
		{
			let info = this.getInfo(index);
			if (info)
			{
				let saveKey = "needItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem);
				}
				return info[saveKey];
			}
			return [];
		}
	}
}
 
