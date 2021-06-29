
/**
* 
*  配置数据访问
*/
module cfg
{
	export class BuffNewBuffStateCfgData extends BuffNewBuffStateBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 获取buff互斥配置 */
		public static getCanAddStatusByIndex(value: number): SkillValueIntInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "canAddInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueIntInfo.parseOne(this.getCanAddByNewState(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取buff删除老配置 */
		public static getDelOldStatusByIndex(value: number): SkillValueIntInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "delOldInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueIntInfo.parseOne(this.getDelOldStateByNewState(value));
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

