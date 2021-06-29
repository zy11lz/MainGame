
module Pro
{
    var BaseRoleID: number = 1;
    export function getRoleID(): number
    {
        //循环使用ID
        if (BaseRoleID > 10000)
        {
            BaseRoleID = 0;
        }
        return BaseRoleID++;
    }

    export enum RoleResType
    {
        /** 回合战斗 */
        Attack = 1,
        /** 移动资源 */
        Walk,
        /** 形象展示 */
        Show,
        /** 挂机战斗 */
        Hung
    }

    /**
     * 场景中有怪物绘制逻辑
     */
    export class BaseRole extends Laya.EventDispatcher implements common.Ipool
    {

        private static $_instanceCnt = 0;
        /**
         * 实力化了多少个
         */
        private static $_uniqIndex = 0;


        protected destoryed: boolean;

        //-----------------------------------------------------------------------------------------
        /**
         * 是否需要刷新逻辑
         */
        private _isUpdate: boolean = true;

        /**
         * 唯一id
         */
        private _uniqId: number = 0;

        /**
         * 相对BaseRole对象的唯一ID
         */
        protected tagIndex: number = 0;

        //------------------------------------------动画类型----------------------------------
        /** 当前模型ID */
        protected resoureID: number = 0;

        /** 当前资源模式 */
        protected useResType: RoleResType;

        /**  当前动作   */
        private _actionStatue = RoleActionStatue.stand;
        public get actionStatue()
        {
            return this._actionStatue;
        }
        public set actionStatue(value)
        {
            this._actionStatue = value;
        }

        //------------------------------------------动画外观----------------------------------
        /** 动画播放速率    */
        private _actionSpeed = 1;

        /** 是否显示外观 */
        private isWatchSuit = true;
        /**表里配置战斗缩放值 */
        public fightScale: number

        //------------------------------------------动画播放----------------------------------
        /**   角色模型显示 */
        protected actionUI: Laya.Sprite;
        protected effNodeContiner: Laya.Sprite;
        protected _skeletonPlayer: spine.ISkelPlayer;//= new SkeletonPlayer();

        /** 角色模型X翻转    */
        protected actionFlipX: boolean = false;
        //-------------------------------------------组建数据----------------------------------
        /**  角色阴影状态  */
        // public shadeUI: ProUI.Ani.hero.ani_eff_diUI;

        //-----------------------------------------自身效果状态管理-----------------------------
        /** 当前显示的特效状态 */
        private skObjDIC: Laya.Dictionary = new Laya.Dictionary();

        //-----------------------------自身移动状态----------------------------
        /** 目标点    */
        protected targetPos: Laya.Point;

        /** 是否在移动中  */
        protected targetInMove: boolean = false;

        /**  移动速度   */
        protected targetSpeed: Laya.Point;

        /**  * 角色从A->B的单位移动速度  */
        protected targetMSpeed = 4;

        /**  移动完成需要触发下一步操作，比如回合开始 */
        protected targetIsOperation = false;

        /**  当前目标挂机点索引   */
        protected targetHangIndex = -1;
        protected _debugTxt: Laya.Text;
        // protected _isRecyle = false;

        private _continer: Laya.Sprite;

        public poolSign: common.PoolSign
        private _alpha: number;
        private _parent: Laya.Sprite;
        public get parent(): Laya.Sprite
        {
            return this._parent;
        }
        public get alpha(): number
        {
            return this._alpha;
        }
        public set alpha(value: number)
        {
            this._alpha = value;
            this._continer.alpha = value;
        }

        public get continer(): Laya.Sprite
        {
            return this._continer;
        }

        private _x: number;
        public get x(): number
        {
            return this._x;
        }
        public set x(value: number)
        {
            this._x = value;
            this._continer.x = value;
        }
        private _y: number;
        public get y(): number
        {
            return this._y;
        }
        public set y(value: number)
        {
            this._y = value;
            this._continer.y = value;
        }

        public dieStat: boolean = false;

