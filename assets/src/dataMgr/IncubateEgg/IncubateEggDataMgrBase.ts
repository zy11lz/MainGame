
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
	export class IncubateEggDataMgrBase
	{
		/**红点 */
		public reddotModel: RedDotModel = new RedDotModel();
		protected initBol:boolean=false;

		/**正在孵化蛋数据*/
		public IncubateEggs:Pb_God.PBIncubateEgg[];
		constructor()
		{
		
		}


		init(data:Pb_God.PBIncubateEggData){
			if(!data){
				//TODO songjie
				let info=new Pb_God.PBIncubateEgg();
				info.Index=2;
				info.CurrStep=100;
				info.TotalStep=100;
				info.Speed=10;
				
				this.IncubateEggs=[info];
				return
			}
			this.IncubateEggs=data.IncubateEggs;

			this.initRedDotModel();
			this.initBol=true;

			EventMgr.on(EventNotify.PlayerItemNumChange, this, this._refreshValue);
		}
		_refreshValue(fID: number, tempNewNum: number){
			let tempUpgradeAry=cfg.IncubatePetEggCfgData.getNeedItemAry();
			if(fID==tempUpgradeAry[0].itemid){
                this.reddotModel.refresh(true);
            }
		}

		public initRedDotModel(): void
		{
			if(!this.initBol){
				this.reddotModel.cleanUp(true);
				this.reddotModel.setSystemSwitchId(emSystemSwitchType.EggHatch);
				this.reddotModel.setupCheckMethod(this, this.isHaveFun);
				this.reddotModel.addChildModel("groupID",ActivityDataMgr.reddotModelCommonGrp.getChildModel(this.groupID))
			}
			this.reddotModel.refresh();
			

			
		}
		private isHaveFun(reddotModel: RedDotModel): number
		{
			for(let i=0;i<this.IncubateEggs.length;i++){
				let incubateEgg=this.IncubateEggs[0];
				if(incubateEgg.CurrStep>=incubateEgg.TotalStep){
					return 1;
				}
			}
			if(!this.IncubateEggs.length){
				let tempUpgradeAry=cfg.IncubatePetEggCfgData.getNeedItemAry();
				if (Global.isFullAllRes(tempUpgradeAry,false))
				{
					return 1;
				}
			}
			
			return 0;

		}

		public get groupID():number{
            let tempUpgradeAry=cfg.IncubatePetEggCfgData.getNeedItemAry();
            let tempItemID=tempUpgradeAry[0].itemid;
            if (tempItemID == Pro.CfgID.ItemID.Diamond)
            {
               
                return;
            }
            let tempGateWayStr = cfg.ItemCfgData.getGetwayById(tempItemID);
			let tempGateWaylist = tempGateWayStr.length > 0 ? tempGateWayStr.split(";") : [];

			let tmpUIID = parseInt(tempGateWaylist[0]);
			let uiCfg = cfg.UiconfigUiopenCfgData.getInfo(tmpUIID);
			return Number.parseInt(uiCfg.page);//16

				//this._reddotBindCtl.bind(btn.reddot, ActivityDataMgr.reddotModelCommonGrp.getChildModel(grpCfg.groupID));
			

            
        }






	}
}
