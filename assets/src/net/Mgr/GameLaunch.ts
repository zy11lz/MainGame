module Pro
{

    /**
     * 游戏功能模块的数据启动类。
     * 该类不保存数据，不对外提供数据该问接口， 只处理模块初始化的数据接收与分发。
     * @author jason.xu
     */
    export class GameLaunch
    {

        constructor()
        {
        }

        public static loadData(gameInfo: any, loginInfo: Pb_God.PBLoginAck): void
        {
            let PlayerBase = gameInfo[Cmd.S2C_Player_BaseInfo.cmdName] as Pb_God.PBPlayerBase;
            let PlayerSystem = gameInfo[Cmd.S2C_Player_SystemInfo.cmdName] as Pb_God.PBPlayerSystem;
            let PBPlayerSystemExt = gameInfo[Cmd.S2C_Player_SystemInfo2.cmdName] as Pb_God.PBPlayerSystemExt;
            let PlayerBag = gameInfo[Cmd.S2C_Player_BagInfo.cmdName] as Pb_God.PBPlayerBag;
            let ClientData = gameInfo[Cmd.S2C_Player_ClientInfo.cmdName] as Pb_God.PBClientData;
            let PlayerFriend = gameInfo[Cmd.S2C_Player_Friend.cmdName] as Pb_God.PBPlayerFriend;
            let PlayerMail = gameInfo[Cmd.S2C_Player_Mail.cmdName] as Pb_God.PBPlayerMail;
            // let PlayerFaction = gameInfo[Cmd.S2C_Player_Faction.cmdName] as Pb_God.PBPlayerFaction;
            let PlayerPet = gameInfo[Cmd.S2C_Player_PetInfo.cmdName] as Pb_God.PBPlayerPet;
            let PlayerPetExt2 = gameInfo[Cmd.S2C_Player_PetInfo2.cmdName] as Pb_God.PBPlayerPetExt;
            let PlayerPetExt3 = gameInfo[Cmd.S2C_Player_PetInfo3.cmdName] as Pb_God.PBPlayerPetExt;
            let PlayerBag_2 = gameInfo[Cmd.S2C_Player_BagInfo2.cmdName] as Pb_God.PBPlayerBag;

            //数据管理
            TimeController.ins.setup(loginInfo);
            GameLaunch.initCfg();
            PlayerDataMgr.initPlayerInfo(PlayerBase, loginInfo.account, PlayerSystem.systemswitch, loginInfo.worldCreateTime as Long);
            TodayRepeatOpMgr.Inst.init();  //在拿到玩家信息与服务器时间后， 初始化玩家今日操作的记录。
            ItemDataMgr.init(PlayerBag, PlayerBag_2);
            PlatformDataMgr.init(PlayerSystem.platform);
            PrivilegeDataMgr.init(PlayerSystem.privilege);
            CommonDataMgr.init(PlayerSystem.common);
            WealDataMgr.init(PlayerSystem.weal);
            HeavenDungeonDataMgr.init(PlayerSystem.heaven);
            ShopDataMgr.init(PlayerSystem.shop); //shop放在活动之前，因为activity初始化红点时，有用到商城数据
            ActivityDataMgr.init(PlayerSystem.activity);
            ShapeDataMgr.init(PlayerSystem.shape, PlayerBase.playerdisplay);
            TreasureDataMgr.init(PlayerSystem.treasure);
            SuitEquipDataMgr.init(PlayerSystem.godsuit);
            HookDataMgr.init(PlayerSystem.hook);
            BattleMgr.Inst.init();
            PetDataMgr.init(PlayerPet, PlayerPetExt2, PlayerPetExt3);
            TaskDataMgr.init(PlayerSystem.task);
            AchieveDataMgr.init(PlayerSystem.achieve);
            ChallengeDataMgr.init(PlayerSystem.challenge);
            ChampionDataMgr.init();
            FactionDataMgr.init(PlayerBase.factionid, PlayerBase.factionname, PlayerSystem.faction);
            FriendDataMgr.init(PlayerFriend);
            MailDataMgr.init(PlayerMail.mail);
            TeamDataMgr.init();
            TempleDataMgr.init(PlayerSystem.temple);
            SailDataMgr.init(PlayerSystem.sail);
            CallDataMgr.init(PlayerSystem.call);
            EmbattleDataMgr.init(PlayerSystem.zhenfa);
            ArtifactDataMgr.init(PlayerSystem.artifact);
            WeekChampionDataMgr.init(PlayerSystem.weekchampion);

            TrainDataMgr.init(PBPlayerSystemExt.train);
            ExpeditionDataMgr.init(PlayerSystem.expedition);
            ElementDataMgr.init(PlayerSystem.element);
            RiskDataMgr.init(PlayerSystem.risk);
            DanDataMgr.initData(PlayerSystem.dan);
            LadderDataMgr.initData(PlayerSystem.ladder);
            CopymapDataMgr.init(PlayerSystem.copymap);
            HolyDataMgr.init(PlayerSystem.holy);
            VideoDataMgr.init(PlayerSystem.video);
            TeamCampaignDataMgr.init(PlayerSystem.teamCampaign);
            DragonBallDataMgr.init(PlayerSystem.dragonball);
            ConvenantDataMgr.init(PlayerSystem.convenant);
            LotteryDataMgr.init(PlayerSystem.lottery);
            IllustrationDataMgr.init(PlayerSystem.illustration);
            RedEnvelopeDataMgr.init(PlayerSystem.redEnvelope);
            DefendDataMgr.init(PlayerSystem.defend);
            IncubateEggDataMgr.init(PlayerSystem.incubateegg);
            GuessDataMgr.init(PlayerSystem.guess);
            CrossChallengeDataMgr.init(PBPlayerSystemExt.crosschallenge);
            ResonanceDataMgr.init(PlayerSystem.resonance);
            ActivityBossDataMgr.init(PlayerSystem.activityboss);
            //客户端自定义储存数据
            this.parseClientData(ClientData);

            // //记录一下这个服务器已经登陆过了
            // if (ServerListDataMgr.loginHostRecords.indexOf(PlayerBase.playerdisplay.logicworldid) < 0)
            // {
            //     ServerListDataMgr.loginHostRecords.push(PlayerBase.playerdisplay.logicworldid);
            // }

            //记录服务器的世界id
            ServerListDataMgr.logicworldid = PlayerBase.playerdisplay.logicworldid | 0;

            //默认选服
            ThirdMgr.report37SDKData(GameDataType.SELECT_SERVER);

            // 选择服务器上报
            {
                let lastServerId: number = -1;
                let str = Laya.LocalStorage.getItem(EnumLocalStorageKey.LAST_SERVER_ID);
                if (str)
                {
                    lastServerId = parseInt(str);
                }
                let serverId: number = ServerListDataMgr.logicworldid;
                if (lastServerId != serverId)
                {
                    Laya.LocalStorage.setItem(EnumLocalStorageKey.LAST_SERVER_ID, String(serverId));
                    // 上报选择服务器事件

                    ThirdMgr.sdkSystem.trackSelectServer(serverId);
                }
            }

            //选服打点
            ThirdMgr.reportH5SDKData(UploadSceneValue.SELECT_SERVER); //3-选服上报
            //数据上报-创角
            if (ClientData.clientdata.length == 0)
            {
                ThirdMgr.report37SDKData(GameDataType.CREATE_ROLE);
                ThirdMgr.reportH5SDKData(UploadSceneValue.CREATE_ROLE);

            }
            else
            {
                // 上报角色登录

                let roleName: string = PlayerDataMgr.name;
                ThirdMgr.sdkSystem.trackRoleLogin(roleName);
            }

            //数据上报-进入游戏
            {
                ThirdMgr.report37SDKData(GameDataType.ENTER_GAME);
                ThirdMgr.reportH5SDKData(UploadSceneValue.LOGIN_SUCCESS);
            }
        }

        /** 记录前端日志到中心服数据库，便于查询或监控某些特定的问题 */
        public static PostClientLog(log: string): void
        {
            let logUrls: Array<string> = ServerHostData.getClientLogUrl();

            var server_id = parseInt(ServerListDataMgr.loginHostId) || 0;
            var crashReportInfo: CrashReportInfo = new CrashReportInfo();
            crashReportInfo.server_id = server_id;
            crashReportInfo.player_id = Pro.PlayerDataMgr.uid || 0;
            crashReportInfo.player_name = Pro.PlayerDataMgr.name;
            crashReportInfo.content = log;
            StatMemoryInfo.insntace.update();
            /** laya的内存统计 */
            if (Laya.Resource.cpuMemory)
            {
                crashReportInfo.cpuMemory = Laya.Resource.cpuMemory;
            }
            /** laya的gpumem统计 */
            if (Laya.Resource.gpuMemory)
            {
                crashReportInfo.gpuMemory = Laya.Resource.gpuMemory;
            }
            /**window.performance 内存统计， 有可能为0 */
            crashReportInfo.memUsed = StatMemoryInfo.insntace.used;
            /**window.performance 内存统计， 有可能为0 */
            crashReportInfo.memTotal = StatMemoryInfo.insntace.total;
            /**window.performance 内存统计， 有可能为0 */
            crashReportInfo.memMax = StatMemoryInfo.insntace.max;
            /**当前渲染的spine数量 */
            crashReportInfo.spineRender = spine.FlyRender.ins.getRenderCnt();
            /**当前spine,模板数量 */
            crashReportInfo.spineTempSize = spine.TempletMgr.instance.getTempleteCnt();
            crashReportInfo.client_ver = GlobalData.Version;
            var strData = Global.jsonToUrlParam(crashReportInfo, true);
            logI("logUrl:", logUrls, strData);
            logUrls.forEach(url =>
            {
                new Public.HttpManager.Http().setHeader(["Content-Type", "application/x-www-form-urlencoded"]).postRequest(url, this, GameLaunch.onRet, strData);
            });
        }
        private static onRet(status, content: String): void
        {
            logI(status, content);
        }

        /** 解析前端保存的数据 */
        private static parseClientData(clientData: Pb_God.PBClientData): void
        {
            //--解析自定义数据
            let tmpCustomAry = clientData.clientdata.split(";");
            let customData = {};
            tmpCustomAry.forEach(elment =>
            {
                let tmpStrAry = elment.split("|");
                let key = tmpStrAry.shift();
                customData[key] = tmpStrAry;
            });
            let __getData = function (key: string, index: number, defaultValue: number = 0): number
            {
                let data = customData[key];
                if (!data) { return defaultValue; }
                let ret = data[index];
                if (ret == null) { return defaultValue; }
                return parseInt(ret);
            }
            //是否激活首个5星英雄
            PetDataMgr.IsGuideFirstFiveStar = (__getData("IsGuideFirstFiveStar", 0) || PetDataMgr.IsGuideFirstFiveStar);
            //问卷调查进度
            PlayerDataMgr.questionIndex = __getData("questionIndex", 0);
            //通用的基础奖励
            CommonDataMgr.initPrizeReadyState(customData["commonPrizeReady"]);
            //举报次数
            PlayerDataMgr.todayComplainCount = __getData("todayComplainCount", 0);
            PlayerDataMgr.complainLastTime = __getData("complainLastTime", 0);
            //特权商城功能开启后，首次打开挂机界面时，提示快速挑战特权
            PlayerDataMgr.recordQuickFightPrivilge = __getData("recordQuickFightPrivilge", 0);
            //战斗速率
            BattleMgr.Inst.setActionSpeedId(__getData("battleSpeedAction", 0, 1));
            //是否引导过英雄升星
            FuncGuideMgr.Inst.IsGuideUpstar = __getData("IsGuideUpstar", 0);
            //是否引导过二倍加速
            FuncGuideMgr.Inst.IsGuideBattleSpeed = __getData("IsGuideBattleSpeed", 0);
            //是否经历过战败引导
            HookDataMgr.failGuideState = __getData("IsGuideFail", 0, 2);
            //是否自动挑战冠军之路
            BattleMgr.Inst.autoEndlessTower = __getData("autoEndlessTower", 0, 0);
            //是否自动挑战遗迹之谷
            TeamCampaignDataMgr.autoTeamCampaign = __getData("autoTeamCampaign", 0, 0);
            //是否自动挑战狩猎地带
            ExpeditionDataMgr.autoExpedition = __getData("autoExpedition", 0, 0);
            //是否跳过大招
            BattleMgr.Inst.skinSkill2 = __getData("skinSkill2", 0, 0);


            //新手引导
            // customData["newGuider"] = ["1", "801", "1"] //temp tag:jason
            let Guide_IsNew = !!__getData("newGuider", 0, 1);
            let Guide_InStep = __getData("newGuider", 1, GuideStep.Plot_1_1);
            let Guide_IsShowing = !!__getData("newGuider", 2, 1);

            //加上这一句 避免在断线重连时 闲置引导步数已经更新 但是nextStep时错乱的问题
            FuncGuideMgr.Inst.finishFuncGuide();

            if (Guide_IsNew && Guide_IsShowing)
            {
                //这里处理一下 关键步骤因为异常原因（或网络或闪退等）造成没保存的情况
                Guide_InStep = GuideMgr.Inst.getReallyStep(Guide_InStep);
            }


            let CustomDotStep = __getData("customDot", 0);

            //处理一下新账号点击登录
            if (Guide_IsNew && !CustomDotStep)
            {
                GuideMgr.Inst.customDotStep = 1;
                this.saveClientData();

                //点击按钮后需要上报
                CommonSend.guideLog(100);
            }
            GuideMgr.Inst.setGuideStatue(Guide_IsNew, Guide_IsShowing, Guide_InStep);
        }

        /** 保存前端保存的数据 */
        public static saveClientData()
        {
            let dataStr = "";
            //新手引导
            dataStr += "newGuider" + "|" + (GuideMgr.Inst.getGuideStatue(false, true) ? 1 : 0) + "|" + GuideMgr.Inst.getInStep() + "|" + (GuideMgr.Inst.getShowGuide() ? 1 : 0);
            //是否激活首个5星英雄
            dataStr += ";IsGuideFirstFiveStar|" + PetDataMgr.IsGuideFirstFiveStar;
            //是否引导过英雄升星
            dataStr += ";IsGuideUpstar|" + FuncGuideMgr.Inst.IsGuideUpstar;
            //是否引导过二倍加速
            dataStr += ";IsGuideBattleSpeed|" + FuncGuideMgr.Inst.IsGuideBattleSpeed;
            //特权商城功能开启后，首次打开挂机界面时，提示快速挑战特权
            dataStr += ";recordQuickFightPrivilge|" + PlayerDataMgr.recordQuickFightPrivilge;
            //玩家问卷调查答题进度
            dataStr += ";questionIndex|" + PlayerDataMgr.questionIndex;
            //战斗速率
            dataStr += ";battleSpeedAction|" + BattleMgr.Inst.getActionSpeedId();
            //通用简单奖励
            dataStr += ";commonPrizeReady|" + CommonDataMgr.getPrizeReadyString();
            //是否经过战报引导
            dataStr += ";IsGuideFail|" + HookDataMgr.failGuideState;
            //是否自动挑战冠军之路
            dataStr += ";autoEndlessTower|" + BattleMgr.Inst.autoEndlessTower;
            //是否自动挑战遗迹之谷
            dataStr += ";autoTeamCampaign|" + TeamCampaignDataMgr.autoTeamCampaign;
            //是否自动挑战狩猎地带
            dataStr += ";autoExpedition|" + ExpeditionDataMgr.autoExpedition;
            //是否跳过大招
            dataStr += ";skinSkill2|" + BattleMgr.Inst.skinSkill2;
            //增加自定义断点
            dataStr += ";customDot|" + GuideMgr.Inst.customDotStep;

            CommonSend.clientSave(0, dataStr);
        }


        /**配置表筛选 */
        private static initCfg()
        {
            this.formatTimeCfg();
            this.formatInvalidPetCfg();
        }

        /**
         * 处理一下配置表中跟开服时间有关的时效配置
          */
        private static formatTimeCfg()
        {
            let cfgs = [cfg.ActivityCfgData];

            for (let i = 0; i < cfgs.length; i++)
            {
                if (!cfgs[i]["oldArr"])
                {
                    cfgs[i]["oldArr"] = cfgs[i]["_dataArr"].concat();
                }
                let dataArr = cfgs[i]["oldArr"];

                let newArr = []
                for (let j = 0; j < dataArr.length; j++)
                {
                    let info = dataArr[j];
                    if (info["invalidTime"])
                    {
                        //存在失效时间
                        let date = new Date();
                        let year = Math.floor(info["invalidTime"] / 10000);
                        let month = Math.floor((info["invalidTime"] - year * 10000) / 100);
                        let day = info["invalidTime"] - year * 10000 - month * 100;
                        date.setFullYear(year, month - 1, day);
                        date.setHours(0, 0, 0, 0);
                        if (TimeController.worldCreateTime < date.getTime())
                        {
                            //开服早于失效时间 采用此配置
                            newArr.push(info);
                        }
                        else
                        {
                            //开服晚于失效时间 剔除此配置
                        }
                        continue;

                    }
                    if (info["validTime"])
                    {
                        let date = new Date();
                        let year = Math.floor(info["validTime"] / 10000);
                        let month = Math.floor((info["validTime"] - year * 10000) / 100);
                        let day = info["validTime"] - year * 10000 - month * 100;
                        date.setFullYear(year, month - 1, day);
                        date.setHours(0, 0, 0, 0);
                        if (TimeController.worldCreateTime < date.getTime())
                        {
                            //开服早于生效时间 剔除此配置
                        }
                        else
                        {
                            //开服晚于生效时间 采用此配置
                            newArr.push(info);
                        }
                        continue;
                    }
                    newArr.push(info);
                }
                cfgs[i].setup(newArr);
            }
        }

        /**
         * 处理一下配置表无效精灵
          */
        private static formatInvalidPetCfg()
        {
            let cfgs = [cfg.PetCfgData,
                        cfg.PetSkinCfgData,
                        cfg.PetUpStarCfgData,
                        cfg.PetEvolveCfgData,
                        cfg.PetHighstarRebornCfgData,
                        cfg.PetBookCfgData];

            for (let i = 0; i < cfgs.length; i++)
            {
                let dataArr = cfgs[i]["_dataArr"];
                let newArr = []
                for (let j = 0; j < dataArr.length; j++)
                {
                    let info = dataArr[j];
                    if (!info.invalid)
                    {
                       newArr.push(info);
                    }
                }
                cfgs[i].setup(newArr);
            }
        }
    }
}