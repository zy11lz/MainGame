
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
	export class ActivityBossDataMgrBase
	{
		public info: Pb_God.PBActivityBossData;

		/**Boss伤害值 */
		public damage: number = 0;

		constructor()
		{

		}

		private clear()
		{
			this.info = null;
		}

		public init(value: Pb_God.PBActivityBossData)
		{
			this.clear();
			this.info = value;
		}

		/**
		 * 剩余挑战次数
		 */
		public getRemainCount()
		{
			if (!this.info)
				return 0;
			return cfg.ActivitybossConstantCfgData.getFirstInfo().challengeCount + this.info.buycount - this.info.challengecount
		}

		/**
		 * 可以购买的次数
		 */
		public getCanBuyCount()
		{
			if (!this.info)
				return 0;
			return cfg.ActivitybossBuyCountCfgData.getAll().length - this.info.buycount;
		}

		public checkCanSkip()
		{
			if (!this.info)
				return false;
			return this.info.challengecount > 0;
		}

		public resetDamage()
		{
			this.damage = 0;
		}

		public checkChallengeRedDot()
		{
			return this.getRemainCount() > 0
		}

		public checkSkipRedDot()
		{
			return this.getRemainCount() > 0 && this.checkCanSkip();
		}
	}
}
