
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
	export class ResonanceDataMgrBase
	{

		public info: Pb_God.PBPlayerResonance;
		constructor()
		{

		}

		private clear()
		{
			this.info = null;
		}

		public init(value: Pb_God.PBPlayerResonance)
		{
			this.clear();
			this.info = value;
			this.sortPets();
		}

		public sortPets()
		{
			if (this.info && this.info.resonanceinfo && this.info.resonanceinfo.length > 0)
			{
				let value = this.getInfoByType(Pb_God._emResonanceType.Resonance_Type_Level);
				if (value)
				{
					value.petlist.sort((a, b) =>
					{
						let petA = PetDataMgr.getPetInfo(a);
						let petB = PetDataMgr.getPetInfo(b);
						return petB.level - petA.level
					})
				}

				value = this.getInfoByType(Pb_God._emResonanceType.Resonance_Type_Star);

				if (value)
				{
					value.petlist.sort((a, b) =>
					{
						let petA = PetDataMgr.getPetInfo(a);
						let petB = PetDataMgr.getPetInfo(b);
						return petB.star - petA.star
					})
				}
			}
		}

		public getInfoByType(iType: Pb_God._emResonanceType)
		{
			for (let i = 0; i < this.info.resonanceinfo.length; i++)
			{
				if (this.info.resonanceinfo[i].type == iType)
					return this.info.resonanceinfo[i];
			}
		}

		public getLevelResonance()
		{
			return this.getInfoByType(Pb_God._emResonanceType.Resonance_Type_Level);
		}

		public getStarResonance()
		{
			return this.getInfoByType(Pb_God._emResonanceType.Resonance_Type_Star);
		}

		/**
		 * 根据类型和格子索引获取格子数据
		 * @param iType 
		 * @param index 
		 */
		public getGridByTypeAndGridIndex(iType: Pb_God._emResonanceType, index: number)
		{
			let info = this.getInfoByType(iType)
			for (let i = 0; i < info.grid.length; i++)
			{
				if (info.grid[i].grididx == index)
					return info.grid[i];
			}
		}

		/**
		 * 
		 * @param iType 根据类型获取格子数据
		 */
		public getGridsPetByType(iType: Pb_God._emResonanceType)
		{
			let arr: Long[] = [];
			let info = this.getInfoByType(iType)
			if (info)
			{
				let grids = info.grid;
				for (let i = 0; i < grids.length; i++)
				{
					grids[i].petsn && arr.push(grids[i].petsn);
				}
			}
			return arr;
		}

		// public checkCanOpenStarGrid()
		// {
		// 	let info = this.getStarResonance();
		// 	let nextGridConsume = cfg.ResonanceGridCfgData.getConsumeByTypeAndGridIndex(info.type, info.maxgrididx).split("_");
		// 	return DefendDataMgr.level >= parseInt(nextGridConsume[1])
		// }

		/**
		 * 获取决定星级的精灵
		 */
		public getMinStarPet()
		{
			let info = this.getStarResonance();
			if (!info)
				return;
			return info.petlist[info.petlist.length - 1];
		}

		/**
		 * 这一条用于判断数量对不对  
		 * 共鸣赋能的petList服务端下发的都是一样的 都可以用这个
		 * @param iType 
		 */
		public getResonanceOpenState()
		{
			let info = this.getLevelResonance();
			if (!info)
				return false;
			return info.petlist.length == 5;
		}

		/**
		 * 可能出现赋能精灵星级不满足的情况 这种服务端不管 客户端自己判断
		 */
		public getResonance2OpenState()
		{
			let info = this.getStarResonance();
			if (!info)
				return false;
			for (let i = 0; i < info.petlist.length; i++)
			{
				let petInfo = PetDataMgr.getPetInfo(info.petlist[i]);
				if (!petInfo)
					return false;
				if (petInfo.star < cfg.ResonanceCommonCfgData.getFirstInfo().minStar)
					return false;
			}
			return true;
		}

		public getStarGridDataByPetSn(sn: Long)
		{
			let info = this.getStarResonance()
			if (info)
			{
				for (let i = 0; i < info.grid.length; i++)
				{
					if (info.grid[i].petsn.equals(sn))
					{
						return info.grid[i];
					}
				}
			}
		}

		public getCanResonance2Count(id)
		{
			let pets = PetDataMgr.getPetListById(id);
			return pets.filter(element => element.star == 5 && element.level == 1 && !element.isFight && !element.isDefend && !element.getState(Pb_God._emPetStateType.PetStateType_ResonanceStar));
		}

		public getCountByType(itype: Pb_God._emResonanceType)
		{
			let typeInfo = this.getInfoByType(itype);
			let count = 0;
			for (let i = 0; i < typeInfo.grid.length; i++)
			{
				if (!typeInfo.grid[i].petsn.equals(Global.initLongFromValue(0)))
				{
					count++;
				}
			}
			return count;
		}

		/**
		 * 检测是否在格子中
		 */
		public checkIsInLevelGrid(iType: Pb_God._emResonanceType, sn: Long)
		{
			let sns = this.getGridsPetByType(iType)
			if (sns)
			{
				for (let i = 0; i < sns.length; i++)
				{
					if (sns[i].equals(sn))
					{
						return true;
					}
				}
			}
			return false;
		}
	}
}
