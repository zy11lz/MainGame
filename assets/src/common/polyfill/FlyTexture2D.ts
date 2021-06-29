/**
* name
*/
module Pro
{
	export class FlyTexture2D extends Pro.Texture2D
	{
		private static memeryMap: ds.StringMap<number>;

		public static isShowDebugInfo: boolean = true;

		private _shortName: string = "";
		constructor(width: number = 0, height: number = 0,
			format: Laya.TextureFormat = Laya.TextureFormat.R8G8B8A8,
			mipmap: boolean = true,
			canRead: boolean = false)
		{
			super(width, height, format, mipmap, canRead);
		}

		_setCreateURL(url: string)
		{
			super._setCreateURL(url);
			if (!GlobalData.isRelease && FlyTexture2D.isShowDebugInfo)
			{
				var value = (this.width * this.height * 4)
				value = Math.floor(value / (1024 * 1024) * 100) / 100
				var pathArr: String[] = url.split("/res/")
				pathArr.shift();
				this._shortName = pathArr.join("/");
				// logI(this._shortName +  " ->新增显存:" + value + "MB " + this.width + "*" + this.height);
				FlyTexture2D.adMemery(this._shortName, value);
			}
		}

		destroy()
		{
			if (!GlobalData.isRelease && FlyTexture2D.isShowDebugInfo)
			{
				if (this["_destroyed"] == false)
				{
					logI(this._shortName)
					FlyTexture2D.removeMemery(this._shortName);
				}
			}
			super.destroy();
		}


		static adMemery(url: string, value: number)
		{
			if (this.memeryMap == null)
			{
				this.memeryMap = new ds.StringMap<number>();
			}
			this.memeryMap.put(url, value);
		}

		static removeMemery(url: string)
		{
			if (this.memeryMap != null)
			{
				this.memeryMap.remove(url);
			}
		}
	}
}