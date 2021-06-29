module Pro
{
    /**
     * 进化之路
     */
    export class RoadEvolvePageView extends ProUI.ActivityMain.RoadEvolve.RoadEvolvePageUI implements ITableView
    {

        /** 道具数量 */
        private GRID_COUNT = 9;
        /** 许愿道具 */
        private _evolveItem: NorItemUI;
        // 消耗的道具ID
        private _curPoolInfo: cfg.LotteryPoolCfgInfo;

        public setData($data: any): void
        {
            this._evolveItem = this.boxCells.getChildAt(0).getChildAt(0) as NorItemUI;
            this.refreshAllItems();
            this.dispayItemAni();
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

        /** 关闭UI*/
        public closeUI(): void
        {
            for (var i = 1; i < this.GRID_COUNT; i++)
            {
                 let itemUI = this.boxCells.getChildAt(i) as Laya.Image;
                 Laya.Tween.clearAll(itemUI);
            }
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.chanceBtn.onClick(this,this.changeInfo);
            this.exchangeBtn.onClick(this, this.exchangeReward);
            this.wishBtn.onClick(this, this.wishOne);
            this.wishsBtn.onClick(this, this.wishTen);
            this.helpBtn.onClick(this, this.showHelp);
            this.jumpBuyBtn.onClick(this, this.jumpBuy);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // 更新许愿池物品
            EventMgr.on(Cmd.S2C_Lottery_Pool_Set.cmdName, this, this.refreshEvolvePoolItem);
            // 道具有变更
            EventMgr.on(EventNotify.PlayerItemNumChange, this, this.onItemChange);
            EventMgr.on(Cmd.S2C_Lottery_Refresh.cmdName, this, this.onItemChange);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            EventMgr.off(Cmd.S2C_Lottery_Pool_Set.cmdName, this, this.refreshEvolvePoolItem);
            // 道具有变更
            EventMgr.off(EventNotify.PlayerItemNumChange, this, this.onItemChange);
            EventMgr.off(Cmd.S2C_Lottery_Refresh.cmdName, this, this.onItemChange);
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
        }

        private changeInfo(): void
        {
            let strHelp = Global.getLangStr("roadEvolve_help");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        private exchangeReward(): void
        {
            let replacement = new ReplacementData();
            replacement.title = Global.getLangStr("wish_dropCard_msg1");
            replacement.lotteryType = Pb_God._emLotteryType.LotteryType_Wishing;
            replacement.selectedIndex =  LotteryDataMgr.evolve.location == 0 ? cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_Wishing).lucky : LotteryDataMgr.evolve.location;
            replacement.save = new AlertOpenUIData_Fun();
            replacement.save.caller = this;
            replacement.save.fun = (btn: component.UIButton,index: number)=>{
                Pro.LotterySend.pool_Set(Pb_God._emLotteryType.LotteryType_Wishing,index);
            }
            UIManager.Inst.forceOpen(replacement);
        }

        private showHelp(btn: component.UIButton): void
        {
            CommonHelpView.show(btn, Global.getLangStr("road_evolve_des_1"));
        }
        
        /** 跳转道具购买入口 */
        private jumpBuy():void
        {
			let uiCfg = cfg.UiconfigUiopenCfgData.getInfo(parseInt(cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_Wishing).getway));
            TaskUtils.goto(uiCfg.panelNotify, uiCfg.page);
        }

        /** 消耗道具变化 */
        private onItemChange(fID: number, tempNewNum: number): void
        {
            if(fID == CfgID.ItemID.WishStar)
            {
                this.itemCount.text = tempNewNum + "";
            }
            Laya.timer.frameOnce(20, this, this.refreshDisplayInfo);
        }

        /** 更新许愿池道具  */
        private refreshEvolvePoolItem(value: Pb_God.PBG2CLotteryPoolSet = null): void
        {
            let location = LotteryDataMgr.evolve.location == 0 ? cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_Wishing).lucky : LotteryDataMgr.evolve.location;
            if(value){
                location = value.data.location;
            }
            this._curPoolInfo = cfg.LotteryPoolCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_Wishing,location);
            let itemInfo: cfg.AddItemInfo = cfg.AddItemInfo.parse(this._curPoolInfo.item)[0];
            // 许愿道具
            this._evolveItem.setItemInfo(itemInfo);
            this._evolveItem.BGImg.visible = false;
            this.des.text =  Global.getLangStr("wish_dropCard_msg5",Global.numberToChinese(this._curPoolInfo.itemcount));
        }

        /** 刷新所有道具 */
        public refreshAllItems(): void
        {
            let dispalyItem: Array<cfg.LotteryHuntCfgInfo> = cfg.LotteryHuntCfgData.getShowInfo(Pb_God._emLotteryType.LotteryType_Wishing);
            for (var i = 1; i < this.GRID_COUNT; i++)
            {
                this.refreshNorItem(i,dispalyItem[i]);
            }
            this.refreshDisplayInfo();
        }

        /** 刷新显示信息 */
        private refreshDisplayInfo(): void
        {
            this.refreshEvolvePoolItem();
            let lotteryinfo =  cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_Wishing);
            Global.setResSmallIconWithItemID(this.itemIcon,Pro.CfgID.ItemID.WishStar);
            this.itemCount.text = `${Global.getItemNum(Pro.CfgID.ItemID.WishStar)}`;

            // 免费次数
            this.wishFree.visible = lotteryinfo.freeCount > LotteryDataMgr.evolve.freecount;
            this.needBox.visible = !this.wishFree.visible;
            let wishone = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_Wishing,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1);
            let wishten = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_Wishing,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2);
            if(lotteryinfo.freeCount > LotteryDataMgr.evolve.freecount)
            {
                this.wishFree.text = `${Global.getLangStr("evolution_msg1")}${lotteryinfo.freeCount - LotteryDataMgr.evolve.freecount}/${lotteryinfo.freeCount}`
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

            // 进度
            this.proText.text = `${LotteryDataMgr.evolve.count}/${this._curPoolInfo.itemcount}`
            this.progress.width = (LotteryDataMgr.evolve.count) / this._curPoolInfo.itemcount * 288;

        }

        /** 刷新道具显示 */
        private refreshNorItem(index: number,evolutionHuntInfo: cfg.LotteryHuntCfgInfo): void
        {
            let itemUI = this.boxCells.getChildAt(index).getChildAt(0) as NorItemUI;
            itemUI.setItemID(parseInt(evolutionHuntInfo.addItem.split("_")[0]),0,false,false);
            itemUI.BGImg.visible = false;
        }

        /** 许愿一次 */
        private wishOne(): void
        {
            let wishOne = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_Wishing,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1);
            // 免费
            if(LotteryDataMgr.evolve.freecount < cfg.LotteryTypeCfgData.getInfoByType(Pb_God._emLotteryType.LotteryType_Wishing).freeCount)
            {
                LotterySend.refresh(Pb_God._emLotteryType.LotteryType_Wishing,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1)
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
                if (!TodayRepeatOpMgr.Inst.getTag(`lottery${Pb_God._emLotteryType.LotteryType_Wishing}_${Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1}`))
                {
                    UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(6,[Pb_God._emLotteryType.LotteryType_Wishing,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1]));
                }
                else
                {
                    LotterySend.refresh(Pb_God._emLotteryType.LotteryType_Wishing,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1)
                }
            }
        }

        /** 许愿十次 */
        private wishTen(): void
        {
            let wishTen = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(Pb_God._emLotteryType.LotteryType_Wishing,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2);
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
                Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount,true); // 消耗品1 提示
            }
            else if (costItem2.length > 0 && !Global.isFullRes(costItem2[0].itemid, costItem2[0].itemcount,false) && !Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount,false))
            {
                Global.isFullRes(costItem2[0].itemid, costItem2[0].itemcount,true); // 消耗品2 提示
            }
            else
            {
                // 消耗提示
                if (!TodayRepeatOpMgr.Inst.getTag(`lottery${Pb_God._emLotteryType.LotteryType_Wishing}_${Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2}`))
                {
                    UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(6,[Pb_God._emLotteryType.LotteryType_Wishing,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2]));
                }
                else
                {
                    LotterySend.refresh(Pb_God._emLotteryType.LotteryType_Wishing,Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2)
                }
            }
        }


        /** 漂浮道具动画  */
        private dispayItemAni(): void
        {
            for (var i = 0; i < this.GRID_COUNT; i++)
            {
                let itemUI = this.boxCells.getChildAt(i) as Laya.Image;
                Laya.Tween.clearAll(itemUI);
                
                if(i == 0)
                {
                    this.onTween3(itemUI);
                }
                else
                {
                    Math.floor(Math.random() * 2) == 1 ? this.onTween1(itemUI):this.onTween2(itemUI)
                }
            }
        }

        /**== 普通道具动画 */
        private onTween1(itemUI: any): void
        {
            Laya.Tween.to(itemUI,{y:itemUI.y - 10,ease:Laya.Ease.backOut,scaleX: 1.05,scaleY: 1.05},Math.random() * 2000 + 1000,Laya.Ease.linearOut,Laya.Handler.create(this,this.onTween2,[itemUI]));
        }

        private onTween2(itemUI: any): void
        {
            Laya.Tween.to(itemUI,{y:itemUI.y +  10,scaleX: 1,scaleY: 1},Math.random() * 2000 + 1000,Laya.Ease.linearOut,Laya.Handler.create(this,this.onTween1,[itemUI]));
        }

        /**== 许愿道具动画 */
        private onTween3(itemUI: any): void
        {
            Laya.Tween.to(itemUI,{y:itemUI.y - 5,ease:Laya.Ease.backOut,scaleX: 1.15,scaleY: 1.15},  1000,Laya.Ease.linearOut,Laya.Handler.create(this,this.onTween4,[itemUI]));
        }

        private onTween4(itemUI: any): void
        {
            Laya.Tween.to(itemUI,{y:itemUI.y +  5,scaleX: 1,scaleY: 1}, 1000,Laya.Ease.linearOut,Laya.Handler.create(this,this.onTween3,[itemUI]));
        }
    }
}