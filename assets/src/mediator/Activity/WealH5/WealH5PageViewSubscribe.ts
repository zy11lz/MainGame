module Pro
{
    /**
     * H5接入福利领奖分页: 关注公众号
     * @author jason.xu
     */
    export class WealH5PageViewSubscribe extends WealH5PageViewBase
    {

        /** 重置奖励准备状态， 部分可通过入口参数来判断是否可以领奖的 */
        protected resetPrizeReadyState(): void
        {
            //入口参数说已经关注过了。
            if (PlatformData.locationData.wx_is_subscribe == 2) CommonDataMgr.setPrizeReady(this._type);
        }

        /** 拉起SDK操作(子类重写此方法，执行相应的操作) */
        protected executeSdkCall(): void
        {
            window["sqgamesdk"].subscribe((result) =>
            {
                if (result && result == 1)
                {
                    TipsUtils.showTipsByLanId("H5Weal_tips4");
                    CommonDataMgr.setPrizeReady(this._type);
                }
            });
        }
    }
}