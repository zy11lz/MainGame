module Pro
{
    /**
     * 界面说明： 万神殿召唤奖励获得界面
    * @author jason.xu
    */
    export class HeroExchangeCallRewardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroExchange.Call.CallRewardUI;

        private _titleSk: SkeletonPlayer;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('rewardpopup'), UrlMgr.getAtlas('herocall')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroExchange.Call.CallRewardUI, 0, BaseAddLayer.TopUI, true);
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
            SoundMgr.Inst().playSound("get_things");
            let callType: number = this.UIOpenData.customObject2[0];
            let isTen: boolean = this.UIOpenData.customObject2[1];
            //需要的道具数量显示            
            let needItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(callType, isTen ? 10 : 1)[0];
            Global.setResIconWithItemID(this.UIPanel.imgNeedIcon, CfgID.ResType.Item, needItem.itemid);
            this.UIPanel.txtNeedCount.text = Global.getItemNum(needItem.itemid) + "/" + needItem.itemcount;

            this.UIPanel.txtAgainLabel.text = isTen ? Global.getLangStr("hero_msg30") : Global.getLangStr("hero_msg29");//再抽一次";

            //道具列表显示
            let tempActList = new Array<number>();
            let tempActLimitNum = 8;
            let itemList = this.UIOpenData.customObject as cfg.AddItemInfo[];
            let tempItemNum = itemList.length;
            this.UIPanel.RewardList.onRefresh(tempItemNum, this, (itemUI: NorItemUI, index: number) =>
            {

                //动画跳出
                {
                    let tmpLightImg = itemUI.getChildByName("lightImg") as Laya.Image;
                    tmpLightImg.visible = false;
                    if (!(tempActList.indexOf(index) == -1 && index < tempActLimitNum))
                    {
                        itemUI.scale(1, 1);
                    }
                    else
                    {
                        tempActList.push(index);

                        itemUI.scale(0, 0);
                        Laya.timer.once(index * 80, this, () =>
                        {

                            itemUI.scale(1.4, 1.4);
                            Laya.Tween.to(itemUI, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.linearIn);
                            Laya.Tween.to(itemUI, { alpha: 1 }, 60, Laya.Ease.linearIn, Laya.Handler.create(this, () =>
                            {
                                tmpLightImg.visible = true;
                                tmpLightImg.scale(1, 1);
                                tmpLightImg.alpha = 1;
                                Laya.Tween.to(tmpLightImg, { scaleX: 1.4, scaleY: 1.4, alpha: 0 }, 100, Laya.Ease.linearIn, Laya.Handler.create(this, () =>
                                {
                                    tmpLightImg.visible = false;
                                }));
                            }));
                        });
                    }

                }

                let tempInfo = itemList[index];
                itemUI.setItemInfo(tempInfo, true);
            });
            SoundMgr.Inst().playSound("reward");
            this.UIPanel.RewardList.scrollTo(0);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnAgain.onClick(this, this.onAgain);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 再来 */
        private onAgain(): void
        {
            let isTen: boolean = this.UIOpenData.customObject2[1];
            let callType: number = this.UIOpenData.customObject2[0];
            if (CallDataMgr.sendCall(callType, isTen))
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
            let resultData = this.UIOpenData.customObject;
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