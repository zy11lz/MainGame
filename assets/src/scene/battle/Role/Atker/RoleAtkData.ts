
module Pro
{
	/**
	* 角色数据
	*/
	export class RoleAtkData
	{

		//----------------------角色基础信息-----------------
		/** 站立的坐标 */
		public standIndex: number = 0;
		/** 服务器站立的坐标 */
		public serverStandIndex: number = 0;

		/** 我方阵营 */
		public isOwer: boolean = false;

		/** 角色唯一ID */
		public unitId: number = 0;

		/**	角色id */
		public curRid: number = 0;

		/**皮肤id */
		public skinID:number=0;

		/**	是否是英雄 */
		// public isHero: boolean = false;
 

		//----------------------伙伴基础属性-------------------
		/**	伙伴等级 */
		public petInfo: Pb_God.PBPlayerPetInfo;

		//----------------------战斗属性-----------------------
		/** 角色类型 */
		public atkType = BatCfg.AtkType.Role;

		/** 战斗类型 */
		public battleType: Pb_God._emBattleType;

		/** 当前正在执行的buff列表  */
		private m_clBattleBuffMgr: BattleBuffMgr = new BattleBuffMgr();

		/** 当前状态 */
		private m_setBuffState: Array<Pb_God._emBuffControlType> = [];

		//--------------------本场战斗的状态------------------------
		/** 当前暴击对象 */
		private m_setSkillCriticalTar: Array<number> = [];

		/**  当前处于死亡状态中 */

		private _inDie: boolean = false;
		public get inDie(): boolean
		{
			return this._inDie;
		}
		public set inDie(value: boolean)
		{
			this._inDie = value;
		}

		/**  当前血量  */
		private _m_uCurHp = 0;

		get m_uCurHp(): number
		{
			return this._m_uCurHp;
		}

		/**  当前最大血量 */
		private m_uCurMaxHp = 0;

		/** 当前战斗回合 */
		private m_uFightRound = 0;

		/** 出手顺序 */
		private m_uRoundTop = 0;

		//--------------------------------------------------初始化-----------------------------------------------
		constructor()
		{

		}

		/**
		 * 重置无尽试炼状态
		 */
		public resetEndlessStatue()
		{
			this.m_uFightRound = 0;
			this.m_clBattleBuffMgr.init(this);
			// this.m_stBuffAttribute.clear();
			this.m_setBuffState.splice(0, this.m_setBuffState.length);
			// this.m_activeSkillList.forEach(element => { element.lastRound = element.startRound; });
			// this.m_clBattleSkillMgr.m_poolSkill.forEach(element => { element.lastRound = element.startRound; });
			// this.calculateAttribute();
		}

		/**
		 * 初始化战斗数据
		 * @param tmpPetInfo 战斗伙伴数据
		 * @param battleType 战斗类型
		 * @param isOwer 是否我方角色
		 * */
		public initBatInfo(tmpPetInfo: Pb_God.PBBattlePetInfo, battleType: Pb_God._emBattleType, isOwer: boolean, tmpFormAttrs: Array<cfg.AddAtterInfo>, tmpArtAttrs: Array<Pb_God.PBAttrBaseInfo>)
		{

			//重置状态
			this.m_uFightRound = 0;
			this.m_clBattleBuffMgr.init(this);
			// this.m_stBuffAttribute.clear();
			this.m_setBuffState.splice(0, this.m_setBuffState.length);
			this.inDie = false;

			//记录数据
			this.isOwer = isOwer;
			this.battleType = battleType;
			this.unitId = tmpPetInfo.unitid;
			this.petInfo = tmpPetInfo.pet;

			this.standIndex = GameConfig.AtkStandAry[tmpPetInfo.pos - 1];
			//this.standIndex = GameConfig.AtkStandObj[tmpPetInfo.pos ];
			
			


			this.serverStandIndex = tmpPetInfo.pos;
			this.curRid = tmpPetInfo.pet.display.id;
			this.skinID = tmpPetInfo.pet.display.useskinid;
			// this.isHero = tmpPetInfo.unittype == Pb_God._em_GameUnitType.GameObject_Pet;

			//刷新属性
			// this.m_uCurHp 	 = Global.longToNumber(tmpPetInfo.petstate.curhp);
			this.updateSetCurHp(Global.longToNumber(tmpPetInfo.petstate.curhp));
			this.m_uCurMaxHp = Global.longToNumber(tmpPetInfo.petstate.maxhp);
		}


