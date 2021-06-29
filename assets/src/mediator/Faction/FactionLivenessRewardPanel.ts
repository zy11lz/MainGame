module Pro
{
    /**
    * 公会活跃奖励预览界面
    * @author jason.xu
    */
    export class FactionLivenessRewardPanel extends ProUI.Faction.FactionLivenessRewardUI
    {

        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {

        }

        public show(): void
        {
            this.refreshUI();
            LayerManager.Inst.topUILayer.addChild(this);
            PopUpManager.popUpUIAction(this, 0);
        }

        public closeUI(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private addEvent(): void
        {
            this.btnClose.onClick(this, this.closeUI);
        }

        refreshUI(): void
        {
            let len = cfg.FactionLivenessCfgData.getAllList().length - 1; //0级没有奖励，需要舍弃
            this.listView.onRefresh(len, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Faction.ChildView.FactionLivenessRewardItemViewUI, index: number): void
        {
            let cfgData = cfg.FactionLivenessCfgData.getAllList()[index + 1];
            tempUI.htmlContent.showText = Global.getLangStr("faction_msg4", cfgData.level);


            //奖励道具
            let rewards = cfg.FactionLivenessCfgData.getAddItemAryByInfo(cfgData);
            tempUI.norItemListView.onRefresh(rewards.length, this, (itemRewardUI: NorItemUI, index: number) =>
            {
                itemRewardUI.setItemInfo(rewards[index]);
            });
        }
    }
}