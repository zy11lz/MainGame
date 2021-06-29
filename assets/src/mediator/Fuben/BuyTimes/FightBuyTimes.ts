
module Pro
{
	/**
	 * 挑战次数信息
	 */
	export class FightBuyTimes extends ProUI.Fuben.BuyTimes.MainUI
	{

		/** 挑战类型 */
		private battleType: Pb_God._emBattleType;
		private customParam = null;

		constructor()
		{
			super();
		}

		public initialization(type: Pb_God._emBattleType, customParam: any = null)
		{

			this.battleType = type;
			this.customParam = customParam;

			this.on(Laya.Event.DISPLAY, this, () =>
			{
				this.addEvent();
				this.show();
			});
			this.on(Laya.Event.UNDISPLAY, this, () =>
			{
				this.removeEvent();
				this.hide();
			});

			//第一次初始化
			this.addEvent();
			this.show();
		}

		private addEvent()
		{
			if (this.battleType == Pb_God._emBattleType.BattleType_Element)
			{
				EventMgr.on(CmdEvent.Element_UpdateCount, this, this.show);
			}
			else if (this.battleType == Pb_God._emBattleType.BattleType_Tower || this.battleType == Pb_God._emBattleType.BattleType_Tower2)
			{
				EventMgr.on(CmdEvent.Train_TowerBuyCount, this, this.show);
				EventMgr.on(CmdEvent.Train_TowerFightCount, this, this.show);
			}
		}

		private removeEvent()
		{
			if (this.battleType == Pb_God._emBattleType.BattleType_Element)
			{
				EventMgr.off(CmdEvent.Element_UpdateCount, this, this.show);
			}
			else if (this.battleType == Pb_God._emBattleType.BattleType_Tower || this.battleType == Pb_God._emBattleType.BattleType_Tower2)
			{
				EventMgr.off(CmdEvent.Train_TowerBuyCount, this, this.show);
				EventMgr.off(CmdEvent.Train_TowerFightCount, this, this.show);
			}
		}

		private show()
		{

			let tmpFreeFightCount = 0;
			let tmpLastFightCount = 0;
			let tmpLastBuyCount = 0;

			if (this.battleType == Pb_God._emBattleType.BattleType_Element)
			{
				tmpFreeFightCount = ElementDataMgr.getFreeFightCount();
				tmpLastFightCount = ElementDataMgr.getDayLastFightCount();
				tmpLastBuyCount = ElementDataMgr.getDayLastBuyCount();
				this.PlusBtn.onClick(this, () => { UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(2)) });
			}
			else if (this.battleType == Pb_God._emBattleType.BattleType_Tower || this.battleType == Pb_God._emBattleType.BattleType_Tower2)
			{
				tmpFreeFightCount = TrainDataMgr.getTowerFreeFightCount();
				tmpLastFightCount = TrainDataMgr.getTowerDayLastFightCount(this.customParam);
				tmpLastBuyCount = TrainDataMgr.getTowerDayLastBuyCount(this.customParam);
				this.PlusBtn.onClick(this, () => { UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(3, this.customParam)) });
			}
			this.TimeLb.text = tmpLastFightCount + "/" + tmpFreeFightCount;
			this.LastBuyTimesLb.text = tmpLastBuyCount.toString();
			this.PlusBtn.disabled = tmpLastBuyCount <= 0;

		}

		private hide()
		{

		}
	}
}