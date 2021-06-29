
/**
*
*  根据 proto 文件自动生成的代码
*
* 【**不可手动修改此类**】，
*
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的proto文件】
*
* @author liuYang.AutoCreater
*
*/

module Pro
{
	export class TreasureData_auto extends TreasureDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用错误返回
			EventMgr.on(Cmd.S2C_Treasure_Common.cmdName, this, this.onCommon)
			//	 刷新返回				PBG2CTreasureRefresh
			EventMgr.on(Cmd.S2C_Treasure_Refresh.cmdName, this, this.onRefresh)
			//	 探宝返回				PBG2CTreasureHunt
			EventMgr.on(Cmd.S2C_Treasure_Hunt.cmdName, this, this.onHunt)
			//	 幸运值兑换物品返回 	 PBG2CTreasureLucky
			EventMgr.on(Cmd.S2C_Treasure_Lucky.cmdName, this, this.onLucky)
		}
		/*****
		 *	 通用错误返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	 刷新返回				PBG2CTreasureRefresh
		 * @param PBG2CTreasureRefresh
		 * 		type			uint32	 类型
		 * 		items			uint32	 刷新出来的物品index(也就是displayItems)，先后顺序对应位置
		 * 		rand			uint32	 刷出来随机物品（hunt表中index条目的第几个随机物品，从0开始），位置与items对应
		 * 		resettime			uint32	 下次免费刷新的重置时间
		 */
		protected onRefresh(value: Pb_God.PBG2CTreasureRefresh): void
		{
			let data = this.getDataByType(value.type);
			data.displayitemsnum = [];
			data.displayitems = value.items;
			data.displayrand = value.rand;
			data.nextresettime = value.resettime;
		}
		/*****
		 *	 探宝返回				PBG2CTreasureHunt
		 * @param PBG2CTreasureHunt
		 * 		type			uint32	 类型
		 * 		items			uint32	 得到的物品position(在displayitems里的位置，从0开始的),先后顺序对应第几次摇出
		 * 		oncemone			bool	 是否是再来一次(仅供客户端使用)
		 * 		broadcast			bool	 是否有需要广播的物品
		 */
		protected onHunt(value: Pb_God.PBG2CTreasureHunt): void
		{
			let data = this.getDataByType(value.type);
			for (var itemindex of value.items)
			{
				let num = data.displayitemsnum[itemindex] || 0;
				data.displayitemsnum[itemindex] = num + 1;
			}
		}
		/*****
		 *	 幸运值兑换物品返回 	 PBG2CTreasureLucky
		 * @param PBG2CTreasureLucky
		 * 		index			uint32	 索引
		 * 		reset			bool	 是否重置
		 */
		protected onLucky(value: Pb_God.PBG2CTreasureLucky): void
		{
			let type = cfg.TreasureLuckyRewardCfgData.getTypeByIndex(value.index);
			let data = this.getDataByType(type);
			if (value.reset)
			{
				data.luckyitems = [];
			} else
			{
				data.luckyitems.push(value.index);
			}
			this.reddotModel.refreshChild(type);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}