module Pro
{
    /**
    * 界面说明： 超凡段位赛主界面
    * @author jason.xu
    */
    export class DanMainMediator extends BaseMediator implements IMediator
    {
        /** 当前显示的分页 0-常规赛  1-王者赛 */
        private _curPage: number = -1;

        public UIPanel: ProUI.Dan.DanMainUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("dan")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            return ["res/dan/rongyaosahiji_bg_01.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Dan.DanMainUI, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btnFaceSetting.visible = false;
        }

        /** 检查UI是否能被重新拉起来 */
        public checkCanDisplayUI(): boolean
        {
            //如果当前正在观看对应的战斗，则界面还不能拉起来，等战斗结束后才能拉
            let battleType = BattleMgr.Inst.getWatchBattleType();
            if (battleType == Pb_God._emBattleType.BattleType_Dan || battleType == Pb_God._emBattleType.BattleType_DanKing) { return false; }
            return super.checkCanDisplayUI();
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //请求数据，在数据返回之前，先屏蔽按扭的点击，以及隐藏界面默认显示，预防不该有的问题。
            this.UIPanel.txtTimeTitle.text = this.UIPanel.txtTime.text = this.UIPanel.txtNextSeasonTips.text = "";
            this.UIPanel.btnNormal.mouseEnabled = false;
            this.UIPanel.btnKing.mouseEnabled = false;
            this.UIPanel.leftBtns.mouseEnabled = false;
            this.UIPanel.rightBtns.mouseEnabled = false;
            this.UIPanel.boxTopReward.visible = false;
            this.UIPanel.boxMatchView.visible = false;
            this.UIPanel.imgDanTextIcon.visible = false;
            this.UIPanel.imgDanTypeIcon.visible = false;
            this.UIPanel.boxUpgrade.visible = false;

            DanSend.openAsk();

            this.refreshUI();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnNormal.onClick(this, this.onClickNormalPage);
            this.UIPanel.btnKing.onClick(this, this.onClickKingPage);
            this.UIPanel.btnKingToNormal.onClick(this, this.onClickNormalPage);

            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnDanHelp.onClick(this, this.onClickDanHelp);
            this.UIPanel.btnBuyCount.onClick(this, this.onClickBuyCount);
            this.UIPanel.btnEmbattle.onClick(this, this.onClickEmbattle);
            this.UIPanel.btnExploits.onClick(this, this.onClickExploits);
            this.UIPanel.btnFaceSetting.onClick(this, this.onClickFaceSetting);
            this.UIPanel.btnMatch.onClick(this, this.onClickMatch);
            this.UIPanel.btnRecord.onClick(this, this.onClickRecord);
            this.UIPanel.btnReward.onClick(this, this.onClickReward);
            this.UIPanel.btnShop.onClick(this, this.onClickShop);
            this.UIPanel.btnHistoryToplist.onClick(this, this.onClickHistoryToplist);
            this.UIPanel.btnTopFirstReward.onClick(this, this.onClickTopFirstReward);


            this.addEventMgr(EventNotify.Battle_Result, this, this.onBattleResult);

            /// data event
            this.addEventMgr(CmdEvent.Dan_SynInfo, this, this.onSynInfo);
            this.addEventMgr(CmdEvent.Dan_AwardAck, this, this.refreshTopFirstRewardView);
            // 	 购买次数返回		PBU32
            this.addEventMgr(CmdEvent.Dan_BuyCountAck, this, this.refreshMatchView);
        }


        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 战斗中退出时，界面不会再init, 在此处重新拉取数据 */
        private onBattleResult(battleType: number): void
        {
            if (battleType == Pb_God._emBattleType.BattleType_Dan || battleType == Pb_God._emBattleType.BattleType_DanKing)
            { DanSend.openAsk(); }
        }

        /** 点击规则说明 */
        private onClickHelp(): void
        {
            let strHelp = Global.getLangStr("dan_help1");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        /** 点击段位说明 */
        private onClickDanHelp(): void
        {
            let strHelp = Global.getLangStr("dan_help2");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
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
            }, "common_confirm", "common_cancel", 0, 0, "DanSpriteLaddeBuy");
        }

