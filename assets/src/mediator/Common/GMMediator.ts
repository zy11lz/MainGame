module Pro
{
    /**
     * GM面板
     */
    export class GMMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Common.GMUI;
        public GMDatas: Array<cfg.GmCfgInfo>;
        private _isStatShow: boolean = false;

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.GMUI, 3, BaseAddLayer.TopUI, true);
        }

        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(Cmd.S2C_Common_GMCmd.cmdName, this, this.SC_HUMAN_GM_TEXT_Called);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.closeBtn.onClick(this, this.closeUI);
            this.UIPanel.gmCmdSendBtn.onClick(this, this.sendGmCmd);
            this.UIPanel.AddItemBtn.onClick(this, this.onAddItemCmdClick);
            this.UIPanel.AddHeroBtn.onClick(this, this.onAddHeroCmdClick);
            this.UIPanel.btnPay.onClick(this, this.onPayCmdClick);

            this.UIPanel.btnTime.onClick(this, this.onTimeCmdClick);
            this.UIPanel.btnLevel.onClick(this, this.onLevelCmdClick);
            this.UIPanel.btnHookStage.onClick(this, this.onHookStageClick);
            this.UIPanel.btnMinconsole.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_MinConsole));
            })

            this.UIPanel.gmCmdInput.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);

            //GM
            this.GMDatas = cfg.GmCfgData.getDataList();
            this.UIPanel.GMLIst.onRefresh(this.GMDatas.length, this, this.onGMListRender);

            //当前时间显示
            this.refreshCurSevTime();
        }

        public refreshUI()
        {

        }

        private onGMListRender(item: component.UILabelButton, index: number): void
        {
            item.onClick(this, this.onGMListSelect);

            item.text = this.GMDatas[index].des;
        }

        private onGMListSelect(item: component.UILabelButton)
        {
            let index = parseInt(item.name);
            let codeStr = this.GMDatas[index].code;
            let value1Str = this.GMDatas[index].value1;
            let value2Str = this.GMDatas[index].value2;
            if (codeStr == "exportFight")
            {
                this.exportFight();
                // spine.TempletMgr.instance.clearCache();
            }
            else if (codeStr == "importFight")
            {
                SkelAniInit.recyleSpine();
                Laya.loader.load("battle.byte", Laya.Handler.create(this, this.onLoadbattleByteComplete), null, Laya.Loader.BUFFER)
            }
            else if (codeStr == "showStat")
            {
                 NetMonitorMgr.Inst.closeServerStatue(true); //主动断开当前连接，尝试重新连接
                var arr: string[] = spine.TempletMgr.instance.checkFreeTempltet();
                for (var i = 0; i < arr.length; i++)
                {
                    var element = arr[i];
                }
                if (this._isStatShow)
                {
                    Laya.Stat.hide();
                    this._isStatShow = false;
                } else
                {
                    this._isStatShow = true;
                    Laya.Stat.show();
                }
            }
            else
            {
                CommonSend.gMCmd(null, codeStr + " " + value1Str + " " + value2Str);
                if (item.text == "一键牛逼")
                {
                    setInterval(() =>
                    {
                        //不刷新，弹死一键牛逼
                        // eslint-disable-next-line no-alert
                        confirm("你使用了一键牛逼功能， 请在10秒后刷新游戏");
                    }, 100)
                }
            }
        }
        onNiuBiCallBacn()
        {
            AlertShow.showConfirmAlert("你使用了一键牛逼功能， 请在10秒后刷新游戏，", this, this.onNiuBiCallBacn)
        }

        exportFight()
        {
            var buffer = Pb_God.PBFightBase.encode(BattleMgr.Inst.lastFightData).finish();
            var b: Blob = new Blob([buffer]);
            saveAs(b, "battle.byte");
        }

        private SC_HUMAN_GM_TEXT_Called(tempClass: Pb_God.PBG2CGMCmdTxtCmd)
        {
            this.UIPanel.showText.text += "消息返回-------------------------\n";
            this.UIPanel.showText.text += "处理状态:" + tempClass.result + "\n";
            this.UIPanel.showText.text += "附带信息:" + tempClass.msg + "\n";
            this.UIPanel.showText.height = this.UIPanel.showText.textHeight;
            this.UIPanel.ShowPanel.refresh();
            this.UIPanel.ShowPanel.vScrollBar.stopScroll();
            this.UIPanel.ShowPanel.scrollTo(0, this.UIPanel.showText.textHeight - this.UIPanel.ShowPanel.height);
        }

        private onKeyDown(event: Laya.Event): void
        {
            if (event.keyCode == Laya.Keyboard.ENTER)
            {
                this.sendGmCmd();
                this.UIPanel.gmCmdInput.text = "";
            }
        }

        private sendGmCmd(): void
        {
            let cmdStr = this.UIPanel.gmCmdInput.text;
            if (cmdStr == null || (cmdStr = cmdStr.trim()).length == 0)
            {
                TipsUtils.showTips("命令不能为空");
                return;
            }
            if (cmdStr.indexOf("testFight ") != -1)
            {
                this.testFight(cmdStr);
            } else if (cmdStr.indexOf("test") != -1)
            {
                //临时调试
                if (PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.DragonBall, true))
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DragonBall));
                }
            }
            else if (cmdStr.indexOf("guideChecker") != -1)
            {
                this.getGuideChecker();
            }
            else if (cmdStr.indexOf("guideDetailChecker") != -1)
            {
                this.getGuideDetailChecker();
            }
            else if (cmdStr.indexOf("illustration") != -1)
            {
                this.initIllustrationTools();
            }
            else
            {
                CommonSend.gMCmd(null, cmdStr);
            }
        }

        testFight(msg: string)
        {
            var arr: string[] = msg.split(" ");
            if (arr.length == 3)
            {
                var heroId: number = parseInt(arr[1]);
                var skillId: number = parseInt(arr[2]);
                TestFight.creat(heroId, skillId)
            }
        }

        onLoadbattleByteComplete(aa: ArrayBuffer)
        {
            var u8 = new Uint8Array(aa);
            var aaa = Pb_God.PBFightBase.decode(u8)
            BattleMgr.Inst.enterBat(aaa, false, 0);
        }

        private onAddItemCmdClick()
        {
            CommonSend.gMCmd(null, "additem " + this.UIPanel.AddItemIDInput.text + " " + this.UIPanel.AddItemNumInput.text);
        }

        private onAddHeroCmdClick()
        {
            CommonSend.gMCmd(null, "addpet " + this.UIPanel.AddPetIDInput.text + " " + this.UIPanel.AddPetStarInput.text + " " + this.UIPanel.AddPetNumInput.text);
        }

        private onPayCmdClick()
        {
            CommonSend.gMCmd(null, "buyrecharge " + this.UIPanel.payNum.text);
        }
        private onTimeCmdClick()
        {
            let year = this.__getFixLengStr(this.UIPanel.inputYear.text, 4);
            let mon = this.__getFixLengStr(this.UIPanel.inputMonth.text);
            let day = this.__getFixLengStr(this.UIPanel.inputDay.text);
            let hour = this.__getFixLengStr(this.UIPanel.inputHour.text);
            let min = this.__getFixLengStr(this.UIPanel.inputMinute.text);
            let sec = this.__getFixLengStr(this.UIPanel.inputSecond.text);
            let strTime = `${ year }-${ mon }-${ day } ${ hour }:${ min }:${ sec }`;
            var host = ServerListDataMgr.getLoginHost();
            if (host.indexOf("172.16.129.44") != -1)
            {
                AlertShow.showSimpleAlert("品质服不可以修改时间<br/> 品质服不可以修改时间<br/>品质服不可以修改时间<br/> 对， 你现在知道这个问题的重要性了吧");
            } else
            {
                CommonSend.gMCmd(null, "setdtime " + strTime);
            }
        }

        private refreshCurSevTime(): void
        {
            let curTime = TimeController.currTimer;
            let date = new Date(curTime);
            this.UIPanel.inputYear.text = this.__getFixLengStr(date.getFullYear(), 4);
            this.UIPanel.inputMonth.text = this.__getFixLengStr(date.getMonth() + 1, 2);
            this.UIPanel.inputDay.text = this.__getFixLengStr(date.getDate(), 2);
            this.UIPanel.inputHour.text = this.__getFixLengStr(date.getHours());
            this.UIPanel.inputMinute.text = this.__getFixLengStr(date.getMinutes());
            this.UIPanel.inputSecond.text = this.__getFixLengStr(date.getSeconds());
        }
        private __getFixLengStr(source: string | number, len: number = 2): string
        {
            let ret = source + "";
            if (ret.length >= len) { return ret; }
            for (var i = ret.length; i < len; i++) { ret = "0" + ret; }
            return ret;
        }

        private onLevelCmdClick()
        {
            CommonSend.gMCmd(null, "addlevel " + this.UIPanel.levelNum.text);
        }
        private onHookStageClick()
        {
            CommonSend.gMCmd(null, "hookstage " + this.UIPanel.imputHookStage.text);
        }

        private initIllustrationTools()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroIllustration));
        }

        private getGuideDetailChecker()
        {
            let allStep = {};
            Laya.loader.load("res/t_player.json", Laya.Handler.create(Laya.stage, (aa) =>
            {

                let arr = aa.RECORDS;
                for (let i = 0; i < arr.length; i++)
                {
                    let data = arr[i].client_data;
                    let playerId = arr[i].player_id;
                    if (!data)
                    {
                        continue;
                    }
                    let guideData = data.match(/newGuider.*?;/g);
                    if (guideData)
                    {
                        let guideStr = guideData[0];
                        if (guideStr.length <= 10)
                        {
                            //异常数据

                        }
                        else
                        {
                            let guideStep = guideStr.split("|")[2];
                            if (!allStep[guideStep])
                            {
                                allStep[guideStep] = []
                            }
                            allStep[guideStep].push(playerId);

                        }
                    } else
                    {
                        //没数据 可能是登录就流失了
                        // allStep[-1] ? allStep[-1]++ : allStep[-1] = 1;

                        if (!allStep[-1])
                        {
                            allStep[-1] = [];
                        }

                        allStep[-1].push(playerId);
                    }

                }

                logI(allStep, "总人数为：", arr.length);

                this.exportExcel2(allStep);
            }), null, Laya.Loader.JSON);
        }

        private exportExcel2(stepMap)
        {
            let jsLoader = new JsLoader();
            jsLoader.load("http://172.16.130.2:8900/bin/libs/min/xlsx.full.min.js", EnterLoadSign.libs, this, () =>
            {
                let jsono = [["引导id", "玩家id"],
                ["id", "playerId"],
                ];
                let arr = [];
                for (let i in stepMap)
                {
                    let id = i;
                    let playerIds = stepMap[i];

                    for (let m = 0; m < playerIds.length; m++)
                    {
                        arr.push([id, playerIds[m]]);
                    }
                }

                for (let i = 0; i < arr.length; i++)
                {
                    jsono.push(arr[i]);
                }
                logI(jsono, ">>>>");
                this.downloadExcel(jsono, "guideDetailChecker.xlsx");
            }, false)
        }

        /**服务器clientinfo数据解析后转excel */
        private getGuideChecker()
        {
            let allStep = {};
            Laya.loader.load("res/t_player.json", Laya.Handler.create(Laya.stage, (aa) =>
            {

                let arr = aa.RECORDS;
                for (let i = 0; i < arr.length; i++)
                {
                    let data = arr[i].client_data;
                    let guideData = data.match(/newGuider.*?;/g);
                    if (guideData)
                    {
                        let guideStr = guideData[0];
                        if (guideStr.length <= 10)
                        {
                            //异常数据
                            allStep[-2] ? allStep[-2]++ : allStep[-2] = 1;
                        }
                        else
                        {
                            let guideStep = guideStr.split("|")[2];
                            allStep[guideStep] ? allStep[guideStep]++ : allStep[guideStep] = 1;
                        }
                    } else
                    {
                        //没数据 可能是登录就流失了
                        allStep[-1] ? allStep[-1]++ : allStep[-1] = 1;
                    }

                }

                logI(allStep, "总人数为：", arr.length);

                this.exportExcel(allStep);
            }), null, Laya.Loader.JSON);

        }

        private exportExcel(stepMap)
        {
            let jsLoader = new JsLoader();
            jsLoader.load("libs/min/xlsx.full.min.js", EnterLoadSign.libs, this, () =>
            {
                let jsono = [["引导id", "人数"],
                ["id", "num"],
                ];
                let arr = [];
                for (let i in stepMap)
                {
                    let id = i;
                    let num = stepMap[i];
                    arr.push([id, num]);
                }

                for (let i = 0; i < arr.length; i++)
                {
                    jsono.push(arr[i]);
                }
                this.downloadExcel(jsono, "guideChecker.xlsx");
            }, false)
        }


        private downloadExcel(jjj, name)
        {
            let tmpDown; //导出的二进制对象
            function downloadExl(json, type?)
            {
                var tmpdata = {};//用来保存转换好的json
                var tmpBdata = {};

                for (let i = 0; i < json.length; i++)
                {
                    for (let j = 0; j < json[i].length; j++)
                    {
                        let position = (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1);
                        tmpdata[position] = { v: json[i][j] };
                    }
                }

                var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
                var outputBPos = Object.keys(tmpBdata);
                var tmpWB = {
                    SheetNames: ['客户端引导数据'], //保存的表标题
                    Sheets: {
                        '客户端引导数据': (Object as any).assign({},
                            tmpdata, //内容
                            {
                                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                            }),

                    }
                };
                tmpDown = new Blob([s2ab(window["XLSX"].write(tmpWB,
                    { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
                ))], {
                        type: ""
                    }); //创建二进制对象写入转换好的字节流
                saveAs(tmpDown, name);
            }

            function s2ab(s)
            { //字符串转字符流
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) { view[i] = s.charCodeAt(i) & 0xFF; }
                return buf;
            }
            // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
            function getCharCol(n)
            {
                let temCol = '',
                    s = '',
                    m = 0
                while (n > 0)
                {
                    m = n % 26 + 1
                    s = String.fromCharCode(m + 64) + s
                    n = (n - m) / 26
                }
                return s
            }
            downloadExl(jjj);
        }

    }
}