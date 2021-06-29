module Pro
{
    /**
    * 冠军赛发送弹幕小弹窗
    * @author jason.xu
    */
    export class ChampSendBarragePanel extends ProUI.Champion.ChampionSendBarrageUI
    {

        private _needItemId = 0;
        private _needItemCount = 0;
        private box: Laya.Box;
        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {
            this.txtInput.prompt = Global.getLangStr("common_inputPrompt");
            //价格
            let needItemArr = cfg.ChampionConstInfoCfgData.getFirstInfo().danmuNeedItem.split("_");
            this.txtNeed.text = needItemArr[1];
            this._needItemId = parseInt(needItemArr[0]);
            this._needItemCount = parseInt(needItemArr[1]);
            //道具ID转换成小图标资源
            Global.setResSmallIconWithItemID(this.imgNeed, this._needItemId);

            this.btnBulletChat.onSelectChange(this, this.onClickCheckBtn);
            this.btnFastBarrage.onClick(this, this.onClickComboProveince);
            this.popupViewMask.onClick(this, this.hideAllPopupView);
            // 弹幕默认开启
            SystemSettingMgr.Inst.resetSettingValue(6, 1);
        }

        public show(box: Laya.Box): void
        {
            this.box = box;
            LayerManager.Inst.topUILayer.addChild(this);
            PopUpManager.popUpUIAction(this, 0);
            this.setCheckBtn(this.btnBulletChat, "setting_msg6", "setting_msg7", SystemSettingType.BulletChat);
            this.onClickComboProveince();

        }
        private onClickBarrageShow(): void
        {
            this.box.visible = this.btnBulletChat.isSelected;
            if (this.box.visible)
            {
                TipsUtils.showTipsByLanId("ui_Champion_msg27");
            }
            else
            {
                TipsUtils.showTipsByLanId("ui_Champion_msg28");
            }
        }
        public closeUI(): void
        {
            this.removeEvent();
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private addEvent(): void
        {
            this.btnSend.onClick(this, this.onClickSend);
            this.btnClose.onClick(this, this.closeUI);
        }
        private removeEvent(): void
        {
        }

        private onClickSend(): void
        {
            let msg = this.txtInput.text;
            msg = msg.replace(/\s*/g, ""); //去掉空白字符
            if (!msg)
            {
                TipsUtils.showTipsByLanId("tips_msg14");
                return;
            }
            //判断道具数量
            if (!Global.isFullRes(this._needItemId, this._needItemCount, true)) return;
            //脏字符检测     
            if (FilterHelper.Inst.containStr(msg))
            {
                TipsUtils.showTipsByLanId("tips_msg15");
                return;
            }
            this.txtInput.text = "";
            ChampionSend.sendDanmuAsk(msg);
            EventMgr.trigger(EventNotify.Champion_AddSelfBarrage, msg);
            this.closeUI();
        }

        /** 点击切换复选按钮 */
        private onClickCheckBtn(): void
        {
            let isCheck = this.btnBulletChat.isSelected;
            this.onClickBarrageShow();
            SystemSettingMgr.Inst.resetSettingValue(6, isCheck ? 1 : 0);
        }

        private setCheckBtn(btn: Pro.SlideButton, langId1: string, langId2: string, settingType: number): void
        {
            btn.name = settingType + "";
            btn.getText(langId1, langId2);
            btn.setSelect(!!SystemSettingMgr.Inst.getSettingValueByType(settingType));
            this.box.visible = btn.isSelected;
        }


        private onClickComboProveince(): void
        {
            this.comboBoxListView.visible = true;
            this.popupViewMask.visible = true;

            let province = ShapeDataMgr.province;
            let bulletChatLb = Global.getLangStr("bulletChatLb");
            let list = bulletChatLb.split(";");
            this.listCombo.onRefresh(list.length, this, (btn: component.UIButton, index: number) =>
            {
                let cfgLb = list[index];
                (btn.getChildByName("txtName") as Laya.Label).text = cfgLb;
                btn.onClick(this, () =>
                {
                    this.hideAllPopupView();
                    cfgLb = cfgLb.replace(/\s*/g, ""); //去掉空白字符
                    if (!cfgLb)
                    {
                        TipsUtils.showTipsByLanId("tips_msg14");
                        return;
                    }
                    //判断道具数量
                    if (!Global.isFullRes(this._needItemId, this._needItemCount, true)) return;
                    //脏字符检测     
                    if (FilterHelper.Inst.containStr(cfgLb))
                    {
                        TipsUtils.showTipsByLanId("tips_msg15");
                        return;
                    }
                    ChampionSend.sendDanmuAsk(cfgLb);
                    EventMgr.trigger(EventNotify.Champion_AddSelfBarrage, cfgLb);
                    this.closeUI();

                });
            })
        }

        private hideAllPopupView(): void
        {
            this.comboBoxListView.visible = false;
            this.popupViewMask.visible = false;
        }

    }
}