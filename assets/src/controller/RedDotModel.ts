module Pro
{
    /** 红点模型
     * 关键数据为 state和isRedDot 字段 ， 也可通过此model的Laya.Event.CHANGE事件来监听isRedDot的变化。（注意移除）
     * <p>可通过setupCheckMethod配置检测方法
     * <p>在调用refresh时，会启用检测方法来设置红点值
     * <p>也可配置加入常用的公共事件（道具更新或指定其它事件类型），监听后会自动调用refresh方法。
     * <p>红点模型还有另外一种形态-组合功能： 即可通过child的相关方法， 加入或移除子级红点模型，
     * 当子级中有红点变化时，会自动归纳到本级的红点状态中来
     * @author jason.xu
     */
    export class RedDotModel extends Laya.EventDispatcher
    {
        /** 保存所有红点数据，便于分析 */
        public static allReddotMap = new ds.StringMap<RedDotModel>();
        /** 唯一ID */
        private static _sn = 0;
        private _sn = 0;
        public get sn(): number
        {
            return this._sn;
        }
        constructor(isInstance = true)
        {
            super();
            this.isInstance = isInstance;
            this._sn = RedDotModel._sn++;
            RedDotModel.allReddotMap.put(this._sn, this);
        }

        /** 是否为常驻的 */
        public isInstance = true;

        /** 调试用 */
        public isDestroy = false;
        /** 首次绑定的父级 */
        public parentSn = 0;

        ////////////////////////////// base ////////////////////////////
        protected _state: number = 0;
        /** 当前红点状态(0-无红点  有数字表示红点数量，通常为1表示有红点即可，少量有需要数量的) */
        public get state(): number
        {
            if (!this._isOpen) { return 0; }
            return this._state;
        }
        /** 当前是否有红点 */
        public get isRedDot(): boolean
        {
            return this._isOpen && this._state > 0;
        }

        public setRedDot(value: number): void
        {
            if (!this._isOpen) { value = 0; }
            if (value == this._state) { return; }
            this._state = value;
            this.event(Laya.Event.CHANGE, this);
        }


        /** 刷新红点状态 */
        public refresh(isChildren: boolean = false): void
        {
            if (this.isDestroy)
            {
                logE("refresh reddot is Destroy !!!!!!!!!!!!!!!!!!", this.sn, this.parentSn, this.bindData);
                return;
            }
            if (!this._isOpen) { return; }
            let reddot = 0;
            if (this._checkMethod) { reddot = this._checkMethod.call(this) ? 1 : 0; }

            if (reddot == 0 && this._childModes.length > 0)
            {
                if (isChildren)
                {
                    for (var el of this._childModes)
                    {
                        el.refresh(true);
                    }
                }
                this.sumUpAllChildModel();
            }
            else
            {
                this.setRedDot(reddot);
            }
        }

        private _checkMethod: CallBack;
        /** 配置外部检测红点的方法，在监听到有红点关随的事情触发时，会自动调用此方法
         * 注：此方法必须配备返回值为number或boolen, 表示该红点模型的红点状态
         */
        public setupCheckMethod(caller: any, method: Function): void
        {
            this._checkMethod = new CallBack(caller, method);
            this.refresh();
        }

        protected _isOpen: boolean = true;
        /** 红点开关，受功能开放的影响，有时红点模型需要关闭（或者说是未开放）
         * 注： 外部调用此方法时，请注意与setSystemSwitchId的冲突。
         */
        public setOpenState(isOpen: boolean): void
        {
            if (this._isOpen == isOpen) { return; }
            this._isOpen = isOpen;
            if (isOpen)
            {
                // this.pauseAllGlobalEvents(false);
                this.refresh();
            } else
            {
                this.setRedDot(0);
                // this.pauseAllGlobalEvents();
            }
        }

        /** 红点模型上绑定的数据， 各模块自行支配此字段内容 */
        public bindData: any;

        ////////////////////////////// 子级红点////////////////////////////

        /** 子级红点模型列表（map与array同步，简化遍历效率） */
        protected _childModes: Array<RedDotModel> = [];
        protected _childModesMap = new ds.StringMap<RedDotModel>();
        /** 添加子级红点模型引用
         * @param key 子级的key
         * @param model 外部配置的model, 传入null时会自动分配一个
         * @param bindData 绑定数据，未传值时默认使用key为绑定数据， 也就是如果bindData的key是一样时，此值可不传, 当使用外部传入的model时，此值将失效
         */
        public addChildModel(key: string | number | Long, model: RedDotModel = null, bindData: any = null): RedDotModel
        {
            let mapKey = key + "";
            if (this._childModesMap.get(mapKey)) { return this._childModesMap.get(mapKey); }

            if (!model)
            {
                model = new RedDotModel();
                model.parentSn = this.sn;
                model.bindData = (bindData != null) ? bindData : key;
            }
            this._childModes.push(model);
            this._childModesMap.put(mapKey, model);
            model.on(Laya.Event.CHANGE, this, this.onChildRedDotChange);
            if (model.isRedDot && !this.isRedDot)
            {
                this.setRedDot(1);
            } //只需检测从无到有
            // Laya.timer.callLater(this, this.sumUpAllChildModel);
            return model;
        }
        /** 移除子级红点模型引用 */
        public removeChildModel(key: string | number | Long, isDestroy: boolean = false, isDestroyChilren: boolean = true): RedDotModel
        {
            let model = this._childModesMap.get(key + "");
            if (!model)
            {
                return null;
            }
            let index = this._childModes.indexOf(model);
            if (index < 0)
            {
                logE("!!!!!!!!!!");
            }  //监视，不应该存的异常
            this._childModes.splice(index, 1);
            this._childModesMap.remove(key + "");
            if (model.isRedDot) { this.sumUpAllChildModel(); }  //移掉了带红点的，才需要重置一次， 本身没红点的，移了就移了，无影响
            // Laya.timer.callLater(this, this.sumUpAllChildModel);
            if (isDestroy)
            {
                model.destroy(isDestroyChilren);
            }
            else
            {
                model.off(Laya.Event.CHANGE, this, this.onChildRedDotChange);
            }
            return model;
        }
        public getChildModel(key: string | number | Long)
        {
            return this._childModesMap.get(key + "");
        }
        protected onChildRedDotChange(): void
        {
            if (!this._isOpen)
            {
                return;
            }
            // this.sumUpAllChildModel();
            Laya.timer.callLater(this, this.sumUpAllChildModel);
        }
        /** 归纳子级红点模型状态到本类中 */
        protected sumUpAllChildModel(): void
        {
            if (!this._isOpen) { return; }
            let dotcount = 0; //考虑到红点变更的消息推送频繁程度，仅统计有和无即可，如果有需要呈现数字的，再另行处理
            for (var el of this._childModes)
            {
                if (el.isRedDot)
                {
                    dotcount = 1;
                    break;
                }
            }
            this.setRedDot(dotcount);
        }

        /** 刷新指定子级 */
        public refreshChild(key: string | number, refreshChild: boolean = false): void
        {
            let child = this.getChildModel(key);
            if (child) { child.refresh(refreshChild); }
        }
        /** 获取指定子级的红点状态(简化常用运算) */
        public getChildRedDotState(key: string | number): boolean
        {
            let child = this.getChildModel(key);
            if (child) { return child.isRedDot; }
            return false;
        }


        ////////////////////////////// 全局事件监听, 封装一些常见的红点监控类型， 自行维护红点值 ////////////////////////////
        private _eventMgrDic: ds.StringMap<CallBack>;
        private _listenPlayerItemIds: number[];
        /** 增加道具与消耗品的监听, 有对应道具数量变化时，会自动调用refresh，启用setupCheckMethod传入的方法进行检查红点状态 */
        public setPlayerItemsListener(itemIds: number[]): void
        {
            this._listenPlayerItemIds = itemIds;
            if (itemIds && itemIds.length > 0)
            { this.__addGlobalEventListener(EventNotify.PlayerItemNumChange, this, this.onPlayerItemNumChange); }
            else
            { this.removeGlobalEventListener(EventNotify.PlayerItemNumChange); }
        }
        /** 增加道具与消耗品的监听, 有对应道具数量变化时，会自动调用refresh，启用setupCheckMethod传入的方法进行检查红点状态 */
        public setPlayerItemInfosListener(addItemInfos: cfg.AddItemInfo[]): void
        {
            let itemIds: number[] = [];
            addItemInfos = addItemInfos || [];
            for (var el of addItemInfos)
            {
                itemIds.push(el.itemid);
            }
            this.setPlayerItemsListener(itemIds);
        }

        /** 增加全局事件变化监听，当接收到此事件时，会自动调用refresh，启用setupCheckMethod传入的方法进行检查红点状态
         * @param eventType 监听的全局事件类型
         * @param checkParam 监听事件回调时， 检查此参数与事件携带的参数是否一致, 注： 使用此参数接口时，请保障此参数的类型与全局事件传递的类型是否一致。
         */
        public addGlobalEventRefresh(eventType: string | number, checkParam = null): void
        {
            this.__addGlobalEventListener(eventType, this, this.callLaterRefresh, checkParam);
        }

        /** 增加全局事件监听 */
        private __addGlobalEventListener(eventType: string | number, caller: any, func: Function, checkParam = null): void
        {
            if (!this._eventMgrDic) { this._eventMgrDic = new ds.StringMap<CallBack>(); }
            if (this._eventMgrDic.containsKey(eventType))
            { return; }
            let funcParam = checkParam == null ? func : (param) =>
            {
                if (checkParam == param) { func.call(caller, param); }
            };
            this._eventMgrDic.put(eventType, new CallBack(caller, funcParam));
            if (!this._pauseGlobalEvents)
            {
                EventMgr.on(eventType, caller, funcParam);
            }
        }
        /** 移除全局事件监听 */
        public removeGlobalEventListener(eventType: string | number): void
        {
            if (!this._eventMgrDic) { return; }
            if (!this._eventMgrDic.containsKey(eventType))
            { return; }
            var cb: CallBack = this._eventMgrDic.get(eventType);
            this._eventMgrDic.remove(eventType + "");
            EventMgr.off(eventType, cb.caller, cb.func);
        }

        public removeAllGlobalEvents(): void
        {
            if (!this._eventMgrDic) { return; }
            var keys = this._eventMgrDic.getKeys();
            for (var key of keys)
            {
                var cb: CallBack = this._eventMgrDic.get(key);
                EventMgr.off(key, cb.caller, cb.func);
            }
            this._eventMgrDic.clear();
            this._eventMgrDic = null;
        }

        private _pauseGlobalEvents = false;
        /** 暂停全局事件监听(并非移除) */
        public pauseAllGlobalEvents(isPause: boolean = true): void
        {
            if (this._pauseGlobalEvents == isPause) { return; }
            this._pauseGlobalEvents = isPause;
            if (!this._eventMgrDic) { return; }
            var keys = this._eventMgrDic.getKeys();
            for (var key of keys)
            {
                var cb: CallBack = this._eventMgrDic.get(key);
                if (isPause) { EventMgr.off(key, cb.caller, cb.func); }
                else { EventMgr.on(key, cb.caller, cb.func); }
            }
        }


        private _systemSwitchId: number = -1;
        /** 绑定系统功能开放id
         * 注： 此值会直接影响OpenState的值， 外部如果有自行配置setOpenState时，请注意冲突。
          */
        public setSystemSwitchId(systemId: number): void
        {
            let isOpen = PlayerDataMgr.checkSystemSwitchOpen(systemId, false);
            this.setOpenState(isOpen);
            if (!isOpen)
            { // 如果没有开放，则监听系统开放事件，直接开放为止
                this._systemSwitchId = systemId;
                this.__addGlobalEventListener(EventNotify.System_Switch_Open_Update, this, this.onUpdateSystemSwitch);
            }
        }

        /** 全局系统功能开放 */
        private onUpdateSystemSwitch(systemId: number): void
        {
            if (systemId == this._systemSwitchId)
            {
                this._systemSwitchId = 0;
                this.setOpenState(true);
                this.removeGlobalEventListener(EventNotify.System_Switch_Open_Update);
            }
        }

        /** 全局道具变化 */
        private onPlayerItemNumChange(fID: number): void
        {
            if (!this._isOpen) { return; }
            if (this._listenPlayerItemIds.indexOf(fID) >= 0)
            {
                this.callLaterRefresh();
            }
        }

        private callLaterRefresh(): void
        {
            if (this.isDestroy)
            {
                logE("callLaterRefresh reddot is Destroy !!!!!!!!!!!!!!!!!!", this.sn);
                return;
            }
            Laya.timer.callLater(this, this.refresh);
        }


        //////////////////////////////////////////////////////////////////////////////////////
        /** 清理 */
        public cleanUp(isDestroyChild: boolean = false): void
        {
            this.offAll();
            for (var el of this._childModes)
            {
                if (isDestroyChild) { el.destroy(true); }
                else { el.off(Laya.Event.CHANGE, this, this.onChildRedDotChange); }

            }
            this.bindData = null;
            this._state = 0;
            this._systemSwitchId = 0;
            this._pauseGlobalEvents = false;
            this._childModes = [];
            this._childModesMap.clear();
            this.removeAllGlobalEvents();
        }

        public destroy(isDestroyChild: boolean): void
        {
            this.cleanUp(isDestroyChild);
            this.isDestroy = true;
            Laya.timer.clearAll(this);
            RedDotModel.allReddotMap.remove(this.sn + "");
        }
    }
}