module Pro {
    export class HeroDefendLocationSetMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.Hero.HeroDefend.HeroDefendLocationSetViewUI;


        /** 当前选择的英雄类型索引 */
        private TmpSelectHeroTypeIndex = 0;

        private storePos: Net.hero[];

        private _plan: Pb_God.PBDefendPlan;
        /**英雄列表*/
        public pets: Pb_God.PBDefendPetSlot[];
        public skills: Pb_God.PBDefendPetSlot[];
        /** 当前已解锁的英雄 */
        public heros: Array<Net.hero>;
        /** 已上阵的英雄列表map（方便查询） */
        private _fightHeroIdMap = new ds.StringMap<boolean>();

        /**0用当前的方案 */
        private _currentPlanIndex:number;


        public constructor() {
            super();


        }


        public autoLoadAtlas(): Array<any> {
            return [];
        }
        public openUI(): void {
            this._currentPlanIndex=this.UIOpenData.customObject;
            this.showPanel(ProUI.Hero.HeroDefend.HeroDefendLocationSetViewUI, 1, BaseAddLayer.TopUI, true);



        }
        public closeUI(): void {
            this.closePanel();
        }
        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void {

        }
        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void {
            this.UIPanel.btn_close.onClick(this, this.closeUI);
            this.UIPanel.btn_save.onClick(this, this.onBtnSaveClick);
            this.UIPanel.btn_plan.onClick(this, this.onBtnPlanClick);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void {

        }
        /**
         * 初始化面板ui
         */
        public initUI(): void {

            this.UIPanel.HeroDragEff.showNameBol = false;

            if(this._currentPlanIndex){
                this.UIPanel.btn_plan.visible=false;
                this.UIPanel.btn_save.x=376;
            }else{
                this._currentPlanIndex=DefendDataMgr.planIndex;
                this.UIPanel.btn_plan.visible=true;
                this.UIPanel.btn_save.x=516;
            }

            this._plan = DefendDataMgr.getPlanByIndex(this._currentPlanIndex);


            
            this.pets = this._plan.pets;

            this.storePos = [null, null, null, null];
            this._fightHeroIdMap.clear();

            this.heros=null;
            let tempHeros = []
            for (let i = 0; i < this.pets.length; i++) {
                let pet = this.pets[i];
                let hero = PetDataMgr.getPetInfo(pet.petSnID);
                tempHeros.push(hero);
                this.storePos[pet.index - 1] = hero;
                this._fightHeroIdMap.put(hero.id, true);
                this.heros=PetDataMgr.getDefendUsedHeroArr2(hero,this.heros);
            }
            if(!this.heros){
                this.heros=PetDataMgr.getDefendPetList2().concat(PetDataMgr.getDefendFightList());
            }
            this.heros = tempHeros.concat(this.heros);


            this.refreshPetsLayer();
            this.refreshOnStoreList();


        }

        onBtnSaveClick() {
            this.pets = [];
            for (let i = 0; i < this.storePos.length; i++) {
                let hero = this.storePos[i];
                if (hero) {
                    let pet = new Pb_God.PBDefendPetSlot();
                    pet.index = i + 1;
                    pet.petSnID = hero.sn;
                    this.pets.push(pet);
                }
            }
            DefendSend.savePlan(this._currentPlanIndex, this.pets, this.pets);
            this.closeUI();

        }
        onBtnPlanClick() {
            this.closeUI();
            UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendPlan));
        }



        /** 刷新当前拥有的角色状态 */
        private refreshPetsLayer() {
            for (let hero of this.heros) {
                //刷新上阵状态
                hero.onStore = this.isOnStoreIndex(hero.sn);
            }
            this.UIPanel.HeroList.onRefresh(this.heros.length, this, this.onHeroListRender);
        }

        /** 获取伙伴在阵法中的坐标索引
         * @param  supportPlayerId 支援英雄的好友Id
         */
        public isOnStoreIndex(snid: Long): boolean {
            for (let i = 0; i < this.storePos.length; i++) {
                let el = this.storePos[i];
                if (el != null) {
                    if (el.sn.equals(snid)) return true;
                }
            }
            return false;
        }
        /** 刷新状态 */
        private onHeroListRender(item: NorItemUI, index: number): void {
            let tmpHeroInfo = this.heros[index] as Net.hero;
            item.setPetInfo(tmpHeroInfo, false);
            item.SelectStatueImg.visible = tmpHeroInfo.onStore;
            item.setLockImgVisible(tmpHeroInfo.isFight,tmpHeroInfo);
            item.name = index.toString();
            item.onHold(this, this.onHeroListSelect);

        }
        /** 选择英雄列表的目标 */
        private onHeroListSelect(item: NorItemUI, statue: boolean) {
            let index = parseInt(item.name);
            let tempPetInfo = this.heros[index];
            //开始长按
            if (statue == true) {
                //if (!tempPetInfo.supportMePlayerId) { CommonSend.queryPetView(PlayerDataMgr.uid, PlayerDataMgr.worldid, tempPetInfo.sn, 0, 0); }
                return;
            }//取消长按
            else if (statue == false) {
                return;
            }

            if(tempPetInfo.isFight){
                let infoArr:Pro.Net.BuZhenInfo[]=EmbattleDataMgr.getBuZhenInfoBySn(tempPetInfo.sn);
                let str:string=Global.getLangStr("ZhenfaType"+infoArr[0].getTeamType());
                // for(let i=0;i<infoArr.length;i++){
                //     let info=infoArr[i];
                //     if(i)str+="、"
                //     str+=Global.getLangStr("ZhenfaType"+info.getTeamType());
                // }
                str=Global.getLangStr("HeroDefendMsg15",str);
                TipsUtils.showTipsByLanId(str);
                return;
            }


            if (tempPetInfo.onStore) {
                this.refreshStorePos(tempPetInfo, false);

            } else {

                if (this._fightHeroIdMap.get(tempPetInfo.id)) {
                    TipsUtils.showTipsByLanId("tips_msg45");
                    return;
                }



                this.refreshStorePos(tempPetInfo, true);
            }

            this.refreshOnStoreList();
            this.refreshPetsLayer();
        }

        refreshStorePos(tempPetInfo: Net.hero, storeBol: boolean) {
            let findBol: boolean = false;
            for (let i = 0; i < this.storePos.length; i++) {
                if (this.storePos[i] == tempPetInfo) {
                    findBol = true;
                    if (!storeBol) {
                        this.storePos[i] = null;
                        this._fightHeroIdMap.remove(tempPetInfo.id);
                    }
                    break;
                }
            }
            if (!findBol && storeBol) {
                for (let i = 0; i < this.storePos.length; i++) {
                    if (!this.storePos[i]) {
                        let info = cfg.DefendSlotCfgData.getInfo(i + 1);
                        let isOpen: boolean = DefendDataMgr.rank >= info.rank && DefendDataMgr.level >= info.level;
                        //卡槽已经开启
                        if (isOpen) {
                            this.storePos[i] = tempPetInfo;
                            this._fightHeroIdMap.put(tempPetInfo.id, true);
                        }else{
                            TipsUtils.showTipsByLanId("HeroDefendMsg10");
                        }
                        break;
                    }
                }
            }
        }

        /** 刷新上阵列表 */
        private refreshOnStoreList() {
            this.UIPanel.HeroOnStory.onRefresh(4, this, (item: HeroDefendLocationSetItem, index: number) => {
                //重新命名
                item.name = index.toString();
                //是否上阵角色
                let tempPosInfo = this.storePos[index];
                let tempStored = tempPosInfo != null;

                //图标显示
                let tmpHeroInfo: Net.hero = this.storePos[index];
                item.setData(index, tmpHeroInfo);

                //是否可以拖动
                item.onClick(this, tempStored ? this.onBattleListSelect : null, tempStored, this.UIPanel.HeroDragEff);
            });



        }
        /** 选择上阵列表的目标 */
        //============================todo songjie
        private onBattleListSelect(item: ProUI.Utils.SkillItemUI, isDrag: boolean) {
            let index = parseInt(item.name);

            //开始拖拽
            if (isDrag == true) {
                let tmpHeroInfo: Net.hero = this.storePos[index];
                this.startDragForItem(tmpHeroInfo, item.parent as HeroDefendLocationSetItem);
                this.controlOnStoreEffect(true);
            }//拖拽结束
            else if (isDrag == false) {
                //结束拖拽
                this.endDragForItem();

                //当前选择的阵法

                //交换位置
                let tmpSel = this.dragEffMove_Called(false);
                if (tmpSel >= 0 && tmpSel != index) {
                    this.exChangeStore(tmpSel, index);
                }
                else if (tmpSel == -1) {
                    this.removeStoreByIndex(index);
                }
                this.refreshOnStoreList();
                this.refreshPetsLayer();
                this.controlOnStoreEffect(false);
            }//点击事件
            else {

                this.removeStoreByIndex(index);

                this.refreshOnStoreList();
                this.refreshPetsLayer();
                this.controlOnStoreEffect(false);
            }


        }
        /** 交换上阵英雄位置 */
        public exChangeStore(oldIndex: number, NewIndex: number) {
            let tempV = this.storePos[NewIndex];
            this.storePos[NewIndex] = this.storePos[oldIndex];
            this.storePos[oldIndex] = tempV;

        }
        public removeStoreByIndex(index: number): void {
            if (index < 0) {
                return;
            }
            if(this.storePos[index]){
                this._fightHeroIdMap.remove(this.storePos[index].id);
                this.storePos[index] = null;
            }
            
        }
        /**
         * 控制上阵列表中的效果
         */
        private controlOnStoreEffect(show: boolean) {
            this.UIPanel.HeroOnEff.visible = show;
        }
        private startDragForItem(tmpHeroInfo: Net.hero, item: HeroDefendLocationSetItem) {
            let itemPos = item.localToGlobal(new Laya.Point(item.width / 2, item.height / 2)); itemPos.y -= GameConfig.WinCenterY / 2;
            this.UIPanel.HeroDragEff.pos(itemPos.x - this.UIPanel.x, itemPos.y - this.UIPanel.y);
            this.UIPanel.HeroDragEff.visible = true;

            this.UIPanel.HeroDragEff.setData(Number.parseInt(item.name), tmpHeroInfo);

            this.UIPanel.HeroDragEff.on(Laya.Event.MOUSE_MOVE, this, this.dragEffMove_Called);

            this.dragEffMove_Called();
        }
        private endDragForItem() {

            this.UIPanel.HeroDragEff.off(Laya.Event.MOUSE_MOVE, this, this.dragEffMove_Called);
            this.UIPanel.HeroDragEff.visible = false;
        }
        private dragEffMove_Called(showEff = true): number {

            let tmpDragItem = this.UIPanel.HeroDragEff as Laya.Sprite;
            let dragPos = tmpDragItem.localToGlobal(new Laya.Point(tmpDragItem.width / 2, tmpDragItem.height / 2));

            let tmpStoryLayer = this.UIPanel.HeroOnStory.ContentLayer;
            let tempIndex = -1;
            for (let i = 0; i < tmpStoryLayer.numChildren; i++) {
                let tempSp = tmpStoryLayer.getChildAt(i) as HeroDefendLocationSetItem;
                if (tempSp.type && tempSp.hitTestPoint(dragPos.x, dragPos.y)) {

                    //当前选择的位置
                    tempIndex = parseInt(tempSp.name);




                    break;
                }
            }
            if (showEff) {
                if (tempIndex >= 0) {
                    let tmpPos = tmpStoryLayer.getChildByName((tempIndex).toString()) as Laya.Sprite;
                    this.UIPanel.HeroOnEff.visible = true;
                    this.UIPanel.HeroOnEff.pos(tmpPos.x + tmpStoryLayer.x, tmpPos.y + tmpStoryLayer.y);
                }
                else {
                    this.UIPanel.HeroOnEff.visible = false;
                }
            }

            return tempIndex;
        }




    }





}