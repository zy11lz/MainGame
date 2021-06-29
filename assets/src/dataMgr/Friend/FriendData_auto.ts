
/**
*
*  根据 proto 文件自动生成的代码
*
* 【**不可手动修改此类**】，
*
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的proto文件】
*
* @author liuYang.AutoCreater
*
*/

module Pro
{
	export class FriendData_auto extends FriendDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用失败返回
			EventMgr.on(Cmd.S2C_Friend_CommonAck.cmdName, this, this.onCommonAck)
			//	 好友申请			PBPlayerFriendInfo
			EventMgr.on(Cmd.S2C_Friend_AddApply.cmdName, this, this.onAddApply)
			//	 删除申请			PBU32
			EventMgr.on(Cmd.S2C_Friend_DelApply.cmdName, this, this.onDelApply)
			// 	 加好友			PBPlayerFriendInfo
			EventMgr.on(Cmd.S2C_Friend_AddFriend.cmdName, this, this.onAddFriend)
			// 	 删好友			PBU32
			EventMgr.on(Cmd.S2C_Friend_DelFriend.cmdName, this, this.onDelFriend)
			// 	 增加黑名单		PBPlayerFriendInfo
			EventMgr.on(Cmd.S2C_Friend_AddBalck.cmdName, this, this.onAddBalck)
			// 	 移除黑名单		PBU32
			EventMgr.on(Cmd.S2C_Friend_DelBalck.cmdName, this, this.onDelBalck)
			// 	 增加领取礼物		PBU32
			EventMgr.on(Cmd.S2C_Friend_RecievePrize.cmdName, this, this.onRecievePrize)
			// 	 删除领取礼物		PBG2CFriendPrize
			EventMgr.on(Cmd.S2C_Friend_DelRecievePrize.cmdName, this, this.onDelRecievePrize)
			// 	 赠送礼物			PBG2CFriendPrize
			EventMgr.on(Cmd.S2C_Friend_SendPrize.cmdName, this, this.onSendPrize)
			// 	 同步好友信息		PBG2CFriendSyn
			EventMgr.on(Cmd.S2C_Friend_SynFriend.cmdName, this, this.onSynFriend)
			// 	 同步好友上线		PBPlayerFriendInfo
			EventMgr.on(Cmd.S2C_Friend_Online.cmdName, this, this.onOnline)
			// 	 同步好友下线		PBPlayerFriendInfo
			EventMgr.on(Cmd.S2C_Friend_Offline.cmdName, this, this.onOffline)
			// 	 推荐好友			PBG2CFriendRefresh
			EventMgr.on(Cmd.S2C_Friend_Refresh.cmdName, this, this.onRefresh)
			// 	 同步支援信息		PBW2GFriendSupportSync
			EventMgr.on(Cmd.S2C_Friend_SyncSupport.cmdName, this, this.onSyncSupport)
			//	 派遣支援返回		PBPlayerSendSupportHero
			EventMgr.on(Cmd.S2C_Friend_SendSupport.cmdName, this, this.onSendSupport)
			//	 搜索返回			PBG2CFriendRefresh
			EventMgr.on(Cmd.S2C_Friend_Search.cmdName, this, this.onSearch)
			//	 雇佣支援返回		PBFriendHireSupport
			EventMgr.on(Cmd.S2C_Friend_HireSupport.cmdName, this, this.onHireSupport)
			//	 解雇支援返回		PBFriendHireSupport
			EventMgr.on(Cmd.S2C_Friend_FireSupport.cmdName, this, this.onFireSupport)
			//	 同步已使用支援	PBG2CFriendUsedSupportSync
			EventMgr.on(Cmd.S2C_Friend_SyncUsedSupport.cmdName, this, this.onSyncUsedSupport)
		}
		/*****
		 *	 通用失败返回
		 * @param 
		 */
		protected onCommonAck(): void
		{

		}
		/*****
		 *	 好友申请			PBPlayerFriendInfo
		 * @param PBPlayerFriendInfo
		 * 		display			PBPlayerDisplay	 好友显示
		 * 		fightpower			uint32	 战力
		 * 		offlinetime			uint32	 离线时间
		 * 		support			PBPlayerSupportHero	 支援英雄
		 */
		protected onAddApply(value: Pb_God.PBPlayerFriendInfo): void
		{
			this.addApply(value);
		}
		/*****
		 *	 删除申请			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDelApply(value: Pb_God.PBU32): void
		{
			//交给公共方法处理
			this.removeApply(value.value)
		}
		/*****
		 * 	 加好友			PBPlayerFriendInfo
		 * @param PBPlayerFriendInfo
		 * 		display			PBPlayerDisplay	 好友显示
		 * 		fightpower			uint32	 战力
		 * 		offlinetime			uint32	 离线时间
		 * 		support			PBPlayerSupportHero	 支援英雄
		 */
		protected onAddFriend(value: Pb_God.PBPlayerFriendInfo): void
		{
			this.addFriend(value);
			//增加好友的同时，将申请列表与黑名单列表移除
			this.removeApply(value.display.playerid);
			this.removeBlacklist(value.display.playerid);
			TipsUtils.showTipsByLanId("friend_msg3", value.display.playername);
		}
		/*****
		 * 	 删好友			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDelFriend(value: Pb_God.PBU32): void
		{
			TipsUtils.showTipsByLanId("friend_msg20");
			this.removeFriend(value.value);
		}
		/*****
		 * 	 增加黑名单		PBPlayerFriendInfo
		 * @param PBPlayerFriendInfo
		 * 		display			PBPlayerDisplay	 好友显示
		 * 		fightpower			uint32	 战力
		 * 		offlinetime			uint32	 离线时间
		 * 		support			PBPlayerSupportHero	 支援英雄
		 */
		protected onAddBalck(value: Pb_God.PBPlayerFriendInfo): void
		{
			TipsUtils.showTipsByLanId("friend_msg21");
			this.addBlacklist(value);
			//增加黑名单的同时，移除好友与申请列表
			this.removeApply(value.display.playerid);
			this.removeFriend(value.display.playerid);
		}
		/*****
		 * 	 移除黑名单		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDelBalck(value: Pb_God.PBU32): void
		{
			TipsUtils.showTipsByLanId("friend_msg22");
			this.removeBlacklist(value.value);
		}
		/*****
		 * 	 增加领取礼物		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onRecievePrize(value: Pb_God.PBU32): void
		{
			if (this._recieveprize.indexOf(value.value) >= 0) return;
			this._recieveprize.push(value.value);
			EventMgr.trigger(EventNotify.Friend_RecievePrize_Update); //通知更新
		}
		/*****
		 * 	 删除领取礼物		PBG2CFriendPrize
		 * @param PBG2CFriendPrize
		 * 		playerid			uint32	 好友显示
		 * 		item			PBItemInfo	 奖励道具
		 */
		protected onDelRecievePrize(value: Pb_God.PBG2CFriendPrize): void
		{
			let playerid = value.playerid;
			let index = this._recieveprize.indexOf(playerid);
			if (index >= 0) this._recieveprize.splice(index, 1);
			EventMgr.trigger(EventNotify.Friend_RecievePrize_Update); //通知更新
			//tips
			let friendInfo = this.getFriendInfo(value.playerid);
			if (!friendInfo)
				return;
			let tipsMsg = Global.getLangStr("friend_msg1", friendInfo.display.playername);
			if (value.item && value.item.length > 0)
			{
				let itemStrArr: string[] = [];
				for (var item of value.item)
				{
					itemStrArr.push(Global.getItemTipsString(item.itemid, item.itemcount.toNumber()));
				}
				tipsMsg += Global.getLangStr("friend_msg4") + itemStrArr.join(Global.getLangStr("common_join"));
			}

			TipsUtils.showTips(tipsMsg);
			SoundMgr.Inst().playSound("getcoin");
		}
		/*****
		 * 	 赠送礼物			PBG2CFriendPrize
		 * @param PBG2CFriendPrize
		 * 		playerid			uint32	 好友显示
		 * 		item			PBItemInfo	 奖励道具
		 */
		protected onSendPrize(value: Pb_God.PBG2CFriendPrize): void
		{
			let playerid = value.playerid;
			if (this._sendprizeMap.get(playerid)) return;
			this._sendprizeMap.put(playerid, playerid);
			this._sendprize.push(playerid);

			let friendInfo = this.getFriendInfo(value.playerid);
			if (!friendInfo)
				return;
			EventMgr.trigger(EventNotify.Friend_Single_Update, this.getFriendList().indexOf(friendInfo), friendInfo); //通知更新

			//tips
			let tipsMsg = Global.getLangStr("friend_msg2", friendInfo.display.playername);
			if (value.item && value.item.length > 0)
			{
				let itemStrArr: string[] = [];
				for (var item of value.item)
				{
					itemStrArr.push(Global.getItemTipsString(item.itemid, item.itemcount.toNumber()));
				}
				tipsMsg += Global.getLangStr("friend_msg4") + itemStrArr.join(Global.getLangStr("common_join"));
			}
			SoundMgr.Inst().playSound("pin");
			TipsUtils.showTips(tipsMsg);
		}
		/*****
		 * 	 同步好友信息		PBG2CFriendSyn
		 * @param PBG2CFriendSyn
		 * 		info			PBPlayerFriendInfo	 好友
		 */
		protected onSynFriend(value: Pb_God.PBG2CFriendSyn): void
		{
			this.initFriendList(value.info, false);
		}
		/*****
		 * 	 同步好友上线		PBPlayerFriendInfo
		 * @param PBPlayerFriendInfo
		 * 		display			PBPlayerDisplay	 好友显示
		 * 		fightpower			uint32	 战力
		 * 		offlinetime			uint32	 离线时间
		 * 		support			PBPlayerSupportHero	 支援英雄
		 */
		protected onOnline(value: Pb_God.PBPlayerFriendInfo): void
		{
			let oldInfo = this.getFriendInfo(value.display.playerid);
			if (oldInfo && oldInfo.offlinetime > 0 && value.offlinetime == 0)
			{ //从离线到上线
				TipsUtils.showTipsByLanId("friend_msg5", value.display.playername)
			}
			this.resetFriendInfo(value);
		}
		/*****
		 * 	 同步好友下线		PBPlayerFriendInfo
		 * @param PBPlayerFriendInfo
		 * 		display			PBPlayerDisplay	 好友显示
		 * 		fightpower			uint32	 战力
		 * 		offlinetime			uint32	 离线时间
		 * 		support			PBPlayerSupportHero	 支援英雄
		 */
		protected onOffline(value: Pb_God.PBPlayerFriendInfo): void
		{
			this.resetFriendInfo(value);
		}
		/*****
		 * 	 推荐好友			PBG2CFriendRefresh
		 * @param PBG2CFriendRefresh
		 * 		info			PBPlayerFriendInfo	 好友
		 */
		protected onRefresh(value: Pb_God.PBG2CFriendRefresh): void
		{
		}
		/*****
		 * 	 同步支援信息		PBW2GFriendSupportSync
		 * @param PBW2GFriendSupportSync
		 * 		support			PBW2GFriendSupport	 好友支援
		 */
		protected onSyncSupport(value: Pb_God.PBW2GFriendSupportSync): void
		{
			for (var el of value.support)
			{
				this.resetFriendSupportInfo(el.id, el.support);
			}
		}
		/*****
		 *	 派遣支援返回		PBPlayerSendSupportHero
		 * @param PBPlayerSendSupportHero
		 * 		type			uint32	 _emFriendSupportType
		 * 		petsn			uint64	 支援英雄sn
		 */
		protected onSendSupport(value: Pb_God.PBPlayerSendSupportHero): void
		{
			let hero = PetDataMgr.getPetInfo(value.petsn);
			this._heroMap.put(value.petsn + "", hero);
			this.putSelfSendSupport(value.type, value.petsn);
		}
		/*****
		 *	 搜索返回			PBG2CFriendRefresh
		 * @param PBG2CFriendRefresh
		 * 		info			PBPlayerFriendInfo	 好友
		 */
		protected onSearch(value: Pb_God.PBG2CFriendRefresh): void
		{

		}
		/*****
		 *	 雇佣支援返回		PBFriendHireSupport
		 * @param PBFriendHireSupport
		 * 		type			uint32	类型
		 * 		friendid			uint32	好友id
		 * 		sn			uint64	pet sn
		 */
		protected onHireSupport(value: Pb_God.PBFriendHireSupport): void
		{
			// 先查一下有没有重复的。
			for (let el of this._hiredSupportList)
			{
				if (value.type == el.type && value.sn.equals(el.sn))
					return;
			}
			this._hiredSupportList.push(value);
		}
		/*****
		 *	 解雇支援返回		PBFriendHireSupport
		 * @param PBFriendHireSupport
		 * 		type			uint32	类型
		 * 		friendid			uint32	好友id
		 * 		sn			uint64	pet sn
		 */
		protected onFireSupport(value: Pb_God.PBFriendHireSupport): void
		{
			for (let i = 0; i < this._hiredSupportList.length; i++)
			{
				let el = this._hiredSupportList[i]
				if (value.type == el.type && value.sn.equals(el.sn))
				{
					this._hiredSupportList.splice(i, 1);
					break;
				}
			}
		}
		/*****
		 *	 同步已使用支援	PBG2CFriendUsedSupportSync
		 * @param PBG2CFriendUsedSupportSync
		 * 		used			PBFriendSupport	 used
		 */
		protected onSyncUsedSupport(value: Pb_God.PBG2CFriendUsedSupportSync): void
		{
			//此处还需要和服务端确认是以追加的方式还是覆盖
			this._useHiredSupportList = value.used;
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}