module Pro
{
    /**
     * 主界面上功能预览按钮显示
     */
    export class SystemPreviewButton extends ProUI.Scene.City.Utils.SystemPreviewUI
    {
        private _systemPreviewEffPosEff: EffNode;

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
                this.refreshView();
            } else
            {
                this.cleanUp();
            }
        }
        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
                EventNotify.System_Switch_Open_Update, this, this.refreshView,
                CmdEvent.Common_SystemSwitchPrize, this, this.refreshView
            ]
        }

        private refreshView(): void
        {
            let iconIsOpen = PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.SystemPrevieIcon);
            if (!iconIsOpen)
            {
                this.cleanUp();
                this.visible = false;
                return;
            }
            //下一个即将开放的
            let nextOpenSystem = PlayerDataMgr.getNextOpenSystemSwitchInfo();
            //下一个能领奖的
            let canRewardSytem = PlayerDataMgr.getCanGetPrizeSystemInfo();
            let showNextSystem = nextOpenSystem || canRewardSytem;
            this.visible = !!showNextSystem;
            if (this.visible)
            {
                this.imgSystemPreviewIcon.skin = "res/Unpack/Icon/SystemIcon/" + showNextSystem.icon;
                if (PlayerDataMgr.checkSystemSwitchOpen(showNextSystem.iD))
                { //已经开启了的就说明是可以领奖的
                    this.txtSystemPreviewCondition.text = Global.getLangStr("systemList_msg4");
                    this.txtSystemPreviewCondition.color = "#fffcde";
                } else
                {
                    this.txtSystemPreviewCondition.text = PlayerDataMgr.getSystemOpenShortString(showNextSystem);
                    this.txtSystemPreviewCondition.color = "#fffcde";
                }
                this.txtSystemPreviewName.text = showNextSystem.name;
                this.txtSystemPreviewName.bold = true;
                this.txtSystemPreviewName.stroke = 2;
                this.imgReddot.visible = !!canRewardSytem; //有可领奖的

                if (this._systemPreviewEffPosEff == null)
                {
                    // this._systemPreviewEffPosEff = EffectMgr.Inst.createLoopEffect("ui_systemPreview", null, null, 1, 0.75, this.systemPreviewEffPos, ResReleaseType.Reference, true);
                }
            } else
            {
                this.cleanUp();
            }
        }

        private cleanUp(): void
        {
            EffectMgr.Inst.releaseEffect(this._systemPreviewEffPosEff);
            this._systemPreviewEffPosEff = null;
        }

    }
}