module Pro
{
    /**
    * 神界冒险-事件:宝藏箱
    * @author jason.xu
    */
    export class RiskEventBoxMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskEventBoxUI;

        /** 钥匙是否足够 */
        private _needItemFull: boolean = false;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("riskevent")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskEventBoxUI, 1, BaseAddLayer.TopUI,true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {//奖励预览
            let items = cfg.RiskCollectRandprizeCfgData.getAddItemArrayByType(Pb_God._emRiskRefreshType.RiskRefreshType_Box);
            this.UIPanel.listPreview.onRefresh(items.length, this, (norItemUI: NorItemUI, index: number) =>
            {
                norItemUI.setItemInfo(items[index]);
            });

            this.UIPanel.imgBox.frame = 1;
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnOpen.onClick(this, this.onClickOpen);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击打开 */
        private onClickOpen(): void
        {
            //检查钥匙数量是否足够
            if (!this._needItemFull)
            {
                TipsUtils.showTipsByLanId("tips_msg41");
                return;
            }
            this.UIPanel.imgBox.frame = 2;
            //延时自动关闭窗口
            Laya.timer.once(2000, this, this.closeUI);
            RiskSend.collectGrid(this.UIOpenData.customObject, 0, 0);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            //钥匙数量显示
            let needItemArr = cfg.RiskRefreshCfgData.getNeedItemByType(Pb_God._emRiskRefreshType.RiskRefreshType_Box).split("_");
            let keyId = parseInt(needItemArr[0]);
            let needCount = parseInt(needItemArr[1]);
            let ownCount = Global.getItemNum(keyId);
            this._needItemFull = ownCount >= needCount;
            this.UIPanel.itemKeyless.setNeedCountItem(keyId, ownCount, needCount, false);
        }

    }
}