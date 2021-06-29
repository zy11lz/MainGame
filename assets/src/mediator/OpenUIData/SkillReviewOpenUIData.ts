
module Pro
{
	/**
	 * 技能查看器打开传入参数
	 */
	export class SkillReviewOpenUIData extends BaseOpenUIData
	{

		/**
		 * 伙伴ID
		 */
		public skinID: number;

		/**
		 * 技能索引
		 */
		public skillIndex: number;

		/**
		 * 技能是否已经解锁
		 */
		public isUnlock: boolean;

		constructor(skinID: number, skillIndex: number, isUnlock: boolean = true)
		{
			super(PanelNotify.Open_SkillReview);
			this.skinID = skinID;
			this.skillIndex = skillIndex;
			this.isUnlock = isUnlock;
		}
	}
}