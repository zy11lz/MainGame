module Pro
{
    /**
     * 界面说明： 打金币（钻石购买金币）
    * @author jason.xu
    */
    export class ClickGoldMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.ClickGold.ClickGoldUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("clickgold")];
        }

        // /** 需要自动释放的png|jgp资源列表 */
        // public autoUnLoadOtherRes(): Array<string> {
        //     return ["res/clickgold/bg.png"];
        // }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.ClickGold.ClickGoldUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            Laya.timer.clear(this, this.onTimer);
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
            this.resetTimer();
            this.refreshList();
        }

        private resetTimer(): void
        {
            Laya.timer.loop(500, this, this.onTimer);
            this.onTimer();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            //	 点石成金获取奖励返回
            this.addEventMgr(CmdEvent.Weal_ClickGold, this, this.onClickGoldMsg)
            //	 点石成金重置次数通知
            this.addEventMgr(CmdEvent.Weal_ClickGoldReset, this, this.refreshList)

            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击帮助说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "clickGold_help");
        }

		/*****
		 *	 点石成金获取奖励返回			PBG2C_Click_Gold
		 * @param PBG2C_Click_Gold
		 * 		type			uint32	 类型
		 * 		times			uint32	 点击次数
		 */
        protected onClickGoldMsg(value: Pb_God.PBG2CClickGold): void
        {
            //只刷新操作的一个即可
            let refreshIndex = value.type - 1;
            this.onRefreshBoxItem(this.UIPanel.itemsBox.getCellWithIndex(refreshIndex), refreshIndex);
        }


        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 刷新列表 */
        private refreshList(): void
        {
            this.UIPanel.itemsBox.onRefresh(3, this, this.onRefreshBoxItem);
        }

        /** 刷新倒计时 */
        private onTimer(): void
        {
            let time: number = WealDataMgr.clickGoldNextResetTime - TimeController.currTimer / 1000;
            if (time < 0) time = 0;
            this.UIPanel.txtTimer.text = Global.GetRemindTime(time, 4);
        }

        private onRefreshBoxItem(tempUI: ProUI.ActivityMain.ClickGold.ItemViewUI, index: number): void
        {
            let type = index + 1;
            let leftCount = WealDataMgr.getClickGoldLeftCountByType(type);
            let needItem = cfg.WealClickgoldCfgData.getNeedItemInfoByType(type);
            let isFree = needItem == null;
            let goldParams = cfg.WealClickgoldCfgData.getAddGoldBaseByType(type).split("_");
            //=param1+param2* floor(（主线关卡-1）/3 )
            let hookStage = HookDataMgr.getStageID();
            let goldCount = parseInt(goldParams[0]) + parseInt(goldParams[1]) * Math.floor(hookStage / 3);
            // //VIP加成            
            // let vipAddPercent = PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_ClickGold);
            // goldCount += Math.floor(goldCount * vipAddPercent / 100);
            tempUI.txtGoldValue.text = goldCount + "";
            tempUI.txtLeftCount.text = Global.getLangStr("common_leftcount", leftCount);
            tempUI.hboxGoldValue.refresh();
            tempUI.imgGet.visible = leftCount <= 0;
            tempUI.btnBuy.visible = leftCount > 0 && !isFree;
            tempUI.btnFree.visible = leftCount > 0 && isFree;
            if (isFree)
            {
                tempUI.btnFree.onClick(this, () =>
                {
                    WealSend.clickGold(type);
                })
            } else
            {
                tempUI.txtPrice.text = needItem.itemcount + " " + Global.getLangStr("common_get");
                tempUI.hboxPrice.refresh();
                tempUI.btnBuy.onClick(this, () =>
                {
                    //弹窗二级提示
                    let des = Global.getLangStr("clickgold_msg1",
                        needItem.itemcount, cfg.ItemCfgData.getNameById(needItem.itemid), goldCount);
                    AlertShow.showConfirmAlert(des, this, () =>
                    {
                        if (Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                            WealSend.clickGold(type);
                    }, "common_confirm", "common_cancel", 0, 0, PlayerDataMgr.uid + "_ClickGold");
                })
            }
        }



        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Func_ClickGold_3)
            {
                Laya.timer.once(100, this, () =>
                {
                    let tmpItemUI = this.UIPanel.itemsBox.getCellWithIndex(0) as ProUI.ActivityMain.ClickGold.ItemViewUI;
                    GuideMgr.Inst.showFinger(tmpItemUI.btnFree, false, tmpItemUI.btnFree);
                });
            }
        }

    }
}