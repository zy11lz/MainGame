
module Pro
{
    /**
     * 世界地图
     */
    export class WorldLayer extends component.UILayer
    {

        /** 世界地图UI */
        private mapUI: ProUI.Scene.WorldMap.MapUI;

        /** 已通过场景ID列表 */
        private unlocked_scene_list: number[];

        /** 已通过区域列表 */
        private unlocked_area_list: number[];

        /** 总区域数量 */
        private area_count = 5;

        /** 区域标题图片列表 */
        private area_title_list: Laya.Image[] = [];

        constructor()
        {
            super();

            //加载场景
            this.initScene();
        }

        //-----------------------------私有函数----------------------------------------
        /**
         * 创建场景以及初始化UI信息
         */
        private initScene(): void
        {

            //设置背景
            this.mapUI = new ProUI.Scene.WorldMap.MapUI();
            this.addChild(this.mapUI);

            //设置地图原始尺寸
            this.width = this.mapUI.BG.width;
            this.height = this.mapUI.height;
            this.scale(GameConfig.WinScaleY, GameConfig.WinScaleY);

            //设置事件
            this.controllEvents(false);

            this.initMap();
        }

        /**
         * 初始化地图
         */
        private initMap(): void
        {
            this.unlocked_scene_list = [];
            this.unlocked_area_list = [];
            this.area_count = cfg.HookChapterUnlockCfgData.getAll().length;
            let latest_unlock_area = 1;// 最新解锁的区域

            let sceneInfo_list = cfg.HookSceneCfgData.getAllList();
            for (let i in sceneInfo_list)
            {
                let info = sceneInfo_list[i];
                let scene_id = info.sceneID;
                let stage_arr = cfg.HookStageCfgData.getListWithSceneID(scene_id);
                let scene_first_stage_info = stage_arr[0];
                let current_stage_ID = HookDataMgr.getStageID() + 1;
                // 该场景是否通过
                let is_scene_unlock = current_stage_ID >= scene_first_stage_info.stageID;
                if (is_scene_unlock)
                { this.unlocked_scene_list.push(scene_id); }
            }

            for (let i = 1; i <= this.area_count; i++)
            {
                let area_id = i;
                // 该区域包含的场景列表
                let scene_list: number[] = cfg.HookChapterUnlockCfgData.getSceneArrById(area_id);

                for (let j = 0; j < scene_list.length; j++)
                {
                    let s_id = scene_list[j];
                    let is_s_passed = this.unlocked_scene_list.indexOf(s_id) >= 0;
                    if (is_s_passed)
                    {
                        // 区域内有章节通过
                        this.unlocked_area_list.push(area_id);
                        latest_unlock_area = area_id;
                        break;
                    }
                }
            }

            this.initClouds();
            this.initAllAreaScenes();
            this.showArea(latest_unlock_area);
        }

        /** 初始化所有云状态 */
        private initClouds(): void
        {
            for (let i = 1; i <= this.area_count; i++)
            {
                let cloud_img: Laya.Image = this.mapUI.BG.getChildByName("cloud_" + i) as Laya.Image;
                let area_id = i;
                let is_area_passed = this.unlocked_area_list.indexOf(i) >= 0;
                cloud_img.visible = !is_area_passed;

                let area_title_img = this.mapUI.areaBox.getChildByName("area_" + i) as Laya.Image;
                let area_title_label = area_title_img.getChildByName("txt_name") as component.UILabel;
                area_title_label.text = cfg.HookChapterUnlockCfgData.getAreaNameByID(area_id);
                this.area_title_list.push(area_title_img);
                area_title_img.on(Laya.Event.CLICK, this, () =>
                {
                    // 显示对应区域场景列表
                    this.showArea(area_id);
                });
            }
            this.resetAllAreaTitle();
        }


        /**
         * 重置所有标题显示状态
         */
        private resetAllAreaTitle(): void
        {
            for (let i = 0; i < this.area_title_list.length; i++)
            {
                let area_id = i + 1;
                let is_area_passed = this.unlocked_area_list.indexOf(area_id) >= 0;
                let img = this.area_title_list[i];
                img.visible = is_area_passed;
            }
        }

        /**
         * 隐藏所有章节场景
         */
        private resetAllChpaterBox(): void
        {
            for (let i = 1; i <= this.area_count; i++)
            {
                let area_box = this.mapUI["chapterBox_" + i] as Laya.Box;
                area_box.visible = false;
            }
        }

        /**
         * 隐藏所有区域场景列表
         */
        private initAllAreaScenes(): void
        {
            for (let i = 1; i <= this.area_count; i++)
            {
                let area_box = this.mapUI["chapterBox_" + i] as Laya.Box;
                area_box.visible = false;

                // 该区域场景列表
                let scene_list: number[] = cfg.HookChapterUnlockCfgData.getSceneArrById(i);
                for (let j = 0; j < scene_list.length; j++)
                {
                    let idx = j + 1;
                    let scene_id = scene_list[j];
                    let stage_arr = cfg.HookStageCfgData.getListWithSceneID(scene_id);
                    let scene_first_stage_info = stage_arr[0];
                    let scene_last_stage_info = stage_arr[stage_arr.length - 1];
                    let cur_stage_id = HookDataMgr.getStageID() + 1;
                    let cur_info = cfg.HookStageCfgData.getInfo(cur_stage_id);
                    let is_scene_passed = cur_stage_id >= scene_last_stage_info.stageID;
                    let is_scene_lock = cur_stage_id < scene_first_stage_info.stageID;

                    let item = area_box.getChildByName("chapter_" + idx) as ProUI.Scene.WorldMap.PageView.WorldMapItemUI;

                    let cur_progress = is_scene_passed ? stage_arr.length : stage_arr.indexOf(cur_info) + 1;
                    let max_progress = stage_arr.length;
                    item.txt_progress.text = "(" + cur_progress + "/" + max_progress + ")";
                    item.img_passed.visible = is_scene_passed;
                    item.txt_name.text = cfg.HookSceneCfgData.getSceneNameBySceneID(scene_id);
                    item.img_lock.visible = is_scene_lock;
                    item.onClick(this, this.eventCloseWorldMap);
                }
            }
        }

        eventCloseWorldMap()
        {
            EventMgr.trigger(EventNotify.WorldMap_Close);
        }

        /**
         * 显示区域
         * @param area_id
         */
        private showArea(area_id: number): void
        {
            this.resetAllAreaTitle();
            this.resetAllChpaterBox();

            let area_title_img = this.area_title_list[area_id - 1];
            area_title_img.visible = false;

            // 场景列表
            let area_box = this.mapUI["chapterBox_" + area_id] as Laya.Box;
            area_box.visible = true;
        }

        /**
         * 回收场景
         */
        private cycleScene(): void
        {

            for (let i = 0; i < this.mapUI.BG.numChildren; i++)
            {
                let tmpImg = this.mapUI.BG.getChildAt(i) as Laya.Image;
                Laya.loader.clearTextureRes(tmpImg.skin);
            }
            this.mapUI.destroy();
            this.mapUI = null;

            this.controllEvents(true);
            this.destroy();
        }


        //-----------------------------管理自定义事件-----------------------------------
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            Global.EventsNotifyControl(this.listensEvents(), isOff);
            if (!isOff)
            {
                this.on(Laya.Event.UNDISPLAY, this, this.cycleScene);
            }
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
            ]
        }

    }
}