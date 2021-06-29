module Pro
{
    /**
    * 连连看
    */
    export class LianLianKanMediator extends BaseMediator implements IMediator
    {

        private _startInfo: Pb_God.PBG2CJoyousLinkupStartInfo;

        private _chessDatas: any[];

        public UIPanel: ProUI.ActivityMain.LianLianKan.LianLianKanMainUI;

        private _itemsMap: ds.StringMap<ProUI.ActivityMain.LianLianKan.LianLianKanItemUI>;

        private _selectItem: ProUI.ActivityMain.LianLianKan.LianLianKanItemUI;

        private _proMaxWidth: number = 516;

        private _remainTime: number;

        /**切换到其他界面 等3秒再重置 */
        private _closeTime: number;

        /**
         * 是否在等待中 ，等服务器数据 ，等动画 都要置为true
         */
        private _isWait: boolean = false;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('lianliankan')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.LianLianKan.LianLianKanMainUI, 3, BaseAddLayer.CenterUI, false, 1);
        }

        private adjustScreenPos()
        {
            this.UIPanel.height = GameConfig.curHeight();
            this.UIPanel.y = 0;

        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.adjustScreenPos();
        }


        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            if (TimeController.currTimer - this._closeTime < 3000)
            {
                Laya.timer.clear(this, this.onDelayClose)

                //因为关闭后释放了计时器 这边需要重新添加
                Laya.timer.loop(1000, this, this.onTimer);
                this.onTimer();

                return;
            }
            this.refreshUI();
            //每次打开载入开始游戏画面
            this.showStartView();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.JoyousLinkup_Start_Info, this, this.onStartInfoBack);
            this.addEventMgr(CmdEvent.JoyousLinkup_Connect_Result, this, this.onConnectResultBack);
            this.addEventMgr(CmdEvent.JoyousLinkup_Info_Chg, this, this.onInfoChange);
            this.addEventMgr(CmdEvent.JoyousLinkup_End, this, this.onEnd);
            this.addEventMgr(CmdEvent.JoyousLinkup_Quit, this, this.onQuit);
            this.addEventMgr(CmdEvent.TopList_GetSelf_Ack, this, this.onMyRankBack);


            this.UIPanel.btnGoOn.onClick(this, this.onGoOn);
            this.UIPanel.btnStart.onClick(this, this.onStart);
            this.UIPanel.btnNext.onClick(this, this.onStart);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onHelpClick);
            this.UIPanel.btnRank.onClick(this, this.onRankClick);
            this.UIPanel.btnRefresh.onClick(this, this.onRefreshClick);
        }

        private onMyRankBack()
        {
            this.UIPanel.lblRank.text = JoyousLinkupDataMgr.myRank + "";
            this.UIPanel.lblMyRank.text = JoyousLinkupDataMgr.myRank + "";
        }

        private onHelpClick(btn: component.UIButton)
        {
            CommonHelpView.showWithLangKey(btn, "Linkgame_help");
        }

        private onRankClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LianLianKanRank));
        }

        private onRefreshClick()
        {
            JoyousLinkupSend.refresh();
        }

        private onStart()
        {
            JoyousLinkupSend.start(true);
        }

        private onGoOn()
        {
            JoyousLinkupSend.start(false);
        }

        /**
         * 游戏开始
         * @param value 
         */
        private onStartInfoBack(value: Pb_God.PBG2CJoyousLinkupStartInfo)
        {

            this._startInfo = value;
            this._chessDatas = null;
            let chessDatas = this.getChessDatas();
            this.resetChessView(chessDatas);
            this.showPlayView();
        }

        /**
         * 棋盘数据变更 一般只在刷新棋盘用到
         * @param value 
         */
        private onInfoChange(value: Pb_God.PBG2CJoyousLinkupChessData)
        {
            this._startInfo.chessData = value.chessData;
            this._chessDatas = null;
            let chessDatas = this.getChessDatas();
            this.resetChessView(chessDatas);

            let maxCount = cfg.JoyousLinkupJoyousLinkupCfgData.getRefreshNumByType(this._startInfo.index);
            this.UIPanel.lblRefreshCount.text = (maxCount - value.refreshNum) + "/" + maxCount;
        }

        /**
         * 游戏结束
         */
        private onEnd(value: Pb_God.PBG2CJoyousLinkupEnd)
        {
            if (value.bOver)
            {
                this.showEndView();
                this.UIPanel.lblDoubleSco.text = value.doubleHitScore + "";
                this.UIPanel.lblDelSco.text = value.disScore + "";
                this.UIPanel.lblTimeSco.text = value.timeScore + "";
            }
            else
            {
                this.showNextStageView();
            }

        }

        private showStartView()
        {
            this.UIPanel.playBox.visible = this.UIPanel.endBox.visible = this.UIPanel.nextStageBox.visible = false;
            this.UIPanel.startBox.visible = true;
            this._isWait = false;

            //请求一下排名
            this.UIPanel.lblMyRank.text = "";
            TopListSend.getSelf(Pb_God._emTopListType.TopListType_JoyousLinkup);

            //活动剩余时间倒计时
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();

            this.resetImgBg();
        }

        private resetImgBg()
        {
            this.UIPanel.imgBg.skin = this.UIPanel.startBox.visible ? "res/lianliankan/huodong_lianlian_pic01.png" : "res/lianliankan/huodong_lianlian_pic00.png";
        }

        /**
         * 同一个计时器中刷新倒计时文本
         * 活动倒计时
         * 单布操作倒计时
         */
        private onTimer()
        {
            //活动倒计时
            let actRemainTime = ActivityDataMgr.getActivityEndTimeStamp(cfg.JoyousLinkupJoyousLinkupCfgData.getActivityCfgInfo().iD) * 1000 - TimeController.currTimer;

            this.UIPanel.lblActEndTime.text = Global.GetRemindTime(actRemainTime / 1000, 10)

            //单布操作倒计时
            this._remainTime -= 1000;
            if (this._remainTime >= 0)
                this.UIPanel.lblRemainTime.text = Global.GetRemindTime(this._remainTime / 1000, 4);

        }

        private showPlayView()
        {
            this.UIPanel.startBox.visible = this.UIPanel.endBox.visible = this.UIPanel.nextStageBox.visible = false;
            this.UIPanel.playBox.visible = true;

            this.resetGame();
            this.resetImgBg();

        }

        private resetGame()
        {
            let maxCount = cfg.JoyousLinkupJoyousLinkupCfgData.getRefreshNumByType(this._startInfo.index);
            this.UIPanel.lblRefreshCount.text = maxCount + "/" + maxCount;
            this.UIPanel.lblDoubleCount.text = "0";
            this.UIPanel.lblCurrScore.text = this._startInfo.currScore + "";
            this.UIPanel.lblTopScore.text = this._startInfo.topScore + "";
        }


        private showEndView()
        {
            this.UIPanel.startBox.visible = this.UIPanel.playBox.visible = this.UIPanel.nextStageBox.visible = false;
            this.UIPanel.endBox.visible = true;

            TopListSend.getSelf(Pb_God._emTopListType.TopListType_JoyousLinkup);
            this.resetImgBg();
        }

        private showNextStageView()
        {
            this.UIPanel.startBox.visible = this.UIPanel.playBox.visible = this.UIPanel.endBox.visible = false;
            this.UIPanel.nextStageBox.visible = true;

            this.resetImgBg();
        }

        /**
         * 主动退出
         */
        private onQuit()
        {

        }

        /**
         * 连接返回
         * @param value 
         */
        private onConnectResultBack(value: Pb_God.PBG2CJoyousLinkupConnectResult)
        {
            if (value.flag)
            {
                //成功消除
                let chessDatas = this.getChessDatas();
                let startChessData = chessDatas[value.startPos.x][value.startPos.y];
                let endChessData = chessDatas[value.endPos.x][value.endPos.y];
                //尝试连接 搜索路径
                let pathList = this.MatchBolckTwo(this.getChessDatas(), startChessData, endChessData);
                if (pathList)
                {
                    //已经确认要消除了
                    pathList.unshift(startChessData);
                    pathList.push(endChessData);
                    this.showDisposeAni(pathList);
                }
                else
                {
                    logE("前后端棋盘数据不一致！")
                }
            } else
            {
                this._isWait = false;
            }

            this.UIPanel.lblDoubleCount.text = value.currDoubleHit + "";
            this.UIPanel.lblCurrScore.text = value.currScore + "";

            this.resetCD();
        }

        /**
         * 每次刷新新的时间 直接取配置完事了每次都重头倒计时的
         */
        private resetCD()
        {
            Laya.Tween.clearTween(this.UIPanel.proTime);
            this._remainTime = cfg.JoyousLinkupJoyousLinkupCfgData.getStepTimeByType(this._startInfo.index) * 1000;
            this.UIPanel.lblRemainTime.text = Global.GetRemindTime(this._remainTime, 4);
            this.UIPanel.proTime.width = this._proMaxWidth;
            Laya.Tween.to(this.UIPanel.proTime, { width: 1 }, this._remainTime);

        }

        public closeUI()
        {
            this._closeTime = TimeController.currTimer;
            Laya.timer.clear(this, this.onTimer);
            Laya.timer.once(3000, this, this.onDelayClose)
            super.closeUI();
        }

        private onDelayClose()
        {
            JoyousLinkupSend.quit();

        }

        /**
         * 清除旧的
         */
        private clearChessView()
        {
            if (!this._itemsMap)
                return;
            let keys = this._itemsMap.getKeys();
            for (let i = 0; i < keys.length; i++)
            {
                this._itemsMap.get(keys[i]).removeSelf();
            }
            this._itemsMap = null;
        }

        /**
         * 重置棋盘
         * @param chessDatas 棋盘数据
         */
        private resetChessView(chessDatas: any[])
        {
            this.clearSelectItem();
            this.clearChessView();
            this.resetCD();
            this._itemsMap = new ds.StringMap<ProUI.ActivityMain.LianLianKan.LianLianKanItemUI>();
            for (let i = 0; i < chessDatas.length; i++)
            {
                for (let j = 0; j < chessDatas[i].length; j++)
                {
                    let iType = chessDatas[i][j].iType;
                    let chessData = chessDatas[i][j];
                    let item = new ProUI.ActivityMain.LianLianKan.LianLianKanItemUI();
                    this._itemsMap.put(`${ chessData.x }+${ chessData.y }`, item);
                    this.UIPanel.contentBox.addChild(item);

                    item.x = chessData.y * item.width;
                    item.y = chessData.x * item.height;

                    item.scaleBox.scale(0.01, 0.01);
                    //冒泡效果
                    Laya.Tween.to(item.scaleBox, { scaleX: 1.1, scaleY: 1.1 }, 200, null, Laya.Handler.create(this, () =>
                    {
                        Laya.Tween.to(item.scaleBox, { scaleX: 1, scaleY: 1 }, 50);
                    }))

                    item["chessData"] = chessData;
                    if (iType <= 0)
                    {
                        //<=0代表这个格子是空的 虽然是空的 但是也要生成格子 看不见就行
                        this.setEmpty(item);
                    }
                    else
                    {
                        item.icon.skin = UrlMgr.getSmallBodyByUrl(cfg.JoyousLinkupJoyousLinkupChessCfgData.getImgByIndex(iType));
                        item.on(LayaEvent.CLICK, this, this.onItemClick, [chessData]);
                        item.selectImg.frame = 2;
                    }
                }
            }
        }

        /**
         * 设置某个item为空 
         */
        private setEmpty(item: ProUI.ActivityMain.LianLianKan.LianLianKanItemUI)
        {
            if (!item)
                return;
            item.selectImg.frame = 0;
            item.icon.skin = "";
            this.getItemChessData(item).iType = 0;
            item.off(LayaEvent.CLICK, this, this.onItemClick);
        }

        private destroyItem(item: ProUI.ActivityMain.LianLianKan.LianLianKanItemUI)
        {
            if (!item)
                return;
            item.parent.addChild(item);
            let sk = new SkeletonPlayer();
            sk.setRes(UrlMgr.getSpineSceneUrl("UIeffect/baozha"));
            item.addChild(sk);
            sk.pos(item.width >> 1, item.height >> 1);
            sk.playByIndex(0, false);

            /**选去掉点击监听 避免Tween回调中的setEmpty还没调用 又再一次选中这个item */
            item.off(LayaEvent.CLICK, this, this.onItemClick);

            Laya.Tween.to(item.selectImg, { alpha: 0 }, 300);
            Laya.Tween.to(item.icon, { alpha: 0 }, 300, null, Laya.Handler.create(this, () =>
            {
                this.setEmpty(item);
                item.selectImg.alpha = item.icon.alpha = 1;
                sk.removeSelf();
            }));

        }

        private clearSelectItem()
        {
            if (!this._selectItem)
                return;
            if (this._selectItem["__selectAni__"])
            {
                this._selectItem["__selectAni__"].removeSelf();
                this._selectItem["__selectAni__"] = null;
            }
            this._selectItem.selectImg.frame = 2;
            this._selectItem = null;

        }

        private selectItem(item)
        {
            if (!item)
                return;
            item.parent.addChild(item);
            this._selectItem = item;
            // item.selectImg.frame = 1;
            if (!this._selectItem["__selectAni__"])
            {
                let sk = new SkeletonPlayer();
                sk.setRes(UrlMgr.getSpineSceneUrl("UIeffect/xuanzhong"));
                this._selectItem.selectImg.addChild(sk);
                sk.pos(this._selectItem.selectImg.width >> 1, this._selectItem.selectImg.height >> 1);
                this._selectItem["__selectAni__"] = sk;
            }
            this._selectItem["__selectAni__"].play("xuanzhong", true);
        }

        /**
         * 点击后要处理选中状态 连接逻辑
         * @param chessData 点击的格子
         */
        private onItemClick(chessData: any)
        {
            if (this._isWait)
                return;
            let item = this.getItemByChessData(chessData);
            if (!item)
                return;
            if (!this._selectItem)
            {
                this.selectItem(item);
            }
            else
            {
                if (this.getItemChessData(this._selectItem) == this.getItemChessData(item))
                {
                    //选自己 就清除选中
                    this.clearSelectItem();
                }
                else if (this.getItemChessData(this._selectItem).iType != this.getItemChessData(item).iType)
                {
                    //选不同类型 就改选最新的
                    this.clearSelectItem();
                    this.selectItem(item);
                }
                else
                {
                    //尝试连接 搜索路径
                    let pathList = this.MatchBolckTwo(this.getChessDatas(), this.getItemChessData(this._selectItem), this.getItemChessData(item));
                    // 如果存在链接路径则消除单元格内容 并为搜索路径添加起止单元格
                    if (pathList != null)
                    {
                        this._isWait = true;
                        //判断可以消就发协议让服务端处理 通过服务端的返回协议做界面刷新 
                        let startPos = new Pb_God.PBJoyousLinkupPos();
                        startPos.x = this.getItemChessData(this._selectItem).x;
                        startPos.y = this.getItemChessData(this._selectItem).y;
                        let endPos = new Pb_God.PBJoyousLinkupPos();
                        endPos.x = this.getItemChessData(item).x;
                        endPos.y = this.getItemChessData(item).y;
                        JoyousLinkupSend.connect(startPos, endPos);

                    }
                    else
                    {
                        this.clearSelectItem();
                    }
                }
            }
        }

        /**
         * 获取item的chessData
         * @param item 
         */
        private getItemChessData(item: ProUI.ActivityMain.LianLianKan.LianLianKanItemUI)
        {
            return item["chessData"];
        }

        /**
         * 显示消除动画
         * @param path 
         */
        private showDisposeAni(path: any[])
        {
            this._isWait = true;
            for (let i = 0; i < path.length - 1; i++)
            {
                let p = path[i];
                let nextP = path[i + 1];
                let line = new Laya.Image();
                line.size(118, 30);

                //sk长度并没有按102出 所以这里要计算一下。。大概是118像素的样子 scale为0.86
                let sk = new SkeletonPlayer();
                sk.setRes(UrlMgr.getSpineSceneUrl("UIeffect/lianxian"));
                sk.playByIndex(0, true);
                line.addChild(sk);
                sk.pos(51, 15);
                sk.scaleX = 0.86;

                line.anchorY = 0.5;
                if (p.x != nextP.x)
                {
                    //竖线
                    line.scaleX = Math.abs(nextP.x - p.x);//* 102;
                    if (p.x > nextP.x)
                    {
                        //从下往上
                        line.rotation = -90;
                    }
                    else
                    {
                        //从上往下
                        line.rotation = 90;
                    }
                }
                else
                {
                    //横线
                    line.scaleX = Math.abs(nextP.y - p.y);//* 102;
                    if (p.y > nextP.y)
                    {
                        //从右往左
                        line.rotation = -180;
                    }
                }
                let point = new Laya.Point();
                point.x = p.y * 102 + 51;
                point.y = p.x * 102 + 51;
                this.UIPanel.mainBox.addChild(line);
                let localPoint = this.UIPanel.mainBox.globalToLocal(this.UIPanel.contentBox.localToGlobal(point));

                localPoint = this.formatPos(localPoint);
                line.pos(localPoint.x, localPoint.y);

                let startChessData = path[0];
                let endChessData = path[path.length - 1];
                Laya.timer.once(150, this, () =>
                {
                    this._isWait = false;
                    line.removeSelf();
                    this.clearSelectItem();
                    this.destroyItem(this.getItemByChessData(startChessData));
                    this.destroyItem(this.getItemByChessData(endChessData));

                })
            }
        }

        /**
         * 边界处理
         */
        private formatPos(pos: Laya.Point)
        {
            pos.x = Math.max(0, pos.x);
            // pos.y = Math.max(0, pos.y);
            pos.x = Math.min(this.UIPanel.mainBox.width, pos.x);
            // pos.y = Math.min(this.UIPanel.mainBox.height, pos.y);
            return pos;
        }

        private getItemByChessData(chessData)
        {
            if (!this._itemsMap)
                return;
            return this._itemsMap.get(`${ chessData.x }+${ chessData.y }`)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.UIPanel.lblTopScore.text = "0";
            this.UIPanel.lblCurrScore.text = "0";
            this.UIPanel.lblMyRank.text = "0";
        }

        /**
         * 0折
         * @param datas 
         * @param srcPt 
         * @param destPt 
         */
        private MatchBlock(datas, srcPt, destPt)
        {
            // 如果不属于0折连接则返回false
            if (srcPt.x != destPt.x && srcPt.y != destPt.y)
                return false;

            let min, max;

            // 如果两点的x坐标相等，则在水平方向上扫描
            if (srcPt.x == destPt.x)
            {
                min = srcPt.y < destPt.y ? srcPt.y : destPt.y;
                max = srcPt.y > destPt.y ? srcPt.y : destPt.y;
                for (min++; min < max; min++)
                {
                    if (datas[srcPt.x][min].iType > 0)
                        return false;
                }
            }
            // 如果两点的y坐标相等，则在竖直方向上扫描
            else
            {
                min = srcPt.x < destPt.x ? srcPt.x : destPt.x;
                max = srcPt.x > destPt.x ? srcPt.x : destPt.x;
                for (min++; min < max; min++)
                {
                    if (datas[min][srcPt.y].iType > 0)
                        return false;
                }
            }
            return true;
        }

        /**
         * 1折
         * @param datas 
         * @param srcPt 
         * @param destPt 
         */
        private MatchBolckOne(datas, srcPt, destPt)
        {
            // 如果不属于1折连接则返回null
            if (srcPt.x == destPt.x || srcPt.y == destPt.y)
                return null;

            // 测试对角点1
            let pt = new Point(srcPt.x, destPt.y);

            if (datas[pt.x][pt.y].iType <= 0)
            {
                let stMatch = this.MatchBlock(datas, srcPt, pt);
                let tdMatch = stMatch ?
                    this.MatchBlock(datas, pt, destPt) : stMatch;
                if (stMatch && tdMatch)
                {
                    return pt;
                }
            }

            // 测试对角点2
            pt = new Point(destPt.x, srcPt.y);

            if (datas[pt.x][pt.y].iType <= 0)
            {
                let stMatch = this.MatchBlock(datas, srcPt, pt);
                let tdMatch = stMatch ?
                    this.MatchBlock(datas, pt, destPt) : stMatch;
                if (stMatch && tdMatch)
                {
                    return pt;
                }
            }
            return null;
        }

        /**
         * 2折
         * @param datas 棋盘坐标系
         * @param srcPt 选中的坐标
         * @param destPt 目标坐标
         */
        public MatchBolckTwo(datas, srcPt, destPt)
        {
            if (datas == null || datas.length == 0)
                return null;

            if (srcPt.x < 0 || srcPt.x > datas.length)
                return null;

            if (srcPt.y < 0 || srcPt.y > datas[0].length)
                return null;

            if (destPt.x < 0 || destPt.x > datas.length)
                return null;

            if (destPt.y < 0 || destPt.y > datas[0].length)
                return null;

            // 判断0折连接
            if (this.MatchBlock(datas, srcPt, destPt))
            {
                return [];
            }

            let list = [];
            let point;

            // 判断1折连接
            if ((point = this.MatchBolckOne(datas, srcPt, destPt)) != null)
            {
                list.push(point);
                return list;
            }

            // 判断2折连接
            let i;
            for (i = srcPt.y + 1; i < datas[srcPt.x].length; i++)
            {
                if (datas[srcPt.x][i].iType <= 0)
                {
                    let src = new Point(srcPt.x, i);
                    let dest = this.MatchBolckOne(datas, src, destPt);
                    if (dest != null)
                    {
                        list.push(src);
                        list.push(dest);
                        return list;
                    }
                } else break;
            }

            for (i = srcPt.y - 1; i > -1; i--)
            {
                if (datas[srcPt.x][i].iType <= 0)
                {
                    let src = new Point(srcPt.x, i);
                    let dest = this.MatchBolckOne(datas, src, destPt);
                    if (dest != null)
                    {
                        list.push(src);
                        list.push(dest);
                        return list;
                    }
                } else break;
            }

            for (i = srcPt.x + 1; i < datas.length; i++)
            {
                if (datas[i][srcPt.y].iType <= 0)
                {
                    let src = new Point(i, srcPt.y);
                    let dest = this.MatchBolckOne(datas, src, destPt);
                    if (dest != null)
                    {
                        list.push(src);
                        list.push(dest);
                        return list;
                    }
                } else break;
            }

            for (i = srcPt.x - 1; i > -1; i--)
            {
                if (datas[i][srcPt.y].iType <= 0)
                {
                    let src = new Point(i, srcPt.y);
                    let dest = this.MatchBolckOne(datas, src, destPt);
                    if (dest != null)
                    {
                        list.push(src);
                        list.push(dest);
                        return list;
                    }
                } else break;
            }
            return null;
        }

        public getChessDatas()
        {
            if (!this._chessDatas)
            {
                let chessData = this._startInfo.chessData;
                let chess = [];
                for (let i = 0; i < chessData.indexdata.length; i++)
                {
                    let tmp = [];
                    chess.push(tmp);
                    let row = chessData.indexdata[i].index;
                    for (let j = 0; j < chessData.indexdata[i].data.length; j++)
                    {
                        let col = chessData.indexdata[i].data[j].key;
                        let iType = chessData.indexdata[i].data[j].value;
                        tmp.push({ x: row, y: col, iType: iType });
                    }
                }
                this._chessDatas = chess;
            }

            return this._chessDatas;
        }

    }


}