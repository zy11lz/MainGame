module Pro
{
    /**
    *
    * 模块：帮会捐献界面
    *
    * @author jason.xu
    *
    */
    export class FactionDonateMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Faction.FactionDonateUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("faction")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/faction/gonghui_juanxian_01.png",
                "res/faction/gonghui_juanxian_02.png",
                "res/faction/gonghui_juanxian_03.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionDonateUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
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
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.onDonateChange();
            this.onDonatePrizeUpdate();
            let level = FactionDataMgr.getFactionLevel();//  FactionDataMgr.factionDisplay.base.level;
            this.UIPanel.txtLv.text = Global.getLangStr("faction_msg1", level);
            let nextLvMemberCount = cfg.FactionUpgradeCfgData.getMemberCountByLevel(level + 1);
            this.UIPanel.txtNextTips.text = nextLvMemberCount == 0 ? "" : Global.getLangStr("faction_msg2", nextLvMemberCount);
        }


        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Faction_Donate, this, this.onDonateChange);
            this.addEventMgr(CmdEvent.Faction_DonatePrize, this, this.onDonatePrizeUpdate);
            this.addEventMgr(CmdEvent.Faction_SynDonateLiveness, this, this.onDonatePrizeUpdate);

            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

        /** 点击捐献 */
        private sendDonate(type: number): void
        {
            let needItem = cfg.FactionDonateCfgData.getNeedItemByDonateType(type);
            let needItemArr = needItem.split("_");
            //判断道具是否足够
            if (!Global.isFullRes(parseInt(needItemArr[0]), parseInt(needItemArr[1]), true))
            { return; }
            FactionSend.donate(type);
        }

        /** 点击帮助说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            let content = Global.getLangStr("faction_help_donate");
            CommonHelpView.show(btn, content);
        }

        /** 捐献状态变化 */
        private onDonateChange(): void
        {
            this.UIPanel.listView.onRefresh(3, this, this.onRefreshDonateItem);
        }
        private onRefreshDonateItem(tempUI: ProUI.Faction.ChildView.FactionDonateItemUI, index: number): void
        {
            let donateType = FactionDataMgr.donateType;
            let isDonate = donateType > 0;
            let type = index + 1;

            tempUI.txtDes.text = Global.getLangStr("faction_donateItem_" + type);
            tempUI.imgIcon.frame = type;
            tempUI.btnDonate.visible = !isDonate;
            tempUI.btnNoCan.visible = isDonate && type != donateType;
            tempUI.imgHave.visible = isDonate && type == donateType;

            let cfgData = cfg.FactionDonateCfgData.getInfo(type);
            let needArr = cfgData.needItem.split("_");
            Global.setResSmallIconWithItemID(tempUI.imgNeed, parseInt(needArr[0]));
            tempUI.txtNeed.text = needArr[1];
            tempUI.txtAddContri.text = cfgData.addContri + "";
            tempUI.txtAddExp.text = cfgData.addExp + "";

            tempUI.btnDonate.onClick(this, () => { this.sendDonate(type); });
        }

        /** 捐献奖励属性变化 */
        private onDonatePrizeUpdate(): void
        {
            //当天捐献活跃度
            let donateLiveness = FactionDataMgr.donateliveness;
            this.UIPanel.txtTodayCount.text = donateLiveness + "";
            //刷新经验进度条
            //分段计算进度条值
            let childVlueList: number[] = [];
            for (var cfgInfo of cfg.FactionDonatePrizeCfgData.getAllList())
            {
                childVlueList.push(cfgInfo.needDonate);
            }
            let progress: number = Global.getTotalProgressByChildValueList(childVlueList, donateLiveness);
            //如果image长度为0，则出现显示错误，会显示自己本身长度，所以做个处理，为零直接不显示
            this.UIPanel.imgProgress.visible = progress != 0;
            Global.setProgressBarMask(this.UIPanel.imgProgress, progress);

            this.UIPanel.listProgressBox.onRefresh(childVlueList.length, this, this.onRefreshProgressBoxItem);
        }

        private onRefreshProgressBoxItem(tempUI: Pro.ProgressChestItemUI, index: number): void
        {
            let cfgData = cfg.FactionDonatePrizeCfgData.getAllList()[index];

            let needValue = cfgData.needDonate;
            let isActive = needValue <= FactionDataMgr.donateliveness;
            let isGetReward = !!FactionDataMgr.donatePrize.get(cfgData.iD);

            tempUI.setBoxTypeIndex(index);  //每1个箱子换一个资源
            tempUI.setText(needValue, "#5d565d");
            tempUI.setOpenState(isActive, isGetReward);
            tempUI.onClick(this, () =>
            {
                if (isActive && !isGetReward)
                {
                    FactionSend.donatePrize(cfgData.iD);
                } else
                {
                    //弹窗提示
                    let rewardItems = cfg.FactionDonatePrizeCfgData.getAddItemAryByInfo(cfgData);
                    (new FactionDonateRewardPanel).show(rewardItems);
                }
            });
        }
    }
}