
module Pro
{
	/**
	 * 战斗角色
	 */
	export class BaseAtker extends BaseRole
	{
		//-------------------------------------------------组建状态-----------------------------
		/**
		 * 属性状态
		 * */
		public statueUI: ProUI.Scene.Battle.Effect.RoleStatueUI;

		/**  基础数据 */
		public roleData: RoleAtkData = new RoleAtkData();


		/** 是否处于动画表现中 */
		private _isActionPlaying = false;

		public get isActionPlaying()
		{
			return this._isActionPlaying;
		}

		public set isActionPlaying(value: boolean)
		{
			this._isActionPlaying = value;
		}

		constructor()
		{
			super();

			//状态UI
			this.createStatueUI();
		}

		private createStatueUI(): void
		{
			if (this.statueUI) { return; }
			this.statueUI = new ProUI.Scene.Battle.Effect.RoleStatueUI();
			this.statueUI.anchorX = 0.5;
			this.statueUI.anchorY = 0.5;
			this.statueUI.alpha = 1;
			this.statueUI.scale(0.8, 0.8);
			this.statueUI.visible = true;


		}
		/**
		 * 显示buff，和血条效果
		 * @param bol
		 */
		public showEff(bol: boolean)
		{
			if (!this.effNodeContiner.visible == bol)
			{
				this.effNodeContiner.visible = bol;
				this.statueUI.visible = bol;
			}


		}

		//------------------------------------------------overrider-----------------------------
		/**
		 * 初始化
		 */
		public resetRes(): void
		{
			super.resetRes(this.roleData.getResoureID(), RoleResType.Attack);
			if (this._debugTxt)
			{
				var skelName = cfg.PetSkinCfgData.getSkelNameById(this.resoureID);
				this._debugTxt.text = skelName;
				//  this.tagIndex.toString() + "_" + this.roleData.unitId.toString();// + "_" + this.roleData.curRid.toString();
			}
			//设置初始状态
			let tmpLevelStr = this.roleData.getPetInfo().display.level.toString();
			Laya.timer.frameOnce(3, this, () =>
			{

				this.statueUI.buffImg.graphics.clear();
				this.statueUI.LvImg.graphics.clear();

				//显示等级
				let tmpLvX = 0;
				for (let i = 0; i < tmpLevelStr.length; i++)
				{
					let tmpTxture = Laya.loader.getRes("res/battle/num_" + tmpLevelStr[i] + ".png") as Laya.Texture;
					if (tmpTxture != null)
					{
						this.statueUI.LvImg.graphics.drawTexture(tmpTxture, tmpLvX, 0);
						tmpLvX += tmpTxture.sourceWidth;
					}
				}
			});

			this.statueUI.bloodProImg.width = 75 * this.roleData.getHp() / this.roleData.getMaxBlood();
			Global.setResPetPetID(this.statueUI.frameImgPetType, this.roleData.curRid);
			this.setActionFlipX(!this.roleData.isOwer);
		}

		/**
		 * 逻辑刷新
		 */
		public update(): boolean
		{
			if (super.update() == false)
			{
				return false;
			}
			//UI状态跟随
			if (this.statueUI)
			{
				this.statueUI.pos(this.x, this.y - cfg.PetSkinCfgData.getRoleHeight(this.getResourceID()));
			}
			else
			{
				logE("statueUI error!");
			}
			return true;
		}

		/** 设置是否显示外观 */
		public setIsWatching(value: boolean)
		{
			super.setIsWatching(value);
			if (!value)
			{
				this.updateEffectStatue(0);
			}
			else
			{
				this.refreshBuff();
			}
		}

		//-----------------------------------------------回合控制----------------------------------------------
		/**
		 * 大回合切换
		 * @param trunIndex 当前新的回合
		 *  */
		public roundChanged(trunIndex: number)
		{
			this.roleData.onStartRound(trunIndex);
			this.refreshBuff();
		}

		//-----------------------------------------------状态处理------------------------------------------------
		/**
		 * 重置伤害表现
		 */
		// public resetDamageInfo()
		// {
		// 	this.roleData.getDamageInfo().reset();
		// }

		// /**
		//  * 获取是否在伤害表现中
		//  */
		// public getIsActionPlaying(): boolean
		// {
		// 	return !this.roleData.getDamageInfo().isPlayFinish() || this.isActionPlaying;
		// }

