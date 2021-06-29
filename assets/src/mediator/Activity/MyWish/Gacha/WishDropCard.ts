module Pro
{
    /**
     * 心愿抽卡
     */
    export class WishDropCard extends ProUI.ActivityMain.MyWish.WishDropCardUI implements ITableView
    {
        // 活动id
        private _act_id: number;

        /** 道具数量 */
        private GRID_COUNT = 7;

        // 活动表格配置
        private _act_cfg: cfg.ActivityCfgInfo;

        // 消耗的道具ID
        private _curPoolInfo: cfg.LotteryPoolCfgInfo;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.btnHelp.onClick(this, this.showHelp);
            this.btnWishOne.onClick(this, this.wishOne);
            this.btnWishTen.onClick(this, this.wishTen);
            this.jumpBuyBtn.onClick(this, this.jumpBuy);
            this.selItem["scaleDown"] = 1;
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            this.btnChengeItem.on(Laya.Event.CLICK,this,this.changeInfo);
            // 道具有变更
            EventMgr.on(EventNotify.PlayerItemNumChange, this, this.onItemChange);
            EventMgr.on(EventNotify.Activity_Update, this, this.refreshView);

            EventMgr.on(Cmd.S2C_Lottery_Refresh.cmdName, this, this.refreshView);
            // 更新心愿池物品
            EventMgr.on(Cmd.S2C_Lottery_Pool_Set.cmdName, this, this.refreshPoolItem);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            this.btnChengeItem.off(Laya.Event.CLICK,this,this.changeInfo);
            
            EventMgr.off(EventNotify.Activity_Update, this, this.refreshView);
            EventMgr.off(EventNotify.PlayerItemNumChange, this, this.onItemChange);
            
            EventMgr.off(Cmd.S2C_Lottery_Refresh.cmdName, this, this.refreshView);
            EventMgr.off(Cmd.S2C_Lottery_Pool_Set.cmdName, this, this.refreshPoolItem);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            // Laya.timer.clear(this, this.onTimer);
        }

        /** 奖励更换 */
        private changeInfo(): void
        {
            let replacement = new ReplacementData();
            replacement.title = Global.getLangStr("wish_dropCard_msg1");
            replacement.lotteryType = Pb_God._emLotteryType.LotteryType_DropCard;
            replacement.selectedIndex =  LotteryDataMgr.dropCard.location == 0 ? cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_DropCard).lucky : LotteryDataMgr.dropCard.location;;
            replacement.save = new AlertOpenUIData_Fun();
            replacement.save.caller = this;
            replacement.save.fun = (btn: component.UIButton,index: number)=>{
                Pro.LotterySend.pool_Set(Pb_God._emLotteryType.LotteryType_DropCard,index);
            }
            UIManager.Inst.forceOpen(replacement);
        }

        /** 规则 */
        private showHelp(btn: component.UIButton): void
        {
            // CommonHelpView.show(btn, Global.getLangStr("wish_dropCard_des_1"));
            let strHelp = Global.getLangStr("wish_dropCard_des_1");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        /** 招募一次 */
        private wishOne(): void
        {
            let wishOne = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_DropCard,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1);
            // 免费
            if(LotteryDataMgr.dropCard.freecount < cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_DropCard).freeCount)
            {
                LotterySend.refresh(Pb_God._emLotteryType.LotteryType_DropCard,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1)
                return;
            }
            //判断VIP
            if (PrivilegeDataMgr.vipLevel < wishOne.vIP)
            {
                TipsUtils.showTipsByLanId("tips_msg53", wishOne.vIP);
                return;
            }
            //判断消耗品是否足够
            let costItem1: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishOne.needItem1);
            let costItem2: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishOne.needItem2);
            if (!Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount,false) && costItem2.length < 1)
            {
                Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount,true) // 消耗品1 提示
            }     
            else if (costItem2.length > 0 && !Global.isFullRes(costItem2[0].itemid, costItem2[0].itemcount,false) && !Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount,false))
            {
                Global.isFullRes(costItem2[0].itemid, costItem2[0].itemcount,true) // 消耗品2 提示
            }
            else
            {
                // 消耗提示
                if (!TodayRepeatOpMgr.Inst.getTag(`lottery${Pb_God._emLotteryType.LotteryType_DropCard}_${Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1}`))
                {
                    UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(6,[Pb_God._emLotteryType.LotteryType_DropCard,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1]));
                }
                else
                {
                    LotterySend.refresh(Pb_God._emLotteryType.LotteryType_DropCard,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1)
                }
            }
        }

        /** 招募十次 */
        private wishTen(): void
        {
            let wishTen = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_DropCard,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2);
            //判断VIP
            if (PrivilegeDataMgr.vipLevel < wishTen.vIP)
            {
                TipsUtils.showTipsByLanId("tips_msg53", wishTen.vIP);
                return;
            }
            //判断消耗品是否足够
            let costItem1: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishTen.needItem1);
            let costItem2: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishTen.needItem2);
            if (!Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount,false) && costItem2.length < 1)
            {
                Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount,true) // 消耗品1 提示
            }
            else if (costItem2.length > 0 && !Global.isFullRes(costItem2[0].itemid, costItem2[0].itemcount,false) &&  !Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount,false))
            {
                Global.isFullRes(costItem2[0].itemid, costItem2[0].itemcount,true) // 消耗品2 提示
            }
            else
            {
                // 消耗提示
                if (!TodayRepeatOpMgr.Inst.getTag(`lottery${Pb_God._emLotteryType.LotteryType_DropCard}_${Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2}`))
                {
                    UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(6,[Pb_God._emLotteryType.LotteryType_DropCard,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2]));
                }
                else
                {
                    LotterySend.refresh(Pb_God._emLotteryType.LotteryType_DropCard,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2)
                }
            }
        }

        /** 跳转道具购买入口 */
        private jumpBuy():void
        {
			let uiCfg = cfg.UiconfigUiopenCfgData.getInfo(parseInt(cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_DropCard).getway));
            TaskUtils.goto(uiCfg.panelNotify, uiCfg.page);
        }


        public setData($data: any): void
        {
            this._act_id = $data[0];
            this.txt_time.visible = false;
            // this._actGrpPageCfgInfo = $data[1];
            for (var i = 0; i < this.GRID_COUNT; i++)
            {
                this.refreshNorItem(i,cfg.LotteryHuntCfgData.getShowInfo(Pb_God._emLotteryType.LotteryType_DropCard)[i]);
            }
            this.refreshPoolItem();
            this.refreshView();

            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 更新心愿池道具  */
        private refreshPoolItem(value: Pb_God.PBG2CLotteryPoolSet = null): void
        {
            let location = LotteryDataMgr.dropCard.location == 0 ? cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_DropCard).lucky : LotteryDataMgr.dropCard.location;
            if(value){
                location = value.data.location;
            }
            this._curPoolInfo = cfg.LotteryPoolCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_DropCard,location);
            let itemInfo: cfg.AddItemInfo = cfg.AddItemInfo.parse(this._curPoolInfo.item)[0];
            // 道具
            this.selItem.setItemInfo(itemInfo,false,true,false);
            this.selItemSmall.skin = this.selItem.IconImg.skin;
            let pool_itemcount = this._curPoolInfo.itemcount;
            let showItemCount = (pool_itemcount - LotteryDataMgr.dropCard.count) <= 0 ? 1 : (pool_itemcount - LotteryDataMgr.dropCard.count);
            this.des.showText = Global.getLangStr("wish_dropCard_msg4", showItemCount);
        }

        /** 消耗道具变化 */
        private onItemChange(fID: number, tempNewNum: number): void
        {
            if(fID == Pro.CfgID.ItemID.WishCard)
            {
                Laya.timer.frameOnce(20, this, this.refreshView);
            }
        }

        /** 刷新道具显示 */
        private refreshNorItem(index: number,info: cfg.LotteryHuntCfgInfo): void
        {
            let itemUI = this.itemBox.getChildAt(index).getChildAt(0) as NorItemUI;
            itemUI.setItemID(parseInt(info.addItem.split("_")[0]),0,false,false);
            itemUI.BGImg.visible = false;
        }

        /** 刷新显示 */
        private refreshView(): void
        {
            let lotteryinfo =  cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_DropCard);
            // 道具数量
            Global.setResSmallIconWithItemID(this.itemIcon,Pro.CfgID.ItemID.WishCard);
            this.itemCount.text = `${Global.getItemNum(Pro.CfgID.ItemID.WishCard)}`;

            // 描述
            let location = LotteryDataMgr.dropCard.location == 0 ? cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_DropCard).lucky : LotteryDataMgr.dropCard.location;
            let pool_itemcount = this._curPoolInfo.itemcount;
            let showItemCount = (pool_itemcount - LotteryDataMgr.dropCard.count) <= 0 ? 1 : (pool_itemcount - LotteryDataMgr.dropCard.count);
            this.des.showText = Global.getLangStr("wish_dropCard_msg4", showItemCount);

            // 免费次数
            this.wishFree.visible = lotteryinfo.freeCount > LotteryDataMgr.dropCard.freecount;
            this.needBox.visible = !this.wishFree.visible;
            let wishone = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_DropCard,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1);
            let wishten = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_DropCard,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2);
            if(lotteryinfo.freeCount > LotteryDataMgr.dropCard.freecount)
            {
                this.wishFree.text = `${Global.getLangStr("evolution_msg1")}${lotteryinfo.freeCount - LotteryDataMgr.dropCard.freecount}/${lotteryinfo.freeCount}`
            }
            else
            {
                // key1消耗类型 
                let costItem1: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishone.needItem1); 
                let costItem2: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishone.needItem2);
                if (Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount,false) || costItem2.length == 0)
                {
                    Global.setResSmallIconWithItemID(this.needIcon1,costItem1[0].itemid);
                    this.needCount1.text = `${costItem1[0].itemcount}`
                }else{
                    Global.setResSmallIconWithItemID(this.needIcon1,costItem2[0].itemid);
                    this.needCount1.text = `${costItem2[0].itemcount}`
                }
                this.needBox.refresh();
            }
            // key2消耗类型 
            let tenItem1: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishten.needItem1);
            let tenItem2: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishten.needItem2);
            if (Global.isFullRes(tenItem1[0].itemid, tenItem1[0].itemcount,false) || tenItem2.length == 0)
            {
                Global.setResSmallIconWithItemID(this.needIcon2,tenItem1[0].itemid);
                this.needCount2.text = `${tenItem1[0].itemcount}`
            }else{
                Global.setResSmallIconWithItemID(this.needIcon2,tenItem2[0].itemid);
                this.needCount2.text = `${tenItem2[0].itemcount}`
            }
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
            // Laya.timer.clear(this, this.onTimer);
        }

        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let act_start_time = ActivityDataMgr.getActivityServerOpenTime(this._act_id);
            let act_end_time =  ActivityDataMgr.getActivityEndTimeStamp(this._act_id);
            let leftTime = act_end_time - TimeController.currTimer / 1000;
            if (leftTime <= 0)
            {   //活动已结束
                this.txt_time.showText = Global.getLangStr("activity_msg23");
                Laya.timer.clear(this, this.onTimer);
                return;
            }
            this.txt_time.showText = Global.getLangStr("activity_msg13", Global.GetRemindTime(leftTime, 9));
        }
    }
}