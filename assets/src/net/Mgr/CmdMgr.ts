/**
 *  服务器消息管理
 * @author liuyang
 */
module Pro
{

    export class CmdMgr
    {

        private static _blockLogMsg: Object = {
            "255_4": 1,
            "255_1": 1,
            "3_16": 1,
            "33_5": 1,
            "33_8": 1
        };
        constructor(cmd)
        {

        }


        /**
         */
        public static setup(isBigPackage: boolean = false): void
        {
            Public.SocketManager.Init();
            Public.SocketManager.GameSocket.isBigPackage = isBigPackage;
            Public.SocketManager.GameSocket.on(Public.CommonEvent.SOCKECT_MESSAGE, this, this.onSocketMessage);
        }

        /** 统一发送接口 */
        public static pushCmd(cmd: CmdType, param?: any)
        {
            let buffer;
            if (cmd.pb != null && param == null)
            {
                logI(cmd.cmdName + " 未传参数");
                return;
            }
            if (cmd.pb != null)
            {
                buffer = cmd.pb.encode(param).finish();
            } else
            {
                buffer = new Uint8Array(0);
            }
            Public.SocketManager.sendGameServerMsg(buffer.byteLength, cmd.main, cmd.sub, buffer);
            MinConsoleMgr.Inst.savePb(cmd, param);
            if (!GlobalData.isRelease && GlobalData.isPringNetMsg)
            {
                if (!CmdMgr._blockLogMsg.hasOwnProperty(cmd.main + "_" + cmd.sub))
                {
                    logI("        发送消息: --> ", cmd.cmdName, param)
                    // eslint-disable-next-line
                    console.log(param);
                }
            }
        }

        private static onSocketMessage(mess: Public.MessageInfo)
        {
            var cmdType: CmdType = this.getCmd(mess.main, mess.sub, false);
            if (cmdType == null)
            {
                logE("未知的消息不处理，main:" + mess.main + " ,sub" + mess.sub);
                return;
            }
            if (cmdType == Cmd.S2C_Player_BagInfo)
            {
                let a = 1;
            }

            let pb = cmdType.pb;
            //消息处理出现正常的逻辑错误
            if (mess.eventFlag != 0)
            {
                //错误提醒 S2C_Operate_Kick_Notify _emResultNet_255
                logW("返回错误码:mainPro=" + cmdType.cmdName, "eventFlag=" + mess.eventFlag, "提示玩家");
                MinConsoleMgr.Inst.savePb(cmdType, { "eventFlag": mess.eventFlag });

                //通知错误状态
                let tmpError = new Public.ServerError();
                tmpError.mainPro = mess.main;
                tmpError.sonPro = mess.sub;
                tmpError.eventFlag = mess.eventFlag;
                tmpError.serverNoId = cmdType.cmdName;
                EventMgr.trigger(EventNotify.ServerLogicError, tmpError);
            }


            //特殊包处理
            if (cmdType.cmdName == Cmd.S2C_Operate_Login_Ack.cmdName)
            {
                if (LoginServerMgr.isLoginSuccess)
                {
                    pb = Pb_God.PBG2CLoginAck;
                } else
                {
                    pb = Pb_God.PBLoginAck;
                }
            }
            else if (cmdType.cmdName == Cmd.S2C_Operate_Disconnect.cmdName ||
                cmdType.cmdName == Cmd.S2C_Operate_Kick_Notify.cmdName)//收到T下线的消息
            {
                Public.SocketManager.GameSocket.closeServer(Public.ServerStatue.Kick, false);
            }

            if (mess.eventFlag == 0)
            {
                let tempClass = Public.SocketManager.getMsgDecodeCmd(pb, mess.data);
                if (!GlobalData.isRelease && GlobalData.isPringNetMsg)
                {
                    if (!CmdMgr._blockLogMsg.hasOwnProperty(mess.main + "_" + mess.sub))
                    {
                        // eslint-disable-next-line
                        // console.log("socket 数据", tempClass)
                    }
                }
                if (!GlobalData.isRelease && GlobalData.isPringNetMsg)
                {
                    if (!CmdMgr._blockLogMsg.hasOwnProperty(mess.main + "_" + mess.sub))
                    {
                        // logI("收到消息: <-- " + cmdType.cmdName + " main:" + mess.main + " ,sub:" + mess.sub);
                        // eslint-disable-next-line no-console
                        console.log("收到消息: <-- " + cmdType.cmdName + " main:" + mess.main + " ,sub:" + mess.sub, tempClass);
                    }
                }
                if (cmdType.cmdName == Cmd.S2C_Platform_sanqi_charge.cmdName)
                {
                    try
                    {
                        var ch: Pb_God.PBChargeData = tempClass;
                        if (ch.orderno == "" || ch.orderno == null)
                        {
                            var logMsg: string = "充值异常999， byteLen:" + mess.data.length + "------> messContent: " + JSON.stringify(ch);
                            GameLaunch.PostClientLog(logMsg)
                        }
                    } catch (error)
                    {
                        GameLaunch.PostClientLog("充值异常上报出错");
                    }
                }
                MinConsoleMgr.Inst.savePb(cmdType, tempClass);
                EventMgr.trigger(cmdType.cmdName, tempClass, cmdType.cmdName);
                EventMgr.trigger(cmdType.eventName, tempClass, cmdType.cmdName);
            }
        }

        public static getCmd(main: number, sub: number, isSend: boolean): CmdType
        {
            return this.getCmdByKey(main + "_" + sub + "_" + isSend);
        }

        public static getCmdByKey(key: string): CmdType
        {
            return Cmd.cmdDic[key];
        }


    }
}