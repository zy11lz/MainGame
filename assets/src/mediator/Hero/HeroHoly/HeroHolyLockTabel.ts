
module Pro
{
	/**
     * 圣物解锁
     */
	export class HeroHolyLockTabel extends ProUI.Hero.HeroHoly.FunLayerLockUI implements ITableView
	{

		/** 圣物类型 */
		holyType: number = -1;

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
			this.btnUnlock.onClick(this, this.onClickUnlock);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部主动调用,传递参数信息 */
		setData($data: any): void
		{
			let isChange = this.holyType != $data;
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

		/** 点击解锁按钮 */
		private onClickUnlock(): void
		{
			if (!this.selectHeroBox.checkFullHeros(true))
				return;
			HolySend.unlock(this.holyType, this.selectHeroBox.getSelectHeros());
		}



		/** 刷新状态 */
		public refreshUI(isChange: boolean)
		{
			let tmpHolyTypeStr = Global.getLangStr("hero_type_name_" + this.holyType);
			this.Des1Lb.text = Global.getLangStr("holy_des_" + this.holyType);
			this.Des2Lb.text = Global.getLangStr("holy_des_mini", tmpHolyTypeStr);

			this.selectHeroBox.resetData(this.holyType, isChange, cfg.HolyUnlockCfgData.getNeedPetAryByType(this.holyType)[0]);
		}


	}
}