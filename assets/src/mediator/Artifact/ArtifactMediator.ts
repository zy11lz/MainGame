
module Pro
{
	export class ArtifactMediator extends BaseMediator implements IMediator
	{
		/** 神器主界面 */
		UIPanel: ProUI.Artifact.MainUI;


		/** 当前选择的神器索引 */
		TempSelectArtifaceID = -1;

		private _lockEffectNode: EffNode;

		private _aniSk: SkeletonPlayer;

		private _aniOff = [[-2, -10], [8, -130], [-10, -150], [30, -170], [10, -150]];

		/** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("artifact"), UrlMgr.getAtlas("commontitle01"), UrlMgr.getAtlas("xinzeng")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): string[]
		{
			return ["res/artifact/yuanling_pic_01.png"].concat(this._showAniUrls);
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			this.UIPanel.lockEffect.visible = false;
			this.UIPanel.ArtifactAllBtn.onClick(this, this.onClickArtifactAllBtn);
			this.UIPanel.btnIcon.onClick(this, this.onClickIcon);
			this.UIPanel.btnHelp.onClick(this, this.onClickHelp);

		}

		public openUI(): void
		{
			this.showPanel(ProUI.Artifact.MainUI, 0);
		}

		/*** 关闭UI */
		public closeUI(): void
		{
			this.closePanel();
		}

		/**
		 * 初始化面板ui
		 */
		public initUI(): void
		{
			this._showAniUrls = [];

			//默认选择的ID
			let selectId = this.UIOpenData.customObject;
			if (!selectId)
			{
				let maxShowId = ArtifactDataMgr.getInLockingId();
				let allMaxId = cfg.ArtifactCfgData.getLastOne().iD;
				maxShowId = Math.min(maxShowId, allMaxId);
				selectId = maxShowId;
			}
			this.TempSelectArtifaceID = -1;
			this.onChangeSelected(selectId);

			// Laya.timer.loop(GameConfig.EffDetalTime, this, this.onUpdateShowAni);
			this.onUpdateShowAni();
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
			this.UIPanel.ArrowItemUI.onClick(this, this.onClickArrowItem);

			//data events
			this.addEventMgr(EventNotify.Artifact_SelectedChanged, this, this.onChangeSelected)
			this.addEventMgr(CmdEvent.Artifact_Active, this, this.refreshUI);
			this.addEventMgr(CmdEvent.Artifact_AddNew, this, this.onAddNew);
			this.addEventMgr(CmdEvent.Artifact_Skill, this, this.refreshUI);
			this.addEventMgr(CmdEvent.Artifact_Syn, this, this.refreshUI);
			this.addEventMgr(CmdEvent.Artifact_Shape, this, this.refreshUI);
			this.addEventMgr(EventNotify.Artifact_Unlock, this, this.onUnlock);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{
		}

		/** 点击帮助 */
		private onClickHelp(btn: component.UIButton): void
		{
			CommonHelpView.showWithLangKey(btn, "artifact_help");
		}

		/** 点击神器形象回调 */
		private onClickIcon(): void
		{
			let info = ArtifactDataMgr.getInfo(this.TempSelectArtifaceID);
			if (info)
			{ ArtifactTips.show(info); }
			else
			{ ArtifactTips.showById(this.TempSelectArtifaceID); }
		}

		/** 点击法阵按钮 */
		private onClickArtifactAllBtn(): void
		{
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ArtifactAllList), BaseBackUIType.HideBackUI);
		}

		/** 点击切换箭头 */
		private onClickArrowItem(statue: number): void
		{
			this.UIPanel.ArrowItemUI.ArrRightRedDotImg.visible = false;
			let changeId = this.TempSelectArtifaceID;

			let maxShowId = ArtifactDataMgr.getInLockingId();
			let allMaxId = cfg.ArtifactCfgData.getLastOne().iD;
			maxShowId = Math.min(maxShowId, allMaxId);
			let minId = ArtifactDataMgr.getMinID();

			if (statue == 0)
			{
				changeId = this.TempSelectArtifaceID - 1;
				if (changeId < minId)
				{
					if (allMaxId > maxShowId)
					{
						TipsUtils.showTipsByLanId("artifact_lock3"); //请先解锁当前元灵!
						return;
					}
					changeId = maxShowId;
				}
			}
			else if (statue == 1)
			{
				changeId = this.TempSelectArtifaceID + 1;
				if (changeId > maxShowId && allMaxId > maxShowId)
				{
					TipsUtils.showTipsByLanId("artifact_lock2"); //请先解锁当前元灵!
					return;
				}
				if (changeId > allMaxId)
				{
					changeId = minId;
				}
			}
			this.onChangeSelected(changeId);
		}

