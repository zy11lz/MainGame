
/**
*
*
* 保存服务器的发送的数据
*
*  1.socket读取二进制数据----》
*  2.二进制数据转换为proto-------》
*  3.抛出协议事件 -------》
*  4.各个系统的dataMgr侦听事件，接收并保存服务器发过来的数据 ------》
*  5.dataMgr抛出数据整理好的CmdEvent事件  -------》
*  6.各个ui侦听CmdEvent事件，向各个系统的dataMgr提供的方法接口获取最新的数据，更新ui显示
*
*  ui不负责直接侦听服务器数据事件， 也不负责保存服务器数据，
*  由各个系统的dataMgr统一管理
*
*/

module Pro
{
	export class TeamCampaignDataMgrBase
	{
		/** data */
		protected _data: Pb_God.PBPlayerTeamCampaign;

		/** 血量数据 */
		protected _hpData = new ds.StringMap<Pb_God.PBTeamCampaignPetState>();

		/** 通过的最大难度 */
		protected _maxDiff = 1;

		/** 关卡数据 */
		protected _stageInfo = new Array<Pb_God.PBG2CTeamCampaignTarget>();


		/**自动遗迹之谷 */
		private _autoTeamCampaign: number = 0;
		/**自动遗迹之谷倒计时 */
		private _teamCampaignTime: number;
		/**自动遗迹之谷倒计时CD */
		private _teamCampaignMaxCD: number = 10;

		/** 初始化 */
		public init(data: Pb_God.PBPlayerTeamCampaign)
		{
			this._data = data;
			this._hpData = Global.listToStringMapData(this._data.petstate, "sn");

			this.refreshMaxDiff();

			this._stageInfo.splice(0, this._stageInfo.length);
		}

		/** 跨时间 */
		public resetNewDay()
		{
			this._data.difficulty = 1;
			this._hpData.clear();
			this._data.extraprize.splice(0, this._data.extraprize.length);
			this._data.stagestate.splice(0, this._data.stagestate.length);
			this._stageInfo.splice(0, this._stageInfo.length);

			//是否正在组队界面中
			if (UIManager.Inst.getUIMeditorInOpenList(PanelNotify.Open_TeamCampaignMain))
			{
				EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 3);
			}
		}

		/** 刷新最大难度 */
		protected refreshMaxDiff(): void
		{
			this._maxDiff = 1;
			for (let i = 0; i < this._data.passed.length; i++)
			{
				if (this._data.passed[i] >= this._maxDiff)
				{
					this._maxDiff = this._data.passed[i] + 1;
				}
			}

			let arr = cfg.TeamCampaignStageCfgData.getDataList();
			let lastData = arr[arr.length - 1];
			this._maxDiff = Math.min(lastData.difficulty, this._maxDiff);
		}

		/** 远征最大通关类型 _emExpeditionType*/
		public getMaxtype(): number
		{
			return this._maxDiff;
		}

		/** 远征类型 _emExpeditionType*/
		public getCurtype(): number
		{
			return this._data.difficulty;
		}
		/** 当前打到的关卡*/
		public getCurstage(): number
		{
			return this._data.stage;
		}
		/** 所有关卡信息*/
		public getStageinfo(index: number): Pb_God.PBG2CTeamCampaignTarget
		{
			let results = this._stageInfo.filter(elment => elment.stage == index);
			return results.length > 0 ? results[0] : null;
		}

		/** 获取当前关卡怪物总血量百分比 */
		public getCurStageHpPercent(): number
		{
			let cfgInfo = cfg.TeamCampaignStageCfgData.getInfoByDoubleKey(this.getCurtype(), this.getCurstage());
			if (!cfgInfo) { return 1; }
			let curIndex = cfgInfo.index;
			let stageInfo = this.getStageinfo(curIndex);
			if (!stageInfo) { return 1; }
			let curHp = 0;
			let maxHp = 0;
			for (let petdisplay of stageInfo.petdisplay)
			{
				curHp += petdisplay.curhp.toNumber();
				maxHp += petdisplay.maxhp.toNumber();
			}
			return maxHp > 0 ? curHp / maxHp : 1;
		}

