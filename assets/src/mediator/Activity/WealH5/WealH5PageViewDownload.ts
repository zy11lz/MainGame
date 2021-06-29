module Pro
{
    /**
     * H5接入福利领奖分页: 下载微端
     * @author jason.xu
     */
    export class WealH5PageViewDownload extends WealH5PageViewBase
    {

        /** 按钮是否常驻显示（领完奖励后，按钮显示还原成初始可操作的状态） 
         * 默认为false, 子类可重写
        */
        protected isLasting(): boolean
        {
            //判断入口， 如果是用的微端进入的， 领奖后页面就不要了， 按钮也不需要常驻，不是微端进的才需要常驻
            if (PlatformData.locationData.wd_download_switch == 2)
                return false;
            return true;
        }

        /** 重置奖励准备状态， 部分可通过入口参数来判断是否可以领奖的 */
        protected resetPrizeReadyState(): void
        {
            //参数含义如下： 1：展示微端下载 2：在微端内，不需要展示微端下载按钮 其他-不展示微端下载按钮； 其余值或不传：不展示微端下载
            //已经在微端内的话，说明奖励可以直接领了
            if (PlatformData.locationData.wd_download_switch == 2) CommonDataMgr.setPrizeReady(this._type);
        }

        /** 拉起SDK操作(子类重写此方法，执行相应的操作) */
        protected executeSdkCall(): void
        {
            window["sqgamesdk"].download_wd((result) =>
            {
                if (result && result == 1)
                {
                    TipsUtils.showTipsByLanId("H5Weal_tips3");
                    CommonDataMgr.setPrizeReady(this._type);
                }
            });
        }
    }
}