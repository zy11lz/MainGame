
module Pro
{
    /**
     * url 管理，
     * 所有的url地址都必须通过之类管理，
     * 不能在项目其他地方出现拼接url的代码
     * 版本管理也在这里
     * @author liuyang
     */
    export class UrlMgr
    {
        constructor()
        {

        }

        /** 数据表路径 */
        public static getConfigDataUrl(): string
        {
            let url = "res/cfg/config.byte";
            //调试环境给策划用的，加个随机数
            if (!GlobalData.isRelease)
            {
                url += "?v=" + Math.random();
            }
            return url;
        }

        public static getAtlas(name: string): string
        {
            let url = "res/atlas/res/" + name + ".atlas"
            return url;
        }

        public static getModelSkUrl(resId: string): string
        {
            var folder = resId.split("hero_")[1];
            // var fix = GameConfig.isUseFlySk ? ".v" : ".skel";
            // return "res/ani/skel/role/" + folder + "/" + resId + ".skel";
            //  return "res/ani/pvrct/role/" + folder + "/" + resId + ".pvrsk";
            if (SkelAniInit.isCanPvr)
            {
                return "res/ani/pvrct/role/" + folder + "/" + resId + ".pvrsk";
            } else
            {
                if (GameConfig.isUseFlySk)
                {
                    return "res/ani/fly/role/" + folder + "/" + resId + ".flysk";
                } else
                {
                    return "res/ani/skel/role/" + folder + "/" + resId + ".skel";
                }
            }

            // return "res/ani/fly/role/" + folder + "/" + resId + ".flysk";
            // return "res/ani/fly/role/" + resId + ".flysk";
            // return "res/ani/skel/role/" +  resId + ".skel";
        }

        public static getSpineSceneUrl(res: string): string
        {
            if (SkelAniInit.isCanPvr)
            {
                return `res/ani/pvrct/scene/` + res + ".pvrsk";
            } else
            {
                if (GameConfig.isUseFlySk)
                {
                    return `res/ani/fly/scene/` + res + ".flysk";
                } else
                {
                    return `res/ani/skel/scene/` + res + ".skel";
                }
            }
        }


        public static getYuanLingSkillUrl(res: string): string
        {
            return this.getSpineSceneUrl("tuteng/skill/" + res);//  "res/ani/effect/yuan_ling/skill/" + res + ".skel";
        }

        public static getUIBgUrl(res: string): string
        {
            return `res/Unpack/uibg/${ res }.jpg`;
        }

        public static getUnpackUrl(res: string): string
        {
            return `res/Unpack/` + res;
        }

        public static getLadderUrl(res: string): string
        {
            return `res/ladder/${ res }.png`;
        }

        public static getPeakUrl(res: string): string
        {
            return `res/peak/${ res }.png`;
        }

        public static getHolyUrl(res: string): string
        {
            return `res/heroHoly/${ res }.png`;
        }

        public static getArenaenterUrl(res: string): string
        {
            return `res/arenaenter/${ res }.png`;
        }

        public static getShopUrl(res: string): string
        {
            return `res/shop/${ res }.png`;
        }
        public static getCommonUrl(res: string): string
        {
            return `res/common/${ res }.png`;
        }

        public static getDayLimitBuyUrl(res: string): string
        {
            return `res/daylimitbuy/${ res }.png`;
        }

        public static getSmallBodyByUrl(res: string): string
        {
            return `res/Unpack/Icon/smallBody/${ res }.png`;
        }

        public static getLianLianKanUrl(res: string): string
        {
            return `res/lianliankan/${ res }.png`;
        }



        public static getHorcruxUrl(res: string): string
        {
            return `res/Unpack/Icon/Horcrux/${ res }.png`;
        }



        public static getCrossChallengeUrl(res: string): string
        {
            return `res/crossChallenge/${ res }.png`;
        }

        public static getArenaTop3Url(res: string): string
        {
            return `res/arenaTop3/${ res }.png`;
        }

        public static getRewardpopupUrl(res: string): string
        {
            return `res/rewardpopup/${ res }.png`;
        }

        public static getHeroupsucUrl(res: string): string
        {
            return `res/heroupsuc/${ res }.png`;
        }

        public static getActivityBossByIndex(index: number): string
        {
            return `res/battle/activityBoss_${ index }.png`;
        }

        public static getActivityBossProImg(res:string):string
        {
            return `res/battle/bar_boss${res}.png`
        }


    }
}