		/** 切换元灵 */
		private onChangeSelected(id: number): void
		{
			this.UIPanel.ArrowItemUI.ArrRightRedDotImg.visible = false;
			if (this.TempSelectArtifaceID == id) { return; }
			this.TempSelectArtifaceID = id;
			this.UIPanel.txtTitle.text = cfg.ArtifactCfgData.getNameByID(id);
			this.refreshAllListTabView();
			this.resetShowAnimation(id);
			this.refreshUI();
			this.onUpdateShowAni();
		}

		/** 刷新顶部的元灵列表分页显示 */
		private refreshAllListTabView(): void
		{
			let minId = ArtifactDataMgr.getMinID();
			this.UIPanel.listTabBox.onRefresh(5, this, (img: component.UIFrameImage, index: number) =>
			{
				let id = minId + index;
				img.frame = id == this.TempSelectArtifaceID ? 2 : 1;
			})
		}

		/** 刷新法阵按钮上的进度或等级显示 */
		private refreshFazhenInfo(): void
		{
			let isAllActive = ArtifactDataMgr.isGetAllArtiface;
			this.UIPanel.txtFazhenLv.visible = isAllActive;
			this.UIPanel.allLockProgressBox.visible = !isAllActive;
			if (isAllActive)
			{
				this.UIPanel.txtFazhenLv.text = "Lv." + ArtifactDataMgr.getFazhenInfo().level;
			} else
			{
				let activeNum = ArtifactDataMgr.getArtActiveNum();
				let maxNum = 5;
				this.UIPanel.txtAllLockProgress.text = activeNum + "/" + maxNum;
				//进度条
				this.UIPanel.imgAllLockProgress.mask.graphics.clear();
				this.UIPanel.imgAllLockProgress.mask.graphics.drawPie(38, 38, 40, 125, 125 + activeNum / maxNum * 360, "#ff0000");
			}
		}

		/** 新增神器 */
		private onAddNew(): void
		{
			//激活了新的神器时，检查是不是所有的都激活了， 需要弹出神器预览界面播放特效、
			if (ArtifactDataMgr.isGetAllArtiface)
			{
				this.refreshView(true);
				FuncGuideMgr.Inst.forceOpenFuncGuide(GuideStep.Func_ArtifactAll_1);
				return;
			}
			//在切换按钮上加个红点
			this.UIPanel.ArrowItemUI.ArrRightRedDotImg.visible = true;
			this.refreshView(true);
		}

		/** 刷新当前选中的神器属性 */
		public refreshUI()
		{
			this.refreshView(false);
		}

		/** 刷新当前元灵的显示 */
		private refreshView(isNewUnlock: boolean): void
		{
			this.refreshFazhenInfo();

			//是否全部集齐
			let isActiveAll = ArtifactDataMgr.isGetAllArtiface;

			//显示当前神器是否激活
			let tempArtifaceInfo = ArtifactDataMgr.getInfo(this.TempSelectArtifaceID);
			let curIsActive = tempArtifaceInfo != null && tempArtifaceInfo.isactive;
			let isReadyActive = ArtifactDataMgr.isReadyActive(this.TempSelectArtifaceID); //是否处于待激活状态中

			//节点显示控制
			this.UIPanel.ActiveSkillTableBox.visible = curIsActive || isReadyActive;
			this.UIPanel.UnActiveBox.visible = !this.UIPanel.ActiveSkillTableBox.visible;

			this.UIPanel.SkillAddAttrBox.visible = isActiveAll;

			// this.UIPanel.showAniNode.gray = !curIsActive;
			this._showAniPause = !curIsActive;

			//激活属性
			if (curIsActive || isReadyActive)
			{
				this.refreshActiveBox(isReadyActive);
			}//未激活属性
			else
			{
				this.refreshUnActiveBox();
			}

			//元灵解锁特效
			//如果未解锁，就循环显示一个锁定的效果， 如果刚刚解锁，就播放一个解锁特效，播完隐藏
			if (isNewUnlock)
			{
				// this.UIPanel.showAniNode.gray = false;
				let sk = new Pro.SkeletonPlayer();
				this.UIPanel.btnIcon.addChild(sk);
				sk.pos(this.UIPanel.btnIcon.width / 2 + 30, this.UIPanel.btnIcon.height / 2 + 130);
				sk.on(Laya.Event.STOPPED, this, () =>
				{
					if (sk)
					{
						sk.removeSelf();
					}
				})
				sk.play("fanhui_effect", false);
				sk.load(UrlMgr.getSpineSceneUrl("chouka/buzhuo/buzhuo"));

				this.onUpdateShowAni();
			} else
			{
				// if (!curIsActive)
				// {
				// 	this.UIPanel.showAniNode.gray = true;
				// } else
				// {
				// 	this.UIPanel.showAniNode.gray = false;
				// }


			}
		}

