module Pro
{
    /**
     * H5接入福利领奖分页: 分享
     * 此分类包括了微信分享与QQ分享， 同样的执行逻辑，只是类型不一样，显示的banner有区分。
     * @author jason.xu
     */
    export class WealH5PageViewShare extends WealH5PageViewBase
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
            let imgUrl = Laya.URL.formatURL("res/Unpack/share/h5share.jpg");
            //text,title,img,sucfn,failfn
            window["sqgamesdk"].share(
                Global.getLangStr("H5Weal_shareTitle"), Global.getLangStr("H5Weal_shareDesc"),
                imgUrl,
                () =>
                {
                    //分享成功
                    TipsUtils.showTipsByLanId("share_success"); //分享成功
                    CommonDataMgr.setPrizeReady(this._type);
                }, () =>
                {
                    //分享失败
                    TipsUtils.showTipsByLanId("share_faild");
                });
        }
    }
}