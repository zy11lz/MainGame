/* eslint-disable no-console */
/**
* 所有基础数据
*/
module Pro
{


	export class CfgManger
	{

		private static _caller: any;

		private static _listener: any;
		public static configLoad(caller: any, listener: Function)
		{
			this._caller = caller;
			this._listener = listener;
			let cfgPath = UrlMgr.getConfigDataUrl();
			ResMgr.Inst.load(cfgPath, this, this.onCfgLoadComplete, null, Laya.Loader.BUFFER);
		}

		private static onCfgLoadComplete(statue: boolean, param: any, data: ArrayBuffer): void
		{
			if (data == null)
			{
				this._listener.apply(this._caller, [false]);
				return;
			}
			try
			{
				var byte: fly.net.ByteArray = new fly.net.ByteArray();
				byte.writeArrayBuffer(data);
				byte.uncompress();
				byte.position = 0;
				var obj = byte.readObject();
				cfg.ClientConfigManager.recClientConfig(obj);
				cfg.ClientConfigManager.setClientConfig();
				this._listener.apply(this._caller, [true]);
			} catch (error)
			{
				logE(error);
			}
		}
	}

}