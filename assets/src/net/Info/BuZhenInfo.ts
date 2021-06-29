
module Pro.Net
{
	/**
	 * 布阵信息
	 */
	export class BuZhenInfo
	{
		/**头槌等阵法id */
		private zhengfaId: number;				//阵法ID cs_pet表中阵法

		/**系别光环id组 */
		private zhenxingId: Array<number>;		//阵型ID cs_battle表中阵型
		private artifactid: number = 0;			//使用的神器ID
		private teamType: Pb_God._emZhenfaType;	//队伍类型
		private storePos: Array<Pb_God.PBPlayerZhenfaPos>;

		constructor(zhengfaid: number, teamType: number, posdata?: Pb_God.PBPlayerZhenfaPos[], artifactid: number = 0)
		{

			this.zhengfaId = zhengfaid;
			this.teamType = teamType;
			this.artifactid = artifactid;
			this.storePos = [];
			for (let j = 0; j < EmbattleDataMgr.getEmbattleMaxNum(); j++)
			{
				this.storePos.push(null);
			}

			posdata != null && posdata.forEach(element =>
			{
				this.storePos[element.pos - 1] = element;
			});

			this.refreshStatue();
		}

		public setTeamType(tType: Pb_God._emZhenfaType)
		{
			this.teamType = tType;
		}

		/**
		 * 克隆
		 */
		public clone(): BuZhenInfo
		{
			let tmpInfo = new BuZhenInfo(this.zhengfaId, this.teamType, null, this.artifactid);
			for (let i = 0; i < this.storePos.length; i++)
			{
				let posInfo = this.storePos[i];
				if (!posInfo)
				{
					tmpInfo.storePos[i] = null;
				}
				else
				{
					tmpInfo.storePos[i] = this.copyPosInfo(posInfo);
				}
			}
			tmpInfo.zhenxingId = [].concat(this.zhenxingId);
			return tmpInfo;
		}

		/**
		 * 复制
		 */
		public copy(copyInfo: BuZhenInfo)
		{
			this.zhengfaId = copyInfo.zhengfaId;
			this.zhenxingId = [].concat(copyInfo.zhenxingId);
			this.teamType = copyInfo.teamType;
			this.artifactid = copyInfo.artifactid;
			for (let i = 0; i < this.storePos.length; i++)
			{
				let posInfo = copyInfo.storePos[i];
				if (!posInfo)
				{
					this.storePos[i] = null;
				}
				else
				{
					this.storePos[i] = this.copyPosInfo(posInfo);
				}
			}
		}

		protected copyPosInfo(posInfo: Pb_God.PBPlayerZhenfaPos): Pb_God.PBPlayerZhenfaPos
		{
			let newposInfo = new Pb_God.PBPlayerZhenfaPos();
			newposInfo.pos = posInfo.pos;
			newposInfo.friendid = posInfo.friendid;
			newposInfo.petsn = posInfo.petsn;
			return newposInfo;
		}

		/**
		 * 获取阵法ID
		 */
		public getZhenfaId(): number
		{
			return this.zhengfaId;
		}

		/**
		 * 获取阵型ID
		 */
		public getZhenxingId(): Array<number>
		{
			return this.zhenxingId;
		}

		public setZhenxingId(value: Array<number>)
		{
			this.zhenxingId = value;
		}

		/**
		 * 获取神器ID
		 */
		public getArtifactId(): number
		{
			return this.artifactid;
		}

		/**
		 * 获取队伍类型
		 */
		public getTeamType(): number
		{
			return this.teamType;
		}

		/** 获取上阵信息 */
		public getPosAry(): Array<Pb_God.PBPlayerZhenfaPos>
		{
			return this.storePos;
		}

		/** 清空上阵列表 */
		public clearStore()
		{
			for (let j = 0; j < EmbattleDataMgr.getEmbattleMaxNum(); j++)
			{
				this.storePos[j] = null;
			}
		}

		/** 切换神器ID */
		public switchArtifactId(newId: number)
		{
			this.artifactid = newId;
		}

