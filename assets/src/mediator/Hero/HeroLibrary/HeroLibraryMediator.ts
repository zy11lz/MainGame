
module Pro
{
	/**
	 * 英雄图书馆
	 */
    export class HeroLibraryMediator extends BaseMediator implements IMediator, component.UITableViewDataSource, component.UITableViewDelegate
    {
        /** UI面板 */
        UIPanel: ProUI.Hero.HeroLibrary.Library.MainUI;

        /** 当前各职业伙伴列表 */
        TmpPetDic: ds.StringMap<Array<cfg.PetCfgInfo>>;

        /** 当前各职业伙伴Cell个数 */
        TmpPetCellNumDic: ds.StringMap<number>;

        /** 当前伙伴职业列表 */
        TmpPetJobList: Array<string>;

        /** 当前选择的英雄类型索引 */
        TmpSelectHeroTypeIndex = -1;

        /** 需要移除的card资源 */
        TmpCardSkinAry: Array<string> = [];

        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("herolibrary")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return this.TmpCardSkinAry;
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroLibrary.Library.MainUI, 3);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {

            let tmpPetCfgList = cfg.PetCfgData.getDataList();
            tmpPetCfgList.forEach(elment =>
            {
                this.TmpCardSkinAry.push(Global.getResPetCardSkin(elment.petID));
            });

            this.UIPanel.ItemTableView.setDelegate(this, this);
            this.UIPanel.ItemTableView.setSectionAllIsOn(true);

            this.UIPanel.CloseBtn.onClick(this, this.closeUI);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            this.refreshHeroType();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }

