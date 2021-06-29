
module Pro
{
	/**
	 * 掉落-挂机
	 */
	export class DropHookInfoTable extends ProUI.Fuben.DropInfo.HookDrop.MainUI implements ITableView
	{
		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{

		}
		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			let tmpSceneID = HookDataMgr.getSceneID();
			let tmpCurrStageId = HookDataMgr.getStageID() > 0 ? HookDataMgr.getStageID() : 1;
			let tmpSceneInfo = cfg.HookSceneCfgData.getInfo(tmpSceneID);
			let tmpInfoSIndex = 0;
			let tmpHookList = cfg.HookNormalDropInfoCfgData.getDataAll();
			for (let i = 0; i < tmpHookList.length; i++)
			{
				let tmpInfo = tmpHookList[i];
				if (tmpCurrStageId >= tmpInfo.stage)
				{
					tmpInfoSIndex = i;
					break;
				}
			}
			let tmpInfoEIndex = Math.min(tmpInfoSIndex + 3, tmpHookList.length - 1);
			this.ItemList.onRefresh(tmpInfoEIndex - tmpInfoSIndex + 1, this, (item: ProUI.Fuben.DropInfo.DropItemUI, index: number) =>
			{
				let tmpStageInfo = tmpHookList[tmpInfoSIndex + index];
				let tmpDropList = cfg.HookNormalDropInfoCfgData.getItemIDAryByIndex(tmpStageInfo.index);
				item.NameLb.text = index == 0 ? Global.getLangStr("hook_msg6") : tmpSceneInfo.sceneName + " " + tmpStageInfo.stage;
				item.NameLbBg.skin = index == 0 ? "res/common/stronger_2_01.png" : "res/common/stronger_2.png";
				item.ItemList.onRefresh(tmpDropList.length, this, (itemUI: NorItemUI, itemIndex: number) =>
				{
					itemUI.setItemID(tmpDropList[itemIndex].value1, 0);
				});
			});
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		setData($data: any): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}
	}
}