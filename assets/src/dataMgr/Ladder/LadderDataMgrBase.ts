
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
	export class LadderDataMgrBase
	{
		constructor()
		{

		}

		///////////////////////// 代码整理分隔线 //////////////////////////////////
		/** 当前已经挑战的次数 */
		public fightCount = 0;
		/** 当前已购买次数 */
		public buyCount = 0;
		/** 我的排名 */
		public myRank = 0;
		/** 我的历史最高名次 */
		public myHistroyTopRank = 0;
		/** 刷新冷却时间 */
		public nextRefreshTime = 0;
		/** 当天英雄殿已经膜拜次数 */
		public worshipCount = 0;
		/** 当天英雄膜拜可进行的次数, 正常来说是固定3次的，但是新服可能没有数据，无法膜拜 */
		private maxWorshipCount = 3;

		/** 已膜拜的玩家(playerid like) */
		protected _worshipMap = new ds.StringMap<number>();
		/** 已膜拜的机器人(playerid like) */
		protected _worshipRobotMap = new ds.StringMap<number>();


		public initData(value: Pb_God.PBPlayerLadder): void
		{
			this.fightCount = value.dayentercount;
			this.buyCount = value.daybuycount;

			this.myHistroyTopRank = value.maxrank;

			this.worshipCount = value.likeplayers.length + value.likerobots.length;
			this._worshipMap = Global.listToStringMap(value.likeplayers, this._worshipMap, true);
			this._worshipRobotMap = Global.listToStringMap(value.likerobots, this._worshipRobotMap, true);
			this.initRedDotModel();
		}

		/** 隔日重置数据 */
		public resetNewDay(): void
		{
			this.fightCount = 0;
			this.buyCount = 0;
			this._worshipMap.clear();
			this._worshipRobotMap.clear();
			this.worshipCount = 0;
			this.reddotModel.refresh(true);
		}

		/** 指定玩家是否膜拜过 */
		public isLike(playerId: number, isRobot: boolean): boolean
		{
			return !!(isRobot ? this._worshipRobotMap : this._worshipMap).get(playerId);
		}

		/** 剩余次数 */
		public getLeftCount(): number
		{
			return cfg.LadderConstInfoCfgData.getFirstInfo().dayFightCount + this.buyCount - this.fightCount;
		}

		/** 剩余可购买的次数 */
		public getLeftBuyCount(): number
		{
			return cfg.LadderBuyCountCfgData.getCanBuyCount(PrivilegeDataMgr.vipLevel) - this.buyCount;
		}

		/** 是否正在进行中 */
		public isUnderAway(): boolean
		{
			let dateInfos = cfg.LadderConstInfoCfgData.getOpenTimeInfos();
			let curTime = TimeController.currTimer;
			for (var dateInfo of dateInfos)
			{
				if (dateInfo.isInOpenTime(curTime)) return true;
			}
			return false;
		}

		/** 本轮活动结束时间(毫秒) */
		public getOverTime(): number
		{
			let dateInfos = cfg.LadderConstInfoCfgData.getOpenTimeInfos();
			let dateInfo = dateInfos[dateInfos.length - 1];
			return dateInfo.getEndTime(TimeController.currTimer);
		}

		/** 修改总共可膜拜的次数(最终以打开界面拿到排行数据为准) */
		public setMaxWorshipCount(value: number): void
		{
			if (this.maxWorshipCount == value) return;
			this.maxWorshipCount = value;
			this.reddotModel.refresh();
		}

		public hasWorshipLeftCount(): boolean
		{
			return this.worshipCount < this.maxWorshipCount
		}

		///////////////////// 红点 //////////////////////////
		public reddotModel: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			this.reddotModel.cleanUp(true);
			this.reddotModel.setSystemSwitchId(Pro.emSystemSwitchType.AcrossLadder);
			this.reddotModel.setupCheckMethod(this, this.getRedDot);
		}

		private getRedDot(): boolean
		{
			//有膜拜次数
			if (this.hasWorshipLeftCount()) return true;
			//未到开启时间
			if (!this.isUnderAway()) return false;
			//剩余次数
			if (this.getLeftCount() > 0) return true;
			return false;
		}

	}
}
