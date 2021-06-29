
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
	export class ShapeData_auto extends ShapeDataMgrBase
	{
		constructor()
		{
			super()
			//通用返回(失败才返回)
			EventMgr.on(Cmd.S2C_Shape_CommonAck.cmdName, this, this.onCommonAck)
			//增加称号			PBPlayerTitle
			EventMgr.on(Cmd.S2C_Shape_AddTitle.cmdName, this, this.onAddTitle)
			//删除称号 		PBU32
			EventMgr.on(Cmd.S2C_Shape_DelTitle.cmdName, this, this.onDelTitle)
			//同步省份 		PBU32U32
			EventMgr.on(Cmd.S2C_Shape_SynProvince.cmdName, this, this.onSynProvince)
			//设置头像返回 	PBU32
			EventMgr.on(Cmd.S2C_Shape_SetHeadAck.cmdName, this, this.onSetHeadAck)
			//同步所有头像 	PBG2CShapeSynAllHead
			EventMgr.on(Cmd.S2C_Shape_SynAllHead.cmdName, this, this.onSynAllHead)
			//设置头像框返回 	PBU32
			EventMgr.on(Cmd.S2C_Shape_SetHeadIconAck.cmdName, this, this.onSetHeadIconAck)
			//同步所有头像框 	PBG2CShapeSynAllHeadIcon
			EventMgr.on(Cmd.S2C_Shape_SynAllHeadIcon.cmdName, this, this.onSynAllHeadIcon)
			//设置冒险形象返回	PBU32
			EventMgr.on(Cmd.S2C_Shape_SetRiskAck.cmdName, this, this.onSetRiskAck)
			//同步所有冒险形象 PBG2CShapeSynAllRisk
			EventMgr.on(Cmd.S2C_Shape_SynAllRisk.cmdName, this, this.onSynAllRisk)
			//设置称号 		PBU32
			EventMgr.on(Cmd.S2C_Shape_SetTitleAck.cmdName, this, this.onSetTitleAck)
			//同步所有称号 	PBG2CShapeSynAllTitle
			EventMgr.on(Cmd.S2C_Shape_SynAllTitle.cmdName, this, this.onSynAllTitle)
			//同步称号 		PBPlayerTitle
			EventMgr.on(Cmd.S2C_Shape_SynTitle.cmdName, this, this.onSynTitle)
			//增加头像框		PBPlayerHeadIcon
			EventMgr.on(Cmd.S2C_Shape_AddHeadIcon.cmdName, this, this.onAddHeadIcon)
			//同步头像框 		PBPlayerHeadIcon
			EventMgr.on(Cmd.S2C_Shape_SynHeadIcon.cmdName, this, this.onSynHeadIcon)
			//删除头像框 		PBU32
			EventMgr.on(Cmd.S2C_Shape_DelTHeadIcon.cmdName, this, this.onDelTHeadIcon)
			//删除皮肤 		PBU32
			EventMgr.on(Cmd.S2C_Shape_DelPetSkin.cmdName, this, this.onDelPetSkin)
			//增加徽章 		PBPlayerBadge
			EventMgr.on(Cmd.S2C_Shape_AddBadge.cmdName, this, this.onAddBadge)
			//同步荣誉值 		PBU32
			EventMgr.on(Cmd.S2C_Shape_SynHonorPoint.cmdName, this, this.onSynHonorPoint)
			//徽章展示 		PBCAGBadgeDisplay
			EventMgr.on(Cmd.S2C_Shape_BadgeDisplay.cmdName, this, this.onBadgeDisplay)
		}
		/*****
		 *通用返回(失败才返回)
		 * @param 
		 */
		protected onCommonAck(): void
		{

		}
		/*****
		 *增加称号			PBPlayerTitle
		 * @param PBPlayerTitle
		 * 		titleid			uint32	 称号ID
		 * 		endtime			uint32	 到期时间0无限
		 * 		isactive			bool	 是否激活
		 */
		protected onAddTitle(value: Pb_God.PBPlayerTitle): void
		{
			if (!this.titleMap.get(value.titleid))
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ShapeTitleAward, value.titleid));
			}
			// //先提示新激活的
			// if (value.isactive) {
			// 	let oldData = this.titleMap.get(value.titleid);
			// 	if (!oldData || !oldData.isactive) {
			// 		TipsUtils.showTipsByLanId("tips_msg64", cfg.ShapeTitleCfgData.getNameByID(value.titleid));
			// 	}
			// }
			this.titleMap.put(value.titleid, value);
		}
		/*****
		 *删除称号 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDelTitle(value: Pb_God.PBU32): void
		{
			this.titleMap.remove(value.value + "");
		}
		/*****
		 *同步省份 		PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onSynProvince(value: Pb_God.PBU32U32): void
		{
			if (this.province == value.key && this.city == value.value) return;
			this.province = value.key;
			this.city = value.value;
			EventMgr.trigger(EventNotify.Shape_Base_Update);
		}
		/*****
		 *设置头像返回 	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSetHeadAck(value: Pb_God.PBU32): void
		{
			if (this.iconId == value.value) return;
			this.iconId = value.value;
			SoundMgr.Inst().playSound("pin");
			EventMgr.trigger(EventNotify.Shape_Base_Update);
		}
		/*****
		 *同步所有头像 	PBG2CShapeSynAllHead
		 * @param PBG2CShapeSynAllHead
		 * 		headid			uint32	 头像ID
		 */
		protected onSynAllHead(value: Pb_God.PBG2CShapeSynAllHead): void
		{
			this.activeHeadMap = Global.listToStringMap(value.headid);
		}
		/*****
		 *设置头像框返回 	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSetHeadIconAck(value: Pb_God.PBU32): void
		{
			if (this.iconFrameID == value.value) return;
			this.iconFrameID = value.value;
			EventMgr.trigger(EventNotify.Shape_Base_Update);
		}
		/*****
		 *同步所有头像框 	PBG2CShapeSynAllHeadIcon
		 * @param PBG2CShapeSynAllHeadIcon
		 * 		headicon			PBPlayerHeadIcon	 头像框
		 */
		protected onSynAllHeadIcon(value: Pb_God.PBG2CShapeSynAllHeadIcon): void
		{
			this.headIconMap = Global.listToStringMapData(value.headicon, "id", this.headIconMap);
		}
		/*****
		 *设置冒险形象返回	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSetRiskAck(value: Pb_God.PBU32): void
		{
			this.useRiskShapeId = value.value;
		}
		/*****
		 *同步所有冒险形象 PBG2CShapeSynAllRisk
		 * @param PBG2CShapeSynAllRisk
		 * 		useriskid			uint32	 当前使用的冒险形象
		 * 		activerisk			uint32	 已经激活的冒险形象
		 * 		risk			PBPlayerRiskShape	 冒险形象未激活的
		 */
		protected onSynAllRisk(value: Pb_God.PBG2CShapeSynAllRisk): void
		{
			this.useRiskShapeId = value.useriskid;
			this.activeRiskShapeMap = Global.listToStringMap(value.activerisk);
			this.riskShapeMap = Global.listToStringMapData(value.risk, "id");
		}
		/*****
		 *设置称号 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSetTitleAck(value: Pb_God.PBU32): void
		{
			SoundMgr.Inst().playSound("pin");
			this.usetitleid = value.value;
		}
		/*****
		 *同步所有称号 	PBG2CShapeSynAllTitle
		 * @param PBG2CShapeSynAllTitle
		 * 		usetitleid			uint32	 当前使用的称号
		 * 		title			PBPlayerTitle	 头像框
		 */
		protected onSynAllTitle(value: Pb_God.PBG2CShapeSynAllTitle): void
		{
			this.usetitleid = value.usetitleid;
			this.titleMap = Global.listToStringMapData(value.title, "titleid", this.titleMap);
		}
		/*****
		 *同步称号 		PBPlayerTitle
		 * @param PBPlayerTitle
		 * 		titleid			uint32	 称号ID
		 * 		endtime			uint32	 到期时间0无限
		 * 		isactive			bool	 是否激活
		 */
		protected onSynTitle(value: Pb_God.PBPlayerTitle): void
		{
			this.titleMap.put(value.titleid, value);
		}
		/*****
		 *增加头像框		PBPlayerHeadIcon
		 * @param PBPlayerHeadIcon
		 * 		id			uint32	 ID
		 * 		endtime			uint32	 到期时间0无限
		 * 		isactive			bool	 是否激活
		 */
		protected onAddHeadIcon(value: Pb_God.PBPlayerHeadIcon): void
		{
			//先提示新激活的
			let oldData = this.headIconMap.get(value.id);
			if (!oldData)
			{
				TipsUtils.showTipsByLanId("tips_msg64", cfg.ShapeHeadIconCfgData.getNameByID(value.id));
			}
			this.headIconMap.put(value.id, value);
		}
		/*****
		 *同步头像框 		PBPlayerHeadIcon
		 * @param PBPlayerHeadIcon
		 * 		id			uint32	 ID
		 * 		endtime			uint32	 到期时间0无限
		 * 		isactive			bool	 是否激活
		 */
		protected onSynHeadIcon(value: Pb_God.PBPlayerHeadIcon): void
		{
			this.headIconMap.put(value.id, value);
		}
		/*****
		 *删除头像框 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDelTHeadIcon(value: Pb_God.PBU32): void
		{
			this.headIconMap.remove(value.value + "");
		}
		/*****
		 *删除皮肤 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDelPetSkin(value: Pb_God.PBU32): void
		{
			this.petSkinMap.remove(value.value + "");
		}
		/*****
		 *增加徽章 		PBPlayerBadge
		 * @param PBPlayerBadge
		 * 		id			uint32	 徽章ID
		 * 		addtime			uint32	 获取时间
		 */
		protected onAddBadge(value: Pb_God.PBPlayerBadge): void
		{
			this.badgeList.push(value);
		}
		/*****
		 *同步荣誉值 		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSynHonorPoint(value: Pb_God.PBU32): void
		{
			this.honor = value.value;
		}
		/*****
		 *徽章展示 		PBCAGBadgeDisplay
		 * @param PBCAGBadgeDisplay
		 * 		id			uint32	 徽章ID
		 */
		protected onBadgeDisplay(value: Pb_God.PBCAGBadgeDisplay): void
		{
			this.badgedisplay = value.id;
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}