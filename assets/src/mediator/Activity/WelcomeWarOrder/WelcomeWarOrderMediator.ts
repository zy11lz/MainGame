module Pro
{
    /**
    * 迎新战令
    */
    export class WelcomeWarOrderMediator extends BaseMediator implements IMediator
    {
        public UIPanel: any;

        private _progressBox: Laya.Box;

        private _iconList: any[];

        private _cellHeight = 130;

        private _bar: any;

        private _groupUI: any;

        /** 当前周期的结束时间 */
        protected _endTime: number;
        private _maxShowTime: number = 60 * 60 * 24 * 100;

        /** 当前活动参数*/
        private _activityID: cfg.ActivityCfgInfo;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('warorder'), UrlMgr.getAtlas("welcomeWarOrder")];
        }

        public openUI(): void
        {
            //多个ui
            if (this.UIPanel)
            {
                this.destoryUIPanel();
            }

            switch (this.UIOpenData.customObject)
            {
                case 6103://春节战令
                    this._groupUI = ProUI.ActivityMain.WelcomeWarOrder.WarOrder6103UI;
                    break;
                case 6105://进阶战令
                    this._groupUI = ProUI.ActivityMain.WelcomeWarOrder.WarOrder6105UI;
                    break;
            }
            this._activityID = cfg.ActivityCfgData.getInfo(this.UIOpenData.customObject);
            this.showPanel(this._groupUI, 0, 1, false, 2);

        }

        private adjustScreenPos()
        {
            this.UIPanel.height = GameConfig.curHeight();
            this.UIPanel.y = 0;

        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            Laya.timer.frameOnce(3, this, () =>
            {
                this.UIPanel.list.scrollBar.elasticDistance = 0;
            })

            this._iconList = [];
            this.adjustScreenPos();

        }

        private onRender(itemUI: ProUI.ActivityMain.WelcomeWarOrder.ChildView.RewardItemUI, index: number)
        {
            let allInfos = cfg.ActivityWarOrderLevelCfgData.getAllList(this._activityID.iD);
            let info = allInfos[index];
            itemUI.txtLevel.text = info.score + "";
            let normal = cfg.ActivityWarOrderLevelCfgData.getAddItemAryById(info)[0]
            if (normal)
                itemUI.norItem.setItemInfo(normal);
            else
                itemUI.norItem.setEmptyInfo();

            let normalHaveGot = ActivityDataMgr.checkWelcomeWarOrderHaveGet(false, info);
            let specialHaveGot = ActivityDataMgr.checkWelcomeWarOrderHaveGet(true, info);
            let normalCanGot = ActivityDataMgr.checkWelcomeWarOrderCanGet(false, info);
            let specialCanGot = ActivityDataMgr.checkWelcomeWarOrderCanGet(true, info);

            itemUI.imgNormalGet.visible = normal && normalHaveGot;
            itemUI.imgAdvanceGet.visible = specialHaveGot;



            let special = cfg.ActivityWarOrderLevelCfgData.getSpecialAddItemAryById(info);
            itemUI.listAdvance.onRefresh(special.length, this, (norItemUI: NorItemUI, idx: number) =>
            {
                norItemUI.setItemInfo(special[idx]);

                let extraImgLock = norItemUI.getChildByName("extraImgLock") as Laya.Image;
                extraImgLock.visible = info.score > ActivityDataMgr.getWelcomeWarOrderScore(this._activityID.iD) || !ActivityDataMgr.checkBuyWelcomeWarOrder(info.activityID);
            });

            (itemUI.norItem.getChildByName("extraImgLock") as Laya.Image).visible = info.score > ActivityDataMgr.getWelcomeWarOrderScore(this._activityID.iD) && normal != null;

            itemUI.btnGet.offAll();
            if ((normalCanGot && !normalHaveGot) || (specialCanGot && !specialHaveGot))
            {
                itemUI.btnGet.on(Laya.Event.CLICK, this, () =>
                {
                    ActivitySend.drawReward(this._activityID.iD, info.level, 0)
                })
                itemUI.btnGet.visible = true;
            }
            else
            {
                itemUI.btnGet.visible = false;
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnGet.on(Laya.Event.CLICK, this, this.onGetClick);
            this.UIPanel.btnHelp.onClick(this, this.onHelpClick);
            this.UIPanel.btnTask.onClick(this, this.onTaskClick);
            this.UIPanel.btnWarOrder.onClick(this, this.onWarOrderClick);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.addEventMgr(Cmd.S2C_Common_ExpendSyn.cmdName, this, this.refreshUI);
            this.addEventMgr(CmdEvent.Common_TimeEvent, this, this.closeUI);
            this.addEventMgr(EventNotify.Privilege_Card_Change, this, this.refreshUI);
            this.addEventMgr(CmdEvent.Achieve_SyncWarOrderLevel, this, this.refreshUI);
        }

        private onGetClick()
        {
            ActivitySend.drawRewardOneKey(this._activityID.iD, 0);
        }

        private onHelpClick(btn: component.UIButton)
        {
            CommonHelpView.showWithLangKey(btn, "zhanlingSF_help");
        }

        private onTaskClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Task));
        }


        private onWarOrderClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Welcome_War_Order_Charge, this._activityID.iD));
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 关闭UI*/
        closeUI(): void
        {
            Laya.timer.clear(this, this.onTimer);
            this._progressBox.destroy();
            this._progressBox = null;
            super.closeUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            EventMgr.trigger(EventNotify.WarOrderRed_Update);
            let warParam = cfg.ActivityCfgData.getchangeID(this._activityID.iD);
            this.UIPanel.lblScore.text = Global.getItemNum(warParam.currencyID) + "";

            //  let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_WarOrder)[0];

            //春节战令和其他战令走的不是同一套倒计时
            if (this._activityID.iD == 6103)
            {
                let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(this._activityID.iD);
                let iTime = cfg.ActivityCfgData.getIsMergeByID(this._activityID.iD) ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
                let act_end_time = openTimeInfo.getEndTime(TimeController.currTimer, iTime);
                this.UIPanel.lblTime.text = Global.GetRemindTime((act_end_time - TimeController.currTimer) / 1000, 9);
            } else
            {
                this._endTime = ActivityDataMgr.getActivityEndTimeStamp(this._activityID.iD);
                Laya.timer.loop(1000, this, this.onTimer);
                this.onTimer();
            }

            let allInfos = cfg.ActivityWarOrderLevelCfgData.getAllList(this._activityID.iD);

            this.UIPanel.list.onRefresh(allInfos.length - 1, this, this.onRender)

            this.UIPanel.btnWarOrder.gray = !ActivityDataMgr.checkBuyWelcomeWarOrder(this._activityID.iD);
            this.UIPanel.btnWarOrder.mouseEnabled = this.UIPanel.btnWarOrder.gray;

            this.refreshSingleUI();

            this.refreshProgress();

            this.UIPanel.redReceive.visible = ActivityDataMgr.WarOrderRed(this._activityID.iD);
        }

        /**
         * 刷新进度条
         * 该系统进度条反人类
         * 
         */
        private refreshProgress()
        {
            let allInfos = cfg.ActivityWarOrderLevelCfgData.getAllList(this._activityID.iD);
            if (!this._progressBox)
            {
                this._progressBox = new Laya.Box();
                let barBg = new Laya.Image("res/welcomeWarOrder/huodong_zhanling_jindutiao1.png");
                barBg.sizeGrid = "42,0,46,0";
                this._progressBox.addChild(barBg);
                let bar = new Laya.Image("res/welcomeWarOrder/huodong_zhanling_jindutiao4.png");
                bar.sizeGrid = "8,0,8,0";
                bar.width = 10;
                bar.pos(6, 6);
                barBg.addChild(bar);
                this._bar = bar;

                barBg.height = (allInfos.length - 1) * this._cellHeight;
                barBg.pos(108, this._cellHeight / 2);

                for (let i = 0; i < allInfos.length - 1; i++)
                {
                    let iconBg = new Laya.Image("res/welcomeWarOrder/huodong_zhanling_jindutiao2.png");
                    iconBg.anchorX = iconBg.anchorY = 0.5;
                    this._progressBox.addChild(iconBg);
                    let icon = new Laya.Image("res/welcomeWarOrder/huodong_zhanling_jindutiao5.png")
                    iconBg.addChild(icon);
                    iconBg.pos(barBg.x + 11, barBg.y + this._cellHeight * i);
                    this._iconList.push([icon, allInfos[i].score]);
                }
                this._progressBox.zOrder = 99;
                this.UIPanel.list.content.addChild(this._progressBox);
            }

            let myScore = ActivityDataMgr.getWelcomeWarOrderScore(this._activityID.iD)
            for (let i = 0; i < this._iconList.length; i++)
            {
                let icon = this._iconList[i][0];
                let score = this._iconList[i][1];
                icon.visible = score <= myScore;
            }
            let firstScore = cfg.ActivityWarOrderLevelCfgData.getFirstInfo().score;
            let lastScore = cfg.ActivityWarOrderLevelCfgData.getLastInfo(this._activityID.iD).score;
            this._bar.height = (this._bar.parent.height - 12) * (myScore - firstScore) / (lastScore - firstScore);

            this.UIPanel.singleIcon.visible = myScore >= lastScore;

            let lastSecScore = allInfos[allInfos.length - 2].score;
            this.UIPanel.singlePro.height = Math.min(Math.max(0, (myScore - lastSecScore) / (lastScore - lastSecScore)), 1) * (this.UIPanel.singleProBg.height - 12)

        }

        private refreshSingleUI()
        {
            let info = cfg.ActivityWarOrderLevelCfgData.getLastInfo(this._activityID.iD);

            this.UIPanel.singleLblScore.text = info.score + "";
            let normal = cfg.ActivityWarOrderLevelCfgData.getAddItemAryById(info)[0];
            if (normal)
                this.UIPanel.singleNorItem.setItemInfo(normal);
            else
                this.UIPanel.singleNorItem.setEmptyInfo();

            let normalHaveGot = ActivityDataMgr.checkWelcomeWarOrderHaveGet(false, info);
            let specialHaveGot = ActivityDataMgr.checkWelcomeWarOrderHaveGet(true, info);
            let normalCanGot = ActivityDataMgr.checkWelcomeWarOrderCanGet(false, info);
            let specialCanGot = ActivityDataMgr.checkWelcomeWarOrderCanGet(true, info);

            this.UIPanel.singleImgNormalGet.visible = normal && normalHaveGot;
            this.UIPanel.singleImgAdvanceGet.visible = specialHaveGot;

            let special = cfg.ActivityWarOrderLevelCfgData.getSpecialAddItemAryById(info);
            this.UIPanel.singleListAdvance.onRefresh(special.length, this, (norItemUI: NorItemUI, idx: number) =>
            {
                norItemUI.setItemInfo(special[idx]);

                let extraImgLock = norItemUI.getChildByName("extraImgLock") as Laya.Image;
                extraImgLock.visible = info.score > ActivityDataMgr.getWelcomeWarOrderScore(this._activityID.iD) || !ActivityDataMgr.checkBuyWelcomeWarOrder(this._activityID.iD);
            });

            (this.UIPanel.singleNorItem.getChildByName("extraImgLock") as Laya.Image).visible = info.score > ActivityDataMgr.getWelcomeWarOrderScore(this._activityID.iD) && normal != null;

            if ((normalCanGot && !normalHaveGot) || (specialCanGot && !specialHaveGot))
            {
                this.UIPanel.singleBtnGet.on(Laya.Event.CLICK, this, () =>
                {
                    ActivitySend.drawReward(this._activityID.iD, info.level, 0);
                })
                this.UIPanel.singleBtnGet.visible = true;
            }
            else
                this.UIPanel.singleBtnGet.visible = false;

        }


        /** 点击战令进阶按钮 */
        private onClickUpAdvance(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WarOrderCharge));
        }

        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let tmpPassTime = this._endTime - TimeController.currTimer / 1000;;
            if (tmpPassTime < 0)
            {
                tmpPassTime = 0;
            }
            if (tmpPassTime > this._maxShowTime)
            {
                this.UIPanel.lblTime.visible = false;
                return
            }
            this.UIPanel.lblTime.visible = true;
            this.UIPanel.lblTime.text = Global.GetRemindTime(tmpPassTime, 9);
        }

    }
}