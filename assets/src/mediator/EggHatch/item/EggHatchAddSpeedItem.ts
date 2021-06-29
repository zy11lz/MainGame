
module Pro {
    export class EggHatchAddSpeedItem extends ProUI.EggHatch.item.EggHatchAddSpeedItemViewUI {

        public _data: cfg.IncubateSpeedUpCfgInfo;

        private _incubateEgg:Pb_God.PBIncubateEgg;

        private _index:number;
       

        onAwake() {
            this.btn_use.onClick(this,this.btnUseHandler);
            

        }
        btnUseHandler(){

            if (Global.isFullRes(this._data.itemID, 1, true))
            {
                IncubateEggSend.speedUp(this._incubateEgg.Index,this._data.itemID);

                switch(this._data.itemType){
                    case 2:
                        TipsUtils.showTipsByLanId("EggHatchMsg7");
                    break;
                    case 3:
                        TipsUtils.showTipsByLanId("EggHatchMsg8");
                    break;



                }


            }
        }


        public onDisable(){
            if(this._data&&this._data.itemType==2){
                Laya.timer.clearAll(this);
            }
            this._data=null;
                
        }
        


        public setData(index: number) {
            this._index=index;
            let dataArr=cfg.IncubateSpeedUpCfgData.getDataArr();
            this._data=dataArr[index];
            let iteminfo=cfg.ItemCfgData.getInfo(this._data.itemID);
            this.item.setItemID(this._data.itemID,0,false,false,false);
            this.lbl_remain.text=Global.getItemNum(this._data.itemID).toString();
            this.lbl_des.text=iteminfo.desc;


            this._incubateEgg=IncubateEggDataMgr.IncubateEggs[0]



            switch(this._data.itemType){
                case 1:
                    this.btn_use.visible=true;
                    this.btn_used.visible=false;
                    this.btn_time.visible=false;

                break
                case 2:
                    
                    this.btn_used.visible=false;
                    this.btn_time.visible=true;

                    if(this._incubateEgg.BikeEndTime&&this._incubateEgg.BikeEndTime*1000-TimeController.currTimer>0){
                        this.btn_use.visible=false;
                        this.btn_time.visible=true;
                        this._timePass();
                        Laya.timer.loop(1000,this,this._timePass);

                    }else{
                        this.btn_use.visible=true;
                        this.btn_time.visible=false;


                    }
                break
                case 3:
                    
                    this.btn_time.visible=false;
                    if(this._incubateEgg.IsUseSubTotalStep){
                        this.btn_use.visible=false;
                        this.btn_used.visible=true;

                    }else{
                        this.btn_use.visible=true;
                        this.btn_used.visible=false;
                    }

                break
            }
        }

        private _timePass(){
            let time:number=this._incubateEgg.BikeEndTime-TimeController.currTimer/1000;
            if(time<0){
                Laya.timer.clearAll(this);
                this.setData(this._index);
            }else{
                this.lbl_remainTime.text=Global.GetRemindTime(time,9);
            }
        }
    }

}