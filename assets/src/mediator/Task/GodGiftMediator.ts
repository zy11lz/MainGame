module Pro
{
    /**
     * 界面说明： 天降好礼（完成特定成就任务后，自动弹出界面领奖）
    * @author jason.xu
    */
    export class GodGiftMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.GodGift.GodGiftUI;
        //public UIOpenData: BaseOpenUIData;

        /** 对应的成就id */
        private _achieveId = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('godgift')];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/dayfirstpay/bg.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.GodGift.GodGiftUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //调试模式下才把这个按钮打开。
            this.UIPanel.btnClose.visible = !GlobalData.isRelease;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.initDataView(this.UIOpenData.customObject)
        }

        private initDataView(achId: number): void
        {
            this._achieveId = achId;
            let strName = cfg.AchieveMainAchieveCfgData.getNameByID(this._achieveId);
            this.UIPanel.htmlDesc.showText = Global.getLangStr("godgift_msg1", strName);
            //奖励列表
            let addItems = cfg.AchieveMainAchieveCfgData.getAddItemAryById(this._achieveId);
            this.UIPanel.listNoritem.onRefresh(addItems.length, this, (itemRewardUI: NorItemUI, index: number) =>
            {
                itemRewardUI.setItemInfo(addItems[index]);
            });
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnGetReward.onClick(this, this.onClickGetReward);
            //	 主线完成				PBU32
            this.addEventMgr(CmdEvent.Achieve_MainComplete, this, this.onMainCompolete)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击领奖按钮 只有点击领奖后领奖成功才能将此界面关闭 */
        private onClickGetReward(): void
        {
            AchieveSend.mainComplete(this._achieveId);
        }

        /** 主线完成 */
        private onMainCompolete(value: Pb_God.PBU32): void
        {
            if (this._achieveId == value.value)
            { //完成以后看看是否还有其它的可以领的
                let nextAchId = AchieveDataMgr.getCanRewardGodGiftId();
                if (nextAchId <= 0) this.closeUI();
                else this.initDataView(nextAchId);
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}