module Pro
{
    /**
     * 天界祈祷
     */
    export class HeavenPrayMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Heavens.PageView.PrayViewUI;

        /** 当前神像配置数据 */
        private cur_pray_statueCfg: cfg.HeavenPrayStatueCfgInfo;

        /** 特殊道具消耗物品id */
        private special_item_id: number;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("heavenspary")];
        }
        /**祈祷次数 */
        private prayerTimes: number

        //宝箱skeleton
        private treasureChest: SkeletonPlayer;

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/heavenspary/mijingtanxian_beijingtu_bg06.jpg",
                "res/heavenspary/tianjie_diaoxiang_1.png",
                "res/heavenspary/tianjie_diaoxiang_2.png",
                "res/heavenspary/tianjie_diaoxiang_3.png",
                "res/heavenspary/tianjie_diaoxiang_4.png",
                "res/heavenspary/tianjie_diaoxiang_5.png"
            ];
        }

        /**宝箱资源路径 */
        private _boxBone = [
            "texiao/baoxiang/baoxiang1/baoxiang",
            "texiao/baoxiang/baoxiang2/baoxiang",
            "texiao/baoxiang/baoxiang3/baoxiang",
            "texiao/baoxiang/baoxiang4/baoxiang",
            "texiao/baoxiang/baoxiang5/baoxiang"
        ];

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.PageView.PrayViewUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            if (this.treasureChest)
            {
                this.treasureChest.offAll();
                this.treasureChest.removeSelf();
                this.treasureChest = null;
            }
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.txt_tips.visible = false;  //策划说暂时屏蔽这个。

            this.UIPanel.btn_close.onClick(this, this.closeUI);
            this.UIPanel.txt_tips.on(Laya.Event.CLICK, this, () =>
            {
                // 祈祷记录
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenPrayRecordView, this.cur_pray_statueCfg));
            });
            this.UIPanel.btn_prayOne.onClick(this, this.onPrayOneClick);
            this.UIPanel.btn_prayTen.onClick(this, this.onPrayTenClick);
            this.UIPanel.btn_addItem.onClick(this, this.onAddSpecialItemClick);
            this.UIPanel.btn_left.onClick(this, this.onBtnLeftClick);
            this.UIPanel.btn_right.onClick(this, this.onBtnRightClick);
            this.UIPanel.btn_detail.onClick(this, this.onStatueDetailClick);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Heaven_StatueUpdate, this, this.refreshUI);
            this.addEventMgr(Cmd.S2C_Common_WorldItemLog.cmdName, this, this.onGetListTipDatas);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            // 首次打开 加载到最新神像
            let cur_chapterID = HeavenDungeonDataMgr.getCurOpenChpaterId();
            let statue_cfg = cfg.HeavenPrayStatueCfgData.getStatueInfoByChpaterId(cur_chapterID);
            this.initStatue(statue_cfg);
        }

        /** 初始化神像数据 */
        private initStatue(statue_cfg: cfg.HeavenPrayStatueCfgInfo): void
        {
            this.cur_pray_statueCfg = statue_cfg;
            if (!this.cur_pray_statueCfg)
                return;
            CommonSend.worldItemLog(Pb_God._emWorldItemLogType.WorldItemLog_Pray1 + statue_cfg.index - 1);
            // 加载对应神像图片 名字
            this.UIPanel.txt_statueName.text = this.cur_pray_statueCfg.name;// 神像名字

            if (!this.treasureChest)
            {
                this.treasureChest = new SkeletonPlayer();
                this.UIPanel.baoXiang.addChild(this.treasureChest);
                this.treasureChest.on(LayaEvent.STOPPED, this, this.onSkStop);
            }
            this.treasureChest.load(UrlMgr.getSpineSceneUrl(this._boxBone[statue_cfg.index - 1]));
            this.treasureChest.playbackRate(0.6);
            this.treasureChest.playByIndex(0, true);

            // 刷新奖励列表
            // let reward_pool = cfg.HeavenPrayPrizePoolCfgData.getDataArrByPool(this.cur_pray_statueCfg.pool);
            // let items_arr: cfg.HeavenPrayPrizeItemsCfgInfo[] = [];
            // for (let i in reward_pool) {
            //     let item_arr = cfg.HeavenPrayPrizeItemsCfgData.getDataArrByType(reward_pool[i].type);
            //     for (let item_cfg of item_arr)
            //         items_arr.push(item_cfg);
            // }
            let poolReviews = this.cur_pray_statueCfg.poolReview.split(";");
            this.UIPanel.rewardList.onRefresh(poolReviews.length, this, (tmpItem: NorItemUI, index: number) =>
            {
                // let tmpAddItemArr = cfg.HeavenPrayPrizeItemsCfgData.getAddItemAryById(items_arr[index].index);
                let itemId = parseInt(poolReviews[index]);
                tmpItem.setItemID(itemId, 0, false, false);
                // tmpItem.setItemInfo(tmpAddItemArr[0]);
            });

            this.refreshUI();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
            //判断背包是否有特殊信物，如果有，则显示信物数量，如果没有，则显示钻石
            let specialCostItem = cfg.HeavenPrayStatueCfgData.getSpecialCostItemInfo(this.cur_pray_statueCfg);
            let tenCostItem = cfg.HeavenPrayStatueCfgData.getCostItemInfo_Ten(this.cur_pray_statueCfg);
            let oneCostItem = cfg.HeavenPrayStatueCfgData.getCostItemInfo_One(this.cur_pray_statueCfg);
            if (Global.isFullRes(specialCostItem.itemid, specialCostItem.itemcount, false))
            {
                this.UIPanel.txt_costOne.text = specialCostItem.itemcount + "";
                Global.setResSmallIconWithItemID(this.UIPanel.img_costOne, specialCostItem.itemid);
            } else
            {
                this.UIPanel.txt_costOne.text = oneCostItem.itemcount + "";
                Global.setResSmallIconWithItemID(this.UIPanel.img_costOne, oneCostItem.itemid);
            }

            if (Global.isFullRes(specialCostItem.itemid, specialCostItem.itemcount * 10, false))
            {
                this.UIPanel.discount.visible = false;
                this.UIPanel.txt_costTen.text = specialCostItem.itemcount * 10 + "";
                Global.setResSmallIconWithItemID(this.UIPanel.img_costTen, specialCostItem.itemid);
            } else
            {
                this.UIPanel.discount.visible = true;
                this.UIPanel.txt_costTen.text = tenCostItem.itemcount + "";
                Global.setResSmallIconWithItemID(this.UIPanel.img_costTen, tenCostItem.itemid);
            }


            this.UIPanel.btn_left.visible = this.cur_pray_statueCfg.index > 1;
            this.UIPanel.btn_right.visible = this.cur_pray_statueCfg.index < cfg.HeavenPrayStatueCfgData.getAllInfo().length;


            this.UIPanel.txt_free.visible = HeavenDungeonDataMgr.prayFreeCount > 0;
            this.UIPanel.prayOneBox.visible = HeavenDungeonDataMgr.prayFreeCount <= 0;
            // 特殊物品消耗
            this.special_item_id = specialCostItem.itemid;
            Global.setResSmallIconWithItemID(this.UIPanel.img_item, this.special_item_id);
            this.UIPanel.txt_itemCount.text = Global.numberToTuckString(Global.getItemNum(this.special_item_id));

            let need_times = cfg.HeavenPrayStatueCfgData.getAlterTimesByIndex(this.cur_pray_statueCfg.index);
            let statue_data = HeavenDungeonDataMgr.getStatueData(this.cur_pray_statueCfg.index);
            let left_times = statue_data ? need_times - statue_data.times : need_times;
            // let best_reward_name = cfg.HeavenPrayPrizeTypeCfgData.getDescByType(this.cur_pray_statueCfg.alterPool);
            this.UIPanel.txt_leftTimes.showText = Global.getLangStr("Heaven_msg2", left_times);
        }

        /**
         * 获取全服神像抽奖记录
         * @param value 
         */
        private onGetListTipDatas(value: Pb_God.PBWorldItemLogs): void
        {
            if (value.type != Pb_God._emWorldItemLogType.WorldItemLog_Pray1 + this.cur_pray_statueCfg.index - 1)
                return;
            let list = value.items;
            let len = list.length;
            this.UIPanel.awardTextBg.visible = (len > 0);
            if (len > 2) len = 2;
            this.UIPanel.listTips.onRefresh(len, this, (tmpItem: Laya.Box, index: number) =>
            {
                let data = list[index];
                let itemId = data.item[0].key;
                let strQu = Global.getLangStr("godQu_" + cfg.ItemCfgData.getQualityById(itemId));
                let itemName = cfg.ItemCfgData.getNameById(itemId);
                let itemCount = data.item[0].value;
                let htmlText = tmpItem.getChildAt(0) as component.UIHtmlText;
                htmlText.showText = Global.getLangStr("Heaven_msg10", data.playername, strQu, itemName, itemCount);
            });
        }

        /**
         * 祈祷1次
         */
        private onPrayOneClick(): void
        {
            this.prayerTimes = 1;
            this.doPray();
        }

        /**
         * 祈祷10次
         */
        private onPrayTenClick(): void
        {
            this.prayerTimes = 10;
            this.doPray();
        }

        /**
         * 请求祈祷
         * @param times 
         */
        private doPray(): void
        {
            let special_item_count = Global.getItemNum(this.special_item_id);
            let need_count = cfg.HeavenPrayStatueCfgData.getSpecialCostItemInfo(this.cur_pray_statueCfg).itemcount * this.prayerTimes;
            // 有免费次数或者有特殊道具
            if (HeavenDungeonDataMgr.prayFreeCount >= this.prayerTimes
                || special_item_count >= need_count)
            {
                //播放动画
                this.treasureChest.playByIndex(1, false);
            }
            else
            {// 钻石检测
                let cost_diamond = cfg.HeavenPrayStatueCfgData.getCostItemInfo_One(this.cur_pray_statueCfg).itemcount * this.prayerTimes;
                if (this.prayerTimes > 1)
                {
                    cost_diamond *= 0.9;
                }
                if (!Global.isFullRes(CfgID.ItemID.Diamond, cost_diamond, true))
                    return;
                //播放动画
                this.treasureChest.playByIndex(1, false);
            }
        }

        /**
         * 当前动画完毕的回调
         */
        private onSkStop(e: LayaEvent)
        {
            this.eequestEward();
            this.treasureChest.playByIndex(0, true);
        }

        /**
         * 请求祈祷
         */
        private eequestEward(): void
        {
            HeavenDungeonSend.pray(this.cur_pray_statueCfg.index, this.prayerTimes);
        }

        /**
         * 添加特殊道具
         */
        private onAddSpecialItemClick(): void
        {
            let special_item = cfg.HeavenPrayStatueCfgData.getSpecialCostItemInfo(this.cur_pray_statueCfg);
            if (!Global.isFullRes(special_item.itemid, special_item.itemcount, true)) return;
        }

        /**
         * 上一个神像
         */
        private onBtnLeftClick(): void
        {
            let last_id = this.cur_pray_statueCfg.index - 1;
            let info = cfg.HeavenPrayStatueCfgData.getInfo(last_id);
            if (!HeavenDungeonDataMgr.isStatueUnlock(info)) return;
            this.initStatue(info);
        }

        /**
         * 下一个神像
         */
        private onBtnRightClick(): void
        {
            let next_id = this.cur_pray_statueCfg.index + 1;
            let info = cfg.HeavenPrayStatueCfgData.getInfo(next_id);
            if (!HeavenDungeonDataMgr.isStatueUnlock(info)) return;
            this.initStatue(info);
        }

        /**
         * 神像
         */
        private onStatueDetailClick(): void
        {
            let desc_normal = Global.getLangStr("Heaven_msg6", this.cur_pray_statueCfg.name);
            let desc_senior = Global.getLangStr("Heaven_msg6", this.cur_pray_statueCfg.name);

            let nor_pool_arr = cfg.HeavenPrayPrizePoolCfgData.getDataArrByPool(this.cur_pray_statueCfg.pool);
            let best_pool_arr = cfg.HeavenPrayPrizePoolCfgData.getDataArrByPool(this.cur_pray_statueCfg.alterPool);
            let sub_rate = 0;
            // 默认奖池
            nor_pool_arr.forEach(e => sub_rate += e.chance);
            for (let d of nor_pool_arr)
            {
                // 每个奖池中奖几率
                let pool_rate = d.chance / sub_rate;//该奖池概率

                let desc_str = cfg.HeavenPrayPrizeTypeCfgData.getDescByType(d.type);
                let show_rate = Math.floor(pool_rate * 10000) / 100;
                desc_str += ":" + show_rate + "%\n";
                desc_normal += desc_str;
            }

            // 替换奖池
            sub_rate = 0;
            best_pool_arr.forEach(e => sub_rate += e.chance);
            for (let d of best_pool_arr)
            {
                // 每个奖池中奖几率
                let key = d.pool + "_" + d.type;
                let pool_rate = d.chance / sub_rate;//该奖池概率

                let desc_str = cfg.HeavenPrayPrizeTypeCfgData.getDescByType(d.type);
                let show_rate = Math.floor(pool_rate * 10000) / 100;
                desc_str += ":" + show_rate + "%\n";
                desc_senior += desc_str;
            }

            let need_times = cfg.HeavenPrayStatueCfgData.getAlterTimesByIndex(this.cur_pray_statueCfg.index);
            let statue_data = HeavenDungeonDataMgr.getStatueData(this.cur_pray_statueCfg.index);
            let left_times = statue_data ? need_times - statue_data.times : need_times;
            let is_show_nor_tips = left_times > 1;// 必出精品剩余次数大于1 显示普通概率 否则显示高级概率

            if (is_show_nor_tips)
                CommonHelpView.show(this.UIPanel.btn_detail, desc_normal);
            else
                CommonHelpView.show(this.UIPanel.btn_detail, desc_senior);
        }
    }
}