		//------------------------------------------神器效果----------------------------------------

		//////////////////// //////////////////
		/////// 元灵展示相关 //////////////////
		/** 当前动画最大帧数 */
		private _showAniMaxFrame = 0;
		private _showAniIndex = 0;
		private _showAniPause = false;
		/** 展示过程中，收集图片资源，待界面关闭时做一次回收 */
		private _showAniUrls: string[] = [];
		/** 修改显示的元灵形象 */
		private resetShowAnimation(id: number): void
		{
			// this._showAniIndex = 0;
			// this._showAniMaxFrame = [15, 15, 10, 10, 10][id - 1];
			for (let url of this._showAniUrls)
			{
				ResMgr.Inst.unloadWithUrl(url, 5, true);
			}
			this._showAniUrls = [];
		}

		private onUnlock()
		{
			SoundMgr.Inst().playSound("unlock");
			this.onUpdateShowAni();
		}

		/** 动画驱动（元灵的动画实在太大了，打图集都太大，所以还是一帧一帧自己播得了） */
		private onUpdateShowAni(): void
		{
			// if (!this._showAniPause)
			// {
			// 	this._showAniIndex++;
			// 	if (this._showAniIndex >= this._showAniMaxFrame) this._showAniIndex = 0;
			// }
			// let skinurl = `res/Unpack/specialEff/artifactShow/${ this.TempSelectArtifaceID }/000${ Global.ToFitZero(this._showAniIndex, 2) }.png`;
			// let skinurl = `res/Unpack/specialEff/artifactShow/${ this.TempSelectArtifaceID }.png`;

			// if (this._showAniUrls.indexOf(skinurl) < 0) this._showAniUrls.push(skinurl);
			// this.UIPanel.showAniNode.skin = skinurl;

			//显示当前神器是否激活
			let tempArtifaceInfo = ArtifactDataMgr.getInfo(this.TempSelectArtifaceID);
			let curIsActive = tempArtifaceInfo != null && tempArtifaceInfo.isactive;
			let path = curIsActive ? "tuteng" : "tuteng";
			if (!this._aniSk)
			{
				this._aniSk = new Pro.SkeletonPlayer();
				this.UIPanel.showAniNode.addChild(this._aniSk);
				this._aniSk.scale(0.8, 0.8);
			}

			// this._aniSk.gray = !curIsActive;
			this._aniSk.load(Pro.UrlMgr.getSpineSceneUrl(`${ path }/${ this.TempSelectArtifaceID }/${ this.TempSelectArtifaceID }`))
			this._aniSk.playByIndex(0, true);
			let off = this._aniOff[this.TempSelectArtifaceID - 1];
			this._aniSk.pos(off[0], off[1]);
			this.setUIBG(UrlMgr.getUIBgUrl(`heroDetailType${ this.TempSelectArtifaceID }`));
		}


		//--------------------------------------------神器未集齐----------------------------------------

		/** 刷新激活进度 */
		private refreshUnActiveBox()
		{
			//激活进度
			let currentActiveNum = ArtifactDataMgr.getActiveNum(this.TempSelectArtifaceID);
			let maxActiveNum = cfg.ArtifactActiveCfgData.getInfoWithFun(this.TempSelectArtifaceID).length;
			Global.setProgressBar(this.UIPanel.UnActiveBox.ProgressImgMask, currentActiveNum / maxActiveNum, this.UIPanel.UnActiveBox.ProgressImg.width);
			this.UIPanel.UnActiveBox.ProgressLb.text = currentActiveNum + "/" + maxActiveNum;

			//显示条件
			let tempCfgAry = this.sortActiveList(cfg.ArtifactActiveCfgData.getInfoWithFun(this.TempSelectArtifaceID));
			this.UIPanel.UnActiveBox.UnActiveList.onRefresh(tempCfgAry.length, this, (itemUI: ProUI.Artifact.UnActiveInfo.ListItemUI, index: number) =>
			{
				this.onActiveItemRendered(tempCfgAry[index], itemUI, index);
			});
		}

