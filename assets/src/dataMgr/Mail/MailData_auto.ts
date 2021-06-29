
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
			this.mails.unshift(value);
			EventMgr.trigger(EventNotify.Mail_Changed);
		}
		/*****
		 *删除返回	 PBAllMailID
		 * @param PBAllMailID
		 * 		mailid			uint32	邮件ID
		 */
		protected onDelete(value: Pb_God.PBAllMailID): void
		{
			let index = 0;
			while (index < this.mails.length)
			{
				let tempInfo = this.mails[index];
				if (value.mailid.indexOf(tempInfo.mailid) >= 0)
				{
					this.mails.splice(index, 1);
				}
				else
				{
					index++;
				}
			}
			EventMgr.trigger(EventNotify.Mail_Changed);
		}
		/*****
		 *已读返回	PBMailID
		 * @param PBMailID
		 * 		mailid			uint32	邮件ID
		 */
		protected onRead(value: Pb_God.PBMailID): void
		{
			let tempInfo = this.mails.filter(element => element.mailid == value.mailid);
			if (tempInfo.length > 0)
			{
				if (tempInfo[0].state == Pb_God._emMailState.MailState_NoRead)
				{
					tempInfo[0].state = Pb_God._emMailState.MailState_Readed;
				}
				EventMgr.trigger(EventNotify.Mail_Changed);
			}
		}
		/*****
		 *领取返回	PBAllMailID
		 * @param PBAllMailID
		 * 		mailid			uint32	邮件ID
		 */
		protected onReward(value: Pb_God.PBAllMailID): void
		{
			let index = 0;
			while (index < this.mails.length)
			{
				let tempInfo = this.mails[index];
				if (value.mailid.indexOf(tempInfo.mailid) >= 0)
				{
					tempInfo.state = Pb_God._emMailState.MailState_Reward;
				}
				index++;
			}
			EventMgr.trigger(EventNotify.Mail_Changed);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}