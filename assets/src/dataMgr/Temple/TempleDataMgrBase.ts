
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
	export class TempleDataMgrBase 
	{
		constructor() 
		{

		}

		///////////////////////// 代码整理分隔线 //////////////////////////////////

		/** 时间限制（上一场失败时会限制下一场的时间） */
		public limitOverTime: number = 0;

		public init(info: Pb_God.PBPlayerTemple): void
		{
			this.limitOverTime = info ? info.nextfighttime : 0;
		}

		/** 神殿数据id映射（由列表转换而来，便于查找） */
		protected _templeInfoMapID = new ds.StringMap<Pb_God.PBTempleInfoBase>();

		protected listToMap(list: Pb_God.PBTempleInfoBase[]): void
		{
			this._templeInfoMapID = Global.listToStringMapData(list, "id", this._templeInfoMapID);
		}

		public getTempleInfo(id: number): Pb_God.PBTempleInfoBase
		{
			return this._templeInfoMapID.get(id);
		}
	}
}
