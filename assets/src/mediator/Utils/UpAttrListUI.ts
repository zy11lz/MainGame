module Pro
{
	/**
     * 属性提升提示（生命 +100...）
     */
    export class UpAttrListUI extends Laya.Box
    {
        constructor()
        {
            super();
            this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
        }

        //外层的界面被隐藏时，释放资源
        private onUnDisplay(e): void
        {
            this.cleanUp();
        }


        /** 这个视图，只要是极少的情况下才会显示，所以 
         * 将视图分离开，保证资源在不需要用到时候不加载。 */
        private _view: ProUI.Utils.UpAttrlistUI;
        /** 加载状态 0未加载 1-加载中 2-加载完成 */
        private _loadState = 0;
        private _addAttrList: number[][];
        /** 要加载的资源 */
        private _atlas: string;

        /** 显示属性变化
         * @param addAttrList [attrType, changeValue][]
         */
        public show(addAttrList: number[][]): void
        {
            this._addAttrList = addAttrList;
            if (this._view) this.__showView();
            else if (this._loadState == 0)
            {
                this._loadState = 1;
                if (!this._atlas) this._atlas = UrlMgr.getAtlas('upAttr');

                //托管加载
                ResMgr.Inst.load([this._atlas], this, this.onLoadComplate);
            }
        }

        private hide(): void
        {
            if (this._view) this._view.visible = false;
        }

        /** 加载完成 */
        private onLoadComplate(statue: boolean): void
        {
            //加载成功
            if (statue == true)
            {
                ResMgr.Inst.addAtlasReference([this._atlas]);
                if (this._loadState == 0)
                { //释放资源
                    this.releaseLoadRes();
                    return;
                }
                if (this._view) logE("error!");
                this._view = new ProUI.Utils.UpAttrlistUI();
                this.addChild(this._view);
                this.__showView();
            }//加载失败
            else
            {
                this._loadState == 0;
                TipsUtils.showTipsByLanId("tips_msg12");
            }

        }

        private __showView(): void
        {
            let listView = this._view;
            Laya.Tween.clearTween(listView);
            listView.visible = true;
            listView.alpha = 1;
            listView.x = 0;
            listView.y = 0;
            Laya.Tween.from(listView, { alpha: 0.4, x: -75 }, 100, null, null);
            Laya.Tween.to(listView, { alpha: 0, y: -30 }, 220, null, Laya.Handler.create(this, this.hide, null, true), 1000);

            let addAttrList = this._addAttrList;
            //[attrType, changeValue][]
            listView.onRefresh(addAttrList.length, this, (box: Laya.Box, index: number) =>
            {
                //[attrType, changeValue]                
                let attrType = addAttrList[index][0];
                let changeValue = addAttrList[index][1];
                let frameImg = box.getChildByName("frameTitle") as component.UIFrameImage;
                let txtValue = box.getChildByName("txtValue") as component.UIBitmapText;
                txtValue.text = "+" + changeValue;
                frameImg.frame = attrType;
            });
        }



        private cleanUp(): void
        {
            if (this._view) this._view.destroy(true);
            this._view = null;
            Laya.Tween.clearTween(this._view);
            if (this._loadState == 2)
            { //释放资源
                this.releaseLoadRes();
            }
            this._loadState = 0;
        }

        private releaseLoadRes(): void
        {
            ResMgr.Inst.cutAtlasReference([this._atlas]);
        }

    }
}