module Pro
{
    export class HeroBagMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroBag.MainUI;
        /** 当前选择的英雄类型索引 */
        private TmpSelectHeroTypeIndex = -1;

        /** 背包的英雄列表 */
        private TmpMyHeroList: Array<Net.hero>;

        /** 图鉴的英雄列表 */
        private TmpSystemHeroList: Array<cfg.PetBookCfgInfo>;

        /** 圣物操作界面 */
        private HolyPanel: HeroHolyPanel;

        /** 圣物是否锁住 */
        private isLockHoly: boolean = false;

        /** 守护界面*/
        private _heroDefendPanel: HeroDefendPanel;
        /** 守护是否锁住 */
        private isLockDefend: boolean = false;

        /** 上次选中的按钮 */
        private SelectBtn: component.UIButton;


        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("herobag"), UrlMgr.getAtlas("heroHoly"), UrlMgr.getAtlas("heroDefend")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroBag.MainUI, 0);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            if (this.HolyPanel)
            {
                Laya.Tween.clearAll(this.HolyPanel.IconImg);
                this.HolyPanel.destroy(true);
            }

            this.HolyPanel = null;
            this.closePanel();

        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._isAutoReleaseRes = false;
            this.UIPanel.ItemTab.onClick(this, this.itemTabOnClick,
                [new component.UITabData("hero_tab1"),
                new component.UITabData("hero_tab2"),
                new component.UITabData("hero_tab3"),
                new component.UITabData("hero_tab5")
                ],
                [new component.UITabStyle("#f13b54", 1, "#f13b54"), new component.UITabStyle("#fffced", 1, "#fffced")]);

            this.UIPanel.ItemTab.onRenderRefresh(this, this.onTabItemRender);
            //单独的布阵按钮加入了ItemTab里面
            this.UIPanel.EmHeroBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new EmbattleOpenUIData());
            });

            this.initAni();

            this.adjustScreenPos();
        }

        private adjustScreenPos()
        {
            this.UIPanel.height = GameConfig.curHeight();
            this.UIPanel.y = 0;

            let maxScale = Math.max(GameConfig.curHeight() / GameConfig.WinHeight, GameConfig.curWidth() / GameConfig.WinWidth);
            this.UIPanel.scaleBg.scale(maxScale, maxScale);
        }

        private initAni()
        {
            let sk = new Pro.SkeletonPlayer();
            sk.load(UrlMgr.getSpineSceneUrl("npc/xiaozhi/xiaozhi"));
            this.UIPanel.aniPos.addChild(sk);
            sk.scale(0.8, 0.8);
            sk.playByIndex(0, true);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Pet_BuyBag_Ack, this, this.refreshBagSpace);
            //主线布阵有变化时需要刷新一下英雄列表
            this.addEventMgr(EventNotify.Embattle_Save, this, this.onEmbattleSave)

            this.UIPanel.btnIllustration.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroIllustration));
            })
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //关联红点数据
            let redDotModes = [PetDataMgr.actionRedDotModel, PetDataMgr.bookArchivesRedDotModel, HolyDataMgr.reddotModel ,DefendDataMgr.reddotModel/*, ArtifactDataMgr.reddotModelEmbattle*/];
            this.UIPanel.ItemTab.setRedDotModelList(redDotModes);

            this.TmpSelectHeroTypeIndex = -1;

            let defaultIndex = this.UIOpenData.customObject || 0;
            if (defaultIndex == 2 && !PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Element)) { defaultIndex = 0; }
            if (defaultIndex == 3 && !PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.HeroDefend)) { defaultIndex = 0; }
            this.UIPanel.ItemTab.tabIndex = defaultIndex;

            //策划需求： 界面回来时，都要把滚动条回到第一位
            this.UIPanel.HeroItemList.scrollTo(0);

            this.refreshUI();
        }

        public refreshUI()
        {

            //公用元素的解锁，都是90级
            this.isLockHoly = !PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Element);

            this.isLockDefend = !PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.HeroDefend);

            this.UIPanel.ItemTab.activeCurrentTab();
            this.refreshBagSpace();

            //布阵红点
            this.UIPanel.imgReddotEmbattle.visible = ArtifactDataMgr.reddotModelEmbattle.isRedDot;
        }

        /** 阵法发生变更 */
        private onEmbattleSave(zhenfaType: Pb_God._emZhenfaType)
        {
            if (zhenfaType != Pb_God._emZhenfaType.ZhenfaType_Zhuxian)
            { return; }
            if (this.UIPanel.ItemTab.tabIndex == 0)
            {
                this.refreshHeroList();
            }

        }

        //---------------------------------英雄Icon刷新----------------------------------------
        /** 刷新英雄列表 */
        private refreshHeroList()
        {
            let tmpIsMy = this.UIPanel.ItemTab.tabIndex == 0;
            if (tmpIsMy)
            {
                this.TmpMyHeroList = PetDataMgr.getPetList(this.TmpSelectHeroTypeIndex);
                this.sortMyHeroList();
                this.UIPanel.HeroItemList.onRefresh(this.TmpMyHeroList.length, this, this.onMyHeroItemRender);
            }
            else
            {
                this.TmpSystemHeroList = cfg.PetBookCfgData.getBookMarkListByType(this.TmpSelectHeroTypeIndex + 1);
                this.sortSystemHeroList();
                this.UIPanel.HeroItemList.onRefresh(this.TmpSystemHeroList.length, this, this.onSysHeroItemRender);
            }
        }

        private sortSystemHeroList(): void
        {
            this.TmpSystemHeroList.sort((a, b) =>
            {
                if (a.star == b.star)
                { return b.petID - a.petID; }
                return b.star - a.star;
            })
        }

        /** 将自己的英雄列表重新排序，因为数据层排过序的是以战斗力为第一排序规则，其它界面需要用到的也都是战斗优先，但是唯独英雄背包的列表要以上线上阵为主 */
        private sortMyHeroList(): void
        {
            //只需要处理上阵的，为简化运算且不要影响到原数组的情况下，不重新走排序算法。
            let ret: Net.hero[] = [];
            let storeIndex = 0;
            for (let hero of this.TmpMyHeroList)
            {
                hero.onStore = hero.onMainLineStore;
                if (hero.onMainLineStore)
                {
                    ret.splice(storeIndex, 0, hero);
                    storeIndex++;
                } else
                {
                    ret.push(hero);
                }

            }
            this.TmpMyHeroList = ret;
        }

        /** 玩家英雄刷新 */
        private onMyHeroItemRender(item: NorItemUI, index: number)
        {
            let tmpHeroInfo = this.TmpMyHeroList[index];
            if (tmpHeroInfo == null)
            {
                return;
            }
            item.setPetInfo(tmpHeroInfo, true, true);
            item.IconImg.gray = false;
            item.onClick(this, () =>
            {
                let openUIData = new HeroDetailOpenUIData();
                openUIData.isTujian = false;
                openUIData.heroIndex = index;
                openUIData.heroType = this.TmpSelectHeroTypeIndex;
                openUIData.heroDataList = this.TmpMyHeroList;
                UIManager.Inst.forceOpen(openUIData, BaseBackUIType.HideBackUI);
            });
        }

        /** 系统英雄刷新 */
        private onSysHeroItemRender(item: NorItemUI, index: number)
        {
            let tmpHeroInfo = this.TmpSystemHeroList[index];
            item.setPetBookCfgInfo(tmpHeroInfo);
            item.IconImg.gray =  !(PetDataMgr.seenpets.indexOf(tmpHeroInfo.petID) != -1);
            let tmpIsBook = this.UIPanel.ItemTab.tabIndex == 1;
            item.RedDotImg.visible = tmpIsBook && PetDataMgr.rewardpets.indexOf(tmpHeroInfo.petID) == -1 && PetDataMgr.seenpets.indexOf(tmpHeroInfo.petID) > -1;
            item.onClick(this, () =>
            {
                let openUIData = new HeroDetailOpenUIData();
                openUIData.isTujian = true;
                openUIData.heroIndex = index;
                openUIData.heroBookCfgInfo = tmpHeroInfo;
                openUIData.tuJianList = this.TmpSystemHeroList;
                openUIData.heroType = this.TmpSelectHeroTypeIndex + 1;

                UIManager.Inst.forceOpen(openUIData, BaseBackUIType.HideBackUI);
            });
        }

        //---------------------------------英雄背包扩建----------------------------------------
        /** 刷新背包扩建状态 */
        private refreshBagSpace()
        {

            this.UIPanel.BagSpaceLb.text = PetDataMgr.getPetList().length + "/" + PetDataMgr.getSpaceNum();
            this.UIPanel.AddSpaceBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(1));
            });

            let tempBuySpace = PetDataMgr.getBuySpaceNum();
            this.UIPanel.AddSpaceBtn.disabled = cfg.PetBuyBagCfgData.getInfoWithFun(tempBuySpace) == null;
        }

        //---------------------------------英雄bag页签------------------------------------------
        /** 选择页签 */
        private itemTabOnClick(tab: component.UITab, tabIndex: number, oldTabIndex: number)
        {
            if (tabIndex == 2)
            {
                if (this.isLockHoly)
                {
                    TipsUtils.showTipsByLanId("item_review_msg20", cfg.SystemSwitchSystemSwitchCfgData.getLevelByID(emSystemSwitchType.Element));
                    this.UIPanel.ItemTab.setSelectTab(oldTabIndex);
                    return;
                }

                if (this.HolyPanel == null)
                {
                    this.HolyPanel = new HeroHolyPanel();
                    this.HolyPanel.pos(0, 352);
                    this.HolyPanel.visible = false;
                    this.UIPanel.addChild(this.HolyPanel);
                }
                this.HolyPanel.refreshUI();
            } else if (tabIndex == 3)
            {
                //UIManager.Inst.forceOpen(new EmbattleOpenUIData());
                if (this.isLockDefend)
                {
                    let cfgInfo = cfg.SystemSwitchSystemSwitchCfgData.getInfo(emSystemSwitchType.HeroDefend);
                    TipsUtils.showTipsByLanId("item_review_msg20", cfgInfo.level);
                    this.UIPanel.ItemTab.setSelectTab(oldTabIndex);
                    return;
                }
                if (!this._heroDefendPanel)
                {
                    this._heroDefendPanel = new HeroDefendPanel();
                    this._heroDefendPanel.pos(0, 352);
                    this._heroDefendPanel.visible = false;
                    this.UIPanel.addChild(this._heroDefendPanel);
                }

            }
            else
            {
                this.UIPanel.ItemTab.refresh();
                if (tabIndex != oldTabIndex)
                {
                    this.TmpSelectHeroTypeIndex = -1;
                }
                this.refreshHeroType(tabIndex);
                this.refreshHeroList();
            }

            //英雄背包灰色背景隐藏
            // this.UIPanel.BGImg.visible = tabIndex != 2;
            this.UIPanel.HeroTypeBox.visible = tabIndex != 2 && tabIndex != 3;
            this.UIPanel.HeroItemList.visible = tabIndex != 2 && tabIndex != 3;
            this.UIPanel.BagSpaceBox.visible = tabIndex == 0;
            this.UIPanel.EmHeroBtn.visible = tabIndex == 0;
            this.UIPanel.btnIllustration.visible = tabIndex == 0;
            if (this.HolyPanel != null)
            {
                this.HolyPanel.visible = tabIndex == 2;
                !this.HolyPanel.visible && this.HolyPanel.hideUI();
            }
            if (this._heroDefendPanel)
            {
                this._heroDefendPanel.visible = tabIndex == 3;

            }
        }

        /** 刷新英雄类型 */
        private refreshHeroType(tabIndex: number)
        {
            let startTypeIndex = tabIndex == 0 ? 0 : 1;
            let heroTypeNum = (tabIndex == 0 ? 2 : 0) + Pb_God._emPetType.PetType_Moon;
            this.UIPanel.HeroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
            {

                Global.setResPetType(itemUI, startTypeIndex + index);
                itemUI.onClick(this, this.onHeroTypeClick);
                let reddot = itemUI.getChildAt(0) as Laya.Image ;
                reddot.visible = this.UIPanel.ItemTab.tabIndex == 1 && PetDataMgr.isShowArchives(parseInt(itemUI.name) + 1);
                
                if (this.TmpSelectHeroTypeIndex == -1)
                {
                    this.onHeroTypeClick(itemUI);
                }

            });
        }

        /** 选择一个英雄类型 */
        private onHeroTypeClick(btn: component.UIButton)
        {
            this.UIPanel.HeroTypeSelectImg.x = btn.x;
            this.UIPanel.HeroTypeSelectImg.y = btn.y;
            if(this.UIPanel.ItemTab.tabIndex == 1) // 精灵档案
            {
                if(this.SelectBtn)
                {
                   let reddot = this.SelectBtn.getChildAt(0) as Laya.Image;
                   reddot.visible = PetDataMgr.isShowArchives(parseInt(this.SelectBtn.name) + 1);
                }
                this.SelectBtn = btn;
            }
            let btnReddot = btn.getChildAt(0) as Laya.Image;
            btnReddot.visible = false;
            
            if (btn.name == "6")
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroZhenxing, []));
            } else
            {
                this.TmpSelectHeroTypeIndex = parseInt(btn.name);
                this.refreshHeroList();
            }

        }

        /** 页签刷新 */
        private onTabItemRender(item: ProUI.Hero.HeroBag.TabItemUI, index: number)
        {

            item.IconFrameImg.visible = true;
            (item.getChildByName("Text") as Laya.Label).centerX = 14;
            if (this.UIPanel.ItemTab.tabIndex == index)
            {
                item.BGFrameImg.frame = 2;
                if (index == 3)
                {
                    item.IconFrameImg.frame = 18;
                } else
                    item.IconFrameImg.frame = index * 2 + 2;
            }
            else
            {
                item.BGFrameImg.frame = 1;
                if (index == 3)
                {
                    item.IconFrameImg.frame = 17;
                } else
                    item.IconFrameImg.frame = index * 2 + 1;
            }

            if (index == 2 && this.isLockHoly)
            {
                item.gray = true;
            }
            else if (index == 3 && this.isLockDefend)
            {
                item.gray = true;
            }
            else
            {
                item.gray = false;
            }
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.HeroUpgrade_7_2)
            {
                Laya.timer.once(200, this, () =>
                {
                    let tmpItemUI = this.UIPanel.HeroItemList.getCell(0) as NorItemUI;
                    GuideMgr.Inst.showFinger(tmpItemUI, true, tmpItemUI, 0, 0, 20);
                });
            } else if (step == GuideStep.Func_7DayActUpPet_3)
            {
                Laya.timer.once(200, this, () =>
                {
                    let guidePetId = 21404; //策划说写死这个ID引导，如果找不到，就是配置出问题了。
                    for (let i = 0; i < this.TmpMyHeroList.length; i++)
                    {
                        if (this.TmpMyHeroList[i].id == guidePetId)
                        {
                            let tmpItemUI = this.UIPanel.HeroItemList.getCell(i) as NorItemUI;
                            GuideMgr.Inst.showFinger(tmpItemUI, true, tmpItemUI, 0, 0, 20);
                            return;
                        }
                    }
                    logE("guide error no find pet id ", guidePetId);
                });

            } else if (step == GuideStep.Func_Pet5StarEmbattle_3)
            { //引导布阵
                Laya.timer.once(50, this, () =>
                {
                    GuideMgr.Inst.showFinger(this.UIPanel.EmHeroBtn, true, this.UIPanel.EmHeroBtn);
                });
            }
        }
    }
}