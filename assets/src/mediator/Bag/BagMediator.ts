module Pro
{
    export class BagMediator extends BaseMediator implements IMediator
    {
        /** 面板 */
        UIPanel: ProUI.Bag.MainUI;

        /** 当前选择项的对应背包类型ID */
        private ChoiceBagItemID = [Pb_God._emBagType.BagType_Equip,
        Pb_God._emBagType.BagType_Item,
        Pb_God._emBagType.BagType_PetPiece,
        Pb_God._emBagType.BagType_Special,
        Pb_God._emBagType.BagType_GodEquip];

        /** 当前选择项的背包数据列表 */
        private ChoiceBagItemAry: Pb_God.PBItem[];

        /** 背包分页锁定的提示（有提示的表示锁定，没有提示的就是开放的） */
        private _lockTabs = new ds.StringMap<string>();

        private uiRoleSayComponent: UiRoleSayComponet;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("herobag")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Bag.MainUI, 0);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            ItemDataMgr.clearNewState();
            this.closePanel(0, true, true); //目前无法处理骨格动画的纹理资源单独消毁， 只能在关闭界面时直接把整个界面销毁以释放内存。
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            return ["res/Unpack/UIHeadShow/pic_renwu01.png"];
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._isAutoReleaseRes = false;
            this.UIPanel.tabGrp.onClick(this, this.itemTabOnClick,
                [new component.UITabData("bag_tab1"), new component.UITabData("bag_tab2"),
                new component.UITabData("bag_tab3"), new component.UITabData("bag_tab4"), new component.UITabData("bag_tab5")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
            this.UIPanel.SellBtn.onClick(this, this.onSellClick);
            this.UIPanel.btnEquipCombin.onClick(this, this.onClickEquipCombin);
            this.UIPanel.tabGrp.onRenderRefresh(this, this.onTabGrpItemRender);
            this.uiRoleSayComponent = new UiRoleSayComponet(UiRoleSayType.BAG, this.UIPanel.txtSay, this.UIPanel.sayPaoPao, this.UIPanel.skRoleClick);

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
            sk.load(UrlMgr.getSpineSceneUrl("npc/xiaoxia2/xiaoxia2"));
            this.UIPanel.aniPos.addChild(sk);
            sk.playByIndex(0, true);
            sk.scale(1.1, 1.1);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Equip_Changed, this, this.refreshUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            this.uiRoleSayComponent.clearUiRoleSay();
        }

        /** 页签刷新 */
        private onTabGrpItemRender(item: ProUI.Hero.HeroBag.TabItemUI, index: number)
        {
            let bagType = this.ChoiceBagItemID[index];
            item.gray = !!this._lockTabs.get(bagType);

            item.IconFrameImg.visible = true;
            (item.getChildByName("Text") as Laya.Label).centerX = 14;
            if (this.UIPanel.tabGrp.tabIndex == index)
            {
                item.BGFrameImg.frame = 2;
                item.IconFrameImg.frame = index * 2 + 8;
            }
            else
            {
                item.BGFrameImg.frame = 1;
                item.IconFrameImg.frame = index * 2 + 7;
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //锁定状态
            this._lockTabs.clear();
            // 星石分页
            let achId = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, 24);
            let isOpen = AchieveDataMgr.isMainComplete(achId);
            if (!isOpen)
            {
                this._lockTabs.put(Pb_God._emBagType.BagType_Special, Global.getLangStr("bag_msg13"));
            }
            // 神装分页
            achId = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, 25);
            isOpen = AchieveDataMgr.isMainComplete(achId);
            if (!isOpen)
            {
                this._lockTabs.put(Pb_God._emBagType.BagType_GodEquip, Global.getLangStr("bag_msg14"));
            }

            //碎片背包分页关联红点模型
            let redDotModes = [
                null,
                null,
                ItemDataMgr.reddotModel,
                null
            ]
            this.UIPanel.tabGrp.setRedDotModelList(redDotModes);

            this.UIPanel.tabGrp.setSelectTab(1);
            this.uiRoleSayComponent.uiRoleSay();
        }

        public refreshUI()
        {
            this.UIPanel.tabGrp.activeCurrentTab();
        }

        /** 装备合成按钮 */
        private onClickEquipCombin(): void
        {
            if (!PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.EquipCombin, true)) { return; }
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombin), BaseBackUIType.HideBackUI);
        }

        /** 出售 */
        private onSellClick()
        {
            if (this.UIPanel.tabGrp.tabIndex == 0)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagNorEquipSell));
            }
            else
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagGodEquipSell));
            }
        }

        //----------------------------------------Tab刷新---------------------------------------
        private itemTabOnClick(tab: component.UITab, newIndex: number, oldIndex: number)
        {
            let bagType = this.ChoiceBagItemID[newIndex];
            if (this._lockTabs.get(bagType))
            {
                TipsUtils.showTips(this._lockTabs.get(bagType));
                this.UIPanel.tabGrp.setSelectTab(oldIndex);
                return;
            }
            this.refreshItemList(newIndex, newIndex != oldIndex);
        }

        //----------------------------------------背包列表刷新---------------------------------------
        /** 刷新背包元素列表 */
        private refreshItemList(index: number, scrollToZero: boolean)
        {

            let tmpBagType = this.ChoiceBagItemID[index];



            this.UIPanel.SellBtn.visible = tmpBagType == Pb_God._emBagType.BagType_Equip || tmpBagType == Pb_God._emBagType.BagType_GodEquip;
            this.UIPanel.btnEquipCombin.visible = tmpBagType == Pb_God._emBagType.BagType_Equip;
            let itemType = tmpBagType == Pb_God._emBagType.BagType_Special ? Pb_God._emItemType.ItemType_Rune : 0;
            //刷新列表
            this.ChoiceBagItemAry = ItemDataMgr.getBagAryWithBagType(tmpBagType, false);
            ItemDataMgr.sortBagItemList(Pb_God._emBagType.BagType_Special, this.ChoiceBagItemAry, itemType);

            //刷新显示节点
            //碎片背包要显示进度条， 所以间隔要拉高一点
            if (tmpBagType == Pb_God._emBagType.BagType_PetPiece)
            {
                this.UIPanel.ItemList.paddingVArr = [[Math.floor(this.ChoiceBagItemAry.length / this.UIPanel.ItemList.repeatX), 25]];
                this.UIPanel.ItemList.spaceY = 20;
            }
            else
            {
                this.UIPanel.ItemList.paddingVArr = [];
                this.UIPanel.ItemList.spaceY = 0;
            }

            this.UIPanel.ItemList.onRefresh(this.ChoiceBagItemAry.length, this, this.onItemRefresh);
            if (scrollToZero)
            {
                this.UIPanel.ItemList.scrollTo(0);
            }
            else
            {
                this.UIPanel.ItemList.scrollBar.value = this.UIPanel.ItemList.scrollBar.value - 0.01;
            }
        }

        /** 背包元素刷新 */
        private onItemRefresh(item: NorItemUI, index: number)
        {
            let info = this.ChoiceBagItemAry[index];
            if (info)
            {
                item.setItemInfo(info, false, true, true, true, true);
                //特殊处理背包新道具逻辑
                item.setNewIcon(info["isNew"]);
            }
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.BagCombinHero_6_2)
            {
                Laya.timer.once(200, this, () =>
                {
                    let tmpItemUI = this.UIPanel.tabGrp.getCell(2);
                    GuideMgr.Inst.showFinger(tmpItemUI, true, tmpItemUI as component.UIButton);
                });
            }
            else if (step == GuideStep.BagCombinHero_6_3)
            {
                Laya.timer.once(100, this, () =>
                {
                    let tmpBtn = this.UIPanel.ItemList.getCell(0) as NorItemUI;
                    GuideMgr.Inst.showFinger(tmpBtn, true, tmpBtn, 0, 0, 20);
                });
            }
        }
    }
}