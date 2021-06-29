/**
* name
*/
module Pro
{
	export class FightCommingEffect
	{

		private static bossComming: ProUI.Ani.utils.ani_boss_comingUI;
		private static normalComming: ProUI.Ani.utils.ani_normal_comingUI;
		// private static effectFightStartBoss: EffNode;
		private static effectNormal: EffNode;

		constructor()
		{

		}

		/**
		* 播放开场特效
		* */
		public static showEff_fightComing(batType: Pb_God._emBattleType, batId: number, leftName: string, rightName: string)
		{
			let tmpEffPos = new Laya.Point(GameConfig.curWidth() / 2, GameConfig.curHeight() / 2);
			if (batType == Pb_God._emBattleType.BattleType_Hook)
			{
				let tmpBossBustID = cfg.HookStageCfgData.getBossShapeByStageID(batId);
				if (tmpBossBustID == 0)
				{
					this.showNormal(tmpEffPos);
				}
				else
				{
					this.showBoss(tmpBossBustID);
				}
			}
			else if (batType == Pb_God._emBattleType.BattleType_Challenge)
			{
				this.showPVP(tmpEffPos, leftName, rightName);
			}
			else
			{
				this.showNormal(tmpEffPos);
			}
		}

		private static showBoss(tmpBossBustID)
		{
			if (this.bossComming == null)
			{
				this.bossComming = new ProUI.Ani.utils.ani_boss_comingUI();
				this.bossComming.anchorX = 0.5;
				this.bossComming.anchorY = 0.5;
				this.bossComming.width = GameConfig.curWidth();
				this.bossComming.height = GameConfig.curHeight();

				let tmpShadrImg = new Laya.Image();
				tmpShadrImg.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight(), "#000000");
				tmpShadrImg.alpha = 0.7;
				this.bossComming.addChildAt(tmpShadrImg, 0);
			}
			this.bossComming.x = GameConfig.curWidth() / 2;
			this.bossComming.y = GameConfig.curHeight() / 2;
			LayerManager.Inst.baseUILayer.addChild(this.bossComming);

			this.bossComming.EffIconImg.scale(0.6, 0.6);
			Laya.Tween.to(this.bossComming.EffIconImg, { scaleX: 1, scaleY: 1, alpha: 1 }, 300, Laya.Ease.linearIn, Laya.Handler.create(this, () =>
			{
				Laya.Tween.to(this.bossComming.EffIconImg, { alpha: 0 }, 400, Laya.Ease.linearIn, null, 500);
			}));

			this.bossComming.IconImg.skin = Global.getBossComingBGPathWithResUrl(tmpBossBustID);
			this.bossComming.IconImg.scale(0.6, 0.6);
			Laya.Tween.to(this.bossComming.IconImg, { scaleX: 1, scaleY: 1, alpha: 1 }, 300, Laya.Ease.linearIn, Laya.Handler.create(this, () =>
			{
				Laya.Tween.to(this.bossComming.IconImg, { alpha: 0 }, 400, Laya.Ease.linearIn, null, 500);
			}));

			//回收
			Laya.timer.once(1300, this, () =>
			{
				ResMgr.Inst.unloadWithUrl(this.bossComming.IconImg.skin);
				this.bossComming.IconImg.skin = "";
				this.bossComming.removeSelf();
			});

			//boss展示

			//添加
			// let tmpEffPos = new Laya.Point(this.bossComming.EffBG.width / 2, this.bossComming.EffBG.height / 2);
			// var effectFightStartBoss = EffectMgr.Inst.createEffectOne("ui_fightStart_boss", tmpEffPos, null, 1, 1, this.bossComming.EffBG, true, ResReleaseType.Reference);
			// this.effectFightStartBoss.play(0);
			this.bossComming.EffIconImg.visible = true;
			// Laya.timer.once(800, this, () =>
			// {
			// 	this.bossComming.EffIconImg.visible = true;
			// });
		}

		private static showPVP(tmpEffPos, leftName: string, rightName: string)
		{
			let effName = "ani_pvpStartUI";
			let ani_tipsUI = Public.PoolMgr.getItem(effName) as ProUI.Ani.utils.ani_pvpStartUI;
			if (ani_tipsUI == null)
			{
				ani_tipsUI = new ProUI.Ani.utils.ani_pvpStartUI();
				ani_tipsUI.anchorX = 0.5;
				ani_tipsUI.anchorY = 0.5;
			}
			ani_tipsUI.x = tmpEffPos.x;
			ani_tipsUI.y = tmpEffPos.y;
			LayerManager.Inst.effectLayer.addChild(ani_tipsUI);

			ani_tipsUI.LeftNameLb.text = leftName;
			ani_tipsUI.RightNameLb.text = rightName;

			//添加
			// let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_pvp_fightStart", new Laya.Point(ani_tipsUI.width / 2, ani_tipsUI.height / 2), null, 1, 1, ani_tipsUI, true, ResReleaseType.Reference);
			// ani_tipsUI.setChildIndex(tmpEffNode, 0);
			Laya.timer.once(1000, this, () =>
			{
				ani_tipsUI.removeSelf();
				Public.PoolMgr.recoverItem(effName, ani_tipsUI);
			});
		}

		private static showNormal(tmpEffPos)
		{
			// EffectMgr.Inst.createEffectOne("ui_fightStart_normal", tmpEffPos, null, 1, 1, LayerManager.Inst.effectLayer, true, ResReleaseType.Reference);
			if (this.normalComming == null)
			{
				this.normalComming = new ProUI.Ani.utils.ani_normal_comingUI();
				this.normalComming.anchorX = 0.5;
				this.normalComming.anchorY = 0.5;
				this.normalComming.x = tmpEffPos.x;
				this.normalComming.y = tmpEffPos.y;
			}
			LayerManager.Inst.baseUILayer.addChild(this.normalComming);
			this.normalComming.img.scale(0.4, 0.4);
			Laya.Tween.to(this.normalComming.img, { scaleX: 0.65, scaleY: 0.65, alpha: 1 }, 100, Laya.Ease.linearIn, Laya.Handler.create(this, () =>
			{
				Laya.Tween.to(this.normalComming.img, { scaleX: 0.5, scaleY: 0.5, alpha: 1 }, 200, Laya.Ease.linearIn, Laya.Handler.create(this, () =>
				{
					this.normalComming.img.alpha = 1;
					Laya.Tween.to(this.normalComming.img, { alpha: 0 }, 400, Laya.Ease.linearIn, null, 500);
				}))
			}));

			//回收
			Laya.timer.once(1300, this, () =>
			{
				this.normalComming.removeSelf();
			});
		}

		static onNormalEffectComplete()
		{
			this.effectNormal.stop();
			common.DisplayUtils.removeFromParent(this.effectNormal);
		}
	}
}