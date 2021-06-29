module Pro {
    /**
     * 守护之书
     */
    export class HeroDefendBookMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.Hero.HeroDefend.HeroDefendBookViewUI;
        /** 当前选择的英雄类型索引 */
        private TmpSelectHeroTypeIndex = -1;

        /** 背包的英雄列表 */
        private TmpMyHeroList: Array<cfg.DefendSkillCfgInfo>;

        

        public static show(){
            window["HeroDefend"]=this;
            UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendBookMediator));

        }
        

        public constructor() {
            super();
        }
        public autoLoadAtlas(): Array<any> {
            return null
        }
        public openUI(): void {
            this.showPanel(ProUI.Hero.HeroDefend.HeroDefendBookViewUI,1,BaseAddLayer.TopUI,true);
            
        }
        public closeUI(): void {
            this.closePanel();
        }
        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void {
            this.UIPanel.btn_close.onClick(this,this.closeUI);

        }
        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void {
            
        }
        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void {
           
        }

          /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.TmpSelectHeroTypeIndex = -1;
            this.refreshHeroType();

        }

         /** 刷新英雄类型 */
         private refreshHeroType()
         {
             let startTypeIndex = 0;
             let heroTypeNum = 1+ Pb_God._emPetType.PetType_Moon;
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
            this.refreshHeroList();
        }
         //---------------------------------英雄Icon刷新----------------------------------------
        /** 刷新英雄列表 */
        private refreshHeroList()
        {
            this.TmpMyHeroList = cfg.DefendSkillCfgData.getPetList(this.TmpSelectHeroTypeIndex)


            this.UIPanel.HeroItemList.onRefresh(this.TmpMyHeroList.length, this, this.onMyHeroItemRender);
        }
        /** 玩家英雄刷新 */
        private onMyHeroItemRender(item: NorItemUI, index: number)
        {
            let tmpHeroInfo = this.TmpMyHeroList[index];
            if (tmpHeroInfo == null)
            {
                return;
            }
            item.setDefendSkillCfgInfo(tmpHeroInfo);
            item.IconImg.gray = false;
            item.onClick(this, () =>
            {
                let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpHeroInfo.skillID, tmpHeroInfo.skillLevel);
                Pro.UIManager.Inst.forceOpen(new Pro.SkillReviewOpenUIData(0, tmpSkillInfo.skillIndex, true));
            });
        }


        


        




    }
}