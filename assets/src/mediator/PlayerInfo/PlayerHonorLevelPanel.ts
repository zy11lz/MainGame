module Pro
{

    /**
    * 个人空间荣誉等级查看界面
    * @author jason.xu
    */
    export class PlayerHonorLevelPanel extends ProUI.PlayerInfo.PlayerHonorLevelUI
    {

        public static show(nickname: string, exp: number, collectCount: number, isShowNext: boolean): void
        {
            var view = new PlayerHonorLevelPanel();
            view.setData(nickname, exp, collectCount, isShowNext);
            view.show();
        }

        constructor()
        {
            super();
        }

        public setData(nickname: string, exp: number, collectCount: number, isShowNext: boolean): void
        {
            this.txtNickname.text = nickname;
            this.txtExp.text = Global.getLangStr("playerinfo_msg3") + exp;
            this.txtCount.text = Global.getLangStr("playerinfo_msg4") + collectCount;
            let curCfg = cfg.ShapeHonorUpgradeCfgData.getInfoByExp(exp);
            this.imgIcon.skin = `res/Unpack/Icon/Honor/${ curCfg.iconName }.png`;
            this.txtName.text = curCfg.name;
            if (isShowNext)
            {
                let nextCfg = cfg.ShapeHonorUpgradeCfgData.getInfo(curCfg.level + 1);
                if (!nextCfg) isShowNext = false;
                else
                {
                    this.imgNextIcon.skin = `res/Unpack/Icon/Honor/${ nextCfg.iconName }.png`;
                    this.txtNextName.text = nextCfg.name;
                }
            }

            this.boxNext.visible = isShowNext;
            //适配两种界面尺寸
            if (isShowNext)
            {
                this.boxCur.y = 70;
                this.height = 416;

            } else
            {
                this.boxCur.y = 89;
                this.height = 327;
            }
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