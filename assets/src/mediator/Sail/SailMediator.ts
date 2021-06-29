module Pro
{
    export class SailMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Sail.MainUI;
        //public EffNodeAry: Array<EffNode> = [];
        private _privilegeEffNode: EffNode;
        private _isClickPrivilege = false;

        /** 寻宝情报是否即将达到上限（达到上限的60%时就需要把所有接取按钮显示红点） */
        private _needItemUpperLimit = false;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("sail")]
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/sail/yuanhang_pic01.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Sail.MainUI, 3, BaseAddLayer.TopUI, true);
        }

        public closeUI(): void
        {
            this.closePanel();

            Laya.timer.clear(this, this.refreshSailData);

            // this.EffNodeAry.forEach(element => EffectMgr.Inst.releaseEffect(element));
            // this.EffNodeAry.splice(0, this.EffNodeAry.length);
            if (this._privilegeEffNode)
            {
                // this._privilegeEffNode.removeSelf();
                EffectMgr.Inst.releaseEffect(this._privilegeEffNode);
            }
            this._privilegeEffNode = null;
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Sail_Changed, this, this.onSailChanged);
            //	 接取返回		PBPlayerSailInfo
            this.addEventMgr(Cmd.S2C_Sail_Accpet.cmdName, this, this.onAccpet);
            this.addEventMgr(Cmd.S2C_Common_ExpendSyn.cmdName, this, this.refreshResUI);

            this.UIPanel.QABtn.onClick(this, () =>
            {
                CommonHelpView.show(this.UIPanel.QABtn, Global.getLangStr("sail_help"));
            });

            this.UIPanel.btnPrivilege.onClick(this, this.onClickPrivilege);
            this.UIPanel.btn_oneKeyGet.onClick(this, () =>
            {
                // 0为一键领取所有已完成任务
                SailSend.completeAll();
            });

            this.UIPanel.uiPrivilege.btnActive.onClick(this, this.onClickActivePrivilege);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            this.UIPanel.ItemList.scrollBar.value = 0;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
            this.UIPanel.uiPrivilege.visible = false;

            //定时刷新
            Laya.timer.loop(1000, this, this.refreshSailData);
            this.refreshSailData();

            if (!this._privilegeEffNode && !this._isClickPrivilege)
            {
                let tmpEffPos = new Laya.Point(this.UIPanel.btnPrivilege.width / 2, this.UIPanel.btnPrivilege.height / 2);
                this._privilegeEffNode = EffectMgr.Inst.createEffectOne("ui_sailPrivilege", tmpEffPos, null, 1, 1, this.UIPanel.btnPrivilege, false, ResReleaseType.Reference, true);
            }
        }

        /** 点击前往激活远航特权 */
        private onClickActivePrivilege(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMain, 3,
                [Pb_God._emPrivilegeCard.PrivilegeCard_SailAdvance, Pb_God._emPrivilegeCard.PrivilegeCard_SailSuper]));
            this.closeUI();
        }

        /** 点击远航特权 */
        private onClickPrivilege(): void
        {

            if (this._privilegeEffNode)
            {
                // this._privilegeEffNode.removeSelf();
                EffectMgr.Inst.releaseEffect(this._privilegeEffNode);
            }
            this._privilegeEffNode = null;
            this._isClickPrivilege = true;

            let uiPrivilege = this.UIPanel.uiPrivilege;
            uiPrivilege.visible = true;
            let isAllActive = true;
            if (PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_SailAdvance))
            {
                uiPrivilege.txtActive1.text = Global.getLangStr("sail_msg2");
                uiPrivilege.txtActive1.color = "#009e00";
            } else
            {
                uiPrivilege.txtActive1.text = Global.getLangStr("sail_msg1")
                uiPrivilege.txtActive1.color = "#e60000";
                isAllActive = false;
            }
            if (PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_SailSuper))
            {
                uiPrivilege.txtActive2.text = Global.getLangStr("sail_msg2");
                uiPrivilege.txtActive2.color = "#009e00";
            } else
            {
                uiPrivilege.txtActive2.text = Global.getLangStr("sail_msg1")
                uiPrivilege.txtActive2.color = "#e60000";
                isAllActive = false;
            }
            uiPrivilege.bg.height = isAllActive ? 222 : 260;
            uiPrivilege.btnActive.visible = !isAllActive;
            uiPrivilege.txtTitle1.text = Global.getLangStr("common_bracket", cfg.PrivilegeCardCfgData.getNameByCardID(Pb_God._emPrivilegeCard.PrivilegeCard_SailAdvance));
            uiPrivilege.txtTitle2.text = Global.getLangStr("common_bracket", cfg.PrivilegeCardCfgData.getNameByCardID(Pb_God._emPrivilegeCard.PrivilegeCard_SailSuper));
            uiPrivilege.txtDes1.showText = cfg.TextConfigCfgData.getChineseById("sail_msg3");
            uiPrivilege.txtDes2.showText = cfg.TextConfigCfgData.getChineseById("sail_msg4");
            uiPrivilege.bgMask.once(Laya.Event.MOUSE_DOWN, this, () =>
            {
                uiPrivilege.visible = false;
            })
        }

        public refreshUI()
        {

            this.refreshResUI();

            //刷新远航列表
            this.refreshSailList();

            //刷新远航任务
            this.refreshSailTask();
        }

        /**
         * 刷新资源显示
         */
        private refreshResUI(): void
        {
            //刷新远航积分
            let tempSailCurPoint = Global.getItemNum(CfgID.ItemID.SailPoint);
            let tempSailMaxPoint = SailDataMgr.getSailMaxPoint();
            this.UIPanel.ActiveValueLb.text = tempSailCurPoint + "/" + tempSailMaxPoint;
            this._needItemUpperLimit = tempSailCurPoint >= tempSailMaxPoint * 0.6;
            this.UIPanel.ActiveValueImg.width = Math.min(tempSailCurPoint / tempSailMaxPoint, 1) * 154;
        }

        //---------------------------------请求任务刷新------------------------------------
        private onSailChanged()
        {
            Laya.timer.callLater(this, this.refreshUI);
        }

        /*****
         *	 接取返回		PBPlayerSailInfo
         * @param PBPlayerSailInfo
         * 		sn			uint32	 sn
         * 		index			uint32	 索引 配置表中
         * 		endtime			uint32	 结束时间
         * 		petsn			uint64	 派遣伙伴sn
         */
        protected onAccpet(value: Pb_God.PBPlayerSailInfo): void
        {
            //接取返回时，只需要刷新对应的那一条数据即可
            let allList = this.UIPanel.ItemList.array as Pb_God.PBPlayerSailIndex[];
            for (var i = 0; i < allList.length; i++)
            {
                var el = allList[i];
                if (el.sn == value.sn)
                {
                    this.UIPanel.ItemList.setItem(i, value);
                    return;
                }
            }
        }

        private refreshSailTask()
        {

            this.UIPanel.SailJuanLb.text = Global.getItemNum(CfgID.ItemID.SailRefeshPoint).toString();

            this.UIPanel.RefreshCostBox.visible = SailDataMgr.getDayFreeCount() >= SailDataMgr.getDayFreeMaxCount();
            this.UIPanel.RefreshFreeLb.visible = !this.UIPanel.RefreshCostBox.visible;

            if (this.UIPanel.RefreshCostBox.visible)
            {
                let tmpRefreshTime = SailDataMgr.getDayBuyCount() + 1;
                let tempRefreshInfo = cfg.SailRefreshCfgData.getInfoWithFun(tmpRefreshTime);
                let tempNeedItemAry = cfg.SailRefreshCfgData.getNeedItemAryById(tempRefreshInfo.refreshCount);
                if (!Global.isFullAllRes(tempNeedItemAry, false))
                {
                    Global.setResIconWithItemID(this.UIPanel.RefreshCostImg, CfgID.ResType.Item, CfgID.ItemID.Diamond);
                    Global.setResNumWithItemInfo(this.UIPanel.RefreshCostLb, CfgID.ItemID.Diamond, tempRefreshInfo.needDiamond);
                    this.UIPanel.RefreshBtn.onClick(this, () =>
                    {
                        if (Global.isFullRes(CfgID.ItemID.Diamond, tempRefreshInfo.needDiamond))
                        {
                            this.sureRefresh();
                        }
                    });
                }
                else
                {
                    Global.setResIconWithItemID(this.UIPanel.RefreshCostImg, CfgID.ResType.Item, tempNeedItemAry[0].itemid);
                    Global.setResNumWithItemInfo(this.UIPanel.RefreshCostLb, tempNeedItemAry[0].itemid, tempNeedItemAry[0].itemcount);
                    this.UIPanel.RefreshBtn.onClick(this, () =>
                    {
                        if (Global.isFullAllRes(tempNeedItemAry))
                        {
                            this.sureRefresh();
                        }
                    });
                }
            }
            else
            {
                this.UIPanel.RefreshCostBox.refresh();
                this.UIPanel.RefreshBtn.onClick(this, () =>
                {
                    this.sureRefresh();
                });
            }
        }

        public sureRefresh()
        {
            let isHaveHigh = SailDataMgr.isHaveHighSail(4);
            if (isHaveHigh)
            {
                let tmpDesStr = Global.getLangStr("fight_msg25");//有稀有以上的远航任务未接取,是否继续?";
                AlertShow.showConfirmAlert(tmpDesStr, this, () =>
                {
                    SailSend.refresh();
                });
            }
            else
            {
                SailSend.refresh();
            }
        }

        //---------------------------------列表刷新----------------------------------------
        /** 刷新任务列表 */
        private refreshSailList()
        {
            let list = SailDataMgr.getSailList();
            //没有可领取的任务时， 批量领取按钮置灰
            this.UIPanel.btn_oneKeyGet.disabled = !SailDataMgr.isHaveFinishSail();
            this.UIPanel.ItemList.onRefreshWithArray(list.concat(), this, this.onItemRenderer);
        }

        /** 刷新列表 */
        private refreshSailData()
        {
            for (let i = 0; i < this.UIPanel.ItemList.cells.length; i++)
            {
                let itemUI = this.UIPanel.ItemList.cells[i] as ProUI.Sail.SailInfoItemUI;
                if (itemUI.visible)
                {
                    this.onItemRenderer(itemUI, parseInt(itemUI.name));
                }
            }
        }

        /** 任务item刷新 */
        private onItemRenderer(itemUI: ProUI.Sail.SailInfoItemUI, index: number)
        {

            let tempSailIndexInfo = this.UIPanel.ItemList.getItem(index) as Pb_God.PBPlayerSailIndex;
            if (!tempSailIndexInfo) { return; }
            let tempSailDetailInfo = SailDataMgr.getSailInfo(tempSailIndexInfo.sn);
            let tempSailType = cfg.SailPoolCfgData.getSailTypeByIndex(tempSailIndexInfo.index);

            let tempRewardAry = cfg.SailPoolCfgData.getAddItemAryById(tempSailIndexInfo.index);
            let tempRewardNum = tempRewardAry == null ? 0 : tempRewardAry.length;
            itemUI.RewardBox.onRefresh(tempRewardNum, this, (itemRewardUI: NorItemUI, index: number) =>
            {
                itemRewardUI.setItemInfo(tempRewardAry[index]);
            });

            itemUI.QuImg.frame = tempSailType;
            let color = ["#747171", "#2f9e5a", "#3c7ab4", "#cf32ab", "#ee6e10", "#d71831"]
            itemUI.NameLb.strokeColor = color[tempSailType - 1];
            itemUI.NameLb.text = cfg.SailPoolCfgData.getNameByIndex(tempSailIndexInfo.index);

            //接任务
            itemUI.AcceptBtn.visible = tempSailDetailInfo == null;
            itemUI.reddotAccept.visible = this._needItemUpperLimit;
            itemUI.AcceptBox.visible = tempSailDetailInfo == null;
            if (tempSailDetailInfo == null)
            {

                itemUI.AcceptBtn.onClick(this, () =>
                {
                    UIManager.Inst.forceOpen(new SailDetailOpenUIData(tempSailIndexInfo), BaseBackUIType.HideBackUI);
                });
                //需要的情报值，此需还需预留活动打折情况
                let tempNeedSailPoint = cfg.SailTypeCfgData.getNeedSailPointBySailType(tempSailType);
                //活动减免次数
                let actData = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Voyage);
                if (actData)
                { tempNeedSailPoint -= parseInt(cfg.ActivityCfgData.getParamByID(actData.id).split(";")[1] || "0"); }
                itemUI.AcceptCostLb.text = tempNeedSailPoint.toString();
            }

            //任务中
            itemUI.SpeedBtn.visible = tempSailDetailInfo != null;
            itemUI.InSailingImg.visible = tempSailDetailInfo != null;
            itemUI.RewardBtn.visible = tempSailDetailInfo != null;
            if (tempSailDetailInfo != null)
            {
                let tempSailAllTime = cfg.SailTypeCfgData.getCoolTimeBySailType(tempSailType) * 60 * 1000;
                let tempSailLastTime = tempSailDetailInfo.endtime * 1000 - TimeController.currTimer;
                if (tempSailLastTime <= 0)
                {
                    itemUI.ProgressImg.width = 153;
                    itemUI.ProgressLb.text = Global.getLangStr("fight_msg26");//完成";
                    itemUI.RewardBtn.onClick(this, () =>
                    {
                        SailSend.complete(tempSailDetailInfo.sn);
                    });
                }
                else
                {
                    let tempBuyHourInfo = cfg.SailBuyhourCfgData.getInfoWithFun(Math.ceil(tempSailLastTime / 3600000));
                    itemUI.ProgressImg.width = Math.min((tempSailAllTime - tempSailLastTime) / tempSailAllTime, 1) * 153;
                    itemUI.ProgressLb.text = Global.GetRemindTime(tempSailLastTime / 1000);
                    itemUI.SpeedLb.text = tempBuyHourInfo.needDiamond + Global.getLangStr("ui_Sail_msg7");
                    itemUI.SpeedBtn.onClick(this, () =>
                    {
                        if (!Global.isFullRes(CfgID.ItemID.Diamond, tempBuyHourInfo.needDiamond))
                        {
                            return;
                        }
                        SailSend.buyHour(tempSailDetailInfo.sn);
                    });
                }
                itemUI.SpeedBtn.visible = tempSailLastTime > 0;
                itemUI.RewardBtn.visible = tempSailLastTime <= 0;
            }

            // //特效
            // let tmpEffNode = itemUI.BGImg.getChildAt(0) as EffNode;
            // if (tmpEffNode == null)
            // {
            //     if (tempSailDetailInfo != null && itemUI.SpeedBtn.visible)
            //     {
            //         let tmpEffPos = new Laya.Point(itemUI.BGImg.width / 2 - 2, itemUI.BGImg.height / 2 - 2);
            //         tmpEffNode = EffectMgr.Inst.createEffectOne("ui_sailRefresh", tmpEffPos, null, 2, 1, itemUI.BGImg, false, ResReleaseType.Reference);
            //         this.EffNodeAry.push(tmpEffNode);
            //     }
            // }
            // else
            // {
            //     tmpEffNode.visible = tempSailDetailInfo != null;
            // }
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Func_Sail_4)
            {
                GuideMgr.Inst.showFinger(this.UIPanel.RefreshBtn, true, this.UIPanel.RefreshBtn);
            } else if (step == GuideStep.Func_Sail_5)
            {
                Laya.timer.once(50, this, () =>
                {
                    var itemUI = this.UIPanel.ItemList.getCell(0) as ProUI.Sail.SailInfoItemUI;
                    GuideMgr.Inst.showFinger(itemUI.AcceptBtn, true, itemUI.AcceptBtn);
                })
            }
            else if (step == GuideStep.Func_Sail_8)
            {
                Laya.timer.once(50, this, () =>
                {
                    var itemUI = this.UIPanel.ItemList.getCell(0) as ProUI.Sail.SailInfoItemUI;
                    GuideMgr.Inst.showFinger(itemUI.SpeedBtn, true, itemUI.SpeedBtn, 0, 0, 30);
                })
            }
        }
    }

}