/* eslint-disable no-loop-func */

module Pro
{
    /**
     * 管理战场中特效
     */
    export class EffectMgr
    {
        private static _Inst: EffectMgr;
        public static get Inst()
        {
            if (EffectMgr._Inst == null)
            {
                EffectMgr._Inst = new EffectMgr();
            }
            return EffectMgr._Inst;
        }

        private _effPool: common.Pool
        /** 全屏手指点击 */
        private _effFinger: EffNode;

        constructor()
        {
            this._effPool = common.PoolMgr.createPool(PoolTypes.EFFECT_NODE)
        }

        /** 初始化 */
        public init()
        {
            let tmpAry = cfg.EffectCfgData.getEditorInfos();
            tmpAry.forEach(element =>
            {
                let tmpNodeModel = ProUI.Ani.batEff[element.id + "UI"];
                if (tmpNodeModel == null)
                {
                    logE("还未配置时间轴特效:" + element.id);
                }
                else
                {
                    Laya.ClassUtils.regClass(element.id, tmpNodeModel);
                }
            });
            Laya.ClassUtils.regClass("EffNode", EffNode);
            Laya.stage.on(Laya.Event.CLICK, this, this.showEff_ClickScreen);
            // Laya.timer.frameLoop(1, this, this.doLogic);
        }

        //---------------------------------------Init---------------------------------------

        //-------------------------------------------播放配置表特效---------------------------------------
        /**
         * 根据特效配置创建,delayTime=-1,表示自己控制消失,delayTime=null，表示自动消失,***不要更改EffNode的名称***
         * @param id 特效表的特效名称
         * @param pos 特效显示的坐标
         * @param delayRemove 延迟自动移除时间(毫秒)  -1,表示自己控制消失,delayTime=null，表示自动消失
         * @param minScale 特效缩放比例
         * @param timeScale 特效播放速度
         * @param parent 特效添加到的显示层
         * @param recode 特效的生命周期是否需要自动管理
         * @param resReleaseType 资源释放类型
         * @param useLightBlend 是否使用叠加模式， 目前laya仅支持lighter这1种叠加，所以此变量使用boolen即可， 就不扩展叠加类型为参数了
         */
        private createEffect(id: string,
            pos: Laya.Point,
            delayRemove: number,
            minScale: number = 1,
            timeScale = 1,
            parent: Laya.Sprite = LayerManager.Inst.effectLayer,
            recode: boolean = true,
            resReleaseType = ResReleaseType.Reference,
            useLightBlend: boolean = false): EffNode
        {

            //异常检测
            let tmpEffData = cfg.EffectCfgData.getInfo(id);
            if (tmpEffData == null)
            {
                return null;
            }

            if (!pos) { pos = new Laya.Point(0, 0); }

            //创建特效
            let effectObj = this.createEffNode(pos, minScale, useLightBlend);
            effectObj.name = id;
            parent.addChild(effectObj);

            //当前特效数据
            let tmpEffEdFrame = cfg.EffectCfgData.getEditorFrameById(id);
            let tmpEffPathAry = cfg.EffectCfgData.getResPathAryById(id);
            //计算特效时间
            let tmpEffAllTime = 0;
            let tmpEffResInfo = tmpEffPathAry[0] as cfg.SkillEffectResInfo;
            tmpEffAllTime = tmpEffResInfo.frameCount * GameConfig.EffDetalTime / timeScale;
            effectObj.initFrameAction(tmpEffResInfo.resFold, null, timeScale, GameConfig.EffDetalTime, tmpEffAllTime, resReleaseType);

            //记录自动消失
            // let tmpEffDuration = delayRemove == null ? tmpEffAllTime : delayRemove;
            // recode && this.recordEffect(tmpEffDuration, effectObj);
            if (recode)
            {
                effectObj.setLoopState(false)
                effectObj.on(Laya.Event.COMPLETE, this, this.onEffectComplete)
            }
            return effectObj;
        }


        public createEffectOne(id: string,
            pos: Laya.Point,
            delayRemove: number,
            minScale: number = 1,
            timeScale = 1,
            parent: Laya.Sprite = LayerManager.Inst.effectLayer,
            recode: boolean = true,
            resReleaseType = ResReleaseType.Reference,
            useLightBlend: boolean = false): EffNode
        {
            return this.createEffect(id, pos, delayRemove, minScale, timeScale, parent, recode, resReleaseType, useLightBlend);
        }


