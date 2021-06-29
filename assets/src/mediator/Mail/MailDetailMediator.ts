module Pro
{
    export class MailDetailMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Mail.RecordInfo.MainUI;

        /** 记录当前查看的邮件 */
        private ChoiceMail: Pb_God.PBMail;

        private _panel:ui.Panel;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Mail.RecordInfo.MainUI, 1, BaseAddLayer.TopUI,true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.initDescPanel();
        }

        private initDescPanel()
        {
            let descLb = this.UIPanel.MailDesLb;
            let panel = new ui.Panel();
            descLb.parent.addChild(panel);
            panel.pos(descLb.x,descLb.y);
            panel.size(descLb.width,descLb.height);
            descLb.pos(0,10);
            panel.addChild(descLb);
            panel.vScrollBarSkin = "";
            this._panel = panel;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.addEventMgr(EventNotify.Mail_Changed, this, this.refreshUI);
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
            this.ChoiceMail = this.UIOpenData.customObject;
            this.refreshUI();
        }

       

        public refreshUI()
        {
            this.UIPanel.MailTitleLb.text = this.ChoiceMail.title.length > 0 ? this.ChoiceMail.title : cfg.MailCfgData.getMailTitleByMailType(this.ChoiceMail.type);
            this.UIPanel.MailTimeLb.text = Global.getTimeLengthString(TimeController.currTimer / 1000 - this.ChoiceMail.sendtime) + Global.getLangStr("common_ago");
            this.UIPanel.MailEffTimeLb.text = Global.getLangStr("mail_msg1", cfg.MailCfgData.getExpireDayByMailType(this.ChoiceMail.type));
            let str = StringUtils.formatPlatDescString(this.__getMailDescString())
            this.UIPanel.MailDesLb.showText = str;

            Laya.timer.frameOnce(1,this,()=>{
                this.UIPanel.MailDesLb.height = this.UIPanel.MailDesLb.htmlDivElement.height;
                this._panel.refresh();
            })

            if (this.ChoiceMail.state == Pb_God._emMailState.MailState_NoRead)
            {
                if (this.ChoiceMail.item.length > 0)
                {
                    this.UIPanel.MailStatueImg.frame = 2;
                }
                else
                {
                    this.UIPanel.MailStatueImg.frame = 1;
                }
            }
            else
            {
                if (this.ChoiceMail.item.length > 0)
                {
                    this.UIPanel.MailStatueImg.frame = 4;
                }
                else
                {
                    this.UIPanel.MailStatueImg.frame = 3;
                }
            }

            this.UIPanel.GetRewardBtn.visible = this.ChoiceMail.item.length > 0 && this.ChoiceMail.state != Pb_God._emMailState.MailState_Reward;
            this.UIPanel.ExInfo.visible = this.UIPanel.GetRewardBtn.visible;
            this.UIPanel.DelMailBtn.visible = !this.UIPanel.GetRewardBtn.visible;
            this.UIPanel.GetRewardBtn.onClick(this, () =>
            {
                MailSend.reward(this.ChoiceMail.mailid);
            });
            this.UIPanel.DelMailBtn.onClick(this, () =>
            {
                this.closeUI();
                MailSend.deleteSend(this.ChoiceMail.mailid);
            });
            this.UIPanel.ExInfoReward.onRefresh(this.ChoiceMail.item.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(this.ChoiceMail.item[index]);
            });
        }

        /** 根据不同的邮件类型，转换对应的动态参数显示 */
        private __getMailDescString(): string
        {
            if (this.ChoiceMail.text) return this.ChoiceMail.text;
            let mailType = this.ChoiceMail.type;
            let ret = cfg.MailCfgData.getContentByMailType(mailType);
            let params = this.ChoiceMail.param;
            if (!params || params.length == 0) return ret;
            switch (mailType)
            {
                case Pb_God._emMailType.MailType_MonthCardReward: //月卡每日奖励	参数: _emPrivilegeDailyPacket
                    //月卡类型
                    var privilegeCard = cfg.PrivilegeDailyPrizeCfgData.getNeedCardIDByType(params[0]);
                    var cardName = cfg.PrivilegeCardCfgData.getNameByCardID(privilegeCard);
                    ret = Global.FormatString(ret, cardName);
                    break;
                case Pb_God._emMailType.MailType_Fund: //基金每日奖励;
                    //先从奖励中拿到活动ID
                    var actId = cfg.ActivityFundCfgData.getActivityIDByIndex(params[0]);
                    //从活动Id中拿到充值id
                    let chargeId = cfg.ActivityCfgData.getParamByID(actId);
                    var chargeName = cfg.ChargeCfgData.getNameByID(parseInt(chargeId));
                    ret = Global.FormatString(ret, chargeName);
                    break;
                case Pb_God._emMailType.MailType_ChallengeSeason: //竞技场赛季奖励	参数:开始时间_结束时间_名次
                    ret = Global.FormatString(ret, Global.getFormatTimeString(params[0] * 1000, 10), Global.getFormatTimeString(params[1] * 1000, 10), params[2]);
                    break;
                case Pb_God._emMailType.MailType_DanSeasonPrize: //段位
                    ret = Global.FormatString(ret, cfg.DanUpgradeCfgData.getDanNameByDanID(params[0]));
                    break;

                default:
                    ret = Global.FormatString(ret, ...params);
            }
            return ret;
        }
    }
}