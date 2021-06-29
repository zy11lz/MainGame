
module cfg
{
    /**
     * 技能配置表
     */
    export class SkillEffectInfo
    {

        /**
         * 帧动画名称
         */
        public aniName: string;

        /**
         * 序列帧资源路径文件夹
         */
        public resFoldAry: Array<SkillEffectResInfo> = [];

        public static parse(str: string): SkillEffectInfo
        {
            let tmpInfo = new SkillEffectInfo();
            if (str.length == 0)
            {
                return tmpInfo;
            }

            if (str.indexOf("|") == -1)
            {
                tmpInfo.aniName = str;
            }
            else
            {
                tmpInfo.resFoldAry = SkillEffectResInfo.parse(str);
            }

            return tmpInfo;
        }

        public isEmptyEffect(): boolean
        {
            return this.aniName == null && this.resFoldAry.length == 0;
        }

        public getDuration(): number
        {
            let tmpTime = 0;
            if (this.aniName != null)
            {
                let tmpInfo = cfg.EffectCfgData.getInfo(this.aniName);
                tmpTime = tmpInfo.editorFrame * GameConfig.EffDetalTime;  //保持与角色动作相同的帧率
            }
            else if (this.resFoldAry.length > 0)
            {
                let tmMaxFrame = 0;
                this.resFoldAry.forEach(elment =>
                {
                    if (elment.frameCount > tmMaxFrame)
                    {
                        tmMaxFrame = elment.frameCount;
                    }
                });
                tmpTime = tmMaxFrame * GameConfig.EffDetalTime;
            }
            return tmpTime;
        }
    }
}