
module Pro
{
	/**
	 * 高级角色被召唤
	 */
	export class HeroCallBigShowMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroCall.BigShow.MainUI;


		/** 当前需要显示的英雄 */
		UIShowPrizes: Pb_God.PBPetStar[];

		//展示用skeleton
		private _sk: SkeletonPlayer;
		//展示用skeleton
		private _fanhui: SkeletonPlayer;
		/** 底部光环 */
		private _resaultLoopSk: SkeletonPlayer;

		/**星星 */
		private _starSk: SkeletonPlayer;

		/**是否需要播放6星动画 */
		private _showStarBoolean: boolean = false;

		/**是否可跳过 */
		private _canSkip: boolean = true;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("herocallbigshow")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroCall.BigShow.MainUI, 0, BaseAddLayer.TopUI, true, 3);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			// if (GuideMgr.Inst.getInStep() == GuideStep.NormalCall_3_7)
			// {
			// 	Laya.timer.frameOnce(1, GuideMgr.Inst, GuideMgr.Inst.enterGuide);
			// }
			this._canSkip = true;
			AwardOpenUtils.setLock(false); //解锁,奖励提示可以继续了。
			this.closePanel();
			if (this._sk)
			{
				this._sk.offAll();
				this._sk.removeSelf();
				this._sk = null;
			}
			if (this._fanhui)
			{
				this._fanhui.offAll();
				this._fanhui.removeSelf();
				this._fanhui = null;
			}

			if (this._resaultLoopSk)
			{
				this._resaultLoopSk.offAll();
				this._resaultLoopSk.removeSelf();
				this._resaultLoopSk = null;
			}

			if (this._starSk)
			{
				this._starSk.offAll();
				this._starSk.removeSelf();
				this._starSk = null;
			}
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.getDarkUI().onClick(this, () =>
			{

				if (this._canSkip)
				{ this.showOnce(); }

			});
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIShowPrizes = this.UIOpenData.customObject as Pb_God.PBPetStar[];
			this.showOnce();
		}

		public resetUIOpenData(uiOpenData: BaseOpenUIData): void
		{
			let list = this.UIOpenData.customObject as Pb_God.PBPetStar[];
			if (list.length > 10)
			{
				return;
			}
			//太多了。
			let addList = uiOpenData.customObject as Pb_God.PBPetStar[];
			this.UIShowPrizes = this.UIOpenData.customObject = list.concat(addList);
		}

		showOnce(): void
		{
			//先把音效停掉
			SoundMgr.Inst().controlSound(SoundStatue.Stop, SoungGroup.heroShowVoice);
			let tmpInfo = this.UIShowPrizes.shift() as Pb_God.PBPetStar;
			if (tmpInfo == null)
			{
				this.closeUI();
				EventMgr.trigger(EventNotify.Pet_BigShow_Close);
				return;
			}

			let petCfgInfo = cfg.PetCfgData.getInfo(tmpInfo.petid);
			/*  //边框
				  ①四星英雄套用”紫色”稀有框；
				②五星3技能的英雄套用“橙色”传说框；
				③五星4技能的英雄套用”橙红色”传说框；
				④六星英雄套用”红色”传说框。
			*/

			//播放英雄音效
			if (petCfgInfo.voice)
			{
				let soundArr = petCfgInfo.voice.split(";");
				let sound = soundArr[Global.getRandomNum(0, soundArr.length)];
				SoundMgr.Inst().playSoundByName(sound, SoungGroup.heroShowVoice);
			}

			this.UIPanel.StarBox.setStar(tmpInfo.star, 0);
			this.UIPanel.imgVDraw.skin = "";
			this._showStarBoolean = tmpInfo.star == 6;
			this._canSkip = GuideMgr.Inst.getInAllShowGuide() || tmpInfo.star != 6;
			this.startShowAni();
			this.refreshHeroShapeView(tmpInfo.petid, tmpInfo.star);
			this.UIPanel.footboard.visible = false;
			this.UIPanel.imgPetType.frame = petCfgInfo.petType;
			this.UIPanel.txtName.text = cfg.PetSkinCfgData.getFileNameByPetID(petCfgInfo.petID);

		}

		// /** 开始显示动画 */
		private startShowAni(showStarAni: boolean = false): void
		{
			if (this._starSk)
			{
				this._starSk.visible = false;
			}
			if (!this._fanhui)
			{
				this._fanhui = new SkeletonPlayer();
				this.UIPanel.imgVDraw.addChild(this._fanhui);
				this.UIPanel.imgVDraw.zOrder = 11;
				this._fanhui.pos(0, 100);
				this._fanhui.load(UrlMgr.getSpineSceneUrl("chouka/buzhuo/buzhuo"));
				this._fanhui.on(Laya.Event.STOPPED, this, () =>
				{
					this.showStarSk();
				})
			}
			this._fanhui.play("fanhui_effect", false);
		}

		private showStarSk()
		{
			if (!this._showStarBoolean)
			{
				return;
			}
			if (!this._starSk)
			{
				this._starSk = new SkeletonPlayer();
				this.UIPanel.imgVDraw.addChild(this._starSk);
				this.UIPanel.imgVDraw.zOrder = 11;
				this._starSk.pos(0, 30);
				this._starSk.load(UrlMgr.getSpineSceneUrl("xinchouka/xingxing/xingxing"));
				this._starSk.on(Laya.Event.STOPPED, this, () =>
				{
					this._starSk.visible = false;
					this._canSkip = true;
				})
			}
			this._starSk.playByIndex(0, false);
			this._starSk.visible = true;
			this._showStarBoolean = false;
		}

		/** 刷新形象显示 */
		private refreshHeroShapeView(petId: number, star: number): void
		{

			let skinID = cfg.PetCfgData.getBaseSkinByPetID(petId);
			if (!this._sk)
			{
				this._sk = new SkeletonPlayer();
				//获取资源ID

				let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
				let firstAniAction = cfg.PetSkinCfgData.getFirstActById(skinID);
				Laya.Tween.to(this._sk, { alpha: 1 }, 400);
				this._sk.play(firstAniAction ? firstAniAction : "win_loop", false);
				this._sk.on(LayaEvent.CLICK, this, this.onSkClick);
				this._sk.on(LayaEvent.STOPPED, this, this.onSkStop);
				this._sk.pos(0, 100);
				this._sk.load(UrlMgr.getModelSkUrl(skelName));
				this._sk.alpha = 0;
				this._sk.zOrder = 1;
				this.UIPanel.imgVDraw.addChild(this._sk);
				this.UIPanel.imgVDraw.zOrder = 10;
			}
			// Laya.Tween.clearTween(this._sk);
			this._sk.alpha = 1;
			//获取资源ID
			var showScale = cfg.PetSkinCfgData.getShowScaleById(skinID);
			this._sk.scale(showScale, showScale);
			Laya.Tween.to(this._sk, { alpha: 0 }, 350, null, Laya.Handler.create(this, () =>
			{
				if (this._sk)
				{
					let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
					this._sk.setRes(UrlMgr.getModelSkUrl(skelName));
					Laya.Tween.to(this._sk, { alpha: 1 }, 350);
				}
			}))

			if (GuideMgr.Inst.getGuideStatue() && GuideMgr.Inst.getInStep() == GuideStep.NormalCall_3_6)
			{
				this._sk.play("skill2", false);
			}
			else
			{
				let firstAniAction = cfg.PetSkinCfgData.getFirstActById(skinID);
				this._sk.play(firstAniAction ? firstAniAction : "win_loop", false);
			}

			if (!this._resaultLoopSk)
			{
				this._resaultLoopSk = new SkeletonPlayer();
				this._resaultLoopSk.y = 100;
				this.UIPanel.imgVDraw.addChild(this._resaultLoopSk);
			}

			let path;
			switch (star)
			{
				case 4:
					path = "xinchouka/qianhuang/qianhuang";
					break;
				case 5:
					path = "xinchouka/huang/huang";
					break;
				case 6:
					path = "xinchouka/hong/hong";
					break;
				default:
					path = "xinchouka/huang/huang";
					break;
			}
			this._resaultLoopSk.load(Pro.UrlMgr.getSpineSceneUrl(path))
			this._resaultLoopSk.playByIndex(0, true);
		}

		/**
				* 点击后随即播放动作 其中没有loop的动作播放完成后 播放standby_loop
				* @param e
				*/
		private onSkClick(e: LayaEvent)
		{
			let randomList = ["attack", "run_loop", "skill1", "standby_loop", "win_loop"];
			let random = Math.random() * randomList.length;
			let index;
			for (let i = 0; i <= randomList.length; i++)
			{
				if (random < i)
				{
					index = i - 1;
					break;
				}
			}
			let act = randomList[index];
			let needLoop = act.indexOf("loop") != -1;
			this._sk.play(act, needLoop);

		}

		private onSkStop(e: LayaEvent)
		{
			this._sk.play("standby_loop", true);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.NormalCall_3_6 || step == GuideStep.BagCombinHero_6_5 || step == GuideStep.BagCombinHero_6_6 ||
				step == GuideStep.HigherCall_10_6)
			{
				GuideMgr.Inst.showFinger(this.UIPanel.TipsImg, false, this.getDarkUI());
			}
			// else if (step == GuideStep.NormalCall_3_6)
			// {
			// 	//这一步需要引导他点一下皮卡丘 然后放开引导 等玩家自己关
			// 	GuideMgr.Inst.showFinger(this._sk.parent as Laya.UIComponent, false, null, 1)
			// }
			// else if (step == GuideStep.NormalCall_3_7)
			// {
			// 	GuideMgr.Inst.finishCurrGuide();
			// }
		}
	}
}