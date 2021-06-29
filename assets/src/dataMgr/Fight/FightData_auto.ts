
/**
*
*  根据 proto 文件自动生成的代码
*
* 【**不可手动修改此类**】，
*
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的proto文件】
*
* @author liuYang.AutoCreater
*
*/

module Pro
{
	export class FightData_auto extends FightDataMgrBase
	{
		constructor()
		{
			super()
			//通用失败返回
			EventMgr.on(Cmd.S2C_Fight_Common_Ack.cmdName, this, this.onCommon_Ack)
			//普通战斗返回			PBFightBase
			EventMgr.on(Cmd.S2C_Fight_NormalBegin_Ack.cmdName, this, this.onNormalBegin_Ack)
			//普通战斗结果			PBFightResult
			EventMgr.on(Cmd.S2C_Fight_NormalResult_Ack.cmdName, this, this.onNormalResult_Ack)
			//加载正在进行的战斗	PBFightResult
			EventMgr.on(Cmd.S2C_Fight_LoadIng.cmdName, this, this.onLoadIng)
			//无尽继续返回			PBFightResult
			EventMgr.on(Cmd.S2C_Fight_EndlessContinue_Ack.cmdName, this, this.onEndlessContinue_Ack)
		}
		/*****
		 *通用失败返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{

		}
		/*****
		 *普通战斗返回			PBFightBase
		 * @param PBFightBase
		 * 		battlesn			uint64	流水ID
		 * 		battletype			uint32	战斗类型_emBattleType
		 * 		id			uint32	挑战ID
		 * 		param			uint32	参数
		 * 		randid			uint32	随机种子
		 * 		begintime			uint32	开始时间
		 * 		maxround			uint32	最大回合
		 * 		friend			PBPlayerBattleInfo	伙伴
		 * 		energy			PBPlayerBattleInfo	敌方
		 * 		playback			PBFightPlayback	战斗回放
		 * 		num			uint32	同一对手的第几次战斗
		 * 		clientparam			string	客户端参数
		 * 		serverparam			uint32	服务器参数
		 */
		protected onNormalBegin_Ack(value: Pb_God.PBFightBase): void
		{
			if (this.checkFightData(value) == false)
			{
				TipsUtils.showTipsByLanId("战斗系统异常，稍后在试");
				return;
			}
			let tmpInfo = BattleMgr.Inst.getBatPlaceMgr(value.battletype);
			if (tmpInfo == null)
			{
				let hidestate = 0;
				if (value.clientparam)
				{
					// let isHide = .indexOf("hide") >= 0;
					hidestate = parseInt(value.clientparam);
				}

				this.specialAtkByGuide(value);

				BattleMgr.Inst.enterBat(value, false, hidestate);
			}
			else
			{
				//刷新无尽试炼状态
				if (value.battletype == Pb_God._emBattleType.BattleType_Endless && tmpInfo.getFinishStageTimes() == 0)
				{
					//刷新数据
					tmpInfo.setBattleInfo(value);
					//我方角色停止移动后触发战斗
					let tmpRoleList = tmpInfo.getRoleMgr().getRolesWithType(true);
					if (tmpRoleList.length > 0)
					{
						tmpRoleList[0].setFightStartNode();
					}
				}
				else
				{
					tmpInfo.setBattleInfo(value);
					tmpInfo.startBattle();
				}
			}
		}

