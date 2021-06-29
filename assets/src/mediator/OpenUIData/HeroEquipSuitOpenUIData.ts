
module Pro
{
	/**
	 * 英雄装备更换
	 */
	export class HeroEquipSuitOpenUIData extends BaseOpenUIData
	{

		/**
		 * 伙伴ID
		 */
		public petSn: Long;

		/** 神装套装管理ID(仅在修改神装套装方案时有用， 此值与petSn只会存在1个) */
		public godEquipSuitMgrId = 0;

		/**
		 * 展示装备部件ID
		 */
		public subType: number;

		constructor(petSn: Long, subType: number, panelName: string)
		{
			super(panelName);
			this.petSn = petSn;
			this.subType = subType;
		}
	}
}