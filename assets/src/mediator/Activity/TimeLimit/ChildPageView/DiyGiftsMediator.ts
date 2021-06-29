module Pro
{
    /**
     * 定制礼包
     */
    export class DiyGiftsMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.ActivityMain.TimeLimit.PageView.DiyGiftViewUI;

        /** 当前选中池 */
        private _curSelectPool: number = -1;

        private _curDiyInfo: Pb_God.PBPlayerActivityIndexData;
        // private _tempMap;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.closeBtn.onClick(this, this.closeUI);
            this.UIPanel.cancelBtn.onClick(this, this.closeUI);
            this.UIPanel.saveBtn.onClick(this, (btn: component.UIButton) =>
            {
                for (let i = 0; i < this._curDiyInfo.data.length; i++)
                {
                    if (this._curDiyInfo.data[i].value == -1)
                    {
                        TipsUtils.showTipsByLanId("activity_msg32");
                        return;
                    }
                }
                EventMgr.trigger(EventNotify.DiyGift_Selected, this._curDiyInfo);
                this.closeUI();
            });

            //纵向滚动
            this.UIPanel.panel.vScrollBarSkin = "";

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {

            this.refreshUI();
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.TimeLimit.PageView.DiyGiftViewUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
            this._curDiyInfo = this.UIOpenData.customObject[0];
            let customPool: string = cfg.CustomGiftCfgData.getCustomPoolByIndex(this._curDiyInfo.index);
            let customs = customPool.split(";");
            this._curSelectPool = this.UIOpenData.customObject[1] ? parseInt(customs[this.UIOpenData.customObject[1]]) : parseInt(customs[0])
            if (this._curDiyInfo.data.length == 0)
            {
                this.initDiyInfo();
            }
            this.initItemInfo();
            this.refreshAllItems();
        }

        // 初始化赋值
        private initDiyInfo(): void
        {
            let customPool: string = cfg.CustomGiftCfgData.getCustomPoolByIndex(this._curDiyInfo.index);
            let customs = customPool.split(";");
            let customInfo = this._curDiyInfo.data;
            for (let i = 0; i < customs.length; i++)
            {
                let info: Pb_God.PBU32U32 = new Pb_God.PBU32U32();
                info.key = parseInt(customs[i]);
                info.value = -1;
                this._curDiyInfo.data[i] = info
            }
        }

        /** 刷新奖励池 */
        public refreshAllItems(): void
        {
            let customPool: string = cfg.CustomGiftCfgData.getCustomPoolByIndex(this._curDiyInfo.index);
            let customs = customPool.split(";");
            this.UIPanel.selectList.onRefresh(customs.length, this, (box: Laya.Box, index: number) =>
            {
                let itemRewardUI = box.getChildAt(0) as NorItemUI;
                let select = box.getChildAt(1) as Laya.Image;
                if (this._curDiyInfo.data[index].value == -1)
                {
                    itemRewardUI.setItemID(2, 2, false, false, false);
                    itemRewardUI.SelectStatueImg.visible = false;
                    itemRewardUI.PlusStatueImg.visible = true;
                }
                else
                {
                    let info = cfg.CustomGiftGiftpoolCfgData.getInfoByDoubleKey(parseInt(customs[index]), this._curDiyInfo.data[index].value);
                    itemRewardUI.setItemInfo(cfg.AddItemInfo.parse(info.item)[0]);
                }
                itemRewardUI.name = customs[index];
                itemRewardUI.onClick(this, this.onItemClick);
                itemRewardUI["scaleDown"] = 1;

                select.visible = this._curSelectPool == parseInt(customs[index]);
            });
            this.UIPanel.selectList.width = customs.length * 170;

            if (this._curSelectPool == -1) return;

            let arr: Array<cfg.CustomGiftGiftpoolCfgInfo> = cfg.CustomGiftGiftpoolCfgData.getInfoByPoolId(this._curSelectPool);
            this.UIPanel.itemListView.onRefresh(arr.length, this, (box: Laya.Box, index: number) =>
            {
                let itemRewardUI = box.getChildAt(0) as NorItemUI;
                let select = box.getChildAt(1) as Laya.Image;
                let itemInfo = cfg.AddItemInfo.parse(arr[index].item)[0];
                itemRewardUI.setItemInfo(itemInfo);
                itemRewardUI["scaleDown"] = 1;
                itemRewardUI.onClick(this, this.onItemClick);
                itemRewardUI.name = `${ this._curSelectPool }_${ index + 1 }`;

                select.visible = this.getCurDiyInfoValue() == index + 1;
            });

            // this.UIPanel.selItem.setItemInfo(this.UIOpenData.itemList[this.UIPanel.itemListView.selectedIndex - 1],false,true);
            this.refreshItemInfo();
        }

        // 刷新道具详情
        private refreshItemInfo(): void
        {
            if (this._curSelectPool == -1 || this.getCurDiyInfoValue() == -1) return;
            let info: cfg.CustomGiftGiftpoolCfgInfo = cfg.CustomGiftGiftpoolCfgData.getInfoByDoubleKey(this._curSelectPool, this.getCurDiyInfoValue())
            let TmpItem = cfg.AddItemInfo.parse(info.item)[0]
            this.UIPanel.itemInfo.setItemInfo(TmpItem);

            // 名称
            this.UIPanel.NameLb.text = cfg.ItemCfgData.getNameById(TmpItem.itemid);
            this.UIPanel.NameLb.color = Global.getResQuColor(Global.getResQuNum(CfgID.ResType.Item, TmpItem.itemid));
            if (!GlobalData.isRelease)
            {
                this.UIPanel.NameLb.text = cfg.ItemCfgData.getNameById(TmpItem.itemid) + "_" + TmpItem.itemid;
            }
            // 描述
            var desc: string = cfg.ItemCfgData.getDescById(TmpItem.itemid);
            desc = desc.replace(/\\n/g, "<br/>")
            this.UIPanel.DesLb.innerHTML = this.UIPanel.DesLb.showText = desc;

            Laya.timer.frameOnce(1, this, () =>
            {
                this.UIPanel.DesLb.height = this.UIPanel.DesLb.htmlDivElement.height;
                this.UIPanel.panel.refresh();
            })
            // 拥有数量
            let itemCount = Global.getItemNum(TmpItem.itemid);
            this.UIPanel.itemCount.text = Global.getLangStr("activity_chargeMsg6", itemCount);
        }

        // 初始化道具详情
        private initItemInfo(): void
        {
            this.UIPanel.NameLb.text = ""
            this.UIPanel.DesLb.innerHTML = "";
            this.UIPanel.itemCount.text = "";
        }

        /** item点击 */
        private onItemClick(btn: NorItemUI)
        {
            this._curSelectPool = parseInt(btn.name.split("_")[0]);
            if (btn.name.split("_")[1])
            {
                this._curDiyInfo.data[this.getCurDiyInfoIndex()].value = parseInt(btn.name.split("_")[1]);
            }
            this.refreshAllItems();
        }

        private getCurDiyInfoValue(): number
        {
            for (let i = 0; i < this._curDiyInfo.data.length; i++)
            {
                let info = this._curDiyInfo.data[i];
                if (info.key == this._curSelectPool)
                    return info.value;
            }
            return -1;
        }

        private getCurDiyInfoIndex(): number
        {
            for (let i = 0; i < this._curDiyInfo.data.length; i++)
            {
                let info = this._curDiyInfo.data[i];
                if (info.key == this._curSelectPool)
                    return i;
            }
            return 0;
        }
    }
}