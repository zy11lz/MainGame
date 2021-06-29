
module Pro
{
    /**
     * 玩家当前所在场景
     */
    export enum SoundStatue
    {
        Play,
        Pause,
        Stop
    }
    /**
     * 背景音乐的几个场景
     */
    export enum ScenceSoundType
    {
        START,
        LOGIN,
        CITY,
        FIGHT,
        FIGHT2,
        FIGHT3,
        END
    }

    export enum SoungGroup
    {
        effect = "effect",
        heroShowVoice = "heroShowVoice"

    }



    // 声音管理器
    export class SoundMgr
    {
        // 单例对象
        private static _inst: SoundMgr;

        // 所有标识
        // private _allSigns = new Laya.Dictionary();

        private _soundChannelMap: ds.StringMap<ds.StringMap<Laya.SoundChannel>> = new ds.StringMap<ds.StringMap<Laya.SoundChannel>>();
        //当前使用的循环背景音效Key
        private _loopBGKey: string = null;
        // 单例接口
        static musicUseMp3: any;

        public static Inst(): SoundMgr
        {
            if (SoundMgr._inst == null)
            {
                SoundMgr._inst = new SoundMgr();
            }

            return SoundMgr._inst;
        }

        // 构造函数
        public init()
        {
            this.setMusicVolume(cfg.SoundCfgData.getFirstInfo().volume / 100);
            EventMgr.on(EventNotify.StageFocus, this, this.onStageFocus);
            EventMgr.on(EventNotify.StageBlur, this, this.onStageBlur);
            EventMgr.on(Public.CommonEvent.BUTTON_CLICK_SOUND, this, this.playButtonClickSound);
        }

        private playButtonClickSound(soundType: string)
        {
            if (cfg.SoundCfgData.getDataAll() == null)
            {
                return;
            }
            this.playSound(soundType);
        }


        public getBgSoundName(): string
        {
            return this._loopBGKey;
        }

        // 舞台获得焦点时调度
        private onStageFocus(): void
        {
            // this._allSigns.clear();
            this._soundChannelMap.clear();
            Laya.SoundManager.stopAllSound();
            this.stopAllMusic();
            if (this._loopBGKey != null)
            {
                this.playSound(this._loopBGKey);
            }
            else
            {
                this.playMusic();
            }
        }

        // 舞台获得失去时调度
        private onStageBlur(): void
        {
            // this._allSigns.clear();
            this._soundChannelMap.clear();
            Laya.SoundManager.stopAllSound();
            this.stopAllMusic();
        }

        /**设置当前音乐静音状态是否静音 */
        public set musicMute(isMute: boolean)
        {
            Laya.SoundManager.musicMuted = isMute;
            if (isMute)
            {
                this.stopAllMusic();
            }
            else if (this._loopBGKey != null)
            {
                this.playSound(this._loopBGKey);
            } else
            {
                this.playMusic();
            }
        }

        /**
         * 设置当前音效静音状态是否静音
         *
        */
        public set soundMute(isMute: boolean)
        {
            Laya.SoundManager.soundMuted = isMute;
            if (isMute)
            {
                // this._allSigns.clear();
                this._soundChannelMap.clear();
                Laya.SoundManager.stopAllSound();
            }
        }

        // 停止播放所有声音（包括背景音乐和音效）。
        public stopAll(): void
        {
            // this._allSigns.clear();
            this._soundChannelMap.clear();
            Laya.SoundManager.stopAll();
        }

        // 停止播放所有音效（不包括背景音乐）。
        public stopAllSound(): void
        {
            // this._allSigns.clear();
            this._soundChannelMap.clear();
            Laya.SoundManager.stopAllSound();
        }

        // 停止播放背景音乐（不包括音效）。
        public stopAllMusic(): void
        {
            Laya.SoundManager.stopMusic();
        }

        // 设置背景音乐的音量大小0-1
        public setMusicVolume(volume: number)
        {
            if (volume > 1)
            {
                volume = 1;
            }
            if (volume < 0)
            {
                volume = 0;
            }
            Laya.SoundManager.setMusicVolume(volume);
        }

        // 音乐控制音量
        public controlVolume(isPlus: boolean): void
        {
            let volume = Laya.SoundManager.musicVolume;
            volume += (isPlus ? 0.1 : -0.1);
            this.setMusicVolume(volume);
        }

        //随机下一个背景音乐
        public setBGLoopName(key: string)
        {
            this._loopBGKey = key;
        }

        public delayPlaySound(delay: number, key: string, group: SoungGroup = SoungGroup.effect): void
        {
            if (delay <= 0)
            {
                this.playSound(key, group);
            } else
            {
                Laya.timer.once(delay, this, this.playSound, [key, group]);
            }
        }
        public fixedSoundUrl(soundName: string, soundBG: boolean)
        {
            let resUrl;
            let soundName1;
            if (soundBG && SoundMgr.musicUseMp3)
            {
                soundName1 = soundName.replace(".wav", ".mp3");
                resUrl = `res/OtherData/SoundsMp3/${ soundName1 }`;
            }
            else
            {
                resUrl = `res/OtherData/Sounds/${ soundName }`;
                soundName1 = soundName;
            }
            return { soundName1, resUrl }
        }
        /**
         * 根据配置表播放音效或背景音乐
         */
        public playSound(key: string, group: SoungGroup = SoungGroup.effect)
        {
            let soundName = cfg.SoundCfgData.getNameById(key);
            if (soundName == null || soundName.length == 0)
            {
                return;
            }
            this.playSoundByName(soundName, group);
        }

