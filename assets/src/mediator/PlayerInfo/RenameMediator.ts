module Pro
{
    /**
    * 界面说明： 改名
    * @author jason.xu
    */
    export class RenameMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.PlayerInfo.RenameUI;

        /** 改名条件需要的钻石 */
        private _needDiamion: number;
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.PlayerInfo.RenameUI, 1, BaseAddLayer.TopUI);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.inputName.prompt = Global.getLangStr("playerinfo_msg8"); //请输入名字(限制6字)
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Common_PlayerRenameAck, this, this.onChangeName);

            this.UIPanel.btnCancel.onClick(this, this.closeUI);
            this.UIPanel.btnConfirm.onClick(this, this.onClickConfirm);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 名字变化 */
        private onChangeName(): void
        {
            this.closeUI();
        }

        /** 点击确定按钮 */
        private onClickConfirm(): void
        {
            //判断钻石是否足够
            if (!Global.isFullRes(Pb_God._emExpendType.ExpendType_Diamond, this._needDiamion, true))
                return;
            this.UIPanel.btnConfirm.disabled = true;
            let strName = this.UIPanel.inputName.text;
            strName = strName.replace(/\s*/g, ""); //去掉空白字符
            if (!strName)
            {
                TipsUtils.showTipsByLanId("tips_msg14");
                return;
            }

            if (Global.GetStrByteLen(strName) > 12)
            {
                TipsUtils.showTipsByLanId("tips_msg34");
                return;
            }
            //脏字符检测     
            if (FilterHelper.Inst.containStr(strName))
            {
                TipsUtils.showTipsByLanId("tips_msg15");
                return;
            }
            //向服务器发送请求
            CommonSend.playerRename(strName, PlayerDataMgr.gender);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.UIPanel.btnConfirm.disabled = false;
            this.UIPanel.inputName.text = PlayerDataMgr.name;
            //是否免费
            let isFree = PlayerDataMgr.renamecount < 2;
            this.UIPanel.boxFee.visible = !isFree;
            this.UIPanel.txtFree.visible = isFree;
            this._needDiamion = 0;
            if (!isFree)
            {
                this._needDiamion = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_RenameNeedDiamond);
                this.UIPanel.txtNeedDiamond.text = Global.getLangStr("playerinfo_msg7") + this._needDiamion;  //改名需消耗 200
                this.UIPanel.boxFee.refresh();
            }
        }

    }
}