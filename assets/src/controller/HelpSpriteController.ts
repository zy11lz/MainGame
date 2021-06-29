/*
* name;
*/
module Pro
{
    enum NoticeType
    {
        // 1 终生提示一次；
        once = 1,
        // 2 单次登陆提示一次；
        thisLogin = 2,
        // 3 单日提示一次；
        dayily = 3,
        // 4 循环提示（每次随机都参与）；
        everyOne = 4,
        // 5 条件触发（触发就提示）；
        toggle = 5
    }

    enum ConditionType
    {
        //     1 玩家等级≥参数；
        level = 1,
        // 2 玩家累积充值额度≥参数；
        totel_recharge = 2,
        // 3 玩家当日充值额度≥参数；
        doday_recharge = 3,
        // 4 玩家主线关卡进度≥参数；
        main_stage = 4,
        // 5 玩家钻石数量≥参数；
        diamond_num = 5,
        // 6 免费抽卡次数≥参数
        free_card = 6,
        // 7 帮会副本次数≥参数
        guild_battle_num = 7,
        // 8 背包中有指定道具指定数量≥参数
        item_num = 8,
        // 9 服务器时间   （时间戳）≥参数
        server_time = 9,
        // 10 特定充值的当前剩余次数（取charge表）   ≥参数
        left_charge_num = 10
    }

    export class HelpSpriteController
    {



        private static _instance: HelpSpriteController;
        private onceLocalKey: string = "HelpSpriteController";
        private _needNoticeArr: number[] = [];

        private _thisLoginDic: ds.StringMap<number>;
        private _dayilyDic: ds.StringMap<number>;
        private _onceMap: Object = {};
        private _showId: number;
        private _mainUI: ProUI.Utils.HelpSpriteUI;
        private _firstPlay: boolean = true;
        private _standAni: SkeletonPlayer;


        public get mainUI(): ProUI.Utils.HelpSpriteUI
        {
            if (this._mainUI == null)
            {
                this._mainUI = new ProUI.Utils.HelpSpriteUI();
                this._standAni = new SkeletonPlayer();
                this._standAni.load(UrlMgr.getSpineSceneUrl("mengchong/loading_pikaqiu/loading_pikaqiu"));
                // this._standAni.x = 40;
                // this._standAni.y = 130;
                this._standAni.pos(this._mainUI.aniPos.x, this._mainUI.aniPos.y);
                this._mainUI.addChild(this._standAni);
                this._standAni.playByIndex(0, true);
                this._mainUI.paopaoBox.visible = false;
                this._mainUI.clickSp.on(LayaEvent.CLICK, this, this.onMiniRoleClick);
                this._standAni.on(Laya.Event.STOPPED, this, this.onAniStop);
                this._standAni.on(Laya.Event.PLAYED, this, this.onAniPlay);
                this.playMiniRoleAction("stand", true);
            }
            return this._mainUI;
        }
        /**
         * 动画反转4
         * @param bol 
         */
        reversed(bol: boolean)
        {
            if (this._standAni)
            {
                this._standAni.scaleX = bol ? -1 : 1;
            }

        }


        constructor()
        {
            this._thisLoginDic = new ds.StringMap<number>();
            this._dayilyDic = new ds.StringMap<number>();
            var str = Laya.LocalStorage.getItem(this.onceLocalKey);
            if (str && str != "")
            {
                this._onceMap = JSON.parse(str);
            }
        }

        onAniPlay()
        {
            if (this._firstPlay)
            {
                Laya.timer.once(1, this, this.playMiniRoleAction, ["stand", true])
                this._firstPlay = false;
            }
        }

        onMiniRoleClick()
        {
            if (this._showId)
            {
                var actionPar = cfg.HelpSpriteCfgData.getActionParmById(this._showId)
                TaskUtils.gotoOpenByUICfgId(Number(actionPar));
                this.doCliCk(this._showId);
            } else
            {
                TaskUtils.gotoPanel(PanelNotify.Open_HeroStronger);
            }
        }
        doCliCk(showId: number)
        {
            var noticeType = cfg.HelpSpriteCfgData.getNoticeTypeById(showId);
            if (noticeType == NoticeType.once)
            {
                this._onceMap[showId] = showId;
                Laya.LocalStorage.setItem(this.onceLocalKey, JSON.stringify(this._onceMap));
            }
            else if (noticeType == NoticeType.thisLogin)
            {
                this._thisLoginDic.put(showId, showId);
            }
            else if (noticeType == NoticeType.dayily)
            {
                this._dayilyDic.put(showId, showId);
            }
            else if (noticeType == NoticeType.everyOne)
            {
                // return true;
            }
            else if (noticeType == NoticeType.toggle)
            {
                // return false;
            }
        }

