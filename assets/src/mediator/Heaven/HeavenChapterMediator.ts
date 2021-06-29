module Pro
{
    /**
     * 天界副本关卡界面
     */
    export class HeavenChapterMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Heavens.ChapterViewUI;

        /**
         * 当前显示的地图ui
         */
        private current_chapter_mapUI: HeavenChapterMap;

        // 当前显示的章节id
        private cur_chapter_ID: number;

        /** 当前选中的章节关卡信息 */
        private cur_select_stageInfo: cfg.HeavenStageCfgInfo;

        /** 所有章节地图列表 */
        private chapter_mapDic: { [key: number]: HeavenChapterMap } = {};

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("heavenschapter")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/Unpack/UIHeadShow/tianjie_renwu01.png"];
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.ChapterViewUI, 1);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
            this.current_chapter_mapUI.recoverCurMap();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btn_back.onClick(this, this.closeUI);
            // 购买挑战次数
            this.UIPanel.btn_addTimes.onClick(this, () =>
            {
                if (HeavenDungeonDataMgr.cur_challenge_times >= cfg.HeavenCommonCfgData.getMaxCountByID(0))
                {
                    TipsUtils.showTipsByLanId("Heaven_msg7");  //当前挑战次数已满
                    return;
                }
                if (HeavenDungeonDataMgr.can_buy_challenge_times <= 0)
                {
                    TipsUtils.showTipsByLanId("Heaven_msg8"); //购买次数已用完
                    return;
                }
                let text = Global.getLangStr("shop_msg1");
                let needItem = cfg.HeavenCommonCfgData.getCostItemInfobyIndex(0)
                let item_name = cfg.ItemCfgData.getNameById(needItem.itemid);
                let cost_text = needItem.itemcount + item_name;
                text += Global.getLangStr("shop_msg3", cost_text);
                AlertShow.showConfirmAlert(text, this, () =>
                {
                    if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true)) return;
                    HeavenDungeonSend.buyCount();
                });
            });

            this.UIPanel.btn_sweep.onClick(this, this.onSweepClick);
            this.UIPanel.btn_fight.onClick(this, this.onFightClick);
            this.UIPanel.btn_left.onClick(this, this.onLeftChapterClick);
            this.UIPanel.btn_right.onClick(this, this.onRightChapterClick);
            this.UIPanel.btn_detail.onClick(this, this.onTeamDetailClick);
            this.UIPanel.btn_help.onClick(this, () =>
            {
                //帮助提示
                CommonHelpView.show(this.UIPanel.btn_help, Global.getLangStr("heavenTips"));
            });

            this.UIPanel.prizeReviewPanelMask.onClick(this, () => { this.UIPanel.prizeReviewPanel.visible = false; })
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Heaven_SelectChapterStage, this, this.refreshIntroducePage);
            this.addEventMgr(EventNotify.Heaven_ChpaterStageUpdate, this, this.refreshView);
            this.addEventMgr(EventNotify.Heaven_DrawChapterReward, this, this.refreshView);
            this.addEventMgr(EventNotify.Heaven_BuyCount, this, this.updateCount);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.initMapUI(this.UIOpenData.customObject);

            this.updateCount();
        }

        /**
         * 初始化指定章节ID的地图
         * @param chapter_id 
         */
        private initMapUI(chapter_id: number): void
        {
            this.cur_chapter_ID = chapter_id;
            this.UIPanel.txt_title.text = Global.getLangStr("factionboss_msg15", this.cur_chapter_ID);

            if (this.current_chapter_mapUI)
                this.current_chapter_mapUI.recoverCurMap();
            this.current_chapter_mapUI = this.getChpaterMap(this.cur_chapter_ID);
            this.current_chapter_mapUI.setSelectImg(this.UIPanel.img_select);
            this.current_chapter_mapUI.initMap();
            this.current_chapter_mapUI.setUiParent(this.UIPanel.mapBox);
            this.UIPanel.btn_left.visible = this.cur_chapter_ID > 1;
            this.UIPanel.btn_right.visible = this.cur_chapter_ID < HeavenDungeonDataMgr.getCurOpenChpaterId();
            this.refreshView();
        }

        private getChpaterMap(chapter_id: number): HeavenChapterMap
        {
            if (!this.chapter_mapDic[chapter_id])
                this.chapter_mapDic[chapter_id] = new HeavenChapterMap(this.cur_chapter_ID);
            return this.chapter_mapDic[chapter_id];
        }

        /**
         * 刷新挑战次数
         */
        private updateCount(): void
        {
            this.UIPanel.txt_count.text = HeavenDungeonDataMgr.cur_challenge_times + "/" + cfg.HeavenCommonCfgData.getMaxCountByID(0);
            let text_need = HeavenDungeonDataMgr.can_buy_challenge_times + "/" + cfg.HeavenCommonCfgData.getBuyCountByID(0);
            this.UIPanel.txt_leftCount.showText = Global.getLangStr("ui_Faction_FactionBoss_msg5_0", text_need);
        }

        /**
         * 切换章节 刷新整个视图显示 
         * @param chapter_id 
         */
        private refreshView(): void
        {
            this.refreshRewardBoxs(this.cur_chapter_ID);
            this.updateCount();
        }

        /**
         * 刷新奖励箱子
         * @param chapter_id 
         */
        private refreshRewardBoxs(chapter_id: number): void
        {
            let box_rewards = cfg.HeavenChapterPrizeCfgData.getInfoArrayByChapterIndex(chapter_id);
            this.UIPanel.rewardBox.onRefresh(box_rewards.length, this, this.onProgressBoxRefresh);

            let cur_progress = HeavenDungeonDataMgr.getChapterStarsCount(this.cur_chapter_ID);//当前章节已获得星星数量
            let max_progress = box_rewards[box_rewards.length - 1].star;// 当前章节总星星数量 

            Global.setProgressBar(this.UIPanel.ActiveValueImg.mask, cur_progress / max_progress, this.UIPanel.ActiveValueImg.width);
            this.UIPanel.txt_progress.text = cur_progress + "/" + max_progress;
        }

        /**
         * 章节箱子刷新
         * @param tempUI 
         * @param index 
         */
        private onProgressBoxRefresh(tempUI: Pro.ProgressChestItemUI, index: number): void
        {
            let box_rewards = cfg.HeavenChapterPrizeCfgData.getInfoArrayByChapterIndex(this.cur_chapter_ID);
            let box_cfg = box_rewards[index];

            let tempIsHave = HeavenDungeonDataMgr.isChapterRewardFinish(box_cfg.chapter, box_cfg.index);
            let curNum = HeavenDungeonDataMgr.getChapterStarsCount(this.cur_chapter_ID);//章节已获得星星数
            let tempIsActive = curNum >= box_cfg.star;

            tempUI.setBoxTypeIndex(index);
            tempUI.setText(box_cfg.star, "#fff6e8", "#573820");
            tempUI.index = index;
            tempUI.setOpenState(tempIsActive, tempIsHave);
            tempUI.onClick(this, this.onProgressBoxClick);
        }

        /**
         * 章节箱子点击事件
         * @param tempUI 
         */
        private onProgressBoxClick(tempUI: Pro.ProgressChestItemUI): void
        {
            let tempIndex = tempUI.index;
            let tempInfo = cfg.HeavenChapterPrizeCfgData.getInfoArrayByChapterIndex(this.cur_chapter_ID)[tempIndex];
            let curNum = HeavenDungeonDataMgr.getChapterStarsCount(this.cur_chapter_ID);
            let tempIsHave = HeavenDungeonDataMgr.isChapterRewardFinish(this.cur_chapter_ID, tempInfo.index);
            if (curNum >= tempInfo.star && !tempIsHave)
            {
                HeavenDungeonSend.chapterReward(tempInfo.index);
            }
            else
            {
                // 预览奖励 
                this.UIPanel.prizeReviewPanel.visible = true;
                let addItems = cfg.HeavenChapterPrizeCfgData.getAddItemAryById(tempInfo.index);
                this.UIPanel.prizeReviewPanel.width = addItems.length * 117 + 30;
                this.UIPanel.prizeReviewBox.onRefresh(addItems.length, this, (itemUI: NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(addItems[index], true);
                    itemUI.NameLb.scale(1.1,1.1);
                });
            }
        }

        /**
         * 刷新关卡介绍页
         * @param info 
         */
        private refreshIntroducePage(info: cfg.HeavenStageCfgInfo): void
        {
            this.cur_select_stageInfo = info;
            this.UIPanel.txt_levelName.text = Global.getLangStr("bat_msg2", info.stage);  //Global.numberToChinese(info.stage)
            // 推荐战力
            this.UIPanel.txt_power.text = Global.getLangStr("ui_StarTower_msg2") + cfg.HeavenStageCfgData.getRequreFightPowerByIndex(info.index);
            //this.UIPanel.img_role.skin = "";//角色皮肤

            let stage_data = HeavenDungeonDataMgr.getChapterStageData(info.chapter, info.index);
            let has_get_stars = stage_data ? stage_data.stars : [];//已获得星星列表(存储星星下标)
            let star_arr = cfg.HeavenStageCfgData.getStarConditionArray(info);
            this.UIPanel.listCondition.onRefresh(star_arr.length, this, (tmpItem: Laya.Box, index: number) =>
            {

                let star_conditionID = star_arr[index];
                let lbl = tmpItem.getChildByName("txtValue") as component.UILabel;
                lbl.text = cfg.HeavenStarConditionCfgData.getDescByIndex(star_conditionID);

                let img_star = tmpItem.getChildByName("starFrame") as component.UIFrameImage;
                let is_finish = has_get_stars.indexOf(index) >= 0;
                img_star.frame = is_finish ? 1 : 2;

                let rewards: Array<cfg.AddItemInfo> = null;
                let is_firstTime = stage_data ? stage_data.first : true;
                if (is_firstTime)  // 没有通关过
                    rewards = cfg.HeavenStageCfgData.getFirstAddItemAryByInfo(info);
                else
                    rewards = cfg.HeavenStageCfgData.getAddItemAryByInfo(info);

                this.UIPanel.imgRewardTitle.frame = is_firstTime ? 2 : 1;

                this.UIPanel.rewardItemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(rewards[index]);
                });

            });

            let is_perfect = has_get_stars.length >= 3;//完美通关
            this.UIPanel.btn_fight.visible = !is_perfect;
            this.UIPanel.btn_sweep.visible = is_perfect;
            this.UIPanel.btn_detail.visible = cfg.HeavenStageCfgData.isBossStage(this.cur_select_stageInfo);
        }


        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }

        /**
         * 挑战
         */
        private onFightClick(): void
        {
            if (HeavenDungeonDataMgr.cur_challenge_times <= 0)
            {//次数不足
                TipsUtils.showTipsByLanId("fight_msg45");
                return;
            }
            let info_id = this.cur_select_stageInfo.index;
            let stage = cfg.HeavenStageCfgData.getStageByIndex(info_id);
            //let lock_em_type = cfg.HeavenStageCfgData.isBossStage(this.cur_select_stageInfo) ? Pb_God._emZhenfaType.ZhenfaType_Heaven2 : Pb_God._emZhenfaType.ZhenfaType_Heaven1;
            let team_count = cfg.HeavenStageCfgData.isBossStage(this.cur_select_stageInfo) ? 2 : 1;
            let op_ui_data = new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_HeavenDungeon, info_id);
            op_ui_data.lockEmCount = team_count;
            UIManager.Inst.forceOpen(op_ui_data);
        }

        /**
         * 扫荡
         */
        private onSweepClick(): void
        {
            if (!this.cur_select_stageInfo) return;
            if (HeavenDungeonDataMgr.cur_challenge_times <= 0)
            {//次数不足
                TipsUtils.showTipsByLanId("fight_msg45");
                return;
            }
            HeavenDungeonSend.sweep(this.cur_select_stageInfo.index);
        }

        /**
         * 切换上一章节
         */
        private onLeftChapterClick(): void
        {
            let last_chapter_id = this.cur_chapter_ID - 1;
            if (last_chapter_id <= 0) return;
            this.initMapUI(last_chapter_id);
        }

        /**
         * 切换下一章节
         */
        private onRightChapterClick(): void
        {
            let next_chapter_id = this.cur_chapter_ID + 1;
            if (next_chapter_id > HeavenDungeonDataMgr.getCurOpenChpaterId()) return;
            this.initMapUI(next_chapter_id);
        }

        /**
         * boss关敌方队伍详情
         */
        private onTeamDetailClick(): void
        {
            this.UIPanel.detailBox.visible = true;
            let monsterId = cfg.HeavenStageCfgData.getMonsterByIndex(this.cur_select_stageInfo.index);
            let waveInfos_1 = cfg.HeavenMonsterNewCfgData.getMonterInfoWithID(monsterId);
            this.UIPanel.bossTeam_1.onRefresh(waveInfos_1.length, this, (tmpItem: NorItemUI, index: number) =>
            {
                let monster_info = waveInfos_1[index];
                tmpItem.setPetUI(monster_info.skinId, monster_info.star);
                tmpItem.LvLb.visible = true;
                tmpItem.LvLb.text = monster_info.level.toString();
            });
            monsterId = cfg.HeavenStageCfgData.getMonster2ByIndex(this.cur_select_stageInfo.index);
            let waveInfos_2 = cfg.HeavenMonsterNewCfgData.getMonterInfoWithID(monsterId);
            this.UIPanel.bossTeam_2.onRefresh(waveInfos_2.length, this, (tmpItem: NorItemUI, index: number) =>
            {
                let monster_info = waveInfos_2[index];
                tmpItem.setPetUI(monster_info.skinId, monster_info.star);
                tmpItem.LvLb.visible = true;
                tmpItem.LvLb.text = monster_info.level.toString();
            });
            Laya.timer.frameOnce(1, this, () =>
            {
                Laya.stage.on(Laya.Event.CLICK, this, this.closeTeamDetail);
            });
        }

        private closeTeamDetail(): void
        {
            this.UIPanel.detailBox.visible = false;
            Laya.stage.off(Laya.Event.CLICK, this, this.closeTeamDetail);
        }
    }
}