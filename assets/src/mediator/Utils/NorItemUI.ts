
module Pro
{
	/**
	 * NorItemTrulyUI的壳
	 */
	export class NorItemUI extends component.UIButton
	{

		private itemUI: NorItemTrulyUI;
		private itemLight: EffNode;
		public static initItemTime: number = 0;

		public get BGImg(): Laya.Image
		{
			return this.itemUI.BGImg;
		}

		public get DieImg(): Laya.Image
		{
			return this.itemUI.DieImg;
		}

		public get BloodBgImg(): Laya.Image
		{
			return this.itemUI.BloodBgImg;
		}

		public get BloodImg(): Laya.Image
		{
			return this.itemUI.BloodImg;
		}

		public get BloodLb(): component.UILabel
		{
			return this.itemUI.BloodLb;
		}

		public get RedDotImg(): Laya.Image
		{
			return this.itemUI.RedDotImg;
		}

		public get StarBox()
		{
			return this.itemUI.StarBox;
		}

		public get PlusStatueImg(): Laya.Image
		{
			return this.itemUI.PlusStatueImg;
		}

		public get SelectStatueImg(): Laya.Image
		{
			return this.itemUI.SelectStatueImg;
		}

		public get LockImg(): Laya.Image
		{
			return this.itemUI.LockImg;
		}

		public setLockImgVisible(bol:boolean,hero:Net.hero=null){
			if(bol&&hero){
				if(hero.isFight){
					this.itemUI.img_state.skin="res/common/heroState"+Pb_God._emPetStateType.PetStateType_Fight+".png";
				}else if(hero.isDefend){
					this.itemUI.img_state.skin="res/common/heroState"+Pb_God._emPetStateType.PetStateType_Defend+".png";
				}else if(hero.islock){
					this.itemUI.img_state.skin="res/common/heroStateSuo.png"
				}else{
					bol=false;
				}
			}
			this.itemUI.img_state.visible=bol;
		}

		public get IconImg(): Laya.Image
		{
			return this.itemUI.IconImg;
		}

		public get SailingStatueImg(): Laya.Image
		{
			return this.itemUI.SailingStatueImg;
		}

		public get NameLb(): component.UILabel
		{
			return this.itemUI.NameLb;
		}

		public get LvLb(): component.UILabel
		{
			return this.itemUI.LvLb;
		}

		public get NumLb()
		{
			return this.itemUI.NumLb;
		}

		constructor()
		{
			super();

			this.canMove = false;

			this.width = 130;
			this.height = 130;

			//this.on(Laya.Event.DISPLAY,this,this.onDisplay);
			this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
		}

		public onDisplay()
		{
			if (this.itemUI != null)
			{
				return;
			}

			this.itemUI = Public.PoolMgr.getItem("NorItemTrulyUI");
			if (this.itemUI == null)
			{
				this.itemUI = new NorItemTrulyUI();
				NorItemUI.initItemTime++;
			}
			//有些界面的item可能有灰化处理，回收的时候又没有重置灰化状态 
			this.itemUI.IconImg.gray = false;
			this.itemUI.img_state.visible=false;
			this.itemUI.LockImg.visible=false;
			this.itemUI.BloodImg.scaleX = 1;

			//颜色重置  按编辑器里的来 如果有修改再改
			this.itemUI.NumLb.color = "#fffced";
			this.itemUI.LvLb.color = "#fffced";
			this.itemUI.NameLb.color = "#5d565d";
			this.itemUI.NameLb.fontSize = 22;
			this.itemUI.NameLb.bottom = -20;
			this.itemUI.NameLb.scale(1,1);


			this.itemUI.width = this.width;
			this.itemUI.height = this.height;
			this.itemUI.trulyBtn = this;
			this.itemUI.visible = true;
			this.addChildAt(this.itemUI, 0);

			this.itemUI.hideAllChildren();

			this.removeItemEffect();
		}

		// /**
		//  * 重写scaleY 
		//  * 重置文本scaleY
		//  */
		// public set scaleY(value)
		// {
		// 	super.scaleY = value;

		// 	value != 0 && this.itemUI && this.itemUI.NameLb && (this.itemUI.NameLb.scaleY = 1 / value);
		// }

		// /**
		//  * 重写scaleX
		//  * 重置文本scaleX
		//  */
		// public set scaleX(value: number)
		// {
		// 	super.scaleX = value;
		// 	value != 0 && this.itemUI && this.itemUI.NameLb && (this.itemUI.NameLb.scaleX = 1 / value);
		// }

