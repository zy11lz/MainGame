
module Pro
{
    export class FightDailyAlertTipsMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Fuben.Daily.AlertTipsUI;

        public _feeCount: number = 0;       /**免费扫荡次数 */
        public _buyCount: number = 0;       /**可购买扫荡次数 */
        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return [];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Fuben.Daily.AlertTipsUI, 3,BaseAddLayer.CenterUI,true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
          
            this.UIPanel.CloseBtn.onClick(this, this.closeUI);
            this.UIPanel.SureBtn.onClick(this, this.clickSureBtn);
        
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Copymap_BuyCount, this, this.onBuyCount);
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
            // 免费次数
            this._feeCount = CopymapDataMgr.getFightDailyLastFightCount(this.UIOpenData.customObject);
            // 付費次數
            this._buyCount = CopymapDataMgr.getFightDailyLastBuyCount(this.UIOpenData.customObject);
            // 付費價格
            let tempFubenPrice = cfg.CopymapCfgData.getSweepNeedItemAryById(this.UIOpenData.customObject2)

            this.UIPanel.CostNumLb.text = Global.getLangStr("fight_msg54", this._feeCount);
            this.UIPanel.CostBaseLb.text = Global.getLangStr("fight_msg55", this._buyCount);

            this.UIPanel.GetNumLb.text =  `${tempFubenPrice[0].itemcount * this._buyCount}`;
            cfg.CopymapCfgData.getSweepNeedItemAryById

        }

        /** 确定购买 */
        private clickSureBtn(): void
        {
            // 免费次数 + 钻石扫荡
            let itemInfo: cfg.AddItemInfo = this.getExpendSweepNeedItem();
            if (!Global.isFullRes(itemInfo.itemid,itemInfo.itemcount))
            {
                return;
            }

            for (let i = 0; i < this._feeCount; i++) 
            {
                CopymapSend.sweep(this.UIOpenData.customObject2);
            }

            if (this._buyCount > 0)
            {
                CopymapSend.buyCount(this.UIOpenData.customObject2);
            }
            else
            {
                this.closeUI();
            }
        }

        /**一键扫荡所需道具 */
        private getExpendSweepNeedItem(): cfg.AddItemInfo
        {
            let arr = new cfg.AddItemInfo();
            let tempFubenPrice = cfg.CopymapCfgData.getSweepNeedItemAryById(this.UIOpenData.customObject2)
            for (let i = 0; i < this._buyCount; i++) {
                let itemInfo = cfg.CopymapCfgData.getSweepNeedItemAryById(this.UIOpenData.customObject2)
                arr.itemid = itemInfo[0].itemid;
                arr.itemcount += itemInfo[0].itemcount;
            }
            return arr;
        }


        private onBuyCount()
        {
            CopymapSend.sweep(this.UIOpenData.customObject2);
            if(this.checkBuy())
            {
                // 这个地方有个坑. 结算奖励是100ms内间隔下发所有累计奖励  当网络环境较弱时 会出现显示错误..
                setTimeout(()=>
                {
                    CopymapSend.buyCount(this.UIOpenData.customObject2);
                }, 1);
            }
            else
            {
                this.closeUI();
            }
        }

        /** 检测是否还能购买 */
        private checkBuy(): boolean
        {
            if(CopymapDataMgr.getFightDailyLastBuyCount(this.UIOpenData.customObject) > 0)
            return true

            return false;
        }

    }
    
}