        //------------------------------------------- 英雄类型切换 ---------------------------------------------
        /** 刷新英雄类型 */
        private refreshHeroType()
        {

            this.TmpSelectHeroTypeIndex = -1;

            let startTypeIndex = 0;
            let heroTypeNum = (startTypeIndex == 0 ? 1 : 0) + Pb_God._emPetType.PetType_Moon;
            this.UIPanel.HeroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
            {
                Global.setResPetType(itemUI, startTypeIndex + index);
                itemUI.onClick(this, this.onHeroTypeClick);
                if (this.TmpSelectHeroTypeIndex == -1)
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
            this.TmpSelectHeroTypeIndex = parseInt(btn.name);
            this.refreshHeroTableView();
        }

        //------------------------------------------ 英雄数据列表刷新-------------------------------------------
        private refreshHeroTableView()
        {

            if (this.TmpPetDic == null)
            {
                this.TmpPetDic = new ds.StringMap<Array<cfg.PetCfgInfo>>();
                this.TmpPetCellNumDic = new ds.StringMap<number>();
            }
            else
            {
                this.TmpPetDic.clear();
                this.TmpPetCellNumDic.clear();
            }

            for (let i = 1; i <= 4; i++)
            {
                let tmpCfgList = cfg.PetCfgData.getInfoWithFun(this.TmpSelectHeroTypeIndex == 0 ? null : this.TmpSelectHeroTypeIndex, i);
                if (tmpCfgList.length > 0)
                {
                    this.TmpPetDic.put(i, tmpCfgList);

                    let tmpCellsNum = Math.ceil(tmpCfgList.length / 3);
                    this.TmpPetCellNumDic.put(i, tmpCellsNum);

                }
            }
            this.TmpPetJobList = this.TmpPetDic.getKeys();

            this.UIPanel.ItemTableView.reloadData();
            this.UIPanel.ItemTableView.getScrollBar().rollAccel = 140;
        }

        private onHeroCardClick(petID: number)
        {
            let tmpPetResID = cfg.PetCfgData.getSkinInfoByPetID(petID);
            let tmpBigCardSkin = cfg.PetSkinCfgData.getHaveVDrawById(petID);
            if (tmpBigCardSkin == 1)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroLibraryDetail, petID), BaseBackUIType.HideBackUI);
            }
            else
            {

                TipsUtils.showTipsByLanId("hero_msg27");
                let heroBookCfgInfo = cfg.PetBookCfgData.getLibrayShowPetInfo(petID);
                if (!heroBookCfgInfo) return;
                let openUIData = new HeroDetailOpenUIData();
                openUIData.isTujian = true;
                openUIData.heroBookCfgInfo = heroBookCfgInfo;
                UIManager.Inst.forceOpen(openUIData, BaseBackUIType.HideBackUI);
            }
        }

        //------------------------------------------- 控制视图绘制 ---------------------------------------------
        /** 获取 Cell 高度，未设置则使用默认高度 */
        tabelView_heightForRowAtIndexPath(tableView: component.UITableView, indexPath: component.UIIndexPath): number
        {
            return 347;
        }
        /** 获取当前段落头部的高度 */
        tabelView_heightForHeaderInSection(tableView: component.UITableView, section: number): number
        {
            return 67;
        }
        /** 获取当前段落底部的高度 */
        tabelView_heightForFooterInSection(tableView: component.UITableView, section: number): number
        {
            if (section == this.TmpPetJobList.length - 1)
            {
                return 0;
            }
            return 15;
        }

        //--------------------------------------------控制视图数据---------------------------------------
        /** 获取段落总个数 */
        tabelView_numberOfSectionsInTableView(tableView: component.UITableView): number
        {
            return this.TmpPetJobList.length;
        }

        /** 获取当前段落Cell的个数 */
        tabelView_numberOfRowsInSection(tableView: component.UITableView, section: number): number
        {
            let tmpPetJob = this.TmpPetJobList[section];
            return this.TmpPetCellNumDic.get(tmpPetJob);
        }

        /** 刷新一个当前段落CellItem */
        tabelView_cellForRowWithRender(tableView: component.UITableView, indexPath: component.UIIndexPath, itemUI: ProUI.Hero.HeroLibrary.Library.TableItem.CellUI): void
        {

            let tmpPetJob = this.TmpPetJobList[indexPath.section];
            let tmpPetList = this.TmpPetDic.get(tmpPetJob);
            let tmpCellMaxNum = tmpPetList.length;

            let tmpNeedItemNum = 3;
            if ((indexPath.row + 1) * 3 > tmpCellMaxNum)
            {
                tmpNeedItemNum = tmpCellMaxNum - indexPath.row * 3;
            }
            for (let i = 0; i < 3; i++)
            {
                let tmpCardUI = itemUI.getChildAt(i) as ProUI.Hero.HeroLibrary.Library.PetCardItemUI;
                tmpCardUI.visible = i < tmpNeedItemNum;
                if (tmpCardUI.visible)
                {
                    let tmpInfo = tmpPetList[indexPath.row * 3 + i];
                    Global.setResPetGroupType(tmpCardUI.frameJobType, parseInt(tmpPetJob));
                    Global.setResPetType(tmpCardUI.PetTypeImg, tmpInfo.petType);
                    let tmpNewCardUrl = Global.getResPetCardSkin(tmpInfo.petID);
                    if (tmpCardUI.skin.length > 0 && tmpCardUI.skin != tmpNewCardUrl)
                    {
                        ResMgr.Inst.unloadWithUrl(tmpCardUI.skin);
                    }
                    tmpCardUI.PetNameLb.text = cfg.PetSkinCfgData.getFileNameById(tmpInfo.baseSkin);
                    tmpCardUI.skin = tmpNewCardUrl;
                    tmpCardUI.PetNameBox.refresh();
                    tmpCardUI.onClick(this, () => { this.onHeroCardClick(tmpInfo.petID); });
                }
            }

        }

        /** 刷新一个当前段落头部Item */
        tabelView_cellForHeadWithRender(tableView: component.UITableView, section: number, itemUI: ProUI.Hero.HeroLibrary.Library.TableItem.HeadUI): void
        {
            let tmpPetJob = parseInt(this.TmpPetJobList[section]);
            Global.setResPetGroupType(itemUI.frameJobType, tmpPetJob);
            itemUI.PetNameLb.text = Global.getResPetJobTypeName(tmpPetJob);
        }

        /** 刷新一个当前段落尾部Item */
        tabelView_cellForFootWithRender(tableView: component.UITableView, section: number, itemUI: ProUI.Hero.HeroLibrary.Library.TableItem.FootUI): void
        {

        }
    }
}