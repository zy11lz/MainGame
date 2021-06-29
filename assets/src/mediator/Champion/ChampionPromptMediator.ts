module Pro
{
    /**
    *
    * 模块：冠军赛提示弹窗
    *
    * @author jason.xu
    *
    */
    export class ChampionPromptMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Champion.ChampionPromptUI;

        private _countDown: number;

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
            // return [UrlMgr.getAtlas("faction")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Champion.ChampionPromptUI, 1);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            Laya.timer.clearAll(this);
            this.closePanel();
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //初始化奖励预览列表
            let addItems = cfg.ChampionConstInfoCfgData.getAddItemAryByInfo();
            this.UIPanel.listItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });
            this.refreshUI();
        }

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            this.UIPanel.btnCancel.onClick(this, this.closeUI);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnEnter.onClick(this, this.onClickEnter);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

        private onClickEnter(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Champion), BaseBackUIType.CloseQuene);
        }

        /** 模块的刷新方法, 在模块每次被呼出的时候自动调用,  用来同步刷新数据和显示*/
        public refreshUI()
        {
            this._countDown = 10;
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        private onTimer(): void
        {
            this._countDown--;
            if (this._countDown < 0)
            {
                this.closeUI();
                return;
            }
            this.UIPanel.txtCountdown.text = Global.getLangStr("champ_msg17", this._countDown); // `取消(${this._countDown})`;
        }

    }
}