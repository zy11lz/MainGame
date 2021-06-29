module Pro
{
    /**
    * 福利大厅：签到分页视图
    * @author jason.xu
    */
    export class WealHallSignPageView extends ProUI.ActivityMain.PageView.SignInUI implements ITableView
    {

        private _effNodes: EffNode[] = [];

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            //	 签到返回 返回当前的状态 PBU32
            EventMgr.on(CmdEvent.Weal_Signin, this, this.onSignin)

            this.btnHelp.onClick(this, this.onClickHelp);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Weal_Signin, this, this.onSignin)
        }

        /** 点击帮助说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "welfare_signIn_help");
        }


        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.refreshList();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            for (var i = 0; i < this._effNodes.length; i++)
            {
                let el = this._effNodes[i];
                // if (el) el.removeSelf();
                EffectMgr.Inst.releaseEffect(el);
            }
            this._effNodes = [];
        }

        public setData($data: any): void
        {

        }

        /** 签到返回  */
        private onSignin(): void
        {
            //已领奖天数
            let signinDays = WealDataMgr.signinDays;
            this.listView.setItem(signinDays - 1, 1);
        }

        private _curMonth = 0;
        /** 刷新列表 */
        private refreshList(): void
        {
            //计算当月总天数
            var curDate = new Date(Pro.TimeController.currTimer);
            this._curMonth = curDate.getMonth() + 1;
            curDate.setMonth(this._curMonth, 0);
            let maxDays = curDate.getDate();
            this.listView.onRefresh(maxDays, this, this.onRefreshItem);
        }

        private onRefreshItem(tempUI: ProUI.ActivityMain.ChildItemView.SignInItemUI, index: number): void
        {
            let addItem = cfg.WealSigninCfgData.getAddItemInfoByMonthDay(this._curMonth, index + 1);
            let cfgInfo = cfg.WealSigninCfgData.getInfoByDoubleKey(this._curMonth, index + 1);
            tempUI.norItem.setItemInfo(addItem, false, true, false, false, false, false);

            //已领奖天数
            let signinDays = WealDataMgr.signinDays;
            //今天已领过的次数（每天可以领两次，第一次免费，第二次需要任意充值）
            let signState = WealDataMgr.signinState;

            let todayIndex = signState <= Pb_God._emWealSigninState.Weal_Signin_Available ? signinDays : signinDays - 1;
            let isToday = todayIndex == index;
            let isPast = todayIndex > index; //过去的时间

            tempUI.spMask.visible = signinDays > index;  //领过的加个蒙板
            tempUI.imgGet.visible = isPast || (signState == Pb_God._emWealSigninState.Weal_Signin_Complete && isToday) //今天之前或者今天已经领了两次了
            tempUI.imgAgain.visible = signState == Pb_God._emWealSigninState.Weal_Signin_OnceMore && isToday; //今天已经领了一次了， 还可以再领一次

            let itemEffNode = this._effNodes[index];
            //没领或者还可以再领一次
            let isGetEff = isToday && (signState <= Pb_God._emWealSigninState.Weal_Signin_Available || (PlayerDataMgr.todayrecharge > 0 && signState == Pb_God._emWealSigninState.Weal_Signin_OnceMore))

            tempUI.imgCanGet.visible = false;
            if (isGetEff)
            {
                // tempUI.effCanGet.play(0, true);
                if (itemEffNode)
                {
                    itemEffNode.visible = true;
                }
                else
                {
                    itemEffNode = EffectMgr.Inst.createEffectOne("ui_itemLightNew_0", new Laya.Point(1, 5), -1, 1.9, 0.7, tempUI.effPos, false, ResReleaseType.Reference, true);
                    this._effNodes[index] = itemEffNode;
                }
            } else
            {
                if (itemEffNode)
                {
                    itemEffNode.visible = false;
                }
                // tempUI.effCanGet.stop();
                // tempUI.imgCanGet.alpha = 0;
            }
            tempUI.reddot.visible = isGetEff;
            // //旋转特效
            // let isItemEff = cfgInfo.eff;
            // if (isItemEff)
            // {

            // } else
            // {

            // }

            tempUI.btn.onClick(this, () =>
            {
                if (isPast || signState == Pb_God._emWealSigninState.Weal_Signin_Complete) { return; }
                if (!isToday)
                {
                    TipsUtils.showTipsByLanId("tips_msg7");
                    return;
                }
                //今天是否已经充过值
                let todayHasPay = PlayerDataMgr.todayrecharge > 0;
                if (signState == Pb_God._emWealSigninState.Weal_Signin_OnceMore && !todayHasPay)
                {
                    let alertDes = Global.getLangStr("weal_signTips1");
                    AlertShow.showConfirmAlert(alertDes, this, () =>
                    {
                        //打开充值界面
                        PlatformDataMgr.openChargeUI();
                        // UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMain), BaseBackUIType.HideBackUI);
                    })
                    return;
                }
                //向服务器发起领奖请求
                WealSend.signin();
            })

        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}