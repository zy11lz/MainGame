
module Pro
{
    /**
     * 通用购买道具
     */
    export class TroopBuyItemMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Common.TroopBuyItemUI;

        /** UI打开参数 */
        public UIOpenData: TroopBuyItemOpenUIData;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI()
        {
            this.showPanel(ProUI.Common.TroopBuyItemUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.CancelBtn.onClick(this, this.closeUI);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.DonPrompt.visible = false;
            if (this.UIOpenData.actionType == 1)
            {
                let tempBuySpace = PetDataMgr.getBuySpaceNum();
                let tempBuyInfo = cfg.PetBuyBagCfgData.getInfoWithFun(tempBuySpace);
                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg1");//是否花费";
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("shop_msg2", tempBuyInfo.needDiamond, tempBuyInfo.addSpace);
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, CfgID.ItemID.Diamond);

                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    if (!Global.isFullRes(CfgID.ItemID.Diamond, tempBuyInfo.needDiamond))
                    {
                        return;
                    }
                    this.onSureClose();

                    PetSend.buyBag_Ask(tempBuySpace);
                });
            }
            else if (this.UIOpenData.actionType == 2)
            {
                let tempBuySpace = ElementDataMgr.getDayBuyCount();
                let tempNeedCostID = CfgID.ItemID.Diamond;
                let tempNeedCostNum = cfg.ElementBuyCountCfgData.getInfoWithFun(tempBuySpace + 1).needDiamond;

                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg1");//是否花费";
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("shop_msg3", tempNeedCostNum);
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, tempNeedCostID);

                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    if (!Global.isFullRes(tempNeedCostID, tempNeedCostNum))
                    {
                        return;
                    }
                    this.onSureClose();

                    ElementSend.buyCount();
                });
            }
            else if (this.UIOpenData.actionType == 3)
            {
                let tempBuySpace = TrainDataMgr.getTowerDayBuyCount(this.UIOpenData.customObject);
                let tempNeedCostID = CfgID.ItemID.Diamond;
                let tempNeedCostNum = cfg.TrainTowerCountCfgData.getInfo(tempBuySpace + 1).needDiamond;

                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg1");//是否花费";
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("shop_msg3", tempNeedCostNum);
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, tempNeedCostID);

                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    if (!Global.isFullRes(tempNeedCostID, tempNeedCostNum))
                    {
                        return;
                    }
                    this.onSureClose();

                    TrainSend.towerBuyCount(this.UIOpenData.customObject);
                });
            }
            else if (this.UIOpenData.actionType == 4)
            {
                let tempSplitInfo = cfg.ItemCfgData.getSellItemInfoById(this.UIOpenData.customObject.itemid);
                let tempNeedCostID = tempSplitInfo.itemid;
                let tempNeedCostNum = tempSplitInfo.itemcount;

                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg4");//分解此符文可以获得";
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("shop_msg5", tempNeedCostNum);
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, tempNeedCostID);

                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    this.onSureClose();

                    let tmpOneItem = new Pb_God.PBItemSnCount();
                    tmpOneItem.itemsn = this.UIOpenData.customObject.itemsn;
                    tmpOneItem.itemcount = 1;
                    ItemSend.split([tmpOneItem]);
                });
            }
            else if (this.UIOpenData.actionType == 5)
            {
                this.UIPanel.DonPrompt.visible = true;
                this.UIPanel.DonPrompt.setText("今日登录不再提示");
                this.UIPanel.DonPrompt.isSelected = true;
                this.UIPanel.DonPrompt.onSelectChange(this, this.onClickCheckBtn);
                // this.onClickCheckBtn(this.UIPanel.DonPrompt);

                let tempNeedCostID = CfgID.ItemID.Diamond;
                let tempNeedCostNum = this.UIOpenData.customObject as number;

                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg6");//本次快速作战花费";
                this.UIPanel.ShowMsg2Lb.text = "x" + tempNeedCostNum;
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, tempNeedCostID);

                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    if (!Global.isFullRes(tempNeedCostID, tempNeedCostNum))
                    {
                        return;
                    }
                    this.onSureClose();
                    if (this.UIPanel.DonPrompt.isSelected)
                    {
                        TodayRepeatOpMgr.Inst.setTag("QuickBattlePrompt");
                    }
                    HookSend.buySweep();
                });
            }
            else if (this.UIOpenData.actionType == 6)
            {
                this.UIPanel.DonPrompt.visible = true;
                this.UIPanel.DonPrompt.setText("今日登录不再提示");
                this.UIPanel.DonPrompt.onSelectChange(this, this.onClickCheckBtn);
                this.UIPanel.DonPrompt.isSelected = true;

                let wish = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(this.UIOpenData.customObject[0], this.UIOpenData.customObject[1]);
                let costItem1: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wish.needItem1);
                let costItem2: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wish.needItem2);
                let needItem: cfg.AddItemInfo = costItem2[0];
                if (Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount, false))
                {
                    needItem = costItem1[0];
                }

                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("ui_HeroCall_msg1");
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("wish_dropCard_msg3", needItem.itemcount, Global.getItemNum(needItem.itemid));
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, needItem.itemid);

                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                    {
                        this.closeUI();
                        return;
                    }
                    if (this.UIPanel.DonPrompt.isSelected)
                    {
                        TodayRepeatOpMgr.Inst.setTag(`lottery${ this.UIOpenData.customObject[0] }_${ this.UIOpenData.customObject[1] }`);
                    }
                    // 许愿请求
                    LotterySend.refresh(this.UIOpenData.customObject[0], this.UIOpenData.customObject[1]);
                    this.onSureClose();
                });
            }
            else if (this.UIOpenData.actionType == 7)
            {
                let tmpLoginCfg = this.UIOpenData.customObject as cfg.ActivityLoginCfgInfo;
                let tempNeedCostID = cfg.ActivityLoginCfgData.getNeedItemID(tmpLoginCfg.index);
                let tempNeedCostNum = cfg.ActivityLoginCfgData.getNeedItemCount(tmpLoginCfg.index);

                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg1");//是否花费";
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("shop_msg35", tempNeedCostNum);
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, tempNeedCostID);

                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    this.onSureClose();
                    if (!Global.isFullRes(tempNeedCostID, tempNeedCostNum))
                    {
                        return;
                    }
                    // 请求领取奖励.
                    ActivitySend.drawReward(tmpLoginCfg.activityID, tmpLoginCfg.index, 0);
                });
            }
            else if (this.UIOpenData.actionType == 8)
            {
                let parameter = this.UIOpenData.customObject;
                let tempNeedCostID = CfgID.ItemID.Diamond;
                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg1");//是否花费";
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("shop_msg36", parameter[2]);
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, tempNeedCostID);
                this.UIPanel.SureBtn.onClick(this, () =>
                {

                    this.onSureClose();
                    if (!Global.isFullRes(tempNeedCostID, parameter[2]))
                    {
                        return;
                    }
                    WealSend.draw(parameter[0], parameter[1]);

                });

            }
            else if (this.UIOpenData.actionType == 9)
            {
                let idx = this.UIOpenData.customObject;
                let needDiamond = cfg.CrossChallengeWinPrizeCfgData.getNeedItemByIndex(idx).split("_")[1];
                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg1");//是否花费";
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("crossChallenge_msg5", needDiamond);
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, CfgID.ItemID.Diamond);

                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    this.onSureClose();
                    CrossChallengeSend.buyPrize(this.UIOpenData.customObject);
                });
            }
            else if (this.UIOpenData.actionType == 10)
            {
                //共鸣 赋能冷却
                let iType = this.UIOpenData.customObject[0];
                let gridIndex = this.UIOpenData.customObject[1];
                let gridData = this.UIOpenData.customObject[2];
                let diamond = Math.ceil((gridData.cdtime - TimeController.currTimer / 1000) / 3600) * cfg.ResonanceCommonCfgData.getFirstInfo().coolingConsume;
                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg1");//是否花费";
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("resonance_msg6", diamond);
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, CfgID.ItemID.Diamond);

                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    this.onSureClose();
                    ResonanceSend.resetCD(iType, gridIndex);
                });
            }
            else if (this.UIOpenData.actionType == 11)
            {
                //共鸣解锁
                let iType = this.UIOpenData.customObject[0];
                let gridIndex = this.UIOpenData.customObject[1];
                this.UIPanel.ShowMsg1Lb.text = Global.getLangStr("shop_msg1");//是否花费";
                let needItem = cfg.ResonanceGridCfgData.getConsumeByTypeAndGridIndex(iType, gridIndex).split("_");
                this.UIPanel.ShowMsg2Lb.text = Global.getLangStr("resonance_msg7", needItem[1]);
                Global.setResIconWithItemID(this.UIPanel.ShowMsgIconImg, CfgID.ResType.Item, parseInt(needItem[0]));
                this.UIPanel.SureBtn.onClick(this, () =>
                {
                    this.onSureClose();
                    if (ItemDataMgr.getBagItemNum(parseInt(needItem[0])) < parseInt(needItem[1]))
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemAccess, [parseInt(needItem[0]), true]));
                    else
                        ResonanceSend.openGrid(iType);
                });
            }

            this.UIPanel.ShowMsgBox.refresh();
        }

        /** 点击切换复选按钮 */
        private onClickCheckBtn(btn: Pro.CheckButton): void
        {

        }

        public refreshUI()
        {

        }

        public onSureClose()
        {
            this.closeUI();
            if (this.UIOpenData.sure != null && this.UIOpenData.sure.fun != null)
            {
                this.UIOpenData.sure.fun.apply(this.UIOpenData.sure.caller);
            }
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            Laya.timer.once(200, this, () =>
            {
                GuideMgr.Inst.showFinger(this.UIPanel.SureBtn, true);
            });
        }

        /**
         * 操作本步引导
         */
        public Guide_Active(step: GuideStep)
        {
            this.UIPanel.SureBtn.activeEvent();
        }
    }
}