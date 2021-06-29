
module Pro
{
	/**
	 * 通关奖励
	 */
	export class StagePrizeOpenUIData extends BaseOpenUIData
	{

		/**
		 * 战场类型
		 */
		public battleType: Pb_God._emBattleType;

		constructor(batType: Pb_God._emBattleType, customParam: any = null)
		{
			super(PanelNotify.Open_StagePrize);
			this.battleType = batType;
			this.customObject = customParam;
		}
	}
}