module Pro
{
    /**
     * 界面说明：  巅峰挑战主界面
    * @author jason.xu
    */
    export class PeakMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Peak.PeakUI;

        private _pageDay = -1;
        private _maxDay = -1;

        /** 记录购买次数前的行为， 在购买次数成功后，执行挑战 0-无 1-挑战 */
        private _buyCountCall = 0;

        private _sk: SkeletonPlayer;

        private _sks = [21510, 22504, 23508, 24505, 25507];


        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('peak')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Peak.PeakUI, 1, BaseAddLayer.CenterUI, false, 3);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.onTimer);
        }

        /** 检查UI是否能被重新拉起来 */
        public checkCanDisplayUI(): boolean
        {
            //如果当前正在观看对应的战斗，则界面还不能拉起来，等战斗结束后才能拉
            if (BattleMgr.Inst.getWatchBattleType() == Pb_God._emBattleType.BattleType_Peak) return false;
            return super.checkCanDisplayUI();
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
            let openDay = TrainDataMgr.getPeakOpenDay();
            this.resetOpenDay(openDay);

            Laya.timer.loop(500, this, this.onTimer);
            this.onTimer();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.ArrowItemUI.onClick(this, this.onArrowChange);
            this.UIPanel.btnAttack.onClick(this, this.onClickAttack);
            this.UIPanel.btnSkillIcon.onClick(this, this.onClickBuyBuff);
            this.UIPanel.btnBuyCount.onClick(this, this.onClickBuyCount);
            this.UIPanel.btnRank.onClick(this, this.onClickRank);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);

            //data event
            this.addEventMgr(CmdEvent.Train_PeakBuyCount, this, this.onBuyCount);
            this.addEventMgr(CmdEvent.Train_PeakBuyBuff, this, this.refreshBuffView);
            this.addEventMgr(CmdEvent.Common_TimeEvent, this, this.onResetTimeEvent);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }
        /** 点击问号 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "peak_help");
        }
        /** 点击攻击 */
        private onClickAttack(): void
        {
            if (this.UIPanel.btnAttack.gray)
            {
                TipsUtils.showTips(Global.getLangStr("peak_msg8"));
                return;
            }

            let isInbattle: boolean = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Peak);
            if (isInbattle)
            {

            } else
            {
                this._buyCountCall = 0;
                let leftCount = TrainDataMgr.getPeakLeftCount();
                if (leftCount <= 0)
                {
                    let buyCount = TrainDataMgr.getPeakBuyCount();
                    let maxBuyCount = cfg.TrainConstantsCfgData.getFirstInfo().buyCount;
                    //购买上限
                    if (buyCount >= maxBuyCount)
                    {
                        TipsUtils.showTipsByLanId("tips_msg27");
                        return;
                    }
                    this._buyCountCall = 1;
                    this.buyCountAlertShow();
                } else
                {
                    this.toAttack();
                }
            }
        }
        /** 验证条件，正式发起攻击 */
        private toAttack(): void
        {
            UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_Peak, this._pageDay));
        }
        /** 点击购买BUFF */
        private onClickBuyBuff(): void
        {
            //二级提示
            let buyCount = TrainDataMgr.getPeakBuyBuffCount();
            let maxBuyCount = cfg.TrainConstantsCfgData.getFirstInfo().buffCount;
            //购买上限
            if (buyCount >= maxBuyCount)
            {
                TipsUtils.showTipsByLanId("tips_msg65");
                return;
            }
            let needItem = cfg.TrainConstantsCfgData.getPeakBuyBuffNeedItem();
            //二级提示
            let des = Global.getLangStr("peak_msg6", needItem.itemcount);
            AlertShow.showConfirmAlert(des, this, () =>
            {
                if (!Global.isFullRes(needItem.itemid, needItem.itemcount))
                {
                    return;
                }
                //服务器的坑，要把这个技能带过去。
                let skillIndex = parseInt(cfg.TrainConstantsCfgData.getFirstInfo().buff);
                //向服务器发请求
                TrainSend.peakBuyBuff(skillIndex);
            });


        }
        /** 点击购买次数 */
        private onClickBuyCount(): void
        {
            this._buyCountCall = 0;
            let buyCount = TrainDataMgr.getPeakBuyCount();
            let maxBuyCount = cfg.TrainConstantsCfgData.getFirstInfo().buyCount;
            //购买上限
            if (buyCount >= maxBuyCount)
            {
                TipsUtils.showTipsByLanId("tips_msg65");
                return;
            }
            this.buyCountAlertShow();
        }

        //购买次数二级提示
        private buyCountAlertShow(): void
        {
            let needItem = cfg.TrainConstantsCfgData.getPeakBuyCountNeedItem();
            //二级提示
            let des = Global.getLangStr("fight_msg8", cfg.ItemCfgData.getNameById(needItem.itemid), needItem.itemcount);
            AlertShow.showConfirmAlert(des, this, () =>
            {
                if (!Global.isFullRes(needItem.itemid, needItem.itemcount))
                {
                    this._buyCountCall = 0;
                    return;
                }
                //向服务器发请求
                TrainSend.peakBuyCount();
            });
        }
        /** 点击排行榜 */
        private onClickRank(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetailReward, Pb_God._emTopListType.TopListType_PeakDay1 + this._pageDay - 1));
        }

        /** 切换翻页 */
        private onArrowChange(statue: number): void
        {
            if (statue == 0)
            {
                let pageDay = this._pageDay - 1;
                this.changePage(pageDay);
            } else
            {
                let pageDay = this._pageDay + 1;
                this.changePage(pageDay);
            }
        }

        /** 时间重置 */
        private onResetTimeEvent(): void
        {
            let openDay = TrainDataMgr.getPeakOpenDay();
            if (openDay < 0)
            { //已结束了
                this.closeUI();
                return;
            }
            this.resetOpenDay(openDay);
        }

        /** 重置当前开启天数的状态 */
        private resetOpenDay(openDay: number): void
        {
            this._pageDay = -1;
            //默认切换到的分页
            let defaultDay = openDay;
            this._maxDay = defaultDay;
            this.UIPanel.ArrowItemUI.visible = this._maxDay > 1;
            this.changePage(defaultDay);

            this.refreshBuffView();
            this.refreshCountView();
        }

        /** 购买次数返回 */
        private onBuyCount(): void
        {
            this.refreshCountView();
            if (this._buyCountCall == 1 && TrainDataMgr.getPeakLeftCount() > 0)
            {
                this.toAttack();
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 切换翻页 */
        private changePage(pageDay: number): void
        {
            if (this._pageDay == pageDay) return;
            this._pageDay = pageDay;
            this.UIPanel.ArrowItemUI.ArrLeftBtn.visible = this._pageDay > 1;
            this.UIPanel.ArrowItemUI.ArrRightBtn.visible = this._pageDay < this._maxDay;
            let uiBgName = `peak_bg${ pageDay }.jpg`;
            let uiUrl = Global.getUIBGPathWithResUrl(uiBgName);
            this.setUIBG(uiUrl);

            let isLock = this._pageDay != this._maxDay;
            this.UIPanel.activeBox.visible = !isLock;
            this.UIPanel.txtLuckTips.visible = isLock;


            let tmpPetResID = cfg.PetCfgData.getSkinInfoByPetID(this._sks[pageDay - 1]).id;
            let skelName = cfg.PetSkinCfgData.getSkelNameById(tmpPetResID);
            if (!this._sk)
            {
                this._sk = new SkeletonPlayer();
                this._sk.play("standby_loop", true)
                this.UIPanel.aniNode.addChild(this._sk);
                this._sk.scale(2, 2);
            }
            this._sk.load(UrlMgr.getModelSkUrl(skelName));

            this.UIPanel.nameImg.skin = UrlMgr.getPeakUrl("name_" + pageDay);



            this.refreshCurPageView();
        }

        /** 刷新当前分页的数据 */
        private refreshCurPageView(): void
        {
            //boss技能列表
            let monstId = cfg.TrainPeakCfgData.getMonsterByDay(this._pageDay);
            let monsterInfo = cfg.TrainMonsterNewCfgData.getBossMonsterInfoById(monstId);

            //技能列表
            Global.setOpenSkillBoxWithPetInfo(this.UIPanel.skillListView, monsterInfo.skinId, monsterInfo.advance, monsterInfo.star);
        }


        /** 刷新buff显示 */
        private refreshBuffView(): void
        {
            let buyBuffCount = TrainDataMgr.getPeakBuyBuffCount();
            this.UIPanel.btnSkillIcon.gray = buyBuffCount == 0;
            let skillIndex = parseInt(cfg.TrainConstantsCfgData.getFirstInfo().buff);
            Global.setResIconWithItemID(this.UIPanel.btnSkillIcon, CfgID.ResType.Skill, skillIndex);
            this.UIPanel.txtSkillName.text = cfg.SkillNewSkillCfgData.getExtDesByInfo(skillIndex, buyBuffCount || 1);
        }

        /** 刷新次数显示 */
        private refreshCountView(): void
        {
            let leftCount = TrainDataMgr.getPeakLeftCount();
            let buyCount = TrainDataMgr.getPeakBuyCount();
            let freeCount = cfg.TrainConstantsCfgData.getFirstInfo().freeCount;
            let maxBuyCount = cfg.TrainConstantsCfgData.getFirstInfo().buyCount;
            this.UIPanel.txtLeftCount.text = leftCount + "/" + (buyCount + freeCount);
            this.UIPanel.txtLeftBuyCount.text = (maxBuyCount - buyCount) + "";
        }

        private onTimer(): void
        {
            let currTime = TimeController.currTimer;
            //整个活动剩余时间
            let overLeftTime = TimeController.worldCreateZeroTime / 1000 + 6 * 24 * 3600 - currTime / 1000;
            this.UIPanel.htmlAllTimer.text = Global.GetRemindTime(overLeftTime, 9)
            //当前挑战倒计时  当前时间距离当天23：30还有多久
            let curLeftTime = Global.getZeroTimeNumber(currTime) + 23.5 * 3600 * 1000 - currTime;
            if (this._pageDay < this._maxDay)
            {
                this.UIPanel.htmlCurTimerTxt.active = false
                this.UIPanel.htmlCurTimer.text = ""
            } else
            {
                this.UIPanel.htmlCurTimerTxt.active = true
                this.UIPanel.htmlCurTimer.text = curLeftTime / 1000 <= 0 ? "00:00:00" : Global.GetRemindTime(curLeftTime / 1000, 4)
                this.UIPanel.btnAttack.gray = curLeftTime / 1000 <= 0;

            }
            //buff倒计时
            let buyBuffCount = TrainDataMgr.getPeakBuyBuffCount();
            if (buyBuffCount > 0)
            {
                this.UIPanel.txtSkillTips.text = Global.getLangStr("peak_msg4", Global.GetRemindTime(curLeftTime / 1000, 4))
            } else
            {
                this.UIPanel.txtSkillTips.text = Global.getLangStr("peak_msg5");
            }
        }

    }
}