
/**
*  自己定制性能监视
*  @author fly*yhliuyang
*/
module Pro
{
	import Stat = Laya.Stat;
	export class FlyStatUI implements Laya.IStatRender
	{
		static memoryInfo: StatMemoryInfo;
		constructor()
		{

		}

		private static _fontSize: number = 12;
		private _txt: Laya.Text;
		private _leftText: Laya.Text;
		/**@internal */
		_sp: Laya.Sprite;
		/**@internal */
		_titleSp: Laya.Sprite;
		/**@internal */
		_bgSp: Laya.Sprite;
		/**@internal */
		_show: boolean = false;
		/**@internal */
		_useCanvas: boolean = false;
		private _canvas: Laya.HTMLCanvas;
		private _ctx: Laya.Context;
		private _first: boolean;
		private _vx: number;
		private _width: number;
		private _height: number = 100;
		private _statInfoArr: StatItemInfo[] = [];


		/**
		 * @override
		 * 显示性能统计信息。
		 * @param	x X轴显示位置。
		 * @param	y Y轴显示位置。
		 */
		show(x: number = 0, y: number = 0): void
		{
			FlyStatUI.memoryInfo = StatMemoryInfo.insntace;//  new StatMemoryInfo();
			var dt: any = Laya.Stat;
			if (!Laya.Browser.onMiniGame && !Laya.Render.isConchApp && !Laya.Browser.onBDMiniGame
				&& !Laya.Browser.onKGMiniGame && !Laya.Browser.onQGMiniGame && !Laya.Browser.onQQMiniGame
				&& !Laya.Browser.onAlipayMiniGame && !Laya.Browser.onBLMiniGame && !Laya.Browser.onTTMiniGame
				&& !Laya.Browser.onHWMiniGame)
			{
				this._useCanvas = true;
			}
			this._show = true;
			Laya.Stat._fpsData.length = 60;
			this._statInfoArr.push({ title: "FPS(WebGL)", targetCls: Laya.Stat, value: "_fpsStr", color: "yellow", units: "int", x: 0, y: 0 });
			this._statInfoArr.push({ title: "Sprite", targetCls: Laya.Stat, value: "_spriteStr", color: "white", units: "int", x: 0, y: 0 });
			this._statInfoArr.push({ title: "rb", targetCls: Laya.Stat, value: "renderBatches", color: "white", units: "int", x: 0, y: 0 });
			this._statInfoArr.push({ title: "srb", targetCls: Laya.Stat, value: "savedRenderBatches", color: "white", units: "int", x: 0, y: 0 });
			this._statInfoArr.push({ title: "CPUMemory", targetCls: Laya.Stat, value: "cpuMemory", color: "yellow", units: "M", x: 0, y: 0 });
			this._statInfoArr.push({ title: "GPUMemory", targetCls: Laya.Stat, value: "gpuMemory", color: "yellow", units: "M", x: 0, y: 0 });
			this._statInfoArr.push({ title: "Shader", targetCls: Laya.Stat, value: "shaderCall", color: "white", units: "int", x: 0, y: 0 });
			this._statInfoArr.push({ title: "Canvas", targetCls: Laya.Stat, value: "_canvasStr", color: "white", units: "int", x: 0, y: 0 });
			this._statInfoArr.push({ title: "spineNum", targetCls: spine.SpineStat, value: "rendNum", color: "white", units: "int", x: 0, y: 0 });
			this._statInfoArr.push({ title: "memUsed", targetCls: FlyStatUI.memoryInfo, value: "used", color: "white", units: "int", x: 0, y: 0 });
			this._statInfoArr.push({ title: "memTotal", targetCls: FlyStatUI.memoryInfo, value: "total", color: "white", units: "int", x: 0, y: 0 });
			this._statInfoArr.push({ title: "memMax", targetCls: FlyStatUI.memoryInfo, value: "max", color: "white", units: "int", x: 0, y: 0 });

			if (Laya.Render.is3DMode)
			{
				this._statInfoArr[0].title = "FPS(3D)";
				this._statInfoArr.push({ title: "TriFaces", targetCls: Laya.Stat, value: "trianglesFaces", color: "white", units: "int", x: 0, y: 0 });
				this._statInfoArr.push({ title: "FrustumCulling", targetCls: Laya.Stat, value: "frustumCulling", color: "white", units: "int", x: 0, y: 0 });
				this._statInfoArr.push({ title: "OctreeNodeCulling", targetCls: Laya.Stat, value: "octreeNodeCulling", color: "white", units: "int", x: 0, y: 0 });
			}
			if (this._useCanvas)
			{
				this.createUIPre(x, y);
			} else
			{
				this.createUI(x, y);
			}

			this.enable();
		}

