
module cfg
{

	/*************************************************************/
	//-------------------------------------------------------------
	//------------------------------ 日期时间[字段小于0不检测]
	export class StDateTimeInfo
	{
		_timeStr: string;

		//[*/年/年-年][*/月/月-月][[*/日-日]/[w周,w周]]/[w周-w周]/[s开服,s开服]/[s开服-s开服]][时间-时间]
		iYearBegin: number;			//年[标准年]
		iYearEnd: number;			//年[标准年]
		iMonthBegin: number;			//月[1,12]
		iMonthEnd: number;			//月[1,12]
		iCustomType: number;			//0:天，1:周，2:开服
		iCustomDay: number;			//位运算
		iBegin: number;				//日[1,31]周[0,6]开服天数[1,31]
		iEnd: number;
		iHourBegin: number;			//时[0,23]
		iHourEnd: number;
		iMinuteBegin: number;		//分[0,59]
		iMinuteEnd: number;


		/*************************************************************/
		/*************************************************************/
		//-------------------------------------------------------------
		//------------------------------ 初始化函数
		constructor()
		{
			this.iYearBegin = -1;
			this.iYearEnd = -1;
			this.iMonthBegin = -1;
			this.iMonthEnd = -1;
			this.iCustomType = -1;
			this.iCustomDay = 0;
			this.iBegin = 0;
			this.iEnd = 0;
			this.iHourBegin = 0;
			this.iHourEnd = 0;
			this.iMinuteBegin = 0;
			this.iMinuteEnd = 0;
		}

		//------------------------------ 是否指定范围
		private isInCustomRange(value: number): boolean
		{
			if (this.iCustomDay > 0)
			{
				return Global.cherkBit(this.iCustomDay, value);
			}

			if(this.iEnd<this.iBegin){
				return !(value > this.iEnd && value < this.iBegin);
			}
			return value >= this.iBegin && value <= this.iEnd;
		}

		//-------------------------------------------------------------
		/** 是否指定周范围 */
		private isWeekRange(value: number): boolean
		{
			if (this.iCustomType != 1)
			{
				return false;
			}
			return this.isInCustomRange(value);
		}

		/** 是否指定天范围 */
		private isDayRange(value: number): boolean
		{

			if (this.iCustomType != 0)
			{
				return false;
			}

			return this.isInCustomRange(value);
		}

		/** 是否指定开服天范围 */
		private isOpenSerRange(value: number): boolean
		{

			if (this.iCustomType != 2)
			{
				return false;
			}

			return this.isInCustomRange(value);
		}

		/** 获得配置开始时间 */
		public getDateTimeBegin(): number
		{
			if (this.iYearBegin < 0 || this.iMonthBegin < 0)
			{ return 0; }

			let tmTime = new Date();
			//年
			tmTime.setFullYear(this.iYearBegin);
			//月
			tmTime.setMonth(this.iMonthBegin);
			//日
			tmTime.setDate(this.iCustomType == 0 ? this.iBegin : 0);
			//时
			tmTime.setHours(this.iHourBegin);
			//分
			tmTime.setMinutes(this.iMinuteBegin);
			return tmTime.getTime();
		}

		/** 获得配置结束时间 */
		public getDateTimeEnd(): number
		{
			if (this.iYearEnd < 0 || this.iMonthEnd < 0)
			{ return 0; }

			let tmTime = new Date();
			//年
			tmTime.setFullYear(this.iYearEnd);
			//月
			tmTime.setMonth(this.iMonthEnd);
			//日
			tmTime.setDate(this.iCustomType == 0 ? this.iEnd : 0);
			//时
			tmTime.setHours(this.iHourEnd);
			//分
			tmTime.setMinutes(this.iMinuteEnd);

			return tmTime.getTime();
		}

