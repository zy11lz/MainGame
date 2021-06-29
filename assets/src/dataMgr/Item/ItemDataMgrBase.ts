
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
	export class ItemDataMgrBase
	{
		constructor()
		{

		}

		//----------------------------------------------------------------------------
		/** 背包数据 */
		protected bagInfo: Pb_God.PBPlayerBag;
		/** 背包装备默认格子数 */
		protected equipDefaultSpace = 0;
		/** 符文熔炼积分 */
		protected ronglianJifen = 0;
		/** 符文积分兑换道具ID */
		protected ronglianDuihuanItemID = 0;

		/** 初始化 */
		public init(info: Pb_God.PBPlayerBag, PlayerBag_2: Pb_God.PBPlayerBag)
		{

			this.bagInfo = info;
			if (PlayerBag_2)
			{
				info.itembag = info.itembag.concat(PlayerBag_2.itembag);
				info.equipitem = info.equipitem.concat(PlayerBag_2.equipitem);
				info.equiplog = info.equiplog.concat(PlayerBag_2.equiplog);
			}
			this.equipDefaultSpace = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_EquipBagSpace);
			this.ronglianJifen = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Item, Pb_God._emConstant_Item.C_Item_RuneExchangeScore);
			this.ronglianDuihuanItemID = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Item, Pb_God._emConstant_Item.C_Item_RuneExchangeItem);

			this.initRedDotModel();
		}

		//--------------------------------基础配置---------------------------------
		/** 装备空间 */
		public getEquipSpace(): number
		{
			return this.equipDefaultSpace;
		}

		/** 符文熔炼积分 */
		public getRuneExchangeScore(): number
		{
			return this.ronglianJifen;
		}

		/** 符文熔炼积分兑换ID */
		public getRuneExchangeItem(): number
		{
			return this.ronglianDuihuanItemID;
		}

		//--------------------------------背包数据操作---------------------------------
		/** 获取背包总数组 */
		public getBagList(): Pb_God.PBItem[]
		{
			return this.bagInfo.itembag;
		}

		/** 通知背包道具更新 */
		public triggerChangeByItemid(itemid: number, itemCount: number): void
		{
			let cfgInfo = cfg.ItemCfgData.getInfo(itemid);
			if (cfgInfo == null)
			{
				return;
			}

			let bagType = cfgInfo.bagType;
			if (bagType == Pb_God._emBagType.BagType_Item)
			{  //道具背包
				EventMgr.trigger(EventNotify.PlayerItemNumChange, itemid, itemCount);
			} else if (bagType == Pb_God._emBagType.BagType_PetPiece)
			{  //英雄碎片背包
				EventMgr.trigger(EventNotify.PetPieceNumChange, itemid, itemCount);
			} else if (bagType == Pb_God._emBagType.BagType_Equip)
			{ //装备
				EventMgr.trigger(EventNotify.BagEquipNumChange, itemid, itemCount);
			} else if (bagType == Pb_God._emBagType.BagType_GodEquip)
			{  //神器背包
				EventMgr.trigger(EventNotify.BagGodEquipNumChange, itemid, itemCount);
			} else
			{  //特殊背包或者背包外的道具
				let itemType = cfgInfo.type;
				if (itemType == Pb_God._emItemType.ItemType_Normal) //普通道具
					EventMgr.trigger(EventNotify.PlayerItemNumChange, itemid, itemCount);
				else if (itemType == Pb_God._emItemType.ItemType_Rune)   //符文
					EventMgr.trigger(EventNotify.BagRuneNumChange, itemid, itemCount);
			}
		}

		/** 根据道具ID和ItemSN获取背包中PBItem */
		public getBagPBItem(itemSN: Long): Pb_God.PBItem
		{
			let tmpAry = this.getBagList();
			let results = tmpAry.filter(elment => (elment.itemsn as Long).equals(itemSN));
			if (results.length > 0)
			{
				return results[0];
			}
			return null;
		}

		/** 根据道具ID和ItemSN获取背包数组中的索引 */
		public getBagItemIndex(itemSN: Long): number
		{
			let tmpAry = this.getBagList();
			let index = -1;
			for (let i = 0; i < tmpAry.length; i++)
			{
				let elment = tmpAry[i];
				if ((elment.itemsn as Long).equals(itemSN))
				{
					index = i;
					break;
				}
			}
			return index;
		}

		/** 获取品质一般的装备 */
		public getEquipListWithMaxQuNum(maxQuNum: number): Pb_God.PBItem[]
		{
			let tmpAry = this.getBagAryWithBagType(Pb_God._emBagType.BagType_Equip);
			let results = tmpAry.filter(elment => cfg.ItemCfgData.getQualityById(elment.itemid) <= maxQuNum);
			return results;
		}

		/** 根据道具ID获取背包中同类型的数据 */
		public getBagAryWithItemID(itemID: number): Pb_God.PBItem[]
		{
			let bagType = cfg.ItemCfgData.getBagTypeById(itemID);
			return this.getBagAryWithBagType(bagType);
		}

		/** 根据道具类型获取背包中的数据 */
		public getBagAryWithBagTypeAry(bagTypeAry: Array<Pb_God._emBagType>): Pb_God.PBItem[]
		{
			let results = this.bagInfo.itembag.filter(elment => bagTypeAry.indexOf(cfg.ItemCfgData.getBagTypeById(elment.itemid)) >= 0);
			return results;
		}

		/** 根据道具ID取得背包里面的对应道具（不是归纳所有，只拿一个格子） */
		public getItemInfoById(itemId: number): Pb_God.PBItem
		{
			let tmpAry = this.getBagList();
			for (var el of tmpAry)
			{
				if (el.itemid == itemId) return el;
			}
			return null;
		}

		/** 根据道具类型获取背包中的数据 */
		public getBagAryWithBagType(bagType: Pb_God._emBagType, sort: boolean = false): Pb_God.PBItem[]
		{
			let results = this.bagInfo.itembag.filter(elment => cfg.ItemCfgData.getBagTypeById(elment.itemid) == bagType);
			if (sort)
			{
				this.sortBagItemList(bagType, results);
			}
			return results;
		}

		public sortBagItemList(bagType: Pb_God._emBagType, list: Pb_God.PBItem[], itemType?: Pb_God._emItemType): Pb_God.PBItem[]
		{
			//神装的排序比较特殊，需要先按星级排，再按品质， 而其它装备则是先按品质，再排星级
			if (Pb_God._emBagType.BagType_GodEquip == bagType)
				list.sort(function (a: Pb_God.PBItem, b: Pb_God.PBItem)
				{
					let aCfgInfo = cfg.ItemCfgData.getInfo(a.itemid);
					let bCfgInfo = cfg.ItemCfgData.getInfo(b.itemid);
					if (aCfgInfo.subType != bCfgInfo.subType) { return aCfgInfo.subType - bCfgInfo.subType; }
					else if (aCfgInfo.starNum != bCfgInfo.starNum) { return bCfgInfo.starNum - aCfgInfo.starNum; }
					else { return a.itemid - b.itemid }
				});

			else if (Pb_God._emBagType.BagType_Equip == bagType)
				list.sort(function (a: Pb_God.PBItem, b: Pb_God.PBItem)
				{
					let aCfgInfo = cfg.ItemCfgData.getInfo(a.itemid);
					let bCfgInfo = cfg.ItemCfgData.getInfo(b.itemid);
					if (aCfgInfo.subType != bCfgInfo.subType) { return aCfgInfo.subType - bCfgInfo.subType; }
					else if (aCfgInfo.level != bCfgInfo.level) { return bCfgInfo.level - aCfgInfo.level; }
					else { return a.itemid - b.itemid }
				});
			else
				if (Pb_God._emItemType.ItemType_Rune == itemType)
					list.sort((a: Pb_God.PBItem, b: Pb_God.PBItem) =>
					{
						let aCfgInfo = cfg.ItemCfgData.getInfo(a.itemid);
						let bCfgInfo = cfg.ItemCfgData.getInfo(b.itemid);
						if (aCfgInfo.quality == bCfgInfo.quality)
							return a.itemid - b.itemid;
						return bCfgInfo.quality - aCfgInfo.quality;
					})
				else
					list.sort(function (a: Pb_God.PBItem, b: Pb_God.PBItem)
					{
						let aCfgInfo = cfg.ItemCfgData.getInfo(a.itemid);
						let bCfgInfo = cfg.ItemCfgData.getInfo(b.itemid);
						if (aCfgInfo.type != bCfgInfo.type) { return aCfgInfo.type - bCfgInfo.type; }
						else if (aCfgInfo.subType != bCfgInfo.subType) { return aCfgInfo.subType - bCfgInfo.subType; }
						else if (aCfgInfo.useType != bCfgInfo.useType) { return aCfgInfo.useType - bCfgInfo.useType; }
						else if (aCfgInfo.quality != bCfgInfo.quality) { return bCfgInfo.quality - aCfgInfo.quality; }
						else if (aCfgInfo.starNum != bCfgInfo.starNum) { return bCfgInfo.starNum - aCfgInfo.starNum; }
						else { return a.itemid - b.itemid }
					});
			return list;
		}

		/** 获取背包中可用于合成符文的数据 */
		public getRuneAryForCombin(): Pb_God.PBItem[]
		{
			let results = this.bagInfo.itembag.filter(elment => cfg.ItemCfgData.getBagTypeById(elment.itemid) == Pb_God._emBagType.BagType_Special &&
				cfg.ItemCfgData.getSubTypeById(elment.itemid) < Pb_God._emRuneType.RuneType_StarStone && cfg.RuneCompoundCfgData.getInfoWithNeedItemID(elment.itemid).ifSynthesis);
			results.sort(function (a: Pb_God.PBItem, b: Pb_God.PBItem)
			{
				let aQu = cfg.ItemCfgData.getQualityById(a.itemid);
				let bQu = cfg.ItemCfgData.getQualityById(b.itemid);
				if (aQu > bQu) { return 1; }
				else if (aQu < bQu) { return -1; }
				else if (a.itemid >= b.itemid) { return 1; }
				else { return -1 }
			});
			return results;
		}

		/** 获取背包中道具得个数 */
		public getBagItemNum(itemID: number): number
		{
			let tmpAry = this.getBagList();
			let haveNum = 0;
			let results = tmpAry.filter(elment => elment.itemid == itemID);
			results.forEach(ellment =>
			{
				haveNum += ellment.itemcount;
			});

			return haveNum;
		}

		//-------------------------------装备数据筛选------------------------------
		/** 获取当前某个装备部件所有装备 */
		public getBagListByItemType(bagType: Pb_God._emBagType, type: Pb_God._emItemType, subType?: number | Array<number>): Pb_God.PBItem[]
		{
			let tmpAry = this.getBagAryWithBagType(bagType);
			let result: Pb_God.PBItem[];
			if (subType != null)
			{
				if (typeof (subType) == "number")
				{
					result = tmpAry.filter(elment => cfg.ItemCfgData.getTypeById(elment.itemid) == type &&
						cfg.ItemCfgData.getSubTypeById(elment.itemid) == subType);
				}
				else
				{
					result = tmpAry.filter(elment => cfg.ItemCfgData.getTypeById(elment.itemid) == type &&
						subType.indexOf(cfg.ItemCfgData.getSubTypeById(elment.itemid)) >= 0);
				}
			}
			else
			{
				result = tmpAry.filter(elment => cfg.ItemCfgData.getTypeById(elment.itemid) == type);
			}

			return result;
		}

		/** 选择当前最优的装备部件 */
		public getBagPerfectEquip(bagType: Pb_God._emBagType, itemType: Pb_God._emItemType, subType?: number | Array<number>): Pb_God.PBItem[]
		{
			let tmpAry = this.getBagListByItemType(bagType, itemType, subType);
			this.sortBagItemList(bagType, tmpAry, itemType);
			return tmpAry;
		}

		/** 检查背包有没有比指定装备更牛逼的 */
		public hasBagPerfectEquip(itemId: number): boolean
		{
			let curCfgInfo = cfg.ItemCfgData.getInfo(itemId);
			let subType = null;
			if (curCfgInfo.type == Pb_God._emItemType.ItemType_Equip) subType = curCfgInfo.subType;
			let bagList = this.getBagListByItemType(curCfgInfo.bagType, curCfgInfo.type, subType);
			for (let item of bagList)
			{
				let perfectCfgInfo = cfg.ItemCfgData.getInfo(item.itemid);
				if (perfectCfgInfo.quality > curCfgInfo.quality) return true;
				else if (perfectCfgInfo.quality == curCfgInfo.quality)
				{
					if (perfectCfgInfo.starNum > curCfgInfo.starNum) return true;
				}
			}
			return false;
		}

		//--------------------------------使用中的装备数据------------------------------
		/** 所有穿戴过的装备 */
		public getUsesEquip(): Pb_God.PBItem[]
		{
			return this.bagInfo.equipitem;
		}

		/** 获取穿戴列表中的装备索引 */
		public getUsesEquipIndex(snid: Long): number
		{
			let tmpAry = this.getUsesEquip();
			let index = -1;
			for (let i = 0; i < tmpAry.length; i++)
			{
				let elment = tmpAry[i];
				if ((elment.itemsn as Long).equals(snid))
				{
					index = i;
					break;
				}
			}
			return index;
		}

		/** 获取穿戴列表中的装备索引 */
		public getUsesPBItem(snid: Long): Pb_God.PBItem
		{
			let tmpAry = this.getUsesEquip();
			for (let i = 0; i < tmpAry.length; i++)
			{
				let elment = tmpAry[i];
				if ((elment.itemsn as Long).equals(snid))
				{
					return elment;
				}
			}
			return null;
		}

		/** 从使用装备列表中放回到背包 */
		public unEquipWithPBItem(itemsn: Long)
		{
			let tmpAry = this.getUsesEquip();
			let tmpUsesIndex = this.getUsesEquipIndex(itemsn as Long);
			if (tmpUsesIndex >= 0)
			{
				this.getBagList().push(tmpAry[tmpUsesIndex]);
				tmpAry.splice(tmpUsesIndex, 1);
			}
		}

		/** 从背包中变更一个装备到使用列表中 */
		public equipWithPBItem(itemsn: Long)
		{
			let tmpAry = this.getBagList();
			let tmpIndex = this.getBagItemIndex(itemsn as Long);
			if (tmpIndex >= 0)
			{
				this.getUsesEquip().push(tmpAry[tmpIndex]);
				tmpAry.splice(tmpIndex, 1);
			}
		}

		/** 将一个PbItem属性转换成String */
		public getPbItemToString(info: Pb_God.PBItem): string
		{

			let tmpSkillStr = "";
			info.skillinfo.forEach(elment =>
			{
				let tmpSkInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(elment.skillid, elment.skilllevel);
				tmpSkillStr += tmpSkInfo.skillIndex + ";";
			});
			if (tmpSkillStr.length > 0)
			{
				tmpSkillStr = tmpSkillStr.substr(0, tmpSkillStr.length - 1);
			}

			let tmpAttrStr = "";
			info.randattr.forEach(elment => { tmpAttrStr += elment.type + "|" + elment.value + "|" + elment.rate + ";"; });
			if (tmpAttrStr.length > 0)
			{
				tmpAttrStr = tmpAttrStr.substr(0, tmpAttrStr.length - 1);
			}

			return info.itemid + "*" + info.itemcount + "*" + tmpSkillStr + "*" + tmpAttrStr;
		}

		/** 将一个PbItem的String 转换成PBItem */
		public getPbItemFromString(tmpStrAry: string[]): Pb_God.PBItem
		{

			let tmpSkillAry = tmpStrAry[2].split(";");
			let tmpAttrAry = tmpStrAry[3].split(";");

			let tmpInfo = new Pb_God.PBItem();
			tmpInfo.itemid = parseInt(tmpStrAry[0]);
			tmpInfo.itemcount = parseInt(tmpStrAry[1]);

			tmpInfo.skillinfo = [];
			tmpSkillAry.forEach(elment =>
			{
				if (elment.length > 0)
				{
					let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfo(parseInt(elment));
					if (tmpSkillInfo != null)
					{
						let tmpSkItem = new Pb_God.PBSkillInfo();
						tmpSkItem.skillid = tmpSkillInfo.skillID;
						tmpSkItem.skilllevel = tmpSkillInfo.skillLevel;
						tmpInfo.skillinfo.push(tmpSkItem);
					}
				}
			});

			tmpInfo.randattr = [];
			tmpAttrAry.forEach(elment =>
			{
				if (elment.length > 0)
				{
					let tmpStrAry = elment.split("|");
					let tmpAttInfo = new Pb_God.PBAttrBaseInfo();
					tmpAttInfo.type = parseInt(tmpStrAry[0]);
					tmpAttInfo.value = Global.initLongFromValue(parseInt(tmpStrAry[1]));
					tmpAttInfo.rate = parseInt(tmpStrAry[2]);
					tmpInfo.randattr.push(tmpAttInfo);
				}
			});

			return tmpInfo;
		}

		//--------------------------------------------功能操作------------------------------------------------
		// /** 穿装备 */
		// public equipItem(bagType: Pb_God._emBagType,type:Pb_God._emItemType,subType:Pb_God._emEquipType,petSnid:Long):boolean{

		// 	//找到装备管理器
		// 	let tmpSuitMgr = SuitEquipDataMgr.getSuitMgr(petSnid);
		// 	if(tmpSuitMgr == null){
		// 		return false;
		// 	}

		// 	//穿武器
		// 	if(type == Pb_God._emItemType.ItemType_Equip){
		// 		let tmpEquip = tmpSuitMgr.getEquip(subType);
		// 		if(tmpEquip != null){
		// 			return false;
		// 		}
		// 		//选择最优装备
		// 		let results = this.getBagPerfectEquip(bagType,type,subType);
		// 		if(results.length == 0){
		// 			return false;
		// 		}
		// 		PetSend.equip_Ask(petSnid,subType,results[0].itemid);

		// 		return true;
		// 	}//穿符文
		// 	else if(type == Pb_God._emItemType.ItemType_Rune){
		// 		let tmpEquip = tmpSuitMgr.getRune(subType);
		// 		if(tmpEquip != null){
		// 			return false;
		// 		}
		// 		//选择最优装备
		// 		let results = this.getBagPerfectEquip(bagType,type);
		// 		if(results.length == 0){
		// 			return false;
		// 		}
		// 		PetSend.runeEquip_Ask(petSnid,subType,results[0].itemsn);

		// 		return true;
		// 	}

		// 	return false;
		// }

		// /** 给脱装备 */
		// public unEquipItem(	bagType: Pb_God._emBagType,type:Pb_God._emItemType,subType:Pb_God._emEquipType,petSnid:Long):boolean{
		// 	//找到装备
		// 	let tmpSuitMgr = SuitEquipDataMgr.getSuitMgr(petSnid);
		// 	if(tmpSuitMgr == null){
		// 		return false;
		// 	}

		// 	//穿武器
		// 	if(type == Pb_God._emItemType.ItemType_Equip){
		// 		let tmpEquip = tmpSuitMgr.getEquip(subType);
		// 		if(tmpEquip == null){
		// 			return false;
		// 		}
		// 	}//穿符文
		// 	else if(type == Pb_God._emItemType.ItemType_Rune){
		// 		let tmpEquip = tmpSuitMgr.getRune(subType);
		// 		if(tmpEquip == null){
		// 			return false;
		// 		}
		// 	}
		// 	else{
		// 		return false;
		// 	}

		// 	//获取使用中的装备信息
		// 	if (type == Pb_God._emItemType.ItemType_Equip) {
		// 		PetSend.equip_Ask(petSnid, subType, 0);
		// 	}
		// 	else if (type == Pb_God._emItemType.ItemType_Rune) {
		// 		PetSend.runeEquip_Ask(petSnid, subType, null);
		// 	}

		// 	return true;
		// }


		///////////////////// 红点 //////////////////////////
		/** 背包红点：目前只有碎片合成需要处理红点，故此处只使用一层即可，如果后续需要多个类型的红点数据，再转成子级分类 */
		public reddotModel: RedDotModel = new RedDotModel();

		/** 铁匠铺星石锻造红点 */
		public reddotModelRuneCombine: RedDotModel = new RedDotModel();
		/** 铁匠铺装备合成红点 */
		public reddotModelEquipCombine: RedDotModel = new RedDotModel();

		private initRedDotModel(): void
		{
			this.reddotModel.cleanUp(true);
			this.reddotModel.setupCheckMethod(this, this.getPetSpinCanCombin);
			this.reddotModel.addGlobalEventRefresh(EventNotify.PetPieceNumChange); //碎片背包道具有变化时，才会驱动更新

			this.reddotModelRuneCombine.cleanUp(true);
			this.reddotModelRuneCombine.setSystemSwitchId(emSystemSwitchType.EquipCombin);
			this.reddotModelRuneCombine.setupCheckMethod(this, this.checkItemRuneReddot);
			this.reddotModelRuneCombine.setPlayerItemsListener([CfgID.ItemID.RonglianRuneScore]);

			this.reddotModelEquipCombine.cleanUp(true);
			this.reddotModelEquipCombine.setSystemSwitchId(emSystemSwitchType.EquipCombin);
			this.reddotModelEquipCombine.setupCheckMethod(this, this.checkEquipCombinReddot);
			this.reddotModelEquipCombine.addGlobalEventRefresh(EventNotify.BagEquipNumChange);
			this.reddotModelEquipCombine.setPlayerItemsListener([CfgID.ItemID.Gold]);

		}
		/** 获取背包中是否有碎片可以合成 */
		private getPetSpinCanCombin(): number
		{
			let results = this.getBagAryWithBagType(Pb_God._emBagType.BagType_PetPiece);
			for (let i = 0; i < results.length; i++)
			{
				let tmpInfo = results[i];
				let tmpItemStar = cfg.ItemCfgData.getLevelById(tmpInfo.itemid);
				let tmpNeedCount = cfg.ItemPetcountCompoundCfgData.getNeedItemCountByPetStar(tmpItemStar);
				if (tmpInfo.itemcount >= tmpNeedCount)
				{
					return 1;
				}
			}
			return 0;
		}

		/**
		 * 熔炼星石锻造红点
		 */
		private checkItemRuneReddot(): number
		{
			//积分
			let tmpMaxNum = this.getRuneExchangeScore();
			let tmpCurNum = Global.getItemNum(CfgID.ItemID.RonglianRuneScore);
			if (tmpCurNum >= tmpMaxNum) return 1;
			return 0;
		}
		/**
		 * 熔炼装备合成红点
		 */
		private checkEquipCombinReddot(): number
		{
			let cfgList = cfg.ItemCfgData.getArrWithType(Pb_God._emItemType.ItemType_Equip);
			for (let cfgInfo of cfgList)
			{
				let compoundID = cfgInfo.compoundID;
				if (compoundID == 0) continue;

				let needItem = cfg.ItemCompoundCfgData.getNeedItemAryById(compoundID);
				let needExpend = cfg.ItemCompoundCfgData.getNeedItemExpendAryById(compoundID);
				if (Global.isFullAllRes([needItem, needExpend], false)) return 1;
			}
			return 0;
		}
	}
}
