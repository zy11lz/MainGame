module Pro
{
    /**
     * 精灵界面中 守护tab
     */
    export class HeroDefendPanel extends ProUI.Hero.HeroDefend.HeroDefendPanelUI{

        private _plan:Pb_God.PBDefendPlan;
        private _redDotModel:RedDotModel;

        constructor(){
            super();
            this.initUI();


            
        }

        public initUI(){
            //this.btn_upgrade.onClick(this,this.heroUpgradeClick)
            this.btn_locationSet.onClick(this,this.locationSetClick);
            this.list_pet.setDragStatue(false)
            this.list_ball.setDragStatue(false);
            this.list_addAttr.setDragStatue(false);
            this.QABtn.onClick(this, () =>
			{
				CommonHelpView.show(this.QABtn, Global.getLangStr("defendtips1"));
            });
            this.btn_book.onClick(this,()=>{
                UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendBookMediator));
            })

        }
        onEnable(){
            
            EventMgr.on(EventNotify.PlayerItemNumChange, this, this._refreshValue);
            EventMgr.on(CmdEvent.Defend_SavePlan_Ask,this,this.refreshUI);
            EventMgr.on(CmdEvent.Defend_UsePlan_Ask,this,this.refreshUI);
            EventMgr.on(CmdEvent.Defend_PlansChg,this,this.refreshUI);
            EventMgr.on(CmdEvent.Defend_Attr,this,this._powerChange);
            EventMgr.on(CmdEvent.Defend_LevelUp_Ask,this,this._onLevelUp);
            EventMgr.on(CmdEvent.Defend_RankUp_Ask,this,this._onRankUp)
            
            

            this._refreshValue();
            this.refreshUI();
            this._powerChange();
            this._onLevelUp();
            this._onRankUp();

            this.img_preview.on(Laya.Event.CLICK,this,this.onImgPreviewClick);

            this._redDotModel=DefendDataMgr.reddotModel.getChildModel(5);
            this._redDotModel.on(Laya.Event.CHANGE, this, this.onChangeReddot);
            this.onChangeReddot(null);
        }
        onChangeReddot(reddotModel:any){
            this.RedDotImg_upgrade.visible=this._redDotModel.isRedDot;

        }
        
        onDisable(){
            EventMgr.off(EventNotify.PlayerItemNumChange, this, this._refreshValue);
            EventMgr.off(CmdEvent.Defend_SavePlan_Ask,this,this.refreshUI)
            EventMgr.off(CmdEvent.Defend_UsePlan_Ask,this,this.refreshUI);
            EventMgr.off(CmdEvent.Defend_PlansChg,this,this.refreshUI);
            EventMgr.off(CmdEvent.Defend_Attr,this,this._powerChange)
            EventMgr.off(CmdEvent.Defend_LevelUp_Ask,this,this._onLevelUp);
            EventMgr.off(CmdEvent.Defend_RankUp_Ask,this,this._onRankUp)
            this.img_preview.off(Laya.Event.CLICK,this,this.onImgPreviewClick);
            this._redDotModel.off(Laya.Event.CHANGE, this, this.onChangeReddot);
        }
        onImgPreviewClick(){
            UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendPreviewMediator));
        }


       
		private _onLevelUp(): void
		{
            let info=cfg.DefendRankCfgData.getInfo(DefendDataMgr.rank);
            this.lbl_level.text=DefendDataMgr.level+"/"+info.maxLevel;
            
            let attrAry2: Array<cfg.AddAtterInfo>=cfg.DefendLevelCfgData.getAddPetAttrAryByIndex(DefendDataMgr.level);
            let attrAry3: Array<cfg.AddAtterInfo>=cfg.DefendRankCfgData.getAddPetAttrAryByIndex(DefendDataMgr.rank);
            this.list_addAttr.onRefresh(attrAry2.length,this,(itemUI: ProUI.Utils.AtterItemInfoUI, index: number) =>
			{
				let tmpAtterID = attrAry2[index].type;
				itemUI.imgType.frame = tmpAtterID;
                itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
                let value= attrAry2[index].value;
                let rankValue=cfg.DefendRankCfgData.getAddPetAttrByIndex(DefendDataMgr.rank,attrAry2[index].type).value;
                
				itemUI.NumLb.text = (value+rankValue).toString();
				itemUI.NumLb.color = "#5d565d";
				itemUI.TitleLb.color = "#5d565d";
				itemUI.NumLb.x = itemUI.TitleLb.x + itemUI.TitleLb.width + 3;
            });

            
			this._refreshValue();
        }
        _refreshValue(){
            //0:升级，1：进阶
            let type=0;
            let tempUpgradeAry=cfg.DefendRankCfgData.getNeedItemAryByIdLevel(DefendDataMgr.level);
            if(tempUpgradeAry.length){
                let info=cfg.DefendRankCfgData.getInfoByLv(DefendDataMgr.level);
                //已经进阶成功
                if(DefendDataMgr.rank>info.rank){
                    tempUpgradeAry=null;
                }
            }

            if(!tempUpgradeAry||!tempUpgradeAry.length){
                tempUpgradeAry = cfg.DefendLevelCfgData.getNeedItemAryByIdLevel(DefendDataMgr.level);
                this.lbl_btn_upgrade.text=Global.getLangStr("artifact_tab1");
            }else{
                type=1;
                this.lbl_btn_upgrade.text=Global.getLangStr("hero_msg13");
            }
            
            if(tempUpgradeAry.length){
                this.UpgradeCostBox.onRefresh(tempUpgradeAry.length, this, (itemUI: ProUI.Artifact.CostItemUI, index: number) =>
                {
                    Global.drawItemUI(itemUI, tempUpgradeAry[index], false, true, true, "#5b545b", "#f13b54");
                });
            }else{
                this.img_maxLevel.visible=true;
                this.box_upgrade.visible=false;
                
            }
            //this.imgRedDotUpgrade.visible = Global.isFullAllRes(tempUpgradeAry, false);
            this.btn_upgrade.onClick(this, () =>
            {
                if (!Global.isFullAllRes(tempUpgradeAry))
                {
                    return;
                }
                if(type){
                    //DefendSend.rankUp();
                    DefendSend.previewAttr(false);
                }else{
                    DefendSend.levelUp()
                }
            });


        }
        
		
		private _onRankUp(data=null): void
		{
            this.lbl_rank.text=Global.getLangStr("attr_stage",DefendDataMgr.rank.toString());
            let info=cfg.DefendRankCfgData.getInfo(DefendDataMgr.rank);
            this.img_ball.skin="res/heroDefend/"+info.model;
            this.lbl_name.text=cfg.DefendRankCfgData.getNameByRank(DefendDataMgr.rank);

            this.lbl_level.text=DefendDataMgr.level+"/"+info.maxLevel;

            this._refreshValue();
            this.refreshUI();
            
            if(data){
                this.showUI_jinjieUp();
            }
        }
        /**
         * 进阶效果
         */
        public showUI_jinjieUp(parent: Laya.Sprite = LayerManager.Inst.effectLayer)
        {

            let effName = "HeroDefendAdvanceSucViewUI";
            let tmpUI: ProUI.Hero.HeroDefend.HeroDefendAdvanceSucViewUI = Public.PoolMgr.getItem(effName);
            if (tmpUI == null)
            {
                tmpUI = new ProUI.Hero.HeroDefend.HeroDefendAdvanceSucViewUI();
                tmpUI.anchorX = 0.5;
                tmpUI.anchorY = 0.5;
            }
            tmpUI.x = parent.width >>1;
            tmpUI.y = parent.height * 0.31;
            parent.addChild(tmpUI);
            tmpUI.alpha = 0;
            tmpUI.alpha = 1;

            Laya.Tween.to(tmpUI, { alpha: 1 }, 400, Laya.Ease.quadOut, Laya.Handler.create(this, () =>
            {
                Laya.Tween.to(tmpUI, { scaleX: 1.3, scaleY: 1.3 }, 50, Laya.Ease.quadOut, Laya.Handler.create(this, () =>
                {
                    Laya.Tween.to(tmpUI, { scaleX: 1, scaleY: 1 }, 50, Laya.Ease.quadOut, Laya.Handler.create(this, () =>
                    {
                        Laya.Tween.to(tmpUI, { alpha: 0 }, 300, Laya.Ease.quadOut, null, 500)
                        tmpUI.removeSelf();
                        Public.PoolMgr.recoverItem(effName, tmpUI);
                    }))
                }))
            }), 500);
           
        }

       
        locationSetClick(){
            UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendLocationSet))
        }
        refreshUI(){
            this._plan=DefendDataMgr.getCurrentPlan();
            this.list_pet.onRefresh(4,this,this._listPetRender);
            this.itemBox_skill.onRefresh(4,this,this._itemBoxSkillRender);
            
        }
        private _listPetRender(item: Pro.HeroDefendHeroItem, index: number){
            item.setData(index);
        }
        private _itemBoxSkillRender(item: Pro.HeroDefendSkillItem, index: number){
            item.setData(index);
        }
        

        _powerChange(){
            this.lbl_power.text=DefendDataMgr.power.toString();
             //属性加成列表
             let attrAry: Array<Pb_God.PBAttrInfo>=DefendDataMgr.attr;//cfg.DefendLevelCfgData.getAddBaseAttrAryByIndex(DefendDataMgr.level);
             this.list_ball.onRefresh(attrAry.length,this,(itemUI: ProUI.Utils.AtterItemInfoUI, index: number) =>
             {
                 let tmpAtterID = attrAry[index].type;
                 itemUI.imgType.frame = tmpAtterID;
                 itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
                 itemUI.NumLb.text = Math.ceil(attrAry[index].value.toInt()/100).toString() ;
                 itemUI.NumLb.color = "#5d565d";
                 itemUI.TitleLb.color = "#5d565d";
                 itemUI.NumLb.x = itemUI.TitleLb.x + itemUI.TitleLb.width + 3;
             });
        }

        

       





    }





}