var cfg;(function (cfg) {

class BroadCastTimeMsgBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "desc");
		};
		 /**  说明 */
		 static getDescByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  索引ID */
		 static getIDByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  时间点 */
		 static getBeginTimeByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.beginTime;
			}
			return ""
		}
		 /**  显示聊天频道频道 */
		 static getChanelByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chanel;
			}
			return 0;
		}
		 /**  公告类型 */
		 static getNoticeTypeByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeType;
			}
			return 0;
		}
		 /**  内容(按照{0}{1}拼写) */
		 static getContentByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.BroadCastTimeMsgBaseCfgData = BroadCastTimeMsgBaseCfgData

class BroadCastCastMsgBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  广播id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  类型 */
		 static getNoticeTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeType;
			}
			return 0;
		}
		 /**  频道 */
		 static getChannelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.channel;
			}
			return 0;
		}
		 /**  公告显示位置 */
		 static getNoticeShowPosByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeShowPos;
			}
			return 0;
		}
		 /**  滚动次数 */
		 static getShowTimesByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showTimes;
			}
			return 0;
		}
		 /**  说明 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  内容 */
		 static getContentByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.BroadCastCastMsgBaseCfgData = BroadCastCastMsgBaseCfgData

class BroadCastCastMsgBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  广播id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  类型 */
		 static getNoticeTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeType;
			}
			return 0;
		}
		 /**  频道 */
		 static getChannelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.channel;
			}
			return 0;
		}
		 /**  公告显示位置 */
		 static getNoticeShowPosByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeShowPos;
			}
			return 0;
		}
		 /**  滚动次数 */
		 static getShowTimesByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showTimes;
			}
			return 0;
		}
		 /**  说明 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  内容 */
		 static getContentByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.BroadCastCastMsgBaseCfgData = BroadCastCastMsgBaseCfgData

class BroadCastTimeMsgBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "desc");
		};
		 /**  说明 */
		 static getDescByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  索引ID */
		 static getIDByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  时间点 */
		 static getBeginTimeByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.beginTime;
			}
			return ""
		}
		 /**  显示聊天频道频道 */
		 static getChanelByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chanel;
			}
			return 0;
		}
		 /**  公告类型 */
		 static getNoticeTypeByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeType;
			}
			return 0;
		}
		 /**  内容(按照{0}{1}拼写) */
		 static getContentByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.BroadCastTimeMsgBaseCfgData = BroadCastTimeMsgBaseCfgData

class BroadCastTimeMsgBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "desc");
		};
		 /**  说明 */
		 static getDescByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  索引ID */
		 static getIDByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  时间点 */
		 static getBeginTimeByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.beginTime;
			}
			return ""
		}
		 /**  显示聊天频道频道 */
		 static getChanelByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chanel;
			}
			return 0;
		}
		 /**  公告类型 */
		 static getNoticeTypeByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeType;
			}
			return 0;
		}
		 /**  内容(按照{0}{1}拼写) */
		 static getContentByDesc(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.BroadCastTimeMsgBaseCfgData = BroadCastTimeMsgBaseCfgData

class BroadCastCastMsgBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  广播id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  类型 */
		 static getNoticeTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeType;
			}
			return 0;
		}
		 /**  频道 */
		 static getChannelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.channel;
			}
			return 0;
		}
		 /**  公告显示位置 */
		 static getNoticeShowPosByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeShowPos;
			}
			return 0;
		}
		 /**  滚动次数 */
		 static getShowTimesByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showTimes;
			}
			return 0;
		}
		 /**  说明 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  内容 */
		 static getContentByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.BroadCastCastMsgBaseCfgData = BroadCastCastMsgBaseCfgData

class ErrorCodeErrorCodeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  序号 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  主协议号 */
		 static getMainProtocolById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainProtocol;
			}
			return 0;
		}
		 /**  返回码 */
		 static getEventFlagById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.eventFlag;
			}
			return 0;
		}
		 /**  程序解释 */
		 static getErrorById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.error;
			}
			return ""
		}

}
	
cfg.ErrorCodeErrorCodeBaseCfgData = ErrorCodeErrorCodeBaseCfgData

class ErrorCodeErrorCodeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  序号 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  主协议号 */
		 static getMainProtocolById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainProtocol;
			}
			return 0;
		}
		 /**  返回码 */
		 static getEventFlagById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.eventFlag;
			}
			return 0;
		}
		 /**  程序解释 */
		 static getErrorById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.error;
			}
			return ""
		}

}
	
cfg.ErrorCodeErrorCodeBaseCfgData = ErrorCodeErrorCodeBaseCfgData

class ErrorCodeErrorCodeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  序号 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  主协议号 */
		 static getMainProtocolById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainProtocol;
			}
			return 0;
		}
		 /**  返回码 */
		 static getEventFlagById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.eventFlag;
			}
			return 0;
		}
		 /**  程序解释 */
		 static getErrorById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.error;
			}
			return ""
		}

}
	
cfg.ErrorCodeErrorCodeBaseCfgData = ErrorCodeErrorCodeBaseCfgData

class GmBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  命令功能 */
		 static getDesById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.des;
			}
			return ""
		}
		 /**  命令 */
		 static getCodeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.code;
			}
			return ""
		}
		 /**  参数1 */
		 static getValue1ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value1;
			}
			return ""
		}
		 /**  参数2 */
		 static getValue2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value2;
			}
			return ""
		}

}
	
cfg.GmBaseCfgData = GmBaseCfgData

class GmBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  命令功能 */
		 static getDesById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.des;
			}
			return ""
		}
		 /**  命令 */
		 static getCodeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.code;
			}
			return ""
		}
		 /**  参数1 */
		 static getValue1ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value1;
			}
			return ""
		}
		 /**  参数2 */
		 static getValue2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value2;
			}
			return ""
		}

}
	
cfg.GmBaseCfgData = GmBaseCfgData

class GmBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  命令功能 */
		 static getDesById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.des;
			}
			return ""
		}
		 /**  命令 */
		 static getCodeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.code;
			}
			return ""
		}
		 /**  参数1 */
		 static getValue1ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value1;
			}
			return ""
		}
		 /**  参数2 */
		 static getValue2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value2;
			}
			return ""
		}

}
	
cfg.GmBaseCfgData = GmBaseCfgData

class HelpSpriteBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  id索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  1 终生提示一次；   2 单次登陆提示一次；   3 单日提示一次；   4 循环提示（每次随机都参与）；   5 条件触发（触发就提示）；    */
		 static getNoticeTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeType;
			}
			return 0;
		}
		 /**  小人动作 */
		 static getRoleActionById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.roleAction;
			}
			return ""
		}
		 /**  气泡文本 */
		 static getNoticTxtById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticTxt;
			}
			return ""
		}
		 /**  语音 */
		 static getSoundById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sound;
			}
			return ""
		}
		 /**  点击小人之后执行什么操作1.打开某个ui */
		 static getActionTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.actionType;
			}
			return ""
		}
		 /**  点击之后执行动作的参数actionType为1的配置uiconfig里uiopen的id */
		 static getActionParmById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.actionParm;
			}
			return ""
		}
		 /**  开启条件类型1 玩家等级≥参数；   2 玩家累积充值额度≥参数；   3 玩家当日充值额度≥参数；   4 玩家主线关卡进度≥参数；   5 玩家钻石数量≥参数；   6 免费抽卡次数≥参数7 公会副本次数≥参数8 背包中有指定道具指定数量≥参数   9 服务器时间   （时间戳）≥参数10 特定充值的当前剩余次数（取charge表）   ≥参数------配置为触发类型时--------1 等级大于 参数1 每参数2等级触发2  关卡进度大于 参数1 每 参数2 关卡触发 */
		 static getOpenTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openType;
			}
			return 0;
		}
		 /**  开启条件参数 */
		 static getOpenParmById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openParm;
			}
			return 0;
		}
		 /**  开启条件补充参数 */
		 static getOpenExtById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openExt;
			}
			return ""
		}
		 /**  关闭条件类型1 玩家等级≥参数；   2 玩家累积充值额度≥参数；   3 玩家当日充值额度≥参数；   4 玩家主线关卡进度≥参数；   5 玩家钻石数量<参数；   6 免费抽卡次数<参数  7 公会副本次数<参数8 背包中有指定道具指定数量<参数9 服务器时间     （时间戳<参数10 特定充值的当前剩余次数（取charge表）   <参数 */
		 static getCloseTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.closeType;
			}
			return 0;
		}
		 /**  关闭条件参数 */
		 static getCloseParmById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.closeParm;
			}
			return 0;
		}
		 /**  关闭条件补充参数 */
		 static getCloseExtById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.closeExt;
			}
			return ""
		}

}
	
cfg.HelpSpriteBaseCfgData = HelpSpriteBaseCfgData

class HelpSpriteBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  id索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  1 终生提示一次；   2 单次登陆提示一次；   3 单日提示一次；   4 循环提示（每次随机都参与）；   5 条件触发（触发就提示）；    */
		 static getNoticeTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeType;
			}
			return 0;
		}
		 /**  小人动作 */
		 static getRoleActionById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.roleAction;
			}
			return ""
		}
		 /**  气泡文本 */
		 static getNoticTxtById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticTxt;
			}
			return ""
		}
		 /**  语音 */
		 static getSoundById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sound;
			}
			return ""
		}
		 /**  点击小人之后执行什么操作1.打开某个ui */
		 static getActionTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.actionType;
			}
			return ""
		}
		 /**  点击之后执行动作的参数actionType为1的配置uiconfig里uiopen的id */
		 static getActionParmById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.actionParm;
			}
			return ""
		}
		 /**  开启条件类型1 玩家等级≥参数；   2 玩家累积充值额度≥参数；   3 玩家当日充值额度≥参数；   4 玩家主线关卡进度≥参数；   5 玩家钻石数量≥参数；   6 免费抽卡次数≥参数7 公会副本次数≥参数8 背包中有指定道具指定数量≥参数   9 服务器时间   （时间戳）≥参数10 特定充值的当前剩余次数（取charge表）   ≥参数------配置为触发类型时--------1 等级大于 参数1 每参数2等级触发2  关卡进度大于 参数1 每 参数2 关卡触发 */
		 static getOpenTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openType;
			}
			return 0;
		}
		 /**  开启条件参数 */
		 static getOpenParmById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openParm;
			}
			return 0;
		}
		 /**  开启条件补充参数 */
		 static getOpenExtById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openExt;
			}
			return ""
		}
		 /**  关闭条件类型1 玩家等级≥参数；   2 玩家累积充值额度≥参数；   3 玩家当日充值额度≥参数；   4 玩家主线关卡进度≥参数；   5 玩家钻石数量<参数；   6 免费抽卡次数<参数  7 公会副本次数<参数8 背包中有指定道具指定数量<参数9 服务器时间     （时间戳<参数10 特定充值的当前剩余次数（取charge表）   <参数 */
		 static getCloseTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.closeType;
			}
			return 0;
		}
		 /**  关闭条件参数 */
		 static getCloseParmById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.closeParm;
			}
			return 0;
		}
		 /**  关闭条件补充参数 */
		 static getCloseExtById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.closeExt;
			}
			return ""
		}

}
	
cfg.HelpSpriteBaseCfgData = HelpSpriteBaseCfgData

class HelpSpriteBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  id索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  1 终生提示一次；   2 单次登陆提示一次；   3 单日提示一次；   4 循环提示（每次随机都参与）；   5 条件触发（触发就提示）；    */
		 static getNoticeTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticeType;
			}
			return 0;
		}
		 /**  小人动作 */
		 static getRoleActionById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.roleAction;
			}
			return ""
		}
		 /**  气泡文本 */
		 static getNoticTxtById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.noticTxt;
			}
			return ""
		}
		 /**  语音 */
		 static getSoundById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sound;
			}
			return ""
		}
		 /**  点击小人之后执行什么操作1.打开某个ui */
		 static getActionTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.actionType;
			}
			return ""
		}
		 /**  点击之后执行动作的参数actionType为1的配置uiconfig里uiopen的id */
		 static getActionParmById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.actionParm;
			}
			return ""
		}
		 /**  开启条件类型1 玩家等级≥参数；   2 玩家累积充值额度≥参数；   3 玩家当日充值额度≥参数；   4 玩家主线关卡进度≥参数；   5 玩家钻石数量≥参数；   6 免费抽卡次数≥参数7 公会副本次数≥参数8 背包中有指定道具指定数量≥参数   9 服务器时间   （时间戳）≥参数10 特定充值的当前剩余次数（取charge表）   ≥参数------配置为触发类型时--------1 等级大于 参数1 每参数2等级触发2  关卡进度大于 参数1 每 参数2 关卡触发 */
		 static getOpenTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openType;
			}
			return 0;
		}
		 /**  开启条件参数 */
		 static getOpenParmById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openParm;
			}
			return 0;
		}
		 /**  开启条件补充参数 */
		 static getOpenExtById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openExt;
			}
			return ""
		}
		 /**  关闭条件类型1 玩家等级≥参数；   2 玩家累积充值额度≥参数；   3 玩家当日充值额度≥参数；   4 玩家主线关卡进度≥参数；   5 玩家钻石数量<参数；   6 免费抽卡次数<参数  7 公会副本次数<参数8 背包中有指定道具指定数量<参数9 服务器时间     （时间戳<参数10 特定充值的当前剩余次数（取charge表）   <参数 */
		 static getCloseTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.closeType;
			}
			return 0;
		}
		 /**  关闭条件参数 */
		 static getCloseParmById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.closeParm;
			}
			return 0;
		}
		 /**  关闭条件补充参数 */
		 static getCloseExtById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.closeExt;
			}
			return ""
		}

}
	
cfg.HelpSpriteBaseCfgData = HelpSpriteBaseCfgData

class LoginWindowsLoginWindowsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  跳转链接 */
		 static getJumpLinkByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jumpLink;
			}
			return ""
		}
		 /**  背景图片 */
		 static getBackgroundPicByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.backgroundPic;
			}
			return ""
		}
		 /**  按钮图片 */
		 static getButtonPicByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buttonPic;
			}
			return ""
		}
		 /**  推送顺序 */
		 static getPushOrderByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushOrder;
			}
			return 0;
		}
		 /**  推送渠道 */
		 static getPushChannelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushChannel;
			}
			return ""
		}
		 /**  推送等级 */
		 static getPushLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushLevel;
			}
			return 0;
		}
		 /**  推送时间类型 */
		 static getPushTimeTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushTimeType;
			}
			return 0;
		}
		 /**  弹出类型 */
		 static getPopupTybeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.popupTybe;
			}
			return 0;
		}
		 /**  推送时间 */
		 static getPushTimeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushTime;
			}
			return ""
		}
		 /**  推送开关 */
		 static getPushSwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushSwitch;
			}
			return 0;
		}

}
	
cfg.LoginWindowsLoginWindowsBaseCfgData = LoginWindowsLoginWindowsBaseCfgData

class LoginWindowsLoginWindowsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  跳转链接 */
		 static getJumpLinkByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jumpLink;
			}
			return ""
		}
		 /**  背景图片 */
		 static getBackgroundPicByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.backgroundPic;
			}
			return ""
		}
		 /**  按钮图片 */
		 static getButtonPicByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buttonPic;
			}
			return ""
		}
		 /**  推送顺序 */
		 static getPushOrderByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushOrder;
			}
			return 0;
		}
		 /**  推送渠道 */
		 static getPushChannelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushChannel;
			}
			return ""
		}
		 /**  推送等级 */
		 static getPushLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushLevel;
			}
			return 0;
		}
		 /**  推送时间类型 */
		 static getPushTimeTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushTimeType;
			}
			return 0;
		}
		 /**  弹出类型 */
		 static getPopupTybeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.popupTybe;
			}
			return 0;
		}
		 /**  推送时间 */
		 static getPushTimeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushTime;
			}
			return ""
		}
		 /**  推送开关 */
		 static getPushSwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushSwitch;
			}
			return 0;
		}

}
	
cfg.LoginWindowsLoginWindowsBaseCfgData = LoginWindowsLoginWindowsBaseCfgData

class LoginWindowsLoginWindowsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  跳转链接 */
		 static getJumpLinkByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jumpLink;
			}
			return ""
		}
		 /**  背景图片 */
		 static getBackgroundPicByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.backgroundPic;
			}
			return ""
		}
		 /**  按钮图片 */
		 static getButtonPicByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buttonPic;
			}
			return ""
		}
		 /**  推送顺序 */
		 static getPushOrderByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushOrder;
			}
			return 0;
		}
		 /**  推送渠道 */
		 static getPushChannelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushChannel;
			}
			return ""
		}
		 /**  推送等级 */
		 static getPushLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushLevel;
			}
			return 0;
		}
		 /**  推送时间类型 */
		 static getPushTimeTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushTimeType;
			}
			return 0;
		}
		 /**  弹出类型 */
		 static getPopupTybeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.popupTybe;
			}
			return 0;
		}
		 /**  推送时间 */
		 static getPushTimeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushTime;
			}
			return ""
		}
		 /**  推送开关 */
		 static getPushSwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushSwitch;
			}
			return 0;
		}

}
	
cfg.LoginWindowsLoginWindowsBaseCfgData = LoginWindowsLoginWindowsBaseCfgData

class QuestionBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  问卷ID */
		 static getQuestionnaireIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.questionnaireID;
			}
			return 0;
		}
		 /**  题型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  题目 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  选择题选项（|分隔） */
		 static getChoiceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.choice;
			}
			return ""
		}

}
	
cfg.QuestionBaseCfgData = QuestionBaseCfgData

class QuestionBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  问卷ID */
		 static getQuestionnaireIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.questionnaireID;
			}
			return 0;
		}
		 /**  题型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  题目 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  选择题选项（|分隔） */
		 static getChoiceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.choice;
			}
			return ""
		}

}
	
cfg.QuestionBaseCfgData = QuestionBaseCfgData

class QuestionBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  问卷ID */
		 static getQuestionnaireIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.questionnaireID;
			}
			return 0;
		}
		 /**  题型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  题目 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  选择题选项（|分隔） */
		 static getChoiceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.choice;
			}
			return ""
		}

}
	
cfg.QuestionBaseCfgData = QuestionBaseCfgData

class UiRoleSayBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "uiType");
		};
		 /**  ui面板类型1：背包2：祭献3:召唤4:先知圣殿5:精灵商店 */
		 static getUiTypeByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uiType;
			}
			return 0;
		}
		 /**  间隔时间（毫秒） */
		 static getGapTimeByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.gapTime;
			}
			return 0;
		}
		 /**  显示时间（毫秒） */
		 static getShowTimeByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showTime;
			}
			return 0;
		}
		 /**  说话随机列表 |  竖线分割 */
		 static getSayTxtByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sayTxt;
			}
			return ""
		}
		 /**  玩成事件触发文字 */
		 static getEventSayByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.event_say;
			}
			return ""
		}

}
	
cfg.UiRoleSayBaseCfgData = UiRoleSayBaseCfgData

class UiRoleSayBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "uiType");
		};
		 /**  ui面板类型1：背包2：祭献3:召唤4:先知圣殿5:精灵商店 */
		 static getUiTypeByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uiType;
			}
			return 0;
		}
		 /**  间隔时间（毫秒） */
		 static getGapTimeByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.gapTime;
			}
			return 0;
		}
		 /**  显示时间（毫秒） */
		 static getShowTimeByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showTime;
			}
			return 0;
		}
		 /**  说话随机列表 |  竖线分割 */
		 static getSayTxtByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sayTxt;
			}
			return ""
		}
		 /**  玩成事件触发文字 */
		 static getEventSayByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.event_say;
			}
			return ""
		}

}
	
cfg.UiRoleSayBaseCfgData = UiRoleSayBaseCfgData

class UiRoleSayBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "uiType");
		};
		 /**  ui面板类型1：背包2：祭献3:召唤4:先知圣殿5:精灵商店 */
		 static getUiTypeByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uiType;
			}
			return 0;
		}
		 /**  间隔时间（毫秒） */
		 static getGapTimeByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.gapTime;
			}
			return 0;
		}
		 /**  显示时间（毫秒） */
		 static getShowTimeByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showTime;
			}
			return 0;
		}
		 /**  说话随机列表 |  竖线分割 */
		 static getSayTxtByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sayTxt;
			}
			return ""
		}
		 /**  玩成事件触发文字 */
		 static getEventSayByUiType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.event_say;
			}
			return ""
		}

}
	
cfg.UiRoleSayBaseCfgData = UiRoleSayBaseCfgData

class AchieveConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "warOrderDuration");
		};
		 /**  战令持续时间 */
		 static getWarOrderDurationByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.warOrderDuration;
			}
			return 0;
		}
		 /**  战令开始时间 */
		 static getWarOrderOpenDayByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.warOrderOpenDay;
			}
			return 0;
		}
		 /**  战令周任务天数 */
		 static getWarOrderWeekDaysByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.warOrderWeekDays;
			}
			return ""
		}
		 /**  进阶奖励预览 */
		 static getAdvPrizePreviewByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advPrizePreview;
			}
			return ""
		}

}
	
cfg.AchieveConstBaseCfgData = AchieveConstBaseCfgData

class AchieveActivityLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveActivityLivenessBaseCfgData = AchieveActivityLivenessBaseCfgData

class AchieveTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "achieveType");
		};
		 /**  成就类型 */
		 static getAchieveTypeByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  是否累加值 */
		 static getIsAddByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isAdd;
			}
			return 0;
		}
		 /**  UIOpen表对应ID */
		 static getUIOpenIDByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uIOpenID;
			}
			return 0;
		}

}
	
cfg.AchieveTypeBaseCfgData = AchieveTypeBaseCfgData

class AchieveLivenessPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要活跃度 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveLivenessPrizeBaseCfgData = AchieveLivenessPrizeBaseCfgData

class AchieveRoadBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveRoadBaseCfgData = AchieveRoadBaseCfgData

class AchieveActivityLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveActivityLivenessBaseCfgData = AchieveActivityLivenessBaseCfgData

class AchieveTrainBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  历练类型_emAchieveTrainType1;//竞技历练2;//战斗历练3;//特殊历练 */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveTrainBaseCfgData = AchieveTrainBaseCfgData

class AchieveWarOrderBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  类型_emWarOrderType */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  进度描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveWarOrderBaseCfgData = AchieveWarOrderBaseCfgData

class AchieveWeekLivenessPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要活跃度 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveWeekLivenessPrizeBaseCfgData = AchieveWeekLivenessPrizeBaseCfgData

class AchieveWeekLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveWeekLivenessBaseCfgData = AchieveWeekLivenessBaseCfgData

class AchieveActivityLivenessPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要活跃度 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveActivityLivenessPrizeBaseCfgData = AchieveActivityLivenessPrizeBaseCfgData

class AchieveFactionLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  重置类型 */
		 static getAchiveResetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achiveResetType;
			}
			return 0;
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  增加活跃度 */
		 static getAddLivenessByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addLiveness;
			}
			return 0;
		}

}
	
cfg.AchieveFactionLivenessBaseCfgData = AchieveFactionLivenessBaseCfgData

class AchieveLivenessPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要活跃度 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveLivenessPrizeBaseCfgData = AchieveLivenessPrizeBaseCfgData

class AchieveWeekLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveWeekLivenessBaseCfgData = AchieveWeekLivenessBaseCfgData

class AchieveRoadBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveRoadBaseCfgData = AchieveRoadBaseCfgData

class AchieveConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "warOrderDuration");
		};
		 /**  战令持续时间 */
		 static getWarOrderDurationByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.warOrderDuration;
			}
			return 0;
		}
		 /**  战令开始时间 */
		 static getWarOrderOpenDayByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.warOrderOpenDay;
			}
			return 0;
		}
		 /**  战令周任务天数 */
		 static getWarOrderWeekDaysByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.warOrderWeekDays;
			}
			return ""
		}
		 /**  进阶奖励预览 */
		 static getAdvPrizePreviewByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advPrizePreview;
			}
			return ""
		}

}
	
cfg.AchieveConstBaseCfgData = AchieveConstBaseCfgData

class AchieveRoadBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveRoadBaseCfgData = AchieveRoadBaseCfgData

class AchieveTrainBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  历练类型_emAchieveTrainType1;//竞技历练2;//战斗历练3;//特殊历练 */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveTrainBaseCfgData = AchieveTrainBaseCfgData

class AchieveActivityLivenessPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要活跃度 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveActivityLivenessPrizeBaseCfgData = AchieveActivityLivenessPrizeBaseCfgData

class AchieveWarOrderPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  到下一级的经验 */
		 static getExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  进阶奖励 */
		 static getAdvAddItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advAddItem;
			}
			return ""
		}

}
	
cfg.AchieveWarOrderPrizeBaseCfgData = AchieveWarOrderPrizeBaseCfgData

class AchieveWarOrderBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  类型_emWarOrderType */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  进度描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveWarOrderBaseCfgData = AchieveWarOrderBaseCfgData

class AchieveWeekLivenessPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要活跃度 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveWeekLivenessPrizeBaseCfgData = AchieveWeekLivenessPrizeBaseCfgData

class AchieveWeekLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveWeekLivenessBaseCfgData = AchieveWeekLivenessBaseCfgData

class AchieveActivityLivenessPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要活跃度 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveActivityLivenessPrizeBaseCfgData = AchieveActivityLivenessPrizeBaseCfgData

class AchieveActivityLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveActivityLivenessBaseCfgData = AchieveActivityLivenessBaseCfgData

class AchieveTrainBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  历练类型_emAchieveTrainType1;//竞技历练2;//战斗历练3;//特殊历练 */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveTrainBaseCfgData = AchieveTrainBaseCfgData

class AchieveConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "warOrderDuration");
		};
		 /**  战令持续时间 */
		 static getWarOrderDurationByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.warOrderDuration;
			}
			return 0;
		}
		 /**  战令开始时间 */
		 static getWarOrderOpenDayByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.warOrderOpenDay;
			}
			return 0;
		}
		 /**  战令周任务天数 */
		 static getWarOrderWeekDaysByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.warOrderWeekDays;
			}
			return ""
		}
		 /**  进阶奖励预览 */
		 static getAdvPrizePreviewByWarOrderDuration(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advPrizePreview;
			}
			return ""
		}

}
	
cfg.AchieveConstBaseCfgData = AchieveConstBaseCfgData

class AchieveWarOrderPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  到下一级的经验 */
		 static getExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  进阶奖励 */
		 static getAdvAddItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advAddItem;
			}
			return ""
		}

}
	
cfg.AchieveWarOrderPrizeBaseCfgData = AchieveWarOrderPrizeBaseCfgData

class AchieveWarOrderBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  类型_emWarOrderType */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  进度描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveWarOrderBaseCfgData = AchieveWarOrderBaseCfgData

class AchieveWeekLivenessPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要活跃度 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveWeekLivenessPrizeBaseCfgData = AchieveWeekLivenessPrizeBaseCfgData

class AchieveMainAchieveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  成就大类型1; //主线成就2; //每日活跃3; //公会成就4; //图腾成就 */
		 static getAchieveBigTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveBigType;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  等级 */
		 static getLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  后置成就ID */
		 static getNextIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.nextID;
			}
			return 0;
		}
		 /**  分组起始ID */
		 static getGroupFirstIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupFirstId;
			}
			return 0;
		}

}
	
cfg.AchieveMainAchieveBaseCfgData = AchieveMainAchieveBaseCfgData

class AchieveTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "achieveType");
		};
		 /**  成就类型 */
		 static getAchieveTypeByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  是否累加值 */
		 static getIsAddByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isAdd;
			}
			return 0;
		}
		 /**  UIOpen表对应ID */
		 static getUIOpenIDByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uIOpenID;
			}
			return 0;
		}

}
	
cfg.AchieveTypeBaseCfgData = AchieveTypeBaseCfgData

class AchieveLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveLivenessBaseCfgData = AchieveLivenessBaseCfgData

class AchieveMainAchieveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  成就大类型1; //主线成就2; //每日活跃3; //公会成就4; //图腾成就 */
		 static getAchieveBigTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveBigType;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  等级 */
		 static getLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  后置成就ID */
		 static getNextIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.nextID;
			}
			return 0;
		}
		 /**  分组起始ID */
		 static getGroupFirstIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupFirstId;
			}
			return 0;
		}

}
	
cfg.AchieveMainAchieveBaseCfgData = AchieveMainAchieveBaseCfgData

class AchieveWarOrderPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  到下一级的经验 */
		 static getExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  进阶奖励 */
		 static getAdvAddItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advAddItem;
			}
			return ""
		}

}
	
cfg.AchieveWarOrderPrizeBaseCfgData = AchieveWarOrderPrizeBaseCfgData

class AchieveTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "achieveType");
		};
		 /**  成就类型 */
		 static getAchieveTypeByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  是否累加值 */
		 static getIsAddByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isAdd;
			}
			return 0;
		}
		 /**  UIOpen表对应ID */
		 static getUIOpenIDByAchieveType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uIOpenID;
			}
			return 0;
		}

}
	
cfg.AchieveTypeBaseCfgData = AchieveTypeBaseCfgData

class AchieveFactionLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  重置类型 */
		 static getAchiveResetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achiveResetType;
			}
			return 0;
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  增加活跃度 */
		 static getAddLivenessByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addLiveness;
			}
			return 0;
		}

}
	
cfg.AchieveFactionLivenessBaseCfgData = AchieveFactionLivenessBaseCfgData

class AchieveLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveLivenessBaseCfgData = AchieveLivenessBaseCfgData

class AchieveFactionLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  重置类型 */
		 static getAchiveResetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achiveResetType;
			}
			return 0;
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  增加活跃度 */
		 static getAddLivenessByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addLiveness;
			}
			return 0;
		}

}
	
cfg.AchieveFactionLivenessBaseCfgData = AchieveFactionLivenessBaseCfgData

class AchieveLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveLivenessBaseCfgData = AchieveLivenessBaseCfgData

class AchieveLivenessPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要活跃度 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.AchieveLivenessPrizeBaseCfgData = AchieveLivenessPrizeBaseCfgData

class AchieveMainAchieveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  成就ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  成就大类型1; //主线成就2; //每日活跃3; //公会成就4; //图腾成就 */
		 static getAchieveBigTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveBigType;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  等级 */
		 static getLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  成就类型 */
		 static getAchieveTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  后置成就ID */
		 static getNextIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.nextID;
			}
			return 0;
		}
		 /**  分组起始ID */
		 static getGroupFirstIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupFirstId;
			}
			return 0;
		}

}
	
cfg.AchieveMainAchieveBaseCfgData = AchieveMainAchieveBaseCfgData

class ActivityExchangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  特殊道具需求 */
		 static getNeedAmountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAmount;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  限购数量 */
		 static getLimitNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitNum;
			}
			return 0;
		}
		 /**  是否显示超值 */
		 static getShowBargainByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showBargain;
			}
			return 0;
		}
		 /**  消耗道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  消耗精灵 */
		 static getNeedPetByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPet;
			}
			return ""
		}

}
	
cfg.ActivityExchangeBaseCfgData = ActivityExchangeBaseCfgData

class ActivityShortTermGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  商品ID */
		 static getProductIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.productID;
			}
			return 0;
		}
		 /**  触发类型 */
		 static getTriggerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.trigger;
			}
			return 0;
		}
		 /**  触发参数 */
		 static getParamsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.params;
			}
			return ""
		}
		 /**  持续时间(分钟) */
		 static getDurationByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.duration;
			}
			return 0;
		}
		 /**  页签按钮文字 */
		 static getTabNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tabName;
			}
			return ""
		}
		 /**  显示返利比例 */
		 static getRebateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebate;
			}
			return 0;
		}
		 /**  描述文字 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ActivityShortTermGiftBaseCfgData = ActivityShortTermGiftBaseCfgData

class ActivityCommonGroupPageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "indexID");
		};
		 /**  索引ID唯一索引 */
		 static getIndexIDByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.indexID;
			}
			return 0;
		}
		 /**  界面组ID填写common_group中的分组ID */
		 static getGroupIDByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}
		 /**  子类型1://限购礼包类型2://充值返利类型3://连冲活动类型4：//心愿抽卡5：//成就之路6：//胡帕抽卡7：//进化抽卡8：//小游戏兑换9：//兑换商店10：//定制礼包11://专属英雄12://兑换（多兑一）13：//限时挑战（活动boss） */
		 static getTypeByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  关联的活动列表 */
		 static getActivityIdsByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityIds;
			}
			return ""
		}
		 /**  切页图标 */
		 static getPageIconByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pageIcon;
			}
			return ""
		}
		 /**  切页名称填写切页名称 */
		 static getPageNameByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pageName;
			}
			return ""
		}
		 /**  banner图填写banner图名称，不配不显示 */
		 static getBannerByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.banner;
			}
			return ""
		}
		 /**  banner上的文字提示 */
		 static getBannerTipsByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bannerTips;
			}
			return ""
		}
		 /**  帮助描述信息帮助信息文本，不配不显示 */
		 static getHelpTipsByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.helpTips;
			}
			return ""
		}

}
	
cfg.ActivityCommonGroupPageBaseCfgData = ActivityCommonGroupPageBaseCfgData

class ActivityCommonGroupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "groupID");
		};
		 /**  界面组ID */
		 static getGroupIDByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}
		 /**  界面位置类型1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标4：//顶部第三排图标5：//顶部展开气泡图标6：//小游戏气泡图标大于6时，主界面不显示7:6.1活动组8：端午活动组 */
		 static getMainPositionTypeByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainPositionType;
			}
			return 0;
		}
		 /**  是否在挂机界面显示 */
		 static getHookShowByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hookShow;
			}
			return 0;
		}
		 /**  主界面图标配置图标位置和名称 */
		 static getMainIconByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainIcon;
			}
			return ""
		}
		 /**  特效类型ui_timeLimitActBtn  //一键牛逼特效circle //转圈特效 */
		 static getMainEffByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainEff;
			}
			return ""
		}
		 /**  是否是合服活动 */
		 static getIsMergeByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isMerge;
			}
			return 0;
		}

}
	
cfg.ActivityCommonGroupBaseCfgData = ActivityCommonGroupBaseCfgData

class ActivityWarOrderLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升级所需积分 */
		 static getScoreByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.score;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  进阶奖励物品 */
		 static getAddSpecialItemByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSpecialItem;
			}
			return ""
		}

}
	
cfg.ActivityWarOrderLevelBaseCfgData = ActivityWarOrderLevelBaseCfgData

class ActivityWarOrderLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升级所需积分 */
		 static getScoreByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.score;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  进阶奖励物品 */
		 static getAddSpecialItemByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSpecialItem;
			}
			return ""
		}

}
	
cfg.ActivityWarOrderLevelBaseCfgData = ActivityWarOrderLevelBaseCfgData

class ActivityRewardPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  随机池 */
		 static getPoolTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolType;
			}
			return 0;
		}
		 /**  权重 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityRewardPoolBaseCfgData = ActivityRewardPoolBaseCfgData

class ActivityRedEnvelopeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID（暂定） */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  红包角色图 */
		 static getImgByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.img;
			}
			return ""
		}
		 /**  红包类型（2每天重置） */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  领取时间 */
		 static getTimeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.time;
			}
			return ""
		}
		 /**  打开红包描述 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ActivityRedEnvelopeBaseCfgData = ActivityRedEnvelopeBaseCfgData

class ActivityExchangeExBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  兑换物品/精灵 */
		 static getFromItemIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fromItemID;
			}
			return 0;
		}
		 /**  数量 */
		 static getNeedAmountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAmount;
			}
			return 0;
		}
		 /**  消耗类型(1=道具，2=精灵) */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  限购数量 */
		 static getLimitNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitNum;
			}
			return 0;
		}
		 /**  折扣客户端显示用0表示无折扣 */
		 static getDiscountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.discount;
			}
			return 0;
		}

}
	
cfg.ActivityExchangeExBaseCfgData = ActivityExchangeExBaseCfgData

class ActivityLimitDayGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  天数 */
		 static getDayByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  礼包列表 */
		 static getGiftsByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.gifts;
			}
			return ""
		}
		 /**  一键购买礼包id */
		 static getQuickbuyByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.quickbuy;
			}
			return 0;
		}
		 /**  折扣 */
		 static getDiscountByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.discount;
			}
			return 0;
		}

}
	
cfg.ActivityLimitDayGiftBaseCfgData = ActivityLimitDayGiftBaseCfgData

class ActivityAchieveRoadBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  分组 */
		 static getGroupByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.group;
			}
			return 0;
		}
		 /**  成就ID(对应成就表内achieve_road) */
		 static getAchievementByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achievement;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  需要VIP */
		 static getVIPByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}
		 /**  数量限制 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  原价 */
		 static getOldPriceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldPrice;
			}
			return 0;
		}

}
	
cfg.ActivityAchieveRoadBaseCfgData = ActivityAchieveRoadBaseCfgData

class ActivityCommonGroupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "groupID");
		};
		 /**  界面组ID */
		 static getGroupIDByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}
		 /**  界面位置类型1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标4：//顶部第三排图标5：//顶部展开气泡图标6：//小游戏气泡图标大于6时，主界面不显示7:6.1活动组8：端午活动组 */
		 static getMainPositionTypeByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainPositionType;
			}
			return 0;
		}
		 /**  是否在挂机界面显示 */
		 static getHookShowByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hookShow;
			}
			return 0;
		}
		 /**  主界面图标配置图标位置和名称 */
		 static getMainIconByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainIcon;
			}
			return ""
		}
		 /**  特效类型ui_timeLimitActBtn  //一键牛逼特效circle //转圈特效 */
		 static getMainEffByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainEff;
			}
			return ""
		}
		 /**  是否是合服活动 */
		 static getIsMergeByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isMerge;
			}
			return 0;
		}

}
	
cfg.ActivityCommonGroupBaseCfgData = ActivityCommonGroupBaseCfgData

class ActivityCommonGroupPageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "indexID");
		};
		 /**  索引ID唯一索引 */
		 static getIndexIDByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.indexID;
			}
			return 0;
		}
		 /**  界面组ID填写common_group中的分组ID */
		 static getGroupIDByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}
		 /**  子类型1://限购礼包类型2://充值返利类型3://连冲活动类型4：//心愿抽卡5：//成就之路6：//胡帕抽卡7：//进化抽卡8：//小游戏兑换9：//兑换商店10：//定制礼包11://专属英雄12://兑换（多兑一）13：//限时挑战（活动boss） */
		 static getTypeByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  关联的活动列表 */
		 static getActivityIdsByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityIds;
			}
			return ""
		}
		 /**  切页图标 */
		 static getPageIconByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pageIcon;
			}
			return ""
		}
		 /**  切页名称填写切页名称 */
		 static getPageNameByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pageName;
			}
			return ""
		}
		 /**  banner图填写banner图名称，不配不显示 */
		 static getBannerByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.banner;
			}
			return ""
		}
		 /**  banner上的文字提示 */
		 static getBannerTipsByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bannerTips;
			}
			return ""
		}
		 /**  帮助描述信息帮助信息文本，不配不显示 */
		 static getHelpTipsByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.helpTips;
			}
			return ""
		}

}
	
cfg.ActivityCommonGroupPageBaseCfgData = ActivityCommonGroupPageBaseCfgData

class ActivityBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  活动ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  活动类型 */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  选项(选项类型后跟参数用_隔开，多个选项用;号隔开) */
		 static getOptionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.option;
			}
			return ""
		}
		 /**  组id(组id相同互斥) */
		 static getGroupIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupId;
			}
			return 0;
		}
		 /**  子类型 */
		 static getSonTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sonType;
			}
			return 0;
		}
		 /**  配置失效时间 */
		 static getInvalidTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalidTime;
			}
			return 0;
		}
		 /**  生效时间 */
		 static getValidTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.validTime;
			}
			return 0;
		}
		 /**  开启时间 */
		 static getOpenTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  重置时间 */
		 static getRefreshTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshTime;
			}
			return ""
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return ""
		}
		 /**  开启状态 */
		 static getOpenStateByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openState;
			}
			return 0;
		}
		 /**  榜单类型 */
		 static getTopListTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.topListType;
			}
			return 0;
		}
		 /**  活动参数 */
		 static getIsMergeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isMerge;
			}
			return 0;
		}

}
	
cfg.ActivityBaseCfgData = ActivityBaseCfgData

class ActivityChargeAmountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  累计金额 */
		 static getChargeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.charge;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityChargeAmountBaseCfgData = ActivityChargeAmountBaseCfgData

class ActivityChargeDaysBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  累计天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityChargeDaysBaseCfgData = ActivityChargeDaysBaseCfgData

class ActivityLevelupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  等级需求 */
		 static getLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  数量 */
		 static getNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.num;
			}
			return 0;
		}

}
	
cfg.ActivityLevelupBaseCfgData = ActivityLevelupBaseCfgData

class ActivityTimesBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  次数需求 */
		 static getTimesByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.times;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityTimesBaseCfgData = ActivityTimesBaseCfgData

class ActivityFirstChargeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  充值金额 */
		 static getAmountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.amount;
			}
			return 0;
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityFirstChargeBaseCfgData = ActivityFirstChargeBaseCfgData

class ActivityWeekendBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  周几（周日0） */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityWeekendBaseCfgData = ActivityWeekendBaseCfgData

class ActivityLimitGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  全服限购 */
		 static getAllCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.allCount;
			}
			return 0;
		}
		 /**  每人限购 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  单人限购刷新天数 */
		 static getRefreshDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshDay;
			}
			return 0;
		}
		 /**  商品ID */
		 static getProductIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.productID;
			}
			return 0;
		}

}
	
cfg.ActivityLimitGiftBaseCfgData = ActivityLimitGiftBaseCfgData

class ActivityZeroBuyBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  需要等级 */
		 static getLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要VIP */
		 static getVIPByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}
		 /**  开服天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  返还天数 */
		 static getReturnDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnDay;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  礼包图标 */
		 static getTabIconByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tabIcon;
			}
			return ""
		}
		 /**  名字 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  banner图 */
		 static getBannerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.banner;
			}
			return ""
		}
		 /**  总入口图标配置读取每个活动的第一个即可 */
		 static getMainIconByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainIcon;
			}
			return ""
		}
		 /**  界面标题图片配置读取每个活动的第一个即可 */
		 static getTitleIconByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.titleIcon;
			}
			return ""
		}

}
	
cfg.ActivityZeroBuyBaseCfgData = ActivityZeroBuyBaseCfgData

class ActivityRankBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  个数 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}

}
	
cfg.ActivityRankBaseCfgData = ActivityRankBaseCfgData

class ActivityGrowFundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  等级需求 */
		 static getLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityGrowFundBaseCfgData = ActivityGrowFundBaseCfgData

class ActivityAchievementBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  分组 */
		 static getGroupByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.group;
			}
			return 0;
		}
		 /**  成就ID(成就ID不为0的要花钻石买) */
		 static getAchievementByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achievement;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  需要VIP */
		 static getVIPByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}
		 /**  数量限制 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  原价 */
		 static getOldPriceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldPrice;
			}
			return 0;
		}

}
	
cfg.ActivityAchievementBaseCfgData = ActivityAchievementBaseCfgData

class ActivityFundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  是否加入首页预览 */
		 static getIsPreviewByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isPreview;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityFundBaseCfgData = ActivityFundBaseCfgData

class ActivityRankBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  个数 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}

}
	
cfg.ActivityRankBaseCfgData = ActivityRankBaseCfgData

class ActivityZeroBuyBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  需要等级 */
		 static getLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要VIP */
		 static getVIPByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}
		 /**  开服天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  返还天数 */
		 static getReturnDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnDay;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  礼包图标 */
		 static getTabIconByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tabIcon;
			}
			return ""
		}
		 /**  名字 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  banner图 */
		 static getBannerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.banner;
			}
			return ""
		}
		 /**  总入口图标配置读取每个活动的第一个即可 */
		 static getMainIconByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainIcon;
			}
			return ""
		}
		 /**  界面标题图片配置读取每个活动的第一个即可 */
		 static getTitleIconByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.titleIcon;
			}
			return ""
		}

}
	
cfg.ActivityZeroBuyBaseCfgData = ActivityZeroBuyBaseCfgData

class ActivityExchangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  特殊道具需求 */
		 static getNeedAmountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAmount;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  限购数量 */
		 static getLimitNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitNum;
			}
			return 0;
		}
		 /**  是否显示超值 */
		 static getShowBargainByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showBargain;
			}
			return 0;
		}
		 /**  消耗道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  消耗精灵 */
		 static getNeedPetByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPet;
			}
			return ""
		}

}
	
cfg.ActivityExchangeBaseCfgData = ActivityExchangeBaseCfgData

class ActivityLoginBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  按钮文字提示 */
		 static getButtonTipsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buttonTips;
			}
			return ""
		}

}
	
cfg.ActivityLoginBaseCfgData = ActivityLoginBaseCfgData

class ActivityFundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  是否加入首页预览 */
		 static getIsPreviewByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isPreview;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityFundBaseCfgData = ActivityFundBaseCfgData

class ActivityAchievementBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  分组 */
		 static getGroupByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.group;
			}
			return 0;
		}
		 /**  成就ID(成就ID不为0的要花钻石买) */
		 static getAchievementByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achievement;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  需要VIP */
		 static getVIPByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}
		 /**  数量限制 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  原价 */
		 static getOldPriceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldPrice;
			}
			return 0;
		}

}
	
cfg.ActivityAchievementBaseCfgData = ActivityAchievementBaseCfgData

class ActivityBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  活动ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  活动类型 */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  选项(选项类型后跟参数用_隔开，多个选项用;号隔开) */
		 static getOptionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.option;
			}
			return ""
		}
		 /**  组id(组id相同互斥) */
		 static getGroupIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupId;
			}
			return 0;
		}
		 /**  子类型 */
		 static getSonTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sonType;
			}
			return 0;
		}
		 /**  配置失效时间 */
		 static getInvalidTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalidTime;
			}
			return 0;
		}
		 /**  生效时间 */
		 static getValidTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.validTime;
			}
			return 0;
		}
		 /**  开启时间 */
		 static getOpenTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  重置时间 */
		 static getRefreshTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshTime;
			}
			return ""
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return ""
		}
		 /**  开启状态 */
		 static getOpenStateByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openState;
			}
			return 0;
		}
		 /**  榜单类型 */
		 static getTopListTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.topListType;
			}
			return 0;
		}
		 /**  活动参数 */
		 static getIsMergeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isMerge;
			}
			return 0;
		}

}
	
cfg.ActivityBaseCfgData = ActivityBaseCfgData

class ActivityLimitGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  全服限购 */
		 static getAllCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.allCount;
			}
			return 0;
		}
		 /**  每人限购 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  单人限购刷新天数 */
		 static getRefreshDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshDay;
			}
			return 0;
		}
		 /**  商品ID */
		 static getProductIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.productID;
			}
			return 0;
		}

}
	
cfg.ActivityLimitGiftBaseCfgData = ActivityLimitGiftBaseCfgData

class ActivityWarOrderLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升级所需积分 */
		 static getScoreByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.score;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  进阶奖励物品 */
		 static getAddSpecialItemByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSpecialItem;
			}
			return ""
		}

}
	
cfg.ActivityWarOrderLevelBaseCfgData = ActivityWarOrderLevelBaseCfgData

class ActivityShortTermGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  商品ID */
		 static getProductIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.productID;
			}
			return 0;
		}
		 /**  触发类型 */
		 static getTriggerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.trigger;
			}
			return 0;
		}
		 /**  触发参数 */
		 static getParamsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.params;
			}
			return ""
		}
		 /**  持续时间(分钟) */
		 static getDurationByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.duration;
			}
			return 0;
		}
		 /**  页签按钮文字 */
		 static getTabNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tabName;
			}
			return ""
		}
		 /**  显示返利比例 */
		 static getRebateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebate;
			}
			return 0;
		}
		 /**  描述文字 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ActivityShortTermGiftBaseCfgData = ActivityShortTermGiftBaseCfgData

class ActivityLoginBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  按钮文字提示 */
		 static getButtonTipsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buttonTips;
			}
			return ""
		}

}
	
cfg.ActivityLoginBaseCfgData = ActivityLoginBaseCfgData

class ActivityExchangeExBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  兑换物品/精灵 */
		 static getFromItemIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fromItemID;
			}
			return 0;
		}
		 /**  数量 */
		 static getNeedAmountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAmount;
			}
			return 0;
		}
		 /**  消耗类型(1=道具，2=精灵) */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  限购数量 */
		 static getLimitNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitNum;
			}
			return 0;
		}
		 /**  折扣客户端显示用0表示无折扣 */
		 static getDiscountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.discount;
			}
			return 0;
		}

}
	
cfg.ActivityExchangeExBaseCfgData = ActivityExchangeExBaseCfgData

class ActivityCommonGroupPageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "indexID");
		};
		 /**  索引ID唯一索引 */
		 static getIndexIDByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.indexID;
			}
			return 0;
		}
		 /**  界面组ID填写common_group中的分组ID */
		 static getGroupIDByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}
		 /**  子类型1://限购礼包类型2://充值返利类型3://连冲活动类型4：//心愿抽卡5：//成就之路6：//胡帕抽卡7：//进化抽卡8：//小游戏兑换9：//兑换商店10：//定制礼包11://专属英雄12://兑换（多兑一）13：//限时挑战（活动boss） */
		 static getTypeByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  关联的活动列表 */
		 static getActivityIdsByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityIds;
			}
			return ""
		}
		 /**  切页图标 */
		 static getPageIconByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pageIcon;
			}
			return ""
		}
		 /**  切页名称填写切页名称 */
		 static getPageNameByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pageName;
			}
			return ""
		}
		 /**  banner图填写banner图名称，不配不显示 */
		 static getBannerByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.banner;
			}
			return ""
		}
		 /**  banner上的文字提示 */
		 static getBannerTipsByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bannerTips;
			}
			return ""
		}
		 /**  帮助描述信息帮助信息文本，不配不显示 */
		 static getHelpTipsByIndexID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.helpTips;
			}
			return ""
		}

}
	
cfg.ActivityCommonGroupPageBaseCfgData = ActivityCommonGroupPageBaseCfgData

class ActivityCommonGroupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "groupID");
		};
		 /**  界面组ID */
		 static getGroupIDByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}
		 /**  界面位置类型1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标4：//顶部第三排图标5：//顶部展开气泡图标6：//小游戏气泡图标大于6时，主界面不显示7:6.1活动组8：端午活动组 */
		 static getMainPositionTypeByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainPositionType;
			}
			return 0;
		}
		 /**  是否在挂机界面显示 */
		 static getHookShowByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hookShow;
			}
			return 0;
		}
		 /**  主界面图标配置图标位置和名称 */
		 static getMainIconByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainIcon;
			}
			return ""
		}
		 /**  特效类型ui_timeLimitActBtn  //一键牛逼特效circle //转圈特效 */
		 static getMainEffByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainEff;
			}
			return ""
		}
		 /**  是否是合服活动 */
		 static getIsMergeByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isMerge;
			}
			return 0;
		}

}
	
cfg.ActivityCommonGroupBaseCfgData = ActivityCommonGroupBaseCfgData

class ActivityRewardPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  随机池 */
		 static getPoolTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolType;
			}
			return 0;
		}
		 /**  权重 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityRewardPoolBaseCfgData = ActivityRewardPoolBaseCfgData

class ActivityRedEnvelopeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID（暂定） */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  红包角色图 */
		 static getImgByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.img;
			}
			return ""
		}
		 /**  红包类型（2每天重置） */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  领取时间 */
		 static getTimeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.time;
			}
			return ""
		}
		 /**  打开红包描述 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ActivityRedEnvelopeBaseCfgData = ActivityRedEnvelopeBaseCfgData

class ActivityExchangeExBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  兑换物品/精灵 */
		 static getFromItemIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fromItemID;
			}
			return 0;
		}
		 /**  数量 */
		 static getNeedAmountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAmount;
			}
			return 0;
		}
		 /**  消耗类型(1=道具，2=精灵) */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  限购数量 */
		 static getLimitNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitNum;
			}
			return 0;
		}
		 /**  折扣客户端显示用0表示无折扣 */
		 static getDiscountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.discount;
			}
			return 0;
		}

}
	
cfg.ActivityExchangeExBaseCfgData = ActivityExchangeExBaseCfgData

class ActivityLimitDayGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  天数 */
		 static getDayByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  礼包列表 */
		 static getGiftsByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.gifts;
			}
			return ""
		}
		 /**  一键购买礼包id */
		 static getQuickbuyByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.quickbuy;
			}
			return 0;
		}
		 /**  折扣 */
		 static getDiscountByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.discount;
			}
			return 0;
		}

}
	
cfg.ActivityLimitDayGiftBaseCfgData = ActivityLimitDayGiftBaseCfgData

class ActivityAchieveRoadBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  分组 */
		 static getGroupByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.group;
			}
			return 0;
		}
		 /**  成就ID(对应成就表内achieve_road) */
		 static getAchievementByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achievement;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  需要VIP */
		 static getVIPByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}
		 /**  数量限制 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  原价 */
		 static getOldPriceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldPrice;
			}
			return 0;
		}

}
	
cfg.ActivityAchieveRoadBaseCfgData = ActivityAchieveRoadBaseCfgData

class ActivityWeekendBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  周几（周日0） */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityWeekendBaseCfgData = ActivityWeekendBaseCfgData

class ActivityLimitGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  全服限购 */
		 static getAllCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.allCount;
			}
			return 0;
		}
		 /**  每人限购 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  单人限购刷新天数 */
		 static getRefreshDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshDay;
			}
			return 0;
		}
		 /**  商品ID */
		 static getProductIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.productID;
			}
			return 0;
		}

}
	
cfg.ActivityLimitGiftBaseCfgData = ActivityLimitGiftBaseCfgData

class ActivityZeroBuyBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  需要等级 */
		 static getLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要VIP */
		 static getVIPByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}
		 /**  开服天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  返还天数 */
		 static getReturnDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnDay;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  礼包图标 */
		 static getTabIconByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tabIcon;
			}
			return ""
		}
		 /**  名字 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  banner图 */
		 static getBannerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.banner;
			}
			return ""
		}
		 /**  总入口图标配置读取每个活动的第一个即可 */
		 static getMainIconByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainIcon;
			}
			return ""
		}
		 /**  界面标题图片配置读取每个活动的第一个即可 */
		 static getTitleIconByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.titleIcon;
			}
			return ""
		}

}
	
cfg.ActivityZeroBuyBaseCfgData = ActivityZeroBuyBaseCfgData

class ActivityRankBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  个数 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}

}
	
cfg.ActivityRankBaseCfgData = ActivityRankBaseCfgData

class ActivityAchievementBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  分组 */
		 static getGroupByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.group;
			}
			return 0;
		}
		 /**  成就ID(成就ID不为0的要花钻石买) */
		 static getAchievementByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achievement;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  需要VIP */
		 static getVIPByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}
		 /**  数量限制 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  原价 */
		 static getOldPriceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldPrice;
			}
			return 0;
		}

}
	
cfg.ActivityAchievementBaseCfgData = ActivityAchievementBaseCfgData

class ActivityShortTermGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  商品ID */
		 static getProductIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.productID;
			}
			return 0;
		}
		 /**  触发类型 */
		 static getTriggerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.trigger;
			}
			return 0;
		}
		 /**  触发参数 */
		 static getParamsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.params;
			}
			return ""
		}
		 /**  持续时间(分钟) */
		 static getDurationByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.duration;
			}
			return 0;
		}
		 /**  页签按钮文字 */
		 static getTabNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tabName;
			}
			return ""
		}
		 /**  显示返利比例 */
		 static getRebateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebate;
			}
			return 0;
		}
		 /**  描述文字 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ActivityShortTermGiftBaseCfgData = ActivityShortTermGiftBaseCfgData

class ActivityChargeAmountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  累计金额 */
		 static getChargeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.charge;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityChargeAmountBaseCfgData = ActivityChargeAmountBaseCfgData

class ActivityLevelupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  等级需求 */
		 static getLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  数量 */
		 static getNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.num;
			}
			return 0;
		}

}
	
cfg.ActivityLevelupBaseCfgData = ActivityLevelupBaseCfgData

class ActivityChargeDaysBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  累计天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityChargeDaysBaseCfgData = ActivityChargeDaysBaseCfgData

class ActivityRedEnvelopeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID（暂定） */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  红包角色图 */
		 static getImgByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.img;
			}
			return ""
		}
		 /**  红包类型（2每天重置） */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  领取时间 */
		 static getTimeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.time;
			}
			return ""
		}
		 /**  打开红包描述 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ActivityRedEnvelopeBaseCfgData = ActivityRedEnvelopeBaseCfgData

class ActivityRewardPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  随机池 */
		 static getPoolTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolType;
			}
			return 0;
		}
		 /**  权重 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityRewardPoolBaseCfgData = ActivityRewardPoolBaseCfgData

class ActivityBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  活动ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  活动类型 */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  选项(选项类型后跟参数用_隔开，多个选项用;号隔开) */
		 static getOptionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.option;
			}
			return ""
		}
		 /**  组id(组id相同互斥) */
		 static getGroupIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupId;
			}
			return 0;
		}
		 /**  子类型 */
		 static getSonTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sonType;
			}
			return 0;
		}
		 /**  配置失效时间 */
		 static getInvalidTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalidTime;
			}
			return 0;
		}
		 /**  生效时间 */
		 static getValidTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.validTime;
			}
			return 0;
		}
		 /**  开启时间 */
		 static getOpenTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  重置时间 */
		 static getRefreshTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshTime;
			}
			return ""
		}
		 /**  参数 */
		 static getParamByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return ""
		}
		 /**  开启状态 */
		 static getOpenStateByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openState;
			}
			return 0;
		}
		 /**  榜单类型 */
		 static getTopListTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.topListType;
			}
			return 0;
		}
		 /**  活动参数 */
		 static getIsMergeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isMerge;
			}
			return 0;
		}

}
	
cfg.ActivityBaseCfgData = ActivityBaseCfgData

class ActivityTimesBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  次数需求 */
		 static getTimesByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.times;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityTimesBaseCfgData = ActivityTimesBaseCfgData

class ActivityGrowFundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  等级需求 */
		 static getLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityGrowFundBaseCfgData = ActivityGrowFundBaseCfgData

class ActivityFirstChargeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  充值金额 */
		 static getAmountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.amount;
			}
			return 0;
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityFirstChargeBaseCfgData = ActivityFirstChargeBaseCfgData

class ActivityExchangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  特殊道具需求 */
		 static getNeedAmountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAmount;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  限购数量 */
		 static getLimitNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitNum;
			}
			return 0;
		}
		 /**  是否显示超值 */
		 static getShowBargainByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showBargain;
			}
			return 0;
		}
		 /**  消耗道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  消耗精灵 */
		 static getNeedPetByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPet;
			}
			return ""
		}

}
	
cfg.ActivityExchangeBaseCfgData = ActivityExchangeBaseCfgData

class ActivityTimesBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  次数需求 */
		 static getTimesByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.times;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityTimesBaseCfgData = ActivityTimesBaseCfgData

class ActivityLevelupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  等级需求 */
		 static getLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  数量 */
		 static getNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.num;
			}
			return 0;
		}

}
	
cfg.ActivityLevelupBaseCfgData = ActivityLevelupBaseCfgData

class ActivityFirstChargeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  充值金额 */
		 static getAmountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.amount;
			}
			return 0;
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityFirstChargeBaseCfgData = ActivityFirstChargeBaseCfgData

class ActivityChargeAmountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  累计金额 */
		 static getChargeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.charge;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityChargeAmountBaseCfgData = ActivityChargeAmountBaseCfgData

class ActivityLimitDayGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  天数 */
		 static getDayByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  礼包列表 */
		 static getGiftsByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.gifts;
			}
			return ""
		}
		 /**  一键购买礼包id */
		 static getQuickbuyByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.quickbuy;
			}
			return 0;
		}
		 /**  折扣 */
		 static getDiscountByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.discount;
			}
			return 0;
		}

}
	
cfg.ActivityLimitDayGiftBaseCfgData = ActivityLimitDayGiftBaseCfgData

class ActivityFundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  是否加入首页预览 */
		 static getIsPreviewByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isPreview;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityFundBaseCfgData = ActivityFundBaseCfgData

class ActivityGrowFundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  等级需求 */
		 static getLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityGrowFundBaseCfgData = ActivityGrowFundBaseCfgData

class ActivityAchieveRoadBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  分组 */
		 static getGroupByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.group;
			}
			return 0;
		}
		 /**  成就ID(对应成就表内achieve_road) */
		 static getAchievementByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achievement;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  需要VIP */
		 static getVIPByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}
		 /**  数量限制 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  原价 */
		 static getOldPriceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldPrice;
			}
			return 0;
		}

}
	
cfg.ActivityAchieveRoadBaseCfgData = ActivityAchieveRoadBaseCfgData

class ActivityWeekendBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  周几（周日0） */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityWeekendBaseCfgData = ActivityWeekendBaseCfgData

class ActivityLoginBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  按钮文字提示 */
		 static getButtonTipsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buttonTips;
			}
			return ""
		}

}
	
cfg.ActivityLoginBaseCfgData = ActivityLoginBaseCfgData

class ActivityChargeDaysBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  累计天数 */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityChargeDaysBaseCfgData = ActivityChargeDaysBaseCfgData

class ActivityConstantConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  推送渠道 */
		 static getPushChannelByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushChannel;
			}
			return ""
		}

}
	
cfg.ActivityConstantConstantBaseCfgData = ActivityConstantConstantBaseCfgData

class ActivityConstantConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  推送渠道 */
		 static getPushChannelByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushChannel;
			}
			return ""
		}

}
	
cfg.ActivityConstantConstantBaseCfgData = ActivityConstantConstantBaseCfgData

class ActivityConstantConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  推送渠道 */
		 static getPushChannelByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushChannel;
			}
			return ""
		}

}
	
cfg.ActivityConstantConstantBaseCfgData = ActivityConstantConstantBaseCfgData

class ActivityCustomInBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "inId");
		};
		 /**  入口id */
		 static getInIdByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.inId;
			}
			return 0;
		}
		 /**  活动id */
		 static getActivityIdByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityId;
			}
			return 0;
		}
		 /**  界面位置类型1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标4：//顶部第三排图标5：//顶部展开气泡图标6：//小游戏气泡图标大于6时，主界面不显示 */
		 static getMainPositionTypeByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainPositionType;
			}
			return 0;
		}
		 /**  开启界面(问程序) */
		 static getOpenMediatorByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openMediator;
			}
			return ""
		}
		 /**  主界面图标配置图标位置和名称 */
		 static getMainIconByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainIcon;
			}
			return ""
		}
		 /**  uiPanel地址(问程序,简单的资源修改直接Mediator处理，复杂的才需要新建多个uiPanel，不涉及多个uiPanel的可以不配) */
		 static getUIPanelByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uIPanel;
			}
			return ""
		}
		 /**  特效类型ui_timeLimitActBtn  //一键牛逼特效circle //转圈特效 */
		 static getMainEffByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainEff;
			}
			return ""
		}

}
	
cfg.ActivityCustomInBaseCfgData = ActivityCustomInBaseCfgData

class ActivityCustomInBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "inId");
		};
		 /**  入口id */
		 static getInIdByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.inId;
			}
			return 0;
		}
		 /**  活动id */
		 static getActivityIdByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityId;
			}
			return 0;
		}
		 /**  界面位置类型1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标4：//顶部第三排图标5：//顶部展开气泡图标6：//小游戏气泡图标大于6时，主界面不显示 */
		 static getMainPositionTypeByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainPositionType;
			}
			return 0;
		}
		 /**  开启界面(问程序) */
		 static getOpenMediatorByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openMediator;
			}
			return ""
		}
		 /**  主界面图标配置图标位置和名称 */
		 static getMainIconByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainIcon;
			}
			return ""
		}
		 /**  uiPanel地址(问程序,简单的资源修改直接Mediator处理，复杂的才需要新建多个uiPanel，不涉及多个uiPanel的可以不配) */
		 static getUIPanelByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uIPanel;
			}
			return ""
		}
		 /**  特效类型ui_timeLimitActBtn  //一键牛逼特效circle //转圈特效 */
		 static getMainEffByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainEff;
			}
			return ""
		}

}
	
cfg.ActivityCustomInBaseCfgData = ActivityCustomInBaseCfgData

class ActivityCustomInBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "inId");
		};
		 /**  入口id */
		 static getInIdByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.inId;
			}
			return 0;
		}
		 /**  活动id */
		 static getActivityIdByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityId;
			}
			return 0;
		}
		 /**  界面位置类型1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标4：//顶部第三排图标5：//顶部展开气泡图标6：//小游戏气泡图标大于6时，主界面不显示 */
		 static getMainPositionTypeByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainPositionType;
			}
			return 0;
		}
		 /**  开启界面(问程序) */
		 static getOpenMediatorByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openMediator;
			}
			return ""
		}
		 /**  主界面图标配置图标位置和名称 */
		 static getMainIconByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainIcon;
			}
			return ""
		}
		 /**  uiPanel地址(问程序,简单的资源修改直接Mediator处理，复杂的才需要新建多个uiPanel，不涉及多个uiPanel的可以不配) */
		 static getUIPanelByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uIPanel;
			}
			return ""
		}
		 /**  特效类型ui_timeLimitActBtn  //一键牛逼特效circle //转圈特效 */
		 static getMainEffByInId(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mainEff;
			}
			return ""
		}

}
	
cfg.ActivityCustomInBaseCfgData = ActivityCustomInBaseCfgData

class ActivityEggLuckyEggBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  领取天数（周*） */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityEggLuckyEggBaseCfgData = ActivityEggLuckyEggBaseCfgData

class ActivityEggLuckyEggBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  领取天数（周*） */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityEggLuckyEggBaseCfgData = ActivityEggLuckyEggBaseCfgData

class ActivityEggLuckyEggBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  领取天数（周*） */
		 static getDayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.day;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ActivityEggLuckyEggBaseCfgData = ActivityEggLuckyEggBaseCfgData

class ActivitybossBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ActivitybossBuyCountBaseCfgData = ActivitybossBuyCountBaseCfgData

class ActivitybossMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  怪物名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  展示皮肤ID */
		 static getSkinIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}
		 /**  展示界面缩放比例 */
		 static getShowScaleByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showScale;
			}
		}
		 /**  参与奖励 */
		 static getDamagePrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.damagePrize;
			}
			return ""
		}
		 /**  奖励预览 */
		 static getAwardsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awards;
			}
			return ""
		}

}
	
cfg.ActivitybossMonsterNewBaseCfgData = ActivitybossMonsterNewBaseCfgData

class ActivitybossMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  怪物名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  展示皮肤ID */
		 static getSkinIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}
		 /**  展示界面缩放比例 */
		 static getShowScaleByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showScale;
			}
		}
		 /**  参与奖励 */
		 static getDamagePrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.damagePrize;
			}
			return ""
		}
		 /**  奖励预览 */
		 static getAwardsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awards;
			}
			return ""
		}

}
	
cfg.ActivitybossMonsterNewBaseCfgData = ActivitybossMonsterNewBaseCfgData

class ActivitybossConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "challengeCount");
		};
		 /**  每日挑战次数 */
		 static getChallengeCountByChallengeCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.challengeCount;
			}
			return 0;
		}
		 /**  血条单位 */
		 static getBloodUnitByChallengeCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bloodUnit;
			}
			return 0;
		}

}
	
cfg.ActivitybossConstantBaseCfgData = ActivitybossConstantBaseCfgData

class ActivitybossBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ActivitybossBuyCountBaseCfgData = ActivitybossBuyCountBaseCfgData

class ActivitybossConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "challengeCount");
		};
		 /**  每日挑战次数 */
		 static getChallengeCountByChallengeCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.challengeCount;
			}
			return 0;
		}
		 /**  血条单位 */
		 static getBloodUnitByChallengeCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bloodUnit;
			}
			return 0;
		}

}
	
cfg.ActivitybossConstantBaseCfgData = ActivitybossConstantBaseCfgData

class ActivitybossBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ActivitybossBuyCountBaseCfgData = ActivitybossBuyCountBaseCfgData

class ActivitybossConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "challengeCount");
		};
		 /**  每日挑战次数 */
		 static getChallengeCountByChallengeCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.challengeCount;
			}
			return 0;
		}
		 /**  血条单位 */
		 static getBloodUnitByChallengeCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bloodUnit;
			}
			return 0;
		}

}
	
cfg.ActivitybossConstantBaseCfgData = ActivitybossConstantBaseCfgData

class ActivitybossMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  怪物名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  展示皮肤ID */
		 static getSkinIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}
		 /**  展示界面缩放比例 */
		 static getShowScaleByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showScale;
			}
		}
		 /**  参与奖励 */
		 static getDamagePrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.damagePrize;
			}
			return ""
		}
		 /**  奖励预览 */
		 static getAwardsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awards;
			}
			return ""
		}

}
	
cfg.ActivitybossMonsterNewBaseCfgData = ActivitybossMonsterNewBaseCfgData

class ArtifactBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  技能ID */
		 static getSkillIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  技能描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ArtifactBaseCfgData = ArtifactBaseCfgData

class ArtifactSkillUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  技能ID */
		 static getSkillIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillLevel;
			}
			return 0;
		}
		 /**  需要神器等级 */
		 static getNeedArtifactLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needArtifactLevel;
			}
			return 0;
		}
		 /**  升到此级需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  重置返还道具 */
		 static getReturnItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnItem;
			}
			return ""
		}
		 /**  增加属性(需要累加)属性类型|值|万分比; */
		 static getAddAttrByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  觉醒增加属性属性类型|值|万分比; */
		 static getAddAwakeAttrByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAwakeAttr;
			}
			return ""
		}

}
	
cfg.ArtifactSkillUpgradeBaseCfgData = ArtifactSkillUpgradeBaseCfgData

class ArtifactBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  技能ID */
		 static getSkillIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  技能描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ArtifactBaseCfgData = ArtifactBaseCfgData

class ArtifactUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  此级最大经验 */
		 static getMaxExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  最大刻印次数 */
		 static getMaxStoneCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxStoneCount;
			}
			return 0;
		}
		 /**  每次需要刻印石数量 */
		 static getNeedStoneCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStoneCount;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加属性属性类型|值|万分比; */
		 static getAddAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  每点经验增加属性属性类型|属性值 */
		 static getExpAddAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expAddAttr;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillMaxLvByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillMaxLv;
			}
			return 0;
		}

}
	
cfg.ArtifactUpgradeBaseCfgData = ArtifactUpgradeBaseCfgData

class ArtifactActiveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  ID */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  进度 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要成就ID */
		 static getNeedAchieveIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAchieveID;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ArtifactActiveBaseCfgData = ArtifactActiveBaseCfgData

class ArtifactYlstagerewardBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stage");
		};
		 /**  进度 */
		 static getStageByStage(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByStage(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ArtifactYlstagerewardBaseCfgData = ArtifactYlstagerewardBaseCfgData

class ArtifactActiveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  ID */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  进度 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要成就ID */
		 static getNeedAchieveIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAchieveID;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ArtifactActiveBaseCfgData = ArtifactActiveBaseCfgData

class ArtifactUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  此级最大经验 */
		 static getMaxExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  最大刻印次数 */
		 static getMaxStoneCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxStoneCount;
			}
			return 0;
		}
		 /**  每次需要刻印石数量 */
		 static getNeedStoneCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStoneCount;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加属性属性类型|值|万分比; */
		 static getAddAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  每点经验增加属性属性类型|属性值 */
		 static getExpAddAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expAddAttr;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillMaxLvByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillMaxLv;
			}
			return 0;
		}

}
	
cfg.ArtifactUpgradeBaseCfgData = ArtifactUpgradeBaseCfgData

class ArtifactConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "fazhenAddItem");
		};
		 /**  法阵解锁奖励 */
		 static getFazhenAddItemByFazhenAddItem(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fazhenAddItem;
			}
			return ""
		}
		 /**  法阵觉醒属性万分比加成(类型_万分比;) */
		 static getAwakeAddAttrByFazhenAddItem(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awakeAddAttr;
			}
			return ""
		}

}
	
cfg.ArtifactConstBaseCfgData = ArtifactConstBaseCfgData

class ArtifactActiveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  ID */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  进度 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要成就ID */
		 static getNeedAchieveIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAchieveID;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ArtifactActiveBaseCfgData = ArtifactActiveBaseCfgData

class ArtifactYlstagerewardBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stage");
		};
		 /**  进度 */
		 static getStageByStage(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByStage(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ArtifactYlstagerewardBaseCfgData = ArtifactYlstagerewardBaseCfgData

class ArtifactYlactiveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  ID */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  进度 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  需要成就ID */
		 static getNeedAchieveIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAchieveID;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ArtifactYlactiveBaseCfgData = ArtifactYlactiveBaseCfgData

class ArtifactSkillUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  技能ID */
		 static getSkillIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillLevel;
			}
			return 0;
		}
		 /**  需要神器等级 */
		 static getNeedArtifactLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needArtifactLevel;
			}
			return 0;
		}
		 /**  升到此级需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  重置返还道具 */
		 static getReturnItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnItem;
			}
			return ""
		}
		 /**  增加属性(需要累加)属性类型|值|万分比; */
		 static getAddAttrByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  觉醒增加属性属性类型|值|万分比; */
		 static getAddAwakeAttrByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAwakeAttr;
			}
			return ""
		}

}
	
cfg.ArtifactSkillUpgradeBaseCfgData = ArtifactSkillUpgradeBaseCfgData

class ArtifactSkillUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  技能ID */
		 static getSkillIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillLevel;
			}
			return 0;
		}
		 /**  需要神器等级 */
		 static getNeedArtifactLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needArtifactLevel;
			}
			return 0;
		}
		 /**  升到此级需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  重置返还道具 */
		 static getReturnItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnItem;
			}
			return ""
		}
		 /**  增加属性(需要累加)属性类型|值|万分比; */
		 static getAddAttrByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  觉醒增加属性属性类型|值|万分比; */
		 static getAddAwakeAttrByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAwakeAttr;
			}
			return ""
		}

}
	
cfg.ArtifactSkillUpgradeBaseCfgData = ArtifactSkillUpgradeBaseCfgData

class ArtifactUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  此级最大经验 */
		 static getMaxExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  最大刻印次数 */
		 static getMaxStoneCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxStoneCount;
			}
			return 0;
		}
		 /**  每次需要刻印石数量 */
		 static getNeedStoneCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStoneCount;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加属性属性类型|值|万分比; */
		 static getAddAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  每点经验增加属性属性类型|属性值 */
		 static getExpAddAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expAddAttr;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillMaxLvByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillMaxLv;
			}
			return 0;
		}

}
	
cfg.ArtifactUpgradeBaseCfgData = ArtifactUpgradeBaseCfgData

class ArtifactConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "fazhenAddItem");
		};
		 /**  法阵解锁奖励 */
		 static getFazhenAddItemByFazhenAddItem(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fazhenAddItem;
			}
			return ""
		}
		 /**  法阵觉醒属性万分比加成(类型_万分比;) */
		 static getAwakeAddAttrByFazhenAddItem(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awakeAddAttr;
			}
			return ""
		}

}
	
cfg.ArtifactConstBaseCfgData = ArtifactConstBaseCfgData

class ArtifactYlactiveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  ID */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  进度 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  需要成就ID */
		 static getNeedAchieveIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAchieveID;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ArtifactYlactiveBaseCfgData = ArtifactYlactiveBaseCfgData

class ArtifactConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "fazhenAddItem");
		};
		 /**  法阵解锁奖励 */
		 static getFazhenAddItemByFazhenAddItem(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fazhenAddItem;
			}
			return ""
		}
		 /**  法阵觉醒属性万分比加成(类型_万分比;) */
		 static getAwakeAddAttrByFazhenAddItem(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awakeAddAttr;
			}
			return ""
		}

}
	
cfg.ArtifactConstBaseCfgData = ArtifactConstBaseCfgData

class ArtifactYlstagerewardBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stage");
		};
		 /**  进度 */
		 static getStageByStage(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByStage(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ArtifactYlstagerewardBaseCfgData = ArtifactYlstagerewardBaseCfgData

class ArtifactYlactiveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  ID */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  进度 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  需要成就ID */
		 static getNeedAchieveIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAchieveID;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ArtifactYlactiveBaseCfgData = ArtifactYlactiveBaseCfgData

class ArtifactBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  技能ID */
		 static getSkillIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  技能描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ArtifactBaseCfgData = ArtifactBaseCfgData

class BattleTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "attrType");
		};
		 /**  类型 */
		 static getAttrTypeByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrType;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  战斗背景 */
		 static getBattleSceneByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.battleScene;
			}
			return ""
		}

}
	
cfg.BattleTypeBaseCfgData = BattleTypeBaseCfgData

class BattleBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "attrType");
		};
		 /**  属性ID */
		 static getAttrTypeByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrType;
			}
			return 0;
		}
		 /**  属性说明 */
		 static getDescByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  加评分 */
		 static getAddScoreByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  万分比加评分 */
		 static getRateAddScoreByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rateAddScore;
			}
			return 0;
		}

}
	
cfg.BattleBaseCfgData = BattleBaseCfgData

class BattleBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "attrType");
		};
		 /**  属性ID */
		 static getAttrTypeByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrType;
			}
			return 0;
		}
		 /**  属性说明 */
		 static getDescByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  加评分 */
		 static getAddScoreByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  万分比加评分 */
		 static getRateAddScoreByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rateAddScore;
			}
			return 0;
		}

}
	
cfg.BattleBaseCfgData = BattleBaseCfgData

class BattleFormationAttrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  伙伴类型 */
		 static getPetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  类型个数 */
		 static getTypeCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeCount;
			}
			return 0;
		}
		 /**  属性加成属性类型|万分比; */
		 static getAddAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  阵型名称 */
		 static getTypeNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeName;
			}
			return ""
		}

}
	
cfg.BattleFormationAttrBaseCfgData = BattleFormationAttrBaseCfgData

class BattleTypeRestrainBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "attackType");
		};
		 /**  攻击方1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getAttackTypeByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attackType;
			}
			return 0;
		}
		 /**  防御方1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getDefenseTypeByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.defenseType;
			}
			return 0;
		}
		 /**  伤害加成万分比 */
		 static getDamageRateByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.damageRate;
			}
			return 0;
		}
		 /**  命中加成分比 */
		 static getHitRateByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hitRate;
			}
			return 0;
		}

}
	
cfg.BattleTypeRestrainBaseCfgData = BattleTypeRestrainBaseCfgData

class BattleBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "attrType");
		};
		 /**  属性ID */
		 static getAttrTypeByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrType;
			}
			return 0;
		}
		 /**  属性说明 */
		 static getDescByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  加评分 */
		 static getAddScoreByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  万分比加评分 */
		 static getRateAddScoreByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rateAddScore;
			}
			return 0;
		}

}
	
cfg.BattleBaseCfgData = BattleBaseCfgData

class BattleTypeRestrainBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "attackType");
		};
		 /**  攻击方1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getAttackTypeByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attackType;
			}
			return 0;
		}
		 /**  防御方1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getDefenseTypeByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.defenseType;
			}
			return 0;
		}
		 /**  伤害加成万分比 */
		 static getDamageRateByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.damageRate;
			}
			return 0;
		}
		 /**  命中加成分比 */
		 static getHitRateByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hitRate;
			}
			return 0;
		}

}
	
cfg.BattleTypeRestrainBaseCfgData = BattleTypeRestrainBaseCfgData

class BattleTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "attrType");
		};
		 /**  类型 */
		 static getAttrTypeByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrType;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  战斗背景 */
		 static getBattleSceneByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.battleScene;
			}
			return ""
		}

}
	
cfg.BattleTypeBaseCfgData = BattleTypeBaseCfgData

class BattleTypeRestrainBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "attackType");
		};
		 /**  攻击方1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getAttackTypeByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attackType;
			}
			return 0;
		}
		 /**  防御方1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getDefenseTypeByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.defenseType;
			}
			return 0;
		}
		 /**  伤害加成万分比 */
		 static getDamageRateByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.damageRate;
			}
			return 0;
		}
		 /**  命中加成分比 */
		 static getHitRateByAttackType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hitRate;
			}
			return 0;
		}

}
	
cfg.BattleTypeRestrainBaseCfgData = BattleTypeRestrainBaseCfgData

class BattleFormationAttrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  伙伴类型 */
		 static getPetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  类型个数 */
		 static getTypeCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeCount;
			}
			return 0;
		}
		 /**  属性加成属性类型|万分比; */
		 static getAddAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  阵型名称 */
		 static getTypeNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeName;
			}
			return ""
		}

}
	
cfg.BattleFormationAttrBaseCfgData = BattleFormationAttrBaseCfgData

class BattleTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "attrType");
		};
		 /**  类型 */
		 static getAttrTypeByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrType;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  战斗背景 */
		 static getBattleSceneByAttrType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.battleScene;
			}
			return ""
		}

}
	
cfg.BattleTypeBaseCfgData = BattleTypeBaseCfgData

class BattleFormationAttrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  伙伴类型 */
		 static getPetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  类型个数 */
		 static getTypeCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeCount;
			}
			return 0;
		}
		 /**  属性加成属性类型|万分比; */
		 static getAddAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  阵型名称 */
		 static getTypeNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeName;
			}
			return ""
		}

}
	
cfg.BattleFormationAttrBaseCfgData = BattleFormationAttrBaseCfgData

class BuffNewBuffStateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "newState");
		};
		 /**  新状态 */
		 static getNewStateByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newState;
			}
			return 0;
		}
		 /**  删除老状态 */
		 static getDelOldStateByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.delOldState;
			}
			return ""
		}
		 /**  互斥状态 */
		 static getCanAddByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.canAdd;
			}
			return ""
		}
		 /**  名称 */
		 static getNameByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.BuffNewBuffStateBaseCfgData = BuffNewBuffStateBaseCfgData

class BuffNewBuffStateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "newState");
		};
		 /**  新状态 */
		 static getNewStateByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newState;
			}
			return 0;
		}
		 /**  删除老状态 */
		 static getDelOldStateByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.delOldState;
			}
			return ""
		}
		 /**  互斥状态 */
		 static getCanAddByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.canAdd;
			}
			return ""
		}
		 /**  名称 */
		 static getNameByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.BuffNewBuffStateBaseCfgData = BuffNewBuffStateBaseCfgData

class BuffNewBuffGroupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "newGroup");
		};
		 /**  新加的buff的groupID */
		 static getNewGroupByNewGroup(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newGroup;
			}
			return 0;
		}
		 /**  有影响的buff的GroupID */
		 static getOldGroupByNewGroup(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldGroup;
			}
			return 0;
		}
		 /**  互斥类型 1;//丢弃 2;//替换 */
		 static getRepeatTypeByNewGroup(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.repeatType;
			}
			return 0;
		}

}
	
cfg.BuffNewBuffGroupBaseCfgData = BuffNewBuffGroupBaseCfgData

class BuffNewBuffBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  编号 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  buff名称 */
		 static getBuffNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buffName;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  buff类型_emBuffType 1;//加属性   属性类型_属性值(可为负数)_属性万分比(可为负数) 2;//加状态   状态ID _emBuffControlType 3;//持续加消耗  加消耗  消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数) 4;//分担伤害   伤害万分比 5;//法术反噬   施法者属性ID_施法者属性万分比 6;//受物理攻击加buff 概率万分比_buffid 7;//增加治疗护盾  8;//增加护盾   属性ID_属性万分比_属性来源（0=目标，1=施法者） 9;//反弹伤害   伤害万分比 10;//偷取目标的属性 施法者属性ID_施法者属性万分比 11;//被攻击掉血  施法者属性ID_施法者属性万分比 12;//持续掉血   自己属性ID_自己属性万分比_最大自己属性ID_最大自己属性万分比 13;//抵挡伤害   次数 14;//buff删除掉血  消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数) 15;//伤害限制   属性类型_属性万分比 16;//普攻选目标  _emSkillCondition_参数1 17;//攻击吸血   伤害万分比 18;//只和加buff的人分担伤害 伤害万分比 */
		 static getBuffTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buffType;
			}
			return 0;
		}
		 /**  buff参数配置 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return ""
		}
		 /**  增加状态_emBuffControlType1;//冰冻 无法行动2;//眩晕 无法行动3;//沉睡 无法行动4;//禁止复活 无法行动5;//嘲讽6;//虚弱_emBuffControlType7;//混乱状态8;//石化9;//离间10;//麻痹11;//封印12;//禁疗13;//免疫14;//流血15;//灼烧16;//中毒17;//破甲18;//减速19;//速度提升20;//格挡盾21;//法术反噬22;//海蛇庇护23;//持续恢复24;//治疗盾25;//护盾26;//烈焰灼烧27;//沉默28;//偷取攻击29;//魔化30;//森林印记31;//感电32;//诅咒33;//死亡印记34;//灵魂印记35;//怒气36;//免疫控制37;//免疫负面效果 */
		 static getAddStateByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addState;
			}
			return 0;
		}
		 /**  组cs_buff_group组ID_组等级 */
		 static getGroupByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.group;
			}
			return 0;
		}
		 /**  效果类型_emBuffEffectType 1;//正面 2;//负面 3;//负面完全可驱散（不检测Mark驱散标记） 4;//负面控制 */
		 static getEffectTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectType;
			}
			return 0;
		}
		 /**  叠加规则_emBuffSameRepeatType1丢弃2替换3叠加回合 */
		 static getSameRepeatTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sameRepeatType;
			}
			return 0;
		}
		 /**  不同来源叠加规则_emBuffDiffRepeatType1;//丢弃2;//替换3;//共存 */
		 static getDiffRepeatTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.diffRepeatType;
			}
			return 0;
		}
		 /**  持续回合数0表示永久Administrator:如果是战斗开始时被动释放，就需要增加1回合。 */
		 static getExistRoundByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.existRound;
			}
			return 0;
		}
		 /**  最大层数 */
		 static getMaxLayerByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLayer;
			}
			return 0;
		}
		 /**  Mark（多选；隔开）_emBuffMark1,不可驱散2;//死亡是否不删除3;//死亡可以加 */
		 static getMarkByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mark;
			}
			return ""
		}
		 /**  删除条件_emBuffDelCondition1;//被攻击 参数1:次数_概率万分比_次数_概率万分比2;//生效立即删除 */
		 static getDelConditionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.delCondition;
			}
			return ""
		}
		 /**  删除触发_emBuffDelAction1;//源头使用技能 技能ID */
		 static getDelActionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.delAction;
			}
			return ""
		}
		 /**  buff图标 */
		 static getIconByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.icon;
			}
			return ""
		}
		 /**  buff特效id */
		 static getEffectIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectId;
			}
			return ""
		}

}
	
cfg.BuffNewBuffBaseCfgData = BuffNewBuffBaseCfgData

class BuffNewBuffGroupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "newGroup");
		};
		 /**  新加的buff的groupID */
		 static getNewGroupByNewGroup(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newGroup;
			}
			return 0;
		}
		 /**  有影响的buff的GroupID */
		 static getOldGroupByNewGroup(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldGroup;
			}
			return 0;
		}
		 /**  互斥类型 1;//丢弃 2;//替换 */
		 static getRepeatTypeByNewGroup(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.repeatType;
			}
			return 0;
		}

}
	
cfg.BuffNewBuffGroupBaseCfgData = BuffNewBuffGroupBaseCfgData

class BuffNewBuffBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  编号 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  buff名称 */
		 static getBuffNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buffName;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  buff类型_emBuffType 1;//加属性   属性类型_属性值(可为负数)_属性万分比(可为负数) 2;//加状态   状态ID _emBuffControlType 3;//持续加消耗  加消耗  消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数) 4;//分担伤害   伤害万分比 5;//法术反噬   施法者属性ID_施法者属性万分比 6;//受物理攻击加buff 概率万分比_buffid 7;//增加治疗护盾  8;//增加护盾   属性ID_属性万分比_属性来源（0=目标，1=施法者） 9;//反弹伤害   伤害万分比 10;//偷取目标的属性 施法者属性ID_施法者属性万分比 11;//被攻击掉血  施法者属性ID_施法者属性万分比 12;//持续掉血   自己属性ID_自己属性万分比_最大自己属性ID_最大自己属性万分比 13;//抵挡伤害   次数 14;//buff删除掉血  消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数) 15;//伤害限制   属性类型_属性万分比 16;//普攻选目标  _emSkillCondition_参数1 17;//攻击吸血   伤害万分比 18;//只和加buff的人分担伤害 伤害万分比 */
		 static getBuffTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buffType;
			}
			return 0;
		}
		 /**  buff参数配置 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return ""
		}
		 /**  增加状态_emBuffControlType1;//冰冻 无法行动2;//眩晕 无法行动3;//沉睡 无法行动4;//禁止复活 无法行动5;//嘲讽6;//虚弱_emBuffControlType7;//混乱状态8;//石化9;//离间10;//麻痹11;//封印12;//禁疗13;//免疫14;//流血15;//灼烧16;//中毒17;//破甲18;//减速19;//速度提升20;//格挡盾21;//法术反噬22;//海蛇庇护23;//持续恢复24;//治疗盾25;//护盾26;//烈焰灼烧27;//沉默28;//偷取攻击29;//魔化30;//森林印记31;//感电32;//诅咒33;//死亡印记34;//灵魂印记35;//怒气36;//免疫控制37;//免疫负面效果 */
		 static getAddStateByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addState;
			}
			return 0;
		}
		 /**  组cs_buff_group组ID_组等级 */
		 static getGroupByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.group;
			}
			return 0;
		}
		 /**  效果类型_emBuffEffectType 1;//正面 2;//负面 3;//负面完全可驱散（不检测Mark驱散标记） 4;//负面控制 */
		 static getEffectTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectType;
			}
			return 0;
		}
		 /**  叠加规则_emBuffSameRepeatType1丢弃2替换3叠加回合 */
		 static getSameRepeatTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sameRepeatType;
			}
			return 0;
		}
		 /**  不同来源叠加规则_emBuffDiffRepeatType1;//丢弃2;//替换3;//共存 */
		 static getDiffRepeatTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.diffRepeatType;
			}
			return 0;
		}
		 /**  持续回合数0表示永久Administrator:如果是战斗开始时被动释放，就需要增加1回合。 */
		 static getExistRoundByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.existRound;
			}
			return 0;
		}
		 /**  最大层数 */
		 static getMaxLayerByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLayer;
			}
			return 0;
		}
		 /**  Mark（多选；隔开）_emBuffMark1,不可驱散2;//死亡是否不删除3;//死亡可以加 */
		 static getMarkByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mark;
			}
			return ""
		}
		 /**  删除条件_emBuffDelCondition1;//被攻击 参数1:次数_概率万分比_次数_概率万分比2;//生效立即删除 */
		 static getDelConditionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.delCondition;
			}
			return ""
		}
		 /**  删除触发_emBuffDelAction1;//源头使用技能 技能ID */
		 static getDelActionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.delAction;
			}
			return ""
		}
		 /**  buff图标 */
		 static getIconByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.icon;
			}
			return ""
		}
		 /**  buff特效id */
		 static getEffectIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectId;
			}
			return ""
		}

}
	
cfg.BuffNewBuffBaseCfgData = BuffNewBuffBaseCfgData

class BuffNewBuffGroupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "newGroup");
		};
		 /**  新加的buff的groupID */
		 static getNewGroupByNewGroup(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newGroup;
			}
			return 0;
		}
		 /**  有影响的buff的GroupID */
		 static getOldGroupByNewGroup(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldGroup;
			}
			return 0;
		}
		 /**  互斥类型 1;//丢弃 2;//替换 */
		 static getRepeatTypeByNewGroup(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.repeatType;
			}
			return 0;
		}

}
	
cfg.BuffNewBuffGroupBaseCfgData = BuffNewBuffGroupBaseCfgData

class BuffNewBuffBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  编号 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  buff名称 */
		 static getBuffNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buffName;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  buff类型_emBuffType 1;//加属性   属性类型_属性值(可为负数)_属性万分比(可为负数) 2;//加状态   状态ID _emBuffControlType 3;//持续加消耗  加消耗  消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数) 4;//分担伤害   伤害万分比 5;//法术反噬   施法者属性ID_施法者属性万分比 6;//受物理攻击加buff 概率万分比_buffid 7;//增加治疗护盾  8;//增加护盾   属性ID_属性万分比_属性来源（0=目标，1=施法者） 9;//反弹伤害   伤害万分比 10;//偷取目标的属性 施法者属性ID_施法者属性万分比 11;//被攻击掉血  施法者属性ID_施法者属性万分比 12;//持续掉血   自己属性ID_自己属性万分比_最大自己属性ID_最大自己属性万分比 13;//抵挡伤害   次数 14;//buff删除掉血  消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数) 15;//伤害限制   属性类型_属性万分比 16;//普攻选目标  _emSkillCondition_参数1 17;//攻击吸血   伤害万分比 18;//只和加buff的人分担伤害 伤害万分比 */
		 static getBuffTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buffType;
			}
			return 0;
		}
		 /**  buff参数配置 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return ""
		}
		 /**  增加状态_emBuffControlType1;//冰冻 无法行动2;//眩晕 无法行动3;//沉睡 无法行动4;//禁止复活 无法行动5;//嘲讽6;//虚弱_emBuffControlType7;//混乱状态8;//石化9;//离间10;//麻痹11;//封印12;//禁疗13;//免疫14;//流血15;//灼烧16;//中毒17;//破甲18;//减速19;//速度提升20;//格挡盾21;//法术反噬22;//海蛇庇护23;//持续恢复24;//治疗盾25;//护盾26;//烈焰灼烧27;//沉默28;//偷取攻击29;//魔化30;//森林印记31;//感电32;//诅咒33;//死亡印记34;//灵魂印记35;//怒气36;//免疫控制37;//免疫负面效果 */
		 static getAddStateByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addState;
			}
			return 0;
		}
		 /**  组cs_buff_group组ID_组等级 */
		 static getGroupByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.group;
			}
			return 0;
		}
		 /**  效果类型_emBuffEffectType 1;//正面 2;//负面 3;//负面完全可驱散（不检测Mark驱散标记） 4;//负面控制 */
		 static getEffectTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectType;
			}
			return 0;
		}
		 /**  叠加规则_emBuffSameRepeatType1丢弃2替换3叠加回合 */
		 static getSameRepeatTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sameRepeatType;
			}
			return 0;
		}
		 /**  不同来源叠加规则_emBuffDiffRepeatType1;//丢弃2;//替换3;//共存 */
		 static getDiffRepeatTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.diffRepeatType;
			}
			return 0;
		}
		 /**  持续回合数0表示永久Administrator:如果是战斗开始时被动释放，就需要增加1回合。 */
		 static getExistRoundByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.existRound;
			}
			return 0;
		}
		 /**  最大层数 */
		 static getMaxLayerByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLayer;
			}
			return 0;
		}
		 /**  Mark（多选；隔开）_emBuffMark1,不可驱散2;//死亡是否不删除3;//死亡可以加 */
		 static getMarkByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mark;
			}
			return ""
		}
		 /**  删除条件_emBuffDelCondition1;//被攻击 参数1:次数_概率万分比_次数_概率万分比2;//生效立即删除 */
		 static getDelConditionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.delCondition;
			}
			return ""
		}
		 /**  删除触发_emBuffDelAction1;//源头使用技能 技能ID */
		 static getDelActionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.delAction;
			}
			return ""
		}
		 /**  buff图标 */
		 static getIconByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.icon;
			}
			return ""
		}
		 /**  buff特效id */
		 static getEffectIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectId;
			}
			return ""
		}

}
	
cfg.BuffNewBuffBaseCfgData = BuffNewBuffBaseCfgData

class BuffNewBuffStateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "newState");
		};
		 /**  新状态 */
		 static getNewStateByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newState;
			}
			return 0;
		}
		 /**  删除老状态 */
		 static getDelOldStateByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.delOldState;
			}
			return ""
		}
		 /**  互斥状态 */
		 static getCanAddByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.canAdd;
			}
			return ""
		}
		 /**  名称 */
		 static getNameByNewState(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.BuffNewBuffStateBaseCfgData = BuffNewBuffStateBaseCfgData

class ChallengeFailPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rate");
		};
		 /**  概率 */
		 static getRateByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeFailPrizeBaseCfgData = ChallengeFailPrizeBaseCfgData

class ChallengeMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.ChallengeMonsterNewBaseCfgData = ChallengeMonsterNewBaseCfgData

class ChallengeSeasonPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeSeasonPrizeBaseCfgData = ChallengeSeasonPrizeBaseCfgData

class ChallengeMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.ChallengeMonsterNewBaseCfgData = ChallengeMonsterNewBaseCfgData

class ChallengeWinPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rate");
		};
		 /**  概率 */
		 static getRateByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeWinPrizeBaseCfgData = ChallengeWinPrizeBaseCfgData

class ChallengeConstInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "initScore");
		};
		 /**  初始积分 */
		 static getInitScoreByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initScore;
			}
			return 0;
		}
		 /**  重置积分比例百分比 */
		 static getResetScoreRateByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.resetScoreRate;
			}
			return 0;
		}
		 /**  每日免费次数 */
		 static getDayFreeCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFreeCount;
			}
			return 0;
		}
		 /**  奖励时间 */
		 static getDailyPrizeTimeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dailyPrizeTime;
			}
		}
		 /**  成功奖励道具 */
		 static getWinAddItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.winAddItem;
			}
			return ""
		}
		 /**  失败奖励道具 */
		 static getFailAddItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failAddItem;
			}
			return ""
		}
		 /**  战斗跳过需要次数 */
		 static getSweepNeedCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sweepNeedCount;
			}
			return 0;
		}
		 /**  赛季天数 */
		 static getSeasonDaysByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.seasonDays;
			}
			return 0;
		}
		 /**  随机机器人最低积分 */
		 static getRandRobotScoreByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randRobotScore;
			}
			return 0;
		}
		 /**  随机积分差 */
		 static getRandScoreRangeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randScoreRange;
			}
			return 0;
		}
		 /**  进入需要的道具ID */
		 static getEnterNeedItemIDByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.enterNeedItemID;
			}
			return 0;
		}
		 /**  点赞奖励 */
		 static getLikePrizeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likePrize;
			}
			return ""
		}

}
	
cfg.ChallengeConstInfoBaseCfgData = ChallengeConstInfoBaseCfgData

class ChallengeWinPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rate");
		};
		 /**  概率 */
		 static getRateByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeWinPrizeBaseCfgData = ChallengeWinPrizeBaseCfgData

class ChallengeConstInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "initScore");
		};
		 /**  初始积分 */
		 static getInitScoreByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initScore;
			}
			return 0;
		}
		 /**  重置积分比例百分比 */
		 static getResetScoreRateByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.resetScoreRate;
			}
			return 0;
		}
		 /**  每日免费次数 */
		 static getDayFreeCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFreeCount;
			}
			return 0;
		}
		 /**  奖励时间 */
		 static getDailyPrizeTimeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dailyPrizeTime;
			}
		}
		 /**  成功奖励道具 */
		 static getWinAddItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.winAddItem;
			}
			return ""
		}
		 /**  失败奖励道具 */
		 static getFailAddItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failAddItem;
			}
			return ""
		}
		 /**  战斗跳过需要次数 */
		 static getSweepNeedCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sweepNeedCount;
			}
			return 0;
		}
		 /**  赛季天数 */
		 static getSeasonDaysByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.seasonDays;
			}
			return 0;
		}
		 /**  随机机器人最低积分 */
		 static getRandRobotScoreByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randRobotScore;
			}
			return 0;
		}
		 /**  随机积分差 */
		 static getRandScoreRangeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randScoreRange;
			}
			return 0;
		}
		 /**  进入需要的道具ID */
		 static getEnterNeedItemIDByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.enterNeedItemID;
			}
			return 0;
		}
		 /**  点赞奖励 */
		 static getLikePrizeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likePrize;
			}
			return ""
		}

}
	
cfg.ChallengeConstInfoBaseCfgData = ChallengeConstInfoBaseCfgData

class ChallengeRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.ChallengeRobotBaseCfgData = ChallengeRobotBaseCfgData

class ChallengeSeasonPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeSeasonPrizeBaseCfgData = ChallengeSeasonPrizeBaseCfgData

class ChallengeWeekPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "prizeID");
		};
		 /**  奖励ID */
		 static getPrizeIDByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeID;
			}
			return 0;
		}
		 /**  需要挑战次数 */
		 static getNeedFightCountByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightCount;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeWeekPrizeBaseCfgData = ChallengeWeekPrizeBaseCfgData

class ChallengeConstInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "initScore");
		};
		 /**  初始积分 */
		 static getInitScoreByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initScore;
			}
			return 0;
		}
		 /**  重置积分比例百分比 */
		 static getResetScoreRateByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.resetScoreRate;
			}
			return 0;
		}
		 /**  每日免费次数 */
		 static getDayFreeCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFreeCount;
			}
			return 0;
		}
		 /**  奖励时间 */
		 static getDailyPrizeTimeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dailyPrizeTime;
			}
		}
		 /**  成功奖励道具 */
		 static getWinAddItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.winAddItem;
			}
			return ""
		}
		 /**  失败奖励道具 */
		 static getFailAddItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failAddItem;
			}
			return ""
		}
		 /**  战斗跳过需要次数 */
		 static getSweepNeedCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sweepNeedCount;
			}
			return 0;
		}
		 /**  赛季天数 */
		 static getSeasonDaysByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.seasonDays;
			}
			return 0;
		}
		 /**  随机机器人最低积分 */
		 static getRandRobotScoreByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randRobotScore;
			}
			return 0;
		}
		 /**  随机积分差 */
		 static getRandScoreRangeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randScoreRange;
			}
			return 0;
		}
		 /**  进入需要的道具ID */
		 static getEnterNeedItemIDByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.enterNeedItemID;
			}
			return 0;
		}
		 /**  点赞奖励 */
		 static getLikePrizeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likePrize;
			}
			return ""
		}

}
	
cfg.ChallengeConstInfoBaseCfgData = ChallengeConstInfoBaseCfgData

class ChallengeWinPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rate");
		};
		 /**  概率 */
		 static getRateByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeWinPrizeBaseCfgData = ChallengeWinPrizeBaseCfgData

class ChallengeFailPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rate");
		};
		 /**  概率 */
		 static getRateByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeFailPrizeBaseCfgData = ChallengeFailPrizeBaseCfgData

class ChallengeSeasonPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeSeasonPrizeBaseCfgData = ChallengeSeasonPrizeBaseCfgData

class ChallengeWeekPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "prizeID");
		};
		 /**  奖励ID */
		 static getPrizeIDByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeID;
			}
			return 0;
		}
		 /**  需要挑战次数 */
		 static getNeedFightCountByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightCount;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeWeekPrizeBaseCfgData = ChallengeWeekPrizeBaseCfgData

class ChallengeMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.ChallengeMonsterNewBaseCfgData = ChallengeMonsterNewBaseCfgData

class ChallengeFailPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rate");
		};
		 /**  概率 */
		 static getRateByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByRate(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeFailPrizeBaseCfgData = ChallengeFailPrizeBaseCfgData

class ChallengeWeekPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "prizeID");
		};
		 /**  奖励ID */
		 static getPrizeIDByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeID;
			}
			return 0;
		}
		 /**  需要挑战次数 */
		 static getNeedFightCountByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightCount;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeWeekPrizeBaseCfgData = ChallengeWeekPrizeBaseCfgData

class ChallengeRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.ChallengeRobotBaseCfgData = ChallengeRobotBaseCfgData

class ChallengeDailyPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeDailyPrizeBaseCfgData = ChallengeDailyPrizeBaseCfgData

class ChallengeRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.ChallengeRobotBaseCfgData = ChallengeRobotBaseCfgData

class ChallengeDailyPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeDailyPrizeBaseCfgData = ChallengeDailyPrizeBaseCfgData

class ChallengeDailyPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ChallengeDailyPrizeBaseCfgData = ChallengeDailyPrizeBaseCfgData

class ChampionConstInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "circle");
		};
		 /**  开启周期 */
		 static getCircleByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.circle;
			}
			return 0;
		}
		 /**  开启天数 */
		 static getCircleDaysByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.circleDays;
			}
			return ""
		}
		 /**  匹配时间 */
		 static getMatchTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.matchTime;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  需要竞技场排名 */
		 static getNeedChallengeRankByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needChallengeRank;
			}
			return 0;
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  准备时间 */
		 static getReadyTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.readyTime;
			}
			return 0;
		}
		 /**  竞猜时间 */
		 static getGuessTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.guessTime;
			}
			return 0;
		}
		 /**  战斗时长 */
		 static getFightTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightTime;
			}
			return 0;
		}
		 /**  初始赔率 */
		 static getInitOddsByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initOdds;
			}
			return 0;
		}
		 /**  初始赔率参数 */
		 static getInitOddsParamByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initOddsParam;
			}
			return 0;
		}
		 /**  最大赔率 */
		 static getMaxOddsByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxOdds;
			}
			return 0;
		}
		 /**  最小赔率 */
		 static getMinOddsByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minOdds;
			}
			return 0;
		}
		 /**  初始竞猜币 */
		 static getInitGuessCoinByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initGuessCoin;
			}
			return 0;
		}
		 /**  弹幕需要道具 */
		 static getDanmuNeedItemByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danmuNeedItem;
			}
			return ""
		}
		 /**  奖励预览 */
		 static getPrizePreviewByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizePreview;
			}
			return ""
		}
		 /**  弹幕最大条数 */
		 static getMaxDanmuCountByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxDanmuCount;
			}
			return 0;
		}

}
	
cfg.ChampionConstInfoBaseCfgData = ChampionConstInfoBaseCfgData

class ChampionTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  排名（上一排名,此名次] */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  增加称号ID */
		 static getAddTitleByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addTitle;
			}
			return 0;
		}

}
	
cfg.ChampionTopPrizeBaseCfgData = ChampionTopPrizeBaseCfgData

class ChampionRoundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "roundID");
		};
		 /**  回合 */
		 static getRoundIDByRoundID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.roundID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByRoundID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  增加战斗积分 */
		 static getAddFightScoreByRoundID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addFightScore;
			}
			return ""
		}

}
	
cfg.ChampionRoundBaseCfgData = ChampionRoundBaseCfgData

class ChampionRoundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "roundID");
		};
		 /**  回合 */
		 static getRoundIDByRoundID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.roundID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByRoundID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  增加战斗积分 */
		 static getAddFightScoreByRoundID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addFightScore;
			}
			return ""
		}

}
	
cfg.ChampionRoundBaseCfgData = ChampionRoundBaseCfgData

class ChampionConstInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "circle");
		};
		 /**  开启周期 */
		 static getCircleByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.circle;
			}
			return 0;
		}
		 /**  开启天数 */
		 static getCircleDaysByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.circleDays;
			}
			return ""
		}
		 /**  匹配时间 */
		 static getMatchTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.matchTime;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  需要竞技场排名 */
		 static getNeedChallengeRankByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needChallengeRank;
			}
			return 0;
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  准备时间 */
		 static getReadyTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.readyTime;
			}
			return 0;
		}
		 /**  竞猜时间 */
		 static getGuessTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.guessTime;
			}
			return 0;
		}
		 /**  战斗时长 */
		 static getFightTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightTime;
			}
			return 0;
		}
		 /**  初始赔率 */
		 static getInitOddsByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initOdds;
			}
			return 0;
		}
		 /**  初始赔率参数 */
		 static getInitOddsParamByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initOddsParam;
			}
			return 0;
		}
		 /**  最大赔率 */
		 static getMaxOddsByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxOdds;
			}
			return 0;
		}
		 /**  最小赔率 */
		 static getMinOddsByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minOdds;
			}
			return 0;
		}
		 /**  初始竞猜币 */
		 static getInitGuessCoinByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initGuessCoin;
			}
			return 0;
		}
		 /**  弹幕需要道具 */
		 static getDanmuNeedItemByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danmuNeedItem;
			}
			return ""
		}
		 /**  奖励预览 */
		 static getPrizePreviewByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizePreview;
			}
			return ""
		}
		 /**  弹幕最大条数 */
		 static getMaxDanmuCountByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxDanmuCount;
			}
			return 0;
		}

}
	
cfg.ChampionConstInfoBaseCfgData = ChampionConstInfoBaseCfgData

class ChampionRoundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "roundID");
		};
		 /**  回合 */
		 static getRoundIDByRoundID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.roundID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByRoundID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  增加战斗积分 */
		 static getAddFightScoreByRoundID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addFightScore;
			}
			return ""
		}

}
	
cfg.ChampionRoundBaseCfgData = ChampionRoundBaseCfgData

class ChampionTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  排名（上一排名,此名次] */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  增加称号ID */
		 static getAddTitleByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addTitle;
			}
			return 0;
		}

}
	
cfg.ChampionTopPrizeBaseCfgData = ChampionTopPrizeBaseCfgData

class ChampionConstInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "circle");
		};
		 /**  开启周期 */
		 static getCircleByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.circle;
			}
			return 0;
		}
		 /**  开启天数 */
		 static getCircleDaysByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.circleDays;
			}
			return ""
		}
		 /**  匹配时间 */
		 static getMatchTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.matchTime;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  需要竞技场排名 */
		 static getNeedChallengeRankByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needChallengeRank;
			}
			return 0;
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  准备时间 */
		 static getReadyTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.readyTime;
			}
			return 0;
		}
		 /**  竞猜时间 */
		 static getGuessTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.guessTime;
			}
			return 0;
		}
		 /**  战斗时长 */
		 static getFightTimeByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightTime;
			}
			return 0;
		}
		 /**  初始赔率 */
		 static getInitOddsByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initOdds;
			}
			return 0;
		}
		 /**  初始赔率参数 */
		 static getInitOddsParamByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initOddsParam;
			}
			return 0;
		}
		 /**  最大赔率 */
		 static getMaxOddsByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxOdds;
			}
			return 0;
		}
		 /**  最小赔率 */
		 static getMinOddsByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minOdds;
			}
			return 0;
		}
		 /**  初始竞猜币 */
		 static getInitGuessCoinByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initGuessCoin;
			}
			return 0;
		}
		 /**  弹幕需要道具 */
		 static getDanmuNeedItemByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danmuNeedItem;
			}
			return ""
		}
		 /**  奖励预览 */
		 static getPrizePreviewByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizePreview;
			}
			return ""
		}
		 /**  弹幕最大条数 */
		 static getMaxDanmuCountByCircle(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxDanmuCount;
			}
			return 0;
		}

}
	
cfg.ChampionConstInfoBaseCfgData = ChampionConstInfoBaseCfgData

class ChampionTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  排名（上一排名,此名次] */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  增加称号ID */
		 static getAddTitleByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addTitle;
			}
			return 0;
		}

}
	
cfg.ChampionTopPrizeBaseCfgData = ChampionTopPrizeBaseCfgData

class ChargeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  商品ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  商品名称（必填字段） */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  平台类型_emPlatformType */
		 static getPlatTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.platType;
			}
			return 0;
		}
		 /**  购买的类型 */
		 static getChargeTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chargeType;
			}
			return 0;
		}
		 /**  子类型(根据不同的购买类型细分子类型) */
		 static getSonTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sonType;
			}
			return 0;
		}
		 /**  是否绝版 */
		 static getOutOfPrintByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.outOfPrint;
			}
			return 0;
		}
		 /**  扩展参数 */
		 static getParamsByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.params;
			}
			return ""
		}
		 /**  所需的人民币(分) */
		 static getNeedMoneyByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needMoney;
			}
			return 0;
		}
		 /**  限购次数(0不限购) */
		 static getMaxBuyCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxBuyCount;
			}
			return 0;
		}
		 /**  限购周期 */
		 static getLimitBuyPeriodByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitBuyPeriod;
			}
			return 0;
		}
		 /**  组ID */
		 static getGroupIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}
		 /**  分组前提条件 */
		 static getNeedPreConditionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPreCondition;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  循环开服天数 */
		 static getCircleServerDayByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.circleServerDay;
			}
			return 0;
		}
		 /**  加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  首次额外赠送道具 */
		 static getFirstAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAddItem;
			}
			return ""
		}
		 /**  非首次额外赠送道具 */
		 static getExtraAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.extraAddItem;
			}
			return ""
		}
		 /**  是否广播 */
		 static getBroadCastByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.broadCast;
			}
			return 0;
		}
		 /**  商品描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  内购项ID */
		 static getAppidByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.appid;
			}
			return ""
		}
		 /**  联运内购项ID */
		 static getAppid3ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.appid3;
			}
			return ""
		}
		 /**  联运内购项ID2 */
		 static getAppid2122044ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.appid2122044;
			}
			return ""
		}

}
	
cfg.ChargeBaseCfgData = ChargeBaseCfgData

class ChargeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  商品ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  商品名称（必填字段） */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  平台类型_emPlatformType */
		 static getPlatTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.platType;
			}
			return 0;
		}
		 /**  购买的类型 */
		 static getChargeTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chargeType;
			}
			return 0;
		}
		 /**  子类型(根据不同的购买类型细分子类型) */
		 static getSonTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sonType;
			}
			return 0;
		}
		 /**  是否绝版 */
		 static getOutOfPrintByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.outOfPrint;
			}
			return 0;
		}
		 /**  扩展参数 */
		 static getParamsByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.params;
			}
			return ""
		}
		 /**  所需的人民币(分) */
		 static getNeedMoneyByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needMoney;
			}
			return 0;
		}
		 /**  限购次数(0不限购) */
		 static getMaxBuyCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxBuyCount;
			}
			return 0;
		}
		 /**  限购周期 */
		 static getLimitBuyPeriodByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitBuyPeriod;
			}
			return 0;
		}
		 /**  组ID */
		 static getGroupIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}
		 /**  分组前提条件 */
		 static getNeedPreConditionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPreCondition;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  循环开服天数 */
		 static getCircleServerDayByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.circleServerDay;
			}
			return 0;
		}
		 /**  加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  首次额外赠送道具 */
		 static getFirstAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAddItem;
			}
			return ""
		}
		 /**  非首次额外赠送道具 */
		 static getExtraAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.extraAddItem;
			}
			return ""
		}
		 /**  是否广播 */
		 static getBroadCastByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.broadCast;
			}
			return 0;
		}
		 /**  商品描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  内购项ID */
		 static getAppidByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.appid;
			}
			return ""
		}
		 /**  联运内购项ID */
		 static getAppid3ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.appid3;
			}
			return ""
		}
		 /**  联运内购项ID2 */
		 static getAppid2122044ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.appid2122044;
			}
			return ""
		}

}
	
cfg.ChargeBaseCfgData = ChargeBaseCfgData

class ChargeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  商品ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  商品名称（必填字段） */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  平台类型_emPlatformType */
		 static getPlatTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.platType;
			}
			return 0;
		}
		 /**  购买的类型 */
		 static getChargeTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chargeType;
			}
			return 0;
		}
		 /**  子类型(根据不同的购买类型细分子类型) */
		 static getSonTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sonType;
			}
			return 0;
		}
		 /**  是否绝版 */
		 static getOutOfPrintByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.outOfPrint;
			}
			return 0;
		}
		 /**  扩展参数 */
		 static getParamsByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.params;
			}
			return ""
		}
		 /**  所需的人民币(分) */
		 static getNeedMoneyByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needMoney;
			}
			return 0;
		}
		 /**  限购次数(0不限购) */
		 static getMaxBuyCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxBuyCount;
			}
			return 0;
		}
		 /**  限购周期 */
		 static getLimitBuyPeriodByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitBuyPeriod;
			}
			return 0;
		}
		 /**  组ID */
		 static getGroupIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}
		 /**  分组前提条件 */
		 static getNeedPreConditionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPreCondition;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  循环开服天数 */
		 static getCircleServerDayByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.circleServerDay;
			}
			return 0;
		}
		 /**  加道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  首次额外赠送道具 */
		 static getFirstAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAddItem;
			}
			return ""
		}
		 /**  非首次额外赠送道具 */
		 static getExtraAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.extraAddItem;
			}
			return ""
		}
		 /**  是否广播 */
		 static getBroadCastByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.broadCast;
			}
			return 0;
		}
		 /**  商品描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  内购项ID */
		 static getAppidByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.appid;
			}
			return ""
		}
		 /**  联运内购项ID */
		 static getAppid3ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.appid3;
			}
			return ""
		}
		 /**  联运内购项ID2 */
		 static getAppid2122044ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.appid2122044;
			}
			return ""
		}

}
	
cfg.ChargeBaseCfgData = ChargeBaseCfgData

class CommonChatBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "channel");
		};
		 /**  Channel_emBroadcast_Channel */
		 static getChannelByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.channel;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  聊天间隔 */
		 static getStepSecondByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stepSecond;
			}
			return 0;
		}
		 /**  缓存数量 */
		 static getSaveCountByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.saveCount;
			}
			return 0;
		}

}
	
cfg.CommonChatBaseCfgData = CommonChatBaseCfgData

class CommonSupportBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  支援类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  可派遣个数 */
		 static getSendCountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sendCount;
			}
			return 0;
		}
		 /**  可雇佣个数 */
		 static getHireCountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hireCount;
			}
			return 0;
		}
		 /**  单场战斗最大上场个数 */
		 static getFightCountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightCount;
			}
			return 0;
		}
		 /**  最大战力区间 */
		 static getMaxPowerByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxPower;
			}
			return 0;
		}
		 /**  是否可重复上场 */
		 static getCanUseAgainByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.canUseAgain;
			}
			return 0;
		}
		 /**  是否可解雇 */
		 static getCanFireByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.canFire;
			}
			return 0;
		}

}
	
cfg.CommonSupportBaseCfgData = CommonSupportBaseCfgData

class CommonChatBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "channel");
		};
		 /**  Channel_emBroadcast_Channel */
		 static getChannelByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.channel;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  聊天间隔 */
		 static getStepSecondByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stepSecond;
			}
			return 0;
		}
		 /**  缓存数量 */
		 static getSaveCountByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.saveCount;
			}
			return 0;
		}

}
	
cfg.CommonChatBaseCfgData = CommonChatBaseCfgData

class CommonInvitePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "achieveID");
		};
		 /**  成就ID */
		 static getAchieveIDByAchieveID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveID;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByAchieveID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.CommonInvitePrizeBaseCfgData = CommonInvitePrizeBaseCfgData

class CommonInvitePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "achieveID");
		};
		 /**  成就ID */
		 static getAchieveIDByAchieveID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveID;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByAchieveID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.CommonInvitePrizeBaseCfgData = CommonInvitePrizeBaseCfgData

class CommonSurveyConstantsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  推送开关 */
		 static getIndPushSwitchexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.indPushSwitchex;
			}
			return 0;
		}
		 /**  推送顺序 */
		 static getIndPuShorderByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.indPuShorder;
			}
			return 0;
		}
		 /**  推送时间类型 */
		 static getPushTimeTybeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushTimeTybe;
			}
			return 0;
		}
		 /**  活动时间（开服前n天） */
		 static getOpenDaysByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openDays;
			}
			return 0;
		}
		 /**  推送时间 */
		 static getPushtimeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushtime;
			}
			return ""
		}
		 /**  推送渠道 */
		 static getPushChannelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushChannel;
			}
			return ""
		}
		 /**  答题获得的奖励 */
		 static getPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prize;
			}
			return ""
		}
		 /**  幸运奖励预览 */
		 static getLuckyPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.luckyPrize;
			}
			return ""
		}

}
	
cfg.CommonSurveyConstantsBaseCfgData = CommonSurveyConstantsBaseCfgData

class CommonSupportBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  支援类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  可派遣个数 */
		 static getSendCountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sendCount;
			}
			return 0;
		}
		 /**  可雇佣个数 */
		 static getHireCountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hireCount;
			}
			return 0;
		}
		 /**  单场战斗最大上场个数 */
		 static getFightCountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightCount;
			}
			return 0;
		}
		 /**  最大战力区间 */
		 static getMaxPowerByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxPower;
			}
			return 0;
		}
		 /**  是否可重复上场 */
		 static getCanUseAgainByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.canUseAgain;
			}
			return 0;
		}
		 /**  是否可解雇 */
		 static getCanFireByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.canFire;
			}
			return 0;
		}

}
	
cfg.CommonSupportBaseCfgData = CommonSupportBaseCfgData

class CommonSurveyConstantsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  推送开关 */
		 static getIndPushSwitchexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.indPushSwitchex;
			}
			return 0;
		}
		 /**  推送顺序 */
		 static getIndPuShorderByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.indPuShorder;
			}
			return 0;
		}
		 /**  推送时间类型 */
		 static getPushTimeTybeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushTimeTybe;
			}
			return 0;
		}
		 /**  活动时间（开服前n天） */
		 static getOpenDaysByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openDays;
			}
			return 0;
		}
		 /**  推送时间 */
		 static getPushtimeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushtime;
			}
			return ""
		}
		 /**  推送渠道 */
		 static getPushChannelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushChannel;
			}
			return ""
		}
		 /**  答题获得的奖励 */
		 static getPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prize;
			}
			return ""
		}
		 /**  幸运奖励预览 */
		 static getLuckyPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.luckyPrize;
			}
			return ""
		}

}
	
cfg.CommonSurveyConstantsBaseCfgData = CommonSurveyConstantsBaseCfgData

class CommonInvitePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "achieveID");
		};
		 /**  成就ID */
		 static getAchieveIDByAchieveID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveID;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddItemByAchieveID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.CommonInvitePrizeBaseCfgData = CommonInvitePrizeBaseCfgData

class CommonChatBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "channel");
		};
		 /**  Channel_emBroadcast_Channel */
		 static getChannelByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.channel;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  聊天间隔 */
		 static getStepSecondByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stepSecond;
			}
			return 0;
		}
		 /**  缓存数量 */
		 static getSaveCountByChannel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.saveCount;
			}
			return 0;
		}

}
	
cfg.CommonChatBaseCfgData = CommonChatBaseCfgData

class CommonSurveyConstantsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  推送开关 */
		 static getIndPushSwitchexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.indPushSwitchex;
			}
			return 0;
		}
		 /**  推送顺序 */
		 static getIndPuShorderByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.indPuShorder;
			}
			return 0;
		}
		 /**  推送时间类型 */
		 static getPushTimeTybeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushTimeTybe;
			}
			return 0;
		}
		 /**  活动时间（开服前n天） */
		 static getOpenDaysByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openDays;
			}
			return 0;
		}
		 /**  推送时间 */
		 static getPushtimeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushtime;
			}
			return ""
		}
		 /**  推送渠道 */
		 static getPushChannelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pushChannel;
			}
			return ""
		}
		 /**  答题获得的奖励 */
		 static getPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prize;
			}
			return ""
		}
		 /**  幸运奖励预览 */
		 static getLuckyPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.luckyPrize;
			}
			return ""
		}

}
	
cfg.CommonSurveyConstantsBaseCfgData = CommonSurveyConstantsBaseCfgData

class CommonSupportBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  支援类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  可派遣个数 */
		 static getSendCountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sendCount;
			}
			return 0;
		}
		 /**  可雇佣个数 */
		 static getHireCountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hireCount;
			}
			return 0;
		}
		 /**  单场战斗最大上场个数 */
		 static getFightCountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightCount;
			}
			return 0;
		}
		 /**  最大战力区间 */
		 static getMaxPowerByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxPower;
			}
			return 0;
		}
		 /**  是否可重复上场 */
		 static getCanUseAgainByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.canUseAgain;
			}
			return 0;
		}
		 /**  是否可解雇 */
		 static getCanFireByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.canFire;
			}
			return 0;
		}

}
	
cfg.CommonSupportBaseCfgData = CommonSupportBaseCfgData

class CompensatePlayerRankBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "worldID");
		};
		 /**  区服ID */
		 static getWorldIDByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.worldID;
			}
			return 0;
		}
		 /**  账号ID */
		 static getAccountIDByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.accountID;
			}
			return 0;
		}
		 /**  角色ID */
		 static getPlayerIDByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.playerID;
			}
			return 0;
		}
		 /**  初始战力值 */
		 static getPowValueByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.powValue;
			}
			return ""
		}

}
	
cfg.CompensatePlayerRankBaseCfgData = CompensatePlayerRankBaseCfgData

class CompensateItemExchangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  邮件类型 */
		 static getEmailTypeByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.emailType;
			}
			return 0;
		}
		 /**  物品ID */
		 static getItemIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  兑换成物品 */
		 static getToItemByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.toItem;
			}
			return ""
		}

}
	
cfg.CompensateItemExchangeBaseCfgData = CompensateItemExchangeBaseCfgData

class CompensateAddpetCompensateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  精灵id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  进化道具数量 */
		 static getEvolveItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolveItem;
			}
			return ""
		}

}
	
cfg.CompensateAddpetCompensateBaseCfgData = CompensateAddpetCompensateBaseCfgData

class CompensatePlayerRankBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "worldID");
		};
		 /**  区服ID */
		 static getWorldIDByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.worldID;
			}
			return 0;
		}
		 /**  账号ID */
		 static getAccountIDByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.accountID;
			}
			return 0;
		}
		 /**  角色ID */
		 static getPlayerIDByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.playerID;
			}
			return 0;
		}
		 /**  初始战力值 */
		 static getPowValueByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.powValue;
			}
			return ""
		}

}
	
cfg.CompensatePlayerRankBaseCfgData = CompensatePlayerRankBaseCfgData

class CompensateItemExchangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  邮件类型 */
		 static getEmailTypeByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.emailType;
			}
			return 0;
		}
		 /**  物品ID */
		 static getItemIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  兑换成物品 */
		 static getToItemByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.toItem;
			}
			return ""
		}

}
	
cfg.CompensateItemExchangeBaseCfgData = CompensateItemExchangeBaseCfgData

class CompensatePetCompensateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  精灵id */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  星级 */
		 static getRankByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  返还本体id */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  返还超级百变怪数量 */
		 static getItemListByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemList;
			}
			return ""
		}
		 /**  重生道具数量 */
		 static getBaseItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseItem;
			}
			return ""
		}
		 /**  进化道具数量 */
		 static getEvolveItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolveItem;
			}
			return ""
		}

}
	
cfg.CompensatePetCompensateBaseCfgData = CompensatePetCompensateBaseCfgData

class CompensateItemExchangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  邮件类型 */
		 static getEmailTypeByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.emailType;
			}
			return 0;
		}
		 /**  物品ID */
		 static getItemIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  兑换成物品 */
		 static getToItemByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.toItem;
			}
			return ""
		}

}
	
cfg.CompensateItemExchangeBaseCfgData = CompensateItemExchangeBaseCfgData

class CompensatePlayerRankBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "worldID");
		};
		 /**  区服ID */
		 static getWorldIDByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.worldID;
			}
			return 0;
		}
		 /**  账号ID */
		 static getAccountIDByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.accountID;
			}
			return 0;
		}
		 /**  角色ID */
		 static getPlayerIDByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.playerID;
			}
			return 0;
		}
		 /**  初始战力值 */
		 static getPowValueByWorldID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.powValue;
			}
			return ""
		}

}
	
cfg.CompensatePlayerRankBaseCfgData = CompensatePlayerRankBaseCfgData

class CompensateAddpetCompensateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  精灵id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  进化道具数量 */
		 static getEvolveItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolveItem;
			}
			return ""
		}

}
	
cfg.CompensateAddpetCompensateBaseCfgData = CompensateAddpetCompensateBaseCfgData

class CompensateMailBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "mailType");
		};
		 /**  邮件类型 */
		 static getMailTypeByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailType;
			}
			return 0;
		}
		 /**  有效天数 */
		 static getExpireDayByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireDay;
			}
			return 0;
		}
		 /**  邮件标题 */
		 static getMailTitleByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailTitle;
			}
			return ""
		}
		 /**  消息展示内容 */
		 static getContentByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.CompensateMailBaseCfgData = CompensateMailBaseCfgData

class CompensatePetCompensateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  精灵id */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  星级 */
		 static getRankByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  返还本体id */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  返还超级百变怪数量 */
		 static getItemListByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemList;
			}
			return ""
		}
		 /**  重生道具数量 */
		 static getBaseItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseItem;
			}
			return ""
		}
		 /**  进化道具数量 */
		 static getEvolveItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolveItem;
			}
			return ""
		}

}
	
cfg.CompensatePetCompensateBaseCfgData = CompensatePetCompensateBaseCfgData

class CompensateMailBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "mailType");
		};
		 /**  邮件类型 */
		 static getMailTypeByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailType;
			}
			return 0;
		}
		 /**  有效天数 */
		 static getExpireDayByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireDay;
			}
			return 0;
		}
		 /**  邮件标题 */
		 static getMailTitleByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailTitle;
			}
			return ""
		}
		 /**  消息展示内容 */
		 static getContentByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.CompensateMailBaseCfgData = CompensateMailBaseCfgData

class CompensateAddpetCompensateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  精灵id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  进化道具数量 */
		 static getEvolveItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolveItem;
			}
			return ""
		}

}
	
cfg.CompensateAddpetCompensateBaseCfgData = CompensateAddpetCompensateBaseCfgData

class CompensatePetCompensateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  精灵id */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  星级 */
		 static getRankByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  返还本体id */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  返还超级百变怪数量 */
		 static getItemListByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemList;
			}
			return ""
		}
		 /**  重生道具数量 */
		 static getBaseItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseItem;
			}
			return ""
		}
		 /**  进化道具数量 */
		 static getEvolveItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolveItem;
			}
			return ""
		}

}
	
cfg.CompensatePetCompensateBaseCfgData = CompensatePetCompensateBaseCfgData

class CompensateMailBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "mailType");
		};
		 /**  邮件类型 */
		 static getMailTypeByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailType;
			}
			return 0;
		}
		 /**  有效天数 */
		 static getExpireDayByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireDay;
			}
			return 0;
		}
		 /**  邮件标题 */
		 static getMailTitleByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailTitle;
			}
			return ""
		}
		 /**  消息展示内容 */
		 static getContentByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.CompensateMailBaseCfgData = CompensateMailBaseCfgData

class ConstantGamesPrizePreviewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  枚举值 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  道具id列表 */
		 static getValueById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return ""
		}
		 /**  功能开关Id */
		 static getSystemSwitchIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.systemSwitchId;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ConstantGamesPrizePreviewBaseCfgData = ConstantGamesPrizePreviewBaseCfgData

class ConstantGamesPrizePreviewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  枚举值 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  道具id列表 */
		 static getValueById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return ""
		}
		 /**  功能开关Id */
		 static getSystemSwitchIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.systemSwitchId;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ConstantGamesPrizePreviewBaseCfgData = ConstantGamesPrizePreviewBaseCfgData

class ConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  唯一索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  系统类型 */
		 static getTypeIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeIndex;
			}
			return 0;
		}
		 /**  枚举类型 */
		 static getEnumIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.enumIndex;
			}
			return 0;
		}
		 /**  枚举值 */
		 static getConstantValueByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.constantValue;
			}
			return 0;
		}

}
	
cfg.ConstantBaseCfgData = ConstantBaseCfgData

class ConstantClientConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "enumIndex");
		};
		 /**  枚举值 */
		 static getEnumIndexByEnumIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.enumIndex;
			}
			return 0;
		}
		 /**  默认值 */
		 static getConstantValueByEnumIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.constantValue;
			}
			return 0;
		}

}
	
cfg.ConstantClientConstantBaseCfgData = ConstantClientConstantBaseCfgData

class ConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  唯一索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  系统类型 */
		 static getTypeIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeIndex;
			}
			return 0;
		}
		 /**  枚举类型 */
		 static getEnumIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.enumIndex;
			}
			return 0;
		}
		 /**  枚举值 */
		 static getConstantValueByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.constantValue;
			}
			return 0;
		}

}
	
cfg.ConstantBaseCfgData = ConstantBaseCfgData

class ConstantClientConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "enumIndex");
		};
		 /**  枚举值 */
		 static getEnumIndexByEnumIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.enumIndex;
			}
			return 0;
		}
		 /**  默认值 */
		 static getConstantValueByEnumIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.constantValue;
			}
			return 0;
		}

}
	
cfg.ConstantClientConstantBaseCfgData = ConstantClientConstantBaseCfgData

class ConstantGamesPrizePreviewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  枚举值 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  道具id列表 */
		 static getValueById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return ""
		}
		 /**  功能开关Id */
		 static getSystemSwitchIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.systemSwitchId;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.ConstantGamesPrizePreviewBaseCfgData = ConstantGamesPrizePreviewBaseCfgData

class ConstantClientConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "enumIndex");
		};
		 /**  枚举值 */
		 static getEnumIndexByEnumIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.enumIndex;
			}
			return 0;
		}
		 /**  默认值 */
		 static getConstantValueByEnumIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.constantValue;
			}
			return 0;
		}

}
	
cfg.ConstantClientConstantBaseCfgData = ConstantClientConstantBaseCfgData

class ConstantBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  唯一索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  系统类型 */
		 static getTypeIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeIndex;
			}
			return 0;
		}
		 /**  枚举类型 */
		 static getEnumIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.enumIndex;
			}
			return 0;
		}
		 /**  枚举值 */
		 static getConstantValueByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.constantValue;
			}
			return 0;
		}

}
	
cfg.ConstantBaseCfgData = ConstantBaseCfgData

class ConvenantAttrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  契约部位ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  属性加成,多个用逗号隔开 */
		 static getAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}

}
	
cfg.ConvenantAttrBaseCfgData = ConvenantAttrBaseCfgData

class ConvenantLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升到下级需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ConvenantLevelBaseCfgData = ConvenantLevelBaseCfgData

class ConvenantConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "unlockNeedItem");
		};
		 /**  解锁需要道具 */
		 static getUnlockNeedItemByUnlockNeedItem(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.unlockNeedItem;
			}
			return ""
		}

}
	
cfg.ConvenantConstBaseCfgData = ConvenantConstBaseCfgData

class ConvenantConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "unlockNeedItem");
		};
		 /**  解锁需要道具 */
		 static getUnlockNeedItemByUnlockNeedItem(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.unlockNeedItem;
			}
			return ""
		}

}
	
cfg.ConvenantConstBaseCfgData = ConvenantConstBaseCfgData

class ConvenantAttrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  契约部位ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  属性加成,多个用逗号隔开 */
		 static getAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}

}
	
cfg.ConvenantAttrBaseCfgData = ConvenantAttrBaseCfgData

class ConvenantAttrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  契约部位ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  属性加成,多个用逗号隔开 */
		 static getAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}

}
	
cfg.ConvenantAttrBaseCfgData = ConvenantAttrBaseCfgData

class ConvenantLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升到下级需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ConvenantLevelBaseCfgData = ConvenantLevelBaseCfgData

class ConvenantLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升到下级需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ConvenantLevelBaseCfgData = ConvenantLevelBaseCfgData

class ConvenantConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "unlockNeedItem");
		};
		 /**  解锁需要道具 */
		 static getUnlockNeedItemByUnlockNeedItem(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.unlockNeedItem;
			}
			return ""
		}

}
	
cfg.ConvenantConstBaseCfgData = ConvenantConstBaseCfgData

class CopymapMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.CopymapMonsterNewBaseCfgData = CopymapMonsterNewBaseCfgData

class CopymapBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  副本ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  副本名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  副本类型_emCopymapType */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  副本子类型_emCopymapSubType */
		 static getSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.subType;
			}
			return 0;
		}
		 /**  需要玩家战力 */
		 static getNeedFightPowerByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightPower;
			}
			return 0;
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  副本日进入次数 */
		 static getDailyEnterCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dailyEnterCount;
			}
			return 0;
		}
		 /**  怪物数据Index */
		 static getMonsterByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  增加奖励 */
		 static getAddPrizeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}
		 /**  扫荡需要的道具 */
		 static getSweepNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sweepNeedItem;
			}
			return ""
		}
		 /**  难易程度 */
		 static getNayiDuByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.nayiDu;
			}
			return 0;
		}
		 /**  难度序号0代表不显示，否则显示难度+序号 */
		 static getTypeIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeId;
			}
			return 0;
		}

}
	
cfg.CopymapBaseCfgData = CopymapBaseCfgData

class CopymapBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  副本ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  副本名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  副本类型_emCopymapType */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  副本子类型_emCopymapSubType */
		 static getSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.subType;
			}
			return 0;
		}
		 /**  需要玩家战力 */
		 static getNeedFightPowerByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightPower;
			}
			return 0;
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  副本日进入次数 */
		 static getDailyEnterCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dailyEnterCount;
			}
			return 0;
		}
		 /**  怪物数据Index */
		 static getMonsterByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  增加奖励 */
		 static getAddPrizeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}
		 /**  扫荡需要的道具 */
		 static getSweepNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sweepNeedItem;
			}
			return ""
		}
		 /**  难易程度 */
		 static getNayiDuByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.nayiDu;
			}
			return 0;
		}
		 /**  难度序号0代表不显示，否则显示难度+序号 */
		 static getTypeIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeId;
			}
			return 0;
		}

}
	
cfg.CopymapBaseCfgData = CopymapBaseCfgData

class CopymapBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  副本ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  副本名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  副本类型_emCopymapType */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  副本子类型_emCopymapSubType */
		 static getSubTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.subType;
			}
			return 0;
		}
		 /**  需要玩家战力 */
		 static getNeedFightPowerByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightPower;
			}
			return 0;
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  副本日进入次数 */
		 static getDailyEnterCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dailyEnterCount;
			}
			return 0;
		}
		 /**  怪物数据Index */
		 static getMonsterByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  增加奖励 */
		 static getAddPrizeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}
		 /**  扫荡需要的道具 */
		 static getSweepNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sweepNeedItem;
			}
			return ""
		}
		 /**  难易程度 */
		 static getNayiDuByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.nayiDu;
			}
			return 0;
		}
		 /**  难度序号0代表不显示，否则显示难度+序号 */
		 static getTypeIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeId;
			}
			return 0;
		}

}
	
cfg.CopymapBaseCfgData = CopymapBaseCfgData

class CopymapMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.CopymapMonsterNewBaseCfgData = CopymapMonsterNewBaseCfgData

class CopymapMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.CopymapMonsterNewBaseCfgData = CopymapMonsterNewBaseCfgData

class CrossChallengeDailyPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  次数 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeDailyPrizeBaseCfgData = CrossChallengeDailyPrizeBaseCfgData

class CrossChallengeRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.CrossChallengeRobotBaseCfgData = CrossChallengeRobotBaseCfgData

class CrossChallengeRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.CrossChallengeRobotBaseCfgData = CrossChallengeRobotBaseCfgData

class CrossChallengeLosePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  购买需要物品 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeLosePrizeBaseCfgData = CrossChallengeLosePrizeBaseCfgData

class CrossChallengeDailyPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  次数 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeDailyPrizeBaseCfgData = CrossChallengeDailyPrizeBaseCfgData

class CrossChallengeConstantsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "initScore");
		};
		 /**  初始积分 */
		 static getInitScoreByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initScore;
			}
			return 0;
		}
		 /**  挑战消耗物品 */
		 static getNeedItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  膜拜获得物品 */
		 static getLikeAddItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likeAddItem;
			}
			return ""
		}
		 /**  可跳过战斗次数 */
		 static getSweepNeedCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sweepNeedCount;
			}
			return 0;
		}
		 /**  赛季天数 */
		 static getSeasonDaysByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.seasonDays;
			}
			return 0;
		}
		 /**  随机积分差 */
		 static getRandScoreRangeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randScoreRange;
			}
			return 0;
		}
		 /**  随机匹配次数 */
		 static getRandScoreCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randScoreCount;
			}
			return 0;
		}
		 /**  战斗奖励个数 */
		 static getPrizeCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeCount;
			}
			return 0;
		}
		 /**  名次隐藏队伍 */
		 static getRankHideByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rankHide;
			}
			return ""
		}

}
	
cfg.CrossChallengeConstantsBaseCfgData = CrossChallengeConstantsBaseCfgData

class CrossChallengeConstantsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "initScore");
		};
		 /**  初始积分 */
		 static getInitScoreByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initScore;
			}
			return 0;
		}
		 /**  挑战消耗物品 */
		 static getNeedItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  膜拜获得物品 */
		 static getLikeAddItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likeAddItem;
			}
			return ""
		}
		 /**  可跳过战斗次数 */
		 static getSweepNeedCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sweepNeedCount;
			}
			return 0;
		}
		 /**  赛季天数 */
		 static getSeasonDaysByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.seasonDays;
			}
			return 0;
		}
		 /**  随机积分差 */
		 static getRandScoreRangeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randScoreRange;
			}
			return 0;
		}
		 /**  随机匹配次数 */
		 static getRandScoreCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randScoreCount;
			}
			return 0;
		}
		 /**  战斗奖励个数 */
		 static getPrizeCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeCount;
			}
			return 0;
		}
		 /**  名次隐藏队伍 */
		 static getRankHideByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rankHide;
			}
			return ""
		}

}
	
cfg.CrossChallengeConstantsBaseCfgData = CrossChallengeConstantsBaseCfgData

class CrossChallengeWinPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  购买需要物品 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeWinPrizeBaseCfgData = CrossChallengeWinPrizeBaseCfgData

class CrossChallengeRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.CrossChallengeRobotBaseCfgData = CrossChallengeRobotBaseCfgData

class CrossChallengeWinPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  购买需要物品 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeWinPrizeBaseCfgData = CrossChallengeWinPrizeBaseCfgData

class CrossChallengeDailyPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  次数 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeDailyPrizeBaseCfgData = CrossChallengeDailyPrizeBaseCfgData

class CrossChallengeTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeTopPrizeBaseCfgData = CrossChallengeTopPrizeBaseCfgData

class CrossChallengeMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.CrossChallengeMonsterNewBaseCfgData = CrossChallengeMonsterNewBaseCfgData

class CrossChallengeTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeTopPrizeBaseCfgData = CrossChallengeTopPrizeBaseCfgData

class CrossChallengeMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.CrossChallengeMonsterNewBaseCfgData = CrossChallengeMonsterNewBaseCfgData

class CrossChallengeConstantsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "initScore");
		};
		 /**  初始积分 */
		 static getInitScoreByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initScore;
			}
			return 0;
		}
		 /**  挑战消耗物品 */
		 static getNeedItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  膜拜获得物品 */
		 static getLikeAddItemByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likeAddItem;
			}
			return ""
		}
		 /**  可跳过战斗次数 */
		 static getSweepNeedCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sweepNeedCount;
			}
			return 0;
		}
		 /**  赛季天数 */
		 static getSeasonDaysByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.seasonDays;
			}
			return 0;
		}
		 /**  随机积分差 */
		 static getRandScoreRangeByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randScoreRange;
			}
			return 0;
		}
		 /**  随机匹配次数 */
		 static getRandScoreCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randScoreCount;
			}
			return 0;
		}
		 /**  战斗奖励个数 */
		 static getPrizeCountByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeCount;
			}
			return 0;
		}
		 /**  名次隐藏队伍 */
		 static getRankHideByInitScore(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rankHide;
			}
			return ""
		}

}
	
cfg.CrossChallengeConstantsBaseCfgData = CrossChallengeConstantsBaseCfgData

class CrossChallengeWinPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  购买需要物品 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeWinPrizeBaseCfgData = CrossChallengeWinPrizeBaseCfgData

class CrossChallengeLosePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  购买需要物品 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeLosePrizeBaseCfgData = CrossChallengeLosePrizeBaseCfgData

class CrossChallengeTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeTopPrizeBaseCfgData = CrossChallengeTopPrizeBaseCfgData

class CrossChallengeLosePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  购买需要物品 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.CrossChallengeLosePrizeBaseCfgData = CrossChallengeLosePrizeBaseCfgData

class CrossChallengeMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.CrossChallengeMonsterNewBaseCfgData = CrossChallengeMonsterNewBaseCfgData

class CustomGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  充值ID */
		 static getChargeIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chargeId;
			}
			return 0;
		}
		 /**  道具数量 */
		 static getItemNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemNum;
			}
			return ""
		}
		 /**  限购数量 */
		 static getLimitNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitNum;
			}
			return 0;
		}
		 /**  定制池 */
		 static getCustomPoolByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.customPool;
			}
			return ""
		}

}
	
cfg.CustomGiftBaseCfgData = CustomGiftBaseCfgData

class CustomGiftGiftpoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  奖励序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  池子ID */
		 static getPoolIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolID;
			}
			return 0;
		}
		 /**  池子物品序号 */
		 static getPoolItemIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolItemIndex;
			}
			return 0;
		}
		 /**  物品 */
		 static getItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.item;
			}
			return ""
		}

}
	
cfg.CustomGiftGiftpoolBaseCfgData = CustomGiftGiftpoolBaseCfgData

class CustomGiftGiftpoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  奖励序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  池子ID */
		 static getPoolIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolID;
			}
			return 0;
		}
		 /**  池子物品序号 */
		 static getPoolItemIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolItemIndex;
			}
			return 0;
		}
		 /**  物品 */
		 static getItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.item;
			}
			return ""
		}

}
	
cfg.CustomGiftGiftpoolBaseCfgData = CustomGiftGiftpoolBaseCfgData

class CustomGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  充值ID */
		 static getChargeIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chargeId;
			}
			return 0;
		}
		 /**  道具数量 */
		 static getItemNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemNum;
			}
			return ""
		}
		 /**  限购数量 */
		 static getLimitNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitNum;
			}
			return 0;
		}
		 /**  定制池 */
		 static getCustomPoolByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.customPool;
			}
			return ""
		}

}
	
cfg.CustomGiftBaseCfgData = CustomGiftBaseCfgData

class CustomGiftBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  活动ID */
		 static getActivityIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  充值ID */
		 static getChargeIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chargeId;
			}
			return 0;
		}
		 /**  道具数量 */
		 static getItemNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemNum;
			}
			return ""
		}
		 /**  限购数量 */
		 static getLimitNumByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limitNum;
			}
			return 0;
		}
		 /**  定制池 */
		 static getCustomPoolByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.customPool;
			}
			return ""
		}

}
	
cfg.CustomGiftBaseCfgData = CustomGiftBaseCfgData

class CustomGiftGiftpoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  奖励序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  池子ID */
		 static getPoolIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolID;
			}
			return 0;
		}
		 /**  池子物品序号 */
		 static getPoolItemIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolItemIndex;
			}
			return 0;
		}
		 /**  物品 */
		 static getItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.item;
			}
			return ""
		}

}
	
cfg.CustomGiftGiftpoolBaseCfgData = CustomGiftGiftpoolBaseCfgData

class DanTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  名次 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  需要段位ID */
		 static getNeedDanIDByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDanID;
			}
			return 0;
		}
		 /**  增加称号ID */
		 static getAddTitleByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addTitle;
			}
			return 0;
		}

}
	
cfg.DanTopPrizeBaseCfgData = DanTopPrizeBaseCfgData

class DanAreaBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  区域ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  区域名称 */
		 static getAreaNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.areaName;
			}
			return ""
		}
		 /**  区域图标id */
		 static getIconIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iconId;
			}
			return ""
		}

}
	
cfg.DanAreaBaseCfgData = DanAreaBaseCfgData

class DanFightPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "result");
		};
		 /**  结果0;//胜利1;//失败2;//平局 */
		 static getResultByResult(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.result;
			}
			return 0;
		}

}
	
cfg.DanFightPrizeBaseCfgData = DanFightPrizeBaseCfgData

class DanBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要vip等级 */
		 static getNeedVipLevelByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needVipLevel;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.DanBuyCountBaseCfgData = DanBuyCountBaseCfgData

class DanUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "danID");
		};
		 /**  段位ID */
		 static getDanIDByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danID;
			}
			return 0;
		}
		 /**  段位名称 */
		 static getDanNameByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danName;
			}
			return ""
		}
		 /**  类型 */
		 static getTypeByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  最大经验 */
		 static getMaxExpByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  缓冲经验 */
		 static getCacheExpByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cacheExp;
			}
			return 0;
		}
		 /**  首达奖励 */
		 static getFirstPrizeByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstPrize;
			}
			return ""
		}
		 /**  段位奖励 */
		 static getDanPrizeByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danPrize;
			}
			return ""
		}
		 /**  继承段位ID */
		 static getInheritDanIDByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.inheritDanID;
			}
			return 0;
		}
		 /**  晋级胜场数胜场_总场次 */
		 static getPromoteWinCountByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.promoteWinCount;
			}
			return ""
		}

}
	
cfg.DanUpgradeBaseCfgData = DanUpgradeBaseCfgData

class DanConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "name");
		};
		 /**  玩法名称 */
		 static getNameByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要世界等级 */
		 static getNeedWorldLevelByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needWorldLevel;
			}
			return 0;
		}
		 /**  开启第二队需要神器ID */
		 static getTeam2NeedArifactByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.team2NeedArifact;
			}
			return 0;
		}
		 /**  每日挑战次数 */
		 static getDayFightCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFightCount;
			}
			return 0;
		}
		 /**  初始积分 */
		 static getInitScoreByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initScore;
			}
			return 0;
		}
		 /**  初始段位ID */
		 static getInitDanIDByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initDanID;
			}
			return 0;
		}
		 /**  服务器个数 */
		 static getServerCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.serverCount;
			}
			return 0;
		}
		 /**  赛季天数 */
		 static getSeasonDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.seasonDays;
			}
			return 0;
		}
		 /**  上半个赛季总天数 */
		 static getUpSeasonDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.upSeasonDays;
			}
			return 0;
		}
		 /**  下半个赛季总天数 */
		 static getLowSeasonDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lowSeasonDays;
			}
			return 0;
		}
		 /**  王者赛开启天数 */
		 static getKingOpenDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.kingOpenDays;
			}
			return 0;
		}
		 /**  王者赛准入段位 */
		 static getKingNeedDanByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.kingNeedDan;
			}
			return 0;
		}
		 /**  匹配积分区间百分比 */
		 static getMatchScoreRateByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.matchScoreRate;
			}
			return ""
		}
		 /**  胜利增加经验区间 */
		 static getSucAddExpByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sucAddExp;
			}
			return ""
		}
		 /**  失败失去经验区间 */
		 static getFailDelExpByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failDelExp;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  大师段位 */
		 static getMasterDanByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.masterDan;
			}
			return 0;
		}
		 /**  个人记录数 */
		 static getRecordNumByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.recordNum;
			}
			return 0;
		}
		 /**  大师记录数 */
		 static getMasterRecordNumByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.masterRecordNum;
			}
			return 0;
		}

}
	
cfg.DanConstBaseCfgData = DanConstBaseCfgData

class DanUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "danID");
		};
		 /**  段位ID */
		 static getDanIDByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danID;
			}
			return 0;
		}
		 /**  段位名称 */
		 static getDanNameByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danName;
			}
			return ""
		}
		 /**  类型 */
		 static getTypeByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  最大经验 */
		 static getMaxExpByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  缓冲经验 */
		 static getCacheExpByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cacheExp;
			}
			return 0;
		}
		 /**  首达奖励 */
		 static getFirstPrizeByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstPrize;
			}
			return ""
		}
		 /**  段位奖励 */
		 static getDanPrizeByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danPrize;
			}
			return ""
		}
		 /**  继承段位ID */
		 static getInheritDanIDByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.inheritDanID;
			}
			return 0;
		}
		 /**  晋级胜场数胜场_总场次 */
		 static getPromoteWinCountByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.promoteWinCount;
			}
			return ""
		}

}
	
cfg.DanUpgradeBaseCfgData = DanUpgradeBaseCfgData

class DanTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  名次 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  需要段位ID */
		 static getNeedDanIDByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDanID;
			}
			return 0;
		}
		 /**  增加称号ID */
		 static getAddTitleByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addTitle;
			}
			return 0;
		}

}
	
cfg.DanTopPrizeBaseCfgData = DanTopPrizeBaseCfgData

class DanAreaBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  区域ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  区域名称 */
		 static getAreaNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.areaName;
			}
			return ""
		}
		 /**  区域图标id */
		 static getIconIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iconId;
			}
			return ""
		}

}
	
cfg.DanAreaBaseCfgData = DanAreaBaseCfgData

class DanFightPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "result");
		};
		 /**  结果0;//胜利1;//失败2;//平局 */
		 static getResultByResult(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.result;
			}
			return 0;
		}

}
	
cfg.DanFightPrizeBaseCfgData = DanFightPrizeBaseCfgData

class DanBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要vip等级 */
		 static getNeedVipLevelByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needVipLevel;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.DanBuyCountBaseCfgData = DanBuyCountBaseCfgData

class DanFightPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "result");
		};
		 /**  结果0;//胜利1;//失败2;//平局 */
		 static getResultByResult(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.result;
			}
			return 0;
		}

}
	
cfg.DanFightPrizeBaseCfgData = DanFightPrizeBaseCfgData

class DanAreaBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  区域ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  区域名称 */
		 static getAreaNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.areaName;
			}
			return ""
		}
		 /**  区域图标id */
		 static getIconIdByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iconId;
			}
			return ""
		}

}
	
cfg.DanAreaBaseCfgData = DanAreaBaseCfgData

class DanTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  名次 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  需要段位ID */
		 static getNeedDanIDByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDanID;
			}
			return 0;
		}
		 /**  增加称号ID */
		 static getAddTitleByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addTitle;
			}
			return 0;
		}

}
	
cfg.DanTopPrizeBaseCfgData = DanTopPrizeBaseCfgData

class DanConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "name");
		};
		 /**  玩法名称 */
		 static getNameByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要世界等级 */
		 static getNeedWorldLevelByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needWorldLevel;
			}
			return 0;
		}
		 /**  开启第二队需要神器ID */
		 static getTeam2NeedArifactByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.team2NeedArifact;
			}
			return 0;
		}
		 /**  每日挑战次数 */
		 static getDayFightCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFightCount;
			}
			return 0;
		}
		 /**  初始积分 */
		 static getInitScoreByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initScore;
			}
			return 0;
		}
		 /**  初始段位ID */
		 static getInitDanIDByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initDanID;
			}
			return 0;
		}
		 /**  服务器个数 */
		 static getServerCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.serverCount;
			}
			return 0;
		}
		 /**  赛季天数 */
		 static getSeasonDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.seasonDays;
			}
			return 0;
		}
		 /**  上半个赛季总天数 */
		 static getUpSeasonDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.upSeasonDays;
			}
			return 0;
		}
		 /**  下半个赛季总天数 */
		 static getLowSeasonDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lowSeasonDays;
			}
			return 0;
		}
		 /**  王者赛开启天数 */
		 static getKingOpenDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.kingOpenDays;
			}
			return 0;
		}
		 /**  王者赛准入段位 */
		 static getKingNeedDanByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.kingNeedDan;
			}
			return 0;
		}
		 /**  匹配积分区间百分比 */
		 static getMatchScoreRateByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.matchScoreRate;
			}
			return ""
		}
		 /**  胜利增加经验区间 */
		 static getSucAddExpByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sucAddExp;
			}
			return ""
		}
		 /**  失败失去经验区间 */
		 static getFailDelExpByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failDelExp;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  大师段位 */
		 static getMasterDanByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.masterDan;
			}
			return 0;
		}
		 /**  个人记录数 */
		 static getRecordNumByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.recordNum;
			}
			return 0;
		}
		 /**  大师记录数 */
		 static getMasterRecordNumByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.masterRecordNum;
			}
			return 0;
		}

}
	
cfg.DanConstBaseCfgData = DanConstBaseCfgData

class DanBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要vip等级 */
		 static getNeedVipLevelByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needVipLevel;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.DanBuyCountBaseCfgData = DanBuyCountBaseCfgData

class DanConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "name");
		};
		 /**  玩法名称 */
		 static getNameByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要世界等级 */
		 static getNeedWorldLevelByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needWorldLevel;
			}
			return 0;
		}
		 /**  开启第二队需要神器ID */
		 static getTeam2NeedArifactByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.team2NeedArifact;
			}
			return 0;
		}
		 /**  每日挑战次数 */
		 static getDayFightCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFightCount;
			}
			return 0;
		}
		 /**  初始积分 */
		 static getInitScoreByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initScore;
			}
			return 0;
		}
		 /**  初始段位ID */
		 static getInitDanIDByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initDanID;
			}
			return 0;
		}
		 /**  服务器个数 */
		 static getServerCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.serverCount;
			}
			return 0;
		}
		 /**  赛季天数 */
		 static getSeasonDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.seasonDays;
			}
			return 0;
		}
		 /**  上半个赛季总天数 */
		 static getUpSeasonDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.upSeasonDays;
			}
			return 0;
		}
		 /**  下半个赛季总天数 */
		 static getLowSeasonDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lowSeasonDays;
			}
			return 0;
		}
		 /**  王者赛开启天数 */
		 static getKingOpenDaysByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.kingOpenDays;
			}
			return 0;
		}
		 /**  王者赛准入段位 */
		 static getKingNeedDanByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.kingNeedDan;
			}
			return 0;
		}
		 /**  匹配积分区间百分比 */
		 static getMatchScoreRateByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.matchScoreRate;
			}
			return ""
		}
		 /**  胜利增加经验区间 */
		 static getSucAddExpByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sucAddExp;
			}
			return ""
		}
		 /**  失败失去经验区间 */
		 static getFailDelExpByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failDelExp;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  大师段位 */
		 static getMasterDanByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.masterDan;
			}
			return 0;
		}
		 /**  个人记录数 */
		 static getRecordNumByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.recordNum;
			}
			return 0;
		}
		 /**  大师记录数 */
		 static getMasterRecordNumByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.masterRecordNum;
			}
			return 0;
		}

}
	
cfg.DanConstBaseCfgData = DanConstBaseCfgData

class DanUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "danID");
		};
		 /**  段位ID */
		 static getDanIDByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danID;
			}
			return 0;
		}
		 /**  段位名称 */
		 static getDanNameByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danName;
			}
			return ""
		}
		 /**  类型 */
		 static getTypeByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  最大经验 */
		 static getMaxExpByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  缓冲经验 */
		 static getCacheExpByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cacheExp;
			}
			return 0;
		}
		 /**  首达奖励 */
		 static getFirstPrizeByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstPrize;
			}
			return ""
		}
		 /**  段位奖励 */
		 static getDanPrizeByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.danPrize;
			}
			return ""
		}
		 /**  继承段位ID */
		 static getInheritDanIDByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.inheritDanID;
			}
			return 0;
		}
		 /**  晋级胜场数胜场_总场次 */
		 static getPromoteWinCountByDanID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.promoteWinCount;
			}
			return ""
		}

}
	
cfg.DanUpgradeBaseCfgData = DanUpgradeBaseCfgData

class DefendSlotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "slot");
		};
		 /**  槽位 */
		 static getSlotBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.slot;
			}
			return 0;
		}
		 /**  守护等级 */
		 static getLevelBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  守护阶级 */
		 static getRankBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  解锁条件说明 */
		 static getUnlockDescBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.unlockDesc;
			}
			return ""
		}

}
	
cfg.DefendSlotBaseCfgData = DefendSlotBaseCfgData

class DefendPlanBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  开启消耗 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.DefendPlanBaseCfgData = DefendPlanBaseCfgData

class DefendSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  英雄id */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  英雄星级 */
		 static getPetStarByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  技能id */
		 static getSkillIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillLevelByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillLevel;
			}
			return 0;
		}
		 /**  技能评分 */
		 static getSkillScoreByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillScore;
			}
			return 0;
		}

}
	
cfg.DefendSkillBaseCfgData = DefendSkillBaseCfgData

class DefendRankBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  阶级 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  模型 */
		 static getModelByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.model;
			}
			return ""
		}
		 /**  此等级上限 */
		 static getMaxLevelByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  升阶需要道具最后一个为空 */
		 static getNeedItemByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  进阶提示 */
		 static getTipsByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tips;
			}
			return ""
		}
		 /**  基础属性 */
		 static getBaseAttrByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseAttr;
			}
			return ""
		}
		 /**  精灵加成(给战斗精灵加成) */
		 static getAddPetAttrByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPetAttr;
			}
			return ""
		}
		 /**  (属性|值|百分比;)（守护精灵给精灵球加的属性） */
		 static getAddPercentByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPercent;
			}
			return ""
		}

}
	
cfg.DefendRankBaseCfgData = DefendRankBaseCfgData

class DefendPlanBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  开启消耗 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.DefendPlanBaseCfgData = DefendPlanBaseCfgData

class DefendSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  英雄id */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  英雄星级 */
		 static getPetStarByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  技能id */
		 static getSkillIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillLevelByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillLevel;
			}
			return 0;
		}
		 /**  技能评分 */
		 static getSkillScoreByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillScore;
			}
			return 0;
		}

}
	
cfg.DefendSkillBaseCfgData = DefendSkillBaseCfgData

class DefendSlotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "slot");
		};
		 /**  槽位 */
		 static getSlotBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.slot;
			}
			return 0;
		}
		 /**  守护等级 */
		 static getLevelBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  守护阶级 */
		 static getRankBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  解锁条件说明 */
		 static getUnlockDescBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.unlockDesc;
			}
			return ""
		}

}
	
cfg.DefendSlotBaseCfgData = DefendSlotBaseCfgData

class DefendLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升需要道具最后一个为空 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  基础属性 */
		 static getBaseAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseAttr;
			}
			return ""
		}
		 /**  精灵加成(给战斗精灵加成) */
		 static getAddPetAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPetAttr;
			}
			return ""
		}
		 /**  (属性|值|百分比;)（守护精灵给精灵球加的属性） */
		 static getAddPercentByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPercent;
			}
			return ""
		}

}
	
cfg.DefendLevelBaseCfgData = DefendLevelBaseCfgData

class DefendRankBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  阶级 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  模型 */
		 static getModelByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.model;
			}
			return ""
		}
		 /**  此等级上限 */
		 static getMaxLevelByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  升阶需要道具最后一个为空 */
		 static getNeedItemByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  进阶提示 */
		 static getTipsByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tips;
			}
			return ""
		}
		 /**  基础属性 */
		 static getBaseAttrByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseAttr;
			}
			return ""
		}
		 /**  精灵加成(给战斗精灵加成) */
		 static getAddPetAttrByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPetAttr;
			}
			return ""
		}
		 /**  (属性|值|百分比;)（守护精灵给精灵球加的属性） */
		 static getAddPercentByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPercent;
			}
			return ""
		}

}
	
cfg.DefendRankBaseCfgData = DefendRankBaseCfgData

class DefendLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升需要道具最后一个为空 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  基础属性 */
		 static getBaseAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseAttr;
			}
			return ""
		}
		 /**  精灵加成(给战斗精灵加成) */
		 static getAddPetAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPetAttr;
			}
			return ""
		}
		 /**  (属性|值|百分比;)（守护精灵给精灵球加的属性） */
		 static getAddPercentByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPercent;
			}
			return ""
		}

}
	
cfg.DefendLevelBaseCfgData = DefendLevelBaseCfgData

class DefendLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升需要道具最后一个为空 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  基础属性 */
		 static getBaseAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseAttr;
			}
			return ""
		}
		 /**  精灵加成(给战斗精灵加成) */
		 static getAddPetAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPetAttr;
			}
			return ""
		}
		 /**  (属性|值|百分比;)（守护精灵给精灵球加的属性） */
		 static getAddPercentByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPercent;
			}
			return ""
		}

}
	
cfg.DefendLevelBaseCfgData = DefendLevelBaseCfgData

class DefendPlanBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  序号 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  开启消耗 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.DefendPlanBaseCfgData = DefendPlanBaseCfgData

class DefendSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  英雄id */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  英雄星级 */
		 static getPetStarByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  技能id */
		 static getSkillIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillLevelByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillLevel;
			}
			return 0;
		}
		 /**  技能评分 */
		 static getSkillScoreByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillScore;
			}
			return 0;
		}

}
	
cfg.DefendSkillBaseCfgData = DefendSkillBaseCfgData

class DefendSlotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "slot");
		};
		 /**  槽位 */
		 static getSlotBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.slot;
			}
			return 0;
		}
		 /**  守护等级 */
		 static getLevelBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  守护阶级 */
		 static getRankBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  解锁条件说明 */
		 static getUnlockDescBySlot(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.unlockDesc;
			}
			return ""
		}

}
	
cfg.DefendSlotBaseCfgData = DefendSlotBaseCfgData

class DefendRankBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  阶级 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  模型 */
		 static getModelByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.model;
			}
			return ""
		}
		 /**  此等级上限 */
		 static getMaxLevelByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  升阶需要道具最后一个为空 */
		 static getNeedItemByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  进阶提示 */
		 static getTipsByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tips;
			}
			return ""
		}
		 /**  基础属性 */
		 static getBaseAttrByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseAttr;
			}
			return ""
		}
		 /**  精灵加成(给战斗精灵加成) */
		 static getAddPetAttrByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPetAttr;
			}
			return ""
		}
		 /**  (属性|值|百分比;)（守护精灵给精灵球加的属性） */
		 static getAddPercentByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPercent;
			}
			return ""
		}

}
	
cfg.DefendRankBaseCfgData = DefendRankBaseCfgData

class DipBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  名次 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}

}
	
cfg.DipBaseCfgData = DipBaseCfgData

class DipBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  名次 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}

}
	
cfg.DipBaseCfgData = DipBaseCfgData

class DipBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  名次 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}

}
	
cfg.DipBaseCfgData = DipBaseCfgData

class DragonBallLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升到下一级需要道具 */
		 static getNeedItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  属性加成 */
		 static getAttrByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}

}
	
cfg.DragonBallLevelBaseCfgData = DragonBallLevelBaseCfgData

class DragonBallUnlockBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  解锁需要道具 */
		 static getNeedItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.DragonBallUnlockBaseCfgData = DragonBallUnlockBaseCfgData

class DragonBallUnlockBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  解锁需要道具 */
		 static getNeedItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.DragonBallUnlockBaseCfgData = DragonBallUnlockBaseCfgData

class DragonBallLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升到下一级需要道具 */
		 static getNeedItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  属性加成 */
		 static getAttrByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}

}
	
cfg.DragonBallLevelBaseCfgData = DragonBallLevelBaseCfgData

class DragonBallUnlockBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  解锁需要道具 */
		 static getNeedItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.DragonBallUnlockBaseCfgData = DragonBallUnlockBaseCfgData

class DragonBallLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升到下一级需要道具 */
		 static getNeedItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  属性加成 */
		 static getAttrByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}

}
	
cfg.DragonBallLevelBaseCfgData = DragonBallLevelBaseCfgData

class DropDropGroupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "groupID");
		};
		 /**  组ID */
		 static getGroupIDByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}

}
	
cfg.DropDropGroupBaseCfgData = DropDropGroupBaseCfgData

class DropDropBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "dropID");
		};
		 /**  掉落ID */
		 static getDropIDByDropID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dropID;
			}
			return 0;
		}
		 /**  固定奖励 */
		 static getAddItemByDropID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.DropDropBaseCfgData = DropDropBaseCfgData

class DropDropBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "dropID");
		};
		 /**  掉落ID */
		 static getDropIDByDropID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dropID;
			}
			return 0;
		}
		 /**  固定奖励 */
		 static getAddItemByDropID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.DropDropBaseCfgData = DropDropBaseCfgData

class DropDropGroupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "groupID");
		};
		 /**  组ID */
		 static getGroupIDByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}

}
	
cfg.DropDropGroupBaseCfgData = DropDropGroupBaseCfgData

class DropDropBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "dropID");
		};
		 /**  掉落ID */
		 static getDropIDByDropID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dropID;
			}
			return 0;
		}
		 /**  固定奖励 */
		 static getAddItemByDropID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.DropDropBaseCfgData = DropDropBaseCfgData

class DropDropGroupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "groupID");
		};
		 /**  组ID */
		 static getGroupIDByGroupID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.groupID;
			}
			return 0;
		}

}
	
cfg.DropDropGroupBaseCfgData = DropDropGroupBaseCfgData

class ElementMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  Boss序号 */
		 static getBossIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossIndex;
			}
			return 0;
		}
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}

}
	
cfg.ElementMonsterNewBaseCfgData = ElementMonsterNewBaseCfgData

class ElementOpentimeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型_emPetType */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  开启时间 */
		 static getOpenTimeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  开启时间提示 */
		 static getOpenTimeTipsByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTimeTips;
			}
			return ""
		}
		 /**  名称 */
		 static getNameByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.ElementOpentimeBaseCfgData = ElementOpentimeBaseCfgData

class ElementStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  第几周 */
		 static getWeekByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.week;
			}
			return 0;
		}
		 /**  类型_emPetType */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  需要伙伴类型类型_个数 */
		 static getNeedPetTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetType;
			}
			return ""
		}
		 /**  需要等级 */
		 static getNeedPlayerLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  需要战斗力 */
		 static getNeedFightPowerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightPower;
			}
			return 0;
		}
		 /**  Boss序号 */
		 static getBossIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossIndex;
			}
			return 0;
		}
		 /**  圣殿威压技能 */
		 static getBossSkillIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossSkillId;
			}
			return 0;
		}
		 /**  怪物数据 */
		 static getMonsterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  首通奖励 */
		 static getFirstAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAddItem;
			}
			return ""
		}
		 /**  通关奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ElementStageBaseCfgData = ElementStageBaseCfgData

class ElementBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要钻石 */
		 static getNeedDiamondByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDiamond;
			}
			return 0;
		}

}
	
cfg.ElementBuyCountBaseCfgData = ElementBuyCountBaseCfgData

class ElementStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  第几周 */
		 static getWeekByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.week;
			}
			return 0;
		}
		 /**  类型_emPetType */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  需要伙伴类型类型_个数 */
		 static getNeedPetTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetType;
			}
			return ""
		}
		 /**  需要等级 */
		 static getNeedPlayerLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  需要战斗力 */
		 static getNeedFightPowerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightPower;
			}
			return 0;
		}
		 /**  Boss序号 */
		 static getBossIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossIndex;
			}
			return 0;
		}
		 /**  圣殿威压技能 */
		 static getBossSkillIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossSkillId;
			}
			return 0;
		}
		 /**  怪物数据 */
		 static getMonsterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  首通奖励 */
		 static getFirstAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAddItem;
			}
			return ""
		}
		 /**  通关奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ElementStageBaseCfgData = ElementStageBaseCfgData

class ElementStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  第几周 */
		 static getWeekByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.week;
			}
			return 0;
		}
		 /**  类型_emPetType */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  需要伙伴类型类型_个数 */
		 static getNeedPetTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetType;
			}
			return ""
		}
		 /**  需要等级 */
		 static getNeedPlayerLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  需要战斗力 */
		 static getNeedFightPowerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightPower;
			}
			return 0;
		}
		 /**  Boss序号 */
		 static getBossIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossIndex;
			}
			return 0;
		}
		 /**  圣殿威压技能 */
		 static getBossSkillIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossSkillId;
			}
			return 0;
		}
		 /**  怪物数据 */
		 static getMonsterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  首通奖励 */
		 static getFirstAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAddItem;
			}
			return ""
		}
		 /**  通关奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.ElementStageBaseCfgData = ElementStageBaseCfgData

class ElementBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要钻石 */
		 static getNeedDiamondByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDiamond;
			}
			return 0;
		}

}
	
cfg.ElementBuyCountBaseCfgData = ElementBuyCountBaseCfgData

class ElementMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  Boss序号 */
		 static getBossIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossIndex;
			}
			return 0;
		}
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}

}
	
cfg.ElementMonsterNewBaseCfgData = ElementMonsterNewBaseCfgData

class ElementOpentimeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型_emPetType */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  开启时间 */
		 static getOpenTimeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  开启时间提示 */
		 static getOpenTimeTipsByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTimeTips;
			}
			return ""
		}
		 /**  名称 */
		 static getNameByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.ElementOpentimeBaseCfgData = ElementOpentimeBaseCfgData

class ElementOpentimeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型_emPetType */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  开启时间 */
		 static getOpenTimeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  开启时间提示 */
		 static getOpenTimeTipsByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTimeTips;
			}
			return ""
		}
		 /**  名称 */
		 static getNameByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.ElementOpentimeBaseCfgData = ElementOpentimeBaseCfgData

class ElementMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  Boss序号 */
		 static getBossIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossIndex;
			}
			return 0;
		}
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}

}
	
cfg.ElementMonsterNewBaseCfgData = ElementMonsterNewBaseCfgData

class ElementBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要钻石 */
		 static getNeedDiamondByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDiamond;
			}
			return 0;
		}

}
	
cfg.ElementBuyCountBaseCfgData = ElementBuyCountBaseCfgData

class ExpeditionStageTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageType");
		};
		 /**  关卡 */
		 static getStageTypeByStageType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageType;
			}
			return 0;
		}
		 /**  需要战力 */
		 static getNeedFightPowerByStageType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightPower;
			}
			return 0;
		}
		 /**  奖励预览 */
		 static getAddPrizeByStageType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ExpeditionStageTypeBaseCfgData = ExpeditionStageTypeBaseCfgData

class ExpeditionStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  难度 */
		 static getExpeditionTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expeditionType;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}
		 /**  宝箱奖励 */
		 static getExtraPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.extraPrize;
			}
			return ""
		}
		 /**  战力区间百分比 */
		 static getFightpowerRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightpowerRate;
			}
			return ""
		}

}
	
cfg.ExpeditionStageBaseCfgData = ExpeditionStageBaseCfgData

class ExpeditionRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.ExpeditionRobotBaseCfgData = ExpeditionRobotBaseCfgData

class ExpeditionMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.ExpeditionMonsterNewBaseCfgData = ExpeditionMonsterNewBaseCfgData

class ExpeditionMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.ExpeditionMonsterNewBaseCfgData = ExpeditionMonsterNewBaseCfgData

class ExpeditionStageTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageType");
		};
		 /**  关卡 */
		 static getStageTypeByStageType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageType;
			}
			return 0;
		}
		 /**  需要战力 */
		 static getNeedFightPowerByStageType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightPower;
			}
			return 0;
		}
		 /**  奖励预览 */
		 static getAddPrizeByStageType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ExpeditionStageTypeBaseCfgData = ExpeditionStageTypeBaseCfgData

class ExpeditionRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.ExpeditionRobotBaseCfgData = ExpeditionRobotBaseCfgData

class ExpeditionStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  难度 */
		 static getExpeditionTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expeditionType;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}
		 /**  宝箱奖励 */
		 static getExtraPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.extraPrize;
			}
			return ""
		}
		 /**  战力区间百分比 */
		 static getFightpowerRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightpowerRate;
			}
			return ""
		}

}
	
cfg.ExpeditionStageBaseCfgData = ExpeditionStageBaseCfgData

class ExpeditionRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.ExpeditionRobotBaseCfgData = ExpeditionRobotBaseCfgData

class ExpeditionMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.ExpeditionMonsterNewBaseCfgData = ExpeditionMonsterNewBaseCfgData

class ExpeditionStageTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageType");
		};
		 /**  关卡 */
		 static getStageTypeByStageType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageType;
			}
			return 0;
		}
		 /**  需要战力 */
		 static getNeedFightPowerByStageType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needFightPower;
			}
			return 0;
		}
		 /**  奖励预览 */
		 static getAddPrizeByStageType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.ExpeditionStageTypeBaseCfgData = ExpeditionStageTypeBaseCfgData

class ExpeditionStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  难度 */
		 static getExpeditionTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expeditionType;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}
		 /**  宝箱奖励 */
		 static getExtraPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.extraPrize;
			}
			return ""
		}
		 /**  战力区间百分比 */
		 static getFightpowerRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightpowerRate;
			}
			return ""
		}

}
	
cfg.ExpeditionStageBaseCfgData = ExpeditionStageBaseCfgData

class FactionImpeachTimeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  需要离线时间 */
		 static getImpeachTimeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.impeachTime;
			}
			return 0;
		}

}
	
cfg.FactionImpeachTimeBaseCfgData = FactionImpeachTimeBaseCfgData

class FactionPvpSkillIndexBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "jobType");
		};
		 /**  职业类型 */
		 static getJobTypeByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jobType;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillLevelByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillLevel;
			}
			return 0;
		}
		 /**  技能索引 */
		 static getSkillIDByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  评分 */
		 static getAddScoreByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.FactionPvpSkillIndexBaseCfgData = FactionPvpSkillIndexBaseCfgData

class FactionMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}

}
	
cfg.FactionMonsterNewBaseCfgData = FactionMonsterNewBaseCfgData

class FactionSkillUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要所有技能等级 */
		 static getNeedAllSkillLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAllSkillLevel;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.FactionSkillUpgradeBaseCfgData = FactionSkillUpgradeBaseCfgData

class FactionSkillResetBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级（0表示第一次）(上等级，此等级] */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  返还比率道具ID_万分比 */
		 static getReturnItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnItem;
			}
			return ""
		}

}
	
cfg.FactionSkillResetBaseCfgData = FactionSkillResetBaseCfgData

class FactionCopymapBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  章节名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  怪物数据 */
		 static getMonsterByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  伤害奖励 */
		 static getDamagePrizeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.damagePrize;
			}
			return ""
		}
		 /**  击败奖励 */
		 static getKillPrizeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.killPrize;
			}
			return ""
		}

}
	
cfg.FactionCopymapBaseCfgData = FactionCopymapBaseCfgData

class FactionPvpSkillUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "skillType");
		};
		 /**  技能类型 */
		 static getSkillTypeBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要其他天赋技能最低等级 */
		 static getNeedAllSkillLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAllSkillLevel;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要本天赋其他技能最低等级 */
		 static getNeedOtherSkillLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needOtherSkillLevel;
			}
			return 0;
		}

}
	
cfg.FactionPvpSkillUpgradeBaseCfgData = FactionPvpSkillUpgradeBaseCfgData

class FactionCopymapTopprizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  ID */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  排名(上一名次，此名次] */
		 static getRankByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  奖励道具 */
		 static getBaseItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseItem;
			}
			return ""
		}

}
	
cfg.FactionCopymapTopprizeBaseCfgData = FactionCopymapTopprizeBaseCfgData

class FactionMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}

}
	
cfg.FactionMonsterNewBaseCfgData = FactionMonsterNewBaseCfgData

class FactionImpeachTimeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  需要离线时间 */
		 static getImpeachTimeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.impeachTime;
			}
			return 0;
		}

}
	
cfg.FactionImpeachTimeBaseCfgData = FactionImpeachTimeBaseCfgData

class FactionPvpSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  索引 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  职业类型 */
		 static getJobTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jobType;
			}
			return 0;
		}
		 /**  技能位置 */
		 static getSkillPosByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillPos;
			}
			return 0;
		}
		 /**  技能类型 */
		 static getSkillTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}
		 /**  每级增加属性属性类型|属性值|属性万分比 */
		 static getAddAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  评分 */
		 static getAddScoreByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.FactionPvpSkillBaseCfgData = FactionPvpSkillBaseCfgData

class FactionPvpSkillIndexBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "jobType");
		};
		 /**  职业类型 */
		 static getJobTypeByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jobType;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillLevelByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillLevel;
			}
			return 0;
		}
		 /**  技能索引 */
		 static getSkillIDByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  评分 */
		 static getAddScoreByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.FactionPvpSkillIndexBaseCfgData = FactionPvpSkillIndexBaseCfgData

class FactionPvpSkillUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "skillType");
		};
		 /**  技能类型 */
		 static getSkillTypeBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要其他天赋技能最低等级 */
		 static getNeedAllSkillLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAllSkillLevel;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要本天赋其他技能最低等级 */
		 static getNeedOtherSkillLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needOtherSkillLevel;
			}
			return 0;
		}

}
	
cfg.FactionPvpSkillUpgradeBaseCfgData = FactionPvpSkillUpgradeBaseCfgData

class FactionPvpSkillResetBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "skillType");
		};
		 /**  技能类型 */
		 static getSkillTypeBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}
		 /**  等级（0表示第一次）(上等级，此等级] */
		 static getLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  返还比率道具ID_万分比 */
		 static getReturnItemBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnItem;
			}
			return ""
		}

}
	
cfg.FactionPvpSkillResetBaseCfgData = FactionPvpSkillResetBaseCfgData

class FactionCopymapBuycountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.FactionCopymapBuycountBaseCfgData = FactionCopymapBuycountBaseCfgData

class FactionDonateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "donateType");
		};
		 /**  捐献类型 */
		 static getDonateTypeByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.donateType;
			}
			return 0;
		}
		 /**  捐献名称 */
		 static getNameByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加帮会经验 */
		 static getAddExpByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addExp;
			}
			return 0;
		}
		 /**  增加帮会贡献 */
		 static getAddContriByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addContri;
			}
			return 0;
		}

}
	
cfg.FactionDonateBaseCfgData = FactionDonateBaseCfgData

class FactionPvpSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  索引 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  职业类型 */
		 static getJobTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jobType;
			}
			return 0;
		}
		 /**  技能位置 */
		 static getSkillPosByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillPos;
			}
			return 0;
		}
		 /**  技能类型 */
		 static getSkillTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}
		 /**  每级增加属性属性类型|属性值|属性万分比 */
		 static getAddAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  评分 */
		 static getAddScoreByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.FactionPvpSkillBaseCfgData = FactionPvpSkillBaseCfgData

class FactionUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  帮会等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  最大帮派人数 */
		 static getMemberCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.memberCount;
			}
			return 0;
		}
		 /**  此级最大经验值 */
		 static getExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  副帮主个数 */
		 static getDeputyCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.deputyCount;
			}
			return 0;
		}

}
	
cfg.FactionUpgradeBaseCfgData = FactionUpgradeBaseCfgData

class FactionDonateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "donateType");
		};
		 /**  捐献类型 */
		 static getDonateTypeByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.donateType;
			}
			return 0;
		}
		 /**  捐献名称 */
		 static getNameByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加帮会经验 */
		 static getAddExpByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addExp;
			}
			return 0;
		}
		 /**  增加帮会贡献 */
		 static getAddContriByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addContri;
			}
			return 0;
		}

}
	
cfg.FactionDonateBaseCfgData = FactionDonateBaseCfgData

class FactionSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  索引 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  职业类型 */
		 static getJobTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jobType;
			}
			return 0;
		}
		 /**  技能位置 */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  每级增加属性属性类型|属性值|属性万分比 */
		 static getAddAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  评分 */
		 static getAddScoreByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  技能类型 */
		 static getSkillTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}

}
	
cfg.FactionSkillBaseCfgData = FactionSkillBaseCfgData

class FactionCopymapTopprizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  ID */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  排名(上一名次，此名次] */
		 static getRankByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  奖励道具 */
		 static getBaseItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseItem;
			}
			return ""
		}

}
	
cfg.FactionCopymapTopprizeBaseCfgData = FactionCopymapTopprizeBaseCfgData

class FactionPvpSkillResetBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "skillType");
		};
		 /**  技能类型 */
		 static getSkillTypeBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}
		 /**  等级（0表示第一次）(上等级，此等级] */
		 static getLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  返还比率道具ID_万分比 */
		 static getReturnItemBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnItem;
			}
			return ""
		}

}
	
cfg.FactionPvpSkillResetBaseCfgData = FactionPvpSkillResetBaseCfgData

class FactionSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  索引 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  职业类型 */
		 static getJobTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jobType;
			}
			return 0;
		}
		 /**  技能位置 */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  每级增加属性属性类型|属性值|属性万分比 */
		 static getAddAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  评分 */
		 static getAddScoreByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  技能类型 */
		 static getSkillTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}

}
	
cfg.FactionSkillBaseCfgData = FactionSkillBaseCfgData

class FactionDonatePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要总捐献值 */
		 static getNeedDonateByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDonate;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.FactionDonatePrizeBaseCfgData = FactionDonatePrizeBaseCfgData

class FactionCopymapBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  章节名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  怪物数据 */
		 static getMonsterByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  伤害奖励 */
		 static getDamagePrizeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.damagePrize;
			}
			return ""
		}
		 /**  击败奖励 */
		 static getKillPrizeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.killPrize;
			}
			return ""
		}

}
	
cfg.FactionCopymapBaseCfgData = FactionCopymapBaseCfgData

class FactionSkillResetBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级（0表示第一次）(上等级，此等级] */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  返还比率道具ID_万分比 */
		 static getReturnItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnItem;
			}
			return ""
		}

}
	
cfg.FactionSkillResetBaseCfgData = FactionSkillResetBaseCfgData

class FactionSkillUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要所有技能等级 */
		 static getNeedAllSkillLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAllSkillLevel;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.FactionSkillUpgradeBaseCfgData = FactionSkillUpgradeBaseCfgData

class FactionLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  该等级最大经验值 */
		 static getExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  升到此级奖励 */
		 static getAddItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  此级属性 */
		 static getAddAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}

}
	
cfg.FactionLivenessBaseCfgData = FactionLivenessBaseCfgData

class FactionLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  该等级最大经验值 */
		 static getExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  升到此级奖励 */
		 static getAddItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  此级属性 */
		 static getAddAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}

}
	
cfg.FactionLivenessBaseCfgData = FactionLivenessBaseCfgData

class FactionDonateBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "donateType");
		};
		 /**  捐献类型 */
		 static getDonateTypeByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.donateType;
			}
			return 0;
		}
		 /**  捐献名称 */
		 static getNameByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加帮会经验 */
		 static getAddExpByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addExp;
			}
			return 0;
		}
		 /**  增加帮会贡献 */
		 static getAddContriByDonateType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addContri;
			}
			return 0;
		}

}
	
cfg.FactionDonateBaseCfgData = FactionDonateBaseCfgData

class FactionDonatePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要总捐献值 */
		 static getNeedDonateByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDonate;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.FactionDonatePrizeBaseCfgData = FactionDonatePrizeBaseCfgData

class FactionUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  帮会等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  最大帮派人数 */
		 static getMemberCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.memberCount;
			}
			return 0;
		}
		 /**  此级最大经验值 */
		 static getExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  副帮主个数 */
		 static getDeputyCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.deputyCount;
			}
			return 0;
		}

}
	
cfg.FactionUpgradeBaseCfgData = FactionUpgradeBaseCfgData

class FactionDonatePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  奖励ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  需要总捐献值 */
		 static getNeedDonateByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDonate;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.FactionDonatePrizeBaseCfgData = FactionDonatePrizeBaseCfgData

class FactionPvpSkillResetBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "skillType");
		};
		 /**  技能类型 */
		 static getSkillTypeBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}
		 /**  等级（0表示第一次）(上等级，此等级] */
		 static getLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  返还比率道具ID_万分比 */
		 static getReturnItemBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnItem;
			}
			return ""
		}

}
	
cfg.FactionPvpSkillResetBaseCfgData = FactionPvpSkillResetBaseCfgData

class FactionUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  帮会等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  最大帮派人数 */
		 static getMemberCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.memberCount;
			}
			return 0;
		}
		 /**  此级最大经验值 */
		 static getExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  副帮主个数 */
		 static getDeputyCountByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.deputyCount;
			}
			return 0;
		}

}
	
cfg.FactionUpgradeBaseCfgData = FactionUpgradeBaseCfgData

class FactionLivenessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  该等级最大经验值 */
		 static getExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  升到此级奖励 */
		 static getAddItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  此级属性 */
		 static getAddAttrByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}

}
	
cfg.FactionLivenessBaseCfgData = FactionLivenessBaseCfgData

class FactionSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  索引 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  职业类型 */
		 static getJobTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jobType;
			}
			return 0;
		}
		 /**  技能位置 */
		 static getTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  每级增加属性属性类型|属性值|属性万分比 */
		 static getAddAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  评分 */
		 static getAddScoreByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  技能类型 */
		 static getSkillTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}

}
	
cfg.FactionSkillBaseCfgData = FactionSkillBaseCfgData

class FactionSkillUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要所有技能等级 */
		 static getNeedAllSkillLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAllSkillLevel;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.FactionSkillUpgradeBaseCfgData = FactionSkillUpgradeBaseCfgData

class FactionCopymapBuycountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.FactionCopymapBuycountBaseCfgData = FactionCopymapBuycountBaseCfgData

class FactionSkillResetBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级（0表示第一次）(上等级，此等级] */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  返还比率道具ID_万分比 */
		 static getReturnItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.returnItem;
			}
			return ""
		}

}
	
cfg.FactionSkillResetBaseCfgData = FactionSkillResetBaseCfgData

class FactionCopymapBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  章节名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  怪物数据 */
		 static getMonsterByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  伤害奖励 */
		 static getDamagePrizeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.damagePrize;
			}
			return ""
		}
		 /**  击败奖励 */
		 static getKillPrizeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.killPrize;
			}
			return ""
		}

}
	
cfg.FactionCopymapBaseCfgData = FactionCopymapBaseCfgData

class FactionCopymapBuycountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.FactionCopymapBuycountBaseCfgData = FactionCopymapBuycountBaseCfgData

class FactionMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}

}
	
cfg.FactionMonsterNewBaseCfgData = FactionMonsterNewBaseCfgData

class FactionCopymapTopprizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  ID */
		 static getIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  排名(上一名次，此名次] */
		 static getRankByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  奖励道具 */
		 static getBaseItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseItem;
			}
			return ""
		}

}
	
cfg.FactionCopymapTopprizeBaseCfgData = FactionCopymapTopprizeBaseCfgData

class FactionPvpSkillIndexBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "jobType");
		};
		 /**  职业类型 */
		 static getJobTypeByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jobType;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getSkillLevelByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillLevel;
			}
			return 0;
		}
		 /**  技能索引 */
		 static getSkillIDByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillID;
			}
			return 0;
		}
		 /**  评分 */
		 static getAddScoreByJobType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.FactionPvpSkillIndexBaseCfgData = FactionPvpSkillIndexBaseCfgData

class FactionPvpSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  索引 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  职业类型 */
		 static getJobTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.jobType;
			}
			return 0;
		}
		 /**  技能位置 */
		 static getSkillPosByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillPos;
			}
			return 0;
		}
		 /**  技能类型 */
		 static getSkillTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}
		 /**  每级增加属性属性类型|属性值|属性万分比 */
		 static getAddAttrByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  评分 */
		 static getAddScoreByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.FactionPvpSkillBaseCfgData = FactionPvpSkillBaseCfgData

class FactionPvpSkillUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "skillType");
		};
		 /**  技能类型 */
		 static getSkillTypeBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skillType;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要其他天赋技能最低等级 */
		 static getNeedAllSkillLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAllSkillLevel;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要本天赋其他技能最低等级 */
		 static getNeedOtherSkillLevelBySkillType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needOtherSkillLevel;
			}
			return 0;
		}

}
	
cfg.FactionPvpSkillUpgradeBaseCfgData = FactionPvpSkillUpgradeBaseCfgData

class FactionImpeachTimeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  需要离线时间 */
		 static getImpeachTimeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.impeachTime;
			}
			return 0;
		}

}
	
cfg.FactionImpeachTimeBaseCfgData = FactionImpeachTimeBaseCfgData

class FactionNameNameBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "name");
		};
		 /**  随机名字 */
		 static getNameByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.FactionNameNameBaseCfgData = FactionNameNameBaseCfgData

class FactionNameNameBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "name");
		};
		 /**  随机名字 */
		 static getNameByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.FactionNameNameBaseCfgData = FactionNameNameBaseCfgData

class FactionNameNameBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "name");
		};
		 /**  随机名字 */
		 static getNameByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.FactionNameNameBaseCfgData = FactionNameNameBaseCfgData

class FactionWarTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  名次 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddPrizeByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.FactionWarTopPrizeBaseCfgData = FactionWarTopPrizeBaseCfgData

class FactionWarBoxPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.FactionWarBoxPrizeBaseCfgData = FactionWarBoxPrizeBaseCfgData

class FactionWarTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  名次 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddPrizeByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.FactionWarTopPrizeBaseCfgData = FactionWarTopPrizeBaseCfgData

class FactionWarConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "name");
		};
		 /**  玩法名称 */
		 static getNameByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要帮派等级 */
		 static getNeedLevelByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  需要活跃人数 */
		 static getNeedActiveCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needActiveCount;
			}
			return 0;
		}
		 /**  每日挑战次数 */
		 static getDayFightCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFightCount;
			}
			return 0;
		}
		 /**  废墟最大挑战次数 */
		 static getRunieFightCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runieFightCount;
			}
			return 0;
		}
		 /**  废墟被动技能ID */
		 static getRunieSkillIDByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runieSkillID;
			}
			return 0;
		}
		 /**  废墟最大的技能等级 */
		 static getRunieSkillMaxLevelByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runieSkillMaxLevel;
			}
			return 0;
		}
		 /**  匹配时间 */
		 static getMatchTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.matchTime;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  奖励时间 */
		 static getPrizeTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeTime;
			}
			return ""
		}
		 /**  宝箱领取时间 */
		 static getPrizeBoxTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeBoxTime;
			}
			return ""
		}

}
	
cfg.FactionWarConstBaseCfgData = FactionWarConstBaseCfgData

class FactionWarBoxPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.FactionWarBoxPrizeBaseCfgData = FactionWarBoxPrizeBaseCfgData

class FactionWarFightPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  难度星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  增加的被动技能技能ID_等级 */
		 static getAddSkillByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  成功奖励 */
		 static getSucAddItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sucAddItem;
			}
			return ""
		}
		 /**  失败奖励奖励 */
		 static getFailAddItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failAddItem;
			}
			return ""
		}
		 /**  战绩点参数 */
		 static getFightPointParamByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPointParam;
			}
			return 0;
		}
		 /**  战绩点系数 */
		 static getFightPointRateByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPointRate;
			}
			return 0;
		}
		 /**  失败增加战绩点 */
		 static getFailAddFightPointByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failAddFightPoint;
			}
			return 0;
		}

}
	
cfg.FactionWarFightPrizeBaseCfgData = FactionWarFightPrizeBaseCfgData

class FactionWarFightPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  难度星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  增加的被动技能技能ID_等级 */
		 static getAddSkillByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  成功奖励 */
		 static getSucAddItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sucAddItem;
			}
			return ""
		}
		 /**  失败奖励奖励 */
		 static getFailAddItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failAddItem;
			}
			return ""
		}
		 /**  战绩点参数 */
		 static getFightPointParamByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPointParam;
			}
			return 0;
		}
		 /**  战绩点系数 */
		 static getFightPointRateByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPointRate;
			}
			return 0;
		}
		 /**  失败增加战绩点 */
		 static getFailAddFightPointByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failAddFightPoint;
			}
			return 0;
		}

}
	
cfg.FactionWarFightPrizeBaseCfgData = FactionWarFightPrizeBaseCfgData

class FactionWarConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "name");
		};
		 /**  玩法名称 */
		 static getNameByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要帮派等级 */
		 static getNeedLevelByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  需要活跃人数 */
		 static getNeedActiveCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needActiveCount;
			}
			return 0;
		}
		 /**  每日挑战次数 */
		 static getDayFightCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFightCount;
			}
			return 0;
		}
		 /**  废墟最大挑战次数 */
		 static getRunieFightCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runieFightCount;
			}
			return 0;
		}
		 /**  废墟被动技能ID */
		 static getRunieSkillIDByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runieSkillID;
			}
			return 0;
		}
		 /**  废墟最大的技能等级 */
		 static getRunieSkillMaxLevelByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runieSkillMaxLevel;
			}
			return 0;
		}
		 /**  匹配时间 */
		 static getMatchTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.matchTime;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  奖励时间 */
		 static getPrizeTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeTime;
			}
			return ""
		}
		 /**  宝箱领取时间 */
		 static getPrizeBoxTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeBoxTime;
			}
			return ""
		}

}
	
cfg.FactionWarConstBaseCfgData = FactionWarConstBaseCfgData

class FactionWarBoxPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddPrizeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.FactionWarBoxPrizeBaseCfgData = FactionWarBoxPrizeBaseCfgData

class FactionWarFightPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  难度星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  增加的被动技能技能ID_等级 */
		 static getAddSkillByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  成功奖励 */
		 static getSucAddItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sucAddItem;
			}
			return ""
		}
		 /**  失败奖励奖励 */
		 static getFailAddItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failAddItem;
			}
			return ""
		}
		 /**  战绩点参数 */
		 static getFightPointParamByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPointParam;
			}
			return 0;
		}
		 /**  战绩点系数 */
		 static getFightPointRateByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPointRate;
			}
			return 0;
		}
		 /**  失败增加战绩点 */
		 static getFailAddFightPointByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failAddFightPoint;
			}
			return 0;
		}

}
	
cfg.FactionWarFightPrizeBaseCfgData = FactionWarFightPrizeBaseCfgData

class FactionWarTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "rank");
		};
		 /**  名次 */
		 static getRankByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rank;
			}
			return 0;
		}
		 /**  奖励 */
		 static getAddPrizeByRank(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.FactionWarTopPrizeBaseCfgData = FactionWarTopPrizeBaseCfgData

class FactionWarConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "name");
		};
		 /**  玩法名称 */
		 static getNameByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要帮派等级 */
		 static getNeedLevelByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  需要活跃人数 */
		 static getNeedActiveCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needActiveCount;
			}
			return 0;
		}
		 /**  每日挑战次数 */
		 static getDayFightCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFightCount;
			}
			return 0;
		}
		 /**  废墟最大挑战次数 */
		 static getRunieFightCountByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runieFightCount;
			}
			return 0;
		}
		 /**  废墟被动技能ID */
		 static getRunieSkillIDByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runieSkillID;
			}
			return 0;
		}
		 /**  废墟最大的技能等级 */
		 static getRunieSkillMaxLevelByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runieSkillMaxLevel;
			}
			return 0;
		}
		 /**  匹配时间 */
		 static getMatchTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.matchTime;
			}
			return ""
		}
		 /**  开启时间 */
		 static getOpenTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  奖励时间 */
		 static getPrizeTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeTime;
			}
			return ""
		}
		 /**  宝箱领取时间 */
		 static getPrizeBoxTimeByName(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeBoxTime;
			}
			return ""
		}

}
	
cfg.FactionWarConstBaseCfgData = FactionWarConstBaseCfgData

class FamilyBuildBuildBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  Index */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  家具类型 */
		 static getBuildTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buildType;
			}
			return 0;
		}
		 /**  图片名 */
		 static getImgByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.img;
			}
			return ""
		}
		 /**  所占行数 */
		 static getRowLengthByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rowLength;
			}
			return 0;
		}
		 /**  所占列数 */
		 static getColLengthByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.colLength;
			}
			return 0;
		}
		 /**  增加舒适度 */
		 static getAddComfortByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addComfort;
			}
			return 0;
		}
		 /**  获取来源_1 */
		 static getSource1ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.source_1;
			}
			return 0;
		}
		 /**  获取来源_2 */
		 static getSource2ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.source_2;
			}
			return 0;
		}
		 /**  所属主题ID */
		 static getThemeIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.themeID;
			}
			return 0;
		}

}
	
cfg.FamilyBuildBuildBaseCfgData = FamilyBuildBuildBaseCfgData

class FamilyBuildBuildBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  Index */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  家具类型 */
		 static getBuildTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buildType;
			}
			return 0;
		}
		 /**  图片名 */
		 static getImgByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.img;
			}
			return ""
		}
		 /**  所占行数 */
		 static getRowLengthByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rowLength;
			}
			return 0;
		}
		 /**  所占列数 */
		 static getColLengthByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.colLength;
			}
			return 0;
		}
		 /**  增加舒适度 */
		 static getAddComfortByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addComfort;
			}
			return 0;
		}
		 /**  获取来源_1 */
		 static getSource1ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.source_1;
			}
			return 0;
		}
		 /**  获取来源_2 */
		 static getSource2ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.source_2;
			}
			return 0;
		}
		 /**  所属主题ID */
		 static getThemeIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.themeID;
			}
			return 0;
		}

}
	
cfg.FamilyBuildBuildBaseCfgData = FamilyBuildBuildBaseCfgData

class FamilyBuildBuildBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  Index */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  家具类型 */
		 static getBuildTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buildType;
			}
			return 0;
		}
		 /**  图片名 */
		 static getImgByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.img;
			}
			return ""
		}
		 /**  所占行数 */
		 static getRowLengthByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rowLength;
			}
			return 0;
		}
		 /**  所占列数 */
		 static getColLengthByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.colLength;
			}
			return 0;
		}
		 /**  增加舒适度 */
		 static getAddComfortByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addComfort;
			}
			return 0;
		}
		 /**  获取来源_1 */
		 static getSource1ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.source_1;
			}
			return 0;
		}
		 /**  获取来源_2 */
		 static getSource2ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.source_2;
			}
			return 0;
		}
		 /**  所属主题ID */
		 static getThemeIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.themeID;
			}
			return 0;
		}

}
	
cfg.FamilyBuildBuildBaseCfgData = FamilyBuildBuildBaseCfgData

class GodEquipRefineRandBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.GodEquipRefineRandBaseCfgData = GodEquipRefineRandBaseCfgData

class GodEquipQualityBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "quality");
		};
		 /**  品质 */
		 static getQualityByQuality(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.quality;
			}
			return 0;
		}
		 /**  随机属性条数 */
		 static getRandAttrCountByQuality(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randAttrCount;
			}
			return 0;
		}

}
	
cfg.GodEquipQualityBaseCfgData = GodEquipQualityBaseCfgData

class GodEquipRefineBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  需要道具消耗道具ID_数量; */
		 static getNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  锁定一条消耗 */
		 static getLockOneNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lockOneNeedItem;
			}
			return ""
		}
		 /**  锁定两条条消耗 */
		 static getLockTwoNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lockTwoNeedItem;
			}
			return ""
		}
		 /**  最大次数 */
		 static getMaxCountByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}

}
	
cfg.GodEquipRefineBaseCfgData = GodEquipRefineBaseCfgData

class GodEquipRandattrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  星级 */
		 static getStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  部位 */
		 static getPartByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.part;
			}
			return 0;
		}
		 /**  属性类型 */
		 static getAttrTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrType;
			}
			return 0;
		}
		 /**  值区间 */
		 static getAttrValueByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrValue;
			}
			return ""
		}
		 /**  万分比区间 */
		 static getAttrRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrRate;
			}
			return ""
		}

}
	
cfg.GodEquipRandattrBaseCfgData = GodEquipRandattrBaseCfgData

class GodEquipSuitBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "suitID");
		};
		 /**  套装ID */
		 static getSuitIDBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.suitID;
			}
			return 0;
		}
		 /**  套装名 */
		 static getSuitNameBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.suitName;
			}
			return ""
		}
		 /**  类型 */
		 static getTypeBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  星级 */
		 static getStarBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  两件属性 */
		 static getAddAttr1BySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr1;
			}
			return ""
		}
		 /**  四件属性 */
		 static getAddAttr2BySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr2;
			}
			return ""
		}
		 /**  四件技能技能ID_技能等级 */
		 static getAddSkillBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  是否显示技能图标 */
		 static getHasSkillIconBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hasSkillIcon;
			}
			return 0;
		}

}
	
cfg.GodEquipSuitBaseCfgData = GodEquipSuitBaseCfgData

class GodEquipSuitMgrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  方案ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  方案名 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要消耗 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.GodEquipSuitMgrBaseCfgData = GodEquipSuitMgrBaseCfgData

class GodEquipQualityBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "quality");
		};
		 /**  品质 */
		 static getQualityByQuality(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.quality;
			}
			return 0;
		}
		 /**  随机属性条数 */
		 static getRandAttrCountByQuality(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randAttrCount;
			}
			return 0;
		}

}
	
cfg.GodEquipQualityBaseCfgData = GodEquipQualityBaseCfgData

class GodEquipSuitMgrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  方案ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  方案名 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要消耗 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.GodEquipSuitMgrBaseCfgData = GodEquipSuitMgrBaseCfgData

class GodEquipSuitBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "suitID");
		};
		 /**  套装ID */
		 static getSuitIDBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.suitID;
			}
			return 0;
		}
		 /**  套装名 */
		 static getSuitNameBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.suitName;
			}
			return ""
		}
		 /**  类型 */
		 static getTypeBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  星级 */
		 static getStarBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  两件属性 */
		 static getAddAttr1BySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr1;
			}
			return ""
		}
		 /**  四件属性 */
		 static getAddAttr2BySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr2;
			}
			return ""
		}
		 /**  四件技能技能ID_技能等级 */
		 static getAddSkillBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  是否显示技能图标 */
		 static getHasSkillIconBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hasSkillIcon;
			}
			return 0;
		}

}
	
cfg.GodEquipSuitBaseCfgData = GodEquipSuitBaseCfgData

class GodEquipRandattrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  星级 */
		 static getStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  部位 */
		 static getPartByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.part;
			}
			return 0;
		}
		 /**  属性类型 */
		 static getAttrTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrType;
			}
			return 0;
		}
		 /**  值区间 */
		 static getAttrValueByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrValue;
			}
			return ""
		}
		 /**  万分比区间 */
		 static getAttrRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrRate;
			}
			return ""
		}

}
	
cfg.GodEquipRandattrBaseCfgData = GodEquipRandattrBaseCfgData

class GodEquipRefineRandBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.GodEquipRefineRandBaseCfgData = GodEquipRefineRandBaseCfgData

class GodEquipRefineBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  需要道具消耗道具ID_数量; */
		 static getNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  锁定一条消耗 */
		 static getLockOneNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lockOneNeedItem;
			}
			return ""
		}
		 /**  锁定两条条消耗 */
		 static getLockTwoNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lockTwoNeedItem;
			}
			return ""
		}
		 /**  最大次数 */
		 static getMaxCountByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}

}
	
cfg.GodEquipRefineBaseCfgData = GodEquipRefineBaseCfgData

class GodEquipQualityBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "quality");
		};
		 /**  品质 */
		 static getQualityByQuality(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.quality;
			}
			return 0;
		}
		 /**  随机属性条数 */
		 static getRandAttrCountByQuality(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randAttrCount;
			}
			return 0;
		}

}
	
cfg.GodEquipQualityBaseCfgData = GodEquipQualityBaseCfgData

class GodEquipRefineBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  需要道具消耗道具ID_数量; */
		 static getNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  锁定一条消耗 */
		 static getLockOneNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lockOneNeedItem;
			}
			return ""
		}
		 /**  锁定两条条消耗 */
		 static getLockTwoNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lockTwoNeedItem;
			}
			return ""
		}
		 /**  最大次数 */
		 static getMaxCountByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}

}
	
cfg.GodEquipRefineBaseCfgData = GodEquipRefineBaseCfgData

class GodEquipRefineRandBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.GodEquipRefineRandBaseCfgData = GodEquipRefineRandBaseCfgData

class GodEquipRandattrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  星级 */
		 static getStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  部位 */
		 static getPartByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.part;
			}
			return 0;
		}
		 /**  属性类型 */
		 static getAttrTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrType;
			}
			return 0;
		}
		 /**  值区间 */
		 static getAttrValueByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrValue;
			}
			return ""
		}
		 /**  万分比区间 */
		 static getAttrRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attrRate;
			}
			return ""
		}

}
	
cfg.GodEquipRandattrBaseCfgData = GodEquipRandattrBaseCfgData

class GodEquipSuitMgrBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  方案ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  方案名 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要消耗 */
		 static getNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.GodEquipSuitMgrBaseCfgData = GodEquipSuitMgrBaseCfgData

class GodEquipSuitBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "suitID");
		};
		 /**  套装ID */
		 static getSuitIDBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.suitID;
			}
			return 0;
		}
		 /**  套装名 */
		 static getSuitNameBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.suitName;
			}
			return ""
		}
		 /**  类型 */
		 static getTypeBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  星级 */
		 static getStarBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  两件属性 */
		 static getAddAttr1BySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr1;
			}
			return ""
		}
		 /**  四件属性 */
		 static getAddAttr2BySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr2;
			}
			return ""
		}
		 /**  四件技能技能ID_技能等级 */
		 static getAddSkillBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  是否显示技能图标 */
		 static getHasSkillIconBySuitID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hasSkillIcon;
			}
			return 0;
		}

}
	
cfg.GodEquipSuitBaseCfgData = GodEquipSuitBaseCfgData

class GuessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  问题索引 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  题目 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  错误选项 */
		 static getWrongByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.wrong;
			}
			return ""
		}
		 /**  加载图片 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return ""
		}
		 /**  阵营 */
		 static getPetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}

}
	
cfg.GuessBaseCfgData = GuessBaseCfgData

class GuessShowRewardBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  展示排名奖励 */
		 static getRewardsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rewards;
			}
			return ""
		}
		 /**  说明 */
		 static getDesByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.des;
			}
			return ""
		}
		 /**  总共可错误的次数 */
		 static getWrongCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.wrongCount;
			}
			return 0;
		}

}
	
cfg.GuessShowRewardBaseCfgData = GuessShowRewardBaseCfgData

class GuessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  问题索引 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  题目 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  错误选项 */
		 static getWrongByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.wrong;
			}
			return ""
		}
		 /**  加载图片 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return ""
		}
		 /**  阵营 */
		 static getPetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}

}
	
cfg.GuessBaseCfgData = GuessBaseCfgData

class GuessShowRewardBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  展示排名奖励 */
		 static getRewardsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rewards;
			}
			return ""
		}
		 /**  说明 */
		 static getDesByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.des;
			}
			return ""
		}
		 /**  总共可错误的次数 */
		 static getWrongCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.wrongCount;
			}
			return 0;
		}

}
	
cfg.GuessShowRewardBaseCfgData = GuessShowRewardBaseCfgData

class GuessShowRewardBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  展示排名奖励 */
		 static getRewardsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rewards;
			}
			return ""
		}
		 /**  说明 */
		 static getDesByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.des;
			}
			return ""
		}
		 /**  总共可错误的次数 */
		 static getWrongCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.wrongCount;
			}
			return 0;
		}

}
	
cfg.GuessShowRewardBaseCfgData = GuessShowRewardBaseCfgData

class GuessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  问题索引 */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  题目 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  错误选项 */
		 static getWrongByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.wrong;
			}
			return ""
		}
		 /**  加载图片 */
		 static getValueByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return ""
		}
		 /**  阵营 */
		 static getPetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}

}
	
cfg.GuessBaseCfgData = GuessBaseCfgData

class HeavenChapterBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "chapter");
		};
		 /**  章节 */
		 static getChapterByChapter(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  开启条件, 空白没限制，星数0表示只通关就可以没有星星限制（章节_星数;章节_星数） */
		 static getConditionByChapter(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.condition;
			}
			return ""
		}

}
	
cfg.HeavenChapterBaseCfgData = HeavenChapterBaseCfgData

class HeavenCommonBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  配置id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  最大挑战次数 */
		 static getMaxCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}
		 /**  购买挑战次数 */
		 static getBuyCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyCount;
			}
			return 0;
		}
		 /**  购买挑战需要物品 */
		 static getBuyNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyNeedItem;
			}
			return ""
		}
		 /**  祈祷免费次数 */
		 static getPrayFreeCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prayFreeCount;
			}
			return 0;
		}

}
	
cfg.HeavenCommonBaseCfgData = HeavenCommonBaseCfgData

class HeavenChapterPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  需要星数 */
		 static getStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.HeavenChapterPrizeBaseCfgData = HeavenChapterPrizeBaseCfgData

class HeavenPrayPrizeTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  奖励种类 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.HeavenPrayPrizeTypeBaseCfgData = HeavenPrayPrizeTypeBaseCfgData

class HeavenStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  怪物数据 */
		 static getMonsterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  怪物数据 */
		 static getMonster2ByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster2;
			}
			return 0;
		}
		 /**  星星条件 */
		 static getStarConditionByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starCondition;
			}
			return ""
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  首通奖励 */
		 static getFirstAccomplishAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAccomplishAddItem;
			}
			return ""
		}
		 /**  推荐战力 */
		 static getRequreFightPowerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.requreFightPower;
			}
			return 0;
		}

}
	
cfg.HeavenStageBaseCfgData = HeavenStageBaseCfgData

class HeavenPrayPrizeItemsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  奖励种类 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  概率 */
		 static getChanceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chance;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  是否播报 */
		 static getBroadCastByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.broadCast;
			}
			return 0;
		}

}
	
cfg.HeavenPrayPrizeItemsBaseCfgData = HeavenPrayPrizeItemsBaseCfgData

class HeavenChapterPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  需要星数 */
		 static getStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.HeavenChapterPrizeBaseCfgData = HeavenChapterPrizeBaseCfgData

class HeavenPrayPrizePoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "pool");
		};
		 /**  奖池类型 */
		 static getPoolByPool(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pool;
			}
			return 0;
		}
		 /**  奖励种类 */
		 static getTypeByPool(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  概率 */
		 static getChanceByPool(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chance;
			}
			return 0;
		}

}
	
cfg.HeavenPrayPrizePoolBaseCfgData = HeavenPrayPrizePoolBaseCfgData

class HeavenStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  怪物数据 */
		 static getMonsterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  怪物数据 */
		 static getMonster2ByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster2;
			}
			return 0;
		}
		 /**  星星条件 */
		 static getStarConditionByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starCondition;
			}
			return ""
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  首通奖励 */
		 static getFirstAccomplishAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAccomplishAddItem;
			}
			return ""
		}
		 /**  推荐战力 */
		 static getRequreFightPowerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.requreFightPower;
			}
			return 0;
		}

}
	
cfg.HeavenStageBaseCfgData = HeavenStageBaseCfgData

class HeavenMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}
		 /**  附加属性值(属性|值|百分比_属性|值|百分比;)分号留空表示这个怪物没有附加属性 */
		 static getAttributeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attribute;
			}
			return ""
		}
		 /**  额外技能(技能ID|技能Lv_技能ID|技能Lv;)分号留空表示这个怪物没有附加技能 */
		 static getExtraSkillByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.extraSkill;
			}
			return ""
		}

}
	
cfg.HeavenMonsterNewBaseCfgData = HeavenMonsterNewBaseCfgData

class HeavenPrayStatueBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  神像索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  神像名 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  默认奖池 */
		 static getPoolByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pool;
			}
			return 0;
		}
		 /**  奖池奖励预览 */
		 static getPoolReviewByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolReview;
			}
			return ""
		}
		 /**  替换次数 */
		 static getAlterTimesByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.alterTimes;
			}
			return 0;
		}
		 /**  替换奖池 */
		 static getAlterPoolByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.alterPool;
			}
			return 0;
		}
		 /**  消耗特殊道具(信物) */
		 static getNeedSpecialItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needSpecialItem;
			}
			return ""
		}
		 /**  消耗物品（钻石） */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  10次消耗物品（钻石） */
		 static getTenNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tenNeedItem;
			}
			return ""
		}
		 /**  祈祷返还物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  需要开启章节 */
		 static getNeedChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needChapter;
			}
			return 0;
		}

}
	
cfg.HeavenPrayStatueBaseCfgData = HeavenPrayStatueBaseCfgData

class HeavenChapterPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  需要星数 */
		 static getStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.HeavenChapterPrizeBaseCfgData = HeavenChapterPrizeBaseCfgData

class HeavenCommonBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  配置id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  最大挑战次数 */
		 static getMaxCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}
		 /**  购买挑战次数 */
		 static getBuyCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyCount;
			}
			return 0;
		}
		 /**  购买挑战需要物品 */
		 static getBuyNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyNeedItem;
			}
			return ""
		}
		 /**  祈祷免费次数 */
		 static getPrayFreeCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prayFreeCount;
			}
			return 0;
		}

}
	
cfg.HeavenCommonBaseCfgData = HeavenCommonBaseCfgData

class HeavenChapterBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "chapter");
		};
		 /**  章节 */
		 static getChapterByChapter(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  开启条件, 空白没限制，星数0表示只通关就可以没有星星限制（章节_星数;章节_星数） */
		 static getConditionByChapter(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.condition;
			}
			return ""
		}

}
	
cfg.HeavenChapterBaseCfgData = HeavenChapterBaseCfgData

class HeavenStarConditionBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  类型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.params;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.HeavenStarConditionBaseCfgData = HeavenStarConditionBaseCfgData

class HeavenStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  怪物数据 */
		 static getMonsterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster;
			}
			return 0;
		}
		 /**  怪物数据 */
		 static getMonster2ByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monster2;
			}
			return 0;
		}
		 /**  星星条件 */
		 static getStarConditionByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starCondition;
			}
			return ""
		}
		 /**  奖励 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  首通奖励 */
		 static getFirstAccomplishAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAccomplishAddItem;
			}
			return ""
		}
		 /**  推荐战力 */
		 static getRequreFightPowerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.requreFightPower;
			}
			return 0;
		}

}
	
cfg.HeavenStageBaseCfgData = HeavenStageBaseCfgData

class HeavenCommonBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  配置id */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  最大挑战次数 */
		 static getMaxCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}
		 /**  购买挑战次数 */
		 static getBuyCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyCount;
			}
			return 0;
		}
		 /**  购买挑战需要物品 */
		 static getBuyNeedItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyNeedItem;
			}
			return ""
		}
		 /**  祈祷免费次数 */
		 static getPrayFreeCountByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prayFreeCount;
			}
			return 0;
		}

}
	
cfg.HeavenCommonBaseCfgData = HeavenCommonBaseCfgData

class HeavenChapterBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "chapter");
		};
		 /**  章节 */
		 static getChapterByChapter(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  开启条件, 空白没限制，星数0表示只通关就可以没有星星限制（章节_星数;章节_星数） */
		 static getConditionByChapter(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.condition;
			}
			return ""
		}

}
	
cfg.HeavenChapterBaseCfgData = HeavenChapterBaseCfgData

class HeavenMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}
		 /**  附加属性值(属性|值|百分比_属性|值|百分比;)分号留空表示这个怪物没有附加属性 */
		 static getAttributeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attribute;
			}
			return ""
		}
		 /**  额外技能(技能ID|技能Lv_技能ID|技能Lv;)分号留空表示这个怪物没有附加技能 */
		 static getExtraSkillByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.extraSkill;
			}
			return ""
		}

}
	
cfg.HeavenMonsterNewBaseCfgData = HeavenMonsterNewBaseCfgData

class HeavenMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}
		 /**  附加属性值(属性|值|百分比_属性|值|百分比;)分号留空表示这个怪物没有附加属性 */
		 static getAttributeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attribute;
			}
			return ""
		}
		 /**  额外技能(技能ID|技能Lv_技能ID|技能Lv;)分号留空表示这个怪物没有附加技能 */
		 static getExtraSkillByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.extraSkill;
			}
			return ""
		}

}
	
cfg.HeavenMonsterNewBaseCfgData = HeavenMonsterNewBaseCfgData

class HeavenStarConditionBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  类型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.params;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.HeavenStarConditionBaseCfgData = HeavenStarConditionBaseCfgData

class HeavenPrayStatueBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  神像索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  神像名 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  默认奖池 */
		 static getPoolByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pool;
			}
			return 0;
		}
		 /**  奖池奖励预览 */
		 static getPoolReviewByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolReview;
			}
			return ""
		}
		 /**  替换次数 */
		 static getAlterTimesByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.alterTimes;
			}
			return 0;
		}
		 /**  替换奖池 */
		 static getAlterPoolByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.alterPool;
			}
			return 0;
		}
		 /**  消耗特殊道具(信物) */
		 static getNeedSpecialItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needSpecialItem;
			}
			return ""
		}
		 /**  消耗物品（钻石） */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  10次消耗物品（钻石） */
		 static getTenNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tenNeedItem;
			}
			return ""
		}
		 /**  祈祷返还物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  需要开启章节 */
		 static getNeedChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needChapter;
			}
			return 0;
		}

}
	
cfg.HeavenPrayStatueBaseCfgData = HeavenPrayStatueBaseCfgData

class HeavenPrayPrizePoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "pool");
		};
		 /**  奖池类型 */
		 static getPoolByPool(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pool;
			}
			return 0;
		}
		 /**  奖励种类 */
		 static getTypeByPool(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  概率 */
		 static getChanceByPool(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chance;
			}
			return 0;
		}

}
	
cfg.HeavenPrayPrizePoolBaseCfgData = HeavenPrayPrizePoolBaseCfgData

class HeavenPrayPrizeItemsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  奖励种类 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  概率 */
		 static getChanceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chance;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  是否播报 */
		 static getBroadCastByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.broadCast;
			}
			return 0;
		}

}
	
cfg.HeavenPrayPrizeItemsBaseCfgData = HeavenPrayPrizeItemsBaseCfgData

class HeavenPrayPrizeTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  奖励种类 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.HeavenPrayPrizeTypeBaseCfgData = HeavenPrayPrizeTypeBaseCfgData

class HeavenPrayPrizePoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "pool");
		};
		 /**  奖池类型 */
		 static getPoolByPool(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pool;
			}
			return 0;
		}
		 /**  奖励种类 */
		 static getTypeByPool(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  概率 */
		 static getChanceByPool(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chance;
			}
			return 0;
		}

}
	
cfg.HeavenPrayPrizePoolBaseCfgData = HeavenPrayPrizePoolBaseCfgData

class HeavenStarConditionBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  类型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.params;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.HeavenStarConditionBaseCfgData = HeavenStarConditionBaseCfgData

class HeavenPrayStatueBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  神像索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  神像名 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  默认奖池 */
		 static getPoolByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pool;
			}
			return 0;
		}
		 /**  奖池奖励预览 */
		 static getPoolReviewByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.poolReview;
			}
			return ""
		}
		 /**  替换次数 */
		 static getAlterTimesByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.alterTimes;
			}
			return 0;
		}
		 /**  替换奖池 */
		 static getAlterPoolByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.alterPool;
			}
			return 0;
		}
		 /**  消耗特殊道具(信物) */
		 static getNeedSpecialItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needSpecialItem;
			}
			return ""
		}
		 /**  消耗物品（钻石） */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  10次消耗物品（钻石） */
		 static getTenNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.tenNeedItem;
			}
			return ""
		}
		 /**  祈祷返还物品 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  需要开启章节 */
		 static getNeedChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needChapter;
			}
			return 0;
		}

}
	
cfg.HeavenPrayStatueBaseCfgData = HeavenPrayStatueBaseCfgData

class HeavenPrayPrizeItemsBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  奖励种类 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  概率 */
		 static getChanceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chance;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  是否播报 */
		 static getBroadCastByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.broadCast;
			}
			return 0;
		}

}
	
cfg.HeavenPrayPrizeItemsBaseCfgData = HeavenPrayPrizeItemsBaseCfgData

class HeavenPrayPrizeTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  奖励种类 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.HeavenPrayPrizeTypeBaseCfgData = HeavenPrayPrizeTypeBaseCfgData

class HolyUnlockBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  类型1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  需要伙伴星级个数星级_个数 */
		 static getNeedPetCountByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetCount;
			}
			return ""
		}
		 /**  名称 */
		 static getNameByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.HolyUnlockBaseCfgData = HolyUnlockBaseCfgData

class HolyAdvanceBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  类型1;//水2;//火3;//草4;//光5;//暗 */
		 static getPetTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要携带物等级 */
		 static getNeedHolyLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needHolyLevel;
			}
			return 0;
		}
		 /**  需要伙伴星级个数星级_个数 */
		 static getNeedPetCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetCount;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加属性属性类型_属性值 */
		 static getAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}

}
	
cfg.HolyAdvanceBaseCfgData = HolyAdvanceBaseCfgData

class HolyUnlockBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  类型1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  需要伙伴星级个数星级_个数 */
		 static getNeedPetCountByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetCount;
			}
			return ""
		}
		 /**  名称 */
		 static getNameByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.HolyUnlockBaseCfgData = HolyUnlockBaseCfgData

class HolyUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  类型1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getPetTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  此级最大经验 */
		 static getMaxExpById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  每次增加经验 */
		 static getAddExpById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addExp;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加属性属性类型|属性值 */
		 static getAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  每十点经验增加属性属性类型|属性值 */
		 static getExpAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expAddAttr;
			}
			return ""
		}

}
	
cfg.HolyUpgradeBaseCfgData = HolyUpgradeBaseCfgData

class HolyUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  类型1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getPetTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  此级最大经验 */
		 static getMaxExpById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  每次增加经验 */
		 static getAddExpById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addExp;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加属性属性类型|属性值 */
		 static getAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  每十点经验增加属性属性类型|属性值 */
		 static getExpAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expAddAttr;
			}
			return ""
		}

}
	
cfg.HolyUpgradeBaseCfgData = HolyUpgradeBaseCfgData

class HolyAdvanceBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  类型1;//水2;//火3;//草4;//光5;//暗 */
		 static getPetTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要携带物等级 */
		 static getNeedHolyLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needHolyLevel;
			}
			return 0;
		}
		 /**  需要伙伴星级个数星级_个数 */
		 static getNeedPetCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetCount;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加属性属性类型_属性值 */
		 static getAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}

}
	
cfg.HolyAdvanceBaseCfgData = HolyAdvanceBaseCfgData

class HolyUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  类型1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getPetTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  此级最大经验 */
		 static getMaxExpById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  每次增加经验 */
		 static getAddExpById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addExp;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加属性属性类型|属性值 */
		 static getAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  每十点经验增加属性属性类型|属性值 */
		 static getExpAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expAddAttr;
			}
			return ""
		}

}
	
cfg.HolyUpgradeBaseCfgData = HolyUpgradeBaseCfgData

class HolyUnlockBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  类型1;//水2;//火3;//风4;//太阳5;//月亮 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  需要伙伴星级个数星级_个数 */
		 static getNeedPetCountByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetCount;
			}
			return ""
		}
		 /**  名称 */
		 static getNameByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.HolyUnlockBaseCfgData = HolyUnlockBaseCfgData

class HolyAdvanceBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  类型1;//水2;//火3;//草4;//光5;//暗 */
		 static getPetTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要携带物等级 */
		 static getNeedHolyLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needHolyLevel;
			}
			return 0;
		}
		 /**  需要伙伴星级个数星级_个数 */
		 static getNeedPetCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetCount;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加属性属性类型_属性值 */
		 static getAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}

}
	
cfg.HolyAdvanceBaseCfgData = HolyAdvanceBaseCfgData

class HookActivityDropBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  每小时固定掉落个数 */
		 static getHourCountByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hourCount;
			}
			return 0;
		}
		 /**  道具ID */
		 static getItemIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  持续天数(0与活动一致) */
		 static getDaysByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.days;
			}
			return 0;
		}

}
	
cfg.HookActivityDropBaseCfgData = HookActivityDropBaseCfgData

class HookMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  Boss序号 */
		 static getBossIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossIndex;
			}
			return 0;
		}
		 /**  fuck ,为什么不加描述 */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}
		 /**  Boss名称 */
		 static getBossNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossName;
			}
			return ""
		}

}
	
cfg.HookMonsterNewBaseCfgData = HookMonsterNewBaseCfgData

class HookChapterUnlockBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  区域ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  区域名 */
		 static getAreaNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.areaName;
			}
			return ""
		}
		 /**  场景列表 */
		 static getSceneListByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneList;
			}
			return ""
		}

}
	
cfg.HookChapterUnlockBaseCfgData = HookChapterUnlockBaseCfgData

class HookStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageID");
		};
		 /**  关卡ID */
		 static getStageIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  场景ID */
		 static getSceneIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneID;
			}
			return 0;
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  最大回合 */
		 static getMaxRoundByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxRound;
			}
			return 0;
		}
		 /**  刷怪boss */
		 static getBossGroupIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossGroupID;
			}
			return 0;
		}
		 /**  普通掉落 */
		 static getHookDropIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hookDropID;
			}
			return 0;
		}
		 /**  Boss掉落 */
		 static getBossDropIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossDropID;
			}
			return 0;
		}
		 /**  使用道具掉落 */
		 static getUseItemDropIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useItemDropID;
			}
			return 0;
		}
		 /**  战斗完CD */
		 static getFightCDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightCD;
			}
			return 0;
		}
		 /**  最大远航积分 */
		 static getMaxSailPointByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxSailPoint;
			}
			return 0;
		}
		 /**  推荐战力 */
		 static getPowerByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.power;
			}
			return 0;
		}
		 /**  BOSS来袭形象 */
		 static getBossShapeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossShape;
			}
			return 0;
		}
		 /**  奖励预览 */
		 static getPrizePreviewByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizePreview;
			}
			return 0;
		}
		 /**  背景图 */
		 static getBgmapByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bgmap;
			}
			return ""
		}

}
	
cfg.HookStageBaseCfgData = HookStageBaseCfgData

class HookNormalDropInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  ID */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  道具列表 */
		 static getItemListByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemList;
			}
			return ""
		}

}
	
cfg.HookNormalDropInfoBaseCfgData = HookNormalDropInfoBaseCfgData

class HookStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageID");
		};
		 /**  关卡ID */
		 static getStageIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  场景ID */
		 static getSceneIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneID;
			}
			return 0;
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  最大回合 */
		 static getMaxRoundByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxRound;
			}
			return 0;
		}
		 /**  刷怪boss */
		 static getBossGroupIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossGroupID;
			}
			return 0;
		}
		 /**  普通掉落 */
		 static getHookDropIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hookDropID;
			}
			return 0;
		}
		 /**  Boss掉落 */
		 static getBossDropIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossDropID;
			}
			return 0;
		}
		 /**  使用道具掉落 */
		 static getUseItemDropIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useItemDropID;
			}
			return 0;
		}
		 /**  战斗完CD */
		 static getFightCDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightCD;
			}
			return 0;
		}
		 /**  最大远航积分 */
		 static getMaxSailPointByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxSailPoint;
			}
			return 0;
		}
		 /**  推荐战力 */
		 static getPowerByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.power;
			}
			return 0;
		}
		 /**  BOSS来袭形象 */
		 static getBossShapeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossShape;
			}
			return 0;
		}
		 /**  奖励预览 */
		 static getPrizePreviewByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizePreview;
			}
			return 0;
		}
		 /**  背景图 */
		 static getBgmapByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bgmap;
			}
			return ""
		}

}
	
cfg.HookStageBaseCfgData = HookStageBaseCfgData

class HookSceneBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "sceneID");
		};
		 /**  场景ID */
		 static getSceneIDBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneID;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterNameBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapterName;
			}
			return ""
		}
		 /**  场景名称 */
		 static getSceneNameBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneName;
			}
			return ""
		}
		 /**  场景类型 */
		 static getBelongTypeBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.belongType;
			}
			return 0;
		}
		 /**  需要等级 */
		 static getNeedLevelBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  需要前置关卡 */
		 static getNeedStageBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStage;
			}
			return 0;
		}
		 /**  场景资源名称 */
		 static getSceneResourceBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneResource;
			}
			return ""
		}
		 /**  场景背景音乐 */
		 static getBGMPathBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bGMPath;
			}
			return ""
		}
		 /**  关卡数 */
		 static getStageBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return ""
		}
		 /**  节点 */
		 static getNodenunmBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.nodenunm;
			}
			return ""
		}

}
	
cfg.HookSceneBaseCfgData = HookSceneBaseCfgData

class HookStagePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageID");
		};
		 /**  关卡ID */
		 static getStageIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  关卡奖励道具ID_数量; */
		 static getStagePrizeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stagePrize;
			}
			return ""
		}
		 /**  广播 */
		 static getBroadcastByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.broadcast;
			}
			return 0;
		}
		 /**  是否预告 */
		 static getIsTargetByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isTarget;
			}
			return 0;
		}
		 /**  是否御三家 */
		 static getThreeHomeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.threeHome;
			}
			return 0;
		}

}
	
cfg.HookStagePrizeBaseCfgData = HookStagePrizeBaseCfgData

class HookBossDropInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  ID */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  道具列表 */
		 static getItemListByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemList;
			}
			return ""
		}

}
	
cfg.HookBossDropInfoBaseCfgData = HookBossDropInfoBaseCfgData

class HookStagePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageID");
		};
		 /**  关卡ID */
		 static getStageIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  关卡奖励道具ID_数量; */
		 static getStagePrizeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stagePrize;
			}
			return ""
		}
		 /**  广播 */
		 static getBroadcastByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.broadcast;
			}
			return 0;
		}
		 /**  是否预告 */
		 static getIsTargetByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isTarget;
			}
			return 0;
		}
		 /**  是否御三家 */
		 static getThreeHomeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.threeHome;
			}
			return 0;
		}

}
	
cfg.HookStagePrizeBaseCfgData = HookStagePrizeBaseCfgData

class HookBuySweepcountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "buyCount");
		};
		 /**  次数 */
		 static getBuyCountByBuyCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyCount;
			}
			return 0;
		}
		 /**  需要钻石 */
		 static getNeedDiamondByBuyCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDiamond;
			}
			return 0;
		}

}
	
cfg.HookBuySweepcountBaseCfgData = HookBuySweepcountBaseCfgData

class HookActivityDropBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  每小时固定掉落个数 */
		 static getHourCountByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hourCount;
			}
			return 0;
		}
		 /**  道具ID */
		 static getItemIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  持续天数(0与活动一致) */
		 static getDaysByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.days;
			}
			return 0;
		}

}
	
cfg.HookActivityDropBaseCfgData = HookActivityDropBaseCfgData

class HookBuySweepcountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "buyCount");
		};
		 /**  次数 */
		 static getBuyCountByBuyCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyCount;
			}
			return 0;
		}
		 /**  需要钻石 */
		 static getNeedDiamondByBuyCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDiamond;
			}
			return 0;
		}

}
	
cfg.HookBuySweepcountBaseCfgData = HookBuySweepcountBaseCfgData

class HookActivityDropBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "activityID");
		};
		 /**  活动ID */
		 static getActivityIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.activityID;
			}
			return 0;
		}
		 /**  每小时固定掉落个数 */
		 static getHourCountByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hourCount;
			}
			return 0;
		}
		 /**  道具ID */
		 static getItemIDByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  持续天数(0与活动一致) */
		 static getDaysByActivityID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.days;
			}
			return 0;
		}

}
	
cfg.HookActivityDropBaseCfgData = HookActivityDropBaseCfgData

class HookSceneBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "sceneID");
		};
		 /**  场景ID */
		 static getSceneIDBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneID;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterNameBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapterName;
			}
			return ""
		}
		 /**  场景名称 */
		 static getSceneNameBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneName;
			}
			return ""
		}
		 /**  场景类型 */
		 static getBelongTypeBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.belongType;
			}
			return 0;
		}
		 /**  需要等级 */
		 static getNeedLevelBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  需要前置关卡 */
		 static getNeedStageBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStage;
			}
			return 0;
		}
		 /**  场景资源名称 */
		 static getSceneResourceBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneResource;
			}
			return ""
		}
		 /**  场景背景音乐 */
		 static getBGMPathBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bGMPath;
			}
			return ""
		}
		 /**  关卡数 */
		 static getStageBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return ""
		}
		 /**  节点 */
		 static getNodenunmBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.nodenunm;
			}
			return ""
		}

}
	
cfg.HookSceneBaseCfgData = HookSceneBaseCfgData

class HookBossDropInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  ID */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  道具列表 */
		 static getItemListByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemList;
			}
			return ""
		}

}
	
cfg.HookBossDropInfoBaseCfgData = HookBossDropInfoBaseCfgData

class HookNormalDropInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  ID */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  道具列表 */
		 static getItemListByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemList;
			}
			return ""
		}

}
	
cfg.HookNormalDropInfoBaseCfgData = HookNormalDropInfoBaseCfgData

class HookChapterUnlockBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  区域ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  区域名 */
		 static getAreaNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.areaName;
			}
			return ""
		}
		 /**  场景列表 */
		 static getSceneListByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneList;
			}
			return ""
		}

}
	
cfg.HookChapterUnlockBaseCfgData = HookChapterUnlockBaseCfgData

class HookNormalDropInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  ID */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  道具列表 */
		 static getItemListByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemList;
			}
			return ""
		}

}
	
cfg.HookNormalDropInfoBaseCfgData = HookNormalDropInfoBaseCfgData

class HookChapterUnlockBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  区域ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  区域名 */
		 static getAreaNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.areaName;
			}
			return ""
		}
		 /**  场景列表 */
		 static getSceneListByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneList;
			}
			return ""
		}

}
	
cfg.HookChapterUnlockBaseCfgData = HookChapterUnlockBaseCfgData

class HookMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  Boss序号 */
		 static getBossIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossIndex;
			}
			return 0;
		}
		 /**  fuck ,为什么不加描述 */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}
		 /**  Boss名称 */
		 static getBossNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossName;
			}
			return ""
		}

}
	
cfg.HookMonsterNewBaseCfgData = HookMonsterNewBaseCfgData

class HookBuySweepcountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "buyCount");
		};
		 /**  次数 */
		 static getBuyCountByBuyCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyCount;
			}
			return 0;
		}
		 /**  需要钻石 */
		 static getNeedDiamondByBuyCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDiamond;
			}
			return 0;
		}

}
	
cfg.HookBuySweepcountBaseCfgData = HookBuySweepcountBaseCfgData

class HookMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  Boss序号 */
		 static getBossIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossIndex;
			}
			return 0;
		}
		 /**  fuck ,为什么不加描述 */
		 static getMonsterInfoByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monsterInfo;
			}
			return ""
		}
		 /**  Boss名称 */
		 static getBossNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossName;
			}
			return ""
		}

}
	
cfg.HookMonsterNewBaseCfgData = HookMonsterNewBaseCfgData

class HookStagePrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageID");
		};
		 /**  关卡ID */
		 static getStageIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  关卡奖励道具ID_数量; */
		 static getStagePrizeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stagePrize;
			}
			return ""
		}
		 /**  广播 */
		 static getBroadcastByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.broadcast;
			}
			return 0;
		}
		 /**  是否预告 */
		 static getIsTargetByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isTarget;
			}
			return 0;
		}
		 /**  是否御三家 */
		 static getThreeHomeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.threeHome;
			}
			return 0;
		}

}
	
cfg.HookStagePrizeBaseCfgData = HookStagePrizeBaseCfgData

class HookStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageID");
		};
		 /**  关卡ID */
		 static getStageIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  场景ID */
		 static getSceneIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneID;
			}
			return 0;
		}
		 /**  需要玩家等级 */
		 static getNeedPlayerLevelByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPlayerLevel;
			}
			return 0;
		}
		 /**  最大回合 */
		 static getMaxRoundByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxRound;
			}
			return 0;
		}
		 /**  刷怪boss */
		 static getBossGroupIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossGroupID;
			}
			return 0;
		}
		 /**  普通掉落 */
		 static getHookDropIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hookDropID;
			}
			return 0;
		}
		 /**  Boss掉落 */
		 static getBossDropIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossDropID;
			}
			return 0;
		}
		 /**  使用道具掉落 */
		 static getUseItemDropIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useItemDropID;
			}
			return 0;
		}
		 /**  战斗完CD */
		 static getFightCDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightCD;
			}
			return 0;
		}
		 /**  最大远航积分 */
		 static getMaxSailPointByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxSailPoint;
			}
			return 0;
		}
		 /**  推荐战力 */
		 static getPowerByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.power;
			}
			return 0;
		}
		 /**  BOSS来袭形象 */
		 static getBossShapeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bossShape;
			}
			return 0;
		}
		 /**  奖励预览 */
		 static getPrizePreviewByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizePreview;
			}
			return 0;
		}
		 /**  背景图 */
		 static getBgmapByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bgmap;
			}
			return ""
		}

}
	
cfg.HookStageBaseCfgData = HookStageBaseCfgData

class HookSceneBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "sceneID");
		};
		 /**  场景ID */
		 static getSceneIDBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneID;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterNameBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapterName;
			}
			return ""
		}
		 /**  场景名称 */
		 static getSceneNameBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneName;
			}
			return ""
		}
		 /**  场景类型 */
		 static getBelongTypeBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.belongType;
			}
			return 0;
		}
		 /**  需要等级 */
		 static getNeedLevelBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  需要前置关卡 */
		 static getNeedStageBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStage;
			}
			return 0;
		}
		 /**  场景资源名称 */
		 static getSceneResourceBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sceneResource;
			}
			return ""
		}
		 /**  场景背景音乐 */
		 static getBGMPathBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bGMPath;
			}
			return ""
		}
		 /**  关卡数 */
		 static getStageBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return ""
		}
		 /**  节点 */
		 static getNodenunmBySceneID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.nodenunm;
			}
			return ""
		}

}
	
cfg.HookSceneBaseCfgData = HookSceneBaseCfgData

class HookBossDropInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  ID */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  章节 */
		 static getChapterByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chapter;
			}
			return 0;
		}
		 /**  关卡 */
		 static getStageByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stage;
			}
			return 0;
		}
		 /**  道具列表 */
		 static getItemListByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemList;
			}
			return ""
		}

}
	
cfg.HookBossDropInfoBaseCfgData = HookBossDropInfoBaseCfgData

class HorcruxConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "awakeStar");
		};
		 /**  可觉醒星级 */
		 static getAwakeStarByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awakeStar;
			}
			return 0;
		}
		 /**  30级后升级所需星级 */
		 static getContinueStarByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.continueStar;
			}
			return ""
		}
		 /**  新技能等级 */
		 static getNewSkillLevelByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newSkillLevel;
			}
			return 0;
		}
		 /**  消耗本体最低等级 */
		 static getConsumeSelfLevelByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.consumeSelfLevel;
			}
			return 0;
		}
		 /**  描述对应等级 */
		 static getDesLevelByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desLevel;
			}
			return ""
		}
		 /**  拥有魂器最低星级 */
		 static getMinBeginStarByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minBeginStar;
			}
			return 0;
		}

}
	
cfg.HorcruxConstBaseCfgData = HorcruxConstBaseCfgData

class HorcruxPropBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  携带物ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  强化所需材料_数量 */
		 static getMaterialsByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.materials;
			}
			return ""
		}
		 /**  精灵本体ID_星级_数量 */
		 static getPetSelfByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petSelf;
			}
			return ""
		}
		 /**  获取道具 */
		 static getGetItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.getItem;
			}
			return ""
		}
		 /**  追加属性 */
		 static getPropNumByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.propNum;
			}
			return ""
		}
		 /**  技能 */
		 static getSkillByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skill;
			}
			return ""
		}
		 /**  战力 */
		 static getFightPowerByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return 0;
		}
		 /**  携带物评分 */
		 static getScoreByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.score;
			}
			return 0;
		}

}
	
cfg.HorcruxPropBaseCfgData = HorcruxPropBaseCfgData

class HorcruxConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "awakeStar");
		};
		 /**  可觉醒星级 */
		 static getAwakeStarByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awakeStar;
			}
			return 0;
		}
		 /**  30级后升级所需星级 */
		 static getContinueStarByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.continueStar;
			}
			return ""
		}
		 /**  新技能等级 */
		 static getNewSkillLevelByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newSkillLevel;
			}
			return 0;
		}
		 /**  消耗本体最低等级 */
		 static getConsumeSelfLevelByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.consumeSelfLevel;
			}
			return 0;
		}
		 /**  描述对应等级 */
		 static getDesLevelByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desLevel;
			}
			return ""
		}
		 /**  拥有魂器最低星级 */
		 static getMinBeginStarByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minBeginStar;
			}
			return 0;
		}

}
	
cfg.HorcruxConstBaseCfgData = HorcruxConstBaseCfgData

class HorcruxPropBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  携带物ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  强化所需材料_数量 */
		 static getMaterialsByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.materials;
			}
			return ""
		}
		 /**  精灵本体ID_星级_数量 */
		 static getPetSelfByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petSelf;
			}
			return ""
		}
		 /**  获取道具 */
		 static getGetItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.getItem;
			}
			return ""
		}
		 /**  追加属性 */
		 static getPropNumByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.propNum;
			}
			return ""
		}
		 /**  技能 */
		 static getSkillByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skill;
			}
			return ""
		}
		 /**  战力 */
		 static getFightPowerByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return 0;
		}
		 /**  携带物评分 */
		 static getScoreByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.score;
			}
			return 0;
		}

}
	
cfg.HorcruxPropBaseCfgData = HorcruxPropBaseCfgData

class HorcruxBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  携带物ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  携带物名 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  所属精灵 */
		 static getPetIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  效果描述文本1 */
		 static getEffectDesc1ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc1;
			}
			return ""
		}
		 /**  效果描述文本2 */
		 static getEffectDesc2ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc2;
			}
			return ""
		}
		 /**  效果描述文本3 */
		 static getEffectDesc3ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc3;
			}
			return ""
		}
		 /**  效果描述文本4 */
		 static getEffectDesc4ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc4;
			}
			return ""
		}
		 /**  背景文案 */
		 static getBackGroundByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.backGround;
			}
			return ""
		}
		 /**  美术图标 */
		 static getIconByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.icon;
			}
			return ""
		}

}
	
cfg.HorcruxBaseCfgData = HorcruxBaseCfgData

class HorcruxConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "awakeStar");
		};
		 /**  可觉醒星级 */
		 static getAwakeStarByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awakeStar;
			}
			return 0;
		}
		 /**  30级后升级所需星级 */
		 static getContinueStarByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.continueStar;
			}
			return ""
		}
		 /**  新技能等级 */
		 static getNewSkillLevelByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newSkillLevel;
			}
			return 0;
		}
		 /**  消耗本体最低等级 */
		 static getConsumeSelfLevelByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.consumeSelfLevel;
			}
			return 0;
		}
		 /**  描述对应等级 */
		 static getDesLevelByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desLevel;
			}
			return ""
		}
		 /**  拥有魂器最低星级 */
		 static getMinBeginStarByAwakeStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minBeginStar;
			}
			return 0;
		}

}
	
cfg.HorcruxConstBaseCfgData = HorcruxConstBaseCfgData

class HorcruxBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  携带物ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  携带物名 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  所属精灵 */
		 static getPetIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  效果描述文本1 */
		 static getEffectDesc1ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc1;
			}
			return ""
		}
		 /**  效果描述文本2 */
		 static getEffectDesc2ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc2;
			}
			return ""
		}
		 /**  效果描述文本3 */
		 static getEffectDesc3ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc3;
			}
			return ""
		}
		 /**  效果描述文本4 */
		 static getEffectDesc4ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc4;
			}
			return ""
		}
		 /**  背景文案 */
		 static getBackGroundByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.backGround;
			}
			return ""
		}
		 /**  美术图标 */
		 static getIconByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.icon;
			}
			return ""
		}

}
	
cfg.HorcruxBaseCfgData = HorcruxBaseCfgData

class HorcruxPropBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  携带物ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  等级 */
		 static getLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  强化所需材料_数量 */
		 static getMaterialsByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.materials;
			}
			return ""
		}
		 /**  精灵本体ID_星级_数量 */
		 static getPetSelfByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petSelf;
			}
			return ""
		}
		 /**  获取道具 */
		 static getGetItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.getItem;
			}
			return ""
		}
		 /**  追加属性 */
		 static getPropNumByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.propNum;
			}
			return ""
		}
		 /**  技能 */
		 static getSkillByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skill;
			}
			return ""
		}
		 /**  战力 */
		 static getFightPowerByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return 0;
		}
		 /**  携带物评分 */
		 static getScoreByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.score;
			}
			return 0;
		}

}
	
cfg.HorcruxPropBaseCfgData = HorcruxPropBaseCfgData

class HorcruxBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  携带物ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  携带物名 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  所属精灵 */
		 static getPetIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  效果描述文本1 */
		 static getEffectDesc1ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc1;
			}
			return ""
		}
		 /**  效果描述文本2 */
		 static getEffectDesc2ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc2;
			}
			return ""
		}
		 /**  效果描述文本3 */
		 static getEffectDesc3ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc3;
			}
			return ""
		}
		 /**  效果描述文本4 */
		 static getEffectDesc4ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.effectDesc4;
			}
			return ""
		}
		 /**  背景文案 */
		 static getBackGroundByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.backGround;
			}
			return ""
		}
		 /**  美术图标 */
		 static getIconByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.icon;
			}
			return ""
		}

}
	
cfg.HorcruxBaseCfgData = HorcruxBaseCfgData

class IllustrationAchieveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  成就id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  完成后的奖励 */
		 static getAddItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.IllustrationAchieveBaseCfgData = IllustrationAchieveBaseCfgData

class IllustrationTrammelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  羁绊id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  需要的皮肤id */
		 static getNeedSkinsById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needSkins;
			}
			return ""
		}
		 /**  激活后加的属性 */
		 static getAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  加成属性战力值 */
		 static getFightPowerById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return 0;
		}
		 /**  精灵组合称号 */
		 static getCombinationtitleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.combinationtitle;
			}
			return ""
		}

}
	
cfg.IllustrationTrammelBaseCfgData = IllustrationTrammelBaseCfgData

class IllustrationPowerBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  成就id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  完成后的奖励 */
		 static getAddItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.IllustrationPowerBaseCfgData = IllustrationPowerBaseCfgData

class IllustrationPowerBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  成就id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  完成后的奖励 */
		 static getAddItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.IllustrationPowerBaseCfgData = IllustrationPowerBaseCfgData

class IllustrationTrammelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  羁绊id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  需要的皮肤id */
		 static getNeedSkinsById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needSkins;
			}
			return ""
		}
		 /**  激活后加的属性 */
		 static getAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  加成属性战力值 */
		 static getFightPowerById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return 0;
		}
		 /**  精灵组合称号 */
		 static getCombinationtitleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.combinationtitle;
			}
			return ""
		}

}
	
cfg.IllustrationTrammelBaseCfgData = IllustrationTrammelBaseCfgData

class IllustrationPowerBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  成就id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  完成后的奖励 */
		 static getAddItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.IllustrationPowerBaseCfgData = IllustrationPowerBaseCfgData

class IllustrationAchieveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  成就id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  完成后的奖励 */
		 static getAddItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.IllustrationAchieveBaseCfgData = IllustrationAchieveBaseCfgData

class IllustrationTrammelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  羁绊id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  需要的皮肤id */
		 static getNeedSkinsById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needSkins;
			}
			return ""
		}
		 /**  激活后加的属性 */
		 static getAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr;
			}
			return ""
		}
		 /**  加成属性战力值 */
		 static getFightPowerById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return 0;
		}
		 /**  精灵组合称号 */
		 static getCombinationtitleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.combinationtitle;
			}
			return ""
		}

}
	
cfg.IllustrationTrammelBaseCfgData = IllustrationTrammelBaseCfgData

class IllustrationAchieveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  成就id */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  成就类型 */
		 static getAchieveTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveType;
			}
			return 0;
		}
		 /**  成就子类型 */
		 static getAchieveSubTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.achieveSubType;
			}
			return 0;
		}
		 /**  值 */
		 static getValueById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.value;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  完成后的奖励 */
		 static getAddItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.IllustrationAchieveBaseCfgData = IllustrationAchieveBaseCfgData

class IncubateConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "minStep");
		};
		 /**  每分钟步数 */
		 static getMinStepByMinStep(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStep;
			}
			return 0;
		}

}
	
cfg.IncubateConstBaseCfgData = IncubateConstBaseCfgData

class IncubateConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "minStep");
		};
		 /**  每分钟步数 */
		 static getMinStepByMinStep(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStep;
			}
			return 0;
		}

}
	
cfg.IncubateConstBaseCfgData = IncubateConstBaseCfgData

class IncubateSpeedUpBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  道具ID */
		 static getItemIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  道具类型 */
		 static getItemTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemType;
			}
			return 0;
		}
		 /**  加速参数 */
		 static getSpeedUpParamByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.speedUpParam;
			}
			return ""
		}

}
	
cfg.IncubateSpeedUpBaseCfgData = IncubateSpeedUpBaseCfgData

class IncubatePetEggBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  精灵ID */
		 static getPetIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petId;
			}
			return 0;
		}
		 /**  精灵星级 */
		 static getPetStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  孵蛋价格 */
		 static getEggPriceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.eggPrice;
			}
			return ""
		}
		 /**  需求步数 */
		 static getNeedStepByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStep;
			}
			return 0;
		}

}
	
cfg.IncubatePetEggBaseCfgData = IncubatePetEggBaseCfgData

class IncubatePetEggBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  精灵ID */
		 static getPetIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petId;
			}
			return 0;
		}
		 /**  精灵星级 */
		 static getPetStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  孵蛋价格 */
		 static getEggPriceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.eggPrice;
			}
			return ""
		}
		 /**  需求步数 */
		 static getNeedStepByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStep;
			}
			return 0;
		}

}
	
cfg.IncubatePetEggBaseCfgData = IncubatePetEggBaseCfgData

class IncubateSpeedUpBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  道具ID */
		 static getItemIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  道具类型 */
		 static getItemTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemType;
			}
			return 0;
		}
		 /**  加速参数 */
		 static getSpeedUpParamByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.speedUpParam;
			}
			return ""
		}

}
	
cfg.IncubateSpeedUpBaseCfgData = IncubateSpeedUpBaseCfgData

class IncubateConstBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "minStep");
		};
		 /**  每分钟步数 */
		 static getMinStepByMinStep(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStep;
			}
			return 0;
		}

}
	
cfg.IncubateConstBaseCfgData = IncubateConstBaseCfgData

class IncubatePetEggBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  精灵ID */
		 static getPetIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petId;
			}
			return 0;
		}
		 /**  精灵星级 */
		 static getPetStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  孵蛋价格 */
		 static getEggPriceByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.eggPrice;
			}
			return ""
		}
		 /**  需求步数 */
		 static getNeedStepByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStep;
			}
			return 0;
		}

}
	
cfg.IncubatePetEggBaseCfgData = IncubatePetEggBaseCfgData

class IncubateSpeedUpBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  道具ID */
		 static getItemIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  道具类型 */
		 static getItemTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemType;
			}
			return 0;
		}
		 /**  加速参数 */
		 static getSpeedUpParamByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.speedUpParam;
			}
			return ""
		}

}
	
cfg.IncubateSpeedUpBaseCfgData = IncubateSpeedUpBaseCfgData

class ItemPettypeRandBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  种族 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}

}
	
cfg.ItemPettypeRandBaseCfgData = ItemPettypeRandBaseCfgData

class ItemPetcountCompoundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  需要碎片个数 */
		 static getNeedItemCountByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItemCount;
			}
			return 0;
		}

}
	
cfg.ItemPetcountCompoundBaseCfgData = ItemPetcountCompoundBaseCfgData

class ItemPetSplitBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  增加道具道具ID_数量; */
		 static getAddItemByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  碎片增加道具道具ID_数量; */
		 static getPieceAddItemByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pieceAddItem;
			}
			return ""
		}

}
	
cfg.ItemPetSplitBaseCfgData = ItemPetSplitBaseCfgData

class ItemPackBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  编号  */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  礼包类型_1_emItemPackType */
		 static getTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  参数道具id_道具个数_概率万分比_职业； */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return ""
		}
		 /**  参数2仅礼包类型5生效填drop id */
		 static getParam2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param2;
			}
			return ""
		}

}
	
cfg.ItemPackBaseCfgData = ItemPackBaseCfgData

class ItemBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  作用 */
		 static getDesc2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc2;
			}
			return ""
		}
		 /**  类型 */
		 static getDesc3ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc3;
			}
			return ""
		}
		 /**  背包类型_emBagType */
		 static getBagTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bagType;
			}
			return 0;
		}
		 /**  物品大类_emItemType */
		 static getTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  物品子类型装备类型1：  1;//武器  2;//护甲  3;//鞋子  4;//头盔星石类型2：  1;//星辰符文  2;//月亮符文  3;//太阳符文  4;//彩虹符文  5;//闪烁符文英雄类型3：  1;//伙伴ID  2;//伙伴种族  3;//随机任意  4;//升星材料任意英雄  5;//升星材料指定英雄6：碎片随机池，配置方案为：组权重_组ID；组权重_组ID；神装类型5：  1;//耳环  2;//项链  3;//戒指  4;//手镯特权类型6：  特权卡ID（cs_privilege-card-CardID）   */
		 static getSubTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.subType;
			}
			return 0;
		}
		 /**  使用类型_emItemUseType */
		 static getUseTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useType;
			}
			return 0;
		}
		 /**  每日使用次数 */
		 static getMaxDayUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxDayUseCount;
			}
			return 0;
		}
		 /**  每周使用次数 */
		 static getMaxWeekUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxWeekUseCount;
			}
			return 0;
		}
		 /**  每月使用次数 */
		 static getMaxMonthUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxMonthUseCount;
			}
			return 0;
		}
		 /**  永久使用次数 */
		 static getMaxForeverUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxForeverUseCount;
			}
			return 0;
		}
		 /**  掩码_emItemMark */
		 static getMarkById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mark;
			}
			return ""
		}
		 /**  是否自动使用0 //不提示不使用；1 //弹出提示且20s倒计时自动使用；2 //弹出提示但不自动使用；默认0 */
		 static getSmartUseById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.smart_use;
			}
			return 0;
		}
		 /**  物品等级 */
		 static getLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  物品星数 */
		 static getStarNumById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starNum;
			}
			return 0;
		}
		 /**  最大堆叠数量 默认为0，表示无限叠加 */
		 static getMaxCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}
		 /**  品质 _emItemQualityType */
		 static getQualityById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.quality;
			}
			return 0;
		}
		 /**  闪光特效 */
		 static getFlashById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.flash;
			}
			return 0;
		}
		 /**  商店回收价格(0标示不能回收) */
		 static getSellPriceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sellPrice;
			}
			return ""
		}
		 /**  CD(时间ms) */
		 static getCDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cD;
			}
			return 0;
		}
		 /**  有效时间(秒) */
		 static getExpireTimeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireTime;
			}
			return 0;
		}
		 /**  合成的ID道具表示ID伙伴表示ID/种族 */
		 static getCompoundIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.compoundID;
			}
			return 0;
		}
		 /**  使用参数 */
		 static getUseParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useParam;
			}
			return ""
		}
		 /**  购买价格全额价格钻石 */
		 static getBuyNeedDiamondById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyNeedDiamond;
			}
			return 0;
		}
		 /**  评分 */
		 static getAddScoreById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  属性点类型|值;类型|值;类型:_emBattleAttribute */
		 static getAddAttriById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttri;
			}
			return ""
		}
		 /**   物品获取途径，对应uiconfig */
		 static getGetwayById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.getway;
			}
			return ""
		}
		 /**  使用跳转途径 */
		 static getUseWayById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useWay;
			}
			return 0;
		}
		 /**  图标名称 */
		 static getIconNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iconName;
			}
			return ""
		}

}
	
cfg.ItemBaseCfgData = ItemBaseCfgData

class ItemPetidRandBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  种族 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  星级 */
		 static getPetStarByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}

}
	
cfg.ItemPetidRandBaseCfgData = ItemPetidRandBaseCfgData

class ItemPackBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  编号  */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  礼包类型_1_emItemPackType */
		 static getTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  参数道具id_道具个数_概率万分比_职业； */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return ""
		}
		 /**  参数2仅礼包类型5生效填drop id */
		 static getParam2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param2;
			}
			return ""
		}

}
	
cfg.ItemPackBaseCfgData = ItemPackBaseCfgData

class ItemCompoundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "itemID");
		};
		 /**  道具ID */
		 static getItemIDByItemID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  需要道具消耗道具ID_数量; */
		 static getNeedItemExpendByItemID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItemExpend;
			}
			return ""
		}
		 /**  需要道具道具ID_数量; */
		 static getNeedItemByItemID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ItemCompoundBaseCfgData = ItemCompoundBaseCfgData

class ItemPetcountCompoundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  需要碎片个数 */
		 static getNeedItemCountByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItemCount;
			}
			return 0;
		}

}
	
cfg.ItemPetcountCompoundBaseCfgData = ItemPetcountCompoundBaseCfgData

class ItemPettypeRandBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  种族 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}

}
	
cfg.ItemPettypeRandBaseCfgData = ItemPettypeRandBaseCfgData

class ItemPetidRandBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  种族 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  星级 */
		 static getPetStarByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}

}
	
cfg.ItemPetidRandBaseCfgData = ItemPetidRandBaseCfgData

class ItemPetSplitBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  增加道具道具ID_数量; */
		 static getAddItemByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  碎片增加道具道具ID_数量; */
		 static getPieceAddItemByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pieceAddItem;
			}
			return ""
		}

}
	
cfg.ItemPetSplitBaseCfgData = ItemPetSplitBaseCfgData

class ItemGiftPackBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  礼包对应的道具ID */
		 static getItemIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  礼包类型 */
		 static getBagTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bagType;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  道具组列表 */
		 static getItemGroupById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemGroup;
			}
			return ""
		}
		 /**  获得道具组数量 */
		 static getAwardNumById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awardNum;
			}
			return 0;
		}

}
	
cfg.ItemGiftPackBaseCfgData = ItemGiftPackBaseCfgData

class ItemCompoundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "itemID");
		};
		 /**  道具ID */
		 static getItemIDByItemID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  需要道具消耗道具ID_数量; */
		 static getNeedItemExpendByItemID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItemExpend;
			}
			return ""
		}
		 /**  需要道具道具ID_数量; */
		 static getNeedItemByItemID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ItemCompoundBaseCfgData = ItemCompoundBaseCfgData

class ItemBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  作用 */
		 static getDesc2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc2;
			}
			return ""
		}
		 /**  类型 */
		 static getDesc3ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc3;
			}
			return ""
		}
		 /**  背包类型_emBagType */
		 static getBagTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bagType;
			}
			return 0;
		}
		 /**  物品大类_emItemType */
		 static getTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  物品子类型装备类型1：  1;//武器  2;//护甲  3;//鞋子  4;//头盔星石类型2：  1;//星辰符文  2;//月亮符文  3;//太阳符文  4;//彩虹符文  5;//闪烁符文英雄类型3：  1;//伙伴ID  2;//伙伴种族  3;//随机任意  4;//升星材料任意英雄  5;//升星材料指定英雄6：碎片随机池，配置方案为：组权重_组ID；组权重_组ID；神装类型5：  1;//耳环  2;//项链  3;//戒指  4;//手镯特权类型6：  特权卡ID（cs_privilege-card-CardID）   */
		 static getSubTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.subType;
			}
			return 0;
		}
		 /**  使用类型_emItemUseType */
		 static getUseTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useType;
			}
			return 0;
		}
		 /**  每日使用次数 */
		 static getMaxDayUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxDayUseCount;
			}
			return 0;
		}
		 /**  每周使用次数 */
		 static getMaxWeekUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxWeekUseCount;
			}
			return 0;
		}
		 /**  每月使用次数 */
		 static getMaxMonthUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxMonthUseCount;
			}
			return 0;
		}
		 /**  永久使用次数 */
		 static getMaxForeverUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxForeverUseCount;
			}
			return 0;
		}
		 /**  掩码_emItemMark */
		 static getMarkById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mark;
			}
			return ""
		}
		 /**  是否自动使用0 //不提示不使用；1 //弹出提示且20s倒计时自动使用；2 //弹出提示但不自动使用；默认0 */
		 static getSmartUseById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.smart_use;
			}
			return 0;
		}
		 /**  物品等级 */
		 static getLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  物品星数 */
		 static getStarNumById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starNum;
			}
			return 0;
		}
		 /**  最大堆叠数量 默认为0，表示无限叠加 */
		 static getMaxCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}
		 /**  品质 _emItemQualityType */
		 static getQualityById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.quality;
			}
			return 0;
		}
		 /**  闪光特效 */
		 static getFlashById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.flash;
			}
			return 0;
		}
		 /**  商店回收价格(0标示不能回收) */
		 static getSellPriceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sellPrice;
			}
			return ""
		}
		 /**  CD(时间ms) */
		 static getCDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cD;
			}
			return 0;
		}
		 /**  有效时间(秒) */
		 static getExpireTimeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireTime;
			}
			return 0;
		}
		 /**  合成的ID道具表示ID伙伴表示ID/种族 */
		 static getCompoundIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.compoundID;
			}
			return 0;
		}
		 /**  使用参数 */
		 static getUseParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useParam;
			}
			return ""
		}
		 /**  购买价格全额价格钻石 */
		 static getBuyNeedDiamondById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyNeedDiamond;
			}
			return 0;
		}
		 /**  评分 */
		 static getAddScoreById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  属性点类型|值;类型|值;类型:_emBattleAttribute */
		 static getAddAttriById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttri;
			}
			return ""
		}
		 /**   物品获取途径，对应uiconfig */
		 static getGetwayById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.getway;
			}
			return ""
		}
		 /**  使用跳转途径 */
		 static getUseWayById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useWay;
			}
			return 0;
		}
		 /**  图标名称 */
		 static getIconNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iconName;
			}
			return ""
		}

}
	
cfg.ItemBaseCfgData = ItemBaseCfgData

class ItemPackBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  编号  */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  礼包类型_1_emItemPackType */
		 static getTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  参数道具id_道具个数_概率万分比_职业； */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return ""
		}
		 /**  参数2仅礼包类型5生效填drop id */
		 static getParam2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param2;
			}
			return ""
		}

}
	
cfg.ItemPackBaseCfgData = ItemPackBaseCfgData

class ItemCompoundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "itemID");
		};
		 /**  道具ID */
		 static getItemIDByItemID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  需要道具消耗道具ID_数量; */
		 static getNeedItemExpendByItemID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItemExpend;
			}
			return ""
		}
		 /**  需要道具道具ID_数量; */
		 static getNeedItemByItemID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ItemCompoundBaseCfgData = ItemCompoundBaseCfgData

class ItemPetcountCompoundBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  需要碎片个数 */
		 static getNeedItemCountByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItemCount;
			}
			return 0;
		}

}
	
cfg.ItemPetcountCompoundBaseCfgData = ItemPetcountCompoundBaseCfgData

class ItemPettypeRandBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  种族 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}

}
	
cfg.ItemPettypeRandBaseCfgData = ItemPettypeRandBaseCfgData

class ItemPetidRandBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  种族 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  星级 */
		 static getPetStarByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}

}
	
cfg.ItemPetidRandBaseCfgData = ItemPetidRandBaseCfgData

class ItemEquipSuitBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "equipLevel");
		};
		 /**  装备等级 */
		 static getEquipLevelByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.equipLevel;
			}
			return 0;
		}
		 /**  2件加属性属性类型|属性值|属性万分比 */
		 static getAddAttr2ByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr2;
			}
			return ""
		}
		 /**  3件加属性 */
		 static getAddAttr3ByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr3;
			}
			return ""
		}
		 /**  4件加属性 */
		 static getAddAttr4ByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr4;
			}
			return ""
		}

}
	
cfg.ItemEquipSuitBaseCfgData = ItemEquipSuitBaseCfgData

class ItemEquipSuitBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "equipLevel");
		};
		 /**  装备等级 */
		 static getEquipLevelByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.equipLevel;
			}
			return 0;
		}
		 /**  2件加属性属性类型|属性值|属性万分比 */
		 static getAddAttr2ByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr2;
			}
			return ""
		}
		 /**  3件加属性 */
		 static getAddAttr3ByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr3;
			}
			return ""
		}
		 /**  4件加属性 */
		 static getAddAttr4ByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr4;
			}
			return ""
		}

}
	
cfg.ItemEquipSuitBaseCfgData = ItemEquipSuitBaseCfgData

class ItemGiftPackBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  礼包对应的道具ID */
		 static getItemIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  礼包类型 */
		 static getBagTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bagType;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  道具组列表 */
		 static getItemGroupById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemGroup;
			}
			return ""
		}
		 /**  获得道具组数量 */
		 static getAwardNumById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awardNum;
			}
			return 0;
		}

}
	
cfg.ItemGiftPackBaseCfgData = ItemGiftPackBaseCfgData

class ItemGiftPackBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  礼包对应的道具ID */
		 static getItemIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemID;
			}
			return 0;
		}
		 /**  礼包类型 */
		 static getBagTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bagType;
			}
			return 0;
		}
		 /**  参数 */
		 static getParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.param;
			}
			return 0;
		}
		 /**  道具组列表 */
		 static getItemGroupById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemGroup;
			}
			return ""
		}
		 /**  获得道具组数量 */
		 static getAwardNumById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.awardNum;
			}
			return 0;
		}

}
	
cfg.ItemGiftPackBaseCfgData = ItemGiftPackBaseCfgData

class ItemBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  作用 */
		 static getDesc2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc2;
			}
			return ""
		}
		 /**  类型 */
		 static getDesc3ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc3;
			}
			return ""
		}
		 /**  背包类型_emBagType */
		 static getBagTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bagType;
			}
			return 0;
		}
		 /**  物品大类_emItemType */
		 static getTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  物品子类型装备类型1：  1;//武器  2;//护甲  3;//鞋子  4;//头盔星石类型2：  1;//星辰符文  2;//月亮符文  3;//太阳符文  4;//彩虹符文  5;//闪烁符文英雄类型3：  1;//伙伴ID  2;//伙伴种族  3;//随机任意  4;//升星材料任意英雄  5;//升星材料指定英雄6：碎片随机池，配置方案为：组权重_组ID；组权重_组ID；神装类型5：  1;//耳环  2;//项链  3;//戒指  4;//手镯特权类型6：  特权卡ID（cs_privilege-card-CardID）   */
		 static getSubTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.subType;
			}
			return 0;
		}
		 /**  使用类型_emItemUseType */
		 static getUseTypeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useType;
			}
			return 0;
		}
		 /**  每日使用次数 */
		 static getMaxDayUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxDayUseCount;
			}
			return 0;
		}
		 /**  每周使用次数 */
		 static getMaxWeekUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxWeekUseCount;
			}
			return 0;
		}
		 /**  每月使用次数 */
		 static getMaxMonthUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxMonthUseCount;
			}
			return 0;
		}
		 /**  永久使用次数 */
		 static getMaxForeverUseCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxForeverUseCount;
			}
			return 0;
		}
		 /**  掩码_emItemMark */
		 static getMarkById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mark;
			}
			return ""
		}
		 /**  是否自动使用0 //不提示不使用；1 //弹出提示且20s倒计时自动使用；2 //弹出提示但不自动使用；默认0 */
		 static getSmartUseById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.smart_use;
			}
			return 0;
		}
		 /**  物品等级 */
		 static getLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  物品星数 */
		 static getStarNumById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starNum;
			}
			return 0;
		}
		 /**  最大堆叠数量 默认为0，表示无限叠加 */
		 static getMaxCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}
		 /**  品质 _emItemQualityType */
		 static getQualityById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.quality;
			}
			return 0;
		}
		 /**  闪光特效 */
		 static getFlashById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.flash;
			}
			return 0;
		}
		 /**  商店回收价格(0标示不能回收) */
		 static getSellPriceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.sellPrice;
			}
			return ""
		}
		 /**  CD(时间ms) */
		 static getCDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cD;
			}
			return 0;
		}
		 /**  有效时间(秒) */
		 static getExpireTimeById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireTime;
			}
			return 0;
		}
		 /**  合成的ID道具表示ID伙伴表示ID/种族 */
		 static getCompoundIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.compoundID;
			}
			return 0;
		}
		 /**  使用参数 */
		 static getUseParamById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useParam;
			}
			return ""
		}
		 /**  购买价格全额价格钻石 */
		 static getBuyNeedDiamondById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.buyNeedDiamond;
			}
			return 0;
		}
		 /**  评分 */
		 static getAddScoreById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  属性点类型|值;类型|值;类型:_emBattleAttribute */
		 static getAddAttriById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttri;
			}
			return ""
		}
		 /**   物品获取途径，对应uiconfig */
		 static getGetwayById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.getway;
			}
			return ""
		}
		 /**  使用跳转途径 */
		 static getUseWayById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.useWay;
			}
			return 0;
		}
		 /**  图标名称 */
		 static getIconNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iconName;
			}
			return ""
		}

}
	
cfg.ItemBaseCfgData = ItemBaseCfgData

class ItemEquipSuitBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "equipLevel");
		};
		 /**  装备等级 */
		 static getEquipLevelByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.equipLevel;
			}
			return 0;
		}
		 /**  2件加属性属性类型|属性值|属性万分比 */
		 static getAddAttr2ByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr2;
			}
			return ""
		}
		 /**  3件加属性 */
		 static getAddAttr3ByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr3;
			}
			return ""
		}
		 /**  4件加属性 */
		 static getAddAttr4ByEquipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addAttr4;
			}
			return ""
		}

}
	
cfg.ItemEquipSuitBaseCfgData = ItemEquipSuitBaseCfgData

class ItemPetSplitBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  增加道具道具ID_数量; */
		 static getAddItemByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  碎片增加道具道具ID_数量; */
		 static getPieceAddItemByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pieceAddItem;
			}
			return ""
		}

}
	
cfg.ItemPetSplitBaseCfgData = ItemPetSplitBaseCfgData

class JoyousLinkupJoyousLinkupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  棋盘类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  行数 */
		 static getHRowByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hRow;
			}
			return 0;
		}
		 /**  列数 */
		 static getVRowByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vRow;
			}
			return 0;
		}
		 /**  棋子种类 */
		 static getChessNumByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chessNum;
			}
			return 0;
		}
		 /**  难度系数 */
		 static getDifficultByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.difficult;
			}
			return 0;
		}
		 /**  单步时间 */
		 static getStepTimeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stepTime;
			}
			return 0;
		}
		 /**  刷新次数 */
		 static getRefreshNumByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshNum;
			}
			return 0;
		}

}
	
cfg.JoyousLinkupJoyousLinkupBaseCfgData = JoyousLinkupJoyousLinkupBaseCfgData

class JoyousLinkupStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageID");
		};
		 /**  关卡id */
		 static getStageIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  棋盘类型 */
		 static getLinkupTypeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.linkupType;
			}
			return 0;
		}

}
	
cfg.JoyousLinkupStageBaseCfgData = JoyousLinkupStageBaseCfgData

class JoyousLinkupJoyousLinkupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  棋盘类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  行数 */
		 static getHRowByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hRow;
			}
			return 0;
		}
		 /**  列数 */
		 static getVRowByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vRow;
			}
			return 0;
		}
		 /**  棋子种类 */
		 static getChessNumByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chessNum;
			}
			return 0;
		}
		 /**  难度系数 */
		 static getDifficultByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.difficult;
			}
			return 0;
		}
		 /**  单步时间 */
		 static getStepTimeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stepTime;
			}
			return 0;
		}
		 /**  刷新次数 */
		 static getRefreshNumByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshNum;
			}
			return 0;
		}

}
	
cfg.JoyousLinkupJoyousLinkupBaseCfgData = JoyousLinkupJoyousLinkupBaseCfgData

class JoyousLinkupJoyousLinkupChessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  棋子类型 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  棋子图标 */
		 static getImgByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.img;
			}
			return ""
		}

}
	
cfg.JoyousLinkupJoyousLinkupChessBaseCfgData = JoyousLinkupJoyousLinkupChessBaseCfgData

class JoyousLinkupJoyousLinkupBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  棋盘类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  行数 */
		 static getHRowByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hRow;
			}
			return 0;
		}
		 /**  列数 */
		 static getVRowByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vRow;
			}
			return 0;
		}
		 /**  棋子种类 */
		 static getChessNumByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chessNum;
			}
			return 0;
		}
		 /**  难度系数 */
		 static getDifficultByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.difficult;
			}
			return 0;
		}
		 /**  单步时间 */
		 static getStepTimeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stepTime;
			}
			return 0;
		}
		 /**  刷新次数 */
		 static getRefreshNumByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshNum;
			}
			return 0;
		}

}
	
cfg.JoyousLinkupJoyousLinkupBaseCfgData = JoyousLinkupJoyousLinkupBaseCfgData

class JoyousLinkupStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageID");
		};
		 /**  关卡id */
		 static getStageIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  棋盘类型 */
		 static getLinkupTypeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.linkupType;
			}
			return 0;
		}

}
	
cfg.JoyousLinkupStageBaseCfgData = JoyousLinkupStageBaseCfgData

class JoyousLinkupJoyousLinkupChessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  棋子类型 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  棋子图标 */
		 static getImgByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.img;
			}
			return ""
		}

}
	
cfg.JoyousLinkupJoyousLinkupChessBaseCfgData = JoyousLinkupJoyousLinkupChessBaseCfgData

class JoyousLinkupJoyousLinkupChessBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  棋子类型 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  棋子图标 */
		 static getImgByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.img;
			}
			return ""
		}

}
	
cfg.JoyousLinkupJoyousLinkupChessBaseCfgData = JoyousLinkupJoyousLinkupChessBaseCfgData

class JoyousLinkupStageBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "stageID");
		};
		 /**  关卡id */
		 static getStageIDByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.stageID;
			}
			return 0;
		}
		 /**  棋盘类型 */
		 static getLinkupTypeByStageID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.linkupType;
			}
			return 0;
		}

}
	
cfg.JoyousLinkupStageBaseCfgData = JoyousLinkupStageBaseCfgData

class LadderConstInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "dayFightCount");
		};
		 /**  免费挑战次数 */
		 static getDayFightCountByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFightCount;
			}
			return 0;
		}
		 /**  购买次数 */
		 static getDayBuyCountByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayBuyCount;
			}
			return 0;
		}
		 /**  刷新间隔时间秒 */
		 static getRefreshStepByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshStep;
			}
			return 0;
		}
		 /**  开启时间 */
		 static getOpenTimeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  奖励时间 */
		 static getPrizeTimeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeTime;
			}
			return ""
		}
		 /**  胜利奖励 */
		 static getWinPrizeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.winPrize;
			}
			return ""
		}
		 /**  失败奖励 */
		 static getFailPrizeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failPrize;
			}
			return ""
		}
		 /**  点赞奖励 */
		 static getLikePrizeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likePrize;
			}
			return ""
		}
		 /**  我的记录个数 */
		 static getMaxRecNumByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxRecNum;
			}
			return 0;
		}
		 /**  大神记录个数 */
		 static getMaxPublicRecNumByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxPublicRecNum;
			}
			return 0;
		}

}
	
cfg.LadderConstInfoBaseCfgData = LadderConstInfoBaseCfgData

class LadderConstInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "dayFightCount");
		};
		 /**  免费挑战次数 */
		 static getDayFightCountByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFightCount;
			}
			return 0;
		}
		 /**  购买次数 */
		 static getDayBuyCountByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayBuyCount;
			}
			return 0;
		}
		 /**  刷新间隔时间秒 */
		 static getRefreshStepByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshStep;
			}
			return 0;
		}
		 /**  开启时间 */
		 static getOpenTimeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  奖励时间 */
		 static getPrizeTimeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeTime;
			}
			return ""
		}
		 /**  胜利奖励 */
		 static getWinPrizeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.winPrize;
			}
			return ""
		}
		 /**  失败奖励 */
		 static getFailPrizeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failPrize;
			}
			return ""
		}
		 /**  点赞奖励 */
		 static getLikePrizeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likePrize;
			}
			return ""
		}
		 /**  我的记录个数 */
		 static getMaxRecNumByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxRecNum;
			}
			return 0;
		}
		 /**  大神记录个数 */
		 static getMaxPublicRecNumByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxPublicRecNum;
			}
			return 0;
		}

}
	
cfg.LadderConstInfoBaseCfgData = LadderConstInfoBaseCfgData

class LadderRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.LadderRobotBaseCfgData = LadderRobotBaseCfgData

class LadderTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.LadderTopPrizeBaseCfgData = LadderTopPrizeBaseCfgData

class LadderBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要VIP等级 */
		 static getNeedVIPByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needVIP;
			}
			return 0;
		}

}
	
cfg.LadderBuyCountBaseCfgData = LadderBuyCountBaseCfgData

class LadderMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.LadderMonsterNewBaseCfgData = LadderMonsterNewBaseCfgData

class LadderRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.LadderRobotBaseCfgData = LadderRobotBaseCfgData

class LadderTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.LadderTopPrizeBaseCfgData = LadderTopPrizeBaseCfgData

class LadderMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.LadderMonsterNewBaseCfgData = LadderMonsterNewBaseCfgData

class LadderBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要VIP等级 */
		 static getNeedVIPByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needVIP;
			}
			return 0;
		}

}
	
cfg.LadderBuyCountBaseCfgData = LadderBuyCountBaseCfgData

class LadderMonsterNewBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  关卡Index */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}

}
	
cfg.LadderMonsterNewBaseCfgData = LadderMonsterNewBaseCfgData

class LadderBuyCountBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要VIP等级 */
		 static getNeedVIPByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needVIP;
			}
			return 0;
		}

}
	
cfg.LadderBuyCountBaseCfgData = LadderBuyCountBaseCfgData

class LadderRobotBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "robotID");
		};
		 /**  ID */
		 static getRobotIDByRobotID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.robotID;
			}
			return 0;
		}

}
	
cfg.LadderRobotBaseCfgData = LadderRobotBaseCfgData

class LadderTopPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "order");
		};
		 /**  排名（上一排名,此名次] */
		 static getOrderByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.order;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByOrder(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.LadderTopPrizeBaseCfgData = LadderTopPrizeBaseCfgData

class LadderConstInfoBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "dayFightCount");
		};
		 /**  免费挑战次数 */
		 static getDayFightCountByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayFightCount;
			}
			return 0;
		}
		 /**  购买次数 */
		 static getDayBuyCountByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.dayBuyCount;
			}
			return 0;
		}
		 /**  刷新间隔时间秒 */
		 static getRefreshStepByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.refreshStep;
			}
			return 0;
		}
		 /**  开启时间 */
		 static getOpenTimeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.openTime;
			}
			return ""
		}
		 /**  奖励时间 */
		 static getPrizeTimeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeTime;
			}
			return ""
		}
		 /**  胜利奖励 */
		 static getWinPrizeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.winPrize;
			}
			return ""
		}
		 /**  失败奖励 */
		 static getFailPrizeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.failPrize;
			}
			return ""
		}
		 /**  点赞奖励 */
		 static getLikePrizeByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likePrize;
			}
			return ""
		}
		 /**  我的记录个数 */
		 static getMaxRecNumByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxRecNum;
			}
			return 0;
		}
		 /**  大神记录个数 */
		 static getMaxPublicRecNumByDayFightCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxPublicRecNum;
			}
			return 0;
		}

}
	
cfg.LadderConstInfoBaseCfgData = LadderConstInfoBaseCfgData

class LotteryTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  活动id */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  类型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  每日免费刷新次数 */
		 static getFreeCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.freeCount;
			}
			return 0;
		}
		 /**  保底次数 */
		 static getMaxCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}
		 /**  保底奖励（奖池序号） */
		 static getLuckyByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lucky;
			}
			return 0;
		}
		 /**  跳转路径（对应uiconfig） */
		 static getGetwayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.getway;
			}
			return ""
		}
		 /**  奖励池保底限制展示个数 */
		 static getLimitByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limit;
			}
			return 0;
		}
		 /**  精灵故事 */
		 static getPetIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petId;
			}
			return 0;
		}
		 /**  展示精灵 */
		 static getPetIdsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petIds;
			}
			return ""
		}
		 /**  UI背景图 */
		 static getUIbgByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uIbg;
			}
			return ""
		}

}
	
cfg.LotteryTypeBaseCfgData = LotteryTypeBaseCfgData

class LotteryCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  索引 */
		 static getIndexByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  次数 */
		 static getTimesByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.times;
			}
			return 0;
		}
		 /**  消耗数量1 */
		 static getNeedItem1ByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem1;
			}
			return ""
		}
		 /**  消耗道具2 */
		 static getNeedItem2ByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem2;
			}
			return ""
		}
		 /**  需要VIP */
		 static getVIPByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}

}
	
cfg.LotteryCostBaseCfgData = LotteryCostBaseCfgData

class LotteryHuntBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  索引 */
		 static getIndexByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  位置(从1开始) */
		 static getPositionByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.position;
			}
			return 0;
		}
		 /**  刷出概率 */
		 static getChanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chance;
			}
			return 0;
		}
		 /**  摇中概率 */
		 static getRollChanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rollChance;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  是否展示 */
		 static getShowByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.show;
			}
			return 0;
		}

}
	
cfg.LotteryHuntBaseCfgData = LotteryHuntBaseCfgData

class LotteryPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  索引 */
		 static getIndexByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  保底道具 */
		 static getItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.item;
			}
			return ""
		}
		 /**  单物品最大保底次数 */
		 static getItemcountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemcount;
			}
			return 0;
		}

}
	
cfg.LotteryPoolBaseCfgData = LotteryPoolBaseCfgData

class LotteryHuntBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  索引 */
		 static getIndexByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  位置(从1开始) */
		 static getPositionByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.position;
			}
			return 0;
		}
		 /**  刷出概率 */
		 static getChanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chance;
			}
			return 0;
		}
		 /**  摇中概率 */
		 static getRollChanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rollChance;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  是否展示 */
		 static getShowByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.show;
			}
			return 0;
		}

}
	
cfg.LotteryHuntBaseCfgData = LotteryHuntBaseCfgData

class LotteryHuntBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  索引 */
		 static getIndexByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  位置(从1开始) */
		 static getPositionByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.position;
			}
			return 0;
		}
		 /**  刷出概率 */
		 static getChanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.chance;
			}
			return 0;
		}
		 /**  摇中概率 */
		 static getRollChanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rollChance;
			}
			return 0;
		}
		 /**  奖励道具 */
		 static getAddItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  是否展示 */
		 static getShowByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.show;
			}
			return 0;
		}

}
	
cfg.LotteryHuntBaseCfgData = LotteryHuntBaseCfgData

class LotteryCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  索引 */
		 static getIndexByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  次数 */
		 static getTimesByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.times;
			}
			return 0;
		}
		 /**  消耗数量1 */
		 static getNeedItem1ByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem1;
			}
			return ""
		}
		 /**  消耗道具2 */
		 static getNeedItem2ByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem2;
			}
			return ""
		}
		 /**  需要VIP */
		 static getVIPByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}

}
	
cfg.LotteryCostBaseCfgData = LotteryCostBaseCfgData

class LotteryTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  活动id */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  类型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  每日免费刷新次数 */
		 static getFreeCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.freeCount;
			}
			return 0;
		}
		 /**  保底次数 */
		 static getMaxCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}
		 /**  保底奖励（奖池序号） */
		 static getLuckyByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lucky;
			}
			return 0;
		}
		 /**  跳转路径（对应uiconfig） */
		 static getGetwayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.getway;
			}
			return ""
		}
		 /**  奖励池保底限制展示个数 */
		 static getLimitByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limit;
			}
			return 0;
		}
		 /**  精灵故事 */
		 static getPetIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petId;
			}
			return 0;
		}
		 /**  展示精灵 */
		 static getPetIdsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petIds;
			}
			return ""
		}
		 /**  UI背景图 */
		 static getUIbgByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uIbg;
			}
			return ""
		}

}
	
cfg.LotteryTypeBaseCfgData = LotteryTypeBaseCfgData

class LotteryPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  索引 */
		 static getIndexByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  保底道具 */
		 static getItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.item;
			}
			return ""
		}
		 /**  单物品最大保底次数 */
		 static getItemcountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemcount;
			}
			return 0;
		}

}
	
cfg.LotteryPoolBaseCfgData = LotteryPoolBaseCfgData

class LotteryTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  活动id */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  类型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  每日免费刷新次数 */
		 static getFreeCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.freeCount;
			}
			return 0;
		}
		 /**  保底次数 */
		 static getMaxCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxCount;
			}
			return 0;
		}
		 /**  保底奖励（奖池序号） */
		 static getLuckyByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.lucky;
			}
			return 0;
		}
		 /**  跳转路径（对应uiconfig） */
		 static getGetwayByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.getway;
			}
			return ""
		}
		 /**  奖励池保底限制展示个数 */
		 static getLimitByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.limit;
			}
			return 0;
		}
		 /**  精灵故事 */
		 static getPetIdByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petId;
			}
			return 0;
		}
		 /**  展示精灵 */
		 static getPetIdsByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petIds;
			}
			return ""
		}
		 /**  UI背景图 */
		 static getUIbgByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.uIbg;
			}
			return ""
		}

}
	
cfg.LotteryTypeBaseCfgData = LotteryTypeBaseCfgData

class LotteryPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  索引 */
		 static getIndexByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  保底道具 */
		 static getItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.item;
			}
			return ""
		}
		 /**  单物品最大保底次数 */
		 static getItemcountByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.itemcount;
			}
			return 0;
		}

}
	
cfg.LotteryPoolBaseCfgData = LotteryPoolBaseCfgData

class LotteryCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  索引 */
		 static getIndexByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  次数 */
		 static getTimesByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.times;
			}
			return 0;
		}
		 /**  消耗数量1 */
		 static getNeedItem1ByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem1;
			}
			return ""
		}
		 /**  消耗道具2 */
		 static getNeedItem2ByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem2;
			}
			return ""
		}
		 /**  需要VIP */
		 static getVIPByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vIP;
			}
			return 0;
		}

}
	
cfg.LotteryCostBaseCfgData = LotteryCostBaseCfgData

class MailBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "mailType");
		};
		 /**  邮件类型 */
		 static getMailTypeByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailType;
			}
			return 0;
		}
		 /**  有效天数 */
		 static getExpireDayByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireDay;
			}
			return 0;
		}
		 /**  邮件标题 */
		 static getMailTitleByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailTitle;
			}
			return ""
		}
		 /**  消息展示内容 */
		 static getContentByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.MailBaseCfgData = MailBaseCfgData

class MailBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "mailType");
		};
		 /**  邮件类型 */
		 static getMailTypeByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailType;
			}
			return 0;
		}
		 /**  有效天数 */
		 static getExpireDayByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireDay;
			}
			return 0;
		}
		 /**  邮件标题 */
		 static getMailTitleByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailTitle;
			}
			return ""
		}
		 /**  消息展示内容 */
		 static getContentByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.MailBaseCfgData = MailBaseCfgData

class MailBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "mailType");
		};
		 /**  邮件类型 */
		 static getMailTypeByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailType;
			}
			return 0;
		}
		 /**  有效天数 */
		 static getExpireDayByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireDay;
			}
			return 0;
		}
		 /**  邮件标题 */
		 static getMailTitleByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.mailTitle;
			}
			return ""
		}
		 /**  消息展示内容 */
		 static getContentByMailType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}

}
	
cfg.MailBaseCfgData = MailBaseCfgData

class PetUpStarBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  唯一ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  星星数 */
		 static getStarById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  升到此星需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  升到此阶需要伙伴伙伴ID_伙伴星级_个数; */
		 static getNeedStarCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStarCount;
			}
			return ""
		}
		 /**  升到此星需要伙伴星级_个数; */
		 static getNeedStarPetById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStarPet;
			}
			return ""
		}
		 /**  升到任意需要伙伴星级_个数; */
		 static getNeedAnyStarPetById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAnyStarPet;
			}
			return ""
		}
		 /**  此等级上限 */
		 static getMaxLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  最大阶数 */
		 static getMaxAdvanceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxAdvance;
			}
			return 0;
		}
		 /**  增加评分 */
		 static getAddScoreById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetUpStarBaseCfgData = PetUpStarBaseCfgData

class PetAdvanceBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "advance");
		};
		 /**  进阶等级 */
		 static getAdvanceByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advance;
			}
			return 0;
		}
		 /**  此等级上限 */
		 static getMaxPetLevelByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxPetLevel;
			}
			return 0;
		}
		 /**  升到此阶需要道具 */
		 static getNeedItemByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  技能等级 */
		 static getAddSkillByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.PetAdvanceBaseCfgData = PetAdvanceBaseCfgData

class PetFormationBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  解锁等级 */
		 static getNeedLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  位置 */
		 static getPosByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pos;
			}
			return ""
		}

}
	
cfg.PetFormationBaseCfgData = PetFormationBaseCfgData

class PetRunePosBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "pos");
		};
		 /**  位置 */
		 static getPosByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pos;
			}
			return 0;
		}
		 /**  解锁等级 */
		 static getNeedLevelByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  解锁星级 */
		 static getNeedStarByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStar;
			}
			return 0;
		}

}
	
cfg.PetRunePosBaseCfgData = PetRunePosBaseCfgData

class PetBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  英雄ID */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  阵营 */
		 static getPetTypeByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  职业 */
		 static getPetJobTypeByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petJobType;
			}
			return 0;
		}
		 /**  基础Skin */
		 static getBaseSkinByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseSkin;
			}
			return 0;
		}
		 /**  展示音效（1.wav;2.wav） */
		 static getVoiceByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.voice;
			}
			return ""
		}
		 /**  初始最大阶数 */
		 static getInitMaxAdvanceByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initMaxAdvance;
			}
			return 0;
		}
		 /**  起始星级 */
		 static getMinStarByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStar;
			}
			return 0;
		}
		 /**  最高星级 */
		 static getMaxStarByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxStar;
			}
			return 0;
		}
		 /**  最高等级 */
		 static getMaxLevelByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  基础属性 */
		 static getInitAttrByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initAttr;
			}
			return ""
		}
		 /**  初始成长 */
		 static getAdvanceRate0ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate0;
			}
			return ""
		}
		 /**  1阶成长加成 */
		 static getAdvanceRate1ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate1;
			}
			return ""
		}
		 /**  2阶成长加成 */
		 static getAdvanceRate2ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate2;
			}
			return ""
		}
		 /**  3阶成长加成 */
		 static getAdvanceRate3ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate3;
			}
			return ""
		}
		 /**  4阶成长加成 */
		 static getAdvanceRate4ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate4;
			}
			return ""
		}
		 /**  5阶成长加成 */
		 static getAdvanceRate5ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate5;
			}
			return ""
		}
		 /**  6阶成长加成 */
		 static getAdvanceRate6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate6;
			}
			return ""
		}
		 /**  升阶附加属性0-1阶 */
		 static getAdvanceFix1ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix1;
			}
			return ""
		}
		 /**  升阶附加属性1-2阶 */
		 static getAdvanceFix2ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix2;
			}
			return ""
		}
		 /**  升阶附加属性2-3阶 */
		 static getAdvanceFix3ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix3;
			}
			return ""
		}
		 /**  升阶附加属性3-4阶 */
		 static getAdvanceFix4ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix4;
			}
			return ""
		}
		 /**  升阶附加属性4-5阶 */
		 static getAdvanceFix5ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix5;
			}
			return ""
		}
		 /**  升阶附加属性5-6阶 */
		 static getAdvanceFix6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix6;
			}
			return ""
		}
		 /**  6星成长加成 */
		 static getStarRate6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate6;
			}
			return ""
		}
		 /**  7星成长加成 */
		 static getStarRate7ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate7;
			}
			return ""
		}
		 /**  8星成长加成 */
		 static getStarRate8ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate8;
			}
			return ""
		}
		 /**  9星成长加成 */
		 static getStarRate9ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate9;
			}
			return ""
		}
		 /**  10星成长加成 */
		 static getStarRate10ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate10;
			}
			return ""
		}
		 /**  11星成长加成 */
		 static getStarRate11ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate11;
			}
			return ""
		}
		 /**  12星成长加成 */
		 static getStarRate12ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate12;
			}
			return ""
		}
		 /**  13星成长加成 */
		 static getStarRate13ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate13;
			}
			return ""
		}
		 /**  14星成长加成 */
		 static getStarRate14ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate14;
			}
			return ""
		}
		 /**  15星成长加成 */
		 static getStarRate15ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate15;
			}
			return ""
		}
		 /**  升星附加属性4-5星 */
		 static getStarFix5ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix5;
			}
			return ""
		}
		 /**  升星附加属性5-6星 */
		 static getStarFix6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix6;
			}
			return ""
		}
		 /**  升星附加属性6-7星 */
		 static getStarFix7ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix7;
			}
			return ""
		}
		 /**  升星附加属性7-8星 */
		 static getStarFix8ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix8;
			}
			return ""
		}
		 /**  升星附加属性8-9星 */
		 static getStarFix9ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix9;
			}
			return ""
		}
		 /**  升星附加属性9-10星 */
		 static getStarFix10ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix10;
			}
			return ""
		}
		 /**  升星附加属性10-11星 */
		 static getStarFix11ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix11;
			}
			return ""
		}
		 /**  升星附加属性11-12星 */
		 static getStarFix12ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix12;
			}
			return ""
		}
		 /**  升星附加属性12-13星 */
		 static getStarFix13ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix13;
			}
			return ""
		}
		 /**  升星附加属性13-14星 */
		 static getStarFix14ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix14;
			}
			return ""
		}
		 /**  升星附加属性14-15星 */
		 static getStarFix15ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix15;
			}
			return ""
		}
		 /**  种族值 */
		 static getRacialvalueByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.racialvalue;
			}
			return ""
		}
		 /**  图鉴属性 */
		 static getIllustrationAttrAddByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.illustrationAttrAdd;
			}
			return ""
		}
		 /**  加成属性战力值 */
		 static getFightPowerByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return ""
		}
		 /**  携带物 */
		 static getHorcruxByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.horcrux;
			}
			return 0;
		}
		 /**  是否不启用精灵 */
		 static getInvalidByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetBaseCfgData = PetBaseCfgData

class PetStarScoreBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  总计评分 */
		 static getTotalScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.totalScore;
			}
			return 0;
		}
		 /**  等级评分 */
		 static getLevelScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.levelScore;
			}
			return 0;
		}
		 /**  装备评分 */
		 static getEquipScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.equipScore;
			}
			return 0;
		}
		 /**  星级评分 */
		 static getStarScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starScore;
			}
			return 0;
		}
		 /**  进阶评分 */
		 static getAdvanceScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceScore;
			}
			return 0;
		}
		 /**  神器评分 */
		 static getArtifactScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.artifactScore;
			}
			return 0;
		}
		 /**  公会技能评分 */
		 static getFactionSkillScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.factionSkillScore;
			}
			return 0;
		}
		 /**  符文评分 */
		 static getRuneScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runeScore;
			}
			return 0;
		}

}
	
cfg.PetStarScoreBaseCfgData = PetStarScoreBaseCfgData

class PetUpsartSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getAddSkillByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}

}
	
cfg.PetUpsartSkillBaseCfgData = PetUpsartSkillBaseCfgData

class PetEvolveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  唯一ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  进化段数 */
		 static getEvolveById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolve;
			}
			return 0;
		}
		 /**  升到此段需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  属性加成(属性|值|百分比;) */
		 static getAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}
		 /**  皮肤ID */
		 static getSkinIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}
		 /**  最大段数 */
		 static getMaxEvolveById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxEvolve;
			}
			return 0;
		}
		 /**  增加评分 */
		 static getAddScoreById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetEvolveBaseCfgData = PetEvolveBaseCfgData

class PetUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.PetUpgradeBaseCfgData = PetUpgradeBaseCfgData

class PetFormationTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  解锁等级 */
		 static getNeedLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}

}
	
cfg.PetFormationTypeBaseCfgData = PetFormationTypeBaseCfgData

class PetMasterMatchBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "topListNum");
		};
		 /**  排行榜人数 */
		 static getTopListNumByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.topListNum;
			}
			return 0;
		}
		 /**  天赋展示数量 */
		 static getTalentShowNumByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.talentShowNum;
			}
			return 0;
		}
		 /**  阵容推荐人数 */
		 static getPetStoryByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStory;
			}
			return 0;
		}
		 /**  热门评论上限 */
		 static getHotReviewMaxByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hotReviewMax;
			}
			return 0;
		}
		 /**  近期评论上限 */
		 static getRecentReviewMaxByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.recentReviewMax;
			}
			return 0;
		}
		 /**  点赞奖励 */
		 static getLikePrizeByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likePrize;
			}
			return ""
		}
		 /**  精灵解锁奖励 */
		 static getPetUnlockPrizeByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petUnlockPrize;
			}
			return ""
		}

}
	
cfg.PetMasterMatchBaseCfgData = PetMasterMatchBaseCfgData

class PetStarExpBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星星 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  吞噬极化值 */
		 static getExpByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  最大极化值 */
		 static getMaxExpByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  属性加成(属性|值|百分比;) */
		 static getAttrByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}

}
	
cfg.PetStarExpBaseCfgData = PetStarExpBaseCfgData

class PetHighstarRebornBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  唯一ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  星星数 */
		 static getStarById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  高星重生需要道具 */
		 static getRebornItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornItem;
			}
			return ""
		}
		 /**  高星重生返还百变怪 */
		 static getRebornReturnItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornReturnItem;
			}
			return ""
		}
		 /**  降星返还糖果 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  高星重生返还本体 */
		 static getRebornReturnItem1ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornReturnItem1;
			}
			return ""
		}
		 /**  高星重生返还百变怪 */
		 static getRebornReturnItem2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornReturnItem2;
			}
			return ""
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetHighstarRebornBaseCfgData = PetHighstarRebornBaseCfgData

class PetEvolveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  唯一ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  进化段数 */
		 static getEvolveById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolve;
			}
			return 0;
		}
		 /**  升到此段需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  属性加成(属性|值|百分比;) */
		 static getAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}
		 /**  皮肤ID */
		 static getSkinIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}
		 /**  最大段数 */
		 static getMaxEvolveById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxEvolve;
			}
			return 0;
		}
		 /**  增加评分 */
		 static getAddScoreById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetEvolveBaseCfgData = PetEvolveBaseCfgData

class PetMasterMatchBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "topListNum");
		};
		 /**  排行榜人数 */
		 static getTopListNumByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.topListNum;
			}
			return 0;
		}
		 /**  天赋展示数量 */
		 static getTalentShowNumByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.talentShowNum;
			}
			return 0;
		}
		 /**  阵容推荐人数 */
		 static getPetStoryByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStory;
			}
			return 0;
		}
		 /**  热门评论上限 */
		 static getHotReviewMaxByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hotReviewMax;
			}
			return 0;
		}
		 /**  近期评论上限 */
		 static getRecentReviewMaxByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.recentReviewMax;
			}
			return 0;
		}
		 /**  点赞奖励 */
		 static getLikePrizeByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likePrize;
			}
			return ""
		}
		 /**  精灵解锁奖励 */
		 static getPetUnlockPrizeByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petUnlockPrize;
			}
			return ""
		}

}
	
cfg.PetMasterMatchBaseCfgData = PetMasterMatchBaseCfgData

class PetHighstarRebornBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  唯一ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  星星数 */
		 static getStarById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  高星重生需要道具 */
		 static getRebornItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornItem;
			}
			return ""
		}
		 /**  高星重生返还百变怪 */
		 static getRebornReturnItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornReturnItem;
			}
			return ""
		}
		 /**  降星返还糖果 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  高星重生返还本体 */
		 static getRebornReturnItem1ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornReturnItem1;
			}
			return ""
		}
		 /**  高星重生返还百变怪 */
		 static getRebornReturnItem2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornReturnItem2;
			}
			return ""
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetHighstarRebornBaseCfgData = PetHighstarRebornBaseCfgData

class PetStarExpBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星星 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  吞噬极化值 */
		 static getExpByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  最大极化值 */
		 static getMaxExpByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  属性加成(属性|值|百分比;) */
		 static getAttrByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}

}
	
cfg.PetStarExpBaseCfgData = PetStarExpBaseCfgData

class PetRebornCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.PetRebornCostBaseCfgData = PetRebornCostBaseCfgData

class PetDegenerateSubstitudeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  类型（0代表全系） */
		 static getTypeByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  替代品道具 */
		 static getItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.item;
			}
			return ""
		}

}
	
cfg.PetDegenerateSubstitudeBaseCfgData = PetDegenerateSubstitudeBaseCfgData

class PetDegenerateCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  需要消耗道具 */
		 static getNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.PetDegenerateCostBaseCfgData = PetDegenerateCostBaseCfgData

class PetReplaceBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  需要消耗道具 */
		 static getNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要消耗5星英雄数量 */
		 static getNeedHeroByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needHero;
			}
			return 0;
		}

}
	
cfg.PetReplaceBaseCfgData = PetReplaceBaseCfgData

class PetReplaceBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  需要消耗道具 */
		 static getNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要消耗5星英雄数量 */
		 static getNeedHeroByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needHero;
			}
			return 0;
		}

}
	
cfg.PetReplaceBaseCfgData = PetReplaceBaseCfgData

class PetTalentPosBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "pos");
		};
		 /**  位置 */
		 static getPosByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pos;
			}
			return 0;
		}
		 /**  解锁星级 */
		 static getNeedStarByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStar;
			}
			return 0;
		}

}
	
cfg.PetTalentPosBaseCfgData = PetTalentPosBaseCfgData

class PetBuyBagBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  当前购买的总格子数 */
		 static getTotalBuySpaceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.totalBuySpace;
			}
			return 0;
		}
		 /**  需要钻石 */
		 static getNeedDiamondById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDiamond;
			}
			return 0;
		}
		 /**  增加格子数 */
		 static getAddSpaceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSpace;
			}
			return 0;
		}

}
	
cfg.PetBuyBagBaseCfgData = PetBuyBagBaseCfgData

class PetBookBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  伙伴索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  图鉴 */
		 static getBookMarkByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bookMark;
			}
			return 0;
		}
		 /**  图书馆 */
		 static getLibraryMarkByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.libraryMark;
			}
			return 0;
		}
		 /**  星级 */
		 static getStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  显示等级 */
		 static getMaxLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  属性 */
		 static getAttrByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}
		 /**  战力 */
		 static getPowerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.power;
			}
			return 0;
		}
		 /**  评论开关 */
		 static getReviewSwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.reviewSwitch;
			}
			return 0;
		}
		 /**  大神搭配开关 */
		 static getMasterMatchSwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.masterMatchSwitch;
			}
			return 0;
		}
		 /**  精灵档案开关 */
		 static getPetStorySwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStorySwitch;
			}
			return 0;
		}
		 /**  精灵故事 */
		 static getPetStoryByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStory;
			}
			return ""
		}
		 /**  是否不启用精灵 */
		 static getInvalidByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetBookBaseCfgData = PetBookBaseCfgData

class PetBookBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  伙伴索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  图鉴 */
		 static getBookMarkByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bookMark;
			}
			return 0;
		}
		 /**  图书馆 */
		 static getLibraryMarkByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.libraryMark;
			}
			return 0;
		}
		 /**  星级 */
		 static getStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  显示等级 */
		 static getMaxLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  属性 */
		 static getAttrByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}
		 /**  战力 */
		 static getPowerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.power;
			}
			return 0;
		}
		 /**  评论开关 */
		 static getReviewSwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.reviewSwitch;
			}
			return 0;
		}
		 /**  大神搭配开关 */
		 static getMasterMatchSwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.masterMatchSwitch;
			}
			return 0;
		}
		 /**  精灵档案开关 */
		 static getPetStorySwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStorySwitch;
			}
			return 0;
		}
		 /**  精灵故事 */
		 static getPetStoryByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStory;
			}
			return ""
		}
		 /**  是否不启用精灵 */
		 static getInvalidByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetBookBaseCfgData = PetBookBaseCfgData

class PetStarScoreBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  总计评分 */
		 static getTotalScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.totalScore;
			}
			return 0;
		}
		 /**  等级评分 */
		 static getLevelScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.levelScore;
			}
			return 0;
		}
		 /**  装备评分 */
		 static getEquipScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.equipScore;
			}
			return 0;
		}
		 /**  星级评分 */
		 static getStarScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starScore;
			}
			return 0;
		}
		 /**  进阶评分 */
		 static getAdvanceScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceScore;
			}
			return 0;
		}
		 /**  神器评分 */
		 static getArtifactScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.artifactScore;
			}
			return 0;
		}
		 /**  公会技能评分 */
		 static getFactionSkillScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.factionSkillScore;
			}
			return 0;
		}
		 /**  符文评分 */
		 static getRuneScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runeScore;
			}
			return 0;
		}

}
	
cfg.PetStarScoreBaseCfgData = PetStarScoreBaseCfgData

class PetBuyBagBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  当前购买的总格子数 */
		 static getTotalBuySpaceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.totalBuySpace;
			}
			return 0;
		}
		 /**  需要钻石 */
		 static getNeedDiamondById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDiamond;
			}
			return 0;
		}
		 /**  增加格子数 */
		 static getAddSpaceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSpace;
			}
			return 0;
		}

}
	
cfg.PetBuyBagBaseCfgData = PetBuyBagBaseCfgData

class PetUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.PetUpgradeBaseCfgData = PetUpgradeBaseCfgData

class PetDegenerateCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  需要消耗道具 */
		 static getNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.PetDegenerateCostBaseCfgData = PetDegenerateCostBaseCfgData

class PetRunePosBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "pos");
		};
		 /**  位置 */
		 static getPosByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pos;
			}
			return 0;
		}
		 /**  解锁等级 */
		 static getNeedLevelByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  解锁星级 */
		 static getNeedStarByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStar;
			}
			return 0;
		}

}
	
cfg.PetRunePosBaseCfgData = PetRunePosBaseCfgData

class PetAdvanceBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "advance");
		};
		 /**  进阶等级 */
		 static getAdvanceByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advance;
			}
			return 0;
		}
		 /**  此等级上限 */
		 static getMaxPetLevelByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxPetLevel;
			}
			return 0;
		}
		 /**  升到此阶需要道具 */
		 static getNeedItemByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  技能等级 */
		 static getAddSkillByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.PetAdvanceBaseCfgData = PetAdvanceBaseCfgData

class PetRebornCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.PetRebornCostBaseCfgData = PetRebornCostBaseCfgData

class PetFormationTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  解锁等级 */
		 static getNeedLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}

}
	
cfg.PetFormationTypeBaseCfgData = PetFormationTypeBaseCfgData

class PetFormationBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  解锁等级 */
		 static getNeedLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  位置 */
		 static getPosByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pos;
			}
			return ""
		}

}
	
cfg.PetFormationBaseCfgData = PetFormationBaseCfgData

class PetUpStarBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  唯一ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  星星数 */
		 static getStarById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  升到此星需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  升到此阶需要伙伴伙伴ID_伙伴星级_个数; */
		 static getNeedStarCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStarCount;
			}
			return ""
		}
		 /**  升到此星需要伙伴星级_个数; */
		 static getNeedStarPetById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStarPet;
			}
			return ""
		}
		 /**  升到任意需要伙伴星级_个数; */
		 static getNeedAnyStarPetById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAnyStarPet;
			}
			return ""
		}
		 /**  此等级上限 */
		 static getMaxLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  最大阶数 */
		 static getMaxAdvanceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxAdvance;
			}
			return 0;
		}
		 /**  增加评分 */
		 static getAddScoreById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetUpStarBaseCfgData = PetUpStarBaseCfgData

class PetDegenerateSubstitudeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  类型（0代表全系） */
		 static getTypeByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  替代品道具 */
		 static getItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.item;
			}
			return ""
		}

}
	
cfg.PetDegenerateSubstitudeBaseCfgData = PetDegenerateSubstitudeBaseCfgData

class PetTalentPosBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "pos");
		};
		 /**  位置 */
		 static getPosByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pos;
			}
			return 0;
		}
		 /**  解锁星级 */
		 static getNeedStarByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStar;
			}
			return 0;
		}

}
	
cfg.PetTalentPosBaseCfgData = PetTalentPosBaseCfgData

class PetRebornCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.PetRebornCostBaseCfgData = PetRebornCostBaseCfgData

class PetStarExpBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星星 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  吞噬极化值 */
		 static getExpByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.exp;
			}
			return 0;
		}
		 /**  最大极化值 */
		 static getMaxExpByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxExp;
			}
			return 0;
		}
		 /**  属性加成(属性|值|百分比;) */
		 static getAttrByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}

}
	
cfg.PetStarExpBaseCfgData = PetStarExpBaseCfgData

class PetBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  英雄ID */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  阵营 */
		 static getPetTypeByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  职业 */
		 static getPetJobTypeByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petJobType;
			}
			return 0;
		}
		 /**  基础Skin */
		 static getBaseSkinByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseSkin;
			}
			return 0;
		}
		 /**  展示音效（1.wav;2.wav） */
		 static getVoiceByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.voice;
			}
			return ""
		}
		 /**  初始最大阶数 */
		 static getInitMaxAdvanceByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initMaxAdvance;
			}
			return 0;
		}
		 /**  起始星级 */
		 static getMinStarByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStar;
			}
			return 0;
		}
		 /**  最高星级 */
		 static getMaxStarByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxStar;
			}
			return 0;
		}
		 /**  最高等级 */
		 static getMaxLevelByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  基础属性 */
		 static getInitAttrByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initAttr;
			}
			return ""
		}
		 /**  初始成长 */
		 static getAdvanceRate0ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate0;
			}
			return ""
		}
		 /**  1阶成长加成 */
		 static getAdvanceRate1ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate1;
			}
			return ""
		}
		 /**  2阶成长加成 */
		 static getAdvanceRate2ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate2;
			}
			return ""
		}
		 /**  3阶成长加成 */
		 static getAdvanceRate3ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate3;
			}
			return ""
		}
		 /**  4阶成长加成 */
		 static getAdvanceRate4ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate4;
			}
			return ""
		}
		 /**  5阶成长加成 */
		 static getAdvanceRate5ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate5;
			}
			return ""
		}
		 /**  6阶成长加成 */
		 static getAdvanceRate6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate6;
			}
			return ""
		}
		 /**  升阶附加属性0-1阶 */
		 static getAdvanceFix1ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix1;
			}
			return ""
		}
		 /**  升阶附加属性1-2阶 */
		 static getAdvanceFix2ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix2;
			}
			return ""
		}
		 /**  升阶附加属性2-3阶 */
		 static getAdvanceFix3ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix3;
			}
			return ""
		}
		 /**  升阶附加属性3-4阶 */
		 static getAdvanceFix4ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix4;
			}
			return ""
		}
		 /**  升阶附加属性4-5阶 */
		 static getAdvanceFix5ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix5;
			}
			return ""
		}
		 /**  升阶附加属性5-6阶 */
		 static getAdvanceFix6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix6;
			}
			return ""
		}
		 /**  6星成长加成 */
		 static getStarRate6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate6;
			}
			return ""
		}
		 /**  7星成长加成 */
		 static getStarRate7ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate7;
			}
			return ""
		}
		 /**  8星成长加成 */
		 static getStarRate8ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate8;
			}
			return ""
		}
		 /**  9星成长加成 */
		 static getStarRate9ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate9;
			}
			return ""
		}
		 /**  10星成长加成 */
		 static getStarRate10ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate10;
			}
			return ""
		}
		 /**  11星成长加成 */
		 static getStarRate11ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate11;
			}
			return ""
		}
		 /**  12星成长加成 */
		 static getStarRate12ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate12;
			}
			return ""
		}
		 /**  13星成长加成 */
		 static getStarRate13ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate13;
			}
			return ""
		}
		 /**  14星成长加成 */
		 static getStarRate14ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate14;
			}
			return ""
		}
		 /**  15星成长加成 */
		 static getStarRate15ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate15;
			}
			return ""
		}
		 /**  升星附加属性4-5星 */
		 static getStarFix5ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix5;
			}
			return ""
		}
		 /**  升星附加属性5-6星 */
		 static getStarFix6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix6;
			}
			return ""
		}
		 /**  升星附加属性6-7星 */
		 static getStarFix7ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix7;
			}
			return ""
		}
		 /**  升星附加属性7-8星 */
		 static getStarFix8ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix8;
			}
			return ""
		}
		 /**  升星附加属性8-9星 */
		 static getStarFix9ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix9;
			}
			return ""
		}
		 /**  升星附加属性9-10星 */
		 static getStarFix10ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix10;
			}
			return ""
		}
		 /**  升星附加属性10-11星 */
		 static getStarFix11ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix11;
			}
			return ""
		}
		 /**  升星附加属性11-12星 */
		 static getStarFix12ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix12;
			}
			return ""
		}
		 /**  升星附加属性12-13星 */
		 static getStarFix13ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix13;
			}
			return ""
		}
		 /**  升星附加属性13-14星 */
		 static getStarFix14ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix14;
			}
			return ""
		}
		 /**  升星附加属性14-15星 */
		 static getStarFix15ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix15;
			}
			return ""
		}
		 /**  种族值 */
		 static getRacialvalueByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.racialvalue;
			}
			return ""
		}
		 /**  图鉴属性 */
		 static getIllustrationAttrAddByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.illustrationAttrAdd;
			}
			return ""
		}
		 /**  加成属性战力值 */
		 static getFightPowerByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return ""
		}
		 /**  携带物 */
		 static getHorcruxByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.horcrux;
			}
			return 0;
		}
		 /**  是否不启用精灵 */
		 static getInvalidByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetBaseCfgData = PetBaseCfgData

class PetUpsartSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getAddSkillByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}

}
	
cfg.PetUpsartSkillBaseCfgData = PetUpsartSkillBaseCfgData

class PetBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  英雄ID */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  描述 */
		 static getDescByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  阵营 */
		 static getPetTypeByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  职业 */
		 static getPetJobTypeByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petJobType;
			}
			return 0;
		}
		 /**  基础Skin */
		 static getBaseSkinByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.baseSkin;
			}
			return 0;
		}
		 /**  展示音效（1.wav;2.wav） */
		 static getVoiceByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.voice;
			}
			return ""
		}
		 /**  初始最大阶数 */
		 static getInitMaxAdvanceByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initMaxAdvance;
			}
			return 0;
		}
		 /**  起始星级 */
		 static getMinStarByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStar;
			}
			return 0;
		}
		 /**  最高星级 */
		 static getMaxStarByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxStar;
			}
			return 0;
		}
		 /**  最高等级 */
		 static getMaxLevelByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  基础属性 */
		 static getInitAttrByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.initAttr;
			}
			return ""
		}
		 /**  初始成长 */
		 static getAdvanceRate0ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate0;
			}
			return ""
		}
		 /**  1阶成长加成 */
		 static getAdvanceRate1ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate1;
			}
			return ""
		}
		 /**  2阶成长加成 */
		 static getAdvanceRate2ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate2;
			}
			return ""
		}
		 /**  3阶成长加成 */
		 static getAdvanceRate3ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate3;
			}
			return ""
		}
		 /**  4阶成长加成 */
		 static getAdvanceRate4ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate4;
			}
			return ""
		}
		 /**  5阶成长加成 */
		 static getAdvanceRate5ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate5;
			}
			return ""
		}
		 /**  6阶成长加成 */
		 static getAdvanceRate6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceRate6;
			}
			return ""
		}
		 /**  升阶附加属性0-1阶 */
		 static getAdvanceFix1ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix1;
			}
			return ""
		}
		 /**  升阶附加属性1-2阶 */
		 static getAdvanceFix2ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix2;
			}
			return ""
		}
		 /**  升阶附加属性2-3阶 */
		 static getAdvanceFix3ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix3;
			}
			return ""
		}
		 /**  升阶附加属性3-4阶 */
		 static getAdvanceFix4ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix4;
			}
			return ""
		}
		 /**  升阶附加属性4-5阶 */
		 static getAdvanceFix5ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix5;
			}
			return ""
		}
		 /**  升阶附加属性5-6阶 */
		 static getAdvanceFix6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceFix6;
			}
			return ""
		}
		 /**  6星成长加成 */
		 static getStarRate6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate6;
			}
			return ""
		}
		 /**  7星成长加成 */
		 static getStarRate7ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate7;
			}
			return ""
		}
		 /**  8星成长加成 */
		 static getStarRate8ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate8;
			}
			return ""
		}
		 /**  9星成长加成 */
		 static getStarRate9ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate9;
			}
			return ""
		}
		 /**  10星成长加成 */
		 static getStarRate10ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate10;
			}
			return ""
		}
		 /**  11星成长加成 */
		 static getStarRate11ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate11;
			}
			return ""
		}
		 /**  12星成长加成 */
		 static getStarRate12ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate12;
			}
			return ""
		}
		 /**  13星成长加成 */
		 static getStarRate13ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate13;
			}
			return ""
		}
		 /**  14星成长加成 */
		 static getStarRate14ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate14;
			}
			return ""
		}
		 /**  15星成长加成 */
		 static getStarRate15ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate15;
			}
			return ""
		}
		 /**  升星附加属性4-5星 */
		 static getStarFix5ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix5;
			}
			return ""
		}
		 /**  升星附加属性5-6星 */
		 static getStarFix6ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix6;
			}
			return ""
		}
		 /**  升星附加属性6-7星 */
		 static getStarFix7ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix7;
			}
			return ""
		}
		 /**  升星附加属性7-8星 */
		 static getStarFix8ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix8;
			}
			return ""
		}
		 /**  升星附加属性8-9星 */
		 static getStarFix9ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix9;
			}
			return ""
		}
		 /**  升星附加属性9-10星 */
		 static getStarFix10ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix10;
			}
			return ""
		}
		 /**  升星附加属性10-11星 */
		 static getStarFix11ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix11;
			}
			return ""
		}
		 /**  升星附加属性11-12星 */
		 static getStarFix12ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix12;
			}
			return ""
		}
		 /**  升星附加属性12-13星 */
		 static getStarFix13ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix13;
			}
			return ""
		}
		 /**  升星附加属性13-14星 */
		 static getStarFix14ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix14;
			}
			return ""
		}
		 /**  升星附加属性14-15星 */
		 static getStarFix15ByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starFix15;
			}
			return ""
		}
		 /**  种族值 */
		 static getRacialvalueByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.racialvalue;
			}
			return ""
		}
		 /**  图鉴属性 */
		 static getIllustrationAttrAddByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.illustrationAttrAdd;
			}
			return ""
		}
		 /**  加成属性战力值 */
		 static getFightPowerByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return ""
		}
		 /**  携带物 */
		 static getHorcruxByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.horcrux;
			}
			return 0;
		}
		 /**  是否不启用精灵 */
		 static getInvalidByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetBaseCfgData = PetBaseCfgData

class PetUpgradeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  需要道具 */
		 static getNeedItemByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.PetUpgradeBaseCfgData = PetUpgradeBaseCfgData

class PetAdvanceBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "advance");
		};
		 /**  进阶等级 */
		 static getAdvanceByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advance;
			}
			return 0;
		}
		 /**  此等级上限 */
		 static getMaxPetLevelByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxPetLevel;
			}
			return 0;
		}
		 /**  升到此阶需要道具 */
		 static getNeedItemByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  技能等级 */
		 static getAddSkillByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  增加评分 */
		 static getAddScoreByAdvance(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}

}
	
cfg.PetAdvanceBaseCfgData = PetAdvanceBaseCfgData

class PetUpsartSkillBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  技能等级 */
		 static getAddSkillByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}

}
	
cfg.PetUpsartSkillBaseCfgData = PetUpsartSkillBaseCfgData

class PetUpStarBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  唯一ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  星星数 */
		 static getStarById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  升到此星需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  升到此阶需要伙伴伙伴ID_伙伴星级_个数; */
		 static getNeedStarCountById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStarCount;
			}
			return ""
		}
		 /**  升到此星需要伙伴星级_个数; */
		 static getNeedStarPetById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStarPet;
			}
			return ""
		}
		 /**  升到任意需要伙伴星级_个数; */
		 static getNeedAnyStarPetById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needAnyStarPet;
			}
			return ""
		}
		 /**  此等级上限 */
		 static getMaxLevelById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  最大阶数 */
		 static getMaxAdvanceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxAdvance;
			}
			return 0;
		}
		 /**  增加评分 */
		 static getAddScoreById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetUpStarBaseCfgData = PetUpStarBaseCfgData

class PetFormationBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  解锁等级 */
		 static getNeedLevelByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  位置 */
		 static getPosByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pos;
			}
			return ""
		}

}
	
cfg.PetFormationBaseCfgData = PetFormationBaseCfgData

class PetFormationTypeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  解锁等级 */
		 static getNeedLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}

}
	
cfg.PetFormationTypeBaseCfgData = PetFormationTypeBaseCfgData

class PetRunePosBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "pos");
		};
		 /**  位置 */
		 static getPosByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pos;
			}
			return 0;
		}
		 /**  解锁等级 */
		 static getNeedLevelByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  解锁星级 */
		 static getNeedStarByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStar;
			}
			return 0;
		}

}
	
cfg.PetRunePosBaseCfgData = PetRunePosBaseCfgData

class PetTalentPosBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "pos");
		};
		 /**  位置 */
		 static getPosByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.pos;
			}
			return 0;
		}
		 /**  解锁星级 */
		 static getNeedStarByPos(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needStar;
			}
			return 0;
		}

}
	
cfg.PetTalentPosBaseCfgData = PetTalentPosBaseCfgData

class PetMasterMatchBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "topListNum");
		};
		 /**  排行榜人数 */
		 static getTopListNumByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.topListNum;
			}
			return 0;
		}
		 /**  天赋展示数量 */
		 static getTalentShowNumByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.talentShowNum;
			}
			return 0;
		}
		 /**  阵容推荐人数 */
		 static getPetStoryByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStory;
			}
			return 0;
		}
		 /**  热门评论上限 */
		 static getHotReviewMaxByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.hotReviewMax;
			}
			return 0;
		}
		 /**  近期评论上限 */
		 static getRecentReviewMaxByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.recentReviewMax;
			}
			return 0;
		}
		 /**  点赞奖励 */
		 static getLikePrizeByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.likePrize;
			}
			return ""
		}
		 /**  精灵解锁奖励 */
		 static getPetUnlockPrizeByTopListNum(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petUnlockPrize;
			}
			return ""
		}

}
	
cfg.PetMasterMatchBaseCfgData = PetMasterMatchBaseCfgData

class PetEvolveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  唯一ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  进化段数 */
		 static getEvolveById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolve;
			}
			return 0;
		}
		 /**  升到此段需要道具 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  属性加成(属性|值|百分比;) */
		 static getAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}
		 /**  皮肤ID */
		 static getSkinIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}
		 /**  最大段数 */
		 static getMaxEvolveById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxEvolve;
			}
			return 0;
		}
		 /**  增加评分 */
		 static getAddScoreById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addScore;
			}
			return 0;
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetEvolveBaseCfgData = PetEvolveBaseCfgData

class PetHighstarRebornBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  唯一ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  星星数 */
		 static getStarById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  高星重生需要道具 */
		 static getRebornItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornItem;
			}
			return ""
		}
		 /**  高星重生返还百变怪 */
		 static getRebornReturnItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornReturnItem;
			}
			return ""
		}
		 /**  降星返还糖果 */
		 static getNeedItemById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  高星重生返还本体 */
		 static getRebornReturnItem1ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornReturnItem1;
			}
			return ""
		}
		 /**  高星重生返还百变怪 */
		 static getRebornReturnItem2ById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rebornReturnItem2;
			}
			return ""
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetHighstarRebornBaseCfgData = PetHighstarRebornBaseCfgData

class PetDegenerateCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  需要消耗道具 */
		 static getNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.PetDegenerateCostBaseCfgData = PetDegenerateCostBaseCfgData

class PetBuyBagBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  索引 */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  当前购买的总格子数 */
		 static getTotalBuySpaceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.totalBuySpace;
			}
			return 0;
		}
		 /**  需要钻石 */
		 static getNeedDiamondById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needDiamond;
			}
			return 0;
		}
		 /**  增加格子数 */
		 static getAddSpaceById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSpace;
			}
			return 0;
		}

}
	
cfg.PetBuyBagBaseCfgData = PetBuyBagBaseCfgData

class PetReplaceBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  需要消耗道具 */
		 static getNeedItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  需要消耗5星英雄数量 */
		 static getNeedHeroByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needHero;
			}
			return 0;
		}

}
	
cfg.PetReplaceBaseCfgData = PetReplaceBaseCfgData

class PetDegenerateSubstitudeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  类型（0代表全系） */
		 static getTypeByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  替代品道具 */
		 static getItemByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.item;
			}
			return ""
		}

}
	
cfg.PetDegenerateSubstitudeBaseCfgData = PetDegenerateSubstitudeBaseCfgData

class PetBookBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  伙伴索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  图鉴 */
		 static getBookMarkByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bookMark;
			}
			return 0;
		}
		 /**  图书馆 */
		 static getLibraryMarkByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.libraryMark;
			}
			return 0;
		}
		 /**  星级 */
		 static getStarByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  显示等级 */
		 static getMaxLevelByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  属性 */
		 static getAttrByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.attr;
			}
			return ""
		}
		 /**  战力 */
		 static getPowerByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.power;
			}
			return 0;
		}
		 /**  评论开关 */
		 static getReviewSwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.reviewSwitch;
			}
			return 0;
		}
		 /**  大神搭配开关 */
		 static getMasterMatchSwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.masterMatchSwitch;
			}
			return 0;
		}
		 /**  精灵档案开关 */
		 static getPetStorySwitchByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStorySwitch;
			}
			return 0;
		}
		 /**  精灵故事 */
		 static getPetStoryByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStory;
			}
			return ""
		}
		 /**  是否不启用精灵 */
		 static getInvalidByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetBookBaseCfgData = PetBookBaseCfgData

class PetStarScoreBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  总计评分 */
		 static getTotalScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.totalScore;
			}
			return 0;
		}
		 /**  等级评分 */
		 static getLevelScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.levelScore;
			}
			return 0;
		}
		 /**  装备评分 */
		 static getEquipScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.equipScore;
			}
			return 0;
		}
		 /**  星级评分 */
		 static getStarScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starScore;
			}
			return 0;
		}
		 /**  进阶评分 */
		 static getAdvanceScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.advanceScore;
			}
			return 0;
		}
		 /**  神器评分 */
		 static getArtifactScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.artifactScore;
			}
			return 0;
		}
		 /**  公会技能评分 */
		 static getFactionSkillScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.factionSkillScore;
			}
			return 0;
		}
		 /**  符文评分 */
		 static getRuneScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.runeScore;
			}
			return 0;
		}

}
	
cfg.PetStarScoreBaseCfgData = PetStarScoreBaseCfgData

class PetCallChangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  限制类型 */
		 static getNeedPetTypeByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetType;
			}
			return ""
		}
		 /**  消耗道具 */
		 static getNeedItemByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  库ID */
		 static getRandIDByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randID;
			}
			return 0;
		}

}
	
cfg.PetCallChangeBaseCfgData = PetCallChangeBaseCfgData

class PetCallFixChangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  精灵ID */
		 static getPetIDByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  最低等级 */
		 static getMinLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minLevel;
			}
			return 0;
		}
		 /**  最高等级 */
		 static getMaxLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  最低星级 */
		 static getMinStarByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStar;
			}
			return 0;
		}
		 /**  最高星级 */
		 static getMaxStarByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxStar;
			}
			return 0;
		}
		 /**  最低进化 */
		 static getMinEvolveByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minEvolve;
			}
			return 0;
		}
		 /**  最高进化 */
		 static getMaxEvolveByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxEvolve;
			}
			return 0;
		}
		 /**  最低进阶 */
		 static getMinAdvanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minAdvance;
			}
			return 0;
		}
		 /**  最高进阶 */
		 static getMaxAdvanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxAdvance;
			}
			return 0;
		}
		 /**  消耗道具 */
		 static getRemoveItemsByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.removeItems;
			}
			return ""
		}
		 /**  转换后精灵ID */
		 static getToPetIDByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.toPetID;
			}
			return 0;
		}
		 /**  控制标识 */
		 static getFlagByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.flag;
			}
			return 0;
		}

}
	
cfg.PetCallFixChangeBaseCfgData = PetCallFixChangeBaseCfgData

class PetCallCallPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  召唤类型 */
		 static getCallTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.callType;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.PetCallCallPoolBaseCfgData = PetCallCallPoolBaseCfgData

class PetCallCommonPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  种族 */
		 static getPetTypeByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  得分 */
		 static getPetScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petScore;
			}
			return 0;
		}

}
	
cfg.PetCallCommonPoolBaseCfgData = PetCallCommonPoolBaseCfgData

class PetCallCallCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  类型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  次数 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  消耗道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.PetCallCallCostBaseCfgData = PetCallCallCostBaseCfgData

class PetCallSpecailPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "callType");
		};
		 /**  召唤类型 */
		 static getCallTypeByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.callType;
			}
			return 0;
		}

}
	
cfg.PetCallSpecailPoolBaseCfgData = PetCallSpecailPoolBaseCfgData

class PetCallChangePoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  伙伴种族 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}

}
	
cfg.PetCallChangePoolBaseCfgData = PetCallChangePoolBaseCfgData

class PetCallFixChangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  精灵ID */
		 static getPetIDByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  最低等级 */
		 static getMinLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minLevel;
			}
			return 0;
		}
		 /**  最高等级 */
		 static getMaxLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  最低星级 */
		 static getMinStarByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStar;
			}
			return 0;
		}
		 /**  最高星级 */
		 static getMaxStarByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxStar;
			}
			return 0;
		}
		 /**  最低进化 */
		 static getMinEvolveByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minEvolve;
			}
			return 0;
		}
		 /**  最高进化 */
		 static getMaxEvolveByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxEvolve;
			}
			return 0;
		}
		 /**  最低进阶 */
		 static getMinAdvanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minAdvance;
			}
			return 0;
		}
		 /**  最高进阶 */
		 static getMaxAdvanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxAdvance;
			}
			return 0;
		}
		 /**  消耗道具 */
		 static getRemoveItemsByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.removeItems;
			}
			return ""
		}
		 /**  转换后精灵ID */
		 static getToPetIDByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.toPetID;
			}
			return 0;
		}
		 /**  控制标识 */
		 static getFlagByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.flag;
			}
			return 0;
		}

}
	
cfg.PetCallFixChangeBaseCfgData = PetCallFixChangeBaseCfgData

class PetCallChangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  限制类型 */
		 static getNeedPetTypeByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetType;
			}
			return ""
		}
		 /**  消耗道具 */
		 static getNeedItemByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  库ID */
		 static getRandIDByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randID;
			}
			return 0;
		}

}
	
cfg.PetCallChangeBaseCfgData = PetCallChangeBaseCfgData

class PetCallCallBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "callType");
		};
		 /**  抽卡类型 */
		 static getCallTypeByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.callType;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  需要VIP等级 */
		 static getNeedVipLevelByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needVipLevel;
			}
			return 0;
		}
		 /**  免费重置时间时间:分 */
		 static getFreeResetTimeByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.freeResetTime;
			}
			return ""
		}
		 /**  首次必出五星次数 */
		 static getFirstContinueCountByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstContinueCount;
			}
			return 0;
		}
		 /**  必出五星次数 */
		 static getContinueCountByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.continueCount;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  星级概率概率_星级; */
		 static getStarRateByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate;
			}
			return ""
		}
		 /**  种族概率概率_种族; */
		 static getTypeRateByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeRate;
			}
			return ""
		}
		 /**  随机四星以下种族概率概率_种族; */
		 static getSpecialTypeRateByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.specialTypeRate;
			}
			return ""
		}

}
	
cfg.PetCallCallBaseCfgData = PetCallCallBaseCfgData

class PetCallCommonPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  种族 */
		 static getPetTypeByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  得分 */
		 static getPetScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petScore;
			}
			return 0;
		}

}
	
cfg.PetCallCommonPoolBaseCfgData = PetCallCommonPoolBaseCfgData

class PetCallCallCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  类型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  次数 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  消耗道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.PetCallCallCostBaseCfgData = PetCallCallCostBaseCfgData

class PetCallCallBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "callType");
		};
		 /**  抽卡类型 */
		 static getCallTypeByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.callType;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  需要VIP等级 */
		 static getNeedVipLevelByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needVipLevel;
			}
			return 0;
		}
		 /**  免费重置时间时间:分 */
		 static getFreeResetTimeByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.freeResetTime;
			}
			return ""
		}
		 /**  首次必出五星次数 */
		 static getFirstContinueCountByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstContinueCount;
			}
			return 0;
		}
		 /**  必出五星次数 */
		 static getContinueCountByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.continueCount;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  星级概率概率_星级; */
		 static getStarRateByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate;
			}
			return ""
		}
		 /**  种族概率概率_种族; */
		 static getTypeRateByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeRate;
			}
			return ""
		}
		 /**  随机四星以下种族概率概率_种族; */
		 static getSpecialTypeRateByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.specialTypeRate;
			}
			return ""
		}

}
	
cfg.PetCallCallBaseCfgData = PetCallCallBaseCfgData

class PetCallChangePoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  伙伴种族 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}

}
	
cfg.PetCallChangePoolBaseCfgData = PetCallChangePoolBaseCfgData

class PetCallSpecailPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "callType");
		};
		 /**  召唤类型 */
		 static getCallTypeByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.callType;
			}
			return 0;
		}

}
	
cfg.PetCallSpecailPoolBaseCfgData = PetCallSpecailPoolBaseCfgData

class PetCallCallBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "callType");
		};
		 /**  抽卡类型 */
		 static getCallTypeByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.callType;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}
		 /**  需要VIP等级 */
		 static getNeedVipLevelByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needVipLevel;
			}
			return 0;
		}
		 /**  免费重置时间时间:分 */
		 static getFreeResetTimeByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.freeResetTime;
			}
			return ""
		}
		 /**  首次必出五星次数 */
		 static getFirstContinueCountByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstContinueCount;
			}
			return 0;
		}
		 /**  必出五星次数 */
		 static getContinueCountByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.continueCount;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  星级概率概率_星级; */
		 static getStarRateByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.starRate;
			}
			return ""
		}
		 /**  种族概率概率_种族; */
		 static getTypeRateByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.typeRate;
			}
			return ""
		}
		 /**  随机四星以下种族概率概率_种族; */
		 static getSpecialTypeRateByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.specialTypeRate;
			}
			return ""
		}

}
	
cfg.PetCallCallBaseCfgData = PetCallCallBaseCfgData

class PetCallCallCostBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  类型 */
		 static getTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  次数 */
		 static getCountByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}
		 /**  消耗道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.PetCallCallCostBaseCfgData = PetCallCallCostBaseCfgData

class PetCallCommonPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  种族 */
		 static getPetTypeByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  伙伴ID */
		 static getPetIDByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  得分 */
		 static getPetScoreByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petScore;
			}
			return 0;
		}

}
	
cfg.PetCallCommonPoolBaseCfgData = PetCallCommonPoolBaseCfgData

class PetCallCallPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  召唤类型 */
		 static getCallTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.callType;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.PetCallCallPoolBaseCfgData = PetCallCallPoolBaseCfgData

class PetCallChangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petStar");
		};
		 /**  星级 */
		 static getPetStarByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petStar;
			}
			return 0;
		}
		 /**  限制类型 */
		 static getNeedPetTypeByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needPetType;
			}
			return ""
		}
		 /**  消耗道具 */
		 static getNeedItemByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  库ID */
		 static getRandIDByPetStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.randID;
			}
			return 0;
		}

}
	
cfg.PetCallChangeBaseCfgData = PetCallChangeBaseCfgData

class PetCallFixChangeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  精灵ID */
		 static getPetIDByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  最低等级 */
		 static getMinLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minLevel;
			}
			return 0;
		}
		 /**  最高等级 */
		 static getMaxLevelByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxLevel;
			}
			return 0;
		}
		 /**  最低星级 */
		 static getMinStarByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStar;
			}
			return 0;
		}
		 /**  最高星级 */
		 static getMaxStarByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxStar;
			}
			return 0;
		}
		 /**  最低进化 */
		 static getMinEvolveByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minEvolve;
			}
			return 0;
		}
		 /**  最高进化 */
		 static getMaxEvolveByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxEvolve;
			}
			return 0;
		}
		 /**  最低进阶 */
		 static getMinAdvanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minAdvance;
			}
			return 0;
		}
		 /**  最高进阶 */
		 static getMaxAdvanceByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maxAdvance;
			}
			return 0;
		}
		 /**  消耗道具 */
		 static getRemoveItemsByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.removeItems;
			}
			return ""
		}
		 /**  转换后精灵ID */
		 static getToPetIDByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.toPetID;
			}
			return 0;
		}
		 /**  控制标识 */
		 static getFlagByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.flag;
			}
			return 0;
		}

}
	
cfg.PetCallFixChangeBaseCfgData = PetCallFixChangeBaseCfgData

class PetCallChangePoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petType");
		};
		 /**  伙伴种族 */
		 static getPetTypeByPetType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petType;
			}
			return 0;
		}

}
	
cfg.PetCallChangePoolBaseCfgData = PetCallChangePoolBaseCfgData

class PetCallSpecailPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "callType");
		};
		 /**  召唤类型 */
		 static getCallTypeByCallType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.callType;
			}
			return 0;
		}

}
	
cfg.PetCallSpecailPoolBaseCfgData = PetCallSpecailPoolBaseCfgData

class PetCallCallPoolBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  召唤类型 */
		 static getCallTypeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.callType;
			}
			return 0;
		}
		 /**  概率 */
		 static getRateByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rate;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.PetCallCallPoolBaseCfgData = PetCallCallPoolBaseCfgData

class PetSkinSReplaceEvolveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  伙伴ID */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  进化段数 */
		 static getEvolveByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolve;
			}
			return 0;
		}
		 /**  皮肤ID */
		 static getSkinIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}

}
	
cfg.PetSkinSReplaceEvolveBaseCfgData = PetSkinSReplaceEvolveBaseCfgData

class PetSkinSReplaceEvolveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  伙伴ID */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  进化段数 */
		 static getEvolveByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolve;
			}
			return 0;
		}
		 /**  皮肤ID */
		 static getSkinIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}

}
	
cfg.PetSkinSReplaceEvolveBaseCfgData = PetSkinSReplaceEvolveBaseCfgData

class PetSkinSReplaceSkinBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  精灵ID */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  进化段数 */
		 static getEvolveByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolve;
			}
			return 0;
		}
		 /**  皮肤ID */
		 static getSkinIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}

}
	
cfg.PetSkinSReplaceSkinBaseCfgData = PetSkinSReplaceSkinBaseCfgData

class PetSkinBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  皮肤ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  文件名 */
		 static getFileNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fileName;
			}
			return ""
		}
		 /**  骨骼资源名称 */
		 static getSkelNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skelName;
			}
			return ""
		}
		 /**  角色实际高度 */
		 static getTrueHeightById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.trueHeight;
			}
			return 0;
		}
		 /**  是否有例会 */
		 static getHaveVDrawById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.haveVDraw;
			}
			return 0;
		}
		 /**  是否新资源 */
		 static getNewResById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newRes;
			}
			return 0;
		}
		 /**  角色高度偏移值 */
		 static getDetalHeightById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.detalHeight;
			}
			return 0;
		}
		 /**  展示界面缩放比例 */
		 static getShowScaleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showScale;
			}
		}
		 /**  战斗缩放比例 */
		 static getFightScaleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightScale;
			}
		}
		 /**  初始动作名称 */
		 static getFirstActById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAct;
			}
			return ""
		}
		 /**  技能数据技能ID;技能ID */
		 static getAddSkillById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  图标(106*106) res\Unpack\Icon\Head */
		 static getIconNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iconName;
			}
			return 0;
		}
		 /**  全身(180*226) res\Unpack\Icon\card_new */
		 static getCardById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.card;
			}
			return 0;
		}
		 /**  大全身(644*566) res\Unpack\Icon\BigCard */
		 static getBigCardById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bigCard;
			}
			return 0;
		}
		 /**  皮肤对应的原始精灵ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  增加属性类型|值|万分比; */
		 static getRiskAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.riskAddAttr;
			}
			return ""
		}
		 /**  形象达成条件条件_值_emPreCondition1; //需要皮肤ID3; //需要星级4; //需要玩家等级5; //需要VIP等级 */
		 static getRiskNeedConditionById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.riskNeedCondition;
			}
			return ""
		}
		 /**  头像激活说明 */
		 static getHeadActiveDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.headActiveDesc;
			}
			return ""
		}
		 /**  是否在玩家冒险形象中显示 1显示0不显示 */
		 static getShowInPlayerBodyById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showInPlayerBody;
			}
			return 0;
		}
		 /**  是否在玩家头像中显示 1显示0不显示 */
		 static getShowInPlayerHeadById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showInPlayerHead;
			}
			return 0;
		}
		 /**  是否在图鉴中显示 1显示0不显示 */
		 static getShowInIllustrationById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showInIllustration;
			}
			return 0;
		}
		 /**  上阵图鉴的bigCard缩放值 */
		 static getIllustrationBigCardScaleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.illustrationBigCardScale;
			}
			return 0;
		}
		 /**  上阵图鉴的bigCard偏移值 */
		 static getIllustrationBigCardOffById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.illustrationBigCardOff;
			}
			return ""
		}
		 /**  上阵图鉴增加的属性 */
		 static getOnIllustrationAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.onIllustrationAttr;
			}
			return ""
		}
		 /**  皮肤星级(展示用) */
		 static getStarById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  加成属性战力值 */
		 static getFightPowerById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return ""
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetSkinBaseCfgData = PetSkinBaseCfgData

class PetSkinBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  皮肤ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  文件名 */
		 static getFileNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fileName;
			}
			return ""
		}
		 /**  骨骼资源名称 */
		 static getSkelNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skelName;
			}
			return ""
		}
		 /**  角色实际高度 */
		 static getTrueHeightById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.trueHeight;
			}
			return 0;
		}
		 /**  是否有例会 */
		 static getHaveVDrawById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.haveVDraw;
			}
			return 0;
		}
		 /**  是否新资源 */
		 static getNewResById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newRes;
			}
			return 0;
		}
		 /**  角色高度偏移值 */
		 static getDetalHeightById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.detalHeight;
			}
			return 0;
		}
		 /**  展示界面缩放比例 */
		 static getShowScaleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showScale;
			}
		}
		 /**  战斗缩放比例 */
		 static getFightScaleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightScale;
			}
		}
		 /**  初始动作名称 */
		 static getFirstActById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAct;
			}
			return ""
		}
		 /**  技能数据技能ID;技能ID */
		 static getAddSkillById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  图标(106*106) res\Unpack\Icon\Head */
		 static getIconNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iconName;
			}
			return 0;
		}
		 /**  全身(180*226) res\Unpack\Icon\card_new */
		 static getCardById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.card;
			}
			return 0;
		}
		 /**  大全身(644*566) res\Unpack\Icon\BigCard */
		 static getBigCardById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bigCard;
			}
			return 0;
		}
		 /**  皮肤对应的原始精灵ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  增加属性类型|值|万分比; */
		 static getRiskAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.riskAddAttr;
			}
			return ""
		}
		 /**  形象达成条件条件_值_emPreCondition1; //需要皮肤ID3; //需要星级4; //需要玩家等级5; //需要VIP等级 */
		 static getRiskNeedConditionById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.riskNeedCondition;
			}
			return ""
		}
		 /**  头像激活说明 */
		 static getHeadActiveDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.headActiveDesc;
			}
			return ""
		}
		 /**  是否在玩家冒险形象中显示 1显示0不显示 */
		 static getShowInPlayerBodyById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showInPlayerBody;
			}
			return 0;
		}
		 /**  是否在玩家头像中显示 1显示0不显示 */
		 static getShowInPlayerHeadById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showInPlayerHead;
			}
			return 0;
		}
		 /**  是否在图鉴中显示 1显示0不显示 */
		 static getShowInIllustrationById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showInIllustration;
			}
			return 0;
		}
		 /**  上阵图鉴的bigCard缩放值 */
		 static getIllustrationBigCardScaleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.illustrationBigCardScale;
			}
			return 0;
		}
		 /**  上阵图鉴的bigCard偏移值 */
		 static getIllustrationBigCardOffById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.illustrationBigCardOff;
			}
			return ""
		}
		 /**  上阵图鉴增加的属性 */
		 static getOnIllustrationAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.onIllustrationAttr;
			}
			return ""
		}
		 /**  皮肤星级(展示用) */
		 static getStarById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  加成属性战力值 */
		 static getFightPowerById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return ""
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetSkinBaseCfgData = PetSkinBaseCfgData

class PetSkinSReplaceEvolveBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  伙伴ID */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  进化段数 */
		 static getEvolveByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolve;
			}
			return 0;
		}
		 /**  皮肤ID */
		 static getSkinIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}

}
	
cfg.PetSkinSReplaceEvolveBaseCfgData = PetSkinSReplaceEvolveBaseCfgData

class PetSkinSReplaceSkinBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  精灵ID */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  进化段数 */
		 static getEvolveByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolve;
			}
			return 0;
		}
		 /**  皮肤ID */
		 static getSkinIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}

}
	
cfg.PetSkinSReplaceSkinBaseCfgData = PetSkinSReplaceSkinBaseCfgData

class PetSkinBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "id");
		};
		 /**  皮肤ID */
		 static getIdById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.id;
			}
			return 0;
		}
		 /**  文件名 */
		 static getFileNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fileName;
			}
			return ""
		}
		 /**  骨骼资源名称 */
		 static getSkelNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skelName;
			}
			return ""
		}
		 /**  角色实际高度 */
		 static getTrueHeightById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.trueHeight;
			}
			return 0;
		}
		 /**  是否有例会 */
		 static getHaveVDrawById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.haveVDraw;
			}
			return 0;
		}
		 /**  是否新资源 */
		 static getNewResById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.newRes;
			}
			return 0;
		}
		 /**  角色高度偏移值 */
		 static getDetalHeightById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.detalHeight;
			}
			return 0;
		}
		 /**  展示界面缩放比例 */
		 static getShowScaleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showScale;
			}
		}
		 /**  战斗缩放比例 */
		 static getFightScaleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightScale;
			}
		}
		 /**  初始动作名称 */
		 static getFirstActById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.firstAct;
			}
			return ""
		}
		 /**  技能数据技能ID;技能ID */
		 static getAddSkillById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addSkill;
			}
			return ""
		}
		 /**  图标(106*106) res\Unpack\Icon\Head */
		 static getIconNameById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iconName;
			}
			return 0;
		}
		 /**  全身(180*226) res\Unpack\Icon\card_new */
		 static getCardById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.card;
			}
			return 0;
		}
		 /**  大全身(644*566) res\Unpack\Icon\BigCard */
		 static getBigCardById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.bigCard;
			}
			return 0;
		}
		 /**  皮肤对应的原始精灵ID */
		 static getPetIDById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  增加属性类型|值|万分比; */
		 static getRiskAddAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.riskAddAttr;
			}
			return ""
		}
		 /**  形象达成条件条件_值_emPreCondition1; //需要皮肤ID3; //需要星级4; //需要玩家等级5; //需要VIP等级 */
		 static getRiskNeedConditionById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.riskNeedCondition;
			}
			return ""
		}
		 /**  头像激活说明 */
		 static getHeadActiveDescById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.headActiveDesc;
			}
			return ""
		}
		 /**  是否在玩家冒险形象中显示 1显示0不显示 */
		 static getShowInPlayerBodyById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showInPlayerBody;
			}
			return 0;
		}
		 /**  是否在玩家头像中显示 1显示0不显示 */
		 static getShowInPlayerHeadById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showInPlayerHead;
			}
			return 0;
		}
		 /**  是否在图鉴中显示 1显示0不显示 */
		 static getShowInIllustrationById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.showInIllustration;
			}
			return 0;
		}
		 /**  上阵图鉴的bigCard缩放值 */
		 static getIllustrationBigCardScaleById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.illustrationBigCardScale;
			}
			return 0;
		}
		 /**  上阵图鉴的bigCard偏移值 */
		 static getIllustrationBigCardOffById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.illustrationBigCardOff;
			}
			return ""
		}
		 /**  上阵图鉴增加的属性 */
		 static getOnIllustrationAttrById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.onIllustrationAttr;
			}
			return ""
		}
		 /**  皮肤星级(展示用) */
		 static getStarById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  加成属性战力值 */
		 static getFightPowerById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.fightPower;
			}
			return ""
		}
		 /**  是否不启用精灵 */
		 static getInvalidById(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.invalid;
			}
			return 0;
		}

}
	
cfg.PetSkinBaseCfgData = PetSkinBaseCfgData

class PetSkinSReplaceSkinBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "petID");
		};
		 /**  精灵ID */
		 static getPetIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.petID;
			}
			return 0;
		}
		 /**  进化段数 */
		 static getEvolveByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.evolve;
			}
			return 0;
		}
		 /**  皮肤ID */
		 static getSkinIDByPetID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.skinID;
			}
			return 0;
		}

}
	
cfg.PetSkinSReplaceSkinBaseCfgData = PetSkinSReplaceSkinBaseCfgData

class PlayerLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升级到下一级经验 */
		 static getNeedExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needExp;
			}
			return 0;
		}
		 /**  升级奖励（升到当前级的奖励） */
		 static getAddPrizeByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.PlayerLevelBaseCfgData = PlayerLevelBaseCfgData

class PlayerLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升级到下一级经验 */
		 static getNeedExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needExp;
			}
			return 0;
		}
		 /**  升级奖励（升到当前级的奖励） */
		 static getAddPrizeByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.PlayerLevelBaseCfgData = PlayerLevelBaseCfgData

class PlayerLevelBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "level");
		};
		 /**  等级 */
		 static getLevelByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.level;
			}
			return 0;
		}
		 /**  升级到下一级经验 */
		 static getNeedExpByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needExp;
			}
			return 0;
		}
		 /**  升级奖励（升到当前级的奖励） */
		 static getAddPrizeByLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrize;
			}
			return ""
		}

}
	
cfg.PlayerLevelBaseCfgData = PlayerLevelBaseCfgData

class PlayerNameNameBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  姓氏 */
		 static getSurNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.surName;
			}
			return ""
		}
		 /**  男名 */
		 static getMaleNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maleName;
			}
			return ""
		}
		 /**  女名 */
		 static getFemaleNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.femaleName;
			}
			return ""
		}

}
	
cfg.PlayerNameNameBaseCfgData = PlayerNameNameBaseCfgData

class PlayerNameNameBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  姓氏 */
		 static getSurNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.surName;
			}
			return ""
		}
		 /**  男名 */
		 static getMaleNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maleName;
			}
			return ""
		}
		 /**  女名 */
		 static getFemaleNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.femaleName;
			}
			return ""
		}

}
	
cfg.PlayerNameNameBaseCfgData = PlayerNameNameBaseCfgData

class PlayerNameNameBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  姓氏 */
		 static getSurNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.surName;
			}
			return ""
		}
		 /**  男名 */
		 static getMaleNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.maleName;
			}
			return ""
		}
		 /**  女名 */
		 static getFemaleNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.femaleName;
			}
			return ""
		}

}
	
cfg.PlayerNameNameBaseCfgData = PlayerNameNameBaseCfgData

class PrivilegeDailyPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型_emPrivilegeDailyPacket */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  需要特权卡_emPrivilegeCard */
		 static getNeedCardIDByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needCardID;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.PrivilegeDailyPrizeBaseCfgData = PrivilegeDailyPrizeBaseCfgData

class PrivilegeShopBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescribeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.describe;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  对应特权cardid */
		 static getCardIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cardID;
			}
			return 0;
		}
		 /**  补偿奖励 */
		 static getCompensationByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.compensation;
			}
			return ""
		}

}
	
cfg.PrivilegeShopBaseCfgData = PrivilegeShopBaseCfgData

class PrivilegeVipBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "vipLevel");
		};
		 /**  vip等级 */
		 static getVipLevelByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vipLevel;
			}
			return 0;
		}
		 /**  需要最低经验（充值元宝） */
		 static getNeedExpByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needExp;
			}
			return 0;
		}
		 /**  是否广播（1广播） */
		 static getIsBroadcastByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isBroadcast;
			}
			return 0;
		}
		 /**  礼包原价 */
		 static getOldPriceByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldPrice;
			}
			return 0;
		}
		 /**  礼包需要的道具 */
		 static getNeedItemByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加礼包 */
		 static getAddPacketByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPacket;
			}
			return ""
		}
		 /**  至尊月卡每日礼包 */
		 static getMonthPacketByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monthPacket;
			}
			return ""
		}
		 /**  增加特权 */
		 static getAddPrivilegeByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrivilege;
			}
			return ""
		}
		 /**  内容 */
		 static getContentByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}
		 /**  增加头像框 */
		 static getAddHeadIconByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addHeadIcon;
			}
			return 0;
		}

}
	
cfg.PrivilegeVipBaseCfgData = PrivilegeVipBaseCfgData

class PrivilegeCardBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "cardID");
		};
		 /**  特权卡_emPrivilegeCard */
		 static getCardIDByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cardID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要充值 */
		 static getNeedMoneyByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needMoney;
			}
			return 0;
		}
		 /**  有效天数 */
		 static getExpireDaysByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireDays;
			}
			return 0;
		}
		 /**  特权ID特权1_值;特权2_值; */
		 static getAddPrivilegeByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrivilege;
			}
			return ""
		}
		 /**  充值金额有效时间 */
		 static getRechargeExpireDaysByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rechargeExpireDays;
			}
			return 0;
		}

}
	
cfg.PrivilegeCardBaseCfgData = PrivilegeCardBaseCfgData

class PrivilegeDailyFirstChargeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "needLevel");
		};
		 /**  等级要求 */
		 static getNeedLevelByNeedLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByNeedLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.PrivilegeDailyFirstChargeBaseCfgData = PrivilegeDailyFirstChargeBaseCfgData

class PrivilegeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "privilegeType");
		};
		 /**  特权类型_emPrivilegeType */
		 static getPrivilegeTypeByPrivilegeType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.privilegeType;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameByPrivilegeType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.PrivilegeBaseCfgData = PrivilegeBaseCfgData

class PrivilegeCardBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "cardID");
		};
		 /**  特权卡_emPrivilegeCard */
		 static getCardIDByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cardID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要充值 */
		 static getNeedMoneyByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needMoney;
			}
			return 0;
		}
		 /**  有效天数 */
		 static getExpireDaysByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireDays;
			}
			return 0;
		}
		 /**  特权ID特权1_值;特权2_值; */
		 static getAddPrivilegeByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrivilege;
			}
			return ""
		}
		 /**  充值金额有效时间 */
		 static getRechargeExpireDaysByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rechargeExpireDays;
			}
			return 0;
		}

}
	
cfg.PrivilegeCardBaseCfgData = PrivilegeCardBaseCfgData

class PrivilegeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "privilegeType");
		};
		 /**  特权类型_emPrivilegeType */
		 static getPrivilegeTypeByPrivilegeType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.privilegeType;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameByPrivilegeType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.PrivilegeBaseCfgData = PrivilegeBaseCfgData

class PrivilegeShopBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescribeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.describe;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  对应特权cardid */
		 static getCardIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cardID;
			}
			return 0;
		}
		 /**  补偿奖励 */
		 static getCompensationByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.compensation;
			}
			return ""
		}

}
	
cfg.PrivilegeShopBaseCfgData = PrivilegeShopBaseCfgData

class PrivilegeVipBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "vipLevel");
		};
		 /**  vip等级 */
		 static getVipLevelByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vipLevel;
			}
			return 0;
		}
		 /**  需要最低经验（充值元宝） */
		 static getNeedExpByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needExp;
			}
			return 0;
		}
		 /**  是否广播（1广播） */
		 static getIsBroadcastByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isBroadcast;
			}
			return 0;
		}
		 /**  礼包原价 */
		 static getOldPriceByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldPrice;
			}
			return 0;
		}
		 /**  礼包需要的道具 */
		 static getNeedItemByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加礼包 */
		 static getAddPacketByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPacket;
			}
			return ""
		}
		 /**  至尊月卡每日礼包 */
		 static getMonthPacketByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monthPacket;
			}
			return ""
		}
		 /**  增加特权 */
		 static getAddPrivilegeByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrivilege;
			}
			return ""
		}
		 /**  内容 */
		 static getContentByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}
		 /**  增加头像框 */
		 static getAddHeadIconByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addHeadIcon;
			}
			return 0;
		}

}
	
cfg.PrivilegeVipBaseCfgData = PrivilegeVipBaseCfgData

class PrivilegeDailyFirstChargeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "needLevel");
		};
		 /**  等级要求 */
		 static getNeedLevelByNeedLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByNeedLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.PrivilegeDailyFirstChargeBaseCfgData = PrivilegeDailyFirstChargeBaseCfgData

class PrivilegeCardBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "cardID");
		};
		 /**  特权卡_emPrivilegeCard */
		 static getCardIDByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cardID;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  需要充值 */
		 static getNeedMoneyByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needMoney;
			}
			return 0;
		}
		 /**  有效天数 */
		 static getExpireDaysByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.expireDays;
			}
			return 0;
		}
		 /**  特权ID特权1_值;特权2_值; */
		 static getAddPrivilegeByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrivilege;
			}
			return ""
		}
		 /**  充值金额有效时间 */
		 static getRechargeExpireDaysByCardID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.rechargeExpireDays;
			}
			return 0;
		}

}
	
cfg.PrivilegeCardBaseCfgData = PrivilegeCardBaseCfgData

class PrivilegeDailyPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型_emPrivilegeDailyPacket */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  需要特权卡_emPrivilegeCard */
		 static getNeedCardIDByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needCardID;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.PrivilegeDailyPrizeBaseCfgData = PrivilegeDailyPrizeBaseCfgData

class PrivilegeDailyFirstChargeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "needLevel");
		};
		 /**  等级要求 */
		 static getNeedLevelByNeedLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needLevel;
			}
			return 0;
		}
		 /**  奖励物品 */
		 static getAddItemByNeedLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.PrivilegeDailyFirstChargeBaseCfgData = PrivilegeDailyFirstChargeBaseCfgData

class PrivilegeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "privilegeType");
		};
		 /**  特权类型_emPrivilegeType */
		 static getPrivilegeTypeByPrivilegeType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.privilegeType;
			}
			return 0;
		}
		 /**  名字 */
		 static getNameByPrivilegeType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}

}
	
cfg.PrivilegeBaseCfgData = PrivilegeBaseCfgData

class PrivilegeVipBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "vipLevel");
		};
		 /**  vip等级 */
		 static getVipLevelByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.vipLevel;
			}
			return 0;
		}
		 /**  需要最低经验（充值元宝） */
		 static getNeedExpByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needExp;
			}
			return 0;
		}
		 /**  是否广播（1广播） */
		 static getIsBroadcastByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.isBroadcast;
			}
			return 0;
		}
		 /**  礼包原价 */
		 static getOldPriceByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.oldPrice;
			}
			return 0;
		}
		 /**  礼包需要的道具 */
		 static getNeedItemByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加礼包 */
		 static getAddPacketByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPacket;
			}
			return ""
		}
		 /**  至尊月卡每日礼包 */
		 static getMonthPacketByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.monthPacket;
			}
			return ""
		}
		 /**  增加特权 */
		 static getAddPrivilegeByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addPrivilege;
			}
			return ""
		}
		 /**  内容 */
		 static getContentByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.content;
			}
			return ""
		}
		 /**  增加头像框 */
		 static getAddHeadIconByVipLevel(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addHeadIcon;
			}
			return 0;
		}

}
	
cfg.PrivilegeVipBaseCfgData = PrivilegeVipBaseCfgData

class PrivilegeShopBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "index");
		};
		 /**  索引 */
		 static getIndexByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.index;
			}
			return 0;
		}
		 /**  名称 */
		 static getNameByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescribeByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.describe;
			}
			return ""
		}
		 /**  需要道具 */
		 static getNeedItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}
		 /**  增加道具 */
		 static getAddItemByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  对应特权cardid */
		 static getCardIDByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cardID;
			}
			return 0;
		}
		 /**  补偿奖励 */
		 static getCompensationByIndex(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.compensation;
			}
			return ""
		}

}
	
cfg.PrivilegeShopBaseCfgData = PrivilegeShopBaseCfgData

class PrivilegeDailyPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型_emPrivilegeDailyPacket */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  需要特权卡_emPrivilegeCard */
		 static getNeedCardIDByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needCardID;
			}
			return 0;
		}
		 /**  增加道具 */
		 static getAddItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}

}
	
cfg.PrivilegeDailyPrizeBaseCfgData = PrivilegeDailyPrizeBaseCfgData

class PrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "prizeID");
		};
		 /**  奖励ID */
		 static getPrizeIDByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeID;
			}
			return 0;
		}

}
	
cfg.PrizeBaseCfgData = PrizeBaseCfgData

class PrizeCommonPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID_emCommonPrizeType */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  道具奖励ID_数量;ID_数量; */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  按钮文字 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.PrizeCommonPrizeBaseCfgData = PrizeCommonPrizeBaseCfgData

class PrizeFriendPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}

}
	
cfg.PrizeFriendPrizeBaseCfgData = PrizeFriendPrizeBaseCfgData

class PrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "prizeID");
		};
		 /**  奖励ID */
		 static getPrizeIDByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeID;
			}
			return 0;
		}

}
	
cfg.PrizeBaseCfgData = PrizeBaseCfgData

class PrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "prizeID");
		};
		 /**  奖励ID */
		 static getPrizeIDByPrizeID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.prizeID;
			}
			return 0;
		}

}
	
cfg.PrizeBaseCfgData = PrizeBaseCfgData

class PrizeFriendPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}

}
	
cfg.PrizeFriendPrizeBaseCfgData = PrizeFriendPrizeBaseCfgData

class PrizeCommonPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID_emCommonPrizeType */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  道具奖励ID_数量;ID_数量; */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  按钮文字 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.PrizeCommonPrizeBaseCfgData = PrizeCommonPrizeBaseCfgData

class PrizeFriendPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "count");
		};
		 /**  次数 */
		 static getCountByCount(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.count;
			}
			return 0;
		}

}
	
cfg.PrizeFriendPrizeBaseCfgData = PrizeFriendPrizeBaseCfgData

class PrizeCommonPrizeBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID_emCommonPrizeType */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  道具奖励ID_数量;ID_数量; */
		 static getAddItemByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.addItem;
			}
			return ""
		}
		 /**  按钮文字 */
		 static getNameByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.name;
			}
			return ""
		}
		 /**  描述 */
		 static getDescByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.desc;
			}
			return ""
		}

}
	
cfg.PrizeCommonPrizeBaseCfgData = PrizeCommonPrizeBaseCfgData

class ResonanceStarBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  升到下一级需要消耗道具数量 */
		 static getNeedItemCountByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItemCount;
			}
			return 0;
		}

}
	
cfg.ResonanceStarBaseCfgData = ResonanceStarBaseCfgData

class ResonanceGridBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  格子索引 */
		 static getGridIdxByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.gridIdx;
			}
			return 0;
		}
		 /**  开启条件 */
		 static getConditionByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.condition;
			}
			return ""
		}
		 /**  消耗道具 */
		 static getNeedItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ResonanceGridBaseCfgData = ResonanceGridBaseCfgData

class ResonanceGridBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  格子索引 */
		 static getGridIdxByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.gridIdx;
			}
			return 0;
		}
		 /**  开启条件 */
		 static getConditionByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.condition;
			}
			return ""
		}
		 /**  消耗道具 */
		 static getNeedItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ResonanceGridBaseCfgData = ResonanceGridBaseCfgData

class ResonanceCommonBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "cooling");
		};
		 /**  共鸣冷却(单位秒) */
		 static getCoolingByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cooling;
			}
			return 0;
		}
		 /**  共鸣冷却重置消耗（每小时x钻石） */
		 static getCoolingConsumeByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.coolingConsume;
			}
			return 0;
		}
		 /**  供奉最小星级 */
		 static getMinStarByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStar;
			}
			return 0;
		}
		 /**  放置最低星级 */
		 static getUpMinStarByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.upMinStar;
			}
			return 0;
		}

}
	
cfg.ResonanceCommonBaseCfgData = ResonanceCommonBaseCfgData

class ResonanceStarBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  升到下一级需要消耗道具数量 */
		 static getNeedItemCountByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItemCount;
			}
			return 0;
		}

}
	
cfg.ResonanceStarBaseCfgData = ResonanceStarBaseCfgData

class ResonanceGridBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "type");
		};
		 /**  类型 */
		 static getTypeByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.type;
			}
			return 0;
		}
		 /**  格子索引 */
		 static getGridIdxByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.gridIdx;
			}
			return 0;
		}
		 /**  开启条件 */
		 static getConditionByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.condition;
			}
			return ""
		}
		 /**  消耗道具 */
		 static getNeedItemByType(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItem;
			}
			return ""
		}

}
	
cfg.ResonanceGridBaseCfgData = ResonanceGridBaseCfgData

class ResonanceStarBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "star");
		};
		 /**  星级 */
		 static getStarByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.star;
			}
			return 0;
		}
		 /**  升到下一级需要消耗道具数量 */
		 static getNeedItemCountByStar(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needItemCount;
			}
			return 0;
		}

}
	
cfg.ResonanceStarBaseCfgData = ResonanceStarBaseCfgData

class ResonanceCommonBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "cooling");
		};
		 /**  共鸣冷却(单位秒) */
		 static getCoolingByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cooling;
			}
			return 0;
		}
		 /**  共鸣冷却重置消耗（每小时x钻石） */
		 static getCoolingConsumeByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.coolingConsume;
			}
			return 0;
		}
		 /**  供奉最小星级 */
		 static getMinStarByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStar;
			}
			return 0;
		}
		 /**  放置最低星级 */
		 static getUpMinStarByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.upMinStar;
			}
			return 0;
		}

}
	
cfg.ResonanceCommonBaseCfgData = ResonanceCommonBaseCfgData

class ResonanceCommonBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "cooling");
		};
		 /**  共鸣冷却(单位秒) */
		 static getCoolingByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.cooling;
			}
			return 0;
		}
		 /**  共鸣冷却重置消耗（每小时x钻石） */
		 static getCoolingConsumeByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.coolingConsume;
			}
			return 0;
		}
		 /**  供奉最小星级 */
		 static getMinStarByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.minStar;
			}
			return 0;
		}
		 /**  放置最低星级 */
		 static getUpMinStarByCooling(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.upMinStar;
			}
			return 0;
		}

}
	
cfg.ResonanceCommonBaseCfgData = ResonanceCommonBaseCfgData

class RiskEventBaseCfgData 
{
	static getInfo(value) 
	{
		return this._dataDic[value];
	}
	static getFirstInfo() 
	{
		if (this._dataArr && this._dataArr.length > 0) 
		{
			return this._dataArr[0];
		}
	}
	
			static setup(dataArr)
		{
			this._dataArr = dataArr;
			this._dataDic = TemplateUtil.converArrToDictionary(dataArr, "iD");
		};
		 /**  ID */
		 static getIDByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.iD;
			}
			return 0;
		}
		 /**  对方类型 */
		 static getTargetTypeByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.targetType;
			}
			return 0;
		}
		 /**  题目 */
		 static getQuestionByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.question;
			}
			return ""
		}
		 /**  选项1扣除消耗 */
		 static getNeedExpendByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.needExpend;
			}
			return ""
		}
		 /**  选项1 */
		 static getOption1ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.option1;
			}
			return ""
		}
		 /**  选项2 */
		 static getOption2ByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.option2;
			}
			return ""
		}
		 /**  答案 */
		 static getResultByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.result;
			}
			return 0;
		}
		 /**  答对时说的话 */
		 static getTrueDesByID(value)
		{
			 let info  = this.getInfo(value);
			if(info)
			{
				return info.trueDes;
			}
			return ""
