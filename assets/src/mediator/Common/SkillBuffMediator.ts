
module Pro
{
	/**
	 * 技能描述查看
	 */
	export class SkillBuffMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		public UIPanel: ProUI.SkillReview.SkillBuffMainViewUI;

		/** UI打开参数 */
		public _data: cfg.SkillNewSkillCfgInfo;

		/** SkillDesItem */
		private itemShowArr:Array<SkillBuffItemView>=[];
		private itemPoolArr:Array<SkillBuffItemView>=[];

		

		/** 需要自动加载的资源列表*/
		public autoLoadAtlas(): Array<any>
		{
			return null;
		}

		public openUI(): void
		{
			this.showPanel(ProUI.SkillReview.SkillBuffMainViewUI, 0, BaseAddLayer.TopUI, true,1);
		}

		public closeUI(): void
		{
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
			this._data=this.UIOpenData.customObject;

			//let buffArr=this._data.addTarBuff.split(";");
			let buffArr=cfg.SkillNewSkillCfgData.getAddTarBuffIndex(this._data.skillIndex).split(";");
			this.clearBuffItems();
			for(let i=0;i<buffArr.length;i++){
				if(buffArr[i])
					this.createBuffItem(buffArr[i].split("_")[0]);
			}

			if(this.itemShowArr.length){
				let lastItem=this.itemShowArr[this.itemShowArr.length-1];
				this.UIPanel.height = this.UIPanel.imgBg.height=lastItem.y+lastItem.height+8;
			}

			if(this.itemShowArr.length){
				this.itemShowArr[this.itemShowArr.length-1].showLine(false);
			}

			
		}

		public refreshUI()
		{

		}

		createBuffItem(buffId:string){
			let item:SkillBuffItemView;
			if(this.itemPoolArr.length){
				item=this.itemPoolArr.pop();
			}else{
				item=new SkillBuffItemView();
			}
			item.showLine(true);
			this.UIPanel.addChild(item);
			item.setData(buffId);
			item.x=19
			if(this.itemShowArr.length){
				let lastItem=this.itemShowArr[this.itemShowArr.length-1];
				item.y=lastItem.y+lastItem.height;
			}else{
				item.y=18;

			}
			this.itemShowArr.push(item);
		}
		clearBuffItems(){
			while(this.itemShowArr.length){
				let item=this.itemShowArr.pop();
				item.removeSelf();
				this.itemPoolArr.push(item);
			}

		}



	}
}