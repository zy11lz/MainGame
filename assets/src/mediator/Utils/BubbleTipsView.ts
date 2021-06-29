module Pro
{

    /**
    * 简单的冒泡提示文字
    * 打开任意界面后自动隐藏
    * @author jason.xu
    */
    export class BubbleTipsView extends ProUI.Utils.BubbleTipsUI
    {

        /** 显示时间标记（0：隐藏 -1表示显示中  大于0时为下次显示的时间） */
        public showTime = 0;


        public show(str: string, delayHide: number = 0, forceShow: boolean = false): void
        {
            this.showTime = -1;
            this.txtTips.text = str;
            this.bg.height = this.txtTips.height + 50;

            this.visible = true;

            Public.EffectUtils.clearYoyoTween(this.box);
            this.box.y = 0;
            Public.EffectUtils.yoyoTween(this.box, { y: -15 }, 800);

            if (!forceShow)
            {
                //有其它界面打开时，自动隐藏
                EventMgr.on(EventNotify.MainUI_BottomFun_Changed, this, this.hide);
                EventMgr.on(EventNotify.UI_Show_Change, this, this.hide);
            }

            Laya.timer.clear(this, this.hide);
            if (delayHide > 0)
            {
                Laya.timer.once(delayHide, this, this.hide);
            }
        }
        public hide(): void
        {
            this.showTime = 0;
            if (!this.visible) return;

            Laya.timer.clear(this, this.hide);

            //有其它界面打开时，自动隐藏
            EventMgr.off(EventNotify.UI_Show_Change, this, this.hide);
            EventMgr.off(EventNotify.MainUI_BottomFun_Changed, this, this.hide);

            Public.EffectUtils.clearYoyoTween(this.box);

            this.visible = false;
        }

    }
}