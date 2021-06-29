/**
* name
*/
module Pro
{
	export class VersionControl
	{
		private static _ins: VersionControl;

		public static get ins(): VersionControl
		{
			if (VersionControl._ins == null)
			{
				VersionControl._ins = new VersionControl();
			}
			return VersionControl._ins;
		}

		private versionObj: Object;
		private _versionUrlMap: ds.StringMap<string>;
		constructor()
		{

		}

		init(versionObj: Object)
		{
			this.versionObj = versionObj;
			this._versionUrlMap = new ds.StringMap<string>();
		}

		private getVersionUrl(originURL: string): string
		{
			if (this.versionObj && this.versionObj.hasOwnProperty(originURL))
			{
				if (this._versionUrlMap.containsKey(originURL))
				{
					return this._versionUrlMap.get(originURL);
				}
				var versionNUm: number = this.versionObj[originURL];
				var arr: string[] = originURL.split(".");
				var fileName = arr.shift();
				var versionUrl = fileName + "_v_" + versionNUm + "." + arr.join(".");
				this._versionUrlMap.put(originURL, versionUrl);
				return versionUrl
			}
			return originURL;
		}

		public addVersionPrefix(originURL)
		{
			originURL = Laya.URL.getAdptedFilePath(originURL);
			var url = VersionControl.ins.getVersionUrl(originURL);
			return url;
		}
	}
}