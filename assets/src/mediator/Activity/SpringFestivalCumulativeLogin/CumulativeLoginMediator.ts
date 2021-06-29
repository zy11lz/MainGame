module Pro
{
    /**
     * 春节累计登录
     */
    export class CumulativeLoginMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.ActivityMain.NewYear.SpringFestivalCumulativeLogin.CumulativeLoginUI;

        // 服务端活动数据
        private act_data: Pb_God.PBPlayerActivityData;

        // 登陆活动配置列表
        private login_cfg_arr: cfg.ActivityLoginCfgInfo[];

        // 当前支持的直购礼包列表
        private charge_cfg_arr: cfg.ChargeCfgInfo[];

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("CumulativeLogin"), UrlMgr.getAtlas("activitymain")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return ["res/CumulativeLogin/huodong_leideng_pic01.png"];
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.NewYear.SpringFestivalCumulativeLogin.CumulativeLoginUI, 3, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            super.closeUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_Total);
            this.initSevenDay();
            this.refreshUI();

        }
        private initSevenDay(): void
        {
            let actID = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_Total).id;
            // let cfg_list = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_Total);
            // let act_cfg = cfg_list[0];
            this.login_cfg_arr = cfg.ActivityLoginCfgData.getDataArrayByActivityId(actID);
        }
        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            //累计登录的天数
            let loginDay = ActivityDataMgr.getActivity_DataValue(this.act_data.id, Pb_God._emActivityDataKey.Activity_Key_LoginDays);
            this.UIPanel.txt_day.showText = Global.getLangStr("SpringFestival_Login_CumulativeLogin", loginDay);

            //当前在活动第几天
            let act_start_time = ActivityDataMgr.getActivityServerOpenTime(this.act_data.id);
            let overTime = ActivityDataMgr.getActivityEndTimeStamp(this.act_data.id);
            let leftTime = TimeController.currTimer / 1000 - act_start_time;
            let leftTime1 = overTime - TimeController.currTimer / 1000;
            let day = Math.floor(leftTime / 86400);
            day = leftTime / 86400 > day ? day + 1 : day;
            if (leftTime <= 0)
            {
                this.UIPanel.txt_time.showText = Global.getLangStr("SpringFestival_NotOpen");
            }
            else if (leftTime1 <= 0)
            {
                this.UIPanel.txt_time.showText = Global.getLangStr("SpringFestival_Over");
            }
            else
                this.UIPanel.txt_time.showText = Global.getLangStr("SpringFestival_Login_ActivityTime", day);

            //条目数据刷新
            this.UIPanel.itemList.onRefreshWithArray(this.login_cfg_arr, this, (itemUI: ProUI.ActivityMain.NewYear.SpringFestivalCumulativeLogin.CumulativeLoginListItemUI, index: number) =>
            {
                let tmpLoginCfg = this.login_cfg_arr[index];
                itemUI.numberDay.text = tmpLoginCfg.day + "";
                itemUI.btn_receive.mouseEnabled = true;
                itemUI.imgGetReddot.visible = false;
                if (day >= tmpLoginCfg.day)
                {
                    if (loginDay >= tmpLoginCfg.day)
                    {
                        //这两需要进行一下判断，是已领取还是领取
                        let tmpHasGet = ActivityDataMgr.isActBoxFinish(tmpLoginCfg.activityID, tmpLoginCfg.index);
                        if (!tmpHasGet)
                        {
                            //领取
                            itemUI.btn_receive.skin = "res/common/btn01_02.png";
                            itemUI.btn_receive.visible = true;
                            itemUI.txtBtnreceive.text = Global.getLangStr("common_prize");
                            itemUI.img_finish.visible = false;
                            itemUI.imgGetReddot.visible = true;
                            itemUI.btn_receive.onClick(this, () =>
                            {
                                // 请求领取奖励.
                                ActivitySend.drawReward(tmpLoginCfg.activityID, tmpLoginCfg.index, 0);
                            });
                        }
                        else
                        {
                            //已领取
                            itemUI.btn_receive.visible = false;
                            itemUI.img_finish.visible = true;
                        }
                    } else
                    {
                        itemUI.btn_receive.skin = "res/common/btn06_01.png";
                        itemUI.btn_receive.visible = true;
                        itemUI.img_finish.visible = false;
                        let tmpLoginCfg1 = this.login_cfg_arr[index - 1];
                        if (tmpLoginCfg1 && loginDay < tmpLoginCfg1.day)
                        {
                            itemUI.txtBtnreceive.text = Global.getLangStr("SpringFestival_Login_NotLogged");
                            itemUI.btn_receive.mouseEnabled = false;
                            // itemUI.btn_receive.onClick(this, () =>
                            // {
                            //     TipsUtils.showTips("上一条活动天数还未补登"); //未到天数
                            // });
                        }
                        else
                        {
                            itemUI.btn_receive.skin = "res/common/btn01_02.png";
                            itemUI.txtBtnreceive.text = Global.getLangStr("SpringFestival_Login_Supplement");
                            itemUI.btn_receive.onClick(this, () =>
                            {
                                UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(7, tmpLoginCfg));
                            });
                        }
                    }
                }
                else
                {
                    itemUI.btn_receive.skin = "res/common/btn06_01.png";
                    itemUI.btn_receive.mouseEnabled = false;
                    itemUI.btn_receive.visible = true;
                    itemUI.txtBtnreceive.text = Global.getLangStr("SpringFestival_Login_NoTime");
                    itemUI.img_finish.visible = false;
                    // itemUI.btn_receive.onClick(this, () =>
                    // {
                    //     TipsUtils.showTips("未到登录天数"); //未到天数
                    // });
                }

                let addItemList: cfg.AddItemInfo[];
                addItemList = cfg.ActivityLoginCfgData.getAddItemAryByID(tmpLoginCfg.index);
                itemUI.itemBox.onRefresh(addItemList.length, this, (itemUI: NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(addItemList[index]);
                });

            });

        }

    }
}