		/** 本次开始时间 */
		public getStartTime(tTime: number, openServerTime?: number): number
		{
			let currDate = new Date(tTime);
			let tmpYear = currDate.getFullYear();
			let tmpMonth = currDate.getMonth();
			let tmpDay = currDate.getDate();
			let tmpWeek = currDate.getDay();
			let tmpHour = currDate.getHours();
			let tmpMinute = currDate.getMinutes();

			if (this.iYearBegin > 0)
			{
				tmpYear = this.iYearBegin;
			}
			if (this.iMonthBegin > 0)
			{
				tmpMonth = this.iMonthBegin;
			}
			if (this.iCustomType == 0)
			{
				tmpDay = this.iBegin;
			} else if (this.iCustomType == 1)
			{ //指定周x
				var cut = (this.iBegin - tmpWeek);
				if (cut < 0 && !this.isInOpenTime(tTime, openServerTime)) { cut += 7; } //还未开启时，切到下一周开启时间
				tmpDay += cut;
			} else if (this.iCustomType == 2)
			{ //指定开服天数
				let passDay = Math.ceil((tTime - openServerTime) / (24 * 3600 * 1000));
				tmpDay += (this.iBegin - passDay);
			}
			tmpHour = this.iHourBegin;
			tmpMinute = this.iMinuteBegin;

			currDate.setFullYear(tmpYear, tmpMonth, tmpDay);
			currDate.setHours(tmpHour, tmpMinute, 0, 0);

			return currDate.getTime();
		}

		/** 本次结束时间 */
		public getEndTime(tTime: number, openServerTime?: number): number
		{
			let currDate = new Date(tTime);
			let tmpYear = currDate.getFullYear();
			let tmpMonth = currDate.getMonth();
			let tmpDay = currDate.getDate();
			let tmpWeek = currDate.getDay();
			let tmpHour = currDate.getHours();
			let tmpMinute = currDate.getMinutes();

			if (this.iYearEnd > 0)
			{
				tmpYear = this.iYearEnd;
			}
			if (this.iMonthEnd > 0)
			{
				tmpMonth = this.iMonthEnd;
			}

			//有具体结束的天数
			if (this.iCustomType == 0)
			{
				tmpDay = this.iEnd;
			}
			else if (this.iCustomType == 1)
			{
				//指定周x
				var cut = (this.iEnd - tmpWeek);
				if (cut < 0)
				{
					cut += 7;
				} //下周
				tmpDay += cut;
			} else if (this.iCustomType == 2)
			{
				//指定开服天数
				let passDay = Math.ceil((tTime - openServerTime) / (24 * 3600 * 1000));
				tmpDay += (this.iEnd - passDay);
			}
			else if (this.iHourEnd == 0)
			{
				//没有，那就直接显示今天的完结时间
				tmpDay += 1;
			}

			tmpHour = this.iHourEnd;
			tmpMinute = this.iMinuteEnd;

			currDate.setFullYear(tmpYear, tmpMonth, tmpDay);
			currDate.setHours(tmpHour, tmpMinute, 0, 999);

			if(tmpHour == 24)
			{
				return currDate.getTime() - 1000;
			}
			return currDate.getTime()
		}

		/** 是否到达时间 */
		public isInOpenTime(tTime: number, openServerTime?: number): boolean
		{
			let currDate = new Date(tTime);
			// let tmpYear = currDate.getFullYear();
			// let tmpMonth = currDate.getMonth();
			// let tmpDay = currDate.getDate();
			let tmpWeek = currDate.getDay();
			let tmpHour = currDate.getHours();
			let tmpMinute = currDate.getMinutes();

			//周检测
			if (this.iCustomType == 1 && !this.isWeekRange(tmpWeek))
			{
				return false;
			}

			//开服检测
			if (this.iCustomType == 2)
			{
				let passDay = Math.ceil((tTime - openServerTime) / (24 * 3600 * 1000));
				if (!this.isOpenSerRange(passDay))
				{
					return false;
				}
			}

			if (this.iCustomType == 0)
			{
				let start = new Date();
				let end = new Date();

				start.setFullYear(this.iYearBegin, this.iMonthBegin, this.iBegin);
				start.setHours(this.iHourBegin, this.iMinuteBegin, 0, 0);

				end.setFullYear(this.iYearEnd, this.iMonthEnd, this.iEnd);
				end.setHours(this.iHourEnd, this.iMinuteEnd, 0, 999);

				if (tTime < start.getTime() || tTime > end.getTime())
				{
					return false;
				}
			}

			//具体时间事件检测
			if (this.iHourBegin < 0 || this.iHourEnd <= 0)
			{
				return true;
			}
			let beginMin = this.iHourBegin * 60 + this.iMinuteBegin;
			let endMin = this.iHourEnd * 60 + this.iMinuteEnd;
			let curMin = tmpHour * 60 + tmpMinute;
			if (beginMin > endMin)
			{
				//有跨天的情况,
				if (curMin > beginMin && curMin < endMin)
				{
					return false;
				}
			}
			else
			{
				if (curMin < beginMin || curMin > endMin)
				{
					return false;
				}
			}
			return true;
		}

