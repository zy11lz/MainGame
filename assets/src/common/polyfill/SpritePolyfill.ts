class SpritePolyfill
{
    static setup()
    {
        this.polyRoation();
    }

    static polyRoation()
    {
        Object.defineProperty(Laya.Sprite.prototype, "rotation", {
            get: function ()
            {
                let a = 1;
                return this._style.rotation;
            },
            set: function (value)
            {
                var style = this.getStyle();
                if(style)
                {
                    if (style.rotation !== value)
                    {
                        this._setRotation(value);
                        this._setTranformChange();
                    }
                }
            }
        })
    }

}
