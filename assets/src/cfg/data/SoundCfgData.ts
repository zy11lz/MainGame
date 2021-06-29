
/**
*
*  配置数据访问
*/
module cfg
{
	export class SoundCfgData extends SoundBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataAll(): Array<SoundCfgInfo>
		{
			return this._dataArr;
		}

		private static _infoArrDic: any;
		public static getInfoArrByType(type: Pro.ScenceSoundType): Array<SoundCfgInfo>
		{
			if (!this._infoArrDic)
			{
				this._infoArrDic = {};

				for (let i = 0; i < this._dataArr.length; i++)
				{
					let info: SoundCfgInfo = this._dataArr[i];
					if (!info.type || !info.name) { continue; }
					if (!this._infoArrDic[info.type])
					{
						this._infoArrDic[info.type] = [];
					}
					this._infoArrDic[info.type].push(info);
				}
			}

			return this._infoArrDic[type] || [];
		}










	}
}

