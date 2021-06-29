
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
	export class IllustrationDataMgrBase
	{
		/** data */
		protected _data: Pb_God.PBPetDisplay[] = [];

		protected _historyPower: number;

		/**红点 */
		public reddotModel: RedDotModel = new RedDotModel();

		/**精灵可放置红点 */
		public petRedDotModel: RedDotModel = new RedDotModel();

		/**成就可领取红点 */
		public achieveRedDotModel: RedDotModel = new RedDotModel();

		/**属性可领取红点 */
		public attrRedDotModel: RedDotModel = new RedDotModel();

		/** 红点初始化 */
		protected initRedDot:boolean = false;

		constructor()
		{

		}

		public init(data: Pb_God.PBPlayerIllustration): void
		{
			if (!data)
			{
				this._data = [];
				this._historyPower = 0;
				return;
			}
			this._historyPower = data.historyPower;
			let pet = [];
			data.data.forEach(element =>
			{
				pet.push(element.display);
			})
			this._data = pet;

			this.initRedDotModel();
		}

		public initRedDotModel()
		{
			if(!this.initRedDot)
			{
				this.reddotModel.cleanUp(true);

				this.reddotModel.addChildModel("pet", this.petRedDotModel);
				this.petRedDotModel.setupCheckMethod(this, this.checkPetRed);
				this.petRedDotModel.addGlobalEventRefresh(EventNotify.Pet_Changed);

				this.reddotModel.addChildModel("attr", this.attrRedDotModel);
				this.attrRedDotModel.setupCheckMethod(this, this.checkAttrRed);
				this.attrRedDotModel.addGlobalEventRefresh(CmdEvent.Illustration_Freash);
				this.attrRedDotModel.addGlobalEventRefresh(CmdEvent.Achieve_IllustrationPowerComplete);

				this.reddotModel.addChildModel("achieve", this.achieveRedDotModel);
				this.achieveRedDotModel.setupCheckMethod(this, this.checkAchieveRed);
				this.achieveRedDotModel.addGlobalEventRefresh(CmdEvent.Achieve_IllustrationComplete);
				this.achieveRedDotModel.addGlobalEventRefresh(CmdEvent.Illustration_Freash);
			}
			this.initRedDot = true;
			// this.reddotModel.setupCheckMethod(this, this.isHaveCombinFun);
			// this.reddotModel.addGlobalEventRefresh(EventNotify.Embattle_Save, Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
		}

		/**
		 * 检测精灵可上阵红点
		 */
		private checkPetRed()
		{
			return this.getFirstCanUpHero() != null;
		}

		/**
		 * 检测战力奖励可领取红点
		 */
		private checkAttrRed()
		{
			let infos = IllustrationDataMgr.getShowAttrAchieveInfo();
			for (let i = 0; i < infos.length; i++)
			{
				if (this.checkIllustrationPowerCanGet(infos[i].id) && !this.checkIllustrationPowerHaveGot(infos[i].id))
					return true;
			}
			return false;
		}

		/**
		 * 检测成就奖励可领取红点
		 */
		private checkAchieveRed()
		{
			let allList = cfg.IllustrationAchieveCfgData.getAllList();
			for (let i = 0; i < allList.length; i++)
			{
				if (this.checkIllustrationAchieveCanGet(allList[i].id) && !this.checkIllustrationAchieveHaveGot(allList[i].id))
					return true;
			}
			return false
		}

		/**
		 * 获取所有上阵精灵
		 */
		public getAllOnHero()
		{
			return this._data;
		}

		/**
		 * 获取已经上阵的精灵
		 */
		public getHadOnHero(sn)
		{
			for (let i = 0; i < this._data.length; i++)
			{
				let hero = this._data[i];
				if (hero.sn.equals(sn))
				{
					return hero;
				}
			}
			return null;
		}

		/**
		 * 检测是否有这个精灵了
		 */
		public getOnHero(skinId: number)
		{
			if (!this._data)
				return null;
			for (let i = 0; i < this._data.length; i++)
			{
				if (this._data[i].useskinid == skinId)
					return this._data[i];
			}
			return null;
		}

		/**
		 * 获取第一个可以放置入图鉴的精灵
		 */
		public getFirstCanUpHero()
		{
			let allList = cfg.PetSkinCfgData.getBookMarkListByType(0);
			for (let i = 0; i < allList.length; i++)
			{
				let tmp = allList[i];
				let onHero = IllustrationDataMgr.getOnHero(tmp.id)
				if (!onHero && PetDataMgr.getPetListBySkinId(tmp.id).length > 0)
				{
					return tmp
				}
			}
		}

		//---------------以下为成就面板------------------------------------------------

		/**
		 * 获取成就数据
		 * @param id 
		 */
		public getIllustrationAchieveData(id: number)
		{
			let achieveDataMap = AchieveDataMgr.getIllustrationAchieveData();
			return achieveDataMap.get(id);
		}

		/**
		 * 检测是否可以领取成就奖励 (未判断是否已领取)
		 * @param id 
		 */
		public checkIllustrationAchieveCanGet(id: number)
		{
			let achieveDataMap = AchieveDataMgr.getIllustrationAchieveData();
			return achieveDataMap.get(id).value >= cfg.IllustrationAchieveCfgData.getInfo(id).value;
		}

		/**
		 * 检测是否已经领取成就奖励
		 * @param id 
		 */
		public checkIllustrationAchieveHaveGot(id: number)
		{
			let achieveFinishMap = AchieveDataMgr.getIllustrationFinishMap();
			return !!achieveFinishMap.get(id);
		}


		//-------------以下为战力属性面板-----------------------------------------------

		/**
		 * 获取历史最高战力
		 */
		public getHistoryPower()
		{
			return this._historyPower;
		}
		/**
		 * 获取图鉴增加的属性
		 */
		public getIllustrationAddAttr()
		{
			let infos = this._data.filter(element => !!this.getOnHero(element.useskinid))
			let tmpAtterDic = new Laya.Dictionary();
			infos.forEach(info =>
			{
				let skinId = info.useskinid;
				let tmpAttrAry = cfg.PetSkinCfgData.getAddAttrAryWithId(info.id, info.evolve);
				tmpAttrAry.forEach(tmpAttr =>
				{
					let tmpValue = tmpAtterDic.get(tmpAttr.type);
					if (tmpValue == null) { tmpValue = 0; }
					tmpValue += tmpAttr.value;
					tmpAtterDic.set(tmpAttr.type, tmpValue);
				});
			});
			return tmpAtterDic;
		}

		public getIllustrationTrammelAddAttr()
		{
			let allTrammels = cfg.IllustrationTrammelCfgData.getAllList();
			let tmpAtterDic = new Laya.Dictionary();
			allTrammels.forEach(element =>
			{
				if (this.checkTrammelIsActive(element.id))
				{
					let tmpAttrAry = cfg.IllustrationTrammelCfgData.getAddAttrAryWithId(element.id);
					tmpAttrAry.forEach(tmpAttr =>
					{
						let tmpValue = tmpAtterDic.get(tmpAttr.type);
						if (tmpValue == null) { tmpValue = 0; }
						tmpValue += tmpAttr.value;
						tmpAtterDic.set(tmpAttr.type, tmpValue);
					});
				}
			})
			return tmpAtterDic;
		}

		/**
		 * 检测羁绊是否激活
		 * @param id 羁绊id 
		 */
		public checkTrammelIsActive(id: number)
		{
			let allTrammel = cfg.IllustrationTrammelCfgData.getInfo(id);
			let skins = cfg.IllustrationTrammelCfgData.getNeedSkinsAryById(allTrammel.id);
			let isActive = true;
			skins.forEach(element =>
			{
				if (!IllustrationDataMgr.getOnHero(element))
					isActive = false;
			})
			return isActive;
		}


		/**
		 * 获取属性面板成就相关 目前是显示4个 这里需要注意的是 前四个没有领完的情况下 始终显示前四个 领完开始 只显示最新的一个没领的和前三个领过的
		 * 例 x代表已领  1.xoxooo... 这种就取前四个xoxo   
		 * 	   			2.xxxxooo... 这种就取2-5 xxxo
		 */
		public getShowAttrAchieveInfo()
		{
			let allInfo = cfg.IllustrationPowerCfgData.getAllList();
			if (this.checkHaveCompleteFourBox())
			{
				let tmpArr: cfg.IllustrationPowerCfgInfo[] = [];
				//已经领了4个了 从最近一个没领的开始 往前数4个
				for (let i = 0; i < allInfo.length; i++)
				{
					let element = allInfo[i];
					if (!this.checkIllustrationPowerHaveGot(element.id) || i == allInfo.length - 1)
					{
						for (let j = 0; j < 4; j++)
						{
							tmpArr.push(cfg.IllustrationPowerCfgData.getInfo(element.id - j));
						}

						tmpArr.reverse();
						return tmpArr;
					}
				}
			}
			else
			{
				return allInfo.filter(element => element.id <= 4);
			}
		}

		/**
		 * 检测是否已经领了4个了
		 */
		public checkHaveCompleteFourBox()
		{
			return AchieveDataMgr.getIllustrationPowerFinishMap().size() >= 4;
		}

		/**
		 * 检测是否已经领光了
		 */
		public checkHaveCompleteAllBox()
		{
			return AchieveDataMgr.getIllustrationPowerFinishMap().size() == AchieveDataMgr.getIllustrationPowerAchieveData().size();
		}

		/**
		 * 获取战力数据
		 * @param id 
		 */
		public getIllustrationPowerData(id: number)
		{
			let powerDataMap = AchieveDataMgr.getIllustrationPowerAchieveData();
			return powerDataMap.get(id);
		}

		/**
		 * 检测是否可以领取战力奖励 (未判断是否已领取)
		 * @param id 
		 */
		public checkIllustrationPowerCanGet(id: number)
		{
			let powerDataMap = AchieveDataMgr.getIllustrationPowerAchieveData();
			// return powerDataMap.get(id).value >= cfg.IllustrationPowerCfgData.getInfo(id).value;
			return this.getHistoryPower() >= cfg.IllustrationPowerCfgData.getInfo(id).value;

		}

		/**
		 * 检测是否已经领取战力奖励
		 * @param id 
		 */
		public checkIllustrationPowerHaveGot(id: number)
		{
			let powerFinishMap = AchieveDataMgr.getIllustrationPowerFinishMap();
			return !!powerFinishMap.get(id);
		}
	}
}
