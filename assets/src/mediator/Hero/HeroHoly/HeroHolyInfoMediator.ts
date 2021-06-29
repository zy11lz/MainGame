
module Pro
{
	/**
	 * 圣物进阶总览
	 */
	export class HeroHolyInfoMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroHolyInfo.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroHolyInfo.MainUI, 1, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

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
			// 详细使用见引用 第一位:圣物类型 第二位当前圣物阶级
			let uiDataAry: any[] = this.UIOpenData.customObject;
			let tempInfoAry = cfg.HolyAdvanceCfgData.getInfoAryByType(uiDataAry[0]);
			let curLv = uiDataAry[1] as number;
			this.UIPanel.ItemList.onRefresh(tempInfoAry.length, this, (itemUI: ProUI.Hero.HeroHolyInfo.ListItemUI, index: number) =>
			{
				let tempInfo = tempInfoAry[index];
				let tempAtterAry = cfg.HolyAdvanceCfgData.getAddAttrAryByIndex(tempInfo.id);
				itemUI.NameLb.text = cfg.HolyUnlockCfgData.getNameByPetType(this.UIOpenData.customObject) + Global.getLangStr("attr_stage", tempInfo.level); //n阶;
				let isCurLv = tempInfo.level == curLv;
				itemUI.img_current.visible = isCurLv;
				itemUI.img_currentBg.visible = isCurLv;

				itemUI.AtterBox.onRefresh(tempAtterAry.length, this, (itemAtterUI: Laya.Box, itemAtterIndex: number) =>
				{
					let tmpAtterID = tempAtterAry[itemAtterIndex].type;

					let tmpIconImg = itemAtterUI.getChildAt(0) as component.UIFrameImage;
					let tmpDesLb = itemAtterUI.getChildAt(1) as component.UILabel;
					tmpIconImg.frame = tmpAtterID;
					tmpDesLb.text = Global.getLangStr("hero_msg51", cfg.BattleCfgData.getDescByAttrType(tmpAtterID), Global.getAttrValueString(tempAtterAry[itemAtterIndex]));
					tmpDesLb.color = isCurLv ? "#009e00" : "#5b545b";
				});
			});
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}
	}
}