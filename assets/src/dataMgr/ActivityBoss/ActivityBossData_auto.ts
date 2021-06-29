
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
	export class ActivityBossData_auto extends ActivityBossDataMgrBase
	{
		constructor()
		{
			super()
			// 	 信息改变 PBActivityBossData
			EventMgr.on(Cmd.S2C_ActivityBoss_InfoChg.cmdName, this, this.onInfoChg)
		}
		/*****
		 * 	 信息改变 PBActivityBossData
		 * @param PBActivityBossData
		 * 		lastdamage			uint64	最后伤害
		 * 		totaldamage			uint64	总伤害
		 * 		buycount			uint32	已购买次数
		 * 		challengecount			uint32	已挑战次数
		 * 		index			uint32	boss index
		 */
		protected onInfoChg(value: Pb_God.PBActivityBossData): void
		{
			if (value.index <= 1)
			{
				value.index = 1;
			}
			this.info = value;
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}