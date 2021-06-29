
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
	export class DefendData_auto extends DefendDataMgrBase
	{
		constructor()
		{
			super()
			// 	 升级返回 PBG2CDefendLevelUpAsk
			EventMgr.on(Cmd.S2C_Defend_LevelUp_Ask.cmdName, this, this.onLevelUp_Ask)
			// 	 升阶返回 PBG2CDefendLevelUpAsk
			EventMgr.on(Cmd.S2C_Defend_RankUp_Ask.cmdName, this, this.onRankUp_Ask)
			// 	 保存方案返回 PBDefendPlan
			EventMgr.on(Cmd.S2C_Defend_SavePlan_Ask.cmdName, this, this.onSavePlan_Ask)
			// 	 使用方案返回 PBG2CDefendUsePlanAsk
			EventMgr.on(Cmd.S2C_Defend_UsePlan_Ask.cmdName, this, this.onUsePlan_Ask)
			// 	 解锁方案返回 PBG2CDefendUnlockPlanAsk
			EventMgr.on(Cmd.S2C_Defend_UnlockPlan_Ask.cmdName, this, this.onUnlockPlan_Ask)
			// 	 属性下发 PBG2CDefendAttr
			EventMgr.on(Cmd.S2C_Defend_Attr.cmdName, this, this.onAttr)
			// 	 功能开启下发 PBPlayerDefend
			EventMgr.on(Cmd.S2C_Defend_Open.cmdName, this, this.onOpen)
			// 	 属性预览 PBG2CDefendAttr
			EventMgr.on(Cmd.S2C_Defend_PreviewAttr.cmdName, this, this.onPreviewAttr)
			// 	 移除某个宠物方案返回 PBG2CDefendPlansChg
			EventMgr.on(Cmd.S2C_Defend_PlansChg.cmdName, this, this.onPlansChg)
		}
		/*****
		 * 	 升级返回 PBG2CDefendLevelUpAsk
		 * @param PBG2CDefendLevelUpAsk
		 * 		level			uint32	等级
		 */
		protected onLevelUp_Ask(value: Pb_God.PBG2CDefendLevelUpAsk): void
		{
			this.level=value.level;
			TipsUtils.showTipsByLanId("artifact_msg9")
			
		}
		/*****
		 * 	 升阶返回 PBG2CDefendLevelUpAsk
		 * @param PBG2CDefendLevelUpAsk
		 * 		level			uint32	等级
		 */
		protected onRankUp_Ask(value: Pb_God.PBG2CDefendLevelUpAsk): void
		{
			this.rank=value.level;
			this.refreshRedDotState();
		}
		/*****
		 * 	 保存方案返回 PBDefendPlan
		 * @param PBDefendPlan
		 * 		index			uint32	方案索引
		 * 		pets			PBDefendPetSlot	英雄列表
		 * 		skills			PBDefendPetSlot	技能顺序列表
		 */
		protected onSavePlan_Ask(value: Pb_God.PBDefendPlan): void
		{
			let bol=false;
			for(let i=0;i<this.plans.length;i++){
				if(this.plans[i].index==value.index){
					this.plans[i]=value;
					bol=true;
					break;
				}
			}
			if(!bol){
				this.plans.push(value);
			}
			

			TipsUtils.showTipsByLanId("HeroDefendMsg1")
			this.refreshRedDotState();
			
		}
		/*****
		 * 	 使用方案返回 PBG2CDefendUsePlanAsk
		 * @param PBG2CDefendUsePlanAsk
		 * 		index			uint32	方案索引
		 */
		protected onUsePlan_Ask(value: Pb_God.PBG2CDefendUsePlanAsk): void
		{
			this.planIndex=value.index;
			this.refreshHeroIdMap();
			this.refreshRedDotState();
		}
		/*****
		 * 	 解锁方案返回 PBG2CDefendUnlockPlanAsk
		 * @param PBG2CDefendUnlockPlanAsk
		 * 		index			uint32	方案索引
		 */
		protected onUnlockPlan_Ask(value: Pb_God.PBG2CDefendUnlockPlanAsk): void
		{
			let hadPlanBol:boolean=false;
			for(let i=0;i<this.plans.length;i++){
				let plan=this.plans[i];
				if(plan.index==value.index){
					hadPlanBol=true;
				}
			}
			if(!hadPlanBol){
				let plan:Pb_God.PBDefendPlan=new Pb_God.PBDefendPlan();
				plan.index=value.index;
				plan.pets=[];
				plan.skills=[];
				this.plans.push(plan)
			}
			
		}
		/*****
		 * 	 属性下发 PBG2CDefendAttr
		 * @param PBG2CDefendAttr
		 * 		power			uint32	战斗力
		 * 		attr			PBAttrInfo	所有属性
		 */
		protected onAttr(value: Pb_God.PBG2CDefendAttr): void
		{
			this.power=value.power;
			this.attr=value.attr;
			
		}
		/*****
		 * 	 功能开启下发 PBPlayerDefend
		 * @param PBPlayerDefend
		 * 		level			uint32	等级
		 * 		rank			uint32	阶级
		 * 		planIndex			uint32	当前方案索引
		 * 		plans			PBDefendPlan	方案列表
		 */
		protected onOpen(value: Pb_God.PBPlayerDefend): void
		{
			this.init(value);
		}
		/*****
		 * 	 属性预览 PBG2CDefendAttr
		 * @param PBG2CDefendAttr
		 * 		power			uint32	战斗力
		 * 		attr			PBAttrInfo	所有属性
		 */
		protected onPreviewAttr(value: Pb_God.PBG2CDefendAttr): void
		{
			this.attr2=value.attr;
			UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendAdvanceMeidtor))
		}
		/*****
		 * 	 移除某个宠物方案返回 PBG2CDefendPlansChg
		 * @param PBG2CDefendPlansChg
		 * 		plans			PBDefendPlan	方案改变
		 */
		protected onPlansChg(value: Pb_God.PBG2CDefendPlansChg): void
		{
			for(let i=0;i<value.plans.length;i++){
				let plan=value.plans[i];
				for(let j=0;j<this.plans.length;j++){
					if(this.plans[j].index==plan.index){
						this.plans[j]=plan;
						break;
					}
				}
			}
			this.refreshRedDotState()
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}