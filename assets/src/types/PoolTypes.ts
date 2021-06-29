/**
* name 
*/
module Pro
{
	export class PoolTypes
	{
		public static EFFECT_NODE: common.PoolInfo;
		public static NORITEM_TRULYUI: common.PoolInfo;
		public static ATTACK_ROLE: common.PoolInfo;
		public static CITY_ROLE: common.PoolInfo;

		public static BATTLE_PLACE: common.PoolInfo;

		static init()
		{
			this.NORITEM_TRULYUI = new common.PoolInfo("NorItemTrulyUI", NorItemTrulyUI, 500);
			this.ATTACK_ROLE = new common.PoolInfo("BaseAtker", BaseAtker, 500);
			this.CITY_ROLE = new common.PoolInfo("CityRole", CityRole, 500);
			this.EFFECT_NODE = new common.PoolInfo("EffectNode", EffNode, 500);
			this.BATTLE_PLACE = new common.PoolInfo("BatPlaceMgr", BatPlaceMgr, 500);
		}
	}
}