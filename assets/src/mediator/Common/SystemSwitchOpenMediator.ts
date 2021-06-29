module Pro
{
    /**
    * 界面说明： 新功能开启界面（独立于升级提醒时用到）
    * @author jason.xu
    */
    export class SystemSwitchOpenMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Common.NewSystemOpenPanelUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("levupgrade"), UrlMgr.getAtlas("rewardpopup")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            return ["res/rewardpopup/pic_eff1.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.NewSystemOpenPanelUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.onLoop);
            FuncGuideMgr.Inst.checkStartFuncOpenGuide();  //功能开放提示界面关闭后，才能启动功能引导
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
            let systemId: number = this.UIOpenData.customObject;
            let systemCfgInfo = cfg.SystemSwitchSystemSwitchCfgData.getInfo(systemId);
            this.UIPanel.icon.skin = "res/Unpack/Icon/SystemIcon/" + systemCfgInfo.icon;
            this.UIPanel.txtDes.text = systemCfgInfo.describe;
            this.UIPanel.txtName.text = systemCfgInfo.name;
            Laya.timer.frameLoop(2, this, this.onLoop);
        }

        private onLoop(): void
        {
            this.UIPanel.centerBg.rotation += 1;
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

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            Laya.timer.once(100, this, () =>
            {
                GuideMgr.Inst.showFinger(this.UIPanel.TipsImg, true);
            });
        }

        /**
         * 操作本步引导
         */
        public Guide_Active(step: GuideStep)
        {
            UIManager.Inst.closeCurrentList();
            if (!UIManager.Inst.getIsShowingUI())
            {
                GuideMgr.Inst.nextActive();
            }
        }
    }
}