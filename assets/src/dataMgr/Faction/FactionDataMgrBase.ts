
/**
*
*
* 保存服务器的发送的数据
*
*  1.socket读取二进制数据----》
*  2.二进制数据转换为proto-------》
*  3.抛出协议事件 -------》
*  4.各个系统的dataMgr侦听事件，接收并保存服务器发过来的数据 ------》
*  5.dataMgr抛出数据整理好的CmdEvent事件  -------》
*  6.各个ui侦听CmdEvent事件，向各个系统的dataMgr提供的方法接口获取最新的数据，更新ui显示
*
*  ui不负责直接侦听服务器数据事件， 也不负责保存服务器数据，
*  由各个系统的dataMgr统一管理
*
*/

module Pro
{
    /** 公会战进度状态（前端根据公会战开启时间演算而来） */
    export enum E_FactionWarState
    {
        /** 未开启时： 仅显示战果宝箱按钮，以及黑色蒙板提示开启时间 */
        None,
        /** 匹配阶段： 除以上内容以外，还在中间显示对战列表按钮 */
        Ready,
        /** 开启中： 显示据点列表，以及顶部双方信息，所有功能按钮，和挑战次数显示 */
        Open,
        /** 挑战结束，结束倒计时：　显示据点列表，以及顶疗双方信息，和输赢结果显示，　挑战次数不显示，　可开始领宝箱 */
        Over,
    }

    export class FactionDataMgrBase
    {
        constructor()
        {
        }

        //公会列表
        protected _factionList: Array<Pb_God.PBFactionDisplay> = [];
        /** 已经申请过的公会列表 */
        protected _applyFactions = new ds.StringMap<number>();
        /** 申请加入本公会的其它玩家列表 */
        protected _factionApplyList: Array<Pb_God.PBFactionApplyData> = [];
        /** 当前是否有人申请加入公会（用于界面外处理红点） */
        protected _hasMemberApply: boolean = false;


        /**
        * 帮会数据
        */
        private _factionDisplay: Pb_God.PBFactionDisplay;
        public get factionDisplay(): Pb_God.PBFactionDisplay
        {
            return this._factionDisplay;
        }
        public set factionDisplay(value: Pb_God.PBFactionDisplay)
        {
            this._factionDisplay = value;
        }

        private _factionId: number = 0;
        protected _factioName: string = "";
        protected _factioLeaderName: string = "";
        /** 职位 */
        protected _jobType: Pb_God._emFactionJob;

        /** 加入公会是否需要验证 */
        public isAutoVerify: boolean = true;
        /** 加入公会所需要等级 */
        public joinNeedLevel: number;
        /** 当天发布招募的次数 */
        public issueRecruitCount: number = 0;

        /**下次允许重命名时间*/
        public nextrenametime: number;
        /**下次允许加入公会时间*/
        public nextjointime: number;
        /**下次允许招募时间*/
        public nextrecruittime: number;
        /** 下次副本集结时间时间*/
        public nextcopymapnotictime: number;


        /** 捐献类型_emFactionDonateType*/
        public donateType: Pb_God._emFactionDonateType;
        /** 捐献活跃奖励 */
        public donatePrize: ds.StringMap<number>;
        /** 当日捐献活跃度 */
        public donateliveness: number = 0;


        /** 活跃等级*/
        public livenessLevel: number;
        /** 活跃经验*/
        public livenessExp: number;
        /** 日活跃度*/
        public dailyLiveness: number;
        /** 周活跃度*/
        public weekLiveness: number;

        /** 公会技能*/
        protected skillLevelMap = new ds.StringMap<number>();
        /** 公会技能重置次数 */
        public skillResetCount: number;

        /** 副本购买次数*/
        public bossBuyCount: number;
        /** 副本使用免费次数*/
        public bossUseFreeCount: number;
        /** 副本使用购买次数*/
        public bossUseBuyCount: number;
        /** 当前buff等级 */
        public bossBuffLv: number = 0;
        /** 副本BUFF消失时间 */
        public bossBuffOverTime: number = 0;
        /** 当前副本上次挑战的伤害 */
        public bossLastHit: number = 0;
        /** 当前正在挑战的副本关卡信息 */
        public curBossInfo: Pb_God.PBFactionCopymapInfo;


