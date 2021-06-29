module Pro
{
    /**
     * 界面说明： 限时冲榜活动
    * @author jason.xu
    */
    export class RankActivityMediator extends ActivityMediatorBase
    {
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("activitymain"), UrlMgr.getAtlas('rankActivity')];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return ["res/rankActivity/xianshichongbang_pic03.jpg"];
        }

        public initUI()
        {
            super.initUI();
            if (!this.UIOpenData.customObject)
                return;
            EventMgr.trigger(EventNotify.RankActivity_Title, this.UIOpenData.customObject);
        }

        public closeUI(): void
        {
            super.closeUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            super.addEvent();
            // this.addEventMgr(EventNotify.Activity_Update, this, this.onActivityUpdate);
        }

        /** 在获取分页列表时，记录当前正在开启的活动，方便初始化时打开对应的分页 */
        private _defaultOpenIndex = 0;

        /** 获取分页列表，可在此方法中筛选正在开启中的活动 每个列表元素为一个数组结构：
         * [分页名(对应中文包名activity_title_XXX), 按钮图片名（空值时表示与分页名相同），分页视图类名，红点model，传给分页的参数] 
         * */
        protected getPageDataList(): any[][]
        {
            this._defaultOpenIndex = -1;
            //获取所有活动
            let allActivity = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Rank, 0);
            //[pagename,classname, reddot][]
            let ret = [];
            let currTimer = TimeController.currTimer;
            let openServTimer;
            let serverMergeState = TimeController.worldMergeTime > 0;
            for (let actCfgInfo of allActivity)
            {
                let isMerge = cfg.ActivityCfgData.getIsMergeByID(actCfgInfo.iD);
                if (serverMergeState != !!isMerge)
                {
                    continue;
                }
                openServTimer = isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
                let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(actCfgInfo.iD);
                let startTime = openTimeInfo.getStartTime(currTimer, openServTimer);
                //已过期或开启中，都显示到列表中， 未开启的就先不要显示
                if (startTime > currTimer) continue;
                let rankType = actCfgInfo.sonType;
                ret[ret.length] = ["RankAct" + rankType, "btn_rankact_" + rankType, RankActivityPageView, null, actCfgInfo];
            }

            ret.sort((a, b) =>
            {
                if (a[4].iD == 2105)
                {
                    return -1
                }
                else if (b[4].iD == 2105)
                {
                    return 1
                }
                else
                {
                    let openTimeInfoA = cfg.ActivityCfgData.getOpenTimeInfoByID(a[4].iD);
                    let openTimeInfoB = cfg.ActivityCfgData.getOpenTimeInfoByID(b[4].iD);
                    let endTimeA = openTimeInfoA.getEndTime(currTimer, openServTimer);
                    let endTimeB = openTimeInfoB.getEndTime(currTimer, openServTimer);
                    if (endTimeA > currTimer && endTimeB > currTimer)
                    {
                        return endTimeA - endTimeB
                    }
                    return endTimeB - endTimeA;
                }
            })

            //找一个开启状态中，开启时间最近的作为默认选择的分页
            let minStartTime;
            for (let i = 0; i < ret.length; i++)
            {
                let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(ret[i][4].iD);
                let TargetTime = openTimeInfo.getEndTime(currTimer, openServTimer);
                let leftTime = TargetTime - currTimer;
                if (leftTime < 0) continue;
                if (minStartTime && leftTime < minStartTime)
                {
                    this._defaultOpenIndex = i;

                }
                minStartTime = leftTime;
            }

            return ret;
        }

        protected getDefaultTabIndex(): number
        {

            if (this._defaultOpenIndex < 0) return 0;
            return this._defaultOpenIndex;

        }

    }
}