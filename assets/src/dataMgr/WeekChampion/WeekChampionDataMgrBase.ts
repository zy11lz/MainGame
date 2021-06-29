
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
	export class WeekChampionDataMgrBase
	{
		constructor()
		{

		}

		///////////////////////// 代码整理分隔线 //////////////////////////////////
		/** 下一回合开始时间，当赛季未开启时，此值表示下次赛季开启时间，如果开启中，则表示每一个状态的切换时间(秒) */
		public nextOpenTime = 0;
		/** 当前状态的结束时间(秒) */
		public stateOverTime = 0;
		/** 当前状态 */
		public state: Pb_God._emChampionState = -1;
		/** 当前回合 */
		public round: Pb_God._emWeekChampionRound = 0;
		/** 玩家在当前赛程上是否有参与进来 */
		public isTakePartIn = false;
		/** 已经膜拜过的玩家 */
        protected _likePlayerMap = new ds.StringMap<number>();

		/** 红点模型 */
		public reddotModel: RedDotModel = new RedDotModel();

		public init(data: Pb_God.PBPlayerWeekChampion): void
		{
			if(data && data.likeplayers)this._likePlayerMap = Global.listToStringMap(data.likeplayers);
		}

		/** 隔日重置数据 */
		public resetNewDay(): void
		{
			//签到
			this._likePlayerMap.clear();
		}

		/** 竞猜币 */
		private _guessCoin = 0;
		public set guessCoin(value: number)
		{
			if (this._guessCoin == value) return;
			this._guessCoin = value;
			EventMgr.trigger(EventNotify.WeekChampion_GuessCoin_Change, value);
		}
		public get guessCoin(): number
		{
			return this._guessCoin;
		}

		public get isOpening(): boolean
		{
			return this.state == Pb_God._emChampionState._emChampionState_Fight || this.state == Pb_God._emChampionState._emChampionState_Guess || this.state == Pb_God._emChampionState._emChampionState_Ready;
		}

		/** 进入匹配阶段 */
		public get isMatching(): boolean
		{
			return this.state == Pb_God._emChampionState._emChampionState_Match;
		}

		// /** 当前是否正在开启中 */
		// public isOpening(): boolean {
		// 	//随排位赛的赛季周期一起，  1周为一个循环， 每个循环内会有n次开启。
		// 	//故开启时间分三个配置：  
		// 	//1、开启周期，表示一次循环。
		// 	//2、开启天数，表示在此周期内第几天开。
		// 	//3、匹配时间，表示开启的那一天内的具体时间
		// 	let currTimer = TimeController.currTimer;
		// 	let startServerTime = TimeController.worldCreateTime; //开服时间
		// 	let period: number = cfg.ChampionConstInfoCfgData.getFirstInfo().circle; //周期
		// 	let curDay = Math.ceil((currTimer - startServerTime) / 86400000) % period;
		// 	if (cfg.ChampionConstInfoCfgData.getOpenDays().indexOf(curDay) < 0)
		// 		return false;
		// 	let openTimeInfo = cfg.ChampionConstInfoCfgData.getOpenTimeInfo();
		// 	return openTimeInfo.isInOpenTime(currTimer);
		// }

		/** 下次开启的时间(单位毫秒) */
		public getNextOpenTime(): number
		{
			//随排位赛的赛季周期一起，  1周为一个循环， 每个循环内会有n次开启。
			//故开启时间分三个配置：  
			//1、开启周期，表示一次循环。
			//2、开启天数，表示在此周期内第几天开。
			//3、匹配时间，表示开启的那一天内的具体时间
			let currTimer = TimeController.currTimer;
			let startServerTime = TimeController.worldCreateTime; //开服时间
			let period: number = cfg.WeekChampionConstInfoCfgData.getFirstInfo().circle; //周期
			let curDay = Math.ceil((currTimer - startServerTime) / 86400000) % period;
			let openDays = cfg.WeekChampionConstInfoCfgData.getOpenDays();
			let openTimeInfo = cfg.WeekChampionConstInfoCfgData.getOpenTimeInfo();

			var startTime = openTimeInfo.getStartTime(currTimer);
			//当天是否有活动
			if (openDays.indexOf(curDay) >= 0)
			{
				//此方法进来时，已经判断过当前是否已经开启，故此处只需检查当前时间是否在开启时间前，就表示当天还没开过
				if (currTimer < startTime)
				{
					return startTime;
				}
			}
			//往后找开启时间
			let nextDayStep = 0;
			//看看本次循环内还有没有
			for (var day of openDays)
			{
				if (day > curDay)
				{
					nextDayStep = day - curDay;
					break;
				}
			}
			//本次循环内已经没有活动了，就找下一次循环的第一次。
			if (nextDayStep <= 0) nextDayStep = openDays[0] + period - curDay;
			let ret = startTime + nextDayStep * 24 * 3600 * 1000;
			return ret;
		}

		/** 下下次开启的时间(单位毫秒) (注意，是下下场的时间， 不要惊慌，没错，就是下下场， 这是一个很神奇的需求。)*/
		public getNextNextOpenTime(): number
		{
			//随排位赛的赛季周期一起，  1周为一个循环， 每个循环内会有n次开启。
			//故开启时间分三个配置：  
			//1、开启周期，表示一次循环。
			//2、开启天数，表示在此周期内第几天开。
			//3、匹配时间，表示开启的那一天内的具体时间
			let currTimer = TimeController.currTimer;
			let startServerTime = TimeController.worldCreateZeroTime; //开服时间
			let period: number = cfg.WeekChampionConstInfoCfgData.getFirstInfo().circle; //周期
			let curDay = Math.ceil((currTimer - startServerTime) / 86400000) % period;
			let openDays = cfg.WeekChampionConstInfoCfgData.getOpenDays();
			let openTimeInfo = cfg.WeekChampionConstInfoCfgData.getOpenTimeInfo();

			var startTime = openTimeInfo.getStartTime(currTimer);
			//往后找开启时间
			let nextDayStep = -1;
			let stepCount = 2;
			//看看本次循环内还有没有
			for (var day of openDays)
			{
				if (day >= curDay)
				{
					nextDayStep = day - curDay;
					stepCount--;
					if (stepCount <= 0) break;
				}
			}
			//本次循环内已经没有活动了，就找下一次循环
			if (stepCount > 0)
			{
				for (var day of openDays)
				{
					day += period;
					if (day >= curDay)
					{
						nextDayStep = day - curDay;
						stepCount--;
						if (stepCount <= 0) break;
					}
				}
			}
			let ret = startTime + nextDayStep * 24 * 3600 * 1000;
			return ret;
		}


        /** 判断玩家是否已经点赞过 */
        public checkPlayerLike(playerId: number): boolean
        {
            return !!this._likePlayerMap.get(playerId);
        }


        public isLikeMax(): boolean
        {
            return  this._likePlayerMap.size() >= cfg.WeekChampionConstInfoCfgData.getFirstInfo().dayLikeMax;
        }

	}
}
