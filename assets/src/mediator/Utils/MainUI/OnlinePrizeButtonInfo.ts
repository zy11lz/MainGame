module Pro
{
    /**
     * 挂机界面上，在线奖励按钮显示
     */
    export class OnlinePrizeButtonInfo extends ProUI.Scene.City.Utils.OnlinePrizeButtonUI
    {

        private _targetTime = 0;

        constructor()
        {
            super();

            this.on(Laya.Event.DISPLAY, this, () =>
            {
                this.controllEvents(false);
            });
        }

        //---------------------------------------Event------------------------------------
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            Global.EventsNotifyControl(this.listensEvents(), isOff);
            if (!isOff)
            {
                this.on(Laya.Event.UNDISPLAY, this, this.controllEvents);
            } else
            {
                this.cleanUp();
            }
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
                CmdEvent.Weal_OnlinePrize, this, this.refreshUI
            ]
        }


        //-------------------------------------Event Fun-----------------------------
        /** 初始化 */
        public init()
        {
            this._targetTime = WealDataMgr.getOnlinePrizeAllNextTargetTime();
            this.bg.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_OnlinePrize));
            });
        }

        private cleanUp(): void
        {
            if (this._effNode)
            {
                EffectMgr.Inst.releaseEffect(this._effNode);
            }
            this._effNode = null;
            this._isEffect = false;
            Laya.timer.clear(this, this.onTimer);
        }

        public refreshUI()
        {
            Laya.timer.clear(this, this.onTimer);
            //检查奖励是否全部领完
            if (WealDataMgr.getOnlinePrizeOver())
            {
                this.showEffect(false);
                this.show(false);
            } else
            {
                this.show(true);
                //当前领奖的道具图标
                // let cfgInfo = cfg.WealOnlinePrizeCfgData.getInfo(WealDataMgr.onlinePrizeIndex + 1);
                let addItem = WealDataMgr.getLastOnlineAward();//   cfg.WealOnlinePrizeCfgData.getAddItemInfoByInfo(cfgInfo);
                this.norItem.setItemInfo(addItem, false, true, false, false, false);

                Laya.timer.loop(500, this, this.onTimer);
                this.onTimer();
            }
        }

        private _isEffect = false;
        private _effNode: EffNode = null;
        /** 设置可领奖特效 */
        private showEffect(isShow: boolean = true): void
        {
            if (this._isEffect == isShow)
            {
                return;
            }
            this._isEffect = isShow;
            if (isShow)
            {
                if (this._effNode)
                {
                    this._effNode.visible = true;
                }
                else
                {
                    this._effNode = EffectMgr.Inst.createEffectOne("ui_itemLightNew_0", new Laya.Point(69, 63), -1, 2.1, 0.7, this.norItem, false, ResReleaseType.Reference, true);
                 }
            } else
            {
                if (this._effNode)
                {
                    this._effNode.visible = false;
                }
            }
        }

        private show(isShow: boolean): void
        {
            if (this.visible == isShow) { return; }
            this.layoutEnabled = this.visible = isShow;
            this.event(Laya.Event.CHANGE, isShow);
            // this.parent["refresh"] && this.parent["refresh"]();
        }

        private onTimer(): void
        {
            this.redDotImg.visible = false;
            let time = WealDataMgr.getOnlinePrizeNextTime();
            // if (time <= 0) Laya.timer.clear(this, this.onTimer);
            if (time == 0)
            { //可领奖
                this.redDotImg.visible = true;
                this.txtState.text = Global.getLangStr("onlinePirze_msg2");
                this.showEffect(true);
            } else if (time < 0)
            { //没有了
                this.show(false);
                this.showEffect(true);
            } else
            {
                this.showEffect(false);
                this.txtState.text = Global.GetRemindTime(time, 4);
            }

            if (this._targetTime == 0)
            { //已经没有了
                return;
            } else
            {
                let leftTime = this._targetTime - TimeController.currTimer / 1000;
                if (leftTime <= 0)
                { //到时间了，重置下一个时间，并刷新列表
                    this._targetTime = WealDataMgr.getOnlinePrizeAllNextTargetTime();
                    this.refreshUI();
                }
            }
        }
    }
}