
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
	export class TalkData_auto extends TalkDataMgrBase
	{
		constructor()
		{
			super()
			//聊天  		PBG2CTalkAck
			EventMgr.on(Cmd.S2C_Talk_Talk.cmdName, this, this.onTalk)
			//同步聊天缓存	PBG2CTalk_SynSaveChat
			EventMgr.on(Cmd.S2C_Talk_SynSaveChat.cmdName, this, this.onSynSaveChat)
			//撤回聊天 PBG2CRecall 
			EventMgr.on(Cmd.S2C_Talk_ChatRecall.cmdName, this, this.onChatRecall)
		}
		/*****
		 *聊天  		PBG2CTalkAck
		 * @param PBG2CTalkAck
		 * 		playerdisplay			PBPlayerDisplay	 说话人 playerid  0代表是 系统
		 * 		channel			uint32	 频道
		 * 		data			string	 聊天内容
		 * 		dataext			string	 聊天内容扩展
		 * 		targetdisplay			PBPlayerDisplay	 目标玩家 私聊信息使用
		 * 		order			uint32	 聊天消息序号，用于撤回
		 */
		protected onTalk(value: Pb_God.PBG2CTalkAck): void
		{

		}
		/*****
		 *同步聊天缓存	PBG2CTalk_SynSaveChat
		 * @param PBG2CTalk_SynSaveChat
		 * 		worldmsg			PBG2CTalkAck	世界聊天缓存
		 * 		crossmsg			PBG2CTalkAck	跨服聊天缓存
		 * 		provincemsg			PBG2CTalkAck	同省聊天
		 * 		factionmsg			PBG2CTalkAck	帮会聊天
		 * 		playermsg			PBG2CTalkAck	私人聊天
		 */
		protected onSynSaveChat(value: Pb_God.PBG2CTalk_SynSaveChat): void
		{
			for (var index = 0; index < value.worldmsg.length; index++)
			{
				var element = value.worldmsg[index];
				ChatDataMgr.addChatInfo(element, false);
			}
		}
		/*****
		 *撤回聊天 PBG2CRecall 
		 * @param PBG2CRecall
		 * 		channel			uint32	 频道
		 * 		order			uint32	 消息序号
		 * 		senderid			uint32	 发送人id
		 */
		protected onChatRecall(value: Pb_God.PBG2CRecall): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}