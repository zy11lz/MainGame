
module Pro
{
    /**
     * 进化特效
     */
    export class HuPaLiberateShowMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        UIPanel: ProUI.ActivityMain.HuPa.HuPaLiberateShowUI;

        showHero: Net.hero;
        //展示用skeleton
        private _sk: SkeletonPlayer;
        //展示用skeleton
        private _fanhui: SkeletonPlayer;
        /** 底部光环 */
        private _resaultLoopSk: SkeletonPlayer;

        /**星星 */
        private _starSk: SkeletonPlayer;

        /**是否需要播放6星动画 */
        private _showStarBoolean: boolean = false;

        /**是否可跳过 */
        private _canSkip: boolean = true;

        // /**动画播放一段时间显示模型 */
        // private _duration: number = 8600;//11.5;

        private _skinPreBol: boolean = true;

        /**战斗力提升 */
        public oldFightpower: number = 0;
        public newFightpower: number = 0;

        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("herocallbigshow"), UrlMgr.getAtlas("hupa")];
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.HuPa.HuPaLiberateShowUI, 0, BaseAddLayer.TopUI, true, 3);
            //this.showPanel(ProUI.evolution.EvolutionEffectUpViewUI,1,BaseAddLayer.RootUI,true,3);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this._canSkip = true;
            this._skinPreBol = true;
            AwardOpenUtils.setLock(false); //解锁,奖励提示可以继续了。

            if (this._sk)
            {
                this._sk.removeSelf();
                this._sk.releaseSkel();
                this._sk = null;
            }
            if (this._fanhui)
            {
                this._fanhui.off(LayaEvent.START, this, this._onSkNextPlay);
                this._fanhui.removeSelf();
                this._fanhui.releaseSkel();
                this._fanhui = null;
            }
            if (this._resaultLoopSk)
            {
                this._resaultLoopSk.removeSelf();
                this._resaultLoopSk.releaseSkel();
                this._resaultLoopSk = null;
            }
            if (this._starSk)
            {
                this._starSk.offAll();
                this._starSk.removeSelf();
                this._starSk = null;
            }
            Laya.timer.clear(this, this._onSkNextPlay);

            if (this.newFightpower > this.oldFightpower)
            {
                EffectMgr.Inst.showUI_FightPowerUp(this.oldFightpower, this.newFightpower - this.oldFightpower);
            }
            this.newFightpower = this.oldFightpower = 0;

            this.closePanel();

        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            this.setUIBG(Pro.UrlMgr.getUIBgUrl("hupa"));
            this.UIPanel.topAd.zOrder = 99;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.getDarkUI().onClick(this, () =>
            {
                if (this._skinPreBol)
                {
                    this._skinSkPreStart();
                }
                else if (this._canSkip)
                {
                    this.closeUI();
                }
            });
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            this.showHero = this.UIOpenData.customObject as Net.hero;
            this.showOnce();
            this.showHeroDes(false);
        }

        public resetUIOpenData(uiOpenData: BaseOpenUIData): void
        {
            this.showHero = this.UIOpenData.customObject as Net.hero;
        }

        showOnce(): void
        {
            //先把音效停掉
            SoundMgr.Inst().controlSound(SoundStatue.Stop, SoungGroup.heroShowVoice);
            let tmpInfo = this.showHero;



            let petCfgInfo = cfg.PetCfgData.getInfo(tmpInfo.id);
            /*  //边框
                  ①四星英雄套用”紫色”稀有框；
                ②五星3技能的英雄套用“橙色”传说框；
                ③五星4技能的英雄套用”橙红色”传说框；
                ④六星英雄套用”红色”传说框。
            */

            //播放英雄音效
            if (petCfgInfo.voice)
            {
                let soundArr = petCfgInfo.voice.split(";");
                let sound = soundArr[Global.getRandomNum(0, soundArr.length)];
                SoundMgr.Inst().playSoundByName(sound, SoungGroup.heroShowVoice);
            }

            this.UIPanel.StarBox.setStar(tmpInfo.star, 0);
            this.UIPanel.imgVDraw.skin = "";
            this._showStarBoolean = tmpInfo.star == 6;
            this._canSkip = GuideMgr.Inst.getInAllShowGuide() || tmpInfo.star != 6;
            this.startShowAni();

            this.UIPanel.footboard.visible = false;
            this.UIPanel.imgPetType.frame = petCfgInfo.petType;
            this.UIPanel.txtName.text = cfg.PetSkinCfgData.getFileNameById(tmpInfo.useskinid);

        }

        private showHeroDes(bol: boolean)
        {
            this.UIPanel.StarBox.visible = bol;
            this.UIPanel.txtName.visible = bol;
            this.UIPanel.imgBorderFrame.visible = bol;
            this.UIPanel.imgPetType.visible = bol;

        }



        // /** 开始显示动画 */
        private startShowAni(showStarAni: boolean = false): void
        {
            if (this._starSk)
            {
                this._starSk.visible = false;
            }
            if (!this._fanhui)
            {
                this._fanhui = new SkeletonPlayer();
                this.UIPanel.addChild(this._fanhui);
                this._fanhui.pos(this.UIPanel.width >> 1, this.UIPanel.height >> 1);
                this._fanhui.on(Laya.Event.STOPPED, this, this._onSkNextPlay)
                let skelName = cfg.PetSkinCfgData.getSkelNameById(this.showHero.useskinid);
                this._fanhui.load(UrlMgr.getModelSkUrl(skelName));

            }
            this.UIPanel.topAd.visible = true;
            this._fanhui.play("skill2", false);
        }


        // private _onSkPreStart()
        // {
        //     Laya.timer.once(this._duration, this, this._onSkNextPlay);
        // }

        private _onSkNextPlay()
        {
            this.UIPanel.topAd.visible = false;
            this.refreshHeroShapeView(this.showHero.useskinid, this.showHero.star);
        }

        private _skinSkPreStart()
        {
            Laya.timer.clear(this, this._onSkNextPlay);
            this._onSkNextPlay();
            this.showStarSk();
            if (this._fanhui)
            {
                this._fanhui.off(LayaEvent.START, this, this._onSkNextPlay);
                this._fanhui.removeSelf();
                this._fanhui.releaseSkel();
                this._fanhui = null;
            }
        }

        private showStarSk()
        {
            if (!this._showStarBoolean)
            {
                return;
            }
            if (!this._starSk)
            {
                this._starSk = new SkeletonPlayer();
                this.UIPanel.imgVDraw.addChild(this._starSk);
                this.UIPanel.imgVDraw.zOrder = 11;
                this._starSk.pos(0, 30);
                this._starSk.load(UrlMgr.getSpineSceneUrl("xinchouka/xingxing/xingxing"));
                this._starSk.on(Laya.Event.STOPPED, this, () =>
                {
                    this._starSk.visible = false;
                    this._canSkip = true;
                })
            }
            this._starSk.playByIndex(0, false);
            this._starSk.visible = true;
            this._showStarBoolean = false;
        }

        /** 刷新形象显示 */
        private refreshHeroShapeView(useskinid: number, star: number): void
        {
            this._skinPreBol = false;
            this.showHeroDes(true);
            let skinID = useskinid;
            if (!this._sk)
            {
                this._sk = new SkeletonPlayer();
                //获取资源ID
                let skinInfo: cfg.PetSkinCfgInfo = cfg.PetSkinCfgData.getInfo(skinID);
                let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
                let firstAniAction = cfg.PetSkinCfgData.getFirstActById(skinID);
                Laya.Tween.to(this._sk, { alpha: 1 }, 400);
                this._sk.play(firstAniAction ? firstAniAction : "win_loop", false);
                this._sk.on(LayaEvent.CLICK, this, this.onSkClick);
                this._sk.on(LayaEvent.STOPPED, this, this.onSkStop);
                this._sk.pos(0, 100);

                this._sk.load(UrlMgr.getModelSkUrl(skelName));
                this._sk.alpha = 0;
                this._sk.zOrder = 1;
                this.UIPanel.imgVDraw.addChild(this._sk);
                this.UIPanel.imgVDraw.zOrder = 10;
            }
            this._sk.alpha = 1;
            //获取资源ID
            var showScale = cfg.PetSkinCfgData.getShowScaleById(skinID);
            this._sk.scale(showScale, showScale);
            Laya.Tween.to(this._sk, { alpha: 0 }, 350, null, Laya.Handler.create(this, () =>
            {
                if (this._sk)
                {
                    let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
                    this._sk.setRes(UrlMgr.getModelSkUrl(skelName));
                    Laya.Tween.to(this._sk, { alpha: 1 }, 350);
                }
            }))

            let firstAniAction = cfg.PetSkinCfgData.getFirstActById(skinID);
            this._sk.play(firstAniAction, false);

            if (!this._resaultLoopSk)
            {
                this._resaultLoopSk = new SkeletonPlayer();
                this._resaultLoopSk.y = 100;
                this.UIPanel.imgVDraw.addChild(this._resaultLoopSk);
            }

            let path;
            switch (star)
            {
                case 4:
                    path = "xinchouka/qianhuang/qianhuang";
                    break;
                case 5:
                    path = "xinchouka/huang/huang";
                    break;
                case 6:
                    path = "xinchouka/hong/hong";
                    break;
                default:
                    path = "xinchouka/huang/huang";
                    break;
            }
            this._resaultLoopSk.load(Pro.UrlMgr.getSpineSceneUrl(path))
            this._resaultLoopSk.playByIndex(0, true);
        }

        /**
                * 点击后随即播放动作 其中没有loop的动作播放完成后 播放standby_loop
                * @param e
                */
        private onSkClick(e: LayaEvent)
        {
            let randomList = ["attack", "run_loop", "skill1", "standby_loop", "win_loop"];
            let random = Math.random() * randomList.length;
            let index;
            for (let i = 0; i <= randomList.length; i++)
            {
                if (random < i)
                {
                    index = i - 1;
                    break;
                }
            }
            let act = randomList[index];
            let needLoop = act.indexOf("loop") != -1;
            this._sk.play(act, needLoop);

        }

        private onSkStop(e: LayaEvent)
        {
            this._sk.play("standby_loop", true);
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }

    }
}