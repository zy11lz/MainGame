
/**
* 
*  配置数据访问
*/
module cfg
{
	export class BuffNewBuffCfgData extends BuffNewBuffBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 获取buff参数配置 */
		public static getValueInfoByIndex(value: number): SkillValueIntInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "valueInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueIntInfo.parseOne(this.getValueByID(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取删除条件 */
		public static getDelConditionArybyIndex(value: number): Array<SkillValueTypeIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "delConditionAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueTypeIntInfo.parse(info.delCondition);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取删除触发 */
		public static getDelActionArybyIndex(value: number): Array<SkillValueTypeIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "delActionAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueTypeIntInfo.parse(info.delAction);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取删除触发一个条件 */
		public static getDelActionInfoByIndex(value: number, type: Pb_God._emBuffDelAction): SkillValueTypeIntInfo
		{
			let pDelActAry = cfg.BuffNewBuffCfgData.getDelActionArybyIndex(value);
			if (pDelActAry == null)
			{
				return null;
			}
			let tmpResults = pDelActAry.filter(element => element.uType == type);
			return tmpResults.length > 0 ? tmpResults[0] : null;
		}

		/** 掩码 */
		public static check_mark(skillIndex: number, skillMark: Pb_God._emBuffMark): boolean
		{
			let info = this.getInfo(skillIndex);
			if (info)
			{
				let saveKey = "markAry";
				if (info[saveKey] == null)
				{
					let tmpAry = new Array<Pb_God._emBuffMark>();
					info[saveKey] = tmpAry;
					info.mark.split(";").forEach(element =>
					{
						tmpAry.push(parseInt(element));
					});
				}
			}
			let tmpAry = info["markAry"];
			return tmpAry.indexOf(skillMark) >= 0;
		}

		/** 获取buff是否有能受抗控状态的处理 */
		public static isControlBuff(skillIndex: number): boolean
		{
			let info = this.getInfo(skillIndex);
			if (!info) { return false; }
			return this.isControlState(info.addState);
		}

		/** 当前状态是否受抗控状态处理 */
		public static isControlState(uState: number): boolean
		{
			// 免疫控制状态 的删除那一栏, 里边填的都是控制状态
			let tmpDelList = cfg.BuffNewBuffStateCfgData.getDelOldStatusByIndex(Pb_God._emBuffControlType.BuffControl_NoControl);
			if (!tmpDelList) return false;

			return tmpDelList.indexOf(uState) >= 0;
		}
	}
}

