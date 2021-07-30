
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

declare namespace Pb_God {
	/**
	* 帐号标志
	*/
	class PBAccountFlag {
		constructor();
		/** 账号名*/
		public accountname:string;
		/** 帐号ID*/
		public accountid:number;
		/** 帐号标示码_emAccountMark*/
		public acountmark:number;
		/** 登录流水号*/
		public loginsn:Long;
		public static encode(message: Pb_God.PBAccountFlag, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBAccountFlag, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBAccountFlag;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBAccountFlag;
	}
	/**
	* 帐号
	*/
	class PBAccount {
		constructor();
		/** 帐号标志*/
		public accountflag:Pb_God.PBAccountFlag;
		/** 平台类型 _emPlatformType*/
		public plattype:number;
		/** 创建时间*/
		public createTime:number;
		/** 登录时间*/
		public loginTime:number;
		/** 字符串IP*/
		public ip:string;
		/** 网络字节IP*/
		public netip:Long;
		/** 账号密码*/
		public passwd:string;
		/** 世界ID*/
		public worldID:number;
		/** 当前角色ID*/
		public curPlayerID:number;
		/** 是否是GM登陆*/
		public isgmlogin:boolean;
		/** 是否是注册*/
		public isregister:boolean;
		/** 是否实名绑定*/
		public isIDCardBind:boolean;
		/** 登出时间*/
		public loginOutTime:number;
		/** 在线时间*/
		public onlineTime:number;
		/** 每日在线时间*/
		public dailyOnlineTime:number;
		public static encode(message: Pb_God.PBAccount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBAccount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBAccount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBAccount;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 晶碑系统返回
	*/
	enum _emResultTablet_40 {
		// 成功;
		R_ResultTablet_Succeed = 0,
		// 失败;
		R_ResultTablet_Fail = 1,
		// 需要道具不足;
		R_ResultTablet_NeedItem = 2,
		// 没有魔液可收取;
		R_ResultTablet_NoHarvest = 3,
		// 星数不足;
		R_ResultTablet_Star = 4,
		// 晶碑星数不足，不能开启赋能创造;
		R_ResultTablet_CreateStar = 5,
		// 还有剩余经验值，需要先取回;
		R_ResultTablet_Exp = 6,
		// 经验值不是整数倍数;
		R_ResultTablet_ExpValue = 7,
		// 没有剩余经验;
		R_ResultTablet_NoExp = 8,
		// 没有该英雄;
		R_ResultTablet_NoHero = 9,
		// 英雄星数不够;
		R_ResultTablet_HeroStar = 10,
		// 临时英雄不能放入;
		R_ResultTablet_HeroTmp = 11,
		// 没有该天赋技能;
		R_ResultTablet_NoSkill = 12,
		// 星数不够天赋技能未开放;
		R_ResultTablet_SkillStar = 13,
		// 创造次数不足;
		R_ResultTablet_CreateCount = 14,
		// 超过提炼上限;
		R_ResultTablet_Limit = 15,
		// 位置错误;
		R_ResultTablet_Position = 16,
	}
	/**
	*----晶碑模块
	*/
	enum _emC2S_Tablet_Protocol {
		// 	 放入经验(exp)            PBU64 ;
		C2S_Tablet_PutExp = 1,
		//	 收获魔液;
		C2S_Tablet_GetMagicJuice = 2,
		//	 放置英雄,空位sn填0(pos, pet Sn)    PBU32U64 ;
		C2S_Tablet_PutHero = 3,
		//	 升级晶碑	;
		C2S_Tablet_Upgrade = 4,
		//	 创造英雄                 PBC2SCreateHero;
		C2S_Tablet_Create = 5,
		//	 请求魔液状态;
		C2S_Tablet_MagicJuice = 6,
		// 	 取回经验;
		C2S_Tablet_GetBackExp = 7,
	}
	/**
	*----晶碑模块
	*/
	enum _emS2C_Tablet_Protocol {
		// 	 放入经验返回                 PBMagicJuiceState;
		S2C_Tablet_PutExp = 1,
		//	 收获魔液返回                 PBMagicJuiceState;
		S2C_Tablet_GetMagicJuice = 2,
		//	 放置英雄返回(pos, pet sn)	PBU32U64;
		S2C_Tablet_PutHero = 3,
		//	 升级晶碑返回(level)		    PBU32;
		S2C_Tablet_Upgrade = 4,
		//	 创造英雄返回(pet sn)		    PBU64;
		S2C_Tablet_Create = 5,
		//     请求魔液状态返回             PBMagicJuiceState;
		S2C_Tablet_MagicJuice = 6,
		//     取回经验(魔液,exp)           PBU32U64;
		S2C_Tablet_GetBackExp = 7,
	}
	/**
	* 赋能创造请求
	*/
	class PBC2SCreateHero {
		constructor();
		/** 英雄sn*/
		public sn:Long;
		/** 天赋技能*/
		public skill:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBC2SCreateHero, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2SCreateHero, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2SCreateHero;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2SCreateHero;
	}
	/**
	* 魔液状态
	*/
	class PBMagicJuiceState {
		constructor();
		/**剩余经验*/
		public exp:Long;
		/**下次提取的时间*/
		public time:number;
		/**炼好的魔液*/
		public juice:number;
		/**当前提炼等级*/
		public level:number;
		public static encode(message: Pb_God.PBMagicJuiceState, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBMagicJuiceState, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBMagicJuiceState;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBMagicJuiceState;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 龙珠
	*/
	enum _emResultDragonBall_43 {
		//  成功;
		R_ResultDragonBall_Succeed = 0,
		//  失败;
		R_ResultDragonBall_Fail = 1,
		//  未解锁;
		R_ResultDragonBall_Lock = 2,
		//  已解锁;
		R_ResultDragonBall_UnLock = 3,
		//  道具不足;
		R_ResultDragonBall_NeedItem = 4,
		//  已经达到最大等级;
		R_ResultDragonBall_MaxLevel = 5,
	}
	/**
	*--- 客户端到服务器
	*/
	enum _emC2S_DragonBall_Protocol {
		//解锁 PBU32;
		C2S_DragonBall_UnLock = 0,
		//升级	PBU32;
		C2S_DragonBall_Levelup = 1,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_DragonBall_Protocol {
		//解锁返回 	PBU32;
		S2C_DragonBall_UnLock = 0,
		//升级(type, level) PBU32U32;
		S2C_DragonBall_Levelup = 1,
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 平台返回错误码
	*/
	enum _emResultPlatform_34 {
		//  成功;
		R_Platform_Succeed = 0,
		//  失败;
		R_Platform_Fail = 1,
		//  需要购买次数;
		R_Platform_NeedBuyCount = 2,
		//  需要等级;
		R_Platform_NeedLevel = 3,
		//  需要vip等级;
		R_Platform_NeedVIPLevel = 4,
		//  活动商品不能买;
		R_Platform_NeedActivity = 5,
		//  条件不满足;
		R_Platform_NeedCondition = 6,
		//  查询中;
		R_Platform_Wait = 7,
	}
	/**
	*----平台模块
	*/
	enum _emC2S_Platform_Protocol {
		// 充值 PBChargeData;
		C2S_Platform_charge = 1,
	}
	/**
	*----平台模块
	*/
	enum _emS2C_Platform_Protocol {
		// 通用失败返回;
		S2C_Platform_Common = 0,
		// 充值 PBChargeData;
		S2C_Platform_sanqi_charge = 1,
		// 更新充值信息 PBChargeInfo;
		S2C_Platform_update_chargeinfo = 2,
		// 更新充值信息 PBPlayerPlatform;
		S2C_Platform_SynCharge = 3,
		// 切支付 PBPlatformMisc;
		S2C_Platform_MISC = 4,
	}
	/**
	* 充值 
	*/
	class PBChargeData {
		constructor();
		/**用户ID*/
		public uid:string;
		/**服务器ID*/
		public sid:number;
		/**角色ID */
		public actorid:number;
		/**游戏研发订单 id*/
		public orderno:string;
		/**金额*/
		public money:string;
		/**商品ID */
		public productid:number;
		/**当前请求时间*/
		public time:number;
		/**订单sign*/
		public ordersign:string;
		/**订单Item   商品ID*单价（分）*数量*商品名称*内购定义商品ID*/
		public orderitem:string;
		/**国内版不传，海外版必传。如美元USD，默认人民币CNY*/
		public currencytype:string;
		/**版本号*/
		public version:string;
		/**客户端参数*/
		public clientparam:Pb_God.ClientParam[];
		public static encode(message: Pb_God.PBChargeData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChargeData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChargeData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChargeData;
	}
	/**
	* 创建订单 客户端参数
	*/
	class ClientParam {
		constructor();
		/***/
		public key:string;
		/***/
		public value:string;
		public static encode(message: Pb_God.ClientParam, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.ClientParam, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.ClientParam;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.ClientParam;
	}
	/**
	* 版本号
	*/
	class PBPlatformMisc {
		constructor();
		/**切支付url*/
		public misc:string;
		public static encode(message: Pb_God.PBPlatformMisc, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlatformMisc, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlatformMisc;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlatformMisc;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 红包
	*/
	enum _emResultRedEnvelope_47 {
		//  成功;
		R_ResultRedEnvelope_Succeed = 0,
		//  失败;
		R_ResultRedEnvelope_Fail = 1,
		//  未到领取时间;
		R_ResultRedEnvelope_TimeErr = 2,
	}
	/**
	*----客户端到服务器
	*/
	enum _emC2S_RedEnvelope_Protocol {
		//打开红包 PBC2GOpenRedEnvelopeAsk;
		C2S_RedEnvelope_OpenAsk = 1,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_RedEnvelope_Protocol {
		//失败才返回;
		S2C_RedEnvelope_Common_Ack = 0,
		//开启红包 PBG2COpenRedEnvelopeAck;
		S2C_RedEnvelope_OpenAck = 1,
		//刷新/重置红包 PBG2CRedEnvelopeRefresh;
		S2C_RedEnvelope_Refresh = 2,
	}
	/**
	*打开红包
	*/
	class PBC2GOpenRedEnvelopeAsk {
		constructor();
		/** 红包索引*/
		public index:number;
		public static encode(message: Pb_God.PBC2GOpenRedEnvelopeAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GOpenRedEnvelopeAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GOpenRedEnvelopeAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GOpenRedEnvelopeAsk;
	}
	/**
	*打开红包返回
	*/
	class PBG2COpenRedEnvelopeAck {
		constructor();
		/**红包索引*/
		public index:number;
		/**红包领取时间*/
		public receiveTime:number;
		/**红包领取状态 0可领取 1未开启 2已领取*/
		public status:number;
		/**红包领取物品*/
		public award:Pb_God.PBItemInfo[];
		/**其他人获取列表*/
		public data:Pb_God.PBRedEnvelopeData[];
		/**新红包标识 0旧红包 1新红包 */
		public newFlag:number;
		public static encode(message: Pb_God.PBG2COpenRedEnvelopeAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2COpenRedEnvelopeAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2COpenRedEnvelopeAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2COpenRedEnvelopeAck;
	}
	/**
	*刷新/重置红包	
	*/
	class PBG2CRedEnvelopeRefresh {
		constructor();
		/**刷新/重置数据*/
		public data:Pb_God.PBRefreshInfo[];
		public static encode(message: Pb_God.PBG2CRedEnvelopeRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRedEnvelopeRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRedEnvelopeRefresh;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRedEnvelopeRefresh;
	}
	/**
	*刷新/重置
	*/
	class PBRefreshInfo {
		constructor();
		/**红包索引*/
		public index:number;
		/**红包领取状态  0可领取 1未开启 2已领取 */
		public status:number;
		public static encode(message: Pb_God.PBRefreshInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRefreshInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRefreshInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRefreshInfo;
	}
}
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

declare namespace Pb_God {
	/**
	*----活动的返回
	*/
	enum _emResultActivity_33 {
		//  成功;
		R_Activity_Succeed = 0,
		//  失败;
		R_Activity_Fail = 1,
		//  已经领取;
		R_Activity_Acquired = 2,
		//  没达到要求;
		R_Activity_Requirement = 3,
		//  奖品数量不足;
		R_Activity_Num = 4,
		//  当前时间不能领取;
		R_Activity_Time = 5,
		//  还没有购买;
		R_Activity_Brought = 6,
		//  过期了;
		R_Activity_Expired = 7,
		//  vip等级不足;
		R_Activity_VIP = 8,
		//  等级不足;
		R_Activity_Level = 9,
		//  未达到天数;
		R_Activity_Day = 10,
		//  道具不足;
		R_Activity_NeedItem = 11,
		//  消耗精灵无效;
		R_Activity_NotPet = 12,
		//  精灵消耗失败;
		R_Activity_RemovePet = 13,
		//  精灵消耗数据不足;
		R_Activity_PetNumNotEnough = 14,
		// 周末福蛋，领取日期错误;
		R_Activity_WeekDay_Error = 15,
		// 定制礼包，所选礼包重复;
		R_Activity_CustomGift_Index_Error = 16,
		// 定制礼包，购买次数不足;
		R_Activity_CustomGift_Count = 17,
		// 定制礼包，非免费领取;
		R_Activity_CustomGift_No_Free = 18,
	}
	/**
	*----活动模块
	*/
	enum _emC2S_Activity_Protocol {
		// 	 领奖品 PBG2CActivityDrawReward;
		C2S_Activity_DrawReward = 1,
		//     获取当前活动的开始时间 PBC2GActivityStartTime;
		C2S_Activity_GetStartTime = 2,
		//     获取活动奖励物品的剩余数量(全区共用的奖励数量),活动ID PBU32;
		C2S_Activity_GetRewardNum = 3,
		//     领奖品 PBG2CActivityDrawRewardEx ;
		C2S_Activity_DrawRewardEx = 4,
		//     一键领奖 PBG2CActivityDrawRewardOneKey  ;
		C2S_Activity_DrawRewardOneKey = 5,
		//     定制礼包预选商品 PBC2GActivityCustomGiftOrder  ;
		C2S_Activity_CustomGiftOrder = 6,
	}
	/**
	*----活动模块
	*/
	enum _emS2C_Activity_Protocol {
		// 	 通用返回;
		S2C_Activity_Common_ACK = 1,
		//     领取奖品返回             PBG2CActivityDrawReward;
		S2C_Activity_DrawReward = 2,
		//     活动开始通知，活动ID     PBU32;
		S2C_Activity_Open = 3,
		//     活动关闭通知，活动ID     PBU32;
		S2C_Activity_Close = 4,
		//     活动数据重置，活动ID     PBU32;
		S2C_Activity_Refresh = 5,
		//     返回当前活动的开始时间       PBG2CActivityStartTime;
		S2C_Activity_GetStartTime = 6,
		//     返回奖励物品的剩余数量   PBG2CActivityRewardNum;
		S2C_Activity_GetRewardNum = 7,
		//     同步数据                 PBPlayerActivityData;
		S2C_Activity_Data = 8,
		//     定制礼包预选商品         PBG2CActivityCustomGiftOrder ;
		S2C_Activity_CustomGiftOrder = 9,
	}
	/**
	*----活动模块
	*/
	enum _emActivitySwitch {
		// 	 7日目标活动开放等级;
		ActivitySwitch_AchievementLevel = 1,
	}
	/**
	* 兑换类型
	*/
	enum _emActivityExchangeType {
		//     道具;
		ActivityExchangeType_Item = 1,
		//     精灵;
		ActivityExchangeType_Pet = 2,
	}
	/**
	*保存数值Key
	*/
	enum _emActivityDataKey {
		//	 充值累计金额;
		Activity_Key_ChargeAmount = 1,
		//	 充值累计天数;
		Activity_Key_ChargeDays = 2,
		//	 上次充值的时间;
		Activity_Key_ChargeLastTime = 3,
		//     计次活动完成数目;
		Activity_Key_CompleteNum = 4,
		//     兑换数量;
		Activity_Key_ExchageNum = 5,
		//     购买数量;
		Activity_Key_BuyCount = 6,
		//     首充上次领取的时间;
		Activity_Key_FirstChargeLastTime = 7,
		//     首充已经领取的天数;
		Activity_Key_FirstChargeDay = 8,
		//     购买基金的时间;
		Activity_Key_BoughtFundTime = 9,
		//    登陆天数;
		Activity_Key_LoginDays = 10,
		//    上次登陆时间;
		Activity_Key_LastLoginTime = 11,
		//    触发短期礼包的时间;
		Activity_Key_TriggerGiftTime = 12,
		//    每日首充是否领取了;
		Activity_Key_DailyFirstChargeAcquired = 13,
		//    7日目标触发时间;
		Activity_Key_AchievementOpenTime = 14,
		//    触发短期礼包的数量;
		Activity_Key_TriggerGiftNum = 15,
		//    触发短期礼包的最大数量;
		Activity_Key_TriggerMaxGiftNum = 16,
		//    购买时间;
		Activity_Key_BuyTime = 17,
		//    排行榜值;
		Activity_Key_RankValue = 18,
		//    跨服排行榜开始时的初始值;
		Activity_Key_CrossRankBeginValue = 19,
		//    跨服排行榜值;
		Activity_Key_CrossRankValue = 20,
		//    战令进阶购买;
		Activity_Key_War_Order_Buy = 21,
		//   周末福蛋开启倒计时 福蛋使用;
		Activity_Key_LuckyEgg_CountDown = 22,
		//   周末福蛋奖励状态  ;
		Activity_Key_LuckyEgg_Index_Status = 23,
		//   领取福蛋倒计时结束时间;
		Activity_Key_LuckyEgg_CountDown_End = 24,
		//   定制礼包购买次数;
		Activity_Key_CustomGift_Count = 25,
		//   基金终生卡最后奖励领取的时间;
		Activity_Key_LifeTime_LastTime = 26,
	}
	/**
	*周末福蛋状态
	*/
	enum _emLuckyEggStatus {
		// 不可领取;
		LuckyEgg_Status_Can_Not_Get = 0,
		// 可领;
		LuckyEgg_Status_Can_Get = 1,
		// 已领取;
		LuckyEgg_Status_Already_Get = 2,
		// 错过领取时间;
		LuckyEgg_Status_Miss_Time = 3,
	}
	/**
	*战令奖励保存数值Key， mapIndexVal
	*/
	enum _emWarOrderRewardKey {
		//	 普通奖励;
		War_Order_Reward_Key_General = 1,
		//	 特殊奖励;
		War_Order_Reward_Key_Special = 2,
	}
	/**
	*战令奖励领奖状态
	*/
	enum _emWarOrderRewardFlag {
		//	 未领奖;
		War_Order_Reward_Flag_None = 0,
		//	 已领奖;
		War_Order_Reward_Flag_Get = 1,
	}
	/**
	*world服保存数值Key
	*/
	enum _emActivityWorldDataKey {
		//	 奖品剩余数量;
		Activity_WorldKey_RewardNum = 1,
		//	 已经领取的玩家;
		Activity_WorldKey_AcquiredPlayers = 2,
	}
	/**
	* 领取奖品信息
	*/
	class PBG2CActivityDrawReward {
		constructor();
		/**活动ID*/
		public id:number;
		/**索引，对应活动配置表里的索引*/
		public index:number;
		/**领取数量*/
		public num:number;
		public static encode(message: Pb_God.PBG2CActivityDrawReward, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CActivityDrawReward, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CActivityDrawReward;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CActivityDrawReward;
	}
	/**
	* 领取奖品信息加强版
	*/
	class PBG2CActivityDrawRewardEx {
		constructor();
		/**活动ID*/
		public id:number;
		/**索引，对应活动配置表里的索引*/
		public index:number;
		/**兑换数量*/
		public count:number;
		/**精灵SN/。。。*/
		public data:Long[];
		public static encode(message: Pb_God.PBG2CActivityDrawRewardEx, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CActivityDrawRewardEx, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CActivityDrawRewardEx;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CActivityDrawRewardEx;
	}
	/**
	* 一键领取奖品
	*/
	class PBG2CActivityDrawRewardOneKey {
		constructor();
		/**活动ID*/
		public id:number;
		/**索引，对应活动配置表里的索引*/
		public index:number;
		public static encode(message: Pb_God.PBG2CActivityDrawRewardOneKey, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CActivityDrawRewardOneKey, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CActivityDrawRewardOneKey;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CActivityDrawRewardOneKey;
	}
	/**
	*开启了的活动信息
	*/
	class PBC2GActivityStartTime {
		constructor();
		/** 活动的ID,如果为空(没有指定活动)，返回所有的活动，否则只返回请求id的开始时间*/
		public id:number[];
		public static encode(message: Pb_God.PBC2GActivityStartTime, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GActivityStartTime, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GActivityStartTime;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GActivityStartTime;
	}
	/**
	*开启了的活动信息
	*/
	class PBG2CActivityStartTime {
		constructor();
		/** 活动的ID*/
		public id:number[];
		/** 活动的开启时间*/
		public starttime:number[];
		public static encode(message: Pb_God.PBG2CActivityStartTime, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CActivityStartTime, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CActivityStartTime;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CActivityStartTime;
	}
	/**
	*奖励物品的剩余数量
	*/
	class PBG2CActivityRewardNum {
		constructor();
		/**活动ID*/
		public id:number;
		/**key是index，value 是num*/
		public reward:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBG2CActivityRewardNum, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CActivityRewardNum, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CActivityRewardNum;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CActivityRewardNum;
	}
	/**
	*定制礼包预选商品
	*/
	class PBC2GActivityCustomGiftOrder {
		constructor();
		/**活动ID*/
		public ActivityID:number;
		/**GiftIndex 奖励索引*/
		public index:number;
		/**GiftPoolIndex 奖励池Index*/
		public GiftPoolIndex:number[];
		public static encode(message: Pb_God.PBC2GActivityCustomGiftOrder, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GActivityCustomGiftOrder, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GActivityCustomGiftOrder;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GActivityCustomGiftOrder;
	}
	/**
	*定制礼包预选商品
	*/
	class PBG2CActivityCustomGiftOrder {
		constructor();
		public static encode(message: Pb_God.PBG2CActivityCustomGiftOrder, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CActivityCustomGiftOrder, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CActivityCustomGiftOrder;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CActivityCustomGiftOrder;
	}
}
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

declare namespace Pb_God {
	/**
	*孵蛋的返回
	*/
	enum _emResultIncubateEgg_52 {
		// 成功;
		R_ResultIncubateEgg_Succeed = 0,
		// 失败;
		R_ResultIncubateEgg_Fail = 1,
		// 该精灵正在孵化中;
		R_ResultIncubateEgg_Already = 2,
		// 消耗材料不足;
		R_ResultIncubateEgg_Consume = 3,
		// 精灵未在孵化;
		R_ResultIncubateEgg_NotIncubate = 4,
		// 自行车道具正在使用中;
		R_ResultIncubateEgg_BikeInUse = 5,
		// 该次孵化已使用过暖暖石;
		R_ResultIncubateEgg_AlreadyUseSub = 6,
		// 该孵化未结束;
		R_ResultIncubateEgg_NoEnd = 7,
	}
	/**
	*孵蛋模块
	*/
	enum _emC2S_IncubateEgg_Protocol {
		// 开始孵蛋 PBC2SIncubateEggStart;
		C2S_IncubateEgg_Start = 1,
		// 加速孵化 PBC2SIncubateEggSpeedUp;
		C2S_IncubateEgg_SpeedUp = 2,
		// 取消孵化 PBC2SIncubateEggCancel;
		C2S_IncubateEgg_Cancel = 3,
		// 孵蛋破壳 PBC2SIncubateEggPip;
		C2S_IncubateEgg_Pip = 4,
	}
	/**
	*孵蛋模块
	*/
	enum _emS2C_IncubateEgg_Protocol {
		//通用返回,错误码;
		S2C_IncubateEgg_Common = 1,
		// 开始孵蛋     PBS2CIncubateEggStart;
		S2C_IncubateEgg_Start = 2,
		// 加速孵化     PBS2CIncubateEggSpeedUp;
		S2C_IncubateEgg_SpeedUp = 3,
		// 取消孵化     PBS2CIncubateEggCancel;
		S2C_IncubateEgg_Cancel = 4,
		// 孵蛋破壳     PBS2CIncubateEggPip;
		S2C_IncubateEgg_Pip = 5,
		// 孵化结束同步 PBS2CIncubateEggEndSyn;
		S2C_IncubateEgg_EndSyn = 6,
		// 孵蛋         PBIncubateEggData;
		S2C_IncubateEgg_SynInfo = 7,
	}
	/**
	*孵化道具作用类型
	*/
	enum _emIncubateEgg_ItemType {
		// 孵化道具直接增加步数;
		ENM_INCUBATEEGG_ADD_STEP = 1,
		// 孵化道具增加每分钟步数(速度);
		ENM_INCUBATEEGG_ADD_SPEED = 2,
		// 孵化道具，减少总步数;
		ENM_INCUBATEEGG_SUB_TOTAL_STEP = 3,
	}
	/**
	*开始孵化
	*/
	class PBC2SIncubateEggStart {
		constructor();
		/**孵化索引*/
		public Index:number;
		public static encode(message: Pb_God.PBC2SIncubateEggStart, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2SIncubateEggStart, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2SIncubateEggStart;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2SIncubateEggStart;
	}
	/**
	*开始孵化
	*/
	class PBS2CIncubateEggStart {
		constructor();
		public static encode(message: Pb_God.PBS2CIncubateEggStart, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBS2CIncubateEggStart, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBS2CIncubateEggStart;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBS2CIncubateEggStart;
	}
	/**
	*取消孵化
	*/
	class PBC2SIncubateEggCancel {
		constructor();
		/**取消孵化Index*/
		public Index:number;
		public static encode(message: Pb_God.PBC2SIncubateEggCancel, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2SIncubateEggCancel, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2SIncubateEggCancel;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2SIncubateEggCancel;
	}
	/**
	*取消孵化
	*/
	class PBS2CIncubateEggCancel {
		constructor();
		public static encode(message: Pb_God.PBS2CIncubateEggCancel, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBS2CIncubateEggCancel, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBS2CIncubateEggCancel;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBS2CIncubateEggCancel;
	}
	/**
	*加速孵化
	*/
	class PBC2SIncubateEggSpeedUp {
		constructor();
		/**加速孵化蛋索引*/
		public IncubateEggIndex:number;
		/**使用加速道具ID*/
		public ItemID:number;
		public static encode(message: Pb_God.PBC2SIncubateEggSpeedUp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2SIncubateEggSpeedUp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2SIncubateEggSpeedUp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2SIncubateEggSpeedUp;
	}
	/**
	*加速孵化
	*/
	class PBS2CIncubateEggSpeedUp {
		constructor();
		public static encode(message: Pb_God.PBS2CIncubateEggSpeedUp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBS2CIncubateEggSpeedUp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBS2CIncubateEggSpeedUp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBS2CIncubateEggSpeedUp;
	}
	/**
	*孵蛋破壳
	*/
	class PBC2SIncubateEggPip {
		constructor();
		/**破壳孵蛋Index*/
		public Index:number;
		public static encode(message: Pb_God.PBC2SIncubateEggPip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2SIncubateEggPip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2SIncubateEggPip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2SIncubateEggPip;
	}
	/**
	*孵蛋破壳
	*/
	class PBS2CIncubateEggPip {
		constructor();
		/***/
		public Index:number;
		public static encode(message: Pb_God.PBS2CIncubateEggPip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBS2CIncubateEggPip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBS2CIncubateEggPip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBS2CIncubateEggPip;
	}
	/**
	*孵化结束同步
	*/
	class PBS2CIncubateEggEndSyn {
		constructor();
		/**结束孵化蛋索引*/
		public Index:number;
		public static encode(message: Pb_God.PBS2CIncubateEggEndSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBS2CIncubateEggEndSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBS2CIncubateEggEndSyn;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBS2CIncubateEggEndSyn;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 试炼系统返回
	*/
	enum _emResultTrain_17 {
		// 成功;
		R_ResultTrain_Succeed = 0,
		// 失败;
		R_ResultTrain_Fail = 1,
		// 奖励已经领取;
		R_ResultTrain_HavePrize = 2,
		// 未通关此关卡;
		R_ResultTrain_NeedStageID = 3,
		// 道具不足	;
		R_ResultTrain_NeedItem = 4,
		// 达到最大进入次数;
		R_ResultTrain_MaxEnterCount = 5,
		// 需要通关上一关卡;
		R_ResultTrain_NeedPreStage = 6,
		// 进入次数不足;
		R_ResultTrain_NeedEnterCount = 7,
		// 无奖励可以领取;
		R_ResultTrain_NoStagePrize = 8,
		// 无此buff可以选择;
		R_ResultTrain_NoBuff = 9,
		// 今日已经选择过支援了;
		R_ResultTrain_AlreadySupport = 10,
		// 支援好友不存在;
		R_ResultTrain_SupportNotExist = 11,
		// 没有支援;
		R_ResultTrain_NotSupport = 12,
		// 支援等级超过范围;
		R_ResultTrain_SupportLevel = 13,
		// 今日已经使用过支援了;
		R_ResultTrain_UsedSupport = 14,
		// buff已经买过了;
		R_ResultTrain_AlreadyHaveBuff = 15,
		// 达到最大购买次数	;
		R_ResultTrain_BuyCount = 16,
		// buff不存在;
		R_ResultTrain_PeakBuff = 17,
		// 只能挑战当天的boss;
		R_ResultTrain_PeakDay = 18,
		// 已通关;
		R_ResultTrain_Clear = 19,
		// 已过挑战时间;
		R_ResultTrain_OverTime = 20,
	}
	/**
	*----试炼模块
	*/
	enum _emC2S_Train_Protocol {
		//试练塔扫荡			PBU32;
		C2S_Train_TowerSweep = 1,
		//试练塔领奖			PBU32;
		C2S_Train_TowerPrize = 2,
		//试练塔购买次数		PBU32;
		C2S_Train_TowerBuyCount = 3,
		//无尽试炼领奖			PBU32;
		C2S_Train_EndlessPrize = 4,
		//废弃;
		C2S_Train_xxxxxxxxxxxxxx = 5,
		//无尽试炼选择buff返回	PBU32;
		C2S_Train_EndlessBuff = 6,
		//查询试练塔录像		PBU32;
		C2S_Train_QueryTowerVideo = 7,
		//废弃;
		C2S_Train_xxxxxxxxxxxxxxx = 8,
		//购买buff(技能index)		PBU32;
		C2S_Train_PeakBuyBuff = 9,
		//购买次数;
		C2S_Train_PeakBuyCount = 10,
	}
	/**
	*----试炼模块
	*/
	enum _emS2C_Train_Protocol {
		//通用返回(失败才返回);
		S2C_Train_CommonAck = 1,
		//练塔购买次数返回(类型，次数)	PBU32U32;
		S2C_Train_TowerBuyCount = 2,
		//试练塔领奖返回 			PBU32;
		S2C_Train_TowerPrize = 3,
		//试练塔挑战次数 			PBG2CTowerFightCount;
		S2C_Train_TowerFightCount = 4,
		//无尽试炼领奖				PBU32;
		S2C_Train_EndlessPrize = 5,
		//无尽试炼选择buff返回		PBU32;
		S2C_Train_EndlessBuff = 6,
		//无尽试炼通知buff组		PBU32;
		S2C_Train_EndlessBuffGroup = 7,
		//无尽试炼同步信息			PBPlayerTrainEndless;
		S2C_Train_SynEndlessInfo = 8,
		//查询试练塔录像返回		PBWorldStageVideoInfo;
		S2C_Train_QueryTowerVideoAck = 9,
		//废弃;
		S2C_Train_xxxxxxxxxxx = 10,
		//废弃;
		S2C_Train_xxxxxxxxxx = 11,
		// 废弃;
		S2C_Train_xxxxxxxxx = 12,
		// 购买buff返回			PBU32			;
		S2C_Train_PeakBuyBuff = 13,
		// 购买次数返回(fight count, buy count) PBU32U32;
		S2C_Train_PeakBuyCount = 14,
	}
	/**
	* 登录返回玩家角色列表
	*/
	class PBG2CTowerFightCount {
		constructor();
		/** 关卡ID*/
		public stageid:number;
		/** 今日购买次数*/
		public daybuycount:number;
		/** 今日挑战次数*/
		public dayfightcount:number;
		/** 类型*/
		public type:number;
		public static encode(message: Pb_God.PBG2CTowerFightCount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTowerFightCount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTowerFightCount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTowerFightCount;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 圣物相关
	*/
	enum _emResultHoly_29 {
		//  成功;
		R_ResultHoly_Succeed = 0,
		//  失败;
		R_ResultHoly_Fail = 1,
		// 扣除的道具不足;
		R_ResultHoly_NeedItem = 2,
		// 达到最大等级;
		R_ResultHoly_MaxUpgradeLevel = 3,
		// 达到最大进阶等级;
		R_ResultHoly_MaxAdvanceLevel = 4,
		// 圣物等级不足;
		R_ResultHoly_NeedHolyLevel = 5,
		// 伙伴不能够被消耗;
		R_ResultHoly_PetNoUse = 6,
		// 需要伙伴不满足;
		R_ResultHoly_NeedPet = 7,
		// 已经解锁;
		R_ResultHoly_HaveUnlock = 8,
		// 未解锁;
		R_ResultHoly_NoUnlock = 9,
	}
	/**
	*----圣物模块
	*/
	enum _emC2S_Holy_Protocol {
		// 	 升级		PBU32;
		C2S_Holy_Upgrade = 1,
		// 	 进阶		PBC2GHolyAdvanceAsk;
		C2S_Holy_Advance = 2,
		// 	 解锁		PBC2GHolyAdvanceAsk;
		C2S_Holy_Unlock = 3,
	}
	/**
	*----圣物模块
	*/
	enum _emS2C_Holy_Protocol {
		//	 升级返回		PBPlayerHolyInfo;
		S2C_Holy_Upgrade = 0,
		//	 进阶返回 	PBPlayerHolyInfo;
		S2C_Holy_Advance = 1,
		//	 解锁返回 	PBPlayerHolyInfo;
		S2C_Holy_Unlock = 2,
	}
	/**
	* 玩家离开请求
	*/
	class PBC2GHolyAdvanceAsk {
		constructor();
		/** 伙伴类型*/
		public pettype:number;
		/** 伙伴SN*/
		public petsn:Long[];
		public static encode(message: Pb_God.PBC2GHolyAdvanceAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GHolyAdvanceAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GHolyAdvanceAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GHolyAdvanceAsk;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------公告类型
	*/
	enum _emBroadcast_Notice {
		//系统;
		BroadcastNotice_System = 1,
		//炫耀;
		BroadcastNotice_Parade = 2,
		//喇叭;
		BroadcastNotice_Horn = 3,
		//GM;
		BroadcastNotice_GM = 4,
	}
	/**
	*----广播系统
	*/
	enum _emS2C_Broadcast_Protocol {
		//	 GM测试			PBBroadcasStringU32	;
		S2C_BroadCast_GM = 1,
		//	 更新vip等级		PBBroadcasStringU32;
		S2C_BroadCast_VipLevelUp = 2,
		//	 公会招募			PBBroadcasFactionRecruit;
		S2C_BroadCast_FactionRecruit = 3,
		//	 公会副本集结		PBBroadcasFactionCopymapNotice;
		S2C_BroadCast_FactionCopymapNotice = 4,
		//	 竞技场x连胜(名字，多少场)		PBBroadcasStringU32	;
		S2C_BroadCast_Challenge = 5,
		//	 冠军赛提醒(开始时间)		PBU32;
		S2C_BroadCast_Champion = 6,
		//	 跨服竞技场x连胜(名字，多少场)	PBBroadcasStringU32;
		S2C_BroadCast_CrossChallenge = 7,
		//	 段位赛x连胜(名字，多少场)	PBBroadcasStringU32;
		S2C_BroadCast_Dan = 8,
		//	 探宝获得x品质以上道具	PBBroadcastTreasure;
		S2C_BroadCast_Treasure = 9,
		//	 合成6星英雄（名字,pet id）	PBBroadcastHeroStar;
		S2C_BroadCast_Hero6Star = 10,
		//	 9星以上英雄升星		PBBroadcastHeroStar;
		S2C_BroadCast_Hero9Star = 11,
		//	 建立工会		PBBroadcasFactionCreate;
		S2C_BroadCast_Faction = 12,
		//	 激活月卡	(玩家名字，月卡类型)	PBBroadcasStringU32;
		S2C_BroadCast_MonthCard = 13,
		//   高级召唤获得5星英雄(玩家名字, pet id)	PBBroadcasStringU32;
		S2C_BroadCast_AdvCall5Star = 14,
		//   首冲奖励			PBBroadcastItems;
		S2C_BroadCast_FirstCharge = 15,
		//   七日登陆			PBBroadcastItems;
		S2C_BroadCast_7DayLogin = 16,
		//   主线通关			PBBroadcastHookStage;
		S2C_BroadCast_HookStage = 17,
		//   先知召唤(玩家名字, pet id)	PBBroadcasStringU32;
		S2C_BroadCast_OracleCall = 18,
		//	 通关试炼塔		PBBroadcastTower;
		S2C_BroadCast_Tower = 19,
		//	 元灵解锁(名字，元灵ID)		PBBroadcasStringU32	;
		S2C_BroadCast_Artifact = 20,
		//	 先知召唤物品		PBBroadcastItem	;
		S2C_BroadCast_OracleCallItem = 21,
		//	 主线第一名(名字, stageid)	PBBroadcasStringU32	;
		S2C_BroadCast_MainTop1 = 22,
		//	 试炼塔1第一名(名字, 层数)		PBBroadcasStringU32	;
		S2C_BroadCast_Tower1Top1 = 23,
		//	 竞技场第一名(名字)			PBBroadcasString	;
		S2C_BroadCast_ChallengeTop1 = 24,
		//	 战斗力第一名(名字)			PBBroadcasString	;
		S2C_BroadCast_PowerTop1 = 25,
		//	 高级召唤获得6星英雄(玩家名字, pet id)			PBBroadcasStringU32;
		S2C_BroadCast_AdvCall6Star = 26,
		//	 充值基金(玩家名字, 商品 id)			PBBroadcasStringU32;
		S2C_BroadCast_ChargeFund = 27,
		//	 充值礼包(玩家名字, 商品 id)			PBBroadcasStringU32;
		S2C_BroadCast_ChargeGift = 28,
		//	 充值牛逼礼包(玩家名字, 商品 id)			PBBroadcasStringU32	;
		S2C_BroadCast_ChargeNB = 29,
		//	 公会boss结算(boss名字,章节 id)			PBBroadcasStringU32	;
		S2C_BroadCast_FactionBoss = 30,
		//	 通关试炼塔2		PBBroadcastTower;
		S2C_BroadCast_Tower2 = 31,
		//	 试炼塔2第一名(名字, 层数)		PBBroadcasStringU32	;
		S2C_BroadCast_Tower2Top1 = 32,
	}
	/**
	*String
	*/
	class PBBroadcasString {
		constructor();
		/**字符串*/
		public msg:string;
		public static encode(message: Pb_God.PBBroadcasString, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcasString, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcasString;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcasString;
	}
	/**
	* StringU32
	*/
	class PBBroadcasStringU32 {
		constructor();
		/**字符串*/
		public msg:string;
		/**值*/
		public value:number;
		public static encode(message: Pb_God.PBBroadcasStringU32, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcasStringU32, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcasStringU32;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcasStringU32;
	}
	/**
	* StringU32
	*/
	class PBBroadcasMultiString {
		constructor();
		/**字符串*/
		public msg:string[];
		public static encode(message: Pb_God.PBBroadcasMultiString, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcasMultiString, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcasMultiString;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcasMultiString;
	}
	/**
	* 公会招募
	*/
	class PBBroadcasFactionRecruit {
		constructor();
		/**等级*/
		public factionlevel:number;
		/**名称*/
		public factionname:string;
		/**公会ID*/
		public factionid:number;
		/**申请等级*/
		public applylevel:number;
		/**发起者*/
		public display:Pb_God.PBPlayerDisplay;
		public static encode(message: Pb_God.PBBroadcasFactionRecruit, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcasFactionRecruit, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcasFactionRecruit;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcasFactionRecruit;
	}
	/**
	* 公会建立
	*/
	class PBBroadcasFactionCreate {
		constructor();
		/**玩家名字*/
		public playername:string;
		/**公会名称*/
		public factionname:string;
		/**公会ID*/
		public factionid:number;
		public static encode(message: Pb_God.PBBroadcasFactionCreate, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcasFactionCreate, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcasFactionCreate;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcasFactionCreate;
	}
	/**
	* 公会副本集结
	*/
	class PBBroadcasFactionCopymapNotice {
		constructor();
		/**职位*/
		public factionjob:number;
		/**名称*/
		public playername:string;
		public static encode(message: Pb_God.PBBroadcasFactionCopymapNotice, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcasFactionCopymapNotice, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcasFactionCopymapNotice;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcasFactionCopymapNotice;
	}
	/**
	* 探宝
	*/
	class PBBroadcastTreasure {
		constructor();
		/**玩家名字*/
		public name:string;
		/**物品id*/
		public itemid:number;
		/**个数*/
		public num:number;
		public static encode(message: Pb_God.PBBroadcastTreasure, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcastTreasure, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcastTreasure;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcastTreasure;
	}
	/**
	* 英雄升星
	*/
	class PBBroadcastHeroStar {
		constructor();
		/**玩家名字*/
		public name:string;
		/**英雄ID，换成皮肤id*/
		public hero:number;
		/**星级*/
		public star:number;
		public static encode(message: Pb_God.PBBroadcastHeroStar, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcastHeroStar, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcastHeroStar;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcastHeroStar;
	}
	/**
	* 道具
	*/
	class PBBroadcastItems {
		constructor();
		/**玩家名字*/
		public name:string;
		/**道具们*/
		public items:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBBroadcastItems, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcastItems, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcastItems;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcastItems;
	}
	/**
	* 主线通关
	*/
	class PBBroadcastHookStage {
		constructor();
		/**玩家名字*/
		public name:string;
		/**关卡*/
		public stage:number;
		/**道具们*/
		public items:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBBroadcastHookStage, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcastHookStage, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcastHookStage;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcastHookStage;
	}
	/**
	* 试炼塔通关
	*/
	class PBBroadcastTower {
		constructor();
		/**玩家名字*/
		public name:string;
		/**关卡*/
		public stage:number;
		/**道具们*/
		public items:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBBroadcastTower, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcastTower, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcastTower;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcastTower;
	}
	/**
	* 道具
	*/
	class PBBroadcastItem {
		constructor();
		/**玩家名字*/
		public name:string;
		/**道具*/
		public item:Pb_God.PBItemInfo;
		public static encode(message: Pb_God.PBBroadcastItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBroadcastItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBroadcastItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBroadcastItem;
	}
}
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

declare namespace Pb_God {
	/**
	* 开服时间
	*/
	class PBWorldSvrInfo {
		constructor();
		/** 逻辑服务器ID*/
		public logicworldid:number;
		/** 开服时间*/
		public startTime:number;
		/** 世界等级*/
		public worldlevel:number;
		/** 游戏服务器ID*/
		public worldid:number[];
		/** 合服时间*/
		public mergeTime:number;
		public static encode(message: Pb_God.PBWorldSvrInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldSvrInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldSvrInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldSvrInfo;
	}
	/**
	* 服务器信息
	*/
	class PBServerInfo {
		constructor();
		/** 逻辑服务器ID*/
		public logicWorldID:number;
		/** 服务器类型*/
		public serverType:number;
		/** 服务器ID*/
		public serverID:number;
		public static encode(message: Pb_God.PBServerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBServerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBServerInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBServerInfo;
	}
	/**
	* 消耗
	*/
	class PBPlayerExpend {
		constructor();
		/** 货币类型_emExpendType*/
		public expendtype:number;
		/** 值*/
		public value:Long;
		public static encode(message: Pb_God.PBPlayerExpend, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerExpend, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerExpend;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerExpend;
	}
	/**
	* 客户端数据
	*/
	class PBVerClientData {
		constructor();
		/**文件名*/
		public filename:string;
		/** crc码*/
		public crc:number;
		public static encode(message: Pb_God.PBVerClientData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBVerClientData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBVerClientData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBVerClientData;
	}
	/**
	* 战斗属性
	*/
	class PBAttrBaseInfo {
		constructor();
		/**属性类型_emBattleAttribute*/
		public type:number;
		/**属性值*/
		public value:Long;
		/**属性万分比*/
		public rate:number;
		public static encode(message: Pb_God.PBAttrBaseInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBAttrBaseInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBAttrBaseInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBAttrBaseInfo;
	}
	/**
	* 战斗属性
	*/
	class PBAttrInfo {
		constructor();
		/**属性类型_emBattleAttribute*/
		public type:number;
		/**属性值*/
		public value:Long;
		public static encode(message: Pb_God.PBAttrInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBAttrInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBAttrInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBAttrInfo;
	}
	/**
	* 战斗属性
	*/
	class PBSkillInfo {
		constructor();
		/**技能ID*/
		public skillid:number;
		/**技能等级*/
		public skilllevel:number;
		public static encode(message: Pb_God.PBSkillInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBSkillInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBSkillInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBSkillInfo;
	}
	/**
	* 伙伴星级
	*/
	class PBPetStar {
		constructor();
		/**伙伴ID*/
		public petid:number;
		/**伙伴星级*/
		public star:number;
		public static encode(message: Pb_God.PBPetStar, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPetStar, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPetStar;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPetStar;
	}
	/**
	* 道具信息
	*/
	class PBItemInfo {
		constructor();
		/**道具ID*/
		public itemid:number;
		/**道具个数*/
		public itemcount:Long;
		public static encode(message: Pb_God.PBItemInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBItemInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBItemInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBItemInfo;
	}
	/**
	* 道具信息
	*/
	class PBItemSnCount {
		constructor();
		/**道具sn*/
		public itemsn:Long;
		/**道具个数*/
		public itemcount:number;
		public static encode(message: Pb_God.PBItemSnCount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBItemSnCount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBItemSnCount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBItemSnCount;
	}
	/**
	* 消耗
	*/
	class PBExpendInfo {
		constructor();
		/** 货币类型_emExpendType*/
		public expendtype:number;
		/** 值*/
		public value:Long;
		public static encode(message: Pb_God.PBExpendInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBExpendInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBExpendInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBExpendInfo;
	}
	/**
	* 通用双属性
	*/
	class PBU32U32 {
		constructor();
		/***/
		public key:number;
		/** */
		public value:number;
		public static encode(message: Pb_God.PBU32U32, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBU32U32, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBU32U32;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBU32U32;
	}
	/**
	* 通用双属性
	*/
	class PBU32U64 {
		constructor();
		/***/
		public key:number;
		/** */
		public value:Long;
		public static encode(message: Pb_God.PBU32U64, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBU32U64, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBU32U64;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBU32U64;
	}
	/**
	* 通用双属性
	*/
	class PBU64U32 {
		constructor();
		/***/
		public key:Long;
		/** */
		public value:number;
		public static encode(message: Pb_God.PBU64U32, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBU64U32, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBU64U32;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBU64U32;
	}
	/**
	* 通用双属性
	*/
	class PBSkillCD {
		constructor();
		/**技能id*/
		public skillid:number;
		/**当前的CD*/
		public cd:number;
		public static encode(message: Pb_God.PBSkillCD, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBSkillCD, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBSkillCD;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBSkillCD;
	}
	/**
	* 通用单属性
	*/
	class PBString {
		constructor();
		/** */
		public value:string;
		public static encode(message: Pb_God.PBString, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBString, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBString;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBString;
	}
	/**
	* 通用属性
	*/
	class PBU32String {
		constructor();
		/** */
		public key:number;
		/** */
		public value:string;
		public static encode(message: Pb_God.PBU32String, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBU32String, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBU32String;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBU32String;
	}
	/**
	* 通用单属性
	*/
	class PBU32 {
		constructor();
		/** */
		public value:number;
		public static encode(message: Pb_God.PBU32, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBU32, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBU32;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBU32;
	}
	/**
	* 通用单属性
	*/
	class PBU64 {
		constructor();
		/***/
		public value:Long;
		public static encode(message: Pb_God.PBU64, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBU64, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBU64;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBU64;
	}
	/**
	* 血量
	*/
	class PBPetHp {
		constructor();
		/**sn*/
		public sn:Long;
		/**当前血量0死亡*/
		public curhp:Long;
		public static encode(message: Pb_God.PBPetHp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPetHp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPetHp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPetHp;
	}
	/**
	* 玩家请求
	*/
	class PBPlayerQuery {
		constructor();
		/**玩家ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		/**帮派ID*/
		public factionid:number;
		public static encode(message: Pb_God.PBPlayerQuery, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerQuery, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerQuery;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerQuery;
	}
	/**
	* 装备sn
	*/
	class PBPosEquip {
		constructor();
		/**位置*/
		public pos:number;
		/**道具SN*/
		public itemsn:Long;
		public static encode(message: Pb_God.PBPosEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPosEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPosEquip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPosEquip;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 
	*/
	enum _emResultFight_5 {
		//  成功;
		R_ResultFight_Succeed = 0,
		//  失败;
		R_ResultFight_Fail = 1,
		//  无此战斗;
		R_ResultFight_NoFight = 2,
		//  重复上阵伙伴;
		R_ResultFight_RepeatedPet = 3,
		//  出场支援英雄数量超过限制;
		R_ResultFight_SupportMore = 4,
		//  战斗类型不支持支援;
		R_ResultFight_NoSupport = 5,
		//  阵型错误;
		R_ResultFight_Zhenfa = 6,
		//  自动战斗错误（赛季第一场） ;
		R_ResultFight_AutoResultErr = 7,
	}
	/**
	*----战斗模块
	*/
	enum _emC2S_Fight_Protocol {
		//普通战斗			PBC2GFightNormalBegin;
		C2S_Fight_NormalBegin = 1,
		//普通战斗结果		PBC2GFightNormalResult;
		C2S_Fight_NormalResult = 2,
		//无尽继续战斗		PBC2GFightBeginBase		;
		C2S_Fight_EndlessContinue = 3,
		//退出战斗			PBC2GFightBeginBase;
		C2S_Fight_Exit = 4,
		//天界副本放弃战斗	PBC2GFightBeginBase;
		C2S_Fight_HeavenGiveup = 5,
	}
	/**
	*----战斗模块
	*/
	enum _emS2C_Fight_Protocol {
		//通用失败返回;
		S2C_Fight_Common_Ack = 0,
		//普通战斗返回			PBFightBase;
		S2C_Fight_NormalBegin_Ack = 1,
		//普通战斗结果			PBFightResult;
		S2C_Fight_NormalResult_Ack = 2,
		//加载正在进行的战斗	PBFightResult;
		S2C_Fight_LoadIng = 3,
		//无尽继续返回			PBFightResult;
		S2C_Fight_EndlessContinue_Ack = 4,
	}
	/**
	*动作类型
	*/
	enum _emFightAction {
		//  使用技能 	对应 PBFightActionSkill;
		FightAction_Skill = 1,
		//  技能结束标识 无;
		FightAction_SkillEnd = 2,
		//  技能攻击 	对应 PBFightActionAttack;
		FightAction_Attack = 3,
		//  hp变化 		对应 PBFightActionHP;
		FightAction_HP = 4,
		//  加buff 		对应 PBFightActionBuff;
		FightAction_Buff = 5,
		//  buff效果 	对应 PBFightActionBuffFx;
		FightAction_BuffFx = 6,
	}
	/**
	*buff效果类型
	*/
	enum _emFightBuffFxType {
		// 免疫控制;
		FightBuffFx_Immune = 1,
		// 护盾 参数：护盾抵消值;
		FightBuffFx_Shield = 2,
	}
	/**
	*战斗结束请求
	*/
	class PBC2GFightNormalResult {
		constructor();
		/**流水ID*/
		public battlesn:Long;
		/**战斗结果*/
		public result:number;
		/**是否用客户端结果*/
		public isuseclient:boolean;
		public static encode(message: Pb_God.PBC2GFightNormalResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFightNormalResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFightNormalResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFightNormalResult;
	}
	/**
	*普通战斗
	*/
	class PBC2GFightBeginBase {
		constructor();
		/**战斗类型_emBattleType*/
		public battletype:number;
		/**挑战ID*/
		public id:number;
		public static encode(message: Pb_God.PBC2GFightBeginBase, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFightBeginBase, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFightBeginBase;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFightBeginBase;
	}
	/**
	*战斗开始请求
	*/
	class PBC2GFightNormalBegin {
		constructor();
		/**战斗类型_emBattleType*/
		public battletype:number;
		/**挑战ID*/
		public id:number;
		/**参数*/
		public param:number;
		/**阵法ID*/
		public zhenfaid:number;
		/**位置伙伴 key:位置 value:伙伴sn*/
		public posdata:Pb_God.PBPlayerZhenfaPos[];
		/**神器ID*/
		public artifactid:number;
		/**是否自动跳过*/
		public autoresult:boolean;
		/**客户端参数*/
		public clientparam:string;
		public static encode(message: Pb_God.PBC2GFightNormalBegin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFightNormalBegin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFightNormalBegin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFightNormalBegin;
	}
	/**
	*玩家出战对象
	*/
	class PBPlayerBattleInfo {
		constructor();
		/**玩家外显*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**战斗伙伴*/
		public battlepet:Pb_God.PBBattlePet;
		/**第几队伍，从1开始*/
		public index:number;
		public static encode(message: Pb_God.PBPlayerBattleInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerBattleInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerBattleInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerBattleInfo;
	}
	/**
	*竞技场战斗结果
	*/
	class PBFightChallengeResult {
		constructor();
		/**友方最新积分*/
		public friendscore:number;
		/**友方改变积分*/
		public friendaddscore:number;
		/**敌方最新积分*/
		public enermyscore:number;
		/**敌方改变积分*/
		public enermyaddscore:number;
		/**友方名次*/
		public friendrank:number;
		/**敌方名次*/
		public enermyrank:number;
		public static encode(message: Pb_God.PBFightChallengeResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightChallengeResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightChallengeResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightChallengeResult;
	}
	/**
	*超凡段位赛结果
	*/
	class PBFightDanResult {
		constructor();
		/** 当前段位*/
		public danid:number;
		/** 当前积分*/
		public score:number;
		/** 当前经验*/
		public exp:number;
		/** 当前的缓冲经验*/
		public cacheexp:number;
		/** 增加积分(负数减)*/
		public addexp:number;
		/** 晋级赛结果*/
		public promoteresult:number[];
		/** 王者赛1场是否结束（车轮战,有1场多次战斗）*/
		public kingbattlefin:boolean;
		public static encode(message: Pb_God.PBFightDanResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightDanResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightDanResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightDanResult;
	}
	/**
	*跨服天梯结果
	*/
	class PBFightLadderResult {
		constructor();
		/** 进入次数*/
		public entercount:number;
		/** 最大名次*/
		public maxrank:number;
		/** 公会名*/
		public factionname:string;
		public static encode(message: Pb_God.PBFightLadderResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightLadderResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightLadderResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightLadderResult;
	}
	/**
	*天界副本的结果
	*/
	class PBFightHeavenResult {
		constructor();
		/** 得到的星星(星星的索引，从0开始)*/
		public star:number[];
		/** 战斗完毕*/
		public fin:boolean;
		public static encode(message: Pb_God.PBFightHeavenResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightHeavenResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightHeavenResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightHeavenResult;
	}
	/**
	*跨服竞技场的结果
	*/
	class PBFightCrossChallengeResult {
		constructor();
		/**友方最新积分*/
		public friendscore:number;
		/**友方改变积分*/
		public friendaddscore:number;
		/**敌方最新积分*/
		public enermyscore:number;
		/**敌方改变积分*/
		public enermyaddscore:number;
		/**友方名次*/
		public friendrank:number;
		/**敌方名次*/
		public enermyrank:number;
		/**奖品index*/
		public index:number[];
		/**自己外显*/
		public selfdisplay:Pb_God.PBPlayerDisplay;
		/**敌人外显*/
		public enermydisplay:Pb_God.PBPlayerDisplay;
		public static encode(message: Pb_God.PBFightCrossChallengeResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightCrossChallengeResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightCrossChallengeResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightCrossChallengeResult;
	}
	/**
	*战斗buff状态
	*/
	class PBFightBuffState {
		constructor();
		/** buff id*/
		public buffid:number;
		/** 持续回合数*/
		public round:number;
		/** 叠加层数*/
		public layer:number;
		public static encode(message: Pb_God.PBFightBuffState, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightBuffState, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightBuffState;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightBuffState;
	}
	/**
	*战斗单位状态
	*/
	class PBFightUnitState {
		constructor();
		/** uint id*/
		public unitid:number;
		/** 当前最大hp*/
		public maxhp:Long;
		/** 当前hp*/
		public hp:Long;
		/** 当前身上的buff(id, round)*/
		public buff:Pb_God.PBFightBuffState[];
		public static encode(message: Pb_God.PBFightUnitState, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightUnitState, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightUnitState;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightUnitState;
	}
	/**
	*战斗使用技能
	*/
	class PBFightActionSkill {
		constructor();
		/** 源 unit id*/
		public src:number;
		/** 目标 unit id*/
		public dst:number[];
		/** 相关技能的index*/
		public skillindex:number;
		public static encode(message: Pb_God.PBFightActionSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightActionSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightActionSkill;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightActionSkill;
	}
	/**
	*战斗攻击
	*/
	class PBFightActionAttack {
		constructor();
		/** 源 unit id*/
		public src:number;
		/** 目标 unit id*/
		public dst:number;
		/** 相关技能的index*/
		public skillindex:number;
		/** 是否命中,未命中即为躲闪*/
		public hit:boolean;
		/** 是否物理攻击，否则是魔法攻击*/
		public physical:boolean;
		public static encode(message: Pb_God.PBFightActionAttack, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightActionAttack, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightActionAttack;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightActionAttack;
	}
	/**
	*buff效果
	*/
	class PBFightActionBuffFx {
		constructor();
		/** 源 unit id*/
		public src:number;
		/** 类型 _emFightBuffFxType*/
		public type:number;
		/** 参数*/
		public param:number;
		public static encode(message: Pb_God.PBFightActionBuffFx, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightActionBuffFx, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightActionBuffFx;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightActionBuffFx;
	}
	/**
	*战斗hp变化
	*/
	class PBFightActionHP {
		constructor();
		/** 源 unit id*/
		public src:number;
		/** 目标 unit id*/
		public dst:number;
		/** 相关技能的index*/
		public skillindex:number;
		/** DoingType_Skill 或者 DoingType_Buff*/
		public reason:number;
		/** 变化之后的hp*/
		public hp:Long;
		/** hp变化值,负掉血，正回血*/
		public hpchanged:Long;
		/** 是否暴击*/
		public critical:boolean;
		/** 是否有种族克制加成*/
		public race:boolean;
		public static encode(message: Pb_God.PBFightActionHP, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightActionHP, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightActionHP;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightActionHP;
	}
	/**
	*战斗buff变化
	*/
	class PBFightActionBuff {
		constructor();
		/** 源 unit id*/
		public src:number;
		/** 目标 unit id*/
		public dst:number;
		/** 相关技能的index,一直是加buff的skill*/
		public skillindex:number;
		/** 是否是加buff，否则是减buff*/
		public add:boolean;
		/** buff id*/
		public buffid:number;
		public static encode(message: Pb_God.PBFightActionBuff, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightActionBuff, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightActionBuff;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightActionBuff;
	}
	/**
	*战斗动作
	*/
	class PBFightAction {
		constructor();
		/** 动作类型 _emFightAction*/
		public type:number;
		/** type为FightAction_Skill时有效*/
		public actionskill:Pb_God.PBFightActionSkill;
		/** type为FightAction_Attack时有效*/
		public actionattack:Pb_God.PBFightActionAttack;
		/** type为FightAction_HP时有效*/
		public actionhp:Pb_God.PBFightActionHP;
		/** type为FightAction_Buff时有效*/
		public actionbuff:Pb_God.PBFightActionBuff;
		/** type为FightAction_BuffFx时有效*/
		public actionbufffx:Pb_God.PBFightActionBuffFx;
		public static encode(message: Pb_God.PBFightAction, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightAction, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightAction;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightAction;
	}
	/**
	* 每个单位的行动
	*/
	class PBFightUnitAct {
		constructor();
		/** 行动的单位 unit id (0表示回合触发的buff，神器等)*/
		public id:number;
		/** 动作*/
		public actions:Pb_God.PBFightAction[];
		public static encode(message: Pb_God.PBFightUnitAct, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightUnitAct, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightUnitAct;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightUnitAct;
	}
	/**
	*战斗回合
	*/
	class PBFightRound {
		constructor();
		/** 回合数*/
		public round:number;
		/** 回合开始时的状态*/
		public states:Pb_God.PBFightUnitState[];
		/** 单位行动*/
		public unitacts:Pb_God.PBFightUnitAct[];
		public static encode(message: Pb_God.PBFightRound, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightRound, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightRound;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightRound;
	}
	/**
	*战斗回放
	*/
	class PBFightPlayback {
		constructor();
		/**战斗回合*/
		public rounds:Pb_God.PBFightRound[];
		public static encode(message: Pb_God.PBFightPlayback, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightPlayback, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightPlayback;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightPlayback;
	}
	/**
	* 战斗基础公用
	*/
	class PBFightBase {
		constructor();
		/**流水ID*/
		public battlesn:Long;
		/**战斗类型_emBattleType*/
		public battletype:number;
		/**挑战ID*/
		public id:number;
		/**参数*/
		public param:number;
		/**随机种子*/
		public randid:number;
		/**开始时间*/
		public begintime:number;
		/**最大回合*/
		public maxround:number;
		/**伙伴*/
		public friend:Pb_God.PBPlayerBattleInfo;
		/**敌方*/
		public energy:Pb_God.PBPlayerBattleInfo;
		/**战斗回放*/
		public playback:Pb_God.PBFightPlayback;
		/**同一对手的第几次战斗*/
		public num:number;
		/**客户端参数*/
		public clientparam:string;
		/**服务器参数*/
		public serverparam:number[];
		public static encode(message: Pb_God.PBFightBase, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightBase, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightBase;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightBase;
	}
	/**
	* 副本pve战斗结果返回
	*/
	class PBFightResult {
		constructor();
		/**战斗公共*/
		public base:Pb_God.PBFightBase;
		/**回合数*/
		public round:number;
		/**战斗结果 _emBattleResult*/
		public result:number;
		/**战斗结束时间*/
		public endtime:number;
		/**友方状态*/
		public friendstate:Pb_God.PBPetFightStateInfo[];
		/**敌方状态*/
		public energystate:Pb_God.PBPetFightStateInfo[];
		/**战斗奖励*/
		public prize:Pb_God.PBItemInfo[];
		/**成就数据(服务器用)*/
		public achieve:Pb_God.PBU32U32[];
		/**竞技场战斗结果*/
		public challengeresult:Pb_God.PBFightChallengeResult;
		/**超凡段位赛结果*/
		public danresult:Pb_God.PBFightDanResult;
		/**跨服天梯结果*/
		public ladderresult:Pb_God.PBFightLadderResult;
		/**我发神器状态*/
		public friendartifactstate:Pb_God.PBPetFightStateInfo;
		/**敌方神器状态*/
		public enemyartifactstate:Pb_God.PBPetFightStateInfo;
		/**天界副本结果*/
		public heavenresult:Pb_God.PBFightHeavenResult;
		/**跨服竞技场战斗结果*/
		public crosschallengeresult:Pb_God.PBFightCrossChallengeResult;
		public static encode(message: Pb_God.PBFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightResult;
	}
	/**
	* 系统录像详细
	*/
	class PBVideoDetail {
		constructor();
		/**战斗详情*/
		public detail:Pb_God.PBFightResult;
		/**点赞次数*/
		public likecount:number;
		/**播放次数*/
		public playcount:number;
		/**分享次数*/
		public sharecount:number;
		/**掩码*/
		public mark:number;
		public static encode(message: Pb_God.PBVideoDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBVideoDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBVideoDetail;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBVideoDetail;
	}
	/**
	* 系统录像
	*/
	class PBWorldSystemVideo {
		constructor();
		/**类型_emVideoType*/
		public videotype:number;
		/**参数*/
		public param:number;
		/**录像详细*/
		public info:Pb_God.PBVideoDetail[];
		/** index*/
		public index:number;
		public static encode(message: Pb_God.PBWorldSystemVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldSystemVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldSystemVideo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldSystemVideo;
	}
	/**
	* 关卡录像详细
	*/
	class PBVideoStageDetail {
		constructor();
		/**最快战斗详情*/
		public fast:Pb_God.PBFightResult;
		/**最低战力战斗详情*/
		public fightpower:Pb_God.PBFightResult;
		/**最近战斗详情*/
		public lately:Pb_God.PBFightResult;
		public static encode(message: Pb_God.PBVideoStageDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBVideoStageDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBVideoStageDetail;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBVideoStageDetail;
	}
	/**
	* 关卡录像
	*/
	class PBWorldStageVideo {
		constructor();
		/**类型_emVideoType*/
		public videotype:number;
		/**参数*/
		public param:number;
		/** 录像详细*/
		public info:Pb_God.PBVideoStageDetail;
		/**index*/
		public index:number;
		public static encode(message: Pb_God.PBWorldStageVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldStageVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldStageVideo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldStageVideo;
	}
	/**
	* 关卡录像存库
	*/
	class PBWorldStageVideoSave {
		constructor();
		/**录像详细*/
		public info:Pb_God.PBWorldStageVideo[];
		public static encode(message: Pb_God.PBWorldStageVideoSave, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldStageVideoSave, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldStageVideoSave;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldStageVideoSave;
	}
	/**
	*切磋请求
	*/
	class PBFightEachOther {
		constructor();
		/** 切磋发起人worldid*/
		public srcworldid:number;
		/** 切磋发起人playerid*/
		public srcplayerid:number;
		/** 切磋目标 worldid*/
		public dstworldid:number;
		/** 切磋目标 playerid*/
		public dstplayerid:number;
		/** 战斗数据*/
		public fight:Pb_God.PBFightBase;
		public static encode(message: Pb_God.PBFightEachOther, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFightEachOther, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFightEachOther;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFightEachOther;
	}
	/**
	*查询玩家录像记录返回
	*/
	class PBG2CVideoPlayerRecordAck {
		constructor();
		/**战斗类型*/
		public battletype:number;
		/**战斗详情*/
		public detail:Pb_God.PBFightResult[];
		/**index*/
		public index:number;
		public static encode(message: Pb_God.PBG2CVideoPlayerRecordAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CVideoPlayerRecordAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CVideoPlayerRecordAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CVideoPlayerRecordAck;
	}
	/**
	* 跨服录像
	*/
	class PBBWVideoData {
		constructor();
		/**group id*/
		public groupid:number;
		/**录像*/
		public videos:Pb_God.PBFightResult[];
		public static encode(message: Pb_God.PBBWVideoData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBWVideoData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBWVideoData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBWVideoData;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 家圆相关
	*/
	enum _emResultRoom_39 {
		//	成功;
		R_ResultRoom_success = 0,
		//	失败;
		R_ResultRoom_fail = 1,
	}
	/**
	*----客户端到服务器
	*/
	enum _emC2S_Room_Protocol {
		//放置家具 PBPlaceFurniture;
		C2S_Room_placeFurniture = 1,
		//增加家具 PBU32;
		C2S_Room_addFurniture = 2,
		//拜访 PBU32;
		C2S_Room_callOnRoom = 3,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_Room_Protocol {
		//增加、放置家具,拜访返回 PBFurnitureInfo;
		S2C_Room_placeFurnitureInfo = 1,
	}
	/**
	*放置家具
	*/
	class PBPlaceFurniture {
		constructor();
		/** true:放置 2:false收回*/
		public isPlace:boolean;
		/**当前房屋主人*/
		public owner:number;
		/**唯一id*/
		public id:number;
		/**位置*/
		public position:number;
		public static encode(message: Pb_God.PBPlaceFurniture, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlaceFurniture, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlaceFurniture;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlaceFurniture;
	}
	/**
	*家具信息
	*/
	class PBFurnitureInfo {
		constructor();
		/**当前房屋主人*/
		public owner:number;
		/**家具信息*/
		public furnitureData:Pb_God.PBFurniture[];
		/**是否全更新 true:：全更新  fale:增量更新*/
		public updateAll:boolean;
		public static encode(message: Pb_God.PBFurnitureInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFurnitureInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFurnitureInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFurnitureInfo;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 订单相关
	*/
	enum _emResultOrder_54 {
		//  成功;
		R_ResultOrder_Succeed = 0,
		//  失败;
		R_ResultOrder_Fail = 1,
		//  地址数量已满;
		R_ResultOrder_Full = 2,
		//  地址不存在;
		R_ResultOrder_AddrNotFind = 3,
		//  订单不存在;
		R_ResultOrder_OrderNotFind = 4,
		//  订单重复确认;
		R_ResultOrder_OrderIsCompleted = 5,
	}
	/**
	*--- 客户端到服务器
	*/
	enum _emC2S_Order_Protocol {
		//请求地址  无内容;
		C2S_Order_AddrData = 1,
		//增加地址	PBAddrInfo;
		C2S_Order_NewAddr = 2,
		//修改地址	PBAddrInfo;
		C2S_Order_ChangeAddr = 3,
		//请求订单信息，参数订单类型 PBU32 ;
		C2S_Order_OrderData = 4,
		//确认订单地址  PBC2SOrderInfo;
		C2S_Order_Completed = 5,
		//设置默认参数 参数地址id  PBU32;
		C2S_Order_SetDefault = 6,
		//删除地址	PBU32;
		C2S_Order_DeleteAddr = 7,
		//获取最新订单信息 无内容;
		C2S_Order_GetNewOrder = 8,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_Order_Protocol {
		//失败才返回;
		S2C_Order_Common_Ack = 0,
		//返回地址数据 PBAddrData;
		S2C_Order_AddrData = 1,
		//返回订单数据 PBOrderData;
		S2C_Order_OrderData = 2,
		//返回最新的订单信息 PBOrderInfo;
		S2C_Order_OneNewOrder = 3,
	}
	/**
	* 地址数据
	*/
	class PBAddrData {
		constructor();
		/**地址数据*/
		public addrinfo:Pb_God.PBAddrInfo[];
		/**默认地址id*/
		public defaultid:number;
		public static encode(message: Pb_God.PBAddrData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBAddrData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBAddrData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBAddrData;
	}
	/**
	* 订单数据
	*/
	class PBOrderData {
		constructor();
		/**订单数据*/
		public orderinfo:Pb_God.PBOrderInfo[];
		public static encode(message: Pb_God.PBOrderData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBOrderData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBOrderData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBOrderData;
	}
	/**
	* 订单操作数据数据
	*/
	class PBC2SOrderInfo {
		constructor();
		/**游戏订单流水*/
		public ordersn:string;
		/**订单类型 _emOrderType*/
		public type:number;
		/**地址id */
		public addrID:number;
		public static encode(message: Pb_God.PBC2SOrderInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2SOrderInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2SOrderInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2SOrderInfo;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 好友相关
	*/
	enum _emResultFriend_22 {
		//  成功;
		R_ResultFriend_Succeed = 0,
		//  失败;
		R_ResultFriend_Fail = 1,
		//  对方好友数量达到上限;
		R_ResultFriend_TarMaxCount = 2,
		//  好友数量达到上限;
		R_ResultFriend_SelfMaxCount = 3,
		//  今天赠送友情点已达到上限;
		R_ResultFriend_MaxSendCount = 4,
		//  已经在好友列表中;
		R_ResultFriend_IsInFriend = 5,
		//  已经在黑名单中;
		R_ResultFriend_IsInBlack = 6,
		//  已经在申请列表中;
		R_ResultFriend_IsInApply = 7,
		//  好友最大申请上限;
		R_ResultFriend_MaxApplyCount = 8,
		//  好友最大黑名单上限;
		R_ResultFriend_MaxBlackCount = 9,
		// 不在申请列表中;
		R_ResultFriend_NoInApply = 10,
		// 玩家不在线;
		R_ResultFriend_NoOnline = 11,
		// 对方不是好友;
		R_ResultFriend_NotFriend = 12,
		// 该好友未送礼物;
		R_ResultFriend_NoSendPrize = 13,
		// 已经领取所有礼物;
		R_ResultFriend_NoRecievePrize = 14,
		// 超过最大支援个数;
		R_ResultFriend_SupportCount = 15,
		// 支援英雄不存在;
		R_ResultFriend_SupportNotExist = 16,
		// 不能加自己;
		R_ResultFriend_AddSelf = 17,
		// 已经雇佣了该支援;
		R_ResultFriend_AlreadySupport = 18,
		// 雇佣英雄超过最大战力范围;
		R_ResultFriend_SupportPower = 19,
		// 不能解雇;
		R_ResultFriend_CantFire = 20,
		// 不能重复上场;
		R_ResultFriend_CantUseAgain = 21,
	}
	/**
	*----好友模块
	*/
	enum _emC2S_Friend_Protocol {
		// 	 请求加好友		PBU32;
		C2S_Friend_RequestAddFriend = 1,
		// 	 同意加好友		PBU32;
		C2S_Friend_AgreeAddFriend = 2,
		// 	 删除好友			PBU32;
		C2S_Friend_DelFriend = 3,
		// 	 移除申请			PBU32;
		C2S_Friend_DelApply = 4,
		// 	 增加黑名单		PBU32;
		C2S_Friend_AddBlack = 5,
		// 	 移除黑名单		PBU32;
		C2S_Friend_DelBlack = 6,
		// 	 赠送礼物			PBU32;
		C2S_Friend_SendPrize = 7,
		// 	 一键赠送礼物	;
		C2S_Friend_AutoSendPrize = 8,
		// 	 领取礼物			PBU32;
		C2S_Friend_RecievePrize = 9,
		// 	 一键领取礼物	;
		C2S_Friend_AutoRecievePrize = 10,
		// 	 刷新推荐好友		;
		C2S_Friend_Refresh = 11,
		//  派遣支援银熊	PBPlayerSendSupportHero;
		C2S_Friend_SendSupport = 12,
		//	 根据名字搜索		PBString;
		C2S_Friend_Search = 13,
		//	 雇佣支援 		PBFriendHireSupport;
		C2S_Friend_HireSupport = 14,
		//	 解雇支援			PBFriendHireSupport;
		C2S_Friend_FireSupport = 15,
		// 	 同步好友信息		PBG2WFriendIDSyn;
		C2S_Friend_SynFriend = 20,
		// 	 真正添加黑名单	PBU32;
		C2S_Friend_RealAddBlack = 21,
		//	 同步支援信息	;
		C2S_Friend_SyncSupport = 22,
		//	 支援被使用;
		C2S_Friend_UseSupport = 23,
		//   支援使用回退;
		C2S_Friend_UnuseSupport = 24,
	}
	/**
	*----好友模块
	*/
	enum _emS2C_Friend_Protocol {
		//	 通用失败返回;
		S2C_Friend_CommonAck = 0,
		//	 好友申请			PBPlayerFriendInfo;
		S2C_Friend_AddApply = 1,
		//	 删除申请			PBU32;
		S2C_Friend_DelApply = 2,
		// 	 加好友			PBPlayerFriendInfo;
		S2C_Friend_AddFriend = 3,
		// 	 删好友			PBU32;
		S2C_Friend_DelFriend = 4,
		// 	 增加黑名单		PBPlayerFriendInfo;
		S2C_Friend_AddBalck = 5,
		// 	 移除黑名单		PBU32;
		S2C_Friend_DelBalck = 6,
		// 	 增加领取礼物		PBU32;
		S2C_Friend_RecievePrize = 7,
		// 	 删除领取礼物		PBG2CFriendPrize;
		S2C_Friend_DelRecievePrize = 8,
		// 	 赠送礼物			PBG2CFriendPrize;
		S2C_Friend_SendPrize = 9,
		// 	 同步好友信息		PBG2CFriendSyn;
		S2C_Friend_SynFriend = 10,
		// 	 同步好友上线		PBPlayerFriendInfo;
		S2C_Friend_Online = 11,
		// 	 同步好友下线		PBPlayerFriendInfo;
		S2C_Friend_Offline = 12,
		// 	 推荐好友			PBG2CFriendRefresh;
		S2C_Friend_Refresh = 13,
		// 	 同步支援信息		PBW2GFriendSupportSync;
		S2C_Friend_SyncSupport = 14,
		//	 派遣支援返回		PBPlayerSendSupportHero;
		S2C_Friend_SendSupport = 15,
		//	 搜索返回			PBG2CFriendRefresh;
		S2C_Friend_Search = 16,
		//	 雇佣支援返回		PBFriendHireSupport;
		S2C_Friend_HireSupport = 17,
		//	 解雇支援返回		PBFriendHireSupport;
		S2C_Friend_FireSupport = 18,
		//	 同步已使用支援	PBG2CFriendUsedSupportSync;
		S2C_Friend_SyncUsedSupport = 19,
	}
	/**
	* 同步好友信息
	*/
	class PBG2WFriendIDSyn {
		constructor();
		/** 好友ID*/
		public playerid:number[];
		/** 黑名单*/
		public blackid:number[];
		public static encode(message: Pb_God.PBG2WFriendIDSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2WFriendIDSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2WFriendIDSyn;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2WFriendIDSyn;
	}
	/**
	* 同步好友信息
	*/
	class PBG2CFriendPrize {
		constructor();
		/** 好友显示*/
		public playerid:number;
		/** 奖励道具*/
		public item:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBG2CFriendPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFriendPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFriendPrize;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFriendPrize;
	}
	/**
	* 同步好友信息
	*/
	class PBG2CFriendRefresh {
		constructor();
		/** 好友*/
		public info:Pb_God.PBPlayerFriendInfo[];
		public static encode(message: Pb_God.PBG2CFriendRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFriendRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFriendRefresh;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFriendRefresh;
	}
	/**
	* 同步好友信息
	*/
	class PBG2CFriendSyn {
		constructor();
		/** 好友*/
		public info:Pb_God.PBPlayerFriendInfo[];
		public static encode(message: Pb_God.PBG2CFriendSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFriendSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFriendSyn;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFriendSyn;
	}
	/**
	* 同步好友信息
	*/
	class PBG2CFriendID {
		constructor();
		/** 好友ID*/
		public playerid:number[];
		public static encode(message: Pb_God.PBG2CFriendID, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFriendID, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFriendID;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFriendID;
	}
	/**
	* 派遣支援信息
	*/
	class PBPlayerSendSupportHero {
		constructor();
		/** _emFriendSupportType*/
		public type:number;
		/** 支援英雄sn*/
		public petsn:Long;
		public static encode(message: Pb_God.PBPlayerSendSupportHero, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerSendSupportHero, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerSendSupportHero;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerSendSupportHero;
	}
	/**
	* 同步支援信息
	*/
	class PBG2WSupportSync {
		constructor();
		/** 支援英雄*/
		public support:Pb_God.PBPlayerSupportHero[];
		/** 是否返回所有好友支援信息*/
		public syncback:boolean;
		public static encode(message: Pb_God.PBG2WSupportSync, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2WSupportSync, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2WSupportSync;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2WSupportSync;
	}
	/**
	* 好友支援信息
	*/
	class PBW2GFriendSupport {
		constructor();
		/** 好友id*/
		public id:number;
		/** 支援英雄*/
		public support:Pb_God.PBPlayerSupportHero[];
		public static encode(message: Pb_God.PBW2GFriendSupport, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2GFriendSupport, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2GFriendSupport;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2GFriendSupport;
	}
	/**
	* 同步好友支援信息
	*/
	class PBW2GFriendSupportSync {
		constructor();
		/** 好友支援*/
		public support:Pb_God.PBW2GFriendSupport[];
		public static encode(message: Pb_God.PBW2GFriendSupportSync, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2GFriendSupportSync, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2GFriendSupportSync;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2GFriendSupportSync;
	}
	/**
	* 同步已经使用的英雄
	*/
	class PBG2CFriendUsedSupportSync {
		constructor();
		/** used*/
		public used:Pb_God.PBFriendSupport[];
		public static encode(message: Pb_God.PBG2CFriendUsedSupportSync, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFriendUsedSupportSync, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFriendUsedSupportSync;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFriendUsedSupportSync;
	}
	/**
	* 雇佣/解雇支援
	*/
	class PBFriendHireSupport {
		constructor();
		/**类型*/
		public type:number;
		/**好友id*/
		public friendid:number;
		/**pet sn*/
		public sn:Long;
		public static encode(message: Pb_God.PBFriendHireSupport, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFriendHireSupport, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFriendHireSupport;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFriendHireSupport;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 任务相关
	*/
	enum _emResultTask_6 {
		//  成功;
		R_ResultTask_Succeed = 0,
		//  失败;
		R_ResultTask_Fail = 1,
		//  任务没有完成;
		R_ResultTask_NoComplete = 2,
	}
	/**
	*----任务客户端请求
	*/
	enum _emC2S_Task_Protocol {
		// 	 完成任务			PBC2GTaskCompleteAsk;
		C2S_Task_Complete = 0,
	}
	/**
	*----任务服务器返回
	*/
	enum _emS2C_Task_Protocol {
		// 	 完成任务返回		失败才返回;
		S2C_Task_CompleteAck = 0,
		//	 新增任务			PBG2CTaskUpdate;
		S2C_Task_Add = 1,
		//	 更新任务参数		PBG2CTaskUpdate;
		S2C_Task_Syn = 2,
	}
	/**
	* 完成任务请求
	*/
	class PBC2GTaskCompleteAsk {
		constructor();
		/**任务ID*/
		public taskid:number;
		public static encode(message: Pb_God.PBC2GTaskCompleteAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GTaskCompleteAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GTaskCompleteAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GTaskCompleteAsk;
	}
	/**
	* 任务同步
	*/
	class PBG2CTaskUpdate {
		constructor();
		/**任务ID*/
		public taskid:number;
		/**当前完成参数*/
		public param:number;
		public static encode(message: Pb_God.PBG2CTaskUpdate, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTaskUpdate, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTaskUpdate;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTaskUpdate;
	}
}
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

declare namespace Pb_God {
	/**
	*#############################################################
	*/
	enum _emConstantType {
		//	游戏配置	_emConstant_Game;
		Constant_Game = 0,
		//	队伍配置	_emConstant_Team;
		Constant_Team = 1,
		//	挂机配置	_emConstant_Hook;
		Constant_Hook = 2,
		//	帮派配置	_emConstant_Faction;
		Constant_Faction = 3,
		//	好友配置	_emConstant_Friend;
		Constant_Friend = 4,
		//	道具配置	_emConstant_Item;
		Constant_Item = 5,
		//	冒险配置	_emConstant_Risk;
		Constant_Risk = 6,
		//	返利配置	_emConstant_Fanli;
		Constant_Fanli = 7,
	}
	/**
	*#############################################################
	*/
	enum _emConstant_Game {
		//	最大开放等级;
		C_Game_MaxLevel = 1,
		//	断线重连时长秒;
		C_Game_ReconnetTime = 2,
		//	装备背包的格子数;
		C_Game_EquipBagSpace = 3,
		//	邮件失效天数;
		C_Game_MailExpireDay = 4,
		//	最大邮件数量;
		C_Game_MaxMailCount = 5,
		//	默认伙伴空间个数;
		C_Game_DefaultPetSpace = 6,
		//	远航每日免费刷新次数;
		C_Game_SailDayFreeCount = 7,
		//	英雄商店重置消耗;
		C_Game_PetShopResetExpend = 9,
		//	试练塔每日免费次数;
		C_Game_TrainTowerDayFreeCount = 10,
		//	神殿冷却时间;
		C_Game_TempleCoolTime = 11,
		//	神殿挑战记录最大条数;
		C_Game_TempleMaxRecordCount = 12,
		//	元素神殿免费次数;
		C_Game_ElementFreeCount = 13,
		//	元素神殿购买次数;
		C_Game_ElementBuyCount = 14,
		//	跨服需要世界等级;
		C_Game_BigworldNeedWorldLevel = 15,
		//	录像最大条数;
		C_Game_VideoMaxCount = 16,
		//	录像点赞次数;
		C_Game_VideoMaxLikeCount = 17,
		//	录像点赞奖励金币;
		C_Game_VideoMaxLikePrizeGold = 18,
		//	每日最大活跃度;
		C_Game_MaxDailyLiveness = 19,
		//	装备一键合成开启等级;
		C_Game_EquipCompoundNeedLevel = 20,
		//	七日目标最大活跃度;
		C_Game_MaxActivityLiveness = 21,
		//	改名需要的钻石;
		C_Game_RenameNeedDiamond = 22,
		//	最大邀请个数;
		C_Game_MaxInviteCount = 23,
		//	星石开启成就;
		C_Game_RuneUnlockAchieve = 24,
		//	神装开启成就;
		C_Game_GodEquipUnLockAchieve = 25,
		//	英雄重生等级限制;
		C_Game_RebornLevel = 26,
		//	每天重生次数;
		C_Game_RebornCount = 27,
		//	每周最大活跃度;
		C_Game_MaxWeeklyLiveness = 28,
		//	成就版本标记;
		C_Game_AchieveVersionMark = 29,
		//	开关版本标记;
		C_Game_SwitchVersionMark = 30,
		//	pvp录像保存条数;
		C_Game_VideoPvpMaxCount = 31,
		//	精灵补偿版本标记;
		C_Game_CompensatePetVersion = 32,
		// 	资源找回最小天数;
		C_Game_FindBackOfflineDay = 33,
		//	最大找回天数;
		C_Game_FindBackMaxDay = 34,
	}
	/**
	*#############################################################
	*/
	enum _emConstant_Team {
		//	最大成员人数;
		C_Team_MaxTeamMember = 1,
		//	最大队伍列表;
		C_Team_MaxTeamList = 2,
		//	自动开启时间;
		C_Team_AutoStartTime = 3,
	}
	/**
	*#############################################################
	*/
	enum _emConstant_Hook {
		//	挂机最大收益时间;
		C_Hook_MaxProfitTime = 1,
		//	每日免费快速作战次数;
		C_Hook_DayFreeSweepCount = 2,
		//	每日购买快速作战次数;
		C_Hook_DayBuySweepCount = 3,
		//	快速作战收益时间;
		C_Hook_SweepProfitTime = 4,
	}
	/**
	*#############################################################
	*/
	enum _emConstant_Faction {
		//	创建需要的钻石;
		C_Faction_CreateNeedDiamond = 1,
		//	副本加成技能最大等级;
		C_Faction_CopymapSkillMaxLevel = 2,
		//	副本加成技能需要钻石;
		C_Faction_CopymapSkillNeedDiamond = 3,
		//	副本加成技能初始时长秒;
		C_Faction_CopymapSkillFirstTime = 4,
		//	副本加成技能每级时长秒;
		C_Faction_CopymapSkillPerTime = 5,
		//	副本每日免费次数;
		C_Faction_CopymapFreeCount = 6,
		//	副本加成被动技能ID;
		C_Faction_CopymapSkillID = 7,
		//	副本增幅令ID;
		C_Faction_CopymapSkillUseItem = 8,
		//	成员不活跃离线天数;
		C_Faction_MemberNoActiveOfflineDays = 9,
		//	重命名需要钻石;
		C_Faction_RenameNeedDiamond = 10,
		//	重命名冷却时间小时;
		C_Faction_RenameCoolTime = 11,
		//	招募日次数;
		C_Faction_RecruitDayCount = 12,
		//	招募冷却时间分钟;
		C_Faction_RecruitCoolTime = 13,
		//	招募需要钻石;
		C_Faction_RecruitNeedDiamond = 14,
		//	副本集结冷却时间分钟;
		C_Faction_CopymapNoticeCoolTime = 15,
		//	离开公会冷却时间小时;
		C_Faction_LeaveCoolTime = 16,
		//	最大公会日志条数;
		C_Faction_MaxEventCount = 17,
		//	公会消耗;
		C_Faction_ImpeachCustom = 18,
	}
	/**
	*#############################################################
	*/
	enum _emConstant_Friend {
		//	好友最大个数;
		C_Friend_MaxFriendCount = 1,
		//	申请列表最大个数;
		C_Friend_MaxApplyCount = 2,
		//	黑名单最大个数;
		C_Friend_MaxBlackCount = 3,
		//	赠送最大送礼物个数;
		C_Friend_MaxSendPrizeCount = 4,
		//	推荐好友个数;
		C_Friend_MaxRefreshCount = 5,
	}
	/**
	*#############################################################
	*/
	enum _emConstant_Item {
		//	符文熔炼需要积分;
		C_Item_RuneExchangeScore = 1,
		//	符文熔炼道具ID;
		C_Item_RuneExchangeItem = 2,
	}
	/**
	*#############################################################
	*/
	enum _emConstant_Risk {
		//	重置间隔天数;
		C_Risk_ResetStepDay = 1,
		//	重置减去层数;
		C_Risk_ResetDelStage = 2,
		//	组随机最小个数;
		C_Risk_GroupMinRand = 3,
		//	组随机最大个数;
		C_Risk_GroupMaxRand = 4,
		//	最大格子数;
		C_Risk_MaxGridCount = 5,
		//	生命药剂使用最大个数;
		C_Risk_MaxUseHpDrup = 6,
		//	驱魂药剂使用最大个数;
		C_Risk_MaxUseKillDrup = 7,
		//	默认给的生命药剂数量;
		C_Risk_InitHpDrupCount = 8,
	}
	/**
	*返利配置
	*/
	enum _emConstant_Fanli {
		//	返利比率;
		C_Fanli_Percent = 1,
		//	最低金额;
		C_Fanli_LowMoney = 2,
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 角色数据类型
	*/
	enum _emPlayerType {
		//帐号信息;
		_PInfo_Account = 0,
		//基本信息;
		_PInfo_Base = 1,
		//系统信息;
		_PInfo_System = 2,
		//扩展 系统信息;
		_PInfo_System2 = 3,
		//包裹;
		_PInfo_Bag = 4,
		//扩展 包裹;
		_PInfo_Bag2 = 5,
		//前端数据;
		_PInfo_Client = 6,
		//伙伴信息;
		_PInfo_Pet = 7,
		//扩展 伙伴信息;
		_PInfo_Pet2 = 8,
		//邮件数据;
		_PInfo_Mail = 9,
		//好友数据;
		_PInfo_Friend = 10,
		//帮会数据 //最后一个;
		_PInfo_Faction = 11,
		//全局数据;
		_PInfo_Global = 12,
		//伙伴信息3	;
		_PInfo_Pet3 = 13,
	}
	/**
	*------------------------------ 帐号标示
	*/
	enum _emAccountMark {
		//新帐号;
		AccountMask_New = 0,
		//是否成年人;
		AccountMark_Adult = 1,
		//是否身份验证;
		AccountMark_Card = 2,
		//是否内部账号;
		AccountMark_Inner = 3,
	}
	/**
	*------------------------------ 游戏系统类型
	*/
	enum _emGameSystemType {
		//通用功能;
		GameSystemType_Common = 0,
		//伙伴功能;
		GameSystemType_Pet = 1,
		//副本功能;
		GameSystemType_Copymap = 2,
		//道具功能;
		GameSystemType_Item = 3,
		//战斗功能;
		GameSystemType_Fight = 4,
		//任务功能;
		GameSystemType_Task = 5,
		//邮件功能;
		GameSystemType_Mail = 6,
		//排行榜功能;
		GameSystemType_TopList = 7,
		//组队功能;
		GameSystemType_Team = 8,
		//竞技场;
		GameSystemType_Challenge = 9,
		//帮会;
		GameSystemType_Faction = 10,
		//召唤;
		GameSystemType_Call = 11,
		//远航;
		GameSystemType_Sail = 12,
		//挂机;
		GameSystemType_Hook = 13,
		//神器;
		GameSystemType_Artifact = 14,
		//商店;
		GameSystemType_Shop = 15,
		//试炼;
		GameSystemType_Train = 16,
		//成就;
		GameSystemType_Achieve = 17,
		//远征;
		GameSystemType_Expedition = 18,
		//外形;
		GameSystemType_Shape = 19,
		//神殿;
		GameSystemType_Temple = 20,
		//好友;
		GameSystemType_Friend = 21,
		//元素;
		GameSystemType_Element = 22,
		//冒险;
		GameSystemType_Risk = 23,
		//系统开启;
		GameSystemType_Switch = 24,
		//超凡段位赛;
		GameSystemType_Dan = 25,
		//跨服天梯;
		GameSystemType_Ladder = 26,
		//冠军赛;
		GameSystemType_Champion = 27,
		//圣物;
		GameSystemType_Holy = 28,
		//录像;
		GameSystemType_Video = 29,
		//特权;
		GameSystemType_Privilege = 30,
		//福利;
		GameSystemType_Weal = 31,
		//活动;
		GameSystemType_Activity = 32,
		//平台;
		GameSystemType_Platform = 33,
		//聊天;
		GameSystemType_Talk = 34,
		//探宝;
		GameSystemType_Treasure = 35,
		//天界副本;
		GameSystemType_HeavenDungeon = 36,
		//跨服竞技场;
		GameSystemType_CrossChallenge = 37,
		//家圓功能;
		GameSystemType_Room = 38,
		//晶碑;
		GameSystemType_Tablet = 39,
		//精灵系统;
		GameSystemType_ElfTree = 40,
		//周冠军赛;
		GameSystemType_WeekChampion = 41,
		//组队征战;
		GameSystemType_TeamCampaign = 42,
		//龙珠;
		GameSystemType_DragonBall = 43,
		//契约;
		GameSystemType_Convenant = 44,
		//抽奖		;
		GameSystemType_Lottery = 45,
		//图鉴收集;
		GameSystemType_Illustration = 46,
		//红包;
		GameSystemType_RedEnvelope = 47,
		//连连看;
		GameSystemType_JoyousLinkup = 48,
		//猜猜猜;
		GameSystemType_Guess = 49,
		//守护;
		GameSystemType_Defend = 50,
		//共鸣;
		GameSystemType_Resonance = 51,
		//孵化蛋;
		GameSystemType_IncubateEgg = 52,
		//活动boss;
		GameSystemType_ActivityBoss = 53,
		//订单管理;
		GameSystemType_PlayerOrder = 54,
	}
	/**
	*------------------------------ 游戏对像类型
	*/
	enum _em_GameUnitType {
		//非法空对像;
		GameObject_None = 0,
		//伙伴对像;
		GameObject_Pet = 1,
		//怪物对像;
		GameObject_Monster = 2,
		//神器对像;
		GameObject_Artifact = 3,
		//神树对像;
		GameObject_ElfTree = 4,
		//上帝对像;
		GameObject_God = 5,
		//守护对像;
		GameObject_Defend = 6,
	}
	/**
	*------------------------------ 战斗属性
	*/
	enum _emBattleAttribute {
		//攻击;
		BattleAttribute_Attack = 1,
		//最大生命;
		BattleAttribute_HPMax = 2,
		//防御;
		BattleAttribute_Defense = 3,
		//速度;
		BattleAttribute_Speed = 4,
		//暴击率;
		BattleAttribute_CriticalAddRate = 5,
		//暴伤;
		BattleAttribute_CriticalAdd = 6,
		//抗暴;
		BattleAttribute_CriticalDelRate = 7,
		//控制;
		BattleAttribute_ControlAdd = 8,
		//抗控;
		BattleAttribute_ControlDel = 9,
		//伤害加成;
		BattleAttribute_DamageAdd = 10,
		//免伤;
		BattleAttribute_DamageDel = 11,
		//命中;
		BattleAttribute_Hit = 12,
		//闪避;
		BattleAttribute_Dodge = 13,
		//治疗加成;
		BattleAttribute_CureAdd = 14,
		//被治疗加成;
		BattleAttribute_BeCureAdd = 15,
		//物伤;
		BattleAttribute_PhysicsAdd = 16,
		//法伤;
		BattleAttribute_MagicAdd = 17,
		//物免;
		BattleAttribute_PhysicsDel = 18,
		//法免;
		BattleAttribute_MagicDel = 19,
		//对坦克伤害加成 _emPetJobType;
		BattleAttribute_TankeAdd = 20,
		//对战士伤害加成;
		BattleAttribute_ZhanshiAdd = 21,
		//对法师伤害加成;
		BattleAttribute_FashiAdd = 22,
		//对辅助伤害加成;
		BattleAttribute_FuzhuAdd = 23,
		//对坦克伤害减免;
		BattleAttribute_TankeDel = 24,
		//对战士伤害减免;
		BattleAttribute_ZhanshiDel = 25,
		//对法师伤害减免;
		BattleAttribute_FashiDel = 26,
		//对辅助伤害减免;
		BattleAttribute_FuzhuDel = 27,
	}
	/**
	*------------------------------ 消耗类型
	*/
	enum _emExpendType {
		//金币;
		ExpendType_Gold = 1,
		//钻石;
		ExpendType_Diamond = 2,
		//英雄经验;
		ExpendType_PetExp = 3,
		//友情点;
		ExpendType_FrendShip = 4,
		//召唤积分;
		ExpendType_CallPoint = 5,
		//经验;
		ExpendType_Exp = 6,
		//帮贡;
		ExpendType_FactionContri = 7,
		//远航积分;
		ExpendType_SailPoint = 8,
		//神格积分;
		ExpendType_GodPoint = 9,
		//竞技积分;
		ExpendType_Chanllenge = 10,
		//远征币;
		ExpendType_Expedition = 11,
		//符文熔炼值;
		ExpendType_RuneScore = 12,
		//先知水晶;
		ExpendType_XianzhiPoin = 13,
		//水兑换(曙光之盾);
		ExpendType_WaterExchange = 14,
		//火兑换;
		ExpendType_FireExchange = 15,
		//风兑换;
		ExpendType_WindExchange = 16,
		//天梯积分	;
		ExpendType_Ladder = 17,
		//神器烈阳石头	;
		ExpendType_ArtifactRefine = 18,
		//探宝积分;
		ExpendType_TreasurePoint = 19,
		//探宝幸运值;
		ExpendType_Lucky = 20,
		//高级探宝幸运值;
		ExpendType_AdvanceLucky = 21,
		//兑换活动用道具1;
		ExpendType_ExchangeItem1 = 22,
		//兑换活动用道具2;
		ExpendType_ExchangeItem2 = 23,
		//兑换活动用道具3;
		ExpendType_ExchangeItem3 = 24,
		//兑换活动用道具4;
		ExpendType_ExchangeItem4 = 25,
		//勇者印记;
		ExpendType_BraveEmblem = 26,
		//帮派经验;
		ExpendType_FactionExp = 27,
		//周冠军赛冠军币;
		ExpendType_WeekChampion = 28,
		//组队征战积分;
		ExpendType_TeamCampaign = 29,
		//兑换活动用道具5;
		ExpendType_ExchangeItem5 = 30,
		//活动进阶战令积分;
		ExpendType_WarOrderScore = 31,
		//梦幻积分;
		ExpendType_DreamScore = 32,
		//活动进阶战令积分1;
		ExpendType_WarOrderScore1 = 33,
		//活动进阶战令积分2;
		ExpendType_WarOrderScore2 = 34,
		//对战塔积分;
		ExpandType_TowerScore = 35,
		//大师对战塔积分;
		ExpandType_MasterTowerScore = 36,
		//存库的数据;
		ExpendType_Save = 50,
		//伙伴当前血量;
		ExpendType_PetHp = 51,
		//活跃度;
		ExpendType_Liveness = 52,
		//七日目标活动活跃度;
		ExpendType_ActivityLiveness = 53,
		//充值钻石;
		ExpendType_ChargeDiamond = 54,
		//周活跃度;
		ExpendType_WeekLiveness = 55,
		//战令经验值;
		ExpendType_WarOrderExp = 56,
	}
	/**
	*------------------------------ 性别
	*/
	enum _emGenderType {
		//男性;
		GenderType_Male = 0,
		//女性;
		GenderType_Female = 1,
	}
	/**
	*------------------------------ 操做类型
	*/
	enum _emDoingType {
		//;
		DoingType_Others = 0,
		//  GM;
		DoingType_GM = 1,
		//  道具使用;
		DoingType_Item_Use = 2,
		//  挂机;
		DoingType_Hook = 3,
		//  副本系统;
		DoingType_Copymap = 4,
		//  任务奖励;
		DoingType_Task = 5,
		//  邮件获取;
		DoingType_Mail = 6,
		//  伙伴;
		DoingType_Pet = 7,
		//  buff;
		DoingType_Buff = 8,
		//  技能;
		DoingType_Skill = 9,
		// 伙伴装备;
		DoingType_PetEquip = 10,
		// 装备升阶;
		DoingType_EquipUpgrade = 11,
		// 竞技场;
		DoingType_Challenge = 12,
		// 装备分解;
		DoingType_EquipSplit = 13,
		// 道具合成;
		DoingType_ItemCompound = 14,
		// 宝石镶嵌;
		DoingType_Gem = 15,
		// 帮派;
		DoingType_Faction = 16,
		// 道具出售;
		DoingType_ItemSell = 17,
		// 道具分解;
		DoingType_ItemSplit = 18,
		// 符文重铸;
		DoingType_RuneRefine = 19,
		// 召唤系统;
		DoingType_PetCall = 20,
		// 远航系统;
		DoingType_Sail = 21,
		// 伙伴分解;
		DoingType_PetSplit = 22,
		// 伙伴升星;
		DoingType_PetUpStar = 23,
		// 系统赠送;
		DoingType_SystemGive = 24,
		// 神器系统;
		DoingType_Artifact = 25,
		// 商店系统;
		DoingType_Shop = 26,
		// 试炼系统;
		DoingType_Train = 27,
		// 每日活跃系统;
		DoingType_Liveness = 28,
		// 成就系统;
		DoingType_Achieve = 29,
		// 帮派贡献;
		DoingType_FactionDonate = 30,
		// 帮派副本;
		DoingType_FactionCopymap = 31,
		// 远征系统;
		DoingType_Expedition = 32,
		// 好友系统;
		DoingType_Friend = 33,
		// 元素神殿系统;
		DoingType_Element = 34,
		// 神殿冒险;
		DoingType_Risk = 35,
		// 排行榜;
		DoingType_TopList = 36,
		// 公会战;
		DoingType_FactionWar = 37,
		// 超凡段位赛;
		DoingType_Dan = 38,
		// 跨服天梯;
		DoingType_Ladder = 39,
		// 神装;
		DoingType_GodEquip = 40,
		// 冠军赛;
		DoingType_Champion = 41,
		// 圣物;
		DoingType_Holy = 42,
		// 录像;
		DoingType_Video = 43,
		// 先知召唤系统;
		DoingType_PetCall2 = 44,
		// 帮派重命名;
		DoingType_FactionRename = 45,
		// 挂机boss;
		DoingType_HookBoss = 46,
		// VIP;
		DoingType_VIP = 47,
		// 福利系统;
		DoingType_Weal = 48,
		// 活动;
		DoingType_Activity = 49,
		// 充值;
		DoingType_PlatformCharge = 50,
		// 探宝;
		DoingType_Treasure = 51,
		// 特权;
		DoingType_Privilege = 52,
		// 角色创建;
		DoingType_CreateRole = 53,
		// 角色登陆;
		DoingType_RoleLogin = 54,
		// 角色登出;
		DoingType_RoleLogout = 55,
		//在线数量;
		DoingType_OnlineCount = 57,
		//  天界副本;
		DoingType_HeavenDungeon = 58,
		//  礼包;
		DoingType_ItemBag = 59,
		//  返利;
		DoingType_Fanli = 60,
		//  cdk;
		DoingType_CDK = 61,
		//  点赞;
		DoingType_Like = 62,
		//  跨服竞技场;
		DoingType_CrossChallenge = 63,
		//  帮派副本奖励;
		DoingType_FactionBossAward = 64,
		//  晶碑;
		DoingType_Tablet = 65,
		//  置换英雄;
		DoingType_PetReplace = 66,
		//  回退英雄;
		DoingType_PetDegenerate = 67,
		//  重命名;
		DoingType_Rename = 68,
		//  周冠军赛;
		DoingType_WeekChampion = 69,
		//  七日目标奖励;
		DoingType_SevenDayAward = 70,
		//  组队征战;
		DoingType_TeamCampaign = 71,
		//  邀请奖励;
		DoingType_InvitePrize = 72,
		//  问卷调查;
		DoingType_Survey = 73,
		//  英雄重生;
		DoingType_PetReborn = 74,
		//  购买英雄重生次数;
		DoingType_PetRebornCount = 75,
		//  周活跃;
		DoingType_WeekLiveness = 76,
		//  系统开启奖励;
		DoingType_SystemOpen = 77,
		//  使用vip经验道具;
		DoingType_ItemVIPExp = 78,
		//  战令;
		DoingType_WarOrder = 80,
		//  龙珠;
		DoingType_DragonBall = 81,
		//  通用奖励;
		DoingType_CommonPrize = 82,
		//  契约;
		DoingType_Convenant = 83,
		// 高星重生;
		DoingType_PetHighRebron = 84,
		// 伙伴进化;
		DoingType_PetEvolve = 85,
		// 抽奖	;
		DoingType_Lottery = 86,
		// 图鉴收集;
		DoingType_Illustration = 87,
		// 系统补偿;
		DoingType_SysCompensate = 88,
		// 红包;
		DoingType_RedEnvelope = 89,
		// 资源找回;
		DoingType_ResourceFindBack = 90,
		// 猜猜猜;
		DoingType_Guess = 91,
		//伙伴魂器;
		DoingType_PetHorcrux = 92,
		// 守护;
		DoingType_Defend = 93,
		// 共鸣;
		DoingType_Resonance = 94,
		// 孵化蛋;
		DoingType_IncubateEgg = 95,
		// 宠物j解锁奖励;
		DoingType_UnlockPet = 96,
		// 限时活动boss;
		DoingType_ActivityBoss = 97,
		//  活动开始;
		DoingType_ActivityBase = 10000,
		//  充值累计金额;
		DoingType_ActivityChargeAmount = 10001,
		//  充值累计天数;
		DoingType_ActivityChargeDays = 10002,
		//  升级奖励;
		DoingType_ActivityLeveup = 10003,
		//  计次奖励;
		DoingType_ActivityTimes = 10004,
		//  兑换;
		DoingType_ActivityExchange = 10005,
		//  首充;
		DoingType_ActivityFirstCharge = 10006,
		//  成长基金;
		DoingType_ActivityGrowFund = 10007,
		//  基金;
		DoingType_ActivityFund = 10008,
		//  登录;
		DoingType_ActivityLogin = 10009,
		//  短期礼包;
		DoingType_ActivityShortTermGift = 10010,
		//  目标;
		DoingType_ActivityAchievement = 10011,
		//  冲榜活动;
		DoingType_ActivityRank = 10012,
		//  0元购;
		DoingType_ActivityZeroBuy = 10013,
		//  限购礼包;
		DoingType_ActivityLimitGift = 10014,
		//  周末福利;
		DoingType_ActivityWeekend = 10015,
		//  成就之路;
		DoingType_ActivityAchieveRoad = 10016,
		//  跨服冲榜活动;
		DoingType_ActivityCrossRank = 10017,
		//  春节战令;
		DoingType_ActivityWarOrder = 10018,
		// 周日福蛋;
		DoingType_ActivityLuckyEgg = 10019,
		// 定制礼包;
		DoingType_ActivityCustomGift = 10020,
	}
	/**
	*------------------------------ 平台类型
	*/
	enum _emPlatformType {
		// 	 内网;
		Platform_normal = 1,
		// 	 37安卓;
		Platform_sanqi_android = 2,
		// 	 37ios;
		Platform_sanqi_ios = 3,
		// 	 funjoy;
		Platform_funjoy = 4,
	}
	/**
	*------------------------------ 状态类型
	*/
	enum _emGameStateType {
		//等待前端加载完毕;
		StateType_WaitReady = 0,
		//位面中;
		StateType_InPlane = 1,
		//战斗中;
		StateType_InBattle = 2,
	}
	/**
	*------------------------------ 怪物类型
	*/
	enum _emMonsterType {
		// 	战斗怪;
		MonsterType_Battle = 0,
		// 	npc怪;
		MonsterType_Npc = 1,
	}
	/**
	*------------------------------ 副本类型
	*/
	enum _emCopymapType {
		// 	金币副本;
		CopymapType_Gold = 1,
		// 	经验副本;
		CopymapType_Exp = 2,
		// 	英雄副本;
		CopymapType_Pet = 3,
		// 	神器副本;
		CopymapType_Artifact = 4,
		// 	符文副本;
		CopymapType_Rune = 5,
	}
	/**
	*------------------------------ 副本子类型
	*/
	enum _emCopymapSubType {
		// 	简单;
		CopymapStageType_Jiandan = 1,
		// 	普通;
		CopymapStageType_Putong = 2,
		// 	困难;
		CopymapStageType_Kunnan = 3,
		// 	噩梦1;
		CopymapStageType_Emeng1 = 4,
		// 	噩梦2;
		CopymapStageType_Emeng2 = 5,
		// 	地狱1;
		CopymapStageType_Diyu1 = 6,
		// 	地狱2;
		CopymapStageType_Diyu2 = 7,
		// 	深渊1;
		CopymapStageType_Shenyuan1 = 8,
		// 	深渊2;
		CopymapStageType_Shenyuan2 = 9,
	}
	/**
	*------------------------------阵营类型
	*/
	enum _emCampType {
		//默认;
		CampType_None = 0,
		//友方;
		CampType_Friend = 1,
		//敌方;
		CampType_Enermy = 2,
	}
	/**
	*------------------------------战斗结果
	*/
	enum _emBattleResult {
		//胜利;
		BattleResult_Sucess = 0,
		//失败;
		BattleResult_Fail = 1,
		//平局;
		BattleResult_Equal = 2,
		//防守成功;
		BattleResult_DefenseSuc = 3,
		//防守失败;
		BattleResult_DefenseFail = 4,
	}
	/**
	*------------------------------奖励类型
	*/
	enum _emPrizeType {
		// 任务完成奖励;
		PrizeType_Quest = 1,
		// 副本完成奖励;
		PrizeType_Copymap = 2,
	}
	/**
	*------------------------------ 道具配置标示
	*/
	enum _emItemMark {
		//是否不可出售;
		ItemMark_NoSell = 0,
		//是否不可以批量使 无用;
		ItemMark_UseBatch = 2,
		//是否可展示;
		ItemMark_Show = 3,
		//是否可以放入快捷栏;
		ItemMark_Shortcut = 4,
		//掉出是否广播;
		ItemMark_DropBroadcast = 5,
		//是否记录日志;
		ItemMark_SaveLog = 6,
		//得到道具是否自动使用;
		ItemMark_GetAutoUse = 7,
		//得到道具开始计时;
		ItemMark_GetTimeLimit = 8,
		//使用道具开始计时;
		ItemMark_UseTimeLimit = 9,
		//是否下线不计时;
		ItemMark_OfflineNoTime = 10,
		//是否获得绑定;
		ItemMark_GetBind = 11,
		//是否限制使用一个;
		ItemMark_LimitUseOne = 12,
		//获得增加跨天CD;
		ItemMark_GetAddDailyCD = 13,
		//是否分解强绑定;
		ItemMark_SplitForceBind = 14,
	}
	/**
	*------------------------------ 道具品质
	*/
	enum _emItemQualityType {
		//白色;
		ItemQualityType_White = 0,
		//绿色;
		ItemQualityType_Green = 1,
		//蓝色;
		ItemQualityType_Blue = 2,
		//紫色;
		ItemQualityType_Purple = 3,
		//橙色;
		ItemQualityType_Orange = 4,
		//红色;
		ItemQualityType_Red = 5,
		//粉色;
		ItemQualityType_Pink = 6,
		//铂金;
		ItemQualityType_Gold = 7,
	}
	/**
	*------------------------------ 道具列表类型
	*/
	enum _emBagType {
		//装备背包类型;
		BagType_Equip = 1,
		//道具背包类型;
		BagType_Item = 2,
		//碎片背包类型;
		BagType_PetPiece = 3,
		//特殊背包类型;
		BagType_Special = 4,
		//神装背包类型;
		BagType_GodEquip = 5,
	}
	/**
	*------------------------------ 道具大类型
	*/
	enum _emItemType {
		//资源类 ;
		ItemType_Resource = 0,
		//装备类型  _emEquipType;
		ItemType_Equip = 1,
		//符文类型  _emRuneType;
		ItemType_Rune = 2,
		//伙伴类型 	_emItemPetType ;
		ItemType_Pet = 3,
		//普通		_emItemNormalType;
		ItemType_Normal = 4,
		//神装类型  _emGodEquipType;
		ItemType_GodEquip = 5,
		//特权类型(数量作为特权数值)  _emPrivilegeType;
		ItemType_Privilege = 6,
		//法阵觉醒;
		ItemType_FazhenAwake = 7,
	}
	/**
	*------------------------------ 普通类型
	*/
	enum _emItemNormalType {
		//普通;
		ItemNormalType_Normal = 0,
		//技能道具;
		ItemNormalType_Skill = 1,
	}
	/**
	*------------------------------ 神装品质
	*/
	enum _emGodEquipQuality {
		//普通;
		GodEquipQuality_Normal = 0,
		//良品;
		GodEquipQuality_Good = 1,
		//极品;
		GodEquipQuality_Excellent = 2,
	}
	/**
	*------------------------------ 神装类型
	*/
	enum _emGodEquipType {
		//耳环;
		GodEquipType_Earring = 1,
		//项链;
		GodEquipType_Necklace = 2,
		//戒指;
		GodEquipType_Ring = 3,
		//手镯;
		GodEquipType_Bracelet = 4,
	}
	/**
	*------------------------------ 伙伴类型
	*/
	enum _emItemPetType {
		//伙伴ID;
		ItemPetType_PetID = 1,
		//伙伴种族;
		ItemPetType_PetType = 2,
		//随机任意;
		ItemPetType_Rand = 3,
		//升星材料任意英雄;
		ItemPetType_MaterialAny = 4,
		//升星材料指定英雄;
		ItemPetType_MaterialSpecific = 5,
		//组随机概率;
		ItemPetType_Group = 6,
	}
	/**
	*------------------------------ 符文类型
	*/
	enum _emRuneType {
		//星辰符文;
		RuneType_Star = 1,
		//月亮符文;
		RuneType_Moon = 2,
		//太阳符文;
		RuneType_Sun = 3,
		//彩虹符文;
		RuneType_Rainbow = 4,
		//闪烁符文;
		RuneType_Blink = 5,
		//星石符文;
		RuneType_StarStone = 6,
	}
	/**
	*------------------------------ 装备类型
	*/
	enum _emEquipType {
		//武器;
		EquipType_Weapon = 1,
		//护甲;
		EquipType_Cloth = 2,
		//鞋子;
		EquipType_Shoe = 3,
		//头盔;
		EquipType_Helmet = 4,
	}
	/**
	*------------------------------ 道具使用类型
	*/
	enum _emItemUseType {
		//加消耗;
		ItemUseType_Expend = 1,
		//加buff;
		ItemUseType_Buff = 2,
		//礼包;
		ItemUseType_Packet = 3,
		//获得英雄;
		ItemUseType_AddPet = 4,
		//增加称号ID;
		ItemUseType_AddTitle = 5,
		//增加头像框;
		ItemUseType_AddHeadIcon = 6,
		//增加商品ID;
		ItemUseType_AddProductID = 7,
		//增加vip经验;
		ItemUseType_VIPExp = 8,
		//挂机收益;
		ItemUseType_Profit = 9,
		//升星;
		ItemUseType_UpStar = 10,
	}
	/**
	*------------------------------ 礼包使用类型
	*/
	enum _emItemPackType {
		// 标准全部获取;
		ItemPacket_Normal = 1,
		// 几率获取;
		ItemPacket_Rate = 2,
		// 互斥获取;
		ItemPacket_Mutually = 3,
		// 次数获取;
		ItemPacket_CountGet = 4,
		// 掉落获取;
		ItemPacket_Drop = 5,
		// 选择获取;
		ItemPacket_Select = 6,
	}
	/**
	*------------------------------ 道具标记
	*/
	enum _emItemFlag {
		//是否穿戴;
		ItemFlag_Equip = 0,
		//新道具ID;
		ItemFlag_Sequence = 1,
		//是否自动使用;
		ItemFlag_AutoUse = 2,
	}
	/**
	*------------------------------ 任务类型
	*/
	enum _emTaskType {
		//主线;
		TaskType_Main = 0,
	}
	/**
	*------------------------------ 任务目标类型
	*/
	enum _emTaskTargetType {
		//穿戴装备;
		TaskTargetType_Equip = 1,
		//完成战斗关卡;
		TaskTargetType_CompleteStage = 2,
		//主角等级;
		TaskTargetType_PetLevel = 3,
		//技能升级;
		TaskTargetType_SkillLevel = 4,
	}
	/**
	*------------------------------ 邮件类型
	*/
	enum _emMailType {
		//无效;
		MailType_INVALID = 0,
		//GM;
		MailType_GM = 1,
		//背包已满;
		MailType_BagFull = 2,
		//离线奖励;
		MailType_OfflinePrize = 3,
		//等级奖励;
		MailType_Level = 4,
		//竞技场每日奖励	参数:名次;
		MailType_ChallengeDaily = 5,
		//元素神殿排行		参数:名次;
		MailType_Element = 6,
		//公会战排行		参数:名次_战绩;
		MailType_FactionWarTop = 7,
		//超凡段位赛赛季奖励 参数:名次;
		MailType_DanSeasonPrize = 8,
		//跨服天梯奖励 		参数:名次;
		MailType_LadderPrize = 9,
		//冠军赛通知;
		MailType_ChampionNotice = 10,
		//冠军赛排名奖励	参数:名次;
		MailType_ChampionTopPrize = 11,
		//冠军赛竞猜币;
		MailType_ChampionGuessCoin = 12,
		//公会解散;
		MailType_FactionDissolve = 13,
		//月卡每日奖励	参数: 商品ID;
		MailType_MonthCardReward = 14,
		//基金每日奖励	参数:商品ID;
		MailType_Fund = 15,
		//平台充值购买	参数:钻石_返利钻石;
		MailType_Platform = 16,
		//竞技场赛季奖励	参数:开始时间_结束时间_名次;
		MailType_ChallengeSeason = 17,
		//cdk邮件;
		MailType_CDK = 18,
		//无尽试炼每日奖励	参数:名次;
		MailType_Endless = 19,
		//帮派副本boss奖励;
		MailType_FactionBossAward = 20,
		//帮派副本击杀boss奖励;
		MailType_FactionKillBoss = 21,
		//冠军赛排名奖励 		参数:名次;
		MailType_WeekChampionTop = 22,
		//冠军赛竞猜奖励;
		MailType_WeekChampionGuess = 23,
		//点金活动排行奖励		参数:名次;
		MailType_TopClickGold = 24,
		//远航活动排行奖励		参数:名次;
		MailType_TopSail = 25,
		//远征活动排行奖励		参数:名次;
		MailType_TopExpedition = 26,
		//快速战斗活动排行奖励	参数:名次;
		MailType_TopRaid = 27,
		//神界冒险次数排行奖励	参数:名次;
		MailType_TopiskCount = 28,
		//支援奖励;
		MailType_SupportPrize = 29,
		//开启法阵奖励;
		MailType_Fazhen = 30,
		//巅峰挑战奖励;
		MailType_Peak = 31,
		//命运之子;
		MailType_SonOfDestiny = 32,
		//英雄榜冲榜活动 参数:名次;
		MailType_ActivityRankHero = 33,
		//等级榜冲榜活动 参数:名次;
		MailType_ActivityRankLevel = 34,
		//战力榜冲榜活动 参数:名次;
		MailType_ActivityRankPower = 35,
		//装备榜冲榜活动 参数:名次;
		MailType_ActivityRankEquip = 36,
		//充值榜冲榜活动 参数:名次;
		MailType_ActivityRankCharge = 37,
		//英雄等级榜冲榜活动 参数:名次;
		MailType_ActivityRankHeroLv = 38,
		//英雄榜冲榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityRankHeroLimit = 39,
		//等级榜冲榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityRankLevelLimit = 40,
		//战力榜冲榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityRankPowerLimit = 41,
		//装备榜冲榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityRankEquipLimit = 42,
		//充值榜冲榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityRankChargeLimit = 43,
		//英雄等级榜冲榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityRankHeroLvLimit = 44,
		//0元购;
		MailType_ZeroBuy = 45,
		//充值活动;
		MailType_ActivityChargeDays = 46,
		//系统补偿;
		MailType_SysCompensate = 47,
		//猜猜猜活动 参数:名次;
		MailType_Guess = 48,
		//终身卡;
		MailType_LifeTimeCard = 49,
		// 合服星级冲榜活动 参数:名次;
		MailType_MergerStarUp = 50,
		// 合服充值冲榜活动 参数:名次;
		MailType_MergerCharge = 51,
		// 合服抽卡冲榜活动 参数:名次;
		MailType_MergerHero = 52,
		//进阶战令结算(备用);
		MailType_ActivityWarOrder = 54,
		//进阶战令结算(备用);
		MailType_ActivityWarOrder1 = 55,
		//进阶战令结算(备用);
		MailType_ActivityWarOrder2 = 56,
		// 合服星级冲榜活动未达到条件 参数:原名次_名次;
		MailType_MergerStarUpLimit = 57,
		// 合服充值冲榜活动未达到条件 参数:原名次_名次;
		MailType_MergerChargeLimit = 58,
		// 合服抽卡冲榜活动未达到条件 参数:原名次_名次;
		MailType_MergerHeroLimit = 59,
		//跨服抽卡榜冲榜活动 参数:名次;
		MailType_ActivityCrossRankHero = 61,
		//跨服战力榜冲榜活动 参数:名次;
		MailType_ActivityCrossRankPower = 62,
		//跨服图鉴榜冲榜活动 参数:名次;
		MailType_ActivityCrossRankIllustration = 63,
		//跨服升星榜冲榜活动 参数:名次;
		MailType_ActivityCrossRankStarUp = 64,
		//跨服抽卡榜冲榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityCrossRankHeroLimit = 71,
		//跨服战力榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityCrossRankPowerLimit = 72,
		//跨服图鉴榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityCrossRankIllustrationLimit = 73,
		//跨服升星榜冲榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityCrossRankStarUpLimit = 74,
		//连连看排名活动 参数:名次;
		MailType_ActivityJoyousLinkup = 75,
		//图鉴榜冲榜活动 参数:名次;
		MailType_ActivityIllustration = 76,
		//升星榜冲榜活动 参数:名次;
		MailType_ActivityStarUp = 77,
		//图鉴榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityIllustrationLimit = 78,
		//升星榜冲榜活动未达到条件 参数:原名次_名次;
		MailType_ActivityStarUpLimit = 79,
		//跨服竞技场赛季奖励	参数:开始时间_结束时间_名次;
		MailType_CrossChallengeSeason = 80,
		//对战塔积分补发;
		MailType_TowerFirstReward_Score = 81,
		//特权卡补偿邮件;
		MailType_Privilege_Compensation = 82,
		//累充未领邮件;
		MailType_Activity_ChargeAmount = 83,
		//活动boss伤害排名 参数:名次;
		MailType_ActivityBoss = 84,
	}
	/**
	*------------------------------ 邮件状态
	*/
	enum _emMailState {
		//  未读;
		MailState_NoRead = 0,
		//  已读 ;
		MailState_Readed = 1,
		//  已领;
		MailState_Reward = 2,
		//  已领;
		MailState_Delete = 3,
		//		发送成功;
		MAILSTATE_SUCCESS = 8,
		//		发送失败;
		MAILSTATE_FAIL = 16,
		//		已读;
		MAILSTATE_READED = 32,
		//		已领取附件;
		MAILSTATE_REWARD = 64,
		//	已删除;
		MAILSTATE_DEL = 128,
	}
	/**
	*------------------------------ 邮件操作
	*/
	enum _emMailOpt {
		//		 增加邮件;
		MailOpt_Add = 0,
		//		 已领取附件;
		MailOpt_Reward = 1,
		//		 删除邮件;
		MailOpt_Del = 2,
	}
	/**
	*------------------------------ 广播的频道
	*/
	enum _emBroadcast_Channel {
		//世界(属于指定服务器的玩家);
		BroadcastChannel_World = 1,
		//私聊;
		BroadcastChannel_Player = 2,
		//帮会;
		BroadcastChannel_Faction = 3,
		//队伍;
		BroadcastChannel_Team = 4,
		//系统;
		BroadcastChannel_System = 5,
		//跨服;
		BroadcastChannel_Cross = 6,
		//同省;
		BroadcastChannel_Province = 7,
		//跑马灯;
		BroadcastChannel_Notice = 8,
	}
	/**
	*------------------------------  排行榜类型
	*/
	enum _emTopListType {
		//  个人剧情进度;
		TopListType_Hook = 1,
		//  试练塔;
		TopListType_Train1 = 2,
		//  公会;
		TopListType_Faction = 3,
		//  竞技场;
		TopListType_Challenge = 4,
		//  个人战力;
		TopListType_Figthpower = 5,
		//  元素神殿;
		TopListType_Element = 6,
		//  神界冒险;
		TopListType_Risk = 7,
		//  无尽试炼;
		TopListType_Endless = 8,
		//  玩家等级;
		TopListType_PlayerLevel = 9,
		// 冠军赛;
		TopListType_Champion = 10,
		// 点石成金;
		TopListType_ClickGold = 11,
		// 远航;
		TopListType_Sail = 12,
		// 远征;
		TopListType_Expedition = 13,
		// 快速战斗;
		TopListType_Raid = 14,
		// 神界冒险次数排行;
		TopListType_RiskCount = 15,
		// 天界副本星星;
		TopListType_HeavenStar = 16,
		// 粉丝排行;
		TopListType_Fans = 17,
		// 巅峰挑战第一天;
		TopListType_PeakDay1 = 18,
		// 巅峰挑战第二天;
		TopListType_PeakDay2 = 19,
		// 巅峰挑战第三天;
		TopListType_PeakDay3 = 20,
		// 巅峰挑战第四天;
		TopListType_PeakDay4 = 21,
		// 巅峰挑战第五天;
		TopListType_PeakDay5 = 22,
		// 活动英雄榜;
		TopListType_AcitivtyHero = 23,
		// 活动等级榜;
		TopListType_AcitivtyLevel = 24,
		// 活动战力榜;
		TopListType_AcitivtyPower = 25,
		// 活动装备榜;
		TopListType_AcitivtyEquip = 26,
		// 活动充值榜;
		TopListType_AcitivtyCharge = 27,
		// 活动英雄等级榜;
		TopListType_AcitivtyHeroLevelup = 28,
		//  试练塔;
		TopListType_Train2 = 29,
		//  猜猜猜榜单;
		TopListType_Guess = 30,
		//  连连看榜单;
		TopListType_JoyousLinkup = 31,
		// 活动图鉴积分单服榜;
		TopListType_AcitivtyIllustration = 32,
		// 活动英雄星级榜;
		TopListType_AcitivtyStarUp = 33,
		// 活动boss伤害榜;
		TopListType_AcitivtyBoss = 34,
		// 合服星级榜;
		TopListType_MergerStarUp = 41,
		// 合服充值榜;
		TopListType_MergerCharge = 42,
		// 合服抽卡榜;
		TopListType_MergerHero = 43,
		//  跨服开始;
		TopListType_BWBegin = 50,
		//  跨服个人战力;
		TopListType_BWFigthpower = 51,
		//  跨服公会;
		TopListType_BWFaction = 52,
		//  跨服天梯;
		TopListType_BWLadder = 53,
		//  跨服公会战;
		TopListType_BWFctionWar = 54,
		//  跨服竞技场;
		TopListType_BWChallenge = 55,
		//  周冠军赛;
		TopListType_BWWeekChampion = 56,
		// 跨服活动抽卡榜;
		TopListType_CrossAcitivtyHero = 61,
		// 跨服活动战力榜;
		TopListType_CrossAcitivtyPower = 62,
		// 跨服活动图鉴积分榜;
		TopListType_CrossAcitivtyIllustration = 63,
		// 跨服活动升星积分榜;
		TopListType_CrossAcitivtyStarUp = 64,
	}
	/**
	*------------------------------伙伴种族
	*/
	enum _emPetType {
		//水;
		PetType_Water = 1,
		//火;
		PetType_Fire = 2,
		//风;
		PetType_Wind = 3,
		//太阳;
		PetType_Sun = 4,
		//月亮;
		PetType_Moon = 5,
	}
	/**
	*------------------------------伙伴职业
	*/
	enum _emPetJobType {
		//坦克;
		PetJobType_Tanke = 1,
		//战士;
		PetJobType_Zhanshi = 2,
		//法师;
		PetJobType_Fashi = 3,
		//辅助;
		PetJobType_FuZhu = 4,
	}
	/**
	*------------------------------公会属性
	*/
	enum _emFactionPVPSkillType {
		//属性;
		FactionPVPSkillType_Attr = 1,
		//被动技能;
		FactionPVPSkillType_Passive = 2,
	}
	/**
	*------------------------------buff类型
	*/
	enum _emBuffType {
		//加属性			属性类型_属性值(可为负数)_属性万分比(可为负数);
		BuffType_AddAttri = 1,
		//加状态			状态ID _emBuffControlType;
		BuffType_AddState = 2,
		//持续加消耗		加消耗  消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数);
		BuffType_ContinueAddExpend = 3,
		//所有带有buff的一起分担伤害			伤害万分比;
		BuffType_ShareDamage = 4,
		//法术反噬			施法者属性ID_施法者属性万分比;
		BuffType_MagicDamage = 5,
		//受物理攻击加buff	概率万分比_buffid;
		BuffType_PDamageAddBuff = 6,
		//增加治疗护盾	;
		BuffType_AddCureShield = 7,
		//增加护盾			施法者属性ID_施法者属性万分比;
		BuffType_AddShield = 8,
		//反弹伤害			伤害万分比;
		BuffType_ReboundDamage = 9,
		//偷取目标的属性	施法者属性ID_施法者属性万分比;
		BuffType_GetTargetAttr = 10,
		//被攻击掉血		施法者属性ID_施法者属性万分比;
		BuffType_BeAttackDelHp = 11,
		//持续掉血			自己属性ID_自己属性万分比_最大自己属性ID_最大自己属性万分比;
		BuffType_ContinueDelHp = 12,
		//抵挡伤害			次数;
		BuffType_ResistDamage = 13,
		//buff删除掉血		消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数);
		BuffType_DelLayerDamage = 14,
		//伤害限制			属性类型_属性万分比;
		BuffType_DamageLimit = 15,
		//普攻选目标		_emSkillCondition_参数1;
		BuffType_NoramlSkillTarget = 16,
		//攻击吸血			伤害万分比;
		BuffType_DamageAddHp = 17,
		//只和加buff的人分担伤害	伤害万分比;
		BuffType_ProtectDamage = 18,
	}
	/**
	*------------------------------ 有益类型
	*/
	enum _emBuffEffectType {
		//正面;
		BuffEffectType_Useful = 1,
		//负面非控制;
		BuffEffectType_Harmful = 2,
		//负面完全可驱散（不检测Mark驱散标记）;
		BuffEffectType_Endless = 3,
		//负面控制;
		BuffEffectType_HarmfulControl = 4,
	}
	/**
	*-----------------------------Buff控制类型
	*/
	enum _emBuffControlType {
		//冰冻 无法行动;
		BuffControl_Bingdong = 1,
		//眩晕 无法行动;
		BuffControl_Xuanyun = 2,
		//沉睡 无法行动;
		BuffControl_Chenshui = 3,
		//禁止复活 无法行动;
		BuffControl_NoFuhuo = 4,
		//嘲讽;
		BuffControl_Chaofeng = 5,
		//虚弱;
		BuffControl_Xuruo = 6,
		//混乱状态;
		BuffControl_Hunluan = 7,
		//石化;
		BuffControl_Shihua = 8,
		//离间;
		BuffControl_Lijian = 9,
		//麻痹;
		BuffControl_Mabi = 10,
		//封印;
		BuffControl_Fengying = 11,
		//禁疗;
		BuffControl_Jinliao = 12,
		//免疫;
		BuffControl_Mianyi = 13,
		//流血;
		BuffControl_Liuxue = 14,
		//灼烧;
		BuffControl_Zhuoshao = 15,
		//中毒;
		BuffControl_Zhongdu = 16,
		//破甲;
		BuffControl_Pojia = 17,
		//减速;
		BuffControl_Jiansu = 18,
		//速度提升;
		BuffControl_Jiasu = 19,
		//格挡盾;
		BuffControl_Gedangdun = 20,
		//法术反噬;
		BuffControl_Fashufanshi = 21,
		//海蛇庇护;
		BuffControl_Haishebihu = 22,
		//持续恢复;
		BuffControl_Chixuhuifu = 23,
		//治疗盾;
		BuffControl_Zhiliaodun = 24,
		//护盾;
		BuffControl_Hudun = 25,
		//烈焰灼烧;
		BuffControl_Lieyanzhuoshao = 26,
		//沉默;
		BuffControl_Chenmo = 27,
		//偷取攻击;
		BuffControl_Touqugongji = 28,
		//魔化;
		BuffControl_Mohua = 29,
		//森林印记;
		BuffControl_Senlinyinji = 30,
		//感电;
		BuffControl_Gandian = 31,
		//诅咒;
		BuffControl_Zuzhou = 32,
		//死亡印记;
		BuffControl_Siwangyinji = 33,
		//灵魂印记;
		BuffControl_Linghunyinji = 34,
		//怒气;
		BuffControl_Nuqi = 35,
		//免疫控制;
		BuffControl_NoControl = 36,
		//免疫负面效果;
		BuffControl_NoHarmEffect = 37,
	}
	/**
	*------------------------------------- BUFF不同来源叠加类型
	*/
	enum _emBuffDiffRepeatType {
		//丢弃;
		BuffDiffRepeatType_Drop = 1,
		//替换;
		BuffDiffRepeatType_Refresh = 2,
		//共存;
		BuffDiffRepeatType_Save = 3,
	}
	/**
	*------------------------------------- BUFF相同来源叠加类型
	*/
	enum _emBuffSameRepeatType {
		//丢弃;
		BuffSameRepeatType_Drop = 1,
		//替换;
		BuffSameRepeatType_Refresh = 2,
		//叠加回合;
		BuffSameRepeatType_AddRound = 3,
	}
	/**
	*------------------------------------- BUFF删除条件
	*/
	enum _emBuffDelCondition {
		//被攻击 参数1:次数_概率万分比;
		BuffDelCondition_BeAttack = 1,
		//生效立即删除;
		BuffDelCondition_Effect = 2,
	}
	/**
	*------------------------------------- BUFF删除触发
	*/
	enum _emBuffDelAction {
		//源头使用技能 技能ID;
		BuffDelAction_SourceUseSkill = 1,
	}
	/**
	*------------------------------------- BUFF掩码
	*/
	enum _emBuffMark {
		//不可驱散;
		BuffMark_NoClear = 1,
		//死亡是否不删除;
		BuffMark_DeadNoDel = 2,
		//死亡可以加;
		BuffMark_DeadCanAdd = 3,
	}
	/**
	*------------------------------技能顺序类型
	*/
	enum _emSkillOrderType {
		//伤害;
		SkillOrderType_Damage = 1,
		//治疗;
		SkillOrderType_Cure = 2,
		//给目标加buff;
		SkillOrderType_AddTarBuff = 3,
		//给自己加buff;
		SkillOrderType_AddSelfBuff = 4,
		//驱散	 	参数:概率_效果类型1_个数1(0表示所有)_效果类型2_个数2_..._效果类型n_个数n;
		SkillOrderType_ClearEffectBuff = 5,
		//反击	 	参数:概率_取自身属性类型_属性万分比;
		SkillOrderType_FightBack = 6,
		//给自己治疗;
		SkillOrderType_SelfCure = 7,
		//回复上一次伤害生命 参数:万分比;
		SkillOrderType_AddDamageHp = 8,
		//删除状态buff 参数:状态ID;
		SkillOrderType_DelBuffState = 9,
		//真实伤害;
		SkillOrderType_RealDamge = 10,
		//使用上一次伤害;
		SkillOrderType_UseLastDamage = 11,
		//百分比真实伤害 参数：万分比_伤害最大不超过攻击方攻击力的万分比;
		SkillOrderType_PercentDamage = 12,
		//回复上一次伤害生命 参数:万分比;
		SkillOrderType_AddTotalDamageHp = 13,
		//依据自身属性反伤  参数：概率_取自身属性类型_属性万分比 ;
		SkillOrderType_DamageBackBySelf = 14,
		//依据受到伤害反伤  参数：概率_万分比  ;
		SkillOrderType_DamageBackByBeInjured = 15,
		//根据阵营数量加buff 参数 阵营类型1_数量1_bufferid1....(这些是或关系，取一个数量最大的);
		SkillOrderType_PetTypeCount = 16,
		//复制buff 参数 buffer类型_数量_最大层数_是否敌人（0友方1敌方）_数量（0表示全部）_属性类型_排序（0最小，1最大）;
		SkillOrderType_CopyBuffer = 17,
	}
	/**
	*------------------------------技能类型
	*/
	enum _emSkillType {
		//被动技能;
		SkillType_Passive = 1,
		//普攻;
		SkillType_Normal = 2,
		//主动技能;
		SkillType_Skill = 3,
	}
	/**
	*------------------------------技能掩码类型
	*/
	enum _emSkillMaskType {
		//是否忽略自己;
		SkillMaskType_IgnorSelf = 1,
		//是否继承伤害次数;
		SkillMaskType_UseDamageCount = 2,
		//是否选择死亡角色;
		SkillMaskType_SelectDead = 3,
		//是否不给自己加buff;
		SkillMaskType_AddBuffIgorSelf = 4,
		//是否继承目标;
		SkillMaskType_UseLastTarget = 5,
		//是否延时释放;
		SkillMaskType_IsDelayUse = 6,
		//是否无尽试炼连续释放;
		SkillMaskType_EndlessContinue = 7,
		//是否延时技能只能放一次;
		SkillMaskType_DelayOneTime = 8,
		//是否使用上一次伤害;
		SkillMaskType_LastDamage = 9,
		//是否使用上一次暴击伤害;
		SkillMaskType_CampCriticalDamage = 10,
		//增加buff下一回合生效;
		SkillMaskType_AddBuffNextRound = 11,
		//优先技能，必定最先释放，无视控制技能;
		SkillMaskType_FirstUseSkill = 12,
	}
	/**
	*------------------------------技能目标条件类型
	*/
	enum _emSkillTarCondition {
		//职业 参数 职业类型_emPetJobType;
		SkillTarCondition_PetType = 1,
		//状态 参数: 状态1_状态2;
		SkillTarCondition_State = 2,
	}
	/**
	*------------------------------技能buff条件类型
	*/
	enum _emSkillBuffCondition {
		//职业 参数 职业类型_emPetJobType_buff额外万分比;
		SkillBuffCondition_PetType = 1,
		//状态 参数: 状态1_状态2;
		SkillBuffCondition_State = 2,
		//死亡;
		SkillBuffCondition_Dead = 3,
		//暴击;
		SkillBuffCondition_Critical = 4,
		//属性低于自身  属性类型_buff概率万分比;
		SkillBuffCondition_LowAttr = 5,
		//状态提升概率  状态1_buff概率万分比;
		SkillBuffCondition_StateAddBuffRate = 6,
		//buff随机个数  个数;
		SkillBuffCondition_RandBuffCount = 7,
		//生命值低于万分比 万分比;
		SkillBuffCondition_DownHp = 8,
		//选择职业 参数 职业类型1_职业类型2....;
		SkillBuffCondition_UsePetType = 9,
		//buff权重随机个数  个数;
		SkillBuffCondition_RandBuff = 10,
	}
	/**
	*------------------------------技能额外伤害条件
	*/
	enum _emSkillExtraCondition {
		//职业 职业类型_万分比;
		SkillExtraCondition_PetType = 1,
		//状态 万分比_状态1_状态2(BuffControlType);
		SkillExtraCondition_State = 2,
		//正负面效果 效果(_emBuffEffectType)_万分比;
		SkillExtraCondition_EffectType = 3,
		//概率提升 概率万分比_万分比;
		SkillExtraCondition_Radio = 4,
		//属性低于自身  属性类型_万分比;
		SkillExtraCondition_LowAttr = 5,
		//生命值高于  	生命万分比_万分比;
		SkillExtraCondition_UpHp = 6,
		//生命值低于  	生命万分比_万分比;
		SkillExtraCondition_DownHp = 7,
		//目标属性伤害  属性类型_万分比_限制属性类型_限制万分比;
		SkillExtraCondition_TarAttrDamage = 8,
		//普攻触发  	 万分比;
		SkillExtraCondition_NormalSkill = 9,
		//目标效果个数  	效果(_emBuffEffectType)_万分比;
		SkillExtraCondition_TarEffectType = 10,
		//损失血量万分比伤害  万分比;
		SkillExtraCondition_LeftHpDamage = 11,
		//职业伤害值  职业类型_取目标属性类型_万分比_限制自身属性类型_限制万分比;
		SkillExtraCondition_TarPetTypeDamage = 12,
	}
	/**
	*------------------------------技能临时属性类型
	*/
	enum _emSkillAttrCondition {
		//状态或加属性 			属性类型_属性值_万分比_状态1(BuffControlType)_状态2 ;
		SkillAttrCondition_State = 1,
		//血量高于百分比 			百分比_属性类型_属性值_万分比;
		SkillAttrCondition_UpHp = 2,
		//临时加属性 				属性类型_属性值_万分比;
		SkillAttrCondition_AddAttr = 3,
		//血量低于百分比 			百分比_属性类型_属性值_万分比;
		SkillAttrCondition_LowHp = 4,
		//职业加临时数据 			职业_属性类型_属性值_万分比;
		SkillAttrCondition_Job = 5,
		//最先出手  				属性类型1_属性值1_万分比1_属性类型2_属性值2_万分比2。;
		SkillAttrCondition_FirstAttack = 6,
		//血量降低x%,属性提高y%	 属性类型_血量降低万分比_提高值;
		SkillAttrCondition_HpDownAttrUp = 7,
		//对方有技能xxx属性提高	 属性类型_属性提高值_技能ID_技能ID_ ...;
		SkillAttrCondition_HasSkillAttrUp = 8,
		//对方有技能xxx属性降低	 属性类型_属性降低值_技能ID_技能ID_ ...;
		SkillAttrCondition_HasSkillAttrDown = 9,
		//无视防御				无视防御万分比;
		SkillAttrCondition_IgnoreDef = 10,
	}
	/**
	*------------------------------技能特殊类型
	*/
	enum _emSkillCommonCondition {
		//状态增加治疗 万分比_状态ID 若目标处于【流血】状态，则回复自身等同伤害量40%的生命值;
		SkillCommonCondition_StateAddCure = 1,
		//血量低于加治疗效果 万分比_加治疗效果万分比;
		SkillCommonCondition_HpAddCure = 2,
		//驱散增加生命上限伤害 驱散个数_生命上限万分比;
		SkillCommonCondition_ClearAddHpDamage = 3,
		//技能段斩杀  段ID_生命万分比_不超过自身属性_不超过自身属性万分比;
		SkillCommonCondition_DanKill = 4,
		//额外技能目标个数  概率_个数;
		SkillCommonCondition_ExtraTargetCount = 5,
		//使用上一次总伤害加护盾  万分比;
		SkillCommonCondition_LastDamageAddShief = 6,
		//使用HP加护盾  HP的万分比;
		SkillCommonCondition_HPAddShief = 7,
		//状态层数加次数 参数:stateid_buff层数_最大次数;
		SkillCommonCondition_BuffLayerAddDamageCount = 8,
		//限制伤害 最大值_最小值;
		SkillCommonCondition_LimitDamage = 9,
		//使用上一次治疗量加护盾  万分比;
		SkillCommonCondition_HealAddShief = 10,
		//伤害均摊;
		SkillCommonCondition_DamageShare = 11,
	}
	/**
	*------------------------------附加伤害
	*/
	enum _emSkillAddDamageCondition {
		//目标属性类型_目标属性万分比_自身属性类型_自身属性最大万分比;
		SkillAddDamageCondition_TarAttr = 1,
	}
	/**
	*------------------------------伤害记录
	*/
	enum _emSkillDamageRecord {
		//上一次技能伤害;
		SkillDamageRecord_LastDamage = 1,
		//上一次队伍暴击伤害;
		SkillDamageRecord_CampCriticalDamage = 2,
		//降低攻击万分比;
		SkillDamageRecord_LowAttack = 3,
		//上一次伤害总量;
		SkillDamageRecord_LastTotalDamage = 4,
		//降低伤害万分比;
		SkillDamageRecord_ReduceDamageRate = 5,
		//降低控制万分比;
		SkillDamageRecord_ReduceControlRate = 6,
		//是否时连击;
		SkillDamageRecord_Combo = 7,
		//无视防御;
		SkillDamageRecord_IgnoreDef = 8,
		//连击;
		DelayUseSkillParam_Combo = 9,
		//追击;
		DelayUseSkillParam_Reattack = 10,
		//上次被治疗的量;
		SkillDamageRecord_LastHeal = 11,
		//上次受到总伤害伤害;
		SkillDamageRecord_LastToalBeInjured = 12,
	}
	/**
	*------------------------------技能触发类型
	*/
	enum _emSkillTriggerType {
		//被攻击触发 ;
		SkillTriggerType_BeAttack = 1,
		//额外伤害	;
		SkillTriggerType_ExtraDamage = 2,
		//使用技能触发(继承技能目标) 参数 技能ID(0表示所有技能);
		SkillTriggerType_UseSkill = 3,
		//回合数触发 参数:回合1_回合2;
		SkillTriggerType_Round = 4,
		//攻击触发;
		SkillTriggerType_Attack = 5,
		//自己buff状态加强 参数:buff类型_万分比;
		SkillTriggerType_EnhanceBuffType = 6,
		//每回合开始血量加buff 参数:血量百分比_不低于加buff_低于加buff;
		SkillTriggerType_BeginRoundHpAddBuff = 7,
		//使用技能触发(忽略技能目标) 参数:技能ID(0表示所有技能);
		SkillTriggerType_UseSkillIgnorTar = 8,
		//随机或技能 技能1_技能2;
		SkillTriggerType_RandOrSkill = 9,
		//死亡触发复活;
		SkillTriggerType_Dead = 10,
		//队伍暴击 参数:万分比;
		SkillTriggerType_CriticalCamp = 11,
		//生命触发 生命百分比;
		SkillTriggerType_Hp = 12,
		//队伍状态额外伤害 参数:取属性类型_属性万分比_状态1_状态2;
		SkillTriggerType_FriendState = 13,
		//随机与技能 概率1_技能1_概率2_技能2;
		SkillTriggerType_RandAndSkill = 14,
		//击杀目标触发使用上一个技能 参数:攻击力万分比;
		SkillTriggerType_KillUseLastSkill = 15,
		//目标属性对比加自身属性	参数:属性类型_低于加属性类型_低于加属性类型万分比__高于加属性类型_高于加属性类型万分比;
		SkillTriggerType_LowAttrAddSelfAttr = 16,
		//击杀目标触发 参数:技能ID;
		SkillTriggerType_Kill = 17,
		//普通攻击触发;
		SkillTriggerType_NormalAttack = 18,
		//队伍死亡触发 参数:状态（0无状态）;
		SkillTriggerType_TeamDead = 19,
		//被技能击杀目标,攻击力减少 参数:技能ID_攻击力万分比;
		SkillTriggerType_KillBySkill = 20,
		//携带状态敌方死亡 参数:状态ID;
		SkillTriggerType_EnemyStateDead = 21,
		//技能组合(走子技能CD) 参数:技能ID1_技能ID2;
		SkillTriggerType_SkillGroup = 22,
		//物理攻击触发 ;
		SkillTriggerType_PhsicalAttack = 23,
		//法术攻击触发 ;
		SkillTriggerType_MagicalAttack = 24,
		//物理攻击触发连击 参数：伤害降低_控制降低;
		SkillTriggerType_PhsicalAttackCombo = 25,
		//法术攻击触发连击 参数：伤害降低_控制降低;
		SkillTriggerType_MagicalAttackCombo = 26,
		//物理攻击击杀之后追加普攻;
		SkillTriggerType_KillReattack = 27,
		//物理攻击暴击之后追加普攻;
		SkillTriggerType_CriticalReattack = 28,
		//复活触发;
		SkillTriggerType_Revive = 29,
		//伤害超过目标生命值多少触发 参数：伤害万分比;
		SkillTriggerType_DamagePercent = 30,
		//自己使用治疗触发;
		SkillTriggerType_SelfHeal = 31,
		//使用额外技能斩击触发 参数:技能ID;
		SkillTriggerType_UseExtraLastSkill = 32,
		//自己暴击触发;
		SkillTriggerType_Critical = 33,
	}
	/**
	*------------------------------技能范围类型类型
	*/
	enum _emSkillRangeType {
		//	对位单体;
		SkillRangeType_Single = 1,
		//	全体;
		SkillRangeType_All = 2,
		//	前排;
		SkillRangeType_Row1 = 3,
		//	中排;
		SkillRangeType_Row2 = 4,
		//	后排;
		SkillRangeType_Row3 = 5,
		//	前中排;
		SkillRangeType_Row12 = 6,
		//	前后排;
		SkillRangeType_Row13 = 7,
		//	中后排;
		SkillRangeType_Row23 = 8,
		//	随机横排;
		SkillRangeType_RandRow = 9,
		//	上列;
		SkillRangeType_Colume1 = 10,
		//	中列;
		SkillRangeType_Colume2 = 11,
		//	下列	;
		SkillRangeType_Colume3 = 12,
		//	随机列	;
		SkillRangeType_RandColume = 13,
		//	对位列;
		SkillRangeType_Colume = 14,
		//	最大血量;
		SkillRangeType_MaxHp = 15,
		//	最小血量;
		SkillRangeType_MinHp = 16,
		//	攻击最高;
		SkillRangeType_MaxAttack = 17,
		//	攻击最低;
		SkillRangeType_MinAttack = 18,
		//	速度最高;
		SkillRangeType_MaxSpeed = 19,
		//	速度最低;
		SkillRangeType_MinSpeed = 20,
		//	防御最高;
		SkillRangeType_MaxDefense = 21,
		//	防御最低;
		SkillRangeType_MinDefense = 22,
		//	随机;
		SkillRangeType_Rand = 23,
		//	人数最多的一列;
		SkillRangeType_MaxColume = 24,
	}
	/**
	*------------------------------技能目标类型
	*/
	enum _emSkillTargetType {
		//敌方;
		SkillTargetType_Enermy = 0,
		//友方;
		SkillTargetType_Friend = 1,
		//自己;
		SkillTargetType_Self = 2,
		//所有;
		SkillTargetType_All = 3,
	}
	/**
	*------------------------------ 战场类型
	*/
	enum _emBattleType {
		//挂机BOSS;
		BattleType_Hook = 1,
		//试练塔;
		BattleType_Tower = 2,
		//日常副本;
		BattleType_Copymap = 3,
		//无尽试炼;
		BattleType_Endless = 4,
		//竞技场;
		BattleType_Challenge = 5,
		//星河神殿	;
		BattleType_Temple = 6,
		//公会副本;
		BattleType_FactionCopymap = 7,
		//公会战;
		BattleType_FactionWar = 8,
		//英雄远征;
		BattleType_Expedition = 9,
		//元素神殿;
		BattleType_Element = 10,
		//神界冒险;
		BattleType_Risk = 11,
		//超凡段位赛;
		BattleType_Dan = 12,
		//跨服天梯赛;
		BattleType_Ladder = 13,
		//冠军赛;
		BattleType_Champion = 14,
		//周冠军赛;
		BattleType_WeekChampion = 15,
		//天界副本;
		BattleType_HeavenDungeon = 16,
		//切磋 id填切磋目标playerid，param填目标worldid;
		BattleType_FightEachOther = 17,
		//超凡段位赛王者赛;
		BattleType_DanKing = 18,
		//跨服竞技场  id填切磋目标player id，param填是否机器人;
		BattleType_CrossChallege = 19,
		//组队征战  id 关卡index, param 阵容index;
		BattleType_TeamCampaign = 20,
		//巅峰挑战 id 第几天;
		BattleType_Peak = 21,
		//试练塔2;
		BattleType_Tower2 = 22,
		//活动boss;
		BattleType_ActivityBoss = 23,
	}
	/**
	*------------------------------ 技能攻击类型
	*/
	enum _emSkillAttackType {
		//  无类型;
		SkillAttackType_None = 0,
		//  物理攻击;
		SkillAttackType_Physical = 1,
		//  法术攻击;
		SkillAttackType_Magical = 2,
	}
	/**
	*------------------------------ 帮会职位
	*/
	enum _emFactionJob {
		//;
		FactionJob_Unknown = 0,
		//	 帮主;
		FactionJob_Leader = 1,
		//	 副帮主;
		FactionJob_Deputy = 2,
		//	 普通会员;
		FactionJob_People = 3,
	}
	/**
	*------------------------------ 权限
	*/
	enum _emFactionPrivilege {
		//	 批准审批;
		FactionPrivilege_AgreeApply = 1,
		//	 职位任免;
		FactionPrivilege_SetJob = 2,
		//	 踢出帮会;
		FactionPrivilege_Remove = 3,
		//	 修改公告;
		FactionPrivilege_Edit = 4,
		//	 修改帮名;
		FactionPrivilege_Name = 5,
		//	 帮战报名;
		FactionPrivilege_War = 6,
	}
	/**
	*------------------------------ 帮会数据类型
	*/
	enum _emFactionDataType {
		//	基础信息;
		_FactionData_Base = 0,
		//	副本数据;
		_FactionData_Copymap = 1,
		//	帮会事件;
		_FactionData_Events = 2,
	}
	/**
	*------------------------------ 阵法类型
	*/
	enum _emZhenfaType {
		//	主线剧情;
		ZhenfaType_Zhuxian = 1,
		//	竞技场防守;
		ZhenfaType_Jingjichang = 2,
		//	冠军赛防守;
		ZhenfaType_Guanjun = 3,
		//	天梯赛防守;
		ZhenfaType_Tianti = 4,
		//	段位赛防守1;
		ZhenfaType_Duanwei = 5,
		//	段位赛防守2;
		ZhenfaType_Duanwei2 = 6,
		//	试练塔阵法;
		ZhenfaType_Tower = 10,
		//	天界副本队伍1;
		ZhenfaType_Heaven1 = 11,
		//	天界副本队伍2;
		ZhenfaType_Heaven2 = 12,
		//	无尽试炼队伍;
		ZhenfaType_Endless = 13,
		//	远征队伍;
		ZhenfaType_Expedition = 14,
		//	跨服竞技场防守队伍1;
		ZhenfaType_CrossChallengeDEF1 = 15,
		//	跨服竞技场防守队伍2;
		ZhenfaType_CrossChallengeDEF2 = 16,
		//	跨服竞技场防守队伍3;
		ZhenfaType_CrossChallengeDEF3 = 17,
		//	周冠军赛;
		ZhenfaType_WeekChampion = 18,
		//   组队征战;
		ZhenfaType_TeamCampaign = 19,
		//	跨服竞技场进攻队伍1;
		ZhenfaType_CrossChallengeATK1 = 20,
		//	跨服竞技场进攻队伍2;
		ZhenfaType_CrossChallengeATK2 = 21,
		//	跨服竞技场进攻队伍3;
		ZhenfaType_CrossChallengeATK3 = 22,
	}
	/**
	*------------------------------ 位置类型
	*/
	enum _emPosType {
		//	位置1;
		PosType_1 = 1,
		//	位置2;
		PosType_2 = 2,
		//	位置3;
		PosType_3 = 3,
		//	位置4;
		PosType_4 = 4,
	}
	/**
	*------------------------------ 伙伴召唤类型
	*/
	enum _emPetCallType {
		//	基础召唤;
		PetCallType_Normal = 1,
		//	友情召唤;
		PetCallType_FriendShip = 2,
		//	高级召唤;
		PetCallType_Advance = 3,
		//	积分召唤;
		PetCallType_CallPoint = 4,
		//	先知水召唤;
		PetCallType_Water = 5,
		//	先知火召唤;
		PetCallType_Fire = 6,
		//	先知风召唤;
		PetCallType_Wind = 7,
		//	先知光暗召唤;
		PetCallType_SunMoon = 8,
	}
	/**
	*------------------------------ 远航类型
	*/
	enum _emSailType {
		//	普通;
		SailType_Putong = 1,
		//	精良;
		SailType_Jingliang = 2,
		//	稀有;
		SailType_Xiyou = 3,
		//	史诗;
		SailType_Shishi = 4,
		//	传说;
		SailType_Chuanshuo = 5,
		//	不朽;
		SailType_Buxiu = 6,
	}
	/**
	*------------------------------ 成就大类型
	*/
	enum _emAchieveBigType {
		//	主线成就;
		AchieveBigType_Main = 1,
		//	每日活跃;
		AchieveBigType_Daily = 2,
		//	公会成就;
		AchieveBigType_Faction = 3,
		//	神器成就;
		AchieveBigType_Artifact = 4,
		//	历练成就;
		AchieveBigType_Train = 5,
		//	活动活跃;
		AchieveBigType_Activity = 6,
		//	邀请码;
		AchieveBigType_Invite = 7,
		//	元灵觉醒活动;
		AchieveBigType_Artifact_Activity = 8,
		//	天命之子活动;
		AchieveBigType_SonOfDestiny = 9,
		//	每周活跃;
		AchieveBigType_Weekly = 10,
		//	礼包;
		AchieveBigType_Gift = 11,
		//	战令任务;
		AchieveBigType_WarOrder = 12,
		//	图鉴激活成就;
		AchieveBigType_Illustration = 13,
		//	图鉴战力成就;
		AchieveBigType_IllustrationPowe = 14,
		//	成就之路;
		AchieveBigType_AchieveRoad = 15,
	}
	/**
	*------------------------------ 重置类型
	*/
	enum _emTimeResetType {
		//	不重置;
		TimeResetType_None = 0,
		//	日重置;
		TimeResetType_Daily = 1,
		//	周重置;
		TimeResetType_Week = 2,
		//	月重置;
		TimeResetType_Month = 3,
		//	开服天数;
		TimeResetType_ServerDay = 4,
	}
	/**
	*------------------------------ 成就历练类型
	*/
	enum _emAchieveTrainType {
		//竞技历练;
		AchieveTrainType_PVP = 1,
		//战斗历练;
		AchieveTrainType_Battle = 2,
		//特殊历练;
		AchieveTrainType_Specail = 3,
	}
	/**
	*------------------------------ 成就类型
	*/
	enum _emAchieveType {
		//	日常登录;
		AchieveType_DailyLogin = 1,
		//	赠送友情点;
		AchieveType_GiveFriendPoint = 2,
		//	伙伴召唤;
		AchieveType_PetCall = 3,
		//	竞技场挑战次数;
		AchieveType_ChallengeFight = 4,
		//	快速挑战次数;
		AchieveType_SweepHook = 5,
		//	试练塔成功次数;
		AchieveType_TowerWin = 6,
		//	公会boss挑战次数;
		AchieveType_FactionBoss = 7,
		//	公会捐献次数;
		AchieveType_FactionDonate = 8,
		//	参与一次无尽试炼;
		AchieveType_Endless = 9,
		//	接取远航订单;
		AchieveType_AccpetSail = 10,
		//	日常副本;
		AchieveType_DailyCopymap = 11,
		//	远征胜利;
		AchieveType_Expedition = 12,
		//	等级达到;
		AchieveType_PlayerLevel = 13,
		//	获得X颜色装备;
		AchieveType_AddEquip = 14,
		//	获得X星英雄;
		AchieveType_AddPet = 15,
		//	竞技场积分;
		AchieveType_ChallengePoint = 16,
		//	符文合成;
		AchieveType_CompauseRune = 17,
		//	先知召唤;
		AchieveType_XianzhiCall = 18,
		//	接取X颜色远航订单;
		AchieveType_AccpetSailType = 19,
		//	公会boss击杀次数;
		AchieveType_FactionBossKill = 20,
		//	竞技场排名达到第一名;
		AchieveType_ChallengRank1 = 21,
		//	竞技场排名达到第二名;
		AchieveType_ChallengRank2 = 22,
		//	竞技场排名达到第三名;
		AchieveType_ChallengRank3 = 23,
		//	X个英雄达到Y级;
		AchieveType_PetLevel = 24,
		//	拥有X个好友;
		AchieveType_FriendCount = 25,
		//	英雄远征通关第X关;
		AchieveType_ExpeditionStage = 26,
		//	加入公会;
		AchieveType_JoinFaction = 27,
		//	献祭X个英雄;
		AchieveType_PetSplit = 28,
		//	战力达到X;
		AchieveType_Fightpower = 29,
		//	参与1次星河神殿;
		AchieveType_TempleFight = 30,
		//	竞技场排名达到前多少名;
		AchieveType_ChallengRankDown = 31,
		//	通关挂机关卡X关;
		AchieveType_HookStage = 32,
		//	进行X次高级召唤;
		AchieveType_AdvancePetCall = 33,
		//	X商店购买X次;
		AchieveType_ShopBuyCount = 34,
		//	试练塔通关X关;
		AchieveType_TowerStage = 35,
		//	合成X星英雄X次;
		AchieveType_PetCompoundCount = 36,
		//	超凡段位赛达到X段位;
		AchieveType_DanStage = 37,
		//	累充x毛;
		AchieveType_Charge = 38,
		//	完成X颜色以上的远航订单;
		AchieveType_CompleteSailType = 39,
		//	PVP中跨战力战胜对手;
		AchieveType_PvpFightpowerWin = 40,
		//	PVP中满血战胜高于自身的玩家;
		AchieveType_PvpFullHpWinHigh = 41,
		//	PVP中累计用魔神之锤眩晕敌人次数;
		AchieveType_PvpMoshenDizze = 42,
		//	PVP中单场战斗触发保命/神佑;
		AchieveType_PvpShenyouOneFight = 43,
		//	PVP中单场战斗复活X位英雄;
		AchieveType_PvpReliveOneFight = 44,
		//	PVP中单场战斗触发X次闪避;
		AchieveType_PvpDodgeOneFight = 45,
		//	PVP中任意英雄单场伤害量达到X万;
		AchieveType_PvpDamagePet = 46,
		//	PVP中任意英雄单场治疗量达到x万;
		AchieveType_PvpCurePet = 47,
		//	PVP中使用神器累计达到100次;
		AchieveType_PvpArtifactKill = 48,
		//	远航刷新x次;
		AchieveType_SailRefresh = 49,
		//	解锁神器x件;
		AchieveType_ArtifactNum = 50,
		//	神器x达到x级;
		AchieveType_ArtifactLevel = 51,
		//	无尽试炼达到x关;
		AchieveType_EndlessStage = 52,
		//	无尽试炼派遣英雄X次;
		AchieveType_EndlessSentHero = 53,
		//	寻宝X次;
		AchieveType_Treasure = 54,
		//	x个英雄达到y阶;
		AchieveType_HeroAdvance = 55,
		//	vip等级达到x;
		AchieveType_VIPLevel = 56,
		//	x个五星英雄达到y级;
		AchieveType_5StarPetLevel = 57,
		//	解锁xxx元灵;
		AchieveType_UnLockArtifact = 58,
		//	获得x个五星光系，或者暗系英雄;
		AchieveType_5StarLightDarkPet = 59,
		//	获得x个y级星石;
		AchieveType_Stone = 60,
		//	神界冒险达到x层;
		AchieveType_Risk = 61,
		//	点金多少次;
		AchieveType_ClickGold = 62,
		//	获得id为x的英雄;
		AchieveType_GotHero = 63,
		//	工会x职业等级y;
		AchieveType_FactionJob = 64,
		//	获得特权卡x;
		AchieveType_Card = 65,
		//	完成成就x;
		AchieveType_Achieve = 66,
		//	天命之子次日登陆;
		AchieveType_SonOfDestinyLogin = 67,
		//	获得x星红色装备;
		AchieveType_AddRedEquip = 68,
		//	冠军赛竞猜x次;
		AchieveType_ChampionGuess = 69,
		//	组队征战挑战x次;
		AchieveType_TeamCompain = 70,
		//	公会战挑战x次;
		AchieveType_FactionWar = 71,
		//	合成装备x次;
		AchieveType_ForgeEquip = 72,
		//	竞技场胜利x次;
		AchieveType_ChallengeWin = 73,
		//	组队征战x关;
		AchieveType_TeamCompainStage = 74,
		//	公会战胜利x次;
		AchieveType_FactionWarWin = 75,
		//	洗练星石x次;
		AchieveType_RefineRune = 76,
		//	获得金币x;
		AchieveType_Gold = 77,
		//	获得英雄经验x;
		AchieveType_HeroExp = 78,
		//	冠军赛x名;
		AchieveType_ChampionRank = 79,
		//	日活跃度达到x;
		AchieveType_DailyLiveness = 80,
		//	周活跃度达到x;
		AchieveType_WeeklyLiveness = 81,
		//	消耗x钻石;
		AchieveType_ExpendDiamond = 82,
		//	升星x次;
		AchieveType_UpStarTimes = 83,
		//	许愿模块：某类抽奖次数	_emLotteryType;
		AchieveType_LotteryTimes = 85,
		//	召唤模块：某类型xx抽卡类次数, _emPetCallType;
		AchieveType_CallTimes = 86,
		//	升级公会技能;
		AchieveType_Faction_UpSkill = 100,
		//	公会捐献;
		AchieveType_Faction_Donate = 102,
		//	发送任意红包;
		AchieveType_Faction_RedPaket = 103,
		//	公会副本增益加成	;
		AchieveType_Faction_CopymapProfit = 104,
		//	图鉴皮肤激活x只;
		AchieveType_Illustration = 105,
		//	图鉴加成战力达到x;
		AchieveType_IllustrationPower = 106,
	}
	/**
	*------------------------------ 商店类型
	*/
	enum _emShopType {
		//	百货-道具商店;
		ShopType_Item = 1,
		//	百货-精灵商店;
		ShopType_Pet = 2,
		//	百货-积分商店-狩猎;
		ShopType_Expedition = 3,
		//	百货-积分商店-竞技;
		ShopType_Challenge = 4,
		//	百货-积分商店-公会;
		ShopType_Faction = 5,
		//	百货-积分商店-段位;
		ShopType_Grading = 6,
		//	梦幻抽卡-梦幻商店;
		ShopType_Xianzhi = 7,
		//	跨服天梯-积分商店;
		ShopType_Ladder = 8,
		//	海岛乐园-饰品商店;
		ShopType_GodSuit = 9,
		//	百货-积分商店-遗迹;
		ShopType_Team = 10,
		//	牛X商城;
		ShopType_NB = 11,
		//	百货-积分商店-对战塔;
		ShopType_Tower = 12,
		//	百货-积分商店-大师塔;
		ShopType_MasterTower = 13,
		//	百货-积分商店-周冠赛;
		ShopType_WeekChampion = 14,
		//	神秘岛-冒险商店;
		ShopType_Adventure = 20,
		//	公共商店 客户端;
		ShopType_Common = 99,
		//	最大固定商店;
		ShopType_MaxFix = 100,
		//	百货-积分商店-探宝;
		ShopType_Treasure = 101,
		//	百货-天赋商店;
		ShopType_Skill = 102,
		//	喵喵购物车;
		ShopType_Sprite = 103,
		//	百货-积分商店-跨竞;
		ShopType_CrossChallenge = 110,
	}
	/**
	*------------------------------ 商店随机类型
	*/
	enum _emShopGroupRandType {
		//	按次数随机;
		ShopGroupRandType_Count = 1,
		//	按概率随机;
		ShopGroupRandType_Rate = 2,
	}
	/**
	*------------------------------ 帮派捐献类型
	*/
	enum _emFactionDonateType {
		//	金币捐献;
		FactionDonateType_Gold = 1,
		//	钻石捐献;
		FactionDonateType_Diamond = 2,
		//	至尊钻石捐献;
		FactionDonateType_BigDiamond = 3,
	}
	/**
	*------------------------------ 远征类型
	*/
	enum _emExpeditionType {
		//	简单;
		ExpeditionType_Simple = 1,
		//	困难;
		ExpeditionType_Difficulty = 2,
		//	地狱;
		ExpeditionType_Hell = 3,
	}
	/**
	*------------------------------ 神殿类型
	*/
	enum _emTempleType {
		//	万殿之巅;
		TempleType_Wandian = 1,
		//	泰坦神耀;
		TempleType_Taitan = 2,
		//	瀚海星灵;
		TempleType_Xingling = 3,
	}
	/**
	*------------------------------ 世界服公共数据类型
	*/
	enum _emWorldDataType {
		//	基础信息;
		WorldDataType_Base = 0,
		//	神殿数据;
		WorldDataType_Temple = 1,
		//	排行榜数据;
		WorldDataType_TopList = 2,
		//	活动数据;
		WorldDataType_Activity = 3,
	}
	/**
	*------------------------------ 录像离线数据
	*/
	enum _emVideo_Offline {
		//	增加记录	PBFightResult;
		Video_Offline_AddRecord = 0,
	}
	/**
	*------------------------------ 外观离线数据
	*/
	enum _emShape_Offline {
		//	删除称号	PBU32;
		Shape_Offline_DelTitle = 0,
		//	增加称号	PBU32;
		Shape_Offline_AddTitle = 1,
	}
	/**
	*------------------------------ 跨服天梯离线数据
	*/
	enum _emLadder_Offline {
		//	增加记录	PBPlayerLadderRecord;
		Ladder_Offline_AddRecord = 0,
	}
	/**
	*------------------------------ 平台离线数据
	*/
	enum _emPlatform_Offline {
		//	充值	PBRechargeInfo;
		Platform_Recharge = 0,
		//	模拟充值	PBRechargeInfo;
		Platform_Recharge_GM = 1,
	}
	/**
	*------------------------------ 好友离线数据
	*/
	enum _emFriend_Offline {
		//	申请加好友	PBPlayerFriendInfo;
		Friend_Offline_Apply = 0,
		//	增加好友		PBU32;
		Friend_Offline_Add = 1,
		//	删除好友		PBU32;
		Friend_Offline_Del = 2,
		//	接收礼物		PBU32;
		Friend_Offline_RecievePrize = 3,
	}
	/**
	*------------------------------ 角色标示
	*/
	enum _emPlayerMark {
		//测试;
		PlayerMark_Test = 0,
	}
	/**
	*------------------------------ 系统功能 对应cs_system_switch表的id
	*/
	enum _emSystemSwitchType {
		//   日常任务;
		SystemSwitch_DailyTask = 1,
		//   神器;
		SystemSwitch_Weapon = 2,
		//   历练;
		SystemSwitch_Trave = 3,
		//   公会;
		SystemSwitch_Faction = 4,
		//   图书馆;
		SystemSwitch_Library = 5,
		//   祭祀小屋;
		SystemSwitch_Sacrifice = 6,
		//   竞技场;
		SystemSwitch_Challenge = 7,
		//   试炼塔;
		SystemSwitch_StarTower = 8,
		//   秘境探险--海岛探险;
		SystemSwitch_Risk = 9,
		//  跨服战场;
		SystemSwitch_CrossWar = 10,
		//  先知圣殿;
		SystemSwitch_Seer = 11,
		//  元素圣殿;
		SystemSwitch_Element = 12,
		//  天界副本 --海岛乐园;
		SystemSwitch_Heaven = 13,
		//  天界副本--海岛乐园;
		SystemSwitch_Heaven2 = 14,
		//  跨服时空;
		SystemSwitch_AcrossSpace = 15,
		//  融合神殿;
		SystemSwitch_PetCombin = 16,
		//  跨服天梯;
		SystemSwitch_AcrossLadder = 17,
		//  超凡段位赛;
		SystemSwitch_Dan = 18,
		//  跨服竞技场;
		SystemSwitch_AcrossChallenge = 19,
		//  远航;
		SystemSwitch_Sail = 20,
		//  商城;
		SystemSwitch_Shop = 21,
		//  精灵商店;
		SystemSwitch_ElfShop = 22,
		//  家园;
		SystemSwitch_Home = 23,
		//  召唤;
		SystemSwitch_Call = 24,
		//  锻造屋;
		SystemSwitch_Enhance = 25,
		//  七日登录;
		SystemSwitch_Signin = 26,
		//  七日目标;
		SystemSwitch_WeekTarget = 27,
		//  周竞技场;
		SystemSwitch_WeekChampion = 28,
		// 狩猎地带;
		SystemSwitch_Hunting = 30,
		//  天命之子;
		SystemSwitch_SonOfDestiny = 39,
		//  巅峰挑战;
		SystemSwitch_PeakChallenge = 40,
		// 大师对战塔;
		SystemSwitch_MasterStarTower = 51,
		//  守护;
		SystemSwitch_Defend = 60,
		//  共鸣等级;
		SystemSwitch_ResonanceLevel = 61,
		//  共鸣星级;
		SystemSwitch_ResonanceStar = 62,
	}
	/**
	*------------------------------ 徽章类型
	*/
	enum _emBadgeType {
		//试炼之塔;
		BadgeType_Train = 1,
		//无尽试炼;
		BadgeType_Endless = 2,
		//远征;
		BadgeType_Expedition = 3,
		//公会战;
		BadgeType_FactionWar = 4,
		//神界冒险;
		BadgeType_Risk = 5,
		//冠军赛;
		BadgeType_Champion = 6,
		//周冠军赛;
		BadgeType_WeekChampion = 7,
		//元素神殿;
		BadgeType_Element = 8,
		//超凡段位赛;
		BadgeType_Dan = 9,
		//特殊成就;
		BadgeType_Achieve = 10,
		//特殊;
		BadgeType_Specail = 11,
	}
	/**
	*------------------------------ 查看类型
	*/
	enum _emQueryPlayerViewType {
		//主界面;
		QueryPlayerViewType_Main = 1,
		//个人信息;
		QueryPlayerViewType_Info = 2,
		//荣誉墙;
		QueryPlayerViewType_Honor = 3,
		//成长之路;
		QueryPlayerViewType_Record = 4,
		//留言板;
		QueryPlayerViewType_Message = 5,
	}
	/**
	*------------------------------ 录像类型
	*/
	enum _emVideoStageType {
		//时间最快;
		VideoStageType_Fast = 1,
		//战斗力最低;
		VideoStageType_MinFightpower = 2,
		//时间最近;
		VideoStageType_Lately = 3,
	}
	/**
	*------------------------------ 录像类型
	*/
	enum _emVideoType {
		//挂机BOSS;
		VideoType_Hook = 1,
		//试练塔	;
		VideoType_Tower = 2,
		//竞技场;
		VideoType_Challenge = 3,
		//星河神殿	;
		VideoType_Temple = 4,
		//公会战;
		VideoType_FactionWar = 5,
		//神界冒险;
		VideoType_Risk = 6,
		//超凡段位赛;
		VideoType_Dan = 7,
		//跨服天梯赛;
		VideoType_Ladder = 8,
		//新英雄集锦;
		VideoType_NewPet = 9,
		//冠军赛;
		VideoType_Champion = 10,
		//周冠军赛;
		VideoType_WeekChampion = 11,
		//本周热门;
		VideoType_WeekHot = 12,
		//个人收藏;
		VideoType_PlayerCollect = 13,
		//个人记录;
		VideoType_PlayerRecord = 14,
		//玩家的试练塔录像;
		VideoType_PlayerTower = 15,
		//玩家的切磋录像;
		VideoType_PlayerQiecuo = 16,
		//远征录像;
		VideoType_PlayerExpdition = 17,
		//试练塔2;
		VideoType_Tower2 = 18,
	}
	/**
	*------------------------------ 录像存储类型
	*/
	enum _emVideoSaveType {
		//系统;
		VideoSaveType_System = 1,
		//个人;
		VideoSaveType_Player = 2,
		//都存储;
		VideoSaveType_All = 3,
	}
	/**
	*------------------------------ 录像存储类型
	*/
	enum _emVideoSavePrevTag {
		//  以角色ID为目录来保存录像数据文件;
		VideoSavePrevTag_Player = 0,
		//  会存放到一个公用目录中的文件;
		VideoSavePrevTag_Common = 1,
	}
	/**
	*------------------------------ 前提条件
	*/
	enum _emPreCondition {
		//	没有前提条件;
		PreCondition_None = 0,
		//	需要皮肤ID;
		PreCondition_NeedSkin = 1,
		//	需要伙伴ID;
		PreCondition_NeedPetID = 2,
		//	需要星级;
		PreCondition_NeedStar = 3,
		//	需要玩家等级;
		PreCondition_NeedPlayerLevel = 4,
		//	需要VIP等级;
		PreCondition_NeedVipLevel = 5,
		//	需要天界等级;
		PreCondition_NeedSkyLevel = 6,
		//	需要特权卡;
		PreCondition_NeedCard = 7,
		//	需要战力;
		PreCondition_NeedFightpower = 8,
	}
	/**
	*------------------------------ 充值购买类型
	*/
	enum _emChargeType {
		// 	 购买元宝;
		ChargeType_Cash = 0,
		// 	 超值首冲;
		ChargeType_FirstPack = 1,
		//	 每日礼包;
		ChargeType_DailyPack = 2,
		//	 开服周礼包;
		ChargeType_ServerWeekPack = 3,
		//	 开服月礼包;
		ChargeType_ServerMonthPack = 4,
		//	 折扣礼包;
		ChargeType_DiscountPack = 5,
		//	 限时礼包;
		ChargeType_LimitTimePack = 6,
		//	 特权卡;
		ChargeType_PrivilegeCard = 7,
		//	 成长基金;
		ChargeType_GrowFund = 8,
		//	 皮肤礼包;
		ChargeType_SkinPack = 9,
		//	 升级礼包;
		ChargeType_LevelPack = 10,
		//	 神装礼包;
		ChargeType_GodPack = 11,
		//	 月基金;
		ChargeType_MonthFund = 12,
		//	 短期礼包;
		ChargeType_ShortTermPack = 13,
		//	 冲榜活动;
		ChargeType_ActivityRank = 14,
		//	 五倍返利;
		ChargeType_FiveTimes = 15,
		//	 7日登录;
		ChargeType_7DayLogin = 16,
		//	 助力礼包 ;
		ChargeType_Help = 17,
		//	 战令 ;
		ChargeType_WarOrder = 18,
		//	 限购礼包 ;
		ChargeType_LimitGift = 19,
		//	 跨服冲榜活动;
		ChargeType_ActivityCrossRank = 20,
		//	 春节战令 ;
		ChargeType_Activity_WarOrder = 21,
		//	定制礼包;
		ChargeType_Activity_CustomGift = 22,
		//	赠送礼物（需要填写地址）;
		ChargeType_Activity_GiftGiving = 23,
	}
	/**
	*------------------------------ 特权卡
	*/
	enum _emPrivilegeCard {
		//精灵孵化特权;
		PrivilegeCard_Elf = 1,
		//快速作战特权;
		PrivilegeCard_Hook = 2,
		//元素神殿特权;
		PrivilegeCard_Element = 3,
		//远航高级特权;
		PrivilegeCard_SailAdvance = 4,
		//远航豪华特权;
		PrivilegeCard_SailSuper = 5,
		//成长基金;
		PrivilegeCard_GrowFund = 6,
		//月基金128;
		PrivilegeCard_MonthFund1 = 7,
		//月基金328;
		PrivilegeCard_MonthFund2 = 8,
		//至尊月卡;
		PrivilegeCard_MonthZZCard = 9,
		//荣耀月卡;
		PrivilegeCard_MonthRYCard = 10,
		//超值首冲;
		PrivilegeCard_FirstCharge = 11,
		//每日首冲;
		PrivilegeCard_DailyCharge = 12,
		//每日首冲;
		PrivilegeCard_DailyCharge2 = 13,
		//每日首冲;
		PrivilegeCard_DailyCharge3 = 14,
		//战令特权;
		PrivilegeCard_WarOrder = 20,
	}
	/**
	*------------------------------ 特权类型
	*/
	enum _emPrivilegeType {
		//装备一键合成;
		PrivilegeType_EquipAutoCompound = 1,
		//副本购买次数;
		PrivilegeType_CopymapBuyCount = 2,
		//挂机经验（百分数）;
		PrivilegeType_HookExp = 3,
		//挂机金币数（百分数）;
		PrivilegeType_HookGold = 4,
		//挂机英雄经验（百分数）;
		PrivilegeType_HookHeroExp = 5,
		//挂机时长(分钟);
		PrivilegeType_HookTime = 6,
		//点金(百分比);
		PrivilegeType_ClickGold = 7,
		//购买试炼塔(次数);
		PrivilegeType_Train = 8,
		//英雄背包格数;
		PrivilegeType_HeroSpace = 9,
		//探宝免费次数;
		PrivilegeType_FreeTreasure = 10,
		//竞技场购买次数;
		PrivilegeType_ChallengeBuyCount = 11,
		//精灵商店刷新次数;
		PrivilegeType_SpriteShopRefreshCount = 12,
		//远航高级特权;
		PrivilegeType_SailAdvance = 13,
		//远航豪华特权;
		PrivilegeType_SailSuper = 14,
		//元素圣殿额外免费次数;
		PrivilegeType_ElementFreeCount = 15,
		//元素圣殿额外购买次数;
		PrivilegeType_ElementBuyCount = 16,
		//快速战斗免费次数;
		PrivilegeType_HookFreeCount = 17,
		//快速战斗额外购买次数;
		PrivilegeType_HookExtraBuyCount = 18,
		//战斗速度x2,客户端使用;
		PrivilegeType_BattleSpeedX2 = 19,
		//商城1折优惠商品,客户端使用;
		PrivilegeType_Shop90PercentOff = 20,
		//探宝15连抽,客户端使用;
		PrivilegeType_TreasureX15 = 21,
		//英雄积分召唤,客户端使用;
		PrivilegeType_HeroPointCall = 22,
		//激活专属头像,客户端使用;
		PrivilegeType_HeadID = 23,
		//激活专属头像框,客户端使用;
		PrivilegeType_HeadIcon = 24,
		//增加远航点数最大值;
		PrivilegeType_SailPoint = 25,
	}
	/**
	*签到状态
	*/
	enum _emWealSigninState {
		//	 可以领取;
		Weal_Signin_Available = 1,
		//	 已经领取，可以再领取一次, 签到天数 + 1;
		Weal_Signin_OnceMore = 2,
		//	 已经完成;
		Weal_Signin_Complete = 3,
	}
	/**
	*------------------------------活动类型
	*/
	enum _emActivityType {
		//	 充值累计金额;
		Activity_Charge_Amount = 1,
		//	 充值累计天数;
		Activity_Charge_Days = 2,
		//	 升级奖励;
		Activity_Leveup = 3,
		//	 计次奖励;
		Activity_Times = 4,
		//	 兑换;
		Activity_Exchange = 5,
		//	 首充;
		Activity_FirstCharge = 6,
		//	 成长基金;
		Activity_GrowFund = 7,
		//	 基金;
		Activity_Fund = 8,
		//	 登录;
		Activity_Login = 9,
		//	 短期礼包;
		Activity_ShortTermGift = 10,
		//	 目标;
		Activity_Achievement = 11,
		//	 冲榜活动;
		Activity_Rank = 12,
		//	 0元购;
		Activity_ZeroBuy = 13,
		//	 限购礼包;
		Activity_LimitGift = 14,
		//	 活动激活;
		Activity_ACTIVE = 15,
		//	 保底抽奖;
		Activity_Lottery = 16,
		//	 成就之路;
		Activity_AchieveRoad = 17,
		//	 每日限购活动;
		Activity_LimitDayGift = 18,
		//	 红包;
		Activity_RedEnvelope = 19,
		//	 加强版兑换	;
		Activity_ExchangeEx = 20,
		//	 战令;
		Activity_WarOrder = 21,
		//	 跨服冲榜	;
		Activity_CrossRank = 22,
		//	 猜猜猜活动;
		Activity_Guess = 23,
		//	 欢乐连连看;
		Activity_JoyousLinkup = 24,
		// 	周末福蛋;
		Activity_LuckyEgg = 25,
		//	定制礼包;
		Activity_CustomGift = 26,
		//	活动boss;
		Activity_Boss = 27,
	}
	/**
	*------------------------------活动选项
	*/
	enum _emActivityOption {
		//  空壳活动,无视活动类型,没有实际内容, 参数：无;
		ActivityOption_Hollow = 1,
		//  持续时长,无视结束时间, 参数: 天数;
		ActivityOption_Duration = 2,
		//  开启时开启其他活动, 参数：活动ID_活动ID_....;
		ActivityOption_OpenOpen = 3,
		//  结束时结束其他活动, 参数：活动ID_活动ID_....;
		ActivityOption_CloseClose = 4,
		//  开启时结束其他活动, 参数：活动ID_活动ID_....;
		ActivityOption_OpenClose = 5,
		//  结束时开启其他活动, 参数：活动ID_活动ID_....;
		ActivityOption_CloseOpen = 6,
		//  不使用时间开关活动, 参数：无;
		ActivityOption_NotUseTime = 7,
		//  多少天之后重置，无视重置时间，参数：天数;
		ActivityOption_ResetDuration = 8,
		//  服务器开起来之后即开启，参数：无;
		ActivityOption_StartServerOpen = 9,
		//  开服多少天后，再按活动配置时间来驱动 开起来之后即开启 	;
		ActivityOption_StartTimeInterval = 10,
	}
	/**
	*------------------------------计次活动类型
	*/
	enum _emActivityTimesType {
		//	 点石成金;
		Activity_Times_ClickGold = 1,
		//	 远航;
		Activity_Times_Voyage = 2,
		//	 远征;
		Activity_Times_Expedition = 3,
		//	 快速作战;
		Activity_Times_Raid = 4,
		//	 神界冒险;
		Activity_Times_Risk = 5,
	}
	/**
	*------------------------------登录
	*/
	enum _emActivityLoginType {
		//	 7天登陆;
		Activity_Login_7Day = 1,
		//	 新春累登;
		Activity_Login_Total = 2,
	}
	/**
	*------------------------------短期礼包触发类型
	*/
	enum _emActivityShortTermGiftTrigger {
		// 获得英雄，参数：英雄的星;
		Activity_ShortTermGiftTrigger_Hero = 1,
		// 获得道具，参数：道具类型；等级；品质；评分;
		Activity_ShortTermGiftTrigger_Item = 2,
		// 玩家等级，参数：等级;
		Activity_ShortTermGiftTrigger_Level = 3,
		// 英雄等级，参数：等级;
		Activity_ShortTermGiftTrigger_HeroLevel = 4,
	}
	/**
	*------------------------------冲榜类型
	*/
	enum _emActivityRankType {
		//	 英雄榜;
		Activity_Rank_Hero = 1,
		//	 等级榜;
		Activity_Rank_Level = 2,
		//	 战力榜;
		Activity_Rank_Power = 3,
		//	 装备榜;
		Activity_Rank_Equip = 4,
		//	 充值榜;
		Activity_Rank_Charge = 5,
		//	 英雄等级榜;
		Activity_Rank_HeroLevel = 6,
		//	 图鉴积分榜;
		Activity_Rank_Illustration = 7,
		//	 英雄星级榜;
		Activity_Rank_StarUp = 8,
	}
	/**
	*------------------------------跨服冲榜类型
	*/
	enum _emActivityCrossRankType {
		//	 抽卡榜;
		Activity_CrossRank_Hero = 1,
		//	 战力榜;
		Activity_CrossRank_Power = 2,
		//	 图鉴积分榜;
		Activity_CrossRank_Illustration = 3,
		//	 英雄星级榜;
		Activity_CrossRank_StarUp = 4,
	}
	/**
	*------------------------------ dip名字类型
	*/
	enum _emDipNameType {
		//道具名;
		DipNameType_Item = 1,
		//公告名;
		DipNameType_Notice = 2,
		//充值名;
		DipNameType_Charge = 3,
	}
	/**
	*------------------------------ 禁言操作
	*/
	enum _emTalkOperate {
		// 禁言 PBGMTalkForbid;
		TalkOperate_Forid = 0,
		// 解禁;
		TalkOperate_UnForbid = 1,
	}
	/**
	*------------------------------ 日志类型
	*/
	enum _emLogType {
		// 九五日志;
		LogType_Jiuwu = 0,
		// 九五客户端日志;
		LogType_Client = 1,
		// 中心服;
		LogType_CenterHttp = 2,
	}
	/**
	*------------------------------ 天界副本星星条件
	*/
	enum _emHeavenDungeonStarCondition {
		//  战斗胜利;
		StarCondition_Victory = 1,
		//  x类型的英雄小于y个;
		StarCondition_HeroTypeUnder = 2,
		//  x职业的英雄小于y个;
		StarCondition_HeroJobUnder = 3,
		//  x类型的英雄至少y个;
		StarCondition_HeroTypeAtLeast = 4,
		//  x职业的英雄至少y个;
		StarCondition_HeroJobAtLeast = 5,
		//  没有死亡;
		StarCondition_NoDeath = 6,
		//  HP至少百分之x以上;
		StarCondition_HPAbove = 7,
		//  回合数小于x;
		StarCondition_TurnsUnder = 8,
		//  阵型为x;
		StarCondition_Formation = 9,
	}
	/**
	*------------------------------ 世界服物品记录
	*/
	enum _emWorldItemLogType {
		// 探宝;
		WorldItemLog_Treasure = 1,
		// 高级探宝;
		WorldItemLog_AdvTreasure = 2,
		// 天界副本祈祷1;
		WorldItemLog_Pray1 = 3,
		// 天界副本祈祷2;
		WorldItemLog_Pray2 = 4,
		// 天界副本祈祷3;
		WorldItemLog_Pray3 = 5,
		// 天界副本祈祷4;
		WorldItemLog_Pray4 = 6,
		// 天界副本祈祷5;
		WorldItemLog_Pray5 = 7,
	}
	/**
	*------------------------------ 切磋状态
	*/
	enum _emFightEachOtherState {
		// 空闲;
		FightEachOtherState_Free = 1,
		// 等待目标数据;
		FightEachOtherState_Wait = 2,
		// 已经结束等待获取结果;
		FightEachOtherState_Result = 3,
	}
	/**
	*------------------------------ 支援类型
	*/
	enum _emFriendSupportType {
		// 无尽试炼支援;
		FriendSupportType_Endless = 1,
		// 远征支援;
		FriendSupportType_Expedition = 2,
		// 组队征战支援;
		FriendSupportType_TeamCampaign = 3,
	}
	/**
	*家具使用状态
	*/
	enum _emFurnitureState {
		//当前家具正在使用;
		Furniture_use = 1,
		//当前家具没有使用;
		Furniture_nouse = 2,
	}
	/**
	*精灵位置
	*/
	enum _emElfTreePosition {
		//	一号位置;
		ElfTreePosition_one = 1,
		//	二号位;
		ElfTreePosition_two = 2,
		//	三号位;
		ElfTreePosition_three = 3,
		//	四号位;
		ElfTreePosition_four = 4,
	}
	/**
	*------------------------------ 公共战斗序列号空间
	*/
	enum _emCommonBattleSeqSpan {
		// 								冠军赛开始;
		CommonBattleSeq_ChampionBegin = 268435457,
		// 						冠军赛结束;
		CommonBattleSeq_ChampionEnd = 536870912,
		// 						周冠军赛开始;
		CommonBattleSeq_WeekChampionBegin = 536870913,
		// 						周冠军赛结束;
		CommonBattleSeq_WeekChampionEnd = 805306368,
	}
	/**
	*------------------------------ 组队征战参与条件
	*/
	enum _emTeamCampaignCondition {
		// 	指定英雄 参数: 英雄ID_英雄ID_ ....;
		TeamCampaignCondition_Hero = 1,
		// 	指定职业 参数: 职业ID_职业ID_ ....;
		TeamCampaignCondition_Job = 2,
		// 	指定阵容 参数: 阵容index_阵容index_ ...;
		TeamCampaignCondition_Formation = 3,
	}
	/**
	*------------------------------ 组队征战额外奖励类型
	*/
	enum _emTeamCampaignExtraPrize {
		// 	回复出战英雄血量 参数: 回复百分比;
		TeamCampaignExtraPrize_Heal = 1,
		// 	复活已死英雄 参数: 复活血量百分比;
		TeamCampaignExtraPrize_Revive = 2,
		// 	技能 参数: 技能Index;
		TeamCampaignExtraPrize_Skill = 3,
	}
	/**
	*------------------------------ 战斗位置区间
	*/
	enum _emBattlePos {
		// 	出场英雄;
		BattlePos_Pet = 0,
		// 	神器;
		BattlePos_Artifact = 100,
		// 	精灵;
		BattlePos_Elf = 200,
		// 	守护;
		BattlePos_Defend = 300,
	}
	/**
	*------------------------------ 帮会事件类型
	*/
	enum _emFactionEventType {
		// 加入;
		FactionEventType_Join = 1,
		// 退出;
		FactionEventType_Quit = 2,
		// 公会战 			参数：几颗星;
		FactionEventType_War = 3,
		// 捐赠				参数：捐赠类型;
		FactionEventType_Donate = 4,
		// 领取活跃度奖励	 参数：活跃度等级;
		FactionEventType_Liveness = 5,
		// 会长变更;
		FactionEventType_Leader = 6,
		// 提升副会长;
		FactionEventType_Job = 7,
		// 弹劾会长;
		FactionEventType_Impeach = 8,
	}
	/**
	*------------------------------ 校验类型
	*/
	enum _emSignType {
		// 中心服上报 参数：没有;
		Sign_Center = 1,
		// 调查问卷 参数：question_id;
		Sign_Survey = 2,
		// 举报 参数：没有;
		Sign_Report = 3,
		// 意见反馈 参数：没有;
		Sign_Feedback = 4,
		// 引导记录 参数：没有;
		Sign_Guide = 5,
	}
	/**
	*------------------------------ 战令类型
	*/
	enum _emWarOrderType {
		//	战令每日任务;
		WarOrder_Day = 1,
		//	战令每周任务;
		WarOrder_Week = 2,
		//	战令每月任务;
		WarOrder_Month = 3,
	}
	/**
	*------------------------------ 战令类型
	*/
	enum _emCommonPrizeType {
		//	微享;
		CommonPrize_WeShare = 1,
		//	Q享;
		CommonPrize_QQShare = 2,
		//	关注;
		CommonPrize_Subscribe = 3,
		//	微端;
		CommonPrize_WD = 4,
		//	实名认证;
		CommonPrize_Verify = 5,
		//	桌面;
		CommonPrize_Desktop = 6,
	}
	/**
	*----------------------------对战塔类型
	*/
	enum _emTowerType {
		//对战塔;
		TOWER_TYPE_COMMON = 1,
		//大师对战塔;
		TOWER_TYPE_MONSTER = 2,
	}
	/**
	*----------------------------宠物状态
	*/
	enum _emPetStateType {
		// 	无其他状态;
		PetStateType_Normal = 0,
		// 	战斗;
		PetStateType_Fight = 1,
		// 	守护;
		PetStateType_Defend = 2,
		// 	共鸣等级;
		PetStateType_ResonanceLevel = 3,
		// 	共鸣星级;
		PetStateType_ResonanceStar = 4,
	}
	/**
	*------------------------------ 相关系统订单类型
	*/
	enum _emOrderType {
		// 	盲盒;
		OrderType_BlindBox = 1,
		// 	守护;
		OrderType_MAX = 100,
	}
	/**
	*------------------------------ 跨服redis系统key类型
	*/
	enum _emRedisKeyType {
		// 	跨服竞技场;
		RedisKeyType_CrossRank = 1,
		// 	周冠军赛排行榜;
		RedisKeyType_WeekChampionRank = 2,
		// 	守护;
		RedisKeyType_MAX = 100,
	}
	/**
	*------------------------------ redis玩家系统数据保存key
	*/
	enum _emRedisPlayerSystemType {
		// 	玩家竞技场数据;
		RedisPlayerSystemKey_challenge = 1,
		// 	玩家排行榜数据;
		RedisPlayerSystemKey_toplist = 2,
		// 	守护;
		RedisPlayerSystemKey_MAX = 100,
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 邮件相关
	*/
	enum _emResultMail_7 {
		//  成功;
		R_ResultMail_Succeed = 0,
		//  失败;
		R_ResultMail_Fail = 1,
		//  背包已满;
		R_ResultMail_BagFull = 2,
		//  已经领取过;
		R_ResultMail_HaveReward = 3,
		//  无此邮件;
		R_ResultMail_NoMail = 4,
		//  此邮件无奖励;
		R_ResultMail_NoRewardItem = 5,
		//  有附件未领取;
		R_ResultMail_ItemNoReward = 6,
	}
	/**
	*--- 客户端到服务器
	*/
	enum _emC2S_Mail_Protocol {
		//读取邮件	PBMailID;
		C2S_Mail_Read = 0,
		//领取奖励	PBMailID;
		C2S_Mail_Reward = 1,
		//领取所有奖励  无内容;
		C2S_Mail_RewardAll = 2,
		//删除邮件	PBMailID;
		C2S_Mail_Delete = 3,
		//领取所有邮件  无内容;
		C2S_Mail_DeleteAll = 4,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_Mail_Protocol {
		//新邮件 	PBMail;
		S2C_Mail_New = 0,
		//删除返回	 PBAllMailID;
		S2C_Mail_Delete = 1,
		//已读返回	PBMailID;
		S2C_Mail_Read = 2,
		//领取返回	PBAllMailID;
		S2C_Mail_Reward = 3,
	}
	/**
	* 邮件
	*/
	class PBMailID {
		constructor();
		/**邮件ID*/
		public mailid:number;
		public static encode(message: Pb_God.PBMailID, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBMailID, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBMailID;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBMailID;
	}
	/**
	* 邮件
	*/
	class PBAllMailID {
		constructor();
		/**邮件ID*/
		public mailid:number[];
		public static encode(message: Pb_God.PBAllMailID, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBAllMailID, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBAllMailID;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBAllMailID;
	}
}
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

declare namespace Pb_God {
	/**
	*----活动boss的返回
	*/
	enum _emResultActivityBoss_53 {
		//  成功;
		R_ActivityBoss_Succeed = 0,
		//  失败;
		R_ActivityBoss_Fail = 1,
		//  消耗不足;
		R_ActivityBoss_NeedItem = 2,
		//  购买次数不足;
		R_ActivityBoss_BuyCount = 3,
		//  挑战后才能扫荡;
		R_ActivityBoss_Sweep = 4,
	}
	/**
	*----活动boss请求
	*/
	enum _emC2S_ActivityBoss_Protocol {
		// 	 购买次数;
		C2S_ActivityBoss_BuyCount = 1,
		// 	 扫荡;
		C2S_ActivityBoss_Sweep = 2,
	}
	/**
	*----活动boss返回
	*/
	enum _emS2C_ActivityBoss_Protocol {
		// 	 信息改变 PBActivityBossData;
		S2C_ActivityBoss_InfoChg = 1,
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 组队征战
	*/
	enum _emResultTeamCampaign_42 {
		// 成功;
		R_ResultTeamCampaign_Succeed = 0,
		// 失败;
		R_ResultTeamCampaign_Fail = 1,
		// 奖励已经领取;
		R_ResultTeamCampaign_HavePrize = 2,
		// 未通关此关卡;
		R_ResultTeamCampaign_NeedStageID = 3,
		// 需要选择难度	;
		R_ResultTeamCampaign_NeedSelect = 4,
		// 今日已经选择难度;
		R_ResultTeamCampaign_HaveSelect = 5,
		// 战力不足;
		R_ResultTeamCampaign_NeedFightPower = 6,
		// 关卡已经挑战;
		R_ResultTeamCampaign_StageHaveFight = 7,
		// 请先通关前置关卡;
		R_ResultTeamCampaign_NeedPreStage = 8,
		// 伙伴已经死亡;
		R_ResultTeamCampaign_PetHaveDead = 9,
		// 请通关上一个难度;
		R_ResultTeamCampaign_NeedDifficulty = 10,
		// 超过可雇佣支援数量;
		R_ResultTeamCampaign_SupportCount = 11,
		// 已经雇佣过了;
		R_ResultTeamCampaign_AlreadySupport = 12,
		// 还未雇佣不可上场;
		R_ResultTeamCampaign_NotSupport = 13,
		// 已经使用过了;
		R_ResultTeamCampaign_UsedSupport = 14,
		// 雇佣支援英雄战斗力不在范围内;
		R_ResultTeamCampaign_SupportPower = 15,
		// 支援不存在;
		R_ResultTeamCampaign_SupportNotExist = 16,
		// 固定位置;
		R_ResultTeamCampaign_FixedPos = 17,
		// 未达到参与条件;
		R_ResultTeamCampaign_Condition = 18,
	}
	/**
	*----远航模块
	*/
	enum _emC2S_TeamCampaign_Protocol {
		//选择难度(难度 1~10)			PBU32;
		C2S_TeamCampaign_Select = 1,
		//领取额外奖励(序号0 1 2)		PBU32;
		C2S_TeamCampaign_SelectExtraPrize = 2,
		//查询伙伴状态;
		C2S_TeamCampaign_QueryPetState = 3,
		//查询关卡状态;
		C2S_TeamCampaign_QueryStageState = 4,
		//查询敌人数据(stage)	PBU32;
		C2S_TeamCampaign_QueryStageTarget = 5,
		//废弃;
		C2S_TeamCampaign_xxxxxxxxxx = 6,
	}
	/**
	*----远航模块
	*/
	enum _emS2C_TeamCampaign_Protocol {
		//通用返回(失败才返回);
		S2C_TeamCampaign_CommonAck = 1,
		//选择难度返回			PBU32;
		S2C_TeamCampaign_Select = 2,
		//给出三个额外奖励     PBG2CTeamCampaignExtraPrize;
		S2C_TeamCampaign_ExtraPrize = 3,
		//领取奖励返回 		PBU32;
		S2C_TeamCampaign_SelectExtraPrize = 4,
		//同步伙伴状态 	    PBG2CTeamCampaignState;
		S2C_TeamCampaign_SyncPet = 5,
		//同步关卡状态 		PBG2CTeamCampaignStage;
		S2C_TeamCampaign_SyncStage = 6,
		//同步技能		        PBG2CTeamCampaignSkill;
		S2C_TeamCampaign_SyncSkill = 7,
		//同步敌人数据		    PBG2CTeamCampaignTarget;
		S2C_TeamCampaign_SyncTarget = 8,
		//废弃;
		S2C_TeamCampaign_xxxxxxxxx = 9,
		//废弃;
		S2C_TeamCampaign_xxxxxxxxxxxxxx = 10,
	}
	/**
	* pet状态同步
	*/
	class PBG2CTeamCampaignState {
		constructor();
		/** 状态,没有的为满血*/
		public state:Pb_God.PBTeamCampaignPetState[];
		public static encode(message: Pb_God.PBG2CTeamCampaignState, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTeamCampaignState, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTeamCampaignState;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTeamCampaignState;
	}
	/**
	* 敌人显示数据
	*/
	class PBTeamCampaignPetDisplay {
		constructor();
		/**伙伴显示*/
		public display:Pb_God.PBPetDisplay;
		/**最大血量*/
		public maxhp:Long;
		/**当前血量0死亡*/
		public curhp:Long;
		/**位置*/
		public pos:number;
		public static encode(message: Pb_God.PBTeamCampaignPetDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTeamCampaignPetDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTeamCampaignPetDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTeamCampaignPetDisplay;
	}
	/**
	* 敌人信息
	*/
	class PBG2CTeamCampaignTarget {
		constructor();
		/** 关卡stage*/
		public stage:number;
		/** 战力*/
		public fightpower:number;
		/** 显示数据*/
		public display:Pb_God.PBPlayerDisplay;
		/** 关卡显示*/
		public petdisplay:Pb_God.PBTeamCampaignPetDisplay[];
		public static encode(message: Pb_God.PBG2CTeamCampaignTarget, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTeamCampaignTarget, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTeamCampaignTarget;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTeamCampaignTarget;
	}
	/**
	* 关卡同步
	*/
	class PBG2CTeamCampaignStage {
		constructor();
		/** 当前难度*/
		public difficulty:number;
		/** 当前的关卡*/
		public stage:number;
		/** 已经通过的难度*/
		public passed:number[];
		public static encode(message: Pb_God.PBG2CTeamCampaignStage, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTeamCampaignStage, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTeamCampaignStage;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTeamCampaignStage;
	}
	/**
	* 额外奖励         
	*/
	class PBG2CTeamCampaignExtraPrize {
		constructor();
		/** 额外奖励index*/
		public prize:number[];
		public static encode(message: Pb_God.PBG2CTeamCampaignExtraPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTeamCampaignExtraPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTeamCampaignExtraPrize;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTeamCampaignExtraPrize;
	}
	/**
	* 技能同步
	*/
	class PBG2CTeamCampaignSkill {
		constructor();
		/** skill index*/
		public skill:number[];
		public static encode(message: Pb_God.PBG2CTeamCampaignSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTeamCampaignSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTeamCampaignSkill;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTeamCampaignSkill;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 成就相关
	*/
	enum _emResultAchieve_18 {
		// 成功;
		R_ResultAchieve_Succeed = 0,
		// 失败;
		R_ResultAchieve_Fail = 1,
		// 条件未达成;
		R_ResultAchieve_NeedCondition = 2,
		// 已经领取过;
		R_ResultAchieve_HavePrize = 3,
		// 道具不足;
		R_ResultAchieve_NeedItem = 4,
		// 需要主线类型;
		R_ResultAchieve_NeedMain = 5,
		// 等级不足;
		R_ResultAchieve_NeedLevel = 6,
		// 需要权限;
		R_ResultAchieve_NeedPrivilege = 7,
	}
	/**
	*----成就模块
	*/
	enum _emC2S_Achieve_Protocol {
		// 	 活跃完成		PBU32;
		C2S_Achieve_LivenessComplete = 1,
		// 	 活跃领奖		PBU32;
		C2S_Achieve_LivenessPrize = 2,
		// 	 主线完成		PBU32;
		C2S_Achieve_MainComplete = 3,
		// 	 历练完成		PBU32;
		C2S_Achieve_TrainComplete = 4,
		// 	 活动活跃完成	PBU32;
		C2S_Achieve_ActivityLivenessComplete = 5,
		// 	 活动活跃领奖	PBU32;
		C2S_Achieve_ActivityLivenessPrize = 6,
		// 	 周活跃完成	PBU32;
		C2S_Achieve_WeekLivenessComplete = 7,
		// 	 周活跃领奖	PBU32;
		C2S_Achieve_WeekLivenessPrize = 8,
		// 	 战令完成		PBU32;
		C2S_Achieve_WarOrderComplete = 9,
		// 	 战令奖励(等级，是否进阶奖励0/1)		PBU32U32;
		C2S_Achieve_WarOrderPrize = 10,
		// 	 战令一键奖励;
		C2S_Achieve_WarOrderPrizeOneKey = 11,
		// 	 图鉴完成		PBU32;
		C2S_Achieve_IllustrationComplete = 12,
		// 	 图鉴战力完成		PBU32;
		C2S_Achieve_IllustrationPowerComplete = 13,
		// 	 成就之路完成		PBU32;
		C2S_Achieve_AchieveRoadComplete = 14,
	}
	/**
	*----成就模块
	*/
	enum _emS2C_Achieve_Protocol {
		//	 通用错误返回;
		S2C_Achieve_Common = 0,
		//	 活跃完成 			PBU32;
		S2C_Achieve_LivenessComplete = 1,
		//	 活跃领奖 			PBU32;
		S2C_Achieve_LivenessPrize = 2,
		//	 主线完成				PBU32;
		S2C_Achieve_MainComplete = 3,
		//	 新增主线				PBPlayerOneAchieve;
		S2C_Achieve_MainAdd = 4,
		//	 更新成就				PBG2CAchieve_Update;
		S2C_Achieve_Update = 5,
		//	 历练完成				PBU32;
		S2C_Achieve_TrainComplete = 6,
		//	 更新日活跃			PBU32;
		S2C_Achieve_SynDailyLiveness = 7,
		//	 活动活跃完成 		PBU32;
		S2C_Achieve_ActivityLivenessComplete = 8,
		//	 活动活跃领奖 		PBU32;
		S2C_Achieve_ActivityLivenessPrize = 9,
		//	 更新活动活跃			PBU32;
		S2C_Achieve_SynActivityLiveness = 10,
		//	 周活跃完成 			PBU32;
		S2C_Achieve_WeekLivenessComplete = 11,
		//	 周活跃领奖 			PBU32;
		S2C_Achieve_WeekLivenessPrize = 12,
		//	 更新周活跃			PBU32;
		S2C_Achieve_SynWeeklyLiveness = 13,
		// 	 战令完成				PBU32;
		S2C_Achieve_WarOrderComplete = 14,
		// 	 战令奖励(等级，是否进阶奖励0/1)				PBU32U32;
		S2C_Achieve_WarOrderPrize = 15,
		// 	 同步战令等级(level, exp) PBU32U32;
		S2C_Achieve_SyncWarOrderLevel = 16,
		// 	 战令一键奖励			PBG2CWarOrderOneKey;
		S2C_Achieve_WarOrderPrizeOneKey = 17,
		// 	 图鉴完成				PBU32;
		S2C_Achieve_IllustrationComplete = 18,
		// 	 图鉴战力完成		PBU32;
		S2C_Achieve_IllustrationPowerComplete = 19,
		// 	 成就之路完成		PBU32;
		S2C_Achieve_AchieveRoadComplete = 20,
	}
	/**
	*更新成就
	*/
	class PBG2CAchieve_Update {
		constructor();
		/**成就大类型_emAchieveBigType*/
		public bigtype:number;
		/**成就数据*/
		public achieve:Pb_God.PBPlayerOneAchieve;
		public static encode(message: Pb_God.PBG2CAchieve_Update, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CAchieve_Update, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CAchieve_Update;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CAchieve_Update;
	}
	/**
	*战令一键奖励
	*/
	class PBG2CWarOrderOneKey {
		constructor();
		/** 奖励的领取状态(等级，普通 1 进阶 2 both 3)(改变了的)*/
		public prize:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBG2CWarOrderOneKey, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CWarOrderOneKey, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CWarOrderOneKey;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CWarOrderOneKey;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 大神搭配
	*/
	enum _emResultGodDeploy_55 {
		//  成功;
		R_ResultGodDeploy_Succeed = 0,
		//  失败;
		R_ResultGodDeploy_Fail = 1,
		//  不存在;
		R_ResultGodDeploy_NotExist = 2,
	}
	/**
	*--- 客户端到服务器
	*/
	enum _emC2S_GodDeploy_Protocol {
		//请求排行榜(精灵ID)  PBU32;
		C2S_GodDeploy_TopList = 1,
		//点赞(精灵SN)	PBU64;
		C2S_GodDeploy_Like = 2,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_GodDeploy_Protocol {
		//失败才返回;
		S2C_GodDeploy_Common_Ack = 0,
		//返回地址数据 PBGodDeployTopList;
		S2C_GodDeploy_TopList = 1,
		//返回点赞数据 PBLikeInfo;
		S2C_GodDeploy_LikeInfo = 2,
	}
	/**
	* 点赞数据
	*/
	class PBLikeInfo {
		constructor();
		/**精灵id（对应排行榜id）*/
		public petid:number;
		/**精灵sn*/
		public petsn:number;
		/**点赞数*/
		public likesum:number;
		public static encode(message: Pb_God.PBLikeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLikeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLikeInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLikeInfo;
	}
	/**
	*排行信息
	*/
	class PBGodDeployTopListDetail {
		constructor();
		/**精灵标记*/
		public petdisplay:Pb_God.PBPetDisplay;
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**点赞数*/
		public likesum:number;
		public static encode(message: Pb_God.PBGodDeployTopListDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGodDeployTopListDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGodDeployTopListDetail;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGodDeployTopListDetail;
	}
	/**
	*天赋信息
	*/
	class PBGodDeployPetTalent {
		constructor();
		/**技能信息*/
		public skillindex:number;
		/**使用率（百分比）*/
		public useratio:number;
		public static encode(message: Pb_God.PBGodDeployPetTalent, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGodDeployPetTalent, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGodDeployPetTalent;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGodDeployPetTalent;
	}
	/**
	*神装套装信息
	*/
	class PBGodDeployPetGodEquip {
		constructor();
		/**套装信息*/
		public itemid:number;
		/**使用率（百分比）*/
		public useratio:number;
		public static encode(message: Pb_God.PBGodDeployPetGodEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGodDeployPetGodEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGodDeployPetGodEquip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGodDeployPetGodEquip;
	}
	/**
	*阵容推荐
	*/
	class PBGodDeployZhenfa {
		constructor();
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**阵容*/
		public zhenfa:Pb_God.PBBattlePet;
		public static encode(message: Pb_God.PBGodDeployZhenfa, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGodDeployZhenfa, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGodDeployZhenfa;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGodDeployZhenfa;
	}
	/**
	* 排行榜数据
	*/
	class PBGodDeployTopList {
		constructor();
		/**精灵id（对应排行榜id）*/
		public petid:number;
		/**排行信息*/
		public detail:Pb_God.PBGodDeployTopListDetail[];
		/**天赋信息*/
		public talent:Pb_God.PBGodDeployPetTalent[];
		/**神装套装信息*/
		public godequip:Pb_God.PBGodDeployPetGodEquip[];
		/**阵容推荐*/
		public zhenfa:Pb_God.PBGodDeployZhenfa[];
		public static encode(message: Pb_God.PBGodDeployTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGodDeployTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGodDeployTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGodDeployTopList;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 外形系统返回
	*/
	enum _emResultShape_20 {
		// 成功;
		R_ResultShape_Succeed = 0,
		// 失败;
		R_ResultShape_Fail = 1,
		// 不存在此城市;
		R_ResultShape_NoCity = 2,
		// 未激活;
		R_ResultShape_NotActive = 3,
		// 条件不满足;
		R_ResultShape_NeedCondition = 4,
		// 已经激活;
		R_ResultShape_HaveActive = 5,
	}
	/**
	*----外形模块
	*/
	enum _emC2S_Shape_Protocol {
		//设置省份 PBU32U32;
		C2S_Shape_SetProvince = 1,
		//打开头像;
		C2S_Shape_OpenHead = 2,
		//设置头像 PBU32;
		C2S_Shape_SetHead = 3,
		//打开头像框;
		C2S_Shape_OpenHeadIcon = 4,
		//设置头像框 PBU32;
		C2S_Shape_SetHeadIcon = 5,
		//打开冒险形象;
		C2S_Shape_OpenRisk = 6,
		//设置冒险形象 PBU32;
		C2S_Shape_SetRisk = 7,
		//打开称号;
		C2S_Shape_OpenTitle = 8,
		//设置称号 PBU32;
		C2S_Shape_SetTitle = 9,
		//激活称号 PBU32;
		C2S_Shape_ActiveTitle = 10,
		//激活头像框 PBU32;
		C2S_Shape_ActiveHeadIcon = 11,
		//徽章展示 PBCAGBadgeDisplay;
		C2S_Shape_BadgeDisplay = 12,
	}
	/**
	*----外形模块
	*/
	enum _emS2C_Shape_Protocol {
		//通用返回(失败才返回);
		S2C_Shape_CommonAck = 1,
		//增加称号			PBPlayerTitle;
		S2C_Shape_AddTitle = 2,
		//删除称号 		PBU32;
		S2C_Shape_DelTitle = 3,
		//同步省份 		PBU32U32;
		S2C_Shape_SynProvince = 4,
		//设置头像返回 	PBU32;
		S2C_Shape_SetHeadAck = 5,
		//同步所有头像 	PBG2CShapeSynAllHead;
		S2C_Shape_SynAllHead = 6,
		//设置头像框返回 	PBU32;
		S2C_Shape_SetHeadIconAck = 7,
		//同步所有头像框 	PBG2CShapeSynAllHeadIcon;
		S2C_Shape_SynAllHeadIcon = 8,
		//设置冒险形象返回	PBU32;
		S2C_Shape_SetRiskAck = 9,
		//同步所有冒险形象 PBG2CShapeSynAllRisk;
		S2C_Shape_SynAllRisk = 10,
		//设置称号 		PBU32;
		S2C_Shape_SetTitleAck = 11,
		//同步所有称号 	PBG2CShapeSynAllTitle;
		S2C_Shape_SynAllTitle = 12,
		//同步称号 		PBPlayerTitle;
		S2C_Shape_SynTitle = 13,
		//增加头像框		PBPlayerHeadIcon;
		S2C_Shape_AddHeadIcon = 14,
		//同步头像框 		PBPlayerHeadIcon;
		S2C_Shape_SynHeadIcon = 15,
		//删除头像框 		PBU32;
		S2C_Shape_DelTHeadIcon = 16,
		//删除皮肤 		PBU32;
		S2C_Shape_DelPetSkin = 17,
		//增加徽章 		PBPlayerBadge;
		S2C_Shape_AddBadge = 18,
		//同步荣誉值 		PBU32;
		S2C_Shape_SynHonorPoint = 19,
		//徽章展示 		PBCAGBadgeDisplay;
		S2C_Shape_BadgeDisplay = 20,
	}
	/**
	* 徽章展示
	*/
	class PBCAGBadgeDisplay {
		constructor();
		/** 徽章ID*/
		public id:number[];
		public static encode(message: Pb_God.PBCAGBadgeDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGBadgeDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGBadgeDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGBadgeDisplay;
	}
	/**
	* 同步所有头像
	*/
	class PBG2CShapeSynAllHead {
		constructor();
		/** 头像ID*/
		public headid:number[];
		public static encode(message: Pb_God.PBG2CShapeSynAllHead, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CShapeSynAllHead, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CShapeSynAllHead;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CShapeSynAllHead;
	}
	/**
	* 同步所有头像框
	*/
	class PBG2CShapeSynAllHeadIcon {
		constructor();
		/** 头像框*/
		public headicon:Pb_God.PBPlayerHeadIcon[];
		public static encode(message: Pb_God.PBG2CShapeSynAllHeadIcon, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CShapeSynAllHeadIcon, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CShapeSynAllHeadIcon;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CShapeSynAllHeadIcon;
	}
	/**
	* 同步所有冒险形象
	*/
	class PBG2CShapeSynAllRisk {
		constructor();
		/** 当前使用的冒险形象*/
		public useriskid:number;
		/** 已经激活的冒险形象*/
		public activerisk:number[];
		/** 冒险形象未激活的*/
		public risk:Pb_God.PBPlayerRiskShape[];
		public static encode(message: Pb_God.PBG2CShapeSynAllRisk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CShapeSynAllRisk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CShapeSynAllRisk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CShapeSynAllRisk;
	}
	/**
	* 同步所有称号
	*/
	class PBG2CShapeSynAllTitle {
		constructor();
		/** 当前使用的称号*/
		public usetitleid:number;
		/** 头像框*/
		public title:Pb_God.PBPlayerTitle[];
		public static encode(message: Pb_God.PBG2CShapeSynAllTitle, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CShapeSynAllTitle, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CShapeSynAllTitle;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CShapeSynAllTitle;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 帮派系统返回
	*/
	enum _emResultFaction_10 {
		// 成功;
		R_ResultFaction_Succeed = 0,
		// 失败;
		R_ResultFaction_Fail = 1,
		// 已经有帮派;
		R_ResultFaction_HaveFaction = 2,
		// 创建中;
		R_ResultFaction_Creating = 3,
		// 钻石不足;
		R_ResultFaction_NeedDiamond = 4,
		// 帮派重名;
		R_ResultFaction_NameDup = 5,
		// 数据库错误;
		R_ResultFaction_DBError = 6,
		// 无帮会;
		R_ResultFaction_NoFaction = 7,
		//权限不足;
		R_ResultFaction_Permission = 8,
		//已经在申请列表中;
		R_ResultFaction_InApply = 9,
		//入帮等级不足;
		R_ResultFaction_ApplyNeedLevel = 10,
		//不在申请列表中;
		R_ResultFaction_NotInApply = 11,
		//帮派人数已满;
		R_ResultFaction_Full = 12,
		//目标职位无空缺;
		R_ResultFaction_JobFull = 13,
		//今日已经捐献;
		R_ResultFaction_HaveDonate = 14,
		// 金钱不足	;
		R_ResultFaction_NeedMoney = 15,
		// 帮派名长度错误;
		R_ResultFaction_NameLength = 16,
		// 宣言文字长度错误;
		R_ResultFaction_DeclarationLength = 17,
		// 敏感词	;
		R_ResultFaction_BadWord = 18,
		//包含非法字符;
		R_ResultFaction_IllegalCharacter = 19,
		// 帮派名字包含非法字符 ;
		R_ResultFaction_NameIllegalChar = 20,
		// 帮派名字敏感词;
		R_ResultFaction_NameBadWord = 21,
		//你已经有帮派;
		R_ResultFaction_YouInOther = 22,
		// 道具不足;
		R_ResultFaction_NeedItem = 23,
		// 活跃升级经验不足;
		R_ResultFaction_NeedLivenessExp = 24,
		// 活跃等级达到最大等级;
		R_ResultFaction_LivenessMaxLevel = 25,
		// 技能达到最大等级;
		R_ResultFaction_SkillMaxLevel = 26,
		// 其它职业技能等级不足;
		R_ResultFaction_NeedAllJobLevel = 27,
		// 其它职业技能为0;
		R_ResultFaction_SkillNoLevel = 28,
		// 已经领取此贡献奖励;
		R_ResultFaction_HaveDonatePrize = 29,
		// 副本技能加成最大等级;
		R_ResultFaction_CopymapSkillMaxLevel = 30,
		// 副本最大购买次数;
		R_ResultFaction_CopymapMaxBuyCount = 31,
		// 副本进入次数不足;
		R_ResultFaction_CopymapNeedEnterCount = 32,
		// 副本boss已经被击杀;
		R_ResultFaction_CopymapBossHaveKill = 33,
		// 副本今日未打，不能扫荡;
		R_ResultFaction_CopymapNoSweep = 34,
		// 公会战未开始;
		R_ResultFaction_WarNoMatch = 35,
		// 挑战次数不足;
		R_ResultFaction_WarNeedFightCount = 36,
		// 废墟达到最大挑战次数;
		R_ResultFaction_WarRunieMaxFightCount = 37,
		// 正在被攻打;
		R_ResultFaction_WarBeAttack = 38,
		// 此难度已经被攻打;
		R_ResultFaction_WarStarHaveAttack = 39,
		// 你未参加公会战，无法查看;
		R_ResultFaction_WarNoJoin = 40,
		// 此宝箱已经打开;
		R_ResultFaction_WarBoxHaveOpen = 41,
		// 奖励时间已过;
		R_ResultFaction_WarNeedPrizeState = 42,
		// 你已经开过宝箱;
		R_ResultFaction_WarHaveOpenBox = 43,
		// 公会战未开启;
		R_ResultFaction_WarNoOpen = 44,
		// 捐献活跃值不足;
		R_ResultFaction_NeedDonateLivess = 45,
		// 重命名冷却中;
		R_ResultFaction_RenmaeCoolTime = 46,
		// 每日招募次数已满;
		R_ResultFaction_RecruitDayMaxCount = 47,
		// 招募冷却中;
		R_ResultFaction_RecruitCoolTime = 48,
		// 距离上一次退出公会不满12小时，期间无法加入公会;
		R_ResultFaction_JoinCoolTime = 49,
		// 公会战未结束;
		R_ResultFaction_WarNoEnd = 50,
		//未匹配成功（未满足参与条件或您的公会本轮轮空）;
		R_Result_faction_MatchFail = 51,
		//公会等级不足;
		R_Result_faction_LevelFail = 52,
		//活跃人数不足;
		R_Result_faction_PeopleFail = 53,
		//公会轮空;
		R_Result_faction_FindFail = 54,
		//加入公会时间过晚，错过了匹配时间;
		R_Result_faction_TimeFail = 55,
		//公会技能未找到;
		R_Result_faction_PVPSkillFindFail = 56,
		//本天赋属性技能等级不足;
		R_Result_faction_NeedOtherJobLevel = 57,
	}
	/**
	*----帮派系统
	*/
	enum _emC2S_Faction_Protocol {
		//	 创建帮会 				PBC2GFactionCreate	;
		C2S_Faction_Create = 0,
		//	 退出;
		C2S_Faction_Quit = 1,
		//	 修改帮派公告				PBC2GFactionEdit;
		C2S_Faction_Edit = 2,
		//	 申请加入帮会 			PBC2GFactionApply;
		C2S_Faction_Apply = 3,
		//	 打开帮会					;
		C2S_Faction_Open = 4,
		//	 请求帮会列表;
		C2S_Faction_List = 5,
		//	 请求帮会成员列表;
		C2S_Faction_MemberList = 6,
		//	 批准/拒绝加入申请		PBC2GFactionAgreeApply					;
		C2S_Faction_AgreeApply = 7,
		//	 改变官职					PBC2GFactionChangeJob							;
		C2S_Faction_ChangeJob = 9,
		//	 踢出帮派					PBU32					;
		C2S_Faction_Kick = 11,
		//	 帮会改名					PBString	;
		C2S_Faction_Rename = 12,
		//	 帮会捐献					PBU32;
		C2S_Faction_Donate = 13,
		//	 查看申请列表;
		C2S_Faction_QueryApplyList = 14,
		//	 领取捐献奖励				PBU32;
		C2S_Faction_DonatePrize = 15,
		//	 活跃度升级;
		C2S_Faction_UpgradeLiveness = 16,
		//	 技能升级					PBCAGFactionSkillUpgrade	;
		C2S_Faction_UpgradeSkill = 17,
		//	 技能重置					PBU32;
		C2S_Faction_SkillReset = 18,
		//	 购买副本次数;
		C2S_Faction_CopymapBuyCount = 19,
		//	 购买扫荡					PBU32;
		C2S_Faction_CopymapSweep = 20,
		//	 打开副本系统;
		C2S_Faction_CopymapOpen = 21,
		//	 副本排行					PBU32;
		C2S_Faction_CopymapTop = 22,
		//	 副本集结;
		C2S_Faction_CopymapNotice = 23,
		//	 副本否买加成buff;
		C2S_Faction_CopymapBuySkill = 24,
		//	 修改入会条件				PBCAGFactionSetCondition	;
		C2S_Faction_SetCondition = 25,
		//	 公会招募;
		C2S_Faction_Recruit = 26,
		//	公会弹劾					PBC2GFactionImpeach;
		C2S_Faction_Impeach = 27,
		//	 PVP技能升级				PBU32;
		C2S_Faction_UpgradePVPSkill = 28,
		//	 PVP技能重置				PBU32;
		C2S_Faction_PVPSkillReset = 29,
		//	 查询所有对阵列表		;
		C2S_FactionWar_QueryAllList = 50,
		//	 查询成员列表				PBC2GFactionWarMemberList;
		C2S_FactionWar_QueryMemberList = 51,
		//	 查询成员信息				PBC2GFactionWarMemberInfo;
		C2S_FactionWar_QueryMemberInfo = 52,
		//	 查询战场日志;
		C2S_FactionWar_QueryWarLog = 53,
		//	 查询我的日志		;
		C2S_FactionWar_QuerySelfLog = 54,
		//	 查询目标防守记录			PBC2GFactionWarQueryTarRecord		;
		C2S_FactionWar_QueryTarRecord = 55,
		//	 查询进攻列表	;
		C2S_FactionWar_QueryAttackList = 56,
		//	 查询宝箱	;
		C2S_FactionWar_QueryBoxInfo = 57,
		//	 开启宝箱					PBC2GFactionWarOpenBox			;
		C2S_FactionWar_OpenBox = 58,
		//	 打开公会战;
		C2S_FactionWar_OpenWar = 59,
		//	 帮会日志;
		C2S_Faction_Log = 60,
		//	 同步贡献跟经验			PBC2GFactionAddContriExp;
		C2S_Faction_AddContriExp = 100,
		//	 副本进入请求				PBFightBase;
		C2S_Faction_FightBegin = 101,
		//	 副本完成请求				PBC2GFactionAddContriExp;
		C2S_Faction_FightResult = 102,
		//	 同步活跃等级				PBU32;
		C2S_Faction_LivenessLevel = 103,
		//	 公会战结果;
		C2S_Faction_FightWarResult = 104,
	}
	/**
	*----帮派系统
	*/
	enum _emS2C_Faction_Protocol {
		//	 通用返回				失败才返回;
		S2C_Faction_Common = 0,
		//	 创建帮会				PBC2GFactionCreate;
		S2C_Faction_Create = 1,
		//	 帮会基本数据			PBG2CFactionSyn;
		S2C_Faction_Syn = 2,
		//	 退出帮会;
		S2C_Faction_Quit = 3,
		//	 请求自己申请帮会列表	PBG2CFactionApplyList	;
		S2C_Faction_SelfApplyList = 4,
		//	 所有自己申请的帮派	PBG2CFactionAllApply	;
		S2C_Faction_SelfAllApply = 5,
		//	 请求帮会列表			PBG2CFactionList	;
		S2C_Faction_TopList = 6,
		//	 请求帮会成员列表		PBG2CFactionMemberList;
		S2C_Faction_MemberList = 7,
		//	 帮会删除				PBU32;
		S2C_Faction_Remove = 8,
		//	 修改帮派公告			PBC2GFactionEdit;
		S2C_Faction_Edit = 9,
		//	 删除一个申请			PBU32	;
		S2C_Faction_DelApply = 10,
		//	 改变官职				失败才返回	;
		S2C_Faction_ChangeJob = 11,
		//	 申请返回				失败才返回	;
		S2C_Faction_Apply = 12,
		//	 帮会捐献返回			PBU32;
		S2C_Faction_Donate = 13,
		//	 查看申请帮会列表		PBG2CFactionQueryApplyList	;
		S2C_Faction_QueryApplyList = 14,
		//	 修改入会条件			PBCAGFactionSetCondition	;
		S2C_Faction_SetCondition = 15,
		//	 通知玩家加入帮会		无内容	;
		S2C_Faction_JoinAck = 16,
		//	 通知玩家退出帮会		无内容	;
		S2C_Faction_ExitAck = 17,
		//	 领取捐献奖励返回		PBU32;
		S2C_Faction_DonatePrize = 18,
		//	 活跃度同步返回		PBG2CFactionSynLiveness;
		S2C_Faction_SynLiveness = 19,
		//	 技能升级				PBCAGFactionSkillUpgrade;
		S2C_Faction_UpgradeSkill = 20,
		//	 技能重置				PBG2CFactionSkillReset;
		S2C_Faction_SkillReset = 21,
		//	帮派副本同步			PBG2CFactionCopymapSyn;
		S2C_Faction_CopymapSyn = 22,
		//	帮派副本排行同步		PBG2CFactionCopymapTop;
		S2C_Faction_CopymapTop = 23,
		//	帮派副本副本否买加成buff	PBG2CFactionCopymapSkill;
		S2C_Faction_CopymapUpdateSkill = 24,
		//	同步捐献活跃度		PBU32;
		S2C_Faction_SynDonateLiveness = 25,
		//	帮派副本副本更新次数	PBG2CFactionCopymapUpdateCount;
		S2C_Faction_CopymapUpdateCount = 26,
		//	副本扫荡返回			;
		S2C_Faction_CopymapSweep = 28,
		//	帮派重命名			PBG2CFactionRenameAck		;
		S2C_Faction_Rename = 29,
		//	公会招募				PBG2CFactionRecruitAck;
		S2C_Faction_Recruit = 30,
		//	副本集结				PBU32;
		S2C_Faction_CopymapNotice = 31,
		//	 帮派红点	无内容;
		S2C_Faction_ApplyHotData = 32,
		//	公会弹劾				PBG2CFactionImpeach;
		S2C_Faction_Impeach = 33,
		//	 PVP技能升级				PBG2CFactionPVPSkillUpgrade;
		S2C_Faction_UpgradePVPSkill = 34,
		//	 PVP技能重置				PBG2CFactionPVPSkillReset;
		S2C_Faction_PVPSkillReset = 35,
		//	返回所有对阵列表		PBG2CFactionWarListAck;
		S2C_FactionWar_QueryAllListAck = 50,
		//	返回查询成员列表		PBG2CFactionWarMemberListAck;
		S2C_FactionWar_QueryMemberListAck = 51,
		//	返回查询成员信息		PBG2CFactionWarMemberInfoAck;
		S2C_FactionWar_QueryMemberInfoAck = 52,
		//	返回查询战场日志		PBG2CFactionWarLogAck;
		S2C_FactionWar_QueryWarLog = 53,
		//	返回查询我的日志		PBG2CFactionWarLogAck;
		S2C_FactionWar_QuerySelfLog = 54,
		//	返回查询目标防御记录	PBG2CFactionWarTarRecordAck;
		S2C_FactionWar_QueryTarRecordLog = 55,
		//	返回查询进攻列表		PBG2CFactionWarAttackListAck;
		S2C_FactionWar_QueryAttackListAck = 56,
		//	返回所有宝箱信息		PBG2CFactionWarSynBoxInfo;
		S2C_FactionWar_SynBoxInfo = 57,
		//	开启宝箱返回			PBFactionWarBox;
		S2C_FactionWar_OpenBoxPrizeAck = 58,
		//	开启返回				PBG2CFactionWarSynOpen	;
		S2C_FactionWar_OpenAck = 59,
		//	返回匹配成功			;
		S2C_FactionWar_SynMatch = 60,
		//	公会战挑战结果		PBG2CFactionWarFightResult;
		S2C_FactionWar_FightResult = 61,
		//	 帮会日志 			PBFactionAllEvents;
		S2C_Faction_Log = 62,
		//	同步游戏数据			PBFactionSynGame;
		S2C_Faction_SynGame = 100,
		//	副本进入返回			PBFightBase;
		S2C_Faction_FightBeginAck = 101,
		//	公会战挑战返回		PBFightBase;
		S2C_Faction_WarFightBeginAck = 102,
		//	宝箱奖励				PBFactionWarBox;
		S2C_Faction_WarOpenBoxPrizeAck = 103,
	}
	/**
	* 帮派战战场日志类型
	*/
	enum _emFactionWarLogType {
		//友方;
		FactionWarLogType_Friend = 1,
		//敌方;
		FactionWarLogType_Enemy = 2,
		//友方挑战废墟;
		FactionWarLogType_FriendRunie = 3,
		//敌方挑战废墟;
		FactionWarLogType_EnemyRunie = 4,
	}
	/**
	*公会弹劾
	*/
	class PBC2GFactionImpeach {
		constructor();
		public static encode(message: Pb_God.PBC2GFactionImpeach, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionImpeach, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionImpeach;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionImpeach;
	}
	/**
	*公会弹劾
	*/
	class PBG2CFactionImpeach {
		constructor();
		public static encode(message: Pb_God.PBG2CFactionImpeach, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionImpeach, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionImpeach;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionImpeach;
	}
	/**
	* 公会招募
	*/
	class PBG2CFactionRecruitAck {
		constructor();
		/** 下次招募时间*/
		public nextrecruittime:number;
		/** 日招募次数*/
		public dayrecruitcount:number;
		public static encode(message: Pb_God.PBG2CFactionRecruitAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionRecruitAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionRecruitAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionRecruitAck;
	}
	/**
	* 帮派重命名
	*/
	class PBG2CFactionRenameAck {
		constructor();
		/**下次重命名时间*/
		public nextrenametime:number;
		/**名称*/
		public name:string;
		public static encode(message: Pb_God.PBG2CFactionRenameAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionRenameAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionRenameAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionRenameAck;
	}
	/**
	* 一条帮会成员DB数据
	*/
	class PBFactionMember {
		constructor();
		/**角色信息*/
		public displayer:Pb_God.PBPlayerDisplay;
		/**职位_emFactionJob*/
		public job:number;
		/**日贡献*/
		public daycontri:number;
		/**总共贡献*/
		public totalcontri:number;
		/**离线时间*/
		public lastlogouttime:number;
		/**加入时间*/
		public jointime:number;
		/**活跃等级*/
		public livenesslevel:number;
		/**活跃经验*/
		public livenessexp:number;
		public static encode(message: Pb_God.PBFactionMember, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionMember, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionMember;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionMember;
	}
	/**
	* 一个帮派完整数据
	*/
	class PBFactionData {
		constructor();
		/**帮派名*/
		public name:string;
		/**帮派ID*/
		public factionid:number;
		/**帮主ID*/
		public leader:number;
		/**世界ID*/
		public worldid:number;
		/**帮派等级*/
		public level:number;
		/**帮派经验*/
		public exp:number;
		/**宣言*/
		public declaration:string;
		/**创建时间*/
		public createtime:number;
		/**成员列表*/
		public members:Pb_God.PBFactionMember[];
		/**入帮申请列表*/
		public applys:Pb_God.PBFactionApplyData[];
		/**加入需要的玩家等级*/
		public joinneedlevel:number;
		/**是否自动入帮申请*/
		public isautoapply:boolean;
		/**每日捐献活跃度*/
		public donateliveness:number;
		/**总战力*/
		public totalfightpower:Long;
		/** 下次招募时间*/
		public nextrecruittime:number;
		/** 日招募次数*/
		public dayrecruitcount:number;
		/** 下次招募时间*/
		public nextcopymapnotictime:number;
		public static encode(message: Pb_God.PBFactionData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionData;
	}
	/**
	* 一条申请加入帮派数据
	*/
	class PBFactionApplyData {
		constructor();
		/**角色数据*/
		public base:Pb_God.PBFactionMember;
		/**申请时间戳*/
		public stamp:number;
		public static encode(message: Pb_God.PBFactionApplyData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionApplyData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionApplyData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionApplyData;
	}
	/**
	* 帮派副本排行
	*/
	class PBFactionCopymapTop {
		constructor();
		/**角色信息*/
		public displayer:Pb_God.PBPlayerDisplay;
		/**点赞次数*/
		public likecount:number;
		/**伤害值*/
		public damage:Long;
		/**上一次的伤害值 -1表示无伤害*/
		public lastdamage:Long;
		public static encode(message: Pb_God.PBFactionCopymapTop, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionCopymapTop, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionCopymapTop;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionCopymapTop;
	}
	/**
	* 帮派副本信息
	*/
	class PBFactionCopymapInfo {
		constructor();
		/**副本ID*/
		public id:number;
		/**当前HP*/
		public curhp:Long;
		/**最大HP*/
		public maxhp:Long;
		/**击杀者*/
		public killplayerid:number;
		/**伤害排名*/
		public topplayer:Pb_God.PBFactionCopymapTop[];
		public static encode(message: Pb_God.PBFactionCopymapInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionCopymapInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionCopymapInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionCopymapInfo;
	}
	/**
	* 帮派副本数据
	*/
	class PBFactionCopymap {
		constructor();
		/**当前正在打的副本id*/
		public curcopymapid:number;
		/**帮派副本信息*/
		public copymapinfo:Pb_God.PBFactionCopymapInfo[];
		/**被动技能等级*/
		public skilllevel:number;
		/**被动技能消失时间*/
		public skilldeltime:number;
		public static encode(message: Pb_God.PBFactionCopymap, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionCopymap, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionCopymap;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionCopymap;
	}
	/**
	*同步游戏服数据
	*/
	class PBFactionSynGame {
		constructor();
		/**每日捐献活跃度*/
		public donateliveness:number;
		/**副本被动技能等级*/
		public copymapskilllevel:number;
		/**当前副本ID*/
		public curcopymapid:number;
		/**帮派名称*/
		public factioname:string;
		/**每日招募次数*/
		public dayrecruitcount:number;
		public static encode(message: Pb_God.PBFactionSynGame, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionSynGame, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionSynGame;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionSynGame;
	}
	/**
	* 技能重置返回
	*/
	class PBG2CFactionSkillReset {
		constructor();
		/**职业类型*/
		public jobtype:number;
		/**重置次数*/
		public resetcount:number;
		public static encode(message: Pb_God.PBG2CFactionSkillReset, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionSkillReset, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionSkillReset;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionSkillReset;
	}
	/**
	* 修改入会条件
	*/
	class PBCAGFactionSetCondition {
		constructor();
		/**是否验证 0不验证*/
		public isauto:number;
		/**加入需要的玩家等级*/
		public joinneedlevel:number;
		public static encode(message: Pb_God.PBCAGFactionSetCondition, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGFactionSetCondition, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGFactionSetCondition;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGFactionSetCondition;
	}
	/**
	* 创建帮派	C -> G
	*/
	class PBC2GFactionCreate {
		constructor();
		/**创建者ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		/**帮派名*/
		public factionname:string;
		/**创建时间*/
		public creattime:number;
		/**帮派ID*/
		public factionid:number;
		/**帮派宣言*/
		public declaration:string;
		/**是否验证 0不验证*/
		public isauto:number;
		/**加入需要的玩家等级*/
		public joinneedlevel:number;
		public static encode(message: Pb_God.PBC2GFactionCreate, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionCreate, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionCreate;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionCreate;
	}
	/**
	* 编辑帮会信息	C -> G
	*/
	class PBC2GFactionEdit {
		constructor();
		/**宣言*/
		public declaration:string;
		public static encode(message: Pb_God.PBC2GFactionEdit, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionEdit, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionEdit;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionEdit;
	}
	/**
	* 申请加入帮会	C -> G
	*/
	class PBC2GFactionApply {
		constructor();
		/**帮派ID*/
		public factionid:number;
		/**true 申请false 取消*/
		public isapply:boolean;
		public static encode(message: Pb_God.PBC2GFactionApply, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionApply, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionApply;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionApply;
	}
	/**
	* 帮派同步	C -> G
	*/
	class PBG2CFactionSyn {
		constructor();
		/**帮派显示*/
		public display:Pb_God.PBFactionDisplay;
		/**帮派职位*/
		public jobtype:number;
		public static encode(message: Pb_God.PBG2CFactionSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionSyn;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionSyn;
	}
	/**
	* 请求帮会列表	G -> C
	*/
	class PBG2CFactionList {
		constructor();
		/**帮派列表*/
		public list:Pb_God.PBFactionDisplay[];
		/**前三名帮派会长*/
		public leader:Pb_God.PBPlayerDisplay[];
		public static encode(message: Pb_God.PBG2CFactionList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionList;
	}
	/**
	* 所有已经申请的帮派
	*/
	class PBG2CFactionAllApply {
		constructor();
		/**已经申请的帮派ID*/
		public factionid:number[];
		public static encode(message: Pb_God.PBG2CFactionAllApply, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionAllApply, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionAllApply;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionAllApply;
	}
	/**
	* 请求申请帮会列表	G -> C
	*/
	class PBG2CFactionApplyList {
		constructor();
		/**帮派信息展示*/
		public display:Pb_God.PBFactionDisplay[];
		/**已经申请的帮派ID*/
		public allapply:Pb_God.PBG2CFactionAllApply;
		public static encode(message: Pb_God.PBG2CFactionApplyList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionApplyList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionApplyList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionApplyList;
	}
	/**
	* 请求帮会成员列表	G -> C
	*/
	class PBG2CFactionMemberList {
		constructor();
		/**成员列表*/
		public members:Pb_God.PBFactionMember[];
		public static encode(message: Pb_God.PBG2CFactionMemberList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionMemberList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionMemberList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionMemberList;
	}
	/**
	* 同意或拒绝申请
	*/
	class PBC2GFactionAgreeApply {
		constructor();
		/**帮派ID*/
		public playerid:number;
		/**true 同意false 拒绝*/
		public isagree:boolean;
		public static encode(message: Pb_God.PBC2GFactionAgreeApply, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionAgreeApply, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionAgreeApply;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionAgreeApply;
	}
	/**
	* 改变官职
	*/
	class PBC2GFactionChangeJob {
		constructor();
		/**目标成员*/
		public playerid:number;
		/**官职类型_emFactionJob*/
		public jobtype:number;
		public static encode(message: Pb_God.PBC2GFactionChangeJob, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionChangeJob, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionChangeJob;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionChangeJob;
	}
	/**
	*增加帮派贡献值  经验
	*/
	class PBC2GFactionAddContriExp {
		constructor();
		/**增加帮派贡献值*/
		public addcontri:Long;
		/**增加帮派经验*/
		public addexp:number;
		/**操作类型*/
		public doingtype:number;
		public static encode(message: Pb_God.PBC2GFactionAddContriExp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionAddContriExp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionAddContriExp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionAddContriExp;
	}
	/**
	*查看帮派申请列表
	*/
	class PBG2CFactionQueryApplyList {
		constructor();
		/**申请信息*/
		public apply:Pb_God.PBFactionApplyData[];
		public static encode(message: Pb_God.PBG2CFactionQueryApplyList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionQueryApplyList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionQueryApplyList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionQueryApplyList;
	}
	/**
	*活跃升级
	*/
	class PBG2CFactionSynLiveness {
		constructor();
		/** 活跃等级*/
		public livenesslevel:number;
		/** 活跃经验*/
		public livenessexp:number;
		/** 日活跃度*/
		public dailyliveness:number;
		/** 周活跃度*/
		public weekliveness:number;
		public static encode(message: Pb_God.PBG2CFactionSynLiveness, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionSynLiveness, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionSynLiveness;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionSynLiveness;
	}
	/**
	* 编辑帮会信息	C -> G
	*/
	class PBCAGFactionSkillUpgrade {
		constructor();
		/**职业*/
		public jobtype:number;
		/**当前等级*/
		public curlevel:number;
		public static encode(message: Pb_God.PBCAGFactionSkillUpgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGFactionSkillUpgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGFactionSkillUpgrade;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGFactionSkillUpgrade;
	}
	/**
	*帮派副本同步
	*/
	class PBG2CFactionCopymapSyn {
		constructor();
		/**副本信息*/
		public copymapinfo:Pb_God.PBFactionCopymapInfo;
		/**被动技能等级*/
		public skilllevel:number;
		/**被动技能消失时间*/
		public skilldeltime:number;
		/** 下次招募时间*/
		public nextcopymapnotictime:number;
		/**当前自己上一次的伤害值 -1表示无伤害*/
		public lastdamage:Long;
		public static encode(message: Pb_God.PBG2CFactionCopymapSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionCopymapSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionCopymapSyn;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionCopymapSyn;
	}
	/**
	* 帮派副本排行
	*/
	class PBG2CFactionCopymapTop {
		constructor();
		/**副本ID*/
		public id:number;
		/**排行信息*/
		public top:Pb_God.PBFactionCopymapTop[];
		public static encode(message: Pb_God.PBG2CFactionCopymapTop, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionCopymapTop, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionCopymapTop;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionCopymapTop;
	}
	/**
	* 帮派副本排行
	*/
	class PBG2CFactionCopymapSkill {
		constructor();
		/**被动技能等级*/
		public skilllevel:number;
		/**被动技能消失时间*/
		public skilldeltime:number;
		public static encode(message: Pb_God.PBG2CFactionCopymapSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionCopymapSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionCopymapSkill;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionCopymapSkill;
	}
	/**
	* 帮派副本同步次数
	*/
	class PBG2CFactionCopymapUpdateCount {
		constructor();
		/** 副本购买次数*/
		public copymapbuycount:number;
		/** 副本使用免费次数*/
		public copymapusefreecount:number;
		/** 副本使用购买次数*/
		public copymapusebuycount:number;
		public static encode(message: Pb_God.PBG2CFactionCopymapUpdateCount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionCopymapUpdateCount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionCopymapUpdateCount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionCopymapUpdateCount;
	}
	/**
	*战斗结果
	*/
	class PBG2CFactionCopymapResult {
		constructor();
		/**挑战ID*/
		public id:number;
		/**伤害值*/
		public damage:Long;
		/**当前血量*/
		public curhp:Long;
		public static encode(message: Pb_God.PBG2CFactionCopymapResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionCopymapResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionCopymapResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionCopymapResult;
	}
	/**
	*跨服同步帮派排行榜
	*/
	class PBW2BWSynFactionTopList {
		constructor();
		/**排行类型 _emTopListType*/
		public type:number;
		/**世界ID*/
		public worldid:number;
		/**帮派显示*/
		public display:Pb_God.PBFactionDisplay[];
		public static encode(message: Pb_God.PBW2BWSynFactionTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2BWSynFactionTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2BWSynFactionTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2BWSynFactionTopList;
	}
	/**
	*帮派排行榜列表 返回
	*/
	class PBS2CFactionTopList {
		constructor();
		/**排行类型 _emTopListType*/
		public type:number;
		/**开始排行*/
		public beginorder:number;
		/**请求数量*/
		public count:number;
		/**玩家ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		/**入榜的全部角色数量*/
		public allcount:number;
		/**帮派列表*/
		public list:Pb_God.PBFactionTop[];
		/**自己信息*/
		public selfinfo:Pb_God.PBFactionTop;
		public static encode(message: Pb_God.PBS2CFactionTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBS2CFactionTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBS2CFactionTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBS2CFactionTopList;
	}
	/**
	* 帮战信息显示
	*/
	class PBFactionWarDisplay {
		constructor();
		/**帮派名*/
		public name:string;
		/**帮派ID*/
		public factionid:number;
		/**世界ID*/
		public worldid:number;
		/**总战力*/
		public totalfightpower:Long;
		/**排名*/
		public rank:number;
		/**总星星数*/
		public totalstar:number;
		public static encode(message: Pb_God.PBFactionWarDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarDisplay;
	}
	/**
	* 帮派成员显示
	*/
	class PBFactionWarMemberDisplay {
		constructor();
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**战斗力*/
		public fightpower:number;
		/**被攻打星数*/
		public beattackstar:number;
		/**排名*/
		public rank:number;
		public static encode(message: Pb_God.PBFactionWarMemberDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarMemberDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarMemberDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarMemberDisplay;
	}
	/**
	* 帮派战信息
	*/
	class PBFactionWarMember {
		constructor();
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**战斗阵容*/
		public battlepet:Pb_God.PBBattlePet;
		public static encode(message: Pb_God.PBFactionWarMember, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarMember, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarMember;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarMember;
	}
	/**
	* 帮派战战场日志
	*/
	class PBFactionWarLog {
		constructor();
		/**日志记录时间*/
		public logtime:number;
		/**日志类型_emFactionWarLogType*/
		public logtype:number;
		/**战斗结果_emBattleResult*/
		public result:number;
		/**友方姓名*/
		public friendname:string;
		/**敌方世界ID*/
		public enemyworldid:number;
		/**敌方姓名*/
		public enemyname:string;
		/**获得星星数*/
		public addstar:number;
		/**获得战绩点数*/
		public addfightpoint:number;
		/**敌方公会名*/
		public enemyfactionname:string;
		/**敌方总星星数*/
		public enemytotalstar:number;
		/**废墟技能等级*/
		public runieskilllevel:number;
		/**友方总星星数*/
		public friendtotalstar:number;
		/**自己的ID, 日志归属者 TODO客户端*/
		public friendid:number;
		public static encode(message: Pb_God.PBFactionWarLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarLog;
	}
	/**
	* 帮派战战场记录
	*/
	class PBFactionWarRecord {
		constructor();
		/** 战斗sn*/
		public battlesn:Long;
		/** 攻击者外显*/
		public battledisplay:Pb_God.PBBattleDisplay;
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/** 战斗结果*/
		public result:number;
		/** 难度*/
		public star:number;
		/** 挑战时间*/
		public time:number;
		public static encode(message: Pb_God.PBFactionWarRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarRecord;
	}
	/**
	* 帮战信息
	*/
	class PBFactionWarInfo {
		constructor();
		/**帮派基本信息*/
		public display:Pb_God.PBFactionWarDisplay;
		/**成员信息*/
		public members:Pb_God.PBFactionWarMember[];
		public static encode(message: Pb_God.PBFactionWarInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarInfo;
	}
	/**
	* 帮战存库基础信息
	*/
	class PBFactionWarSaveWarInfo {
		constructor();
		/**房间ID*/
		public roomsn:number;
		/**组ID*/
		public groupid:number;
		/**帮派显示*/
		public display:Pb_God.PBFactionWarDisplay;
		/**总攻打的星星数*/
		public totalattackstar:number;
		/**总攻打的废墟等级*/
		public totalrunslevel:number;
		/**战斗结果*/
		public result:number;
		/**战场日志*/
		public log:Pb_God.PBFactionWarLog[];
		/**宝箱*/
		public boxinfo:Pb_God.PBFactionWarBox[];
		public static encode(message: Pb_God.PBFactionWarSaveWarInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarSaveWarInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarSaveWarInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarSaveWarInfo;
	}
	/**
	* 帮战存库成员信息
	*/
	class PBFactionWarSaveMemberInfo {
		constructor();
		/**被攻打的星星数*/
		public beattackstar:number;
		/**总防守次数*/
		public toldefensecount:number;
		/**成功防守次数*/
		public sucdefensecount:number;
		/**排名*/
		public rank:number;
		/**奖励排名*/
		public prizerank:number;
		/**战绩点*/
		public fightpoint:number;
		/**星星数*/
		public addstar:number;
		/**成员基础*/
		public members:Pb_God.PBFactionWarMember;
		/**战场日志信息*/
		public log:Pb_God.PBFactionWarLog[];
		/**战场记录*/
		public record:Pb_God.PBFactionWarRecord[];
		public static encode(message: Pb_God.PBFactionWarSaveMemberInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarSaveMemberInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarSaveMemberInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarSaveMemberInfo;
	}
	/**
	* 帮战存库成员信息
	*/
	class PBFactionWarSaveMemberList {
		constructor();
		/**房间ID*/
		public roomsn:number;
		/**组ID*/
		public groupid:number;
		/**帮派ID*/
		public factionid:number;
		/**成员信息*/
		public members:Pb_God.PBFactionWarSaveMemberInfo[];
		public static encode(message: Pb_God.PBFactionWarSaveMemberList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarSaveMemberList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarSaveMemberList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarSaveMemberList;
	}
	/**
	* 帮战宝箱
	*/
	class PBFactionWarBox {
		constructor();
		/**宝箱位置1开始*/
		public pos:number;
		/**宝箱索引*/
		public index:number;
		/**开启的玩家ID*/
		public playerid:number;
		/**开启的玩家名称*/
		public playername:string;
		public static encode(message: Pb_God.PBFactionWarBox, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarBox, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarBox;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarBox;
	}
	/**
	* 公会战对阵列
	*/
	class PBFactionWarList {
		constructor();
		/**左边帮派*/
		public left:Pb_God.PBFactionWarDisplay;
		/**右边帮派*/
		public right:Pb_God.PBFactionWarDisplay;
		public static encode(message: Pb_God.PBFactionWarList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionWarList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionWarList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionWarList;
	}
	/**
	* 返回所有公会战对阵列表
	*/
	class PBG2CFactionWarListAck {
		constructor();
		/**自己*/
		public self:Pb_God.PBFactionWarList;
		/**对阵信息*/
		public list:Pb_God.PBFactionWarList[];
		public static encode(message: Pb_God.PBG2CFactionWarListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionWarListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionWarListAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionWarListAck;
	}
	/**
	* 查询公会对阵列表
	*/
	class PBW2BWFactionWarQueryAllList {
		constructor();
		/**玩家ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		/**帮派ID*/
		public factionid:number;
		public static encode(message: Pb_God.PBW2BWFactionWarQueryAllList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2BWFactionWarQueryAllList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2BWFactionWarQueryAllList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2BWFactionWarQueryAllList;
	}
	/**
	* 查询公会成员列表
	*/
	class PBC2GFactionWarMemberList {
		constructor();
		/**目标帮派ID*/
		public tarfactionid:number;
		/**玩家ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		/**帮派ID*/
		public factionid:number;
		public static encode(message: Pb_God.PBC2GFactionWarMemberList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionWarMemberList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionWarMemberList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionWarMemberList;
	}
	/**
	* 查询公会成员列表返回
	*/
	class PBG2CFactionWarMemberListAck {
		constructor();
		/**目标帮派ID*/
		public tarfactionid:number;
		/**成员信息*/
		public member:Pb_God.PBFactionWarMemberDisplay[];
		/**友方总星星*/
		public friendstar:number;
		/**敌方总星星*/
		public enemystar:number;
		/**废墟等级*/
		public ruinslevel:number;
		/**对战信息*/
		public warlist:Pb_God.PBFactionWarList;
		public static encode(message: Pb_God.PBG2CFactionWarMemberListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionWarMemberListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionWarMemberListAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionWarMemberListAck;
	}
	/**
	* 查询公会成员信息
	*/
	class PBC2GFactionWarMemberInfo {
		constructor();
		/**目标玩家ID*/
		public tarplayerid:number;
		/**玩家ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		/**帮派ID*/
		public factionid:number;
		public static encode(message: Pb_God.PBC2GFactionWarMemberInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionWarMemberInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionWarMemberInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionWarMemberInfo;
	}
	/**
	* 查询公会成员信息返回
	*/
	class PBG2CFactionWarMemberInfoAck {
		constructor();
		/**帮派显示*/
		public battledisplay:Pb_God.PBBattleDisplay;
		/**被攻打星数*/
		public beattackstar:number;
		/**成功防御次数*/
		public sucdefensecount:number;
		/**据点被挑战次数*/
		public toldefensecount:number;
		public static encode(message: Pb_God.PBG2CFactionWarMemberInfoAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionWarMemberInfoAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionWarMemberInfoAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionWarMemberInfoAck;
	}
	/**
	* 查询目标防御记录
	*/
	class PBC2GFactionWarQueryTarRecord {
		constructor();
		/**目标ID*/
		public tarplayerid:number;
		/**玩家ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		public static encode(message: Pb_God.PBC2GFactionWarQueryTarRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionWarQueryTarRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionWarQueryTarRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionWarQueryTarRecord;
	}
	/**
	* 返回查询战场日志
	*/
	class PBG2CFactionWarLogAck {
		constructor();
		/**战场日志信息*/
		public log:Pb_God.PBFactionWarLog[];
		public static encode(message: Pb_God.PBG2CFactionWarLogAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionWarLogAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionWarLogAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionWarLogAck;
	}
	/**
	* 返回查询目标防御记录
	*/
	class PBG2CFactionWarTarRecordAck {
		constructor();
		/**目标ID*/
		public tarplayerid:number;
		/**防御记录*/
		public record:Pb_God.PBFactionWarRecord[];
		public static encode(message: Pb_God.PBG2CFactionWarTarRecordAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionWarTarRecordAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionWarTarRecordAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionWarTarRecordAck;
	}
	/**
	* 返回查询进攻列表
	*/
	class PBG2CFactionWarAttackListAck {
		constructor();
		/**成员信息*/
		public member:Pb_God.PBFactionWarMemberDisplay[];
		public static encode(message: Pb_God.PBG2CFactionWarAttackListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionWarAttackListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionWarAttackListAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionWarAttackListAck;
	}
	/**
	* 开启宝箱
	*/
	class PBC2GFactionWarOpenBox {
		constructor();
		/**宝箱位置*/
		public pos:number;
		/**玩家ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		/**玩家名*/
		public playername:string;
		public static encode(message: Pb_God.PBC2GFactionWarOpenBox, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GFactionWarOpenBox, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GFactionWarOpenBox;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GFactionWarOpenBox;
	}
	/**
	* 同步宝箱信息
	*/
	class PBG2CFactionWarSynBoxInfo {
		constructor();
		/**总共个数*/
		public totolcount:number;
		/**战斗结果 _emBattleResult*/
		public result:number;
		/**开启过的宝箱*/
		public box:Pb_God.PBFactionWarBox[];
		public static encode(message: Pb_God.PBG2CFactionWarSynBoxInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionWarSynBoxInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionWarSynBoxInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionWarSynBoxInfo;
	}
	/**
	* 开启返回
	*/
	class PBG2CFactionWarSynOpen {
		constructor();
		/**是否参加*/
		public isjoin:boolean;
		public static encode(message: Pb_God.PBG2CFactionWarSynOpen, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionWarSynOpen, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionWarSynOpen;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionWarSynOpen;
	}
	/**
	*战斗结果
	*/
	class PBG2CFactionWarFightResult {
		constructor();
		/**次数*/
		public warcount:number;
		public static encode(message: Pb_God.PBG2CFactionWarFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionWarFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionWarFightResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionWarFightResult;
	}
	/**
	*帮会事件
	*/
	class PBFactionEvent {
		constructor();
		/**类型*/
		public type:number;
		/**角色名*/
		public name:string;
		/**参数*/
		public params:number[];
		/**时间*/
		public time:number;
		public static encode(message: Pb_God.PBFactionEvent, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionEvent, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionEvent;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionEvent;
	}
	/**
	*帮会事件
	*/
	class PBFactionAllEvents {
		constructor();
		/**事件*/
		public events:Pb_God.PBFactionEvent[];
		public static encode(message: Pb_God.PBFactionAllEvents, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionAllEvents, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionAllEvents;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionAllEvents;
	}
	/**
	* 编辑帮会信息	G -> C
	*/
	class PBG2CFactionPVPSkillUpgrade {
		constructor();
		/**索引*/
		public skillIndex:number;
		/**当前等级*/
		public curlevel:number;
		public static encode(message: Pb_God.PBG2CFactionPVPSkillUpgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionPVPSkillUpgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionPVPSkillUpgrade;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionPVPSkillUpgrade;
	}
	/**
	* 技能重置返回
	*/
	class PBG2CFactionPVPSkillReset {
		constructor();
		/**职业类型*/
		public jobtype:number;
		/**重置次数*/
		public resetcount:number;
		public static encode(message: Pb_God.PBG2CFactionPVPSkillReset, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFactionPVPSkillReset, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFactionPVPSkillReset;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFactionPVPSkillReset;
	}
}
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

declare namespace Pb_God {
	/**
	*----连连看请求
	*/
	enum _emC2S_JoyousLinkup_Protocol {
		// 	 开始游戏 PBC2GJoyousLinkupStart;
		C2S_JoyousLinkup_Start = 1,
		// 	 连接棋子 PBC2GJoyousLinkupConnect;
		C2S_JoyousLinkup_Connect = 2,
		// 	 刷新棋子位置;
		C2S_JoyousLinkup_Refresh = 3,
		// 	 退出游戏;
		C2S_JoyousLinkup_Quit = 4,
	}
	/**
	*----连连看返回
	*/
	enum _emS2C_JoyousLinkup_Protocol {
		// 	 初始信息 PBG2CJoyousLinkupStartInfo;
		S2C_JoyousLinkup_Start_Info = 1,
		// 	 连接棋子返回 PBG2CJoyousLinkupConnectResult;
		S2C_JoyousLinkup_Connect_Result = 2,
		// 	 棋子位置刷新 PBG2CJoyousLinkupChessData;
		S2C_JoyousLinkup_Info_Chg = 3,
		// 	 游戏结束 PBG2CJoyousLinkupEnd;
		S2C_JoyousLinkup_End = 4,
		// 	 退出游戏;
		S2C_JoyousLinkup_Quit = 5,
	}
	/**
	* 坐标
	*/
	class PBJoyousLinkupPos {
		constructor();
		/**x*/
		public x:number;
		/**y*/
		public y:number;
		public static encode(message: Pb_God.PBJoyousLinkupPos, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBJoyousLinkupPos, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBJoyousLinkupPos;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBJoyousLinkupPos;
	}
	/**
	* 开始游戏
	*/
	class PBC2GJoyousLinkupStart {
		constructor();
		/**是否为重开*/
		public bStart:boolean;
		public static encode(message: Pb_God.PBC2GJoyousLinkupStart, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GJoyousLinkupStart, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GJoyousLinkupStart;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GJoyousLinkupStart;
	}
	/**
	* 连接棋子
	*/
	class PBC2GJoyousLinkupConnect {
		constructor();
		/**起始棋子坐标*/
		public startPos:Pb_God.PBJoyousLinkupPos;
		/**目标棋子坐标*/
		public endPos:Pb_God.PBJoyousLinkupPos;
		public static encode(message: Pb_God.PBC2GJoyousLinkupConnect, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GJoyousLinkupConnect, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GJoyousLinkupConnect;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GJoyousLinkupConnect;
	}
	/**
	*每一行的数据
	*/
	class PBJoyousLinkupChessRow {
		constructor();
		/** 索引*/
		public index:number;
		/** 数值*/
		public data:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBJoyousLinkupChessRow, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBJoyousLinkupChessRow, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBJoyousLinkupChessRow;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBJoyousLinkupChessRow;
	}
	/**
	*棋盘数据
	*/
	class PBJoyousLinkupChessData {
		constructor();
		/**棋盘数据*/
		public indexdata:Pb_God.PBJoyousLinkupChessRow[];
		public static encode(message: Pb_God.PBJoyousLinkupChessData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBJoyousLinkupChessData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBJoyousLinkupChessData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBJoyousLinkupChessData;
	}
	/**
	* 初始数据
	*/
	class PBG2CJoyousLinkupStartInfo {
		constructor();
		/**棋盘类型*/
		public index:number;
		/**棋盘数据*/
		public chessData:Pb_God.PBJoyousLinkupChessData;
		/**最高积分*/
		public topScore:number;
		/**当前积分*/
		public currScore:number;
		/**关卡id*/
		public layerId:number;
		public static encode(message: Pb_God.PBG2CJoyousLinkupStartInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CJoyousLinkupStartInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CJoyousLinkupStartInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CJoyousLinkupStartInfo;
	}
	/**
	* 连接返回
	*/
	class PBG2CJoyousLinkupConnectResult {
		constructor();
		/**是否成功消除*/
		public flag:boolean;
		/**倒计时结束时间*/
		public endTime:number;
		/**当前连击数*/
		public currDoubleHit:number;
		/**起始棋子坐标*/
		public startPos:Pb_God.PBJoyousLinkupPos;
		/**目标棋子坐标*/
		public endPos:Pb_God.PBJoyousLinkupPos;
		/**当前积分*/
		public currScore:number;
		public static encode(message: Pb_God.PBG2CJoyousLinkupConnectResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CJoyousLinkupConnectResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CJoyousLinkupConnectResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CJoyousLinkupConnectResult;
	}
	/**
	* 棋盘棋子位置刷新
	*/
	class PBG2CJoyousLinkupChessData {
		constructor();
		/**棋盘数据*/
		public chessData:Pb_God.PBJoyousLinkupChessData;
		/**刷新次数*/
		public refreshNum:number;
		public static encode(message: Pb_God.PBG2CJoyousLinkupChessData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CJoyousLinkupChessData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CJoyousLinkupChessData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CJoyousLinkupChessData;
	}
	/**
	* 游戏结束
	*/
	class PBG2CJoyousLinkupEnd {
		constructor();
		/**游戏完成*/
		public flag:boolean;
		/**连击得分*/
		public doubleHitScore:number;
		/**消除得分*/
		public disScore:number;
		/**时间得分*/
		public timeScore:number;
		/**游戏结束*/
		public bOver:boolean;
		public static encode(message: Pb_God.PBG2CJoyousLinkupEnd, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CJoyousLinkupEnd, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CJoyousLinkupEnd;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CJoyousLinkupEnd;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 录像相关
	*/
	enum _emResultVideo_30 {
		// 成功;
		R_ResultVideo_Succeed = 0,
		// 失败;
		R_ResultVideo_Fail = 1,
		// 已经点赞过;
		R_ResultVideo_HaveLike = 2,
		// 需要点赞次数;
		R_ResultVideo_NeedLikeCount = 3,
		// 录像已经过期;
		R_ResultVideo_ExpireTime = 4,
		// 录像已经收藏;
		R_ResultVideo_HaveCollect = 5,
		// 录像未收藏;
		R_ResultVideo_NoCollect = 6,
		// 录像收藏已满;
		R_ResultVideo_MaxCollect = 7,
	}
	/**
	*----录像模块
	*/
	enum _emC2S_Video_Protocol {
		//查询系统录像		PBU32;
		C2S_Video_QuerySystem = 0,
		//点赞				PBC2GVideoActionAsk;
		C2S_Video_Like = 1,
		//播放系统录像		PBC2GVideoPlayerAsk;
		C2S_Video_PlaySystem = 2,
		//播放玩家录像		PBC2GVideoPlayerAsk;
		C2S_Video_PlayPlayer = 3,
		//分享				PBC2GVideoActionAsk;
		C2S_Video_Share = 4,
		//收藏				PBU64;
		C2S_Video_Collect = 5,
		//取消收藏			PBU64;
		C2S_Video_UnCollect = 6,
		//查询战斗数据		PBC2GVideoActionAsk;
		C2S_Video_QueryDamageData = 7,
		//查询录像伙伴数据	PBC2GQueryBattlePet;
		C2S_Video_QueryBattlePet = 8,
		//查询单个录像		PBU64;
		C2S_Video_QuerySingle = 9,
		//查询挂机录像录像	PBU32;
		C2S_Video_QueryHook = 10,
		//查询试练塔录像	PBU32;
		C2S_Video_QueryTower = 11,
		//查询玩家录像记录	PBC2GQueryPlayerRecord;
		C2S_Video_QueryPlayerRecord = 12,
		//查询多个录像		PBC2GQueryMutileVideo;
		C2S_Video_QueryMutiple = 13,
		//查询跨服录像多个	PBC2GQueryMutileVideoBW;
		C2S_Video_QueryMutipleBW = 14,
		//查询跨服伤害数据(video type, sn) PBU32U64;
		C2S_Video_QueryDamageDataBW = 15,
		//查询跨服伙伴数据 PBC2GQueryBattlePetBW;
		C2S_Video_QueryBattlePetBW = 16,
		//播放跨服录像(video type, sn) PBU32U64;
		C2S_Video_PlayBW = 17,
		//查询个人收藏	PBC2GQueryCollect;
		C2S_Video_QueryCollect = 100,
		//查询个人记录	PBU32;
		C2S_Video_QuerySelfRecord = 101,
		//查询挂机录像录像	PBWorldStageVideoInfo;
		C2S_Video_QueryTowerToWorld = 102,
		//添加离线记录	PBFightResult;
		C2S_Video_AddOfflineRecord = 103,
		//清除玩家录像(录像类型)	PBU32;
		C2S_Video_ClearPlayerType = 104,
	}
	/**
	*----录像模块
	*/
	enum _emS2C_Video_Protocol {
		//通用错误返回;
		S2C_Video_Common = 0,
		//查询系统录像返回		PBG2CVideoQuerySystemAck		;
		S2C_Video_QuerySystemAck = 1,
		//点赞次数返回			PBG2CVideoActionAck;
		S2C_Video_LikeCountAck = 2,
		//播放次数返回			PBG2CVideoActionAck;
		S2C_Video_PlayCountAck = 3,
		//分享次数返回			PBG2CVideoActionAck;
		S2C_Video_ShareCountAck = 4,
		//查询战斗数据返回		PBG2CVideoDamageDataAck;
		S2C_Video_QueryDamageDataAck = 5,
		//查询录像数据返回		PBPlayerPetView;
		S2C_Video_QueryBattlePetAck = 6,
		//播放录像				PBFightResult;
		S2C_Video_Play = 7,
		//查询单个录像返回		PBVideoDisplay;
		S2C_Video_QuerySingleAck = 8,
		//同步信息				PBPlayerVideo;
		S2C_Video_SynInfo = 9,
		//查询挂机录像返回		PBWorldStageVideoInfo;
		S2C_Video_QueryHookAck = 10,
		//查询试练塔录像返回	PBWorldStageVideoInfo;
		S2C_Video_QueryTowerAck = 11,
		//查询玩家录像返回		PBG2CVideoQuerySystemAck;
		S2C_Video_PlayerRecordAck = 12,
		//查询竞技场录像返回	PBG2CVideoPlayerRecordAck;
		S2C_Video_PlayerChallengeAck = 13,
		//查询多个录像返回		PBG2CQueryMutileVideo;
		S2C_Video_QueryMutiple = 14,
		//查询跨服录像多个返回	PBG2CQueryMutileVideo;
		S2C_Video_QueryMutipleBW = 15,
		//查询跨服伤害数据返回 PBG2CVideoDamageDataAck;
		S2C_Video_QueryDamageDataBW = 16,
		//查询跨服伙伴数据返回 PBPlayerPetView;
		S2C_Video_QueryBattlePetBW = 17,
		//播放跨服录像返回		PBFightResult;
		S2C_Video_PlayBW = 18,
	}
	/**
	*系统录像显示
	*/
	class PBVideoDisplay {
		constructor();
		/**流水ID*/
		public battlesn:Long;
		/**战斗类型_emBattleType*/
		public battletype:number;
		/**挑战ID*/
		public id:number;
		/**挑战ID*/
		public param:number;
		/**最大回合数*/
		public maxround:number;
		/**当前回合数*/
		public curround:number;
		/**战斗时间*/
		public begintime:number;
		/**战斗结果_emCampType*/
		public result:number;
		/**左边显示*/
		public leftdisplay:Pb_God.PBBattleDisplay;
		/**右边显示*/
		public rightdisplay:Pb_God.PBBattleDisplay;
		/**点赞次数*/
		public likecount:number;
		/**播放次数*/
		public playcount:number;
		/**分享次数*/
		public sharecount:number;
		/**友方名次*/
		public friendrank:number;
		/**敌方名次*/
		public enermyrank:number;
		/**当前赛程（选拔赛、总决赛这种*/
		public danType:number;
		/**超凡段位左边数据*/
		public leftDan:Pb_God.PBC2SPatVideoData;
		/**超凡段位右边数据*/
		public rightDan:Pb_God.PBC2SPatVideoData;
		public static encode(message: Pb_God.PBVideoDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBVideoDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBVideoDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBVideoDisplay;
	}
	/**
	*超凡段位赛数据
	*/
	class PBC2SPatVideoData {
		constructor();
		/**段位*/
		public danData:number;
		/**积分*/
		public danScore:number;
		public static encode(message: Pb_God.PBC2SPatVideoData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2SPatVideoData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2SPatVideoData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2SPatVideoData;
	}
	/**
	*查询玩家录像记录
	*/
	class PBC2GQueryPlayerRecord {
		constructor();
		/**录像类型_emVideoType*/
		public videotype:number;
		/**参数(表示关卡)*/
		public param:number;
		public static encode(message: Pb_God.PBC2GQueryPlayerRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GQueryPlayerRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GQueryPlayerRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GQueryPlayerRecord;
	}
	/**
	*查询个人收藏
	*/
	class PBC2GQueryCollect {
		constructor();
		/**流水ID*/
		public battlesn:Long[];
		public static encode(message: Pb_God.PBC2GQueryCollect, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GQueryCollect, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GQueryCollect;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GQueryCollect;
	}
	/**
	*查询录像伙伴数据
	*/
	class PBC2GQueryBattlePet {
		constructor();
		/**流水ID*/
		public battlesn:Long;
		/**伙伴SN*/
		public petsn:Long;
		/**录像类型*/
		public videotype:Long;
		public static encode(message: Pb_God.PBC2GQueryBattlePet, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GQueryBattlePet, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GQueryBattlePet;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GQueryBattlePet;
	}
	/**
	*录像数据
	*/
	class PBBattlePetDamageData {
		constructor();
		/**伙伴显示*/
		public petdisplay:Pb_God.PBPetDisplay;
		/**伤害值*/
		public damage:number;
		/**治疗值*/
		public cure:number;
		public static encode(message: Pb_God.PBBattlePetDamageData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBattlePetDamageData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBattlePetDamageData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBattlePetDamageData;
	}
	/**
	*查询录像数据返回
	*/
	class PBG2CVideoDamageDataAck {
		constructor();
		/**战斗信息*/
		public fightResult:Pb_God.PBFightResult;
		public static encode(message: Pb_God.PBG2CVideoDamageDataAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CVideoDamageDataAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CVideoDamageDataAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CVideoDamageDataAck;
	}
	/**
	*查询系统录像返回
	*/
	class PBG2CVideoQuerySystemAck {
		constructor();
		/**录像类型*/
		public videotype:number;
		/**系统录像显示*/
		public display:Pb_God.PBVideoDisplay[];
		public static encode(message: Pb_God.PBG2CVideoQuerySystemAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CVideoQuerySystemAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CVideoQuerySystemAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CVideoQuerySystemAck;
	}
	/**
	*录像操作类型
	*/
	class PBC2GVideoPlayerAsk {
		constructor();
		/**系统录像类型*/
		public videotype:number;
		/**流水ID*/
		public battlesn:Long;
		/**挂机/试练塔表示层数,玩家的录像表示玩家ID*/
		public key:number;
		public static encode(message: Pb_God.PBC2GVideoPlayerAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GVideoPlayerAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GVideoPlayerAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GVideoPlayerAsk;
	}
	/**
	*录像操作类型
	*/
	class PBC2GVideoActionAsk {
		constructor();
		/**系统录像类型*/
		public videotype:number;
		/**流水ID*/
		public battlesn:Long;
		public static encode(message: Pb_God.PBC2GVideoActionAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GVideoActionAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GVideoActionAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GVideoActionAsk;
	}
	/**
	*录像操作类型
	*/
	class PBG2CVideoActionAck {
		constructor();
		/**系统录像类型*/
		public videotype:number;
		/**流水ID*/
		public battlesn:Long;
		/**次数*/
		public count:number;
		public static encode(message: Pb_God.PBG2CVideoActionAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CVideoActionAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CVideoActionAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CVideoActionAck;
	}
	/**
	* 通关录像
	*/
	class PBPlayerVideoDisplay {
		constructor();
		/**显示*/
		public display:Pb_God.PBPlayerDisplay;
		/**参数*/
		public param:number;
		/**战斗流水*/
		public battlesn:Long;
		public static encode(message: Pb_God.PBPlayerVideoDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerVideoDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerVideoDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerVideoDisplay;
	}
	/**
	* 通关录像
	*/
	class PBWorldStageVideoInfo {
		constructor();
		/**关卡*/
		public stageid:number;
		/**最快*/
		public fast:Pb_God.PBPlayerVideoDisplay;
		/**最小战力*/
		public fightpower:Pb_God.PBPlayerVideoDisplay;
		/**最近/我的通关录像*/
		public lately:Pb_God.PBPlayerVideoDisplay;
		public static encode(message: Pb_God.PBWorldStageVideoInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldStageVideoInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldStageVideoInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldStageVideoInfo;
	}
	/**
	* 查询多个录像
	*/
	class PBC2GQueryMutileVideo {
		constructor();
		/**视频类型 _emVideoType*/
		public type:number;
		/**战斗sn*/
		public battlesn:Long[];
		public static encode(message: Pb_God.PBC2GQueryMutileVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GQueryMutileVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GQueryMutileVideo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GQueryMutileVideo;
	}
	/**
	* 查询多个录像
	*/
	class PBC2GQueryMutileVideoBW {
		constructor();
		/**视频类型 _emVideoType*/
		public type:number;
		/**战斗sn*/
		public battlesn:Long[];
		public static encode(message: Pb_God.PBC2GQueryMutileVideoBW, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GQueryMutileVideoBW, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GQueryMutileVideoBW;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GQueryMutileVideoBW;
	}
	/**
	* 查询多个录像BW
	*/
	class PBQueryMutileVideoBW {
		constructor();
		/**world id*/
		public worldid:number;
		/**player id*/
		public playerid:number;
		/**类型*/
		public type:number;
		/**战斗sn*/
		public battlesn:Long[];
		public static encode(message: Pb_God.PBQueryMutileVideoBW, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBQueryMutileVideoBW, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBQueryMutileVideoBW;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBQueryMutileVideoBW;
	}
	/**
	* 查询多个录像返回
	*/
	class PBG2CQueryMutileVideo {
		constructor();
		/**视频类型 _emVideoType*/
		public type:number;
		/**录像显示*/
		public display:Pb_God.PBVideoDisplay[];
		public static encode(message: Pb_God.PBG2CQueryMutileVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CQueryMutileVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CQueryMutileVideo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CQueryMutileVideo;
	}
	/**
	*查询录像伙伴数据
	*/
	class PBPlayerVideoBW {
		constructor();
		/**world id*/
		public worldid:number;
		/**player id*/
		public playerid:number;
		/**视频类型 _emVideoType*/
		public type:number;
		/**战斗sn*/
		public battlesn:Long;
		public static encode(message: Pb_God.PBPlayerVideoBW, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerVideoBW, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerVideoBW;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerVideoBW;
	}
	/**
	*查询录像伙伴数据
	*/
	class PBC2GQueryBattlePetBW {
		constructor();
		/**视频类型 _emVideoType*/
		public type:number;
		/**战斗sn*/
		public battlesn:Long;
		/**伙伴SN*/
		public petsn:Long;
		public static encode(message: Pb_God.PBC2GQueryBattlePetBW, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GQueryBattlePetBW, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GQueryBattlePetBW;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GQueryBattlePetBW;
	}
	/**
	*查询录像伙伴数据BW
	*/
	class PBQueryBattlePetBW {
		constructor();
		/**world id*/
		public worldid:number;
		/**player id*/
		public playerid:number;
		/**视频类型 _emVideoType*/
		public type:number;
		/**战斗sn*/
		public battlesn:Long;
		/**伙伴SN*/
		public petsn:Long;
		public static encode(message: Pb_God.PBQueryBattlePetBW, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBQueryBattlePetBW, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBQueryBattlePetBW;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBQueryBattlePetBW;
	}
	/**
	*录像点赞数据表
	*/
	class PBRedisVideoOptData {
		constructor();
		/**分享次数*/
		public sharecount:number;
		/**点赞次数*/
		public likecount:number;
		/**播放次数*/
		public playcount:number;
		/**录像标记*/
		public mark:number;
		public static encode(message: Pb_God.PBRedisVideoOptData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRedisVideoOptData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRedisVideoOptData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRedisVideoOptData;
	}
	/**
	*关卡类型录像管理
	*/
	class PBRedisVideoStageData {
		constructor();
		/**关卡id*/
		public stageid:number;
		/**最快通关战斗sn*/
		public fastsn:Long;
		/**最快通关战斗时间*/
		public fastvalue:number;
		/**最小战力通关战斗sn*/
		public fightpowersn:Long;
		/**最小战力战斗战力*/
		public fightpower:Long;
		/**最近通关战斗sn*/
		public latelysn:Long;
		public static encode(message: Pb_God.PBRedisVideoStageData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRedisVideoStageData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRedisVideoStageData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRedisVideoStageData;
	}
	/**
	*单类录像
	*/
	class PBRedisVideoSn {
		constructor();
		/**录像类型*/
		public videotype:number;
		/**战斗sn*/
		public battlesn:Long[];
		public static encode(message: Pb_God.PBRedisVideoSn, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRedisVideoSn, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRedisVideoSn;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRedisVideoSn;
	}
	/**
	*录像信息管理
	*/
	class PBRedisVideoData {
		constructor();
		/**录像*/
		public video:Pb_God.PBRedisVideoSn[];
		public static encode(message: Pb_God.PBRedisVideoData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRedisVideoData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRedisVideoData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRedisVideoData;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 跨服竞技场相关
	*/
	enum _emResultCrossChallenge_38 {
		//     成功;
		R_ResultCrossChallenge_Succeed = 0,
		//     失败;
		R_ResultCrossChallenge_Fail = 1,
		//     冷却中;
		R_ResultCrossChallenge_Cooling = 2,
		//     已经领取过;
		R_ResultCrossChallenge_HavePrize = 3,
		//     挑战次数不足;
		R_ResultCrossChallenge_NeedFightCount = 4,
		//     该玩家正在进行一场战斗，请稍后再试;
		R_ResultCrossChallenge_InFighting = 5,
		//     道具不足;
		R_ResultCrossChallenge_NeedItem = 6,
		//     状态不对;
		R_ResultCrossChallenge_StateError = 7,
		//     没到开放时间;
		R_ResultCrossChallenge_OpenTime = 8,
		//     玩家不存在;
		R_ResultCrossChallenge_PlayerNotExist = 9,
		//    系统未开放;
		R_ResultCrossChallenge_SystemOpen = 10,
		//    已经对该玩家点过赞了;
		R_ResultCrossChallenge_Liked = 11,
		//    进攻队伍必须都有精灵上阵;
		R_ResultCrossChallenge_TeamATKIsNull = 12,
	}
	/**
	*----客户端到服务器
	*/
	enum _emC2S_CrossChallenge_Protocol {
		//   刷新对手;
		C2S_CrossChallenge_Refresh = 1,
		//   领取每日宝箱 (index)	    					PBU32;
		C2S_CrossChallenge_DailyPrize = 2,
		//   打开跨服竞技场;
		C2S_CrossChallenge_Open = 3,
		//   查询玩家信息;
		C2S_CrossChallenge_Query = 4,
		//   赛季荣耀点赞 (玩家id)		        		PBU32;
		C2S_CrossChallenge_HonourLike = 5,
		//   请求挑战记录;
		C2S_CrossChallenge_Record = 6,
		//   购买奖品,第一个免费，后边两个要买(index)         PBU32 ;
		C2S_CrossChallenge_BuyPrize = 7,
		//   设置防守队伍(每个队伍会发送S2C_Pet_Set_Zhenfa_Ack返回)      PBCrossChallengeSetTeam;
		C2S_CrossChallenge_SetTeamDEF = 8,
		//   设置进攻队伍(每个队伍会发送S2C_Pet_Set_Zhenfa_Ack返回)      PBCrossChallengeSetTeam ;
		C2S_CrossChallenge_SetTeamATK = 9,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_CrossChallenge_Protocol {
		//    失败才返回;
		S2C_CrossChallenge_Common_Ack = 0,
		//    对手信息返回		                        PBCrossChallengeRefresh;
		S2C_CrossChallenge_Refresh = 1,
		//    领取每日宝箱返回	                        PBCrossChallengeDailyInfo;
		S2C_CrossChallenge_DailyPrize = 2,
		//	打开跨服竞技场返回						PBCrossChallengeOpenInfo;
		S2C_CrossChallenge_Open = 3,
		//    查询玩家信息返回	                    	PBCrossChallengeInfo;
		S2C_CrossChallenge_Query = 4,
		//    同步次数		                            PBU32;
		S2C_CrossChallenge_Count = 5,
		//    点赞返回(key : 玩家id, value : 点赞数)    PBU32U32 ;
		S2C_CrossChallenge_HonourLike = 6,
		//    挑战记录返回		                        PBCrossChallengerResults;
		S2C_CrossChallenge_Record = 7,
		//	购买奖品返回 								PBU32;
		S2C_CrossChallenge_BuyPrize = 8,
		//	设置防御队伍返回							PBCrossChallengeSetTeamAck;
		S2C_CrossChallenge_SetTeamDEF = 9,
		//	战斗奖品									PBCrossChallengeFightPrize;
		S2C_CrossChallenge_Prize = 10,
		//	设置进攻队伍返回							PBCrossChallengeSetTeamAck;
		S2C_CrossChallenge_SetTeamATK = 11,
	}
	/**
	* 打开跨服竞技场玩家信息
	*/
	class PBCrossChallengeOpenInfo {
		constructor();
		/** 名次*/
		public order:number;
		/** 积分*/
		public score:number;
		/** 获得积分的时间*/
		public scoretime:number;
		/** 0：不开放挑战  1:开放挑战*/
		public openflag:number;
		/** 对应倒计时时间*/
		public overtime:number;
		/** 自己信息*/
		public self:Pb_God.PBCrossChallengeInfo;
		/** 对手信息*/
		public targets:Pb_God.PBCrossChallengeInfo[];
		/** 索引*/
		public dailyinfo:number[];
		/** 今天点了赞的玩家，每日清理*/
		public likeplayer:number[];
		/** 赛季荣耀*/
		public horourinfo:Pb_God.PBCrossChallengeHonourInfo[];
		/** 历史最高排名*/
		public historyrank:number;
		/** 赛季*/
		public seasonindex:number;
		public static encode(message: Pb_God.PBCrossChallengeOpenInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeOpenInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeOpenInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeOpenInfo;
	}
	/**
	* 跨服竞技场刷新对手信息
	*/
	class PBCrossChallengeRefresh {
		constructor();
		/** 对手信息*/
		public targets:Pb_God.PBCrossChallengeInfo[];
		public static encode(message: Pb_God.PBCrossChallengeRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeRefresh;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeRefresh;
	}
	/**
	* 宝箱领取信息
	*/
	class PBCrossChallengeDailyInfo {
		constructor();
		/** 索引*/
		public dailyinfo:number[];
		public static encode(message: Pb_God.PBCrossChallengeDailyInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeDailyInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeDailyInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeDailyInfo;
	}
	/**
	*玩家点赞信息
	*/
	class PBCrossChallengeLikeInfo {
		constructor();
		/** palyerid*/
		public likeinfo:number[];
		public static encode(message: Pb_God.PBCrossChallengeLikeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeLikeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeLikeInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeLikeInfo;
	}
	/**
	* 战斗奖励
	*/
	class PBCrossChallengeFightPrize {
		constructor();
		/**奖品index*/
		public index:number[];
		public static encode(message: Pb_God.PBCrossChallengeFightPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeFightPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeFightPrize;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeFightPrize;
	}
	/**
	* 跨服竞技场向BW同步玩家信息
	*/
	class PBCrossChallengerSyncInfo {
		constructor();
		/** 玩家显示*/
		public display:Pb_God.PBPlayerDisplay;
		/** 队伍*/
		public team:Pb_God.PBPlayerCrossChallengeTeamInfo;
		/** 战斗力*/
		public power:number;
		/** 工会名*/
		public faction:string;
		public static encode(message: Pb_God.PBCrossChallengerSyncInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengerSyncInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengerSyncInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengerSyncInfo;
	}
	/**
	* 跨服竞技场一场战斗记录，三次战斗
	*/
	class PBCrossChallengerBattleResult {
		constructor();
		/** 战斗记录3个*/
		public fightresults:Pb_God.PBFightResult[];
		public static encode(message: Pb_God.PBCrossChallengerBattleResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengerBattleResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengerBattleResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengerBattleResult;
	}
	/**
	* 跨服竞技场战斗记录
	*/
	class PBCrossChallengerResults {
		constructor();
		/** 战斗记录*/
		public results:Pb_God.PBCrossChallengerBattleResult[];
		public static encode(message: Pb_God.PBCrossChallengerResults, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengerResults, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengerResults;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengerResults;
	}
	/**
	* 数据库中保存的竞技场玩家信息
	*/
	class PBCrossChallengeDBData {
		constructor();
		/** 玩家信息*/
		public info:Pb_God.PBCrossChallengeInfo;
		/** 战斗记录*/
		public record:Pb_God.PBCrossChallengerResults;
		public static encode(message: Pb_God.PBCrossChallengeDBData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeDBData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeDBData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeDBData;
	}
	/**
	* 加载数据库中的竞技场玩家信息
	*/
	class PBCrossChallengeDBDataSave {
		constructor();
		/** group id*/
		public group:number;
		/** 玩家数据*/
		public data:Pb_God.PBCrossChallengeDBData;
		public static encode(message: Pb_God.PBCrossChallengeDBDataSave, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeDBDataSave, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeDBDataSave;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeDBDataSave;
	}
	/**
	* 加载数据库中的竞技场玩家信息
	*/
	class PBCrossChallengeDBDataLoad {
		constructor();
		/** group id*/
		public group:number;
		/** 玩家数据*/
		public data:Pb_God.PBCrossChallengeDBData[];
		public static encode(message: Pb_God.PBCrossChallengeDBDataLoad, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeDBDataLoad, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeDBDataLoad;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeDBDataLoad;
	}
	/**
	* 跨服竞技场设置队伍
	*/
	class PBCrossChallengeSetTeam {
		constructor();
		/** 队伍 3个*/
		public team:Pb_God.PBPlayerZhenfaInfo[];
		/** 是否隐藏队伍 3个*/
		public hideteam:boolean[];
		public static encode(message: Pb_God.PBCrossChallengeSetTeam, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeSetTeam, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeSetTeam;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeSetTeam;
	}
	/**
	* 跨服竞技场设队伍返回
	*/
	class PBCrossChallengeSetTeamAck {
		constructor();
		/** 队伍 3个*/
		public team:Pb_God.PBPlayerZhenfaInfo[];
		/** 是否隐藏队伍 3个*/
		public hideteam:boolean[];
		/** 第n队设置是否成功*/
		public ok:boolean[];
		public static encode(message: Pb_God.PBCrossChallengeSetTeamAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeSetTeamAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeSetTeamAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeSetTeamAck;
	}
	/**
	* 跨服竞技场赛季荣耀
	*/
	class PBCrossChallengeHonourInfo {
		constructor();
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**点赞数*/
		public like:number;
		public static encode(message: Pb_God.PBCrossChallengeHonourInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeHonourInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeHonourInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeHonourInfo;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 特权相关
	*/
	enum _emResultPrivilege_31 {
		//  成功;
		R_ResultPrivilege_Succeed = 0,
		//  失败;
		R_ResultPrivilege_Fail = 1,
		// 扣除的道具不足;
		R_ResultPrivilege_NeedItem = 2,
		// VIP 等级不够;
		R_ResultPrivilege_VIPLevel = 3,
		// 已经买过了;
		R_ResultPrivilege_AlreadyBought = 4,
		// 还不到时间;
		R_ResultPrivilege_Time = 5,
		// 需要特权卡;
		R_ResultPrivilege_NeedCardID = 6,
		// 已经领取过;
		R_ResultPrivilege_HavePrize = 7,
	}
	/**
	*----特权模块
	*/
	enum _emC2S_Privilege_Protocol {
		// 	 购买vip礼包			PBU32;
		C2S_Privilege_BuyVipPacket = 1,
		// 	 购买特权商店			PBU32;
		C2S_Privilege_ShopBuy = 2,
		// 	 领取每日奖励			PBU32		;
		C2S_Privilege_DailyPrize = 3,
	}
	/**
	*----特权模块
	*/
	enum _emS2C_Privilege_Protocol {
		//	 通用失败返回;
		S2C_Privilege_Common = 0,
		//	 新vip经验			PBU32;
		S2C_Privilege_UpVipExp = 1,
		//	 购买vip礼包返回 		PBU32;
		S2C_Privilege_BuyVipPacket = 2,
		//	 购买特权商店 		PBU32;
		S2C_Privilege_ShopBuy = 3,
		//	 领取每日奖励			PBU32;
		S2C_Privilege_DailyPrize = 4,
		//	 同步特权卡充值		PBPrivilegeCharge;
		S2C_Privilege_CardCharge = 5,
		//	 同步特权卡			PBPrivilegeCard;
		S2C_Privilege_SynCard = 6,
		// 	 同步特权数据 	    PBPlayerPrivilege;
		S2C_Privilege_SynData = 7,
	}
	/**
	*每日礼包
	*/
	enum _emPrivilegeDailyPacket {
		//	 每日免费;
		PrivilegeDailyPacket_FreeDaily = 1,
		//	 vip至尊月卡;
		PrivilegeDailyPacket_VipZZMonth = 2,
		//	 荣耀月卡;
		PrivilegeDailyPacket_RRMonth = 3,
		//	 至尊月卡;
		PrivilegeDailyPacket_ZZMonth = 4,
		//	 每日充值;
		PrivilegeDailyPacket_DailyCharge = 5,
	}
}
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

declare namespace Pb_God {
	/**
	* 登录请求 内容serverid=%d&plattype=%d&Uname=%s&Pwd=%s&playerid=%d
	*/
	class PBLoginAsk {
		constructor();
		/** 登录信息(用户名&密码)*/
		public login:string;
		public static encode(message: Pb_God.PBLoginAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLoginAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLoginAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLoginAsk;
	}
	/**
	* 登录返回
	*/
	class PBLoginAck {
		constructor();
		/** 玩家账号信息*/
		public account:Pb_God.PBAccount;
		/** 开服时间*/
		public worldCreateTime:Long;
		/** 合服时间*/
		public worldMergeTime:Long;
		public static encode(message: Pb_God.PBLoginAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLoginAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLoginAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLoginAck;
	}
	/**
	* 登录请求
	*/
	class PBC2GLoginAsk {
		constructor();
		/** 角色ID*/
		public playerID:number;
		/** 登录流水号*/
		public loginSN:Long;
		/** 是否断线重连*/
		public bReconnet:boolean;
		public static encode(message: Pb_God.PBC2GLoginAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GLoginAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GLoginAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GLoginAsk;
	}
	/**
	* 登录返回
	*/
	class PBG2CLoginAck {
		constructor();
		/** 当前时间*/
		public curtime:number;
		public static encode(message: Pb_God.PBG2CLoginAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLoginAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLoginAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLoginAck;
	}
	/**
	* 登录返回玩家角色列表
	*/
	class PBAccountLoadAck {
		constructor();
		/** 账号ID*/
		public accountid:number;
		/** 玩家信息*/
		public displayer:Pb_God.PBPlayerDisplay[];
		public static encode(message: Pb_God.PBAccountLoadAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBAccountLoadAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBAccountLoadAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBAccountLoadAck;
	}
	/**
	* 检查名字
	*/
	class PBCheckPlayerNameAsk {
		constructor();
		/** 玩家名字 */
		public name:string;
		public static encode(message: Pb_God.PBCheckPlayerNameAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCheckPlayerNameAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCheckPlayerNameAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCheckPlayerNameAsk;
	}
	/**
	* 检测名字返回
	*/
	class PBPlayerNameAck {
		constructor();
		/** _emNetResult*/
		public ret:number;
		/***/
		public name:string;
		public static encode(message: Pb_God.PBPlayerNameAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerNameAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerNameAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerNameAck;
	}
	/**
	* 角色创建请求
	*/
	class PBCreatePlayerAsk {
		constructor();
		/** 玩家头*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		public static encode(message: Pb_God.PBCreatePlayerAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCreatePlayerAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCreatePlayerAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCreatePlayerAsk;
	}
	/**
	* 角色创建返回
	*/
	class PBCreatePlayerAck {
		constructor();
		/** 玩家信息*/
		public displayer:Pb_God.PBPlayerDisplay;
		/** 创建时间*/
		public createtime:number;
		public static encode(message: Pb_God.PBCreatePlayerAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCreatePlayerAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCreatePlayerAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCreatePlayerAck;
	}
	/**
	* 角色选择请求
	*/
	class PBSelectPlayerAsk {
		constructor();
		/** 玩家ID*/
		public playerID:number;
		public static encode(message: Pb_God.PBSelectPlayerAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBSelectPlayerAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBSelectPlayerAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBSelectPlayerAsk;
	}
	/**
	* 角色选择返回
	*/
	class PBSelectPlayerAck {
		constructor();
		/** 玩家ID*/
		public playerID:number;
		/** host*/
		public host:string;
		/** 网络字节端口*/
		public port:number;
		/** 登录SN*/
		public loginsn:Long;
		/** 是否可以填邀请码（账户的第一个角色）*/
		public invite:boolean;
		public static encode(message: Pb_God.PBSelectPlayerAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBSelectPlayerAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBSelectPlayerAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBSelectPlayerAck;
	}
	/**
	* 防沉迷检测
	*/
	class PBPlayerWallowData {
		constructor();
		/** 账号在线时间*/
		public onlineTime:number;
		/** 账号今天在线时间*/
		public dailyOnlineTime:number;
		/**id绑定*/
		public isIDBlind:boolean;
		/**是否成年*/
		public isAdult:boolean;
		public static encode(message: Pb_God.PBPlayerWallowData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerWallowData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerWallowData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerWallowData;
	}
	/**
	* 关服消息
	*/
	class PBCloseServerData {
		constructor();
		/**关服倒计时*/
		public closeTime:Long;
		/**关服通告*/
		public closeStr:string;
		public static encode(message: Pb_God.PBCloseServerData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCloseServerData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCloseServerData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCloseServerData;
	}
}
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

declare namespace Pb_God {
	/**
	*----天界副本的返回
	*/
	enum _emResultHeavenDungeon_37 {
		//  成功;
		R_ResultHeavenDungeon_Succeed = 0,
		//  失败;
		R_ResultHeavenDungeon_Fail = 1,
		//  还没有开启;
		R_ResultHeavenDungeon_NotOpend = 2,
		//  条件未满足不能领取奖励;
		R_ResultHeavenDungeon_Requirement = 3,
		//  缺少道具不能购买;
		R_ResultHeavenDungeon_NeedItem = 4,
		//  次数用光;
		R_ResultHeavenDungeon_NoTimes = 5,
		//  购买次数用光;
		R_ResultHeavenDungeon_NoBuyTimes = 6,
		//  次数达到最大值;
		R_ResultHeavenDungeon_TimesFull = 7,
		//  已经领取;
		R_ResultHeavenDungeon_Acquired = 8,
		//  星星数没有满, 不能扫荡;
		R_ResultHeavenDungeon_Star = 9,
		//  英雄已死;
		R_ResultHeavenDungeon_HeroDead = 10,
		//  英雄不存在，不是上次派上场的英雄;
		R_ResultHeavenDungeon_NoHero = 11,
		//  只有一次战斗;
		R_ResultHeavenDungeon_OnlyOneFight = 12,
	}
	/**
	*----天界副本模块
	*/
	enum _emC2S_HeavenDungeon_Protocol {
		// 	 领章节奖品                                               PBU32;
		C2S_HeavenDungeon_ChapterReward = 1,
		// 	 购买挑战次数;
		C2S_HeavenDungeon_BuyCount = 2,
		// 	 祈祷                                                    PBC2GHeavenDungeonPray;
		C2S_HeavenDungeon_Pray = 3,
		//     扫荡关卡,服务器用S2C_HeavenDungeon_StageChange返回       PBU32 ;
		C2S_HeavenDungeon_Sweep = 4,
	}
	/**
	*----天界副本模块
	*/
	enum _emS2C_HeavenDungeon_Protocol {
		// 	 通用返回;
		S2C_HeavenDungeon_Common_ACK = 1,
		//     领取章节奖品返回             PBU32;
		S2C_HeavenDungeon_ChapterReward = 2,
		//     购买挑战次数返回             PBG2CHeavenDungeonCount;
		S2C_HeavenDungeon_BuyCount = 3,
		//     祈祷返回                    PBG2CHeavenDungeonPray;
		S2C_HeavenDungeon_Pray = 4,
		//     关卡战斗或扫荡之后推送       PBG2CHeavenDungeonStageSync;
		S2C_HeavenDungeon_StageSync = 5,
	}
	/**
	*祈祷请求
	*/
	class PBC2GHeavenDungeonPray {
		constructor();
		/** 神像*/
		public statue:number;
		/** 次数 1 or 10*/
		public num:number;
		public static encode(message: Pb_God.PBC2GHeavenDungeonPray, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GHeavenDungeonPray, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GHeavenDungeonPray;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GHeavenDungeonPray;
	}
	/**
	*次数
	*/
	class PBG2CHeavenDungeonCount {
		constructor();
		/** 当前挑战次数*/
		public count:number;
		/** 已经使用的购买次数*/
		public buycount:number;
		public static encode(message: Pb_God.PBG2CHeavenDungeonCount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CHeavenDungeonCount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CHeavenDungeonCount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CHeavenDungeonCount;
	}
	/**
	*挑战关卡的返回,需要两次的战斗只会在两次战斗胜利后推送
	*/
	class PBG2CHeavenDungeonStageSync {
		constructor();
		/** 关卡*/
		public stage:Pb_God.PBPlayerHeavenDungeonStage;
		/** 当前挑战次数*/
		public count:number;
		/** 已经使用的购买次数*/
		public buycount:number;
		public static encode(message: Pb_God.PBG2CHeavenDungeonStageSync, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CHeavenDungeonStageSync, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CHeavenDungeonStageSync;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CHeavenDungeonStageSync;
	}
	/**
	*祈祷返回
	*/
	class PBG2CHeavenDungeonPray {
		constructor();
		/** 神像*/
		public statue:number;
		/** 奖励index*/
		public reward:number[];
		/** 免费次数*/
		public freecount:number;
		/** 该神像的祈祷次数*/
		public times:number;
		public static encode(message: Pb_God.PBG2CHeavenDungeonPray, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CHeavenDungeonPray, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CHeavenDungeonPray;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CHeavenDungeonPray;
	}
	/**
	*再战斗一次
	*/
	class PBG2CHeavenDungeonFightAgain {
		constructor();
		/** 关卡index*/
		public index:number;
		/** 1或者2，表示用1队还是2队战斗*/
		public team:number;
		public static encode(message: Pb_God.PBG2CHeavenDungeonFightAgain, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CHeavenDungeonFightAgain, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CHeavenDungeonFightAgain;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CHeavenDungeonFightAgain;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 召唤相关
	*/
	enum _emResultCall_12 {
		//  成功;
		R_ResultCall_Succeed = 0,
		//  失败;
		R_ResultCall_Fail = 1,
		// 扣除的道具不足;
		R_ResultCall_NeedItem = 2,
		// vip等级不足;
		R_ResultCall_NeedVipLevel = 3,
		// 伙伴背包不足;
		R_ResultCall_NeedPetBag = 4,
		// 无免费次数;
		R_ResultCall_NoFreeCount = 5,
		// 伙伴星级不满足;
		R_ResultCall_NeedPetStar = 6,
		// 请先保存已经转换的伙伴;
		R_ResultCall_ChangeNoSave = 7,
		// 伙伴类型不满足;
		R_ResultCall_NeedPetType = 8,
		// 伙伴阵法或者加锁，不能使用;
		R_ResultCall_PetInZhenfa = 9,
		// 无可以保存的伙伴;
		R_ResultCall_NoChangeSave = 10,
		// 此伙伴已经被删除;
		R_ResultCall_NoPet = 11,
		// 此伙伴星级对不上;
		R_ResultCall_PetNoStar = 12,
		// 解放类型参数不合法;
		R_ResultCall_FixType = 13,
		// 配置文件中没有此伙伴;
		R_ResultCall_NotConfigPet = 14,
		// 伙伴等级不满足;
		R_ResultCall_NeedPetLevel = 15,
		// 伙伴进化等级不满足;
		R_ResultCall_NeedPetEvolve = 16,
		// 伙伴进阶等级不满足;
		R_ResultCall_NeedPetAdvance = 17,
		// 伙伴已戴神装;
		R_ResultCall_WaveGodEquip = 18,
		// 伙伴已戴宝石;
		R_ResultCall_WaveRune = 19,
		// 伙伴已穿装备;
		R_ResultCall_WaveEquip = 20,
	}
	/**
	*----召唤模块
	*/
	enum _emC2S_Call_Protocol {
		// 	 召唤一次		PBU32;
		C2S_Call_OnePet = 1,
		// 	 召唤十次		PBU32;
		C2S_Call_TenPet = 2,
		// 	 免费召唤		PBU32;
		C2S_Call_Free = 3,
		// 	 英雄转换		PBU64;
		C2S_Call_Change = 4,
		// 	 英雄转换保存	PBU32;
		C2S_Call_SaveChange = 5,
		// 	 设置自动分解	PBU32;
		C2S_Call_AutoSplit = 6,
		//	 固定英雄转换	PBC2G_Call_FixChange;
		C2S_Call_FixChange = 7,
	}
	/**
	*----召唤模块
	*/
	enum _emS2C_Call_Protocol {
		//	 通用失败返回;
		S2C_Call_Common = 0,
		//	 更新召唤信息		PBPlayerCallInfo;
		S2C_Call_Update = 1,
		// 	 伙伴转换返回		PBPlayerCallChange;
		S2C_Call_Change = 2,
		// 	 伙伴转换保存返回	PBU32;
		S2C_Call_SaveChangeAck = 3,
		// 	 设置自动分解返回	PBU32;
		S2C_Call_AutoSplit = 4,
		// 	 固定伙伴转换返回	PBPlayerCallChange;
		S2C_Call_FixChange = 5,
	}
	/**
	*----固定转换功能类型
	*/
	enum _emFixChangeType {
		// 	 解放胡帕活动;
		FixChangeType_UnLockPetActivity = 1,
	}
	/**
	*----固定转换功能类型 C2S_Call_FixChange
	*/
	class PBC2G_Call_FixChange {
		constructor();
		/** 类型值，_emFixChangeType*/
		public type:number;
		/** 伙伴SN*/
		public value:Long;
		public static encode(message: Pb_God.PBC2G_Call_FixChange, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2G_Call_FixChange, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2G_Call_FixChange;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2G_Call_FixChange;
	}
}
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

declare namespace Pb_God {
	/**
	*----守护的返回
	*/
	enum _emResultDefend_50 {
		//  成功;
		R_Defend_Succeed = 0,
		//  失败;
		R_Defend_Fail = 1,
		//  已经达到当前阶等级上限;
		R_Defend_MaxLevel = 2,
		//  已满阶;
		R_Defend_MaxRank = 3,
		//  道具不足;
		R_Defend_NeedItem = 4,
		//  未达到升阶条件;
		R_Defend_RankContidion = 5,
		//  方案未解锁;
		R_Defend_PlanLock = 6,
		//  槽位未解锁;
		R_Defend_SlotLock = 7,
		//  英雄已在出战;
		R_Defend_PetFight = 8,
		//  当前方案没有英雄;
		R_Defend_NoPet = 9,
	}
	/**
	*----守护请求
	*/
	enum _emC2S_Defend_Protocol {
		// 	 升级;
		C2S_Defend_LevelUp = 1,
		// 	 升阶;
		C2S_Defend_RankUp = 2,
		// 	 保存方案         PBDefendPlan;
		C2S_Defend_SavePlan = 3,
		// 	 使用方案         PBC2GDefendUsePlan;
		C2S_Defend_UsePlan = 4,
		// 	 解锁方案         PBC2GDefendUnlockPlan;
		C2S_Defend_UnlockPlan = 5,
		// 	 属性预览         PBC2GDefendPreviewAttr;
		C2S_Defend_PreviewAttr = 6,
		// 	 移除某个宠物     PBC2GDefendRemovePet;
		C2S_Defend_RemovePet = 7,
	}
	/**
	*----守护返回
	*/
	enum _emS2C_Defend_Protocol {
		// 	 升级返回 PBG2CDefendLevelUpAsk;
		S2C_Defend_LevelUp_Ask = 1,
		// 	 升阶返回 PBG2CDefendLevelUpAsk;
		S2C_Defend_RankUp_Ask = 2,
		// 	 保存方案返回 PBDefendPlan;
		S2C_Defend_SavePlan_Ask = 3,
		// 	 使用方案返回 PBG2CDefendUsePlanAsk;
		S2C_Defend_UsePlan_Ask = 4,
		// 	 解锁方案返回 PBG2CDefendUnlockPlanAsk;
		S2C_Defend_UnlockPlan_Ask = 5,
		// 	 属性下发 PBG2CDefendAttr;
		S2C_Defend_Attr = 6,
		// 	 功能开启下发 PBPlayerDefend;
		S2C_Defend_Open = 7,
		// 	 属性预览 PBG2CDefendAttr;
		S2C_Defend_PreviewAttr = 8,
		// 	 移除某个宠物方案返回 PBG2CDefendPlansChg;
		S2C_Defend_PlansChg = 9,
	}
	/**
	*使用方案
	*/
	class PBC2GDefendUsePlan {
		constructor();
		/**方案索引*/
		public index:number;
		public static encode(message: Pb_God.PBC2GDefendUsePlan, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GDefendUsePlan, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GDefendUsePlan;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GDefendUsePlan;
	}
	/**
	*解锁方案
	*/
	class PBC2GDefendUnlockPlan {
		constructor();
		/**方案索引*/
		public index:number;
		public static encode(message: Pb_God.PBC2GDefendUnlockPlan, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GDefendUnlockPlan, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GDefendUnlockPlan;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GDefendUnlockPlan;
	}
	/**
	*解锁方案
	*/
	class PBC2GDefendPreviewAttr {
		constructor();
		/**是否为等级*/
		public blevel:boolean;
		public static encode(message: Pb_God.PBC2GDefendPreviewAttr, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GDefendPreviewAttr, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GDefendPreviewAttr;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GDefendPreviewAttr;
	}
	/**
	*移除某个宠物
	*/
	class PBC2GDefendRemovePet {
		constructor();
		/**宠物id*/
		public snid:Long;
		public static encode(message: Pb_God.PBC2GDefendRemovePet, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GDefendRemovePet, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GDefendRemovePet;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GDefendRemovePet;
	}
	/**
	*升级返回
	*/
	class PBG2CDefendLevelUpAsk {
		constructor();
		/**等级*/
		public level:number;
		public static encode(message: Pb_God.PBG2CDefendLevelUpAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDefendLevelUpAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDefendLevelUpAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDefendLevelUpAsk;
	}
	/**
	*升阶返回
	*/
	class PBG2CDefendRankUpAsk {
		constructor();
		/**阶级*/
		public rank:number;
		public static encode(message: Pb_God.PBG2CDefendRankUpAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDefendRankUpAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDefendRankUpAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDefendRankUpAsk;
	}
	/**
	*使用方案返回
	*/
	class PBG2CDefendUsePlanAsk {
		constructor();
		/**方案索引*/
		public index:number;
		public static encode(message: Pb_God.PBG2CDefendUsePlanAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDefendUsePlanAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDefendUsePlanAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDefendUsePlanAsk;
	}
	/**
	*使解锁方案返回
	*/
	class PBG2CDefendUnlockPlanAsk {
		constructor();
		/**方案索引*/
		public index:number;
		public static encode(message: Pb_God.PBG2CDefendUnlockPlanAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDefendUnlockPlanAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDefendUnlockPlanAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDefendUnlockPlanAsk;
	}
	/**
	* 属性下发
	*/
	class PBG2CDefendAttr {
		constructor();
		/**战斗力*/
		public power:number;
		/**所有属性*/
		public attr:Pb_God.PBAttrInfo[];
		public static encode(message: Pb_God.PBG2CDefendAttr, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDefendAttr, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDefendAttr;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDefendAttr;
	}
	/**
	*移除某个宠物方案返回
	*/
	class PBG2CDefendPlansChg {
		constructor();
		/**方案改变*/
		public plans:Pb_God.PBDefendPlan[];
		public static encode(message: Pb_God.PBG2CDefendPlansChg, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDefendPlansChg, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDefendPlansChg;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDefendPlansChg;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 元素系统返回
	*/
	enum _emResultElement_23 {
		// 成功;
		R_ResultElement_Succeed = 0,
		// 失败;
		R_ResultElement_Fail = 1,
		// 钻石不足	;
		R_ResultElement_NeedDiamond = 2,
		// 请先通关此关卡;
		R_ResultElement_NeedStage = 3,
		// 次数不足;
		R_ResultElement_NeedCount = 4,
		// 最大购买次数;
		R_ResultElement_MaxBuyCount = 5,
		// 活动未开启;
		R_ResultElement_NeedOpenTime = 6,
		// 玩家等级不足;
		R_ResultElement_NeedPlayerLevel = 7,
		// 玩家战力不足;
		R_ResultElement_NeedFightPower = 8,
		// 已经通关此关卡;
		R_ResultElement_HaveFightStage = 9,
		// 伙伴类型不满足;
		R_ResultElement_NeedPetType = 10,
	}
	/**
	*----元素模块
	*/
	enum _emC2S_Element_Protocol {
		//扫荡			PBU32;
		C2S_Element_Sweep = 1,
		//购买次数;
		C2S_Element_BuyCount = 2,
	}
	/**
	*----元素模块
	*/
	enum _emS2C_Element_Protocol {
		//通用返回(失败才返回);
		S2C_Element_CommonAck = 1,
		//更新次数				PBG2CElementUpdateCount;
		S2C_Element_UpdateCount = 2,
		//更新关卡				PBPlayerElementInfo;
		S2C_Element_UpdateStage = 3,
	}
	/**
	* 更新次数
	*/
	class PBG2CElementUpdateCount {
		constructor();
		/** 今日挑战次数*/
		public dayfightcount:number;
		/** 今日购买次数*/
		public daybuycount:number;
		public static encode(message: Pb_God.PBG2CElementUpdateCount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CElementUpdateCount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CElementUpdateCount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CElementUpdateCount;
	}
}
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

declare namespace Pb_God {
	/**
	* 扩展数据标识位bit
	*/
	enum _emPBPlayerBaseFlagBit {
		//	 初始战力 ;
		PBPLAYERBASEFLAG_BIT_INIT_POWER = 1,
	}
	/**
	* 扩展数据标识位
	*/
	enum _emPlayerSystemExtFlag {
		//	试炼数据;
		PlayerSystemExtFlag_Train = 1,
		//	跨服数据;
		PlayerSystemExtFlag_CrossChallenge = 2,
	}
	/**
	* 用户标记
	*/
	class PBPlayerDisplay {
		constructor();
		/** 角色名称*/
		public playername:string;
		/** 角色ID*/
		public playerid:number;
		/** 世界ID*/
		public worldid:number;
		/** 逻辑世界ID*/
		public logicworldid:number;
		/** 玩家等级*/
		public level:number;
		/** vip等级*/
		public viplevel:number;
		/** 性别*/
		public gender:number;
		/** 头像ID*/
		public head:number;
		/** 头像框ID*/
		public headicon:number;
		/** 形象*/
		public shape:number;
		/** 省份*/
		public province:number;
		/** 城市*/
		public city:number;
		/** 该账号第几个角色*/
		public createnum:number;
		/** 称号*/
		public title:number;
		public static encode(message: Pb_God.PBPlayerDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerDisplay;
	}
	/**
	* 角色社会属性
	*/
	class PBPlayerBase {
		constructor();
		/** 序列号*/
		public saveorder:number;
		/** 角色标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/** 账号ID*/
		public accountid:number;
		/** 帮派名称*/
		public factionname:string;
		/** 帮派ID*/
		public factionid:number;
		/** 角色标示*/
		public playermark:number;
		/** 最后一次登录时间*/
		public lastlogintime:number;
		/** 最后一次登出时间*/
		public lastlogouttime:number;
		/** 创建角色时间*/
		public createtime:number;
		/** 账号名称*/
		public accountname:string;
		/** 消耗*/
		public expend:Pb_God.PBPlayerExpend[];
		/** 在线时长*/
		public onlinetime:number;
		/** 道具自增长索引*/
		public itemsequence:number;
		/** 战斗力*/
		public fightpower:number;
		/** 日清理时间*/
		public dailycleantime:number;
		/** 周清理时间*/
		public weekcleantime:number;
		/** 月清理时间*/
		public monthcleantime:number;
		/** 战斗自增长索引*/
		public battlesequence:number;
		/** 前日最大战斗力*/
		public lastdaymaxfightpower:number;
		/** 最大战斗力*/
		public maxfightpower:number;
		/** 今日日最大战斗力*/
		public todaymaxfightpower:number;
		/** 今日充值金额*/
		public todayrecharge:number;
		/** 充值自增长索引*/
		public chargesequence:number;
		/** 今日充值金额*/
		public totalrecharge:number;
		/** 改名次数*/
		public renamecount:number;
		/** 充值次数*/
		public rechargecount:number;
		/** 上次一次登陆的时间*/
		public oldlogintime:number;
		/** 真实充值总额*/
		public realrecharge:number;
		/** 标识符 _emPBPlayerBaseFlagBit*/
		public flag:number;
		/** 合服前的原世界ID*/
		public originworldid:number;
		public static encode(message: Pb_God.PBPlayerBase, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerBase, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerBase;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerBase;
	}
	/**
	* 角色查看
	*/
	class PBPlayerView {
		constructor();
		/** 用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/** 通用*/
		public commondisplay:Pb_God.PBGlobalCommonDisplay;
		/** 帮派名称*/
		public factionname:string;
		/** 伙伴显示*/
		public petdisplay:Pb_God.PBPetDisplay[];
		public static encode(message: Pb_God.PBPlayerView, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerView, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerView;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerView;
	}
	/**
	* 伙伴查看
	*/
	class PBPlayerPetView {
		constructor();
		/** 伙伴数据*/
		public petinfo:Pb_God.PBPlayerPetInfo;
		/** 帮派技能等级*/
		public factionskilllevel:number;
		/** 圣物数据*/
		public holyinfo:Pb_God.PBPlayerHolyInfo;
		public static encode(message: Pb_God.PBPlayerPetView, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPetView, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPetView;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPetView;
	}
	/**
	* 伙伴战斗伙伴的buff状态
	*/
	class PBPetFightBuffInfo {
		constructor();
		/**buff id*/
		public buffid:number;
		/**施法者 sn*/
		public sourcesn:Long;
		/**skill index*/
		public skillindex:number;
		/**持续回合数*/
		public continueround:number;
		/**层数回合数*/
		public layerround:number[];
		/**被攻击次数*/
		public beattackcount:number;
		/**额外参数  当前护盾值*/
		public extravalue:number;
		public static encode(message: Pb_God.PBPetFightBuffInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPetFightBuffInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPetFightBuffInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPetFightBuffInfo;
	}
	/**
	* 伙伴战斗状态
	*/
	class PBPetFightStateInfo {
		constructor();
		/**伙伴SN*/
		public petsn:Long;
		/**技能CD*/
		public skillcd:Pb_God.PBSkillCD[];
		/**最大血量*/
		public maxhp:Long;
		/**当前血量*/
		public curhp:Long;
		/**伤害值*/
		public damage:Long;
		/**治疗值*/
		public cure:Long;
		/**buff*/
		public buff:Pb_God.PBPetFightBuffInfo[];
		/**防御值*/
		public defense:Long;
		public static encode(message: Pb_God.PBPetFightStateInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPetFightStateInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPetFightStateInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPetFightStateInfo;
	}
	/**
	* 伙伴战斗状态
	*/
	class PBPetFightState {
		constructor();
		/**伙伴战斗状态*/
		public petstate:Pb_God.PBPetFightStateInfo[];
		public static encode(message: Pb_God.PBPetFightState, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPetFightState, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPetFightState;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPetFightState;
	}
	/**
	*战斗伙伴信息
	*/
	class PBBattlePetInfo {
		constructor();
		/**对象类型 _em_GameUnitType */
		public unittype:number;
		/**对象ID*/
		public unitid:number;
		/**位置*/
		public pos:number;
		/**伙伴信息*/
		public pet:Pb_God.PBPlayerPetInfo;
		/**战斗属性*/
		public attr:Pb_God.PBAttrInfo[];
		/**所有技能*/
		public allskill:Pb_God.PBSkillInfo[];
		/**阵营*/
		public camptype:number;
		/**伙伴战斗状态*/
		public petstate:Pb_God.PBPetFightStateInfo;
		public static encode(message: Pb_God.PBBattlePetInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBattlePetInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBattlePetInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBattlePetInfo;
	}
	/**
	*战斗显示信息
	*/
	class PBBattleDisplay {
		constructor();
		/**玩家外显*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**战斗伙伴外显*/
		public petdisplay:Pb_God.PBPetDisplay[];
		/**位置伙伴 key:位置 value:伙伴sn*/
		public posdata:Pb_God.PBPlayerZhenfaPos[];
		/**阵法ID*/
		public zhenfaid:number;
		/**战力*/
		public fightpower:number;
		/**参数 排名*/
		public param:number;
		public static encode(message: Pb_God.PBBattleDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBattleDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBattleDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBattleDisplay;
	}
	/**
	* 公会技能
	*/
	class PBBattleFactionPVPSkill {
		constructor();
		/**战斗用*/
		public skillinfo:Pb_God.PBPlayerFactionPVPSkill[];
		public static encode(message: Pb_God.PBBattleFactionPVPSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBattleFactionPVPSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBattleFactionPVPSkill;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBattleFactionPVPSkill;
	}
	/**
	*战斗阵容
	*/
	class PBBattlePet {
		constructor();
		/**战斗伙伴信息*/
		public battlepet:Pb_God.PBBattlePetInfo[];
		/**阵法id*/
		public zhenfaid:number;
		/**神器信息*/
		public artifact:Pb_God.PBGlobalArtifactDisplay;
		/**战力*/
		public fightpower:number;
		/**额外技能*/
		public extraskill:number[];
		/**神器状态*/
		public artifactstate:Pb_God.PBPetFightStateInfo;
		/**守护信息*/
		public defend:Pb_God.PBGlobalDefendDisplay;
		/**公会pvp技能信息*/
		public pvpskill:Pb_God.PBBattleFactionPVPSkill;
		public static encode(message: Pb_God.PBBattlePet, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBattlePet, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBattlePet;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBattlePet;
	}
	/**
	*角色显示详情 存库用
	*/
	class PBPlayerViewDetail {
		constructor();
		/** 用户标记*/
		public view:Pb_God.PBPlayerView;
		/** 伙伴标记*/
		public battlepet:Pb_God.PBBattlePet;
		public static encode(message: Pb_God.PBPlayerViewDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerViewDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerViewDetail;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerViewDetail;
	}
	/**
	*伙伴装备信息
	*/
	class PBPlayerPetEquip {
		constructor();
		/**装备类型*/
		public equiptype:number;
		/**道具ID*/
		public itemid:number;
		public static encode(message: Pb_God.PBPlayerPetEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPetEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPetEquip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPetEquip;
	}
	/**
	*伙伴符文信息
	*/
	class PBPlayerPetRune {
		constructor();
		/**符文位置*/
		public pos:number;
		/**道具sn*/
		public itemsn:Long;
		/**道具信息*/
		public iteminfo:Pb_God.PBItem;
		public static encode(message: Pb_God.PBPlayerPetRune, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPetRune, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPetRune;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPetRune;
	}
	/**
	*伙伴天赋信息
	*/
	class PBPlayerPetTalent {
		constructor();
		/**天赋位置*/
		public pos:number;
		/**技能信息*/
		public skillindex:number;
		public static encode(message: Pb_God.PBPlayerPetTalent, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPetTalent, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPetTalent;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPetTalent;
	}
	/**
	*伙伴神装
	*/
	class PBPlayerPetGodEquip {
		constructor();
		/**装备类型*/
		public equiptype:number;
		/**道具sn*/
		public itemsn:Long;
		/**道具信息*/
		public iteminfo:Pb_God.PBItem;
		public static encode(message: Pb_God.PBPlayerPetGodEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPetGodEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPetGodEquip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPetGodEquip;
	}
	/**
	* 伙伴标记
	*/
	class PBPetDisplay {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**伙伴ID*/
		public id:number;
		/**伙伴星星数*/
		public star:number;
		/**伙伴等级*/
		public level:number;
		/**用的皮肤ID*/
		public useskinid:number;
		/**进化段数*/
		public evolve:number;
		public static encode(message: Pb_God.PBPetDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPetDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPetDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPetDisplay;
	}
	/**
	*伙伴魂器
	*/
	class PBPetHorcrux {
		constructor();
		/**魂器ID 0表示为觉醒*/
		public id:number;
		/**魂器等级*/
		public level:number;
		/**魂器提升战力*/
		public fightpower:number;
		public static encode(message: Pb_God.PBPetHorcrux, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPetHorcrux, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPetHorcrux;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPetHorcrux;
	}
	/**
	*伙伴基础信息
	*/
	class PBPlayerPetInfo {
		constructor();
		/**显示*/
		public display:Pb_God.PBPetDisplay;
		/**伙伴进阶等级*/
		public advance:number;
		/**伙伴是否加锁*/
		public islock:boolean;
		/**圣物等级*/
		public holylevel:number;
		/**圣物经验*/
		public holyexp:number;
		/**圣物进阶*/
		public holyadvance:number;
		/**伙伴装备*/
		public equip:Pb_God.PBPlayerPetEquip[];
		/**伙伴符文*/
		public rune:Pb_God.PBPlayerPetRune[];
		/**伙伴天赋*/
		public talent:Pb_God.PBPlayerPetTalent[];
		/**伙伴神装*/
		public godequip:Pb_God.PBPlayerPetGodEquip[];
		/**战斗力*/
		public fightpower:number;
		/**技能数据*/
		public baseskill:Pb_God.PBU32U32[];
		/**显示属性*/
		public attr:Pb_God.PBAttrInfo[];
		/**是否是临时英雄*/
		public istemporary:boolean;
		/**工会技能等级*/
		public factionskilllv:number;
		/**极化值*/
		public exp:number;
		/**标识值，目前用于做版本控制*/
		public flag:number;
		/**魂器*/
		public horcrux:Pb_God.PBPetHorcrux;
		/**额外技能, 只做属性加成*/
		public extraskill:Pb_God.PBU32U32[];
		/**状态*/
		public state:number;
		/**玩家皮肤选择标识（当前皮肤展示停留在哪个进化阶段）*/
		public skinselectflag:number;
		public static encode(message: Pb_God.PBPlayerPetInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPetInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPetInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPetInfo;
	}
	/**
	* 用户伙伴数据
	*/
	class PBPlayerPet {
		constructor();
		/**序列号*/
		public saveorder:number;
		/**伙伴信息*/
		public pet:Pb_God.PBPlayerPetInfo[];
		/**伙伴自增长索引*/
		public sequence:number;
		/**购买的伙伴空间*/
		public buyspace:number;
		/**见过的英雄*/
		public seenpets:number[];
		/**重生次数*/
		public reborncount:number;
		/**购买重生次数*/
		public rebornbuycount:number;
		/**已领取的档案奖励的id*/
		public rewardpets:number[];
		public static encode(message: Pb_God.PBPlayerPet, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPet, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPet;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPet;
	}
	/**
	*伙伴数据扩展
	*/
	class PBPlayerPetExt {
		constructor();
		/**序列号*/
		public saveorder:number;
		/**伙伴信息*/
		public pet:Pb_God.PBPlayerPetInfo[];
		public static encode(message: Pb_God.PBPlayerPetExt, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPetExt, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPetExt;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPetExt;
	}
	/**
	*神装套装管理
	*/
	class PBPlayerGodEquipSuitInfo {
		constructor();
		/**方案ID*/
		public id:number;
		/**方案名称*/
		public name:string;
		/**伙伴SN*/
		public petsn:Long;
		/**神装*/
		public posequip:Pb_God.PBPosEquip[];
		public static encode(message: Pb_God.PBPlayerGodEquipSuitInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerGodEquipSuitInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerGodEquipSuitInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerGodEquipSuitInfo;
	}
	/**
	* 神装套装
	*/
	class PBPlayerGodEquipSuit {
		constructor();
		/**神装套装*/
		public suitinfo:Pb_God.PBPlayerGodEquipSuitInfo[];
		public static encode(message: Pb_God.PBPlayerGodEquipSuit, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerGodEquipSuit, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerGodEquipSuit;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerGodEquipSuit;
	}
	/**
	**************************************************阵法数据开始***************************
	*/
	class PBPlayerZhenfaPos {
		constructor();
		/**位置*/
		public pos:number;
		/**伙伴SN*/
		public petsn:Long;
		/**是支援英雄填好友ID，否则填0*/
		public friendid:number;
		public static encode(message: Pb_God.PBPlayerZhenfaPos, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerZhenfaPos, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerZhenfaPos;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerZhenfaPos;
	}
	/**
	* 用户阵法信息
	*/
	class PBPlayerZhenfaInfo {
		constructor();
		/**阵法类型_emZhenfaType*/
		public type:number;
		/**阵法IDcs_pet表中阵法*/
		public id:number;
		/**位置伙伴 key:位置 value:伙伴sn*/
		public posdata:Pb_God.PBPlayerZhenfaPos[];
		/**神器ID*/
		public artifactid:number;
		public static encode(message: Pb_God.PBPlayerZhenfaInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerZhenfaInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerZhenfaInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerZhenfaInfo;
	}
	/**
	* 阵法数据
	*/
	class PBPlayerZhenfa {
		constructor();
		/**阵法数据*/
		public zhenfainfo:Pb_God.PBPlayerZhenfaInfo[];
		public static encode(message: Pb_God.PBPlayerZhenfa, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerZhenfa, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerZhenfa;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerZhenfa;
	}
	/**
	* 用户副本信息
	*/
	class PBPlayerCopymapInfo {
		constructor();
		/**副本类型*/
		public copymaptype:number;
		/**日进入次数*/
		public dailyentercount:number;
		/**挑战的最大子类型*/
		public maxsubtype:number;
		/**购买的次数*/
		public daybuycount:number;
		public static encode(message: Pb_God.PBPlayerCopymapInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerCopymapInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerCopymapInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerCopymapInfo;
	}
	/**
	* 用户副本数据
	*/
	class PBPlayerCopymap {
		constructor();
		/**副本*/
		public copymapinfo:Pb_God.PBPlayerCopymapInfo[];
		public static encode(message: Pb_God.PBPlayerCopymap, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerCopymap, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerCopymap;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerCopymap;
	}
	/**
	* 用户战斗数据
	*/
	class PBPlayerFight {
		constructor();
		/**战斗类型*/
		public battletype:number;
		public static encode(message: Pb_God.PBPlayerFight, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerFight, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerFight;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerFight;
	}
	/**
	* 用户任务
	*/
	class PBPlayerTask {
		constructor();
		/**当前任务ID*/
		public taskid:number;
		/**当前任务进度*/
		public param:number;
		public static encode(message: Pb_God.PBPlayerTask, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTask, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTask;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTask;
	}
	/**
	* 用户竞技场信息
	*/
	class PBPlayerChallenge {
		constructor();
		/**进入次数*/
		public dayentercount:number;
		/**周进入次数*/
		public weekentercount:number;
		/**周宝箱领取*/
		public weekprize:number[];
		/**点赞次数*/
		public linenum:number;
		/**连胜场数*/
		public continuewincount:number;
		/**上次清理时间*/
		public lastcleardays:number;
		/**点赞的人player id*/
		public likeplayers:number[];
		public static encode(message: Pb_God.PBPlayerChallenge, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerChallenge, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerChallenge;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerChallenge;
	}
	/**
	* 公会技能
	*/
	class PBPlayerFactionSkill {
		constructor();
		/** 职业类型 _emPetJobType*/
		public jobtype:number;
		/** 总等级*/
		public level:number;
		public static encode(message: Pb_God.PBPlayerFactionSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerFactionSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerFactionSkill;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerFactionSkill;
	}
	/**
	* 公会技能
	*/
	class PBPlayerFactionPVPSkill {
		constructor();
		/** PVP技能索引*/
		public skillindex:number;
		/** PVP技能等级*/
		public level:number;
		public static encode(message: Pb_God.PBPlayerFactionPVPSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerFactionPVPSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerFactionPVPSkill;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerFactionPVPSkill;
	}
	/**
	* 帮派数据
	*/
	class PBPlayerFaction {
		constructor();
		/** 捐献类型_emFactionDonateType*/
		public donatetype:number;
		/** 捐献活跃奖励*/
		public donateprize:number[];
		/** 活跃等级*/
		public livenesslevel:number;
		/** 活跃经验*/
		public livenessexp:number;
		/** 日活跃度*/
		public dailyliveness:number;
		/** 周活跃度*/
		public weekliveness:number;
		/** 公会技能*/
		public skill:Pb_God.PBPlayerFactionSkill[];
		/** 技能重置次数*/
		public skillresetcount:number;
		/** 副本购买次数*/
		public copymapbuycount:number;
		/** 副本使用免费次数*/
		public copymapusefreecount:number;
		/** 副本使用购买次数*/
		public copymapusebuycount:number;
		/** 公会战挑战次数*/
		public factionwarcount:number;
		/** 下次重命名时间*/
		public nextrenametime:number;
		/** 下次加入公会时间*/
		public nextjointime:number;
		/** 正在打的副本ID*/
		public copymapid:number;
		/** 公会pvp技能*/
		public pvpskill:Pb_God.PBPlayerFactionPVPSkill[];
		/** pvp技能重置次数*/
		public pvpskillresetcount:number;
		public static encode(message: Pb_God.PBPlayerFaction, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerFaction, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerFaction;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerFaction;
	}
	/**
	* 召唤数据
	*/
	class PBPlayerCallInfo {
		constructor();
		/** 召唤类型*/
		public calltype:number;
		/** 表示可以召唤时间*/
		public netxfreetime:number;
		/** 总召唤次数*/
		public totalcount:number;
		/** 连续不出五星次数*/
		public continuecount:number;
		/** 首次出五星的次数*/
		public firstcontinuecount:number;
		public static encode(message: Pb_God.PBPlayerCallInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerCallInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerCallInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerCallInfo;
	}
	/**
	* 置换数据
	*/
	class PBPlayerCallChange {
		constructor();
		/**置换的基本英雄*/
		public basechangesn:Long;
		/**伙伴ID*/
		public petid:number;
		/**伙伴星级*/
		public star:number;
		public static encode(message: Pb_God.PBPlayerCallChange, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerCallChange, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerCallChange;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerCallChange;
	}
	/**
	* 召唤数据
	*/
	class PBPlayerCall {
		constructor();
		/** 召唤数据*/
		public callinfo:Pb_God.PBPlayerCallInfo[];
		/** 置换数据*/
		public changeinfo:Pb_God.PBPlayerCallChange;
		/** 自动分解*/
		public autosplit:boolean;
		public static encode(message: Pb_God.PBPlayerCall, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerCall, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerCall;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerCall;
	}
	/**
	* 远航接取数据
	*/
	class PBPlayerSailInfo {
		constructor();
		/** sn*/
		public sn:number;
		/** 索引 配置表中*/
		public index:number;
		/** 结束时间*/
		public endtime:number;
		/** 派遣伙伴sn*/
		public petsn:Long[];
		public static encode(message: Pb_God.PBPlayerSailInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerSailInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerSailInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerSailInfo;
	}
	/**
	* 远航索引
	*/
	class PBPlayerSailIndex {
		constructor();
		/** sn*/
		public sn:number;
		/** 索引 配置表中*/
		public index:number;
		public static encode(message: Pb_God.PBPlayerSailIndex, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerSailIndex, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerSailIndex;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerSailIndex;
	}
	/**
	* 远航数据
	*/
	class PBPlayerSail {
		constructor();
		/** 免费刷新次数*/
		public dayfreecount:number;
		/** 每日购买次数*/
		public daybuycount:number;
		/** 总刷新次数*/
		public totalrefreshcount:number;
		/** 当前序列号*/
		public cursequne:number;
		/** 刷新的数据*/
		public refresh:Pb_God.PBPlayerSailIndex[];
		/** 接取的数据*/
		public accpet:Pb_God.PBPlayerSailInfo[];
		public static encode(message: Pb_God.PBPlayerSail, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerSail, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerSail;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerSail;
	}
	/**
	* 用户挂机数据
	*/
	class PBPlayerHook {
		constructor();
		/**当前关卡ID*/
		public stageid:number;
		/**当前场景ID*/
		public sceneid:number;
		/**开始时间*/
		public begintime:number;
		/**已经领取的关卡奖励*/
		public stageprize:number[];
		/**领奖的基础关卡*/
		public prizestageid:number;
		/**快速作战免费次数*/
		public dayfreesweepcount:number;
		/**快速作战购买次数*/
		public daubuysweepcount:number;
		/**下次战斗时间*/
		public nextfighttime:number;
		/**活动掉落统计的分钟*/
		public activedropmin:number;
		/**活动掉落个数*/
		public activedropcount:number;
		public static encode(message: Pb_God.PBPlayerHook, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerHook, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerHook;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerHook;
	}
	/**
	* 神器具体数据
	*/
	class PBPlayerArtifactInfo {
		constructor();
		/** 神器ID*/
		public id:number;
		/** 是否已经激活*/
		public isactive:boolean;
		/** 已经激活的进度*/
		public activestage:number[];
		/** 技能等级*/
		public skilllevel:number;
		/** 幻化ID*/
		public shapeid:number;
		/** 已经消耗的道具,重置返回*/
		public expenditem:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBPlayerArtifactInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerArtifactInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerArtifactInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerArtifactInfo;
	}
	/**
	* 法阵数据
	*/
	class PBPlayerFaZhenInfo {
		constructor();
		/** 神器等级*/
		public level:number;
		/** 当前经验*/
		public exp:number;
		/** 使用刻印石强化次数*/
		public count:number;
		public static encode(message: Pb_God.PBPlayerFaZhenInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerFaZhenInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerFaZhenInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerFaZhenInfo;
	}
	/**
	* 神器数据
	*/
	class PBPlayerArtifact {
		constructor();
		/** 神器具体数据*/
		public info:Pb_God.PBPlayerArtifactInfo[];
		/** 法阵数据*/
		public fazhen:Pb_God.PBPlayerFaZhenInfo;
		/** 以完成的觉醒的任务*/
		public awake:number[];
		/** 已经领取de数量奖励*/
		public awakeprize:number[];
		/** 解锁第一个元灵的时间*/
		public starttime:number;
		/** 法阵是否觉醒*/
		public fazhenawake:boolean;
		public static encode(message: Pb_God.PBPlayerArtifact, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerArtifact, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerArtifact;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerArtifact;
	}
	/**
	* 固定商店数据
	*/
	class PBPlayerFixShop {
		constructor();
		/** 商店类型*/
		public shoptype:number;
		/** 购买次数 KEY:索引 value:次数*/
		public buycount:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBPlayerFixShop, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerFixShop, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerFixShop;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerFixShop;
	}
	/**
	* 随机商店数据
	*/
	class PBPlayerRandShop {
		constructor();
		/** 商店类型*/
		public shoptype:number;
		/** 免费刷新剩余次数*/
		public freeleftcount:number;
		/** 下次免费刷新时间*/
		public nextfreetime:number;
		/** 每日购买刷新次数*/
		public daybuyrefreshcount:number;
		/** 刷新的索引*/
		public refreshindex:number[];
		/** 购买次数 KEY:位置(0开始) value:购买次数*/
		public buycount:Pb_God.PBU32U32[];
		/** 日限购 KEY:商品id value:购买次数*/
		public daybuycount:Pb_God.PBU32U32[];
		/** 周限购 KEY:商品id value:购买次数*/
		public weekbuycount:Pb_God.PBU32U32[];
		/** 月限购 KEY:商品id value:购买次数*/
		public monthbuycount:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBPlayerRandShop, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerRandShop, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerRandShop;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerRandShop;
	}
	/**
	* 商店数据
	*/
	class PBPlayerShop {
		constructor();
		/** 固定商店*/
		public fixshop:Pb_God.PBPlayerFixShop[];
		/** 随机商店*/
		public randshop:Pb_God.PBPlayerRandShop[];
		public static encode(message: Pb_God.PBPlayerShop, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerShop, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerShop;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerShop;
	}
	/**
	* 试练塔录像数据
	*/
	class PBPlayerTrainTowerVideo {
		constructor();
		/** 当前关卡*/
		public stageid:number;
		/** 录像SN*/
		public battlesn:Long;
		/** 通关时间*/
		public fighttime:number;
		public static encode(message: Pb_God.PBPlayerTrainTowerVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTrainTowerVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTrainTowerVideo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTrainTowerVideo;
	}
	/**
	* 试练塔数据
	*/
	class PBPlayerTrainTower {
		constructor();
		/** 当前关卡*/
		public stageid:number;
		/** 今日购买次数*/
		public daybuycount:number;
		/** 今日挑战次数*/
		public dayfightcount:number;
		/** 累计挑战次数*/
		public totalfightcount:number;
		/** 领取的奖励*/
		public prizestage:number[];
		/** 通关录像*/
		public video:Pb_God.PBPlayerTrainTowerVideo[];
		/** 类型*/
		public type:number;
		public static encode(message: Pb_God.PBPlayerTrainTower, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTrainTower, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTrainTower;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTrainTower;
	}
	/**
	* 无尽试练数据
	*/
	class PBPlayerTrainEndless {
		constructor();
		/** 当前挑战的最大关卡*/
		public maxstageid:number;
		/** 当前领取的最大关卡*/
		public prizestage:number;
		/** 随机的buff组*/
		public buffgroup:number;
		/** 加成的buffid*/
		public buffid:number;
		/** 今日开始的关卡*/
		public daybeginstage:number;
		/** 今日最高的关卡*/
		public daymaxstage:number;
		/** 当前挑战的关卡次数*/
		public curfightstage:number;
		/** 每日领奖的起始关卡*/
		public daybeginprizestage:number;
		/** 选择buff的关卡*/
		public buffstage:number;
		/** 今日已通多少关*/
		public dayclearnum:number;
		public static encode(message: Pb_God.PBPlayerTrainEndless, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTrainEndless, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTrainEndless;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTrainEndless;
	}
	/**
	* 巅峰挑战数据
	*/
	class PBPlayerTrainPeak {
		constructor();
		/** 总伤害量*/
		public totaldamage:Long;
		/** 挑战次数*/
		public fightcount:number;
		/** 购买次数*/
		public buycount:number;
		/** 购买的buff技能index*/
		public buff:number[];
		public static encode(message: Pb_God.PBPlayerTrainPeak, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTrainPeak, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTrainPeak;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTrainPeak;
	}
	/**
	* 试炼数据
	*/
	class PBPlayerTrain {
		constructor();
		/** 试练塔*/
		public tower:Pb_God.PBPlayerTrainTower;
		/** 无尽试练*/
		public endless:Pb_God.PBPlayerTrainEndless;
		/** 巅峰挑战*/
		public peak:Pb_God.PBPlayerTrainPeak;
		/** 试炼塔*/
		public towers:Pb_God.PBPlayerTrainTower[];
		/**是否已发送补发首通积分奖励邮件*/
		public IsSendMail:boolean;
		public static encode(message: Pb_God.PBPlayerTrain, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTrain, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTrain;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTrain;
	}
	/**
	* 一条成就数据
	*/
	class PBPlayerOneAchieve {
		constructor();
		/** 成就ID*/
		public id:number;
		/** 当前值*/
		public value:number;
		/** 完成时间*/
		public time:number;
		/** 额外记录值*/
		public extravalue:number[];
		public static encode(message: Pb_God.PBPlayerOneAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerOneAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerOneAchieve;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerOneAchieve;
	}
	/**
	* 主线成就
	*/
	class PBPlayerMainAchieve {
		constructor();
		/** 成就数据*/
		public achieve:Pb_God.PBPlayerOneAchieve[];
		/** 领取的成就*/
		public completeid:number[];
		public static encode(message: Pb_God.PBPlayerMainAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerMainAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerMainAchieve;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerMainAchieve;
	}
	/**
	* 历练成就
	*/
	class PBPlayerTrainAchieve {
		constructor();
		/** 成就数据*/
		public achieve:Pb_God.PBPlayerOneAchieve[];
		/** 领取的成就*/
		public completeid:number[];
		public static encode(message: Pb_God.PBPlayerTrainAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTrainAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTrainAchieve;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTrainAchieve;
	}
	/**
	* 每日活跃
	*/
	class PBPlayerLiveness {
		constructor();
		/** 成就数据*/
		public achieve:Pb_God.PBPlayerOneAchieve[];
		/** 活跃度*/
		public livessvalue:number;
		/** 领取的奖励*/
		public accpetprize:number[];
		/** 领取的成就*/
		public completeid:number[];
		public static encode(message: Pb_God.PBPlayerLiveness, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerLiveness, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerLiveness;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerLiveness;
	}
	/**
	* 帮派活跃
	*/
	class PBFactionLiveness {
		constructor();
		/** 成就数据*/
		public achieve:Pb_God.PBPlayerOneAchieve[];
		public static encode(message: Pb_God.PBFactionLiveness, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionLiveness, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionLiveness;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionLiveness;
	}
	/**
	* 战令成就
	*/
	class PBWarOrderAchieve {
		constructor();
		/** 类型 _emWarOrderType*/
		public type:number;
		/** 成就数据*/
		public achieve:Pb_God.PBPlayerOneAchieve[];
		/** 完成的成就*/
		public completeid:number[];
		public static encode(message: Pb_God.PBWarOrderAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWarOrderAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWarOrderAchieve;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWarOrderAchieve;
	}
	/**
	*战令
	*/
	class PBWarOrder {
		constructor();
		/** 成就数据*/
		public achieves:Pb_God.PBWarOrderAchieve[];
		/** 领取的等级奖励(等级，普通 1 进阶 2 both 3)*/
		public prize:Pb_God.PBU32U32[];
		/** 当前经验值*/
		public exp:number;
		/** 当前等级*/
		public level:number;
		/** 是否开启*/
		public open:boolean;
		public static encode(message: Pb_God.PBWarOrder, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWarOrder, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWarOrder;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWarOrder;
	}
	/**
	* 图鉴成就
	*/
	class PBIllustrationAchieve {
		constructor();
		/** 成就数据*/
		public achieve:Pb_God.PBPlayerOneAchieve[];
		/** 领取的成就*/
		public completeid:number[];
		public static encode(message: Pb_God.PBIllustrationAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBIllustrationAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBIllustrationAchieve;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBIllustrationAchieve;
	}
	/**
	* 图鉴战力成就
	*/
	class PBIllustrationPower {
		constructor();
		/** 成就数据*/
		public achieve:Pb_God.PBPlayerOneAchieve[];
		/** 领取的成就*/
		public completeid:number[];
		public static encode(message: Pb_God.PBIllustrationPower, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBIllustrationPower, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBIllustrationPower;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBIllustrationPower;
	}
	/**
	* 成就之路
	*/
	class PBPlayerAchieveRoad {
		constructor();
		/** 成就数据*/
		public achieve:Pb_God.PBPlayerOneAchieve[];
		/** 领取的成就*/
		public completeid:number[];
		public static encode(message: Pb_God.PBPlayerAchieveRoad, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerAchieveRoad, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerAchieveRoad;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerAchieveRoad;
	}
	/**
	* 成就数据
	*/
	class PBPlayerAchieve {
		constructor();
		/** 每日活跃*/
		public liveness:Pb_God.PBPlayerLiveness;
		/** 主线成就*/
		public mainachieve:Pb_God.PBPlayerMainAchieve;
		/** 帮派活跃*/
		public faction:Pb_God.PBFactionLiveness;
		/** 历练成就*/
		public train:Pb_God.PBPlayerTrainAchieve;
		/** 活动活跃*/
		public activity:Pb_God.PBPlayerLiveness;
		/** 每周活跃*/
		public weekliveness:Pb_God.PBPlayerLiveness;
		/** 版本标记*/
		public mark:number;
		/** 战令数据*/
		public warorder:Pb_God.PBWarOrder;
		/** 图鉴成就*/
		public illustration:Pb_God.PBIllustrationAchieve;
		/** 图鉴战力成就*/
		public illustrationpower:Pb_God.PBIllustrationPower;
		/** 成就之路*/
		public acheveroad:Pb_God.PBPlayerAchieveRoad;
		public static encode(message: Pb_God.PBPlayerAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerAchieve, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerAchieve;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerAchieve;
	}
	/**
	*远征伙伴显示数据
	*/
	class PBExpeditionPetDisplay {
		constructor();
		/**伙伴显示*/
		public display:Pb_God.PBPetDisplay;
		/**最大血量*/
		public maxhp:Long;
		/**当前血量0死亡*/
		public curhp:Long;
		public static encode(message: Pb_God.PBExpeditionPetDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBExpeditionPetDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBExpeditionPetDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBExpeditionPetDisplay;
	}
	/**
	*远征伙伴当前血量
	*/
	class PBExpeditionPetHp {
		constructor();
		/**sn*/
		public sn:Long;
		/**当前血量0死亡*/
		public curhp:Long;
		public static encode(message: Pb_God.PBExpeditionPetHp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBExpeditionPetHp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBExpeditionPetHp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBExpeditionPetHp;
	}
	/**
	*远征对手信息
	*/
	class PBExpeditionTar {
		constructor();
		/** 关卡*/
		public index:number;
		/** 战力*/
		public fightpower:number;
		/** 显示数据*/
		public display:Pb_God.PBPlayerDisplay;
		/** 关卡显示*/
		public petdisplay:Pb_God.PBExpeditionPetDisplay[];
		public static encode(message: Pb_God.PBExpeditionTar, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBExpeditionTar, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBExpeditionTar;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBExpeditionTar;
	}
	/**
	*远征数据
	*/
	class PBPlayerExpedition {
		constructor();
		/** 远征类型 _emExpeditionType*/
		public curtype:number;
		/** 当前打的关卡 0表示通关*/
		public curstage:number;
		/** 所有关卡信息*/
		public stageinfo:Pb_God.PBExpeditionTar[];
		/** 当前打的关卡数据*/
		public battlepet:Pb_God.PBBattlePet;
		/** 使用的伙伴数据*/
		public usepethp:Pb_God.PBExpeditionPetHp[];
		/** 昨日的最大关卡*/
		public laststage:number;
		/** 领取的奖励ID*/
		public prizeid:number[];
		/** 基础战力*/
		public basefightpower:number;
		/** 最大的通关类型*/
		public maxtype:number;
		/** 上一次的远征类型*/
		public lasttype:number;
		public static encode(message: Pb_God.PBPlayerExpedition, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerExpedition, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerExpedition;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerExpedition;
	}
	/**
	*称号
	*/
	class PBPlayerTitle {
		constructor();
		/** 称号ID*/
		public titleid:number;
		/** 到期时间0无限*/
		public endtime:number;
		/** 是否激活*/
		public isactive:boolean;
		public static encode(message: Pb_God.PBPlayerTitle, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTitle, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTitle;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTitle;
	}
	/**
	*头像框
	*/
	class PBPlayerHeadIcon {
		constructor();
		/** ID*/
		public id:number;
		/** 到期时间0无限*/
		public endtime:number;
		/** 是否激活*/
		public isactive:boolean;
		public static encode(message: Pb_God.PBPlayerHeadIcon, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerHeadIcon, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerHeadIcon;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerHeadIcon;
	}
	/**
	*冒险形象
	*/
	class PBPlayerRiskShape {
		constructor();
		/** 形象ID*/
		public id:number;
		/** 已经达成的条件*/
		public condition:number[];
		public static encode(message: Pb_God.PBPlayerRiskShape, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerRiskShape, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerRiskShape;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerRiskShape;
	}
	/**
	*徽章
	*/
	class PBPlayerBadge {
		constructor();
		/** 徽章ID*/
		public id:number;
		/** 获取时间*/
		public addtime:number;
		public static encode(message: Pb_God.PBPlayerBadge, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerBadge, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerBadge;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerBadge;
	}
	/**
	*外形数据
	*/
	class PBPlayerShape {
		constructor();
		/** 称号*/
		public title:Pb_God.PBPlayerTitle[];
		/** 当前使用的称号*/
		public usetitleid:number;
		/** 头像*/
		public headid:number[];
		/** 头像框*/
		public headicon:Pb_God.PBPlayerHeadIcon[];
		/** 冒险形象*/
		public risk:Pb_God.PBPlayerRiskShape[];
		/** 已经激活的冒险形象*/
		public activerisk:number[];
		/** 当前使用的冒险形象*/
		public useriskid:number;
		/**皮肤数据  皮肤ID_过期时间*/
		public allskin:Pb_God.PBU32U32[];
		/**徽章*/
		public badge:Pb_God.PBPlayerBadge[];
		/**荣誉点数*/
		public honor:number;
		/**徽章展示*/
		public badgedisplay:number[];
		/** 皮肤id激活头像*/
		public headidnew:number[];
		/** 皮肤id激活冒险形象*/
		public risknew:Pb_God.PBPlayerRiskShape[];
		/** 皮肤id已经激活的冒险形象*/
		public activerisknew:number[];
		/** 皮肤id当前使用的冒险形象*/
		public useriskidnew:number;
		/** 合服玩家检测名人堂称号版本标识*/
		public mergetitleversion:number;
		public static encode(message: Pb_God.PBPlayerShape, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerShape, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerShape;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerShape;
	}
	/**
	*神殿数据
	*/
	class PBPlayerTemple {
		constructor();
		/**下次战斗时间*/
		public nextfighttime:number;
		public static encode(message: Pb_God.PBPlayerTemple, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTemple, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTemple;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTemple;
	}
	/**
	*元素信息
	*/
	class PBPlayerElementInfo {
		constructor();
		/** 类型*/
		public pettype:number;
		/** 历史最高关卡*/
		public maxstage:number;
		/** 今日最高关卡*/
		public daymaxstage:number;
		public static encode(message: Pb_God.PBPlayerElementInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerElementInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerElementInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerElementInfo;
	}
	/**
	*元素数据
	*/
	class PBPlayerElement {
		constructor();
		/** 元素信息*/
		public info:Pb_God.PBPlayerElementInfo[];
		/** 今日挑战次数*/
		public dayfightcount:number;
		/** 今日购买次数*/
		public daybuycount:number;
		/** 每周通关数*/
		public weekstagecount:number;
		public static encode(message: Pb_God.PBPlayerElement, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerElement, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerElement;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerElement;
	}
	/**
	*冒险格子信息
	*/
	class PBPlayerRiskGrid {
		constructor();
		/** 格子ID*/
		public grid:number;
		/** 类型 _emRiskRefreshType*/
		public type:number;
		/** 开启状态_emRiskGridOpenState*/
		public openstate:number;
		/** 索引 答题ID_答题状态(_emRiskQuestionResult) 店位置_索引*/
		public indexvalue:Pb_God.PBU32U32[];
		/** 参数 对话ID/事件ID*/
		public param:number;
		public static encode(message: Pb_God.PBPlayerRiskGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerRiskGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerRiskGrid;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerRiskGrid;
	}
	/**
	*神殿冒险
	*/
	class PBPlayerRisk {
		constructor();
		/** 当前层数*/
		public curstage:number;
		/** 已经击杀守卫个数*/
		public killguardcount:number;
		/** 领取的奖励ID*/
		public guardprize:number;
		/** 生命药剂数量*/
		public hpdrupcount:number;
		/** 使用生命药剂数量*/
		public usehpdrupcount:number;
		/** 驱魂药剂数量*/
		public killdrupcount:number;
		/** 使用驱魂药剂数量*/
		public usekilldrupcount:number;
		/** 召唤商人数量*/
		public tradercount:number;
		/** 冒险商店*/
		public shopindex:Pb_God.PBU32U32[];
		/** 冒险商店购买的位置*/
		public shopbuypos:number[];
		/** 格子信息*/
		public gridinfo:Pb_God.PBPlayerRiskGrid[];
		/** 守卫血量(位置12345)*/
		public guardhp:Pb_God.PBU32U64[];
		/** 伙伴信息*/
		public petInfo:Pb_God.PBBattlePetInfo[];
		/** 累计道具信息*/
		public iteminfo:Pb_God.PBItemInfo[];
		/** 被动技能*/
		public skillinfo:Pb_God.PBSkillInfo[];
		public static encode(message: Pb_God.PBPlayerRisk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerRisk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerRisk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerRisk;
	}
	/**
	*系统开启
	*/
	class PBPlayerSysteSwitch {
		constructor();
		/** 开启的ID*/
		public systemid:number[];
		/** 开启时间*/
		public opentime:Pb_God.PBU32U32[];
		/** 已经获取的开启系统奖励ID*/
		public prize:number[];
		/** 版本标识*/
		public mark:number;
		public static encode(message: Pb_God.PBPlayerSysteSwitch, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerSysteSwitch, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerSysteSwitch;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerSysteSwitch;
	}
	/**
	*超凡段位对手显示信息
	*/
	class PBPlayerDanEnemy {
		constructor();
		/** 对手显示*/
		public display:Pb_God.PBPlayerDisplay;
		/** 队伍一战力*/
		public fightpower1:number;
		/** 队伍2战力*/
		public fightpower2:number;
		public static encode(message: Pb_God.PBPlayerDanEnemy, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerDanEnemy, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerDanEnemy;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerDanEnemy;
	}
	/**
	*超凡段位记录
	*/
	class PBPlayerDanRecord {
		constructor();
		/** 战斗sn*/
		public battlesn:Long[];
		/** 左边display*/
		public left:Pb_God.PBPlayerDisplay;
		/** 右边display*/
		public right:Pb_God.PBPlayerDisplay;
		/** 左边排名*/
		public leftrank:number;
		/** 右边排名*/
		public rightrank:number;
		/** 左边段位*/
		public leftdan:number;
		/** 右边段位*/
		public rightdan:number;
		/** 胜利方0左边1右边*/
		public winner:number;
		/** BattleType_Dan/BattleType_DanKing*/
		public type:number;
		/** 时间*/
		public time:number;
		public static encode(message: Pb_God.PBPlayerDanRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerDanRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerDanRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerDanRecord;
	}
	/**
	*超凡段位战绩
	*/
	class PBPlayerDanResult {
		constructor();
		/** 赛季ID*/
		public seasonid:number;
		/** 当前段位ID*/
		public curdanid:number;
		/** 历史最高段位ID*/
		public maxdanid:number;
		/** 当前经验*/
		public exp:number;
		/** 缓冲经验*/
		public cacheexp:number;
		/** 积分(服务器排序匹配用)*/
		public score:number;
		/** 最大积分*/
		public maxscore:number;
		/** 常规赛胜场*/
		public normalsuccount:number;
		/** 常规赛总场数*/
		public normaltotalcount:number;
		/** 王者赛胜场*/
		public kingsuccount:number;
		/** 王者赛总场数*/
		public kingtotalcount:number;
		/** 单场最大伤害值*/
		public maxdamage:Long;
		/** 最大连胜场次*/
		public maxcontinuewin:number;
		/** MVP次数最多英雄*/
		public mvpmaxpet:number;
		/** MVP次数英雄*/
		public mvppet:Pb_God.PBU32U32[];
		/** 最强对手*/
		public maxenemy:Pb_God.PBPlayerDanEnemy;
		public static encode(message: Pb_God.PBPlayerDanResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerDanResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerDanResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerDanResult;
	}
	/**
	*超凡段位
	*/
	class PBPlayerDan {
		constructor();
		/** 赛季ID*/
		public curseasonid:number;
		/** 赛季状态*/
		public seasonstate:number;
		/** 挑战次数*/
		public fightcount:number;
		/** 购买次数*/
		public buycount:number;
		/** 领奖的段位ID*/
		public prizedanid:number;
		/** 当前连胜场次*/
		public continuewincount:number;
		/** 晋级赛结果*/
		public protmoteresult:number[];
		/** 总战绩*/
		public totalresult:Pb_God.PBPlayerDanResult;
		/** 赛季战绩*/
		public seasonresult:Pb_God.PBPlayerDanResult[];
		/** 个人战斗记录*/
		public records:Pb_God.PBPlayerDanRecord[];
		/** 是否在王者赛中*/
		public inkingmatch:boolean;
		public static encode(message: Pb_God.PBPlayerDan, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerDan, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerDan;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerDan;
	}
	/**
	* 跨服天梯记录
	*/
	class PBPlayerLadderRecord {
		constructor();
		/**战斗流水号*/
		public battlesn:Long;
		/**战斗结果 _emBattleResult*/
		public result:number;
		/**显示信息*/
		public display:Pb_God.PBPlayerDisplay;
		/**战斗力*/
		public fightpower:number;
		/**老排名*/
		public oldrank:number;
		/**新排名*/
		public newrank:number;
		/**时间*/
		public beggintime:number;
		public static encode(message: Pb_God.PBPlayerLadderRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerLadderRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerLadderRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerLadderRecord;
	}
	/**
	* 跨服天梯信息
	*/
	class PBPlayerLadder {
		constructor();
		/**进入次数*/
		public dayentercount:number;
		/**购买次数*/
		public daybuycount:number;
		/**最高名次*/
		public maxrank:number;
		/**刷新的名次*/
		public refreshrank:number[];
		/**我的记录*/
		public record:Pb_God.PBPlayerLadderRecord[];
		/**点赞的玩家id*/
		public likeplayers:number[];
		/**点赞的机器人id*/
		public likerobots:number[];
		public static encode(message: Pb_God.PBPlayerLadder, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerLadder, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerLadder;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerLadder;
	}
	/**
	*我的比赛记录
	*/
	class PBChampionFightRecordInfo {
		constructor();
		/**战斗SN*/
		public battlesn:Long;
		/**回合ID_emChampionRound*/
		public round:number;
		/**增加的积分*/
		public addscore:number;
		/**自己显示*/
		public selfdisplay:Pb_God.PBPlayerDisplay;
		/**目标显示*/
		public tardisplay:Pb_God.PBPlayerDisplay;
		/**战斗结果_emBattleResult*/
		public result:number;
		/**时间*/
		public time:number;
		public static encode(message: Pb_God.PBChampionFightRecordInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionFightRecordInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionFightRecordInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionFightRecordInfo;
	}
	/**
	*我的比赛记录
	*/
	class PBChampionFightRecord {
		constructor();
		/**记录*/
		public record:Pb_God.PBChampionFightRecordInfo[];
		public static encode(message: Pb_God.PBChampionFightRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionFightRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionFightRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionFightRecord;
	}
	/**
	*我的竞猜记录
	*/
	class PBChampionGuessRecordInfo {
		constructor();
		/**战斗SN*/
		public battlesn:Long;
		/**回合ID_emChampionRound*/
		public round:number;
		/**增加竞猜币(负数表示失去)*/
		public addguesscoin:number;
		/**胜利者显示*/
		public windisplay:Pb_God.PBPlayerDisplay;
		/**失败者显示*/
		public faildisplay:Pb_God.PBPlayerDisplay;
		public static encode(message: Pb_God.PBChampionGuessRecordInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionGuessRecordInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionGuessRecordInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionGuessRecordInfo;
	}
	/**
	*正在竞猜记录
	*/
	class PBChampionGuessRecordIng {
		constructor();
		/**战斗SN*/
		public battlesn:Long;
		/**回合ID_emChampionRound*/
		public round:number;
		/**竞猜币*/
		public guesscoin:number;
		/**左边显示*/
		public leftdisplay:Pb_God.PBPlayerDisplay;
		/**右边显示*/
		public rightdisplay:Pb_God.PBPlayerDisplay;
		/**竞猜玩家*/
		public playerid:number;
		public static encode(message: Pb_God.PBChampionGuessRecordIng, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionGuessRecordIng, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionGuessRecordIng;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionGuessRecordIng;
	}
	/**
	*我的竞猜记录
	*/
	class PBChampionGuessRecord {
		constructor();
		/**记录*/
		public record:Pb_God.PBChampionGuessRecordInfo[];
		/**正在竞猜记录*/
		public recording:Pb_God.PBChampionGuessRecordIng;
		public static encode(message: Pb_God.PBChampionGuessRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionGuessRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionGuessRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionGuessRecord;
	}
	/**
	* 冠军赛数据
	*/
	class PBChampionData {
		constructor();
		/**当前排行*/
		public order:number;
		/**当前积分*/
		public score:number;
		/**战斗积分*/
		public fightscore:number;
		/**防守阵容*/
		public defense:Pb_God.PBBattlePet;
		/**竞猜币*/
		public guesscoin:number;
		/**我的竞猜记录*/
		public guessrecord:Pb_God.PBChampionGuessRecord;
		/**我的比赛记录*/
		public fightrecord:Pb_God.PBChampionFightRecord;
		/**历史最高名次*/
		public maxrank:number;
		/**结果通知*/
		public issynresult:boolean;
		/**是否通知排行*/
		public issyntop:boolean;
		/**最后存在的轮次*/
		public lastround:number;
		public static encode(message: Pb_God.PBChampionData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionData;
	}
	/**
	* 圣物具体数据
	*/
	class PBPlayerHolyInfo {
		constructor();
		/** 类型*/
		public pettype:number;
		/** 等级*/
		public level:number;
		/** 当前经验*/
		public exp:number;
		/** 进阶*/
		public advance:number;
		public static encode(message: Pb_God.PBPlayerHolyInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerHolyInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerHolyInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerHolyInfo;
	}
	/**
	* 神器数据
	*/
	class PBPlayerHoly {
		constructor();
		/** 圣物具体数据*/
		public info:Pb_God.PBPlayerHolyInfo[];
		public static encode(message: Pb_God.PBPlayerHoly, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerHoly, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerHoly;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerHoly;
	}
	/**
	* 录像数据
	*/
	class PBPlayerVideo {
		constructor();
		/** 点赞的录像*/
		public daylikevideo:Long[];
		/** 收藏的录像*/
		public collectvideo:Long[];
		public static encode(message: Pb_God.PBPlayerVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerVideo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerVideo;
	}
	/**
	*vip数据
	*/
	class PBPrivilegeVip {
		constructor();
		/**vip经验*/
		public exp:number;
		/**购买的vip礼包*/
		public buyvippacket:number[];
		public static encode(message: Pb_God.PBPrivilegeVip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPrivilegeVip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPrivilegeVip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPrivilegeVip;
	}
	/**
	*特权商店数据
	*/
	class PBPrivilegeShopBuy {
		constructor();
		/**index*/
		public index:number;
		/**购买个数*/
		public buycount:number;
		public static encode(message: Pb_God.PBPrivilegeShopBuy, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPrivilegeShopBuy, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPrivilegeShopBuy;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPrivilegeShopBuy;
	}
	/**
	*特权卡
	*/
	class PBPrivilegeCard {
		constructor();
		/**特权卡ID _emPrivilegeCard*/
		public cardid:number;
		/**失效时间(0永久)*/
		public expiretime:number;
		public static encode(message: Pb_God.PBPrivilegeCard, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPrivilegeCard, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPrivilegeCard;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPrivilegeCard;
	}
	/**
	*特权卡充值记录
	*/
	class PBPrivilegeCharge {
		constructor();
		/**特权卡ID _emPrivilegeCard*/
		public cardid:number;
		/**累计充值*/
		public totalcharge:number;
		/**0未激活*/
		public expiretime:number;
		public static encode(message: Pb_God.PBPrivilegeCharge, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPrivilegeCharge, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPrivilegeCharge;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPrivilegeCharge;
	}
	/**
	*每日奖励
	*/
	class PBPrivilegeDailyPrize {
		constructor();
		/**礼包ID _emPrivilegeDailyPacket*/
		public packetid:number;
		/**领奖时间*/
		public prizetime:number;
		public static encode(message: Pb_God.PBPrivilegeDailyPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPrivilegeDailyPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPrivilegeDailyPrize;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPrivilegeDailyPrize;
	}
	/**
	*特权数据
	*/
	class PBPlayerPrivilege {
		constructor();
		/**vip数据*/
		public vip:Pb_God.PBPrivilegeVip;
		/**特权商店*/
		public shopbuy:Pb_God.PBPrivilegeShopBuy[];
		/**每日奖励*/
		public dailyprize:Pb_God.PBPrivilegeDailyPrize[];
		/**特权卡*/
		public card:Pb_God.PBPrivilegeCard[];
		/**特权卡充值记录*/
		public charge:Pb_God.PBPrivilegeCharge[];
		/**是否已验证补偿过*/
		public IsCompensation:number;
		public static encode(message: Pb_God.PBPlayerPrivilege, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPrivilege, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPrivilege;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPrivilege;
	}
	/**
	*签到数据
	*/
	class PBPlayerSignin {
		constructor();
		/** 签到天数*/
		public signinDays:number;
		/** 签到状态*/
		public signinState:number;
		public static encode(message: Pb_God.PBPlayerSignin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerSignin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerSignin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerSignin;
	}
	/**
	*点石成金数据
	*/
	class PBPlayerClickGoldInfo {
		constructor();
		/**类型*/
		public type:number;
		/**点击的次数*/
		public times:number;
		public static encode(message: Pb_God.PBPlayerClickGoldInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerClickGoldInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerClickGoldInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerClickGoldInfo;
	}
	/**
	*点石成金数据
	*/
	class PBPlayerClickGold {
		constructor();
		/**下次重置时间*/
		public resettime:number;
		/**点石成金*/
		public info:Pb_God.PBPlayerClickGoldInfo[];
		public static encode(message: Pb_God.PBPlayerClickGold, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerClickGold, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerClickGold;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerClickGold;
	}
	/**
	*点石成金数据
	*/
	class PBPlayerGift {
		constructor();
		/**index*/
		public index:number;
		/**个数*/
		public count:number;
		/**购买时间*/
		public time:number;
		public static encode(message: Pb_God.PBPlayerGift, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerGift, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerGift;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerGift;
	}
	/**
	*离线找回数据
	*/
	class PBFindBackData {
		constructor();
		/** 领取玩法ID see @ENMResourceID */
		public ResourceID:number;
		/**奖励物品, key：ItemID , value: 数量*/
		public Reward:Pb_God.PBU32U32[];
		/**领取状态  see@ DrawStaus*/
		public Status:number;
		/**完美找回扣除钻石数*/
		public SubDiamond:number;
		/**免费找回折扣*/
		public Discount:number;
		public static encode(message: Pb_God.PBFindBackData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFindBackData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFindBackData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFindBackData;
	}
	/**
	*资源找回
	*/
	class PBFindBackDatas {
		constructor();
		/**收集离线数据天数*/
		public OfflineDay:number;
		/**玩家找回天数 */
		public FindBackDay:number;
		/**离线找回数据*/
		public FindBackData:Pb_God.PBFindBackData[];
		/**上次Onlogin时间*/
		public LastOnLoginTime:number;
		public static encode(message: Pb_God.PBFindBackDatas, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFindBackDatas, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFindBackDatas;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFindBackDatas;
	}
	/**
	*福利数据
	*/
	class PBPlayerWeal {
		constructor();
		/** 签到数据*/
		public signin:Pb_God.PBPlayerSignin;
		/** 点石成金数据*/
		public clickgold:Pb_God.PBPlayerClickGold;
		/** 返利数据*/
		public fanli:Pb_God.PBPlayerFanli;
		/** 在线奖励数据*/
		public onlineprize:number;
		/** 礼包*/
		public gift:Pb_God.PBPlayerGift[];
		/**离线找回数据*/
		public FindBack:Pb_God.PBFindBackDatas;
		public static encode(message: Pb_God.PBPlayerWeal, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerWeal, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerWeal;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerWeal;
	}
	/**
	*返利数据
	*/
	class PBPlayerFanli {
		constructor();
		/**充值金额*/
		public money:number;
		/**状态 player_FanLi_State*/
		public state:number;
		public static encode(message: Pb_God.PBPlayerFanli, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerFanli, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerFanli;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerFanli;
	}
	/**
	* 孵蛋
	*/
	class PBIncubateEgg {
		constructor();
		/**正在孵化Index*/
		public Index:number;
		/**总的步数*/
		public TotalStep:number;
		/**当前步数*/
		public CurrStep:number;
		/**当前速度*/
		public Speed:number;
		/**上次更新步数时间 */
		public LastStepTime:number;
		/**使用自行车开始时间*/
		public BikeEndTime:number;
		/**是否使用过暖暖石*/
		public IsUseSubTotalStep:boolean;
		public static encode(message: Pb_God.PBIncubateEgg, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBIncubateEgg, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBIncubateEgg;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBIncubateEgg;
	}
	/**
	*孵蛋屋
	*/
	class PBIncubateEggData {
		constructor();
		/**正在孵化蛋数据*/
		public IncubateEggs:Pb_God.PBIncubateEgg[];
		public static encode(message: Pb_God.PBIncubateEggData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBIncubateEggData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBIncubateEggData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBIncubateEggData;
	}
	/**
	*针对每一个奖励的存储
	*/
	class PBPlayerActivityIndexData {
		constructor();
		/** 索引*/
		public index:number;
		/** 数值*/
		public data:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBPlayerActivityIndexData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerActivityIndexData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerActivityIndexData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerActivityIndexData;
	}
	/**
	*活动存储数据
	*/
	class PBPlayerActivityData {
		constructor();
		/** 活动ID*/
		public id:number;
		/** 上次重置时间*/
		public resettime:number;
		/** 已经获得的奖励索引*/
		public acquired:number[];
		/** 数值*/
		public data:Pb_God.PBU32U32[];
		/** 针对每个奖励索引数值*/
		public indexdata:Pb_God.PBPlayerActivityIndexData[];
		public static encode(message: Pb_God.PBPlayerActivityData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerActivityData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerActivityData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerActivityData;
	}
	/**
	*活动数据
	*/
	class PBPlayerActivity {
		constructor();
		/**活动数据*/
		public activitydata:Pb_God.PBPlayerActivityData[];
		public static encode(message: Pb_God.PBPlayerActivity, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerActivity, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerActivity;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerActivity;
	}
	/**
	*商品购买信息
	*/
	class PBChargeInfo {
		constructor();
		/**商品组id*/
		public groupid:number;
		/**第一次购买时间*/
		public firstbuytime:number;
		/**最近一次购买时间*/
		public lastbuytime:number;
		/**总购买次数*/
		public buycount:number;
		public static encode(message: Pb_God.PBChargeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChargeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChargeInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChargeInfo;
	}
	/**
	* 充值信息
	*/
	class PBRechargeInfo {
		constructor();
		/**服务器ID*/
		public worldid:number;
		/**角色ID*/
		public playerid:number;
		/**人民币*/
		public rmb:number;
		/**时间*/
		public time:number;
		/**账号*/
		public account:string;
		/**流水号*/
		public sn:string;
		/**购买id*/
		public buyid:number;
		/**增加类型*/
		public type:number;
		/**增加参数*/
		public param:number;
		/**充值方式*/
		public rechargemode:string;
		public static encode(message: Pb_God.PBRechargeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRechargeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRechargeInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRechargeInfo;
	}
	/**
	*平台信息
	*/
	class PBPlayerPlatform {
		constructor();
		/**商品购买信息*/
		public info:Pb_God.PBChargeInfo[];
		public static encode(message: Pb_God.PBPlayerPlatform, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPlatform, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPlatform;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPlatform;
	}
	/**
	*  频道信息
	*/
	class PBGMTalkForbid {
		constructor();
		/**类型 _emBroadcast_Channel(-1代表所有频道)*/
		public channel:number;
		/**gm禁言解封时间(0的话代表没有被禁言)*/
		public forbidtime:number;
		public static encode(message: Pb_God.PBGMTalkForbid, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGMTalkForbid, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGMTalkForbid;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGMTalkForbid;
	}
	/**
	*  频道信息
	*/
	class PBTalkChannel {
		constructor();
		/**类型 _emBroadcast_Channel*/
		public channel:number;
		/**最后一次发言时间(聊天冷却使用)*/
		public lasttime:number;
		/**gm禁言解封时间(0的话代表没有被禁言)*/
		public forbidtime:number;
		/**当天发言次数*/
		public dailycount:number;
		public static encode(message: Pb_God.PBTalkChannel, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTalkChannel, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTalkChannel;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTalkChannel;
	}
	/**
	*玩家聊天
	*/
	class PBPlayerTalk {
		constructor();
		/** 频道信息*/
		public talk:Pb_God.PBTalkChannel[];
		public static encode(message: Pb_God.PBPlayerTalk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTalk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTalk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTalk;
	}
	/**
	*探宝类型数据
	*/
	class PBPlayerTreasureData {
		constructor();
		/**类型*/
		public type:number;
		/**已经得到的幸运兑换物品index*/
		public luckyitems:number[];
		/**已经使用的免费刷新次数*/
		public freecount:number;
		/**免费次数下次重置时间,0无需重置*/
		public nextresettime:number;
		/**轮盘上的物品index*/
		public displayitems:number[];
		/**轮盘上的物品的已经获得了的数量,和displayItems位置对应*/
		public displayitemsnum:number[];
		/**轮盘上物品的随机值(第几个随机物品,从0开始)，和displayItems位置对应*/
		public displayrand:number[];
		public static encode(message: Pb_God.PBPlayerTreasureData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTreasureData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTreasureData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTreasureData;
	}
	/**
	*探宝数据
	*/
	class PBPlayerTreasure {
		constructor();
		/**探宝数据*/
		public data:Pb_God.PBPlayerTreasureData[];
		public static encode(message: Pb_God.PBPlayerTreasure, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTreasure, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTreasure;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTreasure;
	}
	/**
	* 抽獎数据
	*/
	class PBPlayerLotteryData {
		constructor();
		/** 类型值，*/
		public type:number;
		/** 本次许愿时间，当第一次使用时更新此值*/
		public time:number;
		/** 已经使用的免费刷新次数*/
		public freecount:number;
		/** 本次已许愿次数*/
		public count:number;
		/** 许愿奖励序号，默认为第一个*/
		public location:number;
		/** 每只精灵对应的点击数量*/
		public petHitCount:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBPlayerLotteryData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerLotteryData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerLotteryData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerLotteryData;
	}
	/**
	* 抽獎数据列表
	*/
	class PBPlayerLottery {
		constructor();
		/** 抽獎数据*/
		public data:Pb_God.PBPlayerLotteryData[];
		public static encode(message: Pb_God.PBPlayerLottery, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerLottery, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerLottery;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerLottery;
	}
	/**
	*天界副本关卡数据
	*/
	class PBPlayerHeavenDungeonStage {
		constructor();
		/** 索引*/
		public index:number;
		/** 点亮的星星(保存完成了的，第几个星星条件，从0开始)*/
		public stars:number[];
		/** 是否还是第一次都没打过*/
		public first:boolean;
		public static encode(message: Pb_God.PBPlayerHeavenDungeonStage, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerHeavenDungeonStage, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerHeavenDungeonStage;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerHeavenDungeonStage;
	}
	/**
	*天界副本章节数据
	*/
	class PBPlayerHeavenDungeonChapter {
		constructor();
		/** 类型*/
		public chapter:number;
		/** 已经获取的章节奖励*/
		public rewards:number[];
		/** 关卡数据*/
		public stages:Pb_God.PBPlayerHeavenDungeonStage[];
		public static encode(message: Pb_God.PBPlayerHeavenDungeonChapter, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerHeavenDungeonChapter, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerHeavenDungeonChapter;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerHeavenDungeonChapter;
	}
	/**
	*天界副本神像数据
	*/
	class PBPlayerHeavenDungeonStatue {
		constructor();
		/** 神像索引*/
		public index:number;
		/** 自己经获得的奖励记录*/
		public rewards:Pb_God.PBU32U32[];
		/** 祈祷了多少次了*/
		public times:number;
		public static encode(message: Pb_God.PBPlayerHeavenDungeonStatue, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerHeavenDungeonStatue, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerHeavenDungeonStatue;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerHeavenDungeonStatue;
	}
	/**
	*天界副本数据
	*/
	class PBPlayerHeavenDungeon {
		constructor();
		/** 当前次数*/
		public count:number;
		/** 已经用了的购买次数*/
		public buycount:number;
		/** 已经用了的祈祷免费次数*/
		public prayfreecount:number;
		/** 章节数据*/
		public chapters:Pb_God.PBPlayerHeavenDungeonChapter[];
		/** 神像数据*/
		public statues:Pb_God.PBPlayerHeavenDungeonStatue[];
		public static encode(message: Pb_God.PBPlayerHeavenDungeon, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerHeavenDungeon, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerHeavenDungeon;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerHeavenDungeon;
	}
	/**
	*跨服竞技场队伍数据
	*/
	class PBPlayerCrossChallengeTeamInfo {
		constructor();
		/** 队伍1*/
		public team1:Pb_God.PBBattlePet;
		/** 队伍2*/
		public team2:Pb_God.PBBattlePet;
		/** 队伍3*/
		public team3:Pb_God.PBBattlePet;
		/** 是否隐藏队伍1*/
		public hideteam1:boolean;
		/** 是否隐藏队伍2*/
		public hideteam2:boolean;
		/** 是否隐藏队伍3*/
		public hideteam3:boolean;
		public static encode(message: Pb_God.PBPlayerCrossChallengeTeamInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerCrossChallengeTeamInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerCrossChallengeTeamInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerCrossChallengeTeamInfo;
	}
	/**
	* 跨服竞技场玩家信息
	*/
	class PBCrossChallengeInfo {
		constructor();
		/** id*/
		public id:number;
		/** 玩家显示*/
		public display:Pb_God.PBPlayerDisplay;
		/** 队伍*/
		public team:Pb_God.PBPlayerCrossChallengeTeamInfo;
		/** 名次*/
		public order:number;
		/** 积分*/
		public score:number;
		/** 获得积分的时间*/
		public scoretime:number;
		/** 点赞数*/
		public like:number;
		/** 战斗力*/
		public power:number;
		/** 是否是机器人*/
		public robot:boolean;
		/** 公会名*/
		public faction:string;
		public static encode(message: Pb_God.PBCrossChallengeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCrossChallengeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCrossChallengeInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCrossChallengeInfo;
	}
	/**
	*跨服竞技场数据
	*/
	class PBPlayerCrossChallenge {
		constructor();
		/** 当天挑战次数*/
		public count:number;
		/** 连胜次数*/
		public continuecount:number;
		/** 是否隐藏队伍*/
		public hideteam:boolean[];
		/** 今天点了赞的玩家，每日清理*/
		public likeplayer:number[];
		/** 今天领取了的宝箱，每日清理*/
		public curdailyprize:number[];
		/**跨服竞技场对手*/
		public refreshinfo:Pb_God.PBCrossChallengeInfo[];
		/** 历史最高排名*/
		public historyrank:number;
		/** 赛季*/
		public seasonindex:number;
		public static encode(message: Pb_God.PBPlayerCrossChallenge, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerCrossChallenge, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerCrossChallenge;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerCrossChallenge;
	}
	/**
	*阵位数据
	*/
	class PBPlayerTabletPosition {
		constructor();
		/** 位置*/
		public pos:number;
		/** pet sn*/
		public sn:Long;
		public static encode(message: Pb_God.PBPlayerTabletPosition, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTabletPosition, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTabletPosition;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTabletPosition;
	}
	/**
	*晶碑数据
	*/
	class PBPlayerTablet {
		constructor();
		/** 产生魔液个数*/
		public magicjuice:number;
		/** 剩余经验*/
		public exp:Long;
		/** 晶碑等级*/
		public level:number;
		/** 下次提炼的时间*/
		public nextproducetime:number;
		/** 阵位*/
		public position:Pb_God.PBPlayerTabletPosition[];
		/** 临时英雄*/
		public heros:Pb_God.PBU64U32[];
		public static encode(message: Pb_God.PBPlayerTablet, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTablet, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTablet;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTablet;
	}
	/**
	*周冠军赛数据
	*/
	class PBPlayerWeekChampion {
		constructor();
		/** 点赞的玩家*/
		public likeplayers:number[];
		public static encode(message: Pb_God.PBPlayerWeekChampion, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerWeekChampion, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerWeekChampion;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerWeekChampion;
	}
	/**
	*组队征战英雄状态,没有的为满血
	*/
	class PBTeamCampaignPetState {
		constructor();
		/**sn*/
		public sn:Long;
		/**当前血量0死亡*/
		public curhp:Long;
		/**最大hp*/
		public maxhp:Long;
		public static encode(message: Pb_God.PBTeamCampaignPetState, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTeamCampaignPetState, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTeamCampaignPetState;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTeamCampaignPetState;
	}
	/**
	*组队征战数据
	*/
	class PBPlayerTeamCampaign {
		constructor();
		/**战斗力*/
		public fightpower:number;
		/**当前难度*/
		public difficulty:number;
		/**当前关卡*/
		public stage:number;
		/**当天的敌人*/
		public targets:number[];
		/**通关的难度*/
		public passed:number[];
		/**未选择的额外奖励*/
		public extraprize:number[];
		/**当前的技能*/
		public skill:number[];
		/**玩家英雄状态*/
		public petstate:Pb_God.PBTeamCampaignPetState[];
		/**当前关卡状态*/
		public stagestate:Pb_God.PBTeamCampaignPetState[];
		/**今日选过的奖励*/
		public prize:number[];
		public static encode(message: Pb_God.PBPlayerTeamCampaign, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerTeamCampaign, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerTeamCampaign;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerTeamCampaign;
	}
	/**
	*玩家邀请奖励
	*/
	class PBPlayerInvitePrize {
		constructor();
		/**成就ID*/
		public id:number;
		/**可领取数量*/
		public num:number;
		/**已经领取数量*/
		public gotnum:number;
		public static encode(message: Pb_God.PBPlayerInvitePrize, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerInvitePrize, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerInvitePrize;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerInvitePrize;
	}
	/**
	* 个人空间
	*/
	class PBPlayerPrivateSpace {
		constructor();
		/** 粉丝们的player id*/
		public fans:number[];
		/** 自己关注的玩家 player id*/
		public follow:number[];
		/** 背景图*/
		public background:number;
		/** 展示的英雄*/
		public showpets:Long[];
		/** 切磋需要验证*/
		public needconfirm:boolean;
		/** 自己的邀请码*/
		public invitecode:string;
		/** 邀请自己的玩家 world id, player id*/
		public invite:Pb_God.PBU32U32;
		/** 接受邀请的玩家 world id, player id*/
		public inviteplayers:Pb_God.PBU32U32[];
		/** 邀请奖励*/
		public inviteprize:Pb_God.PBPlayerInvitePrize[];
		/** 是否领取问卷奖励*/
		public surveyprize:number[];
		public static encode(message: Pb_God.PBPlayerPrivateSpace, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerPrivateSpace, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerPrivateSpace;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerPrivateSpace;
	}
	/**
	*龙珠
	*/
	class PBPlayerDragonBall {
		constructor();
		/**类型*/
		public type:number;
		/**等级*/
		public level:number;
		public static encode(message: Pb_God.PBPlayerDragonBall, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerDragonBall, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerDragonBall;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerDragonBall;
	}
	/**
	* 龙珠数据
	*/
	class PBPlayerDragonBallData {
		constructor();
		/**龙珠们*/
		public balls:Pb_God.PBPlayerDragonBall[];
		public static encode(message: Pb_God.PBPlayerDragonBallData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerDragonBallData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerDragonBallData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerDragonBallData;
	}
	/**
	* common数据
	*/
	class PBPlayerCommonData {
		constructor();
		/**简单奖励*/
		public prize:number[];
		public static encode(message: Pb_God.PBPlayerCommonData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerCommonData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerCommonData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerCommonData;
	}
	/**
	* 契约数据
	*/
	class PBPlayerConvenantData {
		constructor();
		/**等级 0 未解锁 >0 实际等级*/
		public level:number;
		/**部位状态(id, attr index 0 未生效 1 2 3属性索引)*/
		public parts:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBPlayerConvenantData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerConvenantData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerConvenantData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerConvenantData;
	}
	/**
	* 用户系统功能数据
	*/
	class PBPlayerSystem {
		constructor();
		/**序列号*/
		public saveorder:number;
		/**阵法信息*/
		public zhenfa:Pb_God.PBPlayerZhenfa;
		/**副本信息*/
		public copymap:Pb_God.PBPlayerCopymap;
		/**战斗信息*/
		public fight:Pb_God.PBPlayerFight;
		/**任务信息*/
		public task:Pb_God.PBPlayerTask;
		/**竞技场信息*/
		public challenge:Pb_God.PBPlayerChallenge;
		/**帮派信息*/
		public faction:Pb_God.PBPlayerFaction;
		/**召唤信息*/
		public call:Pb_God.PBPlayerCall;
		/**远航数据*/
		public sail:Pb_God.PBPlayerSail;
		/**挂机数据*/
		public hook:Pb_God.PBPlayerHook;
		/**神器数据*/
		public artifact:Pb_God.PBPlayerArtifact;
		/**商店数据*/
		public shop:Pb_God.PBPlayerShop;
		/**试炼数据*/
		public train:Pb_God.PBPlayerTrain;
		/**成就数据*/
		public achieve:Pb_God.PBPlayerAchieve;
		/**远征数据*/
		public expedition:Pb_God.PBPlayerExpedition;
		/**外形数据*/
		public shape:Pb_God.PBPlayerShape;
		/**神殿数据*/
		public temple:Pb_God.PBPlayerTemple;
		/**元素数据*/
		public element:Pb_God.PBPlayerElement;
		/**冒险数据*/
		public risk:Pb_God.PBPlayerRisk;
		/**系统开启数据*/
		public systemswitch:Pb_God.PBPlayerSysteSwitch;
		/**超凡段位*/
		public dan:Pb_God.PBPlayerDan;
		/**跨服天梯信息*/
		public ladder:Pb_God.PBPlayerLadder;
		/**神装套装*/
		public godsuit:Pb_God.PBPlayerGodEquipSuit;
		/**圣物数据*/
		public holy:Pb_God.PBPlayerHoly;
		/**录像数据*/
		public video:Pb_God.PBPlayerVideo;
		/**特权数据*/
		public privilege:Pb_God.PBPlayerPrivilege;
		/**福利数据*/
		public weal:Pb_God.PBPlayerWeal;
		/**活动数据*/
		public activity:Pb_God.PBPlayerActivity;
		/**平台数据*/
		public platform:Pb_God.PBPlayerPlatform;
		/**聊天数据*/
		public talk:Pb_God.PBPlayerTalk;
		/**探宝数据*/
		public treasure:Pb_God.PBPlayerTreasure;
		/**天界副本数据*/
		public heaven:Pb_God.PBPlayerHeavenDungeon;
		/**跨服竞技场*/
		public crosschallenge:Pb_God.PBPlayerCrossChallenge;
		/**家园数据*/
		public room:Pb_God.PBPlayerRoomData;
		/**晶碑数据*/
		public tablet:Pb_God.PBPlayerTablet;
		/**精灵数据*/
		public elf:Pb_God.PBElfData;
		/**game排行榜数据*/
		public toplist:Pb_God.PBPlayerToplist;
		/**周冠军赛数据*/
		public weekchampion:Pb_God.PBPlayerWeekChampion;
		/**组队征战数据*/
		public teamCampaign:Pb_God.PBPlayerTeamCampaign;
		/**个人空间*/
		public privatespace:Pb_God.PBPlayerPrivateSpace;
		/**龙珠数据*/
		public dragonball:Pb_God.PBPlayerDragonBallData;
		/**common数据*/
		public common:Pb_God.PBPlayerCommonData;
		/**契约数据*/
		public convenant:Pb_God.PBPlayerConvenantData;
		/**抽獎数据*/
		public lottery:Pb_God.PBPlayerLottery;
		/**图鉴数据*/
		public illustration:Pb_God.PBPlayerIllustration;
		/**红包数据*/
		public redEnvelope:Pb_God.PBPlayerRedEnvelope;
		/**连连看*/
		public joyousLinkup:Pb_God.PBPlayerJoyousLinkup;
		/**猜猜猜数据*/
		public guess:Pb_God.PBPlayerGuess;
		/**守护数据*/
		public defend:Pb_God.PBPlayerDefend;
		/**共鸣数据*/
		public resonance:Pb_God.PBPlayerResonance;
		/**孵化蛋*/
		public incubateegg:Pb_God.PBIncubateEggData;
		/**活动boss*/
		public activityboss:Pb_God.PBActivityBossData;
		public static encode(message: Pb_God.PBPlayerSystem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerSystem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerSystem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerSystem;
	}
	/**
	* 用户系统功能数据,用于扩展PBPlayerSystem包大小，目前只把PBPlayerTrain数据移到这个扩展结构中
	*/
	class PBPlayerSystemExt {
		constructor();
		/**序列号*/
		public saveorder:number;
		/**扩展功能标识 _emPlayerSystemExtFlag*/
		public flag:number;
		/**试炼数据*/
		public train:Pb_God.PBPlayerTrain;
		/**跨服竞技场*/
		public crosschallenge:Pb_God.PBPlayerCrossChallenge;
		/**角色订单管数据*/
		public orderdata:Pb_God.PBPlayerOrderData;
		public static encode(message: Pb_God.PBPlayerSystemExt, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerSystemExt, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerSystemExt;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerSystemExt;
	}
	/**
	* 前端数据存储
	*/
	class PBClientData {
		constructor();
		/** 序列号*/
		public saveorder:number;
		/** 前端数据*/
		public clientdata:string;
		public static encode(message: Pb_God.PBClientData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBClientData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBClientData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBClientData;
	}
	/**
	*game排行榜数据
	*/
	class PBPlayerToplistData {
		constructor();
		/** 类型*/
		public uType:number;
		/**值*/
		public uValue:Long;
		/**字值*/
		public uSubValue:Long;
		/**时间*/
		public uTime:number;
		/**是否更新*/
		public bUpdate:boolean;
		public static encode(message: Pb_God.PBPlayerToplistData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerToplistData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerToplistData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerToplistData;
	}
	/**
	*game排行榜数据
	*/
	class PBPlayerToplist {
		constructor();
		/**排行榜数据*/
		public toplistData:Pb_God.PBPlayerToplistData[];
		public static encode(message: Pb_God.PBPlayerToplist, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerToplist, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerToplist;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerToplist;
	}
	/**
	* 任务数据
	*/
	class PBPlayerQuest {
		constructor();
		/** 序列号*/
		public saveorder:number;
		/** 前端数据*/
		public clientdata:Uint8Array;
		public static encode(message: Pb_God.PBPlayerQuest, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerQuest, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerQuest;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerQuest;
	}
	/**
	**************************************************邮件数据开始***************************
	*/
	class PBMail {
		constructor();
		/**世界ID*/
		public worldid:number;
		/**玩家ID*/
		public playerid:number;
		/**编号*/
		public mailid:number;
		/**类型_emMailType*/
		public type:number;
		/**发送时间*/
		public sendtime:number;
		/**过期时间*/
		public expiretime:number;
		/**标题*/
		public title:string;
		/**正文*/
		public text:string;
		/**已读标记 (0代表未读,其他已读) _emMailState*/
		public state:number;
		/**操作类型_emDoingType*/
		public doingtype:number;
		/**道具*/
		public item:Pb_God.PBItem[];
		/**参数*/
		public param:number[];
		/**后台邮件ID */
		public backmailid:string;
		public static encode(message: Pb_God.PBMail, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBMail, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBMail;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBMail;
	}
	/**
	* 邮件数据
	*/
	class PBPlayerMail {
		constructor();
		/** 序列号*/
		public saveorder:number;
		/** 邮件数据*/
		public mail:Pb_God.PBMail[];
		public static encode(message: Pb_God.PBPlayerMail, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerMail, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerMail;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerMail;
	}
	/**
	* 物品（装备）
	*/
	class PBItem {
		constructor();
		/** 物品流水号*/
		public itemsn:Long;
		/** 物品ID*/
		public itemid:number;
		/** 物品数量*/
		public itemcount:number;
		/** 标识*/
		public flag:number;
		/** 被动技能数据*/
		public skillinfo:Pb_God.PBSkillInfo[];
		/** 随机属性*/
		public randattr:Pb_God.PBAttrBaseInfo[];
		/** 重铸的被动技能数据*/
		public refineskill:Pb_God.PBSkillInfo[];
		/** 随机属性*/
		public refineattr:Pb_God.PBAttrBaseInfo[];
		/** 神装洗练次数*/
		public godrefinecount:number;
		/** 穿戴伙伴SN*/
		public equippetsn:Long;
		/** 获得时间*/
		public time:number;
		public static encode(message: Pb_God.PBItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBItem;
	}
	/**
	* 装备合成记录
	*/
	class PBEquipCompoundLog {
		constructor();
		/** 时间*/
		public time:number;
		/** 合成物品*/
		public item:Pb_God.PBItemInfo[];
		/** 消耗*/
		public expend:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBEquipCompoundLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBEquipCompoundLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBEquipCompoundLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBEquipCompoundLog;
	}
	/**
	* 用户背包
	*/
	class PBPlayerBag {
		constructor();
		/** 序列号*/
		public saveorder:number;
		/** 道具背包*/
		public itembag:Pb_God.PBItem[];
		/** 穿戴的道具*/
		public equipitem:Pb_God.PBItem[];
		/** 装备合成记录*/
		public equiplog:Pb_God.PBEquipCompoundLog[];
		public static encode(message: Pb_God.PBPlayerBag, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerBag, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerBag;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerBag;
	}
	/**
	* 用户背包 扩展
	*/
	class PBPlayerBagExt {
		constructor();
		/** 序列号*/
		public saveorder:number;
		/** 道具背包*/
		public itembag:Pb_God.PBItem[];
		/** 穿戴的道具*/
		public equipitem:Pb_God.PBItem[];
		public static encode(message: Pb_God.PBPlayerBagExt, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerBagExt, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerBagExt;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerBagExt;
	}
	/**
	* 好友支援英雄
	*/
	class PBPlayerSupportHero {
		constructor();
		/** _emFriendSupportType*/
		public type:number;
		/** 支援英雄数据*/
		public pet:Pb_God.PBBattlePetInfo;
		public static encode(message: Pb_God.PBPlayerSupportHero, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerSupportHero, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerSupportHero;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerSupportHero;
	}
	/**
	* 好友信息
	*/
	class PBPlayerFriendInfo {
		constructor();
		/** 好友显示*/
		public display:Pb_God.PBPlayerDisplay;
		/** 战力*/
		public fightpower:number;
		/** 离线时间*/
		public offlinetime:number;
		/** 支援英雄*/
		public support:Pb_God.PBPlayerSupportHero[];
		public static encode(message: Pb_God.PBPlayerFriendInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerFriendInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerFriendInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerFriendInfo;
	}
	/**
	* 已经使用的支援英雄
	*/
	class PBFriendSupport {
		constructor();
		/***/
		public type:number;
		/***/
		public friendid:number;
		/***/
		public sn:Long;
		public static encode(message: Pb_God.PBFriendSupport, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFriendSupport, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFriendSupport;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFriendSupport;
	}
	/**
	* 好友系统
	*/
	class PBPlayerFriend {
		constructor();
		/** 序列号*/
		public saveorder:number;
		/** 好友列表*/
		public friendlist:Pb_God.PBPlayerFriendInfo[];
		/** 申请列表*/
		public applylist:Pb_God.PBPlayerFriendInfo[];
		/** 黑名单列表*/
		public blacklist:Pb_God.PBPlayerFriendInfo[];
		/** 送取的礼物好友ID*/
		public sendprize:number[];
		/** 收到的礼物好友ID*/
		public recieveprize:number[];
		/** 已经领取的礼物好友ID*/
		public addprize:number[];
		/** 自己的支援*/
		public support:Pb_God.PBPlayerSupportHero[];
		/** 已雇佣的支援*/
		public hiredsupport:Pb_God.PBFriendSupport[];
		/** 已使用的支援*/
		public usedsupport:Pb_God.PBFriendSupport[];
		public static encode(message: Pb_God.PBPlayerFriend, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerFriend, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerFriend;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerFriend;
	}
	/**
	*用户信息
	*/
	class PBPlayerData {
		constructor();
		/** 角色账号数据*/
		public accountinfo:Pb_God.PBAccount;
		/** 角色基础数据*/
		public playerbase:Pb_God.PBPlayerBase;
		/** 角色功能数据*/
		public playersystem:Pb_God.PBPlayerSystem;
		/** 角色功能数据*/
		public playersystem2:Pb_God.PBPlayerSystemExt;
		/** 玩家背包*/
		public playerbag:Pb_God.PBPlayerBag;
		/** 玩家背包 扩展 */
		public playerbag2:Pb_God.PBPlayerBagExt;
		/** 角色前端数据*/
		public clientdata:Pb_God.PBClientData;
		/** 伙伴数据*/
		public playerpet:Pb_God.PBPlayerPet;
		/** 伙伴数据 扩展 */
		public playerpet2:Pb_God.PBPlayerPetExt;
		/** 邮件数据*/
		public playermail:Pb_God.PBPlayerMail;
		/** 好友系统*/
		public playerfriend:Pb_God.PBPlayerFriend;
		/** 帮会数据*/
		public playerfaction:Pb_God.PBPlayerFaction;
		/** 伙伴数据3*/
		public playerpet3:Pb_God.PBPlayerPetExt;
		public static encode(message: Pb_God.PBPlayerData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerData;
	}
	/**
	* 神殿挑战记录
	*/
	class PBTempleRecord {
		constructor();
		/** 战斗sn*/
		public battlesn:number;
		/** 归属外显*/
		public battledisplay:Pb_God.PBBattleDisplay;
		/** 进化次数*/
		public evolvecount:number;
		/** 挑战时间*/
		public time:number;
		public static encode(message: Pb_God.PBTempleRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTempleRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTempleRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTempleRecord;
	}
	/**
	* 神殿基本数据
	*/
	class PBTempleInfoBase {
		constructor();
		/** 神殿ID*/
		public id:number;
		/** 归属外显*/
		public ownerdisplay:Pb_God.PBPlayerDisplay;
		/** 进化次数*/
		public evolvecount:number;
		public static encode(message: Pb_God.PBTempleInfoBase, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTempleInfoBase, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTempleInfoBase;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTempleInfoBase;
	}
	/**
	* 神殿数据信息
	*/
	class PBWorldTempleInfo {
		constructor();
		/** 神殿ID*/
		public id:number;
		/** 归属外显*/
		public ownerdisplay:Pb_God.PBPlayerDisplay;
		/** 进化次数*/
		public evolvecount:number;
		/** 挑战记录*/
		public record:Pb_God.PBTempleRecord[];
		public static encode(message: Pb_God.PBWorldTempleInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldTempleInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldTempleInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldTempleInfo;
	}
	/**
	* 神殿数据
	*/
	class PBWorldDataTemple {
		constructor();
		/** 神殿数据信息*/
		public info:Pb_God.PBWorldTempleInfo[];
		public static encode(message: Pb_God.PBWorldDataTemple, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldDataTemple, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldDataTemple;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldDataTemple;
	}
	/**
	*伙伴最大评分
	*/
	class PBPetScoreInfo {
		constructor();
		/**伙伴ID*/
		public petid:number;
		/**总计评分*/
		public totalscore:number;
		/**等级评分*/
		public levelscore:number;
		/**装备评分*/
		public equipscore:number;
		/**星级评分*/
		public starscore:number;
		/**进阶评分*/
		public advancescore:number;
		/**神器评分*/
		public artifactscore:number;
		/**公会技能评分*/
		public factionskillscore:number;
		/**符文评分*/
		public runescore:number;
		public static encode(message: Pb_God.PBPetScoreInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPetScoreInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPetScoreInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPetScoreInfo;
	}
	/**
	* 世界服获得道具记录
	*/
	class PBWorldItemLogData {
		constructor();
		/** 玩家ID*/
		public playerid:number;
		/** 玩家名字*/
		public playername:string;
		/** 物品 key 物品ID value 物品数量*/
		public item:Pb_God.PBU32U32[];
		/** 取得时间*/
		public gettime:number;
		public static encode(message: Pb_God.PBWorldItemLogData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldItemLogData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldItemLogData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldItemLogData;
	}
	/**
	* 物品记录
	*/
	class PBWorldItemLogs {
		constructor();
		/** 记录类型*/
		public type:number;
		/** 物品记录*/
		public items:Pb_God.PBWorldItemLogData[];
		public static encode(message: Pb_God.PBWorldItemLogs, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldItemLogs, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldItemLogs;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldItemLogs;
	}
	/**
	*竞技场数据
	*/
	class PBWorldChallengeData {
		constructor();
		/**每日领取时间(包含七日)*/
		public dayprizetime:number;
		/**赛季清除*/
		public seasoncleartime:number;
		public static encode(message: Pb_God.PBWorldChallengeData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldChallengeData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldChallengeData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldChallengeData;
	}
	/**
	* 世界基础数据
	*/
	class PBWorldDataBase {
		constructor();
		/**开服时间*/
		public starttime:number;
		/**伙伴评分*/
		public petscore:Pb_God.PBPetScoreInfo[];
		/**物品记录*/
		public itemlogs:Pb_God.PBWorldItemLogs[];
		/**日清理时间*/
		public cleardaytime:number;
		/**挑战数据*/
		public challengeData:Pb_God.PBWorldChallengeData;
		/**合服的服务器id列表 逗号分隔*/
		public mergeserverlist:string;
		/**合服时间*/
		public mergetime:number;
		public static encode(message: Pb_God.PBWorldDataBase, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldDataBase, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldDataBase;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldDataBase;
	}
	/**
	* 神殿基础数据
	*/
	class PBWorldDataTopList {
		constructor();
		/**排行榜清除时间 类型_时间*/
		public cleartime:Pb_God.PBU32U32[];
		/**重置次数 类型_次数*/
		public resetcount:Pb_God.PBU32U32[];
		/**储存是否开启类型 _emSystemSwitchType*/
		public systemflag:number[];
		public static encode(message: Pb_God.PBWorldDataTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldDataTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldDataTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldDataTopList;
	}
	/**
	*活动数据项
	*/
	class PBWorldActivityDataEntry {
		constructor();
		/** 索引*/
		public index:number;
		/** 活动数据*/
		public data:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBWorldActivityDataEntry, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldActivityDataEntry, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldActivityDataEntry;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldActivityDataEntry;
	}
	/**
	*活动数据
	*/
	class PBWorldActivityData {
		constructor();
		/** 活动ID*/
		public id:number;
		/** 开始时间*/
		public starttime:number;
		/** 上次重置的时间*/
		public resettime:number;
		/** 活动数据*/
		public entry:Pb_God.PBWorldActivityDataEntry[];
		/**红包活动领取数据*/
		public redEnvelopeInfo:Pb_God.PBRedEnvelopeReceiveList[];
		public static encode(message: Pb_God.PBWorldActivityData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldActivityData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldActivityData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldActivityData;
	}
	/**
	*活动数据
	*/
	class PBWorldActivity {
		constructor();
		/** 活动数据*/
		public activitydata:Pb_God.PBWorldActivityData[];
		public static encode(message: Pb_God.PBWorldActivity, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldActivity, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldActivity;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldActivity;
	}
	/**
	* 世界服的数据
	*/
	class PBWorldServerData {
		constructor();
		/**基础数据*/
		public base:Pb_God.PBWorldDataBase;
		/**神殿数据*/
		public temple:Pb_God.PBWorldDataTemple;
		/**排行榜数据*/
		public toplist:Pb_God.PBWorldDataTopList;
		/**活动数据*/
		public activity:Pb_God.PBWorldActivity;
		public static encode(message: Pb_God.PBWorldServerData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWorldServerData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWorldServerData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWorldServerData;
	}
	/**
	* 神器显示数据
	*/
	class PBGlobalCommonDisplay {
		constructor();
		/**离线时间*/
		public offlinetime:number;
		/**超凡段位*/
		public danid:number;
		/**战斗力*/
		public fightpower:number;
		/**徽章展示*/
		public badgedisplay:Pb_God.PBPlayerBadge[];
		public static encode(message: Pb_God.PBGlobalCommonDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGlobalCommonDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGlobalCommonDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGlobalCommonDisplay;
	}
	/**
	* 神器显示数据
	*/
	class PBGlobalArtifactDisplay {
		constructor();
		/**神器ID*/
		public id:number;
		/**幻化ID*/
		public shapeid:number;
		/**精炼等级*/
		public refinelevel:number;
		/**技能数据*/
		public skill:Pb_God.PBSkillInfo[];
		/**属性*/
		public attr:Pb_God.PBAttrBaseInfo[];
		public static encode(message: Pb_God.PBGlobalArtifactDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGlobalArtifactDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGlobalArtifactDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGlobalArtifactDisplay;
	}
	/**
	* 荣誉显示数据
	*/
	class PBGlobalHonorDisplay {
		constructor();
		/**荣誉点数*/
		public honorpoint:number;
		/**徽章*/
		public badge:Pb_God.PBPlayerBadge[];
		public static encode(message: Pb_God.PBGlobalHonorDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGlobalHonorDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGlobalHonorDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGlobalHonorDisplay;
	}
	/**
	* 战斗阵容显示数据
	*/
	class PBGlobalBattleDisplay {
		constructor();
		/**阵法ID*/
		public zhenfaid:number;
		/**战斗伙伴信息*/
		public battlepet:Pb_God.PBBattlePetInfo[];
		public static encode(message: Pb_God.PBGlobalBattleDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGlobalBattleDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGlobalBattleDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGlobalBattleDisplay;
	}
	/**
	* 帮派显示数据
	*/
	class PBGlobalFactionDisplay {
		constructor();
		/**帮派ID*/
		public factionid:number;
		/**帮派名称*/
		public factionname:string;
		/**帮派技能*/
		public skill:Pb_God.PBPlayerFactionSkill[];
		public static encode(message: Pb_God.PBGlobalFactionDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGlobalFactionDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGlobalFactionDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGlobalFactionDisplay;
	}
	/**
	* 圣物显示数据
	*/
	class PBGlobalHolyDisplay {
		constructor();
		/**圣物显示数据*/
		public holy:Pb_God.PBPlayerHolyInfo[];
		public static encode(message: Pb_God.PBGlobalHolyDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGlobalHolyDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGlobalHolyDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGlobalHolyDisplay;
	}
	/**
	* 帮派副本数据
	*/
	class PBGlobalCopymapDisplay {
		constructor();
		/**帮派副本奖励*/
		public copymapAward:number[];
		public static encode(message: Pb_God.PBGlobalCopymapDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGlobalCopymapDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGlobalCopymapDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGlobalCopymapDisplay;
	}
	/**
	* 个人空间数据
	*/
	class PBGlobalPrivateSpace {
		constructor();
		/**背景*/
		public background:number;
		/**粉丝数量*/
		public fansnum:number;
		/**展示的英雄*/
		public showpets:Pb_God.PBBattlePetInfo[];
		/**是否需要验证*/
		public fightconfirm:boolean;
		public static encode(message: Pb_God.PBGlobalPrivateSpace, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGlobalPrivateSpace, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGlobalPrivateSpace;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGlobalPrivateSpace;
	}
	/**
	* 用户全局功能基础数据
	*/
	class PBPlayerGlobalBase {
		constructor();
		/**通用*/
		public commondisplay:Pb_God.PBGlobalCommonDisplay;
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**荣誉显示数据*/
		public honordisplay:Pb_God.PBGlobalHonorDisplay;
		/**战斗阵容显示数据*/
		public battledisplay:Pb_God.PBGlobalBattleDisplay;
		/**神器数据*/
		public artifactdisplay:Pb_God.PBGlobalArtifactDisplay;
		/**帮派显示数据*/
		public factiondisplay:Pb_God.PBGlobalFactionDisplay;
		/**圣物显示数据*/
		public holydisplay:Pb_God.PBGlobalHolyDisplay;
		/**帮派副本奖励*/
		public copymapDisplay:Pb_God.PBGlobalCopymapDisplay;
		/**个人空间*/
		public privatespace:Pb_God.PBGlobalPrivateSpace;
		/**守护信息*/
		public defenddisplay:Pb_God.PBGlobalDefendDisplay;
		/**公会pvp技能信息*/
		public pvpskill:Pb_God.PBBattleFactionPVPSkill;
		public static encode(message: Pb_God.PBPlayerGlobalBase, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerGlobalBase, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerGlobalBase;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerGlobalBase;
	}
	/**
	* 排行榜数据
	*/
	class PBTopListInfo {
		constructor();
		/**排行类型 _emTopListType*/
		public type:number;
		/**名次*/
		public rank:number;
		/**排行值*/
		public value:Long;
		/**排行子值*/
		public subvalue:Long;
		/**时间*/
		public time:number;
		/**上次名次*/
		public lastrank:number;
		/**公会名*/
		public factionname:string;
		public static encode(message: Pb_God.PBTopListInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTopListInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTopListInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTopListInfo;
	}
	/**
	* 排行系统
	*/
	class PBPlayerGlobalTopList {
		constructor();
		/**排行系统*/
		public toplist:Pb_God.PBTopListInfo[];
		public static encode(message: Pb_God.PBPlayerGlobalTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerGlobalTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerGlobalTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerGlobalTopList;
	}
	/**
	* 竞技场数据
	*/
	class PBChallengeData {
		constructor();
		/** 当前排行*/
		public order:number;
		/** 当前积分*/
		public score:number;
		/** 防守阵容*/
		public defense:Pb_God.PBBattlePet;
		/** 点赞次数*/
		public like:number;
		/** 加积分时间*/
		public scoretime:number;
		public static encode(message: Pb_God.PBChallengeData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChallengeData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChallengeData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChallengeData;
	}
	/**
	*周冠军赛竞猜记录
	*/
	class PBWeekChampionBetRecord {
		constructor();
		/**轮次*/
		public round:number;
		/**左边选手*/
		public left:Pb_God.PBPlayerDisplay;
		/**右边选手*/
		public right:Pb_God.PBPlayerDisplay;
		/**下注哪边*/
		public betside:number;
		/**胜利方*/
		public winner:number;
		/**下注的竞猜币/得到的竞猜币*/
		public coin:number;
		/**战斗sn*/
		public battlesn:Long;
		public static encode(message: Pb_God.PBWeekChampionBetRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWeekChampionBetRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWeekChampionBetRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWeekChampionBetRecord;
	}
	/**
	*周冠军赛数据
	*/
	class PBWeekChampion {
		constructor();
		/** 高级竞猜币*/
		public coin:number;
		/** 竞猜记录*/
		public guessrecord:Pb_God.PBWeekChampionBetRecord[];
		/** 最高排名*/
		public maxorder:number;
		public static encode(message: Pb_God.PBWeekChampion, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBWeekChampion, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBWeekChampion;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBWeekChampion;
	}
	/**
	* 用户全局功能数据(保存数据库 用)
	*/
	class PBPlayerGlobalData {
		constructor();
		/**保存序列号*/
		public saveorder:number;
		/**基础数据*/
		public baseinfo:Pb_God.PBPlayerGlobalBase;
		/**排行系统*/
		public toplist:Pb_God.PBPlayerGlobalTopList;
		/**竞技场*/
		public challenge:Pb_God.PBChallengeData;
		/**冠军赛*/
		public champion:Pb_God.PBChampionData;
		/**家圆系统*/
		public room:Pb_God.PBRoomData;
		/**周冠军赛*/
		public weekchampion:Pb_God.PBWeekChampion;
		public static encode(message: Pb_God.PBPlayerGlobalData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerGlobalData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerGlobalData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerGlobalData;
	}
	/**
	* 帮派基础 客户端用
	*/
	class PBFactionBase {
		constructor();
		/**帮派名*/
		public name:string;
		/**帮派ID*/
		public factionid:number;
		/**帮主ID*/
		public leader:number;
		/**世界ID*/
		public worldid:number;
		/**帮派等级*/
		public level:number;
		/**帮派经验*/
		public exp:number;
		/**宣言*/
		public declaration:string;
		/**是否验证 0不验证*/
		public isauto:number;
		/**加入需要的玩家等级*/
		public joinneedlevel:number;
		public static encode(message: Pb_God.PBFactionBase, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionBase, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionBase;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionBase;
	}
	/**
	* 帮派信息展示
	*/
	class PBFactionDisplay {
		constructor();
		/**帮派数据*/
		public base:Pb_God.PBFactionBase;
		/**帮主信息*/
		public leaderdisplay:Pb_God.PBPlayerDisplay;
		/**现帮会人数*/
		public people:number;
		/**现帮会最大人数*/
		public peoplemax:number;
		/**帮主是否在线*/
		public isleaderonline:boolean;
		/**需要玩家等级*/
		public needplayerlevel:number;
		/**总战力*/
		public totalfightpower:Long;
		public static encode(message: Pb_God.PBFactionDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionDisplay;
	}
	/**
	* 排行信息
	*/
	class PBFactionTop {
		constructor();
		/**显示*/
		public display:Pb_God.PBFactionDisplay;
		/**排名*/
		public rank:number;
		public static encode(message: Pb_God.PBFactionTop, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFactionTop, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFactionTop;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFactionTop;
	}
	/**
	* 玩家个人空间展示
	*/
	class PBPrivateSpaceDisplay {
		constructor();
		/***/
		public background:number;
		/***/
		public fansnum:number;
		/***/
		public showpets:Pb_God.PBPetDisplay[];
		public static encode(message: Pb_God.PBPrivateSpaceDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPrivateSpaceDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPrivateSpaceDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPrivateSpaceDisplay;
	}
	/**
	* 查询玩家返回
	*/
	class PBG2CQueryPlayerViewAck {
		constructor();
		/** 查询类型 _emQueryPlayerViewType*/
		public viewtype:number;
		/** 主界面*/
		public main:Pb_God.PBPlayerView;
		/** 荣誉*/
		public honor:Pb_God.PBGlobalHonorDisplay;
		/** 个人空间*/
		public privatespace:Pb_God.PBPrivateSpaceDisplay;
		public static encode(message: Pb_God.PBG2CQueryPlayerViewAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CQueryPlayerViewAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CQueryPlayerViewAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CQueryPlayerViewAck;
	}
	/**
	*家具数据
	*/
	class PBFurniture {
		constructor();
		/**类型*/
		public type:number;
		/**家具id，唯一id*/
		public id:number;
		/**状态，使用状态和非使用状态 参考 _emAccountMark*/
		public state:number;
		/**位置*/
		public position:number;
		/**第几层*/
		public floorNum:number;
		public static encode(message: Pb_God.PBFurniture, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFurniture, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFurniture;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFurniture;
	}
	/**
	* world家园数据
	*/
	class PBRoomData {
		constructor();
		/** 家具*/
		public furniture:Pb_God.PBFurniture[];
		/**拜访*/
		public callOn:number[];
		/**拜访的人*/
		public callOnPlayer:number[];
		public static encode(message: Pb_God.PBRoomData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRoomData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRoomData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRoomData;
	}
	/**
	*宠物物品
	*/
	class PBPetItem {
		constructor();
		/**类型*/
		public type:number;
		/**数量*/
		public num:number;
		public static encode(message: Pb_God.PBPetItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPetItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPetItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPetItem;
	}
	/**
	* gameServer家园数据
	*/
	class PBPlayerRoomData {
		constructor();
		/** 宠物*/
		public pet:Pb_God.PBPetItem[];
		public static encode(message: Pb_God.PBPlayerRoomData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerRoomData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerRoomData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerRoomData;
	}
	/**
	*孵化数据
	*/
	class PBHatchElfData {
		constructor();
		/**孵化id*/
		public hatchElfID:number;
		/**孵化总点数*/
		public hatchElfTatol:number;
		/**孵化速度--没秒减少多少*/
		public hatchElfSpeed:number;
		public static encode(message: Pb_God.PBHatchElfData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHatchElfData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHatchElfData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHatchElfData;
	}
	/**
	*精灵数据
	*/
	class PBElfData {
		constructor();
		/**孵化数据*/
		public hatchElfData:Pb_God.PBHatchElfData;
		public static encode(message: Pb_God.PBElfData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBElfData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBElfData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBElfData;
	}
	/**
	*位置数据
	*/
	class PBPositionElfData {
		constructor();
		/**id*/
		public uElfID:number;
		/**是否解锁0：没有解锁，1：解锁*/
		public isUnLock:number;
		public static encode(message: Pb_God.PBPositionElfData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPositionElfData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPositionElfData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPositionElfData;
	}
	/**
	* 图鉴数据
	*/
	class PBPlayerIllustration {
		constructor();
		/**图鉴精灵数据*/
		public data:Pb_God.PBPlayerPetInfo[];
		/**历史最高战力*/
		public historyPower:number;
		public static encode(message: Pb_God.PBPlayerIllustration, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerIllustration, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerIllustration;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerIllustration;
	}
	/**
	*角色身上红包数据
	*/
	class PBPlayerRedEnvelope {
		constructor();
		/**红包数据*/
		public data:Pb_God.PBRedEnvelopeInfo[];
		public static encode(message: Pb_God.PBPlayerRedEnvelope, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerRedEnvelope, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerRedEnvelope;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerRedEnvelope;
	}
	/**
	*单个红包数据
	*/
	class PBRedEnvelopeInfo {
		constructor();
		/**红包索引*/
		public index:number;
		/**红包领取时间*/
		public receiveTime:number;
		/**红包领取状态 0可领取 1未开启 2已领取*/
		public status:number;
		/**红包领取物品*/
		public award:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBRedEnvelopeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRedEnvelopeInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRedEnvelopeInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRedEnvelopeInfo;
	}
	/**
	*服务器红包领取列表
	*/
	class PBRedEnvelopeReceiveList {
		constructor();
		/**红包索引*/
		public index:number;
		/***/
		public data:Pb_God.PBRedEnvelopeData[];
		public static encode(message: Pb_God.PBRedEnvelopeReceiveList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRedEnvelopeReceiveList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRedEnvelopeReceiveList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRedEnvelopeReceiveList;
	}
	/**
	*领取红包奖励数据
	*/
	class PBRedEnvelopeData {
		constructor();
		/**红包索引*/
		public index:number;
		/**头像ID*/
		public headid:number;
		/**红包领取时间*/
		public receiveTime:number;
		/**玩家名字*/
		public name:string;
		/**红包领取物品*/
		public award:Pb_God.PBItemInfo[];
		/**玩家等级*/
		public level:number;
		public static encode(message: Pb_God.PBRedEnvelopeData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRedEnvelopeData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRedEnvelopeData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRedEnvelopeData;
	}
	/**
	*连连看
	*/
	class PBPlayerJoyousLinkup {
		constructor();
		/**关卡*/
		public layerId:number;
		/**最高积分*/
		public maxScore:number;
		public static encode(message: Pb_God.PBPlayerJoyousLinkup, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerJoyousLinkup, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerJoyousLinkup;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerJoyousLinkup;
	}
	/**
	*角色身上猜猜猜数据
	*/
	class PBPlayerGuess {
		constructor();
		/**最高得分*/
		public totalScore:number;
		/**当前排名*/
		public curRank:number;
		public static encode(message: Pb_God.PBPlayerGuess, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerGuess, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerGuess;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerGuess;
	}
	/**
	*活动boss数据
	*/
	class PBActivityBossData {
		constructor();
		/**最后伤害*/
		public lastdamage:Long;
		/**总伤害*/
		public totaldamage:Long;
		/**已购买次数*/
		public buycount:number;
		/**已挑战次数*/
		public challengecount:number;
		/**boss index*/
		public index:number;
		public static encode(message: Pb_God.PBActivityBossData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBActivityBossData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBActivityBossData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBActivityBossData;
	}
	/**
	*槽位数据
	*/
	class PBDefendPetSlot {
		constructor();
		/**槽位索引*/
		public index:number;
		/**英雄id*/
		public petSnID:Long;
		public static encode(message: Pb_God.PBDefendPetSlot, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDefendPetSlot, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDefendPetSlot;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDefendPetSlot;
	}
	/**
	*方案数据
	*/
	class PBDefendPlan {
		constructor();
		/**方案索引*/
		public index:number;
		/**英雄列表*/
		public pets:Pb_God.PBDefendPetSlot[];
		/**技能顺序列表*/
		public skills:Pb_God.PBDefendPetSlot[];
		public static encode(message: Pb_God.PBDefendPlan, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDefendPlan, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDefendPlan;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDefendPlan;
	}
	/**
	*守护数据
	*/
	class PBPlayerDefend {
		constructor();
		/**等级*/
		public level:number;
		/**阶级*/
		public rank:number;
		/**当前方案索引*/
		public planIndex:number;
		/**方案列表*/
		public plans:Pb_God.PBDefendPlan[];
		public static encode(message: Pb_God.PBPlayerDefend, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerDefend, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerDefend;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerDefend;
	}
	/**
	*守护技能数据
	*/
	class PBDefendSkill {
		constructor();
		/**索引*/
		public index:number;
		/**技能*/
		public skill:Pb_God.PBSkillInfo;
		/**英雄id*/
		public petID:number;
		public static encode(message: Pb_God.PBDefendSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDefendSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDefendSkill;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDefendSkill;
	}
	/**
	*战斗显示信息
	*/
	class PBGlobalDefendDisplay {
		constructor();
		/**等级*/
		public level:number;
		/**阶级*/
		public rank:number;
		/**技能顺序*/
		public skills:Pb_God.PBDefendSkill[];
		/**战斗属性*/
		public attr:Pb_God.PBAttrInfo[];
		/**对象ID*/
		public unitid:number;
		public static encode(message: Pb_God.PBGlobalDefendDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGlobalDefendDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGlobalDefendDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGlobalDefendDisplay;
	}
	/**
	*共鸣格子数据
	*/
	class PBPlayerResonanceGrid {
		constructor();
		/**格子索引*/
		public grididx:number;
		/**宠物snid*/
		public petsn:Long;
		/**旧的数据值*/
		public value:number;
		/**冷却时间*/
		public cdtime:number;
		public static encode(message: Pb_God.PBPlayerResonanceGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerResonanceGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerResonanceGrid;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerResonanceGrid;
	}
	/**
	*共鸣列表数据
	*/
	class PBPlayerResonanceInfo {
		constructor();
		/**类型*/
		public type:number;
		/**格子数据*/
		public grid:Pb_God.PBPlayerResonanceGrid[];
		/**已开启最大格子数*/
		public maxgrididx:number;
		/**共鸣主体*/
		public petlist:Long[];
		public static encode(message: Pb_God.PBPlayerResonanceInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerResonanceInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerResonanceInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerResonanceInfo;
	}
	/**
	*共鸣系统数据
	*/
	class PBPlayerResonance {
		constructor();
		/**共鸣数据*/
		public resonanceinfo:Pb_God.PBPlayerResonanceInfo[];
		public static encode(message: Pb_God.PBPlayerResonance, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerResonance, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerResonance;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerResonance;
	}
	/**
	*角色地址信息
	*/
	class PBAddrInfo {
		constructor();
		/**地址序号*/
		public id:number;
		/**收件人*/
		public name:string;
		/**联系方式*/
		public number:string;
		/**地址信息*/
		public addr:string;
		public static encode(message: Pb_God.PBAddrInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBAddrInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBAddrInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBAddrInfo;
	}
	/**
	*角色订单信息
	*/
	class PBOrderInfo {
		constructor();
		/**游戏订单流水*/
		public ordersn:string;
		/**订单类型 _emOrderType*/
		public type:number;
		/**0未确认地址，1已确认地址*/
		public status:number;
		/**确认时间*/
		public completedtime:number;
		/**游戏订单时间*/
		public ordertime:number;
		/**商品id*/
		public chargeid:number;
		/**商品名字*/
		public chargename:string;
		/**商品金额*/
		public chargeamount:number;
		/**地址信息 PBAddrInfo*/
		public addrinfo:Pb_God.PBAddrInfo;
		public static encode(message: Pb_God.PBOrderInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBOrderInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBOrderInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBOrderInfo;
	}
	/**
	*角色订单管理数据
	*/
	class PBPlayerOrderData {
		constructor();
		/**地址信息*/
		public addrinfo:Pb_God.PBAddrInfo[];
		/**订单信息*/
		public orderinfo:Pb_God.PBOrderInfo[];
		/**默认地址id*/
		public defaultid:number;
		public static encode(message: Pb_God.PBPlayerOrderData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerOrderData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerOrderData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerOrderData;
	}
	/**
	* 角色跨服简要信息（存redis）
	*/
	class PBRedisPlayerSimpleInfo {
		constructor();
		/** 角色ID*/
		public id:number;
		/** 用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/** 帮派名称*/
		public factionname:string;
		/** 战斗力*/
		public fightpower:number;
		/** 是否是机器人*/
		public robot:boolean;
		/** 账号id*/
		public accountid:number;
		public static encode(message: Pb_God.PBRedisPlayerSimpleInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRedisPlayerSimpleInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRedisPlayerSimpleInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRedisPlayerSimpleInfo;
	}
	/**
	* 战斗阵容（存redis）
	*/
	class PBRedisZhenfaInfo {
		constructor();
		/**阵容*/
		public team:Pb_God.PBBattlePet;
		/**是否隐藏队伍*/
		public hideteam:boolean;
		public static encode(message: Pb_God.PBRedisZhenfaInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRedisZhenfaInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRedisZhenfaInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRedisZhenfaInfo;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 冠军赛相关
	*/
	enum _emResultChampion_27 {
		//  成功;
		R_ResultChampion_Succeed = 0,
		//  失败;
		R_ResultChampion_Fail = 1,
		//  竞猜已经结束;
		R_ResultChampion_NeedGuessState = 2,
		//  已经竞猜;
		R_ResultChampion_HaveGuess = 3,
		//  竞猜币不足;
		R_ResultChampion_NeedGuessCoin = 4,
		//  您未能进入本次冠军赛;
		R_ResultChampion_NoJoin = 5,
		//  道具不足;
		R_ResultChampion_NeedItem = 6,
		//  未开始;
		R_ResultChampion_NoStart = 7,
		//  无此战斗;
		R_ResultChampion_NoFight = 8,
		//  已点赞;
		R_ResultChampion_Like = 9,
	}
	/**
	*----客户端到服务器
	*/
	enum _emC2S_Champion_Protocol {
		//我的竞猜 	无内容;
		C2S_Champion_SelfGuessAsk = 1,
		//查询竞猜		无内容;
		C2S_Champion_QueryGuessAsk = 2,
		//竞猜下注		PBC2GChampionGuessAsk;
		C2S_Champion_GuessAsk = 3,
		//查询32强		PBU32;
		C2S_Champion_Query32List = 4,
		//查询4强	;
		C2S_Champion_Query4List = 5,
		//我的竞猜记录		;
		C2S_Champion_GuessRecordAsk = 6,
		//我的战斗记录	;
		C2S_Champion_FightRecordAsk = 7,
		//发送弹幕		PBC2GChampionSendDanmuAsk;
		C2S_Champion_SendDanmuAsk = 8,
		//请求查询弹幕 PBC2GChampionQueryDanmu	;
		C2S_Champion_QueryDanmuAsk = 9,
		//查询下注信息	;
		C2S_Champion_QueryOddsAsk = 10,
		//打开	;
		C2S_Champion_OpenAsk = 11,
		//查看对战信息	PBC2GChampionQueryBattleInfo	;
		C2S_Champion_QueryBattleInfo = 12,
		//查询对应回合数据		PBC2GChampionQueryRound;
		C2S_Champion_QueryRound = 13,
		//点赞		PBC2GChampionLike;
		C2S_Champion_Like = 14,
		//gm开启活动		PBC2GChampionGM;
		C2S_Champion_GmOpt = 30,
		//战斗结果返回		;
		C2S_Champion_FightResult = 31,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_Champion_Protocol {
		//失败才返回;
		S2C_Champion_Common_Ack = 0,
		//我的竞猜返回		PBG2CChampionSelfGuessAck;
		S2C_Champion_SelfGuessAck = 1,
		//查询竞猜返回		PBG2CChampionQueryGuessAck;
		S2C_Champion_QueryGuessAck = 2,
		//竞猜下注同步返回	PBG2CChampionSynGuessAck;
		S2C_Champion_SysGuessAck = 3,
		//查询32强返回		PBG2CChampionQuery32ListAck;
		S2C_Champion_Query32ListAck = 4,
		//查询4强返回		PBG2CChampionQuery4ListAck;
		S2C_Champion_Query4ListAck = 5,
		//我的竞猜记录		PBChampionGuessRecord;
		S2C_Champion_GuessRecordAck = 6,
		//我的战斗记录		PBChampionFightRecord;
		S2C_Champion_FightRecordAck = 7,
		//发送弹幕返回		无内容;
		S2C_Champion_SendDanmuAck = 8,
		//竞猜结果			PBG2CChampionGuessResultAck;
		S2C_Champion_GuessReusltAck = 9,
		//查询弹幕返回		PBG2CChampionQueryDanmuAck;
		S2C_Champion_QueryDanmuAck = 10,
		//打开返回			PBG2CChampionOpenAck;
		S2C_Champion_OpenAck = 11,
		//我的结算结果		PBG2CChampionEndResultAck;
		S2C_Champion_EndResultAck = 12,
		//查看对战信息		PBChampionBattle;
		S2C_Champion_QueryBattleInfo = 13,
		//同步状态			PBG2CChampionSynState;
		S2C_Champion_SynState = 14,
		//同步排行结果		PBG2CChampionSynTopResult;
		S2C_Champion_SynTopResult = 15,
		//查询对应回合数据	PBG2CChampionQueryRoundAck;
		S2C_Champion_QueryRoundAck = 16,
		//点赞返回			PBU32U32;
		S2C_Champion_Like = 17,
	}
	/**
	*冠军赛状态
	*/
	enum _emChampionState {
		//;
		_emChampionState_None = 0,
		//匹配;
		_emChampionState_Match = 1,
		//准备;
		_emChampionState_Ready = 2,
		//竞猜;
		_emChampionState_Guess = 3,
		//开始;
		_emChampionState_Fight = 4,
		//结束;
		_emChampionState_End = 5,
	}
	/**
	*冠军赛回合
	*/
	enum _emChampionRound {
		//;
		_emChampionRound_Normal0 = 0,
		//选拔赛回合1;
		_emChampionRound_Normal1 = 1,
		//选拔赛回合2;
		_emChampionRound_Normal2 = 2,
		//选拔赛回合3;
		_emChampionRound_Normal3 = 3,
		//选拔赛回合4;
		_emChampionRound_Normal4 = 4,
		//选拔赛回合5;
		_emChampionRound_Normal5 = 5,
		//选拔赛回合6;
		_emChampionRound_Normal6 = 6,
		//分区32强;
		_emChampionRound_Area4 = 7,
		//分区16赛;
		_emChampionRound_Area2 = 8,
		//分区8赛;
		_emChampionRound_Area1 = 9,
		//半4赛;
		_emChampionRound_Final2 = 10,
		//决赛2;
		_emChampionRound_Final1 = 11,
	}
	/**
	*点赞
	*/
	class PBC2GChampionLike {
		constructor();
		/**点赞player id*/
		public likeplayerid:number;
		public static encode(message: Pb_God.PBC2GChampionLike, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GChampionLike, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GChampionLike;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GChampionLike;
	}
	/**
	*同步排行结果
	*/
	class PBG2CChampionSynTopResult {
		constructor();
		/**开始时间*/
		public begintime:number;
		/**排名*/
		public display:Pb_God.PBPlayerDisplay[];
		public static encode(message: Pb_God.PBG2CChampionSynTopResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionSynTopResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionSynTopResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionSynTopResult;
	}
	/**
	*同步状态
	*/
	class PBG2CChampionSynState {
		constructor();
		/**开始时间*/
		public begintime:number;
		/**回合ID_emChampionRound*/
		public round:number;
		/**状态_emChampionState*/
		public state:number;
		/**状态结束的时间*/
		public endtime:number;
		public static encode(message: Pb_God.PBG2CChampionSynState, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionSynState, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionSynState;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionSynState;
	}
	/**
	*查看对战信息
	*/
	class PBC2GChampionQueryBattleInfo {
		constructor();
		/**回合ID*/
		public roundid:number;
		/**左边玩家ID*/
		public leftplayerid:number;
		/**右边玩家ID*/
		public rightplayerid:number;
		public static encode(message: Pb_God.PBC2GChampionQueryBattleInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GChampionQueryBattleInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GChampionQueryBattleInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GChampionQueryBattleInfo;
	}
	/**
	*查询第几回合
	*/
	class PBC2GChampionQueryRound {
		constructor();
		/**回合ID*/
		public roundid:number;
		/**分区id*/
		public areaid:number;
		public static encode(message: Pb_God.PBC2GChampionQueryRound, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GChampionQueryRound, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GChampionQueryRound;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GChampionQueryRound;
	}
	/**
	*gm
	*/
	class PBC2GChampionGM {
		constructor();
		/**操作类型*/
		public type:number;
		/**参数*/
		public value:number;
		public static encode(message: Pb_God.PBC2GChampionGM, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GChampionGM, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GChampionGM;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GChampionGM;
	}
	/**
	*我的结算结果
	*/
	class PBG2CChampionEndResultAck {
		constructor();
		/**名次*/
		public rank:number;
		/**比赛场次*/
		public fightcount:number;
		/**胜场输*/
		public wincount:number;
		public static encode(message: Pb_God.PBG2CChampionEndResultAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionEndResultAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionEndResultAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionEndResultAck;
	}
	/**
	*打开返回
	*/
	class PBG2CChampionOpenAck {
		constructor();
		/**开始时间*/
		public begintime:number;
		/**回合ID_emChampionRound*/
		public round:number;
		/**状态_emChampionState*/
		public state:number;
		/**状态结束时间*/
		public endtime:number;
		/**当前名次*/
		public currank:number;
		/**最高名次*/
		public maxrank:number;
		public static encode(message: Pb_God.PBG2CChampionOpenAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionOpenAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionOpenAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionOpenAck;
	}
	/**
	*请求查询弹幕
	*/
	class PBC2GChampionQueryDanmu {
		constructor();
		/**开始索引*/
		public startindex:number;
		/**数量*/
		public count:number;
		public static encode(message: Pb_God.PBC2GChampionQueryDanmu, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GChampionQueryDanmu, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GChampionQueryDanmu;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GChampionQueryDanmu;
	}
	/**
	*弹幕信息
	*/
	class PBChampionDanmu {
		constructor();
		/**id*/
		public index:number;
		/**玩家ID*/
		public playerid:number;
		/**消息*/
		public msg:string;
		public static encode(message: Pb_God.PBChampionDanmu, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionDanmu, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionDanmu;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionDanmu;
	}
	/**
	*发送弹幕
	*/
	class PBC2GChampionSendDanmuAsk {
		constructor();
		/**消息*/
		public msg:string;
		public static encode(message: Pb_God.PBC2GChampionSendDanmuAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GChampionSendDanmuAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GChampionSendDanmuAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GChampionSendDanmuAsk;
	}
	/**
	*请求查询弹幕返回
	*/
	class PBG2CChampionQueryDanmuAck {
		constructor();
		/**列表*/
		public danmu:Pb_God.PBChampionDanmu[];
		public static encode(message: Pb_God.PBG2CChampionQueryDanmuAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionQueryDanmuAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionQueryDanmuAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionQueryDanmuAck;
	}
	/**
	*对战数据列表
	*/
	class PBChampionFightUnitList {
		constructor();
		/**分区*/
		public fights:Pb_God.PBChampionFightUnit[];
		public static encode(message: Pb_God.PBChampionFightUnitList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionFightUnitList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionFightUnitList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionFightUnitList;
	}
	/**
	*分区列表
	*/
	class PBChampionFightList {
		constructor();
		/**所有玩家*/
		public allplayer:Pb_God.PBPlayerDisplay[];
		/**分区*/
		public fightsist:Pb_God.PBChampionFightUnitList[];
		public static encode(message: Pb_God.PBChampionFightList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionFightList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionFightList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionFightList;
	}
	/**
	*查询回合返回
	*/
	class PBG2CChampionQueryRoundAck {
		constructor();
		/**开始时间*/
		public begintime:number;
		/**回合ID_emChampionRound*/
		public round:number;
		/**状态_emChampionState*/
		public state:number;
		/**赛区ID*/
		public areaid:number;
		/**列表*/
		public list:Pb_God.PBChampionFightList;
		public static encode(message: Pb_God.PBG2CChampionQueryRoundAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionQueryRoundAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionQueryRoundAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionQueryRoundAck;
	}
	/**
	*查询32强返回
	*/
	class PBG2CChampionQuery32ListAck {
		constructor();
		/**开始时间*/
		public begintime:number;
		/**回合ID_emChampionRound*/
		public round:number;
		/**状态_emChampionState*/
		public state:number;
		/**赛区ID*/
		public areaid:number;
		/**列表*/
		public list:Pb_God.PBChampionFight32;
		public static encode(message: Pb_God.PBG2CChampionQuery32ListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionQuery32ListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionQuery32ListAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionQuery32ListAck;
	}
	/**
	*查询4强返回
	*/
	class PBG2CChampionQuery4ListAck {
		constructor();
		/**开始时间*/
		public begintime:number;
		/**回合ID_emChampionRound*/
		public round:number;
		/**状态_emChampionState*/
		public state:number;
		/**赛区ID*/
		public areaid:number;
		/**列表*/
		public list:Pb_God.PBChampionFight4;
		public static encode(message: Pb_God.PBG2CChampionQuery4ListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionQuery4ListAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionQuery4ListAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionQuery4ListAck;
	}
	/**
	*冠军赛战斗显示
	*/
	class PBChampionBattle {
		constructor();
		/**左边显示*/
		public leftbattle:Pb_God.PBBattleDisplay;
		/**右边显示*/
		public rightbattle:Pb_God.PBBattleDisplay;
		/**战斗SN*/
		public battlesn:Long;
		/**胜利玩家ID*/
		public winplayerid:number;
		/**回合ID*/
		public roundid:number;
		public static encode(message: Pb_God.PBChampionBattle, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionBattle, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionBattle;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionBattle;
	}
	/**
	*我的竞猜返回
	*/
	class PBG2CChampionSelfGuessAck {
		constructor();
		/**开始时间*/
		public begintime:number;
		/**回合ID_emChampionRound*/
		public round:number;
		/**状态_emChampionState*/
		public state:number;
		/**战斗显示*/
		public battle:Pb_God.PBChampionBattle;
		public static encode(message: Pb_God.PBG2CChampionSelfGuessAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionSelfGuessAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionSelfGuessAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionSelfGuessAck;
	}
	/**
	*查询竞猜返回
	*/
	class PBG2CChampionQueryGuessAck {
		constructor();
		/**开始时间*/
		public begintime:number;
		/**回合ID_emChampionRound*/
		public round:number;
		/**状态_emChampionState*/
		public state:number;
		/**战斗显示*/
		public battle:Pb_God.PBChampionBattle;
		/**竞猜币*/
		public guesscoin:number;
		/**左边赔率 扩大一百倍*/
		public leftodds:number;
		/**右边赔率 扩大一百倍*/
		public rightodds:number;
		public static encode(message: Pb_God.PBG2CChampionQueryGuessAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionQueryGuessAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionQueryGuessAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionQueryGuessAck;
	}
	/**
	*押注请求
	*/
	class PBC2GChampionGuessAsk {
		constructor();
		/**是否压住左边*/
		public isguessleft:boolean;
		/**压住竞猜币*/
		public guesscoin:number;
		public static encode(message: Pb_God.PBC2GChampionGuessAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GChampionGuessAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GChampionGuessAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GChampionGuessAsk;
	}
	/**
	*竞猜结果返回
	*/
	class PBG2CChampionGuessResultAck {
		constructor();
		/**是否成功*/
		public iswin:boolean;
		/**增加的竞猜币 负数表示扣除*/
		public addguesscoin:number;
		/**剩余的竞猜币*/
		public guesscoin:number;
		public static encode(message: Pb_God.PBG2CChampionGuessResultAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionGuessResultAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionGuessResultAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionGuessResultAck;
	}
	/**
	*赔率返回
	*/
	class PBG2CChampionSynGuessAck {
		constructor();
		/**左边赔率 扩大一百倍*/
		public leftodds:number;
		/**右边赔率 扩大一百倍*/
		public rightodds:number;
		/**下注的目标ID*/
		public guessplayerid:number;
		/**剩余的竞猜币*/
		public guesscoin:number;
		public static encode(message: Pb_God.PBG2CChampionSynGuessAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionSynGuessAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionSynGuessAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionSynGuessAck;
	}
	/**
	*竞技场对手信息
	*/
	class PBChampionObject {
		constructor();
		/** 机器人ID/玩家ID*/
		public id:number;
		/** 是否是机器人*/
		public param:number;
		/**显示*/
		public display:Pb_God.PBPlayerDisplay;
		/** 积分*/
		public score:number;
		/** 战斗力*/
		public fightpower:number;
		/** 防守信息*/
		public defense:Pb_God.PBBattlePet;
		public static encode(message: Pb_God.PBChampionObject, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionObject, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionObject;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionObject;
	}
	/**
	*对手信息返回
	*/
	class PBG2CChampionTopInfo {
		constructor();
		/**自己名次*/
		public order:number;
		/**积分*/
		public score:number;
		public static encode(message: Pb_God.PBG2CChampionTopInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionTopInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionTopInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionTopInfo;
	}
	/**
	*对手信息返回
	*/
	class PBG2CChampionTargetAck {
		constructor();
		/**自己名次*/
		public order:number;
		/**对手基本信息*/
		public target:Pb_God.PBChampionObject[];
		public static encode(message: Pb_God.PBG2CChampionTargetAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionTargetAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionTargetAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionTargetAck;
	}
	/**
	*查看排行榜
	*/
	class PBC2GChampionTopList {
		constructor();
		/**开始名次*/
		public begin:number;
		/**结束名次*/
		public end:number;
		public static encode(message: Pb_God.PBC2GChampionTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GChampionTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GChampionTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GChampionTopList;
	}
	/**
	*战斗结果
	*/
	class PBG2WChampionFightResult {
		constructor();
		/**挑战ID*/
		public id:Long;
		/**战斗结果 _emBattleResult*/
		public result:number;
		/**奖励信息*/
		public iteminfo:Pb_God.PBItem[];
		public static encode(message: Pb_God.PBG2WChampionFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2WChampionFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2WChampionFightResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2WChampionFightResult;
	}
	/**
	*真正开始
	*/
	class PBW2GChampionRealBegin {
		constructor();
		/**目标ID*/
		public id:Long;
		public static encode(message: Pb_God.PBW2GChampionRealBegin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2GChampionRealBegin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2GChampionRealBegin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2GChampionRealBegin;
	}
	/**
	*战斗结果
	*/
	class PBChampionResultInfo {
		constructor();
		/**显示*/
		public display:Pb_God.PBPlayerDisplay;
		/**最新积分*/
		public score:number;
		/**改变积分*/
		public addscore:number;
		public static encode(message: Pb_God.PBChampionResultInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionResultInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionResultInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionResultInfo;
	}
	/**
	*战斗结果
	*/
	class PBG2CChampionResult {
		constructor();
		/**挑战sn*/
		public battlesn:Long;
		/**挑战类型*/
		public battletype:number;
		/**挑战ID*/
		public id:number;
		/**参数*/
		public param:number;
		/**战斗结果 _emBattleResult*/
		public result:number;
		/**奖励信息*/
		public iteminfo:Pb_God.PBItemInfo[];
		/**友方*/
		public friend:Pb_God.PBChampionResultInfo;
		/**敌方*/
		public enermy:Pb_God.PBChampionResultInfo;
		public static encode(message: Pb_God.PBG2CChampionResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChampionResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChampionResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChampionResult;
	}
	/**
	*战斗单元
	*/
	class PBChampionFightUnit {
		constructor();
		/**左边显示*/
		public leftplayerid:number;
		/**右边显示*/
		public rightplayerid:number;
		/**胜利玩家*/
		public winplayerid:number;
		/**战斗SN*/
		public battlesn:Long;
		public static encode(message: Pb_God.PBChampionFightUnit, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionFightUnit, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionFightUnit;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionFightUnit;
	}
	/**
	*分区八强
	*/
	class PBChampionFight32 {
		constructor();
		/**所有玩家*/
		public allplayer:Pb_God.PBPlayerDisplay[];
		/**分区4强*/
		public fight4:Pb_God.PBChampionFightUnit[];
		/**分区半决赛*/
		public fight2:Pb_God.PBChampionFightUnit[];
		/**分区冠军*/
		public fight1:Pb_God.PBChampionFightUnit[];
		public static encode(message: Pb_God.PBChampionFight32, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionFight32, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionFight32;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionFight32;
	}
	/**
	*4强
	*/
	class PBChampionFight4 {
		constructor();
		/**所有玩家*/
		public allplayer:Pb_God.PBPlayerDisplay[];
		/**半决赛*/
		public fight2:Pb_God.PBChampionFightUnit[];
		/**分区冠军*/
		public fight1:Pb_God.PBChampionFightUnit[];
		public static encode(message: Pb_God.PBChampionFight4, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionFight4, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionFight4;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionFight4;
	}
	/**
	*冠军赛保存数据
	*/
	class PBChampionSaveData {
		constructor();
		/**分区32强*/
		public area32:Pb_God.PBChampionFight32[];
		/**总四强*/
		public total4:Pb_God.PBChampionFight4[];
		public static encode(message: Pb_God.PBChampionSaveData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionSaveData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionSaveData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionSaveData;
	}
	/**
	*冠军赛个人数据
	*/
	class PBRChampionPlayer {
		constructor();
		/**玩家id*/
		public id:number;
		/**积分*/
		public score:number;
		/**排名*/
		public order:number;
		/**点赞*/
		public like:number;
		/**历史最高名次*/
		public maxrank:number;
		/**竞猜币*/
		public guesscoin:number;
		/**是否通知结果*/
		public issynresult:boolean;
		public static encode(message: Pb_God.PBRChampionPlayer, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRChampionPlayer, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRChampionPlayer;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRChampionPlayer;
	}
	/**
	*每场战斗简要数据
	*/
	class PBRChampionRoundFight {
		constructor();
		/**战斗回放sn*/
		public sn:Long;
		/**左边玩家id*/
		public leftid:Long;
		/**右边玩家id*/
		public rightid:Long;
		/**胜利玩家id*/
		public winnerid:Long;
		public static encode(message: Pb_God.PBRChampionRoundFight, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRChampionRoundFight, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRChampionRoundFight;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRChampionRoundFight;
	}
	/**
	*每轮战斗简要数据
	*/
	class PBRChampionRound {
		constructor();
		/***/
		public roundid:number;
		/**战斗*/
		public roundfight:Pb_God.PBRChampionRoundFight[];
		public static encode(message: Pb_God.PBRChampionRound, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRChampionRound, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRChampionRound;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRChampionRound;
	}
	/**
	*战斗结果
	*/
	class PBChampionFightResult {
		constructor();
		/**战斗SN*/
		public battlesn:Long;
		/**胜利玩家id*/
		public winnerid:number;
		public static encode(message: Pb_God.PBChampionFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionFightResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionFightResult;
	}
}
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

declare namespace Pb_God {
	/**
	*资源副本ID
	*/
	enum EnmResourceID {
		// 快速作战 ...;
		ENM_FAST_BATTLE = 1,
		// 大师对战塔;
		ENM_MASTER_AGAINST_TOWER = 2,
		// 对战塔;
		ENM_AGAINST_TOWER = 3,
		// 金币副本;
		ENM_GOLD_MAP = 4,
		// 经验副本;
		ENM_EXP_MAP = 5,
		// 精灵副本;
		ENM_SPIRIT_MAP = 6,
		// 图腾副本;
		ENM_TOTEM_MAP = 7,
		// 宝石副本;
		ENM_GEM_MAP = 8,
	}
	/**
	*资源领取状态
	*/
	enum EnmSubDiamondType {
		// 不可领;
		ENM_STATUS_CAN_NOT_DRAW = 0,
		// 可领取状态;
		ENM_STATUS_CAN_DRAW = 1,
		// 已领取免费档;
		ENM_STATUS_DRAW_FREE = 2,
		// 已领取付费档;
		ENM_STATUS_DRAW_PAY = 3,
		// 按天计算;
		ENM_SUB_DIAMOND_DAY = 0,
		// 按次数计算;
		ENM_SUB_DIAMOND_COUNT = 1,
	}
	/**
	*领取资源方式
	*/
	enum EnmDrawMode {
		//  免费领取;
		ENM_FREE_DRAW = 1,
		// 付费领取;
		ENM_PAY_DRAW = 2,
	}
	/**
	*获取玩家离线找回数据REQ
	*/
	class PBC2GResourceFindBackInfo {
		constructor();
		public static encode(message: Pb_God.PBC2GResourceFindBackInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GResourceFindBackInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GResourceFindBackInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GResourceFindBackInfo;
	}
	/**
	*RES
	*/
	class PBG2CResourceFindBackInfo {
		constructor();
		/**玩家离线天数*/
		public OfflineDay:number;
		/**玩家找回天数 */
		public FindBackDay:number;
		/**离线找回数据*/
		public FindBacks:Pb_God.PBFindBackData[];
		public static encode(message: Pb_God.PBG2CResourceFindBackInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CResourceFindBackInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CResourceFindBackInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CResourceFindBackInfo;
	}
	/**
	*领取资源找回收益 REQ
	*/
	class PBC2GDrawFindBack {
		constructor();
		/**see @EnmDrawMode*/
		public DrawMode:number;
		/**默认 0 表示一键领取 see@EnmResourceID*/
		public ResourceID:number;
		public static encode(message: Pb_God.PBC2GDrawFindBack, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GDrawFindBack, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GDrawFindBack;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GDrawFindBack;
	}
	/**
	*RES
	*/
	class PBG2CDrawFindBack {
		constructor();
		public static encode(message: Pb_God.PBG2CDrawFindBack, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDrawFindBack, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDrawFindBack;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDrawFindBack;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 外形系统返回
	*/
	enum _emResultTemple_21 {
		// 成功;
		R_ResultTemple_Succeed = 0,
		// 失败;
		R_ResultTemple_Fail = 1,
		// 挑战时间未到;
		R_ResultTemple_NeedTime = 2,
		// 正在被攻击;
		R_ResultTemple_BeFighting = 3,
		// 你已经占领此神殿;
		R_ResultTemple_InTemple = 4,
	}
	/**
	*----外形模块
	*/
	enum _emC2S_Temple_Protocol {
		//打开界面 无内容;
		C2S_Temple_Open = 1,
		//查看记录	PBU32;
		C2S_Temple_QueryRecord = 2,
		//战斗;
		C2S_Temple_Fight = 10,
	}
	/**
	*----外形模块
	*/
	enum _emS2C_Temple_Protocol {
		//通用返回(失败才返回);
		S2C_Temple_CommonAck = 1,
		//同步所有信息			PBG2CTempleSynAll;
		S2C_Temple_SynAll = 2,
		//查看记录返回 		PBG2CTempleQueryRecord;
		S2C_Temple_QueryRecord = 3,
		//同步数据 			PBPlayerTemple;
		S2C_Temple_Syn = 4,
	}
	/**
	* 同步所有信息
	*/
	class PBG2CTempleSynAll {
		constructor();
		/**神殿基本数据*/
		public baseinfo:Pb_God.PBTempleInfoBase[];
		public static encode(message: Pb_God.PBG2CTempleSynAll, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTempleSynAll, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTempleSynAll;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTempleSynAll;
	}
	/**
	* 同步记录
	*/
	class PBG2CTempleQueryRecord {
		constructor();
		/** 神殿ID*/
		public id:number;
		/** 挑战记录*/
		public record:Pb_God.PBTempleRecord[];
		public static encode(message: Pb_God.PBG2CTempleQueryRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTempleQueryRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTempleQueryRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTempleQueryRecord;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 商店相关
	*/
	enum _emResultShop_16 {
		//  成功;
		R_ResultShop_Succeed = 0,
		//  失败;
		R_ResultShop_Fail = 1,
		// vip等级不足;
		R_ResultShop_NeedVipLevel = 2,
		// 购买次数不足;
		R_ResultShop_NeedBuyCount = 3,
		// 道具不足;
		R_ResultShop_NeedItem = 4,
		// 无此道具可出售;
		R_ResultShop_NoSellItem = 5,
		// 没有购买任何英雄，无需重置;
		R_ResultShop_NoReset = 6,
		// 神格积分不足;
		R_ResultShop_NeedGodPoint = 7,
		// 最大刷新次数;
		R_ResultShop_MaxRefreshCount = 8,
		//未满足商店开放关卡层数;
		R_ResultShop_TowerShopNoOpen = 9,
	}
	/**
	*----商店模块
	*/
	enum _emC2S_Shop_Protocol {
		// 	 购买		PBCAGShopBuy;
		C2S_Shop_Buy = 1,
		// 	 重置		PBU32;
		C2S_Shop_Reset = 2,
		// 	 刷新		PBU32;
		C2S_Shop_Refresh = 3,
	}
	/**
	*----商店模块
	*/
	enum _emS2C_Shop_Protocol {
		//	 通用错误返回;
		S2C_Shop_Common = 0,
		//	 购买返回 			PBCAGShopBuy;
		S2C_Shop_Buy = 1,
		//	 重置返回				PBPlayerFixShop;
		S2C_Shop_Reset = 2,
		//	 刷新返回				PBPlayerRandShop;
		S2C_Shop_Refresh = 3,
		//	 同步随机商店刷新次数	PBG2CSynRandRefreshCount;
		S2C_Shop_SynRandRefreshCount = 4,
	}
	/**
	* 神器数据
	*/
	class PBCAGShopBuy {
		constructor();
		/** 商店类型*/
		public shoptype:number;
		/** 固定表示index, 随机商店表示pos(0开始)*/
		public id:number;
		/** 购买次数*/
		public buycount:number;
		public static encode(message: Pb_God.PBCAGShopBuy, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGShopBuy, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGShopBuy;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGShopBuy;
	}
	/**
	* 同步随机商店刷新次数
	*/
	class PBG2CSynRandRefreshCount {
		constructor();
		/** 商店类型*/
		public shoptype:number;
		/** 免费刷新剩余次数*/
		public freeleftcount:number;
		/** 下次免费刷新时间*/
		public nextfreetime:number;
		public static encode(message: Pb_God.PBG2CSynRandRefreshCount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CSynRandRefreshCount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CSynRandRefreshCount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CSynRandRefreshCount;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 挂机相关
	*/
	enum _emResultHook_14 {
		// 成功;
		R_ResultHook_Succeed = 0,
		// 失败;
		R_ResultHook_Fail = 1,
		// 系统未开启;
		R_ResultHook_SystemNoOpen = 2,
		// 需要累计一定收益才能领取;
		R_ResultHook_NeedHookTime = 3,
		// 你未通关此关卡;
		R_ResultHook_NeedStageID = 4,
		// 已经领取此关卡的奖励;
		R_ResultHook_HaveStagePrize = 5,
		// 无免费快速作战次数;
		R_ResultHook_NoFreeSweepCount = 6,
		// 需要钻石;
		R_ResultHook_NeedDiamond = 7,
		// 玩家等级不足;
		R_ResultHook_NeedPlayerLevel = 8,
		// 无此关卡;
		R_ResultHook_NoStage = 9,
		// 请通关上一关卡;
		R_ResultHook_NeedPreStage = 10,
		// 挑战冷却中;
		R_ResultHook_FightCoolTime = 11,
	}
	/**
	*----挂机模块
	*/
	enum _emC2S_Hook_Protocol {
		//收益领奖  		无内容;
		C2S_Hook_Profit = 0,
		//飞新挂机地图		无内容;
		C2S_Hook_FlyNewScene = 1,
		//领取关卡奖励	 	PBU32;
		C2S_Hook_StagePrize = 2,
		//购买快速挑战;
		C2S_Hook_BuySweep = 3,
		//免费快速挑战;
		C2S_Hook_FreeSweep = 4,
		//挑战关卡	;
		C2S_Hook_FightStage = 5,
	}
	/**
	*----挂机模块
	*/
	enum _emS2C_Hook_Protocol {
		//	通用错误返回;
		S2C_Hook_Common = 0,
		//	收益领奖					PBG2CProfitAck	;
		S2C_Hook_ProfitAck = 1,
		//	飞新地图返回(新地图ID)	PBU32;
		S2C_Hook_FlyNewSceneAck = 2,
		//	领取关卡奖励返回			PBU32;
		S2C_Hook_StagePrizeAck = 3,
		//	快速挑战返回				PBG2CSweepAck	;
		S2C_Hook_SweepAck = 4,
		//	同步新关卡				PBG2CSynStageAck;
		S2C_Hook_SynStage = 5,
	}
	/**
	*同步新关卡
	*/
	class PBG2CSynStageAck {
		constructor();
		/**关卡ID*/
		public stageid:number;
		/**下次挑战时间*/
		public nextfighttime:number;
		public static encode(message: Pb_God.PBG2CSynStageAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CSynStageAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CSynStageAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CSynStageAck;
	}
	/**
	*挂机收益领奖返回
	*/
	class PBG2CProfitAck {
		constructor();
		/**收益时间*/
		public profittime:number;
		/**更新开始时间*/
		public begintime:number;
		/**奖励道具*/
		public prizeitem:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBG2CProfitAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CProfitAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CProfitAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CProfitAck;
	}
	/**
	*购买快速挑战返回
	*/
	class PBG2CSweepAck {
		constructor();
		/**快速作战免费次数*/
		public dayfreesweepcount:number;
		/**快速作战购买次数*/
		public daubuysweepcount:number;
		/**收益时间*/
		public profittime:number;
		/**奖励道具*/
		public prizeitem:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBG2CSweepAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CSweepAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CSweepAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CSweepAck;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 
	*/
	enum _emPC2S_Protocol {
		// 玩家操作请求	_emC2S_Player_Protocol;
		P_C2S_Protocol_Player = 0,
		// 通用功能模块 _emC2S_Common_Protocol;
		P_C2S_Protocol_Common = 1,
		// 副本模块 _emC2S_Copymap_Protocol;
		P_C2S_Protocol_Copymap = 2,
		// 伙伴模块 _emC2S_Pet_Protocol;
		P_C2S_Protocol_Pet = 3,
		// 道具模块 _emC2S_Item_Protocol;
		P_C2S_Protocol_Item = 4,
		// 战斗模块 _emC2S_Fight_Protocol;
		P_C2S_Protocol_Fight = 5,
		// 任务模块 _emC2S_Task_Protocol;
		P_C2S_Protocol_Task = 6,
		// 邮件系统 _emC2S_Mail_Protocol;
		P_C2S_Protocol_Mail = 7,
		// 排行榜系统 _emC2S_TopList_Protocol;
		P_C2S_Protocol_TopList = 8,
		// 竞技场	_emC2S_Challenge_Protocol;
		P_C2S_Protocol_Challenge = 9,
		// 帮派相关操作 _emC2S_Faction_Protocol;
		P_C2S_Protocol_Faction = 10,
		// 帮派相关操作 _emC2S_Team_Protocol;
		P_C2S_Protocol_Team = 11,
		// 召唤系统 _emC2S_Call_Protocol;
		P_C2S_Protocol_Call = 12,
		// 远航系统 _emC2S_Sail_Protocol;
		P_C2S_Protocol_Sail = 13,
		// 挂机系统 _emC2S_Hook_Protocol;
		P_C2S_Protocol_Hook = 14,
		// 神器系统 _emC2S_Artifact_Protocol;
		P_C2S_Protocol_Artifact = 15,
		// 商店系统 _emC2S_Shop_Protocol;
		P_C2S_Protocol_Shop = 16,
		// 试炼系统 _emC2S_Train_Protocol;
		P_C2S_Protocol_Train = 17,
		// 成就系统 _emC2S_Achieve_Protocol;
		P_C2S_Protocol_Achieve = 18,
		// 远征系统 _emC2S_Expedition_Protocol;
		P_C2S_Protocol_Expedition = 19,
		// 外显系统 _emC2S_Shape_Protocol;
		P_C2S_Protocol_Shape = 20,
		// 神殿系统 _emC2S_Temple_Protocol;
		P_C2S_Protocol_Temple = 21,
		// 好友系统 _emC2S_Friend_Protocol;
		P_C2S_Protocol_Friend = 22,
		// 元素系统 _emC2S_Element_Protocol;
		P_C2S_Protocol_Element = 23,
		// 冒险系统 _emC2S_Risk_Protocol;
		P_C2S_Protocol_Risk = 24,
		// 超凡段位系统 _emC2S_Dan_Protocol;
		P_C2S_Protocol_Dan = 25,
		// 跨服天梯系统 _emC2S_Ladder_Protocol;
		P_C2S_Protocol_Ladder = 26,
		// 冠军赛系统 _emC2S_Champion_Protocol;
		P_C2S_Protocol_Champion = 27,
		// 圣物系统 _emC2S_Holy_Protocol;
		P_C2S_Protocol_Holy = 28,
		// 录像系统 _emC2S_Video_Protocol;
		P_C2S_Protocol_Video = 29,
		// 特权系统 _emC2S_Privilege_Protocol;
		P_C2S_Protocol_Privilege = 30,
		// 福利系统 _emC2S_Weal_Protocol;
		P_C2S_Protocol_Weal = 31,
		// 活动系统 _emC2S_Activity_Protocol;
		P_C2S_Protocol_Activity = 32,
		// 平台系统 _emC2S_Platform_Protocol;
		P_C2S_Protocol_Platform = 33,
		// 聊天系统 _emC2S_Talk_Protocol;
		P_C2S_Protocol_Talk = 34,
		// 探宝系统 _emC2S_Treasure_Protocol;
		P_C2S_Protocol_Treasure = 35,
		// 天界副本系统 _emC2S_HeavenDungeon_Protocol;
		P_C2S_Protocol_HeavenDungeon = 36,
		// 跨服竞技场 _emC2S_CrossChallenge_Protocol;
		P_C2S_Protocol_CrossChallenge = 37,
		// 晶碑 _emC2S_Tablet_Protocol;
		P_C2S_Protocol_Tablet = 38,
		// 周冠军赛 _emC2S_WeekChampion_Protocol;
		P_C2S_Protocol_WeekChampion = 39,
		// 组队征战 _emC2S_TeamCampaign_Protocol;
		P_C2S_Protocol_TeamCampaign = 40,
		// 龙珠 _emC2S_DragonBall_Protocol;
		P_C2S_Protocol_DragonBall = 41,
		// 契约 _emC2S_Convenant_Protocol;
		P_C2S_Protocol_Convenant = 42,
		// 抽奖		_emC2S_Lottery_Protocol		;
		P_C2S_Protocol_Lottery = 43,
		// 图鉴收集 _emC2S_Illustration_Protocol;
		P_C2S_Protocol_Illustration = 44,
		// 红包 _emC2S_RedEnvelope_Protocol;
		P_C2S_Protocol_RedEnvelope = 45,
		// 连连看 _emC2S_JoyousLinkup_Protocol;
		P_C2S_Protocol_JoyousLinkup = 46,
		// 猜猜猜 _emC2S_Guess_Protocol	;
		P_C2S_Protocol_Guess = 47,
		// 守护 _emC2S_Defend_Protocol	;
		P_C2S_Protocol_Defend = 48,
		// 共鸣 _emC2S_Resonance_Protocol	;
		P_C2S_Protocol_Resonance = 49,
		// 孵化屋 _emC2S_IncubateEgg_Protocol;
		P_C2S_Protocol_IncubateEgg = 50,
		// 活动限时boss _emC2S_ActivityBoss_Protocol;
		P_C2S_Protocol_ActivityBoss = 51,
		// 订单管理 _emC2S_Order_Protocol;
		P_C2S_Protocol_Order = 52,
		// 大神搭配 _emC2S_GodDeploy_Protocol;
		P_C2S_Protocol_GodDeploy = 53,
		// 网络层相关操作 _emC2S_Operate_Protocol;
		P_C2S_Protocol_Operate = 255,
	}
	/**
	*----网络层操作请求子协议
	*/
	enum _emC2S_Operate_Protocol {
		// 验证请求 	VerifyAsk;
		C2S_Operate_Verify_Ask = 0,
		// Ping请求	PingAsk;
		C2S_Operate_Ping_Ask = 1,
		// 登录请求	(取CAW PBLoginAsk和CAG PBC2GLoginAsk);
		C2S_Operate_Login_Ask = 2,
		// 验证应答	VerifyAck;
		C2S_Operate_Verify_Ack = 3,
		// Ping应答	PingAck;
		C2S_Operate_Ping_Ack = 4,
		// 断开命令 	无内容;
		C2S_Operate_Disconnect = 5,
		// 错误包通知	BadNotify;
		C2S_Operate_Bad_Notify = 6,
		// 踢出通知 	无内容;
		C2S_Operate_Kick_Notify = 7,
		// 登录应答	(取CAW PBLoginAck 和CAG PBG2CLoginAck)	;
		C2S_Operate_Login_Ack = 8,
		// 读取超时		无内容;
		C2S_Operate_TimeoutRead = 9,
		// 写入超时	无内容;
		C2S_Operate_TimeoutWrite = 10,
	}
	/**
	*----网络层操作请求子协议
	*/
	enum _emS2C_Operate_Protocol {
		// 验证请求 	VerifyAsk;
		S2C_Operate_Verify_Ask = 0,
		// Ping请求	PingAsk;
		S2C_Operate_Ping_Ask = 1,
		// 登录请求	(取CAW PBLoginAsk和CAG PBC2GLoginAsk);
		S2C_Operate_Login_Ask = 2,
		// 验证应答	VerifyAck;
		S2C_Operate_Verify_Ack = 3,
		// Ping应答	PingAck;
		S2C_Operate_Ping_Ack = 4,
		// 断开命令 	无内容;
		S2C_Operate_Disconnect = 5,
		// 错误包通知	BadNotify;
		S2C_Operate_Bad_Notify = 6,
		// 踢出通知 	无内容;
		S2C_Operate_Kick_Notify = 7,
		// 登录应答	(取CAW PBLoginAck 和CAG PBG2CLoginAck)	;
		S2C_Operate_Login_Ack = 8,
		// 读取超时		无内容;
		S2C_Operate_TimeoutRead = 9,
		// 写入超时	无内容;
		S2C_Operate_TimeoutWrite = 10,
		// 关服通知   (取CAW PBCloseServerData);
		S2C_Operate_CloseServer = 11,
	}
	/**
	*----玩家操作请求子协议
	*/
	enum _emC2S_Player_Protocol {
		//通用 无内容;
		C2S_Player_Common = 0,
	}
	/**
	*#############################################################
	*/
	enum _emPS2C_Protocol {
		// 帐号角色信息 _emS2C_Player_Protocol;
		P_S2C_Protocol_Player = 0,
		// 通用功能模块 _emS2C_Common_Protocol;
		P_S2C_Protocol_Common = 1,
		// 副本模块 _emS2C_Copymap_Protocol;
		P_S2C_Protocol_Copymap = 2,
		// 伙伴系统	_emS2C_Pet_Protocol;
		P_S2C_Protocol_Pet = 3,
		// 道具模块 _emS2C_Item_Protocol;
		P_S2C_Protocol_Item = 4,
		// 战斗模块 _emS2C_Fight_Protocol;
		P_S2C_Protocol_Fight = 5,
		// 任务模块 _emS2C_Task_Protocol;
		P_S2C_Protocol_Task = 6,
		// 邮件系统 _emS2C_Mail_Protocol;
		P_S2C_Protocol_Mail = 7,
		// 排行榜系统	_emS2C_TopList_Protocol;
		P_S2C_Protocol_TopList = 8,
		// 竞技场	_emS2C_Challenge_Protocol;
		P_S2C_Protocol_Challenge = 9,
		// 帮派相关操作 _emS2C_Faction_Protocol;
		P_S2C_Protocol_Faction = 10,
		// 帮派相关操作 _emS2C_Team_Protocol;
		P_S2C_Protocol_Team = 11,
		// 召唤系统 _emS2C_Call_Protocol;
		P_S2C_Protocol_Call = 12,
		// 远航系统 _emS2C_Sail_Protocol;
		P_S2C_Protocol_Sail = 13,
		// 挂机系统 _emS2C_Hook_Protocol;
		P_S2C_Protocol_Hook = 14,
		// 神器系统 _emS2C_Artifact_Protocol;
		P_S2C_Protocol_Artifact = 15,
		// 商店系统 _emS2C_Shop_Protocol;
		P_S2C_Protocol_Shop = 16,
		// 试炼系统 _emS2C_Train_Protocol;
		P_S2C_Protocol_Train = 17,
		// 成就系统 _emS2C_Achieve_Protocol;
		P_S2C_Protocol_Achieve = 18,
		// 远征系统 _emS2C_Expedition_Protocol;
		P_S2C_Protocol_Expedition = 19,
		// 外显系统 _emS2C_Shape_Protocol;
		P_S2C_Protocol_Shape = 20,
		// 神殿系统 _emS2C_Temple_Protocol;
		P_S2C_Protocol_Temple = 21,
		// 好友系统 _emS2C_Friend_Protocol;
		P_S2C_Protocol_Friend = 22,
		// 元素系统 _emS2C_Element_Protocol;
		P_S2C_Protocol_Element = 23,
		// 冒险系统 _emS2C_Risk_Protocol;
		P_S2C_Protocol_Risk = 24,
		// 超凡段位系统 _emS2C_Dan_Protocol;
		P_S2C_Protocol_Dan = 25,
		// 跨服天梯系统 _emS2C_Ladder_Protocol;
		P_S2C_Protocol_Ladder = 26,
		// 冠军赛系统 _emS2C_Champion_Protocol;
		P_S2C_Protocol_Champion = 27,
		// 广播 _emS2C_Broadcast_Protocol;
		P_S2C_Protocol_Broadcast = 28,
		// 圣物系统 _emS2C_Holy_Protocol;
		P_S2C_Protocol_Holy = 29,
		// 录像系统 _emS2C_Video_Protocol;
		P_S2C_Protocol_Video = 30,
		// 特权系统 _emS2C_Privilege_Protocol;
		P_S2C_Protocol_Privilege = 31,
		// 福利系统 _emS2C_Weal_Protocol;
		P_S2C_Protocol_Weal = 32,
		// 活动系统 _emS2C_Activity_Protocol;
		P_S2C_Protocol_Activity = 33,
		// 平台系统 _emS2C_Platform_Protocol;
		P_S2C_Protocol_Platform = 34,
		// 聊天系统 _emS2C_Talk_Protocol;
		P_S2C_Protocol_Talk = 35,
		// 探宝系统 _emS2C_Treasure_Protocol;
		P_S2C_Protocol_Treasure = 36,
		// 天界副本 _emS2C_HeavenDungeon_Protocol;
		P_S2C_Protocol_HeavenDungeon = 37,
		// 跨服竞技场 _emS2C_CrossChallenge_Protocol;
		P_S2C_Protocol_CrossChallenge = 38,
		// 家园系统 _emS2C_Room_Protocol;
		P_S2C_Protocol_Room = 39,
		// 晶碑系统 _emS2C_Tablet_Protocol;
		P_S2C_Protocol_Tablet = 40,
		// 周冠军赛系统 _emS2C_WeekChampion_Protocol;
		P_S2C_Protocol_WeekChampion = 41,
		// 组队征战系统 _emS2C_TeamCampaign_Protocol;
		P_S2C_Protocol_TeamCampaign = 42,
		// 龙珠系统 _emS2C_DragonBall_Protocol;
		P_S2C_Protocol_DragonBall = 43,
		// 契约系统 _emS2C_Convenant_Protocol;
		P_S2C_Protocol_Convenant = 44,
		// 抽奖系统		_emS2C_Lottery_Protocol;
		P_S2C_Protocol_Lottery = 45,
		// 图鉴系统 _emS2C_Illustration_Protocol;
		P_S2C_Protocol_Illustration = 46,
		// 红包 _emS2C_RedEnvelope_Protocol;
		P_S2C_Protocol_RedEnvelope = 47,
		// 连连看 _emS2C_JoyousLinkup_Protocol;
		P_S2C_Protocol_JoyousLinkup = 48,
		// 猜猜猜 _emS2C_Guess_Protocol;
		P_S2C_Protocol_Guess = 49,
		// 守护 _emS2C_Defend_Protocol;
		P_S2C_Protocol_Defend = 50,
		// 共鸣 _emS2C_Resonance_Protocol;
		P_S2C_Protocol_Resonance = 51,
		// 孵化屋 _emS2C_IncubateEgg_Protocol;
		P_S2C_Protocol_IncubateEgg = 52,
		// 活动限时boss _emS2C_ActivityBoss_Protocol;
		P_S2C_Protocol_ActivityBoss = 53,
		// 订单管理 _emS2C_Order_Protocol;
		P_S2C_Protocol_Order = 54,
		// 大神搭配 _emS2C_GodDeploy_Protocol;
		P_S2C_Protocol_GodDeploy = 55,
		// 网络层相关操作 _emS2C_Operate_Protocol;
		P_S2C_Protocol_Operate = 255,
	}
	/**
	*----帐号角色信息
	*/
	enum _emS2C_Player_Protocol {
		// 选择角色返回	PBSelectPlayerAck;
		S2C_Player_SelectPlayer = 1,
		// 基础信息 PBPlayerBase;
		S2C_Player_BaseInfo = 2,
		// 功能系统信息 PBPlayerSystem;
		S2C_Player_SystemInfo = 3,
		// 功能系统信息 PBPlayerSystemExt	;
		S2C_Player_SystemInfo2 = 4,
		// 背包信息 PBPlayerBag;
		S2C_Player_BagInfo = 5,
		// 背包信息 PBPlayerBag 扩展;
		S2C_Player_BagInfo2 = 6,
		// 伙伴信息 PBPlayerPet;
		S2C_Player_PetInfo = 7,
		// 伙伴信息 PBPlayerPet 扩展;
		S2C_Player_PetInfo2 = 8,
		// 伙伴信息3 PBPlayerPetExt	;
		S2C_Player_PetInfo3 = 9,
		// 前端信息 PBClientData;
		S2C_Player_ClientInfo = 10,
		// 好友信息 PBPlayerFriend;
		S2C_Player_Friend = 12,
		// 邮件信息 PBPlayerMail;
		S2C_Player_Mail = 13,
		// 帮会信息 PBPlayerFaction;
		S2C_Player_Faction = 14,
		// 检测角色名字 PBPlayerNameAck;
		S2C_Player_CheckPlayerName = 15,
		// 玩家数据发送完成	;
		S2C_Player_LoadComplete = 16,
		// 防沉迷检测 PBPlayerWallowData;
		S2C_Player_CheckWallow = 17,
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 物品背包相关
	*/
	enum _emResultItem_4 {
		//  成功;
		R_ResultItem_Succeed = 0,
		//  失败;
		R_ResultItem_Fail = 1,
		//  物品不存在;
		R_ResultItem_NoItem = 2,
		//  不能装备;
		R_ResultItem_CannotEquip = 3,
		//  不能使用;
		R_ResultItem_CannotUse = 5,
		//  数量不够;
		R_ResultItem_NotEnough = 6,
		//  叠加数量已满;
		R_ResultItem_MaxCount = 7,
		//  前提条件不满足;
		R_ResultItem_PreCondition = 8,
		//  CD冷却中;
		R_ResultItem_CD = 9,
		// 钱不够;
		R_ResultItem_NeedMoney = 10,
		// 已过期，物品失效;
		R_ResultItem_NoTimeLimit = 11,
		//当前值已满;
		R_ResultItem_ExpendFull = 12,
		//参数个数错误;
		R_ResultItem_ParamNumError = 13,
		//等级太低;
		R_ResultItem_Level_Low = 14,
		//每日使用次数已满;
		R_ResultItem_NoDayUseCount = 15,
		//每周使用次数已满;
		R_ResultItem_NoWeekUseCount = 16,
		//每月使用次数已满;
		R_ResultItem_NoMonthUseCount = 17,
		//装备没有穿戴;
		R_ResultItem_ItemNoInEquipMap = 18,
		//使用道具数量不对;
		R_ResultItem_UseNumError = 19,
		//不能使用多个道具;
		R_ResultItem_LimitUseOne = 20,
		//伙伴背包已满;
		R_ResultItem_PetBagFull = 21,
		//永久使用次数已满;
		R_ResultItem_NoForverUseCount = 22,
		//扣除的道具不足;
		R_ResultItem_NeedItem = 23,
		//装备升阶达到最大等级;
		R_ResultItem_EquipUpgradeMaxLevel = 24,
		//未穿戴此装备;
		R_ResultItem_NoEquip = 25,
		//不能出售此道具;
		R_ResultItem_NoSell = 26,
		//不能分解此道具;
		R_ResultItem_NoSplit = 27,
		//道具类型不对;
		R_ResultItem_NeedItemType = 28,
		//无洗练属性保存;
		R_ResultItem_RefineNoSave = 29,
		//熔炼值不足;
		R_ResultItem_NeedRuneScore = 30,
		//道具品质不对;
		R_ResultItem_NeedItemQuality = 31,
		//需要vip特权;
		R_ResultItem_NeedVip = 32,
		//人物达到30级或VIP达到2级开启;
		R_ResultItem_EquipCompoundCondi = 33,
		//锁定错误;
		R_ResultItem_LockError = 34,
		//伙伴不存在;
		R_ResultItem_NoPet = 35,
		//等级不足;
		R_ResultItem_NeedLevel = 36,
		//伙伴等级不足;
		R_ResultItem_NeedPetLevel = 37,
		//伙伴类型不符;
		R_ResultItem_PetType = 38,
		//伙伴职业不符;
		R_ResultItem_PetJob = 39,
		//伙伴星级不符;
		R_ResultItem_PetStar = 40,
		//伙伴不符;
		R_ResultItem_PetID = 41,
		//时间不符;
		R_ResultItem_LimitTime = 42,
	}
	/**
	*----道具模块
	*/
	enum _emC2S_Item_Protocol {
		// 	 使用道具				PBC2GUseItem;
		C2S_Item_Use = 1,
		// 	 装备合成				PBCAGItemCompound;
		C2S_Item_EquipCompound = 2,
		// 	 装备一键合成			PBC2GEquipAutoCompound;
		C2S_Item_EquipAutoCompound = 3,
		// 	 符文合成				PBC2GRuneCompound;
		C2S_Item_RuneCompound = 4,
		// 	 伙伴合成				PBC2GPetCompound;
		C2S_Item_PetCompound = 5,
		// 	 道具出售				PBC2GItemSell;
		C2S_Item_Sell = 6,
		// 	 道具分解				PBC2GItemSplit		;
		C2S_Item_Split = 7,
		// 	 符文重铸				PBC2GRuneRefineAsk	;
		C2S_Item_RuneRefine = 8,
		// 	 符文重铸保存			PBItemSn	;
		C2S_Item_SaveRuneRefine = 9,
		// 	 全额购买				PBItemInfo;
		C2S_Item_FullBuy = 10,
		// 	 符文兑换	;
		C2S_Item_RuneExchange = 11,
		// 	 神装洗练				PBC2GGodEquipRefineAsk	;
		C2S_Item_GodEquipRefine = 12,
		// 	 神装洗练	保存		PBItemSn	;
		C2S_Item_SaveGodEquipRefine = 13,
		// 	 一键出售				PBC2GItemSellOneKeyAsk	;
		C2S_Item_SellOneKey = 14,
		// 	 查询装备合成记录			;
		C2S_Item_EquipCompoundLog = 15,
		// 	 使用礼包道具				PBC2GBagUseItem;
		C2S_Item_Bag_Use = 16,
		//	 使用升星道具			PBC2GUpstarUseItem;
		C2S_Item_UpStar_Use = 17,
	}
	/**
	*----道具模块
	*/
	enum _emS2C_Item_Protocol {
		//	 新增道具				PBG2CNewItem;
		S2C_Item_New = 0,
		//	 更新道具信息			PBItem;
		S2C_Item_Update = 1,
		//	 更新道具数量			PBG2CUpdateItem;
		S2C_Item_UpdateNum = 2,
		//	 使用道具返回			无内容;
		S2C_Item_Use = 3,
		//	 通用失败返回;
		S2C_Item_Common = 4,
		//	 符文合成返回			PBItemSn;
		S2C_Item_RuneCompound = 5,
		//	 符文重铸返回			PBG2CRuneRefineAck;
		S2C_Item_RuneRefine = 6,
		//	 符文重铸保存返回		PBItem;
		S2C_Item_SaveRuneRefine = 7,
		// 	 装备合成返回			失败才返回;
		S2C_Item_EquipCompound = 8,
		// 	 装备一键合成返回		失败才返回;
		S2C_Item_EquipAutoCompound = 9,
		// 	 伙伴合成返回			PBG2CPetCompound;
		S2C_Item_PetCompound = 10,
		//	 神装洗练	返回		PBG2CGodEquipRefineAck;
		S2C_Item_GodEquipRefine = 11,
		//	 神装洗练	保存返回	PBItem;
		S2C_Item_SaveGodEquipRefine = 12,
		//	 查询装备合成记录		PBG2CEquipCompoundLog	;
		S2C_Item_EquipCompoundLog = 13,
	}
	/**
	*礼包使用类型
	*/
	enum itemBagUseType {
		//	获得所有道具;
		itemBagUseType_all = 1,
		//	概率获得道具;
		itemBagUseType_perscent = 2,
		//	选择道具;
		itemBagUseType_scelect = 3,
	}
	/**
	* 查询装备合成记录
	*/
	class PBG2CEquipCompoundLog {
		constructor();
		/**记录*/
		public log:Pb_God.PBEquipCompoundLog[];
		public static encode(message: Pb_God.PBG2CEquipCompoundLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CEquipCompoundLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CEquipCompoundLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CEquipCompoundLog;
	}
	/**
	* 一键出售
	*/
	class PBC2GItemSellOneKeyAsk {
		constructor();
		/**品质*/
		public itemsn:Long[];
		public static encode(message: Pb_God.PBC2GItemSellOneKeyAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GItemSellOneKeyAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GItemSellOneKeyAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GItemSellOneKeyAsk;
	}
	/**
	* 神装洗练返回
	*/
	class PBG2CGodEquipRefineAck {
		constructor();
		/**道具SN*/
		public itemsn:Long;
		/**洗练次数*/
		public refinecount:number;
		/**洗练的随机属性*/
		public refineattr:Pb_God.PBAttrBaseInfo[];
		public static encode(message: Pb_God.PBG2CGodEquipRefineAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CGodEquipRefineAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CGodEquipRefineAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CGodEquipRefineAck;
	}
	/**
	* 神装洗练
	*/
	class PBC2GGodEquipRefineAsk {
		constructor();
		/**道具SN*/
		public itemsn:Long;
		/**锁定的属性*/
		public lockattr:number[];
		public static encode(message: Pb_God.PBC2GGodEquipRefineAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GGodEquipRefineAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GGodEquipRefineAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GGodEquipRefineAsk;
	}
	/**
	* 伙伴合成返回
	*/
	class PBG2CPetCompound {
		constructor();
		/**新增的伙伴*/
		public pet:Pb_God.PBPetStar[];
		public static encode(message: Pb_God.PBG2CPetCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CPetCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CPetCompound;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CPetCompound;
	}
	/**
	* 伙伴合成
	*/
	class PBC2GPetCompound {
		constructor();
		/**道具SN*/
		public itemsn:Long;
		/**合成的数量*/
		public itemcount:number;
		public static encode(message: Pb_God.PBC2GPetCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GPetCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GPetCompound;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GPetCompound;
	}
	/**
	* 符文重铸
	*/
	class PBC2GRuneRefineAsk {
		constructor();
		/**道具SN*/
		public itemsn:Long;
		/**锁定的技能id*/
		public lockskill:number[];
		/**锁定基础属性*/
		public blockattr:boolean;
		public static encode(message: Pb_God.PBC2GRuneRefineAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GRuneRefineAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GRuneRefineAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GRuneRefineAsk;
	}
	/**
	* 符文重铸返回
	*/
	class PBG2CRuneRefineAck {
		constructor();
		/**道具SN*/
		public itemsn:Long;
		/**重铸的被动技能索引*/
		public refineskill:Pb_God.PBSkillInfo[];
		/**重铸的随机属性*/
		public refineattr:Pb_God.PBAttrBaseInfo[];
		public static encode(message: Pb_God.PBG2CRuneRefineAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRuneRefineAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRuneRefineAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRuneRefineAck;
	}
	/**
	* 道具SN
	*/
	class PBItemSn {
		constructor();
		/**道具SN*/
		public itemsn:Long;
		public static encode(message: Pb_God.PBItemSn, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBItemSn, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBItemSn;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBItemSn;
	}
	/**
	* 道具分解
	*/
	class PBC2GItemSplit {
		constructor();
		/**道具SN*/
		public iteminfo:Pb_God.PBItemSnCount[];
		public static encode(message: Pb_God.PBC2GItemSplit, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GItemSplit, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GItemSplit;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GItemSplit;
	}
	/**
	* 道具出售
	*/
	class PBC2GItemSell {
		constructor();
		/**道具SN*/
		public itemsn:Long;
		/**道具数量*/
		public itemcount:number;
		public static encode(message: Pb_God.PBC2GItemSell, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GItemSell, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GItemSell;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GItemSell;
	}
	/**
	* 道具合成
	*/
	class PBCAGItemCompound {
		constructor();
		/**道具*/
		public itemid:number;
		/**道具数量*/
		public itemcount:number;
		public static encode(message: Pb_God.PBCAGItemCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGItemCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGItemCompound;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGItemCompound;
	}
	/**
	* 符文合成
	*/
	class PBC2GRuneCompound {
		constructor();
		/**道具id*/
		public itemid:number;
		/**符文SN*/
		public runesn:Long[];
		public static encode(message: Pb_God.PBC2GRuneCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GRuneCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GRuneCompound;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GRuneCompound;
	}
	/**
	* 装备一键合成
	*/
	class PBC2GEquipAutoCompound {
		constructor();
		/**装备类型_emEquipType*/
		public equiptype:number;
		public static encode(message: Pb_God.PBC2GEquipAutoCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GEquipAutoCompound, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GEquipAutoCompound;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GEquipAutoCompound;
	}
	/**
	* 更新道具返回
	*/
	class PBG2CUpdateItem {
		constructor();
		/***/
		public itemsnid:Long;
		/**道具ID*/
		public itemid:number;
		/**道具的当前个数*/
		public itemcount:number;
		/**标志 _emItemFlag*/
		public flag:number;
		/**_emDoingType*/
		public doing:number;
		public static encode(message: Pb_God.PBG2CUpdateItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CUpdateItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CUpdateItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CUpdateItem;
	}
	/**
	* 使用道具请求
	*/
	class PBC2GUseItem {
		constructor();
		/**道具SN*/
		public itemsnid:Long;
		/**道具个数*/
		public itemcount:number;
		public static encode(message: Pb_God.PBC2GUseItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GUseItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GUseItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GUseItem;
	}
	/**
	* 使用礼包请求
	*/
	class PBC2GBagUseItem {
		constructor();
		/**道具SN*/
		public itemsnid:Long;
		/**道具个数*/
		public itemcount:number;
		/**道具组ID*/
		public itemGroupID:number[];
		public static encode(message: Pb_God.PBC2GBagUseItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GBagUseItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GBagUseItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GBagUseItem;
	}
	/**
	* 使用升星道具请求
	*/
	class PBC2GUpstarUseItem {
		constructor();
		/**道具SN*/
		public itemsn:Long;
		/**道具个数*/
		public itemcount:number;
		/**英雄sn*/
		public petsn:Long;
		public static encode(message: Pb_God.PBC2GUpstarUseItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GUpstarUseItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GUpstarUseItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GUpstarUseItem;
	}
	/**
	* 使用道具返回
	*/
	class PBG2CUseItem {
		constructor();
		/***/
		public itemsnid:Long;
		/**道具ID*/
		public itemid:number;
		/**实际扣除数量*/
		public itemcount:number;
		/**玩家输入数量*/
		public inputcount:number;
		public static encode(message: Pb_God.PBG2CUseItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CUseItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CUseItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CUseItem;
	}
	/**
	* 新增道具返回
	*/
	class PBG2CNewItem {
		constructor();
		/***/
		public iteminfo:Pb_God.PBItem;
		/**_emDoingType*/
		public doing:number;
		public static encode(message: Pb_God.PBG2CNewItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CNewItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CNewItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CNewItem;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 超凡段位相关
	*/
	enum _emResultDan_25 {
		//  成功;
		R_ResultDan_Succeed = 0,
		//  失败;
		R_ResultDan_Fail = 1,
		// 扣除的道具不足;
		R_ResultDan_NeedItem = 2,
		// 加载完成;
		R_ResultDan_LoadComplete = 3,
		// 不在开启时间内;
		R_ResultDan_NeedOpenTime = 4,
		// 进入次数不足;
		R_ResultDan_NeedEnterCount = 5,
		// 达到最大购买次数;
		R_ResultDan_MaxBuyCount = 6,
		// 需要VIP等级;
		R_ResultDan_NeedVipLevel = 7,
		// 匹配不到对手;
		R_ResultDan_FightNoMatch = 8,
		// 暂时未达到此段位;
		R_ResultDan_NeedDanID = 9,
		// 先领取上一个段位奖励;
		R_ResultDan_NeedPrizePrDan = 10,
		// 在王者赛中，不能进行常规赛;
		R_ResultDan_InKingMatch = 11,
	}
	/**
	*----超凡段位模块
	*/
	enum _emC2S_Dan_Protocol {
		// 	 打开界面;
		C2S_Dan_OpenAsk = 1,
		// 	 领取奖励		PBU32;
		C2S_Dan_AwardAsk = 2,
		// 	 购买次数返回 PBU32;
		C2S_Dan_BuyCountAsk = 3,
		// 	 总战绩查询;
		C2S_Dan_TotalResultAsk = 4,
		// 	 赛季战绩查询	PBU32;
		C2S_Dan_SeasonResultAsk = 5,
		// 	 赛季所有赛区查询	PBC2GDanSeasonAllAreaAsk;
		C2S_Dan_SeasonAllAreaAsk = 6,
		// 	 赛区信息查询	PBC2GDanSeasonAreaInfoAsk;
		C2S_Dan_SeasonAreaInfoAsk = 7,
		// 	 搜索对手;
		C2S_Dan_Search = 8,
		//	 查询我的记录;
		C2S_Dan_Record = 9,
		//	 查询大神记录;
		C2S_Dan_MasterRecord = 10,
		// 	 赛区查询	PBU32U32;
		G2BW_Dan_SynMember = 50,
		//	 挑战请求				PBFightBase;
		G2BW_Dan_FightBegin = 51,
		//	 挑战完成				PBG2BWDanFightResultAck;
		G2BW_Dan_FightResult = 52,
		//	 添加记录;
		G2BW_Dan_AddRecord = 53,
	}
	/**
	*----超凡段位模块
	*/
	enum _emS2C_Dan_Protocol {
		//	 通用错误返回;
		S2C_Dan_Common = 0,
		//	 同步主界面数据 	PBG2CDan_SynInfo	;
		S2C_Dan_SynInfo = 1,
		//	 领取奖励返回 	PBU32;
		S2C_Dan_AwardAck = 2,
		// 	 购买次数返回		PBU32;
		S2C_Dan_BuyCountAck = 3,
		// 	 总战绩查询返回	PBPlayerDanResult;
		S2C_Dan_TotalResultAck = 4,
		// 	 赛季战绩返回		PBPlayerDanResult;
		S2C_Dan_SeasonResultAck = 5,
		// 	 赛季所有赛区查询	PBG2CDanSeasonAllAreaAck;
		S2C_Dan_SeasonAllAreaAck = 6,
		// 	 赛区信息查询		PBDanKingRecord;
		S2C_Dan_SeasonAreaInfoAck = 7,
		//	 挑战结果返回		PBG2CDanFightResultAck	;
		S2C_Dan_FightResultAck = 8,
		//	 搜索对手返回		PBG2CDanSearch;
		S2C_Dan_Search = 9,
		//	 查询我的记录返回 PBG2CDanRecords;
		S2C_Dan_Record = 10,
		//	 查询大神记录返回 PBG2CDanRecords;
		S2C_Dan_MasterRecord = 11,
		//	挑战请求返回		PBFightBase	;
		S2C_Dan_FightBeginAck = 50,
	}
	/**
	* 同步主界面
	*/
	class PBG2CDan_SynInfo {
		constructor();
		/** 赛季ID*/
		public curseasonid:number;
		/** 当前段位ID*/
		public curdanid:number;
		/** 当前积分*/
		public score:number;
		/** 最大积分*/
		public maxscore:number;
		/** 当前经验*/
		public exp:number;
		/** 缓冲经验*/
		public cacheexp:number;
		/** 挑战次数*/
		public fightcount:number;
		/** 购买次数*/
		public buycount:number;
		/** 领奖的段位ID*/
		public prizedanid:number;
		/** 最大的段位ID*/
		public maxdanid:number;
		/** 晋级赛结果*/
		public protmoteresult:number[];
		/** 跨服开始时间*/
		public bwstarttime:number;
		/** 自己赛区*/
		public areaid:number;
		/** 排名*/
		public rank:number;
		/** 玩家ID*/
		public playerid:number;
		/** 世界ID*/
		public worldid:number;
		/** 参加了王者赛*/
		public inkingmatch:boolean;
		public static encode(message: Pb_God.PBG2CDan_SynInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDan_SynInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDan_SynInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDan_SynInfo;
	}
	/**
	* 挑战结果通知跨服
	*/
	class PBG2BWDanFightResultAck {
		constructor();
		/** 玩家ID*/
		public playerid:number;
		/** 世界ID*/
		public worldid:number;
		/** 当前积分*/
		public score:number;
		/** 当前段位*/
		public danid:number;
		public static encode(message: Pb_God.PBG2BWDanFightResultAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2BWDanFightResultAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2BWDanFightResultAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2BWDanFightResultAck;
	}
	/**
	* 挑战结果
	*/
	class PBG2CDanFightResultAck {
		constructor();
		/** 战斗流水号*/
		public battlesn:Long;
		/** 当前积分*/
		public score:number;
		/** 当前段位*/
		public danid:number;
		/** 当前经验*/
		public exp:number;
		/** 当前缓冲经验*/
		public cacheexp:number;
		/** 增加经验/积分(负数减)*/
		public addscore:number;
		/** 奖励*/
		public prize:Pb_God.PBItemInfo[];
		/** 晋级赛结果*/
		public promoteresult:number[];
		public static encode(message: Pb_God.PBG2CDanFightResultAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDanFightResultAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDanFightResultAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDanFightResultAck;
	}
	/**
	* 赛季所有赛区查询
	*/
	class PBC2GDanSeasonAllAreaAsk {
		constructor();
		/** 赛季ID*/
		public seasonid:number;
		/** 玩家ID*/
		public playerid:number;
		/** 世界ID*/
		public worldid:number;
		public static encode(message: Pb_God.PBC2GDanSeasonAllAreaAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GDanSeasonAllAreaAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GDanSeasonAllAreaAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GDanSeasonAllAreaAsk;
	}
	/**
	* 赛季所有赛区返回
	*/
	class PBG2CDanSeasonAllAreaAck {
		constructor();
		/** 赛季ID*/
		public seasonid:number;
		/** 区域ID*/
		public areaid:number[];
		public static encode(message: Pb_God.PBG2CDanSeasonAllAreaAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDanSeasonAllAreaAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDanSeasonAllAreaAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDanSeasonAllAreaAck;
	}
	/**
	* 赛区信息查询
	*/
	class PBC2GDanSeasonAreaInfoAsk {
		constructor();
		/** 赛季ID*/
		public seasonid:number;
		/** 区域ID*/
		public areaid:number;
		/** 玩家ID*/
		public playerid:number;
		/** 世界ID*/
		public worldid:number;
		public static encode(message: Pb_God.PBC2GDanSeasonAreaInfoAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GDanSeasonAreaInfoAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GDanSeasonAreaInfoAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GDanSeasonAreaInfoAsk;
	}
	/**
	* 刷新的数据
	*/
	class PBG2CDanRefresh {
		constructor();
		/** 免费次数*/
		public dayfreecount:number;
		public static encode(message: Pb_God.PBG2CDanRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDanRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDanRefresh;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDanRefresh;
	}
	/**
	* 王者赛排名信息
	*/
	class PBDanKingTopPlayer {
		constructor();
		/** 用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/** 战斗力*/
		public fightpower:number;
		/** 排名*/
		public rank:number;
		public static encode(message: Pb_God.PBDanKingTopPlayer, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDanKingTopPlayer, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDanKingTopPlayer;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDanKingTopPlayer;
	}
	/**
	* 王者赛记录
	*/
	class PBDanKingRecord {
		constructor();
		/** 赛季ID*/
		public seasonid:number;
		/** 分区ID*/
		public areaid:number;
		/** 排名信息*/
		public topplayer:Pb_God.PBDanKingTopPlayer[];
		public static encode(message: Pb_God.PBDanKingRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDanKingRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDanKingRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDanKingRecord;
	}
	/**
	* 超凡段位赛战斗数据
	*/
	class PBDanBattleMember {
		constructor();
		/**积分*/
		public score:number;
		/**段位ID*/
		public danid:number;
		/**名次*/
		public rank:number;
		/**在进行王者赛(参加过王者赛的玩家无法参加常规赛)*/
		public inkingMatch:boolean;
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**战斗阵容*/
		public battlepet:Pb_God.PBBattlePet;
		/**第二战斗阵容*/
		public battlepet2:Pb_God.PBBattlePet;
		public static encode(message: Pb_God.PBDanBattleMember, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDanBattleMember, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDanBattleMember;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDanBattleMember;
	}
	/**
	* 超凡段位赛战斗多个数据
	*/
	class PBDanBattleMemberMore {
		constructor();
		/** 分区ID*/
		public areaid:number;
		/** 成员信息*/
		public member:Pb_God.PBDanBattleMember[];
		public static encode(message: Pb_God.PBDanBattleMemberMore, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDanBattleMemberMore, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDanBattleMemberMore;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDanBattleMemberMore;
	}
	/**
	* 王者赛多个记录
	*/
	class PBDanKingRecordMore {
		constructor();
		/** 记录*/
		public record:Pb_God.PBDanKingRecord[];
		public static encode(message: Pb_God.PBDanKingRecordMore, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDanKingRecordMore, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDanKingRecordMore;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDanKingRecordMore;
	}
	/**
	* 搜索对手返回
	*/
	class PBG2CDanSearch {
		constructor();
		/**用户display*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**战斗阵容*/
		public battlepet:Pb_God.PBBattlePet;
		/**第二战斗阵容*/
		public battlepet2:Pb_God.PBBattlePet;
		/**段位id*/
		public danid:number;
		/**排行榜名次*/
		public rank:number;
		public static encode(message: Pb_God.PBG2CDanSearch, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDanSearch, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDanSearch;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDanSearch;
	}
	/**
	* 增加个人记录
	*/
	class PBDanAddRecord {
		constructor();
		/** 新的战斗*/
		public new:boolean;
		/** 战斗sn*/
		public battlesn:Long;
		/** 左边display*/
		public left:Pb_God.PBPlayerDisplay;
		/** 右边display*/
		public right:Pb_God.PBPlayerDisplay;
		/** 左边排名*/
		public leftrank:number;
		/** 右边排名*/
		public rightrank:number;
		/** 左边段位*/
		public leftdan:number;
		/** 右边段位*/
		public rightdan:number;
		/** 胜利方0左边1右边*/
		public winner:number;
		/** BattleType_Dan/BattleType_DanKing*/
		public type:number;
		/** 时间*/
		public time:number;
		public static encode(message: Pb_God.PBDanAddRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDanAddRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDanAddRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDanAddRecord;
	}
	/**
	* 查询记录返回
	*/
	class PBG2CDanRecords {
		constructor();
		/**记录*/
		public records:Pb_God.PBPlayerDanRecord[];
		public static encode(message: Pb_God.PBG2CDanRecords, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CDanRecords, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CDanRecords;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CDanRecords;
	}
	/**
	* 查询大师录像
	*/
	class PBG2BWQueryMasterVideo {
		constructor();
		/**world id*/
		public worldid:number;
		/**player id*/
		public playerid:number;
		/**sn*/
		public sn:Long;
		public static encode(message: Pb_God.PBG2BWQueryMasterVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2BWQueryMasterVideo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2BWQueryMasterVideo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2BWQueryMasterVideo;
	}
	/**
	* 大师记录数据
	*/
	class PBDanMasterRecordData {
		constructor();
		/**area id*/
		public areaid:number;
		/**记录*/
		public records:Pb_God.PBPlayerDanRecord[];
		public static encode(message: Pb_God.PBDanMasterRecordData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDanMasterRecordData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDanMasterRecordData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDanMasterRecordData;
	}
	/**
	* 大师录像
	*/
	class PBDanMasterVideoData {
		constructor();
		/**area id*/
		public areaid:number;
		/**录像*/
		public videos:Pb_God.PBFightResult[];
		public static encode(message: Pb_God.PBDanMasterVideoData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBDanMasterVideoData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBDanMasterVideoData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBDanMasterVideoData;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 队伍系统返回
	*/
	enum _emResultTeam_11 {
		// 成功;
		R_ResultTeam_Succeed = 0,
		// 失败;
		R_ResultTeam_Fail = 1,
		// 已有队伍;
		R_ResultTeam_HaveTeam = 2,
		// 没有队伍;
		R_ResultTeam_NoTeam = 3,
		// 不是队长;
		R_ResultTeam_NotLeader = 4,
		// 队伍已满;
		R_ResultTeam_MemberFull = 5,
		// 队伍已经删除;
		R_ResultTeam_HaveDelete = 6,
		// 战斗中;
		R_ResultTeam_InBattle = 7,
		// 进入次数不足;
		R_ResultTeam_NoEnterCount = 8,
	}
	/**
	*----队伍系统
	*/
	enum _emC2S_Team_Protocol {
		//	 创建队伍 			PBC2GTeamCreate	;
		C2S_Team_Create = 0,
		//	 查看队伍列表			PBC2GTeamList;
		C2S_Team_List = 1,
		//	 离开队伍				无内容;
		C2S_Team_Exit = 2,
		//	 踢人					PBU32;
		C2S_Team_Kick = 3,
		//	 加入队伍				PBC2GTeamJoin;
		C2S_Team_Join = 4,
		//	 快速加入队伍			PBC2GTeamJoin;
		C2S_Team_AutoJoin = 5,
		//	 设置队伍状态			PBCAGTeamSetStatus;
		C2S_Team_SetStatus = 6,
		//	 开始挑战				无内容;
		C2S_Team_Start = 7,
		//	 准备挑战				服务器用	PBPlayerBattleInfo;
		C2S_Team_ReadyStart = 8,
	}
	/**
	*----队伍系统
	*/
	enum _emS2C_Team_Protocol {
		//	 通用				通用失败才返回;
		S2C_Team_Common = 0,
		//	 返回队伍列表		PBG2CTeamList;
		S2C_Team_List = 1,
		//	 同步队伍信息		PBTeamData;
		S2C_Team_SynData = 2,
		//	 离开队伍返回;
		S2C_Team_Exit = 3,
		//	 设置队伍状态返回	PBCAGTeamSetStatus;
		S2C_Team_SetStatus = 4,
	}
	/**
	* 队员信息
	*/
	class PBTeamMember {
		constructor();
		/**角色信息*/
		public displayer:Pb_God.PBPlayerDisplay;
		/**战力*/
		public fightpower:Long;
		public static encode(message: Pb_God.PBTeamMember, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTeamMember, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTeamMember;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTeamMember;
	}
	/**
	* 队伍信息
	*/
	class PBTeamData {
		constructor();
		/**队伍ID*/
		public teamid:number;
		/**目标类型*/
		public targettype:number;
		/**队伍目标*/
		public targetid:number;
		/**队长ID*/
		public leaderid:number;
		/**是否队员满自动开启*/
		public fullauto:boolean;
		/**是否时间到自动开启*/
		public timeauto:boolean;
		/**成员列表*/
		public members:Pb_God.PBTeamMember[];
		public static encode(message: Pb_God.PBTeamData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTeamData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTeamData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTeamData;
	}
	/**
	* 队伍基本信息
	*/
	class PBTeamBase {
		constructor();
		/**队伍ID*/
		public teamid:number;
		/**队伍类型*/
		public teamtype:number;
		/**队伍目标*/
		public targetid:number;
		/**成员列表*/
		public leader:Pb_God.PBTeamMember;
		/**队伍人数*/
		public membercount:number;
		public static encode(message: Pb_God.PBTeamBase, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTeamBase, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTeamBase;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTeamBase;
	}
	/**
	* 创建队伍	
	*/
	class PBC2GTeamCreate {
		constructor();
		/**队伍类型*/
		public teamtype:number;
		/**目标ID*/
		public targetid:number;
		public static encode(message: Pb_God.PBC2GTeamCreate, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GTeamCreate, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GTeamCreate;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GTeamCreate;
	}
	/**
	* 加入队伍	
	*/
	class PBC2GTeamJoin {
		constructor();
		/**队伍ID*/
		public teamid:number;
		/**队伍类型*/
		public teamtype:number;
		/**队伍目标*/
		public targetid:number;
		public static encode(message: Pb_God.PBC2GTeamJoin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GTeamJoin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GTeamJoin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GTeamJoin;
	}
	/**
	* 查看所有队伍	
	*/
	class PBC2GTeamList {
		constructor();
		/**队伍类型*/
		public teamtype:number;
		public static encode(message: Pb_God.PBC2GTeamList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GTeamList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GTeamList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GTeamList;
	}
	/**
	* 队伍列表	G -> C
	*/
	class PBG2CTeamList {
		constructor();
		/**队伍列表*/
		public teamlist:Pb_God.PBTeamBase[];
		public static encode(message: Pb_God.PBG2CTeamList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTeamList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTeamList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTeamList;
	}
	/**
	* 设置队伍状态	
	*/
	class PBCAGTeamSetStatus {
		constructor();
		/**是否队员满自动开启*/
		public fullauto:boolean;
		/**是否时间到自动开启*/
		public timeauto:boolean;
		public static encode(message: Pb_God.PBCAGTeamSetStatus, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGTeamSetStatus, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGTeamSetStatus;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGTeamSetStatus;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 远航相关
	*/
	enum _emResultSail_13 {
		//  成功;
		R_ResultSail_Succeed = 0,
		//  失败;
		R_ResultSail_Fail = 1,
		// 扣除的道具不足;
		R_ResultSail_NeedItem = 2,
		// vip等级不足;
		R_ResultSail_NeedVipLevel = 3,
		// 无免费次数;
		R_ResultSail_NoFreeCount = 4,
		// 需要钻石;
		R_ResultSail_NeedDiamond = 5,
		// 无此情报;
		R_ResultSail_NoSail = 6,
		// 需要情报;
		R_ResultSail_NeedSailPoint = 7,
		// 伙伴星星数不足;
		R_ResultSail_NeedPetStar = 8,
		// 伙伴种族不满足;
		R_ResultSail_NeedPetType = 9,
		// 该伙伴已经被使用;
		R_ResultSail_PetHaveUse = 10,
		// 冷却中;
		R_ResultSail_CoolTime = 11,
		// 无冷却时间;
		R_ResultSail_NoTime = 12,
		// 目前没有可领取的奖励;
		R_ResultSail_AwardAllNoData = 13,
	}
	/**
	*----远航模块
	*/
	enum _emC2S_Sail_Protocol {
		// 	 刷新;
		C2S_Sail_Refresh = 1,
		// 	 接取		PBPlayerSailInfo;
		C2S_Sail_Accpet = 2,
		// 	 购买时间	PBU32;
		C2S_Sail_BuyHour = 3,
		// 	 完成		PBU32;
		C2S_Sail_Complete = 4,
		// 	 领取所有;
		C2S_Sail_CompleteAll = 5,
	}
	/**
	*----远航模块
	*/
	enum _emS2C_Sail_Protocol {
		//	 通用错误返回;
		S2C_Sail_Common = 0,
		//	 刷新返回 	PBG2CSailRefresh;
		S2C_Sail_Refresh = 1,
		//	 接取返回		PBPlayerSailInfo;
		S2C_Sail_Accpet = 2,
		//	 完成返回		PBU32;
		S2C_Sail_DelAccpet = 3,
	}
	/**
	* 刷新的数据
	*/
	class PBG2CSailRefresh {
		constructor();
		/** 免费次数*/
		public dayfreecount:number;
		/** 购买次数*/
		public daybuycount:number;
		/** 刷新的数据*/
		public refresh:Pb_God.PBPlayerSailIndex[];
		public static encode(message: Pb_God.PBG2CSailRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CSailRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CSailRefresh;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CSailRefresh;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 聊天系统返回
	*/
	enum _emResultTalk_35 {
		// 成功;
		R_ResultTalk_Succeed = 0,
		// 失败;
		R_ResultTalk_Fail = 1,
		// 需要玩家等级;
		R_ResultTalk_NeedPlayerLevel = 2,
		// 发言过快;
		R_ResultTalk_TalkNeedStep = 3,
		// 发言违规;
		R_ResultTalk_TalkForbid = 4,
	}
	/**
	*----聊天功能模块
	*/
	enum _emC2S_Talk_Protocol {
		//聊天  			PBC2GTalkAsk;
		C2S_Talk_Talk = 1,
		//删除私聊记录		PBU32;
		C2S_Talk_ClearPlayerTalk = 2,
		//  举报			PBC2GReportAsk;
		C2S_Talk_Report = 3,
	}
	/**
	*----聊天功能模块
	*/
	enum _emS2C_Talk_Protocol {
		//聊天  		PBG2CTalkAck;
		S2C_Talk_Talk = 1,
		//同步聊天缓存	PBG2CTalk_SynSaveChat;
		S2C_Talk_SynSaveChat = 2,
		//撤回聊天 PBG2CRecall ;
		S2C_Talk_ChatRecall = 3,
	}
	/**
	* 同步聊天缓存
	*/
	class PBG2CTalk_SynSaveChat {
		constructor();
		/**世界聊天缓存*/
		public worldmsg:Pb_God.PBG2CTalkAck[];
		/**跨服聊天缓存*/
		public crossmsg:Pb_God.PBG2CTalkAck[];
		/**同省聊天*/
		public provincemsg:Pb_God.PBG2CTalkAck[];
		/**帮会聊天*/
		public factionmsg:Pb_God.PBG2CTalkAck[];
		/**私人聊天*/
		public playermsg:Pb_God.PBG2CTalkAck[];
		public static encode(message: Pb_God.PBG2CTalk_SynSaveChat, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTalk_SynSaveChat, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTalk_SynSaveChat;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTalk_SynSaveChat;
	}
	/**
	* 聊天协议
	*/
	class PBC2GTalkAsk {
		constructor();
		/** 频道*/
		public channel:number;
		/** 聊天内容*/
		public data:string;
		/** 聊天内容扩展*/
		public dataext:string;
		/** 指定玩家 只有私人聊天有用*/
		public targetdisplay:Pb_God.PBPlayerDisplay;
		/** 目标的账号名*/
		public taraccountname:string;
		/** 发起者ID*/
		public playerid:number;
		/** 发起者的ip*/
		public senderip:string;
		/** 索引*/
		public order:Long;
		/** 时间*/
		public time:number;
		public static encode(message: Pb_God.PBC2GTalkAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GTalkAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GTalkAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GTalkAsk;
	}
	/**
	* 聊天协议
	*/
	class PBG2CTalkAck {
		constructor();
		/** 说话人 playerid  0代表是 系统*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/** 频道*/
		public channel:number;
		/** 聊天内容*/
		public data:string;
		/** 聊天内容扩展*/
		public dataext:string;
		/** 目标玩家 私聊信息使用*/
		public targetdisplay:Pb_God.PBPlayerDisplay;
		/** 聊天消息序号，用于撤回*/
		public order:number;
		public static encode(message: Pb_God.PBG2CTalkAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTalkAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTalkAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTalkAck;
	}
	/**
	* 聊天协议
	*/
	class PBC2GReportAsk {
		constructor();
		/** 举报者账号*/
		public accout:string;
		/** 举报者玩家ID*/
		public playerid:number;
		/** 举报者角色名*/
		public playername:string;
		/** 举报者服务器id*/
		public serverid:string;
		/** 被举报者玩家id*/
		public rptplayerid:number;
		/** 被举报者角色名*/
		public rptplayername:string;
		/** 被举报者服务器id*/
		public rptserverid:number;
		/** 举报标签*/
		public resons:number[];
		/** 举报说明*/
		public explain:string;
		/** 举报例证*/
		public proof:string;
		public static encode(message: Pb_God.PBC2GReportAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GReportAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GReportAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GReportAsk;
	}
	/**
	* 聊天协议
	*/
	class PBG2CRecall {
		constructor();
		/** 频道*/
		public channel:number;
		/** 消息序号*/
		public order:number;
		/** 发送人id*/
		public senderid:number;
		public static encode(message: Pb_God.PBG2CRecall, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRecall, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRecall;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRecall;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 契约
	*/
	enum _emResultConvenant_44 {
		//  成功;
		R_ResultConvenant_Succeed = 0,
		//  失败;
		R_ResultConvenant_Fail = 1,
		//  未解锁;
		R_ResultConvenant_Lock = 2,
		//  已解锁;
		R_ResultConvenant_UnLock = 3,
		//  道具不足;
		R_ResultConvenant_NeedItem = 4,
		//  已经达到最大等级;
		R_ResultConvenant_MaxLevel = 5,
		//  已经选择了该属性;
		R_ResultConvenant_Select = 6,
		//  选择属性不存在;
		R_ResultConvenant_Index = 7,
	}
	/**
	*--- 客户端到服务器
	*/
	enum _emC2S_Convenant_Protocol {
		//解锁 ;
		C2S_Convenant_UnLock = 0,
		//升级	;
		C2S_Convenant_Levelup = 1,
		//选择属性(id, index 1, 2, 3) PBU32U32;
		C2S_Convenant_Attr = 2,
		//计算战斗力(id) PBU32;
		C2S_Convenant_Power = 3,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_Convenant_Protocol {
		//解锁返回 	;
		S2C_Convenant_UnLock = 0,
		//升级返回 (level) PBU32;
		S2C_Convenant_Levelup = 1,
		//选择属性返回 (id, index 1, 2, 3) PBU32U32;
		S2C_Convenant_Attr = 2,
		//计算战斗力(id, power) PBU32U32;
		S2C_Convenant_Power = 3,
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 冒险系统返回
	*/
	enum _emResultRisk_24 {
		// 成功;
		R_ResultRisk_Succeed = 0,
		// 失败;
		R_ResultRisk_Fail = 1,
		// 已经选择了英雄;
		R_ResultRisk_HaveSelect = 2,
		// 通关层数不对;
		R_ResultRisk_NeedStage = 3,
		// 守卫索引不对;
		R_ResultRisk_NeedGuardIndex = 4,
		// 该伙伴已经死亡;
		R_ResultRisk_PetDead = 5,
		// 该守卫已经死亡;
		R_ResultRisk_GuardDead = 6,
		// 需要前置守卫都通关;
		R_ResultRisk_NeedPreGuardIndex = 7,
		// 击败附近守卫才可以探索;
		R_ResultRisk_GridNoOpen = 8,
		// 守卫未死亡;
		R_ResultRisk_GuardNoDead = 9,
		// 该格子无东西可以探索;
		R_ResultRisk_NoTypeCollect = 10,
		// 无奖励可以领取;
		R_ResultRisk_NoGuardPrize = 11,
		// 生命药剂不足;
		R_ResultRisk_NeedHpDrup = 12,
		// 伙伴血量已满;
		R_ResultRisk_PetMaxHp = 13,
		// 生命药剂最大使用数量;
		R_ResultRisk_MaxUseHpDrup = 14,
		// 驱魂药剂不足;
		R_ResultRisk_NeedKillDrup = 15,
		// 驱魂药剂最大使用数量;
		R_ResultRisk_MaxUseKillDrup = 16,
		// 道具不足;
		R_ResultRisk_NeedItem = 17,
		// 无召唤商人;
		R_ResultRisk_NoTrader = 18,
		// 刷新类型错误;
		R_ResultRisk_RefreshTypeError = 19,
		// 格子已经探索，或者已经删除;
		R_ResultRisk_GridStatSee = 20,
		// 已经答了此题;
		R_ResultRisk_HaveQuestion = 21,
		// 此位置道具已经购买;
		R_ResultRisk_ShopHaveBuyPos = 22,
	}
	/**
	*----冒险模块
	*/
	enum _emC2S_Risk_Protocol {
		//选择英雄				PBC2GRiskSelectPet	;
		C2S_Risk_SelectPet = 1,
		//打开界面;
		C2S_Risk_Open = 2,
		//开启格子				PBU32;
		C2S_Risk_OpenGrid = 3,
		//拾取格子				PBC2GRiskCoolectGridAsk;
		C2S_Risk_CollectGrid = 4,
		//自动拾取(守卫索引)	PBU32;
		C2S_Risk_AutoCollectGrid = 5,
		//进入下一层;
		C2S_Risk_EnterNextStage = 6,
		//领取守卫奖励;
		C2S_Risk_GuardPrize = 7,
		//使用生命药剂			PBU64;
		C2S_Risk_UseHpDrug = 8,
		//使用驱魂药剂			PBU32;
		C2S_Risk_UseKillDrug = 9,
		//使用召唤商人;
		C2S_Risk_UseTrader = 10,
		//答题					PBC2GRiskQuestionAsk;
		C2S_Risk_Question = 11,
		//打开商店;
		C2S_Risk_ShopOpen = 12,
		//商店购买(索引)		PBU32;
		C2S_Risk_ShopBuy = 13,
		//查询被动技能;
		C2S_Risk_OpenSkill = 14,
	}
	/**
	*----冒险模块
	*/
	enum _emS2C_Risk_Protocol {
		//通用返回(失败才返回);
		S2C_Risk_CommonAck = 1,
		//同步所有信息 	PBG2CSynAll;
		S2C_Risk_SynAll = 2,
		//新增格子信息 	PBG2CRiskSynGrid;
		S2C_Risk_AddGrid = 3,
		//拾取格子返回		PBPlayerRiskGrid;
		S2C_Risk_CollectGrid = 4,
		//进入下一层		PBG2CRiskEnterNextStage;
		S2C_Risk_EnterNextStage = 5,
		//领取守卫奖励		PBU32;
		S2C_Risk_GuardPrize = 6,
		//同步伙伴血量 	PBPetHp;
		S2C_Risk_SynPetHp = 7,
		//同步守卫血量 	PBU32U64;
		S2C_Risk_SynGuardHp = 8,
		//同步生命药剂 		PBG2CRiskSynHpDrug;
		S2C_Risk_SynHpDrug = 9,
		//同步驱魂药剂 	PBG2CRiskSynKillDrug;
		S2C_Risk_SynKillDrug = 10,
		//同步击杀守卫个数 PBU32;
		S2C_Risk_SynKillGuard = 11,
		//同步召唤商人数量 PBU32;
		S2C_Risk_SynTrader = 12,
		//使用召唤商人 	PBG2CRiskUseTrader	;
		S2C_Risk_UseTrader = 13,
		//答题返回			PBG2CRiskQuestionAck;
		S2C_Risk_QuestionAck = 14,
		//打开商店			PBG2CRiskShopOpenAck;
		S2C_Risk_ShopOpenAck = 15,
		//商店购买(位置1开始)	PBU32;
		S2C_Risk_ShopBuyAck = 16,
		//同步被动技能 	PBG2CRiskCollectSkill;
		S2C_Risk_SynCollectSkill = 17,
	}
	/**
	*------------------------------ 冒险组随机类型
	*/
	enum _emRiskRandType {
		//	单个随机;
		RiskRandType_Single = 1,
		//	组随机;
		RiskRandType_Group = 2,
		//	固定;
		RiskRandType_Fix = 3,
	}
	/**
	*------------------------------ 冒险格子开启类型
	*/
	enum _emRiskGridOpenState {
		//	默认;
		RiskGridOpenState_None = 0,
		//	开启;
		RiskGridOpenState_OpenNoSee = 1,
		//	固定;
		RiskGridOpenState_OpenSee = 2,
		//	已经拾取;
		RiskGridOpenState_HaveCollect = 3,
	}
	/**
	*------------------------------ 冒险组随机类型
	*/
	enum _emRiskRefreshType {
		//	金币;
		RiskRefreshType_Gold = 1,
		//	符文精华;
		RiskRefreshType_Rune = 2,
		//	炼神石;
		RiskRefreshType_GodStone = 3,
		//	钥匙;
		RiskRefreshType_Key = 4,
		//	宝箱;
		RiskRefreshType_Box = 5,
		//	猜拳;
		RiskRefreshType_Finger = 6,
		//	商店;
		RiskRefreshType_Shop = 7,
		//	召唤商人;
		RiskRefreshType_Trader = 8,
		//	答题;
		RiskRefreshType_Question = 9,
		//	对话;
		RiskRefreshType_Dialog = 10,
		//	神秘事件;
		RiskRefreshType_Event = 11,
		//	被动技能;
		RiskRefreshType_Skill = 12,
		//	生命药剂;
		RiskRefreshType_HpDrup = 13,
		//	驱魂药剂;
		RiskRefreshType_KillDrug = 14,
		//	普通守卫1;
		RiskRefreshType_GuardNormal1 = 15,
		//	普通守卫2;
		RiskRefreshType_GuardNormal2 = 16,
		//	普通守卫3;
		RiskRefreshType_GuardNormal3 = 17,
		//	普通守卫4;
		RiskRefreshType_GuardNormal4 = 18,
		//	BOSS守卫;
		RiskRefreshType_GuardBoss = 19,
		//	传送门;
		RiskRefreshType_Transfer = 20,
	}
	/**
	*------------------------------ 猜拳结果
	*/
	enum _emRiskFingerResult {
		//	平局;
		RiskFingerResult_Equal = 0,
		//	胜利;
		RiskFingerResult_Success = 1,
		//	失败;
		RiskFingerResult_Fail = 2,
	}
	/**
	*------------------------------ 结果
	*/
	enum _emRiskQuestionResult {
		//	默认;
		RiskQuestionResult_None = 0,
		//	胜利;
		RiskQuestionResult_Success = 1,
		//	失败;
		RiskQuestionResult_Fail = 2,
	}
	/**
	*------------------------------ 冒险伙伴显示
	*/
	class PBRiskPetDisplay {
		constructor();
		/** 伙伴显示信息*/
		public petdisplay:Pb_God.PBPetDisplay;
		/** 当前血量*/
		public curhp:Long;
		/** 最大血量*/
		public maxhp:Long;
		/** 战斗力*/
		public fightpower:number;
		public static encode(message: Pb_God.PBRiskPetDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRiskPetDisplay, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRiskPetDisplay;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRiskPetDisplay;
	}
	/**
	* 同步所有信息
	*/
	class PBG2CSynAll {
		constructor();
		/** 当前层数*/
		public curstage:number;
		/** 已经击杀守卫个数*/
		public killguardcount:number;
		/** 领取的奖励ID*/
		public guardprize:number;
		/** 生命药剂数量*/
		public hpdrupcount:number;
		/** 使用生命药剂数量*/
		public usehpdrupcount:number;
		/** 驱魂药剂数量*/
		public killdrupcount:number;
		/** 使用驱魂药剂数量*/
		public usekilldrupcount:number;
		/** 召唤商人数量*/
		public tradercount:number;
		/** 开启的格子信息*/
		public gridinfo:Pb_God.PBPlayerRiskGrid[];
		/** 守卫血量(位置12345)*/
		public guardhp:Pb_God.PBU32U64[];
		/** 伙伴显示信息*/
		public petdisplay:Pb_God.PBRiskPetDisplay[];
		public static encode(message: Pb_God.PBG2CSynAll, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CSynAll, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CSynAll;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CSynAll;
	}
	/**
	* 拾取格子请求
	*/
	class PBC2GRiskCoolectGridAsk {
		constructor();
		/** 格子ID*/
		public grid:number;
		/** 参数1*/
		public param1:number;
		/** 参数2*/
		public param2:number;
		public static encode(message: Pb_God.PBC2GRiskCoolectGridAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GRiskCoolectGridAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GRiskCoolectGridAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GRiskCoolectGridAsk;
	}
	/**
	* 同步被动技能
	*/
	class PBG2CRiskCollectSkill {
		constructor();
		/** 被动技能*/
		public skillinfo:Pb_God.PBSkillInfo[];
		public static encode(message: Pb_God.PBG2CRiskCollectSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRiskCollectSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRiskCollectSkill;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRiskCollectSkill;
	}
	/**
	* 打开商店返回
	*/
	class PBG2CRiskShopOpenAck {
		constructor();
		/** 冒险商店*/
		public shopindex:Pb_God.PBU32U32[];
		/** 冒险商店购买的索引*/
		public shopbuypos:number[];
		public static encode(message: Pb_God.PBG2CRiskShopOpenAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRiskShopOpenAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRiskShopOpenAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRiskShopOpenAck;
	}
	/**
	* 答题返回
	*/
	class PBG2CRiskQuestionAck {
		constructor();
		/** 格子*/
		public grid:number;
		/** 答题索引*/
		public index:number;
		/** 选项123*/
		public option:number;
		/** 正确答案*/
		public result:number;
		public static encode(message: Pb_God.PBG2CRiskQuestionAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRiskQuestionAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRiskQuestionAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRiskQuestionAck;
	}
	/**
	* 答题请求
	*/
	class PBC2GRiskQuestionAsk {
		constructor();
		/** 格子*/
		public grid:number;
		/** 答题索引*/
		public index:number;
		/** 选项123*/
		public option:number;
		public static encode(message: Pb_God.PBC2GRiskQuestionAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GRiskQuestionAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GRiskQuestionAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GRiskQuestionAsk;
	}
	/**
	* 使用召唤商人
	*/
	class PBG2CRiskUseTrader {
		constructor();
		/** 商品信息*/
		public shopindex:Pb_God.PBU32U32[];
		/** 当前召唤商人数量*/
		public tradercount:number;
		public static encode(message: Pb_God.PBG2CRiskUseTrader, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRiskUseTrader, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRiskUseTrader;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRiskUseTrader;
	}
	/**
	* 同步生命药剂
	*/
	class PBG2CRiskSynHpDrug {
		constructor();
		/** 生命药剂数量*/
		public hpdrupcount:number;
		/** 使用生命药剂数量*/
		public usehpdrupcount:number;
		public static encode(message: Pb_God.PBG2CRiskSynHpDrug, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRiskSynHpDrug, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRiskSynHpDrug;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRiskSynHpDrug;
	}
	/**
	* 同步驱魂药剂
	*/
	class PBG2CRiskSynKillDrug {
		constructor();
		/** 驱魂药剂数量*/
		public killdrupcount:number;
		/** 使用驱魂药剂数量*/
		public usekilldrupcount:number;
		public static encode(message: Pb_God.PBG2CRiskSynKillDrug, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRiskSynKillDrug, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRiskSynKillDrug;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRiskSynKillDrug;
	}
	/**
	* 选择英雄
	*/
	class PBC2GRiskSelectPet {
		constructor();
		/** 伙伴sn*/
		public petsn:Long[];
		public static encode(message: Pb_God.PBC2GRiskSelectPet, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GRiskSelectPet, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GRiskSelectPet;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GRiskSelectPet;
	}
	/**
	* 同步格子信息
	*/
	class PBG2CRiskSynGrid {
		constructor();
		/** 格子信息*/
		public gridinfo:Pb_God.PBPlayerRiskGrid[];
		public static encode(message: Pb_God.PBG2CRiskSynGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRiskSynGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRiskSynGrid;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRiskSynGrid;
	}
	/**
	* 同步血量
	*/
	class PBG2CRiskSynHp {
		constructor();
		/** 伙伴血量*/
		public pethp:Pb_God.PBPetHp[];
		/** 守卫血量*/
		public guardhp:Pb_God.PBPetHp[];
		public static encode(message: Pb_God.PBG2CRiskSynHp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRiskSynHp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRiskSynHp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRiskSynHp;
	}
	/**
	* 进入下一层
	*/
	class PBG2CRiskEnterNextStage {
		constructor();
		/** 当前层数*/
		public curstage:number;
		/** 累计道具信息*/
		public iteminfo:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBG2CRiskEnterNextStage, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRiskEnterNextStage, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRiskEnterNextStage;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRiskEnterNextStage;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 跨服天梯相关
	*/
	enum _emResultLadder_26 {
		//  成功;
		R_ResultLadder_Succeed = 0,
		//  失败;
		R_ResultLadder_Fail = 1,
		//  冷却中;
		R_ResultLadder_Cooling = 2,
		//  挑战次数不足;
		R_ResultLadder_NeedFightCount = 3,
		//  该玩家正在进行一场战斗，请稍后再试;
		R_ResultLadder_InFighting = 4,
		//  道具不足;
		R_ResultLadder_NeedItem = 5,
		//  不在开启时间内;
		R_ResultLadder_NeedOpenTime = 6,
		//  达到最大购买次数;
		R_ResultLadder_MaxBuyCount = 7,
		//  玩家不存在;
		R_ResultLadder_NoPlayer = 8,
		//  已经点过赞了;
		R_ResultLadder_Like = 9,
		//  不在排名内;
		R_ResultLadder_NotInRank = 10,
		//  需要VIP等级;
		R_ResultLadder_NeedVIP = 11,
	}
	/**
	*----客户端到服务器
	*/
	enum _emC2S_Ladder_Protocol {
		//打开			PBG2BWOpenAsk;
		C2S_Ladder_Open = 1,
		//刷新对手 	PBPlayerQuery;
		C2S_Ladder_Refresh = 2,
		//购买次数		PBU32;
		C2S_Ladder_BuyCount = 3,
		//一键挑战;
		C2S_Ladder_FightOneKey = 4,
		//英雄殿;
		C2S_Ladder_HeroTop = 5,
		//点赞英雄殿	PBC2GLike;
		C2S_Ladder_HeroTopLike = 6,
		//查询我的记录;
		C2S_Ladder_QueryRecord = 7,
		//查询大神记录	PBPlayerQuery;
		C2S_Ladder_QueryPublicRecord = 8,
		//查询玩家数据 PBLadderQueryPlayerInfo;
		C2S_Ladder_QueryPlayerInfo = 9,
		//战斗开始	PBFightBase;
		G2BW_Ladder_FightBegin = 50,
		//战斗结束	PBFightResult;
		G2BW_Ladder_FightResult = 51,
		//点赞英雄殿	PBG2BWLike;
		G2BW_Ladder_Like = 52,
		//英雄殿	PBPlayerQuery;
		G2BW_Ladder_QueryHeroTop = 53,
		//更新防守阵容;
		G2BW_Ladder_UpdateDefense = 54,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_Ladder_Protocol {
		//失败才返回;
		S2C_Ladder_CommonAck = 0,
		//同步信息			PBG2CLadderSynInfo	;
		S2C_Ladder_SynInfo = 1,
		//刷新对手返回		PBG2CLadderRefreshAck;
		S2C_Ladder_RefreshAck = 2,
		//购买次数返回		PBU32;
		S2C_Ladder_BuyCountAck = 3,
		//同步挑战从数		PBU32;
		S2C_Ladder_SynFightCount = 4,
		//战斗结果			PBG2CLadderResult;
		S2C_Ladder_FightResult = 5,
		//英雄殿返回		PBG2CLadderHeroTopAck;
		S2C_Ladder_HeroTopAck = 6,
		//查询我的记录返回	PBG2CLadderRecordAck;
		S2C_Ladder_RecordAck = 7,
		//查询大神记录返回	PBLadderPublicAllRecord;
		S2C_Ladder_PublicRecordAck = 8,
		//同步次数			PBU32;
		S2C_Ladder_SynCountAck = 9,
		//点赞英雄殿返回	PBG2CLike;
		S2C_Ladder_HeroTopLikeACK = 10,
		//查询玩家数据返回  PBLadderPlayerInfo;
		S2C_Ladder_QueryPlayerInfo = 11,
		//战斗开始	PBFightBase;
		BW2G_Ladder_FightBeginAck = 51,
		//同步刷新对手	PBBW2GSynRefreshRank;
		BW2G_Ladder_SynRefreshRank = 52,
		//点赞英雄殿返回	PBG2CLike;
		BW2G_Ladder_Like = 53,
		//检查竞技场排名返回;
		W2G_Ladder_CheckRank = 54,
	}
	/**
	*查询我的记录返回
	*/
	class PBG2CLadderRecordAck {
		constructor();
		/** 记录*/
		public record:Pb_God.PBPlayerLadderRecord[];
		public static encode(message: Pb_God.PBG2CLadderRecordAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLadderRecordAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLadderRecordAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLadderRecordAck;
	}
	/**
	*战斗结果
	*/
	class PBG2BWOpenAsk {
		constructor();
		/** 玩家ID*/
		public playerid:number;
		/** 世界ID*/
		public worldid:number;
		/** 刷新名次*/
		public rank:number[];
		public static encode(message: Pb_God.PBG2BWOpenAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2BWOpenAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2BWOpenAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2BWOpenAsk;
	}
	/**
	*战斗结果
	*/
	class PBBW2GSynRefreshRank {
		constructor();
		/** 名次*/
		public rank:number[];
		public static encode(message: Pb_God.PBBW2GSynRefreshRank, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBW2GSynRefreshRank, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBW2GSynRefreshRank;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBW2GSynRefreshRank;
	}
	/**
	*英雄殿
	*/
	class PBLadderHeroTop {
		constructor();
		/**显示*/
		public display:Pb_God.PBPlayerDisplay;
		/**公会名称*/
		public factionname:string;
		/**点赞次数*/
		public likecount:number;
		public static encode(message: Pb_God.PBLadderHeroTop, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLadderHeroTop, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLadderHeroTop;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLadderHeroTop;
	}
	/**
	*英雄殿返回
	*/
	class PBG2CLadderHeroTopAck {
		constructor();
		/**英雄殿*/
		public herotop:Pb_God.PBLadderHeroTop[];
		public static encode(message: Pb_God.PBG2CLadderHeroTopAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLadderHeroTopAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLadderHeroTopAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLadderHeroTopAck;
	}
	/**
	*对手基本信息
	*/
	class PBLadderObject {
		constructor();
		/** 机器人ID/玩家ID*/
		public id:number;
		/** 是否是机器人*/
		public param:number;
		/** 显示*/
		public display:Pb_God.PBPlayerDisplay;
		/** 排名*/
		public rank:number;
		/** 战斗力*/
		public fightpower:number;
		/** 防守信息*/
		public defense:Pb_God.PBBattlePet;
		/** 公会名*/
		public factionname:string;
		/** 攻击时间*/
		public fighttime:number;
		/** 点赞数*/
		public like:number;
		public static encode(message: Pb_God.PBLadderObject, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLadderObject, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLadderObject;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLadderObject;
	}
	/**
	*大神记录
	*/
	class PBLadderPublicRecord {
		constructor();
		/**流水号*/
		public battlesn:Long;
		/**流水号*/
		public time:number;
		/**胜利者显示*/
		public windisplay:Pb_God.PBPlayerDisplay;
		/**胜利者排名*/
		public winrank:number;
		/**失败者显示*/
		public faildisplay:Pb_God.PBPlayerDisplay;
		/**失败者排名*/
		public failrank:number;
		public static encode(message: Pb_God.PBLadderPublicRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLadderPublicRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLadderPublicRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLadderPublicRecord;
	}
	/**
	*大神所有记录
	*/
	class PBLadderPublicAllRecord {
		constructor();
		/**组ID*/
		public groupid:number;
		/**大神记录*/
		public record:Pb_God.PBLadderPublicRecord[];
		public static encode(message: Pb_God.PBLadderPublicAllRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLadderPublicAllRecord, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLadderPublicAllRecord;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLadderPublicAllRecord;
	}
	/**
	*保存排行
	*/
	class PBLadderObjectSave {
		constructor();
		/**跨服组*/
		public groupid:number;
		/**排名*/
		public orderid:number;
		/**对手基本信息*/
		public target:Pb_God.PBLadderObject[];
		public static encode(message: Pb_God.PBLadderObjectSave, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLadderObjectSave, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLadderObjectSave;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLadderObjectSave;
	}
	/**
	*同步信息返回
	*/
	class PBG2CLadderSynInfo {
		constructor();
		/**自己名次*/
		public order:number;
		/**刷新的目标信息*/
		public target:Pb_God.PBLadderObject[];
		public static encode(message: Pb_God.PBG2CLadderSynInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLadderSynInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLadderSynInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLadderSynInfo;
	}
	/**
	*对手信息返回
	*/
	class PBG2CLadderTopInfo {
		constructor();
		/**自己名次*/
		public order:number;
		/**积分*/
		public score:number;
		public static encode(message: Pb_God.PBG2CLadderTopInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLadderTopInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLadderTopInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLadderTopInfo;
	}
	/**
	*刷新对手信息返回
	*/
	class PBG2CLadderRefreshAck {
		constructor();
		/**对手基本信息*/
		public target:Pb_God.PBLadderObject[];
		/**下次刷新时间*/
		public nextrefreshtime:number;
		public static encode(message: Pb_God.PBG2CLadderRefreshAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLadderRefreshAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLadderRefreshAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLadderRefreshAck;
	}
	/**
	*查看排行榜
	*/
	class PBC2GLadderTopList {
		constructor();
		/**开始名次*/
		public begin:number;
		/**结束名次*/
		public end:number;
		public static encode(message: Pb_God.PBC2GLadderTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GLadderTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GLadderTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GLadderTopList;
	}
	/**
	*战斗结果
	*/
	class PBG2WLadderFightResult {
		constructor();
		/**挑战ID*/
		public id:Long;
		/**战斗结果 _emBattleResult*/
		public result:number;
		/**奖励信息*/
		public iteminfo:Pb_God.PBItem[];
		public static encode(message: Pb_God.PBG2WLadderFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2WLadderFightResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2WLadderFightResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2WLadderFightResult;
	}
	/**
	*真正开始
	*/
	class PBW2GLadderRealBegin {
		constructor();
		/**目标ID*/
		public id:Long;
		public static encode(message: Pb_God.PBW2GLadderRealBegin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2GLadderRealBegin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2GLadderRealBegin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2GLadderRealBegin;
	}
	/**
	*战斗结果
	*/
	class PBLadderResultInfo {
		constructor();
		/**显示*/
		public display:Pb_God.PBPlayerDisplay;
		/**最新积分*/
		public score:number;
		/**改变积分*/
		public addscore:number;
		public static encode(message: Pb_God.PBLadderResultInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLadderResultInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLadderResultInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLadderResultInfo;
	}
	/**
	*战斗结果
	*/
	class PBG2CLadderResult {
		constructor();
		/**挑战sn*/
		public battlesn:Long;
		/**挑战类型*/
		public battletype:number;
		/**挑战ID*/
		public id:number;
		/**参数*/
		public param:number;
		/**战斗结果 _emBattleResult*/
		public result:number;
		/**奖励信息*/
		public iteminfo:Pb_God.PBItemInfo[];
		/**友方*/
		public friend:Pb_God.PBLadderResultInfo;
		/**敌方*/
		public enermy:Pb_God.PBLadderResultInfo;
		public static encode(message: Pb_God.PBG2CLadderResult, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLadderResult, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLadderResult;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLadderResult;
	}
	/**
	*点赞
	*/
	class PBC2GLike {
		constructor();
		/**点赞player id*/
		public likeplayerid:number;
		/**是否是机器人*/
		public robot:boolean;
		public static encode(message: Pb_God.PBC2GLike, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GLike, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GLike;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GLike;
	}
	/**
	*点赞
	*/
	class PBG2BWLike {
		constructor();
		/**player id*/
		public playerid:number;
		/**world id*/
		public worldid:number;
		/**点赞player id*/
		public likeplayerid:number;
		/**是否是机器人*/
		public robot:boolean;
		public static encode(message: Pb_God.PBG2BWLike, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2BWLike, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2BWLike;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2BWLike;
	}
	/**
	*点赞
	*/
	class PBG2CLike {
		constructor();
		/**player id*/
		public playerid:number;
		/**是否是机器人*/
		public robot:boolean;
		/**点赞数*/
		public likes:number;
		public static encode(message: Pb_God.PBG2CLike, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLike, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLike;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLike;
	}
	/**
	*查询玩家信息
	*/
	class PBLadderQueryPlayerInfo {
		constructor();
		/** 玩家ID/机器人ID*/
		public playerid:number;
		/** 是否是机器人*/
		public robot:boolean;
		public static encode(message: Pb_God.PBLadderQueryPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLadderQueryPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLadderQueryPlayerInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLadderQueryPlayerInfo;
	}
	/**
	*查询玩家信息
	*/
	class PBG2BWLadderQueryPlayerInfo {
		constructor();
		/**player id*/
		public playerid:number;
		/**world id*/
		public worldid:number;
		/** 玩家ID/机器人ID*/
		public queryplayerid:number;
		/** 是否是机器人*/
		public robot:boolean;
		public static encode(message: Pb_God.PBG2BWLadderQueryPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2BWLadderQueryPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2BWLadderQueryPlayerInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2BWLadderQueryPlayerInfo;
	}
	/**
	*玩家信息
	*/
	class PBLadderPlayerInfo {
		constructor();
		/** player display*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/** 防守阵容*/
		public defense:Pb_God.PBBattlePet;
		/** 排名*/
		public rank:number;
		/** 战斗力*/
		public fightpower:number;
		/** 公会名*/
		public factionname:string;
		/** 点赞数*/
		public like:number;
		public static encode(message: Pb_God.PBLadderPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLadderPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLadderPlayerInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLadderPlayerInfo;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 排行榜相关
	*/
	enum _emResultTopList_8 {
		//  成功;
		R_ResultTopList_Succeed = 0,
		//  失败;
		R_ResultTopList_Fail = 1,
		//  无此玩家;
		R_ResultTopList_NoPlayer = 2,
	}
	/**
	*----排行榜
	*/
	enum _emC2S_TopList_Protocol {
		//请求排行榜列表 PBC2GTopListList;
		C2S_TopList_List = 0,
		//请求所有世界排行;
		C2S_TopList_WorldAll = 1,
		//请求所有跨服排行;
		C2S_TopList_BWAll = 2,
		//请求自己排名信息 PBC2GGetSelf;
		C2S_TopList_GetSelf = 3,
		//请求奖励索引	PBC2GGetSelf;
		C2S_TopList_RewardID = 4,
	}
	/**
	*----排行榜
	*/
	enum _emS2C_TopList_Protocol {
		//排行榜列表返回	PBS2CTopListList	;
		S2C_TopList_List_Ack = 0,
		//帮派排行榜列表返回	PBS2CFactionTopList;
		S2C_TopList_FactionList_Ack = 1,
		//所有世界排行	PBS2CAllTopList;
		S2C_TopList_WorldAll_Ack = 2,
		//所有跨服排行	PBS2CAllTopList;
		S2C_TopList_BWAll_Ack = 3,
		//自己排名信息	PBTopListDetail;
		S2C_TopList_GetSelf_Ack = 4,
		//返回奖励索引	PBS2CRewardID ;
		S2C_TopList_RewardID = 5,
	}
	/**
	* 请求所有排行榜返回
	*/
	class PBS2CAllTopList {
		constructor();
		/**所有排行信息*/
		public detail:Pb_God.PBTopListDetail[];
		/**帮派信息 */
		public factiontop:Pb_God.PBFactionTop;
		public static encode(message: Pb_God.PBS2CAllTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBS2CAllTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBS2CAllTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBS2CAllTopList;
	}
	/**
	*排行榜公共数据
	*/
	class PBTopListCommonData {
		constructor();
		/**战斗力*/
		public fightpower:number;
		public static encode(message: Pb_God.PBTopListCommonData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTopListCommonData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTopListCommonData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTopListCommonData;
	}
	/**
	*竞技场数据
	*/
	class PBTopListChallengeData {
		constructor();
		/**点赞次数*/
		public likeNum:number;
		public static encode(message: Pb_God.PBTopListChallengeData, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTopListChallengeData, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTopListChallengeData;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTopListChallengeData;
	}
	/**
	*排行信息
	*/
	class PBTopListDetail {
		constructor();
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**排行数值*/
		public info:Pb_God.PBTopListInfo;
		/**一些公用数据*/
		public commonData:Pb_God.PBTopListCommonData;
		/**竞技场数据*/
		public challengeData:Pb_God.PBTopListChallengeData;
		public static encode(message: Pb_God.PBTopListDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTopListDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTopListDetail;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTopListDetail;
	}
	/**
	* 请求排行榜列表
	*/
	class PBC2GTopListList {
		constructor();
		/**排行类型 _emTopListType*/
		public type:number;
		/**开始排行*/
		public beginorder:number;
		/**请求数量*/
		public count:number;
		/**玩家ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		/**帮派ID*/
		public factionid:number;
		/**param*/
		public param:number;
		public static encode(message: Pb_God.PBC2GTopListList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GTopListList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GTopListList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GTopListList;
	}
	/**
	* 请求自己排名信息
	*/
	class PBC2GGetSelf {
		constructor();
		/**排行类型 _emTopListType*/
		public type:number;
		public static encode(message: Pb_God.PBC2GGetSelf, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GGetSelf, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GGetSelf;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GGetSelf;
	}
	/**
	*请求排行榜列表 返回
	*/
	class PBS2CTopListList {
		constructor();
		/**前端发过来的请求信息(方便前端 做界面处理)*/
		public ask:Pb_God.PBC2GTopListList;
		/**入榜的全部角色数量*/
		public allcount:number;
		/**角色列表*/
		public list:Pb_God.PBTopListDetail[];
		/**自己信息*/
		public selfinfo:Pb_God.PBTopListDetail;
		public static encode(message: Pb_God.PBS2CTopListList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBS2CTopListList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBS2CTopListList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBS2CTopListList;
	}
	/**
	*跨服排行信息
	*/
	class PBBWTopListDetail {
		constructor();
		/**用户标记*/
		public playerdisplay:Pb_God.PBPlayerDisplay;
		/**排行数值*/
		public value:number;
		/**排行*/
		public rank:number;
		/**排行类型*/
		public toptype:number;
		/**一些公用数据*/
		public commondata:Pb_God.PBTopListCommonData;
		public static encode(message: Pb_God.PBBWTopListDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBBWTopListDetail, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBBWTopListDetail;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBBWTopListDetail;
	}
	/**
	*跨服同步排行榜 返回
	*/
	class PBW2BWSynTopList {
		constructor();
		/**排行类型 _emTopListType*/
		public type:number;
		/**世界ID*/
		public worldid:number;
		/**角色列表*/
		public list:Pb_God.PBBWTopListDetail[];
		public static encode(message: Pb_God.PBW2BWSynTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2BWSynTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2BWSynTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2BWSynTopList;
	}
	/**
	*查询所有排行
	*/
	class PBW2BWQueryAllTopList {
		constructor();
		/**玩家ID*/
		public playerid:number;
		/**世界ID*/
		public worldid:number;
		public static encode(message: Pb_God.PBW2BWQueryAllTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2BWQueryAllTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2BWQueryAllTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2BWQueryAllTopList;
	}
	/**
	*所在榜单排名奖励ID
	*/
	class PBS2CRewardID {
		constructor();
		/**排行类型 _emTopListType*/
		public type:number;
		/**榜单奖励索引*/
		public RewardID:number;
		public static encode(message: Pb_God.PBS2CRewardID, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBS2CRewardID, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBS2CRewardID;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBS2CRewardID;
	}
}
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

declare namespace Pb_God {
	/**
	*创建角色
	*/
	class PBCreateRole {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**账号名*/
		public accountName:string;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**登录方式*/
		public loginType:number;
		/**登录渠道*/
		public loginChannel:number;
		/**客户端所在ip*/
		public vClientIp:string;
		public static encode(message: Pb_God.PBCreateRole, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCreateRole, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCreateRole;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCreateRole;
	}
	/**
	*角色登陆
	*/
	class PBRoleLogin {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**用户名称*/
		public accontName:string;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**登录渠道*/
		public loginChannel:number;
		/**客户端所在ip*/
		public vClientIp:string;
		/**角色VIP等级*/
		public vipLevel:number;
		/**角色等级*/
		public iRoleLevel:number;
		/**角色战力*/
		public iRoleFight:number;
		/**角色金币数*/
		public iJinbi:number;
		/**角色钻石数量*/
		public izuanshi:number;
		/**角色经验数量*/
		public expNum:number;
		/**角色创建的时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtCreateTime:string;
		/**角色创角天数*/
		public cerateRoleDays:number;
		public static encode(message: Pb_God.PBRoleLogin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRoleLogin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRoleLogin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRoleLogin;
	}
	/**
	*角色登出
	*/
	class PBRoleLogout {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**用户名称*/
		public accontName:string;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**登录时间*/
		public loginTime:string;
		/**登录渠道*/
		public loginChannel:number;
		/**客户端所在ip*/
		public vClientIp:string;
		/**角色VIP等级*/
		public vipLevel:number;
		/**角色等级*/
		public iRoleLevel:number;
		/**角色战力*/
		public iRoleFight:number;
		/**角色金币数*/
		public iJinbi:number;
		/**角色钻石数量*/
		public izuanshi:number;
		/**角色经验数量*/
		public expNum:number;
		/**本次在线时间*/
		public onlineTime:number;
		public static encode(message: Pb_God.PBRoleLogout, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRoleLogout, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRoleLogout;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRoleLogout;
	}
	/**
	*角色等级
	*/
	class PBLevelUp {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**角色等级*/
		public iRoleLevel:number;
		/**升级原因*/
		public iOperateType:number;
		/**开始经验*/
		public beginExpNum:number;
		/**增加经验*/
		public addExpNum:number;
		/**结束后经验*/
		public endExpNum:number;
		/**变动后等级*/
		public endLevel:number;
		/**经验道具id*/
		public itemID:number;
		/**经验道具个数*/
		public itemNum:number;
		public static encode(message: Pb_God.PBLevelUp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBLevelUp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBLevelUp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBLevelUp;
	}
	/**
	*在线人数
	*/
	class PBOnlineCount {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**当前在线帐号数量*/
		public iAccountCount:number;
		public static encode(message: Pb_God.PBOnlineCount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBOnlineCount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBOnlineCount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBOnlineCount;
	}
	/**
	*充值
	*/
	class PBRecharge {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**角色等级*/
		public iRoleLevel:number;
		/**流水号*/
		public vSN:string;
		/**充值时间*/
		public ts:number;
		/**充值金额(单位人民币分)*/
		public iPayDelta:number;
		/**变化前钻石数量*/
		public beginZuanShi:number;
		/**变化钻石数量*/
		public addZuanShi:number;
		/**变化后钻石数量*/
		public endZuanShi:number;
		/**充值渠道*/
		public chargeChannel:number;
		/**设备id*/
		public deviceID:number;
		/**来源*/
		public doingtype:number;
		/**vip等級*/
		public vipLevel:number;
		/**购买礼包ID*/
		public goodsId:number;
		/**购买礼包名称*/
		public goodsName:string;
		/**充值方式（微信。。）*/
		public rechargeMode:string;
		/**累计充值金额*/
		public rechargeAmount:number;
		/**累计充值次数*/
		public rechargeCount:number;
		/**充值IP*/
		public player_ip:string;
		public static encode(message: Pb_God.PBRecharge, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRecharge, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRecharge;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRecharge;
	}
	/**
	*任务日志
	*/
	class PBTaskLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**角色等级*/
		public iRoleLevel:number;
		/**任务Id*/
		public taskId:number;
		/**任务类型 5日环 10周环*/
		public taskType:number;
		/**登录渠道*/
		public loginChannel:number;
		public static encode(message: Pb_God.PBTaskLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTaskLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTaskLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTaskLog;
	}
	/**
	*获得物品
	*/
	class PBReceiveGoods {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**操作类型*/
		public iOperateType:number;
		/**物品ID*/
		public goodsId:number;
		/**获得的数量*/
		public count:number;
		/**是否绑定(0:不绑定 1:绑定)*/
		public bindtype:number;
		/**装备属性*/
		public equipprop:string;
		public static encode(message: Pb_God.PBReceiveGoods, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBReceiveGoods, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBReceiveGoods;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBReceiveGoods;
	}
	/**
	*使用物品
	*/
	class PBUseGoods {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**操作类型*/
		public iOperateType:number;
		/**物品ID*/
		public goodsId:number;
		/**物品名称*/
		public goodsName:string;
		/**获得的数量*/
		public count:number;
		/**动作后格子数量*/
		public positionItemNum:number;
		public static encode(message: Pb_God.PBUseGoods, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBUseGoods, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBUseGoods;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBUseGoods;
	}
	/**
	* 获得现金 
	*/
	class PBReceiveMoney {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色等级*/
		public iRoleLevel:number;
		/**动作前的金钱*/
		public oldMoney:Long;
		/**动作后的金钱*/
		public newMoney:Long;
		/**角色银币数*/
		public changeValue:Long;
		/**金钱类型*/
		public valueType:number;
		/**操作类型*/
		public iOperateType:number;
		public static encode(message: Pb_God.PBReceiveMoney, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBReceiveMoney, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBReceiveMoney;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBReceiveMoney;
	}
	/**
	* 使用现金 
	*/
	class PBUseMoney {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色等级*/
		public iRoleLevel:number;
		/**动作前的金钱*/
		public oldMoney:Long;
		/**动作后的金钱*/
		public newMoney:Long;
		/**角色银币数*/
		public changeValue:Long;
		/**金钱类型 _emExpendType*/
		public valueType:number;
		/**操作类型*/
		public iOperateType:number;
		public static encode(message: Pb_God.PBUseMoney, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBUseMoney, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBUseMoney;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBUseMoney;
	}
	/**
	*元宝消耗
	*/
	class PBShop {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**消耗值*/
		public iCost:number;
		/**消耗类型*/
		public iShopType:number;
		/**操作类型*/
		public iGoodsType:number;
		/**购买道具ID*/
		public iGoodsId:number;
		/**购买道具个数*/
		public iGoodsNum:number;
		/**剩余值*/
		public iNewCash:Long;
		/**登录渠道*/
		public loginChannel:number;
		public static encode(message: Pb_God.PBShop, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBShop, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBShop;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBShop;
	}
	/**
	*英雄事件
	*/
	class PBHero {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**英雄id*/
		public upetID:number;
		/**英雄名称*/
		public petName:string;
		/**动作*/
		public type:number;
		/**动作变化渠道*/
		public doingType:number;
		/**动作变化数量*/
		public changeNum:number;
		/**开始数量*/
		public beginNum:Long;
		/**结束数量*/
		public endNum:number;
		/**英雄总数量*/
		public totalNum:number;
		public static encode(message: Pb_God.PBHero, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHero, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHero;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHero;
	}
	/**
	* 客户端加载 
	*/
	class PBC2SLoadProgress {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**平台类型*/
		public plattype:number;
		/**服ID*/
		public worldid:number;
		/**用户ID*/
		public iuin:number;
		/**加载进度*/
		public progress:number;
		/**设备id*/
		public deviceid:string;
		public static encode(message: Pb_God.PBC2SLoadProgress, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2SLoadProgress, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2SLoadProgress;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2SLoadProgress;
	}
	/**
	*星石合成锻造
	*/
	class PBRuneCompause {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**合成的id*/
		public compauseID:number;
		/**消耗的个数*/
		public useCount:number;
		/**结果(0失败 1成功)*/
		public result:number;
		public static encode(message: Pb_God.PBRuneCompause, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRuneCompause, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRuneCompause;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRuneCompause;
	}
	/**
	*星石重铸
	*/
	class PBRuneRefine {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**星石sn*/
		public itemSn:Long;
		/**星石id*/
		public itemID:number;
		/**旧属性，格式 类型_值_万分比;*/
		public oldAttr:string;
		/**新属性，格式 类型_值_万分比;*/
		public newAttr:string;
		/**旧技能，格式 技能ID_等级;*/
		public oldSkill:string;
		/**新技能，格式 技能ID_等级;*/
		public newSkill:string;
		public static encode(message: Pb_God.PBRuneRefine, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRuneRefine, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRuneRefine;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRuneRefine;
	}
	/**
	*星石保存
	*/
	class PBRuneSave {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**星石sn*/
		public itemSn:Long;
		/**星石id*/
		public itemID:number;
		/**旧属性，格式 类型_值_万分比;*/
		public oldAttr:string;
		/**新属性，格式 类型_值_万分比;*/
		public newAttr:string;
		/**旧技能，格式 技能ID_等级;*/
		public oldSkill:string;
		/**新技能，格式 技能ID_等级;*/
		public newSkill:string;
		public static encode(message: Pb_God.PBRuneSave, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBRuneSave, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBRuneSave;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBRuneSave;
	}
	/**
	*商城刷新
	*/
	class PBShopRefresh {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**商店类型*/
		public shopType:number;
		public static encode(message: Pb_God.PBShopRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBShopRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBShopRefresh;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBShopRefresh;
	}
	/**
	*天赋升级
	*/
	class PBTalentUpgrade {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**位置*/
		public pos:number;
		/**技能ID*/
		public skillID:number;
		/**技能等级1表示学习,0表示遗忘，其他表示升级*/
		public skillLevel:number;
		public static encode(message: Pb_God.PBTalentUpgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTalentUpgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTalentUpgrade;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTalentUpgrade;
	}
	/**
	*英雄升级
	*/
	class PBHeroUgrade {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**位置*/
		public heroSn:Long;
		/**技能ID*/
		public heroID:number;
		/**增加等级*/
		public addLevel:number;
		/**新等级*/
		public newLevel:number;
		public static encode(message: Pb_God.PBHeroUgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroUgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroUgrade;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroUgrade;
	}
	/**
	*英雄升阶
	*/
	class PBHeroAdvance {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**位置*/
		public heroSn:Long;
		/**技能ID*/
		public heroID:number;
		/**新阶*/
		public newLevel:number;
		public static encode(message: Pb_God.PBHeroAdvance, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroAdvance, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroAdvance;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroAdvance;
	}
	/**
	*英雄升星
	*/
	class PBHeroStar {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**位置*/
		public heroSn:Long;
		/**技能ID*/
		public heroID:number;
		/**新的星级*/
		public newStar:number;
		/**消耗英雄*/
		public expendPets:string;
		/**消耗道具*/
		public expendItems:string;
		public static encode(message: Pb_God.PBHeroStar, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroStar, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroStar;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroStar;
	}
	/**
	*远航接取
	*/
	class PBSailAccpet {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**任务类型*/
		public sailType:number;
		/**远航索引*/
		public sailIndex:number;
		public static encode(message: Pb_God.PBSailAccpet, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBSailAccpet, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBSailAccpet;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBSailAccpet;
	}
	/**
	*远航完成
	*/
	class PBSailComplete {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**任务类型*/
		public sailType:number;
		/**远航索引*/
		public sailIndex:number;
		/**剩余时间秒*/
		public lefttime:number;
		public static encode(message: Pb_God.PBSailComplete, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBSailComplete, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBSailComplete;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBSailComplete;
	}
	/**
	*剧情副本
	*/
	class PBHookBoss {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**关卡ID*/
		public stageid:number;
		/**使用时间*/
		public useTime:number;
		/**玩家战斗力*/
		public fightpower:number;
		/**奖励 格式 道具id_个数;*/
		public prize:string;
		public static encode(message: Pb_God.PBHookBoss, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHookBoss, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHookBoss;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHookBoss;
	}
	/**
	*挂机收益
	*/
	class PBHookProfit {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**是否免费1免费*/
		public isFree:number;
		/**快速作战日次数(0表示挂机)*/
		public sweepcount:number;
		/**使用时间*/
		public profitTime:number;
		/**奖励 格式 道具id_个数;*/
		public prize:string;
		public static encode(message: Pb_God.PBHookProfit, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHookProfit, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHookProfit;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHookProfit;
	}
	/**
	*竞技场挑战日志
	*/
	class PBChallengeLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**挑战结果 1 成功 0 失败*/
		public result:number;
		/**积分变化*/
		public addScore:number;
		/**挑战后积分*/
		public scoreAfter:number;
		/**挑战前消耗道具数量*/
		public itemCount:number;
		/**挑战后消耗道具数量*/
		public itemCountAfter:number;
		/**挑战后的名次*/
		public rank:number;
		/**被挑战用户ID*/
		public targetID:number;
		/**被挑战用户名称*/
		public targetName:string;
		/**被挑战者积分变化*/
		public targetAddScore:number;
		public static encode(message: Pb_God.PBChallengeLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChallengeLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChallengeLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChallengeLog;
	}
	/**
	*竞技场宝箱日志
	*/
	class PBChallengeBoxLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**宝箱ID*/
		public index:number;
		/**战斗次数*/
		public fightcount:number;
		/**奖励道具*/
		public prize:string;
		public static encode(message: Pb_God.PBChallengeBoxLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChallengeBoxLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChallengeBoxLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChallengeBoxLog;
	}
	/**
	*邮件日志
	*/
	class PBMailLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**领取时间*/
		public receiveTime:string;
		/**奖励道具*/
		public prize:string;
		public static encode(message: Pb_God.PBMailLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBMailLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBMailLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBMailLog;
	}
	/**
	*冠军赛下注日志
	*/
	class PBChampionBetLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**竞猜币数量*/
		public coin:number;
		/**下注数量*/
		public guessCoin:number;
		/**下注哪边1左边0右边*/
		public side:number;
		public static encode(message: Pb_God.PBChampionBetLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionBetLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionBetLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionBetLog;
	}
	/**
	*冠军赛竞猜日志
	*/
	class PBChampionGuessLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**竞猜币变化*/
		public addCoin:number;
		/**下注数量*/
		public guessCoin:number;
		/**竞猜结果1猜对0猜错*/
		public result:number;
		/**竞猜后竞猜币数量*/
		public coinAfter:number;
		public static encode(message: Pb_God.PBChampionGuessLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionGuessLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionGuessLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionGuessLog;
	}
	/**
	*冠军赛排行榜日志
	*/
	class PBChampionTopListLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**名次*/
		public rank:number;
		public static encode(message: Pb_God.PBChampionTopListLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChampionTopListLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChampionTopListLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChampionTopListLog;
	}
	/**
	*试炼塔挑战日志
	*/
	class PBTowerLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**关卡*/
		public stage:number;
		/**结果 1 通过 0 未通过*/
		public result:number;
		/**奖励道具*/
		public prize:string;
		public static encode(message: Pb_God.PBTowerLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTowerLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTowerLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTowerLog;
	}
	/**
	*试炼塔奖励日志
	*/
	class PBTowerPrizeLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**当前通关数*/
		public curStage:number;
		/**奖励ID*/
		public index:number;
		/**奖励道具*/
		public prize:string;
		public static encode(message: Pb_God.PBTowerPrizeLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBTowerPrizeLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBTowerPrizeLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBTowerPrizeLog;
	}
	/**
	*英雄献祭日志
	*/
	class PBHeroSplitLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**英雄ID*/
		public heroID:number;
		/**英雄名称*/
		public heroName:string;
		/**数量*/
		public count:number;
		/**获得道具*/
		public addItems:string;
		public static encode(message: Pb_God.PBHeroSplitLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroSplitLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroSplitLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroSplitLog;
	}
	/**
	*英雄碎片献祭日志
	*/
	class PBHeroPieceSplitLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**英雄碎片ID*/
		public heroPieceID:number;
		/**英雄碎片名称*/
		public heroPieceName:string;
		/**数量*/
		public count:number;
		/**获得道具*/
		public addItems:string;
		public static encode(message: Pb_God.PBHeroPieceSplitLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroPieceSplitLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroPieceSplitLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroPieceSplitLog;
	}
	/**
	*万神殿抽奖日志
	*/
	class PBPantheonCallLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**消耗物品*/
		public removeItems:string;
		/**得到物品*/
		public addItems:string;
		/**道具数量*/
		public items:string;
		/**召唤后道具数量*/
		public itemsAfter:string;
		public static encode(message: Pb_God.PBPantheonCallLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPantheonCallLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPantheonCallLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPantheonCallLog;
	}
	/**
	*万神殿-英雄转换日志
	*/
	class PBHeroChangeLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**英雄ID*/
		public heroID:number;
		/**消耗道具*/
		public removeItems:string;
		/**新英雄ID*/
		public newHeroID:number;
		public static encode(message: Pb_God.PBHeroChangeLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroChangeLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroChangeLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroChangeLog;
	}
	/**
	*万神殿-英雄转换保存日志
	*/
	class PBHeroChangeSaveLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**英雄ID*/
		public heroID:number;
		/**新英雄ID*/
		public newHeroID:number;
		public static encode(message: Pb_God.PBHeroChangeSaveLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroChangeSaveLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroChangeSaveLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroChangeSaveLog;
	}
	/**
	*装备锻造日志
	*/
	class PBEquipForgeLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**消耗道具*/
		public removeItems:string;
		/**获得道具*/
		public addItems:string;
		public static encode(message: Pb_God.PBEquipForgeLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBEquipForgeLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBEquipForgeLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBEquipForgeLog;
	}
	/**
	*设置阵法日志
	*/
	class PBZhenFaLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**设置阵法*/
		public zhenfa:string;
		/**阵法id*/
		public zhenfaid:number;
		public static encode(message: Pb_God.PBZhenFaLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBZhenFaLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBZhenFaLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBZhenFaLog;
	}
	/**
	*英雄高星重生
	*/
	class PBHeroRebornLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**英雄ID*/
		public heroID:number;
		/**操作类型*/
		public iOperateType:number;
		/**重生前 等级；星级；进化段数*/
		public vBefore:string;
		/**重生后 等级；星级；进化段数*/
		public vAfter:string;
		public static encode(message: Pb_God.PBHeroRebornLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroRebornLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroRebornLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroRebornLog;
	}
	/**
	*英雄进化
	*/
	class PBHeroEvolveLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**角色等级*/
		public iRoleLevel:number;
		/**英雄ID*/
		public heroID:number;
		/**英雄等级*/
		public heroLevel:number;
		/**英雄星级*/
		public heroStar:number;
		/**进化后   进化段数；皮肤ID*/
		public vBefore:string;
		/**进化后进化段数；皮肤ID*/
		public vAfter:string;
		public static encode(message: Pb_God.PBHeroEvolveLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroEvolveLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroEvolveLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroEvolveLog;
	}
	/**
	*玩家举报
	*/
	class PBReportLog {
		constructor();
		/**账号名*/
		public account:string;
		/**角色ID*/
		public player_id:number;
		/**游戏大区ID*/
		public server_id:number;
		/**角色名*/
		public player_name:string;
		/**举报玩家ID*/
		public report_server_id:number;
		/**举报玩家ID*/
		public report_player_id:number;
		/**举报玩家名字*/
		public report_player_name:string;
		/**理由*/
		public reason:string;
		/**解释*/
		public explain_:string;
		/**证据*/
		public proof:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public log_time:string;
		public static encode(message: Pb_God.PBReportLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBReportLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBReportLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBReportLog;
	}
	/**
	*玩家引导
	*/
	class PBGuideLog {
		constructor();
		/**角色ID*/
		public player_id:number;
		/**账号名*/
		public account:string;
		/**游戏大区ID*/
		public server_id:number;
		/**角色名*/
		public player_name:string;
		/**引导ID*/
		public guide_id:number;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public log_time:string;
		public static encode(message: Pb_God.PBGuideLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGuideLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGuideLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGuideLog;
	}
	/**
	*玩家问卷调查
	*/
	class PBSurveyLog {
		constructor();
		/**账户名*/
		public account:string;
		/**用户ID*/
		public player_id:number;
		/**游戏大区ID*/
		public server_id:number;
		/**角色名*/
		public player_name:string;
		/**问题ID*/
		public question_id:number;
		/**问题*/
		public question:string;
		/**答案*/
		public answer:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public log_time:string;
		public static encode(message: Pb_God.PBSurveyLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBSurveyLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBSurveyLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBSurveyLog;
	}
	/**
	*携带物觉醒强化日志
	*/
	class PBHeroHorcruxLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public RoleName:string;
		/**角色等级*/
		public iRoleLevel:number;
		/**vip等级*/
		public iVipLevel:number;
		/**携带物ID*/
		public HorcruxID:number;
		/**强化前数据*/
		public uBefore:number;
		/**强化后数据*/
		public uAfter:number;
		/**英雄数据*/
		public HeroInfo:string;
		public static encode(message: Pb_God.PBHeroHorcruxLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBHeroHorcruxLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBHeroHorcruxLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBHeroHorcruxLog;
	}
	/**
	*孵化屋日志
	*/
	class PBIncubateEggLog {
		constructor();
		/**游戏事件ID*/
		public ieventid:string;
		/**记录时间, 格式 YYYY-MM-DD HH:MM:SS*/
		public dtEventTime:string;
		/**游戏大区ID*/
		public iWorldId:number;
		/**用户ID*/
		public iUin:number;
		/**角色ID*/
		public iRoleId:number;
		/**角色名*/
		public vRoleName:string;
		/**角色等级*/
		public iRoleLevel:number;
		/**vip等级*/
		public iVipLevel:number;
		/**孵化位*/
		public uIncubateIndex:number;
		/**英雄ID*/
		public heroID:number;
		/**英雄等级*/
		public heroLevel:number;
		/**英雄星级*/
		public heroStar:number;
		/**操作类型*/
		public uOperateID:number;
		public static encode(message: Pb_God.PBIncubateEggLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBIncubateEggLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBIncubateEggLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBIncubateEggLog;
	}
}
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

declare namespace Pb_God {
	/**
	* 开服记录 server_open
	*/
	class PBCenterServerOpen {
		constructor();
		/** 所在服务器*/
		public serverid:number;
		/** 开服时间*/
		public open_time:string;
		/** 开服时间数字版*/
		public open_time_num:number;
		/** 服务器状态 0 未开放不显示 1 火 2 正常 3 火+未开放 4 正常+未开放*/
		public status:number;
		/** 服务器名称*/
		public server_name:string;
		public static encode(message: Pb_God.PBCenterServerOpen, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterServerOpen, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterServerOpen;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterServerOpen;
	}
	/**
	* 玩家注册记录 player_account
	*/
	class PBCenterPlayerAccount {
		constructor();
		/** 玩家账号*/
		public account:string;
		/** 注册时间*/
		public regist_time:string;
		/** 注册IP*/
		public regist_ip:string;
		/** 服务器id*/
		public serverid:number;
		/** 0 平台跳转 1 到达选服页面 2 点击开始游戏 3 连接到游戏服 */
		public status:number;
		/** 渠道分配的UID*/
		public uid:string;
		/** 渠道ID*/
		public cid:string;
		/** 机型 0 安卓 1 iphone*/
		public phonetype:number;
		/** 玩家信息user-agent*/
		public userinfos:string;
		public static encode(message: Pb_God.PBCenterPlayerAccount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterPlayerAccount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterPlayerAccount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterPlayerAccount;
	}
	/**
	* 玩家注册记录 player_regist
	*/
	class PBCenterPlayerReg {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 玩家id*/
		public playerid:number;
		/** 玩家账号*/
		public account:string;
		/** 注册时间*/
		public regist_time:string;
		/** 注册IP*/
		public ip:string;
		/** 开服第几天注册*/
		public server_open_day:number;
		/** 玩家名称*/
		public name:string;
		/** 该账号第几次创角*/
		public create_nums:number;
		/** 0 平台跳转 1 到达选服页面 2 点击开始游戏 3 进入游戏画面*/
		public regist_status:number;
		/** 渠道分配的UID*/
		public uid:string;
		/** 渠道ID*/
		public cid:string;
		public static encode(message: Pb_God.PBCenterPlayerReg, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterPlayerReg, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterPlayerReg;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterPlayerReg;
	}
	/**
	* 玩家登陆记录 player_login
	*/
	class PBCenterPlayerLogin {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 玩家id*/
		public playerid:number;
		/** 玩家账号*/
		public account:string;
		/** 玩家名称*/
		public name:string;
		/** 登录时间*/
		public login_time:number;
		/** 玩家登录IP*/
		public ip:string;
		/** 玩家等级*/
		public level:number;
		/** 战力*/
		public power:number;
		/** 当前元宝数量*/
		public yuanbao:Long;
		public static encode(message: Pb_God.PBCenterPlayerLogin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterPlayerLogin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterPlayerLogin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterPlayerLogin;
	}
	/**
	* 玩家登出记录 player_logout
	*/
	class PBCenterPlayerLogout {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 玩家id*/
		public playerid:number;
		/** 玩家账号*/
		public account:string;
		/** 玩家名称*/
		public name:string;
		/** 登录时间*/
		public login_time:number;
		/** 玩家登录IP*/
		public logout_time:number;
		/** 在线时长*/
		public online_time:number;
		/** 玩家等级*/
		public level:number;
		/** 战力*/
		public power:number;
		/** 当前元宝数量*/
		public yuanbao:Long;
		/** 玩家登录IP*/
		public ip:string;
		public static encode(message: Pb_God.PBCenterPlayerLogout, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterPlayerLogout, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterPlayerLogout;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterPlayerLogout;
	}
	/**
	* 每天首次登陆表 player_daylogin
	*/
	class PBCenterPlayerDayLogin {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 玩家id*/
		public playerid:number;
		/** 玩家账号*/
		public account:string;
		/** 玩家名称*/
		public name:string;
		/** 登录时间*/
		public login_time:string;
		public static encode(message: Pb_God.PBCenterPlayerDayLogin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterPlayerDayLogin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterPlayerDayLogin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterPlayerDayLogin;
	}
	/**
	* 玩家信息定时更新表 player_info
	*/
	class PBCenterPlayerInfo {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 玩家id*/
		public playerid:number;
		/** 玩家账号*/
		public account:string;
		/** 玩家名称*/
		public name:string;
		/** 玩家等级*/
		public level:number;
		/** 战力*/
		public power:number;
		/** 当前元宝数量*/
		public yuanbao:Long;
		/** vip等级*/
		public vip:number;
		/** 总充值金额*/
		public recharge:number;
		/** 总在线时长*/
		public total_online_time:number;
		/** 最后在线时间*/
		public last_online_time:string;
		/** 最后在线时间数字版*/
		public last_online_time_num:number;
		/** 开服第几天注册*/
		public server_open_day:number;
		/** 注册时间*/
		public regist_time:string;
		/** 该账号第几次创角*/
		public create_nums:number;
		public static encode(message: Pb_God.PBCenterPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterPlayerInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterPlayerInfo;
	}
	/**
	* 元宝记录 log_yuanbao
	*/
	class PBCenterLogYuanbao {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 玩家id*/
		public playerid:number;
		/** 玩家账号*/
		public account:string;
		/** 玩家名称*/
		public name:string;
		/** 元宝改变类型*/
		public type:number;
		/** 元宝改变详细信息*/
		public type_name:string;
		/** 元宝改变数量*/
		public yuanbao:Long;
		/** 当前元宝数量*/
		public current:Long;
		public static encode(message: Pb_God.PBCenterLogYuanbao, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterLogYuanbao, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterLogYuanbao;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterLogYuanbao;
	}
	/**
	* 物品记录 log_item
	*/
	class PBCenterLogItem {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 玩家id*/
		public playerid:number;
		/** 玩家账号*/
		public account:string;
		/** 玩家名称*/
		public name:string;
		/** 物品改变类型*/
		public type:number;
		/** 物品改变详细信息*/
		public type_name:string;
		/** 物品ID*/
		public itemid:number;
		/** 物品改变数量*/
		public count:number;
		public static encode(message: Pb_God.PBCenterLogItem, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterLogItem, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterLogItem;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterLogItem;
	}
	/**
	* 金币记录 log_gold
	*/
	class PBCenterLogGold {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 玩家id*/
		public playerid:number;
		/** 玩家账号*/
		public account:string;
		/** 玩家名称*/
		public name:string;
		/** 金币改变类型*/
		public type:number;
		/** 金币改变详细信息*/
		public type_name:string;
		/** 当前金币数量*/
		public current:Long;
		/** 金币改变数量*/
		public gold:Long;
		public static encode(message: Pb_God.PBCenterLogGold, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterLogGold, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterLogGold;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterLogGold;
	}
	/**
	* 在线人数记录 online_counts
	*/
	class PBCenterOnlineCount {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 在线玩家数量*/
		public online_number:number;
		public static encode(message: Pb_God.PBCenterOnlineCount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterOnlineCount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterOnlineCount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterOnlineCount;
	}
	/**
	* 充值表 recharge
	*/
	class PBCenterRecharge {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 玩家id*/
		public playerid:number;
		/** 玩家账号*/
		public account:string;
		/** 玩家名称*/
		public name:string;
		/** 玩家等级*/
		public level:number;
		/** 战力*/
		public power:number;
		/** 商品ID*/
		public goods_id:number;
		/** 充值金额*/
		public recharge:number;
		/** 获得的元宝*/
		public yuanbao:number;
		/** 充值时间*/
		public recharge_time:string;
		/** 充值的玩家IP*/
		public player_ip:string;
		/** 订单号*/
		public order_number:string;
		/** 当前关卡*/
		public chapter:number;
		/** 该玩家第几次充值*/
		public rechargecount:number;
		public static encode(message: Pb_God.PBCenterRecharge, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterRecharge, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterRecharge;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterRecharge;
	}
	/**
	*公会宣言记录 log_faction_notice
	*/
	class PBCenterFactionNotice {
		constructor();
		/** 服务器id*/
		public serverid:number;
		/** 公会id*/
		public factionid:number;
		/** 公会名称*/
		public factionname:string;
		/** 会长id*/
		public leaderid:number;
		/** 会长名称*/
		public leadername:string;
		/** 玩家id*/
		public playerid:number;
		/** 玩家名称*/
		public playername:string;
		/** 宣言内容*/
		public message:string;
		public static encode(message: Pb_God.PBCenterFactionNotice, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCenterFactionNotice, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCenterFactionNotice;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCenterFactionNotice;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 神器相关
	*/
	enum _emResultArtifact_15 {
		//  成功;
		R_ResultArtifact_Succeed = 0,
		//  失败;
		R_ResultArtifact_Fail = 1,
		// 扣除的道具不足;
		R_ResultArtifact_NeedItem = 2,
		// 已经激活过;
		R_ResultArtifact_HaveActive = 3,
		// 未激活此神器;
		R_ResultArtifact_NoActive = 4,
		// 达到最大等级;
		R_ResultArtifact_MaxUpgradeLevel = 5,
		// 金币不足;
		R_ResultArtifact_NeedGold = 6,
		// 神器等级不足;
		R_ResultArtifact_NeedLevel = 7,
		// 刻印石最大个数;
		R_ResultArtifact_StoneMaxCount = 8,
		// 条件未满足;
		R_ResultArtifact_NeedCondition = 9,
		// 刻印石个数;
		R_ResultArtifact_StoneCount = 10,
		// 已经完成觉醒任务;
		R_ResultArtifact_AlreadyAwake = 11,
		// 已经得到奖励;
		R_ResultArtifact_AlreadyGotPrize = 12,
		// 需要先完成前一天的任务;
		R_ResultArtifact_AwakeDay = 13,
		// 解锁任务未完成;
		R_ResultArtifact_UnlockTask = 14,
		// 已经解锁;
		R_ResultArtifact_AlreadyUnLock = 15,
	}
	/**
	*----神器模块
	*/
	enum _emC2S_Artifact_Protocol {
		// 	 激活			PBCAGArtifactActive;
		C2S_Artifact_Active = 1,
		// 	 升级			;
		C2S_Artifact_Upgrade = 2,
		// 	 技能升级		PBU32;
		C2S_Artifact_Skill = 3,
		// 	 刻印石头		PBU32;
		C2S_Artifact_UseStone = 4,
		// 	 重置			PBU32;
		C2S_Artifact_Reset = 5,
		// 	 幻化			PBCAGArtifactShape;
		C2S_Artifact_Shape = 6,
		//	 觉醒(index)	PBU32;
		C2S_Artifact_Awake = 7,
		//	 觉醒奖励		PBU32;
		C2S_Artifact_AwakePrize = 8,
		//	 解锁			PBU32;
		C2S_Artifact_Unlock = 9,
	}
	/**
	*----神器模块
	*/
	enum _emS2C_Artifact_Protocol {
		//	 通用错误返回;
		S2C_Artifact_Common = 0,
		//	 激活返回 		PBCAGArtifactActive;
		S2C_Artifact_Active = 1,
		//	 新增神器 		PBPlayerArtifactInfo;
		S2C_Artifact_AddNew = 2,
		// 	 升级返回			PBG2CArtifactUpgrade;
		S2C_Artifact_Upgrade = 3,
		// 	 技能升级返回		PBG2CArtifactSkill;
		S2C_Artifact_Skill = 4,
		// 	 刻印石头返回		PBU32;
		S2C_Artifact_UseStone = 5,
		//	 同步信息 		PBPlayerArtifactInfo;
		S2C_Artifact_Syn = 6,
		// 	 幻化返回			PBCAGArtifactShape;
		S2C_Artifact_Shape = 7,
		//	 觉醒				PBU32;
		S2C_Artifact_Awake = 8,
		//	 觉醒奖励			PBU32;
		S2C_Artifact_AwakePrize = 9,
		//	 法阵觉醒推送		PBU32;
		S2C_Artifact_FazhenAwake = 10,
	}
	/**
	* 激活
	*/
	class PBCAGArtifactShape {
		constructor();
		/** 神器ID*/
		public id:number;
		/** 幻化的ID*/
		public shapeid:number;
		public static encode(message: Pb_God.PBCAGArtifactShape, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGArtifactShape, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGArtifactShape;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGArtifactShape;
	}
	/**
	* 激活
	*/
	class PBCAGArtifactActive {
		constructor();
		/** 神器ID*/
		public id:number;
		/** 进度ID*/
		public stage:number;
		public static encode(message: Pb_God.PBCAGArtifactActive, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGArtifactActive, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGArtifactActive;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGArtifactActive;
	}
	/**
	* 升级
	*/
	class PBG2CArtifactUpgrade {
		constructor();
		/** 等级*/
		public level:number;
		/** 经验*/
		public exp:number;
		public static encode(message: Pb_God.PBG2CArtifactUpgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CArtifactUpgrade, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CArtifactUpgrade;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CArtifactUpgrade;
	}
	/**
	* 技能升级
	*/
	class PBG2CArtifactSkill {
		constructor();
		/** 神器ID*/
		public id:number;
		/** 技能等级*/
		public skilllevel:number;
		public static encode(message: Pb_God.PBG2CArtifactSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CArtifactSkill, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CArtifactSkill;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CArtifactSkill;
	}
	/**
	* 刻印石头
	*/
	class PBCAGArtifactUseStone {
		constructor();
		/** 刻印石数量*/
		public stone:Pb_God.PBItemInfo;
		public static encode(message: Pb_God.PBCAGArtifactUseStone, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGArtifactUseStone, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGArtifactUseStone;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGArtifactUseStone;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 结果
	*/
	enum _emResultLottery {
		//  成功;
		R_ResultLottery_Succeed = 0,
		//  失败;
		R_ResultLottery_Fail = 1,
		//  数据包TYPE参数不对;
		R_ResultLottery_TYPE_INVALID = 2,
		//  数据包INDEX参数不对;
		R_ResultLottery_INDEX_INVALID = 3,
		//  次数已用完;
		R_ResultLottery_NOT_COUNT = 4,
		//  需要VIP等级不足;
		R_ResultLottery_NeedVIP = 5,
		//  要扣除物品数量配置不对	;
		R_ResultLottery_RemoveCount_INVALID = 6,
		//  需要物品不足;
		R_ResultLottery_NeedItem = 7,
	}
	/**
	* 玩法类型
	*/
	enum _emLotteryType {
		//  许愿进化 ;
		LotteryType_Wishing = 1,
		//  心愿抽卡;
		LotteryType_DropCard = 2,
		//  解放胡帕;
		LotteryType_UnlockPet = 3,
		//  通用精灵 4~10为通用类型;
		LotteryType_CommonPet = 4,
		//  通用精灵4~10为通用类型;
		LotteryType_CommonPet1 = 10,
	}
	/**
	* 抽獎类型
	*/
	enum _emLotteryRefreshType {
		//   许愿1;
		LotteryRefreshType_KEY1 = 1,
		//   许愿2;
		LotteryRefreshType_KEY2 = 2,
	}
	/**
	* ---- 许愿模块 ---------
	*/
	enum _emC2S_Lottery_Protocol {
		// 	 许愿请求 PBC2GLotteryRefresh;
		C2S_Lottery_Refresh = 1,
		// 	 许愿池设置请求 PBC2GLotteryPoolSet;
		C2S_Lottery_Pool_Set = 2,
	}
	/**
	* ---- 许愿模块 ---------
	*/
	enum _emS2C_Lottery_Protocol {
		// 	 许愿回应 PBG2CLotteryRefresh;
		S2C_Lottery_Refresh = 1,
		// 	 许愿池设置请求 PBG2CLotteryPoolSet;
		S2C_Lottery_Pool_Set = 2,
	}
	/**
	* 客户端 许愿请求 C2S_Lottery_Refresh
	*/
	class PBC2GLotteryRefresh {
		constructor();
		/** 类型值，用于扩展区别不同玩法，_emLotteryType*/
		public type:number;
		/** 许愿序号  _emLotteryRefreshType*/
		public index:number;
		public static encode(message: Pb_God.PBC2GLotteryRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GLotteryRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GLotteryRefresh;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GLotteryRefresh;
	}
	/**
	* 服务器 许愿请求回应 S2C_Lottery_Refresh
	*/
	class PBG2CLotteryRefresh {
		constructor();
		/** 返回结果 _emResultLottery*/
		public code:number;
		/** 数据*/
		public data:Pb_God.PBPlayerLotteryData;
		/** 奖励物品列表*/
		public prizeItems:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBG2CLotteryRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLotteryRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLotteryRefresh;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLotteryRefresh;
	}
	/**
	* 客户端 许愿池设置请求 C2S_Lottery_Pool_Set
	*/
	class PBC2GLotteryPoolSet {
		constructor();
		/** 类型值，用于扩展区别不同玩法，_emLotteryType*/
		public type:number;
		/** 许愿序号， 0 次数为1; 1 次数为10次许愿*/
		public index:number;
		public static encode(message: Pb_God.PBC2GLotteryPoolSet, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GLotteryPoolSet, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GLotteryPoolSet;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GLotteryPoolSet;
	}
	/**
	* 服务器 许愿池设置请求 S2C_Lottery_Pool_Set 
	*/
	class PBG2CLotteryPoolSet {
		constructor();
		/** 结果 _emResultLottery*/
		public code:number;
		/** 数据*/
		public data:Pb_God.PBPlayerLotteryData;
		public static encode(message: Pb_God.PBG2CLotteryPoolSet, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CLotteryPoolSet, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CLotteryPoolSet;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CLotteryPoolSet;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 竞技场相关
	*/
	enum _emResultChallenge_9 {
		//  成功;
		R_ResultChallenge_Succeed = 0,
		//  失败;
		R_ResultChallenge_Fail = 1,
		//  冷却中;
		R_ResultChallenge_Cooling = 2,
		//  已经领取过;
		R_ResultChallenge_HavePrize = 3,
		//  挑战次数不足;
		R_ResultChallenge_NeedFightCount = 4,
		//  该玩家正在进行一场战斗，请稍后再试;
		R_ResultChallenge_InFighting = 5,
		//  道具不足;
		R_ResultChallenge_NeedItem = 6,
		//  状态不对;
		R_ResultChallenge_StateError = 7,
		//  点赞次数不足;
		R_ResultChallenge_NoLikeNum = 8,
		//  对自己点赞;
		R_ResultChallenge_NoLikeOneself = 9,
		//  已经点过赞了;
		R_ResultChallenge_Liked = 10,
	}
	/**
	*----客户端到服务器
	*/
	enum _emC2S_Challenge_Protocol {
		//刷新对手 	无内容;
		C2S_Challenge_Refresh = 1,
		//领取周宝箱	PBU32;
		C2S_Challenge_WeekPrize = 2,
		//打开竞技场	无内容;
		C2S_Challenge_Open = 3,
		//点赞		PBU32玩家id;
		C2S_Challenge_Like = 4,
		//玩家信息	PBU32玩家id;
		C2S_Challenge_AskPlayerInfo = 5,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_Challenge_Protocol {
		//失败才返回;
		S2C_Challenge_Common_Ack = 0,
		//对手信息返回		PBG2CChallengeTargetAck;
		S2C_Challenge_Target_Ack = 1,
		//领取周宝箱返回	PBU32;
		S2C_Challenge_WeekPrize = 2,
		//自己的排行信息	PBG2CChallengeTopInfo;
		S2C_Challenge_OpenSyn = 3,
		//同步进入次数		PBG2CChallengeSynEnterCount;
		S2C_Challenge_SynEnterCount = 4,
		//被点赞次数		PBChallengeLikeAck;
		S2C_Challenge_LikeNum = 5,
		//点赞次数		PBU32;
		S2C_Challenge_LikeNumToPlayer = 6,
		//对手信息返回		PBG2CChallengeTargetInfo;
		S2C_Challenge_Target_PlayerInfo = 7,
		//点赞返回			PBU32;
		S2C_Challenge_Like = 8,
	}
	/**
	*挑战记录
	*/
	class PBChallengeRecordAck {
		constructor();
		/**挑战记录*/
		public record:Pb_God.PBFightResult[];
		public static encode(message: Pb_God.PBChallengeRecordAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChallengeRecordAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChallengeRecordAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChallengeRecordAck;
	}
	/**
	*被点赞次数
	*/
	class PBChallengeLikeAck {
		constructor();
		/**玩家id*/
		public playerID:number;
		/**次数*/
		public likeNum:number;
		public static encode(message: Pb_God.PBChallengeLikeAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChallengeLikeAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChallengeLikeAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChallengeLikeAck;
	}
	/**
	*同步进入次数
	*/
	class PBG2CChallengeSynEnterCount {
		constructor();
		/**日次数*/
		public daycount:number;
		/**周次数*/
		public weekcount:number;
		public static encode(message: Pb_God.PBG2CChallengeSynEnterCount, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChallengeSynEnterCount, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChallengeSynEnterCount;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChallengeSynEnterCount;
	}
	/**
	*竞技场对手信息
	*/
	class PBChallengeObject {
		constructor();
		/** 机器人ID/玩家ID*/
		public id:number;
		/** 是否是机器人*/
		public param:number;
		/**显示*/
		public display:Pb_God.PBPlayerDisplay;
		/** 积分*/
		public score:number;
		/** 战斗力*/
		public fightpower:number;
		/** 防守信息*/
		public defense:Pb_God.PBBattlePet;
		public static encode(message: Pb_God.PBChallengeObject, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBChallengeObject, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBChallengeObject;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBChallengeObject;
	}
	/**
	*对手信息返回
	*/
	class PBG2CChallengeTopInfo {
		constructor();
		/**自己名次*/
		public order:number;
		/**积分*/
		public score:number;
		public static encode(message: Pb_God.PBG2CChallengeTopInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChallengeTopInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChallengeTopInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChallengeTopInfo;
	}
	/**
	*对手信息返回
	*/
	class PBG2CChallengeTargetAck {
		constructor();
		/**自己名次*/
		public order:number;
		/**对手基本信息*/
		public target:Pb_God.PBChallengeObject[];
		public static encode(message: Pb_God.PBG2CChallengeTargetAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChallengeTargetAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChallengeTargetAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChallengeTargetAck;
	}
	/**
	*对手信息返回
	*/
	class PBG2CChallengeTargetInfo {
		constructor();
		/**自己名次*/
		public order:number;
		/**对手基本信息*/
		public target:Pb_God.PBChallengeObject;
		public static encode(message: Pb_God.PBG2CChallengeTargetInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CChallengeTargetInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CChallengeTargetInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CChallengeTargetInfo;
	}
	/**
	*查看排行榜
	*/
	class PBC2GChallengeTopList {
		constructor();
		/**开始名次*/
		public begin:number;
		/**结束名次*/
		public end:number;
		public static encode(message: Pb_God.PBC2GChallengeTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GChallengeTopList, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GChallengeTopList;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GChallengeTopList;
	}
	/**
	*真正开始
	*/
	class PBW2GChallengeRealBegin {
		constructor();
		/**目标ID*/
		public id:Long;
		public static encode(message: Pb_God.PBW2GChallengeRealBegin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2GChallengeRealBegin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2GChallengeRealBegin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2GChallengeRealBegin;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 伙伴系统返回
	*/
	enum _emResultPet_3 {
		// 成功;
		R_ResultPet_Succeed = 0,
		// 失败;
		R_ResultPet_Fail = 1,
		// 该阵法类型未开启;
		R_ResultPet_ZhenfaTypeNoOpen = 2,
		// 该阵法未开启;
		R_ResultPet_ZhenfaNoOpen = 3,
		// 该阵法位置错误;
		R_ResultPet_ZhenfaErroPos = 4,
		// 无此伙伴;
		R_ResultPet_NoPet = 5,
		// 已经有此类型伙伴;
		R_ResultPet_HavePetID = 6,
		// 已经最大等级;
		R_ResultPet_MaxLevel = 7,
		// 伙伴经验不足;
		R_ResultPet_NeedPetExp = 8,
		// 金币不足;
		R_ResultPet_NeedCoin = 9,
		// 伙伴等级不足;
		R_ResultPet_NeedPetLevel = 10,
		// 伙伴阶数已经达到最大;
		R_ResultPet_MaxPetAdvance = 11,
		// 道具不足;
		R_ResultPet_NeedItem = 12,
		// 达到最大星级;
		R_ResultPet_MaxPetStar = 13,
		// 上锁的伙伴不能被消耗;
		R_ResultPet_PetLock = 14,
		// 伙伴种族不一致;
		R_ResultPet_PetTypeError = 15,
		// 消耗的伙伴不对;
		R_ResultPet_PetExpendError = 16,
		// 主线上阵伙伴不能被消耗;
		R_ResultPet_PetInZhuxian = 17,
		// 伙伴背包空间已满;
		R_ResultPet_PetBagFull = 18,
		// 重复穿戴;
		R_ResultPet_EquipRepeat = 19,
		// 无穿戴装备;
		R_ResultPet_NoItemEquip = 20,
		// 重复加锁;
		R_ResultPet_LockRepeat = 21,
		// 重复符文;
		R_ResultPet_RuneRepeat = 22,
		// 已有天赋技能;
		R_ResultPet_HaveTalentSkill = 23,
		// 星级不够;
		R_ResultPet_NeedStar = 24,
		// 等级不足;
		R_ResultPet_NeedLevel = 25,
		// 需要前置技能;
		R_ResultPet_NeedLowSkill = 26,
		// 无天赋技能;
		R_ResultPet_NoTalentSkill = 27,
		// 技能最大等级;
		R_ResultPet_SkillMaxLevel = 28,
		// 钻石不足;
		R_ResultPet_NeedDiamond = 29,
		// 伙伴正在先知转换中;
		R_ResultPet_PetChange = 30,
		// 无此皮肤;
		R_ResultPet_NoSkin = 31,
		// 需要激活此神器;
		R_ResultPet_NeedActiveArtifact = 32,
		// 重复神装;
		R_ResultPet_GodEquipRepeat = 33,
		// 非法字符或长度超出;
		R_ResultPet_NameError = 34,
		// 未穿戴神装;
		R_ResultPet_NoGodEquip = 35,
		// 相关队伍之间有重复英雄;
		R_ResultPet_TeamDuplicate = 36,
		// 临时英雄;
		R_ResultPet_TempPet = 37,
		// 消耗英雄数量不足;
		R_ResultPet_NeedExpend = 38,
		// 次数不足;
		R_ResultPet_Count = 39,
		// 达到最大购买次数;
		R_ResultPet_MaxCount = 40,
		// 不能使用该道具;
		R_ResultPet_Item = 41,
		// 没有经验值;
		R_ResultPet_EXP = 42,
		// 已进化到最终形态;
		R_ResultPet_MaxPetEvolve = 43,
		// 觉醒材料不足;
		R_ResultPet_Horcrux_Awake_Cost = 44,
		// 携带物未觉醒;
		R_ResultPet_Horcrux_Need_Awake = 45,
		// 携带物已达到最大等级;
		R_ResultPet_Horcrux_MaxLevel = 46,
		// 魂器强化，未找到消耗本体;
		R_ResultPet_Horcrux_NotPet = 47,
		// 携带物觉醒重复;
		R_ResultPet_Horcrux_Awake_Repeat = 48,
		// 宠物已在守护中出战;
		R_ResultPet_PetStateDefend = 49,
		// 已放置在共鸣等级中;
		R_ResultPet_PetStateResonanceLevel = 50,
		//已放置在共鸣星级中;
		R_ResultPet_PetStateResonanceStar = 51,
	}
	/**
	*----伙伴系统
	*/
	enum _emC2S_Pet_Protocol {
		//设置阵法		PBPlayerZhenfaInfo;
		C2S_Pet_Set_Zhenfa_Ask = 0,
		//伙伴升级		PBC2GPet_UpLevel_Ask;
		C2S_Pet_UpLevel_Ask = 1,
		//伙伴升阶		PBCAGPet_Advance;
		C2S_Pet_Advance_Ask = 2,
		//伙伴升星		PBC2GPet_UpStar;
		C2S_Pet_UpStar_Ask = 3,
		//穿戴装备		PBCAGPet_Equip;
		C2S_Pet_Equip_Ask = 4,
		//一键穿脱装备	PBC2GPet_AutoEquip;
		C2S_Pet_AutoEquip_Ask = 5,
		//伙伴加锁		PBCAGPet_Lock;
		C2S_Pet_Lock_Ask = 6,
		//穿戴符文		PBCAGPet_RuneEquip;
		C2S_Pet_RuneEquip_Ask = 7,
		//天赋领悟		PBCAGPet_Talent;
		C2S_Pet_LearnTalent_Ask = 8,
		//天赋遗忘		PBCAGPet_Talent;
		C2S_Pet_DelTalent_Ask = 9,
		//天赋升级	PBCAGPet_Talent;
		C2S_Pet_UpgradeTalent_Ask = 10,
		//购买背包	PBCAGPet_BuyBag;
		C2S_Pet_BuyBag_Ask = 11,
		//伙伴分解	PBC2GPet_Split;
		C2S_Pet_Split_Ask = 12,
		//设置皮肤	PBCAGPet_SetSkin;
		C2S_Pet_SetSkin_Ask = 13,
		//穿戴神装	PBCAGPet_GodEquip;
		C2S_Pet_GodEquip_Ask = 14,
		//一键脱下神装	PBU64;
		C2S_Pet_GodUnEquipOneKey_Ask = 15,
		//开启套装格子 PBU32;
		C2S_Pet_GodSuit_OpenAsk = 16,
		//保存套装方案 PBC2GPet_GodSuitSaveAsk;
		C2S_Pet_GodSuit_SaveAsk = 17,
		//穿戴套装 	 PBC2GPet_GodSuitEquipAsk;
		C2S_Pet_GodSuit_EquipAsk = 18,
		//套装方案改名 	 PBC2GPet_GodSuitRenameAsk;
		C2S_Pet_GodSuit_RenameAsk = 19,
		//装配套装方案 	 PBC2GPet_GodSuitSaveAsk;
		C2S_Pet_GodSuit_SaveEquipAsk = 20,
		//查询伙伴评分 	PBU64;
		C2S_Pet_QueryScore = 21,
		//进阶属性预览 	PBU64;
		C2S_Pet_AdvancePreview = 22,
		//升星属性预览 	PBU64;
		C2S_Pet_UpStarPreview = 23,
		//置换 		PBCAGPet_Replace;
		C2S_Pet_Replace_Ask = 24,
		//回退		PBU64;
		C2S_Pet_Degenerate_Ask = 25,
		//神装预览	PBU64;
		C2S_Pet_GodEquipPreview = 26,
		//重生		PBU64;
		C2S_Pet_Reborn = 27,
		//购买重生次数;
		C2S_Pet_BuyRebornCount = 28,
		//卸载套装(id, petsn) 	 PBU32U64;
		C2S_Pet_GodSuit_Unload = 29,
		//吞噬		PBC2GPet_UpStar;
		C2S_Pet_Swallow = 30,
		//高星重生		PBU64;
		C2S_Pet_HighStarReborn = 31,
		//进化 PBC2GPet_Evolve_Ask;
		C2S_Pet_Evolve_Ask = 32,
		//魂器觉醒 PBC2GHorcruxAwake;
		C2S_Pet_Horcrux_Awake = 33,
		//魂器强化 PBC2GHorcruxLevelUp;
		C2S_Pet_Horcrux_LevelUp = 34,
		//领取档案奖励 PBU32;
		C2S_Pet_GetPetAchivesReward = 35,
	}
	/**
	*----伙伴系统
	*/
	enum _emS2C_Pet_Protocol {
		//新增				PBPlayerPetInfo;
		S2C_Pet_AddNew_Ack = 0,
		//删除				PBG2CPet_Remove_Ack;
		S2C_Pet_Remove_Ack = 1,
		//设置阵法返回		PBPlayerZhenfaInfo;
		S2C_Pet_Set_Zhenfa_Ack = 2,
		//升级伙伴返回		PBG2CPet_UpLevel_Ack;
		S2C_Pet_UpLevel_Ack = 3,
		//伙伴升阶返回		PBCAGPet_Advance;
		S2C_Pet_Advance_Ack = 4,
		//伙伴升星返回		PBG2CPet_UpStar;
		S2C_Pet_UpStar_Ack = 5,
		//穿戴装备返回		PBCAGPet_Equip;
		S2C_Pet_Equip_Ack = 6,
		//一键穿戴装备返回	PBG2CPet_AutoEquip;
		S2C_Pet_AutoEquip_Ack = 7,
		//伙伴加锁返回		PBCAGPet_Lock;
		S2C_Pet_Lock_Ack = 8,
		//穿戴符文返回		PBCAGPet_RuneEquip;
		S2C_Pet_RuneEquip_Ack = 9,
		//天赋领悟返回	PBCAGPet_Talent;
		S2C_Pet_LearnTalent_Ack = 10,
		//天赋遗忘返回	PBCAGPet_Talent;
		S2C_Pet_DelTalent_Ack = 11,
		//天赋升级返回	PBCAGPet_Talent;
		S2C_Pet_UpgradeTalent_Ack = 12,
		//购买背包		PBCAGPet_BuyBag;
		S2C_Pet_BuyBag_Ack = 13,
		//失败才返回;
		S2C_Pet_Common_Ack = 14,
		//设置皮肤返回	PBCAGPet_SetSkin;
		S2C_Pet_SetSkin_Ack = 15,
		//同步显示属性	PBG2CSynPetAttr;
		S2C_Pet_SynAttr = 16,
		//同步单个战斗力	PBG2CSynPetFightPower;
		S2C_Pet_SynFightPower = 17,
		//穿戴神装返回	PBCAGPet_GodEquip;
		S2C_Pet_GodEquip_Ack = 18,
		//同步套装格子 	PBPlayerGodEquipSuitInfo;
		S2C_Pet_GodSuit_Syn = 19,
		//一键脱下神装	PBU64;
		S2C_Pet_GodUnEquipOneKey_Ack = 20,
		//查询伙伴评分 	PBG2CPetQueryScore;
		S2C_Pet_QueryScore_Ack = 21,
		//同步属性预览	PBG2CSynPreviewAttr;
		S2C_Pet_SynPreviewAttr = 22,
		//置换返回		PBPlayerPetInfo;
		S2C_Pet_Replace_Ack = 23,
		//回退返回		PBPlayerPetInfo;
		S2C_Pet_Degenerate_Ack = 24,
		//神装预览返回	PBG2CGodEquipPreview;
		S2C_Pet_GodEquipPreview = 25,
		//出现没见过的英雄(doing type, sn)	PBU32U64;
		S2C_Pet_NotSeenPet = 26,
		//重生返回(次数，SN)		PBU32U64;
		S2C_Pet_Reborn = 27,
		//购买重生次数返回		PBU32;
		S2C_Pet_BuyRebornCount = 28,
		//吞噬返回(exp, petsn)		PBU32U64;
		S2C_Pet_Swallow = 29,
		//高星重生		PBU64;
		S2C_Pet_HighStarReborn = 30,
		//进化 PBG2CPet_Evolve_Ack;
		S2C_Pet_Evolve_Ack = 31,
		//魂器觉醒  PBG2CHorcruxAwake;
		S2C_Pet_Horcrux_Awake = 32,
		//魂器强化  PBG2CHorcruxLevelUp;
		S2C_Pet_Horcrux_LevelUp = 33,
		//宠物状态变化 PBG2CPetStateChg;
		S2C_Pet_State_Chg = 34,
		//领取档案奖励 PBU32;
		S2C_Pet_PetAchivesReward_Chg = 35,
	}
	/**
	* 伙伴置换标识
	*/
	enum _emPetChangeFlag {
		//	 是否重置进化等级;
		PetChangeFlag_ResetEvolve = 1,
	}
	/**
	* 宠物状态标记改变
	*/
	class PBG2CPetStateChg {
		constructor();
		/**sn*/
		public petsn:Long;
		/**状态标记*/
		public state:number;
		public static encode(message: Pb_God.PBG2CPetStateChg, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CPetStateChg, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CPetStateChg;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CPetStateChg;
	}
	/**
	*同步显示属性
	*/
	class PBG2CSynPreviewAttr {
		constructor();
		/**sn*/
		public petsn:Long;
		/**等级上限*/
		public maxlevel:number;
		/**增加技能*/
		public addskill:Pb_God.PBSkillInfo;
		/**所有属性*/
		public attr:Pb_God.PBAttrInfo[];
		public static encode(message: Pb_God.PBG2CSynPreviewAttr, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CSynPreviewAttr, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CSynPreviewAttr;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CSynPreviewAttr;
	}
	/**
	* 查询伙伴评分
	*/
	class PBG2CPetQueryScore {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**自己的评分*/
		public selfscore:Pb_God.PBPetScoreInfo;
		/**最大的评分*/
		public maxscore:Pb_God.PBPetScoreInfo;
		public static encode(message: Pb_God.PBG2CPetQueryScore, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CPetQueryScore, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CPetQueryScore;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CPetQueryScore;
	}
	/**
	*套装穿戴
	*/
	class PBC2GPet_GodSuitEquipAsk {
		constructor();
		/**方案ID*/
		public id:number;
		/**部位*/
		public pos:number;
		/**穿戴的道具 0表示脱下*/
		public itemsn:Long;
		public static encode(message: Pb_God.PBC2GPet_GodSuitEquipAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GPet_GodSuitEquipAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GPet_GodSuitEquipAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GPet_GodSuitEquipAsk;
	}
	/**
	*套装方案改名
	*/
	class PBC2GPet_GodSuitRenameAsk {
		constructor();
		/**方案ID*/
		public id:number;
		/**方案名称*/
		public name:string;
		public static encode(message: Pb_God.PBC2GPet_GodSuitRenameAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GPet_GodSuitRenameAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GPet_GodSuitRenameAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GPet_GodSuitRenameAsk;
	}
	/**
	*保存套装方案
	*/
	class PBC2GPet_GodSuitSaveAsk {
		constructor();
		/**伙伴sn*/
		public petsn:Long;
		/**方案ID*/
		public id:number;
		public static encode(message: Pb_God.PBC2GPet_GodSuitSaveAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GPet_GodSuitSaveAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GPet_GodSuitSaveAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GPet_GodSuitSaveAsk;
	}
	/**
	*穿戴符文
	*/
	class PBCAGPet_GodEquip {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**部位*/
		public pos:number;
		/**穿戴的道具 0表示脱下*/
		public itemsn:Long;
		public static encode(message: Pb_God.PBCAGPet_GodEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGPet_GodEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGPet_GodEquip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGPet_GodEquip;
	}
	/**
	*同步显示属性
	*/
	class PBG2CSynPetAttr {
		constructor();
		/**伙伴*/
		public sn:Long;
		/**所有属性*/
		public attr:Pb_God.PBAttrInfo[];
		public static encode(message: Pb_God.PBG2CSynPetAttr, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CSynPetAttr, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CSynPetAttr;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CSynPetAttr;
	}
	/**
	*同步战斗力
	*/
	class PBG2CSynPetFightPower {
		constructor();
		/**伙伴*/
		public sn:Long;
		/**同步战斗力*/
		public fightpower:number;
		public static encode(message: Pb_God.PBG2CSynPetFightPower, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CSynPetFightPower, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CSynPetFightPower;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CSynPetFightPower;
	}
	/**
	*设置皮肤
	*/
	class PBCAGPet_SetSkin {
		constructor();
		/**伙伴*/
		public sn:Long;
		/**皮肤ID*/
		public skinid:number;
		public static encode(message: Pb_God.PBCAGPet_SetSkin, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGPet_SetSkin, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGPet_SetSkin;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGPet_SetSkin;
	}
	/**
	*伙伴分解
	*/
	class PBC2GPet_Split {
		constructor();
		/**伙伴*/
		public sn:Long[];
		public static encode(message: Pb_God.PBC2GPet_Split, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GPet_Split, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GPet_Split;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GPet_Split;
	}
	/**
	*伙伴删除
	*/
	class PBCAGPet_BuyBag {
		constructor();
		/**总购买空间*/
		public totalbuyspace:number;
		public static encode(message: Pb_God.PBCAGPet_BuyBag, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGPet_BuyBag, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGPet_BuyBag;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGPet_BuyBag;
	}
	/**
	*伙伴删除
	*/
	class PBG2CPet_Remove_Ack {
		constructor();
		/**伙伴*/
		public sn:Long[];
		public static encode(message: Pb_God.PBG2CPet_Remove_Ack, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CPet_Remove_Ack, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CPet_Remove_Ack;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CPet_Remove_Ack;
	}
	/**
	*伙伴升星
	*/
	class PBC2GPet_UpStar {
		constructor();
		/**要升星的伙伴*/
		public sn:Long;
		/**消耗的伙伴*/
		public expendsn:Long[];
		/**消耗的道具*/
		public items:Pb_God.PBItemSnCount[];
		public static encode(message: Pb_God.PBC2GPet_UpStar, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GPet_UpStar, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GPet_UpStar;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GPet_UpStar;
	}
	/**
	*伙伴升星返回
	*/
	class PBG2CPet_UpStar {
		constructor();
		/**伙伴*/
		public sn:Long;
		/**星星数*/
		public star:number;
		/**星星数*/
		public oldstar:number;
		public static encode(message: Pb_God.PBG2CPet_UpStar, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CPet_UpStar, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CPet_UpStar;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CPet_UpStar;
	}
	/**
	*天赋领悟
	*/
	class PBCAGPet_Talent {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**部位*/
		public pos:number;
		/**技能索引*/
		public skillindex:number;
		public static encode(message: Pb_God.PBCAGPet_Talent, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGPet_Talent, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGPet_Talent;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGPet_Talent;
	}
	/**
	*穿戴符文
	*/
	class PBCAGPet_RuneEquip {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**部位*/
		public pos:number;
		/**穿戴的道具 0表示脱下*/
		public itemsn:Long;
		public static encode(message: Pb_God.PBCAGPet_RuneEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGPet_RuneEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGPet_RuneEquip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGPet_RuneEquip;
	}
	/**
	*伙伴加锁
	*/
	class PBCAGPet_Lock {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**是否加锁*/
		public islock:boolean;
		public static encode(message: Pb_God.PBCAGPet_Lock, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGPet_Lock, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGPet_Lock;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGPet_Lock;
	}
	/**
	*穿戴装备
	*/
	class PBC2GPet_AutoEquip {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**是否穿戴*/
		public isequip:boolean;
		public static encode(message: Pb_God.PBC2GPet_AutoEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GPet_AutoEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GPet_AutoEquip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GPet_AutoEquip;
	}
	/**
	*穿戴装备返回
	*/
	class PBG2CPet_AutoEquip {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**装备信息*/
		public equip:Pb_God.PBPlayerPetEquip[];
		public static encode(message: Pb_God.PBG2CPet_AutoEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CPet_AutoEquip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CPet_AutoEquip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CPet_AutoEquip;
	}
	/**
	*穿戴装备
	*/
	class PBCAGPet_Equip {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**部位类型*/
		public equiptype:number;
		/**装备ID*/
		public equipid:number;
		public static encode(message: Pb_God.PBCAGPet_Equip, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGPet_Equip, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGPet_Equip;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGPet_Equip;
	}
	/**
	*魂器觉醒Req
	*/
	class PBC2GHorcruxAwake {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		public static encode(message: Pb_God.PBC2GHorcruxAwake, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GHorcruxAwake, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GHorcruxAwake;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GHorcruxAwake;
	}
	/**
	*魂器觉醒Res
	*/
	class PBG2CHorcruxAwake {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**魂器*/
		public horcrux:Pb_God.PBPetHorcrux;
		public static encode(message: Pb_God.PBG2CHorcruxAwake, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CHorcruxAwake, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CHorcruxAwake;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CHorcruxAwake;
	}
	/**
	*魂器强化Req
	*/
	class PBC2GHorcruxLevelUp {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		public static encode(message: Pb_God.PBC2GHorcruxLevelUp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GHorcruxLevelUp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GHorcruxLevelUp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GHorcruxLevelUp;
	}
	/**
	*魂器强化Res
	*/
	class PBG2CHorcruxLevelUp {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**魂器*/
		public horcrux:Pb_God.PBPetHorcrux;
		public static encode(message: Pb_God.PBG2CHorcruxLevelUp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CHorcruxLevelUp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CHorcruxLevelUp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CHorcruxLevelUp;
	}
	/**
	*伙伴升级请求
	*/
	class PBC2GPet_UpLevel_Ask {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**级数*/
		public addlevel:number;
		public static encode(message: Pb_God.PBC2GPet_UpLevel_Ask, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GPet_UpLevel_Ask, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GPet_UpLevel_Ask;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GPet_UpLevel_Ask;
	}
	/**
	*伙伴升级返回
	*/
	class PBG2CPet_UpLevel_Ack {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**伙伴等级*/
		public petlevel:number;
		public static encode(message: Pb_God.PBG2CPet_UpLevel_Ack, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CPet_UpLevel_Ack, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CPet_UpLevel_Ack;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CPet_UpLevel_Ack;
	}
	/**
	*伙伴升阶
	*/
	class PBCAGPet_Advance {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**伙伴当前阶数*/
		public advancelevel:number;
		/**是否显示突破成功界面*/
		public bshow:boolean;
		public static encode(message: Pb_God.PBCAGPet_Advance, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGPet_Advance, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGPet_Advance;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGPet_Advance;
	}
	/**
	*伙伴置换
	*/
	class PBCAGPet_Replace {
		constructor();
		/**7星以上基础伙伴sn*/
		public sn:Long;
		/**5星材料*/
		public material:Long[];
		public static encode(message: Pb_God.PBCAGPet_Replace, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCAGPet_Replace, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCAGPet_Replace;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCAGPet_Replace;
	}
	/**
	*神装预览返回
	*/
	class PBG2CGodEquipPreview {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**战斗力*/
		public power:number;
		/**套装id*/
		public suit:number;
		/**属性*/
		public attri:Pb_God.PBAttrInfo[];
		public static encode(message: Pb_God.PBG2CGodEquipPreview, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CGodEquipPreview, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CGodEquipPreview;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CGodEquipPreview;
	}
	/**
	*伙伴进化请求
	*/
	class PBC2GPet_Evolve_Ask {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**是否进化形态*/
		public isevolve:boolean;
		public static encode(message: Pb_God.PBC2GPet_Evolve_Ask, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GPet_Evolve_Ask, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GPet_Evolve_Ask;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GPet_Evolve_Ask;
	}
	/**
	*伙伴进化返回
	*/
	class PBG2CPet_Evolve_Ack {
		constructor();
		/**伙伴sn*/
		public sn:Long;
		/**是否进化形态*/
		public isevolve:boolean;
		/**皮肤ID*/
		public skinid:number;
		/**进化阶段*/
		public evolve:number;
		public static encode(message: Pb_God.PBG2CPet_Evolve_Ack, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CPet_Evolve_Ack, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CPet_Evolve_Ack;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CPet_Evolve_Ack;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 远征系统返回
	*/
	enum _emResultExpedition_19 {
		// 成功;
		R_ResultExpedition_Succeed = 0,
		// 失败;
		R_ResultExpedition_Fail = 1,
		// 奖励已经领取;
		R_ResultExpedition_HavePrize = 2,
		// 未通关此关卡;
		R_ResultExpedition_NeedStageID = 3,
		// 道具不足	;
		R_ResultExpedition_NeedItem = 4,
		// 今日已经选择模式;
		R_ResultExpedition_HaveSelect = 5,
		// 战力不足;
		R_ResultExpedition_NeedFightPower = 6,
		// 关卡已经挑战;
		R_ResultExpedition_StageHaveFight = 7,
		// 请先通关前置关卡;
		R_ResultExpedition_NeedPreStage = 8,
		// 伙伴已经死亡;
		R_ResultExpedition_PetHaveDead = 9,
		// 请通关上一个难度;
		R_ResultExpedition_NeedMaxType = 10,
		// 超过可雇佣支援数量;
		R_ResultExpedition_SupportCount = 11,
		// 已经雇佣过了;
		R_ResultExpedition_AlreadySupport = 12,
		// 还未雇佣不可上场;
		R_ResultExpedition_NotSupport = 13,
		// 已经使用过了;
		R_ResultExpedition_UsedSupport = 14,
		// 雇佣支援英雄等级不在范围内;
		R_ResultExpedition_SupportLevel = 15,
		// 支援不存在;
		R_ResultExpedition_SupportNotExist = 16,
	}
	/**
	*----远征模块
	*/
	enum _emC2S_Expedition_Protocol {
		//选择难度			PBU32;
		C2S_Expedition_Select = 1,
		//领取奖励			PBU32;
		C2S_Expedition_StagePrize = 2,
		//查询关卡信息		PBU32;
		C2S_Expedition_QueryStageInfo = 3,
		//查询伙伴血量	;
		C2S_Expedition_QueryPetHp = 4,
		//废弃;
		C2S_Expedition_XXXXXXXXXX = 5,
	}
	/**
	*----远征模块
	*/
	enum _emS2C_Expedition_Protocol {
		//通用返回(失败才返回);
		S2C_Expedition_CommonAck = 1,
		//选择难度返回			PBG2CExpeditionInfo;
		S2C_Expedition_SelectAck = 2,
		//领取奖励返回 		PBU32;
		S2C_Expedition_StagePrizeAck = 3,
		//查询关卡信息返回 	PBExpeditionTar;
		S2C_Expedition_StageInfoAck = 4,
		//同步伙伴血量 		PBG2CExpeditionSynPetHp		;
		S2C_Expedition_SynPetHp = 5,
		//同步最新关卡 		PBG2CExpeditionSynCurStage		;
		S2C_Expedition_SynCurStage = 6,
		//废弃;
		S2C_Expedition_XXXXXXXXX = 7,
		//废弃;
		S2C_Expedition_XXXXXX = 8,
	}
	/**
	* 登录返回玩家角色列表
	*/
	class PBG2CExpeditionSynCurStage {
		constructor();
		/**通关最大的类型*/
		public maxtype:number;
		/**正在打的关卡ID 0表示通关*/
		public curstage:number;
		public static encode(message: Pb_God.PBG2CExpeditionSynCurStage, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CExpeditionSynCurStage, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CExpeditionSynCurStage;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CExpeditionSynCurStage;
	}
	/**
	* 登录返回玩家角色列表
	*/
	class PBG2CExpeditionSynPetHp {
		constructor();
		/** 使用的伙伴数据*/
		public usepethp:Pb_God.PBExpeditionPetHp[];
		public static encode(message: Pb_God.PBG2CExpeditionSynPetHp, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CExpeditionSynPetHp, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CExpeditionSynPetHp;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CExpeditionSynPetHp;
	}
	/**
	* 登录返回玩家角色列表
	*/
	class PBG2CExpeditionInfo {
		constructor();
		/**远征类型*/
		public stagetype:number;
		/**正在打的关卡ID 0表示通关*/
		public curstage:number;
		public static encode(message: Pb_God.PBG2CExpeditionInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CExpeditionInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CExpeditionInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CExpeditionInfo;
	}
	/**
	* 登录返回玩家角色列表
	*/
	class PBG2WExpeditionToplist {
		constructor();
		/** 关卡索引*/
		public index:number;
		/** 最低战力*/
		public minfightpower:number;
		/** 最高战力*/
		public maxfightpower:number;
		public static encode(message: Pb_God.PBG2WExpeditionToplist, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2WExpeditionToplist, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2WExpeditionToplist;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2WExpeditionToplist;
	}
	/**
	* 登录返回玩家角色列表
	*/
	class PBW2GExpeditionToplist {
		constructor();
		/** 显示*/
		public display:Pb_God.PBPlayerDisplay;
		/** 伙伴数据*/
		public battlepet:Pb_God.PBBattlePet;
		/** 战力*/
		public fightpower:number;
		/** 关卡索引*/
		public index:number;
		/** 最低战力*/
		public minfightpower:number;
		/** 最高战力*/
		public maxfightpower:number;
		public static encode(message: Pb_God.PBW2GExpeditionToplist, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBW2GExpeditionToplist, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBW2GExpeditionToplist;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBW2GExpeditionToplist;
	}
}
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

declare namespace Pb_God {
	/**
	*----探宝返回
	*/
	enum _emResultTreasure_36 {
		//  成功;
		R_ResultTreasure_Succeed = 0,
		//  失败;
		R_ResultTreasure_Fail = 1,
		//  需要物品不足;
		R_ResultTreasure_NeedItem = 2,
		//  需要VIP等级不足;
		R_ResultTreasure_NeedVIP = 3,
		//  已经拿了;
		R_ResultTreasure_AlreadyTake = 4,
		//  玩家等级不足;
		R_ResultTreasure_NeedLevel = 5,
	}
	/**
	*----探宝模块
	*/
	enum _emC2S_Treasure_Protocol {
		// 	 刷新(type)                   		PBU32;
		C2S_Treasure_Refresh = 1,
		// 	 探宝(cost index)             		PBC2GTreasureHunt;
		C2S_Treasure_Hunt = 2,
		// 	 幸运值兑换物品(index)	     		 PBU32;
		C2S_Treasure_Lucky = 3,
	}
	/**
	*----探宝模块
	*/
	enum _emS2C_Treasure_Protocol {
		//	 通用错误返回;
		S2C_Treasure_Common = 0,
		//	 刷新返回				PBG2CTreasureRefresh;
		S2C_Treasure_Refresh = 1,
		//	 探宝返回				PBG2CTreasureHunt;
		S2C_Treasure_Hunt = 2,
		//	 幸运值兑换物品返回 	 PBG2CTreasureLucky;
		S2C_Treasure_Lucky = 3,
	}
	/**
	* 探宝的请求
	*/
	class PBC2GTreasureHunt {
		constructor();
		/** 消耗索引*/
		public index:number;
		/** 是否是再来一次(仅供客户端使用)*/
		public oncemore:boolean;
		public static encode(message: Pb_God.PBC2GTreasureHunt, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GTreasureHunt, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GTreasureHunt;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GTreasureHunt;
	}
	/**
	* 刷新的数据
	*/
	class PBG2CTreasureRefresh {
		constructor();
		/** 类型*/
		public type:number;
		/** 刷新出来的物品index(也就是displayItems)，先后顺序对应位置*/
		public items:number[];
		/** 刷出来随机物品（hunt表中index条目的第几个随机物品，从0开始），位置与items对应*/
		public rand:number[];
		/** 下次免费刷新的重置时间*/
		public resettime:number;
		public static encode(message: Pb_God.PBG2CTreasureRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTreasureRefresh, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTreasureRefresh;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTreasureRefresh;
	}
	/**
	* 探宝的数据
	*/
	class PBG2CTreasureHunt {
		constructor();
		/** 类型*/
		public type:number;
		/** 得到的物品position(在displayitems里的位置，从0开始的),先后顺序对应第几次摇出*/
		public items:number[];
		/** 是否是再来一次(仅供客户端使用)*/
		public oncemone:boolean;
		/** 是否有需要广播的物品*/
		public broadcast:boolean;
		public static encode(message: Pb_God.PBG2CTreasureHunt, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTreasureHunt, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTreasureHunt;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTreasureHunt;
	}
	/**
	* 幸运兑换的数据
	*/
	class PBG2CTreasureLucky {
		constructor();
		/** 索引*/
		public index:number;
		/** 是否重置*/
		public reset:boolean;
		public static encode(message: Pb_God.PBG2CTreasureLucky, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CTreasureLucky, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CTreasureLucky;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CTreasureLucky;
	}
}
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

declare namespace Pb_God {
	/**
	*----共鸣的返回
	*/
	enum _emResultResonance_51 {
		//  成功;
		R_Resonance_Succeed = 0,
		//  失败;
		R_Resonance_Fail = 1,
		//  格子已全部开启;
		R_Resonance_GridAllOpen = 2,
		//  道具不足;
		R_Resonance_NeedItem = 3,
		//  条件不满足;
		R_Resonance_Condition = 4,
		//  冷却已重置;
		R_Resonance_NoCD = 5,
		//  格子处于冷却中;
		R_Resonance_CDTime = 6,
		//  格子已上阵英雄;
		R_Resonance_HasPet = 7,
		//  格子未开启;
		R_Resonance_GridNoOpen = 8,
	}
	/**
	*----共鸣类型
	*/
	enum _emResonanceType {
		//  等级;
		Resonance_Type_Level = 1,
		//  星级;
		Resonance_Type_Star = 2,
	}
	/**
	*----共鸣条件类型
	*/
	enum _emResonanceCondType {
		//  守护等级;
		Resonance_Cond_DefendLevel = 1,
	}
	/**
	*----共鸣请求
	*/
	enum _emC2S_Resonance_Protocol {
		// 	 开启格子			PBC2GResonanceOpenGrid;
		C2S_Resonance_OpenGrid = 1,
		// 	 重置冷却			PBC2GResonanceResetCD;
		C2S_Resonance_ResetCD = 2,
		// 	 放置共鸣			PBC2GResonancePlaceGrid;
		C2S_Resonance_PlaceGrid = 3,
		// 	 星级共鸣升星 	 PBC2GResonanceUpStar;
		C2S_Resonance_UpStar = 4,
	}
	/**
	*----共鸣返回
	*/
	enum _emS2C_Resonance_Protocol {
		// 	 开启格子返回 PBG2CResonanceOpenGrid;
		S2C_Resonance_OpenGrid = 1,
		// 	 重置冷却 PBG2CResonanceGridChg;
		S2C_Resonance_ResetCD = 2,
		// 	 放置共鸣 PBG2CResonanceGridChg;
		S2C_Resonance_PlaceGrid = 3,
		// 	 某个共鸣开启 PBPlayerResonanceInfo;
		S2C_Resonance_SystemOpen = 4,
		// 	 共鸣主体更新 PBG2CResonanceMainPetSn;
		S2C_Resonance_MainPetSn = 5,
		// 	 升星返回 PBG2CResonanceUpStar;
		S2C_Resonance_UpStar = 6,
	}
	/**
	*开启格子
	*/
	class PBC2GResonanceOpenGrid {
		constructor();
		/**_emResonanceType*/
		public type:number;
		public static encode(message: Pb_God.PBC2GResonanceOpenGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GResonanceOpenGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GResonanceOpenGrid;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GResonanceOpenGrid;
	}
	/**
	*重置cd
	*/
	class PBC2GResonanceResetCD {
		constructor();
		/**_emResonanceType*/
		public type:number;
		/**格子索引id*/
		public grididx:number;
		public static encode(message: Pb_God.PBC2GResonanceResetCD, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GResonanceResetCD, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GResonanceResetCD;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GResonanceResetCD;
	}
	/**
	*放置共鸣
	*/
	class PBC2GResonancePlaceGrid {
		constructor();
		/**_emResonanceType*/
		public type:number;
		/**格子索引id*/
		public grididx:number;
		/**宠物id*/
		public petsn:Long;
		public static encode(message: Pb_God.PBC2GResonancePlaceGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GResonancePlaceGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GResonancePlaceGrid;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GResonancePlaceGrid;
	}
	/**
	*星级共鸣升星
	*/
	class PBC2GResonanceUpStar {
		constructor();
		/**格子索引id*/
		public grididx:number;
		public static encode(message: Pb_God.PBC2GResonanceUpStar, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GResonanceUpStar, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GResonanceUpStar;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GResonanceUpStar;
	}
	/**
	*开启格子返回
	*/
	class PBG2CResonanceOpenGrid {
		constructor();
		/**类型*/
		public type:number;
		/**已开启最大格子数*/
		public maxgrididx:number;
		public static encode(message: Pb_God.PBG2CResonanceOpenGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CResonanceOpenGrid, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CResonanceOpenGrid;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CResonanceOpenGrid;
	}
	/**
	*格子更新
	*/
	class PBG2CResonanceGridChg {
		constructor();
		/**类型*/
		public type:number;
		/**格子数据*/
		public grid:Pb_God.PBPlayerResonanceGrid;
		public static encode(message: Pb_God.PBG2CResonanceGridChg, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CResonanceGridChg, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CResonanceGridChg;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CResonanceGridChg;
	}
	/**
	*共鸣主体更新
	*/
	class PBG2CResonanceMainPetSn {
		constructor();
		/**类型*/
		public type:number;
		/**共鸣主体*/
		public petlist:Long[];
		public static encode(message: Pb_God.PBG2CResonanceMainPetSn, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CResonanceMainPetSn, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CResonanceMainPetSn;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CResonanceMainPetSn;
	}
	/**
	*升星的返回
	*/
	class PBG2CResonanceUpStar {
		constructor();
		/**旧的星级*/
		public oldstar:number;
		/**宠物sn*/
		public petsn:Long;
		public static encode(message: Pb_God.PBG2CResonanceUpStar, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CResonanceUpStar, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CResonanceUpStar;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CResonanceUpStar;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------   dip
	*/
	enum _emResultDip {
		// 成功;
		R_ResultDip_Succeed = 0,
		// 失败;
		R_ResultDip_Fail = 1,
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 结果
	*/
	enum _emResultNet_255 {
		// 成功;
		NetResult_Succeed = 0,
		// 失败;
		NetResult_Fail = 1,
		// 大小错误;
		NetResult_SizeError = 2,
		// 版本错误 ;
		NetResult_VersionError = 3,
		// 发送错误 ;
		NetResult_SendError = 4,
		// 数据库错误;
		NetResult_DBError = 5,
		// 上线;
		NetResult_Online = 6,
		// 离线*/ ;
		NetResult_Offline = 7,
		// 完成*/ ;
		NetResult_Complete = 8,
		//;
		NetResult_Max = 9,
		// 正在登录中;
		R_Login_Loging = 10,
		// 等待消息;
		R_Login_Wait = 11,
		// 密码错误;
		R_Login_PwdError = 12,
		// IP冻结;
		R_Login_Disable = 13,
		// 帐号冻结;
		R_Login_Freeze = 14,
		// 超时;
		R_Login_Timeout = 15,
		// 数据库错误;
		R_Login_DBError = 16,
		// 需要重新登录;
		R_Login_Reloging = 17,
		// 帐号正在登录中;
		R_Login_Entering = 18,
		// 选择服务器错误【一般为配置错误】;
		R_Login_ServerID = 19,
		// 在线人数已满;
		R_Login_OnlineMax = 20,
		// 登录踢人;
		R_Login_Kickout = 21,
		// 无此账号;
		R_Login_NoAccount = 22,
		// 服务器未链接成功稍后再试;
		R_PlayerCreate_Ignore = 23,
		// 可创建角色已满;
		R_PlayerCreate_Full = 24,
		// 职业错误;
		R_PlayerCreate_JobError = 25,
		// 名称中包含禁用字词;
		R_PlayerCreate_BadWord = 26,
		// 角色正在创建中;
		R_PlayerCreate_Createing = 27,
		// 正在创建请稍等;
		R_PlayerCreate_Wait = 28,
		// 角色名已被使用;
		R_PlayerCreate_Useed = 29,
		// 角色名长度不足;
		R_PlayerCreate_NotLength = 30,
		// 无此账号;
		R_PlayerDelete_NoPlayerID = 31,
		// 场景已关闭;
		R_EnterScene_Close = 32,
		//  检测名字中;
		R_PlayerCheckName_Checking = 33,
		//  检测名字等待;
		R_PlayerCheckName_Wait = 34,
		//  随便名字次数超出限制;
		R_PlayerCheckName_Count = 35,
		// 包含非法字符;
		R_PlayerCreate_IllegalCharacter = 36,
		// 平台验证错误;
		R_Login_Platform = 37,
		// 该服务器暂时无法参加此玩法;
		R_EnterScene_GroupLimit = 38,
		// 作为未实名用户，您的体验时长已结束，请实名认证之后再登陆游戏。;
		NetResult_NoBindTimeOut = 39,
		// 作为未成年用户，您的体验时长已结束，无法登陆游戏。;
		NetResult_noAultTimeOut = 40,
		// 作为未成年用户，您的游戏时间将会受限，敬请知晓。;
		NetResult_noAultNotLogin = 41,
		// 作为未实名用户，您的游戏时间将会受限，敬请知晓。;
		NetResult_noBlindNotLogin = 42,
		//  角色不存在;
		R_InviteCode_NoPlayer = 50,
		//  邀请角色不存在;
		R_InviteCode_NoInvitePlayer = 51,
		//  该账户已经使用过邀请码;
		R_InviteCode_HadInvited = 52,
		//  对方可邀请数量已满;
		R_InviteCode_InviteNum = 53,
		//  您的游戏数据正在保存中，请稍后登录。;
		R_SystemBusy_PlayerSaveData = 54,
	}
	/**
	*------------------------------ 连接标志
	*/
	enum _e_P_OperateFlag {
		// 验证请求 	VerifyAsk;
		P_SO_Verify_Ask = 0,
		// Ping请求	PingAsk;
		P_SO_Ping_Ask = 1,
		// 登录请求	(取CAW PBLoginAsk和CAG PBC2GLoginAsk);
		P_SO_Login_Ask = 2,
		// 验证应答	VerifyAck;
		P_SO_Verify_Ack = 3,
		// Ping应答	PingAck;
		P_SO_Ping_Ack = 4,
		// 断开命令 	无内容;
		P_SO_Disconnect = 5,
		// 错误包通知	BadNotify;
		P_SO_Bad_Notify = 6,
		// 踢出通知 	无内容;
		P_SO_Kick_Notify = 7,
		// 登录应答	(取CAW PBLoginAck 和CAG PBG2CLoginAck)	;
		P_SO_Login_Ack = 8,
		// 读取超时	无内容	_emNetResult;
		P_SO_TimeoutRead = 9,
		// 写入超时	无内容	_emNetResult;
		P_SO_TimeoutWrite = 10,
	}
	/**
	* 版本类型
	*/
	enum _emVersionMainType {
		// 				 客户端用的版本类型;
		VersionMainType_Cleint = 1,
		// 				 服务端内部用的类型 ;
		VersionMainType_Server = 2,
	}
	/**
	* 验证请求
	*/
	class VerifyAsk {
		constructor();
		/** 主版本号*/
		public mainVersion:number;
		/** 子版本号*/
		public subVersion:number;
		public static encode(message: Pb_God.VerifyAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.VerifyAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.VerifyAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.VerifyAsk;
	}
	/**
	* 验证返回	
	*/
	class VerifyAck {
		constructor();
		/** 加密秘钥*/
		public key:Long;
		/** 系统启动毫秒*/
		public systemTick:Long;
		/** 系统时间*/
		public systemTime:number;
		public static encode(message: Pb_God.VerifyAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.VerifyAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.VerifyAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.VerifyAck;
	}
	/**
	*ping 请求	
	*/
	class PingAsk {
		constructor();
		/** 序号*/
		public order:number;
		public static encode(message: Pb_God.PingAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PingAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PingAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PingAsk;
	}
	/**
	*ping 返回	
	*/
	class PingAck {
		constructor();
		/** 序号*/
		public order:number;
		/** 系统启动毫秒*/
		public systemTick:Long;
		/** 系统时间*/
		public systemTime:number;
		public static encode(message: Pb_God.PingAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PingAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PingAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PingAck;
	}
	/**
	* 通知消息错误
	*/
	class BadNotify {
		constructor();
		/** 包的大小*/
		public packetSize:number;
		/** 主协议*/
		public mainProtocol:number;
		/** 子协议*/
		public protocol:number;
		/** 事件类型*/
		public eventFlag:number;
		public static encode(message: Pb_God.BadNotify, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.BadNotify, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.BadNotify;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.BadNotify;
	}
}
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

declare namespace Pb_God {
	/**
	*----福利返回
	*/
	enum _emResultWeal_32 {
		//  成功;
		R_ResultWeal_Succeed = 0,
		//  失败;
		R_ResultWeal_Fail = 1,
		//  已经签到;
		R_ResultWeal_HaveSign = 2,
		//  未充值不能领取奖励;
		R_ResultWeal_SignNoCharge = 3,
		//  点金没有次数了;
		R_ResultWeal_ClickGoldTimes = 4,
		//  点金消耗不足;
		R_ResultWeal_ClickGoldCost = 5,
		//  返利领取成功;
		R_ResultWeal_FanliAwardSucceed = 6,
		//  返利领取失败;
		R_ResultWeal_FanliAwardFail = 7,
		//  已经得到奖励了;
		R_ResultWeal_PrizeAlreadyGot = 8,
		//  时间未达到;
		R_ResultWeal_PrizeOnlineTime = 9,
		//  先领取前面的奖励;
		R_ResultWeal_PrizePrivious = 10,
		//  不在本次循环内;
		R_ResultWeal_NotInCycle = 11,
		//  已经购买;
		R_ResultWeal_Bought = 12,
		//  所需道具不足;
		R_ResultWeal_NeedItem = 13,
		//  该玩法未达到领取条件;
		RET_CODE_FIND_BACK_CAN_NOT_DRAW = 14,
		// 钻石不足，无法领取;
		RET_CODE_DIAMOND_NOT_ENOUGH = 15,
		// 未找到该玩法资源;
		RET_CODE_NOT_FOUND_RESOURCE = 16,
	}
	/**
	*----福利模块
	*/
	enum _emC2S_Weal_Protocol {
		// 	 签到;
		C2S_Weal_Signin = 1,
		//	 点石成金获取奖励 PBU32;
		C2S_Weal_ClickGold = 2,
		//	 获取返利奖励;
		C2S_Weal_GetFanLiAward = 3,
		//	 cdk验证	PBString;
		C2S_Weal_CDK = 4,
		//	 领取在线奖励	PBU32;
		C2S_Weal_OnlinePrize = 5,
		//	 领取礼包	PBU32;
		C2S_Weal_GetGift = 6,
		//	获取找回资源数据 PBC2GResourceFindBackInfo;
		C2S_ResourceFindBack_GetInfo = 7,
		//	领取找回资源  PBC2GDrawFindBack;
		C2S_ResourceFindBack_Draw = 8,
	}
	/**
	*----福利模块
	*/
	enum _emS2C_Weal_Protocol {
		// 	 福利通用返回;
		S2C_Weal_Common_ACK = 1,
		//	 签到返回 返回当前的状态		PBU32;
		S2C_Weal_Signin = 2,
		//	 点石成金获取奖励返回			PBG2CClickGold;
		S2C_Weal_ClickGold = 3,
		//	 点石成金重置次数通知			PBU32;
		S2C_Weal_ClickGoldReset = 4,
		//	 返回返利结果			PBFanliInfo;
		S2C_Weal_FanliResult = 5,
		//	 cdk验证返回	PBU32String;
		S2C_Weal_CDK = 26,
		//	 领取在线奖励返回	PBU32;
		S2C_Weal_OnlinePrize = 7,
		//	 领取礼包返回	PBU32;
		S2C_Weal_GetGift = 30,
		//	获取找回资源数据返回  PBG2CResourceFindBackInfo;
		S2C_ResourceFindBack_GetInfo = 8,
		//	领取找回资源 	PBG2CDrawFindBack;
		S2C_ResourceFindBack_Draw = 9,
	}
	/**
	*----充值返利状态
	*/
	enum player_FanLi_State {
		//	初始化状态	;
		FanLi_State_Init = 0,
		//	可以领取奖励	表示已经获得玩家的充值数据;
		Fanli_state_CanAward = 1,
		//	已经领取奖励	玩家有充值数据，并且已经领取了;
		Fanli_state_Awarded = 2,
	}
	/**
	*----月卡信息
	*/
	class PBG2CMonthCard {
		constructor();
		/** 类型*/
		public type:number;
		/** 获取的时间，0是没有获取到这种月卡*/
		public gettime:number;
		/** 自失效以来，累计充值额度*/
		public recharge:number;
		/** 当天奖励是否获取*/
		public reward:boolean;
		public static encode(message: Pb_God.PBG2CMonthCard, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CMonthCard, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CMonthCard;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CMonthCard;
	}
	/**
	*----返回点石成金信息
	*/
	class PBG2CClickGold {
		constructor();
		/** 类型*/
		public type:number;
		/** 点击次数*/
		public times:number;
		public static encode(message: Pb_God.PBG2CClickGold, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CClickGold, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CClickGold;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CClickGold;
	}
	/**
	*----充值返利信息
	*/
	class PBFanliInfo {
		constructor();
		/** 充值金额*/
		public money:number;
		/** 状态 参考player_FanLi_State*/
		public state:number;
		public static encode(message: Pb_God.PBFanliInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBFanliInfo, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBFanliInfo;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBFanliInfo;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 副本系统返回
	*/
	enum _emResultCopymap_2 {
		// 成功;
		R_ResultCopymap_Succeed = 0,
		// 失败;
		R_ResultCopymap_Fail = 1,
		// 进入次数不足;
		R_ResultCopymap_MaxEnterCount = 2,
		// 未通关此难度不能扫荡;
		R_ResultCopymap_SweepNeedWin = 3,
		// 道具不足;
		R_ResultCopymap_NeedItem = 4,
		// 玩家等级不足;
		R_ResultCopymap_NeedPlayerLevel = 5,
		// 玩家战力不足;
		R_ResultCopymap_NeedFightpower = 6,
		// 需要前置关卡;
		R_ResultCopymap_NeedPreSubType = 7,
		// 已经有次数;
		R_ResultCopymap_HaveEnterCount = 8,
		// 无购买次数，请提升VIP等级;
		R_ResultCopymap_NoBuyCount = 9,
	}
	/**
	*----副本模块
	*/
	enum _emC2S_Copymap_Protocol {
		//扫荡	PBU32;
		C2S_Copymap_Sweep = 0,
		//购买次数 PBU32;
		C2S_Copymap_BuyCount = 1,
	}
	/**
	*----副本模块
	*/
	enum _emS2C_Copymap_Protocol {
		//通用返回(失败才返回);
		S2C_Copymap_CommonAck = 1,
		//同步副本数据 PBPlayerCopymapInfo;
		S2C_Copymap_SynInfo = 2,
		//同步购买次数 PBPlayerCopymapInfo;
		S2C_Copymap_BuyCount = 3,
	}
}
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

declare namespace Pb_God {
	/**
	*----客户端到服务器
	*/
	enum _emC2S_WeekChampion_Protocol {
		//我的竞猜 	无内容;
		C2S_WeekChampion_SelfGuessAsk = 1,
		//查询竞猜		无内容;
		C2S_WeekChampion_QueryGuessAsk = 2,
		//竞猜下注		PBC2GChampionGuessAsk;
		C2S_WeekChampion_GuessAsk = 3,
		//查询32强		PBU32;
		C2S_WeekChampion_Query32List = 4,
		//查询4强	;
		C2S_WeekChampion_Query4List = 5,
		//我的竞猜记录		;
		C2S_WeekChampion_GuessRecordAsk = 6,
		//我的战斗记录	;
		C2S_WeekChampion_FightRecordAsk = 7,
		//发送弹幕		PBC2GChampionSendDanmuAsk;
		C2S_WeekChampion_SendDanmuAsk = 8,
		//请求查询弹幕 PBC2GChampionQueryDanmu	;
		C2S_WeekChampion_QueryDanmuAsk = 9,
		//查询下注信息	;
		C2S_WeekChampion_QueryOddsAsk = 10,
		//打开	;
		C2S_WeekChampion_OpenAsk = 11,
		//查看对战信息	PBC2GChampionQueryBattleInfo	;
		C2S_WeekChampion_QueryBattleInfo = 12,
		//查询对应回合玩家		PBC2GChampionQueryRound;
		C2S_WeekChampion_QueryRound = 13,
		//点赞		PBC2GChampionLike;
		C2S_WeekChampion_Like = 14,
		//gm开启活动		PBC2GChampionGM;
		C2S_WeekChampion_GmOpt = 30,
		//战斗结果返回		;
		C2S_WeekChampion_FightResult = 31,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_WeekChampion_Protocol {
		//失败才返回;
		S2C_WeekChampion_Common_Ack = 0,
		//我的竞猜返回		PBG2CChampionSelfGuessAck;
		S2C_WeekChampion_SelfGuessAck = 1,
		//查询竞猜返回		PBG2CChampionQueryGuessAck;
		S2C_WeekChampion_QueryGuessAck = 2,
		//竞猜下注同步返回	PBG2CChampionSynGuessAck;
		S2C_WeekChampion_SysGuessAck = 3,
		//查询32强返回		PBG2CChampionQuery32ListAck;
		S2C_WeekChampion_Query32ListAck = 4,
		//查询4强返回		PBG2CChampionQuery4ListAck;
		S2C_WeekChampion_Query4ListAck = 5,
		//我的竞猜记录		PBChampionGuessRecord;
		S2C_WeekChampion_GuessRecordAck = 6,
		//我的战斗记录		PBChampionFightRecord;
		S2C_WeekChampion_FightRecordAck = 7,
		//发送弹幕返回		无内容;
		S2C_WeekChampion_SendDanmuAck = 8,
		//竞猜结果			PBG2CChampionGuessResultAck;
		S2C_WeekChampion_GuessReusltAck = 9,
		//查询弹幕返回		PBG2CChampionQueryDanmuAck;
		S2C_WeekChampion_QueryDanmuAck = 10,
		//打开返回			PBG2CChampionOpenAck;
		S2C_WeekChampion_OpenAck = 11,
		//我的结算结果		PBG2CChampionEndResultAck;
		S2C_WeekChampion_EndResultAck = 12,
		//查看对战信息		PBChampionBattle;
		S2C_WeekChampion_QueryBattleInfo = 13,
		//同步状态			PBG2CChampionSynState;
		S2C_WeekChampion_SynState = 14,
		//同步排行结果		PBG2CChampionSynTopResult;
		S2C_WeekChampion_SynTopResult = 15,
		//查询对应回合数据	PBG2CChampionQueryRoundAck;
		S2C_WeekChampion_QueryRoundAck = 16,
		//点赞返回			PBU32U32;
		S2C_WeekChampion_Like = 17,
	}
	/**
	*冠军赛回合
	*/
	enum _emWeekChampionRound {
		//没有比赛;
		_emWeekChampionRound_None = 0,
		//选拔赛回合1;
		_emWeekChampionRound_Trials1 = 1,
		//选拔赛回合2;
		_emWeekChampionRound_Trials2 = 2,
		//选拔赛回合3;
		_emWeekChampionRound_Trials3 = 3,
		//选拔赛回合4;
		_emWeekChampionRound_Trials4 = 4,
		//选拔赛回合5;
		_emWeekChampionRound_Trials5 = 5,
		//选拔赛回合6;
		_emWeekChampionRound_Trials6 = 6,
		//64强;
		_emWeekChampionRound_TOP64 = 7,
		//32强;
		_emWeekChampionRound_TOP32 = 8,
		//16强;
		_emWeekChampionRound_TOP16 = 9,
		//8强;
		_emWeekChampionRound_TOP8 = 10,
		//半决赛;
		_emWeekChampionRound_TOP4 = 11,
		//决赛;
		_emWeekChampionRound_TOP2 = 12,
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 通用系统返回
	*/
	enum _emResultCommon_1 {
		// 成功;
		R_ResultCommon_Succeed = 0,
		// 失败;
		R_ResultCommon_Fail = 1,
		// 位面中;
		R_ResultCommon_InPlane = 2,
		// 玩家不在线;
		R_ResultCommon_PlayerOffline = 3,
		// 名字被使用过;
		R_ResultCommon_PlayerNameUsed = 4,
		// 重命名中;
		R_ResultCommon_PlayerRenameing = 5,
		// 已经重新命名;
		R_ResultCommon_PlayerHaveRename = 6,
		//  名字重名;
		R_ResultCommon_RanameUsed = 7,
		//  名字字符非法;
		R_ResultCommon_RanameIllegalCharacter = 8,
		//  名字长度非法;
		R_ResultCommon_RanameIllegalNotLength = 9,
		// 名字含非法字符;
		R_ResultCommon_RanameIllegalBadWord = 10,
		// 需要玩家等级;
		R_ResultCommon_NeedPlayerLevel = 11,
		// 发言过快;
		R_ResultCommon_TalkNeedStep = 12,
		// 无此玩家;
		R_ResultCommon_NoPlayer = 13,
		// 发言违规;
		R_ResultCommon_TalkForbid = 14,
		// 切磋状态中;
		R_ResultCommon_FightEachOtherIng = 16,
		// 切磋状态错误;
		R_ResultCommon_FightEachOtherState = 17,
		// 切磋目标不存在;
		R_ResultCommon_FightEachOtherNotFound = 18,
		// 系统未开启;
		R_ResultCommon_SystemClose = 19,
		// 钻石不足;
		R_ResultCommon_NeedDiamond = 20,
		// 已经关注该玩家了;
		R_ResultCommon_AlreadyFollow = 21,
		// 没有关注该玩家;
		R_ResultCommon_NotFollow = 22,
		// 对方没有同意切磋;
		R_ResultCommon_FightEachOtherNotAllow = 23,
		// 已经使用邀请码了;
		R_ResultCommon_AlreadyUseInviteCode = 24,
		// 对方邀请数量已满;
		R_ResultCommon_InviteMaxNum = 25,
		// 邀请码无效;
		R_ResultCommon_InviteNotExist = 26,
		// 无可领取邀请奖励数量;
		R_ResultCommon_InvitePrizeNum = 27,
		// 已领取奖励;
		R_ResultCommon_GotPrize = 28,
	}
	/**
	*----通用功能模块
	*/
	enum _emC2S_Common_Protocol {
		//前端准备就绪;
		C2S_Common_Go = 0,
		//保存数据请求		PBClientData;
		C2S_Common_ClientSave = 1,
		//文本命令 			PBC2GGMCmdTxtCmd;
		C2S_Common_GMCmd = 3,
		//查询玩家 			PBC2GQueryPlayerView;
		C2S_Common_QueryPlayerView = 4,
		//查询玩家伙伴 		PBC2GQueryPetView;
		C2S_Common_QueryPetView = 5,
		//重命名 			PBPlayerRename;
		C2S_Common_PlayerRename = 6,
		//查询跨服组;
		C2S_Common_QueryBigWorldGroup = 7,
		//查询玩家名称 	PBC2GCommonFindPlayerName;
		C2S_Common_FindPlayerName = 9,
		//查询世界等级 ;
		C2S_Common_QueryWorldLevel = 11,
		//保存个人空间背景 PBU32;
		C2S_Common_SetBackground = 12,
		//设置展示的英雄 PBG2CCommonShowPets;
		C2S_Common_SetShowPets = 13,
		//关注(world id, player id) PBU32U32;
		C2S_Common_Follow = 14,
		//取消关注(world id, player id) PBU32U32;
		C2S_Common_UnFollow = 15,
		//设置切磋需要验证(1需要0不需要) PBU32;
		C2S_Common_SetFEONeedConfirm = 16,
		//发出切磋的请求 PBC2GCommonFightRequest;
		C2S_Common_FightEachOtherRequest = 17,
		//切磋验证回复 PBC2GCommonFightReply;
		C2S_Common_FightEachOtherReply = 18,
		//使用邀请码 PBString;
		C2S_Common_UseInviteCode = 19,
		//领取邀请奖励(成就ID) PBU32;
		C2S_Common_InvitePrize = 20,
		//请求校验 PBC2GCommonSign;
		C2S_Common_Sign = 21,
		//请求全服物品记录(_emWorldItemLogType) PBU32;
		C2S_Common_WorldItemLog = 22,
		//领取问卷奖励 PBU32	;
		C2S_Common_SurveyPrize = 23,
		//开启系统奖励 PBU32;
		C2S_Common_SystemSwitchPrize = 24,
		//简单通用奖励 PBU32;
		C2S_Common_Prize = 25,
		//玩家举报日志  PBC2GCommonReportLog;
		C2S_Common_ReportLog = 26,
		//玩家引导日志	PBC2GCommonGuideLog;
		C2S_Common_GuideLog = 27,
		//玩家问卷调查日志	PBC2GCommonSurveyLog;
		C2S_Common_SurveyLog = 28,
	}
	/**
	*----通用功能模块
	*/
	enum _emS2C_Common_Protocol {
		//消耗同步		PBG2CExpendSyn;
		S2C_Common_ExpendSyn = 1,
		//时间事件		PBG2CCommon_TimeEvent;
		S2C_Common_TimeEvent = 3,
		//GM命令返回	PBG2CGMCmdTxtCmd;
		S2C_Common_GMCmd = 4,
		//增加等级 		PBG2CAddLevel;
		S2C_Common_AddLevel = 5,
		//通用道具奖励	PBG2CCommonShowPrize;
		S2C_Common_ShowPrize = 6,
		//查询玩家返回	PBG2CQueryPlayerViewAck;
		S2C_Common_PlayerViewAck = 7,
		//查询伙伴返回	PBPlayerPetView;
		S2C_Common_PetViewAck = 8,
		//重命名返回	PBPlayerRename;
		S2C_Common_PlayerRenameAck = 9,
		//更新战斗力	PBU32;
		S2C_Common_UpdateFightPower = 10,
		//同步跨服信息	PBCommonSynPlayerBigWorld;
		S2C_Common_SynPlayerBigWorld = 11,
		//系统开启(id, time)		PBU32U32;
		S2C_Common_SystemSwitch = 12,
		//查询玩家名称	PBPlayerFriendInfo;
		S2C_Common_FindPlayerNameAck = 14,
		//查询世界等级 PBU32;
		S2C_Common_QueryWorldLevel = 15,
		//玩家充值通知 PBU32;
		S2C_Common_AddRecharge = 16,
		//切磋错误通知 PBU32;
		S2C_Common_FightEachOther = 17,
		//保存个人空间背景返回 PBU32;
		S2C_Common_SetBackground = 18,
		//设置展示的英雄返回  PBG2CCommonShowPets;
		S2C_Common_SetShowPets = 19,
		//关注返回(world id, player id) PBU32U32;
		S2C_Common_Follow = 20,
		//取消关注返回(world id, player id) PBU32U32;
		S2C_Common_UnFollow = 21,
		//设置切磋需要验证返回 PBU32;
		S2C_Common_SetFEONeedConfirm = 22,
		//被请求切磋验证的推送 PBG2CCommonFightRequest;
		S2C_Common_FightEachOtherRequest = 23,
		//对方的切磋验证回复 PBG2CCommonFightReply;
		S2C_Common_FightEachOtherReply = 24,
		//使用邀请码(邀请人的 world id, player id) PBU32U32;
		S2C_Common_UseInviteCode = 25,
		//有接受自己邀请的玩家(world id, player id) PBU32U32;
		S2C_Common_InvitePlayer = 26,
		//同步邀请奖励 PBPlayerInvitePrize;
		S2C_Common_InvitePrize = 27,
		//请求校验返回 PBG2CCommonSign;
		S2C_Common_Sign = 28,
		//请求全服物品记录返回 PBWorldItemLogs;
		S2C_Common_WorldItemLog = 29,
		//领取问卷奖励;
		S2C_Common_SurveyPrize = 30,
		//开启系统奖励返回 PBU32;
		S2C_Common_SystemSwitchPrize = 31,
		//简单通用奖励 PBU32;
		S2C_Common_Prize = 32,
	}
	/**
	* 离线数据类型
	*/
	enum _emCommonOfflineDataType {
		//关注;
		CommonOffline_Follow = 0,
		//取消关注;
		CommonOffline_UnFollow = 1,
		//使用邀请码;
		CommonOffline_UseInviteCode = 2,
		//邀请了新的玩家;
		CommonOffline_InvitePlayer = 3,
		//邀请玩家达成奖励;
		CommonOffline_InvitePrize = 4,
	}
	/**
	* 查询伙伴评分
	*/
	class PBG2CAddLevel {
		constructor();
		/**等级*/
		public level:number;
		/**类型*/
		public doingtype:number;
		public static encode(message: Pb_God.PBG2CAddLevel, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CAddLevel, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CAddLevel;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CAddLevel;
	}
	/**
	* 查询伙伴评分
	*/
	class PBG2CQueryPetScore {
		constructor();
		/**自己的评分*/
		public selfscore:Pb_God.PBPetScoreInfo;
		/**最大的评分*/
		public maxscore:Pb_God.PBPetScoreInfo;
		public static encode(message: Pb_God.PBG2CQueryPetScore, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CQueryPetScore, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CQueryPetScore;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CQueryPetScore;
	}
	/**
	* 查询玩家
	*/
	class PBC2GCommonFindPlayerName {
		constructor();
		/** 角色名*/
		public name:string;
		public static encode(message: Pb_God.PBC2GCommonFindPlayerName, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GCommonFindPlayerName, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GCommonFindPlayerName;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GCommonFindPlayerName;
	}
	/**
	* 查询玩家
	*/
	class PBCommonSynPlayerBigWorld {
		constructor();
		/**服务器信息 服ID_等级*/
		public worldinfo:Pb_God.PBU32U32[];
		public static encode(message: Pb_God.PBCommonSynPlayerBigWorld, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCommonSynPlayerBigWorld, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCommonSynPlayerBigWorld;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCommonSynPlayerBigWorld;
	}
	/**
	* 查询玩家
	*/
	class PBPlayerRename {
		constructor();
		/** 角色名*/
		public name:string;
		/** 性别*/
		public gender:number;
		public static encode(message: Pb_God.PBPlayerRename, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBPlayerRename, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBPlayerRename;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBPlayerRename;
	}
	/**
	* 查询玩家
	*/
	class PBG2CExpendSyn {
		constructor();
		/** 玩家ID*/
		public expendtype:number;
		/** 改变值*/
		public change:Long;
		/** 最终值*/
		public value:Long;
		/** 操作类型_emDoingType*/
		public doingtype:number;
		public static encode(message: Pb_God.PBG2CExpendSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CExpendSyn, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CExpendSyn;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CExpendSyn;
	}
	/**
	* 查询玩家
	*/
	class PBC2GQueryPlayerView {
		constructor();
		/** 玩家ID*/
		public playerid:number;
		/** 逻辑世界ID*/
		public logicworldid:number;
		/** 源玩家ID*/
		public srplayerid:number;
		/** 源世界ID*/
		public srlogicworldid:number;
		/** 查询类型 _emQueryPlayerViewType*/
		public viewtype:number;
		public static encode(message: Pb_God.PBC2GQueryPlayerView, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GQueryPlayerView, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GQueryPlayerView;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GQueryPlayerView;
	}
	/**
	* 查询玩家伙伴
	*/
	class PBC2GQueryPetView {
		constructor();
		/** 玩家ID*/
		public playerid:number;
		/** 逻辑世界ID*/
		public logicworldid:number;
		/** 伙伴SN*/
		public petsn:Long;
		/** 源玩家ID*/
		public srplayerid:number;
		/** 源世界ID*/
		public srlogicworldid:number;
		public static encode(message: Pb_God.PBC2GQueryPetView, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GQueryPetView, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GQueryPetView;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GQueryPetView;
	}
	/**
	* GM命令
	*/
	class PBC2GGMCmdTxtCmd {
		constructor();
		/** 回调id*/
		public callbackid:Long;
		/** 参数*/
		public param:string;
		public static encode(message: Pb_God.PBC2GGMCmdTxtCmd, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GGMCmdTxtCmd, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GGMCmdTxtCmd;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GGMCmdTxtCmd;
	}
	/**
	* GM命令
	*/
	class PBG2CGMCmdTxtCmd {
		constructor();
		/** 回调id*/
		public callbackid:Long;
		/** 结果*/
		public result:boolean;
		/** 附带信息*/
		public msg:string;
		public static encode(message: Pb_God.PBG2CGMCmdTxtCmd, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CGMCmdTxtCmd, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CGMCmdTxtCmd;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CGMCmdTxtCmd;
	}
	/**
	* 每日事件
	*/
	class PBG2CCommon_TimeEvent {
		constructor();
		/**是否跨天*/
		public newday:boolean;
		/**是否跨周*/
		public newweek:boolean;
		/**是否跨月*/
		public newmonth:boolean;
		/**当前时间*/
		public time:number;
		public static encode(message: Pb_God.PBG2CCommon_TimeEvent, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CCommon_TimeEvent, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CCommon_TimeEvent;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CCommon_TimeEvent;
	}
	/**
	* 通用奖励展示
	*/
	class PBG2CCommonShowPrize {
		constructor();
		/**道具*/
		public item:Pb_God.PBItemInfo[];
		/**伙伴*/
		public pet:Pb_God.PBPetStar[];
		/**原因_emDoingType*/
		public doingtype:number;
		/**分解道具*/
		public splititem:Pb_God.PBItemInfo[];
		public static encode(message: Pb_God.PBG2CCommonShowPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CCommonShowPrize, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CCommonShowPrize;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CCommonShowPrize;
	}
	/**
	* 设置展示英雄
	*/
	class PBG2CCommonShowPets {
		constructor();
		/**sn*/
		public sn:Long[];
		public static encode(message: Pb_God.PBG2CCommonShowPets, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CCommonShowPets, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CCommonShowPets;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CCommonShowPets;
	}
	/**
	* 请求切磋
	*/
	class PBC2GCommonFightRequest {
		constructor();
		/**切磋目标world id*/
		public worldid:number;
		/**切磋目标player id*/
		public playerid:number;
		public static encode(message: Pb_God.PBC2GCommonFightRequest, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GCommonFightRequest, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GCommonFightRequest;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GCommonFightRequest;
	}
	/**
	* 请求切磋
	*/
	class PBG2CCommonFightRequest {
		constructor();
		/**请求切磋玩家world id*/
		public worldid:number;
		/**请求切磋玩家player id*/
		public playerid:number;
		/**请求切磋玩家名字*/
		public playername:string;
		public static encode(message: Pb_God.PBG2CCommonFightRequest, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CCommonFightRequest, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CCommonFightRequest;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CCommonFightRequest;
	}
	/**
	* 答复切磋
	*/
	class PBC2GCommonFightReply {
		constructor();
		/**对方的world id*/
		public worldid:number;
		/**对方的player id*/
		public playerid:number;
		/**答复*/
		public reply:boolean;
		public static encode(message: Pb_God.PBC2GCommonFightReply, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GCommonFightReply, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GCommonFightReply;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GCommonFightReply;
	}
	/**
	* 答复切磋
	*/
	class PBG2CCommonFightReply {
		constructor();
		/**对方的world id*/
		public worldid:number;
		/**对方的player id*/
		public playerid:number;
		/**答复*/
		public reply:boolean;
		/**对方是否需要验证(false的话可以不用弹出确认框直接请求战斗)*/
		public confirm:boolean;
		public static encode(message: Pb_God.PBG2CCommonFightReply, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CCommonFightReply, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CCommonFightReply;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CCommonFightReply;
	}
	/**
	* 新邀请玩家
	*/
	class PBCommonInvite {
		constructor();
		/** world id*/
		public worldid:number;
		/** player id*/
		public playerid:number;
		/** 邀请码的玩家world id*/
		public inviteworldid:number;
		/** 邀请码的玩家player id*/
		public inviteplayerid:number;
		/** 结果*/
		public result:number;
		public static encode(message: Pb_God.PBCommonInvite, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCommonInvite, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCommonInvite;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCommonInvite;
	}
	/**
	* 邀请玩家达成奖励
	*/
	class PBCommonInvitePrize {
		constructor();
		/**对方的world id*/
		public worldid:number;
		/**对方的player id*/
		public playerid:number;
		/**成就id*/
		public id:number;
		public static encode(message: Pb_God.PBCommonInvitePrize, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBCommonInvitePrize, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBCommonInvitePrize;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBCommonInvitePrize;
	}
	/**
	* 请求校验值
	*/
	class PBC2GCommonSign {
		constructor();
		/**类型 _emSignType*/
		public type:number;
		/**请求的参数 根据_emSignType里的注释*/
		public params:string[];
		public static encode(message: Pb_God.PBC2GCommonSign, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GCommonSign, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GCommonSign;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GCommonSign;
	}
	/**
	* 校验值返回
	*/
	class PBG2CCommonSign {
		constructor();
		/**类型*/
		public type:number;
		/**时间*/
		public time:number;
		/**校验字符串*/
		public sign:string;
		/**请求的参数原样返回*/
		public params:string[];
		public static encode(message: Pb_God.PBG2CCommonSign, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CCommonSign, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CCommonSign;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CCommonSign;
	}
	/**
	*客户端上传举报日志
	*/
	class PBC2GCommonReportLog {
		constructor();
		/**举报玩家ID*/
		public ReportPlayerID:number;
		/**举报玩家姓名*/
		public ReportPlayerName:string;
		/**举报玩家服务器ID*/
		public ReportPlayerServerID:number;
		/**举报理由*/
		public Reason:string;
		/**解释*/
		public Explain:string;
		/**举报证据*/
		public Proof:string;
		public static encode(message: Pb_God.PBC2GCommonReportLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GCommonReportLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GCommonReportLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GCommonReportLog;
	}
	/**
	*玩家引导日志
	*/
	class PBC2GCommonGuideLog {
		constructor();
		/**引导ID*/
		public GuideID:number;
		public static encode(message: Pb_God.PBC2GCommonGuideLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GCommonGuideLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GCommonGuideLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GCommonGuideLog;
	}
	/**
	*玩家问卷调查日志
	*/
	class PBC2GCommonSurveyLog {
		constructor();
		/**问题ID*/
		public QuestionID:number;
		/**问题*/
		public Question:string;
		/**答案*/
		public Answer:string;
		public static encode(message: Pb_God.PBC2GCommonSurveyLog, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GCommonSurveyLog, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GCommonSurveyLog;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GCommonSurveyLog;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 图鉴相关
	*/
	enum _emResultIllustration_46 {
		//  成功;
		R_ResultIllustration_Succeed = 0,
		//  失败;
		R_ResultIllustration_Fail = 1,
		//  没有伙伴（玩家精灵空间）;
		R_ResultIllustration_NotPet = 2,
		//  重复（玩家精灵空间）;
		R_ResultIllustration_PetRepeat = 3,
		//  没有皮肤（图鉴不需要显示）;
		R_ResultIllustration_NotPetSkin = 4,
		//  添加失败;
		R_ResultIllustration_ADDFail = 5,
		//  移除失败;
		R_ResultIllustration_RemoveFail = 6,
		//  等级不为1;
		R_ResultIllustration_LevelErr = 7,
	}
	/**
	*----客户端到服务器
	*/
	enum _emC2S_Illustration_Protocol {
		//往图鉴背包加 PBC2GADDPetAsk;
		C2S_Illustration_addPetAsk = 1,
		//从图鉴背包减	PBC2GRemovePetAsk;
		C2S_Illustration_removePetAsk = 2,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_Illustration_Protocol {
		//失败才返回;
		S2C_Illustration_Common_Ack = 0,
		//往图鉴背包加 PBG2CADDPetAck;
		S2C_Illustration_addPetAck = 1,
		//从图鉴背包减 PBG2CRemovePetAck;
		S2C_Illustration_removePetAck = 2,
		//	刷新 PBG2CFreashIllustration;
		S2C_Illustration_Freash = 3,
	}
	/**
	*往图鉴背包加
	*/
	class PBC2GADDPetAsk {
		constructor();
		/** 伙伴SN*/
		public petsn:Long;
		public static encode(message: Pb_God.PBC2GADDPetAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GADDPetAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GADDPetAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GADDPetAsk;
	}
	/**
	*从图鉴背包减
	*/
	class PBC2GRemovePetAsk {
		constructor();
		/** 伙伴皮肤id*/
		public petskinid:number;
		public static encode(message: Pb_God.PBC2GRemovePetAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GRemovePetAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GRemovePetAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GRemovePetAsk;
	}
	/**
	*往图鉴背包加,
	*/
	class PBG2CADDPetAck {
		constructor();
		/**  取消激活的羁绊索引数组*/
		public indexs:number[];
		public static encode(message: Pb_God.PBG2CADDPetAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CADDPetAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CADDPetAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CADDPetAck;
	}
	/**
	*从图鉴背包减，羁绊索引数据
	*/
	class PBG2CRemovePetAck {
		constructor();
		/** 取消激活的羁绊索引数组*/
		public indexs:number[];
		public static encode(message: Pb_God.PBG2CRemovePetAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CRemovePetAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CRemovePetAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CRemovePetAck;
	}
	/**
	*图鉴背包
	*/
	class PBG2CFreashIllustration {
		constructor();
		/** 精灵图鉴列  */
		public petdisplay:Pb_God.PBPetDisplay[];
		/** 历史最高战力*/
		public historyPower:number;
		public static encode(message: Pb_God.PBG2CFreashIllustration, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CFreashIllustration, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CFreashIllustration;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CFreashIllustration;
	}
}
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

declare namespace Pb_God {
	/**
	*------------------------------ 猜猜猜
	*/
	enum _emResultGuess_48 {
		//  成功;
		R_ResultGuess_Succeed = 0,
		//  失败;
		R_ResultGuess_Fail = 1,
		//  超时;
		R_ResultGuess_TimeOut = 2,
	}
	/**
	*----客户端到服务器
	*/
	enum _emC2S_Guess_Protocol {
		//答题开始，请求题目 ;
		C2S_Guess_Begin = 1,
		//发送选择给服务器 PBC2GAnswerAsk;
		C2S_Guess_Answer_Ask = 2,
		//发送退出给服务器 ;
		C2S_Guess_Exit_Ask = 3,
		//请求服务器下一题 ;
		C2S_Guess_Next = 4,
	}
	/**
	*----服务器到客户端
	*/
	enum _emS2C_Guess_Protocol {
		//失败才返回;
		S2C_Guess_Common_Ack = 0,
		//选择结果 PBG2CAnswerAck;
		S2C_Guess_Answer_Ack = 1,
		//问题下发 PBG2CQuestion;
		S2C_Guess_Question = 2,
		//答题结束 PBG2CExit;
		S2C_Guess_Exit = 3,
	}
	/**
	*发送题目给客户端
	*/
	class PBG2CQuestion {
		constructor();
		/** 问题序号*/
		public index:number;
		/** 答题时间*/
		public time:number;
		/** 答案 PBGuessAnswer*/
		public answers:Pb_God.PBGuessAnswer[];
		public static encode(message: Pb_God.PBG2CQuestion, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CQuestion, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CQuestion;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CQuestion;
	}
	/**
	*答案
	*/
	class PBGuessAnswer {
		constructor();
		/**答案序号*/
		public answerIndex:number;
		/**答案文本*/
		public answerText:string;
		public static encode(message: Pb_God.PBGuessAnswer, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBGuessAnswer, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBGuessAnswer;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBGuessAnswer;
	}
	/**
	*发送答案给服务器
	*/
	class PBC2GAnswerAsk {
		constructor();
		/**答案索引*/
		public answer:number;
		public static encode(message: Pb_God.PBC2GAnswerAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBC2GAnswerAsk, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBC2GAnswerAsk;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBC2GAnswerAsk;
	}
	/**
	*答题结果给客户端
	*/
	class PBG2CAnswerAck {
		constructor();
		/**0错误1正确*/
		public result:number;
		/**当前分数*/
		public score:number;
		/**剩余错误次数*/
		public worngCount:number;
		/** 正确答案 PBGuessAnswer*/
		public rightAnswers:Pb_God.PBGuessAnswer;
		public static encode(message: Pb_God.PBG2CAnswerAck, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CAnswerAck, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CAnswerAck;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CAnswerAck;
	}
	/**
	*答题结束
	*/
	class PBG2CExit {
		constructor();
		/**猜中次数*/
		public rightCount:number;
		public static encode(message: Pb_God.PBG2CExit, writer?: protobuf.Writer): protobuf.Writer;
		public static encodeDelimited(message: Pb_God.PBG2CExit, writer?: protobuf.Writer): protobuf.Writer;
		public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Pb_God.PBG2CExit;
		public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Pb_God.PBG2CExit;
	}
}