
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
	export class TeamCampaignData_auto extends TeamCampaignDataMgrBase
	{
		constructor()
		{
			super()
			//通用返回(失败才返回)
			EventMgr.on(Cmd.S2C_TeamCampaign_CommonAck.cmdName, this, this.onCommonAck)
			//选择难度返回			PBU32
			EventMgr.on(Cmd.S2C_TeamCampaign_Select.cmdName, this, this.onSelect)
			//给出三个额外奖励     PBG2CTeamCampaignExtraPrize
			EventMgr.on(Cmd.S2C_TeamCampaign_ExtraPrize.cmdName, this, this.onExtraPrize)
			//领取奖励返回 		PBU32
			EventMgr.on(Cmd.S2C_TeamCampaign_SelectExtraPrize.cmdName, this, this.onSelectExtraPrize)
			//同步伙伴状态 	    PBG2CTeamCampaignState
			EventMgr.on(Cmd.S2C_TeamCampaign_SyncPet.cmdName, this, this.onSyncPet)
			//同步关卡状态 		PBG2CTeamCampaignStage
			EventMgr.on(Cmd.S2C_TeamCampaign_SyncStage.cmdName, this, this.onSyncStage)
			//同步技能		        PBG2CTeamCampaignSkill
			EventMgr.on(Cmd.S2C_TeamCampaign_SyncSkill.cmdName, this, this.onSyncSkill)
			//同步敌人数据		    PBG2CTeamCampaignTarget
			EventMgr.on(Cmd.S2C_TeamCampaign_SyncTarget.cmdName, this, this.onSyncTarget)
			//废弃
			EventMgr.on(Cmd.S2C_TeamCampaign_xxxxxxxxx.cmdName, this, this.onXxxxxxxxx)
			//废弃
			EventMgr.on(Cmd.S2C_TeamCampaign_xxxxxxxxxxxxxx.cmdName, this, this.onXxxxxxxxxxxxxx)
		}
		/*****
		 *通用返回(失败才返回)
		 * @param 
		 */
		protected onCommonAck(): void
		{

		}
		/*****
		 *选择难度返回			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSelect(value: Pb_God.PBU32): void
		{
			this._data.difficulty = value.value;
		}
		/*****
		 *给出三个额外奖励     PBG2CTeamCampaignExtraPrize
		 * @param PBG2CTeamCampaignExtraPrize
		 * 		prize			uint32	 额外奖励index
		 */
		protected onExtraPrize(value: Pb_God.PBG2CTeamCampaignExtraPrize): void
		{
			//先把数据存下来，等战斗结算界面退出后，或者在下次打开组队界面的时候再打开界面处理
			this._data.extraprize = value.prize;

			this.initAutoTeamCampaignLoop();
		}
		/*****
		 *领取奖励返回 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSelectExtraPrize(value: Pb_God.PBU32): void
		{
			this._data.extraprize = [];
		}
		/*****
		 *同步伙伴状态 	    PBG2CTeamCampaignState
		 * @param PBG2CTeamCampaignState
		 * 		state			PBTeamCampaignPetState	 状态,没有的为满血
		 */
		protected onSyncPet(value: Pb_God.PBG2CTeamCampaignState): void
		{
			this._data.petstate = value.state;
			this._hpData = Global.listToStringMapData(this._data.petstate, "sn");
		}
		/*****
		 *同步关卡状态 		PBG2CTeamCampaignStage
		 * @param PBG2CTeamCampaignStage
		 * 		difficulty			uint32	 当前难度
		 * 		stage			uint32	 当前的关卡
		 * 		passed			uint32	 已经通过的难度
		 */
		protected onSyncStage(value: Pb_God.PBG2CTeamCampaignStage): void
		{
			this._data.difficulty = value.difficulty;
			this._data.stage = value.stage;
			this._data.passed = value.passed;
			this.refreshMaxDiff();
		}
		/*****
		 *同步技能		        PBG2CTeamCampaignSkill
		 * @param PBG2CTeamCampaignSkill
		 * 		skill			uint32	 skill index
		 */
		protected onSyncSkill(value: Pb_God.PBG2CTeamCampaignSkill): void
		{
			this._data.skill = value.skill;
		}
		/*****
		 *同步敌人数据		    PBG2CTeamCampaignTarget
		 * @param PBG2CTeamCampaignTarget
		 * 		stage			uint32	 关卡stage
		 * 		fightpower			uint32	 战力
		 * 		display			PBPlayerDisplay	 显示数据
		 * 		petdisplay			PBTeamCampaignPetDisplay	 关卡显示
		 */
		protected onSyncTarget(value: Pb_God.PBG2CTeamCampaignTarget): void
		{
			let results = this._stageInfo.filter(elment => elment.stage == value.stage);
			if (results.length == 0)
			{
				this._stageInfo.push(value);
			}
			else
			{
				results[0].fightpower = value.fightpower;
				results[0].display = value.display;
				results[0].petdisplay = value.petdisplay;
			}
		}
		/*****
		 *废弃
		 * @param 
		 */
		protected onXxxxxxxxx(): void
		{

		}
		/*****
		 *废弃
		 * @param 
		 */
		protected onXxxxxxxxxxxxxx(): void
		{

		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}