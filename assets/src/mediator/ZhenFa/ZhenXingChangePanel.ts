
module Pro
{
	export class ZhenXingChangePanel
	{

		private static tempPanel: any;

		/**
		 * 打开阵型选择界面
		 * @param id 当前阵型id
		 */
		public static initUI(id: number, isTeamCampaign: boolean = false)
		{

			let tempUI = new ProUI.Embattle.ZhenxingChangeUI();
			tempUI.ItemList.content.addChild(tempUI.ItemSelectImg);
			tempUI.ItemList.content.addChild(tempUI.ItemDefaultBox);
			LayerManager.Inst.topUILayer.addChild(tempUI);

			//记录到全局
			this.tempPanel = tempUI;

			//弹出UI
			let tempCoverSp = PopUpManager.popUpUIAction(tempUI, 0);
			tempCoverSp.onClick(this, () =>
			{
				this.closeUI();
			});

			//关闭UI
			tempUI.CloseBtn.onClick(this, () =>
			{
				this.closeUI();
				EventMgr.trigger(EventNotify.Embattle_Zhenxing_Changed, tmpCurId);
				let tempAry = cfg.PetFormationCfgData.getDataList();
				Pro.TipsUtils.showTips(Global.getLangStr("ui_HeroZhenXing_msg13",tempAry[tmpCurId - 1].name));
			});

			//列表刷新
			let isInit = false;
			let tmpCurId = id;

			//组队战
			if (isTeamCampaign)
			{
				let tempAry = cfg.TeamCampaignFormationCfgData.getDataList();
				tempUI.ItemList.onRefresh(tempAry.length, this, (itemUI: ProUI.Embattle.ZhenxingItemUI, index: number) =>
				{
					let tempInfo = tempAry[index];
					itemUI.IconImg.skin = "res/Unpack/form/form_icon_" + (tempInfo.index + 7) + ".png";
					itemUI.NameLb.text = tempInfo.name;
					itemUI.IconImg.gray = false;
					itemUI.LockImg.visible = false;
					itemUI.LockLb.text = Global.getLangStr("item_review_msg20", 0);
					itemUI.onClick(this, () =>
					{
						if (itemUI.IconImg.gray)
						{
							return;
						}
						tempUI.ItemSelectImg.x = itemUI.x;
						tempUI.ItemSelectImg.y = itemUI.y;
						tempUI.ItemList.content.setChildIndex(tempUI.ItemSelectImg, tempUI.ItemList.content.numChildren - 2);
						tmpCurId = tempInfo.index;
					});
					if (!isInit && id == tempInfo.index)
					{
						isInit = true;
						tempUI.ItemDefaultBox.x = itemUI.x;
						tempUI.ItemDefaultBox.y = itemUI.y;
						tempUI.ItemSelectImg.x = itemUI.x;
						tempUI.ItemSelectImg.y = itemUI.y;
						tempUI.ItemList.content.setChildIndex(tempUI.ItemSelectImg, tempUI.ItemList.content.numChildren - 2);
						tempUI.ItemList.content.setChildIndex(tempUI.ItemDefaultBox, tempUI.ItemList.content.numChildren - 1);
					}
				});
			}
			else
			{
				let tempAry = cfg.PetFormationCfgData.getDataList();
				tempUI.ItemList.onRefresh(tempAry.length, this, (itemUI: ProUI.Embattle.ZhenxingItemUI, index: number) =>
				{
					let tempInfo = tempAry[index];
					itemUI.IconImg.skin = "res/Unpack/form/form_icon_" + tempInfo.iD + ".png";
					itemUI.NameLb.text = tempInfo.name;
					itemUI.IconImg.gray = PlayerDataMgr.level < tempInfo.needLevel;
					itemUI.LockImg.visible = PlayerDataMgr.level < tempInfo.needLevel;
					itemUI.LockLb.text = Global.getLangStr("item_review_msg20", tempInfo.needLevel);
					itemUI.onClick(this, () =>
					{
						if (itemUI.IconImg.gray)
						{
							return;
						}
						tempUI.ItemSelectImg.x = itemUI.x;
						tempUI.ItemSelectImg.y = itemUI.y;
						tempUI.ItemList.content.setChildIndex(tempUI.ItemSelectImg, tempUI.ItemList.content.numChildren - 2);
						tmpCurId = tempInfo.iD;
					});
					if (!isInit && id == tempInfo.iD)
					{
						isInit = true;
						tempUI.ItemDefaultBox.x = itemUI.x;
						tempUI.ItemDefaultBox.y = itemUI.y;
						tempUI.ItemSelectImg.x = itemUI.x;
						tempUI.ItemSelectImg.y = itemUI.y;
						tempUI.ItemList.content.setChildIndex(tempUI.ItemSelectImg, tempUI.ItemList.content.numChildren - 2);
						tempUI.ItemList.content.setChildIndex(tempUI.ItemDefaultBox, tempUI.ItemList.content.numChildren - 1);
					}
				});
			}

		}

		/**
		 * 关闭阵型选择界面
		 */
		public static closeUI()
		{
			if (this.tempPanel != null)
			{
				PopUpManager.removeUIAction(this.tempPanel, 0, true, true);
				this.tempPanel = null;
			}
		}

	}
}