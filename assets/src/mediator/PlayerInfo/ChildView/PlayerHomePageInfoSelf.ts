module Pro
{
    /**
    * 个人空间（形象）设置总入口页： 个人信息分页
    * @author jason.xu
    */
    export class PlayerHomePageInfoSelf extends ProUI.PlayerInfo.PageView.HomePageInfoSelfUI implements ITableView
    {

        private _lvTxtClickNum: number = 0;
        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.listCombo.selectEnable = true;
            //测试shader tag:jason
            // ShaderFactory.setColorShader(this.imgBg, false, false, 171, 77, 175, 255);
            // ShaderFactory.setFlowLightShader(this.imgBg, false, false, 3.0, 0.0015, 0.3, 0.45, false); //流光
            // ShaderFactory.setShaderComponent(this.imgBg, PerspectiveShaderComponent).setVertexPos(0, 0.1, 0.7, 0.5, 1, 0.9, 0, 1.05); //拉扯图形
        }

        public addEvent(): void
        {
            EventMgr.on(EventNotify.Shape_Base_Update, this, this.refreshBaseView);
            EventMgr.on(CmdEvent.Common_PlayerRenameAck, this, this.refreshNickNameView);

            this.btnComboCity.onClick(this, this.onClickComboCity);
            this.btnComboProveince.onClick(this, this.onClickComboProveince);
            this.btnFansHelp.onClick(this, this.onClickFansHelp);
            this.btnRename.onClick(this, this.onClickRename);
            this.btnSetting.onClick(this, this.onClickSetting);
            this.btnShape.onClick(this, this.onClickShape);
            this.btnTitle.onClick(this, this.onClickTitle);
            this.btnFansRank.onClick(this, this.onClickFansRank);
            this.popupViewMask.onClick(this, this.hideAllPopupView);
            this.imgHeadBtn.onClick(this, this.onClickHead);
            this.txtLv.on(LayaEvent.CLICK, this, this.onLvTxtClick);

        }
        onLvTxtClick()
        {
            this._lvTxtClickNum++;
            if (this._lvTxtClickNum > 10)
            {
                LayerManager.Inst.hideUI();
                EventMgr.trigger(EventNotify.test_hide_ui);
            }
        }

        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Shape_Base_Update, this, this.refreshBaseView);
            EventMgr.off(CmdEvent.Common_PlayerRenameAck, this, this.refreshNickNameView);

        }

        /** 点击下拉按钮省份*/
        private onClickComboProveince(): void
        {
            this.comboBoxListView.x = 87;
            this.comboBoxListView.visible = true;
            this.popupViewMask.visible = true;

            let province = ShapeDataMgr.province;
            let list = cfg.ShapeProvinceCfgData.getProvinceList();
            this.listCombo.onRefresh(list.length, this, (btn: component.UIButton, index: number) =>
            {
                let cfg = list[index];
                (btn.getChildByName("txtName") as Laya.Label).text = cfg.proveinceName;
                (btn.getChildByName("sel") as Laya.Image).visible = province == cfg.provinceID;
                btn.onClick(this, () =>
                {
                    this.hideAllPopupView();
                    if (province == cfg.provinceID) { return; }
                    ShapeSend.setProvince(cfg.provinceID, cfg.cityID);
                });
            })
        }

        /** 点击下拉按钮城市 */
        private onClickComboCity(): void
        {
            let province = ShapeDataMgr.province;
            if (province == 0) { return; }
            this.comboBoxListView.x = 478;
            this.comboBoxListView.visible = true;
            this.popupViewMask.visible = true;

            let city = ShapeDataMgr.city;
            let list = cfg.ShapeProvinceCfgData.getCityListByProvince(province);
            this.listCombo.onRefresh(list.length, this, (btn: component.UIButton, index: number) =>
            {
                let cfg = list[index];
                (btn.getChildByName("txtName") as Laya.Label).text = cfg.cityName;
                (btn.getChildByName("sel") as Laya.Image).visible = city == cfg.cityID;
                btn.onClick(this, () =>
                {
                    this.hideAllPopupView();
                    if (city == cfg.cityID) { return; }
                    ShapeSend.setProvince(cfg.provinceID, cfg.cityID);
                });
            })
        }

        private hideAllPopupView(): void
        {
            this.comboBoxListView.visible = false;
            this.popupViewMask.visible = false;
            this.fansHelpView.visible = false;
        }

        /** 点击粉丝帮助按钮 */
        private onClickFansHelp(): void
        {
            this.fansHelpView.visible = true;
            this.popupViewMask.visible = true;
            let fansRank = 0;  //当前粉丝排名 temp tag:jason
            this.txtFansHelpRank.text = Global.getLangStr("arena_msg2") + (fansRank == 0 ? Global.getLangStr("common_norank") : fansRank + "");
            let iconFrameId = 1;   //众星捧月的边框ID， 待正式配置之后修改  tag:jason
            this.txtFansPrizeName.text = cfg.ShapeHeadIconCfgData.getNameByID(iconFrameId);
            Global.setResHeadBorder(this.imgFansPrizeFrame, iconFrameId);
        }

        /** 点击改名 */
        private onClickRename(): void
        {
            if (TimeController.checkIsNotAllowSayAnything())
            {
                TipsUtils.showTipsByLanId("tips_not_allow");
                return;
            }
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Rename));
        }

        /** 点击设置 */
        private onClickSetting(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_SystenSetting));
        }

        /** 点击头像 */
        private onClickHead(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ShapeDev, 0));
        }

        /** 点击形象 */
        private onClickShape(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ShapeDev, 2));
        }

        /** 点击称号 */
        private onClickTitle(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ShapeDev, 3));
        }

        /** 点击粉丝排行榜 */
        private onClickFansRank(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankMain), BaseBackUIType.HideBackUI);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            //伙伴列表,  这里回头需要改成单独配置的形式，服务器尚未完成
            let embattleInfo = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
            PetDataMgr.refreshOnStoreHeroWithZhenfa(embattleInfo);
            let petList = PetDataMgr.getOnStoreHeroForMainLine();
            this.listHeros.onRefresh(petList.length, this, (tempUI: Pro.NorItemUI, index: number) =>
            {
                let petData = petList[index];
                tempUI.setPetInfoExtend(petData, true);
            });
            this.refreshBaseView();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }

        private refreshNickNameView(): void
        {
            this.txtNickname.text = PlayerDataMgr.name;
        }

        public refreshBaseView(): void
        {
            //当前省份显示
            this.refreshCityView();

            this.txtNickname.text = PlayerDataMgr.name;
            this.txtLv.text = PlayerDataMgr.level + "";
            this.txtFaction.text = FactionDataMgr.getFactionName();
            this.txtFans.text = "0";  //粉丝数 待服务器完成后处理 tag:jason
            this.txtGrade.text = cfg.DanUpgradeCfgData.getDanNameByDanID(DanDataMgr.curDanId);
            //头像框
            Global.setResIconWithItemID(this.imgHead, CfgID.ResType.Player_Icon, ShapeDataMgr.iconId);
            Global.setResHeadBorder(this.imgHeadBorder, ShapeDataMgr.iconFrameID);
        }

        /** 刷新当前省份显示 */
        private refreshCityView(): void
        {
            let province = ShapeDataMgr.province;
            let city = ShapeDataMgr.city;
            let cfgProvince = cfg.ShapeProvinceCfgData.getCfgInfoByDoubleIndex(province, city);
            if (!cfgProvince)
            {
                //城市未选时，默认拿第一个城市来读取省份名字， 城市名显示未设置
                cfgProvince = cfg.ShapeProvinceCfgData.getCityListByProvince(province)[0];
                ShapeDataMgr.city = 0;
                this.txtCityName.text = cfg.ShapeProvinceCfgData.getCityNameByIndex(0);  //未设置
            } else
            {
                this.txtCityName.text = cfgProvince.cityName;
            }
            this.txtProveinceName.text = cfgProvince.proveinceName;
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

    }
}