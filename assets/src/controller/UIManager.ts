
module Pro
{
    /**
     * UI管理器
     */
    export class UIManager
    {
        /**
         * 单例对象
         */
        private static _inst: UIManager;

        /**
         * 系统存在所有的UI管理器
         */
        private mediatorMap: ds.StringMap<IMediator>;

        /**
         * 当前正打开显示的UI队列
         */
        private UICurrentList: Array<IMediator>;

        /**
         * 非功能UI，只记录，不需要队列管理，closeAll的时候清空
         */
        private OthersUIList: Array<BaseMediator>;

        /**
         * 当前需要自动弹出的UI队列
         */
        private AutoOpenUIList: Array<BaseOpenUIData>;

        /**
         * 当前需要自动弹出功能是否开启
         */
        private InAutoLogic: boolean = false;

        /**
         * 当前处于关闭所有UI的状态中(防止关闭UI的同时，触发了其他UI的操作)
         */
        private InClear = false;

        /** 当前处于正在打开新的UI中（防止打开新UI关闭旧UI时，会执行其它UI队列执行的操作） */
        private InOpening = false;


        //-----------------------------------------------初始化-----------------------------------------

        public static get Inst(): UIManager
        {
            if (UIManager._inst == null)
            { UIManager._inst = new UIManager(); }

            return UIManager._inst;
        }

        constructor()
        {
            this.mediatorMap = new ds.StringMap<IMediator>();
            this.UICurrentList = new Array<IMediator>();
            this.OthersUIList = new Array<BaseMediator>();
            this.AutoOpenUIList = new Array<BaseOpenUIData>();
            this.InAutoLogic = false;

            EventMgr.on(EventNotify.Guide_Active, this, this.Guide_Active);
            EventMgr.on(EventNotify.Guide_Enter, this, this.Guide_Enter);
        }

        /** 初始化UI管理器 */
        public init()
        {
            for (let tempName in PanelNotify)
            {
                if (tempName.search("Open") == 0)
                {
                    let tempUIMedName = PanelNotify[tempName];
                    let tempUIType = Pro[tempUIMedName];
                    if (tempUIType != null)
                    {
                        let tempUIMeditor = new tempUIType() as IMediator;
                        tempUIMeditor.mediatorName = tempUIMedName;
                        this.mediatorMap.put(tempUIMedName, tempUIMeditor);
                    }
                    else
                    {
                        logE("UI管理器" + tempUIMedName + "不存在");
                    }
                }
            }
        }


        //-----------------------------------------------新手引导事件控制--------------------------------------------
        private Guide_Active(step: GuideStep)
        {
            if (this.UICurrentList.length == 0)
            {
                return;
            }
            let tmpUI = this.UICurrentList[this.UICurrentList.length - 1];
            tmpUI.getIsInitStatue() == 2 && tmpUI.Guide_Active != null && tmpUI.Guide_Active(step);
        }

        private Guide_Enter(step: GuideStep)
        {
            if (this.UICurrentList.length == 0)
            {
                return;
            }
            let tmpUI = this.UICurrentList[this.UICurrentList.length - 1];
            tmpUI.getIsInitStatue() == 2 && tmpUI.Guide_Enter != null && tmpUI.Guide_Enter(step);
        }

        //-----------------------------------------------外部操作UI开启、关闭-----------------------------------------
        /**
         * 直接弹出UI
         * @param uiOpenData UI开启状态
         * @param backUIType 打开时背后界面的处理方式，默认不做任何处理
         */
        public forceOpen(uiOpenData: BaseOpenUIData, backUIType: BaseBackUIType = BaseBackUIType.None): IMediator
        {
            if (!this.isCanOpen(uiOpenData))
            {
                return;
            }
            let tmpMeditor = this.getUIMeditorInOpenList(uiOpenData.name)
            if (tmpMeditor)
            {
                tmpMeditor.resetUIOpenData(uiOpenData);
                //异常处理，有时候会有界面在回退时被冲顶了，visible没有还原成功
                if (tmpMeditor.getIsInitStatue() == 2 && tmpMeditor.getUI())
                {
                    tmpMeditor.displayUI();
                }
                return tmpMeditor;
            }
            else
            {
                uiOpenData.backUIType = backUIType;
                return this.pushUIMeditorToOpenList(uiOpenData);
            }
        }

