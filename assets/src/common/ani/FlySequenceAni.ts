/**
 * 序列动画
 */
class FlySequenceAni
{
    private arr: FlyAniProp[] = [];
    private execArr: FlyAniProp[];
    private callBack: CallBack;
    private target: any;
    private isRuning: boolean;
    private speed: number = 1;

    constructor()
    {
    }

    public startWith(target: any, speed: number, callBack: CallBack)
    {
        if (target == null)
        {
            if (callBack)
            {
                callBack.call();
            }
            return;
        }
        this.speed = speed;
        if (this.isRuning)
        {
            throw new Error("ani is running");
            // return;
        }
        this.execArr = this.arr.concat();
        this.callBack = callBack;
        this.target = target;
        this.run();
    }

    private run()
    {
        if (this.execArr.length)
        {
            var info = this.execArr.shift();
            Laya.Tween.to(this.target, info.propObj, info.duration * this.speed, info.easeFunc, Laya.Handler.create(this, this.run), info.delay);
        } else
        {
            this.isRuning = false;
            if (this.callBack)
            {
                this.callBack.call();
            }
        }
    }

    public reset()
    {
        this.arr.length = 0;
    }

    public add(ani: FlyAniProp)
    {
        this.arr.push(ani);
    }

    public addScaleTo(duiation: number, sx: number, sy: number = null, delay: number = 0, easeFunc: Function = null)
    {
        var prop: any = {};
        prop.scaleX = sx;
        if (sy == null)
        {
            prop.scaleY = sx;
        } else
        {
            prop.scaleY = sy;
        }
        var ani: FlyAniProp = new FlyAniProp(prop, duiation, delay, easeFunc)
        this.arr.push(ani);
    }

    public copyAni(target: FlySequenceAni)
    {
        target.arr = this.arr;
    }
}