
module Pro
{
	/**
	 * 图鉴成就
	 */
    export class HeroIllustrationAchieveMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        UIPanel: ProUI.Hero.HeroIllustration.AchieveUI;

        private _cfgList: Array<cfg.IllustrationAchieveCfgInfo>;

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
            this.showPanel(ProUI.Hero.HeroIllustration.AchieveUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.UIPanel.closeBtn.onClick(this, this.closeUI);
            this.addEventMgr(CmdEvent.Achieve_IllustrationComplete, this, this.initUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            this._cfgList = cfg.IllustrationAchieveCfgData.getAllList();
            this.sortList();
            this.UIPanel.list.onRefresh(this._cfgList.length, this, this.onListItemRender)
        }

        private sortList()
        {
            // this._cfgList.sort();
            this._cfgList.sort((a, b) =>
            {
                let hasGotA = IllustrationDataMgr.checkIllustrationAchieveHaveGot(a.id);
                let hasGotB = IllustrationDataMgr.checkIllustrationAchieveHaveGot(b.id);
                if (hasGotA == hasGotB)
                    return a.id - b.id;
                return hasGotA ? 1 : -1
            })
        }

        private onListItemRender(cell: ProUI.Hero.HeroIllustration.AchieveItemUI, index: number)
        {
            let info = this._cfgList[index];
            cell.NameLb.text = info.desc;
            let addItems = cfg.IllustrationAchieveCfgData.getAddItemAryById(info.id);
            cell.RewardBox.onRefresh(addItems.length, this, (item: NorItemUI, itemIndex: number) =>
            {
                item.setItemInfo(addItems[itemIndex]);
            })

            if (IllustrationDataMgr.checkIllustrationAchieveHaveGot(info.id))
            {
                //已领取
                cell.FinishImg.visible = true;
                cell.RewardBtn.visible = cell.GoBtn.visible = cell.ProgressInfo.visible = false;
            }
            else
            {
                if (IllustrationDataMgr.checkIllustrationAchieveCanGet(info.id))
                {
                    //可领取
                    cell.FinishImg.visible = cell.GoBtn.visible = false;
                    cell.RewardBtn.visible = cell.ProgressInfo.visible = true;
                    cell.RewardBtn.onClick(this, () =>
                    {
                        AchieveSend.illustrationComplete(info.id);
                    })
                }
                else
                {
                    cell.FinishImg.visible = cell.RewardBtn.visible = false;
                    cell.GoBtn.visible = cell.ProgressInfo.visible = true;
                    cell.GoBtn.onClick(this, () =>
                    {
                        this.closeUI();
                    });
                }
            }

            if (cell.ProgressInfo.visible)
            {
                let achieveData = IllustrationDataMgr.getIllustrationAchieveData(info.id);
                let condition = cfg.IllustrationAchieveCfgData.getValueById(info.id);
                Global.setProgressBar(cell.ProgressImg, achieveData.value / condition, 150);
                cell.ProgressLb.text = `${ achieveData.value }/${ condition }`;
            }

        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }
    }
}