        //----------------------------------------初始化------------------------------
        constructor(showShadow: boolean = true)
        {
            super();
            this._continer = new Laya.Sprite();
            this.poolSign = new common.PoolSign();
            BaseRole.$_instanceCnt++;
            // this._baseUniqId = BaseRole.$_uniqIndex++;
            //创建统一得脚底阴影
            if (showShadow)
            {
                // let shadowClone = Public.PoolMgr.getItem("ani_eff_diUI") as ProUI.Ani.hero.ani_eff_diUI;
                // if (shadowClone == null)
                // {
                //     shadowClone = new ProUI.Ani.hero.ani_eff_diUI();
                // }
                // shadowClone.anchorX = 0.5;
                // shadowClone.anchorY = 0.5;
                // shadowClone.scale(0.6, 0.6);
                // this.shadeUI = shadowClone;
                // this.shadeUI.visible = true;
            }
            this.actionUI = new Laya.Sprite();

            if (GlobalData.isUseWebgl)
            {
                //this._skeletonPlayer = new spine.SpinePlayer();
            } else
            {
                this._skeletonPlayer = new LayaPlayer();
            }
            this.actionUI.addChild(this._skeletonPlayer as any);
            this._continer.addChild(this.actionUI);
            this.effNodeContiner = new Laya.Sprite();
            this._continer.addChild(this.effNodeContiner);
            if (GlobalData.isShowDebugInfo)
            {
                this._debugTxt = new Laya.Text();
                this._debugTxt.width = 150;
                this._debugTxt.fontSize = 22;
                this._debugTxt.align = "center";
                this._debugTxt.color = "#FFFFFF";
                this._debugTxt.text = ""
                this._debugTxt.y = -200;
                this._debugTxt.x = -75;
                this.effNodeContiner.addChild(this._debugTxt);
            }
            this._skeletonPlayer.on(Laya.Event.COMPLETE, this, this.onAniPlayComplete);
            this._skeletonPlayer.on(Laya.Event.STOPPED, this, this.onAniPlayStoped);
            this._skeletonPlayer.on(Laya.Event.LABEL, this, this.onSkelPlayerLabel);
            this.initModelUI();
        }


        /**
         * 总共实例化了多少个
         */
        static get instnaceCnt(): number
        {
            return BaseRole.$_instanceCnt;
        }

        // get skeletonPlayer(): spine.ISkelPlayer
        // {
        //     return this._skeletonPlayer;
        // }

        /**
         * 唯一id
         */
        public get baseUniqId(): number
        {
            return this._uniqId;
        }

        public get isUpdate(): boolean
        {
            return this._isUpdate;
        }
        public set isUpdate(value: boolean)
        {
            this._isUpdate = value;
        }

        public get isFree()
        {
            return this.poolSign.isFree;
        }

        public isResReady()
        {
            if (this._skeletonPlayer)
            {
                return this._skeletonPlayer.isResReady();
            }
            return false
        }
        onAniPlayComplete()
        {

        }

        onAniPlayStoped()
        {
            let actionStatuet = this.actionStatue;
            if (this.actionStatue == RoleActionStatue.skill1 || this.actionStatue == RoleActionStatue.skill2 ||this.actionStatue == RoleActionStatue.skill1_a ||this.actionStatue == RoleActionStatue.skill1_b ||
                this.actionStatue == RoleActionStatue.attack || this.actionStatue == RoleActionStatue.hurt
                || this.actionStatue == RoleActionStatue.win)
            {
                this.playAction(this.useResType == RoleResType.Hung ? RoleActionStatue.move : RoleActionStatue.stand);

            }
            this.event(RoleActionEvent.ROLE_ACTION_END, actionStatuet);
        }

        onSkelPlayerLabel(data)
        {
            this.event(Laya.Event.LABEL, data);
        }

        //------------------------------------------属性-------------------------------
        /** 获取识别ID */
        public getUnitID(): number
        {
            return this.tagIndex;
        }

        /** 获取坐标 */
        public get position(): Laya.Point
        {
            return new Laya.Point(this.x, this.y);
        }

        /** 获取坐标 */
        public set position(value: Laya.Point)
        {
            this.pos(value.x, value.y);
        }

        /** 获取坐标 */
        public pos(x: number, y: number)
        {
            this.x = x;
            this.y = y;
        }

