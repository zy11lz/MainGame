
module Pro
{
	/**
	 * 印刻石镶嵌
	 */
	export class ArtifactShenyinPanel extends ProUI.Artifact.ShengyinInfo.MainUI
	{

		private static tempPanel: any;

		/** 初始化 */
		public static init()
		{
			if (this.tempPanel) this.tempPanel.closeUI();
			//初始化UI
			let tempUI = new ArtifactShenyinPanel();
			//记录UI
			this.tempPanel = tempUI;

			tempUI.show();
			tempUI.refreshView();
		}

		/** 充能回调 */
		public static useStoreCall(): void
		{
			if (!this.tempPanel) return;
			this.tempPanel.refreshView();
			this.tempPanel.showAttrChangeView();
		}

		public show(): void
		{
			LayerManager.Inst.topUILayer.addChild(this);
			//背景添加关闭触发
			let tempCoverSp = PopUpManager.popUpUIAction(this, 0);
			tempCoverSp.onClick(this, () =>
			{
				this.closeUI();
			});
		}

		public refreshView(): void
		{

			//关闭按钮
			this.btnClose.onClick(this, this.closeUI);
			this.btnHelp.onClick(this, this.onClickHelp);

			let zhenfaLv = ArtifactDataMgr.getFazhenInfo().level;
			//刻印石数量相磁
			let tempCostInfo = cfg.ArtifactUpgradeCfgData.getNeedStoneCountAryByLevel(zhenfaLv);
			let maxCount = cfg.ArtifactUpgradeCfgData.getMaxStoneCountByLevel(zhenfaLv);
			let useCount = ArtifactDataMgr.getFazhenInfo().count; //当前已使用次数
			let owenItemCount = Global.getItemNum(tempCostInfo.itemid); //当前背包拥有数量
			//数据记录的是刻印石的数量，所以显示次数时，还要除掉单次消耗的道具数量
			this.UseTimesLb.showText = Global.getLangStr("artifact_shengying_msg1",
				useCount >= maxCount ? `<font color='#e92617'>${useCount}</font>` : `<font color='#14a52c'>${useCount}</font>`, maxCount);

			//显示刻印石
			this.CostItemUI.setNeedCountItem(tempCostInfo.itemid, owenItemCount, tempCostInfo.itemcount, false, true);
			this.SureBtn.disabled = useCount >= maxCount;

			//下一级提示
			if (cfg.ArtifactUpgradeCfgData.getInfo(zhenfaLv + 1))
				this.txtNextLevelTips.text = Global.getLangStr("artifact_shengying_msg3", zhenfaLv + 1)
			else
				this.txtNextLevelTips.text = "";

			//属性列表显示
			let itemAttrList = cfg.ItemCfgData.getAddAttrAryById(tempCostInfo.itemid);
			this.listAttr.onRefresh(itemAttrList.length, this, (attrItemUI: ProUI.Artifact.ShengyinInfo.AttrItemUI, attrIndex: number) =>
			{
				let attrData = itemAttrList[attrIndex];
				attrItemUI.iconType.frame = attrData.type;
				attrItemUI.txtValue.text = Global.getFullAttrValueString(attrData, "+", useCount);
			})

			//确认使用
			this.SureBtn.onClick(this, () =>
			{
				if (!Global.isFullRes(tempCostInfo.itemid, tempCostInfo.itemcount))
				{
					return;
				}
				ArtifactSend.useStone(1);
			});
		}

		private onClickHelp(btn: component.UIButton): void
		{
			CommonHelpView.showWithLangKey(btn, "artifact_usestore_help");
		}

		/** 显示属性变化 */
		public showAttrChangeView(): void
		{
			//使用刻印石强化次数
			let useCount = ArtifactDataMgr.getFazhenInfo().count;
			if (useCount == 0) return;
			let zhenfaLv = ArtifactDataMgr.getFazhenInfo().level;
			//刻印石数量相磁
			let tempCostInfo = cfg.ArtifactUpgradeCfgData.getNeedStoneCountAryByLevel(zhenfaLv);

			//属性列表显示
			//[attrType, changeValue][]
			let addAttrList: number[][] = [];
			let itemAttrList = cfg.ItemCfgData.getAddAttrAryById(tempCostInfo.itemid);
			for (let attrData of itemAttrList)
			{
				addAttrList[addAttrList.length] = [attrData.type, attrData.value];
			}
			this.upAttrListUI.show(addAttrList);
		}

		/** 关闭圣印UI */
		private closeUI()
		{
			PopUpManager.removeUIAction(this, 0, true, true);
			ArtifactShenyinPanel.tempPanel = null;
			ResMgr.Inst.unloadWithUrl("res/artifact/shenqi_pic01.png");
		}
	}
}