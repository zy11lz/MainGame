
/**
*
*  配置数据访问
*/
module cfg
{
	export class ActivityCfgData extends ActivityBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 类型与子类型建立双索引 */
		protected static _dataDicByDoubleIndex: Object;
		/** 类型对应列表 */
		protected static _dataDicByType: Object = {};

		/**
		 * 根据类型筛选活动列表
		 * @param type 活动类型
		 * @param sontype 子类型，如果传入0， 则会拿到活动类型所有的
		 */
		public static getListByType(type: Pb_God._emActivityType, sontype: number = 0): ActivityCfgInfo[]
		{
			if (sontype == 0)
			{ //0表示要拿这个类型所有的
				let ret = this._dataDicByType[type];
				if (ret) { return ret; }
				this._dataDicByType[type] = ret = this._dataArr.filter(elment => elment.type == type);
				return ret;
			} else
			{
				let key = type + "_" + sontype;
				if (!this._dataDicByDoubleIndex) { this._dataDicByDoubleIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["type", "sonType"]); }
				return this._dataDicByDoubleIndex[key] || [];
			}
		}

		/**获取活动开启时间 */
		public static getOpenTimeInfoByID(id: number): StDateTimeInfo
		{
			let info = this.getInfo(id);
			if (info)
			{
				let saveKey = "openTimeInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = StDateTimeInfo.parse(info.openTime);
				}
				return info[saveKey];
			}
			return null;
		}

		/**获取活动重置时间 */
		public static getRefreshTimeInfoByID(id: number): StDateTimeInfo
		{
			let info = this.getInfo(id);
			if (info && info.refreshTime)
			{
				let saveKey = "refreshTimeInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = StDateTimeInfo.parse(info.refreshTime);
				}
				return info[saveKey];
			}
			return null;
		}

		/**
		 * 获取限时兑换奖励列表
		 * @param id
		 */
		public static getExchangeAddItem(id: number): Array<AddItemInfo>
		{
			let info = this.getInfo(id);
			if (!info || !info.param) { return null; }
			//存储奖励
			let saveKey = "addItemAry";
			if (info[saveKey] == null)
			{
				let first_sign_idx = info.param.indexOf(";");
				let data_arr = info.param.substr(first_sign_idx + 1, info.param.length);
				info[saveKey] = AddItemInfo.parse(data_arr);
			}
			return info[saveKey];
		}

		/**
		 * 获取限时兑换活动消耗物品id
		 * @param id
		 */
		public static getExchangeCostItemID(act_id: number): number
		{
			let info = this.getInfo(act_id);
			if (!info || !info.param) { return undefined; }
			let saveKey = "costItem";
			if (info[saveKey] == null)
			{
				let act_params = info.param;
				info[saveKey] = parseInt(act_params.split(";")[0]);
			}
			return info[saveKey];
		}

		/**
		 * 获取战令支付id积分id
		 * @param id
		 */
		public static getchangeID(act_id: number): any
		{
			let warParam = {
				chargeID: null,//支付id
				currencyID: null,//战令积分id
			};
			let info = this.getInfo(act_id);
			if (!info || !info.param) { return undefined; }
			let act_params = info.param;
			if (warParam.chargeID == null)
			{
				warParam.chargeID = parseInt(act_params.split(";")[0]);
			}
			if (warParam.currencyID == null)
			{
				warParam.currencyID = parseInt(act_params.split(";")[1]);
			}
			return warParam;
		}

		/**
		 * 获取7日目标指定天的按钮道具id
		 * @param act_id
		 * @param day
		 */
		public static getAchieveButtonItemID(act_id: number, day: number): number
		{
			let info = this.getInfo(act_id);
			if (!info || !info.param) { return undefined; }
			let saveKey = "buttonItemArr";
			if (info[saveKey] == null)
			{
				let act_params = info.param;
				info[saveKey] = [];
				let day_arr = act_params.split(";");
				for (let i = 0; i < day_arr.length; i++)
				{
					let tab_arr = day_arr[i].split("_");
					// 分割按钮道具id
					info[saveKey].push(tab_arr[0]);
				}
			}
			return info[saveKey][day];
		}

		/**
		 * 获取7日目标指定天的页签id列表
		 * @param act_id
		 * @param day
		 */
		public static getAchieveTabArr(act_id: number, day: number): string[]
		{
			let info = this.getInfo(act_id);
			if (!info || !info.param) { return undefined; }
			let saveKey = "tabArr";
			if (info[saveKey] == null)
			{
				info[saveKey] = [];
				let act_params = info.param;
				let day_arr = act_params.split(";");
				for (let i = 0; i < day_arr.length; i++)
				{
					let tab_arr = day_arr[i].split("_");

					// 第0个index是按钮道具id 所以从1开始
					info[saveKey].push(tab_arr.slice(1, tab_arr.length));
				}
			}
			return info[saveKey][day - 1];
		}

		/**
		 * 获取活动选项列表
		 * @param act_id
		 */
		public static getActivityOptionArray(act_id: number): string[]
		{
			let info = this.getInfo(act_id);
			if (!info) { return []; }
			let saveKey = "optionArray";
			if (info[saveKey] == null)
			{
				info[saveKey] = info.option.split(";");
			}
			return info[saveKey];
		}

		/**
		 * 是否指定选项的活动类型
		 * @param act_id
		 * @param op_type
		 */
		public static isOptionTypeActivity(act_id: number, op_type: Pb_God._emActivityOption): boolean
		{
			let op_arr = this.getActivityOptionArray(act_id);
			if (!op_arr) { return false; }
			for (let i in op_arr)
			{
				let args = op_arr[i].split("_");
				if (args.length == 0) { continue; }
				if (args[0] == op_type.toString()) { return true; }
			}
			return false;
		}

		/**
		 * 获取对应活动选项的参数列表
		 * @param act_id
		 * @param op_type
		 */
		public static getActivityOptionArgs(act_id: number, op_type: Pb_God._emActivityOption): string[]
		{
			let result = [];
			let op_arr = this.getActivityOptionArray(act_id);
			if (!op_arr) { return result; }
			for (let i in op_arr)
			{
				let args = op_arr[i].split("_");
				if (args.length == 0) { continue; }
				if (args[0] == op_type.toString())
				{
					if (args.length == 1) { return result; }//无参数
					for (let j = 1; j < args.length; j++)
					{//取得所有选项参数
						result.push(args[j]);
					}
				}
			}
			return result;
		}

		/**
		 * 获取每日限购配置
		 */
		public static getDayLimitBuyCfgData()
		{
			return cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_LimitDayGift);
		}

	}
}

