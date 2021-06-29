module Pro
{
    /**
     * 
     * 春节战令购买
    */
    export class WelcomeWarOrderChargeMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.WelcomeWarOrder.WarOrderChargeUI;
        //public UIOpenData: BaseOpenUIData;

        private _chargeInfo: cfg.ChargeCfgInfo;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('warorderCharge')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.WelcomeWarOrder.WarOrderChargeUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            Public.LStorageMgr.GetInst().setLocalData(`warOderCharge_${ PlayerDataMgr.name }`, "true");
            // this._chargeInfo = PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_Activity_WarOrder)[0];
            let chargeInfoGroup = PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_Activity_WarOrder);
            let warParam = cfg.ActivityCfgData.getchangeID(this.UIOpenData.customObject);
            for (var index = 0; index < chargeInfoGroup.length; index++)
            {
                if (chargeInfoGroup[index].iD == warParam.chargeID)
                {
                    this._chargeInfo = chargeInfoGroup[index];
                    break;
                }
            }

            if (!this._chargeInfo)
            {
                logE(`请检查类型为${ Pb_God._emChargeType.ChargeType_Activity_WarOrder }的charge配置`);
                return;
            }

            this.UIPanel.txtBuyPrice.text = (this._chargeInfo.needMoney / 100) + Global.getLangStr("common_buy");

            let addItems = cfg.ChargeCfgData.getAddItemAryByID(this._chargeInfo.iD);
            this.UIPanel.listReward1.onRefreshWithArray(addItems, this, (norItem: NorItemUI, index: number) =>
            {
                norItem.setItemInfo(addItems[index]);
            })

            //进阶奖励总览
            let addItems2 = cfg.ActivityWarOrderLevelCfgData.getAllAddItems(this.UIOpenData.customObject);
            this.UIPanel.listReward2.onRefreshWithArray(addItems2, this, (norItem: NorItemUI, index: number) =>
            {
                norItem.setItemInfo(addItems2[index]);
            })
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnBuy.onClick(this, this.onClickBuy);

            EventMgr.on(CmdEvent.Platform_update_chargeinfo, this, this.closeUI);
            EventMgr.on(CmdEvent.Platform_SynCharge, this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickBuy()
        {
            if (!this._chargeInfo) return;
            PlatformDataMgr.onChargeRequest(this._chargeInfo);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}