
module Pro
{
    /*
    * 通用奖励面板
    */
    export class NormalAwardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Common.NormalAwardUI;
        public UIOpenData: AwardOpenUIData;

        private _titleSk: SkeletonPlayer;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            /* 点击空白处是否关闭UI*/
            let flag = this.UIOpenData.CallbackMap && this.UIOpenData.CallbackMap.size() > 0;
            this.showPanel(ProUI.Common.NormalAwardUI, 0, BaseAddLayer.TopUI, !flag);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            if (this._titleSk)
            {
                this._titleSk.offAll();
                this._titleSk.removeSelf();
                this._titleSk = null;
            }
            this.showAwardEffectFly();
            Laya.timer.clearAll(this);
            this.closePanel();
            EventMgr.trigger(EventNotify.NormalAwardUIClose);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            this.UIPanel.bgBtn.off(Laya.Event.CLICK, this, this.closeUI);
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

        private initBtn()
        {
            this.UIPanel.CallbackBox.visible = false;
            if (this.UIOpenData.CallbackMap && this.UIOpenData.CallbackMap.size() > 0)
            {
                this.UIPanel.TipsImg.visible = false;
                this.UIPanel.CallbackBox.visible = true;
                for (let index = 0; index < this.UIOpenData.CallbackMap.size(); index++)
                {
                    let key = this.UIOpenData.CallbackMap.getKeys()[index];
                    let tmpLb = this.UIPanel.CallbackBox.getChildAt(index).getChildAt(0) as component.UILabel;
                    tmpLb.text = key // 按钮描述
                    let tmpBtn = this.UIPanel.CallbackBox.getChildAt(index) as component.UIButton;
                    tmpBtn.onClick(this, function ()
                    {
                        let callBack = this.UIOpenData.CallbackMap.get(key);
                        if (callBack)
                        {
                            callBack.func.apply(callBack.caller, callBack.getCallBackArgs());
                        }
                        this.closeUI();
                    }.bind(this, key));
                }
            }
            else
            {
                this.UIPanel.TipsImg.visible = true;
                this.UIPanel.bgBtn.on(Laya.Event.CLICK, this, this.closeUI);
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.initTitleSk();
            this.initBtn();

            this.UIPanel.needBox.visible = false;
            if (this.UIOpenData.CustomJson)
            {
                this.UIPanel.needBox.visible = true;
                // 物品图标 与 物品数量
                Global.setResIconWithItemID(this.UIPanel.imgNeedIcon, CfgID.ResType.Item, this.UIOpenData.CustomJson.itemid);
                this.UIPanel.txtNeedCount.text = Global.getItemNum(this.UIOpenData.CustomJson.itemid) + "/" + this.UIOpenData.CustomJson.itemcount;
            }

            let tempActList = new Array<number>();
            let tempActLimitNum = 15;

            let tempItemNum = this.UIOpenData.ItemList.length;
            let tempPetNum = this.UIOpenData.PetList == null ? 0 : this.UIOpenData.PetList.length;
            this.UIPanel.RewardList.onRefresh(tempItemNum + tempPetNum, this, (itemUI: NorItemUI, index: number) =>
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

                //刷新Item
                if (index < tempItemNum)
                {
                    let tempInfo = this.UIOpenData.ItemList[index];
                    itemUI.setItemInfo(tempInfo, true);
                }
                else
                {
                    let tempInfo = this.UIOpenData.PetList[index - tempItemNum];
                    itemUI.setPetStarInfo(tempInfo);
                }
            });
            this.UIPanel.RewardList.scrollTo(0);
            let allcount = tempItemNum + tempPetNum
            // this.UIPanel.RewardList.width = (allcount > 5 ? 5 : allcount)  * 140
            // this.UIPanel.RewardList.y = allcount > 5 ? 60 : 129
            SoundMgr.Inst().playSound("reward");
        }

        public refreshUI()
        {

        }

        // 奖励动画
        public showAwardEffectFly()
        {
            let tempItem = this.UIOpenData.ItemList;
            for (let i = 0; i < tempItem.length; i++)
            {
                let itemUI = this.UIPanel.RewardList.getCell(i);
                if (itemUI)
                {
                    let itemPoint = itemUI.localToGlobal(new Point(itemUI.width / 2, itemUI.height / 2));
                    EventMgr.trigger(EventNotify.Award_Effect_Fly, tempItem[i], itemPoint);
                }
            }
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Artifact_16_8)
            {
                return;
            }
            GuideMgr.Inst.showFinger(this.UIPanel.TipsImg, true, this.getDarkUI());
        }

        // /**
        //  * 操作本步引导
        //  */
        // public Guide_Active(step: GuideStep) {
        //     if (step == GuideStep.BagCombinHero_6_5 || step == GuideStep.Func_7DayAct_4 ||
        //         step == GuideStep.Func_SignIn_5 || step == GuideStep.Func_7DayTarget_5 ||
        //         step == GuideStep.ArtifactTask_17_7||
        //         step == GuideStep.ArtifactTask_17_7) {
        //         this.closeUI();
        //         GuideMgr.Inst.nextActive();
        //     }
        //     else {
        //         UIManager.Inst.closeCurrentList();
        //         if (!UIManager.Inst.getIsShowingUI()) {
        //             GuideMgr.Inst.nextActive();
        //         }
        //     }
        // }
    }
}