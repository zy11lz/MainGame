
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TempleCfgData extends TempleBaseCfgData
	{
		constructor()
		{
			super();
		}

		// /** 战斗怪物列表中bossId */
		// public static getBossMonsterIdById(id:number):number
		// {
		// 	let info = this.getInfo(id);
		// 	if(info){
		// 		let saveKey = "AddMonsterArr";
		// 		let arr:AddMonsterInfo[] = info[saveKey];
		// 		if(arr == null){
		// 			info[saveKey] = arr = AddMonsterInfo.parse(info.addMonster);
		// 		}
		// 		return arr[info.bossIndex-1].monsterID;
		// 	}
		// 	return 0;
		// }
	}
}

