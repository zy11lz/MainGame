module Pro
{
    /**
     * 界面说明： 元素契约主界面
    * @author jason.xu
    */
    export class ConvenantMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Convenant.ConvenantUI;
        //public UIOpenData: BaseOpenUIData;
        /**上一等级 */
        private _level: number;
        /**是否选择属性 */
        private _isChoiceattributA: boolean = true;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('convenant')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Convenant.ConvenantUI, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            for (let i = 0; i < ConvenantDataMgr.ItemNum; i++)
            {
                let btn: component.UIButton = this.UIPanel.itemListBox._children[i]
                btn.onClick(this, () =>
                {
                    ConvenantSingleTips.show(i + 1);
                })
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            ConvenantDataMgr.initFightValue();
            this.refreshFightValue();

            this.refreshStateView();
            for (let i = 1; i <= ConvenantDataMgr.ItemNum; i++)
            {
                this.refreshSingleItem(this.UIPanel.itemListBox._children[i - 1], i);
            }
            this.reddotBind(this.UIPanel.btnTotemsReddot, ActivityDataMgr.reddotModelCommonGrp.getChildModel(11));
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnArtifact.onClick(this, this.onClickArtifact);
            this.UIPanel.btnGo.onClick(this, this.onClickGo);
            this.UIPanel.btnTotemsRecharge.onClick(this, this.onClickDragonGift)
            //选择属性返回 (id, index 1, 2, 3) PBU32U32
            this.addEventMgr(CmdEvent.Convenant_Attr, this, this.onAttr);
            this.addEventMgr(CmdEvent.Convenant_Power, this, this.onPower);
            this.addEventMgr(EventNotify.Convenant_LevelChange, this, this.onLevelChange);
            //属性有变化时播放动画
            this.addEventMgr(EventNotify.Pet_AttrChange, this, this.onPetAttrChange);

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 点击元灵跳转 */
        private onClickArtifact(): void
        {
            this.closeUI();
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ArtifactAllList), BaseBackUIType.CloseQuene);
        }

        /** 点击问号 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "convenant_help");
        }

        private onClickGo(): void
        {
            let level = ConvenantDataMgr.level;
            if (level <= 0)
            {
                //未激活
                let needItems = cfg.ConvenantConstCfgData.getUnlockNeedItemInfoArr();
                if (!Global.isFullAllRes(needItems, true)) return;
                ConvenantSend.unLock();
            } else
            {
                //升级
                let needItems = cfg.ConvenantLevelCfgData.getNeedItemsByLevel(level);
                if (!Global.isFullAllRes(needItems, true)) return;
                ConvenantSend.levelup();
            }
        }

        /** 战斗力变化 */
        private onPower(): void
        {
            Laya.timer.callLater(this, this.refreshFightValue);
        }
        /**升级属性变化 */
        private onPetAttrChange(hero: Net.hero, oldAttr: Pb_God.PBAttrInfo[], newAttr: Pb_God.PBAttrInfo[]): void
        {
            let addAttrList: number[][] = [];
            for (var i = 1; i <= 4; i++)
            {
                let oldValue = Global.getAtterValue(oldAttr, i);
                let newValue = Global.getAtterValue(newAttr, i);
                if (newValue > oldValue)
                {
                    addAttrList.push([i, newValue - oldValue]);
                }
            }
            this.UIPanel.upAttrListUI.show(addAttrList);
        }

        /** 刷新战斗力显示 */
        private refreshFightValue(): void
        {
            let value = 0;
            for (let i = 1; i <= ConvenantDataMgr.ItemNum; i++)
            {
                value += ConvenantDataMgr.getFightValue(i);
            }
            this.UIPanel.txtFightValue.text = value + "";
        }

        /** 等级变更 */
        private onLevelChange(level: number): void
        {
            this.refreshStateView();
            this.UIPanel.tipsBubble.visible = true;
            for (let i = 1; i <= ConvenantDataMgr.ItemNum; i++)
            {
                this.refreshSingleItem(this.UIPanel.itemListBox._children[i - 1], i);
            }
        }

		/*****
		 *选择属性返回 (id, index 1, 2, 3) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
        protected onAttr(value: Pb_God.PBU32U32): void
        {
            let pos = value.key;
            this.refreshSingleItem(this.UIPanel.itemListBox._children[pos - 1], pos);
        }

        /** 刷新激活或升级状态(底部视图) */
        private refreshStateView(): void
        {
            let level = ConvenantDataMgr.level;
            let isActive = level > 0;
            this.UIPanel.bottomTitle.visible = isActive;
            this.UIPanel.unlockTips.visible = !isActive;
            let needItems = [];
            let strTitle = Global.getLangStr("convenant_msg1");
            if (!isActive)
            {
                //未激活
                this.UIPanel.txtBtnLable.text = Global.getLangStr("ui_Artifact_msg4"); //激活
                this.UIPanel.txtBottomTitle.text = Global.getLangStr("convenant_msg3"); //契约激活
                needItems = cfg.ConvenantConstCfgData.getUnlockNeedItemInfoArr();
                this.UIPanel.TipsLb.visible = true;
            } else
            {
                //升级
                this.UIPanel.txtBtnLable.text = Global.getLangStr("artifact_tab1"); //升级
                this.UIPanel.txtBottomTitle.text = Global.getLangStr("convenant_msg2"); //契约升级
                needItems = cfg.ConvenantLevelCfgData.getNeedItemsByLevel(level);
                strTitle += " Lv." + level;
                this.UIPanel.TipsLb.visible = false;
            }
            this.UIPanel.txtTitle.text = strTitle;
            this.UIPanel.btnGo.visible = this.UIPanel.listNeedItems.visible = needItems.length > 0;
            this.UIPanel.fullTag.visible = !this.UIPanel.btnGo.visible;
            this.UIPanel.imgReddotGo.visible = needItems.length > 0 && Global.isFullAllRes(needItems, false);
            if (needItems.length > 0)
            {
                this.UIPanel.listNeedItems.onRefresh(needItems.length, this, (norItem: NorItemUI, index: number) =>
                {
                    norItem.setItemInfo(needItems[index]);
                })
            }
            this.upgradeTips(level);
        }

        /**提升等级提示 */
        private upgradeTips(level: number): void
        {
            if (this._level && this._isChoiceattributA && this._level < level)
            {
                TipsUtils.showTips(Global.getLangStr("convenant_msg8", level));
            }
            this._level = level;

        }

        /** 刷新单个契约之灵item状态 */
        private refreshSingleItem(itemUI: ProUI.Convenant.ItemUI, pos: number): void
        {
            let level = ConvenantDataMgr.level;
            let attrIndex = ConvenantDataMgr.getPartAttrIndex(pos);
            itemUI.icon.frame = pos;
            itemUI.reddot.visible = false;
            //未激活时
            if (level <= 0)
            {
                itemUI.txtName.text = Global.getLangStr("dragonball_msg5"); //未激活
            } else if (attrIndex == 0)
            {
                //已激活未选择属性
                itemUI.reddot.visible = true;
                itemUI.txtName.text = Global.getLangStr("convenant_msg4"); //未选择
            } else
            {
                //已激活， 显示对应属性
                let attr = cfg.ConvenantAttrCfgData.getAttrInfoArrByDoubleKey(pos, level)[attrIndex - 1];
                if (!attr) return;   //异常
                itemUI.txtName.text = Global.getFullAttrValueString(attr, "+");
            }

            if (this.UIPanel.tipsBubble.visible)
            {
                this._isChoiceattributA = this.UIPanel.tipsBubble.visible = itemUI.reddot.visible;
            }


            itemUI.imgNameBg.width = itemUI.txtName.width + 40;
        }

        private onClickDragonGift(btn: component.UIButton): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TimeLimitActivity, 11, 0));
        }
    }
}