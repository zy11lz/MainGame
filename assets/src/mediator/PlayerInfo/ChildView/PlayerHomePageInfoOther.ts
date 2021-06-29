module Pro
{
    /**
    * 查看其它玩家个人空间界面： 个人信息分页
    * @author jason.xu
    */
    export class PlayerHomePageInfoOther extends ProUI.PlayerInfo.PageView.HomePageInfoOtherUI implements ITableView
    {

        private _playerViewData: Pb_God.PBPlayerView;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        public addEvent(): void
        {
            this.btnFansHelp.onClick(this, this.onClickFansHelp);
            this.btnAddFriend.onClick(this, this.onClickAddFriend);
            this.btnCancelFans.onClick(this, this.onClickCancelFans);
            this.btnComplain.onClick(this, this.onClickComplain);
            this.btnFans.onClick(this, this.onClickFans);
            this.btnPrivateChat.onClick(this, this.onClickPrivateChat);
        }

        public removeEvent(): void
        {

        }


        /** 点击粉丝帮助按钮 */
        private onClickFansHelp(): void
        {
            this.fansHelpView.visible = true;
            let fansRank = 0;  //当前粉丝排名 temp tag:jason
            this.txtFansHelpRank.text = Global.getLangStr("playerinfo_msg1") + (fansRank == 0 ? Global.getLangStr("common_norank") : fansRank + "");
            let iconFrameId = 1;   //众星捧月的边框ID， 待正式配置之后修改  tag:jason
            this.txtFansPrizeName.text = cfg.ShapeHeadIconCfgData.getNameByID(iconFrameId);
            Global.setResHeadBorder(this.imgFansPrizeFrame, iconFrameId);
            Laya.stage.once(Laya.Event.MOUSE_DOWN, this, () =>
            {
                this.fansHelpView.visible = false;
            })
        }

        /** 点击关注按钮  */
        private onClickFans(): void
        {
            //待服务器功能完成 tag:jason
            //...
        }

        /** 取消关注按钮 */
        private onClickCancelFans(): void
        {
            //待服务器功能完成 tag:jason
            //...
        }


        /** 加为好友按钮 */
        private onClickAddFriend(): void
        {
            FriendDataMgr.requestApplyFriend(this._playerViewData.playerdisplay.playerid);
        }
        /** 举报按钮 */
        private onClickComplain(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PlayerComplain, this._playerViewData.playerdisplay));
        }

        /** 私聊按钮 */
        private onClickPrivateChat(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Chat, [Pb_God._emBroadcast_Channel.BroadcastChannel_Player, this._playerViewData.playerdisplay]), BaseBackUIType.CloseBackUI);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {
            this._playerViewData = $data;
            let playerdisplay = this._playerViewData.playerdisplay;
            //当前省份显示
            this.refreshCityView(playerdisplay.province, playerdisplay.city);

            this.txtNickname.text = playerdisplay.playername;
            this.txtLv.text = playerdisplay.level + "";
            this.txtFaction.text = this._playerViewData.factionname || Global.getLangStr("faction_none");
            this.txtFans.text = "0";  //粉丝数 待服务器完成后处理 tag:jason
            let danId = this._playerViewData.commondisplay.danid;
            this.txtGrade.text = cfg.DanUpgradeCfgData.getDanNameByDanID(danId);
            //头像框                   
            Global.setResIconWithItemID(this.imgHead, CfgID.ResType.Player_Icon, playerdisplay.head);
            Global.setResHeadBorder(this.imgHeadBorder, playerdisplay.headicon);

            //伙伴列表
            this.listHeros.visible = true;
            let petList = this._playerViewData.petdisplay;
            this.listHeros.onRefresh(petList.length, this, (tempUI: Pro.NorItemUI, index: number) =>
            {
                let petData = petList[index];
                tempUI.setPetInfoExtend(petData, true, playerdisplay);
            });

            //按钮状态
            //是否为好友
            let isFriend = !!FriendDataMgr.getFriendInfo(playerdisplay.playerid);
            this.btnAddFriend.visible = !isFriend;
            this.btnPrivateChat.visible = isFriend;
            //是否已加关注
            let isFans = false;
            this.btnFans.visible = !isFans;
            this.btnCancelFans.visible = isFans;
        }

        /** 刷新当前省份显示 */
        private refreshCityView(province: number, city: number): void
        {
            let cfgProvince = cfg.ShapeProvinceCfgData.getCfgInfoByDoubleIndex(province, city);
            if (!cfgProvince)
            {
                //城市未选时，默认拿第一个城市来读取省份名字， 城市名显示未设置
                cfgProvince = cfg.ShapeProvinceCfgData.getCityListByProvince(province)[0];
                this.txtCityName.text = cfg.ShapeProvinceCfgData.getCityNameByIndex(0);  //未设置
            } else
            {
                this.txtCityName.text = cfgProvince.cityName;
            }
            this.txtProveinceName.text = cfgProvince.proveinceName;
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

    }
}