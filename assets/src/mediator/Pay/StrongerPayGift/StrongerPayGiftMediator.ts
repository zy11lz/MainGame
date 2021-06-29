module Pro
{
    /** 变强助力付费礼包类型(针对付费类型为16：_emChargeType.ChargeType_Help的子类型划分 ) */
    export enum emStrongerPayGiftType
    {
        /** 元灵 */
        Artifact = 1,
        /** 圣物 */
        Holy = 2,
    }
    /**
     * 界面说明： 助力礼包直购界面（各培养界面跳转进来，比如元灵跳转进来购买元灵礼包等）
    * @author jason.xu
    */
    export class StrongerPayGiftMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Pay.StrongerGift.PayStrongerGiftUI;

        private _chargeCfgList: cfg.ChargeCfgInfo[] = [];
        private _curChargeCfgInfo: cfg.ChargeCfgInfo;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('timeLimitGift')];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return ["res/timeLimitGift/zulilibao_pic01.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Pay.StrongerGift.PayStrongerGiftUI, 1, BaseAddLayer.TopUI,true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btnBuy.frequencyClickLock = 500; //限制频繁点击
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._chargeCfgList = PlatformDataMgr.getCanBuyListByType(this.UIOpenData.customObject, this.UIOpenData.customObject2);
            //有需要切换的分页
            this.UIPanel.tabBox.visible = this._chargeCfgList.length > 1;
            //分页带滚动
            this.UIPanel.imgTabRightArrow.visible = this.UIPanel.imgTabLeftArrow.visible = this._chargeCfgList.length > 4;
            let uiTabDatas = [];
            for (let cfgInfo of this._chargeCfgList)
            {
                uiTabDatas[uiTabDatas.length] = new component.UITabData(cfgInfo.name);
            }
            //主分页按钮
            this.UIPanel.tabGrp.onClick(this, this.onClickTab, uiTabDatas,
               [new component.UITabStyle("#f12a53"), new component.UITabStyle("#fffced")]
            );
            this.UIPanel.tabGrp.setSelectTab(0);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnBuy.onClick(this, this.onClickBuy);

            this.addEventMgr(CmdEvent.Platform_update_chargeinfo, this, this.refreshBuyInfoView);
            this.addEventMgr(CmdEvent.Platform_SynCharge, this, this.refreshBuyInfoView);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击购买按钮 */
        private onClickBuy(): void
        {
            PlatformDataMgr.onChargeRequest(this._curChargeCfgInfo);
        }

        /** 切换主分页 */
        private onClickTab(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this._curChargeCfgInfo = this._chargeCfgList[tabIndex];
            this.UIPanel.htmlDesc.showText = this._curChargeCfgInfo.desc;

            this.refreshBuyInfoView();

            //奖励预览
            let rewards = cfg.ChargeCfgData.getAddItemAryByID(this._curChargeCfgInfo.iD);
            this.UIPanel.itemListReward.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(rewards[index]);
            });
        }

        /** 刷新当前购买状态 */
        private refreshBuyInfoView(): void
        {
            let cfgInfo = this._curChargeCfgInfo;
            //限购次数与按钮状态处理
            let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(cfgInfo);
            let hasBuyCount = chargeInfo ? chargeInfo.buycount : 0;
            this.UIPanel.txtLimitCount.text = Global.getLangStr("common_buyLimit2", hasBuyCount, cfgInfo.maxBuyCount);

            let leftCount = cfgInfo.maxBuyCount - hasBuyCount;
            if (leftCount <= 0)
                this.UIPanel.txtBuyLable.text = Global.getLangStr("common_isBuy");//已购买
            else
                this.UIPanel.txtBuyLable.text = Global.getLangStr("activity_timeLimitGift_msg2", cfgInfo.needMoney / 100);

            this.UIPanel.btnBuy.disabled = leftCount <= 0;
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}