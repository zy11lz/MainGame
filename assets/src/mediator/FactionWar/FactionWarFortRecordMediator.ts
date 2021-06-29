module Pro
{
    /**
    * 界面说明：公会战-据点防守记录界面  
    * @author jason.xu
    */
    export class FactionWarFortRecordMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.FactionWar.FactionWarFortRecordUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("factionwar")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.FactionWar.FactionWarFortRecordUI, 1);
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
            this.UIPanel.listView.visible = false;
            // 先隐藏掉基础显示，等有数据时再显示出来
            this.UIPanel.listPetView.visible = false;
            let playerid = this.UIOpenData.customObject;
            //请求对方信息
            FactionSend.queryMemberInfo(playerid, 0, 0, 0);
            //请求据点防守记录列表
            FactionSend.queryTarRecord(playerid, 0, 0);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.addEventMgr(CmdEvent.FactionWar_QueryTarRecordLog, this, this.onQueryTarRecordLog);
            this.addEventMgr(CmdEvent.FactionWar_QueryMemberInfoAck, this, this.onQueryMemberInfoAck);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }


		/*****
		 *	返回查询成员信息		PBG2CFactionWarMemberInfoAck
		 * @param PBG2CFactionWarMemberInfoAck
		 * 		battledisplay			PBBattleDisplay	帮派显示
		 * 		beattackstar			uint32	被攻打星数
		 * 		sucdefensecount			uint32	成功防御次数
		 * 		toldefensecount			uint32	据点被挑战次数
		 */
        protected onQueryMemberInfoAck(value: Pb_God.PBG2CFactionWarMemberInfoAck): void
        {
            let battledisplay = value.battledisplay;
            this.UIPanel.txtFightValue.text = battledisplay.fightpower + "";
            this.UIPanel.txtEmbattleName.text = cfg.PetFormationCfgData.getNameByID(battledisplay.zhenfaid);
            Global.setResPetZhengfa(this.UIPanel.imgEmbattleIcon, battledisplay.zhenfaid);
            //上阵英雄列表
            let heros = battledisplay.petdisplay;
            this.UIPanel.listPetView.visible = true;
            this.UIPanel.listPetView.onRefresh(heros.length, this, (norItem: NorItemUI, indexPet: number) =>
            {
                let petData = heros[indexPet];
                norItem.setPetInfo(petData, false, false);
            })
        }

		/*****
		 *	返回查询目标防御记录	PBG2CFactionWarTarRecordAck
		 * @param PBG2CFactionWarTarRecordAck
		 * 		tarplayerid			uint32	目标ID
		 * 		record			PBFactionWarRecord	防御记录
		 */
        protected onQueryTarRecordLog(value: Pb_God.PBG2CFactionWarTarRecordAck): void
        {
            let list = value.record;
            this.UIPanel.imgListEmpty.visible = list.length == 0;
            this.UIPanel.listView.visible = true;
            this.UIPanel.listView.onRefresh(list.length, this, (tempUI: ProUI.FactionWar.ChildView.FortRecordItemViewUI, index: number) =>
            {
                let data = list[index];
                let battledisplay: Pb_God.PBBattleDisplay = data.battledisplay;
                let playerdisplay = data.playerdisplay; //battledisplay.playerdisplay
                tempUI.txtAttackName.text = Global.getLangStr("factionwar_msg9") + playerdisplay.playername;
                tempUI.txtTime.text = Global.getFullTimeString(data.time * 1000);
                let strDifficulty = Global.getLangStr("common_difficulty" + data.star);
                tempUI.txtDifficulty.text = Global.getLangStr("common_bracket", strDifficulty);
                let isWin = data.result == Pb_God._emBattleResult.BattleResult_Sucess;
                tempUI.txtResult.text = isWin ? Global.getLangStr("champ_bat_result0") : Global.getLangStr("champ_bat_result1");
                tempUI.txtResult.color = isWin ? "#009e00" : "#d76601";
                tempUI.txtEmbatle.text = cfg.PetFormationCfgData.getNameByID(battledisplay.zhenfaid || 1);
                tempUI.txtFightValue.text = Global.getLangStr("common_fightPower") + battledisplay.fightpower;
                //上阵英雄列表
                let heros = battledisplay.petdisplay;
                tempUI.listPetView.onRefresh(heros.length, this, (norItem: NorItemUI, indexPet: number) =>
                {
                    let petData = heros[indexPet];
                    norItem.setPetInfo(petData, false, false);
                })
                tempUI.btnWatch.onClick(this, () =>
                {
                    //查看录像
                    VideoSend.playBW(Pb_God._emVideoType.VideoType_FactionWar, data.battlesn);

                    // VideoSend.playPlayer(Pb_God._emVideoType.VideoType_FactionWar, data.battlesn, 0);
                })
            });
        }
    }
}