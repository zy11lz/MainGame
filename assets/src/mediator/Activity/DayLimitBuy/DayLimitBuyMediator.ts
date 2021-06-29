
module Pro
{
	/**
	 * 每日限购
	 */
    export class DayLimitBuyMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        UIPanel: ProUI.ActivityMain.DayLimitBuy.DayLimitBuyUI;

        /**礼包id列表 */
        private _gifts: string[];

        private _onekeyGift: cfg.ChargeCfgInfo;

        private _lbl: component.UILabel[];

        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("daylimitbuy")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return null;
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.DayLimitBuy.DayLimitBuyUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            Laya.timer.clear(this, this.loopTimeLbl)
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            this._lbl = [];
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.UIPanel.oneKeyBuyBtn.onClick(this, () =>
            {
                PlatformDataMgr.onChargeRequest(this._onekeyGift);
            })

            this.UIPanel.closeBtn.onClick(this, this.closeUI);

            this.addEventMgr(CmdEvent.Activity_Data, this, this.initUI);
            this.addEventMgr(EventNotify.DayLimitBuy_ResetNewDay, this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        private updateOneKeyBtnState()
        {
            this.UIPanel.oneKeyBuyBtn.visible = ActivityDataMgr.checkCanOneKeyBuy(this.UIOpenData.customObject);
        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            if (this.UIOpenData.customObject == 6004)
            {
                this.UIPanel.bgGiftGag.skin = UrlMgr.getDayLimitBuyUrl("huodong_chaozhilibao_pic07");
                this.UIPanel.bgGiftGag.sizeGrid = "170,0,70,0";
                this.UIPanel.bgName.visible = false;
                this.UIPanel.downHem.visible = true;
                this.UIPanel.downHem.skin = UrlMgr.getDayLimitBuyUrl("huodong_chaozhilibao_pic08");
                this.UIPanel.list.top = 145;
                this.UIPanel.downHem.centerX = 0;

            }
            else if (this.UIOpenData.customObject == 6008)
            {
                this.UIPanel.bgGiftGag.skin = UrlMgr.getDayLimitBuyUrl("huodong_chaozhilibao_pic11");
                this.UIPanel.bgGiftGag.sizeGrid = "312,0,58,0";
                this.UIPanel.bgName.visible = false;
                this.UIPanel.downHem.visible = true;
                this.UIPanel.downHem.skin = UrlMgr.getDayLimitBuyUrl("huodong_chaozhilibao_pic09");
                this.UIPanel.list.top = 249;
                this.UIPanel.downHem.centerX = 4;
            } 
            else 
            {
                this.UIPanel.bgGiftGag.skin = UrlMgr.getDayLimitBuyUrl("huodong_chaozhilibao_pic01");
                this.UIPanel.bgName.skin = UrlMgr.getDayLimitBuyUrl("huodong_chaozhilibao_pic002");
                this.UIPanel.bgGiftGag.sizeGrid = "0,0,0,0";
                this.UIPanel.bgName.visible = true;
                this.UIPanel.downHem.visible = false;
                this.UIPanel.list.top = 145;
                this.UIPanel.downHem.centerX = 0;
            }

            //获取活动数据 用于礼包剩余时间的处理
            let activityData = ActivityDataMgr.getDayLimitBuyData(this.UIOpenData.customObject);
            let openInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(activityData.id);
            let startTime = ActivityDataMgr.getActivityServerOpenTime(activityData.id) * 1000;
            startTime = Math.max(startTime, openInfo.getStartTime(TimeController.currTimer));
            let day = Math.ceil((Pro.TimeController.currTimer - startTime) / (24 * 3600 * 1000));

            // let startTime = openInfo.getStartTime(TimeController.currTimer, TimeController.worldCreateZeroTime);
            // let day = Math.ceil((TimeController.currTimer - startTime) / 86400000);

            //一起买的总体礼包id
            this._onekeyGift = cfg.ChargeCfgData.getInfo(cfg.ActivityLimitDayGiftCfgData.getInfoByDay(this.UIOpenData.customObject, day).quickbuy);

            //一起买多少钱
            this.UIPanel.oneKeyBuyBtn.text = Global.getLangStr("activity_daylimitbuy_msg3", Math.ceil(this._onekeyGift.needMoney / 100));

            //折扣
            let discount = cfg.ActivityLimitDayGiftCfgData.getInfoByDay(this.UIOpenData.customObject, day).discount;
            //this.UIPanel.discount.visible = discount > 0;
            //折扣信息没有配置，目前直接隐藏
            this.UIPanel.discount.visible = false;
            if (this.UIPanel.discount.visible)
                this.UIPanel.discountLbl.text = Global.getLangStr("shop_msg17", discount);

            this._gifts = cfg.ActivityLimitDayGiftCfgData.getInfoByDay(this.UIOpenData.customObject, day).gifts.split(";"); //activityData.indexdata;

            this.UIPanel.list.onRefresh(this._gifts.length, this, this.onRender);
            //礼包ID列表

            // Laya.timer.loop(1000, this, () =>
            // {
            //     this.loopTimeLbl(openInfo);
            // })


            Laya.timer.loop(1000, this, this.loopTimeLbl, [openInfo]);

            this.loopTimeLbl(openInfo);

            this.updateOneKeyBtnState();
        }

        private loopTimeLbl(openInfo: cfg.StDateTimeInfo)
        {
            this._lbl.forEach(element =>
            {
                // 这里把倒计时处理成当天结束的倒计时 策划配表要配成每天刷新限购次数的礼包
                let actId = this.UIOpenData.customObject;
                let tTime = cfg.ActivityCfgData.getIsMergeByID(actId) ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
                let remainTime = (openInfo.getEndTime(TimeController.currTimer, tTime) - TimeController.currTimer) % 86400000
                element.text = Global.GetRemindTime(remainTime / 1000, 10);
            })
        }

        private onRender(item: ProUI.ActivityMain.DayLimitBuy.DayLimitBuyItemUI, index: number)
        {
            //根据礼包id获取礼包配置
            let giftCfgData = cfg.ChargeCfgData.getInfo(parseInt(this._gifts[index]));
            let haveBuyCount = ActivityDataMgr.getDayLimitHaveBuyCount(parseInt(this._gifts[index]), this.UIOpenData.customObject);

            //拿到额外参数 [图片url,名称文本颜色,原价]
            let param = giftCfgData.params.split(";");
            item.colorTitle.skin = UrlMgr.getDayLimitBuyUrl(param[0]);
            param[1] && (item.nameLbl.strokeColor = param[1]);
            item.nameLbl.text = giftCfgData.name;
            item.limitLbl.text = Global.getLangStr("activity_daylimitbuy_msg1", giftCfgData.maxBuyCount, haveBuyCount, giftCfgData.maxBuyCount);
            item.oldPriceLbl.text = Global.getLangStr("common_oldmoney", param[2]);
            item.giftDescLbl.text = giftCfgData.desc;
            this._lbl[index] = item.remainTimeLbl;
            item.buyBox.visible = giftCfgData.maxBuyCount - haveBuyCount > 0;
            item.boughtBox.visible = !item.buyBox.visible;
            item.buyBtn.text = Global.getLangStr("activity_chargeMsg4", giftCfgData.needMoney / 100);

            item.buyBtn.onClick(this, () =>
            {
                AlertShow.showConfirmAlert(Global.getLangStr("activity_daylimitbuy_msg2"), this, () =>
                {
                    PlatformDataMgr.onChargeRequest(giftCfgData);
                }, "activity_daylimitbuy_msg4", "activity_daylimitbuy_msg5");
            });

            //(⊙_⊙)? 4个以下的奖励要居中 搞个box 
            let addItems = cfg.ChargeCfgData.getAddItemAryByID(parseInt(this._gifts[index]));
            item.list.visible = addItems.length >= 5;
            item.fourBox.visible = !item.list.visible;

            let tmp = item.list.visible ? item.list : item.fourBox;
            tmp.onRefresh(addItems.length, this, (norItem: Pro.NorItemUI, idx: number) =>
            {
                norItem.setItemInfo(addItems[idx]);
            })
        }



        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }
    }
}