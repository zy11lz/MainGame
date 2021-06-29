module Pro
{
    /**
     * 等待小loading工具类
     * 目前游戏内有两种小loading  刚进游戏时的小资源转圈圈的效果， 进入游戏加载完基础资源后，改成显示成小人物跑动的特效
    * @author jason.xu
    */
    export class WaitPanelUtils
    {

        private static _showBigPanel = false;
        private static bigWaitPanel: ProUI.Common.BigWaitUI;
        private static bigWaitAni: SkeletonPlayer;
        /**
         * 显示一个大的等待界面(并非大loading , 会有一个小人物在跑动的特效)
         */
        private static showBigWaitPanel(showMsg = ""): void
        {
            let bigWaitPanel = this.bigWaitPanel;
            if (bigWaitPanel == null)
            {
                this.bigWaitPanel = bigWaitPanel = new ProUI.Common.BigWaitUI();
            }
            Laya.stage.addChild(bigWaitPanel);
            bigWaitPanel.txtLabel.text = showMsg || "";
            if (this.bigWaitAni == null)
            {
                this.bigWaitAni = new SkeletonPlayer();
                bigWaitPanel.effNode.addChild(this.bigWaitAni);
                this.bigWaitAni.load(Pro.UrlMgr.getSpineSceneUrl("mengchong/kedayahuang/kedayahuang"));
                this.bigWaitAni.pos(50, 0);
            }
            this.bigWaitAni.playByIndex(0, true);
        }

        /**
         * 移除界面
         */
        private static hideBigWaitPanel(): void
        {
            if(this.bigWaitAni)
            {
                this.bigWaitAni.stop();
            }
            common.DisplayUtils.removeFromParent(this.bigWaitPanel);
        }

        /** 正式进入游戏，切换小loading效果 */
        public static setGameState(): void
        {
            this._showBigPanel = true;
        }

        public static showWaitPanel(DelayShow = true, showMsg = ""): void
        {
            if (this._showBigPanel) { this.showBigWaitPanel(showMsg); }
            else { Global.showWaitPanel(DelayShow, showMsg); }
        }

        public static hideWaitPanel(): void
        {
            this.hideBigWaitPanel();
            Global.hideWaitPanel();
        }
    }
}