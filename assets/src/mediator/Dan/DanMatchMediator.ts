module Pro
{
    /**
    * 界面说明： 超凡段位赛-匹配界面
    * @author jason.xu
    */
    export class DanMatchMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Dan.DanMatchUI;


        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("dan_matching")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Dan.DanMatchUI, 1);
        }

        public closeUI(): void
        {
            Laya.timer.clear(this, this.onTimer);
            Laya.timer.clear(this, this.onMatchingOver);
            Laya.Tween.clearTween(this.UIPanel.imgVS);
            super.closeUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 是否为王者赛 */
        private get isKingMatch(): boolean
        {
            return this.UIOpenData.customObject == 1; //分页类型 0-常规赛 1-王者赛
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let isKingMatch = this.isKingMatch;
            this.UIPanel.titleKing.visible = isKingMatch;
            this.UIPanel.titleNormal.visible = !isKingMatch;


            let totalExp = cfg.DanUpgradeCfgData.getMaxExpByDanID(DanDataMgr.curDanId);
            let curExp = DanDataMgr.curExp;
            //玩家当前战斗进度类型： 晋级赛 or 非晋级赛
            this.UIPanel.txtType.text = totalExp <= curExp ? Global.getLangStr("dan_msg10") : "";

            this.refreshUI();

            //刚过来时，进行匹配初始状态
            this.resetView(0);

            this.refreshSelfInfoView();

        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnAddCount.onClick(this, this.onClickBuyCount);
            this.UIPanel.btnEmbattle.onClick(this, this.onClickEmbattle);
            this.UIPanel.btnStart.onClick(this, this.onClickStart);

            /** 重新保存布阵 */
            this.addEventMgr(EventNotify.Embattle_Save, this, this.onSaveEmbattle);

            // 	 购买次数返回		PBU32
            this.addEventMgr(CmdEvent.Dan_BuyCountAck, this, this.refreshMatchView);
            //	 搜索对手返回		PBG2CDanSearch
            this.addEventMgr(CmdEvent.Dan_Search, this, this.onMatchingComplete)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击购买匹配次数 */
        private onClickBuyCount(): void
        {
            if (cfg.DanBuyCountCfgData.getAllLength() <= DanDataMgr.buyCount)
            {
                TipsUtils.showTipsByLanId("shop_msg7");
                return;
            }
            let buyCount = DanDataMgr.buyCount + 1;
            //判断VIP
            let needVip = cfg.DanBuyCountCfgData.getNeedVipLevelByCount(buyCount);
            if (needVip > PrivilegeDataMgr.vipLevel)
            {
                TipsUtils.showTipsByLanId("shop_msg8", needVip);
                return;
            }
            //弹窗二级提示
            let needItem = cfg.DanBuyCountCfgData.getNeedItemById(buyCount);
            let des = Global.getLangStr("shop_msg9", cfg.ItemCfgData.getNameById(needItem.itemid), needItem.itemcount);
            AlertShow.showConfirmAlert(des, this, () =>
            {
                //向服务器发请求
                DanSend.buyCountAsk(1);
            });
        }

        /** 点击布阵 */
        private onClickEmbattle(): void
        {
            let UIOpenData = new EmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_Duanwei);
            UIOpenData.lockEmCount = this.isKingMatch ? 2 : 1; //王者赛可以一次性配置两个队伍。
            UIManager.Inst.forceOpen(UIOpenData);
        }

        /** 点击开始匹配 */
        private onClickStart(): void
        {
            //判断次数
            if (DanDataMgr.getLeftCount() <= 0)
            {
                TipsUtils.showTipsByLanId("dan_msg11");
                return;
            }
            //判断当前时间是否在正常时间内
            if (!cfg.DanConstCfgData.getOpenTimeInfo().isInOpenTime(TimeController.currTimer))
            {
                TipsUtils.showTipsByLanId("dan_msg12");
                return;
            }


            this.playMatchingEffect();
        }


        /** 重新布阵 */
        private onSaveEmbattle(embattleType: number): void
        {
            if (embattleType != Pb_God._emZhenfaType.ZhenfaType_Duanwei && embattleType != Pb_God._emZhenfaType.ZhenfaType_Duanwei2) { return; }
            this.refreshSelfEmbattle();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.refreshMatchView();
        }

        /** 重置各控件显示状态
         * @param state 0-刚打开初始化界面时
         * 1-开始匹配播放匹配动画时
         * 2-拿到匹配结果显示对方信息（倒计时开始）
         * 3-倒计时结束，即将进入战斗时
         */
        private resetView(state: number): void
        {
            Laya.timer.clear(this, this.onTimer);
            Laya.timer.clear(this, this.onMatchingOver);
            Laya.Tween.clearTween(this.UIPanel.imgVS);
            Laya.Tween.clearTween(this.UIPanel.tarInfoLeft);
            Laya.Tween.clearTween(this.UIPanel.tarInfoRight);

            this.UIPanel.btnEmbattle.visible = state == 0;
            this.UIPanel.btnStart.visible = state == 0;
            this.UIPanel.imgEmpty.visible = state == 0;

            this.UIPanel.matchingEffect.visible = state == 1;//没有动画，没有资源，先用一个文字描述一下特效
            this.UIPanel.matchingEffect.visible = false;

            this.UIPanel.imgVS.visible = state >= 2;
            this.UIPanel.tarInfoLeft.visible = state >= 2;
            this.UIPanel.tarInfoRight.visible = state >= 2;

            this.UIPanel.txtCountdown.visible = state == 2;
            this.UIPanel.txtCountdownSuffix.visible = state == 2;
        }


        /** 刷新匹配次数相关的显示 */
        private refreshMatchView(): void
        {
            let totalBuyCount = cfg.DanBuyCountCfgData.getAllLength();
            let leftBuyCount = totalBuyCount - DanDataMgr.buyCount;
            this.UIPanel.txtMatchBuyCount.text = leftBuyCount + "";

            let totalUseCount = cfg.DanConstCfgData.getFirstInfo().dayFightCount;
            let leftUseCount = DanDataMgr.getLeftCount();
            this.UIPanel.txtMatchCount.text = leftUseCount + "/" + totalUseCount;
        }

        private refreshSelfEmbattle(): void
        {
            let fightPower = 0;
            let embattleInfo = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Duanwei) || EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
            Global.setResPetZhengfa(this.UIPanel.imgEmbattle, embattleInfo.getZhenfaId());


            this.UIPanel.listHeros.onRefresh(9, this, (item: NorItemUI, index: number) =>
            {
                //站立位置
                let storeIndex = [7, 4, 1, 8, 5, 2, 9, 6, 3][index];
                //上阵角色
                let tempPosInfo = embattleInfo.getPosAry()[storeIndex - 1];
                if (tempPosInfo)
                {
                    let tmpHeroInfo = PetDataMgr.getPetInfo(tempPosInfo.petsn);
                    if (tmpHeroInfo)
                    {
                        item.setPetInfo(tmpHeroInfo, false);
                        fightPower += tmpHeroInfo.fightpower;
                        Laya.timer.callLater(this, () =>
                        {
                            this.UIPanel.txtFightValue.text = "" + fightPower;
                        })
                    }
                }
                else
                {
                    item.setEmptyInfo();
                }
            });
        }

        /** 刷新自己的相关显示 */
        private refreshSelfInfoView(): void
        {

            this.UIPanel.imgFrameSex.frame = PlayerDataMgr.gender + 1; //1男2女

            this.UIPanel.txtNickname.text = `[S${ PlayerDataMgr.worldid }]` + PlayerDataMgr.name;
            //形象半身像
            Global.setResCard(this.UIPanel.imgHalfShape, ShapeDataMgr.useRiskShapeId);

            let danId = DanDataMgr.curDanId;
            this.UIPanel.txtDanName.text = cfg.DanUpgradeCfgData.getDanNameByDanID(danId);
            Global.setDanNormalIcon(this.UIPanel.imgDanIcon, danId);

            this.refreshSelfEmbattle();

        }

        /** 设置匹配到的对手信息 */
        private _tarInfo: Pb_God.PBG2CDanSearch;
        private setTarInfo(value: Pb_God.PBG2CDanSearch): void
        {
            this._tarInfo = value;
            if (!value) { return; }
            let playerDisplayer = value.playerdisplay;

            this.UIPanel.imgFrameSexTar.frame = playerDisplayer.gender + 1; //1男2女

            this.UIPanel.txtNicknameTar.text = `[S${ playerDisplayer.worldid }]` + playerDisplayer.playername;

            //形象半身像
            Global.setResCard(this.UIPanel.imgHalfShapeTar, playerDisplayer.shape);

            let danId = value.danid;
            this.UIPanel.txtDanNameTar.text = cfg.DanUpgradeCfgData.getDanNameByDanID(danId);
            Global.setDanNormalIcon(this.UIPanel.imgDanIconTar, danId);

            let petData = value.battlepet;
            if (petData)
            {
                this.UIPanel.txtFightValueTar.text = "" + petData.fightpower;
                Global.setResPetZhengfa(this.UIPanel.imgEmbattleTar, petData.zhenfaid);
                Global.setEmbattleListByBattlePetInfo(this.UIPanel.listHerosTar, petData.battlepet);
            }
        }

        /** 播放匹配动画（延时开始正式向服务器请求匹配） */
        private playMatchingEffect(): void
        {
            this.resetView(1);
            // let matchTime = Global.getRandomNum(1000, 2000); //匹配时间
            let matchTime = 200;
            Laya.timer.once(matchTime, this, this.onMatchingOver);
        }

        /** 匹配动画结束，正式向服务器发起请求匹配 */
        private onMatchingOver(): void
        {
            //向服务器发起匹配请求。
            DanSend.search();
        }

        /*****
         *	 搜索对手返回		PBG2CDanSearch
         * @param PBG2CDanSearch
         * 		playerdisplay			PBPlayerDisplay	用户display
         * 		battlepet			PBBattlePet	战斗阵容
         * 		battlepet2			PBBattlePet	第二战斗阵容
         */
        protected onMatchingComplete(value: Pb_God.PBG2CDanSearch): void
        {
            this.resetView(2);

            this.playVSEnterEffect();
            this.setTarInfo(value);

            this._countdownTick = 5;
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 播放VS出现的效果 */
        private playVSEnterEffect(): void
        {
            let effTime = 300;
            this.UIPanel.imgVS.scaleX = this.UIPanel.imgVS.scaleY = 1;
            Laya.Tween.from(this.UIPanel.imgVS, { scaleX: 3, scaleY: 3 }, effTime, Laya.Ease.backIn);
            this.UIPanel.tarInfoLeft.x = 0;
            this.UIPanel.tarInfoRight.x = 750;
            Laya.Tween.from(this.UIPanel.tarInfoLeft, { x: -450 }, effTime);
            Laya.Tween.from(this.UIPanel.tarInfoRight, { x: 750 + 450 }, effTime);
        }

        private _countdownTick = 0;
        private onTimer(): void
        {
            if (this._countdownTick <= 0)
            {
                this.onTimerOver();
                return;
            }
            this.UIPanel.txtCountdown.text = this._countdownTick + "";
            this._countdownTick--;
        }

        //倒计时结束，开始进入战斗
        private onTimerOver(): void
        {
            // this.resetView(3);
            this.closeUI();
            //发起挑战
            let battleId = this._tarInfo.playerdisplay.playerid;
            let battleParam = Pb_God._emZhenfaType.ZhenfaType_Duanwei;
            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Dan, battleId, battleParam, Pb_God._emZhenfaType.ZhenfaType_Duanwei);
        }

    }
}