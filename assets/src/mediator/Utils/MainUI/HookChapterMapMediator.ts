
module Pro
{
	/**
     * 世界地图
     */
	export class HookChapterMapMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Scene.City.Utils.HookChapterMapUI;

		private _mapDrag: MapDrag;

		private _bound: Laya.Rectangle;

		/**获取当前战斗ID */
		private _stageID: number;

		/**获取玩家当前所在章节ID */
		private _sceneID: number;

		/** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("commontitle01")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): string[]
		{
			return [
				"res/Unpack/worldMap/worldMapBg.jpg",
			];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Scene.City.Utils.HookChapterMapUI, 1, BaseAddLayer.CenterUI);
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

			this.adjustScreenPos();
		}

		private adjustScreenPos()
		{
			this.UIPanel.height = GameConfig.curHeight();
			this.UIPanel.centerY = 0;
			let maxScale = Math.max(GameConfig.curHeight() / GameConfig.WinHeight, GameConfig.curWidth() / GameConfig.WinWidth);
			this.UIPanel.bg.width *= maxScale;
			this.UIPanel.bg.height *= maxScale;

		}
		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.UIPanel.BackBtn.onClick(this, this.closeUI);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{
		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this._stageID = HookDataMgr.getStageID();
			this._sceneID = cfg.HookStageCfgData.getSceneIDByStageID(HookDataMgr.getStageID());
			this._sceneID = this._sceneID <= 0 ? 1 : this._sceneID;
			this.initRollViewData();
			this.initMapInfo();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		private initRollViewData(): void
		{

			let ChapterName = cfg.HookSceneCfgData.getInfo(this._sceneID);
			let tab_arr = ChapterName.stage.split("_");
			this.UIPanel.chapterNameTxt.text = ChapterName.chapterName + " " + ChapterName.sceneName;
			this.UIPanel.chapterProgressTxt.text = Global.getLangStr("ChapterProgress") + (this._stageID - parseInt(tab_arr[0]) + 1) + "/" + (parseInt(tab_arr[1]) + 1 - parseInt(tab_arr[0]));
			this.UIPanel.PetVDrawImg.skin = `res/Unpack/worldMap/scene${ ChapterName.sceneResource }.png`;

			this._mapDrag = new MapDrag();
			this._bound = new Laya.Rectangle(-this.UIPanel.bg.width + GameConfig.curWidth(), -this.UIPanel.bg.height + GameConfig.curHeight(), this.UIPanel.bg.width - Laya.stage.width, 0);
			this._mapDrag.start(this.UIPanel.bg, this._bound, true, 0, 300, null, true);
			this._mapDrag.stop();
		}

		private initMapInfo()
		{
			this.UIPanel.on(Laya.Event.MOUSE_DOWN, this, this.onMapInfoDown);
			this.UIPanel.bg.mouseEnabled = true;
			this.UIPanel.bg.mouseThrough = true;
		}

		private onMapInfoDown(event: any)
		{
			this._mapDrag.stop();
			this._mapDrag.start(this.UIPanel.bg, this._bound, true, 0, 300, null, true);
		}

	}
}