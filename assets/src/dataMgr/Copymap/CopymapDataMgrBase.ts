
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
	export class CopymapDataMgrBase
	{
		/** data */
		protected _data: Pb_God.PBPlayerCopymap;
		/** 红点初始化 */
    	protected initRedDot:boolean = false;

		/** 初始化 */
		public init(data: Pb_God.PBPlayerCopymap)
		{
			this._data = data;
			this.initRedDotModel();
		}

		/** 跨时间 */
		public resetNewDay()
		{
			this._data.copymapinfo.forEach(element =>
			{
				element.dailyentercount = 0;
				element.daybuycount = 0;
			});
			this.reddotModel.refresh();
			EventMgr.trigger(CmdEvent.Copymap_SynInfo);
		}

		/** 获取日常副本数据 */
		public getCopyMapList(): Pb_God.PBPlayerCopymapInfo[]
		{
			return this._data.copymapinfo;
		}

		/** 当前日常挑战的最大子类型 */
		public getFightDailyMaxSubtype(id: Pb_God._emCopymapType): number
		{
			let results = this._data.copymapinfo.filter(elment => elment.copymaptype == id);
			return results.length > 0 ? results[0].maxsubtype : 0;
		}

		/** 当前日常副本今日进入次数 */
		public getFightDailyEnterCount(id: Pb_God._emCopymapType): number
		{
			let results = this._data.copymapinfo.filter(elment => elment.copymaptype == id);
			return results.length > 0 ? results[0].dailyentercount : 0;
		}

		/** 当前日常挑战的剩余挑战次数 */
		public getFightDailyLastFightCount(id: Pb_God._emCopymapType): number
		{
			let resultsCfg = cfg.CopymapCfgData.getInfoWithType(id);
			let resultsCopy = this._data.copymapinfo.filter(elment => elment.copymaptype == id);
			let tmpEnterCount = (resultsCopy.length > 0 ? resultsCopy[0].daybuycount : 0) + resultsCfg[0].dailyEnterCount;
			return tmpEnterCount - this.getFightDailyEnterCount(id);
		}

		/** 当前日常副本剩余购买次数 */
		public getFightDailyLastBuyCount(id: Pb_God._emCopymapType): number
		{
			let resultsCopy = this._data.copymapinfo.filter(elment => elment.copymaptype == id);
			let tmpBuyCount = resultsCopy.length > 0 ? resultsCopy[0].daybuycount : 0;
			let tmpMaxBuyCount = PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_CopymapBuyCount);
			return tmpMaxBuyCount - tmpBuyCount;
		}

		///////////////////// 红点 //////////////////////////
		public reddotModel: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			if(!this.initRedDot)
			{
				this.reddotModel.cleanUp(true);
				this.reddotModel.setSystemSwitchId(emSystemSwitchType.Trave);
				this.reddotModel.setupCheckMethod(this, this.isHaveSubFun);
			}
			this.initRedDot = true;
		}
		/** 是否可以操作 */
		private isHaveSubFun(): number
		{
			let tempAry = cfg.CopymapCfgData.getInfoWithSubType(1);
			for (let i = 0; i < tempAry.length; i++)
			{
				let tempInfo = tempAry[i];
				let tempIsUnLock = PlayerDataMgr.level >= tempInfo.needPlayerLevel && PlayerDataMgr.maxfightPower >= tempInfo.needFightPower;
				if (tempIsUnLock && this.getFightDailyLastFightCount(tempInfo.type) > 0)
				{
					return 1;
				}
			}
			return 0;
		}
	}
}