		//-------------------------------------------------------------
		//------------------------------ 从字符串读取数据

		public static parseList(str: string): StDateTimeInfo[]
		{
			let ret = [];
			var arr = str.split(";");
			for (var subStr of arr)
			{
				if (!subStr) { continue; }
				ret.push(this.parse(subStr));
			}
			return ret;
		}

		public static parse(str: string): StDateTimeInfo
		{
			//[*/年/年-年][*/月/月-月][[*/日-日]/[w周,w周]]/[w周-w周]/[s开服,s开服]/[s开服-s开服]][时间-时间]
			if (!str)
			{
				return null;
			}


			let tmpList = str.split("]");
			for (let i = 0; i < tmpList.length; i++)
			{
				tmpList[i] = tmpList[i].replace("[", "");
			}

			let tmpInfo = new StDateTimeInfo();
			tmpInfo._timeStr = str;

			//年
			{
				let tmpStr = tmpList[0];
				if (tmpStr.indexOf("*") < 0)
				{
					if (tmpStr.indexOf("-") >= 0)
					{
						let tmpAry = tmpStr.split("-");
						tmpInfo.iYearBegin = parseInt(tmpAry[0]);
						tmpInfo.iYearEnd = parseInt(tmpAry[1]);
					}
					else
					{
						tmpInfo.iYearBegin = parseInt(tmpStr);
					}
				}
			}//end年

			//月
			{
				let tmpStr = tmpList[1];
				if (tmpStr.indexOf("*") < 0)
				{
					if (tmpStr.indexOf("-") >= 0)
					{
						let tmpAry = tmpStr.split("-");
						tmpInfo.iMonthBegin = parseInt(tmpAry[0]) - 1;
						tmpInfo.iMonthEnd = parseInt(tmpAry[1]) - 1;
					}
					else
					{
						tmpInfo.iMonthBegin = parseInt(tmpStr) - 1;
					}
				}
			}//end月

			//日/周/开服天数
			{
				let tmpStr = tmpList[2];

				if (tmpStr.indexOf("w") >= 0)
				{
					tmpInfo.iCustomType = 1;
				}
				else if (tmpStr.indexOf("s") >= 0)
				{
					tmpInfo.iCustomType = 2
				}
				else if (tmpStr.indexOf("*") < 0)
				{
					let tmpAry = tmpStr.split("-");
					tmpInfo.iBegin = parseInt(tmpAry[0]);
					tmpInfo.iEnd = parseInt(tmpAry[1]);
					tmpInfo.iCustomType = 0;
				} else
				{
					tmpInfo.iCustomType = -1;
				}

				if (tmpInfo.iCustomType > 0)
				{
					if (tmpStr.indexOf("-") >= 0)
					{
						let tmpAry = tmpStr.split("-");
						tmpInfo.iBegin = parseInt(tmpAry[0].substr(1));
						tmpInfo.iEnd = parseInt(tmpAry[1].substr(1));
					}
					else
					{
						let tmpAry = tmpStr.split(",");
						tmpAry.forEach(elment =>
						{
							let tmpNum = parseInt(elment.substr(1, 1));
							tmpInfo.iCustomDay += Global.initBit(tmpNum);
						});
						//同样记录首尾，便于查询活动开始与结束时间
						tmpInfo.iBegin = parseInt(tmpAry[0].substr(1, 1));
						tmpInfo.iEnd = parseInt(tmpAry[tmpAry.length - 1].substr(1, 1));
					}
				}
			}//end日/周/开服

			//时间段
			{
				let tmpStr = tmpList[3];
				let tmpAry = tmpStr.split("-");
				{
					let tmpTimeAry = tmpAry[0].split(":");
					tmpInfo.iHourBegin = parseInt(tmpTimeAry[0]);
					tmpInfo.iMinuteBegin = parseInt(tmpTimeAry[1]);
				}
				{
					let tmpTimeAry = tmpAry[1].split(":");
					tmpInfo.iHourEnd = parseInt(tmpTimeAry[0]);
					tmpInfo.iMinuteEnd = parseInt(tmpTimeAry[1]);
				}
			}//end时间段

			return tmpInfo;
		}
	}
}
