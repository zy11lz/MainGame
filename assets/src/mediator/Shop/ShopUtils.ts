module Pro
{

    /**
    * 
    * 商城工具类，封装商城模块内的一些常用方法
    *
    * @author jason.xu
    * 
    */
    export class ShopUtils
    {

        public static getSellItemByCfgInfo(info: cfg.ShopFixShopCfgInfo | cfg.ShopRandPoolCfgInfo): cfg.AddItemInfo[]
        {
            if (info)
            {
                let saveKey = "sellItemInfo";
                if (info[saveKey] == null)
                {
                    info[saveKey] = cfg.AddItemInfo.parse(info.sellItem);
                }
                return info[saveKey];
            }
            return null;
        }
        public static getNeedItemByCfgInfo(info: cfg.ShopFixShopCfgInfo | cfg.ShopRandPoolCfgInfo): cfg.AddItemInfo
        {
            if (info)
            {
                let saveKey = "needItemInfo";
                if (info[saveKey] == null)
                {
                    info[saveKey] = cfg.AddItemInfo.parse(info.needItem)[0];
                }
                return info[saveKey];
            }
            return null;
        }

        public static getNeedItemByExCfgInfo(info: cfg.ActivityExchangeExCfgInfo): cfg.AddItemInfo
        {
            if (info)
            {
                let saveKey = "needItemInfo";
                if (info[saveKey] == null)
                {
                    info[saveKey] = cfg.AddItemInfo.parse(info.fromItemID + "_" + info.needAmount)[0];
                }
                return info[saveKey];
            }
            return null;
        }


        public static getSellItemByExCfgInfo(info: cfg.ActivityExchangeExCfgInfo): cfg.AddItemInfo[]
        {
            if (info)
            {
                let saveKey = "sellItemInfo";
                if (info[saveKey] == null)
                {
                    info[saveKey] = cfg.AddItemInfo.parse(info.addItem);
                }
                return info[saveKey];
            }
            return null;
        }

        private static _glowFilter: Laya.GlowFilter[] = [new Laya.GlowFilter("#000000", 1, 0, 0)];//#c5c5c5"
        /**
         * 消除锯齿，加滤镜模糊处理
         * @param img 
         */
        public static setGlowFilter(img: Laya.Image)
        {
            img.filters = this._glowFilter;

        }



    }
}