module Pro
{
    /**
     * 界面说明： 探宝奖励弹窗
    * @author jason.xu
    */
    export class TreasureAwardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Treasure.TreasureAwardUI;

        private _curCostIndex: number;

        private _titleSk: SkeletonPlayer;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Treasure.TreasureAwardUI, 1, BaseAddLayer.TopUI);
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
            this.initTitleSk();
            //items type, isMult, canAgain
            let args = this.UIOpenData.customObject;
            let items = args[0] as cfg.AddItemInfo[];
            let type: number = args[1];
            let isMult: boolean = args[2];

            this.UIPanel.RewardList.scrollTo(0);
            this.UIPanel.RewardList.onRefreshWithArray(items, this, (norItem: NorItemUI, index: number) =>
            {
                norItem.setItemInfo(items[index]);
            })

            let cfgList = cfg.TreasureCostCfgData.getListByType(type);
            let cfgInfo = cfgList[isMult ? 1 : 0];
            this._curCostIndex = cfgInfo.index;
            this.UIPanel.txtAgainLabel.text = Global.getLangStr("treasure_msg1", cfgInfo.times);
            SoundMgr.Inst().playSound("reward");
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnAgain.onClick(this, this.onClickAgain);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickAgain(): void
        {
            let canAgain: boolean = this.UIOpenData.customObject[3];
            if (!canAgain)
            {
                TipsUtils.showTipsByLanId("treasure_msg2");
                return;
            }
            let cfgInfo = cfg.TreasureCostCfgData.getInfo(this._curCostIndex);
            //判断消耗品是否足够
            let costItem = cfg.TreasureCostCfgData.getNeedItemInfoByInfo(cfgInfo);
            if (!Global.isFullRes(costItem.itemid, costItem.itemcount, true)) return;
            TreasureSend.hunt(this._curCostIndex, true);
            this.closeUI();
        }

        private initTitleSk()
        {
            if (!this._titleSk)
            {
                this._titleSk = new SkeletonPlayer();
                this.UIPanel.aniPosImg.addChild(this._titleSk);
                this._titleSk.play("effect", false);
                this._titleSk.on(Laya.Event.STOPPED, this, () =>
                {
                    this._titleSk.play("effect_loop", true);
                })
                this._titleSk.scale(0.6, 0.6);
                this._titleSk.load(UrlMgr.getSpineSceneUrl("texiao/gongxihuode/gongxihuode"));
            } else
            {
                this._titleSk.play("effect", false);
            }
        }

        public closeUI()
        {
            this.showEffRewardFly();
            if (this._titleSk)
            {
                this._titleSk.offAll();
                this._titleSk.removeSelf();
                this._titleSk = null;
            }
            super.closeUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /* 奖励动画 */
        public showEffRewardFly()
        {
            let resultData = this.UIOpenData.customObject[0];
            for (let i = 0; i < resultData.length; i++) 
            {
                let itemUI = this.UIPanel.RewardList.getCell(i);
                if(itemUI)
                {
                    let itemPoint = itemUI.localToGlobal(new Point(itemUI.width / 2, itemUI.height / 2));
                    EventMgr.trigger(EventNotify.Award_Effect_Fly, resultData[i], itemPoint);
                }
            }
        }
    }
}