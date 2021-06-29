
module cfg
{
	export class SkillToCureInfo
	{

		//取伤害记录
		public uDamageRecord: number = 0;
		//属性类型
		public uAttrType: Pb_God._emBattleAttribute = 0;
		//万分比
		public uRate: number = 0;
		//额外值
		public uValue: number = 0;
		//是否死亡(1死亡)
		public uisDead: number = 0;
		//溢出加buff
		public uAddBuff: number = 0;
		//是否取目标
		public bSelf: number = 0

		public static parseOne(str: string): SkillToCureInfo
		{
			var subArr = str.split("_");
			var info = new SkillToCureInfo();
			info.uDamageRecord = subArr.length > 0 ? parseInt(subArr[0]) : 0;
			info.uAttrType = subArr.length > 1 ? parseInt(subArr[1]) : 0;
			info.uRate = subArr.length > 2 ? parseInt(subArr[2]) : 0;
			info.uValue = subArr.length > 3 ? parseInt(subArr[3]) : 0;
			info.uisDead = subArr.length > 4 ? parseInt(subArr[4]) : 0;
			info.uAddBuff = subArr.length > 5 ? parseInt(subArr[5]) : 0;
			info.bSelf = subArr.length > 6 ? parseInt(subArr[6]) : 0;
			return info;
		}

		public static parse(str: string): Array<SkillToCureInfo>
		{
			var arr: Array<SkillToCureInfo> = [];
			var array: Array<string> = str.split(";");
			for (var index = 0; index < array.length; index++) 
			{
				var subStr: string = array[index];
				if (subStr == "" || subStr == " ")
				{
					continue;
				}
				arr.push(SkillToCureInfo.parseOne(subStr));
			}
			return arr;
		}
	}
}