module Pro {
    /**
     * @ 孵化加速界面
     */
    export class EggHatchAddSpeedViewMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.EggHatch.EggHatchAddSpeedViewUI;

        public incubateEgg: Pb_God.PBIncubateEgg

        constructor() {
            super();
        }
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any> {
            return null;
        }

        public openUI() {
            this.showPanel(ProUI.EggHatch.EggHatchAddSpeedViewUI, 1, BaseAddLayer.CenterUI, true, 1);
        }
        public closeUI() {

            super.closeUI();
        }
        public initialization() {
            this.UIPanel.btn_close.onClick(this, this.closeUI);
        }
        public addEvent() {
            EventMgr.on(CmdEvent.IncubateEgg_SynInfo,this,this.refreshUI);
        }
        public removeEvent() {
            EventMgr.off(CmdEvent.IncubateEgg_SynInfo,this,this.refreshUI);
        }
        public initUI() {
            this.refreshUI();
        }
        public refreshUI() {
            this.incubateEgg = IncubateEggDataMgr.IncubateEggs[0];
            if(!this.incubateEgg){
                this.closeUI();
                return;
            }
            if(this.incubateEgg.CurrStep>=this.incubateEgg.TotalStep){
                this.closeUI();
                return;
            }
            this.incubateEgg.CurrStep=this.incubateEgg.CurrStep>this.incubateEgg.TotalStep?this.incubateEgg.TotalStep:this.incubateEgg.CurrStep;

            let dataArr = cfg.IncubateSpeedUpCfgData.getDataArr();
            this.UIPanel.list_item.onRefresh(dataArr.length, this, this.listRenderHandler);

            this.UIPanel.lbl_progress.text = Global.getLangStr("EggHatchMsg4",this.incubateEgg.CurrStep + "/" + this.incubateEgg.TotalStep) ;

            Global.setProgressBarMask(this.UIPanel.img_pro, this.incubateEgg.CurrStep / this.incubateEgg.TotalStep);

            if(this.incubateEgg.BikeEndTime-TimeController.currTimer/1000>0){
                this.UIPanel.lbl_speed.innerHTML = Global.getLangStr("EggHatchMsg10",this.incubateEgg.Speed) ;
            }
            else{
                this.UIPanel.lbl_speed.innerHTML = Global.getLangStr("EggHatchMsg9",this.incubateEgg.Speed) ;
            }

        }
        
        listRenderHandler(itemUI: Pro.EggHatchAddSpeedItem, index: number) {

            itemUI.setData(index);
        }



    }


}