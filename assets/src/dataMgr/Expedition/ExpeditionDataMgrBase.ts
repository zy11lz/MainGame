
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
	export class ExpeditionDataMgrBase
	{
		/** data */
		protected _data: Pb_God.PBPlayerExpedition;

		/** 血量数据 */
		protected _hpData = new ds.StringMap<number>();

		/**
		 * 自动狩猎地带
		 */
		private _autoExpedition: number = 0;
		/**
		 * 自动狩猎地带倒计时
		 */
		private _expeditionTime: number = 0;
		/**
		 * 自动狩猎地带CD
		 */
		private _expeditionMaxCD: number = 10;

		/** 初始化 */
		public init(data: Pb_God.PBPlayerExpedition)
		{
			if (data == null)
			{
				this._data = new Pb_God.PBPlayerExpedition();
				this._data.prizeid = [];
				this._data.stageinfo = [];
				this._data.usepethp = [];
			}
			else
			{
				this._data = data;
			}
		}

		/** 跨时间 */
		public resetNewDay()
		{
			this._data.curtype = 0;
			this._hpData.clear();
			this._data.prizeid.splice(0, this._data.prizeid.length);
			this._data.stageinfo.splice(0, this._data.stageinfo.length);

			//是否正在远征界面中
			if (UIManager.Inst.getUIMeditorInOpenList(PanelNotify.Open_ExpeditionMain))
			{
				EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 3);
			}
		}

		/** 远征最大通关类型 _emExpeditionType*/
		public getMaxtype(): number
		{
			return this._data.maxtype;
		}

		/** 远征类型 _emExpeditionType*/
		public getCurtype(): number
		{
			return this._data.curtype;
		}
		/** 当前打到的关卡*/
		public getCurstage(): number
		{
			return this._data.curstage;
		}
		/** 所有关卡信息*/
		public getStageinfo(index: number): Pb_God.PBExpeditionTar
		{
			let results = this._data.stageinfo.filter(elment => elment.index == index);
			return results.length > 0 ? results[0] : null;
		}
		/** 当前打的关卡数据*/
		public getBattlepet(): Pb_God.PBBattlePet
		{
			return this._data.battlepet;
		}
		/** 昨日的最大关卡*/
		public getLaststage(): number
		{
			return this._data.laststage;
		}
		/** 获取所有奖励ID */
		public getPrizeIds(): Array<number>
		{
			return this._data.prizeid;
		}
		/** 是否领取的奖励ID*/
		public getPrizeid(indexId: number): boolean
		{
			return this._data.prizeid.indexOf(indexId) >= 0;
		}
		/** 基础战力*/
		public getBasefightpower(): number
		{
			return this._data.basefightpower;
		}

		/** 获取伙伴血量 */
		public getPetHpRate(hero: Net.hero): number
		{
			if (!hero) return 0;
			let tmpMaxValue = Global.getAtterValue(hero.attr, Pb_God._emBattleAttribute.BattleAttribute_HPMax);
			let tmpCurValue = this._hpData.get(hero.sn.toString(0));
			return tmpCurValue != null ? tmpCurValue / tmpMaxValue : 1;
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

		public set autoExpedition(value: number)
		{
			if (value == this._autoExpedition)
				return;
			this._autoExpedition = value;
			GameLaunch.saveClientData();
			this.initAutoExpeditionLoop();
			EventMgr.trigger(EventNotify.Expedition_Auto_State_Change);
		}

		/**
		 * 自动狩猎 1自动 0不自动
		 */
		public get autoExpedition()
		{
			return this._autoExpedition;
		}

		public get expeditionTime()
		{
			return this._expeditionTime
		}

        /**
         * 自动挑战开启倒计时
         */
		public initAutoExpeditionLoop()
		{
			Laya.timer.clear(this, this.loopAutoExpedition);
			if (this._autoExpedition)
			{
				ExpeditionSend.queryPetHp();
				this._expeditionTime = this._expeditionMaxCD;
				Laya.timer.loop(1000, this, this.loopAutoExpedition)
				this.loopAutoExpedition();
			}
		}

		public loopAutoExpedition()
		{
			this._expeditionTime--;
			if (this._expeditionTime <= 0)
			{
				if (BattleMgr.Inst.getWatchBattleType() != Pb_God._emBattleType.BattleType_Expedition)
				{
					let tmpTeamType = Pb_God._emZhenfaType.ZhenfaType_Expedition;
					let buzhenInfo = EmbattleDataMgr.getBuZhenInfo(tmpTeamType)
					if (buzhenInfo)
					{
						let posAry = buzhenInfo.getPosAry();
						let canFight = false;
						for (let i = 0; i < posAry.length; i++)
						{
							if (!posAry[i])
								continue
							let hero = buzhenInfo.getHeroByStorePosInfo(posAry[i]);
							let heroHpRate = ExpeditionDataMgr.getPetHpRate(hero)
							if (heroHpRate > 0)
							{
								canFight = true;
								break;
							}
						}
						if (canFight)
						{
							TipsUtils.showTipsByLanId("ui_Expedition_msg12", this._data.curstage);
							let cientPara = UIManager.Inst.checkUIShowState(PanelNotify.Open_ExpeditionMain, false) ? "" : "1";
							let index = this._data.curstage + (this._data.curtype == 0 ? 1 : this._data.curtype - 1) * 15;
							BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Expedition, index, 0, tmpTeamType, false, cientPara);
						}
						else
						{
							TipsUtils.showTipsByLanId("ui_Expedition_msg11");
							ExpeditionDataMgr.autoExpedition = 0;
						}
					}
					else
					{
						TipsUtils.showTipsByLanId("ui_Expedition_msg10");
						ExpeditionDataMgr.autoExpedition = 0;
					}
				}
				Laya.timer.clear(this, this.loopAutoExpedition);
			}
			else
			{
				EventMgr.trigger(EventNotify.Expedition_Auto_CD, this._expeditionTime);
			}
		}

		/**
		*  用来判断狩猎地带是否可以进入
		*/
		public isConductHunting()
		{
			let tmpCfgList = cfg.ExpeditionStageCfgData.getListWithType(this.getCurtype());
			for (let index = 0; index < tmpCfgList.length / 3; index++)
			{
				for (let i = 0; i < 3; i++)
				{
					let tmpIndex = index * 3 + i;
					let tmpInfo = tmpCfgList[tmpIndex];
					let frame = this.getCurstage() - 1 >= tmpInfo.stageID ? 2 : 1;
					//领奖
					if (i == 2)
					{
						let tmpStageID = cfg.ExpeditionStageCfgData.getStageIDByIndex(tmpInfo.stageID);
						let tmpIsPrized = this.getPrizeid(tmpInfo.index);
						let tmpCanPrize = !tmpIsPrized && this.getCurstage() - 1 >= tmpStageID;
						if (frame != 1)
							frame = tmpCanPrize ? 1 : 2;
					}
					if (frame == 1)
					{
						return true;
					}
				}
			}

			let tmpStageType = ExpeditionDataMgr.getCurtype();
			if (tmpStageType == Pb_God._emExpeditionType.ExpeditionType_Simple)
			{
				TipsUtils.showTipsByLanId("ui_Expedition_msg13", Global.getLangStr("common_difficulty2")); //英雄远征(普通)";
			}
			else if (tmpStageType == Pb_God._emExpeditionType.ExpeditionType_Difficulty)
			{
				TipsUtils.showTipsByLanId("ui_Expedition_msg13", Global.getLangStr("common_difficulty3")); //英雄远征(困难)";
			}
			else if (tmpStageType == Pb_God._emExpeditionType.ExpeditionType_Hell)
			{
				TipsUtils.showTipsByLanId("ui_Expedition_msg13", Global.getLangStr("common_difficulty4")); //英雄远征(地狱)";
			}

			return false;

		}
	}
}
