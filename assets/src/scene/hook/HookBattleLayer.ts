
module Pro
{
    /**
     * 挂机界面上显示的挂机战斗视图
     * 注意不是真实战斗场景，而是挂机界面上英雄一直往前跑的简单战斗。
     * @author jason.xu
     */
    export class HookBattleLayer extends Laya.Box
    {
        /** 循环地图 */
        private mapLongList: Array<HookMapLongLayer> = [];

        /** 是否限制移动到的最小边界 */
        public isNeedLimitFrame = true;

        /** 角色管理器 */
        private hookMapRoleMgr: HookMapRoleMgr;

        /** 是否处于挂机逻辑中 */
        private isUpdate = false;

        private _isMapInit: boolean = false;

        constructor()
        {
            super();

            //加载场景
            this.initScene();

            //开始逻辑
            this.doLoop();
        }

        //-----------------------------私有函数----------------------------------------
        /**
         * 创建场景以及初始化UI信息
         */
        private initScene(): void
        {
            //添加管理器
            this.hookMapRoleMgr = new HookMapRoleMgr();
            this.hookMapRoleMgr.startLogic(this);
            //设置事件
            this.controllEvents(false);
        }

        /**
         * 回收挂机战斗资源
         */
        public recycleRes(): void
        {
            this.hookMapRoleMgr.stopLogic();
            this.controllEvents(true);
            this.stopLoop();
            // this.removeChildren();
        }

        //-----------------------------主逻辑---------------------------------------------------
        /** 开启逻辑 */
        private doLoop()
        {
            //设置背景
            this.setMapID(HookDataMgr.getSceneID());
            //创建npc
            this.hookMapRoleMgr.controlShow(true);
            this.resetEmbattleInfo();
            //游戏主循环
            this.stopLoop();
            this.startLoop();
        }

        private _chapterMapId = -1;
        /** 切换挂机章节场景ID */
        private setMapID(chapterMapId: number)
        {
            if (this._chapterMapId == chapterMapId)
            {
                return;
            }
            this._chapterMapId = chapterMapId;
            for (let maplong of this.mapLongList)
            {
                maplong.cleanUp();
                maplong.removeSelf();
            }
            this.mapLongList = [];
            //目前只有一组资源，后续增加章节不同一资源时，再依据资源出图的方式，来考虑配置方式。这边的数值是对应资源的宽高

            this.pushMapBg("bg2.jpg", 1, 1822);
            this.pushMapBg("bg1.png", 2, 1562);
            this.adjustScreenPos();
        }

        public adjustScreenPos()
        {
            let topY = Laya.stage.height - GameConfig.WinHeight >> 1;
            this.mapLongList.forEach(element =>
            {
                if (element.spPath.indexOf(".jpg") >= 0)
                {
                    element.y = -topY;
                }
                else
                {
                    element.y = GameConfig.WinHeight - (1200 - topY);
                }
            })
            this.hookMapRoleMgr && this.hookMapRoleMgr.adjustScreenPos();
        }

        /** 关卡变化 */
        public resetHookStageId(stageId: number): void
        {
            this.setMapID(cfg.HookStageCfgData.getSceneIDByStageID(stageId));
        }


        private pushMapBg(url: string, speed: number = 5, nWidth: number)
        {
            let StageID = HookDataMgr.getStageID() <= 0 ? 1 : HookDataMgr.getStageID();
            let SceneID = cfg.HookStageCfgData.getSceneIDByStageID(StageID);
            url = Global.getChapterMapSkin(cfg.HookSceneCfgData.getInfo(SceneID).sceneResource) + url;
            let layer = new HookMapLongLayer(url, speed, nWidth);
            this.addChildAt(layer, this.mapLongList.length);
            this.mapLongList.push(layer);
        }

        //--------------------------逻辑循环控制-------------------------------------------
        private startLoop()
        {
            this.isUpdate = true;
        }

        private stopLoop()
        {
            this.isUpdate = false;
        }

