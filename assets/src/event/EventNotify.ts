module Pro
{
    /*
    * 日常事件
    */
    export enum EventNotify
    {
        /** 第一个 */
        First = 200,

        /**TTF字体加载完成 */
        TTF,

        //--------------------------------基础状态------------------------------
        /** 平台类型变更 */
        PlatformInfo_Change,

        /** 服务器向客户端发送关服事件(服务器维护)**/
        Connect_Server_Close_Prev,

        /** 链接服务器状态 */
        Connect_Server_Close,

        /** 逻辑报错 */
        ServerLogicError,

        /** 屏幕尺寸被改变 */
        Screen_Resize,

        /** 游戏暂停 */
        PauseGame,

        /** 游戏恢复 */
        ResumeGame,

        /**  舞台获得焦点时调度 */
        StageFocus,

        /**  舞台失去焦点时调度 */
        StageBlur,

        //--------------------------------场景切换------------------------------
        /** 屏幕尺寸被改变 */
        Open_Main,

        /** 打开战场 */
        Open_Battle,

        /** 战斗结束 */
        Battle_Result,
        /** 战斗结束，关闭战斗结算界面 */
        Battle_Result_Close,
        /** 玩家主动关闭战斗  */
        Battle_SelfExit,
        /** 战斗播放结束,回收战斗PlaceMgr(通知其它持有PlaceMgr的该放手了) */
        Battle_RecoverPlace,
        /** 是否跳过大招 */
        Battle_Skin_Skill2,

        /** 打开登陆界面 */
        Open_Login,

        /** 打开loading界面 */
        LoadingUI_Open,

        /** 关闭loading界面(可能延迟关闭了)*/
        LoadingUI_Close,

        /** loading真的关闭了*/
        // LoadingUI_Close_True,

        /** 有UI打开或关闭状态 */
        UI_Show_Change,

        /** 通用奖励界面关闭时（在某些特定的界面在领奖后需要做一些后续工作） */
        NormalAwardUIClose,

        //--------------------------------登陆状态------------------------------
        /** 收到登陆消息 */
        ReciverLoginData,

        /** 握手完成 */
        HandShakeLater,

        /** 登陆失败 */
        LoginFail,

        /** 登陆成功 */
        AccountLoginSucceed,

        /* 进入游戏 */
        // EnterGame,

        /* 更改服务器选择成功 */
        Change_ServerSel_Succeed,
        //--------------------------------账号操作------------------------------
        /* 更改密码成功 */
        // Change_Psw_Succeed,

        // /* 更改密码失败 */
        // Change_Psw_Failed,

        // /* 绑定密码成功 */
        // Bind_Email_Succeed,

        // /* 绑定密码失败 */
        // Bind_Email_Failed,


        //--------------------------------新手引导------------------------------
        /** 激活新手引导 */
        Guide_Active,
        /** 进入当前引导 */
        Guide_Enter,

        //--------------------------------货币信息------------------------------
        /** 玩家货币或道具个数发生变化 */
        PlayerItemNumChange,
        /** 英雄碎片背包个数发生变化 */
        PetPieceNumChange,
        /** 装备背包个数发生变化 */
        BagEquipNumChange,
        /**  神装背包个数发生变化 */
        BagGodEquipNumChange,
        /**  符文个数发生变化 */
        BagRuneNumChange,
        /** 刷新当前玩家所有道具信息 */
        RefreshAllItemNum,
        /** 切换状态栏UI显示 */
        PlayerChangeResUI,

        /** 神装套装管理格子变更 */
        GodequipSuitMgr_Update,

        //-------------------------------日常数据------------------------------
        /** 世界等级有变化 */
        WorldLevel_Change,
        /** 玩家等级变化 */
        PlayerLevelChange,
        /** 玩家战斗力变化 */
        PlayerFightPowerChange,
        /** 系统功能开放 */
        System_Switch_Open_Update,
        /** 从道具途径中开启了跳转 */
        ItemAccess_Jump_Change,
        /** 玩家点击了当天重复操作记录的数据（比如点了今日不再提示） */
        Op_TodayRepleat,
        /** 通用简单奖励状态变化 */
        CommonPrizeState_Change,

        //--------------------------------场景角色信息变更-----------------------
        /** 主角英雄在挂机场景中移动 */
        City_MRole_Moving,

        /** 主角挂机场景击杀怪物 */
        City_MRole_HookKill,

        //--------------------------------战斗场景信息变更-----------------------
        /** 回到主界面*/
        Scene_BACK_MAINUI,

        /** 战斗状态刷新 */
        Battle_Statue_Refresh,
        /** 战斗回合切换 */
        Battle_Round_Change,
        /**元灵技能播放完 */
        Battle_YuanLing_Complete,

        //----------------------------------主城-----------------------------------
        /** 控制主城(0)、挂机场景(1)的显示，(-1)表示都不显示 */
        Zhucheng_Hook_Visible_Changed,

        /** 底部功能菜单栏切换(按钮按顺序0->6) */
        MainUI_BottomFun_Changed,

        //----------------------------------VIP--------------------------------
        VIP_Exp_Changed,
        VIP_Level_Changed,

        /** 充值界面内部跳转分页 */
        Pay_UIPage_change,

        //----------------------------------任务系统--------------------------------
        /** 成就列表更新 */
        Achieve_Update,
        /**活动成就刷新 */
        Achieve_Activity_Update,
        /**战令成就刷新 */
        Achieve_WarOrder_Update,

        /** 远航数据变更 */
        Sail_Changed,

        //---------------------------------聊天系统---------------------------------
        /** 收到聊天信息 */
        Chat_Message_New,

        /**撤回 */
        Chat_Message_ReCall,

        //---------------------------------邮件系统-----------------------------------
        /** 邮件改变 */
        Mail_Changed,

        //---------------------------------阵法系统-----------------------------------
        /** 阵型切换 */
        Embattle_Zhenxing_Changed,
        /** 阵型保存 */
        Embattle_Save,

        /** 神器切换 */
        Embattle_Artifact_Changed,
        /** 神器替换 */
        Embattle_Artifact_Exchanged,

        //---------------------------------特权-------------------------------------
        /** 领取每日奖励 */
        Privilege_Daily_Prize,
        /** 特权卡变化 */
        Privilege_Card_Change,

        //---------------------------------商城系统-----------------------------------
        /** 单个通用商品购买次数变更(事件参数：类型,index, 数量) */
        Shop_BuyCount_changed,
        /** 单个固定商城商品购买次数变更（仅更新固定商城数据，参数：固定商城商品唯一id） */
        Shop_FixBuyCount_changed,
        /** 普通商城重置购买次数 */
        Shop_Reset,
        /** 随机商店数据变更 */
        Shop_Refresh,
        /** 随机商店次数变化（相对简单） */
        Shop_RefreshCount_Change,

        //---------------------------------好友系统-----------------------------------
        /** 好友列表更新 */
        Friend_FriendList_Update,
        /** 申请列表更新 */
        Friend_Apply_Update,
        /** 黑名单更新 */
        Friend_Blacklist_Update,
        /** 增加黑名单 */
        Friend_Blacklist_Add,
        /** 删除好友 */
        Friend_Delete,
        /** 单个好友数据更新 */
        Friend_Single_Update,
        /** 可领取的礼物列表更新 */
        Friend_RecievePrize_Update,

        //-------------------------------- 形象系统（个人空间，头像，称号 形象等）---------------------------------
        /** 基础信息变更 */
        Shape_Base_Update,


        //---------------------------------神器系统-----------------------------------
        /** 神器选择 */
        Artifact_SelectedChanged,

        /** 神器集齐了 */
        Artifact_ActiveAll,
        /** 法阵升级属性传递 */
        Artifact_Upgrade,

        /** 神器解锁 */
        Artifact_Unlock,

        //---------------------------------宠物系统------------------------------------
        /** 宠物数据变更 */
        Pet_Changed,

        /** 宠物状态变化*/
        Pet_State_Chg,

        /** 英雄属性变更 */
        Pet_AttrChange,

        /** 英雄战斗力变更 */
        Pet_FightPowerChange,

        /** 宠物星级变更 */
        Pet_Star_Changed,

        /** 关闭召唤大图标显示 */
        Pet_BigShow_Close,

        /** 英雄材料选择完成(选择的英雄sn列表， 选择的材料道具列表， 附加参数带回) */
        Pet_Materia_Selected,

        //---------------------------------装备系统--------------------------------
        /** 装备变更 */
        Equip_Changed,

        /** 英雄魂器等级变更 */
        Horcrux_Changed,

        //--------------------------------副本系统-------------------------------------
        /** 挂机场景数据变化 */
        Fight_Hook_Changed,

        //-------------------------------红点------------------------------

        /** 聊天红点 */
        RedDot_Chat_Changed,

        //--------------------------------竞技场---------------------------------
        /** 排名变化 */
        Challenge_Order_Change,
        /** 积分变化 */
        Challenge_Score_Change,
        /** 周次数宝箱领取进度变化 */
        Challenge_WeekPrize_Change,
        /** 挑战目标变化 */
        Challenge_Target_Update,
        /** 进入次数更新 */
        Challenge_EnterCount_Change,

        //--------------------------------冠军赛---------------------------------
        /** 冠军赛界面内操作查看某个对阵信息 */
        Champion_ShowFightInfo,
        /** 冠军赛竞猜币数量变更 */
        Champion_GuessCoin_Change,
        /** 自己发送一个弹幕 */
        Champion_AddSelfBarrage,
        /** 状态变化 */
        Champion_StateChange,

        //--------------------------------周冠军赛---------------------------------
        /** 冠军赛界面内操作查看某个对阵信息 */
        WeekChampion_ShowFightInfo,
        /** 冠军赛竞猜币数量变更 */
        WeekChampion_GuessCoin_Change,
        /** 自己发送一个弹幕 */
        WeekChampion_AddSelfBarrage,
        /** 状态变化 */
        WeekChampion_StateChange,
        /** 倒计时 */
        WeekChampion_ShowTimeView,

        //---------------------------------帮会----------------------------------
        /** 帮会变更(退出或创建) */
        Faction_Change,
        /** 帮会基本信息变更 */
        Faction_DisplayUpdate,
        /** 公会职务变化 */
        Faction_JobTypeChange,
        /** 公会申请列表变化 */
        Faction_ApplyList_Update,
        /** 公会技能升级 */
        Faction_Skill_Update,

        //---------------------------------神界冒险----------------------------------
        /** 神界冒险-出战列表中，选中的英雄变更 */
        Risk_Hero_Change,
        /** 击杀守卫个数 领奖数量变化 */
        Risk_KillGuardReward_Change,
        /** 基础数量信息变化（包括层数，药水数量等， 视图逻辑相对简单，所以统一处理了） */
        Risk_BaseChange_Change,
        /** 刷新单个格子数据 */
        Risk_SingleGrid_Update,
        /** 刷新所有格子数据 */
        Risk_AllGrid_Update,

        //---------------------超凡段位赛--------------------------
        /** 修改查看赛事传奇的赛区 */
        Dan_ShowHistroyAreaId_Change,


        //---------------------组队副本--------------------------
        /** 队伍信息变更 */
        Team_Changed,

        //---------------------锻造------------------------------
        /** 选择完符文 */
        ItemCombin_Rune_Choice,

        //--------------------活动------------------------------
        /**活动领奖 */
        Activity_DrawReward,
        /**活动刷新 */
        Activity_Update,
        /**活动开启时间刷新 */
        Activity_OpenTime_Update,
        /** 关闭活动 */
        Activity_Close,
        /**短期礼包活动刷新 */
        Activity_ShortTimeUpdate,
        /**充值返利活动状态刷新 */
        Activity_RebateStateUpdate,
        /** 7天目标活动日期刷新 */
        Activity_AchiveOpenDayChange,
        //--------------------天界副本------------------------------
        /** 选中章节关卡 */
        Heaven_SelectChapterStage,
        /** 章节奖励领取完成 */
        Heaven_DrawChapterReward,
        /** 章节关卡数据刷新 */
        Heaven_ChpaterStageUpdate,
        /** 神像数据刷新 */
        Heaven_StatueUpdate,
        /** 章节BOSS关卡第二波 */
        Heaven_StageFightAgain,
        /** 购买挑战次数完成 */
        Heaven_BuyCount,
        //--------------------世界地图------------------------------
        /** 关闭世界地图 */
        WorldMap_Close,

        /** 问卷调查答题进度 */
        Question_Change,

        /** 龙珠等级变更 */
        DragonBall_LevelChange,
        /** 元素契约等级变更 */
        Convenant_LevelChange,

        //--------------------动画奖励----------------------------
        /** 奖励动画 */
        Award_Effect_Fly,
        /**显示gm */
        show_gm,

        //--------------------自动挑战-----------------------

        /**显示关卡气泡 */
        Show_HookBtn_Pop,



        //----------------------冠军之路自动挑战----------------

        /**倒计时 */
        Endless_Auto_CD,

        /**自动挑战状态变化 */
        Endless_Auto_State_Change,

        //- -------------------遗迹之谷自动挑战------------------------

        /**遗迹之谷 */
        TeamCampaign_Auto_CD,

        TeamCampaign_Auto_State_Change,

        //---------------------狩猎地带自动挑战---------------------

        Expedition_Auto_CD,

        Expedition_Auto_State_Change,

        //---------------抽卡分享

        Show_Hero_Call_Share_Pop,

        //----------用户协议----------------
        User_Agreement,

        //--------------每日限购------------
        /**每日限购跨天 */
        DayLimitBuy_ResetNewDay,

        //---------------冲榜活动跳转页签
        RankActivity_Title,

        //-----------------胡帕选择
        HuPa_Materia_Selected,

        //---------红包
        /** 刷新红包显示 */
        RedEnvelope_Update,

        //------------定制礼包选择
        DiyGift_Selected,

        /** 微信畅想支付状态刷新 */
        wx_cs_pay_stat_Update,
        /** 测试隐藏ui */
        test_hide_ui,

        /**共鸣卸下 */
        Resonance_down,

        /**进阶战令红点刷新 */
        WarOrderRed_Update,

        /**放置后自动选中这个精灵 */
        Resonance_Select,

        /**血量变更 */
        AtkerHpChange,
    }
}