        /** 获取动效速度 */
        public get actionSpeed(): number
        {
            return this._actionSpeed;
        }

        /** 设置动效速度 */
        public set actionSpeed(value: number)
        {
            this._actionSpeed = value;
            this._skeletonPlayer.playbackRate(value);
        }
        /** buff效果最后漂浮的时间*/
        private _lastBuffTime:number=0;
        public set lastBuffTime(value:number){
            this._lastBuffTime=value;
        }
        public get lastBuffTime():number{
            if(this._lastBuffTime>TimeController.currTimer){
                return this._lastBuffTime;
            }
            return TimeController.currTimer
        }
        /** 获取是否显示外观 */
        public get isWatching(): boolean
        {
            return this.isWatchSuit;
        }

        /** 设置是否显示外观 */
        public setIsWatching(value: boolean)
        {
            this.isWatchSuit = value;
        }

        /** 获取资源ID */
        public getResourceID(): number
        {
            return this.resoureID;
        }
        /**
         * 是否点击到角色
         */
        public isTouchedFrame(pos: Laya.Point)
        {
            if (pos.x >= this.x - 50 && pos.x < this.x + 50 &&
                pos.y >= this.y - 100 && pos.y <= this.y)
            {
                return true;
            }
            return false;
        }

        /**
         * 设置动画X轴翻转
         */
        public setActionFlipX(value: boolean)
        {
            this.actionFlipX = value;
            // this._skeletonPlayer.flipX = value;
            this.actionUI.scaleX = this.actionFlipX ? -1 : 1;

        }

        /**
         * 获取动画X轴翻转
         */
        public getActionFlipX(): boolean
        {
            return this.actionFlipX;
        }

        //------------------------------------------Overrider------------------------------
        /**
         * 循环使用的对象需要重置数据
         */
        public resetRes(resID: number, resType: RoleResType, autoUpdate = false): void
        {
            // if (!this._isRecyle)
            // {
            //     throw new Error("没回收的模型，调用reset？？？？")
            // }
            this._uniqId = BaseRole.$_uniqIndex++;
            this.tagIndex = Pro.getRoleID();
            this.isUpdate = true;
            this.resoureID = resID;
            this.useResType = resType;
            //自动控制刷新逻辑
            Laya.timer.clear(this, this.update);
            if (autoUpdate)
            {
                Laya.timer.frameLoop(1, this, this.update);
            }
            //加载资源
            // if (this.isWatching)
            this.loadModelRes();
            if (this.actionStatue != null)
            {
                this.playAction(this._actionStatue);
            }
        }

        loadModelRes()
        {
            var skResName = cfg.PetSkinCfgData.getSkelNameById(this.resoureID);// SkResMapping.getSkResByResId(this.resoureID)
            let tmpActionResPath = UrlMgr.getModelSkUrl(skResName);
            this._continer.name = skResName;
            this.fightScale = cfg.PetSkinCfgData.getFightScaleById(this.resoureID);
            (this._skeletonPlayer as LayaPlayer).fightScale = this.fightScale;

            this._skeletonPlayer.setRes(tmpActionResPath);
        }

        /**
         * 刷新逻辑
         */
        public update(): boolean
        {
            if (this.isUpdate == false)
            {
                return false;
            }
            //当前时间点
            let currTimer = Laya.timer.currTimer;
            //特效逻辑循环
            this.updateEffectStatue(currTimer);
            //移动逻辑
            this.updateMoving();
            //UI状态跟随
            // if (this.shadeUI) this.shadeUI.pos(this.x, this.y);
            return;
        }

        /**
         * 初始化形象展示
         */
        private initModelUI()
        {
            //属性设置
            // this.addChildAt(this.actionUI, 0);
            this.actionUI.visible = true;
            this.actionUI.scaleX = this.actionFlipX ? -1 : 1;
            this.actionUI.scaleY = 1;
            this.actionUI.alpha = 1;
            this.actionUI.y = 0;
            //设置移动状态
            this.playAction(this.actionStatue);
        }

        /**
         * 回收资源
         */
        public recycleRes(): void
        {
            // this.reset();
            this.release();
        }


