
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
	export class RiskDataMgrBase
	{
		constructor()
		{

		}

		/** 神界冒险基础数据 */
		protected _data: Pb_God.PBPlayerRisk;

		/** 本轮结束时间(秒) */
		public overTime = 0;
		/** 当前层所有地块格子数据 */
		public gridDataList: Pb_God.PBPlayerRiskGrid[] = [];
		/** 当前层的守卫信息（格子index作为key） */
		private _guardMap: ds.StringMap<RiskGuardInfo>;
		/** 当前层守卫的血量信息（在守卫数据未初始化时，保存起来） */
		private _guardhp: Pb_God.PBU32U64[] = [];

		/** 出战英雄列表 */
		private _petList: Pb_God.PBRiskPetDisplay[] = [];
		private _petMap = new ds.StringMap<Pb_God.PBRiskPetDisplay>();

		// ---- 商店数据-----
		/** 已经购买过的商品index */
		protected _shopBuyIds = new ds.StringMap<number>();

		/** 初始化数据 */
		public init(value: Pb_God.PBPlayerRisk): void
		{
			this._data = value;
			////登陆时与open同步的结构不一样，所以此处保存一个长度，用于判断当前是否有选了英雄即可
			this._petList = new Array<Pb_God.PBRiskPetDisplay>(value.petInfo.length);
			this.setGridList(value.gridinfo);
			this.setShopBuyList(value.shopbuypos);
			this.resetGuardHpList(value.guardhp);

			this.initRedDotModel();
		}

		/** 重置 */
		public reset(): void
		{
			this._petList = [];
			this._petMap.clear();
			this.setShopBuyList([]);
			this.refreshOverTime();
			this.reddotModel.refresh();
		}

		/** 设置出战英雄列表 */
		protected setFightPetList(list: Pb_God.PBRiskPetDisplay[]): void
		{
			this._petList = list;
			this._petMap.clear();
			for (let el of list)
			{
				this._petMap.put(el.petdisplay.sn + "", el);
			}
			this.reddotModel.refresh();
		}

		/** 刷新本轮重置时间 */
		public refreshOverTime(): void
		{
			let currTimer = TimeController.currTimer / 1000;
			let startServerTime = TimeController.worldCreateZeroTime / 1000; //开服时间
			let period: number = 2 * 24 * 3600; //周期, 2天
			this.overTime = currTimer + period - Math.floor(currTimer - startServerTime) % period;
		}

		public get data(): Pb_God.PBPlayerRisk
		{
			return this._data;
		}

		/** 获取英雄列表 */
		public getFightHeroList(): Pb_God.PBRiskPetDisplay[]
		{
			return this._petList;
		}

		public getHeroByIndex(index: number): Pb_God.PBRiskPetDisplay
		{
			return this._petList[index];
		}

		public getHeroBySn(sn: Long | number): Pb_God.PBRiskPetDisplay
		{
			return this._petMap.get(sn + "");
		}

		/** 是否已经选择了出战英雄 */
		public hasHeroFight(): boolean
		{
			return this._petList && this._petList.length > 0;
		}

		/** 是否已到最后一层 */
		public isAllPass(): boolean
		{
			return cfg.RiskGuardCfgData.getMaxStage() <= this._data.curstage;
		}


		/** 出战的英雄列表中，当前选中的索引 */
		private _operaHeroIndex: number = -1;
		public setOperaHeroIndex(value: number): void
		{
			if (this._operaHeroIndex == value) return;
			this._operaHeroIndex = value;
			EventMgr.trigger(EventNotify.Risk_Hero_Change, value);
		}
		public getOperaHeroIndex(): number
		{
			return this._operaHeroIndex;
		}


		/** 重置所有格子数据（进入新楼层） */
		public resetAllGrid(): void
		{
			//守卫列表
			this.resetGuardHpList([]);
			//格子列表
			this.gridDataList = [];
		}

		/** 设置格子信息列表 */
		protected setGridList(list: Pb_God.PBPlayerRiskGrid[], isCleanUp: boolean = true): void
		{
			if (isCleanUp) this.gridDataList = [];
			for (let el of list)
			{
				this.setSingleGridInfo(el, !isCleanUp);
			}
		}

		/** 设置单个格子数据 */
		protected setSingleGridInfo(grid: Pb_God.PBPlayerRiskGrid, notifyEvent: boolean = false): void
		{
			let index = grid.grid - 1;
			this.gridDataList[index] = grid;
			if (notifyEvent)
				EventMgr.trigger(EventNotify.Risk_SingleGrid_Update, index);
		}

		/** 设置守卫的血量列表 */
		protected resetGuardHpList(hpList: Pb_God.PBU32U64[])
		{
			this._guardhp = hpList;
			if (this._guardMap)
			{ //守卫信息有初化时才重置，否则不需处理
				this.resetGuardList();
			}
		}

		/** 守卫所在的索引位置(最后一个为终级BOSS) */
		private GUARD_POS = [16, 6, 8, 18, 12];
		/** 重置守卫信息 */
		private resetGuardList(): void
		{
			/** 当前楼层 */
			let curstage = this._data.curstage;
			if (!curstage) curstage = 1;
			let tempMap = {};
			for (let el of this._guardhp)
			{
				tempMap[el.key] = (el.value as Long).toNumber();
			}
			//统计前4个的状态，决定第5个BOSS是否开启
			let isAllKill = true;
			for (let i = 0; i < this.GUARD_POS.length; i++)
			{
				let posIndex = this.GUARD_POS[i];
				let guradData = this._guardMap.get(posIndex) || new RiskGuardInfo();
				this._guardMap.put(posIndex, guradData);
				guradData.grid = i + 1;

				let guradCfgInfo = cfg.RiskGuardCfgData.getInfoByStageAndIndex(curstage, i + 1);
				let hpValue = tempMap[guradCfgInfo.index];
				guradData.resetData(guradCfgInfo, hpValue == null ? -1 : hpValue);
				guradData.type = Pb_God._emRiskRefreshType.RiskRefreshType_GuardNormal1 + i;

				if (i == this.GUARD_POS.length - 1)
				{ //最后一个终级BOSS的开启状态，与前4个有关系。
					if (!isAllKill)
					{ //普通守卫还有没有挂掉的，则终级BOSS不开放
						guradData.openstate = Pb_God._emRiskGridOpenState.RiskGridOpenState_None;
					} else if (guradData.curHp <= 0)
					{
						//终级BOSS如果已经阵亡，则需要切换成传送门类型
						guradData.type = Pb_God._emRiskRefreshType.RiskRefreshType_Transfer;
						guradData.openstate = Pb_God._emRiskGridOpenState.RiskGridOpenState_OpenSee;
					} else
					{
						guradData.openstate = Pb_God._emRiskGridOpenState.RiskGridOpenState_OpenSee;
					}
				} else
				{
					if (guradData.openstate != Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect)
						isAllKill = false;
				}
			}
		}

		/** 更新单个守卫血量信息(仅更新血量，不切换守卫信息) */
		public resetSingleGuardHpInfo(index: number, hpValue: number): void
		{
			let guardCount = this.GUARD_POS.length;
			let guradCfgInfo = cfg.RiskGuardCfgData.getInfo(index);
			let guradData = this.getGuradInfoByGuardIndex(guradCfgInfo.guardIndex - 1);
			guradData.curHp = hpValue;
			if (guradCfgInfo.guardIndex < guardCount)
			{
				guradData.openstate = guradData.curHp <= 0 ? Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect : Pb_God._emRiskGridOpenState.RiskGridOpenState_OpenSee;
			}
			else
			{ //终级BOSS的类型需要切换成传送门
				guradData.openstate = Pb_God._emRiskGridOpenState.RiskGridOpenState_OpenSee;
				guradData.type = guradData.curHp <= 0 ? Pb_God._emRiskRefreshType.RiskRefreshType_Transfer : Pb_God._emRiskRefreshType.RiskRefreshType_GuardBoss;
			}
			EventMgr.trigger(EventNotify.Risk_SingleGrid_Update, this.GUARD_POS[guradCfgInfo.guardIndex - 1]);

			//如果不是终级BOSS，还需要再检查一次终级BOSS的状态
			if (guradCfgInfo.guardIndex < guardCount && hpValue <= 0)
			{
				for (var i = 0; i < guardCount - 1; i++)
				{
					let tmpGuard = this.getGuradInfoByGuardIndex(i);
					if (tmpGuard.openstate != Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect)
					{
						//只要有一个普通守卫还没击杀，终级BOSS就无需更新
						return;
					}
				}
				let boss = this.getGuradInfoByGuardIndex(guardCount - 1);
				let type = boss.curHp <= 0 ? Pb_God._emRiskRefreshType.RiskRefreshType_Transfer : Pb_God._emRiskRefreshType.RiskRefreshType_GuardBoss;
				let state = Pb_God._emRiskGridOpenState.RiskGridOpenState_OpenSee;
				if (boss.openstate != state || boss.type != type)
				{
					boss.openstate = state;
					boss.type = type;
					EventMgr.trigger(EventNotify.Risk_SingleGrid_Update, this.GUARD_POS[guardCount - 1]);
				}
			}
		}

		/** 格子上的BOSS(格子编号) */
		public getGuardInfoByGridindex(gridindex: number): RiskGuardInfo
		{
			if (!this._guardMap)
			{
				this._guardMap = new ds.StringMap<RiskGuardInfo>();
				this.resetGuardList();
			}
			return this._guardMap.get(gridindex);
		}

		/** 第几个BOSS(01234) */
		protected getGuradInfoByGuardIndex(index: number): RiskGuardInfo
		{
			return this.getGuardInfoByGridindex(this.GUARD_POS[index]);
		}

		/** 取得当前可操作的守卫列表 */
		public getActiveGuardList(): RiskGuardInfo[]
		{
			let list: RiskGuardInfo[] = [];
			//先检查普通守卫是否还有活口
			let guardCount = this.GUARD_POS.length;
			for (var i = 0; i < guardCount - 1; i++)
			{
				let tmpGuard = this.getGuradInfoByGuardIndex(i);
				if (tmpGuard.openstate != Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect)
				{
					list.push(tmpGuard);
				}
			}
			if (list.length > 0) return list;
			//再检查终级BOSS的
			let boss = this.getGuradInfoByGuardIndex(guardCount - 1);
			if (boss.openstate != Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect)
				return [boss];
			return [];
		}

		/** 已经购买过的商品列表 */
		public setShopBuyList(list: number[]): void
		{
			this._shopBuyIds = Global.listToStringMap(list, this._shopBuyIds);
		}
		/** 判断某个商品是否已经购买过 */
		public checkShopHasBuy(index: number): boolean
		{
			return !!this._shopBuyIds.get(index);
		}

		///////////////////// 红点 //////////////////////////
		public reddotModel: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			this.reddotModel.cleanUp(true);
			this.reddotModel.setSystemSwitchId(Pro.emSystemSwitchType.Risk);
			this.reddotModel.setupCheckMethod(this, this.getRedDot);
		}
		/** 红点信息 */
		private getRedDot(): number
		{
			// 英雄没选
			if (!this.hasHeroFight()) return 1;
			return 0;
		}
	}

	/** 单个守卫数据 */
	export class RiskGuardInfo
	{
		/** 格子ID */
		public grid: number;
		/** 数据表index */
		public cfgIndex: number;
		/** 怪物id */
		public monsterId: number;
		public guardIndex: number;
		/** 当前血量 */
		public curHp: number;
		/** 总血量 */
		public totalHp: number;
		/** 格子类型 */
		public type: Pb_God._emRiskRefreshType;
		/** 状态 */
		public openstate: Pb_God._emRiskGridOpenState;

		/** 初始化数据 */
		public resetData(cfgInfo: cfg.RiskGuardCfgInfo, hpValue: number = -1): void
		{
			//hpValue -1表示刚初始化满血状态
			this.cfgIndex = cfgInfo.index;
			this.monsterId = cfg.RiskGuardCfgData.getMonsterByIndex(cfgInfo.index);
			this.guardIndex = cfgInfo.guardIndex;
			let attrArr = cfg.RiskMonsterNewCfgData.getAddAttrAryById(this.monsterId);
			this.totalHp = Global.getAtterValue(attrArr, Pb_God._emBattleAttribute.BattleAttribute_HPMax);
			if (this.totalHp == 0)
			{
				this.totalHp = 1;
			}
			this.curHp = hpValue == -1 ? this.totalHp : hpValue;
			this.openstate = this.curHp <= 0 ? Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect : Pb_God._emRiskGridOpenState.RiskGridOpenState_OpenSee;
		}

	}
}
