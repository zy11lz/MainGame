module Pro
{
    /**
    * 充值：VIP分页与充值分页下共用的VIP进度子界面
    * @author jason.xu
    */
    export class PayVipChildView extends ProUI.Pay.PageView.VipChildViewUI
    {


        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            //	 新vip经验			PBU32
            EventMgr.on(CmdEvent.Privilege_UpVipExp, this, this.refreshView);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Privilege_UpVipExp, this, this.refreshView);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.refreshView();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        /** 刷新视图显示 */
        private refreshView(): void
        {
            let vipLv = PrivilegeDataMgr.vipLevel;
            let vipExp = PrivilegeDataMgr.vipExp;
            this.txtVipLevel.text = vipLv + "";
            //下一级属性
            let nextCfgInfo = cfg.PrivilegeVipCfgData.getInfo(vipLv + 1);
            this.noFull.visible = !!nextCfgInfo;
            this.full.frame = nextCfgInfo ? 1 : 2;
            if (nextCfgInfo)
            {
                this.txtNeed.text = Math.max(0, nextCfgInfo.needExp - vipExp) + "";
                this.txtNextLevel.text = nextCfgInfo.vipLevel + "";
                this.hboxNextPrize.refresh();
                this.imgNextPrize.frame = nextCfgInfo.vipLevel;
                if (vipExp > nextCfgInfo.needExp) vipExp = nextCfgInfo.needExp;
                this.txtProgress.text = vipExp + "/" + nextCfgInfo.needExp;
                Global.setProgressBarMask(this.imgProgress, vipExp / nextCfgInfo.needExp);
            }



        }
    }
}