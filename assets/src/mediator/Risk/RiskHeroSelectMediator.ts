module Pro
{
    /**
    * 神界冒险：英雄选择界面（进入系统前先固定好英雄）
    * @author jason.xu
    */
    export class RiskHeroSelectMediator extends BaseMediator implements IMediator
    {
        private MAX_FIGHT_HERO: number = 5;

        /** 当前待命的英雄列表（已根据类型筛选） */
        private _heroList: Array<Net.hero>;
        /** 当前已上阵的英雄列表 */
        private _fightHeroList: Net.hero[] = [];
        /** 已上阵的英雄列表map（方便查询） */
        private _fightHeroMap = new ds.StringMap<boolean>();
        private _fightHeroIdMap = new ds.StringMap<boolean>();

        public UIPanel: ProUI.Risk.RiskHeroSelectUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
            // return [UrlMgr.getAtlas("rist")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskHeroSelectUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.listTabType.selectEnable = true;
            this.UIPanel.listTabType.onRefresh(6, this, (btn: component.UIButton, index: number) =>
            {
                Global.setResPetType(btn, index);
                // (btn.getChildByName("sel") as Laya.Image).visible = index == this.UIPanel.listTabType.selectedIndex;
            });
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._fightHeroList = [];
            this._fightHeroMap.clear();
            this._fightHeroIdMap.clear();

            this.UIPanel.listTabType.selectedIndex = -1;
            this.UIPanel.listTabType.selectedIndex = 0;
            this.refreshFightHeroList();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.refreshFightHeroList();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.addEventMgr(EventNotify.test, this, this.test);

            this.UIPanel.listTabType.on(Laya.Event.CHANGE, this, this.onChangeHeroType); //"change"
            this.UIPanel.btnAutoEmbattle.onClick(this, this.onClickAutoEmbattle);
            this.UIPanel.btnEnter.onClick(this, this.onClickEnter);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击一键布阵 */
        private onClickAutoEmbattle(): void
        {
            let count = this.MAX_FIGHT_HERO - this._fightHeroList.length;
            let allLen = this._heroList.length;
            for (let i = 0; i < allLen && count > 0; i++)
            {
                let hero = this._heroList[i];
                if (!this.isHeroFight(hero, true))
                {
                    count--;
                    this.resetHeroState(hero, true);
                }
            }
        }
        /** 点击进入 */
        private onClickEnter(): void
        {
            //检查上阵人数
            let count = this._fightHeroList.length;
            if (count <= 0)
            {
                TipsUtils.showTipsByLanId("tips_msg42");
                return;
            }
            //不足人数时，弹二级确认
            if (count < this.MAX_FIGHT_HERO)
            {
                let content = Global.getLangStr("tips_msg43");//当前上阵英雄不足5个，是否确认以此阵容进入冒险？";
                AlertShow.showConfirmAlert(content, this, this.__confirmEnter);
            } else
            {
                this.__confirmEnter();
            }
        }

        /** 确定进入 */
        private __confirmEnter(): void
        {
            //向服务器申请记录上阵英雄信息
            let list: Long[] = [];
            for (var hero of this._fightHeroList)
            {
                list.push(hero.sn);
            }
            // this.closeUI();
            this.closePanel(0, true, true);  //选择过英雄以后，两天以内这个界面不会再用了，故此消毁掉
            RiskSend.selectPet(list);
            RiskSend.open();
        }

        /** 点击切换英雄类型 */
        private onChangeHeroType(): void
        {
            let type = this.UIPanel.listTabType.selectedIndex;
            this._heroList = PetDataMgr.getPetList(type);
            this._heroList =this._heroList.filter(elment => !elment.isDefend);
            this.UIPanel.listWait.onRefresh(this._heroList.length, this, this.onWaitHeroListRender);
        }

        private onWaitHeroListRender(item: NorItemUI, index: number): void
        {
            let tmpHeroInfo = this._heroList[index] as Net.hero;
            item.setPetInfo(tmpHeroInfo, false, false);
            item.SelectStatueImg.visible = this.isHeroFight(tmpHeroInfo, false);
            //点击英雄头像
            item.onClick(this, () =>
            {
                //如果在阵上，就下阵， 相反则下阵
                this.resetHeroState(tmpHeroInfo, !this.isHeroFight(tmpHeroInfo, false));
            });
        }

        /** 刷新上阵英雄列表 */
        private refreshFightHeroList(): void
        {
            this.UIPanel.listFight.onRefresh(this._fightHeroList.length, this, this.onFightHeroListRender);
            //战斗力计算
            this.refreshFightPowerView();
        }

        private onFightHeroListRender(item: NorItemUI, index: number): void
        {
            let tmpHeroInfo = this._fightHeroList[index] as Net.hero;
            item.setPetInfo(tmpHeroInfo, false, false);
            item.SelectStatueImg.visible = false;
            //点击英雄头像
            item.onClick(this, () =>
            {
                //直接下阵即可
                this.resetHeroState(tmpHeroInfo, false);
            });
        }

        /** 英雄是否已经上阵 */
        private isHeroFight(hero: Net.hero, isCheckEqualType: boolean = false): boolean
        {
            if (this._fightHeroMap.get(hero.sn.toNumber())) return true;
            if (isCheckEqualType && this._fightHeroIdMap.get(hero.id)) return true;
            return false;
        }

        /** 英雄上阵下阵操作 */
        private resetHeroState(hero: Net.hero, isFight: boolean): void
        {
            if (isFight)
            {
                //检查上阵人数是否已满
                if (this._fightHeroList.length >= this.MAX_FIGHT_HERO)
                {
                    TipsUtils.showTipsByLanId("tips_msg44");
                    return;
                }
                //检查同类型ID的英雄是否上阵
                if (this._fightHeroIdMap.get(hero.id))
                {
                    TipsUtils.showTipsByLanId("tips_msg45");
                    return;
                }
                //检查胡帕和解放胡帕
                let hupas = [CfgID.PetID.HuPa, CfgID.PetID.HuPaLiberate];
                if (hupas.indexOf(hero.id) >= 0)
                {
                    for (let i = 0; i < hupas.length; i++)
                    {
                        if (this._fightHeroIdMap.get(hupas[i]))
                        {
                            TipsUtils.showTipsByLanId("tips_msg80");
                            return;
                        }
                    }
                }

            }

            this._fightHeroIdMap.put(hero.id, isFight);
            this._fightHeroMap.put(hero.sn.toNumber(), isFight);
            let waitIndex = this._heroList.indexOf(hero);
            //待选列表更新
            if (waitIndex >= 0)
            {
                //list
                this.UIPanel.listWait.setItem(waitIndex, hero);
            }
            //上阵刷新
            let fightIndex = this._fightHeroList.indexOf(hero);
            if (isFight)
            {
                this._fightHeroList.push(hero);
            }
            else
            {
                this._fightHeroList.splice(fightIndex, 1);
            }
            this.refreshFightHeroList();

        }

        /** 刷新战斗力显示 */
        private refreshFightPowerView(): void
        {
            let power = 0;
            for (let hero of this._fightHeroList)
            {
                power += hero.fightpower;
            }
            this.UIPanel.txtFightPower.text = power + "";
        }

    }
}