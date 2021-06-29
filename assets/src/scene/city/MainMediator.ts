
module Pro
{
    /**
     * 主界面
     */
    export class MainMediator extends BaseMediator implements IMediator
    {

        /** UI面板 */
        public UIPanel: ProUI.Scene.City.MainUI;

        /** 主城管理 */
        private zhuchengUI: ZhuCheng;
        /** 挂机分页视图 */
        public hookLayer: HookLayer;

        /**记录主城关闭的时间点 */
        private _zhuchengCloseTime: number;

        /**主城销毁间隔 */
        private _zhuchengDestroyTime = 20000;

        /**引导指引关卡按钮的时间 */
        private _guideHookBtnTime = 30000;
        /**引导指引关卡按钮的时间点 */
        private _guideHookBtnCloseTime: number;

        private _helpSpriteStartX: number = 10;
        private _helpSpriteEndX: number = 500;
        private _helpSpriteCurrentX: number = 0;
        //动画反方向移动
        private _reversedBol: boolean = false;
        private _helpSpriteMoveBol: boolean = false;

        /**上一条气泡 */
        private _lastPop: ProUI.Utils.OuTipsUI;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null; //不要在这里放东西，这里的加载内容全部放到config.json内，保证在大loading时加载， 否则在进入主城后再加载这个内容，会导致界面黑屏的。
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Scene.City.MainUI, 0, BaseAddLayer.BaseUI, false, 0, 0, 0, false); //GameConfig.curWidth(), GameConfig.curHeight()
            this.UIPanel.GMBtn.visible = false;// !GlobalData.isRelease || GlobalData.testServerTag;  //调试环境或外网测试服环境
            this.adjustScreenPos();
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.stopLoopFrame();
            Laya.timer.clearAll(this);
            this.closePanel(0, true, true);
            this.zhuchengUI = null;
            this.hookLayer = null;
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            // //适配遮罩板
            // GameConfig.WinCenterY > 0 && (this.UIPanel.PlayerInfo.blankImg.height = this.UIPanel.FunInfo.blankImg.height = GameConfig.WinCenterY / 2);
            // this.UIPanel.PlayerInfo.blankImg.visible = this.UIPanel.PlayerInfo.blankImg.visible = GameConfig.WinCenterY > 0;

            //需要将聊天放到功能操作UI之上
            LayerManager.Inst.topUILayer.addChild(this.UIPanel.ChatLayer);
            //需要将玩家属性和底板放到功能操作UI之上
            LayerManager.Inst.topUILayer.addChild(this.UIPanel.PlayerInfo);
            LayerManager.Inst.topUILayer.addChild(this.UIPanel.FunInfo);

            //聊天按钮第一次适配到边界
            this.UIPanel.ChatBtn.x = this.UIPanel.ChatLayer.width;
            this.UIPanel.GMBtn.x = this.UIPanel.ChatLayer.width;

