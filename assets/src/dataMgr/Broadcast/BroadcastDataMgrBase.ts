
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
	export class BroadcastDataMgrBase
	{
		constructor()
		{

		}

		/** 显示指定公告内容
		 * @param broadCastId 数据表Id
		 * @param args 对应content的通配符
		 */
		protected showBroadCast(broadCastId: number, ...args): void
		{
			let channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			let chatData = this.getBroadCastToChannel(broadCastId, channel, true, ...args);
			if (chatData) ChatDataMgr.addChatInfo(chatData, false);
		}

		/** 指定聊天频道显示 */
		protected getBroadCastToChannel(broadCastId: number, channel: number, showFloatNotice: boolean, ...agrs): Pb_God.PBG2CTalkAck
		{
			let broadCfgInfo = cfg.BroadCastCastMsgCfgData.getInfo(broadCastId);
			if (!broadCfgInfo) return null;
			let show_times = broadCfgInfo.showTimes;
			let content = broadCfgInfo.content;// cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			let n_type = broadCfgInfo.noticeType;// cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			content = Global.FormatString(content, ...agrs);
			if (showFloatNotice) FloatNoticeUtils.showNoticeForTimes(content, show_times);

			//系统频道
			let chatData = new Pb_God.PBG2CTalkAck();
			chatData.channel = channel;
			chatData.data = content;
			chatData.playerdisplay = null;
			chatData["noticeType"] = n_type;

			return chatData;
		}

		/** 道具列表转换成显示字符串 */
		protected getItemListString(items: Pb_God.PBItemInfo[]): string
		{
			let strList: string[] = [];
			for (let item of items)
			{
				let itemName = cfg.ItemCfgData.getNameById(item.itemid);
				strList.push(itemName + "x" + item.itemcount);
			}
			return strList.join(Global.getLangStr("common_join"));
		}

		/** 道具列表转换成显示字符串 */
		protected getItemInfoListString(items: cfg.AddItemInfo[]): string
		{
			let strList: string[] = [];
			for (let item of items)
			{
				let itemName = cfg.ItemCfgData.getNameById(item.itemid);
				strList.push(itemName + "x" + item.itemcount);
			}
			return strList.join(Global.getLangStr("common_join"));
		}
	}
}