		private createUIPre(x: number, y: number): void
		{
			var pixel: number = Laya.Browser.pixelRatio;
			this._width = pixel * 180;
			this._vx = pixel * 70;
			this._height = pixel * (this._statInfoArr.length * 12 + 3 * pixel) + 4;
			FlyStatUI._fontSize = 12 * pixel;
			for (var i: number = 0; i < this._statInfoArr.length; i++)
			{
				this._statInfoArr[i].x = 4;
				this._statInfoArr[i].y = i * FlyStatUI._fontSize + 2 * pixel;
			}
			if (!this._canvas)
			{
				this._canvas = new Laya.HTMLCanvas(true);
				this._canvas.size(this._width, this._height);
				this._ctx = this._canvas.getContext('2d') as Laya.Context;
				this._ctx.textBaseline = "top";
				this._ctx.font = FlyStatUI._fontSize + "px Arial";

				this._canvas.source.style.cssText = "pointer-events:none;background:rgba(150,150,150,0.8);z-index:100000;position: absolute;direction:ltr;left:" + x + "px;top:" + y + "px;width:" + (this._width / pixel) + "px;height:" + (this._height / pixel) + "px;";
			}
			if (!Laya.Browser.onKGMiniGame)
			{
				Laya.Browser.container.appendChild(this._canvas.source);
			}

			this._first = true;
			this.loop();
			this._first = false;
		}

		private createUI(x: number, y: number): void
		{
			var stat: Sprite = this._sp;
			var pixel: number = Laya.Browser.pixelRatio;
			if (!stat)
			{
				stat = new Sprite();
				this._leftText = new Laya.Text();
				this._leftText.pos(5, 5);
				this._leftText.color = "#ffffff";
				stat.addChild(this._leftText);

				this._txt = new Laya.Text();
				this._txt.pos(130 * pixel, 5);
				this._txt.color = "#ffffff";
				stat.addChild(this._txt);
				this._sp = stat;
			}

			stat.pos(x, y);

			var text: string = "";
			for (var i: number = 0; i < this._statInfoArr.length; i++)
			{
				var one: StatItemInfo = this._statInfoArr[i];
				text += one.title + "\n";
			}
			this._leftText.text = text;

			//调整为合适大小和字体
			var width: number = pixel * 138;
			var height: number = pixel * (this._statInfoArr.length * 12 + 3 * pixel) + 4;
			this._txt.fontSize = FlyStatUI._fontSize * pixel;
			this._leftText.fontSize = FlyStatUI._fontSize * pixel;

			stat.size(width, height);
			stat.graphics.clear();
			stat.graphics.alpha(0.5);
			stat.graphics.drawRect(0, 0, width + 110, height + 30, "#999999");
			stat.graphics.alpha(2);
			this.loop();
		}

		/**
		 * @override
		 * 激活性能统计
		 * */
		enable(): void
		{
			Laya.systemTimer.frameLoop(1, this, this.loop);
		}

		/**
		 * @override
		 * 隐藏性能统计信息。
		 */
		hide(): void
		{
			this._show = false;
			Laya.systemTimer.clear(this, this.loop);
			if (this._canvas)
			{
				Laya.Browser.removeElement(this._canvas.source);
			}
		}

		/**
		 * @override
		 * 点击性能统计显示区域的处理函数。
		 */
		set_onclick(fn: (this: GlobalEventHandlers, ev: MouseEvent) => any): void
		{
			if (this._sp)
			{
				this._sp.on("click", this._sp, fn);
			}
			if (this._canvas)
			{
				this._canvas.source.onclick = fn;
				this._canvas.source.style.pointerEvents = '';
			}
		}

