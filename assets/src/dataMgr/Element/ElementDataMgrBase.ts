
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
	export class ElementDataMgrBase
	{
		/** data */
		protected _data: Pb_God.PBPlayerElement;
		/** 红点初始化 */
    	protected initRedDot:boolean = false;
		/** 活动周 */
		protected _activityWeek = 0;

		/** 初始化 */
		public init(data: Pb_God.PBPlayerElement)
		{
			this._data = data;
			this.refreshActivityWeek();
			this.initRedDotModel();
		}

		/** 刷新boss关 */
		public refreshActivityWeek()
		{
			let uCurWeek = Math.floor(PlayerDataMgr.serverOpenDays / 7);
			if (PlayerDataMgr.serverOpenDays % 7 != 0)
			{
				uCurWeek += 1;
			}
			uCurWeek = (uCurWeek - 1) % 4 + 1;
			this._activityWeek = uCurWeek;
		}

		/** 跨时间 */
		public resetNewDay()
		{
			this._data.daybuycount = 0;
			this._data.dayfightcount = 0;
			this.refreshActivityWeek();
			this.reddotModel.refresh();
			EventMgr.trigger(CmdEvent.Element_UpdateCount);
		}

		/** 跨时间 自然周*/
		public resetNewWeek()
		{
			for (let i = 0; i < this._data.info.length; i++) {
				let info = this._data.info[i];
				info.daymaxstage = 0;
			}
		}

		/** 每日免费挑战次数 */
		public getFreeFightCount(): number
		{
			return cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_ElementFreeCount) +
				PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_ElementFreeCount) +
				PrivilegeDataMgr.getPrivilegeCardValue(Pb_God._emPrivilegeCard.PrivilegeCard_Element, Pb_God._emPrivilegeType.PrivilegeType_ElementFreeCount);
		}

		/** 今日剩余购买次数 */
		public getDayLastBuyCount(): number
		{
			let tmpFreeTimes = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_ElementBuyCount) +
				PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_ElementBuyCount) +
				PrivilegeDataMgr.getPrivilegeCardValue(Pb_God._emPrivilegeCard.PrivilegeCard_Element, Pb_God._emPrivilegeType.PrivilegeType_ElementBuyCount);
			return tmpFreeTimes - this.getDayBuyCount();
		}

		/** 今日购买次数 */
		public getDayBuyCount(): number
		{
			return this._data.daybuycount;
		}

		/** 今日挑战次数 */
		public getDayfightcount(): number
		{
			return this._data.dayfightcount;
		}

		/** 本次处于活动周 */
		public getActivityWeek(): number
		{
			return this._activityWeek;
		}

		/** 今日最高关卡 */
		public getDayMaxStageWithType(petType: Pb_God._emPetType)
		{
			let results = this._data.info.filter(elment => elment.pettype == petType);
			if (results.length == 0)
			{
				return 0;
			}
			else
			{
				return results[0].daymaxstage;
			}
		}

		/** 历史最高关卡 */
		public getMaxStageWithType(petType: Pb_God._emPetType)
		{
			let results = this._data.info.filter(elment => elment.pettype == petType);
			if (results.length == 0)
			{
				return 0;
			}
			else
			{
				return results[0].maxstage;
			}
		}


		/** 今日剩余挑战次数 */
		public getDayLastFightCount(): number
		{
			return this.getFreeFightCount() + this.getDayBuyCount() - this.getDayfightcount();
		}

		//////////////////红点///////////////
		public reddotModel: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			if(!this.initRedDot)
			{
				this.reddotModel.cleanUp(true);
				this.reddotModel.setSystemSwitchId(Pro.emSystemSwitchType.Element);
				this.reddotModel.setupCheckMethod(this, this.getRedDot);
			}
			this.initRedDot = true;
		}
		/** 红点信息 */
		private getRedDot(): number
		{
			//有剩余挑战次数
			if (this.getDayLastFightCount() > 0) return 1;
			return 0;
		}
	}
}