        private isCanOpen(uiOpenData: BaseOpenUIData): boolean
        {
            var isCanOpen = true;
            var isWxCx: boolean = PlatformData.platformType == PlatformData.EnumPlatformType.wx_cx;
            if (isWxCx)
            {
                isCanOpen = this.isWxCXCanOpen(uiOpenData);
            }
            return isCanOpen;
        }

        private isWxCXCanOpen(uiOpenData: BaseOpenUIData)
        {
            if (WxCxSdkSystem.isNeedHide(uiOpenData.name))
            {
                var isCanOpen = qingjs.instance.canPay();
                if(uiOpenData.name == PanelNotify.Open_TimeLimitActivity && !isCanOpen)
                {
                    TipsUtils.showTips("钻石不足");
                }
                return isCanOpen
            }
            return true;
        }

        /**
         * 用作不确定UI什么时候弹出，最终目标防止UI叠层和错乱
         * @param uiOpenData UI开启状态
         * @param forceQuene 强制缓存到队列，等待其他UI关闭后自动触发
         */
        public pushAutoQueue(uiOpenData: BaseOpenUIData, forceQuene: boolean = false)
        {
            if (!this.InAutoLogic || forceQuene || (this.InAutoLogic && this.UICurrentList.length > 0))
            {
                this.AutoOpenUIList.push(uiOpenData);
                if (uiOpenData.orderIndex < 0)
                { uiOpenData.orderIndex = this.AutoOpenUIList.length; }
                else
                { this.AutoOpenUIList.sort(function (a, b) { return a.orderIndex > b.orderIndex ? 1 : -1 }); }
            }
            else
            {
                this.pushUIMeditorToOpenList(uiOpenData);
            }
        }

        /**
        * 根据UI名称关闭UI
        */
        public closeByName(name: string): void
        {
            let tmpMeditor = this.getUIMeditorInOpenList(name);
            if (tmpMeditor)
            {
                tmpMeditor.forceCloseUI();
            }
        }

        /** 将一个非常规的UI添加到UI队列中 */
        public addOthersUI(tempPageUI: BaseMediator)
        {
            this.OthersUIList.push(tempPageUI);
        }

        /** 将一个非常规的UI从UI队列中移除 */
        public deleteOthersUI(tempPageUI: BaseMediator)
        {
            let index = this.OthersUIList.indexOf(tempPageUI);
            if (index >= 0)
            {
                this.OthersUIList.splice(index, 1);
            }
        }

        /** 是否有界面正在交互中，包含队列中的 */
        public getIsShowingUI(): boolean
        {
            return this.AutoOpenUIList.length > 0 || this.UICurrentList.length > 0;
        }

        /** 当前是否有全屏带背景界面显示 */
        public getIsShowFullScreenUI(): boolean
        {
            for (let mediator of this.UICurrentList)
            {
                if (mediator.isFullSreenShow()) { return true; }
            }
            return false;
        }

        //-----------------------------------------------外部操作自动弹出UI队列-----------------------------------------
        /**
         * 开启自动按队列弹出UI
         */
        public doAutoQueneUI()
        {

            this.InAutoLogic = true;

            //最后弹出新功能解锁UI
            if (this.AutoOpenUIList.length == 0)
            {
                return;
            }

            if (this.InOpening) { return; }
            //弹出托管UI
            let uiOpenData = this.AutoOpenUIList.shift();
            if (uiOpenData != null)
            {
                this.pushUIMeditorToOpenList(uiOpenData);
            }
        }

        /**
         * 清空自动弹出的UI队列
         */
        public clearAutoQuene()
        {
            for (let ui of this.AutoOpenUIList)
            {
                ui.stopOpen();
            }
            this.AutoOpenUIList.splice(0, this.AutoOpenUIList.length);
        }

        /**
         * 设置是否自动弹出的UI队列
         */
        public setAutoQueneStatue(statue: boolean)
        {
            this.InAutoLogic = statue;
        }

        /**
         * 获取当前是否处于自动弹出UI的状态
         */
        public getAutoQueueStatue(): boolean
        {
            return this.InAutoLogic;
        }

