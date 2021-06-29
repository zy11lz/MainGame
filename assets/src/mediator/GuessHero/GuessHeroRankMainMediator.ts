module Pro {
    export class GuessHeroRankMainMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.GuessHero.GuessHeroRankMainUI;

        /**角色列表*/
        public list: Pb_God.PBTopListDetail[];
        /**自己信息*/
        public selfinfo: Pb_God.PBTopListDetail;

        public myRewardIndex: number = 1;



        public openUI() {
            this.showPanel(ProUI.GuessHero.GuessHeroRankMainUI, 3, BaseAddLayer.CenterUI, false, 0);
        }

        public initialization() {

            this.UIPanel.tabGrp.onClick(this, this.onTabClick, null);
            this.UIPanel.tabGrp.setTableData([new component.UITabData("ui_Activity_CountGiftsReward_msg1"), new component.UITabData("ui_Activity_CountGiftsReward_msg2")], [new component.UITabStyle("#5b545b"), new component.UITabStyle("#fff8db")])
            this.UIPanel.tabGrp.setSelectTab(0);


        }
        public addEvent() {
            this.UIPanel.btn_close.onClick(this, this.closeUI);
            this.addEventMgr(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            //返回奖励索引	PBS2CRewardID 
           // this.addEventMgr(CmdEvent.TopList_RewardID, this, this.onRewardID);
        }
        /**
         * 关闭UI
         */
        public closeUI() {
            this.closePanel(4, true, true);
        }

        public removeEvent() {
            this.removeEventMgr(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            //this.removeEventMgr(CmdEvent.TopList_RewardID, this, this.onRewardID);

        }

        /** 收到排行榜 */
        private onList_Ack(value: Pb_God.PBS2CTopListList) {
            if (!value.ask || Pb_God._emTopListType.TopListType_Guess != value.ask.type) { return; }

            this.list = value.list;//this.dataArr;
            this.selfinfo = value.selfinfo;
            this.UIPanel.list_rank.onRefresh(this.list.length, this, (itemUI: Pro.GuessHeroRankItem, index: number) => {
                itemUI.setData(this.list[index]);
            })

            this.setData(this.selfinfo);

        }
       /*****
		 *返回奖励索引	PBS2CRewardID 
		 * @param PBS2CRewardID
		 * 		type			uint32	排行类型 _emTopListType
		 * 		RewardID			uint32	榜单奖励索引
		 */
        // protected onRewardID(value: Pb_God.PBS2CRewardID): void {
        //     if(value.type!=Pb_God._emTopListType.TopListType_Guess)return;

        //     this.myRewardIndex = value.RewardID;
        //     let selfCfgInfo: cfg.ToplistRewardCfgInfo = cfg.ToplistRewardCfgData.getInfo(value.RewardID)
        //     if (selfCfgInfo) {
        //         this.UIPanel.lbl_reward_rank.text =  Global.getLangStr("common_rank5", selfCfgInfo.rank / 100);    
        //         let addItemList: cfg.AddItemInfo[] = cfg.AddItemInfo.parse(selfCfgInfo.reward);
        //         this.UIPanel.itemBox.onRefresh(addItemList.length, this, (itemUI: NorItemUI, index: number) => {
        //             itemUI.setItemInfo(addItemList[index]);
        //         })
        //     } else {
        //         this.UIPanel.lbl_reward_rank.text = Global.getLangStr("common_norank");
        //         this.UIPanel.itemBox.itemCount = 0;
        //     }
        // }

        public initUI() {
            this.UIPanel.list_rank.array=null;


            //TopListSend.rewardID(Pb_God._emTopListType.TopListType_Guess);
            //请求战绩排行
            TopListSend.list(Pb_God._emTopListType.TopListType_Guess, 1, 100, 0, 0, 0, 0);
            // let rankRewardArray:cfg.GuessRankRewardCfgInfo[]=cfg.GuessRankRewardCfgData.getDataArr();
            let rankRewardArray: cfg.ToplistRewardCfgInfo[] = cfg.ToplistRewardCfgData.getRewardListByType(Pb_God._emTopListType.TopListType_Guess);

            this.UIPanel.list_reward.onRefresh(rankRewardArray.length, this, (itemUI: Pro.GuessHeroRewardItem, index: number) => {
                let preData:cfg.ToplistRewardCfgInfo;
                if(index>0){
                    preData=rankRewardArray[index-1];
                }
                itemUI.setData(rankRewardArray[index],preData);
            });


            let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Guess, 0)[0];
            let tmpEndTime = ActivityDataMgr.getActivityEndTimeStamp(actCfgInfo.iD);
            let tmpPassTime = tmpEndTime*1000 - TimeController.currTimer;
            if(tmpPassTime>0){
                this.UIPanel.lbl_finishTime.text = Global.getLangStr("element_msg3", Global.GetRemindTime(tmpPassTime / 1000, 9))
            }else{
                this.UIPanel.lbl_finishTime.text=Global.getLangStr("common_over");
            }


        }
        public setData(data: Pb_God.PBTopListDetail) {
            if (!data || !data.info || !data.playerdisplay) {//未上榜
                this.UIPanel.lbl_reward_rank2.text = Global.getLangStr("common_norank");
                this.UIPanel.box_mySelf.visible = false;
                this.UIPanel.itemBox.itemCount = 0;
                this.UIPanel.frame_rank.visible = false;
                this.UIPanel.lbl_rank.text = "";

                return;
            } else {
                this.UIPanel.lbl_reward_rank2.text = "";
                this.UIPanel.box_mySelf.visible = true;
            }

            this.UIPanel.lbl_name.text = data.playerdisplay.playername;
            Global.setResIconWithItemID(this.UIPanel.image_icon, CfgID.ResType.Player_Icon, data.playerdisplay.head);
            //边框
            Global.setResHeadBorder(this.UIPanel.imgHeadBorder, data.playerdisplay.headicon);
            this.UIPanel.lbl_score.text = data.info.value.toString(10);
            if (data.info.rank < 4) {
                this.UIPanel.frame_rank.frame = data.info.rank;
                this.UIPanel.frame_rank.visible = true;
                this.UIPanel.lbl_rank.text = "";
                
            } else {
                this.UIPanel.frame_rank.visible = false;
                this.UIPanel.lbl_rank.text = data.info.rank.toString();
            }

            let selfCfgInfo: cfg.ToplistRewardCfgInfo = cfg.ToplistRewardCfgData.getInfoByRank(data.info.rank,Pb_God._emTopListType.TopListType_Guess)
            if (selfCfgInfo) {
                let addItemList: cfg.AddItemInfo[] = cfg.AddItemInfo.parse(selfCfgInfo.reward);
                this.UIPanel.itemBox.onRefresh(addItemList.length, this, (itemUI: NorItemUI, index: number) => {
                    itemUI.setItemInfo(addItemList[index]);
                })
            } else {
                this.UIPanel.itemBox.itemCount = 0;
            }





        }

        private onTabClick(tab: component.UITab, tabIndex: number, oldTabIndex: number): void {
            this.UIPanel.panel_rank.visible = tabIndex == 0;
            this.UIPanel.panel_rewards.visible = tabIndex == 1;



        }




    }





}