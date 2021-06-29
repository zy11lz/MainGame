module Pro
{
    /**
    * 个人形象配置界面分页-头像框
    * @author jason.xu
    */
    export class ShapePageViewHeadFrame extends ProUI.Shape.ChildView.PageViewHeadFrameUI implements ITableView
    {

        /** 当前使用的ID， 临时存一份UI上已经显示的项，便于在更新时，取旧值更新相应的item，避免整个列表的刷新 */
        private _curUseId: number = -1;
        /** 当前显示的排序后的列表 */
        private _list: cfg.ShapeHeadIconCfgInfo[] = [];

        /** 打开窗口后，首次显示到此分页时需要拉取一次数据，保证新鲜 */
        private _isPull: boolean = false;
        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._isPull = false;
            this._curUseId = ShapeDataMgr.iconFrameID;
            this.listView.selectEnable = true;
            this.listView.onRefresh(0, null, null);
            this.listView.paddingVArr = [[0, 15]];
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            if (!this._isPull)
            {
                this._isPull = true;
                ShapeSend.openHeadIcon();
            } else
            {
                this.onRefreshList();
            }
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }

        public addEvent(): void
        {
            EventMgr.on(CmdEvent.Shape_SynAllHeadIcon, this, this.onRefreshList);
            EventMgr.on(CmdEvent.Shape_AddHeadIcon, this, this.onUpdateHeadIcon);
            EventMgr.on(CmdEvent.Shape_SynHeadIcon, this, this.onUpdateHeadIcon);
            EventMgr.on(CmdEvent.Shape_SetHeadIconAck, this, this.onChangeUseHeadIcon);

            this.listView.on(Laya.Event.CHANGE, this, this.onChangeSelectedIndex);
            this.btnActive.onClick(this, this.onClickActivate);
            this.btnUse.onClick(this, this.onClickUse);
        }

        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Shape_SynAllHeadIcon, this, this.onRefreshList);
            EventMgr.off(CmdEvent.Shape_AddHeadIcon, this, this.onUpdateHeadIcon);
            EventMgr.off(CmdEvent.Shape_SynHeadIcon, this, this.onUpdateHeadIcon);
            EventMgr.off(CmdEvent.Shape_SetHeadIconAck, this, this.onChangeUseHeadIcon);
        }

        /** 刷新列表 */
        private onRefreshList(): void
        {
            let allList = cfg.ShapeHeadIconCfgData.getAllList();
            this._list = [];
            //排序（将ownlist里面的排前面）
            for (let el of allList)
            {
                if (ShapeDataMgr.isActiveHeadFrame(el.iD)) { this._list.unshift(el); }
                else { this._list.push(el); }
            }
            this.listView.selectedIndex = 0;
            this.listView.onRefresh(this._list.length, this, this.onRefreshItem);
        }

        private onRefreshItem(tempUI: ProUI.Shape.ChildView.PageViewHeadFrameItemUI, index: number): void
        {
            let cfgData = this._list[index];
            Global.setResHeadBorder(tempUI.icon, cfgData.iD);
            tempUI.txtName.text = cfgData.name;
            tempUI.sel.visible = index == this.listView.selectedIndex;
            tempUI.using.visible = cfgData.iD == ShapeDataMgr.iconFrameID;
            tempUI.btn.gray = !ShapeDataMgr.isActiveHeadFrame(cfgData.iD);
        }

        private onChangeSelectedIndex(): void
        {
            let index: number = this.listView.selectedIndex;
            let cfgData = this._list[index];

            let isActive = ShapeDataMgr.isActiveHeadFrame(cfgData.iD);
            this.btnActive.visible = !isActive;
            this.btnUse.visible = isActive;
            if (!isActive)
            {//没有激活，弹窗提示来源
                this.showActiveTipView(cfgData);
            }
        }

        private showActiveTipView(cfgData: cfg.ShapeHeadIconCfgInfo): void
        {
            this.viewActiveTip.visible = true;
            let time = cfgData.continueTime / 3600 / 24;
            this.activeTipTime.text = Global.getLangStr("shape_msg1") + (time == 0 ? Global.getLangStr("shape_msg3") : Global.getLangStr("shape_msg4", time));
            this.activeTipCondition.text = Global.getLangStr("shape_msg2") + cfgData.activeDesc;
            this.activeTipName.text = cfgData.name;
            let viewHeight = this.activeTipCondition.height + 120;
            if (viewHeight < 240) { viewHeight = 240; }
            this.viewActiveTip.height = viewHeight;
            Global.setResHeadBorder(this.activeTipIcon, cfgData.iD);
            Laya.stage.once(Laya.Event.MOUSE_DOWN, this, () =>
            {
                this.viewActiveTip.visible = false;
            });
        }

        /** 头像框信息有变（新激活） */
        private onUpdateHeadIcon(value: Pb_God.PBPlayerHeadIcon): void
        {
            if (!ShapeDataMgr.isActiveHeadFrame(value.id)) { return; }
            //刷新列表
            this.onRefreshList();
            //重新选择新激活的项
            let cfgData = cfg.ShapeHeadIconCfgData.getInfo(value.id);
            this.listView.selectedIndex = this._list.indexOf(cfgData);
        }

        /** 修改当前使用的头像框 */
        private onChangeUseHeadIcon(value: Pb_God.PBU32): void
        {
            let newId = value.value;
            let oldId = this._curUseId;
            this._curUseId = ShapeDataMgr.iconFrameID;
            this.__refreshItemById(oldId);
            this.__refreshItemById(newId);
        }

        /** 刷新指定ID对应的项 */
        private __refreshItemById(id: number): void
        {
            let cfgData = cfg.ShapeHeadIconCfgData.getInfo(id);
            let index = this._list.indexOf(cfgData);
            this.listView.setItem(index, cfgData);
        }

        /** 点击使用 */
        private onClickUse(): void
        {
            let cfgData = this._list[this.listView.selectedIndex];
            if (!cfgData) { return; }
            //当前已选
            if (ShapeDataMgr.iconFrameID == cfgData.iD)
            { return; }
            ShapeSend.setHeadIcon(cfgData.iD);
        }

        /** 点击激活按钮 */
        private onClickActivate(): void
        {
            let cfgData = this._list[this.listView.selectedIndex];
            if (!cfgData) { return; }
            //判断道具
            let needItem = cfgData.needItem;
            if (needItem)
            {
                let itemInfo = ItemDataMgr.getItemInfoById(needItem);
                if (!itemInfo)
                {
                    TipsUtils.showTipsByLanId("bag_msg7", cfg.ItemCfgData.getNameById(needItem));
                    return;
                }
                ItemSend.use(itemInfo.itemsn, 1);
            }
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

    }
}