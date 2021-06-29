module Pro
{
    /**
    * 界面说明：公会战-挑战信息界面(战前准备)
    * @author jason.xu
    */
    export class FactionWarEnemyInfoMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.FactionWar.FactionWarEnemyInfoUI;

        private _fortData: Pb_God.PBFactionWarMemberDisplay;
        private _data: Pb_God.PBG2CFactionWarMemberInfoAck;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("factionwar")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.FactionWar.FactionWarEnemyInfoUI, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnDefDetails.onClick(this, this.onClickDefDetails);
            this.UIPanel.btnAttack1.onClick(this, () => { this.sendAttack(1) });
            this.UIPanel.btnAttack2.onClick(this, () => { this.sendAttack(2) });
            this.UIPanel.btnAttack3.onClick(this, () => { this.sendAttack(3) });
            this.UIPanel.btnAttack.onClick(this, this.onClickDestroyAttack);

            this.addEventMgr(CmdEvent.FactionWar_QueryMemberInfoAck, this, this.onQueryMemberInfoAck);

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击防御次数查看详情按钮 */
        private onClickDefDetails(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWarFortRecord, this._fortData.playerdisplay.playerid));
        }

        /** 点击废墟攻击按钮 */
        private onClickDestroyAttack(): void
        {
            //二次确认
            let des = Global.getLangStr("factionwar_msg7"); //挑战废墟获得的战绩将大大减少，推荐优先挑战其他未沦陷的据点，是否继续挑战废墟？"
            AlertShow.showConfirmAlert(des, this, () => { this.sendAttack(0) });
        }

        /** 发起攻击 */
        private sendAttack(degree: number): void
        {
            if (!this._data) return;
            if (FactionDataMgr.warState != E_FactionWarState.Open)
            {
                TipsUtils.showTipsByLanId("tips_msg22");
                return;
            }
            if (FactionDataMgr.warUseCount >= cfg.FactionWarConstCfgData.getFirstInfo().dayFightCount)
            {
                TipsUtils.showTipsByLanId("common_noCount2");
                return;
            }

            //据点挑战次数
            if (this._data.toldefensecount >= cfg.FactionWarConstCfgData.getFirstInfo().runieFightCount)
            {
                TipsUtils.showTipsByLanId("tips_msg23");
                return;
            }
            //发起战斗
            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_FactionWar, this._data.battledisplay.playerdisplay.playerid, degree);
            // UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_FactionWar, this._data.battledisplay.playerdisplay.playerid, degree));
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();

            //奖励预览
            let addItems = cfg.FactionWarFightPrizeCfgData.getSucAddItemAryByStar(3);
            this.UIPanel.listItemView.onRefresh(addItems.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(addItems[index]);
            });

            // 先隐藏掉基础显示，等有数据时再显示出来
            this.UIPanel.listPetView.visible = false;
            this.UIPanel.viewAttackInfo.visible = false;
            this.UIPanel.viewBuffInfo.visible = false;

            this._fortData = this.UIOpenData.customObject;
            FactionSend.queryMemberInfo(this._fortData.playerdisplay.playerid, 0, 0, 0);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            //自己剩余次数
            let totalCount = cfg.FactionWarConstCfgData.getFirstInfo().dayFightCount;
            let count = totalCount - FactionDataMgr.warUseCount;
            this.UIPanel.txtLeftCount.text = count + "/" + totalCount;
        }


		/*****
		 *	返回查询成员信息		PBG2CFactionWarMemberInfoAck
		 * @param PBG2CFactionWarMemberInfoAck
		 * 		battledisplay			PBBattleDisplay	帮派显示
		 * 		beattackstar			uint32	被攻打星数
		 * 		sucdefensecount			uint32	成功防御次数
		 * 		toldefensecount			uint32	据点被挑战次数
		 */
        protected onQueryMemberInfoAck(value: Pb_God.PBG2CFactionWarMemberInfoAck): void
        {
            this._data = value;
            let starCount = 3 - value.beattackstar;
            //防御次数
            let defCount = value.sucdefensecount;
            this.UIPanel.txtDefCount.text = Global.getLangStr("factionwar_msg1", defCount);
            //敌方英雄信息
            this.refreshEnemyInfo(value.battledisplay);
            //左上角的星星数
            for (let i = 0; i < 3; i++)
            {
                (this.UIPanel.listStar.getChildAt(i) as Laya.Image).gray = starCount <= i;
            }

            if (starCount <= 0)
            { //满3颗星显示BUFF加成信息
                this.UIPanel.viewAttackInfo.visible = false;
                this.UIPanel.viewBuffInfo.visible = true;
                this.refreshAddBuffView(value.toldefensecount);
            } else
            {
                this.UIPanel.viewAttackInfo.visible = true;
                this.UIPanel.viewBuffInfo.visible = false;
                this.refreshAttackDegreeView(starCount, this._fortData.rank);
            }
        }

        /** 刷新敌方信息 */
        private refreshEnemyInfo(battledisplay: Pb_God.PBBattleDisplay): void
        {
            this.UIPanel.txtFightValue.text = battledisplay.fightpower + "";
            this.UIPanel.txtEmbattleName.text = cfg.PetFormationCfgData.getNameByID(battledisplay.zhenfaid);
            Global.setResPetZhengfa(this.UIPanel.imgEmbattleIcon, battledisplay.zhenfaid);
            //上阵英雄列表
            let heros = battledisplay.petdisplay;
            this.UIPanel.listPetView.visible = true;
            this.UIPanel.listPetView.onRefresh(heros.length, this, (norItem: NorItemUI, indexPet: number) =>
            {
                let petData = heros[indexPet];
                norItem.setPetInfo(petData, false, false);
            })
        }

        /** 刷新BUFF加成显示 */
        private refreshAddBuffView(toldefensecount: number): void
        {
            //等级显示
            let buffLv = FactionDataMgr.warBuffLv;
            let buffTotalLv = cfg.FactionWarConstCfgData.getFirstInfo().runieSkillMaxLevel;
            if (buffLv > buffTotalLv) buffLv = buffTotalLv;
            this.UIPanel.txtLv.text = buffLv + "/" + buffTotalLv;
            this.UIPanel.imgLvProgress.scaleX = buffLv / buffTotalLv;
            //据点挑战次数
            let totalCount = cfg.FactionWarConstCfgData.getFirstInfo().runieFightCount;
            this.UIPanel.txtFortCount.text = toldefensecount + "/" + totalCount;

            let buffSkillId = cfg.FactionWarConstCfgData.getFirstInfo().runieSkillID;
            //属性加成列表
            let curList = this.__getBuffValueArr(buffSkillId, buffLv);
            let nextList = this.__getBuffValueArr(buffSkillId, buffLv + 1);
            let curAttrMap = Global.listToStringMapData(curList, "atterID");
            let nextAttrMap = Global.listToStringMapData(nextList, "atterID");
            //将两组属性组合起来, 保证所有属性都有显示。
            let allAttrMap = Global.listToStringMapData(curList, "atterID");
            Global.listToStringMapData(curList, "atterID", allAttrMap, false);
            let allKeys = allAttrMap.getKeys();
            this.UIPanel.listAddBuffAttr.onRefresh(allKeys.length, this, (tempUI: ProUI.FactionWar.ChildView.AddBuffAttrItemViewUI, index: number) =>
            {
                let key = allKeys[index];
                let attrFrom = curAttrMap.get(key);
                let attrTo = nextAttrMap.get(key);
                tempUI.txtAttrName.text = cfg.BattleCfgData.getDescByAttrType(parseInt(key));
                tempUI.txtFromValue.text = this.__getAttrValueString(attrFrom);
                tempUI.imgTo.visible = !!attrTo;
                tempUI.txtToValue.text = this.__getAttrValueString(attrTo);
            })
        }


        /** 解析该属性值是数值成加还是百分比加成  获取属性值字符串展示 */
        private __getAttrValueString(attr: any): string
        {
            if (!attr) return "";
            return attr.atterValue ? attr.atterValue + "" : Global.parsePercentNum(attr.atterPecValue / 100);
        }

        private __getBuffValueArr(skillId: number, skillLv: number): any[]
        {
            let skillCfgInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(skillId, skillLv);
            if (!skillCfgInfo) return [];
            let ret = [].concat(cfg.SkillNewSkillCfgData.getAddSelfAttrAryByIndex(skillCfgInfo.skillIndex));
            return ret;
        }

        /** 刷新难度列表显示 */
        private refreshAttackDegreeView(starCount: number, fortRank: number): void
        {
            for (let i = 0; i < 3; i++)
            {
                let star = i + 1;
                let degreeNode = this.UIPanel.degreeList.getChildAt(i);
                let txtExploits = degreeNode.getChildByName("txtAddExploits") as component.UILabel;
                let exploits = cfg.FactionWarFightPrizeCfgData.getFightPointParamByStar(star);
                exploits -= Math.ceil((fortRank - 1) * cfg.FactionWarFightPrizeCfgData.getFightPointRateByStar(star) / 10000);
                txtExploits.text = "+" + exploits + Global.getLangStr("factionwar_msg8");//战绩";
                let btn = degreeNode.getChildByName("btn") as component.UIButton;
                let img = degreeNode.getChildByName("img") as Laya.Image;
                img.gray = btn.disabled = starCount <= i;
            }
        }
    }
}