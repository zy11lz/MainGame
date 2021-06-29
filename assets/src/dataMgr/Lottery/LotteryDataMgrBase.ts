
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
	export class LotteryDataMgrBase
	{
		/** 抽奖数据列表 */
		protected _lotteryInfo: Pb_God.PBPlayerLotteryData[];

		/**进化之路-- 许愿池保底抽卡 */
		protected _evolve: Pb_God.PBPlayerLotteryData;
		/**心愿抽卡-- 保底抽卡 */
		protected _dropCard: Pb_God.PBPlayerLotteryData;
		/**胡帕-- 保底抽卡 */
		protected _hupa: Pb_God.PBPlayerLotteryData;
		/**通用活动英雄-- 保底抽卡 */
		protected _limitHero: Pb_God.PBPlayerLotteryData;


		public init(lottery: Pb_God.PBPlayerLottery): void
		{
			this.clean();
			if (lottery)
			{
				this._lotteryInfo = lottery.data;
			}
			else
			{
				this._lotteryInfo = [];
			}
			this.initInfo();
		}

		/**隔天重置 */
		public resetNewDay(): void
		{
			this._evolve.freecount = 0;
			this._dropCard.freecount = 0;
			this._hupa.freecount = 0;
			this._limitHero.freecount = 0;
			
		}

		/**许愿池信息 */
		private initInfo(): void
		{
			this._evolve = new Pb_God.PBPlayerLotteryData();
			this._dropCard = new Pb_God.PBPlayerLotteryData();
			this._hupa = new Pb_God.PBPlayerLotteryData();
			this._limitHero = new Pb_God.PBPlayerLotteryData();
			this._lotteryInfo.filter(elment =>
			{
				switch (elment.type)
				{
					// 进化之路
					case Pb_God._emLotteryType.LotteryType_Wishing:
						this._evolve = elment;
						break;
					// 心愿抽卡
					case Pb_God._emLotteryType.LotteryType_DropCard:
						this._dropCard = elment;
						break;
					case Pb_God._emLotteryType.LotteryType_UnlockPet:
						this._hupa = elment;
						break;
					case Pb_God._emLotteryType.LotteryType_CommonPet:
						this._limitHero = elment;
						break;
				}
			});
		}

		/**进化之路-- 许愿池 */
		public get evolve(): Pb_God.PBPlayerLotteryData
		{
			return this._evolve;
		}

		/**心愿抽卡-- 许愿池 */
		public get dropCard(): Pb_God.PBPlayerLotteryData
		{
			return this._dropCard;
		}

		/**胡帕 */
		public get hupa(): Pb_God.PBPlayerLotteryData
		{
			return this._hupa;
		}

		/**通用英雄 */
		public get limitHero(): Pb_God.PBPlayerLotteryData
		{
			return this._limitHero;
		}

		private clean()
		{
			this._hupa = null;
			this._evolve = null;
			this._dropCard = null;
			this._lotteryInfo = null;
			this._limitHero = null;
		}
	}
}
