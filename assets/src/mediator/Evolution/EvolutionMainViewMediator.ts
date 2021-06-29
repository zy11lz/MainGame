module Pro {
    /**
     * @ 进化
     */
    export class EvolutionMainViewMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.evolution.EvolutionMainViewUI;



        private _currentHero: Net.hero;
        private _useskinid: number;

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
            this.showPanel(ProUI.evolution.EvolutionMainViewUI, 1, BaseAddLayer.CenterUI, false, 1);
        }
        public closeUI() {

            super.closeUI();
        }
        public initialization() {
            this.UIPanel.btn_close.onClick(this, this.closeUI)
            this.UIPanel.btn_left.onClick(this, this._clickBtnLeft);
            this.UIPanel.btn_right.onClick(this, this._clickBtnRight);
            this.UIPanel.btn_check.onClick(this, this._clickBtnCheck);
            this.UIPanel.btn_evolution.onClick(this, this._clickBtnEvolution);



        }
        public initUI() {
            this.setCheckBol(false);
            this._currentHero = this.UIOpenData.customObject;
            this._currentShowIndex = this._currentHero.evolve;

            this._petEvolueCfgInfoArr = cfg.PetEvolveCfgData.getInfoWithIdArr(this._currentHero.id);


            this.UIPanel.btn_check.getChildAt(0).active = this._checkBol;


            this._useskinid = this._currentHero.useskinid ? this._currentHero.useskinid : cfg.PetCfgData.getBaseSkinByPetID(this._currentHero.id);


            this._skinArr = [cfg.PetSkinCfgData.getInfo(cfg.PetCfgData.getBaseSkinByPetID(this._currentHero.id))];
            for (let i = 0; i < this._petEvolueCfgInfoArr.length; i++) {
                if (this._currentHero.evolve == this._petEvolueCfgInfoArr[i].evolve) {
                    this._skinArr.push(cfg.PetSkinCfgData.getInfo(this._useskinid));
                } else {
                    this._skinArr.push(cfg.PetSkinCfgData.getInfo(this._petEvolueCfgInfoArr[i].skinID));
                }

            }


            //this.UIPanel.roleList.startIndex=this._currentHero.evolve;
            //this.UIPanel.roleList.elasticEnabled = false;
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

            if (this._currentShowIndex == this._skinArr.length - 2) {
                this.UIPanel.btn_evolution_label.text = "超进化";

            } else {
                this.UIPanel.btn_evolution_label.text = "进化";
            }



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

            this.addEventMgr(Cmd.S2C_Pet_Evolve_Ack.cmdName, this, this.onEvolve);
            this.addEventMgr(EventNotify.Equip_Changed, this, this._refreshValue);

            this.UIPanel.roleList.on(Laya.Event.MOUSE_DOWN, this, this.onTargetMouseDown);


        }
        public removeEvent() {

            this.removeEventMgr(Cmd.S2C_Pet_Evolve_Ack.cmdName, this, this.onEvolve);
            this.removeEventMgr(EventNotify.Equip_Changed, this, this._refreshValue);
            this.UIPanel.roleList.off(Laya.Event.MOUSE_DOWN, this, this.onTargetMouseDown);
        }
        private _clickBtnCheck() {
            this.setCheckBol(!this._checkBol);
        }

        private setCheckBol(bol: boolean): void {
            this._checkBol = bol;
            (this.UIPanel.btn_check.getChildAt(0) as Laya.Image).visible = bol;
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


            this._currentShowInfo = this._petEvolueCfgInfoArr[this._currentHero.evolve];
            this._needItemArr = this._currentShowInfo.needItem.split("_");

            //this.UIPanel.label_level.text=this._currentShowInfo.needLevel.toString();

            //道具ID转换成小图标资源            
            Global.setResSmallIconWithItemID(this.UIPanel.image_need_good, Number(this._needItemArr[0]));


            this._dataArr = cfg.PetEvolveCfgData.getIninAttrAryById(this._currentShowInfo.id);
            this.UIPanel.list.onRefreshWithArray(this._dataArr, this, this.onItemRender)



            this._refreshValue();
        }

        private _refreshValue() {
            let ownCount = Global.getItemNum(Number(this._needItemArr[0]));
            this.UIPanel.label_need_good.text = ownCount + "/" + this._needItemArr[1];
            this.UIPanel.needItemBox.width = this.UIPanel.label_need_good.x + this.UIPanel.label_need_good.width;
        }



        private onItemRender(item: EvolutionMainViewItem, index: number) {
            let data: cfg.AddAtterInfo = this._dataArr[index];
            item.setData(data);
        }
        private onRoleItemRender(item: EvolutionMainViewSkelItem, index: number) {
            let data: cfg.PetSkinCfgInfo = this._skinArr[index];
            item.setData(data, this._currentHero.evolve == index, index == this._skinArr.length - 1, index);
        }





        private _clickBtnEvolution(e: Laya.Event) {
            // let level:number=this._currentShowInfo.needLevel;
            // if(this._currentHeroLevel<level){
            //     Pro.TipsUtils.showTips(Global.getLangStr("precondition_4",level));
            //     return;
            // }

            let currentShowInfo = this._petEvolueCfgInfoArr[this._currentHero.evolve];
            let needItemArr = currentShowInfo.needItem.split("_");
            if (!Global.isFullRes(Number(needItemArr[0]), Number(needItemArr[1]), true))
                return;


            let alertStr: string = "";//this._checkBol ? Global.getLangStr("evolution_tip_des_0", Global.numberToChinese(currentShowInfo.evolve)) : Global.getLangStr("evolution_tip_des_1", Global.numberToChinese(currentShowInfo.evolve));
            if (this._checkBol) {
                if (this._currentHero.evolve == this._petEvolueCfgInfoArr.length - 1) {
                    alertStr = Global.getLangStr("evolution_tip_des_20")
                } else {
                    alertStr = Global.getLangStr("evolution_tip_des_0", Global.numberToChinese(currentShowInfo.evolve))
                }
            } else {
                if (this._currentHero.evolve == this._petEvolueCfgInfoArr.length - 1) {
                    alertStr = Global.getLangStr("evolution_tip_des_21")
                } else {
                    alertStr = Global.getLangStr("evolution_tip_des_1", Global.numberToChinese(currentShowInfo.evolve))
                }
            }


            AlertShow.showConfirmAlert(alertStr, this, this.evolutionSend.bind(this), "common_confirm", "common_cancel");
        }
        public evolutionSend() {


            PetSend.evolve_Ask(this._currentHero.sn, this._checkBol);


        }
        /*****
         *进化 PBG2CPet_Evolve_Ack
         * @param PBG2CPet_Evolve_Ack
         * 		sn			uint64	伙伴sn
         * 		isevolve			bool	是否进化形态
         */
        protected onEvolve(value: Pb_God.PBG2CPet_Evolve_Ack): void {


            if (this._currentHero.sn.equals(value.sn)) {
                this._currentHero.evolve = value.evolve;
                this._currentHero.useskinid = value.skinid;
                this._currentShowIndex = this._currentHero.evolve;

                // if (this._currentShowIndex >= this._petEvolueCfgInfoArr.length)
                // {
                //     this.closePanel();
                // } else
                // {
                //     this._refresh();
                // }

                this.closePanel();

            }
            AwardOpenUtils.setLock(true);  //锁起来，把奖励提示延后处理
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EvolutionEffectUpView, this._currentHero));

        }













    }














}