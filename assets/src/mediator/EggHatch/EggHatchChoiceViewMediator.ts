module Pro {
    /**
     * @ 孵化选蛋界面
     */
    export class EggHatchChoiceViewMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.EggHatch.EggHatchSelectViewUI;
        /** 当前选择的英雄类型索引 */
        private TmpSelectHeroTypeIndex = -1;

        /** 英雄列表 */
        private TmpSystemHeroList: Array<cfg.IncubatePetEggCfgInfo>;

        private _currentSelectInfo:cfg.IncubatePetEggCfgInfo;
        private _currentSelectItem:NorItemUI;
        

        constructor() {
            super();
        }
         /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
         public autoLoadAtlas(): Array<any>
         {
             return null;
         }

        public openUI() {
            this.showPanel(ProUI.EggHatch.EggHatchSelectViewUI, 1, BaseAddLayer.CenterUI, true, 1);
        }
        public closeUI() {

            super.closeUI();
        }
        public initialization() {
            this.UIPanel.btn_close.onClick(this,this.closeUI);
            this.UIPanel.btn_save.onClick(this,this._btnSaveHadler);

        }
        public initUI() {
            this._currentSelectInfo=null;
            this._currentSelectItem=null;
            this.TmpSelectHeroTypeIndex = -1
            this._refreshHeroType();
            this._refreshValue();

        }
        public addEvent() {
            EventMgr.on(EventNotify.PlayerItemNumChange, this, this._itemNumChange);

        }
        public removeEvent() {
            EventMgr.off(EventNotify.PlayerItemNumChange, this, this._itemNumChange);
        }

        /** 刷新英雄类型 */
        private _refreshHeroType(tabIndex: number=0)
        {
            let startTypeIndex = tabIndex
            let heroTypeNum = 1+ Pb_God._emPetType.PetType_Moon;
            this.UIPanel.HeroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
            {

                Global.setResPetType(itemUI,  index);
                itemUI.onClick(this, this._onHeroTypeClick);

                if (this.TmpSelectHeroTypeIndex == -1)
                {
                    this._onHeroTypeClick(itemUI);
                }

            });
        }

        /** 选择一个英雄类型 */
        private _onHeroTypeClick(btn: component.UIButton)
        {
            if(this.TmpSelectHeroTypeIndex==parseInt(btn.name))return;

            this.UIPanel.HeroTypeSelectImg.x = btn.x;
            this.UIPanel.HeroTypeSelectImg.y = btn.y;
            this.TmpSelectHeroTypeIndex = parseInt(btn.name);
            this._refreshHeroList();
        }
        //---------------------------------英雄Icon刷新----------------------------------------
        /** 刷新英雄列表 */
        private _refreshHeroList()
        {
            this.TmpSystemHeroList = cfg.IncubatePetEggCfgData.getListByType(this.TmpSelectHeroTypeIndex );
            this.UIPanel.HeroItemList.onRefresh(this.TmpSystemHeroList.length, this, this._onHeroItemRender);
        }

        
         /** 英雄刷新 */
         private _onHeroItemRender(item: ProUI.EggHatch.item.EggHatchChoiceItemViewUI, index: number)
         {
             let tmpHeroInfo = this.TmpSystemHeroList[index];
             item.norItem.setPetUI(cfg.PetCfgData.getBaseSkinByPetID(tmpHeroInfo.petId),tmpHeroInfo.petStar);

             item.norItem.onClick(this, this._itemSelectHandler);
             item.norItem.name=item.name;
             let tempUpgradeAry=cfg.IncubatePetEggCfgData.getNeedItemAryByIndex(tmpHeroInfo.index);
             Global.drawItemUI(item.newItem, tempUpgradeAry[0], false, false, false,"#5d565d", "#5d565d");
             item.newItem.NumLb.text=Global.numberToTuckString(tempUpgradeAry[0].itemcount);
         }

         private _itemSelectHandler(item:NorItemUI){

            if(this._currentSelectItem){
                this._currentSelectItem.SelectStatueImg.visible=false;
            }

            this._currentSelectItem=item;
            this._currentSelectItem.SelectStatueImg.visible=true;

            this._currentSelectInfo=this.TmpSystemHeroList[Number.parseInt(item.name)];



         }
         private _btnSaveHadler(){
             if(this._currentSelectInfo){
                let tempUpgradeAry=cfg.IncubatePetEggCfgData.getNeedItemAryByIndex(this._currentSelectInfo.index);
                if (!Global.isFullAllRes(tempUpgradeAry))
                {
                    return;
                }
                IncubateEggSend.start(this._currentSelectInfo.index);
                this.closeUI();
             }else{
                TipsUtils.showTipsByLanId("EggHatchMsg1");
             }


         }

         private  _itemNumChange(fID: number, tempNewNum: number){ 
            let tempUpgradeAry=cfg.IncubatePetEggCfgData.getNeedItemAry();
            if(fID==tempUpgradeAry[0].itemid){
                this._refreshValue();
            }
         }

        private  _refreshValue(){
            let tempUpgradeAry=cfg.IncubatePetEggCfgData.getNeedItemAry();
            Global.drawItemUI(this.UIPanel.costBox, tempUpgradeAry[0], false, false, false,"#ffffff", "#ffffff",this,this._costBoxClickHandler);
            let bagNum=Global.numberToTuckString(Global.getItemNum(tempUpgradeAry[0].itemid));
            this.UIPanel.costBox.NumLb.text=bagNum;
        }
        private _costBoxClickHandler(){
            let tempUpgradeAry=cfg.IncubatePetEggCfgData.getNeedItemAry();
            let costItemID=tempUpgradeAry[0].itemid;
            if (costItemID == Pro.CfgID.ItemID.Diamond)
            {
                Pro.PlatformDataMgr.openChargeUI();
            }
            else
            {
                Pro.UIManager.Inst.forceOpen(new Pro.BaseOpenUIData(Pro.PanelNotify.Open_ItemAccess, costItemID));
            }

        }


         









    }


}