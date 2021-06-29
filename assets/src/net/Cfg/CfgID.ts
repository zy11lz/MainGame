/**
* 静态ID列表
*/
module Pro.CfgID
{

	/**
	 * 道具ID
	 */
	export enum ItemID
	{
		/** 金币 */
		Gold = 1,
		/** 钻石 */
		Diamond = 2,
		/** 英雄经验 */
		PetExp = 3,
		/** 友情点 */
		FrendShip = 4,
		/** 召唤积分 */
		CallPoint = 5,
		/** 经验 */
		Exp = 6,
		/** 帮贡 */
		FactionContri = 7,
		/** 远航积分 */
		SailPoint = 8,
		/** 神格积分 */
		GodPoint = 9,
		/** 竞技积分 */
		Chanllenge = 10,
		/** 远征荣耀 */
		ExpetitionPoint = 11,
		/** 符文熔炼积分 */
		RonglianRuneScore = 12,
		/** 先知结晶积分 */
		ProphetScore = 13,
		/** 梨木果（用于限时兑换）  */
		TreeFruit = 30,
		/**迎新战令积分 */
		WelcomeWarOrderScore = 31,
		/**梦幻积分*/
		ExpendType_DreamScore = 32,
		/** 活跃度 */
		Liveness = 52,
		/** 远航刷新积分 */
		SailRefeshPoint = 16026,
		/** 先知精华(用于先知置换) */
		ProphePoint = 10009,
		/** 先知水晶(用于先知召唤) */
		ProphetCrystal = 16006,
		/** 普通召唤券 */
		NomalCall = 16001,
		/** 高级召唤券 */
		HightCallToken = 16002,
		/** 糖果 */
		Candy = 16007,
		/** 许愿星 */
		WishStar = 16038,
		/** 心愿卡 */
		WishCard = 16039,
		/** 10连抽礼包ID */
		HightCallGift = 16829,
		/** 英雄碎片图标三星随机 */
		PetSpitStar3 = 90309,
		/** 英雄碎片图标四星随机 */
		PetSpitStar4 = 90401,
		/** 英雄碎片图标五星随机 */
		PetSpitStar5 = 90501,

		/**胡帕神奇光轮 抽卡 */
		Hupa_Item2 = 16040,
		/**胡帕手镯 兑换*/
		Hupa_Item1 = 16041,
		/**胡帕惩戒之壶 解放*/
		Hupa_Item3 = 16042,
	}

	export enum PetID
	{
		/**胡帕 */
		HuPa = 25509,

		/**解放胡帕 */
		HuPaLiberate = 25510,
	}

	/**
	 * 游戏资源类型
	 */
	export enum ResType
	{
		/** 道具 */
		Item,
		/** 宠物 */
		Pet,
		/** 技能 */
		Skill,
		/** Buff */
		Buff,
		/** 天赋 */
		Talent,
		/** 头像 */
		Player_Icon,
		/** 神器形象 */
		Artifact,
		/** 神器半身像 */
		ArtifactHalfShape,
		/** 神器头像 */
		ArtifactHead,
		/** 神器图标（圆球球） */
		ArtifactIcon,
		/** 默认 */
		Default_Icon
	}

}