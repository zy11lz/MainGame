
/**
* 
*	
* 保存服务器的发送的数据
* 
*  1.socket读取二进制数据----》
*  2.二进制数据转换为proto-------》 
*  3.抛出协议事件 -------》 
*  4.各个系统的dataMgr侦听事件，接收并保存服务器发过来的数据 ------》 
*  5.dataMgr抛出数据整理好的CmdEvent事件  -------》 
*  6.各个ui侦听CmdEvent事件，向各个系统的dataMgr提供的方法接口获取最新的数据，更新ui显示
* 
*  ui不负责直接侦听服务器数据事件， 也不负责保存服务器数据，
*  由各个系统的dataMgr统一管理
* 
*/

module Pro 
{
	export class MailDataMgrBase
	{
		/** 红点 */
		public reddotModel: RedDotModel = new RedDotModel();
		protected mails: Pb_God.PBMail[];
		constructor()
		{

		}

		/** 初始化 */
		public init(info: Pb_God.PBMail[])
		{
			this.mails = info;
			this.mails.sort(function (a, b) { return a.sendtime > b.sendtime ? -1 : 1 });

			this.reddotModel.cleanUp();
			this.reddotModel.addGlobalEventRefresh(EventNotify.Mail_Changed);
			this.reddotModel.setupCheckMethod(this, this.isHaveMailToCherk);
		}


		public getMailCount(): number
		{
			if (this.mails)
			{
				return this.mails.length;
			}
			return 0;
		}

		public getMailByIndex(index: number): Pb_God.PBMail
		{
			if (this.mails)
			{
				return this.mails[index];
			}
			return null;
		}

		/** 是否有邮件未收取或未查看 */
		public isHaveMailToCherk(): number
		{
			for (let i = 0; i < this.mails.length; i++)
			{
				let tmpInfo = this.mails[i];
				if (tmpInfo.state == Pb_God._emMailState.MailState_NoRead || (tmpInfo.item.length > 0 && tmpInfo.state != Pb_God._emMailState.MailState_Reward))
				{
					return 1;
				}
			}
			return 0;
		}

	}
}
