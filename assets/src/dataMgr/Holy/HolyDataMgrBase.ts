
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
	export class HolyDataMgrBase
	{
		protected _data: Pb_God.PBPlayerHoly;

		/** 初始化 */
		public init(data: Pb_God.PBPlayerHoly)
		{
			this._data = data;
		}

		/** 圣物属性 */
		public getHolyInfo(type: Pb_God._emPetType): Pb_God.PBPlayerHolyInfo
		{
			let results = this._data.info.filter(elment => elment.pettype == type);
			return results.length > 0 ? results[0] : null;
		}

		///////////////////// 红点 //////////////////////////
		public reddotModel: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			this.reddotModel.cleanUp(true);
			this.reddotModel.setSystemSwitchId(emSystemSwitchType.Element);
			//折成5个职业类型的子级
			for (let i = 1; i <= 5; i++)
			{
				let childModel = this.reddotModel.addChildModel(i);
				childModel.bindData = i;
				childModel.setupCheckMethod(this, this.isHaveFun);
			}
		}

		/** 刷新所有圣物的红点状态 */
		public refreshRedDotState(): void
		{
			this.reddotModel.refresh(true);
		}

		/** 圣物是否可以有功能操作 */
		private isHaveFun(reddotModel: RedDotModel): number
		{
			let type: Pb_God._emPetType = reddotModel.bindData;
			if (this.isHaveUnlock(type) || this.isHaveUpgrade(type) || this.isHaveUpstar(type))
			{
				return 1;
			}
			return 0;
		}

		/** 圣物是否可以解锁 */
		public isHaveUnlock(type: Pb_God._emPetType): boolean
		{
			let tmpHolyInfo = this.getHolyInfo(type);
			if (tmpHolyInfo != null)
			{
				return false;
			}

			PetDataMgr.resetHeroSelect();
			let NeedStarPetAry = cfg.HolyUnlockCfgData.getNeedPetAryByType(type);
			for (let i = 0; i < NeedStarPetAry.length; i++)
			{
				let tempInfo = NeedStarPetAry[i];
				let tempAry = PetDataMgr.getPetList().filter(elment => !elment.isSelected && !elment.onStore && !elment.islock &&
					type == cfg.PetCfgData.getPetTypeByPetID(elment.id) && elment.star == tempInfo.value1);
				if (tempAry.length >= tempInfo.value2)
				{
					for (let j = 0; j < tempInfo.value2; j++)
					{
						tempAry[j].isSelected = true;
					}
				}
				else
				{
					return false;
				}
			}

			return true;
		}

		/** 圣物是否可以升级 */
		public isHaveUpgrade(type: Pb_God._emPetType): boolean
		{
			let tmpHolyInfo = this.getHolyInfo(type);
			if (tmpHolyInfo == null)
			{
				return false;
			}

			let tmpUpLevelInfo = cfg.HolyUpgradeCfgData.getInfoByTypeAndLv(type, tmpHolyInfo.level);
			if (tmpHolyInfo.exp >= tmpUpLevelInfo.maxExp)
			{
				return false;
			}

			if (!Global.isFullAllRes(cfg.HolyUpgradeCfgData.getNeedItemAryByIndex(tmpUpLevelInfo.id), false))
			{
				return false;
			}

			return true;
		}

		/** 圣物是否可以升阶 */
		public isHaveUpstar(type: Pb_God._emPetType): boolean
		{
			let tmpHolyInfo = this.getHolyInfo(type);
			if (tmpHolyInfo == null)
			{
				return false;
			}

			let tmpCurAdvance = tmpHolyInfo.advance + 1;//  (Math.floor(Math.max(0, tmpHolyInfo.level - 1) / 10) + 1) * 10;
			let tmpAdvanceInfo = cfg.HolyAdvanceCfgData.getInfoByTypeAndLv(type, tmpCurAdvance);
			if (tmpAdvanceInfo == null)
			{
				return false;
			}
			if (tmpAdvanceInfo.needHolyLevel > tmpHolyInfo.level) return false;

			PetDataMgr.resetHeroSelect();
			let NeedStarPetAry = cfg.HolyAdvanceCfgData.getNeedPetAryByType(type);
			for (let i = 0; i < NeedStarPetAry.length; i++)
			{
				let tempInfo = NeedStarPetAry[i];
				let tempAry = PetDataMgr.getPetList().filter(elment => !elment.isSelected && !elment.onStore && !elment.islock &&
					type == cfg.PetCfgData.getPetTypeByPetID(elment.id) && elment.star == tempInfo.value1);
				if (tempAry.length >= tempInfo.value2)
				{
					for (let j = 0; j < tempInfo.value2; j++)
					{
						tempAry[j].isSelected = true;
					}
				}
				else
				{
					return false;
				}
			}

			if (!Global.isFullAllRes(cfg.HolyAdvanceCfgData.getNeedItemAryByIndex(tmpAdvanceInfo.id), false))
			{
				return false;
			}

			return true;
		}
	}
}