        //-----------------------------------------------基础方法-----------------------------------------
        /**
         * UI队列发生变化
         */
        private updateUIQuene()
        {
            let normalUINum = this.UICurrentList.length;
            if (normalUINum > 0)
            {
                //EventMgr.trigger(EventNotify.PAUSEGAME);
            }
            else
            {
                //EventMgr.trigger(EventNotify.RESUMEGAME);
                if (this.InAutoLogic)
                {
                    this.doAutoQueneUI();
                }
            }
        }

        /** 判断UI是否在显示状态中 */
        public checkUIShowState(meditorName: string, coverQueue: boolean): boolean
        {
            let mediator = this.getUIMeditorInOpenList(meditorName);
            if (mediator) { return true; }

            if (coverQueue)
            {
                for (let el of this.AutoOpenUIList)
                {
                    if (el.name == meditorName)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
        /**
         * 根据UI的名称获取当前UI队列正在显示它的管理器
         *  */
        public getUIMeditorInOpenList(meditorName: string): IMediator
        {
            for (let i = 0; i < this.UICurrentList.length; i++)
            {
                if (this.UICurrentList[i].mediatorName == meditorName)
                {
                    return this.UICurrentList[i];
                }
            }
            return null;
        }

        /** 将一个UI管理器在UI队列中打开 */
        private pushUIMeditorToOpenList(uiOpenData: BaseOpenUIData): IMediator
        {
            let tempUIMeditor = this.mediatorMap.getValue(uiOpenData.name);
            tempUIMeditor.setOpenData(uiOpenData);
            tempUIMeditor.openUI();
            return tempUIMeditor;
        }

        /**
         * 弹出一个UI到队列中,不要直接调用本函数
         * @param tempPageUI UI管理器
         * @param hideBackUI 是否隐藏背景UI
         */
        public openUI(tempPageUI: IMediator)
        {
            this.InOpening = true;
            //处理背后的UI
            if (this.UICurrentList.length > 0)
            {

                let tmpBackUIType = tempPageUI.UIOpenData.backUIType;

                //关闭背后所有UI
                if (tmpBackUIType == BaseBackUIType.CloseQuene)
                {
                    this.closeCurrentList();
                }//隐藏背后UI
                else if (tmpBackUIType == BaseBackUIType.HideBackUI)
                {
                    let lastMeditor = this.UICurrentList[this.UICurrentList.length - 1];
                    lastMeditor.undisplayUI();
                }//关闭背后UI
                else if (tmpBackUIType == BaseBackUIType.CloseBackUI)
                {
                    let lastMeditor = this.UICurrentList[this.UICurrentList.length - 1];
                    lastMeditor.forceCloseUI();
                }

            }

            //UI不重复添加
            let tempIndex = this.UICurrentList.indexOf(tempPageUI);
            if (tempIndex == -1)
            {
                this.UICurrentList.push(tempPageUI);
            }
            else
            {
                this.UICurrentList.splice(tempIndex, 1);
                this.UICurrentList.push(tempPageUI);
            }

            //非顶层UI打开时，玩家状态栏切换通知
            if (tempPageUI.getAddUILayer() != BaseAddLayer.TopUI)
            {
                EventMgr.trigger(EventNotify.PlayerChangeResUI, tempPageUI.mediatorName);
            }


            //UI队列数据变化
            this.updateUIQuene();

            this.InOpening = false;

            return tempPageUI;
        }

        /**
         * 移除一个UI从队列中,不要直接调用本函数
         */
        public closeUI(tempPageUI: IMediator)
        {
            if (this.InClear)
            {
                return;
            }

            //判断是否在队列中
            let tempIndex = this.UICurrentList.indexOf(tempPageUI);
            if (tempIndex != -1)
            {
                //从队列移除
                this.UICurrentList.splice(tempIndex, 1);

                //将背后的UI重新刷新显示
                let tmpBackUIType = tempPageUI.UIOpenData.backUIType;
                if (this.UICurrentList.length > 0)
                {
                    let lastMeditor = this.UICurrentList[this.UICurrentList.length - 1];
                    if (lastMeditor.checkCanDisplayUI() && (tmpBackUIType != BaseBackUIType.None || lastMeditor.getUI().visible))
                    {
                        lastMeditor.displayUI();
                        EventMgr.trigger(EventNotify.PlayerChangeResUI, lastMeditor.mediatorName);
                    }
                    else
                    {
                        EventMgr.trigger(EventNotify.PlayerChangeResUI, null);
                    }
                }
                else
                {
                    EventMgr.trigger(EventNotify.PlayerChangeResUI, null);
                }
                EventMgr.trigger(EventNotify.UI_Show_Change, false);
            }

            //UI队列数据变化
            this.updateUIQuene();
        }

        public getMediator(uiname: string): IMediator
        {
            return this.mediatorMap.getValue(uiname);
        }

        /**
         * UI队列正处于清空状态中
         * */
        public getInClear(): boolean
        {
            return this.InClear;
        }

        /** 消毁所有UI界面 */
        public destroyAllUI(): void
        {
            let uiKeys = this.mediatorMap.getKeys();
            for (const key of uiKeys)
            {
                let mediator = this.mediatorMap.get(key);
                mediator.forceDestroyUI();
            }
        }

        // /**
        //  * 关闭所有UI，以及清空所有队列，清空状态
        //  */
        // public closeAllUI()
        // {
        //     //清理当前队列中的UI
        //     this.closeCurrentList(true);

        //     //清理othersUIList中的ui
        //     this.OthersUIList.forEach(element =>
        //     {
        //         element.forceCloseUI();
        //     });
        //     this.OthersUIList.splice(0, this.OthersUIList.length);

        //     //清空自动弹出的UI队列
        //     this.clearAutoQuene();
        //     this.InAutoLogic = false;

        //     //隐藏等待UI
        //     WaitPanelUtils.hideWaitPanel();
        // }

        /** 关闭除指定界面以外的其它所有正在显示中的界面 */
        public CloseOtherUI(retainUI: string[]): void
        {
            //清空开始
            this.InClear = true;
            for (let i = this.UICurrentList.length - 1; i >= 0; i--)
            {
                let element = this.UICurrentList[i];
                if (!element)
                {
                    this.UICurrentList.splice(i, 1);
                    continue;
                }
                if (retainUI.indexOf(element.mediatorName) < 0)
                {
                    element.forceCloseUI();
                    this.UICurrentList.splice(i, 1);
                }
            }
            //清空结束
            this.InClear = false;
            this.updateUIQuene();
        }

        /**
         * 关闭当前正显示的所有界面
         * @param isReset 是否处于清空状态
         */
        public closeCurrentList(isReset: boolean = false)
        {
            //清空开始
            this.InClear = true;

            //清空队列
            this.UICurrentList.forEach(element =>
            {
                element.forceCloseUI();
                // element.closeUI();
            });
            this.UICurrentList.splice(0, this.UICurrentList.length);

            //清空结束
            this.InClear = false;

            //玩家状态栏切换通知
            EventMgr.trigger(EventNotify.PlayerChangeResUI, null);

            //隐藏等待UI
            WaitPanelUtils.hideWaitPanel();

            //当前是否处于清空状态
            if (!isReset)
            {
                this.updateUIQuene();
            }
            EventMgr.trigger(EventNotify.UI_Show_Change, false);
        }

        /**
         * 隐藏、显示 当前在队列中的所有界面
         */
        public visibleCurrentList(isVisbile: boolean)
        {

            //队列中UI操作
            for (let i = 0; i < this.UICurrentList.length; i++)
            {
                if (!isVisbile)
                {
                    this.UICurrentList[i].undisplayUI();
                }
                else
                {
                    let tmpBackUIType = BaseBackUIType.None;
                    if (i + 1 < this.UICurrentList.length)
                    {
                        tmpBackUIType = this.UICurrentList[i + 1].UIOpenData.backUIType;
                    }
                    if (tmpBackUIType != BaseBackUIType.HideBackUI)
                    {
                        this.UICurrentList[i].displayUI();
                    }
                }
            }

            //玩家状态栏切换通知
            if (!isVisbile)
            {
                EventMgr.trigger(EventNotify.PlayerChangeResUI, null);
            }
            else
            {
                if (this.UICurrentList.length > 0)
                {
                    EventMgr.trigger(EventNotify.PlayerChangeResUI, this.UICurrentList[this.UICurrentList.length - 1].mediatorName);
                }
            }
        }
    }
}
