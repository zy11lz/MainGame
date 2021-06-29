module Pro {
    /**
     * @ 孵化主界面
     */
    export class EggHatchMainViewMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.EggHatch.EggHatchMainViewUI;

        public eggSkel:SkeletonPlayer;
        public zSkel:SkeletonPlayer;

        public incubateEgg:Pb_God.PBIncubateEgg;
        //0:添加蛋，1：孵化中，2：获得蛋
        private _status:number=0;

        private _anitype:number=0;
        private aniDanArr:string[]=["dan_shui","dan_huo","dan_cao","dan_guang","dan_an"];
        private aniDanArr2:string[]=["dan_shui01","dan_huo01","dan_cao01","dan_guang01","dan_an01"];
        private aniZArr:string[]=["dan_shui02","dan_huo02","dan_cao02","dan_guang02","dan_an02"];
         

        public static openUI(){
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EggHatchMain));
        }

        constructor() {
            super();
        }
         /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
         public autoLoadAtlas(): Array<any>
         {
            return [UrlMgr.getAtlas("eggHatch")];
         }

        public openUI() {
            //this.showPanel(ProUI.EggHatch.EggHatchMainViewUI, 1, BaseAddLayer.CenterUI, false, 1);
            this.showPanel(ProUI.EggHatch.EggHatchMainViewUI, 3);
        }
        public closeUI() {
            this.clearSkel();
            super.closeUI();
        }
        public initialization() {
            this.UIPanel.btn_close.onClick(this,this.closeUI);
            this.UIPanel.btn_choice.onClick(this,this._openChoiceEgg);

            let alertStr: string =  Global.getLangStr("EggHatchMsg2");
            this.UIPanel.btn_cancel.onClick(this,()=>{
                AlertShow.showConfirmAlert(alertStr, this, this._cancelHandler, "common_confirm", "common_cancel");

            })

            this.UIPanel.btn_addSpeed.onClick(this,()=>{
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EggHatchAddSpeed));
            })

            this.UIPanel.btn_activity.onClick(this,this._btnActivityHandler);


        }
        private _btnActivityHandler(){
            let tempUpgradeAry=cfg.IncubatePetEggCfgData.getNeedItemAry();
            let tempItemID=tempUpgradeAry[0].itemid;
            if (tempItemID == Pro.CfgID.ItemID.Diamond)
            {
                Pro.PlatformDataMgr.openChargeUI();
                return;
            }
            let tempGateWayStr = cfg.ItemCfgData.getGetwayById(tempItemID);
            let tempGateWaylist = tempGateWayStr.length > 0 ? tempGateWayStr.split(";") : [];
            if(tempGateWaylist.length){
                let tmpUIID = parseInt(tempGateWaylist[0]);
				let uiCfg = cfg.UiconfigUiopenCfgData.getInfo(tmpUIID);
				//功能是否开启
				let sysOpen = PlayerDataMgr.checkSystemSwitchOpen(uiCfg.systemSwitchId);
				if (sysOpen)
				{
                    TaskUtils.goto(uiCfg.panelNotify, uiCfg.page);
				}
            }
        }


        
        private _openChoiceEgg(){
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EggHatchChoice));
        }
        private _cancelHandler(){
            IncubateEggSend.cancel(this.incubateEgg.Index);
        }
        public addEvent() {
            EventMgr.on(CmdEvent.IncubateEgg_SynInfo,this,this.refreshUI);
            this.UIPanel.img_add.on(Laya.Event.CLICK,this,this._openChoiceEgg);

        }
        public removeEvent() {
            EventMgr.off(CmdEvent.IncubateEgg_SynInfo,this,this.refreshUI);
            this.UIPanel.img_add.off(Laya.Event.CLICK,this,this._openChoiceEgg);
        }
        public initUI() {
            this.UIPanel.btn_help.onClick(this, () =>
			{
				CommonHelpView.show(this.UIPanel.btn_help, Global.getLangStr("eggHatchTips1"));
			});
            this.refreshUI();
            this.reddotBind(this.UIPanel.RedDotImg_group,IncubateEggDataMgr.reddotModel.getChildModel("groupID"));
        }
        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
            this.incubateEgg=null;
            this._anitype=0;

            if(IncubateEggDataMgr.IncubateEggs.length){
                this.incubateEgg=IncubateEggDataMgr.IncubateEggs[0];
                this.incubateEgg.CurrStep=this.incubateEgg.CurrStep>this.incubateEgg.TotalStep?this.incubateEgg.TotalStep:this.incubateEgg.CurrStep;

                let petInfo=cfg.PetCfgData.getInfo(cfg.IncubatePetEggCfgData.getPetIdByIndex(this.incubateEgg.Index));
                this._anitype=petInfo.petType -1;
                this.UIPanel.lbl_title.text=Global.getLangStr("EggHatchMsg6",cfg.PetSkinCfgData.getFileNameById(petInfo.baseSkin));
                if(this.incubateEgg.CurrStep>=this.incubateEgg.TotalStep){
                    this._showUIStatus(2);
                    this._showSkelStatus(2)
                }else{

                    if(this.incubateEgg.CurrStep>=(this.incubateEgg.TotalStep>>1)){
                        this._showSkelStatus(2);
                    }else{
                        this._showSkelStatus(1)
                    }
                    this._showUIStatus(1);
                    
                }
            }else{
                this.UIPanel.lbl_title.text="";
                this._showUIStatus(0);
                 this._showSkelStatus(0);
            }
        }

        /**
         * 
         * @param status 0:无，1:正常蛋，2：裂缝蛋
         */
        private _showSkelStatus(status:number){
            if(!this.eggSkel&&status==0)return;
            if(!this.eggSkel){
                this.eggSkel=new SkeletonPlayer();
                this.eggSkel.pos(364,576);
                this.eggSkel.load(UrlMgr.getSpineSceneUrl("texiao/dan/dan"));
                this.eggSkel.on(Laya.Event.CLICK,this,this._eggSkelClickHandler)

            }
            if(!this.zSkel){
                this.zSkel=new SkeletonPlayer();
                this.zSkel.pos(489,416);
                this.zSkel.load(UrlMgr.getSpineSceneUrl("texiao/zzz/zzz"));
            }
            switch(status){
                case 0:
                    this.eggSkel.removeSelf();
                    this.zSkel.removeSelf();
                break;
                case 1:
                    this.UIPanel.addChildAt(this.zSkel,0);
                    this.UIPanel.addChildAt(this.eggSkel,0);

                    this.eggSkel.play(this.aniDanArr[this._anitype], true);
                    this.zSkel.play(this.aniZArr[this._anitype], true);
                break;
                case 2:
                    this.UIPanel.addChildAt(this.eggSkel,0);
                    this.eggSkel.play(this.aniDanArr2[this._anitype], true);
                    this.zSkel.removeSelf();
                   

                break;
            }
        }
        private clearSkel(){
            if(this.eggSkel){
                this.eggSkel.removeSelf();
                this.eggSkel.releaseSkel();
                this.eggSkel=null;
            }
            if(this.zSkel){
                this.zSkel.removeSelf();
                this.zSkel.releaseSkel();
                this.zSkel=null;
            }
        }

        private _eggSkelClickHandler(e){
            if(this._status==2){
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EggHatchSucced,IncubateEggDataMgr.IncubateEggs[0].Index));
            }
        }

        /**
         * 
         * @param status 0:添加蛋，1：孵化中，2：获得蛋
         */
        private _showUIStatus(status:number){
            this._status=status;

            this.UIPanel.img_add.visible=false;
            this.UIPanel.btn_cancel.visible=false;
            this.UIPanel.btn_addSpeed.visible=false;
            this.UIPanel.btn_choice.visible=false;

            

            switch(status){
                case 0:
                    Global.setProgressBarMask(this.UIPanel.img_pro, 0);
                    this.UIPanel.lbl_speed.innerHTML=Global.getLangStr("EggHatchMsg9",0);
                    this.UIPanel.lbl_progress.text="";
                    this.UIPanel.btn_choice.visible=true;
                    this.UIPanel.img_add.visible=true;
                    
                break;
                case 1:
                    this.UIPanel.btn_cancel.visible=true;
                    this.UIPanel.btn_addSpeed.visible=true;
                    
                    this.UIPanel.lbl_progress.text = Global.getLangStr("EggHatchMsg4",this.incubateEgg.CurrStep + "/" + this.incubateEgg.TotalStep) ;
                    

                    Global.setProgressBarMask(this.UIPanel.img_pro, this.incubateEgg.CurrStep/this.incubateEgg.TotalStep);

                    if(this.incubateEgg.BikeEndTime-TimeController.currTimer/1000>0){
                        this.UIPanel.lbl_speed.innerHTML = Global.getLangStr("EggHatchMsg10",this.incubateEgg.Speed) ;
                    }
                    else{
                        this.UIPanel.lbl_speed.innerHTML = Global.getLangStr("EggHatchMsg9",this.incubateEgg.Speed) ;
                    }
                    

                break;
                case 2:
                    this.UIPanel.lbl_speed.innerHTML=Global.getLangStr("EggHatchMsg9",0);
                    this.UIPanel.lbl_progress.text="";

                     this.UIPanel.lbl_progress.text = Global.getLangStr("EggHatchMsg4",this.incubateEgg.CurrStep + "/" + this.incubateEgg.TotalStep) ;
                    Global.setProgressBarMask(this.UIPanel.img_pro, this.incubateEgg.CurrStep/this.incubateEgg.TotalStep);


                     //判断英雄背包格子
                     if (PetDataMgr.getPetList().length + 1 > PetDataMgr.getSpaceNum())
                     {
                         TipsUtils.showTipsByLanId("hero_msg24");
                     }else{
                         IncubateEggSend.pip(IncubateEggDataMgr.IncubateEggs[0].Index)
                     }
                break;
            }
        }



    }


}