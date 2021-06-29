module Pro
{
    /**
     * 充值返利UI
     */
    export class ChargeRebateMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.ActivityMain.ChargeRebate.MainUI;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("activitymain")];;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.ChargeRebate.MainUI, 1, BaseAddLayer.CenterUI, true, 1);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            // let ratio = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Fanli, Pb_God._emConstant_Fanli.C_Fanli_Percent);
            // let count = WealDataMgr.player_rebateMoney / 100 * ratio;
            // 奖励显示钻石 一直由服务器下发
            this.UIPanel.itemView.setItemID(CfgID.ItemID.Diamond, WealDataMgr.player_rebateMoney, true, true);
            this.UIPanel.btnGetReward.onClick(this, () =>
            {
                WealSend.getFanLiAward();
                this.closeUI();
            });
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }
    }
}