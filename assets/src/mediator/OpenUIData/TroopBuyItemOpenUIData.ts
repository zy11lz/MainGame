
module Pro
{

	export class TroopBuyItemOpenUIData extends BaseOpenUIData
	{


		/**
		 * 操作类型,
		 * 1:英雄背包格子扩充
		 * 2:元素神殿购买战斗次数
		 * 3:试炼塔购买战斗次数
		 * 4:符文分解
		 * 5:快速作战次数购买
		 */
		public actionType: number;

		public sure: AlertOpenUIData_Fun;


		/**
		 * 操作类型,
		 * 1:英雄背包格子扩充
		 * 2:元素神殿购买战斗次数
		 * 3:试炼塔购买战斗次数
		 * 4:符文分解
		 * 5:快速作战次数购买
		 * 6.
		 * 7.新春累登补登
		 * 8.新春累登补登
		 */
		constructor(actionType, customObject: any = null)
		{
			super(PanelNotify.Open_TroopBuyItem, customObject);
			this.actionType = actionType;
		}
	}
}