
module Pro
{
	/**
	 * 技能描述查看
	 */
	export class SkillReviewMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		public UIPanel: ProUI.SkillReview.MainUI;

		/** UI打开参数 */
		public UIOpenData: SkillReviewOpenUIData;

		/** SkillDesItem */
		private itemShowArr:Array<SkillDesItemView>=[];
		private itemPoolArr:Array<SkillDesItemView>=[];

		/** 需要自动加载的资源列表*/
		public autoLoadAtlas(): Array<any>
		{
			return null;
		}

		public openUI(): void
		{
			this.showPanel(ProUI.SkillReview.MainUI, 0, BaseAddLayer.TopUI, true);
		}

		public closeUI(): void
		{
			this.clearSkillItems();
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			
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
			//控制节点显示
			this.UIPanel.BaseBox.visible = true;

			//技能ID+等级
			let tmpSkillID = cfg.SkillNewSkillCfgData.getSkillIDBySkillIndex(this.UIOpenData.skillIndex);
			let tmpSkillLv = cfg.SkillNewSkillCfgData.getSkillLevelBySkillIndex(this.UIOpenData.skillIndex);
			let tmpSkillType = cfg.SkillNewSkillCfgData.getSkillTypeBySkillIndex(this.UIOpenData.skillIndex);

			//显示物品图标状态
			Global.setResIconWithItemID(this.UIPanel.imgSkillIcon, CfgID.ResType.Skill, this.UIOpenData.skillIndex);

			//名称和描述
			this.UIPanel.NameLb.text = cfg.SkillNewSkillCfgData.getNameBySkillIndex(this.UIOpenData.skillIndex) + " Lv." + tmpSkillLv;
			this.UIPanel.TypeNameLb.text = Global.getLangStr("ui_ItemReview_msg1") +
				(tmpSkillType == Pb_God._emSkillType.SkillType_Passive ? Global.getLangStr("skill_passive") : Global.getLangStr("skill_initiative"));

			if (!GlobalData.isRelease)
			{
				this.UIPanel.TypeNameLb.text += " _" + this.UIOpenData.skillIndex
			}
			
			this.UIPanel.imgBg.visible = true;

			//技能冷却描述
			let tmpCoolingInfo = cfg.SkillNewSkillCfgData.getCoolRoundInfoByIndex(this.UIOpenData.skillIndex);
			let tmpStartRound = tmpCoolingInfo.length > 0 ? tmpCoolingInfo[0] : 0;
			let tmpCoolingRound = tmpCoolingInfo.length > 1 ? tmpCoolingInfo[1] : 0;

			if (tmpStartRound == -1)
			{
				this.UIPanel.FreezeLb.showText = Global.getLangStr("skill_msg4", tmpCoolingRound); //冷却<font color='#00ff00'>"++"</font>回合,死亡时释放";
			}
			else if (tmpCoolingRound > 0 && (tmpStartRound == 0 || tmpSkillType == Pb_God._emSkillType.SkillType_Passive))
			{  //阿超说的，如果是被动技能，直接不显示释放回合数
				this.UIPanel.FreezeLb.showText = Global.getLangStr("skill_msg5", tmpCoolingRound); //冷却<font color='#00ff00'>"+tmpCoolingRound+"</font>回合";
			}
			else if (tmpCoolingRound > 0 && tmpStartRound > 0)
			{
				this.UIPanel.FreezeLb.showText = Global.getLangStr("skill_msg6", tmpCoolingRound, tmpStartRound); //冷却<font color='#00ff00'>"+tmpCoolingRound+"</font>回合,第<font color='#00ff00'>"+tmpStartRound+"</font>回合释放";
			}
			else
			{
				this.UIPanel.FreezeLb.showText = Global.getLangStr("skill_msg7"); //无冷却时间";
			}






			
			let skillInfos:Array<cfg.SkillNewSkillCfgInfo>=cfg.SkillNewSkillCfgData.getDataArrayByID(tmpSkillID);
			for(let i=0;i<skillInfos.length;i++){
				this.createSkillItem(skillInfos[i],this.UIOpenData,tmpSkillLv,i);
			}

			if(this.itemShowArr.length){
				let lastItem=this.itemShowArr[this.itemShowArr.length-1];
				this.UIPanel.height = this.UIPanel.imgBg.height=lastItem.y+lastItem.height+18;
			}

			// if(this.itemShowArr.length){
			// 	this.itemShowArr[this.itemShowArr.length-1].showLine(false);
			// }

		}

		public refreshUI()
		{

		}
		createSkillItem(data:cfg.SkillNewSkillCfgInfo,UIOpenData:SkillReviewOpenUIData,tmpSkillLv:number,index:number){
			let item:SkillDesItemView;
			if(this.itemPoolArr.length){
				item=this.itemPoolArr.pop();
			}else{
				item=new SkillDesItemView();
			}
			this.UIPanel.addChild(item);
			item.setData(data,UIOpenData,tmpSkillLv,index);
			if(this.itemShowArr.length){
				let lastItem=this.itemShowArr[this.itemShowArr.length-1];
				item.y=lastItem.y+lastItem.height;
			}else{
				item.y=158;

			}
			this.itemShowArr.push(item);
		}
		clearSkillItems(){
			while(this.itemShowArr.length){
				let item=this.itemShowArr.pop();
				item.removeSelf();
				this.itemPoolArr.push(item);
			}

		}









	}
}