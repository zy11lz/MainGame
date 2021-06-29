
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
	export class ConvenantDataMgrBase
	{
		constructor()
		{

		}

		/** 总数 */
		public readonly ItemNum = 5;

		/** 契约部位对应属性生效索引(attr index 0 未生效 1 2 3属性索引) */
		protected _partAttrMap = new ds.StringMap<number>();
		/** 战斗力保存(在打开界面的时候拉取一次初始化即可) */
		protected _fightValueMap: ds.StringMap<number>;
		/** 红点初始化 */
    	protected initRedDot:boolean = false;

		public init(data: Pb_God.PBPlayerConvenantData): void
		{
			if (!data) return;
			this._fightValueMap = null;
			this._level = data.level;
			this._partAttrMap.clear();
			for (let el of data.parts)
			{
				this._partAttrMap.put(el.key, el.value);
			}

			//初始化红点数据模型
			this.initReddotModel();
		}

		protected _level = 0;
		/** 契约等级，0表示未解锁 */
		public get level(): number
		{
			return this._level;
		}

		/** 等级变化 */
		public setLevel(level: number): void
		{
			if (level == this._level) return;
			for (var i = 1; i <= this.ItemNum; i++)
			{
				if (this.getPartAttrIndex(i) > 0) ConvenantSend.power(i);
			}
			this._level = level;
			EventMgr.trigger(EventNotify.Convenant_LevelChange, this._level);
		}

		/** 获取部位的属性生效索引(0表示未生效， 123表示对应的位置) */
		public getPartAttrIndex(part: number): number
		{
			return this._partAttrMap.get(part) || 0;
		}

		public initFightValue(): void
		{
			if (this._fightValueMap) return;
			this._fightValueMap = new ds.StringMap<number>();
			if (this.level == 0) return;
			for (var i = 1; i <= this.ItemNum; i++)
			{
				if (this.getPartAttrIndex(i) > 0) ConvenantSend.power(i);
			}
		}

		public getFightValue(type: number): number
		{
			if (!this._fightValueMap) return 0;
			return this._fightValueMap.get(type) || 0;
		}


		/////////////////////////////////////////////////////
		////////////////// 红点  //////////////////////////
		/////////////////////////////////////////////////////
		/** 红点模型 */
		public reddotModel: RedDotModel = new RedDotModel;
		private initReddotModel(): void
		{
			if(!this.initRedDot)
			{
				this.reddotModel.cleanUp(true);
				this.reddotModel.setSystemSwitchId(emSystemSwitchType.Convenant);
				this.reddotModel.addGlobalEventRefresh(CmdEvent.Convenant_Attr);
				this.reddotModel.addGlobalEventRefresh(EventNotify.Convenant_LevelChange);
				this.reddotModel.setupCheckMethod(this, this.checkReddot);
			}
			this.initRedDot = true;
		}
		private checkReddot(): boolean
		{
			//是否解锁
			let level = this._level;
			if (level <= 0)
			{ //未解锁时，只需要检查并监听解锁材料即可
				let needItems = cfg.ConvenantConstCfgData.getUnlockNeedItemInfoArr();
				this.reddotModel.setPlayerItemInfosListener(needItems);
				return Global.isFullAllRes(needItems, false);
			} else
			{
				//已经激活后，看是否有未选择属性的
				for (var i = 1; i <= this.ItemNum; i++)
				{
					if (this.getPartAttrIndex(i) <= 0) return true;
				}
				let needItems = cfg.ConvenantLevelCfgData.getNeedItemsByLevel(level);
				this.reddotModel.setPlayerItemInfosListener(needItems);
				if (needItems.length <= 0) return false;
				return Global.isFullAllRes(needItems, false);
			}
		}
	}
}