		public onUnDisplay()
		{
			if (this.itemUI == null)
			{
				return;
			}

			Public.PoolMgr.recoverItem("NorItemTrulyUI", this.itemUI);
			this.itemUI.removeSelf();
			this.itemUI = null;

			this.removeItemEffect();
		}

		/** 设置血条显示 */
		public setBloodProgress(pro: number): void
		{
			this.BloodBgImg.visible = true;
			this.BloodImg.scaleX = 1;
			Global.setProgressBarMask(this.BloodImg, pro);
		}

		/**
		 * 添加道具特效
		 */
		public setItemEffect(quality: number)
		{
			if (this.itemLight != null)
			{
				this.removeItemEffect();
			}
			if (quality < 3)
				quality = 0;
			this.itemLight = EffectMgr.Inst.createEffectOne(`ui_itemLightNew_${ quality }`, new Laya.Point(this.width / 2 + 2, this.height / 2 - 4), -1, 2, 1, this, false, ResReleaseType.Reference, false);
		}

		/**
		 * 移除道具特效
		 */
		public removeItemEffect()
		{
			if (this.itemLight != null)
			{
				EffectMgr.Inst.releaseEffect(this.itemLight);
				// this.itemLight.removeSelf();
				this.itemLight = null;
			}
		}

		/**
		 * 设置按钮点击事件(listener:[this,bool],bool在按钮可拖拽时产生,true:准备拖拽)
		 * 下面两个参数控制需要弹出的小提示
		 * isDrag			 是否支持拖拽
		 */
		public onClick(caller: any, listener: Function, isDrag: boolean = false, dragTarget: Laya.Sprite = null)
		{
			this.onDisplay();
			super.onClick(caller, listener, isDrag, dragTarget);
		}

		/**
		 * 隐藏所有子节点
		 */
		public hideAllChildren()
		{
			this.onDisplay();
			this.itemUI.hideAllChildren();
		}

		/** 显示活动额外加成 */
		public showActivityTag(): void
		{
			this.itemUI.activityTag.visible = true;
		}

		/**
		 * 设置一个伙伴的基础UI状态
		 */
		public setPetUI(skinId: number, petStar: number, isSpin: boolean = false,evolve:number=0)
		{
			this.onDisplay();
			this.itemUI.setPetUI(skinId, petStar, isSpin,evolve);
		}

		/**
		 * 显示伙伴基础状态
		 * @param info 伙伴数据
		 * @param showRedDot 是否显示红点功能提示
		 * @param showOnStore 是否显示已上阵主线状态
		 */
		public setPetInfo(info: Net.hero | Pb_God.PBPetDisplay, showRedDot: boolean = false, showOnStore: boolean = false): void
		{
			if (!info) { return; } //解决报错： 英雄丢失时，不显示，但保留空位，便于发现英雄丢失的问题。
			this.onDisplay();
			this.itemUI.setPetInfo(info, showRedDot, showOnStore);
		}


		/**
		 * 显示伙伴基础状态，可点击查看详细信息
		 * @param info 伙伴数据
		 * @param isClickDetail 是否可点击查看伙伴详细信息
		 * @param playerDisplay 归属玩家， 如果空值，则查看玩家自己的
		 */
		public setPetInfoExtend(info: Net.hero | Pb_God.PBPetDisplay, isClickDetail: boolean, playerDisplay: Pb_God.PBPlayerDisplay = null): void
		{
			if (!info) { return; } //解决报错： 英雄丢失时，不显示，但保留空位，便于发现英雄丢失的问题。
			this.onDisplay();
			this.itemUI.setPetInfoExtend(info, isClickDetail, playerDisplay);
		}

		/**
		 * 显示伙伴基础配置状态
		 * @param info 伙伴配置数据
		 */
		public setPetSkinCfgInfo(info: cfg.PetSkinCfgInfo): void
		{
			this.onDisplay();
			this.itemUI.setPetSkinCfgIndo(info);

		}

		/**
		 * 显示伙伴图鉴状态
		 * @param info 伙伴配置数据
		 */
		public setPetBookCfgInfo(info: cfg.PetBookCfgInfo): void
		{
			this.onDisplay();
			this.itemUI.setPetBookCfgInfo(info);

		}
		/**
		 * 显示守护英雄
		 * @param info 守护技能配置
		 */
		public setDefendSkillCfgInfo(info:cfg.DefendSkillCfgInfo):void{
			this.onDisplay();
			this.itemUI.setDefendSkillCfgInfo(info);

		}

