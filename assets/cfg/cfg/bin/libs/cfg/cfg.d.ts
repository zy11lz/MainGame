declare module cfg{
/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【guide.xls】 ----> guide   */
class GuideCfgInfo
{
		 /**  id */
		public id:number;
		 /**  步骤描述 */
		public desc:string;
		 /**  小助手对话 */
		public dialog:string;
		 /**  小助手对话时NPC头像 */
		public npcHead:string;
		 /**  小助手对话时NPC名字 */
		public npcName:string;
		 /**  小手指文字 */
		public fingerTips:string;
		 /**  中途暂停等待玩家自由操作 */
		public pauseGuide:number;
		 /**  挂机战斗结束唤醒引导 */
		public hookStage:number;
		 /**  关键步储存 */
		public stageSave:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_uiconfig.xls】 ----> uibg   */
class UiconfigUibgCfgInfo
{
		 /**  Index */
		public iD:number;
		 /**  UI事件名称 */
		public panelName:string;
		 /**  背景名称 */
		public bGUrl:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_uiconfig.xls】 ----> uiopen   */
class UiconfigUiopenCfgInfo
{
		 /**  Index */
		public iD:number;
		 /**  别名 */
		public panelNotify:string;
		 /**  子页签 */
		public page:string;
		 /**  功能开关id */
		public systemSwitchId:number;
		 /**  描述 */
		public desName:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_week_champion.xls】 ----> const_info   */
class WeekChampionConstInfoCfgInfo
{
		 /**  开启周期 */
		public circle:number;
		 /**  开启天数 */
		public circleDays:string;
		 /**  匹配时间 */
		public matchTime:string;
		 /**  开启时间 */
		public openTime:string;
		 /**  需要跨服天梯排名 */
		public needLadderRank:number;
		 /**  最少人数 */
		public minPlayerNum:number;
		 /**  需要玩家等级 */
		public needPlayerLevel:number;
		 /**  准备时间 */
		public readyTime:number;
		 /**  竞猜时间 */
		public guessTime:number;
		 /**  战斗时长 */
		public fightTime:number;
		 /**  战斗回合上限 */
		public fightBoutLimit:number;
		 /**  初始赔率 */
		public initOdds:number;
		 /**  初始赔率参数 */
		public initOddsParam:number;
		 /**  最大赔率 */
		public maxOdds:number;
		 /**  最小赔率 */
		public minOdds:number;
		 /**  初始竞猜币 */
		public initGuessCoin:number;
		 /**  弹幕需要道具 */
		public danmuNeedItem:string;
		 /**  奖励预览 */
		public prizePreview:string;
		 /**  弹幕最大条数 */
		public maxDanmuCount:number;
		 /**  每日点赞上限 */
		public dayLikeMax:number;
		 /**  点赞奖励 */
		public likeAward:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_week_champion.xls】 ----> top_prize   */
class WeekChampionTopPrizeCfgInfo
{
		 /**  排名（上一排名,此名次] */
		public rank:number;
		 /**  奖励道具 */
		public addItem:string;
		 /**  增加称号ID */
		public addTitle:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_week_champion.xls】 ----> ladder_rank_integral   */
class WeekChampionLadderRankIntegralCfgInfo
{
		 /**  天梯排名 */
		public ladderRank:number;
		 /**  初始积分 */
		public integral:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_week_champion.xls】 ----> round   */
class WeekChampionRoundCfgInfo
{
		 /**  回合 */
		public roundID:number;
		 /**  名称 */
		public name:string;
		 /**  增加战斗积分 */
		public addFightScore:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_toplist.xls】 ----> toplist   */
class ToplistCfgInfo
{
		 /**  排行类型 */
		public type:number;
		 /**  名字 */
		public name:string;
		 /**  显示排行数 */
		public showLine:number;
		 /**  重置次数 */
		public resetCount:number;
		 /**  是否为排名比例发放奖励 */
		public rankRatioReward:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_toplist.xls】 ----> reward   */
class ToplistRewardCfgInfo
{
		 /**  奖励id */
		public iD:number;
		 /**  排行类型 */
		public type:number;
		 /**  排名 */
		public rank:number;
		 /**  奖励 */
		public reward:string;
		 /**  限制 */
		public limit:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_toplist.xls】 ----> hero_score   */
class ToplistHeroScoreCfgInfo
{
		 /**  星 */
		public star:number;
		 /**  类型 */
		public type:number;
		 /**  积分 */
		public score:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_toplist.xls】 ----> piece_score   */
class ToplistPieceScoreCfgInfo
{
		 /**  星 */
		public star:number;
		 /**  类型 */
		public type:number;
		 /**  积分 */
		public score:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_toplist.xls】 ----> charge_score   */
class ToplistChargeScoreCfgInfo
{
		 /**  单笔金额 */
		public charge:number;
		 /**  积分 */
		public score:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_toplist.xls】 ----> upstar_score   */
class ToplistUpstarScoreCfgInfo
{
		 /**  星 */
		public star:number;
		 /**  类型 */
		public type:number;
		 /**  积分 */
		public score:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_player.xls】 ----> Level   */
class PlayerLevelCfgInfo
{
		 /**  等级 */
		public level:number;
		 /**  升级到下一级经验 */
		public needExp:number;
		 /**  升级奖励（升到当前级的奖励） */
		public addPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_temple.xls】 ----> temple   */
class TempleCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  类型1; //万殿之巅2; //泰坦神耀3; //瀚海星灵 */
		public type:number;
		 /**  需要竞技场名次 */
		public needChallengeRank:number;
		 /**  称号ID */
		public addTitle:number;
		 /**  怪物数据 */
		public monster:number;
		 /**  附加属性 */
		public attri:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_temple.xls】 ----> evolve   */
class TempleEvolveCfgInfo
{
		 /**  类型1; //万殿之巅2; //泰坦神耀3; //瀚海星灵 */
		public type:number;
		 /**  进化次数 */
		public count:number;
		 /**  技能id_等级; */
		public skillID:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_temple.xls】 ----> id_count   */
class TempleIdCountCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  进化次数 */
		public count:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_temple.xls】 ----> s_monster_index   */
class TempleSMonsterIndexCfgInfo
{
		 /**  类型1; //万殿之巅2; //泰坦神耀3; //瀚海星灵 */
		public type:number;
		 /**  进化次数 */
		public count:number;
		 /**  怪物索引 */
		public monsteIndex:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_temple.xls】 ----> monster_new   */
class TempleMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		public monsterInfo:string;
		 /**  额外技能(技能ID|技能Lv_技能ID|技能Lv;)分号留空表示这个怪物没有附加技能 */
		public extraSkill:string;
		 /**  Boss序号（好像没用到，之后确认是否删除） */
		public bossIndex:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_temple.xls】 ----> Level_Info   */
class TempleLevelInfoCfgInfo
{
		 /**  等级 */
		public level:number;
		 /**  伙伴阶数 */
		public petAdvance:number;
		 /**  伙伴星级 */
		public petStar:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_common.xls】 ----> chat   */
class CommonChatCfgInfo
{
		 /**  Channel_emBroadcast_Channel */
		public channel:number;
		 /**  名称 */
		public name:string;
		 /**  需要玩家等级 */
		public needPlayerLevel:number;
		 /**  聊天间隔 */
		public stepSecond:number;
		 /**  缓存数量 */
		public saveCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_common.xls】 ----> invite_prize   */
class CommonInvitePrizeCfgInfo
{
		 /**  成就ID */
		public achieveID:number;
		 /**  奖励 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_common.xls】 ----> survey_constants   */
class CommonSurveyConstantsCfgInfo
{
		 /**  序号 */
		public index:number;
		 /**  推送开关 */
		public indPushSwitchex:number;
		 /**  推送顺序 */
		public indPuShorder:number;
		 /**  推送时间类型 */
		public pushTimeTybe:number;
		 /**  活动时间（开服前n天） */
		public openDays:number;
		 /**  推送时间 */
		public pushtime:string;
		 /**  推送渠道 */
		public pushChannel:string;
		 /**  答题获得的奖励 */
		public prize:string;
		 /**  幸运奖励预览 */
		public luckyPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_common.xls】 ----> support   */
class CommonSupportCfgInfo
{
		 /**  支援类型 */
		public type:number;
		 /**  可派遣个数 */
		public sendCount:number;
		 /**  可雇佣个数 */
		public hireCount:number;
		 /**  单场战斗最大上场个数 */
		public fightCount:number;
		 /**  最大战力区间 */
		public maxPower:number;
		 /**  是否可重复上场 */
		public canUseAgain:number;
		 /**  是否可解雇 */
		public canFire:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> skill   */
class FactionSkillCfgInfo
{
		 /**  索引 */
		public iD:number;
		 /**  职业类型 */
		public jobType:number;
		 /**  技能位置 */
		public type:number;
		 /**  每级增加属性属性类型|属性值|属性万分比 */
		public addAttr:string;
		 /**  描述 */
		public desc:string;
		 /**  评分 */
		public addScore:number;
		 /**  技能类型 */
		public skillType:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> upgrade   */
class FactionUpgradeCfgInfo
{
		 /**  帮会等级 */
		public level:number;
		 /**  最大帮派人数 */
		public memberCount:number;
		 /**  此级最大经验值 */
		public exp:number;
		 /**  副帮主个数 */
		public deputyCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> donate_prize   */
class FactionDonatePrizeCfgInfo
{
		 /**  奖励ID */
		public iD:number;
		 /**  需要总捐献值 */
		public needDonate:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> donate   */
class FactionDonateCfgInfo
{
		 /**  捐献类型 */
		public donateType:number;
		 /**  捐献名称 */
		public name:string;
		 /**  需要道具 */
		public needItem:string;
		 /**  增加帮会经验 */
		public addExp:number;
		 /**  增加帮会贡献 */
		public addContri:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> liveness   */
class FactionLivenessCfgInfo
{
		 /**  等级 */
		public level:number;
		 /**  该等级最大经验值 */
		public exp:number;
		 /**  升到此级奖励 */
		public addItem:string;
		 /**  此级属性 */
		public addAttr:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> skill_upgrade   */
class FactionSkillUpgradeCfgInfo
{
		 /**  等级 */
		public level:number;
		 /**  需要所有技能等级 */
		public needAllSkillLevel:number;
		 /**  需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> skill_reset   */
class FactionSkillResetCfgInfo
{
		 /**  等级（0表示第一次）(上等级，此等级] */
		public level:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  返还比率道具ID_万分比 */
		public returnItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> copymap   */
class FactionCopymapCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  章节名称 */
		public name:string;
		 /**  怪物数据 */
		public monster:number;
		 /**  伤害奖励 */
		public damagePrize:string;
		 /**  击败奖励 */
		public killPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> copymap_buycount   */
class FactionCopymapBuycountCfgInfo
{
		 /**  次数 */
		public count:number;
		 /**  需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> copymap_topprize   */
class FactionCopymapTopprizeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  ID */
		public iD:number;
		 /**  排名(上一名次，此名次] */
		public rank:number;
		 /**  奖励道具 */
		public addItem:string;
		 /**  奖励道具 */
		public baseItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> monster_new   */
class FactionMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		public monsterInfo:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> impeach_time   */
class FactionImpeachTimeCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  需要离线时间 */
		public impeachTime:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> pvp_skill   */
class FactionPvpSkillCfgInfo
{
		 /**  索引 */
		public iD:number;
		 /**  职业类型 */
		public jobType:number;
		 /**  技能位置 */
		public skillPos:number;
		 /**  技能类型 */
		public skillType:number;
		 /**  每级增加属性属性类型|属性值|属性万分比 */
		public addAttr:string;
		 /**  描述 */
		public desc:string;
		 /**  评分 */
		public addScore:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> pvp_skill_index   */
class FactionPvpSkillIndexCfgInfo
{
		 /**  职业类型 */
		public jobType:number;
		 /**  技能等级 */
		public skillLevel:number;
		 /**  技能索引 */
		public skillID:number;
		 /**  评分 */
		public addScore:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> pvp_skill_upgrade   */
class FactionPvpSkillUpgradeCfgInfo
{
		 /**  技能类型 */
		public skillType:number;
		 /**  等级 */
		public level:number;
		 /**  需要其他天赋技能最低等级 */
		public needAllSkillLevel:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  需要本天赋其他技能最低等级 */
		public needOtherSkillLevel:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction.xls】 ----> pvp_skill_reset   */
class FactionPvpSkillResetCfgInfo
{
		 /**  技能类型 */
		public skillType:number;
		 /**  等级（0表示第一次）(上等级，此等级] */
		public level:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  返还比率道具ID_万分比 */
		public returnItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【c_broad_cast.xls】 ----> cast_msg   */
class BroadCastCastMsgCfgInfo
{
		 /**  广播id */
		public iD:number;
		 /**  类型 */
		public noticeType:number;
		 /**  频道 */
		public channel:number;
		 /**  公告显示位置 */
		public noticeShowPos:number;
		 /**  滚动次数 */
		public showTimes:number;
		 /**  说明 */
		public desc:string;
		 /**  内容 */
		public content:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【c_broad_cast.xls】 ----> time_msg   */
class BroadCastTimeMsgCfgInfo
{
		 /**  说明 */
		public desc:string;
		 /**  索引ID */
		public iD:number;
		 /**  时间点 */
		public beginTime:string;
		 /**  显示聊天频道频道 */
		public chanel:number;
		 /**  公告类型 */
		public noticeType:number;
		 /**  内容(按照{0}{1}拼写) */
		public content:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_resonance.xls】 ----> grid   */
class ResonanceGridCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  格子索引 */
		public gridIdx:number;
		 /**  开启条件 */
		public condition:string;
		 /**  消耗道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_resonance.xls】 ----> star   */
class ResonanceStarCfgInfo
{
		 /**  星级 */
		public star:number;
		 /**  升到下一级需要消耗道具数量 */
		public needItemCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_resonance.xls】 ----> common   */
class ResonanceCommonCfgInfo
{
		 /**  共鸣冷却(单位秒) */
		public cooling:number;
		 /**  共鸣冷却重置消耗（每小时x钻石） */
		public coolingConsume:number;
		 /**  供奉最小星级 */
		public minStar:number;
		 /**  放置最低星级 */
		public upMinStar:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_family_build.xls】 ----> build   */
class FamilyBuildBuildCfgInfo
{
		 /**  Index */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  描述 */
		public desc:string;
		 /**  家具类型 */
		public buildType:number;
		 /**  图片名 */
		public img:string;
		 /**  所占行数 */
		public rowLength:number;
		 /**  所占列数 */
		public colLength:number;
		 /**  增加舒适度 */
		public addComfort:number;
		 /**  获取来源_1 */
		public source_1:number;
		 /**  获取来源_2 */
		public source_2:number;
		 /**  所属主题ID */
		public themeID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【effect.xls】 ----> effect   */
class EffectCfgInfo
{
		 /**  标识符 */
		public id:string;
		 /**  帧动画帧数 */
		public editorFrame:number;
		 /**  资源路径 */
		public resPath:string;
		 /**  特效缩放 */
		public scale:number;
		 /**  特效偏移 */
		public off:string;
		 /**  显示位置 */
		public showPos:number;
		 /**  父节点 */
		public follow:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_illustration.xls】 ----> trammel   */
class IllustrationTrammelCfgInfo
{
		 /**  羁绊id */
		public id:number;
		 /**  需要的皮肤id */
		public needSkins:string;
		 /**  激活后加的属性 */
		public addAttr:string;
		 /**  加成属性战力值 */
		public fightPower:number;
		 /**  精灵组合称号 */
		public combinationtitle:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_illustration.xls】 ----> achieve   */
class IllustrationAchieveCfgInfo
{
		 /**  成就id */
		public id:number;
		 /**  描述 */
		public desc:string;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  参数 */
		public param:number;
		 /**  完成后的奖励 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_illustration.xls】 ----> power   */
class IllustrationPowerCfgInfo
{
		 /**  成就id */
		public id:number;
		 /**  描述 */
		public desc:string;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  参数 */
		public param:number;
		 /**  完成后的奖励 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_convenant.xls】 ----> const   */
class ConvenantConstCfgInfo
{
		 /**  解锁需要道具 */
		public unlockNeedItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_convenant.xls】 ----> level   */
class ConvenantLevelCfgInfo
{
		 /**  等级 */
		public level:number;
		 /**  升到下级需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_convenant.xls】 ----> attr   */
class ConvenantAttrCfgInfo
{
		 /**  契约部位ID */
		public iD:number;
		 /**  等级 */
		public level:number;
		 /**  属性加成,多个用逗号隔开 */
		public attr:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_artifact.xls】 ----> artifact   */
class ArtifactCfgInfo
{
		 /**  id */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  技能ID */
		public skillID:number;
		 /**  技能描述 */
		public desc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_artifact.xls】 ----> active   */
class ArtifactActiveCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  ID */
		public iD:number;
		 /**  进度 */
		public stage:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  需要成就ID */
		public needAchieveID:number;
		 /**  奖励道具 */
		public addPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_artifact.xls】 ----> upgrade   */
class ArtifactUpgradeCfgInfo
{
		 /**  等级 */
		public level:number;
		 /**  此级最大经验 */
		public maxExp:number;
		 /**  最大刻印次数 */
		public maxStoneCount:number;
		 /**  每次需要刻印石数量 */
		public needStoneCount:string;
		 /**  需要道具 */
		public needItem:string;
		 /**  增加属性属性类型|值|万分比; */
		public addAttr:string;
		 /**  每点经验增加属性属性类型|属性值 */
		public expAddAttr:string;
		 /**  增加评分 */
		public addScore:number;
		 /**  技能等级 */
		public skillMaxLv:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_artifact.xls】 ----> skill_upgrade   */
class ArtifactSkillUpgradeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  技能ID */
		public skillID:number;
		 /**  技能等级 */
		public skillLevel:number;
		 /**  需要神器等级 */
		public needArtifactLevel:number;
		 /**  升到此级需要道具 */
		public needItem:string;
		 /**  重置返还道具 */
		public returnItem:string;
		 /**  增加属性(需要累加)属性类型|值|万分比; */
		public addAttr:string;
		 /**  增加评分 */
		public addScore:number;
		 /**  觉醒增加属性属性类型|值|万分比; */
		public addAwakeAttr:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_artifact.xls】 ----> ylactive   */
class ArtifactYlactiveCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  ID */
		public iD:number;
		 /**  进度 */
		public stage:number;
		 /**  需要成就ID */
		public needAchieveID:number;
		 /**  奖励道具 */
		public addPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_artifact.xls】 ----> ylstagereward   */
class ArtifactYlstagerewardCfgInfo
{
		 /**  进度 */
		public stage:number;
		 /**  奖励道具 */
		public addPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_artifact.xls】 ----> const   */
class ArtifactConstCfgInfo
{
		 /**  法阵解锁奖励 */
		public fazhenAddItem:string;
		 /**  法阵觉醒属性万分比加成(类型_万分比;) */
		public awakeAddAttr:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activityboss.xls】 ----> constant   */
class ActivitybossConstantCfgInfo
{
		 /**  每日挑战次数 */
		public challengeCount:number;
		 /**  血条单位 */
		public bloodUnit:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activityboss.xls】 ----> monster_new   */
class ActivitybossMonsterNewCfgInfo
{
		 /**  Index */
		public index:number;
		 /**  怪物名称 */
		public name:string;
		 /**  展示皮肤ID */
		public skinID:number;
		 /**  展示界面缩放比例 */
		public showScale:number;
		 /**  参与奖励 */
		public damagePrize:string;
		 /**  奖励预览 */
		public awards:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activityboss.xls】 ----> buy_count   */
class ActivitybossBuyCountCfgInfo
{
		 /**  次数 */
		public count:number;
		 /**  需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_room.xls】 ----> furniture   */
class RoomFurnitureCfgInfo
{
		 /**  家具类型id */
		public type:number;
		 /**  家具分类 */
		public classify:number;
		 /**  同时存在上限 */
		public limit:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_dragon_ball.xls】 ----> level   */
class DragonBallLevelCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  等级 */
		public level:number;
		 /**  升到下一级需要道具 */
		public needItem:string;
		 /**  属性加成 */
		public attr:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_dragon_ball.xls】 ----> unlock   */
class DragonBallUnlockCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  解锁需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> pet   */
class PetCfgInfo
{
		 /**  英雄ID */
		public petID:number;
		 /**  描述 */
		public desc:string;
		 /**  阵营 */
		public petType:number;
		 /**  职业 */
		public petJobType:number;
		 /**  基础Skin */
		public baseSkin:number;
		 /**  展示音效（1.wav;2.wav） */
		public voice:string;
		 /**  初始最大阶数 */
		public initMaxAdvance:number;
		 /**  起始星级 */
		public minStar:number;
		 /**  最高星级 */
		public maxStar:number;
		 /**  最高等级 */
		public maxLevel:number;
		 /**  基础属性 */
		public initAttr:string;
		 /**  初始成长 */
		public advanceRate0:string;
		 /**  1阶成长加成 */
		public advanceRate1:string;
		 /**  2阶成长加成 */
		public advanceRate2:string;
		 /**  3阶成长加成 */
		public advanceRate3:string;
		 /**  4阶成长加成 */
		public advanceRate4:string;
		 /**  5阶成长加成 */
		public advanceRate5:string;
		 /**  6阶成长加成 */
		public advanceRate6:string;
		 /**  升阶附加属性0-1阶 */
		public advanceFix1:string;
		 /**  升阶附加属性1-2阶 */
		public advanceFix2:string;
		 /**  升阶附加属性2-3阶 */
		public advanceFix3:string;
		 /**  升阶附加属性3-4阶 */
		public advanceFix4:string;
		 /**  升阶附加属性4-5阶 */
		public advanceFix5:string;
		 /**  升阶附加属性5-6阶 */
		public advanceFix6:string;
		 /**  6星成长加成 */
		public starRate6:string;
		 /**  7星成长加成 */
		public starRate7:string;
		 /**  8星成长加成 */
		public starRate8:string;
		 /**  9星成长加成 */
		public starRate9:string;
		 /**  10星成长加成 */
		public starRate10:string;
		 /**  11星成长加成 */
		public starRate11:string;
		 /**  12星成长加成 */
		public starRate12:string;
		 /**  13星成长加成 */
		public starRate13:string;
		 /**  14星成长加成 */
		public starRate14:string;
		 /**  15星成长加成 */
		public starRate15:string;
		 /**  升星附加属性4-5星 */
		public starFix5:string;
		 /**  升星附加属性5-6星 */
		public starFix6:string;
		 /**  升星附加属性6-7星 */
		public starFix7:string;
		 /**  升星附加属性7-8星 */
		public starFix8:string;
		 /**  升星附加属性8-9星 */
		public starFix9:string;
		 /**  升星附加属性9-10星 */
		public starFix10:string;
		 /**  升星附加属性10-11星 */
		public starFix11:string;
		 /**  升星附加属性11-12星 */
		public starFix12:string;
		 /**  升星附加属性12-13星 */
		public starFix13:string;
		 /**  升星附加属性13-14星 */
		public starFix14:string;
		 /**  升星附加属性14-15星 */
		public starFix15:string;
		 /**  种族值 */
		public racialvalue:string;
		 /**  图鉴属性 */
		public illustrationAttrAdd:string;
		 /**  加成属性战力值 */
		public fightPower:string;
		 /**  携带物 */
		public horcrux:number;
		 /**  是否不启用精灵 */
		public invalid:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> upgrade   */
class PetUpgradeCfgInfo
{
		 /**  等级 */
		public level:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  增加评分 */
		public addScore:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> advance   */
class PetAdvanceCfgInfo
{
		 /**  进阶等级 */
		public advance:number;
		 /**  此等级上限 */
		public maxPetLevel:number;
		 /**  升到此阶需要道具 */
		public needItem:string;
		 /**  技能等级 */
		public addSkill:string;
		 /**  增加评分 */
		public addScore:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> upsart_skill   */
class PetUpsartSkillCfgInfo
{
		 /**  星级 */
		public star:number;
		 /**  技能等级 */
		public addSkill:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> upStar   */
class PetUpStarCfgInfo
{
		 /**  唯一ID */
		public id:number;
		 /**  伙伴ID */
		public petID:number;
		 /**  星星数 */
		public star:number;
		 /**  升到此星需要道具 */
		public needItem:string;
		 /**  升到此阶需要伙伴伙伴ID_伙伴星级_个数; */
		public needStarCount:string;
		 /**  升到此星需要伙伴星级_个数; */
		public needStarPet:string;
		 /**  升到任意需要伙伴星级_个数; */
		public needAnyStarPet:string;
		 /**  此等级上限 */
		public maxLevel:number;
		 /**  最大阶数 */
		public maxAdvance:number;
		 /**  增加评分 */
		public addScore:number;
		 /**  是否不启用精灵 */
		public invalid:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> formation   */
class PetFormationCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  解锁等级 */
		public needLevel:number;
		 /**  位置 */
		public pos:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> formation_type   */
class PetFormationTypeCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  名称 */
		public name:string;
		 /**  解锁等级 */
		public needLevel:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> rune_pos   */
class PetRunePosCfgInfo
{
		 /**  位置 */
		public pos:number;
		 /**  解锁等级 */
		public needLevel:number;
		 /**  解锁星级 */
		public needStar:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> talent_pos   */
class PetTalentPosCfgInfo
{
		 /**  位置 */
		public pos:number;
		 /**  解锁星级 */
		public needStar:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> buy_bag   */
class PetBuyBagCfgInfo
{
		 /**  索引 */
		public id:number;
		 /**  当前购买的总格子数 */
		public totalBuySpace:number;
		 /**  需要钻石 */
		public needDiamond:number;
		 /**  增加格子数 */
		public addSpace:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> star_score   */
class PetStarScoreCfgInfo
{
		 /**  星级 */
		public petStar:number;
		 /**  总计评分 */
		public totalScore:number;
		 /**  等级评分 */
		public levelScore:number;
		 /**  装备评分 */
		public equipScore:number;
		 /**  星级评分 */
		public starScore:number;
		 /**  进阶评分 */
		public advanceScore:number;
		 /**  神器评分 */
		public artifactScore:number;
		 /**  公会技能评分 */
		public factionSkillScore:number;
		 /**  符文评分 */
		public runeScore:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> book   */
class PetBookCfgInfo
{
		 /**  伙伴索引 */
		public index:number;
		 /**  伙伴ID */
		public petID:number;
		 /**  图鉴 */
		public bookMark:number;
		 /**  图书馆 */
		public libraryMark:number;
		 /**  星级 */
		public star:number;
		 /**  显示等级 */
		public maxLevel:number;
		 /**  属性 */
		public attr:string;
		 /**  战力 */
		public power:number;
		 /**  评论开关 */
		public reviewSwitch:number;
		 /**  大神搭配开关 */
		public masterMatchSwitch:number;
		 /**  精灵档案开关 */
		public petStorySwitch:number;
		 /**  精灵故事 */
		public petStory:string;
		 /**  是否不启用精灵 */
		public invalid:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> replace   */
class PetReplaceCfgInfo
{
		 /**  星级 */
		public star:number;
		 /**  需要消耗道具 */
		public needItem:string;
		 /**  需要消耗5星英雄数量 */
		public needHero:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> degenerate_cost   */
class PetDegenerateCostCfgInfo
{
		 /**  星级 */
		public star:number;
		 /**  需要消耗道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> degenerate_substitude   */
class PetDegenerateSubstitudeCfgInfo
{
		 /**  星级 */
		public star:number;
		 /**  类型（0代表全系） */
		public type:number;
		 /**  替代品道具 */
		public item:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> reborn_cost   */
class PetRebornCostCfgInfo
{
		 /**  次数 */
		public count:number;
		 /**  需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> star_exp   */
class PetStarExpCfgInfo
{
		 /**  星星 */
		public star:number;
		 /**  吞噬极化值 */
		public exp:number;
		 /**  最大极化值 */
		public maxExp:number;
		 /**  属性加成(属性|值|百分比;) */
		public attr:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> highstar_reborn   */
class PetHighstarRebornCfgInfo
{
		 /**  唯一ID */
		public id:number;
		 /**  伙伴ID */
		public petID:number;
		 /**  星星数 */
		public star:number;
		 /**  高星重生需要道具 */
		public rebornItem:string;
		 /**  高星重生返还百变怪 */
		public rebornReturnItem:string;
		 /**  降星返还糖果 */
		public needItem:string;
		 /**  高星重生返还本体 */
		public rebornReturnItem1:string;
		 /**  高星重生返还百变怪 */
		public rebornReturnItem2:string;
		 /**  是否不启用精灵 */
		public invalid:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> evolve   */
class PetEvolveCfgInfo
{
		 /**  唯一ID */
		public id:number;
		 /**  伙伴ID */
		public petID:number;
		 /**  进化段数 */
		public evolve:number;
		 /**  升到此段需要道具 */
		public needItem:string;
		 /**  属性加成(属性|值|百分比;) */
		public attr:string;
		 /**  皮肤ID */
		public skinID:number;
		 /**  最大段数 */
		public maxEvolve:number;
		 /**  增加评分 */
		public addScore:number;
		 /**  是否不启用精灵 */
		public invalid:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet.xls】 ----> master_match   */
class PetMasterMatchCfgInfo
{
		 /**  排行榜人数 */
		public topListNum:number;
		 /**  天赋展示数量 */
		public talentShowNum:number;
		 /**  阵容推荐人数 */
		public petStory:number;
		 /**  热门评论上限 */
		public hotReviewMax:number;
		 /**  近期评论上限 */
		public recentReviewMax:number;
		 /**  点赞奖励 */
		public likePrize:string;
		 /**  精灵解锁奖励 */
		public petUnlockPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_lottery.xls】 ----> lottery_type   */
class LotteryTypeCfgInfo
{
		 /**  活动id */
		public index:number;
		 /**  类型 */
		public type:number;
		 /**  每日免费刷新次数 */
		public freeCount:number;
		 /**  保底次数 */
		public maxCount:number;
		 /**  保底奖励（奖池序号） */
		public lucky:number;
		 /**  跳转路径（对应uiconfig） */
		public getway:string;
		 /**  奖励池保底限制展示个数 */
		public limit:number;
		 /**  精灵故事 */
		public petId:number;
		 /**  展示精灵 */
		public petIds:string;
		 /**  UI背景图 */
		public uIbg:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_lottery.xls】 ----> lottery_cost   */
class LotteryCostCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  索引 */
		public index:number;
		 /**  次数 */
		public times:number;
		 /**  消耗数量1 */
		public needItem1:string;
		 /**  消耗道具2 */
		public needItem2:string;
		 /**  需要VIP */
		public vIP:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_lottery.xls】 ----> lottery_hunt   */
class LotteryHuntCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  索引 */
		public index:number;
		 /**  位置(从1开始) */
		public position:number;
		 /**  刷出概率 */
		public chance:number;
		 /**  摇中概率 */
		public rollChance:number;
		 /**  奖励道具 */
		public addItem:string;
		 /**  是否展示 */
		public show:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_lottery.xls】 ----> lottery_pool   */
class LotteryPoolCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  索引 */
		public index:number;
		 /**  保底道具 */
		public item:string;
		 /**  单物品最大保底次数 */
		public itemcount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【c_uiRoleSay.xls】 ----> uiRoleSay   */
class UiRoleSayCfgInfo
{
		 /**  ui面板类型1：背包2：祭献3:召唤4:先知圣殿5:精灵商店 */
		public uiType:number;
		 /**  间隔时间（毫秒） */
		public gapTime:number;
		 /**  显示时间（毫秒） */
		public showTime:number;
		 /**  说话随机列表 |  竖线分割 */
		public sayTxt:string;
		 /**  玩成事件触发文字 */
		public event_say:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_battle.xls】 ----> battle   */
class BattleCfgInfo
{
		 /**  属性ID */
		public attrType:number;
		 /**  属性说明 */
		public desc:string;
		 /**  加评分 */
		public addScore:number;
		 /**  万分比加评分 */
		public rateAddScore:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_battle.xls】 ----> type_restrain   */
class BattleTypeRestrainCfgInfo
{
		 /**  攻击方1;//水2;//火3;//风4;//太阳5;//月亮 */
		public attackType:number;
		 /**  防御方1;//水2;//火3;//风4;//太阳5;//月亮 */
		public defenseType:number;
		 /**  伤害加成万分比 */
		public damageRate:number;
		 /**  命中加成分比 */
		public hitRate:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_battle.xls】 ----> formation_attr   */
class BattleFormationAttrCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  伙伴类型 */
		public petType:number;
		 /**  类型个数 */
		public typeCount:number;
		 /**  属性加成属性类型|万分比; */
		public addAttr:string;
		 /**  阵型名称 */
		public typeName:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_battle.xls】 ----> battle_type   */
class BattleTypeCfgInfo
{
		 /**  类型 */
		public attrType:number;
		 /**  名称 */
		public name:string;
		 /**  战斗背景 */
		public battleScene:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【resPreload.xls】 ----> resPreload   */
class ResPreloadCfgInfo
{
		 /**  key */
		public index:number;
		 /**  预加载触发时机类型 */
		public triggerType:number;
		 /**  触发时机对应的进度值 */
		public triggerStep:number;
		 /**  预加载资源类型 */
		public resType:number;
		 /**  资源参数 */
		public resParams:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_tablet.xls】 ----> constants   */
class TabletConstantsCfgInfo
{
		 /**  阵位数量 */
		public posCount:number;
		 /**  开启赋能创造星数 */
		public createNeedStar:string;
		 /**  赋能创造次数 */
		public createCount:number;
		 /**  魔液物品ID */
		public magicJuiceID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_tablet.xls】 ----> magic_juice   */
class TabletMagicJuiceCfgInfo
{
		 /**  提炼等级 */
		public level:number;
		 /**  转换效率（多少经验1个） */
		public needExp:string;
		 /**  提炼效率（多少秒1个） */
		public needTime:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_tablet.xls】 ----> tablet   */
class TabletCfgInfo
{
		 /**  晶碑等级 */
		public level:number;
		 /**  生命 */
		public hP:number;
		 /**  攻击 */
		public aTK:number;
		 /**  防御 */
		public dEF:number;
		 /**  升级消耗 */
		public lvUpNeedItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_tablet.xls】 ----> star_addition   */
class TabletStarAdditionCfgInfo
{
		 /**  星数 */
		public star:number;
		 /**  加成万分比 */
		public addition:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_tablet.xls】 ----> creation   */
class TabletCreationCfgInfo
{
		 /**  平均星数 */
		public star:number;
		 /**  创造消耗 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_constant.xls】 ----> Constant   */
class ConstantCfgInfo
{
		 /**  唯一索引 */
		public index:number;
		 /**  系统类型 */
		public typeIndex:number;
		 /**  枚举类型 */
		public enumIndex:number;
		 /**  枚举值 */
		public constantValue:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_constant.xls】 ----> ClientConstant   */
class ConstantClientConstantCfgInfo
{
		 /**  枚举值 */
		public enumIndex:number;
		 /**  默认值 */
		public constantValue:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_constant.xls】 ----> GamesPrizePreview   */
class ConstantGamesPrizePreviewCfgInfo
{
		 /**  枚举值 */
		public id:number;
		 /**  道具id列表 */
		public value:string;
		 /**  功能开关Id */
		public systemSwitchId:number;
		 /**  描述 */
		public desc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_skill_new.xls】 ----> Skill   */
class SkillNewSkillCfgInfo
{
		 /**  索引 */
		public skillIndex:number;
		 /**  技能标号 */
		public skillID:number;
		 /**  技能等级 */
		public skillLevel:number;
		 /**  技能名 */
		public name:string;
		 /**  技能描述 */
		public des:string;
		 /**  客户端技能特效类型Administrator:1://普通效果2：//弹道技能打多个目标（子弹分裂）3：//纵向弹道 */
		public clientEffectType:number;
		 /**  技能类型1;//被动技能2;//普攻3;//主动技能 */
		public skillType:number;
		 /**  攻击类型0 无类型1 物理攻击2 法术攻击 */
		public attackType:number;
		 /**  技能顺序(分号)1;//伤害2;//治疗3;//给目标加buff4;//给自己加buff5;//驱散   参数:概率_效果类型_个数(0表示所有)6;//反击   参数:概率_取自身属性类型_属性万分比7;//给自己治疗8;//回复上一次伤害生命 参数:万分比9;//删除状态buff 参数:状态ID10;//真实伤害11;//使用上一次伤害12;//优先技能，必定最先释放，无视控制技能，百分比真实伤害 参数：万分比_伤害最大不超过攻击方攻击力的万分比13;//回复上一次伤害生命 参数:万分比14;//反伤  参数：概率_取自身属性类型_属性万分比 15;//反伤  参数：概率_万分比  16;//根据阵营数量加buff 参数 阵营类型1_数量1_bufferid1....(这些是或关系，取一个数量最大的)17;//复制buff 参数 buffer类型_数量_最大层数_是否敌人（0友方1敌方）_数量（0表示全部）_属性类型_排序（0最小，1最大） */
		public skillOrder:string;
		 /**  顺序参数1;//伤害2;//治疗3;//给目标加buff4;//给自己加buff5;//驱散   参数:概率_效果类型_个数(0表示所有)6;//反击   参数:概率_取自身属性类型_属性万分比7;//给自己治疗8;//回复上一次伤害生命 参数:万分比9;//删除状态buff 参数:状态ID10;//真实伤害11;//使用上一次伤害12;//优先技能，必定最先释放，无视控制技能，百分比真实伤害 参数：万分比_伤害最大不超过攻击方攻击力的万分比13;//回复上一次伤害生命 参数:万分比14;//反伤  参数：概率_取自身属性类型_属性万分比 15;//反伤  参数：概率_万分比  16;//根据阵营数量加buff 参数 阵营类型1_数量1_bufferid1....(这些是或关系，取一个数量最大的)17;//复制buff 参数 buffer类型_数量_最大层数_是否敌人（0友方1敌方）_数量（0表示全部）_属性类型_排序（0最小，1最大） */
		public orderParam:string;
		 /**  触发类型_emSkillTriggerType类型_概率1;//被攻击触发 2;//额外伤害 3;//使用技能触发(继承技能目标) 参数 技能ID1(0表示所有技能)_技能ID1...4;//回合数触发 参数:回合1_回合2;(2_0表示第二回合后每回合)5;//攻击触发6;//自己buff状态加强 参数:buff类型_万分比7;//每回合开始血量加buff 参数:血量百分比_不低于加buff_低于加buff;8;//使用技能触发(忽略技能目标) 参数:技能ID(0表示所有技能)9;//随机或技能 技能1_技能210;//死亡触发复活11;//队伍暴击 参数:万分比12;//生命触发 生命百分比13;//队伍状态额外伤害 参数:取属性类型_属性万分比_状态1_状态214;//随机与技能 概率1_技能1_概率2_技能215;//击杀目标触发使用上一个技能 参数:攻击力万分比16;//目标属性对比加自身属性 参数:属性类型_低于加属性类型_低于加属性类型万分比__高于加属性类型_高于加属性类型万分比17;//击杀目标触发 参数:技能ID18;//普通攻击触发19;//队伍死亡触发 参数:状态（0无状态）20;//被技能击杀目标,攻击力减少 参数:技能ID_攻击力万分比21;//携带状态敌方死亡 参数:状态ID22;//技能组合(走子技能CD) 参数:技能ID1_技能ID223;//物理攻击触发 24;//法术攻击触发 25;//物理攻击触发连击 参数：伤害降低_控制降低26;//法术攻击触发连击 参数：伤害降低_控制降低27;//物理攻击击杀之后追加普攻28;//物理攻击暴击之后追加普攻29;//复活触发30;//伤害超过目标生命值多少触发 参数：伤害万分比31;//自己使用治疗触发32;//使用额外技能斩击触发 参数:技能ID33;//自己暴击触发 */
		public triggerType:string;
		 /**  触发参数 */
		public triggerParam:string;
		 /**  回合开始回合_冷却回合 */
		public coolRound:string;
		 /**  目标类型 0;//敌方 1;//友方 2;//自己 */
		public targetType:number;
		 /**  范围类型类型_最大目标个数1; //对位单体2; //全体3; //前排4; //中排5; //后排6; //前中排7; //前后排8; //中后排9; //随机横排10; //上列11; //中列12; //下列 13; //随机列 14; //对位列15; //最大血量16; //最小血量17; //攻击最高18; //攻击最低19; //速度最高20; //速度最低21; //防御最高22; //防御最低23; //随机24; //人数最多的一列 */
		public rangeType:string;
		 /**  优先目标条件_emSkillTarCondition1;//职业 参数 职业类型_emPetJobType2;//状态 参数: 状态1_状态2 */
		public targetCondition:string;
		 /**  掩码_emSkillMaskType1;//是否忽略自己2;//是否继承伤害次数3;//是否选择死亡角色4;//是否不给自己加buff5;//是否继承目标6;//是否延时释放7;//是否无尽试炼连续释放8;//是否延时技能只能放一次9;//是否使用上一次伤害10;//是否使用上一次暴击伤害11;//增加buff下一回合生效12;//优先技能，必定最先释放，无视控制技能 */
		public mask:string;
		 /**  治疗取伤害记录_属性类型_万分比_额外值_是否死亡(1死亡)_溢出加buff_是否取目标1;//上一次技能伤害2;//上一次队伍暴击伤害 */
		public cure:string;
		 /**  伤害公式是否取自己_属性类型_百分比_段数_无视防御万分比 */
		public damage:string;
		 /**  1;//职业 职业类型_万分比2;//状态 万分比_状态1_状态2(BuffControlType)3;//正负面效果 效果(_emBuffEffectType)_万分比4;//概率提升 概率万分比_万分比5;//属性低于自身  属性类型_万分比6;//生命值高于   生命万分比_万分比7;//生命值低于   生命万分比_万分比8;//目标属性伤害  属性类型_万分比_限制属性类型_限制万分比9;//普攻触发    万分比10;//目标效果个数   效果(_emBuffEffectType)_万分比11;//损失血量万分比伤害  万分比12;//职业伤害值  职业类型_取目标属性类型_万分比_限制自身属性类型_限制万分比 */
		public extraDamage:string;
		 /**  额外属性加成_emSkillAttrCondition1;//状态或加属性    属性类型_属性值_万分比_状态1(BuffControlType)_状态2 2;//血量高于百分比    百分比_属性类型_属性值_万分比3;//临时加属性     属性类型_属性值_万分比4;//血量低于百分比    百分比_属性类型_属性值_万分比5;//职业加临时数据    职业_属性类型_属性值_万分比6;//最先出手      属性类型1_属性值1_万分比1_属性类型2_属性值2_万分比27;//血量降低x%,属性提高y%  属性类型_血量降低万分比_提高值8;//对方有技能xxx属性提高  属性类型_属性提高值_技能ID_技能ID_ ...9;//对方有技能xxx属性降低  属性类型_属性降低值_技能ID_技能ID_ ...10;//无视防御 无视防御万分比 */
		public extraAddAttr:string;
		 /**  公共条件__emSkillCommonCondition1;//状态增加治疗 万分比_状态ID 2;//血量低于加治疗效果 万分比_加治疗效果万分比3;//驱散增加生命上限伤害 驱散个数_生命上限万分比4;//技能段斩杀  段ID_生命万分比_不超过自身属性_不超过自身属性万分比5;//额外技能目标个数  概率_个数6;//使用上一次总伤害加护盾  万分比7;//使用HP加护盾  HP的万分比8;//状态层数加次数 参数:stateid_buff层数_最大次数9;//限制伤害 最大值_最小值10;//使用上一次治疗量加护盾  万分比11;//伤害均摊 */
		public commonCondition:string;
		 /**  给目标加buff条件_emSkillBuffCondition1;//职业 参数 职业类型_emPetJobType_buff额外万分比2;//状态 参数: 状态1_状态23;//死亡4;//暴击5;//属性低于自身  属性类型_buff概率万分比6;//状态提升概率  状态1_buff概率万分比7;//buff随机个数  个数8;//生命值低于万分比 万分比9;//选择职业 参数 职业类型1_职业类型2....10;//buff权重随机个数  个数 */
		public addTarBuffCondition:string;
		 /**  增加目标buffbuffid_概率; */
		public addTarBuff:string;
		 /**  给自己加buffbuffid_概率; */
		public addSelfBuff:string;
		 /**  给自身加属性属性类型_值_万分比 */
		public addSelfAttr:string;
		 /**  携带物技能 */
		public horcruxSkill:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_skill_new.xls】 ----> Race_Damaga   */
class SkillNewRaceDamagaCfgInfo
{
		 /**  攻击方1;//神仙2;//人族3;//魔族 */
		public attackRace:number;
		 /**  防御方1;//神仙2;//人族3;//魔族 */
		public defenseRace:number;
		 /**  伤害万分比 */
		public damageRate:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_skill_new.xls】 ----> talent_upgrade   */
class SkillNewTalentUpgradeCfgInfo
{
		 /**  唯一索引 */
		public skillIndex:number;
		 /**  技能ID */
		public skillID:number;
		 /**  等级 */
		public level:number;
		 /**  名称 */
		public name:string;
		 /**  需要道具道具ID_道具数量 */
		public needItem:string;
		 /**  遗忘消耗道具ID_道具数量 */
		public delNeedItem:string;
		 /**  遗忘返还道具道具ID_道具数量 */
		public delAddItem:string;
		 /**  增加评分 */
		public addScore:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_skill_new.xls】 ----> Recommend_Talent   */
class SkillNewRecommendTalentCfgInfo
{
		 /**  职业 */
		public jobType:number;
		 /**  技能ID */
		public skillID:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_skill_new.xls】 ----> SpecialSkillDelay   */
class SkillNewSpecialSkillDelayCfgInfo
{
		 /**  id */
		public id:number;
		 /**  延迟毫秒 */
		public delay:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_train.xls】 ----> tower_prize   */
class TrainTowerPrizeCfgInfo
{
		 /**  关卡ID */
		public stageID:number;
		 /**  类型 */
		public type:number;
		 /**  关卡奖励道具ID_数量; */
		public stagePrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_train.xls】 ----> tower   */
class TrainTowerCfgInfo
{
		 /**  关卡 */
		public stageID:number;
		 /**  层数显示 */
		public stageShow:number;
		 /**  类型 */
		public type:number;
		 /**  推荐战力 */
		public requreFightPower:number;
		 /**  Boss序号 */
		public bossIndex:number;
		 /**  怪物数据 */
		public monster:number;
		 /**  首通奖励 */
		public firstAddPrize:string;
		 /**  挑战奖励 */
		public addPrize:string;
		 /**  文字描述 */
		public desc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_train.xls】 ----> tower_count   */
class TrainTowerCountCfgInfo
{
		 /**  次数 */
		public buyCount:number;
		 /**  需要钻石 */
		public needDiamond:number;
		 /**  需要VIP特权 */
		public needVIP:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_train.xls】 ----> endless   */
class TrainEndlessCfgInfo
{
		 /**  关卡 */
		public stageID:number;
		 /**  怪物数据 */
		public monster:number;
		 /**  重置的关卡 */
		public resetStageID:number;
		 /**  领取关卡数 */
		public prizeStageCount:number;
		 /**  奖励 */
		public addPrize:string;
		 /**  固定奖励 */
		public fixPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_train.xls】 ----> endless_prize   */
class TrainEndlessPrizeCfgInfo
{
		 /**  关卡ID */
		public stageID:number;
		 /**  关卡奖励道具ID_数量; */
		public stagePrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_train.xls】 ----> endlest_buff   */
class TrainEndlestBuffCfgInfo
{
		 /**  Buff组 */
		public groupID:number;
		 /**  概率 */
		public rate:number;
		 /**  BuffID */
		public buffID:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_train.xls】 ----> constants   */
class TrainConstantsCfgInfo
{
		 /**  主界面玩法奖励 */
		public mainPagePrize:string;
		 /**  首通奖励 */
		public firstPrize:string;
		 /**  日常挑战奖励 */
		public daylyPrize:string;
		 /**  排行榜奖励 */
		public rankPrize:string;
		 /**  Buff技能index(分号隔开) */
		public buff:string;
		 /**  购买buff数量 */
		public buffCount:number;
		 /**  购买buff消耗 */
		public buffNeedItem:string;
		 /**  buff加成伤害万分比 */
		public buffAddDamage:number;
		 /**  购买挑战次数消耗 */
		public countNeedItem:string;
		 /**  购买挑战次数 */
		public buyCount:number;
		 /**  免费挑战次数 */
		public freeCount:number;
		 /**  大师挑战入口奖励预览 */
		public peakPrizeReview:string;
		 /**  对战塔商店开启关卡 */
		public towerShopOpen:number;
		 /**  大师对战塔商店开启关卡 */
		public masterTowerShopOpen:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_train.xls】 ----> peak   */
class TrainPeakCfgInfo
{
		 /**  天 */
		public day:number;
		 /**  怪物数据 */
		public monster:number;
		 /**  奖励 */
		public prize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_train.xls】 ----> monster_new   */
class TrainMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;
		 /**  Boss序号 */
		public bossIndex:number;
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		public monsterInfo:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【c_login_windows.xls】 ----> login_windows   */
class LoginWindowsLoginWindowsCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  跳转链接 */
		public jumpLink:string;
		 /**  背景图片 */
		public backgroundPic:string;
		 /**  按钮图片 */
		public buttonPic:string;
		 /**  推送顺序 */
		public pushOrder:number;
		 /**  推送渠道 */
		public pushChannel:string;
		 /**  推送等级 */
		public pushLevel:number;
		 /**  推送时间类型 */
		public pushTimeType:number;
		 /**  弹出类型 */
		public popupTybe:number;
		 /**  推送时间 */
		public pushTime:string;
		 /**  推送开关 */
		public pushSwitch:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【c_gm.xls】 ----> gm   */
class GmCfgInfo
{
		 /**  id */
		public id:number;
		 /**  命令功能 */
		public des:string;
		 /**  命令 */
		public code:string;
		 /**  参数1 */
		public value1:string;
		 /**  参数2 */
		public value2:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_joyous_linkup.xls】 ----> joyous_linkup   */
class JoyousLinkupJoyousLinkupCfgInfo
{
		 /**  棋盘类型 */
		public type:number;
		 /**  行数 */
		public hRow:number;
		 /**  列数 */
		public vRow:number;
		 /**  棋子种类 */
		public chessNum:number;
		 /**  难度系数 */
		public difficult:number;
		 /**  单步时间 */
		public stepTime:number;
		 /**  刷新次数 */
		public refreshNum:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_joyous_linkup.xls】 ----> stage   */
class JoyousLinkupStageCfgInfo
{
		 /**  关卡id */
		public stageID:number;
		 /**  棋盘类型 */
		public linkupType:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_joyous_linkup.xls】 ----> joyous_linkup_chess   */
class JoyousLinkupJoyousLinkupChessCfgInfo
{
		 /**  棋子类型 */
		public index:number;
		 /**  棋子图标 */
		public img:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_privilege.xls】 ----> vip   */
class PrivilegeVipCfgInfo
{
		 /**  vip等级 */
		public vipLevel:number;
		 /**  需要最低经验（充值元宝） */
		public needExp:number;
		 /**  是否广播（1广播） */
		public isBroadcast:number;
		 /**  礼包原价 */
		public oldPrice:number;
		 /**  礼包需要的道具 */
		public needItem:string;
		 /**  增加礼包 */
		public addPacket:string;
		 /**  至尊月卡每日礼包 */
		public monthPacket:string;
		 /**  增加特权 */
		public addPrivilege:string;
		 /**  内容 */
		public content:string;
		 /**  增加头像框 */
		public addHeadIcon:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_privilege.xls】 ----> privilege   */
class PrivilegeCfgInfo
{
		 /**  特权类型_emPrivilegeType */
		public privilegeType:number;
		 /**  名字 */
		public name:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_privilege.xls】 ----> shop   */
class PrivilegeShopCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  名称 */
		public name:string;
		 /**  描述 */
		public describe:string;
		 /**  需要道具 */
		public needItem:string;
		 /**  增加道具 */
		public addItem:string;
		 /**  对应特权cardid */
		public cardID:number;
		 /**  补偿奖励 */
		public compensation:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_privilege.xls】 ----> daily_prize   */
class PrivilegeDailyPrizeCfgInfo
{
		 /**  类型_emPrivilegeDailyPacket */
		public type:number;
		 /**  需要特权卡_emPrivilegeCard */
		public needCardID:number;
		 /**  增加道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_privilege.xls】 ----> card   */
class PrivilegeCardCfgInfo
{
		 /**  特权卡_emPrivilegeCard */
		public cardID:number;
		 /**  名称 */
		public name:string;
		 /**  需要充值 */
		public needMoney:number;
		 /**  有效天数 */
		public expireDays:number;
		 /**  特权ID特权1_值;特权2_值; */
		public addPrivilege:string;
		 /**  充值金额有效时间 */
		public rechargeExpireDays:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_privilege.xls】 ----> daily_first_charge   */
class PrivilegeDailyFirstChargeCfgInfo
{
		 /**  等级要求 */
		public needLevel:number;
		 /**  奖励物品 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_prize.xls】 ----> Prize   */
class PrizeCfgInfo
{
		 /**  奖励ID */
		public prizeID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_prize.xls】 ----> friend_prize   */
class PrizeFriendPrizeCfgInfo
{
		 /**  次数 */
		public count:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_prize.xls】 ----> common_prize   */
class PrizeCommonPrizeCfgInfo
{
		 /**  ID_emCommonPrizeType */
		public iD:number;
		 /**  道具奖励ID_数量;ID_数量; */
		public addItem:string;
		 /**  按钮文字 */
		public name:string;
		 /**  描述 */
		public desc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> common   */
class HeavenCommonCfgInfo
{
		 /**  配置id */
		public iD:number;
		 /**  最大挑战次数 */
		public maxCount:number;
		 /**  购买挑战次数 */
		public buyCount:number;
		 /**  购买挑战需要物品 */
		public buyNeedItem:string;
		 /**  祈祷免费次数 */
		public prayFreeCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> chapter   */
class HeavenChapterCfgInfo
{
		 /**  章节 */
		public chapter:number;
		 /**  开启条件, 空白没限制，星数0表示只通关就可以没有星星限制（章节_星数;章节_星数） */
		public condition:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> chapter_prize   */
class HeavenChapterPrizeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  章节 */
		public chapter:number;
		 /**  需要星数 */
		public star:number;
		 /**  奖励物品 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> stage   */
class HeavenStageCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  章节 */
		public chapter:number;
		 /**  关卡 */
		public stage:number;
		 /**  怪物数据 */
		public monster:number;
		 /**  怪物数据 */
		public monster2:number;
		 /**  星星条件 */
		public starCondition:string;
		 /**  奖励 */
		public addItem:string;
		 /**  首通奖励 */
		public firstAccomplishAddItem:string;
		 /**  推荐战力 */
		public requreFightPower:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> star_condition   */
class HeavenStarConditionCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  类型 */
		public type:number;
		 /**  参数 */
		public params:string;
		 /**  描述 */
		public desc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> pray_statue   */
class HeavenPrayStatueCfgInfo
{
		 /**  神像索引 */
		public index:number;
		 /**  神像名 */
		public name:string;
		 /**  默认奖池 */
		public pool:number;
		 /**  奖池奖励预览 */
		public poolReview:string;
		 /**  替换次数 */
		public alterTimes:number;
		 /**  替换奖池 */
		public alterPool:number;
		 /**  消耗特殊道具(信物) */
		public needSpecialItem:string;
		 /**  消耗物品（钻石） */
		public needItem:string;
		 /**  10次消耗物品（钻石） */
		public tenNeedItem:string;
		 /**  祈祷返还物品 */
		public addItem:string;
		 /**  需要开启章节 */
		public needChapter:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> pray_prize_pool   */
class HeavenPrayPrizePoolCfgInfo
{
		 /**  奖池类型 */
		public pool:number;
		 /**  奖励种类 */
		public type:number;
		 /**  概率 */
		public chance:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> pray_prize_items   */
class HeavenPrayPrizeItemsCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  奖励种类 */
		public type:number;
		 /**  概率 */
		public chance:number;
		 /**  奖励道具 */
		public addItem:string;
		 /**  是否播报 */
		public broadCast:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> pray_prize_type   */
class HeavenPrayPrizeTypeCfgInfo
{
		 /**  奖励种类 */
		public type:number;
		 /**  描述 */
		public desc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_heaven.xls】 ----> monster_new   */
class HeavenMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		public monsterInfo:string;
		 /**  附加属性值(属性|值|百分比_属性|值|百分比;)分号留空表示这个怪物没有附加属性 */
		public attribute:string;
		 /**  额外技能(技能ID|技能Lv_技能ID|技能Lv;)分号留空表示这个怪物没有附加技能 */
		public extraSkill:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_treasure.xls】 ----> treasure_hunt_type   */
class TreasureHuntTypeCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  免费刷新次数 */
		public freeCount:number;
		 /**  刷新需要道具 */
		public refreshNeedItem:string;
		 /**  探宝一次获得道具（幸运值） */
		public addItem:string;
		 /**  轮盘上物品的个数 */
		public displayNum:number;
		 /**  免费刷新重置时间(分钟) */
		public resetTime:number;
		 /**  需要玩家等级 */
		public needLevel:number;
		 /**  幸运值最大值 */
		public maxLuckyItem:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_treasure.xls】 ----> treasure_cost   */
class TreasureCostCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  类型 */
		public type:number;
		 /**  次数 */
		public times:number;
		 /**  消耗物品 */
		public needItem:string;
		 /**  需要VIP */
		public vIP:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_treasure.xls】 ----> treasure_pool   */
class TreasurePoolCfgInfo
{
		 /**  随机组 */
		public group:number;
		 /**  类型 */
		public type:number;
		 /**  玩家等级(大于等于 当前level，小于下一个level) */
		public level:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_treasure.xls】 ----> treasure_hunt   */
class TreasureHuntCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  随机组 */
		public group:number;
		 /**  摇中概率 */
		public rollChance:number;
		 /**  奖励道具 */
		public addItem:string;
		 /**  随机奖励道具(刷新出随机其中一种) */
		public addRandItem:string;
		 /**  位置(从1开始) */
		public position:number;
		 /**  个数限制(0不限制) */
		public limitNum:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_treasure.xls】 ----> lucky_reward   */
class TreasureLuckyRewardCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  类型 */
		public type:number;
		 /**  需要道具（幸运值） */
		public needItem:string;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_rune.xls】 ----> compound   */
class RuneCompoundCfgInfo
{
		 /**  道具ID */
		public itemID:number;
		 /**  道具名称 */
		public itemName:number;
		 /**  需要玩家等级 */
		public needPlayerLevel:number;
		 /**  需要道具消耗道具ID_数量; */
		public needItemExpend:string;
		 /**  需要道具ID */
		public needItemID:number;
		 /**  数量概率数量_概率万分比; */
		public countRate:string;
		 /**  是否可合成 */
		public ifSynthesis:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_rune.xls】 ----> refine   */
class RuneRefineCfgInfo
{
		 /**  铭文类型1;//星辰符文2;//月亮符文3;//太阳符文4;//彩虹符文5;//闪烁符文 */
		public runeType:number;
		 /**  需要道具消耗道具ID_数量; */
		public needItemExpend:string;
		 /**  锁定一个的消耗 */
		public lockNeedItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_rune.xls】 ----> randattr   */
class RuneRandattrCfgInfo
{
		 /**  属性索引 */
		public attrIndex:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_rune.xls】 ----> randskill   */
class RuneRandskillCfgInfo
{
		 /**  铭文类型1;//星辰符文2;//月亮符文3;//太阳符文4;//彩虹符文5;//闪烁符文 */
		public runeType:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_rune.xls】 ----> fixed   */
class RuneFixedCfgInfo
{
		 /**  道具ID */
		public itemID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_skillEffect_new.xls】 ----> skillEffect   */
class SkillEffectNewSkillEffectCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  皮肤ID */
		public heroID:number;
		 /**  技能索引 */
		public skillIndex:number;
		 /**  施法位置 0:屏幕中心,1:保持不动;2:对位目标前;3;我方对位排:4:中心对位排 */
		public castPos:number;
		 /**  施法时屏幕是否变黑 */
		public darkScreen:number;
		 /**  施法动作win 胜利动作不循环 */
		public castingAction:string;
		 /**  施动作速度(ms) */
		public animationSpeed:number;
		 /**  施法特效 */
		public castingEffect:string;
		 /**  施法特效速度(ms) */
		public castingSpeed:number;
		 /**  施法音效 */
		public castingSound:string;
		 /**  施法音效播放延迟(ms) */
		public castingSoundDelay:number;
		 /**  技能特效 */
		public skillEffect:string;
		 /**  技能特效速度(ms) */
		public skillSpeed:number;
		 /**  技能音效 */
		public skillSound:string;
		 /**  技能音效播放延迟(ms) */
		public skillSoundDelay:number;
		 /**  飞行武器配置，默认用技能特效资源,【动作发起的帧数_相对角色偏移X_相对角色偏移Y;...】,当x,y都等于-1时，子弹默认从角色头顶发出 */
		public weaponAction:string;
		 /**  角色受到伤害的帧数(不填则默认表示本次受到飞行武器攻击，飞行配置不填则子弹从头顶发出) */
		public behitFrames:string;
		 /**  角色受击特效位置，0:随机，1:脚底，2:头顶，3:中心 */
		public behitPos:number;
		 /**  受击特效 */
		public behitEffect:string;
		 /**  受击特效速度(ms) */
		public behitSpeed:number;
		 /**  受击音效 */
		public behitSound:string;
		 /**  受击音效播放延迟(ms) */
		public behitSoundDelay:number;
		 /**  扩展参数(SkillEffectExtendsType) */
		public extendParams:string;
		 /**  人物攻击站位的偏移 */
		public roleAttackOffset:string;
		 /**  震屏配制 */
		public sharkScreen:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_drop.xls】 ----> cs_drop_group   */
class DropDropGroupCfgInfo
{
		 /**  组ID */
		public groupID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_drop.xls】 ----> cs_drop   */
class DropDropCfgInfo
{
		 /**  掉落ID */
		public dropID:number;
		 /**  固定奖励 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_challenge.xls】 ----> robot   */
class ChallengeRobotCfgInfo
{
		 /**  ID */
		public robotID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_challenge.xls】 ----> daily_prize   */
class ChallengeDailyPrizeCfgInfo
{
		 /**  排名（上一排名,此名次] */
		public order:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_challenge.xls】 ----> week_prize   */
class ChallengeWeekPrizeCfgInfo
{
		 /**  奖励ID */
		public prizeID:number;
		 /**  需要挑战次数 */
		public needFightCount:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_challenge.xls】 ----> const_info   */
class ChallengeConstInfoCfgInfo
{
		 /**  初始积分 */
		public initScore:number;
		 /**  重置积分比例百分比 */
		public resetScoreRate:number;
		 /**  每日免费次数 */
		public dayFreeCount:number;
		 /**  奖励时间 */
		public dailyPrizeTime:string;
		 /**  成功奖励道具 */
		public winAddItem:string;
		 /**  失败奖励道具 */
		public failAddItem:string;
		 /**  战斗跳过需要次数 */
		public sweepNeedCount:number;
		 /**  赛季天数 */
		public seasonDays:number;
		 /**  随机机器人最低积分 */
		public randRobotScore:number;
		 /**  随机积分差 */
		public randScoreRange:number;
		 /**  进入需要的道具ID */
		public enterNeedItemID:number;
		 /**  点赞奖励 */
		public likePrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_challenge.xls】 ----> win_prize   */
class ChallengeWinPrizeCfgInfo
{
		 /**  概率 */
		public rate:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_challenge.xls】 ----> fail_prize   */
class ChallengeFailPrizeCfgInfo
{
		 /**  概率 */
		public rate:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_challenge.xls】 ----> season_prize   */
class ChallengeSeasonPrizeCfgInfo
{
		 /**  排名（上一排名,此名次] */
		public order:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_challenge.xls】 ----> monster_new   */
class ChallengeMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_guess.xls】 ----> guess   */
class GuessCfgInfo
{
		 /**  问题索引 */
		public iD:number;
		 /**  题目 */
		public desc:string;
		 /**  错误选项 */
		public wrong:string;
		 /**  加载图片 */
		public value:string;
		 /**  阵营 */
		public petType:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_guess.xls】 ----> show_reward   */
class GuessShowRewardCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  展示排名奖励 */
		public rewards:string;
		 /**  说明 */
		public des:string;
		 /**  总共可错误的次数 */
		public wrongCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_stronger.xls】 ----> funList   */
class StrongerFunListCfgInfo
{
		 /**  功能ID */
		public iD:number;
		 /**  功能名称 */
		public name:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_stronger.xls】 ----> stronger   */
class StrongerCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  Name */
		public name:string;
		 /**  Des */
		public des:string;
		 /**  UIOpen表对应ID */
		public uIOpenID:number;
		 /**  ServerKey */
		public serverKey:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_stronger.xls】 ----> resListTitle   */
class StrongerResListTitleCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  Name */
		public name:string;
		 /**  Des */
		public des:string;
		 /**  道具列表 */
		public itemID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_stronger.xls】 ----> resListDetail   */
class StrongerResListDetailCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  resTitleID */
		public resTitleID:number;
		 /**  Name */
		public name:string;
		 /**  Des */
		public des:string;
		 /**  UIOpen表对应ID */
		public uIOpenID:number;
		 /**  道具列表 */
		public itemID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_stronger.xls】 ----> petCommand   */
class StrongerPetCommandCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  Name */
		public name:string;
		 /**  Des */
		public des:string;
		 /**  刷怪位置ID_怪物ID_怪物等级 */
		public addMonster:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_stronger.xls】 ----> question   */
class StrongerQuestionCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  Name */
		public name:string;
		 /**  Des */
		public des:string;
		 /**  Height */
		public height:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【textConfig.xls】 ----> textConfig   */
class TextConfigCfgInfo
{
		 /**  id */
		public id:string;
		 /**  简体中文(正式配置值不能出现) */
		public chinese:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_sail.xls】 ----> sail_refresh   */
class SailRefreshCfgInfo
{
		 /**  刷新次数(上一次，此次] */
		public refreshCount:number;
		 /**  需要钻石 */
		public needDiamond:number;
		 /**  需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_sail.xls】 ----> sail_pool   */
class SailPoolCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  远航类型1; //普通2; //精良3; //稀有4; //史诗5; //传说6; //不朽 */
		public sailType:number;
		 /**  增加道具 */
		public addItem:string;
		 /**  描述 */
		public name:string;
		 /**  需要星级 */
		public needPetStar:number;
		 /**  需要种族种族1;种族2; */
		public needPetType:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_sail.xls】 ----> sail_type   */
class SailTypeCfgInfo
{
		 /**  派遣类型1; //普通2; //精良3; //稀有4; //史诗5; //传说6; //不朽 */
		public sailType:number;
		 /**  需要挂机点 */
		public needSailPoint:number;
		 /**  冷却时间(分钟) */
		public coolTime:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_sail.xls】 ----> sail_buyhour   */
class SailBuyhourCfgInfo
{
		 /**  小时数 */
		public hour:number;
		 /**  需要钻石 */
		public needDiamond:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_ladder.xls】 ----> const_info   */
class LadderConstInfoCfgInfo
{
		 /**  免费挑战次数 */
		public dayFightCount:number;
		 /**  购买次数 */
		public dayBuyCount:number;
		 /**  刷新间隔时间秒 */
		public refreshStep:number;
		 /**  开启时间 */
		public openTime:string;
		 /**  奖励时间 */
		public prizeTime:string;
		 /**  胜利奖励 */
		public winPrize:string;
		 /**  失败奖励 */
		public failPrize:string;
		 /**  点赞奖励 */
		public likePrize:string;
		 /**  我的记录个数 */
		public maxRecNum:number;
		 /**  大神记录个数 */
		public maxPublicRecNum:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_ladder.xls】 ----> robot   */
class LadderRobotCfgInfo
{
		 /**  ID */
		public robotID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_ladder.xls】 ----> top_prize   */
class LadderTopPrizeCfgInfo
{
		 /**  排名（上一排名,此名次] */
		public order:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_ladder.xls】 ----> buy_count   */
class LadderBuyCountCfgInfo
{
		 /**  次数 */
		public count:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  需要VIP等级 */
		public needVIP:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_ladder.xls】 ----> monster_new   */
class LadderMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_player_name.xls】 ----> Name   */
class PlayerNameNameCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  姓氏 */
		public surName:string;
		 /**  男名 */
		public maleName:string;
		 /**  女名 */
		public femaleName:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_dan.xls】 ----> const   */
class DanConstCfgInfo
{
		 /**  玩法名称 */
		public name:string;
		 /**  需要世界等级 */
		public needWorldLevel:number;
		 /**  开启第二队需要神器ID */
		public team2NeedArifact:number;
		 /**  每日挑战次数 */
		public dayFightCount:number;
		 /**  初始积分 */
		public initScore:number;
		 /**  初始段位ID */
		public initDanID:number;
		 /**  服务器个数 */
		public serverCount:number;
		 /**  赛季天数 */
		public seasonDays:number;
		 /**  上半个赛季总天数 */
		public upSeasonDays:number;
		 /**  下半个赛季总天数 */
		public lowSeasonDays:number;
		 /**  王者赛开启天数 */
		public kingOpenDays:number;
		 /**  王者赛准入段位 */
		public kingNeedDan:number;
		 /**  匹配积分区间百分比 */
		public matchScoreRate:string;
		 /**  胜利增加经验区间 */
		public sucAddExp:string;
		 /**  失败失去经验区间 */
		public failDelExp:string;
		 /**  开启时间 */
		public openTime:string;
		 /**  大师段位 */
		public masterDan:number;
		 /**  个人记录数 */
		public recordNum:number;
		 /**  大师记录数 */
		public masterRecordNum:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_dan.xls】 ----> dan_upgrade   */
class DanUpgradeCfgInfo
{
		 /**  段位ID */
		public danID:number;
		 /**  段位名称 */
		public danName:string;
		 /**  类型 */
		public type:number;
		 /**  最大经验 */
		public maxExp:number;
		 /**  缓冲经验 */
		public cacheExp:number;
		 /**  首达奖励 */
		public firstPrize:string;
		 /**  段位奖励 */
		public danPrize:string;
		 /**  继承段位ID */
		public inheritDanID:number;
		 /**  晋级胜场数胜场_总场次 */
		public promoteWinCount:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_dan.xls】 ----> buy_count   */
class DanBuyCountCfgInfo
{
		 /**  次数 */
		public count:number;
		 /**  需要vip等级 */
		public needVipLevel:number;
		 /**  需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_dan.xls】 ----> fight_prize   */
class DanFightPrizeCfgInfo
{
		 /**  结果0;//胜利1;//失败2;//平局 */
		public result:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_dan.xls】 ----> area   */
class DanAreaCfgInfo
{
		 /**  区域ID */
		public iD:number;
		 /**  区域名称 */
		public areaName:string;
		 /**  区域图标id */
		public iconId:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_dan.xls】 ----> top_prize   */
class DanTopPrizeCfgInfo
{
		 /**  名次 */
		public rank:number;
		 /**  需要段位ID */
		public needDanID:number;
		 /**  增加称号ID */
		public addTitle:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction_name.xls】 ----> name   */
class FactionNameNameCfgInfo
{
		 /**  随机名字 */
		public name:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【c_question.xls】 ----> question   */
class QuestionCfgInfo
{
		 /**  序号 */
		public index:number;
		 /**  问卷ID */
		public questionnaireID:number;
		 /**  题型 */
		public type:number;
		 /**  题目 */
		public desc:string;
		 /**  选择题选项（|分隔） */
		public choice:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【numberSystem.xls】 ----> numberSystem   */
class NumberSystemCfgInfo
{
		 /**  id */
		public id:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_holy.xls】 ----> upgrade   */
class HolyUpgradeCfgInfo
{
		 /**  索引 */
		public id:number;
		 /**  类型1;//水2;//火3;//风4;//太阳5;//月亮 */
		public petType:number;
		 /**  等级 */
		public level:number;
		 /**  此级最大经验 */
		public maxExp:number;
		 /**  每次增加经验 */
		public addExp:string;
		 /**  需要道具 */
		public needItem:string;
		 /**  增加属性属性类型|属性值 */
		public addAttr:string;
		 /**  每十点经验增加属性属性类型|属性值 */
		public expAddAttr:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_holy.xls】 ----> advance   */
class HolyAdvanceCfgInfo
{
		 /**  索引 */
		public id:number;
		 /**  类型1;//水2;//火3;//草4;//光5;//暗 */
		public petType:number;
		 /**  等级 */
		public level:number;
		 /**  需要携带物等级 */
		public needHolyLevel:number;
		 /**  需要伙伴星级个数星级_个数 */
		public needPetCount:string;
		 /**  需要道具 */
		public needItem:string;
		 /**  增加属性属性类型_属性值 */
		public addAttr:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_holy.xls】 ----> unlock   */
class HolyUnlockCfgInfo
{
		 /**  类型1;//水2;//火3;//风4;//太阳5;//月亮 */
		public petType:number;
		 /**  需要伙伴星级个数星级_个数 */
		public needPetCount:string;
		 /**  名称 */
		public name:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_defend.xls】 ----> rank   */
class DefendRankCfgInfo
{
		 /**  阶级 */
		public rank:number;
		 /**  名字 */
		public name:string;
		 /**  模型 */
		public model:string;
		 /**  此等级上限 */
		public maxLevel:number;
		 /**  升阶需要道具最后一个为空 */
		public needItem:string;
		 /**  进阶提示 */
		public tips:string;
		 /**  基础属性 */
		public baseAttr:string;
		 /**  精灵加成(给战斗精灵加成) */
		public addPetAttr:string;
		 /**  (属性|值|百分比;)（守护精灵给精灵球加的属性） */
		public addPercent:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_defend.xls】 ----> level   */
class DefendLevelCfgInfo
{
		 /**  等级 */
		public level:number;
		 /**  升需要道具最后一个为空 */
		public needItem:string;
		 /**  基础属性 */
		public baseAttr:string;
		 /**  精灵加成(给战斗精灵加成) */
		public addPetAttr:string;
		 /**  (属性|值|百分比;)（守护精灵给精灵球加的属性） */
		public addPercent:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_defend.xls】 ----> slot   */
class DefendSlotCfgInfo
{
		 /**  槽位 */
		public slot:number;
		 /**  守护等级 */
		public level:number;
		 /**  守护阶级 */
		public rank:number;
		 /**  解锁条件说明 */
		public unlockDesc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_defend.xls】 ----> skill   */
class DefendSkillCfgInfo
{
		 /**  英雄id */
		public petID:number;
		 /**  英雄星级 */
		public petStar:number;
		 /**  技能id */
		public skillID:number;
		 /**  技能等级 */
		public skillLevel:number;
		 /**  技能评分 */
		public skillScore:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_defend.xls】 ----> plan   */
class DefendPlanCfgInfo
{
		 /**  序号 */
		public index:number;
		 /**  开启消耗 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction_war.xls】 ----> const   */
class FactionWarConstCfgInfo
{
		 /**  玩法名称 */
		public name:string;
		 /**  需要帮派等级 */
		public needLevel:number;
		 /**  需要活跃人数 */
		public needActiveCount:number;
		 /**  每日挑战次数 */
		public dayFightCount:number;
		 /**  废墟最大挑战次数 */
		public runieFightCount:number;
		 /**  废墟被动技能ID */
		public runieSkillID:number;
		 /**  废墟最大的技能等级 */
		public runieSkillMaxLevel:number;
		 /**  匹配时间 */
		public matchTime:string;
		 /**  开启时间 */
		public openTime:string;
		 /**  奖励时间 */
		public prizeTime:string;
		 /**  宝箱领取时间 */
		public prizeBoxTime:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction_war.xls】 ----> fight_prize   */
class FactionWarFightPrizeCfgInfo
{
		 /**  难度星级 */
		public star:number;
		 /**  增加的被动技能技能ID_等级 */
		public addSkill:string;
		 /**  成功奖励 */
		public sucAddItem:string;
		 /**  失败奖励奖励 */
		public failAddItem:string;
		 /**  战绩点参数 */
		public fightPointParam:number;
		 /**  战绩点系数 */
		public fightPointRate:number;
		 /**  失败增加战绩点 */
		public failAddFightPoint:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction_war.xls】 ----> box_prize   */
class FactionWarBoxPrizeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  奖励 */
		public addPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_faction_war.xls】 ----> top_prize   */
class FactionWarTopPrizeCfgInfo
{
		 /**  名次 */
		public rank:number;
		 /**  奖励 */
		public addPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> main_achieve   */
class AchieveMainAchieveCfgInfo
{
		 /**  成就ID */
		public iD:number;
		 /**  成就大类型1; //主线成就2; //每日活跃3; //公会成就4; //图腾成就 */
		public achieveBigType:number;
		 /**  名称 */
		public name:string;
		 /**  等级 */
		public level:number;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  参数 */
		public param:number;
		 /**  奖励道具 */
		public addItem:string;
		 /**  后置成就ID */
		public nextID:number;
		 /**  分组起始ID */
		public groupFirstId:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> liveness   */
class AchieveLivenessCfgInfo
{
		 /**  成就ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> faction_liveness   */
class AchieveFactionLivenessCfgInfo
{
		 /**  成就ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  重置类型 */
		public achiveResetType:number;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  增加活跃度 */
		public addLiveness:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> liveness_prize   */
class AchieveLivenessPrizeCfgInfo
{
		 /**  奖励ID */
		public iD:number;
		 /**  需要活跃度 */
		public needItem:string;
		 /**  增加道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> achieve_type   */
class AchieveTypeCfgInfo
{
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  是否累加值 */
		public isAdd:number;
		 /**  UIOpen表对应ID */
		public uIOpenID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> train   */
class AchieveTrainCfgInfo
{
		 /**  成就ID */
		public iD:number;
		 /**  历练类型_emAchieveTrainType1;//竞技历练2;//战斗历练3;//特殊历练 */
		public type:number;
		 /**  名称 */
		public name:string;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> activity_liveness   */
class AchieveActivityLivenessCfgInfo
{
		 /**  成就ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  参数 */
		public param:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> activity_liveness_prize   */
class AchieveActivityLivenessPrizeCfgInfo
{
		 /**  奖励ID */
		public iD:number;
		 /**  需要活跃度 */
		public needItem:string;
		 /**  增加道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> week_liveness   */
class AchieveWeekLivenessCfgInfo
{
		 /**  成就ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> week_liveness_prize   */
class AchieveWeekLivenessPrizeCfgInfo
{
		 /**  奖励ID */
		public iD:number;
		 /**  需要活跃度 */
		public needItem:string;
		 /**  增加道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> war_order   */
class AchieveWarOrderCfgInfo
{
		 /**  成就ID */
		public iD:number;
		 /**  类型_emWarOrderType */
		public type:number;
		 /**  名称 */
		public name:string;
		 /**  进度描述 */
		public desc:string;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> war_order_prize   */
class AchieveWarOrderPrizeCfgInfo
{
		 /**  等级 */
		public level:number;
		 /**  到下一级的经验 */
		public exp:number;
		 /**  奖励 */
		public addItem:string;
		 /**  进阶奖励 */
		public advAddItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> const   */
class AchieveConstCfgInfo
{
		 /**  战令持续时间 */
		public warOrderDuration:number;
		 /**  战令开始时间 */
		public warOrderOpenDay:number;
		 /**  战令周任务天数 */
		public warOrderWeekDays:string;
		 /**  进阶奖励预览 */
		public advPrizePreview:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_achieve.xls】 ----> achieve_road   */
class AchieveRoadCfgInfo
{
		 /**  成就ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  成就类型 */
		public achieveType:number;
		 /**  成就子类型 */
		public achieveSubType:number;
		 /**  值 */
		public value:number;
		 /**  参数 */
		public param:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_expedition.xls】 ----> stage   */
class ExpeditionStageCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  关卡 */
		public stageID:number;
		 /**  难度 */
		public expeditionType:number;
		 /**  奖励道具 */
		public addPrize:string;
		 /**  宝箱奖励 */
		public extraPrize:string;
		 /**  战力区间百分比 */
		public fightpowerRate:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_expedition.xls】 ----> robot   */
class ExpeditionRobotCfgInfo
{
		 /**  ID */
		public robotID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_expedition.xls】 ----> stage_type   */
class ExpeditionStageTypeCfgInfo
{
		 /**  关卡 */
		public stageType:number;
		 /**  需要战力 */
		public needFightPower:number;
		 /**  奖励预览 */
		public addPrize:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_expedition.xls】 ----> monster_new   */
class ExpeditionMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_hook.xls】 ----> scene   */
class HookSceneCfgInfo
{
		 /**  场景ID */
		public sceneID:number;
		 /**  章节 */
		public chapterName:string;
		 /**  场景名称 */
		public sceneName:string;
		 /**  场景类型 */
		public belongType:number;
		 /**  需要等级 */
		public needLevel:number;
		 /**  需要前置关卡 */
		public needStage:number;
		 /**  场景资源名称 */
		public sceneResource:string;
		 /**  场景背景音乐 */
		public bGMPath:string;
		 /**  关卡数 */
		public stage:string;
		 /**  节点 */
		public nodenunm:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_hook.xls】 ----> stage   */
class HookStageCfgInfo
{
		 /**  关卡ID */
		public stageID:number;
		 /**  场景ID */
		public sceneID:number;
		 /**  需要玩家等级 */
		public needPlayerLevel:number;
		 /**  最大回合 */
		public maxRound:number;
		 /**  刷怪boss */
		public bossGroupID:number;
		 /**  普通掉落 */
		public hookDropID:number;
		 /**  Boss掉落 */
		public bossDropID:number;
		 /**  使用道具掉落 */
		public useItemDropID:number;
		 /**  战斗完CD */
		public fightCD:number;
		 /**  最大远航积分 */
		public maxSailPoint:number;
		 /**  推荐战力 */
		public power:number;
		 /**  BOSS来袭形象 */
		public bossShape:number;
		 /**  奖励预览 */
		public prizePreview:number;
		 /**  背景图 */
		public bgmap:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_hook.xls】 ----> stage_prize   */
class HookStagePrizeCfgInfo
{
		 /**  关卡ID */
		public stageID:number;
		 /**  关卡奖励道具ID_数量; */
		public stagePrize:string;
		 /**  广播 */
		public broadcast:number;
		 /**  是否预告 */
		public isTarget:number;
		 /**  是否御三家 */
		public threeHome:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_hook.xls】 ----> buy_sweepcount   */
class HookBuySweepcountCfgInfo
{
		 /**  次数 */
		public buyCount:number;
		 /**  需要钻石 */
		public needDiamond:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_hook.xls】 ----> activity_drop   */
class HookActivityDropCfgInfo
{
		 /**  活动ID */
		public activityID:number;
		 /**  每小时固定掉落个数 */
		public hourCount:number;
		 /**  道具ID */
		public itemID:number;
		 /**  持续天数(0与活动一致) */
		public days:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_hook.xls】 ----> boss_dropInfo   */
class HookBossDropInfoCfgInfo
{
		 /**  ID */
		public index:number;
		 /**  章节 */
		public chapter:number;
		 /**  关卡 */
		public stage:number;
		 /**  道具列表 */
		public itemList:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_hook.xls】 ----> normal_dropInfo   */
class HookNormalDropInfoCfgInfo
{
		 /**  ID */
		public index:number;
		 /**  章节 */
		public chapter:number;
		 /**  关卡 */
		public stage:number;
		 /**  道具列表 */
		public itemList:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_hook.xls】 ----> chapter_unlock   */
class HookChapterUnlockCfgInfo
{
		 /**  区域ID */
		public iD:number;
		 /**  区域名 */
		public areaName:string;
		 /**  场景列表 */
		public sceneList:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_hook.xls】 ----> monster_new   */
class HookMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;
		 /**  Boss序号 */
		public bossIndex:number;
		 /**  fuck ,为什么不加描述 */
		public monsterInfo:string;
		 /**  Boss名称 */
		public bossName:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【c_error_code.xls】 ----> c_error_code   */
class ErrorCodeErrorCodeCfgInfo
{
		 /**  序号 */
		public id:number;
		 /**  主协议号 */
		public mainProtocol:number;
		 /**  返回码 */
		public eventFlag:number;
		 /**  程序解释 */
		public error:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_system_switch.xls】 ----> system_switch   */
class SystemSwitchSystemSwitchCfgInfo
{
		 /**  索引 */
		public iD:number;
		 /**  排序 */
		public sort:number;
		 /**  功能名称 */
		public name:string;
		 /**  大类型ID参照枚举_emPC2S_Protocol */
		public mainProctocalID:string;
		 /**  子类型ID参照主协议对应的子协议分号隔开 */
		public subProctocalID:string;
		 /**  是否无视条件直接开启 */
		public noCondition:number;
		 /**  等级条件 */
		public level:number;
		 /**  世界等级 */
		public worldLevel:number;
		 /**  关卡数 */
		public stage:number;
		 /**  全局开关 */
		public open:number;
		 /**  功能图标 */
		public icon:string;
		 /**  是否推送功能开启图标 */
		public remindSwitch:number;
		 /**  登录天数 */
		public loginDays:number;
		 /**  未解锁时提示 */
		public unlockDes:string;
		 /**  功能描述 */
		public describe:string;
		 /**  未解锁图标是否显示 */
		public showIcon:number;
		 /**  开启奖励 */
		public addItem:string;
		 /**  功能跳转 */
		public uIOpenId:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_system_switch.xls】 ----> system_group   */
class SystemSwitchSystemGroupCfgInfo
{
		 /**  系统ID组合 */
		public groups:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> activity   */
class ActivityCfgInfo
{
		 /**  活动ID */
		public iD:number;
		 /**  活动类型 */
		public type:number;
		 /**  选项(选项类型后跟参数用_隔开，多个选项用;号隔开) */
		public option:string;
		 /**  组id(组id相同互斥) */
		public groupId:number;
		 /**  子类型 */
		public sonType:number;
		 /**  配置失效时间 */
		public invalidTime:number;
		 /**  生效时间 */
		public validTime:number;
		 /**  开启时间 */
		public openTime:string;
		 /**  重置时间 */
		public refreshTime:string;
		 /**  参数 */
		public param:string;
		 /**  开启状态 */
		public openState:number;
		 /**  榜单类型 */
		public topListType:number;
		 /**  活动参数 */
		public isMerge:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> charge_amount   */
class ActivityChargeAmountCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  累计金额 */
		public charge:number;
		 /**  奖励 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> charge_days   */
class ActivityChargeDaysCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  累计天数 */
		public day:number;
		 /**  奖励 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> levelup   */
class ActivityLevelupCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  等级需求 */
		public level:number;
		 /**  奖励物品 */
		public addItem:string;
		 /**  数量 */
		public num:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> times   */
class ActivityTimesCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  次数需求 */
		public times:number;
		 /**  奖励物品 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> exchange   */
class ActivityExchangeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  特殊道具需求 */
		public needAmount:number;
		 /**  奖励物品 */
		public addItem:string;
		 /**  限购数量 */
		public limitNum:number;
		 /**  是否显示超值 */
		public showBargain:number;
		 /**  消耗道具 */
		public needItem:string;
		 /**  消耗精灵 */
		public needPet:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> first_charge   */
class ActivityFirstChargeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  充值金额 */
		public amount:number;
		 /**  天数 */
		public day:number;
		 /**  奖励物品 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> grow_fund   */
class ActivityGrowFundCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  等级需求 */
		public level:number;
		 /**  奖励物品 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> fund   */
class ActivityFundCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  天数 */
		public day:number;
		 /**  是否加入首页预览 */
		public isPreview:number;
		 /**  奖励物品 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> login   */
class ActivityLoginCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  天数 */
		public day:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  奖励物品 */
		public addItem:string;
		 /**  按钮文字提示 */
		public buttonTips:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> short_term_gift   */
class ActivityShortTermGiftCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  商品ID */
		public productID:number;
		 /**  触发类型 */
		public trigger:number;
		 /**  触发参数 */
		public params:string;
		 /**  持续时间(分钟) */
		public duration:number;
		 /**  页签按钮文字 */
		public tabName:string;
		 /**  显示返利比例 */
		public rebate:number;
		 /**  描述文字 */
		public desc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> achievement   */
class ActivityAchievementCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  名称 */
		public name:string;
		 /**  天数 */
		public day:number;
		 /**  分组 */
		public group:number;
		 /**  成就ID(成就ID不为0的要花钻石买) */
		public achievement:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  奖励道具 */
		public addItem:string;
		 /**  需要VIP */
		public vIP:number;
		 /**  数量限制 */
		public count:number;
		 /**  原价 */
		public oldPrice:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> rank   */
class ActivityRankCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  奖励物品 */
		public addItem:string;
		 /**  个数 */
		public count:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> zero_buy   */
class ActivityZeroBuyCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  需要等级 */
		public level:number;
		 /**  需要VIP */
		public vIP:number;
		 /**  开服天数 */
		public day:number;
		 /**  返还天数 */
		public returnDay:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  奖励物品 */
		public addItem:string;
		 /**  礼包图标 */
		public tabIcon:string;
		 /**  名字 */
		public name:string;
		 /**  banner图 */
		public banner:string;
		 /**  总入口图标配置读取每个活动的第一个即可 */
		public mainIcon:string;
		 /**  界面标题图片配置读取每个活动的第一个即可 */
		public titleIcon:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> limit_gift   */
class ActivityLimitGiftCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  全服限购 */
		public allCount:number;
		 /**  每人限购 */
		public count:number;
		 /**  单人限购刷新天数 */
		public refreshDay:number;
		 /**  商品ID */
		public productID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> weekend   */
class ActivityWeekendCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  周几（周日0） */
		public day:number;
		 /**  奖励物品 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> achieve_road   */
class ActivityAchieveRoadCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  名称 */
		public name:string;
		 /**  天数 */
		public day:number;
		 /**  分组 */
		public group:number;
		 /**  成就ID(对应成就表内achieve_road) */
		public achievement:number;
		 /**  需要道具 */
		public needItem:string;
		 /**  奖励道具 */
		public addItem:string;
		 /**  需要VIP */
		public vIP:number;
		 /**  数量限制 */
		public count:number;
		 /**  原价 */
		public oldPrice:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> limit_day_gift   */
class ActivityLimitDayGiftCfgInfo
{
		 /**  活动ID */
		public activityID:number;
		 /**  名称 */
		public name:string;
		 /**  天数 */
		public day:number;
		 /**  礼包列表 */
		public gifts:string;
		 /**  一键购买礼包id */
		public quickbuy:number;
		 /**  折扣 */
		public discount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> exchange_ex   */
class ActivityExchangeExCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  兑换物品/精灵 */
		public fromItemID:number;
		 /**  数量 */
		public needAmount:number;
		 /**  消耗类型(1=道具，2=精灵) */
		public type:number;
		 /**  奖励物品 */
		public addItem:string;
		 /**  限购数量 */
		public limitNum:number;
		 /**  折扣客户端显示用0表示无折扣 */
		public discount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> red_envelope   */
class ActivityRedEnvelopeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID（暂定） */
		public activityID:number;
		 /**  名称 */
		public name:string;
		 /**  红包角色图 */
		public img:string;
		 /**  红包类型（2每天重置） */
		public type:number;
		 /**  领取时间 */
		public time:string;
		 /**  打开红包描述 */
		public desc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> reward_pool   */
class ActivityRewardPoolCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  随机池 */
		public poolType:number;
		 /**  权重 */
		public rate:number;
		 /**  增加道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> common_group   */
class ActivityCommonGroupCfgInfo
{
		 /**  界面组ID */
		public groupID:number;
		 /**  界面位置类型1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标4：//顶部第三排图标5：//顶部展开气泡图标6：//小游戏气泡图标大于6时，主界面不显示7:6.1活动组8：端午活动组 */
		public mainPositionType:number;
		 /**  是否在挂机界面显示 */
		public hookShow:number;
		 /**  主界面图标配置图标位置和名称 */
		public mainIcon:string;
		 /**  特效类型ui_timeLimitActBtn  //一键牛逼特效circle //转圈特效 */
		public mainEff:string;
		 /**  是否是合服活动 */
		public isMerge:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> common_group_page   */
class ActivityCommonGroupPageCfgInfo
{
		 /**  索引ID唯一索引 */
		public indexID:number;
		 /**  界面组ID填写common_group中的分组ID */
		public groupID:number;
		 /**  子类型1://限购礼包类型2://充值返利类型3://连冲活动类型4：//心愿抽卡5：//成就之路6：//胡帕抽卡7：//进化抽卡8：//小游戏兑换9：//兑换商店10：//定制礼包11://专属英雄12://兑换（多兑一）13：//限时挑战（活动boss） */
		public type:number;
		 /**  关联的活动列表 */
		public activityIds:string;
		 /**  切页图标 */
		public pageIcon:string;
		 /**  切页名称填写切页名称 */
		public pageName:string;
		 /**  banner图填写banner图名称，不配不显示 */
		public banner:string;
		 /**  banner上的文字提示 */
		public bannerTips:string;
		 /**  帮助描述信息帮助信息文本，不配不显示 */
		public helpTips:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity.xls】 ----> war_order_level   */
class ActivityWarOrderLevelCfgInfo
{
		 /**  活动ID */
		public activityID:number;
		 /**  等级 */
		public level:number;
		 /**  升级所需积分 */
		public score:number;
		 /**  奖励物品 */
		public addItem:string;
		 /**  进阶奖励物品 */
		public addSpecialItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_custom_gift.xls】 ----> customgift   */
class CustomGiftCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  充值ID */
		public chargeId:number;
		 /**  道具数量 */
		public itemNum:string;
		 /**  限购数量 */
		public limitNum:number;
		 /**  定制池 */
		public customPool:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_custom_gift.xls】 ----> giftpool   */
class CustomGiftGiftpoolCfgInfo
{
		 /**  奖励序号 */
		public index:number;
		 /**  池子ID */
		public poolID:number;
		 /**  池子物品序号 */
		public poolItemIndex:number;
		 /**  物品 */
		public item:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_charge.xls】 ----> charge   */
class ChargeCfgInfo
{
		 /**  商品ID */
		public iD:number;
		 /**  商品名称（必填字段） */
		public name:string;
		 /**  平台类型_emPlatformType */
		public platType:number;
		 /**  购买的类型 */
		public chargeType:number;
		 /**  子类型(根据不同的购买类型细分子类型) */
		public sonType:number;
		 /**  是否绝版 */
		public outOfPrint:number;
		 /**  扩展参数 */
		public params:string;
		 /**  所需的人民币(分) */
		public needMoney:number;
		 /**  限购次数(0不限购) */
		public maxBuyCount:number;
		 /**  限购周期 */
		public limitBuyPeriod:number;
		 /**  组ID */
		public groupID:number;
		 /**  分组前提条件 */
		public needPreCondition:string;
		 /**  开启时间 */
		public openTime:string;
		 /**  循环开服天数 */
		public circleServerDay:number;
		 /**  加道具 */
		public addItem:string;
		 /**  首次额外赠送道具 */
		public firstAddItem:string;
		 /**  非首次额外赠送道具 */
		public extraAddItem:string;
		 /**  是否广播 */
		public broadCast:number;
		 /**  商品描述 */
		public desc:string;
		 /**  内购项ID */
		public appid:string;
		 /**  联运内购项ID */
		public appid3:string;
		 /**  联运内购项ID2 */
		public appid2122044:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_buff_new.xls】 ----> buff   */
class BuffNewBuffCfgInfo
{
		 /**  编号 */
		public iD:number;
		 /**  buff名称 */
		public buffName:string;
		 /**  描述 */
		public desc:string;
		 /**  buff类型_emBuffType 1;//加属性   属性类型_属性值(可为负数)_属性万分比(可为负数) 2;//加状态   状态ID _emBuffControlType 3;//持续加消耗  加消耗  消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数) 4;//分担伤害   伤害万分比 5;//法术反噬   施法者属性ID_施法者属性万分比 6;//受物理攻击加buff 概率万分比_buffid 7;//增加治疗护盾  8;//增加护盾   属性ID_属性万分比_属性来源（0=目标，1=施法者） 9;//反弹伤害   伤害万分比 10;//偷取目标的属性 施法者属性ID_施法者属性万分比 11;//被攻击掉血  施法者属性ID_施法者属性万分比 12;//持续掉血   自己属性ID_自己属性万分比_最大自己属性ID_最大自己属性万分比 13;//抵挡伤害   次数 14;//buff删除掉血  消耗类型_消耗值(可为负数)_施法者属性ID_施法者属性万分比(可为负数) 15;//伤害限制   属性类型_属性万分比 16;//普攻选目标  _emSkillCondition_参数1 17;//攻击吸血   伤害万分比 18;//只和加buff的人分担伤害 伤害万分比 */
		public buffType:number;
		 /**  buff参数配置 */
		public value:string;
		 /**  增加状态_emBuffControlType1;//冰冻 无法行动2;//眩晕 无法行动3;//沉睡 无法行动4;//禁止复活 无法行动5;//嘲讽6;//虚弱_emBuffControlType7;//混乱状态8;//石化9;//离间10;//麻痹11;//封印12;//禁疗13;//免疫14;//流血15;//灼烧16;//中毒17;//破甲18;//减速19;//速度提升20;//格挡盾21;//法术反噬22;//海蛇庇护23;//持续恢复24;//治疗盾25;//护盾26;//烈焰灼烧27;//沉默28;//偷取攻击29;//魔化30;//森林印记31;//感电32;//诅咒33;//死亡印记34;//灵魂印记35;//怒气36;//免疫控制37;//免疫负面效果 */
		public addState:number;
		 /**  组cs_buff_group组ID_组等级 */
		public group:number;
		 /**  效果类型_emBuffEffectType 1;//正面 2;//负面 3;//负面完全可驱散（不检测Mark驱散标记） 4;//负面控制 */
		public effectType:number;
		 /**  叠加规则_emBuffSameRepeatType1丢弃2替换3叠加回合 */
		public sameRepeatType:number;
		 /**  不同来源叠加规则_emBuffDiffRepeatType1;//丢弃2;//替换3;//共存 */
		public diffRepeatType:number;
		 /**  持续回合数0表示永久Administrator:如果是战斗开始时被动释放，就需要增加1回合。 */
		public existRound:number;
		 /**  最大层数 */
		public maxLayer:number;
		 /**  Mark（多选；隔开）_emBuffMark1,不可驱散2;//死亡是否不删除3;//死亡可以加 */
		public mark:string;
		 /**  删除条件_emBuffDelCondition1;//被攻击 参数1:次数_概率万分比_次数_概率万分比2;//生效立即删除 */
		public delCondition:string;
		 /**  删除触发_emBuffDelAction1;//源头使用技能 技能ID */
		public delAction:string;
		 /**  buff图标 */
		public icon:string;
		 /**  buff特效id */
		public effectId:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_buff_new.xls】 ----> buff_group   */
class BuffNewBuffGroupCfgInfo
{
		 /**  新加的buff的groupID */
		public newGroup:number;
		 /**  有影响的buff的GroupID */
		public oldGroup:number;
		 /**  互斥类型 1;//丢弃 2;//替换 */
		public repeatType:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_buff_new.xls】 ----> buff_state   */
class BuffNewBuffStateCfgInfo
{
		 /**  新状态 */
		public newState:number;
		 /**  删除老状态 */
		public delOldState:string;
		 /**  互斥状态 */
		public canAdd:string;
		 /**  名称 */
		public name:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_dip.xls】 ----> dip   */
class DipCfgInfo
{
		 /**  名次 */
		public rank:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_champion.xls】 ----> const_info   */
class ChampionConstInfoCfgInfo
{
		 /**  开启周期 */
		public circle:number;
		 /**  开启天数 */
		public circleDays:string;
		 /**  匹配时间 */
		public matchTime:string;
		 /**  开启时间 */
		public openTime:string;
		 /**  需要竞技场排名 */
		public needChallengeRank:number;
		 /**  需要玩家等级 */
		public needPlayerLevel:number;
		 /**  准备时间 */
		public readyTime:number;
		 /**  竞猜时间 */
		public guessTime:number;
		 /**  战斗时长 */
		public fightTime:number;
		 /**  初始赔率 */
		public initOdds:number;
		 /**  初始赔率参数 */
		public initOddsParam:number;
		 /**  最大赔率 */
		public maxOdds:number;
		 /**  最小赔率 */
		public minOdds:number;
		 /**  初始竞猜币 */
		public initGuessCoin:number;
		 /**  弹幕需要道具 */
		public danmuNeedItem:string;
		 /**  奖励预览 */
		public prizePreview:string;
		 /**  弹幕最大条数 */
		public maxDanmuCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_champion.xls】 ----> top_prize   */
class ChampionTopPrizeCfgInfo
{
		 /**  排名（上一排名,此名次] */
		public rank:number;
		 /**  奖励道具 */
		public addItem:string;
		 /**  增加称号ID */
		public addTitle:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_champion.xls】 ----> round   */
class ChampionRoundCfgInfo
{
		 /**  回合 */
		public roundID:number;
		 /**  名称 */
		public name:string;
		 /**  增加战斗积分 */
		public addFightScore:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_horcrux.xls】 ----> const   */
class HorcruxConstCfgInfo
{
		 /**  可觉醒星级 */
		public awakeStar:number;
		 /**  30级后升级所需星级 */
		public continueStar:string;
		 /**  新技能等级 */
		public newSkillLevel:number;
		 /**  消耗本体最低等级 */
		public consumeSelfLevel:number;
		 /**  描述对应等级 */
		public desLevel:string;
		 /**  拥有魂器最低星级 */
		public minBeginStar:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_horcrux.xls】 ----> horcrux   */
class HorcruxCfgInfo
{
		 /**  携带物ID */
		public iD:number;
		 /**  携带物名 */
		public name:string;
		 /**  所属精灵 */
		public petID:number;
		 /**  效果描述文本1 */
		public effectDesc1:string;
		 /**  效果描述文本2 */
		public effectDesc2:string;
		 /**  效果描述文本3 */
		public effectDesc3:string;
		 /**  效果描述文本4 */
		public effectDesc4:string;
		 /**  背景文案 */
		public backGround:string;
		 /**  美术图标 */
		public icon:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_horcrux.xls】 ----> horcrux_prop   */
class HorcruxPropCfgInfo
{
		 /**  携带物ID */
		public iD:number;
		 /**  等级 */
		public level:number;
		 /**  强化所需材料_数量 */
		public materials:string;
		 /**  精灵本体ID_星级_数量 */
		public petSelf:string;
		 /**  获取道具 */
		public getItem:string;
		 /**  追加属性 */
		public propNum:string;
		 /**  技能 */
		public skill:string;
		 /**  战力 */
		public fightPower:number;
		 /**  携带物评分 */
		public score:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_copymap.xls】 ----> copymap   */
class CopymapCfgInfo
{
		 /**  副本ID */
		public iD:number;
		 /**  副本名称 */
		public name:string;
		 /**  副本类型_emCopymapType */
		public type:number;
		 /**  副本子类型_emCopymapSubType */
		public subType:number;
		 /**  需要玩家战力 */
		public needFightPower:number;
		 /**  需要玩家等级 */
		public needPlayerLevel:number;
		 /**  副本日进入次数 */
		public dailyEnterCount:number;
		 /**  怪物数据Index */
		public monster:number;
		 /**  增加奖励 */
		public addPrize:string;
		 /**  扫荡需要的道具 */
		public sweepNeedItem:string;
		 /**  难易程度 */
		public nayiDu:number;
		 /**  难度序号0代表不显示，否则显示难度+序号 */
		public typeId:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_copymap.xls】 ----> monster_new   */
class CopymapMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_incubate.xls】 ----> const   */
class IncubateConstCfgInfo
{
		 /**  每分钟步数 */
		public minStep:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_incubate.xls】 ----> pet_egg   */
class IncubatePetEggCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  精灵ID */
		public petId:number;
		 /**  精灵星级 */
		public petStar:number;
		 /**  孵蛋价格 */
		public eggPrice:string;
		 /**  需求步数 */
		public needStep:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_incubate.xls】 ----> speed_up   */
class IncubateSpeedUpCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  道具ID */
		public itemID:number;
		 /**  道具类型 */
		public itemType:number;
		 /**  加速参数 */
		public speedUpParam:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_compensate.xls】 ----> mail   */
class CompensateMailCfgInfo
{
		 /**  邮件类型 */
		public mailType:number;
		 /**  有效天数 */
		public expireDay:number;
		 /**  邮件标题 */
		public mailTitle:string;
		 /**  消息展示内容 */
		public content:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_compensate.xls】 ----> pet_compensate   */
class CompensatePetCompensateCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  精灵id */
		public iD:number;
		 /**  星级 */
		public rank:number;
		 /**  返还本体id */
		public addItem:string;
		 /**  返还超级百变怪数量 */
		public itemList:string;
		 /**  重生道具数量 */
		public baseItem:string;
		 /**  进化道具数量 */
		public evolveItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_compensate.xls】 ----> addpet_compensate   */
class CompensateAddpetCompensateCfgInfo
{
		 /**  精灵id */
		public iD:number;
		 /**  进化道具数量 */
		public evolveItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_compensate.xls】 ----> Item_exchange   */
class CompensateItemExchangeCfgInfo
{
		 /**  活动ID */
		public activityID:number;
		 /**  邮件类型 */
		public emailType:number;
		 /**  物品ID */
		public itemID:number;
		 /**  兑换成物品 */
		public toItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_compensate.xls】 ----> player_rank   */
class CompensatePlayerRankCfgInfo
{
		 /**  区服ID */
		public worldID:number;
		 /**  账号ID */
		public accountID:number;
		 /**  角色ID */
		public playerID:number;
		 /**  初始战力值 */
		public powValue:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_weal.xls】 ----> signin   */
class WealSigninCfgInfo
{
		 /**  月份(0表示通用) */
		public month:number;
		 /**  天数 */
		public day:number;
		 /**  奖励道具 */
		public addItem:string;
		 /**  流光特效 */
		public eff:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_weal.xls】 ----> clickgold   */
class WealClickgoldCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  最大次数 */
		public maxTimes:number;
		 /**  消耗 */
		public needItem:string;
		 /**  获得金币公式参数1+参数2*(当前关卡-1）/3参数1_参数2 */
		public addGoldBase:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_weal.xls】 ----> online_prize   */
class WealOnlinePrizeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  解锁时间（在线的秒数） */
		public time:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_weal.xls】 ----> gift   */
class WealGiftCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  消耗 */
		public needItem:string;
		 /**  奖励 */
		public addItem:string;
		 /**  循环周期天数 */
		public cycleDays:number;
		 /**  循环索引 */
		public cycleIndex:number;
		 /**  重置周期天数 */
		public resetDays:number;
		 /**  限购个数 */
		public count:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_weal.xls】 ----> resource_findback   */
class WealResourceFindbackCfgInfo
{
		 /**  资源找回玩法ID:EnmResourceID */
		public iD:number;
		 /**  活动名字 */
		public desName:string;
		 /**  免费折扣 */
		public discount:number;
		 /**  扣除钻石 */
		public subItem:number;
		 /**  计算方式 */
		public flag:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity_custom.xls】 ----> In   */
class ActivityCustomInCfgInfo
{
		 /**  入口id */
		public inId:number;
		 /**  活动id */
		public activityId:number;
		 /**  界面位置类型1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标4：//顶部第三排图标5：//顶部展开气泡图标6：//小游戏气泡图标大于6时，主界面不显示 */
		public mainPositionType:number;
		 /**  开启界面(问程序) */
		public openMediator:string;
		 /**  主界面图标配置图标位置和名称 */
		public mainIcon:string;
		 /**  uiPanel地址(问程序,简单的资源修改直接Mediator处理，复杂的才需要新建多个uiPanel，不涉及多个uiPanel的可以不配) */
		public uIPanel:string;
		 /**  特效类型ui_timeLimitActBtn  //一键牛逼特效circle //转圈特效 */
		public mainEff:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_item.xls】 ----> item   */
class ItemCfgInfo
{
		 /**  索引 */
		public id:number;
		 /**  名字 */
		public name:string;
		 /**  描述 */
		public desc:string;
		 /**  作用 */
		public desc2:string;
		 /**  类型 */
		public desc3:string;
		 /**  背包类型_emBagType */
		public bagType:number;
		 /**  物品大类_emItemType */
		public type:number;
		 /**  物品子类型装备类型1：  1;//武器  2;//护甲  3;//鞋子  4;//头盔星石类型2：  1;//星辰符文  2;//月亮符文  3;//太阳符文  4;//彩虹符文  5;//闪烁符文英雄类型3：  1;//伙伴ID  2;//伙伴种族  3;//随机任意  4;//升星材料任意英雄  5;//升星材料指定英雄6：碎片随机池，配置方案为：组权重_组ID；组权重_组ID；神装类型5：  1;//耳环  2;//项链  3;//戒指  4;//手镯特权类型6：  特权卡ID（cs_privilege-card-CardID）   */
		public subType:number;
		 /**  使用类型_emItemUseType */
		public useType:number;
		 /**  每日使用次数 */
		public maxDayUseCount:number;
		 /**  每周使用次数 */
		public maxWeekUseCount:number;
		 /**  每月使用次数 */
		public maxMonthUseCount:number;
		 /**  永久使用次数 */
		public maxForeverUseCount:number;
		 /**  掩码_emItemMark */
		public mark:string;
		 /**  是否自动使用0 //不提示不使用；1 //弹出提示且20s倒计时自动使用；2 //弹出提示但不自动使用；默认0 */
		public smart_use:number;
		 /**  物品等级 */
		public level:number;
		 /**  物品星数 */
		public starNum:number;
		 /**  最大堆叠数量 默认为0，表示无限叠加 */
		public maxCount:number;
		 /**  品质 _emItemQualityType */
		public quality:number;
		 /**  闪光特效 */
		public flash:number;
		 /**  商店回收价格(0标示不能回收) */
		public sellPrice:string;
		 /**  CD(时间ms) */
		public cD:number;
		 /**  有效时间(秒) */
		public expireTime:number;
		 /**  合成的ID道具表示ID伙伴表示ID/种族 */
		public compoundID:number;
		 /**  使用参数 */
		public useParam:string;
		 /**  购买价格全额价格钻石 */
		public buyNeedDiamond:number;
		 /**  评分 */
		public addScore:number;
		 /**  属性点类型|值;类型|值;类型:_emBattleAttribute */
		public addAttri:string;
		 /**   物品获取途径，对应uiconfig */
		public getway:string;
		 /**  使用跳转途径 */
		public useWay:number;
		 /**  图标名称 */
		public iconName:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_item.xls】 ----> pack   */
class ItemPackCfgInfo
{
		 /**  编号  */
		public id:number;
		 /**  名字 */
		public name:string;
		 /**  礼包类型_1_emItemPackType */
		public type:number;
		 /**  参数道具id_道具个数_概率万分比_职业； */
		public param:string;
		 /**  参数2仅礼包类型5生效填drop id */
		public param2:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_item.xls】 ----> compound   */
class ItemCompoundCfgInfo
{
		 /**  道具ID */
		public itemID:number;
		 /**  需要道具消耗道具ID_数量; */
		public needItemExpend:string;
		 /**  需要道具道具ID_数量; */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_item.xls】 ----> petcount_compound   */
class ItemPetcountCompoundCfgInfo
{
		 /**  星级 */
		public petStar:number;
		 /**  需要碎片个数 */
		public needItemCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_item.xls】 ----> pettype_rand   */
class ItemPettypeRandCfgInfo
{
		 /**  种族 */
		public petType:number;
		 /**  概率 */
		public rate:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_item.xls】 ----> petid_rand   */
class ItemPetidRandCfgInfo
{
		 /**  种族 */
		public petType:number;
		 /**  星级 */
		public petStar:number;
		 /**  概率 */
		public rate:number;
		 /**  伙伴ID */
		public petID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_item.xls】 ----> pet_split   */
class ItemPetSplitCfgInfo
{
		 /**  星级 */
		public petStar:number;
		 /**  增加道具道具ID_数量; */
		public addItem:string;
		 /**  碎片增加道具道具ID_数量; */
		public pieceAddItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_item.xls】 ----> equip_suit   */
class ItemEquipSuitCfgInfo
{
		 /**  装备等级 */
		public equipLevel:number;
		 /**  2件加属性属性类型|属性值|属性万分比 */
		public addAttr2:string;
		 /**  3件加属性 */
		public addAttr3:string;
		 /**  4件加属性 */
		public addAttr4:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_item.xls】 ----> gift_pack   */
class ItemGiftPackCfgInfo
{
		 /**  索引 */
		public id:number;
		 /**  礼包对应的道具ID */
		public itemID:number;
		 /**  礼包类型 */
		public bagType:number;
		 /**  参数 */
		public param:number;
		 /**  道具组列表 */
		public itemGroup:string;
		 /**  获得道具组数量 */
		public awardNum:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【c_helpSprite.xls】 ----> helpSprite   */
class HelpSpriteCfgInfo
{
		 /**  id索引 */
		public id:number;
		 /**  1 终生提示一次；   2 单次登陆提示一次；   3 单日提示一次；   4 循环提示（每次随机都参与）；   5 条件触发（触发就提示）；    */
		public noticeType:number;
		 /**  小人动作 */
		public roleAction:string;
		 /**  气泡文本 */
		public noticTxt:string;
		 /**  语音 */
		public sound:string;
		 /**  点击小人之后执行什么操作1.打开某个ui */
		public actionType:string;
		 /**  点击之后执行动作的参数actionType为1的配置uiconfig里uiopen的id */
		public actionParm:string;
		 /**  开启条件类型1 玩家等级≥参数；   2 玩家累积充值额度≥参数；   3 玩家当日充值额度≥参数；   4 玩家主线关卡进度≥参数；   5 玩家钻石数量≥参数；   6 免费抽卡次数≥参数7 公会副本次数≥参数8 背包中有指定道具指定数量≥参数   9 服务器时间   （时间戳）≥参数10 特定充值的当前剩余次数（取charge表）   ≥参数------配置为触发类型时--------1 等级大于 参数1 每参数2等级触发2  关卡进度大于 参数1 每 参数2 关卡触发 */
		public openType:number;
		 /**  开启条件参数 */
		public openParm:number;
		 /**  开启条件补充参数 */
		public openExt:string;
		 /**  关闭条件类型1 玩家等级≥参数；   2 玩家累积充值额度≥参数；   3 玩家当日充值额度≥参数；   4 玩家主线关卡进度≥参数；   5 玩家钻石数量<参数；   6 免费抽卡次数<参数  7 公会副本次数<参数8 背包中有指定道具指定数量<参数9 服务器时间     （时间戳<参数10 特定充值的当前剩余次数（取charge表）   <参数 */
		public closeType:number;
		 /**  关闭条件参数 */
		public closeParm:number;
		 /**  关闭条件补充参数 */
		public closeExt:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【sound.xls】 ----> sound   */
class SoundCfgInfo
{
		 /**  id（音效英文名） */
		public id:string;
		 /**  类型（几首循环播放） */
		public type:number;
		 /**  间隔一段时间再循环（毫秒） */
		public duration:number;
		 /**  音效资源名字（不用填路径） */
		public name:string;
		 /**  是否循环播放 */
		public isLoop:number;
		 /**  背景音效 */
		public isBG:number;
		 /**  音量大小 */
		public volume:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_god_equip.xls】 ----> quality   */
class GodEquipQualityCfgInfo
{
		 /**  品质 */
		public quality:number;
		 /**  随机属性条数 */
		public randAttrCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_god_equip.xls】 ----> refine   */
class GodEquipRefineCfgInfo
{
		 /**  星级 */
		public star:number;
		 /**  需要道具消耗道具ID_数量; */
		public needItem:string;
		 /**  锁定一条消耗 */
		public lockOneNeedItem:string;
		 /**  锁定两条条消耗 */
		public lockTwoNeedItem:string;
		 /**  最大次数 */
		public maxCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_god_equip.xls】 ----> refine_rand   */
class GodEquipRefineRandCfgInfo
{
		 /**  索引 */
		public index:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_god_equip.xls】 ----> randattr   */
class GodEquipRandattrCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  星级 */
		public star:number;
		 /**  部位 */
		public part:number;
		 /**  属性类型 */
		public attrType:number;
		 /**  值区间 */
		public attrValue:string;
		 /**  万分比区间 */
		public attrRate:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_god_equip.xls】 ----> suit   */
class GodEquipSuitCfgInfo
{
		 /**  套装ID */
		public suitID:number;
		 /**  套装名 */
		public suitName:string;
		 /**  类型 */
		public type:number;
		 /**  星级 */
		public star:number;
		 /**  两件属性 */
		public addAttr1:string;
		 /**  四件属性 */
		public addAttr2:string;
		 /**  四件技能技能ID_技能等级 */
		public addSkill:string;
		 /**  是否显示技能图标 */
		public hasSkillIcon:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_god_equip.xls】 ----> suit_mgr   */
class GodEquipSuitMgrCfgInfo
{
		 /**  方案ID */
		public iD:number;
		 /**  方案名 */
		public name:string;
		 /**  需要消耗 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_team_campaign.xls】 ----> stage   */
class TeamCampaignStageCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  关卡 */
		public stage:number;
		 /**  难度 */
		public difficulty:number;
		 /**  奖励道具 */
		public addItem:string;
		 /**  固定位置 */
		public fixedPosition:string;
		 /**  参与条件(条件_参数) */
		public condition:string;
		 /**  怪物特征 */
		public monsterDesc:string;
		 /**  显示形象 */
		public showPetId:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_team_campaign.xls】 ----> formation   */
class TeamCampaignFormationCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  阵容对应位置(1号位;2号位;3号位) */
		public position:string;
		 /**  名称 */
		public name:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_team_campaign.xls】 ----> extra_prize   */
class TeamCampaignExtraPrizeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  类型 */
		public type:number;
		 /**  参数 */
		public param:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_team_campaign.xls】 ----> robot   */
class TeamCampaignRobotCfgInfo
{
		 /**  ID */
		public robotID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_team_campaign.xls】 ----> monster_new   */
class TeamCampaignMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_skin.xls】 ----> petSkin   */
class PetSkinCfgInfo
{
		 /**  皮肤ID */
		public id:number;
		 /**  文件名 */
		public fileName:string;
		 /**  骨骼资源名称 */
		public skelName:string;
		 /**  角色实际高度 */
		public trueHeight:number;
		 /**  是否有例会 */
		public haveVDraw:number;
		 /**  是否新资源 */
		public newRes:number;
		 /**  角色高度偏移值 */
		public detalHeight:number;
		 /**  展示界面缩放比例 */
		public showScale:number;
		 /**  战斗缩放比例 */
		public fightScale:number;
		 /**  初始动作名称 */
		public firstAct:string;
		 /**  技能数据技能ID;技能ID */
		public addSkill:string;
		 /**  图标(106*106) res\Unpack\Icon\Head */
		public iconName:number;
		 /**  全身(180*226) res\Unpack\Icon\card_new */
		public card:number;
		 /**  大全身(644*566) res\Unpack\Icon\BigCard */
		public bigCard:number;
		 /**  皮肤对应的原始精灵ID */
		public petID:number;
		 /**  增加属性类型|值|万分比; */
		public riskAddAttr:string;
		 /**  形象达成条件条件_值_emPreCondition1; //需要皮肤ID3; //需要星级4; //需要玩家等级5; //需要VIP等级 */
		public riskNeedCondition:string;
		 /**  头像激活说明 */
		public headActiveDesc:string;
		 /**  是否在玩家冒险形象中显示 1显示0不显示 */
		public showInPlayerBody:number;
		 /**  是否在玩家头像中显示 1显示0不显示 */
		public showInPlayerHead:number;
		 /**  是否在图鉴中显示 1显示0不显示 */
		public showInIllustration:number;
		 /**  上阵图鉴的bigCard缩放值 */
		public illustrationBigCardScale:number;
		 /**  上阵图鉴的bigCard偏移值 */
		public illustrationBigCardOff:string;
		 /**  上阵图鉴增加的属性 */
		public onIllustrationAttr:string;
		 /**  皮肤星级(展示用) */
		public star:number;
		 /**  加成属性战力值 */
		public fightPower:string;
		 /**  是否不启用精灵 */
		public invalid:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_skin.xls】 ----> s_replaceSkin   */
class PetSkinSReplaceSkinCfgInfo
{
		 /**  精灵ID */
		public petID:number;
		 /**  进化段数 */
		public evolve:number;
		 /**  皮肤ID */
		public skinID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_skin.xls】 ----> s_replaceEvolve   */
class PetSkinSReplaceEvolveCfgInfo
{
		 /**  伙伴ID */
		public petID:number;
		 /**  进化段数 */
		public evolve:number;
		 /**  皮肤ID */
		public skinID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_element.xls】 ----> stage   */
class ElementStageCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  第几周 */
		public week:number;
		 /**  类型_emPetType */
		public type:number;
		 /**  关卡 */
		public stage:number;
		 /**  需要伙伴类型类型_个数 */
		public needPetType:string;
		 /**  需要等级 */
		public needPlayerLevel:number;
		 /**  需要战斗力 */
		public needFightPower:number;
		 /**  Boss序号 */
		public bossIndex:number;
		 /**  圣殿威压技能 */
		public bossSkillId:number;
		 /**  怪物数据 */
		public monster:number;
		 /**  首通奖励 */
		public firstAddItem:string;
		 /**  通关奖励 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_element.xls】 ----> buy_count   */
class ElementBuyCountCfgInfo
{
		 /**  次数 */
		public count:number;
		 /**  需要钻石 */
		public needDiamond:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_element.xls】 ----> opentime   */
class ElementOpentimeCfgInfo
{
		 /**  类型_emPetType */
		public type:number;
		 /**  开启时间 */
		public openTime:string;
		 /**  开启时间提示 */
		public openTimeTips:string;
		 /**  名称 */
		public name:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_element.xls】 ----> monster_new   */
class ElementMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;
		 /**  Boss序号 */
		public bossIndex:number;
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		public monsterInfo:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity_egg.xls】 ----> lucky_egg   */
class ActivityEggLuckyEggCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  活动ID */
		public activityID:number;
		 /**  领取天数（周*） */
		public day:number;
		 /**  奖励 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_activity_constant.xls】 ----> constant   */
class ActivityConstantConstantCfgInfo
{
		 /**  活动ID */
		public activityID:number;
		 /**  推送渠道 */
		public pushChannel:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shop.xls】 ----> fix_shop   */
class ShopFixShopCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  索引 */
		public index:number;
		 /**  商店类型 1; //道具商城 2; //英雄商城 3; //远征商城 4; //竞技商城 5; //公会商城 6; //段位商城 7; //先知商城 8; //跨服天梯9;//神装商城10;//征战商城11;//0元礼包12;//对战塔商店13;//大师塔商店14;//周冠商店99; //特俗商店 */
		public shopType:number;
		 /**  子类型 */
		public subType:number;
		 /**  显示名字 */
		public name:string;
		 /**  销售道具道具ID_道具数量 */
		public sellItem:string;
		 /**  需要vip等级 */
		public needVipLevel:number;
		 /**  日限购次数 */
		public dayBuyCount:number;
		 /**  周限购次数 */
		public weekBuyCount:number;
		 /**  月限购次数 */
		public monthBuyCount:number;
		 /**  刷新限购次数 */
		public limitBuyCount:number;
		 /**  需要道具道具ID_道具数量 */
		public needItem:string;
		 /**  折扣客户端显示用0表示无折扣 */
		public discount:number;
		 /**  通用额外参数 */
		public param:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shop.xls】 ----> currency_type   */
class ShopCurrencyTypeCfgInfo
{
		 /**  商店类型 */
		public shopType:number;
		 /**  货币itemid */
		public currencyId:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shop.xls】 ----> rand_shop   */
class ShopRandShopCfgInfo
{
		 /**  商店类型101; //探宝商城102; //天赋宝石商店103; //喵喵购物车110; //跨服竞技场 */
		public shopType:number;
		 /**  组随机类型 */
		public groupRandType:number;
		 /**  最大免费次数 */
		public freeCount:number;
		 /**  刷新消耗道具道具ID_道具数量 */
		public refreshNeedItem:string;
		 /**  刷新最大次数0无限制 */
		public refreshCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shop.xls】 ----> rand_pool   */
class ShopRandPoolCfgInfo
{
		 /**  唯一索引 */
		public index:number;
		 /**  组ID */
		public groupID:number;
		 /**  等级 */
		public level:string;
		 /**  销售道具道具ID_道具数量 */
		public sellItem:string;
		 /**  需要道具道具ID_道具数量 */
		public needItem:string;
		 /**  总限购次数 */
		public buyCount:number;
		 /**  折扣客户端显示用0表示无折扣 */
		public discount:number;
		 /**  日限购次数 */
		public dayBuyCount:number;
		 /**  周限购次数 */
		public weekBuyCount:number;
		 /**  月限购次数 */
		public monthBuyCount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shop.xls】 ----> level_item   */
class ShopLevelItemCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  组ID */
		public groupID:number;
		 /**  等级 */
		public level:number;
		 /**  销售道具道具ID_道具数量 */
		public sellItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_cross_challenge.xls】 ----> constants   */
class CrossChallengeConstantsCfgInfo
{
		 /**  初始积分 */
		public initScore:number;
		 /**  挑战消耗物品 */
		public needItem:string;
		 /**  开启时间 */
		public openTime:string;
		 /**  膜拜获得物品 */
		public likeAddItem:string;
		 /**  可跳过战斗次数 */
		public sweepNeedCount:number;
		 /**  赛季天数 */
		public seasonDays:number;
		 /**  随机积分差 */
		public randScoreRange:number;
		 /**  随机匹配次数 */
		public randScoreCount:number;
		 /**  战斗奖励个数 */
		public prizeCount:number;
		 /**  名次隐藏队伍 */
		public rankHide:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_cross_challenge.xls】 ----> robot   */
class CrossChallengeRobotCfgInfo
{
		 /**  ID */
		public robotID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_cross_challenge.xls】 ----> daily_prize   */
class CrossChallengeDailyPrizeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  次数 */
		public count:number;
		 /**  奖励物品 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_cross_challenge.xls】 ----> win_prize   */
class CrossChallengeWinPrizeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  概率 */
		public rate:number;
		 /**  奖励物品 */
		public addItem:string;
		 /**  购买需要物品 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_cross_challenge.xls】 ----> lose_prize   */
class CrossChallengeLosePrizeCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  概率 */
		public rate:number;
		 /**  奖励物品 */
		public addItem:string;
		 /**  购买需要物品 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_cross_challenge.xls】 ----> top_prize   */
class CrossChallengeTopPrizeCfgInfo
{
		 /**  排名（上一排名,此名次] */
		public order:number;
		 /**  奖励道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_cross_challenge.xls】 ----> monster_new   */
class CrossChallengeMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_mail.xls】 ----> mail   */
class MailCfgInfo
{
		 /**  邮件类型 */
		public mailType:number;
		 /**  有效天数 */
		public expireDay:number;
		 /**  邮件标题 */
		public mailTitle:string;
		 /**  消息展示内容 */
		public content:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> guard   */
class RiskGuardCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  层数 */
		public stage:number;
		 /**  守卫序号 */
		public guardIndex:number;
		 /**  怪物数据 */
		public monster:number;
		 /**  是否自动开启 */
		public isAutoOpen:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> refresh   */
class RiskRefreshCfgInfo
{
		 /**  类型_emRiskRefreshType */
		public type:number;
		 /**  是否自动拾取 */
		public isAutoCollect:number;
		 /**  需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> shop   */
class RiskShopCfgInfo
{
		 /**  商品索引 */
		public index:number;
		 /**  道具信息 */
		public sellItem:string;
		 /**  价格 */
		public sellPrize:string;
		 /**  折扣 */
		public discount:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> grid_open   */
class RiskGridOpenCfgInfo
{
		 /**  守卫序号 */
		public guardIndex:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> guard_prize   */
class RiskGuardPrizeCfgInfo
{
		 /**  个数 */
		public count:number;
		 /**  增加道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> collect_prize   */
class RiskCollectPrizeCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  层数 */
		public stage:number;
		 /**  增加道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> collect_randprize   */
class RiskCollectRandprizeCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  增加道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> finger_result   */
class RiskFingerResultCfgInfo
{
		 /**  自己类型 */
		public selfType:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> finger_prize   */
class RiskFingerPrizeCfgInfo
{
		 /**  选择类型 */
		public selectType:number;
		 /**  需要道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> question   */
class RiskQuestionCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  题目 */
		public question:string;
		 /**  选项1 */
		public optionA:string;
		 /**  选项2 */
		public optionB:string;
		 /**  选项3 */
		public optionC:string;
		 /**  选项4 */
		public optionD:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> dialog   */
class RiskDialogCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  题目 */
		public question:string;
		 /**  选项1 */
		public option1:string;
		 /**  选项2 */
		public option2:string;
		 /**  选项3 */
		public option3:string;
		 /**  选项1时说的话 */
		public option1Des:string;
		 /**  选项2时说的话 */
		public option2Des:string;
		 /**  选项3时说的话 */
		public option3Des:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> event   */
class RiskEventCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  对方类型 */
		public targetType:number;
		 /**  题目 */
		public question:string;
		 /**  选项1扣除消耗 */
		public needExpend:string;
		 /**  选项1 */
		public option1:string;
		 /**  选项2 */
		public option2:string;
		 /**  答案 */
		public result:number;
		 /**  答对时说的话 */
		public trueDes:string;
		 /**  答错时说的话 */
		public faildDes:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> collect_skill   */
class RiskCollectSkillCfgInfo
{
		 /**  概率 */
		public rate:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_risk.xls】 ----> monster_new   */
class RiskMonsterNewCfgInfo
{
		 /**  关卡Index */
		public index:number;
		 /**  怪物们(位置_PetID_等级_阶级_星级;) */
		public monsterInfo:string;
		 /**  附加属性值(属性|值|百分比_属性|值|百分比;)分号留空表示这个怪物没有附加属性 */
		public attribute:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shape.xls】 ----> title   */
class ShapeTitleCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  持续时（秒）0表示永久 */
		public continueTime:number;
		 /**  是否自动激活 */
		public autoActive:number;
		 /**  增加属性类型|值|万分比; */
		public addAttr:string;
		 /**  来源模块 */
		public gameSystemType:number;
		 /**  描述 */
		public describe:string;
		 /**  图片名 */
		public iconName:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shape.xls】 ----> province   */
class ShapeProvinceCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  省市 */
		public provinceID:number;
		 /**  省市名称 */
		public proveinceName:string;
		 /**  城市ID */
		public cityID:number;
		 /**  城市名称 */
		public cityName:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shape.xls】 ----> headIcon   */
class ShapeHeadIconCfgInfo
{
		 /**  ID */
		public iD:number;
		 /**  名称 */
		public name:string;
		 /**  所需道具id */
		public needItem:number;
		 /**  骨骼名 */
		public aniName:string;
		 /**  是否显示骨骼动画 */
		public showAni:number;
		 /**  持续时（秒）0表示永久 */
		public continueTime:number;
		 /**  激活说明 */
		public activeDesc:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shape.xls】 ----> pet_skin   */
class ShapePetSkinCfgInfo
{
		 /**  皮肤ID */
		public iD:number;
		 /**  所属伙伴ID */
		public petID:number;
		 /**  资源名 */
		public resource:string;
		 /**  增加属性类型|值|万分比; */
		public addAttr:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shape.xls】 ----> badge   */
class ShapeBadgeCfgInfo
{
		 /**  徽章ID */
		public iD:number;
		 /**  类型_emBadgeType */
		public type:number;
		 /**  增加荣誉点数 */
		public addHonor:string;
		 /**  名称 */
		public name:string;
		 /**  激活说明 */
		public activeDesc:string;
		 /**  描述 */
		public desc:string;
		 /**  图标 */
		public iconName:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_shape.xls】 ----> honor_upgrade   */
class ShapeHonorUpgradeCfgInfo
{
		 /**  荣誉等级 */
		public level:number;
		 /**  总经验 */
		public maxExp:number;
		 /**  荣誉名字 */
		public name:string;
		 /**  图标名称(对应Icon/Honor目录下文件) */
		public iconName:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_call.xls】 ----> call   */
class PetCallCallCfgInfo
{
		 /**  抽卡类型 */
		public callType:number;
		 /**  名称 */
		public name:string;
		 /**  描述 */
		public desc:string;
		 /**  需要VIP等级 */
		public needVipLevel:number;
		 /**  免费重置时间时间:分 */
		public freeResetTime:string;
		 /**  首次必出五星次数 */
		public firstContinueCount:number;
		 /**  必出五星次数 */
		public continueCount:number;
		 /**  增加道具 */
		public addItem:string;
		 /**  星级概率概率_星级; */
		public starRate:string;
		 /**  种族概率概率_种族; */
		public typeRate:string;
		 /**  随机四星以下种族概率概率_种族; */
		public specialTypeRate:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_call.xls】 ----> call_cost   */
class PetCallCallCostCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  类型 */
		public type:number;
		 /**  次数 */
		public count:number;
		 /**  消耗道具 */
		public needItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_call.xls】 ----> common_pool   */
class PetCallCommonPoolCfgInfo
{
		 /**  星级 */
		public petStar:number;
		 /**  种族 */
		public petType:number;
		 /**  概率 */
		public rate:number;
		 /**  伙伴ID */
		public petID:number;
		 /**  得分 */
		public petScore:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_call.xls】 ----> call_pool   */
class PetCallCallPoolCfgInfo
{
		 /**  索引 */
		public index:number;
		 /**  召唤类型 */
		public callType:number;
		 /**  概率 */
		public rate:number;
		 /**  增加道具 */
		public addItem:string;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_call.xls】 ----> change   */
class PetCallChangeCfgInfo
{
		 /**  星级 */
		public petStar:number;
		 /**  限制类型 */
		public needPetType:string;
		 /**  消耗道具 */
		public needItem:string;
		 /**  库ID */
		public randID:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_call.xls】 ----> fix_change   */
class PetCallFixChangeCfgInfo
{
		 /**  类型 */
		public type:number;
		 /**  精灵ID */
		public petID:number;
		 /**  最低等级 */
		public minLevel:number;
		 /**  最高等级 */
		public maxLevel:number;
		 /**  最低星级 */
		public minStar:number;
		 /**  最高星级 */
		public maxStar:number;
		 /**  最低进化 */
		public minEvolve:number;
		 /**  最高进化 */
		public maxEvolve:number;
		 /**  最低进阶 */
		public minAdvance:number;
		 /**  最高进阶 */
		public maxAdvance:number;
		 /**  消耗道具 */
		public removeItems:string;
		 /**  转换后精灵ID */
		public toPetID:number;
		 /**  控制标识 */
		public flag:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_call.xls】 ----> change_pool   */
class PetCallChangePoolCfgInfo
{
		 /**  伙伴种族 */
		public petType:number;

}
 

/**
* 
*  根据 excel 配置 文件自动生成的代码
*	
* 【**不可手动修改此类**】
*	
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
*
* @author liuyang.AutoCreater
* 
*/	

/**   【cs_pet_call.xls】 ----> specail_pool   */
class PetCallSpecailPoolCfgInfo
{
		 /**  召唤类型 */
		public callType:number;

}
 
}