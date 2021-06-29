
module Pro
{
    /**
     * 面板mediator基类
     * 面板的变量命名必须是UIPanel
     * todo:面板特效，全屏+非全屏蒙层
     */
    export class BaseMediator
    {
        /** UI打开次数 */
        private isOpenTimes: number = 0;
        /** 记录UI打开的时间 */
        protected _openTime = 0;
        /** 初始化状态，0:未初始化，1:正在初始化，2:初始化完成 */
        private isInitStatue: number = 0;
        /** 是否已经显示 */
        private isPopUp = false;
        /** 正在关闭过程中 */
        protected isClosing = false;
        /** 是否带遮罩背景(0-无背景  1-黑色半透背景  2-透明遮罩  3-不透明背景) */
        private bgMaskType: number = 1;
        /** 是否点击空白处关闭UI */
        private clickSpaceCloseUI: boolean = false;
        /** UI背景资源 */
        private uiBgUrl: string = "";
        /** 缓存的UI背景资源 */
        private cacheUIBgUrlList: string[] = [];
        /**是否添加到UI管理器中 */
        private addToUIQuene: boolean = true;
        /**显示UI层级,默认弹窗在中间层 */
        private addUILayer: BaseAddLayer = BaseAddLayer.CenterUI;
        /** UI节点名称 */
        public mediatorName: string = "";
        /** UI处理的事件 */
        private cmdEventDic: ds.StringMap<CallBack> = new ds.StringMap<CallBack>();
        /** UI数据，子类可继承 */
        public UIOpenData: BaseOpenUIData;
        protected _isAutoReleaseRes: boolean = true;

        protected _isClosed: boolean = false;

        /**
        * 添加面板方法
        * @param uiClass       	    面板使用的UIClass
        * @param effectType         0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
        * @param addUILayer         指定弹窗添加到的UI层级(默认BaseAddLayer.CenterUI)
        * @param clickSpaceCloseUI  点击空白处关闭UI(默认false)
        * @param bgMaskType         弹窗是否带遮罩背景(0-无背景  1-黑色背景  2-透明遮罩 3-全黑（有动态改变大背景的，尽量用这个）   默认1)
        * @param popUpWidth      	指定弹窗宽度
        * @param popUpHeight      	指定弹窗高度
        * @param addToUIQuene       添加到默认UI队列中
        */
        protected showPanel(uiClass: any,
            effectType: number = 1,
            addUILayer: BaseAddLayer = BaseAddLayer.CenterUI,
            clickSpaceCloseUI: boolean = false,
            bgMaskType: number = 1,
            popUpWidth: number = 0,
            popUpHeight: number = 0,
            addToUIQuene: boolean = true): void
        {
            if (this.isInitStatue == 1 || this.isClosing)
            {
                return;
            }
            this.isInitStatue = 1;

            //打印一下界面名字，在调试时方便找到对应的界面
            if (!GlobalData.isRelease) { logI("########  open ui", this.mediatorName); }
            //打开参数
            this.addUILayer = addUILayer;
            this.bgMaskType = bgMaskType;
            this.clickSpaceCloseUI = clickSpaceCloseUI;
            this.addToUIQuene = addToUIQuene;

            //打开一个普通操作UI
            if (this.addToUIQuene)
            {
                UIManager.Inst.openUI(this as any);
            }

            //加载资源列表
            let tempAtlasAry = this.autoLoadAtlas();

            //加载返回
            let tmpLoadAtlasFun = (statue: boolean) =>
            {

                //加载完成
                WaitPanelUtils.hideWaitPanel();

                //加载成功
                if (statue == true)
                {
                    ResMgr.Inst.addAtlasReference(tempAtlasAry);
                    this.loadAutoResFinied(uiClass, effectType, popUpWidth, popUpHeight);
                }//加载失败
                else
                {

                    TipsUtils.showTipsByLanId("tips_msg12");

                    //关闭状态
                    this.isInitStatue = 0;

                    //由于普通UI是先添加到UI队列，当资源加载失败自动跳到下个UI
                    if (this.addToUIQuene)
                    {
                        UIManager.Inst.closeUI(this as any);
                    }
                }
            };

            if (this.isOpenTimes == 0 || this.isInitStatue != 2)
            {
                //锁住点击等待UI资源加载
                WaitPanelUtils.showWaitPanel();

                //托管加载
                ResMgr.Inst.load(tempAtlasAry, null, tmpLoadAtlasFun, null, null, ResReleaseType.None, 0);  //加载优先级设为0（最高）
            }
            else
            {
                tmpLoadAtlasFun(true);
            }
            this._isClosed = false;
            this.isOpenTimes++;
        }

