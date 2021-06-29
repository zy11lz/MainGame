module Pro
{
    /**
     * 界面说明： 获得称号弹窗
    * @author jason.xu
    */
    export class ShapeTitleAwardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Common.ShapeTitleAwardUI;

        private _titleSk: SkeletonPlayer;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.ShapeTitleAwardUI, 1, BaseAddLayer.TopUI, true);
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
            this.initTitleSk();
            let titleId = this.UIOpenData.customObject;
            let cfgData = cfg.ShapeTitleCfgData.getInfo(titleId);
            //称号图标
            Global.setResShapeTitle(this.UIPanel.imgIcon, titleId);
            //属性列表
            let attrList = cfg.ShapeTitleCfgData.getAddAttrListInfoByCfgInfo(cfgData);
            this.UIPanel.listAttr.onRefresh(attrList.length, this, (tempUI: Laya.Box, nAttr: number) =>
            {
                let attr = attrList[nAttr];
                let txtName = tempUI.getChildByName("txtName") as component.UILabel;
                let txtValue = tempUI.getChildByName("txtValue") as component.UILabel;
                txtName.text = cfg.BattleCfgData.getDescByAttrType(attr.type);
                txtValue.text = Global.getAttrValueString(attr);
            })
        }

        private initTitleSk()
        {
            if (!this._titleSk)
            {
                this._titleSk = new SkeletonPlayer();
                this.UIPanel.aniPosImg.addChild(this._titleSk);
                this._titleSk.play("effect", false);
                this._titleSk.on(Laya.Event.STOPPED, this, () =>
                {
                    this._titleSk.play("effect_loop", true);
                })
                this._titleSk.scale(0.6, 0.6);
                this._titleSk.load(UrlMgr.getSpineSceneUrl("texiao/gongxihuode/gongxihuode"));
            } else
            {
                this._titleSk.play("effect", false);
            }
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnGoto.onClick(this, this.onClickGoto);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickGoto(): void
        {
            this.closeUI();
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ShapeDev, 3));
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /*** 关闭UI */
        public closeUI(): void
        {
            if (this._titleSk)
            {
                this._titleSk.offAll();
                this._titleSk.removeSelf();
                this._titleSk = null;
            }
            Laya.timer.clearAll(this);
            this.closePanel();
        }
    }
}