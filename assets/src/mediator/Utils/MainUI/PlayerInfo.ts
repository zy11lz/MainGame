
module Pro
{
    /**
     * 左上角按钮集合
     */
    export class PlayerInfo extends ProUI.Scene.City.Utils.PlayerInfoUI
    {
        constructor()
        {
            super();

            this.on(Laya.Event.DISPLAY, this, () =>
            {
                this.controllEvents(false);
            });
            this.adjustScreenPos();
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
                EventNotify.PlayerItemNumChange, this, this.onItemNumChange,
                EventNotify.PlayerLevelChange, this, this.onPlayerLevelChange,
                EventNotify.System_Switch_Open_Update, this, this.onUpdateSystemSwitch,
                EventNotify.VIP_Level_Changed, this, this.refreshVipLevel,
                EventNotify.PlayerChangeResUI, this, this.onPlayerChangeResUI,
                EventNotify.PlayerFightPowerChange, this, this.onPlayerFightPowerChange,
                EventNotify.Shape_Base_Update, this, this.refreshHeadIcon,
                CmdEvent.Common_PlayerRenameAck, this, this.onCommonRenameAck,
                EventNotify.Award_Effect_Fly, this, this.awardEffectFly,
                EventNotify.Screen_Resize, this, this.adjustScreenPos
            ]
        }

        //--------------------------------------Event Fun---------------------------------
        /** 初始化 */
        public init()
        {
            this.addEvent();
        }
        //-----------------------------------红点------------------------------------
        private _reddotBindCtl: ReddotBindImageController = new ReddotBindImageController();
        /** 将红点图片与红点数据模型关联 */
        private initRedDotModel(): void
        {
            this.unInitRedDotModel();
            this._reddotBindCtl.bind(this.goldReddot, WealDataMgr.reddotModelClickGold);
        }

        private adjustScreenPos()
        {
            this.topBg.height = GameConfig.getBangsTop() + this.topBg.height;
        }

        private unInitRedDotModel(): void
        {
            this._reddotBindCtl.cleanUp();
        }

        public refreshUI()
        {
            Laya.timer.frameOnce(1, this, () =>
            {
                this.initRedDotModel();
                this.refreshAllItemNum();
                this.refreshVipLevel();
            });
        }

        private addEvent(): void
        {
            this.PlayerIconImg.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PlayerInfoHomeSelf));
            });
            this.Res_Diamond_Btn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMain, 0));
            })
            this.Res_Gold_Btn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ClickGold));
            });
            this.Res_Exp_Btn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemAccess, CfgID.ItemID.PetExp));
            });

            this.vipIcon.on(Laya.Event.CLICK,this,()=>{
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMain,1));
            })
        }

        /** 刷新头像 */
        private refreshHeadIcon(): void
        {
            //头像框                   
            Global.setResIconWithItemID(this.PlayerIconImg, CfgID.ResType.Player_Icon, ShapeDataMgr.iconId);
            Global.setResHeadBorder(this.PlayerIconFrameImg, ShapeDataMgr.iconFrameID);
        }

        /** 刷新道具的个数 */
        private refreshTroopNum(troopID: number)
        {
            let tempTroopNum = Global.getItemNum(troopID);
            if (troopID == CfgID.ItemID.Gold)
            {
                this.Res_Gold_Lb.text = Global.numberToTuckString(tempTroopNum);
            }
            else if (troopID == CfgID.ItemID.Diamond)
            {
                this.Res_Diamond_Lb.text = Global.numberToTuckString(tempTroopNum);
            }
            else if (troopID == CfgID.ItemID.PetExp)
            {
                this.Res_Exp_Lb.text = Global.numberToTuckString(tempTroopNum);
            }
            else if (troopID == CfgID.ItemID.Exp)
            {
                Global.setProgressBarMask(this.ExpProImg, tempTroopNum / cfg.PlayerLevelCfgData.getNeedExpByLevel(PlayerDataMgr.level))
                this.PlayerLvLb.text = PlayerDataMgr.level + "";
            }
        }

        /** 刷新玩家当前所有道具显示 */
        private refreshAllItemNum()
        {
            this.refreshTroopNum(CfgID.ItemID.Gold);
            this.refreshTroopNum(CfgID.ItemID.Diamond);
            this.refreshTroopNum(CfgID.ItemID.Exp);
            this.refreshTroopNum(CfgID.ItemID.PetExp);
            this.onPlayerChangeResUI(null);
            this.onPlayerFightPowerChange();
            this.PlayerNameLb.text = PlayerDataMgr.name;
            this.Res_Gold_BtnIcon.visible = PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.ClickGold);
            this.refreshHeadIcon();
        }

        /** 刷新单个道具个数 */
        private onItemNumChange(fID: number, tempNewNum: number)
        {
            this.refreshTroopNum(fID);
        }

        /** 刷新开关 */
        private onUpdateSystemSwitch(systemId: number)
        {
            if (systemId == emSystemSwitchType.ClickGold)
            {
                this.Res_Gold_BtnIcon.visible = PlayerDataMgr.checkSystemSwitchOpen(systemId);
            }
        }

        /** 刷新等级 */
        private onPlayerLevelChange(tempNum: number, tempNewNum: number)
        {
            this.PlayerLvLb.text = PlayerDataMgr.level + "";
        }

        /** 刷新VIP等级 */
        private refreshVipLevel(): void
        {
            let vipLv = PrivilegeDataMgr.vipLevel;
            this.txtVipLv.text = vipLv.toString();
        }

        /** 刷新战斗力 */
        private onPlayerFightPowerChange()
        {
            this.PlayerPowerLb.text = PlayerDataMgr.fightPower.toString();
        }

        /** 切换资源UI显示 */
        private onPlayerChangeResUI(panelName: string)
        {
            this.Res_Exp_Btn.visible = panelName == PanelNotify.Open_HeroDetail;
            this.Res_Diamond_Btn.visible = panelName != PanelNotify.Open_HeroDetail;
            this.Res_Exp_Lb.visible = this.Res_Exp_Btn.visible;
            this.Res_Diamond_Lb.visible = this.Res_Diamond_Btn.visible;
        }

        /** 刷新名称 */
        private onCommonRenameAck()
        {
            this.PlayerNameLb.text = PlayerDataMgr.name;
            //改名的同时，性别可能会修改， 刷新头像
            this.refreshHeadIcon();
        }

        /**
         * 奖励动画
         * @param itemIndo 奖励信息
         * @param startPos 
         */
        private awardEffectFly(itemInfo: any, startPos: Laya.Point)
        {
            let endPos;
            switch (itemInfo.itemid) 
            {
                case CfgID.ItemID.Gold:
                    endPos = this.GoldImg.localToGlobal(new Laya.Point(this.GoldImg.width / 2, this.GoldImg.height / 2));
                    break;
                case CfgID.ItemID.Diamond:
                    endPos = this.DiamondImg.localToGlobal(new Laya.Point(this.DiamondImg.width / 2, this.DiamondImg.height / 2));
                    break;
            }
            if (endPos)
            {
                Pro.EffectAni.Inst.showEff_Reward_Fly(startPos, endPos, itemInfo);
            }

        }
    }
}