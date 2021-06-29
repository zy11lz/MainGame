module Pro {
    /**
     * 进阶总览
     */
    export class HeroDefendPreviewMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.Hero.HeroDefend.HeroDefendPreviewViewUI;

        public constructor() {
            super();
        }
        public autoLoadAtlas(): Array<any> {
            return [];
        }
        public openUI(): void {
            this.showPanel(ProUI.Hero.HeroDefend.HeroDefendPreviewViewUI, 1,BaseAddLayer.TopUI, true);

        }
        public closeUI(): void {
            this.closePanel();
        }
        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void {


            
            


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
            this.UIPanel.list.onRefresh(cfg.DefendRankCfgData.dataArr.length,this,(item:HeroDefendPreviewItem,index:number)=>{
                item.setData(cfg.DefendRankCfgData.dataArr[index].rank);
            })

        }





    }
}