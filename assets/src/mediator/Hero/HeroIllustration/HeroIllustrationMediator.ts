
module Pro
{
	/**
	 * 图鉴
	 */
    export class HeroIllustrationMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        UIPanel: ProUI.Hero.HeroIllustration.MainUI;
        /** 当前选择的英雄类型索引 */
        private _tmpSelectHeroTypeIndex = 0;
        /** 图鉴的英雄列表 */
        private _tmpSystemHeroList: Array<cfg.PetSkinCfgInfo>;

        /**第一个可以放置的精灵 */
        private _firstCanUpIdx: number = 0;

        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("heroIllustration")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return null;
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroIllustration.MainUI, 0, 1, false, 2);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this.closePanel();
            IllustrationDataMgr.reddotModel.cleanUp();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            this.adjustScreenPos();
            let startTypeIndex = 0;
            let heroTypeNum = 1 + Pb_God._emPetType.PetType_Moon;
            this.UIPanel.HeroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
            {
                Global.setResPetType(itemUI, startTypeIndex + index);
                itemUI.onClick(this, this.onHeroTypeClick);

                if (index == 0)
                {
                    this.onHeroTypeClick(itemUI);
                }
            });
        }

        /** 选择一个英雄类型 */
        private onHeroTypeClick(btn: component.UIButton)
        {
            this.UIPanel.HeroTypeSelectImg.x = btn.x;
            this.UIPanel.HeroTypeSelectImg.y = btn.y;
            this._tmpSelectHeroTypeIndex = parseInt(btn.name);
            this.refreshHeroList();
        }

        /** 刷新英雄列表 */
        private refreshHeroList()
        {
            this._tmpSystemHeroList = cfg.PetSkinCfgData.getBookMarkListByType(this._tmpSelectHeroTypeIndex);
            this.sortSystemHeroList();
            this.UIPanel.list.onRefresh(this._tmpSystemHeroList.length, this, this.onSysHeroItemRender);

            this.UIPanel.activeLbl.text = Global.getLangStr("hero_illustration_active", IllustrationDataMgr.getAllOnHero().length, this._tmpSystemHeroList.length);
        }

        /** 系统英雄刷新 */
        private onSysHeroItemRender(item: ProUI.Hero.HeroIllustration.ListItemUI, index: number)
        {
            Laya.Tween.clearAll(item.flagImg);
            let tmpHeroInfo = this._tmpSystemHeroList[index];
            Global.setResCard(item.icon, tmpHeroInfo.card)
            Global.setPetType(item.petTypeIcon, cfg.PetCfgData.getPetTypeByPetID(tmpHeroInfo.petID));
            item.nameLbl.text = cfg.PetSkinCfgData.getFileNameById(tmpHeroInfo.id);
            item.on(LayaEvent.CLICK, this, this.onItemClick, [index]);

            let onHero = IllustrationDataMgr.getOnHero(tmpHeroInfo.id)

            item.flagImg.alpha = item.blackMask.alpha = 1;
            Laya.Tween.clearAll(item.flagImg);
            Laya.Tween.clearAll(item.blackMask);
            //图鉴背包没有 说明这个皮肤是空的 要黑化+标签 >>>
            if (!onHero)
            {
                item.flagImg.visible = item.blackMask.visible = true;
                if (PetDataMgr.getPetListBySkinId(tmpHeroInfo.id).length > 0)
                {
                    //可放置
                    item.flagImg.frame = 2;
                    this.onAlphaIn(item.flagImg);
                    this.onAlphaIn(item.blackMask);
                }
                else
                {
                    //未放置
                    item.flagImg.frame = 1;
                }
                Global.setIllustrationCardQuWithNum(item.colorBg, tmpHeroInfo.star - 1);
                Global.setColorWithNum(item.nameLbl, tmpHeroInfo.star - 1);
            }
            else
            {
                item.flagImg.visible = item.blackMask.visible = false;

                //有放置  需要显示背景颜色>>>
                Global.setIllustrationCardQuWithNum(item.colorBg, onHero.star - 1);
                Global.setColorWithNum(item.nameLbl, onHero.star - 1);
            }

        }

        private onItemClick(index)
        {
            let skinId = this._tmpSystemHeroList[index].id;
            //判断是否有上阵了 上阵了就下阵 没上阵就上阵 >>>
            let onHero = IllustrationDataMgr.getOnHero(skinId);
            if (onHero)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroIllustration_DownPet, onHero.sn));
            }
            else
            {
                //判断是否可以放置 不能放置的就别打开界面了
                if (PetDataMgr.getPetListBySkinId(skinId).length <= 0) 
                {
                    TipsUtils.showTipsByLanId("tips_msg74");
                    return;
                }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroIllustration_UpPet, skinId));
            }
        }

        /**
         * 排序规则
         */
        private sortSystemHeroList(): void
        {
            this._tmpSystemHeroList.sort((a, b) =>
            {
                let canUpA = !IllustrationDataMgr.getOnHero(a.id) && PetDataMgr.getPetListBySkinId(a.id).length > 0
                let canUpB = !IllustrationDataMgr.getOnHero(b.id) && PetDataMgr.getPetListBySkinId(b.id).length > 0
                if (canUpA != canUpB)
                {
                    return canUpA ? -1 : 1
                }
            })
        }

        private onAttrBtnClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroIllustration_Attr))
        }

        private onAchieveBtnClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroIllustration_Achieve));
        }

        private onTrammelBtnClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroIllustration_Trammel));
        }

        private adjustScreenPos()
        {
            this.UIPanel.height = GameConfig.curHeight();
            this.UIPanel.y = 0;
            this.setUIBG(UrlMgr.getUnpackUrl("heroIllustration/tujian_bg.jpg"));
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.UIPanel.attrBtn.on(LayaEvent.CLICK, this, this.onAttrBtnClick);
            this.UIPanel.achieveBtn.on(LayaEvent.CLICK, this, this.onAchieveBtnClick);
            this.UIPanel.trammelBtn.on(LayaEvent.CLICK, this, this.onTrammelBtnClick);
            this.UIPanel.helpBtn.on(Laya.Event.CLICK, this, this.onHelpBtnClick);
            this.addEventMgr(CmdEvent.Illustration_Freash, this, this.updateView);
        }

        private onHelpBtnClick()
        {
            CommonHelpView.show(this.UIPanel.helpBtn, Global.getLangStr("illustration_desc"));
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            this.reddotBind(this.UIPanel.attrRedDot, IllustrationDataMgr.attrRedDotModel);
            this.reddotBind(this.UIPanel.achieveRedDot, IllustrationDataMgr.achieveRedDotModel);

            this.refreshHeroList();

            Laya.timer.frameOnce(3, this, () =>
            {
                this.UIPanel.list.scrollTo(this._tmpSystemHeroList.indexOf(IllustrationDataMgr.getFirstCanUpHero()));
            })
        }

        /**== 呼吸 */
        private onTween3(itemUI: any): void
        {
            Laya.Tween.to(itemUI, { y: itemUI.y - 5, ease: Laya.Ease.backOut, scaleX: 1.15, scaleY: 1.15 }, 1000, Laya.Ease.linearOut, Laya.Handler.create(this, this.onTween4, [itemUI]));
        }

        private onTween4(itemUI: any): void
        {
            Laya.Tween.to(itemUI, { y: itemUI.y + 5, scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.linearOut, Laya.Handler.create(this, this.onTween3, [itemUI]));
        }

        private onAlphaIn(itemUI: any): void
        {
            Laya.Tween.to(itemUI, { alpha: 0, ease: Laya.Ease.backOut }, 1000, Laya.Ease.linearOut, Laya.Handler.create(this, this.onAlphaOut, [itemUI]));
        }

        private onAlphaOut(itemUI: any): void
        {
            Laya.Tween.to(itemUI, { alpha: 1 }, 1000, Laya.Ease.linearOut, Laya.Handler.create(this, this.onAlphaIn, [itemUI]));
        }

        private updateView()
        {
            this.refreshHeroList();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }

    }
}