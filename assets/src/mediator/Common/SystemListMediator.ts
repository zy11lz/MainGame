module Pro
{
    /**
     * 界面说明： 系统功能预览列表界面
    * @author jason.xu
    */
    export class SystemListMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.SystemList.SystemOpenListUI;

        /** 显示的列表 */
        private _showList: cfg.SystemSwitchSystemSwitchCfgInfo[];

        /** 当前选择的索引（用list的selectEnable会在轻微滑动的时候丢失，体验感非常差，异用） */
        private _selectedIndex = -1;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('systemList')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.SystemList.SystemOpenListUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            // this.UIPanel.listView.selectEnable = true;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshList();
            this.resetSelectedIndex(0, true);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnGoto.onClick(this, this.onClickgoto);
            this.UIPanel.btnGetReward.onClick(this, this.onClickGetReward);

            // this.UIPanel.listView.on(Laya.Event.CHANGE, this, this.onChangeListSelected);

            this.addEventMgr(CmdEvent.Common_SystemSwitchPrize, this, this.onPrize);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        private onClickgoto(): void
        {
            let cfgInfo = this._showList[this._selectedIndex];
            if (!cfgInfo) return;
            TaskUtils.gotoOpenByUICfgId(cfgInfo.uIOpenId);
        }

        private onClickGetReward(): void
        {
            let cfgInfo = this._showList[this._selectedIndex];
            if (!cfgInfo) return;
            //判断功能是否已经开启
            if (!PlayerDataMgr.checkSystemSwitchOpen(cfgInfo.iD, true))
            {
                return;
            }
            CommonSend.systemSwitchPrize(cfgInfo.iD);
        }

        /** 领奖返回 */
        private onPrize(): void
        {
            this.UIPanel.listView.refresh();
            this.resetSelectedIndex(this._selectedIndex, true);
        }

        private resetSelectedIndex(index: number, forceRefresh: boolean): void
        {
            if (this._selectedIndex == index && !forceRefresh) return;
            if (this._selectedIndex != index)
            {
                let oldIndex = this._selectedIndex;
                this._selectedIndex = index;
                //刷新一下旧的按钮
                this.UIPanel.listView.setItem(oldIndex, true);
            }
            this.UIPanel.listView.setItem(index, true);
            let cfgInfo = this._showList[this._selectedIndex];
            this.UIPanel.txtDesc.text = cfgInfo.describe;
            //按钮状态
            //已开启
            let isOpen = PlayerDataMgr.checkSystemSwitchOpen(cfgInfo.iD);
            //可领奖
            let canGetReward = isOpen && cfgInfo.addItem && !PlayerDataMgr.getSystemPrizeState(cfgInfo.iD);
            this.UIPanel.btnGoto.visible = isOpen && !canGetReward;
            this.UIPanel.btnGetReward.visible = !this.UIPanel.btnGoto.visible;
            this.UIPanel.imgGetReddot.visible = canGetReward;

            //奖励预览
            let addItems = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemInfoArr");
            this.UIPanel.listPrizeView.onRefresh(addItems.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(addItems[index]);
            });
        }
        /** 刷新列表 */
        private refreshList(): void
        {
            let allCfgList = cfg.SystemSwitchSystemSwitchCfgData.getSortList();
            //简化排序算法
            let canRewardList = [];//可领奖的
            let noOpenList = [];//未开启的
            let rewardList = [];//已领奖的
            for (let cfgInfo of allCfgList)
            {
                if (cfgInfo.open) continue; //全局开关关闭功能
                if (!cfgInfo.remindSwitch) continue;
                if (cfgInfo.sort == 0) continue;  //策划要求sort是0的也不要做功能预览显示

                if (PlayerDataMgr.checkSystemSwitchOpen(cfgInfo.iD))
                {
                    //有奖可领时
                    if (cfgInfo.addItem && !PlayerDataMgr.getSystemPrizeState(cfgInfo.iD)) canRewardList.push(cfgInfo);
                    else rewardList.push(cfgInfo);
                } else
                {
                    noOpenList.push(cfgInfo);
                }
            }
            this._showList = canRewardList.concat(noOpenList).concat(rewardList);

            this.UIPanel.listView.onRefresh(this._showList.length, this, this.onRefreshListItem);
        }

        private onRefreshListItem(item: ProUI.SystemList.ItemUI, index: number): void
        {
            let isSel = index == this._selectedIndex;
            item.bg.frame = isSel ? 2 : 1;
            item.bg_0.visible = isSel ? false : true;
            let cfgInfo = this._showList[index];
            item.txtName.text = cfgInfo.name;
            item.imgIcon.skin = "res/Unpack/Icon/SystemIcon/" + cfgInfo.icon;
            //状态显示
            //已开启
            let isOpen = PlayerDataMgr.checkSystemSwitchOpen(cfgInfo.iD);
            //可领奖
            let canGetReward = isOpen && cfgInfo.addItem && !PlayerDataMgr.getSystemPrizeState(cfgInfo.iD);
            item.imgReddot.visible = !isSel && canGetReward;
            if (canGetReward)
            {
                item.txtDes.text = Global.getLangStr("systemList_msg4");
                item.txtDes.color = "#ff6600";
            } else if (isOpen)
            {
                item.txtDes.text = Global.getLangStr("systemList_msg5");
                item.txtDes.color = "#009e00";
            } else
            {  //显示开启条件
                item.txtDes.text = PlayerDataMgr.getSystemOpenShortString(cfgInfo);
                item.txtDes.color = "#784720";
            }
            item.onClick(this, () =>
            {
                this.resetSelectedIndex(index, false);
            })
        }


    }
}