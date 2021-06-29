module Pro
{
    /**
    *  共鸣
    */
    export class HeroResonanceMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Hero.HeroResonance.HeroResonanceUI;
        private _selectHero: Net.hero;

        private _timerCell: any[] = [];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('heroResonance')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroResonance.HeroResonanceUI, 3, BaseAddLayer.CenterUI, false, 1);
        }

        private adjustScreenPos()
        {
            this.UIPanel.height = GameConfig.curHeight();
            this.UIPanel.y = 0;

        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.adjustScreenPos();
            this.UIPanel.tabGrpOption.onRenderRefresh(this, this.onOptionRender);
            this.UIPanel.tabGrpOption.hScrollBarSkin = "";

            this.UIPanel.tabGrpOption.onClick(this, this.onOptionClick,
                [new component.UITabData(Global.getLangStr("resonance_msg1")), new component.UITabData(Global.getLangStr("resonance_msg2")),
                new component.UITabData(Global.getLangStr("resonance_msg3"))], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );

            let needItem = cfg.ResonanceGridCfgData.getConsume();
            Global.setResIconWithItemID(this.UIPanel.imgMaterial, CfgID.ResType.Item, parseInt(needItem[0]));

            this.UIPanel.tabGrpOption.setSelectTab(0);
        }


        private onOptionRender(tempUI: component.UIButton, index: number)
        {
            tempUI.gray = index == 2 || (index == 1 && !PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Resonance2, false));
        }

        private onOptionClick(tab: component.UITab, index: number, oldIndex: number)
        {
            this._timerCell = [];
            let idx = index + 1;

            switch (idx)
            {
                case Pb_God._emResonanceType.Resonance_Type_Level:
                    this.refreshLevelBox();
                    this.UIPanel.levelBox.visible = true;
                    this.UIPanel.starBox.visible = false;
                    break;
                case Pb_God._emResonanceType.Resonance_Type_Star:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Resonance2, false))
                    {
                        TipsUtils.showTips(cfg.SystemSwitchSystemSwitchCfgData.getUnlockDesByID(emSystemSwitchType.Resonance2));
                        this.UIPanel.tabGrpOption.setSelectTab(oldIndex);
                        return;
                    }
                    this.refreshStarBox();
                    this.UIPanel.levelBox.visible = false;
                    this.UIPanel.starBox.visible = true;
                    break;
                case 3:
                    TipsUtils.showTipsByLanId("common_noopen2");
                    this.UIPanel.tabGrpOption.setSelectTab(oldIndex);
                    break;
            }

            this.refreshGridCount(idx)
        }

        private refreshGridCount(idx)
        {
            let info = ResonanceDataMgr.getInfoByType(idx);
            if (!info)
                return;
            this.UIPanel.lblGridCout.text = ResonanceDataMgr.getCountByType(idx) + "/" + info.maxgrididx;
        }

        private refreshLevelPetBox()
        {
            let info = ResonanceDataMgr.getLevelResonance();
            for (let i = 1; i <= 5; i++)
            {
                let sp = this.UIPanel[`sp${ i }`];
                let lblLv = this.UIPanel[`lbllv${ i }`];
                let petSn = info.petlist[info.petlist.length - i];
                if (!petSn)
                {
                    sp.visible = false;
                }
                else
                {
                    sp.visible = true;
                    if (!sp["sk"])
                    {
                        let sk = new SkeletonPlayer();
                        sp["sk"] = sk;
                        sp.addChild(sk);
                    }
                    let pet = PetDataMgr.getPetInfo(petSn)
                    let skRes = cfg.PetSkinCfgData.getSkelNameById(pet.useskinid);
                    sp["sk"].setRes(UrlMgr.getModelSkUrl(skRes));
                    sp["sk"].play("standby_loop", true);
                    lblLv.text = pet.level + Global.getLangStr("common_level");
                }
            }
        }

        private refreshLevelBox()
        {
            this.onItemChange();

            this.refreshLevelPetBox();
            let info = ResonanceDataMgr.getLevelResonance();
            let cfgGrids = cfg.ResonanceGridCfgData.getGridCfgByType(info.type);
            this.UIPanel.levelList.onRefresh(cfgGrids.length, this, (itemUI: ProUI.Hero.HeroResonance.HeroResonanceItemUI, index: number) =>
            {
                let gridData = ResonanceDataMgr.getGridByTypeAndGridIndex(info.type, cfgGrids[index].gridIdx)
                this.resetItem(itemUI);

                //目前判断空格子需要通过maxgridIndex... 如果有格子数据还要根据sn是不是为0来判断。。。  没办法
                if (index < info.maxgrididx)
                {
                    //格子开启了
                    if (!gridData || (gridData.cdtime - TimeController.currTimer / 1000 < 0 && gridData.petsn.equals(Global.initLongFromValue(0))))
                    {
                        //没精灵
                        itemUI.imgAdd.visible = true;
                        itemUI.on(Laya.Event.CLICK, this, () =>
                        {
                            if (ResonanceDataMgr.getResonanceOpenState())
                            {
                                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroResonanceSelect, info.type, index + 1));
                            }
                            else
                            {
                                TipsUtils.showTipsByLanId("resonance_msg18");
                            }
                        })
                    }
                    else if (gridData.cdtime > 0 && gridData.cdtime > TimeController.currTimer / 1000)
                    {
                        //冷却中
                        itemUI.lblCDTime.visible = itemUI.lblCdDesc.visible = true;
                        itemUI.lblCDTime.text = Global.GetRemindTime(gridData.cdtime - TimeController.currTimer / 1000, 4);

                        this.addTimerCell(itemUI, gridData);

                        itemUI.on(LayaEvent.CLICK, this, () =>
                        {
                            UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(10, [info.type, gridData.grididx, gridData]));
                        })

                    }
                    else if (gridData.petsn)
                    {
                        //有精灵
                        itemUI.item.visible = true;
                        itemUI.item.setPetInfo(PetDataMgr.getPetInfo(gridData.petsn));
                        itemUI.on(LayaEvent.CLICK, this, () =>
                        {
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroResonanceDown, info.type, index + 1));
                        })
                    }
                }
                else
                {
                    //未开启
                    itemUI.imgLock.visible = true;
                    itemUI.on(Laya.Event.CLICK, this, () =>
                    {
                        let iType = info.type;
                        let gridIndex = info.maxgrididx + 1;
                        // let needItem = cfg.ResonanceGridCfgData.getConsumeByTypeAndGridIndex(iType, gridIndex).split("_");
                        // Global.getLangStr("resonance_msg7", needItem[1]);
                        // if (ItemDataMgr.getBagItemNum(parseInt(needItem[0])) >= parseInt(needItem[1]))
                        // {
                            UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(11, [info.type, info.maxgrididx + 1]));
                        // }
                        // else
                        // {
                        //     UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemAccess, [parseInt(needItem[0]), true]));
                        // }
                    })

                }
            })
        }

        private addTimerCell(itemUI, gridData)
        {
            this._timerCell.push([itemUI, gridData]);
        }

        private loopFunc()
        {
            for (let i = 0; i < this._timerCell.length; i++)
            {
                let itemUI = this._timerCell[i][0];
                let gridData = this._timerCell[i][1];
                itemUI.lblCDTime.text = Global.GetRemindTime(gridData.cdtime - TimeController.currTimer / 1000, 4);
            }
        }

        private resetItem(itemUI: ProUI.Hero.HeroResonance.HeroResonanceItemUI)
        {
            itemUI.offAll(LayaEvent.CLICK);
            Laya.timer.clearAll(itemUI.lblCDTime);
            itemUI.imgMask.visible = itemUI.imgState.visible = itemUI.item.visible = itemUI.imgLock.visible = itemUI.imgAdd.visible = itemUI.lblCDTime.visible = itemUI.lblCdDesc.visible = false;
        }

        private refreshStarBox()
        {
            this.refreshStarOptionBox();
            this.onItemChange();
            let info = ResonanceDataMgr.getStarResonance();
            let cfgGrids = cfg.ResonanceGridCfgData.getGridCfgByType(info.type);
            this.UIPanel.starList.onRefresh(cfgGrids.length, this, (itemUI: ProUI.Hero.HeroResonance.HeroResonanceItemUI, index: number) =>
            {
                let gridData = ResonanceDataMgr.getGridByTypeAndGridIndex(info.type, cfgGrids[index].gridIdx)
                this.resetItem(itemUI);

                //目前判断空格子需要通过maxgridIndex... 没办法
                if (index < info.maxgrididx)
                {
                    //格子开启了
                    if (!gridData || (gridData.cdtime - TimeController.currTimer / 1000 < 0 && gridData.petsn.equals(Global.initLongFromValue(0))))
                    {
                        //没精灵
                        itemUI.imgAdd.visible = true;
                        itemUI.on(Laya.Event.CLICK, this, () =>
                        {
                            if (ResonanceDataMgr.getResonance2OpenState())
                            {
                                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroResonanceSelect, info.type, index + 1));
                            }
                            else
                            {
                                TipsUtils.showTipsByLanId("resonance_msg17");
                            }
                        })
                    }
                    else if (gridData.cdtime > 0 && gridData.cdtime > TimeController.currTimer / 1000)
                    {
                        //冷却中
                        itemUI.lblCDTime.visible = itemUI.lblCdDesc.visible = true;
                        itemUI.lblCDTime.text = Global.GetRemindTime(gridData.cdtime - TimeController.currTimer / 1000, 4);

                        this.addTimerCell(itemUI, gridData);

                        itemUI.on(LayaEvent.CLICK, this, () =>
                        {
                            UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(10, [info.type, gridData.grididx, gridData]));
                        })

                    }
                    else if (gridData.petsn)
                    {
                        //有精灵
                        itemUI.item.visible = true;
                        let petInfo = PetDataMgr.getPetInfo(gridData.petsn);
                        itemUI.item.setPetInfo(petInfo);

                        if (petInfo.state == Pb_God._emPetStateType.PetStateType_ResonanceStar)
                        {
                            //已经赋能了
                            // itemUI.imgState.visible = true;
                            // itemUI.imgState.frame = 3;
                        }
                        else
                        {
                            //未赋能 策划说不要黑色罩子了
                            // itemUI.imgMask.visible = true;
                        }
                        itemUI.on(LayaEvent.CLICK, this, () =>
                        {
                            this.selectPet(petInfo);
                        })
                    }

                }
                else
                {
                    //未开启
                    itemUI.imgLock.visible = true;
                    itemUI.on(Laya.Event.CLICK, this, () =>
                    {
                        let condition = cfg.ResonanceGridCfgData.getGridCfgByType(Pb_God._emResonanceType.Resonance_Type_Star)[index].condition;

                        //守护等级达{0}级开启，是否前往升级解锁
                        AlertShow.showConfirmAlert(Global.getLangStr("resonance_msg9", condition.split("_")[1]), this, () =>
                        {
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroBag, 3), BaseBackUIType.CloseQuene)
                        })
                    })
                }
            })
        }

        private selectPet(petInfo: Net.hero)
        {
            this._selectHero = petInfo;
            this.refreshStarOptionBox();
        }

        private refreshStarOptionBox()
        {
            if (!this._selectHero)
            {
                this.UIPanel.noBox.visible = true;
                this.UIPanel.lblStarDesc.text = Global.getLangStr(ResonanceDataMgr.getResonance2OpenState() ? "resonance_msg19" : "resonance_msg17");
                this.UIPanel.optionBox.visible = false;
                return;
            }

            this.UIPanel.noBox.visible = false;
            this.UIPanel.optionBox.visible = true;

            this.UIPanel.currentPet.setPetInfo(this._selectHero);


            this.UIPanel.currentPet.StarBox.setStar(5);
            Global.setResQuWithNum(this.UIPanel.currentPet.BGImg, 4);
            Global.setColorWithNum(this.UIPanel.currentPet.LvLb, 4);
            Global.setColorWithNum(this.UIPanel.currentPet.NumLb, 4);

            if (!ResonanceDataMgr.getResonanceOpenState())
            {
                //有不满足的精灵 显示1星
                this.UIPanel.StarBox.setStar(1);
            }
            else
            {
                let minPet = PetDataMgr.getPetInfo(ResonanceDataMgr.getMinStarPet())
                this.UIPanel.StarBox.setStar(minPet.star);
            }
            this.UIPanel.imgMax.visible = this._selectHero.star >= cfg.PetCfgData.getMaxStarByPetID(this._selectHero.id);
            this.UIPanel.notMaxBox.visible = !this.UIPanel.imgMax.visible;

            if (this.UIPanel.notMaxBox.visible)
            {
                let canConsume = ResonanceDataMgr.getCanResonance2Count(this._selectHero.id).length;
                let needConsume = cfg.ResonanceStarCfgData.getStarNeed(this._selectHero.star);
                this.UIPanel.currentPet.LvLb.text = `${ canConsume }/${ needConsume }`;
                this.UIPanel.oldItem.setPetInfo(this._selectHero);
                this.UIPanel.newItem.setPetInfo(this._selectHero);
                let nextStar = cfg.ResonanceStarCfgData.getNextStar(this._selectHero.star);
                this.UIPanel.newItem.StarBox.setStar(nextStar);
                Global.setResQuWithNum(this.UIPanel.newItem.BGImg, nextStar - 1);
                Global.setColorWithNum(this.UIPanel.newItem.LvLb, nextStar - 1);
                Global.setColorWithNum(this.UIPanel.newItem.NumLb, nextStar - 1);
                this.UIPanel.btnResonance2.disabled = false;
            }
            else
            {
                this.UIPanel.currentPet.LvLb.text = ``;
                this.UIPanel.btnResonance2.disabled = true;
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            Laya.timer.loop(1000, this, this.loopFunc);
            //每次打开 赋能都要重置为两只皮卡丘
            this.UIPanel.noBox.visible = true;
            this.UIPanel.optionBox.visible = false;
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Resonance_PlaceGrid, this, this.refreshUI);
            this.addEventMgr(CmdEvent.Resonance_MainPetSn, this, this.refreshUI);
            this.addEventMgr(CmdEvent.Resonance_OpenGrid, this, this.refreshUI);
            this.addEventMgr(CmdEvent.Resonance_ResetCD, this, this.refreshUI);
            this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemChange);
            this.addEventMgr(EventNotify.Resonance_Select, this, this.onAutoSelect);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, () =>
            {
                let strHelp
                if (this.UIPanel.levelBox.visible)
                {
                    strHelp = Global.getLangStr("resonance_help");
                } else
                {
                    strHelp = Global.getLangStr("Empowerment_help");
                }
                // UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
                CommonHelpView.showWithLangKey(this.UIPanel.btnHelp, strHelp);
            })
            this.UIPanel.btnDown.onClick(this, () =>
            {
                if (this._selectHero)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroResonanceDown, Pb_God._emResonanceType.Resonance_Type_Star, ResonanceDataMgr.getStarGridDataByPetSn(this._selectHero.sn).grididx));
                }
            })

            this.UIPanel.btnResonance2.onClick(this, () =>
            {
                if (!this._selectHero)
                    return;
                ResonanceSend.upStar(ResonanceDataMgr.getStarGridDataByPetSn(this._selectHero.sn).grididx);
            })

            this.addEventMgr(EventNotify.Resonance_down, this, () =>
            {
                this._selectHero = null;
            })

            this.UIPanel.itemClick.offAll(Laya.Event.CLICK);
            this.UIPanel.itemClick.on(Laya.Event.CLICK, this, () =>
            {
                TipsUtils.showTipsByLanId("resonance_msg13");
            })

            this.UIPanel.btnAddMaterial.onClick(this, this.onAddMaterial)
        }

        private onAddMaterial()
        {
            let needItem = cfg.ResonanceGridCfgData.getConsume();
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemAccess, [parseInt(needItem[0]), true]));
        }

        private onItemChange()
        {
            let consume = cfg.ResonanceGridCfgData.getConsume();
            this.UIPanel.lblMaterial.text = ItemDataMgr.getBagItemNum(parseInt(consume[0])) + "";
        }

        private onAutoSelect(value: Pb_God.PBG2CResonanceGridChg)
        {
            let hero = PetDataMgr.getPetInfo(value.grid.petsn);
            if (!hero)
                return;
            this.selectPet(hero);
        }

        public closeUI()
        {
            Laya.timer.clear(this, this.loopFunc);
            super.closeUI();
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.UIPanel.tabGrpOption.activeCurrentTab();
        }

    }


}