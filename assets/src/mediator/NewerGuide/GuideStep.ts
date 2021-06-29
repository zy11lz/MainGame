
module Pro
{
    export enum GuideState
    {
        Forbid = 9999999
    }
	/*
    * 引导状态
    * -1为已经删除的步骤，避免以后加回来 先留着
    */
    export enum GuideStep
    {
        /** 进入游戏-剧情对话1 */
        Plot_1_1 = 101,
        /** 进入游戏-剧情对话2 */
        Plot_1_2,
        /** 进入游戏-剧情对话3 */
        Plot_1_3 = GuideState.Forbid,

        /** 角色命名 */
        Rename_2_1 = 201,
        /** 角色命名-对话*/
        Rename_2_2,
        /** 角色命名-对话*/
        Rename_2_3 = GuideState.Forbid,

        /** 第一次召唤-引导入口 */
        NormalCall_3_1 = 301,
        /** 第一次召唤 - 引导高级召唤*/
        NormalCall_3_5,
        /** 第一次召唤 - 引导关闭稀有窗口*/
        NormalCall_3_6,
        /** 第一次召唤 - 再次点弹窗确定 */
        NormalCall_3_7,

        /** 第一次召唤 - 引导普通召唤按钮*/
        NormalCall_3_2 = GuideState.Forbid,
        /** 第一次召唤 - 弹窗后点确定*/
        NormalCall_3_3 = GuideState.Forbid,
        /** 第一次召唤 - 对话*/
        NormalCall_3_4 = GuideState.Forbid,

        /** 第一次战斗-引导出击按钮 */
        FirstFight_4_1 = 401,
        /** 第一次战斗 - 引导挑战BOSS按钮 */
        FirstFight_4_2,
        /** 第一次战斗 - 英雄上阵 皮卡丘 */
        FirstFight_4_3,
        /** 第一次战斗 - 开战 */
        FirstFight_4_4,
        /** 第一次战斗-战斗中 */
        FirstFight_4_5,
        /** 战斗升级后引导关闭升级界面 */
        FirstFight_4_6,

        /** 通关奖励-剧情对话 */
        StageReward_5_1 = 501,
        /** 通关奖励-引导出击按钮 */
        StageReward_5_2,
        /** 通关奖励-通关奖励按钮 */
        StageReward_5_3,
        /** 通关奖励 - 引导列表中的领奖按钮 */
        StageReward_5_4,
        /** 通关奖励 - 引导关闭奖励列表 */
        StageReward_5_5,
        /** 通关奖励 - 对话 */
        StageReward_5_6,

        /** 合成英雄-引导背包入口 */
        BagCombinHero_6_1 = 601,
        /** 合成英雄-引导碎片背包分页 */
        BagCombinHero_6_2,
        /** 合成英雄-背包格子 */
        BagCombinHero_6_3,
        /** 合成英雄-合成按钮 */
        BagCombinHero_6_4,
        /** 合成英雄 - 稀有英雄展示 */
        BagCombinHero_6_5,
        /** 合成英雄 - 奖励列表关闭 */
        BagCombinHero_6_6,
        /** 合成英雄 - 对话 */
        BagCombinHero_6_7,


        /** 英雄升级-引导主UI英雄按钮 */
        HeroUpgrade_7_1 = 701,
        /** 英雄升级-引导英雄列表1号位英雄 */
        HeroUpgrade_7_2,
        /** 英雄升级-引导升级按钮  */
        HeroUpgrade_7_3,
        /** 英雄升级(连续引导两次升级按钮) */
        HeroUpgrade_7_4,
        /** 英雄升级-引导一键装备 */
        HeroUpgrade_7_5,
        /** 英雄升级-对话 */
        HeroUpgrade_7_6,

