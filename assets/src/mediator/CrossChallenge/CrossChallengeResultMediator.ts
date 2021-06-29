module Pro
{
    /**
    * 跨服竞技场结果
    */
    export class CrossChallengeResultMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.CrossChallenge.CrossChallengeResultUI;

        private _awards: number[];

        private _isPlaying: boolean = false;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup"), UrlMgr.getAtlas("crossChallenge")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.CrossChallenge.CrossChallengeResultUI, 1, BaseAddLayer.TopUI);
        }

        public closeUI(): void
        {
            super.closeUI();
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
            this._isPlaying = false;
            var value = (this.UIOpenData as CrossChallengeResultOpenUIData).result;
            let isWin = value.result == Pb_God._emBattleResult.BattleResult_Sucess;

            this._awards = value.crosschallengeresult.index;
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

            //头像框
            Global.setResIconWithItemID(this.UIPanel.imgIconSelf, CfgID.ResType.Player_Icon, selfDisplay.head);
            this.UIPanel.txtNicknameSelf.text = selfDisplay.playername;

            let tarDisplay = value.base.energy.playerdisplay;
            //头像框
            Global.setResIconWithItemID(this.UIPanel.imgIconTar, CfgID.ResType.Player_Icon, tarDisplay.head);
            this.UIPanel.txtNicknameTar.text = tarDisplay.playername;


            this.UIPanel.lblSelfChange.text = Math.abs(value.crosschallengeresult.friendaddscore) + "";
            this.UIPanel.lblSelfChange.color = value.crosschallengeresult.friendaddscore > 0 ? "#60c456" : "#f13c55";

            this.UIPanel.lblTarChange.text = Math.abs(value.crosschallengeresult.enermyaddscore) + "";
            this.UIPanel.lblTarChange.color = value.crosschallengeresult.enermyaddscore > 0 ? "#60c456" : "#f13c55";

            this.UIPanel.txtRankSelf.text = value.crosschallengeresult.friendscore + "";
            this.UIPanel.txtRankTar.text = value.crosschallengeresult.enermyscore + "";

            this.UIPanel.imgChangeSelf.visible = value.crosschallengeresult.friendaddscore != 0;
            this.UIPanel.imgChangeSelf.frame = value.crosschallengeresult.friendaddscore > 0 ? 1 : 2;

            this.UIPanel.imgChangeTar.visible = value.crosschallengeresult.enermyaddscore != 0;
            this.UIPanel.imgChangeTar.frame = value.crosschallengeresult.enermyaddscore > 0 ? 1 : 2;


            for (let i = 1; i <= 3; i++)
            {
                let award = this.UIPanel[`award${ i }`] as Pro.NorItemUI;
                this.UIPanel[`btnSelect${ i }`].visible = award.visible = false;
            }
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnOk.onClick(this, this.closeUI);
            this.UIPanel.btnHitDetail.onClick(this, this.onClickHitDetail);
            this.UIPanel.btnCrossChallenge.onClick(this, () =>
            {
                this.closeUI();
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_CrossChallenge));
            })

            for (let i = 1; i <= 3; i++)
            {
                this.UIPanel[`btnSelect${ i }`].onClick(this, () =>
                {
                    this.onClickPrize(i);
                })

                this.UIPanel[`card${ i }`].on(LayaEvent.CLICK, this, this.onCardClick, [i]);
            }

            this.addEventMgr(CmdEvent.CrossChallenge_BuyPrize, this, this.onRefreshBox);
        }

        private onCardClick(selectIndex: number)
        {
            if (this._isPlaying)
                return;
            this._isPlaying = true;
            //交换奖励
            let old = this._awards[selectIndex - 1];
            this._awards[selectIndex - 1] = this._awards[0];
            this._awards[0] = old;

            //默认第一个为奖品
            this.showEffect(selectIndex);
        }

        private onRefreshBox(value: Pb_God.PBU32)
        {
            let index = this.findAwardIndex(value.value, 0)

            this.UIPanel[`btnSelect${ index + 1 }`].visible = false;
            this.UIPanel[`imgGet${ index + 1 }`].visible = true;
        }


        private findAwardIndex(idx: number, searIndex: number)
        {
            let index = this._awards.indexOf(idx, searIndex);

            if (index >= 0)
            {
                if (this.UIPanel[`btnSelect${ index + 1 }`].visible)
                {
                    return index;
                }
                else
                {
                    //已经隐藏了 说明有相同的奖励
                    return this.findAwardIndex(idx, index + 1);
                }
            }
        }


        private onClickPrize(index: number)
        {
            UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(9, this._awards[index - 1]));
            //已经领过了 后面是购买
            // CrossChallengeSend.buyPrize(this._awards[index - 1]);
        }

        /**
         * 开始scaleX = 0
         * @param idx 获奖idx
         */
        private showEffect(idx: number)
        {
            for (let i = 1; i <= 3; i++)
            {
                let card = this.UIPanel[`card${ i }`];
                Laya.Tween.to(card, { "scaleX": 0 }, 300, null, Laya.Handler.create(this, this.onComplete, [idx]));
            }
        }

        /**
         * 开始scaleX = 1
         * @param idx 
         */
        private onComplete(idx: number)
        {

            var value = (this.UIOpenData as CrossChallengeResultOpenUIData).result;
            let isWin = value.result == Pb_God._emBattleResult.BattleResult_Sucess;


            for (let i = 1; i <= 3; i++)
            {
                let award = this.UIPanel[`award${ i }`] as Pro.NorItemUI;

                let cfgs = isWin?cfg.CrossChallengeWinPrizeCfgData:cfg.CrossChallengeLosePrizeCfgData;
                let addItemInfo = cfgs.getAddItemAryByID(this._awards[i - 1])[0]
                award.setItemInfo(addItemInfo);
                award.visible = true;

                this.UIPanel[`lblPrice${ i }`].text = cfgs.getNeedItemByIndex(this._awards[i - 1]).split("_")[1];

                this.UIPanel[`imgGet${ i }`].visible = idx == i;
                if (this.UIPanel[`imgGet${ i }`].visible)
                {
                    let pos = award.localToGlobal(new Point(award.width / 2, award.height / 2));
                    EventMgr.trigger(EventNotify.Award_Effect_Fly, addItemInfo, pos)
                }

                let card = this.UIPanel[`card${ i }`];
                Laya.Tween.to(card, { "scaleX": 1 }, 300, null, Laya.Handler.create(this, this.onComplete2, [idx]));
            }
        }

        /**
         * scaleX =1 
         * @param idx 
         */
        private onComplete2(idx: number)
        {
            for (let i = 1; i <= 3; i++)
            {
                this.UIPanel[`btnSelect${ i }`].visible = idx != i;
            }
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击伤害统计 */
        private onClickHitDetail(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleFightStatistics, [null, (this.UIOpenData as CrossChallengeResultOpenUIData).result]));
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}