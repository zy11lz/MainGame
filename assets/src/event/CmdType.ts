
module Pro
{
    /*
     * 服务端协议
     */
    export class CmdType
    {

        /** 主协议号 */
        public main: number;
        /** 子协议号 */
        public sub: number;
        /** 消息解析结构体，对应PbGod的Class */
        public pb: any;
        /** 接受服务端消息号 */
        public cmdName: string;
        /** 接受服务端逻辑处理完后，UI监听消息号 */
        public eventName: string;
        /** 自定义 */
        public key: string;
        public isSend: boolean;

        constructor(name: string, main: number, sub: number, isSend: boolean, pb: any = null)
        {
            this.cmdName = name;
            this.main = main;
            this.sub = sub;
            this.pb = pb;
            this.isSend = isSend;
            this.key = main + "_" + sub + "_" + isSend;
            this.eventName = name.replace("S2C_", "");
            this.eventName = this.eventName.replace("C2S_", "");
        }
    }
}