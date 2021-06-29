
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
	export enum PetCallType
	{
		base_call = 1,
		friend_call = 2,
		advanced_call = 3
	}
	export class CallDataMgrBase
	{
		constructor()
		{

		}

		/** 召唤英雄时，是否自动分解 */
		public isAutoSplitHero = false;

		protected _data: Pb_God.PBPlayerCall;
		protected _baseCallIDAry = [PetCallType.base_call, PetCallType.friend_call, PetCallType.advanced_call];
		protected _baseJifenCallID = 4;
		protected _xzCallIDAry = [5, 6, 7, 8];
		protected _dreamJfenCallID = [9, 10, 11, 12, 13]

		/** 置换数据*/
		public changeinfo: Pb_God.PBPlayerCallChange;

		/** 初始化 */
		public init(data: Pb_God.PBPlayerCall)
		{
			this._data = data;
			this.changeinfo = null;
			this.isAutoSplitHero = data.autosplit;
			if (data.changeinfo && data.changeinfo.petid) this.changeinfo = data.changeinfo;
			this.initRedDotModel();
		}

		/** 获取基础召唤类型列表 */
		public getBaseCallTypeAry(): Array<number>
		{
			return this._baseCallIDAry;
		}

		/** 获取积分召唤类型 */
		public getJifenCallType(): number
		{
			return this._baseJifenCallID;
		}

		/** 获取先知召唤类型 */
		public getXZCallTypeAry(): Array<number>
		{
			return this._xzCallIDAry;
		}

		/** 获取梦幻积分召唤类型 */
		public getdreamJfenCallAry(): Array<number>
		{
			return this._dreamJfenCallID;
		}

		/** 根据召唤类型获取下次免费召唤时间点 */
		public getNextFreeTime(calltype: number): number
		{
			let results = this._data.callinfo.filter(elment => elment.calltype == calltype);
			if (results.length > 0)
			{
				return results[0].netxfreetime * 1000;
			}
			return 0;
		}

		/** 根据召唤类型获取总召唤次数 */
		public getTotalcount(calltype: number): number
		{
			let results = this._data.callinfo.filter(elment => elment.calltype == calltype);
			if (results.length > 0)
			{
				return results[0].totalcount;
			}
			return 0;
		}

		/** 根据召唤类型获取连续不出五星英雄次数 */
		public getContinueCount(callType: number): number
		{
			let results = this._data.callinfo.filter(elment => elment.calltype == callType);
			if (results.length > 0)
			{
				return results[0].continuecount;
			}
			return 0;
		}

		/** 根据召唤类型获取首次出五星的次数 */
		public getFirstContinueCount(callType: number): number
		{
			let results = this._data.callinfo.filter(elment => elment.calltype == callType);
			if (results.length > 0)
			{
				return results[0].firstcontinuecount;
			}
			return 0;
		}

		/** 发起召唤（根据类型取一个合适的召唤配置） */
		public sendCall(type: number, isTen: boolean): boolean
		{
			let cfgList = cfg.PetCallCallCostCfgData.getListByTypeAndCount(type, isTen ? 10 : 1);
			for (let cfgInfo of cfgList)
			{
				let needItem = cfg.PetCallCallCostCfgData.getNeedItemAryByInfo(cfgInfo);
				if (Global.isFullRes(needItem.itemid, needItem.itemcount, false))
				{
					if (!isTen) CallSend.onePet(cfgInfo.index);
					else CallSend.tenPet(cfgInfo.index);
					return true;
				}
			}
			//道具不足， 提示第一个
			let needItem = cfg.PetCallCallCostCfgData.getNeedItemAryByInfo(cfgList[0]);
			UIManager.Inst.forceOpen(new Pro.BaseOpenUIData(Pro.PanelNotify.Open_ItemAccess, needItem.itemid));
			return false;
		}

		///////////////////// 红点 //////////////////////////
		public reddotModel: RedDotModel = new RedDotModel();
		/** 万神殿(先知圣殿)红点 */
		public reddotModelExchange: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			this.reddotModel.cleanUp(true);
			this.reddotModel.setSystemSwitchId(Pro.emSystemSwitchType.HeroCall);

			let sub_reddot = this.reddotModel.addChildModel("nomalCall");
			sub_reddot.setupCheckMethod(this, this.checkNormalReddot);

			sub_reddot = this.reddotModel.addChildModel("CallPoint");
			sub_reddot.setPlayerItemsListener([CfgID.ItemID.CallPoint]); //召唤积分变化
			sub_reddot.addGlobalEventRefresh(EventNotify.VIP_Level_Changed);  //VIP等级变化
			sub_reddot.setupCheckMethod(this, this.checkCallPointReddot);

			this.reddotModelExchange.cleanUp(true);
			this.reddotModelExchange.setSystemSwitchId(Pro.emSystemSwitchType.Seer);
			this.reddotModelExchange.setPlayerItemsListener([CfgID.ItemID.ProphetCrystal]);
			this.reddotModelExchange.setupCheckMethod(this, this.checkExchangeReddot);
		}

		/** 先知圣殿红点 */
		private checkExchangeReddot(): boolean
		{
			let callType = this.getXZCallTypeAry()[0];
			let needItems = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(callType, 1);
			return Global.isFullSingleRes(needItems, false);
		}

		/** 检查召唤红点（有免费召唤次数或者积分召唤可以使用时） */
		private checkNormalReddot(reddotModel: RedDotModel): number
		{
			//抽卡道具
			let needItemIds: number[] = [CfgID.ItemID.NomalCall, CfgID.ItemID.HightCallToken, CfgID.ItemID.HightCallGift];
			reddotModel.setPlayerItemsListener(needItemIds);
			for (var itemId of needItemIds)
			{
				// 策划新需求  三类抽卡的卡片任意一种大等于十张刷新出外面召唤红点
				if ((itemId == CfgID.ItemID.HightCallGift && Global.isFullRes(itemId, 1, false)) || Global.isFullRes(itemId, 10, false)
					|| (itemId == CfgID.ItemID.FrendShip && Global.isFullRes(itemId, 1000, false)))
				{
					CallDataMgr.reddotModel.setRedDot(1);
				}
			}

			for (var itemId of needItemIds)
			{
				if (Global.isFullRes(itemId, 1, false)) return 1;
			}

			//检查免费的基础召唤次数或有足够的召唤道具
			for (let tempCallType of this.getBaseCallTypeAry())
			{
				let tempFreeCallTime = cfg.PetCallCallCfgData.getFreeResetTimeByCallType(tempCallType);
				let tempLastTime = CallDataMgr.getNextFreeTime(tempCallType) - TimeController.currTimer;
				if (tempFreeCallTime.length > 0 && tempLastTime <= 0 && tempCallType != PetCallType.base_call)
				{
					return 1;
				}
			}

			return 0;
		}

		/** 检查积分召唤红点 */
		private checkCallPointReddot(): number
		{
			//检查积分兑换
			let tempJifenCallType = CallDataMgr.getJifenCallType();
			let tempOneNeedItems = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(tempJifenCallType, 1);
			if (!Global.isFullSingleRes(tempOneNeedItems, false)) return 0;
			// if (PrivilegeDataMgr.vipLevel < cfg.PetCallCallCfgData.getNeedVipLevelByCallType(tempJifenCallType)) return 0;
			return 1;
		}



		public isHaveFreeTimeByCallType(tempCallType)
		{
			//抽一次免费剩余时间
			let tempFreeCallTime = cfg.PetCallCallCfgData.getFreeResetTimeByCallType(tempCallType);
			let tempLastTime = CallDataMgr.getNextFreeTime(tempCallType) - TimeController.currTimer;
			return tempLastTime <= 0 && tempFreeCallTime.length > 0;
		}

	}
}
