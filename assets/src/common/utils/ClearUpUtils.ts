module InnerFly
{
    export class ClearupUtils
    {
        static clearAllTimer()
        {
            var _handlers = Laya.timer["_handlers"];
            for (var i: number = 0, n: number = _handlers.length; i < n; i++)
            {
                var handler = _handlers[i];
                Laya.timer.clearAll(handler.caller)
            }
        }


        static clearAllTween()
        {
            var tweenMap: Object = Laya.Tween["tweenMap"];
            for (const key in tweenMap)
            {

            }

            // var tweens: any[] = Laya.Tween["tweenMap"];//[target.$_GID];
            // if (tweens)
            // {
            //     for (var i: number = 0, n: number = tweens.length; i < n; i++)
            //     {
            //         tweens[i]._clear();
            //     }
            //     tweens.length = 0;
            // }
        }

    }

}
