module Pro
{
    /**
     * 天界副本胜利结算界面
     */
    export class ChapterBattleResultMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Heavens.PageView.ChapterBattleResultUI;

        /** UI打开参数 */
        public UIOpenData: HeavenBattleResultOpenUIData;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.PageView.ChapterBattleResultUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btnHitDetail.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleFightStatistics, [null, this.UIOpenData.result]));
            });
            this.getDarkUI().graphics.clear();
            this.getDarkUI().graphics.drawRect(0, 0, this.getDarkUI().width,  this.getDarkUI().height, "#2d2629");
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

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            let tempItemNum = this.UIOpenData.ItemList.length;
            let tempPetNum = this.UIOpenData.PetList == null ? 0 : this.UIOpenData.PetList.length;
            this.UIPanel.itemBox.onRefresh(tempItemNum, this, (itemUI: NorItemUI, index: number) =>
            {
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
            SoundMgr.Inst().playSound("get_things");

            let stage_CFG = cfg.HeavenStageCfgData.getInfo(this.UIOpenData.StageIndex);
            let condition_arr = cfg.HeavenStageCfgData.getStarConditionArray(stage_CFG);
            // 标题星星
            for (let i = 0; i < 3; i++)
            {
                let star_idx = i + 1;
                let star_img = this.UIPanel["img_star_Title_" + star_idx] as Laya.Image;
                star_img.gray = star_idx > this.UIOpenData.StarList.length;

                let txt_desc = this.UIPanel["txt_rules_" + star_idx] as component.UILabel;
                txt_desc.text = cfg.HeavenStarConditionCfgData.getDescByIndex(condition_arr[i]);

                // 描述星星
                let sub_star_img = this.UIPanel["img_star_content_" + star_idx] as Laya.Image;
                sub_star_img.gray = this.UIOpenData.StarList.indexOf(i) < 0;
            }
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }
    }
}