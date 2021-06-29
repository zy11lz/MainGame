module Pro
{
    /**
    * 公会活跃界面
    * @author jason.xu
    */
    export class FactionLivenessMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Faction.FactionLivenessUI;

        /** 进度条原始长度 */
        private _progressInitWidth: number = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("faction")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionLivenessUI, 1, BaseAddLayer.TopUI,true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._progressInitWidth = this.UIPanel.imgExpProgress.width;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.onUpdateLivenessValue();
            this.refreshTaskList();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnRewardPreview.onClick(this, this.onClickRewardPreview);
            this.UIPanel.btnGetReward.onClick(this, this.onClickGetReward);

            this.addEventMgr(CmdEvent.Faction_SynLiveness, this, this.onUpdateLivenessValue);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击奖励预览 */
        private onClickRewardPreview(): void
        {
            var panel = new FactionLivenessRewardPanel();
            panel.show();
        }

        /** 点击领奖 */
        private onClickGetReward(): void
        {
            FactionSend.upgradeLiveness();
        }

        /** 活跃值变化 */
        private onUpdateLivenessValue(): void
        {
            let strContent = Global.getLangStr("faction_msg3",
                FactionDataMgr.dailyLiveness, FactionDataMgr.weekLiveness);
            // strContent = strContent.replace(/[ ]/g, ""); //空格替换成占位符
            this.UIPanel.htmlLivenessValue.showText = strContent;

            this.UIPanel.txtLv.text = "Lv." + FactionDataMgr.livenessLevel;

            //下一级配置
            let nextCfgData = cfg.FactionLivenessCfgData.getInfo(FactionDataMgr.livenessLevel + 1);
            let cfgData = cfg.FactionLivenessCfgData.getInfo(FactionDataMgr.livenessLevel);

            //属性显示
            this.resetAttributeView(cfgData, nextCfgData);
            //经验值显示
            let expMax = cfgData.exp;
            let progress: number = expMax == 0 ? 1 : FactionDataMgr.livenessExp / expMax;
            progress=Math.min(progress,1);
            Global.setProgressBar(this.UIPanel.imgExpProgress, progress, this._progressInitWidth);
            this.UIPanel.txtExp.text = FactionDataMgr.livenessExp + "/" + expMax;

            //领奖状态
            if (!nextCfgData)
            {//已经满级
                this.UIPanel.noritemListView.onRefresh(0, this, null);
                this.UIPanel.btnGetReward.visible = false;
                this.UIPanel.txtLevelTips.text = Global.getLangStr("common_lv_full");
            } else
            {
                if (expMax <= FactionDataMgr.livenessExp)
                { //可以升级了
                    this.UIPanel.btnGetReward.visible = true;
                    this.UIPanel.txtLevelTips.text = "";
                } else
                {
                    this.UIPanel.btnGetReward.visible = false;
                    this.UIPanel.txtLevelTips.text = Global.getLangStr("faction_msg5", FactionDataMgr.livenessLevel + 1);
                }
                //奖励道具
                let rewards = cfg.FactionLivenessCfgData.getAddItemAryByInfo(nextCfgData);
                this.UIPanel.noritemListView.onRefresh(rewards.length, this, (itemRewardUI: NorItemUI, index: number) =>
                {
                    itemRewardUI.setItemInfo(rewards[index]);
                });
            }
        }

        /** 刷新属性显示 */
        private resetAttributeView(cfgData: cfg.FactionLivenessCfgInfo, nextCfgData: cfg.FactionLivenessCfgInfo): void
        {
            let arr = cfg.FactionLivenessCfgData.getAddAttrAryByInfo(cfgData);
            this.UIPanel.txtAttrEmpty.visible = arr.length <= 0;
            this.resetSingleAttribute(this.UIPanel.viewCurAttr1, arr[0]);
            this.resetSingleAttribute(this.UIPanel.viewCurAttr2, arr[1]);

            if (!nextCfgData) nextCfgData = cfgData;
            arr = cfg.FactionLivenessCfgData.getAddAttrAryByInfo(nextCfgData);
            this.resetSingleAttribute(this.UIPanel.viewNextAttr1, arr[0]);
            this.resetSingleAttribute(this.UIPanel.viewNextAttr2, arr[1]);
        }

        /** 单个属性显示 */
        private resetSingleAttribute(box: Laya.Box, attrInfo: cfg.AddAtterInfo): void
        {
            if (!attrInfo)
            {
                box.visible = false;
                return;
            }
            box.visible = true;
            let imgIcon = box.getChildByName("imgIcon") as component.UIFrameImage;
            let txtValue = box.getChildByName("txtAttrValue") as component.UILabel;
            imgIcon.frame = attrInfo.type;
            txtValue.text = Global.getFullAttrValueString(attrInfo, ":  ");
        }

        /** 刷新任务列表 */
        private refreshTaskList(): void
        {
            let list = cfg.AchieveFactionLivenessCfgData.getAllList();
            this.UIPanel.listView.onRefresh(list.length, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Faction.ChildView.FactionLivenessItemViewUI, index: number): void
        {
            let cfgData = cfg.AchieveFactionLivenessCfgData.getAllList()[index];
            let data = AchieveDataMgr.getFactionData(cfgData.iD);
            tempUI.txtName.text = cfgData.name;
            tempUI.txtLiveness.text = cfgData.addLiveness + "";
            let count = data ? data.value : 0;
            tempUI.txtCount.text = "(" + count + "/" + cfgData.value + ")";
            let isComponent = count >= cfgData.value;
            tempUI.imgHasBeen.visible = isComponent;
            tempUI.btnGoto.visible = !isComponent;
            tempUI.imgType.frame = cfgData.achiveResetType;  //1日常 2周常

            //点击前往
            tempUI.btnGoto.onClick(this, () =>
            {
                TaskUtils.gotoOpenByAchieveType(cfgData.achieveType, cfgData.achieveSubType);
            });
        }

    }
}