
module Pro
{
	/**
	 * 英雄评论
	 */
	export class HeroCommentMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroComment.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroComment.MainUI, 3, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.MsgInput.prompt = Global.getLangStr("common_inputPrompt"); //请输入内容
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
			let tmpSkinID = this.UIOpenData.customObject[0] as number;
			let tmpPetStar = this.UIOpenData.customObject[1] as number;
			this.UIPanel.ItemUI.setPetUI(tmpSkinID, tmpPetStar);

			this.UIPanel.LikeBtn.visible = false;
			this.UIPanel.LikeNumLb.text = "125";
			this.UIPanel.CommentTimesLb.text = Global.getLangStr("hero_msg3", 10);

			this.UIPanel.ItemList.onRefresh(10, this, (itemUI: ProUI.Hero.HeroComment.ListItemUI, index: number) =>
			{
				itemUI.HotImg.visible = false;
				itemUI.NameLb.text = index.toString();
				itemUI.DesLb.text = index.toString();
				itemUI.LowNumLb.text = index.toString();
				itemUI.TopNumLb.text = index.toString();
				itemUI.TopBtn.onClick(this, () =>
				{

				});
				itemUI.LowBtn.onClick(this, () =>
				{

				});
			});
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}
	}
}