		/**
		 * 特殊处理第一场皮卡丘战斗 释放大招
		 * @param value
		 */
		private specialAtkByGuide(value: Pb_God.PBFightBase)
		{
			if (GuideMgr.Inst.getGuideStatue() && GuideMgr.Inst.getInStep() == GuideStep.FirstFight_4_5)
			{
				if (value.playback.rounds[2] == null)
				{
					return;
				}
				let arr = value.playback.rounds[2].unitacts[1].actions;
				let skillindex = 517;// 需要先更新外网，  外网没有这个配置， 先写死 cfg.ConstantCfgData.getConstantValueByIndex(73)//508;
				for (let i = 0; i < arr.length; i++)
				{
					let info = arr[i];
					info.actionskill && (info.actionskill.skillindex = skillindex);
					info.actionattack && (info.actionattack.skillindex = skillindex);
					info.actionhp && (info.actionhp.skillindex = skillindex);
				}
			}
		}
		/*****
		 *普通战斗结果			PBFightResult
		 * @param PBFightResult
		 * 		base			PBFightBase	战斗公共
		 * 		round			uint32	回合数
		 * 		result			uint32	战斗结果 _emBattleResult
		 * 		endtime			uint32	战斗结束时间
		 * 		friendstate			PBPetFightStateInfo	友方状态
		 * 		energystate			PBPetFightStateInfo	敌方状态
		 * 		prize			PBItemInfo	战斗奖励
		 * 		achieve			PBU32U32	成就数据(服务器用)
		 * 		challengeresult			PBFightChallengeResult	竞技场战斗结果
		 * 		danresult			PBFightDanResult	超凡段位赛结果
		 * 		ladderresult			PBFightLadderResult	跨服天梯结果
		 * 		friendartifactstate			PBPetFightStateInfo	我发神器状态
		 * 		enemyartifactstate			PBPetFightStateInfo	敌方神器状态
		 * 		heavenresult			PBFightHeavenResult	天界副本结果
		 * 		crosschallengeresult			PBFightCrossChallengeResult	跨服竞技场战斗结果
		 */
		protected onNormalResult_Ack(value: Pb_God.PBFightResult): void
		{
			let pbFightResult = value;
			//有几个在战斗里面引导的， 玩家没有操作时，战斗退出来了，就需要把对应的引导往下走走。
			GuideMgr.Inst.checkStepAndNextActive(GuideStep.Artifact_16_10, GuideStep.Simply_BattleSpeed);
			//战斗结算的消息较迟，功能开放引导已经开启了，就不要弹窗了。
			if (GuideMgr.Inst.getInFuncGuide(false) && GuideMgr.Inst.getShowGuide())
			{
				return;
			}
			if (pbFightResult.base == null)
			{
				GameLaunch.PostClientLog("PBFightResult.base 为空， 服务器查一下吧，PBFightResult.round" + pbFightResult.round)
				return;
			}

			let battleType = pbFightResult.base.battletype;
			// 天界副本没有战斗完毕则不弹出结算界面
			if (battleType == Pb_God._emBattleType.BattleType_HeavenDungeon && !pbFightResult.heavenresult)
			{
				// 防止战斗播放完毕仍然显示跳过提示弹窗
				UIManager.Inst.closeByName(PanelNotify.Open_Alert);
				return;
			}
			if (battleType == Pb_God._emBattleType.BattleType_CrossChallege && !pbFightResult.crosschallengeresult)
			{
				CrossChallengeDataMgr.result.push(pbFightResult.result == 0);
				// 防止战斗播放完毕仍然显示跳过提示弹窗
				UIManager.Inst.closeByName(PanelNotify.Open_Alert);
				return;
			}
			if (battleType == Pb_God._emBattleType.BattleType_TeamCampaign)
			{
				//遗迹之谷
				if (TeamCampaignDataMgr.autoTeamCampaign > 0 && !UIManager.Inst.checkUIShowState(PanelNotify.Open_TeamCampaignMain, false))
				{
					let isWin = pbFightResult.result == Pb_God._emBattleResult.BattleResult_DefenseSuc || pbFightResult.result == Pb_God._emBattleResult.BattleResult_Sucess;
					if (isWin)
					{
						TipsUtils.showTipsByLanId("teamCampaign_msg12", pbFightResult.base.id);
					}
					else
					{
						TipsUtils.showTipsByLanId("teamCampaign_msg13", pbFightResult.base.id);
					}
					return;
				}
			}

			if (battleType == Pb_God._emBattleType.BattleType_Expedition)
			{
				if (ExpeditionDataMgr.autoExpedition > 0)
				{
					if (UIManager.Inst.checkUIShowState(PanelNotify.Open_ExpeditionMain, false) && pbFightResult.base.id % 15 != 0)
					{
						//正在看 要打开这个界面
						let curType = ExpeditionDataMgr.getCurtype();
						let index = ExpeditionDataMgr.getCurstage() + (curType == 0 ? 1 : ExpeditionDataMgr.getCurtype() - 1) * 15;
						UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionFight, index));
					}
					//狩猎地带
					let isWin = pbFightResult.result == Pb_God._emBattleResult.BattleResult_DefenseSuc || pbFightResult.result == Pb_God._emBattleResult.BattleResult_Sucess;
					if (!isWin)
					{
						TipsUtils.showTipsByLanId("ui_Expedition_msg7", pbFightResult.base.id)
						//打输了要关掉自动挑战
						ExpeditionDataMgr.autoExpedition = 0;
					}
					else
					{
						//判断是不是都打完了  打完了弹个提示去领奖
						if (pbFightResult.base.id % 15 == 0)
						{
							TipsUtils.showTipsByLanId("ui_Expedition_msg8")
							ExpeditionDataMgr.autoExpedition = 0;
						}
						else
						{
							//没打完要继续打
							ExpeditionDataMgr.initAutoExpeditionLoop();
						}
					}
					return;
				}
			}