        /**
         * 直接播放指定的音效文件
         */
        public playSoundByName(soundName: string, group: SoungGroup = SoungGroup.effect): void
        {
            if (!soundName)
            {
                return;
            }
            //关闭音效
            if (Laya.SoundManager.soundMuted)
            {
                return;
            }
            let { soundName1, resUrl } = this.fixedSoundUrl(soundName, false);
            soundName = soundName1;

            var map: ds.StringMap<Laya.SoundChannel> = this._soundChannelMap.get(group);
            if (map == null)
            {
                map = new ds.StringMap<Laya.SoundChannel>();
                this._soundChannelMap.put(group, map);
            }
            Laya.loader.load(resUrl, Laya.Handler.create(this, this.onSoundLoadComplete, [resUrl, group]), null, null, 2);
        }

        private onSoundLoadComplete(resUrl: string, group: SoungGroup = SoungGroup.effect)
        {
            try
            {
                let soundChannel = Laya.SoundManager.playSound(resUrl);
                var map: ds.StringMap<Laya.SoundChannel> = this._soundChannelMap.get(group);
                if (map == null)
                {
                    map = new ds.StringMap<Laya.SoundChannel>();
                    this._soundChannelMap.put(group, map);
                }
                map.put(resUrl, soundChannel);
            }
            catch (error)
            {
                logI("musicError:" + error + ",resUrl:" + resUrl);
            }
        }

        /**
         * 开启和关闭一组效果(statue;0:暂停，1:停止，2：播放)
         */
        public controlSound(statue: SoundStatue, group: SoungGroup = SoungGroup.effect)
        {
            let groupDIC = this._soundChannelMap.get(group) as ds.StringMap<Laya.SoundChannel>;
            if (groupDIC == null)
            {
                return;
            }
            var keys: string[] = groupDIC.getKeys();
            for (let index = 0; index < keys.length; index++)
            {
                let tempSound = groupDIC.get(keys[index]);
                this.soundChannelControl(tempSound, statue);
            }
        }

        private soundChannelControl(tempSound: Laya.SoundChannel, statue: SoundStatue)
        {
            if (tempSound == null)
            {
                return;
            }
            if (statue == SoundStatue.Pause)
            {
                if (!tempSound.isStopped)
                {
                    tempSound.pause();
                }
            }
            else if (statue == SoundStatue.Stop)
            {
                tempSound.stop();
            }
            else if (statue == SoundStatue.Play)
            {
                if (tempSound.isStopped)
                {
                    tempSound.play();
                }
            }
        }

        //-----------------------------------------------------------
        private _currentMusicArr: Array<cfg.SoundCfgInfo>;
        private _currentIndex: number;
        private _currentType: ScenceSoundType = ScenceSoundType.START;
        private _musicCompHandler: Laya.Handler;
        /**
         * 根据类型播放背景音乐
         * @changeBol  同类型时切换背景音乐
         *
        */
        public playMusicByType(type: ScenceSoundType, changeBol: boolean = false)
        {
            if (this._currentType == type && !this._loopBGKey)
            {
                if (changeBol)
                {
                    this._currentIndex++;
                } else
                {
                    return
                }
            }
            else
            {
                this._currentType = type;
                this._currentMusicArr = cfg.SoundCfgData.getInfoArrByType(type);
                this._currentIndex = Math.floor(Math.random() * this._currentMusicArr.length);
            }

            this._loopBGKey = null;
            this.playMusic();
        }

        private playMusic()
        {
            if (!this._currentMusicArr || !this._currentMusicArr.length)
            {
                return
            }
            //关闭音乐
            if (Laya.SoundManager.soundMuted)
            {
                return;
            }
            this._currentIndex = this._currentIndex >= this._currentMusicArr.length ? 0 : this._currentIndex;
            let info: cfg.SoundCfgInfo = this._currentMusicArr[this._currentIndex]
            let { soundName1, resUrl } = this.fixedSoundUrl(info.name, true);
            try
            {
                if (Laya.loader.getRes(resUrl) != null)
                {
                    logD("播放音乐" + resUrl)
                    if (!this._musicCompHandler)
                    {
                        this._musicCompHandler = Laya.Handler.create(this, this.comStopMusic, null, false);
                    }
                    Laya.SoundManager.playMusic(resUrl, 1, this._musicCompHandler);
                }
                else
                {
                    logD("加载音乐" + resUrl)
                    Laya.loader.load(resUrl, Laya.Handler.create(this, this.playMusic), null, null, 2);
                }
            }
            catch (error)
            {
                logI("musicError:" + error + ",resUrl:" + resUrl);
            }
        }

        private comStopMusic(e)
        {
            if (!e)
            {
                //false :没有播放完中断
                return;
            }
            let info: cfg.SoundCfgInfo = this._currentMusicArr[this._currentIndex];
            if (info == null)
            {
                return;
            }
            if (!info.isLoop)
            {
                this._currentIndex++;
            }
            if (info.duration)
            {
                Laya.timer.once(info.duration, this, this.playMusic)
            } else
            {
                this.playMusic();
            }
        }
    }
}