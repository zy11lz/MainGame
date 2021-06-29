
module Pro
{
	/**
	 * 召唤角色列表
	 */
	export class HeroCallRewardMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroCall.Reward.MainUI;


		/** 当前召唤类型 */
		private _callType = 0;
		/** 召唤结果列表 */
		private _petStars: Pb_God.PBPetStar[];
		/** 自动分解英雄的道具列表 */
		private _splitPetItems: Pb_God.PBItemInfo[] = [];

		/** 道具图标上的特效 */
		private _effNodes: EffNode[] = [];

		/** 当前抽卡动画播放的帧数 */
		private _aniIndex = 0;
		/** 抽卡动画的总帧数 */
		private ANI_TOTAL_FRAME = 29;  //修改这个数字时，记得把预加载表resPreload.xls里面的数字也对应改掉。
		/** 抽卡动画切换到播放奖励时的帧数 */
		private ANI_SHIFT_FRAME = 29;
		/** 设置两张图作为特效播放的载体， 在其中一张图显示的时候， 另一张图开始设置下一张的加载与装载，避免在切换时还需要加载延迟显得不流畅 */
		private _effImgArr: Laya.Image[] = [];

		private _sk: SkeletonPlayer;

		private _titleSk: SkeletonPlayer;

		private _offSizeH: number = 43;

		private _defaultPos: number[] = [];

		private _sumOu: number;

		private _ouJson: string;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("rewardpopup"), UrlMgr.getAtlas("herocallreward")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			let ret = [];
			return ret;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroCall.Reward.MainUI, 0, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.cleanEffectNode();
			this.clearAniEffect();
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			// 记录关键坐标
			this._defaultPos = [this.UIPanel.aniPosImg.y, this.UIPanel.ItemBox.y, this.UIPanel.btnGrpBox.y]
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(EventNotify.Pet_BigShow_Close, this, this.showRewardList);
			this.addEventMgr(Cmd.S2C_Common_ShowPrize, this, this.onShowPrize);
			this.UIPanel.btnEffMask.onClick(this, this.showRewardResult);

			this.UIPanel.CloseBtn.onClick(this,
				() =>
				{
					this.closeUI();
					UIManager.Inst, UIManager.Inst.doAutoQueneUI();
				});

			this.UIPanel.btnShare.onClick(this, () =>
			{
				this.UIPanel.btnShare.visible = false;

				let channels = [
					Pb_God._emBroadcast_Channel.BroadcastChannel_World,
					Pb_God._emBroadcast_Channel.BroadcastChannel_Cross,
					Pb_God._emBroadcast_Channel.BroadcastChannel_Faction];

				let isShare = false;
				for (let i = 0; i < channels.length; i++)
				{
					let channel = parseInt(channels[i] + "");
					let needLv = cfg.CommonChatCfgData.getNeedPlayerLevelByChannel(channel);
					let channelName = cfg.CommonChatCfgData.getNameByChannel(channel);
					if (channel == Pb_God._emBroadcast_Channel.BroadcastChannel_Faction && !FactionDataMgr.isHaveFaction())
					{
						//没工会就不分享工会
						continue;
					}
					isShare = true;
					TipsUtils.showTipsByLanId("chat_msg10", channelName)
					ChatDataMgr.sendChatInfo(channel, "", Global.getLangStr("ui_HeroCall_msg16", this._sumOu, this._ouJson, this._sumOu, PlayerDataMgr.name, ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID), null, null, 0, false);
				}
				// let worldChannel = Pb_God._emBroadcast_Channel.BroadcastChannel_World;
				// !isShare && TipsUtils.showTipsByLanId("chat_msg9", cfg.CommonChatCfgData.getNeedPlayerLevelByChannel(worldChannel), cfg.CommonChatCfgData.getNameByChannel(worldChannel));
			})
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIPanel.shareBox.visible = false;
			let prizeValue = this.UIOpenData.customObject as Pb_God.PBG2CCommonShowPrize;
			let callType = this.UIOpenData.customObject2 as number;
			this._callType = callType;
			this.UIPanel.CallBtn.visible = callType != null;
			this.UIPanel.CloseBtn.visible = callType != null;
			this.UIPanel.ItemCostImg.visible = callType != null;
			this.UIPanel.ItemCostLb.visible = callType != null;