        ///////////////////////// 公会战 //////////////////////////////////
        /** 当前公会战状态 */
        public warState: E_FactionWarState = 0;
        /** 本阶段的结束时间 */
        public warTargetTime: number = 0;
        /** 剩余次数 */
        public warUseCount: number = 0;
        /** 当前Buff等级 */
        public warBuffLv: number = 0;
        /** 当前公会战入围状态 */
        public warIsFinalist: boolean = false;
        /**对战双方信息*/
        public warSelfInfo: Pb_God.PBFactionWarDisplay;
        public warEnemyInfo: Pb_God.PBFactionWarDisplay;
        ///////////////////////// 公会战end //////////////////////////////////

        /** 红点模型 */
        public readonly reddotModel: RedDotModel = new RedDotModel();

        public init(factionId: number, factioName: string, faction: Pb_God.PBPlayerFaction): void
        {
            this.setFactionId(factionId);
            this._factioName = factioName;
            this.factionDisplay = null;
            this.donateliveness = 0;
            // this._factioLeaderName = factioLeaderName;
            if (faction)
            {
                this.donateType = faction.donatetype;
                this.livenessExp = faction.livenessexp;
                this.livenessLevel = faction.livenesslevel;
                this.dailyLiveness = faction.dailyliveness;
                this.weekLiveness = faction.weekliveness;
                this.skillResetCount = faction.skillresetcount;
                this.bossBuyCount = faction.copymapbuycount;
                this.bossUseBuyCount = faction.copymapusebuycount;
                this.bossUseFreeCount = faction.copymapusefreecount;
                this.warUseCount = faction.factionwarcount;

                this.nextrenametime = faction.nextrenametime;
                this.nextjointime = faction.nextjointime;

                this.bossLastHit = 0;

                this.donatePrize = Global.listToStringMap(faction.donateprize);
                this.skillLevelMap.clear();
                for (var element of faction.skill)
                {
                    this.skillLevelMap.put(element.jobtype, element.level);
                }
            }
            //初始化红点模型数据
            this.initRedDotModel();
        }

        /** 隔日重置数据 */
        public resetNewDay(): void
        {
            if (!this.isHaveFaction()) { return; }
            this.donateType = 0;
            this.dailyLiveness = 0;
            // this.weekLiveness = faction.weekliveness;
            this.bossBuyCount = 0;
            this.bossUseBuyCount = 0;
            this.bossUseFreeCount = 0;
            this.warUseCount = 0;
            this.bossLastHit = 0;
            this.donateliveness = 0;
            this.donatePrize.clear();

            //红点
            this.reddotModel.refreshChild("factionboss");
            this.reddotModel.refreshChild("donate");
        }

        protected setFactionId(id: number): void
        {
            if (this._factionId == id)
            {
                return;
            }
            this._factionId = id;
            this.reddotModel.setOpenState(id != 0);
            if (id == 0)
            { //退出公会时，清理一次数据
                this.donateliveness = 0;
                this.factionDisplay = null;
            }
            this._applyFactions.clear(); //公会有变化时，将申请过的列表清理
            EventMgr.trigger(EventNotify.Faction_Change);
        }
        /** 获取当前公会id */
        public getFactionId(): number
        {
            return this._factionId;
        }

        /** 获取当前公会名 */
        public getFactionName(): string
        {
            if (!this.isHaveFaction()) { return Global.getLangStr("faction_none"); }
            if (this.factionDisplay) { return this.factionDisplay.base.name; }
            return this._factioName;
        }

        /** 获取当前公会会长名字 */
        public getFactionLeaderName(): string
        {
            if (this.factionDisplay) { return this.factionDisplay.leaderdisplay.playername; }
            return this._factioLeaderName;
        }

        /** 判断某公会是否已经申请过 */
        public isApplyFaction(factionId: number): boolean
        {
            return !!this._applyFactions.get(factionId);
        }

        /** 标记某公会已经申请过 */
        public setApplyFactionTag(factionId: number): void
        {
            this._applyFactions.put(factionId, factionId);
        }

