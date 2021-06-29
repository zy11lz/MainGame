
module Pro
{
	/**
	 * 好友支援-支援我
	 */
	export class FightSupportMeTable extends ProUI.Fuben.Support.HelpMe.MainUI implements ITableView
	{
		/** 当前增援类型 */
		private _curType: Pb_God._emFriendSupportType = -1;
		/** 战斗力超过上限 */
		private _fightPowerLimitRate = 1.2;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			this.btnAddFriend.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_AddFriend), BaseBackUIType.HideBackUI);
			})
			this.btnFriend.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Friend), BaseBackUIType.HideBackUI);
			})
			// // 	 同步支援信息		PBW2GFriendSupportSync
			//雇佣支援返回			PBU32
			EventMgr.on(Cmd.S2C_Friend_HireSupport.cmdName, this, this.refreshHeroList);
			EventMgr.on(Cmd.S2C_Friend_FireSupport.cmdName, this, this.refreshHeroList);
		}
		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			//雇佣支援返回			PBU32
			EventMgr.off(Cmd.S2C_Friend_HireSupport.cmdName, this, this.refreshHeroList);
			EventMgr.off(Cmd.S2C_Friend_FireSupport.cmdName, this, this.refreshHeroList);
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
		}

		/** 刷新英雄列表 */
		private refreshHeroList(): void
		{
			if (this._curType == -1) return;
			let list = FriendDataMgr.getSupportHeroList(this._curType);
			//当前自己的英雄最高战斗力
			let maxFightPower = PetDataMgr.getMaxFightPower();
			//处理英雄列表， 给英雄增加当前雇佣的一些属性，简化排序效率与重复计算
			for (let el of list)
			{
				el["$supportIsSupport"] = FriendDataMgr.isHiredSupportHero(this._curType, el.sn);
				//战斗力是否超过规定
				el["$supportIsFightPowerOut"] = maxFightPower * this._fightPowerLimitRate < el.fightpower;
			}

			//排个序 已雇佣的放前面， 战斗力超过的放最后， 再按战斗力排序
			list.sort((a: Net.hero, b: Net.hero): number =>
			{
				if (a["$supportIsFightPowerOut"] != b["$supportIsFightPowerOut"]) return a["$supportIsFightPowerOut"] ? 1 : -1;
				if (a["$supportIsSupport"] != b["$supportIsSupport"]) return b["$supportIsSupport"] ? 1 : -1;
				return a.fightpower - b.fightpower;
			});

			let isEmpty = list.length == 0;
			let noFriend = FriendDataMgr.getFriendList().length == 0;
			this.imgEmpty.visible = isEmpty;
			this.btnAddFriend.visible = isEmpty && noFriend;
			this.btnFriend.visible = isEmpty && !noFriend;

			this.ItemList.onRefreshWithArray(list, this, (itemUI: ProUI.Fuben.Support.HelpMe.ListItemUI, index: number) =>
			{
				let hero = list[index];
				let friendInfo: Pb_God.PBPlayerFriendInfo = FriendDataMgr.getFriendInfo(hero.supportMePlayerId);
				let petInfo = cfg.PetCfgData.getInfo(hero.id);
				itemUI.PetJobLb.text = Global.getResPetJobTypeName(petInfo.petJobType);
				itemUI.PetItemUI.setPetInfo(hero, false, false);
				itemUI.PetNameLb.text = cfg.PetSkinCfgData.getFileNameById(hero.useskinid);
				itemUI.PetPowerLb.text = hero.fightpower + "";
				//来自好友
				itemUI.txtFriendName.text = Global.getLangStr("ui_Support_msg1") + friendInfo.display.playername;
				//判断状态
				//战斗力是否超过
				let isFightPowerOut = hero["$supportIsFightPowerOut"];
				//是否已经雇佣
				let isSupport = hero["$supportIsSupport"];

				//是否可以解雇
				let canFire = !!cfg.CommonSupportCfgData.getCanFireByType(this._curType);
				itemUI.StatueLb.visible = isFightPowerOut;
				itemUI.btnCancel.visible = !isFightPowerOut && isSupport && canFire;
				itemUI.btnIsSel.visible = !isFightPowerOut && isSupport && !canFire;
				itemUI.btnSel.visible = !isFightPowerOut && !isSupport;
				itemUI.btnSel.onClick(this, () =>
				{
					//判断雇佣上限
					let canHireCount = cfg.CommonSupportCfgData.getHireCountByType(this._curType);
					let curCount = FriendDataMgr.getHireSupportCount(this._curType);
					if (canHireCount <= curCount)
					{
						TipsUtils.showTipsByLanId("support_msg3");
						return;
					}
					//选择
					FriendSend.hireSupport(this._curType, hero.supportMePlayerId, hero.sn);
				})
				itemUI.btnCancel.onClick(this, () =>
				{
					//取消					
					FriendSend.fireSupport(this._curType, hero.supportMePlayerId, hero.sn);
				})
			});
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		setData($data: any): void
		{
			this._curType = $data;
			let powerLimit = cfg.CommonSupportCfgData.getMaxPowerByType(this._curType);
			this.txtTips.text = Global.getLangStr("support_msg2", powerLimit);
			this._fightPowerLimitRate = powerLimit / 100; //再除100才能成
			this.refreshHeroList();
		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}
	}
}