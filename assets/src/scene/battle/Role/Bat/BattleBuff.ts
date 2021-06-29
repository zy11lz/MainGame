
module Pro
{
	/**
	 * Buff状态
	 */
	export class BattleBuff
	{

		/** buffID */
		public buffid: number = 0;

		/** 施法者技能ID */
		private m_pSkillIndex: number;

		/** 当前拥有者 */
		private m_pOwner: RoleAtkData;

		/** 施法者数据 */
		private m_pSource: RoleAtkData;

		/** 准备删除 */
		private m_bDelete: boolean;

		/** 被攻击次数 */
		private m_uBeAttackCount = 0;

		/** 层数回合数 */
		private m_listLayerRound: Array<number> = [];

		/** 额外数据 */
		// private m_uExtraValue: number;

		/** 已经开始回合 */
		private m_bStartRound = false;


		public layer: number = 0;
		public round: number = 1;


		/**
		 * 初始化buff
		 * @param pOwner buff使用者
		 * @param pSource buff触发者
		 * @param pSkillIndex 由技能id触发
		 * @param uBuffId buffId
		 * @param uExtralValue 额外值
		 */
		public init(pOwner: RoleAtkData, pSource: RoleAtkData, pSkillIndex: number, uBuffId: number, uExtraValue: number)
		{
			this.m_bDelete = false;
			this.m_pOwner = pOwner;
			this.m_pSource = pSource;
			this.m_pSkillIndex = pSkillIndex;
			this.buffid = uBuffId;
			// this.m_uExtraValue = uExtraValue;
			this.m_bStartRound = false;
			this.start();
		}

		syncByBuffState(pBFightBuffState: Pb_God.PBFightBuffState)
		{
			this.round = pBFightBuffState.round;
			this.layer = pBFightBuffState.layer;
		}

		/** buff触发者 */
		public getSource(): RoleAtkData
		{
			return this.m_pSource;
		}

		/** buff层数 */
		public getLayer(): number
		{
			// return this.m_listLayerRound.length;
			return this.layer;
		}

		/** buff是否准备下回合删除 */
		public isDelete(): boolean
		{
			return this.m_bDelete;
		}

		/** 剩余回合数 */
		public getContinueRound(): number
		{
			// return this.m_uContinueRound;
			return this.round;
		}

		/** buff设置删除 */
		public setDelete(bSet: boolean)
		{
			this.m_bDelete = bSet;
		}



		/** 初始化buff状态，提取部分特殊属性值 */
		private start()
		{
			// this.m_uContinueRound = cfg.BuffNewBuffCfgData.getExistRoundByID(this.buffid);
			this.round = cfg.BuffNewBuffCfgData.getExistRoundByID(this.buffid);
			let tmpBuffType = cfg.BuffNewBuffCfgData.getBuffTypeByID(this.buffid);
			let tmpBuffValue = cfg.BuffNewBuffCfgData.getValueInfoByIndex(this.buffid);

			// if (cfg.BuffNewBuffCfgData.getMaxLayerByID(this.buffid))
			// {
			// 	this.addLayer();
			// }
		}

		/** 回合切换 */
		public processRound()
		{
			if (this.isDelete())
			{ return; }
		}


		// /**
		//  * 同源buff叠加
		//  * @param buffId buffId
		//  * @param uExtraValue buff额外值
		//  * */
		// public repeat(buffId: number, uExtraValue: number): boolean
		// {
		// 	this.m_bDelete = false;
		// 	this.buffid = buffId;
		// 	// this.m_uExtraValue += uExtraValue;

		// 	//buff信息
		// 	let tmpBuffType = cfg.BuffNewBuffCfgData.getBuffTypeByID(this.buffid);
		// 	let tmpBuffValue = cfg.BuffNewBuffCfgData.getValueInfoByIndex(this.buffid);

		// 	//处理叠加
		// 	let uSameRepeatType = cfg.BuffNewBuffCfgData.getSameRepeatTypeByID(this.buffid);
		// 	if (Pb_God._emBuffSameRepeatType.BuffSameRepeatType_Drop == uSameRepeatType)
		// 	{
		// 		return false;
		// 	}
		// 	else if (Pb_God._emBuffSameRepeatType.BuffSameRepeatType_Refresh == uSameRepeatType)
		// 	{
		// 		// this.m_uContinueRound = cfg.BuffNewBuffCfgData.getExistRoundByID(this.buffid);
		// 		this.round = cfg.BuffNewBuffCfgData.getExistRoundByID(this.buffid);
		// 	}
		// 	else if (Pb_God._emBuffSameRepeatType.BuffSameRepeatType_AddRound == uSameRepeatType)
		// 	{
		// 		// this.m_uContinueRound += cfg.BuffNewBuffCfgData.getExistRoundByID(this.buffid);
		// 		this.round += cfg.BuffNewBuffCfgData.getExistRoundByID(this.buffid);
		// 	}


		// 	if (cfg.BuffNewBuffCfgData.getMaxLayerByID(this.buffid))
		// 	{
		// 		this.addLayer();
		// 	}
		// 	return true;
		// }


		// /** 同源buff添加叠加次数 */
		// private addLayer()
		// {
		// 	if (this.isDelete())
		// 		return;

		// 	//最大层数
		// 	if (this.m_listLayerRound.length > 0 && this.m_listLayerRound.length >= cfg.BuffNewBuffCfgData.getMaxLayerByID(this.buffid))
		// 	{
		// 		this.m_listLayerRound.splice(0, 1);
		// 	}
		// 	this.layer++;
		// 	this.layer >= cfg.BuffNewBuffCfgData.getMaxLayerByID(this.buffid) ? cfg.BuffNewBuffCfgData.getMaxLayerByID(this.buffid) : this.layer;
		// 	// this.round = this.round
		// 	this.m_listLayerRound.push(cfg.BuffNewBuffCfgData.getExistRoundByID(this.buffid));
		// }

		/** 快速删除buff */
		public delBuff()
		{
			if (this.isDelete())
			{ return; }

			this.onDeleteLayer();
			this.setDelete(true);
		}

		/** 同源buff减少叠加次数 */
		private onDeleteLayer()
		{
			// let tmpBuffType = cfg.BuffNewBuffCfgData.getBuffTypeByID(this.buffid);
			// let tmpBuffValue = cfg.BuffNewBuffCfgData.getValueInfoByIndex(this.buffid);

			// //消耗类
			// if (Pb_God._emBuffType.BuffType_DelLayerDamage == tmpBuffType)
			// {
			// 	let iAddValue = tmpBuffValue[1];
			// 	iAddValue += Global.floor(this.m_pSource.getCalcAttribute(tmpBuffValue[2]) * tmpBuffValue[3] / MAX_PROBABILITY);

			// 	if (Pb_God._emExpendType.ExpendType_PetHp == tmpBuffValue[0])
			// 	{
			// 		this.m_pOwner.addHp(-iAddValue, RoleDamageType.normal, Pb_God._emDoingType.DoingType_Buff, false);
			// 	}
			// }
		}


		//-------------------------------------------------------------
		//------------------------------
		public getState()
		{
			if (this.m_pSkillIndex && cfg.SkillNewSkillCfgData.check_mark(this.m_pSkillIndex, Pb_God._emSkillMaskType.SkillMaskType_AddBuffNextRound))
			{
				if (!this.m_bStartRound)
				{ return 0; }
			}
			return cfg.BuffNewBuffCfgData.getAddStateByID(this.buffid);
		}
	}
}