
module Pro
{
	/**
	 * 图鉴嵌入
	 */
    export class HeroIllustrationUpPetMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        UIPanel: ProUI.Hero.HeroIllustration.UpPetUI;

        private _petList: Net.hero[];

        private _selectPet: Net.hero;

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
            this.showPanel(ProUI.Hero.HeroIllustration.UpPetUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this._selectPet = null;
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.UIPanel.upBtn.onClick(this, this.onUpBtnClick);
            this.UIPanel.closeBtn.onClick(this, this.closeUI);
        }

        private onUpBtnClick()
        {
            if (!this._selectPet)
            {
                return;
            }
            IllustrationSend.addPetAsk(this._selectPet.sn);
            this.closeUI();
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            let skinId = this.UIOpenData.customObject;
            let skinInfo = cfg.PetSkinCfgData.getInfo(skinId);
            let card = this.UIPanel.card;
            Global.setResCard(card.icon, skinId);
            Global.setPetType(card.petTypeIcon, cfg.PetSkinCfgData.getPetTypeBySkinId(skinId));
            card.nameLbl.text = skinInfo.fileName;
            Global.setIllustrationCardQuWithNum(card.colorBg, skinInfo.star - 1)
            card.flagImg.visible = false;


            this.UIPanel.attrLbl.text = "";

            this._petList = PetDataMgr.getPetListBySkinId(skinId);
            this.sortList(this._petList);
            // this.UIPanel.list.selectEnable = true;
            // this.UIPanel.list.selectedIndex = 0;
            // this.UIPanel.list.selectHandler = Laya.Handler.create(this, this.onSelectHandler, null, false);

            this.UIPanel.list.onRefresh(this._petList.length, this, this.onCellRender);

            //默认获取第一个可以选中的精灵
            this.selectDefault();

        }

        private selectDefault()
        {
            for(let i = 0 ; i < this._petList.length ; i++)
            {
                let petInfo = this._petList[i];
                if(petInfo.level <=1 && !petInfo.onStore)
                {
                    this._selectPet = petInfo;
                    break;
                }
            }
            this.UIPanel.list.refresh();
        }
        
        private sortList(list: Array<Net.hero>)
        {

        }

        private onCellRender(itemUI: NorItemUI, index: number)
        {
            let petInfo = this._petList[index]
            let teamType = PetDataMgr.refreshPetOnStore(petInfo);
            itemUI.setPetInfo(petInfo);

            let lockBol=petInfo.onStore || petInfo.islock||petInfo.isDefend
            itemUI.setLockImgVisible(lockBol,petInfo)
            itemUI.IconImg.gray = lockBol;

            itemUI.onClick(this, () =>
            {
                if(petInfo.isDefend){
                    TipsUtils.showTipsByLanId("HeroDefendMsg14");  
                }
                else if (petInfo.level > 1)
                    TipsUtils.showTipsByLanId("hero_illustration_msg1");
                else if (teamType > -1)
                {
                    TipsUtils.showTipsByLanId("hero_illustration_msg2", Global.getLangStr(`zhenfatype_name_${ teamType }`))
                }
                else
                {
                    itemUI.SelectStatueImg.visible = true;
                    (this._selectPet = petInfo) && this.updateSelectView();
                    this.UIPanel.list.refresh();
                }
            })

            itemUI.SelectStatueImg.visible = this._selectPet == petInfo




            //不用selectIndex
            // let isSelect = this.UIPanel.list.selectedIndex == index;
            // itemUI.SelectStatueImg.visible = isSelect;
            // isSelect && (this._selectPet = petInfo) && this.updateSelectView();
        }

        private updateSelectView()
        {
            let addAttr = cfg.PetSkinCfgData.getAddAttrAryWithId(this._selectPet.id, this._selectPet.evolve);
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