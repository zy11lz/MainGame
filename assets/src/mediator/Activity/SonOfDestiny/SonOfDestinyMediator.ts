module Pro
{
    /**
     * 界面说明： 天命之子活动
    * @author jason.xu
    */
    export class SonOfDestinyMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.SonOfDestiny.SonOfDestinyUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('sonOfDestiny')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.SonOfDestiny.SonOfDestinyUI, 1, BaseAddLayer.TopUI, true);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.onTimer);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnPetDetail.onClick(this, this.onClickPetDetail);

            //	 主线完成				PBU32
            this.addEventMgr(Cmd.S2C_Achieve_MainComplete.cmdName, this, this.refreshUI)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickPetDetail(): void
        {
            let cfgList = cfg.AchieveMainAchieveCfgData.getListByBigType(Pb_God._emAchieveBigType.AchieveBigType_SonOfDestiny);
            let bookIndex = cfgList[cfgList.length - 1].param || 24503;
            let openUIData = new HeroDetailOpenUIData();
            openUIData.isTujian = true;
            openUIData.heroBookCfgInfo = cfg.PetBookCfgData.getInfoBookCfgKey(bookIndex);
            UIManager.Inst.forceOpen(openUIData, BaseBackUIType.HideBackUI);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let cfgList = cfg.AchieveMainAchieveCfgData.getListByBigType(Pb_God._emAchieveBigType.AchieveBigType_SonOfDestiny);
            //前三个为列表里面的，最后一个为总汇
            this.UIPanel.listView.onRefresh(3, this, (itemUI: ProUI.ActivityMain.SonOfDestiny.SonOfDestinyItemUI, index: number) =>
            {
                //达成条件显示
                let achieveCfgInfo = cfgList[index]
                let tmpProNum = AchieveDataMgr.getMainValue(achieveCfgInfo.iD);
                let tmpMaxNum = achieveCfgInfo.value;
                itemUI.txtTitle.text = achieveCfgInfo.name;// + Global.FormatString("({0}/{1})", tmpProNum, tmpMaxNum);;

                //是否已领奖
                let isGet = AchieveDataMgr.isMainFinish(achieveCfgInfo.iD);
                itemUI.imgGet.visible = isGet;
                itemUI.btnGo.visible = !isGet && tmpProNum < tmpMaxNum;
                itemUI.btnGetReward.visible = !isGet && tmpProNum >= tmpMaxNum;

                //前往任务
                itemUI.btnGo.onClick(this, () =>
                {
                    TaskUtils.gotoOpenByAchieveType(achieveCfgInfo.achieveType, achieveCfgInfo.achieveSubType);
                });

                //领取任务
                itemUI.btnGetReward.onClick(this, () =>
                {
                    AchieveSend.mainComplete(achieveCfgInfo.iD);
                })

                //完成奖励
                let tmpRewardAry = cfg.AchieveMainAchieveCfgData.getAddItemAryById(achieveCfgInfo.iD);
                itemUI.norItem.setItemInfo(tmpRewardAry[0]);
            });

            //最后一个最为总汇
            let achieveCfgInfo = cfgList[3];
            let tmpProNum = AchieveDataMgr.getMainValue(achieveCfgInfo.iD);
            let tmpMaxNum = achieveCfgInfo.value;
            this.UIPanel.txtProgress.text = Global.getLangStr("SonOfDestiny_msg1", tmpProNum, tmpMaxNum);

            //是否已领奖
            let isGet = AchieveDataMgr.isMainFinish(achieveCfgInfo.iD);
            this.UIPanel.imgGet.visible = isGet;
            this.UIPanel.btnReward.visible = !isGet;
            this.UIPanel.txtRewardBtn.text = tmpProNum < tmpMaxNum ? Global.getLangStr("common_nosuccess") : Global.getLangStr("common_prize");

            this.UIPanel.btnReward.onClick(this, () =>
            {
                if (tmpProNum < tmpMaxNum)
                {
                    TipsUtils.showTipsByLanId("tips_msg48");
                    return;
                }
                AchieveSend.mainComplete(achieveCfgInfo.iD);
            });
        }

        private onTimer(): void
        {
            let overTime = AchieveDataMgr.getSonOfDestinyOverTime();
            let leftTime = overTime - TimeController.currTimer / 1000;
            this.UIPanel.htmlTimer.showText = Global.getLangStr("SonOfDestiny_msg2", Global.GetRemindTime(leftTime, 9));
        }

    }
}