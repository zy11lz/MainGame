
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
	export class PetDataMgrBase
	{
		/** 拥有的宠物列表 */
		protected PetList: Array<Net.hero> = [];
		/** 宠物sn映射， 简化查找 */
		protected PetMapSn = new ds.StringMap<Net.hero>();
		/** 购买的空间上限 */
		protected PetBuyspace: number = 0;
		/** 伙伴重生次数 */
		public rebirthCount = 0;
		/** 购买重生的次数 */
		public buyRebirthCount = 0;

		/** 见过的英雄 */
		public seenpets: number[] = [];
		/** 已领取的宠物档案奖励 */
		public rewardpets: number[] = [];


		constructor()
		{

		}

		/** 初始化 */
		public init(subpets: Pb_God.PBPlayerPet, petExt2: Pb_God.PBPlayerPetExt, petExt3: Pb_God.PBPlayerPetExt)
		{
			this.IsGuideFirstFiveStar = 0;
			this.PetBuyspace = subpets.buyspace;
			this.PetList.splice(0, this.PetList.length);
			this.PetMapSn.clear();
			this.rebirthCount = subpets.reborncount;
			this.buyRebirthCount = subpets.rebornbuycount;
			this.seenpets = subpets.seenpets;
			this.rewardpets = subpets.rewardpets;


			this._defendOpen = false;

			//读取伙伴数据
			for (let i = 0; i < subpets.pet.length; i++)
			{
				this.addNewPet(subpets.pet[i], true);
			}
			//扩展列表
			if (petExt2 && petExt2.pet)
			{
				for (let i = 0; i < petExt2.pet.length; i++)
				{
					this.addNewPet(petExt2.pet[i], true);
				}
			}
			if (petExt3 && petExt3.pet)
			{
				for (let i = 0; i < petExt3.pet.length; i++)
				{
					this.addNewPet(petExt3.pet[i], true);
				}
			}

			this.initRedDotModel();
		}

		/** 隔天重置 */
		public resetNewDay(): void
		{
			this.rebirthCount = 0;
			this.buyRebirthCount = 0;
		}

		/** 添加一个宠物 */
		public addNewPet(tempData: Pb_God.PBPlayerPetInfo, isInit: boolean = false)
		{
			let tempInfo = this.shiftHeroInfo(tempData);
			this.PetList.push(tempInfo);
			this.seenpets.push(tempData.display.id);
			this.PetMapSn.put(tempInfo.sn + "", tempInfo);
			//首次获得5星英雄的引导处理
			if (tempInfo.star >= 5) { this.setHaveFiveStarPet(!isInit); }
			SuitEquipDataMgr.initSuitMgr(tempData);
			this.refreshDefendData();

		}
		/** hero数据转换 */
		public shiftHeroInfo(tempData: Pb_God.PBPlayerPetInfo, baseHero: Net.hero = null): Net.hero
		{
			let tempInfo = baseHero || new Net.hero();
			for (var key in tempData)
			{
				tempInfo[key] = tempData[key];
			}
			for (var key in tempData.display)
			{
				tempInfo[key] = tempData.display[key];
			}
			return tempInfo;
		}

		//----------------------------------英雄数据---------------------------------------------------
		/** 伙伴数据重新排序 */
		public rankPetList()
		{
			this.PetList.sort(this.sortAllHeroList);
			this.combinReddotModel.refresh();
			EventMgr.trigger(EventNotify.Pet_Changed);
		}

		/** 获取背包格子数 */
		public getSpaceNum(): number
		{
			let defualtNum = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_DefaultPetSpace);
			//vip特权增加的格子数
			let vipAddNum = PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_HeroSpace);
			return this.PetBuyspace + defualtNum + vipAddNum;
		}

		/** 当前买过的格子数 */
		public getBuySpaceNum(): number
		{
			return this.PetBuyspace;
		}

		/** 获取指定宠物数据列表 */
		public getPetList(petType?: Pb_God._emPetType): Array<Net.hero>
		{
			if (petType != null && petType > 0)
			{
				return this.PetList.filter(elment => cfg.PetCfgData.getPetTypeByPetID(elment.id) == petType);
			}
			return this.PetList;
		}
		/**援军开启 */
		private _defendOpen: boolean = false;
		/**所有可以当作援军的英雄 */
		private _defendHeroArr: Array<Net.hero>;
		/**没有上阵的英雄 */
		private _defendUsedHeroArr2: Array<Net.hero>;
		/**没有上阵也没当援军的英雄 */
		private _defendUsedHeroArr: Array<Net.hero>;

		/**已经上阵的英雄 */
		private _defendFightHeroArr: Array<Net.hero>;


		public refreshDefendData()
		{
			if (this._defendOpen)
			{
				this.refreshDefendPetArr()
				DefendDataMgr.refreshRedDotState();
			}
		}

		public refreshDefendPetArr()
		{
			if (!this._defendOpen) { return; }
			this.PetList.sort(this.sortAllHeroList);
			this._defendHeroArr = this.PetList.filter(
				elment =>
				{
					if (!cfg.DefendSkillCfgData.getInfo(elment.id)) { return false; }
					return true;
				}
			)

			this._defendFightHeroArr = this._defendHeroArr.filter(
				elment =>
				{
					if (elment.isFight) { return true; }
					return false
				}
			)


			//每一种英雄只选择其中最大的
			//let dic={};

			this._defendUsedHeroArr2 = this._defendHeroArr.filter(
				elment =>
				{
					if (elment.isFight) { return false; }
					//if(dic[elment.id])return false;
					//dic[elment.id]=true;
					return true
				}
			)

			this._defendUsedHeroArr = this._defendUsedHeroArr2.filter(
				elment =>
				{
					if (DefendDataMgr.getPetSlot3(elment.id)) { return false; }
					return true
				}
			)
		}

		/** 排除布局的宠物数据列表*/
		public getDefendUsedHeroArr(): Array<Net.hero>
		{
			if (!this._defendOpen)
			{
				this._defendOpen = true;
				this.refreshDefendPetArr();
			}
			return this._defendUsedHeroArr;
		}
		/** 排除指定的hero */
		public getDefendUsedHeroArr2(hero: Net.hero, heroArr: Net.hero[] = null): Array<Net.hero>
		{
			if (!this._defendOpen)
			{
				this._defendOpen = true;
				this.refreshDefendPetArr();
			}
			if (!heroArr)
			{
				heroArr = this._defendUsedHeroArr2.concat(this._defendFightHeroArr);
			}
			return heroArr.filter(
				elment =>
				{
					//if(elment.id==hero.id){
					if(elment==hero){	
						//if(elment==hero)return false;
						//if (elment.star != hero.star) return (elment.star - hero.star)>0;
						//if (elment.fightpower != hero.fightpower) return (elment.fightpower - hero.fightpower)>0;
						return false;
					}
					return true
				}
			)
		}

		/** 获取援军当前宠物数据列表 */
		public getDefendPetList(): Array<Net.hero>
		{
			if (!this._defendOpen)
			{
				this._defendOpen = true;
				this.refreshDefendPetArr();
			}
			return this._defendHeroArr;
		}
		/**没有上阵的英雄 */
		public getDefendPetList2(): Array<Net.hero>
		{
			if (!this._defendOpen)
			{
				this._defendOpen = true;
				this.refreshDefendPetArr();
			}
			return this._defendUsedHeroArr2;
		}
		/**获得已经上阵的英雄 */
		public getDefendFightList(): Array<Net.hero>
		{
			if (!this._defendOpen)
			{
				this._defendOpen = true;
				this.refreshDefendPetArr();
			}
			return this._defendFightHeroArr;
		}

		/**
		 * 根据皮肤获取可放置入图鉴的精灵
		 * @param skinId
		 */
		public getPetListBySkinId(skinId: number): Array<Net.hero>
		{
			return this.PetList.filter(element => element.useskinid == skinId);
		}

		/** 获取一个宠物的数据 */
		public getPetInfo(snID: Long): Net.hero
		{
			return this.PetMapSn.get(snID + "");
		}

		/** 获取所有英雄中，战斗力最高值 */
		public getMaxFightPower(): number
		{
			let ret = 0;
			for (var el of this.PetList)
			{
				if (el.fightpower > ret) { ret = el.fightpower }
			}
			return ret;
		}

		/** 获取英雄指定属性值 */
		public getPetAttrValue(sn: Long, type: Pb_God._emBattleAttribute): number
		{
			let hero = this.getPetInfo(sn);
			if (!hero) { return 0; }
			for (var attr of hero.attr)
			{
				if (attr.type == type) { return Global.longToNumber(attr.value); }
			}
			return 0;
		}
		/** 设置英雄状态属性值 */
		public setPetStateValue(value: Pb_God.PBG2CPetStateChg)
		{
			let hero = this.getPetInfo(value.petsn);
			if (!hero) { return; }
			hero.state = value.state;

			this.refreshDefendData();

			return 0;
		}

		/** 英雄列表排序 */
		private sortAllHeroList(a: Net.hero, b: Net.hero): number
		{
			// if (a.onMainLineStore != b.onMainLineStore)
			// 	return a.onMainLineStore ? -1 : 1;
			if (a.star != b.star) { return b.star - a.star; }
			if (a.fightpower != b.fightpower) { return b.fightpower - a.fightpower; }
			return a.id - b.id;
		}

		/** 刷新主线的英雄上阵情况 */
		public refreshOnStoreHeroForMainLine()
		{
			let tmpZhanFa = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
			if (!tmpZhanFa) { return; }
			for (let elment of this.getPetList())
			{
				elment.onMainLineStore = elment.onStore = tmpZhanFa.isOnStoreIndex(elment.sn) >= 0;
				this.refreshOnStoreHeroReddotModel(elment);
			}
			this.rankPetList();
		}

		/** 刷新解锁过的英雄上阵情况 */
		public refreshOnStoreHeroWithZhenfa(tmpInfo: Net.BuZhenInfo)
		{
			if (tmpInfo == null)
			{
				return;
			}
			if (tmpInfo.getTeamType() == Pb_God._emZhenfaType.ZhenfaType_Heaven1 ||
				tmpInfo.getTeamType() == Pb_God._emZhenfaType.ZhenfaType_Heaven2)
			{
				// 天界副本上阵 需要同时检测2队
				let tmpTeam_1 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Heaven1);
				let tmpTeam_2 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Heaven2);
				this.getPetList().forEach(elment =>
				{
					let is_on_team_1 = tmpTeam_1.isOnStoreIndex(elment.sn) >= 0;
					let is_on_team_2 = tmpTeam_2 ? tmpTeam_2.isOnStoreIndex(elment.sn) >= 0 : false;
					elment.onStore = is_on_team_1 || is_on_team_2;
					if (is_on_team_1)
					{ elment.onStoreTeam = Pb_God._emZhenfaType.ZhenfaType_Heaven1; }
					else if (is_on_team_2)
					{ elment.onStoreTeam = Pb_God._emZhenfaType.ZhenfaType_Heaven2; }
					else
					{ elment.onStoreTeam = undefined; }
				});
			}
			else if (tmpInfo.getTeamType() == Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF1 ||
				tmpInfo.getTeamType() == Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF2 || tmpInfo.getTeamType() == Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF3)
			{
				let tmpTeam_1 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF1);
				let tmpTeam_2 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF2);
				let tmpTeam_3 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF3);
				this.getPetList().forEach(elment =>
				{
					let is_on_team_1 = tmpTeam_1.isOnStoreIndex(elment.sn) >= 0;
					let is_on_team_2 = tmpTeam_2 ? tmpTeam_2.isOnStoreIndex(elment.sn) >= 0 : false;
					let is_on_team_3 = tmpTeam_3 ? tmpTeam_3.isOnStoreIndex(elment.sn) >= 0 : false;
					elment.onStore = is_on_team_1 || is_on_team_2 || is_on_team_3;
					if (is_on_team_1)
					{ elment.onStoreTeam = Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF1; }
					else if (is_on_team_2)
					{ elment.onStoreTeam = Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF2; }
					else if (is_on_team_3)
					{ elment.onStoreTeam = Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF3; }
					else
					{ elment.onStoreTeam = undefined; }
				});
			} else if (tmpInfo.getTeamType() == Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 ||
				tmpInfo.getTeamType() == Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK2 || tmpInfo.getTeamType() == Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK3)
			{
				let tmpTeam_1 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1);
				let tmpTeam_2 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK2);
				let tmpTeam_3 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK3);
				this.getPetList().forEach(elment =>
				{
					let is_on_team_1 = tmpTeam_1.isOnStoreIndex(elment.sn) >= 0;
					let is_on_team_2 = tmpTeam_2 ? tmpTeam_2.isOnStoreIndex(elment.sn) >= 0 : false;
					let is_on_team_3 = tmpTeam_3 ? tmpTeam_3.isOnStoreIndex(elment.sn) >= 0 : false;
					elment.onStore = is_on_team_1 || is_on_team_2 || is_on_team_3;
					if (is_on_team_1)
					{ elment.onStoreTeam = Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1; }
					else if (is_on_team_2)
					{ elment.onStoreTeam = Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK2; }
					else if (is_on_team_3)
					{ elment.onStoreTeam = Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK3; }
					else
					{ elment.onStoreTeam = undefined; }
				});
			}
			else
			{
				this.getPetList().forEach(elment =>
				{
					elment.onStore = tmpInfo.isOnStoreIndex(elment.sn) >= 0;
				});
			}
		}

		/** 获取当前主线阵法中上阵的英雄列表 */
		public getOnStoreHeroForMainLine(): Net.hero[]
		{
			return this.getPetList().filter(element => element.onStore);
		}

		/** 重置英雄的标志 */
		public resetHeroSelect(): void
		{
			this.getPetList().forEach(element =>
			{
				element.isSelected = false;
			});
		}

		/** 刷新远航英雄上阵情况 */
		public refreshOnSailHero()
		{
			let tempSailList = SailDataMgr.getAcceptList();
			let tempSailPetSns = [];
			tempSailList.forEach(elment =>
			{
				tempSailPetSns = tempSailPetSns.concat(elment.petsn);
			});
			this.getPetList().forEach(elment =>
			{
				elment.onSail = tempSailPetSns.filter(snElment => snElment.equals(elment.sn)).length > 0;
				elment.isSelected = elment.onSail;
			});
		}

		//--------------------------------------英雄融合-----------------------------
		/** 英雄合成进度 */
		private getHeroCombinProNum(MainPetId: number, MainPetStar: number): Array<number>
		{

			this.resetHeroSelect();

			let tmpMainPetType = cfg.PetCfgData.getPetTypeByPetID(MainPetId);
			let tmpUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(MainPetId, MainPetStar);
			let NeedMainPetCount = 1;
			let NeedStarCountAry = cfg.PetUpStarCfgData.getNeedStarCountAryById(tmpUpStarInfo.id);
			let NeedStarPetAry = cfg.PetUpStarCfgData.getNeedStarPetAryById(tmpUpStarInfo.id);
			let NeedAnyStarPetAry = cfg.PetUpStarCfgData.getNeedAnyStarPetAryById(tmpUpStarInfo.id);
			let NeedItemAry = cfg.PetUpStarCfgData.getNeedItemAryById(tmpUpStarInfo.id);

			let tmpMaxNum = 0;
			let tmpUnNum = 0;
			if (NeedMainPetCount > 0)
			{
				tmpMaxNum += 1;
				tmpUnNum += this.getUnSelectPetIDList(MainPetId, MainPetStar - 1, 1);
			}
			if (NeedStarCountAry.length > 0)
			{
				for (let i = 0; i < NeedStarCountAry.length; i++)
				{
					let tempInfo = NeedStarCountAry[i];
					tmpUnNum += this.getUnSelectPetIDList(tempInfo.value1, tempInfo.value2, tempInfo.value3);
					tmpMaxNum += tempInfo.value3;
				}
			}
			if (NeedStarPetAry.length > 0)
			{
				for (let i = 0; i < NeedStarPetAry.length; i++)
				{
					let tempInfo = NeedStarPetAry[i];
					tmpUnNum += this.getUnSelectPetStarList(tempInfo.value1, true, tmpMainPetType, tempInfo.value2);
					tmpMaxNum += tempInfo.value2;
				}
			}
			if (NeedAnyStarPetAry.length > 0)
			{
				for (let i = 0; i < NeedAnyStarPetAry.length; i++)
				{
					let tempInfo = NeedAnyStarPetAry[i];
					tmpUnNum += this.getUnSelectPetStarList(tempInfo.value1, false, tmpMainPetType, tempInfo.value2);
					tmpMaxNum += tempInfo.value2;
				}
			}
			if (NeedItemAry.length > 0)
			{
				for (let i = 0; i < NeedItemAry.length; i++)
				{
					let tempInfo = NeedItemAry[i];
					if (!Global.isFullRes(tempInfo.itemid, tempInfo.itemcount, false))
					{
						tmpUnNum++;
					}
					tmpMaxNum++;
				}
			}
			return [tmpMaxNum - tmpUnNum, tmpMaxNum];
		}

		/** 获取未被选择的指定英雄列表 */
		private getUnSelectPetIDList(petId: number, petStar: number, needNum: number): number
		{
			let tempPetList = this.getPetList();
			let tempResults = tempPetList.filter(elment => !elment.onStore && !elment.islock &&
				elment.id == petId && elment.star == petStar &&
				!elment.isSelected);
			for (let i = 0; i < tempResults.length; i++)
			{
				if (needNum == 0)
				{
					break;
				}
				tempResults[i].isSelected = true;
				needNum--;
			}

			return needNum;
		}

		/** 获取未被选择的指定英雄星级列表 */
		private getUnSelectPetStarList(petStar: number, isSamePetType: boolean, mainPetType: number, needNum: number): number
		{
			let tempPetList = this.getPetList();
			let tempResults = tempPetList.filter(elment => !elment.onStore && !elment.islock &&
				elment.star == petStar &&
				((isSamePetType && cfg.PetCfgData.getPetTypeByPetID(elment.id) == mainPetType) || !isSamePetType) &&
				!elment.isSelected);
			for (let i = 0; i < tempResults.length; i++)
			{
				if (needNum == 0)
				{
					break;
				}
				tempResults[i].isSelected = true;
				needNum--;
			}

			return needNum;
		}

		/**
		 * 刷新一下精灵的上阵情况（包括各种战斗布阵, 只要有上阵的，此方法都会将onstore置为true）
		 */
		public refreshPetOnStore(hero: Net.hero)
		{
			hero.onStore = false;
			for (let i = Pb_God._emZhenfaType.ZhenfaType_Zhuxian; i <= Pb_God._emZhenfaType.ZhenfaType_Duanwei2; i++)
			{
				let tmpZhanFa = EmbattleDataMgr.getBuZhenInfo(i);
				hero.onStore = tmpZhanFa && tmpZhanFa.isOnStoreIndex(hero.sn) >= 0;
				if (hero.onStore)
				{ return tmpZhanFa.getTeamType(); }
			}
			return -1
		}

		/** 判断英雄是否上阵（包括各种战斗布阵, 只要有上阵的，此方法都会将onstore置为true） */
		public checkPetOnStore(hero: Net.hero, isShowTips: boolean = false, func: Function = null): boolean
		{
			let returnFlag;
			if (!hero)
			{ returnFlag = false; }
			/**
			 * 按照以下优先级进行操作提示
				1.该英雄在剧情阵容中已上阵
				2.该英雄在竞技场防守阵容中已上阵
				3.该英雄在精英赛阵容中已上阵；即冠军赛防守、天梯赛防守、段位赛常规的阵容
			 */
			//剧情阵容
			if (this.checkPetOnStoreByZhenfa(hero, Pb_God._emZhenfaType.ZhenfaType_Zhuxian, isShowTips && Global.getLangStr("heroSplit_msg3"), func))
			{
				returnFlag = true;
			}
			//竞技场防守
			if (this.checkPetOnStoreByZhenfa(hero, Pb_God._emZhenfaType.ZhenfaType_Jingjichang, isShowTips && Global.getLangStr("heroSplit_msg4"), func))
			{
				returnFlag = true;
			}

			//冠军赛防守
			if (this.checkPetOnStoreByZhenfa(hero, Pb_God._emZhenfaType.ZhenfaType_Guanjun, isShowTips && Global.getLangStr("heroSplit_msg5"), func))
			{
				returnFlag = true;
			}
			//天梯赛防守
			if (this.checkPetOnStoreByZhenfa(hero, Pb_God._emZhenfaType.ZhenfaType_Tianti, isShowTips && Global.getLangStr("heroSplit_msg5"), func))
			{
				returnFlag = true;
			}
			//段位赛常规的阵容
			if (this.checkPetOnStoreByZhenfa(hero, Pb_God._emZhenfaType.ZhenfaType_Duanwei, isShowTips && Global.getLangStr("heroSplit_msg5"), func))
			{
				returnFlag = true;
			}
			//段位赛王者的阵容2
			if (this.checkPetOnStoreByZhenfa(hero, Pb_God._emZhenfaType.ZhenfaType_Duanwei2, isShowTips && Global.getLangStr("heroSplit_msg5"), func))
			{
				returnFlag = true;
			}
			//待扩充
			//...

			if (!returnFlag)
			{
				func && func();
			}
			return returnFlag;
		}

		/** 判断英雄在某阵法上已上阵 */
		private checkPetOnStoreByZhenfa(hero: Net.hero, zhenfaType: Pb_God._emZhenfaType, showTips: string, func): boolean
		{
			if (hero == null)
			{
				return false;
			}
			let tmpZhanFa = EmbattleDataMgr.getBuZhenInfo(zhenfaType);
			let isOnStore = tmpZhanFa && tmpZhanFa.isOnStoreIndex(hero.sn) >= 0;
			if (isOnStore)
			{
				if (showTips)
				{
					AlertShow.showConfirmAlert(showTips, this, () =>
					{
						if (tmpZhanFa.getOnStoreNum() <= 1)
						{
							let teamType = tmpZhanFa.getTeamType()
							teamType = Math.min(5, teamType);
							TipsUtils.showTipsByLanId("tips_msg73", Global.getLangStr(`zhenfatype_name_${ teamType }`));
							return;
						}
						this.calcelAllStoreHero(hero, func);
					})
				}
				return true;
			}
			return false;
		}

		/**
		 * 取消所有上阵
		 */
		private calcelAllStoreHero(hero: Net.hero, func)
		{
			for (let i = 1; i <= 6; i++)
			{
				let tmpZhanFa = EmbattleDataMgr.getBuZhenInfo(i);
				if (tmpZhanFa && tmpZhanFa.isOnStoreIndex(hero.sn) >= 0)
				{
					tmpZhanFa.removeStore(hero.sn);
					PetSend.set_Zhenfa_Ask(i, tmpZhanFa.getZhenfaId(), tmpZhanFa.getPosData(false), tmpZhanFa.getArtifactId());
				}
			}
			func && func();
		}

		/** 首个5星英雄是否引导 */
		public IsGuideFirstFiveStar = 0;
		/** 标记已经获得5星英雄了 */
		protected setHaveFiveStarPet(needStartGuide: boolean)
		{
			if (this.IsGuideFirstFiveStar) { return; }
			if (needStartGuide)
			{
				if (GuideMgr.Inst.getGuideStatue(false, false)) { return; } //还在前期新手引导中，先等等
				this.IsGuideFirstFiveStar = 1;
				GameLaunch.saveClientData();
				//首次变成true的时候，需要记录一个布阵的引导, 等弹窗后再正式开启
				FuncGuideMgr.Inst.setPreFuncGuideTag(GuideStep.Func_Pet5StarEmbattle_1);
			} else
			{ //如果只是初始化，就给个值标记，在gamalaunch时有个默认值
				this.IsGuideFirstFiveStar = 1;
			}
		}


		////////////////////////////////////////////////////////////////////////////////////
		//--------------------------------------红点逻辑-----------------------------
		////////////////////////////////////////////////////////////////////////////////////
		/** 英雄融合红点模型 */
		public combinReddotModel: RedDotModel = new RedDotModel();
		/** 伙伴可操作性的红点模型，  分为三层树型结构：
		 * 顶级，用于控制英雄按钮与英雄背包分页按钮的红点状态 ↓↓↓
		 * 拆分为5个(或者少于5个)子级模型，每一个子级关联一个上阵主线的英雄。 ↓↓↓
		 * 每个英雄红点拆分为5个子级：培养（升级进阶）、升星、天赋（穿戴和升级）、装备穿戴、符文、神装。
		 * 维护红点状态时，只需维护最后一层即可，上层会自动驱动。
		 */
		public actionRedDotModel: RedDotModel = new RedDotModel();
		/** 临时英雄红点模型，只在打开英雄培养界面并且为非主线上阵英雄时才用到，用完即清 */
		private _tempHeroRedDotModel: RedDotModel;
		/** 英雄预览档案红单模型 关联档案奖励是否领取 */
		public bookArchivesRedDotModel: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			this.combinReddotModel.cleanUp(true);
			this.combinReddotModel.setSystemSwitchId(Pro.emSystemSwitchType.PetCombin);
			this.combinReddotModel.setupCheckMethod(this, this.isHaveCombinFun);
			this.combinReddotModel.addGlobalEventRefresh(EventNotify.Embattle_Save, Pb_God._emZhenfaType.ZhenfaType_Zhuxian);

			this.bookArchivesRedDotModel.cleanUp(true);
			this.bookArchivesRedDotModel.setupCheckMethod(this,() =>
			{
				return this.isShowArchives(0);
			});
			this.bookArchivesRedDotModel.addGlobalEventRefresh(CmdEvent.Pet_PetAchivesReward_Chg);
			this.bookArchivesRedDotModel.addGlobalEventRefresh(CmdEvent.Pet_AddNew_Ack);

			this.actionRedDotModel.cleanUp(true);
			this.refreshOnStoreHerosReddotModel();
			this.clearTempHeroReddotModel();
		}

		/** 刷新主线上阵英雄关联的红点数据 */
		protected refreshOnStoreHerosReddotModel(): void
		{
			let tempPetList = this.getPetList();
			for (var petInfo of tempPetList)
			{
				this.refreshOnStoreHeroReddotModel(petInfo);
			}
		}
		/** 刷新指定英雄关联的红点数据，同时检查是否在主线上阵 */
		public refreshOnStoreHeroReddotModel(petInfo: Net.hero): void
		{
			if (petInfo.onMainLineStore)
			{
				if (!this.actionRedDotModel.getChildModel(petInfo.sn))
				{
					var model = this.createPetRedDotModel(petInfo.sn);
					petInfo.reddotModel = model;
					this.actionRedDotModel.addChildModel(petInfo.sn, model);
				}
			} else
			{
				petInfo.reddotModel = null;
				this.actionRedDotModel.removeChildModel(petInfo.sn, true, true);
			}
		}

		/** 刷新指定英雄的指定模块红点 */
		protected refreshPetReddotByType(sn: Long, type: string = null): void
		{
			let reddot = this.getPetRedDotModel(sn);
			if (!reddot) { return; }
			if (!type) { Laya.timer.callLater(reddot, reddot.refresh, [true]); } //reddot.refresh(true);
			else
			{
				let child = reddot.getChildModel(type);
				if (child) { Laya.timer.callLater(child, child.refresh); }// child.refresh();
			}
		}

		/** 获取指定英雄的红点信息
		 * @param isOpTemp 是否包括操作临时英雄红点数据
		 */
		public getPetRedDotModel(sn: Long, isOpTemp: boolean = false): RedDotModel
		{
			let reddot = this.actionRedDotModel.getChildModel(sn);
			if (reddot)
			{
				if (isOpTemp) { this.clearTempHeroReddotModel(); }
				return reddot;
			}
			if (!isOpTemp) { return null; }

			if (!this._tempHeroRedDotModel || !sn.equals(this._tempHeroRedDotModel.bindData))
			{
				this.clearTempHeroReddotModel();
				this._tempHeroRedDotModel = this.createPetRedDotModel(sn, true);
			}
			return this._tempHeroRedDotModel;
		}
		/** 清理临时英雄红点模型 */
		public clearTempHeroReddotModel(): void
		{
			if (!this._tempHeroRedDotModel) { return; }
			this._tempHeroRedDotModel.cleanUp(true);
			this._tempHeroRedDotModel = null;
		}

		/** 构建一个英雄红点模型 */
		private createPetRedDotModel(sn: Long, isTemp: boolean = false): RedDotModel
		{
			let model = new RedDotModel(!isTemp);
			model.bindData = sn;
			//培养（升级和进阶）
			let childModel = model.addChildModel("upgrade", null, sn);
			childModel.setupCheckMethod(this, (tempModel: RedDotModel) =>
			{
				let sn = tempModel.bindData;
				let tempPetInfo = this.getPetInfo(sn);
				let needItems: cfg.AddItemInfo[] = []; //记录升级或进阶需要用到的道具列表，以便于监听
				let ret = this.isHaveSubPetUpgrade(tempPetInfo, needItems) || this.isHaveSubPetUpAdvance(tempPetInfo, needItems);
				tempModel.setPlayerItemInfosListener(needItems);
				return ret;
			});
			//升星
			childModel = model.addChildModel("upstar", null, sn);
			childModel.setupCheckMethod(this, this.isHaveSubPetUpStar);
			childModel.addGlobalEventRefresh(EventNotify.Pet_Star_Changed);  //有其它伙伴星级变化时，也会影响其它伙伴的升星条件
			childModel.addGlobalEventRefresh(CmdEvent.Pet_AddNew_Ack);  //有其它伙伴星级变化时，也会影响其它伙伴的升星条件
			childModel.addGlobalEventRefresh(CmdEvent.Pet_Remove_Ack);  //有其它伙伴星级变化时，也会影响其它伙伴的升星条件
			childModel.addGlobalEventRefresh(EventNotify.Embattle_Save, Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
			//天赋（穿戴和升级）
			childModel = model.addChildModel("talent", null, sn);
			childModel.setupCheckMethod(this, this.isHaveSubPetTalentAction);
			//装备穿戴。
			childModel = model.addChildModel("equip", null, sn);
			childModel.addGlobalEventRefresh(EventNotify.BagEquipNumChange);  //监听装备背包数量变量
			childModel.setupCheckMethod(this, (tempModel: RedDotModel) =>
			{
				let sn = tempModel.bindData;
				let tempPetInfo = this.getPetInfo(sn);
				return this.isHaveSubPetAllEquipAction(tempPetInfo, tempModel);
			});
			//符文穿戴。
			childModel = model.addChildModel("rune", null, sn);
			childModel.addGlobalEventRefresh(EventNotify.BagRuneNumChange);		//监听符文背包数量变量
			childModel.setupCheckMethod(this, this.isHaveSubPetAllRuneAction);
			//神装
			childModel = model.addChildModel("godEquip", null, sn);
			childModel.addGlobalEventRefresh(EventNotify.BagGodEquipNumChange);  //监听神装背包数量变量，在格子放满时会暂停监听
			childModel.setupCheckMethod(this, this.isHaveSubPetAllGodEquipAction);

			return model;
		}

		/** 获取合成红点操作 */
		private isHaveCombinFun(): boolean
		{
			let hasCanCombin = false;
			for (let elment of cfg.PetUpStarCfgData.getDataList())
			{
				if (elment.star <= 6)
				{
					elment["combinProInfo"] = this.getHeroCombinProNum(elment.petID, elment.star);
					elment["combinProInfoFull"] = elment["combinProInfo"][0] == elment["combinProInfo"][1];
					if (elment["combinProInfoFull"] == true)
					{
						hasCanCombin = true;
					}
				}
			}
			return hasCanCombin;
		}

		/** 获取档案红点显示 */
		public isShowArchives(petType: Pb_God._emPetType): boolean
		{
			let isShowRedDot = false;
			let list = petType == 0 ? cfg.PetBookCfgData.getDataList() : cfg.PetBookCfgData.getBookMarkListByType(petType);
			for (let elment of list)
			{
				if (this.rewardpets.indexOf(elment.petID) == -1 && this.seenpets.indexOf(elment.petID) > -1)
				{
					isShowRedDot = true;
				}
			}
			return isShowRedDot;
		}


		/** 伙伴是否可以升级 */
		public isHaveSubPetUpgrade(tempPetInfo: Net.hero, returnNeedItemArr: cfg.AddItemInfo[] = null): boolean
		{
			if (tempPetInfo == null)
			{
				return false;
			}
			let currentLevel = tempPetInfo.level;
			let currentMaxLv = cfg.PetAdvanceCfgData.getMaxPetLevelByAdvance(tempPetInfo.advance);
			if (currentLevel < currentMaxLv)
			{
				let needItems = cfg.PetUpgradeCfgData.getNeedItemAryById(currentLevel + 1);
				if (returnNeedItemArr)
				{
					returnNeedItemArr.push.apply(returnNeedItemArr, needItems);
				} //拼接，并且保持原引用
				if (Global.isFullAllRes(needItems, false))
				{
					return true;
				}
			}
			return false;
		}

		/** 伙伴是否可以升阶 */
		public isHaveSubPetUpAdvance(tempPetInfo: Net.hero, returnNeedItemArr: cfg.AddItemInfo[] = null): boolean
		{
			let currentUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(tempPetInfo.id, tempPetInfo.star);
			let currentMaxAdvance = currentUpStarInfo != null ? currentUpStarInfo.maxAdvance : cfg.PetCfgData.getInitMaxAdvanceByPetID(tempPetInfo.id);
			let currentMaxLevel = cfg.PetAdvanceCfgData.getMaxPetLevelByAdvance(tempPetInfo.advance);
			if (tempPetInfo.level >= currentMaxLevel && tempPetInfo.advance < currentMaxAdvance)
			{
				let needItems = cfg.PetAdvanceCfgData.getNeedItemAryById(tempPetInfo.advance + 1);
				if (returnNeedItemArr) { returnNeedItemArr.push.apply(returnNeedItemArr, needItems); }//拼接，并且保持原引用
				if (Global.isFullAllRes(needItems, false))
				{
					return true;
				}
			}
			return false;
		}

		/** 伙伴是否可以升星 */
		private isHaveSubPetUpStar(tempModel: RedDotModel): boolean
		{
			let sn = tempModel.bindData;
			let tempPetInfo = this.getPetInfo(sn);
			if (tempPetInfo == null)
			{
				return false;
			}
			let currentUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(tempPetInfo.id, tempPetInfo.star + 1);
			if (currentUpStarInfo == null)
			{
				tempModel.removeAllGlobalEvents();  //升满了，所有的全局监听都不需要了。
				return false;
			}

			this.resetHeroSelect();

			let tmpMainPetType = cfg.PetCfgData.getPetTypeByPetID(tempPetInfo.id);
			let NeedItemAry = cfg.PetUpStarCfgData.getNeedItemAryById(currentUpStarInfo.id);
			let NeedStarPetAry = cfg.PetUpStarCfgData.getNeedStarPetAryById(currentUpStarInfo.id);
			let NeedAnyStarPetAry = cfg.PetUpStarCfgData.getNeedAnyStarPetAryById(currentUpStarInfo.id);
			let NeedStarCountAry = cfg.PetUpStarCfgData.getNeedStarCountAryById(currentUpStarInfo.id);

			tempModel.setPlayerItemInfosListener(NeedItemAry);  //监听道具变化
			if (!Global.isFullAllRes(NeedItemAry, false))
			{
				return false;
			}
			//其它英雄星级变更，有全局事件处理。...
			for (let i = 0; i < NeedStarCountAry.length; i++)
			{
				let tempInfo = NeedStarCountAry[i];
				let tempAry = this.getPetList().filter(elment => elment != tempPetInfo && !elment.isSelected && !elment.onStore && !elment.islock && elment.id == tempInfo.value1 && elment.star == tempInfo.value2);
				if (tempAry.length >= tempInfo.value3)
				{
					for (let j = 0; j < tempInfo.value3; j++)
					{
						tempAry[j].isSelected = true;
					}
				}
				else
				{
					return false;
				}
			}

			for (let i = 0; i < NeedStarPetAry.length; i++)
			{
				let tempInfo = NeedStarPetAry[i];
				let tempAry = this.getPetList().filter(elment => elment != tempPetInfo && !elment.isSelected && !elment.onStore && !elment.islock && tmpMainPetType == cfg.PetCfgData.getPetTypeByPetID(elment.id) && elment.star == tempInfo.value1);
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

			for (let i = 0; i < NeedAnyStarPetAry.length; i++)
			{
				let tempInfo = NeedAnyStarPetAry[i];
				let tempAry = this.getPetList().filter(elment => elment != tempPetInfo && !elment.isSelected && !elment.onStore && !elment.islock && elment.star == tempInfo.value1);
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

		/** 伙伴天赋是否可以穿戴或升级 */
		public isHaveSubPetTalentAction(tempModel: RedDotModel): boolean
		{
			let tempPetInfo = this.getPetInfo(tempModel.bindData);
			let EquipMgr = SuitEquipDataMgr.getSuitMgr(tempModel.bindData);
			let isAllLock = true;  //是否全部都没开启
			let hasEmpty = false;  //有开启了但是空着的
			let needItemArr: cfg.AddItemInfo[] = [];
			let ret = false;
			for (let i = 0; i < 3; i++)
			{
				let tempEquipType = Pb_God._emPosType.PosType_1 + i;
				let tempEquipInfo = EquipMgr.getTalent(tempEquipType);
				let tempTalentInfo = cfg.PetTalentPosCfgData.getInfo(tempEquipType);
				let tempIsUnLock = tempPetInfo.star >= tempTalentInfo.needStar;
				if (tempIsUnLock) { isAllLock = false; }
				if (tempIsUnLock && !tempEquipInfo) { hasEmpty = true; }
				if (tempIsUnLock && this.isHaveSubPetTalentUpgradeAction(tempEquipInfo, needItemArr))
				{
					ret = true;
				}
			}
			//如果有空的，则需要监听所有技能符石的变动，如果没有空的，则只需要监听收集到的必要道具即可
			tempModel.pauseAllGlobalEvents(isAllLock);  //所有的都还没开锁，就不用监听其它全局事件了，只需等待升星即可
			if (hasEmpty)
			{
				let itemInfos = cfg.ItemCfgData.getInfoWithType(Pb_God._emItemType.ItemType_Normal, Pb_God._emItemNormalType.ItemNormalType_Skill)
				let itemIds: number[] = [];
				for (var el of itemInfos) { itemIds.push(el.id); }
				tempModel.setPlayerItemsListener(itemIds);
			} else
			{
				tempModel.setPlayerItemInfosListener(needItemArr);
			}
			return ret;
		}

		/** 伙伴天赋部件是否可以升级
		 * @param returnNeedItemArr 收集升级需要的道具
		 */
		public isHaveSubPetTalentUpgradeAction(tempEquipInfo: Pb_God.PBPlayerPetTalent, returnNeedItemArr: cfg.AddItemInfo[] = null): boolean
		{
			if (tempEquipInfo == null)
			{
				//当前位置已解锁，并且还没放东西时，检查背包中天赋技能符石的数量
				let tmpList = ItemDataMgr.getBagListByItemType(Pb_God._emBagType.BagType_Item, Pb_God._emItemType.ItemType_Normal, Pb_God._emItemNormalType.ItemNormalType_Skill);
				return tmpList.length > 0;
			}

			//获取天赋基础状态
			let tempInfo = cfg.SkillNewTalentUpgradeCfgData.getInfo(tempEquipInfo.skillindex);
			let tempNextInfo = cfg.SkillNewTalentUpgradeCfgData.getInfoWithFun(tempInfo.skillID, tempInfo.level + 1);
			if (tempNextInfo != null)
			{
				let tempCostAry = cfg.SkillNewTalentUpgradeCfgData.getNeedItemAryById(tempNextInfo.skillIndex);
				if (returnNeedItemArr) { returnNeedItemArr.push.apply(returnNeedItemArr, tempCostAry); } //拼接，并且保持原引用
				return Global.isFullAllRes(tempCostAry, false);
			}

			return false;
		}

		/** 伙伴符文是否可以穿戴 */
		private isHaveSubPetAllRuneAction(reddotModel: RedDotModel = null): boolean
		{
			let sn = reddotModel.bindData;
			let tempPetInfo = this.getPetInfo(sn);
			let EquipMgr = SuitEquipDataMgr.getSuitMgr(sn);
			for (let i = 0; i < 2; i++)
			{
				let tempRunePos = Pb_God._emPosType.PosType_1 + i;
				// if (tempEquipInfo) continue;
				let tempRuneInfo = cfg.PetRunePosCfgData.getInfo(tempRunePos);
				let tempRuneIsUnLock = tempPetInfo.star >= tempRuneInfo.needStar && tempPetInfo.level >= tempRuneInfo.needLevel;
				if (tempRuneIsUnLock && this.isHaveEquipRuneAction(EquipMgr.getRune(tempRunePos)))
				{
					return true;
				}
			}
			return false;
		}

		/**
		 * 判断伙伴的符文装备时候可以升级或穿戴
		 */
		public isHaveEquipRuneAction(tempEquipInfo: Pb_God.PBPlayerPetRune, isFullCondtion = true): boolean
		{
			if (tempEquipInfo)
			{  //如果上面有了，则需要判断背包中还没有更优的
				let itemInfo = ItemDataMgr.getUsesPBItem(tempEquipInfo.itemsn);
				if (itemInfo)
				{ return ItemDataMgr.hasBagPerfectEquip(itemInfo.itemid); }
			}
			let tmpList = ItemDataMgr.getBagPerfectEquip(Pb_God._emBagType.BagType_Special, Pb_God._emItemType.ItemType_Rune);
			return tmpList.length > 0;
		}

		/** 伙伴装备是否可以穿戴 */
		public isHaveSubPetAllEquipAction(tempPetInfo: Net.hero, reddotModel: RedDotModel = null): boolean
		{
			//穿装备
			let EquipMgr = SuitEquipDataMgr.getSuitMgr(tempPetInfo.sn);
			for (let i = 0; i < 4; i++)
			{
				let tempEquipType = Pb_God._emEquipType.EquipType_Weapon + i;
				let tempEquipInfo = EquipMgr.getEquip(tempEquipType);
				if (this.isHaveEquipItemAction(tempEquipInfo, tempEquipType))
				{
					return true;
				}
			}
			return false;
		}

		/**
		 * 判断伙伴的武器装备时候可以升级或穿戴
		 */
		public isHaveEquipItemAction(tempEquipInfo: Net.SuitEquipData, subEquipType: number, isFullCondtion = true): boolean
		{
			if (tempEquipInfo != null)
			{ return ItemDataMgr.hasBagPerfectEquip(tempEquipInfo.itemid); }
			let tmpList = ItemDataMgr.getBagListByItemType(Pb_God._emBagType.BagType_Equip, Pb_God._emItemType.ItemType_Equip, subEquipType);
			return tmpList.length > 0;
		}

		/** 伙伴神器装备是否可以穿戴 */
		public isHaveSubPetAllGodEquipAction(reddotModel: RedDotModel): boolean
		{
			let sn = reddotModel.bindData;
			let tempPetInfo = this.getPetInfo(sn);
			if (tempPetInfo.star < 9) { return false; } //9星才能使用神装
			let EquipMgr = SuitEquipDataMgr.getSuitMgr(tempPetInfo.sn);
			let isFull = true;
			for (let i = 0; i < 4; i++)
			{
				let tempEquipType = Pb_God._emGodEquipType.GodEquipType_Earring + i;
				let tempEquipInfo = EquipMgr.getGodEquip(tempEquipType);
				if (tempEquipInfo) { continue; }
				isFull = false;
				if (this.isHaveGodEquipItemAction(tempEquipInfo, tempEquipType))
				{
					return true;
				}
			}
			reddotModel.pauseAllGlobalEvents(isFull);  //位置都放满了，  就不需要再处理红点了，直到升星解锁或者有神器卸下时，才打开
			return false;
		}

		/**
		 * 判断伙伴的神器装备时候可以升级或穿戴
		 */
		public isHaveGodEquipItemAction(tempEquipInfo: Pb_God.PBPlayerPetGodEquip, subEquipType: number, isFullCondtion = true): boolean
		{

			let tmpList = ItemDataMgr.getBagPerfectEquip(Pb_God._emBagType.BagType_GodEquip, Pb_God._emItemType.ItemType_GodEquip, subEquipType);
			if (tmpList.length == 0)
			{
				return false;
			}

			if (tempEquipInfo != null)
			{
				return false; //神器不需要处理择优替换
				// let tempItemInfo = ItemDataMgr.getUsesPBItem(tempEquipInfo.itemsn as Long);
				// return cfg.ItemCfgData.getLevelById(tmpList[0].itemid) > cfg.ItemCfgData.getLevelById(tempItemInfo.itemid);
			}
			else if (tmpList.length > 0)
			{
				return true;
			}

			return false;
		}

		/**
		 * 获取同id的素有精灵
		 */
		public getPetListById(petId: number)
		{
			return this.PetList.filter(element => element.id == petId);
		}

		public getHuPaList()
		{
			let allPets = this.getPetListById(CfgID.PetID.HuPa);
			let arr = [];
			allPets.forEach(element =>
			{
				this.refreshPetOnStore(element);
				arr.push(element);
			})
			return arr;
		}

		public getLimitHeroList(petId: number)
		{
			let allPets = this.getPetListById(petId);
			let arr = [];
			allPets.forEach(element =>
			{
				this.refreshPetOnStore(element);
				arr.push(element);
			})
			return arr;
		}

		/*---------------------------------------------------魂器----------------------------------*/

		/**
		 * 魂器状态----------- 0:敬请期待  1:有锁（图标置灰） 2:有锁（图标正常）  3:正常显示
		 * @param tempPetInfo
		 */
		public getHasHorcruxState(tempPetInfo: Net.hero)
		{
			let isHasHorcrux = cfg.HorcruxCfgData.getHorcruxInfoByPetId(tempPetInfo.id); // 该精灵配置表存在魂器
			let state: number = -1;
			if (isHasHorcrux)
			{
				if (tempPetInfo.horcrux && tempPetInfo.horcrux.level > 0)
				{
					state = 3;
				} else
				{
					if (tempPetInfo.star <= 12)
					{
						state = 1
					} else
					{
						state = 2
					}
				}
			}
			else
			{// 敬请期待
				state = 0
			}
			return state;
		}
	}
}
