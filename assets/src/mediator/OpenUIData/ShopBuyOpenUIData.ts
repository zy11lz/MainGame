/**
* 商城购买弹窗数据传递
*
* @author jason.xu
*/
module Pro
{
    export class ShopBuyOpenUIData extends BaseOpenUIData
    {
        public shopType: Pb_God._emShopType;
        /** 对应的配置数据， 具体类型跟据shopType来作区分 */
        public shopCfgInfo: cfg.ShopFixShopCfgInfo | cfg.ShopRandPoolCfgInfo | cfg.ActivityExchangeExCfgInfo;

        public addItemInfo: cfg.AddItemInfo;
        /** 活动Id */
        public actid: number; 
        /** 限购数量 */
        public limitBuyCount: number;
        /** 当前货币最大能购买的数量 */
        public maxCount: number;


        public shopIndex: number;
        /** 兑换必然附带活动ID */
        public isExChange:boolean = false;

        constructor()
        {
            super(PanelNotify.Open_ShopBuyView);
        }
    }
}