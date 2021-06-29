
module Pro
{
	export class AlertOpenUIData extends BaseOpenUIData
	{
		public showTitle: string;
		public des: string;
		public sure: AlertOpenUIData_Fun;
		public close: AlertOpenUIData_Fun;
		public sureDelayTime: number = 0;
		/** 今日不再提示用的key值， 如果有值：则对应保存的key  如果没有值，表示不需要显示“今日不再提示” */
		public todayRepeatKey: string = null;
		public priority: number = 0; //优先级，当有多个提示存在时，以优先级为高的显示

		public autoCloseOnEnd: boolean;//倒计时 结束后，是否自动关闭
		public clickEnableOnDelay: boolean;//倒计时 未结束时，是否可以点击确定按钮
		public executeCallFunOnClose: boolean;//关闭后，是否执行sure.fun回调
		public clickEnableOnClip: boolean = true;//空白区域是否可以点击，以关闭面板
		constructor()
		{
			super(PanelNotify.Open_Alert);
		}
	}

	export class AlertOpenUIData_Fun
	{
		Txt: string;
		caller: any;
		fun: Function;
	}
}