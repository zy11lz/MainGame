
module Pro
{
	/**
     * 变强
     */
	export class HeroStrongerStrongerTable extends ProUI.Hero.HeroStronger.Stronger.MainUI implements ITableView
	{

		/** 当前选择的英雄Sn列表 */
		TmpSelectPetSnList: Array<Long>;

		/** 当前选择的英雄索引 */
		TmpSelectPetIndex = -1;

		/** 评分数据 */
		TmpScoreData: Pb_God.PBG2CPetQueryScore;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.ItemLIst.onRefresh(0, this, this.onItemListRender);
		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			EventMgr.on(Cmd.S2C_Pet_QueryScore_Ack.cmdName, this, this.onQueryScore_Ack)
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			EventMgr.off(Cmd.S2C_Pet_QueryScore_Ack.cmdName, this, this.onQueryScore_Ack)
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部主动调用,传递参数信息 */
		setData($data: any): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			this.refreshPetBox();
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		//====================================上阵伙伴==========================================
		refreshPetBox()
		{
			this.TmpSelectPetIndex = -1;
			let tmpZhenfaInfo = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
			if (tmpZhenfaInfo)
			{
				this.TmpSelectPetSnList = tmpZhenfaInfo.getStorePetSnList();
				this.PetItemBox.onRefresh(this.TmpSelectPetSnList.length, this, this.onItemRefresh);
			} else
			{
				this.PetItemBox.onRefresh(0, this, this.onItemRefresh)
			}
		}

		private onItemRefresh = (itemUI: NorItemUI, index: number) =>
		{
			let tmpPetInfo = PetDataMgr.getPetInfo(this.TmpSelectPetSnList[index]);
			itemUI.setPetInfo(tmpPetInfo);
			itemUI.onClick(this, this.onPetItemClick);
			if (this.TmpSelectPetIndex == -1)
			{
				itemUI.activeEvent();
			}
		}

		onPetItemClick(btn: component.UIButton)
		{
			this.ItemSelectImg.x = btn.x;
			this.TmpSelectPetIndex = parseInt(btn.name);
			PetSend.queryScore(this.TmpSelectPetSnList[this.TmpSelectPetIndex])
		}

		onQueryScore_Ack(value: Pb_God.PBG2CPetQueryScore): void
		{
			let tmpPetSn = this.TmpSelectPetSnList[this.TmpSelectPetIndex];
			if (!tmpPetSn.equals(value.sn))
			{
				return;
			}

			this.TmpScoreData = value;

			let tmpPetInfo = PetDataMgr.getPetInfo(tmpPetSn);
			this.SelectInfoNameLb.text = cfg.PetSkinCfgData.getFileNameById(tmpPetInfo.useskinid);
			this.SelectInfoProNumLb.text = value.selfscore.totalscore + "/" + value.maxscore.totalscore
			this.SelectInfoProImg.width = value.selfscore.totalscore / value.maxscore.totalscore * 220;

			this.ItemLIst.onRefresh(cfg.StrongerCfgData.getAllList().length, this, this.onItemListRender);
		}

		//=====================================功能项================================================
		onItemListRender(itemUI: ProUI.Hero.HeroStronger.Stronger.ListItemUI, index: number)
		{
			let tmpCfgInfo = cfg.StrongerCfgData.getAllList()[index];
			let tmpSelfScore = this.TmpScoreData.selfscore[tmpCfgInfo.serverKey];
			let tmpMaxScore = this.TmpScoreData.maxscore[tmpCfgInfo.serverKey];
			itemUI.ScoreProImg.width = tmpMaxScore > 0 ? (tmpSelfScore / tmpMaxScore * 150) : 0;
			itemUI.ScoreNunLb.text = tmpSelfScore + "/" + tmpMaxScore;
			itemUI.NameLb.text = tmpCfgInfo.name;
			itemUI.DesLb.text = tmpCfgInfo.des;
			itemUI.frameImgIcon.frame = index + 1;
			itemUI.GoBtn.onClick(this, () =>
			{
				if (cfg.UiconfigUiopenCfgData.getPanelNotifyByID(tmpCfgInfo.uIOpenID) == "Open_HeroDetail")
				{

					let tmpPetSn = this.TmpSelectPetSnList[this.TmpSelectPetIndex];
					let tmpPetInfo = PetDataMgr.getPetInfo(tmpPetSn);
					let tmpSelectHeroType = cfg.PetCfgData.getPetTypeByPetID(tmpPetInfo.id);
					let tmpMyHeroList = PetDataMgr.getPetList(tmpSelectHeroType);
					let tmpSelectTypeIndex = tmpMyHeroList.indexOf(tmpPetInfo);

					let openUIData = new HeroDetailOpenUIData();
					openUIData.isTujian = false;
					openUIData.heroIndex = tmpSelectTypeIndex;
					openUIData.heroType = tmpSelectHeroType;
					UIManager.Inst.forceOpen(openUIData, BaseBackUIType.HideBackUI);

				}
				else
				{
					if (!TaskUtils.gotoOpenByUICfgId(tmpCfgInfo.uIOpenID))
					{
						UIManager.Inst.closeCurrentList();
					}
				}
			});
		}
	}
}