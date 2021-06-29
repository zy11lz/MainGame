
module Pro
{
	/**
     * 神器解锁进度
     */
    export class ArtifactInfo extends ProUI.Scene.City.Utils.ArtifactInfoUI
    {

        private _sk: SkeletonPlayer;

        constructor()
        {
            super();

            this.on(Laya.Event.DISPLAY, this, () =>
            {
                this.controllEvents(false);
            });
        }

        //---------------------------------------Event------------------------------------
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            Global.EventsNotifyControl(this.listensEvents(), isOff);
            if (!isOff)
            {
                this.on(Laya.Event.UNDISPLAY, this, this.controllEvents);
            } else
            {
                this.unInitRedDotModel();
            }
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
                EventNotify.System_Switch_Open_Update, this, this.onUpdateSystemSwitch,
                EventNotify.Artifact_ActiveAll, this, this.refreshUI,
                CmdEvent.Artifact_Active, this, this.refreshUI,
                CmdEvent.Artifact_Syn, this, this.refreshUI,
                CmdEvent.Artifact_AddNew, this, this.refreshUI
            ]
        }

        onUpdateSystemSwitch(systemId: number)
        {
            if (systemId == emSystemSwitchType.Weapon)
            {
                this.refreshUI();
            }
        }

        //-------------------------------------Event Fun-----------------------------
        /** 初始化 */
        public init()
        {
            this.initRedDotModel();
            this.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Artifact, ArtifactDataMgr.getInLockingId()));
            });
        }

        public refreshUI()
        {
            this.visible = !ArtifactDataMgr.isGetAllArtiface && PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Weapon, false);
            if (this.visible)
            {
                let tmpArtifactID = ArtifactDataMgr.getInLockingId();
                let currentActiveNum = ArtifactDataMgr.getActiveNum(tmpArtifactID);
                let maxActiveNum = cfg.ArtifactActiveCfgData.getInfoWithFun(tmpArtifactID).length;
                this.ProLb.text = currentActiveNum + "/" + maxActiveNum;
                let pro = maxActiveNum == 0 ? 1 : currentActiveNum / maxActiveNum;
                this.ProImg.width = pro * 114;


                if (!this._sk)
                {
                    this._sk = new SkeletonPlayer();
                    this.IconImg.addChild(this._sk);
                    this._sk.scale(0.5, 0.5);
                }
                this._sk.load(UrlMgr.getSpineSceneUrl(`tuteng/${ tmpArtifactID }/${ tmpArtifactID }`));
                this._sk.playByIndex(0, true);
                // Global.setResIconWithItemID(this.IconImg, CfgID.ResType.ArtifactHalfShape, tmpArtifactID);
                // Public.EffectUtils.clearYoyoTween(this.IconImg);
                // this.IconImg.y = 84;
                // Public.EffectUtils.yoyoTween(this.IconImg, { y: 74 }, 1200);
            }
        }

        //-----------------------------------红点------------------------------------
        private _reddotBindCtl: ReddotBindImageController = new ReddotBindImageController();
        /** 将红点图片与红点数据模型关联 */
        private initRedDotModel(): void
        {
            this.unInitRedDotModel();

            this._reddotBindCtl.bind(this.RedDotImg, ArtifactDataMgr.unlockRewardRedDotModel);
        }

        private unInitRedDotModel(): void
        {
            this._reddotBindCtl.cleanUp();
        }
    }
}