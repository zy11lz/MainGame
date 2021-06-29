
/**
* 
*  配置数据访问
*/
module cfg
{
	export class BattleTypeRestrainCfgData extends BattleTypeRestrainBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getTypeRestrainAddDamage(ownerPetType: number, targetPetType: number): number
		{
			let tmpResults = this._dataArr.filter(element => element.attackType == ownerPetType && element.defenseType == targetPetType);
			return tmpResults.length > 0 ? tmpResults[0].damageRate : 0;
		}

		public static getTypeRestrainHitRate(ownerPetType: number, targetPetType: number): number
		{
			let tmpResults = this._dataArr.filter(element => element.attackType == ownerPetType && element.defenseType == targetPetType);
			return tmpResults.length > 0 ? tmpResults[0].hitRate : 0;
		}
	}
}

