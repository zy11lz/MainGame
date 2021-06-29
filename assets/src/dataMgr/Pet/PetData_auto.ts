
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
	export class PetData_auto extends PetDataMgrBase
	{
		constructor()
		{
			super()
			//新增				PBPlayerPetInfo
			EventMgr.on(Cmd.S2C_Pet_AddNew_Ack.cmdName, this, this.onAddNew_Ack)
			//删除				PBG2CPet_Remove_Ack
			EventMgr.on(Cmd.S2C_Pet_Remove_Ack.cmdName, this, this.onRemove_Ack)
			//设置阵法返回		PBPlayerZhenfaInfo
			EventMgr.on(Cmd.S2C_Pet_Set_Zhenfa_Ack.cmdName, this, this.onSet_Zhenfa_Ack)
			//升级伙伴返回		PBG2CPet_UpLevel_Ack
			EventMgr.on(Cmd.S2C_Pet_UpLevel_Ack.cmdName, this, this.onUpLevel_Ack)
			//伙伴升阶返回		PBCAGPet_Advance
			EventMgr.on(Cmd.S2C_Pet_Advance_Ack.cmdName, this, this.onAdvance_Ack)
			//伙伴升星返回		PBG2CPet_UpStar
			EventMgr.on(Cmd.S2C_Pet_UpStar_Ack.cmdName, this, this.onUpStar_Ack)
			//穿戴装备返回		PBCAGPet_Equip
			EventMgr.on(Cmd.S2C_Pet_Equip_Ack.cmdName, this, this.onEquip_Ack)
			//一键穿戴装备返回	PBG2CPet_AutoEquip
			EventMgr.on(Cmd.S2C_Pet_AutoEquip_Ack.cmdName, this, this.onAutoEquip_Ack)
			//伙伴加锁返回		PBCAGPet_Lock
			EventMgr.on(Cmd.S2C_Pet_Lock_Ack.cmdName, this, this.onLock_Ack)
			//穿戴符文返回		PBCAGPet_RuneEquip
			EventMgr.on(Cmd.S2C_Pet_RuneEquip_Ack.cmdName, this, this.onRuneEquip_Ack)
			//天赋领悟返回	PBCAGPet_Talent
			EventMgr.on(Cmd.S2C_Pet_LearnTalent_Ack.cmdName, this, this.onLearnTalent_Ack)
			//天赋遗忘返回	PBCAGPet_Talent
			EventMgr.on(Cmd.S2C_Pet_DelTalent_Ack.cmdName, this, this.onDelTalent_Ack)
			//天赋升级返回	PBCAGPet_Talent
			EventMgr.on(Cmd.S2C_Pet_UpgradeTalent_Ack.cmdName, this, this.onUpgradeTalent_Ack)
			//购买背包		PBCAGPet_BuyBag
			EventMgr.on(Cmd.S2C_Pet_BuyBag_Ack.cmdName, this, this.onBuyBag_Ack)
			//失败才返回
			EventMgr.on(Cmd.S2C_Pet_Common_Ack.cmdName, this, this.onCommon_Ack)
			//设置皮肤返回	PBCAGPet_SetSkin
			EventMgr.on(Cmd.S2C_Pet_SetSkin_Ack.cmdName, this, this.onSetSkin_Ack)
			//同步显示属性	PBG2CSynPetAttr
			EventMgr.on(Cmd.S2C_Pet_SynAttr.cmdName, this, this.onSynAttr)
			//同步单个战斗力	PBG2CSynPetFightPower
			EventMgr.on(Cmd.S2C_Pet_SynFightPower.cmdName, this, this.onSynFightPower)
			//穿戴神装返回	PBCAGPet_GodEquip
			EventMgr.on(Cmd.S2C_Pet_GodEquip_Ack.cmdName, this, this.onGodEquip_Ack)
			//同步套装格子 	PBPlayerGodEquipSuitInfo
			EventMgr.on(Cmd.S2C_Pet_GodSuit_Syn.cmdName, this, this.onGodSuit_Syn)
			//一键脱下神装	PBU64
			EventMgr.on(Cmd.S2C_Pet_GodUnEquipOneKey_Ack.cmdName, this, this.onGodUnEquipOneKey_Ack)
			//查询伙伴评分 	PBG2CPetQueryScore
			EventMgr.on(Cmd.S2C_Pet_QueryScore_Ack.cmdName, this, this.onQueryScore_Ack)
			//同步属性预览	PBG2CSynPreviewAttr
			EventMgr.on(Cmd.S2C_Pet_SynPreviewAttr.cmdName, this, this.onSynPreviewAttr)
			//置换返回		PBPlayerPetInfo
			EventMgr.on(Cmd.S2C_Pet_Replace_Ack.cmdName, this, this.onReplace_Ack)
			//回退返回		PBPlayerPetInfo
			EventMgr.on(Cmd.S2C_Pet_Degenerate_Ack.cmdName, this, this.onDegenerate_Ack)
			//神装预览返回	PBG2CGodEquipPreview
			EventMgr.on(Cmd.S2C_Pet_GodEquipPreview.cmdName, this, this.onGodEquipPreview)
			//出现没见过的英雄(doing type, sn)	PBU32U64
			EventMgr.on(Cmd.S2C_Pet_NotSeenPet.cmdName, this, this.onNotSeenPet)
			//重生返回(次数，SN)		PBU32U64
			EventMgr.on(Cmd.S2C_Pet_Reborn.cmdName, this, this.onReborn)
			//购买重生次数返回		PBU32
			EventMgr.on(Cmd.S2C_Pet_BuyRebornCount.cmdName, this, this.onBuyRebornCount)
			//吞噬返回(exp, petsn)		PBU32U64
			EventMgr.on(Cmd.S2C_Pet_Swallow.cmdName, this, this.onSwallow)
			//高星重生		PBU64
			EventMgr.on(Cmd.S2C_Pet_HighStarReborn.cmdName, this, this.onHighStarReborn)
			//进化 PBG2CPet_Evolve_Ack
			EventMgr.on(Cmd.S2C_Pet_Evolve_Ack.cmdName, this, this.onEvolve_Ack)
			//魂器觉醒  PBG2CHorcruxAwake
			EventMgr.on(Cmd.S2C_Pet_Horcrux_Awake.cmdName, this, this.onHorcrux_Awake)
			//魂器强化  PBG2CHorcruxLevelUp
			EventMgr.on(Cmd.S2C_Pet_Horcrux_LevelUp.cmdName, this, this.onHorcrux_LevelUp)
			//宠物状态变化 PBG2CPetStateChg
			EventMgr.on(Cmd.S2C_Pet_State_Chg.cmdName, this, this.onState_Chg)
			//领取档案奖励 PBU32
			EventMgr.on(Cmd.S2C_Pet_PetAchivesReward_Chg.cmdName, this, this.onPetAchivesReward_Chg)
		}
		/*****
		 *新增				PBPlayerPetInfo
		 * @param PBPlayerPetInfo
		 * 		display			PBPetDisplay	显示
		 * 		advance			uint32	伙伴进阶等级
		 * 		islock			bool	伙伴是否加锁
		 * 		holylevel			uint32	圣物等级
		 * 		holyexp			uint32	圣物经验
		 * 		holyadvance			uint32	圣物进阶
		 * 		equip			PBPlayerPetEquip	伙伴装备
		 * 		rune			PBPlayerPetRune	伙伴符文
		 * 		talent			PBPlayerPetTalent	伙伴天赋
		 * 		godequip			PBPlayerPetGodEquip	伙伴神装
		 * 		fightpower			uint32	战斗力
		 * 		baseskill			PBU32U32	技能数据
		 * 		attr			PBAttrInfo	显示属性
		 * 		istemporary			bool	是否是临时英雄
		 * 		factionskilllv			uint32	工会技能等级
		 * 		exp			uint32	极化值
		 * 		flag			uint32	标识值，目前用于做版本控制
		 * 		horcrux			PBPetHorcrux	魂器
		 * 		extraskill			PBU32U32	额外技能, 只做属性加成
		 * 		state			uint32	状态
		 * 		skinselectflag			uint32	玩家皮肤选择标识（当前皮肤展示停留在哪个进化阶段）
		 */
		protected onAddNew_Ack(value: Pb_God.PBPlayerPetInfo): void
		{
			this.addNewPet(value);
			Laya.timer.callLater(this, this.rankPetList);
		}
		/*****
		 *删除				PBG2CPet_Remove_Ack
		 * @param PBG2CPet_Remove_Ack
		 * 		sn			uint64	伙伴
		 */
		protected onRemove_Ack(value: Pb_God.PBG2CPet_Remove_Ack): void
		{
			for (let delSn of value.sn)
			{
				let heroInfo = this.PetMapSn.get(delSn + "");
				if (!heroInfo) { continue; }
				this.PetMapSn.remove(delSn + "");
				let petIndex = this.PetList.indexOf(heroInfo);
				if (petIndex >= 0) { this.PetList.splice(petIndex, 1); }
				//红点逻辑
				heroInfo.reddotModel = null;
				this.actionRedDotModel.removeChildModel(heroInfo.sn, true, true);
			}
			// Laya.timer.callLater(this,this.rankPetList);
			this.combinReddotModel.refresh();
			Laya.timer.callLater(this, this.rankPetList);
			EventMgr.trigger(EventNotify.Pet_Changed);
			this.refreshDefendData()
		}
		/*****
		 *设置阵法返回		PBPlayerZhenfaInfo
		 * @param PBPlayerZhenfaInfo
		 * 		type			uint32	阵法类型_emZhenfaType
		 * 		id			uint32	阵法IDcs_pet表中阵法
		 * 		posdata			PBPlayerZhenfaPos	位置伙伴 key:位置 value:伙伴sn
		 * 		artifactid			uint32	神器ID
		 */
		protected onSet_Zhenfa_Ack(value: Pb_God.PBPlayerZhenfaInfo): void
		{

		}
		/*****
		 *升级伙伴返回		PBG2CPet_UpLevel_Ack
		 * @param PBG2CPet_UpLevel_Ack
		 * 		sn			uint64	伙伴sn
		 * 		petlevel			uint32	伙伴等级
		 */
		protected onUpLevel_Ack(value: Pb_God.PBG2CPet_UpLevel_Ack): void
		{
			let tempPet = this.getPetInfo(value.sn);
			if (tempPet != null)
			{
				tempPet.level = value.petlevel;
				Laya.timer.callLater(this, this.rankPetList);
				this.refreshPetReddotByType(tempPet.sn, "upgrade");
			}
		}
		/*****
		 *伙伴升阶返回		PBCAGPet_Advance
		 * @param PBCAGPet_Advance
		 * 		sn			uint64	伙伴sn
		 * 		advancelevel			uint32	伙伴当前阶数
		 * 		bshow			bool	是否显示突破成功界面
		 */
		protected onAdvance_Ack(value: Pb_God.PBCAGPet_Advance): void
		{
			let tempPet = this.getPetInfo(value.sn);
			if (tempPet != null)
			{
				let oldValue = tempPet.advance;
				tempPet.advance = value.advancelevel;
				Laya.timer.callLater(this, this.rankPetList);
				this.refreshPetReddotByType(tempPet.sn, "upgrade");
				//弹出进阶成功的消息
				if (value.bshow)
				{ UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroUpAdvanceSuc, [tempPet, tempPet.attr, tempPet.fightpower])); }
			}

		}
		/*****
		 *伙伴升星返回		PBG2CPet_UpStar
		 * @param PBG2CPet_UpStar
		 * 		sn			uint64	伙伴
		 * 		star			uint32	星星数
		 * 		oldstar			uint32	星星数
		 */
		protected onUpStar_Ack(value: Pb_God.PBG2CPet_UpStar): void
		{
			let tempPet = this.getPetInfo(value.sn);
			if (tempPet != null)
			{
				if (tempPet.star == 5) { this.setHaveFiveStarPet(true); }
				let oldStar = tempPet.star;
				tempPet.star = value.star;
				Laya.timer.callLater(this, this.rankPetList);
				//伙伴升星时，影响到自己的符文与天赋穿戴
				this.refreshPetReddotByType(tempPet.sn, "talent");
				this.refreshPetReddotByType(tempPet.sn, "rune");
				//弹出升星成功的消息
				if (value.star > oldStar)
				{ UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroUpStarSuc, [tempPet, tempPet.attr, tempPet.fightpower, value.oldstar])); }
			}
			EventMgr.trigger(EventNotify.Pet_Star_Changed);
		}
		/*****
		 *穿戴装备返回		PBCAGPet_Equip
		 * @param PBCAGPet_Equip
		 * 		sn			uint64	伙伴sn
		 * 		equiptype			uint32	部位类型
		 * 		equipid			uint32	装备ID
		 */
		protected onEquip_Ack(value: Pb_God.PBCAGPet_Equip): void
		{
			let tmpSuitMgr = SuitEquipDataMgr.getSuitMgr(value.sn as Long);
			if (tmpSuitMgr != null)
			{
				if (value.equipid > 0)
				{
					tmpSuitMgr.equipItem(value.equiptype, value.equipid);
				}
				else
				{
					tmpSuitMgr.unEquipItem(value.equiptype);
				}
				this.refreshPetReddotByType(value.sn as Long, "equip");
			}
			SoundMgr.Inst().playSound("wear");
			//EventMgr.trigger(EventNotify.Equip_Changed);
			Global.CallEventLater(EventNotify.Equip_Changed);
		}
		/*****
		 *一键穿戴装备返回	PBG2CPet_AutoEquip
		 * @param PBG2CPet_AutoEquip
		 * 		sn			uint64	伙伴sn
		 * 		equip			PBPlayerPetEquip	装备信息
		 */
		protected onAutoEquip_Ack(value: Pb_God.PBG2CPet_AutoEquip): void
		{
			let tmpSuitMgr = SuitEquipDataMgr.getSuitMgr(value.sn as Long);
			if (tmpSuitMgr != null)
			{
				if (value.equip.length > 0)
				{
					value.equip.forEach(elment =>
					{
						if (elment.itemid > 0)
						{
							tmpSuitMgr.equipItem(elment.equiptype, elment.itemid);
						}
						else
						{
							tmpSuitMgr.unEquipItem(elment.equiptype);
						}
					});
				}//一键脱下
				else
				{
					for (let i = 1; i <= 4; i++)
					{
						tmpSuitMgr.unEquipItem(i);
					}
				}
				this.refreshPetReddotByType(value.sn as Long, "equip");
			}
			SoundMgr.Inst().playSound("wear");
			//EventMgr.trigger(EventNotify.Equip_Changed);
			Global.CallEventLater(EventNotify.Equip_Changed);
		}
		/*****
		 *伙伴加锁返回		PBCAGPet_Lock
		 * @param PBCAGPet_Lock
		 * 		sn			uint64	伙伴sn
		 * 		islock			bool	是否加锁
		 */
		protected onLock_Ack(value: Pb_God.PBCAGPet_Lock): void
		{
			let tempPet = this.getPetInfo(value.sn);
			if (tempPet != null)
			{
				tempPet.islock = value.islock;
				if (tempPet.islock) { TipsUtils.showTipsByLanId("hero_msg22"); }
				else { TipsUtils.showTipsByLanId("hero_msg23"); }
			}
			EventMgr.trigger(EventNotify.Pet_Changed);
		}
		/*****
		 *穿戴符文返回		PBCAGPet_RuneEquip
		 * @param PBCAGPet_RuneEquip
		 * 		sn			uint64	伙伴sn
		 * 		pos			uint32	部位
		 * 		itemsn			uint64	穿戴的道具 0表示脱下
		 */
		protected onRuneEquip_Ack(value: Pb_God.PBCAGPet_RuneEquip): void
		{
			let tmpSuitMgr = SuitEquipDataMgr.getSuitMgr(value.sn as Long);
			if (tmpSuitMgr != null)
			{
				if (value.itemsn.toString(0) != "0")
				{
					tmpSuitMgr.equipRune(value);
				}
				else
				{
					tmpSuitMgr.unEquipRune(value.pos);
				}
				this.refreshPetReddotByType(value.sn as Long, "rune");
			}
			SoundMgr.Inst().playSound("wear");
			//EventMgr.trigger(EventNotify.Equip_Changed);
			Global.CallEventLater(EventNotify.Equip_Changed);
		}
		/*****
		 *天赋领悟返回	PBCAGPet_Talent
		 * @param PBCAGPet_Talent
		 * 		sn			uint64	伙伴sn
		 * 		pos			uint32	部位
		 * 		skillindex			uint32	技能索引
		 */
		protected onLearnTalent_Ack(value: Pb_God.PBCAGPet_Talent): void
		{
			let EquipMgr = SuitEquipDataMgr.getSuitMgr(value.sn as Long);
			EquipMgr.equipTalent(value);
			this.refreshPetReddotByType(value.sn as Long, "talent");
			SoundMgr.Inst().playSound("unlock");
			EventMgr.trigger(EventNotify.Pet_Changed);
		}
		/*****
		 *天赋遗忘返回	PBCAGPet_Talent
		 * @param PBCAGPet_Talent
		 * 		sn			uint64	伙伴sn
		 * 		pos			uint32	部位
		 * 		skillindex			uint32	技能索引
		 */
		protected onDelTalent_Ack(value: Pb_God.PBCAGPet_Talent): void
		{
			let EquipMgr = SuitEquipDataMgr.getSuitMgr(value.sn as Long);
			EquipMgr.unEquipTalent(value.pos);
			this.refreshPetReddotByType(value.sn as Long, "talent");
			EventMgr.trigger(EventNotify.Pet_Changed);
		}
		/*****
		 *天赋升级返回	PBCAGPet_Talent
		 * @param PBCAGPet_Talent
		 * 		sn			uint64	伙伴sn
		 * 		pos			uint32	部位
		 * 		skillindex			uint32	技能索引
		 */
		protected onUpgradeTalent_Ack(value: Pb_God.PBCAGPet_Talent): void
		{
			let EquipMgr = SuitEquipDataMgr.getSuitMgr(value.sn as Long);
			EquipMgr.equipTalent(value);
			this.refreshPetReddotByType(value.sn as Long, "talent");
			SoundMgr.Inst().playSound("grow");
			EventMgr.trigger(EventNotify.Pet_Changed);
		}
		/*****
		 *购买背包		PBCAGPet_BuyBag
		 * @param PBCAGPet_BuyBag
		 * 		totalbuyspace			uint32	总购买空间
		 */
		protected onBuyBag_Ack(value: Pb_God.PBCAGPet_BuyBag): void
		{
			let add = value.totalbuyspace - this.PetBuyspace;
			if (add > 0)
			{
				TipsUtils.showTipsByLanId("shop_msg33", add);
			}
			this.PetBuyspace = value.totalbuyspace;
			EventMgr.trigger(EventNotify.Pet_Changed);
		}
		/*****
		 *失败才返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{

		}
		/*****
		 *设置皮肤返回	PBCAGPet_SetSkin
		 * @param PBCAGPet_SetSkin
		 * 		sn			uint64	伙伴
		 * 		skinid			uint32	皮肤ID
		 */
		protected onSetSkin_Ack(value: Pb_God.PBCAGPet_SetSkin): void
		{
			let tempPet = this.getPetInfo(value.sn);
			if (tempPet != null)
			{
				tempPet.useskinid = value.skinid;
			}
			EventMgr.trigger(EventNotify.Pet_Changed);
		}
		/*****
		 *同步显示属性	PBG2CSynPetAttr
		 * @param PBG2CSynPetAttr
		 * 		sn			uint64	伙伴
		 * 		attr			PBAttrInfo	所有属性
		 */
		protected onSynAttr(value: Pb_God.PBG2CSynPetAttr): void
		{
			let tempPet = this.getPetInfo(value.sn);
			if (tempPet != null)
			{
				let oldAttr = tempPet.attr;
				tempPet.attr = value.attr;
				EventMgr.trigger(EventNotify.Pet_AttrChange, tempPet, oldAttr, value.attr);
			}
			EventMgr.trigger(EventNotify.Pet_Changed);
		}
		/*****
		 *同步单个战斗力	PBG2CSynPetFightPower
		 * @param PBG2CSynPetFightPower
		 * 		sn			uint64	伙伴
		 * 		fightpower			uint32	同步战斗力
		 */
		protected onSynFightPower(value: Pb_God.PBG2CSynPetFightPower): void
		{
			let tempPet = this.getPetInfo(value.sn);
			if (tempPet != null)
			{
				let oldValue = tempPet.fightpower;
				tempPet.fightpower = value.fightpower;
				Laya.timer.callLater(this, this.rankPetList);
				EventMgr.trigger(EventNotify.Pet_FightPowerChange, value.sn, oldValue, value.fightpower);
			}
			EventMgr.trigger(EventNotify.Pet_Changed);
		}
		/*****
		 *穿戴神装返回	PBCAGPet_GodEquip
		 * @param PBCAGPet_GodEquip
		 * 		sn			uint64	伙伴sn
		 * 		pos			uint32	部位
		 * 		itemsn			uint64	穿戴的道具 0表示脱下
		 */
		protected onGodEquip_Ack(value: Pb_God.PBCAGPet_GodEquip): void
		{
			let EquipMgr = SuitEquipDataMgr.getSuitMgr(value.sn as Long);
			EquipMgr.equipGodItem(value);
			SoundMgr.Inst().playSound("wear");
			this.refreshPetReddotByType(value.sn as Long, "godEquip");
			EventMgr.trigger(EventNotify.Pet_Changed);
		}
		/*****
		 *同步套装格子 	PBPlayerGodEquipSuitInfo
		 * @param PBPlayerGodEquipSuitInfo
		 * 		id			uint32	方案ID
		 * 		name			string	方案名称
		 * 		petsn			uint64	伙伴SN
		 * 		posequip			PBPosEquip	神装
		 */
		protected onGodSuit_Syn(value: Pb_God.PBPlayerGodEquipSuitInfo): void
		{
			let oldValue = SuitEquipDataMgr.getGodEquipSuitInfoById(value.id);
			SuitEquipDataMgr.setGodEquipSuitMgrInfo(value);
			EventMgr.trigger(EventNotify.GodequipSuitMgr_Update, value, oldValue);
		}
		/*****
		 *一键脱下神装	PBU64
		 * @param PBU64
		 * 		value			uint64	
		 */
		protected onGodUnEquipOneKey_Ack(value: Pb_God.PBU64): void
		{
			let EquipSuitInfo = SuitEquipDataMgr.getSuitMgr(value.value);
			SoundMgr.Inst().playSound("wear");
			EquipSuitInfo.unEquipAllGodEquip();
		}
		/*****
		 *查询伙伴评分 	PBG2CPetQueryScore
		 * @param PBG2CPetQueryScore
		 * 		sn			uint64	伙伴sn
		 * 		selfscore			PBPetScoreInfo	自己的评分
		 * 		maxscore			PBPetScoreInfo	最大的评分
		 */
		protected onQueryScore_Ack(value: Pb_God.PBG2CPetQueryScore): void
		{

		}
		/*****
		 *同步属性预览	PBG2CSynPreviewAttr
		 * @param PBG2CSynPreviewAttr
		 * 		petsn			uint64	sn
		 * 		maxlevel			uint32	等级上限
		 * 		addskill			PBSkillInfo	增加技能
		 * 		attr			PBAttrInfo	所有属性
		 */
		protected onSynPreviewAttr(value: Pb_God.PBG2CSynPreviewAttr): void
		{
			let tempPet = this.getPetInfo(value.petsn);
			if (tempPet != null)
			{
				//属性预览时，将即将开放的技能临时保存起来， 在进阶成功后，简化检测逻辑， 直接将此技能开放的提示界面弹出
				tempPet.preopenSkill = (value.addskill && value.addskill.skilllevel == 1) ? value.addskill.skillid : 0;
				tempPet.preUpAttr = value.attr;
			}
		}
		/*****
		 *置换返回		PBPlayerPetInfo
		 * @param PBPlayerPetInfo
		 * 		display			PBPetDisplay	显示
		 * 		advance			uint32	伙伴进阶等级
		 * 		islock			bool	伙伴是否加锁
		 * 		holylevel			uint32	圣物等级
		 * 		holyexp			uint32	圣物经验
		 * 		holyadvance			uint32	圣物进阶
		 * 		equip			PBPlayerPetEquip	伙伴装备
		 * 		rune			PBPlayerPetRune	伙伴符文
		 * 		talent			PBPlayerPetTalent	伙伴天赋
		 * 		godequip			PBPlayerPetGodEquip	伙伴神装
		 * 		fightpower			uint32	战斗力
		 * 		baseskill			PBU32U32	技能数据
		 * 		attr			PBAttrInfo	显示属性
		 * 		istemporary			bool	是否是临时英雄
		 * 		factionskilllv			uint32	工会技能等级
		 * 		exp			uint32	极化值
		 * 		flag			uint32	标识值，目前用于做版本控制
		 * 		horcrux			PBPetHorcrux	魂器
		 * 		extraskill			PBU32U32	额外技能, 只做属性加成
		 * 		state			uint32	状态
		 * 		skinselectflag			uint32	玩家皮肤选择标识（当前皮肤展示停留在哪个进化阶段）
		 */
		protected onReplace_Ack(value: Pb_God.PBPlayerPetInfo): void
		{

		}
		/*****
		 *回退返回		PBPlayerPetInfo
		 * @param PBPlayerPetInfo
		 * 		display			PBPetDisplay	显示
		 * 		advance			uint32	伙伴进阶等级
		 * 		islock			bool	伙伴是否加锁
		 * 		holylevel			uint32	圣物等级
		 * 		holyexp			uint32	圣物经验
		 * 		holyadvance			uint32	圣物进阶
		 * 		equip			PBPlayerPetEquip	伙伴装备
		 * 		rune			PBPlayerPetRune	伙伴符文
		 * 		talent			PBPlayerPetTalent	伙伴天赋
		 * 		godequip			PBPlayerPetGodEquip	伙伴神装
		 * 		fightpower			uint32	战斗力
		 * 		baseskill			PBU32U32	技能数据
		 * 		attr			PBAttrInfo	显示属性
		 * 		istemporary			bool	是否是临时英雄
		 * 		factionskilllv			uint32	工会技能等级
		 * 		exp			uint32	极化值
		 * 		flag			uint32	标识值，目前用于做版本控制
		 * 		horcrux			PBPetHorcrux	魂器
		 * 		extraskill			PBU32U32	额外技能, 只做属性加成
		 * 		state			uint32	状态
		 * 		skinselectflag			uint32	玩家皮肤选择标识（当前皮肤展示停留在哪个进化阶段）
		 */
		protected onDegenerate_Ack(value: Pb_God.PBPlayerPetInfo): void
		{

		}
		/*****
		 *神装预览返回	PBG2CGodEquipPreview
		 * @param PBG2CGodEquipPreview
		 * 		sn			uint64	伙伴sn
		 * 		power			uint32	战斗力
		 * 		suit			uint32	套装id
		 * 		attri			PBAttrInfo	属性
		 */
		protected onGodEquipPreview(value: Pb_God.PBG2CGodEquipPreview): void
		{
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroGodEquipTotal, value));
		}
		/*****
		 *出现没见过的英雄(doing type, sn)	PBU32U64
		 * @param PBU32U64
		 * 		key			uint32	
		 * 		value			uint64	 
		 */
		protected onNotSeenPet(value: Pb_God.PBU32U64): void
		{
			let doingtype = value.key;
			if (doingtype != Pb_God._emDoingType.DoingType_PetCall && doingtype != Pb_God._emDoingType.DoingType_SystemGive && doingtype != Pb_God._emDoingType.DoingType_IncubateEgg)
			{
				let petInfo = this.getPetInfo(value.value);
				if (petInfo == null)
				{
					logD("onNotSeenPet: petInfo == null")
					return;
				}
				if (petInfo.star < 4)
				{
					logD("onNotSeenPet: star 小于4")
					return;
				}
				//没有立绘资源
				let petResID = cfg.PetCfgData.getSkinInfoByPetID(petInfo.id).id;
				logD("petResID:" + petResID)
				if (!cfg.PetSkinCfgData.getHaveVDrawById(petResID))
				{
					logD("petResID:" + petResID + " 没有立绘");
					return;
				}

				let petStar = new Pb_God.PBPetStar;
				petStar.star = petInfo.star;
				petStar.petid = petInfo.id;
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallBigShow, [petStar]));

				AwardOpenUtils.setLock(true);  //锁起来，把奖励提示延后处理
			}
		}
		/*****
		 *重生返回(次数，SN)		PBU32U64
		 * @param PBU32U64
		 * 		key			uint32	
		 * 		value			uint64	 
		 */
		protected onReborn(value: Pb_God.PBU32U64): void
		{
			this.rebirthCount = value.key;
			let hero = this.getPetInfo(value.value);
			if (hero != null)
			{
				//等级归零
				hero.level = 1;
				hero.advance = 0;
				Laya.timer.callLater(this, this.rankPetList);
				this.refreshPetReddotByType(hero.sn, "upgrade");

				//装备卸下
				let tmpSuitMgr = SuitEquipDataMgr.getSuitMgr(hero.sn);
				if (tmpSuitMgr != null)
				{
					// 神装卸下
					tmpSuitMgr.unEquipAllGodEquip();
					for (let i = 1; i <= 4; i++)
					{
						tmpSuitMgr.unEquipItem(i);
					}
					for (let i = 1; i <= 2; i++)
					{
						tmpSuitMgr.unEquipRune(i);
					}
					this.refreshPetReddotByType(hero.sn as Long, "equip");
				}
			}
		}
		/*****
		 *购买重生次数返回		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onBuyRebornCount(value: Pb_God.PBU32): void
		{
			this.buyRebirthCount = value.value;
		}
		/*****
		 *吞噬返回(exp, petsn)		PBU32U64
		 * @param PBU32U64
		 * 		key			uint32	
		 * 		value			uint64	 
		 */
		protected onSwallow(value: Pb_God.PBU32U64): void
		{

		}
		/*****
		 *高星重生		PBU64
		 * @param PBU64
		 * 		value			uint64	
		 */
		protected onHighStarReborn(value: Pb_God.PBU64): void
		{

		}
		/*****
		 *进化 PBG2CPet_Evolve_Ack
		 * @param PBG2CPet_Evolve_Ack
		 * 		sn			uint64	伙伴sn
		 * 		isevolve			bool	是否进化形态
		 * 		skinid			uint32	皮肤ID
		 * 		evolve			uint32	进化阶段
		 */
		protected onEvolve_Ack(value: Pb_God.PBG2CPet_Evolve_Ack): void
		{

		}
		/*****
		 *魂器觉醒  PBG2CHorcruxAwake
		 * @param PBG2CHorcruxAwake
		 * 		sn			uint64	伙伴sn
		 * 		horcrux			PBPetHorcrux	魂器
		 */
		protected onHorcrux_Awake(value: Pb_God.PBG2CHorcruxAwake): void
		{
			let tempPet = this.getPetInfo(value.sn);
			if (tempPet != null)
			{
				tempPet.horcrux.level = value.horcrux.level;
				tempPet.horcrux.id = value.horcrux.id;
				Laya.timer.callLater(this, this.rankPetList);
			}
			EventMgr.trigger(EventNotify.Horcrux_Changed, value);
		}
		/*****
		 *魂器强化  PBG2CHorcruxLevelUp
		 * @param PBG2CHorcruxLevelUp
		 * 		sn			uint64	伙伴sn
		 * 		horcrux			PBPetHorcrux	魂器
		 */
		protected onHorcrux_LevelUp(value: Pb_God.PBG2CHorcruxLevelUp): void
		{
			let tempPet = this.getPetInfo(value.sn);
			if (tempPet != null)
			{
				tempPet.horcrux.level = value.horcrux.level;
				tempPet.horcrux.id = value.horcrux.id;
				Laya.timer.callLater(this, this.rankPetList);
			}
			EventMgr.trigger(EventNotify.Horcrux_Changed, value);
		}
		/*****
		 *宠物状态变化 PBG2CPetStateChg
		 * @param PBG2CPetStateChg
		 * 		petsn			uint64	sn
		 * 		state			uint32	状态标记
		 */
		protected onState_Chg(value: Pb_God.PBG2CPetStateChg): void
		{
			this.setPetStateValue(value);
			EventMgr.trigger(EventNotify.Pet_State_Chg);
		}
		/*****
		 *领取档案奖励 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onPetAchivesReward_Chg(value: Pb_God.PBU32): void
		{

		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}