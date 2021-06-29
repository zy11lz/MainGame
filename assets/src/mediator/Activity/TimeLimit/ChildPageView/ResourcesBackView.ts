module Pro
{
    /**
     * 资源找回
     */
    export class ResourcesBackView extends ProUI.ActivityMain.TimeLimit.PageView.ResourcesBackUI implements ITableView
    {
       
        // 兑换消耗的道具ID
        private FindBacks: Pb_God.PBFindBackData[];
        //玩家离线天数
        private OfflineDay: number;
        //玩家找回天数
        private FindBackDay: number;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            //	 签到返回 返回当前的状态 PBU32
            EventMgr.on(CmdEvent.ResourceFindBack_GetInfo, this, this.onGetInfo);
            EventMgr.on(CmdEvent.ResourceFindBack_Draw, this, this.onDraw);
            this.btn_Help.onClick(this, this.onClickHelp);

        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.ResourceFindBack_GetInfo, this, this.onGetInfo);
            EventMgr.off(CmdEvent.ResourceFindBack_Draw, this, this.onDraw);
        }

        /** 点击帮助说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "Resback_help");
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            WealSend.getInfo();

        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        /** 奖励数据返回  */
        private onGetInfo(): void
        {
            this.FindBacks = WealDataMgr.FindBacks;
            this.OfflineDay = WealDataMgr.FindBackDay;
            this.FindBackDay = WealDataMgr.FindBackDay > 0 ? WealDataMgr.FindBackDay : 1;
            this.txtDayNume.showText = this.FindBacks.length > 0 ? Global.getLangStr("ResourcesBackView_msg1", this.OfflineDay) : Global.getLangStr("ResourcesBackView_msg7");
            this.refreshList();
        }

        /**领取找回资源奖励后请求数据 */
        protected onDraw(): void
        {
            WealSend.getInfo();
        }

        /** 刷新列表 */
        private refreshList(): void
        {

            let findBacks = this.FindBacks.length > 0 ? true : false;
            this.btn_free.gray = true;
            this.btn_free.mouseEnabled = false;
            this.btn_perfect.gray = !findBacks;
            this.btn_perfect.mouseEnabled = findBacks;

            this.img_NoResources.visible = !findBacks;
            this.img_mask.visible = !findBacks;
            this.txtIntroduce.gray = !findBacks;
            this.txtFreeAdmission.text = Global.getLangStr("ResourcesBackView_msg2");

            for (let i = 0; i < this.FindBacks.length; i++)
            {
                if (this.FindBacks[i].Status != 2)
                {
                    this.btn_free.gray = false;
                    this.btn_free.mouseEnabled = true;
                    this.txtFreeAdmission.text = Global.getLangStr("ResourcesBackView_msg2");
                    break;
                }
                else
                {
                    this.btn_free.gray = true;
                    this.btn_free.mouseEnabled = false;
                    this.txtFreeAdmission.text = Global.getLangStr("ResourcesBackView_msg3");
                }
            }

            let spend = 0;
            for (let i = 0; i < this.FindBacks.length; i++)
            {
                spend += this.FindBacks[i].SubDiamond;
            }
            this.btn_free.onClick(this, () => { WealSend.draw(1, 0) });
            this.btn_perfect.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(8, [2, 0, spend]));
            });

            this.itemList.onRefresh(this.FindBacks.length, this, this.onRefreshItem);
        }

        private onRefreshItem(tempUI: ProUI.ActivityMain.TimeLimit.PageItemView.ResourcesBackListUI, index: number): void
        {
            let _findbacks = this.FindBacks[index];
            tempUI.txtName.text = cfg.WealResourceFindbackCfgData.getDesNameByID(_findbacks.ResourceID);
            //需要扣除的砖石数量
            let subItem = _findbacks.SubDiamond;

            let Reward = _findbacks.Reward;
            tempUI.itemList.visible = Reward.length >= 3;
            tempUI.fourBox.visible = !tempUI.itemList.visible;
            let tmp = tempUI.itemList.visible ? tempUI.itemList : tempUI.fourBox;
            tmp.onRefresh(Reward.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemID(Reward[index].key, Reward[index].value, false, true);
            })

            tempUI.btn_free.onClick(this, () =>
            {
                WealSend.draw(1, _findbacks.ResourceID)
            });
            tempUI.btn_perfect.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(8, [2, _findbacks.ResourceID, subItem]));
            });

            tempUI.txtFreeAdmission.text = Global.getLangStr("ResourcesBackView_msg3");
            tempUI.txtPay.text = Global.getLangStr("ResourcesBackView_msg4");
            switch (_findbacks.Status)
            {
                case 1://没有找回
                    tempUI.btn_free.gray = false;
                    tempUI.btn_perfect.gray = false;
                    tempUI.btn_free.mouseEnabled = true;
                    tempUI.btn_perfect.mouseEnabled = true;
                    tempUI.txtFreeAdmission.text = Global.getLangStr("ResourcesBackView_msg5");
                    tempUI.txtPay.text = Global.getLangStr("ResourcesBackView_msg6");
                    tempUI.txtRecoverRatio.text = Global.getLangStr("Resback_free") + cfg.WealResourceFindbackCfgData.getDiscountByID(_findbacks.ResourceID) + "0%";

                    break;
                case 2://已经免费找回
                    tempUI.btn_perfect.gray = false;
                    tempUI.btn_perfect.mouseEnabled = true;
                    tempUI.txtPay.text = Global.getLangStr("ResourcesBackView_msg6");
                    tempUI.btn_free.gray = true;
                    tempUI.btn_free.mouseEnabled = false;
                    tempUI.txtRecoverRatio.text = Global.getLangStr("Resback_pay");

                    break;
            }

        }

        public setData($data: any): void
        {
        }

        private refreshView(): void
        {
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
        }

    }
}