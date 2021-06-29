
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
	export class SailDataMgrBase
	{
		constructor()
		{

		}

		//----------------------------------------------------------------------------
		/** 远航数据 */
		protected sail: Pb_God.PBPlayerSail;

		/** 远航总列表 */
		protected sailList: Pb_God.PBPlayerSailIndex[] = [];

		/** 初始化 */
		public init(info: Pb_God.PBPlayerSail)
		{
			this.sail = info;
			this.refreshSailList(false);
			this.initReddotModel();
		}

		/** 跨时间 */
		public resetNewDay()
		{
			this.sail.daybuycount = 0;
			this.sail.dayfreecount = 0;
			this.sail.totalrefreshcount = 0;
			EventMgr.trigger(EventNotify.Sail_Changed);
		}

		public refreshSailList(eventChange: boolean)
		{
			this.sailList.splice(0, this.sailList.length);
			this.sailList = this.sailList.concat(this.sail.refresh);
			this.sailList = this.sailList.concat(this.sail.accpet);
			this.sailList.sort(function (a: any, b: any)
			{
				let tmpSailTypeA = cfg.SailPoolCfgData.getSailTypeByIndex(a.index);
				let tmpSailTypeB = cfg.SailPoolCfgData.getSailTypeByIndex(b.index);
				let tmpSailAFinish = (a["endtime"] == null ? 1 : a.endtime * 1000 - TimeController.currTimer) <= 0;
				let tmpSailBFinish = (b["endtime"] == null ? 1 : b.endtime * 1000 - TimeController.currTimer) <= 0;
				let tmpSailANone = a["endtime"] == null;
				let tmpSailBNone = b["endtime"] == null;

				if (tmpSailAFinish && !tmpSailBFinish) { return -1; }
				else if (!tmpSailAFinish && tmpSailBFinish) { return 1; }
				else if (tmpSailANone && !tmpSailBNone) { return -1; }
				else if (!tmpSailANone && tmpSailBNone) { return 1; }
				else if (tmpSailTypeA != tmpSailTypeB) return tmpSailTypeB - tmpSailTypeA;
				else return b.index - a.index;
			});
			if (eventChange) EventMgr.trigger(EventNotify.Sail_Changed);
		}

		//----------------------------------Function--------------------------------
		/** 免费次数*/
		public getDayFreeCount(): number
		{
			return this.sail.dayfreecount;
		}
		/** 每日刷新次数*/
		public getDayBuyCount(): number
		{
			return this.sail.daybuycount;
		}
		/** 总刷新次数*/
		public getTotalRefreshCount(): number
		{
			return this.sail.totalrefreshcount;
		}

		/** 获取每日免费最大值 */
		public getDayFreeMaxCount(): number
		{
			return cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_SailDayFreeCount);
		}

		/** 获取远航点数最大值 */
		public getSailMaxPoint(): number
		{
			//当前关卡增加的值
			let hookAddPoint = cfg.HookStageCfgData.getMaxSailPointByStageID(HookDataMgr.getStageID() == 0 ? 1 : HookDataMgr.getStageID());
			//VIP特权增加的值
			let vipAddPoint = PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_SailPoint);
			return hookAddPoint + vipAddPoint;
		}

		/** 获取所有远航任务 */
		public getSailList(): Pb_God.PBPlayerSailIndex[]
		{
			return this.sailList;
		}

		/** 获取远航中的任务 */
		public getAcceptList(): Pb_God.PBPlayerSailInfo[]
		{
			return this.sail.accpet;
		}

		/** 获取远航中任务的状态 */
		public getSailInfo(sn: number): Pb_God.PBPlayerSailInfo
		{
			let results = this.sail.accpet.filter(elment => elment.sn == sn);
			return results.length > 0 ? results[0] : null;
		}

		/** 判断当前是否有已接的任务完成了 */
		public isHaveFinishSail(): boolean
		{
			let acceptList = this.getAcceptList();
			let currTimer = TimeController.currTimer;
			for (var el of acceptList)
			{
				let leftTime = el.endtime * 1000 - currTimer;
				if (leftTime <= 0)
				{
					return true;
				}
			}
			return false;
		}

		/** 判断是否有高品质的任务没接取 */
		public isHaveHighSail(sailType: number): boolean
		{
			let results = this.sail.refresh.filter(elment => cfg.SailPoolCfgData.getSailTypeByIndex(elment.index) >= sailType);
			return results.length > 0;
		}

		/** 红点模型 */
		public reddotModel: RedDotModel = new RedDotModel;
		private initReddotModel(): void
		{
			this.reddotModel.cleanUp(true);
			Laya.timer.clear(this, this.checkReddot);
			this.reddotModel.setSystemSwitchId(emSystemSwitchType.Sail);
			this.reddotModel.setPlayerItemsListener([CfgID.ItemID.SailPoint]);
			this.reddotModel.setupCheckMethod(this, this.checkReddot);
		}
		private checkReddot(): boolean
		{
			//先检查是否寻宝情报是否达到上限60%			
			let curCount = Global.getItemNum(CfgID.ItemID.SailPoint);
			let maxCount = this.getSailMaxPoint();
			if (curCount > maxCount * 0.6)
			{
				//还有没接取的就亮起来
				for (let sail of this.getSailList())
				{
					if (!this.getSailInfo(sail.sn))
					{
						return true;
					}
				}
			}

			let currTimer = TimeController.currTimer;
			let acceptList = this.getAcceptList();
			let minNextTime = 999999999;
			let hasLeftTime = false;
			for (var el of acceptList)
			{
				let leftTime = el.endtime * 1000 - currTimer;
				if (leftTime <= 0)
				{
					Laya.timer.clear(this, this.checkReddot);
					return true;
				} else if (minNextTime > leftTime)
				{
					minNextTime = leftTime;
					hasLeftTime = true;
				}
			}
			//等待倒计时再检查一次
			if (hasLeftTime) Laya.timer.once(minNextTime + 2000, this, this.checkReddot, null, true);
			return false;
		}
	}
}