        public setOpenData(data: BaseOpenUIData)
        {
            this.UIOpenData = data;
        }


        private loadAutoResFinied(uiClass: any, effectType: number = 0, popUpWidth: number = 0, popUpHeight: number = 0)
        {

            if (this.isInitStatue != 1)
            {
                this.unloadOtherRes();
                return;
            }

            //把不加入到默认UI队列的UI管理器集中管理
            if (!this.addToUIQuene)
            {
                UIManager.Inst.addOthersUI(this);
            }

            //刷新UI
            let isFirstInit = false;
            if ((this as any).UIPanel == null)
            {
                isFirstInit = true;
                (this as any).UIPanel = new uiClass();
                (this as any).UIPanel.mouseThrough = true;
            }
            else
            {
                (this as any).UIPanel.visible = true;
            }

            //如果需要点击背景，就必须有个透明背景可以点
            if (this.clickSpaceCloseUI && this.bgMaskType == 0) { this.bgMaskType = 2; }

            //如果有自定义图片背景，则需要将透明度改成全透
            let uiBgUrl = Global.getUIBGPathWithName(this.mediatorName);
            if (uiBgUrl && this.bgMaskType != 2 && this.bgMaskType != 3)
            {
                this.bgMaskType = 2;
            }

            //如果当前在引导中，避免界面移动过程中，指引箭头乱跑，把界面出现效果取消
            if (GuideMgr.Inst.getInAllShowGuide()) { effectType = 0; }
            //弹出窗口
            PopUpManager.addPopUp(this, effectType, this.bgMaskType, popUpWidth, popUpHeight);

            this._openTime = getTimer();

            //屏幕设置
            if (this.bgMaskType > 0)
            {
                //设置点击屏幕关闭界面
                if (this.clickSpaceCloseUI)
                {
                    this.getDarkUI().onClick(this, () =>
                    {
                        //刚打开一瞬间就被点了， 避免误操作。
                        if (this._openTime + 200 > getTimer()) { return; }
                        this.clickSpaceFunc();
                    });
                }
                //设置UI背景
                this.setUIBG(uiBgUrl);
            }

            //初始化UI
            if (isFirstInit)
            {
                Laya.timer.frameOnce(1, this, () =>
                {
                    (this as any).initialization();
                    this.initPanel();
                });
            }
            else
            {
                this.initPanel();
            }
        }

        protected clickSpaceFunc()
        {
            this.closeUI();
        }

        /** 打开中的界面，重新设置uiopendata, 为保留以前的方案，基类不处理赋值， 有需要做更新处理的，子类可继续此方法。 */
        public resetUIOpenData(uiOpenData: BaseOpenUIData): void
        {
        }

        /**
         * 关闭UI
         */
        public closeUI()
        {
            this._isClosed = true;
            Laya.timer.clearAll(this);
            this.closePanel();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
        }

        /** 红点绑定控制器 */
        protected _reddotBindCtrl: ReddotBindImageController;
        /** 红点绑定（在界面init时调用，关闭时会自动回收） */
        protected reddotBind(img: Laya.Sprite, ...reddotModels: RedDotModel[]): void
        {
            if (!this._reddotBindCtrl) { this._reddotBindCtrl = new ReddotBindImageController(); }
            this._reddotBindCtrl.bindList(img, ...reddotModels);
        }

        /**
         * 进入面板
         */
        private initPanel()
        {

            //打开状态
            this.isInitStatue = 2;
            this.isPopUp = true;

            //主界面添加事件
            if (this.mediatorName == "MainMediator")
            {
                this.addEventMgr(EventNotify.Guide_Active, this, this.Guide_Active);
                this.addEventMgr(EventNotify.Guide_Enter, this, this.Guide_Enter);
            }

            this.addEventMgr(EventNotify.Screen_Resize, this, this.onScreenResize);

            (this as any).addEvent();
            (this as any).initUI();

            EventMgr.trigger(EventNotify.UI_Show_Change, true);

            //刷新引导
            GuideMgr.Inst.getInAllShowGuide() && GuideMgr.Inst.getIsInited() && this.Guide_Enter(GuideMgr.Inst.getInStep());
        }

        protected onScreenResize()
        {
            this["adjustScreenPos"] && this["adjustScreenPos"]();
        }

