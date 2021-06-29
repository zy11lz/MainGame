module Pro
{
    /**
    * 界面说明： 充值界面主页特权商城高亮遮罩
    * @author 
    */
    export class PayMainHighlightMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Pay.PayMainHighlightUI;
        /** 默认打开时需要提示高亮的特权列表 */
        private _defaultPrivilegeList: number[] = null;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Pay.PayMainHighlightUI, 0, BaseAddLayer.TopUI);
        }

        public closeUI(): void
        {
            this._defaultPrivilegeList = null;
            for (let i = 0; i < this.UIPanel.listView.length; i++)
            {
                this.UIPanel.listView.getItem(i).visible = true;
            }
            super.closeUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        private onItemTabRender(itemUI: component.UIButton, index: number)
        {

        }

        /** 打开中的界面，重新设置uiopendata, 为保留以前的方案，基类不处理赋值， 有需要做更新处理的，子类可继续此方法。 */
        public resetUIOpenData(uiOpenData: BaseOpenUIData): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._defaultPrivilegeList = this.UIOpenData.customObject;
            this.refreshList();
            PopUpManager.popUpUIAction(this.UIPanel.pageViewContainer, 2);
        }

        /** 默认打开的分页 */
        private openDefaultTab(): void
        {
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 跳转分页 */
        private onUIPageChange(pageIndex: number): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }
        /** 当前货币购买的数量（与钻石购买的分界） */
        private _chargeMaxIndex = 0;
        /** 刷新列表 */
        private refreshList(): void
        {
            //列表分两部分组成， 1是支付表里面特权商城类型的。 2是特权商城表里面用钻石购买的。
            let list = [];
            list = list.concat(PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_PrivilegeCard));
            this._chargeMaxIndex = list.length - 1;
            list = list.concat(cfg.PrivilegeShopCfgData.getAll());
            this.UIPanel.listView.onRefreshWithArray(list, this, this.onRefreshItem);
            if (this._defaultPrivilegeList)
            {
                //简化计算，就不单独去找了，如果是寻宝的特权跳转，就直接滚到下面好了。
                if (this._defaultPrivilegeList.indexOf(Pb_God._emPrivilegeCard.PrivilegeCard_SailAdvance) >= 0)
                {
                    this.UIPanel.listView.tweenTo(4, 0);
                } else
                {
                    this.UIPanel.listView.tweenTo(0, 0);
                }
                Laya.timer.once(800, this, () =>
                {
                    this._defaultPrivilegeList = null;
                    this.closeUI()
                })
            }
        }

        private onRefreshItem(tempUI: ProUI.Pay.PageView.PrivilegeShopViewItemUI, index: number): void
        {

            //名称背景的颜色和名称文本一致
            //前面两个用黄色，后面的用紫色
            // tempUI.frameNameBg.frame = index + 1;
            // //"#4f0e77" 紫
            // //#67100a 红
            // //#1e5591 蓝
            // tempUI.txtName.strokeColor = ["#1e5591", "#67100a", "#4f0e77"][index];

            if (index <= this._chargeMaxIndex)
                this.onRefreshItemByChargeCfginfo(tempUI, this.UIPanel.listView.getItem(index) as cfg.ChargeCfgInfo, index);
            else
                this.onRefreshItemByShopCfginfo(tempUI, this.UIPanel.listView.getItem(index) as cfg.PrivilegeShopCfgInfo, index);
        }

        /** 钻石购买的item */
        private onRefreshItemByShopCfginfo(tempUI: ProUI.Pay.PageView.PrivilegeShopViewItemUI, cfgInfo: cfg.PrivilegeShopCfgInfo, index: number): void
        {
            tempUI.imgBoxIcon.frame = cfgInfo.cardID;
            tempUI.txtDes.text = cfgInfo.describe;
            // tempUI.txtName.text = cfgInfo.name;
            tempUI.txtLimitLabel.text = Global.getLangStr("shop_msg11");//永久限购";

            //是否已购买
            let isBuy = !!PrivilegeDataMgr.getPrivilegeShopBuyCount(cfgInfo.index);
            tempUI.imgBuyOver.visible = isBuy;
            tempUI.btnBuy.visible = !isBuy;
            if (!isBuy)
            {
                tempUI.txtLabelMoney.visible = false;
                tempUI.hboxDiamon.visible = true;
                let needDiamon = cfg.PrivilegeShopCfgData.getNeedItemInfoByInfo(cfgInfo);
                tempUI.txtLabelDiamon.text = needDiamon.itemcount + "";
                tempUI.hboxDiamon.refresh();

                tempUI.btnBuy.onClick(this, () =>
                {
                    //弹窗二级提示
                    let des = Global.getLangStr("shop_msg10", needDiamon.itemcount, cfgInfo.name);
                    AlertShow.showConfirmAlert(des, this, () =>
                    {
                        if (!Global.isFullRes(needDiamon.itemid, needDiamon.itemcount, true)) return;
                        //向服务器发请求
                        PrivilegeSend.shopBuy(cfgInfo.index);
                    });
                })
            }

            this.checkSelectPrivilegeItem(cfgInfo.cardID, tempUI);

            //道具列表
            let addItems = cfg.PrivilegeShopCfgData.getAddItemInfoByInfo(cfgInfo);
            tempUI.listNorItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });

        }

        /** 货币购买的item */
        private onRefreshItemByChargeCfginfo(tempUI: ProUI.Pay.PageView.PrivilegeShopViewItemUI, cfgInfo: cfg.ChargeCfgInfo, index: number): void
        {
            tempUI.imgBoxIcon.frame = parseInt(cfgInfo.params) || 20;
            tempUI.txtDes.text = cfgInfo.desc;
            // tempUI.txtName.text = cfgInfo.name;
            //限购
            if (cfgInfo.limitBuyPeriod == 0)
                tempUI.txtLimitLabel.text = Global.getLangStr("shop_msg11"); //永久限购";
            else if (cfgInfo.limitBuyPeriod == 7)
                tempUI.txtLimitLabel.text = Global.getLangStr("shop_msg12"); //每周限购";
            else if (cfgInfo.limitBuyPeriod == 30)
                tempUI.txtLimitLabel.text = Global.getLangStr("shop_msg13"); //每月限购";

            //是否已购买
            let shopInfo = PlatformDataMgr.getChargeInfoByCfgInfo(cfgInfo);
            let isBuy = shopInfo && shopInfo.buycount >= cfgInfo.maxBuyCount;
            tempUI.imgBuyOver.visible = isBuy;
            tempUI.btnBuy.visible = !isBuy;
            if (!isBuy)
            {
                tempUI.txtLabelMoney.visible = true;
                tempUI.hboxDiamon.visible = false;
                tempUI.txtLabelMoney.text = Global.getLangStr("common_money", cfgInfo.needMoney / 100);

                tempUI.btnBuy.onClick(this, () =>
                {
                    PlatformDataMgr.onChargeRequest(cfgInfo);
                })
            }

            this.checkSelectPrivilegeItem(parseInt(cfgInfo.params), tempUI);

            //道具列表
            let addItems = cfg.ChargeCfgData.getAddItemAryByID(cfgInfo.iD);
            tempUI.listNorItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });

        }

        /** 检查特权商城商品对应的道具列表里面是否有需要关联的特权 */
        private checkSelectPrivilegeItem(privilegeCardId: Pb_God._emPrivilegeCard, itemUI: ProUI.Pay.PageView.PrivilegeShopViewItemUI): void
        {
            if (!this._defaultPrivilegeList || !privilegeCardId)
            {
                itemUI.visible = false;
                return;
            }
            if (this._defaultPrivilegeList.indexOf(privilegeCardId) >= 0)
            {
                itemUI.visible = true;

                return;
            }
            itemUI.visible = false;

        }

    }
}