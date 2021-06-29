
module Pro
{
	/**
	 * 试炼塔主界面
	 */
	export class StarTowerMainMediator extends BaseMediator implements IMediator
	{

		/** UI面板 */
		UIPanel: ProUI.StarTower.MainUI;

		/** 当前打开的试炼塔类型 */
		protected _type = 1;
		/** 对应的战斗类型 */
		protected _battleType = Pb_God._emBattleType.BattleType_Tower;

		/** 所有层数据 */
		TowerDataList: Array<cfg.TrainTowerCfgInfo>;

		/** 当前正进行的关卡层数 */
		CurrentStageNum: number;

		/** 塔背景 */
		_towerBGList: Array<Laya.Image>;

		/** 塔单独背景高度 */
		TowerBGHeight: number = 0;

		/** tower总层数 */
		TowerNum: number;

		/** 塔顶占几个table位置 */
		TowerTopTableNum = 5;

		/** 塔底占几个table位置 */
		TowerBottomTableNum = 2;

		/** 单层table占用的高度 */
		TableHeight = 151;

		/** 背景与列表滚动速度的比率 */
		BgTweenRate = 0.5;

		private _offY: number = 0;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("startower")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return [
				"res/startower/tongtianta_bg01.jpg",
				"res/startower/tongtianta_bg02.jpg",

				"res/startower/tongtianta_pic01.png",
				"res/startower/tongtianta_pic02.png",
				"res/startower/tongtianta_pic03.png",
				"res/startower/tongtianta_pic04.png"
			];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.StarTower.MainUI, 0, BaseAddLayer.CenterUI, false, 3); //, GameConfig.curWidth(), GameConfig.curHeight()
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
			if (BattleMgr.Inst.getWatchBattleType() == Pb_God._emBattleType.BattleType_Temple) { return false; }
			return super.checkCanDisplayUI();
		}

		private adjustScreenPos()
		{
			this.UIPanel.MapTopImg1.height = this.UIPanel.MapTopImg2.height = GameConfig.curHeight();
			this.UIPanel.MapTopImg1.y -= GameConfig.screenOffY;
			let scaleY = GameConfig.curHeight() / GameConfig.WinHeight;
			this._offY = (scaleY - 1) * this.UIPanel.MapBottomImg.height;
			this.UIPanel.MapBottomImg.height = scaleY * this.UIPanel.MapBottomImg.height;
			this.TowerBGHeight = this.UIPanel.MapTopImg1.height;
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.adjustScreenPos();

			//记录塔背景层
			if (this._towerBGList == null)
			{
				this._towerBGList = [];
			}
			else
			{
				this._towerBGList.splice(0, this._towerBGList.length);
			}
			this._towerBGList.push(this.UIPanel.MapBottomImg);
			this._towerBGList.push(this.UIPanel.MapTopImg1);
			this._towerBGList.push(this.UIPanel.MapTopImg2);

			//将塔前后直接添加到滚动列表中
			this.UIPanel.TowerList.content.addChildAt(this.UIPanel.TowerStartBox, 0);
			//当前可攻击的层，特效显示
			this.UIPanel.TowerList.content.addChild(this.UIPanel.TowerSelBox);
			this.UIPanel.TowerList.content.addChild(this.UIPanel.TowerEndBox);


			//玩家当前所在层tips上下移动范围
			let tempStartY = this.UIPanel.TowerList.y + 30;
			let tempEndY = this.UIPanel.BottomBox.y - this.UIPanel.MapBox.y;

			let tempOldPro = -1;
			let tempChangeHander = new Laya.Handler(this, (proNum: number) =>
			{
				if (proNum == null)
				{
					return;
				}

				//玩家当前所在层tips跟随
				let tempTowerStr = (this.TowerNum - this.TowerBottomTableNum - this.CurrentStageNum).toString();
				let tempStageUI = this.UIPanel.TowerList.content.getChildByName(tempTowerStr) as Laya.Sprite;
				if (tempStageUI != null)
				{
					let tempCenterDetalY = tempStageUI.y - proNum;
					let tempToMapY = tempCenterDetalY + this.UIPanel.TowerList.y + tempStageUI.height / 2;
					if (tempToMapY >= tempStartY && tempToMapY <= tempEndY)
					{
						this.UIPanel.TowerTipsBtn.y = tempToMapY;
					}
				}

				//塔背景跟随移动
				if (tempOldPro == -1)
				{
					tempOldPro = proNum;
				}
				else
				{
					let tempDetal = proNum - tempOldPro;
					this.updateTowerBG(tempDetal * this.BgTweenRate);
					tempOldPro = proNum;
				}
			});
			this.UIPanel.TowerList.scrollBar.changeHandler = tempChangeHander;
			Laya.timer.frameOnce(3, this, () =>
			{
				this.UIPanel.TowerList.scrollBar.elasticDistance = 0;
			});

			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.UIPanel.TowerTipsBtn.onClick(this, () =>
			{
				this.onTowerTipClick();
			});
			this.UIPanel.RankDetailBtn.onClick(this, () =>
			{
				let rankType = this._type == 1 ? Pb_God._emTopListType.TopListType_Train1 : Pb_God._emTopListType.TopListType_Train2;
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, rankType));
			});
			this.UIPanel.RewardBtn.onClick(this, () =>
			{
				let opendata = new StagePrizeOpenUIData(this._battleType, this._type)
				UIManager.Inst.forceOpen(opendata);
			});
			this.UIPanel.RankBtn.onClick(this, () =>
			{
				let rankType = this._type == 1 ? Pb_God._emTopListType.TopListType_Train1 : Pb_God._emTopListType.TopListType_Train2;
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, rankType));
			});
			this.UIPanel.InfoBtn.onClick(this, () =>
			{
				CommonHelpView.show(this.UIPanel.InfoBtn, Global.getLangStr("train_tower_help" + this._type));
			});
			this.UIPanel.ShopBtn.onClick(this, () =>
			{
				let shopType = this._type == 1 ? Pb_God._emShopType.ShopType_Tower : Pb_God._emShopType.ShopType_MasterTower;
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, shopType), BaseBackUIType.HideBackUI);
			});
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(CmdEvent.TopList_List_Ack, this, this.refreshPassRank);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{
		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIPanel.imgStartBox.frame = this._type;
			this.UIPanel.MapTopImg1.frame = this._type;
			this.UIPanel.MapTopImg2.frame = this._type;
			this.UIPanel.MapBottomImg.frame = this._type;
			this.UIPanel.imgBottomBox.frame = this._type;
			this.UIPanel.TowerSelBox.imgFrame.frame = this._type;

			this.UIPanel.txtTitle.text = Global.getLangStr("ui_StarTower_title" + this._type);
			//设置购买战斗次数信息
			this.UIPanel.BuyTimesInfo.initialization(this._battleType, this._type);

			//读取塔数据高度
			this.TowerDataList = cfg.TrainTowerCfgData.getListByType(this._type)

			//设置长度和选择的塔层次
			let nextStageId = TrainDataMgr.getTowerStageID(this._type) + 1;
			if (nextStageId > cfg.TrainTowerCfgData.getMaxStage(this._type)) { nextStageId--; }
			this.CurrentStageNum = cfg.TrainTowerCfgData.getStageShowByStageID(nextStageId);
			this.TowerNum = this.TowerDataList.length + this.TowerTopTableNum + this.TowerBottomTableNum;

			//玩家头像
			Global.setResIconWithItemID(this.UIPanel.imgTowerTipsIcon, CfgID.ResType.Player_Icon, ShapeDataMgr.iconId);

			//设置塔前后坐标
			this.UIPanel.TowerStartBox.pos(0, 0);
			this.UIPanel.TowerEndBox.pos(0, (this.TowerNum - this.TowerBottomTableNum) * this.TableHeight);


			//刷新塔数据
			this.UIPanel.TowerList.onRefresh(this.TowerNum, this, this.onTowerItemRender);
			//直接跳转到当前层  (刚打开界面，就不要缓动了， 否则背景出现大幅度滚动的时候，容易出问题。)
			this.onTowerTipClick(0);
			//重置塔背景
			this.resetTowerBG();



			//刷新前3名
			this.UIPanel.RankItemBox.visible = false;
			this.requestPassRank();

			this.onRefreshEnterBox();
			this.refreshRewardReddot();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{
			this.UIPanel.TowerList.refresh();
			this.requestPassRank();
			this.onRefreshEnterBox();
			this.refreshRewardReddot();

			//直接跳转到当前层
			let nextStageId = TrainDataMgr.getTowerStageID(this._type) + 1;
			if (nextStageId > cfg.TrainTowerCfgData.getMaxStage(this._type)) { nextStageId--; }
			let tmpCurrentStage = cfg.TrainTowerCfgData.getStageShowByStageID(nextStageId);
			if (this.CurrentStageNum != tmpCurrentStage)
			{
				this.CurrentStageNum = tmpCurrentStage;
				this.onTowerTipClick(250);
			}
		}

		/** 显示当前关卡进入 */
		private onRefreshEnterBox()
		{
			let tmpEnterStageId = TrainDataMgr.getTowerStageID(this._type) + 1;
			let showStageNum = cfg.TrainTowerCfgData.getStageShowByStageID(tmpEnterStageId);
			this.UIPanel.TowerSelBox.pos(0, (this.TowerNum - this.TowerBottomTableNum - showStageNum) * this.TableHeight);
			this.UIPanel.TowerSelBox.visible = tmpEnterStageId <= cfg.TrainTowerCfgData.getMaxStage(this._type);
		}

		/** 刷新奖励按钮上的红点 */
		private refreshRewardReddot(): void
		{
			let prizeList = cfg.TrainTowerPrizeCfgData.getListByType(this._type);
			let canreward = false;
			for (let info of prizeList)
			{
				if (TrainDataMgr.getTowerPrizedStage(info.stageID))
				{ continue; }// 奖励已领取
				let isActive = TrainDataMgr.getTowerStageID(this._type) >= info.stageID;
				let isGet = TrainDataMgr.getTowerPrizedStage(info.stageID);
				if (isActive && !isGet)
				{
					canreward = true;
					break;
				}
			}
			this.UIPanel.reddot_rewards.visible = canreward;
		}

		/** 请求前3名排行 */
		private requestPassRank()
		{
			let rankType = this._type == 1 ? Pb_God._emTopListType.TopListType_Train1 : Pb_God._emTopListType.TopListType_Train2;
			TopListSend.list(rankType, 1, 3, 0, 0, 0, 0);
		}

		/** 闯关排名 */
		private refreshPassRank(tempClass: Pb_God.PBS2CTopListList)
		{
			this.UIPanel.RankItemBox.visible = true;
			this.UIPanel.RankItemBox.onRefresh(3, this, (itemUI: ProUI.StarTower.RankItemUI, index: number) =>
			{
				itemUI.imgFrameRank.frame = index + 1;
				if (index < tempClass.list.length)
				{
					let tmpInfo = tempClass.list[index];
					itemUI.NameLb.text = tmpInfo.playerdisplay.playername;
					itemUI.StageLb.text = Global.getLangStr("endlessTower_msg5", cfg.TrainTowerCfgData.getStageShowByStageID(tmpInfo.info.value.toNumber())); //n关;
				}
				else
				{
					itemUI.NameLb.text = Global.getLangStr("common_empty1");
					itemUI.StageLb.text = "";
				}
			});
		}

		//-----------------------------TowerItem刷新---------------------------------------
		/** towerItem刷新 */
		private onTowerItemRender(itemUI: ProUI.StarTower.Map.ItemCenterUI, index: number)
		{

			if (index >= this.TowerNum - this.TowerBottomTableNum || index < this.TowerTopTableNum)
			{
				itemUI.visible = false;
				return;
			}

			itemUI.imgBg.frame = this._type;

			let tempTowerStage = this.TowerNum - this.TowerBottomTableNum - index;
			let tempCfgInfo = this.TowerDataList[tempTowerStage - 1];
			itemUI.LvLb.text = Global.getLangStr("fight_msg2", tempCfgInfo.stageShow);
			let curStageId = TrainDataMgr.getTowerStageID(this._type);
			let curStageNum = cfg.TrainTowerCfgData.getStageShowByStageID(curStageId);
			//扫荡， 有次数就显示可扫荡n， 没次数就显示钻石+扫荡
			if (tempTowerStage == curStageNum)
			{
				let leftCount = TrainDataMgr.getTowerDayLastFightCount(this._type);
				let leftBuyCount = TrainDataMgr.getTowerDayLastBuyCount(this._type);
				itemUI.SweepBox.visible = leftCount > 0 || leftBuyCount > 0;
				if (itemUI.SweepBox.visible)
				{
					if (leftCount > 0)
					{
						itemUI.SweepLb.text = Global.getLangStr("fight_msg3", leftCount);
						itemUI.hboxFeeSweep.visible = false;
					} else
					{
						itemUI.SweepLb.text = "";
						itemUI.hboxFeeSweep.visible = true;
						let buyCount = TrainDataMgr.getTowerDayBuyCount(this._type);
						let sweepPrice = cfg.TrainTowerCountCfgData.getInfo(buyCount + 1).needDiamond;
						itemUI.txtFeeSweep.text = sweepPrice + Global.getLangStr("common_sweep");  //20扫荡
						itemUI.hboxFeeSweep.refresh();
					}
				}
			} else
			{
				itemUI.SweepBox.visible = false;
			}

			itemUI.PassImg.visible = tempTowerStage <= curStageNum;
			itemUI.LockImg.visible = tempTowerStage > 1 && tempTowerStage > curStageNum + 1;
			itemUI.BGBtn.onClick(this, this.onTowerItemClick);
			itemUI.FirstRewardBox1.visible = tempCfgInfo.stageShow >= curStageNum + 2 && tempCfgInfo.stageShow <= curStageNum + 6;
			if (itemUI.FirstRewardBox1.visible)
			{
				let tmpFirstRewardAry = cfg.TrainTowerCfgData.getFirstAddPrizeAryById(tempCfgInfo.stageID);
				let noritem1 = itemUI.FirstRewardBox1.getChildAt(1) as ProUI.StarTower.RewardItemUI;
				let noritem2 = itemUI.FirstRewardBox1.getChildAt(2) as ProUI.StarTower.RewardItemUI;
				noritem1.norItem.setItemInfo(tmpFirstRewardAry[0]);
				noritem2.norItem.setItemInfo(tmpFirstRewardAry[1]);
			}
		}

		private onTowerItemClick(btn: component.UIButton)
		{
			var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(this._battleType);
			if (!isInBattle)
			{
				let tempTowerStageNum = this.TowerNum - this.TowerBottomTableNum - parseInt(btn.parent.name);
				let tempCfgInfo = this.TowerDataList[tempTowerStageNum - 1];
				let curTowerNum = cfg.TrainTowerCfgData.getStageShowByStageID(TrainDataMgr.getTowerStageID(this._type));
				if (tempCfgInfo.stageShow <= curTowerNum + 1)
				{
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StarTowerFight, tempCfgInfo.stageID));
				}
				else
				{
					TipsUtils.showTipsByLanId("fight_msg4");
				}
			}
		}

		/** 跳转到当前正在进行的关卡 */
		private onTowerTipClick(durtion: number = 250)
		{

			Laya.Tween.clearAll(this.UIPanel.TowerList);
			this.UIPanel.TowerList.stopDrag();
			this.UIPanel.TowerList.scrollBar.stopScroll();

			let tempValue = (this.TowerNum - this.TowerBottomTableNum - this.CurrentStageNum) * this.TableHeight - this.UIPanel.TowerList.height / 2;
			if (tempValue < this.UIPanel.TowerList.scrollBar.min)
			{
				tempValue = this.UIPanel.TowerList.scrollBar.min;
			}
			else if (tempValue > this.UIPanel.TowerList.scrollBar.max)
			{
				tempValue = this.UIPanel.TowerList.scrollBar.max;
			}

			if (durtion <= 0)
			{
				if (this.UIPanel.TowerList.scrollBar.value == tempValue)
				{
					this.UIPanel.TowerList.scrollBar.changeHandler.runWith(tempValue);
				}
				else
				{
					this.UIPanel.TowerList.scrollBar.value = tempValue;
				}
			} else
			{
				Laya.Tween.to(this.UIPanel.TowerList.scrollBar, { value: tempValue }, durtion);
			}
		}

		//----------------------------Tower背景层-----------------------------------------------
		/** 重置背景层坐标 */
		private resetTowerBG()
		{
			//根据当前滚动的位置，转换成背景的位置
			let firstPosX = (this.UIPanel.TowerList.scrollBar.max - this.UIPanel.TowerList.scrollBar.value) * this.BgTweenRate;
			this.UIPanel.MapBottomImg.pos(0, firstPosX + 904 + GameConfig.screenOffY - this._offY);
			// this.UIPanel.MapTopImg1.pos(0, (firstPosX - this.TowerBGHeight) % (this.TowerBGHeight * 2));
			// this.UIPanel.MapTopImg2.pos(0, firstPosX % (this.TowerBGHeight * 2));
			this.updateTowerBG(0);
		}

		/** 移动地图 */
		private updateTowerBG(moveDetalY: number)
		{
			if (this._towerBGList == null)
			{
				return;
			}
			for (var index = 0; index < this._towerBGList.length; index++)
			{
				var element = this._towerBGList[index];
				element.y -= moveDetalY;
				if (element != this.UIPanel.MapBottomImg)
				{
					//向下移动
					if (moveDetalY <= 0)
					{
						if (element.y >= this.TowerBGHeight)
						{
							element.y -= this.TowerBGHeight * 2;
						}
					}//向上移动
					else
					{
						if (element.y < -this.TowerBGHeight)
						{
							element.y += this.TowerBGHeight * 2;
						}
					}
					element.y = element.y % (this.TowerBGHeight * 2);
				}
			}
		}

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.Func_StarTower_5)
			{
				Laya.timer.once(500, this, () =>
				{
					let tempTowerIndex = this.TowerNum - this.TowerBottomTableNum - 1;
					let tmpItemUI = this.UIPanel.TowerList.getCell(tempTowerIndex) as ProUI.StarTower.Map.ItemCenterUI;
					GuideMgr.Inst.showFinger(this.UIPanel.TowerSelBox, false, tmpItemUI.BGBtn);
				});
			}
		}
	}
}