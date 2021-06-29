module Pro {
    export class WeekWelfareMainViewMediator extends BaseMediator implements IMediator {

        public UIPanel: ProUI.WeekWelfare.WeekWelfareMainViewUI;

        private days:Pb_God.PBPlayerActivityIndexData[];
        private _endTime:number;

        private _activityId:number;

        public static ceshiOpen() {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Week_Welfare));

        }
        constructor() {
            super();
        }
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any> {
            return [UrlMgr.getAtlas("weekWelfare")
            ];
        }
        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string> {
            return [];
        }
        public openUI(){
            this.showPanel(ProUI.WeekWelfare.WeekWelfareMainViewUI,1,BaseAddLayer.CenterUI, false, 1);
        }
        /**
         * 关闭UI
         */
        public closeUI(){
            this.closePanel(1);
            Laya.timer.clear(this,this._loopTime);
        }

        public initialization(){


        }
        public addEvent(){
            this.UIPanel.btn_close.onClick(this,this.closeUI);
            this.addEventMgr(EventNotify.Activity_Update, this, this.onUpdateActivity);

        }
        public removeEvent(){
            EventMgr.off(EventNotify.Activity_Update, this, this.onUpdateActivity);

        }
        public initUI(){
            this._activityId=cfg.ActivityEggLuckyEggCfgData.getFirstInfo().activityID;
            this.days=Pro.ActivityDataMgr.getWeekWelfareData();
            this.UIPanel.eggList.onRefresh(this.days.length,this,this.renderHandler);
            this._endTime=Pro.ActivityDataMgr.getWeekWelfareEndTime();

            let remainTime=this._endTime-TimeController.currTimer/1000;
            if(remainTime>0){
                this._loopTime();
                Laya.timer.loop(1000,this,this._loopTime);
            }else{
                this.UIPanel.lbl_time.text=Global.getLangStr("common_over");
            }

            if(Pro.ActivityDataMgr.getWeekWelfareOpen()){
                this.UIPanel.lbl_show.text=Global.getLangStr("activity_msg29");     
            }else{
                this.UIPanel.lbl_show.text=Global.getLangStr("activity_msg30");    
            }



        }

        public renderHandler(cell: Pro.WeekWelfareitem, index: number) {
            cell.setData(this.days[index]);
        }
        private _loopTime(){
            let remainTime=Math.floor(this._endTime-TimeController.currTimer/1000);
            if(remainTime>0)
                this.UIPanel.lbl_time.text=Global.GetRemindTime(remainTime);
            else{
                Laya.timer.clear(this,this._loopTime);
                this.UIPanel.lbl_time.text=Global.getLangStr("common_over");
            }
        }

        /*****
         *    活动更新
         */
        protected onUpdateActivity(actId: number): void
        {
            if (this._activityId != actId) { return; }  //不同同一个活动。
            let isOpening=!Pro.ActivityDataMgr.getWeekWelfareAllGift();
            if(isOpening){
                this.initUI();
            }else{
                this.closeUI();
            }
            

        }

    }
}