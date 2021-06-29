module Pro
{

    /**
    * 显示世界等级的视图
    */
    export class WorldLvHelpView extends ProUI.Utils.WorldLvItemUI
    {

        static itemUI: WorldLvHelpView;

        public static show(bindBtn: component.UIButton): void
        {
            if (this.itemUI == null)
            {
                this.itemUI = new WorldLvHelpView();
            }
            this.itemUI.showAndBindHelpBtn(bindBtn);
        }

        constructor()
        {
            super();
            EventMgr.on(Cmd.S2C_Common_QueryWorldLevel.cmdName, this, this.onQueryWorldLevel);
        }

        public showAndBindHelpBtn(btn: component.UIButton): void
        {
            Laya.stage.once(Laya.Event.MOUSE_DOWN, this, this.close);
            LayerManager.Inst.topUILayer.addChild(this);

            //根据按钮在屏幕上的位置，决定显示框的位置
            let btnGlobalPos = btn.localToGlobal(new Laya.Point(0, 0)); btnGlobalPos.y -= GameConfig.WinCenterY / 2;
            this.y = btnGlobalPos.y > GameConfig.WinHeight >> 1 ? btnGlobalPos.y - 35 - this.height : btnGlobalPos.y + 35;
            this.x = btnGlobalPos.x > GameConfig.WinWidth >> 1 ? btnGlobalPos.x - this.width : btnGlobalPos.x;

            //显示等级
            this.LvLb.text = 0 + Global.getLangStr("common_level");

            CommonSend.queryWorldLevel();
        }

        private onQueryWorldLevel(value: Pb_God.PBU32)
        {
            this.LvLb.text = value.value + Global.getLangStr("common_level");
        }

        public close(): void
        {
            this.removeSelf();
        }
    }
}