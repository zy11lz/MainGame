module Pro
{
    /**
     *  胡帕解放
     */
    export class HuPaLiberateMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.HuPa.HuPaLiberateUI;

        constructor()
        {
            super();
        }
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("hupa")];
        }

        public openUI()
        {
            this.showPanel(ProUI.ActivityMain.HuPa.HuPaLiberateUI, 1, BaseAddLayer.CenterUI, false, 1);
        }

        public closeUI()
        {
            Public.EffectUtils.clearShakeAndStop(this.UIPanel.btnLiberate);
            super.closeUI();
        }

        public initialization()
        {
            for (let i = 0; i < 2; i++)
            {
                let skinID = i == 0 ? cfg.PetCfgData.getBaseSkinByPetID(CfgID.PetID.HuPa) : cfg.PetCfgData.getBaseSkinByPetID(CfgID.PetID.HuPaLiberate);
                let sk = new SkeletonPlayer();
                //获取资源ID
                let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
                let firstAniAction = cfg.PetSkinCfgData.getFirstActById(skinID);
                sk.play(firstAniAction ? firstAniAction : "win_loop", false);
                sk.on(LayaEvent.STOPPED, this, this.onSkStop, [sk]);
                sk.load(UrlMgr.getModelSkUrl(skelName));
                let bo = this.UIPanel[`bo${ i + 1 }`];
                let lbl = this.UIPanel[`nameLbl${ i + 1 }`];
                bo.addChild(sk);
                lbl.text = cfg.PetSkinCfgData.getFileNameById(skinID);
                sk.pos(bo.width >> 1, bo.height >> 1);
            }


            let bgSk = new SkeletonPlayer();
            bgSk.setRes(UrlMgr.getSpineSceneUrl("UIeffect/xuanzhuan"));
            bgSk.playbackRate(0.5);
            bgSk.playByIndex(0, true);
            this.UIPanel.bgImg.addChild(bgSk);
            bgSk.scale(1.2, 1.2);
            bgSk.pos(365, 580);

            Global.setResSmallIconWithItemID(this.UIPanel.needIcon, CfgID.ItemID.Hupa_Item3);


        }

        private onSkStop(sk, e: LayaEvent)
        {
            sk.play("standby_loop", true);
        }

        public initUI()
        {
            Public.EffectUtils.shakeAndStop(this.UIPanel.btnLiberate);
            this.UIPanel.needLbl.text = ItemDataMgr.getBagItemNum(CfgID.ItemID.Hupa_Item3) + "/" + cfg.PetCallFixChangeCfgData.getHuPaInfo().removeItems.split("_")[1];
        }

        public addEvent()
        {
            this.UIPanel.btn_close.onClick(this, this.closeUI)
            this.UIPanel.btnLiberate.onClick(this, this.onLiberate);
        }

        private onLiberate()
        {
            if (!Global.isFullRes(CfgID.ItemID.Hupa_Item3, parseInt(cfg.PetCallFixChangeCfgData.getHuPaInfo().removeItems.split("_")[1]), true))
            {
                this.closeUI();
                return;
            }
            let tmpInfo:Net.hero=PetDataMgr.getPetInfo(this.UIOpenData.customObject);
            if(tmpInfo.isDefend){
                AlertShow.showConfirmAlert(Global.getLangStr("HeroDefendMsg8",cfg.PetSkinCfgData.getFileNameByPetID(tmpInfo.id)), this, () =>
					{
						Pro.DefendSend.removePet(tmpInfo.sn);
					})
				return;
            }


            AlertShow.showConfirmAlert(Global.getLangStr("hero_hupa_ex10"), this, () =>
            {
                CallSend.fixChange(Pb_God._emFixChangeType.FixChangeType_UnLockPetActivity, this.UIOpenData.customObject);
                UIManager.Inst.closeByName(PanelNotify.Open_HeroDetail);
                this.closeUI();
            }, "common_confirm", "common_cancel");
        }

        public removeEvent()
        {

        }
    }
}