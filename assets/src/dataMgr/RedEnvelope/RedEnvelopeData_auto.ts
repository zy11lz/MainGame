
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
	export class RedEnvelopeData_auto extends RedEnvelopeDataMgrBase
	{
		constructor()
		{
			super()
			//失败才返回
			EventMgr.on(Cmd.S2C_RedEnvelope_Common_Ack.cmdName, this, this.onCommon_Ack)
			//开启红包 PBG2COpenRedEnvelopeAck
			EventMgr.on(Cmd.S2C_RedEnvelope_OpenAck.cmdName, this, this.onOpenAck)
			//刷新/重置红包 PBG2CRedEnvelopeRefresh
			EventMgr.on(Cmd.S2C_RedEnvelope_Refresh.cmdName, this, this.onRefresh)
		}
		/*****
		 *失败才返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{
			
		}
		/*****
		 *开启红包 PBG2COpenRedEnvelopeAck
		 * @param PBG2COpenRedEnvelopeAck
		 * 		index			uint32	红包索引
		 * 		receiveTime			uint32	红包领取时间
		 * 		status			uint32	红包领取状态 0可领取 1未开启 2已领取
		 * 		award			PBItemInfo	红包领取物品
		 * 		data			PBRedEnvelopeData	其他人获取列表
		 * 		newFlag			uint32	新红包标识 0旧红包 1新红包 
		 */
		protected onOpenAck(value: Pb_God.PBG2COpenRedEnvelopeAck): void
		{
			
		}
		/*****
		 *刷新/重置红包 PBG2CRedEnvelopeRefresh
		 * @param PBG2CRedEnvelopeRefresh
		 * 		data			PBRefreshInfo	刷新/重置数据
		 */
		protected onRefresh(value: Pb_God.PBG2CRedEnvelopeRefresh): void
		{
			this._redEnvelopeInfo = value.data;
			EventMgr.trigger(EventNotify.RedEnvelope_Update);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}