        /** 第二次战斗-引导出击按钮 */
        SecondFight_8_1 = 801,
        /** 第二次战斗 - 挑战BOSS */
        SecondFight_8_2,
        /** 第二次战斗 - 可达鸭上阵 */
        SecondFight_8_3,
        /** 第二次战斗-引导开战 */
        SecondFight_8_11,
        /** 第二次战斗-战斗中 */
        SecondFight_8_12,
        /** 第二次战斗 - 对话1 */
        SecondFight_8_4 = GuideState.Forbid,
        /** 第二次战斗-引导种族克制按钮 */
        SecondFight_8_5 = GuideState.Forbid,
        /** 第二次战斗-深蓝之力 */
        SecondFight_8_6 = GuideState.Forbid,
        /** 第二次战斗-对话2 */
        SecondFight_8_7 = GuideState.Forbid,
        /** 第二次战斗-对话3 */
        SecondFight_8_8 = GuideState.Forbid,
        /** 第二次战斗-种族克制亮起 */
        SecondFight_8_9 = GuideState.Forbid,
        /** 第二次战斗-点空白处关闭 */
        SecondFight_8_10 = GuideState.Forbid,

        /** 精灵商店-对话 */
        SecretShop_9_1 = 901,
        /** 精灵商店-引导主城按钮 */
        SecretShop_9_3,
        /** 精灵商店-精灵商店入口按钮 */
        SecretShop_9_4,
        /** 精灵商店-购买 */
        SecretShop_9_5,
        /** 精灵商店-对话 */
        SecretShop_9_2 = GuideState.Forbid,

        /** 第二次高级召唤-对话1*/
        HigherCall_10_1 = 1001,
        /** 第二次高级召唤-判断主城显示，引导主城按钮*/
        HigherCall_10_3,
        /** 第二次高级召唤 - 引导英雄广场*/
        HigherCall_10_4,
        /** 第二次高级召唤 - 引导高级召唤*/
        HigherCall_10_5,
        /** 第二次高级召唤 - 关闭立绘展示界面 */
        HigherCall_10_6,
        /** 第二次高级召唤 - 关闭英雄列表奖励界面 */
        HigherCall_10_7,
        /** 高级召唤-对话2*/
        HigherCall_10_2 = GuideState.Forbid,

        /** 第3次作战-引导出击*/
        ThirdFight_11_1 = 1101,
        /** 第3次作战-引导挑战BOSS*/
        ThirdFight_11_2,
        /** 第3次作战-妙蛙种子上阵*/
        ThirdFight_11_3,
        /** 第3次作战-开战*/
        ThirdFight_11_4,
        /** 第3次作战-战斗中 */
        ThirdFight_11_5,
        /** 第3次作战后升级弹窗 */
        ThirdFight_11_6,

        /** 挂机收益-引导出击 */
        HookReward_12_1 = 1201,
        /** 挂机收益-剧情对话 */
        HookReward_12_2 = 1202,
        /** 挂机收益-点击领取挂机收益 */
        HookReward_12_3,
        /** 挂机收益 - 关闭奖励弹窗  */
        HookReward_12_4,
        /** 挂机收益-剧情对话2 */
        HookReward_12_5,

        /** 快速作战-引导出击*/
        QuickFight_13_1 = 1301,
        /** 快速作战 - 点击快速作战按钮*/
        QuickFight_13_2,
        /** 快速作战 - 点击界面内快速战斗按钮*/
        QuickFight_13_3,
        /** 快速作战 - 引导关闭奖励弹窗*/
        QuickFight_13_4,
        /** 快速作战 - 引导关闭升级弹窗*/
        QuickFight_13_5,

        /** 变强指引-剧情对话 */
        HeroStrength_14_1 = 1401,
        /** 变强指引-引导出击 */
        HeroStrength_14_2,
        /** 变强指引-引导英雄变强 */
        HeroStrength_14_3,
        /** 变强指引-引导前往按钮  */
        HeroStrength_14_4,
        /** 变强指引-引导英雄升级按钮 */
        HeroStrength_14_5,
        /** 变强指引(重复引导升级按钮) */
        HeroStrength_14_6,
        /** 变强指引 -剧情对话*/
        HeroStrength_14_7,
        /** 变强指引暂停，等待玩家退出英雄界面 */
        HeroStrength_14_8,

        /** 第4次战斗 - 剧情对话*/
        FourFight_15_1 = 1501,
        /** 第4次战斗 - 引导主UI出击按钮*/
        FourFight_15_2,
        /** 第4次战斗 - 引导挑战BOSS*/
        FourFight_15_3,
        /** 第4次战斗 - 开战 */
        FourFight_15_4,
        /** 第4次战斗-战斗中*/
        FourFight_15_5,

