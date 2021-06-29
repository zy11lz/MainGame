module Pro
{
    /**
     * 界面说明： 限时礼包购买界面（星级、等级、红装等）
    * @author jason.xu
    */
    export class LimitTimeGiftMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.TimeLimitGift.TimeLimitGiftUI;

        private _actIndexDataList: Pb_God.PBPlayerActivityIndexData[];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('timeLimitGift')];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return ["res/timeLimitGift/bg.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.TimeLimitGift.TimeLimitGiftUI, 1, BaseAddLayer.TopUI,true);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.Tween.clearTween(this.UIPanel.tabGrp);
            Laya.timer.clear(this, this.onTimer);
            //这里有一个比较坑爹的新手引导设定，获得5星英雄卡的时候， 一定要等这个界面关闭以后才正式开启引导
            FuncGuideMgr.Inst.checkPreFuncGuideTag(GuideStep.Func_Pet5StarEmbattle_1);
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
            //标记当天已经打开过界面了。
            TodayRepeatOpMgr.Inst.setTag("limitTimeGiftOpen");

            let act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_ShortTermGift);

            this._actIndexDataList = [];
            let uiTabDatas: component.UITabData[] = [];
            if (act_data)
            {
                for (let indexData of act_data.indexdata)
                {
                    this._actIndexDataList.push(indexData)
                    // 每个开启的限时礼包活动id 对应
                    let tab_name = cfg.ActivityShortTermGiftCfgData.getTabNameByIndex(indexData.index);
                    uiTabDatas[uiTabDatas.length] = new component.UITabData(tab_name);
                }
            }
            if (uiTabDatas.length == 0)
            {
                logE("limit time gift activity error!");
                return;
            }
            this.UIPanel.tabBox.visible = uiTabDatas.length > 1;
            let isCanScroll = uiTabDatas.length > 4;
            // if (isCanScroll) this.UIPanel.tabGrp.hScrollBarSkin = null; //模向可滚动
            this.UIPanel.btnTabLeft.visible = this.UIPanel.btnTabRight.visible = isCanScroll;
            //主分页按钮
            this.UIPanel.tabGrp.onClick(this, this.onClickTab, uiTabDatas);
            this.UIPanel.tabGrp.setSelectTab(0);

            this.UIPanel.tabGrp.scrollTo(0);

            Laya.timer.loop(500, this, this.onTimer);
            this.onTimer();

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnTabLeft.onClick(this, this.onClickTabLeft);
            this.UIPanel.btnTabRight.onClick(this, this.onClickTabRight);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }


        /** 切换主分页 */
        private onClickTab(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this.setData(this._actIndexDataList[tabIndex]);
        }

        /** 滚动主分页 */
        private onClickTabLeft(): void
        {
            this.turnTabBar(-1);
        }
        /** 滚动主分页 */
        private onClickTabRight(): void
        {
            this.turnTabBar(1);
        }

        private turnTabBar(turnDir: number): void
        {
            let target = this.UIPanel.tabGrp.scrollBar.value + turnDir * 292;
            Laya.Tween.to(this.UIPanel.tabGrp.scrollBar, { value: target }, 300);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        protected setData($data: Pb_God.PBPlayerActivityIndexData): void
        {
            // 活动是否开启
            let isActOpen = ActivityDataMgr.isActIndexDataExist(Pb_God._emActivityType.Activity_ShortTermGift, $data.index);

            //活动剩余触发次数
            let actTriggerCount = ActivityDataMgr.getActivity_IndexDataValue($data, Pb_God._emActivityDataKey.Activity_Key_TriggerGiftNum) || 1;
            //活动最大触发次数
            let actTriggerMaxCount = ActivityDataMgr.getActivity_IndexDataValue($data, Pb_God._emActivityDataKey.Activity_Key_TriggerMaxGiftNum) || actTriggerCount;

            let termGiftCfgInfo = cfg.ActivityShortTermGiftCfgData.getInfo($data.index);
            let chargeCfgInfo = cfg.ChargeCfgData.getInfo(termGiftCfgInfo.productID);
            let rewards = cfg.ChargeCfgData.getAddItemAryByID(chargeCfgInfo.iD);

            if(rewards.length == 4)
            {
                this.UIPanel.itemListReward.alignSpaceX = 20
                this.UIPanel.itemListReward.valignSpaceY = 26
                this.UIPanel.itemListReward.width = 260
            }
            else
            {
                this.UIPanel.itemListReward.alignSpaceX = 10
                this.UIPanel.itemListReward.valignSpaceY = 14
                this.UIPanel.itemListReward.width = 360; 
            }

            //奖励预览
            this.UIPanel.itemListReward.onRefresh(rewards.length, this, (itemUI: ProUI.ActivityMain.TimeLimitGift.TimeLimitItemUI, index: number) =>
            {
                itemUI.norItemUI.setItemInfo(rewards[index],false,false);
                itemUI.norItemUI.BGImg.visible = false
                itemUI.itemCount.text = Global.numberToTuckString(rewards[index].itemcount);
            });

            let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
            let hasBuyCount = chargeInfo ? chargeInfo.buycount : 0;
            hasBuyCount += chargeCfgInfo.maxBuyCount * (actTriggerMaxCount - actTriggerCount)
            this.UIPanel.txtLimitCount.text = Global.getLangStr("common_buyLimit2", hasBuyCount, chargeCfgInfo.maxBuyCount * actTriggerMaxCount);

            let leftCount = chargeCfgInfo.maxBuyCount * actTriggerMaxCount - hasBuyCount;
            if (leftCount <= 0)
                this.UIPanel.txtBuyLable.text = Global.getLangStr("common_isBuy");//已购买
            else
                this.UIPanel.txtBuyLable.text = Global.getLangStr("activity_timeLimitGift_msg2", chargeCfgInfo.needMoney / 100);

            this.UIPanel.btnBuy.disabled = !isActOpen || leftCount <= 0;
            this.UIPanel.btnBuy.onClick(this, () =>
            {
                if (ActivityDataMgr.isActIndexDataExist(Pb_God._emActivityType.Activity_ShortTermGift, $data.index))
                {
                    PlatformDataMgr.onChargeRequest(chargeCfgInfo);
                }
                else
                {
                    this.closeUI();
                }
            });

            let strTarget = Global.getLangStr("activity_timeLimitGift_msg1_" + termGiftCfgInfo.trigger, termGiftCfgInfo.params);  //获得{0}星英雄....
            // this.UIPanel.htmlDesc.showText = Global.getLangStr("activity_timeLimitGift_msg1", strTarget, termGiftCfgInfo.desc);
            //返利显示
            // this.UIPanel.txtRebate.text = termGiftCfgInfo.rebate + "";

            //倒计时数据            
            let actStartTimer = ActivityDataMgr.getActivity_IndexDataValue($data, Pb_God._emActivityDataKey.Activity_Key_TriggerGiftTime);
            this._timerTarget = actStartTimer + termGiftCfgInfo.duration * 60;
        }

        private _timerTarget = 0;
        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let leftTimer = this._timerTarget - TimeController.currTimer / 1000;
            if (leftTimer < 0)
            {
                this.UIPanel.txtTimer.text = Global.getLangStr("activity_msg23");
                return;
            }
            this.UIPanel.txtTimer.text = Global.GetRemindTime(leftTimer, 9);

        }

    }
}