		/** 获取角色是否已经死亡状态了 */
		public getIsInDeadStatue(): boolean
		{
			return !this.statueUI || !this.statueUI.visible;
		}


		/** 角色动作表现完成 */
		public finishActionPlayed(tmpDarkScreen: number)
		{
			//显示层级降低
			this["specailZOrder"] = 0;
			//动作完成
			this._isActionPlaying = false;
			if (this.roleData)
			{
				this.roleData.getBatRoleMgr().role_Turn_Finish(false);
				//设置场景变化
				this.roleData.getBatPlaceMgr().setBGBlackAction(false);
			}
		}

		//------------------------------------技能特效控制----------------------------------

		/** 刷新角色伤害后状态 */
		public refreshDamageAfterStatue()
		{

			//显示血条
			let tmpBloodNum = this.roleData.isDead() ? 0 : this.roleData.getHp();
			var scale: number = tmpBloodNum / this.roleData.getMaxBlood();
			if (scale > 1)
			{
				let a = 1;
				scale = 1;
			}
			let tmpBloodWidth = 75 * scale;
			if (this.isWatching)
			{
				Laya.Tween.to(this.statueUI.bloodProImg, { width: tmpBloodWidth }, 100 / this.actionSpeed);
			}
			else if (this.statueUI)
			{
				this.statueUI.bloodProImg.width = tmpBloodWidth;
			}

			//刷新buff
			this.refreshBuff();
		}

		/** 刷新buff效果 */
		private refreshBuff()
		{

			//未观看中
			if (!this.isWatching || this.roleData.isDead())
			{
				return;
			}

			//获取身上还存在的buff
			let tmpBuffEffAry = new Array<string>();
			let tmpBuffIconAry = new Array<string>();
			this.roleData.getBattleBuffMgr().getPoolBuff().forEach(elment =>
			{
				if (!elment.isDelete())
				{
					let tmpSkName = cfg.BuffNewBuffCfgData.getEffectIdByID(elment.buffid);
					if (tmpSkName.length > 0 && tmpBuffEffAry.indexOf(tmpSkName) == -1) { tmpBuffEffAry.push(tmpSkName); }

					let tmpIcName = cfg.BuffNewBuffCfgData.getIconByID(elment.buffid);
					if (tmpIcName.length > 0 && tmpBuffIconAry.indexOf(tmpIcName) == -1) { tmpBuffIconAry.push(tmpIcName); }
				}
			});

			//刷新buff UI
			{
				let tmpBuffIndex = 0;
				this.statueUI.buffImg.graphics.clear();
				for (let i = 0; i < tmpBuffIconAry.length; i++)
				{
					let tmpTxName = "res/battle/" + tmpBuffIconAry[i] + ".png";
					let tmpTxture = Laya.loader.getRes(tmpTxName) as Laya.Texture;
					if (tmpTxture)
					{
						this.statueUI.buffImg.graphics.drawTexture(tmpTxture, ((tmpBuffIndex++) % 5) * tmpTxture.sourceWidth, Math.floor(i / 5) * tmpTxture.sourceHeight);
					}
					else
					{
						logE("buffIcon错误:" + tmpTxName);
					}
				}
			}

			//刷新buff特效
			this.refreshEffectList(tmpBuffEffAry);
			// this.refreshSecificBuffEffect();
		}

		// /** 特殊BUFF类型效果（比如石化等） */
		// private refreshSecificBuffEffect(): void
		// {
		// 	if (!this.actionUI) { return; }
		// 	let buffStateList = this.roleData.getBuffStateList();
		// 	let filters = null;
		// 	for (var type of buffStateList)
		// 	{
		// 		switch (type)
		// 		{
		// 			case Pb_God._emBuffControlType.BuffControl_Shihua:
		// 				filters = [new Laya.ColorFilter([0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0])];
		// 				break;
		// 			case Pb_God._emBuffControlType.BuffControl_Mabi:
		// 				filters = [
		// 					new Laya.ColorFilter([0, 0, 0, 0, 105, 0, 0.18, 0, 0, 105, 0, 0, 0.545, 0, 105, 0, 0, 0, 1, 0]),
		// 					new Laya.ColorFilter([4.824, 0, 0, 0, -489.472, 0, 4.824, 0, 0, -489.472, 0, 0, 4.824, 0, -489.472, 0, 0, 0, 1, 0])
		// 				];
		// 				break;
		// 		}
		// 	}
		// 	this.actionUI.filters = filters;
		// }


