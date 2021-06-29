module Pro {
    /**
     * @ 进化预览
     */
    export class HeroEvolutionPreviewMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.Hero.HeroDetail.Preview.HeroEvolutionPreviewUI;

        // private _currentHero: Net.hero;
        private _useskinid: number;
        private _currentPetId: number;

        private _petEvolueCfgInfoArr: cfg.PetEvolveCfgInfo[];
        private _currentShowInfo: cfg.PetEvolveCfgInfo;
        /**0:itemid;1:num */
        private _needItemArr: string[];


        /**当前显示进化的等级 */
        private _currentShowIndex: number = 0;

        private _checkBol: boolean = false;

        /**list 数据 */
        private _dataArr: cfg.AddAtterInfo[];
        private _skinArr: cfg.PetSkinCfgInfo[];

        constructor() {
            super();
        }
         /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
         public autoLoadAtlas(): Array<any>
         {
             return [UrlMgr.getAtlas("evolution")];
         }

        public openUI() {
            this.showPanel(ProUI.Hero.HeroDetail.Preview.HeroEvolutionPreviewUI, 1, BaseAddLayer.RootUI, false, 1);
        }
        public closeUI() {

            super.closeUI();
        }
        public initialization() {
            this.UIPanel.btn_close.onClick(this, this.closeUI)
            this.UIPanel.btn_left.onClick(this, this._clickBtnLeft);
            this.UIPanel.btn_right.onClick(this, this._clickBtnRight);



        }
        public initUI() {
            this.setCheckBol(false);
            this._currentPetId = this.UIOpenData.customObject;
            this._currentShowIndex = 0;

            this._petEvolueCfgInfoArr = cfg.PetEvolveCfgData.getInfoWithIdArr(this._currentPetId);

            this._useskinid = cfg.PetCfgData.getBaseSkinByPetID(this._currentPetId);


            this._skinArr = [cfg.PetSkinCfgData.getInfo(cfg.PetCfgData.getBaseSkinByPetID(this._currentPetId))];
            for (let i = 0; i < this._petEvolueCfgInfoArr.length; i++) {
                this._skinArr.push(cfg.PetSkinCfgData.getInfo(this._petEvolueCfgInfoArr[i].skinID));
            }
            this.UIPanel.roleList.onRefreshWithArray(this._skinArr, this, this.onRoleItemRender);

            this.UIPanel.roleList.scrollBar.mouseWheelEnable = false;

            //let tmpPetResID = this._currentHero.useskinid ? this._currentHero.useskinid : cfg.PetCfgData.getBaseSkinByPetID(this._currentHero.id);
            //=====================================================================================
            let tmpPetResID2 = this._petEvolueCfgInfoArr[this._currentShowIndex].skinID;
            //下一个形态和当前形态一样
            if (tmpPetResID2 == this._useskinid ) {
                this.setCheckBol(true);
            }

            //this.showDataByIndex(this._currentShowIndex)
            this.UIPanel.roleList.scrollTo(this._currentShowIndex);
            this._refresh();
            //this.UIPanel.lbl_des.text=Global.getLangStr("evolution_tip_des_1"+this._currentHero.evolve);


        }
        _lastPoint = new Laya.Point();
        protected onTargetMouseDown(e: Event): void {
            this._lastPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
            Laya.stage.once(Laya.Event.MOUSE_UP, this, this.onStageMouseUp2);
            Laya.stage.once(Laya.Event.MOUSE_OUT, this, this.onStageMouseUp2);
        }
        /**@private */
        protected onStageMouseUp2(e: Event): void {
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onStageMouseUp2);
            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onStageMouseUp2);

            let isLeft: boolean = this._lastPoint.x - Laya.stage.mouseX > 0;
            let index = isLeft ? this._currentShowIndex + 1 : this._currentShowIndex - 1;
            index = Math.max(0, index);
            index = Math.min(index, this._skinArr.length - 2);



            this.showDataByIndex(index);
        }
        public addEvent() {

            this.getDarkUI().onClick(this, this.closeUI.bind(this));

            this.UIPanel.roleList.on(Laya.Event.MOUSE_DOWN, this, this.onTargetMouseDown);


        }
        public removeEvent() {
            this.UIPanel.roleList.off(Laya.Event.MOUSE_DOWN, this, this.onTargetMouseDown);
        }

        private setCheckBol(bol: boolean): void {
            this._checkBol = bol;
        }



        private _clickBtnLeft() {
            this._currentShowIndex--;
            this._currentShowIndex = this._currentShowIndex < 0 ? 0 : this._currentShowIndex;//this._currentShowIndex < this._currentHero.evolve ? this._currentHero.evolve : this._currentShowIndex;
            this.showDataByIndex(this._currentShowIndex);

        }

        private _clickBtnRight() {
            this._currentShowIndex++;
            this._currentShowIndex = this._currentShowIndex > this._petEvolueCfgInfoArr.length - 1 ? this._petEvolueCfgInfoArr.length - 1 : this._currentShowIndex;
            this.showDataByIndex(this._currentShowIndex);
        }

        private showDataByIndex(showIndex: number) {

            this._currentShowIndex = showIndex;
            this.UIPanel.roleList.tweenTo(showIndex);
            this._refresh();
        }

        private _refresh() {

            this._refreshData();
        }
        private _refreshData() {
            this.UIPanel.btn_left.visible = this._currentShowIndex > 0;//this._currentShowIndex > this._currentHero.evolve;
            this.UIPanel.btn_right.visible = this._currentShowIndex < this._petEvolueCfgInfoArr.length - 1;


            this._currentShowInfo = this._petEvolueCfgInfoArr[0];
            this._needItemArr = this._currentShowInfo.needItem.split("_");

            //this.UIPanel.label_level.text=this._currentShowInfo.needLevel.toString()

            this._dataArr = cfg.PetEvolveCfgData.getIninAttrAryById(this._currentShowInfo.id);
            this.UIPanel.list.onRefreshWithArray(this._dataArr, this, this.onItemRender)
        }

        private onItemRender(item: EvolutionMainViewItem, index: number) {
            let data: cfg.AddAtterInfo = this._dataArr[index];
            item.setData(data);
        }
        private onRoleItemRender(item: EvolutionMainViewSkelItem, index: number) {
            let data: cfg.PetSkinCfgInfo = this._skinArr[index];
            item.setData(data, 0 == index, index == this._skinArr.length - 1, index);
        }
    }
}