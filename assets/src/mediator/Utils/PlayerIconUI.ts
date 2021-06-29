module Pro
{
    /** 玩家头像
     * 带头像icon 边框和等级显示
     * 可设置点击查看玩家信息
     */
    export class PlayerIconUI extends ProUI.Utils.PlayerIconUI
    {
        constructor()
        {
            super();
        }
        private _playerDisplayer: Pb_God.PBPlayerDisplay;
        private _clickHandler: Laya.Handler = null;

        /** 配置点击回调 */
        private resetClickHandler(isClickEnable: boolean): void
        {
            this.onClick(this, isClickEnable ? this.onClickHandler : null);
        }

        private onClickHandler(): void
        {
            //点到自己，无需处理
            if (this._playerDisplayer && this._playerDisplayer.playerid == PlayerDataMgr.uid)
            {
                TipsUtils.showTipsByLanId("tips_msg71");
                return;
            }
            if (this._playerDisplayer.playerid == 0)
            {
                return;
            }
            if (this._clickHandler)
            {
                this._clickHandler.run();
            }
            else
            {
                //查看玩家详细信息
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PlayerInfo, this._playerDisplayer));
            }
        }

        // ----------------------  公共方法 ---------------------------- 

        /** 自定义点击外部的回调
         * <p> 此功能属于扩展， 默认情况下，点击图标时会弹出查看玩家详细信息的界面， 如果配置了此扩展，则表示放弃弹出详细信息界面。
         * <p> 设置null时可恢复默认。
         */
        public setClickCallback(handler: Laya.Handler): void
        {
            this._clickHandler = handler;
        }

        /** 通过玩家角色数据配置显示
         * @param displayer 角色信息
         * @param isShowLevel 是否显示等级
         * @param isClickEnable 是否接收点击事件，点击回调默认为打开玩家详细信息界面， 除非配置了setClickCallback
         */
        public setPlayerDisplayInfo(displayer: Pb_God.PBPlayerDisplay, isShowLevel: boolean = true, isClickEnable: boolean = true): void
        {
            this._playerDisplayer = displayer;
            if (!displayer)
            {
                this.imgHeadIcon.skin = "";
                Global.setResHeadBorder(this.imgHeadBorder, 1);
                this.resetClickHandler(false);
                this.spLv.visible = false;
            } else
            {
                Global.setResIconWithItemID(this.imgHeadIcon, CfgID.ResType.Player_Icon, displayer.head);
                //边框
                Global.setResHeadBorder(this.imgHeadBorder, displayer.headicon);
                this.spLv.visible = isShowLevel;
                this.txtLv.text = displayer.level + "";
                this.resetClickHandler(isClickEnable);
            }
        }

        /** 通过简单信息配置显示
         * @param level 等级 设置0时直接不显示
         */
        public setSimpleInfo(headId: number, headBorderId: number = 1, gender: number = 0, level: number = 0): void
        {
            Global.setResIconWithItemID(this.imgHeadIcon, CfgID.ResType.Player_Icon, headId);
            //边框
            Global.setResHeadBorder(this.imgHeadBorder, headBorderId);
            this.spLv.visible = level > 0;
            this.txtLv.text = level + "";
            this.resetClickHandler(false);
        }

    }
}