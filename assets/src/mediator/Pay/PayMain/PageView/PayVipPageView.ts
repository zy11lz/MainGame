module Pro
{
    /**
    * 充值：VIP分页
    * @author jason.xu
    */
    export class PayVipPageView extends ProUI.Pay.PageView.VipViewUI implements ITableView
    {
        /** 每日礼包类型 */
        protected packetType = Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_VipZZMonth;
        /** 当前礼包对应的特权卡 */
        private _curPrivilegeCard = 0;

        /** 当前展示的最大VIP等级 */
        private _showMaxVipLevel = 0;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._curPrivilegeCard = cfg.PrivilegeDailyPrizeCfgData.getNeedCardIDByType(this.packetType);
            this.tabGrp.onRenderRefresh(this, this.onTabItemRender);
        }

        /** 检查当前展示的最大VIP等级是否需要变更
         */
        private checkShowMaxVipLevel(): void
        {
            //当玩家的VIP等级＜10时，列表仅展示VIP10以内等级页签
            //当玩家的VIP等级≥10时，列表显示所有的VIP页签
            let showMaxVipLv = PrivilegeDataMgr.vipLevel < 10 ? 10 : cfg.PrivilegeVipCfgData.getMaxLevel();
            if (showMaxVipLv == this._showMaxVipLevel) return;
            this._showMaxVipLevel = showMaxVipLv;
            let tagDatas: component.UITabData[] = [];
            let reddotModels = [];
            for (var i = 0; i <= showMaxVipLv; i++)
            {
                tagDatas[i] = new component.UITabData("VIP" + i);
                reddotModels[i] = PrivilegeDataMgr.reddotModel.getChildModel("vipPage").getChildModel("gift" + i);
            }
            this.tabGrp.onClick(this, this.onChangeTabGrp, tagDatas,
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#ffffff")]
            );
            this.tabGrp.setRedDotModelList(reddotModels);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            this.vipChildView.addEvent();
            //	 购买vip礼包返回 		PBU32
            EventMgr.on(CmdEvent.Privilege_BuyVipPacket, this, this.refreshVipGiftView)
            EventMgr.on(EventNotify.Privilege_Card_Change, this, this.onChangePrivilegeCard);
            EventMgr.on(EventNotify.Privilege_Daily_Prize, this, this.onChangeDailyPrize);
            //	 新vip经验			PBU32
            EventMgr.on(EventNotify.VIP_Level_Changed, this, this.onChangeVipExp);

            this.btnGiftBuy.onClick(this, this.onClickBuyGift);
            this.btnCardActive.onClick(this, this.onClickActiveMonthCard);
            this.btnCardPirze.onClick(this, this.onClickCardPrize);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            this.vipChildView.removeEvent();
            //	 购买vip礼包返回 		PBU32
            EventMgr.off(CmdEvent.Privilege_BuyVipPacket, this, this.refreshVipGiftView)
            EventMgr.off(EventNotify.Privilege_Card_Change, this, this.onChangePrivilegeCard);
            EventMgr.off(EventNotify.Privilege_Daily_Prize, this, this.onChangeDailyPrize);
            EventMgr.off(EventNotify.VIP_Level_Changed, this, this.onChangeVipExp);
        }

        /**  点击购买礼包 */
        private onClickBuyGift(): void
        {
            let vipLv = this.tabGrp.tabIndex;
            if (vipLv > PrivilegeDataMgr.vipLevel)
            {
                TipsUtils.showTipsByLanId("common_needVip", vipLv);
                return;
            }

            //弹窗二级提示
            let needItem = cfg.PrivilegeVipCfgData.getGiftNeedItemInfoByVipLevel(vipLv);
            if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                return;
            let des = Global.getLangStr("shop_msg14", needItem.itemcount, cfg.ItemCfgData.getNameById(needItem.itemid), vipLv);
            AlertShow.showConfirmAlert(des, this, () =>
            {
                //向服务器发请求
                PrivilegeSend.buyVipPacket(vipLv);
            });
        }

        /**  点击激活至尊月卡 */
        private onClickActiveMonthCard(): void
        {
            EventMgr.trigger(EventNotify.Pay_UIPage_change, 2);
        }

        /** 点击领取至尊月卡每日礼包 */
        private onClickCardPrize(): void
        {
            PrivilegeSend.dailyPrize(this.packetType);
        }


        private onTabItemRender(itemUI: component.UIButton, index: number)
        {
            let txtContent = itemUI.getChildByName("txtContent") as component.UILabel;
            let bg = itemUI.getChildByName("bg") as component.UIFrameImage;
            let isSel = index == this.tabGrp.tabIndex;
            bg.frame = isSel ? 2 : 1;
            txtContent.text = cfg.PrivilegeVipCfgData.getContentByVipLevel(index);
            txtContent.color = isSel ? "#ffffff" : "#f13b54";  //注意这里与默认label的颜色不一样，不能直接复制
        }

        /** 选择页签 */
        private onChangeTabGrp(tab: component.UITab, tabIndex: number, oldTabIndex: number)
        {
            let vipLevel = tabIndex;
            this.txtTitle.text = Global.getLangStr("activity_msg19", vipLevel);
            this.txtNeed.text = cfg.PrivilegeVipCfgData.getNeedExpByVipLevel(vipLevel) + "";
            this.hboxPrivilegeTips.refresh();
            this.refreshPrivilegeList(vipLevel);
            this.refreshMonthCardGiftView();
            this.refreshVipGiftView();
            //记录今天已经点过了
            TodayRepeatOpMgr.Inst.setTag("vipPageClick_" + vipLevel);
        }

        /** VIP有变化 */
        private onChangeVipExp(): void
        {
            this.checkShowMaxVipLevel();
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.checkShowMaxVipLevel();
            this.vipChildView.show();
            this.refreshView();
            this.tabGrp.setSelectTab(PrivilegeDataMgr.vipLevel);
            this.tabGrp.scrollTo(PrivilegeDataMgr.vipLevel);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            this.vipChildView.hide();
        }

        public setData($data: any): void
        {

        }

        /** 刷新视图显示 */
        private refreshView(): void
        {

        }

        /** 特权卡状态变化 */
        private onChangePrivilegeCard(cardId: number): void
        {
            if (cardId != this._curPrivilegeCard) return;
            this.refreshMonthCardGiftView();
        }
        /** 领奖回调 */
        private onChangeDailyPrize(packetId: number): void
        {
            if (packetId != this.packetType) return;
            this.refreshMonthCardGiftView();
        }


        /** 刷新特权列表 */
        private refreshPrivilegeList(vipLv: number): void
        {
            let privilegeList = cfg.PrivilegeVipCfgData.getShowPrivilegeList(vipLv);
            this.listPrivilege.onRefreshWithArray(privilegeList, this, (tempUI: ProUI.Pay.PageView.VipPrivilegeItemUI, index: number) =>
            {
                let dataArr = privilegeList[index]; //[特权ID，特权数值，当前是否为新增特权]
                let privilegeId = dataArr[0];
                let privilegeValue = dataArr[1];
                let isNew = !!dataArr[2];
                let privilegeName = cfg.PrivilegeCfgData.getNameByPrivilegeType(privilegeId);
                let content = "· " + privilegeName.replace("<", "<font color='#009e00'>").replace("/>", "</font>").replace("{Value}", privilegeValue + "");
                tempUI.htmlText.showText = tempUI.htmlText.innerHTML = content;
                tempUI.tagNew.visible = isNew;
                if (isNew)
                {
                    tempUI.tagNew.x = tempUI.htmlText.x + tempUI.htmlText.contextWidth + 4;
                }
            });

        }

        /** 刷新至尊月卡每日礼包显示 */
        private refreshMonthCardGiftView(): void
        {
            let vipLv = this.tabGrp.tabIndex;
            if (vipLv < 0) return; //初始
            let isActive = PrivilegeDataMgr.getPrivilegeCardValid(this._curPrivilegeCard);
            let isGet = PrivilegeDataMgr.getDailyPacketIsGot(this.packetType);
            this.imgCardGet.visible = isActive && isGet;
            this.btnCardActive.visible = !isActive;
            this.btnCardPirze.visible = isActive && !isGet;

            let addItems = cfg.PrivilegeVipCfgData.getMonthPacketAddItemInfoByVipLevel(vipLv);
            this.listNoritemMonthCard.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });
        }

        /** 刷新VIP礼包购买状态 */
        private refreshVipGiftView(): void
        {
            let vipLv = this.tabGrp.tabIndex;
            let isBuy = PrivilegeDataMgr.isBuyVipPacket(vipLv);
            this.btnGiftBuy.visible = !isBuy;
            this.imgBuyGift.visible = isBuy;
            //原价
            this.txtGiftOldPrize.text = cfg.PrivilegeVipCfgData.getOldPriceByVipLevel(vipLv) + "";
            //现价
            let needItem = cfg.PrivilegeVipCfgData.getGiftNeedItemInfoByVipLevel(vipLv);
            this.txtGiftPrice.text = needItem.itemcount + Global.getLangStr("activity_msg18");
            this.hboxGiftPrice.refresh();
            this.hboxOldPrice.refresh();
            //红点
            this.imgReddotGiftPrize.visible = !isBuy && vipLv <= PrivilegeDataMgr.vipLevel && Global.isFullRes(needItem.itemid, needItem.itemcount, false);
            let addItems = cfg.PrivilegeVipCfgData.getGiftAddItemInfoByVipLevel(vipLv);
            this.listGiftItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
        }
    }
}