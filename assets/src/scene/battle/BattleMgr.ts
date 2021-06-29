
module Pro
{
    /**
     * 战斗数据管理
     */
    export class BattleMgr
    {
        //---------------------------------------------战斗状态-----------------------------------

        /** 当前正在进行的战斗 */
        private _batInfoDic: ds.StringMap<BatPlaceMgr>;

        /** 当前正在观看的战斗 */
        private watchBatType: Pb_God._emBattleType = -1;

        /** 战斗操作UI */
        public battleUI: Pro.BattleUI;

        /** 当前战斗倍率ID(1,2) */
        private actionSpeedId = 1;
        /** 当前战斗倍率(1, 2) */
        private actionSpeed = 1;

        /** 当前战斗画面比例 */
        private actionScale = 1;

        public lastFightData: Pb_God.PBFightBase;

        /**自动推图状态 */
        public autoHookState: boolean = false;
        /**自动试练塔 */
        public autoTowerState: boolean = false;
        /**自动大师试练塔 */
        public autoSpTowerState: boolean = false;


        /**自动冠军之路 */
        private _autoEndlessTower: number = 0;
        /**自动冠军之路倒计时 */
        private _endlessTime: number;
        /**自动冠军之路倒计时CD */
        private _endlessMaxCD: number = 30;

        /**是否跳过大招 */
        private _skinSkill2: number = 0;
        /**是否冠军赛跳过大招 */
        private _skinSkillChampion: number = 1;

        private _battlePlacPool = new common.Pool(PoolTypes.BATTLE_PLACE);

        //--------------------------------------------初始化---------------------------------------
        /** 单例 */
        private static _Inst: BattleMgr;
        public static get Inst()
        {
            if (BattleMgr._Inst == null)
            { BattleMgr._Inst = new BattleMgr(); }

            return BattleMgr._Inst;
        }

        constructor()
        {
            Global.EventsNotifyControl(this.listensEvents(), false);
            this._battlePlacPool = common.PoolMgr.createPool(PoolTypes.BATTLE_PLACE);
            this._batInfoDic = new ds.StringMap<BatPlaceMgr>();
        }

        /** 数据初始化 */
        public init()
        {
            if (this.battleUI)
            {
                this.battleUI.destroy();
            }
            this.battleUI = null;

            this._batInfoDic.clear();
            this.watchBatType = -1;

        }

        //------------------------------------------创建战斗----------------------------------------
        /**
         * 创建挂机战斗
         * */
        public createHungBattle(): boolean
        {
            //是否可以进入战斗(防止服务端数据出现异常)
            let nextStageID = HookDataMgr.getStageID() + 1;
            nextStageID = Math.min(cfg.HookStageCfgData.getMaxStageId(), nextStageID);
            return this.createNormalBat(Pb_God._emBattleType.BattleType_Hook, nextStageID);
        }

        /**
        * 创建普通战斗
        * @param batType   战场类型
        * @param id        关卡ID
        * @param param     额外参数
        * @param teamType  指定队伍类型，默认是主线
        * @param autoresult  bool  是否自动跳过
        * @param clientParams 前端附加参数， 在创建战斗时服务器会传回
        * */
        public createNormalBat(batType: Pb_God._emBattleType, id: number, param: number = 0, teamType = Pb_God._emZhenfaType.ZhenfaType_Zhuxian, autoresult: boolean = false, clientParams: string = ""): boolean
        {
            if (this.getBatPlaceMgr(batType) != null)
            {
                TipsUtils.showTipsByLanId("tips_msg56");
                return false;
            }

            let tempTeamInfo = EmbattleDataMgr.getBuZhenInfo(teamType);
            if (tempTeamInfo == null)
            {
                tempTeamInfo = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
            }
            if (!tempTeamInfo)
            {
                TipsUtils.showTipsByLanId("tips_msg57");
                return false;
            }
            let posDatas = tempTeamInfo.getPosData(true, false, true);
            if (posDatas.length == 0)
            {
                TipsUtils.showTipsByLanId("tips_msg57");
                return false;
            }

            FightSend.normalBegin(batType, id, param, tempTeamInfo.getZhenfaId(), posDatas, tempTeamInfo.getArtifactId(), autoresult, clientParams);

            return true;
        }

