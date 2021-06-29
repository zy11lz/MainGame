/**
 * 抽奖玩法 更换奖励池奖励
 */
module Pro
{
	export class ReplacementData extends BaseOpenUIData
	{
		public title: string;
		public lotteryType: Pb_God._emLotteryType;
		public des: string;
		public save: AlertOpenUIData_Fun;
		public cancel: AlertOpenUIData_Fun;
		public clickEnableOnClip: boolean = true;       // 空白区域是否可以点击，以关闭面板
        public limit: number = 0;                       // 奖励池保底数量显示
        public itemList: Array<cfg.AddItemInfo>;        // 奖励池道具显示

        public selectedIndex: number = 0;  // 当前选中抽卡

		constructor()
		{
			super(PanelNotify.Open_Replacement);
		}
	}
}