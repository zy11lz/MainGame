
module Pro
{
	/**
	 * 英雄阵型查看
	 */
	export class HeroZhenxingMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroZhenXing.MainUI;


		/** 当前的阵型ID */
		TmpZhenxingID: Array<number>;

		/** 阵型配置数据 */
		//TmpCfgList: Array<cfg.BattleFormationOldCfgInfo>;

		/** 所有伙伴类型类型列表 */
		private _attrTypeList: number[];

		private _colorList = ["#5d565d", "#4c7399", "#f13c55", "#558b6b", "#e69900", "#734c80"];

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("battlecamp")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroZhenXing.MainUI, 0, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{

		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{

			//当前阵型id
			this.TmpZhenxingID = this.UIOpenData.customObject;

			//种族克制属性提升
			let tmpDamageRate = cfg.BattleTypeRestrainCfgData.getFirstInfo().damageRate / 100;
			let tmpHitRate = cfg.BattleTypeRestrainCfgData.getFirstInfo().hitRate / 100;
			this.UIPanel.KezhiLb.text = Global.getLangStr("hero_msg26", tmpDamageRate, tmpHitRate);

			//阵型显示
			this.UIPanel.ItemList.onRefresh(6, this, this.onItemListRender);
			this.initTotalAttrText();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/**
		 * 计算累计加成效果
		 */
		private initTotalAttrText(): void
		{
			let result = Global.getLangStr("HeroZhenXing_msg3"); //总加成效果
			if (this.TmpZhenxingID.length == 0)
			{	//无加成
				result += Global.getLangStr("common_none");
				this.UIPanel.txt_totaAttr.showText = result;
				return;
			}

			let tmpAtterDic = new Laya.Dictionary();
			this.TmpZhenxingID.forEach(tmpID =>
			{
				let tmpAttrAry = cfg.BattleFormationAttrCfgData.getAddAttrAryWithId(tmpID);
				tmpAttrAry.forEach(tmpAttr =>
				{
					let tmpValue = tmpAtterDic.get(tmpAttr.type);
					if (tmpValue == null) { tmpValue = 0; }
					tmpValue += tmpAttr.value;
					tmpAtterDic.set(tmpAttr.type, tmpValue);
				});
			});

			tmpAtterDic.keys.forEach(tmpType =>
			{
				let desc = "  " + cfg.BattleCfgData.getDescByAttrType(tmpType);
				desc += "<font color='#60c456'>+" + tmpAtterDic.get(tmpType) / 100 + "%</font>";
				desc += "  ";
				result += desc;
			});
			this.UIPanel.txt_totaAttr.showText = result;
		}

		/** 刷新Item */
		onItemListRender(itemUI: ProUI.Hero.HeroZhenXing.ListItemUI, index: number)
		{

			let tmpPetType = index + 1;
			if (tmpPetType == 6) { tmpPetType = 0; }

			let tmpList = cfg.BattleFormationAttrCfgData.getInfosByPetType(tmpPetType);

			itemUI.ActiveImg.visible = false;
			itemUI.txt_title.text = tmpList[0].typeName;
			itemUI.txt_title.color = this._colorList[tmpPetType];
			if (tmpPetType == 0)
			{
				itemUI.IconImg.skin = "res/common/common_zhengxin_1.png";
			}
			else
			{
				Global.setResPetType(itemUI.IconImg, tmpPetType);
			}

			// 刷新子列表
			itemUI.ItemBox.onRefresh(tmpList.length, this, (box: Laya.Box, tmpIndex: number) =>
			{
				let tmpCfgData = tmpList[tmpIndex];
				let tmpIsActive = this.TmpZhenxingID.indexOf(tmpCfgData.iD) >= 0;
				let label = [box.getChildAt(0) as component.UILabel,
				box.getChildAt(1) as component.UILabel,
				box.getChildAt(2) as component.UILabel,
				box.getChildAt(3) as component.UILabel];
				for (let i = 0; i < label.length; i++)
				{
					label[i].color = tmpIsActive ? "#60c456" : "#5d565d";
				}
				this.getAttrDesc(tmpCfgData, label);
				if (tmpIsActive) { itemUI.ActiveImg.visible = true; }
			});
		}

		/**
		 * 获取描述标题
		 * @param pet_type 
		 */
		private getAttrDesc(cfg_data: cfg.BattleFormationAttrCfgInfo, label: component.UILabel[]): void
		{
			let result = "";
			if (cfg_data.petType == 0)
			{
				label[0].text = Global.getLangStr("HeroZhenXing_msg1", cfg_data.typeCount); //上阵{0}个不同种族的英雄
			} else
			{
				label[0].text = Global.getLangStr("HeroZhenXing_msg2", cfg_data.typeCount, Global.getLangStr("hero_type_" + cfg_data.petType)); //上阵{0}个{1}系英雄
			}
			let num = 1;
			let tmpAttrAry = cfg.BattleFormationAttrCfgData.getAddAttrAryWithId(cfg_data.iD);
			tmpAttrAry.forEach(element =>
			{
				let desc = "" + cfg.BattleCfgData.getDescByAttrType(element.type);
				desc += "+" + element.value / 100 + "%";
				label[num].text = desc;
				if (num == 3)
				{
					label[num].x = 0;
					label[num].y = 25;
				}

				num++;
			});
		}


		//-----------------------------------新手引导------------------------------------

        /**
         * 进入本步引导
         */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.SecondFight_8_6)
			{ //引导列表第1个  深蓝之力
				Laya.timer.once(200, this, () =>
				{
					let tmpItemUI = this.UIPanel.ItemList.getCell(0) as Laya.Box;
					GuideMgr.Inst.showPopFrame(tmpItemUI);
				});
			}
			// else if (step == GuideStep.SecondFight_8_9)
			// {
			// 	GuideMgr.Inst.showPopFrame(this.UIPanel.topBox);
			// } 
			// else if (step == GuideStep.SecondFight_8_10)
			// { //点击空白处关闭
			// 	GuideMgr.Inst.showFinger(this.UIPanel.TipsImg, true, this.getDarkUI());
			// }
		}

	}
}