        //------------------------------------------多个战场管理----------------------------------------
        /**
         * 设置战斗倍率ID
         */
        public setActionSpeedId(value: number, isApplyAllBat: boolean = true)
        {
            this.actionSpeedId = value;
            this.actionSpeed = value;
            if (isApplyAllBat)
            {
                var keys = this._batInfoDic.getKeys();
                for (var index = 0; index < keys.length; index++)
                {
                    var battleType = keys[index];
                    let batPlaceMgr = this._batInfoDic.get(battleType);
                    batPlaceMgr.scene_Speed_Changed_Called(value);
                }
            }
        }
        /**
         * 获取战斗倍率ID(注意不是实际速率值)
         */
        public getActionSpeedId(): number
        {
            return this.actionSpeedId;
        }

        /**
         * 获取战斗倍率(实际倍速)
         */
        public getActionSpeed(): number
        {
            return this.actionSpeed;
        }

        /**
         * 获取战斗画面比例
         */
        public getActionScale(): number
        {
            return this.actionScale;
        }

        /**
         * 获取正在进行的战斗
         * */
        public getBatPlaceMgr(batType: Pb_God._emBattleType): BatPlaceMgr
        {
            let tempInfo = this._batInfoDic.get(batType);
            return tempInfo;
        }

        /**
        * 获取正在进行的战斗
        * */
        public getWatchBatPlaceMgr(): BatPlaceMgr
        {
            var batType: Pb_God._emBattleType = this.getWatchBattleType();
            let tempInfo = this._batInfoDic.get(batType)
            return tempInfo;
        }

        /**
         * 获取当前正观看的战斗类型
         */
        public getWatchBattleType(): Pb_God._emBattleType
        {
            return this.watchBatType;
        }

        /** 检查并打开当前正在进行的战斗(合并 getBatPlaceMgr的判断 与 watchingBattleView的执行) */
        public checkAndWatchingBattleView(batType: Pb_God._emBattleType): boolean
        {
            var results = this.getBatPlaceMgr(batType);
            if (results == null)
            {
                return false;
            }
            this.watchingBattleView(results.getBattleType());
            return true;
        }

        /**
         * 根据管理器显示战斗层
         * @param targetBatType -1表示打开主城，关闭查看的战斗
         * @param noBatToSceneStatue 控制主城(0)、挂机场景(1)的显示，(-1)表示都不显示
         */
        public watchingBattleView(targetBatType: Pb_God._emBattleType, noBatToSceneStatue = 0, closeAllPanel: boolean = true): boolean
        {

            //隐藏其他战斗
            let oldWatchType = this.watchBatType;
            this.watchBatType = -1;
            var keys = this._batInfoDic.getKeys();
            for (var index = 0; index < keys.length; index++)
            {
                var battleType = keys[index];
                let batPlaceMgr = this._batInfoDic.get(battleType);
                let isWatching = batPlaceMgr.getBattleType() == targetBatType;
                if (isWatching)
                {
                    this.watchBatType = targetBatType;
                }
                else
                {
                    batPlaceMgr.setIsWatching(false);
                }
            }

            //清空特效，以及清空使用战斗内存
            if (oldWatchType != this.watchBatType)
            {

                // EffectMgr.Inst.reset();
                ResMgr.Inst.clearAutoReleaseRes();

                //显示当前战场
                if (this.watchBatType >= 0)
                {
                    let batPlaceMgr = this.getBatPlaceMgr(this.watchBatType);
                    batPlaceMgr.setIsWatching(true);
                }
            }

            //UI队列控制
            if (oldWatchType == -1 && this.watchBatType > 0)
            {
                UIManager.Inst.closeByName(PanelNotify.Open_EmBattle);
                UIManager.Inst.closeByName(PanelNotify.Open_GM);
                if (closeAllPanel)
                {
                    UIManager.Inst.visibleCurrentList(false);
                }
                if (this.watchBatType == Pb_God._emBattleType.BattleType_Hook)
                {
                    SoundMgr.Inst().playMusicByType(Pro.ScenceSoundType.FIGHT);
                }
                else if (this.watchBatType == Pb_God._emBattleType.BattleType_Tower ||
                    this.watchBatType == Pb_God._emBattleType.BattleType_Tower2)
                {
                    SoundMgr.Inst().playMusicByType(Pro.ScenceSoundType.FIGHT2);
                }
                else if (this.watchBatType == Pb_God._emBattleType.BattleType_Challenge)
                {
                    SoundMgr.Inst().playMusicByType(Pro.ScenceSoundType.FIGHT3);
                }
                else
                {
                    SoundMgr.Inst().playMusicByType(Pro.ScenceSoundType.FIGHT);
                }
            }
            else
            {
                if (closeAllPanel) { UIManager.Inst.closeCurrentList(); }
                SoundMgr.Inst().playMusicByType(Pro.ScenceSoundType.CITY);
            }

            //无尽试炼buff选择判断
            if (this.watchBatType == Pb_God._emBattleType.BattleType_Endless)
            {
                this.Train_EndlessBuffGroup();
            }

            //跳转到场景
            let mainState = noBatToSceneStatue;
            if (targetBatType >= 0)
            {
                mainState = targetBatType == Pb_God._emBattleType.BattleType_Hook ? 1 : -1;
            }
            EventMgr.trigger(EventNotify.Zhucheng_Hook_Visible_Changed, mainState);
            return this.watchBatType >= 0;
        }