        /**
         * 回收阴影
         * */
        private destoryShaderUI()
        {
            // if (this.shadeUI != null)
            // {
            //     this.shadeUI.y = -100
            //     this.shadeUI.removeSelf();
            //     Public.PoolMgr.recoverItem("ani_eff_diUI", this.shadeUI);
            //     this.shadeUI = null;
            // }
        }


        /**
         * 显示隐藏整体对象
         */
        protected controlViewVisible(isVisible: boolean)
        {
            this.updateEffectStatue(0);
            if (isVisible == true && this.dieStat == true)
            {
                let a = 1;
            }
            this.actionUI.visible = isVisible;
            this.isUpdate = isVisible;
            if (isVisible && this.actionUI != null)
            {
                Laya.timer.clearAll(this.actionUI);
                Laya.Tween.clearAll(this.actionUI);
                this.actionUI.alpha = 1;
            }
        }

        //-----------------------------------------------------移动管理--------------------------------
        /**
         * 角色移动逻辑
         * */
        protected updateMoving()
        {
            //角色移动
            if (this.targetInMove)
            {

                this.pos(this.x + this.targetSpeed.x, this.y + this.targetSpeed.y);
                if (this.targetPos.distance(this.x, this.y) < (this.targetMSpeed + 1))
                {
                    this.pos(this.targetPos.x, this.targetPos.y);
                    this.stopMoving();
                }
            }
        }

        /**
         *  获取角色是否在移动中
         *  */
        public getInMove(): boolean
        {
            return this.targetInMove;
        }

        /**
         * 移动到目标点
         * @param pos 目标点
         * @param isOperation 移动点是操作事件
         * */
        public gotoPosition(pos: Laya.Point, isOperation: boolean = false): boolean
        {

            //计算目标点是否在角色附近
            if (!this.targetInMove && pos.distance(this.x, this.y) < this.targetMSpeed)
            {

                //停止移动状态
                this.stopMoving();

                return false;
            }

            //记录目标点
            this.targetPos = new Laya.Point(pos.x, pos.y);
            this.targetInMove = true;
            this.targetIsOperation = isOperation;

            //播放移动状态
            this.playAction(RoleActionStatue.move);
            this.setActionFlipX(this.targetPos.x < this.x);

            //计算速度
            let watchRota = Global.WatchRotation(this.targetPos, new Laya.Point(this.x, this.y));
            let speedMoveX = Math.cos(watchRota * Math.PI / 180) * this.targetMSpeed;
            let speedMoveY = -Math.sin(watchRota * Math.PI / 180) * this.targetMSpeed;
            this.targetSpeed = new Laya.Point(speedMoveX, speedMoveY);

            return true;
        }

        /** 停止移动 */
        public stopMoving(): boolean
        {
            this.targetInMove = false;



            //角色还没有到达指定点，战斗就已经开始了
            this.playAction(this.useResType == RoleResType.Hung ? RoleActionStatue.move : this.actionStatue == RoleActionStatue.move ? RoleActionStatue.stand : this.actionStatue);


            //主角继续下一个挂机点
            if (this.targetHangIndex != -1)
            {
                let cutTarget = GameConfig.MapHangUp[this.targetHangIndex];
                if (cutTarget.distance(this.x, this.y) < (this.targetMSpeed + 1))
                {
                    this.targetHangIndex++;
                    if (this.targetHangIndex >= GameConfig.MapHangUp.length)
                    {
                        this.targetHangIndex = 0;
                    }
                    this.gotoPosition(GameConfig.MapHangUp[this.targetHangIndex]);
                }
                else
                {
                    this.targetHangIndex = this.findRecentlyTarget();
                    this.gotoPosition(GameConfig.MapHangUp[this.targetHangIndex]);
                }
            }

            return true;
        }

        /** 角色当前距离最近的地图目标点 */
        private findRecentlyTarget(): number
        {
            let tmpLen = -1;
            let tmpIndex = -1;
            for (let i = 0; i < GameConfig.MapHangUp.length; i++)
            {
                let tmpLen2 = GameConfig.MapHangUp[i].distance(this.x, this.y);
                if (tmpIndex == -1 || tmpLen2 < tmpLen)
                {
                    tmpIndex = i;
                    tmpLen = tmpLen2;
                }
            }
            return tmpIndex;
        }

