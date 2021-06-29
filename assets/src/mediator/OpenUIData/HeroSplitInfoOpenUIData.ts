/**
* name 
*/
module Pro
{
	export class HeroSplitInfoOpenUIData extends BaseOpenUIData
	{

		/**
		 * 查看奖励
		 */
		public isCherk: boolean;

		/**
		 * 分解英雄列表
		 */
		public splitPetList: Array<Net.hero>;

		/**
		 * 分解英雄碎片
		 */
		public splitItemInfo: Pb_God.PBItem;

		/**
		 * 分解碎片个数
		 */
		public splitItemCount: number;

		constructor(splitPetList: Array<Net.hero>, splitItemInfo: Pb_God.PBItem, splitItemCount: number, isCherk: boolean)
		{
			super(PanelNotify.Open_HeroSplitInfo);
			this.splitPetList = splitPetList;
			this.splitItemInfo = splitItemInfo;
			this.splitItemCount = splitItemCount;
			this.isCherk = isCherk;
		}
	}
}