
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
	export class MailData_auto extends MailDataMgrBase
	{
		constructor()
		{
			super()
			//新邮件 	PBMail
			EventMgr.on(Cmd.S2C_Mail_New.cmdName, this, this.onNew)
			//删除返回	 PBAllMailID
			EventMgr.on(Cmd.S2C_Mail_Delete.cmdName, this, this.onDelete)
			//已读返回	PBMailID
			EventMgr.on(Cmd.S2C_Mail_Read.cmdName, this, this.onRead)
			//领取返回	PBAllMailID
			EventMgr.on(Cmd.S2C_Mail_Reward.cmdName, this, this.onReward)
		}
		/*****
		 *新邮件 	PBMail
		 * @param PBMail
		 * 		worldid			uint32	世界ID
		 * 		playerid			uint32	玩家ID
		 * 		mailid			uint32	编号
		 * 		type			uint32	类型_emMailType
		 * 		sendtime			uint32	发送时间
		 * 		expiretime			uint32	过期时间
		 * 		title			string	标题
		 * 		text			string	正文
		 * 		state			uint32	已读标记 (0代表未读,其他已读) _emMailState
		 * 		doingtype			uint32	操作类型_emDoingType
		 * 		item			PBItem	道具
		 * 		param			uint32	参数
		 * 		backmailid			string	后台邮件ID 
		 */
		protected onNew(value: Pb_God.PBMail): void
		{
			
		}
		/*****
		 *删除返回	 PBAllMailID
		 * @param PBAllMailID
		 * 		mailid			uint32	邮件ID
		 */
		protected onDelete(value: Pb_God.PBAllMailID): void
		{
			
		}
		/*****
		 *已读返回	PBMailID
		 * @param PBMailID
		 * 		mailid			uint32	邮件ID
		 */
		protected onRead(value: Pb_God.PBMailID): void
		{
			
		}
		/*****
		 *领取返回	PBAllMailID
		 * @param PBAllMailID
		 * 		mailid			uint32	邮件ID
		 */
		protected onReward(value: Pb_God.PBAllMailID): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}