		/** 切换阵法阵型 */
		public switchZhenfaId(newId: number, tmpStoreSns: Array<Pb_God.PBPlayerZhenfaPos> = this.getPosData(true, true))
		{
			let tmpPosAry = this.getFormatPosAry(newId);
			if (tmpPosAry)
			{
				//设置新得阵法id
				this.zhengfaId = newId;
				//获取布阵队列
				this.switchzhenfaWithPos(tmpPosAry, tmpStoreSns);
			}
		}

		private getFormatPosAry(zhenfaID: number): cfg.ValueOneInfo[]
		{
			var arr: Array<cfg.ValueOneInfo>
			if (this.teamType == Pb_God._emZhenfaType.ZhenfaType_TeamCampaign)
			{
				arr = cfg.TeamCampaignFormationCfgData.getPosAryById(zhenfaID);
			} else
			{
				arr = cfg.PetFormationCfgData.getPosAryById(zhenfaID);
			}
			if (arr == null)
			{
				GameLaunch.PostClientLog("搞什么阵法没配置， teamType：" + this.teamType + " this.zhengfaId: " + zhenfaID)
			}
			return arr;
		}


		/** 根据指定位置换位置 */
		public switchzhenfaWithPos(tmpPosAry: Array<cfg.ValueOneInfo>, tmpStoreSns: Array<Pb_God.PBPlayerZhenfaPos> = this.getPosData(true, true))
		{
			//清空队列
			this.clearStore();

			//重新布阵
			let tmpIndex = 0;
			while (tmpStoreSns.length > 0 && tmpIndex < tmpPosAry.length)
			{

				let tmpPosInfo = tmpStoreSns[0];
				tmpPosInfo.pos = tmpPosAry[tmpIndex].value1;
				this.storePos[tmpPosInfo.pos - 1] = tmpPosInfo;

				tmpIndex++;
				tmpStoreSns.splice(0, 1);
			}
		}

		/** 获取所有上阵角色sn(排除好友增援) */
		public getStorePetSnList(): Long[]
		{
			let ret: Long[] = [];
			for (let i = 0; i < this.storePos.length; i++)
			{
				let el = this.storePos[i];
				if (el != null)
				{
					ret.push(el.petsn);
				}
			}
			return ret;
		}

		/** 获取所有上阵角色
		 * @param coverSupport 是否包含增援类型
		 * @param isRemoveFadeHero 是否排除已经删除的英雄
		 */
		public getPosData(coverSupport: boolean = true, newPosInfo: boolean = false, isRemoveFadeHero: boolean = false): Pb_God.PBPlayerZhenfaPos[]
		{
			let tmpData: Pb_God.PBPlayerZhenfaPos[] = [];
			for (let i = 0; i < this.storePos.length; i++)
			{
				let el = this.storePos[i];
				if (el == null) { continue; }
				if (isRemoveFadeHero && !el.friendid && !PetDataMgr.getPetInfo(el.petsn)) { continue; }
				if (!el.friendid || coverSupport) { tmpData.push(newPosInfo ? this.copyPosInfo(el) : el); }
			}
			return tmpData;
		}

		/** 获取伙伴在阵法中的坐标索引
		 * @param  supportPlayerId 支援英雄的好友Id
		 */
		public isOnStoreIndex(snid: Long): number
		{
			for (let i = 0; i < this.storePos.length; i++)
			{
				let el = this.storePos[i];
				if (el != null)
				{
					if (el.petsn.equals(snid)) { return i; }
				}
			}
			return -1;
		}

		/** 当前阵法上阵的个数 */
		public getOnStoreNum(): number
		{
			let tempNum = 0;
			for (let i = 0; i < this.storePos.length; i++)
			{
				if (this.storePos[i] != null)
				{
					tempNum++;
				}
			}
			return tempNum;
		}

		/** 获取当前副本队列的闲置位置 */
		public getFreeIndex(): number
		{
			let tmpPosAry = this.getFormatPosAry(this.zhengfaId);
			let tempIndex = -1;
			for (let i = 0; i < this.getPosAry().length; i++)
			{
				if (this.getPosAry()[i] == null && tmpPosAry.filter(elment => elment.value1 == (i + 1)).length > 0)
				{
					tempIndex = i;
					break;
				}
			}
			return tempIndex;
		}

