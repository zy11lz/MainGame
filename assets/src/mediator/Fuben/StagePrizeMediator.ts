module Pro
{

    /**
     * 关卡奖励
     */
    export class StagePrizeMediator extends BaseMediator implements IMediator
    {

        /** UI面板 */
        UIPanel: ProUI.Fuben.StagePrize.MainUI;

        /** UI打开参数 */
        UIOpenData: StagePrizeOpenUIData;

        /** 所有的过关奖励数据 */
        PrizeDataList: Array<any> = [];

        /**保留数据 */
        retainData = []

        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("stageprize")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/stageprize/pic_shilianta01.png", "res/stageprize/pic_shilianta02.png"];
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.Fuben.StagePrize.MainUI, 3, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            this.retainData[0] = this.UIPanel.ItemList.y;
            this.retainData[1] = this.UIPanel.ItemList.height;
            this.retainData[3] = this.UIPanel.frameImgTitle.visible;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.addEventMgr(CmdEvent.Train_TowerPrize, this, this.onRefreshData);
            this.addEventMgr(CmdEvent.Hook_StagePrizeAck, this, this.onRefreshData);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            this.onRefreshData();
            this.UIPanel.ItemList.scrollTo(0);
        }

        /**重置 */
        reset(): void
        {
            this.UIPanel.ItemList.y = this.retainData[0]
            this.UIPanel.ItemList.height = this.retainData[1]
            this.UIPanel.frameImgTitle.visible = this.retainData[3];
        }

        onRefreshData()
        {
            this.PrizeDataList.splice(0, this.PrizeDataList.length);

            let rewardList = [];  //已经领过奖的列表，排在后面
            if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Hook)
            {
                cfg.HookStagePrizeCfgData.getDataList().forEach(elment =>
                {
                    if (!HookDataMgr.isStageRewarded(elment.stageID))
                    {
                        this.PrizeDataList.push(elment);
                    } else rewardList.push(elment);
                });

                let issan = false;
                for (var index = 0; index < this.PrizeDataList.length; index++)
                {
                    let tempInfo = this.PrizeDataList[index] as cfg.HookStagePrizeCfgInfo;
                    let isActive = HookDataMgr.isStegeCanReward(tempInfo.stageID);
                    let isGet = HookDataMgr.isStageRewarded(tempInfo.stageID);
                    issan = tempInfo.threeHome && !isGet ? true : false;
                    if (issan) break;
                }


                this.UIPanel.frameImgTitle.frame = 2;  //显示挂机
                this.PrizeDataList = this.PrizeDataList.concat(rewardList);
                this.UIPanel.ItemList.onRefresh(this.PrizeDataList.length, this, this.onHookItemRender);
                //如果没有御三家列表上移
                if (!issan)
                {
                    this.UIPanel.ItemList.y = 326
                    this.UIPanel.ItemList.height = 715
                    this.UIPanel.frameImgTitle.visible = false;
                    return;
                }
            }
            if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Tower || this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Tower2)
            {
                cfg.TrainTowerPrizeCfgData.getListByType(this.UIOpenData.customObject).forEach(elment =>
                {
                    if (!TrainDataMgr.getTowerPrizedStage(elment.stageID))
                    {
                        this.PrizeDataList.push(elment);
                    } else rewardList.push(elment);
                });
                this.UIPanel.frameImgTitle.frame = 1; //显示试炼塔 
                this.PrizeDataList = this.PrizeDataList.concat(rewardList);
                this.UIPanel.ItemList.onRefresh(this.PrizeDataList.length, this, this.onTowerItemRender);
            }
            this.reset();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }

        //----------------------------试炼塔Item刷新---------------------------------------
        private onTowerItemRender(itemUI: ProUI.Fuben.StagePrize.ListItemUI, index: number)
        {

            let tempInfo = this.PrizeDataList[index] as cfg.TrainTowerPrizeCfgInfo;
            let tempRewardList = cfg.TrainTowerPrizeCfgData.getStagePrizeAryById(tempInfo.stageID);
            itemUI.RewardBox.onRefresh(tempRewardList.length, this, (rewardItemUI: NorItemUI, index: number) =>
            {
                rewardItemUI.setItemInfo(tempRewardList[index]);
            });
            let targetStageIndex = cfg.TrainTowerCfgData.getStageShowByStageID(tempInfo.stageID);
            let curStageId = TrainDataMgr.getTowerStageID(this.UIOpenData.customObject);
            let curStageNum = cfg.TrainTowerCfgData.getStageShowByStageID(curStageId);
            itemUI.NameLb.text = Global.getLangStr("fight_msg1", targetStageIndex, curStageNum, targetStageIndex);

            let isActive = curStageId >= tempInfo.stageID;
            let isGet = TrainDataMgr.getTowerPrizedStage(tempInfo.stageID)
            itemUI.btnGo.visible = !isActive;
            itemUI.btnPrize.visible = isActive && !isGet;
            itemUI.imgGetTag.visible = isActive && isGet;

            itemUI.btnGo.onClick(this, this.onTowerItemGoClick);
            itemUI.btnPrize.onClick(this, this.onTowerPrizeClick);
        }

        /**
         * 试练塔前往
         * @param btn 
         */
        private onTowerItemGoClick(btn: component.UIButton)
        {
            this.closeUI();
        }

        //----------------------------挂机boss Item刷新---------------------------------------
        private onHookItemRender(itemUI: ProUI.Fuben.StagePrize.ListItemUI, index: number)
        {

            let tempInfo = this.PrizeDataList[index] as cfg.HookStagePrizeCfgInfo;
            let tempRewardList = cfg.HookStagePrizeCfgData.getStagePrizeAryById(tempInfo.stageID);
            itemUI.RewardBox.onRefresh(tempRewardList.length, this, (rewardItemUI: NorItemUI, index: number) =>
            {
                rewardItemUI.setItemInfo(tempRewardList[index]);
            });
            itemUI.btnGo.onClick(this, this.onItemGoClick);
            itemUI.btnPrize.onClick(this, () =>
            {
                this.onHookPrizeClick(index);
            });
            itemUI.NameLb.text = Global.getLangStr("hook_msg12", tempInfo.stageID, HookDataMgr.getStageID(), tempInfo.stageID);
            let isActive = HookDataMgr.isStegeCanReward(tempInfo.stageID);
            let isGet = HookDataMgr.isStageRewarded(tempInfo.stageID);
            itemUI.btnGo.visible = !isActive;
            itemUI.btnPrize.visible = isActive && !isGet;
            itemUI.imgGetTag.visible = isActive && isGet;
        }

        private onHookPrizeClick(index: number)
        {
            let tempInfo = this.PrizeDataList[index];
            HookSend.stagePrize(tempInfo.stageID);
        }

        /**
         * 试练塔领奖
         * @param btn 
         */
        private onTowerPrizeClick(btn: component.UIButton): void
        {
            let tempInfo = this.PrizeDataList[parseInt(btn.parent.name)];
            TrainSend.towerPrize(tempInfo.stageID);
        }

        private onItemGoClick(btn: component.UIButton)
        {
            this.closeUI();
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.StageReward_5_4)
            {
                Laya.timer.once(200, this, () =>
                {
                    let tmpItemUI = this.UIPanel.ItemList.getCell(0) as ProUI.Fuben.StagePrize.ListItemUI;
                    GuideMgr.Inst.showFinger(tmpItemUI.btnPrize, true, tmpItemUI.btnPrize);
                });
            }
            else if (step == GuideStep.StageReward_5_5)
            {
                this.closeUI();
            }
        }

        // /**
        //  * 操作本步引导
        //  */
        // public Guide_Active(step: GuideStep) {
        //     if (step == GuideStep.StageReward_5_4) {
        //         let tmpItemUI = this.UIPanel.ItemList.getCell(0) as ProUI.Fuben.StagePrize.ListItemUI;
        //         tmpItemUI.btnPrize.activeEvent();
        //     }
        // }
    }
}