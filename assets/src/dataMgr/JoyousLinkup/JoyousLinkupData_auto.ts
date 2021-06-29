
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
	export class JoyousLinkupData_auto extends JoyousLinkupDataMgrBase
	{
		constructor()
		{
			super()
			// 	 初始信息 PBG2CJoyousLinkupStartInfo
			EventMgr.on(Cmd.S2C_JoyousLinkup_Start_Info.cmdName, this, this.onStart_Info)
			// 	 连接棋子返回 PBG2CJoyousLinkupConnectResult
			EventMgr.on(Cmd.S2C_JoyousLinkup_Connect_Result.cmdName, this, this.onConnect_Result)
			// 	 棋子位置刷新 PBG2CJoyousLinkupChessData
			EventMgr.on(Cmd.S2C_JoyousLinkup_Info_Chg.cmdName, this, this.onInfo_Chg)
			// 	 游戏结束 PBG2CJoyousLinkupEnd
			EventMgr.on(Cmd.S2C_JoyousLinkup_End.cmdName, this, this.onEnd)
			// 	 退出游戏
			EventMgr.on(Cmd.S2C_JoyousLinkup_Quit.cmdName, this, this.onQuit)
		}
		/*****
		 * 	 初始信息 PBG2CJoyousLinkupStartInfo
		 * @param PBG2CJoyousLinkupStartInfo
		 * 		index			uint32	棋盘类型
		 * 		chessData			PBJoyousLinkupChessData	棋盘数据
		 * 		topScore			uint32	最高积分
		 * 		currScore			uint32	当前积分
		 * 		layerId			uint32	关卡id
		 */
		protected onStart_Info(value: Pb_God.PBG2CJoyousLinkupStartInfo): void
		{
			
		}
		/*****
		 * 	 连接棋子返回 PBG2CJoyousLinkupConnectResult
		 * @param PBG2CJoyousLinkupConnectResult
		 * 		flag			bool	是否成功消除
		 * 		endTime			uint32	倒计时结束时间
		 * 		currDoubleHit			uint32	当前连击数
		 * 		startPos			PBJoyousLinkupPos	起始棋子坐标
		 * 		endPos			PBJoyousLinkupPos	目标棋子坐标
		 * 		currScore			uint32	当前积分
		 */
		protected onConnect_Result(value: Pb_God.PBG2CJoyousLinkupConnectResult): void
		{

		}
		/*****
		 * 	 棋子位置刷新 PBG2CJoyousLinkupChessData
		 * @param PBG2CJoyousLinkupChessData
		 * 		chessData			PBJoyousLinkupChessData	棋盘数据
		 * 		refreshNum			uint32	刷新次数
		 */
		protected onInfo_Chg(value: Pb_God.PBG2CJoyousLinkupChessData): void
		{

		}
		/*****
		 * 	 游戏结束 PBG2CJoyousLinkupEnd
		 * @param PBG2CJoyousLinkupEnd
		 * 		flag			bool	游戏完成
		 * 		doubleHitScore			uint32	连击得分
		 * 		disScore			uint32	消除得分
		 * 		timeScore			uint32	时间得分
		 * 		bOver			bool	游戏结束
		 */
		protected onEnd(value: Pb_God.PBG2CJoyousLinkupEnd): void
		{

		}
		/*****
		 * 	 退出游戏
		 * @param 
		 */
		protected onQuit(): void
		{

		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}