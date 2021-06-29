module Pro
{
    /**
    * 界面说明： 超值月基金总界面（对应多个基金类型的分页）
    * @author jason.xu
    */
    export class MonthFundMediator extends ActivityMediatorBase
    {

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("activitymain"), UrlMgr.getAtlas("wealhall")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return [
                "res/Unpack/exchangeshop/pic_bg_yuejijin01.jpg",
                "res/Unpack/exchangeshop/pic_bg_yuejijin02.jpg",
                "res/Unpack/exchangeshop/pic_bg_hongshengka.jpg"];
        }

        public closeUI(): void
        {
            super.closeUI();
        }

        /** 获取分页列表，可在此方法中筛选正在开启中的活动 每个列表元素为一个数组结构：
         * [分页名(对应中文包名activity_title_XXX), 按钮图片名（空值时表示与分页名相同），分页视图类名，红点model，传给分页的参数] 
         * */
        protected getPageDataList(): any[][]
        {
            let ret = [];
            //超值月基金
            let activityIds = cfg.ActivityFundCfgData.getActivityIdList();
            for (let i = 1; i <= activityIds.length; i++)
            {
                let activityId = activityIds[i - 1];
                if (!ActivityDataMgr.checkActivityOpenState(activityId)) continue;
                let ActivityCfg = cfg.ActivityCfgData.getInfo(activityId);
                //默认打开最后一个未激活的分页
                let chargeCfgInfo = cfg.ChargeCfgData.getInfo(parseInt(cfg.ActivityCfgData.getParamByID(activityId)));
                let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
                let isActive = false;
                if (ActivityCfg.sonType == 1)//月基金
                {
                    if (chargeInfo && chargeInfo.buycount > 0) //如果有购买信息，还需检查一次最后的购买时间往后推30天是否还在有效期内。
                    {
                        isActive = Global.getLaterDayTime(chargeInfo.lastbuytime * 1000, 30) > TimeController.currTimer;
                    }
                    ret[ret.length] = ["monthfund" + i, "huoidong_yuejijin_0" + i, WealHallMonthFundView, ActivityDataMgr.reddotModel.getChildModel("monthFund").getChildModel(i), [i, activityId]];
                }
                else if (ActivityCfg.sonType == 2)  //终身卡
                {
                    if (chargeInfo && chargeInfo.buycount > 0)//终身卡购买后一直在有效期内。
                    {
                        isActive = true;
                    }
                    //终身卡一直在第一个
                    ret.unshift(["monthfund" + i, "huoidong_yuejijin_0" + i, WealHallLifelongFundView, ActivityDataMgr.reddotModel.getChildModel("monthFund").getChildModel(i), [activityId]])
                }

                if (!isActive) this.UIOpenData.customObject = "monthfund" + i;
            }
            return ret;
        }

    }
}