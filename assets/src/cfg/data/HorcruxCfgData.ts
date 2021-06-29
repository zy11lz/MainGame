
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HorcruxCfgData extends cfg.HorcruxBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): HorcruxCfgInfo[]
		{
			return this._dataArr;
		}

		public static setup(dataArr:Array<cfg.HorcruxCfgInfo>):void
		{
			super.setup(dataArr);
		}

		public static getHorcruxInfoByPetId(petId: number): HorcruxCfgInfo
		{
			let data: HorcruxCfgInfo[] = cfg.HorcruxCfgData.getDataList()
            for (let i = 0; i < data.length; i++)
            {
                if(data[i].petID == petId)
                {
                    return data[i];
                }
            }
            return null;
		}
	}
}
 
