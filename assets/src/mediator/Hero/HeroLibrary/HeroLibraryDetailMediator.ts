
module Pro
{
	/**
	 * 英雄立绘详细界面
	 */
	export class HeroLibraryDetailMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroLibrary.Detail.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("herodraw"), Global.getResPetVDrawSkin(this.UIOpenData.customObject)];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroLibrary.Detail.MainUI, 0, BaseAddLayer.TopUI, false, 1, GameConfig.curWidth(), GameConfig.curHeight());
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.UIPanel.ShareBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroLibraryVDraw, this.UIOpenData.customObject), BaseBackUIType.HideBackUI);
			});
			this.UIPanel.StroyBtn.onClick(this, () =>
			{
				let tmpPetName = cfg.PetSkinCfgData.getFileNameByPetID(this.UIOpenData.customObject);
				let tmpPetDes = cfg.PetCfgData.getDescByPetID(this.UIOpenData.customObject);
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroLibraryStory, [tmpPetName, tmpPetDes]));
			});
			this.UIPanel.DetailBtn.onClick(this, () =>
			{
				let openUIData = new HeroDetailOpenUIData();
				openUIData.isTujian = true;
				openUIData.heroBookCfgInfo = cfg.PetBookCfgData.getLibrayShowPetInfo(this.UIOpenData.customObject);
				UIManager.Inst.forceOpen(openUIData, BaseBackUIType.HideBackUI);
			});
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

			this.UIPanel.PetVDrawImg.skin = Global.getResPetVDrawSkin(this.UIOpenData.customObject);
			this.UIPanel.NameLb.text = cfg.PetSkinCfgData.getFileNameByPetID(this.UIOpenData.customObject);
			Global.setSkillBoxWithPetInfo(this.UIPanel.SkillBox, false, this.UIOpenData.customObject, 0, 0, true);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}
	}
}