module Pro
{
    /**
     * 界面说明： 道具批量操作界面（包括装备道具出售、批量使用、英雄碎片合成等等） 
    * @author jason.xu
    */
    export class BagItemBatchActionMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Bag.ItemBatchActionUI;

        /** 功能操作 0:出售，1:合并 2:使用礼包 3：使用道具 */
        private _actionType = 0;
        /** 出售的装备 */
        private _itemInfo: Pb_God.PBItem;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null; // [UrlMgr.getAtlas('')]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Bag.ItemBatchActionUI, 0, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._actionType = this.UIOpenData.customObject;
            this._itemInfo = this.UIOpenData.customObject2;

            this.UIPanel.EquipItem.setItemInfo(this._itemInfo, true, false, false, false, false);

            let maxCount = 0;
            //操作的文字显示
            let useName = "";
            // 0:出售，1:合并 2:使用礼包 3：使用道具
            switch (this._actionType)
            {
                case 0: //出售
                    {
                        useName = Global.getLangStr("item_review_msg5"); //出售";
                        maxCount = this._itemInfo.itemcount;
                        this.UIPanel.SellInfoBox.visible = true;
                        Global.setResIconWithItemID(this.UIPanel.NumRewardImg, CfgID.ResType.Item, cfg.ItemCfgData.getSellItemInfoById(this._itemInfo.itemid).itemid);
                    }
                    break;
                case 1: //合并
                    {
                        this.UIPanel.SellInfoBox.visible = false;
                        useName = Global.getLangStr("hero_msg47"); //合成";
                        let itemStar = cfg.ItemCfgData.getStarNumById(this._itemInfo.itemid);
                        let needCount = cfg.ItemPetcountCompoundCfgData.getNeedItemCountByPetStar(itemStar);
                        maxCount = Math.floor(this._itemInfo.itemcount / needCount);
                    }
                    break;
                case 2: //使用礼包
                case 3: //使用道具
                    {
                        this.UIPanel.SellInfoBox.visible = false;
                        useName = Global.getLangStr("ui_Artifact_msg12"); //使用
                        maxCount = this._itemInfo.itemcount;
                    }
                    break;
            }

            this.UIPanel.SureLb.text = useName;
            this.UIPanel.txtTitle.text = useName;
            this.UIPanel.scrollBar.max = maxCount;
            this.UIPanel.scrollBar.value = maxCount;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.SureBtn.onClick(this, this.onSureClick);

            this.UIPanel.scrollBar.setChangeListener(this, this.onChangeScroll);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /**滑动回调 */
        private onChangeScroll(value: number)
        {
            this.UIPanel.NumLb.text = value + "";

            //刷新出售价格
            if (this._actionType == 0)
            {
                let tmpSellOneNum = cfg.ItemCfgData.getSellItemInfoById(this._itemInfo.itemid).itemcount;
                this.UIPanel.NumRewardLb.text = Global.numberToTuckString(tmpSellOneNum * value);
            }
        }

        /** 确定操作 */
        onSureClick()
        {
            let itemNum = this.UIPanel.scrollBar.value;
            if (itemNum == 0)
            {
                TipsUtils.showTipsByLanId("common_noCount");
                return;
            }
            let itemSn = this._itemInfo.itemsn;
            // 0:出售，1:合并 2:使用礼包 3：使用道具
            switch (this._actionType)
            {
                case 0: //出售
                    ItemSend.sell(itemSn, itemNum);
                    break;
                case 1: //合并
                    ItemSend.petCompound(itemSn, itemNum);
                    break;
                case 2: //使用礼包
                    ItemSend.bag_Use(itemSn, itemNum, []);
                    break;
                case 3: //使用道具
                    ItemSend.use(itemSn, itemNum);
                    break;
            }
            this.closeUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}