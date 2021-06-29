module Pro
{
    /**
     * 7日登陆礼包
     */
    export class SevenDayLoginMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.ActivityMain.SevenDay.SevenDayLoginUI;

        /** 当前打开的主分页（0-七日登陆 1-限时购买） */
        private _mainGrpIndex = 0;

        // 服务端活动数据
        private act_data: Pb_God.PBPlayerActivityData;

        // 当前选中的天格子
        private select_dayIndex: number = -1;

        // 登陆活动配置列表
        private login_cfg_arr: cfg.ActivityLoginCfgInfo[];
        // 当前支持的直购礼包列表
        private charge_cfg_arr: cfg.ChargeCfgInfo[];

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("sevenDayLogin")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return ["res/sevenDay/qitiandenglu_pic_bg.png"];
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.SevenDay.SevenDayLoginUI, 3, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel(0, true, true);  //界面里面有个骨格动画的纹理资源需要释放，但目前还没有解决单独释放此纹理的方式，为了节约内存，只能先把界面所有内容全destroy掉
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //主分页按钮
            this.UIPanel.tabGrp.onClick(this, this.onClickTabGrp,
                [new component.UITabData("SevenDayLogin_msg1"), new component.UITabData("SevenDayLogin_msg2")],
                [new component.UITabStyle("#fff9db"), new component.UITabStyle("#fff9db")]
            );
            this.UIPanel.tabGrp.onRenderRefresh(this, this.onItemTabRender);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btn_close.onClick(this, this.onClickClose);
            this.UIPanel.btn_get.onClick(this, this.onClickGetBtn);
            this.addEventMgr(CmdEvent.Activity_Data, this, this.onActivityData);
            // 更新充值信息 PBChargeInfo
            this.addEventMgr(CmdEvent.Platform_update_chargeinfo, this, this.onUpdate_chargeinfo)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }
        private onItemTabRender(itemUI: component.UIButton, index: number)
        {
            let isSel = index == this.UIPanel.tabGrp.tabIndex;
            let frameImg = itemUI.getChildByName("frameImg") as component.UIFrameImage;
            frameImg.frame = isSel ? 2 : 1;
            frameImg.scaleX = index == 0 ? 1 : -1;
        }


        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_7Day);
            this.initSevenDay();
            let chargeType = Pb_God._emChargeType.ChargeType_7DayLogin;
            this.charge_cfg_arr = PlatformDataMgr.getValidChargeListByType(chargeType);
            this.UIPanel.tabGrp.tabIndex = 0;
            this.resetShowDefaultTab();
        }

        private initSevenDay(): void
        {
            let cfg_list = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_7Day);
            let act_cfg = cfg_list[0];
            this.login_cfg_arr = cfg.ActivityLoginCfgData.getDataArrayByActivityId(act_cfg.iD);
        }

        /** 选择默认的分页显示 */
        private resetShowDefaultTab(): void
        {
            //当前登陆的天数
            let loginDay = ActivityDataMgr.getActivity_DataValue(this.act_data.id, Pb_God._emActivityDataKey.Activity_Key_LoginDays);
            //如果第一页奖励全领完了，则直接切到第2分页
            let hasCanGetReward = false;
            for (let loginCfgInfo of this.login_cfg_arr)
            {
                let hasGet = ActivityDataMgr.isActBoxFinish(this.act_data.id, loginCfgInfo.index);
                if (hasGet) { continue; }
                let canGet = !hasGet && loginDay >= loginCfgInfo.day;
                if (canGet)
                {
                    hasCanGetReward = true;
                    break;
                }
            }
            let defaultSelectIndex = hasCanGetReward ? 0 : 1;
            this.UIPanel.tabGrp.setSelectTab(defaultSelectIndex);
        }

        /** 切换主分页回调 */
        private onClickTabGrp(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this._mainGrpIndex = tabIndex;
            this.refreshDayItemBox(true);
        }

        private onClickClose(): void
        {
            this.closeUI();

            //点击关闭之后，需要打开第二天的预览界面
            let curLoginDay = ActivityDataMgr.getActivity_DataValue(this.act_data.id, Pb_God._emActivityDataKey.Activity_Key_LoginDays);
            if (curLoginDay < 7)
            {
                let addItems = cfg.ActivityLoginCfgData.getAddItemAryByID(curLoginDay + 1);
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_NextPreviewPrompt, [curLoginDay, addItems]));
            }
            else
            {
                //检查一直新手引导是不是停在这一步等待
                GuideMgr.Inst.checkStepAndNextActive(GuideStep.Func_7DayAct_6);
            }
        }

        /** 更新活动数据 */
        private onActivityData(value: Pb_God.PBPlayerActivityData): void
        {
            if (value.id != this.act_data.id) { return; }
            this.resetShowDefaultTab();
        }

        /*****
         * 更新充值信息 PBChargeInfo
         */
        protected onUpdate_chargeinfo(value: Pb_God.PBChargeInfo): void
        {
            if (this.UIPanel.tabGrp.tabIndex == 1)
            {
                this.refreshSelectDayInfo(this.select_dayIndex);
            }
        }

        /** 点击领奖（购买）按钮 */
        private onClickGetBtn(): void
        {
            let loginDay = ActivityDataMgr.getActivity_DataValue(this.act_data.id, Pb_God._emActivityDataKey.Activity_Key_LoginDays);
            if (loginDay < this.select_dayIndex + 1)
            {
                TipsUtils.showTips(Global.getLangStr("activity_msg24")); //未到天数
                return;
            }
            if (this._mainGrpIndex == 0)
            {
                let loginCfgInfo = this.login_cfg_arr[this.select_dayIndex];

                if (loginCfgInfo)
                {
                    //是否已领取
                    if (ActivityDataMgr.isActBoxFinish(this.act_data.id, loginCfgInfo.index))
                    {
                        TipsUtils.showTips(Global.getLangStr("activity_msg25"));
                        return;
                    }
                    // 请求领取奖励.
                    ActivitySend.drawReward(this.act_data.id, loginCfgInfo.index, 0);
                } else
                {
                    GameLaunch.PostClientLog("##### let loginCfgInfo = this.login_cfg_arr[this.select_dayIndex];  loginCfgInfo 为空  this.select_dayIndex = " + this.select_dayIndex)
                }
            } else
            {
                let chargeCfgInfo = this.charge_cfg_arr[this.select_dayIndex];
                //判断重复购买
                let buyInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
                if (buyInfo && chargeCfgInfo.maxBuyCount != 0 && buyInfo.buycount >= chargeCfgInfo.maxBuyCount)
                {
                    TipsUtils.showTips(Global.getLangStr("common_isBuy"));
                    return;
                }
                PlatformDataMgr.onChargeRequest(chargeCfgInfo);
            }
        }

        /**
         * 刷新当前选中状态
         */
        private refreshSelectDayInfo(selectIndex: number)
        {
            if (this.select_dayIndex != selectIndex)
            {
                this.select_dayIndex = selectIndex;
                this.refreshDayItemBox(false);
            }
            let addItemList: cfg.AddItemInfo[];
            let loginDay = ActivityDataMgr.getActivity_DataValue(this.act_data.id, Pb_God._emActivityDataKey.Activity_Key_LoginDays);
            if (this._mainGrpIndex == 0)
            {
                this.UIPanel.txtGetBtnLabel.text = Global.getLangStr("common_prize2");

                let tmpLoginCfg = this.login_cfg_arr[this.select_dayIndex];
                let tmpHasGet = ActivityDataMgr.isActBoxFinish(this.act_data.id, tmpLoginCfg.index);
                let tmpCanGet = loginDay >= tmpLoginCfg.day && !tmpHasGet;
                this.UIPanel.btn_get.gray = !tmpCanGet;
                this.UIPanel.imgGetReddot.visible = tmpCanGet;

                addItemList = cfg.ActivityLoginCfgData.getAddItemAryByID(tmpLoginCfg.index);
            } else
            {
                let chargeCfgInfo = this.charge_cfg_arr[this.select_dayIndex];
                let money = chargeCfgInfo.needMoney / 100;
                this.UIPanel.txtGetBtnLabel.text = Global.getLangStr("common_money", money);
                addItemList = cfg.ChargeCfgData.getAddItemAryByID(chargeCfgInfo.iD);
                let buyInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
                let tmpHasGet = buyInfo && chargeCfgInfo.maxBuyCount != 0 && buyInfo.buycount >= chargeCfgInfo.maxBuyCount;
                let tmpCanGet = loginDay >= this.select_dayIndex + 1 && !tmpHasGet;
                this.UIPanel.btn_get.gray = !tmpCanGet;
                this.UIPanel.imgGetReddot.visible = false;
            }

            this.UIPanel.txt_current.text = Global.getLangStr("common_theDay", Global.numberToChinese(this.select_dayIndex + 1));
            this.UIPanel.itemBox.onRefresh(addItemList.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(addItemList[index]);
            });
        }

        /**
         * 刷新列表状态
         */
        private refreshDayItemBox(showDefaultDay: boolean): void
        {
            let loginDay = ActivityDataMgr.getActivity_DataValue(this.act_data.id, Pb_God._emActivityDataKey.Activity_Key_LoginDays);
            let defaultSelectIndex = -1;
            if (showDefaultDay)
            {
                if (this._mainGrpIndex == 0)
                {
                    for (let i = 0; i < this.login_cfg_arr.length; i++)
                    {
                        let el = this.login_cfg_arr[i]
                        if (!ActivityDataMgr.isActBoxFinish(this.act_data.id, el.index))
                        {
                            defaultSelectIndex = i;
                            break;
                        }
                    }
                } else
                {
                    for (let i = 0; i < this.charge_cfg_arr.length; i++)
                    {
                        let chargeCfgInfo = this.charge_cfg_arr[i];
                        let buyInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
                        let hasGet = !!buyInfo && chargeCfgInfo.maxBuyCount != 0 && buyInfo.buycount >= chargeCfgInfo.maxBuyCount;
                        if (!hasGet)
                        {
                            defaultSelectIndex = i;
                            break;
                        }
                    }
                }

            }
            //因为UI摆放位置有错位，所以拆分成了两个列表。
            let firstNum = 3;
            this.UIPanel.dayGrpBtns1.onRefresh(firstNum, this, (itemUI: ProUI.ActivityMain.SevenDay.SevenDayLoginItemUI, index: number) =>
            {
                let tmpCfgInfo = this.login_cfg_arr[index];
                this.refreshDayItemView(itemUI, tmpCfgInfo, loginDay, defaultSelectIndex);
            });
            this.UIPanel.dayGrpBtns2.onRefresh(this.login_cfg_arr.length - firstNum, this, (itemUI: ProUI.ActivityMain.SevenDay.SevenDayLoginItemUI, index: number) =>
            {
                let tmpCfgInfo = this.login_cfg_arr[index + firstNum];
                this.refreshDayItemView(itemUI, tmpCfgInfo, loginDay, defaultSelectIndex);
            });
        }

        private refreshDayItemView(itemUI: ProUI.ActivityMain.SevenDay.SevenDayLoginItemUI, cfgInfo: cfg.ActivityLoginCfgInfo, loginDay: number, defaultSelectIndex: number): void
        {
            let index = cfgInfo.day - 1;
            let tmpHasGet = false;

            itemUI.img_select.visible = index == this.select_dayIndex;
            itemUI.bg.visible = !(index == this.select_dayIndex);
            itemUI.txt_day.text = Global.getLangStr("common_theDay", cfgInfo.day);

            if (this._mainGrpIndex == 0)
            {
                itemUI.imgFrameIcon.frame = cfgInfo.day;
                tmpHasGet = ActivityDataMgr.isActBoxFinish(this.act_data.id, cfgInfo.index);
                itemUI.img_red.visible = loginDay >= cfgInfo.day && !tmpHasGet;
                itemUI.imgFrameIcon.gray = tmpHasGet;
            } else
            {
                itemUI.imgFrameIcon.frame = cfgInfo.day + 10;
                let chargeCfgInfo = this.charge_cfg_arr[index];
                let buyInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
                tmpHasGet = !!buyInfo && chargeCfgInfo.maxBuyCount != 0 && buyInfo.buycount >= chargeCfgInfo.maxBuyCount;
                itemUI.img_red.visible = false;
                itemUI.imgFrameIcon.gray = tmpHasGet;
            }
            itemUI.img_get.visible = tmpHasGet;
            itemUI.bg.gray = tmpHasGet;

            itemUI.onClick(this, () =>
            {
                this.refreshSelectDayInfo(index);
            });
            if (index == defaultSelectIndex)
            {
                itemUI.activeEvent();
            }
        }


        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Func_7DayAct_3)
            {
                GuideMgr.Inst.showFinger(this.UIPanel.btn_get, false, this.UIPanel.btn_get);
            } else if (step == GuideStep.Func_7DayAct_6)
            {
                GuideMgr.Inst.showFinger(this.UIPanel.btn_close, true, this.UIPanel.btn_close);
            }
        }

        // /**
        //  * 操作本步引导
        //  */
        // public Guide_Active(step: GuideStep) {
        //     if (step == GuideStep.Func_7DayAct_3) {
        //         this.UIPanel.btn_get.activeEvent();
        //         //七日登陆领奖后面紧跟着的是签到引导，需要先判断一次今天是否还可以再签到，如果不能签了，就直接可以中止此次引导了。
        //         if (WealDataMgr.reddotModel.getChildRedDotState("signin"))
        //             GuideMgr.Inst.nextActive();
        //         else
        //             FuncGuideMgr.Inst.finishFuncGuide();
        //     }
        // }
    }
}