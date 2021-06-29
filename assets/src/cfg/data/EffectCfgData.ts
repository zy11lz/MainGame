
/**
* 
*  配置数据访问
*/
module cfg
{
	export class EffectCfgData extends EffectBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getEditorInfos(): Array<EffectCfgInfo>
		{
			return this._dataArr.filter(element => element.editorFrame > 0);
		}

		/**  资源路径 */
		public static getResPathAryById(value: string): Array<SkillEffectResInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "resPathAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = SkillEffectResInfo.parse(info.resPath);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

