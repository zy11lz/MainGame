module Pro
{
    /**
     * 界面说明： 英雄升星吞噬英雄选择界面
    * @author jason.xu
    */
    export class HeroUpStarDevourMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroBag.HeroMaterialSelectUI;

        /** 待升星的英雄 */
        private _hero: Net.hero;

        /** 待选定的英雄列表 */
        private _allHeros: Net.hero[] = [];
        /** 已选定的英雄列表 */
        private _selectHeros: Long[] = [];
        /** 已选定的英雄映射（简化查询） */
        private _selectHeroMap = new ds.StringMap<Long>();
        /** 待选定的材料道具列表 */
        private _allItems: Pb_God.PBItem[] = [];
        /** 已选定的材料道具列表 */
        private _selectItems: Long[] = [];

        /** 需要从英雄吞噬的最大极化值 */
        private _maxExpNum = 0;
        /** 当前选的英雄获得的极化值 */
        private _curExpNum = 0;


        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;// [UrlMgr.getAtlas('')]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroBag.HeroMaterialSelectUI, 1, BaseAddLayer.TopUI, true);
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
            this._hero = this.UIOpenData.customObject;
            this._selectHeros = [];
            this._selectItems = [];
            this._selectHeroMap.clear();
            this.initWaitList();

            this.refreshListView();
            this.refreshNumView();
        }

        /** 刷新当前能选定的英雄列表与替代道具 */
        private initWaitList(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.ItemAccess_Jump_Change, this, this.closeUI);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.SureBtn.onClick(this, this.onClickSure);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickSure(): void
        {
            //...
            this.closeUI();
        }

        /** 刷新列表显示 */
        private refreshListView(): void
        {
            let heroCount = this._allHeros.length;
            let itemCount = this._allItems.length;
            //选择英雄
            this.UIPanel.HeroList.onRefresh(heroCount + itemCount + 1, this, (itemUI: NorItemUI, index: number) =>
            {
                if (index < itemCount)
                { //升星材料道具
                    let itemInfo = this._allItems[index];
                    itemUI.setItemInfo(itemInfo, false, false, false, false, false);
                    itemUI.PlusStatueImg.visible = false;

                    itemUI.SelectStatueImg.visible = this._selectItems.indexOf(itemInfo.itemsn) >= 0;
                    itemUI.onClick(this, () =>
                    {
                        let tempSelectIndex = this._selectItems.indexOf(itemInfo.itemsn);
                        if (tempSelectIndex >= 0)
                        {
                            this._selectItems.splice(tempSelectIndex, 1);
                            itemUI.SelectStatueImg.visible = false;
                        }
                        else
                        {
                            if (this._curExpNum >= this._maxExpNum)
                            {
                                return;
                            }
                            this._selectItems.push(itemInfo.itemsn);
                            itemUI.SelectStatueImg.visible = true;
                        }
                        this.refreshNumView();
                    });
                } else if (index == heroCount + itemCount)
                { //最后一个加号
                    itemUI.onClick(this, () =>
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemAccess, [CfgID.ItemID.PetSpitStar4, false]));
                    });
                    itemUI.SelectStatueImg.visible = false;
                    itemUI.PlusStatueImg.visible = true;
                }
                else
                {  //英雄列表

                    let tmpInfo = this._allHeros[index - itemCount];
                    itemUI.setPetInfo(tmpInfo, false);

                    let lock=tmpInfo.onStore || tmpInfo.islock;
                    itemUI.setLockImgVisible(lock,tmpInfo);
                    itemUI.IconImg.gray = lock;

                    itemUI.PlusStatueImg.visible = false;
                    let snKey = tmpInfo.sn + "";
                    itemUI.SelectStatueImg.visible = this._selectHeroMap.get(snKey) != null;
                    itemUI.onClick(this, () =>
                    {

                        let func = () =>
                        {
                            if (tmpInfo.islock)
                            {
                                TipsUtils.showTipsByLanId("heroSplit_msg2");
                                return;
                            }

                            let tempSelectIndex = this._selectHeros.indexOf(tmpInfo.sn);
                            if (tempSelectIndex >= 0)
                            {
                                this._selectHeros.splice(tempSelectIndex, 1);
                                this._selectHeroMap.remove(snKey);
                                itemUI.SelectStatueImg.visible = false;
                            }
                            else
                            {
                                if (this._curExpNum >= this._maxExpNum)
                                {
                                    return;
                                }
                                this._selectHeros.push(tmpInfo.sn);
                                this._selectHeroMap.put(snKey, tmpInfo.sn);
                                itemUI.SelectStatueImg.visible = true;
                            }
                            itemUI.IconImg.gray  = false;
                            itemUI.setLockImgVisible(false);
                            this.refreshNumView();
                        }

                        if (PetDataMgr.checkPetOnStore(tmpInfo, true, func))
                        {
                            return;
                        }

                    });
                }
            });
        }

        /** 刷新已选择的数量显示 */
        private refreshNumView(): void
        {
            this._curExpNum = 100;
            this.UIPanel.SelectProLb.text = Global.getLangStr("hero_upstar_msg3", this._curExpNum, this._maxExpNum);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}