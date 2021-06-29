module Pro
{
    /**
    * 界面说明： 跨服天梯英雄殿（top3）
    * @author jason.xu
    */
    export class LadderTopHeroMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Ladder.LadderTopHeroUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("arenaTop3")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Ladder.LadderTopHeroUI, 1, BaseAddLayer.CenterUI, true);
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            return ["res/laddertophero/kuafu_bg03.jpg"];
        }



        /*** 关闭UI */
        public closeUI(): void
        {
            super.closeUI();
            this.__removeBaseRole(this.UIPanel.role1);
            this.__removeBaseRole(this.UIPanel.role3);
            this.__removeBaseRole(this.UIPanel.role2);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            // 设置名字的描边颜色
            this.UIPanel.role1.txtNickname.strokeColor = "#d68004";
            this.UIPanel.role2.txtNickname.strokeColor = "#cd4af3";
            this.UIPanel.role3.txtNickname.strokeColor = "#3876c9";

            this.UIPanel.role1.txtFactionName.strokeColor = "#d68004";
            this.UIPanel.role2.txtFactionName.strokeColor = "#cd4af3";
            this.UIPanel.role3.txtFactionName.strokeColor = "#3876c9";

            LadderSend.heroTop();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);

            //英雄殿返回		PBG2CLadderHeroTopAck
            this.addEventMgr(CmdEvent.Ladder_HeroTopAck, this, this.onHeroTopAck)
            //点赞英雄殿返回(player id, like)	PBU32U32
            this.addEventMgr(CmdEvent.Ladder_HeroTopLikeACK, this, this.onHeroTopLikeACK);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        protected onHeroTopLikeACK(value: Pb_God.PBG2CLike): void
        {
            if (!this.heroTopArr) return;
            let nodes = [this.UIPanel.role1, this.UIPanel.role2, this.UIPanel.role3];
            for (var i = 0; i < this.heroTopArr.length && i < 3; i++)
            {
                let heroData = this.heroTopArr[i];
                let isRobot = !heroData.display.worldid;
                if (value.robot != isRobot) continue;
                if (value.playerid != heroData.display.playerid) continue;
                heroData.likecount = value.likes;
                let roleNode = nodes[i];
                this.refreshHeroRoleItem(nodes[i], heroData);
            }
        }

        private heroTopArr: Pb_God.PBLadderHeroTop[];
        /*****
         *英雄殿返回		PBG2CLadderHeroTopAck
         * @param PBG2CLadderHeroTopAck
         * 		herotop			PBLadderHeroTop	英雄殿
         */
        protected onHeroTopAck(value: Pb_God.PBG2CLadderHeroTopAck): void
        {
            this.heroTopArr = value.herotop;
            //top3
            this.refreshHeroRoleItem(this.UIPanel.role1, value.herotop[0]);
            this.refreshHeroRoleItem(this.UIPanel.role2, value.herotop[1]);
            this.refreshHeroRoleItem(this.UIPanel.role3, value.herotop[2]);
            //重新设置一下当前可膜拜的最大数量
            LadderDataMgr.setMaxWorshipCount(Math.max(value.herotop.length, 3));
        }

        private refreshHeroRoleItem(tempUI: ProUI.Ladder.ChildView.TopHeroRoleItemUI, data: Pb_God.PBLadderHeroTop): void
        {
            if (data)
            {
                let playerdisplayer = data.display;

                tempUI.txtNickname.text = playerdisplayer.playername;
                tempUI.txtFactionName.text = Global.getLangStr("faction_msg32") + (data.factionname ? data.factionname : Global.getLangStr("common_none2"));
                tempUI.btnWorship.visible = true;
                tempUI.txtWorshopValue.text = data.likecount + "";
                let isRobot = !playerdisplayer.worldid;
                //是否已点过赞
                let isLike = LadderDataMgr.isLike(playerdisplayer.playerid, isRobot);
                tempUI.btnWorship.disabled = isLike;

                let shapeResoursId = playerdisplayer.shape || 1;// cfg.PetSkinCfgData.getResourceIDByID(playerdisplayer.shape || 1);
                this.__resetBaseRole(tempUI, shapeResoursId);
                tempUI.btnDetail.visible = !isRobot;
                tempUI.btnDetail.onClick(this, () =>
                {
                    //是玩家自己
                    if (playerdisplayer.playerid == PlayerDataMgr.uid)
                    {
                        TipsUtils.showTipsByLanId("tips_msg71");
                        return;
                    }
                    //查看玩家详细信息
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PlayerInfo, playerdisplayer));
                })
                tempUI.btnWorship.onClick(this, () =>
                {
                    LadderSend.heroTopLike(playerdisplayer.playerid, isRobot);
                })
            } else
            {
                tempUI.txtNickname.text = Global.getLangStr("common_empty1");
                tempUI.txtFactionName.text = "";
                tempUI.btnDetail.visible = false;
                tempUI.btnWorship.visible = false;
                //随机一个形象展示
                let allShape = cfg.PetSkinCfgData.getAllList();
                let shapeCfgInfo = allShape[Global.getRandomNum(0, allShape.length)];
                this.__resetBaseRole(tempUI, shapeCfgInfo.id);
            }
        }

        private __removeBaseRole(item: ProUI.Ladder.ChildView.TopHeroRoleItemUI): void
        {
            let key = "$bindBaseRole";
            let baserole: BaseRole = item[key];
            if (!baserole) return;
            Global.removeBaseRole(baserole);
            delete item[key];
        }

        private __resetBaseRole(item: ProUI.Ladder.ChildView.TopHeroRoleItemUI, resId: number): void
        {
            let key = "$bindBaseRole";
            let baseRole: BaseRole = item[key];
            if (!baseRole)
            {
                baseRole = Global.createBaseRoleForPreview(item.avatar, false);
                baseRole.scale(1.5, 1.5);
                item[key] = baseRole;
            }
            baseRole.resetRes(resId, RoleResType.Show, true);
        }
    }
}