        /**
         * 判断当前是否已有帮会
         */
        public isHaveFaction(): boolean
        {
            return this._factionId != 0;
        }

        /**
         * 获取当前可以加入的帮派列表
         */
        public getFactionList(): Array<Pb_God.PBFactionDisplay>
        {
            return this._factionList;
        }

        /** 当前是否为会长 */
        public isChairman(): boolean
        {
            return this._jobType == Pb_God._emFactionJob.FactionJob_Leader;
        }

        /** 当前是否为副会长 */
        public isVicePresident(): boolean
        {
            return this._jobType == Pb_God._emFactionJob.FactionJob_Deputy;
        }

        /** 是否为管理员（包括会长、副会长） */
        public isLeader(): boolean
        {
            if (this.isChairman()) { return true; }
            return this._jobType == Pb_God._emFactionJob.FactionJob_Deputy;
        }

        public getJobType(): number
        {
            return this._jobType;
        }


        public getFactionApplyList(): Array<Pb_God.PBFactionApplyData>
        {
            return this._factionApplyList;
        }

        /** 获取技能等级 */
        public getSkillLevel(jobtype: number): number
        {
            return this.skillLevelMap.get(jobtype) || 0;
        }

        /** 取得帮会技能所有职业技能中，最低等级值 */
        public getMinSkillLevel(): number
        {
            let min = 9999;
            //4个职业
            for (var i = 1; i <= 4; i++)
            {
                let el = this.skillLevelMap.get(i);
                if (!el) { return 0; }
                if (min > el) { min = el; }
            }
            return min;
        }

        /** 修改公会成员申请状态 */
        protected changeMemberApplyState(has: boolean): void
        {
            if (this._hasMemberApply != has)
            {
                this._hasMemberApply = has;
                this.reddotModel.refreshChild("apply");
            }
        }

        /** 今天是否挑战过帮会副本 */
        public getTodayAttackBoss(): boolean
        {
            return FactionDataMgr.bossLastHit > 0;
        }

        /** 公会副本剩余次数 */
        public getBossLeftCount(): number
        {
            let freeMaxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_CopymapFreeCount);
            return this.bossBuyCount + freeMaxCount - this.bossUseBuyCount - this.bossUseFreeCount;
        }

        ///////////////////////公会战///////////////////////////

        /** 根据当前时间，解析当前公会战的进度状态 */
        public parseCurFactionWarState(): void
        {
            let curTime = TimeController.currTimer + 2000;
            let timeInfo: cfg.StDateTimeInfo;
            this.warState = E_FactionWarState.None;
            //判断匹配阶段
            timeInfo = cfg.FactionWarConstCfgData.getMatchTimeInfo();
            if (this.__checkWarStateByTimeInfo(curTime, timeInfo, E_FactionWarState.Ready)) { return; }
            //开启阶段
            timeInfo = cfg.FactionWarConstCfgData.getOpenTimeInfo();
            if (this.__checkWarStateByTimeInfo(curTime, timeInfo, E_FactionWarState.Open)) { return; }
            //结算阶段
            timeInfo = cfg.FactionWarConstCfgData.getPrizeTimeInfo();
            if (this.__checkWarStateByTimeInfo(curTime, timeInfo, E_FactionWarState.Over)) { return; }

            this.reddotModel.refreshChild("factionwar");
        }

        private __checkWarStateByTimeInfo(curTime: number, timeInfo: cfg.StDateTimeInfo, state: number): boolean
        {
            if (!timeInfo.isInOpenTime(curTime)) { return false; }
            this.warState = state;
            this.warTargetTime = timeInfo.getEndTime(curTime);
            this.reddotModel.refreshChild("factionwar");
            return true;
        }

        ///////////////////////公会战end///////////////////////////


