
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
	export class WealData_auto extends WealDataMgrBase
	{
		constructor()
		{
			super()
			// 	 福利通用返回
			EventMgr.on(Cmd.S2C_Weal_Common_ACK.cmdName, this, this.onCommon_ACK)
			//	 签到返回 返回当前的状态		PBU32
			EventMgr.on(Cmd.S2C_Weal_Signin.cmdName, this, this.onSignin)
			//	 点石成金获取奖励返回			PBG2CClickGold
			EventMgr.on(Cmd.S2C_Weal_ClickGold.cmdName, this, this.onClickGold)
			//	 点石成金重置次数通知			PBU32
			EventMgr.on(Cmd.S2C_Weal_ClickGoldReset.cmdName, this, this.onClickGoldReset)
			//	 返回返利结果			PBFanliInfo
			EventMgr.on(Cmd.S2C_Weal_FanliResult.cmdName, this, this.onFanliResult)
			//	 cdk验证返回	PBU32String
			EventMgr.on(Cmd.S2C_Weal_CDK.cmdName, this, this.onCDK)
			//	 领取在线奖励返回	PBU32
			EventMgr.on(Cmd.S2C_Weal_OnlinePrize.cmdName, this, this.onOnlinePrize)
			//	 领取礼包返回	PBU32
			EventMgr.on(Cmd.S2C_Weal_GetGift.cmdName, this, this.onGetGift)
			//	获取找回资源数据返回  PBG2CResourceFindBackInfo
			EventMgr.on(Cmd.S2C_ResourceFindBack_GetInfo.cmdName, this, this.onGetInfo)
			//	领取找回资源 	PBG2CDrawFindBack
			EventMgr.on(Cmd.S2C_ResourceFindBack_Draw.cmdName, this, this.onDraw)
		}
		/*****
		 * 	 福利通用返回
		 * @param 
		 */
		protected onCommon_ACK(): void
		{

		}
		/*****
		 *	 签到返回 返回当前的状态		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSignin(value: Pb_God.PBU32): void
		{
			if (this.signinState == value.value) return;
			if (this.signinState == Pb_God._emWealSigninState.Weal_Signin_Available) this.signinDays++; //当天第一次签时天数加1
			this.signinState = value.value;
			this.reddotModel.refreshChild("signin");
		}
		/*****
		 *	 点石成金获取奖励返回			PBG2CClickGold
		 * @param PBG2CClickGold
		 * 		type			uint32	 类型
		 * 		times			uint32	 点击次数
		 */
		protected onClickGold(value: Pb_God.PBG2CClickGold): void
		{
			let goldParams = cfg.WealClickgoldCfgData.getAddGoldBaseByType(value.type).split("_");
			//=param1+param2* floor(（主线关卡-1）/3 )
			let hookStage = HookDataMgr.getStageID();
			let goldCount = parseInt(goldParams[0]) + parseInt(goldParams[1]) * Math.floor(hookStage / 3);
			//VIP加成            
			let vipAddPercent = PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_ClickGold);
			let vipAddMsg = vipAddPercent == 0 ? "" : Global.getLangStr("bag_msg10", PrivilegeDataMgr.vipLevel, Math.floor(goldCount * vipAddPercent / 100));
			TipsUtils.showItemTips(CfgID.ItemID.Gold, goldCount, vipAddMsg);

			SoundMgr.Inst().playSound("getcoin");
			this._clickGoldCountMap.put(value.type, value.times);
			this.reddotModelClickGold.refresh();
		}
		/*****
		 *	 点石成金重置次数通知			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onClickGoldReset(value: Pb_God.PBU32): void
		{
			this.clickGoldNextResetTime = value.value;
			this._clickGoldCountMap.clear();
			this.reddotModelClickGold.refresh();
		}
		/*****
		 *	 返回返利结果			PBFanliInfo
		 * @param PBFanliInfo
		 * 		money			uint32	 充值金额
		 * 		state			uint32	 状态 参考player_FanLi_State
		 */
		protected onFanliResult(value: Pb_God.PBFanliInfo): void
		{
			this.player_rebateMoney = value.money;
			this.player_rebateState = value.state;
			EventMgr.trigger(EventNotify.Activity_RebateStateUpdate);
		}
		/*****
		 *	 cdk验证返回	PBU32String
		 * @param PBU32String
		 * 		key			uint32	 
		 * 		value			string	 
		 */
		protected onCDK(value: Pb_God.PBU32String): void
		{
			if (value.key != 200)
			{
				//有返回错误提示，则直接按原文本提示即可，否则提示固定文字 兑换失败!
				if (value.value)
					TipsUtils.showTips(value.value);
				else
					TipsUtils.showTipsByLanId("PlayerInfo_CDKey_msg2");
			}
		}
		/*****
		 *	 领取在线奖励返回	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onOnlinePrize(value: Pb_God.PBU32): void
		{
			SoundMgr.Inst().playSound("pin");
			this.onlinePrizeIndex = value.value;
		}
		/*****
		 *	 领取礼包返回	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onGetGift(value: Pb_God.PBU32): void
		{

		}
		/*****
		 *	获取找回资源数据返回  PBG2CResourceFindBackInfo
		 * @param PBG2CResourceFindBackInfo
		 * 		OfflineDay			uint32	玩家离线天数
		 * 		FindBackDay			uint32	玩家找回天数 
		 * 		FindBacks			PBFindBackData	离线找回数据
		 */
		protected onGetInfo(value: Pb_God.PBG2CResourceFindBackInfo): void
		{
			this.FindBacks = value.FindBacks;
			this.OfflineDay = value.OfflineDay;
			this.FindBackDay = value.FindBackDay;
		}
		/*****
		 *	领取找回资源 	PBG2CDrawFindBack
		 * @param PBG2CDrawFindBack
		 */
		protected onDraw(value: Pb_God.PBG2CDrawFindBack): void
		{

		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}