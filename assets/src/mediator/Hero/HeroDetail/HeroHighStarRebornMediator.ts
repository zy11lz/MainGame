module Pro
{
    /** 重生类型 */
    export enum emRebornType
    {
        /** 等级重生 */
        Level_Reborn = 0,
        /** 高星重生 */
        High_Star_Reborn = 1,
    }
    /**
     * 界面说明： 高星重生
     *
    */
    export class HeroHighStarRebornMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroDetail.Rebirth.HeroHighStarRebornUI;

        /**当前重生类型 */
        private _curType: number = emRebornType.Level_Reborn;

        private _hero: Net.hero;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('treasure')];
        }


        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroDetail.Rebirth.HeroHighStarRebornUI, 0, BaseAddLayer.TopUI, true);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnConfirm.onClick(this, this.onClickConfirm);
            this.UIPanel.closeBtn.onClick(this, this.closeUI);
            //高星重生返回关闭页面
            this.addEventMgr(Cmd.S2C_Pet_HighStarReborn.cmdName, this, this.Pet_HighStarReborn);
            //重生返回(次数，SN)		PBU32U64
            this.addEventMgr(Cmd.S2C_Pet_Reborn.cmdName, this, this.closeUI)
            //购买重生次数返回		PBU32
            this.addEventMgr(Cmd.S2C_Pet_BuyRebornCount.cmdName, this, this.onBuyRebornCount)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //纵向滚动
            this.UIPanel.listView.vScrollBarSkin = null;
            this.UIPanel.listView.elasticEnabled = true;
            this.UIPanel.tabGrp.onClick(this, this.onItemTabOnClick,
                [new component.UITabData("heroHighStar_tab1"), new component.UITabData("heroHighStar_tab2")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
            this.UIPanel.tabGrp.onRenderRefresh(this, this.onItemTabRender);
        }

        private onItemTabRender(itemUI: component.UIButton, index: number)
        {
            let bgImg = itemUI.getChildByName("bg") as component.UIFrameImage;

            let isSel = index == this.UIPanel.tabGrp.tabIndex;
            bgImg.frame = isSel ? 2 : 1;
            bgImg.scaleX = index == 0 ? 1 : -1;
            if (index == emRebornType.High_Star_Reborn) { itemUI.gray = !this.checkOpenHighStar() }
        }

        private onItemTabOnClick(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            if ((tabIndex) == emRebornType.High_Star_Reborn && !this.checkOpenHighStar())
            {
                if (this._hero.star >= 6)
                {
                    TipsUtils.showTipsByLanId("heroRebirth_tips3");
                }
                else
                {
                    TipsUtils.showTipsByLanId("heroRebirth_tips2");
                }

                this.UIPanel.tabGrp.setSelectTab(oldTabIndex);
                return;
            }

            if (tabIndex == oldTabIndex) { return; }
            this._curType = tabIndex;
            this.refreshView();
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._hero = this.UIOpenData.customObject;
            this.UIPanel.tabGrp.setSelectTab(emRebornType.Level_Reborn);
            this.refreshView()
        }


        /** 英雄升星所消耗的材料 */
        private getReturnUpStarItemList(hero: Net.hero): cfg.AddItemInfo[]
        {
            let ret = [];
            let info: cfg.PetHighstarRebornCfgInfo = cfg.PetHighstarRebornCfgData.getInfoWithFun(hero.id, hero.star)
            if (!info) { return []; }
            let needitem: Array<cfg.ValueTwoInfo> = cfg.ValueTwoInfo.parse(info.needItem);
            if (needitem.length > 0)
            {
                let item = new cfg.AddItemInfo();
                item.itemcount = needitem[0].value2;
                item.itemid = needitem[0].value1;
                ret.push(item);
            }
            return ret;
        }

        /** 重生校验 */
        private checkRebirth()
        {
            if (this._hero.islock)
            {
                TipsUtils.showTipsByLanId("heroRebirth_msg14"); // 已上锁 无法重生
                return false;
            }
            if (this._hero.onStore)
            {
                TipsUtils.showTipsByLanId("heroRebirth_msg15"); // 已上阵 无法重生
                return false;
            }
            return true;
        }

        /** 确定 */
        private onClickConfirm(): void
        {
            if (!this.checkRebirth()) { return; }
            if (this._curType == emRebornType.Level_Reborn)
            {
                if (this._hero.getState(Pb_God._emPetStateType.PetStateType_ResonanceLevel))
                {
                    TipsUtils.showTipsByLanId("resonance_msg20");
                    return
                }
                this.rebirthConfirm();
            }
            else
            {
                AlertShow.showConfirmAlert(Global.getLangStr("heroRebirth_tips1", this._hero.star, cfg.PetSkinCfgData.getFileNameById(this._hero.useskinid), this._hero.star >= 9 ? 9 : 5, cfg.PetSkinCfgData.getFileNameById(this._hero.useskinid)), this, () =>
                {
                    if (Global.isFullAllRes(cfg.PetHighstarRebornCfgData.getRebornItem(this._hero.id, this._hero.star)))
                    {
                        this.highStarRebirthConfirm();
                    }
                });
            }
        }

        /** 等级重生请求 */
        private rebirthConfirm(): void
        {
            if (this._hero.level <= 1)
            {
                TipsUtils.showTipsByLanId("heroRebirth_msg16"); // 当前精灵等级已最低
                return;
            }

            //判断次数
            if (PetDataMgr.rebirthCount < cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_RebornCount))
            {
                this.requestRebirth();
                return;
            }

            //需要购买次数时
            let buyCount = PetDataMgr.buyRebirthCount;
            let needItem = cfg.PetRebornCostCfgData.getNeedItemInfo(buyCount + 1);
            if (!needItem)
            {
                TipsUtils.showTipsByLanId("heroRebirth_msg07"); //次数已用完
                return;
            }
            //二级提示
            let des = Global.getLangStr("heroRebirth_msg06", cfg.ItemCfgData.getNameById(needItem.itemid), needItem.itemcount);
            AlertShow.showConfirmAlert(des, this, () =>
            {
                //向服务器发请求
                PetSend.buyRebornCount();
            });
        }

        /** 发起星级重生请求 */
        private highStarRebirthConfirm(): void
        {
            ;
            PetSend.highStarReborn(this._hero.sn);
        }

        /** 发起重生请求 */
        private requestRebirth(): void
        {
            PetSend.reborn(this._hero.sn);
        }

        /*****
         *购买重生次数返回		PBU32
         * @param PBU32
         */
        protected onBuyRebornCount(value: Pb_God.PBU32): void
        {
            this.requestRebirth();
        }

        /** 高星重生返回 */
        private Pet_HighStarReborn(): void
        {
            UIManager.Inst.closeCurrentList()
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroBag));
        }

        public refreshView()
        {
            this.UIPanel.rebirthCount.visible = this._curType == emRebornType.Level_Reborn;
            this.UIPanel.highStarCount.visible = this._curType != emRebornType.Level_Reborn;
            this.UIPanel.hboxFee.visible = this._curType == emRebornType.Level_Reborn;
            this.UIPanel.heroIcon.visible = this._curType == emRebornType.Level_Reborn;
            this.UIPanel.HighStarHeroInfo.visible = this._curType == emRebornType.High_Star_Reborn;

            if (this._curType == emRebornType.Level_Reborn)
            {
                this.refreshRebirth();
            }
            else
            {
                this.refreshHighStarRebirth();
            }

            this.refreshItemListView();
        }

        private refreshItemListView(): void
        {
            let tmpRewardDic = new Laya.Dictionary();
            // 升阶消耗
            for (let i = 1; i <= this._hero.advance; i++)
            {
                let tmpNeedItemAry = cfg.PetAdvanceCfgData.getNeedItemAryById(i);
                tmpNeedItemAry.forEach(tmpItem =>
                {
                    this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
                });
            }
            // 升级消耗
            let tmpUpLvItemList = cfg.PetUpgradeCfgData.getNeedItemAryByLv(this._hero.level);
            tmpUpLvItemList.forEach(tmpItem =>
            {
                this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
            });
            /** 装备 */
            let tmpSuitMgr = SuitEquipDataMgr.getSuitMgr(this._hero.sn);
            tmpSuitMgr.getEquipList().forEach(tmpItem =>
            {
                this.__addItemToDict(tmpRewardDic, tmpItem.itemid, 1);
            });
            // 符文
            tmpSuitMgr.getRuneList().forEach(tmpItem =>
            {
                let tmpvalue = ItemDataMgr.getUsesPBItem(tmpItem.itemsn as Long);
                tmpRewardDic.set(tmpvalue.itemid, tmpvalue);
            });
            // 神装
            tmpSuitMgr.getGodList().forEach(tmpItem =>
            {
                let tmpvalue = ItemDataMgr.getUsesPBItem(tmpItem.itemsn as Long);
                tmpRewardDic.set(tmpvalue.itemid, tmpvalue);
            });


            /** 高星显示材料*/
            if (this._curType == emRebornType.High_Star_Reborn)
            {
                // 进化石
                for (var index = 1; index <= this._hero.evolve; index++)
                {
                    let neddEvolution: cfg.PetEvolveCfgInfo = cfg.PetEvolveCfgData.getInfoWithIdEvolve(this._hero.id, index);
                    let evolutionItems = cfg.AddItemInfo.parse(neddEvolution.needItem);
                    evolutionItems.forEach(tmpItem =>
                    {
                        this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
                    });
                }

                // 宝石精华
                let talent: Pb_God.PBPlayerPetTalent[] = SuitEquipDataMgr.getSuitMgr(this._hero.sn).getTalentList();
                talent.forEach(tmpItem =>
                {
                    let tempInfo = cfg.SkillNewTalentUpgradeCfgData.getInfo(tmpItem.skillindex);
                    let arrItemArr: Array<cfg.AddItemInfo> = cfg.SkillNewTalentUpgradeCfgData.getDelAddItemAryById(tempInfo.skillIndex);
                    this.__addItemToDict(tmpRewardDic, arrItemArr[0].itemid, arrItemArr[0].itemcount);
                });
                // 糖果
                this.getReturnUpStarItemList(this._hero).forEach(tmpItem =>
                {
                    this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
                });
                // 魂器 材料
                for (var lv = 1; lv <= this._hero.horcrux.level; lv++)
                {
                    let horcruxProp: cfg.HorcruxPropCfgInfo = cfg.HorcruxPropCfgData.getHorcruxInfoByIdAndLv(this._hero.horcrux.id, lv);
                    if (!horcruxProp) continue;
                    let needItems = cfg.AddItemInfo.parse(horcruxProp.materials);
                    needItems.forEach(tmpItem =>
                    {
                        this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
                    });
                }
                // 百变怪
                let el: cfg.PetHighstarRebornCfgInfo = cfg.PetHighstarRebornCfgData.getInfoWithFun(this._hero.id, this._hero.star);
                if (el && el.rebornReturnItem2)
                {
                    let heroPets: Array<cfg.ValueTwoInfo> = cfg.ValueTwoInfo.parse(el.rebornReturnItem2);
                    heroPets.forEach(tmpItem =>
                    {
                        this.__addItemToDict(tmpRewardDic, tmpItem.value1, tmpItem.value2);
                    });
                }
                let heroNorItemUIList = new Array<cfg.AddItemInfo>();
                // 本体
                if (el && el.rebornReturnItem1)
                {
                    let heroPets: Array<cfg.ValueTwoInfo> = cfg.ValueTwoInfo.parse(el.rebornReturnItem1);

                    // 魂器 本体数量
                    let horcruxPetCounts: number = 0;
                    for (var lv = 30; lv <= this._hero.horcrux.level; lv++)
                    {
                        let horcruxProp: cfg.HorcruxPropCfgInfo = cfg.HorcruxPropCfgData.getHorcruxInfoByIdAndLv(this._hero.horcrux.id, lv);
                        if (!horcruxProp) continue;
                        let horcruxPets: Array<cfg.ValueTwoInfo> = cfg.ValueTwoInfo.parse(horcruxProp.getItem);
                        horcruxPets.forEach(element =>
                        {
                            horcruxPetCounts += element.value2;
                        });
                    }

                    heroPets.forEach(tmpItem =>
                    {
                        let itemInfo = new cfg.AddItemInfo();
                        itemInfo.itemid = tmpItem.value1;
                        itemInfo.itemcount = tmpItem.value2 + horcruxPetCounts;
                        heroNorItemUIList.push(itemInfo)
                    });
                }


                // 返还道具列表
                this.UIPanel.heroListView.onRefresh(heroNorItemUIList.length, this, (itemRewardUI: NorItemUI, index: number) =>
                {
                    itemRewardUI.setItemInfo(heroNorItemUIList[index], true);
                });
            } else
            {

                // 返还道具列表
                this.UIPanel.heroListView.onRefresh(1, this, (itemRewardUI: NorItemUI, index: number) =>
                {
                    // 重生显示为自己
                    let skinId = this._hero.useskinid;
                    itemRewardUI.setPetUI(skinId, this._hero.star, undefined, this._hero.evolve);
                });
            }

            // 返还道具显示
            let dicKeys = tmpRewardDic.keys;
            this.UIPanel.itemListView.onRefresh(dicKeys.length, this, (itemUI: NorItemUI, index: number) =>
            {
                let tmpItemID = dicKeys[index];
                let tmpItemInfo = tmpRewardDic.get(tmpItemID);
                itemUI.setItemInfo(tmpItemInfo, true);
            });
            this.UIPanel.itemListView.height = Math.ceil(dicKeys.length / 5) * (130 + this.UIPanel.itemListView.valignSpaceY)
        }

        /** 等级重生刷新 */
        private refreshRebirth()
        {
            this.UIPanel.heroIcon.setPetInfo(this._hero);
            this.UIPanel.htmlDes1.innerHTML = Global.getLangStr("heroRebirth_msg09", cfg.PetSkinCfgData.getFileNameById(this._hero.useskinid));
            this.UIPanel.htmlDes2.innerHTML = Global.getLangStr("heroRebirth_msg10");
            // 剩余次数
            let leftCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_RebornCount) -
                PetDataMgr.rebirthCount;
            this.UIPanel.hboxFee.visible = leftCount <= 0;
            if (leftCount <= 0)
            {
                leftCount = 0;
                //需要购买次数时
                let buyCount = PetDataMgr.buyRebirthCount;
                let needItem = cfg.PetRebornCostCfgData.getNeedItemInfo(buyCount + 1);
                if (!needItem)
                {
                    this.UIPanel.hboxFee.visible = false;
                } else
                {
                    this.UIPanel.txtNeedDiamon.text = needItem.itemcount + "";
                }
            }
            this.UIPanel.rebirthCount.text = Global.getLangStr("hook_msg5", leftCount);
        }

        /**高星重生刷新 */
        private refreshHighStarRebirth()
        {
            this.UIPanel.heroIcon1.setPetInfo(this._hero);
            this.UIPanel.heroIcon2.setPetUI(this._hero.useskinid, this._hero.star >= 9 ? 9 : 5);

            /**
             * 6~8星：重生为5星1级     9星以上：重生为9星1级
             */
            this.UIPanel.htmlDes1.innerHTML = Global.getLangStr("heroRebirth_msg11", cfg.PetSkinCfgData.getFileNameById(this._hero.useskinid), this._hero.star >= 9 ? 9 : 5, this._hero.star >= 9 ? Global.getLangStr("heroRebirth_msg18") : Global.getLangStr("heroRebirth_msg17"));
            this.UIPanel.htmlDes2.innerHTML = Global.getLangStr("heroRebirth_msg12");
            let showNeedItem = cfg.PetHighstarRebornCfgData.getInfoWithFun(this._hero.id, this._hero.star);
            if (showNeedItem)
            {
                let heroPets: Array<cfg.ValueTwoInfo> = cfg.ValueTwoInfo.parse(showNeedItem.rebornItem);
                // 时空种子数量
                if (heroPets.length > 0)
                {
                    Global.setResSmallIconWithItemID(this.UIPanel.itemIcon, heroPets[0].value1);
                    this.UIPanel.itemCount.text = `${ Global.getItemNum(heroPets[0].value1) }/${ heroPets[0].value2 }`;
                    this.UIPanel.highStarCount.refresh();
                }
            }
        }

        /**验证高星重生 */
        private checkOpenHighStar(): boolean
        {
            let showNeedItem = cfg.PetHighstarRebornCfgData.getInfoWithFun(this._hero.id, this._hero.star);
            if (!showNeedItem) { return false; } // 该精灵不能重生

            return true;
        }

        private __addItemToDict(dict: Laya.Dictionary, itemId: number, itemcount: number): void
        {
            let tmpvalue = dict.get(itemId);
            if (tmpvalue == null)
            {
                tmpvalue = new Pb_God.PBItem();
                tmpvalue.itemid = itemId;
                dict.set(itemId, tmpvalue);
            }
            tmpvalue.itemcount += itemcount;
        }
    }
}