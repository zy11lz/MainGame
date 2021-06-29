
module Pro.Net
{
	/**
	 * 英雄数据
	 */
	export class hero
	{

		/**sn*/
		public sn: Long;
		/**伙伴ID*/
		public id: number;
		/**伙伴星星数*/
		public star: number;
		/**伙伴等级*/
		public level: number;
		/**伙伴进阶等级*/
		public advance: number;
		/**进化段数 */
		public evolve:number;
		/**伙伴是否加锁*/
		public islock: boolean;
		/**圣物等级*/
		public holylevel: number;
		/**圣物经验*/
		public holyexp: number;
		/**圣物进阶*/
		public holyadvance: number;
		/**战斗力*/
		public fightpower: number;
		/**属性*/
		public attr: Pb_God.PBAttrInfo[];
		/**技能数据*/
		public baseskill: Pb_God.PBU32U32[];
		/**使用的皮肤ID*/
		public useskinid: number;
		/** 升星经验（极化值） */
		public exp: number;
		/** 魂器 */
		public horcrux: Pb_God.PBPetHorcrux;



		/**状态 */
		public state:number;
		/**状态 用位余 _emPetStateType >0：是，==0：否 */
		public getState(value:Pb_God._emPetStateType):boolean{
			//return (this.state>>(value-1)&1)==1;
			let num=this.state&(1<<value);
			return num>0;
		}
		public get isDefend():boolean{
			return this.getState(Pb_God._emPetStateType.PetStateType_Defend);
		}
		public get isFight():boolean{
			return this.getState(Pb_God._emPetStateType.PetStateType_Fight);
		}
		




		//--------------------------配合功能系统使用-------------------------
		/** 是否上阵中 */
		public onStore: boolean = false;
		/** 所在阵型 */
		public onStoreTeam: Pb_God._emZhenfaType;
		/** 是否在主线上阵中 */
		public onMainLineStore: boolean = false;
		/** 是否远航中 */
		public onSail: boolean = false;
		/** 红点模型引用 */
		public reddotModel: RedDotModel;
		/** 进阶时即将开放的技能 */
		public preopenSkill: number;
		/** 进阶时即将变化的属性（由于进阶时服务器计算属性会延时太长， 会导致客户端在弹窗后收到消息包等待太久，故此处将预览的属性临时存下来） */
		public preUpAttr: Pb_God.PBAttrInfo[];
		/** 标记英雄(用于各个系统优化查找，不要给与特定意义) */
		public isSelected: boolean = false;
		/** 当前雇佣所属的玩家Id， 0表示是自己的英雄并非雇佣 */
		public supportMePlayerId = 0;

		constructor()
		{

		}
	}
}