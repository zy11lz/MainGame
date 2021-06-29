module Pro
{
    /**
    * 界面说明： 星河神殿准备挑战界面。
    * @author jason.xu
    */
    export class TemplePreAttackMediator extends BaseMediator implements IMediator
    {
        /** boss形象 */
        private _role: BaseRole;

        public UIPanel: ProUI.Temple.TemplePreAttackUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("temple")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Temple.TemplePreAttackUI, 1,BaseAddLayer.CenterUI,true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            super.closeUI();
            Global.removeBaseRole(this._role);
            this._role = null;
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            let htmlContent = this.UIPanel.htmlCondition;

            this.UIPanel.grpList.selectEnable = true;
            this.UIPanel.grpList.selectedIndex = 0;
            this.UIPanel.grpList.onRefresh(3, this, (btn: Pro.CheckButton, index: number) =>
            {
                let count = cfg.TempleIdCountCfgData.getCountByType(index + 1);
                btn.setText(Global.getLangStr("temple_msg1", count));
                btn.isSelected = index == this.UIPanel.grpList.selectedIndex;
            });
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            if (!this._role) this._role = Global.createBaseRoleForPreview(this.UIPanel.spBossAvatar);
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Challenge_Order_Change, this, this.onChallengeOrderChange);

            // this.addEventMgr(EventNotify.test, this, this.test);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnChallenge.onClick(this, this.onClickChallenge);
            this.UIPanel.btnAttack.onClick(this, this.onClickAttack);

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击竞技场 */
        private onClickChallenge(): void
        {
            //先回到主城界面
            EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
            var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Challenge);
            if (!results)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Challenge), BaseBackUIType.CloseQuene);
            }
        }

        /** 点击挑战 */
        private onClickAttack(): void
        {
            let id = this.UIOpenData.customObject;
            let needRank = cfg.TempleCfgData.getNeedChallengeRankByID(id);
            let myRank = ChallengeDataMgr.getMyOrder();
            if (!myRank || myRank > needRank)
            {
                TipsUtils.showTipsByLanId("temple_msg2", needRank);
                return;
            }
            //时间限制
            let time = TempleDataMgr.limitOverTime - TimeController.currTimer / 1000;
            if (time > 0)
            {
                TipsUtils.showTipsByLanId("temple_msg3", Math.ceil(time / 60));
                return;
            }
            //进化次数
            let count = cfg.TempleIdCountCfgData.getCountByType(this.UIPanel.grpList.selectedIndex + 1);
            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Temple, id, count);

            this.closeUI();

            // //战前布阵->发起挑战
            // UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_Temple, id, count), BaseBackUIType.HideBackUI);

        }

        /** 竞技场排名变化 */
        onChallengeOrderChange(): void
        {
            let needRank = cfg.TempleCfgData.getNeedChallengeRankByID(this.UIOpenData.customObject);
            let myRank = ChallengeDataMgr.getMyOrder() || Global.getLangStr("common_norank");
            this.UIPanel.htmlCondition.showText = Global.getLangStr("temple_msg4", needRank, myRank);
        }


        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            //当前打开的神殿位置
            let templeId: number = this.UIOpenData.customObject;
            let templeInfo = TempleDataMgr.getTempleInfo(templeId);

            //拉取一次竞技场数据，获取当前竞技场排名
            ChallengeSend.open();
            this.onChallengeOrderChange();
            let evolvecount = templeInfo ? templeInfo.evolvecount : 0;
            this.UIPanel.txtUpCount.text = evolvecount + "";
            this.UIPanel.hboxTxtUpCount.refresh();
            //BOSS技能
            this.refreshSkillList(cfg.TempleCfgData.getTypeByID(templeId), evolvecount);

            //称号数据
            let titleId = cfg.TempleCfgData.getAddTitleByID(templeId);
            Global.setResShapeTitle(this.UIPanel.imgTitle, titleId);
            let cfgInfo = cfg.ShapeTitleCfgData.getInfo(titleId);
            let addAttrs = cfg.ShapeTitleCfgData.getAddAttrListInfoByCfgInfo(cfgInfo);
            this.refreshAttrList(addAttrs);

            //拥有者玩家
            let playerDisplayer = templeInfo && templeInfo.ownerdisplay && templeInfo.ownerdisplay.playerid ? templeInfo.ownerdisplay : null;
            this.UIPanel.viewPlayerIcon.setPlayerDisplayInfo(playerDisplayer, true, true);
            let isSelf = false;
            if (playerDisplayer)
            {
                isSelf = playerDisplayer.playerid == PlayerDataMgr.uid;
                this.UIPanel.txtNickname.text = playerDisplayer.playername;
                // //形象
                // let shapeResoursId = cfg.PetSkinCfgData.getResourceIDByID(playerDisplayer.shape);
                // this._role.reset(shapeResoursId, RoleResType.Show, true);
            } else
            {
                //还没有玩家占领
                this.UIPanel.txtNickname.text = Global.getLangStr("common_empty1");
            }
            //形象  
            let bossId = cfg.TempleCfgData.getMonsterByID(templeId);
            let monsterInfo = cfg.TempleMonsterNewCfgData.getBossMonsterInfoById(bossId);
            // let resId = cfg.PetCfgData.getSkinInfoByPetID(monsterInfo.skinId).id;
            this._role.resetRes(monsterInfo.skinId, RoleResType.Show, true);

            this.UIPanel.btnAttack.visible = !isSelf;
            this.UIPanel.btnChallenge.visible = !isSelf;
            this.UIPanel.occupyTag.visible = isSelf;
        }

        /** 刷新属性加成 */
        private refreshAttrList(list: cfg.AddAtterInfo[]): void
        {
            this.UIPanel.listAttr.onRefresh(list.length, this, (label: Laya.Label, index: number) =>
            {
                let attr = list[index];

                // let imgIcon = attrNode.getChildByName("imgIcon") as Laya.Image;
                // Global.setResAttributeType(imgIcon, attr.type);

                // let txtAttrValue = attrNode.getChildByName("txtAttrValue") as component.UILabel;
                label.text = Global.getFullAttrValueString(attr, " +");
            })
        }

        /** 刷新技能列表 */
        private refreshSkillList(type: number, evolveCount: number): void
        {
            //主动技能与被动技能分开
            let skillListInitiative = [];
            let skillListPassivity = [];

            //先拿到英雄技能列表
            let bossId = cfg.TempleCfgData.getMonsterByID(this.UIOpenData.customObject);
            let monsterInfo = cfg.TempleMonsterNewCfgData.getBossMonsterInfoById(bossId);
            let bossLv = Math.floor(evolveCount / 2); //固定公式
            let monsterLvCfg = cfg.TempleLevelInfoCfgData.getInfoByLevel(bossLv);
            let tmpSkillAry = cfg.PetSkinCfgData.getAddSkillById(monsterInfo.skinId).split(";");
            let tmpSkillOpen = cfg.PetAdvanceCfgData.getAddSkillAryById(monsterLvCfg.petAdvance);
            let tmpSkillLvs = cfg.PetUpsartSkillCfgData.getAddSkillAryById(monsterLvCfg.petStar);
            for (var i = 0; i < tmpSkillAry.length; i++)
            {
                if (!tmpSkillOpen || tmpSkillOpen.length <= i) continue; //技能未开放
                let skillId = parseInt(tmpSkillAry[i]);
                let skillLv = tmpSkillOpen[i].value2;
                if (tmpSkillLvs && tmpSkillLvs.length > i) skillLv = tmpSkillLvs[i].value2;
                let skillCfg = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(skillId, skillLv);
                if (!skillCfg) continue;
                if (skillCfg.skillType == 1) skillListPassivity.push(skillCfg);
                else skillListInitiative.push(skillCfg);
            }


            //id_等级;1_1;2_1;
            let skillListStr = cfg.TempleEvolveCfgData.getInfoByCount(type, evolveCount).skillID;
            let skillListArr = skillListStr.split(";");
            for (var keyIdLv of skillListArr)
            {
                let skillCfg = cfg.SkillNewSkillCfgData.getInfoByIdLevelGroup(keyIdLv);
                if (!skillCfg) continue;
                if (skillCfg.skillType == 1) skillListPassivity.push(skillCfg);
                else skillListInitiative.push(skillCfg);
            }

            //主动技能
            this.__refreshSkillList(this.UIPanel.listSkillInitiative, skillListInitiative);
            //被动技能
            this.__refreshSkillList(this.UIPanel.listSkillPassivity, skillListPassivity);
        }

        private __refreshSkillList(uilist: component.UIList, dataList: cfg.SkillNewSkillCfgInfo[]): void
        {
            uilist.onRefresh(dataList.length, this, (tempUI: ProUI.Temple.SkillItemUI, index: number) =>
            {
                let skillCfgInfo = dataList[index];
                let tmpSkillIndex = skillCfgInfo.skillIndex;
                tempUI.txtLv.text = skillCfgInfo.skillLevel + "";
                Global.setResIconWithItemID(tempUI.icon, CfgID.ResType.Skill, tmpSkillIndex);
                tempUI.onClick(this, () =>
                {
                    UIManager.Inst.forceOpen(new SkillReviewOpenUIData(0, tmpSkillIndex));
                });
            })
        }

    }
}