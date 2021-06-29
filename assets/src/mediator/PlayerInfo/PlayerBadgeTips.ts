module Pro
{

    /**
    * 个人空间荣誉徽章tips
    * @author jason.xu
    */
    export class PlayerBadgeTips extends ProUI.PlayerInfo.PlayerBadgeTipsUI
    {

        public static show(badgeId: number, owenPlayer: string, getTime: number = 0): void
        {
            var view = new PlayerBadgeTips();
            view.setData(badgeId, owenPlayer, getTime);
            view.show();
        }

        constructor()
        {
            super();
        }

        public setData(badgeId: number, owenPlayer: string, getTime: number = 0): void
        {
            let cfgInfo = cfg.ShapeBadgeCfgData.getInfo(badgeId);
            this.imgIcon.skin = `res/Unpack/Icon/Honor/${ cfgInfo.iconName }.png`;
            this.txtNickname.text = owenPlayer;
            this.txtName.text = cfgInfo.name;
            this.txtCondition.text = Global.getLangStr("playerinfo_msg2") + cfgInfo.activeDesc;
            this.txtDesc.text = cfgInfo.desc;
            this.txtTime.text = getTime ? Global.getFormatTimeString(getTime / 1000, 2) : "";
        }

        public show(): void
        {
            LayerManager.Inst.topUILayer.addChild(this);
            //背景添加关闭触发
            let tempCoverSp = PopUpManager.popUpUIAction(this, 0);
            if (tempCoverSp)
            {
                tempCoverSp.on(Laya.Event.CLICK, this, this.closeUI);
            }
        }

        public closeUI(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }
    }
}