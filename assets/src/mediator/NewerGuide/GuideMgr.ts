
module Pro
{
    /*
    * 引导管理器
    */
    export class GuideMgr
    {

        private static Instance: GuideMgr = null;
        public static get Inst()
        {
            if (GuideMgr.Instance == null)
            {
                GuideMgr.Instance = new GuideMgr();
            }
            return GuideMgr.Instance;
        }

        //--------------------------------------------------------------------
        /** 引导的根节点 */
        private RootLayer: Laya.Sprite;
        /** 引导层 */
        private GuideLayer: ProUI.Common.GuideWinUI;
        /** 确定引导是否初始化完毕 */
        private IsInited = false;

        /** 当前引导时，需要绘制的按钮目标 */
        private InGuideButton: Laya.UIComponent;
        /** 当前引导时接收点击事件的按钮 */
        private InGuideTriggerButton: component.UIButton;
        /** 引导按钮触发类型 分两种大的情况：
         * <p>当触发的按钮有值时:
         *      0-普通点击
         *      1-长按一直等到外部调用nextActive
         *      2-点击按钮后，触发一次原始按钮，但引导不往下走
         *      3-点任意地方都会触发下一步，但只有点到按钮区域时，才会触发按钮的点击事件
         * <p>当没有传入触发按钮时
         *      0-默认值
         *      1-点击指引直接跳转下一步，无需外部处理触发操作。
         *  */
        private _guideTriggerType = 0;
        /** 记录按钮按下的时间 */
        private _buttonDownTime = 0;

        //--------------------------------------------------------------------
        //显示的切割区域
        /** 切割层-黑色背景 */
        private MaskArea: Laya.Sprite;
        /** 切割层-可点击区域 */
        private HitArea: Laya.HitArea;

        //--------------------------------------------------------------------
        /** 是否处于新手引导 */
        private InGuide: boolean = false;
        /** 引导的小步骤 */
        private InStep: number = 1;
        /** 是否显示引导中 */
        private isShowing: boolean = false;
        /** 当前引导，是否已经结束了新手前期引导，进入功能引导中 */
        private InFuncGuide: boolean = false;

        //--------------------------------------------------------------------
        /** 当前未点击到指引处多少次 */
        private isOutOfGuideClickTimes: number = 0;
        /** 最大未操作次数 */
        private readonly inOutOfGuideMaxTimes: number = 5;

        //--------------------------------------------------------------------
        /** 对话显示 */
        private InDialogMsgSps: Array<Laya.Sprite> = [];
        //[npcname, dialog]
        private InDialogMsgAry: string[][] = [];

        //------------------------------------
        public customDotStep: number = -1;

        //--------------------------------------------------------------------
        constructor()
        {

        }

        /**
         * 获取整体界面初始化状态
         */
        public getIsInited(): boolean
        {
            return this.IsInited;
        }

        /**
         * 获取当前处于新手前期强引导状态(显示中)
         */
        public getInShowGuide(): boolean
        {
            return this.InGuide && this.isShowing && !this.InFuncGuide;
        }
        /**
         * 获取当前是否处于引导显示中，包括功能开放引导
         */
        public getInAllShowGuide(): boolean
        {
            return this.InGuide && this.isShowing;
        }

        /** 当前是否正在功能引导中
         * @param containSimple 是否包含单步指引的（Simply_Guide_Start以上的）
         */
        public getInFuncGuide(containSimple: boolean): boolean
        {
            if (!this.InFuncGuide)
            {
                return false;
            }
            if (!containSimple && this.InStep > GuideStep.Simply_Guide_Start)
            {
                return false;
            }
            return true;
        }

        /**
         * 获取当前处于得引导步骤
         */
        public getInStep(): number
        {
            if (!this.InGuide)
            {
                return 0;
            }
            return this.InStep;
        }

        /**
         * 获取当前引导状态
         * @param checkShow 只检查显示中的
         * @param coverFuncGuide 包括功能引导
         */
        public getGuideStatue(checkShow: boolean = false, coverFuncGuide: boolean = false): boolean
        {
            if (!this.InGuide)
            {
                return false;
            }
            if (checkShow && !this.isShowing)
            {
                return false;
            }
            if (!coverFuncGuide && this.InFuncGuide)
            {
                return false;
            }
            return true;
        }

