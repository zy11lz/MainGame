
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DragonBallUnlockCfgData extends DragonBallUnlockBaseCfgData
	{
		constructor()
		{
			super();
		}

		/**根据类型获取对应解锁所需要的道具列表 */
		public static getNeedItemInfoByType(type: number): AddItemInfo
		{
			let info = this.getInfo(type);
			if (!info) return null;
			return AddItemInfo.getAddItemAttr(info, info.needItem, "needItemInfoArr")[0];
		}

	}
}

