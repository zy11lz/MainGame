
module Pro
{
	/**
     * 玩家升级提示弹窗
     */
	export class PlayerLevelUpOpenUIData extends BaseOpenUIData
	{
		public oldLevel: number = 0;
		public newLevel: number = 0;
		public openSystemSwitchIds: number[] = [];
		public isDelayWaitOpen = false; //延时等待打开， 在某些场合升级，比如 战斗结算时， 结算的消息会延后， 升级的提示需要延迟到战斗结算的后面
		public isClose = false; //失效
		constructor()
		{
			super(PanelNotify.Open_PlayerLevelUp);
		}

		/** 界面弹出时被中止 */
		public stopOpen(): void
		{
			this.isClose = true;
		}
	}
}