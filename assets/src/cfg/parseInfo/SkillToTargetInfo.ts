
module cfg
{
	/*
     * 发起技能时产生选择目标
     */
    export class SkillToTargetInfo
    {
        /** 技能索引 */
        public SkillIndex: number;
        /** 目标类型 */
        public TargetType: Pro.BatCfg.SkillTargetType;
        /** 目标范围 */
        public TargetRangeType: Pro.BatCfg.SkillRangeType;
        /** 目标个数 */
        public TargetNum: number = 1;
        /** 目标优先条件值 */
        public mapTargetCondition: Array<SkillValueTypeIntInfo> = [];

        public static parse(skillIndex: number): SkillToTargetInfo
        {
            var tempInfo = new SkillToTargetInfo();
            tempInfo.SkillIndex = skillIndex;
            tempInfo.TargetType = cfg.SkillNewSkillCfgData.getTargetTypeBySkillIndex(skillIndex);

            let tmpRangeTypeStrAry = cfg.SkillNewSkillCfgData.getRangeTypeBySkillIndex(skillIndex).split("_");
            tempInfo.TargetRangeType = parseInt(tmpRangeTypeStrAry[0]);
            tempInfo.TargetNum = parseInt(tmpRangeTypeStrAry[1]);

            cfg.SkillNewSkillCfgData.getTargetConditionBySkillIndex(skillIndex).split(";").forEach(element =>
            {
                if (element.length > 0)
                {
                    tempInfo.mapTargetCondition.push(SkillValueTypeIntInfo.parseOne(element));
                }
            });

            return tempInfo;
        }

        public getTargetCondition(type: Pb_God._emSkillBuffCondition, uIndex: number): number
        {
            let results = this.mapTargetCondition.filter(element => element.uType == type);
            if (results.length == 0)
            {
                return 0;
            }
            if (uIndex >= results[0].length)
            {
                return 0;
            }
            return results[0][uIndex];
        }

        public getTargetCondtionValue(type: Pb_God._emSkillBuffCondition): SkillValueTypeIntInfo
        {
            let results = this.mapTargetCondition.filter(element => element.uType == type);
            return results.length > 0 ? results[0] : null;
        }
    }
}