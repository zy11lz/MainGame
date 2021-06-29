module Pro
{
    //资源状态：未加载，加载中，加载完成，等待删除
    export enum ResStatus
    {
        NULL = -1,
        LOADING = 1,
        COMPLETE = 2,
        DELETE = 3,
        //等待加载完成后删除
        DELAYDELETE = 4,
    }

    export namespace ResEvent
    {
        export var RELEASE = "resrelease";
        export var LOADED = "resload";
        export var CLEAR = "resclear";
    }


    export abstract class ResBase extends Laya.EventDispatcher
    {
        protected _referenceCount: number = 0;
        protected _status: ResStatus = ResStatus.NULL;
        protected _url: string;
        protected _cacheTime: number = 3000;
        public retain()
        {
            this._referenceCount++;
        }
        public release()
        {
            this._referenceCount--;
            if (this._referenceCount <= 0)
            {
                this.event(ResEvent.RELEASE, this._url);
            }
        }

        public get status(): ResStatus
        {
            return this._status;
        }

        public get url(): string
        {
            return this._url;
        }

        public get ref(): number
        {
            return this._referenceCount;
        }
    }

    export class TempletBase extends ResBase
    {
        private _templet: Laya.Templet;
        private _retryCount: number = 0;
        private _aniDrrationMap: ds.StringMap<number>;
        constructor()
        {
            super();
            this._aniDrrationMap = new ds.StringMap<number>();
            this._templet = new Laya.Templet();
        }

        public load(resPath: string)
        {
            if (this._status != ResStatus.NULL)
            {
                return;
            }
            this._url = resPath;
            this._templet.on(Laya.Event.ERROR, this, this.onTempletError);
            this._templet.on(Laya.Event.COMPLETE, this, this.onTempletComplete);
            this._status = ResStatus.LOADING;
            this._templet.loadAni(resPath);
        }

        public destroy()
        {
            if (this._status == ResStatus.LOADING)
            {
                this._status = ResStatus.DELAYDELETE;
            } else
            {
                this._status = ResStatus.NULL;
                this._templet && this._templet.destroy();
                this._templet = null;
            }
        }

        private onTempletComplete()
        {
            if (this._status == ResStatus.LOADING)
            {
                this._status = ResStatus.COMPLETE;
                this.event(Laya.Event.COMPLETE, this._url);
                this.parseAni();
            } else if (this._status == ResStatus.DELAYDELETE)
            {
                this._status = ResStatus.COMPLETE;
                this.release();
            }
        }

        parseAni()
        {
            var anicnt = this._templet.getAnimationCount();
            for (let index = 0; index < anicnt; index++)
            {
                const aniName: string = this._templet.getAniNameByIndex(index);
                this._aniDrrationMap.put(aniName, this._templet.getAniDuration(index));
            }
        }

        private onTempletError()
        {
            logE("骨骼动画解析出错", this._url);
            return;
            // this._retryCount++;
            // this._templet.loadAni(this._url);
        }

        public getAniDurationByAniName(aniName: string): number
        {
            var duration = this._aniDrrationMap.get(aniName);
            if (duration == null)
            {
                duration = 200;
            }
            return duration
        }

        public get templet(): Laya.Templet
        {
            return this._templet;
        }

        public get status(): ResStatus
        {
            return this._status;
        }

        public set status(s: ResStatus)
        {
            if (s == ResStatus.DELETE && this._status == ResStatus.LOADING)
            {
                s = ResStatus.DELAYDELETE;
            }
            this._status = s;
        }
    }

    export class SkeletonManager
    {
        private _templetMap: ds.StringMap<TempletBase>;
        private _callbackMap: ds.StringMap<Laya.Handler[]>;
        private _delayDeleteMap: ds.StringMap<number>;
        private _cacheTime: number = 2;
        private static _instance: SkeletonManager = null;

        constructor()
        {
            this._templetMap = new ds.StringMap<TempletBase>();
            this._callbackMap = new ds.StringMap<Laya.Handler[]>();
            this._delayDeleteMap = new ds.StringMap<number>();
            Laya.timer.loop(1000, this, this.onLoop);
        }

        public static get Instance(): SkeletonManager
        {
            if (!SkeletonManager._instance)
            {
                SkeletonManager._instance = new SkeletonManager();
            }
            return SkeletonManager._instance;
        }

        public getSkeleton(resPath: string, callback: Laya.Handler): void
        {
            let templet: TempletBase = this.getTemplete(resPath);;
            var callBackArr: Laya.Handler[] = this.getCallBackArr(resPath);
            if (templet)
            {
                templet.retain();
                if (templet.status == ResStatus.NULL)
                {

                    templet.load(resPath);
                    callBackArr.push(callback);
                } else if (templet.status == ResStatus.LOADING)
                {
                    callBackArr.push(callback);
                    return;
                } else if (templet.status == ResStatus.DELAYDELETE)
                {
                    templet.status = ResStatus.LOADING;
                    callBackArr.push(callback);
                } else if (templet.status == ResStatus.DELETE)
                {
                    templet.status = ResStatus.COMPLETE;
                }
                if (templet.status == ResStatus.COMPLETE)
                {
                    callback.runWith(templet.templet);
                }
            } else
            {
                templet = new TempletBase();
                callBackArr.push(callback);
                templet.on(Laya.Event.COMPLETE, this, this.resLoadCallback);
                templet.on(ResEvent.RELEASE, this, this.resReleaseCallback);
                templet.load(resPath);
                templet.retain();
                this._templetMap.put(resPath, templet);
            }
        }

        getCallBackArr(resPath: string): Laya.Handler[]
        {
            var callBackArr: Laya.Handler[] = this._callbackMap.get(resPath);
            if (callBackArr == null)
            {
                callBackArr = [];
                this._callbackMap.put(resPath, callBackArr);
            }
            return callBackArr;
        }

        public getAniDurationByAniName(resPath: string, aniName: string): number
        {
            if (resPath == null) { return 0; }
            var templete: TempletBase = this.getTemplete(resPath);
            if (templete)
            {
                return templete.getAniDurationByAniName(aniName)
            }
            return 200;
        }

        public fastReleaseTemplet(resPath: string): void
        {
            this.releaseTemplet(resPath);
            this.checkFastDestroyTemplet(resPath);
        }

        public checkFastDestroyTemplet(resPath: string): void
        {
            var templete: TempletBase = this.getTemplete(resPath);
            if (templete && templete.status == ResStatus.NULL)
            {
                this.destroyTemplet(resPath);
            }
        }
        
        private getTemplete(resPath: string): TempletBase
        {
            return this._templetMap.get(resPath);
        }

        public releaseTemplet(resPath)
        {
            var templete: TempletBase = this.getTemplete(resPath);
            if (templete)
            {
                templete.release();
            }
        }

        private resLoadCallback(resPath: string)
        {
            var callBackArr = this.getCallBackArr(resPath);
            for (let i = 0, n = callBackArr.length; i < n; i++)
            {
                callBackArr[i].runWith(this.getTemplete(resPath).templet);
            }
            this._callbackMap.remove(resPath);
        }

        private onLoop()
        {
            this._delayDeleteMap._private_foreachKey(this, this.onLoopDelete)
        }

        onLoopDelete(url: string)
        {
            let templete = this.getTemplete(url);
            if (templete && templete.status != ResStatus.DELETE)
            {
                this._delayDeleteMap.remove(url);
            } else
            {
                if (this._delayDeleteMap.containsKey(url))
                {
                    var value = this._delayDeleteMap.get(url);
                    value -= 1;
                    if (value <= 0)
                    {
                        this.destroyTemplet(url);
                    } else
                    {
                        this._delayDeleteMap.put(url, value);
                    }
                } else
                {
                    // TODO:  这里需要直接销毁吗？
                }
            }
        }

        private destroyTemplet(url: string): void
        {
            let templete = this.getTemplete(url);
            if (templete)
            {
                templete.destroy();
            }
            this._templetMap.remove(url);
            this._callbackMap.remove(url);
            this._delayDeleteMap.remove(url);
        }

        private resReleaseCallback(resPath: string)
        {
            var templete: TempletBase = this.getTemplete(resPath);
            if (templete)
            {
                if (!this._delayDeleteMap.containsKey(resPath))
                {
                    this._delayDeleteMap.put(resPath, this._cacheTime);
                    templete.status = ResStatus.DELETE;
                }
            }
        }
    }
}