		/**
		 * 伙伴升星时显示的需要的指定伙伴
		 * @param heroInfo 准备升级的伙伴
		 * @param info 指定伙伴信息 （ID\星级\个数）
		 * @param selectNum 已经选择的个数
		 */
		public setNeedStarCountPetCfgInfo(skinId: number, petStar: number, petNum: number, selectNum: number, showName: boolean, showSelectNum: boolean = true): void
		{
			this.onDisplay();
			this.itemUI.setNeedStarCountPetCfgInfo(skinId, petStar, petNum, selectNum, showName,showSelectNum);
		}

		/**
		 * 伙伴升星时显示的需要的星级伙伴
		 * @param heroInfo 准备升级的伙伴
		 * @param info 指定伙伴信息 （星级\个数）
		 * @param selectNum 已经选择的个数
		 */
		public setNeedStarPetCfgInfo(petType: number, petStar: number, petNum: number, selectNum: number, showName: boolean): void
		{
			this.onDisplay();
			this.itemUI.setNeedStarPetCfgInfo(petType, petStar, petNum, selectNum, showName);
		}

		/**
		 * 显示一个基础道具
		 * @param info 道具信息
		 * @param showName 是否显示道具名称
		 * @param showNum 是否显示道具个数
		 * @param clickDes 点击是否显示道具描述
		 * @param showDesFun 弹出的道具描述中是否显示功能操作
		 */
		public setItemInfo(info: cfg.AddItemInfo, showName: boolean = false, showNum: boolean = true, clickDes: boolean = true, showDesFun: boolean = false, showRedDot: boolean = false, showLight: boolean = true): void
		{
			this.onDisplay();
			if (!info) { return; }
			this.itemUI.setItemInfo(info, showName, showNum, clickDes, showDesFun, showRedDot);
			let flash = cfg.ItemCfgData.getFlashById(info.itemid)
			if (showLight && flash >= 1)
			{
				this.setItemEffect(cfg.ItemCfgData.getQualityById(info.itemid));
			}
			else
			{
				this.removeItemEffect();
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
		public setItemID(itemId: number, itemNum: number, showName: boolean = false, showNum: boolean = true, clickDes: boolean = true, showDesFun: boolean = false, showRedDot: boolean = false, showLight: boolean = true): void
		{
			this.onDisplay();
			this.itemUI.setItemID(itemId, itemNum, showName, showNum, clickDes, showRedDot);
			let flash = cfg.ItemCfgData.getFlashById(itemId)
			if (showLight && flash >= 1)
			{
				this.setItemEffect(cfg.ItemCfgData.getQualityById(itemId));
			}
			else
			{
				this.removeItemEffect();
			}
		}

		/**
		 * 设置 new 图标
		 */
		public setNewIcon(isNew: boolean)
		{
			this.itemUI.iconNew.visible = isNew;
		}

		/**
		 * 显示一个带数字进度显示的基础道具 比如："(3/5)"
		 * <p> 该接口用于某些需要显示消耗道具的地方， 仅用于显示基础道具，英雄碎片本身带有进度条显示，请使用setItemID接口
		 * @param info
		 * @param showName
		 */
		public setNeedCountItem(itemId: number, itemNum: number, needNum: number, showName: boolean = false, clickDes: boolean = true): void
		{
			this.onDisplay();
			this.itemUI.setNeedCountItem(itemId, itemNum, needNum, showName, clickDes);
		}

		/**
		 * 显示一个技能道具
		 * @param info
		 * @param showName
		 */
		public setSkillInfo(skillIndex: number): void
		{
			this.onDisplay();
			this.itemUI.setSkillInfo(skillIndex);
		}

		/**
		 * 根据一个伙伴的id和星级显示状态
		 * @param info 一个伙伴id和星级
		 */
		public setPetStarInfo(info: Pb_God.PBPetStar): void
		{
			this.onDisplay();
			this.itemUI.setPetStarInfo(info);
		}


		/** 设置整个节点置灰 */
		public setBoxGray(gray: boolean): void
		{
			if (this.itemUI) { this.itemUI.gray = gray; }
		}

		/**
		 * 隐藏节点
		 */
		public setEmptyInfo(): void
		{
			this.onDisplay();
			this.removeItemEffect();
			this.itemUI.setEmptyInfo();
		}
	}
}