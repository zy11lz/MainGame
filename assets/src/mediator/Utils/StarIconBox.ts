module Pro
{
    /** 显示英雄、道具星级显示的组件。
     * box内有元件定义有：
     *  starListView(UIItemBox)  用于显示多个星星列表 10星以下显示
     *  imgFrameSuperStarBg(UIFrameImage) 超级星星显示背景,10星及以上显示  
     *  imgFrameSuperStar(UIFrameImage) 超级星星,10星及以上显示，只显示一个，切换skin显示
    * @author jason.xu
     */
    export class StarIconBox extends Laya.Box
    {
        constructor()
        {
            super();
        }

        private _starNum = 0;
        private _grayState = 0;
        /**
         * 设置星级显示(参数有传入-1时，表示该值不做修改，保持原状)
         * @param value 星级
         * @param grayState 星星置灰显示（0-不置灰 1-置灰  -1表示保持原状）（native环境无法将外部的box壳置灰，所以只能传进来处理）
         */
        public setStar(value: number = -1, grayState: number = -1): void
        {
            if (value == -1) value = this._starNum; //特殊值处理
            if (grayState == -1) grayState = this._grayState; //特殊值处理
            if (this._starNum == value && this._grayState == grayState) return;
            this._starNum = value;
            this._grayState = grayState;
            let starListView = this.getChildByName("starListView") as component.UIItemBox;
            let imgFrameSuperStarBg = this.getChildByName("imgFrameSuperStarBg") as component.UIFrameImage;
            let imgFrameSuperStar = this.getChildByName("imgFrameSuperStar") as component.UIFrameImage;
            if (starListView)
            {
                starListView.visible = value < 10; //10星以下显示列表
                if (starListView.visible)
                {
                    let starFrameIndex = value > 5 ? 2 : 1;
                    let starNum = value > 5 ? value - 5 : value;
                    starListView.onRefresh(starNum, this, (img: component.UIFrameImage, index: number) =>
                    {
                        img.frame = starFrameIndex;
                        img.gray = grayState == 1;
                    });
                }
            }
            if (value >= 10)
            {
                if (imgFrameSuperStarBg)
                {
                    imgFrameSuperStarBg.frame = value + 1 - 10;
                    imgFrameSuperStarBg.visible = false;
                    imgFrameSuperStarBg.gray = grayState == 1;
                }
                if (imgFrameSuperStar)
                {
                    imgFrameSuperStar.frame = value + 1 - 10;
                    imgFrameSuperStar.visible = true;
                    imgFrameSuperStar.gray = grayState == 1;
                }
            } else
            {
                if (imgFrameSuperStarBg) imgFrameSuperStarBg.visible = false;
                if (imgFrameSuperStar) imgFrameSuperStar.visible = false;
            }
        }
    }
}
