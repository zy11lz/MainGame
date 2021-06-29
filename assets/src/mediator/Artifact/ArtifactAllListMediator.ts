module Pro
{
    /**
    * 界面说明： 失落神器（所有神器列表展示）
    * @author jason.xu
    */
    export class ArtifactAllListMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Artifact.AllList.MainUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("artifactAll")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            return ["res/artifactAll/yuanling_pic_02.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Artifact.AllList.MainUI, 0, BaseAddLayer.CenterUI, false, 1);
        }

        public closeUI(): void
        {
            super.closeUI();
            this.UIPanel.upgradeBox.autoUpgradeClose();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btnShengying.onClick(this, this.onClickShengying);
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //红点绑定
            this.reddotBind(this.UIPanel.upgradeBox.imgRedDotUpgrade, ArtifactDataMgr.upgradeRedDotModel);
            this.reddotBind(this.UIPanel.imgRedDotShengying, ArtifactDataMgr.shengyinRedDotModel);
            this.reddotBind(this.UIPanel.reddotConvenant, ConvenantDataMgr.reddotModel);
            this.reddotBind(this.UIPanel.btnTotemsReddot, ActivityDataMgr.reddotModelCommonGrp.getChildModel(11));

            this.refreshUI();
            //刷新列表
            this.refreshList();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnAwake.onClick(this, this.onClickAwake);
            this.UIPanel.btnBuyGift.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StrongerPayGift, Pb_God._emChargeType.ChargeType_Help, emStrongerPayGiftType.Artifact));
            })
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnConvenant.onClick(this, this.onClickConvenant);
            this.UIPanel.btnTotemsRecharge.onClick(this, this.onClickDragonGift);
            this.addEventMgr(EventNotify.Artifact_Upgrade, this, this.onUpgrade);
            this.addEventMgr(CmdEvent.Artifact_UseStone, this, this.onUseStone);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 规则说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "artifact_all_help");
        }

        /** 元素契约 */
        private onClickConvenant(): void
        {
            if (!PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Convenant))
            {

                TipsUtils.showTips(Global.getLangStr("tips_msg83"));
                return;
            }
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Convenant), BaseBackUIType.HideBackUI);
        }

        /**图腾之力 */
        private onClickDragonGift(btn: component.UIButton): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TimeLimitActivity, 11, 0));
        }

        /** 点击觉醒按钮 */
        private onClickAwake(): void
        {
            //是否已经觉醒
            if (ArtifactDataMgr.getIsFazhenAwake())
            {
                ArtifactAwakeTips.show();
            } else
            {
                TipsUtils.showTipsByLanId("artifact_msg15");
            }
        }

        /** 法阵升级参数传递 */
        private onUpgrade(oldLevel: number, oldExp: number, newLevel: number, newExp: number): void
        {
            this.refreshUI();
            if (newLevel == oldLevel && newExp == oldExp)
            {
                return;
            }
            //等级有变化时，只需要弹出提示
            if (newLevel != oldLevel)
            {
                TipsUtils.showTipsByLanId("artifact_msg14", newLevel);
            }
            {
                //属性变化
                let oldAttrMap = ArtifactDataMgr.getFazhenAddAttr(oldLevel, oldExp);
                let newAttrMap = ArtifactDataMgr.getFazhenAddAttr(newLevel, newExp);
                //[attrType, changeValue][]
                let addAttrList: number[][] = [];
                let attrType = Pb_God._emBattleAttribute.BattleAttribute_Attack;
                addAttrList[0] = [attrType, newAttrMap.get(attrType) - oldAttrMap.get(attrType)];
                attrType = Pb_God._emBattleAttribute.BattleAttribute_HPMax;
                addAttrList[1] = [attrType, newAttrMap.get(attrType) - oldAttrMap.get(attrType)];
                this.UIPanel.upAttrListUI.show(addAttrList);
                SoundMgr.Inst().playSound("grow");
            }
        }

        private onUseStone(): void
        {
            SoundMgr.Inst().playSound("levelup");
            ArtifactShenyinPanel.useStoreCall();
            this.refreshUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.refreshAwakeBtn();

            this.UIPanel.btnBuyGift.visible = PlatformDataMgr.getCanBuyListByType(Pb_God._emChargeType.ChargeType_Help, emStrongerPayGiftType.Artifact).length > 0;
            if (this.UIPanel.btnBuyGift.visible) { this.UIPanel.effBtnBuyGift.play(0, true); }

            //集齐可开启升级
            let tmpActiveNum = ArtifactDataMgr.getArtActiveNum();
            let tmpTotleNum = cfg.ArtifactCfgData.getDataList().length;
            let isActiveAll = tmpActiveNum >= tmpTotleNum;
            //新手引导特殊处理： 刚激活法阵进入法阵界面时，要先保留展示一下奖励预览界面
            let isShowActive = isActiveAll/* && GuideMgr.Inst.getInStep() != GuideStep.Func_ArtifactAll_2*/;

            //节点显示控制
            this.UIPanel.activeBox.visible = isShowActive;
            this.UIPanel.unactiveBox.visible = !isShowActive;

            //激活属性
            if (isShowActive)
            {
                this.UIPanel.txtTitle.text = Global.getLangStr("artifact_msg13") + `[Lv.${ ArtifactDataMgr.getFazhenInfo().level }]`;
                this.UIPanel.NameLb.text = Global.getLangStr("artifact_msg13") + `[Lv.${ ArtifactDataMgr.getFazhenInfo().level }]`;
                this.UIPanel.upgradeBox.refreshUI();
                this.UIPanel.imgUnActiveProgress.mask.graphics.clear();
                this.UIPanel.imgUnActiveProgress.mask.graphics.drawPie(142, 142, 150, 110, 430, "#ff0000");
            }//未激活属性
            else
            {
                this.UIPanel.imgUnactiveTips.visible = !isActiveAll;
                let angles = [110, 153, -131, -48, 28, 430];
                this.UIPanel.imgUnActiveProgress.mask.graphics.clear();
                this.UIPanel.imgUnActiveProgress.mask.graphics.drawPie(142, 142, 150, 110, angles[tmpActiveNum], "#ff0000");  // 320 * tmpActiveNum / tmpTotleNum
                this.UIPanel.lbUnActivePro.text = tmpActiveNum + "/" + tmpTotleNum;
                this.UIPanel.NameLb.text = Global.getLangStr("artifact_msg13");
                this.UIPanel.txtTitle.text = Global.getLangStr("artifact_msg13");
                let addItems = cfg.ArtifactConstCfgData.getFazhenAddItemInfos();
                this.UIPanel.unactivelist.onRefreshWithArray(addItems, this, (tmpItem: NorItemUI, index: number) =>
                {
                    tmpItem.setItemInfo(addItems[index]);
                });
            }
        }

        // /** 觉醒活动倒计时 */
        // private onAwakeActivityTimer(): void {
        //     let leftTime = ArtifactDataMgr.getYlActiveLeftTime();
        //     this.UIPanel.txtActivityTimer.text = Global.GetRemindTime(leftTime, 9);
        // }


        /** 刷新觉醒按钮状态 */
        private refreshAwakeBtn(): void
        {
            let isAwake = ArtifactDataMgr.getIsFazhenAwake();
            this.UIPanel.btnAwake.gray = !isAwake;
            this.UIPanel.reddotAwake.visible = false;
        }

        /** 点击圣印 */
        private onClickShengying()
        {
            let needLv = 2;
            if (ArtifactDataMgr.getFazhenInfo().level < needLv)
            {
                TipsUtils.showTipsByLanId("tips_msg8", needLv);
                return;
            }
            ArtifactShenyinPanel.init();
        }

        /** 刷新列有 */
        private refreshList(): void
        {
            let num = this.UIPanel.listView.numChildren;
            let beginId = ArtifactDataMgr.getMinID();
            for (let i = 0; i < num; i++)
            {
                let item = this.UIPanel.listView.getChildAt(i) as ProUI.Artifact.AllList.ItemViewUI;
                this.refreshSingleItem(item, i + beginId);
            }
        }

        private refreshSingleItem(tempUI: ProUI.Artifact.AllList.ItemViewUI, id: number): void
        {
            //显示当前神器是否激活
            let artifaceInfo = ArtifactDataMgr.getInfo(id);
            let isActive = artifaceInfo != null && artifaceInfo.isactive;

            tempUI.txtName.text = cfg.ArtifactCfgData.getNameByID(id) + (isActive ? Global.getLangStr("attr_stage", artifaceInfo.skilllevel) : Global.getLangStr("sail_msg1"));
            // tempUI.frameimgIcon.frame = id;
            // tempUI.frameimgIcon.gray = !isActive;

            let sk = tempUI["artifactSk"];
            if (!sk)
            {
                sk = new SkeletonPlayer();
                tempUI.effPos.addChild(sk);
                sk.scale(0.5, 0.5);
                tempUI["artifactSk"] = sk;
            }
            sk.load(UrlMgr.getSpineSceneUrl(`tuteng/${ id }/${ id }`));
            sk.playByIndex(0, true);
            sk.gray = !isActive;



            // tempUI.frameimgIcon.visible = !isActive; //已置灰，只有在未激活时才显示
            tempUI.imgEquip.visible = isActive && ArtifactDataMgr.getToFightEmbattleList(id).length > 0;

            //当前正准备激活的神器需要显示红点
            tempUI.imgReddot.visible = false;
            if (id == ArtifactDataMgr.getInLockingId())
            {
                tempUI.imgReddot.visible = ArtifactDataMgr.unlockRewardRedDotModel.isRedDot;
            } else if (id == ArtifactDataMgr.skillRedDotModel.bindData)
            {  //技能升级
                tempUI.imgReddot.visible = ArtifactDataMgr.skillRedDotModel.isRedDot;
            }

            tempUI.onClick(this, () =>
            {
                if (id <= ArtifactDataMgr.getInLockingId())
                {
                    this.closeUI();

                    //神器选择, 仅用于神器列表与主界面的信息交互， 不做保存， 主界面默认打开还是以当前激活为主，此处的选择仅当前操作有效
                    if (UIManager.Inst.getUIMeditorInOpenList(PanelNotify.Open_Artifact) == null)
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Artifact, id));
                    }
                    else
                    {
                        EventMgr.trigger(EventNotify.Artifact_SelectedChanged, id);
                    }
                } else
                {
                    TipsUtils.showTipsByLanId("artifact_lock");
                }
            })

        }


        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            // if (step == GuideStep.Artifact_16_4) {
            //     Laya.timer.once(200, this, () => {
            //         let item = this.UIPanel.listView.getChildAt(0) as ProUI.Artifact.AllList.ItemViewUI;
            //         GuideMgr.Inst.showFinger(item, true, item);
            //     });
            // }
            // else if (step == GuideStep.Func_ArtifactAll_3) {
            //     this.refreshUI();
            // }
        }

    }
}