module Pro
{
    /**
     * 界面说明： 后续待开启的奖励预览，七日登陆关闭之后预览第二天的界面 或者 关卡通关时预览30关的奖励。
    * @author jason.xu
    */
    export class NextPreviewPromptMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Common.NextPreviewPromptUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('nextPreview')];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return ["res/nextPreview/huodong_ciridenglu01.png",
                "res/nextPreview/huodong_ciridenglu04.png",
                "res/nextPreview/huodong_tongguan.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.NextPreviewPromptUI, 3, BaseAddLayer.TopUI, true);
        }

        public closeUI(): void
        {
            Laya.timer.clear(this, this.update);
            super.closeUI();
            GuideMgr.Inst.checkAndReActiveGuideByPauseStep(GuideStep.Func_7DayAct_7);
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
            let bgFrame = this.UIOpenData.customObject[0];
            this.UIPanel.bg.frame = bgFrame;

            let addItemArr: cfg.AddItemInfo[] = this.UIOpenData.customObject[1];
            this.UIPanel.norItem.setItemInfo(addItemArr[0]);

            Laya.timer.frameLoop(1, this, this.update);
        }

        private update(): void
        {
            this.UIPanel.lightEff.rotation += 1;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }
        /**
		 * 进入本步引导
		 */
        public Guide_Enter(step: GuideStep)
        {
            // if (step == GuideStep.Func_7DayAct_7) {
            //     GuideMgr.Inst.showFinger(this.UIPanel.imgCloseTips, true, this.getDarkUI(), 0, 1);
            // }
        }

    }
}