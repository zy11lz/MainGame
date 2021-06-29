
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
	export class DragonBallDataMgrBase
	{
		constructor()
		{

		}

		/** 类型对应龙珠数据 */
		protected _dataMap = new ds.StringMap<Pb_God.PBPlayerDragonBall>();
		/** 红点初始化 */
		protected initRedDot:boolean = false;

		public init(data: Pb_God.PBPlayerDragonBallData): void
		{
			if (!data) return;
			Global.listToStringMapData(data.balls, "type", this._dataMap, true);

			//初始化红点数据模型
			this.initReddotModel();
		}

		/** 获取等级 */
		public getLevelByType(type: number): number
		{
			let data = this._dataMap.get(type);
			return data ? data.level : 0;
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
				//6个不同的龙珠类型(第七个无操作)
				for (let type = 1; type <= 6; type++)
				{
					let reddot = this.reddotModel.addChildModel(type);
					reddot.setSystemSwitchId(emSystemSwitchType.DragonBall);
					reddot.addGlobalEventRefresh(EventNotify.DragonBall_LevelChange, type);
					reddot.setupCheckMethod(this, () =>
					{
						let level = this.getLevelByType(type);
						let needItem: cfg.AddItemInfo;
						//是否已激活
						if (level == 0)
						{ //未激活时检查激活道具是否足够
							needItem = cfg.DragonBallUnlockCfgData.getNeedItemInfoByType(type);
						} else
						{
							needItem = cfg.DragonBallLevelCfgData.getNeedItemInfoByInfo(type, level);
						}
						//满级了
						if (!needItem)
						{
							reddot.setPlayerItemsListener(null);
							return false;
						}
						reddot.setPlayerItemsListener([needItem.itemid]);
						return Global.isFullRes(needItem.itemid, needItem.itemcount, false);
					})
				}
			}
			this.initRedDot = true;
		}
	}
}
