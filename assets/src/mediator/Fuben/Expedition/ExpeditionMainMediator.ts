
module Pro
{
	/**
	 * 远征
	 */
	export class ExpeditionMainMediator extends BaseMediator implements IMediator
	{
		public UIPanel: ProUI.Fuben.Expedition.MainUI;

		private _bound: Laya.Rectangle;

		private _mapDraging: Laya.Dragging;

		/** 宝箱特效列表 */
		private _effNodes: EffNode[] = [];

		/** 关卡按钮y的坐标 */
		private _coordinateBtn = [];

		/** 需要自动加载的资源列表 */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("heroexpedit")]
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return [this.UIPanel.MapInfo.BGImg.skin];
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Fuben.Expedition.MainUI, 0, BaseAddLayer.CenterUI, false, 1); //,GameConfig.curWidth(),GameConfig.curHeight()
		}

		/*** 关闭UI */
		public closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			this.UIPanel.MapInfo.MapLayer.scale(GameConfig.WinScaleFit, GameConfig.WinScaleFit);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.UIPanel.HelpBtn.onClick(this, this.onClickHelp);
			this.UIPanel.ShopBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_Expedition));
			});
			this.UIPanel.SupportBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FightSupport, Pb_God._emFriendSupportType.FriendSupportType_Expedition));
			});
			this.addEventMgr(CmdEvent.Expedition_StagePrizeAck, this, this.refreshUI);
			this.addEventMgr(CmdEvent.Expedition_SynCurStage, this, this.refreshUI);

			// this.addEventMgr(EventNotify.Battle_Result_Close, this, (battleType: number) =>
			// {
			// 	if (ExpeditionDataMgr.autoExpedition > 0 && battleType == Pb_God._emBattleType.BattleType_Expedition)
			// 	{
			// 		UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionFight, ExpeditionDataMgr.getCurstage()));
			// 		ExpeditionDataMgr.initAutoExpeditionLoop();
			// 	}
			// });
			this.UIPanel.on(Laya.Event.MOUSE_DOWN, this, this.onMapInfoDown);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{
			this.UIPanel.off(Laya.Event.MOUSE_DOWN, this, this.onMapInfoDown);
		}

		private onClickHelp(btn: component.UIButton): void
		{
			CommonHelpView.showWithLangKey(btn, "expedition_help");
		}

		/**
		 * 初始化面板ui
		 */
		public initUI(): void
		{
			this.UIPanel.MapInfo.MapLayer.mouseEnabled = true;
            this.UIPanel.MapInfo.MapLayer.mouseThrough = true;
			this._mapDraging = new Laya.Dragging;
            this._bound = new Laya.Rectangle(0, (-this.UIPanel.MapInfo.height + Laya.stage.height) / 2, 0, (this.UIPanel.MapInfo.MapLayer.height - Laya.stage.height) / 2);
            this._mapDraging.start(this.UIPanel.MapInfo.MapLayer, this._bound, true, 0, 300, null, true);
            this._mapDraging.stop();

			let tmpStageType = ExpeditionDataMgr.getCurtype();
			if (tmpStageType == Pb_God._emExpeditionType.ExpeditionType_Simple)
			{
				this.UIPanel.TItleLb.text = Global.getLangStr("fight_msg15", Global.getLangStr("common_difficulty2")) //英雄远征(普通)";
			}
			else if (tmpStageType == Pb_God._emExpeditionType.ExpeditionType_Difficulty)
			{
				this.UIPanel.TItleLb.text = Global.getLangStr("fight_msg15", Global.getLangStr("common_difficulty3")) //英雄远征(困难)";
			}
			else if (tmpStageType == Pb_God._emExpeditionType.ExpeditionType_Hell)
			{
				this.UIPanel.TItleLb.text = Global.getLangStr("fight_msg15", Global.getLangStr("common_difficulty4")) //英雄远征(地狱)";
			}
			this.refreshUI();
		}

		public refreshUI()
		{
			this.refreshRewardStatue();
			this.refreshStageStatue();
		}


		private onMapInfoDown(event: any)
        {
			this._mapDraging.stop();
  			this._mapDraging.start(this.UIPanel.MapInfo.MapLayer, this._bound, true, 0, 300, null, true);
        }

		/** 刷新已获得奖励 */
		private refreshRewardStatue()
		{

			let tmpAllPrize = new ds.StringMap<number>();
			tmpAllPrize.put(CfgID.ItemID.Gold, 0);
			tmpAllPrize.put(CfgID.ItemID.ExpetitionPoint, 0);
			let tmpPrizeList: cfg.AddItemInfo[] = [];

			let tmpPrizeIds = ExpeditionDataMgr.getPrizeIds();
			tmpPrizeIds.forEach(elment =>
			{
				tmpPrizeList = tmpPrizeList.concat(cfg.ExpeditionStageCfgData.getExtraPrizeAryById(elment));
			});

			//再加上关卡奖励
			let tmpCfgList = cfg.ExpeditionStageCfgData.getListWithType(ExpeditionDataMgr.getCurtype());
			let curStage = ExpeditionDataMgr.getCurstage();
			for (var cfgInfo of tmpCfgList)
			{
				if (cfgInfo.stageID >= curStage) { continue; }
				tmpPrizeList = tmpPrizeList.concat(cfg.ExpeditionStageCfgData.getAddPrizeAryById(cfgInfo.index));
			}

			tmpPrizeList.forEach(elmentPrize =>
			{
				let tmpNum = tmpAllPrize.get(elmentPrize.itemid);
				if (tmpNum == null)
				{
					tmpNum = 0;
				}
				tmpNum += elmentPrize.itemcount;
				tmpAllPrize.put(elmentPrize.itemid, tmpNum);
			});

			let tmpAllKeys = tmpAllPrize.getKeys();
			this.UIPanel.TodayRewardBox.onRefresh(tmpAllKeys.length, this, (itemUI: Laya.Box, index: number) =>
			{
				let tmpItemID = parseInt(tmpAllKeys[index]);
				let tmpItemCount = tmpAllPrize.get(tmpItemID);
				let tmpIconImg = itemUI.getChildByName("icon") as Laya.Image;
				let tmpNumLb = itemUI.getChildByName("txtValue") as component.UILabel;
				Global.setResIconWithItemID(tmpIconImg, CfgID.ResType.Item, tmpItemID);
				Global.setResNumWithItemInfo(tmpNumLb, tmpItemID, tmpItemCount);
			});
		}

		/** 刷新关卡状态 */
		private refreshStageStatue()
		{
			let tmpNIndex = 0;
			let tmpCfgList = cfg.ExpeditionStageCfgData.getListWithType(ExpeditionDataMgr.getCurtype());
			for (let index = 0; index < tmpCfgList.length / 3; index++)
			{
				for (let i = 0; i < 3; i++)
				{

					let tmpIndex = index * 3 + i;
					let tmpInfo = tmpCfgList[tmpIndex];

					let tmpBtn = this.UIPanel.MapInfo.PointBox.getChildAt(tmpNIndex++) as component.UIButton;
					let tmpTipsImg = tmpBtn.getChildAt(0) as component.UIFrameImage;
					// let tmpExtralPrizeList = cfg.ExpeditionStageCfgData.getExtraPrizeAryById(tmpInfo.stageID);
					tmpBtn.gray = tmpInfo.stageID > ExpeditionDataMgr.getCurstage();
					tmpTipsImg.visible = !tmpBtn.gray;
					let frame = ExpeditionDataMgr.getCurstage() - 1 >= tmpInfo.stageID ? 2 : 1;
					tmpTipsImg.frame = frame;
					Laya.Tween.clearAll(tmpTipsImg);
					if (frame == 1 && tmpTipsImg.visible)
					{
						if (this._coordinateBtn[0] != tmpNIndex)
							this._coordinateBtn = [tmpNIndex, tmpTipsImg.y];
						let coordinateY = this._coordinateBtn[1];
						Laya.Tween.to(tmpTipsImg, { y: coordinateY - 10 }, 700, Laya.Ease.linearOut, Laya.Handler.create(this, this.onTween2, [tmpTipsImg]));
					} else
					{
						tmpTipsImg.visible = false;
					}
					// eslint-disable-next-line no-loop-func
					tmpBtn.onClick(this, () =>
					{
						if (tmpBtn.gray)
						{
							TipsUtils.showTipsByLanId("tips_msg26");
						}
						else
						{
							UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionFight, tmpInfo.index));
						}
					});

					//领奖
					if (i == 2)
					{

						let tmpStageID = cfg.ExpeditionStageCfgData.getStageIDByIndex(tmpInfo.stageID);
						let tmpIsPrized = ExpeditionDataMgr.getPrizeid(tmpInfo.index);
						let tmpCanPrize = !tmpIsPrized && ExpeditionDataMgr.getCurstage() - 1 >= tmpStageID;
						let tmpRewardBtn = this.UIPanel.MapInfo.PointBox.getChildAt(tmpNIndex++) as component.UIButton;
						let frameImg = tmpRewardBtn.getChildByName("frameImg") as component.UIFrameImage;
						frameImg.frame = tmpIsPrized ? 2 : 1;
						if (tmpCanPrize)
						{
							EffectAni.Inst.addAwardBoxAni(frameImg);
							Public.EffectUtils.shakeAndStop(frameImg);
						}
						else
						{
							EffectAni.Inst.removeAwardBoxAni(frameImg);
							Public.EffectUtils.clearShakeAndStop(frameImg);
						}
						if (!tmpIsPrized)
						{
							// eslint-disable-next-line no-loop-func
							tmpRewardBtn.onClick(this, () =>
							{
								if (tmpCanPrize)
								{
									ExpeditionSend.stagePrize(tmpInfo.index);
								}
								else
								{
									UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionReward, tmpInfo.index));
								}
							});
						}
						else
						{
							tmpRewardBtn.onClick(null, null);
						}
					}
				}
			}
		}

		/** 上下漂浮方法 */
		onTween1(tmpTipsImg: any): void
		{
			Laya.Tween.to(tmpTipsImg, { y: tmpTipsImg.y - 10 }, 700, Laya.Ease.linearOut, Laya.Handler.create(this, this.onTween2, [tmpTipsImg]));
		}
		onTween2(tmpTipsImg: any): void
		{
			Laya.Tween.to(tmpTipsImg, { y: tmpTipsImg.y + 10 }, 700, Laya.Ease.linearOut, Laya.Handler.create(this, this.onTween1, [tmpTipsImg]));
		}


		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.Func_Expedition_5)
			{
				Laya.timer.once(100, this, () =>
				{
					let tmpBtn = this.UIPanel.MapInfo.PointBox.getChildAt(0) as component.UIButton;
					GuideMgr.Inst.showFinger(tmpBtn, true, tmpBtn);
				});
			}
		}

		// /**
		//  * 操作本步引导
		//  */
		// public Guide_Active(step: GuideStep) {
		// 	if (step == GuideStep.Func_Expedition_5) {
		// 		let tmpBtn = this.UIPanel.MapInfo.PointBox.getChildAt(0) as component.UIButton;
		// 		tmpBtn.activeEvent();
		// 		GuideMgr.Inst.nextActive();
		// 	}
		// }
	}
}