        ////////////////////////// 红点 /////////////////////////////
        private initRedDotModel(): void
        {
            this.reddotModel.cleanUp(true);
            this.reddotModel.setOpenState(this.isHaveFaction());
            //公会活跃
            let reddot = this.reddotModel.addChildModel("liveness");
            reddot.addGlobalEventRefresh(CmdEvent.Faction_SynLiveness);
            reddot.setupCheckMethod(this, () =>
            {
                let needExp = cfg.FactionLivenessCfgData.getExpByLevel(FactionDataMgr.livenessLevel);
                return needExp > 0 && needExp <= FactionDataMgr.livenessExp;
            });
            //公会战
            reddot = this.reddotModel.addChildModel("factionwar");
            reddot.setupCheckMethod(this, this.getWarReddot);
            //公会技能
            reddot = this.reddotModel.addChildModel("skill");
            this.initSkillReddot(reddot);
            //副本次数
            reddot = this.reddotModel.addChildModel("factionboss");
            reddot.setupCheckMethod(this, this.getBossLeftCount);
            reddot.addGlobalEventRefresh(CmdEvent.Faction_CopymapUpdateCount);
            //捐献
            reddot = this.reddotModel.addChildModel("donate");
            reddot.setupCheckMethod(this, this.getDonateReddot);
            reddot.addGlobalEventRefresh(CmdEvent.Faction_Donate);
            reddot.addGlobalEventRefresh(CmdEvent.Faction_DonatePrize);
            reddot.addGlobalEventRefresh(CmdEvent.Faction_SynDonateLiveness);
            //有人申请进公会
            reddot = this.reddotModel.addChildModel("apply");
            reddot.setupCheckMethod(this, this.getApplyReddot);
            reddot.addGlobalEventRefresh(EventNotify.Faction_JobTypeChange);

        }

        /** 成员申请红点 */
        private getApplyReddot(): boolean
        {
            if (!this.isLeader()) { return false; }
            return this._hasMemberApply;
        }


        /** 公会技能红点 */
        private initSkillReddot(reddotModel: RedDotModel): void
        {
            //公会技能下级还有四个分页，即4个子级红点
            for (var job = 1; job <= 4; job++)
            {
                let child = reddotModel.addChildModel(job);
                child.bindData = job;
                child.setupCheckMethod(this, this.getSkillReddot);
            }
        }
        private getSkillReddot(reddot: RedDotModel): number
        {
            let job: number = reddot.bindData;

            let skillLevel = FactionDataMgr.getSkillLevel(job);
            let cfgData = cfg.FactionSkillUpgradeCfgData.getInfo(skillLevel + 1);  //下一级数据
            if (!cfgData)
            { //满级了
                reddot.setPlayerItemsListener(null);
                return 0;
            }
            //判断前置等级
            if (cfgData.needAllSkillLevel > FactionDataMgr.getMinSkillLevel())
            {
                return 0;
            }
            //判断道具是否足够
            let needItems = cfg.FactionSkillUpgradeCfgData.getNeedItemAryByLevel(skillLevel + 1);
            reddot.setPlayerItemInfosListener(needItems);
            if (!Global.isFullAllRes(needItems, false)) { return 0; }

            return 1;
        }

        /** 公会战红点 */
        private getWarReddot(): number
        {
            if (!this.warIsFinalist) { return 0; }
            if (this.warState != E_FactionWarState.Open) { return 0; }
            let fightcount = cfg.FactionWarConstCfgData.getFirstInfo().dayFightCount
            if (fightcount - this.warUseCount <= 0) { return 0; }
            return 1;
        }

        /** 捐献红点 */
        private getDonateReddot(): number
        {
            //还没捐过
            if (FactionDataMgr.donateType == 0) { return 1; }
            //有捐献活跃奖励可领
            let boxProgressValues = cfg.FactionDonatePrizeCfgData.getAllList();
            let boxCount = boxProgressValues.length;
            for (var i = 0; i < boxCount; i++)
            {
                let cfgData = boxProgressValues[i];
                let needValue = cfgData.needDonate;
                let isActive = needValue <= FactionDataMgr.donateliveness;
                let isGetReward = !!FactionDataMgr.donatePrize.get(cfgData.iD);
                if (isActive && !isGetReward) { return 1; }
            }
            return 0;
        }

        getFactionLevel(): number
        {
            if (this._factionDisplay)
            {
                return this._factionDisplay.base.level;
            }
            return 0;
        }

        getPeoplemax(): number
        {

            if (this._factionDisplay)
            {
                return this._factionDisplay.peoplemax;
            }
            return 0;
        }

    }
}
