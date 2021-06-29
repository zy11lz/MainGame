module Pro
{

	/** 
	 * Mediator打开时背后界面的处理
	 */
	export enum BaseBackUIType
	{
		/**
		 * 不做任何处理
		 */
		None,
		/**
		 * 隐藏背后UI
		 */
		HideBackUI,
		/**
		 * 关闭背后UI
		 */
		CloseBackUI,
		/**
		 * 关闭所有打开的界面
		 */
		CloseQuene
	}

	/** 
	 * Mediator默认打开的数据节点
	 */
	export class BaseOpenUIData
	{

		/** 
		 * 打开的UI节点事件名称 
		 */
		public name: string;

		/**
		 * 打开顺序
		 */
		public orderIndex: number = -1;

		/**
		 * 携带参数
		 */
		public customObject: any;
		/** 
		 * 携带附加参数2 
		 * */
		public customObject2: any;


		/**
		 * 打开窗口对背后界面的操作
		 */
		public backUIType: BaseBackUIType;

		constructor(panelName: string, customObject: any = null, customObject2: any = null)
		{
			this.name = panelName;
			this.customObject = customObject;
			this.customObject2 = customObject2;
		}

		/** 界面弹出时被中止 */
		public stopOpen(): void
		{

		}
	}
}