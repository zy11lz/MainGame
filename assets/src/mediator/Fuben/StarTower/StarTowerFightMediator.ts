module Pro
{

    /**
     * 
     * 试炼塔当前层信息
     * 
     */
    export class StarTowerFightMediator extends BaseMediator implements IMediator
    {

        /** UI面板 */
        UIPanel: ProUI.StarTower.Fight.MainUI;

        /** 当前打开的试炼塔类型 */
        private _type = 0;
        /** 对应的战斗类型 */
        private _battleType = 0;

        /** 当前选择层ID */
        SelectStageID: number;

        /** 角色动画控制器 */
        RoleInfo: BaseRole = null;

        /** 记录购买次数前的行为， 在购买次数成功后，执行挑战或者扫荡 0-无 1-挑战 2-扫荡 */
        private _buyCountCall = 0;

        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return [];
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.StarTower.Fight.MainUI, 3, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this.closePanel();
            Global.removeBaseRole(this.RoleInfo);
            this.RoleInfo = null;
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            this.UIPanel.chkBoxJumpEmbattle.setText(Global.getLangStr("bat_msg23"));
            this.UIPanel.chkBoxJumpEmbattle.setClickSelect()
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.UIPanel.FightBtn.onClick(this, this.onFightClick);
            this.UIPanel.SweepBtn.onClick(this, this.onSweepClick);
            this.UIPanel.RedioBtn.onClick(this, this.onRedioClick);
            this.addEventMgr(CmdEvent.Train_TowerFightCount, this, this.refreshUI);
            this.addEventMgr(CmdEvent.Train_TowerBuyCount, this, this.onBuyCount);
            this.addEventMgr(Cmd.S2C_Video_QueryTowerAck, this, this.onVideoDataCallBack);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {

            //选择层ID
            this.SelectStageID = this.UIOpenData.customObject;
            let stageCfgInfo = cfg.TrainTowerCfgData.getInfo(this.SelectStageID);
            this._type = stageCfgInfo.type;
            this._battleType = this._type == 1 ? Pb_God._emBattleType.BattleType_Tower : Pb_God._emBattleType.BattleType_Tower2;
            this.UIPanel.TitleLb.text = Global.getLangStr("fight_msg2", stageCfgInfo.stageShow);

            //推荐战力
            let tmpCommandPower = cfg.TrainTowerCfgData.getRequreFightPowerByStageID(this.SelectStageID);
            this.UIPanel.CommandPowerLb.text = tmpCommandPower.toString();
            this.UIPanel.DesLb.text = cfg.TrainTowerCfgData.getDescByStageID(this.SelectStageID);

            //添加角色动作
            let tmpmonsterID = cfg.TrainTowerCfgData.getMonsterByStageID(this.SelectStageID);
            let monsterInfo = cfg.TrainMonsterNewCfgData.getBossMonsterInfoById(tmpmonsterID);
            let tmpPetResID = monsterInfo.skinId; 
            if (this.RoleInfo == null)
            {
                this.RoleInfo = Global.createBaseRoleForPreview(this.UIPanel.PreviewBox);
            }
            this.RoleInfo.resetRes(tmpPetResID, RoleResType.Show, true);
            var showScale = cfg.PetSkinCfgData.getShowScaleById(tmpPetResID);
            this.RoleInfo.scale(showScale, showScale);

            //刷新挑战奖励
            let tempFirstPrizeList = this.SelectStageID > TrainDataMgr.getTowerStageID(this._type) ? cfg.TrainTowerCfgData.getFirstAddPrizeAryById(this.SelectStageID) : [];
            let tempNorPrizeList = cfg.TrainTowerCfgData.getAddPrizeAryById(this.SelectStageID);
            this.UIPanel.RewardBox.onRefresh(tempFirstPrizeList.length + tempNorPrizeList.length, this, (itemUI: ProUI.StarTower.Fight.RewardItemUI, index: number) =>
            {
                if (index < tempFirstPrizeList.length)
                {
                    let tempInfo = tempFirstPrizeList[index];
                    itemUI.ItemUI.setItemInfo(tempInfo);
                    itemUI.FirstTipsImg.visible = true;
                }
                else
                {
                    let tempInfo = tempNorPrizeList[index - tempFirstPrizeList.length];
                    itemUI.ItemUI.setItemInfo(tempInfo);
                    itemUI.FirstTipsImg.visible = false;
                }
            });

            this.refreshUI();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

            let tmpLastFightCount = TrainDataMgr.getTowerDayLastFightCount(this._type);
            // let tmpLastBuyCount = TrainDataMgr.getTowerDayLastBuyCount();

            this.UIPanel.SweepBtn.visible = TrainDataMgr.getTowerStageID(this._type) >= this.SelectStageID;

            this.UIPanel.FightBtn.visible = !this.UIPanel.SweepBtn.visible;
            if (this.UIPanel.SweepBtn.visible)
            {
                let tmpBuySweep = TrainDataMgr.getTowerDayLastBuyCount(this._type) > 0 && tmpLastFightCount == 0;
                let tempBuySpace = TrainDataMgr.getTowerDayBuyCount(this._type);
                let tempNeedCostID = CfgID.ItemID.Diamond;
                let tempNeedCostNum = cfg.TrainTowerCountCfgData.getInfo(tempBuySpace + 1).needDiamond;

                Global.setResIconWithItemID(this.UIPanel.SweepIconImg, CfgID.ResType.Item, tempNeedCostID);
                this.UIPanel.SweepNumLb.text = tempNeedCostNum.toString();

                this.UIPanel.SweepIconImg.visible = tmpBuySweep;
                this.UIPanel.SweepNumLb.visible = tmpBuySweep;
                Global.autoLayoutSpriteNode(this.UIPanel.SweepInfoBox, "hor", 5, "center");
            }

            VideoSend.queryTower(this.SelectStageID);
        }

        /** 开战 */
        private onFightClick()
        {
            this._buyCountCall = 0;
            // let tmpLastFightCount = TrainDataMgr.getTowerDayLastFightCount(this._type);
            // let tmpBuySweep = TrainDataMgr.getTowerDayLastBuyCount(this._type) > 0;

            // if (TrainDataMgr.getTowerStageID(this._type) + 1 == this.SelectStageID)
            // {
            if (this.UIPanel.chkBoxJumpEmbattle.isSelected)
                BattleMgr.Inst.createNormalBat(this._battleType, this.SelectStageID, 0, Pb_God._emZhenfaType.ZhenfaType_Zhuxian); //Pb_God._emZhenfaType.ZhenfaType_Tower
            else
                UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, this._battleType, this.SelectStageID));
            // }
            // else if (tmpBuySweep)
            // {
            //     this._buyCountCall = 1;
            //     UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(3, this._type));
            // }
            // else
            // {
            //     TipsUtils.showTipsByLanId("tips_msg27");
            // }
        }

        /** 扫荡 */
        private onSweepClick()
        {
            this._buyCountCall = 0;

            let tmpLastFightCount = TrainDataMgr.getTowerDayLastFightCount(this._type);
            let tmpBuySweep = TrainDataMgr.getTowerDayLastBuyCount(this._type) > 0 && tmpLastFightCount == 0;
            if (tmpLastFightCount > 0)
            {
                TrainSend.towerSweep(this.SelectStageID);
            }
            else if (tmpBuySweep)
            {
                this._buyCountCall = 2;
                UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(3, this._type));
            }
            else
            {
                TipsUtils.showTipsByLanId("tips_msg28");
            }
        }

        private onBuyCount()
        {
            if (this._buyCountCall == 1) //挑战            
                if (this.UIPanel.chkBoxJumpEmbattle.isSelected)
                    BattleMgr.Inst.createNormalBat(this._battleType, this.SelectStageID, 0, Pb_God._emZhenfaType.ZhenfaType_Zhuxian); //Pb_God._emZhenfaType.ZhenfaType_Tower
                else
                    UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, this._battleType, this.SelectStageID));
            if (this._buyCountCall == 2) //扫荡
                TrainSend.towerSweep(this.SelectStageID);
            this._buyCountCall = 0;
        }

        /** 录像 */
        private onRedioClick()
        {
            UIManager.Inst.forceOpen(new StageRedioOpenUIData(this._battleType, this.SelectStageID));
        }

        //-----------------------------------数据展示------------------------------------
        /** 数据返回 */
        onVideoDataCallBack(value: Pb_God.PBWorldStageVideoInfo)
        {
            this.UIPanel.FastestNameLb.text = "还未通关";
            this.UIPanel.LowestPowerNameLb.text = "还未通关";

            let tmpInfo: Pb_God.PBPlayerVideoDisplay = null;
            {
                tmpInfo = (value.fast && value.fast["display"] != null) ? value.fast : null;
                //this.UIPanel.FastestNameLb.text = Global.getLangStr("fight_msg17");//最快";
                if (tmpInfo != null)
                {
                    this.UIPanel.FastestNameLb.text = tmpInfo.display.playername;
                    //itemUI.PassTimeLb.text = Global.getLangStr("fight_msg20") + Global.GetRemindTime(tmpInfo.param, 5);
                }
            }
            {
                tmpInfo = (value.fightpower && value.fightpower["display"] != null) ? value.fightpower : null;
                //itemUI.TitleLb.text = Global.getLangStr("fight_msg18");//最低";
                if (tmpInfo != null)
                {
                    this.UIPanel.LowestPowerNameLb.text = tmpInfo.display.playername;
                    //itemUI.PassTimeLb.text = Global.getLangStr("fight_msg21") + tmpInfo.param;
                }
            }
            /*
            else if (index == 2) {
                tmpInfo = (value.lately && value.lately["display"]) != null ? value.lately : null;
                itemUI.TitleLb.text = Global.getLangStr("fight_msg19");//最近";
                if (tmpInfo != null) {
                    itemUI.PassTimeLb.text = Global.getLangStr("fight_msg20") + Global.GetRemindTime(tmpInfo.param, 5);
                }
            }
            itemUI.PlayerIconInfo.visible = tmpInfo != null;
            if (tmpInfo != null) {
                itemUI.PlayerIconInfo.setPlayerDisplayInfo(tmpInfo.display, false, false);
            }
            itemUI.NameLb.text = tmpInfo == null ? Global.getLangStr("fight_msg22") : tmpInfo.display.playername;
            itemUI.SureBtn.visible = tmpInfo != null;
            itemUI.SureBtn.onClick(this, () => {
                VideoSend.play(this.UIOpenData.battleType, tmpInfo.battlesn);
            });
            */

        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Func_StarTower_6)
            {
                GuideMgr.Inst.showFinger(this.UIPanel.FightBtn, true, this.UIPanel.FightBtn);
            }
        }

        // /**
        //  * 操作本步引导
        //  */
        // public Guide_Active(step: GuideStep) {
        //     if (step == GuideStep.Func_StarTower_6) {
        //         this.UIPanel.FightBtn.activeEvent();
        //         GuideMgr.Inst.nextActive();
        //     }
        // }
    }
}