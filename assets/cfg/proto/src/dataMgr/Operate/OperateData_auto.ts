
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
	export class OperateData_auto extends OperateDataMgrBase
	{
		constructor()
		{
			super()
			// 验证请求 	VerifyAsk
			EventMgr.on(Cmd.S2C_Operate_Verify_Ask.cmdName, this, this.onVerify_Ask)
			// Ping请求	PingAsk
			EventMgr.on(Cmd.S2C_Operate_Ping_Ask.cmdName, this, this.onPing_Ask)
			// 登录请求	(取CAW PBLoginAsk和CAG PBC2GLoginAsk)
			EventMgr.on(Cmd.S2C_Operate_Login_Ask.cmdName, this, this.onLogin_Ask)
			// 验证应答	VerifyAck
			EventMgr.on(Cmd.S2C_Operate_Verify_Ack.cmdName, this, this.onVerify_Ack)
			// Ping应答	PingAck
			EventMgr.on(Cmd.S2C_Operate_Ping_Ack.cmdName, this, this.onPing_Ack)
			// 断开命令 	无内容
			EventMgr.on(Cmd.S2C_Operate_Disconnect.cmdName, this, this.onDisconnect)
			// 错误包通知	BadNotify
			EventMgr.on(Cmd.S2C_Operate_Bad_Notify.cmdName, this, this.onBad_Notify)
			// 踢出通知 	无内容
			EventMgr.on(Cmd.S2C_Operate_Kick_Notify.cmdName, this, this.onKick_Notify)
			// 登录应答	(取CAW PBLoginAck 和CAG PBG2CLoginAck)	
			EventMgr.on(Cmd.S2C_Operate_Login_Ack.cmdName, this, this.onLogin_Ack)
			// 读取超时		无内容
			EventMgr.on(Cmd.S2C_Operate_TimeoutRead.cmdName, this, this.onTimeoutRead)
			// 写入超时	无内容
			EventMgr.on(Cmd.S2C_Operate_TimeoutWrite.cmdName, this, this.onTimeoutWrite)
			// 关服通知   (取CAW PBCloseServerData)
			EventMgr.on(Cmd.S2C_Operate_CloseServer.cmdName, this, this.onCloseServer)
		}
		/*****
		 * 验证请求 	VerifyAsk
		 * @param 
		 */
		protected onVerify_Ask(): void
		{
			
		}
		/*****
		 * Ping请求	PingAsk
		 * @param PingAsk
		 * 		order			uint32	 序号
		 */
		protected onPing_Ask(value: Pb_God.PingAsk): void
		{
			
		}
		/*****
		 * 登录请求	(取CAW PBLoginAsk和CAG PBC2GLoginAsk)
		 * @param PBC2GLoginAsk
		 * 		playerID			uint32	 角色ID
		 * 		loginSN			int64	 登录流水号
		 * 		bReconnet			bool	 是否断线重连
		 */
		protected onLogin_Ask(value: Pb_God.PBC2GLoginAsk): void
		{
			
		}
		/*****
		 * 验证应答	VerifyAck
		 * @param 
		 */
		protected onVerify_Ack(): void
		{
			
		}
		/*****
		 * Ping应答	PingAck
		 * @param PingAck
		 * 		order			uint32	 序号
		 * 		systemTick			uint64	 系统启动毫秒
		 * 		systemTime			uint32	 系统时间
		 */
		protected onPing_Ack(value: Pb_God.PingAck): void
		{
			
		}
		/*****
		 * 断开命令 	无内容
		 * @param 
		 */
		protected onDisconnect(): void
		{
			
		}
		/*****
		 * 错误包通知	BadNotify
		 * @param 
		 */
		protected onBad_Notify(): void
		{
			
		}
		/*****
		 * 踢出通知 	无内容
		 * @param 
		 */
		protected onKick_Notify(): void
		{
			
		}
		/*****
		 * 登录应答	(取CAW PBLoginAck 和CAG PBG2CLoginAck)	
		 * @param PBG2CLoginAck
		 * 		curtime			uint32	 当前时间
		 */
		protected onLogin_Ack(value: Pb_God.PBG2CLoginAck): void
		{
			
		}
		/*****
		 * 读取超时		无内容
		 * @param 
		 */
		protected onTimeoutRead(): void
		{
			
		}
		/*****
		 * 写入超时	无内容
		 * @param 
		 */
		protected onTimeoutWrite(): void
		{
			
		}
		/*****
		 * 关服通知   (取CAW PBCloseServerData)
		 * @param PBCloseServerData
		 * 		closeTime			uint64	关服倒计时
		 * 		closeStr			string	关服通告
		 */
		protected onCloseServer(value: Pb_God.PBCloseServerData): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}