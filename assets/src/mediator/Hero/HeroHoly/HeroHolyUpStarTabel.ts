
module Pro
{
	/**
     * 圣物升阶
     */
	export class HeroHolyUpStarTabel extends ProUI.Hero.HeroHoly.FunLayer1UI implements ITableView
	{
		/** 圣物类型 */
		holyType: number;
		/** 进阶需要的道具 */
		private _costAry: cfg.AddItemInfo[] = [];

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			this.btnUp.onClick(this, this.onClickUp);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部主动调用,传递参数信息 */
		setData($data: any): void
		{
			let isChange = this.holyType == $data;
			this.holyType = $data;
			this.refreshUI(isChange);
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{

		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{
			this.holyType = -1;
		}

		/** 点击进阶 */
		private onClickUp(): void
		{
			if (!Global.isFullAllRes(this._costAry, true)) return;

			if (!this.selectHeroBox.checkFullHeros(true))
				return;
			HolySend.advance(this.holyType, this.selectHeroBox.getSelectHeros());
		}



		/** 刷新按钮红点 */
		private refreshBtnReddot(): void
		{
			this.imgReddotUp.visible = this.selectHeroBox.checkFullHeros(false) && Global.isFullAllRes(this._costAry, false);
		}

		/** 刷新状态 */
		public refreshUI(isChange: boolean)
		{

			let tmpHolyInfo = HolyDataMgr.getHolyInfo(this.holyType);
			let tmpCurAdvance = tmpHolyInfo.advance + 1; //(Math.floor(Math.max(0, tmpHolyInfo.level - 1) / 10) + 1) * 10;
			let tmpAdvanceInfo = cfg.HolyAdvanceCfgData.getInfoByTypeAndLv(this.holyType, tmpCurAdvance);
			let tmpMaxAdvanNum = tmpAdvanceInfo != null ? tmpAdvanceInfo.level : cfg.HolyAdvanceCfgData.getInfoAryByType(this.holyType).length;

			this.LockLb.text = (tmpAdvanceInfo != null && tmpHolyInfo.level < tmpAdvanceInfo.needHolyLevel) ?
				Global.getLangStr("hero_msg14", tmpAdvanceInfo.needHolyLevel) : "";

			this.StarBox.onRefresh(tmpMaxAdvanNum, this, (itemUI: component.UIFrameImage, index: number) =>
			{
				itemUI.frame = index < tmpHolyInfo.advance ? 1 : 2;
			});

			this.UpAdvanceLayer.visible = tmpAdvanceInfo != null;
			if (this.UpAdvanceLayer.visible)
			{
				this.selectHeroBox.resetData(this.holyType, isChange, cfg.HolyAdvanceCfgData.getNeedPetAryByType(tmpAdvanceInfo.id)[0]);
				this.selectHeroBox.setChangeListener(this, this.refreshBtnReddot);
				//消耗道具
				this._costAry = cfg.HolyAdvanceCfgData.getNeedItemAryByIndex(tmpAdvanceInfo.id);
				let needItem = this._costAry[0];
				Global.setResIconWithItemID(this.imgUpNeedItem, CfgID.ResType.Item, needItem.itemid);
				Global.setResIconWithItemID(this.imgIconNeed, CfgID.ResType.Item, needItem.itemid);
				Global.setResNumWithItemInfo(this.txtUpNeeditem, needItem.itemid, needItem.itemcount, true, true, "#5b545b", "#e60000");
				this.txtUpLabel.text = needItem.itemcount + " " + Global.getLangStr("hero_msg49");
				this.hboxUpBtn.refresh();
				this.refreshBtnReddot();
			}

			this.AdvanceInfoBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroHolyInfo, [this.holyType, tmpHolyInfo.advance]));
			});

			let nextAdvanceInfo = cfg.HolyAdvanceCfgData.getInfoByTypeAndLv(this.holyType, tmpCurAdvance + 1);
			let show_count = 2;
			if (tmpHolyInfo.advance <= 0) show_count = 1;// 当前没有激活圣物
			if (!nextAdvanceInfo) show_count = 1;// 当前已是最大等级
			this.img_arrow.visible = show_count != 1;
			this.SkillBox.onRefresh(show_count, this, (tmpItem: ProUI.Utils.SkillItemUI, index: number) =>
			{
				let advanceInfo = cfg.HolyAdvanceCfgData.getInfoByTypeAndLv(this.holyType, tmpHolyInfo.advance + index);
				if (tmpHolyInfo.advance <= 0)// 没有激活圣物 取对应圣物1阶显示
					advanceInfo = cfg.HolyAdvanceCfgData.getInfoByTypeAndLv(this.holyType, tmpCurAdvance);
				if (!advanceInfo) return;
				tmpItem.LvLb.text = advanceInfo.level.toString();
				tmpItem.IconImg.skin = Global.getResHolyIconSkin(advanceInfo.petType, advanceInfo.level);
				tmpItem.gray = tmpHolyInfo.advance <= 0;//未激活状态

				tmpItem.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroHolyReview, advanceInfo));
				});
			});

		}
	}
}