
module Pro
{
	/**
	 * 我参与的助阵
	 */
	export class FightToSupportTable extends ProUI.Fuben.Support.ToHelp.MainUI implements ITableView
	{
		/** 当前增援类型 */
		private _curType: Pb_God._emFriendSupportType = -1;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			//	 派遣支援返回		PBPlayerSendSupportHero
			EventMgr.on(Cmd.S2C_Friend_SendSupport.cmdName, this, this.onSendSupport);
		}
		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			//	 派遣支援返回		PBPlayerSendSupportHero
			EventMgr.off(Cmd.S2C_Friend_SendSupport.cmdName, this, this.onSendSupport);
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
		}

		/*****
		 *	 派遣支援返回		PBPlayerSendSupportHero
		 * @param PBPlayerSendSupportHero
		 * 		type			uint32	 _emFriendSupportType
		 * 		petsn			uint64	 支援英雄sn
		 */
		protected onSendSupport(value: Pb_God.PBPlayerSendSupportHero): void
		{
			this.refreshHeroList();
		}

		/** 刷新英雄列表 */
		private refreshHeroList(): void
		{
			if (this._curType == -1) return;
			//当前派遣的英雄列表
			let supportHeros = FriendDataMgr.getSendSupportHeros(this._curType);
			let hasSel = supportHeros.length > 0;
			this.noSelect.visible = !hasSel;
			this.SelectInfoList.visible = hasSel;

			let supportHerosMap = Global.listToStringMapData(supportHeros, "sn");

			//所有英雄列表
			let allHeros = PetDataMgr.getPetList();
			let bgSelHeight = 0;
			if (hasSel)
			{
				this.SelectInfoList.onRefresh(supportHeros.length, this, (itemUI: ProUI.Fuben.Support.ToHelp.ListItemUI, index: number) =>
				{
					this.refreshSingleItem(itemUI, supportHeros[index], true);
				});
				bgSelHeight = this.SelectInfoList.y + this.SelectInfoList.getCellTrueHeight() + 12;
				allHeros = allHeros.concat(); //复制一份，不要影响原数组
				//所有英雄列表中，需要排除已经派遣的显示
				for (var i = 0; i < allHeros.length; i++)
				{
					if (supportHerosMap.get(allHeros[i].sn + ""))
					{
						allHeros.splice(i, 1);
						break;
					}
				}
			} else
			{
				bgSelHeight = this.noSelect.y + this.noSelect.height + 12;
			}
			this.bgSelList.height = bgSelHeight;
			this.bgWaitList.height = 622 - bgSelHeight;

			this.ItemList.onRefreshWithArray(allHeros, this, (itemUI: ProUI.Fuben.Support.ToHelp.ListItemUI, index: number) =>
			{
				this.refreshSingleItem(itemUI, allHeros[index], false);
			});
		}

		private refreshSingleItem(itemUI: ProUI.Fuben.Support.ToHelp.ListItemUI, hero: Net.hero, isSendSupport: boolean)
		{
			let petInfo = cfg.PetCfgData.getInfo(hero.id);
			itemUI.PetJobLb.text = Global.getResPetJobTypeName(petInfo.petJobType);
			itemUI.PetItemUI.setPetInfo(hero, false, false);
			itemUI.PetNameLb.text = cfg.PetSkinCfgData.getFileNameById(hero.useskinid);
			itemUI.PetPowerLb.text = hero.fightpower + "";
			itemUI.StatueLb.visible = isSendSupport;
			itemUI.ChoiceBtn.visible = !isSendSupport;
			itemUI.ChoiceBtn.onClick(this, () =>
			{
				let maxSupportCount = cfg.CommonSupportCfgData.getSendCountByType(this._curType);
				if (FriendDataMgr.getSendSupportHeros(this._curType).length >= maxSupportCount)
				{
					TipsUtils.showTipsByLanId("support_msg4");
					return;
				}
				FriendSend.sendSupport(this._curType, hero.sn);
			})
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		setData($data: any): void
		{
			this._curType = $data;
			this.refreshHeroList();
		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}
	}
}