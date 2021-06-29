module Pro
{
    /**
     * 活动英雄 -- 沿用胡帕精灵修正
     */
    export class LimitHeroMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.HuPa.HuPaPreviewUI;

        private _petIds: number[];

        //展示用skeleton
        private _sk: SkeletonPlayer;
        private _skHandler: Laya.Handler;

        /** 角色身上展示的特效 */
        private _effNode: EffNode = null;
        /** 当前展示的角色特效类型（英雄类型） */
        private _effType = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("herodetail")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/herodetail/shenzhuang_pic01.png", "res/herodetail/yingxiong_pic_6.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.HuPa.HuPaPreviewUI, 3, BaseAddLayer.CenterUI, false, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            super.closeUI();

            if (this._effNode) { this._effNode.removeSelf(); }
            this._effNode = null;
            this._effType = 0;

            if (this._sk)
            {
                this._sk.off(LayaEvent.STOPPED, this, this.onSkStop);
                this._sk.removeSelf();
                this._sk = null;
            }

            //关掉当前正在播放的音效，并释放相关的资源
            this.closeCurShowVoice();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._petIds = this.UIOpenData.customObject.split(";");
            let displayClassP: TableBarContinerData[] = [];
            for (let i = 0; i < this._petIds.length + 1; i++) {
                let tableBar:TableBarContinerData; 
                if(i == 0)
                {
                    tableBar = new TableBarContinerData("hero_hupa_tab1", "story", LimitHeroStoryLayer, this._petIds[i]);
                }
                else
                {
                    tableBar = new TableBarContinerData("limit_hero_tab_" + this._petIds[i - 1], "upgrade1", HeroDetailUpgradeTabel)
                }
                displayClassP.push(tableBar)
            }

            this.UIPanel.FunBox.initData(this.UIPanel.tabGrp, displayClassP, [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

            this.UIPanel.FunBox.onClick(this, this.onFunBoxClick);
            //点击英雄形象
            this.UIPanel.btnAvatarShow.frequencyClickLock = 500;
            this.UIPanel.btnAvatarShow.onClick(this, this.onClickAvatar);
        }

        private onClickAvatar(): void
        {
            this.onSkClick(null);
            //播放英雄音效
            let sounds = cfg.PetCfgData.getVoiceByPetID(this._petIds[this.UIPanel.tabGrp.tabIndex]);
            if (!sounds) { return; }
            let soundArr = sounds.split(";");
            let sound = soundArr[Global.getRandomNum(0, soundArr.length)];
            this.closeCurShowVoice();
            SoundMgr.Inst().playSoundByName(sound, SoungGroup.heroShowVoice);
        }

        private closeCurShowVoice(): void
        {
            SoundMgr.Inst().controlSound(SoundStatue.Stop, SoungGroup.heroShowVoice);
        }

        /** 设置特效类型显示 */
        private setPetTypeEffect(type: number): void
        {
            if (this._effType == type) { return; }
            this._effType = type;

            if (this._effNode)
            {
                this._effNode.removeSelf();
            }

            //UI背景
            let uiBgName = `heroDetailType${ type }.jpg`;
            let uiUrl = Global.getUIBGPathWithResUrl(uiBgName);
            this.setUIBG(uiUrl);
        }

        private onFunBoxClick(index: number, tabName: string)
        {
            if (index != 0)
            {
                let id = this._petIds[index - 1]// this.UIOpenData.customObject
                let info = cfg.PetBookCfgData.getBookHeroById(id);
                this.UIPanel.FunBox.setTableViewData(tabName, [null, null, info]);
            }
            else
            {
                this.UIPanel.FunBox.setTableViewData(tabName, this._petIds[index]);
            }


            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            //其他控制
            this.UIPanel.CloseBtn.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGrp.setSelectTab(0);
            //刷新英雄
            this.refreshUI();

        }

        public refreshUI()
        {
            this.onSwitchHeroInfo();
        }

        /**
         * 切换英雄按钮
         */
        private onSwitchHeroInfo()
        {
            //刷新角色属性
            this.heroItemSelected();
        }

        //--------------------------------------刷新宠物列表-------------------------------------------
        /** 切换宠物显示 */
        private heroItemSelected()
        {
            //当前角色ID
            let currentPetID = 0;
            let currentPetStar = 0;
            let currentPetPower = 0;
            let skinID = 0;
            let index = this.UIPanel.tabGrp.tabIndex;
            
            let id = index < 1 ? this._petIds[0] : this._petIds[index - 1];
            let info = cfg.PetBookCfgData.getBookHeroById(id);

            currentPetID = info.petID;
            currentPetStar = info.star;
            currentPetPower = info.power;

            skinID = cfg.PetCfgData.getSkinInfoByPetID(currentPetID).id;

            //添加角色动作
            this.refreshHeroShapeView(skinID);

            //角色类型特效
            this.setPetTypeEffect(cfg.PetCfgData.getPetTypeByPetID(currentPetID));

            //显示基础属性
            Global.setResPetType(this.UIPanel.PetTypeImg, cfg.PetCfgData.getPetTypeByPetID(currentPetID));
            if (GlobalData.isShowDebugInfo)
            {
                var skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
                this.UIPanel.NameLB.text = cfg.PetSkinCfgData.getFileNameById(skinID) + "_" + currentPetID + "_" + skelName;
            } else
            {
                this.UIPanel.NameLB.text = cfg.PetSkinCfgData.getFileNameById(skinID);
            }
            this.UIPanel.NameBox.refresh();
            this.UIPanel.ZhanLb.text = currentPetPower.toString();
            this.UIPanel.starBox.setStar(currentPetStar);
        }

        /**
         * 点击后随即播放动作 其中没有loop的动作播放完成后 播放standby_loop
         * @param e
         */
        private onSkClick(e: LayaEvent)
        {
            if (this._sk == null)
            {
                return;
            }
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

        /** 刷新形象显示 */
        private refreshHeroShapeView(skinID: number): void
        {
            if (!this._sk)
            {
                this._sk = new SkeletonPlayer();
                //获取资源ID
                let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);

                this._sk.mouseEnabled = false;
                this._sk.mouseThrough = false;
                this._sk.on(LayaEvent.STOPPED, this, this.onSkStop);
                this._sk.pos(70, 0);
                this._sk.load(UrlMgr.getModelSkUrl(skelName));
                this._sk.alpha = 0;
                this.UIPanel.IconImg.addChild(this._sk);
                this.UIPanel.IconImg.zOrder = 10;
                this.UIPanel.upAttrListUI.zOrder = 11;
            }
            var showScale = cfg.PetSkinCfgData.getShowScaleById(skinID);
            this._sk.scale(showScale, showScale);
            this._sk.alpha = 1;


            let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
            this._sk.setRes(UrlMgr.getModelSkUrl(skelName));
            let firstAniAction = cfg.PetSkinCfgData.getFirstActById(skinID);
            this._sk.play(firstAniAction ? firstAniAction : "win_loop", false);
        }

    }
}