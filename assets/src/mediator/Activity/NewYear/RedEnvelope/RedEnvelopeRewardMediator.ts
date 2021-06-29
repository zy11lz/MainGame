module Pro
{
    /**
     * 新年红包奖励
     */
    export class RedEnvelopeRewardMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeRewardUI;
        /** 红包光特效 */
        private _guangSk: SkeletonPlayer;
        /** 红包星星特效 */
        private _starSk: SkeletonPlayer;

        private infoData: Pb_God.PBG2COpenRedEnvelopeAck;
        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeRewardUI, 1, BaseAddLayer.CenterUI, true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            if (this._guangSk)
            {
                this._guangSk.offAll();
                this._guangSk.removeSelf();
                this._guangSk = null;
            }

            if (this._starSk)
            {
                this._starSk.offAll();
                this._starSk.removeSelf();
                this._starSk = null;
            }
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btnClose.on(Laya.Event.CLICK, this, this.closeUI)
        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.infoData = this.UIOpenData.customObject;
            let element = cfg.ActivityRedEnvelopeCfgData.getInfo(this.infoData.index);
            if (element.type == EmredEnvelopeType.NpcRedEnvelope) // 官方红包
            {
                this.UIPanel.npcImg.visible = true
                this.UIPanel.petImg.visible = false;
                this.UIPanel.npcImg.skin = `res/Unpack/npc/${ element.img }.png`
            }
            else
            {
                this.UIPanel.petImg.visible = true;
                this.UIPanel.npcImg.visible = false
                this.UIPanel.petImg.skin = `res/Unpack/Icon/BigCard/${ element.img }.png`
            }
            this.UIPanel.title.text = Global.getLangStr("redEnvelope_msg3", element.name);              // 红包名称
            this.UIPanel.desc.text = element.desc;                                                      // 红包描述
            this.UIPanel.rewardTime.text = Global.getFormatTimeString(this.infoData.receiveTime * 1000, 9);   // 领取时间

            this.UIPanel.btnNext.disabled = !(RedEnvelopeDataMgr.getReceiveIndexByType(element.type) > 0)
            this.UIPanel.itemList.onRefresh(this.infoData.data.length, this, this.onRefreshItem);
            this.UIPanel.rewardItem.setItemInfo(cfg.AddItemInfo.parse(`${ this.infoData.award[0].itemid }_${ this.infoData.award[0].itemcount }`)[0]);



            // 开启红包动画 有参数时默认为首次开启红包
            if (this.UIOpenData.customObject2 == true)
            {
                if (!this._guangSk)
                {
                    this._guangSk = new SkeletonPlayer();
                    this.UIPanel.guangAni.addChild(this._guangSk);
                    this._guangSk.pos(0, 100);
                    this._guangSk.load(UrlMgr.getSpineSceneUrl("texiao/hongbao2/hongbao2"));
                    this._guangSk.on(Laya.Event.STOPPED, this, () =>
                    {
                        this._guangSk.visible = false;
                    })
                    // this._guangSk.playbackRate(3);
                }
                this._guangSk.play("idle", false, true);
                this._guangSk.visible = true;

                if (!this._starSk)
                {
                    this._starSk = new SkeletonPlayer();
                    this.UIPanel.starAni.addChild(this._starSk);
                    this._starSk.pos(0, 100);
                    this._starSk.load(UrlMgr.getSpineSceneUrl("texiao/hongbao3/hongbao3"));
                    this._starSk.on(Laya.Event.STOPPED, this, () =>
                    {
                        this._starSk.visible = false;
                    })
                }

                this._starSk.play("idle", false, true);
                this._starSk.visible = true;
                Pro.AwardOpenUtils.showTimeAwardOpen(cfg.AddItemInfo.parse(`${ this.infoData.award[0].itemid }_${ this.infoData.award[0].itemcount }`));
            }
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnNext.onClick(this, this.clickNext);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }

        public clickNext(): void
        {
            this.closeUI();
            let element = cfg.ActivityRedEnvelopeCfgData.getInfo(this.infoData.index);
            RedEnvelopeSend.openAsk(RedEnvelopeDataMgr.getReceiveIndexByType(element.type));
        }


        /**刷新人物获取道具显示信息 */
        private onRefreshItem(item: ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeRewardItemUI, index: number): void
        {
            let info = this.infoData.data[index];
            item.nickName.text = info.name;
            item.openTime.text = Global.getFormatTimeString(info.receiveTime * 1000, 9);
            item.itemLv.text = info.level + "";
            item.rewardItem.setItemInfo(cfg.AddItemInfo.parse(`${ info.award[0].itemid }_0`)[0], false, false);
            item.itemCount.text = "X" + info.award[0].itemcount;
            Global.setResIconWithItemID(item.imgIcon, CfgID.ResType.Player_Icon, info.headid);
        }
    }
}