/**
* name 
*/
module Pro
{
	export class RoleCityData
	{

		/** 站立的坐标 */
		public standIndex: number = 0;

		/** 我方阵营 */
		public isOwer: boolean = false;

		/** 玩家ID */
		public uid: number = 0;

		/** 玩家名称 */
		public playerName: string = "";

		/**	角色id */
		public curRid: number = 0;

		/**	角色sn */
		public curSn: Long;

		/**	是否是英雄 */
		public isHero: boolean = false;
	}
}