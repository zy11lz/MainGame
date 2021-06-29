
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
	export class ArtifactData_auto extends ArtifactDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用错误返回
			EventMgr.on(Cmd.S2C_Artifact_Common.cmdName, this, this.onCommon)
			//	 激活返回 		PBCAGArtifactActive
			EventMgr.on(Cmd.S2C_Artifact_Active.cmdName, this, this.onActive)
			//	 新增神器 		PBPlayerArtifactInfo
			EventMgr.on(Cmd.S2C_Artifact_AddNew.cmdName, this, this.onAddNew)
			// 	 升级返回			PBG2CArtifactUpgrade
			EventMgr.on(Cmd.S2C_Artifact_Upgrade.cmdName, this, this.onUpgrade)
			// 	 技能升级返回		PBG2CArtifactSkill
			EventMgr.on(Cmd.S2C_Artifact_Skill.cmdName, this, this.onSkill)
			// 	 刻印石头返回		PBU32
			EventMgr.on(Cmd.S2C_Artifact_UseStone.cmdName, this, this.onUseStone)
			//	 同步信息 		PBPlayerArtifactInfo
			EventMgr.on(Cmd.S2C_Artifact_Syn.cmdName, this, this.onSyn)
			// 	 幻化返回			PBCAGArtifactShape
			EventMgr.on(Cmd.S2C_Artifact_Shape.cmdName, this, this.onShape)
			//	 觉醒				PBU32
			EventMgr.on(Cmd.S2C_Artifact_Awake.cmdName, this, this.onAwake)
			//	 觉醒奖励			PBU32
			EventMgr.on(Cmd.S2C_Artifact_AwakePrize.cmdName, this, this.onAwakePrize)
			//	 法阵觉醒推送		PBU32
			EventMgr.on(Cmd.S2C_Artifact_FazhenAwake.cmdName, this, this.onFazhenAwake)
		}
		/*****
		 *	 通用错误返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	 激活返回 		PBCAGArtifactActive
		 * @param PBCAGArtifactActive
		 * 		id			uint32	 神器ID
		 * 		stage			uint32	 进度ID
		 */
		protected onActive(value: Pb_God.PBCAGArtifactActive): void
		{
			SoundMgr.Inst().playSound("pin");
			let results = this._infoList.filter(elment => elment.id == value.id);
			if (results.length > 0)
			{
				results[0].activestage.push(value.stage);
			}
			else
			{
				let tmpInfo = new Pb_God.PBPlayerArtifactInfo();
				tmpInfo.id = value.id;
				tmpInfo.activestage = [];
				tmpInfo.activestage.push(value.stage);
				this._infoList.push(tmpInfo);
			}
			ArtifactDataMgr.unlockRewardRedDotModel.refresh();
		}
		/*****
		 *	 新增神器 		PBPlayerArtifactInfo
		 * @param PBPlayerArtifactInfo
		 * 		id			uint32	 神器ID
		 * 		isactive			bool	 是否已经激活
		 * 		activestage			uint32	 已经激活的进度
		 * 		skilllevel			uint32	 技能等级
		 * 		shapeid			uint32	 幻化ID
		 * 		expenditem			PBItemInfo	 已经消耗的道具,重置返回
		 */
		protected onAddNew(value: Pb_God.PBPlayerArtifactInfo): void
		{
			let tempIndex = -1;
			for (let i = 0; i < this._infoList.length; i++)
			{
				if (this._infoList[i].id == value.id)
				{
					tempIndex = i;
					break;
				}
			}

			if (tempIndex != -1)
			{
				this._infoList.splice(tempIndex, 1);
			}
			this._infoList.push(value);
			this.checkAllArtiface();
			this.setNewArtifactState(true);
			this.reddotModel.refresh(true);
		}
		/*****
		 * 	 升级返回			PBG2CArtifactUpgrade
		 * @param PBG2CArtifactUpgrade
		 * 		level			uint32	 等级
		 * 		exp			uint32	 经验
		 */
		protected onUpgrade(value: Pb_God.PBG2CArtifactUpgrade): void
		{
			let oldLevel = this._fazhenInfo.level;
			let oldExp = this._fazhenInfo.exp;
			this._fazhenInfo.level = value.level;
			this._fazhenInfo.exp = value.exp;
			this.upgradeRedDotModel.refresh();
			this.shengyinRedDotModel.refresh();
			EventMgr.trigger(EventNotify.Artifact_Upgrade, oldLevel, oldExp, value.level, value.exp);
		}
		/*****
		 * 	 技能升级返回		PBG2CArtifactSkill
		 * @param PBG2CArtifactSkill
		 * 		id			uint32	 神器ID
		 * 		skilllevel			uint32	 技能等级
		 */
		protected onSkill(value: Pb_God.PBG2CArtifactSkill): void
		{
			TipsUtils.showTipsByLanId("artifact_msg9"); //升级成功
			let results = this._infoList.filter(elment => elment.id == value.id);
			if (results.length > 0)
			{
				results[0].skilllevel = value.skilllevel;
			}
			this.skillRedDotModel.refresh();
		}
		/*****
		 * 	 刻印石头返回		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onUseStone(value: Pb_God.PBU32): void
		{
			this._fazhenInfo.count = value.value;
		}
		/*****
		 *	 同步信息 		PBPlayerArtifactInfo
		 * @param PBPlayerArtifactInfo
		 * 		id			uint32	 神器ID
		 * 		isactive			bool	 是否已经激活
		 * 		activestage			uint32	 已经激活的进度
		 * 		skilllevel			uint32	 技能等级
		 * 		shapeid			uint32	 幻化ID
		 * 		expenditem			PBItemInfo	 已经消耗的道具,重置返回
		 */
		protected onSyn(value: Pb_God.PBPlayerArtifactInfo): void
		{
			for (let i = 0; i < this._infoList.length; i++)
			{
				if (this._infoList[i].id == value.id)
				{
					this._infoList[i] = value;
					this.checkAllArtiface();
					return;
				}
			}
			this._infoList.push(value);
			this.checkAllArtiface();
		}
		/*****
		 * 	 幻化返回			PBCAGArtifactShape
		 * @param PBCAGArtifactShape
		 * 		id			uint32	 神器ID
		 * 		shapeid			uint32	 幻化的ID
		 */
		protected onShape(value: Pb_God.PBCAGArtifactShape): void
		{
			let results = this._infoList.filter(elment => elment.id == value.id);
			if (results.length > 0)
			{
				results[0].shapeid = value.shapeid;
			}
		}
		/*****
		 *	 觉醒				PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onAwake(value: Pb_God.PBU32): void
		{
		}
		/*****
		 *	 觉醒奖励			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onAwakePrize(value: Pb_God.PBU32): void
		{
		}
		/*****
		 *	 法阵觉醒推送		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onFazhenAwake(value: Pb_God.PBU32): void
		{
			this._fazhenAwake = !!value.value;
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}