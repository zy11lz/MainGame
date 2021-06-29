module Pro
{

	/*
	 * 屏蔽字库逻辑提供
	 */
	export class FilterHelper
	{

		private static _inst: FilterHelper;
		public static get Inst(): FilterHelper
		{
			if (FilterHelper._inst == null)
			{
				FilterHelper._inst = new FilterHelper();
			}

			return FilterHelper._inst;
		}

		private filterWordStList: Array<string> = [];
		private symbolStrList: Array<string> = [];


		constructor()
		{

		}

		public init()
		{
			// let FilterPath = "res/OtherData/FilterRes/Default.txt";
			let FilterPath = "res/OtherData/FilterRes/Default.dat";
			ResMgr.Inst.load(FilterPath, this, this.onTextLoadComplete, null, Laya.Loader.BUFFER);
			this.symbolStrList = ["闪光小精灵"].concat("`<,>/\f\n\r\t\v".split(""));
			for (let i = 0; i < this.symbolStrList.length; i++)
			{
				let element = this.symbolStrList[i].toLowerCase();
				this.symbolStrList[i] = element;
			}
		}

		onTextLoadComplete(statue: boolean, param: any, data: ArrayBuffer)
		{
			var byte: fly.net.ByteArray = new fly.net.ByteArray();
			byte.writeArrayBuffer(data);
			byte.uncompress();
			byte.position = 0;
			this.filterWordStList = byte.readObject();
		}

		/**
		 * 判断是否包含屏蔽字符
		 */
		public containStr(input: string, isCheckSymbol: boolean = true): boolean
		{
			if (!input)
			{
				return false;
			}
			input = input.toLowerCase();
			//屏蔽词中间打空格或者字符&，如果能显示的，属违规。
			input = input.replace(/ */g, ""); //去掉空格，再去匹配。
			if (isCheckSymbol)
			{
				for (let i = 0; i < this.symbolStrList.length; i++)
				{
					let element = this.symbolStrList[i];
					if (element.length > 0 && input.indexOf(element) >= 0)
					{
						return true;
					}
				}
			}

			for (let i = 0; i < this.filterWordStList.length; i++)
			{
				let element = this.filterWordStList[i];
				if (element.length > 0 && input.indexOf(element) >= 0)
				{
					return true;
				}
			}

			return false;
		}
	}
}