		//------------------------------------死亡控制----------------------------------
		/** 死亡显示控制 */
		public die(): void
		{
			this.dieStat = true;
			this.statueUI.visible = false;
			this.controlViewVisible(false);
			this._skeletonPlayer.pause(true);
		}

		/** 复活 */
		public reLive(): void
		{
			this.dieStat = false;
			this.playAction(RoleActionStatue.stand);
			this.statueUI.visible = true;
			this.controlViewVisible(true);
		}

		//-------------------------------------角色移动----------------------------------
		/** 直接设置为NPC模式，当有移动完成后会自动触发停止移动事件 */
		public setFightStartNode()
		{
			//角色还站在屏幕外，等待进场
			if (this.x == -100)
			{
				return;
			}
			if (this.targetInMove)
			{
				this.targetIsOperation = true;
			}
			else
			{
				this.roleData.getBatPlaceMgr().role_Round_Start();
			}
		}

		/** 停止移动 */
		public stopMoving(): boolean
		{
			if (!super.stopMoving())
			{
				return false;
			}
			//主角移动完成后，开启战斗
			if (this.targetIsOperation)
			{
				this.roleData.getBatPlaceMgr().role_Round_Start();
			}
			return true;
		}

		showHp(hpInfo: Pb_God.PBFightActionHP, bgRes: string, numRes: NumResInfo)
		{
			this.addToHpQueue(hpInfo, bgRes, numRes);
		}

		private hpQueue: HpQueueInfo[] = []
		private isHpRunning: boolean = false;
		private hpTime: Laya.Timer;

		addToHpQueue(hpInfo: Pb_God.PBFightActionHP, bgRes: string, numRes: NumResInfo)
		{
			if (this.poolSign.isFree) { return; }
			if (this.roleData.getBatPlaceMgr() == null) { return; }
			var info: HpQueueInfo = new HpQueueInfo(hpInfo, bgRes, numRes);
			this.hpQueue.push(info);
			this.startHp();

			var isDie: boolean = this.roleData.isDead();
			this.roleData.updatePlayBackHp(info.hpInfo.hpchanged.toNumber(), info.hpInfo.hp.toNumber());
			this.refreshDamageAfterStatue();
			if (isDie && info.hpInfo.hp.toNumber() > 0)
			{
				//复活
				this.reLive();
			}
		}

		startHp()
		{
			if (this.hpTime == null)
			{
				this.hpTime = new Laya.Timer();
			}
			if (this.isHpRunning)
			{
				return;
			}
			this.isHpRunning = true;
			this.hpTime.loop(200, this, this.toShowHp);
			this.toShowHp();
		}

		toShowHp()
		{
			if (this.hpQueue.length)
			{
				var info: HpQueueInfo = this.hpQueue.shift();
				if (this.isFree) { return; }
				if (this.roleData.getBatPlaceMgr() == null) { return; }

				if (this.roleData.battleType == Pb_God._emBattleType.BattleType_ActivityBoss && !this.roleData.isOwer)
				{
					let hpChanged = info.hpInfo.hpchanged.toNumber();
					if (hpChanged < 0)
					{
						ActivityBossDataMgr.damage -= hpChanged;
						EventMgr.trigger(EventNotify.AtkerHpChange, -hpChanged);
					}
				}
				EffectMgr.Inst.showUI_DamageNumUp(info.hpInfo.hpchanged.toNumber(), info.bgRes, info.numRes, new Laya.Point(this.x, this.y - 150), this.actionSpeed, this.roleData.getBatPlaceMgr().EffCeilLayer);
			} else
			{
				this.hpTime.clearAll(this);
				this.isHpRunning = false;
			}
		}


		syncBeforRoundBuff(buff: Pb_God.PBFightBuffState[])
		{
			this.roleData.getBattleBuffMgr().syncBeforRoundBuff(buff);
		}


		public release()
		{
			super.release();
			//回收技能读条UI
			if (this.hpTime)
			{
				this.hpTime.clearAll(this);
			}
			this.hpQueue = [];
			this.isHpRunning = false;
			common.DisplayUtils.removeFromParent(this.statueUI);
			this.statueUI.visible = true;
		}

		public dispose()
		{
			super.dispose();
			if (this.statueUI != null)
			{
				this.statueUI.removeSelf();
				this.statueUI = null;
			}
		}
	}
}