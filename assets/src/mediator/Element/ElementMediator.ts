
module Pro
{
	/**
	 * 元素圣殿
	 */
	export class ElementMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Element.MainUI;
		private _timerTarget = 0;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("element")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Element.MainUI, 3);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 检查UI是否能被重新拉起来 */
		public checkCanDisplayUI(): boolean
		{
			//如果当前正在观看对应的战斗，则界面还不能拉起来，等战斗结束后才能拉
			if (BattleMgr.Inst.getWatchBattleType() == Pb_God._emBattleType.BattleType_Element) return false;
			return super.checkCanDisplayUI();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.UIPanel.HelpBtn.onClick(this, () =>
			{
				let strHelp = Global.getLangStr("element_help");
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
			});
			this.UIPanel.RankBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetailReward, Pb_God._emTopListType.TopListType_Element));
			});
			for (let i = 1; i <= 5; i++)
			{
				let tmpBtn = this.UIPanel.getChildByName("MapDot_" + i) as ProUI.Element.OpenTimeItemUI;
				tmpBtn.NameLb.text = cfg.ElementOpentimeCfgData.getNameByType(i);
				tmpBtn.TimeTipsLb.text = cfg.ElementOpentimeCfgData.getOpenTimeTipsByType(i);
				tmpBtn.onClick(this, this.onMapInfoClick);
			}

			//设置购买战斗次数信息
			this.UIPanel.BuyTimesInfo.initialization(Pb_God._emBattleType.BattleType_Element);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			Laya.timer.loop(1000, this, this.onTimeRefresh);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{
			Laya.timer.clear(this, this.onTimeRefresh);
		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			for (let i = 1; i <= 5; i++)
			{
				let tmpTimeInfo = cfg.ElementOpentimeCfgData.getOpenTimeInfoByID(i);
				let tmpBtn = this.UIPanel.getChildByName("MapDot_" + i) as ProUI.Element.OpenTimeItemUI;
				let lock = !tmpTimeInfo.isInOpenTime(TimeController.currTimer, TimeController.worldCreateZeroTime);
				tmpBtn.frameBg.frame = i;
				tmpBtn.frameBg.gray = lock;
				tmpBtn.frameHeadIconBg.frame = lock ? 2 : 1;
				if (lock)
				{
					tmpBtn.BossIconImg.skin = "";
				} else
				{
					let stageCfgInfo = cfg.ElementStageCfgData.getInfoWithType(ElementDataMgr.getActivityWeek(), i)[0];
					let bossMonster = cfg.ElementMonsterNewCfgData.getBossMonsterInfoById(stageCfgInfo.monster);
					Global.setResIconWithItemID(tmpBtn.BossIconImg, CfgID.ResType.Pet, bossMonster.skinId);
					//当天24点
					let endDate = new Date(TimeController.currTimer);
					endDate.setHours(23, 59, 59, 999); //延伸到当天的23:59:59
					this._timerTarget = endDate.getTime();
				}
				// tmpBtn.TimeTipsLb.color = lock ? "#c61f2f" : "#4eff00";

			}
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		onTimeRefresh()
		{
			for (let i = 1; i <= 5; i++)
			{
				let tmpTimeInfo = cfg.ElementOpentimeCfgData.getOpenTimeInfoByID(i);
				let tmpBtn = this.UIPanel.getChildByName("MapDot_" + i) as ProUI.Element.OpenTimeItemUI;
				if (!tmpBtn.frameBg.gray)
				{
					let tmpEndTime = tmpTimeInfo.getEndTime(TimeController.currTimer);
					// let tmpPassTime = tmpEndTime - TimeController.currTimer;
					let tmpPassTime =  this._timerTarget - TimeController.currTimer;// 当天结束时间
					tmpBtn.TimeTipsLb.color = "#fecd08"
					tmpBtn.TimeTipsLb.text = Global.getLangStr("element_msg3", Global.GetRemindTime(tmpPassTime / 1000, 4))
				}else{
					tmpBtn.TimeTipsLb.stroke = 0;
					tmpBtn.TimeTipsLb.strokeColor = ""
					tmpBtn.TimeTipsLb.color = "#c9c9c9"
				}
			}
		}

		/** 点击了小地图 */
		onMapInfoClick(btn: ProUI.Element.OpenTimeItemUI)
		{
			let tmpType = parseInt(btn.name.substr(btn.name.length - 1, 1)) as Pb_God._emPetType;
			if (btn.frameBg.gray)
			{
				TipsUtils.showTips(cfg.ElementOpentimeCfgData.getOpenTimeTipsByType(tmpType));
				return;
			}
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ElementDetail, tmpType));
		}
	}
}