        /**
         * 关闭播放的战斗
         */
        private exitWatchingBattleView(batPlaceMgr: BatPlaceMgr)
        {
            this.releaseBattlePlace(batPlaceMgr);
        }

        releaseBattlePlace(batPlaceMgr: BatPlaceMgr)
        {
            // //当前战斗类型
            let tmpBattleType = batPlaceMgr.getBattleType();
            // //移除战斗管理器
            this._batInfoDic.remove(tmpBattleType);
            batPlaceMgr.stopLogic();
            EventMgr.trigger(EventNotify.Battle_RecoverPlace, batPlaceMgr);
            //回收战斗数据
            batPlaceMgr.setBattleInfo(null);
            this._battlePlacPool.releaseItem(batPlaceMgr);
        }

        /**
         * 回收所有战斗
         */
        public exitAllBattle()
        {
            var keys = this._batInfoDic.getKeys();
            for (var index = 0; index < keys.length; index++)
            {
                var battleType = keys[index];
                let batPlaceMgr = this._batInfoDic.get(battleType);
                this.releaseBattlePlace(batPlaceMgr);
            }
            this._batInfoDic.clear();
            //回收资源
            ResMgr.Inst.clearAutoReleaseRes();
        }

        //------------------------------------------战斗流程----------------------------------------
        /**
         * 初始化战场
         * @param hideState 隐藏战斗方式 0-不隐藏，直接显示， 1- 隐藏进入后台播放，可切换打开  2-进入战斗，但不清理当前显示的UI
         * */
        public enterBat(pbFightBase: Pb_God.PBFightBase, isVedio: boolean, hideState: number = 0)
        {

            this.lastFightData = pbFightBase;
            //同类型的正在进行中
            if (this.getBatPlaceMgr(pbFightBase.battletype))
            {
                TipsUtils.showTipsByLanId("tips_msg66", cfg.BattleTypeCfgData.getNameByAttrType(pbFightBase.battletype))
                logE("battle type repeat!");
                return;
            }
            //创建战斗管理层
            let batPlaceMgr: BatPlaceMgr = this._battlePlacPool.create() as BatPlaceMgr;
            batPlaceMgr.resetFinishStageTimes();
            batPlaceMgr.setBattleInfo(pbFightBase, isVedio);

            //加入到战场管理器中
            this._batInfoDic.put(batPlaceMgr.getBattleType(), batPlaceMgr);

            let isWatchBat = hideState != 1;
            if (hideState == 1)
            {
                if (pbFightBase.battletype == Pb_God._emBattleType.BattleType_Hook)
                {
                    EventMgr.trigger(EventNotify.Show_HookBtn_Pop, pbFightBase)
                    TipsUtils.showTipsByLanId("hook_msg23", pbFightBase.id);
                }
                else if (pbFightBase.battletype == Pb_God._emBattleType.BattleType_Tower)
                {
                    TipsUtils.showTipsByLanId("hook_msg24", pbFightBase.id);
                }
                else if (pbFightBase.battletype == Pb_God._emBattleType.BattleType_Tower2)
                {
                    TipsUtils.showTipsByLanId("hook_msg25", pbFightBase.id - 20000);
                }
            } //已进入
            //观看战斗
            if (isWatchBat)
            {
                batPlaceMgr.enterMapView(null);
                this.watchingBattleView(batPlaceMgr.getBattleType(), 0, hideState == 0);
            }
            else
            {
                batPlaceMgr.setIsWatching(false);
            }

            //开启战场
            batPlaceMgr.startBattle();

            //战斗状态切换
            EventMgr.trigger(EventNotify.Battle_Statue_Refresh);

            //挂机打boss
            if (isWatchBat && batPlaceMgr.getBattleType() == Pb_God._emBattleType.BattleType_Hook)
            {
                EventMgr.trigger(EventNotify.Fight_Hook_Changed);
            }
        }