        public static get instance(): HelpSpriteController
        {
            if (this._instance == null)
            {
                this._instance = new HelpSpriteController();
            }
            return this._instance;
        }

        public start()
        {
            Laya.timer.clear(this, this.update);
            Laya.timer.once(3000, this, this.update);
        }

        onAniStop()
        {
            this.playMiniRoleAction("stand", true)
        }

        update()
        {
            let isOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.HelpSprite);
            if (isOpen)
            {
                this.findNeedNoticeArr();
                if (this._needNoticeArr.length)
                {
                    var randomId = Global.getRandomNum(0, this._needNoticeArr.length);
                    var showId = this._needNoticeArr[randomId];
                    this.show(showId);
                }
            }
            //方冰要求冲2分钟改为15s
            Laya.timer.once(15000, this, this.update);
            // Laya.timer.once(10000, this, this.update);
        }

        show(showId: number)
        {
            this.mainUI.paopaoBox.visible = true;
            this.mainUI.paopaoBg.skin = "res/common/pic_qipao01.png";
            this._showId = showId;
            var showInfo: cfg.HelpSpriteCfgInfo = cfg.HelpSpriteCfgData.getInfo(showId);
            this.playMiniRoleAction(showInfo.roleAction, false)
            this.mainUI.sayLab.showText = this.mainUI.sayLab.innerHTML = showInfo.noticTxt;
            var textHeight = this.mainUI.sayLab.contextHeight;
            this.mainUI.paopaoBg.height = textHeight + 50;
            this.mainUI.paopaoBox.y = (44 - this.mainUI.paopaoBg.height);

            Laya.timer.once(5000, this, this.hideSay);
            Laya.timer.once(60000, this, this.clearShowId);
        }

        clearShowId()
        {
            this._showId = 0;
        }

        playMiniRoleAction(roleAction: string, isLoop: boolean)
        {
            // if (roleAction == "stand")
            // {
            //     this.mainUI.miniRoleSK.stop();
            //     this.mainUI.miniRoleSK.removeSelf();
            //     // this._mainUI.addChild(this._standAni);
            //     this._standAni.visible = true;
            // } else
            // {
            //     this._standAni.visible = false;
            //     // this._standAni.removeSelf();
            //     this.mainUI.addChild(this.mainUI.miniRoleSK);
            //     if (this.mainUI.miniRoleSK["_templet"] != null)
            //     {
            //         this.mainUI.miniRoleSK.play(0, isLoop);
            //     }
            // }

            this._standAni.playByIndex(0, true);

        }

        hideSay()
        {
            this.mainUI.paopaoBox.visible = false;
            this.playMiniRoleAction("stand", true)
        }

        findNeedNoticeArr()
        {
            this._needNoticeArr.length = 0;
            var dataarr: cfg.HelpSpriteCfgInfo[] = cfg.HelpSpriteCfgData.allData;
            for (let index = 0; index < dataarr.length; index++)
            {
                const info: cfg.HelpSpriteCfgInfo = dataarr[index];
                if (this.isNeedNotice(info))
                {
                    this._needNoticeArr.push(info.id);
                }
            }
        }

        isNeedNotice(info: cfg.HelpSpriteCfgInfo): boolean
        {
            if (this.isNoticeTypeCanShow(info.id))
            {
                if (this.isConditionTypeNeedShow(info))
                {
                    return true;
                }
            }
            return false;
        }

