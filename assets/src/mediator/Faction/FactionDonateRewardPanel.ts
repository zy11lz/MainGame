module Pro
{
    /**
    * 公会捐献奖励预览界面
    * @author jason.xu
    */
    export class FactionDonateRewardPanel extends ProUI.Faction.FactionDonateRewardUI
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

        public show(rewards: cfg.AddItemInfo[]): void
        {
            LayerManager.Inst.topUILayer.addChild(this);
            PopUpManager.popUpUIAction(this, 0);

            //奖励道具
            this.listPrize.onRefresh(rewards.length, this, (itemRewardUI: NorItemUI, index: number) =>
            {
                itemRewardUI.setItemInfo(rewards[index]);
            });
        }

        public closeUI(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private addEvent(): void
        {
            this.btnClose.onClick(this, this.closeUI);
            this.btnOk.onClick(this, this.closeUI);
        }
    }
}