
module Pro
{
	/**
	* 合成符文
	*/
	export class ItemCombinRuneTabel extends ProUI.ItemCombin.Rune.MainUI implements ITableView
	{

		/** 选择好的符文 */
		RuneList: Array<Pb_God.PBItem> = [];

		/** 进度条特效 */
		Rune_Prog_Eff: EffNode = null;

		/** 进度条头部特效 */
		Rune_Prog_top_Eff: EffNode = null;

		private _reddotBindCtl: ReddotBindImageController = new ReddotBindImageController();

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			for (let i = 0; i < this.SelectBox._children.length; i++)
			{
				let tmpBtn = this.SelectBox._children[i] as component.UIButton;
				tmpBtn.name = i.toString();
				tmpBtn.onClick(this, this.onChoiceRuneClick);
			}
			this.CombinBtn.onClick(this, this.onCombinClick);
			this.AutoCombinBtn.onClick(this, this.onAutoCombinClick);
			this.HelpBtn.onClick(this, this.onHelpClick);
			this.SkillBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombinRuneSkill));
			});
			this.CombinNumBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombinRuneReward));
			});

		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			EventMgr.on(EventNotify.ItemCombin_Rune_Choice, this, this.onItemCombin_Rune_Choice);
			EventMgr.on(Cmd.S2C_Item_RuneCompound.cmdName, this, this.onItem_RuneCompound);
			EventMgr.on(EventNotify.PlayerItemNumChange, this, this.show);
		}
		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			EventMgr.off(EventNotify.ItemCombin_Rune_Choice, this, this.onItemCombin_Rune_Choice);
			EventMgr.off(Cmd.S2C_Item_RuneCompound.cmdName, this, this.onItem_RuneCompound);
			EventMgr.off(EventNotify.PlayerItemNumChange, this, this.show);
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			if (this.Rune_Prog_Eff == null)
			{
				this.Rune_Prog_Eff = EffectMgr.Inst.createEffectOne("ui_runeCombin_prog", new Laya.Point(25.5, 162), -1, 1, 1, this.CombinProEffBox, false, ResReleaseType.Reference);
			}
			if (this.Rune_Prog_top_Eff == null)
			{
				let tmpRuneTopPos = new Laya.Point(this.CombinProEffBox.x + this.CombinProEffBox.width / 2, + this.CombinProEffBox.y + this.CombinProEffBox.height);
				this.Rune_Prog_top_Eff = EffectMgr.Inst.createEffectOne("ui_runeCombin_top", tmpRuneTopPos, -1, 1, 1, this, false, ResReleaseType.Reference);
				this.setChildIndex(this.Rune_Prog_top_Eff, this.CombinProEffBox.zOrder + 1);
			}


			this.RuneList.splice(0, this.RuneList.length);
			this.refreshSelectRune();
			this.refreshRonglianNum();
			this._reddotBindCtl.bind(this.RedDotCombine, ItemDataMgr.reddotModelRuneCombine);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{
			Laya.timer.clear(this, this.onEffectFinish);

			if (this.Rune_Prog_Eff != null)
			{
				EffectMgr.Inst.releaseEffect(this.Rune_Prog_Eff);
				this.Rune_Prog_Eff = null;
			}
			if (this.Rune_Prog_top_Eff != null)
			{
				EffectMgr.Inst.releaseEffect(this.Rune_Prog_top_Eff);
				this.Rune_Prog_top_Eff = null;
			}
			this._reddotBindCtl.cleanUp();
		}

		setData($data: any): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		/** 合成 */
		onCombinClick()
		{
			if (this.RuneList.length < 2)
			{
				TipsUtils.showTipsByLanId("tips_msg33");
				return;
			}

			let tmpCombinInfo = cfg.RuneCompoundCfgData.getInfoWithNeedItemID(this.RuneList[0].itemid);
			// 合成符文等级限制
			let need_lv = tmpCombinInfo.needPlayerLevel;
			if (PlayerDataMgr.level < need_lv)
			{
				TipsUtils.showTips(Global.getLangStr("ui_Bag_RuneEquip_msg8", need_lv, cfg.ItemCfgData.getNameById(tmpCombinInfo.itemID)));
				return;
			}

			let tmpNeedExpend = cfg.RuneCompoundCfgData.getNeedExpendInfo(tmpCombinInfo.itemID);
			if (!Global.isFullRes(tmpNeedExpend.itemid, tmpNeedExpend.itemcount * (this.RuneList.length - 1)))
			{
				return;
			}

			let tmpSnAry = [];
			this.RuneList.forEach(elment => { tmpSnAry.push(elment.itemsn); });
			let tmpCountRateAry = cfg.RuneCompoundCfgData.getCountRateAryById(tmpCombinInfo.itemID);
			if (tmpCountRateAry[this.RuneList.length - 2].value2 / 100 < 100)
			{
				AlertShow.showConfirmAlert(Global.getLangStr("item_combin_msg12"), this, () =>
				{
					ItemSend.runeCompound(tmpCombinInfo.itemID, tmpSnAry);
				}, "common_confirm", "common_cancel", 0, 0, PlayerDataMgr.uid + "_GemstoneSynthesis");
			} else
			{
				ItemSend.runeCompound(tmpCombinInfo.itemID, tmpSnAry);
			}


		}

		/** 合成完毕 */
		onItem_RuneCompound(value: Pb_God.PBItemSn)
		{
			let tmpEffPos = new Laya.Point(this.CombinItem.x, this.CombinItem.y + 120);
			let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_runeCombin_Succ", tmpEffPos, null, 1, 1, this, true, ResReleaseType.Reference);
			Laya.timer.once(tmpEffNode.effAllTime, this, this.onEffectFinish, [value]);
		}

		/** 合成特效播放完毕 */
		onEffectFinish(value: Pb_God.PBItemSn)
		{

			this.show();

			if (!value.itemsn || value.itemsn.toNumber() == 0)
			{//合成失败
				TipsUtils.showTipsByLanId("item_combin_msg6");
				return;
			}

			AwardOpenUtils.showAwardOpen([ItemDataMgr.getBagPBItem(value.itemsn)], null);
		}


		/** 一键添加 */
		onAutoCombinClick()
		{

			this.RuneList.splice(0, this.RuneList.length);

			let tmpRuneList = ItemDataMgr.getRuneAryForCombin();
			for (let i = 0; i < tmpRuneList.length; i++)
			{
				let tmpInfo = tmpRuneList[i];
				if (this.RuneList.length >= 1)
				{
					let tmpFirstInfo = this.RuneList[0];
					if (tmpInfo.itemid == tmpFirstInfo.itemid)
					{
						this.RuneList.push(tmpInfo);
						if (this.RuneList.length >= 5)
						{
							break;
						}
					}
					else if (this.RuneList.length == 1)
					{
						this.RuneList.splice(0, 1);
					}
				}
				else
				{
					this.RuneList.push(tmpInfo);
				}
			}

			if (this.RuneList.length == 1)
			{
				this.RuneList.splice(0, 1);
			}

			this.refreshSelectRune();
		}

		/** 问好 */
		onHelpClick(btn: component.UIButton)
		{
			CommonHelpView.showWithLangKey(btn, "fuwenduanzao_help");
		}

		/** 选择符文 */
		onChoiceRuneClick(btn: component.UIButton)
		{
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombinRuneChoice, this.RuneList));
		}

		/** 选择完符文 */
		onItemCombin_Rune_Choice(runeList: Array<Pb_God.PBItem>)
		{
			this.RuneList = runeList;
			this.refreshSelectRune();
		}

		/** 刷新选择得符文信息 */
		refreshSelectRune()
		{

			//选择得符文
			for (let i = 0; i < this.SelectBox._children.length; i++)
			{
				let tmpItemUI = this.SelectBox._children[i] as ProUI.ItemCombin.Rune.RuneItemUI;
				tmpItemUI.IconImg.visible = i < this.RuneList.length;
				tmpItemUI.EffImg.visible = i < this.RuneList.length;
				tmpItemUI.PlusImg.visible = i >= this.RuneList.length;
				if (tmpItemUI.IconImg.visible)
				{
					let tmpInfo = this.RuneList[i];
					Global.setResIconWithItemID(tmpItemUI.IconImg, CfgID.ResType.Item, tmpInfo.itemid);
				}
			}

			//合成信息
			this.CombinInfo.visible = this.RuneList.length > 0;
			this.CombinItem.IconImg.visible = this.RuneList.length > 0;
			this.CombinItem.EffImg.visible = this.RuneList.length > 0;
			this.CombinItem.PlusImg.visible = false;

			if (this.RuneList.length > 0)
			{
				let tmpCombinInfo = cfg.RuneCompoundCfgData.getInfoWithNeedItemID(this.RuneList[0].itemid);
				let tmpNeedExpend = cfg.RuneCompoundCfgData.getNeedExpendInfo(tmpCombinInfo.itemID);
				let tmpCountRateAry = cfg.RuneCompoundCfgData.getCountRateAryById(tmpCombinInfo.itemID);

				//合成消耗
				Global.setResIconWithItemID(this.CombinCostImg, CfgID.ResType.Item, tmpNeedExpend.itemid);
				Global.setResNumWithItemInfo(this.CombinCostLb, tmpNeedExpend.itemid, tmpNeedExpend.itemcount * (this.RuneList.length - 1));
				this.CombinProLb.text = this.RuneList.length >= 2 ? Global.getLangStr("item_combin_msg10", tmpCountRateAry[this.RuneList.length - 2].value2 / 100) :
					Global.getLangStr("item_combin_msg11");

				//合成符文
				let tempCombinItem = new Pb_God.PBItem();
				tempCombinItem.itemid = tmpCombinInfo.itemID;
				Global.setResIconWithItemID(this.CombinItem.IconImg, CfgID.ResType.Item, tmpCombinInfo.itemID);
				this.CombinItem.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tempCombinItem));
				});
			}

		}

		/** 刷新熔炼值 */
		refreshRonglianNum()
		{
			let tmpMaxNum = ItemDataMgr.getRuneExchangeScore();
			let tmpCurNum = Global.getItemNum(CfgID.ItemID.RonglianRuneScore);
			let tmpPerect = Math.min(1, tmpCurNum / tmpMaxNum);
			this.CombinNumLb.text = tmpCurNum.toString();
			this.CombinProImg.height = tmpPerect * 325;
			this.Rune_Prog_top_Eff.y = this.CombinProEffBox.y + this.CombinProEffBox.height * (1 - tmpPerect);
		}
	}
}