		/** 判断同类型英雄是否上阵中 */
		public getStoredWithSameHeroID(petID: number): hero
		{
			for (let i = 0; i < this.getPosAry().length; i++)
			{
				let tempPosInfo = this.getPosAry()[i];
				if (tempPosInfo != null)
				{
					let tempHero = this.getHeroByStorePosInfo(tempPosInfo);
					if (tempHero && tempHero.id == petID)
					{
						return tempHero;
					}
				}
			}
			return null;
		}

		/** 判断同英雄是否上阵中 */
		public getStoredWithSameHeroSn(sn: Long): hero
		{
			for (let i = 0; i < this.getPosAry().length; i++)
			{
				let tempPosInfo = this.getPosAry()[i];
				if (tempPosInfo != null)
				{
					let tempHero = this.getHeroByStorePosInfo(tempPosInfo);
					if (tempHero && tempHero.sn == sn)
					{
						return tempHero;
					}
				}
			}
			return null;
		}

		/**
		 * 胡帕和解放胡帕不能一起上阵
		 */
		public hupaCheck(petID: number)
		{
			let hupas = [CfgID.PetID.HuPa, CfgID.PetID.HuPaLiberate];
			if (hupas.indexOf(petID) >= 0)
			{
				for (let i = 0; i < this.getPosAry().length; i++)
				{
					let tempPosInfo = this.getPosAry()[i];
					if (tempPosInfo != null)
					{
						let tempHero = this.getHeroByStorePosInfo(tempPosInfo);
						if (tempHero && hupas.indexOf(tempHero.id) >= 0)
						{
							return true;
						}
					}
				}
			}
			return false
		}

		/**
		 * 设置副本上阵英雄(id>0,index=-1,表示添加新的,id<0,index表示要删除的)
		 */
		public setStoreIndex(index: number, hero: Net.hero, showTips: boolean = true): boolean
		{
			//上阵最大英雄数
			let tmpMaxStoreNum = this.getFormatPosAry(this.zhengfaId).length;
			if (this.getOnStoreNum() == tmpMaxStoreNum)
			{
				showTips && TipsUtils.showTipsByLanId("tips_msg44");
				return false;
			}

			//是否在队列中
			let tmpOldIndex = this.isOnStoreIndex(hero.sn);
			if (tmpOldIndex == -1)
			{
				//判断是否会有多个雇佣英雄在阵上
				if (hero.supportMePlayerId)
				{
					let supportType = this.getSupportType();
					let maxSupportNum = cfg.CommonSupportCfgData.getFightCountByType(supportType);
					for (let i = 0; i < this.storePos.length; i++)
					{
						let posData = this.storePos[i];
						if (posData && posData.friendid)
						{
							maxSupportNum--;
							if (maxSupportNum <= 0)
							{
								showTips && TipsUtils.showTipsByLanId("support_msg1");
								return false;
							}
						}
					}
				}

				//判断同类型的英雄是否有阵上
				let tempHero = this.getStoredWithSameHeroID(hero.id);
				if (tempHero != null)
				{
					showTips && TipsUtils.showTipsByLanId("tips_msg45");
					return false;
				}

				//判断胡帕和解放胡帕上阵
				if (this.hupaCheck(hero.id))
				{
					showTips && TipsUtils.showTipsByLanId("tips_msg80");
					return false;
				}
			}

			//添加新的英雄
			if (index == -1)
			{
				if (tmpOldIndex == -1)
				{
					let newIndex = this.getFreeIndex();
					if (newIndex >= 0)
					{
						this.setHeroPos(hero, newIndex);
					}
				}
			}
			else
			{
				//判断是否处于闲置状态
				if (tmpOldIndex != -1 && index >= 0)
				{
					this.exChangeStore(tmpOldIndex, index);
					return false;
				}

				//设置坐标
				this.setHeroPos(hero, index);
			}

			this.refreshStatue();

			return true;
		}

		private setHeroPos(hero: Net.hero, index: number): void
		{
			if (index < 0) { return; }
			if (hero)
			{
				var posInfo = this.storePos[index] || new Pb_God.PBPlayerZhenfaPos();
				posInfo.pos = index + 1;
				posInfo.friendid = hero.supportMePlayerId;
				posInfo.petsn = hero.sn;
				this.storePos[index] = posInfo;
			} else
			{
				this.storePos[index] = null;
			}
		}

