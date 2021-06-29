
module Pro
{
	export class NorItemTrulyUI extends ProUI.Utils.NorTroopItemUI
	{
		constructor()
		{
			super();

			/*
			this.IconImg.on(Laya.Event.LOADED,this,()=>{
				if(this.IconImg.source == null){
					return;
				}
				if(this.IconImg.source.sourceWidth != this.IconImg.source.sourceHeight){
					let tmpMinScale = Math.min(this.IconImg.source.sourceWidth / 110,this.IconImg.source.sourceHeight / 110);
					if(tmpMinScale < 1){tmpMinScale = 1;}
					if(tmpMinScale > 1){tmpMinScale = 1;}
					this.IconImg.width = tmpMinScale * this.IconImg.source.sourceWidth;
					this.IconImg.height = tmpMinScale * this.IconImg.source.sourceHeight;
				}
				else{
					this.IconImg.width = this.IconImg.height = Math.min(this.IconImg.source.sourceWidth,110);
				}
			});
			*/
		}

		public trulyBtn: component.UIButton;

		/**
		 * 隐藏所有子节点
		 */
		public hideAllChildren()
		{
			this.visible = true;
			this._children.forEach(elment =>
			{
				(elment as Laya.Sprite).visible = false;
			});
			this.StarBox.setStar(0, 0);
			this.gray = false;
			this.iconNew.visible = false;
			this.RedDotImg.pos(104, -9);
			this.trulyBtn.onClick(null, null);
			this.BloodLb.visible = false;
			this.IconImg.skin = "";
			this.LvLb.visible = false;
		}

		// public set gray(gray: boolean) {
		// 	//native环境下不支持box容器置灰处理，只能遍历子级了
		// 	//简化处理，将背景、ICON、星星、英雄类型、碎片显示置灰即可
		// 	this.BGImg.gray = gray;
		// 	this.IconImg.gray = gray;
		// 	this.frameImgHeroGroupType.gray = gray;
		// 	this.frameImgHeroSpin.gray = gray;
		// 	// this.frameImgHeroType.gray = gray;
		// 	this.IconImg.gray = gray;
		// 	this.StarBox.setStar(-1, gray ? 1 : 0);
		// }

		/**
		 * 设置一个伙伴的基础UI状态
		 */
		public setPetUI(skinId: number, petStar: number, isSpin: boolean = false,evolve:number=0)
		{

			this.hideAllChildren();

			this.BGImg.visible = true;
			this.IconImg.visible = true;
			this.StarBox.visible = true;
			this.petTypeIcon.visible = true;
			this.evolveImg.visible = true;
			this.frameImgHeroSpin.visible = isSpin;
			if (isSpin)
			{
				this.frameImgHeroSpin.frame = 4;//cfg.PetCfgData.getPetTypeByPetID(petId);
			}

			// this.frameImgHeroGroupType.visible = true;
			// Global.setResPetGroupType(this.frameImgHeroGroupType, petId);
			Global.setResQuWithNum(this.BGImg, petStar - 1);
			Global.setColorWithNum(this.LvLb, petStar - 1);
			Global.setColorWithNum(this.NumLb, petStar - 1);
			Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Pet, skinId);
			Global.setEvolveImg(this.evolveImg,evolve);


			let petID = cfg.PetSkinCfgData.getPetIDById(skinId);
			Global.setPetType(this.petTypeIcon, cfg.PetCfgData.getPetTypeByPetID(petID));

			this.StarBox.setStar(petStar);
		}

		/**
		 * 设置一个未指定伙伴Id的伙伴碎片UI状态
		 * @param petType 指定职业 0表示职业随机
		 */
		public setPetSpinUI(itemId: number, petStar: number, petType: number)
		{

			this.hideAllChildren();

			this.BGImg.visible = true;
			this.IconImg.visible = true;
			this.StarBox.visible = true;
			this.frameImgHeroSpin.visible = true;
			// this.frameImgHeroType.visible = true;
			this.frameImgHeroSpin.frame = 4;//petType == 0 ? 10 : petType;  //特殊10为随机职业

			Global.setResQuWithNum(this.BGImg, petStar - 1);
			Global.setColorWithNum(this.LvLb, petStar - 1);
			Global.setColorWithNum(this.NumLb, petStar - 1);

			this.petTypeIcon.visible = true;

			Global.setPetType(this.petTypeIcon, petType == 0 ? 10 : petType);
			Global.setEvolveImg(this.evolveImg);

			Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, itemId);