        //-----------------------------------------------------动作管理--------------------------------
        /**
         * 播放一个动画，返回动画执行时间
         */
        public playAction(curStatue: RoleActionStatue, exTime: number = GameConfig.EffDetalTime): number
        {
            if (curStatue == null)
            {
                if (GlobalData.isRelease)
                {
                    curStatue = RoleActionStatue.stand;
                } else
                {
                    throw new Error("要播放的动作为空是干啥？？")
                }
            }
            if (this.actionStatue != curStatue)
            {
                this.actionStatue = curStatue;
            }
            var isUseCache: boolean = this.actionStatue.userCache;
            isUseCache = false;
            this._skeletonPlayer.play(this.actionStatue.actionName, this.actionStatue.isLoop, true, isUseCache);
            return this.getActionTime(curStatue);
        }

        /**
         * 获取动作执行的时间
         */
        public getActionTime(curStatue: RoleActionStatue, exTime = 1): number
        {
            return this._skeletonPlayer.getActionDuration(curStatue.actionName) * exTime / this._actionSpeed;
            // return this.getActionFramesCount(curStatue) * exTime / this.actSpeed;
        }

        //------------------------------------特效管理---------------------------------
        /**
         * 回收怪物所受特效逻辑
         */
        protected updateEffectStatue(currTimer: number)
        {
            let tempIndex = 0;
            while (tempIndex < this.skObjDIC.keys.length)
            {
                let tempKey = this.skObjDIC.keys[tempIndex] as string;
                let tempInfo = this.skObjDIC.get(tempKey) as Array<any>;
                let tempObj = tempInfo[0] as EffNode;
                let tempTime = tempInfo[1] as number;
                if (currTimer <= 0 || (currTimer > 0 && tempTime > 0 && currTimer > tempTime))
                {
                    //回收资源
                    if (tempObj != null) { tempObj.removeSelf(); }

                    //移除状态
                    this.skObjDIC.remove(tempKey);
                }
                else
                {
                    tempIndex++;
                }
            }
        }

        /**
         * 回收怪物所受部分特效逻辑
         */
        protected cycleEffectGroup(groupName: string)
        {
            let tempIndex = 0;
            while (tempIndex < this.skObjDIC.keys.length)
            {
                let tempKey = this.skObjDIC.keys[tempIndex] as string;
                let tempInfo = this.skObjDIC.get(tempKey) as Array<any>;
                let tempObj = tempInfo[0] as EffNode;
                if (tempKey.indexOf(groupName) == 0)
                {
                    //回收资源
                    if (tempObj != null) { tempObj.removeSelf(); }

                    //移除状态
                    this.skObjDIC.remove(tempKey);
                }
                else
                {
                    tempIndex++;
                }
            }
        }

        /**
         * 判断当前效果是否在播放
         */
        protected isPlayEffect(value: string): boolean
        {
            if (this.skObjDIC.indexOf(value) >= 0)
            {
                return true;
            }
            return false;
        }

        /**
         * 常驻特效刷新
         */
        protected refreshEffectList(effIdList: Array<string>)
        {

            //移除不存在的状态
            let tempIndex = 0;
            while (tempIndex < this.skObjDIC.keys.length)
            {
                let tempKey = this.skObjDIC.keys[tempIndex];
                let tempInfo = this.skObjDIC.get(tempKey);
                let tempObj = tempInfo[0] as EffNode;
                let tempTime = tempInfo[1] as number;
                if (tempTime == -1 && effIdList.indexOf(tempKey) == -1)
                {
                    //回收资源
                    if (tempObj != null) { tempObj.removeSelf(); }

                    //移除状态
                    this.skObjDIC.remove(tempKey);
                }
                else
                {
                    tempIndex++;
                }
            }

            //刷新
            effIdList.forEach(element =>
            {
                let tempInfo = this.skObjDIC.get(element);
                if (tempInfo == null)
                {
                    this.addEffect(element, null, this.actionFlipX ? -1 : 1);
                }
            });
        }

