module Pro
{
    /**
    * 界面说明： 福利大厅
    * @author jason.xu
    */
    export class WealHallMediator extends ActivityMediatorBase
    {

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("activitymain"), UrlMgr.getAtlas("wealhall"), UrlMgr.getAtlas("h5weal")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return ["res/wealhall/pic_ggl_chengzhangjijin.jpg",
                "res/wealhall/pic_ggl_meiriqiandao.jpg",
                "res/timeLimitAct/pic_ggl_dianshichengjin.jpg",
                "res/timeLimitAct/pic_ggl_maoxianjijie.jpg",
                "res/timeLimitAct/pic_ggl_shenjixianlianglibao.jpg",
                "res/timeLimitAct/pic_ggl_suzhandaren.jpg",
                "res/timeLimitAct/pic_ggl_yuanhangduobao.jpg",
                "res/timeLimitAct/pic_ggl_yuanzhengjingying.jpg",
                "res/timeLimitAct/pic_ggl_zhihuanshangcheng.jpg",
                "res/timeLimitAct/pic_shenhaizhufu.jpg",
                "res/h5weal/bg.jpg",
                "res/timeLimitAct/kehuojiangliwenzi_di.png"];
        }

        public closeUI(): void
        {
            super.closeUI();
        }

        /** 获取分页列表，可在此方法中筛选正在开启中的活动 每个列表元素为一个数组结构：
         * [分页名(对应中文包名activity_title_XXX), 按钮图片名（空值时表示与分页名相同），分页视图类名，红点model，传给分页的参数] 
         * */
        protected getPageDataList(): any[][]
        {
            //[pagename,classname, reddot][]
            let ret = [];
            //签到
            ret[ret.length] = ["signIn", "btn_meiriqiandao", WealHallSignPageView, WealDataMgr.reddotModel.getChildModel("signin")];

            //限时活动类
            let act_data: Pb_God.PBPlayerActivityData;
            //升级有礼
            act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Leveup);
            if (act_data) ret[ret.length] = ["upgradeGift", "btn_shenjixianlianglibao", UpgradeGiftView, ActivityDataMgr.reddotModel.getChildModel("upgradeGift").getChildModel(act_data.id), act_data];

            //限时兑换
            act_data = ActivityDataMgr.getActivityDataByTypeAndGroupId(3, Pb_God._emActivityType.Activity_Exchange);
            if (act_data) ret[ret.length] = ["limitExchange", "huodong_xianshishangcheng_01", TimeLimitExchangeView, ActivityDataMgr.reddotModel.getChildModel("limitExchange"), act_data];

