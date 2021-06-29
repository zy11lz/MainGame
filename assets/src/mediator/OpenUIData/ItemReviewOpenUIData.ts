
module Pro
{
	/**
     * 道具描述页面
     */
	export class ItemReviewOpenUIData extends BaseOpenUIData
	{

		/**
		 * 伙伴的装备
		 */
		public petSn: Long;

		/** 神装套装管理ID(仅在修改神装套装方案时有用， 此值与petSn只会存在1个) */
		public godEquipSuitMgrId = 0;

		/**
		 * 展示道具
		 */
		public showItem: Pb_God.PBItem;

		/**
		 * 是否显示功能操作
		 */
		public showFun: boolean;

		constructor(itemInfo: Pb_God.PBItem, petSn?: Long, showFun: boolean = false)
		{
			super(PanelNotify.Open_ItemReview);
			this.showItem = itemInfo;
			this.petSn = petSn;
			this.showFun = showFun;
		}
	}
}