        /**
         * 获取是否显示引导
         */
        public getShowGuide(): boolean
        {
            return this.isShowing;
        }

        /**
         * 获取真实步骤，规避关键步骤没有保存的bug
         */
        public getReallyStep(step: GuideStep)
        {
            if (step == GuideStep.NormalCall_3_1 && PetDataMgr.getPetList().length > 0)
            {
                //这里处理一下皮卡丘获取到了 但是因为网络问题 步骤没保存的情况
                return GuideStep.FirstFight_4_1;
            }
            return step;
        }

        /**
         * 设置引导状态
         * */
        public setGuideStatue(isGuide: boolean, isShowing: boolean, inStep: number, inFuncGuide: boolean = false, executeNext: boolean = true)
        {

            this.InGuide = isGuide;
            this.InStep = inStep;
            this.isShowing = isShowing;
            this.isOutOfGuideClickTimes = 0;
            this.InFuncGuide = inFuncGuide;

            if (executeNext)
            {
                //引导步骤异常便跟了，直接完成新手引导
                if (isNaN(this.InStep))
                {
                    this.InStep = GuideStep.Plot_1_1;
                    this.finshGuide();
                }
                else
                {
                    this.refreshNextStep(inStep);
                    if (this.InGuide && this.InStep >= GuideStep.NoviceMax)
                    {
                        this.finshGuide();
                    }
                }
            }
        }

        /** 判断当前步骤，并执行到下一步（简化应用层逻辑） */
        public checkStepAndNextActive(...steps: number[]): void
        {
            let inStep = this.getInStep();
            if (steps.indexOf(inStep) >= 0) { this.nextActive(); }
        }

        /**
         * 根据当前步骤刷新下一步指引
         */
        private refreshNextStep(inStep: number)
        {
            let tmpStepBigNum = Math.floor(inStep / 100);
            let tmpStepCurNum = inStep % 100;
            if (tmpStepCurNum > 1)
            {
                tmpStepBigNum++;
            }
            this.InStep = tmpStepBigNum * 100 + 1;
        }

        /**
         * 进入引导
         */
        public enterGuide()
        {
            if (!this.InGuide)
            {
                return;
            }

            this.isShowing = true;
            if (this.RootLayer != null && this.GuideLayer != null)
            {
                this.onGuideStart();
                return;
            }

            this.initRoot();
            this.onGuideStart();
        }

        /**
         * 初始化引导根节点
         */
        private initRoot()
        {
            if (this.RootLayer != null)
            {
                return;
            }

            // 引导所在容器
            this.RootLayer = new Laya.Sprite();
            this.RootLayer.width = GameConfig.curWidth();
            this.RootLayer.height = GameConfig.curHeight();
            LayerManager.Inst.GuideLayer.addChild(this.RootLayer);
            this.RootLayer.on(Laya.Event.MOUSE_DOWN, this, this.onScreenClick);
            this.RootLayer.on(Laya.Event.MOUSE_UP, this, this.onScreenUp);

            this.GuideLayer = new ProUI.Common.GuideWinUI();

            this.initAni();
            this.GuideLayer.width = GameConfig.curWidth();
            this.GuideLayer.height = GameConfig.curHeight();
            this.RootLayer.addChild(this.GuideLayer);
            this.GuideLayer.mouseEnabled = true;

            //设置屏幕点击
            //this.GuideLayer.Touch.onClick(this,this.onStepClick);
            this.GuideLayer.JumpBtn.onClick(this, this.onHideGuideClick);

            //跳过新手引导
            this.GuideLayer.ExitBtn.onClick(this, () =>
            {
                if (this.InStep <= GuideStep.Rename_2_1)
                {
                    TipsUtils.showTips("别闹，取个名先！");
                    return;
                }
                this.finshGuide();
            });
            this.GuideLayer.ExitBtn.visible = !GlobalData.isRelease;

            //对话中可显示的节点
            this.InDialogMsgSps.push(this.GuideLayer.HeadImg);
            this.InDialogMsgSps.push(this.GuideLayer.CellImg1);
            this.InDialogMsgSps.push(this.GuideLayer.CellImg2);

            //绘制遮罩区，含透明度，可见游戏背景
            this.MaskArea = new Laya.Sprite();
            this.MaskArea.alpha = 0.35;
            this.MaskArea.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight(), "#000000");
            this.GuideLayer.MaskLayer.addChild(this.MaskArea);

