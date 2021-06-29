/**
* name 
*/
module Pro
{
	export class TestFight
	{
		constructor()
		{

		}

		// static skillIndex:number = 18;
		// static heroId:number = 21401;

		static skillIndex: number = 172;
		static heroId: number = 22403;
		public static creat(heroId: number, skillIndex: number): void
		{
			this.skillIndex = skillIndex;
			this.heroId = heroId;
			var value: Pb_God.PBFightBase = new Pb_God.PBFightBase();
			/**流水ID*/
			value.battlesn;//= new  protobuf.Long();// :Long;
			/**战斗类型_emBattleType*/
			value.battletype = Pb_God._emBattleType.BattleType_Hook;
			/**挑战ID*/
			value.id = 111111111;
			// /**参数*/
			// value.param:number;
			// /**随机种子*/
			// value.randid:number;
			// /**开始时间*/
			// value.begintime:number;
			// /**最大回合*/
			// value.maxround:number;
			/**伙伴*/
			value.friend = this.getFriend(65538, this.heroId, 2, 1, 1);// friend;
			value.energy = this.getEnergy();
			value.playback = this.getPlayBack();
			// /**敌方*/
			// value.energy:Pb_God.PBPlayerBattleInfo;
			// /**战斗回放*/
			// value.playback:Pb_God.PBFightPlayback;
			// /**同一对手的第几次战斗*/
			// value.num:number;
			// /**客户端参数*/
			// value.clientparam:string;

			BattleMgr.Inst.enterBat(value, false, 0);
		}

		static getPlayBack(): Pb_God.PBFightPlayback
		{
			var pBFightPlayback: Pb_God.PBFightPlayback = new Pb_God.PBFightPlayback();
			var firstRound: Pb_God.PBFightRound = new Pb_God.PBFightRound();
			firstRound.round = 0;
			firstRound.states = [];
			firstRound.unitacts = [];
			pBFightPlayback.rounds.push(firstRound);
			for (var index = 1; index < 15; index++)
			{
				var round: Pb_God.PBFightRound = new Pb_God.PBFightRound();
				round.round = index;
				round.states = [];
				round.unitacts = this.getUnitacts();
				pBFightPlayback.rounds.push(round);
			}
			return pBFightPlayback;
		}

		static getUnitacts(): Pb_God.PBFightUnitAct[]
		{
			var aa: Pb_God.PBFightUnitAct[] = [];
			aa.push(this.getAction(65538, 131073));
			aa.push(this.getAction(131073, 65538));
			return aa
		}

		static getAction(srcId: number, dst: number): Pb_God.PBFightUnitAct
		{
			var self = new Pb_God.PBFightUnitAct();
			self.id = srcId;
			self.actions = [];

			var action: Pb_God.PBFightAction = new Pb_God.PBFightAction();
			action.type = Pb_God._emFightAction.FightAction_Skill;
			action.actionskill = new Pb_God.PBFightActionSkill();
			action.actionskill.skillindex = this.skillIndex;
			action.actionskill.src = srcId
			action.actionskill.dst = [dst];
			self.actions.push(action);

			action = new Pb_God.PBFightAction();
			action.type = Pb_God._emFightAction.FightAction_Attack;
			action.actionattack = new Pb_God.PBFightActionAttack();
			action.actionattack.skillindex = this.skillIndex;
			action.actionattack.src = srcId
			action.actionattack.dst = dst;
			action.actionattack.hit = true;
			action.actionattack.physical = true;
			self.actions.push(action);


			action = new Pb_God.PBFightAction();
			action.type = Pb_God._emFightAction.FightAction_HP;
			action.actionhp = new Pb_God.PBFightActionHP();
			action.actionhp.skillindex = this.skillIndex;
			action.actionhp.src = srcId
			action.actionhp.dst = dst;
			action.actionhp.reason = Pb_God._emDoingType.DoingType_Skill;
			action.actionhp.hp = Global.initLongFromValue(100000);
			action.actionhp.hpchanged = Global.initLongFromValue(-10, false);
			self.actions.push(action);

			action = new Pb_God.PBFightAction();
			action.type = Pb_God._emFightAction.FightAction_SkillEnd;
			self.actions.push(action);
			return self;
		}


		static getFriend(unitId: number, displayId: number, pos: number, unittype: number, camptype: number): Pb_God.PBPlayerBattleInfo
		{
			var friend: Pb_God.PBPlayerBattleInfo = new Pb_God.PBPlayerBattleInfo();
			var playerdisplay = new Pb_God.PBPlayerDisplay();
			friend.battlepet = new Pb_God.PBBattlePet();
			/**战斗伙伴信息*/
			friend.battlepet.battlepet = [];//Pb_God.PBBattlePetInfo[];



			var pet: Pb_God.PBBattlePetInfo = new Pb_God.PBBattlePetInfo();
			friend.battlepet.battlepet.push(pet);

			pet.pet = new Pb_God.PBPlayerPetInfo();
			pet.pet.display = new Pb_God.PBPetDisplay();
			pet.pet.display.id = displayId;

			pet.attr = [];
			var attrInfo = new Pb_God.PBAttrInfo()
			attrInfo.type = 1;
			attrInfo.value = Global.initLongFromValue(100000);
			pet.attr.push(attrInfo)

			attrInfo = new Pb_God.PBAttrInfo()
			attrInfo.type = 2;
			attrInfo.value = Global.initLongFromValue(100000);
			pet.attr.push(attrInfo)

			attrInfo = new Pb_God.PBAttrInfo()
			attrInfo.type = 3;
			attrInfo.value = Global.initLongFromValue(100000);
			pet.attr.push(attrInfo)

			attrInfo = new Pb_God.PBAttrInfo()
			attrInfo.type = 4;
			attrInfo.value = Global.initLongFromValue(100000);
			pet.attr.push(attrInfo)

			attrInfo = new Pb_God.PBAttrInfo()
			attrInfo.type = 6;
			attrInfo.value = Global.initLongFromValue(100000);
			pet.attr.push(attrInfo)

			attrInfo = new Pb_God.PBAttrInfo()
			attrInfo.type = 12;
			attrInfo.value = Global.initLongFromValue(100000);
			pet.attr.push(attrInfo)


			pet.allskill = [];

			pet.unitid = unitId;
			pet.pos = pos;
			pet.unittype = unittype;
			pet.petstate = new Pb_God.PBPetFightStateInfo();
			pet.petstate.skillcd = [];
			pet.petstate.buff = [];
			pet.petstate.maxhp = Global.initLongFromValue(100000);
			pet.petstate.curhp = Global.initLongFromValue(100000);
			pet.camptype = camptype;
			/**阵法id*/
			friend.battlepet.zhenfaid = 1;
			/**战力*/
			friend.battlepet.fightpower = 100000;

			return friend;
		}

		static getEnergy(): Pb_God.PBPlayerBattleInfo
		{
			return this.getFriend(131073, this.heroId, 1, 2, 2)
		}
	}
}