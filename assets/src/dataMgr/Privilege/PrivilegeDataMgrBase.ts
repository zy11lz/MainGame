
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
	export class PrivilegeDataMgrBase
	{
		constructor()
		{

		}

		////////////////////////////////////
		/** 当前VIP等级 */
		private _vipLevel = 0;
		private _vipExp = 0;

		/**购买的vip礼包*/
		protected _buyvippacket: ds.StringMap<number>;
		/** 特权商店购买情况(shopindex map 购买数量) */
		protected _shopBuyCountMap = new ds.StringMap<number>();
		/** 特权卡激活情况(key:Pb_God._emPrivilegeCard map 失效时间) */
		protected _privilegeCardMap = new ds.StringMap<number>();
		/** 每日奖励领取情况(key:  Pb_God._emPrivilegeDailyPacket map 今天是否已领奖) */
		protected _dailyPacketMap = new ds.StringMap<boolean>();

		/** 特权卡充值记录(key:  Pb_God._emPrivilegeCard)  */
		protected _cardChargeInfo: ds.StringMap<Pb_God.PBPrivilegeCharge>;

		public init(data: Pb_God.PBPlayerPrivilege): void
		{
			this._buyvippacket = Global.listToStringMap(data.vip.buyvippacket);
			this.setVipExp(data.vip.exp, false);
			this._cardChargeInfo = Global.listToStringMapData(data.charge, "cardid");


			this._dailyPacketMap.clear();
			let today = new Date(TimeController.currTimer).toDateString();
			for (var dailyPrize of data.dailyprize)
			{
				this._dailyPacketMap.put(dailyPrize.packetid, today === new Date(dailyPrize.prizetime * 1000).toDateString());
			}

			this._shopBuyCountMap.clear();
			for (var shopInfo of data.shopbuy)
			{
				this._shopBuyCountMap.put(shopInfo.index, shopInfo.buycount);
			}
			this._privilegeCardMap.clear();
			for (var card of data.card)
			{
				this._privilegeCardMap.put(card.cardid, card.expiretime);
			}

			//红点信息初始化
			this.initRedDotModel();
		}

		//隔天重置
		public resetNewDay(): void
		{
			//每日首充进度重置
			let dailyChargeInfo = this._cardChargeInfo.get(Pb_God._emPrivilegeCard.PrivilegeCard_DailyCharge);
			if (dailyChargeInfo) dailyChargeInfo.totalcharge = 0;
			this._dailyPacketMap.clear();
			this.reddotModel.refresh(true);
			this.reddotModelDailyCharge.refresh(true);
			this.reddotModelMonthCard.refresh(true);
		}


		public get vipLevel(): number
		{
			return this._vipLevel;
		}
		public get vipExp(): number
		{
			return this._vipExp;
		}
		/** 设置VIP经验，同时匹配对应的VIP等级 */
		protected setVipExp(exp: number, isEvent: boolean = true): void
		{
			if (this._vipExp == exp) return;
			this._vipExp = exp;
			let vipLv = cfg.PrivilegeVipCfgData.getVipLevlByExp(exp);
			if (vipLv != this._vipLevel)
			{
				this._vipLevel = vipLv;
				if (isEvent)
				{
					this.reddotModel.refreshChild("vipPage", true);
					EventMgr.trigger(EventNotify.VIP_Level_Changed, vipLv);
				}
			}
			if (isEvent) EventMgr.trigger(EventNotify.VIP_Exp_Changed, exp);
		}

		/** VIP礼包是否购买 */
		public isBuyVipPacket(vipLevel: number): boolean
		{
			return this._buyvippacket.get(vipLevel) != null;
		}

		/** 获取当前VIP对应的特权数值(注意此处不是特权卡，特权卡请走getPrivilegeCardValue) */
		public getVipPrivilegeValue(privilegeType: Pb_God._emPrivilegeType): number
		{
			//当前VIP对应的特权列表
			let map = cfg.PrivilegeVipCfgData.getPrivilegeMapByLevel(this.vipLevel);
			return map.get(privilegeType) || 0;
		}

		/** 检查当前VIP特权是否有
		 * @param isTips 当特权没有达成时，显示需要的VIP等级
		 */
		public checkVipPrivilege(privilegeType: Pb_God._emPrivilegeType, isTips: boolean = true): boolean
		{
			let value = this.getVipPrivilegeValue(privilegeType);
			if (value) return true;
			if (isTips)
			{
				//找到开放此特权的VIP等级
				let maxVip = cfg.PrivilegeVipCfgData.getMaxLevel();
				for (var vip = this.vipLevel + 1; vip <= maxVip; vip++)
				{
					if (cfg.PrivilegeVipCfgData.getPrivilegeMapByLevel(vip).get(privilegeType))
					{
						TipsUtils.showTipsByLanId("tips_msg61", vip);
						return false;
					}
				}
				TipsUtils.showTips("暂无此特权");  //需要检查VIP表
			}
			return false;
		}

		/** 根据当前VIP等级，获取后续特权有变动的VIP等级 */
		public getUpVipPrivilegeVipLevel(privilegeType: Pb_God._emPrivilegeType): number
		{
			let curValue = this.getVipPrivilegeValue(privilegeType);
			//找到开放此特权的VIP等级
			let maxVip = cfg.PrivilegeVipCfgData.getMaxLevel();
			for (var vip = this.vipLevel + 1; vip <= maxVip; vip++)
			{
				if (cfg.PrivilegeVipCfgData.getPrivilegeMapByLevel(vip).get(privilegeType) > curValue)
				{
					return vip;
				}
			}
			return -1;
		}


		/** 判断特权卡是否有效(注意此处需区分VIP特权) */
		public getPrivilegeCardValid(cardType: Pb_God._emPrivilegeCard): boolean
		{
			let overTime = this._privilegeCardMap.get(cardType);
			//0为永久
			if (overTime == 0) return true;
			//没有值就是没激活了
			if (!overTime) return false;
			return overTime > TimeController.currTimer / 1000;
		}

		/** 获取特权卡时效(秒)
		 * -1表示未激活， 0表示永久
		 */
		public getPrivilegeCardExpiretime(cardType: Pb_God._emPrivilegeCard): number
		{
			let overTime = this._privilegeCardMap.get(cardType);
			if (overTime == null) return -1;
			return overTime;
		}

		/** 获取特权卡的充值进度 */
		public getPrivilegeCardTotalCharge(cardType: Pb_God._emPrivilegeCard): number
		{
			let info = this._cardChargeInfo.get(cardType);
			if (!info) return 0;
			return info.totalcharge;
		}

		/** 取得购买的特权卡对应的特权值，未激活时无值 */
		public getPrivilegeCardValue(cardType: Pb_God._emPrivilegeCard, privilegeType: Pb_God._emPrivilegeType): number
		{
			//先判断卡是否已经激活
			if (!this.getPrivilegeCardValid(cardType)) return 0;
			let privilegeMap = cfg.PrivilegeCardCfgData.getPrivilegeMapByCardId(cardType);
			return privilegeMap.get(privilegeType) || 0;
		}

		/** 获取特权商城购买数量(注意这里不是判断特权生效的)  */
		public getPrivilegeShopBuyCount(index: number): number
		{
			return this._shopBuyCountMap.get(index);
		}

		/** 检查当天的每日奖励是否已领 */
		public getDailyPacketIsGot(packetid: Pb_God._emPrivilegeDailyPacket): boolean
		{
			return !!this._dailyPacketMap.get(packetid);
		}

		// /** 取得有效的每日首充配置数据 */
		// public getVaildDailyFirstChargeCfgData(): cfg.PrivilegeDailyFirstChargeCfgInfo {
		// 	let allCfgList = cfg.PrivilegeDailyFirstChargeCfgData.getAll();
		// 	let playerLevel = PlayerDataMgr.level;
		// 	let len = allCfgList.length;
		// 	for(var i=len-1; i>=0; i--){
		// 		let el = allCfgList[i];
		// 		if(el.needLevel <= playerLevel) return el;
		// 	}
		// 	return allCfgList[0];
		// }

		///////////////////// 红点(根据不同的界面，做不同的归纳) //////////////////////////
		/**  充值主界面红点总纳 */
		public reddotModel: RedDotModel = new RedDotModel();
		/**  月卡红点(两个子级分别为荣耀月卡与至尊月卡) */
		public reddotModelMonthCard: RedDotModel = new RedDotModel();
		/** 每日首充 */
		public reddotModelDailyCharge: RedDotModel = new RedDotModel();

		private initRedDotModel(): void
		{
			//充值主界面
			this.reddotModel.cleanUp(true);
			this.reddotModel.setSystemSwitchId(emSystemSwitchType.Pay);
			//VIP分页
			let reddotVip = this.reddotModel.addChildModel("vipPage");
			//VIP礼包
			let maxVip = cfg.PrivilegeVipCfgData.getMaxLevel();
			for (var vip = 0; vip <= maxVip; vip++)
			{
				let reddotVipGift = reddotVip.addChildModel("gift" + vip, null, vip);
				reddotVipGift.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "vipPageClick_" + vip);
				reddotVipGift.setupCheckMethod(this, this.checkVipGiftReddot);
			}
			//特权商城
			let reddotPrivilegeShop = this.reddotModel.addChildModel("privilegeShop");
			reddotPrivilegeShop.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "privilegeShopOpen");
			reddotPrivilegeShop.setupCheckMethod(this, () =>
			{
				return !TodayRepeatOpMgr.Inst.getTag("privilegeShopOpen");
			})

			//至尊月卡VIP每日礼包  前置特权卡为至尊月卡
			let reddot = reddotVip.addChildModel("vipMonthCardDayGift");
			this.__initDailyCardReddotMode(reddot, Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_VipZZMonth);

			//月卡
			this.reddotModelMonthCard.cleanUp(true);
			//荣耀月卡
			reddot = this.reddotModelMonthCard.addChildModel(1);
			this.__initDailyCardReddotMode(reddot, Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_RRMonth);
			//至尊月卡
			reddot = this.reddotModelMonthCard.addChildModel(2);
			this.__initDailyCardReddotMode(reddot, Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_ZZMonth);

			//每日首充(分三档奖励与界面首次打开的红点)
			this.reddotModelDailyCharge.cleanUp(true);
			let firstOpen = this.reddotModelDailyCharge.addChildModel("openUI");
			firstOpen.addGlobalEventRefresh(EventNotify.Op_TodayRepleat, "dailyChargeOpen");
			firstOpen.setupCheckMethod(this, () =>
			{
				return !TodayRepeatOpMgr.Inst.getTag("dailyChargeOpen") && PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.DailyFirstPay);
			})
			//三档
			for (var i = 0; i < 3; i++)
			{
				let childModel = this.reddotModelDailyCharge.addChildModel("page" + i);
				this.__initDailyCardReddotMode(childModel, Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_DailyCharge + i);
			}		
		}

		/** 每日礼包卡红点初始化: 一个礼包卡对应一个礼包类型与特权卡的类型 */
		private __initDailyCardReddotMode(reddotModel: RedDotModel, packetType: Pb_God._emPrivilegeDailyPacket): void
		{
			reddotModel.addGlobalEventRefresh(EventNotify.Privilege_Daily_Prize, packetType);  //监听对应的每日礼包领取情况
			/** 获得此礼包所需要的前置特权卡 */
			let privilegeCardType: Pb_God._emPrivilegeCard = cfg.PrivilegeDailyPrizeCfgData.getNeedCardIDByType(packetType);
			if (privilegeCardType) reddotModel.addGlobalEventRefresh(EventNotify.Privilege_Card_Change, privilegeCardType);//监听前置特权卡的激活情况

			reddotModel.setupCheckMethod(this, () =>
			{
				//已经领过了
				if (this.getDailyPacketIsGot(packetType)) return false;
				if (!privilegeCardType) return true;
				//月卡是否激活
				return this.getPrivilegeCardValid(privilegeCardType);
			});
		}


		/** VIP礼包红点（点过一次就消失） */
		private checkVipGiftReddot(reddotModel: RedDotModel): boolean
		{
			reddotModel.setPlayerItemsListener(null);
			let vipLv: number = reddotModel.bindData;
			//VIP是否已经达到
			if (vipLv > this.vipLevel) return false;
			//已经购买了
			if (this.isBuyVipPacket(vipLv)) return false;
			//今天是否已经点过了
			if (TodayRepeatOpMgr.Inst.getTag("vipPageClick_" + vipLv)) return false;
			//是否够钻石
			let needItem = cfg.PrivilegeVipCfgData.getGiftNeedItemInfoByVipLevel(vipLv);
			reddotModel.setPlayerItemsListener([needItem.itemid]);
			return Global.isFullRes(needItem.itemid, needItem.itemcount, false);
		}

	}
}
