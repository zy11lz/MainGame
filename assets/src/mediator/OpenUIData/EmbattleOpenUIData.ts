/**
* name 
*/
module Pro
{
	export class EmbattleOpenUIData extends BaseOpenUIData
	{

		/** 战斗类型 */
		public battleType: Pb_God._emBattleType;

		/** 副本ID */
		public battleID: number;

		/** 战斗ID附带的参数（部分战斗类型除了ID以外还需要附加参数） */
		public battleParam: number;

		/** 准备锁定操作的布阵类型,-1:表示布阵所有，0:表示开战布阵，>=1指定布阵 */
		public lockEmType: Pb_God._emZhenfaType = -1;

		/** 锁定操作的布阵类型时，对应的队伍数量（默认情况下都是1个布阵类型对应1个队伍，极个别的类型除外，比如段位赛的王者赛，可以协带两个队伍出战） */
		public lockEmCount: number = 1;

		/** 显示血量状态 */
		public showBlood: boolean;

		/**
		 * @param lockEmType -1:表示布阵所有，0:表示开战布阵，>=1指定布阵
		 * @param battleType 如果lockEmType==0,这里指定战斗类型
		 * @param battleID 如果lockEmType==0,这里指定战斗类型的副本ID
		 */
		constructor(lockEmType: Pb_God._emZhenfaType = -1, battleType?: Pb_God._emBattleType, battleID?: number, battleParam?: number, showBlood: boolean = false)
		{
			super(PanelNotify.Open_EmBattle);
			this.lockEmType = lockEmType;
			this.battleType = battleType;
			this.battleID = battleID;
			this.battleParam = battleParam;
			this.showBlood = showBlood;
		}

	}
}