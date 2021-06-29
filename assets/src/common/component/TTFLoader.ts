/**
* name 
*/
module Pro
{
	/**
 * @private
 */
	export class TTFLoader
	{
		private static _testString: string = "LayaTTFFont";
		fontName: string;
		complete: Laya.Handler | null;
		err: Laya.Handler | null;
		private _fontTxt: string;
		private _url: string;
		private _div: any;
		private _txtWidth: number;
		private _http: Laya.HttpRequest | null;

		//TODO:coverage
		load(fontPath: string): void
		{
			this._url = fontPath;
			var tArr: any[] = fontPath.split(".ttf")[0].split("/");
			this.fontName = tArr[tArr.length - 1];
			if (Laya.Render.isConchApp)
			{
				this._loadConch();
			} else
				if ((window as any).FontFace)
				{
					this._loadWithFontFace()
				}
				else
				{
					this._loadWithCSS();
				}
		}

		//TODO:coverage
		private _loadConch(): void
		{
			this._http = new Laya.HttpRequest();
			this._http.on(Laya.Event.ERROR, this, this._onErr);
			this._http.on(Laya.Event.COMPLETE, this, this._onHttpLoaded);
			this._http.send(this._url, null, "get", Laya.Loader.BUFFER);
		}

		//TODO:coverage
		private _onHttpLoaded(data: any = null): void
		{
			window["conchTextCanvas"].setFontFaceFromBuffer(this.fontName, data);
			this._clearHttp();
			this._complete();
		}

		//TODO:coverage
		private _clearHttp(): void
		{
			if (this._http)
			{
				this._http.off(Laya.Event.ERROR, this, this._onErr);
				this._http.off(Laya.Event.COMPLETE, this, this._onHttpLoaded);
				this._http = null;
			}
		}

		//TODO:coverage
		private _onErr(): void
		{
			this._clearHttp();
			if (this.err)
			{
				this.err.runWith("fail:" + this._url);
				this.err = null;
			}
		}

		//TODO:coverage
		private _complete(): void
		{
			Laya.systemTimer.clear(this, this._complete);
			Laya.systemTimer.clear(this, this._checkComplete);
			if (this._div && this._div.parentNode)
			{

				this._div.parentNode.removeChild(this._div);
				this._div = null;
			}
			if (this.complete)
			{
				this.complete.runWith(this);
				this.complete = null;
			}
		}

		//TODO:coverage
		private _checkComplete(): void
		{
			if (Laya.Browser.measureText(TTFLoader._testString, this._fontTxt).width != this._txtWidth)
			{
				this._complete();
			}
		}

		//TODO:coverage
		private _loadWithFontFace(): void
		{
			var fontFace: any = new (window as any).FontFace(this.fontName, "url('" + this._url + "')");
			(document as any).fonts.add(fontFace);
			var self: TTFLoader = this;
			fontFace.loaded.then((function (): void
			{
				self._complete()
			}));
			//_createDiv();
			fontFace.load();

		}

		//TODO:coverage
		private _createDiv(): void
		{
			this._div = Laya.Browser.createElement("div");
			this._div.innerHTML = "laya口";
			var _style: any = this._div.style;
			_style.fontFamily = this.fontName;
			_style.position = "absolute";
			_style.left = "-100px";
			_style.top = "-100px";
			document.body.appendChild(this._div);
		}

		//TODO:coverage
		private _loadWithCSS(): void
		{
			var fontStyle: any = Laya.Browser.createElement("style");
			fontStyle.type = "text/css";
			document.body.appendChild(fontStyle);
			fontStyle.textContent = "@font-face { font-family:'" + this.fontName + "'; src:url('" + this._url + "');}";
			this._fontTxt = "40px " + this.fontName;
			this._txtWidth = Laya.Browser.measureText(TTFLoader._testString, this._fontTxt).width;

			var self: TTFLoader = this;
			fontStyle.onload = function (): void
			{
				Laya.systemTimer.once(10000, self, self._complete);
			};
			Laya.systemTimer.loop(20, this, this._checkComplete);
			this._createDiv();
		}

	}
}