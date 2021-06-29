/*
* name;
*/
module Pro
{
    export class TimeController
    {


        private static _ins: TimeController;

        public static get ins(): TimeController
        {
            if (this._ins == null)
            {
                this._ins = new TimeController();
            }
            return this._ins;
        }


        /** 服务器开服时间 */
        private _worldCreateTime: number = 0;
        private _worldCreateZeroTime: number = 0;


        /**服务器合并时间 */
        private _worldMergeTime: number = 0;
        private _worldMergeZeroTime: number = 0;


        /** 获取服务器开服时间(毫秒)(注意此方法返回值可能不是当天零点，如果有需要获取0点时间的，可使用worldCreateZeroTime) */
        public static get worldCreateTime(): number
        {
            return this.ins._worldCreateTime;
        }
        /** 获取服务器开服当天0点的时间(毫秒) */
        public static get worldCreateZeroTime(): number
        {
            return this.ins._worldCreateZeroTime;
        }

        /** 获取服务器合服时间(毫秒)(注意此方法返回值可能不是当天零点，如果有需要获取0点时间的，可使用worldMergeZeroTime) */
        public static get worldMergeTime(): number
        {
            return this.ins._worldMergeTime;
        }
        /** 获取服务器合服当天0点的时间(毫秒) */
        public static get worldMergeZeroTime(): number
        {
            return this.ins._worldMergeZeroTime;
        }


        ///////////////////////
        /** 当前心跳包的序号 */
        private _pingTickOrder = 0;
        /** 发出心跳包的客户端时间 */
        private _sendClientTime = 0;
        /** 服务器时间与客户端时间的差值 */
        private _timeDiff = 0;

        /** 心跳包频率（毫秒）（间隔n秒发送一次心跳） */
        private PINT_FREQUENCY = 30 * 1000;
        /** 超时检测等待时间 （毫秒） */
        private WAIT_TIME = 10000;
        /** 超时计数最大次数（连续超时达到此次数时，认定网络已经断开，可以执行重连操作） */
        private TIMEOUT_MAX_COUNT = 3;
        /** 超时响应计数 */
        private _timeoutErrorTick = 0;

        constructor()
        {
            // this.clientStartStamp = Laya.timer.currTimer;
            Public.TimeMgr.Inst.setup(new CallBack(this, this.getCurrTimer))
        }

        /** 外部纠正当前时间 */
        public setCurServerTime(curServerTime: number): void
        {
            this._timeDiff = curServerTime - Laya.timer.currTimer + 50;
        }

        /** 启动心跳 */
        public setup(info: Pb_God.PBLoginAck): void
        {
            this._worldCreateTime = NumberUtils.longToNumber(info.worldCreateTime) * 1000;
            this._worldMergeTime = NumberUtils.longToNumber(info.worldMergeTime) * 1000;
            //转换开服当天0点
            let time = this._worldCreateTime;
            let date = new Date(time);
            date.setHours(0, 0, 0, 1);  //若做海外版本，此处需处理时区问题， tag:jason
            this._worldCreateZeroTime = date.getTime();

            time = this._worldMergeTime;
            date = new Date(time);
            date.setHours(0, 0, 0, 1);
            this._worldMergeZeroTime = date.getTime();

            this.syncServerTime();
        }

        /** 发起一次心跳 */
        public syncServerTime()
        {
            if (NetMonitorMgr.Inst.state != 1) { return; } //网络不正常
            // this.serverSynlTimes = 0;
            this._sendClientTime = getTimer();
            this._pingTickOrder++;
            OperateSend.ping_Ask(this._pingTickOrder);
            if (GlobalData.isPringNetMsg)
            {
                // logI("---> ping", this._pingTickOrder);
            }
            //超时等待
            Laya.timer.once(this.WAIT_TIME, this, this.onTimeoutError);
        }

        /*****
         * Ping应答	PingAck
         * @param PingAck
         * 		order			uint32	 序号
         * 		systemTick			uint64	 系统启动毫秒
         * 		systemTime			uint32	 系统时间
         */
        public onSyncTime(tempClass: Pb_God.PingAck)
        {
            if (GlobalData.isPringNetMsg)
            {
                // logI("<--- ping应答", tempClass.order, Laya.timer.currTimer - this._sendClientTime);
            }
            if (tempClass.order != this._pingTickOrder)
            {
                MinConsoleMgr.log("pingTickOrder error!", tempClass.order, this._pingTickOrder);
                return;
            }
            //当前客户端时间
            let curClientTime = Laya.timer.currTimer;
            //网络延时（需要显示网络延时图标的，可以取此值, 单位毫秒）
            let networdDelay = curClientTime - this._sendClientTime;
            //当前服务器时间
            let curServerTime = tempClass.systemTime * 1000 - (networdDelay >> 1);
            let timeDiff = curServerTime - curClientTime;
            this._timeDiff = timeDiff;


            this._timeoutErrorTick = 0;
            Laya.timer.clear(this, this.onTimeoutError); //清理超时等待

            //超时太多时，紧凑一点再发一次，可能是前面客户端休眠了
            let gapTime = networdDelay > 10000 ? 1000 : this.PINT_FREQUENCY;
            Laya.timer.once(gapTime, this, this.syncServerTime);
        }

        /** 超时 */
        private onTimeoutError(): void
        {
            this._timeoutErrorTick++;
            Laya.timer.clear(this, this.syncServerTime);
            //网络已经断开了，就无需理会了， 耐心等待网络重连即可。
            if (NetMonitorMgr.Inst.state != 1)
            {
                return;
            } //网络不正常
            if (this._timeoutErrorTick >= this.TIMEOUT_MAX_COUNT)
            {
                //超时次数太多，可能是socket已经无效了， 此处可能需要手动将socket断开并执行重连操作
                logE("!!! requestServerTime timeout reconnect network");
                // NetMonitorMgr.Inst.closeServerStatue(true); //主动断开当前连接，尝试重新连接
                this._timeoutErrorTick = 0;
            } else
            {
                logE("!!! requestServerTime timeout tick : " + this._timeoutErrorTick);
                Laya.timer.once(100, this, this.syncServerTime); //超时后，重新请求
            }
        }

        /**
         * 获取当前时间 毫秒
         */
        public get currTimer()
        {
            return Laya.timer.currTimer + this._timeDiff;
        }

        /**
        * 获取当前时间 毫秒
        */
        public getCurrTimer()
        {
            return this.currTimer;
        }

        /**
        * 获取当前时间 毫秒
        */
        public static get currTimer(): number
        {
            if (this._ins)
            {
                return this._ins.currTimer;
            }
            return Laya.timer.currTimer;
        }
        public static get currTimerSecond(): number
        {
            return (TimeController.currTimer * 0.001) << 0;
        }

        /**
         * 检测是不是敏感时期 不准随意发言
         */
        public static checkIsNotAllowSayAnything()
        {
            let d = new Date(this.currTimer);

            let year = d.getFullYear();

            let lastD = new Date();
            lastD.setFullYear(year, 5, 3);
            lastD.setHours(20, 0, 0, 0);

            let nextD = new Date();
            nextD.setFullYear(year, 5, 5);
            nextD.setHours(22, 0, 0, 0);

            if (this.currTimer >= lastD.getTime() && this.currTimer <= nextD.getTime())
            {
                return true;
            }
            return false;
        }
    }
}