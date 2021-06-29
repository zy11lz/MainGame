module Pro
{
    /**
     * 界面说明： 龙珠升级界面
    * @author jason.xu
    */
    export class DragonBallUpLevelMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.DragonBall.UpLevelUI;
        //public UIOpenData: BaseOpenUIData;

        private _type = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('dragonball')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.DragonBall.UpLevelUI, 1, BaseAddLayer.TopUI,true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btnUp.frequencyClickLock = 500; //限制频繁点击
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._type = this.UIOpenData.customObject;
            this.UIPanel.txtName.text = Global.getLangStr("dragonball_msg3", Global.numberToChinese(this._type));  //一星珠
            this.UIPanel.imgIcon.frame = this._type;

            this.refreshLevelView();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnUp.onClick(this, this.onClickUp);
            this.addEventMgr(EventNotify.DragonBall_LevelChange, this, this.onChangeBallLevel);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击升级按钮 */
        private onClickUp(): void
        {
            let level = DragonBallDataMgr.getLevelByType(this._type);
            //判断材料是否足够
            if (level > 0)
            {
                // let needItem = cfg.DragonBallLevelCfgData.getNeedItemInfoByInfo(this._type, level);
                // if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                //     return;
                DragonBallSend.levelup(this._type);
            }
            else
            {
                // let needItem = cfg.DragonBallUnlockCfgData.getNeedItemInfoByType(this._type);
                // if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                //     return;
                DragonBallSend.unLock(this._type);
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }
        private onChangeBallLevel(type: number): void
        {
            if (type != this._type) return;
            this.refreshLevelView();
        }

        /** 刷新等级相关的显示 */
        private refreshLevelView(): void
        {
            let level = DragonBallDataMgr.getLevelByType(this._type);
            let isLock = level <= 0;
            this.UIPanel.txtLevel.text = "Lv." + level;
            //当前属性显示， 未激活时只显示一个属性加成未激活，  有激活时对应显示属性值，最多显示两个。
            //属性是否激活
            if (isLock)
            { //未激活
                this.UIPanel.txtCurAttr.text = Global.getLangStr("dragonball_msg11"); //属性加成未激活
                this.UIPanel.txtCurAttr2.text = "";
            } else
            {
                let addAttrList = cfg.DragonBallLevelCfgData.getAddAttrArrByInfo(this._type, level);
                //第一个属性
                let addAttr = addAttrList[0];
                this.UIPanel.txtCurAttr.text = Global.getFullAttrValueString(addAttr, "+");
                //第二个属性
                addAttr = addAttrList[1];
                if (addAttr)
                {
                    this.UIPanel.txtCurAttr2.text = Global.getFullAttrValueString(addAttr, "+");
                } else
                {
                    this.UIPanel.txtCurAttr2.text = "";
                }
            }

            //下一级属性
            let nextAttrList = cfg.DragonBallLevelCfgData.getAddAttrArrByInfo(this._type, level + 1);
            if (!nextAttrList || nextAttrList.length == 0)
            { //没了，就是满级咯
                this.UIPanel.fullBox.visible = true;
                this.UIPanel.nextUpBox.visible = false;
            } else
            { //有下一级属性显示
                this.UIPanel.fullBox.visible = false;
                this.UIPanel.nextUpBox.visible = true;
                //属性列表
                this.UIPanel.listNextAttr.onRefresh(nextAttrList.length, this, (itemUI: ProUI.DragonBall.ChildView.UpAttrItemUI, index: number) =>
                {
                    let attr = nextAttrList[index];
                    itemUI.imgType.frame = attr.type;
                    itemUI.txtValue.color = "#5d565d";
                    itemUI.txtValue.text = Global.getFullAttrValueString(attr, "  +");
                })

                //七星珠比较特殊，它不能手动升级，显示一个TIPS即可
                let isSevenType = this._type == 7;
                this.UIPanel.tipsSevenNoUp.visible = isSevenType;
                this.UIPanel.btnUp.visible = !isSevenType;
                //激活or升级
                this.UIPanel.txtBtnUpLabel.text = isLock ? Global.getLangStr("ui_Artifact_msg4") : Global.getLangStr("hero_msg6");
                this.UIPanel.needItemBox.visible = !isSevenType;
                if (!isSevenType)
                {  //材料显示
                    let needItem = isLock ?
                        cfg.DragonBallUnlockCfgData.getNeedItemInfoByType(this._type) :
                        cfg.DragonBallLevelCfgData.getNeedItemInfoByInfo(this._type, level);
                    let owenCount = Global.getItemNum(needItem.itemid);
                    Global.setResSmallIconWithItemID(this.UIPanel.imgNeedItemIcon, needItem.itemid);
                    this.UIPanel.txtNeedItemCount.text = Global.numberToTuckString(owenCount) + "/" + Global.numberToTuckString(needItem.itemcount);
                    this.UIPanel.txtNeedItemCount.color = owenCount >= needItem.itemcount ? "#14a52c" : "#e92617";
                    this.UIPanel.reddotUp.visible = owenCount >= needItem.itemcount;
                    this.UIPanel.btnUp.disabled = owenCount < needItem.itemcount;
                }
            }
        }
    }
}