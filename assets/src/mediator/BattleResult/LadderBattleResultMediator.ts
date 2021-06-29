module Pro
{
    /**
    * 界面说明：  天梯战斗结算界面
    * @author jason.xu
    */
    export class LadderBattleResultMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.BattleResult.BattleResultLadderUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.BattleResult.BattleResultLadderUI, 1, BaseAddLayer.TopUI);
        }

        public closeUI(): void
        {
            super.closeUI();
            //关闭结算界面时，服务器要求要刷新一次。
            if (LadderDataMgr.isUnderAway())
            {
                LadderSend.refresh(0, 0, 0);
            }
            EventMgr.trigger(EventNotify.Battle_Result_Close, Pb_God._emBattleType.BattleType_Ladder);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.getDarkUI().graphics.clear();
            this.getDarkUI().graphics.drawRect(0, 0, this.getDarkUI().width,  this.getDarkUI().height, "#2d2629");
            this.getDarkUI().alpha = 0.85;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            if (LadderDataMgr.isUnderAway())
            {
                LadderSend.open(0, 0, []); //向服务器请求主要信息
            }

            var value: Pb_God.PBFightResult = this.UIOpenData.customObject;
            let isWin = value.result == Pb_God._emBattleResult.BattleResult_Sucess;
            this.UIPanel.boxWin.visible = isWin;
            this.UIPanel.boxLose.visible = !isWin;
            if (isWin)
            {
                SoundMgr.Inst().playSound("battle_success")
            } else
            {
                SoundMgr.Inst().playSound("battle_fail")
            }

            let selfDisplay = value.base.friend.playerdisplay;
            let ladderresultValue = value.ladderresult;

            //战斗前数据
            let oldSelfRank = LadderDataMgr.myRank;
            let oldTarRank = value.base.id;
            //头像框
            Global.setResIconWithItemID(this.UIPanel.imgIconSelf, CfgID.ResType.Player_Icon, selfDisplay.head);
            this.UIPanel.txtNicknameSelf.text = selfDisplay.playername;

            let tarDisplay = value.base.energy.playerdisplay;
            //头像框
            Global.setResIconWithItemID(this.UIPanel.imgIconTar, CfgID.ResType.Player_Icon, tarDisplay.head);
            this.UIPanel.txtNicknameTar.text = tarDisplay.playername;

            let rankChange = isWin && (oldSelfRank == 0 || oldSelfRank > oldTarRank);
            this.UIPanel.imgChangeSelf.visible = rankChange;
            this.UIPanel.imgChangeTar.visible = rankChange;
            //排名变化
            if (rankChange)
            {
                // let addRank = oldSelfRank == 0 ? oldTarRank : (oldSelfRank - oldTarRank);
                // this.UIPanel.imgChangeSelf.frame = 1;
                // this.UIPanel.txtRankChangeSelf.text = addRank + "";
                // this.UIPanel.imgChangeTar.frame = 2;
                // this.UIPanel.txtRankChangeTar.text = addRank + "";
                //排名直接交换显示
                this.UIPanel.txtRankSelf.text = oldTarRank + "";
                this.UIPanel.txtRankTar.text = oldSelfRank == 0 ? Global.getLangStr("common_none2") : oldSelfRank + "";
            } else
            {
                this.UIPanel.txtRankSelf.text = oldSelfRank == 0 ? Global.getLangStr("common_none2") : oldSelfRank + "";
                this.UIPanel.txtRankTar.text = oldTarRank + "";
            }

            //获得道具
            this.UIPanel.listNorItem.onRefresh(value.prize.length, this, (norItem: NorItemUI, index: number) =>
            {
                let itemInfo = value.prize[index];
                norItem.setItemID(itemInfo.itemid, itemInfo.itemcount.toNumber(), true);
            });

            // //胜利特效表现
            // if (isWin)
            // {
            //     this.UIPanel.boxWinImg.alpha = 0;
            //     let tmpEffPos = new Laya.Point(this.UIPanel.boxWinImg.x, this.UIPanel.boxWinImg.y);
            //     let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_challenge_succ", tmpEffPos, null, 1.35, 1, this.UIPanel.boxWin, true, ResReleaseType.Reference);
            //     Laya.timer.once(tmpEffNode.effAllTime, this, () =>
            //     {
            //         this.UIPanel.boxWinImg.alpha = 1;
            //     });
            // }
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnOk.onClick(this, this.closeUI);
            this.UIPanel.btnHitDetail.onClick(this, this.onClickHitDetail);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击伤害统计 */
        private onClickHitDetail(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleFightStatistics, [null, this.UIOpenData.customObject]));
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}