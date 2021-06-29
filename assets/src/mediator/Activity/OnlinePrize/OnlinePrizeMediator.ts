module Pro
{
    /**
     * 界面说明： 在线礼包奖励
    * @author jason.xu
    */
    export class OnlinePrizeMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.OnlinePrize.OnlinePrizeUI;

        private eff_frames: EffNode[] = [];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('onlineprize')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.OnlinePrize.OnlinePrizeUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.onTimer);
            for (var i = 0; i < this.eff_frames.length; i++)
            {
                let el = this.eff_frames[i];
                // if (el) el.removeSelf();
                EffectMgr.Inst.releaseEffect(el);
            }
            this.eff_frames = [];
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshList();

            this.UIPanel.txtTimer.visible = this.UIPanel.txtTimeTitle.visible = true;
            this._targetTime = WealDataMgr.getOnlinePrizeAllNextTargetTime();
            Laya.timer.loop(500, this, this.onTimer);
            this.onTimer();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Weal_OnlinePrize, this, this.refreshList)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        private refreshList(): void
        {
            let allCfgList = cfg.WealOnlinePrizeCfgData.getAll();
            this.UIPanel.listView.onRefreshWithArray(allCfgList, this, this.onRefreshItem);
        }

        private onRefreshItem(tempUI: ProUI.ActivityMain.OnlinePrize.OnlinePrizeItemUI, index: number): void
        {
            let cfgInfo: cfg.WealOnlinePrizeCfgInfo = this.UIPanel.listView.getItem(index);
            let addItem = cfg.WealOnlinePrizeCfgData.getAddItemInfoByInfo(cfgInfo);
            tempUI.norItem.setItemInfo(addItem, false, true, true, false, false, false);
            //是否已经领取
            let isGet = WealDataMgr.onlinePrizeIndex >= cfgInfo.index;
            //是否可以领取
            let isCanGet = false;
            // tempUI.disabled = isGet; //安卓环境下，置灰不会深度处理，置灰的显示还不如不置灰，故改成mouseEnabled控制
            tempUI.mouseEnabled = !isGet;
            tempUI.imgGet.visible = isGet;
            let itemEffNode = this.eff_frames[index];
            tempUI.spMask.visible = isGet;
            if (!isGet)
            {
                //是否可以领取
                isCanGet = cfgInfo.time <= WealDataMgr.getOnlineTime();
                tempUI.btn.visible = isCanGet;
                tempUI.btn.onClick(this, () =>
                {
                    if (cfgInfo.index > WealDataMgr.onlinePrizeIndex + 1)
                    {
                        TipsUtils.showTipsByLanId("onlinePirze_msg3"); //请先领取前一个档次
                        return;
                    }
                    WealSend.onlinePrize(cfgInfo.index);
                })
            }
            tempUI.imgReddot.visible = isCanGet;
            if (isCanGet)
            {
            
                if (!itemEffNode)
                {
                    this.eff_frames[index] = EffectMgr.Inst.createEffectOne("ui_itemLightNew_0", new Laya.Point(1, 3), -1, 1.9, 0.7, tempUI.effPos, false, ResReleaseType.Reference, true);
                }
            } else if (itemEffNode)
            {
                // itemEffNode.removeSelf();
                EffectMgr.Inst.releaseEffect(itemEffNode);
                itemEffNode = null
                this.eff_frames[index] = null;
            }
        }

        private _targetTime = 0;
        private onTimer(): void
        {
            if (this._targetTime == 0)
            { //已经没有了
                Laya.timer.clear(this, this.onTimer);
                this.UIPanel.txtTimer.visible = this.UIPanel.txtTimeTitle.visible = false;
                return;
            }
            let leftTime = this._targetTime - TimeController.currTimer / 1000;
            this.UIPanel.txtTimer.text = Global.GetRemindTime(leftTime, 4);
            if (leftTime <= 0)
            { //到时间了，重置下一个时间，并刷新列表
                this._targetTime = WealDataMgr.getOnlinePrizeAllNextTargetTime();
                this.refreshList();
            }
        }

    }
}