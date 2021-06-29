/*
*  flyani动画管理
* name;
*/
class FlyAniManager
{
    private static _instance: FlyAniManager;

    public static get instace(): FlyAniManager
    {
        if (this._instance == null)
        {
            this._instance = new FlyAniManager();
        }
        return this._instance;
    }

    private _hpNumFlyAni: FlySequenceAni;
    private _buffNameFluAni: FlySequenceAni;
    private _dieAni: FlySequenceAni;

    constructor()
    {

    }

    private get hpNumFlyAni(): FlySequenceAni
    {
        if (this._hpNumFlyAni == null)
        {
            this._hpNumFlyAni = new FlySequenceAni();
            this._hpNumFlyAni.add(new FlyAniProp({ alpha: 1 }, 0.01));
            this._hpNumFlyAni.addScaleTo(0.1, 3);
            this._hpNumFlyAni.addScaleTo(0.2, 1.2);
            this._hpNumFlyAni.addScaleTo(0.2, 1.2);
            // this._hpNumFlyAni.addScaleTo(0.09, 1.2);
            this._hpNumFlyAni.add(new FlyAniProp({}, 0.1));
        }
        return this._hpNumFlyAni;
    }


    private get buffNameAni(): FlySequenceAni
    {
        if (this._buffNameFluAni == null)
        {
            this._buffNameFluAni = new FlySequenceAni();
            this._buffNameFluAni.add(new FlyAniProp({ alpha: 1, scaleX: 1.1, scaleY: 1.1, y: -120 }, 500));
            this._buffNameFluAni.add(new FlyAniProp({ alpha: 0.3, scaleX: 0.7, scaleY: 0.7, y: -200 }, 400));
        }
        return this._buffNameFluAni;
    }


    private get dieAni(): FlySequenceAni
    {


        if (this._dieAni == null)
        {
            this._dieAni = new FlySequenceAni();
            this._dieAni.add(new FlyAniProp({ alpha: 0.3 }, 100, 0, Laya.Ease.linearIn));
            this._dieAni.add(new FlyAniProp({ alpha: 0.7 }, 100, 0, Laya.Ease.linearIn));
            this._dieAni.add(new FlyAniProp({ alpha: 0.3 }, 100, 0, Laya.Ease.linearIn));
            this._dieAni.add(new FlyAniProp({ alpha: 0.7 }, 100, 0, Laya.Ease.linearIn));
            this._dieAni.add(new FlyAniProp({ alpha: 0.3 }, 100, 0, Laya.Ease.linearIn));
        }
        return this._dieAni;
    }

    public showHpNumFlyAni(target: any, callBack: CallBack): void
    {
        var flySequenceAni = new FlySequenceAni();
        this.hpNumFlyAni.copyAni(flySequenceAni)
        flySequenceAni.startWith(target, 1, callBack)
    }


    public showBattleAttackText(target: any, callBack: CallBack): void
    {
        var flySequenceAni = new FlySequenceAni();
        this.hpNumFlyAni.copyAni(flySequenceAni)
        flySequenceAni.startWith(target, 1, callBack)
    }


    public showDieAni(target: any, speed: number, callBack: CallBack): void
    {
        var flySequenceAni = new FlySequenceAni();
        this.dieAni.copyAni(flySequenceAni)
        flySequenceAni.startWith(target, speed, callBack);
    }


    public showBuffNameAni(target: any, callBack: CallBack): void
    {
        var flySequenceAni = new FlySequenceAni();
        this.buffNameAni.copyAni(flySequenceAni)
        flySequenceAni.startWith(target, 1, callBack);
    }


}