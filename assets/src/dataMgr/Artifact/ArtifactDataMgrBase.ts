
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
	export class ArtifactDataMgrBase
	{
		constructor()
		{

		}

		/** 是否已经集齐 */
		private _isGetAllArtiface = -1;

		/** 神器具体数据*/
		protected _infoList: Pb_God.PBPlayerArtifactInfo[];

		/** 法阵数据*/
		protected _fazhenInfo: Pb_God.PBPlayerFaZhenInfo;
		/** 法阵是否觉醒 */
		protected _fazhenAwake: boolean = false;

		 /** 红点初始化 */
    	protected initRedDot:boolean = false;

		/** 初始化 */
		public init(data: Pb_God.PBPlayerArtifact)
		{
			this._infoList = data.info;
			this._fazhenInfo = data.fazhen;
			this._isGetAllArtiface = -1;
			this._fazhenAwake = data.fazhenawake;
			this.initRedDotModel();
			this.checkAllArtiface();
		}

		public resetNewDay()
		{
		}

		/** 获取当前正进行解锁的神器id */
		public getInLockingId(): number
		{
			let cfgInfos = cfg.ArtifactCfgData.getDataList();
			for (var el of cfgInfos)
			{
				let info = this.getInfo(el.iD);
				if (!info || !info.isactive) return el.iD;
			}
			return 999;
		}

		/** 获取神器最小ID */
		public getMinID(): number
		{
			return cfg.ArtifactCfgData.getFirstInfo().iD;
		}

		/** 神器是否已经集齐了 */
		public get isGetAllArtiface(): boolean
		{
			return this._isGetAllArtiface == 1;
		}

		/** 获取当前激活的神器个数 */
		public getArtActiveNum(): number
		{
			let activeNum = 0;
			this._infoList.forEach(elment =>
			{
				if (elment.isactive)
				{
					activeNum++;
				}
			});
			return activeNum;
		}

		/** 检查神器是否已经集齐了 */
		protected checkAllArtiface(): void
		{
			if (this.isGetAllArtiface) return;
			let tmpActiveNum = this.getArtActiveNum();
			let tmpTotleNum = cfg.ArtifactCfgData.getDataList().length;
			let isAll = tmpActiveNum >= tmpTotleNum ? 1 : 0;

			if (isAll == this._isGetAllArtiface) return;
			this._isGetAllArtiface = isAll;
			this.refreshRedDotOpenState();
			isAll && EventMgr.trigger(EventNotify.Artifact_ActiveAll);
		}

		/** 取得当前最关键的一个神器 */
		private getWellInfo(): Pb_God.PBPlayerArtifactInfo
		{
			let allActives = this.getActiveInfos();
			if (allActives.length <= 0) return null;
			return allActives[allActives.length - 1];
		}

		/** 获取神器数据 */
		public getInfo(id: number): Pb_God.PBPlayerArtifactInfo
		{
			let results = this._infoList.filter(elment => elment.id == id);
			return results.length > 0 ? results[0] : null;
		}

		/** 获取法阵数据 */
		public getFazhenInfo(): Pb_God.PBPlayerFaZhenInfo
		{
			return this._fazhenInfo;
		}

		/** 获取已经激活得神器 */
		public getActiveInfos(): Pb_God.PBPlayerArtifactInfo[]
		{
			return this._infoList.filter(elment => elment.isactive);
		}

		/** 获取神器激活进度个数 */
		public getActiveNum(id: number, index: number = -1): number
		{
			let tempInfo = this.getInfo(id);
			if (tempInfo == null)
			{
				return 0;
			}

			let activeNum = 0;
			if (index == -1)
			{
				activeNum = tempInfo.activestage.length;
			}
			else
			{
				let tempIndex = tempInfo.activestage.indexOf(index);
				activeNum = tempIndex >= 0 ? 1 : 0;
			}
			return activeNum;
		}

		/** 是否所有任务都完成待激活 */
		public isReadyActive(id: number): boolean
		{
			let tempInfo = this.getInfo(id);
			if (tempInfo && tempInfo.isactive)
			{
				return false;
			}
			let activeNum = this.getActiveNum(id);
			let maxActiveNum = cfg.ArtifactActiveCfgData.getInfoWithFun(id).length;
			return activeNum >= maxActiveNum;
		}


		/** 法阵是否觉醒 */
		public getIsFazhenAwake(): boolean
		{
			return this._fazhenAwake;
		}

		/** 计算法阵属性(type map value) */
		public getFazhenAddAttr(level: number, exp: number): ds.StringMap<number>
		{
			let ret = new ds.StringMap<number>();
			let lvAtterAry = cfg.ArtifactUpgradeCfgData.getAddAttrAryByIdLevel(level);
			let expAtterAry = cfg.ArtifactUpgradeCfgData.getExpAddAttrAryByIdLevel(level);
			//先计算当前等级的
			for (let el of lvAtterAry)
			{
				ret.put(el.type, el.value);
			}
			//加上经验加成的
			for (let el of expAtterAry)
			{
				ret.put(el.type, ret.get(el.type) + Math.floor(el.value * exp));
			}
			//再加入法阵觉醒加成的(万分比加成)
			if (this.getIsFazhenAwake())
			{
				let awakeAddPercents = cfg.ArtifactConstCfgData.getFazhenAwakeAddAttr();
				for (let addInfo of awakeAddPercents)
				{
					let basevalue = ret.get(addInfo.value1)
					ret.put(addInfo.value1, basevalue + Math.floor(basevalue * addInfo.value2 / 10000));

				}
			}
			return ret;
		}

		/** 获取元灵装备到关键的阵法的列表 */
		public getToFightEmbattleList(artifactId: number): number[]
		{
			let ret = [];
			let zhenfaTypes = [
				Pb_God._emZhenfaType.ZhenfaType_Zhuxian,
				Pb_God._emZhenfaType.ZhenfaType_Jingjichang,
				Pb_God._emZhenfaType.ZhenfaType_Guanjun];
			for (let zhenfaType of zhenfaTypes)
			{
				let embattleInfo = EmbattleDataMgr.getBuZhenInfo(zhenfaType);
				if (!embattleInfo) continue;
				if (embattleInfo.getArtifactId() == artifactId) ret.push(zhenfaType);
			}
			return ret;
		}

		private _hasNewArtifact = false;
		/** 设置新激活的元灵状态(有新激活的元灵时，需要触发一次红点显示，只要进布阵界面查看过一次，红点就取消) */
		public setNewArtifactState(isNew: boolean): void
		{
			if (isNew == this._hasNewArtifact) return;
			this._hasNewArtifact = isNew;
			this.reddotModelEmbattle.refresh();
		}
		public hasNewArtifact(): boolean
		{
			return this._hasNewArtifact;
		}
		///////////////////// 红点 //////////////////////////
		/** 红点总纳 */
		public reddotModel: RedDotModel = new RedDotModel();
		/** 元灵上阵红点（其实是用在布阵的跳转的，但考虑到它只跟元灵有关，就把红点模型放这里了） */
		public reddotModelEmbattle: RedDotModel = new RedDotModel();
		/** 未激活时有奖励可领的红点 */
		public get unlockRewardRedDotModel(): RedDotModel
		{
			return this.reddotModel.getChildModel("unlockReward");
		};
		/** 法阵升级红点 */
		public get upgradeRedDotModel(): RedDotModel
		{
			return this.reddotModel.getChildModel("upgrade");
		};
		/** 技能升级红点 */
		public get skillRedDotModel(): RedDotModel
		{
			return this.reddotModel.getChildModel("skill");
		};
		/** 圣印红点 */
		public get shengyinRedDotModel(): RedDotModel
		{
			return this.reddotModel.getChildModel("shengyin");
		};
		private initRedDotModel(): void
		{
			if(!this.initRedDot)
			{
				this.reddotModel.cleanUp(true);
				this.reddotModel.setSystemSwitchId(Pro.emSystemSwitchType.Weapon);
				this.reddotModel.addChildModel("unlockReward");
				this.reddotModel.addChildModel("upgrade");
				this.reddotModel.addChildModel("skill");
				this.reddotModel.addChildModel("shengyin");

				this.refreshRedDotOpenState();

				this.unlockRewardRedDotModel.setupCheckMethod(this, this.isHaveUnlockReward);
				this.upgradeRedDotModel.setupCheckMethod(this, this.isCanUpgrade);
				this.skillRedDotModel.setupCheckMethod(this, this.isCanSkillUpgrade);
				this.shengyinRedDotModel.setupCheckMethod(this, this.isCanShengyin);

				//布阵红点
				this.reddotModelEmbattle.cleanUp(true);
				this.reddotModelEmbattle.addGlobalEventRefresh(CmdEvent.Artifact_AddNew); //新增神器
				this.reddotModelEmbattle.addGlobalEventRefresh(CmdEvent.Pet_Set_Zhenfa_Ack); //阵法改变			
				this.reddotModelEmbattle.setSystemSwitchId(emSystemSwitchType.Weapon);
				this.reddotModelEmbattle.setupCheckMethod(this, this.checkEmbattleReddotModel);
			}
			this.initRedDot = true;
		}

		/** 红点开放 */
		protected refreshRedDotOpenState(): void
		{
			let isGetAllArtiface = this.isGetAllArtiface;
			this.unlockRewardRedDotModel.setOpenState(!isGetAllArtiface);
			this.upgradeRedDotModel.setOpenState(isGetAllArtiface);
			this.skillRedDotModel.setOpenState(isGetAllArtiface);
			this.shengyinRedDotModel.setOpenState(isGetAllArtiface);
		}

		/** 布阵红点 */
		private checkEmbattleReddotModel(): boolean
		{
			if (this._hasNewArtifact) return true;
			//有神器已经激活（只需判断第一个即可）
			let firstArtifact = ArtifactDataMgr.getInfo(1);
			if (!firstArtifact) return false;
			if (!firstArtifact.isactive) return false;
			//拿到主线剧情阵法
			let embattleInfo = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
			if (!embattleInfo) return false;
			if (embattleInfo.getArtifactId() > 0) return false;
			return true;
		}

		/** 是否可以添加圣印 */
		private isCanShengyin(reddotModel: RedDotModel): number
		{
			let lv = this._fazhenInfo.level;
			let tempCostInfo = cfg.ArtifactUpgradeCfgData.getNeedStoneCountAryByLevel(lv);
			if (!tempCostInfo) return 0;
			//最大次数
			let maxCount = cfg.ArtifactUpgradeCfgData.getMaxStoneCountByLevel(lv);
			let useCount = this._fazhenInfo.count; //当前已使用的次数
			reddotModel.setPlayerItemsListener([tempCostInfo.itemid]); //监听背包道具数量变化
			return (useCount < maxCount && Global.isFullRes(tempCostInfo.itemid, tempCostInfo.itemcount, false)) ? 1 : 0;
		}

		/** 神器是否有解锁奖励领取 */
		private isHaveUnlockReward(): number
		{
			let inLockingId = this.getInLockingId();
			let tempCfgAry = cfg.ArtifactActiveCfgData.getInfoWithFun(inLockingId);
			let allAchieveLen = tempCfgAry.length;
			let finishNum = 0;
			for (let cfgInfo of tempCfgAry)
			{
				//达成条件显示
				let tmpAchieveID = cfgInfo.needAchieveID;
				let tmpAchieveInfo = cfg.AchieveMainAchieveCfgData.getInfo(tmpAchieveID);
				let tmpProNum = AchieveDataMgr.getMainValue(tmpAchieveID);
				let tmpMaxNum = tmpAchieveInfo.value;
				//已完成目标，简单的判断放外层
				if (tmpProNum >= tmpMaxNum)
				{
					//未领奖
					if (ArtifactDataMgr.getActiveNum(inLockingId, cfgInfo.stage) <= 0)
					{
						return 1;
					} else
					{
						finishNum++; //已完成数量
					}
				}
			}
			//如果已经全部完成，则需判断一下是不是可以激活了
			if (finishNum >= allAchieveLen)
			{
				let info = this.getInfo(inLockingId);
				if (!info || !info.isactive)
				{
					return 1;
				}
			}
			return 0;
		}

		/** 法阵是否能够升级 */
		private isCanUpgrade(reddotModel: RedDotModel): number
		{

			let nextExpInfo = cfg.ArtifactUpgradeCfgData.getInfo(this._fazhenInfo.level + 1);
			if (nextExpInfo != null && this._fazhenInfo.exp < nextExpInfo.maxExp)
			{
				let tempNeedItemAry = cfg.ArtifactUpgradeCfgData.getNeedItemAryByIdLevel(this._fazhenInfo.level + 1);
				reddotModel.setPlayerItemInfosListener(tempNeedItemAry); //添加道具监听
				if (Global.isFullAllRes(tempNeedItemAry, false))
				{
					return 1;
				}
			}
			else
			{
				reddotModel.setPlayerItemInfosListener(null);
			}
			return 0;
		}

		/** 最优神器技能是否能够升级 */
		private isCanSkillUpgrade(reddotModel: RedDotModel): number
		{
			let tempInfo = this.getWellInfo();
			if (!tempInfo) return 0;
			reddotModel.bindData = tempInfo.id;

			let tempSkillId = cfg.ArtifactCfgData.getSkillIDByID(tempInfo.id);
			let tempSkillLv = tempInfo.skilllevel;
			let tempSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tempSkillId, tempSkillLv);

			//升级信息
			let nextExpInfo = cfg.ArtifactSkillUpgradeCfgData.getInfoByDoubleKey(tempSkillId, tempSkillLv + 1);
			if (nextExpInfo == null)
			{
				reddotModel.setPlayerItemInfosListener(null);
				return 0;
			}

			//等级限制
			if (nextExpInfo.needArtifactLevel > this._fazhenInfo.level)
			{
				reddotModel.setPlayerItemInfosListener(null);
				return 0;
			}

			//升级消耗
			let tempUpgradeAry = cfg.ArtifactSkillUpgradeCfgData.getNeedItemAryByIdLevel(tempSkillId, tempInfo.skilllevel + 1);
			reddotModel.setPlayerItemInfosListener(tempUpgradeAry);
			if (Global.isFullAllRes(tempUpgradeAry, false))
			{
				return 1;
			}

			return 0;
		}

	}
}
