
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
	export class TeamDataMgrBase
	{
		/** 当前所在队伍信息 */
		protected teamData: Pb_God.PBTeamData;

		/** 当前队伍列表 */
		protected teamList: Pb_God.PBTeamBase[] = [];

		constructor()
		{

		}

		/** 初始化 */
		public init()
		{
			this.teamData = null;
			this.teamList.splice(0, this.teamList.length);
		}

		//---------------------------------------------------------------------------
		/** 当前队伍信息 */
		public getTeamData(): Pb_God.PBTeamData
		{
			return this.teamData;
		}

		/** 当前推荐队伍列表 */
		public getTeamList(): Pb_God.PBTeamBase[]
		{
			return this.teamList;
		}

		/** 当前组队副本今日进入次数 */
		public getTeamBatEnterTimes(id: number): number
		{
			return 0;
		}
	}
}
