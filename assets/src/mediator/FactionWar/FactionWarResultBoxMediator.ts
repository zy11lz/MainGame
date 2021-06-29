module Pro
{
    /**
    * 界面说明： 公会战-战果宝箱界面
    * @author jason.xu
    */
    export class FactionWarResultBoxMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.FactionWar.FactionWarResultBoxUI;

        /** 已经奖过奖的宝箱列表 */
        private _getBoxMap: ds.StringMap<Pb_God.PBFactionWarBox>;
        /** 当前是否已经领过奖了 */
        private _isGet = false;
        /** 当前是否为胜利宝箱(平局也是拿胜利宝箱类型) */
        private _isWin = true;

        /** 倒计时 */
        private _targetTime: number = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("factionwar")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.FactionWar.FactionWarResultBoxUI, 1, BaseAddLayer.CenterUI, true, 1);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.onTimer);
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
            this.refreshUI();
            this.UIPanel.listView.onRefresh(0, null, null);
            this.UIPanel.txtBoxName.text = ""
            this.UIPanel.txtOpenState.text = "";
            this._targetTime = this.__getOverTime();
            if (this._targetTime != 0)
                FactionSend.queryBoxInfo();
        }

        private onTimer(): void
        {
            let leftTime = this._targetTime - TimeController.currTimer / 1000;
            if (leftTime <= 0)
            {
                Laya.timer.clear(this, this.onTimer);
                leftTime = 0;
                return;
            }
            this.UIPanel.txtOpenState.text = Global.getLangStr("factionwar_msg7", Global.GetRemindTime(leftTime, 4));
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.addEventMgr(CmdEvent.FactionWar_SynBoxInfo, this, this.onSynBoxInfo);
            this.addEventMgr(CmdEvent.FactionWar_OpenBoxPrizeAck, this, this.onOpenBoxPrizeAck);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击帮助说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            let content = Global.getLangStr("factionwar_boxReward_help");
            CommonHelpView.show(btn, content);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {


        }


		/*****
		 *	开启宝箱返回			PBFactionWarBox
		 * @param PBFactionWarBox
		 * 		pos			uint32	宝箱位置1开始
		 * 		index			uint32	宝箱索引
		 * 		playerid			uint32	开启的玩家ID
		 * 		playername			string	开启的玩家名称
		 */
        protected onOpenBoxPrizeAck(value: Pb_God.PBFactionWarBox): void
        {
            this._getBoxMap.put(value.pos, value);
            this.UIPanel.listView.setItem(value.pos - 1, value);
        }

		/*****
		 *	返回所有宝箱信息		PBG2CFactionWarSynBoxInfo
		 * @param PBG2CFactionWarSynBoxInfo
		 * 		totolcount			uint32	总共个数
		 * 		box			PBFactionWarBox	开启过的宝箱
		 */
        protected onSynBoxInfo(value: Pb_God.PBG2CFactionWarSynBoxInfo): void
        {
            this._getBoxMap = Global.listToStringMapData(value.box, "pos");
            //当前是否有宝箱
            let isActive = value.totolcount > 0;
            this.UIPanel.imgListEmpty.visible = !isActive;
            this.UIPanel.boxNameTips.visible = isActive;

            if (!isActive) return;

            //平局或胜利都是拿黄金宝箱。 失败拿青铜宝箱
            this._isWin = value.result != Pb_God._emBattleResult.BattleResult_Fail;
            //当前是否已经领过了
            this._isGet = this.__findSelfBox(value.box);
            this.UIPanel.txtBoxName.text = this._isWin ? Global.getLangStr("factionwar_msg15") : Global.getLangStr("factionwar_msg16"); //公会战荣耀黄金宝箱 : 公会战激励青铜宝箱;
            if (this._isGet)
            {
                this.UIPanel.txtOpenState.text = Global.getLangStr("factionwar_msg17"); // 您已开启过宝箱;
            } else
            {
                Laya.timer.loop(1000, this, this.onTimer);
                this.onTimer();
            }
            this.UIPanel.listView.onRefresh(value.totolcount, this, this.onRefreshListItem);
        }

        /** 取得当前宝箱领奖的最终时间 */
        private __getOverTime(): number
        {
            let currTimer = TimeController.currTimer;
            let dateTimeInfoList = cfg.FactionWarConstCfgData.getPrizeBoxTimeInfoList();
            for (var el of dateTimeInfoList)
            {
                if (el.isInOpenTime(currTimer)) return el.getEndTime(currTimer) / 1000;
            }
            return 0;
        }

        private __findSelfBox(list: Pb_God.PBFactionWarBox[]): boolean
        {
            let playeriD = PlayerDataMgr.uid;
            for (var el of list)
            {
                if (el.playerid == playeriD) return true;
            }
            return false;
        }

        private onRefreshListItem(tempUI: ProUI.FactionWar.ChildView.ResultBoxItemViewUI, index: number): void
        {
            let pos = index + 1;
            let boxInfo = this._getBoxMap.get(pos);
            if (boxInfo)
            {
                let isSelf = boxInfo.playerid == PlayerDataMgr.uid;
                tempUI.txtNickname.text = boxInfo.playername;
                tempUI.txtNickname.color = isSelf ? "#fffced" : "#784720";
                let addItemInfo = cfg.FactionWarBoxPrizeCfgData.getAddItemInfoByIndex(boxInfo.index);
                tempUI.norItem.setItemInfo(addItemInfo, false, true, true);
                tempUI.onClick(null, null);
                tempUI.norItem.visible = true;
                tempUI.winBox.visible = false;
                tempUI.loseBox.visible = false;
                tempUI.txtBg.visible = true;
            } else
            {
                tempUI.txtNickname.text = "";
                tempUI.norItem.visible = false;
                tempUI.txtBg.visible = false;
                tempUI.winBox.visible = this._isWin;
                tempUI.loseBox.visible = !this._isWin;
                tempUI.onClick(this, () =>
                {
                    if (this._isGet)
                    {
                        TipsUtils.showTipsByLanId("tips_msg24");
                        return;
                    }
                    //宝箱领取
                    FactionSend.openBox(pos, 0, 0, "");
                });
            }

        }
    }
}