        /** 神器出战引导-对话1 */
        Artifact_16_1 = 1601,
        /** 神器激活出战引导-元灵总入口 */
        Artifact_16_3,
        // /** 神器激活出战引导-引导激活 */
        Artifact_16_4,
        /** 神器激活出战引导-引导去探险 */
        Artifact_16_5,
        /** 神器出战引导-引导挑战BOSS按钮 */
        Artifact_16_6,
        /** 神器出战引导-布阵界面引导选择神器 */
        Artifact_16_7,
        /** 神器出战引导-引导装配 */
        Artifact_16_8,
        /** 神器出战引导-引导开战按钮 */
        Artifact_16_9,
        /** 第5次战斗-战斗中- 这一步要指引一下战斗里面的元灵珠*/
        Artifact_16_10,
        /** 第5次战斗-战斗中暂停引导*/
        Artifact_16_11,
        /** 第5次战斗结束后升级提示*/
        Artifact_16_12,
        /** 神器出战引导-对话2 */
        Artifact_16_2 = GuideState.Forbid,

        /** 神器任务引导-引导左上角元灵入口图标 */
        ArtifactTask_17_1 = 1701,
        /** 神器任务引导 - 引导任务领奖(这一步需要判断元灵奖励是否领过，如果领过，则往后跳两步) */
        ArtifactTask_17_2,
        /** 神器任务引导 - 引导任务跳转*/
        ArtifactTask_17_4,
        /** 神器任务引导 - 引导挑战*/
        ArtifactTask_17_5,
        /** 神器任务引导 - 引导关闭奖励提示 */
        ArtifactTask_17_3 = GuideState.Forbid,

        /** 神器任务后续引导 - 进挂机界面(此处只需要检查有没有在挂机分页即可，要注意与前面步骤的衔接) */
        ArtifactTask_18_1 = 1801,
        /** 神器任务后续引导 - 玩家自由操作，直到挂机战斗结束*/
        ArtifactTask_18_2,
        /** 神器任务后续引导 - 再进挂机界面 */
        ArtifactTask_18_3,
        /** 神器任务后续引导 - 引导挑战BOSS(这里有一个不一样的文字提示) */
        ArtifactTask_18_4,

        /** 前期新手引导步骤的最大值，同时也是与功能引导的一个分界 */
        NoviceMax,

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        //从这里开始是功能引导的部分
        /** 竞技场引导 */
        Func_Challenge_1 = 5001,
        /** 竞技场引导-引导切换主城 */
        Func_Challenge_2,
        /** 竞技场引导-主城中竞技场入口按钮 */
        Func_Challenge_3,
        /** 竞技场引导-挑战 */
        Func_Challenge_4,

        /** 首充 */
        Func_FirstPay_1 = 5101,
        /** 首充-对话2 */
        Func_FirstPay_2,
        /** 首充-弹出界面 */
        Func_FirstPay_3,

        /** 寻宝 - 对话 */
        Func_Sail_1 = 5201,
        /** 寻宝-进挂机界面 */
        Func_Sail_2,
        /** 寻宝-引导入口按钮 */
        Func_Sail_3,
        /** 寻宝-刷新按钮 */
        Func_Sail_4,
        /** 寻宝-接取按钮 */
        Func_Sail_5,
        /** 寻宝-一键派遣 */
        Func_Sail_6,
        /** 寻宝-派出 */
        Func_Sail_7,
        /** 寻宝-引导加速 */
        Func_Sail_8,

        /** 日常副本 */
        Func_FightDaily_1 = 5301,
        /** 日常副本-指引入口 */
        Func_FightDaily_2,
        /** 日常副本-2级入口 */
        Func_FightDaily_3,
        /** 日常副本-挑战 */
        Func_FightDaily_4,


