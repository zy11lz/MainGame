module Pro
{

    /**
    * 通用的帮助视图
    * <p>注： 此视图并非独立界面，而是附属在帮助按钮一起的界面内视图。
    * <p>初始化时需关联帮助按钮，并跟随帮助按钮位置显示。
    * @author jason.xu
    */
    export class CommonHelpView extends ProUI.Utils.CommonHelpViewUI
    {

        static itemUI: CommonHelpView;

        public static show(bindBtn: component.UIButton, strContent: string): void
        {
            if (this.itemUI == null)
            {
                this.itemUI = new CommonHelpView();
            }
            this.itemUI.showAndBindHelpBtn(bindBtn, strContent);
        }
        public static showWithLangKey(bindBtn: component.UIButton, langKey: string): void
        {
            this.show(bindBtn, Global.getLangStr(langKey));
        }

        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {
        }

        public showAndBindHelpBtn(btn: component.UIButton, strContent: string): void
        {
            strContent = strContent.replace(/[\n]/g, "<br>");
            Laya.stage.once(Laya.Event.MOUSE_DOWN, this, this.close);

            this.htmlContent.showText = strContent;
            Laya.timer.callLater(this, () =>
            {
                this.height = this.htmlContent.contextHeight + 60;
                this.width = this.htmlContent.contextWidth + 44;
                LayerManager.Inst.topUILayer.addChild(this);

                //根据按钮在屏幕上的位置，决定显示框的位置
                let btnGlobalPos = btn.localToGlobal(new Laya.Point(0, 0)); btnGlobalPos.y -= GameConfig.WinCenterY / 2;
                this.y = btnGlobalPos.y > GameConfig.WinHeight >> 1 ? btnGlobalPos.y - 35 - this.height : btnGlobalPos.y + 35;
                this.x = btnGlobalPos.x > GameConfig.WinWidth >> 1 ? btnGlobalPos.x - this.width : btnGlobalPos.x;
            });
        }

        public close(): void
        {
            this.removeSelf();
        }

        private addEvent(): void
        {
        }

    }
}