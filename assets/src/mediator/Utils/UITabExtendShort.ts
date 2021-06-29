module Pro
{
    /** UITab扩展小款
     * 该类为预置并非组件，可扩展性较低， 仅用于两端按钮为圆边异型的UITab处理，简化代码与UI编辑  
     */
	export class UITabExtendShort extends ProUI.Utils.UITabExtendShortUI
	{
		/** tab 绘制 */
		private renderCallerExtend: any;
		private renderRefreshExtend: Function;

		constructor()
		{
			super();
			super.onRenderRefresh(this, this.onItemTabRender);
		}

		/** 
		 * 禁用应用层渲染器触发函数， 否则将无效， 如有需要，再考虑扩展此方法。
		 * */
		public onRenderRefresh(caller: any, listener: Function)
		{
			super.onRenderRefresh(this, this.onItemTabRender);
			this.renderCallerExtend = caller;
			this.renderRefreshExtend = listener;
		}


		private onItemTabRender(itemUI: component.UIButton, index: number)
		{

			let tmpBGImg = itemUI.getChildByName("imgBg") as component.UIFrameImage;
			let tmpShowLb = itemUI.getChildByName("Text") as component.UILabel;
			let RedDotImg = itemUI.getChildByName("RedDotImg") as Laya.Image;
			let isSel = index == this.tabIndex;
			// if (index == 0)
			// {  //反转圆角按钮
			// 	tmpBGImg.frame = isSel ? 1 : 2;
			// 	tmpBGImg.scaleX = -1;
			// 	tmpShowLb.x = 48;
			// 	RedDotImg.x = 80;
			// }
			// else if (index == this._array.length - 1)
			// {
			// 	tmpBGImg.frame = isSel ? 1 : 2;
			// 	tmpBGImg.scaleX = 1;
			// 	tmpShowLb.x = 56;
			// 	RedDotImg.x = 100;
			// }
			// else
			// { //中间的使用长方形按钮
			// 	tmpBGImg.frame = isSel ? 3 : 4;
			// 	tmpBGImg.scaleX = 1;
			// 	tmpShowLb.x = 52;
			// 	RedDotImg.x = 80;
			// }

			tmpBGImg.frame = isSel ? 3 : 4;
			// tmpBGImg.scaleX = 1;
			// tmpShowLb.x = 52;
			// RedDotImg.x = 80;

			//刷新
			if (this.renderRefreshExtend != null)
			{
				this.renderRefreshExtend.apply(this.renderCallerExtend, [itemUI, index]);
			}
		}

	}
}