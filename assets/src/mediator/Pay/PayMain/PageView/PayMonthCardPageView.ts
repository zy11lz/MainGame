module Pro
{
    /**
    * 充值：月卡分页(包括普通月卡与至尊月卡两部分)
    * @author jason.xu
    */
    export class PayMonthCardPageView extends ProUI.Pay.PageView.MonthCardViewUI implements ITableView
    {

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(EventNotify.Privilege_Card_Change, this, this.onChangePrivilegeCard);
            EventMgr.on(EventNotify.Privilege_Daily_Prize, this, this.onChangeDailyPrize);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Privilege_Card_Change, this, this.onChangePrivilegeCard);
            EventMgr.off(EventNotify.Privilege_Daily_Prize, this, this.onChangeDailyPrize);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.refreshAll();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        /** 点击已领奖按钮 */
        private onClickIsGet(): void
        {
            //玩家已经领取了该任务的奖励，点击弹出文字提示“奖励已领取，请明天再来哟”
            TipsUtils.showTipsByLanId("tips_msg3");
        }
        /** 点击充值按钮 */
        private onClickCharge(): void
        {
            EventMgr.trigger(EventNotify.Pay_UIPage_change, 0);
        }

        public setData($data: any): void
        {

        }



        /** 特权卡状态变化 */
        private onChangePrivilegeCard(cardId: number): void
        {
            this.refreshAll();
        }
        /** 领奖回调 */
        private onChangeDailyPrize(packetId: number): void
        {
            if (packetId == Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_RRMonth)
                this.refreshView(this.normalBox, packetId);
            else
                if (packetId == Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_ZZMonth)
                    this.refreshView(this.superBox, packetId);
        }

        private refreshAll(): void
        {
            this.refreshView(this.normalBox, Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_RRMonth);
            this.refreshView(this.superBox, Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_ZZMonth);
        }



        /** 刷新视图显示 */
        private refreshView(box: Laya.Box, packetType: number): void
        {
            //对应特权卡类型
            let cardType = cfg.PrivilegeDailyPrizeCfgData.getNeedCardIDByType(packetType);

            let btnActive = box.getChildByName("btnActive") as component.UIButton;
            let btnGet = box.getChildByName("btnGet") as component.UIButton;
            let btnIsGet = box.getChildByName("btnIsGet") as component.UIButton;
            let itemListView = box.getChildByName("itemListView") as component.UIItemBox;
            let txtTotalDiamon = box.getChildByName("txtTotalDiamon") as component.UILabel;
            let htmlDesc = box.getChildByName("htmlDesc") as component.UIHtmlText;
            let htmlProgressValue = box.getChildByName("htmlProgressValue") as component.UIHtmlText;

            //当前是否已经激活
            let isActive = PrivilegeDataMgr.getPrivilegeCardValid(cardType);
            btnActive.visible = !isActive;
            if (isActive)
            {
                //今天是不是领过了
                let isGet = PrivilegeDataMgr.getDailyPacketIsGot(packetType);
                btnGet.visible = !isGet;
                btnIsGet.visible = isGet;

                let activeDays = 30;  //有效期
                let expiretime = PrivilegeDataMgr.getPrivilegeCardExpiretime(cardType);
                let endTime = expiretime * 1000 - 1000; //往后移一点点，保证日期显示是在后面一天23:59:59...
                //往前推30天，取得激活的时间
                let startTime = (expiretime - 30 * 24 * 3600 + 100) * 1000;
                //已领奖天数
                let rewardDays = activeDays - Math.ceil((endTime - TimeController.currTimer) / (24 * 3600 * 1000));
                if (isGet) rewardDays++;  //今天已领，还得加上今天
                // TODO 加一个容错处理
                if (rewardDays < 0) rewardDays = 0;
                htmlProgressValue.showText = Global.getLangStr("pay_monthCard_msg9", rewardDays);

                htmlDesc.showText = Global.getLangStr("pay_monthCard_msg10", Global.getFormatTimeString(startTime, 10), Global.getFormatTimeString(endTime, 10));
            } else
            {
                btnGet.visible = false;
                btnIsGet.visible = false;
                let need = cfg.PrivilegeCardCfgData.getNeedMoneyByCardID(cardType);
                let cur = PrivilegeDataMgr.getPrivilegeCardTotalCharge(cardType);
                //当前充值0/30
                htmlProgressValue.showText = Global.getLangStr("pay_monthCard_msg7", Math.ceil(cur / GlobalData.moneyToDiamon), Math.ceil(need / GlobalData.moneyToDiamon));
                htmlDesc.showText = Global.getLangStr("pay_monthCard_msg8");
            }


            //奖励预览
            let addItems = cfg.PrivilegeDailyPrizeCfgData.getAddItemInfoArrByType(packetType);
            //取第一个为钻石，计算累计值
            txtTotalDiamon.text = addItems[0].itemcount * 30 + "";
            itemListView.onRefresh(addItems.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(addItems[index]);
            });

            btnIsGet.onClick(this, this.onClickIsGet);
            btnActive.onClick(this, this.onClickCharge);
            btnGet.onClick(this, () =>
            {
                PrivilegeSend.dailyPrize(packetType);
            });
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
        }
    }
}