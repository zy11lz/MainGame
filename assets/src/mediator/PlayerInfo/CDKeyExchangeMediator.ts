module Pro
{
    /**
     * CD KEY兑换界面
     */
    export class CDKeyExchangeMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.PlayerInfo.CDKeyExchangeUI;

        private _preReqTime: number = 0;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.PlayerInfo.CDKeyExchangeUI, 1, BaseAddLayer.TopUI);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btn_close.onClick(this, this.closeUI);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.UIPanel.inputKey.prompt = Global.getLangStr("PlayerInfo_CDKey_msg1");
            this.UIPanel.btnConfirm.onClick(this, this.exchange);
        }

        exchange()
        {
            if (this.UIPanel.inputKey.text.length == 0)
            {
                TipsUtils.showTips(Global.getLangStr("PlayerInfo_CDKey_msg1"));
                return;
            }
            if (getTimer() - this._preReqTime < 3000)
            {
                TipsUtils.showTips("请勿频繁点击");
                return;
            }
            this._preReqTime = getTimer();
            //兑换奖励
            WealSend.cDK(this.UIPanel.inputKey.text);
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }
    }
}