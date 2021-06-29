module Pro
{
    /**
    * PVP战斗数据统计界面
    * @author jason.xu
    */
    export class BattleFightStatisticsMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.BattleVedio.BattleFightStatisticsUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.BattleVedio.BattleFightStatisticsUI, 1, BaseAddLayer.TopUI,true);
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
            let battlesn: Long = this.UIOpenData.customObject[0];
            if (battlesn == null)
            {
                //第2个参数传的是实际数据
                this.setFightResult(this.UIOpenData.customObject[1]);
            } else
            {
                let isCross: boolean = this.UIOpenData.customObject[1];
                if (isCross)
                {
                    VideoSend.queryDamageDataBW(this.UIOpenData.customObject[2], battlesn);
                } else
                {
                    let videotype = this.UIOpenData.customObject[2] == null ? 0 : this.UIOpenData.customObject[2]
                    VideoSend.queryDamageData(videotype,battlesn);
                }
            }
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnWatch.onClick(this, this.onClickWatch);

            //查询战斗数据返回		PBG2CVideoDamageDataAck
            this.addEventMgr(CmdEvent.Video_QueryDamageDataAck, this, this.onQueryDamageDataAck)
            //查询战斗数据返回		PBG2CVideoDamageDataAck
            this.addEventMgr(CmdEvent.Video_QueryDamageDataBW, this, this.onQueryDamageDataAck)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }


		/*****
		 *查询战斗数据返回		PBG2CVideoDamageDataAck
		 * @param PBG2CVideoDamageDataAck
		 * 		fightResult			PBFightResult	战斗信息
		 */
        protected onQueryDamageDataAck(value: Pb_God.PBG2CVideoDamageDataAck): void
        {
            this.setFightResult(value.fightResult);
        }

        private setFightResult(resultValue: Pb_God.PBFightResult): void
        {
            this.UIPanel.txtNickname1.text = resultValue.base.friend.playerdisplay.playername;
            if (resultValue.heavenresult)// 天界副本
            {
                let heavenCfgInfo = cfg.HeavenStageCfgData.getInfo(resultValue.base.id);
                let content = "";
                if (heavenCfgInfo)// 副本关卡 第X章第X关
                    content = Global.getLangStr("fight_msg38", Global.numberToChinese(heavenCfgInfo.chapter), heavenCfgInfo.stage);//第一章：第1关
                this.UIPanel.txtNickname2.text = content;
            }
            else
                this.UIPanel.txtNickname2.text = resultValue.base.energy.playerdisplay.playername;
            this.UIPanel.imgResultValue.frame = resultValue.result == Pb_God._emBattleResult.BattleResult_Sucess ? 1 : 2;

            this.setPetList(this.UIPanel.listView1, resultValue.friendstate, resultValue.base.friend);
            this.setPetList(this.UIPanel.listView2, resultValue.energystate, resultValue.base.energy);
        }

        /** 设置伙伴列表显示 */
        private setPetList(uiList: component.UIList, stateList: Pb_God.PBPetFightStateInfo[], playerBattleInfo: Pb_God.PBPlayerBattleInfo): void
        {
            let stateInfoMap = Global.listToStringMapData(stateList, "petsn");
            let petList = playerBattleInfo.battlepet.battlepet;
            uiList.onRefresh(petList.length, this, (tempUI: any, index: number) =>
            {
                let petInfo = petList[index];
                this.onRefreshListItem(tempUI, petInfo, stateInfoMap.get(petInfo.pet.display.sn + ""));
            });
        }

        /** 点击观看记录 */
        private onClickWatch(): void
        {
            var resultValue: Pb_God.PBFightResult = this.UIOpenData.customObject;
            VideoSend.playPlayer(Pb_God._emVideoType.VideoType_Challenge, resultValue.base.battlesn, PlayerDataMgr.uid);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }


        /** 刷新单条item */
        private onRefreshListItem(tempUI: ProUI.BattleVedio.ChildView.FightStatisticsPetItemViewUI, petInfo: Pb_God.PBBattlePetInfo, stateValue: Pb_God.PBPetFightStateInfo): void
        {
            // let stateValue = petInfo.petstate;
            tempUI.headView.setPetInfo(petInfo.pet.display, false, false);

            ///////数据字段
            //伤害值
            let damage = stateValue && stateValue.damage ? stateValue.damage.toNumber() : 0;
            //最大血量
            let maxhp = stateValue && stateValue.maxhp ? stateValue.maxhp.toNumber() : 1;
            // //当前血量
            // let curhp = stateValue && stateValue.curhp ? stateValue.curhp.toNumber() : 0;
            //治疗值
            let cure = stateValue && stateValue.cure ? stateValue.cure.toNumber() : 0;
            //防御值
            let defense = stateValue && stateValue.defense ? stateValue.defense.toNumber() : 0;

            ///////UI显示
            //伤害
            tempUI.txtAtk.text = damage + "";
            //承受伤害
            tempUI.txtHit.text = defense + "";
            //治疗
            tempUI.txtCure.text = cure + "";


            Global.setProgressBar(tempUI.imgAtk, damage / maxhp, 90);
            Global.setProgressBar(tempUI.imgHit, defense / maxhp, 90);
            Global.setProgressBar(tempUI.imgCure, cure / maxhp, 90);
        }
    }
}