		/** 未激活时的任务列表排序 */
		private sortActiveList(source: cfg.ArtifactActiveCfgInfo[]): cfg.ArtifactActiveCfgInfo[]
		{
			//列表不大，排序数据并非列表元素，较为复杂，就不用sort了, 跑一遍循环，分个类，再组合就好。
			//已领奖的列表
			let rewardList: cfg.ArtifactActiveCfgInfo[] = [];
			//可领奖的列表
			let finishList: cfg.ArtifactActiveCfgInfo[] = [];
			//其它列表
			let list: cfg.ArtifactActiveCfgInfo[] = [];
			for (let el of source)
			{
				//完成进度
				let isReward = ArtifactDataMgr.getActiveNum(this.TempSelectArtifaceID, el.stage) > 0;
				if (isReward)
				{
					rewardList.push(el)
					continue;
				};
				let tmpAchieveInfo = cfg.AchieveMainAchieveCfgData.getInfo(el.needAchieveID);
				let tmpProNum = AchieveDataMgr.getMainValue(el.needAchieveID);
				let tmpMaxNum = tmpAchieveInfo.value;
				if (tmpProNum >= tmpMaxNum) { finishList.push(el); }
				else { list.push(el); }
			}
			return finishList.concat(list).concat(rewardList);
		}

		/** 刷新激活条件 */
		private onActiveItemRendered(tempCfgInfo: cfg.ArtifactActiveCfgInfo, itemUI: ProUI.Artifact.UnActiveInfo.ListItemUI, itemIndex: number)
		{
			//达成条件显示
			let tmpAchieveID = cfg.ArtifactActiveCfgData.getNeedAchieveIDByIndex(tempCfgInfo.index);
			let tmpAchieveInfo = cfg.AchieveMainAchieveCfgData.getInfo(tmpAchieveID);
			let tmpProNum = AchieveDataMgr.getMainValue(tmpAchieveID);
			let tmpMaxNum = tmpAchieveInfo.value;
			itemUI.NameLb.text = tmpAchieveInfo.name;// + Global.FormatString("({0}/{1})", tmpProNum, tmpMaxNum);;

			//完成进度
			let tmpIsActiveOne = ArtifactDataMgr.getActiveNum(this.TempSelectArtifaceID, tempCfgInfo.stage) > 0;
			itemUI.FinishImg.visible = tmpIsActiveOne;
			itemUI.GoBtn.visible = !tmpIsActiveOne && tmpProNum < tmpMaxNum;
			itemUI.RewardBtn.visible = !tmpIsActiveOne && tmpProNum >= tmpMaxNum;

			//前往任务
			itemUI.GoBtn.onClick(this, () =>
			{
				TaskUtils.gotoOpenByAchieveType(tmpAchieveInfo.achieveType, tmpAchieveInfo.achieveSubType);
			});

			//领取任务
			itemUI.RewardBtn.onClick(this, () =>
			{
				ArtifactSend.active(this.TempSelectArtifaceID, tempCfgInfo.stage);
			})

			//完成奖励
			let tmpRewardAry = cfg.ArtifactActiveCfgData.getAddPrizeAryById(tempCfgInfo.index);
			itemUI.rewardItem.setItemInfo(tmpRewardAry[0]);
			// itemUI.RewardBox.onRefresh(tmpRewardAry.length, this, (itemRewardUI: NorItemUI, itemRewardIndex: number) => {
			// 	itemRewardUI.setItemInfo(tmpRewardAry[itemRewardIndex]);
			// });
		}

		//--------------------------------------神器集齐----------------------------------------------
		private refreshActiveBox(readyActive: boolean)
		{
			this.UIPanel.ActiveSkillTableBox.setData(this.TempSelectArtifaceID, readyActive);
			if (!readyActive)
			{ this.refreshSkillAddAttrView(); }
		}

