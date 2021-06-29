module Pro
{
    export class HeroDetailMediator extends BaseMediator implements IMediator
    {
        public UIOpenData: HeroDetailOpenUIData;
        public UIPanel: ProUI.Hero.HeroDetail.MainUI;

        /** 当前可切换的英雄数 */
        private MaxHeroItemNum = 0;

        //展示用skeleton
        private _skeletonPlayer: SkeletonPlayer;
        private _skelRefreshTimes: number = 0;

        /** 角色身上展示的特效 */
        private _effNode: EffNode = null;
        /** 当前展示的角色特效类型（英雄类型） */
        private _effType = 0;

        /** 锁住的分页按钮 */
        private _lockPageBtns = new ds.StringMap<boolean>();

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("herodetail")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/herodetail/shenzhuang_pic01.png", "res/herodetail/yingxiong_pic_6.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroDetail.MainUI, 3, BaseAddLayer.CenterUI, false, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
            if (this._effNode)
            {
                this._effNode.removeSelf();
            }
            this._effNode = null;
            this._effType = 0;

            if (this._skeletonPlayer)
            {
                this._skeletonPlayer.off(LayaEvent.STOPPED, this, this.onSkStop);
                this._skeletonPlayer.removeSelf();
                this._skeletonPlayer = null;
            }

            // if (this.RoleInfo != null)
            // {
            //     Global.removeBaseRole(this.RoleInfo);
            //     this.RoleInfo = null;
            // }
            //关掉当前正在播放的音效，并释放相关的资源
            this.closeCurShowVoice();

            PetDataMgr.clearTempHeroReddotModel();
            //恢复新手引导
            GuideMgr.Inst.checkAndReActiveGuideByPauseStep(GuideStep.HeroStrength_14_8);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {


            this.UIPanel.FunBox.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("hero_dev_tab1", "upgrade", HeroDetailUpgradeTabel),
                new TableBarContinerData("hero_dev_tab2", "upstar", HeroDetailUpStarTabel),
                new TableBarContinerData("hero_dev_tab3", "talent", HeroDetailTianfuTabel),
                new TableBarContinerData("hero_dev_tab4", "godEquip", HeroDetailGodEquipTabel)
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

            this.UIPanel.tabGrp.onRenderRefresh(this, this.onTabItemRender);
            this.UIPanel.FunBox.onClick(this, this.onFunBoxClick);
            //切换英雄
            this.UIPanel.ArrowItemUI.onClick(this, this.onArrowItemClick);
            //点击英雄形象
            this.UIPanel.btnAvatarShow.frequencyClickLock = 500;
            this.UIPanel.btnAvatarShow.onClick(this, this.onClickAvatar);
            this.UIPanel.Horcrux.onClick(this, this.onClickHorcrux);
            // 预览档案
            this.UIPanel.btnArchives.onClick(this,this.onClickArchives);
            // 预览进化
            this.UIPanel.btnPreviewEvolution.onClick(this,this.onClickPreviewEvolution);
        }

        /** 页签刷新 */
        private onTabItemRender(item: ProUI.Hero.HeroBag.TabItemUI, index: number)
        {
            let tabName = this.UIPanel.FunBox.getTableNameByIndex(index);
            //神装按钮6星就开启了，但是到9星才能点击
            if (this._lockPageBtns.get(tabName))
            {
                item.gray = true;
            }
            else
            {
                item.gray = false;
            }
        }

        private onClickAvatar(): void
        {
            this.onSkClick(null);
            //播放英雄音效
            let sounds = cfg.PetCfgData.getVoiceByPetID(this.getCurPetId());
            if (!sounds) { return; }
            let soundArr = sounds.split(";");
            let sound = soundArr[Global.getRandomNum(0, soundArr.length)];
            this.closeCurShowVoice();
            SoundMgr.Inst().playSoundByName(sound, SoungGroup.heroShowVoice);
        }

        // 点击魂器
        private onClickHorcrux(): void
        {
            let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            let horcruxInfo: cfg.HorcruxCfgInfo = cfg.HorcruxCfgData.getHorcruxInfoByPetId(tmpPetInfo.id);
            let horcruxState = PetDataMgr.getHasHorcruxState(tmpPetInfo)
            if (horcruxState == 0)
            {
                TipsUtils.showTipsByLanId("tips_msg82");
            }
            else
            {
                // 打开携带物详情页面
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroHorcrux, tmpPetInfo));
            }
        }

        // 档案
        private onClickArchives(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroArchivesMediator,this.UIOpenData.heroBookCfgInfo));
        }

        // 预览进化
        private onClickPreviewEvolution(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroEvolutionPreviewMediator,this.UIOpenData.heroBookCfgInfo.petID));
        }

        private closeCurShowVoice(): void
        {
            SoundMgr.Inst().controlSound(SoundStatue.Stop, SoungGroup.heroShowVoice);
        }

        /** 设置特效类型显示 */
        private setPetTypeEffect(type: number): void
        {
            if (this._effType == type) { return; }
            this._effType = type;

            if (this._effNode)
            {
                this._effNode.removeSelf();
            }

            //UI背景
            let uiBgName = `heroDetailType${ type }.jpg`;
            let uiUrl = Global.getUIBGPathWithResUrl(uiBgName);
            this.setUIBG(uiUrl);
        }

        private onFunBoxClick(index: number, tabName: string)
        {
            if (index == 0)
            {
                this.UIPanel.CollocationBox.visible = this.UIOpenData.isTujian
                if (this.UIOpenData.isTujian)
                {
                    if (this.UIOpenData.heroBookCfgInfo != null)
                    {
                        this.UIPanel.btnArchives.visible =  this.UIOpenData.heroBookCfgInfo.petStorySwitch == 1;
                        this.UIPanel.btnMaster.visible =  this.UIOpenData.heroBookCfgInfo.masterMatchSwitch == 1;
                        this.UIPanel.btnReview.visible =  this.UIOpenData.heroBookCfgInfo.reviewSwitch == 1;
                        this.UIPanel.archivesRedDot.visible = this.UIPanel.btnArchives.visible && 
                                                              PetDataMgr.rewardpets.indexOf(this.UIOpenData.heroBookCfgInfo.petID) == -1 && 
                                                              PetDataMgr.seenpets.indexOf(this.UIOpenData.heroBookCfgInfo.petID) > -1;

                        this.UIPanel.FunBox.setTableViewData(tabName, [null, null, this.UIOpenData.heroBookCfgInfo]);
                    }
                    else
                    {
                        this.UIPanel.FunBox.setTableViewData(tabName, [null, this.UIOpenData.heroCfgList[this.UIOpenData.heroIndex]]);
                    }
                }
                else
                {
                    this.UIPanel.FunBox.setTableViewData(tabName, [this.UIOpenData.heroDataList[this.UIOpenData.heroIndex], null]);
                }
            }
            else
            {
                let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
                this.UIPanel.FunBox.setTableViewData(tabName, tmpPetInfo);
            }
        }

        private onArrowItemClick(btnIndex)
        {
            if (btnIndex == 0)
            {
                this.UIOpenData.heroIndex--;
                if (this.UIOpenData.heroIndex < 0)
                {
                    this.UIOpenData.heroIndex = 0;
                }
            }
            else if (btnIndex == 1)
            {
                this.UIOpenData.heroIndex++;
                if (this.UIOpenData.heroIndex >= this.MaxHeroItemNum)
                {
                    this.UIOpenData.heroIndex = this.MaxHeroItemNum - 1;
                }
            }
            if (this.UIOpenData.isTujian)
            {
                this.UIOpenData.heroBookCfgInfo = this.UIOpenData.tuJianList[this.UIOpenData.heroIndex];
            } else
            {
                this.UIOpenData.heroInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            }
            //关掉当前正在播放的音效，并释放相关的资源
            this.closeCurShowVoice();

            this.onSwitchHeroInfo(true);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.UIPanel.btnRebirth.onClick(this, this.onClickHeroRebirth);
            this.UIPanel.btnEvolve.onClick(this, this.onClickHeroEvolve);
            this.UIPanel.btnStarRebirth.onClick(this, this.onClickHeroStarRebirth);

            this.addEventMgr(EventNotify.Pet_Changed, this, this.Pet_Changed);
            this.addEventMgr(EventNotify.Equip_Changed, this, this.Pet_Changed);
            //同步单个战斗力	PBG2CSynPetFightPower
            this.addEventMgr(EventNotify.Pet_FightPowerChange, this, this.onSynFightPower)

            //删除				PBG2CPet_Remove_Ack
            this.addEventMgr(Cmd.S2C_Pet_Remove_Ack.cmdName, this, this.onRemove_Ack)

            this.addEventMgr(Cmd.S2C_Pet_Horcrux_Awake.cmdName, this, this.onHorcrux_Awake);
            //升级伙伴返回		PBG2CPet_UpLevel_Ack
            this.addEventMgr(Cmd.S2C_Pet_UpLevel_Ack.cmdName, this, this.onUpLevel_Ack);
            this.addEventMgr(Cmd.S2C_Pet_Advance_Ack.cmdName, this, this.onUpAdvance_Ack);
            //升星返回
            this.addEventMgr(EventNotify.Pet_Star_Changed, this, this.onUpStar_Ack);

            this.addEventMgr(EventNotify.Pet_AttrChange, this, this.onPetAttrChange);

            this.UIPanel.btnLiberate.onClick(this, this.onLiberateClick);

        }

        private onLiberateClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HuPa_Liberate, this.UIOpenData.heroInfo.sn));
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
            this.UIPanel.tabGrp.tabIndex = 0; //打开界面时，默认回到第一个分页， 但由于后面的refreshUI里面会有调用set重置，此处只需要修改值即可，无需使用set方法
            //区分图鉴
            this.UIPanel.tabGrp.visible = this.UIPanel.DoSomingBox.visible = !this.UIOpenData.isTujian;
            // this.UIPanel.ArrowItemUI.visible = this.UIOpenData.heroBookCfgInfo == null;

            //其他控制
            this.UIPanel.CloseBtn.onClick(this, this.closeUI);

            //刷新英雄
            this.refreshUI(true);

        }

        /** 点击英雄重生按钮 */
        private onClickHeroRebirth(): void
        {
            let hero = this.UIOpenData.heroInfo;
            //判断英雄等级
            if (!hero || hero.level <= 1)
            {
                TipsUtils.showTipsByLanId("heroRebirth_msg04");
                return;
            }
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroRebirth, hero));
        }

        /** 点击英雄高星重生按钮 */
        private onClickHeroStarRebirth(): void
        {
            let hero = this.UIOpenData.heroInfo;
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroHighStarReborn, hero));
        }

        /** 点击英雄进化按钮 */
        private onClickHeroEvolve()
        {
            //TipsUtils.showTipsByLanId("common_system_noOpen");
            let hero = this.UIOpenData.heroInfo;
            let petEvolueCfgInfoArr = cfg.PetEvolveCfgData.getInfoWithIdArr(hero.id);

            if (petEvolueCfgInfoArr.length)
            {
                if (hero.evolve >= petEvolueCfgInfoArr[0].maxEvolve)
                {
                    Pro.TipsUtils.showTips(Global.getLangStr("evolution_tip_des_3"));
                } else
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EvolutionMainView, hero));

                }
            } else
            {
                Pro.TipsUtils.showTips(Global.getLangStr("evolution_tip_des_4"));
            }


        }

        public refreshUI(isInit = false)
        {
            if (this._isClosed)
            {
                return;
            }
            //选择数据
            if (this.UIOpenData && !this.UIOpenData.isTujian)
            {
                if (!this.UIOpenData.heroDataList)
                {
                    this.UIOpenData.heroDataList = PetDataMgr.getPetList(this.UIOpenData.heroType);
                }
            }
            else
            {
                this.UIOpenData.heroCfgList = cfg.PetCfgData.getInfoWithFun(this.UIOpenData.heroType);
            }

            //异常判断
            this.MaxHeroItemNum = 0;
            if (this.UIOpenData.isTujian) { this.MaxHeroItemNum = this.UIOpenData.tuJianList ? this.UIOpenData.tuJianList.length : 0; }
            else { this.MaxHeroItemNum = this.UIOpenData.heroDataList.length; }
            if (this.UIOpenData.heroIndex >= this.MaxHeroItemNum)
            {
                this.UIOpenData.heroIndex = this.MaxHeroItemNum - 1;
            }

            //默认选择的英雄
            if (this.UIOpenData && !this.UIOpenData.isTujian)
            {
                if (isInit)
                {
                    this.UIOpenData.heroInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
                }
                else
                {

                    //查找上次选中的英雄索引是否发生变更
                    let tempIndex = -1;
                    for (let i = 0; i < this.UIOpenData.heroDataList.length; i++)
                    {
                        if (this.UIOpenData.heroDataList[i].sn.equals(this.UIOpenData.heroInfo.sn))
                        {
                            tempIndex = i;
                            break;
                        }
                    }

                    //重新定义选中角色的索引
                    if (tempIndex != -1)
                    {
                        this.UIOpenData.heroIndex = tempIndex;
                    }
                    this.UIOpenData.heroInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
                }
            }

            this.onSwitchHeroInfo(false);
        }

        /** 有英雄删除 */
        protected onRemove_Ack(value: Pb_God.PBG2CPet_Remove_Ack): void
        {
            //从英雄当前队列展示的英雄列表中删除
            let heroDataList = this.UIOpenData.heroDataList;
            if (!heroDataList || heroDataList.length == 0) { return; }
            for (let i = heroDataList.length - 1; i >= 0; i--)
            {
                //已经没有在自己的英雄列表里面了
                if (!PetDataMgr.getPetInfo(heroDataList[i].sn))
                {
                    heroDataList.splice(i, 1);
                    if (i <= this.UIOpenData.heroIndex) { this.UIOpenData.heroIndex--; }
                    this.MaxHeroItemNum--;
                }
            }
        }

        /** 升级时显示升级属性变化提示 */
        private onUpLevel_Ack(value: Pb_God.PBG2CPet_UpLevel_Ack): void
        {
            if (this.UIOpenData.heroInfo == null)
            {
                return;
            }

            if (!this.UIOpenData.heroInfo.sn.equals(value.sn as Long))
            {
                return;
            }

            this.heroItemSelected(false);

            this._isPreShowUpgradeAttr = true; //升级时标记即将显示升级属性显示，  两个消息不同步，真是蛋疼。
            SoundMgr.Inst().playSound("grow");
            //升级特效
            let tmpEffPos = new Laya.Point(this.UIPanel.IconImg.x, this.UIPanel.IconImg.y - 175);
            let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_heroUpgrade", tmpEffPos, null, 1, 1, this.UIPanel, true, ResReleaseType.Reference, true);
            tmpEffNode.scaleY = 1.3;
        }

        /** 进阶返回 */
        private onUpAdvance_Ack(): void
        {
            this.heroItemSelected(false);
        }

        /** 升星返回 */
        private onUpStar_Ack(): void
        {
            this.heroItemSelected(false);
        }

        private _isPreShowUpgradeAttr = false;

        private onPetAttrChange(hero: Net.hero, oldAttr: Pb_God.PBAttrInfo[], newAttr: Pb_God.PBAttrInfo[]): void
        {
            if (this.UIOpenData.heroInfo == null || !hero.sn.equals(this.UIOpenData.heroInfo.sn)) { return; }
            // if (!this._isPreShowUpgradeAttr) { return; }
            this._isPreShowUpgradeAttr = false;

            //先过滤一遍，只记录有变化的
            //[attrType, changeValue][]
            let addAttrList: number[][] = [];
            for (var i = 1; i <= 4; i++)
            {
                let oldValue = Global.getAtterValue(oldAttr, i);
                let newValue = Global.getAtterValue(newAttr, i);
                if (newValue > oldValue)
                {
                    addAttrList.push([i, newValue - oldValue]);
                }
            }
            this.UIPanel.upAttrListUI.show(addAttrList);
        }


        /**
         * 切换英雄按钮
         */
        private onSwitchHeroInfo(animateShapeView: boolean)
        {
            //刷新切换英雄按钮
            this.UIPanel.ArrowItemUI.ArrLeftBtn.visible = this.UIOpenData.heroIndex > 0;
            this.UIPanel.ArrowItemUI.ArrRightBtn.visible = this.UIOpenData.heroIndex < this.MaxHeroItemNum - 1;

            //刷新角色属性
            this.heroItemSelected(animateShapeView);
        }

        //-------------------------------------页签功能切换---------------------------------------
        /** 刷新tab数据 */
        private refreshItemTabData()
        {
            if (this.UIOpenData.heroIndex == -1) { return; }
            let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            let heroReddotModel = PetDataMgr.getPetRedDotModel(tmpPetInfo.sn, true);

            this._lockPageBtns.clear();
            let tmpItemAry = new Array<component.UITabData>();
            let redDotModes = [];
            tmpItemAry.push(new component.UITabData("hero_dev_tab1", "upgrade"));
            redDotModes.push(heroReddotModel.getChildModel("upgrade"));
            let maxStar = cfg.PetCfgData.getMaxStarByPetID(tmpPetInfo.id)
            if (tmpPetInfo.star < maxStar &&
                cfg.PetUpStarCfgData.getInfoWithFun(tmpPetInfo.id, tmpPetInfo.star + 1) != null)
            {
                tmpItemAry.push(new component.UITabData("hero_dev_tab2", "upstar"));
                redDotModes.push(heroReddotModel.getChildModel("upstar"));
            }
            //英雄5星，并且能够升到6星时就显示，天赋
            if (tmpPetInfo.star >= 5 && maxStar > 5)
            {
                tmpItemAry.push(new component.UITabData("hero_dev_tab3", "talent"));
                redDotModes.push(heroReddotModel.getChildModel("talent"));

                let isLock = tmpPetInfo.star < 6;
                this._lockPageBtns.put("talent", isLock);
                this.UIPanel.FunBox.setLockPage("talent", isLock, Global.getLangStr("hero_msg20"));
            }
            if (tmpPetInfo.star >= 6)
            { //6星开启神装按钮，但是9星才能点它
                tmpItemAry.push(new component.UITabData("hero_dev_tab4", "godEquip"));
                redDotModes.push(heroReddotModel.getChildModel("godEquip"));
                let isLock = false;
                let lockTips = ""
                //功能没有开启
                if (tmpPetInfo.star < 9)
                {
                    isLock = true;
                    lockTips = Global.getLangStr("hero_msg19");
                }
                this._lockPageBtns.put("godEquip", isLock);
                this.UIPanel.FunBox.setLockPage("godEquip", isLock, lockTips);
            }

            this.UIPanel.FunBox.setTableData(tmpItemAry);
            this.UIPanel.tabGrp.setRedDotModelList(redDotModes);

        }

        private getCurPetId(): number
        {
            let currentPetID = 0;
            //图鉴查看
            if (this.UIOpenData.isTujian)
            {
                if (this.UIOpenData.heroBookCfgInfo)
                {
                    currentPetID = this.UIOpenData.heroBookCfgInfo.petID;
                } else
                {
                    //获取cfg
                    let tmpPetInfo = this.UIOpenData.heroCfgList[this.UIOpenData.heroIndex];
                    currentPetID = tmpPetInfo.petID;
                }
            }
            else
            {
                //刷新解锁状态
                let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
                currentPetID = tmpPetInfo.id;
            }

            return currentPetID;

        }

        //--------------------------------------刷新宠物列表-------------------------------------------
        /** 切换宠物显示 */
        private heroItemSelected(animateShapeView: boolean)
        {

            //当前角色ID
            let currentPetID = 0;
            let currentPetStar = 0;
            let currentPetPower = 0;
            let skinID = 0;

            //图鉴查看
            if (this.UIOpenData.isTujian)
            {

                //显示等级最高状态属性值
                this.UIPanel.tabGrp.setSelectTab(0);

                if (this.UIOpenData.heroBookCfgInfo)
                {
                    currentPetID = this.UIOpenData.heroBookCfgInfo.petID;
                    currentPetStar = this.UIOpenData.heroBookCfgInfo.star;
                    currentPetPower = this.UIOpenData.heroBookCfgInfo.power;
                } else
                {
                    //获取cfg
                    let tmpPetInfo = this.UIOpenData.heroCfgList[this.UIOpenData.heroIndex];
                    currentPetID = tmpPetInfo.petID;
                    currentPetStar = tmpPetInfo.minStar;
                }
                skinID = cfg.PetCfgData.getSkinInfoByPetID(currentPetID).id;
            }
            else
            {
                //刷新Tab
                this.refreshItemTabData();

                //刷新解锁状态
                let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
                currentPetID = tmpPetInfo.id;
                currentPetStar = tmpPetInfo.star;
                currentPetPower = tmpPetInfo.fightpower;
                skinID = tmpPetInfo.useskinid;

                //锁定防止消耗
                this.UIPanel.LockBtn.onClick(this, () =>
                {
                    this.UIOpenData.heroInfo.islock = !this.UIOpenData.heroInfo.islock;
                    PetSend.lock_Ask(this.UIOpenData.heroInfo.sn, this.UIOpenData.heroInfo.islock);
                });
                this.UIPanel.LockOnImg.visible = this.UIOpenData.heroInfo.islock;
                this.UIPanel.LockOffImg.visible = !this.UIOpenData.heroInfo.islock;

                //装备刷新
                this.refreshEquipUI();

                //符文刷新
                this.refreshRuneUI();

                //魂器刷新
                this.refreshHorcruxUI();

                //分享到聊天
                this.UIPanel.ShareBtn.onClick(this, () =>
                {
                    ShareChatView.showPet(this.UIPanel.ShareBtn, tmpPetInfo);
                });
            }

            this.UIPanel.btnLiberate.visible = currentPetID == CfgID.PetID.HuPa;

            //添加角色动作
            this.refreshHeroShapeView(skinID, animateShapeView);

            //角色类型特效
            this.setPetTypeEffect(cfg.PetCfgData.getPetTypeByPetID(currentPetID));

            //显示基础属性
            Global.setResPetType(this.UIPanel.PetTypeImg, cfg.PetCfgData.getPetTypeByPetID(currentPetID));
            if (GlobalData.isShowDebugInfo)
            {
                var skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
                this.UIPanel.NameLB.text = cfg.PetSkinCfgData.getFileNameById(skinID) + "_" + currentPetID + "_" + skelName;
            } else
            {
                this.UIPanel.NameLB.text = cfg.PetSkinCfgData.getFileNameById(skinID);
            }
            this.UIPanel.NameBox.refresh();
            this.UIPanel.ZhanLb.text = currentPetPower.toString();
            this.UIPanel.starBox.setStar(currentPetStar);

            //查看立绘  2020.10.12屏蔽掉
            this.UIPanel.ShowBtn.visible = false; //cfg.PetSkinCfgData.getHaveVDrawById(tmpPetResID) == 1;
            this.UIPanel.ShowBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroLibraryVDraw, currentPetID), BaseBackUIType.HideBackUI);
            });

            //评论
            this.UIPanel.ChatBtn.onClick(this, () =>
            {
                // if (1)
                // {
                TipsUtils.showTips(Global.getLangStr("ui_HeroComment_msg3"));
                //     return;
                // }
                // UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroComment, [currentPetID, currentPetStar]));
            });

            //分享
            this.UIPanel.ShareBtn.visible = !this.UIOpenData.isTujian;
        }

        /**
         * 点击后随即播放动作 其中没有loop的动作播放完成后 播放standby_loop
         * @param e
         */
        private onSkClick(e: LayaEvent)
        {
            if (this._skeletonPlayer == null)
            {
                return;
            }
            let randomList = ["attack", "run_loop", "skill1", "standby_loop", "win_loop"];
            let random = Math.random() * randomList.length;
            let index;
            for (let i = 0; i <= randomList.length; i++)
            {
                if (random < i)
                {
                    index = i - 1;
                    break;
                }
            }
            let act = randomList[index];
            let needLoop = act.indexOf("loop") != -1;
            this._skeletonPlayer.play(act, needLoop);

        }

        private onSkStop(e: LayaEvent)
        {
            this._skeletonPlayer.play("standby_loop", true);
        }

        /** 刷新形象显示 */
        private refreshHeroShapeView(skinID: number, animateShapeView = true): void
        {
            if (!this._skeletonPlayer)
            {
                this._skeletonPlayer = new SkeletonPlayer();
                //获取资源ID
                let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
                let firstAniAction = cfg.PetSkinCfgData.getFirstActById(skinID);
                this._skeletonPlayer.play(firstAniAction ? firstAniAction : "win_loop", false);
                this._skeletonPlayer.mouseEnabled = false;
                this._skeletonPlayer.mouseThrough = false;
                this._skeletonPlayer.on(LayaEvent.STOPPED, this, this.onSkStop);
                this._skeletonPlayer.pos(70, 0);
                this._skeletonPlayer.load(UrlMgr.getModelSkUrl(skelName));
                this.UIPanel.IconImg.addChild(this._skeletonPlayer);
                this.UIPanel.IconImg.zOrder = 10;
                this.UIPanel.upAttrListUI.zOrder = 11;
            }
            var showScale = cfg.PetSkinCfgData.getShowScaleById(skinID);
            this._skeletonPlayer.scale(showScale, showScale);
            let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
            this._skeletonPlayer.setRes(UrlMgr.getModelSkUrl(skelName));
            this._skelRefreshTimes++;
            //刷新5次回收一下
            if (this._skelRefreshTimes > 5)
            {
                this._skelRefreshTimes = 0;
                SkelAniInit.recyleSpine();
            }
        }

        //-----------------------------------------------装备---------------------------------
        /** 刷新状态 */
        private refreshEquipUI()
        {

            let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            let tmpPetAllSuited = PetDataMgr.isHaveSubPetAllEquipAction(tmpPetInfo);
            this.UIPanel.EquipAutoAllBtn.onClick(this, () =>
            {
                PetSend.autoEquip_Ask(tmpPetInfo.sn, tmpPetAllSuited);
            });
            this.UIPanel.EquipAutoAllLb.visible = tmpPetAllSuited;
            this.UIPanel.EquipAutoAllLbBox.visible = !tmpPetAllSuited;
            this.UIPanel.EquipAutoAllRedDotImg.visible = tmpPetAllSuited;
            //刷新穿戴得装备
            for (let i = 0; i < this.UIPanel.EquipBox.numChildren; i++)
            {
                let tempUI = this.UIPanel.EquipBox.getChildAt(i) as EquipItemUI;
                tempUI.name = i.toString();
                tempUI.onClick(this, this.onEquipItemClick);
                tempUI.setPetWeaponInfo(tmpPetInfo, Pb_God._emEquipType.EquipType_Weapon + i);
            }
        }

        /** 穿/脱装备 */
        private onEquipItemClick(tmpItemUI: EquipItemUI)
        {
            let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            let tempEquipType = Pb_God._emEquipType.EquipType_Weapon + parseInt(tmpItemUI.name);
            let tempEquipInfo = SuitEquipDataMgr.getSuitMgr(tmpPetInfo.sn).getEquip(tempEquipType);
            if (tempEquipInfo == null)
            {
                if (tmpItemUI.RedDotImg.visible)
                {
                    UIManager.Inst.forceOpen(new HeroEquipSuitOpenUIData(tmpPetInfo.sn, tempEquipType, PanelNotify.Open_HeroEquipSuit));
                }
                else
                {
                    TipsUtils.showTipsByLanId("tips_msg29");
                }
            }
            else
            {
                let tempItemInfo = new Pb_God.PBItem();
                tempItemInfo.itemid = tempEquipInfo.itemid;
                UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tempItemInfo, tmpPetInfo.sn, true));
            }
        }

        //-----------------------------------------------符文---------------------------------
        /** 刷新状态 */
        private refreshRuneUI()
        {

            let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            for (let i = 0; i < this.UIPanel.RuneBox.numChildren; i++)
            {
                let tempUI = this.UIPanel.RuneBox.getChildAt(i) as EquipItemUI;
                tempUI.name = i.toString();
                tempUI.NameLb.color = "#5b545b";
                tempUI.NameLb.strokeColor = "#e5e3d2";
                tempUI.onClick(this, this.onRuneItemClick);
                tempUI.setPetRuneInfo(tmpPetInfo, Pb_God._emPosType.PosType_1 + i);
            }
        }

        /** 穿/脱装备 */
        private onRuneItemClick(tmpItemUI: EquipItemUI)
        {
            let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            let tempEquipType = Pb_God._emPosType.PosType_1 + parseInt(tmpItemUI.name);
            let tempEquipInfo = SuitEquipDataMgr.getSuitMgr(tmpPetInfo.sn).getRune(tempEquipType);
            let tempItemInfo = tempEquipInfo ? ItemDataMgr.getUsesPBItem(tempEquipInfo.itemsn as Long) : null;
            if (tempItemInfo)
            {
                UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tempItemInfo, tmpPetInfo.sn, true));
            } else
            {
                if (tmpItemUI.RedDotImg.visible)
                {
                    UIManager.Inst.forceOpen(new HeroEquipSuitOpenUIData(tmpPetInfo.sn, tempEquipType, PanelNotify.Open_HeroEquipSuitRune));
                }
                else
                {
                    TipsUtils.showTipsByLanId("tips_msg29");
                }
            }
        }

        //-----------------------------------------------魂器---------------------------------
        private refreshHorcruxUI(): void
        {
            let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            if (cfg.PetCfgData.getMinStarByPetID(tmpPetInfo.id) < cfg.HorcruxConstCfgData.getFirstInfo().minBeginStar) { this.UIPanel.Horcrux.visible = false }
            else { this.UIPanel.Horcrux.visible = true }
            let horcruxInfo: cfg.HorcruxCfgInfo = cfg.HorcruxCfgData.getHorcruxInfoByPetId(tmpPetInfo.id);
            let horcruxState = PetDataMgr.getHasHorcruxState(tmpPetInfo)
            // 魂器状态----------- 0:敬请期待  1:有锁（图标置灰） 2:有锁（图标正常）  3:正常显示
            this.UIPanel.Horcrux.IconImg.visible = horcruxState != 0;
            this.UIPanel.Horcrux.lock.visible = horcruxState == 1 || horcruxState == 2;
            this.UIPanel.Horcrux.hope.visible = horcruxState == 0;
            this.UIPanel.Horcrux.IconImg.gray = horcruxState == 1;
            this.UIPanel.Horcrux.LvImg.visible = horcruxState == 3;
            this.UIPanel.Horcrux.gray = !horcruxInfo;
            this.UIPanel.Horcrux.IconImg.skin = horcruxInfo ? UrlMgr.getHorcruxUrl(horcruxInfo.icon) : "";
            this.UIPanel.Horcrux.LvLb.text = tmpPetInfo.horcrux.level + "";
            this.UIPanel.Horcrux.lock.skin = "res/herodetail/suo.png";

            if (tmpPetInfo.star >= cfg.HorcruxConstCfgData.getFirstInfo().awakeStar && horcruxState != 0)
            {
                this.UIPanel.Horcrux.lock.skin = "";
                if (!this.UIPanel.Horcrux.getChildByName("suoAni"))
                {
                    let sk: SkeletonPlayer = new SkeletonPlayer();
                    Laya.Tween.to(sk, { alpha: 1 }, 400);
                    sk.pos(this.UIPanel.Horcrux.width / 2, this.UIPanel.Horcrux.height / 2);
                    let skinSuo = "texiao/xiedaiwusuo/xiedaiwusuo";
                    sk.name = "suoAni";
                    sk.load(UrlMgr.getSpineSceneUrl(skinSuo));
                    this.UIPanel.Horcrux.addChild(sk);
                    sk.play(!this.UIPanel.Horcrux.lock.visible ? "idle2" : "idle", true)
                }
                else
                {
                    let sk = this.UIPanel.Horcrux.getChildByName("suoAni") as SkeletonPlayer;
                    sk.play(!this.UIPanel.Horcrux.lock.visible ? "idle2" : "idle", true)
                }
            }
            else
            {
                if (this.UIPanel.Horcrux.getChildByName("suoAni"))
                {
                    let sk = this.UIPanel.Horcrux.getChildByName("suoAni") as SkeletonPlayer;
                    sk.offAll();
                    sk.removeSelf();
                }
            }
        }

        /** 魂器觉醒 */
        protected onHorcrux_Awake(value: Pb_God.PBG2CHorcruxAwake): void
        {
            this.refreshHorcruxUI();
        }

        //------------------------------------Event------------------------------------------
        protected onSynFightPower(petsn: Long, oldFightpower: number, newFightpower: number): void
        {
            if (!this.UIOpenData.heroDataList) { return; }
            if (oldFightpower >= newFightpower) { return; }
            let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            if (!tmpPetInfo) { return; }
            if (!petsn.equals(tmpPetInfo.sn)) { return; }
            if (tmpPetInfo.onMainLineStore) { return; }

            //进化界面时不显示战斗提升
            let ui: EvolutionEffectUpViewMediator = UIManager.Inst.getUIMeditorInOpenList(PanelNotify.Open_EvolutionEffectUpView) as EvolutionEffectUpViewMediator;
            if (ui)
            {
                ui.oldFightpower = oldFightpower;
                ui.newFightpower = newFightpower;


                return;
            }

            //如果这个英雄没有在主线上阵，则需要单独提示一次战斗力变更
            EffectMgr.Inst.showUI_FightPowerUp(oldFightpower, newFightpower - oldFightpower);
        }

        private Pet_Changed()
        {
            if (this.UIOpenData.isTujian)
            { return; }
            let tmpPetInfo = this.UIOpenData.heroDataList[this.UIOpenData.heroIndex];
            if (tmpPetInfo)
            {
                Laya.timer.callLater(this, this.refreshUI);
            }
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.HeroUpgrade_7_3 || step == GuideStep.HeroUpgrade_7_4
                || step == GuideStep.HeroStrength_14_5 || step == GuideStep.HeroStrength_14_6 || step == GuideStep.Func_Fail_3)
            {
                Laya.timer.once(100, this, () =>
                {
                    let tmpTabel = this.UIPanel.FunBox.getTableView("upgrade") as HeroDetailUpgradeTabel
                    GuideMgr.Inst.showFinger(tmpTabel.UpgradeBtn, true, tmpTabel.UpgradeBtn);
                });
            } else if (step == GuideStep.Func_7DayActUpPet_4)
            {
                Laya.timer.once(100, this, () =>
                {
                    let tmpTabel = this.UIPanel.FunBox.getTableView("upgrade") as HeroDetailUpgradeTabel
                    if (tmpTabel.UpgradeBtn.visible)
                    { GuideMgr.Inst.showFinger(tmpTabel.UpgradeBtn, true, tmpTabel.UpgradeBtn, 1); }
                    else
                    { GuideMgr.Inst.nextActive(); }
                });
            }
            else if (step == GuideStep.Func_7DayActUpPet_5)
            {
                let tmpTabel = this.UIPanel.FunBox.getTableView("upgrade") as HeroDetailUpgradeTabel
                if (tmpTabel.UpAdvanceBtn.visible && this.UIOpenData.heroInfo && this.UIOpenData.heroInfo.advance == 0)   //当前英雄没有进阶过才引导进阶
                { GuideMgr.Inst.showFinger(tmpTabel.UpAdvanceBtn, true, tmpTabel.UpAdvanceBtn); }
                else
                { GuideMgr.Inst.jumpActive(GuideStep.Func_7DayActUpPet_9); }
            }
            else if (step == GuideStep.HeroUpgrade_7_5)
            {
                GuideMgr.Inst.showFinger(this.UIPanel.EquipAutoAllBtn, true, this.UIPanel.EquipAutoAllBtn);
            }
            else if (step == GuideStep.Func_HeroUpStar_1)
            { //引导升星分页
                Laya.timer.once(100, this, () =>
                {
                    let tabBtn = this.UIPanel.tabGrp.getCell(1) as component.UIButton;
                    GuideMgr.Inst.showFinger(tabBtn, true, tabBtn);
                });
            }
            else if (step == GuideStep.Func_HeroUpStar_2)
            {
                Laya.timer.once(100, this, () =>
                {
                    let tabView = this.UIPanel.FunBox.getTableView("upstar") as HeroDetailUpStarTabel;
                    let norItemUI = tabView.UpStarInfo.getChildAt(1) as NorItemUI;
                    GuideMgr.Inst.showFinger(norItemUI, true, new component.UIButton); //只需要引导，不需要回调
                });
            }
            else if (step == GuideStep.Func_HeroUpStar_3)
            {
                let tabView = this.UIPanel.FunBox.getTableView("upstar") as HeroDetailUpStarTabel;
                let norItemUI = tabView.UpStarInfo.getChildAt(2) as NorItemUI;
                GuideMgr.Inst.showFinger(norItemUI, true, new component.UIButton); //只需要引导，不需要回调
            }
            else if (step == GuideStep.Func_HeroUpStar_4)
            { //引导重生按钮
                let guidebtn = this.UIPanel.btnStarRebirth;
                if (guidebtn.visible)
                { GuideMgr.Inst.showFinger(guidebtn, true, guidebtn); }
                else
                { GuideMgr.Inst.nextActive(); }
            }

        }

        // /**
        //  * 操作本步引导
        //  */
        // public Guide_Active(step: GuideStep) {
        //     if (step == GuideStep.HeroUpgrade_7_3 || step == GuideStep.HeroUpgrade_7_4
        //         || step == GuideStep.HeroStrength_14_4 || step == GuideStep.HeroStrength_14_5) {
        //         let tmpTabel = this.UIPanel.FunBox.getTableView("upgrade") as HeroDetailUpgradeTabel
        //         tmpTabel.UpgradeBtn.activeEvent();
        //         GuideMgr.Inst.nextActive();
        //     }
        //     else if (step == GuideStep.HeroUpgrade_7_5) {
        //         this.UIPanel.EquipAutoAllBtn.activeEvent();
        //         GuideMgr.Inst.nextActive();
        //     }
        // }
    }
}