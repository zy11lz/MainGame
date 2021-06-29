/**
 * laya的spine播放器
 */
module Pro
{
    export class LayaPlayer extends Laya.Sprite implements spine.ISkelPlayer
    {
        private _url: string;
        private _skelPlayer: spine.SpineSkeleton;
        private _action: string;
        private _loop: boolean = true;
        private _force: boolean = false;
        private _useCache: boolean = false;
        private _playbackrate: number = 1;
        private _timeScale: number = 1;
        private _aniIndex: number = -1;

        private _flipX = false;
        private _flipY = false;
        private _onLoadAutoPlayFirstAni: boolean = false;

        public fightScale: number = 1;

        constructor()
        {
            super();
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

        public setRes(url: string)
        {
            this._url = url;
            this.releaseSkel();
            spine.TempletMgr.instance.loadSekl(url, new spine.CallBack(this, this.onTempleteComplete))
        }

        onTempleteComplete(resName)
        {
            if (this._url == resName)
            {
                this.releaseSkel();
                this._skelPlayer = spine.TempletMgr.instance.buildPLayer(resName);
                this._skelPlayer.scaleX = this._skelPlayer.scaleY = this.fightScale;
                this._skelPlayer.on(Laya.Event.STOPPED, this, this.onStopped);
                this._skelPlayer.on(Laya.Event.LABEL, this, this.onSkelLabel);// (data) => { this.event(Laya.Event.LABEL, data); });
                this._skelPlayer.on(Laya.Event.COMPLETE, this, this.onSkelPlayComplete);
                this._skelPlayer.setTimeScale(this._timeScale);
                this.addChild(this._skelPlayer);

                if (this._action)
                {
                    this._skelPlayer.play(this._action, this._loop, this._force, this._useCache);
                }
                else if (this._aniIndex > -1)
                {
                    if (this._aniIndex >= this._skelPlayer.getAnimNum())
                    {
                        logW("aniIndex超范围了")
                        this._aniIndex = 0;
                    }
                    this._skelPlayer.playByIndex(this._aniIndex, this._loop, this._force, this._useCache);
                }
                else
                {
                    if (this._onLoadAutoPlayFirstAni)
                    {
                        this._skelPlayer.playByIndex(0, this._loop, this._force, this._useCache);
                    }
                }
                this._skelPlayer.playbackRate(this._playbackrate);
            }
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
            this._action = "";
            this._aniIndex = -1;
            this._loop = false;
            if (this._skelPlayer)
            {
                this._skelPlayer.stop();
            }
        }

        public isPause(): boolean
        {
            if (!this._skelPlayer)
            { return false; }

            return this._skelPlayer.playState == spine.SpineSkeleton.paused;
        }

        public pause(bPause: boolean): void
        {
            if (bPause)
            {
                this._skelPlayer && this._skelPlayer.paused();
                return;
            }
            this._skelPlayer && this._skelPlayer.resume();
        }

        public play(name: string, isLoop: boolean = false, force: boolean = false, userCache: boolean = false)
        {
            this._useCache = userCache;
            this._action = name;
            this._loop = isLoop;
            this._force = force;
            if (!this._skelPlayer)
            {
                return;
            }
            this._skelPlayer.play(name, isLoop, force, this._useCache);
        }

        public isResReady()
        {
            return this._skelPlayer != null
        }

        playByIndex(index: number, isLoop: boolean = false, force: boolean = false, userCache: boolean = false)
        {
            this._useCache = userCache;
            if (index == this._aniIndex)
            {
                return;
            }
            this._aniIndex = index;
            this._loop = isLoop;
            if (!this._skelPlayer)
            {
                return;
            }
            this._skelPlayer.playByIndex(index, isLoop, force, this._useCache);
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
            this.releaseSkel();
            this._url = null;
            super.destroy();
        }

        public playbackRate(rate: number)
        {
            this._playbackrate = rate;
            this._skelPlayer && this._skelPlayer.playbackRate(rate);
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

        public releaseSkel()
        {
            //请单纯的回收skel， 不要修改动作，或是其他状态，
            if (this._skelPlayer)
            {
                this._skelPlayer.stop();
                this._skelPlayer.off(Laya.Event.STOPPED, this, this.onStopped);
                this._skelPlayer.off(Laya.Event.LABEL, this, this.onSkelLabel);// (data) => { this.event(Laya.Event.LABEL, data); });
                this._skelPlayer.off(Laya.Event.COMPLETE, this, this.onSkelPlayComplete);
                spine.TempletMgr.instance.relasePLayer(this._skelPlayer);
            }
            this._skelPlayer = null;
        }

        public getUrl(): string
        {
            return this._url;
        }

        public isHaveClip():boolean
        {
            if(this._skelPlayer)
            {
                return this._skelPlayer.isHaveClip();
            }
            return false;
        }
    }
}