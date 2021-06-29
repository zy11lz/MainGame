
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
	export class RedEnvelopeDataMgrBase
	{
		/** 红包信息 */
		protected _redEnvelopeInfo: Pb_God.PBRefreshInfo[];

		public init(redEnvelope: Pb_God.PBPlayerRedEnvelope): void
		{			
			this.clean();
			this._redEnvelopeInfo = [];
			if(redEnvelope)
			{
				redEnvelope.data.forEach(element => {
					let info =  new Pb_God.PBRefreshInfo();
					info.index =  element.index;
					info.status = element.status;
					this._redEnvelopeInfo.push(info);
				});
			}
			this.initRed();
		}

		/**红点提示 */
		public reddotModel: RedDotModel = new RedDotModel();
		// public reddotModel: RedDotModel = new RedDotModel();
		private initRed(): void
		{
			this.reddotModel.cleanUp(true);
			this.reddotModel.addGlobalEventRefresh(CmdEvent.RedEnvelope_Refresh);
			this.reddotModel.setupCheckMethod(this, this.checkReddot);

			let reddot = this.reddotModel.addChildModel("npc");
			reddot.addGlobalEventRefresh(CmdEvent.RedEnvelope_Refresh);
			reddot.setupCheckMethod(this, ()=>{
				return this.getReceiveIndexByType(Pro.EmredEnvelopeType.NpcRedEnvelope)
			});

			reddot = this.reddotModel.addChildModel("pet");
			reddot.addGlobalEventRefresh(CmdEvent.RedEnvelope_Refresh);
			reddot.setupCheckMethod(this, ()=>{
				return this.getReceiveIndexByType(Pro.EmredEnvelopeType.PetRedEnvelope)
			});
		}


		private checkReddot(): number
		{
			return this.getReceiveIndexByType(Pro.EmredEnvelopeType.NpcRedEnvelope) | this.getReceiveIndexByType(Pro.EmredEnvelopeType.PetRedEnvelope);
		}

		
		/**
		 * 红包排序
		 * @param type 红包类型 
		 */
		public getRedEnvelopeSortByType(type: number): Pb_God.PBRedEnvelopeInfo[]
		{
			let arr = this.getRedEnvelopeByType(type);
			arr.sort((a: Pb_God.PBRedEnvelopeInfo, b: Pb_God.PBRedEnvelopeInfo) =>
			{
				if(a.status != b.status) return a.status - b.status;
				// 红包领取状态相同 再按领取时间排序
				let redStrTimeA = cfg.ActivityRedEnvelopeCfgData.getInfo(a.index).time;
				let redStrTimeB = cfg.ActivityRedEnvelopeCfgData.getInfo(b.index).time;
				let endTimeA = cfg.StDateTimeInfo.parse(`${redStrTimeA}`).getStartTime(TimeController.currTimer);
				let endTimeB = cfg.StDateTimeInfo.parse(`${redStrTimeB}`).getStartTime(TimeController.currTimer);
				return endTimeA - endTimeB;
			})
			return arr;
		}

		/**
		 * 根据类型获取服务器返回的红包信息
		 * @param type 
		 */
		public getRedEnvelopeByType(type: number): Pb_God.PBRedEnvelopeInfo[]
		{
			let arr = [];
			for (let i = 0; i < this._redEnvelopeInfo.length; i++) {
				let element = this._redEnvelopeInfo[i];
				if(element && element.index > 0 && cfg.ActivityRedEnvelopeCfgData.getInfo(element.index).type == type)
				{
					arr.push(element);
				}
			}
			return arr;	
		}

		public getRedEnvelopeByIndex(index: number): Pb_God.PBRefreshInfo
		{
			let arr = [];
			for (let i = 0; i < this._redEnvelopeInfo.length; i++) {
				let element = this._redEnvelopeInfo[i];
				if(element && element.index > 0 && cfg.ActivityRedEnvelopeCfgData.getInfo(element.index).index == index)
				{
					return element;
				}
			}
			return null;		
		}

		/**
		 * 根据红包类型获取当前优先领取的红包索引
		 * @param type 
		 */
		public getReceiveIndexByType(type: number)
		{
			let arr = this.getRedEnvelopeSortByType(type);
			for (var index = 0; index < arr.length; index++) {
				let element = arr[index];
				if(element.status == 0)return element.index;
				if(element.status == 2)continue;
				if(element.status == 1)
				{
					/** 由于计时并不是实时刷新红包状态 待计时时间到时也为可领取状态 */
					let redStrTime = cfg.ActivityRedEnvelopeCfgData.getInfo(element.index).time;
					let isInOpenTime = cfg.StDateTimeInfo.parse(`${redStrTime}`).isInOpenTime(TimeController.currTimer);
					if(isInOpenTime) // 时间达到
					{
						return element.index;
					}
				}
			}
			return 0;
		} 

		/** 当前有效红包数量（未拆封为有效红包） */
		public getIsValidRedEnvelope(): number
		{
			let count = 0;
			for (let i = 0; i < this._redEnvelopeInfo.length; i++) {
				let element = this._redEnvelopeInfo[i];
				if(element && element.status != 2)
				{
					count++;
				}
			}
			return count;
		} 

		private clean()
		{

		}
	}
}
