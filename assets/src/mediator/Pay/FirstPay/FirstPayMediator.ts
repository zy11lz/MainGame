module Pro
{
    /**
    * 界面说明： 首充
    * @author jason.xu
    */
    export class FirstPayMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Pay.FirstPay.FirstPayUI;

        /** 当前可领奖的index  0表示未激活 */
        private _rewardIndex = 0;
        /** 当前分页对应的活动ID */
        private _activityId = 0;

        private _effNodes: EffNode[] = [];
        // private _firstPayEffect: EffNode;

        private _sk: SkeletonPlayer;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("firstpay")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/firstpay/bg1.png", "res/firstpay/bg2.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Pay.FirstPay.FirstPayUI, 1, BaseAddLayer.TopUI,true);
        }

        public closeUI(): void
        {
            this.cleanEffectNode();
            this.showBtnEffect(false);
            Laya.timer.clear(this, this.openDefaultPage);
            // Global.removeAtkerRole(this.UIPanel.avatarBox, true);
            super.closeUI();
        }
        private cleanEffectNode(): void
        {
            for (var i = 0; i < this._effNodes.length; i++)
            {
                let el = this._effNodes[i];
                if (el)
                {
                    // el.removeSelf();
                    EffectMgr.Inst.releaseEffect(el);
                }
            }
            this._effNodes = [];
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.tabGrp.onClick(this, this.onClickTabGroup,
                [new component.UITabData("firstPay_tab1"), new component.UITabData("firstPay_tab2")],  //首充赠礼、100元赠礼
                [new component.UITabStyle("#fff9db"), new component.UITabStyle("#fff9db")]
            );
            this.UIPanel.tabGrp.onRenderRefresh(this, this.onItemTabRender);

            this.initAni();
        }

        private initAni()
        {
            let sk = new Pro.SkeletonPlayer();
            sk.load(UrlMgr.getSpineSceneUrl("UIeffect/shouchong"));
            this.UIPanel.btnGo.addChild(sk);
            sk.playByIndex(0, true);
            sk.scale(2, 2);
            sk.pos(110, 28);
            this._sk = sk;
        }

        private onItemTabRender(itemUI: component.UIButton, index: number)
        {
            let isSel = index == this.UIPanel.tabGrp.tabIndex;
            let frameImg = itemUI.getChildByName("frameImg") as component.UIFrameImage;
            let label = itemUI.getChildByName("Text") as component.UILabel;
            let reddot = itemUI.getChildByName("RedDotImg") as Laya.Image;
            frameImg.frame = isSel ? 2 : 1;
            frameImg.scaleX = index == 0 ? 1 : -1;
            label.x = index == 0 ? 113 : 88;
            reddot.x = index == 0 ? 0 : 178;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //标记当天已经打开过界面了。
            TodayRepeatOpMgr.Inst.setTag("firstPayOpen");
            //红点
            let reddotModel = ActivityDataMgr.reddotModel.getChildModel("firstPay");
            let redDotModes = [
                reddotModel.getChildModel(0),
                reddotModel.getChildModel(1)
            ]
            this.UIPanel.tabGrp.setRedDotModelList(redDotModes);

            //打开默认分页
            this.UIPanel.tabGrp.tabIndex = 0;
            this.openDefaultPage();
            this.refreshUI();
        }

        /** 打开默认的分页(未领奖的分页) */
        private openDefaultPage(): void
        {
            let defaultPage = this.UIPanel.tabGrp.tabIndex;
            for (var i = 0; i < 2; i++)
            {
                //拿到活动id
                let cfgList = cfg.ActivityFirstChargeCfgData.getListByAmountIndex(i);
                let activityId: number = cfgList[0].activityID;
                let chargeAmount = ActivityDataMgr.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_ChargeAmount);
                if (chargeAmount < cfgList[0].amount)
                { //没激活
                    defaultPage = i;
                    break;
                }
                //     首充上次领取的时间;
                let lastGetTime = ActivityDataMgr.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_FirstChargeLastTime);
                //     首充已经领取的天数;
                let getDay = ActivityDataMgr.getActivity_DataValue(activityId, Pb_God._emActivityDataKey.Activity_Key_FirstChargeDay);
                //全部领完了
                if (getDay >= cfgList.length) { continue; }
                //上次领的时候是今天，也就是说今天领过了
                if (new Date(lastGetTime * 1000).toDateString() === new Date(TimeController.currTimer).toDateString()) { continue; }
                defaultPage = i;
                break;
            }
            this.UIPanel.tabGrp.setSelectTab(defaultPage);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnGo.onClick(this, this.onClickGo);
            // this.UIPanel.btnSkillReview.onClick(this, this.onClickReview);
            // this.UIPanel.imgReviewMask.onClick(this, this.onClickReview);

            this.addEventMgr(EventNotify.Activity_Update, this, this.onUpdateActivity);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /*****
         *    活动更新
         */
        protected onUpdateActivity(actId: number): void
        {
            if (this._activityId != actId) { return; }  //不同同一个活动。
            // //延迟一点，因为红点刷新会延迟
            // Laya.timer.once(200, this, this.openDefaultPage);
            this.openDefaultPage();
            this.refreshBtnState();
            this.refreshDayItemsList();
        }

        // /** 点击技能预览 */
        // private onClickReview(): void {
        //     this.UIPanel.imgReviewMask.visible = !this.UIPanel.imgReviewMask.visible;
        //     let resId = cfg.PetCfgData.getResourceIDByPetID(24503);
        //     if (this.UIPanel.imgReviewMask.visible) { //显示技能预览
        //         Global.createAtkerRoleForPreview(this.UIPanel.avatarBox, resId, true);
        //     } else { //只显示角色普通动作
        //         Global.createAtkerRoleForPreview(this.UIPanel.avatarBox, resId, false);
        //     }
        // }

        private onClickGo(): void
        {
            if (this._rewardIndex <= 0)
            {
                PlatformDataMgr.openChargeUI();
            } else
            {
                ActivitySend.drawReward(this._activityId, this._rewardIndex, 1);
            }
        }

        /** 点击主分页 */
        private onClickTabGroup(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this.refreshBtnState();
            this.refreshDayItemsList();
            //切换背景
            this.UIPanel.bg.frame = tabIndex + 1;
            this.UIPanel.txtHeroStar.text = Global.getLangStr("ui_FirstPay_msg" + (tabIndex * 2 + 1));  //ui_FirstPay_msg1
            this.UIPanel.txtHeroName.text = Global.getLangStr("ui_FirstPay_msg" + (tabIndex * 2 + 2));  //ui_FirstPay_msg2
        }

        /** 刷新奖励列表 */
        private refreshDayItemsList(): void
        {
            this.cleanEffectNode();
            let cfgList = cfg.ActivityFirstChargeCfgData.getListByAmountIndex(this.UIPanel.tabGrp.tabIndex);
            let activityData = ActivityDataMgr.getActivityDataById(cfgList[0].activityID);
            this.UIPanel.listDayItems.onRefresh(cfgList.length, this, (tempUI: ProUI.Pay.FirstPay.DayItemUI, index: number) =>
            {
                let cfgInfo = cfgList[index];
                tempUI.txtDays.text = Global.getLangStr("activity_msg11", cfgInfo.day);
                let todayIsGet = activityData && activityData.acquired.indexOf(cfgInfo.index) >= 0;
                tempUI.imgGet.visible = todayIsGet;
                //奖励预览
                let addItems = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemArr");
                tempUI.listNorItem.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
                {
                    itemUI.setItemInfo(addItems[additemsIndex]);
                    let globalIndex = index * cfgList.length + additemsIndex;
                    if (!this._effNodes[globalIndex])
                    {
                        this._effNodes[globalIndex] = EffectMgr.Inst.createEffectOne("ui_limitExchange", new Laya.Point(65, 65), -1, 1.05, 1, itemUI, false, ResReleaseType.Reference, true);
                    }
                });
            })
        }

        /** 刷新按钮状态 */
        private refreshBtnState(): void
        {
            let tabIndex = this.UIPanel.tabGrp.tabIndex;
            let cfgList = cfg.ActivityFirstChargeCfgData.getListByAmountIndex(tabIndex);
            this._activityId = cfgList[0].activityID;

            //     首充充值的进度;
            let chargeAmount = ActivityDataMgr.getActivity_DataValue(this._activityId, Pb_God._emActivityDataKey.Activity_Key_ChargeAmount);
            this.UIPanel.txtPayValue.text = Global.getLangStr("activity_msg17", Math.floor(chargeAmount / GlobalData.moneyToDiamon));  //已累充:0

            let isActive = chargeAmount >= cfgList[0].amount;
            this.UIPanel.btnGo.disabled = false;
            this.UIPanel.imgReddot.visible = false;
            this._rewardIndex = 0;
            if (!isActive)
            {
                this.showBtnEffect(true);
                this.UIPanel.txtBtnLabel.text = Global.getLangStr("activity_msg12");//前往充值";
                return;
            }

            //     首充上次领取的时间;
            let lastGetTime = ActivityDataMgr.getActivity_DataValue(this._activityId, Pb_God._emActivityDataKey.Activity_Key_FirstChargeLastTime);
            //     首充已经领取的天数;
            let getDay = ActivityDataMgr.getActivity_DataValue(this._activityId, Pb_God._emActivityDataKey.Activity_Key_FirstChargeDay);

            //是否全部领完了
            let isAllGet = getDay >= cfgList.length;
            //当天是否已领(上次领奖的时间和今天是不是在同一天)
            let isGet = isAllGet || new Date(lastGetTime * 1000).toDateString() === new Date(TimeController.currTimer).toDateString();
            if (!isGet) { this._rewardIndex = cfgList[getDay].index; }

            let strLabel = "";
            if (isAllGet) { strLabel = Global.getLangStr("activity_msg15"); }//已领取";
            else if (isGet) { strLabel = Global.getLangStr("activity_msg16"); }//明日再来";
            else { strLabel = Global.getLangStr("common_prize"); }//领取";

            this.UIPanel.btnGo.disabled = isGet;
            this.UIPanel.imgReddot.visible = !isGet;
            this.UIPanel.txtBtnLabel.text = strLabel;
            //特效
            this.showBtnEffect(!isGet);
        }

        private showBtnEffect(isShow: boolean): void
        {
            if (!isShow)
            {
                this._sk.visible = false;
                // EffectMgr.Inst.releaseEffect(this._firstPayEffect);
                // this._firstPayEffect = null;
            } else
            {
                this._sk.visible = true;
                // if (this._firstPayEffect == null)
                // //按钮特效
                // {
                //     this._firstPayEffect = EffectMgr.Inst.createLoopEffect("ui_firstpayBtn", new Laya.Point(117, 33), null, 1, 1, this.UIPanel.btnGo, ResReleaseType.Reference);
                // }
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}