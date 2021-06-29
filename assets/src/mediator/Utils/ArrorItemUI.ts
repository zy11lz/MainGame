
module Pro
{

	export class ArrorItemUI extends ProUI.Utils.ArrowItemUI
	{

		/** 按钮触发事件 */
		private caller: any;
		private listener: Function;

		/** 绑定的操作元素 */
		private bildList: component.UIList;

		constructor()
		{
			super();

			this.ArrLeftBtn.onClick(this, this.onBtnCalled);
			this.ArrRightBtn.onClick(this, this.onBtnCalled);
			this.ArrLeftRedDotImg.visible = false;
			this.ArrRightRedDotImg.visible = false;
		}

		/**
		 * 刷新
		 */
		public refreshUI()
		{
			if (this.bildList != null)
			{
				this.onUIListScroll(this.bildList.scrollBar.value);
			}
		}

		/**
		 * 绑定UIList
		 */
		public onBlidUIList(list: component.UIList)
		{

			this.bildList = list;
			this.bildList.scrollBar.changeHandler = new Laya.Handler(this, this.onUIListScroll);
		}

		/**
		 * UIlist滚动按钮状态刷新
		 */
		private onUIListScroll(proNum: number)
		{
			this.ArrLeftRedDotImg.visible = false;
			this.ArrRightRedDotImg.visible = false;

			let firstData = this.bildList.array[0];
			let needRedDot = firstData != null && firstData.redDot != null;
			if (needRedDot)
			{
				for (let i = this.bildList.startIndex - 1; i > 0; i--)
				{
					if (this.bildList.array[i].redDot)
					{
						this.ArrLeftRedDotImg.visible = true;
						break;
					}
				}
				for (let i = this.bildList.startIndex + this.bildList.getNumOfCol() + 1; i < this.bildList.length; i++)
				{
					if (this.bildList.array[i].redDot)
					{
						this.ArrRightRedDotImg.visible = true;
						break;
					}
				}
			}

			this.ArrLeftBtn.disabled = proNum <= this.bildList.scrollBar.min;
			this.ArrRightBtn.disabled = proNum >= this.bildList.scrollBar.max;
		}

		/**
		 * 绑定按钮事件,返回值0:按下左边的按钮，1:按下右边的按钮
		 */
		public onClick(caller: any, listener: Function)
		{
			this.caller = caller;
			this.listener = listener;
		}

		/** 
		 * 按钮操作
		 */
		private onBtnCalled(btn: component.UIButton)
		{
			let isLeftBtn = btn == this.ArrLeftBtn;

			if (this.listener != null)
			{
				this.listener.call(this.caller, [isLeftBtn ? 0 : 1]);
			}

			if (this.bildList != null)
			{

				let numOfCol = this.bildList.getNumOfCol();
				let totolPage = this.bildList.getTotolPage();

				//翻页逻辑
				let nextpage = this.bildList.getCurrentPage() + (isLeftBtn ? -1 : 1);
				if (nextpage < 0)
				{
					nextpage = 0;
				}
				if (nextpage > totolPage)
				{
					nextpage = totolPage - 1;
				}
				this.bildList.tweenTo(nextpage * numOfCol);
			}
		}
	}

}