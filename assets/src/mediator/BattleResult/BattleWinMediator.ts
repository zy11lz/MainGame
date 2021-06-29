
module Pro
{
    /*
     * 通用战斗胜利界面
     */
    export class BattleWinMediator extends BaseMediator implements IMediator
    {
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

        private CountDown = 5;
        public UIPanel: ProUI.BattleResult.SucceedUI;

        public openUI(): void
        {
            this.showPanel(ProUI.BattleResult.SucceedUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.showEffRewardFly()
            Laya.timer.clearAll(this);
            super.closeUI();
            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            EventMgr.trigger(EventNotify.Battle_Result_Close, resultData.base.battletype);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.getDarkUI().graphics.clear();
            this.getDarkUI().graphics.drawRect(0, 0, this.getDarkUI().width, this.getDarkUI().height, "#2d2629");
            this.getDarkUI().alpha = 0.85;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            let itemList = resultData.prize;
            let tempItemNum = itemList.length;
            this.UIPanel.RewardList.onRefresh(tempItemNum, this, (itemUI: NorItemUI, index: number) =>
            {
                let tempInfo = itemList[index];
                itemUI.setItemID(tempInfo.itemid, tempInfo.itemcount.toNumber(), true);
            });

            SoundMgr.Inst().playSound("get_things");
            SoundMgr.Inst().playSound("battle_success")


            this.UIPanel.TimeLb.visible = !GuideMgr.Inst.getInShowGuide();
            if (!GuideMgr.Inst.getInShowGuide())
            {
                this.CountDown = 5;
                this.UIPanel.TimeLb.text = Global.getLangStr("common_closeCd", this.CountDown);
                Laya.timer.loop(1000, this, () =>
                {
                    this.CountDown--;
                    this.UIPanel.TimeLb.text = Global.getLangStr("common_closeCd", this.CountDown);
                    if (this.CountDown < 0)
                    {
                        this.closeUI();
                    }
                });
            }

            //特效表现
            // {
            //     this.UIPanel.TtileImg.alpha = 0;
            //     let tmpEffPos = new Laya.Point(this.UIPanel.TtileImg.x, this.UIPanel.TtileImg.y);
            //     let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_challenge_succ", tmpEffPos, null, 1.35, 1, this.UIPanel.BGBox, true, ResReleaseType.Reference);
            //     Laya.timer.once(tmpEffNode.effAllTime, this, () =>
            //     {
            //         this.UIPanel.TtileImg.alpha = 1;
            //     });
            // }
        }

        /* 奖励动画 */
        public showEffRewardFly()
        {
            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            for (let i = 0; i < resultData.prize.length; i++) 
            {
                let itemUI = this.UIPanel.RewardList.getCell(i);
                if(itemUI)
                {
                    let itemPoint = itemUI.localToGlobal(new Point(itemUI.width / 2, itemUI.height / 2));
                    EventMgr.trigger(EventNotify.Award_Effect_Fly, resultData.prize[i], itemPoint);
                }
            }
        }

        public refreshUI()
        {
        }

    }
}