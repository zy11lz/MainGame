module Pro
{
    /**
    *  共鸣
    */
    export class HeroResonanceSelectMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Hero.HeroResonance.HeroResonanceSelectUI;


        private _selectPet: Net.hero;
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroResonance.HeroResonanceSelectUI, 0, BaseAddLayer.TopUI, true);
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
            this._selectPet = null;
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnStage.onClick(this, () =>
            {
                if (!this._selectPet)
                    return;
                ResonanceSend.placeGrid(this.UIOpenData.customObject, this.UIOpenData.customObject2, this._selectPet.sn)
                this.closeUI();
            })
        }

        public closeUI()
        {
            super.closeUI();
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let iType = this.UIOpenData.customObject;

            if (iType == Pb_God._emResonanceType.Resonance_Type_Level)
            {
                //等级
                let cantPutPets = ResonanceDataMgr.getInfoByType(iType).petlist.concat(ResonanceDataMgr.getGridsPetByType(iType));
                let allPets = PetDataMgr.getPetList();
                let canPutPets = allPets.filter(element =>
                    //这里不能用indexOf因为引用不同  要用equals
                    cantPutPets.filter(e =>
                        e.equals(element.sn)
                    ).length == 0
                );

                this.UIPanel.list.onRefresh(canPutPets.length, this, (itemUI: Pro.NorItemUI, index: number) =>
                {
                    itemUI.setPetInfo(canPutPets[index]);
                    let selectFlag = itemUI.getChildByName("selectFlag") as Laya.Image;
                    selectFlag.visible = this._selectPet && this._selectPet.sn == canPutPets[index].sn;
                    let frameImg = itemUI.getChildByName("stateFrame") as component.UIFrameImage;
                    frameImg.visible = false;
                    itemUI.onClick(this, () =>
                    {
                        this._selectPet = canPutPets[index];
                        this.UIPanel.list.refresh();
                    })
                })
            }
            else if (iType == Pb_God._emResonanceType.Resonance_Type_Star)
            {
                let cantPutPets = ResonanceDataMgr.getInfoByType(iType).petlist.concat(ResonanceDataMgr.getGridsPetByType(iType));

                //最小星级
                let minStar = PetDataMgr.getPetInfo(ResonanceDataMgr.getMinStarPet()).star;

                let allPets = PetDataMgr.getPetList().filter(element => element.star < minStar && element.star >= cfg.ResonanceCommonCfgData.getFirstInfo().upMinStar);
                let canPutPets = allPets.filter(element =>
                    //这里不能用indexOf因为引用不同  要用equals
                    cantPutPets.filter(e =>
                        e.equals(element.sn)
                    ).length == 0
                );

                canPutPets.sort((a, b) =>
                {
                    if((a.isDefend||a.isFight) != (b.isDefend||b.isFight))
                    {
                        return (a.isDefend||a.isFight)?1:-1
                    }
                })

                this.UIPanel.list.onRefresh(canPutPets.length, this, (itemUI: Pro.NorItemUI, index: number) =>
                {
                    let petInfo = canPutPets[index]
                    itemUI.setPetInfo(petInfo);
                    itemUI.IconImg.gray = petInfo.isDefend || petInfo.isFight;
                    let selectFlag = itemUI.getChildByName("selectFlag") as Laya.Image;
                    selectFlag.visible = this._selectPet && this._selectPet.sn == petInfo.sn;
                    let frameImg = itemUI.getChildByName("stateFrame") as component.UIFrameImage;

                    if (petInfo.getState(Pb_God._emPetStateType.PetStateType_Defend))
                    {
                        frameImg.frame = 2;
                    }
                    else if (petInfo.getState(Pb_God._emPetStateType.PetStateType_Fight))
                    {
                        frameImg.frame = 1;
                    }
                    else
                        frameImg.frame = 0;

                    itemUI.onClick(this, () =>
                    {
                        if (itemUI.IconImg.gray)
                        {
                            TipsUtils.showTipsByLanId("resonance_msg10");
                            return;
                        }
                        this._selectPet = petInfo;
                        this.UIPanel.list.refresh();
                    })
                })
            }
        }

    }


}