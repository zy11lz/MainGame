module Pro {
    /**
     * 进阶
     */
    export class HeroDefendAdvanceMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.Hero.HeroDefend.HeroDefendAdvanceViewUI;
        private _plan:Pb_God.PBDefendPlan;
        private _tempUpgradeAry:cfg.AddItemInfo[];

        

        public constructor() {
            super();
        }
        public autoLoadAtlas(): Array<any> {
            return [];
        }
        public openUI(): void {
            this.showPanel(ProUI.Hero.HeroDefend.HeroDefendAdvanceViewUI,1,BaseAddLayer.TopUI,true);
        }
        public closeUI(): void {
            this.closePanel();
        }
        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void {
            this.UIPanel.list_ball.setDragStatue(false);
            this.UIPanel.list_hero.setDragStatue(false);
            this.UIPanel.list_ball_add.setDragStatue(false);
            this.UIPanel.list_hero_add.setDragStatue(false);
            


        }
        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void {
            this.UIPanel.btn_close.onClick(this,this.closeUI);
            this.UIPanel.btn_sure.onClick(this,this._onBtnSureClick);
            this.UIPanel.btn_cancel.onClick(this,this.closeUI);
            //EventMgr.on(CmdEvent.Defend_RankUp_Ask,this,this._onRankUp)

        }
        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void {
            //EventMgr.off(CmdEvent.Defend_RankUp_Ask,this,this._onRankUp)

        }

          /**
         * 初始化面板ui
         */
        public initUI(): void {


            let info=cfg.DefendRankCfgData.getInfo(DefendDataMgr.rank);
            let infoNext=cfg.DefendRankCfgData.getInfo(DefendDataMgr.rank+1);

            this.UIPanel.lbl_levelUp1.text=info.maxLevel.toString();
            this.UIPanel.lbl_levelUp2.text=infoNext.maxLevel.toString();
            this.UIPanel.lbl_slot.text=infoNext.tips;


            this._tempUpgradeAry=cfg.DefendRankCfgData.getNeedItemAryByIdLevel(DefendDataMgr.level);

            if(this._tempUpgradeAry.length){
                this.UIPanel.UpgradeCostBox.onRefresh(this._tempUpgradeAry.length, this, (itemUI: ProUI.Artifact.CostItemUI, index: number) =>
                {
                    Global.drawItemUI(itemUI, this._tempUpgradeAry[index], false, true, true, "#5b545b", "#f13b54");
                });
            }
            let len:number=0;
            //属性加成列表
            let attrAry: Array<Pb_God.PBAttrInfo>=DefendDataMgr.attr;//cfg.DefendLevelCfgData.getAddBaseAttrAryByIndex(DefendDataMgr.level);
            len=attrAry.length>4?4:attrAry.length;
            this.UIPanel.list_ball.onRefresh(len,this,(itemUI: ProUI.Utils.AtterItemInfoUI, index: number) =>
            {
                let tmpAtterID = attrAry[index].type;
                itemUI.imgType.frame = tmpAtterID;
                itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
                itemUI.NumLb.text = Math.ceil(attrAry[index].value.toInt()/100).toString() ;
                itemUI.NumLb.color = "#5d565d";
                itemUI.TitleLb.color = "#5d565d";
                itemUI.NumLb.x = itemUI.TitleLb.x + itemUI.TitleLb.width + 3;
            });

            let attrAry2: Array<cfg.AddAtterInfo>=cfg.DefendLevelCfgData.getAddPetAttrAryByIndex(DefendDataMgr.level);
            len=attrAry2.length>3?3:attrAry2.length;
            this.UIPanel.list_hero.onRefresh(len,this,(itemUI: ProUI.Utils.AtterItemInfoUI, index: number) =>
			{
				let tmpAtterID = attrAry2[index].type;
				itemUI.imgType.frame = tmpAtterID;
                itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
                let value:number=attrAry2[index].value
                let rankValue=cfg.DefendRankCfgData.getAddPetAttrByIndex(DefendDataMgr.rank,attrAry2[index].type).value;
				itemUI.NumLb.text = (value+rankValue).toString() ;
				itemUI.NumLb.color = "#5d565d";
				itemUI.TitleLb.color = "#5d565d";
				itemUI.NumLb.x = itemUI.TitleLb.x + itemUI.TitleLb.width + 3;
            });

            let attrAry3: Array<cfg.AddAtterInfo>=cfg.DefendRankCfgData.getAddPetAttrAryByIndex(DefendDataMgr.rank+1);
            len=attrAry3.length>3?3:attrAry3.length;
            this.UIPanel.list_hero_add.onRefresh(len,this,(itemUI: Laya.Image, index: number) =>
			{
                let value:number=attrAry3[index].value;
                let rankValue=cfg.DefendRankCfgData.getAddPetAttrByIndex(DefendDataMgr.rank,attrAry3[index].type).value;
                itemUI.visible=(value-rankValue)>0;
                (itemUI.getChildAt(0) as component.UILabel).text="+"+Math.ceil(value-rankValue);
            });



             //属性加成列表
             let attrAry4: Array<Pb_God.PBAttrInfo>=DefendDataMgr.attr2;
             let min=Math.min(attrAry.length,attrAry4.length);
             len=min>4?4:min;
             this.UIPanel.list_ball_add.onRefresh(len,this,(itemUI:Laya.Image, index: number) =>
             {
                let value:number=attrAry4[index].value.toNumber()-attrAry[index].value.toNumber();
                itemUI.visible=value>0;
                (itemUI.getChildAt(0) as component.UILabel).text="+"+Math.ceil(value/100);
             });
        }

        private _onBtnSureClick(){
            if (!Global.isFullAllRes(this._tempUpgradeAry))
            {
                return;
            }
            DefendSend.rankUp();
            this.closeUI();

        }
        


        




    }
}