        public createLoopEffect(id: string,
            pos: Laya.Point,
            delayRemove: number,
            minScale: number = 1,
            timeScale = 1,
            parent: Laya.Sprite = LayerManager.Inst.effectLayer,
            resReleaseType = ResReleaseType.Reference,
            useLightBlend: boolean = false): EffNode
        {
            return this.createEffect(id, pos, delayRemove, minScale, timeScale, parent, false, resReleaseType, useLightBlend);
        }

        private onEffectComplete(effNode: EffNode)
        {
            this.releaseEffect(effNode);
        }

        /**
         * 创建可循环使用EffNode
         */
        private createEffNode(pos: Laya.Point, minScale: number, useLightBlend): EffNode
        {
            let effectObj: EffNode = this._effPool.create() as any;
            effectObj.scale(minScale, Math.abs(minScale));
            if (SystemUtils.isWeb())
            {
                effectObj.blendMode = "";
            }
            else
            {
                effectObj.blendMode = useLightBlend ? "lighter" : "";
            }
            effectObj.pos(pos.x, pos.y);
            return effectObj;
        }

        //-----------------------------------------场景特效---------------------------------------------
        /**
         * 手指点击屏幕效果
         */
        public showEff_ClickScreen(): void
        {
            let mousePos = LayerManager.Inst.effectLayer.getMousePoint();
            this.removeEff_ClickScreen();
            if (this._effFinger == null)
            {
                this._effFinger = this.createEffect("ui_fingerClick", mousePos, null, 1, 1, LayerManager.Inst.effectLayer, false, ResReleaseType.Reference, true);
            } else
            {
                LayerManager.Inst.effectLayer.addChild(this._effFinger);
                this._effFinger.x = mousePos.x;
                this._effFinger.y = mousePos.y;
                this._effFinger.play();
            }
            Laya.timer.once(this._effFinger.effAllTime, this, this.removeEff_ClickScreen);
        }

        /**
         * 移除手指点击效果
         */
        public removeEff_ClickScreen(): void
        {
            Laya.timer.clear(this, this.removeEff_ClickScreen);
            if (this._effFinger != null)
            {
                common.DisplayUtils.removeFromParent(this._effFinger);
                this._effFinger.stop();
            }
        }



        /**
         * 挂机收益效果
         */
        public showEff_HookCoin(startPos: Laya.Point, endPos: Laya.Point, parent: Laya.Sprite)
        {
            let hookDragItems = [1, 2, 3, 6, 8];
            let effName = "hookCoin";
            let effNum = Global.getRandomNum(8, 10);
            for (let i = 0; i < effNum; i++)
            {

                Laya.timer.once(50 * i, this, (index: number) =>
                {
                    let ani: Laya.Image = Public.PoolMgr.getItem(effName);
                    if (ani == null)
                    {
                        ani = new Laya.Image();
                        ani.anchorX = 0.5;
                        ani.anchorY = 0.5;
                        ani.name = effName;
                    }
                    parent.addChild(ani);
                    ani.scaleX = 0;
                    ani.scaleY = 0;
                    Global.setResIconWithItemID(ani, CfgID.ResType.Item, hookDragItems[Global.getRandomNum(0, hookDragItems.length)]);

                    let randomX = startPos.x + (Global.getRandomNum(0, 100) - 50);
                    let randomY = startPos.y - (Global.getRandomNum(0, 100) - 50);
                    ani.pos(startPos.x, startPos.y);

                    Laya.Tween.to(ani, { x: randomX, y: randomY, scaleX: 1, scaleY: 1 }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, () =>
                    {
                        Laya.Tween.to(ani, { x: randomX, y: randomY, scaleX: 1, scaleY: 1 }, 100, Laya.Ease.quadInOut, Laya.Handler.create(this, () =>
                        {
                            Laya.Tween.to(ani, { x: endPos.x, y: endPos.y, scaleX: 0, scaleY: 0 }, 800, Laya.Ease.quadInOut, Laya.Handler.create(this, () =>
                            {
                                ani.removeSelf();
                                Public.PoolMgr.recoverItem(effName, ani);
                            }));
                        }));
                    }));
                }, [i]);
            }

        }

