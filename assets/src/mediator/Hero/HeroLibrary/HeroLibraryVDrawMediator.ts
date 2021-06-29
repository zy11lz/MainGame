
module Pro
{
	/**
     * 英雄立绘
     */
	export class HeroLibraryVDrawMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroLibrary.VDraw.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("herodraw"), Global.getResPetVDrawSkin(this.UIOpenData.customObject)];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroLibrary.VDraw.MainUI, 0, BaseAddLayer.TopUI, false, 1, GameConfig.curWidth(), GameConfig.curHeight());
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.UIPanel.MapLayer.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownMapLayer);
			this.UIPanel.BackBtn.onClick(this, this.closeUI);

			this.UIPanel.btnLeft.onClick(this, this.onClickLeft);
			this.UIPanel.btnRight.onClick(this, this.onClickRight);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		private onMouseDownMapLayer(): void
		{
			this.UIPanel.MapLayer.once(Laya.Event.MOUSE_OUT, this, this.onMouseOutMapLayer);
			this.UIPanel.MapLayer.once(Laya.Event.MOUSE_UP, this, this.onMouseOutMapLayer);
			this.UIPanel.PetVDrawImg.startDrag();
		}

		private onMouseOutMapLayer(): void
		{
			this.UIPanel.PetVDrawImg.stopDrag();
		}

		private onClickLeft(): void
		{
			let value = this._value - 3;
			if (value < 0) value = 0;
			this.resetRollValue(value, true);
		}

		private onClickRight(): void
		{
			let value = this._value + 3;
			if (value > this._max) value = this._max;
			this.resetRollValue(value, true);
		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIPanel.PetVDrawImg.skin = Global.getResPetVDrawSkin(this.UIOpenData.customObject);
			this.UIPanel.PetVDrawImg.x = this.UIPanel.MapLayer.width / 2;
			this.UIPanel.PetVDrawImg.y = this.UIPanel.MapLayer.height / 2;

			this.initRollViewData();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		//////////////////////////////////////////////////
		//滑块相关逻辑 
		private _max: number = 1;
		private _value: number = -1;
		/** 滑块滑动范围 */
		private _rollRectangle: Laya.Rectangle;
		/** 拖拽中， UIButton的拖拽没有实时回调，暂自写一个 */
		private _isDraging: boolean = false;
		private initRollViewData(): void
		{
			this._max = 100;
			this._value = -1;

			let rollLimitLeft = this.UIPanel.imgBg.x + this.UIPanel.btnRoll.width * this.UIPanel.btnRoll.anchorX;
			let rollLimitRight = this.UIPanel.imgBg.x + this.UIPanel.imgBg.width - this.UIPanel.btnRoll.width * (1 - this.UIPanel.btnRoll.anchorX);
			this._rollRectangle = new Laya.Rectangle(rollLimitLeft, this.UIPanel.btnRoll.y, rollLimitRight - rollLimitLeft, 0);

			this.UIPanel.btnRoll.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownRollBtn);

			this.resetRollValue(50, true);
		}

		private resetRollValue(value: number, needRefreshRollView: boolean): void
		{
			if (this._value == value) return;
			this._value = value;
			let toScale = 0.5 + value / 100 * 0.8;
			this.UIPanel.PetVDrawImg.scale(toScale, toScale);
			if (needRefreshRollView) Laya.timer.callLater(this, this.refreshRollView);
		}


		private onMouseDownRollBtn(): void
		{
			this._isDraging = true;
			this.UIPanel.btnRoll.on(Laya.Event.DRAG_END, this, this.onDragEndRollBtn);
			this.UIPanel.btnRoll.on(Laya.Event.DRAG_MOVE, this, this.onDragMove)

			this.UIPanel.btnRoll.startDrag(this._rollRectangle);
		}

		private onDragEndRollBtn(): void
		{
			this.UIPanel.btnRoll.off(Laya.Event.DRAG_END, this, this.onDragEndRollBtn);
			this._isDraging = false;
			this.UIPanel.btnRoll.stopDrag();
		}

		private onDragMove(): void
		{
			//根据滑块的位置 ，换算出进度位置
			let progress = (this.UIPanel.btnRoll.x - this._rollRectangle.x) / this._rollRectangle.width;
			let value = Math.floor(this._max * progress + 0.5); //四舍五入
			this.resetRollValue(value, false);
			// //进度条始终跟随滑块走
			// this.imgProgress.width = this.UIPanel.btnRoll.x - this._rollRectangle.x + this.btnRoll.width * 0.5;
		}

		/** 刷新滑块显示 */
		private refreshRollView()
		{
			let progress: number = (this._max <= 0) ? 0 : (this._value / this._max);
			if (!this._isDraging)
			{
				let barWidth = progress * this._rollRectangle.width;
				this.UIPanel.btnRoll.x = this._rollRectangle.x + barWidth;
				// this.UIPanel.imgProgress.width = barWidth + this.UIPanel.btnRoll.width * 0.5;
			}
		}
	}
}