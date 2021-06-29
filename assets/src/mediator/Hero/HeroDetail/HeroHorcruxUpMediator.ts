
module Pro
{
	/**
	 * 携带物
	 */
	export class HeroHorcruxUpMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		public UIPanel: ProUI.Hero.HeroDetail.Horcrux.HorcruxUpUI;
		/** 对应英雄 */
		private _hreoInfo: Net.hero;
		/** 携带物详情 */
		private _horcruxPropInfo: cfg.HorcruxPropCfgInfo;

		private _sk1:SkeletonPlayer = null;

		private _sk2:SkeletonPlayer = null;

		/** 需要自动加载的资源列表*/
		public autoLoadAtlas(): Array<any>
		{
			return null;
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroDetail.Horcrux.HorcruxUpUI, 0, BaseAddLayer.CenterUI, true);
		}

		public closeUI(): void
		{
			super.closeUI();
			if(this._sk1 || this._sk2)
			{
				this._sk1.offAll();
				this._sk1.removeSelf();
				this._sk1 = null;

				this._sk2.offAll();
				this._sk2.removeSelf();
				this._sk2 = null;
			}
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
			this.addEventMgr(EventNotify.Horcrux_Changed, this, this.onHorcrux_LevelUp);
			this.UIPanel.closeBtn.onClick(this,this.closeUI);
			this.UIPanel.upBtn.onClick(this,this.clickUp)
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{

		}

		// 强化
		private clickUp(): void
		{
			let horcruxPropInfoNext: cfg.HorcruxPropCfgInfo = cfg.HorcruxPropCfgData.getHorcruxInfoByIdAndLv(this._horcruxPropInfo.iD,this._horcruxPropInfo.level + 1);
			let itemInfo: cfg.AddItemInfo = cfg.AddItemInfo.parse(horcruxPropInfoNext.materials)[0];
			// 材料消耗
			if(this._horcruxPropInfo.level >= 30)
			{
				let continueStar = cfg.HorcruxConstCfgData.getFirstInfo().continueStar.split("_");
				if(this._hreoInfo.star < parseInt(continueStar[1]))
				{
					  TipsUtils.showTipsByLanId("ui_HeroHorcux_msg3",continueStar[0],continueStar[1]);
					  return;
				}
				let petself = horcruxPropInfoNext.petSelf.split("_");
				let tempPetList = this.getUnSelectPetStarList(parseInt(petself[0]) ,parseInt(petself[1]));
				if(tempPetList.length < parseInt(horcruxPropInfoNext.petSelf.split("_")[2]))
				{
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemAccess, [CfgID.ItemID.PetSpitStar4, false]));
					return;
				}
				PetSend.horcrux_LevelUp(this._hreoInfo.sn)
			}
			else
			{
				if (Global.isFullRes(itemInfo.itemid,itemInfo.itemcount,true))
				{
					PetSend.horcrux_LevelUp(this._hreoInfo.sn)
				}
			}

		}

		public initUI(): void
		{
			this._horcruxPropInfo = this.UIOpenData.customObject;
			this._hreoInfo = this.UIOpenData.customObject2;
			this.refreshUI();
		}

		public refreshUI()
		{
			let horcruxInfo: cfg.HorcruxCfgInfo = cfg.HorcruxCfgData.getInfo(this._horcruxPropInfo.iD);
			// 魂器
            this.UIPanel.oldHorcrux.LvLb.text = this._horcruxPropInfo.level + "";
            this.UIPanel.oldHorcrux.IconImg.skin = horcruxInfo ? UrlMgr.getHorcruxUrl(horcruxInfo.icon) : "";
	        this.UIPanel.newHorcrux.LvLb.text = this._horcruxPropInfo.level + 1 + "";
            this.UIPanel.newHorcrux.IconImg.skin = horcruxInfo ? UrlMgr.getHorcruxUrl(horcruxInfo.icon) : "";

			// 基础属性(策划这里只会配置3个属性)
			let horcruxPropInfoNext: cfg.HorcruxPropCfgInfo = cfg.HorcruxPropCfgData.getHorcruxInfoByIdAndLv(horcruxInfo.iD,this._horcruxPropInfo.level + 1);
			let propList = this._horcruxPropInfo.propNum.split(";")
			let propListNext = horcruxPropInfoNext.propNum.split(";")

			for (let i = 0; i < propList.length; i++) {
				let propNum = propList[i];
				let propNumNext = propListNext[i];
				let index = propNum.split("|")[0]
				this.UIPanel['PropIcon' + i].frame = propNum.split("|")[0]
				this.UIPanel['PropName' + i].text = cfg.BattleCfgData.getDescByAttrType(parseInt(index)) + ": " 
				this.UIPanel['PropNum' + i].text =  propNum.split("|")[1]; 
				this.UIPanel['PropNumNew' + i].text = propNumNext.split("|")[1];
				if(i == propList.length - 1)
				{
					let bfb = parseInt(propNum.split("|")[1]) > 2 ? "" : "%"
					this.UIPanel['PropNum' + i].text = propNum.split("|")[1] + bfb
					this.UIPanel['PropNumNew' + i].text = propNumNext.split("|")[1]  + bfb
				}
			}

			// 强化属性
			let desLevel = cfg.HorcruxConstCfgData.getFirstInfo().desLevel.split("_");
			for (let i = 0; i < desLevel.length; i++) {
				let lv = desLevel[i];
				let itemInfo: cfg.AddItemInfo = cfg.AddItemInfo.parse(this._horcruxPropInfo.materials)[0];
				this.UIPanel.skillLv.text = Global.getLangStr("ui_HeroHorcux_msg1",parseInt(lv))
				this.UIPanel.skillDesc.innerHTML =  "<font color='#5b545b'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + horcruxInfo[`effectDesc${i + 1}`] + "</font>";
				if(this._horcruxPropInfo.level < parseInt(lv))break;
			}
			
			// 材料消耗
			if(this._horcruxPropInfo.level >= 30)
			{
				// 本体消耗
				let petself = horcruxPropInfoNext.petSelf.split("_");
				let tempPetList = this.getUnSelectPetStarList(parseInt(petself[0]) ,parseInt(petself[1]));
				let petInfo = horcruxPropInfoNext.petSelf.split("_");
				let skinID = cfg.PetCfgData.getSkinInfoByPetID(parseInt(petInfo[0]));
				this.UIPanel.needItem.setNeedStarCountPetCfgInfo(skinID.id,parseInt(petInfo[1]) ,parseInt(petInfo[2]),2,false,false);
				this.UIPanel.needItemCount.text =   tempPetList.length + "/" + petInfo[2];
			}
			else
			{
				// 道具消耗
				let itemInfo: cfg.AddItemInfo = cfg.AddItemInfo.parse(horcruxPropInfoNext.materials)[0];
				this.UIPanel.needItem.setItemInfo(itemInfo,false,false)
				this.UIPanel.needItemCount.text =  Global.getItemNum(itemInfo.itemid) + "/" + itemInfo.itemcount;
			}

			if(!this._sk1 || !this._sk2)
			{
				let skinSuo = "texiao/xiedaiwusuo1/xiedaiwusuo1";
				this._sk1 = new SkeletonPlayer();
				Laya.Tween.to(this._sk1, { alpha: 1 }, 400);
				this._sk1.pos(this.UIPanel.oldHorcrux.width / 2, this.UIPanel.oldHorcrux.height / 2);
				this._sk1.load(UrlMgr.getSpineSceneUrl(skinSuo));
				this.UIPanel.oldHorcrux.addChild(this._sk1);

				this._sk2 = new SkeletonPlayer();
				Laya.Tween.to(this._sk2, { alpha: 1 }, 400);
				this._sk2.pos(this.UIPanel.newHorcrux.width / 2, this.UIPanel.newHorcrux.height / 2);
				this._sk2.load(UrlMgr.getSpineSceneUrl(skinSuo));
				this.UIPanel.newHorcrux.addChild(this._sk2);
			}
		}

		/** 获取未被选择的指定英雄星级列表 */
		private getUnSelectPetStarList(petId: number, star: number): Array<Net.hero>
		{
			let tempPetList = PetDataMgr.getPetList();
			tempPetList = tempPetList.filter(elment => elment.id == petId  &&
					elment.star == star && ( !(elment.islock || elment.onStore)));
			return tempPetList;
		}

		/*****
		 *魂器强化  PBG2CHorcruxLevelUp
		 * @param PBG2CHorcruxLevelUp
		 * 		sn			uint64	伙伴sn
		 * 		horcrux			PBPetHorcrux	魂器
		 */
		protected onHorcrux_LevelUp(value: Pb_God.PBG2CHorcruxLevelUp): void
		{
			let maxLevels = cfg.HorcruxConstCfgData.getFirstInfo().desLevel.split("_");
			if(value.horcrux.level >= parseInt(maxLevels[maxLevels.length - 1]))
			{
				// 到达最大等级 
				this.closeUI();
			}
			else
			{
				this._horcruxPropInfo = cfg.HorcruxPropCfgData.getHorcruxInfoByIdAndLv(value.horcrux.id,value.horcrux.level);
				this.refreshUI();
			}
		}
	}
}