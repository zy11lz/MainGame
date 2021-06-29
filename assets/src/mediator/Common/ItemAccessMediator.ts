
module Pro
{
	/**
	 * 道具获取途径
	 */
	export class ItemAccessMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Common.ItemAccessUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Common.ItemAccessUI, 1, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.btnClose.onClick(this, this.closeUI);
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

			let tempItemID = 0;
			let tempItemShow = true;
			if (this.UIOpenData.customObject["push"] == null)
			{
				tempItemID = this.UIOpenData.customObject as number;
			}
			else
			{
				tempItemID = this.UIOpenData.customObject[0] as number;
				tempItemShow = this.UIOpenData.customObject[1] as boolean;
			}

			this.UIPanel.ItemInfoBox.visible = tempItemShow;
			this.UIPanel.ItemBGImg.height = tempItemShow ? 392 : 555;

			if(tempItemID == CfgID.ItemID.Candy)
			{
				// 弹出糖果弹框时更新限时礼包按钮
				Public.LStorageMgr.GetInst().setLocalData("curTimeLimit",'4');
			}

			if (tempItemShow)
			{

				this.UIPanel.NameLb.text = cfg.ItemCfgData.getNameById(tempItemID);
				if (!GlobalData.isRelease)
				{
					//非发行版本， 添加物品id显示， 方便GM添加道具
					this.UIPanel.NameLb.text = cfg.ItemCfgData.getNameById(tempItemID) + "_" + tempItemID;
				}
				this.UIPanel.NameLb.color = Global.getResQuColor(cfg.ItemCfgData.getQualityById(tempItemID));
				this.UIPanel.ItemDesLb.innerHTML = this.UIPanel.ItemDesLb.showText = cfg.ItemCfgData.getDescById(tempItemID);
				this.UIPanel.HaveNumLb.text = Global.getLangStr("bag_msg2", Global.getItemNum(tempItemID));
				this.UIPanel.ItemInfo.setItemID(tempItemID, 1, false, false, false);
				this.UIPanel.panelDescLb.scrollTo(0, 0);
				if (this.UIPanel.ItemDesLb.contextHeight > this.UIPanel.panelDescLb.height)
				{
					//纵向滚动
					this.UIPanel.panelDescLb.vScrollBarSkin = null;
					this.UIPanel.panelDescLb.mouseEnabled = true;
				} else
				{
					this.UIPanel.panelDescLb.mouseEnabled = false;
				}
			}

			let tempGateWayStr = cfg.ItemCfgData.getGetwayById(tempItemID);
			let tempGateWaylist = tempGateWayStr.length > 0 ? tempGateWayStr.split(";") : [];
			this.UIPanel.ItemList.onRefresh(tempGateWaylist.length, this, (tempUI: ProUI.Common.ItemAccessInfoUI, index: number) =>
			{
				let tmpUIID = parseInt(tempGateWaylist[index]);
				let uiCfg = cfg.UiconfigUiopenCfgData.getInfo(tmpUIID);
				tempUI.NameLb.text = uiCfg.desName;
				//功能是否开启
				let sysOpen = PlayerDataMgr.checkSystemSwitchOpen(uiCfg.systemSwitchId);
				tempUI.GoBtn.visible = sysOpen;
				tempUI.txtNoOpen.visible = !sysOpen;
				if (!sysOpen)
				{
					tempUI.txtNoOpen.text = cfg.SystemSwitchSystemSwitchCfgData.getUnlockDesByID(uiCfg.systemSwitchId);
				}
				tempUI.GoBtn.onClick(this, !sysOpen ? null : () =>
				{
					EventMgr.trigger(EventNotify.ItemAccess_Jump_Change);
					this.closeUI();
					TaskUtils.goto(uiCfg.panelNotify, uiCfg.page);
				});
			});
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}
	}
}