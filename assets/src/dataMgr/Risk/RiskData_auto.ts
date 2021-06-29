
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
	export class RiskData_auto extends RiskDataMgrBase
	{
		constructor()
		{
			super()
			//通用返回(失败才返回)
			EventMgr.on(Cmd.S2C_Risk_CommonAck.cmdName, this, this.onCommonAck)
			//同步所有信息 	PBG2CSynAll
			EventMgr.on(Cmd.S2C_Risk_SynAll.cmdName, this, this.onSynAll)
			//新增格子信息 	PBG2CRiskSynGrid
			EventMgr.on(Cmd.S2C_Risk_AddGrid.cmdName, this, this.onAddGrid)
			//拾取格子返回		PBPlayerRiskGrid
			EventMgr.on(Cmd.S2C_Risk_CollectGrid.cmdName, this, this.onCollectGrid)
			//进入下一层		PBG2CRiskEnterNextStage
			EventMgr.on(Cmd.S2C_Risk_EnterNextStage.cmdName, this, this.onEnterNextStage)
			//领取守卫奖励		PBU32
			EventMgr.on(Cmd.S2C_Risk_GuardPrize.cmdName, this, this.onGuardPrize)
			//同步伙伴血量 	PBPetHp
			EventMgr.on(Cmd.S2C_Risk_SynPetHp.cmdName, this, this.onSynPetHp)
			//同步守卫血量 	PBU32U64
			EventMgr.on(Cmd.S2C_Risk_SynGuardHp.cmdName, this, this.onSynGuardHp)
			//同步生命药剂 		PBG2CRiskSynHpDrug
			EventMgr.on(Cmd.S2C_Risk_SynHpDrug.cmdName, this, this.onSynHpDrug)
			//同步驱魂药剂 	PBG2CRiskSynKillDrug
			EventMgr.on(Cmd.S2C_Risk_SynKillDrug.cmdName, this, this.onSynKillDrug)
			//同步击杀守卫个数 PBU32
			EventMgr.on(Cmd.S2C_Risk_SynKillGuard.cmdName, this, this.onSynKillGuard)
			//同步召唤商人数量 PBU32
			EventMgr.on(Cmd.S2C_Risk_SynTrader.cmdName, this, this.onSynTrader)
			//使用召唤商人 	PBG2CRiskUseTrader	
			EventMgr.on(Cmd.S2C_Risk_UseTrader.cmdName, this, this.onUseTrader)
			//答题返回			PBG2CRiskQuestionAck
			EventMgr.on(Cmd.S2C_Risk_QuestionAck.cmdName, this, this.onQuestionAck)
			//打开商店			PBG2CRiskShopOpenAck
			EventMgr.on(Cmd.S2C_Risk_ShopOpenAck.cmdName, this, this.onShopOpenAck)
			//商店购买(位置1开始)	PBU32
			EventMgr.on(Cmd.S2C_Risk_ShopBuyAck.cmdName, this, this.onShopBuyAck)
			//同步被动技能 	PBG2CRiskCollectSkill
			EventMgr.on(Cmd.S2C_Risk_SynCollectSkill.cmdName, this, this.onSynCollectSkill)
		}
		/*****
		 *通用返回(失败才返回)
		 * @param 
		 */
		protected onCommonAck(): void
		{

		}
		/*****
		 *同步所有信息 	PBG2CSynAll
		 * @param PBG2CSynAll
		 * 		curstage			uint32	 当前层数
		 * 		killguardcount			uint32	 已经击杀守卫个数
		 * 		guardprize			uint32	 领取的奖励ID
		 * 		hpdrupcount			uint32	 生命药剂数量
		 * 		usehpdrupcount			uint32	 使用生命药剂数量
		 * 		killdrupcount			uint32	 驱魂药剂数量
		 * 		usekilldrupcount			uint32	 使用驱魂药剂数量
		 * 		tradercount			uint32	 召唤商人数量
		 * 		gridinfo			PBPlayerRiskGrid	 开启的格子信息
		 * 		guardhp			PBU32U64	 守卫血量(位置12345)
		 * 		petdisplay			PBRiskPetDisplay	 伙伴显示信息
		 */
		protected onSynAll(value: Pb_God.PBG2CSynAll): void
		{
			this._data.curstage = value.curstage;
			this._data.killguardcount = value.killguardcount;
			this._data.guardprize = value.guardprize;
			this._data.hpdrupcount = value.hpdrupcount;
			this._data.usehpdrupcount = value.usehpdrupcount;
			this._data.killdrupcount = value.killdrupcount;
			this._data.usekilldrupcount = value.usekilldrupcount;
			this._data.tradercount = value.tradercount;
			this._data.gridinfo = value.gridinfo;
			this._data.guardhp = value.guardhp;


			this.setFightPetList(value.petdisplay);
			this.setGridList(value.gridinfo, true);
			this.resetGuardHpList(value.guardhp);
			this.refreshOverTime();

			if (this.hasHeroFight())
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskMain), BaseBackUIType.HideBackUI);
			} else
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskHeroSelect));
			}
		}
		/*****
		 *新增格子信息 	PBG2CRiskSynGrid
		 * @param PBG2CRiskSynGrid
		 * 		gridinfo			PBPlayerRiskGrid	 格子信息
		 */
		protected onAddGrid(value: Pb_God.PBG2CRiskSynGrid): void
		{
			this.setGridList(value.gridinfo, false);
			if (this._data.curstage >= 5)
			{
				//处理自动拾取
				for (let gridinfo of value.gridinfo)
				{
					if (cfg.RiskRefreshCfgData.getIsAutoCollectByType(gridinfo.type))
					{
						Laya.timer.once(800, null, () =>
						{
							if (gridinfo.openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_OpenSee)
								RiskSend.collectGrid(gridinfo.grid, 0, 0);
						})
					}
				}
			}
		}
		/*****
		 *拾取格子返回		PBPlayerRiskGrid
		 * @param PBPlayerRiskGrid
		 * 		grid			uint32	 格子ID
		 * 		type			uint32	 类型 _emRiskRefreshType
		 * 		openstate			uint32	 开启状态_emRiskGridOpenState
		 * 		indexvalue			PBU32U32	 索引 答题ID_答题状态(_emRiskQuestionResult) 店位置_索引
		 * 		param			uint32	 参数 对话ID/事件ID
		 */
		protected onCollectGrid(value: Pb_God.PBPlayerRiskGrid): void
		{
			this.setSingleGridInfo(value, true);
			if (value.openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect)
			{
				//如果是技能BUFF，则增加提示
				if (value.type == Pb_God._emRiskRefreshType.RiskRefreshType_Skill)
				{
					var skillName = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(value.param, 1).name;
					TipsUtils.showTipsByLanId("tips_msg1", skillName);
				}
			}
		}
		/*****
		 *进入下一层		PBG2CRiskEnterNextStage
		 * @param PBG2CRiskEnterNextStage
		 * 		curstage			uint32	 当前层数
		 * 		iteminfo			PBItemInfo	 累计道具信息
		 */
		protected onEnterNextStage(value: Pb_God.PBG2CRiskEnterNextStage): void
		{
			this._data.curstage = value.curstage;
			this.resetAllGrid();  //重置所有格子数据

			//打开奖励列表
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskRewardSum, value.iteminfo));

			EventMgr.trigger(EventNotify.Risk_BaseChange_Change);
			EventMgr.trigger(EventNotify.Risk_AllGrid_Update, value);
		}
		/*****
		 *领取守卫奖励		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onGuardPrize(value: Pb_God.PBU32): void
		{
			this._data.guardprize = value.value;
			EventMgr.trigger(EventNotify.Risk_KillGuardReward_Change);
		}
		/*****
		 *同步伙伴血量 	PBPetHp
		 * @param PBPetHp
		 * 		sn			uint64	sn
		 * 		curhp			uint64	当前血量0死亡
		 */
		protected onSynPetHp(value: Pb_God.PBPetHp): void
		{
			let hero = this.getHeroBySn(value.sn);
			if (hero) hero.curhp = value.curhp;
		}
		/*****
		 *同步守卫血量 	PBU32U64
		 * @param PBU32U64
		 * 		key			uint32	
		 * 		value			uint64	 
		 */
		protected onSynGuardHp(value: Pb_God.PBU32U64): void
		{
			let hp = (value.value as Long).toNumber();
			let index = cfg.RiskGuardCfgData.getGuardIndexByIndex(value.key) - 1;
			let guardInfo = this.getGuradInfoByGuardIndex(index);
			//BOSS从生到死需要弹个提示
			if (guardInfo && guardInfo.curHp > 0 && hp <= 0)
			{
				if (guardInfo.type == Pb_God._emRiskRefreshType.RiskRefreshType_GuardBoss)
					TipsUtils.showTipsByLanId("risk_msg17"); //挑战成功，下一层入口出现啦
				else
					TipsUtils.showTipsByLanId("risk_msg16");  //挑战成功，可探索无守卫区域
			}
			this.resetSingleGuardHpInfo(value.key, hp);
		}
		/*****
		 *同步生命药剂 		PBG2CRiskSynHpDrug
		 * @param PBG2CRiskSynHpDrug
		 * 		hpdrupcount			uint32	 生命药剂数量
		 * 		usehpdrupcount			uint32	 使用生命药剂数量
		 */
		protected onSynHpDrug(value: Pb_God.PBG2CRiskSynHpDrug): void
		{
			if (this._data.hpdrupcount < value.hpdrupcount)
			{
				TipsUtils.showTipsByLanId("risk_msg7");
			} else if (this._data.hpdrupcount > value.hpdrupcount)
			{
				TipsUtils.showTipsByLanId("risk_msg13");
			}
			this._data.usehpdrupcount = value.usehpdrupcount;
			this._data.hpdrupcount = value.hpdrupcount;

			EventMgr.trigger(EventNotify.Risk_BaseChange_Change);
		}
		/*****
		 *同步驱魂药剂 	PBG2CRiskSynKillDrug
		 * @param PBG2CRiskSynKillDrug
		 * 		killdrupcount			uint32	 驱魂药剂数量
		 * 		usekilldrupcount			uint32	 使用驱魂药剂数量
		 */
		protected onSynKillDrug(value: Pb_God.PBG2CRiskSynKillDrug): void
		{
			if (this._data.killdrupcount < value.killdrupcount)
			{
				TipsUtils.showTipsByLanId("risk_msg8");
			} else if (this._data.killdrupcount > value.killdrupcount)
			{
				TipsUtils.showTipsByLanId("risk_msg14");
			}
			this._data.usekilldrupcount = value.usekilldrupcount;
			this._data.killdrupcount = value.killdrupcount;

			EventMgr.trigger(EventNotify.Risk_BaseChange_Change);
		}
		/*****
		 *同步击杀守卫个数 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSynKillGuard(value: Pb_God.PBU32): void
		{
			this._data.killguardcount = value.value;
			EventMgr.trigger(EventNotify.Risk_KillGuardReward_Change);
		}
		/*****
		 *同步召唤商人数量 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSynTrader(value: Pb_God.PBU32): void
		{
			if (this._data.tradercount < value.value)
			{
				TipsUtils.showTipsByLanId("risk_msg9");
			} else if (this._data.tradercount > value.value)
			{
				TipsUtils.showTipsByLanId("risk_msg15");
			}
			this._data.tradercount = value.value;
			EventMgr.trigger(EventNotify.Risk_BaseChange_Change);
		}
		/*****
		 *使用召唤商人 	PBG2CRiskUseTrader	
		 * @param PBG2CRiskUseTrader
		 * 		shopindex			PBU32U32	 商品信息
		 * 		tradercount			uint32	 当前召唤商人数量
		 */
		protected onUseTrader(value: Pb_God.PBG2CRiskUseTrader): void
		{
			this._data.tradercount = value.tradercount;
		}
		/*****
		 *答题返回			PBG2CRiskQuestionAck
		 * @param PBG2CRiskQuestionAck
		 * 		grid			uint32	 格子
		 * 		index			uint32	 答题索引
		 * 		option			uint32	 选项123
		 * 		result			uint32	 正确答案
		 */
		protected onQuestionAck(value: Pb_God.PBG2CRiskQuestionAck): void
		{
			let gridInfo = this.gridDataList[value.grid - 1];
			if (gridInfo == null || gridInfo.indexvalue.length == 0) return;
			let questionData = gridInfo.indexvalue[value.index - 1];
			questionData.value = value.option == value.result ? Pb_God._emRiskQuestionResult.RiskQuestionResult_Success : Pb_God._emRiskQuestionResult.RiskQuestionResult_Fail;
		}
		/*****
		 *打开商店			PBG2CRiskShopOpenAck
		 * @param PBG2CRiskShopOpenAck
		 * 		shopindex			PBU32U32	 冒险商店
		 * 		shopbuypos			uint32	 冒险商店购买的索引
		 */
		protected onShopOpenAck(value: Pb_God.PBG2CRiskShopOpenAck): void
		{
			this._data.shopindex = value.shopindex;
			this.setShopBuyList(value.shopbuypos);

			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskShop, value.shopindex));
		}
		/*****
		 *商店购买(位置1开始)	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onShopBuyAck(value: Pb_God.PBU32): void
		{
			this._shopBuyIds.put(value.value, value.value);
		}
		/*****
		 *同步被动技能 	PBG2CRiskCollectSkill
		 * @param PBG2CRiskCollectSkill
		 * 		skillinfo			PBSkillInfo	 被动技能
		 */
		protected onSynCollectSkill(value: Pb_God.PBG2CRiskCollectSkill): void
		{
			//mediator直接监听
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}