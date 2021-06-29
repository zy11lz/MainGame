
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SkillEffectNewSkillEffectCfgData extends SkillEffectNewSkillEffectBaseCfgData
	{
		protected static _dataDicByIdAndLv: Object;

		private static _rolgeAttackOffsetMap: ds.StringMap<Point>;
		public static setup(dataArr: Array<SkillEffectNewSkillEffectCfgInfo>): void
		{
			super.setup(dataArr);
			this._dataDicByIdAndLv = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["heroID", "skillIndex"]);
		}

		public static getInfoByIdAndLevel(heroId: number, skillIndex: number): SkillEffectNewSkillEffectCfgInfo
		{
			let keyIdLv = heroId + "_" + skillIndex;
			let list = this._dataDicByIdAndLv[keyIdLv];
			if (list) return list[0];
			return null;
		}

		public static getInfosAryByHeroId(heroId: number): Array<SkillEffectNewSkillEffectCfgInfo>
		{
			return this._dataArr.filter(element => element.heroID == heroId);
		}

		public static getCastingEffInfoById(value: number): SkillEffectInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "castingEffectAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillEffectInfo.parse(info.castingEffect);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getSkillEffInfoAryById(value: number): SkillEffectInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "skillEffectInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillEffectInfo.parse(info.skillEffect);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getBehitEffAryById(value: number): SkillEffectInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "behitEffectAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillEffectInfo.parse(info.behitEffect);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getBehitFramesAryById(value: number): SkillValueIntInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "behitFramesAry";
				if (info[saveKey] == null)
				{
					let tmpAry = SkillValueIntInfo.parseOne(info.behitFrames, ";");
					info[saveKey] = tmpAry;
				}
				return info[saveKey];
			}
			return null;
		}

		public static getWeaponActionAryById(value: number): Array<SkillValueIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "weaponActionAry";
				if (info[saveKey] == null)
				{
					let tmpAry = SkillValueIntInfo.parse(info.weaponAction);
					info[saveKey] = tmpAry;
				}
				return info[saveKey];
			}
			return null;
		}

		/** 技能特效配置扩展 */
		public static getExtendsParamsValue(index: number, extendsType: Pro.BatCfg.SkillEffectExtendsType): string
		{
			let info = this.getInfo(index);
			if (info && info.extendParams)
			{
				let saveKey = "extendsParamsValueMap";
				if (info[saveKey] == null)
				{
					let map = {};
					for (let single of info.extendParams.split(";"))
					{
						let paramAry = single.split("_");
						map[parseInt(paramAry[0])] = paramAry[1] || "1";
					}
					info[saveKey] = map;
				}
				return info[saveKey][extendsType];
			}
			return null;
		}



		public static getSkillEffectCfg(skillIndex: number, skinId: number, resourceId: number): cfg.SkillEffectNewSkillEffectCfgInfo
		{

			let isBigSkill = cfg.SkillNewSkillCfgData.isBigSkill(skillIndex);
			//获取技能效果表对应的技能序号(0:普攻，1:1技能，2:2技能)
			let tmpEffSkillIndex = 0;
			if (isBigSkill)
			{
				tmpEffSkillIndex = -1;
				let tmpSkillID = cfg.SkillNewSkillCfgData.getSkillIDBySkillIndex(skillIndex);
				let tmpSKillIDAry = cfg.PetSkinCfgData.getAddSkillAryById(skinId);
				for (let i = 0; i < tmpSKillIDAry.length; i++)
				{
					if (tmpSKillIDAry[i].value1 == tmpSkillID)
					{
						tmpEffSkillIndex = i + 1;
						break;
					}
				}
				if (tmpEffSkillIndex == -1)
				{ //如果找不到，看是不是附加的随机技能，直接找到原技能
					let tmpSourceSkillID = Math.floor(tmpSkillID / 10);
					let tmpSourceSkillChildIndex = tmpSkillID % 10;
					for (let i = 0; i < tmpSKillIDAry.length; i++)
					{
						if (tmpSKillIDAry[i].value1 == tmpSourceSkillID)
						{
							tmpEffSkillIndex = i + 1;
							let tmpEffSkillIndex2 = tmpEffSkillIndex * 10 + tmpSourceSkillChildIndex;
							//看能不能找到二级技能特效，如果没有，则保持原状
							if (cfg.SkillEffectNewSkillEffectCfgData.getInfoByIdAndLevel(resourceId, tmpEffSkillIndex2))
							{
								tmpEffSkillIndex = tmpEffSkillIndex2;
							}
							break;
						}
					}
				}
				// 魂器赋予的新技能 默认为技能最高等级
				if (tmpEffSkillIndex == -1 && cfg.SkillNewSkillCfgData.getHorcruxSkillBySkillIndex(skillIndex) > 0)
				{
					tmpEffSkillIndex = cfg.SkillNewSkillCfgData.getHorcruxSkillBySkillIndex(skillIndex);
				}
			}

			//如果找不到特效数据，直接使用普攻的
			let tmpSkillEffInfo = cfg.SkillEffectNewSkillEffectCfgData.getInfoByIdAndLevel(resourceId, tmpEffSkillIndex);
			if (tmpSkillEffInfo == null)
			{
				tmpSkillEffInfo = cfg.SkillEffectNewSkillEffectCfgData.getInfoByIdAndLevel(resourceId, 0);
			}

			return tmpSkillEffInfo;
		}

		public static getRoleAttactOffsetPoint(skillId: number): Point
		{
			if (this._rolgeAttackOffsetMap == null)
			{
				this._rolgeAttackOffsetMap = new ds.StringMap<Point>();
			}
			if (this._rolgeAttackOffsetMap.containsKey(skillId))
			{
				return this._rolgeAttackOffsetMap.get(skillId);
			} else
			{
				var po: Point;
				var offset = this.getRoleAttackOffsetByIndex(skillId);
				if (offset && offset != "")
				{
					var arr = offset.split(",");
					po = new Point(parseInt(arr[0]), parseInt(arr[1]));
				} else
				{
					po = new Point();
				}
				this._rolgeAttackOffsetMap.put(skillId, po);
				return po;
			}
		}
	}
}

