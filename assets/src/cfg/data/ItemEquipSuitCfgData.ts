
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ItemEquipSuitCfgData extends ItemEquipSuitBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 根据ID与套装件数取得当前新增的属性值（非完整属性，而是与前一件数比较新增出来的属性值） */
		public static getAddAddAttrInfoByCount(info: ItemEquipSuitCfgInfo, count: number): AddAtterInfo
		{
			if (!info) return null;
			let saveKey = "addAddAttrInfo" + count;
			let ret: AddAtterInfo = info[saveKey];
			if (ret) return ret;
			ret = info[saveKey] = AddAtterInfo.parse(info["addAttr" + count])[0];  //简化运算， 配置时会把有变化的放到第一个位置上
			//再减掉前面的（服务器不支持属性列表里面配置多个相同类型的，所以只能在配置里面合并起来，然后取的时候再减掉前面的。。。。。。）
			if (count > 2)
			{
				let beforeList = AddAtterInfo.parse(info["addAttr" + (count - 1)]);
				for (var el of beforeList)
				{
					if (el.type == ret.type)
					{
						ret.value -= el.value;
						ret.valuePer -= el.valuePer;
					}
				}
			}
			return ret;
		}
	}
}