        /**
        * 移除面板方法
        * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
        */
        protected closePanel(effectType: number = 0, clearAtlas: boolean = true, destoryUI: boolean = false): void
        {
            this._isClosed = true;
            if (this._openTime + 200 > getTimer())
            {  //调试用。
                MinConsoleMgr.log("!!! UIQuickClose " + this.mediatorName + " this.isInitStatue=" + this.isInitStatue);
            }
            if (this.isInitStatue <= 1)
            {
                this.isInitStatue = 0;
                return;
            }
            this.isClosing = true;
            this.destroy(clearAtlas, destoryUI);
            PopUpManager.removePopUp(this, UIManager.Inst.getInClear() ? 0 : effectType);
            this.isClosing = false;
        }

        /** 强制关闭界面，包括界面正在加载中时也停掉。
         * 注：此方法与closeUI的区别在于，closeUI是界面显示出来以后再关掉， 此方法包括了界面还在加载中也会关掉。
         * 所以子类要释放界面内的内容，不需要重写此方法。
         */
        public forceCloseUI(isDestroy: boolean = false): void
        {
            if (this.isInitStatue <= 1)
            {
                this.isInitStatue = 0; //标记即可， 资源加载后会判断
                return;
            }
            if (this.isPopUp)
            {
                this.closeUI();
            }
            if (isDestroy && (this as any).UIPanel)
            {
                // (this as any).UIPanel.destroy();
                // (this as any).UIPanel = null;
                this.destoryUIPanel();
            }
        }

        destoryUIPanel()
        {
            (this as any).UIPanel.destroy();
            (this as any).UIPanel = null;
        }


        public forceDestroyUI(): void
        {
            if (this.isPopUp)
            {
                this.closeUI();
            }
            this.isInitStatue = 0;
            if ((this as any).UIPanel)
            {
                this.destoryUIPanel();
            }
            if ((this as any).UIOpenData)
            {
                (this as any).UIOpenData = null;
            }
        }




        /**
         * 面板关闭后需要销毁的对象
         */
        private destroy(clearAtlas: boolean = true, destoryUI: boolean = false): void
        {
            this.isPopUp = false;
            //移除UI事件
            this.removeAllEventMgr();
            (this as any).removeEvent();
            if (this._reddotBindCtrl)
            {
                this._reddotBindCtrl.cleanUp();
                this._reddotBindCtrl = null;
            }
            //移除UI
            this.getUI().once(Laya.Event.REMOVED, this, this.removeFromStage, [destoryUI]);
            //加入到默认UI队列的UI管理器
            if (this.addToUIQuene)
            {
                UIManager.Inst.closeUI(this as any);
            }
            else
            {
                UIManager.Inst.deleteOthersUI(this);
            }
        }

        private removeFromStage(destoryUI: boolean)
        {
            //释放UI背景
            if (this._isAutoReleaseRes)
            {
                this.unloadOtherRes();
                ResMgr.Inst.cutAtlasReference(this.cacheUIBgUrlList);
                this.cacheUIBgUrlList = [];
                this.uiBgUrl = "";
            }

            //删除UI
            if (destoryUI)
            {
                this.destoryUIPanel();
                // (this as any).UIPanel.destroy();
                // (this as any).UIPanel = null;
            }
        }

        /** 释放动态加载的资源(在界面关闭时或者界面加载完后又不要了时使用) */
        private unloadOtherRes(): void
        {
            //释放UI必要资源
            let tempAtlasAry = this.autoLoadAtlas();

            //这里干掉common，不然会出现闪烁
            //alert的资源设置了不每次销毁， _isAutoReleaseRes = false， 这种频繁的ui每次销毁没意义
            // if(tempAtlasAry)
            // {
            //     let index = tempAtlasAry.indexOf(Pro.UrlMgr.getAtlas("common"));
            //     tempAtlasAry.splice(index, 1);
            // }

            ResMgr.Inst.cutAtlasReference(tempAtlasAry);

            //释放动态加载资源
            ResMgr.Inst.unloadWithUrl(this.autoUnLoadOtherRes());
        }

        /** 需要自动加载的资源列表(子类可继承 ，如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): string[]
        {
            return null;
        }

        //---------------------------------------------------公共属性---------------------------------------------
        /** 面板是否弹出状态 */
        public getIsPopUp(): boolean
        {
            return this.isPopUp;
        }

        /** 面板初始化状态 */
        public getIsInitStatue(): number
        {
            return this.isInitStatue;
        }

        /** 获取面板 */
        public getUI(): Laya.UIComponent
        {
            return (this as any).UIPanel;
        }

        /** 获取UI显示层级 */
        public getAddUILayer(): BaseAddLayer
        {
            return this.addUILayer;
        }

        /** 获取当前UI是否点击空白关闭UI */
        public getClickSpaceCloseUI(): boolean
        {
            return this.clickSpaceCloseUI;
        }

