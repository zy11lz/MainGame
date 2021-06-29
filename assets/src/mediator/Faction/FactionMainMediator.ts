module Pro
{
    /**
    *
    * 模块：我的公会主界面
    *
    * @author jason.xu
    *
    */
    export class FactionMainMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Faction.FactionMainUI;

        /** 红点模型映射按钮 */
        private _reddotBindCtl: ReddotBindImageController = new ReddotBindImageController;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("faction")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionMainUI, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this._reddotBindCtl.cleanUp();
            this.closePanel();
        }

        /**
        * 初始化面板ui
        */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();

            this._reddotBindCtl.cleanUp();
            this.__bindRedDotModel("liveness", this.UIPanel.btnLiveness);
            this.__bindRedDotModel("factionwar", this.UIPanel.btnWar);
            this.__bindRedDotModel("factionboss", this.UIPanel.btnCopymap);
            this.__bindRedDotModel("skill", this.UIPanel.btnSkill);
            this.__bindRedDotModel("donate", this.UIPanel.btnDonate);
            this.__bindRedDotModel("apply", this.UIPanel.btnMember);     //成员申请放在成员列表界面里面
        }

        private __bindRedDotModel(reddotKey: string, btn: component.UIButton): void
        {
            this._reddotBindCtl.bind(btn.getChildByName("reddot") as Laya.Sprite, FactionDataMgr.reddotModel.getChildModel(reddotKey));
        }

        /** 模块的刷新方法, 在模块每次被呼出的时候自动调用,  用来同步刷新数据和显示*/
        public refreshUI()
        {
            this.onFactionDisplayUpdate();
            FactionSend.open();
        }

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            //datas
            this.addEventMgr(EventNotify.Faction_Change, this, this.onFactionChange);
            this.addEventMgr(EventNotify.Faction_DisplayUpdate, this, this.onFactionDisplayUpdate);
            this.addEventMgr(Cmd.S2C_Faction_Recruit.cmdName, this, this.onRecruit)

            //ui
            this.UIPanel.btnRename.onClick(this, this.onClickRename);
            this.UIPanel.btnEditNotice.onClick(this, this.onClickEditNotice);

            this.UIPanel.btnRecruit.onClick(this, this.onClickRecruit);
            this.UIPanel.btnSetting.onClick(this, this.onClickSetting);
            this.UIPanel.btnMember.onClick(this, this.onClickMember);
            this.UIPanel.btnLog.onClick(this, this.onClickLog);

            this.UIPanel.btnLiveness.onClick(this, this.onClickLiveness);
            this.UIPanel.btnWar.onClick(this, this.onClickWar);
            this.UIPanel.btnCopymap.onClick(this, this.onClickCopymap);
            this.UIPanel.btnSkill.onClick(this, this.onClickSkill);

            this.UIPanel.btnShop.onClick(this, this.onClickShop);
            this.UIPanel.btnRedPacket.onClick(this, this.onClickRedPacket);
            this.UIPanel.btnDonate.onClick(this, this.onClickDonate);
            this.UIPanel.btnRank.onClick(this, this.onClickRank);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {
        }

        /** 点击改名按钮 */
        private onClickRename(): void
        {
            if(TimeController.checkIsNotAllowSayAnything())
            {
                TipsUtils.showTipsByLanId("tips_not_allow");
                return;
            }
            var panel = new Pro.FactionRenamePanel();
            panel.show();
        }

        /** 点击修改宣言按钮 */
        private onClickEditNotice(): void
        {
            if(TimeController.checkIsNotAllowSayAnything())
            {
                TipsUtils.showTipsByLanId("tips_not_allow");
                return;
            }
            var panel = new Pro.FactionEditNoticePanel();
            panel.show();
        }

        /** 点击发布招募按钮 */
        private onClickRecruit(): void
        {
            var panel = new Pro.FactionIssueRecruitPanel();
            panel.show();
        }

        /** 点击入会设置 */
        private onClickSetting(): void
        {
            var panel = new Pro.FactionSettingPanel();
            panel.show();
        }

        /** 点击公会日志 */
        private onClickLog(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionLog));
        }

        /** 点击查看成员列表 */
        private onClickMember(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionMembers));
        }

        /** 点击公会活跃 */
        private onClickLiveness(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionLiveness));
        }

        /** 点击公会战 */
        private onClickWar(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWar), BaseBackUIType.HideBackUI);
        }

        /** 点击公会副本 */
        private onClickCopymap(): void
        {
            var isInBattle = Pro.BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_FactionCopymap);
            if (!isInBattle)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionBoss));
            }
        }

        /** 点击公会技能 */
        private onClickSkill(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionSkill));
        }

        /** 点击公会商店 */
        private onClickShop(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_Faction), BaseBackUIType.HideBackUI);
        }

        /** 点击公会红包 */
        private onClickRedPacket(): void
        {
            TipsUtils.showTipsByLanId("common_system_noOpen");
        }

        /** 点击公会捐献 */
        private onClickDonate(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionDonate));
        }

        /** 点击公会排名 */
        private onClickRank(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionRank));
        }

        /** 公会有变化 */
        private onFactionChange(): void
        {
            //帮会退出了
            if (!FactionDataMgr.isHaveFaction())
            {
                EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
            }
        }

        private onRecruit(value: Pb_God.PBG2CFactionRecruitAck): void
        {
            // 修改招募公共提示
            TipsUtils.showTipsByLanId("faction_msg36");
        }

        /** 公会基础信息变化 */
        private onFactionDisplayUpdate(): void
        {
            let display = FactionDataMgr.factionDisplay;
            if (!display) { return; }


            this.UIPanel.txtContent.text = display.base.declaration;
            this.UIPanel.txtFactionName.text = display.base.name;
            this.UIPanel.txtChair.text = display.leaderdisplay.playername;
            this.UIPanel.txtLv.text = display.base.level + Global.getLangStr("common_level");
            let expMax = cfg.FactionUpgradeCfgData.getExpByLevel(display.base.level);
            this.UIPanel.txtExp.text = expMax == 0 ? Global.getLangStr("common_lv_full") : display.base.exp + "/" + expMax;

            let curCount = display.people;
            // let maxCount = display.peoplemax;
            let maxCount = cfg.FactionUpgradeCfgData.getMemberCountByLevel(display.base.level);
            this.UIPanel.txtMemberCount.text = curCount + "/" + maxCount;
            this.UIPanel.txtMemberCount.color = curCount >= maxCount ? "#d45627" : "#259016";

            //是否公会会长
            let isChairman = FactionDataMgr.isChairman();
            let isLeader = FactionDataMgr.isLeader();
            this.UIPanel.btnRecruit.disabled = !isLeader;
            this.UIPanel.btnSetting.disabled = !isChairman;
            this.UIPanel.btnEditNotice.visible = isLeader;
            this.UIPanel.btnRename.visible = isChairman;
        }

    }
}