        /** 点击阵容调整 */
        private onClickEmbattle(): void
        {
            let UIOpenData = new EmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_Duanwei);
            UIOpenData.lockEmCount = this._curPage != 0 ? 2 : 1; //王者赛可以一次性配置两个队伍。
            UIManager.Inst.forceOpen(UIOpenData);
        }

        /** 点击个人战绩 */
        private onClickExploits(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DanExploits));
        }

        /** 点击战前宣言（设置表情） */
        private onClickFaceSetting(): void
        {

        }

        /** 点击进入匹配 */
        private onClickMatch(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DanMatch, this._curPage), BaseBackUIType.HideBackUI);
        }

        /** 点击商店  */
        private onClickShop(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_Grading), BaseBackUIType.HideBackUI);
        }

        /** 点击挑战记录 */
        private onClickRecord(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DanRecord));
        }

        /** 点击奖励一览 */
        private onClickReward(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DanRewardPreview));
        }

        /** 点击赛季传季（历史赛季的排名前几名显示界面） */
        private onClickHistoryToplist(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DanHistroyTop), BaseBackUIType.HideBackUI);
        }

        /** 点击领取首次达到的奖励 */
        private onClickTopFirstReward(): void
        {
            DanSend.awardAsk(DanDataMgr.prizeDanId + 1);
        }

        /** 点击常规赛分页 */
        private onClickNormalPage(): void
        {
            this.resetCurPage(0);
        }

        /** 点击王者赛分页 */
        private onClickKingPage(): void
        {
            this.resetCurPage(1);
        }


        /*****
         *	 同步主界面数据 	PBG2CDan_SynInfo
         * @param PBG2CDan_SynInfo
         * 		curseasonid			uint32	 赛季ID
         * 		curdanid			uint32	 当前段位ID
         * 		curscore			uint32	 当前积分
         * 		fightcount			uint32	 挑战次数
         * 		buycount			uint32	 购买次数
         * 		prizedanid			uint32	 领奖的段位ID
         * 		maxdanid			uint32	 领奖的段位ID
         * 		protmoteresult			uint32	 晋级赛结果
         */
        protected onSynInfo(value: Pb_God.PBG2CDan_SynInfo): void
        {
            this.UIPanel.btnNormal.mouseEnabled = true;
            this.UIPanel.btnKing.mouseEnabled = true;
            this.UIPanel.leftBtns.mouseEnabled = true;
            this.UIPanel.rightBtns.mouseEnabled = true;

            this.resetCurPage(0, true);

            //我的排名
            let myRank = DanDataMgr.rank;
            this.UIPanel.txtMyRank.text = Global.getLangStr("arena_msg2") + (myRank <= 0 ? Global.getLangStr("common_norank") : myRank);

            this.refreshMatchView();
            this.refreshCurDanView();
            this.refreshTopSeasonView();
        }


        //设置分页
        private resetCurPage(page: number, forceRefresh: boolean = false): void
        {
            if (page == this._curPage && !forceRefresh) { return; }
            this._curPage = page;
            let isKing = this._curPage != 0;
            (this.UIPanel.btnNormal.getChildByName("imgShade") as Laya.Image).visible = isKing;
            (this.UIPanel.btnKing.getChildByName("imgShade") as Laya.Image).visible = !isKing;
            this.UIPanel.boxKingView.visible = isKing;

            if (!isKing)
            { //常规赛分页
                this.setUIBG(Global.getUIBGPathWithName(this.mediatorName));
                this.UIPanel.boxTopReward.visible = true;
                this.UIPanel.boxMatchView.visible = true;
                this.UIPanel.imgDanTextIcon.visible = true;
                this.UIPanel.imgDanTypeIcon.visible = true;
                this.UIPanel.txtMyRank.visible = true;
                this.refreshTopFirstRewardView();
                this.refreshUpgradeView();
            } else
            { //王者赛分页 (王者赛目前还不知道具体的规则与显示的内容，先直接全部隐藏，待策划把王者赛的规则探到，再处理)
                this.setUIBG(Global.getUIBGPathWithName(this.mediatorName + 2));
                this.UIPanel.boxMatchView.visible = false;
                this.UIPanel.boxUpgrade.visible = false;
                this.UIPanel.boxTopReward.visible = false;
                this.UIPanel.imgDanTextIcon.visible = false;
                this.UIPanel.imgDanTypeIcon.visible = false;
                this.UIPanel.txtMyRank.visible = false;
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.refreshTopSeasonView();
        }

        /** 刷新当前赛季赛区相关信息 */
        private refreshTopSeasonView(): void
        {
            //顶部文字
            let areaName = cfg.DanAreaCfgData.getAreaNameByID(DanDataMgr.curAreaId);
            this.UIPanel.txtTimeTitle.text = Global.getLangStr("dan_msg4", DanDataMgr.seasonNumber, areaName);
            //赛季时间
            let beginTime = DanDataMgr.seasonStartTime;
            let endTime = beginTime + cfg.DanConstCfgData.getFirstInfo().seasonDays * 86400 - 2; //减1点点，让时间显示在前一天
            let kingBeginTime = beginTime + cfg.DanConstCfgData.getFirstInfo().kingOpenDays * 86400;
            this.UIPanel.txtTime.text = Global.getFormatTimeString(beginTime * 1000, 10) + "-" + Global.getFormatTimeString(endTime * 1000, 10);
            let currTime = TimeController.currTimer / 1000;
            let isFirstHalf = (currTime - beginTime) < cfg.DanConstCfgData.getFirstInfo().upSeasonDays * 86400;
            if (isFirstHalf)
            {
                //当前为上半赛季，7天后开启下半赛季
                var targetTime = beginTime + cfg.DanConstCfgData.getFirstInfo().upSeasonDays * 86400;
                this.UIPanel.txtNextSeasonTips.text = Global.getLangStr("dan_msg5", Global.getTargetDaysTime(targetTime * 1000));
            // } else if (kingBeginTime > currTime)
            // {
            //     //当前为下半赛季，7天后开启王者赛
            //     let targetTime = kingBeginTime;
            //     this.UIPanel.txtNextSeasonTips.text = Global.getLangStr("dan_msg6", Global.getTargetDaysTime(targetTime * 1000));
            } else
            { //下半赛季王者赛开启中
                //当前为下半赛季，7天后开启下个赛季
                let targetTime = endTime;
                this.UIPanel.txtNextSeasonTips.text = Global.getLangStr("dan_msg7", Global.getTargetDaysTime(targetTime * 1000));
            }
        }

        /** 刷新当前段位显示 */
        private refreshCurDanView(): void
        {
            Global.setDanBigIcon(this.UIPanel.imgDanTypeIcon, DanDataMgr.curDanId);
            Global.setDanTextIcon(this.UIPanel.imgDanTextIcon, DanDataMgr.curDanId);
        }

        /** 刷新匹配相关的显示（剩余次数等） */
        private refreshMatchView(): void
        {
            let totalBuyCount = cfg.DanBuyCountCfgData.getAllLength();
            let leftBuyCount = totalBuyCount - DanDataMgr.buyCount;
            this.UIPanel.txtMatchBuyCount.text = leftBuyCount + "";

            let totalUseCount = cfg.DanConstCfgData.getFirstInfo().dayFightCount;
            let leftUseCount = DanDataMgr.getLeftCount();
            this.UIPanel.txtMatchCount.text = leftUseCount + "/" + totalUseCount;
        }

        /** 刷新升级段位条件显示 */
        private refreshUpgradeView(): void
        {
            let curDanId = DanDataMgr.curDanId;
            let curCfgInfo = cfg.DanUpgradeCfgData.getInfo(curDanId);
            let nextCfgInfo = cfg.DanUpgradeCfgData.getInfo(curDanId + 1);
            //是否顶级
            let isLastOne = nextCfgInfo == null;
            //如果达到顶级，则不需要显示下一段位的进度条和文字显示
            this.UIPanel.boxUpgrade.visible = !isLastOne;

            if (isLastOne) { return; }

            this.UIPanel.txtNextDanName.text = Global.getLangStr("dan_msg15") + nextCfgInfo.danName;  //下一段位: "


            let maxExp = curCfgInfo.maxExp;
            let curExp = DanDataMgr.curExp;
            //是否处于晋级（升段）赛中   晋级时显示m局n胜的列表显示， 保级时显示进度条
            let isPreUp = maxExp <= curExp;
            this.UIPanel.txtUpgradeCondition.visible = isPreUp;
            this.UIPanel.listUpgradeWinCount.visible = isPreUp;
            this.UIPanel.boxUpgradeProgress.visible = !isPreUp;
            if (isPreUp)
            { //显示晋级升段列表
                let promoteWinCountArr = curCfgInfo.promoteWinCount.split("_");
                this.UIPanel.txtUpgradeCondition.text = Global.getLangStr("dan_msg8", promoteWinCountArr[1], promoteWinCountArr[0]);
                //晋级数据
                let promotedDatas = DanDataMgr.protmoteresult;
                this.UIPanel.listUpgradeWinCount.onRefresh(parseInt(promoteWinCountArr[1]), this, (tempUI: Laya.UIComponent, index: number) =>
                {
                    let light = tempUI.getChildByName("light") as Laya.Image;
                    let imgWin = tempUI.getChildByName("imgWin") as Laya.Image;
                    let imgLose = tempUI.getChildByName("imgLose") as Laya.Image;

                    let isGo = promotedDatas.length > index;  //是否参加了这一场
                    let result = promotedDatas[index];

                    light.visible = isGo;
                    imgLose.visible = light.gray = isGo && result == Pb_God._emBattleResult.BattleResult_Fail;
                    isGo && result == Pb_God._emBattleResult.BattleResult_Fail;
                    imgWin.visible = isGo && result == Pb_God._emBattleResult.BattleResult_Sucess;
                })
            } else
            {
                let progressBarFullWidth = 189;
                Global.setProgressBar(this.UIPanel.progressBlue, DanDataMgr.cacheExp / maxExp, progressBarFullWidth);
                Global.setProgressBar(this.UIPanel.progressGreen, curExp / maxExp, progressBarFullWidth);
                if (curExp < 0) { curExp = 0; };
                this.UIPanel.txtProgressValue.text = curExp + "/" + maxExp;
            }
        }

        /** 刷新首次达到段位奖励显示(注：此处对应奖励显示的是当前赛季的最高段位，而不是当前段位。) */
        private refreshTopFirstRewardView(): void
        {
            let id = DanDataMgr.prizeDanId + 1;

            this.UIPanel.btnTopFirstReward.disabled = id > DanDataMgr.maxDanId;

            let items = cfg.DanUpgradeCfgData.getFirstPrizeAryById(id);
            if (!items)
            { //没有对应的配置了，说明到达顶级了。
                this.UIPanel.boxTopReward.visible = false;
                return;
            }
            let danName = cfg.DanUpgradeCfgData.getDanNameByDanID(id);
            this.UIPanel.htmlRewardTips.showText = Global.getLangStr("dan_msg9", danName);

            this.UIPanel.listRewards.onRefresh(items.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(items[additemsIndex]);
            });
        }

    }
}