
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RoomFurnitureCfgData extends cfg.RoomFurnitureBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.RoomFurnitureCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
