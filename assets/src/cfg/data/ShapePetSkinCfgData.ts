
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ShapePetSkinCfgData extends ShapePetSkinBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 获取技能属性加成数据 */
		public static getAddAttrAryById(id: number): AddAtterInfo[]
		{
			let info = this.getInfo(id);
			if (info)
			{
				let saveKey = "addAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addAttr);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

