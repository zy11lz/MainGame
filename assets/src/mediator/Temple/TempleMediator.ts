module Pro
{
    /**
    * 界面说明： 星河神殿主界面
    * @author jason.xu
    */
    export class TempleMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Temple.TempleUI;

        private _baseRoleList: BaseRole[] = [];
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("temple"), UrlMgr.getAtlas("commontitle01")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Temple.TempleUI, 0, BaseAddLayer.CenterUI, false, 1); //, GameConfig.curWidth(), GameConfig.curHeight()
            // this.showPanel(ProUI.Temple.TempleUI, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            super.closeUI();
            for (let role of this._baseRoleList)
            {
                Global.removeBaseRole(role);
            }
            this._baseRoleList = [];
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //初始化角色列表
            let listRoles = this.UIPanel.roleList;
            for (let i = 0, len = listRoles.numChildren; i < len; i++)
            {
                let roleNode = listRoles.getChildAt(i) as ProUI.Temple.TempleRoleViewUI;
                roleNode.txtNickname.text = Global.getLangStr("common_empty1");
                //称号
                let titleId = cfg.TempleCfgData.getAddTitleByID(i + 1);
                Global.setResShapeTitle(roleNode.imgTitle, titleId);
                roleNode.btn.onClick(this, () =>
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TemplePreAttack, i + 1), BaseBackUIType.None);
                });
            }

            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Temple_SynAll, this, this.onSynAll);

            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击帮助说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            let content = Global.getLangStr("temple_help");
            CommonHelpView.show(btn, content);
        }

		/*****
		 *同步所有信息			PBG2CTempleSynAll
		 * @param PBG2CTempleSynAll
		 * 		baseinfo			PBTempleInfoBase	神殿基本数据
		 */
        private onSynAll(value: Pb_God.PBG2CTempleSynAll): void
        {
            let listRoles = this.UIPanel.roleList;
            for (let i = 0, len = listRoles.numChildren; i < len; i++)
            {
                let id = i + 1;
                let roleNode = listRoles.getChildAt(i) as ProUI.Temple.TempleRoleViewUI;
                //称号
                Global.setResShapeTitle(roleNode.imgTitle, cfg.TempleCfgData.getAddTitleByID(id));

                let templeInfo = TempleDataMgr.getTempleInfo(id);
                if (!this._baseRoleList[i]) this._baseRoleList[i] = Global.createBaseRoleForPreview(roleNode.spAvatar, false);
                if (templeInfo && templeInfo.ownerdisplay && templeInfo.ownerdisplay.playerid)
                {
                    roleNode.txtNickname.text = templeInfo.ownerdisplay.playername;
                    let shapeResoursId = templeInfo.ownerdisplay.shape || 1;
                    this._baseRoleList[i].resetRes(shapeResoursId, RoleResType.Show, true);
                    var showScale = cfg.PetSkinCfgData.getShowScaleById(shapeResoursId);
                    this._baseRoleList[i].scale(showScale, showScale);
                } else
                {
                    //还没玩家占领
                    roleNode.txtNickname.text = Global.getLangStr("common_empty1");
                    let bossId = cfg.TempleCfgData.getMonsterByID(id);
                    let monsterInfo = cfg.TempleMonsterNewCfgData.getBossMonsterInfoById(bossId);
                    // let resId = cfg.PetCfgData.getSkinInfoByPetID(monsterInfo.skinId).id;
                    this._baseRoleList[i].resetRes(monsterInfo.skinId, RoleResType.Show, true);
                    var showScale = cfg.PetSkinCfgData.getShowScaleById(monsterInfo.skinId);
                    this._baseRoleList[i].scale(showScale, showScale);
                }
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            TempleSend.open();
        }

    }
}