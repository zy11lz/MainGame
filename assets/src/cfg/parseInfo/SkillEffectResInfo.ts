
module cfg
{
    /**
     * 技能序列帧特效表现配置表
     */
    export class SkillEffectResInfo
    {
        /**
         * 资源路径文件夹
         */
        public resFold: string;
        /**
         * 资源数
         */
        public frameCount: number;
        /**
         * 添加显示层级,0:目标角色前，1:目标角色背后
         */
        public zorder: number = 0;

        public static parse(str: string): Array<SkillEffectResInfo>
        {
            str = str.replace("\n", "");
            var arr: Array<SkillEffectResInfo> = [];
            var array: Array<string> = str.split(";");
            for (var index = 0; index < array.length; index++) 
            {
                var subStr: string = array[index];
                if (subStr == "" || subStr == " ")
                {
                    continue;
                }
                var subArr = subStr.split("|");
                var info = new SkillEffectResInfo();

                info.resFold = subArr[0];
                info.frameCount = parseInt(subArr[1]);
                info.zorder = subArr.length >= 2 ? parseInt(subArr[2]) : 0;
                arr.push(info);
            }
            return arr;
        }
    }
}