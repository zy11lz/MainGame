module Pro
{
    /**
     * 界面说明： 神装套装方案改名界面
    * @author jason.xu
    */
    export class GodEquipSuitProjectRenameMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Heavens.GodEquip.SuitProjectRenameUI;

        private _oldName = "";

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;// [UrlMgr.getAtlas('')]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.GodEquip.SuitProjectRenameUI, 1, BaseAddLayer.TopUI,true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.inputName.prompt = Global.getLangStr("godequip_suitMgr_13");
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let suitMgrData: Pb_God.PBPlayerGodEquipSuitInfo = this.UIOpenData.customObject;
            this._oldName = suitMgrData.name;
            this.UIPanel.inputName.text = this._oldName;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnCancel.onClick(this, this.closeUI);
            this.UIPanel.btnConfirm.onClick(this, this.onClickConfirm);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 确定 */
        private onClickConfirm(): void
        {
            let strName = this.UIPanel.inputName.text;
            strName = strName.replace(/\s*/g, ""); //去掉空白字符
            if (strName.length < 1)
            {
                TipsUtils.showTipsByLanId("tips_msg14");
                return;
            }
            //脏字符检测     
            if (FilterHelper.Inst.containStr(strName))
            {
                TipsUtils.showTipsByLanId("tips_msg15");
                return;
            }
            //判断是否与原始的是一样的
            if (this._oldName == strName)
            {
                TipsUtils.showTipsByLanId("tips_msg70");
                return;

            }
            //判断长度
            if (Global.GetStrByteLen(strName) > 12)
            {
                TipsUtils.showTipsByLanId("godequip_suitMgr_13");
                return;
            }
            let suitMgrData: Pb_God.PBPlayerGodEquipSuitInfo = this.UIOpenData.customObject;
            PetSend.godSuit_RenameAsk(suitMgrData.id, strName);
            this.closeUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}