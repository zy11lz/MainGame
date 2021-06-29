
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
	export class GuessData_auto extends GuessDataMgrBase
	{
		constructor()
		{
			super()
			//失败才返回
			EventMgr.on(Cmd.S2C_Guess_Common_Ack.cmdName, this, this.onCommon_Ack)
			//选择结果 PBG2CAnswerAck
			EventMgr.on(Cmd.S2C_Guess_Answer_Ack.cmdName, this, this.onAnswer_Ack)
			//问题下发 PBG2CQuestion
			EventMgr.on(Cmd.S2C_Guess_Question.cmdName, this, this.onQuestion)
			//答题结束 PBG2CExit
			EventMgr.on(Cmd.S2C_Guess_Exit.cmdName, this, this.onExit)
		}
		/*****
		 *失败才返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{
			
		}
		/*****
		 *选择结果 PBG2CAnswerAck
		 * @param PBG2CAnswerAck
		 * 		result			uint32	0错误1正确
		 * 		score			uint32	当前分数
		 * 		worngCount			uint32	剩余错误次数
		 * 		rightAnswers			PBGuessAnswer	 正确答案 PBGuessAnswer
		 */
		protected onAnswer_Ack(value: Pb_God.PBG2CAnswerAck): void
		{
			
		}
		/*****
		 *问题下发 PBG2CQuestion
		 * @param PBG2CQuestion
		 * 		index			uint32	 问题序号
		 * 		time			uint32	 答题时间
		 * 		answers			PBGuessAnswer	 答案 PBGuessAnswer
		 */
		protected onQuestion(value: Pb_God.PBG2CQuestion): void
		{
			
		}
		/*****
		 *答题结束 PBG2CExit
		 * @param PBG2CExit
		 * 		rightCount			uint32	猜中次数
		 */
		protected onExit(value: Pb_God.PBG2CExit): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}