
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
	export class RoomData_auto extends RoomDataMgrBase
	{
		constructor()
		{
			super()
			//增加、放置家具,拜访返回 PBFurnitureInfo
			EventMgr.on(Cmd.S2C_Room_placeFurnitureInfo.cmdName, this, this.onPlaceFurnitureInfo)
		}
		/*****
		 *增加、放置家具,拜访返回 PBFurnitureInfo
		 * @param PBFurnitureInfo
		 * 		owner			uint32	当前房屋主人
		 * 		furnitureData			PBFurniture	家具信息
		 * 		updateAll			bool	是否全更新 true:：全更新  fale:增量更新
		 */
		protected onPlaceFurnitureInfo(value: Pb_God.PBFurnitureInfo): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}