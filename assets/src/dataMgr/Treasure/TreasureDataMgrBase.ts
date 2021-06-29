
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
	export class TreasureDataMgrBase
	{
		constructor()
		{

		}

		//////////////////////////////////////////////////
		/** 根据类型获取探宝数据 */
		protected _dataMapType: ds.StringMap<Pb_God.PBPlayerTreasureData>;

		public init(info: Pb_God.PBPlayerTreasure): void
		{
			this._dataMapType = Global.listToStringMapData(info ? info.data : [], "type");
			this.initReddotModel();
		}


		/** 根据类型获取探宝数据(type 1-2) */
		public getDataByType(type: number): Pb_God.PBPlayerTreasureData
		{
			let ret = this._dataMapType.get(type);
			if (!ret)
			{ //按理说应该不会进到这里，先做个容错吧。
				ret = new Pb_God.PBPlayerTreasureData;
				ret.type = type;
				ret.displayitems = [];
				ret.luckyitems = [];
				ret.displayitemsnum = [];
				ret.displayrand = [];
				this._dataMapType.put(type, ret);
			}
			return ret;
		}


		/** 红点模型 */
		public reddotModel: RedDotModel = new RedDotModel;
		private initReddotModel(): void
		{
			let treasureItems: number[] = [];
			this.reddotModel.cleanUp(true);
			//对应两个分页类型
			for (var i = 1; i <= 2; i++)
			{
				let childModel = this.reddotModel.addChildModel(i);
				//关联所需要的道具
				let needItems: number[] = [];
				//幸运值
				let luckyCfgInfo = cfg.TreasureLuckyRewardCfgData.getListByType(i)[0];
				let needItem = cfg.TreasureLuckyRewardCfgData.getNeedItemInfoByInfo(luckyCfgInfo);
				needItems.push(needItem.itemid);
				//探宝券
				let costCfgInfo = cfg.TreasureCostCfgData.getListByType(i)[0];
				needItem = cfg.TreasureCostCfgData.getNeedItemInfoByInfo(costCfgInfo);
				needItems.push(needItem.itemid);
				treasureItems.push(needItem.itemid);
				childModel.setPlayerItemsListener(needItems);
				childModel.setupCheckMethod(this, this.checkReddot);

			}
			this.reddotModel.setPlayerItemsListener(treasureItems);
			this.reddotModel.setupCheckMethod(this,this.checkReddotModel);
		}

		private checkReddot(reddotModel: RedDotModel): boolean
		{
			let type = reddotModel.bindData;
			if (cfg.TreasureHuntTypeCfgData.getNeedLevelByType(type) > PlayerDataMgr.level) return false;
			//有幸运奖励可领取
			let list = cfg.TreasureLuckyRewardCfgData.getListByType(type);
			let data = this.getDataByType(type);
			for (var el of list)
			{
				let isGet = data && data.luckyitems.indexOf(el.index) >= 0;
				if (isGet) continue;
				let needItemInfo = cfg.TreasureLuckyRewardCfgData.getNeedItemInfoByInfo(el);
				if (needItemInfo.itemcount <= Global.getItemNum(needItemInfo.itemid)) return true;
			}
			//有探宝券可用
			let costCfgInfo = cfg.TreasureCostCfgData.getListByType(type)[0];
			let needItem = cfg.TreasureCostCfgData.getNeedItemInfoByInfo(costCfgInfo);
			return Global.isFullRes(needItem.itemid, needItem.itemcount, false);
		}


		private checkReddotModel(reddotModel: RedDotModel): boolean
		{
			return true
		}
	}
}