            this.HitArea = new Laya.HitArea();
            this.HitArea.hit.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight(), "#000000");
            this.GuideLayer.MaskLayer.hitArea = this.HitArea;

            //遮罩层设置
            this.GuideLayer.MaskLayer.mouseEnabled = true;
            this.GuideLayer.MaskLayer.mouseThrough = true;
            this.GuideLayer.MaskLayer.cacheAs = "bitmap";

            //确定状态
            this.IsInited = true;
        }

        private initAni()
        {
            let sk = new Pro.SkeletonPlayer();
            sk.load(UrlMgr.getSpineSceneUrl("npc/boshibanshen/boshibanshen"));
            this.GuideLayer.imgNpc.addChild(sk);
            sk.playByIndex(0, true);
        }

        /**
         * 进入指引
         */
        private onGuideStart()
        {
            if (this.isShowing)
            {
                this.RootLayer.visible = true;
                this.showStep();
            }
            else
            {
                this.RootLayer.visible = false;
            }
        }

        /** 屏幕点击 */
        private onScreenClick()
        {
            if (this.HitArea == null || !this.GuideLayer || !this.GuideLayer.MaskLayer.visible)
            {
                return;
            }
            let tmpTouchPos = this.GuideLayer.MaskLayer.getMousePoint();
            if (!this.GuideLayer.Touch.visible || (!cfg.GuideCfgData.getDialogById(this.InStep) && this.HitArea.contains(tmpTouchPos.x, tmpTouchPos.y)))
            {
                this.onOutGuideClick(tmpTouchPos);
            }
            else
            {
                this.onStepClick();
            }
        }
        private onScreenUp()
        {
            if (this.InGuideTriggerButton && this._guideTriggerType == 1)
            {
                //触发松开。
                this.InGuideTriggerButton.activeEvent(false);
                if (this._buttonDownTime + 200 > getTimer()) //时间短的话，再触发一次点击
                { this.InGuideTriggerButton.activeEvent(); }
            }
        }


        /**
         * 在指引区域外点击
         */
        private onOutGuideClick(pos?: Laya.Point)
        {
            if (this.InGuideTriggerButton && this._guideTriggerType == 3)
            {
                //活动区域外也可触发下一步
                this.nextActive();
            } else
            {
                this.isOutOfGuideClickTimes++;
                if (this.isOutOfGuideClickTimes > this.inOutOfGuideMaxTimes)
                {
                    if (this.InStep > GuideStep.FirstFight_4_4)
                    {
                        this.GuideLayer.JumpBtn.visible = true;
                    }
                }
                if (this.GuideLayer.FingerEffImg.visible)
                {
                    this.GuideLayer.OutClickEffImg.visible = true;
                    this.GuideLayer.ani3.play(0, false);
                }
                let finger = this.GuideLayer.Finger;

                if (finger.visible && !finger["isFly"])
                {
                    this.GuideLayer.FingerArrowIcon.pos(pos.x - finger.x, pos.y - finger.y);
                    finger["isFly"] = true;
                    Laya.Tween.to(this.GuideLayer.FingerArrowIcon, { x: 0, y: 0 }, 500, null,
                        Laya.Handler.create(this, () =>
                        {
                            finger["isFly"] = false;
                        })
                    );
                }
            }
        }

        /**
         * 指引区域触发操作
         */
        private onStepClick()
        {
            this.GuideLayer.OutClickEffImg.visible = false;
            if (this.InGuideTriggerButton != null)
            {
                if (this._guideTriggerType == 0 || this._guideTriggerType == 3)
                {
                    this.InGuideTriggerButton.activeEvent(null);
                    this.nextActive();
                } else if (this._guideTriggerType == 1)
                {
                    this.InGuideTriggerButton.activeEvent(true);
                    this._buttonDownTime = getTimer();
                }
                else if (this._guideTriggerType == 2)
                {   //只需移除当前指引的显示， 等待外部驱动下一步。
                    this.InGuideTriggerButton.activeEvent(null);
                    this.clearStepData();
                    this.GuideLayer.FingerBounds.visible = false;
                    this.GuideLayer.Finger.visible = false;
                }
            } else
            {
                if (this._guideTriggerType == 1)
                {
                    this.nextActive();
                }
                else
                { EventMgr.trigger(EventNotify.Guide_Active, this.InStep); }
            }
        }

        /** 设置自动点击下一步
         * @param delay 毫秒
         * @param isTriggerEventBtn 下一步时是否自动触发按钮
         */
        public setAutoNext(delay: number, isTriggerEventBtn: boolean): void
        {
            Laya.timer.once(delay, this, this.onAutoNext, [isTriggerEventBtn]);
        }

        /** 自动到下一步 */
        private onAutoNext(isTriggerEventBtn: boolean): void
        {
            if (isTriggerEventBtn && this.InGuideTriggerButton)
            {
                this.InGuideTriggerButton.activeEvent(null);
            }
            this.nextActive();
        }

        /**
         * 跳过当前指引
         */
        private onHideGuideClick()
        {
            if (this.InStep + 20 >= GuideStep.NoviceMax)
            {
                this.finshGuide();
            }
            else
            {
                this.finishCurrGuide();
            }
        }

        /**跳过当前引导 只限新手引导 */
        public finishCurrGuide()
        {
            if (this.InStep < GuideStep.NoviceMax)
            {
                CommonSend.guideLog(this.InStep * 10000);
                this.clearStepData();
                this.isShowing = false;
                this.RootLayer.visible = false;
                GameLaunch.saveClientData();
            }
        }

        /** 战斗胜利检查对应的指引步骤， 把关键步步骤存下来，避免此时下线时引导步骤中指引进入战斗重复 */
        public saveGuideStepByFight(): void
        {
            if (this.isShowing)
            {
                return;
            }

            //根据挂机战斗从新计算下一步指引
            let tmpCurStageId = HookDataMgr.getStageID();
            let guideCfgInfo = cfg.GuideCfgData.getGuideStepByHookStage(tmpCurStageId);
            if (!guideCfgInfo)
            {
                if (this.getGuideStatue(false, false)) { this.finshGuide(); }
                return;
            }

            //继续正常触发引导
            this.InStep = guideCfgInfo.id;
            GameLaunch.saveClientData();
        }


        /**
         * 战斗后重新触发指引
         */
        public onReActiveGuideByFight(): boolean
        {
            if (this.isShowing)
            {
                return false;
            }
            //根据挂机战斗从新计算下一步指引
            if (cfg.GuideCfgData.getHookStageById(this.InStep) != HookDataMgr.getStageID())
            { return false; }

            //关掉除升级界面以外的其它界面，便于升级界面弹出来，继续进行下一步
            UIManager.Inst.CloseOtherUI([PanelNotify.Open_PlayerLevelUp, PanelNotify.Open_SystemSwitchOpen]);
            //界面回到主界面
            EventMgr.trigger(EventNotify.Zhucheng_Hook_Visible_Changed, FunInfo.SelectIndex == 0 ? 0 : 1);

            //继续正常触发引导
            this.__onReActiveGuide();
            return true;
        }

        /** 检查当前暂停步骤并重新触发指引 */
        public checkAndReActiveGuideByPauseStep(step: number): boolean
        {
            if (this.isShowing)
            {
                return false;
            }
            if (this.InStep != step) { return false; }
            if (!cfg.GuideCfgData.getPauseGuideById(step)) { return false; }
            Laya.timer.once(100, this, this.__onReActiveGuide);
            return true;
        }

        /**
         * 暂停后重新触发指引
         */
        private __onReActiveGuide()
        {
            if (this.isShowing)
            {
                return;
            }
            //从新刷新指引
            this.isShowing = true;
            if (!this.RootLayer) { return; }
            this.RootLayer.visible = true;
            GameLaunch.saveClientData();
            this.nextActive();
        }


        /** 判断当前小阶段的引导是否已经结束 */
        private checkGuideStageFinish(step: number): boolean
        {
            //反向查一下枚举里面还有没有对应的配置
            return !GuideStep[step];
        }

        /** 跳到指定步骤 */
        public jumpActive(nextStep: GuideStep): void
        {
            if (this.RootLayer == null)
            {
                return;
            }

            this.clearStepData();

            let stageFinish = nextStep > GuideStep.Simply_Guide_Start || this.checkGuideStageFinish(nextStep);  //小阶段结束
            if (!stageFinish)
            {
                this.InStep = nextStep;
            }
            else if (this.InFuncGuide)
            { //功能引导小阶段结束时，就表示当前功能已经引导完了。
                this.InFuncGuide = false;
                this.reset();
                return;
            }
            else
            {
                let tmpStepBigNum = Math.floor(this.InStep / 100);
                let tmpStepCurNum = this.InStep % 100;
                tmpStepBigNum++;
                tmpStepCurNum = 1;
                this.InStep = tmpStepBigNum * 100 + tmpStepCurNum;
            }
            if (this.InStep >= GuideStep.NoviceMax && !this.InFuncGuide)
            {
                this.finshGuide();
            }
            else
            {
                //关键步骤存储
                if (stageFinish || cfg.GuideCfgData.getStageSaveById(this.InStep))
                { GameLaunch.saveClientData(); }
                this.showStep();
            }
        }

        /**
         * 执行下一步奏
         * */
        public nextActive()
        {
            if (this.RootLayer == null)
            {
                return;
            }
            this.jumpActive(this.InStep + 1);
        }

        /**
         * 执行本步骤表现
         */
        private showStep(): void
        {
            this.isOutOfGuideClickTimes = 0;
            this.GuideLayer.JumpBtn.visible = false;
            this.GuideLayer.OutClickEffImg.visible = false;
            this.MaskArea.visible = false;
            // this.stepData = 0;

            if (this.InStep == GuideStep.Rename_2_1)
            {
                this.RootLayer.visible = false;
            }
            else if (this.InStep == GuideStep.Rename_2_2)
            {
                this.RootLayer.visible = true;
            }
            else if (cfg.GuideCfgData.getPauseGuideById(this.InStep))
            {
                this.isShowing = false;
                this.RootLayer.visible = false;
            }

            if (cfg.GuideCfgData.getDialogById(this.InStep))
            {
                this.GuideLayer.Finger.visible = false;
                this.GuideLayer.FingerBounds.visible = false;
                this.GuideLayer.Touch.visible = true;
                this.MaskArea.visible = true;

                this.showDialog();
            }
            else
            {
                this.GuideLayer.Finger.visible = false;
                this.GuideLayer.FingerBounds.visible = false;
                this.GuideLayer.Tips.visible = false;
                this.GuideLayer.Touch.visible = false;
            }

            this.saveGuideLog(this.InStep);
            Public.EventMgr.trigger(EventNotify.Guide_Enter, this.InStep);
        }

        /**
         * 显示对话
         * */
        private showDialog()
        {
            if (!this.IsInited) { return; }
            if (!this.GuideLayer.Tips.visible)
            {
                this.InDialogMsgAry.splice(0, this.InDialogMsgAry.length);
                this.GuideLayer.Tips.visible = true;
            }

            this.HitArea.unHit.clear();
            this.HitArea.unHit.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight(), "#000000");

            let tmpMsgText = cfg.GuideCfgData.getDialogById(this.InStep);
            let npcName = cfg.GuideCfgData.getNpcNameById(this.InStep) || Global.getLangStr("guide_msg1");
            this.InDialogMsgAry = [];//策划要求改为覆盖型引导了，这里把列表重置就行了。
            this.InDialogMsgAry.unshift([npcName, tmpMsgText]);

            for (let i = 0; i < this.InDialogMsgSps.length; i++)
            {
                let tmpSp = this.InDialogMsgSps[i];
                tmpSp.visible = i < this.InDialogMsgAry.length;
                if (tmpSp.visible)
                {
                    let txtName = tmpSp.getChildByName("NameLb") as component.UILabel;
                    let tmpMsgLb = tmpSp.getChildByName("MsgLb") as component.UIHtmlText;
                    txtName.text = this.InDialogMsgAry[i][0];
                    tmpMsgLb.showText = this.InDialogMsgAry[i][1];
                }
            }
        }

        /**
         * 突出显示按钮
         * @param screenClickType 屏幕点击触发类型  0-限定点击目标， 1-任意位置点击
         */
        private popUpFinger(FrameSp: Laya.UIComponent, screenClickType: number, needDrawTarget: boolean, loopDraw: number = 0): Laya.Point
        {

            this.clearStepData();

            let spWidth = FrameSp.width;
            let spHeight = FrameSp.height;
            let FrameDetal = new Laya.Point(spWidth * 0.5, spHeight * 0.5);
            let targetPos = FrameSp.localToGlobal(FrameDetal);
            // targetPos.x -= this.GuideLayer.x;
            targetPos.y -= GameConfig.WinCenterY / 2;

            if (screenClickType == 0)
            { this.HitArea.unHit.drawRect(targetPos.x - spWidth * 0.5, targetPos.y - spHeight * 0.5, spWidth, spHeight, "#000000"); }
            else if (screenClickType == 1)
            { this.HitArea.unHit.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight(), "#000000"); }

            if (needDrawTarget)
            { //没有黑色遮罩的时候，其实是不需要绘制目标的
                let tmpCopySp = new Laya.Image();
                tmpCopySp.anchorX = 0.5;
                tmpCopySp.anchorY = 0.5;
                tmpCopySp.pos(targetPos.x, targetPos.y);
                this.GuideLayer.ButtonLayer.addChild(tmpCopySp);

                this.InGuideButton = FrameSp;

                // this.drawGuideButton();

                // if (loopDraw > 0) { Laya.timer.frameLoop(loopDraw, this, this.drawGuideButton); }
            }


            return targetPos;
        }

        /** 绘制按钮时， 往外多扩一些 */
        private readonly DRAW_BTN_EXTRA_SIZE = 30;
        /** 绘制按钮 */
        private drawGuideButton(): void
        {
            let frameSp = this.InGuideButton;
            if (!frameSp)
            {
                return;
            }
            // FrameSp.alpha = 1;
            let image = this.GuideLayer.ButtonLayer.getChildAt(0) as Laya.Image;
            if (!image)
            {
                return;
            }

            let _offsetX = frameSp.anchorX ? frameSp.width * frameSp.anchorX : (frameSp.pivotX ? frameSp.pivotX : 0);
            let _offsetY = frameSp.anchorY ? frameSp.height * frameSp.anchorY : (frameSp.pivotY ? frameSp.pivotY : 0);

            image.width = frameSp.width + this.DRAW_BTN_EXTRA_SIZE;
            image.height = frameSp.height + this.DRAW_BTN_EXTRA_SIZE;

            var bitmao: any = frameSp.drawToTexture(image.width, image.height, this.DRAW_BTN_EXTRA_SIZE / 2 + _offsetX, this.DRAW_BTN_EXTRA_SIZE / 2 + _offsetY);
            // let tmpHtmlCanvas = frameSp.drawToCanvas(image.width, image.height, this.DRAW_BTN_EXTRA_SIZE / 2 + _offsetX, this.DRAW_BTN_EXTRA_SIZE / 2 + _offsetY);
            // if (image.texture)
            // {
            //     image.texture.destroy(true)
            // }
            // var bitmap: Laya.Texture2D = new Laya.Texture2D();
            // bitmap.loadImageSource(tmpHtmlCanvas.source);
            // tmpHtmlCanvas.destroy();
            // image.texture = new Laya.Texture(bitmap);
            image.texture = new Laya.Texture(bitmao);
            // FrameSp.alpha = 0;
        }

        /**
         * 还原前面步骤留下的数据（事件按钮， 定时器等）
         */
        public clearStepData()
        {
            this.InGuideTriggerButton = null;
            this._guideTriggerType = 0;
            Laya.timer.clear(this, this.drawGuideButton);
            Laya.timer.clear(this, this.onAutoNext);
            if (this.InGuideButton != null)
            {
                // this.InGuideButton.alpha = 1;
                this.InGuideButton = null;
            }
            if (this.GuideLayer != null)
            {
                this.GuideLayer.ButtonLayer.removeChildren();
            }
        }


        /** 显示目标区域指引，不带手指，带闪动边框 */
        public showPopFrame(frameSp: Laya.UIComponent, showBlackMask: boolean = true): void
        {
            if (!this.IsInited) { return; }

            this.HitArea.unHit.clear();

            let targetPos = this.popUpFinger(frameSp, 1, showBlackMask);
            // 1-点击指引直接跳转下一步，无需外部处理触发操作。
            this._guideTriggerType = 1;

            this.MaskArea.visible = showBlackMask;
            this.GuideLayer.Finger.visible = false;
            this.GuideLayer.FingerEffImg.visible = false;
            this.GuideLayer.boxFingerTip.visible = false;
            this.GuideLayer.OutClickEffImg.visible = false;

            this.GuideLayer.Touch.visible = true;

            this.GuideLayer.FingerBounds.visible = true;
            let offset = 3;
            this.GuideLayer.ImgFingerBounds.width = frameSp.width + offset * 2;
            this.GuideLayer.ImgFingerBounds.height = frameSp.height + offset * 2;
            this.GuideLayer.FingerBounds.x = targetPos.x;
            this.GuideLayer.FingerBounds.y = targetPos.y;
        }

        /**
         * 显示手指指引
         * @param FrameSp 绘制到引导上面的图片，可能是按钮，也有可能不是
         * @param showBlackMask 是否显示黑色蒙板
         * @param triggerBtn 用于接收事件的按钮，如果有传入这个按钮，在点击手指指引时，会自动触发按钮的点击，并且切换到下一步引导
         * @param guideTriggerType 这个参数说明有点复杂， 详见_guideTriggerType变量的说明。
         * @param screenClickType 屏幕点击触发类型  0(默认)-限定点击目标， 1-任意位置点击
         * @param loopDraw 循环绘制 0(默认)表示只绘制1次   >0表示间隔帧数
         * */
        public showFinger(FrameSp: Laya.UIComponent, showBlackMask: boolean = true, triggerBtn: component.UIButton = null, guideTriggerType: number = 0, screenClickType: number = 0, loopDraw: number = 0)
        {
            Laya.timer.frameOnce(1, this, this.showFingerDelay, [FrameSp, showBlackMask, triggerBtn, guideTriggerType, screenClickType, loopDraw]);
        }

        /**
         * 加了适配后 ui应用编辑器内的排版（bottom top等）
         * 需要延迟一帧调用才能获取实际位置
         * @param FrameSp
         * @param showBlackMask
         * @param triggerBtn
         * @param guideTriggerType
         * @param screenClickType
         * @param loopDraw
         */
        private showFingerDelay(FrameSp: Laya.UIComponent, showBlackMask: boolean = true, triggerBtn: component.UIButton = null, guideTriggerType: number = 0, screenClickType: number = 0, loopDraw: number = 0)
        {
            if (!this.IsInited) { return; }

            //添加一下打印，好查到底是什么地方卡住了
            MinConsoleMgr.log("ShowFingerDelay", "Step:", this.InStep, "FrameSp:", FrameSp, "triggerBtn:", triggerBtn, "guideTriggerType:", guideTriggerType, "screenClickType:", screenClickType, "loopDraw:", loopDraw);

            this.HitArea.unHit.clear();

            let targetPos = this.popUpFinger(FrameSp, screenClickType, showBlackMask, loopDraw);
            this.InGuideTriggerButton = triggerBtn;
            this._guideTriggerType = guideTriggerType;

            if (screenClickType != 1)  //全屏幕都能点了的时候，就不需要画圈圈了
            { this.HitArea.unHit.drawCircle(targetPos.x, targetPos.y, 100, "#000000"); }

            //策划要求手指指引不显示蒙版
            this.MaskArea.visible = false;//showBlackMask;

            this.GuideLayer.FingerBounds.visible = false;
            this.GuideLayer.Finger.visible = true;
            this.GuideLayer.Touch.visible = false;
            this.GuideLayer.FingerEffImg.visible = false;
            this.GuideLayer.boxFingerTip.visible = false;
            this.GuideLayer.OutClickEffImg.visible = false;

            Laya.Tween.to(this.GuideLayer.Finger, { x: targetPos.x, y: targetPos.y }, 400, Laya.Ease.linearIn, Laya.Handler.create(this, () =>
            {
                this.GuideLayer.Touch.visible = true;
                this.GuideLayer.FingerEffImg.visible = true;

                //显示手指文字提示
                let fingerTips = cfg.GuideCfgData.getFingerTipsById(this.InStep);
                if (fingerTips)
                {
                    this.GuideLayer.boxFingerTip.visible = true;
                    this.GuideLayer.FingerTipLb.text = fingerTips;
                    this.GuideLayer.FingerTipLb.width = NaN;
                    this.GuideLayer.FingerTipLb.height = NaN;
                    this.GuideLayer.FingerTipLb.width = Math.min(this.GuideLayer.FingerTipLb.width, 250);
                    this.GuideLayer.imgFingerTip.width = this.GuideLayer.boxFingerTip.width = this.GuideLayer.FingerTipLb.width + 38;
                    this.GuideLayer.boxFingerTip.height = this.GuideLayer.FingerTipLb.height + 50;

                    //手指太靠右时，把手指往左边摆
                    if (targetPos.x > GameConfig.WinWidth - 60)
                    {
                        this.GuideLayer.FingerArrowIcon.scaleX = -1;
                    }
                    else
                    {
                        this.GuideLayer.FingerArrowIcon.scaleX = 1;
                    }

                    if (targetPos.x > GameConfig.WinWidth / 2 + 50)
                    {  //目标在右边，指引放左边
                        this.GuideLayer.imgFingerTip.scaleX = -1;
                        this.GuideLayer.imgFingerTip.x = this.GuideLayer.imgFingerTip.width;
                        this.GuideLayer.boxFingerTip.x = -244 + 270 - this.GuideLayer.boxFingerTip.width;
                    } else
                    {
                        this.GuideLayer.imgFingerTip.scaleX = 1;
                        this.GuideLayer.imgFingerTip.x = 0;
                        this.GuideLayer.boxFingerTip.x = -25;
                    }
                }
            }));
        }

        /**
         * 完成新手引导
         * */
        public finshGuide()
        {
            this.reset();
            if (!this.InFuncGuide) { GameLaunch.saveClientData() }
        }

        /**
         * 重置新手以及界面表现
         * */
        public reset()
        {
            this.InGuide = false;
            this.InFuncGuide = false;
            this.clearStepData();
            if (this.RootLayer != null)
            {
                this.RootLayer.removeSelf();
                this.RootLayer.destroy();
                this.RootLayer = null;
                this.GuideLayer = null;
            }
            this.InDialogMsgSps.splice(0, this.InDialogMsgSps.length);
            this.IsInited = false;
        }

        /** 日志记录 */
        protected saveGuideLog(step: number): void
        {
            MinConsoleMgr.log("GuideStep", step);  //记录一下。方便调试
            //只记录新手前期的
            if (step >= GuideStep.NoviceMax)
            {
                return;
            }

            CommonSend.guideLog(step);
            // //向服务器发起签名，等签名回来后，再post到中心服上
            // CommonSend.sign(Pb_God._emSignType.Sign_Guide, [step + ""]);

            // 上报SKD
            let msg = cfg.GuideCfgData.getDescById(step);
            if (msg)
            {
                ThirdMgr.sdkSystem.trackUserEventEx("taskBegin", "taskid=" + step + ";taskname=" + msg);
            }
            else
            {
                ThirdMgr.sdkSystem.trackUserEventEx("taskBegin", "taskid=" + step + ";taskname=null");
            }
        }
    }
}