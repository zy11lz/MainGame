
/**
* 
*  配置数据访问
*/
module cfg
{
	export class UiRoleSayCfgData extends UiRoleSayBaseCfgData
	{
		static sayTxtMap: ds.StringMap<string[]>;

		constructor()
		{
			super();
		}

		static getSayTxt(type: number)
		{
			var txtArr: string[] = this.getSayTxtArr(type);
			if (txtArr.length == 0) return "";
			var index = Global.getRandomNum(0, txtArr.length);
			var msg = txtArr[index];
			msg = msg == null ? "" : msg;
			return msg
		}

		public static getSayTxtArr(type: number)
		{
			if (this.sayTxtMap == null)
			{
				this.sayTxtMap = new ds.StringMap<string[]>();
			}
			var txtArr: string[] = this.sayTxtMap.get(type);
			if (txtArr == null)
			{
				var txt: string = this.getSayTxtByUiType(type);
				txtArr = txt.split("|");
				this.sayTxtMap.put(type, txtArr);
			}
			return txtArr;
		}
	}
}

