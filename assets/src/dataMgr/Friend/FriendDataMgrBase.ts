
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
	export class FriendDataMgrBase
	{
		constructor()
		{

		}

		///////////////////////// 代码整理分隔线 //////////////////////////////////

		/** 好友列表*/
		private _friendlist: Pb_God.PBPlayerFriendInfo[];
		private _friendMap: ds.StringMap<Pb_God.PBPlayerFriendInfo>;
		/** 申请列表*/
		protected _applylist: Pb_God.PBPlayerFriendInfo[];
		/** 黑名单列表*/
		protected _blacklist: Pb_God.PBPlayerFriendInfo[] = [];
		/** 赠送的礼物好友ID*/
		protected _sendprize: number[];
		protected _sendprizeMap: ds.StringMap<number>;
		/** 收到的礼物好友ID*/
		protected _recieveprize: number[];

		/////////////////////////////////////////////////////
		//////////////////好友英雄增援//////////////////////////
		/////////////////////////////////////////////////////
		/** 保存所有英雄的原始数据(登陆前先把数据存下来用到的时候再解析) */
		private _heroOriginData = new ds.StringMap<Pb_God.PBBattlePetInfo>();
		protected _heroMap = new ds.StringMap<Net.hero>();
		/** 玩家自己派出支援英雄(_emFriendSupportType map hero) */
		protected _sendSupportHeroMap = new ds.StringMap<Long[]>();
		/** 其它好友派出的英雄信息 id -> (type map hero) */
		protected _friendSupportHeroMap = new ds.StringMap<ds.StringMap<Long[]>>();
		/** 自己雇佣了好友的英雄列表 */
		protected _hiredSupportList: Pb_God.PBFriendSupport[] = [];
		/** 雇佣的英雄已经使用的记录 */
		protected _useHiredSupportList: Pb_God.PBFriendSupport[] = [];

		/** 红点模型 */
		public reddotModel: RedDotModel = new RedDotModel;

		public init(info: Pb_God.PBPlayerFriend): void
		{
			this._applylist = info.applylist || [];
			this._blacklist = info.blacklist || [];
			this._recieveprize = info.recieveprize;
			this._sendprize = info.sendprize;
			this._sendprizeMap = Global.listToStringMap(info.sendprize);

			this._friendSupportHeroMap.clear();
			this._sendSupportHeroMap.clear();
			this._heroOriginData.clear();
			this._heroMap.clear();
			this.initFriendList(info.friendlist, false);
			for (var el of info.support)
			{
				//先把原始数据存下来， 用到的时候再取，毕竟用到的时候非常少
				this._heroOriginData.put(el.pet.pet.display.sn + "", el.pet);
				this.putSelfSendSupport(el.type, el.pet.pet.display.sn);
			}
			this._hiredSupportList = info.hiredsupport;
			this._useHiredSupportList = info.usedsupport;
			this.initReddotModel();
		}

		/** 隔日重置数据 */
		public resetNewDay(): void
		{
			this._recieveprize = []
			this._sendprize = []
			this._hiredSupportList = [];
			this._useHiredSupportList = [];
			this._sendprizeMap.clear();
			this._sendSupportHeroMap.clear();
			this._friendSupportHeroMap.clear();
			this._heroOriginData.clear();
			this._heroMap.clear();
			//清掉所有好友派遣信息
			for (var friendInfo of this._friendlist)
			{
				friendInfo.support = null;
			}
			EventMgr.trigger(EventNotify.Friend_RecievePrize_Update); //通知更新
			this.reddotModel.refresh(true);
		}
		/** 隔周重置数据 */
		public resetNewWeek(): void
		{
		}

		protected initFriendList(list: Pb_God.PBPlayerFriendInfo[], isTriggerEvent: boolean = true): void
		{
			this._friendlist = [];
			this._friendMap = new ds.StringMap<Pb_God.PBPlayerFriendInfo>();
			//转一份好友列表的map，方便后续的查询
			for (var el of list)
			{
				this.addFriend(el, false);
			}
			if (isTriggerEvent) EventMgr.trigger(EventNotify.Friend_FriendList_Update); //通知更新
		}

		/** 增加好友信息 */
		protected addFriend(friendInfo: Pb_God.PBPlayerFriendInfo, isTriggerEvent: boolean = true): void
		{
			let playerid = friendInfo.display.playerid;
			if (this._friendMap.get(playerid)) return; //重复了
			this._friendMap.put(playerid, friendInfo);
			this._friendlist.push(friendInfo);
			this.resetFriendSupportInfo(playerid, friendInfo.support);
			if (isTriggerEvent) EventMgr.trigger(EventNotify.Friend_FriendList_Update); //通知更新
		}

		/** 刷新好友派遣的英雄信息 */
		protected resetFriendSupportInfo(playerId: number, supportList: Pb_God.PBPlayerSupportHero[]): void
		{
			if (supportList && supportList.length > 0)
			{
				let supportMap = this._friendSupportHeroMap.get(playerId);
				if (!supportMap)
				{
					supportMap = new ds.StringMap<Long[]>();
					this._friendSupportHeroMap.put(playerId, supportMap);
				} else
				{
					supportMap.clear();
				}
				for (var el of supportList)
				{
					let petsn = el.pet.pet.display.sn;
					//把原始数据存下来，用的时候再解析成Net.hero
					this._heroMap.remove(petsn + "");
					this._heroOriginData.put(petsn + "", el.pet);

					let snList = supportMap.get(el.type);
					if (!snList)
					{
						supportMap.put(el.type, [petsn]);
					} else
					{
						if (snList.indexOf(petsn) < 0) snList.push(petsn);
					}
				}
			} else
			{
				this._friendSupportHeroMap.remove(playerId + "");
			}
		}

		/** 移除好友信息 */
		protected removeFriend(playerId: number): void
		{
			let friendInfo = this._friendMap.get(playerId);
			if (!friendInfo) return;
			this.resetFriendSupportInfo(playerId, null);
			this._friendMap.remove(playerId + "");
			let listIndex = this._friendlist.indexOf(friendInfo);
			if (listIndex >= 0) this._friendlist.splice(listIndex, 1);
			let recieveListIndex = this._recieveprize.indexOf(playerId);
			if (recieveListIndex >= 0)
			{
				this._recieveprize.splice(recieveListIndex, 1);
				this.reddotModel.refreshChild("recieve");
				EventMgr.trigger(EventNotify.Friend_RecievePrize_Update); //通知更新
			}
			EventMgr.trigger(EventNotify.Friend_Delete, playerId); //通知更新			
			EventMgr.trigger(EventNotify.Friend_FriendList_Update); //通知更新
		}

		/** 更新好友信息 */
		protected resetFriendInfo(friendInfo: Pb_God.PBPlayerFriendInfo): void
		{
			let playerid = friendInfo.display.playerid;
			//好友列表里面没有
			if (!this.getFriendInfo(playerid))
			{
				this.addFriend(friendInfo);
				return;
			}
			this._friendMap.put(playerid, friendInfo);
			this.resetFriendSupportInfo(playerid, friendInfo.support);
			let index = 0;
			for (; index < this._friendlist.length; index++)
			{
				let el = this._friendlist[index];
				if (el.display.playerid == playerid)
				{
					this._friendlist[index] = friendInfo; //覆盖新的
					break;
				}
			}
			EventMgr.trigger(EventNotify.Friend_Single_Update, index, friendInfo); //通知更新
		}

		public getFriendIds(): number[]
		{
			let ret: number[] = [];
			for (let el of this._friendlist)
			{
				ret.push(el.display.playerid);
			}
			return ret;
		}

		/** 增加好友申请 */
		protected addApply(value: Pb_God.PBPlayerFriendInfo): void
		{
			//去重
			for (let i = 0; i < this._applylist.length; i++)
			{
				var el = this._applylist[i];
				if (el.display.playerid == value.display.playerid && el.display.logicworldid == value.display.logicworldid)
				{
					this._applylist[i] = value; //有重复的，直接替换即可
					EventMgr.trigger(EventNotify.Friend_Apply_Update); //通知更新
					return;
				}
			}
			this._applylist.push(value);
			EventMgr.trigger(EventNotify.Friend_Apply_Update); //通知更新
		}

		/** 删掉一条好友申请 */
		public removeApply(playerId: number): boolean
		{
			for (let i = 0; i < this._applylist.length; i++)
			{
				var el = this._applylist[i];
				if (el.display.playerid == playerId)
				{
					this._applylist.splice(i, 1);
					EventMgr.trigger(EventNotify.Friend_Apply_Update); //通知更新;				
					return true;
				}
			}
			return false;
		}

		/** 增加黑名单 */
		protected addBlacklist(value: Pb_God.PBPlayerFriendInfo): void
		{
			//去重
			for (let i = 0; i < this._blacklist.length; i++)
			{
				var el = this._blacklist[i];
				if (el.display.playerid == value.display.playerid && el.display.logicworldid == value.display.logicworldid)
				{
					this._blacklist[i] = value; //有重复的，直接替换即可
					EventMgr.trigger(EventNotify.Friend_Blacklist_Add, value);//通知更新
					return;
				}
			}
			this._blacklist.push(value);
			EventMgr.trigger(EventNotify.Friend_Blacklist_Add, value);//通知更新
		}

		/** 删掉一条黑名单 */
		public removeBlacklist(playerId: number): boolean
		{
			for (let i = 0; i < this._blacklist.length; i++)
			{
				var el = this._blacklist[i];
				if (el.display.playerid == playerId)
				{
					this._blacklist.splice(i, 1);
					EventMgr.trigger(EventNotify.Friend_Blacklist_Update); //通知更新;				
					return true;
				}
			}
			return false;
		}

		/** 好友列表 */
		public getFriendList(): Pb_God.PBPlayerFriendInfo[]
		{
			return this._friendlist;
		}
		/** 申请列表 */
		public getApplyList(): Pb_God.PBPlayerFriendInfo[]
		{
			return this._applylist;
		}
		/** 黑名单列表 */
		public getBlackList(): Pb_God.PBPlayerFriendInfo[]
		{
			return this._blacklist;
		}

		/** 判断是否为好友 */
		public getFriendInfo(playerId: number): Pb_God.PBPlayerFriendInfo
		{
			return this._friendMap.get(playerId);
		}

		/** 判断是否黑名单 */
		public isBlacklist(playerId: number, logicworldid?: number): boolean
		{
			for (let el of this._blacklist)
			{
				if (el.display.playerid == playerId && (!logicworldid || el.display.logicworldid == logicworldid))
					return true;
			}
			return false;
		}

		/** 判断是否有赠送过礼物 */
		public isSendPrize(playerId: number): boolean
		{
			return !!this._sendprizeMap.get(playerId);
		}

		/** 可以收礼物的好友列表 */
		public getRecieveList(): Pb_God.PBPlayerFriendInfo[]
		{
			let ret: Pb_God.PBPlayerFriendInfo[] = [];
			//过滤非好友（可能好友已经删除了，但是ID还在）
			for (let id of this._recieveprize)
			{
				let friendInfo = this._friendMap.get(id);
				if (friendInfo) ret.push(friendInfo);
			}
			return ret;
		}

		/** 请求添加好友 */
		public requestApplyFriend(playerId: number): void
		{
			FriendSend.requestAddFriend(playerId);
		}


		/////////////////////////////////////////////////////
		//////////////////好友增援英雄//////////////////////////
		/////////////////////////////////////////////////////
		/** 获取增援的英雄数据（包括自己派出去的和好友派来的） */
		public getHero(heroSn: Long): Net.hero
		{
			let snKey = heroSn + "";
			let hero = this._heroMap.get(snKey);
			if (!hero)
			{
				let originData = this._heroOriginData.get(snKey);
				if (originData)
				{
					hero = PetDataMgr.shiftHeroInfo(originData.pet);
					this._heroMap.put(snKey, hero);
				}
			}
			return hero;
		}
		/** 获取增援的英雄数据（包括自己派出去的和好友派来的） */
		private getHeros(snList: Long[], supportPlayerId: number = 0): Net.hero[]
		{
			let ret: Net.hero[] = [];
			if (snList)
			{
				for (var el of snList)
				{
					let hero = this.getHero(el);
					if (hero)
					{
						hero.supportMePlayerId = supportPlayerId;
						ret.push(hero);
					}
				}
			}
			return ret;
		}

		/** 添加自己派遣的支援英雄 */
		protected putSelfSendSupport(type: Pb_God._emFriendSupportType, petsn: Long): void
		{
			let snList = this._sendSupportHeroMap.get(type);
			if (!snList)
			{
				this._sendSupportHeroMap.put(type, [petsn]);
			} else
			{
				if (snList.indexOf(petsn) < 0) snList.push(petsn);
			}
		}


		/** 获取自己派遣英雄列表 */
		public getSendSupportHeros(type: Pb_God._emFriendSupportType): Net.hero[]
		{
			let snList = this._sendSupportHeroMap.get(type);
			return this.getHeros(snList);
		}

		/** 获取指定好友与指定派遣类型的英雄信息 */
		public getFriendSupportHeros(friendId: number, type: Pb_God._emFriendSupportType): Net.hero[]
		{
			let map = this._friendSupportHeroMap.get(friendId);
			if (!map) return [];
			let snList = map.get(type);
			if (!snList || snList.length <= 0) return [];
			return this.getHeros(snList, friendId);
		}

		/** 根据派遣类型， 获取所有好友派遣英雄列表 */
		public getSupportHeroList(type: Pb_God._emFriendSupportType): Net.hero[]
		{
			let ret = [];
			for (var friendInfo of this._friendlist)
			{
				if (!friendInfo.support) continue;
				let heros = this.getFriendSupportHeros(friendInfo.display.playerid, type);
				for (let hero of heros)
				{
					ret[ret.length] = hero;
				}
			}
			return ret;
		}
		/** 根据派遣类型， 获取玩家已经雇佣的英雄列表
		 * @param type 
		 * @param excludeUsed 排除已经上场使用的。
		 */
		public getHiredSupportHeroList(type: Pb_God._emFriendSupportType, excludeUsed: boolean = true): Net.hero[]
		{

			//如果类型英雄可以重复使用， 忽略排除
			if (cfg.CommonSupportCfgData.getCanUseAgainByType(type)) excludeUsed = false;

			let ret = [];
			for (let el of this._hiredSupportList)
			{
				if (el.type != type) continue;
				if (excludeUsed && this.isUseHiredSupportHero(type, el.sn)) continue;
				let hero = this.getHero(el.sn);
				if (hero)
				{
					ret[ret.length] = hero;
					hero.supportMePlayerId = el.friendid;
				}
			}
			return ret;
		}

		/** 根据类型获取雇佣的数量（不管英雄是否存在，也不排除已经使用的） */
		public getHireSupportCount(type: Pb_God._emFriendSupportType): number
		{
			let ret = 0;
			for (let el of this._hiredSupportList)
			{
				if (el.type == type) ret++;
			}
			return ret;
		}

		/** 判断好友派出的英雄是否被自己雇佣 */
		public isHiredSupportHero(type: Pb_God._emFriendSupportType, herosn: Long): boolean
		{
			for (let el of this._hiredSupportList)
			{
				if (type == el.type && herosn.equals(el.sn))
					return true;
			}
			return false;
		}
		/** 判断雇佣的英雄是否被使用上阵 */
		public isUseHiredSupportHero(type: Pb_God._emFriendSupportType, herosn: Long): boolean
		{
			for (let el of this._useHiredSupportList)
			{
				if (type == el.type && herosn.equals(el.sn))
					return true;
			}
			return false;
		}



		/////////////////////////////////////////////////////
		////////////////// 红点  //////////////////////////
		/////////////////////////////////////////////////////
		private initReddotModel(): void
		{
			this.reddotModel.cleanUp(true);
			//收礼
			let reddot = this.reddotModel.addChildModel("recieve");
			reddot.addGlobalEventRefresh(EventNotify.Friend_RecievePrize_Update);
			reddot.setupCheckMethod(this, () =>
			{
				return this.getRecieveList().length > 0 ? 1 : 0;
			});
			//申请加为好友
			reddot = this.reddotModel.addChildModel("apply");
			reddot.addGlobalEventRefresh(EventNotify.Friend_Apply_Update);
			reddot.setupCheckMethod(this, () =>
			{
				return this._applylist.length > 0 ? 1 : 0;
			});

		}

	}
}
