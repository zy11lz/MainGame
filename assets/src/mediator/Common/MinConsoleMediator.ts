module Pro
{
    /** 内嵌到游戏内的小型控制台
     * 在屏蔽任意位置划出“少战”的笔划即可打开控制台窗口
     */
    export class MinConsoleMgr
    {

        GMFlag1 = false;
        GMFlag2 = false;

        private static _inst: MinConsoleMgr;
        public static get Inst(): MinConsoleMgr
        {
            if (MinConsoleMgr._inst == null)
            {
                MinConsoleMgr._inst = new MinConsoleMgr();
            }
            return MinConsoleMgr._inst;
        }

        /** 记录一些客户端监视日志 */
        public static log(...args): void
        {
            logD(...args);
            MinConsoleMgr.Inst.log(...args);
        }
        constructor() { }

        // private _handles = [2, 3, 4, 3, 2, 1, 2, 2, 1, 1, 4, 3, 4, 2, 3, 1]; //少战
        private _handles = [2, 4, 1, 1, 1, 2, 1, 3, 1, 4, 4]; //日志
        private _index = 0;
        private _handLen = 0;
        private _startPosX = 0;
        private _startPosY = 0;
        private _logs: string[] = [];
        private log(...args): void
        {
            this._logs.push(this.parseTimer(getTimer()) + ": " + args.join("####"));
            if (this._logs.length > 50) { this._logs.splice(0, 20); }
        }
        public getLogs(): string[]
        {
            return this._logs;
        }

        /** 毫秒时间戳转字符串 */
        public parseTimer(time: number): string
        {
            let date: Date = new Date(time);
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            let msecond = date.getMilliseconds();

            // 补零
            let strHour = Global.ToFitZero(hour, 2);
            let strMinute = Global.ToFitZero(minute, 2);
            let strSecond = Global.ToFitZero(second, 2);
            let strMSecond = Global.ToFitZero(msecond, 3);

            return Global.FormatString("{0}:{1}:{2}:{3}", strHour, strMinute, strSecond, strMSecond);
        }

        private _savePb: any[] = [];
        /** 记录最后10条网络消息，便于查看数据 */
        public savePb(cmdType: CmdType, pbdata:/*Public.MessageInfo*/any): void
        {
            //去掉ping的
            if (cmdType.cmdName == Cmd.S2C_Operate_Ping_Ack.cmdName || cmdType.cmdName == Cmd.C2S_Operate_Ping_Ask.cmdName) { return; }
            this._savePb.unshift([getTimer(), cmdType, pbdata]);
            if (this._savePb.length > 20) { this._savePb.splice(10, this._savePb.length - 10); }
        }
        public getSavePb(): any[]
        {
            return this._savePb;
        }
        public init(): void
        {
            this._handLen = this._handles.length;
            EventMgr.on(Public.CommonEvent.TRY_ERROR, this, this.log);
        }

        /**
         * 注入监听
         */
        public initEvent()
        {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onStart);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onEnd);
        }

        private onStart(e: Laya.Event)
        {
            this._startPosX = e.stageX;
            this._startPosY = e.stageY;
        }


        private onEnd(e: Laya.Event)
        {
            let endPosX = e.stageX;
            let endPosY = e.stageY;
            if (this.__checkHandle(endPosX, endPosY, this._index)) { return; }
            this._index = 0;
            this.__checkHandle(endPosX, endPosY, this._index);
        }

        private __checkHandle(endPosX, endPosY, index)
        {
            let ret = false;
            let hand = this._handles[index];
            switch (hand)
            {
                case 1:
                    ret = endPosX > this._startPosX;
                    break;
                case 2:
                    ret = endPosY > this._startPosY;
                    break;
                case 3:
                    ret = (endPosY > this._startPosY) && (endPosX < this._startPosX);
                    break;
                case 4:
                    ret = (endPosY > this._startPosY) && (endPosX > this._startPosX);
                    break;
            }
            // logI('ret:' + ret + '=' + this._index);
            if (ret)
            {
                this._index++;

                if (this._index == this._handLen - 1) { TipsUtils.showTips("好的"); }
                if (this._index >= this._handLen)
                { //complete
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_MinConsole));
                    this._index = 0;
                }
            }
            return ret;
        }
    }
    /**
     * 界面说明： 内嵌到游戏内的小型控制台
    * @author jason.xu
    */
    export class MinConsoleMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Common.MinConsoleUI;
        private RETURN_STR = "\r\n";
        private DEPTH_GAP = "    ";

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('mask')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.MinConsoleUI, 0, BaseAddLayer.RootUI);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //纵向滚动
            this.UIPanel.panel.vScrollBarSkin = null;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.showContent("输入1：打印最新的通信数据\n输入2：打印最新的log（前提是调用了MinConsole.log的）");
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnEnter.onClick(this, this.onClickEnter);
            this.UIPanel.btnLast.onClick(this, this.onClickLast);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        private onClickLast(): void
        {
            this.UIPanel.input.text = this._lastCmd;
        }

        /** 记录上一次发出的内容 */
        private _lastCmd = "";
        private onClickEnter(): void
        {
            let str = this.UIPanel.input.text;
            if (!str) { return; }
            this._lastCmd = str;
            this.UIPanel.input.text = "";
            if (str == "1")
            {
                this.showPBSave();
                return;
            } else if (str == "2")
            {
                this.showLog();
                return;
            } else if (str == "3")
            {
                EventMgr.trigger(EventNotify.show_gm);
                return;
            }
            this.showContent("");
            let data = "";
            try
            {
                data = this.__eval(str);
            } catch (err)
            {
                data = err;
            }
            let strOut = this.parseData(data, 0, 4);
            if (strOut.length > 8000)
            { //手机上显示不了这么长的字符，好尴尬
                strOut = "数据太长，终端显示不完整，仅显示一级属性：" + this.RETURN_STR +
                    this.parseData(data, 0, 1);
            }
            this.showContent(str + "\r\n ===>\r\n" + strOut);
        }

        private showPBSave(): void
        {
            let showList = [];
            for (var el of MinConsoleMgr.Inst.getSavePb())
            {
                let elArr = el as any[];
                let obj = { time: MinConsoleMgr.Inst.parseTimer(elArr[0]), cmdType: elArr[1].cmdName, data: elArr[2] };
                showList.push(JSON.stringify(obj, (key: string, value: any) =>
                {
                    if (typeof (value) == "object" && (value instanceof window["Long"])) { return "Long:" + value; }
                    return value;
                }, "  "));
            }
            // let strOut = this.parseData(showList, 0, 10);
            let strOut = showList.join("\n#########################\n");
            this.showContent(strOut);
        }
        private showLog(): void
        {
            this.showContent(MinConsoleMgr.Inst.getLogs().join("\n=========================\n"));
        }

        private showContent(str: string): void
        {
            this.UIPanel.txtContent.text = str;
            this.UIPanel.boxContent.height = this.UIPanel.txtContent.height;
        }

        private __eval(str): string
        {
            if (eval) { return eval(str); }
            //有些小程序环境下不支持eval
            // str = str.replace(/\s+/g, "");
            // str = str.replace("[\"", ".");
            // str = str.replace("\"]", "");
            // str = str.replace("['", ".");
            // str = str.replace("']", "");

            // let strArr = str.split(";");
            // let isMul = false;
            // let ret = [];
            // for (let i = 0; i < strArr.length; i++) {
            //     const element = strArr[i];
            //     let single = this.__evalSingle(element)
            //     if (i > 0 && single != null) isMul = true;
            //     ret[i] = single;
            // }
            // return isMul ? ret : ret[0];

        }

        // private __evalSingle(str): any {
        //     if (!str) return null;
        //     let strArr = str.split(".");
        //     let obj = Laya.Browser.window;
        //     let element;
        //     for (let i = 0; i < strArr.length; i++) {
        //         if (strArr[i] && element && !obj) return "eval param Error: " + element; //前一个出错
        //         element = strArr[i];
        //         if (!element) return "eval Error: " + str; //断掉
        //         //function
        //         let funIndex = element.indexOf("(");
        //         if (funIndex > 0) {
        //             let funName = element.slice(0, funIndex);
        //             let fun = obj[funName];
        //             if (!fun) return "eval Error: no function " + funName; //断掉
        //             let endIndex = element.indexOf(")");
        //             if (endIndex <= funIndex + 1) obj = fun.call(obj); //空参数
        //             else {
        //                 let params = element.slice(funIndex + 1, endIndex - funIndex - 1).split(".");
        //                 for (let j = 0; j < params.length; j++) {
        //                     const strParam = params[j];
        //                     params[j] = this.__getFunParam(strParam);
        //                 }
        //                 obj = fun.apply(obj, params);
        //             }
        //         } else {
        //             obj = obj[element];
        //         }
        //     }
        //     return obj;
        // }



        // private __getFunParam(strParam): number {
        //     //字符串
        //     if (strParam.indexOf("\"") >= 0 || strParam.indexOf("'") >= 0) return strParam.replace(/["']+/g, "");
        //     //object
        //     if (strParam.indexOf("{") >= 0 && strParam.indexOf("}") >= 0) return JSON.parse(strParam);
        //     return parseInt(strParam);
        // }



        private parseData(data, depth, maxDepth): string
        {
            let strdepth = "";
            for (let i = 0; i < depth; i++)
            {
                strdepth += this.DEPTH_GAP;
            }
            if (data == null) { return "null"; }
            if (typeof (data) == "object")
            {
                if ((data instanceof window["Long"]))
                { return "Long:" + data; }
                if (depth >= maxDepth) { return "{...}"; } //太深了就不处理了。
                if (data instanceof Array)
                {
                    if (data.length <= 0) { return "[ ]"; }
                    if (data.length == 1) { return `[${ this.parseData(data[0], depth + 1, maxDepth) }]`; }
                    let ret = "[" + this.RETURN_STR + strdepth + this.DEPTH_GAP;
                    let arr: string[] = [];
                    for (const element of data)
                    {
                        if (typeof (element) == "function") { continue; }
                        arr.push(this.parseData(element, depth + 1, maxDepth));
                    }
                    ret += arr.join(", ");
                    ret += this.RETURN_STR + strdepth + "]";
                    return ret;
                } else
                {
                    let ret = "{";
                    let hasData = false;
                    for (const key in data)
                    {
                        if (key == "__proto__")
                        {
                            continue;
                        }
                        const element = data[key];
                        if (typeof (element) == "function") { continue; }
                        ret += this.RETURN_STR + strdepth + this.DEPTH_GAP + key + ": " + this.parseData(element, depth + 1, maxDepth);
                        hasData = true;
                    }
                    if (hasData) { ret += this.RETURN_STR + strdepth + "}"; }
                    else { ret += "}"; }
                    return ret;
                }
            } else
            {
                return "" + data;
            }
        }

    }
}
