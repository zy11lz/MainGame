module Pro
{
    /**
    * 个人空间界面： 荣誉墙分页
    (按传入的数据区分是显示自己的荣誉墙还是查看其它玩家的)
    * 查看自己时，会显示“展示设置按钮”，未解锁的徽章也会以锁定的方式显示，
    * 而查看其它玩家时，只显示已经解锁的徽章。
    * @author jason.xu
    */
    export class PlayerHomePageHonor extends ProUI.PlayerInfo.PageView.HomePageHonorUI implements ITableView
    {
        /** 当前查看的是否为自己 */
        private _isSelf: boolean;

        /** 玩家昵称 */
        private _owenNickname: string;
        /**荣誉点数*/
        private _honorpoint: number;
        /**徽章*/
        private _badgeList: Pb_God.PBPlayerBadge[];
        private _idMapBadge: ds.StringMap<Pb_God.PBPlayerBadge>;

        /** 所有荣誉类型对应的名字文字(Pb_God._emBadgeType) */
        private _honorTypeNames: string[];
        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._honorTypeNames = Global.getLangStr("shape_honor_names").split(";");
        }

        public addEvent(): void
        {
            this.btnLevelIcon.onClick(this, this.onClickLevelIcon);
            this.btnSetShow.onClick(this, this.onClickSetShow);
        }

        public removeEvent(): void
        {
        }

        /** 点击等级图标 */
        private onClickLevelIcon(): void
        {
            PlayerHonorLevelPanel.show(this._owenNickname, this._honorpoint, this._badgeList.length, this._isSelf);
        }

        /** 点击展示设置按钮 */
        private onClickSetShow(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PlayerBadgeSetShow));
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {
            this._isSelf = $data[0];
            this._owenNickname = $data[1];
            this._honorpoint = $data[2];
            this._badgeList = $data[3];

            this._idMapBadge = Global.listToStringMapData(this._badgeList, "id");
            //徽章总数
            let maxCount = 33;
            let curCount = this._badgeList.length;
            let progress = curCount / maxCount;
            this.imgProgress.scaleX = progress;
            this.txtCount.text = curCount + "";
            this.txtCount2.text = curCount + "/" + maxCount;
            this.txtProgress.text = Global.parsePercentNum(progress, 0);

            this.btnSetShow.visible = this._isSelf;

            //荣誉点数
            this.txtPointCount.text = this._honorpoint + "";
            let upgradeCfg = cfg.ShapeHonorUpgradeCfgData.getInfoByExp(this._honorpoint);
            this.txtName.text = upgradeCfg.name;
            this.btnLevelIcon.skin = `res/Unpack/Icon/Honor/${ upgradeCfg.iconName }.png`;

            let count = this._honorTypeNames.length;
            this.listView.onRefresh(count, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.PlayerInfo.ItemView.HonorItemUI, index: number): void
        {
            tempUI.txtTitle.text = this._honorTypeNames[index];
            let type: Pb_God._emBadgeType = index + 1;
            let cfgList = cfg.ShapeBadgeCfgData.getListByType(type);
            tempUI.listBadge.onRefresh(4, this, (box: Laya.Box, badgeIndex: number) =>
            {
                let txtName = box.getChildByName("txtName") as Laya.Label;
                let btn = box.getChildByName("btn") as component.UIButton;
                let lock = box.getChildByName("imgLock") as Laya.Image;
                //
                let cfgInfo = cfgList[badgeIndex];
                let isShow = false;
                let isGet = false;
                if (cfgInfo)
                {
                    isGet = !!this._idMapBadge.get(cfgInfo.iD);
                    isShow = this._isSelf || isGet;
                }
                txtName.visible = isShow;
                btn.visible = isShow;
                btn.gray = !isGet;
                lock.visible = isShow && !isGet;
                if (isShow)
                {
                    txtName.text = cfgInfo.name;
                    btn.skin = `res/Unpack/Icon/Honor/${ cfgInfo.iconName }.png`;
                    btn.onClick(this, () =>
                    {
                        //点击单个徽章
                        PlayerBadgeTips.show(cfgInfo.iD, this._owenNickname, isGet ? this._idMapBadge.get(cfgInfo.iD).addtime : 0);
                    })
                }

            })
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

    }
}