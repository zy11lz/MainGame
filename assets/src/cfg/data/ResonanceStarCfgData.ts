
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ResonanceStarCfgData extends cfg.ResonanceStarBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.ResonanceStarCfgInfo>): void
		{
			super.setup(dataArr);
		}

		/**
		 * 获取当前星级赋能的下一级
		 * @param star 
		 */
		public static getNextStar(star)
		{
			for (let i = 0; i < this._dataArr.length; i++)
			{
				if (star < this._dataArr[i].star)
				{
					return this._dataArr[i].star
				}
			}
		}


		/**
		 * 获取当前星的配置  配置是可以6 8 10 这种 所以9要取8的配置
		 * @param star 
		 */
		public static getStar(star)
		{
			for (let i = 0; i < this._dataArr.length; i++)
			{
				if (star < this._dataArr[i].star)
				{
					return this._dataArr[i - 1].star
				}
			}
		}

		/**
	  * 获取升星需要的材料
	  */
		public static getStarNeed(star)
		{
			return this.getInfo(this.getStar(star)).needItemCount;
		}

		// public static getMaxStar()
		// {
		// 	return this._dataArr[this._dataArr.length -1].star;
		// }
	}
}

