module Pro{
    
    export class WeekWelfareitem extends ProUI.WeekWelfare.item.WeekWelfareItemViewUI{

        private _data:cfg.ActivityEggLuckyEggCfgInfo;
        private _status:Pb_God._emLuckyEggStatus;
        private _countDownTime:number;

        onAwake(){

           

            this.btn_get.onClick(this,this.onBtnGetClick)
        }
        onEnable(){
            


        }
        onDisable(){

            

        }
        onBtnGetClick(){

            ActivitySend.drawReward(this._data.activityID, this._data.index, 0);

        }


        public setData(data:Pb_God.PBPlayerActivityIndexData){
            this._data=cfg.ActivityEggLuckyEggCfgData.getInfo(data.index);
            let addItemList: cfg.AddItemInfo[] = cfg.AddItemInfo.parse(this._data.addItem);
            this.itemBox.onRefresh(addItemList.length, this, (itemUI: NorItemUI, index: number) => {
                itemUI.setItemInfo(addItemList[index]);
            })

            this.frame_day.frame=this._data.day;
            for(let i=0;i<data.data.length;i++){
                let indexData=data.data[i];
                if(indexData.key==Pb_God._emActivityDataKey.Activity_Key_LuckyEgg_CountDown){
                    this._countDownTime=indexData.value;
                    
                }else if(indexData.key==Pb_God._emActivityDataKey.Activity_Key_LuckyEgg_Index_Status){
                    this._status=indexData.value;
                    
                }
            }
            switch(this._status){
                // 不可领取;
                case Pb_God._emLuckyEggStatus.LuckyEgg_Status_Can_Not_Get:
                    this._lateState();
                    break;
                // 可领;
                case Pb_God._emLuckyEggStatus.LuckyEgg_Status_Can_Get:
                    this._canGetState();
                    break;
                // 已领取;
                case Pb_God._emLuckyEggStatus.LuckyEgg_Status_Already_Get :
                    this._receiveState();
                    break;
                // 错过领取时间;
                case Pb_God._emLuckyEggStatus.LuckyEgg_Status_Miss_Time :
                    this._loseState();
                    break;
            }






        }
        //已错过
        private _loseState(){
            this.frame_day.gray=true;
            this.img_btn_lose.visible=true;
            this.img_btn_receive.visible=false;
            this.img_get.visible=false;
            this.img_lose.visible=true;
            this.btn_get.visible=true;
            this.lbl_remain.visible=false; 
            this.btn_get.mouseEnabled=false;

            
        }
        //已领取
        private _receiveState(){
            this.frame_day.gray=true;
            this.img_btn_lose.visible=false;
            this.img_btn_receive.visible=true;
            this.img_get.visible=true;
            this.img_lose.visible=false;
            this.btn_get.visible=true;
            this.lbl_remain.visible=false; 
            this.btn_get.mouseEnabled=false;
        }
        //可领取
        private _canGetState(){
            this.frame_day.gray=false;
            this.img_btn_lose.visible=false;
            this.img_btn_receive.visible=false;
            this.img_get.visible=false;
            this.img_lose.visible=false;
            this.btn_get.visible=true;
            this.lbl_remain.visible=false; 
            this.btn_get.mouseEnabled=true;
        }
        /**不可领取 */
        private _lateState(){
            this.btn_get.visible=false;
            this.frame_day.gray=false;
            this.img_lose.visible=false;
            this.img_get.visible=false;
            
            this.btn_get.mouseEnabled=false;

            this.lbl_remain.visible=true; 


            //let badTime = (this._countDownTime - TimeController.currTimer/1000) ;
            //let day = Math.ceil(badTime / 86400);   // 天

            if(this._countDownTime==1){
                this.lbl_remain.text=Global.getLangStr("activity_msg16");
            }
            else{
                this.lbl_remain.text=Global.getLangStr("activity_msg28",this._countDownTime);
            }


            

        }

       





    }





}