        /**
         * 直接退出战场
         * @param batType 战斗类型
         * @param isPlayerExit false表示正常战斗结算，true表示直接退出战场
         * @param useSerResult 是否用服务器计算的结果
         */
        public exitBat(batType: Pb_God._emBattleType, isPlayerExit: boolean = true, sendServer: boolean = true)
        {
            let batPlaceMgr = this.getBatPlaceMgr(batType);
            if (batPlaceMgr != null)
            {
                batPlaceMgr.endBattle(isPlayerExit, sendServer);
            }
        }

        /**
         * 战斗结束(点击了领奖)
         * */
        public finishBat(tempInfo: BatPlaceMgr)
        {

            SoundMgr.Inst().playMusicByType(Pro.ScenceSoundType.CITY);
            //当前战斗类型
            let tmpBattleType = tempInfo.getBattleType();
            let tmpBattleIsVedio = tempInfo.getBattleIsVideo();

            //挂机打boss
            if (tmpBattleType == Pb_God._emBattleType.BattleType_Hook)
            {
                EventMgr.trigger(EventNotify.Fight_Hook_Changed);
            }

            //关闭战斗管理器
            this.exitWatchingBattleView(tempInfo);

            //战斗状态切换
            EventMgr.trigger(EventNotify.Battle_Statue_Refresh);

            //最后正在观看本次战斗，可以在领奖之后直接跳转到对应功能界面
            if (this.watchBatType == tmpBattleType)
            {
                this.watchBatType = -1;

                //挂机战
                EventMgr.trigger(EventNotify.Zhucheng_Hook_Visible_Changed, FunInfo.SelectIndex == 0 ? 0 : 1);

                //显示触发的战场UI
                UIManager.Inst.visibleCurrentList(true);

                //录像中
                if (tmpBattleIsVedio)
                {
                    return;
                }

                //爬塔
                if (tmpBattleType == Pb_God._emBattleType.BattleType_Tower)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StarTowerMain));
                    UIManager.Inst.closeByName(PanelNotify.Open_StarTowerFight);
                }                //爬塔
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Tower2)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StarTowerMainAdv));
                    UIManager.Inst.closeByName(PanelNotify.Open_StarTowerFight);
                }//无尽试炼
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Endless)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EndlessTowerMain));
                }//竞技场
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Challenge)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Challenge));
                }//日常副本
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Copymap)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FightDaily));
                }//远征
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Expedition)
                {
                    if (ExpeditionDataMgr.getCurtype() > 0)
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionMain));
                    }
                    UIManager.Inst.closeByName(PanelNotify.Open_ExpeditionFight);
                }//星河神殿
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Temple)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Temple));
                }//神界冒险
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Risk)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskMain));
                }//段位赛
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Dan)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DanMain));
                }//天梯赛
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Ladder)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LadderMain));
                }//公会副本
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_FactionCopymap)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionBoss));
                }//公会战
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_FactionWar)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWar));
                }//元素战
                else if (tmpBattleType == Pb_God._emBattleType.BattleType_Element)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Element));
                }
            }
        }

        //-----------------------------------------Event---------------------------------------
        private listensEvents(): Array<any>
        {
            return [
                CmdEvent.Train_EndlessBuffGroup, this, this.Train_EndlessBuffGroup,
                CmdEvent.Train_EndlessBuff, this, this.Train_EndlessBuff
            ];
        }


        public set autoEndlessTower(value: number)
        {
            if (value == this._autoEndlessTower)
            { return; }
            this._autoEndlessTower = value;
            GameLaunch.saveClientData();
            this.initAutoEndlessTowerLoop();
            EventMgr.trigger(EventNotify.Endless_Auto_State_Change);
        }

        /**
         * 开始倒计时
         */
        public initAutoEndlessTowerLoop()
        {
            Laya.timer.clear(this, this.loopAutoEndlessTower);
            if (this._autoEndlessTower)
            {
                this._endlessTime = this._endlessMaxCD;
                Laya.timer.loop(1000, this, this.loopAutoEndlessTower)
                this.loopAutoEndlessTower();
            }
        }

        /**
         * 倒计时处理函数
         */
        private loopAutoEndlessTower()
        {
            this._endlessTime--;
            if (this._endlessTime <= 0)
            {
                //显示buff列表
                let tmpBffIDList = cfg.TrainEndlestBuffCfgData.getBuffIDAryById(TrainDataMgr.getEndlessBuffgroup());
                if (!tmpBffIDList)
                { return; }
                let index = Global.getRandomNum(0, tmpBffIDList.length);
                let tmpSkillID = tmpBffIDList[index].value1;
                if (tmpSkillID)
                {
                    TrainSend.endlessBuff(tmpSkillID);
                }
                Laya.timer.clear(this, this.loopAutoEndlessTower);
            }
            else
            {
                EventMgr.trigger(EventNotify.Endless_Auto_CD, this._endlessTime);
            }
        }

        /**
         * 自动冠军之路倒计时
         */
        public get endlessTime()
        {
            return this._endlessTime;
        }

        /**
         * 自动冠军之路
         */
        public get autoEndlessTower()
        {
            return this._autoEndlessTower;
        }

        /** 无尽试炼提示选择buff */
        private Train_EndlessBuffGroup()
        {
            if (this.getWatchBattleType() == Pb_God._emBattleType.BattleType_Endless && TrainDataMgr.getEndlessBuffgroup() > 0)
            {
                if (!this._autoEndlessTower || this.watchBatType == Pb_God._emBattleType.BattleType_Endless)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EndlessTowerBuff));
                }

                if (this._autoEndlessTower)
                {
                    this.initAutoEndlessTowerLoop();
                }
            }
        }

        /** 无尽试炼确认选择buff */
        private Train_EndlessBuff()
        {
            let tmpBattleInfo = this.getBatPlaceMgr(Pb_God._emBattleType.BattleType_Endless);
            if (tmpBattleInfo != null)
            {
                //本次选择buff的战斗轮数
                tmpBattleInfo.setEndBuffStageTimes(tmpBattleInfo.getFinishStageTimes());

                //第一次选buff
                if (tmpBattleInfo.getFinishStageTimes() == 0)
                {
                    let tempInfo = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Endless);
                    FightSend.normalBegin(Pb_God._emBattleType.BattleType_Endless, tmpBattleInfo.getBattleID(), 0, tempInfo.getZhenfaId(), tempInfo.getPosData(), tempInfo.getArtifactId(), false, "");

                }//还有下一关则继续，没有了就退出
                else if (tmpBattleInfo.getBattleID() < cfg.TrainEndlessCfgData.getMaxStage())
                {
                    SkelAniInit.recyleSpine();
                    FightSend.endlessContinue(Pb_God._emBattleType.BattleType_Endless, tmpBattleInfo.getBattleID() + 1);
                    BattleMgr.Inst.autoEndlessTower && TipsUtils.showTipsByLanId("ui_EndlessTower_auto_tips1", tmpBattleInfo.getBattleID() + 1);
                }
                else
                {
                    TipsUtils.showTipsByLanId("hook_msg13");
                }
            }
        }

        /**是否跳过大招 */
        public set skinSkill2(value: number)
        {
            //冠军赛特别处理
            if (this.watchBatType == Pb_God._emBattleType.BattleType_Champion)
            {
                if (this._skinSkillChampion != value)
                {
                    this._skinSkillChampion = value;
                    EventMgr.trigger(EventNotify.Battle_Skin_Skill2);
                }
                return;
            }
            if (value == this._skinSkill2)
            { return; }
            this._skinSkill2 = value;
            GameLaunch.saveClientData();
            EventMgr.trigger(EventNotify.Battle_Skin_Skill2);

        }
        /**是否跳过大招 */
        public get skinSkill2(): number
        {
            //冠军赛特别处理
            if (this.watchBatType == Pb_God._emBattleType.BattleType_Champion)
            {
                return this._skinSkillChampion;
            }
            return this._skinSkill2;
        }


    }
}
