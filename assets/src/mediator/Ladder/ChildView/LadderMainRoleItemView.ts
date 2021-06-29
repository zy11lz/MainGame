module Pro
{
    /**
    * 跨服天梯主界面单个角色攻击目标视图
    * @author jason.xu
    * 
    */
    export class LadderMainRoleItemView extends ProUI.Ladder.ChildView.MainRoleItemUI
    {
        /** 形象展示 */
        private _role: BaseRole;

        private _data: Pb_God.PBLadderObject;

        constructor()
        {
            super();
            this.initialization();
        }
        private initialization(): void
        {
            this.btnAttack.onClick(this, this.onClickAttack);

            this.on(Laya.Event.DISPLAY, this, () =>
            {
                this.controllEvents(false);
            });
        }
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            if (!isOff)
            {
                this.initRole();
                this.on(Laya.Event.UNDISPLAY, this, this.controllEvents);
            } else
            {
                this.unInitRole();
            }
        }

        /** 初始化UI状态 */
        private initRole()
        {
            if (!this._role) this._role = Global.createBaseRoleForPreview(this.avatar, false);
        }

        /** 逆初始化UI状态 */
        private unInitRole(): void
        {
            if (this._role) Global.removeBaseRole(this._role);
            this._role = null;
        }

        /** 点击发起挑战 */
        private onClickAttack(): void
        {
            if (!this._data) return;  //异常处理
            //判断时间是否超时
            if (!LadderDataMgr.isUnderAway())
            {
                TipsUtils.showTipsByLanId("common_timeOver");
                return;
            }
            //判断参赛资格
            let challengeRank = ChallengeDataMgr.getMyOrder();
            if (challengeRank == 0 || challengeRank > 100)
            {
                TipsUtils.showTipsByLanId("ladder_msg8");
                return;
            }
            //判断次数
            if (LadderDataMgr.getLeftCount() <= 0)
            {
                TipsUtils.showTipsByLanId("common_noCount2");
                return;
            }
            if (this._data.display && this._data.display.playerid == PlayerDataMgr.uid)
            {
                TipsUtils.showTipsByLanId("ladder_msg9");
                return;
            }

            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LadderPreAttack, this._data));
        }


        /** 随机时，外形保持不变，避免界面频繁刷新时，一直随机变化 */
        private _randRoleResId = 0;
        /** 设置单个英雄（挑战目标）item的状态 */
        public setData(data: Pb_God.PBLadderObject): void
        {
            this._data = data;

            if (data)
            {
                this.boxFightValue.visible = true;
                this.btnAttack.visible = true;
                this.txtNoopenTips.visible = false;
                let display = data.display;
                //外形展示
                let shapeResoursId = display.shape || 1;//cfg.PetSkinCfgData.getResourceIDByID();
                this._role.resetRes(shapeResoursId, RoleResType.Show, true);
                let showScale = cfg.PetSkinCfgData.getShowScaleById(shapeResoursId);
                this._role.scale(showScale, showScale);
                this.txtFightValue.text = data.param ? data.fightpower + "" : data.defense.fightpower + "";
                this.txtRank.text = Global.getLangStr("common_rank3", data.rank);
                this.txtNickname.text = display.playername;
            } else
            {
                this.txtNickname.text = Global.getLangStr("common_empty1");
                this.txtNoopenTips.visible = true;
                this.boxFightValue.visible = false;
                this.btnAttack.visible = false;
                //随机一个形象展示
                if (this._randRoleResId == 0)
                {
                    let allShape = cfg.PetSkinCfgData.getAllList();
                    let shapeCfgInfo = allShape[Global.getRandomNum(0, allShape.length)];
                    this._randRoleResId = shapeCfgInfo.id;
                }
                this._role.resetRes(this._randRoleResId, Pro.RoleResType.Show, true);
                let showScale = cfg.PetSkinCfgData.getShowScaleById(this._randRoleResId);
                this._role.scale(showScale, showScale);
            }
        }

    }
}