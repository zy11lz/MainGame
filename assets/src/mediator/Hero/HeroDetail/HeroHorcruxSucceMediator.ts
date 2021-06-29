
module Pro
{
	/**
	 * 战斗失败通用界面
	 */
    export class HeroHorcruxSucceMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroDetail.Horcrux.HorcruxSucceUI;
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        private CountDown = 5;
       
        public UIOpenData: AwardOpenUIData;

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroDetail.Horcrux.HorcruxSucceUI, 1, BaseAddLayer.TopUI,true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            Laya.timer.clearAll(this);
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
       
            this.getDarkUI().graphics.clear();
            this.getDarkUI().graphics.drawRect(0, 0, this.getDarkUI().width, this.getDarkUI().height, "#2d2629");
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

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let HorcruxInfo = cfg.HorcruxCfgData.getInfo(this.UIOpenData.customObject)
            this.UIPanel.HorcruxItem.IconImg.skin =  UrlMgr.getHorcruxUrl(HorcruxInfo.icon);
            this.UIPanel.HorcruxName.text = HorcruxInfo.name;
        }

        public refreshUI()
        {
        }

    }
}