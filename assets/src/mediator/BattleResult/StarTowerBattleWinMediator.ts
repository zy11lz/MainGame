module Pro
{
    /**
     * 界面说明： 试炼塔战斗胜利
    * @author jason.xu
    */
    export class StarTowerBattleWinMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.BattleResult.StarTowerWinUI;

        private CountDown = 5;

        /** 打开一个界面时，如果又有新的进来，先存起来，待当前界面关闭后再处理 */
        private _waitSaveUIData: BaseOpenUIData;

        private _towerType: number = -1;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.BattleResult.StarTowerWinUI, 1, BaseAddLayer.TopUI, true);
        }


        /** 打开中的界面，重新设置uiopendata, 为保留以前的方案，基类不处理赋值， 有需要做更新处理的，子类可继续此方法。 */
        public resetUIOpenData(uiOpenData: BaseOpenUIData): void
        {
            this._waitSaveUIData = uiOpenData;
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.showEffRewardFly()
            Laya.timer.clear(this, this.onCountDownTimer);
            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            EventMgr.trigger(EventNotify.Battle_Result_Close, resultData.base.battletype);
            //如果还有，再刷新显示一次
            if (this._waitSaveUIData)
            {
                this.UIOpenData = this._waitSaveUIData;
                this._waitSaveUIData = null;
                this.initUI();
            } else
            {
                super.closeUI();
            }
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.getDarkUI().graphics.clear();
            this.getDarkUI().graphics.drawRect(0, 0, this.getDarkUI().width, this.getDarkUI().height, "#2d2629");
            this.getDarkUI().alpha = 0.85;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            SoundMgr.Inst().playSound("battle_success");

            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            //当前战斗 试炼塔
            let towerType = this.getTowerType();
            let fightName = Global.getLangStr("ui_StarTower_title" + towerType);
            this.UIPanel.txtFightName.text = Global.getLangStr("fight_msg49", fightName);
            //奖励列表显示
            let itemList = resultData.prize;
            this.UIPanel.RewardList.onRefresh(itemList.length, this, (itemUI: NorItemUI, index: number) =>
            {
                let tempInfo = itemList[index];
                itemUI.setItemID(tempInfo.itemid, tempInfo.itemcount.toNumber(), true);
            });
            //战斗用时
            let time = resultData.endtime - resultData.base.begintime;
            this.UIPanel.txtTime.innerHTML = Global.getLangStr("fight_msg51", Global.GetRemindTime(time, 4));

            this.updateBoxsView();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnNext.onClick(this, this.onClickNext);
            this.UIPanel.btnTextAuto.onClick(this, this.onBtnTextAutoClick);
            this.UIPanel.btnAuto.onClick(this, this.onBtnAutoClick);
            this.UIPanel.btnEnd.onClick(this, this.onBtnEndClick);
        }

        public getTowerType()
        {
            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            let curStage = resultData.base.id;
            this._towerType = cfg.TrainTowerCfgData.getTypeByStageID(curStage);

            return this._towerType;
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickNext(): void
        {
            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            let curStage = resultData.base.id;
            let towerType = this.getTowerType();
            //判断是否还有下一关
            if (curStage >= cfg.TrainTowerCfgData.getMaxStage(towerType))
            {
                TipsUtils.showTipsByLanId("hook_msg18"); //最大关卡
                this.closeUI();
                return;
            }
            // //判断次数            
            // if (TrainDataMgr.getTowerDayLastFightCount(towerType) == 0 && TrainDataMgr.getTowerStageID(towerType) > curStage)
            // {
            //     TipsUtils.showTipsByLanId("fight_msg45"); //次数不足
            //     this.closeUI();
            //     return;
            // }
            // let hide = resultData.isWatching ? "" :  "hide";
            //停在试炼塔界面时，就不需要隐藏战斗
            let hidestate = 1;
            //对应的主界面入口
            let mediator = towerType == 1 ? PanelNotify.Open_StarTowerMain : PanelNotify.Open_StarTowerMainAdv;
            if (UIManager.Inst.checkUIShowState(mediator, false)) hidestate = 0;
            BattleMgr.Inst.createNormalBat(resultData.base.battletype, curStage + 1, 0, Pb_God._emZhenfaType.ZhenfaType_Zhuxian, false, hidestate + "");
            this.closeUI();
        }


        /**
         * 更新box显示 涉及月卡自动挑战功能
         */
        private updateBoxsView()
        {
            let packetType = Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_ZZMonth;
            //对应特权卡类型
            let cardType = cfg.PrivilegeDailyPrizeCfgData.getNeedCardIDByType(packetType);
            //当前是否已经激活
            let isActive = PrivilegeDataMgr.getPrivilegeCardValid(cardType);

            this.UIPanel.btnTextAuto.visible = !isActive;
            this.UIPanel.hboxBtns.visible = !isActive;
            this.UIPanel.hboxAuto.visible = isActive;

            this.CountDown = 5;
            this.UIPanel.TimeLb.text = Global.getLangStr("common_closeCd", this.CountDown);
            Laya.timer.loop(1000, this, this.onCountDownTimer);
        }


        // 奖励动画
        public showEffRewardFly()
        {
            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            for (let i = 0; i < resultData.prize.length; i++) 
            {
                let itemUI = this.UIPanel.RewardList.getCellWithIndex(i);
                if(itemUI)
                {
                    let itemPoint = itemUI.localToGlobal(new Point(itemUI.width / 2, itemUI.height / 2));
                    EventMgr.trigger(EventNotify.Award_Effect_Fly, resultData.prize[i], itemPoint);
                }
            }
        }

        private onBtnTextAutoClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMain, 2));
            this.closeUI();
        }

        private onBtnAutoClick()
        {
            this.autoStateChange(true);
            this.onClickNext();
        }

        private onBtnEndClick()
        {
            this.autoStateChange(false);
            this.closeUI();
        }

        private autoStateChange(state: boolean)
        {
            if (this.getTowerType() == 1)
            {
                BattleMgr.Inst.autoTowerState = state;
            }
            else
            {
                BattleMgr.Inst.autoSpTowerState = state;
            }
        }

        protected clickSpaceFunc()
        {
            if (this.UIPanel.hboxAuto.visible)
            {
                this.autoStateChange(true);
                this.onClickNext();
            }
            else
            {
                this.closeUI();
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        private onCountDownTimer(): void
        {
            this.CountDown--;
            this.UIPanel.TimeLb.text = Global.getLangStr("common_closeCd", this.CountDown);
            if (this.CountDown < 0)
            {
                this.clickSpaceFunc();
            }
        }
    }
}