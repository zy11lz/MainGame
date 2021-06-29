
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
	export class VideoDataMgrBase
	{
		protected _VideoDic: ds.StringMap<Pb_God.PBVideoDisplay[]>;
		protected _VideoRecord: Pb_God.PBPlayerVideo;

		public init(video: Pb_God.PBPlayerVideo)
		{
			if (this._VideoDic != null)
			{
				this._VideoDic.clear();
			}
			else
			{
				this._VideoDic = new ds.StringMap<Pb_God.PBVideoDisplay[]>();
			}
			this._VideoRecord = video;
			this.initRedDotModel();
		}

		/** 隔日重置数据 */
		public resetNewDay(): void
		{
			this._VideoRecord.daylikevideo = [];
			this.reddotModel.refresh();
		}

		public getVideoDisplay(type: Pb_God._emVideoType): Pb_God.PBVideoDisplay[]
		{
			return this._VideoDic.getValue(type);
		}

		public getTodayMaxLikeTime(): number
		{
			return cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_VideoMaxLikeCount);
		}

		public getTodayLikeTime(): number
		{
			return this._VideoRecord.daylikevideo.length;
		}

		public getTodayLastLikeTime(): number
		{
			return this.getTodayMaxLikeTime() - this.getTodayLikeTime();
		}

		public getIsLikeRideo(battleSn: Long): boolean
		{
			let tmpResults = this._VideoRecord.daylikevideo.filter(element => (element as Long).equals(battleSn));
			return tmpResults.length > 0;
		}

		public getIsCollectRideo(battleSn: Long): boolean
		{
			let tmpResults = this._VideoRecord.collectvideo.filter(element => (element as Long).equals(battleSn));
			return tmpResults.length > 0;
		}

		///////////////////// 红点 //////////////////////////
		public reddotModel: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			this.reddotModel.cleanUp(true);
			this.reddotModel.setupCheckMethod(this, () =>
			{
				return this.getTodayLastLikeTime() > 0 && PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Video);
			})
		}

	}
}
