
module Pro
{
	/**
	 * 主城角色
	 */
	export class CityRole extends BaseRole
	{

		public isAttacker: boolean = false;
		public isAlreasyHit: boolean = false;
		private static $_CITY_ROLE_INSTANCECNT = 0;
		// private  static $_uniqIndex = 0;

		/**  基础数据 */
		public roleData: RoleCityData = new RoleCityData();

		//---------------------------组建状态-------------------------------
		/** 属性状态 */
		// public statueUI: ProUI.Scene.City.RoleStatueUI;

		//-----------------------------巡逻状态-----------------------------
		/** 巡逻看守点 */
		public hunterPoint: Laya.Point;

		/** 是否时巡逻者 */
		private isHunter = false;

		/** 下次自动巡逻者时间点 */
		private nextHunterTime = 0;

		/**剩余到底目的在前多少帧是，攻击者发动攻击 */
		public canHitedFrame: number = 0;

		//-----------------------------Base Function------------------------
		constructor()
		{
			super();
			CityRole.$_CITY_ROLE_INSTANCECNT++;
			this.createStatueUI();
		}

		/**
	   * 总共实例化了多少个
	   */
		static get cityRoleInstnaceCnt(): number
		{
			return CityRole.$_CITY_ROLE_INSTANCECNT;
		}


		/** 创建状态条 */
		private createStatueUI()
		{
			// let statueUI = new ProUI.Scene.City.RoleStatueUI();
			// statueUI.anchorX = 0.5;
			// statueUI.anchorY = 0.5;
			// statueUI.scale(0.8, 0.8);
			// this.statueUI = statueUI;
			// this.statueUI.visible = true;
		}

		//-----------------------------overrider Function-------------------
		/**
		 * 初始化
		 */
		public resetRes(modelID: number, resType: RoleResType = RoleResType.Walk): void
		{
			super.resetRes(modelID, resType);
			// this.statueUI.bloodProImg.width = 96;
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
			//角色移动中
			if (this.getInMove())
			{
				if (this.roleData.isOwer)
				{
					EventMgr.trigger(EventNotify.City_MRole_Moving, this, this.x, this.targetSpeed.x);
				}
			}//巡逻者选择新的目标巡逻
			else if (this.isHunter && Laya.timer.currTimer > this.nextHunterTime)
			{
				this.gotoPosition(new Laya.Point(this.hunterPoint.x + Global.getRandomNum(0, 200) - 100,
					this.hunterPoint.y + Global.getRandomNum(0, 200) - 100));
			}

			//UI状态跟随
			// if (this.statueUI != null)
			// {
			// 	this.statueUI.pos(this.x, this.y - cfg.PetSkinCfgData.getRoleHeight(this.getResourceID()));
			// }

			return true;
		}

		//-------------------------------------角色移动----------------------------------

		/** 停止移动 */
		public stopMoving(): boolean
		{

			if (!super.stopMoving())
			{
				return false;
			}

			//巡逻者先停顿一定时间
			if (this.isHunter)
			{
				this.nextHunterTime = Laya.timer.currTimer + 500;
			}
			return true;
		}

		//-------------------------------------角色变身守卫----------------------------------
		/** 设置成守卫 */
		public setHunter()
		{
			this.isHunter = true;
			this.nextHunterTime = 0;
			this.hunterPoint = new Laya.Point(this.x, this.y);
			this.targetMSpeed = 15;
			this.stopMoving();
		}

		/** 设置移动速度 */
		public setMoveSpeed(speed: number)
		{
			this.targetMSpeed = speed;
		}
		/**
		* 角色移动逻辑
		* */
		protected updateMoving()
		{
			//角色移动
			if (this.targetInMove)
			{
				if (this.canHitedFrame)
				{
					if ((this.x - (this.targetPos.x + 4 * this.canHitedFrame)) < 0)
					{
						this.canHitedFrame = 0;
						this.event(RoleActionEvent.ROLE_MOVE_END);

					}
				}

				this.pos(this.x + this.targetSpeed.x, this.y + this.targetSpeed.y);
				let distance: number = this.targetPos.distance(this.x, this.y);
				if (distance < (this.targetMSpeed + 1))
				{
					this.pos(this.targetPos.x, this.targetPos.y);
					this.stopMoving();
				}
			}
		}

		/** 守卫开始跟随主角 */
		public followPostion(pos: Laya.Point)
		{
			this.isHunter = false;
			this.gotoPosition(pos);
		}

		//--------------------------------挂机战斗动画表现-----------------------------------
		/** 开启挂机状态 */
		public setHangUp()
		{
			this.playAction(RoleActionStatue.move);
		}

		public playAction(curStatue: RoleActionStatue, exTime: number = GameConfig.EffDetalTime): number
		{
			return super.playAction(curStatue, exTime)
		}


		onAniPlayStoped()
		{
			super.onAniPlayStoped();
		}


		release()
		{
			super.release();
			this.isAttacker = false;
			this.isAlreasyHit = false;
		}
	}
}