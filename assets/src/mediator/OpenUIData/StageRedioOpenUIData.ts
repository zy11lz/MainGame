
module Pro
{
	/**
	 * 通关录像
	 */
	export class StageRedioOpenUIData extends BaseOpenUIData
	{

		/**
		 * 战场类型
		 */
		public battleType: Pb_God._emBattleType;

		/**
		 * 战场ID
		 */
		public battleID: number;

		constructor(batType: Pb_God._emBattleType, battleID: number)
		{
			super(PanelNotify.Open_StageRedio);
			this.battleType = batType;
			this.battleID = battleID;
		}
	}
}