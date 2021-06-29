module Pro
{
    /**
     * H5接入福利领奖分页: 实名认证
     * @author jason.xu
     */
    export class WealH5PageViewVerify extends WealH5PageViewBase
    {

        /** 重置奖励准备状态， 部分可通过入口参数来判断是否可以领奖的 */
        protected resetPrizeReadyState(): void
        {
            //入口参数说已经认证过了。
            if (PlatformData.locationData.id_verify == 2) CommonDataMgr.setPrizeReady(this._type);
        }

        /** 拉起SDK操作(子类重写此方法，执行相应的操作) */
        protected executeSdkCall(): void
        {
            window["sqgamesdk"].verify(() =>
            {
                TipsUtils.showTipsByLanId("H5Weal_tips1");
                CommonDataMgr.setPrizeReady(this._type);
            });
        }
    }
}