
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

module Pro {
	export class DefendDataMgrBase {
		/**等级*/
		public level: number;
		/**阶级*/
		public rank: number;
		/**当前方案索引*/
		public planIndex: number;
		/**方案列表*/
		public plans: Pb_God.PBDefendPlan[];

		/**战斗力*/
		public power:number=0;
		/**所有属性*/
		public attr:Pb_God.PBAttrInfo[]=[];

		/** 红点初始化 */
		protected initRedDot:boolean = false;

		/**下一级所有属性*/
		public attr2:Pb_God.PBAttrInfo[]=[];


		/** 已上阵的英雄列表map（方便查询） */
		private _fightHeroIdMap = new ds.StringMap<boolean>();
		/** 当前方案已上阵的英雄列表map（方便查询） */
		public slotMap = new ds.StringMap<Pb_God.PBDefendPetSlot>();
		
		public slotIdMap = new ds.StringMap<boolean>();
		constructor() {


		}
		init(data: Pb_God.PBPlayerDefend) {
			if (!data) {
				
				return;
			}

			this.level = data.level;
			this.rank = data.rank;
			this.planIndex = data.planIndex;
			this.plans = data.plans;

			if(this.rank==0)return

			this.refreshHeroIdMap();
			this.initRedDotModel();
			
			EventMgr.on(EventNotify.PlayerItemNumChange, this, this._refreshValue);

		}
		refreshHeroIdMap(){
			
			this._fightHeroIdMap.clear();
			this.slotMap.clear();
			this.slotIdMap.clear();
			let plan=this.getCurrentPlan();
			if(!plan){
				logI("todo refreshHeroIdMap")
				return;
			}
			let pets=plan.pets;
			for(let i=0;i<pets.length;i++){
                let hero=PetDataMgr.getPetInfo(pets[i].petSnID)
				this._fightHeroIdMap.put(hero.id,true);
				this.slotMap.put(pets[i].index,pets[i]);
				this.slotIdMap.put(hero.id,true);
				
			}
			
		}
		/**判断英雄是否已经装配 */
		public heroIdIsEquip(heroId:number):boolean{
			return this._fightHeroIdMap.get(heroId);
		}
		/**获得当前槽位的 */
		public getPetSlot(slot:number):Pb_God.PBDefendPetSlot{
			return this.slotMap.get(slot);
		}
		
		/**通过id获得当前是否已经装配英雄 */
		public getPetSlot3(id:number):boolean{
			return this.slotIdMap.get(id);
		}


		public getCurrentPlan():Pb_God.PBDefendPlan{
			return this.getPlanByIndex(this.planIndex);
		}
		public getPlanByIndex(index:number):Pb_God.PBDefendPlan{
			if(!this.rank)return null;
			for(let i=0;i<this.plans.length;i++){
				if(this.plans[i].index==index){
					return this.plans[i];
				}
			}
			return null;

		}

		///////////////////// 红点 //////////////////////////
		public reddotModel: RedDotModel = new RedDotModel();
		private initRedDotModel(): void
		{
			if(this.rank==0)return
			if(!this.initRedDot)
			{
				this.reddotModel.cleanUp(true);
				this.reddotModel.setSystemSwitchId(emSystemSwitchType.HeroDefend);
				//4个卡槽
				for (let i = 1; i <= 4; i++)
				{
					let childModel = this.reddotModel.addChildModel(i);
					childModel.bindData = i;
					childModel.setupCheckMethod(this, this.isHaveFun);
				}

				//升级，升阶按钮
				let childModel2 = this.reddotModel.addChildModel(5);
				childModel2.setupCheckMethod(this, this.isHaveFun2);
			}
			this.initRedDot = true;
		}

		/** 刷新所有的红点状态 */
		public refreshRedDotState(): void
		{
			if(this.rank==0)return
			this.refreshHeroIdMap();
			PetDataMgr.refreshDefendPetArr();
			
			this.reddotModel.refresh(true);
		}

		/** 卡槽是否可以安装精灵 */
		private isHaveFun(reddotModel: RedDotModel): number
		{
			
			let slot: number = reddotModel.bindData;
			let info:cfg.DefendSlotCfgInfo=cfg.DefendSlotCfgData.getInfo(slot);
			let isOpen:boolean=this.rank>=info.rank&&this.level>=info.level;
			if(!isOpen){
				return 0;
			}
			let heros=PetDataMgr.getDefendUsedHeroArr();
			if(heros.length==0){
				return 0;
			}
			
			//卡槽上是否已经有英雄
			let plan=this.getCurrentPlan();
			let pet:Pb_God.PBDefendPetSlot;
			if(plan&&plan.pets){
				for(let i=0;i<plan.pets.length;i++){
					if(plan.pets[i].index==slot){
						return 0;
					}
				}
			}
			return 1;
		}

		/** 升级、升阶按钮 */
		private isHaveFun2(reddotModel: RedDotModel): number
		{
			//0:升级，1：进阶
            let type=0;
            let tempUpgradeAry=cfg.DefendRankCfgData.getNeedItemAryByIdLevel(this.level);
            if(tempUpgradeAry.length){
                let info=cfg.DefendRankCfgData.getInfoByLv(this.level);
                //已经进阶成功
                if(this.rank>info.rank){
                    tempUpgradeAry=null;
                }
            }

            if(!tempUpgradeAry||!tempUpgradeAry.length){
                tempUpgradeAry = cfg.DefendLevelCfgData.getNeedItemAryByIdLevel(this.level);
            }else{
                type=1;
            }
            
            if(!tempUpgradeAry.length){
                return 0;
            }
            
			if (!Global.isFullAllRes(tempUpgradeAry,false))
			{
				return 0;
			}
			return 1;

		}


		_refreshValue(){
			let childModel = this.reddotModel.addChildModel(5);
			childModel.refresh(true);

		}
		
		



	}
}