			//无尽试炼战斗结束
			if (battleType == Pb_God._emBattleType.BattleType_Endless)
			{
				if (pbFightResult.result == Pb_God._emBattleResult.BattleResult_Sucess)
				{
					TrainDataMgr.saveEndlessCurBattlePrize(pbFightResult.prize);
					if (TrainDataMgr.getEndlessBuffgroup() > 0/* && TrainDataMgr.getEndlessSkillIndex() == -1*/)
					{
						logI("endless choice buff");
						BattleMgr.Inst.initAutoEndlessTowerLoop();
					}
					else
					{
						let tmpInfo = BattleMgr.Inst.getBatPlaceMgr(battleType);
						if (tmpInfo && tmpInfo.getBattleID() < cfg.TrainEndlessCfgData.getMaxStage()) //还有下一关则继续，没有了就退出
						{
							SkelAniInit.recyleSpine();
							FightSend.endlessContinue(Pb_God._emBattleType.BattleType_Endless, tmpInfo.getBattleID() + 1);
							BattleMgr.Inst.autoEndlessTower && TipsUtils.showTipsByLanId("ui_EndlessTower_auto_tips1", tmpInfo.getBattleID() + 1);
						}
						else
						{
							TipsUtils.showTipsByLanId("hook_msg13");
						} //通关了
					}
				}
				else
				{ //战斗失败
					//异常处理，前端认为战斗还未结束，但服务器觉得失败了，在这里再检查一次并且退出战斗
					let tmpInfo = BattleMgr.Inst.getBatPlaceMgr(battleType);
					if (tmpInfo)
					{
						let battleID = Math.max(0, tmpInfo.getBattleID());
						TipsUtils.showTipsByLanId("ui_EndlessTower_auto_tips2", battleID);
						logE("endless fight result error!");
						tmpInfo.endBattle(true, false);
					}

					// BattleMgr.Inst.autoEndlessTower = 0;
					//弹出战斗结束（胜利和失败都弹胜利界面）
					let tmpItemResults = TrainDataMgr.getEndlessCurBattlePrize(true);
					if (tmpItemResults.length > 0)
					{
						UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleWin, pbFightResult));
					}

				}
			}
			else if (battleType == Pb_God._emBattleType.BattleType_Challenge)
			{
				if (ChallengeDataMgr.autoSkip)
				{
					if (pbFightResult.result == Pb_God._emBattleResult.BattleResult_Sucess)
					{
						TipsUtils.showTipsByLanId("fight_msg57");
					}
					else
					{ TipsUtils.showTipsByLanId("fight_msg58"); }

					if (pbFightResult.prize)
					{
						for (var index = 0; index < pbFightResult.prize.length; index++)
						{
							Pro.TipsUtils.showItemTips(pbFightResult.prize[index].itemid, pbFightResult.prize[index].itemcount.toNumber());
						}
					}

				}
				else
				{ UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ChallengeBattleResult, pbFightResult)); }
			}
			else if (battleType == Pb_God._emBattleType.BattleType_Ladder)
			{ //天梯赛
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LadderBattleResult, pbFightResult));
			}
			else if (battleType == Pb_God._emBattleType.BattleType_FightEachOther)
			{ //切蹉
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FriendFightResult, pbFightResult));
			}
			else
			{
				//战斗结果
				let isWin = pbFightResult.result == Pb_God._emBattleResult.BattleResult_DefenseSuc || pbFightResult.result == Pb_God._emBattleResult.BattleResult_Sucess;
				if ((battleType == Pb_God._emBattleType.BattleType_Tower || battleType == Pb_God._emBattleType.BattleType_Tower2) && !isWin)
				{
					//试炼塔只要失败过一次，就做过标记，当天不需要再提示玩家打了
					TodayRepeatOpMgr.Inst.setTag("TowerTodayFaild" + (battleType == Pb_God._emBattleType.BattleType_Tower ? 1 : 2));
				}
				//神界冒险和无尽试炼成功无需显示奖励
				if ((battleType == Pb_God._emBattleType.BattleType_Risk ||
					battleType == Pb_God._emBattleType.BattleType_Copymap ||
					battleType == Pb_God._emBattleType.BattleType_Temple ||
					battleType == Pb_God._emBattleType.BattleType_Element) && isWin)
				{
					//无处理
				} else if ((battleType == Pb_God._emBattleType.BattleType_Tower || battleType == Pb_God._emBattleType.BattleType_Tower2) && isWin)
				{
					if ((BattleMgr.Inst.autoTowerState && battleType == Pb_God._emBattleType.BattleType_Tower) || (BattleMgr.Inst.autoSpTowerState && battleType == Pb_God._emBattleType.BattleType_Tower2))
					{
						this.showEffRewardFly(pbFightResult);
						this.autoTower(pbFightResult);
					}
					else
					{
						//试炼塔胜利。
						UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StarTowerBattleWin, pbFightResult));
					}
				}
				else if (battleType == Pb_God._emBattleType.BattleType_HeavenDungeon && isWin)
				{
					// 天界副本胜利结算
					let op_ui_data = new HeavenBattleResultOpenUIData();
					op_ui_data.ItemList = pbFightResult.prize as any;
					op_ui_data.StarList = pbFightResult.heavenresult.star;
					op_ui_data.StageIndex = pbFightResult.base.id;
					op_ui_data.result = pbFightResult;
					UIManager.Inst.forceOpen(op_ui_data);
				}
				else if (battleType == Pb_God._emBattleType.BattleType_CrossChallege)
				{
					// 跨服竞技场胜利结算
					let op_ui_data = new CrossChallengeResultOpenUIData();
					op_ui_data.result = pbFightResult;
					UIManager.Inst.forceOpen(op_ui_data);
				}
				else if (!isWin)
				{  //通用失败
					let openUIData = new AwardOpenUIData(PanelNotify.Open_BattleFail);
					openUIData.ItemList = pbFightResult.prize as any;
					openUIData.customObject = pbFightResult;
					UIManager.Inst.forceOpen(openUIData);
				} else if (battleType == Pb_God._emBattleType.BattleType_Hook)
				{ //挂机胜利
					EventMgr.trigger(EventNotify.Fight_Hook_Changed);
					GuideMgr.Inst.saveGuideStepByFight(); //战斗结算后，就把当前的引导的步骤存下来，不用等到弹出战斗结算界面之后了。

					if (BattleMgr.Inst.autoHookState)
					{
						this.showEffRewardFly(pbFightResult);
						this.autoHook(pbFightResult);
					}
					else
					{
						UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HookBattleWin, pbFightResult));
					}
				} else
				{ //其它通用胜利
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleWin, pbFightResult));
				}
			}

			//升级提示的消息先收到，这是一个比较坑的代码设定，服务器会先把升级的消息发送，再发战斗结算（而且说不能调顺序），
			//而前端提示需要将升级提示延后到战斗结算之后再显示，所以等级提示的信息会先缓存起来，等收到战斗结算的弹窗后，再弹出升级界面
			PlayerDataMgr.handerWaitLevelUpPopUp();

			//服务器已经正式退出战斗 ， 抛出消息，让部分模块可以重新拉取服务器数据
			EventMgr.trigger(EventNotify.Battle_Result, battleType);
		}

		/**
		 * 自动推图开启
		 */
		private autoHook(pbFightResult: Pb_God.PBFightResult)
		{
			//这里判断一下 是否在推图界面
			if (FunInfo.SelectIndex == 3)
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HookBattleWin, pbFightResult));
			}
			else
			{
				let resultData = pbFightResult;
				let curStage = resultData.base.id;
				//判断是否还有下一关
				if (curStage >= cfg.HookStageCfgData.getMaxStageId())
				{
					TipsUtils.showTipsByLanId("hook_msg18"); //最大关卡
					return;
				}
				//下一关状态
				let nextStageID = curStage + 1;
				let limitLevel = cfg.HookStageCfgData.getNeedPlayerLevelByStageID(nextStageID);
				if (PlayerDataMgr.level < limitLevel)
				{
					TipsUtils.showTipsByLanId("hook_msg20", limitLevel); //达到n级后可继续挑战
					return;
				}
				if (GuideMgr.Inst.getInAllShowGuide())
				{ return; }

				BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Hook, nextStageID, 0, Pb_God._emZhenfaType.ZhenfaType_Zhuxian, false, 1 + "");
			}
		}

		private autoTower(pbFightResult: Pb_God.PBFightResult)
		{
			let resultData = pbFightResult;
			let curStage = resultData.base.id;
			let towerType = cfg.TrainTowerCfgData.getTypeByStageID(curStage);
			let mediator = towerType == 1 ? PanelNotify.Open_StarTowerMain : PanelNotify.Open_StarTowerMainAdv;

			//检测在塔的界面否 在的话直接弹
			if (UIManager.Inst.checkUIShowState(mediator, false))
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StarTowerBattleWin, pbFightResult));
			}
			else
			{
				//判断是否还有下一关
				if (curStage >= cfg.TrainTowerCfgData.getMaxStage(towerType))
				{
					TipsUtils.showTipsByLanId("hook_msg18"); //最大关卡
					return;
				}
				// //判断次数
				// if (TrainDataMgr.getTowerDayLastFightCount(towerType) == 0 && TrainDataMgr.getTowerStageID(towerType) > curStage)
				// {
				// 	TipsUtils.showTipsByLanId("fight_msg45"); //次数不足
				// 	return;
				// }
				// let hide = resultData.isWatching ? "" :  "hide";
				//停在试炼塔界面时，就不需要隐藏战斗
				//对应的主界面入口

				BattleMgr.Inst.createNormalBat(resultData.base.battletype, curStage + 1, 0, Pb_God._emZhenfaType.ZhenfaType_Zhuxian, false, 1 + "");
			}
		}

		// 奖励动画
		private showEffRewardFly(pbFightResult: Pb_God.PBFightResult)
		{
			let resultData = pbFightResult;
			for (var i = 0; i < resultData.prize.length; i++)
			{
				let pos = new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2);
				EventMgr.trigger(EventNotify.Award_Effect_Fly, resultData.prize[i], pos)
			}
		}
		/*****
		 *加载正在进行的战斗	PBFightResult
		 * @param PBFightResult
		 * 		base			PBFightBase	战斗公共
		 * 		round			uint32	回合数
		 * 		result			uint32	战斗结果 _emBattleResult
		 * 		endtime			uint32	战斗结束时间
		 * 		friendstate			PBPetFightStateInfo	友方状态
		 * 		energystate			PBPetFightStateInfo	敌方状态
		 * 		prize			PBItemInfo	战斗奖励
		 * 		achieve			PBU32U32	成就数据(服务器用)
		 * 		challengeresult			PBFightChallengeResult	竞技场战斗结果
		 * 		danresult			PBFightDanResult	超凡段位赛结果
		 * 		ladderresult			PBFightLadderResult	跨服天梯结果
		 * 		friendartifactstate			PBPetFightStateInfo	我发神器状态
		 * 		enemyartifactstate			PBPetFightStateInfo	敌方神器状态
		 * 		heavenresult			PBFightHeavenResult	天界副本结果
		 * 		crosschallengeresult			PBFightCrossChallengeResult	跨服竞技场战斗结果
		 */
		protected onLoadIng(value: Pb_God.PBFightResult): void
		{

		}
		/*****
		 *无尽继续返回			PBFightResult
		 * @param PBFightResult
		 * 		base			PBFightBase	战斗公共
		 * 		round			uint32	回合数
		 * 		result			uint32	战斗结果 _emBattleResult
		 * 		endtime			uint32	战斗结束时间
		 * 		friendstate			PBPetFightStateInfo	友方状态
		 * 		energystate			PBPetFightStateInfo	敌方状态
		 * 		prize			PBItemInfo	战斗奖励
		 * 		achieve			PBU32U32	成就数据(服务器用)
		 * 		challengeresult			PBFightChallengeResult	竞技场战斗结果
		 * 		danresult			PBFightDanResult	超凡段位赛结果
		 * 		ladderresult			PBFightLadderResult	跨服天梯结果
		 * 		friendartifactstate			PBPetFightStateInfo	我发神器状态
		 * 		enemyartifactstate			PBPetFightStateInfo	敌方神器状态
		 * 		heavenresult			PBFightHeavenResult	天界副本结果
		 * 		crosschallengeresult			PBFightCrossChallengeResult	跨服竞技场战斗结果
		 */
		protected onEndlessContinue_Ack(value: Pb_God.PBFightResult): void
		{
			let tmpInfo = BattleMgr.Inst.getBatPlaceMgr(Pb_God._emBattleType.BattleType_Endless);
			tmpInfo.setBattleInfo(value.base);
			tmpInfo.startBattle();
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}