		/** 刷新神器技能加成显示 */
		private refreshSkillAddAttrView(): void
		{
			let tempInfo = ArtifactDataMgr.getInfo(this.TempSelectArtifaceID);
			if (!tempInfo) { return; }
			let curSkillLv = tempInfo.skilllevel;
			let skillId = cfg.ArtifactCfgData.getSkillIDByID(tempInfo.id);
			let cfglist = cfg.ArtifactSkillUpgradeCfgData.getHasAddAddAttrInfos(skillId);
			this.UIPanel.SkillAddAttrBox.height = 53 + 30 * cfglist.length;
			this.UIPanel.SkillAddAttrBox.width = 360;
			//是否元灵法阵觉醒
			// let awakeActive = ArtifactDataMgr.getYlActivePro(tempInfo.id) >= 3;
			let awakeActive = ArtifactDataMgr.getIsFazhenAwake();
			this.UIPanel.listSkillAddAttr.onRefresh(cfglist.length, this, (label: Laya.Label, index: number) =>
			{
				let cfgInfo = cfglist[index];
				let attr: cfg.AddAtterInfo = cfgInfo["addAddAttrInfo"];
				let awakeAttr: cfg.AddAtterInfo = cfgInfo["addAwakeAddAttrInfo"]; //元灵觉醒额外加成
				let attrName = cfg.BattleCfgData.getDescByAttrType(attr.type);
				let attrValue = Global.getAttrValueString(attr);
				//元灵觉醒后还需要加上额外属性
				if (awakeActive)
				{
					attrValue += Global.getLangStr("artifact_msg2", Global.getAttrValueString(awakeAttr));
				}

				label.text = Global.getLangStr("artifact_msg1", cfgInfo.skillLevel, attrName, attrValue);
				label.color = curSkillLv >= cfgInfo.skillLevel ? "#47b13c" : "#979797";
				let bgNeedW = label.textField.textWidth + 20;
				// if (this.UIPanel.SkillAddAttrBox.width < bgNeedW) this.UIPanel.SkillAddAttrBox.width = bgNeedW;
			})
		}

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.Artifact_16_4)
			{ //引导激活
				Laya.timer.once(50, this, () =>
				{
					let activeBtn = this.UIPanel.ActiveSkillTableBox.btnActive;
					if (activeBtn.visible)
					{ GuideMgr.Inst.showFinger(activeBtn, true, activeBtn); }
					else
					{ GuideMgr.Inst.nextActive(); }

				});
			} else if (step == GuideStep.Artifact_16_5)
			{ //去探险
				Laya.timer.once(50, this, () =>
				{
					let btnGoFight = this.UIPanel.ActiveSkillTableBox.btnGoFight;
					GuideMgr.Inst.showFinger(btnGoFight, true, btnGoFight);
				});
			}
			else if (step == GuideStep.ArtifactTask_17_2)
			{
				Laya.timer.once(200, this, () =>
				{
					let tmpItemUI = this.UIPanel.UnActiveBox.UnActiveList.getCell(0) as ProUI.Artifact.UnActiveInfo.ListItemUI;
					if (tmpItemUI.RewardBtn.visible)
					{
						GuideMgr.Inst.showFinger(tmpItemUI.RewardBtn, true, tmpItemUI.RewardBtn);
					} else
					{ //如果奖励已经领了，引导往后面走两步，直接引导前往按钮
						GuideMgr.Inst.jumpActive(GuideStep.ArtifactTask_17_4);
					}
				});
			}
			else if (step == GuideStep.ArtifactTask_17_4)
			{
				Laya.timer.once(100, this, () =>
				{
					//找一个go按钮
					for (var i = 0; i < 4; i++)
					{
						let tmpItemUI = this.UIPanel.UnActiveBox.UnActiveList.getCell(i) as ProUI.Artifact.UnActiveInfo.ListItemUI;
						if (tmpItemUI.GoBtn.visible)
						{
							GuideMgr.Inst.showFinger(tmpItemUI.GoBtn, true, tmpItemUI.GoBtn);
							return;
						}
					}
					//都没找到，那就没办法了，中止引导就好。
					GuideMgr.Inst.nextActive();
				});
			}
			else if (step == GuideStep.Func_ArtifactAll_1)
			{ //引导法阵按钮，进入法阵界面
				GuideMgr.Inst.showFinger(this.UIPanel.ArtifactAllBtn, true, this.UIPanel.ArtifactAllBtn);
			}
		}
	}
}