        //------------------------------------UI效果----------------------------------------------
        /**
         * 数字伤害效果
         *  */
        public showUI_DamageNumUp(showDamage: number, bg: string, numResInfo: NumResInfo, bornPos: Laya.Point, timeScale = 1, parent: Laya.Sprite = LayerManager.Inst.effectLayer)
        {

            let effName = "HurtDamageUI";

            let hurtNumUI: ProUI.Scene.Battle.Effect.HurtNumUI = Public.PoolMgr.getItem(effName);
            var bitmapText: component.UIBitmapText;

            if (hurtNumUI == null)
            {
                hurtNumUI = new ProUI.Scene.Battle.Effect.HurtNumUI();
            }
            hurtNumUI.anchorX = 0.5;
            hurtNumUI.anchorY = 0.5;
            bitmapText = hurtNumUI.numSp;
            bitmapText.charMainKey = numResInfo.numName;
            parent.addChild(hurtNumUI);
            //设置显示文字
            let showMsg = (showDamage > 0 ? "+" : "") + showDamage;
            bitmapText.text = showMsg;

            hurtNumUI.bg.visible = false;
            if (bg != "")
            {
                hurtNumUI.bg.visible = true;
                hurtNumUI.bg.skin = bg;
                bitmapText.x = 90;
                //设置坐标
                // let tmpTrulyWidth = bitmapText.getTextWidth(showMsg);
                hurtNumUI.x = bornPos.x + 50;// tmpTrulyWidth/2;
                hurtNumUI.y = bornPos.y;
            } else
            {
                bitmapText.x = 0;
                let tmpTrulyWidth = bitmapText.getTextWidth(showMsg);
                hurtNumUI.x = bornPos.x + 50;// tmpTrulyWidth/2;
                hurtNumUI.y = bornPos.y;
            }
            //显示一秒
            hurtNumUI.scale(1, 1, true);
            hurtNumUI.alpha = 0;
            FlyAniManager.instace.showHpNumFlyAni(hurtNumUI, new CallBack(this, this.toHideBitmapText, hurtNumUI))
            Laya.Tween.to(hurtNumUI, { y: hurtNumUI.y - 120 }, 900);

        }

        private toHideBitmapText(bitmapText: ProUI.Scene.Battle.Effect.HurtNumUI)
        {
            // Laya.Tween.to(bitmapText, { y: bitmapText.y - 60 }, 200);
            Laya.Tween.to(bitmapText, { alpha: 0 }, 300, null, Laya.Handler.create(this, this.recoveryUIBitmapText, [bitmapText]))
        }

        private recoveryUIBitmapText(bitmapText: ProUI.Scene.Battle.Effect.HurtNumUI)
        {
            bitmapText.removeSelf();
            Public.PoolMgr.recoverItem("HurtDamageUI", bitmapText);
        }



        /**
         * 技能发起的效果
         */
        public showBigSkillName(isOwer: boolean, skinID: number, skillIndex: number, parent: Laya.Sprite, callBack: CallBack)
        {

            let effName = "SkillNameUI";
            let tmpUI: ProUI.Scene.Battle.Effect.SkillNameUI = Public.PoolMgr.getItem(effName);
            if (tmpUI == null)
            {
                tmpUI = new ProUI.Scene.Battle.Effect.SkillNameUI();
                tmpUI.anchorX = 0.5;
                tmpUI.anchorY = 0.5;
            }
            tmpUI.x = GameConfig.curWidth() / 2;
            tmpUI.y = GameConfig.curHeight() * 0.3;
            parent.addChild(tmpUI);

            //显示内容
            Global.setResIconWithItemID(tmpUI.IconImg, CfgID.ResType.Pet, skinID);
            tmpUI.NameLb.text = cfg.SkillNewSkillCfgData.getNameBySkillIndex(skillIndex);
            if (isOwer)
            {
                tmpUI.bg.skin = "res/battle/zhandou_jinengdi_difang.png"
            } else
            {
                tmpUI.bg.skin = "res/battle/zhandou_jinengdi_wofang.png"
            }
            //动画
            tmpUI.ani1.play(0, false);
            tmpUI.ani1.once(Laya.Event.COMPLETE, this, () =>
            {
               Laya.timer.once(800, this, () =>
                {
                    if (tmpUI)
                    {
                        tmpUI.removeSelf();
                        Public.PoolMgr.recoverItem(effName, tmpUI);
                    }
                })

                // callBack.call();
            });
        }

        /**
         * buff触发的飘文字效果
         */
        public showUI_ProduceBuff(petID: number, buffID: number, parent: Laya.Sprite)
        {
            this.showUI_ProduceStatue(cfg.BuffNewBuffCfgData.getBuffNameByID(buffID), parent);
        }

        /**
         * 技能触发的飘文字效果
         */
        public showUI_ProduceSkill(petID: number, skillIndex: number, parent: Laya.Sprite)
        {
            this.showUI_ProduceStatue(cfg.SkillNewSkillCfgData.getNameBySkillIndex(skillIndex), parent);
        }

