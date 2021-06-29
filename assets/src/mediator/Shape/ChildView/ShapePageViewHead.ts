module Pro
{
    /**
    * 个人形象配置界面分页-头像
    * @author jason.xu
    */
    export class ShapePageViewHead extends ProUI.Shape.ChildView.PageViewHeadUI implements ITableView
    {

        /** 当前选中的有效索引（只能选已经激活的，所以不能用list的selectIndex） */
        private _curSelIndex: number = -1;
        /** 当前使用的ID， 临时存一份UI上已经显示的项，便于在更新时，取旧值更新相应的item，避免整个列表的刷新 */
        private _curUseId: number = -1;
        /** 当前显示的排序后的列表 */
        private _list: cfg.PetSkinCfgInfo[] = [];

        /** 打开窗口后，首次显示到此分页时需要拉取一次数据，保证新鲜 */
        private _isPull: boolean = false;
        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._isPull = false;
            this.listView.onRefresh(0, null, null);
        }

        public addEvent(): void
        {
            EventMgr.on(CmdEvent.Shape_SynAllHead, this, this.onRefreshList);
            EventMgr.on(CmdEvent.Shape_SetHeadAck, this, this.onChangeUseHead);
            this.btnUse.onClick(this, this.onClickUse);
        }

        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Shape_SynAllHead, this, this.onRefreshList);
            EventMgr.off(CmdEvent.Shape_SetHeadAck, this, this.onChangeUseHead);
        }


        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            if (!this._isPull)
            {
                this._isPull = true;
                ShapeSend.openHead();
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

        /** 刷新列表 */
        private onRefreshList(): void
        {
            let allList = cfg.PetSkinCfgData.getHeadList();
            this._list = [];
            this._curUseId = ShapeDataMgr.iconId;
            //排序（将ownlist里面的排前面）
            for (let el of allList)
            {
                if (ShapeDataMgr.isActiveHead(el.id)) this._list.unshift(el);
                else this._list.push(el);
            }
            this.changeSelectedIndex(0);
            this.listView.onRefresh(this._list.length, this, this.onRefreshItem);
        }

        private onRefreshItem(tempUI: ProUI.Shape.ChildView.PageViewIconItemUI, index: number): void
        {
            let cfgData = this._list[index];
            Global.setResIconWithItemID(tempUI.icon, CfgID.ResType.Player_Icon, cfgData.id);
            tempUI.txtName.text = "";  //共享的UI，此处不需要显示名字
            tempUI.sel.visible = index == this._curSelIndex;
            tempUI.btn.gray = !ShapeDataMgr.isActiveHead(cfgData.id);
            tempUI.using.visible = cfgData.id == ShapeDataMgr.iconId;
            tempUI.btn.onClick(this, () =>
            {
                this.changeSelectedIndex(index);
            })
        }

        private changeSelectedIndex(index: number): void
        {
            if (this._curSelIndex == index) return;
            let cfgData = this._list[index];
            if (!ShapeDataMgr.isActiveHead(cfgData.id))
            {//没有激活                
                TipsUtils.showTipsByLanId("tips_msg50", cfgData.headActiveDesc);
                return;
            }
            let oldIndex = this._curSelIndex;
            this._curSelIndex = index;
            //刷新一下item
            if (this._list[oldIndex]) this.listView.setItem(oldIndex, this._list[oldIndex]);
            if (this._list[index]) this.listView.setItem(index, this._list[index]);
        }

        /** 点击使用按钮 */
        private onClickUse(): void
        {
            let cfgData = this._list[this._curSelIndex];
            if (!cfgData) return;
            //当前已选
            if (ShapeDataMgr.iconId == cfgData.id)
                return;
            ShapeSend.setHead(cfgData.id);
        }

        /** 修改当前使用的头像 */
        private onChangeUseHead(value: Pb_God.PBU32): void
        {
            let newId = value.value;
            let oldId = this._curUseId;
            this._curUseId = newId;
            this.__refreshItemById(oldId);
            this.__refreshItemById(newId);
        }

        /** 刷新指定ID对应的项 */
        private __refreshItemById(id: number): void
        {
            let cfgData = cfg.PetSkinCfgData.getInfo(id);
            let index = this._list.indexOf(cfgData);
            this.listView.setItem(index, cfgData);
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}