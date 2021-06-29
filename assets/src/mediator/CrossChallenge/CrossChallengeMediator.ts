module Pro
{
    /**
    * 跨服竞技场
    */
    export class CrossChallengeMediator extends BaseMediator implements IMediator
    {
        /** 当前显示的分页 0-竞技场  1-赛季荣耀 */
        private _curPage: number = -1;

        public UIPanel: ProUI.CrossChallenge.CrossChallengeMainUI;

        private _lastRefreshTime: number = 0;

        private _strokeColors = ["#be6d40", "#cd4af3", "#3876c9"];

        private _needItem: string[];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("crossChallenge"), UrlMgr.getAtlas("arenaTop3"), UrlMgr.getAtlas("arenaenter")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.CrossChallenge.CrossChallengeMainUI, 1, undefined, false, 3);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.setUIBG(UrlMgr.getUnpackUrl("crossChallenge/kuafu_jingjichangbg.jpg"));
            this._needItem = cfg.CrossChallengeConstantsCfgData.getFirstInfo().needItem.split("_");
            this.initBoxView();
            this.resetChallengeView();
            this.resetHonourView();
        }

        private initRedDot()
        {
            this.reddotBind(this.UIPanel.challengeRed, CrossChallengeDataMgr.challengeReddotModel);
            this.reddotBind(this.UIPanel.honourRed, CrossChallengeDataMgr.honourRedModel);
        }

        /** 检查UI是否能被重新拉起来 */
        public checkCanDisplayUI(): boolean
        {
            //如果当前正在观看对应的战斗，则界面还不能拉起来，等战斗结束后才能拉
            let battleType = BattleMgr.Inst.getWatchBattleType();
            if (battleType == Pb_God._emBattleType.BattleType_CrossChallege) { return false; }
            return super.checkCanDisplayUI();
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {

            this.initRedDot();
            this.resetCurPage(0);

            CrossChallengeSend.open();
        }

        public closeUI()
        {
            Laya.timer.clear(this, this.timeDown);
            super.closeUI();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnHonour.onClick(this, this.onHonourPageClick);
            this.UIPanel.btnChallenge.onClick(this, this.onChallengeClick);
            this.UIPanel.btnHelp.onClick(this, this.onHelpClick);
            this.UIPanel.btnSwShop.onClick(this, this.onSWShopClick);
            this.UIPanel.btnRankAward.onClick(this, this.onRankAwardClick);
            this.UIPanel.awardPreview.on(LayaEvent.CLICK, this, this.onRankAwardClick)
            this.UIPanel.btnRank.onClick(this, this.onRankClick);
            this.UIPanel.btnAdd.onClick(this, this.onAddClick);
            this.UIPanel.btnRefresh.onClick(this, this.onRefreshClick);
            this.UIPanel.btnRecord.onClick(this, this.onRecordClick);
            this.UIPanel.btnDefence.onClick(this, this.onDefenceClick);

            this.UIPanel.closeBtn.onClick(this, this.closeUI);


            this.addEventMgr(EventNotify.Battle_Result, this, this.onBattleResult);

            this.addEventMgr(CmdEvent.CrossChallenge_Open, this, this.refreshOpen);

            this.addEventMgr(CmdEvent.CrossChallenge_Refresh, this, this.refreshRefresh);

            this.addEventMgr(CmdEvent.CrossChallenge_DailyPrize, this, this.refreshBoxView);

            this.addEventMgr(CmdEvent.CrossChallenge_HonourLike, this, this.refreshLike);

            this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.refreshItem);

            this.addEventMgr(CmdEvent.CrossChallenge_Count, this, this.refreshBoxView);


        }


        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 战斗中退出时，界面不会再init, 在此处重新拉取数据 */
        private onBattleResult(battleType: number): void
        {
            if (battleType == Pb_God._emBattleType.BattleType_CrossChallege)
            { CrossChallengeSend.open(); }
        }

        /** 点击规则说明 */
        private onHelpClick(): void
        {
            let strHelp = Global.getLangStr("CrossJJC_help");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        // /** 点击阵容调整 */
        // private onClickEmbattle(): void
        // {
        //     let UIOpenData = new EmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF1);
        //     UIOpenData.lockEmCount = 3;
        //     UIManager.Inst.forceOpen(UIOpenData);
        // }

        /** 点击商店  */
        private onSWShopClick(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_CrossChallenge), BaseBackUIType.HideBackUI);
        }

        /** 点击奖励一览 */
        private onRankAwardClick(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_CrossChallengeAward));
        }

        private onRankClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, Pb_God._emTopListType.TopListType_BWChallenge))
        }

        private onAddClick()
        {
            let itemCfg = cfg.ItemCfgData.getInfo(parseInt(this._needItem[0]));
            let openUIData = new ExchangeBuyOpenUIData();
            openUIData.needCurrencyID = Pro.CfgID.ItemID.Diamond;
            openUIData.limitBuyCount = -1;       // 无限购买
            openUIData.addItemID = itemCfg.id;
            openUIData.addItemPrice = itemCfg.buyNeedDiamond;
            openUIData.addItemCount = 1;
            openUIData.exchanageCfgIndex = -1;  // 非限时兑换表
            openUIData.maxCount = Math.floor(Pro.PlayerDataMgr.getExpendNum(Pro.CfgID.ItemID.Diamond) / openUIData.addItemPrice);
            UIManager.Inst.forceOpen(openUIData);
        }

        private onRefreshClick()
        {
            this.UIPanel.btnRefresh.disabled = true;
            Laya.timer.once(3000, this, () =>
            {
                this.UIPanel.btnRefresh.disabled = false;
            })
            CrossChallengeSend.refresh();
        }

        private onRecordClick()
        {

        }

        private onDefenceClick()
        {
            if (!CrossChallengeDataMgr.openInfo)
                return;
            let UIOpenData = new Pro.CrossChallengeEmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF1);
            UIOpenData.lockEmCount = 3;
            Pro.UIManager.Inst.forceOpen(UIOpenData);
        }

        /** 点击竞技场分页 */
        private onChallengeClick(): void
        {
            this.resetCurPage(0);
        }

        /** 点击赛季荣誉分页 */
        private onHonourPageClick(): void
        {
            this.resetCurPage(1);
        }

        //设置分页
        private resetCurPage(page: number, forceRefresh: boolean = false): void
        {
            if (page == this._curPage && !forceRefresh) { return; }
            this._curPage = page;

            this.refreshUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let isChallenge = this._curPage == 0;

            // let selectSkin = UrlMgr.getCrossChallengeUrl("jingji_pic_05");
            // let unSelectSkin = UrlMgr.getCrossChallengeUrl("jingji_pic_07");
            // this.UIPanel.btnChallenge.skin = isChallenge ? selectSkin : unSelectSkin;
            // this.UIPanel.btnHonour.skin = isChallenge ? unSelectSkin : selectSkin;

            this.UIPanel.ChallengeBox.visible = this.UIPanel.maskHonour.visible = isChallenge;
            this.UIPanel.HonourBox.visible = this.UIPanel.maskChallenge.visible = !this.UIPanel.ChallengeBox.visible;

        }

        /**
         * 先初始化几个奖励box 之后走刷新
         */
        private initBoxView()
        {
            let maxWid = this.UIPanel.proBg.width;
            let cfgs = cfg.CrossChallengeDailyPrizeCfgData.getAll();
            for (let i = 0; i < cfgs.length; i++)
            {
                let item = new Pro.ProgressChestItemUI();
                item.y = -20;
                item.x = cfgs[i].count / cfg.CrossChallengeDailyPrizeCfgData.getDailyMaxPro() * maxWid - 40;
                item.bindData = cfgs[i];
                item.setBoxTypeIndex(1);
                item.setText(cfgs[i].count);
                item.index = cfgs[i].index;
                item.setOpenState(false, false);
                item.hideBubble();
                item.NumLb.y = 64;
                this.UIPanel.awardBox.addChild(item);
            }
            Global.setResSmallIconWithItemID(this.UIPanel.imgItem, parseInt(this._needItem[0]));
            this.refreshBoxView();
        }

        /**
         * 初始化竞技场为未开放状态的默认显示
         */
        private resetChallengeView()
        {
            for (let i = 0; i < 3; i++)
            {
                let child = this.UIPanel.challengeAvatar.getChildAt(i) as ProUI.CrossChallenge.CrossChallengeSpineItemUI;
                child.txtNickname.text = "";

                //匹配时不显示title
                child.imgTitle.visible = false;
                child.imgRank.visible = false;
                child.lblScore.text = "";

                child.lblPower.text = "0";
                if (!child["role"])
                {
                    let role = Global.createBaseRoleForPreview(child.avatar, false);
                    child["role"] = role;
                }
                child["role"].resetRes(1, RoleResType.Show, true);

                Global.setResSmallIconWithItemID(child.icon, parseInt(this._needItem[0]));
                child.txtWorshipCount.text = this._needItem[1] + Global.getLangStr("common_attack");

            }

            this.UIPanel.lblEndTime.text = this.UIPanel.lblScore.text = this.UIPanel.lblRank.text = "";

            this.refreshItem();
        }

        /**
         * 初始化荣耀为未开放状态的默认显示
         */
        private resetHonourView()
        {
            for (let i = 0; i < 3; i++)
            {
                let child = this.UIPanel.honourAvatar.getChildAt(i) as ProUI.CrossChallenge.CrossChallengeSpineItemUI;
                child.txtNickname.text = Global.getLangStr("common_empty1");
                child.bg.skin = UrlMgr.getArenaTop3Url(`jingji_pic_0${ i + 1 }`);
                child.imgRank.skin = UrlMgr.getCrossChallengeUrl(`pic_paiming0${ i + 1 }`);
                child.txtNickname.strokeColor = this._strokeColors[i];

                child.btnWorship.visible = false;
                child.lblScore.visible = false;
                child.imgTitle.visible = false;

                //荣耀不显示战力
                child.imgPower.visible = false;
                if (!child["role"])
                {
                    let role = Global.createBaseRoleForPreview(child.avatar, false);
                    child["role"] = role;
                }

                child.txtWorshipCount.text = "0";

                if (i == 0)
                {
                    child.bg.height = 480;
                    child.topBox.y = -56;
                }
            }

            this.UIPanel.lblHonourRank.text = this.UIPanel.lblHistoryRank.text = ""
        }

        private refreshBoxView()
        {
            let cfgs = cfg.CrossChallengeDailyPrizeCfgData.getAll();
            for (let i = 0; i < cfgs.length; i++)
            {
                let item = this.UIPanel.awardBox.getChildAt(i) as Pro.ProgressChestItemUI;
                if(!item)
                    return;
                let isActive = CrossChallengeDataMgr.checkDailyCanGet(item.bindData.index);
                let isGet = CrossChallengeDataMgr.checkDailyHaveGot(item.bindData.index);
                item.setOpenState(isActive, isGet);
                item.onClick(this, () =>
                {
                    if (isActive && !isGet)
                        CrossChallengeSend.dailyPrize(item.index);
                    else
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RewardPreview, cfg.CrossChallengeDailyPrizeCfgData.getAddItemAryById(item.bindData.index)));
                })
            }

            let maxPro = cfg.CrossChallengeDailyPrizeCfgData.getDailyMaxPro();
            let pro = Math.min(CrossChallengeDataMgr.count, maxPro)
            this.UIPanel.awardPro.width = Math.max(1, pro / maxPro * this.UIPanel.proBg.width);
            this.UIPanel.lblAwardCount.text = `${ pro }/${ maxPro }`

        }

        /**
         * 打开竞技场
         * @param value 
         */
        private refreshOpen(value: Pb_God.PBCrossChallengeOpenInfo)
        {
            this.UIPanel.lblRank.text = this.UIPanel.lblHonourRank.text = value.order > 0 ? value.order + "" : Global.getLangStr("common_norank");
            this.UIPanel.lblScore.text = value.score + "";

            this.UIPanel.lblHistoryRank.text = value.historyrank == 0 ? Global.getLangStr("common_norank") : value.historyrank + "";

            let rankPrize = cfg.CrossChallengeTopPrizeCfgData.getRankPrizeByRank(value.order);

            if (rankPrize)
            {
                this.UIPanel.prizeList.onRefresh(rankPrize.length, this, (itemUI: Pro.NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(rankPrize[index]);
                })
            }

            this.timeDown();
            Laya.timer.loop(1000, this, this.timeDown);

            this.refreshRefresh();
            this.refreshHonourAvatar();
            this.refreshBoxView();
        }

        private timeDown()
        {
            if (!CrossChallengeDataMgr.openInfo)
            {
                Laya.timer.clear(this, this.timeDown);
                return;
            }

            if (CrossChallengeDataMgr.openInfo.openflag > 0)
            {
                this.UIPanel.lblTimeDesc.text = Global.getLangStr("crossChallenge_msg2");
            }
            else
            {
                this.UIPanel.lblTimeDesc.text = Global.getLangStr("crossChallenge_msg3");
            }
            this.UIPanel.lblEndTime.text = Global.GetRemindTime(CrossChallengeDataMgr.openInfo.overtime - TimeController.currTimer / 1000, 4);
        }

        /**
         * 刷新匹配玩家数据 第一次服务器主动推 之后客户端点刷新按钮
         * @param value 
         */
        private refreshRefresh()
        {
            let value = CrossChallengeDataMgr.openInfo;
            if (!value)
                return;
            let others = value.targets;
            for (let i = 0; i < others.length; i++)
            {
                let info = others[i];
                let child = this.UIPanel.challengeAvatar.getChildAt(i) as ProUI.CrossChallenge.CrossChallengeSpineItemUI;
                child.txtNickname.text = `[S${ info.display.worldid }]${ info.display.playername }`;

                //匹配时不显示title
                child.imgTitle.visible = false;
                child.imgRank.visible = false;

                child.lblScore.text = Global.getLangStr("common_score", info.score);

                child.lblPower.text = info.power + "";
                if (!child["role"])
                {
                    let role = Global.createBaseRoleForPreview(child.avatar, false);
                    child["role"] = role;
                }
                child["role"].resetRes(info.display.shape, RoleResType.Show, true);

                Global.setResSmallIconWithItemID(child.icon, parseInt(this._needItem[0]));
                child.txtWorshipCount.text = this._needItem[1] + Global.getLangStr("common_attack");
                child.btnWorship.visible = true;
                child.btnWorship.onClick(this, () =>
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_CrossChallengeFight, info, CrossChallengeDataMgr.openInfo.self));
                })
            }
        }

        private refreshHonourAvatar()
        {
            let value = CrossChallengeDataMgr.openInfo
            if (!value)
                return;
            let others = value.horourinfo;
            for (let i = 0; i < others.length; i++)
            {
                let info = others[i];
                let child = this.UIPanel.honourAvatar.getChildAt(i) as ProUI.CrossChallenge.CrossChallengeSpineItemUI;
                child.txtNickname.text = `[S${ info.playerdisplay.worldid }]${ info.playerdisplay.playername }`;
                child.bg.skin = UrlMgr.getArenaTop3Url(`jingji_pic_0${ i + 1 }`);
                child.imgRank.skin = UrlMgr.getCrossChallengeUrl(`pic_paiming0${ i + 1 }`);
                child.txtNickname.strokeColor = this._strokeColors[i];

                child.btnWorship.visible = true;
                child.imgTitle.visible = info.playerdisplay.title > 0;
                Global.setResShapeTitle(child.imgTitle, info.playerdisplay.title)
                //荣耀不显示战力
                child.imgPower.visible = false;
                if (!child["role"])
                {
                    let role = Global.createBaseRoleForPreview(child.avatar, false);
                    child["role"] = role;
                }
                child["role"].resetRes(info.playerdisplay.shape, RoleResType.Show, true);

                child.txtWorshipCount.text = info.like + "";

                child.btnWorship.disabled = CrossChallengeDataMgr.likeplayer.length > 0;

                if (!child.btnWorship.disabled)
                {
                    child.btnWorship.onClick(this, () =>
                    {
                        //点赞
                        CrossChallengeSend.honourLike(info.playerdisplay.playerid)
                    })
                }

            }
        }

        private refreshLike()
        {
            for (let i = 0; i < 3; i++)
            {
                let child = this.UIPanel.honourAvatar.getChildAt(i) as ProUI.CrossChallenge.CrossChallengeSpineItemUI;
                child.btnWorship.disabled = CrossChallengeDataMgr.likeplayer.length > 0;
            }
            this.refreshHonourAvatar();
        }

        private refreshItem()
        {
            this.UIPanel.lblCount.text = ItemDataMgr.getBagItemNum(parseInt(this._needItem[0])) + "";
        }
    }
}