            //在线礼包按钮的位置，影响了神器进度的位置（本来是可以用vbox排版的，但是在线礼包的按钮在战斗中也需要显示，所以抽离出来了）
            this.UIPanel.OnlinePrizeBtnInfo.on(Laya.Event.CHANGE, this, (isShow: boolean) =>
            {
                if (this.hookLayer)
                {
                    this.hookLayer.resetAritfactInfoPosY(isShow ? 127 : 0);
                }
            });
        }

        /**
         *  继承BaseMediator的都会居中显示 这里归位
         */
        private adjustScreenPos()
        {
            this.UIPanel.height = GameConfig.curHeight();
            this.UIPanel.y = 0;
            this.UIPanel.BaseBattleLayer.y += GameConfig.getBangsTop();
            this.UIPanel.BaseBattleCityLayer.y += GameConfig.getBangsTop();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.ReciverLoginData, this, this.ReciverLoginData);
            this.addEventMgr(EventNotify.Zhucheng_Hook_Visible_Changed, this, this.Zhucheng_Hook_Visible_Changed);
            this.addEventMgr(EventNotify.RedDot_Chat_Changed, this, this.refreshChatRedDot);
            this.addEventMgr(EventNotify.UI_Show_Change, this, this.onChangeFullUIShow);
            this.addEventMgr(EventNotify.show_gm, this, this.onshowGM)
            this.addEventMgr(EventNotify.Show_Hero_Call_Share_Pop, this, this.showHeroCallSharePop);
            this.addEventMgr(EventNotify.test_hide_ui, this, this.testHideUI);
        }

        testHideUI()
        {
            // this.UIPanel.removeChildren();
            // this.UIPanel.addChild(this.hookLayer);
            if (this.hookLayer)
            {
                this.hookLayer.testHideUI();
            }
            common.DisplayUtils.removeFromParent(this.UIPanel.BaseBattleLayer);
            common.DisplayUtils.removeFromParent(this.UIPanel.OnlinePrizeBtnInfo);
            common.DisplayUtils.removeFromParent(this.UIPanel.BaseBattleCityLayer);
            common.DisplayUtils.removeFromParent(this.UIPanel.systemPreview);;
            common.DisplayUtils.removeFromParent(this.UIPanel.PlayerInfo);
            common.DisplayUtils.removeFromParent(this.UIPanel.FunInfo);
            common.DisplayUtils.removeFromParent(this.UIPanel.ChatLayer);
            common.DisplayUtils.removeFromParent(this.UIPanel.ChatBtn);
            common.DisplayUtils.removeFromParent(this.UIPanel.ChatRedDotImg);
            common.DisplayUtils.removeFromParent(this.UIPanel.ChatRedDotLb);
            common.DisplayUtils.removeFromParent(this.UIPanel.GMBtn);
        }

        //皮卡丘背乌龟来回走
        private _helpSpriteMove()
        {
            this._helpSpriteMoveBol = true;
            HelpSpriteController.instance.mainUI.x = this._helpSpriteCurrentX;
            HelpSpriteController.instance.reversed(this._reversedBol);
            if (!this._reversedBol)
            {
                let time: number = (this._helpSpriteEndX - this._helpSpriteCurrentX) / this._helpSpriteEndX * 30000;
                Laya.Tween.to(HelpSpriteController.instance.mainUI, { x: this._helpSpriteEndX }, time, null, Laya.Handler.create(this, this._helpSpriteComp), 0, true);
            } else
            {
                let time: number = (this._helpSpriteCurrentX - this._helpSpriteStartX) / this._helpSpriteEndX * 30000;
                Laya.Tween.to(HelpSpriteController.instance.mainUI, { x: this._helpSpriteStartX }, time, null, Laya.Handler.create(this, this._helpSpriteComp), 0, true);
            }
        }
        private _helpSpriteComp()
        {
            if (this._helpSpriteMoveBol)
            {
                this._reversedBol = !this._reversedBol;
                this._helpSpriteCurrentX = HelpSpriteController.instance.mainUI.x;
                this._helpSpriteMove();
            }
        }
        private _helpSpriteStop()
        {
            if (this._helpSpriteMoveBol)
            {
                this._helpSpriteMoveBol = false;
                HelpSpriteController.instance.reversed(false);
                this._helpSpriteCurrentX = HelpSpriteController.instance.mainUI.x;
                HelpSpriteController.instance.mainUI.x = 10;
                Laya.Tween.clearAll(HelpSpriteController.instance.mainUI);
            }
        }


        onshowGM()
        {
            this.UIPanel.GMBtn.visible = true;
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            this.UIPanel.ChatLayer.removeSelf();
            this.UIPanel.ChatLayer.destroy();

            this.UIPanel.PlayerInfo.removeSelf();
            this.UIPanel.ChatLayer.destroy();

            this.UIPanel.FunInfo.removeSelf();
            this.UIPanel.ChatLayer.destroy();
            if (HelpSpriteController.instance.mainUI.parent)
            {
                HelpSpriteController.instance.mainUI.removeSelf();
            }
        }

        private showHeroCallSharePop(data: Pb_God.PBG2CTalkAck)
        {
            let tmpAry = data.dataext.split("*");
            SharePops.showTips([Global.getLangStr("ui_HeroCall_msg17", tmpAry[2]), tmpAry[3]], this.UIPanel.ChatBtn);
        }

        //--------------------------------------Event Fun---------------------------------
        /** 初始化 */
        public initUI()
        {
            this.startLoopFrame();

            this.refreshChatRedDot();
            this.UIPanel.FunInfo.init();
            this.UIPanel.PlayerInfo.init();
            this.UIPanel.OnlinePrizeBtnInfo.init();

            if (GlobalData.isShowDebugInfo)
            {
                this.UIPanel.GMBtn.visible = true;
            }
            this.UIPanel.GMBtn.onClick(this, (btn: component.UIButton, isDrag: boolean) =>
            {
                // var ned:Pb_God.PBItemInfo = new Pb_God.PBItemInfo();
                // ned.itemid = 1;
                // EffectAni.Inst.showEff_Reward_Fly(new Laya.Point(197,773),new Laya.Point(454,28),ned)
                if (isDrag == null)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_GM));
                }
            }, true, this.UIPanel.GMBtn);


            this.UIPanel.ChatBtn.onClick(this, (btn: component.UIButton, isDrag: boolean) =>
            {
                if (isDrag == null)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Chat));
                }
            }, true, this.UIPanel.ChatBtn);

            this.UIPanel.systemPreview.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_SystemList));
            })

            this.ReciverLoginData();
            this.showHelpSprite();
        }

        showHelpSprite()
        {
            let isOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.HelpSprite);
            if (isOpen)
            {
                HelpSpriteController.instance.mainUI.bottom = 140;
                HelpSpriteController.instance.mainUI.x = 10;
                this.UIPanel.addChild(HelpSpriteController.instance.mainUI);
            }
        }

        /** 刷新 */
        public refreshUI()
        {
        }

        //循环逻辑
        private startLoopFrame()
        {
            Laya.timer.frameLoop(1, this, this.updateFrame);
        }

        private stopLoopFrame()
        {
            Laya.timer.clear(this, this.updateFrame);
        }

        private _secondUpdate = 1000;
        /** 时间轴刷新 */
        private updateFrame()
        {

            //秒刷新
            let isSecond = false;
            this._secondUpdate += Laya.timer.delta;
            if (this._secondUpdate >= 1000)
            {
                this._secondUpdate = 0;
                isSecond = true;
            }

            if (this.hookLayer && this.hookLayer.visible)
            {
                this.hookLayer.updateFrame(isSecond);
            }
            if (this.zhuchengUI && this.zhuchengUI.parent)
            {
                this.zhuchengUI.updateFrame(isSecond);
            }
            isSecond && this.guideHookBtn();
        }

        private guideHookBtn()
        {
            if (!this.zhuchengUI || !this.zhuchengUI.parent || !this.zhuchengUI.visible)
            {
                this.resetGuideHookTime();
                return;
            }

            //等级限制
            if (Pro.HookDataMgr.getStageID() > 50)
            {
                this.resetGuideHookTime();
                return;
            }
            if (GuideMgr.Inst.getGuideStatue(false, true))
            { //新手引导中
                this.resetGuideHookTime();
                return;
            }
            //有界面开启中或者按钮都没有出来
            if (UIManager.Inst.getIsShowingUI())
            {
                this.resetGuideHookTime();
                return;
            }
            if (Laya.timer.currTimer - this._guideHookBtnCloseTime >= this._guideHookBtnTime)
            {
                this._guideHookBtnCloseTime = Laya.timer.currTimer;
                this.UIPanel.FunInfo.guideHookBtn();
            }
        }

        private resetGuideHookTime()
        {
            this._guideHookBtnCloseTime = Laya.timer.currTimer;
        }

        //--------------------------------------通用--------------------------------
        /** 登陆成功 */
        private ReciverLoginData()
        {

            //客户端准备就绪
            CommonSend.go();

            //显示聊天按钮
            this.UIPanel.ChatBtn.visible = true;

            //子UI部件刷新
            this.UIPanel.FunInfo.refreshUI();
            this.UIPanel.PlayerInfo.refreshUI();
            this.UIPanel.OnlinePrizeBtnInfo.refreshUI();
            if (this.hookLayer)
            {
                this.hookLayer.refreshUI();
            }

            //刷新主城UI
            if (this.zhuchengUI != null)
            {
                this.zhuchengUI.refreshUI();
            }

            //显示默认场景
            EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);

            //新手引导
            GuideMgr.Inst.enterGuide();

            //开启自动弹UI逻辑
            UIManager.Inst.doAutoQueneUI();

            //刚进主界面，默认打开的界面逻辑，交给代理类处理
            var mainUILoginShowProxy = new MainUILoginShowProxy();
        }

        /**
        * 主城显示或隐藏
        * @param  控制主城(0)、挂机场景(1)的显示，(-1)表示都不显示
        */
        private Zhucheng_Hook_Visible_Changed(statue: number)
        {
            this.resetPageShowView(statue);
        }

        /** UI界面有变化 */
        private onChangeFullUIShow(): void
        {
            Laya.timer.callLater(this, this.checkUIFullShow);
        }

        private hasFullUIShow = false;
        /** 检查打开的界面中是否有全屏背景显示的，如果有，则可以隐藏主城和挂机的显示，减少drawcall */
        private checkUIFullShow(): void
        {
            //战斗中
            if (BattleMgr.Inst.getWatchBattleType() != -1)
            {
                return;
            }
            let isFullShow = UIManager.Inst.getIsShowFullScreenUI();
            if (isFullShow == this.hasFullUIShow)
            {
                return;
            }
            this.hasFullUIShow = isFullShow;
            if (isFullShow)
            {
                this.resetPageShowView(-1);
            } else
            {
                this.resetPageShowView(FunInfo.SelectIndex == FunInfo.hookPage ? 1 : 0);
            }
        }

        /**
        * 切换显示分页
        * @param  控制主城(0)、挂机场景(1)的显示，(-1)表示都不显示
        */
        private resetPageShowView(statue: number)
        {
            if (this._isClosed || this.UIPanel == null)
            {
                // GameLaunch.PostClientLog("resetPageShowView")
                return;
            }

            let showHookLayer = statue == 1;
            let showZhuCheng = statue == 0;
            if (statue != -1)
            {
                this.startLoopFrame();
            }
            else
            {
                this.stopLoopFrame();
            }

            let tmpWatchBatType = BattleMgr.Inst.getWatchBattleType();
            if (showHookLayer)
            {
                this.UIPanel.addChild(this.UIPanel.BaseBattleLayer);
                this.UIPanel.addChild(this.UIPanel.BaseBattleCityLayer);
                /**移出时 道具图标会被回收 这里需要再刷一下 */
                this.UIPanel.OnlinePrizeBtnInfo.refreshUI();
            } else
            {
                common.DisplayUtils.removeFromParent(this.UIPanel.BaseBattleLayer);
                common.DisplayUtils.removeFromParent(this.UIPanel.BaseBattleCityLayer);
            }

            //显示挂机场景
            if (showHookLayer && (tmpWatchBatType == -1 || tmpWatchBatType == Pb_God._emBattleType.BattleType_Hook))
            {
                if (!this.hookLayer)
                {
                    this.hookLayer = new HookLayer();
                    this.hookLayer.initUI();
                }
                this.UIPanel.addChildAt(this.hookLayer, 0);
                this.hookLayer.show(true);
            } else
            {
                if (this.hookLayer)
                {
                    common.DisplayUtils.removeFromParent(this.hookLayer);
                    this.hookLayer.show(false);
                }
            }

            if (showZhuCheng)
            {
                if (!this.zhuchengUI)
                {
                    this.zhuchengUI = new ZhuCheng();
                    this.zhuchengUI.init();
                    this.UIPanel.addChildAt(this.zhuchengUI, 0);
                } else
                {
                    this.UIPanel.addChildAt(this.zhuchengUI, 0);
                    this.zhuchengUI.refreshUI();
                }
                this.resetGuideHookTime();
            } else
            {
                if (this.zhuchengUI && this.zhuchengUI.parent)
                {
                    this.zhuchengUI.removeSelf();
                }
                this._zhuchengCloseTime = Laya.timer.currTimer;
            }

            let isOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.HelpSprite);
            if (isOpen)
            {
                this.UIPanel.addChild(HelpSpriteController.instance.mainUI);
                if (this.hookLayer && this.hookLayer.visible && this.hookLayer.HookInfo.visible)
                {
                    HelpSpriteController.instance.mainUI.bottom = 450;
                    this._helpSpriteMove();
                }
                else if (this.UIPanel.BaseBattleLayer.visible || statue == -1)
                {
                    HelpSpriteController.instance.mainUI.bottom = 220;
                    this._helpSpriteStop();
                }
                else
                {
                    HelpSpriteController.instance.mainUI.bottom = 140;
                    this._helpSpriteStop();
                }
            }
        }


        /** 聊天信息变更 */
        private refreshChatRedDot()
        {
            let tmpNum = Math.min(ChatDataMgr.getUnCherkTotleNum(), 99);
            this.UIPanel.ChatRedDotImg.visible = tmpNum > 0;
            this.UIPanel.ChatRedDotLb.text = "+" + tmpNum;
            this.UIPanel.ChatRedDotImg.width = this.UIPanel.ChatRedDotLb.width + 12;
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            //转交给代理类
            MainUIGuideProxy.GuideEnter(step, this.UIPanel, this.zhuchengUI, this.hookLayer);
        }

        /**
         * 操作本步引导
         */
        public Guide_Active(step: GuideStep)
        {
            //转交给代理类
            MainUIGuideProxy.GuideActive(step, this.UIPanel, this.zhuchengUI);
        }

        protected closePanel(effectType: number = 0, clearAtlas: boolean = true, destoryUI: boolean = false)
        {
            super.closePanel(effectType, clearAtlas, destoryUI);
            logD("关闭MainMediator")
        }

    }
}