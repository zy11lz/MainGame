module Pro
{
    /**
     * H5接入福利领奖分页: 保存到桌面
     * @author jason.xu
     */
    export class WealH5PageViewDesktop extends WealH5PageViewBase
    {

        /** 按钮是否常驻显示（领完奖励后，按钮显示还原成初始可操作的状态） 
         * 默认为false, 子类可重写
        */
        protected isLasting(): boolean
        {
            return true;
        }

        /** 拉起SDK操作(子类重写此方法，执行相应的操作) */
        protected executeSdkCall(): void
        {
            window["sqgamesdk"].saveToDesktop(() =>
            {
                TipsUtils.showTipsByLanId("H5Weal_tips2");
                CommonDataMgr.setPrizeReady(this._type);
            });
        }
    }
}