module Pro
{
    /**
    * 界面说明： 设置徽章展示
    * @author jason.xu
    */
    export class PlayerBadgeSetShowMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.PlayerInfo.PlayerBadgeSetShowUI;

        /** 当前展示的列表 */
        private _showList: number[];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("playerinfohome")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/playerinfohome/shape_001.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.PlayerInfo.PlayerBadgeSetShowUI, 1, BaseAddLayer.TopUI, true, 1);
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
            this._showList = ShapeDataMgr.badgedisplay.splice(0);

            this.refreshWaitList();
            this.refreshShowList();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 刷新已经展示的列表 */
        private refreshShowList(): void
        {
            let list = ShapeDataMgr.badgedisplay;
            this.UIPanel.listShow.onRefresh(3, this, (box: Laya.Box, index: number) =>
            {
                let btn = box.getChildByName("btnIcon") as component.UIButton;
                let id = list[index];
                btn.visible = !!id;

                if (!id) return;

                let iconName = cfg.ShapeBadgeCfgData.getIconNameByID(id);
                btn.skin = `res/Unpack/Icon/Honor/${ iconName }.png`;
                btn.onClick(this, () =>
                {
                    this.handerBadge(id);
                })
            })
        }

        /** 刷新待展示的徽章 */
        private refreshWaitList(): void
        {
            let list = ShapeDataMgr.badgeList;
            this.UIPanel.imgEmpty.visible = list.length == 0;
            this.UIPanel.listWait.onRefresh(list.length, this, (tempUI: ProUI.PlayerInfo.ItemView.BadgeSetShowItemUI, index: number) =>
            {
                let info = list[index];
                tempUI.useTag.visible = this.checkIsShow(info.id);
                let iconName = cfg.ShapeBadgeCfgData.getIconNameByID(info.id);
                tempUI.imgIcon.skin = `res/Unpack/Icon/Honor/${ iconName }.png`;
                tempUI.btn.onClick(this, () =>
                {
                    this.handerBadge(info.id);
                })
            })
        }

        /** 处理徽章（展示中就卸下来， 未展示就展示上去） */
        private handerBadge(id: number): void
        {
            let showIndex = this._showList.indexOf(id);
            if (showIndex >= 0)
            {
                this._showList.splice(showIndex, 1);
            } else
            {
                if (this._showList.length >= 3)
                { //超限
                    TipsUtils.showTipsByLanId("tips_msg36");
                    return;
                }
                this._showList.push(id);
            }
            ShapeSend.badgeDisplay(this._showList);
            this.refreshWaitList();
            this.refreshShowList();
        }

        private checkIsShow(id: number): boolean
        {
            return this._showList.indexOf(id) >= 0;
        }

    }
}