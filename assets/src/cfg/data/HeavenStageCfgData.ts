
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HeavenStageCfgData extends HeavenStageBaseCfgData
	{

		/** 存储章节-关卡数据 */
		private static _indexDic: Object = {};
		/** 存储每一章所有关卡数据 */
		private static _indexChapterDic: { [key: number]: Array<HeavenStageCfgInfo> } = {};

		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<HeavenStageCfgInfo>): void
		{
			super.setup(dataArr);
			this._indexDic = TemplateUtil.createUniqIndexFromArr(dataArr, ["chapter", "stage"]);
			for (let i in this._dataArr)
			{
				let info = this._dataArr[i];
				if (!this._indexChapterDic[info.chapter])
					this._indexChapterDic[info.chapter] = [];
				this._indexChapterDic[info.chapter].push(info);
			}
		}

		/**
		 * 获取对应章节所有关卡
		 * @param chapter_index 
		 */
		public static getChapterStageInfoArr(chapter_index: number): HeavenStageCfgInfo[]
		{
			return this._indexChapterDic[chapter_index] || [];
		}

		/**
		 * 是否boss关
		 * @param stage_index 
		 */
		public static isBossStageByIndex(stage_index: number): boolean
		{
			let info = this.getInfo(stage_index);
			return this.isBossStage(info);
		}

		/**
		 * 该关卡是否为章节boss关
		 * @param info 
		 */
		public static isBossStage(info: HeavenStageCfgInfo): boolean
		{
			if (!info) return false;
			let all_info = this.getChapterStageInfoArr(info.chapter);
			return info.stage == all_info.length;
		}

		/**
		 * 根据章节和关卡下标取关卡数据
		 * @param chapter_index 
		 * @param stage_index 
		 */
		public static getStageInfoByKeyPair(chapter_index: number, stage_index: number): HeavenStageCfgInfo
		{
			let result = this._indexDic[chapter_index + "_" + stage_index];
			if (result) return result;
			logE("找不到指定章节数据 : " + chapter_index + "_" + stage_index);
			return null;
		}

		/**
		 * 星星条件列表
		 * @param info 
		 */
		public static getStarConditionArray(info: HeavenStageCfgInfo): number[]
		{
			if (!info) return [];
			if (!info.starCondition) return [];
			let save_key = "starConditionArray";
			if (!info[save_key])
			{
				let result: number[] = [];
				let s_arr = info.starCondition.split(";");
				for (let i in s_arr)
					result.push(parseInt(s_arr[i]));
				info[save_key] = result;
			}
			return info[save_key];
		}

		public static getAddItemAryByInfo(info: HeavenStageCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "addItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addItem);
				}
				return info[saveKey];
			}
			return null;
		}

		/**
		 * 首次通关奖励
		 * @param info 
		 */
		public static getFirstAddItemAryByInfo(info: HeavenStageCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "firstAddItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.firstAccomplishAddItem);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

