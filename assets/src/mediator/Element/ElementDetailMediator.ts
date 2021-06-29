
module Pro
{
	/**
	 * 元素神殿详细信息
	 */
	export class ElementDetailMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Element.Detail.MainUI;


		/** 选择的关卡类型 */
		TmpStageType: Pb_God._emPetType;

		/** 当前类型最大通关 */
		TmpDayMaxStage: number;

		/**  选择副本今日剩余进入次数 */
		TempFubenLastFightCount;

		/** 选择副本今日剩余购买次数 */
		TempFubenLastBuyCount;

		/** 关卡数据 */
		TmpDataList: Array<cfg.ElementStageCfgInfo>;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("elementDetail")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return ["res/elementDetail/yuansushengdian_pet_01.png",
				"res/elementDetail/yuansushengdian_pet_02.png",
				"res/elementDetail/yuansushengdian_pet_03.png",
				"res/elementDetail/yuansushengdian_pet_04.png",
				"res/elementDetail/yuansushengdian_pet_05.png"]
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Element.Detail.MainUI, 3);
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

			//设置购买战斗次数信息
			this.UIPanel.BuyTimesInfo.initialization(Pb_God._emBattleType.BattleType_Element);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(CmdEvent.Element_UpdateCount, this, this.refreshElementInfo);
			this.addEventMgr(CmdEvent.Element_UpdateStage, this, this.refreshElementInfo);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.TmpStageType = this.UIOpenData.customObject;
			this.refreshElementInfo();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 刷新元素信息 */
		refreshElementInfo()
		{
			this.TmpDayMaxStage = ElementDataMgr.getDayMaxStageWithType(this.TmpStageType);
			this.TempFubenLastFightCount = ElementDataMgr.getDayLastFightCount();
			this.TempFubenLastBuyCount = ElementDataMgr.getDayLastBuyCount();

			this.TmpDataList = cfg.ElementStageCfgData.getInfoWithType(ElementDataMgr.getActivityWeek(), this.TmpStageType);
			let tmpShowMaxNum = Math.min(this.TmpDayMaxStage >= 6 ? this.TmpDayMaxStage + 1 : 6, this.TmpDataList.length);
			this.UIPanel.ItemList.onRefresh(tmpShowMaxNum, this, this.onItemListRender);

			//boss信息
			let tmpElementInfo = this.TmpDataList[0];
			let tmpNeedTypeInfo = cfg.ElementStageCfgData.getNeedPetTypeAryById(tmpElementInfo.index);
			let bossMonster = cfg.ElementMonsterNewCfgData.getBossMonsterInfoById(tmpElementInfo.monster);
			// boss对应角色id
			let skinId = bossMonster.skinId;
			let skinInfo = cfg.PetSkinCfgData.getInfo(skinId);
			let bossinfo = cfg.PetCfgData.getInfo(skinInfo.petID);
			this.UIPanel.BossNameLb.text = skinInfo.fileName;
			this.UIPanel.KezhiInfoLb.innerHTML = Global.getLangStr("element_msg1", Global.getLangStr("hero_type_name_" + tmpNeedTypeInfo.value1));
			this.setNameBgSkin(bossinfo.petType);
			/* 元素圣殿前端技能显示，三个图标：
				1、第1个技能，和圣殿的种类相关，可配在元素圣殿表中。
				2、后2个技能显示Boss的被动技能。 */
			let skillIds = [];
			skillIds[0] = cfg.ElementStageCfgData.getBossSkillIdByIndex(tmpElementInfo.index);
			for (var skillInfo of cfg.PetSkinCfgData.getAddSkillAryById(skinId))
			{
				let skillCfg = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(skillInfo.value1, 1);
				if (skillCfg && skillCfg.skillType == 1) skillIds.push(skillCfg.skillID);
			}

			this.UIPanel.SkillBox.onRefresh(skillIds.length, this, (tmpUI: ProUI.Utils.SkillItemUI, index: number) =>
			{
				let skillId = skillIds[index];
				Global.setSkilItem(tmpUI, skillId, 1, false);
			});

		}

		/** 设置boss名称底板图片 */
		private setNameBgSkin(type: number): void
		{
			if (!type) return;
			this.UIPanel.img_nameBG.frame = type;
			// 设置boss人物图
			this.UIPanel.img_boss.frame = type; //"res/element/yuansushengdian_pet_0" + type +".png";
		}

		/** 刷新ItemList */
		onItemListRender(itemUI: ProUI.Element.Detail.ListItemUI, index: number)
		{

			let tmpInfo = this.TmpDataList[index];

			itemUI.LockImg.visible = tmpInfo.stage > this.TmpDayMaxStage + 1;
			itemUI.NameLb.text = tmpInfo.stage.toString();
			itemUI.PowerLb.text = tmpInfo.needFightPower.toString();
			itemUI.FirstPassImg.visible = tmpInfo.stage >=  ElementDataMgr.getMaxStageWithType (this.TmpStageType) + 1;
			itemUI.FunBtn.visible = !itemUI.LockImg.visible;

			//奖励
			let tmpRewardList = itemUI.FirstPassImg.visible ? cfg.ElementStageCfgData.getFirstAddItemAryById(tmpInfo.index) :
				cfg.ElementStageCfgData.getAddItemAryById(tmpInfo.index);
			itemUI.RewardBox.onRefresh(tmpRewardList.length, this, (norItem: NorItemUI, itemIndex: number) =>
			{
				norItem.setItemInfo(tmpRewardList[itemIndex]);
			});

			//英雄需求
			let tmpNeedTypeInfo = cfg.ElementStageCfgData.getNeedPetTypeAryById(tmpInfo.index);
			let tmpLockStr = Global.getLangStr("element_msg2", tmpNeedTypeInfo.value2, Global.getLangStr("hero_type_name_" + tmpNeedTypeInfo.value1));
			itemUI.LockInfoLb.innerHTML = tmpLockStr;

			//按钮状态
			if (itemUI.FunBtn.visible)
			{
				itemUI.NeedBuyBox.visible = this.TempFubenLastFightCount == 0 && this.TempFubenLastBuyCount > 0;
				itemUI.NeedBuyTitleLb.text = tmpInfo.stage <= this.TmpDayMaxStage ? Global.getLangStr("common_sweep") : Global.getLangStr("common_attack");
				itemUI.FunLb.text = itemUI.NeedBuyTitleLb.text;
				itemUI.FunLb.visible = !itemUI.NeedBuyBox.visible;
				if (itemUI.NeedBuyBox.visible)
				{
					let tempBuyInfo = cfg.ElementBuyCountCfgData.getInfoWithFun(ElementDataMgr.getDayBuyCount() + 1);
					Global.setResIconWithItemID(itemUI.NeedBuyImg, CfgID.ResType.Item, CfgID.ItemID.Diamond);
					Global.setResNumWithItemInfo(itemUI.NeedBuyLb, CfgID.ItemID.Diamond, tempBuyInfo.needDiamond);
				}
				itemUI.FunBtn.onClick(this, this.onListItemClick);
			}
		}

		private onListItemClick(btn: component.UIButton)
		{

			let tmpInfo = this.TmpDataList[parseInt(btn.parent.name)];
			let tmpCanBuyCount = this.TempFubenLastBuyCount > 0 && this.TempFubenLastFightCount == 0;
			if (this.TempFubenLastFightCount > 0)
			{
				if (tmpInfo.stage <= this.TmpDayMaxStage)
				{
					ElementSend.sweep(tmpInfo.index);
				}
				else
				{
					UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_Element, tmpInfo.index));
				}
			}
			else if (tmpCanBuyCount)
			{
				UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(2));
			}
			else
			{
				TipsUtils.showTipsByLanId("tips_msg27");
			}
		}
	}
}