module Pro
{
    export class LevelTargetInfo extends ProUI.Scene.City.Utils.LevelTargetUI
    {
        /** 所有的过关奖励数据(未领取) */
        PrizeDataList: Array<any> = null;
        /**是否是御三家 */
        isTherrHome: boolean
        /** 御三家所在关卡数据*/
        idTherrHome: cfg.HookStagePrizeCfgInfo
        /**骨骼 */
        private _sk: SkeletonPlayer;

        constructor()
        {
            super();
            this.initEvent();
            this.on(Laya.Event.REMOVED, this, () =>
            {
                EventMgr.off(CmdEvent.Fight_NormalResult_Ack, this, this.refreshPrizeData);
                EventMgr.off(CmdEvent.Hook_StagePrizeAck, this, this.refreshPrizeData);
                this.PrizeDataList = null;
            });
        }

        private initEvent(): void
        {
            EventMgr.on(CmdEvent.Fight_NormalResult_Ack, this, this.refreshPrizeData);
            EventMgr.on(CmdEvent.Hook_StagePrizeAck, this, this.refreshPrizeData);
        }

        public init()
        {
            this.refreshPrizeData();
            this.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new StagePrizeOpenUIData(Pb_God._emBattleType.BattleType_Hook));
            });
        }

        refreshPrizeData()
        {
            this.PrizeDataList = [];
            this.isTherrHome = false;
            this.idTherrHome = null;
            cfg.HookStagePrizeCfgData.getDataList().forEach(elment =>
            {
                if (!HookDataMgr.isStageRewarded(elment.stageID))
                {
                    this.PrizeDataList.push(elment);
                    if (elment.threeHome)
                    {
                        this.isTherrHome = true;
                        this.idTherrHome = elment;
                    }
                }
            });
            this.refreshUI();
        }

        public refreshUI()
        {
            for (var index = 0; index < this.PrizeDataList.length; index++)
            {
                var element = this.PrizeDataList[index];
                let prizeInfo = element as cfg.HookStagePrizeCfgInfo;
                if (!prizeInfo.isTarget) continue;
                //如果有御三家隐藏icon播放动画
                this.btnBg.visible = !this.isTherrHome
                this.norItem.visible = !this.isTherrHome
                this.skBg.visible = this.isTherrHome
                let TherrHome: string[];
                if (this.isTherrHome)
                {
                    this.skTherrHome();
                    TherrHome = Global.getLangStr("thread_text").split(';')
                }

                let stageId: number = HookDataMgr.getStageID();
                this.RedDot.visible = stageId >= prizeInfo.stageID;
                // 当前已通关大于当前领奖关卡
                if (stageId >= prizeInfo.stageID)
                {
                    this.norItem.setItemInfo(cfg.AddItemInfo.parse(prizeInfo.stagePrize)[0]);
                    let innerHTML1 = this.isTherrHome ? TherrHome[0] : Global.getLangStr("hook_msg26", prizeInfo.stageID);
                    let innerHTML2 = this.isTherrHome ? TherrHome[1] : Global.getLangStr("hook_msg27", cfg.ItemCfgData.getNameById(Number(prizeInfo.stagePrize.split(';')[0].split('_')[0])));
                    this.ProTarget1.innerHTML = innerHTML1;
                    this.ProTarget2.innerHTML = innerHTML2;
                    this.desLab.innerHTML = Global.getLangStr("hook_msg29", prizeInfo.stageID);

                    this.ProLb.text = prizeInfo.stageID + "/" + prizeInfo.stageID;
                    this.ProImg.skin = 'res/mainui/bar18.png'
                    this.ProImg.sizeGrid = "0,8,0,8";
                    this.ProImg.width = 140;
                }
                else
                {
                    let stateInfo: cfg.HookStagePrizeCfgInfo = cfg.HookStagePrizeCfgData.getNextStateInfo(stageId);
                    this.norItem.setItemInfo(cfg.AddItemInfo.parse(stateInfo.stagePrize)[0]);

                    this.ProTarget1.innerHTML = this.isTherrHome ? TherrHome[0] : Global.getLangStr("hook_msg26", stateInfo.stageID);
                    this.ProTarget2.innerHTML = this.isTherrHome ? TherrHome[1] : Global.getLangStr("hook_msg27", cfg.ItemCfgData.getNameById(Number(stateInfo.stagePrize.split(';')[0].split('_')[0])));
                    this.desLab.innerHTML = Global.getLangStr("hook_msg28", stateInfo.stageID - stageId, cfg.ItemCfgData.getNameById(Number(stateInfo.stagePrize.split(';')[0].split('_')[0])));

                    this.ProLb.text = `${ stageId - cfg.HookStagePrizeCfgData.getCurStateId(stageId) }/${ stateInfo.stageID - cfg.HookStagePrizeCfgData.getCurStateId(stageId) }`
                    if (stageId < 10)
                    {
                        this.ProLb.text = `${ stageId }/${ stateInfo.stageID }`
                    }
                    this.ProImg.skin = 'res/mainui/bar17.png'
                    this.ProImg.sizeGrid = "0,8,0,8";
                    this.ProImg.width = (stageId - cfg.HookStagePrizeCfgData.getCurStateId(stageId)) / (stateInfo.stageID - cfg.HookStagePrizeCfgData.getCurStateId(stageId)) * 140
                }
                this.cloudBg.width = this.desLab.contextWidth + 38;
                this.cloudBg.height = this.desLab.contextHeight + 50;
                this.showDes();
                break;
            }
        }

        /**随机一个精灵播放动作 */
        private skTherrHome()
        {
            let gift_arr = cfg.ItemGiftPackCfgData.getGiftInfoArrayByItemID(16850);
            let number = Math.floor(Math.random() * 3);
            let rewards = cfg.ItemGiftPackCfgData.getAddItemAryByInfo(gift_arr[number]);
            let itemInfo = cfg.ItemCfgData.getInfo(rewards[0].itemid);
            let skinIfo = cfg.PetCfgData.getSkinInfoByPetID(parseInt(itemInfo.useParam.split("_")[0]));
            let skelName = skinIfo.skelName;
            if (!this._sk)
            {
                this._sk = new SkeletonPlayer();
                this._sk.pos(this.skBg.width / 2, this.skBg.height * 0.85);
                this.skBg.addChild(this._sk);
                this._sk.on(LayaEvent.STOPPED, this, this.onSkStop);
            }
            this._sk.load(UrlMgr.getModelSkUrl(skelName));
            this._sk.play("win_loop");
        }

        /**一个动作播放结束就重新开始 */
        private onSkStop()
        {
            this.skTherrHome()
        }

        private showDes()
        {
            this.desBox.alpha = 1;
            Laya.Tween.to(this.desBox, { alpha: 0 }, 400, Laya.Ease.quadOut, null, 10000);
        }
    }
}