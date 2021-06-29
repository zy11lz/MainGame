
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
	export class ShapeDataMgrBase
	{
		constructor()
		{

		}

		///////////////////////// 代码整理分隔线 //////////////////////////////////

		//////////////////  玩家当前信息 //////////////
		/**头像id */
		public iconId: number = 1;
		/**头像框id */
		public iconFrameID: number = 1;
		/** 省份*/
		public province: number;
		/** 城市*/
		public city: number;
		/** 当前使用的称号*/
		public usetitleid: number;
		/** 当前使用的冒险形象*/
		public useRiskShapeId: number;

		//////////////////////////各种列表  ////////////////
		/** 称号列表 */
		protected titleMap: ds.StringMap<Pb_God.PBPlayerTitle>;
		/** 已激活的头像 */
		protected activeHeadMap: ds.StringMap<number>;
		/** 头像框 id_时间(0无限)*/
		protected headIconMap: ds.StringMap<Pb_God.PBPlayerHeadIcon>;
		/** 激活中带进度的冒险形象列表 */
		protected riskShapeMap: ds.StringMap<Pb_God.PBPlayerRiskShape>;
		/** 已经激活的冒险形象*/
		protected activeRiskShapeMap: ds.StringMap<number>;
		/** 英雄皮肤( 皮肤ID_过期时间) */
		protected petSkinMap: ds.StringMap<Pb_God.PBU32U32>;

		/**徽章*/
		public badgeList: Pb_God.PBPlayerBadge[];
		/**荣誉点数*/
		public honor: number;
		/**徽章展示*/
		public badgedisplay: number[];


		public init(value: Pb_God.PBPlayerShape, playerDisplayer: Pb_God.PBPlayerDisplay): void
		{
			//shape 
			this.activeRiskShapeMap = Global.listToStringMap(value.activerisk);
			this.activeHeadMap = Global.listToStringMap(value.headid);
			this.riskShapeMap = Global.listToStringMapData(value.risk, "id");
			this.headIconMap = Global.listToStringMapData(value.headicon, "id");
			this.titleMap = Global.listToStringMapData(value.title, "titleid");
			this.petSkinMap = Global.listToStringMapData(value.allskin, "key");
			this.badgeList = value.badge;
			this.honor = value.honor;
			this.badgedisplay = value.badgedisplay;
			this.usetitleid = value.usetitleid;
			this.iconId = playerDisplayer.head;
			this.useRiskShapeId = value.useriskid;
			this.iconFrameID = playerDisplayer.headicon;
			this.province = playerDisplayer.province;
			this.city = playerDisplayer.city;
		}

		/** 头像是否激活 */
		public isActiveHead(id: number): boolean
		{
			if (id == 0) return true;
			return !!this.activeHeadMap.get(id);
		}
		/** 找一个有效的已经激活的头像id */
		public getActiveHeadId(): number
		{
			let keys = this.activeHeadMap.getKeys();
			for (var key of keys)
			{
				let el = this.activeHeadMap.get(key);
				if (el != 0) return el;
			}
			return 0;
		}
		/** 找一个有效的已经激活的形象id */
		public getActiveShapeId(): number
		{
			let keys = this.activeRiskShapeMap.getKeys();
			for (var key of keys)
			{
				let el = this.activeRiskShapeMap.get(key);
				if (el != 0) return el;
			}
			return 0;
		}

		/** 头像框id 是否已经激活 */
		public isActiveHeadFrame(id: number): boolean
		{
			if (id == 0) return true;
			let data = this.headIconMap.get(id);
			if (!data) return false;
			//判断时效性
			if (data.endtime == 0) return true;
			if (data.endtime < TimeController.currTimer / 1000) return false;
			return true;
		}

		/** 称号激活状态
		 * @return 0-未激活  1-已使用道具待激活  2-已激活
		 */
		public titleActiveState(id: number): number
		{
			let data = this.titleMap.get(id);
			if (!data) return 0;
			if (!data.isactive) return 1;
			//判断时效性
			if (data.endtime == 0) return 2;
			if (data.endtime < TimeController.currTimer / 1000)
			{
				this.titleMap.remove(id.toString());
				return 0;
			}
			return 2;
		}

		/** 冒险形象是否已激活 */
		public isActiveRiskShape(id: number): boolean
		{
			if (id == 0) return true;
			return !!this.activeRiskShapeMap.get(id);
		}

		/** 取得冒险形象的激活条件进度 */
		public getRiskShapeCondition(id: number): number[]
		{
			let conditionData = this.riskShapeMap.get(id);
			if (!conditionData) return [];
			return conditionData.condition;
		}

		/** 伙伴皮肤是否存在 */
		public isActivePetSkin(skinId: number): boolean
		{
			if (!this.petSkinMap.containsKey(skinId)) return false;
			let skinData = this.petSkinMap.get(skinId);
			//判断时效性
			let endTime = skinData.value;
			if (endTime == 0) return true;
			if (endTime < TimeController.currTimer / 1000)
			{
				this.petSkinMap.remove(skinId + "");
				return false;
			}
			return true;
		}

		/** 获取冒险形象资源ID */
		public getRiskResID(): number
		{
			return this.useRiskShapeId || 1;//cfg.PetSkinCfgData.getResourceIDByID();
		}
	}
}