        /** 获取黑色遮罩UI */
        public getDarkUI(): component.UIButton
        {
            return this.getUI()["darkSprite"] as component.UIButton;
        }

        /** 当前界面是否有全屏显示（全屏背景） */
        public isFullSreenShow(): boolean
        {
            if (this.isClosing) { return false; }
            if (!this.getUI()) { return false; }
            let darkUI = this.getDarkUI();
            if (darkUI && darkUI.visible && darkUI.alpha == 1 && this.uiBgUrl) { return true; }
            return false;
        }

        /** 检查UI是否能被重新拉起来 */
        public checkCanDisplayUI(): boolean
        {
            return this.getIsPopUp() && this.getUI() != null;
        }

        /** 隐藏UI */
        public undisplayUI()
        {

            if (!this.getIsPopUp())
            {
                return;
            }

            //隐藏面板
            this.getUI().visible = false;

            //隐藏遮罩
            let darkSprite = this.getDarkUI();
            if (darkSprite != null)
            {
                darkSprite.visible = false;
            }
        }

        /** 重新显示UI */
        public displayUI()
        {

            if (!this.getIsPopUp())
            {
                return;
            }


            //隐藏遮罩
            let darkSprite = this.getDarkUI();
            if (darkSprite != null)
            {
                darkSprite.visible = true;
                darkSprite.parent.addChild(darkSprite);
            }


            //隐藏面板
            this.getUI().visible = true;

            this.getUI().parent.addChild(this.getUI());

            //刷新面板
            this.refreshUI();
        }

        /** 重新设置UI背景 */
        public setUIBG(bgUrl: string)
        {
            if (this.getDarkUI() == null || bgUrl == null || (this.uiBgUrl == bgUrl && this.getDarkUI().getChildAt(0)))
            {
                return;
            }


            //设置UI背景
            let tmpBGImg = this.getDarkUI().getChildAt(0) as Laya.Image;
            if (tmpBGImg == null)
            {
                tmpBGImg = new Laya.Image();
                tmpBGImg.anchorX = 0.5;
                tmpBGImg.anchorY = 0.5;
                // tmpBGImg.scaleX = tmpBGImg.scaleY = GameConfig.WinScaleFit;
                this.getDarkUI().addChild(tmpBGImg);
            }
            // tmpBGImg.scaleX = 1.2;
            // tmpBGImg.scaleY = 1.2;
            tmpBGImg.x = GameConfig.curWidth() >> 1;
            tmpBGImg.y = GameConfig.curHeight() >> 1;
            let maxScale = Math.max(Laya.stage.width / GameConfig.WinWidth, Laya.stage.height / GameConfig.WinHeight);
            tmpBGImg.scale(maxScale, maxScale);
            // tmpBGImg.size(Laya.stage.width, Laya.stage.height);
            if (this.cacheUIBgUrlList.indexOf(bgUrl) < 0)
            {
                this.cacheUIBgUrlList.push(bgUrl);
                ResMgr.Inst.addAtlasReference(bgUrl);
            }
            tmpBGImg.skin = bgUrl;
            this.uiBgUrl = bgUrl;
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        //--------------------------------------------------事件处理----------------------------
        protected addEventMgr(eventType: string | number | CmdType, caller: any, func: Function): void
        {
            if (typeof (eventType) != "string" && typeof (eventType) != "number")
            {
                eventType = eventType.cmdName;
            }
            eventType = eventType.toString();

            if (this.cmdEventDic.containsKey(eventType))
            {
                logW("同一ui界面，请勿重复添加侦听:" + eventType);
                return;
            }
            this.cmdEventDic.put(eventType, new CallBack(caller, func));
            EventMgr.on(eventType, caller, func);
        }

        protected removeEventMgr(eventType: string | number | CmdType, caller: any, func: Function): void
        {
            if (typeof (eventType) != "string" && typeof (eventType) != "number")
            {
                eventType = eventType.cmdName;
            }
            eventType = eventType.toString();

            if (this.cmdEventDic.containsKey(eventType))
            {
                var cb: CallBack = this.cmdEventDic.get(eventType);
                EventMgr.off(eventType, caller, func);

                this.cmdEventDic.remove(eventType);
            }
        }

        protected removeAllEventMgr(): void
        {
            var keys = this.cmdEventDic.getKeys();
            for (var key of keys)
            {
                var cb: CallBack = this.cmdEventDic.get(key);
                EventMgr.off(key, cb.caller, cb.func);
            }
            this.cmdEventDic.clear();
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {

        }

        /**
         * 操作本步引导
         */
        public Guide_Active(step: GuideStep)
        {

        }
    }
}