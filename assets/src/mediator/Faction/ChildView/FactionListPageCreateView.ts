module Pro
{
    /**
    * 帮会列表界面： 创建帮会分页
    * @author jason.xu
    */
    export class FactionListPageCreateView extends ProUI.Faction.ChildView.FactionListCreaterViewUI implements ITableView
    {

        /** 创建的公会是否自动加入（不需要验证） */
        private _isCreateVerify: boolean = false;
        /** 创建的公会需要的等级 */
        private _arrCreateNeedLv: number[] = [1, 10, 20, 30, 40, 50, 60, 100];
        private _nCreateNeedLvIndex: number = 0;

        private _createNeedDiamond: number = 100;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.inputFactionName.prompt = Global.getLangStr("faction_inputPrompt");
            this.inputFactionContent.prompt = Global.getLangStr("faction_inputPrompt2");
            this.inputFactionContent.text = Global.getLangStr("faction_defaultNotic");
            //创建公会相关
            this.onClickCreateVerify();
            this.resetCreateNeedLvIndex(0);
            this._createNeedDiamond = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_CreateNeedDiamond);
            this.txtCreateNeedDiamond.text = Global.getLangStr("faction_msg20", this._createNeedDiamond); // 200  创建公会";
        }

        public addEvent(): void
        {
            this.btnVerifyLeft.onClick(this, this.onClickCreateVerify);
            this.btnVerifyRight.onClick(this, this.onClickCreateVerify);
            this.btnNeedLvLeft.onClick(this, () => { this.resetCreateNeedLvIndex(this._nCreateNeedLvIndex - 1); });
            this.btnNeedLvRight.onClick(this, () => { this.resetCreateNeedLvIndex(this._nCreateNeedLvIndex + 1); });
            this.btnCreate.onClick(this, this.onClickCreateFaction);
        }

        public removeEvent(): void
        {
        }

        private _isShow = false;
        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this._isShow = true;
            let needVip = 1;
            let vipOk = PrivilegeDataMgr.vipLevel >= needVip;
            this.txtCreateNeedVip.visible = !vipOk;
            this.btnCreate.disabled = !vipOk;
            //随机名字
            this.inputFactionName.text = "";
            //不在客户端查重了
            this.randomFactionName();
        }
        randomFactionName()
        {
            this.inputFactionName.text = cfg.FactionNameNameCfgData.getRandomFactionName();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            this._isShow = false;
        }

        public setData($data: any): void
        {

        }

        /** 创建公会时，点击切换验证设置 */
        private onClickCreateVerify(): void
        {
            this._isCreateVerify = !this._isCreateVerify;
            this.btnVerifyLeft.disabled = this._isCreateVerify;
            this.btnVerifyRight.disabled = !this._isCreateVerify;
            this.txtCreateVerify.text = this._isCreateVerify ? Global.getLangStr("faction_msg18") : Global.getLangStr("faction_msg19");   //不需要验证 : 需要验证;
        }

        /** 创建公会时， 切换入会要求等级*/
        private resetCreateNeedLvIndex(value: number): void
        {
            if (value < 0) { value = 0; }
            let maxIndex = this._arrCreateNeedLv.length - 1;
            if (value > maxIndex) { value = maxIndex; }
            this._nCreateNeedLvIndex = value;
            this.btnNeedLvLeft.disabled = value <= 0;
            this.btnNeedLvRight.disabled = value >= maxIndex;
            this.txtCreateNeedLv.text = this._arrCreateNeedLv[value] + Global.getLangStr("common_level");
        }

        /** 点击创建公会 */
        private onClickCreateFaction(): void
        {
            let factionName: string = this.inputFactionName.text;
            factionName = factionName.replace(/\s*/g, ""); //去掉空白字符
            if (factionName.length < 2)
            {
                TipsUtils.showTipsByLanId("tips_msg18");
                return;
            }
            let content: string = this.inputFactionContent.text;
            //脏字符检测
            if (FilterHelper.Inst.containStr(content, false) || FilterHelper.Inst.containStr(factionName))
            {
                TipsUtils.showTipsByLanId("tips_msg15");
                return;
            }
            //钻石是否足够
            if (!Global.isFullRes(2, this._createNeedDiamond, true))
            { return; }

            FactionSend.create(PlayerDataMgr.uid, 0, factionName,
                0, 0, content, this._isCreateVerify ? 0 : 1, this._arrCreateNeedLv[this._nCreateNeedLvIndex]);
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

    }
}