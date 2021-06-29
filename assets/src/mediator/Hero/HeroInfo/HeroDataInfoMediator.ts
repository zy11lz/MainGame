
module Pro
{
	/**
     * 英雄详细属性查看
     */
	export class HeroDataInfoMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroDataInfo.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroDataInfo.MainUI, 1, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.ZoomBtn.onClick(this, this.onZoomClick);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{

		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			let tmpPetId = this.UIOpenData.customObject[0] as number;
			let tmpHolyLv = this.UIOpenData.customObject[1] as number;
			let tmpHolyAdv = this.UIOpenData.customObject[2] as number;
			let tmpAttAry = this.UIOpenData.customObject[3] as Pb_God.PBAttrInfo[];
			let tmpFactLv = this.UIOpenData.customObject[4] as number;
			let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(tmpPetId);
			let tmpPetJob = cfg.PetCfgData.getPetJobTypeByPetID(tmpPetId);

			this.UIPanel.BaseAtterBox.onRefresh(4, this, (itemUI: ProUI.Utils.AttrInfoItem2UI, index: number) =>
			{
				let tempAttrID = Pb_God._emBattleAttribute.BattleAttribute_Attack + index;
				itemUI.imgType.frame = tempAttrID;
				itemUI.txtTitle.text = cfg.BattleCfgData.getDescByAttrType(tempAttrID);
				itemUI.txtValue.text = Global.getAtterValue(tmpAttAry, tempAttrID).toString();
			});

			this.UIPanel.JIaChengBox.onRefresh(2, this, (itemUI: ProUI.Hero.HeroDataInfo.AtterExInfoUI, index: number) =>
			{
				if (index == 0)
				{
					itemUI.TitleLb.text = Global.getLangStr("hero_msg53") + Global.getResPetJobTypeName(tmpPetJob);
					itemUI.NumLb.text = "lv." + tmpFactLv;
					itemUI.GoBtn.onClick(this, () =>
					{
						TaskUtils.gotoPanel(PanelNotify.Open_FactionMain);
					});
				}
				else if (index == 1)
				{
					itemUI.TitleLb.text = Global.getLangStr("hero_type_name_" + tmpPetType) + Global.getLangStr("hero_msg52");
					itemUI.NumLb.text = "lv." + tmpHolyLv + "(" + Global.getLangStr("attr_stage", tmpHolyAdv) + ")";
					itemUI.GoBtn.onClick(this, () =>
					{
						if(PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Element,true))
						{
							UIManager.Inst.closeCurrentList();
							UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroBag, 2), BaseBackUIType.HideBackUI);
						}
					});
				}
			});

			this.UIPanel.ZoomStatueImg.scaleY = 1;
			this.UIPanel.ZoomBtn.activeEvent();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 显示控制 */
		onZoomClick()
		{

			let tmpAttAry = this.UIOpenData.customObject[3] as Pb_God.PBAttrInfo[];
			let tmpNewScale = this.UIPanel.ZoomStatueImg.scaleY * -1;

			this.UIPanel.ZoomStatueImg.scaleY = tmpNewScale;
			this.UIPanel.BGImg.height = tmpNewScale == -1 ? 638 : 420;
			this.UIPanel.BottomBox.y = tmpNewScale == -1 ? 487 : 255;

			let tmpShowExAtterNum = tmpNewScale == -1 ? 15 : 4;
			this.UIPanel.ExAtterBox.onRefresh(tmpShowExAtterNum, this, (itemUI: ProUI.Utils.AttrInfoItem2UI, index: number) =>
			{
				let tempAttrID = Pb_God._emBattleAttribute.BattleAttribute_CriticalAddRate + index;
				itemUI.imgType.frame = tempAttrID;
				itemUI.txtTitle.text = cfg.BattleCfgData.getDescByAttrType(tempAttrID);
				let rate = Global.getAtterValue(tmpAttAry, tempAttrID) / MAX_PROBABILITY;
				itemUI.txtValue.text = Global.parsePercentNum(rate, 1);
			});
		}
	}
}