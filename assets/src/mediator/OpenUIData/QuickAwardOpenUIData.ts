
module Pro
{
	export class QuickAwardOpenUIData extends BaseOpenUIData
	{

		public ItemList: Array<Pb_God.PBItemInfo>;
		public PetList: Pb_God.PBPetStar[];
		public isHookReward: boolean;
		public rewardTime: number;
		public oldPlayerLv: number;
		public oldPlayerExp: number;

		constructor()
		{

			super(PanelNotify.Open_QuickAward);
		}
	}
}