		/** 获取加成buff技能 */
		public getBuffSkillIds(): Array<number>
		{
			return this._data.skill;
		}

		/** 判断当前是否还有未选择的BUFF，如果有，则弹窗选择 */
		public checkBuffPrize(): void
		{
			if (!this._data || !this._data.extraprize) { return; }
			if (this._data.extraprize.length < 3) { return; }

			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TeamCampaignReward, this._data.extraprize));
		}

		/** 获取伙伴血量百分比 */
		public getPetHpRate(hero: Net.hero): number
		{
			if (!hero) { return 0; }
			let hpData = this._hpData.get(hero.sn.toString(0));
			if (!hpData) { return 1; }
			let tmpMaxValue = hpData.maxhp.toNumber();
			let tmpCurValue = hpData.curhp.toNumber();
			return tmpCurValue / tmpMaxValue;
		}



		public set autoTeamCampaign(value: number)
		{
			if (value == this._autoTeamCampaign)
			{ return; }
			this._autoTeamCampaign = value;
			GameLaunch.saveClientData();
			this.initAutoTeamCampaignLoop();
			EventMgr.trigger(EventNotify.TeamCampaign_Auto_State_Change);
		}

		public get autoTeamCampaign()
		{
			return this._autoTeamCampaign;
		}

		public get teamCampaignTime()
		{
			return this._teamCampaignTime
		}

		/**
		 * 自动遗迹之谷开启倒计时
		 */
		public initAutoTeamCampaignLoop()
		{
			Laya.timer.clear(this, this.loopAutoTeamCampaign);
			if (this._autoTeamCampaign)
			{
				this._teamCampaignTime = this._teamCampaignMaxCD;
				Laya.timer.loop(1000, this, this.loopAutoTeamCampaign)
				this.loopAutoTeamCampaign();
			}
		}

		public loopAutoTeamCampaign()
		{
			this._teamCampaignTime--;
			if (this._teamCampaignTime <= 0)
			{
				this.autoFight();
				Laya.timer.clear(this, this.loopAutoTeamCampaign);
			}
			else
			{
				EventMgr.trigger(EventNotify.TeamCampaign_Auto_CD, this._teamCampaignTime);
			}
		}

		public autoFight(autoSelectBuff: boolean = true)
		{
			if (this._data && this._data.extraprize && this._data.extraprize.length >= 3)
			{
				if (autoSelectBuff)
				{
					let num = this._data.extraprize.length;
					TeamCampaignSend.selectExtraPrize(Global.getRandomNum(0, num));
				}

				let curStage = this.getCurstage();
				let index = (this.getCurtype() - 1) * 10 + curStage;
				let tmpBuzhen = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);
				let tmpFixPosAry = cfg.TeamCampaignStageCfgData.getFixPosAryById(index);
				if (tmpFixPosAry && tmpFixPosAry.length > 0)
				{
					tmpBuzhen.switchzhenfaWithPos(tmpFixPosAry);
				}
				let cientPara = UIManager.Inst.checkUIShowState(PanelNotify.Open_TeamCampaignMain, false) ? "" : "1";
				BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_TeamCampaign, index, tmpBuzhen.getZhenfaId(), tmpBuzhen.getTeamType(), false, cientPara);
			}
		}

		// /** 查询雇佣的好友列表 */
		// public getSupportFriends(): number[] {
		// 	return this._data.support;
		// }
		// /** 跟据好友ID，查询是否有雇佣英雄 */
		// public getIsSupport(friendId: number): boolean {
		// 	let suppert = this._data.support;
		// 	if (!suppert) return false;
		// 	if (suppert.indexOf(friendId) >= 0) return true;
		// 	return false;
		// }

		// /** 跟据好友ID，查询是否有使用过雇佣英雄 */
		// public getIsUseSupport(friendId: number): boolean {
		// 	let usedsupport = this._data.usedsupport;
		// 	if (!usedsupport) return false;
		// 	if (usedsupport.indexOf(friendId) >= 0) return true;
		// 	return false;
		// }
	}
}
