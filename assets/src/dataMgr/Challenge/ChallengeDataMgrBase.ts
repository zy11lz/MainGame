
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
    export class ChallengeDataMgrBase
    {

        /**自动跳过战斗 */
        public autoSkip:boolean = true;

        /**进入次数*/
        protected _dayEnterCount: number = 0;
        /**周进入次数*/
        protected _weekEnterCount: number = 0;

        /** 自己排名 */
        private _myOrder: number = 50000;
        /** 我的当前赛季积分 */
        private _myScore: number = 1000;
        /** 当前挑战目标 */
        public targetList: Pb_God.PBChallengeObject[];
        /** 周宝箱领取情况 */
        protected _weekPrizeGetList: number[] = [];

        /** 已经点赞次数 */
        protected _likeNum = 0;
        /** 已经膜拜过的玩家 */
        protected _likePlayerMap = new ds.StringMap<number>();
        /** 红点初始化 */
        protected initRedDot:boolean = false;

        /** 记录最后一次打开竞技排行时，排行榜的玩家数量（排除自己） */
        private _rankOtherCount = 999;

        constructor()
        {

        }

        /** 初始化 */
        public init(data: Pb_God.PBPlayerChallenge)
        {
            this._dayEnterCount = data.dayentercount;
            this._weekEnterCount = data.weekentercount;
            this._weekPrizeGetList = data.weekprize;
            this._likeNum = data.linenum;

            this._likePlayerMap = Global.listToStringMap(data.likeplayers);

            this.targetList = null;

            this.initRedDotModel();
        }

        /** 隔日重置数据 */
        public resetNewDay(): void
        {
            this._likePlayerMap.clear();
            this._dayEnterCount = 0;
            this._likeNum = 0;
            this.reddotModel.refresh(true);
        }
        /** 隔周重置数据 */
        public resetNewServerWeek(): void
        {
            this._weekEnterCount = 0;
            this._myScore = cfg.ChallengeConstInfoCfgData.getFirstInfo().initScore;
            this._weekPrizeGetList = [];
        }

        private _seasonOverTime: number = 0;
        /** 获取当前赛季结束时间(同时也是下一个赛季开始时间， 单位秒) */
        public getSeasonOverTime(): number
        {
            let currTimer = TimeController.currTimer / 1000;
            if (this._seasonOverTime >= currTimer) return this._seasonOverTime;

            let startServerTime = TimeController.worldCreateZeroTime / 1000; //开服时间
            let period: number = cfg.ChallengeConstInfoCfgData.getFirstInfo().seasonDays * 24 * 3600; //周期
            this._seasonOverTime = currTimer + period - Math.floor(currTimer - startServerTime) % period;
            return this._seasonOverTime;
        }

        protected setMyOrder(value: number): void
        {
            if (this._myOrder != value)
            {
                this._myOrder = value;
                EventMgr.trigger(EventNotify.Challenge_Order_Change, value);
            }
        }
        public getMyOrder(): number
        {
            return this._myOrder;
        }

        protected setMyScore(value: number): void
        {
            if (this._myScore != value)
            {
                this._myScore = value;
                EventMgr.trigger(EventNotify.Challenge_Score_Change, value);
            }
        }
        public getMyScore(): number
        {
            return this._myScore;
        }

        /** 更新进入次数 */
        protected resetEnterCount(dayCount: number, weekCount: number)
        {
            if (dayCount == this._dayEnterCount && weekCount == this._weekEnterCount) return;
            this._dayEnterCount = dayCount;
            this._weekEnterCount = weekCount;
            this.reddotModel.refreshChild("challenge");
            EventMgr.trigger(EventNotify.Challenge_EnterCount_Change);
        }

        /**
         *  当天进入次数
         */
        public getDayEntercount(): number
        {
            return this._dayEnterCount;
        }

        /** 周进入次数 */
        public getWeekEnterCount(): number
        {
            return this._weekEnterCount;
        }

        /** 周宝箱领取情况 */
        public isGetWeekPrize(prizeId): boolean
        {
            return this._weekPrizeGetList.indexOf(prizeId) >= 0;
        }

        /** 判断玩家是否已经点赞过 */
        public checkPlayerLike(playerId: number): boolean
        {
            return !!this._likePlayerMap.get(playerId);
        }
        /** 判断点赞次数是否达到上限 */
        public isLikeMax(): boolean
        {
            return this._likeNum >= 10;
        }

        /** 还有免费次数 */
        public hasFree(): boolean
        {
            return cfg.ChallengeConstInfoCfgData.getFirstInfo().dayFreeCount + PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_ChallengeBuyCount) > ChallengeDataMgr.getDayEntercount();
        }

        /** 是否达到直接跳过战斗的条件 */
        public canSkipBattle(): boolean
        {
            return this._weekEnterCount > cfg.ChallengeConstInfoCfgData.getFirstInfo().sweepNeedCount;
        }

        /** 设置最后一次打开排行榜时，排行榜的人数 */
        public setRankOtherCount(value: number): void
        {
            this._rankOtherCount = value;
            this.reddotModel.refreshChild("like");
        }


        ///////////////////// 红点 //////////////////////////
        public reddotModel: RedDotModel = new RedDotModel();
        private initRedDotModel(): void
        {
            if(!this.initRedDot)
            {
                this.reddotModel.cleanUp(true);
                //挑战红点
                let challengeChild = this.reddotModel.addChildModel("challenge");
                challengeChild.setSystemSwitchId(Pro.emSystemSwitchType.Challenge);
                challengeChild.setupCheckMethod(this, this.getChallengeRedDot);
                //排行点选红点
                let likeChild = this.reddotModel.addChildModel("like");
                likeChild.setSystemSwitchId(Pro.emSystemSwitchType.Challenge);
                likeChild.setupCheckMethod(this, () =>
                {
                    return !this.isLikeMax() && this._likeNum < this._rankOtherCount;
                });
            }
            this.initRedDot = true;
        }
        /** 挑战红点信息 */
        private getChallengeRedDot(): number
        {
            //有免费次数
            if (this.hasFree()) return 1;
            //有宝箱可以领
            for (let cfgData of cfg.ChallengeWeekPrizeCfgData.getAllList())
            {
                let isActive = cfgData.needFightCount <= this._weekEnterCount;
                let isGetReward = this.isGetWeekPrize(cfgData.prizeID);
                if (isActive && !isGetReward) return 1;
            }
            return 0;
        }

    }
}