        isNoticeTypeCanShow(showId: number)
        {
            var noticeType = cfg.HelpSpriteCfgData.getNoticeTypeById(showId);
            if (noticeType == NoticeType.once)
            {
                return !this._onceMap.hasOwnProperty(showId);
            }
            else if (noticeType == NoticeType.thisLogin)
            {
                return !this._thisLoginDic.containsKey(showId);
            }
            else if (noticeType == NoticeType.dayily)
            {
                return !this._dayilyDic.containsKey(showId);
            }
            else if (noticeType == NoticeType.everyOne)
            {
                return true;
            }
            else if (noticeType == NoticeType.toggle)
            {
                return false;
            }
            return false;
        }


        isConditionTypeNeedShow(info: cfg.HelpSpriteCfgInfo): boolean
        {
            if (this.isMatchCondition(info.openType, info.openParm, info.openExt, true))
            {
                if (!this.isMatchCondition(info.closeType, info.closeParm, info.closeExt, false))
                {
                    return true;
                }
            }
            return false;
        }

        isMatchCondition(type: number, parm: number, ext: string, isOpen: boolean)
        {
            if (type == ConditionType.level)
            {
                return PlayerDataMgr.level >= parm
            }
            else if (type == ConditionType.totel_recharge)
            {
                return PlayerDataMgr.totalrecharge >= parm
            }
            else if (type == ConditionType.doday_recharge)
            {
                return PlayerDataMgr.todayrecharge >= parm
            }
            else if (type == ConditionType.main_stage)
            {
                return HookDataMgr.getStageID() >= parm

            }
            else if (type == ConditionType.diamond_num)
            {
                var diamondNum = Global.getItemNum(CfgID.ItemID.Diamond);
                if (isOpen)
                {
                    return diamondNum >= parm
                } else
                {
                    return diamondNum < parm
                }
            }
            else if (type == ConditionType.free_card)
            {
                let havenNum: number = 0;
                let haveBaseCall = CallDataMgr.isHaveFreeTimeByCallType(PetCallType.base_call);
                havenNum = haveBaseCall ? havenNum++ : havenNum;
                let haveAdvancedCall = CallDataMgr.isHaveFreeTimeByCallType(PetCallType.advanced_call);
                havenNum = haveAdvancedCall ? havenNum++ : havenNum;
                if (isOpen)
                {
                    // 免费抽卡次数≥参数
                    return havenNum >= parm;
                } else
                {
                    // 免费抽卡次数<参数
                    return havenNum < parm;
                }
            }
            else if (type == ConditionType.guild_battle_num)
            {
                if (FactionDataMgr.isHaveFaction())
                {
                    let leftCount = FactionDataMgr.getBossLeftCount();
                    if (isOpen)
                    {
                        // 7 帮会副本次数≥参数
                        return leftCount >= parm;
                    } else
                    {
                        // 7 帮会副本次数<参数
                        return leftCount < parm;
                    }
                } else
                {
                    return false;
                }
            }
            else if (type == ConditionType.item_num)
            {
                let itemNum = ItemDataMgr.getBagItemNum(parm)
                if (isOpen)
                {
                    // 背包中有指定道具指定数量≥参数
                    return itemNum >= Number(ext);
                } else
                {
                    // 背包中有指定道具指定数量
                    return itemNum < Number(ext);
                }
            }
            else if (type == ConditionType.server_time)
            {
                let itemNum = ItemDataMgr.getBagItemNum(parm)
                if (isOpen)
                {
                    // 服务器时间   （时间戳）≥参数
                    return itemNum >= TimeController.currTimer;
                } else
                {
                    // 服务器时间     （时间戳<参数
                    return itemNum < TimeController.currTimer
                }
            }
            else if (type == ConditionType.left_charge_num)
            {
                let chargeCfgInfo = cfg.ChargeCfgData.getInfo(parm);
                if (chargeCfgInfo)
                {
                    var maxBuyCount = chargeCfgInfo.maxBuyCount
                    var leftCount = maxBuyCount;

                    let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
                    if (chargeInfo)
                    {
                        leftCount = maxBuyCount - chargeInfo.buycount;
                    }
                    if (isOpen)
                    {
                        //  特定充值的当前剩余次数（取charge表）   ≥参数
                        return leftCount >= Number(ext);
                    }
                    else
                    {
                        //  特定充值的当前剩余次数（取charge表）   <参数
                        return leftCount < Number(ext);
                    }

                }
            }
            return false;
        }
    }
}