
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
	export class CommonData_auto extends CommonDataMgrBase
	{
		constructor()
		{
			super()
			//消耗同步		PBG2CExpendSyn
			EventMgr.on(Cmd.S2C_Common_ExpendSyn.cmdName, this, this.onExpendSyn)
			//时间事件		PBG2CCommon_TimeEvent
			EventMgr.on(Cmd.S2C_Common_TimeEvent.cmdName, this, this.onTimeEvent)
			//GM命令返回	PBG2CGMCmdTxtCmd
			EventMgr.on(Cmd.S2C_Common_GMCmd.cmdName, this, this.onGMCmd)
			//增加等级 		PBG2CAddLevel
			EventMgr.on(Cmd.S2C_Common_AddLevel.cmdName, this, this.onAddLevel)
			//通用道具奖励	PBG2CCommonShowPrize
			EventMgr.on(Cmd.S2C_Common_ShowPrize.cmdName, this, this.onShowPrize)
			//查询玩家返回	PBG2CQueryPlayerViewAck
			EventMgr.on(Cmd.S2C_Common_PlayerViewAck.cmdName, this, this.onPlayerViewAck)
			//查询伙伴返回	PBPlayerPetView
			EventMgr.on(Cmd.S2C_Common_PetViewAck.cmdName, this, this.onPetViewAck)
			//重命名返回	PBPlayerRename
			EventMgr.on(Cmd.S2C_Common_PlayerRenameAck.cmdName, this, this.onPlayerRenameAck)
			//更新战斗力	PBU32
			EventMgr.on(Cmd.S2C_Common_UpdateFightPower.cmdName, this, this.onUpdateFightPower)
			//同步跨服信息	PBCommonSynPlayerBigWorld
			EventMgr.on(Cmd.S2C_Common_SynPlayerBigWorld.cmdName, this, this.onSynPlayerBigWorld)
			//系统开启(id, time)		PBU32U32
			EventMgr.on(Cmd.S2C_Common_SystemSwitch.cmdName, this, this.onSystemSwitch)
			//查询玩家名称	PBPlayerFriendInfo
			EventMgr.on(Cmd.S2C_Common_FindPlayerNameAck.cmdName, this, this.onFindPlayerNameAck)
			//查询世界等级 PBU32
			EventMgr.on(Cmd.S2C_Common_QueryWorldLevel.cmdName, this, this.onQueryWorldLevel)
			//玩家充值通知 PBU32
			EventMgr.on(Cmd.S2C_Common_AddRecharge.cmdName, this, this.onAddRecharge)
			//切磋错误通知 PBU32
			EventMgr.on(Cmd.S2C_Common_FightEachOther.cmdName, this, this.onFightEachOther)
			//保存个人空间背景返回 PBU32
			EventMgr.on(Cmd.S2C_Common_SetBackground.cmdName, this, this.onSetBackground)
			//设置展示的英雄返回  PBG2CCommonShowPets
			EventMgr.on(Cmd.S2C_Common_SetShowPets.cmdName, this, this.onSetShowPets)
			//关注返回(world id, player id) PBU32U32
			EventMgr.on(Cmd.S2C_Common_Follow.cmdName, this, this.onFollow)
			//取消关注返回(world id, player id) PBU32U32
			EventMgr.on(Cmd.S2C_Common_UnFollow.cmdName, this, this.onUnFollow)
			//设置切磋需要验证返回 PBU32
			EventMgr.on(Cmd.S2C_Common_SetFEONeedConfirm.cmdName, this, this.onSetFEONeedConfirm)
			//被请求切磋验证的推送 PBG2CCommonFightRequest
			EventMgr.on(Cmd.S2C_Common_FightEachOtherRequest.cmdName, this, this.onFightEachOtherRequest)
			//对方的切磋验证回复 PBG2CCommonFightReply
			EventMgr.on(Cmd.S2C_Common_FightEachOtherReply.cmdName, this, this.onFightEachOtherReply)
			//使用邀请码(邀请人的 world id, player id) PBU32U32
			EventMgr.on(Cmd.S2C_Common_UseInviteCode.cmdName, this, this.onUseInviteCode)
			//有接受自己邀请的玩家(world id, player id) PBU32U32
			EventMgr.on(Cmd.S2C_Common_InvitePlayer.cmdName, this, this.onInvitePlayer)
			//同步邀请奖励 PBPlayerInvitePrize
			EventMgr.on(Cmd.S2C_Common_InvitePrize.cmdName, this, this.onInvitePrize)
			//请求校验返回 PBG2CCommonSign
			EventMgr.on(Cmd.S2C_Common_Sign.cmdName, this, this.onSign)
			//请求全服物品记录返回 PBWorldItemLogs
			EventMgr.on(Cmd.S2C_Common_WorldItemLog.cmdName, this, this.onWorldItemLog)
			//领取问卷奖励
			EventMgr.on(Cmd.S2C_Common_SurveyPrize.cmdName, this, this.onSurveyPrize)
			//开启系统奖励返回 PBU32
			EventMgr.on(Cmd.S2C_Common_SystemSwitchPrize.cmdName, this, this.onSystemSwitchPrize)
			//简单通用奖励 PBU32
			EventMgr.on(Cmd.S2C_Common_Prize.cmdName, this, this.onPrize)
		}
		/*****
		 *消耗同步		PBG2CExpendSyn
		 * @param PBG2CExpendSyn
		 * 		expendtype			uint32	 玩家ID
		 * 		change			int64	 改变值
		 * 		value			uint64	 最终值
		 * 		doingtype			uint32	 操作类型_emDoingType
		 */
		protected onExpendSyn(value: Pb_God.PBG2CExpendSyn): void
		{
			let tempNum = Global.longToNumber(value.change);
			if (value.doingtype != Pb_God._emDoingType.DoingType_PetCall)
			{
				Global.showItemTipsByDoingType(value.doingtype, value.expendtype, tempNum);
			}
			PlayerDataMgr.costExpendNum(value.expendtype, -tempNum);
		}
		/*****
		 *时间事件		PBG2CCommon_TimeEvent
		 * @param PBG2CCommon_TimeEvent
		 * 		newday			bool	是否跨天
		 * 		newweek			bool	是否跨周
		 * 		newmonth			bool	是否跨月
		 * 		time			uint32	当前时间
		 */
		protected onTimeEvent(value: Pb_God.PBG2CCommon_TimeEvent): void
		{
			//重置前端时间
			TimeController.ins.setCurServerTime(value.time * 1000);

			//注意这里的newmonth与newweek是自然周与自然月，而不是开服周。 如果对于开服周与开服月重置的，需要另外计算
			let openServerDay = Math.floor((TimeController.currTimer - TimeController.worldCreateZeroTime) / (24 * 3600 * 1000));
			let isOpenServerNewMonth = (openServerDay % 7) == 0;
			let isOpenServerNewWeek = (openServerDay % 30) == 0;
			// 刷新开服天数向上取整
			PlayerDataMgr.serverOpenDays = Math.ceil((TimeController.currTimer - TimeController.worldCreateZeroTime) / (24 * 3600 * 1000));

			if (isOpenServerNewMonth)
			{ //开服30天

			}
			if (isOpenServerNewWeek)
			{ //开服7天
				ChallengeDataMgr.resetNewServerWeek();
				ShopDataMgr.resetNewServerWeek();
				AchieveDataMgr.resetNewServerWeek();
			}

			if (value.newmonth)
			{  //自然月
				WealDataMgr.resetNewMonth();
			}
			if (value.newweek)
			{ //自然周
				ElementDataMgr.resetNewWeek();
			}

			if (value.newday)
			{
				TodayRepeatOpMgr.Inst.cleanUp();
				PlayerDataMgr.resetNewDay();
				PetDataMgr.resetNewDay();
				HookDataMgr.resetNewDay();
				PrivilegeDataMgr.resetNewDay();
				AchieveDataMgr.resetNewDay();
				TrainDataMgr.resetNewDay();
				ExpeditionDataMgr.resetNewDay();
				CopymapDataMgr.resetNewDay();
				ElementDataMgr.resetNewDay();
				SailDataMgr.resetNewDay();
				FactionDataMgr.resetNewDay();
				ChallengeDataMgr.resetNewDay();
				FriendDataMgr.resetNewDay();
				DanDataMgr.resetNewDay();
				LadderDataMgr.resetNewDay();
				VideoDataMgr.resetNewDay();
				WealDataMgr.resetNewDay();
				ActivityDataMgr.resetNewDay();
				ShopDataMgr.resetNewDay();
				ArtifactDataMgr.resetNewDay();
				HeavenDungeonDataMgr.resetNewDay();
				LotteryDataMgr.resetNewDay();
				WeekChampionDataMgr.resetNewDay();
			}
		}
		/*****
		 *GM命令返回	PBG2CGMCmdTxtCmd
		 * @param PBG2CGMCmdTxtCmd
		 * 		callbackid			uint64	 回调id
		 * 		result			bool	 结果
		 * 		msg			string	 附带信息
		 */
		protected onGMCmd(value: Pb_God.PBG2CGMCmdTxtCmd): void
		{

		}
		/*****
		 *增加等级 		PBG2CAddLevel
		 * @param PBG2CAddLevel
		 * 		level			uint32	等级
		 * 		doingtype			uint32	类型
		 */
		protected onAddLevel(value: Pb_God.PBG2CAddLevel): void
		{
			PlayerDataMgr.setLevel(value.level, value.doingtype);
		}
		/*****
		 *通用道具奖励	PBG2CCommonShowPrize
		 * @param PBG2CCommonShowPrize
		 * 		item			PBItemInfo	道具
		 * 		pet			PBPetStar	伙伴
		 * 		doingtype			uint32	原因_emDoingType
		 * 		splititem			PBItemInfo	分解道具
		 */
		protected onShowPrize(value: Pb_God.PBG2CCommonShowPrize): void
		{
			if (value.doingtype != Pb_God._emDoingType.DoingType_PetCall &&
				value.doingtype != Pb_God._emDoingType.DoingType_PetCall2 &&
				value.doingtype != Pb_God._emDoingType.DoingType_Artifact &&
				value.doingtype != Pb_God._emDoingType.DoingType_SystemOpen &&
				value.doingtype != Pb_God._emDoingType.DoingType_Weal)
			{  //弹窗提示
				AwardOpenUtils.showTimeAwardOpen(value.item as any, value.pet);
			}
		}
		/*****
		 *查询玩家返回	PBG2CQueryPlayerViewAck
		 * @param PBG2CQueryPlayerViewAck
		 * 		viewtype			uint32	 查询类型 _emQueryPlayerViewType
		 * 		main			PBPlayerView	 主界面
		 * 		honor			PBGlobalHonorDisplay	 荣誉
		 * 		privatespace			PBPrivateSpaceDisplay	 个人空间
		 */
		protected onPlayerViewAck(value: Pb_God.PBG2CQueryPlayerViewAck): void
		{

		}
		/*****
		 *查询伙伴返回	PBPlayerPetView
		 * @param PBPlayerPetView
		 * 		petinfo			PBPlayerPetInfo	 伙伴数据
		 * 		factionskilllevel			uint32	 帮派技能等级
		 * 		holyinfo			PBPlayerHolyInfo	 圣物数据
		 */
		protected onPetViewAck(value: Pb_God.PBPlayerPetView): void
		{
			if (!value.petinfo)
			{
				// GameLaunch.PostClientLog("S2C_Common_PetViewAck 数据异常！！！ PBPlayerPetView 的 petinfo 为空");
				logD("S2C_Common_PetViewAck 数据异常！！！ PBPlayerPetView 的 petinfo 为空")
				return;
			}
			UIManager.Inst.forceOpen(new HeroViewInfoOpenUIData().initPetView(value));
		}
		/*****
		 *重命名返回	PBPlayerRename
		 * @param PBPlayerRename
		 * 		name			string	 角色名
		 * 		gender			uint32	 性别
		 */
		protected onPlayerRenameAck(value: Pb_God.PBPlayerRename): void
		{
			PlayerDataMgr.name = value.name;
			PlayerDataMgr.gender = value.gender;
			PlayerDataMgr.renamecount++;
		}
		/*****
		 *更新战斗力	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onUpdateFightPower(value: Pb_God.PBU32): void
		{
			if (PlayerDataMgr.fightPower == value.value) { return; }
			let oldPower = PlayerDataMgr.fightPower;
			PlayerDataMgr.fightPower = value.value;
			if (value.value > PlayerDataMgr.maxfightPower)
			{
				PlayerDataMgr.maxfightPower = value.value;
			}
			EventMgr.trigger(EventNotify.PlayerFightPowerChange);
			if (value.value > oldPower && oldPower != 0)
			{
				EffectMgr.Inst.showUI_FightPowerUp(oldPower, value.value - oldPower);
				//数据上报-战斗力提升
				{
					ThirdMgr.report37SDKData(GameDataType.POWER_CHANGE);
				}
			}
		}
		/*****
		 *同步跨服信息	PBCommonSynPlayerBigWorld
		 * @param PBCommonSynPlayerBigWorld
		 * 		worldinfo			PBU32U32	服务器信息 服ID_等级
		 */
		protected onSynPlayerBigWorld(value: Pb_God.PBCommonSynPlayerBigWorld): void
		{

		}
		/*****
		 *系统开启(id, time)		PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onSystemSwitch(value: Pb_God.PBU32U32): void
		{
			PlayerDataMgr.setSystemSwitchOpen(value.key, value.value);
		}
		/*****
		 *查询玩家名称	PBPlayerFriendInfo
		 * @param PBPlayerFriendInfo
		 * 		display			PBPlayerDisplay	 好友显示
		 * 		fightpower			uint32	 战力
		 * 		offlinetime			uint32	 离线时间
		 * 		support			PBPlayerSupportHero	 支援英雄
		 */
		protected onFindPlayerNameAck(value: Pb_God.PBPlayerFriendInfo): void
		{

		}
		/*****
		 *查询世界等级 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onQueryWorldLevel(value: Pb_God.PBU32): void
		{
			this.worldLevel = value.value;
		}
		/*****
		 *玩家充值通知 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onAddRecharge(value: Pb_God.PBU32): void
		{
			PlayerDataMgr.todayrecharge += value.value;
			PlayerDataMgr.totalrecharge += value.value;
		}
		/*****
		 *切磋错误通知 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onFightEachOther(value: Pb_God.PBU32): void
		{

		}
		/*****
		 *保存个人空间背景返回 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSetBackground(value: Pb_God.PBU32): void
		{

		}
		/*****
		 *设置展示的英雄返回  PBG2CCommonShowPets
		 * @param PBG2CCommonShowPets
		 * 		sn			uint64	sn
		 */
		protected onSetShowPets(value: Pb_God.PBG2CCommonShowPets): void
		{

		}
		/*****
		 *关注返回(world id, player id) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onFollow(value: Pb_God.PBU32U32): void
		{

		}
		/*****
		 *取消关注返回(world id, player id) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onUnFollow(value: Pb_God.PBU32U32): void
		{

		}
		/*****
		 *设置切磋需要验证返回 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSetFEONeedConfirm(value: Pb_God.PBU32): void
		{

		}
		/*****
		 *被请求切磋验证的推送 PBG2CCommonFightRequest
		 * @param PBG2CCommonFightRequest
		 * 		worldid			uint32	请求切磋玩家world id
		 * 		playerid			uint32	请求切磋玩家player id
		 * 		playername			string	请求切磋玩家名字
		 */
		protected onFightEachOtherRequest(value: Pb_God.PBG2CCommonFightRequest): void
		{

		}
		/*****
		 *对方的切磋验证回复 PBG2CCommonFightReply
		 * @param PBG2CCommonFightReply
		 * 		worldid			uint32	对方的world id
		 * 		playerid			uint32	对方的player id
		 * 		reply			bool	答复
		 * 		confirm			bool	对方是否需要验证(false的话可以不用弹出确认框直接请求战斗)
		 */
		protected onFightEachOtherReply(value: Pb_God.PBG2CCommonFightReply): void
		{

		}
		/*****
		 *使用邀请码(邀请人的 world id, player id) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onUseInviteCode(value: Pb_God.PBU32U32): void
		{

		}
		/*****
		 *有接受自己邀请的玩家(world id, player id) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onInvitePlayer(value: Pb_God.PBU32U32): void
		{

		}
		/*****
		 *同步邀请奖励 PBPlayerInvitePrize
		 * @param PBPlayerInvitePrize
		 * 		id			uint32	成就ID
		 * 		num			uint32	可领取数量
		 * 		gotnum			uint32	已经领取数量
		 */
		protected onInvitePrize(value: Pb_God.PBPlayerInvitePrize): void
		{

		}
		/*****
		 *请求校验返回 PBG2CCommonSign
		 * @param PBG2CCommonSign
		 * 		type			uint32	类型
		 * 		time			uint32	时间
		 * 		sign			string	校验字符串
		 * 		params			string	请求的参数原样返回
		 */
		protected onSign(value: Pb_God.PBG2CCommonSign): void
		{
		}
		/*****
		 *请求全服物品记录返回 PBWorldItemLogs
		 * @param PBWorldItemLogs
		 * 		type			uint32	 记录类型
		 * 		items			PBWorldItemLogData	 物品记录
		 */
		protected onWorldItemLog(value: Pb_God.PBWorldItemLogs): void
		{

		}
		/*****
		 *领取问卷奖励
		 * @param 
		 */
		protected onSurveyPrize(): void
		{

		}
		/*****
		 *开启系统奖励返回 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSystemSwitchPrize(value: Pb_God.PBU32): void
		{
			SoundMgr.Inst().playSound("pin");
			PlayerDataMgr.setSystemPrizeState(value.value);
		}
		/*****
		 *简单通用奖励 PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onPrize(value: Pb_God.PBU32): void
		{
			this._prizeStateMap.put(value.value, value.value);
			EventMgr.trigger(EventNotify.CommonPrizeState_Change, value.value);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}