			this._splitPetItems = prizeValue.splititem || []
			this.startShowAni(prizeValue.pet);

		}

		private initTitleSk()
		{
			if (!this._titleSk)
			{
				this._titleSk = new SkeletonPlayer();
				this.UIPanel.aniPosImg.addChild(this._titleSk);
				this._titleSk.play("effect", false);
				this._titleSk.on(Laya.Event.STOPPED, this, () =>
				{
					this._titleSk.play("effect_loop", true);
				})
				this._titleSk.scale(0.6, 0.6);
				this._titleSk.load(UrlMgr.getSpineSceneUrl("texiao/gongxihuode/gongxihuode"));
			} else
			{
				this._titleSk.play("effect", false);
			}
		}

		/** 收到协议 */
		private onShowPrize(value: Pb_God.PBG2CCommonShowPrize)
		{
			if (value.doingtype != Pb_God._emDoingType.DoingType_PetCall)
			{
				return;
			}
			this._splitPetItems = value.splititem || [];
			this.startShowAni(value.pet);
		}

		/** 开始显示动画 */
		private startShowAni(petStars: Pb_God.PBPetStar[]): void
		{
			GuideMgr.Inst.getInShowGuide() && GameLaunch.saveClientData();

			if (!this._sk)
			{
				this._sk = new SkeletonPlayer();
				this._sk.play("shibai3_effect", false);
				this.UIPanel.addChild(this._sk);
				this._sk.pos(this.UIPanel.width / 2, this.UIPanel.height / 2);
				this._sk.on(Laya.Event.STOPPED, this, () =>
				{
					if (this._sk.visible)
					{
						this.showRewardResult();
					}
				})
				this._sk.load(UrlMgr.getSpineSceneUrl("chouka/buzhuo/buzhuo"));

			} else
			{
				this._sk.visible = true;
				this._sk.play("shibai3_effect", false);
			}




			this._petStars = petStars;
			this.UIPanel.resultBox.visible = false;
			this.UIPanel.btnEffMask.visible = true;
			this.UIPanel.imgEff1.visible = true;
			this.UIPanel.imgEff2.visible = true;
			this._effImgArr = [this.UIPanel.imgEff1, this.UIPanel.imgEff2];
			SoundMgr.Inst().playSound("heroCall");
			this._aniIndex = -1; //便于后面+1
			// Laya.timer.frameLoop(3, this, this.onUpdateAniEff);
			// Laya.timer.loop(GameConfig.EffDetalTime, this, this.onUpdateAniEff);
			// this.onUpdateAniEff();
		}

		// /** 动画驱动 */
		// private onUpdateAniEff(): void
		// {
		// 	//交换过来
		// 	this._effImgArr = this._effImgArr.reverse();
		// 	//一个显示的，一个即将显示的
		// 	let imgShow = this._effImgArr[0];
		// 	let imgWait = this._effImgArr[1];
		// 	imgShow.visible = true;
		// 	imgWait.visible = false;
		// 	//释放资源(现在的wait也就是刚刚显示的部分)
		// 	if (imgWait.skin)
		// 	{
		// 		ResMgr.Inst.unloadWithUrl(imgWait.skin, 5, true);
		// 		imgWait.skin = "";
		// 	}

		// 	this._aniIndex++;
		// 	if (this._aniIndex == this.ANI_SHIFT_FRAME)
		// 	{
		// 		this.showRewardResult();
		// 	}
		// 	if (this._aniIndex >= this.ANI_TOTAL_FRAME)
		// 	{
		// 		this.clearAniEffect();
		// 	}
		// 	else
		// 	{
		// 		let showSkin = "res/Unpack/specialEff/choiceCard/000" + Global.ToFitZero(this._aniIndex, 2) + ".png";
		// 		if (imgShow.skin != showSkin)
		// 		{
		// 			imgShow.skin = showSkin;
		// 		}
		// 		if (this._aniIndex + 1 < this.ANI_TOTAL_FRAME)
		// 		{
		// 			imgWait.skin = "res/Unpack/specialEff/choiceCard/000" + Global.ToFitZero(this._aniIndex + 1, 2) + ".png";
		// 		}
		// 	}

		// }

		private clearAniEffect(): void
		{
			this.UIPanel.imgEff1.visible = false;
			this.UIPanel.imgEff2.visible = false;
			// Laya.timer.clear(this, this.onUpdateAniEff);
			//释放资源
			if (this.UIPanel.imgEff1.skin)
			{
				this.UIPanel.imgEff1.skin = "";
				ResMgr.Inst.unloadWithUrl(this.UIPanel.imgEff1.skin, 5, true);
			}
			if (this.UIPanel.imgEff2.skin)
			{
				this.UIPanel.imgEff2.skin = "";
				ResMgr.Inst.unloadWithUrl(this.UIPanel.imgEff2.skin, 5, true);
			}

			if (this._sk)
			{
				this._sk.offAll();
				this._sk.removeSelf();
				this._sk = null;
			}

			if (this._titleSk)
			{
				this._titleSk.offAll();
				this._titleSk.removeSelf();
				this._titleSk = null;
			}
		}

		/** 动画半程结束，显示抽卡结果 */
		private showRewardResult(): void
		{
			this._sk.visible = false;
			this._aniIndex = this.ANI_SHIFT_FRAME;
			this.UIPanel.btnEffMask.visible = false;

			//因为前面的还有个动画，所以新手引导的前一步并没有直接往下走，而是等这个动画结束之后再往下走
			GuideMgr.Inst.getInShowGuide() && GuideMgr.Inst.nextActive();

			// if (GuideMgr.Inst.getInShowGuide()) {
			// 	this.showRewardList();
			// 	return;
			// }

			//判断是否有大奖预览的
			let bigShowList = [];
			for (let petStar of this._petStars)
			{
				if (petStar.star < 4) { continue; }
				//没有立绘资源
				let petResID = cfg.PetCfgData.getSkinInfoByPetID(petStar.petid).id;
				if (!cfg.PetSkinCfgData.getHaveVDrawById(petResID)) { continue; }

				bigShowList.push(petStar);
			}

			if (bigShowList.length == 0)
			{
				this.showRewardList();
			}
			else
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallBigShow, bigShowList));
			}
		}

		private showShareBox()
		{
			this.UIPanel.shareBox.visible = this._callType == Pb_God._emPetCallType.PetCallType_Advance && this._petStars.length > 1;
			if (this.UIPanel.shareBox.visible)
			{
				this.UIPanel.btnShare.visible = true;
				let sum = 0;
				let ou = cfg.PetCallCommonPoolCfgData.getDataAll();
				let ouArr = [];
				for (let i = 0; i < this._petStars.length; i++)
				{
					let pet = this._petStars[i];
					let ret = ou.filter(elment => (elment.petID == pet.petid) && (elment.petStar == pet.star));
					if (ret[0])
					{
						sum += ret[0].petScore;
						ouArr.push(pet);
					}
				}
				this._sumOu = sum;
				this._ouJson = JSON.stringify(ouArr);
				this.UIPanel.ouLbl.text = sum + "";
			}
		}

		/** 显示抽卡列表 */
		private showRewardList(): void
		{
			this.UIPanel.resultBox.visible = true;
			this.initTitleSk();
			this.showShareBox();

			this.cleanEffectNode();
			this.UIPanel.ItemBox.visible = this._petStars.length > 0;
			this.UIPanel.ItemBox.onRefresh(this._petStars.length, this, (itemUI: NorItemUI, index: number) =>
			{
				let petStar = this._petStars[index]
				itemUI.setPetStarInfo(petStar);
				// if (petStar.star >= 6)
				// {
				// 	this._effNodes[index] = EffectMgr.Inst.createEffectOne("ui_itemLightNew_5", new Laya.Point(itemUI.width / 2 + 2, itemUI.height / 2 - 2), -1, 2, 1, itemUI, false, ResReleaseType.Reference, false);
				// }
				// else if (petStar.star == 5)
				// {
				// 	this._effNodes[index] = EffectMgr.Inst.createEffectOne("ui_itemLightNew_4", new Laya.Point(itemUI.width / 2 + 2, itemUI.height / 2 - 2), -1, 2, 1, itemUI, false, ResReleaseType.Reference, false);
				// }
			});

			//自动分解三星英雄获得的道具列表
			this.UIPanel.heroAutoSplitBox.visible = this._splitPetItems.length > 0;
			this.UIPanel.rewardBg2.visible = this._splitPetItems.length > 0;
			this.UIPanel.rewardBg1.visible = !this.UIPanel.rewardBg2.visible;
			if (this.UIPanel.heroAutoSplitBox.visible)
			{
				this.UIPanel.aniPosImg.y = this._defaultPos[0] - this._offSizeH
				this.UIPanel.ItemBox.y = this._defaultPos[1] - this._offSizeH
				this.UIPanel.btnGrpBox.y = this._defaultPos[2] + 160;
				this.UIPanel.listHeroSplitItems.onRefresh(this._splitPetItems.length, this, (itemUI: NorItemUI, index: number) =>
				{
					let itemInfo = this._splitPetItems[index];
					if (itemInfo)
					{
						itemUI.setItemID(itemInfo.itemid, itemInfo.itemcount.toNumber(), false, true);
					}
				});
			} else
			{
				this.UIPanel.aniPosImg.y = this._defaultPos[0]
				this.UIPanel.ItemBox.y = this._defaultPos[1]
				this.UIPanel.btnGrpBox.y = this._defaultPos[2]
			}


			let callType = this._callType;
			if (callType == null)
			{
				return;
			}
			let tempNeedItems: cfg.AddItemInfo[];
			let isOne = this._petStars.length <= 1;
			if (isOne)
			{
				tempNeedItems = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(callType, 1);
				this.UIPanel.CallLb.text = Global.getLangStr("hero_msg29");//再抽一次";
			}
			else
			{
				tempNeedItems = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(callType, 10);
				this.UIPanel.CallLb.text = Global.getLangStr("hero_msg30");//再抽十次";
			}
			this.UIPanel.CallBtn.onClick(this, () =>
			{
				this.UIPanel.shareBox.visible = false;
				if (callType == 3)
				{
					if (!Global.isFullSingleRes(tempNeedItems, false))
					{
						this.closeUI();
						UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallExpandResCall, isOne ? 1 : 2));
						return;
					}
				}
				else
				{
					if (!Global.isFullSingleRes(tempNeedItems))
					{
						return;
					}
				}
				CallDataMgr.sendCall(callType, !isOne);
			});
			let showNeedItem: cfg.AddItemInfo = tempNeedItems[0];
			for (let needItem of tempNeedItems)
			{
				if (Global.isFullRes(needItem.itemid, needItem.itemcount, false))
				{
					showNeedItem = needItem;
					break;
				}
			}
			Global.setResIconWithItemID(this.UIPanel.ItemCostImg, CfgID.ResType.Item, showNeedItem.itemid);
			this.UIPanel.ItemCostLb.text = Global.getItemNum(showNeedItem.itemid) + "/" + showNeedItem.itemcount;
			this.UIPanel.ItemCostImg.x = this.UIPanel.ItemCostLb.x - this.UIPanel.ItemCostLb.width;
			SoundMgr.Inst().playSound("reward");
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 移除抽卡列表上面显示的item特效 */
		private cleanEffectNode(): void
		{
			for (var i = 0; i < this._effNodes.length; i++)
			{
				let el = this._effNodes[i];
				// if (el) { el.removeSelf(); }
				EffectMgr.Inst.releaseEffect(el);
			}
			this._effNodes = [];
		}

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.HigherCall_10_6)
			{
				GuideMgr.Inst.jumpActive(GuideStep.HigherCall_10_7);
				return;
			}

			if (step == GuideStep.NormalCall_3_3 || step == GuideStep.NormalCall_3_7 ||
				step == GuideStep.HigherCall_10_7)
			{
				Laya.timer.once(50, this, () =>
				{
					GuideMgr.Inst.showFinger(this.UIPanel.CloseBtn, true, this.UIPanel.CloseBtn);
				});
			}
		}
	}
}