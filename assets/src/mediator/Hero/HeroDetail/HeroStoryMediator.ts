
module Pro
{
	/**
	* 精灵档案
	*/
	export class HeroStoryMediator extends BaseMediator implements IMediator
	{
		public UIPanel: ProUI.Hero.HeroDetail.Preview.HeroStoryUI;

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
			this.showPanel(ProUI.Hero.HeroDetail.Preview.HeroStoryUI, 1, BaseAddLayer.RootUI);
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
			this.UIPanel.panel.vScrollBarSkin = "";
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{

		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{

		}

        /**
         * 初始化面板ui
         */
		public initUI(): void
		{
			this.heroBookCfgInfo = this.UIOpenData.customObject;
			let heroInfo = cfg.PetCfgData.getInfo(this.heroBookCfgInfo.petID);
			Global.setResBigCard(this.UIPanel.IconImg,cfg.PetCfgData.getSkinInfoByPetID(this.heroBookCfgInfo.petID).id);
			this.UIPanel.petName.text = cfg.PetSkinCfgData.getFileNameByPetID(this.heroBookCfgInfo.petID)
			var desc: string = this.heroBookCfgInfo.petStory;
            desc = desc.replace(/\\n/g, "<br/>")
            this.UIPanel.story.innerHTML = this.UIPanel.story.showText = desc;
			this.UIPanel.descName.text = heroInfo.desc;
			this.UIPanel.petTypeName.text = Global.getLangStr("hero_type_" + heroInfo.petType) +  Global.getLangStr("hero_type_name") +  Global.getLangStr("hero_job"+heroInfo.petJobType)
			Laya.timer.frameOnce(1, this, () =>
            {
                this.UIPanel.story.height = this.UIPanel.story.htmlDivElement.height;
                this.UIPanel.panel.refresh();
            })
		}
	}
}