            //计次活动
            // 点石成金
            act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_ClickGold);
            if (act_data) ret[ret.length] = ["dianshichengjin", "btn_dianshichengjin", CountGiftsView, ActivityDataMgr.reddotModel.getChildModel("countTimes").getChildModel(act_data.id), act_data];
            // 悬赏夺宝
            act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Voyage);
            if (act_data) ret[ret.length] = ["yuanhangduobao", "btn_yuanhangduobao", CountGiftsView, ActivityDataMgr.reddotModel.getChildModel("countTimes").getChildModel(act_data.id), act_data];
            // 远征精英 远征
            act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Expedition);
            if (act_data) ret[ret.length] = ["yuanzhengjingying", "btn_yuanzhengjingying", CountGiftsView, ActivityDataMgr.reddotModel.getChildModel("countTimes").getChildModel(act_data.id), act_data];
            // 速战达人 快速作战	
            act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Raid);
            if (act_data) ret[ret.length] = ["btn_suzhandaren", "btn_suzhandaren", CountGiftsView, ActivityDataMgr.reddotModel.getChildModel("countTimes").getChildModel(act_data.id), act_data];
            // 冒险集结 神界冒险
            act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Risk);
            if (act_data) ret[ret.length] = ["btn_maoxianjijie", "btn_maoxianjijie", CountGiftsView, ActivityDataMgr.reddotModel.getChildModel("countTimes").getChildModel(act_data.id), act_data];
            //成长基金
            if (this.checkGradeFundVisible())
                ret[ret.length] = ["gradeFund", "btn_chengzhangjijin", WealHallGradeFundView, ActivityDataMgr.reddotModel.getChildModel("gradeFund")];
            //资源找回
            ret[ret.length] = ["resourcesBack", "btn_ziyuanzhaohui", ResourcesBackView, WealDataMgr.reddotModel.getChildModel("resourcesBack")];
            WealSend.getInfo();

            /////// h5福利相关
            if (window["sqgamesdk"])
            {
                //微信分享
                if (PlatformData.locationData.shared_switch == "wx")
                {
                    ret[ret.length] = ["H5WealShareWx", "btn_weixiangyouli", WealH5PageViewShare, null, Pb_God._emCommonPrizeType.CommonPrize_WeShare];
                }
                //QQ分享
                if (PlatformData.locationData.shared_switch == "qq")
                {
                    ret[ret.length] = ["H5WealShareQQ", "btn_qxiangyouli", WealH5PageViewShare, null, Pb_God._emCommonPrizeType.CommonPrize_QQShare];
                }
                //关注
                if (PlatformData.locationData.subscribe_switch == "qq" || PlatformData.locationData.subscribe_switch == "wx")
                {
                    //领奖完以后，界面就不需要显示了
                    if (CommonDataMgr.getCommonPrizeState(Pb_God._emCommonPrizeType.CommonPrize_Subscribe) != 2)
                        ret[ret.length] = ["H5WealSubscribe", "btn_guanzhuyouli", WealH5PageViewSubscribe, null, Pb_God._emCommonPrizeType.CommonPrize_Subscribe];
                }
                //实名认证
                if (PlatformData.locationData.id_verify_switch == 2)
                {
                    //领奖完以后，界面就不需要显示了
                    if (CommonDataMgr.getCommonPrizeState(Pb_God._emCommonPrizeType.CommonPrize_Verify) != 2)
                        ret[ret.length] = ["H5WealVerify", "btn_shiminglibao", WealH5PageViewVerify, null, Pb_God._emCommonPrizeType.CommonPrize_Verify];
                }
                //下载微端
                let wd_download_switch = PlatformData.locationData.wd_download_switch;
                if (wd_download_switch)
                {
                    //如果在微端内，则领取完奖励后不需要显示页签，如果不在微端内，则页签常驻
                    let showWd = false;
                    if (wd_download_switch == 1)
                    {
                        //1是要展示微端下载，常驻显示
                        showWd = true;
                    } else if (wd_download_switch == 2)
                    { //2表示已经在微端内，只要奖励领完就不需要显示了
                        if (CommonDataMgr.getCommonPrizeState(Pb_God._emCommonPrizeType.CommonPrize_WD) != 2)
                            showWd = true;
                    }
                    if (showWd) ret[ret.length] = ["H5WealDownload", "btn_weiduanlibao", WealH5PageViewDownload, null, Pb_God._emCommonPrizeType.CommonPrize_WD];
                }
                //保存桌面
                if (PlatformData.locationData.desktop_switch == 2)
                {
                    ret[ret.length] = ["H5WealDesktop", "btn_zhuomianlibao", WealH5PageViewDesktop, null, Pb_God._emCommonPrizeType.CommonPrize_Desktop];
                }
            }

            ///////////////


            return ret;
        }

        /** 成长基金按钮开启 */
        private checkGradeFundVisible(): boolean
        {
            //没有对应的支付
            if (PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_GrowFund).length <= 0) return false;
            let list = cfg.ActivityGrowFundCfgData.getAll();
            // 当前活动数据 */
            let activityData = ActivityDataMgr.getActivityDataById(list[0].activityID);
            if (!activityData) return false;
            //是否全部领完
            for (var cfgInfo of list)
            {
                if (activityData.acquired.indexOf(cfgInfo.index) < 0) return true;
            }
            return false;
        }


        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Func_SignIn_4)
            {
                Laya.timer.once(200, this, () =>
                {
                    //已领奖天数
                    let signinDays = WealDataMgr.signinDays;
                    //今天已领过的次数（每天可以领两次，第一次免费，第二次需要任意充值）
                    let signState = WealDataMgr.signinState;
                    let todayIndex = signState <= Pb_God._emWealSigninState.Weal_Signin_Available ? signinDays : signinDays - 1;
                    let tmpPanel = this.UIPanel.pageViewContainer.getTableView("signIn") as WealHallSignPageView;
                    let tmpCell = tmpPanel.listView.getCell(todayIndex) as ProUI.ActivityMain.ChildItemView.SignInItemUI;
                    GuideMgr.Inst.showFinger(tmpCell, true, tmpCell.btn);
                });
            }
        }

        /**
         * 操作本步引导
         */
        public Guide_Active(step: GuideStep)
        {
            // if (step == GuideStep.Func_SignIn_4) {
            //     //已领奖天数
            //     let signinDays = WealDataMgr.signinDays;
            //     //今天已领过的次数（每天可以领两次，第一次免费，第二次需要任意充值）
            //     let signState = WealDataMgr.signinState;
            //     let todayIndex = signState <= Pb_God._emWealSigninState.Weal_Signin_Available ? signinDays : signinDays - 1;
            //     let tmpPanel = this.UIPanel.pageViewContainer.getTableView("signIn") as WealHallSignPageView;
            //     let tmpCell = tmpPanel.listView.getCell(todayIndex) as ProUI.ActivityMain.ChildItemView.SignInItemUI;

            //     if (tmpCell != null) {
            //         tmpCell.btn.activeEvent();
            //     }
            //     GuideMgr.Inst.nextActive();
            // }

        }

    }
}