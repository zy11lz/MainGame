module Pro
{
    /**
     * 通用的限时活动分类界面
     * 活动分页显示，比如一键牛逼
     * @author jason.xu
     */
    export class TimeLimitActivityMediator extends ActivityMediatorBase
    {

        /** 保存上一个数据， 便于回退处理 */
        private _saveOldData: BaseOpenUIData;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("sevenDayProgress"), UrlMgr.getAtlas("activitymain")];
        }

        /** 打开中的界面，重新设置uiopendata, 为保留以前的方案，基类不处理赋值， 有需要做更新处理的，子类可继续此方法。 */
        public resetUIOpenData(uiOpenData: BaseOpenUIData): void
        {
            if (this.UIPanel == null)
            {
                return;
            }
            //如果有重新拉起此界面，则基本是在本界面的分页内，执行了一次跳转到首页的操作， 也有可能是会跳转到其它活动配置的视图，但界面为通用的，所以需要做对应的重置， 并记录回退
            if (uiOpenData.customObject != this.UIOpenData.customObject)
            {
                //不是同一组活动，需要记录回退，并重新初始化界面
                this._saveOldData = this.UIOpenData;
                this._saveOldData.customObject2 = this.UIPanel.tabGrp.tabIndex;

                this.UIOpenData = uiOpenData;
                this.initUI();
            }
            else
            { //同一个活动，跳转到指定分页即可
                this.UIOpenData = uiOpenData;
                let defaultIndex = this.getDefaultTabIndex() || 0;
                if (this.UIPanel.tabGrp.tabIndex == defaultIndex)
                {
                    return;
                }
                this.UIPanel.tabGrp.setSelectTab(defaultIndex);
            }
        }

        protected getDefaultTabIndex(): number
        {
            return this.UIOpenData.customObject2 || 0;
        }

        public closeUI(): void
        {
            this._saveOldData = null;
            super.closeUI();
        }
        /** 子类可重写返回按钮的回调 */
        public onClickClose(): void
        {
            if (this._saveOldData)
            { //返回上一个
                this.UIOpenData = this._saveOldData;
                this._saveOldData = null;
                this.initUI();
            } else
            {
                this.closeUI();
            }
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            super.addEvent();
        }


        /** 获取分页列表，可在此方法中筛选正在开启中的活动 每个列表元素为一个数组结构：
         * [分页名(对应中文包名activity_title_XXX), 按钮图片名（空值时表示与分页名相同），分页视图类名，红点model，传给分页的参数]
         * */
        protected getPageDataList(): any[][]
        {
            let ret = [];
            // 活动分页类型递增
            let pageViewClsType = [
                TimeLimitBuyView,               // 礼包购买
                TimeLimitTotalChargeView,       // 累计充值
                TimeLimitDayChargeView,         // 积天豪礼(连续充值)
                WishDropCard,                   // 心愿抽卡
                RisingStarachievementsMediator, // 通用成就
                HuPaCallPageView,               // 胡帕抽卡
                RoadEvolvePageView,             // 进化之路
                ExChangeShopPageView,           // 兑换商店
                LimitHeroExChangePageView,      // 英雄兑换
                TimeLimitDiyView,               // 定制礼包     
                LimitHeroCallPageView,          // 英雄活动抽奖  11
                TimeLimitRealExchange,           // 限时兑换
                ActivityBossPageView];
            let loadRes = [
                [UrlMgr.getAtlas("timeLimitAct")],
                [UrlMgr.getAtlas("timeLimitAct")],
                [UrlMgr.getAtlas("timeLimitAct")],
                [UrlMgr.getAtlas("wishGacha")],
                [UrlMgr.getAtlas("timeLimitAct")],
                [UrlMgr.getAtlas("hupa")],
                [UrlMgr.getAtlas('roadEvolve')],
                [UrlMgr.getAtlas("activitymain")],
                [UrlMgr.getAtlas("shop")],
                [UrlMgr.getAtlas("timeLimitAct")],
                [UrlMgr.getAtlas("hupa")],
                [UrlMgr.getAtlas("timeLimitAct")],
                [UrlMgr.getAtlas("bossChallenge"), UrlMgr.getAtlas("timeLimitAct")]
            ];
            let actGrpId: number = this.UIOpenData.customObject || 1;
            let grpReddot = ActivityDataMgr.reddotModelCommonGrp.getChildModel(actGrpId);
            let pageList = cfg.ActivityCommonGroupPageCfgData.getListByGrpId(actGrpId);
            for (let pageCfgInfo of pageList)
            {
                //对应的活动列表
                let actIdList = pageCfgInfo.activityIds.split(";");
                //先检查一下是否有活动是开着的
                let openActIds: number[] = [];
                for (let actString of actIdList)
                {
                    let actId = parseInt(actString);
                    if (ActivityDataMgr.checkActivityOpenState(actId))
                    {
                        openActIds.push(actId);
                    }
                }
                //活动没有开启，就跳过这个分页了
                if (openActIds.length == 0) { continue; }
                //根据不同的类型, 处理不同的界面
                let pageViewCls: any = null;
                if (pageCfgInfo.type <= pageViewClsType.length) { pageViewCls = pageViewClsType[pageCfgInfo.type - 1] }
                if (!pageViewCls) { continue; }

                let pageReddot = grpReddot.getChildModel(pageCfgInfo.indexID);
                ret[ret.length] = [pageCfgInfo.pageName, pageCfgInfo.pageIcon, pageViewCls, pageReddot, [openActIds, pageCfgInfo], loadRes[pageCfgInfo.type - 1]];
            }
            return ret;
        }
    }
}