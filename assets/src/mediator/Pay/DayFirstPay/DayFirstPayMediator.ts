module Pro
{
    /**
    * 界面说明： 每日首充
    * @author jason.xu
    */
    export class DayFirstPayMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Pay.DayFirstPay.DayFirstPayUI;

        /** 礼包类型 */
        protected _packetType: Pb_God._emPrivilegeDailyPacket;
        /** 当前礼包对应的特权卡 */
        private _curPrivilegeCard = 0;
        private _effNode: EffNode;
        private _effTween:Laya.Tween;

        /**
        * 界面说明： 每日首充
        * @author jason.xu
        */;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("dayfirstpay")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/dayfirstpay/bg.png"];
        }

        public closeUI(): void
        {
            super.closeUI();

            Laya.timer.clear(this, this.openDefaultPage);
            //特效移除
            EffectMgr.Inst.releaseEffect(this._effNode)
            this._effNode = null;

            if (this._effTween != null)
            {
                Laya.Tween.clear(this._effTween);
                this._effTween = null;
            }
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Pay.DayFirstPay.DayFirstPayUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //主分页按钮
            this.UIPanel.tabGrp.onClick(this, this.onClickTabGrp,
                [new component.UITabData("dailyFirstPay_msg1"), new component.UITabData("dailyFirstPay_msg2"),
                new component.UITabData("dailyFirstPay_msg3")],
                [new component.UITabStyle("#f13a53"), new component.UITabStyle("#fffced")]
            );
            let reddotModel = PrivilegeDataMgr.reddotModelDailyCharge;
            let pageModels = [];
            for (let i = 0; i < 3; i++)
            {
                pageModels[i] = reddotModel.getChildModel("page" + i);
            }
            this.UIPanel.tabGrp.setRedDotModelList(pageModels);
        }


        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //标记当天已经打开过界面了。
            TodayRepeatOpMgr.Inst.setTag("dailyChargeOpen");

            this.UIPanel.tabGrp.tabIndex = 0;
            this.openDefaultPage();
        }


        /** 打开默认的分页(可领奖的分页) */
        private openDefaultPage(): void
        {
            let defaultPage = this.UIPanel.tabGrp.tabIndex;
            let reddotModel = PrivilegeDataMgr.reddotModelDailyCharge;
            for (let i = 0; i < 3; i++)
            {
                if (reddotModel.getChildModel("page" + i).isRedDot)
                {
                    defaultPage = i;
                    break;
                }
            }
            this.UIPanel.tabGrp.setSelectTab(defaultPage);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnPay.onClick(this, this.onClickPay);
            this.UIPanel.btnGetReward.onClick(this, this.onClickGetReward);

            this.addEventMgr(EventNotify.Privilege_Card_Change, this, this.onChangePrivilegeCard);
            this.addEventMgr(EventNotify.Privilege_Daily_Prize, this, this.onChangeDailyPrize);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 切换主分页 */
        private onClickTabGrp(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this._packetType = Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_DailyCharge + tabIndex;
            let cfgInfo = cfg.PrivilegeDailyPrizeCfgData.getInfo(this._packetType);
            if (!cfgInfo) { return; }
            this._curPrivilegeCard = cfgInfo.needCardID;
            //奖励预览
            // let cfgInfo = PrivilegeDataMgr.getVaildDailyFirstChargeCfgData();
            let addItems = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemInfoArr");
            this.UIPanel.listNoritem.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });

            this.refreshBtnState();
            this.refreshUI();
        }

        private onClickPay(): void
        {
            PlatformDataMgr.openChargeUI();
        }

        /** 领奖 */
        private onClickGetReward(): void
        {
            PrivilegeSend.dailyPrize(this._packetType);
        }

        /** 特权卡状态变化 */
        private onChangePrivilegeCard(cardId: number): void
        {
            if (cardId != this._curPrivilegeCard) { return; }
            this.refreshBtnState();
        }
        /** 领奖回调 */
        private onChangeDailyPrize(packetId: number): void
        {
            if (packetId != this._packetType) { return; }
            //延迟一点，因为红点刷新会延迟
            Laya.timer.once(200, this, this.openDefaultPage);
            this.refreshBtnState();
        }

        /** 刷新领奖状态 */
        private refreshBtnState(): void
        {
            //今天已充值
            let hasPay = PrivilegeDataMgr.getPrivilegeCardTotalCharge(this._curPrivilegeCard);
            let needPay = cfg.PrivilegeCardCfgData.getNeedMoneyByCardID(this._curPrivilegeCard);

            let isActive = PrivilegeDataMgr.getPrivilegeCardValid(this._curPrivilegeCard);
            //今天是否已领
            let isGet = PrivilegeDataMgr.getDailyPacketIsGot(this._packetType);

            let leftVaule = needPay - hasPay;
            if (leftVaule < 0 || isActive)
            {
                leftVaule = 0;
            }
            this.UIPanel.txtLeftPay.text = leftVaule + "";

            this.UIPanel.btnIsGet.visible = isGet;
            this.UIPanel.btnGetReward.visible = isActive && !isGet;
            this.UIPanel.btnPay.visible = !isActive;

            //特效添加
            // if (this.UIPanel.btnPay.visible && this._effNode == null)
            // {
            //     this.UIPanel.btnPay.skin = "";
            //     let tmpEffPos = new Laya.Point(this.UIPanel.btnPay.width / 2, this.UIPanel.btnPay.height / 2);
            //     this._effNode = EffectMgr.Inst.createLoopEffect("ui_shoucong_tips", tmpEffPos, -1, 1, 1, this.UIPanel.btnPay, ResReleaseType.Reference);
            // }

            if (this.UIPanel.btnPay.visible && this._effTween == null)
            {
                let from = { scaleX: 1.0, scaleY: 1.0 };
                let to = { scaleX: 1.05, scaleY: 1.05 };
                let target = this.UIPanel.btnPay;
                this._effTween = Laya.Tween.to(target, to, 1000, (t: number, b: number, c: number, d: number) =>
                {
                    t = Math.sin(t / d * Math.PI * 2) * d;
                    return Laya.Ease.linearNone(t, b, c, d);
                });
                this._effTween.repeat = 0;
            }
        }

        // private pingEase(t: number, b: number, c: number, d: number): number
        // {
        //     return c * t / d + b;
        // }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}