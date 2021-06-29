
module Pro
{
    /**
     * 通用警告窗口面板(des/backTxt,caller,fun/sureTxt,caller,fun)
     */
    export class AlertWinMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Common.AlertWinUI;

        /** UI打开参数 */
        public UIOpenData: AlertOpenUIData;

        /** 记录文本初始的位置，方便做居中处理 */
        private _textInitPosY = 515;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("mask"), UrlMgr.getAtlas("common")];
        }

        public openUI()
        {
            this.showPanel(ProUI.Common.AlertWinUI, 1, BaseAddLayer.RootUI,true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
            Laya.timer.clear(this, this.onSureDelayCall);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._textInitPosY = this.UIPanel.DesLb.y;
            this._isAutoReleaseRes = false;
            // this.UIPanel.DesLb.style.valign = "middle";            
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.chkBtnTodayRepeat.onClick(this, () =>
            {
                this.UIPanel.imgTodayRepeat.visible = !this.UIPanel.imgTodayRepeat.visible;
            })
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            Laya.timer.clear(this, this.onSureDelayCall);

            let DesLb = this.UIPanel.DesLb;
            DesLb.showText = this.UIOpenData.des || "";
            DesLb.innerHTML = this.UIOpenData.des || "";
            if (this.UIOpenData.todayRepeatKey)
            {
                //垂直居中
                DesLb.y = (DesLb.height - DesLb.contextHeight) / 2 + this._textInitPosY - 18;
                this.UIPanel.chkBtnTodayRepeat.visible = true;
                this.UIPanel.imgTodayRepeat.visible = false;
            } else
            {
                //垂直居中
                DesLb.y = (DesLb.height - DesLb.contextHeight) / 2 + this._textInitPosY;
                this.UIPanel.chkBtnTodayRepeat.visible = false;
            }
            // DesLb.style.padding = [(DesLb.height - DesLb.contextHeight) >> 1, 0, 0, 0];

            this.UIPanel.CloseBtn.text = this.UIOpenData.close != null ? this.UIOpenData.close.Txt : "";
            this.UIPanel.CloseBtn.visible = this.UIOpenData.close != null;

            this.UIPanel.SureBtn.text = this.UIOpenData.sure != null ? this.UIOpenData.sure.Txt : "";
            this.UIPanel.SureBtn.visible = this.UIOpenData.sure != null;

            Global.autoLayoutSpriteNode(this.UIPanel.FunBox, "hor", 100, "center");

            this.UIPanel.TitleLb.text = this.UIOpenData.showTitle == null ? Global.getLangStr("common_prompt") : this.UIOpenData.showTitle;

            this.UIPanel.CloseBtn.onClick(this, (btn: component.UIButton) =>
            {
                this.closeUI();

                //取消事件触发
                if (this.UIOpenData.close.fun != null)
                {
                    this.UIOpenData.close.fun.apply(this.UIOpenData.close.caller, [btn]);
                }
            });
            this.UIPanel.SureBtn.onClick(this, (btn: component.UIButton) =>
            {
                this.closeUI();
                if (this.UIOpenData.todayRepeatKey && this.UIPanel.imgTodayRepeat.visible)
                {
                    //今日不再提示
                    TodayRepeatOpMgr.Inst.setTag(this.UIOpenData.todayRepeatKey);
                }

                //确认事件触发
                if (this.UIOpenData.sure.fun != null)
                {
                    this.UIOpenData.sure.fun.apply(this.UIOpenData.sure.caller, [btn]);
                }
            });

            if (this.UIPanel.SureBtn.visible && this.UIOpenData.sureDelayTime > 0)
            {
                this.UIPanel.SureBtn.disabled = !this.UIOpenData.clickEnableOnDelay;
                this.UIPanel.SureBtn.text = Global.FormatString(this.UIOpenData.sure.Txt + "({0})", this.UIOpenData.sureDelayTime);
                Laya.timer.loop(1000, this, this.onSureDelayCall);
            }
            else
            {
                this.UIPanel.SureBtn.disabled = false;
            }
        }

        private onSureDelayCall()
        {
            this.UIOpenData.sureDelayTime--;
            if (this.UIOpenData.sureDelayTime == 0)
            {
                Laya.timer.clear(this, this.onSureDelayCall);
                this.UIPanel.SureBtn.text = this.UIOpenData.sure.Txt;
                this.UIPanel.SureBtn.disabled = false;
                if(this.UIOpenData.autoCloseOnEnd)
                {
                    this.closeUI();
                    this.checkCallBackHide();
                }


            }
            else
            {
                this.UIPanel.SureBtn.text = Global.FormatString(this.UIOpenData.sure.Txt + "({0})", this.UIOpenData.sureDelayTime);
            }



        }

        protected clickSpaceFunc() {
            if(this.UIOpenData.clickEnableOnClip)
            {
                super.clickSpaceFunc();
                this.checkCallBackHide();
            }
        }

        public refreshUI()
        {

        }

        /**
         * 点击空白区域，或是倒计时结束，检查是否执行回调
         * @private
         */
        private checkCallBackHide() {
            if (this.UIOpenData.executeCallFunOnClose)
            {
                if (this.UIOpenData.sure.fun != null)
                {
                    this.UIOpenData.sure.fun.apply(this.UIOpenData.sure.caller, [ this.UIPanel.SureBtn]);
                }
            }
        }
    }
}