        /**
         * effID添加特效的标识符,（delayTime=-1,一直显示）(showPos,0：中心1：脚底2.头顶)
         */
        public addEffect(effID: string, pos?: Laya.Point, MinScale: number = 1, parent: Laya.Sprite = null, delayTime: number = -1, record: boolean = true): EffNode
        {

            //角色已经在播放这个效果，不会叠加
            if (this.skObjDIC.indexOf(effID) >= 0)
            {
                return null;
            }

            //异常检测
            let effData = cfg.EffectCfgData.getInfo(effID);
            if (effData == null)
            {
                return null;
            }

            //获取显示位置
            if (pos == null)
            {
                pos = SkillUtil.getEffPos(this.getResourceID(), cfg.EffectCfgData.getShowPosById(effID));
                if (parent == null)
                {
                    parent = this.effNodeContiner;
                    // pos.x += this.x;
                    // pos.y += this.y;
                }
            }

            //当前生成的特效节点
            let effectObj = EffectMgr.Inst.createEffectOne(effID, pos, delayTime, MinScale, this.actionSpeed, parent, !record);
            if (effectObj == null)
            {
                return null;
            }

            //记录状态
            if (record)
            {
                this.recordEffectStatue(effID, parent != this.effNodeContiner ? null : effectObj, effectObj.effAllTime, delayTime);
            }

            return effectObj;
        }

        /**
         * 记录当前怪物特效状态
         */
        private recordEffectStatue(effID: string, effectObj: EffNode, effTime: number, delayTime: number)
        {

            //记录特效状态
            let tmpEffInfo = new Array<any>();
            this.skObjDIC.set(effID, tmpEffInfo);

            //特效状态
            tmpEffInfo.push(effectObj);
            if (delayTime == -1)
            {
                tmpEffInfo.push(-1);
            }
            else
            {
                tmpEffInfo.push((delayTime == null ? effTime : delayTime) + Laya.timer.currTimer);
            }
            tmpEffInfo.push(effID);
            tmpEffInfo.push(Laya.timer.currTimer);
        }

        //--------------------------------------------加载资源---------------------------------------

        release(): void
        {
            this.resoureID = 0;
            //停止刷新逻辑
            this.isUpdate = false;
            this.dieStat = false;
            // this._skeletonPlayer.stop();
            this.actionStatue = null;
            this._skeletonPlayer.releaseSkel();
            this.actionUI.scaleX = 1;
            this.actionUI.scaleY = 1;
            this.targetInMove = false;
            //清除所有定时器
            Laya.timer.clearAll(this);
            Laya.Tween.clearTween(this);
            Laya.Tween.clearAll(this.actionUI);
            this.actionUI.visible = true;
            this.actionUI.alpha = 1;
            this.alpha = 1;
            if (this._debugTxt)
            {
                this._debugTxt.text = "";
            }
            this.setParent(null);
            this.actionSpeed = 1;
            this.offAll();
            //特效逻辑循环
            this.updateEffectStatue(0);
            //移除自己
            // this.removeSelf();
        }

        scale(x: number, y: number)
        {
            this._continer.scaleX = x;
            this._continer.scaleY = y;

        }

        localToGlobal(point: Laya.Point, createNewPoint?: boolean, globalNode?: Laya.Sprite | null): Laya.Point
        {
            return this._continer.localToGlobal(point, createNewPoint, globalNode);
        }

        public setParent(parent: Laya.Sprite, index: number = -1)
        {
            if (parent == null)
            {
                this.removeFromParent();
                return;
            }
            if (this._parent != parent)
            {
                this.removeFromParent();
                this._parent = parent;
                if (index != -1)
                {
                    this._parent.addChildAt(this._continer, index);
                } else
                {
                    this._parent.addChild(this._continer);
                }
            }
        }

        removeFromParent()
        {
            if (this._parent)
            {
                this._parent.removeChild(this._continer);
                this._parent = null;
            }
        }

        public isHaveClip(): boolean
        {
            return this._skeletonPlayer.isHaveClip();
        }

        reset(): void
        {

        }


        dispose()
        {
            this.destoryed = true;
            //回收模型阴影UI
            this.destoryShaderUI();
        }
    }

}