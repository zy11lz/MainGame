/**
* name
*/
module Pro
{
	export class EffNode extends Laya.Image implements common.Ipool
	{
		/** 技能资源索引 */
		protected skPath: string = "";
		/** 当前动作的索引贞 */
		protected frameIndex: number = 0;
		/** 暂停定帧 */
		protected _isPause: boolean = false;
		/** 下一帧切换时间 */
		protected frameTime: number = 0;
		/** 动作贞切换间隔 */
		protected frameExTime = 30;
		/**  序列帧图片名 */
		protected frameNameList: Array<string>;
		/** 播放速度  */
		private timeScale = 1;
		/**  当前特效的总时长  */
		public effAllTime = -1;
		/** 资源路径 */
		private resAtlasUrls: Array<string>;
		/**  资源释放管理 */
		private resReleaseType: ResReleaseType;
		/** 是否循环播放 */
		private _isLoop = true;
		public poolSign: common.PoolSign

		constructor()
		{
			super();
			this.poolSign = new common.PoolSign();
			this.reset();
		}

		public get isFree(): boolean
		{
			return this.poolSign.isFree;
		}

		/** 设置循环状态
		 * @param isLoop 是否循环播放
		 * @param complateCaller 非循环播放时，播放完成的回调
		 * @param complateFun 非循环播放时，播放完成的回调
		 */
		public setLoopState(isLoop: boolean): void
		{
			this._isLoop = isLoop;
		}

		/** 暂停定帧 */
		public setPause(isPause: boolean): void
		{
			this._isPause = isPause;
		}

		/** 初始化序列帧动画 */
		public initFrameAction(resPath: string, specialName: string, timeScale: number, effDetalTime: number, effAllTime: number, resReleaseType: ResReleaseType)
		{

			this.timeScale = timeScale;
			this.effAllTime = effAllTime;
			this.skin = "";
			this.resReleaseType = resReleaseType;

			this.skPath = resPath;
			this.frameTime = 0;
			this.frameExTime = effDetalTime;
			Laya.timer.clearAll(this);

			//加载资源
			this.resAtlasUrls = [];
			if (Laya.loader.getRes(UrlMgr.getAtlas(resPath)) != null)
			{
				this.onResLoadFinish(true, UrlMgr.getAtlas(resPath));
			} else
			{
				this.resAtlasUrls.push(UrlMgr.getAtlas(resPath));
				ResMgr.Inst.load(this.resAtlasUrls, this, this.onResLoadFinish, this.resAtlasUrls);
			}

		}

		/** 资源加载结束 */
		private onResLoadFinish(statue: boolean, param: any)
		{
			if (!statue)
			{
				return;
			}
			if (this.isFree)
			{
				return;
			}

			//资源释放管理
			if (this.resReleaseType == ResReleaseType.SceneChange)
			{
				//特效尽量不要使用这个管理，界面初始化时会出现闪烁
				ResMgr.Inst.recordAutoReleaseRes(param);
			}
			else if (this.resReleaseType == ResReleaseType.Reference)
			{
				ResMgr.Inst.addAtlasReference(param);
			}

			//获取图片帧名
			let tempAtlasData = Laya.loader.getRes(UrlMgr.getAtlas(this.skPath));
			let tempActionFrames = tempAtlasData == null ? null : tempAtlasData["frames"];
			if (tempActionFrames == null)
			{
				logE("特效资源加载失败:" + this.skPath);
				return;
			}

			this.frameNameList = new Array<string>();
			for (let tempKey in tempActionFrames)
			{
				this.frameNameList.push(tempKey);
			}
			this.play(0);

		}

		play(startFrame: number = 0)
		{
			//开始序列帧动画
			this.frameIndex = startFrame;
			// Laya.timer.frameLoop(30, this, this.update);
			Laya.timer.frameLoop(1, this, this.update);
		}

		stop()
		{
			Laya.timer.clearAll(this.update);
		}

		/** 刷新动画帧 */
		private update()
		{
			if (this.frameNameList == null)
			{
				return;
			}
			if (Laya.timer.currTimer - this.frameTime < this.frameExTime / this.timeScale)
			{
				return;
			}
			if (this._isPause)
			{
				this.skin = "res/" + this.skPath + "/" + this.frameNameList[this.frameIndex];
			}
			else
			{
				if (this.frameIndex >= this.frameNameList.length)
				{
					this.frameIndex = 0;
					if (!this._isLoop)
					{
						// this.cleanUp();
						this.event(Laya.Event.COMPLETE, this);
						return;
					}
				}
				this.skin = "res/" + this.skPath + "/" + this.frameNameList[this.frameIndex];
				//记录下一帧切换时间
				this.frameTime = Laya.timer.currTimer;
				this.frameIndex++;
			}
		}

		destory(): void
		{

		}

		release(): void
		{
			// this.isRecover = false;
			this.reset();
			//资源释放管理
			if (this.resReleaseType == ResReleaseType.Reference)
			{
				ResMgr.Inst.cutAtlasReference(this.resAtlasUrls);
				this.resReleaseType = null;
			}
			//关闭所有定时器
			Laya.timer.clearAll(this);
			Laya.Tween.clearAll(this);
			this.skin = "";
			this._isLoop = true;
		}

		reset(): void
		{
			this.scale(1, 1);
			this.anchorX = 0.5;
			this.anchorY = 0.5;
			this.rotation = 0;
			this.blendMode = "";
			this.filters = null;
			this.visible = true;
		}
	}
}