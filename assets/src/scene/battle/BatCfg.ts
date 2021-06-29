
var MAX_PROBABILITY = 10000;
var BATTER_ATTR_PERCENT = 100;
var MAX_PERCENT = 100;
var NORMALSKILLINDEX = 99999;

module Pro.BatCfg
{

	/** 无尽试炼中一次性的技能ID */
	export var EndlessSkillID = 380010;

	/** pve战斗都用客户端的 */
	export var UseClientResult = true;

	/** 延迟技能类型 */
	export enum _emDelayUseSkillParam
	{
		/** 连击 */
		Combo = 0,
		/** 追击 */
		Reattack,
		/** 攻击 */
		LowAttack
	};

	/**
	 * 角色释放技能的位置
	 */
	export enum AtkType
	{
		/** 普通角色 */
		Role = 1,
		/** 神器 */
		Artifact,
		/** 额外buff(无尽、神界) */
		ExtralBuff
	}

	/**
	 * 角色释放技能的位置
	 */
	export enum SkillCastPos
	{
		/** 屏幕中心 */
		ScreenCenter = 0,
		/** 保持不动 */
		StandStay,
		/** 对位目标前 */
		ParaFront,
		/** 我方对位排 */
		OwnParaRow,
		/** 屏幕中心对位排 */
		CenterParaRow,
	}

	/**
	 * 技能伤害类型
	 */
	export enum SkillDamgeType
	{
		/** 物理 */
		Attack = 1,
		/** 法术 */
		Magic = 2,
		/** 治疗 */
		Recover = 3,
		/** 真实伤害 */
		Truly = 4
	}

	/**
	 * 技能产生buff生效目标
	 */
	export enum SkillTargetType
	{
		/** 敌方 */
		Enemy = 0,
		/** 我方 */
		Owen = 1,
		/** 自己 */
		Self = 2,
		/** 所有 */
		All = 3
	}

	/**
	 * 技能选择目标范围
	 */
	export enum SkillRangeType
	{
		/** 对位单体 */
		Para = 1,
		/** 全体 */
		All,
		/** 前排 */
		Row_Front,
		/** 中排 */
		Row_Center,
		/** 后排 */
		Row_Back,
		/** 前中排 */
		Row_Front_Center,
		/** 前后排 */
		Row_Front_Back,
		/** 中后排 */
		Row_Center_Back,
		/** 随机排 */
		Row_Rand,
		/** 上列 */
		Col_Up,
		/** 中列 */
		Col_Center,
		/** 下列 */
		Col_Down,
		/** 随机列 */
		Col_Rand,
		/** 对位列 */
		Col_Para,
		/** 生命值最大 */
		Blood_Max,
		/** 生命值最小 */
		Blood_Min,
		/** 攻击力最高 */
		Attack_Max,
		/** 攻击力最低 */
		Attack_Min,
		/** 速度最高 */
		Speed_Max,
		/** 速度最低 */
		Speed_Min,
		/** 防御最高 */
		Defense_Max,
		/** 防御最低 */
		Defense_Min,
		/** 随机 */
		Rand,
		/** 人数最多的一列 */
		Col_MaxNum,
	}

	/**
	 * 技能特效附加参数类型
	 * （避免频繁修改打包工具，以扩展参数的方式来实现扩展多样化。）
	 */
	export enum SkillEffectExtendsType
	{
		/** 两个受击特效与受击帧中，分别对应敌方与友方的受击 */
		behitEff_DiffCamp = 1,
		/** 飞行武器特效在多段攻击中，按顺序循环播放1个 */
		skillEff_LoopOne = 2,
		/** skillEffect的效果，非群体攻击，而是播放在每个受击者身上 */
		skillEff_TotBehit = 3,
	}
}