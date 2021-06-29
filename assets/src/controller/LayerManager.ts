
module Pro
{
    /**
     * 游戏容器类
     * 显示对象层级
     * Main-GameScene（sceneLayer、mainLayer、popLayer、effectLayer、maskLayer、loadLayer）
     *
     */
    export class LayerManager extends Laya.Sprite
    {

        /** 场景层 如 战场、主城、副本战场之类的 */
        public sceneLayer: Laya.Box = new Laya.Box();
        /** UI层 底层 */
        public baseUILayer: Laya.Box = new Laya.Box();
        /** UI层 中间 */
        public centerUILayer: Laya.Box = new Laya.Box();
        /** UI层 高层 */
        public topUILayer: Laya.Box = new Laya.Box();
        /** 特效层 如 闪烁、飘字、跑马灯之类的 */
        public effectLayer: Laya.Box = new Laya.Box();
        /** 新手引导层 */
        public GuideLayer: Laya.Box = new Laya.Box();
        /** 通讯遮罩层 和服务器通讯UI */
        public maskLayer: Laya.Box = new Laya.Box();
        /** 加载遮罩层 场景切换的时候加载资源UI */
        public loadLayer: Laya.Box = new Laya.Box();

        private static _instance: LayerManager;

        //构造方法
        public constructor()
        {
            super();
            this.init();
        }

        //游戏容器管理器单例
        public static get Inst()
        {
            if (!this._instance)
            { this._instance = new LayerManager(); }
            return this._instance;
        }

        //初始化场景类
        public init(): void
        {

            this.mouseThrough = true;
            this.sceneLayer.mouseThrough = true;
            this.baseUILayer.mouseThrough = true;
            this.centerUILayer.mouseThrough = true;
            this.topUILayer.mouseThrough = true;
            this.effectLayer.mouseThrough = true;
            this.GuideLayer.mouseThrough = true;

            this.maskLayer.mouseThrough = false;
            this.loadLayer.mouseThrough = false;

            this.adjustScreenPos();
            // this.y = GameConfig.WinCenterY / 2;

            this.sceneLayer.name = "sceneLayer";
            this.baseUILayer.name = "baseUILayer";
            this.centerUILayer.name = "centerUILayer";
            this.topUILayer.name = "topUILayer";
            this.effectLayer.name = "effectLayer";
            this.GuideLayer.name = "GuideLayer";
            this.maskLayer.name = "maskLayer";
            this.loadLayer.name = "loadLayer";

            this.addChild(this.sceneLayer);
            this.addChild(this.baseUILayer);
            this.addChild(this.centerUILayer);
            this.addChild(this.topUILayer);
            this.addChild(this.effectLayer);
            this.addChild(this.GuideLayer);
            this.addChild(this.maskLayer);
            this.addChild(this.loadLayer);

            //添加事件
            EventMgr.on(EventNotify.LoadingUI_Open, this, this.LoadingUI_OPEN_Called);
            EventMgr.on(EventNotify.LoadingUI_Close, this, this.LoadingUI_CLOSE_Called);
            EventMgr.on(EventNotify.Screen_Resize, this, this.adjustScreenPos);

        }

        hideUI()
        {
            // common.DisplayUtils.removeFromParent(this.baseUILayer);
            common.DisplayUtils.removeFromParent(this.centerUILayer);
            common.DisplayUtils.removeFromParent(this.topUILayer);
            common.DisplayUtils.removeFromParent(this.effectLayer);
            common.DisplayUtils.removeFromParent(this.GuideLayer);
            common.DisplayUtils.removeFromParent(this.maskLayer);
            common.DisplayUtils.removeFromParent(this.loadLayer);
        }

        private adjustScreenPos()
        {
            this.width = this.sceneLayer.width = this.baseUILayer.width = this.centerUILayer.width = this.topUILayer.width = this.effectLayer.width = GameConfig.curWidth();
            this.height = this.sceneLayer.height = this.baseUILayer.height = this.centerUILayer.height = this.topUILayer.height = this.effectLayer.height = GameConfig.curHeight();
        }

        public cycle(): void
        {
            this.removeChildren();
            this.removeSelf();
            LayerManager._instance = null;
        }

        //----------------------Event------------------------
        /**
         * 打开loading,loadType:1普通loading，2战场loading
         */
        private LoadingUI_OPEN_Called(loadType: number): void
        {
            LoadingUI.ins.show(this.loadLayer);
            LoadingUI.ins.StartLoad(loadType);
        }

        /**
         * 关闭loading(是否立即关闭)
         */
        private LoadingUI_CLOSE_Called(): void
        {
            LoadingUI.close();
        }

    }
}

