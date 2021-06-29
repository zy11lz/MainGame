module Pro
{
    /**
     * 界面说明： 神装套装管理界面
    * @author jason.xu
    */
    export class GodEquipSuitMgrMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Heavens.GodEquip.SuitMgrUI;

        /** 当前操作的英雄 */
        private _hero: Net.hero;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null; //[UrlMgr.getAtlas('')]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.GodEquip.SuitMgrUI, 1, BaseAddLayer.TopUI,true);
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
            this.UIPanel.norItemCurHero.setPetInfo(this._hero, false, false);
            //钻石数量
            this.UIPanel.txtDiamon.text = Global.numberToTuckString(Global.getItemNum(CfgID.ItemID.Diamond));
            //刷新当前神装列表
            this.refreshCurGodEquipList();
            //刷新方案列表
            this.refreshSuitProjectList();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnQuickEquip.onClick(this, this.onClickQuickEquip);
            this.UIPanel.btnSave.onClick(this, this.onClickSave);
            this.UIPanel.viewProjectSelect.bgMask.onClick(this, () =>
            {
                this.UIPanel.viewProjectSelect.visible = false;
            })
            //道具数量变更
            this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);

            //穿戴神装返回	PBCAGPet_GodEquip
            this.addEventMgr(CmdEvent.Pet_GodEquip_Ack, this, this.onGodEquip_Ack)
            //一键脱下神装	PBU64
            this.addEventMgr(CmdEvent.Pet_GodUnEquipOneKey_Ack, this, this.onGodUnEquipOneKey_Ack)
            //同步套装格子 	PBPlayerGodEquipSuitInfo
            this.addEventMgr(EventNotify.GodequipSuitMgr_Update, this, this.onGodSuit_Syn)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 一键脱下 */
        private onClickQuickEquip(): void
        {
            if (SuitEquipDataMgr.getSuitMgr(this._hero.sn).getGodList().length <= 0)
            {
                TipsUtils.showTipsByLanId("godequip_suitMgr_10");
                return;
            }
            PetSend.godUnEquipOneKey_Ask(this._hero.sn);
        }

        /** 保存方案 */
        private onClickSave(): void
        {
            //方案是空
            if (SuitEquipDataMgr.getSuitMgr(this._hero.sn).getGodList().length <= 0)
            {
                TipsUtils.showTipsByLanId("godequip_suitMgr_22"); //空方案不允许保存
                return;
            }
            this.UIPanel.viewProjectSelect.visible = true;
            //刷新方案选择界面的列表            
            let showList = SuitEquipDataMgr.getAllGodEquipSuitMgr();
            this.UIPanel.viewProjectSelect.listView.onRefresh(showList.length, this, (box: Laya.Box, index: number) =>
            {
                let mgrInfo = showList[index];
                let btnSel = box.getChildByName("btnSel") as component.UIButton;
                let txtIndex = box.getChildByName("txtIndex") as component.UILabel;
                let txtName = box.getChildByName("txtName") as component.UILabel;
                let txtEmpty = box.getChildByName("txtEmpty") as component.UILabel;
                txtEmpty.visible = mgrInfo.posequip.length == 0;
                txtName.text = mgrInfo.name;
                if (txtEmpty.visible) txtEmpty.x = txtName.x + txtName.width + 5;
                txtIndex.text = (index + 1).toString();
                btnSel.onClick(this, () =>
                {
                    if (txtEmpty.visible || TodayRepeatOpMgr.Inst.getTag("GodEquipSuitMgrSave"))
                    { //如果上面没有其它，就直接替换了
                        PetSend.godSuit_SaveAsk(this._hero.sn, mgrInfo.id);
                    } else
                    { //有需要替换的，则弹窗确认
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_GodEquipSuitProjectSave, this._hero, mgrInfo));
                    }
                    this.UIPanel.viewProjectSelect.visible = false;
                })
            })
            this.UIPanel.viewProjectSelect.bg.height = this.UIPanel.viewProjectSelect.listView.getCellTrueHeight() + 150;
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 刷新道具数量 */
        private onItemNumChange(fID: number, tempNewNum: number): void
        {
            //钻石数量
            if (fID == CfgID.ItemID.Diamond)
            {
                this.UIPanel.txtDiamon.text = Global.numberToTuckString(tempNewNum);
            }
        }

		/*****
		 *穿戴神装返回	PBCAGPet_GodEquip
		 * @param PBCAGPet_GodEquip
		 * 		sn			uint64	伙伴sn
		 * 		pos			uint32	部位
		 * 		itemsn			uint64	穿戴的道具 0表示脱下
		 */
        protected onGodEquip_Ack(value: Pb_God.PBCAGPet_GodEquip): void
        {
            if (!value.sn.equals(this._hero.sn)) return;
            this.refreshCurGodEquipList();
        }

		/*****
		 *一键脱下神装	PBU64
		 * @param PBU64
		 * 		value			uint64	
		 */
        protected onGodUnEquipOneKey_Ack(value: Pb_God.PBU64): void
        {
            if (!value.value.equals(this._hero.sn)) return;
            this.refreshCurGodEquipList();
        }


		/*****
		 *同步套装格子 	PBPlayerGodEquipSuitInfo
		 * @param PBPlayerGodEquipSuitInfo
		 */
        protected onGodSuit_Syn(value: Pb_God.PBPlayerGodEquipSuitInfo, oldValue: Pb_God.PBPlayerGodEquipSuitInfo): void
        {
            if (oldValue == null)
            { //新增的
                this.refreshSuitProjectList();
            } else
            {
                //刷新单个即可
                this.UIPanel.listView.setItem(value.id - 1, cfg.GodEquipSuitMgrCfgData.getInfo(value.id));
                if (value.petsn.equals(this._hero.sn) || oldValue.petsn.equals(this._hero.sn))
                    this.refreshCurGodEquipList();
            }
        }

        /** 刷新当前英雄的神装列表 */
        private refreshCurGodEquipList(): void
        {
            this.UIPanel.listCurEquip.onRefresh(4, this, this.onRefreshCurEquipItem);
            //激活的套装描述
            let equipMgrInfo = SuitEquipDataMgr.getSuitMgr(this._hero.sn);
            let itemList = equipMgrInfo.getGodList();
            this.UIPanel.txtSuitDesc.text = this.getSuitStringByEquipList(itemList);
            //当前使用的套装名字
            let suitMgrInfo = SuitEquipDataMgr.getGodEquipSuitInfoByHeroSn(this._hero.sn);
            if (suitMgrInfo) this.UIPanel.txtCurName.text = Global.getLangStr("godequip_suitMgr_20") + Global.getLangStr("common_bracket", suitMgrInfo.name);
            else this.UIPanel.txtCurName.text = Global.getLangStr("godequip_suitMgr_16");
        }

        private onRefreshCurEquipItem(equipItem: EquipItemUI, index: number): void
        {
            let equipType = index + 1;
            equipItem.setPetGodWeaponInfo(this._hero, equipType, false);
            equipItem.onClick(this, () =>
            {
                let tempEquipInfo = SuitEquipDataMgr.getSuitMgr(this._hero.sn).getGodEquip(equipType);
                if (tempEquipInfo == null)
                {
                    UIManager.Inst.forceOpen(new HeroEquipSuitOpenUIData(this._hero.sn, equipType, PanelNotify.Open_HeroEquipSuitGod));
                }
                else
                {
                    let tempItemInfo = ItemDataMgr.getUsesPBItem(tempEquipInfo.itemsn as Long);
                    UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tempItemInfo, this._hero.sn, true));
                }
            })
        }

        /** 刷新整个套装方案列表 */
        private refreshSuitProjectList(): void
        {
            let allCfgList = cfg.GodEquipSuitMgrCfgData.getAll();
            let showList: cfg.GodEquipSuitMgrCfgInfo[] = [];
            for (let cfginfo of allCfgList)
            {
                showList.push(cfginfo);
                if (!SuitEquipDataMgr.getGodEquipSuitInfoById(cfginfo.iD)) break;
            }
            this.UIPanel.listView.onRefreshWithArray(showList, this, this.onRefreshProjectItem);
        }

        private onRefreshProjectItem(itemUI: ProUI.Heavens.GodEquip.SuitMgrItemUI, index: number): void
        {
            let cfgInfo = this.UIPanel.listView.getItem(index) as cfg.GodEquipSuitMgrCfgInfo;
            let suitData = SuitEquipDataMgr.getGodEquipSuitInfoById(cfgInfo.iD);
            let isOpen = suitData != null;
            itemUI.openBox.visible = isOpen;
            itemUI.noopenBox.visible = !isOpen;
            let useHero: Net.hero = null;
            let equipMap = new ds.StringMap<Pb_God.PBPosEquip>();
            if (suitData)
            {
                itemUI.txtName.text = Global.getLangStr("common_bracket", suitData.name);
                //使用者
                useHero = PetDataMgr.getPetInfo(suitData.petsn);
                equipMap = Global.listToStringMapData(suitData.posequip, "pos", equipMap, false);
                //激活的套装描述
                itemUI.txtSuitDesc.text = this.getSuitStringByEquipList(suitData.posequip);
            } else
            {
                itemUI.txtName.text = Global.getLangStr("common_bracket", cfgInfo.name);
                itemUI.txtSuitDesc.text = this.getSuitStringByEquipList([]);
                if (cfgInfo.needItem)
                { //需要收费开启
                    let needItem = cfg.GodEquipSuitMgrCfgData.getNeedItemInfoByInfo(cfgInfo);
                    itemUI.txtFeeLabel.visible = true;
                    itemUI.txtFeeCount.text = needItem.itemcount + Global.getLangStr("system_tips_msg");
                    //付费开启按钮
                    itemUI.btnFeeOpen.onClick(this, () =>
                    {
                        //二级提示
                        let desc = Global.getLangStr("godequip_suitMgr_19", needItem.itemcount, cfgInfo.name);
                        AlertShow.showConfirmAlert(desc, this, () =>
                        {
                            if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true)) return;
                            PetSend.godSuit_OpenAsk(cfgInfo.iD);
                        })
                    })
                } else
                {
                    itemUI.txtFeeLabel.visible = false;
                    itemUI.txtFeeCount.text = "0  " + Global.getLangStr("system_tips_msg");
                    //付费开启按钮
                    itemUI.btnFeeOpen.onClick(this, () => { PetSend.godSuit_OpenAsk(cfgInfo.iD); });
                }
            }

            //套装列表
            itemUI.listEquip.onRefresh(4, this, (equipItem: EquipItemUI, equipIndex: number) =>
            {
                let equipType = equipIndex + 1;
                let equipInfo = equipMap.get(equipType);
                let itemInfo: Pb_God.PBItem = null;
                if (equipInfo)
                {
                    itemInfo = ItemDataMgr.getUsesPBItem(equipInfo.itemsn) || ItemDataMgr.getBagPBItem(equipInfo.itemsn);
                }
                equipItem.setPetGodWeaponID(equipType, itemInfo);
                equipItem.onClick(this, () =>
                {
                    if (itemInfo == null)
                    {
                        let openUIData = new HeroEquipSuitOpenUIData(null, equipType, PanelNotify.Open_HeroEquipSuitGod);
                        openUIData.godEquipSuitMgrId = cfgInfo.iD;
                        UIManager.Inst.forceOpen(openUIData);
                    }
                    else
                    {
                        let openItemReviewData = new ItemReviewOpenUIData(itemInfo, null, true);
                        openItemReviewData.godEquipSuitMgrId = cfgInfo.iD;
                        UIManager.Inst.forceOpen(openItemReviewData);
                    }
                })
            })

            //使用者英雄名
            if (useHero)
            {
                itemUI.txtHeroName.color = "#009e00";
                itemUI.txtHeroName.underline = true;
                itemUI.txtHeroName.underlineColor = "#009e00";
                itemUI.txtHeroName.mouseEnabled = true;
                itemUI.txtHeroName.text = cfg.PetSkinCfgData.getFileNameById(useHero.useskinid);
                itemUI.txtHeroName.offAll(Laya.Event.MOUSE_DOWN);
                itemUI.txtHeroName.on(Laya.Event.MOUSE_DOWN, this, () =>
                {
                    CommonSend.queryPetView(PlayerDataMgr.uid, PlayerDataMgr.worldid, useHero.sn, 0, 0);
                })
            } else
            {
                itemUI.txtHeroName.color = "#784720";
                itemUI.txtHeroName.underline = false;
                itemUI.txtHeroName.mouseEnabled = false;
                itemUI.txtHeroName.underlineColor = null;
                itemUI.txtHeroName.text = Global.getLangStr("common_none");
            }
            itemUI.txtHeroTitle.x = itemUI.txtHeroName.x - itemUI.txtHeroName.width - 3;
            //装配按钮
            itemUI.btnUse.onClick(this, () =>
            {
                //已装配的就是当前英雄
                if (suitData.petsn.equals(this._hero.sn))
                {
                    TipsUtils.showTipsByLanId("godequip_suitMgr_21");
                }
                //当前没有使用者，就直接装配了                
                else if (!suitData.petsn.toNumber() || TodayRepeatOpMgr.Inst.getTag("GodEquipSuitMgrUse"))
                {
                    PetSend.godSuit_SaveEquipAsk(this._hero.sn, suitData.id);
                }
                //有需要替换的，则弹窗确认
                else
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_GodEquipSuitProjectUse, this._hero, suitData));
                }
            })
            //改名按钮
            itemUI.btnEditName.x = itemUI.txtName.x + itemUI.txtName.width + 25;
            itemUI.btnEditName.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_GodEquipSuitProjectRename, suitData));
            });
        }

        /** 根据道具列表获取套装组合文字描述 */
        private getSuitStringByEquipList(equipList: Pb_God.PBPlayerPetGodEquip[] | Pb_God.PBPosEquip[]): string
        {
            if (equipList.length <= 1)
                return Global.getLangStr("godequip_suitMgr_04");
            let idMapCount = {};
            for (let el of equipList)
            {
                let itemInfo = ItemDataMgr.getUsesPBItem(el.itemsn) || ItemDataMgr.getBagPBItem(el.itemsn);
                if (!itemInfo) continue;
                //套装ID
                let suitId = parseInt(cfg.ItemCfgData.getUseParamById(itemInfo.itemid));
                let count = idMapCount[suitId] || 0;
                idMapCount[suitId] = count + 1;
            }
            let suitStrArr: string[] = [];
            for (let id in idMapCount)
            {
                let count = idMapCount[id];
                if (count >= 2)
                {
                    if (count == 3) count = 2;
                    suitStrArr.push(Global.getLangStr("godequip_suitMgr_18", cfg.GodEquipSuitCfgData.getSuitNameBySuitID(parseInt(id)), count))
                }
            }
            if (suitStrArr.length <= 0) return Global.getLangStr("godequip_suitMgr_04");
            return Global.getLangStr("godequip_suitMgr_17", suitStrArr.join("  "));
        }


    }
}