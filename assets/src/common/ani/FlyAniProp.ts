/**
 * 序列动画属性信息
 */
class FlyAniProp
{
    propObj: Object;
    duration: number;
    easeFunc: Function;
    delay: number = 0;

    constructor(propObj: Object, duration: number, delay: number = 0, easeFunc: Function = null)
    {
        this.propObj = propObj;
        this.duration = duration;
        if (duration < 10)
        {
            this.duration = duration * 1000;
        }
        this.easeFunc = easeFunc;
        this.delay = delay;
    }
}