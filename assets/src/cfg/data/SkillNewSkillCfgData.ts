
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SkillNewSkillCfgData extends SkillNewSkillBaseCfgData
	{
		protected static _dataDicByIdAndLv: Object;
		private static _skillOrderMap: ds.StringMap<Object> = new ds.StringMap<Object>();
		constructor()
		{
			super();
		}

		/** 根据技能ID（非skillIndex）与等级组合，获取对应的技能配置 */
		public static getInfoByIdAndLevel(skillid: number, level: number): SkillNewSkillCfgInfo
		{
			return this.getInfoByIdLevelGroup(skillid + "_" + level);
		}
		/** skillid + "_" + level */
		public static getInfoByIdLevelGroup(keyIdLv: string): SkillNewSkillCfgInfo
		{
			if (!this._dataDicByIdAndLv) this._dataDicByIdAndLv = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["skillID", "skillLevel"]);
			let list = this._dataDicByIdAndLv[keyIdLv];
			if (list) return list[0];
			return null;
		}

		/** 一个ID对应一个列表 */
		protected static _dataArrById: Object;
		public static getDataArrayByID(value: number): Array<SkillNewSkillCfgInfo>
		{
			if (this._dataArrById == null)
			{
				this._dataArrById = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "skillID");
			}
			return this._dataArrById[value];
		}

		/** 获取技能最大等级 */
		public static getMaxLevelBySkillId(value: number): number
		{
			let skillArr = this.getDataArrayByID(value);
			if (!skillArr) return 0;
			return skillArr[skillArr.length - 1].skillLevel; //拿最后一个即可，让策划去配置顺序，减少计算。
		}

		/** 获取技能顺序 */
		public static getSkillOrderArybyIndex(value: number): Array<Pb_God._emSkillOrderType>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "skillOrderAry";
				if (info[saveKey] == null)
				{
					let tmpAry = new Array<Pb_God._emSkillOrderType>();
					info[saveKey] = tmpAry;
					this.getSkillOrderBySkillIndex(value).split(";").forEach(element =>
					{
						if (element.length > 0)
						{
							tmpAry.push(parseInt(element));
						}
					});
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取技能顺序参数 */
		public static getSkillOrderParamArybyIndex(value: number): Array<SkillValueTypeIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "skillOrderParamAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueTypeIntInfo.parse(this.getOrderParamBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取技能舒徐参数指定值 */
		public static getSKillOrderParamByIndexAndType(skillIndex: number, orderType: Pb_God._emSkillOrderType): SkillValueTypeIntInfo
		{
			let tmpAry = cfg.SkillNewSkillCfgData.getSkillOrderParamArybyIndex(skillIndex);
			let tmpResults = tmpAry.filter(element => element.uType == orderType);
			return tmpResults.length > 0 ? tmpResults[0] : null;
		}

		/** 获取技能触发类型条件 */
		public static getTriggerTypeInfobyIndex(value: number): SkillToTriggerType
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "triggerTypeInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillToTriggerType.parse(this.getTriggerTypeBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取技能触发参数 */
		public static getTriggerParamInfobyIndex(value: number): SkillValueIntInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "triggerParamInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueIntInfo.parseOne(this.getTriggerParamBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取技能开始和冷却回合 */
		public static getCoolRoundInfoByIndex(value: number): SkillValueIntInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "coolRoundInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueIntInfo.parseOne(this.getCoolRoundBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取优先目标条件 */
		public static getTargetInfoByIndex(value: number): SkillToTargetInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "SkillToTargetInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillToTargetInfo.parse(value);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取治疗参数条件 */
		public static getCureInfoByIndex(value: number): Array<SkillToCureInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "cureInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillToCureInfo.parse(this.getCureBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取伤害公式条件 */
		public static getDamageInfoByIndex(value: number): SkillToDamage
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "damageInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillToDamage.parse(info.damage);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取目标额外伤害条件 */
		public static getExtralDamageInfoByIndex(value: number): Array<SkillValueTypeIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "extralDamageInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueTypeIntInfo.parse(this.getExtraDamageBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取自己额外属性条件 */
		public static getExtralAddAttrInfoByIndex(value: number): Array<SkillValueIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "extralAddAttrInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueIntInfo.parse(this.getExtraAddAttrBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取给目标加buff条件 */
		public static getAddTarBuffConditionInfoByIndex(value: number): Array<SkillValueTypeIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addTarBuffConditionInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueTypeIntInfo.parse(this.getAddTarBuffConditionBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}
		/** 获取给目标拥有的buff ,包含子类技能的buff */
		public static getAddTarBuffIndex(skillIndex: number): string
		{
			let info = this.getInfo(skillIndex);
			if (info)
			{
				let saveKey = "addTarBuffArr";
				if (info[saveKey] == null)
				{
					let str=info.addTarBuff?info.addTarBuff:"";

					if(info.addSelfBuff){
						if(str){
							str+=";"+info.addSelfBuff
						}else{
							str=info.addSelfBuff;
						}
					}

					let targgertypeinfo=this.getTriggerTypeInfobyIndex(skillIndex);

					if(targgertypeinfo&&(targgertypeinfo.type==Pb_God._emSkillTriggerType.SkillTriggerType_RandOrSkill||targgertypeinfo.type==Pb_God._emSkillTriggerType.SkillTriggerType_SkillGroup)){
						let skillValueIntInfo=this.getTriggerParamInfobyIndex(skillIndex);
						for(let i=0;i<skillValueIntInfo.length;i++){
							let cInfo=this.getInfoByIdAndLevel(skillValueIntInfo[i],info.skillLevel);


							if(cInfo&&cInfo.addTarBuff){
								if(str.length>0){
									str=str+";"
								}
								str=str+cInfo.addTarBuff

							}

							if(cInfo&&cInfo.addSelfBuff){
								if(str.length>0){
									str=str+";"
								}
								str=str+cInfo.addSelfBuff

							}



						}
					}






					info[saveKey] = str;
				}
				return info[saveKey];
			}
			return null;
		}

		/** 掩码 */
		public static check_mark(skillIndex: number, skillMask: Pb_God._emSkillMaskType): boolean
		{
			let info = this.getInfo(skillIndex);
			if (info)
			{
				let saveKey = "maskAry";
				if (info[saveKey] == null)
				{
					let tmpAry = new Array<Pb_God._emSkillMaskType>();
					info[saveKey] = tmpAry;
					info.mask.split(";").forEach(element =>
					{
						if (element.length > 0)
						{
							tmpAry.push(parseInt(element));
						}
					});
				}
			}
			let tmpAry = info["maskAry"];
			return tmpAry.indexOf(skillMask) >= 0;
		}

		/** 获取给目标加buff的id和概率 */
		public static getAddTarBuffAryByIndex(value: number): Array<SkillValueIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addTarBuffAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueIntInfo.parse(this.getAddTarBuffBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取给自己加buff的id和概率 */
		public static getAddSelfBuffAryByIndex(value: number): Array<SkillValueIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addSelfBuffAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueIntInfo.parse(this.getAddSelfBuffBySkillIndex(value));
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取给自己加Attr */
		public static getAddSelfAttrAryByIndex(value: number): Array<AddAtterInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addSelfAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addSelfAttr);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取公共条件 */
		public static getCommonConditionInfosByIndex(value: number): Array<SkillValueTypeIntInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "commonConditionInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillValueTypeIntInfo.parse(info.commonCondition);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 获取公共条件 */
		public static getCommonConditionInfoByIndexAndType(value: number, commontype: Pb_God._emSkillCommonCondition): SkillValueTypeIntInfo
		{
			let tmpInfo = this.getCommonConditionInfosByIndex(value);
			let tmpResults = tmpInfo.filter(element => element.uType == commontype);
			return tmpResults.length > 0 ? tmpResults[0] : null;
		}

		/** 获取带等级公式的技能描述 */
		public static getExtDesByInfo(skillIndex: number, level: number = 0): string
		{
			let cfgInfo: SkillNewSkillCfgInfo = this.getInfo(skillIndex);
			if (!cfgInfo) return "";
			let des = cfgInfo.des;
			let reg = /\${(\d+)\+(\d+)\*level}/g;
			if (!reg.test(des)) return des;
			return des.replace(reg, ($1, $2, $3) =>
			{
				return (parseInt($2) + $3 * level) + "";
			});
		}


		public static isFightBack(index): boolean
		{
			var orderObj = this._skillOrderMap.get(index);
			if (orderObj == null)
			{
				var str: string = this.getSkillOrderBySkillIndex(index);
				if (str)
				{
					var arr: Array<any> = str.split(";");
					orderObj = TemplateUtil.convertNumArrToDic(arr);
				} else
				{
					orderObj = {};
				}
				this._skillOrderMap.put(index, orderObj);
			}
			return orderObj.hasOwnProperty(Pb_God._emSkillOrderType.SkillOrderType_FightBack + "");
		}

		public static isBigSkill(skillIndex): boolean
		{
			return cfg.SkillNewSkillCfgData.getSkillTypeBySkillIndex(skillIndex) == Pb_God._emSkillType.SkillType_Skill;
		}
	}
}

