module Pro
{
    /**
     * 严禁export导出
     */
    class Single
    {

    }

    export class FramePlayer extends Laya.Image
    {
        /** FramePlayer 总共create的多少次 */
        private static uniqId: number = 0;

        /** FramePlayer 实例化了多少次 */
        private static idIndex: number = 0;

        private id: number = 0;
        private _totalFrame: number = 0;
        private _frameRate: number = 0;
        private _tempActionList: string[];
        private _currentFrame: number = 0;
        private _preFrameTime: number = 0;
        private _loopNum: number = 0;
        private _respath: string = "";
        private _playedNum: number = 0;
        private _respreFix: string = "";
        private _isPlaying: boolean = false;
        private _completeAutoRemove: boolean = false;

        constructor(singgle: Single)
        {
            super();
        }

        public setInfo(respath: string)
        {
            this._respath = respath;
            this._respreFix = respath.substr(0, respath.lastIndexOf(".")) + "/";
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this._frameRate = 100;
            FramePlayerDataMgr.instace.addRef(this._respath);
            this.initPlayInfo();
        }

        private initPlayInfo()
        {
            this._tempActionList = FramePlayerDataMgr.instace.getData(this._respath);
            if (this._tempActionList)
            {
                this._totalFrame = this._tempActionList.length;
                this.onLoadResComplete();
            } else
            {
                FramePlayerDataMgr.instace.on(LayaEvent.COMPLETE, this, this.onResComplete)
            }
        }
        private onResComplete(resPath: string)
        {
            if (resPath == this._respath)
            {
                this.initPlayInfo();
                FramePlayerDataMgr.instace.off(LayaEvent.COMPLETE, this, this.onResComplete)
            }
        }

        private onLoadResComplete()
        {

        }

        public play(loopNum: number = -1, completeAutoRemove: boolean = false)
        {
            if (this._isPlaying)
            {
                return;
            }
            this._loopNum = loopNum;
            this._currentFrame = 0;
            this._completeAutoRemove = completeAutoRemove;
            this._isPlaying = true;
            Laya.timer.clear(this, this.update);
            Laya.timer.frameLoop(1, this, this.update);
        }

        private update()
        {
            if (!this._isPlaying) return
            if (this._tempActionList == null) return;
            if (Laya.timer.currTimer - this._preFrameTime < this._frameRate)
            {
                return;
            }
            if (this._currentFrame >= this._totalFrame)
            {
                this._playedNum++;
                this._currentFrame = 0;
            }
            if (this._loopNum == -1 || this._playedNum < this._loopNum)
            {
                let tmpSpName = this._respreFix + this._tempActionList[this._currentFrame];
                this.skin = tmpSpName;
                //记录下一帧切换时间
                this._preFrameTime = Laya.timer.currTimer;
                this._currentFrame++;
            } else
            {
                this.playComplete();
            }
        }

        private playComplete()
        {
            if (this._isPlaying)
            {
                this.stop();
                if (this._completeAutoRemove)
                {
                    this.removeSelf();
                }
                this.event(Laya.Event.COMPLETE);
            }
        }

        public stop()
        {
            this._isPlaying = false;
            Laya.timer.clear(this, this.update);
        }

        public destroy()
        {
            this._respath = "";
            this._respreFix = "";
            this._playedNum = 0;
            this._preFrameTime = 0;
            this._tempActionList = null;
            this._isPlaying = false;
            this._completeAutoRemove = false;
            this.x = 0;
            this.y = 0;
            this.rotation = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.visible = true;
            this.alpha = 1;
            this.stop();
            FramePlayerDataMgr.instace.off(LayaEvent.COMPLETE, this, this.onResComplete)
            FramePlayerDataMgr.instace.unRef(this._respath);
        }

        //-------------------------------------------------------------------------------------------------
        private static _pool: Array<FramePlayer> = [];
        private static _inUse: ds.StringMap<FramePlayer>;
        private static get inUse(): ds.StringMap<FramePlayer>
        {
            if (FramePlayer._inUse == null)
            {
                FramePlayer._inUse = new ds.StringMap<FramePlayer>();
            }
            return FramePlayer._inUse;
        }

        private static _single = new Single();

        public static create(): FramePlayer
        {
            FramePlayer.uniqId++;
            var player: FramePlayer;
            if (this._pool.length)
            {
                player = this._pool.shift();
            } else
            {
                player = new FramePlayer(this._single);
                player.id = FramePlayer.idIndex++;
            }
            this.inUse.put(player.id, player);
            return player;
        }

        public static release(player: FramePlayer)
        {
            if (player)
            {
                player.scale(1, 1);
                player.rotation = 0;
                player.removeSelf();
                player.offAll();
                player.destroy();
                this._pool.push(player);
                this.inUse.remove(player.id);
            }
        }
    }

}