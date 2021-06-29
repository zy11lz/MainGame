module Pro
{
    /**
    * 
    * 冠军赛界面单个英雄显示对象
    *
    * @author lz
    * 
    */
    export class WeekChampArenaEnterRole extends ProUI.Challenge.ArenaEnterRoleBoxUI
    {

        //当前显示的分页（0-排位赛  1-冠军赛）
        private _curPage: number = 0;
        public index: number = 0;

        private _role: BaseRole;

        /** 当前用户数据 */
        public bindPlayerId: number = 0;


        private _colorList = ["#d68004", "#cd4af3", "#3876c9"];
        private _colorList1 = ["#d92b76", "#e37625", "#5fa522"];

        constructor()
        {
            super();
            this.initialization();
        }
        private initialization()
        {
            this.btnWorship.onClick(this, this.onClickWorship);
        }

        /** 初始化UI状态 */
        public initUI()
        {
            if (!this._role)
            {
                this._role = Global.createBaseRoleForPreview(this.avatar, false);
                this._role.scale(1.5, 1.5);
            }
        }

        /** 逆初始化UI状态 */
        public unInitUI(): void
        {
            if (this._role) Global.removeBaseRole(this._role);
            this._role = null;
        }

        /** 点击膜拜回调 */
        private onClickWorship()
        {
            if(WeekChampionDataMgr.isLikeMax())
            {
                TipsUtils.showTipsByLanId("tips_msg67");
                return;
            }
            WeekChampionSend.like(this.bindPlayerId);
        }

        /** 设置膜拜状态 */
        public setWorshipValue(value: number, canWorship: boolean)
        {
            this.txtWorshipCount.text = value + "";
            this.btnWorship.disabled = !canWorship;
        }

        /** 设置角色数据 */
        public setRoleData(page: number, playerdisplay: Pb_God.PBPlayerDisplay, index: number): void
        {
            this._curPage = page;
            if (!playerdisplay)
            {
                this.bindPlayerId = 0;
                this.txtNickname.text = Global.getLangStr("common_empty1");
                this.avatar.visible = false;
                this.imgTitle.visible = false;
            } else
            {
                this.avatar.visible = true;
                this.imgTitle.visible = page == 1;
                this.txtNickname.y = page == 1 ? 55 : -15;
                if (page == 1)
                { //冠军赛才需要显resetRes
                    Global.setResShapeTitle(this.imgTitle, cfg.WeekChampionTopPrizeCfgData.getAddTitleByRank(this.index + 1));
                }
                this.bindPlayerId = playerdisplay.playerid;
                this.txtNickname.text = playerdisplay.playername;
                let shapeResoursId = playerdisplay.shape || 1;//cfg.PetSkinCfgData.getResourceIDByID(playerdisplay.shape || 1);
                this._role.resetRes(shapeResoursId, RoleResType.Show, true);
            }
            this.txtNickname.strokeColor =  page == 1 ? this._colorList1[index] : this._colorList[index]; 
        }

    }
}