
module Pro
{
	/**
     * 英雄视图显示
     */
	export class HeroViewInfoOpenUIData extends BaseOpenUIData
	{

		/**
		 * 伙伴查看
		 */
		public petView: Pb_God.PBPlayerPetView;

		/**
		 * 伙伴升星数据
		 */
		public petCfg: cfg.PetUpStarCfgInfo;

		/**
		 * 角色数据
		 */
		public petInfo: Net.hero;

		constructor()
		{
			super(PanelNotify.Open_HeroViewInfo);
		}

		initPetView(petView: Pb_God.PBPlayerPetView): HeroViewInfoOpenUIData
		{
			this.petView = petView;
			return this;
		}

		initPetCfg(petCfg: cfg.PetUpStarCfgInfo): HeroViewInfoOpenUIData
		{
			this.petCfg = petCfg;
			return this;
		}

		initPetInfo(petInfo: Net.hero): HeroViewInfoOpenUIData
		{
			this.petInfo = petInfo;
			return this;
		}
	}
}