
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookStagePrizeCfgData extends HookStagePrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): HookStagePrizeCfgInfo[]
		{
			return this._dataArr;
		}

		public static getStagePrizeAryById(id: number): AddItemInfo[]
		{
			let info = this.getInfo(id);
			if (info)
			{
				let saveKey = "StagePrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.stagePrize);
				}
				return info[saveKey];
			}
			return null;
		}


		/** 下一解锁预告奖励关卡信息 */
        public static getNextStateInfo(stageId):HookStagePrizeCfgInfo
		{
            let stateInfo = {};
			let data: HookStagePrizeCfgInfo[] = cfg.HookStagePrizeCfgData.getDataList()
            for (let i = 0; i < data.length; i++)
            {
                // 大等于当前关卡 且 为预告奖励
                if(data[i].stageID > stageId  && data[i].isTarget == 1)
                {
                    return data[i];
                }
            }
            return null;
        }
		
		/** 当前已解锁预告奖励关卡 */
        public static getCurStateId(stageId)
		{
            let curStageId = 0;
			let data: HookStagePrizeCfgInfo[] = cfg.HookStagePrizeCfgData.getDataList()
            for (let i = 0; i < data.length; i++)
            {
                // 大等于当前关卡 且 为预告奖励
                if(data[i].stageID <= stageId  && data[i].isTarget == 1)
                {
                    curStageId = data[i].stageID;
                }
				else if(data[i].stageID > stageId)
				{
					return curStageId
				}
            }
        }
	}
}

