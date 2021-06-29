
module cfg
{
	/*
     * 发起技能时产生伤害数据
     */
    export class SkillToDamage
    {

        /** 使用自己的伤害 */
        public bDamagUseSelf: boolean;
        /** 使用伤害属性的类型 */
        public uDamageAttrType: number;
        /** 伤害百分比 */
        public uDamageRadio: number;
        /** 伤害次数 */
        public uDamageCount: number;
        /** 无视防御百分比 */
        public uDamageIgnorDefense: number;

        public static parse(str: string): SkillToDamage
        {
            var subArr = str.split("_");
            var info = new SkillToDamage();
            info.bDamagUseSelf = (subArr.length > 0 ? parseInt(subArr[0]) : 0) > 0;
            info.uDamageAttrType = subArr.length > 1 ? parseInt(subArr[1]) : 1;
            info.uDamageRadio = subArr.length > 2 ? parseInt(subArr[2]) : 0;
            info.uDamageCount = subArr.length > 3 ? parseInt(subArr[3]) : 1;
            info.uDamageIgnorDefense = subArr.length > 4 ? parseInt(subArr[4]) : 0;
            return info;
        }
    }
}