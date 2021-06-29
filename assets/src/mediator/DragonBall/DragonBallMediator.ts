module Pro
{
    /**
     * 界面说明： 龙珠主界面
    * @author jason.xu
    */
    export class DragonBallMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.DragonBall.DragonBallUI;
        effectNode: EffNode;
        bgEffNode: EffNode;
        //public UIOpenData: BaseOpenUIData;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('dragonball')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.DragonBall.DragonBallUI, 1);
        }

        public closeUI(): void
        {
            //释放特效资源
            for (let i = 1; i <= 7; i++)
            {
                let ballItem = this.UIPanel.ballItemBox.getChildAt(i - 1) as ProUI.DragonBall.ChildView.BallItemUI;
                ballItem.effNode.removeChildren(); //移除即可，自动回收的。
            }
            super.closeUI();
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
            //刷新珠子显示
            for (let i = 1; i <= 7; i++)
            {
                let ballItem = this.refreshBallItem(i);
                this.reddotBind(ballItem.reddot, DragonBallDataMgr.reddotModel.getChildModel(i));
            }

            //下面的属性列表
            this.refreshAllAttrView();
            this.refreshBgEffect();
            this.refreshGiftState();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.dragonGiftBtn.onClick(this,this.onClickDragonGift)
            this.addEventMgr(EventNotify.DragonBall_LevelChange, this, this.onChangeBallLevel);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "dragonBallHelp");
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 龙珠等级变更 */
        private onChangeBallLevel(type: number): void
        {
            this.refreshBallItem(type);
            //刷新属性列表
            if (type == 7)
            {
                this.refreshId7AttrInfo();
                this.refreshBgEffect();
            } else
            {
                let index = type - 1;
                let item = this.UIPanel.listAttrBox.getCellWithIndex(index);
                this.onRefreshSingleAttrItem(item, index);
            }
        }

        /** 刷新龙珠显示 */
        private refreshBallItem(type: number): ProUI.DragonBall.ChildView.BallItemUI
        {
            let ballItem = this.UIPanel.ballItemBox.getChildAt(type - 1) as ProUI.DragonBall.ChildView.BallItemUI;
            ballItem.icon.frame = type;
            let level = DragonBallDataMgr.getLevelByType(type);
            if (level == 0)
            { //未激活
                ballItem.icon.gray = true;
                ballItem.txtLeve.text = Global.getLangStr("dragonball_msg5");
                EffectMgr.Inst.releaseEffect(this.effectNode);
                this.effectNode = null;
            } else
            {
                ballItem.icon.gray = false;
                ballItem.txtLeve.text = "Lv." + level;
                if (this.effectNode == null)
                {
                    let pos = type == 7 ? new Point(0, -10) : null;
                    let effNanme = type == 7 ? "ui_dragonBall2" : "ui_dragonBall1";
                    this.effectNode = EffectMgr.Inst.createEffectOne(effNanme, pos, null, 1, 1, ballItem.effNode, false, ResReleaseType.Reference, false);
                }
            }
            ballItem.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DragonBallUpLevel, type));
            })

            return ballItem;
        }

        /** 刷新龙珠属性显示 */
        private refreshAllAttrView(): void
        {
            //6个在列表组件内，
            this.UIPanel.listAttrBox.onRefresh(6, this, this.onRefreshSingleAttrItem);
            //第7个特殊处理
            this.refreshId7AttrInfo();
        }

        private onRefreshSingleAttrItem(itemUI: ProUI.DragonBall.ChildView.AttrItemUI, index: number): void
        {
            let type = index + 1;
            itemUI.txtName.text = Global.getLangStr("dragonball_msg3", Global.numberToChinese(type));  //一星珠
            let level = DragonBallDataMgr.getLevelByType(type);
            let isUnlock = level > 0;
            itemUI.imgType.visible = isUnlock;
            itemUI.txtValue.visible = isUnlock;
            itemUI.txtUnlockTips.visible = !isUnlock;
            if (isUnlock)
            { //已激活
                let addAttr = cfg.DragonBallLevelCfgData.getAddAttrArrByInfo(type, level)[0];
                itemUI.imgType.frame = addAttr.type;
                itemUI.txtValue.text = Global.getFullAttrValueString(addAttr, "  +");
                itemUI.txtName.color = "#5d565d";
            } else
            {
                itemUI.txtName.color = "#86807f";
            }
        }

        /** 第7个龙珠的属性单独处理 */
        private refreshId7AttrInfo(): void
        {
            //第7个单独处理
            let sevenType = 7;
            let level = DragonBallDataMgr.getLevelByType(sevenType);
            let isUnlock = level > 0;
            this.UIPanel.txtUnlockTips.visible = !isUnlock;
            this.UIPanel.listSevenAttrs.visible = isUnlock;
            if (isUnlock)
            {
                let addAttrs = cfg.DragonBallLevelCfgData.getAddAttrArrByInfo(sevenType, level);
                this.UIPanel.listSevenAttrs.onRefresh(addAttrs.length, this, (box: Laya.Box, index: number) =>
                {
                    let imgType = box.getChildByName("imgType") as component.UIFrameImage;
                    let txtValue = box.getChildByName("txtValue") as component.UILabel;
                    let addAttr = addAttrs[index];
                    imgType.frame = addAttr.type;
                    txtValue.text = Global.getFullAttrValueString(addAttr, "  +");
                })
            }
        }

        /** 刷新背景特效（七颗龙珠都激活时，亮起来） */
        private refreshBgEffect(): void
        {
            if (DragonBallDataMgr.getLevelByType(7) > 0)
            {
                if (this.bgEffNode == null)
                {
                    //TODO
                    this.bgEffNode = EffectMgr.Inst.createEffectOne("ui_dragonBallBg", null, null, 1, 1, this.UIPanel.bgEffNode, false, ResReleaseType.Reference, false);
                }
            } else
            {
                EffectMgr.Inst.releaseEffect(this.bgEffNode);
                this.bgEffNode = null;
            }
        }
             
        private onClickDragonGift(btn: component.UIButton): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TimeLimitActivity, 3, 0));
        }


        private _reddotBindCtl: ReddotBindImageController = new ReddotBindImageController();
        
        private refreshGiftState(): void
        {
            let isOpening = true;
            this._reddotBindCtl.cleanUp();
            if (PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.LimitTimeAct))
            {
                let actGrpList = cfg.ActivityCommonGroupCfgData.getAll();
                for (let grpCfg of actGrpList)
                {
                    if(grpCfg.groupID != 3)continue; // 3为common_group表龙珠觉醒
                    if (ActivityDataMgr.checkCommonGroupActivityOpen(grpCfg.groupID)) 
                    {
                        isOpening = true;
                        this.UIPanel.dragonGiftBtn.skin = `res/Unpack/activityMainBtns/${ grpCfg.mainIcon }.png`;
                    }
                    this._reddotBindCtl.bind(this.UIPanel.reddot, ActivityDataMgr.reddotModelCommonGrp.getChildModel(grpCfg.groupID));
                }
            }
            this.UIPanel.dragonGiftBtn.visible = isOpening;

            
        }
    }
}