		//--------------------------------------------------战斗管理器-----------------------------------------------
		/** 获取当前使用的战斗管理器 */
		public getBatPlaceMgr(): BatPlaceMgr
		{
			let tempInfo = BattleMgr.Inst.getBatPlaceMgr(this.battleType);
			return tempInfo;
		}

		/** 获取当前使用的角色管理器 */
		public getBatRoleMgr(): BatRoleMgr
		{
			let tempInfo = BattleMgr.Inst.getBatPlaceMgr(this.battleType).getRoleMgr();
			return tempInfo;
		}

		/** 获取当前使用的buff管理器 */
		public getBattleBuffMgr(): BattleBuffMgr
		{
			return this.m_clBattleBuffMgr;
		}

		/** 获取buff状态 */
		public getBuffStateList(): Array<Pb_God._emBuffControlType>
		{
			return this.m_setBuffState;
		}

		//-------------------------------------------------日常数据访问------------------------------------------
		/** 获取模型资源ID */
		public getResoureID(): number
		{
			return this.skinID;
		}

		/** 获取唯一ID */
		public getUnitID(): number
		{
			return this.unitId;
		}

		/** 角色数据 */
		public getPetInfo(): Pb_God.PBPlayerPetInfo
		{
			return this.petInfo;
		}

		/*** 角色是否死亡 */
		public isDead(): boolean
		{
			return this.inDie;
		}

		/*** 角色剩余血量 */
		public getHp(): number
		{
			return this.m_uCurHp;
		}

		/*** 角色总血量 */
		public getMaxBlood(): number
		{
			// return this.getCalcAttribute(Pb_God._emBattleAttribute.BattleAttribute_HPMax);
			return this.m_uCurMaxHp;
		}

		/** 获取角色的战斗回合 */
		// public getFightRound(): number
		// {
		// 	return this.m_uFightRound;
		// }


		// /** 获取角色职业 */
		// public getPetJobType(): number
		// {
		// 	return cfg.PetCfgData.getPetJobTypeByPetID(this.curRid);
		// }

		// /** 获取角色类型 */
		public getPetType(): number
		{
			return cfg.PetCfgData.getPetTypeByPetID(this.curRid);
		}

		//--------------------------------------------回合数据控制---------------------------------
		/** 进去回合 */
		public onStartRound(uCurRound: number)
		{
			this.m_clBattleBuffMgr.onRound();
		}

		/** 刷新本回合数据 */
		public updateRound()
		{
			this.m_clBattleBuffMgr.onRound();
		}


		//----------------------------------暂存战斗中数据状态-----------------------

		/** 添加buff状态 */
		public addBuffState(emType: Pb_God._emBuffControlType)
		{
			this.m_setBuffState.push(emType);
		}

		/** 是否存在buff状态 */
		public haveBuffState(...emTypeAry): boolean
		{
			let tmpResults = this.m_setBuffState.filter(element => emTypeAry.indexOf(element) >= 0);
			return tmpResults.length > 0;
		}

		/** 刷新当前buff状态 */
		public refreshBuffState()
		{
			this.m_setBuffState.splice(0, this.m_setBuffState.length);
			this.m_clBattleBuffMgr.refreshState();
		}

		/** 增加血量 */
		public updatePlayBackHp(hpChange: number, hpVallue: number, pSource?: RoleAtkData, pSkillIndex?: number)
		{
			this.updateSetCurHp(hpVallue);
			this.inDie = this.m_uCurHp == 0;
			if (this.isDead())
			{
				// this.callbackDead(pSource, pSkillIndex);
			}
		}

		private updateSetCurHp(value: number)
		{
			this._m_uCurHp = value;
			if(this._m_uCurHp>this.m_uCurMaxHp){
				this.m_uCurMaxHp=this._m_uCurHp;
			}
			
		}
	}
}