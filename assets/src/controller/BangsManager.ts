/**
* 刘海屏处理
*/

module Pro{


	export class BangsManager{

		private static _inst: BangsManager;
		public static get Inst(): BangsManager
		{
			if (BangsManager._inst == null)
			{
				BangsManager._inst = new BangsManager();
			}

			return BangsManager._inst;
		}
		constructor()
		{

		}
		//需要确保LayerManager已经初始化完成
		public init()
		{
			if (GameConfig.isBangs)
			{
				this.addBlackBarFillBang();

			}
		}

		/**
		 * 加黑色底
		 * @private
		 */
		private addBlackBarFillBang()
		{
			let sprite = new Laya.Sprite();
			sprite.graphics.drawRect(0,0,Laya.stage.width,GameConfig.getBangsTop() ,0);
			Laya.stage.addChild(sprite);
		}
	}
}