        /** 试炼塔 */
        Func_StarTower_1 = 5401,
        /** 试炼塔-对话2 */
        Func_StarTower_2,
        /** 试炼塔-引导进主城 */
        Func_StarTower_3,
        /** 试炼塔-主城入口按钮 */
        Func_StarTower_4,
        /** 试炼塔-第1层 */
        Func_StarTower_5 = GuideState.Forbid,
        /** 试炼塔-挑战 */
        Func_StarTower_6 = GuideState.Forbid,

        /** 公会 */
        Func_Faction_1 = 5501,
        /** 公会-公会按钮 */
        Func_Faction_2,
        /** 公会-再次对话提示 */
        Func_Faction_3,

        /** 无尽试炼 */
        Func_EndlessTower_1 = 5601,
        /** 无尽试炼-主界面入口 */
        Func_EndlessTower_2,
        /** 无尽试炼-2级入口 */
        Func_EndlessTower_3,
        /** 无尽试炼-主界面上“好友助阵” */
        Func_EndlessTower_4,
        /** 无尽试炼-好友助阵界面dialog */
        Func_EndlessTower_5,
        /** 无尽试炼-引导雇佣好友英雄 */
        Func_EndlessTower_6,
        /** 无尽试炼-引导关闭好友助阵 */
        Func_EndlessTower_7,
        /** 无尽试炼-回到主界面引导挑战按钮 */
        Func_EndlessTower_8,
        /** 无尽试炼-打开布阵界面后，弹出dialog */
        Func_EndlessTower_9,
        /** 无尽试炼-继续dialog */
        Func_EndlessTower_10,

        /** 远征 */
        Func_Expedition_1 = 5701,
        /** 远征-主界面入口 */
        Func_Expedition_2,
        /** 远征-2级入口 */
        Func_Expedition_3,
        /** 远征-难度选择 */
        Func_Expedition_4,
        /** 远征-第1关 */
        Func_Expedition_5,
        /** 远征-战斗前布阵对话 */
        Func_Expedition_6,

        /** 星河神殿 */
        Func_Temple_1 = 5801,
        /** 星河神殿-主界面入口 */
        Func_Temple_2,
        /** 星河神殿-2级入口 */
        Func_Temple_3,
        /** 星河神殿-对话 */
        Func_Temple_4,

        /** 神界冒险 */
        Func_Risk_1 = 5901,
        /** 神界冒险-切换主城 */
        Func_Risk_2,
        /** 神界冒险-引导主城内入口 */
        Func_Risk_3,
        /** 神界冒险-二级入口 */
        Func_Risk_4,
        /** 神界冒险-打开英雄选择后弹对话 */
        Func_Risk_5,

        /** 首次获得5星英雄后引导布阵 */
        Func_Pet5StarEmbattle_1 = GuideState.Forbid,
        /** 首次获得5星英雄后引导布阵-引导英雄按钮 */
        Func_Pet5StarEmbattle_2 = GuideState.Forbid,
        /** 首次获得5星英雄后引导布阵-引导布阵按钮 */
        Func_Pet5StarEmbattle_3 = GuideState.Forbid,

        /** 七日登陆引导-切换主城 */
        Func_7DayAct_1 = 6101,
        /** 七日登陆引导-引导活动按钮 */
        Func_7DayAct_2,
        /** 七日登陆引导-引导领奖 */
        Func_7DayAct_3,
        /** 七日登陆引导-领奖弹窗关闭 */
        Func_7DayAct_4,
        /** 七日登陆引导-对话 */
        Func_7DayAct_5,
        /** 七日登陆引导-关闭 */
        Func_7DayAct_6,
        /** 七日登陆引导-第二个界面，此处暂停，等待关闭 */
        Func_7DayAct_7,
        /** 7日登陆引导后升级英雄-对话  */
        Func_7DayActUpPet_1 = 6108,
        /** 7日登陆引导后升级英雄 - 主UI上英雄按钮 */
        Func_7DayActUpPet_2,
        /** 7日登陆引导后升级英雄 - 引导英雄头像 */
        Func_7DayActUpPet_3,
        /** 7日登陆引导后升级英雄 - 引导长按升级按钮 */
        Func_7DayActUpPet_4,
        /** 7日登陆引导后升级英雄 - 引导进阶 */
        Func_7DayActUpPet_5,
        /** 7日登陆引导后升级英雄 - 进阶界面引导进阶按钮 */
        Func_7DayActUpPet_6,
        /** 7日登陆引导后升级英雄 - 引导关闭突破成功 */
        Func_7DayActUpPet_7,
        /** 7日登陆引导后升级英雄 - 引导关闭新技能提示 */
        Func_7DayActUpPet_8,
        /** 7日登陆引导后升级英雄 - 引导出击按钮 */
        Func_7DayActUpPet_9,

