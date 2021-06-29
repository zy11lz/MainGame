
module Pro
{
	/**
	 * 挂机场景地图
	 */
	export class HookMapLongLayer extends Laya.Sprite
	{
		public spPath = "";
		private moveSpeed = 5;
		private spStartIndex = 1;
		private spEndIndex = 1;
		private spWidth = 0;
		private spList: Array<Laya.Image> = [];

		private WinSize: Laya.Point = new Laya.Point(GameConfig.WinWidth, GameConfig.WinHeight);

		constructor(url: string, speed = 5, spWidth: number)
		{
			super();

			this.spWidth = spWidth;
			this.moveSpeed = speed;
			this.spPath = url;

			this.on(Laya.Event.ADDED, this, () =>
			{
				this.WinSize = new Laya.Point(GameConfig.curWidth(), GameConfig.curHeight());
			});
		}

		public doLogic()
		{
			let index = 0;
			while (index < this._children.length)
			{

				let element = this._children[index];
				element.x -= this.moveSpeed;

				//向前移动
				if (this.moveSpeed > 0)
				{
					let rightX = element.x + this.spWidth;
					if (rightX < this.WinSize.x && !element["isOut"])
					{

						element["isOut"] = true;

						let tmpSp = this.createSp();
						tmpSp.x = rightX + this.moveSpeed;
						this.addChild(tmpSp);

						this.spStartIndex++;
						if (this.spStartIndex > this.spEndIndex)
						{
							this.spStartIndex = 1;
						}

						index++;
					}
					else if (rightX < 0)
					{
						this.cycleSp(element, index);
					}
					else
					{
						index++;
					}
				}//向后移动
				else
				{
					if (element.x > 0 && !element["isOut"])
					{

						element["isOut"] = true;

						let tmpSp = this.createSp();
						this.addChild(tmpSp);

						this.spStartIndex--;
						if (this.spStartIndex <= 0)
						{
							this.spStartIndex = this.spEndIndex;
						}

						index++;
					}
					else if (element.x > this.WinSize.x)
					{
						this.cycleSp(element, index);
					}
					else
					{
						index++;
					}
				}
			}

			if (this.numChildren == 0)
			{

				let tmpNum = Math.ceil(this.WinSize.x / this.spWidth);
				for (let i = 0; i < tmpNum; i++)
				{
					let tmpSp = this.createSp();
					this.addChild(tmpSp);
					tmpSp.x = this.spWidth * i;

					this.spStartIndex++;
					if (this.spStartIndex > this.spEndIndex)
					{
						this.spStartIndex = 1;
					}
				}
			}
		}

		private createSp(): Laya.Image
		{
			let tmpSp: Laya.Image = this.spList.pop();
			if (tmpSp == null)
			{
				tmpSp = new Laya.Image(this.spPath);//Global.FormatString(this.spPath,this.spKey,this.spStartIndex));
			}
			else
			{
				tmpSp.skin = this.spPath;//Global.FormatString(this.spPath,this.spKey,this.spStartIndex);
			}
			return tmpSp;
		}

		private cycleSp(sp: Laya.Image, index: number)
		{

			sp.removeSelf();
			this.spList.push(sp);
			sp["isOut"] = false;
		}

		public cycleRes()
		{
		}

		public cleanUp(): void
		{
			this.removeChildren();
			this.spList = [];
			Laya.loader.clearTextureRes(this.spPath);
		}
	}
}