		/**
		 * @private
		 * 性能统计参数计算循环处理函数。
		 */
		loop(): void
		{
			Laya.Stat._count++;
			var timer: number = Laya.Browser.now();
			if (timer - Stat._timer < 1000) { return; }

			var count: number = Laya.Stat._count;
			//计算更精确的FPS值
			Laya.Stat.FPS = Math.round((count * 1000) / (timer - Laya.Stat._timer));
			if (this._show)
			{
				FlyStatUI.memoryInfo.update();
				//计算平均值
				Laya.Stat.trianglesFaces = Math.round(Laya.Stat.trianglesFaces / count);

				if (!this._useCanvas)
				{
					Laya.Stat.renderBatches = Math.round(Laya.Stat.renderBatches / count) - 1;
				} else
				{
					Stat.renderBatches = Math.round(Laya.Stat.renderBatches / count);
				}
				Stat.savedRenderBatches = Math.round(Stat.savedRenderBatches / count);
				Stat.shaderCall = Math.round(Stat.shaderCall / count);
				Stat.spriteRenderUseCacheCount = Math.round(Stat.spriteRenderUseCacheCount / count);
				Stat.canvasNormal = Math.round(Stat.canvasNormal / count);
				Stat.canvasBitmap = Math.round(Stat.canvasBitmap / count);
				Stat.canvasReCache = Math.ceil(Stat.canvasReCache / count);
				Stat.frustumCulling = Math.round(Stat.frustumCulling / count);
				Stat.octreeNodeCulling = Math.round(Stat.octreeNodeCulling / count);

				var delay: string = Stat.FPS > 0 ? Math.floor(1000 / Stat.FPS).toString() : " ";
				Stat._fpsStr = Stat.FPS + (Stat.renderSlow ? " slow" : "") + " " + delay;

				// if (this._useCanvas)
				// Stat._spriteStr = (Stat.spriteCount - 1) + (Stat.spriteRenderUseCacheCount ? ("/" + Stat.spriteRenderUseCacheCount) : '');
				// else
				Stat._spriteStr = Stat.spriteCount + (Stat.spriteRenderUseCacheCount ? ("/" + Stat.spriteRenderUseCacheCount) : '');

				Stat._canvasStr = Stat.canvasReCache + "/" + Stat.canvasNormal + "/" + Stat.canvasBitmap;
				Stat.cpuMemory = Laya.Resource.cpuMemory;
				Stat.gpuMemory = Laya.Resource.gpuMemory;
				if (this._useCanvas)
				{
					this.renderInfoPre();
				} else
				{ this.renderInfo(); }
				Stat.clear();
			}

			Stat._count = 0;
			Stat._timer = timer;
		}

		private renderInfoPre(): void
		{
			var i: number = 0;
			var one: StatItemInfo;
			var value: any;
			if (this._canvas)
			{
				var ctx: any = this._ctx;
				ctx.clearRect(this._first ? 0 : this._vx, 0, this._width, this._height);
				for (i = 0; i < this._statInfoArr.length; i++)
				{
					one = this._statInfoArr[i];
					//只有第一次才渲染标题文字，减少文字渲染次数
					if (this._first)
					{
						ctx.fillStyle = "white";
						ctx.fillText(one.title, one.x, one.y);
					}
					ctx.fillStyle = one.color;
					value = one.targetCls[one.value];
					(one.units == "M") && (value = Math.floor(value / (1024 * 1024) * 100) / 100 + " M");
					ctx.fillText(value + "", one.x + this._vx, one.y);
				}
			}
		}

		private renderInfo(): void
		{
			var text: string = "";
			for (var i: number = 0; i < this._statInfoArr.length; i++)
			{
				var one: StatItemInfo = this._statInfoArr[i];
				var value: any = one.targetCls[one.value];//  Stat[one.value];
				(one.units == "M") && (value = Math.floor(value / (1024 * 1024) * 100) / 100 + " M");
				(one.units == "K") && (value = Math.floor(value / (1024) * 100) / 100 + " K");
				text += value + "\n";
			}
			this._txt.text = text;
		}

		/**
		 * @override
		 */
		isCanvasRender(): boolean
		{
			return this._useCanvas;
		}

		/**
		 * @override
		 * 非canvas模式的渲染
		 * */
		renderNotCanvas(ctx: any, x: number, y: number)
		{
			this._show && this._sp && this._sp.render(ctx, 0, 0);
		}
	}
}