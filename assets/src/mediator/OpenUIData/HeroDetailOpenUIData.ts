/**
* name 
*/
module Pro
{
	export class HeroDetailOpenUIData extends BaseOpenUIData
	{

		public heroIndex: number;
		public heroType: number;
		public heroInfo: Net.hero;
		public heroBookCfgInfo: cfg.PetBookCfgInfo;
		public isTujian: boolean;
		public heroDataList: Array<Net.hero>;
		public heroCfgList: Array<cfg.PetCfgInfo>;
		public tuJianList: Array<cfg.PetBookCfgInfo>;
		constructor()
		{
			super(PanelNotify.Open_HeroDetail);
		}
	}
}