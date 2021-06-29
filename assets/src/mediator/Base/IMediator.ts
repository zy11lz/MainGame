
module Pro
{
	/**
     * 所有继承BaseMediator需要编写的接口
     */
	export interface IMediator
	{
		/** UI面板 */
		UIPanel: any;

		mediatorName:string;

		UIOpenData:BaseOpenUIData;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>;

		/** UI打开前状态 */
		openUI(): void;

		/** 关闭UI*/
		closeUI(): void;

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void;

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void;

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void;

		/** 初始化面板(UI每次打开) */
		initUI(): void;

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void;

		setOpenData(data:BaseOpenUIData);

		//--------------------------------------
		checkCanDisplayUI():boolean;
		forceDestroyUI();
		forceCloseUI();
		undisplayUI();
		displayUI();
		getIsInitStatue();
		Guide_Active(step:number);
		Guide_Enter(step:number);
		getUI();
		getAddUILayer();
		isFullSreenShow():boolean;
		resetUIOpenData(data:BaseOpenUIData);
		getIsPopUp():boolean;
	}
}