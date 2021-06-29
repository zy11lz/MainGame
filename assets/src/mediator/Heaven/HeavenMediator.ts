module Pro
{
    /**
     * 天界副本章节主界面
     */
    export class HeavenMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Heavens.MainUI;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("heavens"), UrlMgr.getAtlas("commontitle01")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            let ret = [];
            for (let i = 1; i <= 48; i++)
            {
                if (i < 10)
                    ret[i - 1] = "res/heavens/tianjie_bg_0" + i + ".png";
                else
                    ret[i - 1] = "res/heavens/tianjie_bg_" + i + ".png";
            }
            ret.push("res/heavens/bg.jpg");
           
            return ret;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.MainUI, 1);
        }

        /** 关闭UI*/
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
            this.addEventMgr(EventNotify.Heaven_BuyCount, this, this.refreshUI);

            this.UIPanel.btn_back.onClick(this, this.closeUI);
            this.UIPanel.btn_rankView.onClick(this, () =>
            {
                // 打开对应排行界面            
                let op_data = new BaseOpenUIData(PanelNotify.Open_RankDetail, Pb_God._emTopListType.TopListType_HeavenStar);
                UIManager.Inst.forceOpen(op_data);
            });

            
            this.UIPanel.btn_embattle.onClick(this, () =>
            {
                // 布阵
                let op_ui_data = new EmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_Heaven1, Pb_God._emBattleType.BattleType_HeavenDungeon);
                op_ui_data.lockEmCount = 2;
                UIManager.Inst.forceOpen(op_ui_data);
            });
            this.UIPanel.btn_pray.onClick(this, () =>
            {
                // 祈祷
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenPrayView));
            });
            this.UIPanel.btn_godEquipView.onClick(this, () =>
            {
                // 神装图鉴
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenGodEquipView));
            });
            this.UIPanel.btn_store.onClick(this, () =>
            {
                // 神装商店
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenGodEquipShopView));
            });
            this.UIPanel.btn_help.onClick(this, () =>
            {
                //帮助提示
                CommonHelpView.show(this.UIPanel.btn_help, Global.getLangStr("heavenTips"));
            });

            // 购买挑战次数
            this.UIPanel.btn_addTimes.onClick(this, () =>
            {
                if (HeavenDungeonDataMgr.cur_challenge_times >= cfg.HeavenCommonCfgData.getMaxCountByID(0))
                {
                    TipsUtils.showTipsByLanId("Heaven_msg7");  //当前挑战次数已满
                    return;
                }
                if (HeavenDungeonDataMgr.can_buy_challenge_times <= 0)
                {
                    TipsUtils.showTipsByLanId("Heaven_msg8"); //购买次数已用完
                    return;
                }

                let text = Global.getLangStr("shop_msg1");
                let needItem = cfg.HeavenCommonCfgData.getCostItemInfobyIndex(0)
                let item_name = cfg.ItemCfgData.getNameById(needItem.itemid);
                let cost_text = needItem.itemcount + item_name;
                text += Global.getLangStr("shop_msg3", cost_text);
                AlertShow.showConfirmAlert(text, this, () =>
                {
                    if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true)) return;
                    HeavenDungeonSend.buyCount();
                });
            });
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {

            this.reddotBind(this.UIPanel.reddot_pray, HeavenDungeonDataMgr.reddot.getChildModel("pray"));

            this.refreshUI();
            let openChapterId = HeavenDungeonDataMgr.getCurOpenChpaterId();
            let allChapterLen = cfg.HeavenChapterCfgData.getAll().length;
            // this.UIPanel.listView.scrollTo(Math.ceil((allChapterLen - openChapterId) / 4));
            let cell = this.UIPanel.listView.getCell(0) as ProUI.Heavens.ChildPage.ChapterGroupItemUI;
            if(cell)
            {
                let cellHeight = cell.height + this.UIPanel.listView.spaceY;
                this.UIPanel.listView.scrollBar.value = cellHeight * this.UIPanel.listView.length -  (openChapterId + 1) * cellHeight / 4
            }

        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
            let allChapterLen = cfg.HeavenChapterCfgData.getAll().length;
            //每个组有4个章节节点
            let nGroupLen = 4;
            let maxGroupCount = Math.ceil(allChapterLen / nGroupLen);
            this.UIPanel.listView.onRefresh(maxGroupCount, this, (groupItem: ProUI.Heavens.ChildPage.ChapterGroupItemUI, grpIndex: number) =>
            {
              
                 
                groupItem.firstArrow.visible = grpIndex != maxGroupCount - 1;  //最后一个的起始箭头不需要显示
                for (let i = 1; i <= nGroupLen; i++)
                {
                    let node: ProUI.Heavens.ChildPage.ChapterItemUI = groupItem["chapter_" + i];
                    //从下往上
                    let chapterIndex = (maxGroupCount - grpIndex - 1) * nGroupLen + i;
                    let skinName = chapterIndex >= 10 ? ("" + chapterIndex) : ("0" + chapterIndex);
                    node.img_bg.skin = "res/heavens/tianjie_bg_" + skinName + ".png";
                    node.txt_name.text = Global.getLangStr("factionboss_msg15", chapterIndex);  // Global.numberToChinese(chapterIndex)


                    let is_unlock = HeavenDungeonDataMgr.isChapterUnlock(chapterIndex);
                    node.gray = !is_unlock;
                    node.btn_reward.visible = is_unlock;
                    // 是否完美通关
                    node.img_finish.visible = HeavenDungeonDataMgr.isChapterPerfecPassed(chapterIndex);

                    //星级奖励红点
                    node.reddotReward.visible = HeavenDungeonDataMgr.checkChapterStarCanReward(chapterIndex);

                    let chapter_btn: component.UIButton = node.chapter_btn;
                    if (is_unlock)
                    {
                        chapter_btn.onClick(this, () =>
                        {
                            // 章节已解锁
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenChapterView, chapterIndex), BaseBackUIType.HideBackUI);
                        });
                    } else
                    {
                        // 章节未解锁
                        chapter_btn.onClick(this, () => { TipsUtils.showTips(Global.getLangStr("factionboss_msg14")) });
                    }


                    node.btn_reward.onClick(this, () =>
                    {
                        // 打开目标奖励界面
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenChapterRewardView, chapterIndex));
                    });
                }
            })
            this.UIPanel.txt_count.text = HeavenDungeonDataMgr.cur_challenge_times + "/" + cfg.HeavenCommonCfgData.getMaxCountByID(0);
            let text_need = HeavenDungeonDataMgr.can_buy_challenge_times + "/" + cfg.HeavenCommonCfgData.getBuyCountByID(0);
            this.UIPanel.txt_leftCount.showText = Global.getLangStr("ui_Faction_FactionBoss_msg5_0", text_need);
        }
    }
}