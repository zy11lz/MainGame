
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ConvenantConstCfgData extends ConvenantConstBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 获取解锁需要的道具 */
		public static getUnlockNeedItemInfoArr(): AddItemInfo[]
		{
			let info = this.getFirstInfo();
			return cfg.AddItemInfo.getAddItemAttr(info, info.unlockNeedItem, "$unlockNeedItemArr");
		}

	}
}

