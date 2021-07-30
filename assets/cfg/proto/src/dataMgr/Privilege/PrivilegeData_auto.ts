
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
	export class PrivilegeData_auto extends PrivilegeDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用失败返回
			EventMgr.on(Cmd.S2C_Privilege_Common.cmdName, this, this.onCommon)
			//	 新vip经验			PBU32
			EventMgr.on(Cmd.S2C_Privilege_UpVipExp.cmdName, this, this.onUpVipExp)
			//	 购买vip礼包返回 		PBU32
			EventMgr.on(Cmd.S2C_Privilege_BuyVipPacket.cmdName, this, this.onBuyVipPacket)
			//	 购买特权商店 		PBU32
			EventMgr.on(Cmd.S2C_Privilege_ShopBuy.cmdName, this, this.onShopBuy)
			//	 领取每日奖励			PBU32
			EventMgr.on(Cmd.S2C_Privilege_DailyPrize.cmdName, this, this.onDailyPrize)
			//	 同步特权卡充值		PBPrivilegeCharge
			EventMgr.on(Cmd.S2C_Privilege_CardCharge.cmdName, this, this.onCardCharge)
			//	 同步特权卡			PBPrivilegeCard
			EventMgr.on(Cmd.S2C_Privilege_SynCard.cmdName, this, this.onSynCard)
			// 	 同步特权数据 	    PBPlayerPrivilege
			EventMgr.on(Cmd.S2C_Privilege_SynData.cmdName, this, this.onSynData)
		}
		/*****
		 *	 通用失败返回
		 * @param 
		 */
		protected onCommon(): void
		{
			
		}
		/*****
		 *	 新vip经验			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onUpVipExp(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *	 购买vip礼包返回 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onBuyVipPacket(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *	 购买特权商店 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onShopBuy(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *	 领取每日奖励			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDailyPrize(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *	 同步特权卡充值		PBPrivilegeCharge
		 * @param PBPrivilegeCharge
		 * 		cardid			uint32	特权卡ID _emPrivilegeCard
		 * 		totalcharge			uint32	累计充值
		 * 		expiretime			uint32	0未激活
		 */
		protected onCardCharge(value: Pb_God.PBPrivilegeCharge): void
		{
			
		}
		/*****
		 *	 同步特权卡			PBPrivilegeCard
		 * @param PBPrivilegeCard
		 * 		cardid			uint32	特权卡ID _emPrivilegeCard
		 * 		expiretime			uint32	失效时间(0永久)
		 */
		protected onSynCard(value: Pb_God.PBPrivilegeCard): void
		{
			
		}
		/*****
		 * 	 同步特权数据 	    PBPlayerPrivilege
		 * @param PBPlayerPrivilege
		 * 		vip			PBPrivilegeVip	vip数据
		 * 		shopbuy			PBPrivilegeShopBuy	特权商店
		 * 		dailyprize			PBPrivilegeDailyPrize	每日奖励
		 * 		card			PBPrivilegeCard	特权卡
		 * 		charge			PBPrivilegeCharge	特权卡充值记录
		 * 		IsCompensation			uint32	是否已验证补偿过
		 */
		protected onSynData(value: Pb_God.PBPlayerPrivilege): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}