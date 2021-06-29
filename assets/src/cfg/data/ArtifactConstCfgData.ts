
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ArtifactConstCfgData extends ArtifactConstBaseCfgData
	{
		constructor()
		{
			super();
		}

		private static _fazhenAddItemInfos: AddItemInfo[];
		public static getFazhenAddItemInfos(): AddItemInfo[]
		{
			if (!this._fazhenAddItemInfos)
				this._fazhenAddItemInfos = cfg.AddItemInfo.parse(this.getFirstInfo().fazhenAddItem);
			return this._fazhenAddItemInfos;
		}

		/** 法阵觉醒后万分比加成 */
		public static getFazhenAwakeAddAttr(): ValueTwoInfo[]
		{
			let info = this.getFirstInfo();
			return ValueTwoInfo.parse(info.awakeAddAttr);
		}
	}
}