        /** 签到引导-对话 */
        Func_SignIn_1 = GuideState.Forbid,
        /** 签到引导-切换主城 */
        Func_SignIn_2 = GuideState.Forbid,
        /** 签到引导-引导活动按钮 */
        Func_SignIn_3 = GuideState.Forbid,
        /** 签到引导-引导签到 */
        Func_SignIn_4 = GuideState.Forbid,
        /** 签到引导-引导关闭奖励提示 */
        Func_SignIn_5 = GuideState.Forbid,
        /** 签到引导-引导出击 */
        Func_SignIn_6 = GuideState.Forbid,

        /** 点金引导 - 对话 */
        Func_ClickGold_1 = 6301,
        /** 点金引导 - 引导点金入口按钮 */
        Func_ClickGold_2,
        /** 点金引导 - 引导免费获取按钮 */
        Func_ClickGold_3,

        /** 七日目标 - 引导进主城 */
        Func_7DayTarget_1 = 6401,
        /** 七日目标 - 入口按钮 */
        Func_7DayTarget_2,
        /** 七日目标 - 切换剧情分页 */
        Func_7DayTarget_3,
        /** 七日目标 - 领取第1个任务奖励 */
        Func_7DayTarget_4,
        /** 七日目标 - 关闭奖励界面 */
        Func_7DayTarget_5,
        /** 七日目标 - 暂停等玩家随意操作七日目标界面 */
        Func_7DayTarget_6,

        /** 铁匠铺 - 引导主城 */
        Func_EquipCombin_1 = 6501,
        /** 铁匠铺 - 引导入口 */
        Func_EquipCombin_2,
        /** 铁匠铺 - 引导合成*/
        Func_EquipCombin_3,

        //元灵法阵引导（很后期的，所有元灵全激活时的一次引导）
        /** 元灵法阵引导-  点击元灵界面上法阵入口按钮 */
        Func_ArtifactAll_1 = 6601,
        // /** 元灵法阵引导- 弹出法阵界面（对话+保留显示法阵的奖励界面） */
        // Func_ArtifactAll_2,
        // /** 元灵法阵引导-切换界面 */
        // Func_ArtifactAll_3,

        /** 组队征战 - 对话 */
        Func_TeamCampaign_1 = 6701,
        /** 组队征战 - 历练按钮 */
        Func_TeamCampaign_2,
        /** 组队征战 - 玩法列表中入口  */
        Func_TeamCampaign_3,
        /** 组队征战 - 点击开始挑战 */
        Func_TeamCampaign_4,

        /** 升星引导-升星分页按钮 */
        Func_HeroUpStar_1 = 6801,
        /** 升星引导-引导第一个材料英雄图标 */
        Func_HeroUpStar_2,
        /** 升星引导-引导第二个材料英雄图标 */
        Func_HeroUpStar_3,
        /** 升星引导-引导重生按钮 */
        Func_HeroUpStar_4,


        /**战败引导-点击变强小助手 */
        Func_Fail_1 = 6901,
        /**点击“精灵等级”的【前往】按钮*/
        Func_Fail_2,
        /**点击升级按钮，只点击1次 */
        Func_Fail_3,

        /**第10关通关时 点击挂机页面*/
        Stage_Success_10 = 7901,
        /**第10关通关时 打开通关奖励界面*/
        Stage_Success_11 = 7902,
        ////////////////////////////////////////////
        //简单的指引，无详细的引导步骤。
        Simply_Guide_Start = 100000,
        /** 指引战斗二倍速度 */
        Simply_BattleSpeed,
        /** 间歇性的引导挑战BOSS按钮 */
        Simply_HookFightBoss,
        /**间歇性的引导关卡按钮 */
        Simply_HookBtn,

    }
}