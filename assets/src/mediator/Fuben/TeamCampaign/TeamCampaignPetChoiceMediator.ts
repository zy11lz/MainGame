
module Pro
{
    /**
    * 组队战选择英雄
    */
    export class TeamCampaignPetChoiceMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Fuben.TeamCampaign.PetChoice.MainUI;

        /** 当前已解锁的英雄 */
        private TempPetList: Array<Net.hero>;

        /** 当前选择的英雄类型索引 */
        private TmpSelectHeroTypeIndex = 0;

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("heroexpeditchoice")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Fuben.TeamCampaign.PetChoice.MainUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.SureBtn.onClick(this, this.onSureClick);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.TeamCampaign_SyncPet, this, this.onTeamCampaign_SynPetAck);
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
            //清空缓存布阵
            EmbattleDataMgr.clearCurBuZhen();

            //切换操作阵法
            EmbattleDataMgr.switchCurBuZhen(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);

            //刷新布阵信息
            this.refreshOnStoreList();
            this.refreshHeroType();
        }

        public refreshUI()
        {

        }

        //--------------------------------选择英雄类型---------------------------
        /** 刷新英雄类型 */
        private refreshHeroType()
        {
            let heroTypeNum = 1 + Pb_God._emPetType.PetType_Moon;
            this.UIPanel.HeroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
            {

                Global.setResPetType(itemUI, index);
                itemUI.onClick(this, this.onHeroTypeClick);

                if (index == 0)
                {
                    this.onHeroTypeClick(itemUI);
                }
            });
        }

        /** 选择一个英雄类型 */
        private onHeroTypeClick(btn: component.UIButton)
        {
            this.UIPanel.HeroTypeSelectImg.x = btn.x;
            this.UIPanel.HeroTypeSelectImg.y = btn.y;
            this.TmpSelectHeroTypeIndex = parseInt(btn.name);
            this.refreshPetsLayer();
        }

        //--------------------------------英雄列表--------------------------------
        /** 刷新当前拥有的角色状态 */
        private refreshPetsLayer()
        {
            let zheninfo = EmbattleDataMgr.getCurBuZhenInfo();
            PetDataMgr.refreshOnStoreHeroWithZhenfa(zheninfo);
            this.TempPetList = PetDataMgr.getPetList(this.TmpSelectHeroTypeIndex);
            let supportList = this.getFriendSupportHeroList(zheninfo);
            if (supportList && supportList.length > 0)
            {
                this.TempPetList = supportList.concat(this.TempPetList);
            }

            // this.TempPetList.sort(function (a: Net.hero, b: Net.hero): number {
            // 	if (a.onStore && !b.onStore) { return -1; }
            // 	else if (!a.onStore && b.onStore) { return 1; }
            // 	else return 0;
            // });

            this.UIPanel.HeroList.onRefresh(this.TempPetList.length, this, this.onHeroListRender);
        }

        /** 根据当前出战类型与英雄类型分类，获取好友增援的英雄列表 */
        private getFriendSupportHeroList(buzhenInfo: Net.BuZhenInfo): Net.hero[]
        {
            let supportType = Pb_God._emFriendSupportType.FriendSupportType_TeamCampaign;
            let heros = FriendDataMgr.getHiredSupportHeroList(supportType, true);
            for (let hero of heros)
            {
                //刷新上阵状态
                hero.onStore = buzhenInfo.isOnStoreIndex(hero.sn) >= 0;
            }
            return heros;
        }

        /** 刷新状态 */
        private onHeroListRender(item: NorItemUI, index: number): void
        {
            let tmpHeroInfo = this.TempPetList[index] as Net.hero;
            item.setPetInfo(tmpHeroInfo, false);
            // item.SelectStatueImg.visible = tmpHeroInfo.onStore;
            item.onClick(this, this.onHeroListSelect);

            let posImg = item.getChildByName("extraImgNum") as component.UIFrameImage;
            posImg.visible = tmpHeroInfo.onStore;
            if (tmpHeroInfo.onStore)
            {
                let buzhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
                let tmpPosList = buzhenInfo.getPosData(true, false);
                for (let i = 0; i < tmpPosList.length; i++)
                {
                    let posData = tmpPosList[i];
                    if (posData.petsn.equals(tmpHeroInfo.sn))
                    {
                        posImg.frame = i + 1;
                        break;
                    }
                }
            }
            
            item.setLockImgVisible(tmpHeroInfo.isDefend,tmpHeroInfo);


            //显示血量
            let tmpHpPro = TeamCampaignDataMgr.getPetHpRate(tmpHeroInfo);
            item.setBloodProgress(tmpHpPro);
            item.DieImg.visible = tmpHpPro == 0;
            item.BloodBgImg.visible = !item.DieImg.visible;
            if (tmpHpPro == 0)
            {
                item.onClick(null, null);
            }
        }

        /** 选择英雄列表的目标 */
        private onHeroListSelect(item: NorItemUI)
        {

            let tempPetInfo = this.TempPetList[parseInt(item.name)];
            let buzhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
            if(tempPetInfo.isDefend){
                TipsUtils.showTips(Global.getLangStr("HeroDefendMsg12"));
                return;
            }
            else if (tempPetInfo.onStore)
            {
                tempPetInfo.onStore = false;
                buzhenInfo.removeStore(tempPetInfo.sn);
            }
            else
            {
                if (buzhenInfo.setStoreIndex(-1, tempPetInfo))
                {
                    tempPetInfo.onStore = true;
                }
            }

            this.refreshPetsLayer();
        }

        /** 刷新上阵列表 */
        private refreshOnStoreList()
        {

            let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
            for (let i = 0; i < 9; i++)
            {
                let tempPosInfo = tmpBuZhenInfo.getPosAry()[i];
                if (tempPosInfo == null)
                {
                    continue;
                }

                //有阵法信息，却没有英雄信息，可能是英雄已经融掉了，或者被合成了吧, 又或者是增援英雄被重置了。
                let tmpHeroInfo: Net.hero = tmpBuZhenInfo.getHeroByStorePosInfo(tempPosInfo);
                if (!tmpHeroInfo)
                {
                    tmpBuZhenInfo.removeStoreByIndex(i);
                }
            }
        }

        //--------------------------------button--------------------------------------
        private onSureClick()
        {
            EmbattleDataMgr.saveCurBuZhenInfo(true);
            this.closeUI();
        }

        //---------------------------------event----------------------------------------
        private onTeamCampaign_SynPetAck()
        {

        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            /*
            if (step == GuideStep.Func_Expedition_4) {
                Laya.timer.once(500, this, () => {
                    let cell = this.UIPanel.DiffuctBox.getCellWithIndex(0) as ProUI.Fuben.Expedition.Choice.BoxItemUI;
                    GuideMgr.Inst.showFinger(cell.ChoiceBtn, false);
                });
            }
            */
        }

        /**
         * 操作本步引导
         */
        public Guide_Active(step: GuideStep)
        {
            /*
            if (step == GuideStep.Func_Expedition_4) {
                let cell = this.UIPanel.DiffuctBox.getCellWithIndex(0) as ProUI.Fuben.Expedition.Choice.BoxItemUI;
                cell.ChoiceBtn.activeEvent();
                GuideMgr.Inst.nextActive();
            }
            */
        }
    }
}