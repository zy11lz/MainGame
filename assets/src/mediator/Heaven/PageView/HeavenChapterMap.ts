module Pro
{
    /**
     * 天界副本地图节点
     */
    export class HeavenChapterMap
    {

        public mapUI: any;

        // 存储在对象池中标签名
        private mapItemSignName: string = "HeaveChapterItem_";

        // 当前地图章节ID
        private chapter_id: number;

        // 选中框
        private select_img: Laya.Image;

        // 当前选中关卡下标
        private select_index: number;

        /** 所有章节地图配置 */
        private _allMapUI = [
            ProUI.Heavens.PageView.ChapterMap_1UI,
            ProUI.Heavens.PageView.ChapterMap_2UI
        ];

        constructor(chapter_id: number)
        {
            //super();
            this.chapter_id = chapter_id;

            let pool_ui = Laya.Pool.getItem(this.mapItemSignName + this.chapter_id);
            if (!pool_ui)
            {   // 根据ID加载对应章节地图 最多4张地图循环使用
                let p_id = this.chapter_id % this._allMapUI.length;
                let cls = this._allMapUI[p_id];
                pool_ui = new cls();
            }
            this.mapUI = pool_ui;
        }

        /**
         * 初始化地图
         */
        public initMap(): void
        {
            EventMgr.on(EventNotify.Heaven_ChpaterStageUpdate, this, this.initMap);
            this.refreshMapView();
        }

        private refreshMapView(): void
        {
            this.mapUI.visible = true;
            let map_cfg_arr = cfg.HeavenStageCfgData.getChapterStageInfoArr(this.chapter_id);
            // 最新触发的关卡数据
            let latest_chapter_data = map_cfg_arr[0];
            for (let i = 0; i < map_cfg_arr.length; i++)
            {
                let stage_cfg = map_cfg_arr[i];
                let mapStageUI: ProUI.Heavens.ChildPage.ChapterMapItemUI = this.mapUI["level_" + stage_cfg.stage];
                let mapPathView = this.mapUI["path_" + (stage_cfg.stage - 1)];
                let is_unlock = HeavenDungeonDataMgr.isChpaterStageUnlock(stage_cfg.chapter, stage_cfg.stage);
                mapStageUI.visible = is_unlock;
                if (mapPathView) mapPathView.visible = is_unlock;
                if (is_unlock) latest_chapter_data = stage_cfg;
                this.initStageMapUI(mapStageUI, stage_cfg);
            }

            this.setImgSelect(latest_chapter_data);
        }

        /**
         * 添加箭头选中UI
         */
        public setSelectImg(img_select: Laya.Image): void
        {
            this.select_img = img_select;
            this.select_img.removeSelf();
            this.mapUI.addChild(this.select_img);
        }

        private initStageMapUI(mapStageUI: ProUI.Heavens.ChildPage.ChapterMapItemUI, stage_cfg: cfg.HeavenStageCfgInfo): void
        {
            if (!mapStageUI) logE("UI配置错误at chapter: " + stage_cfg.chapter + "_" + stage_cfg.stage);

            let bgIndex = 1;
            let is_boss_stage = cfg.HeavenStageCfgData.isBossStage(stage_cfg);
            if (is_boss_stage)
            {
                // BOSS 关
                bgIndex = 2;
                mapStageUI.txt_name.text = "BOSS";
            }
            else
            {
                bgIndex = 1;
                mapStageUI.txt_name.text = stage_cfg.chapter + "-" + stage_cfg.stage;
            }
            let bgBeginIndex = stage_cfg.chapter > 40 ? 4 : Math.floor((stage_cfg.chapter - 1) / 9);
            mapStageUI.frameIcon.frame = bgIndex + bgBeginIndex;

            let is_passed = HeavenDungeonDataMgr.isChapterStagePassed(stage_cfg.chapter, stage_cfg.stage);
            let stage_data = HeavenDungeonDataMgr.getChapterStageData(stage_cfg.chapter, stage_cfg.index);
            let star_count = stage_data ? stage_data.stars.length : 0;
            // 显示解锁星星数量
            for (let i = 1; i <= 3; i++)
            {
                let _star = mapStageUI["star_" + i];
                _star.frame = i <= star_count ? 1 : 2;
            }

            mapStageUI.onClick(this, () =>
            {
                if (this.select_index == stage_cfg.stage)
                {
                    if (star_count >= 3)
                    {
                        TipsUtils.showTipsByLanId("fight_msg40");  //本关已完美通关啦
                        return;
                    }
                    // 选中状态再次点击 则弹出挑战界面
                    if (HeavenDungeonDataMgr.cur_challenge_times <= 0)
                    {//次数不足
                        TipsUtils.showTipsByLanId("fight_msg45");
                        return;
                    }
                    //let lock_em_type = is_boss_stage ? Pb_God._emZhenfaType.ZhenfaType_Heaven2 : Pb_God._emZhenfaType.ZhenfaType_Heaven1;
                    let team_count = is_boss_stage ? 2 : 1;
                    let op_ui_data = new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_HeavenDungeon, stage_cfg.index);
                    op_ui_data.lockEmCount = team_count;
                    UIManager.Inst.forceOpen(op_ui_data);
                } else
                    this.setImgSelect(stage_cfg);
            });
        }

        /**
         * 设置选中状态
         * @param idx 
         */
        private setImgSelect(data: cfg.HeavenStageCfgInfo): void
        {
            let stageUI: ProUI.Heavens.ChildPage.ChapterMapItemUI = this.mapUI["level_" + data.stage];
            if (!stageUI) return;
            this.select_img.pos(stageUI.x, stageUI.y);
            this.select_index = data.stage;

            EventMgr.trigger(EventNotify.Heaven_SelectChapterStage, data);
        }

        /**
         * 设置UI父节点
         * @param node 
         */
        public setUiParent(node: Laya.Sprite): void
        {
            if (this.mapUI && node)
                node.addChild(this.mapUI);
        }

        /**
         * 回收当前显示的地图
         */
        public recoverCurMap(): void
        {
            if (this.mapUI)
            {
                this.mapUI.removeSelf();
                Laya.Pool.recover(this.mapItemSignName + this.chapter_id, this.mapUI);
            }
            EventMgr.off(EventNotify.Heaven_ChpaterStageUpdate, this, this.initMap);
            if (this.select_img)
            {
                this.select_img.removeSelf();
                this.select_img = null;
            }
        }
    }
}