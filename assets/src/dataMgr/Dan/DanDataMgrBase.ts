
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
	export class DanDataMgrBase
	{
		constructor()
		{

		}

		///////////////////////// 代码整理分隔线 //////////////////////////////////
		/** 当前服务器所在的赛区 */
		public curAreaId = 1;
		/** 当前赛季(1开始) */
		public seasonNumber = 10;
		/** 当前赛季的起始时间(单位秒) */
		public seasonStartTime = 0;
		/** 我的排名 */
		public rank = 0;
		/** 当前赛季历史最高段位 */
		public maxDanId: number = 1;
		/** 已经领奖的段位ID */
		public prizeDanId: number = 0;
		/** 当前段位 */
		public curDanId: number = 1;
		/** 当前已经挑战的次数 */
		public fightCount = 0;
		/** 当前已购买次数 */
		public buyCount = 0;
		/** 当前升段的经验 */
		public curExp = 50;
		/** 当前升段的缓冲经验 */
		public cacheExp = 1;
		/** 晋级赛结果 */
		public protmoteresult: number[];
		/** 红点初始化 */
    	protected initRedDot:boolean = false;

		/** 是否参加过王者赛 */
		public inkingMatch = false;


		public initData(data: Pb_God.PBPlayerDan): void
		{
			this.fightCount = data.fightcount;
			this.buyCount = data.buycount;
			this.prizeDanId = data.prizedanid || 1;
			this.protmoteresult = data.protmoteresult;
			this.curDanId = data.totalresult ? data.totalresult.curdanid : 1;
			this.maxDanId = data.totalresult ? data.totalresult.maxdanid : 1;
			this.curExp = data.totalresult ? data.totalresult.exp : 0;
			this.inkingMatch = data.inkingmatch;

			this.initRedDotModel();
		}

		/** 隔日重置数据 */
		public resetNewDay(): void
		{
			this.fightCount = 0;
			this.buyCount = 0;
			this.reddotModel.refresh(true);
		}

		/** 剩余数量 */
		public getLeftCount(): number
		{
			return cfg.DanConstCfgData.getFirstInfo().dayFightCount + this.buyCount - this.fightCount;
		}

		///////////////////// 红点 //////////////////////////
		public reddotModel: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			if(!this.initRedDot)
			{
				this.reddotModel.cleanUp(true);
				this.reddotModel.setSystemSwitchId(Pro.emSystemSwitchType.Dan);
				this.reddotModel.setupCheckMethod(this, this.getRedDot);
			}
			this.initRedDot = true;
		}
		/** 红点 */
		private getRedDot(): boolean
		{
			//剩余次数
			if (this.getLeftCount() > 0) return true;
			//有奖励可以领
			if (this.prizeDanId + 1 <= this.maxDanId) return true;
			return false;
		}
	}
}
