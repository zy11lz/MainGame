module Pro
{
    /**
     * 世界地图展示
     */
    export class WorldMapMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Scene.WorldMap.MainUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("shijieditu")]
        }
        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            let ret = [];
            ret[ret.length] = `res/shijieditu/worldmap_bg.jpg`;
            ret[ret.length] = `res/shijieditu/worldmap_1002.png`;
            ret[ret.length] = `res/shijieditu/worldmap_1003.png`;
            ret[ret.length] = `res/shijieditu/worldmap_1004.png`;
            ret[ret.length] = `res/shijieditu/worldmap_1005.png`;
            return ret;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Scene.WorldMap.MainUI, 0, BaseAddLayer.CenterUI, true, 1);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.UIPanel.MapNode.removeChildren();
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.addEventMgr(EventNotify.City_MRole_ToScene, this, this.closeUI);
            this.addEventMgr(EventNotify.WorldMap_Close, this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.MapNode.addChild(new WorldLayer());
            this.UIPanel.CloseBtn.onClick(this, this.closeUI);
        }

        public refreshUI()
        {

        }
    }
}