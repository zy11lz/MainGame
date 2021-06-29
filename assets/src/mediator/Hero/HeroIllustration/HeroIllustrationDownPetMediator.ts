
module Pro
{
	/**
	 * 图鉴撤下
	 */
    export class HeroIllustrationDownPetMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        UIPanel: ProUI.Hero.HeroIllustration.DownPetUI;

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
            this.showPanel(ProUI.Hero.HeroIllustration.DownPetUI, 1, BaseAddLayer.TopUI, true);
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
            this.UIPanel.downBtn.onClick(this, () =>
            {
                let hero = IllustrationDataMgr.getHadOnHero(this.UIOpenData.customObject);
                if (hero)
                {
                    //可能网络卡 第一次卸下没有成功 第二次打开的时候服务端数据下发了 hero就为空了 这里加个判空
                    IllustrationSend.removePetAsk(hero.useskinid);
                }
                this.closeUI();
            })
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            let hero = IllustrationDataMgr.getHadOnHero(this.UIOpenData.customObject);
            let skinId = hero.useskinid
            let skinInfo = cfg.PetSkinCfgData.getInfo(skinId);
            let card = this.UIPanel.card;
            Global.setResCard(card.icon, skinId);
            Global.setPetType(card.petTypeIcon, cfg.PetSkinCfgData.getPetTypeBySkinId(skinId));
            card.nameLbl.text = skinInfo.fileName;
            Global.setIllustrationCardQuWithNum(card.colorBg, skinInfo.star - 1)
            card.flagImg.visible = false;
            card.blackMask.visible = false;

            let addAttr = cfg.PetSkinCfgData.getAddAttrAryWithId(hero.id, hero.evolve);
            let str = "";
            addAttr.forEach(element =>
            {
                str += cfg.BattleCfgData.getDescByAttrType(element.type) + "+" + element.value + " ";
            })
            this.UIPanel.attrLbl.text = str;

        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }
    }
}