module Pro
{
    export class ZhuChengMapInfo extends ProUI.Scene.City.Utils.ZhuchengMapInfoUI
    {

        private _guideBtnRoationDic: ds.StringMap<number>;
        private _isMapMove: boolean = false;

        private _mapDrag: MapDrag;

        private _bound: Laya.Rectangle;

        constructor()
        {
            super();
            this._guideBtnRoationDic = new ds.StringMap<number>();
            this.on(Laya.Event.DISPLAY, this, () =>
            {
                this.controllEvents(false);
                this.refresh_Battle_Statue_Refresh();
            });
            this.init();
            //地图层控制
            this.initMapInfo();
        }

        //---------------------------------------Event------------------------------------
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            Global.EventsNotifyControl(this.listensEvents(), isOff);
            if (!isOff)
            {
                this.on(Laya.Event.UNDISPLAY, this, this.controllEvents);
            }
            else
            {
                this.unInitRedDotModel();
                let fightEffKeys = this._fightEffMap.getKeys();
                for (let key of fightEffKeys)
                {
                    let sk = this._fightEffMap.get(key);
                    sk.offAll();
                    sk.removeSelf();
                    sk = null;
                    // effNode.removeSelf();
                    // EffectMgr.Inst.releaseEffect(effNode);
                }
                this._fightEffMap.clear();
            }
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
                EventNotify.System_Switch_Open_Update, this, this.refreshSystemOpenState,
                EventNotify.Battle_Statue_Refresh, this, this.refresh_Battle_Statue_Refresh,
                EventNotify.Question_Change, this, this.checkQuestion
            ]
        }

        /** 初始化 */
        public init()
        {
            this.bindSystemSwitch2Btn();

            this.AcrossSpaceBtn.visible = false;
            this._mapDrag = new MapDrag();
            this._bound = new Laya.Rectangle(-this.bg.width + Laya.stage.width, -this.bg.height + GameConfig.WinHeight, this.bg.width - Laya.stage.width, 0);
            this._mapDrag.start(this.bg, this._bound, true, 0, 300, null, true);
            this._mapDrag.stop();

            // this.putGuideBtnRoationDic(this.CallBtn, 0.15);
            // this.putGuideBtnRoationDic(this.SecretShopBtn, -0.76);
            // this.putGuideBtnRoationDic(this.ArenaBtn, -0.25);
            // this.putGuideBtnRoationDic(this.StarTowerBtn, -0.85);
            // this.putGuideBtnRoationDic(this.SecretTravelBtn, 0.84);
            // this.putGuideBtnRoationDic(this.EquipCombinBtn, 0.29);
            this.initSkeletons();
            /**
             *  ios屏蔽春节骨骼动画
             */
            if (!SystemUtils.isIos())
            {
                //春节已过不在显示
                // this.initSpringFestivalSkeletons();
            }
        }

        private initSkeletons()
        {
            let sks = ["zjm_zdpp", "zjm_xbb", "zjm_pqlz", "zjm_pkq", "zjm_kdy", "zjm_fdpp", "zjm_mmx"];
            let acts = ["effect", "effect1_loop", "effect_loop"];
            for (let i = 0; i < sks.length; i++)
            {
                let skPath = UrlMgr.getSpineSceneUrl("mengchong/" + sks[i] + "/" + sks[i]);
                let sk = new SkeletonPlayer();
                (this[sks[i]] as Sprite).addChild(sk);

                var isLoop = !SystemUtils.isIos();
                sk.play("effect_loop", isLoop);
                if (isLoop)
                {
                    sk.on(Laya.Event.STOPPED, this, () =>
                    {
                        sk.play("effect_loop", isLoop);
                    });
                } else
                {
                    sk.play("effect_loop", isLoop);
                }
                sk.on(Laya.Event.CLICK, this, () =>
                {
                    let random = Global.getRandomNum(0, acts.length);
                    if (SystemUtils.isIos())
                    {
                        sk.play(acts[random], false);
                    } else
                    {
                        sk.play(acts[random], random != 0);
                    }
                })
                sk.load(skPath);

                //动画表现
                if (sks[i] == "zjm_pqlz")
                {
                    //小松鼠会【快速】的跳到车那边挡住，5秒后【快速】返回
                    sk.on(Laya.Event.CLICK, this, () =>
                    {
                        if (sk["__isMoving__"])
                        { return; }
                        sk["__isMoving__"] = true;
                        let startX = sk.x;
                        let startY = sk.y;
                        this.skJump(sk, [{ x: startX - 25, y: startY - 100 }, { x: startX - 50, y: startY }], 500, Laya.Handler.create(this, () =>
                        {
                            this.skJump(sk, [{ x: startX - 75, y: startY - 100 }, { x: startX - 100, y: startY }], 350, Laya.Handler.create(this, () =>
                            {
                                Laya.timer.once(5000, this, () =>
                                {
                                    this.skJump(sk, [{ x: startX - 75, y: startY - 100 }, { x: startX - 50, y: startY }], 500, Laya.Handler.create(this, () =>
                                    {
                                        this.skJump(sk, [{ x: startX - 25, y: startY - 100 }, { x: startX, y: startY }], 350, Laya.Handler.create(this, () =>
                                        {
                                            sk["__isMoving__"] = false;
                                        }))
                                    }))
                                })

                            }))
                        }))
                    })
                }
                else if (sks[i] == "zjm_pkq")
                {
                    //皮卡丘飘到正左方一点，不回，点击才会返回，变速
                    sk.on(Laya.Event.CLICK, this, () =>
                    {
                        if (sk["__isMoving__"])
                        { return; }
                        sk["__isMoving__"] = true;
                        let startX = sk.x;
                        let startY = sk.y;
                        if (sk["__canBack__"])
                        {
                            Laya.Tween.to(sk, { x: startX + 100, y: startY - 15 }, 1000, Laya.Ease.cubicOut, Laya.Handler.create(this, () =>
                            {
                                sk["__canBack__"] = false;
                                sk["__isMoving__"] = false;
                            }))
                            return
                        }
                        sk["__canBack__"] = false;
                        Laya.Tween.to(sk, { x: startX - 100, y: startY + 15 }, 1000, Laya.Ease.quadIn, Laya.Handler.create(this, () =>
                        {
                            sk["__canBack__"] = true;
                            sk["__isMoving__"] = false;
                        }))
                    })
                }
                else if (sks[i] == "zjm_mmx")
                {
                    //点击小鸟飘到梦幻抽卡上面，不回，点击才会返回，变速
                    sk.on(Laya.Event.CLICK, this, () =>
                    {
                        if (sk["__isMoving__"])
                        { return; }
                        sk["__isMoving__"] = true;
                        let startX = sk.x;
                        let startY = sk.y;
                        if (sk["__canBack__"])
                        {
                            Laya.Tween.to(sk, { x: startX - 30, y: startY + 250 }, 1000, Laya.Ease.cubicOut, Laya.Handler.create(this, () =>
                            {
                                sk["__canBack__"] = false;
                                sk["__isMoving__"] = false;
                            }))
                            return
                        }
                        sk["__canBack__"] = false;
                        Laya.Tween.to(sk, { x: startX + 30, y: startY - 250 }, 1000, Laya.Ease.quadIn, Laya.Handler.create(this, () =>
                        {
                            sk["__canBack__"] = true;
                            sk["__isMoving__"] = false;
                        }))
                    })
                }
            }

        }

        private skJump(target, props, duration, complete)
        {
            let pos1 = props[0];
            let pos2 = props[1];
            Laya.Tween.to(target, { x: pos1.x, y: pos1.y }, duration, Laya.Ease.cubicOut, Laya.Handler.create(this, () =>
            {
                Laya.Tween.to(target, { x: pos2.x, y: pos2.y }, duration, Laya.Ease.quadIn, Laya.Handler.create(this, () =>
                {
                    complete.run();
                }))
            }))
        }

        //春节骨骼动画
        private initSpringFestivalSkeletons()
        {
            let sks = [["chunjie_gonghexinchun", "932", "660"], ["chunjie_gongxifacai", "475", "698"], ["chunjie_jixiangruyi", "1632", "805"],
            ["chunjie_shizitou", "952", "1065"]];
            for (let i = 0; i < sks.length; i++)
            {
                let skPath = UrlMgr.getSpineSceneUrl("chun_jie/" + sks[i][0] + "/" + sks[i][0]);
                let sk = new SkeletonPlayer();
                this.bg.addChildAt(sk, 0);
                sk.playByIndex(0, true);
                sk.load(skPath);
                sk.pos(parseInt(sks[i][1]), parseInt(sks[i][2]));
            }
        }

        private putGuideBtnRoationDic(btn: component.UIButton, rotation: number): void
        {
            btn.onClick(this, this.onClickBtn);
            this._guideBtnRoationDic.put(btn.name, rotation);
        }

        private onClickBtn(btn: component.UIButton): void
        {
            this.openUI(btn.name);
            btn.off(Laya.Event.CLICK, this, this.onClickBtn);
        }

        public refreshUI()
        {
            this.initRedDotModel();
            this.refreshSystemOpenState(-1);
            this.checkQuestion();
        }

        public leaveScene(): void
        {
        }

        private _fightEffMap = new ds.StringMap<SkeletonPlayer>();
        /** 战斗状态切换 */
        private refresh_Battle_Statue_Refresh()
        {
            this.refreshSingleFightState(this.ArenaBtn, Pb_God._emBattleType.BattleType_Challenge);
            this.refreshSingleFightState(this.StarTowerBtn, Pb_God._emBattleType.BattleType_Tower);
            this.refreshSingleFightState(this.StarTowerAdvBtn, Pb_God._emBattleType.BattleType_Tower2);
        }

        private refreshSingleFightState(parentBtn: Laya.UIComponent, battleType: Pb_God._emBattleType): void
        {
            if (!parentBtn) { return; }
            var isInBattle = BattleMgr.Inst.getBatPlaceMgr(battleType) != null;
            let fightEff = this._fightEffMap.get(battleType);
            if (fightEff != null)
            {
                fightEff.visible = isInBattle;
            }
            else if (isInBattle)
            {
                let tmpEffPos = new Laya.Point(parentBtn.x, parentBtn.y - 50);
                // let node = EffectMgr.Inst.createLoopEffect("ui_shilianta_fight", tmpEffPos, -1, 1, 1, parentBtn.parent as Laya.Sprite, ResReleaseType.Reference);
                let node = new SkeletonPlayer();
                node.pos(tmpEffPos.x, tmpEffPos.y);
                node.load(UrlMgr.getSpineSceneUrl("zhuchangjing/shilianta/shilianta"));
                node.play("effect_loop", true);
                parentBtn.parent.addChild(node);
                this._fightEffMap.put(battleType, node);
            }
        }

        private getBtnSkinByOpenState(skin: string, isOpen: boolean)
        {
            if (!skin)
            { return ""; }
            if (isOpen)
            {
                return skin.replace("01", "");
            }
            if (skin.indexOf("01") >= 0)
            { return skin; }
            return skin.replace(".png", "01.png");
        }

        //-----------------------------------功能开放------------------------------------
        private _systemId2BtnMap: ds.StringMap<component.UIButton>;
        private _btnNameMapToSystemId: ds.StringMap<Pro.emSystemSwitchType>;
        /** 功能开关关联刷新方法（用于一些较复杂的按钮入口判断，比如首充入口，会有开关和活动相关的数据影响按钮出现） */
        private refreshSystemOpenState(systemId: number = -1): void
        {
            if (systemId == -1)
            {   //refreshALL
                let keys = this._systemId2BtnMap.getKeys();
                for (var key of keys)
                {
                    var elBtn = this._systemId2BtnMap.get(key);
                    let isOpen = PlayerDataMgr.checkSystemSwitchOpen(parseInt(key));
                    elBtn.skin = this.getBtnSkinByOpenState(elBtn.skin, isOpen);
                    let is_showIcon = cfg.SystemSwitchSystemSwitchCfgData.getShowIconByID(parseInt(key)) == 1;
                    elBtn.visible = !isOpen ? is_showIcon : true;

                    //只是一个冠军赛入口，前端直接用竞技场按钮的逻辑
                    if (key == "7")
                    {
                        this.ChampionshipsBtn.skin = this.getBtnSkinByOpenState(this.ChampionshipsBtn.skin, isOpen);
                        this.ChampionshipsBtn.visible = elBtn.visible;
                    }

                }
            } else
            {
                let btn = this._systemId2BtnMap.get(systemId);
                if (btn)
                {
                    let isOpen = PlayerDataMgr.checkSystemSwitchOpen(systemId);
                    btn.skin = this.getBtnSkinByOpenState(btn.skin, isOpen);
                    let is_showIcon = cfg.SystemSwitchSystemSwitchCfgData.getShowIconByID(parseInt(key)) == 1;
                    btn.visible = !isOpen ? is_showIcon : true;
                }
            }
            this.onExCxPayStatUPdate();
        }

        /** 将主城按钮与系统功能id关联起来 */
        private bindSystemSwitch2Btn(): void
        {
            this._systemId2BtnMap = new ds.StringMap<component.UIButton>();
            this._btnNameMapToSystemId = new ds.StringMap<Pro.emSystemSwitchType>();

            this.__bindSystemSwitch2Btn(this.SecretTravelBtn, Pro.emSystemSwitchType.Risk);
            this.__bindSystemSwitch2Btn(this.AcrossBatBtn, Pro.emSystemSwitchType.CrossWar);
            this.__bindSystemSwitch2Btn(this.StarTowerBtn, Pro.emSystemSwitchType.StarTower);
            this.__bindSystemSwitch2Btn(this.StarTowerAdvBtn, Pro.emSystemSwitchType.StarTower2);
            this.__bindSystemSwitch2Btn(this.ArenaBtn, Pro.emSystemSwitchType.Challenge);
            this.__bindSystemSwitch2Btn(this.PetSplitBtn, Pro.emSystemSwitchType.Sacrifice);
            this.__bindSystemSwitch2Btn(this.PetExchangeBtn, Pro.emSystemSwitchType.Seer);
            this.__bindSystemSwitch2Btn(this.PetLibBtn, Pro.emSystemSwitchType.Library);
            // this.__bindSystemSwitch2Btn(this.AcrossSpaceBtn, Pro.emSystemSwitchType.AcrossSpace);
            this.__bindSystemSwitch2Btn(this.PetCombinBtn, Pro.emSystemSwitchType.PetCombin);
            this.__bindSystemSwitch2Btn(this.ShopBtn, Pro.emSystemSwitchType.Shop);
            this.__bindSystemSwitch2Btn(this.SecretShopBtn, Pro.emSystemSwitchType.SpriteShop);
            this.__bindSystemSwitch2Btn(this.CallBtn, Pro.emSystemSwitchType.HeroCall);
            this.__bindSystemSwitch2Btn(this.EquipCombinBtn, Pro.emSystemSwitchType.EquipCombin);
            this.__bindSystemSwitch2Btn(this.QuestionnaireBtn, Pro.emSystemSwitchType.Question);
            this.__bindSystemSwitch2Btn(this.IllustrationBtn, Pro.emSystemSwitchType.Illustration);
            this.__bindSystemSwitch2Btn(this.ResonanceBtn, Pro.emSystemSwitchType.Resonance);
            this.__bindSystemSwitch2Btn(this.EggHatchBtn, Pro.emSystemSwitchType.EggHatch);
        }
        private __bindSystemSwitch2Btn(btn: component.UIButton, systemId: Pro.emSystemSwitchType): void
        {
            this._systemId2BtnMap.put(systemId, btn);
            // btn["bindSystemId"] = systemId;
            this._btnNameMapToSystemId.put(btn.name, systemId);
        }

        /** 检查功能开放 */
        private checkSystemOpenState(btnName: string): boolean
        {
            //只是一个冠军赛入口，直接用竞技场的逻辑
            if (btnName == "ChampionshipsBtn") { btnName = "ArenaBtn"; }
            let systemId: number = this._btnNameMapToSystemId.get(btnName);// btn["bindSystemId"];
            if (!systemId) { return true; }
            return PlayerDataMgr.checkSystemSwitchOpen(systemId, true, false);
        }

        //-----------------------------------红点------------------------------------
        private _reddotBindCtl: ReddotBindImageController = new ReddotBindImageController();
        /** 将红点图片与红点数据模型关联 */
        private initRedDotModel(): void
        {
            this.unInitRedDotModel();

            this._reddotBindCtl.bind(this.CallRedDotImg, CallDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.reddotPetExchange, CallDataMgr.reddotModelExchange);
            this._reddotBindCtl.bind(this.PetCombinRedDotImg, PetDataMgr.combinReddotModel);
            this._reddotBindCtl.bindList(this.AreaRedDotImg, ChampionDataMgr.reddotModel, ChallengeDataMgr.reddotModel);

            //跨服战场红点
            this._reddotBindCtl.bindList(this.AcrossBatRedImg, LadderDataMgr.reddotModel, DanDataMgr.reddotModel, CrossChallengeDataMgr.redDotModel);
            //秘境红点(秘境是集合冒险玩法)
            this._reddotBindCtl.bindList(this.SecretTravelRedDotImg, RiskDataMgr.reddotModel, ElementDataMgr.reddotModel);
            // 熔炼屋红点
            this._reddotBindCtl.bindList(this.Reddot_Combine, ItemDataMgr.reddotModelRuneCombine, ItemDataMgr.reddotModelEquipCombine);
            //试炼塔 两个
            this._reddotBindCtl.bind(this.Reddot_starTower, TrainDataMgr.reddotModelTower.getChildModel(1));
            this._reddotBindCtl.bind(this.reddotStarTowerAdv, TrainDataMgr.reddotModelTower.getChildModel(2));

            this._reddotBindCtl.bind(this.IllustrationRedDotImg, IllustrationDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.EggHatchRedDotImg, IncubateEggDataMgr.reddotModel);

            //打造台主城红点在金币不足1000000时不显示，不影响里面的红点
            if (Global.getItemNum(1) < 1000000)
            { this.Reddot_Combine.visible = false; }

        }

        /** 问卷调查 */
        private checkQuestion()
        {
            let isSysOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Question);
            this.QuestionnaireBtn.visible = isSysOpen &&
                !(TimeController.currTimer - TimeController.worldCreateZeroTime > cfg.CommonSurveyConstantsCfgData.getFirstInfo().openDays * 24 * 3600 * 1000) &&
                PlayerDataMgr.questionIndex < cfg.QuestionCfgData.getAll().length;
        }

        private unInitRedDotModel(): void
        {
            this._reddotBindCtl.cleanUp();
        }

        /** 保存鼠标按下时所在屏幕中的位置 */
        private _lastMouseX = 0;

        private initMapInfo()
        {
            this.on(Laya.Event.MOUSE_DOWN, this, this.onMapInfoDown);
            this.bg.mouseEnabled = true;
            this.bg.mouseThrough = true;
            this.bg.on(Laya.Event.CLICK, this, this.onMapClick)
        }

        private _guideBtn: component.UIButton;
        private guideFingerBtnCall(): void
        {
            let btn = this._guideBtn
            if (btn)
            {
                Laya.timer.once(100, this, () =>
                {
                    btn.onClick(this, this.onClickBtn);
                    GuideMgr.Inst.showFinger(btn, true, btn);
                })
            }
            this._guideBtn = null;
        }

        private guideTargetRoation: number = 0;
        /** 引导按钮 */
        public guideBtn(btn: component.UIButton): void
        {
            this._guideBtn = btn;
            this.guideTargetRoation = this._guideBtnRoationDic.get(btn.name);
            this.updateRoationToGuide();
        }
        updateRoationToGuide()
        {
            if (!this._guideBtn)
            { return; }
            let bg = this.bg;
            let btn = this._guideBtn;
            let cx: number = (Laya.stage.width - 0) / 2;
            let cy: number = (Laya.stage.height - 0) / 2;
            let centerPos: Laya.Point = new Laya.Point(cx, cy);
            let wp = (btn.parent as any).localToGlobal(new Laya.Point(btn.x, btn.y));
            let x: number = bg.x + centerPos.x - wp.x;
            let y: number = bg.y + centerPos.y - wp.y;
            bg.pos(x, -this.bg.height + GameConfig.WinHeight);
            this.guideFingerBtnCall();
        }

        public update()
        {

        }

        private onMapInfoDown(event: any)
        {
            this._mapDrag.stop();
            this._mapDrag.start(this.bg, this._bound, true, 0, 300, null, true);
        }

        private onMapClick(e)
        {
            var targetName: string = e.target.name;
            this.openUI(targetName);
        }

        private openUI(targetName: string)
        {
            if (targetName != "")
            {
                targetName = targetName.split("_")[0];
                if (!this.checkSystemOpenState(targetName))
                {
                    return;
                }
                if (targetName == "ShopBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop));
                }
                else if (targetName == "SecretShopBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_SpriteShop));
                }
                else if (targetName == "SecretTravelBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_SecretTravel));
                }
                else if (targetName == "AcrossBatBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_AcrossWar));
                }
                else if (targetName == "AcrossSpaceBtn")
                {

                }
                else if (targetName == "EquipCombinBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombin));
                }
                else if (targetName == "ArenaBtn")
                {
                    //竞技场按钮打开规则： 冠军赛开启时，打开冠军赛入口，否则打开竞技挑战界面
                    var isOpenChampion = ChampionDataMgr.isOpening;
                    if (GuideMgr.Inst.getInAllShowGuide() || !isOpenChampion)
                    {
                        var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Challenge);
                        if (!isInBattle)
                        {
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Challenge));
                        }
                    } else
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ArenaEnter, 1));
                    }
                }
                else if (targetName == "ChampionshipsBtn")
                {

                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ArenaEnter, 1));

                }
                else if (targetName == "StarTowerBtn")
                {
                    let isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Tower);
                    if (!isInBattle)
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StarTowerMain));
                    }
                }
                else if (targetName == "StarTowerAdvBtn")
                {
                    let isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Tower2);
                    if (!isInBattle)
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StarTowerMainAdv));
                    }
                }
                else if (targetName == "CallBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCall));
                }
                else if (targetName == "PetCombinBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCombin));
                }
                else if (targetName == "PetSplitBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroSplit));
                }
                else if (targetName == "PetExchangeBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroExchange));
                }
                else if (targetName == "PetLibBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroLibrary));
                }
                else if (targetName == "QuestionnaireBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Question));
                }
                else if (targetName == "IllustrationBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroIllustration));
                }
                else if (targetName == "ResonanceBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroResonance));
                } else if (targetName == "EggHatchBtn")
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EggHatchMain));
                }

            }
        }


        onExCxPayStatUPdate()
        {
            if (PlatformData.platformType != PlatformData.EnumPlatformType.wx_cx)
            {
                return;
            }
            // this.SecretShopBtn.visible = qingjs.instance.canPay();
            this.ShopBtn.visible = qingjs.instance.canPay();
        }
    }
}