
module Pro
{
    /**
     * 阵法数据管理
     */
    export var EmbattleDataMgr: Net.EmbattleBaseMgr;

    /**
     * 聊天管理器
     */
    export var ChatDataMgr: Net.ChatBaseMgr;

    /**
     * 穿戴管理器
     */
    export var SuitEquipDataMgr: Net.SuitEquipBaseMgr;

    /**
     * 登陆管理器
     */
    export var LoginServerMgr: Net.LoginServerBaseMgr;

    export class ServerDataReg
    {
        constructor()
        {

        }

        public static setup(): void
        {
            EmbattleDataMgr = new Net.EmbattleBaseMgr();
            ChatDataMgr = new Net.ChatBaseMgr();
            SuitEquipDataMgr = new Net.SuitEquipBaseMgr();
            LoginServerMgr = new Net.LoginServerBaseMgr();
        }
    }
}