        /**
         * 主逻辑循环
         */
        public updateFrame(): void
        {
            if (!this.isUpdate)
            {
                return;
            }

            //怪物逻辑循环
            this.hookMapRoleMgr.doLogic();

            //地图逻辑
            if (this.mapLongList != null)
            {
                //这里加一个判断是否有上阵英雄
                if (!this._isMapInit || EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Zhuxian))
                {
                    this._isMapInit = true;
                    this.mapLongList.forEach(elment =>
                    {
                        elment.doLogic();
                    });
                }
            }

        }

        /** 控制场景逻辑暂停 */
        public controlLogicResume(isResume: boolean)
        {
            if (isResume)
            {
                if (!this.isUpdate)
                {
                    this.startLoop();
                    this.hookMapRoleMgr.controlShow(true);
                    this.hookMapRoleMgr.reset();
                    this.hookMapRoleMgr.createBaseTeam();
                }
            }
            else
            {
                if (this.isUpdate)
                {
                    this.stopLoop();
                    this.hookMapRoleMgr.controlShow(false);
                    this.hookMapRoleMgr.reset();
                }
            }
        }

        /** 阵法发生变更 */
        public resetEmbattleInfo()
        {
            this.hookMapRoleMgr.reset();
            this.hookMapRoleMgr.createBaseTeam();
        }


        //-----------------------------管理自定义事件-----------------------------------
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            Global.EventsNotifyControl(this.listensEvents(), isOff);
            if (!isOff)
            {
                this.on(Laya.Event.UNDISPLAY, this, this.recycleRes);
            }
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
                EventNotify.City_MRole_Moving, this, this.City_Role_Moving_Called
            ]
        }

        //------------------------------地图逻辑--------------------------------------
        //
        /** 限制角色移动区域 */
        public limitMoveFrame(InMapPos: Laya.Point): Laya.Point
        {
            if (!this.isNeedLimitFrame)
            {
                return InMapPos;
            }

            if (InMapPos.y > GameConfig.MapDown)
            {
                InMapPos.y = GameConfig.MapDown;
            }
            else if (InMapPos.y < GameConfig.MapUp)
            {
                InMapPos.y = GameConfig.MapUp;
            }

            if (InMapPos.x < GameConfig.MapLeft)
            {
                InMapPos.x = GameConfig.MapLeft;
            }
            if (InMapPos.x > this.width - GameConfig.MapRight)
            {
                InMapPos.x = this.width - GameConfig.MapRight;
            }
            return InMapPos;
        }


        /** 主角在城市中移动 */
        private City_Role_Moving_Called(targetRole: CityRole, basePosX: number, speedX: number)
        {
            if (targetRole.parent.parent != this)
            {
                return;
            }

            let tmpW = this.width / this.scaleX / 2;
            if (basePosX >= tmpW && basePosX <= this.width - tmpW)
            {
                let targetPos = new Laya.Point(this.x - speedX * this.scaleX, this.y);
                this.moveBGToPostion(targetPos);
            }
        }

        /** 限制场景移动范围 */
        private limitBGBunding(targetPos: Laya.Point): Laya.Point
        {
            let limitSize = new Laya.Point(this.width * this.scaleX - this.width, this.height * this.scaleY - this.height);
            if (targetPos.x < -limitSize.x)
            {
                targetPos.x = -limitSize.x;
            }
            if (targetPos.x > 0)
            {
                targetPos.x = 0;
            }
            if (targetPos.y < -limitSize.y)
            {
                targetPos.y = -limitSize.y;
            }
            if (targetPos.y > 0)
            {
                targetPos.y = 0;
            }
            return targetPos;
        }

        /** 将场景剧中在屏幕中心 */
        public centerScreen(toPos: Laya.Point)
        {
            let tmpW = this.width / this.scaleX / 2;
            let targetPos = new Laya.Point(tmpW - toPos.x, this.y);
            this.moveBGToPostion(targetPos);
        }

        /** 将场景移动到坐标点 */
        private moveBGToPostion(targetPos: Laya.Point)
        {
            this.limitBGBunding(targetPos);
            this.pos(targetPos.x, targetPos.y);
        }
    }
}