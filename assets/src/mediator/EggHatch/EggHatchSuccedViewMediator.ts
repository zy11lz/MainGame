module Pro {
    /**
     * @ 孵化加速界面
     */
    export class EggHatchSuccedViewMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.EggHatch.EggHatchSuccedViewUI;

        private _heroSkel:SkeletonPlayer;

        

        constructor() {
            super();
        }
         /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
         public autoLoadAtlas(): Array<any>
         {
            return [UrlMgr.getAtlas("rewardpopup")];
         }

        public openUI() {
            this.showPanel(ProUI.EggHatch.EggHatchSuccedViewUI, 1, BaseAddLayer.CenterUI, true, 1);
        }
       
        public initialization() {
            

        }
        public initUI() {
           this.refreshUI();
        }
        public addEvent() {

        }
        public removeEvent() {

        }

        public refreshUI(){
            this._createSkel();
            let index=this.UIOpenData.customObject;
            
            
            let info=cfg.IncubatePetEggCfgData.getInfo(index);
            let skinID=cfg.PetCfgData.getBaseSkinByPetID(info.petId);
            let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
            var showScale = cfg.PetSkinCfgData.getShowScaleById(skinID);
			this._heroSkel.scale(showScale, showScale);
            this._heroSkel.load(UrlMgr.getModelSkUrl(skelName));
            let firstAniAction = cfg.PetSkinCfgData.getFirstActById(skinID);
            this._heroSkel.play(firstAniAction ? firstAniAction : "win_loop", true);
            this.UIPanel.addChild(this._heroSkel);
        }

        private _createSkel(){
            if(!this._heroSkel){
                this._heroSkel=new SkeletonPlayer();
                this._heroSkel.pos(378,801);
            }
        }
        private _clearSkel(){
            if(this._heroSkel){
                this._heroSkel.removeSelf();
                this._heroSkel.releaseSkel();
                this._heroSkel=null;
            }



        }
        /** 关闭UI*/
		closeUI(): void
		{
            this._clearSkel();
            super.closeUI();
            

        }



    }


}