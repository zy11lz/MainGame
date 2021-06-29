
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
	export class PlatformDataMgrBase
	{

		// 所有商品购买信息
		protected _chargeInfoMap: ds.StringMap<Pb_God.PBChargeInfo>;
		private _cdTime: number = 0;
		public payTimestamp: number;

		constructor()
		{

		}

		/**
		 * 初始化
		 */
		public init(data: Pb_God.PBPlayerPlatform): void
		{
			this._chargeInfoMap = Global.listToStringMapData(data.info, "groupid");
		}

		/** 跳转合适的充值界面(一键牛逼、充值等) */
		public openChargeUI(): void
		{
			//如果一键牛逼-必买礼包还有剩余可购买，则充值跳转优先跳转“必买礼包”界面。
			if (PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.LimitTimeAct))
			{
				let actGrpCfg = cfg.ActivityCommonGroupCfgData.getFirstInfo();
				if (ActivityDataMgr.checkCommonGroupActChargeValid(actGrpCfg))
				{
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TimeLimitActivity, actGrpCfg.groupID, 0), Pro.BaseBackUIType.HideBackUI);
					return;
				}
			}
			//打开通用充值界面
			Pro.UIManager.Inst.forceOpen(new Pro.BaseOpenUIData(Pro.PanelNotify.Open_PayMain, 0), Pro.BaseBackUIType.HideBackUI);
		}

		public getChargeInfoByCfgInfo(cfgInfo: cfg.ChargeCfgInfo): Pb_God.PBChargeInfo
		{
			if (!cfgInfo) { return null; }
			//商品信息的key有点特殊，使用的是goupid 而这个group在配置中，有时候会是0， 如果是0，就取商品id
			return this.getChargeInfoByGroupId(cfgInfo.groupID || cfgInfo.iD);
		}

		/** 根据商品组id取得购买信息
		 * @param groupid  注意这个参数， 在配置表中需要区分是否为0， 如果是0则需要拿商品id
		 */
		public getChargeInfoByGroupId(groupid: number): Pb_God.PBChargeInfo
		{
			return this._chargeInfoMap.get(groupid);
		}

		/** 判断指定类型的商品列表购买状态
		 * @return 0-没有有效商品 1-有已购完的 2-全都都还可以买
		 */
		public getBuyStateByType(type: Pb_God._emChargeType, sonType: number = 0): number
		{
			let chargeCfgInfos = this.getValidChargeListByType(type, sonType);
			if (chargeCfgInfos.length == 0) { return 0; }
			for (let chargeCfgInfo of chargeCfgInfos)
			{
				//可以无限买, 就不存在“买完”了。
				if (chargeCfgInfo.maxBuyCount == 0) { continue; }
				let chargeInfo = this.getChargeInfoByCfgInfo(chargeCfgInfo);
				if (chargeInfo && chargeInfo.buycount >= chargeCfgInfo.maxBuyCount)
				{ return 1; }
			}
			return 2;
		}

		/** 根据购买类型，获取此类型的还可以购买的商品列表（排除已购的）
		 * @param type 充值类型
		 * @param sonType 匹配子类型，如果传入-1， 则忽略数据表中此字段的匹配。
		 */
		public getCanBuyListByType(type: Pb_God._emChargeType, sonType: number = -1): cfg.ChargeCfgInfo[]
		{
			let chargeCfgInfos = this.getValidChargeListByType(type, sonType);
			if (chargeCfgInfos.length <= 0) { return []; }
			let ret = [];
			for (let chargeCfgInfo of chargeCfgInfos)
			{
				//可以无限买。
				if (chargeCfgInfo.maxBuyCount == 0)
				{
					ret.push(chargeCfgInfo);
					continue;
				}
				let chargeInfo = this.getChargeInfoByCfgInfo(chargeCfgInfo);
				if (chargeInfo && chargeInfo.buycount >= chargeCfgInfo.maxBuyCount)
				{ continue; }
				ret.push(chargeCfgInfo);
			}
			return ret;
		}

		/**
		 * 根据平台类型与购买类型的商品的购买条件，筛选对应的商品列表
		 * @param type 充值类型
		 * @param sonType 匹配子类型，如果传入-1， 则忽略数据表中此字段的匹配。
		 */
		public getValidChargeListByType(type: Pb_God._emChargeType, sonType: number = -1): cfg.ChargeCfgInfo[]
		{
			let allList = cfg.ChargeCfgData.getListByType(type, sonType);
			return this.filterValidChargeList(allList);
		}

		/** 过滤列表(剔除条件不足的商品) */
		public filterValidChargeList(chargeCfgList: cfg.ChargeCfgInfo[]): cfg.ChargeCfgInfo[]
		{
			let pid = PlatformData.pid;  //发行商
			//发行商如果是normal，则不限制任何平台，全部显示
			let isLimitPlatform = pid != PlatformData.EnumPlatformId.normal;

			let results: cfg.ChargeCfgInfo[] = [];
			let currTimer = TimeController.currTimer;
			let serStartTime = TimeController.worldCreateZeroTime;
			//过滤同一个groupid的，同一个组的如果符合条件，则取最后一个即可。
			let grpPosMap = {};  //groupid to listIndex
			for (var el of chargeCfgList)
			{
				if (isLimitPlatform && el.platType != pid && el.platType != 0) { continue; }  //0为平台通用
				//判断时间是否开启
				let timeInfo = cfg.ChargeCfgData.getOpenTimeInfoByInfo(el);
				if (timeInfo && !timeInfo.isInOpenTime(currTimer, serStartTime)) { continue; }
				//不满足条件
				if (!this.checkChargeCondition(el.needPreCondition)) { continue; }
				let groupID = el.groupID;
				if (groupID == 0)
				{
					results.push(el); //没有分组的，直接添到列表中。
				}
				else
				{
					//判断同一个groupid是不是已经在列表里面了, 如果有，则直接覆盖，否则就往后添
					let index = grpPosMap[groupID];
					if (index == null)
					{ grpPosMap[groupID] = index = results.length; }
					results[index] = el;
				}
			}
			return results;
		}

		/** 检查商品的前提条件是否成立 */
		private checkChargeCondition(condition: string): boolean
		{
			if (!condition) { return true; }
			let list = condition.split(";");
			for (let el of list)
			{
				let params = el.split("_");
				let type = parseInt(params[0]);
				let value = parseInt(params[1]);
				switch (type)
				{
					case Pb_God._emPreCondition.PreCondition_NeedPlayerLevel: {
						//	需要玩家等级;
						if (PlayerDataMgr.level < value) { return false; }
						break;
					}
					case Pb_God._emPreCondition.PreCondition_NeedVipLevel: {
						//	需要VIP等级;
						if (PrivilegeDataMgr.vipLevel < value) { return false; }
						break;
					}
					case Pb_God._emPreCondition.PreCondition_NeedCard: {
						//	需要特权卡;
						if (!PrivilegeDataMgr.getPrivilegeCardValid(value)) { return false; }
						break;
					}
					case Pb_God._emPreCondition.PreCondition_NeedFightpower: {
						//	需要战力;
						if (PlayerDataMgr.fightPower < value) { return false; }
						break;
					}
					case 1001: {
						//开服周期轮循
						var beginDay = value; //开始天数
						var dayNum = parseInt(params[2]); //周期内显示天数
						var period = parseInt(params[3]); //整个轮循周期的总天数
						let startServerTime = TimeController.worldCreateZeroTime / 1000; //开服时间
						let currTimer = TimeController.currTimer / 1000;
						let curDay = Math.floor((currTimer - startServerTime) / (24 * 3600) % period + 1);
						if (beginDay > curDay || beginDay + dayNum <= curDay) { return false; }
					}
				}
			}
			return true;
		}

		/** 拉起充值 */
		public onChargeRequest(chargeInfo: cfg.ChargeCfgInfo)
		{
			let nowTime = getTimer();
			if (nowTime < this._cdTime)
			{
				TipsUtils.showTipsByLanId("tips_msg79");
				return;
			}
			this._cdTime = nowTime + 3000;
			switch (PlatformData.pid)
			{
				case PlatformData.EnumPlatformId.normal:
					// 如果是平台登陆，一律使用平台支付
					if (!PlatformData.platVarSelfLogin)
					{
						this.handlePay(chargeInfo);
					}
					else
					{
						let appid = ThirdMgr.sdkSystem.getChargeId(chargeInfo);
						TipsUtils.showTips("支付chargeId: " + chargeInfo.iD + " appId:" + appid); //提供给测试用的ID
					}
					break;
				default: {
					this.handlePay(chargeInfo);
					break;
				}
			}
		}

		/**
		 * 请求支付
		 * @param chargeInfo
		 */
		private handlePay(chargeInfo: cfg.ChargeCfgInfo)
		{
			if (chargeInfo.needMoney > 0)
			{
				if (GlobalData.testServerTag)
				{
					TipsUtils.showTips("测试服打印：支付chargeId: " + chargeInfo.iD); //提供给测试用的ID
				}
				// if (!SystemUtils.isIos() && !GameConfig.isInWxGame())//不是ios才显示提示，因为ios切支付不会返回,无法隐藏提示
				// {
				// 	WaitPanelUtils.showWaitPanel(false, Global.getLangStr("platform_chargeing"));
				// }

			}
			let tmpMoneyNum = chargeInfo.needMoney / 100;
			this.payTimestamp = Laya.timer.currTimer;
			//sdk要求拿本机时间。
			let currTimer = Math.floor(this.payTimestamp / 1000);
			let id: any = ThirdMgr.sdkSystem.getChargeId(chargeInfo);
			let orderItem = chargeInfo.iD + "*" + chargeInfo.needMoney + "*" + 1 + "*" + chargeInfo.name + "*" + id;
			// let orderItem = chargeInfo.iD + "*" + chargeInfo.needMoney + "*" + 1 + "*" + tmpMoneyNum + "yuan";
			var clientparam: Pb_God.ClientParam[] = [];
			if (PlatformData.platformType == PlatformData.EnumPlatformType.chuang_sheng)
			{
				if (GameConfig.runTime == RunTimeType.oppo_miniGame)
				{
					var clientVersion: Pb_God.ClientParam = new Pb_God.ClientParam();
					clientVersion.key = "app_version";
					clientVersion.value = ChuanShengOppoConfig.appVersion
					clientparam.push(clientVersion)

					var engineVersion: Pb_God.ClientParam = new Pb_God.ClientParam();
					engineVersion.key = "engine_version";
					engineVersion.value = ChuanShengOppoConfig.platformVersionCode.toString();
					clientparam.push(engineVersion)

					var open_id: Pb_God.ClientParam = new Pb_God.ClientParam();
					open_id.key = "open_id";
					open_id.value = ChuanShengOppoConfig.oppoToken;
					clientparam.push(open_id)

					var timestamp: Pb_God.ClientParam = new Pb_God.ClientParam();
					timestamp.key = "timestamp";

					timestamp.value = this.payTimestamp.toString();
					clientparam.push(timestamp)
					logI("appVersionL:" + ChuanShengOppoConfig.appVersion)
					logI("platformVersionCode:" + ChuanShengOppoConfig.platformVersionCode)
				}
			}
			// eslint-disable-next-line no-console
			logD(clientparam)
			logD(`handlePay:${ chargeInfo.iD }`);
			PlatformSend.charge(ThirdMgr.platform_uid, PlayerDataMgr.logicworldid, PlayerDataMgr.uid,
				null, tmpMoneyNum + "", chargeInfo.iD, currTimer, "", orderItem, "CNY", GlobalData.Version, clientparam);
		}
	}
}
