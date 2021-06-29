
module Pro
{
	/**
     * 梦幻积分抽卡
	 */
	export class HeroDreamPointsMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroExchange.DreamPoints.MainUI;

		/** 上次选择得 */
		SelectIndex: number = -1;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("dreamPoints")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroExchange.DreamPoints.MainUI, 3, BaseAddLayer.CenterUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.SelectIndex = -1;
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.btnClose.onClick(this, this.closeUI);
			this.UIPanel.btnOneCall.onClick(this, this.onSureClick);
			this.UIPanel.introduceLb.showText = Global.getLangStr("PetCall3_help");
			let tempOneNeedItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(CallDataMgr.getdreamJfenCallAry()[0], 1)[0];
			Global.setResIconWithItemID(this.UIPanel.imgResNum, CfgID.ResType.Item, tempOneNeedItem.itemid);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
			EventMgr.on(CmdEvent.Common_ShowPrize, this, this.onShowPrize);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{
			EventMgr.off(CmdEvent.Common_ShowPrize, this, this.onShowPrize);
		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.refreshCall();
			this.UIPanel.ResNumLb.text = Global.getItemNum(Pb_God._emExpendType.ExpendType_DreamScore).toString();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{
			this.refreshCall();
		}

		/** 刷新道具数量 */
		private onItemNumChange(fID: number, tempNewNum: number): void
		{
			if (fID == Pb_God._emExpendType.ExpendType_DreamScore)
			{
				this.UIPanel.ResNumLb.text = tempNewNum + "";
			}
		}

		private refreshCall()
		{

			for (var index = 0; index < CallDataMgr.getdreamJfenCallAry().length; index++)
			{
				let callElment = this.UIPanel.CallBox.getChildAt(index);
				let Imageelment = this.UIPanel.ImageBox.getChildAt(index);
				let tempOneNeedItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(CallDataMgr.getdreamJfenCallAry()[index], 1)[0];
				
				//卡牌选中和卡牌红点
				let tmpCallBtn = callElment.getChildByName("call") as component.UIButton;
				let tmpCallimage = callElment.getChildByName("checkBox") as Laya.Image;
				let RedDotImg = callElment.getChildByName("RedDotImg") as Laya.Image;
				tmpCallBtn.onClick(this, this.onCallFunClick);
				tmpCallimage.visible = false;
				RedDotImg.visible = tempOneNeedItem.itemcount <= Global.getItemNum(Pb_God._emExpendType.ExpendType_DreamScore);

				//需要积分数量
				let tmpCallLabel = Imageelment.getChildByName("integral") as component.UILabel;
				let integralIcon = Imageelment.getChildByName("integralIcon") as Laya.Image;
				tmpCallLabel.text = tempOneNeedItem.itemcount + "";
				Global.setResIconWithItemID(integralIcon, CfgID.ResType.Item, tempOneNeedItem.itemid);
			}

			if (this.SelectIndex >= 0)
			{
				let tmpOldSelectImg = this.UIPanel.CallBox.getChildAt(this.SelectIndex).getChildByName("checkBox") as Laya.Image
				tmpOldSelectImg.visible = true;
			}
		}

		/** 选择一个准备召唤 */
		private onCallFunClick(btn: component.UIButton)
		{
			let tmpSelectIndex = parseInt(btn.parent.name);
			let tmpOldSelectImg = this.UIPanel.CallBox.getChildAt(tmpSelectIndex).getChildByName("checkBox") as Laya.Image;
			tmpOldSelectImg.visible = true;
			if (this.SelectIndex == tmpSelectIndex)
			{
				return;
			}
			if (this.SelectIndex != -1)
			{
				let tmpOldSelectImg = this.UIPanel.CallBox.getChildAt(this.SelectIndex).getChildByName("checkBox") as Laya.Image;
				tmpOldSelectImg.visible = false;
			}

			this.SelectIndex = tmpSelectIndex;
		}

		/** 确定召唤 */
		private onSureClick()
		{
			if (this.SelectIndex == -1)
			{
				TipsUtils.showTipsByLanId("tips_msg30");
				return;
			}
			let tmpCallType = CallDataMgr.getdreamJfenCallAry()[this.SelectIndex];
			let tempOneNeedItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(tmpCallType, 1)[0];
			if (tempOneNeedItem.itemcount > +this.UIPanel.ResNumLb)
			{
				TipsUtils.showTipsByLanId("tips_msg81");
				return;
			}
			CallDataMgr.sendCall(tmpCallType, false);
		}

		//-------------------------------召唤展示----------------------------------
		private onShowPrize(value: Pb_God.PBG2CCommonShowPrize)
		{
			if (value.doingtype != Pb_God._emDoingType.DoingType_PetCall)
			{
				return;
			}
			AwardOpenUtils.showTimeAwardOpen(value.item as any, value.pet);
		}
	}
}