module Pro
{
    /**
     * 界面说明： 胡帕兑换选择材料
    */
    export class HuPaSelectMaterialMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroBag.HeroMaterialSelectUI;

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

        /** 需要选择的最大数量 */
        private _maxNum = 0;


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
            this.UIPanel.title.text = Global.getLangStr("hero_hupa_ex1");
            this.UIPanel.descLbl.text = Global.getLangStr("hero_hupa_ex2");
            this.UIPanel.desc2Lbl.text = Global.getLangStr("hero_hupa_ex9");
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let params = this.UIOpenData.customObject;
            this._allHeros = params[0];
            this._selectHeros = params[1];
            this._allItems = params[2];
            this._selectItems = params[3];
            this._maxNum = params[4];

            //是否显示一键选择
            let isShowAutoSel: boolean = params[5];
            this.UIPanel.btnAutoSelect.visible = isShowAutoSel;
            this.UIPanel.SureBtn.x = isShowAutoSel ? 192 : 335;


            Global.listToStringMap(this._selectHeros, this._selectHeroMap, true);

            this.refreshListView();
            this.refreshNumView();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.ItemAccess_Jump_Change, this, this.closeUI);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.SureBtn.onClick(this, this.onClickSure);
            this.UIPanel.btnAutoSelect.onClick(this, this.onClickAutoSelect);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickSure(): void
        {
            //设置所有英雄的选择状态
            for (let hero of this._allHeros)
            {
                hero.isSelected = this._selectHeroMap.get(hero.sn + "") != null;
            }
            EventMgr.trigger(EventNotify.HuPa_Materia_Selected, this._selectHeros, this._selectItems, this.UIOpenData.customObject2);

            this.closeUI();
        }

        /** 一键自动选择 */
        private onClickAutoSelect(): void
        {
            let needCount = this._maxNum;
            //先看看材料道具
            let selectItems: Long[] = [];
            for (let item of this._allItems)
            {
                selectItems.push(item.itemsn);
            }
            needCount -= selectItems.length;
            //再过一遍英雄列表，顺便重置一下状态
            let selectHeros: Long[] = [];
            for (let hero of this._allHeros)
            {
                if (needCount > 0)
                {
                    needCount--;
                    selectHeros.push(hero.sn);
                    hero.isSelected = true;
                } else
                {
                    hero.isSelected = false;
                }
            }
            EventMgr.trigger(EventNotify.HuPa_Materia_Selected, selectHeros, selectItems, this.UIOpenData.customObject2);
            this.closeUI();
        }

        private checkIsGray(hero: Net.hero)
        {
            return hero.level > 1 || hero.star > 5 || hero.evolve > 0 || hero.advance > 0;
        }

        private checkIsOnEquip(hero: Net.hero)
        {
            return SuitEquipDataMgr.getSuitMgr(hero.sn).getEquipList().length > 0 || SuitEquipDataMgr.getSuitMgr(hero.sn).getEquipList().length > 0;
        }

        /**
         * 检测是否是问题胡帕 问题胡帕无法选中
         * @param hero 
         */
        private checkIsQuestion(hero: Net.hero)
        {
            return this.checkIsGray(hero) || this.checkIsOnEquip(hero);
        }

        private sortHeros()
        {
            this._allHeros.sort((a, b) =>
            {
                let isGrayA = this.checkIsGray(a);
                let isGrayB = this.checkIsGray(b);
                if (isGrayA != isGrayB)
                    return isGrayA ? 1 : -1;
            })
        }

        /** 刷新列表显示 */
        private refreshListView(): void
        {
            let heroCount = this._allHeros.length;
            let itemCount = this._allItems.length;
            this.sortHeros();
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
                            if (this._selectHeros.length + this._selectItems.length >= this._maxNum)
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
                        //TipsUtils.showTipsByLanId("common_system_noOpen"); //temp
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemAccess, [CfgID.ItemID.PetSpitStar4, false]));
                    });
                    itemUI.SelectStatueImg.visible = false;
                    itemUI.PlusStatueImg.visible = true;
                }
                else
                {  //英雄列表

                    let tmpInfo = this._allHeros[index - itemCount];
                    itemUI.setPetInfo(tmpInfo, false);
                    PetDataMgr.refreshPetOnStore(tmpInfo)
                    let lockBol:boolean= tmpInfo.onStore || tmpInfo.islock||tmpInfo.isDefend;
                    itemUI.setLockImgVisible(lockBol,tmpInfo);
                    itemUI.IconImg.gray = lockBol || this.checkIsGray(tmpInfo);

                    itemUI.PlusStatueImg.visible = false;
                    let snKey = tmpInfo.sn + "";
                    itemUI.SelectStatueImg.visible = this._selectHeroMap.get(snKey) != null;
                    itemUI.onHold(this, (item: NorItemUI, statue: boolean) =>
                    {
                        //开始长按
                        if (statue == true)
                        {
                            CommonSend.queryPetView(PlayerDataMgr.uid, PlayerDataMgr.worldid, tmpInfo.sn, 0, 0);
                        }
                        else if (statue == false)
                        {
                            // logI("------------------------");
                        }
                        else
                        {
                            //援军时，需要先解除才能分解
                            if(tmpInfo.isDefend){
                                AlertShow.showConfirmAlert(Global.getLangStr("HeroDefendMsg8"), this, () =>
                                    {
                                        Pro.DefendSend.removePet(tmpInfo.sn);
                                    })
                                return;
                            }

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
                                    if (this._selectHeros.length + this._selectItems.length >= this._maxNum)
                                    {
                                        return;
                                    }

                                    if (tmpInfo.level > 1)
                                    {
                                        TipsUtils.showTipsByLanId("hero_hupa_ex3");
                                        return
                                    }
                                    if (tmpInfo.star > 5)
                                    {
                                        TipsUtils.showTipsByLanId("hero_hupa_ex4");
                                        return;
                                    }
                                    if (tmpInfo.evolve > 0)
                                    {
                                        TipsUtils.showTipsByLanId("hero_hupa_ex5");
                                        return;
                                    }
                                    if (tmpInfo.advance > 0)
                                    {
                                        TipsUtils.showTipsByLanId("hero_hupa_ex6");
                                        return;
                                    }
                                    if (SuitEquipDataMgr.getSuitMgr(tmpInfo.sn).getEquipList().length > 0)
                                    {
                                        TipsUtils.showTipsByLanId("hero_hupa_ex7");
                                        return;
                                    }
                                    if (SuitEquipDataMgr.getSuitMgr(tmpInfo.sn).getGodList().length > 0)
                                    {
                                        TipsUtils.showTipsByLanId("hero_hupa_ex8");
                                        return
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
                                return
                            };
                        }
                    });
                }
            });
        }

        /** 刷新已选择的数量显示 */
        private refreshNumView(): void
        {
            this.UIPanel.SelectProLb.text = Global.getLangStr("hero_msg8", this._selectHeros.length + this._selectItems.length, this._maxNum);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}