
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
	export class CrossChallengeDataMgrBase
	{
		/** 当天挑战次数*/
		public count: number;
		/** 连胜次数*/
		public continuecount: number;
		/** 是否隐藏队伍*/
		public hideteam: boolean[];
		/** 今天点了赞的玩家，每日清理*/
		public likeplayer: number[];
		/** 今天领取了的宝箱，每日清理*/
		public curdailyprize: number[];
    	/** 红点初始化 */
    	protected initRedDot:boolean = false;
		/**open信息 */
		public openInfo: Pb_God.PBCrossChallengeOpenInfo;

		public result: boolean[];

		constructor()
		{

		}

		public clear()
		{
			this.openInfo = null;
		}

		public init(value: Pb_God.PBPlayerCrossChallenge)
		{
			if(!value)
				return;
			this.count = value.count;
			this.continuecount = value.continuecount;
			this.hideteam = value.hideteam;
			this.likeplayer = value.likeplayer;
			this.curdailyprize = value.curdailyprize;
			this.result = [];
			this.initRedDotModel();
		}

		public checkDailyCanGet(index: number)
		{
			return cfg.CrossChallengeDailyPrizeCfgData.getCountByIndex(index) <= this.count;
		}

		public checkDailyHaveGot(index: number)
		{
			return this.curdailyprize.indexOf(index) >= 0;
		}


		///////////////////// 红点 //////////////////////////
		public challengeReddotModel: RedDotModel = new RedDotModel();
		/** 红点 */
		private getRedDot(): boolean
		{
			let cfgs = cfg.CrossChallengeDailyPrizeCfgData.getAll();
			for (let i = 0; i < cfgs.length; i++)
			{
				let info = cfgs[i];
				if (this.checkDailyCanGet(info.index) && !this.checkDailyHaveGot(info.index))
				{
					return true;
				}
			}
			return false;
		}

		public honourRedModel: RedDotModel = new RedDotModel();
		private getHonourRedDot(): boolean
		{
			if (!this.openInfo)
				return false;
			return this.likeplayer.length < 1 && this.openInfo.horourinfo.length > 0;
		}

		public redDotModel: RedDotModel = new RedDotModel();
		private initRedDotModel()
		{
			if(!this.initRedDot)
			{
				this.honourRedModel.cleanUp(true);
				this.honourRedModel.setSystemSwitchId(Pro.emSystemSwitchType.AcrossChallenge);
				this.honourRedModel.setupCheckMethod(this, this.getHonourRedDot);

				this.challengeReddotModel.cleanUp(true);
				this.challengeReddotModel.setSystemSwitchId(Pro.emSystemSwitchType.AcrossChallenge);
				this.challengeReddotModel.setupCheckMethod(this, this.getRedDot);

				this.redDotModel.cleanUp(true);
				this.redDotModel.setSystemSwitchId(Pro.emSystemSwitchType.AcrossChallenge);
				this.redDotModel.addChildModel("crossChallenge", this.challengeReddotModel);
				this.redDotModel.addChildModel("crossHonour", this.honourRedModel);
			}
			this.initRedDot = true;
		}
	}
}
