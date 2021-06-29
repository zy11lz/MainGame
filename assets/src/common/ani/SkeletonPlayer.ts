module Pro
{
    export class SkeletonPlayer extends Laya.Sprite implements spine.ISkelPlayer
    {
        private _url: string;
        private _skelPlayer: spine.SpineSkeleton;
        private _action: string;
        private _loop: boolean = true;
        private _force: boolean = false;
        private _playbackrate: number = 1;
        private _default: Laya.Image;
        private _fastRelease: boolean = false;
        private _timeScale: number = 1;
        private _aniIndex: number = -1;

        private _flipX = false;
        private _flipY = false;


        constructor(isShowDefault: boolean = false, fastRelease: boolean = false)
        {
            super();
            this._fastRelease = fastRelease;

            this.hitArea = new Laya.HitArea();
            this.hitArea.hit = new Laya.Graphics();
            this.hitArea.hit.drawRect(-50, -100, 100, 100, "#000000");

            if (isShowDefault)
            {
                //加载默认图
                this._default = new Laya.Image("");
                this._default.anchorX = 0.5;
                this._default.anchorY = 1;
                this._default.size(235, 330);
                this._default.visible = false;
                this.addChild(this._default);
            }
        }

        public get timeScale(): number
        {
            return this._timeScale;
        }
        public set timeScale(value: number)
        {
            this._timeScale = value;
            if (this._skelPlayer)
            {
                this._skelPlayer.setTimeScale(this._timeScale);
            }
        }

        public set gray(gray)
        {
            if (gray)
            {
                let grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
                let grayscaleFilter = new Laya.ColorFilter(grayscaleMat);
                this.filters = [grayscaleFilter];
                return;
            }
            this.filters = null;
        }

        public isResReady()
        {
            return this._skelPlayer != null;
        }

        public get gray()
        {
            return this.filters != null;
        }

        public setRes(url: string)
        {
            this.load(url);
        }

        public load(url: string)
        {
            this._default && (this._default.visible = true);
            if (this._url == url)
            {
                return;
            }
            this.releaseSkel();
            this._url = url;
            spine.TempletMgr.instance.loadSekl(url, new spine.CallBack(this, this.onTempleteComplete))
        }

        onTempleteComplete(resName)
        {
            if (this._url == resName)
            {
                this.releaseSkel();
                this._skelPlayer = spine.TempletMgr.instance.buildPLayer(resName);
                this._skelPlayer.on(Laya.Event.STOPPED, this, this.onStopped);
                this._skelPlayer.on(Laya.Event.LABEL, this, this.onSkelLabel);// (data) => { this.event(Laya.Event.LABEL, data); });
                this._skelPlayer.on(Laya.Event.COMPLETE, this, this.onSkelPlayComplete);
                this._skelPlayer.setTimeScale(this._timeScale);
                this.addChild(this._skelPlayer);

                if (this._action)
                {
                    this._skelPlayer.play(this._action, this._loop, this._force, false);
                }
                else if (this._aniIndex > -1)
                {
                    this._skelPlayer.playByIndex(this._aniIndex, this._loop, this._force, false);
                }
                else
                {
                    this._skelPlayer.playByIndex(0, this._loop, this._force, false);
                }
                this._skelPlayer.playbackRate(this._playbackrate);
                this._default && (this._default.visible = false);

                this.onSkelStart();
            }
        }

        public releaseSkel()
        {
            if (this._skelPlayer)
            {
                this._skelPlayer.off(Laya.Event.STOPPED, this, this.onStopped);
                this._skelPlayer.off(Laya.Event.LABEL, this, this.onSkelLabel);// (data) => { this.event(Laya.Event.LABEL, data); });
                this._skelPlayer.off(Laya.Event.COMPLETE, this, this.onSkelPlayComplete);
                this._skelPlayer.stop();
                common.DisplayUtils.removeFromParent(this._skelPlayer);
                spine.TempletMgr.instance.relasePLayer(this._skelPlayer);

            }
            this._skelPlayer = null;
        }

        onSkelStart()
        {
            this.event(Laya.Event.START);
        }



        onSkelPlayComplete(data)
        {
            this.event(Laya.Event.COMPLETE, data);
        }

        onSkelLabel(data)
        {
            this.event(Laya.Event.LABEL, data);
        }

        public stop(): void
        {
            this._skelPlayer && this._skelPlayer.stop();
        }

        public isPause(): boolean
        {
            if (!this._skelPlayer)
            { return false; }

            return this._skelPlayer.playState == spine.SpineSkeleton.paused;
        }

        public pause(bPause: boolean): void
        {
            this.pauseSk(bPause);
        }

        public pauseSk(bPause: boolean): void
        {
            if (bPause)
            {
                this._skelPlayer && this._skelPlayer.paused();
                return;
            }
            this._skelPlayer && this._skelPlayer.resume();
        }


        public play(name: string, isLoop?: boolean, force: boolean = false)
        {
            if (name == this._action && this._action == "dead")
            {
                return;
            }
            this._action = name;
            this._loop = isLoop;
            this._force = force;
            if (!this._skelPlayer)
            {
                return;
            }
            this._skelPlayer.play(name, isLoop, force, false);
        }

        playByIndex(index: number, isLoop?: boolean, force: boolean = false)
        {
            this._aniIndex = index;
            this._loop = isLoop;
            if (!this._skelPlayer)
            {
                return;
            }
            this._skelPlayer.playByIndex(index, isLoop, force, false);
        }

        public getActionDuration(aniName: string): number
        {
            if (this._url == null || this._url == "")
            {
                return 0;
            }
            return spine.TempletMgr.instance.getAniDurationByAniName(this._url, aniName);
        }

        private onStopped()
        {
            this.event(Laya.Event.STOPPED);
        }

        public destroy()
        {
            this.offAll();
            if (this._skelPlayer)
            {
                this._skelPlayer.destroy();
            }
            this._skelPlayer = null;

            SkeletonPlayer.releaseTemplet(this._url);
            (this._fastRelease) && SkeletonManager.Instance.checkFastDestroyTemplet(this._url);

            this._url = null;
            super.destroy();
        }

        public playbackRate(rate: number)
        {
            this._playbackrate = rate;
            this._skelPlayer && this._skelPlayer.playbackRate(rate);
        }

        public getUrl(): string
        {
            return this._url;
        }


        public get flipX()
        {
            return this._flipX;
        }

        public set flipX(value)
        {
            this._flipX = value;
            if (this._skelPlayer)
            {
                this._skelPlayer.scaleX = value ? -1 : 1;
            }
        }

        public get flipY()
        {
            return this._flipY;
        }

        public set flipY(value)
        {
            this._flipY = value;
            if (this._skelPlayer)
            {
                this._skelPlayer.scaleY = value ? -1 : 1;;
            }
        }

        public static loadRes(url: string, cbk?: Laya.Handler): string
        {
            if (undefined == url)
            {
                logE(`加载骨骼出错 url:${ url }`);
                return;
            }

            SkeletonManager.Instance.getSkeleton(url, Laya.Handler.create(this, (templet: Laya.Templet) =>
            {
                (cbk) && cbk.runWith(templet);
            }));
            return url;
        }

        public static releaseTemplet(url: string): void
        {
            if (!url)
            { return; }

            SkeletonManager.Instance.releaseTemplet(url);
        }

        public isHaveClip(): boolean
        {
            return this._skelPlayer.isHaveClip();
        }
    }
}
