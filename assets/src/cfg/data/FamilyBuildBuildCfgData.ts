
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FamilyBuildBuildCfgData extends FamilyBuildBuildBaseCfgData
	{
		constructor()
		{
			super();
		}

		/**  家具类型 */
		public static getBuildTypeByID(value: number): number
		{
			let info: FamilyBuildBuildCfgInfo = this.getInfo(value);
			if (info)
			{
				return info.buildType;
			}
			return -1;
		}
	}
}

