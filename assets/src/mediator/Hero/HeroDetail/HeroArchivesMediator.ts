
module Pro
{
	/**
	* 精灵档案
	*/
	export class HeroArchivesMediator extends BaseMediator implements IMediator
	{
		public UIPanel: ProUI.Hero.HeroDetail.Preview.HeroArchivesUI;

		private heroBookCfgInfo: cfg.PetBookCfgInfo;

		private _isCanMove = false;

		/** 需要自动加载的资源列表 */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("heroArchives")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return null;
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroDetail.Preview.HeroArchivesUI, 1, BaseAddLayer.TopUI);
		}

		/*** 关闭UI */
		public closeUI(): void
		{
			super.closeUI();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.UIPanel.EvolutionBtn.onClick(this, this.onEvolutionClick);
			this.UIPanel.StoryBtn.onClick(this, this.onStoryClick);
			this.UIPanel.RewardBtn.onClick(this, this.onRewardClick);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
			Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onStart);
			Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onEnd);
			this.addEventMgr(CmdEvent.Pet_PetAchivesReward_Chg, this, this.onPetAchivesReward_Chg);
			
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{
			Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onStart);
			Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onEnd);
		}

        /**
         * 初始化面板ui
         */
		public initUI(): void
		{
			this.heroBookCfgInfo = this.UIOpenData.customObject;
			this.UIPanel.PetName.text = cfg.PetSkinCfgData.getFileNameByPetID(this.heroBookCfgInfo.petID);
			this.UIPanel.IconImg.x = Laya.stage.width / 2;
			this.UIPanel.IconImg.y = Laya.stage.height / 2 - 100;
			Global.setResBigCard(this.UIPanel.IconImg,cfg.PetCfgData.getSkinInfoByPetID(this.heroBookCfgInfo.petID).id);
			this.UIPanel.RewardBtn.visible = PetDataMgr.rewardpets.indexOf(this.heroBookCfgInfo.petID) == -1 && PetDataMgr.seenpets.indexOf(this.heroBookCfgInfo.petID) > -1;
			let itemInfo = cfg.AddItemInfo.parse(cfg.PetMasterMatchCfgData.getFirstInfo().petUnlockPrize)[0];
			this.UIPanel.rewardItem.setItemInfo(itemInfo,false,false,false);
			this.UIPanel.rewardItem.RedDotImg.visible = true;
		}


		//--------------------------------button---------------------------------------
		private onEvolutionClick()
		{
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroEvolutionPreviewMediator, this.heroBookCfgInfo.petID));
		}

		private onStoryClick()
		{
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroStoryMediator, this.heroBookCfgInfo));
		}


		private onRewardClick()
		{
			PetSend.getPetAchivesReward(this.heroBookCfgInfo.petID);
		}
		

		/*****
		 *领取档案奖励 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onPetAchivesReward_Chg(value: Pb_God.PBU32): void
		{
			if(value.value > 0)PetDataMgr.rewardpets.push(value.value);
			this.UIPanel.RewardBtn.visible = false;
		}

   		private prevX: number;
        private prevY: number;
		private onStart(e: Laya.Event)
		{
			var targetName: string = e.target.name;
			if(targetName == 'darkUI')this._isCanMove = true;
            this.prevX = e.stageX;
            this.prevY = e.stageY;
		}

		private onMove(e: Laya.Event)
		{
			if(!this._isCanMove) return;
			this.UIPanel.IconImg.x += e.stageX - this.prevX
			this.UIPanel.IconImg.y += e.stageY - this.prevY
			this.prevX = e.stageX;
            this.prevY = e.stageY;
		}
	
		private onEnd(e: Laya.Event)
		{
			this._isCanMove = false;
		}
	}
}