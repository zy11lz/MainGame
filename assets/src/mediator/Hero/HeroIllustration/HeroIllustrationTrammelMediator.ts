
module Pro
{
	/**
	 * 图鉴成就
	 */
    export class HeroIllustrationTrammelMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        UIPanel: ProUI.Hero.HeroIllustration.TrammelUI;

        private _cfgList: Array<cfg.IllustrationTrammelCfgInfo>;

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
            this.showPanel(ProUI.Hero.HeroIllustration.TrammelUI, 1, BaseAddLayer.TopUI, true);
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
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            this._cfgList = cfg.IllustrationTrammelCfgData.getAllList();
            this.UIPanel.list.onRefresh(this._cfgList.length, this, this.onListItemRender)
        }

        private sortList()
        {
            // this._cfgList.sort();
        }

        private onListItemRender(cell: ProUI.Hero.HeroIllustration.TrammelItemUI, index: number)
        {
            let info = this._cfgList[index];
            cell.AttrLbl.text = "";

            cell.nameLbl.text = cfg.IllustrationTrammelCfgData.getCombinationtitleById(info.id);

            let addAttr = cfg.IllustrationTrammelCfgData.getAddAttrAryWithId(info.id);
            let str = "";
            addAttr.forEach(element =>
            {
                str += cfg.BattleCfgData.getDescByAttrType(element.type) + "+" + element.value + " ";
            })
            cell.AttrLbl.text = str;
            cell.AttrLbl.x = cell.nameLbl.x + cell.nameLbl.width + 10;
            cell.activeLbl.x = cell.AttrLbl.x + cell.AttrLbl.width + 10;

            let skins = cfg.IllustrationTrammelCfgData.getNeedSkinsAryById(info.id);

            let isActive = IllustrationDataMgr.checkTrammelIsActive(info.id);

            if (isActive)
            {
                cell.activeLbl.color = "#34dd28";
                cell.activeLbl.text = Global.getLangStr("sail_msg2");
            }
            else
            {
                cell.activeLbl.color = "#8d848d";
                cell.activeLbl.text = Global.getLangStr("sail_msg1");
            }

            cell.RewardBox.onRefresh(skins.length, this, (box: Laya.Box, itemIndex: number) =>
            {
                let item = box.getChildByName("item") as NorItemUI;
                let black = box.getChildByName("black") as Laya.Image;
                item.setPetUI(skins[itemIndex], cfg.PetSkinCfgData.getStarById(skins[itemIndex]));
                black.visible = !IllustrationDataMgr.getOnHero(skins[itemIndex]);
            })
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }
    }
}