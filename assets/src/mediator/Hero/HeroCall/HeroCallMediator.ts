module Pro
{
	export class HeroCallMediator extends BaseMediator implements IMediator
	{
		public UIPanel: ProUI.Hero.HeroCall.Main1UI;
		private OldSelectType: number;
		/**选中的抽卡index */
		private _selectedType: number;
		private _SkName = ["yusanjia", "youqingchouka", "gaojichouka"];
		private _skPos = [[-70, 0], [0, -30], [-70, -30]];
		private _tempUI: ProUI.Hero.HeroCall.ListItem1UI[]
		/** (touch_start_X,touch_start_Y)：手指按下时的坐标*/
		private _touch_start_X = 0; _touch_start_Y = 0;
		/**鼠标点击按钮滑动的方向 1：右  2：左*/
		private _direction: number;
		/**鼠标点击按钮滑动距离*/
		private _absolute: number;
		//是否处于移动状态
		private OnMove: boolean = true;
		//是否处于移动状态
		private OnMove1: boolean = true;
		//是否处于移动状态
		private OnMove2: boolean = true;
		//背景骨骼动画
		private _sk: Pro.SkeletonPlayer;

		/** 需要自动加载的资源列表 */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("herocall")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return ["res/herocall/zhaohuan_pic01.png",
				"res/herocall/zhaohuan_pic02.png",
				"res/herocall/zhaohuan_pic03.png",
				"res/herocall/zhaohuan_pic04.png",
				"res/herocall/Chouka_butoom_gapji.png",
				"res/herocall/Chouka_butoom_jichu.png",
				"res/herocall/Chouka_butoom_youqing.png"

			];
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroCall.Main1UI, 3);
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			this._isAutoReleaseRes = false;
			this.adjustScreenPos();
		}

		private adjustScreenPos()
		{
			this.UIPanel.height = GameConfig.curHeight();
			this.UIPanel.y = 0;
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
			this.UIPanel.HelpBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallRule));
			});
			this.addEventMgr(CmdEvent.Call_Update, this, this.refreshUI);
			this.addEventMgr(Cmd.S2C_Common_ShowPrize, this, this.onShowPrize);

			this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);

			CallDataMgr.reddotModel.getChildModel("CallPoint").on(Laya.Event.CHANGE, this, this.refreshCallPointRedDot);

		}



		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{
			if (this._sk)
			{
				this._sk.offAll();
				this._sk.removeSelf();
				this._sk = null;
			}
			CallDataMgr.reddotModel.getChildModel("CallPoint").off(Laya.Event.CHANGE, this, this.refreshCallPointRedDot);
			CallDataMgr.reddotModel.setRedDot(0);
			this.refreshScoreCallBtnState(false);
			//this.closePanel(0, true, false);
			Laya.timer.clear(this, this.onItemRefresh);
		}

		/**
		 * 初始化面板ui
		 */
		public initUI(): void
		{
			Laya.timer.loop(1000, this, this.onItemRefresh);
			this._selectedType = 2;
			this.UIPanel.temp0.x = -27, this.UIPanel.temp1.x = 777, this.UIPanel.temp2.x = 375;
			this.refreshUI();
			this.refreshCallPointRedDot(CallDataMgr.reddotModel.getChildModel("CallPoint"));
			this.UIPanel.RecommendBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroStronger, 2));
			});
		}

		public refreshUI()
		{
			this.refreshCallPoint();
			this.onItemRefresh();
			this.refreshCardInformation(this._selectedType);
			//	this.tabMove(this._selectedType);
		}

		/** 积分召唤红点 */
		private refreshCallPointRedDot(reddot: RedDotModel): void
		{
			this.refreshScoreCallBtnState(reddot.isRedDot);
		}

		// /** 刷新底部tab位置 */
		// private refreshPosition()
		// {
		// 	this._tempUI = [this.UIPanel.temp0, this.UIPanel.temp1, this.UIPanel.temp2];
		// 	for (let i = 0; i < 3; i++)
		// 	{ 

		// 	}
		// }

		/** 刷新积分召唤宝箱显示状态 */
		private refreshScoreCallBtnState(isLight: boolean): void
		{

			if (isLight)
			{
				EffectAni.Inst.addAwardBoxAni(this.UIPanel.ScoreCallBtnIcon);
				Public.EffectUtils.shakeAndStop(this.UIPanel.ScoreCallBtnIcon);
			}
			else
			{
				Public.EffectUtils.clearShakeAndStop(this.UIPanel.ScoreCallBtnIcon);
				EffectAni.Inst.removeAwardBoxAni(this.UIPanel.ScoreCallBtnIcon)
			}
		}

		//-------------------------------召唤展示----------------------------------
		private onShowPrize(value: Pb_God.PBG2CCommonShowPrize)
		{
			if (value.doingtype != Pb_God._emDoingType.DoingType_PetCall)
			{
				return;
			}

			// 显示中的话，就交给界面自己显示了。
			if (UIManager.Inst.checkUIShowState(PanelNotify.Open_HeroCallReward, false))
			{ return; }
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallReward, value, this.OldSelectType));
			GuideMgr.Inst.clearStepData();
		}

		/** 刷新道具数量 */
		private onItemNumChange(fID: number, tempNewNum: number): void
		{
			if (fID == CfgID.ItemID.CallPoint)
			{
				this.refreshCallPoint();
			}
		}

		//-------------------------------刷新积分召唤-------------------------------
		private refreshCallPoint()
		{
			let tempCallPoint = Global.getItemNum(CfgID.ItemID.CallPoint);
			let tempJifenCallType = CallDataMgr.getJifenCallType();
			let tempOneNeedItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(tempJifenCallType, 1)[0];
			let tempJifenProNum = Math.min(tempCallPoint / tempOneNeedItem.itemcount, 1);
			this.UIPanel.ScoreCallProImg.width = tempJifenProNum * 95;
			this.UIPanel.ScoreCallProLb.text = Global.numberToTuckString(tempCallPoint) + "/" + Global.numberToTuckString(tempOneNeedItem.itemcount);
			this.UIPanel.ScoreCallBtn.onClick(this, this.onScoreCallBtnClick);
		}

		private onScoreCallBtnClick(btn: component.UIButton)
		{
			this.OldSelectType = CallDataMgr.getJifenCallType();
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallScoreCall));
		}

		//-------------------------------刷新抽卡类型-------------------------------

		private onItemRefresh()
		{
			this._tempUI = [this.UIPanel.temp0, this.UIPanel.temp1, this.UIPanel.temp2];
			for (let i = 0; i < 3; i++)
			{

				//抽取类型
				let tempCallType = CallDataMgr.getBaseCallTypeAry()[i];
				//抽取类型名称和描述
				this._tempUI[i].BGFrameImg.frame = 1 + i;
				this._tempUI[i].BGguang.visible = this._selectedType == i ? true : false;
				//抽一次免费剩余时间
				let tempFreeCallTime = cfg.PetCallCallCfgData.getFreeResetTimeByCallType(tempCallType);
				let tempLastTime = CallDataMgr.getNextFreeTime(tempCallType) - TimeController.currTimer;
				if (tempLastTime > 0)
				{
					this._tempUI[i].LastTimeHtmlTxt.showText = Global.getLangStr("ui_HeroCall_msg8", Global.GetRemindTime(tempLastTime / 1000, 4));
				}
				this._tempUI[i].LastTimeHtmlTxt.visible = tempLastTime > 0 && tempFreeCallTime.length > 0;

				// 修改字体描边  
				let strokeColor = ["#385085", "#d5263b", "#9c6a29"]
				this._tempUI[i].LastTimeHtmlTxt.fontStrokeColor = strokeColor[tempCallType - 1];
				this._tempUI[i].on(LayaEvent.MOUSE_DOWN, this, function ()
				{
					this._touch_start_X = Laya.stage.mouseX;
					this._touch_start_Y = Laya.stage.mouseY;
				});
				this._tempUI[i].on(LayaEvent.MOUSE_UP, this, this.onItemClick, [i]);
			}

		}

		/**获取移动方向 */
		private onItemClick(index: number)
		{
			let touch_current_X = Laya.stage.mouseX;
			let touch_current_Y = Laya.stage.mouseY;
			if (Math.abs(touch_current_X - this._touch_start_X) > Math.abs(touch_current_Y - this._touch_start_Y) && touch_current_X > this._touch_start_X)
			{
				this._direction = 1;//右
			} else if (Math.abs(touch_current_X - this._touch_start_X) > Math.abs(touch_current_Y - this._touch_start_Y) && touch_current_X < this._touch_start_X)
			{
				this._direction = 2;//左
			}
			this._absolute = Math.abs(touch_current_X - this._touch_start_X);
			this.tabMove(index);
		}

		/**抽卡的ui进行缓动 */
		private tabMove(index: number)
		{
			//如果点击中间
			if (this._tempUI[index].x < 380 && this._tempUI[index].x > 370 && this._absolute < 5)
			{
				return;
			}

			//如果在移动中，点击无效
			if (!this.OnMove && !this.OnMove1 && !this.OnMove2)
				return;
			this.OnMove = false;
			this.OnMove1 = false;
			this.OnMove2 = false;
			//如果点击的是两边中的一个且滑动距离过短，不必理会方向，向中间移动
			if (this._tempUI[index].x < -20 && this._tempUI[index].x > -40 && this._absolute < 5)
			{
				this._direction = 1;
			} else if (this._tempUI[index].x < 780 && this._tempUI[index].x > 770 && this._absolute < 5)
			{
				this._direction = 2;
			}

			/** 0:向左移动 1：向中间移动 2：向右移动 3：向左移动超出范围挪到右边 4：向右移动超出范围挪到左边 */
			let slow_actionGroup = [
				(i) => { Laya.Tween.to(this._tempUI[i], { x: -27 }, 300, null, Laya.Handler.create(this, () => { this.OnMove1 = true })); },
				(i) =>
				{
					Laya.Tween.to(this._tempUI[i], { x: 375 }, 300, null, Laya.Handler.create(this, () => { this.OnMove2 = true }));
					this.refreshCardInformation(i);
				},
				(i) => { Laya.Tween.to(this._tempUI[i], { x: 777 }, 300, null, Laya.Handler.create(this, () => { this.OnMove1 = true })); },
				(i) =>
				{
					Laya.Tween.to(this._tempUI[i], { x: -190 }, 150, null, Laya.Handler.create(this, () =>
					{
						this._tempUI[i].x = 946;
						Laya.Tween.to(this._tempUI[i], { x: 777 }, 150, null, Laya.Handler.create(this, () => { this.OnMove = true }));
					}));
				},
				(i) =>
				{
					Laya.Tween.to(this._tempUI[i], { x: 946 }, 150, null, Laya.Handler.create(this, () =>
					{
						this._tempUI[i].x = -190;
						Laya.Tween.to(this._tempUI[i], { x: -27 }, 150, null, Laya.Handler.create(this, () => { this.OnMove2 = true }));
					}));
				}
			];


			//通过判断单个ui的位置和滑动方向，进行移动
			for (let i = 0; i < 3; i++)
			{
				let j: number;
				if (this._tempUI[i].x < -20 && this._tempUI[i].x > -40)
				{
					j = this._direction == 1 ? 1 : 3;
					slow_actionGroup[j](i);
				}
				else if (this._tempUI[i].x < 380 && this._tempUI[i].x > 370)
				{
					j = this._direction == 1 ? 2 : 0;
					slow_actionGroup[j](i);
				}
				else
				{
					j = this._direction == 1 ? 4 : 1;
					slow_actionGroup[j](i);
				}
			}

		}

		/**刷新抽卡信息 */
		private refreshCardInformation(index: number)
		{
			//抽取类型
			let tempCallType = CallDataMgr.getBaseCallTypeAry()[index];
			this._selectedType = index;
			let uiBgName = "bg_chouka_" + tempCallType + ".jpg";
			this.setUIBG(Global.getUIBGPathWithResUrl(uiBgName));
			let SkName = this._SkName[tempCallType - 1]
			if (!this._sk)
			{
				this._sk = new Pro.SkeletonPlayer();
				this.UIPanel.SkelBg.addChild(this._sk);
				this._sk.load(UrlMgr.getSpineSceneUrl("chouka/" + SkName + "/" + SkName));
				this._sk.playByIndex(0, true);
				let maxScale = Math.max(GameConfig.curHeight() / GameConfig.WinHeight, GameConfig.curWidth() / GameConfig.WinWidth);
				this._sk.scale(maxScale, maxScale);
			}
			else
			{
				this._sk.load(UrlMgr.getSpineSceneUrl("chouka/" + SkName + "/" + SkName));
				this._sk.playByIndex(0, true);
			}

			//抽取类型名称和描述
			this.UIPanel.CardType.frame = tempCallType;
			// 修改字体描边  
			let strokeColor = ["#385085", "#d5263b", "#9c6a29"]
			this.UIPanel.DesLb.text = cfg.PetCallCallCfgData.getDescByCallType(tempCallType);
			this.UIPanel.DesLb.strokeColor = strokeColor[tempCallType - 1];

			if (tempCallType == 3)
			{

				this.UIPanel.BGStatueImg2.visible = this.UIPanel.CallImg2.visible = this.UIPanel.CallLb2.visible = true;
				//消耗的道具剩余个数
				let tempTenNeedItems = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(tempCallType, 10);
				let tempTenNeedItem = tempTenNeedItems[0];
				Global.setResIconWithItemID(this.UIPanel.CallImg2, CfgID.ResType.Item, tempTenNeedItem.itemid);
				this.UIPanel.CallLb2.text = Global.numberToTuckString(Global.getItemNum(tempTenNeedItem.itemid));
			}
			else
			{
				this.UIPanel.BGStatueImg2.visible = this.UIPanel.CallImg2.visible = this.UIPanel.CallLb2.visible = false;
			}

			//抽一次免费剩余时间
			let tempFreeCallTime = cfg.PetCallCallCfgData.getFreeResetTimeByCallType(tempCallType);
			let tempLastTime = CallDataMgr.getNextFreeTime(tempCallType) - TimeController.currTimer;
			this.UIPanel.OneCallFreeLb.visible = tempLastTime <= 0 && tempFreeCallTime.length > 0;
			this.UIPanel.OneCallImg.visible = (tempLastTime > 0 && tempFreeCallTime.length > 0) || tempFreeCallTime.length == 0;
			this.UIPanel.OneCallLb.visible = this.UIPanel.OneCallImg.visible;

			//抽一次
			let tempOneNeedItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(tempCallType, 1)[0];
			this.UIPanel.OneCallBtn.onClick(this, () =>
			{
				this.onOneCallBtnClick(tempCallType);
			});

			//抽10次
			let tempTenNeedItems = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(tempCallType, 10);
			this.UIPanel.TenCallBtn.onClick(this, () =>
			{
				this.onTwnCallBtnClick(tempCallType);
			});

			//红点
			this.UIPanel.reddotOneCall.visible = false;
			this.UIPanel.reddotTenCall.visible = false;

			//1次的红点
			if (this.UIPanel.OneCallFreeLb.visible)
			{
				this.UIPanel.reddotOneCall.visible = true;
			} else
			{
				//策划需求高级召唤 免费才显示红点，不免费的话 即时有单抽券也不显示
				if (tempCallType == 3)
					this.UIPanel.reddotOneCall.visible = false;
				else
					this.UIPanel.reddotOneCall.visible = Global.isFullRes(tempOneNeedItem.itemid, tempOneNeedItem.itemcount, false);
			}
			if (tempCallType <= 2) this.UIPanel.reddotOneCall.visible = false;

			//10次的红点
			this.UIPanel.reddotTenCall.visible = Global.isFullSingleRes(tempTenNeedItems, false);

			//高级召唤卷不够可商店购买
			if (tempCallType == 3)
			{
				//单抽非免费中
				if (!this.UIPanel.OneCallFreeLb.visible)
				{
					if (Global.isFullRes(tempOneNeedItem.itemid, tempOneNeedItem.itemcount, false))
					{
						Global.setResIconWithItemID(this.UIPanel.OneCallImg, CfgID.ResType.Item, tempOneNeedItem.itemid);
						Global.setResNumWithItemInfo(this.UIPanel.OneCallLb, tempOneNeedItem.itemid, tempOneNeedItem.itemcount);
					}
					else
					{
						let tmpBuyOneInfo = cfg.ShopFixShopCfgData.getInfoByTypeAndIndex(Pb_God._emShopType.ShopType_Common, 1);
						let tmpNeedItemInfo = ShopUtils.getNeedItemByCfgInfo(tmpBuyOneInfo);
						Global.setResIconWithItemID(this.UIPanel.OneCallImg, CfgID.ResType.Item, tmpNeedItemInfo.itemid);
						Global.setResNumWithItemInfo(this.UIPanel.OneCallLb, tmpNeedItemInfo.itemid, tmpNeedItemInfo.itemcount);
						this.UIPanel.OneCallBtn.onClick(this, () =>
						{
							this.OldSelectType = tempCallType;
							UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallExpandResCall, 1));
						});
					}
				}
				//10抽, 检查材料列表， 只要有一个满足就够了
				let hasNeedFull = false;
				for (let needItem of tempTenNeedItems)
				{
					if (Global.isFullRes(needItem.itemid, needItem.itemcount, false))
					{
						Global.setResIconWithItemID(this.UIPanel.TenCallImg, CfgID.ResType.Item, needItem.itemid);
						Global.setResNumWithItemInfo(this.UIPanel.TenCallLb, needItem.itemid, needItem.itemcount);
						hasNeedFull = true;
						break;
					}
				}
				if (!hasNeedFull)
				{
					let tmpBuyOneInfo = cfg.ShopFixShopCfgData.getInfoByTypeAndIndex(Pb_God._emShopType.ShopType_Common, 2);
					let tmpNeedItemInfo = ShopUtils.getNeedItemByCfgInfo(tmpBuyOneInfo);
					Global.setResIconWithItemID(this.UIPanel.TenCallImg, CfgID.ResType.Item, tmpNeedItemInfo.itemid);
					Global.setResNumWithItemInfo(this.UIPanel.TenCallLb, tmpNeedItemInfo.itemid, tmpNeedItemInfo.itemcount);
					this.UIPanel.TenCallBtn.onClick(this, () =>
					{
						this.OldSelectType = tempCallType;
						UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallExpandResCall, 2));
					});
				}
			}
			else
			{
				var tempTenNeedItem = tempTenNeedItems[0];
				Global.setResIconWithItemID(this.UIPanel.OneCallImg, CfgID.ResType.Item, tempOneNeedItem.itemid);
				Global.setResNumWithItemInfo(this.UIPanel.OneCallLb, tempOneNeedItem.itemid, tempOneNeedItem.itemcount);
				Global.setResIconWithItemID(this.UIPanel.TenCallImg, CfgID.ResType.Item, tempTenNeedItem.itemid);
				Global.setResNumWithItemInfo(this.UIPanel.TenCallLb, tempTenNeedItem.itemid, tempTenNeedItem.itemcount);
			}

			//消耗的道具剩余个数
			Global.setResIconWithItemID(this.UIPanel.CallImg, CfgID.ResType.Item, tempOneNeedItem.itemid);
			this.UIPanel.CallLb.text = Global.numberToTuckString(Global.getItemNum(tempOneNeedItem.itemid));
			this.onItemRefresh();

		}

		private onOneCallBtnClick(tempCallType: number)
		{
			let tempFreeCallTime = cfg.PetCallCallCfgData.getFreeResetTimeByCallType(tempCallType);
			let tempLastTime = CallDataMgr.getNextFreeTime(tempCallType) - TimeController.currTimer;
			if (tempFreeCallTime.length > 0 && tempLastTime <= 0)
			{
				CallSend.free(tempCallType);
				this.OldSelectType = tempCallType;
			}
			else
			{
				if (CallDataMgr.sendCall(tempCallType, false))
				{ this.OldSelectType = tempCallType; }
			}
		}

		private onTwnCallBtnClick(tempCallType: number)
		{
			if (CallDataMgr.sendCall(tempCallType, true))
			{ this.OldSelectType = tempCallType; }
		}

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.NormalCall_3_2)
			{
				//这一步要判断一下，如果有两个英雄了，就往后跳
				if (PetDataMgr.getPetList().length >= 2)
				{
					GuideMgr.Inst.jumpActive(GuideStep.NormalCall_3_4);
					return;
				}
				Laya.timer.once(100, this, () =>
				{
					//后面还有个动画，点击按钮后不能往下一步走，等动画结束后才能往后走
					GuideMgr.Inst.showFinger(this.UIPanel.OneCallBtn, false, this.UIPanel.OneCallBtn, 2); //2-2-点击按钮后，触发一次原始按钮，但引导不往下走
				});
			}
			else if (step == GuideStep.HigherCall_10_5 || step == GuideStep.NormalCall_3_5)
			{
				Laya.timer.once(100, this, () =>
				{
					GuideMgr.Inst.showFinger(this.UIPanel.OneCallBtn, false, this.UIPanel.OneCallBtn, 2); //2-2-点击按钮后，触发一次原始按钮，但引导不往下走
				});
			}
		}
	}
}