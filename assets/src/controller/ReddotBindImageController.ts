module Pro
{
    /** 红点组合控制器， 可用于在同一个UI中，将多个红点图片与红点数据模型关联起来， 简化代码逻辑
     * UI打开和关闭时，对此控制器进行开合，可实现一键操作所有红点事件
     * @author jason.xu
     */
    export class ReddotBindImageController
    {
        private _reddotModels: RedDotModel[] = [];
        private _reddotMapImg = new ds.StringMap<Laya.Sprite>();

        /** 将红点图片与红点数据模型关联起来， 图片的显示，将自动与红点数据对应 */
        public bind(img: Laya.Sprite, reddotModel: RedDotModel): RedDotModel
        {
            if (!reddotModel || !img || this._reddotMapImg.get(reddotModel.sn)) { return reddotModel; }
            this._reddotModels.push(reddotModel);
            this._reddotMapImg.put(reddotModel.sn, img);
            img["$reddotVisible"] = img.visible = reddotModel.isRedDot;
            reddotModel.on(Laya.Event.CHANGE, this, this.onChangeRedDot);
            return reddotModel;
        }
        /** 将红点图片与红点数据模型关联起来， 图片的显示，将自动与红点数据对应 */
        public bindList(img: Laya.Sprite, ...reddotModels: RedDotModel[]): RedDotModel
        {
            let len = reddotModels.length;
            let tempModel = new RedDotModel(false);
            for (var i = 0; i < len; i++)
            {
                let el = reddotModels[i];
                if (el) { tempModel.addChildModel(i, el); }
            }
            return this.bind(img, tempModel);
        }
        /** 红点状态变化回调 */
        private onChangeRedDot(reddotModel: RedDotModel): void
        {
            let img = this._reddotMapImg.get(reddotModel.sn);
            img["$reddotVisible"] = img.visible = reddotModel.isRedDot;
        }

        public cleanUp(): void
        {
            for (var model of this._reddotModels)
            {
                model.off(Laya.Event.CHANGE, this, this.onChangeRedDot);
                if (!model.isInstance) { model.destroy(false); }
            }
            this._reddotModels = [];
            this._reddotMapImg = new ds.StringMap<Laya.Sprite>();
        }

        public getReddotMapImg(sn:number)
        {
            if(!this._reddotMapImg)
                return null;
            return this._reddotMapImg[sn];
        }

    }

}