        /**
         * 状态触发的效果
         */
        public showUI_ProduceStatue(tipStr: string, parent: Laya.Sprite)
        {

            let effName = "BuffNameUI";
            let tmpUI: ProUI.Scene.Battle.Effect.BuffNameUI = Public.PoolMgr.getItem(effName);
            if (tmpUI == null)
            {
                tmpUI = new ProUI.Scene.Battle.Effect.BuffNameUI();
                tmpUI.anchorX = 0.5;
                tmpUI.anchorY = 0.5;
            }
            // tmpUI.scale(0.7, 0.7);
            tmpUI.x = parent.width / 2;
            tmpUI.y = parent.height / 2;
            parent.addChild(tmpUI);

            //显示内容
            tmpUI.NameLb.text = tipStr;

            FlyAniManager.instace.showBuffNameAni(tmpUI, new CallBack(this, this.onBuffNameComplete, tmpUI))
            // //动画
            // tmpUI.ani1.play(0, false);
            // tmpUI.ani1.once(Laya.Event.COMPLETE, this, () => {
            //     tmpUI.removeSelf();
            //     Public.PoolMgr.recoverItem(effName, tmpUI);
            // });
        }

        onBuffNameComplete(tmpUI: ProUI.Scene.Battle.Effect.BuffNameUI)
        {
            tmpUI.removeSelf();
            let effName = "BuffNameUI";
            Public.PoolMgr.recoverItem(effName, tmpUI);
        }


        /**
        * 状态触发的效果
        */
        public showBattleAttackText(tipStr: string, bornPos: Laya.Point, parent: Laya.Sprite = LayerManager.Inst.effectLayer)
        {

            let effName = "SkillText";
            let tmpUI: Laya.Image = Public.PoolMgr.getItem(effName);
            if (tmpUI == null)
            {
                tmpUI = new Laya.Image();
                tmpUI.anchorX = 0.5;
                tmpUI.anchorY = 0.5;
            }
            //设置坐标
            tmpUI.x = bornPos.x - tmpUI.width / 2;
            tmpUI.y = bornPos.y - tmpUI.height / 2;
            parent.addChild(tmpUI);
            //显示内容
            tmpUI.skin = tipStr;
            FlyAniManager.instace.showHpNumFlyAni(tmpUI, new CallBack(this, this.showBattleAttackTextComplete, tmpUI))

        }

        private showBattleAttackTextComplete(tmpUI: Laya.Image)
        {
            tmpUI.removeSelf();
            Public.PoolMgr.recoverItem("SkillText", tmpUI);
        }

        /**
         * 战斗力提升效果
         */
        public showUI_FightPowerUp(basePower: number, upPower: number, parent: Laya.Sprite = LayerManager.Inst.effectLayer)
        {

            let effName = "powerUpUI";
            let tmpUI: ProUI.Ani.utils.ani_powerUpUI = Public.PoolMgr.getItem(effName);
            if (tmpUI == null)
            {
                tmpUI = new ProUI.Ani.utils.ani_powerUpUI();
                tmpUI.anchorX = 0.5;
                tmpUI.anchorY = 0.5;
            }
            tmpUI.x = parent.width / 2;
            tmpUI.y = parent.height * 0.31;
            parent.addChild(tmpUI);
            tmpUI.alpha = 0;

            //设置显示文字
            tmpUI.BasePowerLb.text = basePower.toString();
            tmpUI.UpPowerLb.text = "+" + upPower.toString();
            let showFun = function ()
            {
                /*
                let bgW = tmpUI.BasePowerLb.width + tmpUI.UpPowerLb.width + 320;
                if (bgW > 750) bgW = 750;
                tmpUI.imgBg.width = bgW;
                */
                tmpUI.alpha = 1;

                // //特效
                // let tmpEffNode = EffectMgr.Inst.createEffect("ui_fightPowerUp", new Laya.Point(tmpUI.width / 2, tmpUI.height / 2), null, 1, 1, tmpUI, true, ResReleaseType.Reference);
                // tmpUI.setChildIndex(tmpEffNode, 0);

                //显示一秒
                Laya.timer.once(1000, this, () =>
                {
                    tmpUI.removeSelf();
                    Public.PoolMgr.recoverItem(effName, tmpUI);
                });
            };

            //设置坐标, 需要等贴图资源正常 getTextWidth才能取到有效的值
            if (tmpUI.BasePowerLb.bitmapFontIsLoadSuccessed()) { showFun(); }
            else { tmpUI.UpPowerLb.once(Laya.Event.LOADED, this, showFun); }
        }

        releaseEffect(ef: EffNode)
        {
            if (ef)
            {
                common.DisplayUtils.removeFromParent(ef);
                this._effPool.releaseItem(ef);
            }
        }
    }
}