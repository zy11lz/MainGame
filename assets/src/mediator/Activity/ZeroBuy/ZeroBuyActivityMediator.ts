module Pro
{
    /**
     * 界面说明： 0元购（少女狂欢节）活动界面
    * @author jason.xu
    */
    export class ZeroBuyActivityMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.ZeroBuy.ZeroBuyUI;
        //public UIOpenData: BaseOpenUIData;

        /** 当前对应的活动id */
        private _actId: number;
        /** 当前界面展示的列表 */
        private _list: cfg.ActivityZeroBuyCfgInfo[];
        /** 当前选中的tabindex */
        private _tabIndex = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('zerobuyAct')];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            return [
                "res/zerobuyAct/bg.png"
            ]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.ZeroBuy.ZeroBuyUI, 1, BaseAddLayer.TopUI, true);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.Tween.clearTween(this.UIPanel.listTab);
            Laya.timer.clear(this, this.onTimer);
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
            this.UIPanel.ani1.play();
            TodayRepeatOpMgr.Inst.setTag("zeroBuyActOpen");
            this._actId = this.UIOpenData.customObject;
            this._list = cfg.ActivityZeroBuyCfgData.getListByActId(this._actId);
            //按钮显示还原
            this.UIPanel.imgBuyBtnFrame.frame = 1;

            if (this._list.length)
            {
                this.UIPanel.imgTitle.skin = `res/Unpack/zeroBuyAct/${ this._list[0].titleIcon }.png`;
            } else
            {
                GameLaunch.PostClientLog("ZeroBuyActivityMediator: this._actId = " + this._actId);
            }


            let isCanScroll = this._list.length >= 4;
            this.UIPanel.btnTabGrpLeft.visible = this.UIPanel.btnTabGrpLeft.visible = isCanScroll;
            this.UIPanel.listTab.setDragStatue(isCanScroll);

            this.UIPanel.listTab.onRefreshWithArray(this._list, this, this.onRefreshTabItem);

            //活动倒计时
            this._timerTarget = ActivityDataMgr.getActivityEndTimeStamp(this._actId);
            Laya.timer.loop(500, this, this.onTimer);
            this.onTimer();

            //默认选中第一个没有购买的分页
            this._tabIndex = -1;
            this.showDefaultTab();
        }

        /** tab刷新 */
        private onRefreshTabItem(itemUI: ProUI.ActivityMain.ZeroBuy.TabBtnUI, index: number): void
        {
            let issel = this._tabIndex == index;
            itemUI.imgSel.visible = issel;

            let cfgInfo = this._list[index];
            itemUI.imgIcon.skin = `res/Unpack/zeroBuyAct/${ cfgInfo.tabIcon }.png`;
            itemUI.txtName.text = cfgInfo.name;
            itemUI.txtName.color = issel ? "#fff952" : "#ffc98a";
            //   itemUI.txtName.strokeColor = issel ? "#65330d" : "#70147e";

            itemUI.btn.onClick(this, () =>
            {
                this.shiftTab(index);
            })
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnBuy.onClick(this, this.onClickBuy);
            this.UIPanel.btnBuy.on(Laya.Event.MOUSE_DOWN, this, this.onBuyBtnMouseDown);
            this.UIPanel.btnBuy.on(Laya.Event.MOUSE_UP, this, this.onBuyBtnMouseUp);
            this.UIPanel.btnBuy.on(Laya.Event.MOUSE_OUT, this, this.onBuyBtnMouseUp);
            this.UIPanel.btnTabGrpLeft.onClick(this, this.onClickTabLeft);
            this.UIPanel.btnTabGrpRight.onClick(this, this.onClickTabRight);

            this.UIPanel.listTab.scrollBar.on(Laya.Event.CHANGE, this, this.onChangeListTabPosition);

            this.addEventMgr(EventNotify.Activity_Update, this, this.onActivityUpdate);
            this.addEventMgr(EventNotify.NormalAwardUIClose, this, this.showDefaultTab); //关闭领奖后切找到下一个默认分页
            this.addEventMgr(CmdEvent.Common_TimeEvent, this, this.onNewDay);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 活动状态变化  */
        private onActivityUpdate(actId: number): void
        {
            if (actId != this._actId) { return; }
            this.refreshBuyState();
        }

        /** 新的一天 */
        private onNewDay(): void
        {
            this.refreshConditionView();
            this.refreshBuyState();
        }

        /** 列表位置有变化时 */
        private onChangeListTabPosition(): void
        {
            let scrollBarMaxValue = this.UIPanel.listTab.scrollBar.max;
            let scrollBarValue = this.UIPanel.listTab.scrollBar.value;
            //判断两端的按钮显示
            this.UIPanel.btnTabGrpLeft.disabled = scrollBarValue <= 1;
            this.UIPanel.btnTabGrpRight.disabled = scrollBarValue >= scrollBarMaxValue - 1;
        }

        private showDefaultTab(): void
        {
            let defaultIndex = 0;
            let actData = ActivityDataMgr.getActivityDataById(this._actId);
            //找到第一个未购买的显示即可
            for (let i = 0; i < this._list.length; i++)
            {
                let cfgInfo = this._list[i];
                //目前只有一个购买记录的数据，也就是只要有数据，就是购买过了。
                if (actData && actData.acquired.indexOf(cfgInfo.index) >= 0) { continue; }
                defaultIndex = i;
                break;
            }
            this.UIPanel.listTab.scrollTo(defaultIndex);
            this.shiftTab(defaultIndex);
            this.onChangeListTabPosition();
        }

        /** 切换到分页 */
        private shiftTab(tabIndex: number): void
        {
            if (tabIndex == this._tabIndex) { return; }
            let oldTabIndex = this._tabIndex;
            this._tabIndex = tabIndex;

            //重置分页按钮状态
            if (oldTabIndex >= 0) { this.UIPanel.listTab.setItem(oldTabIndex, this._list[oldTabIndex]); }
            if (tabIndex >= 0) { this.UIPanel.listTab.setItem(tabIndex, this._list[tabIndex]); }

            let cfgInfo = this._list[tabIndex];
            // //价格显示
            this.UIPanel.txtPrice3.text = cfgInfo.needItem.split("_")[1];
            //奖励预览
            let rewards = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "$addItemArrInfo");
            this.UIPanel.listRewards.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(rewards[index]);
            });

            this.refreshBuyState();
            this.refreshConditionView();
        }

        /** 刷新购买与返还状态 */
        private refreshBuyState(): void
        {
            let cfgInfo = this._list[this._tabIndex];
            let actData = ActivityDataMgr.getActivityDataById(cfgInfo.activityID);
            //购买与返还状态
            let isBuy = actData && actData.acquired.indexOf(cfgInfo.index) >= 0;
            this.UIPanel.btnBuy.visible = !isBuy;
            this.UIPanel.imgIsBuy.visible = false;
            this.UIPanel.imgIsReturn.visible = false;
            if (isBuy)
            {
                //是否已经返还
                let actIndexData = ActivityDataMgr.getActivity_IndexDataById(cfgInfo.activityID, cfgInfo.index);
                //这个购买时间， 服务器说返还之的就会删掉,  所以只要这个没有值，就说明已返还了
                let isReturn = actIndexData == null || !ActivityDataMgr.getActivity_IndexDataValue(actIndexData, Pb_God._emActivityDataKey.Activity_Key_BuyTime);
                this.UIPanel.imgIsBuy.visible = !isReturn;
                this.UIPanel.imgIsReturn.visible = isReturn;
            } else
            {
                //按钮显示还原
                this.UIPanel.imgBuyBtnFrame.frame = 1;
            }
        }

        /** 刷新当前分页的购买条件显示 */
        private refreshConditionView(): void
        {
            let cfgInfo = this._list[this._tabIndex];
            //将条件达成的排前面，红色的排后面。
            let arrFinishString: string[] = []; //达成条件的
            let arrNoFinishString: string[] = []; //未达成条件的

            let strTemp = "";
            //战队等级
            if (cfgInfo.level > 0)
            {
                strTemp = Global.getLangStr("zero_buy_act_msg1", cfgInfo.level);
                //条件不足时，加个红色
                if (cfgInfo.level > PlayerDataMgr.level)
                { arrNoFinishString[arrNoFinishString.length] = Global.getLangStr("common_html_red", strTemp); }
                else
                { arrFinishString[arrFinishString.length] = strTemp; }
            }
            //VIP等级
            if (cfgInfo.vIP > 0)
            {
                strTemp = Global.getLangStr("zero_buy_act_msg2", cfgInfo.vIP);
                //条件不足时，加个红色
                if (cfgInfo.vIP > PrivilegeDataMgr.vipLevel)
                { arrNoFinishString[arrNoFinishString.length] = Global.getLangStr("common_html_red", strTemp); }
                else
                { arrFinishString[arrFinishString.length] = strTemp; }
            }
            //开服天数
            if (cfgInfo.day > 1)
            {
                let currTime = TimeController.currTimer;
                let openSeverTime = cfg.ActivityCfgData.getIsMergeByID(cfgInfo.activityID) ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
                let passDay = (currTime - openSeverTime) / (24 * 3600 * 1000);
                strTemp = Global.getLangStr("zero_buy_act_msg3", cfgInfo.day);
                //条件不足时，加个红色
                if (cfgInfo.day > passDay + 1)
                { arrNoFinishString[arrNoFinishString.length] = Global.getLangStr("common_html_red", strTemp); }
                else
                { arrFinishString[arrFinishString.length] = strTemp; }
            }

            this.UIPanel.htmlCondition.showText = arrFinishString.concat(arrNoFinishString).join("&#160;&#160;&#160;"); ////空白占位符 &#160;

        }

        /** 点击下方分组按钮的滚动按钮（左） */
        private onClickTabLeft(): void
        {
            this.turnTabBar(-1);
        }

        /** 点击下方分组按钮的滚动按钮（右） */
        private onClickTabRight(): void
        {
            this.turnTabBar(1);
        }

        /** 购买按钮按下时，要切换样式 */
        private onBuyBtnMouseDown(): void
        {
            this.UIPanel.imgBuyBtnFrame.frame = 2;
        }
        /** 购买按钮按下时，要切换样式 */
        private onBuyBtnMouseUp(): void
        {
            this.UIPanel.imgBuyBtnFrame.frame = 1;
        }

        private turnTabBar(turnDir: number): void
        {
            let target = this.UIPanel.listTab.scrollBar.value + turnDir * 210;
            Laya.Tween.to(this.UIPanel.listTab.scrollBar, { value: target }, 250);
        }

        /** 购买 */
        private onClickBuy(): void
        {
            //判断活动是否已结束
            if (this._timerTarget - TimeController.currTimer / 1000 < 0)
            {
                TipsUtils.showTipsByLanId("activity_msg23");
                return;
            }
            let cfgInfo = this._list[this._tabIndex];
            //钻石是否足够
            let needItem = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.needItem, "needItemInfoArr");
            if (!Global.isFullAllRes(needItem, true)) { return; }
            ActivitySend.drawReward(cfgInfo.activityID, cfgInfo.index, 1);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            //按钮显示还原
            this.UIPanel.imgBuyBtnFrame.frame = 1;
        }


        private _timerTarget = 0;
        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let leftTimer = this._timerTarget - TimeController.currTimer / 1000;
            if (leftTimer < 0)
            {
                this.UIPanel.htmlTimer.showText = Global.getLangStr("activity_msg23");
            } else
            {
                this.UIPanel.htmlTimer.showText = Global.getLangStr("zero_buy_act_msg4", Global.GetRemindTime(leftTimer, 9));
            }
        }
    }
}