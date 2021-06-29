module Pro
{
    export enum EmredEnvelopeType {
		//	官方红包;
		NpcRedEnvelope = 1,
		//	精灵红包;
		PetRedEnvelope = 2
    }
    /**
     * 新年红包
     */
    export class RedEnvelopeMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeUI;
        /** 分页类型 */
        private _PageType = [EmredEnvelopeType.NpcRedEnvelope, EmredEnvelopeType.PetRedEnvelope];
        /** 当前红包分页类型 */
        private _curPageType: EmredEnvelopeType = EmredEnvelopeType.NpcRedEnvelope;
        /** 红包开启动画 */
        private _openRedEnvelopeSk: SkeletonPlayer;
        /** 奖励信息 */
        private _rewardInfo: Pb_God.PBG2COpenRedEnvelopeAck;
        /** 中奖信息倒计时 */
        private _itemLogTime = 0;
        /** 当前红包排序后列表 */
        private _redEnvelopeSortList: Pb_God.PBRedEnvelopeInfo[];
        /** 精灵红包显示倒计时索引*/
        private _petTimeIndex: number = 0;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('redEnvelope')];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeUI,1, BaseAddLayer.CenterUI,true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            if (this._openRedEnvelopeSk)
			{
				this._openRedEnvelopeSk.offAll();
				this._openRedEnvelopeSk.removeSelf();
				this._openRedEnvelopeSk = null;
			}
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
             this.UIPanel.reBag.on(Laya.Event.CLICK,this,this.openRedEnvelopeInfo)
             this.UIPanel.closeBtn.on(Laya.Event.CLICK,this,this.closeUI)
        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.UIPanel.redEnvelopeAni.visible = true;
            this.UIPanel.redEnvelopeInfo.visible = false;
            this.UIPanel.aniPanel.visible = false;
            this._itemLogTime = 0;
            this.UIPanel.effShot.play(0, true);
            this.showItemlogInfo(false);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            EventMgr.on(Cmd.S2C_RedEnvelope_OpenAck.cmdName, this, this.openRedEnvelope)
            EventMgr.on(EventNotify.RedEnvelope_Update, this, this.refreshRedEnvelopeInfo)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            Laya.timer.clear(this, this.onTimer);
            EventMgr.off(Cmd.S2C_RedEnvelope_OpenAck.cmdName, this, this.openRedEnvelope)
            EventMgr.off(EventNotify.RedEnvelope_Update, this, this.refreshRedEnvelopeInfo)
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

            //Pb_God.PBG2COpenRedEnvelopeAck
        }

        private openRedEnvelopeInfo():void
        {
            this.UIPanel.effShot.stop();
            this.UIPanel.redEnvelopeAni.visible = false;
            this.UIPanel.redEnvelopeInfo.visible = true;
            //分页按钮
			this.UIPanel.tabGrp.onClick(this, this.onClickTabGroup,
				[new component.UITabData("redEnvelope_msg1"), new component.UITabData("redEnvelope_msg2")],
				[new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
			);
            this.refreshRedEnvelopeInfo();
            this.UIPanel.tabGrp.setSelectTab(0);

            //关联红点与tab
            let redDotModes = [
                RedEnvelopeDataMgr.reddotModel.getChildModel("npc"),
                RedEnvelopeDataMgr.reddotModel.getChildModel("pet"),
            ]
            this.UIPanel.tabGrp.setRedDotModelList(redDotModes);
            Laya.timer.loop(1000, this, this.onTimer);
        }

        
		/** 切换分页 */
		private onClickTabGroup(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
		{
            if(this._curPageType == tabIndex + 1)return;
			this._curPageType = this._PageType[tabIndex];
            this.refreshRedEnvelopeInfo();
        }


        private refreshRedEnvelopeInfo(): void
        {
            this._redEnvelopeSortList = RedEnvelopeDataMgr.getRedEnvelopeSortByType(this._curPageType);
            this._petTimeIndex = this.getShowTimeIndex();
            this.UIPanel.itemList.onRefresh(this._redEnvelopeSortList.length, this, this.onRefreshItem);
            Laya.timer.once(10, this, this.onTimer,null,false);
        }

        private onRefreshItem(item: ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeItemUI, index: number): void
        {
            let isOpen = false;
            if(this._redEnvelopeSortList.length == 0)return;
            let element = cfg.ActivityRedEnvelopeCfgData.getInfo(this._redEnvelopeSortList[index].index);
            this.resetUI(item);
            item.name = element.index + "";
            if(this._redEnvelopeSortList[index].status == 0){  // 可领取
                isOpen = true;
            }else if(this._redEnvelopeSortList[index].status == 2){  // 已领取  
                item.open.visible = false;
                item.frameImg.visible = true;
                item.frameImg.frame = 2;
            }

            if(this._curPageType == EmredEnvelopeType.NpcRedEnvelope) // 官方红包
            {
                item.npcImg.visible = true
                item.npcImg.skin = `res/Unpack/npc/${element.img}.png`
            }
            else
            {
                item.petImg.visible = true;
                item.petImg.skin = `res/Unpack/Icon/BigCard/${element.img}.png`
            }

            item.title.text =  Global.getLangStr("redEnvelope_msg3",element.name);
            item.noopen.visible = !isOpen
               
            item.itemBtn.canMove = false;
            item.itemBtn.onClick(this,this.onItemClick);
        }
     
        /** 红包点击 */
        private onItemClick(btn: NorItemUI)
        {
            // 倒计时 待开发 不允许点击
            let index = parseInt(btn.parent.name);
            let arr = RedEnvelopeDataMgr.getRedEnvelopeSortByType(this._curPageType).filter(el => el.index == index);
            
            let cfgEndTime = cfg.ActivityRedEnvelopeCfgData.getInfo(index).time;
            let endTime = cfg.StDateTimeInfo.parse(`${cfgEndTime}`).getStartTime(TimeController.currTimer);
            if(arr[0].status == 1 && endTime / 1000 - TimeController.currTimer / 1000 >= 0)
            {
                // 时间未达到
                // TipsUtils.showTipsByLanId("redEnvelope_msg4");
            }  
            else
            {
                RedEnvelopeSend.openAsk(index);
            } 
        }

        private openRedEnvelope(value: Pb_God.PBG2COpenRedEnvelopeAck): void
        {
            if(value.newFlag == 0)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RedEnvelopeRewardMediator,value));
            }
            else
            {
                this._rewardInfo = value;
                this.displayOpenRedEnvelopeAni();
            }
        }

        private resetUI(item: ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeItemUI):void
        {
            item.noopen.visible = false;
            item.time.visible = false;
            item.frameImg.visible = false;
            item.petImg.visible = false;
            item.npcImg.visible = false;
            item.open.visible = true;
        }

        /** 刷新红包倒计时 */
        private onTimer(): void
        {
            for (let i = 0; i < this._redEnvelopeSortList.length ; i++) {
                let redEnvelope = this.UIPanel.itemList.getCell(i) as ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeItemUI;
                if(!redEnvelope)continue;
                if(this.checkShowTime(redEnvelope))
                {
                    let cfgEndTime = cfg.ActivityRedEnvelopeCfgData.getInfo(parseInt(redEnvelope.name)).time;
                    let endTime = cfg.StDateTimeInfo.parse(`${cfgEndTime}`).getStartTime(TimeController.currTimer);
                    redEnvelope.timeLab.text = Global.GetRemindTime((endTime / 1000 - TimeController.currTimer / 1000) , 9);
                }
            }
            this._itemLogTime += 1;
            if(this._itemLogTime >= Math.random() * 10 + 5)
            {
                this.showItemlogInfo(false);
            }
        }

        /**
         * 检查是否显示时间计时
         * @param item 
         * @param petRedEnvelope  精灵红包倒计时显示是否大于1个
         */
        private checkShowTime(item: ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeItemUI): boolean
        {
            let arr = RedEnvelopeDataMgr.getRedEnvelopeByIndex(parseInt(item.name));
            if(!arr) return false; 
            if(arr.status == 0 || arr.status == 2) return false;    // 可领取 || 已领取
            if(arr.status == 1)
            {
                // 检测时间是否达到
                let cfgEndTime = cfg.ActivityRedEnvelopeCfgData.getInfo(parseInt(item.name)).time;
                let endTime = cfg.StDateTimeInfo.parse(`${cfgEndTime}`).getStartTime(TimeController.currTimer);
                let curtime = TimeController.currTimer;
                if((curtime - endTime) > 0) // 时间达到
                {
                    if(this._curPageType == EmredEnvelopeType.PetRedEnvelope)
                    {
                        this._petTimeIndex = this.getShowTimeIndex(parseInt(item.name));
                    }
                    item.noopen.visible = false;
                    return false;
                }
                else
                {
                    /** 精灵红包仅显示一个最近的倒计时 后面红包显示待发放*/
                    if(this._curPageType == EmredEnvelopeType.PetRedEnvelope )
                    {
                        if(this._petTimeIndex == parseInt(item.name))
                        {
                            item.time.visible = true;
                            item.frameImg.visible = false;
                            return true;
                        }
                        else
                        {
                            item.time.visible = false;
                            item.frameImg.visible = true;
                            item.frameImg.frame = 1;
                            return false
                        }
                    }
                }
            }
            item.time.visible = true;
            item.frameImg.visible = false;
            return true;
        }
        
        /**
         * 红包奖励动画
         */
        private displayOpenRedEnvelopeAni(): void
        {
            if(!this._openRedEnvelopeSk)
                this._openRedEnvelopeSk = new SkeletonPlayer();
                this.UIPanel.skNode.addChild(this._openRedEnvelopeSk);
                this._openRedEnvelopeSk.pos(0, 100);
                this._openRedEnvelopeSk.load(UrlMgr.getSpineSceneUrl("texiao/hongbao1/hongbao1"));
                this._openRedEnvelopeSk.on(Laya.Event.STOPPED, this, () =>
                {
                    this.showItemlogInfo(true);
                    this.UIPanel.aniPanel.visible = false;
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RedEnvelopeRewardMediator,this._rewardInfo,true));
                })
            this.UIPanel.aniPanel.visible = true;
            this.UIPanel.aniPanel.graphics.clear();
            this.UIPanel.aniPanel.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight(), "#000000");
            this._openRedEnvelopeSk.playbackRate(2);        // 播放倍率*2
            this._openRedEnvelopeSk.playByIndex(0, false);
        }

        /** 显示随机奖励消息通知 */
        private showItemlogInfo(isMe: boolean): void
        {
            this._itemLogTime = 0
            if(isMe)
            {
                this.UIPanel.itemLog.innerHTML =  Global.getLangStr("redEnvelope_msg5",Pro.PlayerDataMgr.name,cfg.ItemCfgData.getNameById(this._rewardInfo.award[0].itemid)); 
            }
            else
            {
                let itemId = cfg.ActivityRewardPoolCfgData.getRandomItemId();
                this.UIPanel.itemLog.innerHTML =  Global.getLangStr("redEnvelope_msg5",cfg.PlayerNameNameCfgData.getRandomName(Math.floor(Math.random() * 3)),cfg.ItemCfgData.getNameById(itemId)); 
            }
            this.UIPanel.logBg.width = this.UIPanel.itemLog.contextWidth + 34;
        }


        public getShowTimeIndex(curIndex: number = 0)
		{
			for (var index = 0; index < this._redEnvelopeSortList.length; index++) {
				let element = this._redEnvelopeSortList[index];
				if(element.status == 1 && curIndex < element.index)return element.index;
			}
			return this._petTimeIndex;
		} 
    }
}