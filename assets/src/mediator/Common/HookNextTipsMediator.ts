module Pro
{
    /**
    * 界面说明： 挂机场景切换
    * @author jason.xu
    */
    export class HookNextTipsMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Common.NextHookTipsUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.NextHookTipsUI, 0, BaseAddLayer.TopUI, true, 2);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.closeUI);
            // //奇葩设定：  通关第10关的时候，要启动一个首充的新手引导
            // if (this.UIOpenData.customObject[1] >= 10 && !ActivityDataMgr.getFinishFirstPayAct()) {
            //     let guideStep = GuideStep.Func_FirstPay_1;
            //     FuncGuideMgr.Inst.setPreFuncGuideTag(guideStep);
            //     FuncGuideMgr.Inst.checkPreFuncGuideTag(guideStep);
            // }
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let oldId = this.UIOpenData.customObject[0];
            let newId = this.UIOpenData.customObject[1];

            let sceneId = cfg.HookStageCfgData.getSceneIDByStageID(newId);
            this.UIPanel.txtTitle.text = cfg.HookSceneCfgData.getSceneNameBySceneID(sceneId) + newId;

            let oldDropId = cfg.HookStageCfgData.getHookDropIDByStageID(oldId);
            let oldItemList = cfg.DropDropCfgData.getAddItemAryById(oldDropId);
            let oldItemMap = Global.listToStringMapData(oldItemList, "itemid");
            let dropId = cfg.HookStageCfgData.getHookDropIDByStageID(newId);
            let itemList = cfg.DropDropCfgData.getAddItemAryById(dropId);
            this.UIPanel.listView.onRefresh(itemList.length, this, (itemUI: ProUI.Common.NextHookTipsItemUI, index: number) =>
            {
                let item = itemList[index];
                Global.setResIconWithItemID(itemUI.icon, CfgID.ResType.Item, item.itemid);
                itemUI.txtName.text = cfg.ItemCfgData.getNameById(item.itemid);
                itemUI.txtNewValue.text = item.itemcount + "/分钟";
                let oldItem = oldItemMap.get(item.itemid);
                let oldCount = oldItem ? oldItem.itemcount : 0;
                itemUI.txtValue.text = oldCount + "";
            });
            Laya.timer.once(3000, this, this.closeUI);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}