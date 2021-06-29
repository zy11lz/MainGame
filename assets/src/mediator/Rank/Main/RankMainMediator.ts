module Pro
{
    export class RankMainMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Rank.MainUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/rankmain/pic_juqingjindu.png",
                "res/rankmain/pic_shilianta.png",
                "res/rankmain/pic_gonghuipaiming.png",
                "res/rankmain/pic_jingjichang.png",
                "res/rankmain/pic_zhanlipaiming.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Rank.MainUI, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.FunBox.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("rank_msg1", "clientRank", RankClientTabel),
                new TableBarContinerData("rank_msg2", "acrossRank", RankAcrossTabel)
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
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
            this.UIPanel.tabGrp.setSelectTab(0);
        }

        public refreshUI()
        {

        }

    }
}