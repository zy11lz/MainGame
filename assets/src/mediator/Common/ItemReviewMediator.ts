module Pro
{
	export class ItemReviewMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		public UIPanel: ProUI.ItemReview.MainUI;

		/** UI打开参数 */
		public UIOpenData: ItemReviewOpenUIData;

		/** UI重新排列数据 */
		private AutoSuitPosUIAry: Array<Laya.Sprite> = [];

		/** 特殊道具展示 策划要求 仅正对道具ID：16850 */
		private ApecialItemID: number = 16850;

		/** 需要自动加载的资源列表*/
		public autoLoadAtlas(): Array<any>
		{
			return null;
		}

		public openUI(): void
		{
			this.showPanel(ProUI.ItemReview.MainUI, 0, BaseAddLayer.TopUI, true);
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			this.AutoSuitPosUIAry = [];
			this.AutoSuitPosUIAry.push(this.UIPanel.BaseBox);
			this.AutoSuitPosUIAry.push(this.UIPanel.AtterBox);
			this.AutoSuitPosUIAry.push(this.UIPanel.GodRandAtterBox);
			this.AutoSuitPosUIAry.push(this.UIPanel.OneSuitBox);
			this.AutoSuitPosUIAry.push(this.UIPanel.UsesBox);
			this.AutoSuitPosUIAry.push(this.UIPanel.DesInfo);
			this.AutoSuitPosUIAry.push(this.UIPanel.EquipedFunBox);
			this.AutoSuitPosUIAry.push(this.UIPanel.ItemFunBox);
			this.AutoSuitPosUIAry.push(this.UIPanel.HeroSpinFunBox);
			this.AutoSuitPosUIAry.push(this.UIPanel.RuneFunBox);
			this.AutoSuitPosUIAry.push(this.UIPanel.GodEquipFunBox);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{

		}

		public initUI(): void
		{
			this.refreshUI();
		}

		public refreshUI()
		{
			//隐藏所有功能页面
			this.AutoSuitPosUIAry.forEach(elment =>
			{
				elment.visible = false;
			});

			//默认节点显示
			this.UIPanel.BaseBox.visible = true;

			//道具信息
			let TmpItem = this.UIOpenData.showItem;
			let tmpItemType = cfg.ItemCfgData.getTypeById(TmpItem.itemid);

			//显示物品图标状态
			this.UIPanel.ItemUI.setItemInfo(this.UIOpenData.showItem, false, false, false, false, false);

			//名称和描述
			this.UIPanel.NameLb.text = cfg.ItemCfgData.getNameById(TmpItem.itemid);
			this.UIPanel.NameLb.color = Global.getResQuColor(Global.getResQuNum(CfgID.ResType.Item, TmpItem.itemid));
			if (!GlobalData.isRelease)
			{
				this.UIPanel.NameLb.text = cfg.ItemCfgData.getNameById(TmpItem.itemid) + "_" + TmpItem.itemid;
			}

			this.UIPanel.DesInfo.visible = true; //在特定的时候再隐藏。
			// 道具类型说明
			let itemTypeDesc = cfg.ItemCfgData.getDesc3ById(TmpItem.itemid);
			this.UIPanel.TypeNameLb.text = itemTypeDesc ? Global.getLangStr("ui_ItemReview_msg1") + itemTypeDesc : "";

			// 道具作用描述
			let tmpDesc_2 = cfg.ItemCfgData.getDesc2ById(TmpItem.itemid);
			this.UIPanel.UsesBox.visible = tmpDesc_2 != "";
			this.UIPanel.UsesTypeNameLb.text = Global.getLangStr("ui_ItemReview_msg5") + tmpDesc_2;

			//资源类
			if (tmpItemType == Pb_God._emItemType.ItemType_Resource)
			{
				this.refreshExpandItemUI();
			}//装备类型
			else if (tmpItemType == Pb_God._emItemType.ItemType_Equip)
			{
				this.refreshEquipUI();
			}//神级装备类型
			else if (tmpItemType == Pb_God._emItemType.ItemType_GodEquip)
			{
				this.refreshGodEquipUI();
			}//符文类型
			else if (tmpItemType == Pb_God._emItemType.ItemType_Rune)
			{
				this.refreshRuneUI();
			}//伙伴碎片
			else if (tmpItemType == Pb_God._emItemType.ItemType_Pet)
			{
				this.refreshPetItemUI();
			}//普通道具
			else if (tmpItemType == Pb_God._emItemType.ItemType_Normal)
			{
				this.refreshNormalItemUI();
			}

			if (this.UIPanel.DesInfo.visible)
			{
				var desc: string = cfg.ItemCfgData.getDescById(TmpItem.itemid);
				desc = desc.replace(/\\n/g, "<br/>")
				this.UIPanel.DesLb.innerHTML = this.UIPanel.DesLb.showText = desc;// cfg.ItemCfgData.getDescById(TmpItem.itemid)  ;
				this.UIPanel.DesInfo.height = this.UIPanel.DesLb.contextHeight + 20;
			}

			//baseAtter高度重新计算
			if (this.UIPanel.AtterBox.visible)
			{
				this.UIPanel.AtterBox.height = this.UIPanel.AtterInfoBox.getCellTrueHeight() + this.UIPanel.AtterInfoBox.y + 18;
			}

			//suit高度重新计算
			if (this.UIPanel.OneSuitBox.visible)
			{
				this.UIPanel.OneSuitBox.height = this.UIPanel.OneSuitInfoBox.getCellTrueHeight() + this.UIPanel.OneSuitInfoBox.y + 10;
				if (this.UIPanel.OneSuitSkillBox.visible) this.UIPanel.OneSuitBox.height += this.UIPanel.OneSuitSkillBox.height;
			}

			//显示的功能菜单坐标重新设置
			let showStartY = 0;
			this.AutoSuitPosUIAry.forEach(elment =>
			{
				if (elment.visible)
				{
					elment.y = showStartY + 5;
					showStartY += elment.height;
				}
			});
			this.UIPanel.BGImg.height = showStartY + 15;
			this.UIPanel.BGImg.visible = true;

			//重新打开UI动画并设置点击背景关闭页面
			this.UIPanel.height = this.UIPanel.BGImg.height + 200;
		}

		/**
		 * 刷新玩家道具UI
		 */
		private refreshExpandItemUI()
		{
			//this.UIPanel.TypeNameLb.text = Global.getLangStr("item_review_msg1");// 资产";
		}

		/**
		 * 刷新穿戴武器UI
		 */
		private refreshEquipUI()
		{

			this.UIPanel.AtterBox.visible = true;
			this.UIPanel.EquipedFunBox.visible = this.UIOpenData.showFun;
			//this.UIPanel.TypeNameLb.text = Global.getLangStr("item_review_msg2");// 武器";

			//基础属性
			let tempAtterAry = cfg.ItemCfgData.getAddAttrAryById(this.UIOpenData.showItem.itemid);
			this.UIPanel.AtterInfoBox.onRefresh(tempAtterAry.length, this, (itemUI: ProUI.Utils.AttrInfoItemUI, index: number) =>
			{
				let tmpAtterID = tempAtterAry[index].type;
				itemUI.imgType.frame = tmpAtterID;
				itemUI.txtValue.text = Global.getFullAttrValueString(tempAtterAry[index], ": ");
			});

			//武器套装属性
			let tempItemName = cfg.ItemCfgData.getNameById(this.UIOpenData.showItem.itemid);
			let tempItemLv = cfg.ItemCfgData.getLevelById(this.UIOpenData.showItem.itemid);
			let tempSuitInfo = cfg.ItemEquipSuitCfgData.getInfo(tempItemLv);
			this.UIPanel.OneSuitBox.visible = tempSuitInfo != null;
			this.UIPanel.OneSuitSkillBox.visible = false;

			//套装属性
			if (tempSuitInfo != null)
			{
				let tempActiveNum = this.UIOpenData.petSn != null ? SuitEquipDataMgr.getSuitMgr(this.UIOpenData.petSn).getActiveSuitNum(this.UIOpenData.showItem.itemid) : 0;
				this.UIPanel.OneSuitNameLb.text = Global.getLangStr("bag_msg3", tempItemName.substr(0, 2), tempActiveNum);
				// this.UIPanel.OneSuitNameLb.color = tempActiveNum >= 4 ? "#20e59e" : "#eeeccc";
				this.UIPanel.OneSuitInfoBox.onRefresh(3, this, (itemUI: ProUI.ItemReview.ExAtterItemInfoUI, index: number) =>
				{
					let tmpSuitNum = index + 2;
					let tmpAtterInfo: cfg.AddAtterInfo = cfg.ItemEquipSuitCfgData.getAddAddAttrInfoByCount(tempSuitInfo, index + 2);
					itemUI.TypeImg.frame = tmpAtterInfo.type;
					itemUI.ValueLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterInfo.type) + ":" + (tmpAtterInfo.valuePer / 100) + "%";
					itemUI.ActiveLb.text = Global.getLangStr("bag_msg4", tmpSuitNum);
					itemUI.ValueLb.color = tempActiveNum >= tmpSuitNum ? "#009e00" : "#5d565d";
					itemUI.ActiveLb.color = itemUI.ValueLb.color;
				});
			}

			//武器类型
			let tmpEquipSubType = cfg.ItemCfgData.getSubTypeById(this.UIOpenData.showItem.itemid);

			//穿戴中
			if (this.UIOpenData.petSn != null)
			{
				//卸下
				this.UIPanel.EquipLeftBtn.text = Global.getLangStr("item_review_msg3"); //卸下";
				this.UIPanel.EquipLeftBtn.onClick(this, () =>
				{
					this.closeUI();
					PetSend.equip_Ask(this.UIOpenData.petSn, tmpEquipSubType, 0);
				});

				//有没有更好的装备可更换
				//更换
				(this.UIPanel.EquipRightBtn.getChildByName("reddot") as Laya.Image).visible = ItemDataMgr.hasBagPerfectEquip(this.UIOpenData.showItem.itemid);
				(this.UIPanel.EquipRightBtn.getChildByName("label") as component.UILabel).text = Global.getLangStr("item_review_msg4");// 更换";
				this.UIPanel.EquipRightBtn.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new HeroEquipSuitOpenUIData(this.UIOpenData.petSn, tmpEquipSubType, PanelNotify.Open_HeroEquipSuit), BaseBackUIType.CloseBackUI);
				});
			}
			else
			{
				//出售
				this.UIPanel.EquipLeftBtn.text = Global.getLangStr("item_review_msg5");// 出售";
				this.UIPanel.EquipLeftBtn.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagItemBatchAction, 0, this.UIOpenData.showItem), BaseBackUIType.CloseBackUI);
				});

				//穿戴
				(this.UIPanel.EquipRightBtn.getChildByName("reddot") as Laya.Image).visible = false;
				(this.UIPanel.EquipRightBtn.getChildByName("label") as component.UILabel).text = Global.getLangStr("item_review_msg8");//穿戴";
				this.UIPanel.EquipRightBtn.onClick(this, () =>
				{
					EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 1);
				});
			}
		}

		/**
		 * 刷新穿戴神器武器UI
		 */
		private refreshGodEquipUI()
		{

			this.UIPanel.AtterBox.visible = true;
			this.UIPanel.GodEquipFunBox.visible = this.UIOpenData.showFun;
			this.UIPanel.GodRandAtterBox.visible = true;
			//this.UIPanel.TypeNameLb.text = Global.getLangStr("item_review_msg9");//神装";

			//武器类型
			let tempItemSubType = cfg.ItemCfgData.getSubTypeById(this.UIOpenData.showItem.itemid);
			let tempItemQu = cfg.ItemCfgData.getQualityById(this.UIOpenData.showItem.itemid);
			let tempItemPart = cfg.ItemCfgData.getSubTypeById(this.UIOpenData.showItem.itemid);
			let tempItemStar = cfg.ItemCfgData.getStarNumById(this.UIOpenData.showItem.itemid);

			//基础属性
			let tempAtterAry = cfg.ItemCfgData.getAddAttrAryById(this.UIOpenData.showItem.itemid);
			this.UIPanel.AtterInfoBox.onRefresh(tempAtterAry.length, this, (itemUI: ProUI.Utils.AttrInfoItemUI, index: number) =>
			{
				let tmpAtterID = tempAtterAry[index].type;
				let tmpAtterValue = tempAtterAry[index].value;
				let tmpAtterRate = tempAtterAry[index].valuePer;
				itemUI.imgType.frame = tmpAtterID;
				itemUI.txtValue.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ": " +
					(tmpAtterValue > 0 ? Math.floor(tmpAtterValue) + "" : Global.parsePercentNum(tmpAtterRate, 1));
			});

			//随机属性
			//随机属性条数提示
			let RandAttrLen = 0;
			if (tempItemQu < 1)
			{
				RandAttrLen = 0;
				this.UIPanel.GodTipsLb.text = Global.getLangStr("bag_msg5");//[非良品或以上神装无第1随机属性]\n[非极品神传无第2随机属性]";
			}
			else if (tempItemQu < 2)
			{
				RandAttrLen = 1;
				this.UIPanel.GodTipsLb.text = Global.getLangStr("bag_msg6");//[非极品神传无第2随机属性]";
			} else
			{
				RandAttrLen = 2;
				this.UIPanel.GodTipsLb.text = "";
			}

			let tmpRandAttrAry = this.UIOpenData.showItem.randattr || [];
			this.UIPanel.GodRandInfoBox.onRefresh(RandAttrLen, this, (itemUI: ProUI.Utils.AttrInfoItemUI, index: number) =>
			{
				let attr = tmpRandAttrAry[index];
				if (attr)
				{
					let tmpAtterID = attr.type;
					let tmpAtterValue = Global.longToNumber(attr.value);
					let tmpAtterRate = attr.rate;
					itemUI.imgType.frame = tmpAtterID;
					itemUI.txtValue.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ": " +
						Global.getAttrValueStringSub(tmpAtterID, tmpAtterValue / 100, tmpAtterRate, 1, 1);
				} else
				{
					itemUI.imgType.frame = 20;  //特殊位
					itemUI.txtValue.text = "? ? ?";
				}
			});

			//随机属性高度设置
			this.UIPanel.GodRandInfoBox.height = 200; //先设定一个大一点的高度，保证在getCellTrueHeight能按每1行1个来计算
			this.UIPanel.GodRandInfoBox.height = this.UIPanel.GodRandInfoBox.getCellTrueHeight() + 10;  //多给一点值， 避免list的换行被取消挤到了第一排
			if (this.UIPanel.GodTipsLb.text)
			{
				this.UIPanel.GodTipsLb.y = this.UIPanel.GodRandInfoBox.y + this.UIPanel.GodRandInfoBox.height - 5;
				this.UIPanel.GodRandAtterBox.height = this.UIPanel.GodTipsLb.y + this.UIPanel.GodTipsLb.height + 4;
			} else
			{
				this.UIPanel.GodRandAtterBox.height = this.UIPanel.GodRandInfoBox.y + this.UIPanel.GodRandInfoBox.height;
			}

			//随机属性QA
			this.UIPanel.GodRandDesBtn.visible = tempItemQu > 0;
			this.UIPanel.GodRandDesBtn.onClick(this, (btn: component.UIButton) =>
			{
				let str = Global.getLangStr("godequip_attrTitle") + cfg.GodEquipRandattrCfgData.getTipStrWithPart(tempItemStar, tempItemPart);
				CommonHelpView.show(btn, str);
			});

			//套装属性
			//let tempSuitInfo = cfg.ItemGodSuitCfgData.getInfo(tempItemLv);
			// 对应神装套装ID
			let godSuitID = parseInt(cfg.ItemCfgData.getUseParamById(this.UIOpenData.showItem.itemid));
			// 神装套装属性
			let godSuitInfo = cfg.GodEquipSuitCfgData.getInfo(godSuitID);
			this.UIPanel.OneSuitBox.visible = godSuitInfo != null;
			if (godSuitInfo != null)
			{
				let tempActiveNum = 0;
				if (this.UIOpenData.petSn != null) tempActiveNum = SuitEquipDataMgr.getSuitMgr(this.UIOpenData.petSn).getActiveSuitGodNum(this.UIOpenData.showItem.itemsn as Long);
				else if (this.UIOpenData.godEquipSuitMgrId) tempActiveNum = SuitEquipDataMgr.getGodEquipSuitMgrSuitActiveNum(this.UIOpenData.godEquipSuitMgrId, godSuitInfo.suitID);
				// 套装名
				this.UIPanel.OneSuitNameLb.text = Global.getLangStr("bag_msg11", godSuitInfo.suitName, tempActiveNum);
				// this.UIPanel.OneSuitNameLb.color = tempActiveNum >= 4 ? "#20e59e" : "#eeeccc";
				this.UIPanel.OneSuitInfoBox.onRefresh(2, this, (itemUI: ProUI.ItemReview.ExAtterItemInfoUI, index: number) =>
				{
					let tmpSuitNum = 2 * (index + 1);
					itemUI.ActiveLb.text = Global.getLangStr("bag_msg4", tmpSuitNum);
					itemUI.ValueLb.color = tempActiveNum >= tmpSuitNum ? "#009e00" : "#978d82";
					itemUI.ActiveLb.color = itemUI.ValueLb.color;

					let tmpAtterInfo: cfg.AddAtterInfo;
					if (tmpSuitNum == 2)
					{
						tmpAtterInfo = cfg.GodEquipSuitCfgData.getAddAttr2AryByInfo(godSuitInfo);
					}
					else if (tmpSuitNum == 4)
					{
						//四星优先技能，有技能时无属性
						let tmpSkillInfo = cfg.GodEquipSuitCfgData.getAddSkillInfoByInfo(godSuitInfo);
						if (tmpSkillInfo)
						{
							itemUI.TypeImg.frame = 20;
							var skillCfgInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpSkillInfo.skillID, tmpSkillInfo.skillLv);
							//如果需要显示技能图标，这里只显示名字即可，否则就显示技能描述
							if (!godSuitInfo.hasSkillIcon)
								itemUI.ValueLb.text = skillCfgInfo.des;
							else
								itemUI.ValueLb.text = Global.getLangStr("bag_msg12", skillCfgInfo.name);  //技能【神龛】
							return;
						}
						tmpAtterInfo = cfg.GodEquipSuitCfgData.getAddAttr4AryByInfo(godSuitInfo);
					}
					itemUI.TypeImg.frame = tmpAtterInfo.type;
					itemUI.ValueLb.text = Global.getFullAttrValueString(tmpAtterInfo, ":");
				});
				this.UIPanel.OneSuitSkillBox.visible = !!godSuitInfo.hasSkillIcon;
				if (godSuitInfo.hasSkillIcon)
				{
					let tmpSkillInfo = cfg.GodEquipSuitCfgData.getAddSkillInfoByInfo(godSuitInfo);
					var skillCfgInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpSkillInfo.skillID, tmpSkillInfo.skillLv);
					Global.setResIconWithItemID(this.UIPanel.OneSuitSkillIcon, CfgID.ResType.Skill, skillCfgInfo.skillIndex);
					this.UIPanel.OneSuitSkillDesc.text = skillCfgInfo.des;
				}
			}

			//穿戴中
			if (this.UIOpenData.petSn != null)
			{
				//卸下
				(this.UIPanel.GodEquipLeftBtn.getChildAt(0) as component.UILabel).text = Global.getLangStr("item_review_msg3");// 卸下";
				this.UIPanel.GodEquipLeftBtn.onClick(this, () =>
				{
					this.closeUI();
					PetSend.godEquip_Ask(this.UIOpenData.petSn, tempItemSubType, null);
				});

				//更换
				(this.UIPanel.GodEquipRightBtn.getChildAt(0) as component.UILabel).text = Global.getLangStr("item_review_msg4");//更换";
				this.UIPanel.GodEquipRightBtn.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new HeroEquipSuitOpenUIData(this.UIOpenData.petSn, tempItemSubType, PanelNotify.Open_HeroEquipSuitGod), BaseBackUIType.CloseBackUI);
				});
			} else if (this.UIOpenData.godEquipSuitMgrId)
			{  //装备神装套装方案中				
				//卸下
				(this.UIPanel.GodEquipLeftBtn.getChildAt(0) as component.UILabel).text = Global.getLangStr("item_review_msg3");// 卸下";
				this.UIPanel.GodEquipLeftBtn.onClick(this, () =>
				{
					this.closeUI();
					PetSend.godSuit_EquipAsk(this.UIOpenData.godEquipSuitMgrId, tempItemSubType, null);
				});

				//更换
				(this.UIPanel.GodEquipRightBtn.getChildAt(0) as component.UILabel).text = Global.getLangStr("item_review_msg4");//更换";
				this.UIPanel.GodEquipRightBtn.onClick(this, () =>
				{
					var uiOpenData = new HeroEquipSuitOpenUIData(null, tempItemSubType, PanelNotify.Open_HeroEquipSuitGod);
					uiOpenData.godEquipSuitMgrId = this.UIOpenData.godEquipSuitMgrId;
					UIManager.Inst.forceOpen(uiOpenData, BaseBackUIType.CloseBackUI);
				});
			}
			else
			{
				//出售
				(this.UIPanel.GodEquipLeftBtn.getChildAt(0) as component.UILabel).text = Global.getLangStr("item_review_msg5");// 出售";
				this.UIPanel.GodEquipLeftBtn.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroGodEquipSell, this.UIOpenData.showItem), BaseBackUIType.CloseBackUI);
				});

				//穿戴
				(this.UIPanel.GodEquipRightBtn.getChildAt(0) as component.UILabel).text = Global.getLangStr("item_review_msg8"); //穿戴";
				this.UIPanel.GodEquipRightBtn.onClick(this, () =>
				{
					EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 1);
				});
			}

			//洗练
			this.UIPanel.GodEquipCenterBtn.gray = tempItemQu == 0;
			this.UIPanel.GodEquipCenterBtn.onClick(this, () =>
			{
				if (tempItemQu == 0)
				{
					TipsUtils.showTipsByLanId("item_review_msg16");
					return;
				}
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagGodEquipRefine, this.UIOpenData.showItem), BaseBackUIType.CloseBackUI);
			});

		}

		/**
		 * 刷新符文UI
		 */
		private refreshRuneUI()
		{
			//随机属性
			let tempAtterAry = this.UIOpenData.showItem.randattr || [];
			//符文只要有属性了，就是已经激活的状态。
			let isActive = tempAtterAry.length > 0;

			this.UIPanel.RuneFunBox.visible = isActive;
			this.UIPanel.AtterBox.visible = isActive;
			//符文只有在没激活时，才需要显示描述。
			this.UIPanel.DesInfo.visible = !isActive;
			//符文的作用说明，只有未激活属性的时候，才会显示
			if (isActive) this.UIPanel.UsesBox.visible = false;

			if (!isActive)
			{
				return;
			}

			this.UIPanel.RuneFunBtnBox.visible = this.UIOpenData.showFun;
			//this.UIPanel.TypeNameLb.text = Global.getLangStr("item_review_msg11");//符文";

			this.UIPanel.AtterInfoBox.onRefresh(tempAtterAry.length, this, (itemUI: ProUI.Utils.AttrInfoItemUI, index: number) =>
			{
				let tmpAtterID = tempAtterAry[index].type;
				let tmpAtterValue = Global.longToNumber(tempAtterAry[index].value) / 100;
				let tmpAtterRate = tempAtterAry[index].rate / 100;
				itemUI.imgType.frame = tmpAtterID;
				itemUI.txtValue.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ": " +
					(tmpAtterValue > 0 ? tmpAtterValue.toString() : tmpAtterRate + "%");
			});

			//随机技能
			let tempSKillAry = this.UIOpenData.showItem.skillinfo || [];
			this.UIPanel.RuneSkillListBox.onRefresh(tempSKillAry.length, this, (itemUI: ProUI.ItemReview.RuneSkillItemUI, index: number) =>
			{
				let tempSkill = tempSKillAry[index];
				let tempSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tempSkill.skillid, tempSkill.skilllevel);
				itemUI.NameLb.text = tempSkillInfo.name;
				itemUI.DesLb.text = tempSkillInfo.des;
				Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Skill, tempSkillInfo.skillIndex);
				Global.setResQuWithItemID(itemUI.BGImg, CfgID.ResType.Skill, tempSkillInfo.skillIndex);
			});
			this.UIPanel.RuneSkillInfoBox.visible = tempSKillAry.length > 0;

			//runeSkill高度重新计算
			let tempRuneSkillHeight = this.UIPanel.RuneSkillListBox.getCellTrueHeight();
			let ny = tempSKillAry.length > 0 ? (tempRuneSkillHeight + this.UIPanel.RuneSkillListBox.y + 10) : 0;
			if (this.UIPanel.RuneFunBtnBox.visible)
			{
				this.UIPanel.RuneFunBtnBox.y = ny;
				this.UIPanel.RuneFunBox.height = ny + this.UIPanel.RuneFunBtnBox.height + 10;
			} else
			{
				this.UIPanel.RuneFunBox.height = ny + 10;
			}

			//技能预览
			this.UIPanel.RuneSkillBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombinRuneSkill));
			});

			//合成
			this.UIPanel.RuneCombinBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombin), BaseBackUIType.CloseBackUI);
			});

			//重铸
			this.UIPanel.RuneResetBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagRuneEquipRefine, this.UIOpenData.showItem), BaseBackUIType.CloseBackUI);
			});

			//分解\穿戴
			this.UIPanel.RuneSplitBtn.text = this.UIOpenData.petSn != null ? Global.getLangStr("item_review_msg3") : Global.getLangStr("item_review_msg7");
			this.UIPanel.RuneEquipLb.text = this.UIOpenData.petSn != null ? Global.getLangStr("item_review_msg6") : Global.getLangStr("item_review_msg8");

			//穿戴中的符文
			if (this.UIOpenData.petSn != null)
			{

				//符文所在位置
				let tempEquipMgr = SuitEquipDataMgr.getSuitMgr(this.UIOpenData.petSn);
				let tempRunePos = tempEquipMgr.getRunePos(this.UIOpenData.showItem.itemsn as Long);

				//卸下
				this.UIPanel.RuneSplitBtn.onClick(this, () =>
				{
					this.closeUI();
					PetSend.runeEquip_Ask(this.UIOpenData.petSn, tempRunePos, null);
				});

				//有没有更好的装备可更换
				(this.UIPanel.RuneEquipBtn.getChildByName("reddot") as Laya.Image).visible = ItemDataMgr.hasBagPerfectEquip(this.UIOpenData.showItem.itemid);
				//替换
				this.UIPanel.RuneEquipBtn.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new HeroEquipSuitOpenUIData(this.UIOpenData.petSn, tempRunePos, PanelNotify.Open_HeroEquipSuitRune), BaseBackUIType.CloseBackUI);
				});
			}
			else
			{
				//分解
				this.UIPanel.RuneSplitBtn.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(4, this.UIOpenData.showItem), BaseBackUIType.CloseBackUI);
				});

				//穿戴
				this.UIPanel.RuneEquipBtn.onClick(this, () =>
				{
					EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 1);
				});
			}
		}

		/**
		 * 刷新伙伴道具UI
		 */
		private refreshPetItemUI()
		{

			let itemId = this.UIOpenData.showItem.itemid;
			let tmpSubType = cfg.ItemCfgData.getSubTypeById(itemId) as Pb_God._emItemPetType;
			let tmpItemStar = cfg.ItemCfgData.getStarNumById(itemId);

			//this.UIPanel.UsesBox.visible = true;
			//this.UIPanel.UsesTypeNameLb.text = Global.getLangStr("item_review_msg12");//英雄合成";
			this.UIPanel.HeroSpinFunBox.visible = this.UIOpenData.showFun;
			this.UIPanel.DesInfo.visible = !this.UIOpenData.showFun;
			//this.UIPanel.TypeNameLb.text = Global.getLangStr("item_review_msg13");//英雄碎片";



			//合成指定伙伴
			if (tmpSubType == Pb_God._emItemPetType.ItemPetType_PetID)
			{
				this.UIPanel.HeroCombinBtn.visible = true;
				this.UIPanel.HeroSpinDetailBtn.visible = true;
			} else if (tmpSubType == Pb_God._emItemPetType.ItemPetType_MaterialSpecific || tmpSubType == Pb_God._emItemPetType.ItemPetType_MaterialAny)
			{
				//升星材料
				this.UIPanel.HeroSpinDetailBtn.visible = false;
				this.UIPanel.HeroCombinBtn.visible = false;
				this.UIPanel.DesInfo.visible = true;
			}//合成指定种族随机
			else
			{
				this.UIPanel.HeroCombinBtn.visible = true;
				this.UIPanel.HeroSpinDetailBtn.visible = false;
			}
			this.UIPanel.HeroSpinDetailBtn.onClick(this, () =>
			{
				let petID = cfg.ItemCfgData.getCompoundIDById(itemId);
				let openUIData = new HeroDetailOpenUIData();
				openUIData.isTujian = true;
				openUIData.heroBookCfgInfo = cfg.PetBookCfgData.getInfoByDoubleKey(petID, tmpItemStar);
				UIManager.Inst.forceOpen(openUIData, BaseBackUIType.CloseBackUI);
			});

			//合成
			this.UIPanel.HeroCombinBtn.onClick(this, () =>
			{
				let tmpNeedCount = cfg.ItemPetcountCompoundCfgData.getNeedItemCountByPetStar(tmpItemStar);
				if (this.UIOpenData.showItem.itemcount >= tmpNeedCount)
				{
					let tmpItemStar = cfg.ItemCfgData.getStarNumById(itemId);
					let tmpNeedCount = cfg.ItemPetcountCompoundCfgData.getNeedItemCountByPetStar(tmpItemStar);
					let tmpSelectItemMaxNum = Math.floor(this.UIOpenData.showItem.itemcount / tmpNeedCount);
					let tmpSelectItemNum = tmpSelectItemMaxNum > 0 ? tmpSelectItemMaxNum : 0;
					if (tmpSelectItemNum == 1 || GuideMgr.Inst.getInShowGuide())
					{
						this.closeUI();
						ItemSend.petCompound(this.UIOpenData.showItem.itemsn, 1);
					}
					else
					{
						UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagItemBatchAction, 1, this.UIOpenData.showItem), BaseBackUIType.CloseBackUI);
					}
				}
				else
				{
					TipsUtils.showTipsByLanId("common_noCount");
				}
			});

			Global.autoLayoutSpriteNode(this.UIPanel.HeroSpinFunBox, "hor", 30, "center");
		}

		/**
		 * 刷新普通道具UI
		 */
		private refreshNormalItemUI()
		{

			//this.UIPanel.UsesBox.visible = true;
			//this.UIPanel.UsesTypeNameLb.text = Global.getLangStr("item_review_msg14");//道具功能";
			this.UIPanel.ItemFunBox.visible = this.UIOpenData.showFun;
			//this.UIPanel.TypeNameLb.text = Global.getLangStr("item_review_msg15");//活动道具";

			this.UIPanel.GoFromBtn.visible = cfg.ItemCfgData.getGetwayById(this.UIOpenData.showItem.itemid).length > 0;
			this.UIPanel.GoFromBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemAccess, this.UIOpenData.showItem.itemid), BaseBackUIType.CloseBackUI);
			});

			this.UIPanel.SellBtn.visible = cfg.ItemCfgData.getSellItemInfoById(this.UIOpenData.showItem.itemid) != null;
			this.UIPanel.SellBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagItemBatchAction, 0, this.UIOpenData.showItem), BaseBackUIType.CloseBackUI);
			});

			let tmpUseWayId = cfg.ItemCfgData.getUseWayById(this.UIOpenData.showItem.itemid);
			let tmpUseType = cfg.ItemCfgData.getUseTypeById(this.UIOpenData.showItem.itemid);
			let tmpItemSN = this.UIOpenData.showItem.itemsn;
			let tmpItemID = this.UIOpenData.showItem.itemid;
			let isGiftPackType = tmpUseType == Pb_God._emItemUseType.ItemUseType_Packet;
			//直接使用
			let directUse = tmpUseType == Pb_God._emItemUseType.ItemUseType_AddTitle ||
				tmpUseType == Pb_God._emItemUseType.ItemUseType_AddHeadIcon ||
				tmpUseType == Pb_God._emItemUseType.ItemUseType_AddPet ||
				tmpUseType == Pb_God._emItemUseType.ItemUseType_AddProductID ||
				tmpUseType == Pb_God._emItemUseType.ItemUseType_VIPExp ||
				tmpUseType == Pb_God._emItemUseType.ItemUseType_Profit;
			this.UIPanel.UseBtn.visible = tmpUseWayId > 0 || isGiftPackType || directUse;
			this.UIPanel.UseBtn.onClick(this, () =>
			{
				this.closeUI();
				if (isGiftPackType)
				{
					// 使用礼包
					let gift_arr = cfg.ItemGiftPackCfgData.getGiftInfoArrayByItemID(tmpItemID);
					if (gift_arr.length == 0)
					{
						logE("ERRO!没有配置对应道具的礼包!itemID: " + tmpItemID);
						return;
					}
					
					if (gift_arr[0].bagType == Pb_God.itemBagUseType.itemBagUseType_scelect)
					{
						// 打开选择礼包界面
						if(this.UIOpenData.showItem.itemid == this.ApecialItemID)
						{
							UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroOpt, this.UIOpenData.showItem));
						}
						else if (cfg.ItemGiftPackCfgData.isHeroGift(this.UIOpenData.showItem.itemid))
						{
							UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_GiftHeroPackSelectView, this.UIOpenData.showItem));
						}
						else
						{
							UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_GiftPackSelectView, this.UIOpenData.showItem));
						}
					}
					else
					{ // 随机获取或获得全部
						//判断道具是否有堆叠
						if (this.UIOpenData.showItem.itemcount > 1)
							UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagItemBatchAction, 2, this.UIOpenData.showItem));
						else
							ItemSend.bag_Use(tmpItemSN, 1, []);
					}
					return;
				} else if (directUse)
				{
					//判断道具是否有堆叠
					if (this.UIOpenData.showItem.itemcount > 1)
						UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagItemBatchAction, 3, this.UIOpenData.showItem));
					else
						ItemSend.use(tmpItemSN, 1);
				} else
				{
					TaskUtils.gotoOpenByUICfgId(tmpUseWayId);
				}

			});

			let offsizeX = 8;
			if(this.UIPanel.GoFromBtn.visible != this.UIPanel.SellBtn.visible)
			{
				offsizeX = 60;
			}
			Global.autoLayoutSpriteNode(this.UIPanel.ItemFunBtnBox, "hor", offsizeX, "center");
		}

		//-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.BagCombinHero_6_4)
			{
				GuideMgr.Inst.showFinger(this.UIPanel.HeroCombinBtn, true, this.UIPanel.HeroCombinBtn);
			}
		}

		// /**
		//  * 操作本步引导
		//  */
		// public Guide_Active(step: GuideStep) {
		// 	if (step == GuideStep.BagCombinHero_6_4) {
		// 		this.UIPanel.HeroCombinBtn.activeEvent();
		// 	}
		// }
	}
}