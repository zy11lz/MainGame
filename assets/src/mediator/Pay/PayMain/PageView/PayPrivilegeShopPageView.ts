module Pro
{
    /**
    * 充值：特权商城分页
    * @author jason.xu
    */
    export class PayPrivilegeShopPageView extends ProUI.Pay.PageView.PrivilegeShopViewUI implements ITableView
    {

        /** 默认打开时需要提示高亮的特权列表 */
        private _defaultPrivilegeList: number[] = null;
        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(Cmd.S2C_Privilege_ShopBuy.cmdName, this, this.refreshList);
            EventMgr.on(Cmd.S2C_Platform_update_chargeinfo.cmdName, this, this.onUpdate_chargeinfo);
            EventMgr.on(Cmd.S2C_Platform_SynCharge.cmdName, this, this.refreshList);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(Cmd.S2C_Privilege_ShopBuy.cmdName, this, this.refreshList);
            EventMgr.off(Cmd.S2C_Platform_update_chargeinfo.cmdName, this, this.onUpdate_chargeinfo);
            EventMgr.off(Cmd.S2C_Platform_SynCharge.cmdName, this, this.refreshList);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            //标记今天已经点开过了
            TodayRepeatOpMgr.Inst.setTag("privilegeShopOpen");
            this.refreshView();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            this._defaultPrivilegeList = null;
        }

        public setData($data: any): void
        {
            this._defaultPrivilegeList = $data;
        }

		/*****
		 * 更新充值信息 PBChargeInfo
		 * @param PBChargeInfo
		 * 		groupid			uint32	商品组id
		 * 		firstbuytime			uint32	第一次购买时间
		 * 		lastbuytime			uint32	最近一次购买时间
		 * 		buycount			uint32	总购买次数
		 */
        protected onUpdate_chargeinfo(value: Pb_God.PBChargeInfo): void
        {
            if (cfg.ChargeCfgData.getChargeTypeByID(value.groupid) != Pb_God._emChargeType.ChargeType_PrivilegeCard) return;
            this.refreshList();
        }

        /** 刷新视图显示 */
        private refreshView(): void
        {
            this.refreshList();
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
            this.listView.onRefreshWithArray(list, this, this.onRefreshItem);
            if (this._defaultPrivilegeList)
            {
                //简化计算，就不单独去找了，如果是寻宝的特权跳转，就直接滚到下面好了。
                if (this._defaultPrivilegeList.indexOf(Pb_God._emPrivilegeCard.PrivilegeCard_SailAdvance) >= 0)
                {
                    this.listView.tweenTo(4, 0);
                } else
                {
                    this.listView.tweenTo(0, 0);
                }
                Laya.timer.once(500, this, () =>
                {
                    this._defaultPrivilegeList = null;
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
                this.onRefreshItemByChargeCfginfo(tempUI, this.listView.getItem(index) as cfg.ChargeCfgInfo, index);
            else
                this.onRefreshItemByShopCfginfo(tempUI, this.listView.getItem(index) as cfg.PrivilegeShopCfgInfo, index);
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

            //策划要求不在显示红色闪动框
            //  this.checkSelectPrivilegeItem(cfgInfo.cardID, tempUI);

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

            //策划要求不在显示红色闪动框
            //  this.checkSelectPrivilegeItem(parseInt(cfgInfo.params), tempUI);

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
                itemUI.imgSelEff.visible = false;
                return;
            }
            if (this._defaultPrivilegeList.indexOf(privilegeCardId) >= 0)
            {
                itemUI.imgSelEff.visible = true;
                itemUI.effSel.play(0, false);
                return;
            }
            itemUI.imgSelEff.visible = false;
            itemUI.effSel.stop();
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
        }


        /** 是否全部购买 */
        public isBuyAll()
        {
            let list = [];
            list = list.concat(PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_PrivilegeCard));
            this._chargeMaxIndex = list.length - 1;
            list = list.concat(cfg.PrivilegeShopCfgData.getAll());

            for (let index = 0; index < list.length; index++)
            {
                if (index <= this._chargeMaxIndex)
                {
                    let cfgInfo1 = list[index] as cfg.ChargeCfgInfo;
                    let shopInfo = PlatformDataMgr.getChargeInfoByCfgInfo(cfgInfo1);
                    let isBuy = shopInfo && shopInfo.buycount >= cfgInfo1.maxBuyCount;
                    if (!isBuy) return false;
                }
                else
                {
                    let cfgInfo2 = list[index] as cfg.PrivilegeShopCfgInfo;
                    let isBuy = !!PrivilegeDataMgr.getPrivilegeShopBuyCount(cfgInfo2.index);
                    if (!isBuy) return false;
                }
            }
            return true
        }
    }
}