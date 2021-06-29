
module Pro
{
	/**
	 * 携带物
	 */
	export class HeroHorcruxMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		public UIPanel: ProUI.Hero.HeroDetail.Horcrux.HorcruxViewUI;

		public _HorcruxInfo: cfg.HorcruxCfgInfo;
		public _HorcruxPropInfo: cfg.HorcruxPropCfgInfo;

		private _sk:SkeletonPlayer = null;

		/** 需要自动加载的资源列表*/
		public autoLoadAtlas(): Array<any>
		{
			return null;
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroDetail.Horcrux.HorcruxViewUI, 0, BaseAddLayer.CenterUI, true);
		}

		public closeUI(): void
		{	
			super.closeUI();
			if(this._sk){
				this._sk.offAll();
				this._sk.removeSelf();
				this._sk = null;
            }
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			this.UIPanel.helpBtn.onClick(this,(btn)=>{
				 CommonHelpView.show(btn, Global.getLangStr("horcrux_help_des"));
			});
			this.UIPanel.awakeBtn.onClick(this, this.clickAwake);
			this.UIPanel.upBtn.onClick(this, this.clickUp);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
  			this.addEventMgr(EventNotify.Horcrux_Changed, this, this.onHorcrux_Awake);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{
			
		}

		public initUI(): void
		{
			let heroInfo: Net.hero = this.UIOpenData.customObject;
			if(!heroInfo) return
			this._HorcruxInfo = cfg.HorcruxCfgData.getHorcruxInfoByPetId(heroInfo.id);
			this._HorcruxPropInfo = cfg.HorcruxPropCfgData.getHorcruxInfoByIdAndLv(this._HorcruxInfo.iD,heroInfo.horcrux.level == 0 ? 1 : heroInfo.horcrux.level);
            let horcruxState =  PetDataMgr.getHasHorcruxState(heroInfo)
			
			// 魂器状态----------- 0:敬请期待  1:有锁（图标置灰） 2:有锁（图标正常）  3:正常显示                 
            this.UIPanel.Horcrux.IconImg.visible = horcruxState != 0;
            this.UIPanel.Horcrux.lock.visible = horcruxState == 1 || horcruxState == 2;
			this.UIPanel.HorcruxAwakeInfo.visible = this.UIPanel.Horcrux.lock.visible
			this.UIPanel.upBtn.visible = !this.UIPanel.HorcruxAwakeInfo.visible;
            this.UIPanel.Horcrux.hope.visible = horcruxState == 0;
            this.UIPanel.Horcrux.IconImg.gray =  horcruxState == 1;
            this.UIPanel.Horcrux.LvImg.visible = horcruxState == 3;
            this.UIPanel.Horcrux.IconImg.skin = this._HorcruxInfo ? UrlMgr.getHorcruxUrl(this._HorcruxInfo.icon) : "";
			
			this.UIPanel.HorcruxName.text = this._HorcruxInfo.name;
			this.UIPanel.HorcruxDesc.text = `${cfg.PetSkinCfgData.getFileNameById(heroInfo.useskinid)}专属`;
			this.UIPanel.HorcruxScore.text = this._HorcruxPropInfo.score + "";
			this.UIPanel.Horcrux.LvLb.text = heroInfo.horcrux.level + "";

			// 基础属性(策划这里只会配置3个属性)
			let propList = this._HorcruxPropInfo.propNum.split(";")
			for (let i = 0; i < propList.length; i++) {
				let propNum = propList[i];
				let index = propNum.split("|")[0]
				this.UIPanel['PropIcon' + i].frame = index
				this.UIPanel['PropLb' + i].text = cfg.BattleCfgData.getDescByAttrType(parseInt(index)) + ": " + propNum.split("|")[1];
				if(i == propList.length - 1)
				{
					let bfb = parseInt(propNum.split("|")[1]) > 2 ? "" : "%"
					this.UIPanel['PropLb' + 2].text = cfg.BattleCfgData.getDescByAttrType(parseInt(index)) + ":	" + propNum.split("|")[1]  + bfb
				}
			}

			let constInfo = cfg.HorcruxConstCfgData.getFirstInfo();
			let deslevel = constInfo.desLevel.split("_");
			// this.UIPanel.HorcruxSkillDesc.scrollBar.mouseWheelEnable = true;
			// this.UIPanel.HorcruxSkillDesc.setDragStatue(false);
			// 刷新技能效果

 			this.UIPanel.HorcruxSkillDesc.setContentSize(this.UIPanel.HorcruxSkillDesc.width, this.UIPanel.HorcruxSkillDesc.height);
            this.UIPanel.HorcruxSkillDesc.removeAllItems();
            for (let index = 0; index < 4; index++)
            {
				let tmpUI = Public.PoolMgr.getItem('HorcruxSkillCell') as ProUI.Hero.HeroDetail.Horcrux.HorcruxSkillCellUI;
				if (tmpUI == null)
				{
					tmpUI = new ProUI.Hero.HeroDetail.Horcrux.HorcruxSkillCellUI;
					tmpUI.name = 'HorcruxSkillCell';
				}
				let lockColor = "#5b545b"
				if(parseInt(deslevel[index]) <= heroInfo.horcrux.level)
				{
					lockColor = "#f13c55"
				}
				tmpUI.skillDesc.innerHTML = "<font color='" + lockColor +"'>" + Global.getLangStr("ui_HeroHorcux_msg1",parseInt(deslevel[index])) + this._HorcruxInfo[`effectDesc${index + 1}`] + "</font>";
				tmpUI.x = 0
				tmpUI.y = 0
				tmpUI.height = tmpUI.skillDesc.contextHeight + 10;
				this.UIPanel.HorcruxSkillDesc.addItem(tmpUI);
			}
		
			if(!heroInfo.horcrux ||  heroInfo.horcrux.level < 1)
			{
				// 按钮显示状态
				let itemInfo: cfg.AddItemInfo = cfg.AddItemInfo.parse(this._HorcruxPropInfo.materials)[0];
				this.UIPanel.needItem.setItemInfo(itemInfo,false,false)
				this.UIPanel.proLb.text =  Global.getItemNum(itemInfo.itemid) + "/" +itemInfo.itemcount 
			}

			this.UIPanel.backdesc.innerHTML = "<font color='#5b545b'>" + this._HorcruxInfo.backGround + "</font>";
			this.UIPanel.backdesc.visible = !((!heroInfo.horcrux ||  heroInfo.horcrux.level < 1) && heroInfo.star >= constInfo.awakeStar)
			this.UIPanel.backdesc1.text = Global.getLangStr("ui_HeroHorcux_msg2",constInfo.awakeStar);

			this.UIPanel.backdesc1.visible = heroInfo.star < constInfo.awakeStar
			this.UIPanel.HorcruxAwakeInfo.visible = !this.UIPanel.backdesc.visible;
			this.UIPanel.HorcruxUpInfo.visible = heroInfo.horcrux.level > 0

			this.UIPanel.Horcrux.lock.visible = heroInfo.star < constInfo.awakeStar;
			this.UIPanel.Horcrux.lock.skin = "res/herodetail/suo.png";
			if(!this.UIPanel.Horcrux.lock.visible)
			{
				this._sk = new SkeletonPlayer();
				Laya.Tween.to(this._sk, { alpha: 1 }, 400);
				this._sk.pos(this.UIPanel.Horcrux.width / 2, this.UIPanel.Horcrux.height / 2);
				let skinSuo = "texiao/xiedaiwusuo/xiedaiwusuo";
				this._sk.load(UrlMgr.getSpineSceneUrl(skinSuo));
				this.UIPanel.Horcrux.addChild(this._sk);
				this._sk.play(heroInfo.horcrux && heroInfo.horcrux.level > 0 ? "idle2" : "idle",true)
			}
			// 最大等级
			let maxLevels = cfg.HorcruxConstCfgData.getFirstInfo().desLevel.split("_");
			this.UIPanel.upBtn.visible = heroInfo.horcrux.level < parseInt(maxLevels[maxLevels.length - 1])
		}

		public refreshUI()
		{

		}


		private clickAwake(): void
		{
			let heroInfo: Net.hero = this.UIOpenData.customObject;
			let constInfo = cfg.HorcruxConstCfgData.getFirstInfo();
			let deslevel = constInfo.desLevel.split("_");
			if(heroInfo.star < constInfo.awakeStar)
			{
				TipsUtils.showTipsByLanId("ui_HeroHorcux_msg2",constInfo.awakeStar);
				return;
			}
			
			let itemInfo: cfg.AddItemInfo = cfg.AddItemInfo.parse(this._HorcruxPropInfo.materials)[0];
			if (Global.isFullRes(itemInfo.itemid,itemInfo.itemcount,true))
			{
				let heroInfo: Net.hero = this.UIOpenData.customObject;
				PetSend.horcrux_Awake(heroInfo.sn);
			}
		}

		private clickUp():void
		{
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroHorcruxUpMediator, this._HorcruxPropInfo,this.UIOpenData.customObject));
			this.closeUI();
		}


		/** 魂器觉醒 */
		protected onHorcrux_Awake(value: Pb_God.PBG2CHorcruxAwake): void
		{
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroHorcruxSucceMediator,value.horcrux.id));
			this.closeUI();
		}
	}
}