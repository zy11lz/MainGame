
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
	export class HeavenDungeonDataMgrBase
	{
		protected server_data: Pb_God.PBPlayerHeavenDungeon;

		/**所有章节数据 */
		private chapter_datas: Pb_God.PBPlayerHeavenDungeonChapter[];

		/** 章节数据字典 key:章节id */
		private chapter_datasMap = new ds.StringMap<Pb_God.PBPlayerHeavenDungeonChapter>();

		/**神像数据 */
		private statues: Pb_God.PBPlayerHeavenDungeonStatue[];

		/**
		 * 当前挑战次数
		 */
		public get cur_challenge_times(): number
		{
			return cfg.HeavenCommonCfgData.getMaxCountByID(0) + this.server_data.buycount - this.server_data.count;
		};

		/**
		 * 可购买的次数
		 */
		public get can_buy_challenge_times(): number
		{
			return cfg.HeavenCommonCfgData.getBuyCountByID(0) - this.server_data.buycount || 0;
		}

		/** 获取神像可用免费次数 */
		public get prayFreeCount(): number
		{ return cfg.HeavenCommonCfgData.getPrayFreeCountByID(0) - this.server_data.prayfreecount; }


		/**红点数据 */
		public reddot: RedDotModel = new RedDotModel();

		constructor()
		{
		}

		public init(data: Pb_God.PBPlayerHeavenDungeon): void
		{
			this.server_data = data;
			this.statues = data.statues;
			this.chapter_datas = data.chapters;
			this.updateChapterDatasDic(this.chapter_datas);
			this.initReddot();
		}

		/** 隔天重置 */
		public resetNewDay(): void
		{
			this.server_data.buycount = 0;
			this.server_data.prayfreecount = 0;
			this.server_data.count = 0;
			this.reddot.refresh(true);
		}

		private initReddot(): void
		{
			this.reddot.cleanUp(true);
			let red_chapter = this.reddot.addChildModel("chapter");
			red_chapter.addGlobalEventRefresh(EventNotify.Heaven_BuyCount);
			red_chapter.addGlobalEventRefresh(EventNotify.Heaven_ChpaterStageUpdate);
			red_chapter.setupCheckMethod(this, this.checkChapterReddot);

			let red_pray = this.reddot.addChildModel("pray");
			red_pray.addGlobalEventRefresh(EventNotify.Heaven_StatueUpdate);
			red_pray.setupCheckMethod(this, this.checkPrayReddot);

			//章节领奖红点
			let chapterRewardReddot = this.reddot.addChildModel("chapterReward");
			chapterRewardReddot.addGlobalEventRefresh(EventNotify.Heaven_ChpaterStageUpdate);
			chapterRewardReddot.addGlobalEventRefresh(EventNotify.Heaven_DrawChapterReward);
			chapterRewardReddot.setupCheckMethod(this, this.checkChapterRewardReddot);
		}

		/**
		 * 获取神像数据
		 * @param idx 
		 */
		public getStatueData(idx: number): Pb_God.PBPlayerHeavenDungeonStatue
		{
			let results = this.statues.filter(e => e.index == idx);
			return results.length > 0 ? results[0] : null;
		}

		/**
		 * 刷新神像数据
		 * @param data 
		 */
		protected updateStatue(data: Pb_God.PBG2CHeavenDungeonPray): void
		{
			let statue = this.getStatueData(data.statue);
			if (!statue)
			{
				statue = new Pb_God.PBPlayerHeavenDungeonStatue();
				statue.index = data.statue;
				this.statues.push(statue);
			}
			for (let i = 0; i < data.reward.length; i++)
			{
				let new_data = new Pb_God.PBU32U32();
				let item_str = cfg.HeavenPrayPrizeItemsCfgData.getAddItemByIndex(data.reward[i]);
				let pair_info = cfg.ValueTwoInfo.parse(item_str);
				new_data.key = pair_info[0].value1;
				new_data.value = pair_info[0].value2;
				statue.rewards.push(new_data);
			}
			statue.times = data.times;
			this.server_data.prayfreecount = data.freecount;
		}

		/**
		 * 刷新章节数据
		 * @param datas 
		 */
		private updateChapterDatasDic(datas: Pb_God.PBPlayerHeavenDungeonChapter[]): void
		{
			this.chapter_datasMap = Global.listToStringMapData(datas, "chapter", this.chapter_datasMap, true);
		}

		/** 刷新章节关卡数据 */
		protected updateStageData(data: Pb_God.PBPlayerHeavenDungeonStage): void
		{
			if (!data) return;
			let stage_cfg = cfg.HeavenStageCfgData.getInfo(data.index);
			if (!stage_cfg) return;

			let chapter_data = this.chapter_datasMap.get(stage_cfg.chapter);
			if (!chapter_data)
			{
				let chapter_data = new Pb_God.PBPlayerHeavenDungeonChapter();
				chapter_data.chapter = stage_cfg.chapter;
				chapter_data.rewards = [];
				chapter_data.stages = [data];
				this.chapter_datasMap.put(stage_cfg.chapter, chapter_data);
				this.chapter_datas.push(chapter_data);
				return;
			}
			let isFind = false;
			for (var i = 0; i < chapter_data.stages.length; i++)
			{
				if (chapter_data.stages[i].index == stage_cfg.index)
				{
					chapter_data.stages[i] = data;
					isFind = true;
				}
			}
			if (!isFind) chapter_data.stages.push(data);
		}

		/**
		 * 添加章节已领取箱子数据
		 * @param box_id 
		 */
		public updateChapterRewardData(box_id: number): void
		{
			let reward_cfg = cfg.HeavenChapterPrizeCfgData.getInfo(box_id);
			if (!reward_cfg) return;
			let chapter = this.chapter_datasMap.get(reward_cfg.chapter);
			if (!chapter) return;
			chapter.rewards.push(box_id);
		}

		/**
		 * 获取当前最新开启的章节ID
		 */
		public getCurOpenChpaterId(): number
		{
			let allChpaterInfos = cfg.HeavenChapterCfgData.getAll();
			for (let i = allChpaterInfos.length - 1; i >= 0; i--)
			{
				let info = allChpaterInfos[i];
				if (this.isChapterUnlock(info.chapter))
					return info.chapter;
			}
			return 0;
		}

		/**
		 * 获取当前最新开启的神像id
		 */
		public getCurOpenStatueId(): number
		{
			let cur_chapter_id = this.getCurOpenChpaterId();
			let allStatueInfos = cfg.HeavenPrayStatueCfgData.getAllInfo();
			for (let i = allStatueInfos.length - 1; i >= 0; i--)
			{
				let s_info = allStatueInfos[i];
				if (s_info.needChapter <= cur_chapter_id)
					return s_info.index;
			}
			return 0;
		}

		/**
		 * 检测神像是否解锁
		 * @param statue_cfg 
		 */
		public isStatueUnlock(statue_cfg: cfg.HeavenPrayStatueCfgInfo): boolean
		{
			if (!statue_cfg) return false;
			let is_chapter_unlock = this.isChapterUnlock(statue_cfg.needChapter);
			if (!is_chapter_unlock)
			{
				TipsUtils.showTips(Global.getLangStr("Heaven_msg3", Global.numberToChinese(statue_cfg.needChapter)));
				return false;
			}
			return true;
		}

		/**
		 * 指定章节关卡是否解锁
		 * @param chapter_index 
		 */
		public isChpaterStageUnlock(chapter_index: number, stage: number): boolean
		{
			let d = this.chapter_datasMap.get(chapter_index);
			if (!d)
			{// 没有数据 则自动解锁章节第一关
				return stage == 1;
			}
			let unlock_chapter_count = d.stages.length + 1;
			return stage <= unlock_chapter_count;
		}

		/**
		 * 指定章节奖励是否已领取
		 * @param chapter_idx 
		 * @param cfg_idx 
		 */
		public isChapterRewardFinish(chapter_idx: number, cfg_idx: number): boolean
		{
			let chapter = this.chapter_datasMap.get(chapter_idx);
			if (!chapter) return false;
			let has_get_rewards = chapter.rewards;
			return has_get_rewards.indexOf(cfg_idx) >= 0;
		}

		/**
		 * 章节关卡是否通过
		 * @param stage_idx 
		 */
		public isChpaterStagePassedByIndex(stage_idx: number): boolean
		{
			let info = cfg.HeavenStageCfgData.getInfo(stage_idx);
			if (!info) return true;
			return this.isChapterStagePassed(info.chapter, info.stage);
		}

		/**
		 * 章节关卡是否已通过
		 * @param chapter_index 
		 * @param stage 
		 */
		public isChapterStagePassed(chapter_index: number, stage: number): boolean
		{
			let chapter_data = this.chapter_datasMap.get(chapter_index);
			if (!chapter_data) return false;
			let unlock_count = chapter_data.stages.length;
			return unlock_count >= stage;
		}

		/**
		 * 获取关卡数据
		 * @param chapter_id 
		 * @param stage_id 
		 */
		public getChapterStageData(chapter_id: number, stage_index: number): Pb_God.PBPlayerHeavenDungeonStage
		{
			let chapter_data = this.chapter_datasMap.get(chapter_id);
			if (!chapter_data) return null;
			for (let i in chapter_data.stages)
			{
				let d = chapter_data.stages[i];
				if (d.index == stage_index)
					return d;
			}
			return null;
		}

		/**
		 * 获取章节已获得星星数量
		 * @param chapter_id 
		 */
		public getChapterStarsCount(chapter_id: number): number
		{
			let c_data = this.chapter_datasMap.get(chapter_id);
			if (!c_data) return 0;
			let result = 0;
			for (let i in c_data.stages)
			{
				let d = c_data.stages[i];
				result += d.stars.length;
			}
			return result;
		}

		/**
		 * 章节是否完美通关
		 * @param chapter_id 
		 */
		public isChapterPerfecPassed(chapter_id: number): boolean
		{
			let has_star_count = this.getChapterStarsCount(chapter_id);
			let max_star_count = cfg.HeavenStageCfgData.getChapterStageInfoArr(chapter_id).length * 3;
			return has_star_count >= max_star_count;
		}

		/**
		 * 章节是否解锁
		 * @param chapter_id 
		 */
		public isChapterUnlock(chapter_id: number): boolean
		{
			let conditionStr = cfg.HeavenChapterCfgData.getConditionByChapter(chapter_id);
			if (!conditionStr) return true;
			let condition_arr = conditionStr.split(";");
			for (let i in condition_arr)
			{
				let d = condition_arr[i].split("_");
				let c_chapter_id = parseInt(d[0]);

				let c_chapter_data = this.chapter_datasMap.get(c_chapter_id);
				if (!c_chapter_data || c_chapter_data.stages.length < cfg.HeavenStageCfgData.getChapterStageInfoArr(c_chapter_id).length)//最大关卡数
				{
					return false;
				}

				let c_star_count = parseInt(d[1]);//需要星星数量
				if (c_star_count > 0)
				{
					let have_star_count = this.getChapterStarsCount(c_chapter_id);
					if (have_star_count < c_star_count)
					{
						return false;
					}
				}

			}
			return true;
		}

		/**
		 * 章节挑战免费次数红点
		 */
		private checkChapterReddot(): number
		{
			return this.cur_challenge_times > 0 ? 1 : 0;
		}

		/**
		 * 祈祷红点
		 */
		private checkPrayReddot(): number
		{
			return this.prayFreeCount > 0 ? 1 : 0;
		}
		/**
		 * 章节领奖红点
		 */
		private checkChapterRewardReddot(): number
		{
			for (let chapterData of this.chapter_datas)
			{
				if (this.checkChapterStarCanReward(chapterData.chapter))
					return 1;
			}
			return 0;
		}
		/** 获取对应章节是否还有星星奖励可领取 */
		public checkChapterStarCanReward(chapterId: number): boolean
		{
			if (!this.isChapterUnlock(chapterId)) return false;
			//章节已获得星星数
			let curNum = this.getChapterStarsCount(chapterId);
			if (curNum == 0) return false;
			let box_rewards = cfg.HeavenChapterPrizeCfgData.getInfoArrayByChapterIndex(chapterId);
			for (let box_cfg of box_rewards)
			{
				let isGet = this.isChapterRewardFinish(box_cfg.chapter, box_cfg.index);
				if (isGet) continue;
				if (curNum >= box_cfg.star) return true;
			}
			return false;
		}

	}
}
