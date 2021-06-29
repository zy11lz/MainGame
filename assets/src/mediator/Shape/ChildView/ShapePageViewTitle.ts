module Pro
{
    /**
    * 个人形象配置界面分页-称号
    * @author jason.xu
    */
    export class ShapePageViewTitle extends ProUI.Shape.ChildView.PageViewTitleUI implements ITableView
    {

        /** 当前使用的ID， 临时存一份UI上已经显示的项，便于在更新时，取旧值更新相应的item，避免整个列表的刷新 */
        private _curUseId: number = -1;
        /** 当前显示的排序后的列表 */
        private _list: cfg.ShapeTitleCfgInfo[] = [];

        /** 打开窗口后，首次显示到此分页时需要拉取一次数据，保证新鲜 */
        private _isPull: boolean = false;
        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._isPull = false;
            this._curUseId = ShapeDataMgr.usetitleid;
            this.listView.selectEnable = true;
            this.listView.onRefresh(0, null, null);
        }


        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            if (!this._isPull)
            {
                this._isPull = true;
                ShapeSend.openTitle();
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
            EventMgr.on(CmdEvent.Shape_SynAllTitle, this, this.onRefreshList);
            EventMgr.on(CmdEvent.Shape_SetTitleAck, this, this.onChangeUseTitle);
            EventMgr.on(CmdEvent.Shape_SynTitle, this, this.onUpdateTitle);

            this.listView.on(Laya.Event.CHANGE, this, this.onChangeSelectedIndex);
            this.btnActive.onClick(this, this.onClickActive);
            this.btnGoto.onClick(this, this.onClickGoto);
            this.btnUse.onClick(this, this.onClickUse);
        }

        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Shape_SynAllTitle, this, this.onRefreshList);
            EventMgr.off(CmdEvent.Shape_SetTitleAck, this, this.onChangeUseTitle);
            EventMgr.off(CmdEvent.Shape_SynTitle, this, this.onUpdateTitle);
        }

        private onChangeSelectedIndex(): void
        {
            let index: number = this.listView.selectedIndex;
            let cfgData = this._list[index];

            //0-未激活  1-已使用道具待激活  2-已激活
            let activeState = ShapeDataMgr.titleActiveState(cfgData.iD);
            this.btnGoto.visible = activeState == 0;
            this.btnActive.visible = activeState == 1;
            this.btnUse.visible = activeState == 2;
        }

        /** 刷新列表 */
        private onRefreshList(): void
        {
            let allList = cfg.ShapeTitleCfgData.getAllList();
            this._list = allList.slice(0);
            this._list.sort((a: cfg.ShapeTitleCfgInfo, b: cfg.ShapeTitleCfgInfo) =>
            {
                let cutActiveState = ShapeDataMgr.titleActiveState(b.iD) - ShapeDataMgr.titleActiveState(a.iD);
                if (cutActiveState != 0) { return cutActiveState; }
                return a.iD - b.iD;
            })
            this.listView.selectedIndex = 0;
            this.listView.onRefresh(this._list.length, this, this.onRefreshItem);
        }

        private onRefreshItem(tempUI: ProUI.Shape.ChildView.PageViewTitleItemUI, index: number): void
        {
            let cfgData = this._list[index];
            Global.setResShapeTitle(tempUI.icon, cfgData.iD);
            tempUI.sel.visible = index == this.listView.selectedIndex;
            tempUI.using.visible = cfgData.iD == ShapeDataMgr.usetitleid;
            tempUI.txtDes.text = Global.getLangStr("shape_msg5") + cfgData.describe;

            //0-未激活  1-已使用道具待激活  2-已激活
            let activeState = ShapeDataMgr.titleActiveState(cfgData.iD);
            if (activeState == 0) { tempUI.txtActiveTip.text = Global.getLangStr("shape_msg6"); }//未激活";
            else if (activeState == 1) { tempUI.txtActiveTip.text = Global.getLangStr("shape_msg7"); }//待激活";
            else { tempUI.txtActiveTip.text = ""; }

            //属性列表
            let attrList = cfg.ShapeTitleCfgData.getAddAttrListInfoByCfgInfo(cfgData);
            tempUI.listAttr.onRefresh(attrList.length, this, (label: Laya.Label, nAttr: number) =>
            {
                let attr = attrList[nAttr];
                label.text = Global.getFullAttrValueString(attr, "：");
            })
        }

        /** 称号信息有变（新激活） */
        private onUpdateTitle(value: Pb_God.PBPlayerTitle): void
        {
            if (ShapeDataMgr.titleActiveState(value.titleid) != 2) { return; }
            //刷新列表
            this.onRefreshList();
            //重新选择新激活的项
            let cfgData = cfg.ShapeTitleCfgData.getInfo(value.titleid);
            this.listView.selectedIndex = this._list.indexOf(cfgData);
        }

        /** 修改当前使用的称号 */
        private onChangeUseTitle(value: Pb_God.PBU32): void
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
            let cfgData = cfg.ShapeTitleCfgData.getInfo(id);
            let index = this._list.indexOf(cfgData);
            this.listView.setItem(index, cfgData);
        }

        /** 点击激活 */
        private onClickActive(): void
        {
            let cfgData = this._list[this.listView.selectedIndex];
            if (!cfgData) { return; }
            ShapeSend.activeTitle(cfgData.iD);
        }

        /** 点击使用 */
        private onClickUse(): void
        {
            let cfgData = this._list[this.listView.selectedIndex];
            if (!cfgData) { return; }
            ShapeSend.setTitle(cfgData.iD);
        }

        /** 点击前往获取 */
        private onClickGoto(): void
        {
            let cfgData = this._list[this.listView.selectedIndex];
            if (!cfgData) { return; }
            //关闭当前界面(界面太多了)
            UIManager.Inst.closeByName(PanelNotify.Open_ShapeDev);
            TaskUtils.gotoOpenByUICfgId(cfgData.gameSystemType);
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}