			this.StarBox.setStar(petStar);
		}

		/**
		 * 显示伙伴基础状态
		 * @param info 伙伴数据
		 * @param showRedDot 是否显示红点功能提示
		 * @param showOnStore 是否显示已上阵主线状态
		 */
		public setPetInfo(info: Net.hero | Pb_God.PBPetDisplay, showRedDot: boolean = false, showOnStore: boolean = false): void
		{
			this.setPetUI(info.useskinid, info.star,false,info.evolve);

			this.LvLb.visible = true;
			this.LvLb.text = info.level.toString();

			this.RedDotImg.visible = showRedDot && (info as Net.hero).reddotModel && (info as Net.hero).reddotModel.isRedDot;
			this.ZhanStatueImg.visible = showOnStore && (info as Net.hero).onStore;
			this.support.visible = !!info["supportMePlayerId"];
		}


		/**
		 * 显示伙伴基础状态，可点击查看详细信息
		 * @param info 伙伴数据
		 * @param isClickDetail 是否可点击查看伙伴详细信息
		 * @param playerDisplay 归属玩家， 如果空值，则查看玩家自己的
		 */
		public setPetInfoExtend(info: Net.hero | Pb_God.PBPetDisplay, isClickDetail: boolean, playerDisplay: Pb_God.PBPlayerDisplay = null): void
		{
			this.setPetInfo(info, false, false);

			if (isClickDetail)
			{
				this.trulyBtn.onClick(this, () =>
				{
					let playerID = playerDisplay ? playerDisplay.playerid : PlayerDataMgr.uid;
					let worldID = playerDisplay ? playerDisplay.logicworldid : PlayerDataMgr.worldid;
					CommonSend.queryPetView(playerID, worldID, info.sn, 0, 0);
				});
			}
			else
			{
				this.trulyBtn.onClick(null, null);
			}
		}

		/**
		 * 显示伙伴基础配置状态
		 * @param info 伙伴配置数据
		 */
		public setPetSkinCfgIndo(info: cfg.PetSkinCfgInfo): void
		{
			let petCfgInfo = cfg.PetCfgData.getInfo(info.petID);
			this.setPetUI(petCfgInfo.baseSkin, petCfgInfo.minStar);

			this.LvLb.visible = true;
			this.LvLb.text = cfg.PetAdvanceCfgData.getMaxPetLevelByAdvance(petCfgInfo.minStar).toString();
		}

		/**
		 * 显示伙伴图鉴状态
		 * @param info 伙伴配置数据
		 */
		public setPetBookCfgInfo(info: cfg.PetBookCfgInfo): void
		{
			this.setPetUI(cfg.PetCfgData.getBaseSkinByPetID(info.petID), info.star);

			this.LvLb.visible = true;
			this.LvLb.text = info.maxLevel + "";
		}
		/**
		 * 显示守护英雄
		 * @param info 守护技能配置
		 */
		public setDefendSkillCfgInfo(info: cfg.DefendSkillCfgInfo): void
		{
			this.setPetUI(cfg.PetCfgData.getBaseSkinByPetID(info.petID), info.petStar);
			this.LvLb.visible = false;
		}


		/**
		 * 伙伴升星时显示的需要的指定伙伴
		 * @param heroInfo 准备升级的伙伴
		 * @param info 指定伙伴信息 （ID\星级\个数）
		 * @param selectNum 已经选择的个数
		 */
		public setNeedStarCountPetCfgInfo(skinId: number, petStar: number, petNum: number, selectNum: number, showName: boolean,showSelectNum: boolean): void
		{
			this.setPetUI(skinId, petStar);

			this.LvLb.visible = true;
			this.LvLb.text = selectNum + "/" + petNum;
			this.LvLb.visible = showSelectNum;

			this.NameLb.visible = showName;
			this.NameLb.text = cfg.PetSkinCfgData.getFileNameById(skinId);
		}

		/**
		 * 伙伴升星时显示的需要的星级伙伴
		 * @param heroInfo 准备升级的伙伴
		 * @param info 指定伙伴信息 （星级\个数）
		 * @param selectNum 已经选择的个数
		 */
		public setNeedStarPetCfgInfo(petType: number, petStar: number, petNum: number, selectNum: number, showName: boolean): void
		{
			this.hideAllChildren();
			this.IconImg.visible = true;
			this.StarBox.visible = true;
			this.LvLb.visible = true;
			this.NameLb.visible = showName;
			this.BGImg.visible = true;

			this.LvLb.text = selectNum + "/" + petNum;
			Global.setColorWithNum(this.LvLb, petStar - 1);
			Global.setColorWithNum(this.NumLb, petStar - 1);
			if (petType > 0)
			{
				let strType = Global.getLangStr("hero_type_" + petType)
				this.NameLb.text = Global.getLangStr("hero_msg21", petStar, strType);  //4星火系英雄
			} else
			{
				this.NameLb.text = Global.getLangStr("hero_msg1", petStar);  //4星英雄
			}

			Global.setResQuWithNum(this.BGImg, petStar - 1);
			let petSplitItemId = CfgID.ItemID.PetSpitStar3;
			if (petStar == 4) petSplitItemId = CfgID.ItemID.PetSpitStar4;
			else if (petStar == 5) petSplitItemId = CfgID.ItemID.PetSpitStar5;
			Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, petSplitItemId);
			this.StarBox.setStar(petStar);
		}

		/**
		 * 设置一个伙伴升星材料道具显示
		 * @param petType 指定职业 0表示阵营随机
		 */
		public setPetMaterialUI(itemId: number, petStar: number, showName: boolean, showNum: boolean, itemNum: number)
		{

			this.hideAllChildren();

			this.BGImg.visible = true;
			this.IconImg.visible = true;
			this.StarBox.visible = true;

			this.NameLb.visible = showName;
			this.NameLb.text = showName ? cfg.ItemCfgData.getNameById(itemId) : "";
			this.NumBgImg.visible = showNum && itemNum > 1;
			Global.setColorWithNum(this.NumLb, petStar - 1);
			Global.setColorWithNum(this.LvLb, petStar - 1);
			this.NumLb.text = Global.numberToTuckString(itemNum);
			this.NumBgImg.width = this.NumLb.width + 5;

			Global.setResQuWithNum(this.BGImg, petStar - 1);

			Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, itemId);

			this.StarBox.setStar(petStar);
		}

		/**
		 * 显示一个基础道具
		 * @param info 道具信息
		 * @param showName 是否显示道具名称
		 * @param showNum 是否显示道具个数
		 * @param clickDes 点击是否显示道具描述
		 * @param showDesFun 弹出的道具描述中是否显示功能操作
		 */
		public setItemInfo(info: cfg.AddItemInfo, showName: boolean = false, showNum: boolean = true, clickDes: boolean = true, showDesFun: boolean = false, showRedDot: boolean = false): void
		{
			this.setItemID(info.itemid, info.itemcount, showName, showNum, false, false, showRedDot);
			if (clickDes)
			{
				this.trulyBtn.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new ItemReviewOpenUIData(info, null, showDesFun));
				});
			}
		}

		/**
		 * 显示一个基础道具
		 * @param info 道具信息
		 * @param showName 是否显示道具名称
		 * @param showNum 是否显示道具个数
		 * @param clickDes 点击是否显示道具描述
		 * @param showDesFun 弹出的道具描述中是否显示功能操作
		 */
		public setItemID(itemId: number, itemNum: number, showName: boolean = false, showNum: boolean = true, clickDes: boolean = true, showDesFun: boolean = false, showRedDot: boolean = false): void
		{
			//道具类型
			let tmpItemType = cfg.ItemCfgData.getTypeById(itemId);

			//显示伙伴碎片
			if (tmpItemType == Pb_God._emItemType.ItemType_Pet)
			{

				let tmpSubType = cfg.ItemCfgData.getSubTypeById(itemId) as Pb_God._emItemPetType;
				let tmpCombinId = cfg.ItemCfgData.getCompoundIDById(itemId);
				let tmpItemStar = cfg.ItemCfgData.getStarNumById(itemId);
				let tmpNeedCount = cfg.ItemPetcountCompoundCfgData.getNeedItemCountByPetStar(tmpItemStar);

				//合成指定伙伴
				if (tmpSubType == Pb_God._emItemPetType.ItemPetType_PetID)
				{
					this.setPetUI(cfg.PetCfgData.getBaseSkinByPetID(tmpCombinId), tmpItemStar, true);
				}//合成指定种族
				else if (tmpSubType == Pb_God._emItemPetType.ItemPetType_PetType|| tmpSubType == Pb_God._emItemPetType.ItemPetType_Group)
				{
					this.setPetSpinUI(itemId, tmpItemStar, tmpCombinId);
				}//合成随机任意星级
				else if (tmpSubType == Pb_God._emItemPetType.ItemPetType_Rand)
				{
					this.setPetSpinUI(itemId, tmpItemStar, 0);
				}//升星材料道具
				else if (tmpSubType == Pb_God._emItemPetType.ItemPetType_MaterialAny || tmpSubType == Pb_God._emItemPetType.ItemPetType_MaterialSpecific)
				{
					//合成材料与道具
					this.setPetMaterialUI(itemId, tmpItemStar, showName, showNum, itemNum);
					//TODO 普通道具会触发hideAllChildren，把监听回调删除了 
					if (clickDes)
					{
						this.addEventClick(itemId,itemNum,showDesFun);
					}
					return;
				}

				//显示合成需求
				let tmpProNum = itemNum / tmpNeedCount;
				if (tmpProNum > 1)
				{
					tmpProNum = 1;
				}

				this.BloodBgImg.visible = showRedDot && showNum;

				//这里延迟一帧调用 否则遮罩会出现不生效的情况
				Laya.timer.frameOnce(1, this, () =>
				{
					Global.setProgressBarMask(this.BloodImg, tmpProNum);
				});
				this.BloodLb.text = itemNum + "/" + tmpNeedCount;
				this.BloodLb.visible = true;

				this.NumBgImg.visible = !showRedDot && showNum && itemNum > 1;
				Global.setColorWithNum(this.NumLb, tmpItemStar - 1);
				this.NumLb.text = itemNum.toString();
				this.NumBgImg.width = this.NumLb.width + 5;

				this.RedDotImg.visible = showRedDot && itemNum >= tmpNeedCount;
				this.NameLb.text = cfg.ItemCfgData.getNameById(itemId);
				this.NameLb.visible = showName;

			}//显示普通道具
			else
			{
				this.hideAllChildren();
				this.BGImg.visible = true;
				this.NameLb.visible = true;
				this.IconImg.visible = true;
				this.StarBox.visible = true;

				this.NameLb.text = showName ? cfg.ItemCfgData.getNameById(itemId) : "";
				this.NumBgImg.visible = showNum && itemNum > 1;
				this.NumLb.text = Global.numberToTuckString(itemNum);
				this.NumBgImg.width = this.NumLb.width + 5;

				let useType = cfg.ItemCfgData.getUseTypeById(itemId);
				//显示英雄
				if (useType == Pb_God._emItemUseType.ItemUseType_AddPet)
				{
					let tmpUseParamAry = cfg.ItemCfgData.getUseParamInfoById(itemId);
					let tmpPetID = tmpUseParamAry[0];
					let tmpPetStar = tmpUseParamAry[1];
					Global.setResQuWithNum(this.BGImg, tmpPetStar - 1);
					Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Pet, cfg.PetCfgData.getBaseSkinByPetID(tmpPetID));
					this.StarBox.setStar(tmpPetStar);
					Global.setColorWithNum(this.NumLb, tmpPetStar - 1);
					Global.setColorWithNum(this.LvLb, tmpPetStar - 1);
				}
				else
				{
					//VIP经验卡还需要显示经验值
					if (useType == Pb_God._emItemUseType.ItemUseType_VIPExp)
					{
						this.topCenterTextBox.visible = true;
						this.txtTopCenter.text = cfg.ItemCfgData.getUseParamById(itemId).split("_")[0] + Global.getLangStr("common_exp");
					}
					//挂机收益卡还需要显示一个时间
					else if (useType == Pb_God._emItemUseType.ItemUseType_Profit)
					{
						this.topCenterTextBox.visible = true;
						let time = cfg.ItemCfgData.getUseParamById(itemId).split("_")[0];
						let hour = Math.floor(parseInt(time) / 60);
						this.txtTopCenter.text = hour + Global.getLangStr("common_hour");
					}
					Global.setResQuWithItemID(this.BGImg, CfgID.ResType.Item, itemId);
					Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, itemId);
					this.StarBox.setStar(cfg.ItemCfgData.getStarNumById(itemId));
					Global.setColorWithItemID(this.NumLb, CfgID.ResType.Item, itemId);
					Global.setColorWithItemID(this.LvLb, CfgID.ResType.Item, itemId);


					//处理自选礼包
					let arr = cfg.ItemGiftPackCfgData.getGiftInfoArrayByItemID(itemId)
					if (arr.length > 0 && arr[0].bagType == 3)
					{
						this.LvLb.visible = true;
						this.LvLb.text = Global.getLangStr("ui_ItemReview_msg14");
					}
				}

				//神装显示
				if (tmpItemType == Pb_God._emItemType.ItemType_GodEquip)
				{
					this.LvLb.visible = true;
					let quality = cfg.ItemCfgData.getQualityById(itemId);
					this.LvLb.text = Global.getLangStr("godQu_" + quality);
					this.GodEquipSuitTypeImg.visible = true;
					this.GodEquipSuitTypeImg.frame = cfg.GodEquipSuitCfgData.getTypeBySuitID(parseInt(cfg.ItemCfgData.getUseParamById(itemId)));
				}

			}

			//TODO 这代码本来最前面的，但是普通道具会触发hideAllChildren，把监听回调删除了，所以移到这里
			//点击事件
			if (clickDes)
			{
				this.addEventClick(itemId,itemNum,showDesFun);
			}

		}

		private addEventClick(itemId: number, itemNum: number,showDesFun: boolean)
		{
			let tmpInfo = new Pb_God.PBItem();
			tmpInfo.itemid = itemId;
			tmpInfo.itemcount = itemNum;
			this.trulyBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tmpInfo, null, showDesFun));
			});
		}


		/**
		 * 显示一个带数字进度显示的基础道具 比如："(3/5)"
		 * <p> 该接口用于某些需要显示消耗道具的地方， 仅用于显示基础道具，英雄碎片本身带有进度条显示，请使用setItemID接口
		 * @param info 
		 * @param showName 
		 */
		public setNeedCountItem(itemId: number, itemNum: number, needNum: number, showName: boolean = false, clickDes: boolean = true): void
		{
			this.hideAllChildren();
			this.BGImg.visible = true;
			this.NumBgImg.visible = true;
			this.NameLb.visible = true;
			this.IconImg.visible = true;

			this.NameLb.text = showName ? cfg.ItemCfgData.getNameById(itemId) : "";
			this.NumLb.color = itemNum >= needNum ? "#FFFFFF" : "#FF0000";
			this.NumLb.text = itemNum + "/" + needNum;
			this.NumBgImg.width = this.NumLb.width + 5;
			Global.setResQuWithItemID(this.BGImg, CfgID.ResType.Item, itemId);
			Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, itemId);


			//点击事件
			if (clickDes)
			{
				let tmpInfo = new Pb_God.PBItem();
				tmpInfo.itemid = itemId;
				tmpInfo.itemcount = itemNum;
				this.trulyBtn.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tmpInfo));
				});
			}
		}

		/**
		 * 显示一个技能道具
		 * @param info 
		 * @param showName 
		 */
		public setSkillInfo(skillIndex: number): void
		{
			this.hideAllChildren();
			this.IconImg.visible = true;
			this.BGImg.visible = true;

			Global.setResQuWithItemID(this.BGImg, CfgID.ResType.Skill, skillIndex);
			Global.setColorWithItemID(this.LvLb, CfgID.ResType.Skill, skillIndex);
			Global.setColorWithItemID(this.NumLb, CfgID.ResType.Skill, skillIndex);
			Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Skill, skillIndex);

		}

		/**
		 * 根据一个伙伴的id和星级显示状态
		 * @param info 一个伙伴id和星级
		 */
		public setPetStarInfo(info: Pb_God.PBPetStar): void
		{
			let skinId = cfg.PetCfgData.getBaseSkinByPetID(info.petid);
			this.setPetUI(skinId, info.star);

			this.NameLb.visible = true;
			this.NameLb.text = cfg.PetSkinCfgData.getFileNameById(skinId);
		}

		/**
		 * 隐藏节点
		 */
		public setEmptyInfo(): void
		{
			this.visible = false;
			this.trulyBtn.onClick(null, null);
		}

	}
}