		/** 英雄下阵
		 * @param  supportPlayerId 如果是支援英雄，则为支援英雄的好友Id
		 */
		public removeStore(snid: Long)
		{
			let tempIndex = this.isOnStoreIndex(snid);
			this.removeStoreByIndex(tempIndex);
		}
		public removeStoreByIndex(index: number): void
		{
			if (index < 0)
			{
				return;
			}
			this.storePos[index] = null;
			this.refreshStatue();
		}

		/** 交换上阵英雄位置 */
		public exChangeStore(oldIndex: number, NewIndex: number)
		{
			let tempV = this.storePos[NewIndex];
			this.storePos[NewIndex] = this.storePos[oldIndex];
			this.storePos[oldIndex] = tempV;
			if (this.storePos[oldIndex]) { this.storePos[oldIndex].pos = oldIndex + 1; }
			if (this.storePos[NewIndex]) { this.storePos[NewIndex].pos = NewIndex + 1; }
			this.refreshStatue();
		}

		public getHeroByStorePosInfo(posInfo: Pb_God.PBPlayerZhenfaPos): Net.hero
		{
			if (posInfo)
			{
				if (!posInfo.friendid)
				{
					return PetDataMgr.getPetInfo(posInfo.petsn);
				}
				return FriendDataMgr.getHero(posInfo.petsn);
			}
			return null;
		}

		/** 布阵类型对应好友增援类型 */
		public getSupportType(): Pb_God._emFriendSupportType
		{
			let type = this.teamType;
			if (type == Pb_God._emZhenfaType.ZhenfaType_TeamCampaign) { return Pb_God._emFriendSupportType.FriendSupportType_TeamCampaign; }
			if (type == Pb_God._emZhenfaType.ZhenfaType_Endless) { return Pb_God._emFriendSupportType.FriendSupportType_Endless; }
			if (type == Pb_God._emZhenfaType.ZhenfaType_Expedition) { return Pb_God._emFriendSupportType.FriendSupportType_Expedition; }
			return 0;
		}


		/**
		 * 获取当前种族人数
		 */
		public getPetTypeNum(petType: number): number
		{
			let tmpPetTypeNum = 0;
			for (let i = 0; i < this.storePos.length; i++)
			{
				if (this.storePos[i] != null)
				{
					let tmpPetInfo = this.getHeroByStorePosInfo(this.storePos[i]);
					if (!tmpPetInfo) { continue; }
					if (cfg.PetCfgData.getPetTypeByPetID(tmpPetInfo.id) == petType)
					{
						tmpPetTypeNum += 1;
					}
				}
			}
			return tmpPetTypeNum;
		}

		/**
		 * 队伍编排刷新
		 */
		public refreshStatue()
		{

			//重置
			this.zhenxingId = new Array<number>();

			//记录各种族的个数
			let tmpMapTypeDic = new Laya.Dictionary();
			for (let i = 0; i < this.storePos.length; i++)
			{
				if (this.storePos[i] != null)
				{
					let tmpPetInfo = this.getHeroByStorePosInfo(this.storePos[i]);
					if (!tmpPetInfo) { continue; }
					let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(tmpPetInfo.id);
					let tmpPetTypeNum = tmpMapTypeDic.get(tmpPetType);
					if (tmpPetTypeNum == null)
					{
						tmpPetTypeNum = 0;
					}
					tmpPetTypeNum += 1;
					tmpMapTypeDic.set(tmpPetType, tmpPetTypeNum);
				}
			}

			if (tmpMapTypeDic.keys.length == 5)
			{
				this.zhenxingId.push(0);
			}
			else
			{
				for (let i = 0; i < tmpMapTypeDic.keys.length; i++)
				{
					let tmpPetType = tmpMapTypeDic.keys[i];
					let tmpPetNum = tmpMapTypeDic.get(tmpPetType);
					let tmpInfo = cfg.BattleFormationAttrCfgData.getInfoWithTypeNum(tmpPetType, tmpPetNum);
					if (tmpInfo != null)
					{
						this.zhenxingId.push(tmpInfo.iD);
					}
				}
			}
		}
	}
}