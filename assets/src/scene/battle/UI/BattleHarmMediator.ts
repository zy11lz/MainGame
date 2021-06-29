
module Pro
{
	/**
	 * 战斗伤害UI
	 */
	export class BattleHarmMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Scene.Battle.Harm.MainUI;


		/** 当前使用的战斗管理器 */
		placeMgr: BatPlaceMgr;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("battleharm")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Scene.Battle.Harm.MainUI, 0, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			BattleHeroBuffTips.closeTip();
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(EventNotify.Zhucheng_Hook_Visible_Changed, this, this.closeUI);
			this.addEventMgr(EventNotify.Battle_Round_Change, this, this.onChangeRound);
			this.addEventMgr(EventNotify.Battle_RecoverPlace, this, this.onRecoverPlace);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.placeMgr = this.UIOpenData.customObject;
			this.UIPanel.OwnNameLb.text = this.placeMgr.getAttackName();
			this.UIPanel.OtherNameLb.text = this.placeMgr.getDefenseName();
			this.refreshUI();
		}

		/** 战斗回合切换 */
		private onChangeRound(batPlaceMgr: BatPlaceMgr): void
		{
			if (batPlaceMgr != this.UIOpenData.customObject)
			{
				return;
			}
			this.refreshUI();
		}

		/** 战斗回收 */
		private onRecoverPlace(batPlaceMgr: BatPlaceMgr)
		{
			if (batPlaceMgr == this.placeMgr)
			{
				this.closeUI();
			}
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{
			this.UIPanel.ItemBox.onRefresh(5, this, this.onItemBoxRender);
		}

		/** ItemRender */
		onItemBoxRender(itemUI: ProUI.Scene.Battle.Harm.HarmItemUI, index: number)
		{
			this.onItemDetailRefresh(true, index, itemUI.OwnPetItem, itemUI.OwnBuffsBox);
			this.onItemDetailRefresh(false, index, itemUI.OtherPetItem, itemUI.OtherBuffsBox);
			itemUI.OwnBtn.onClick(this, () => { this.showHeroBuffTips(true, index) });
			itemUI.OtherBtn.onClick(this, () => { this.showHeroBuffTips(false, index) });
		}

		/** 点击某个英雄，弹出该英雄的buff列表tips */
		private showHeroBuffTips(isOwn: boolean, index: number): void
		{
			let tmpPetList = this.placeMgr.getBattlePetInfos(isOwn);

			let tmpBatPetInfo = tmpPetList[index];
			if (!tmpBatPetInfo) { return; }
			let tmpStandIndex = GameConfig.AtkStandAry[tmpBatPetInfo.pos - 1];
			let tmpPetDisplay = tmpBatPetInfo.pet.display;

			let tmpRoleInfo = this.placeMgr.getRoleMgr().getRoleWithStandIndex(isOwn, tmpStandIndex);
			if (!tmpRoleInfo)
			{
				TipsUtils.showTipsByLanId("tips_msg59");
				return;
			}

			// var pBFightUnitState:Pb_God.PBFightUnitState = this.placeMgr.getRoleMgr().getRoleStat(tmpRoleInfo.roleData.unitId);


			// if (!pBFightUnitState) {
			// 	TipsUtils.showTipsByLanId("tips_msg59");
			// 	return;
			// }
			// let tmpBuffList:Pb_God.PBFightBuffState[] = pBFightUnitState.buff

			let tmpBuffList = tmpRoleInfo.roleData.getBattleBuffMgr().getPoolBuff();
			if (!tmpBuffList || tmpBuffList.length == 0)
			{
				TipsUtils.showTipsByLanId("tips_msg59");
				return;
			}

			let buffMapAryIndex = {};
			let tmpBatBufAry: { buffId: number, count: number, continueRound: number }[] = [];

			for (let i = 0; i < tmpBuffList.length; i++)
			{
				// let fightBuffState:Pb_God.PBFightBuffState = tmpBuffList[i];
				let fightBuffState: BattleBuff = tmpBuffList[i];

				// if (pBFightUnitState.hp.toNumber() <= 0) continue;
				if (fightBuffState.isDelete()) { continue; }
				if (!cfg.BuffNewBuffCfgData.getIconByID(fightBuffState.buffid)) { continue; }
				// let continueRound = fightBuffState.round
				// let layerNum = fightBuffState.layer;
				// let index = buffMapAryIndex[fightBuffState.buffid];
				let continueRound = fightBuffState.getContinueRound();
				let layerNum = fightBuffState.getLayer();
				let index = buffMapAryIndex[fightBuffState.buffid];

				if (index == null)
				{
					buffMapAryIndex[fightBuffState.buffid] = tmpBatBufAry.length;
					tmpBatBufAry[tmpBatBufAry.length] = { buffId: fightBuffState.buffid, count: layerNum, continueRound: continueRound };
				} else
				{
					if (tmpBatBufAry[index].continueRound < continueRound) { tmpBatBufAry[index].continueRound = continueRound; }
					tmpBatBufAry[index].count += layerNum;
				}
			}
			// for (let el of tmpBuffList) {
			// 	if (el.isDelete()) continue;
			// 	if (!cfg.BuffNewBuffCfgData.getIconByID(el.m_uBuffId)) continue;
			// 	let continueRound = el.getContinueRound();
			// 	let layerNum = el.getLayer();
			// 	let index = buffMapAryIndex[el.m_uBuffId];
			// 	if (index == null) {
			// 		buffMapAryIndex[el.m_uBuffId] = tmpBatBufAry.length;
			// 		tmpBatBufAry[tmpBatBufAry.length] = { buffId: el.m_uBuffId, count: layerNum, continueRound: continueRound };
			// 	} else {
			// 		if (tmpBatBufAry[index].continueRound < continueRound) tmpBatBufAry[index].continueRound = continueRound;
			// 		tmpBatBufAry[index].count += layerNum;
			// 	}
			// }
			if (tmpBatBufAry.length <= 0)
			{
				TipsUtils.showTipsByLanId("tips_msg59");
				return;
			}
			BattleHeroBuffTips.show(tmpPetDisplay, tmpBatBufAry);

		}

		/** 显示当前状态 */
		onItemDetailRefresh(isOwn: boolean, index: number, petItemUI: NorItemUI, buffBoxUI: component.UIItemBox)
		{

			let tmpPetList = this.placeMgr.getBattlePetInfos(isOwn);
			if (!tmpPetList) { return; }
			petItemUI.visible = index < tmpPetList.length;
			buffBoxUI.visible = index < tmpPetList.length;
			if (index >= tmpPetList.length)
			{
				return;
			}

			let tmpBatPetInfo = tmpPetList[index];
			let tmpStandIndex = GameConfig.AtkStandAry[tmpBatPetInfo.pos - 1];
			let tmpPetDisplay = tmpBatPetInfo.pet.display;
			let tmpRoleInfo = this.placeMgr.getRoleMgr().getRoleWithStandIndex(isOwn, tmpStandIndex);

			petItemUI.setPetInfo(tmpPetDisplay, false, false);
			petItemUI.DieImg.visible = tmpRoleInfo == null;


			var pBFightUnitState: Pb_God.PBFightUnitState = this.placeMgr.getRoleStat(tmpRoleInfo.roleData.unitId);
			// let tmpBuffList:Pb_God.PBFightBuffState[] = pBFightUnitState == null ? null : pBFightUnitState.buff

			let tmpBuffList = tmpRoleInfo == null ? null : tmpRoleInfo.roleData.getBattleBuffMgr().getPoolBuff();

			let tmpBuffCount = tmpBuffList == null ? 0 : tmpBuffList.length;
			if (tmpBuffCount > 0)
			{
				// let tmpBatBufAry = new Array<Pb_God.PBFightBuffState>();
				let tmpBatBufAry = new Array<BattleBuff>();
				tmpBuffList.forEach(elment =>
				{
					if (!elment.isDelete())
					{
						let tmpIcName = cfg.BuffNewBuffCfgData.getIconByID(elment.buffid);
						if (tmpIcName.length > 0 && tmpBatBufAry.indexOf(elment) == -1) { tmpBatBufAry.push(elment); }
					}
				});

				buffBoxUI.onRefresh(tmpBatBufAry.length, this, (buffIcon: Laya.Image, buffIndex: number) =>
				{
					let tmpBuffInfo = tmpBatBufAry[buffIndex];
					Global.setResIconWithItemID(buffIcon, CfgID.ResType.Buff, tmpBuffInfo.buffid);
				});
			}
			else
			{
				buffBoxUI.onRefresh(0, null, null);
			}
		}
	}
}