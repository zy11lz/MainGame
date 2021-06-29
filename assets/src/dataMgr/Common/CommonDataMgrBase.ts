
/**
* 
*	
* 保存服务器的发送的数据
* 
*  1.socket读取二进制数据----》
*  2.二进制数据转换为proto-------》 
*  3.抛出协议事件 -------》 
*  4.各个系统的dataMgr侦听事件，接收并保存服务器发过来的数据 ------》 
*  5.dataMgr抛出数据整理好的CmdEvent事件  -------》 
*  6.各个ui侦听CmdEvent事件，向各个系统的dataMgr提供的方法接口获取最新的数据，更新ui显示
* 
*  ui不负责直接侦听服务器数据事件， 也不负责保存服务器数据，
*  由各个系统的dataMgr统一管理
* 
*/

module Pro 
{
	export class CommonDataMgrBase
	{
		constructor()
		{

		}

		/** 世界等级 */
		public _worldLevel = 0;
		public get worldLevel(): number
		{
			return this._worldLevel;
		}
		public set worldLevel(value: number)
		{
			if (this._worldLevel == value) return;
			this._worldLevel = value;
			EventMgr.trigger(EventNotify.WorldLevel_Change, value);
		}

		/** 通用的简单领奖状态 */
		protected _prizeStateMap = new ds.StringMap<number>();
		/** 领奖前的操作状态（先有操作才能有领奖） */
		protected _prizeReadyStateArr: string[] = [];
		public init(data: Pb_God.PBPlayerCommonData): void
		{
			if (!data) this._prizeStateMap.clear();
			else Global.listToStringMap(data.prize, this._prizeStateMap, true);
		}

		/** 初始化操作状态 */
		public initPrizeReadyState(strArr: string[]): void
		{
			this._prizeReadyStateArr = strArr || [];
		}
		/** 反序列化操作状态，转成可以保存的字符串 */
		public getPrizeReadyString(): string
		{
			return this._prizeReadyStateArr.join("|");
		}

		/** 设置奖励准备状态（已处理相关的操作待领奖） */
		public setPrizeReady(type: number): void
		{
			//已经有过了。
			if (this._prizeReadyStateArr.indexOf(type + "") >= 0) return;
			this._prizeReadyStateArr.push(type + "");
			//存起来
			GameLaunch.saveClientData();
			EventMgr.trigger(EventNotify.CommonPrizeState_Change, type);
		}

		/** 获取奖励状态
		 * @return 0-未处理 1-已处理待领奖 2-已领奖
		 */
		public getCommonPrizeState(type: number): number
		{
			if (this._prizeStateMap.get(type)) return 2;
			if (this._prizeReadyStateArr.indexOf(type + "") >= 0) return 1;
			return 0;
		}

	}
}
