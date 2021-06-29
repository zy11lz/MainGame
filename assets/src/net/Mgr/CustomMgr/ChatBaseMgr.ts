module Pro.Net
{

	/**
	 * 聊天链接类型
	 */
	export enum ChatLinkType
	{
		/** 玩家ID(param=userID*logicworldid) */
		UserID = 1,
		/** 伙伴SN(param=userID*petSN) */
		PetSN,
		/** 活动ID(param=activityID) */
		ActivityID,
		/** 道具属性(param=1|1;2|2;3|3*skillIDAry) */
		ItemInfo,
		/** 充值类型(param=chargeID) */
		ChargeID,
		/** 录像ID(param=战斗类型*记录ID) */
		FightRedio,
		/** 挑战(param=战斗类型*userID) */
		Challenge,
		/** 加入公会(param=unionID) */
		JoinUnion,
		/** 公会副本集结 */
		FactionBoss,
		/** 竞技场 */
		FightArea,
		/** 跨服竞技场 */
		CrossArea,
		/** 段位赛 */
		DuanWeiMatch,
		/** 月卡 */
		MonthCard,
		/** 自定义功能跳转（对应uiConfig->uiopen表） */
		UIOpen,
		/**分享展示 */
		Share,
		/**用户协议 */
		UserAgreement
	}

	/**
	 * 聊天管理器
	 */
	export class ChatBaseMgr
	{

		constructor()
		{
			Global.EventsNotifyControl(this.listensEvents(), false);
		}

		//-----------------------------管理自定义事件-----------------------------------
		/** 本类监听消息列表 */
		private listensEvents(): Array<any>
		{
			return [
				Cmd.S2C_Talk_Talk, this, this.S2C_Talk_Talk,
				Cmd.S2C_Talk_ChatRecall, this, this.reCallChatInfo,
				EventNotify.Friend_Delete, this, this.deletePrivateChatWithID,
				EventNotify.Friend_Blacklist_Add, this, this.onAddBlackList
			]
		}

		//----------------------------------------------------------------------------
		/** 全局聊天数据缓存 */
		private GlobalChatDIC = new Laya.Dictionary();

		/** 私人聊天数据缓存 */
		private PrivateChatDIC = new Laya.Dictionary();

		/** 私人聊天角色数据 */
		private PrivateChatList = new Array<Pb_God.PBPlayerDisplay>();

		/** 全局聊天数据未查看次数 */
		private GlobalChatCherkNumDIC = new Laya.Dictionary();

		/** 私人聊天数据缓存 */
		private PrivateChatCherkNumDIC = new Laya.Dictionary();

		/** 目前正查看的聊天类型 */
		private curChannel: number = 0;

		/** 目前正查看的聊天Uid */
		private curTargetUid: number = 0;

		/** 设置聊天记录上限 */
		public LimitShowNum = 50;

		/** 初始化 */
		public init()
		{
			this.GlobalChatDIC.clear();
			this.PrivateChatDIC.clear();
			this.PrivateChatList.splice(0, this.PrivateChatList.length);
			this.GlobalChatCherkNumDIC.clear();
			this.PrivateChatCherkNumDIC.clear();
		}

		/** 设置当前所在频道 */
		public setBoradChannel(channel: number, toUid: number)
		{
			this.curChannel = channel;
			this.curTargetUid = toUid;
			this.savaUnCherkWithChannel(this.curChannel, this.curTargetUid, 0);

			//红点更新
			EventMgr.trigger(EventNotify.RedDot_Chat_Changed);
		}

		/** 获取当前私聊角色列表 */
		public getPrivatePlayerList(): Array<Pb_God.PBPlayerDisplay>
		{
			return this.PrivateChatList;
		}

		/** 获取聊天数据列表 */
		public getDataWithChannel(channel: Pb_God._emBroadcast_Channel, playerInfo: Pb_God.PBPlayerDisplay): Pb_God.PBG2CTalkAck[]
		{

			if (channel == Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
			{
				if (playerInfo == null)
				{
					return [];
				}

				let chatList = this.PrivateChatDIC.get(playerInfo.playerid);
				if (chatList == null)
				{
					chatList = [];
					this.PrivateChatDIC.set(playerInfo.playerid, chatList);

					let tmpInIndex = -1;
					for (let i = 0; i < this.PrivateChatList.length; i++)
					{
						if (this.PrivateChatList[i].playerid == playerInfo.playerid)
						{
							tmpInIndex = i;
							break;
						}
					}
					if (tmpInIndex == -1)
					{
						this.PrivateChatList.push(playerInfo);
					}
				}
				return chatList;
			}
			else
			{
				let chatList = this.GlobalChatDIC.get(channel);
				if (chatList == null)
				{
					chatList = [];
					this.GlobalChatDIC.set(channel, chatList);
				}
				return chatList;
			}

		}

		/** 获取某个玩家的所有聊天信息 */
		public getPlayerAllChatList(playerId: number): Pb_God.PBG2CTalkAck[]
		{
			let ret = [];
			let keys = this.GlobalChatDIC.keys;
			for (var key of keys)
			{
				var chatList: Pb_God.PBG2CTalkAck[] = this.GlobalChatDIC.get(key);
				for (var el of chatList)
				{
					if (el.playerdisplay && el.playerdisplay.playerid == playerId) { ret.push(el); }
				}
			}

			let privateChatList = this.PrivateChatDIC.get(playerId);
			if (privateChatList) { ret = ret.concat(privateChatList); }

			return ret;
		}

		/** 删除私聊记录 */
		public deletePrivateChatWithID(playerID: number)
		{
			this.PrivateChatDIC.remove(playerID);
			for (let i = 0; i < this.PrivateChatList.length; i++)
			{
				if (this.PrivateChatList[i].playerid == playerID)
				{
					this.PrivateChatList.splice(i, 1);
					break;
				}
			}
			this.PrivateChatCherkNumDIC.remove(playerID);
			TalkSend.clearPlayerTalk(playerID);
		}

		/** 获取总的未查看私聊聊天条数 */
		public getUnCherkPlayerTotleNum(playerID: number): number
		{
			let chatNum = this.PrivateChatCherkNumDIC.get(playerID);
			if (chatNum == null)
			{
				chatNum = 0;
				this.PrivateChatCherkNumDIC.set(playerID, chatNum);
			}
			return chatNum;
		}

		/** 获取聊天未查看的条数 */
		public getUnCherkWithChannel(channel: Pb_God._emBroadcast_Channel): number
		{

			if (channel == Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
			{
				let tempTotle = 0;
				this.PrivateChatCherkNumDIC.values.forEach(element =>
				{
					tempTotle += element;
				});
				return tempTotle;
			}
			else
			{
				let chatNum = this.GlobalChatCherkNumDIC.get(channel);
				if (chatNum == null)
				{
					chatNum = 0;
					this.GlobalChatCherkNumDIC.set(channel, chatNum);
				}
				return chatNum;
			}
		}

		/** 获取总的未查看聊天条数 */
		public getUnCherkTotleNum(): number
		{
			let tempTotle = 0;
			this.GlobalChatCherkNumDIC.values.forEach(element =>
			{
				tempTotle += element;
			});
			this.PrivateChatCherkNumDIC.values.forEach(element =>
			{
				tempTotle += element;
			});
			return tempTotle;
		}

		/** 保存聊天未查看的条数 */
		private savaUnCherkWithChannel(channel: Pb_God._emBroadcast_Channel, playerID: number, chatNum: number)
		{
			if (channel == 0)
			{
				return;
			}
			if (channel == Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
			{
				this.PrivateChatCherkNumDIC.set(playerID, chatNum);
			}
			else
			{
				this.GlobalChatCherkNumDIC.set(channel, chatNum);
			}
		}

		private _lastSendTime = 0;
		/** 发送聊天数据，并即时保存自己的数据 */
		public sendChatInfo(channel: number, data: string, dataext: string, targetdisplay: Pb_God.PBPlayerDisplay, taraccountname: string, playerid: number, timeLimit: boolean = true): void
		{
			let time = getTimer();
			let stepTime = cfg.CommonChatCfgData.getStepSecondByChannel(channel) * 1000;
			if (timeLimit && this._lastSendTime + stepTime >= time)
			{
				TipsUtils.showTipsByLanId("chat_msg7");
				return;
			}
			this._lastSendTime = time;
			TalkSend.talk(channel, data, dataext, targetdisplay, taraccountname, playerid, null, null, null);
			//策划要求，自己发送的消息，立即显示
			let selfplayerdisplay = new Pb_God.PBPlayerDisplay();
			selfplayerdisplay.playerid = PlayerDataMgr.uid;
			selfplayerdisplay.head = ShapeDataMgr.iconId;
			selfplayerdisplay.headicon = ShapeDataMgr.iconFrameID;

			let chatData = new Pb_God.PBG2CTalkAck();
			chatData.channel = channel;
			chatData.data = data;
			chatData.dataext = dataext;
			chatData.targetdisplay = targetdisplay;
			chatData.playerdisplay = selfplayerdisplay;

			this.addChatInfo(chatData, false);
		}
		/**
		 * 撤回
		 */
		public reCallChatInfo(value: Pb_God.PBG2CRecall)
		{
			let chatList = this.GlobalChatDIC.get(value.channel);
			if (chatList)
			{
				for (let i = 0; i < chatList.length; i++)
				{
					let chatInfo = chatList[i] as Pb_God.PBG2CTalkAck;
					//因为自己发的消息是客户端自己维护的 撤回后自己还看得到 跟ws沟通后确定把自己发的信息都清掉
					if (chatInfo.order == value.order || (chatInfo.playerdisplay && chatInfo.playerdisplay.playerid == PlayerDataMgr.uid && value.senderid == chatInfo.playerdisplay.playerid))
					{
						chatList.splice(i, 1)
						i--
					}
				}
			}


			//撤回私聊
			let alls = this.PrivateChatDIC.values;
			for (let privateList of alls)
			{
				for (let i = 0; i < privateList.length; i++)
				{
					let chatInfo = privateList[i] as Pb_God.PBG2CTalkAck;
					//因为自己发的消息是客户端自己维护的 撤回后自己还看得到 跟ws沟通后确定把自己发的信息都清掉
					if (chatInfo.order == value.order || (chatInfo.playerdisplay && chatInfo.playerdisplay.playerid == PlayerDataMgr.uid && value.senderid == chatInfo.playerdisplay.playerid))
					{
						privateList.splice(i, 1)
						i--
					}
				}
			}
			EventMgr.trigger(EventNotify.Chat_Message_ReCall);
		}

		/** 添加一条聊天数据 */
		public addChatInfo(tempClass: Pb_God.PBG2CTalkAck, filterSelf: boolean): void
		{

			if (tempClass.playerdisplay)
			{
				//屏蔽自己的
				if (filterSelf && tempClass.playerdisplay.playerid == PlayerDataMgr.uid) { return; }
				//黑名单
				if (FriendDataMgr.isBlacklist(tempClass.playerdisplay.playerid)) { return; }
			}

			//添加到列表数据列表
			let tmpTargetInfo = tempClass.playerdisplay;
			if (tempClass.channel == Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
			{
				if (tmpTargetInfo.playerid == PlayerDataMgr.uid)
				{
					tmpTargetInfo = tempClass.targetdisplay;
				}
			}
			let tmpChatList = this.getDataWithChannel(tempClass.channel, tmpTargetInfo);
			if (tmpChatList.length + 1 >= this.LimitShowNum)
			{
				tmpChatList.pop();
			}
			tmpChatList.unshift(tempClass);


			//文字显示准备
			tempClass["viewMsg"] = this.convertMsgToHtmlStr(tempClass.data.length > 0 ? tempClass.data : tempClass.dataext);
			tempClass["viewName"] = tempClass.playerdisplay ? tempClass.playerdisplay.playername : tempClass.channel.toString();

			//跟新未读信息条数
			if (tempClass.channel != Pb_God._emBroadcast_Channel.BroadcastChannel_System)
			{
				if (tempClass.channel != this.curChannel || tempClass.channel == Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
				{
					let tmpCherkNum = 0;
					if (tempClass.channel != Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
					{
						tmpCherkNum = this.getUnCherkWithChannel(tempClass.channel) + 1;
					}
					else if (this.curTargetUid != tmpTargetInfo.playerid)
					{
						tmpCherkNum = this.getUnCherkPlayerTotleNum(tmpTargetInfo.playerid) + 1;
					}

					let player_id = tmpTargetInfo ? tmpTargetInfo.playerid : 0;
					this.savaUnCherkWithChannel(tempClass.channel, player_id, tmpCherkNum);
				}
			}

			//提示聊天数据更新
			EventMgr.trigger(EventNotify.Chat_Message_New, tempClass);

			if (tempClass && tempClass.channel == Pb_God._emBroadcast_Channel.BroadcastChannel_World && tempClass.dataext.length > 0 && tempClass.dataext.indexOf("href='15*") >= 0)
			{ EventMgr.trigger(EventNotify.Show_Hero_Call_Share_Pop, tempClass); }

			//红点更新
			EventMgr.trigger(EventNotify.RedDot_Chat_Changed);
		}
		//----------------------------------Event------------------------------------
		/** 聊天信息同步 */
		private S2C_Talk_Talk(tempClass: Pb_God.PBG2CTalkAck)
		{
			this.addChatInfo(tempClass, true);
		}

		/** 添加黑名单 */
		private onAddBlackList(value: Pb_God.PBPlayerFriendInfo): void
		{
			//删除此人的所有聊天记录
			let playerId = value.display.playerid;
			let keys = this.GlobalChatDIC.keys;
			for (var key of keys)
			{
				var chatList: Pb_God.PBG2CTalkAck[] = this.GlobalChatDIC.get(key);
				for (var i = chatList.length - 1; i >= 0; i--)
				{
					let chatData = chatList[i];
					if (chatData.playerdisplay && chatData.playerdisplay.playerid == playerId)
					{ chatList.splice(i, 1); }
				}
			}
		}

		//----------------------------------将聊天信息转换成htmlStr------------------------------------
		/** 填充一个聊天面板 */
		public addChatUI(tempClass: Pb_God.PBG2CTalkAck, chatParent: component.UIChat): View
		{
			// if(tempClass.channel == Pb_God._emBroadcast_Channel.BroadcastChannel_System){
			if (!tempClass.playerdisplay)
			{ //系统消息
				let tmpUI = Public.PoolMgr.getItem("ItemCommon") as ProUI.Chat.ItemCommonUI;
				if (tmpUI == null)
				{
					tmpUI = new ProUI.Chat.ItemCommonUI();
					tmpUI.name = "ItemCommon";
				}

				tmpUI.StatueImgFrame.frame = tempClass["noticeType"] || 1;
				tmpUI.htmlMsg.offAll(Laya.Event.LINK);
				chatParent.addUILink(tmpUI.htmlMsg, tempClass);


				let changeColorText = tempClass["viewMsg"];
				/** 系统消息和跑马灯走的同一配置 字体颜色和背景不搭 这里特殊处理更改指定颜色*/
				do
				{
					changeColorText = changeColorText.replace('#ffffff', '#5d565d');
					changeColorText = changeColorText.replace('#07ea07', '#209d0c');
					changeColorText = changeColorText.replace('#ff8e53', '#f16a3b');
					changeColorText = changeColorText.replace('#ffd800', '#ab43d1');
					changeColorText = changeColorText.replace('#00ffea', '#217cec');
				} while (changeColorText.indexOf('#ffffff') > -1 ||
				changeColorText.indexOf('#07ea07') > -1 ||
				changeColorText.indexOf('#ff8e53') > -1 ||
				changeColorText.indexOf('#ffd800') > -1 ||
					changeColorText.indexOf('#00ffea') > -1);

				tmpUI.htmlMsg.showText = tmpUI.htmlMsg.innerHTML = changeColorText//tempClass["viewMsg"];
				tmpUI.height = tmpUI.htmlMsg.contextHeight + 11;

				chatParent.addItem(tmpUI);

				return tmpUI;
			}
			else
			{
				let tmpUIName = tempClass.playerdisplay.playerid == PlayerDataMgr.uid ? "ItemRight" : "ItemLeft";
				let tmpUI = Public.PoolMgr.getItem(tmpUIName) as ProUI.Chat.ItemLeftUI;
				if (tmpUI == null)
				{
					tmpUI = new ProUI.Chat[tmpUIName + "UI"]();
					tmpUI.name = tmpUIName;
				}

				tmpUI.htmlMsg.offAll(Laya.Event.LINK);
				chatParent.addUILink(tmpUI.htmlMsg, tempClass);

				tmpUI.txtName.text = tempClass["viewName"];
				tmpUI.htmlMsg.showText = tmpUI.htmlMsg.innerHTML = tempClass["viewMsg"];
				if (tmpUIName == "ItemRight")
				{
					tmpUI.txtName.text = "";
					tmpUI.BGImg.y = tmpUI.htmlMsg.contextHeight > 99 ? 5 : 30
				}
				tmpUI.BGImg.height = tmpUI.htmlMsg.contextHeight + 20;
				tmpUI.height = Math.max(tmpUI.BGImg.height + 20, 85);
				tmpUI.BGImg.width = tmpUI.htmlMsg.contextWidth + 36;
				tmpUI.PlayerIcon.setPlayerDisplayInfo(tempClass.playerdisplay, false);

				chatParent.addItem(tmpUI);

				return tmpUI;
			}
		}

		/**
		 * 将聊天信息转换成htmlStr
		 */
		public convertMsgToHtmlStr(str: string): string
		{
			var tmpFaceregexp = /\[\d+\]/g;
			var tmpFaceAry = str.match(tmpFaceregexp);
			if (!tmpFaceAry)
			{
				return str;
			}
			var tmpStartIndex = 0;
			var tmpShowText = "";
			for (var i = 0; i < tmpFaceAry.length; i++)
			{
				//截取到表情标签前的普通文字
				var idx = str.indexOf(tmpFaceAry[i], tmpStartIndex);
				var str1 = str.substring(tmpStartIndex, idx);
				tmpShowText += str1; //=this.getNormalChatText(str1,textColor);
				tmpStartIndex = idx + tmpFaceAry[i].length;

				//截取到表情标签
				var fs = str.substring(idx, tmpStartIndex);
				tmpShowText += this.getFaceChat(fs);

				//截取表情标签末的普通文字
				if (i == tmpFaceAry.length - 1)
				{
					var str2 = str.substring(tmpStartIndex, str.length);
					//text+=this.getNormalChatText(str2,textColor);
					tmpShowText += str2;
				}
			}
			return tmpShowText;
		}

		/** 将普通文本转换成Html String */
		public getNormalChatText(str: string, color: string = "#e3dac4"): string
		{
			if (str.length < 1)
			{
				return "";
			}
			return "<span color='" + color + "'>" + str + "</span>";
		}

		/** 添加一个link文本 */
		public getLinkChatText(linkMsg: string, linkData: string, color: string = "#109af2"): string
		{
			return "<span href='" + linkData + "' style='color:" + color + "'>" + linkMsg + "</span>";
		}

		/** 将普通文本转换成Html img */
		private getFaceChat(str: string): string
		{
			var index = Number(str.substring(1, str.length - 1));
			if (index > 0 && index < 46)
			{
				var txt = "res/Unpack/face/face_" + index + ".png";
				return "<img src='" + txt + "'></img>";
			}
			else
			{
				return str;
			}
		}
	}
}