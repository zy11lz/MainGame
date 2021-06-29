
module Pro
{
    /**
     * 通用警告窗口面板(des/backTxt,caller,fun/sureTxt,caller,fun)
     */
    export class ReplacementMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Common.ReplacementUI;

        /** UI打开参数 */
        public UIOpenData: ReplacementData;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [];
        }

        public openUI()
        {
            this.showPanel(ProUI.Common.ReplacementUI, 1, BaseAddLayer.CenterUI,true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._isAutoReleaseRes = false;        
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(Cmd.S2C_Lottery_Pool_Set.cmdName, this, this.closeUI);
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
            if(!this.UIOpenData.itemList)this.UIOpenData.itemList = cfg.LotteryPoolCfgData.getItemsByType(this.UIOpenData.lotteryType);
            // 标题
            this.UIPanel.title.text = this.UIOpenData.title;
            // 奖励池
            this.UIPanel.itemListView.selectedIndex = this.UIOpenData.selectedIndex || 1;
            // 描述
            let poolInfo = cfg.LotteryPoolCfgData.getInfoByTypeAndIndex(this.UIOpenData.lotteryType,this.UIPanel.itemListView.selectedIndex);
            this.UIPanel.des.text = Global.getLangStr("wish_dropCard_msg2",Global.numberToChinese(poolInfo.itemcount)); 

            this.refreshAllItems();
            
            this.UIPanel.cancelBtn.onClick(this, (btn: component.UIButton) =>
            {
                this.closeUI();
                //取消事件触发
                if (this.UIOpenData.cancel && this.UIOpenData.cancel.fun != null)
                {
                    this.UIOpenData.cancel.fun.apply(this.UIOpenData.cancel.caller, [btn]);
                }
            });

            this.UIPanel.saveBtn.onClick(this, (btn: component.UIButton) =>
            {
                //确认事件触发
                if (this.UIOpenData.save.fun != null)
                {
                    this.UIOpenData.save.fun.apply(this.UIOpenData.save.caller, [btn,this.UIPanel.itemListView.selectedIndex]);
                }
            });

            this.UIPanel.closeBtn.onClick(this, (btn: component.UIButton) =>
            {
                this.closeUI();
                //取消事件触发
                if (this.UIOpenData.cancel && this.UIOpenData.cancel.fun != null)
                {
                    this.UIOpenData.cancel.fun.apply(this.UIOpenData.cancel.caller, [btn]);
                }
            });
        }

        /** 刷新奖励池 */
        public refreshAllItems(): void
        {
            let itemCount = cfg.LotteryTypeCfgData.getInfoByType(this.UIOpenData.lotteryType).limit;
            this.UIPanel.itemListView.onRefresh(itemCount, this, (box: Laya.Box, index: number) =>
            {
                let itemRewardUI = box.getChildAt(0) as NorItemUI;
                let select = box.getChildAt(1) as Laya.Image;
                itemRewardUI.setItemInfo(this.UIOpenData.itemList[index], false, true, false);
                itemRewardUI["scaleDown"] = 0.8;
                itemRewardUI.onClick(this, this.onItemClick);
                itemRewardUI.name = box.name
                select.visible = (this.UIPanel.itemListView.selectedIndex - 1) == index;
            });
            this.UIPanel.itemListView.scrollTo(this.UIPanel.itemListView.selectedIndex);
            this.UIPanel.selItem.setItemInfo(this.UIOpenData.itemList[this.UIPanel.itemListView.selectedIndex - 1],false,true);
        }

        /** item点击 */
        private onItemClick(btn: NorItemUI)
        {
            this.UIPanel.itemListView.selectedIndex = parseInt(btn.name) + 1;
            this.UIPanel.selItem.setItemInfo(this.UIOpenData.itemList[this.UIPanel.itemListView.selectedIndex - 1],false,true);
            let poolInfo = cfg.LotteryPoolCfgData.getInfoByTypeAndIndex(this.UIOpenData.lotteryType,this.UIPanel.itemListView.selectedIndex);
            this.UIPanel.des.text = Global.getLangStr("wish_dropCard_msg2",Global.numberToChinese(poolInfo.itemcount)); 
        }
    }
}