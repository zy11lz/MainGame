
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookStageCfgData extends HookStageBaseCfgData
	{
		protected static _dataDicBySceneID: Object;
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<HookStageCfgInfo>): void
		{
			super.setup(dataArr);
			this._dataDicBySceneID = TemplateUtil.createUniqIndexFromArr(dataArr, ["sceneID"])
		}

		public static getListWithSceneID(sceneID: number): Array<HookStageCfgInfo>
		{
			return this._dataDicBySceneID[sceneID];
		}

		public static getMaxStageId(): number
		{
			return this._dataArr[this._dataArr.length - 1].stageID;
		}

		/**
		 * 场景名+关卡在对应场景中的index
		 * @param stageId 
		 */
		public static getStageName(stageId: number): string
		{
			stageId = Math.min(this.getMaxStageId(), stageId);
			let tmpSceneID = cfg.HookStageCfgData.getSceneIDByStageID(stageId);
			let tmpStageList = this.getListWithSceneID(tmpSceneID);
			let tmpSceneName = cfg.HookSceneCfgData.getSceneNameBySceneID(tmpSceneID);
			let tmpStageIndex = stageId - tmpStageList[0].stageID;
			return tmpSceneName + (tmpStageIndex + 1);
		}

		/**
		 * 场景名+hook_stage表stageID
		 * @param stageId 
		 */
		public static getStageNameWithStageID(stageId: number): string
		{
			stageId = Math.min(this.getMaxStageId(), stageId);
			let tmpSceneID = cfg.HookStageCfgData.getSceneIDByStageID(stageId);
			let tmpSceneName = cfg.HookSceneCfgData.getSceneNameBySceneID(tmpSceneID);
			return tmpSceneName + stageId;
		}
	}
}

