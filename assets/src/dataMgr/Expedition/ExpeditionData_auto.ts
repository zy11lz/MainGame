
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
	export class ExpeditionData_auto extends ExpeditionDataMgrBase
	{
		constructor()
		{
			super()
			//通用返回(失败才返回)
			EventMgr.on(Cmd.S2C_Expedition_CommonAck.cmdName, this, this.onCommonAck)
			//选择难度返回			PBG2CExpeditionInfo
			EventMgr.on(Cmd.S2C_Expedition_SelectAck.cmdName, this, this.onSelectAck)
			//领取奖励返回 		PBU32
			EventMgr.on(Cmd.S2C_Expedition_StagePrizeAck.cmdName, this, this.onStagePrizeAck)
			//查询关卡信息返回 	PBExpeditionTar
			EventMgr.on(Cmd.S2C_Expedition_StageInfoAck.cmdName, this, this.onStageInfoAck)
			//同步伙伴血量 		PBG2CExpeditionSynPetHp		
			EventMgr.on(Cmd.S2C_Expedition_SynPetHp.cmdName, this, this.onSynPetHp)
			//同步最新关卡 		PBG2CExpeditionSynCurStage		
			EventMgr.on(Cmd.S2C_Expedition_SynCurStage.cmdName, this, this.onSynCurStage)
			//废弃
			EventMgr.on(Cmd.S2C_Expedition_XXXXXXXXX.cmdName, this, this.onXXXXXXXXX)
			//废弃
			EventMgr.on(Cmd.S2C_Expedition_XXXXXX.cmdName, this, this.onXXXXXX)
		}
		/*****
		 *通用返回(失败才返回)
		 * @param 
		 */
		protected onCommonAck(): void
		{

		}
		/*****
		 *选择难度返回			PBG2CExpeditionInfo
		 * @param PBG2CExpeditionInfo
		 * 		stagetype			uint32	远征类型
		 * 		curstage			uint32	正在打的关卡ID 0表示通关
		 */
		protected onSelectAck(value: Pb_God.PBG2CExpeditionInfo): void
		{
			this._data.curtype = value.stagetype;
			this._data.curstage = value.curstage;
		}
		/*****
		 *领取奖励返回 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onStagePrizeAck(value: Pb_God.PBU32): void
		{
			this._data.prizeid.push(value.value);
		}
		/*****
		 *查询关卡信息返回 	PBExpeditionTar
		 * @param PBExpeditionTar
		 * 		index			uint32	 关卡
		 * 		fightpower			uint32	 战力
		 * 		display			PBPlayerDisplay	 显示数据
		 * 		petdisplay			PBExpeditionPetDisplay	 关卡显示
		 */
		protected onStageInfoAck(value: Pb_God.PBExpeditionTar): void
		{
			let results = this._data.stageinfo.filter(elment => elment.index == value.index);
			if (results.length == 0)
			{
				this._data.stageinfo.push(value);
			}
			else
			{
				results[0].fightpower = value.fightpower;
				results[0].display = value.display;
				results[0].petdisplay = value.petdisplay;
			}
		}
		/*****
		 *同步伙伴血量 		PBG2CExpeditionSynPetHp		
		 * @param PBG2CExpeditionSynPetHp
		 * 		usepethp			PBExpeditionPetHp	 使用的伙伴数据
		 */
		protected onSynPetHp(value: Pb_God.PBG2CExpeditionSynPetHp): void
		{
			this._data.usepethp = value.usepethp;

			this._hpData.clear();
			this._data.usepethp.forEach(elment =>
			{
				this._hpData.put(elment.sn + "", (elment.curhp as Long).toNumber());
			});
		}
		/*****
		 *同步最新关卡 		PBG2CExpeditionSynCurStage		
		 * @param PBG2CExpeditionSynCurStage
		 * 		maxtype			uint32	通关最大的类型
		 * 		curstage			uint32	正在打的关卡ID 0表示通关
		 */
		protected onSynCurStage(value: Pb_God.PBG2CExpeditionSynCurStage): void
		{
			this._data.curstage = value.curstage;
			this._data.maxtype = value.maxtype;
		}
		/*****
		 *废弃
		 * @param 
		 */
		protected onXXXXXXXXX(): void
		{

		}
		/*****
		 *废弃
		 * @param 
		 */
		protected onXXXXXX(): void
		{

		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}