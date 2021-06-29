
module Pro
{
	/**
	 * 英雄合并
	 */
	export class HeroCombinMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroCombin.MainUI;

		/** UI打开参数 */
		UIOpenData: HeroViewInfoOpenUIData;

		/** 升星数据列表 */
		TmpMyHeroCfgList: Array<cfg.PetUpStarCfgInfo>;

		/** 当前选择的英雄类型索引 */
		TmpSelectHeroTypeIndex = -1;

		/** 当前选择的英雄索引 */
		TmpSelectHeroIndex = -1;

		/** 角色动画控制器 */
		private RoleInfo: BaseRole = null;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("herocombin")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroCombin.MainUI, 3);
		}

		/** 关闭UI*/
		closeUI(): void
		{

			this.closePanel();

			if (this.RoleInfo != null)
			{
				Global.removeBaseRole(this.RoleInfo);
				this.RoleInfo = null;
			}
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

			this.adjustScreenPos();
		}

		private adjustScreenPos()
		{
			this.UIPanel.height = GameConfig.curHeight();
			this.UIPanel.y = 0;
		}
		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.UIPanel.HelpBtn.onClick(this, this.onHelpClick);
			this.UIPanel.btnClose.onClick(this, this.closeUI);
			this.UIPanel.PetViewBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new HeroViewInfoOpenUIData().initPetCfg(this.TmpMyHeroCfgList[this.TmpSelectHeroIndex]));
			});
			this.addEventMgr(EventNotify.Pet_Star_Changed, this, this.onPetChanged);
			this.addEventMgr(EventNotify.Pet_Changed, this, this.onPetChanged);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.refreshHeroType();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 伙伴和碎片变化 */
		onPetChanged()
		{
			Laya.timer.callLater(this, () =>
			{
				this.refreshHeroType();
			});
		}

		/** 点击了帮助 */
		onHelpClick(btn: component.UIButton)
		{
			let content = Global.getLangStr("heroSplit_des_3");
			CommonHelpView.show(btn, content);
		}

		//---------------------------英雄属性------------------------------
		private refreshPetInfo(petCfg: cfg.PetUpStarCfgInfo)
		{
			if (this.RoleInfo == null)
			{
				this.RoleInfo = Global.createBaseRoleForPreview(this.UIPanel.PetPreview);
			}
			let tmpModelID = cfg.PetCfgData.getSkinInfoByPetID(petCfg.petID).id;
			this.RoleInfo.resetRes(tmpModelID, RoleResType.Show, true);
			var showScale = cfg.PetSkinCfgData.getShowScaleById(tmpModelID);
			this.RoleInfo.scale(showScale, showScale);

			Global.setResPetType(this.UIPanel.PetTypeImg, cfg.PetCfgData.getPetTypeByPetID(petCfg.petID));
			this.UIPanel.PetNameLb.text = cfg.PetSkinCfgData.getFileNameById(tmpModelID);// cfg.PetCfgData.getNameByPetID(petCfg.petID);
			this.UIPanel.StarBox.setStar(petCfg.star);


			let bookCfgInfo = cfg.PetBookCfgData.getInfoByDoubleKey(petCfg.petID, petCfg.star);

			this.UIPanel.PetLvLb.text = Global.getLangStr("common_level2", bookCfgInfo ? bookCfgInfo.maxLevel : 100);//等级:100";

			let tmpAtterAry = cfg.PetBookCfgData.getAddAttrListInfoByCfgInfo(bookCfgInfo);
			this.UIPanel.PetAtkLb.text = Global.getAtterValue(tmpAtterAry, Pb_God._emBattleAttribute.BattleAttribute_Attack).toString();
			this.UIPanel.PetDefenseLb.text = Global.getAtterValue(tmpAtterAry, Pb_God._emBattleAttribute.BattleAttribute_Defense).toString();
			this.UIPanel.PetHpLb.text = Global.getAtterValue(tmpAtterAry, Pb_God._emBattleAttribute.BattleAttribute_HPMax).toString();
			this.UIPanel.PetSpeedLb.text = Global.getAtterValue(tmpAtterAry, Pb_God._emBattleAttribute.BattleAttribute_Speed).toString();
		}

		//---------------------------英雄类型------------------------------
		/** 刷新英雄类型 */
		private refreshHeroType()
		{

			this.TmpSelectHeroTypeIndex = -1;
			this.UIPanel.HeroTypeBox.onRefresh(6, this, (itemUI: component.UIButton, index: number) =>
			{

				let tmpHeroType = index;
				Global.setResPetType(itemUI, tmpHeroType);
				itemUI.onClick(this, this.onHeroTypeClick);

				let tmpFullResults = cfg.PetUpStarCfgData.getDataList().filter(elment => (cfg.PetCfgData.getPetTypeByPetID(elment.petID) == tmpHeroType || tmpHeroType == 0) && elment["combinProInfoFull"])
				let tmpRedDotImg = itemUI.getChildAt(0) as Laya.Image;
				tmpRedDotImg.visible = tmpFullResults.length > 0;

				if (this.TmpSelectHeroTypeIndex == -1)
				{
					this.onHeroTypeClick(itemUI);
				}
			});
		}

		/** 选择一个英雄类型 */
		private onHeroTypeClick(btn: component.UIButton)
		{
			this.UIPanel.HeroTypeSelectImg.x = btn.x;
			this.UIPanel.HeroTypeSelectImg.y = btn.y;
			this.TmpSelectHeroTypeIndex = parseInt(btn.name);
			this.refreshPetList();
		}

		//---------------------------英雄分解------------------------------
		private choicePetSpinWithHeroType(heroType: number)
		{

			if (this.TmpMyHeroCfgList == null)
			{
				this.TmpMyHeroCfgList = [];
			}
			else
			{
				this.TmpMyHeroCfgList.splice(0, this.TmpMyHeroCfgList.length);
			}

			let tmpAry = cfg.PetUpStarCfgData.getDataList();
			tmpAry.forEach(elment =>
			{
				if (elment.star <= 6 && (cfg.PetCfgData.getPetTypeByPetID(elment.petID) == heroType || heroType == 0))
				{
					this.TmpMyHeroCfgList.push(elment);
				}
			});

			this.TmpMyHeroCfgList.sort((a: cfg.PetUpStarCfgInfo, b: cfg.PetUpStarCfgInfo): number =>
			{
				if (a["combinProInfoFull"] && !b["combinProInfoFull"]) { return -1; }
				else if (!a["combinProInfoFull"] && b["combinProInfoFull"]) { return 1; }
				else if (a.star < b.star) { return -1; }
				else if (a.star > b.star) { return 1; }
				else if (a.id < b.id) { return -1; }
				else if (a.id > b.id) { return 1; }
				else { return 0; }
			});
		}

		private refreshPetList()
		{
			this.TmpSelectHeroIndex = -1;
			this.choicePetSpinWithHeroType(this.TmpSelectHeroTypeIndex);
			this.UIPanel.ItemList.onRefresh(this.TmpMyHeroCfgList.length, this, (itemUI: NorItemUI, index: number) =>
			{

				let tmpInfo = this.TmpMyHeroCfgList[index];
				let skinId = cfg.PetCfgData.getBaseSkinByPetID(tmpInfo.petID);
				itemUI.setPetUI(skinId, tmpInfo.star);
				itemUI.onClick(this, this.onPetChoiceClick);

				//显示进度
				let tmpCombinAry = tmpInfo["combinProInfo"];
				itemUI.setBloodProgress(tmpCombinAry[0] / tmpCombinAry[1]);
				itemUI.BloodLb.text = tmpCombinAry[0] + "/" + tmpCombinAry[1];
				itemUI.BloodLb.visible = true;
				itemUI.RedDotImg.visible = tmpInfo["combinProInfoFull"];

				if (this.TmpSelectHeroIndex == -1)
				{
					this.onPetChoiceClick(itemUI);
				}
			});
		}

		private onPetChoiceClick(btn: NorItemUI)
		{
			this.TmpSelectHeroIndex = parseInt(btn.name);
			let tmpInfo = this.TmpMyHeroCfgList[this.TmpSelectHeroIndex];
			// let skinId = cfg.PetCfgData.getBaseSkinByPetID(tmpInfo.petID);
			this.UIPanel.UpStarInfo.discharge = false;
			this.UIPanel.UpStarInfo.init(null, tmpInfo.petID, tmpInfo.star, true);
			this.UIPanel.UpStarInfo.setAutoVisible(tmpInfo.star <= 5);
			this.refreshPetInfo(tmpInfo);
		}
	}
}