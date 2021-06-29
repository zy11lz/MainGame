module Pro
{
    export class ExchangeBuyOpenUIData extends BaseOpenUIData
    {
        public shopType: Pb_God._emShopType;
        /** 对应的限时兑换活动ID */
        public act_id: number;

        /**消耗货币ID */
        public needCurrencyID: number;
        
        /**
         * 显示的道具信息
         */
        public addItemID: number;

        /**
         * 价格
         */
        public addItemPrice: number;

        /**
         * 单次兑换的数量
         */
        public addItemCount: number;

        /** 限购数量 */
        public limitBuyCount: number;
        /** 当前货币最大能购买的数量 */
        public maxCount: number;

        /**
         * 限时兑换表格index
         */
        public exchanageCfgIndex: number;

        constructor()
        {
            super(PanelNotify.Open_LimitExchangeBuy);
        }
    }
}