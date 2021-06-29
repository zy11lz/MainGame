module Pro
{
    /**
     * 神界冒险主玩法 地图块格子视图
     * * 主要处理地图块中的操作与各种不同事件点击之后的操作。
     * <p> 地图块分两层： 静止层与动画层，两个层各自有一个列表视图，每个单元格位置都是对上的，两层搭配使用。
     * <p> 静止层放置一些静态的物件，比如地表，阴影，固定的雕像等， 最终会cache to bitmap
     * <p> 动画层放置一些会动的物件，比如一蹦一蹦的NPC头像等。
    * @author jason.xu
    */
    export class RiskMainGridFloorView extends ProUI.Risk.ChildView.RiskGridFloorViewUI
    {
        /** 界面内用到的tween */
        private _tweens: Laya.Tween[] = [];
        /** 界面内用到的特效node */
        private _effNodes: EffNode[] = [];


        constructor()
        {
            super();
            this.init();
        }
        private init()
        {

        }

        public addEvent(): void
        {
            EventMgr.on(EventNotify.Risk_AllGrid_Update, this, this.refreshView);
            EventMgr.on(EventNotify.Risk_SingleGrid_Update, this, this.onUpdateSingleGrid);

        }
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Risk_AllGrid_Update, this, this.refreshView);
            EventMgr.off(EventNotify.Risk_SingleGrid_Update, this, this.onUpdateSingleGrid);
        }

        /** 清理数据 */
        public cleanUp(): void
        {
            for (var tween of this._tweens)
            {
                tween.clear();
            }
            for (var effNode of this._effNodes)
            {
                if (effNode)
                {
                    // effNode.removeSelf();
                    EffectMgr.Inst.releaseEffect(effNode);
                }
            }
            this._effNodes = [];
            this._tweens = [];
        }

        /** 刷新单个格子 */
        private onUpdateSingleGrid(index: number): void
        {
            this.onRefreshStaticGridItem(this.listStatic.getCellWithIndex(index), index);
            this.onRefreshAnimateGridItem(this.listAnimate.getCellWithIndex(index), index);
        }

        public refreshView(): void
        {
            this.cleanUp();
            //刷新静态层
            this.listStatic.onRefresh(25, this, this.onRefreshStaticGridItem);
            //刷新动态层
            this.listAnimate.onRefresh(25, this, this.onRefreshAnimateGridItem);
        }

        /** 刷新静态层单元格数据（与动态层逻辑搭配） */
        private onRefreshStaticGridItem(tempUI: ProUI.Risk.ChildView.RiskGridStaticUI, index: number): void
        {
            tempUI.onClick(this, this.onClickGridItem);
            let gridData = RiskDataMgr.getGuardInfoByGridindex(index) || RiskDataMgr.gridDataList[index];
            let openstate = gridData ? gridData.openstate : Pb_God._emRiskGridOpenState.RiskGridOpenState_None;
            //格子还未翻开
            if (openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_None ||
                openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_OpenNoSee)
            {
                tempUI.imgMask.visible = false; //UI意见： 格子开启后，就显示一个蒙板
                // let skin = "res/riskmain/risk_grid_bossnoopen.png";  //终级BOSS与普通格子未开放时的样式区分
                // if (!gridData || gridData.type != Pb_God._emRiskRefreshType.RiskRefreshType_GuardBoss)
                //     skin = this.getRandomGridRes();
                // tempUI.imgObstacle.visible = true;
                // tempUI.imgObstacle.skin = skin;
                //终级BOSS与普通格子未开放时的样式区分: 终级BOSS在未开启时，显示另外一种效果图标
                if (gridData && gridData.type == Pb_God._emRiskRefreshType.RiskRefreshType_GuardBoss)
                {
                    tempUI.imgEventIcon.skin = "res/riskmain/risk_grid_bossnoopen.png";
                } else
                {
                    tempUI.imgEventIcon.skin = "";
                }
                tempUI.imgShadow.visible = false;
                return;
            }
            tempUI.imgMask.visible = true; //UI意见： 格子开启后，就显示一个蒙板
            // tempUI.imgObstacle.visible = false;
            //已经采过了， 然而格子上的商店比较特殊，是常驻的，即使HaveCollect也还需要显示
            if (openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect && gridData.type != Pb_God._emRiskRefreshType.RiskRefreshType_Shop)
            {
                tempUI.imgEventIcon.skin = "";
                tempUI.imgShadow.visible = false;
                return;
            }
            let showData = this.getGridEventShowData(gridData);
            tempUI.imgShadow.visible = !!showData.shadow;
            tempUI.imgEventIcon.skin = showData.staticEventIcon || "";
        }

        /** 刷新动态层单元格数据（与静态层逻辑搭配） */
        private onRefreshAnimateGridItem(tempUI: ProUI.Risk.ChildView.RiskGridAnimateUI, index: number): void
        {
            let gridData = RiskDataMgr.getGuardInfoByGridindex(index) || RiskDataMgr.gridDataList[index];
            //清掉所有动画
            Laya.Tween.clearTween(tempUI.image);
            Laya.Tween.clearTween(tempUI.boxBoss);
            tempUI.boxBoss.visible = false;
            tempUI.image.visible = false;
            //没有开启或者已经开采过了
            if (!gridData ||
                gridData.openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_OpenNoSee ||
                gridData.openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_None ||
                gridData.openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect)
            {
                return;
            }

            let showData = this.getGridEventShowData(gridData);

            if (!showData.animate) { return; } //没有动画
            //动画类型，暂时只发现上下循环动的。
            if (showData.animate.isGuard)
            { //守卫
                let guardInfo = gridData as RiskGuardInfo;
                tempUI.boxBoss.visible = true;
                tempUI.imgBossFrame.frame = guardInfo.guardIndex;
                let monsterInfo = cfg.RiskMonsterNewCfgData.getMonterInfoWithID(guardInfo.monsterId);
                Global.setResIconWithItemID(tempUI.imgIconBoss, CfgID.ResType.Pet, monsterInfo.skinId);
                tempUI.boxBoss.y = 7;
                this._tweens[this._tweens.length] = Public.EffectUtils.yoyoTween(tempUI.boxBoss, { y: -10 }, 600, 0);
            } else if (showData.animate.effectName)
            { //动画特效
                this._effNodes[this._effNodes.length] = EffectMgr.Inst.createEffectOne(showData.animate.effectName,
                    new Laya.Point(71, 64), -1, 1, 0.7, tempUI, false, ResReleaseType.Reference, false);
            } else
            {
                tempUI.image.visible = true;
                tempUI.image.y = 49;
                tempUI.image.skin = showData.animate.icon;
                this._tweens[this._tweens.length] = Public.EffectUtils.yoyoTween(tempUI.image, { y: 30 }, 600, 0);
            }
        }

        /** 根据事件类型，取得该类型事件显示信息 */
        private getGridEventShowData(gridData: RiskGuardInfo | Pb_God.PBPlayerRiskGrid): any
        {
            let ret = { animate: null, shadow: false, staticEventIcon: "" };
            switch (gridData.type)
            {
                case Pb_God._emRiskRefreshType.RiskRefreshType_Gold:  //金币
                case Pb_God._emRiskRefreshType.RiskRefreshType_Rune:  //符文精华
                case Pb_God._emRiskRefreshType.RiskRefreshType_GodStone:  //炼神石
                case Pb_God._emRiskRefreshType.RiskRefreshType_Skill:  //被动技能
                case Pb_God._emRiskRefreshType.RiskRefreshType_HpDrup:  //生命药剂
                case Pb_God._emRiskRefreshType.RiskRefreshType_KillDrug:  //驱魂药剂
                case Pb_God._emRiskRefreshType.RiskRefreshType_Trader:  //召唤商人次数;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Shop:    //商店;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Box: //宝箱;
                    ret.shadow = false;
                    ret.staticEventIcon = `res/riskmain/risk_gridevent_${ gridData.type }.png`;
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Key:  //钥匙
                case Pb_God._emRiskRefreshType.RiskRefreshType_Finger:  //猜拳;
                    ret.shadow = true; ret.animate = { icon: `res/riskmain/risk_gridevent_${ gridData.type }.png` };
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Question:    //答题;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Dialog:  //对话;
                    ret.shadow = false;
                    ret.staticEventIcon = `res/riskmain/risk_gridevent_9.png`;
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Event:   //神秘事件;
                    ret.animate = null; ret.shadow = false;
                    //神秘事件还需根据子类型区分显示
                    let sontype = cfg.RiskEventCfgData.getTargetTypeByID((gridData as Pb_God.PBPlayerRiskGrid).param);
                    ret.shadow = false;
                    ret.staticEventIcon = `res/riskmain/risk_gridevent_${ gridData.type }_${ sontype }.png`;
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Transfer:   //传送门（纯前端定义使用）
                    ret.shadow = false;
                    ret.animate = { effectName: "ui_shengjiemaoxianstatue" };
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardNormal1: //攻击守卫
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardNormal2: //攻击守卫
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardNormal3: //攻击守卫
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardNormal4: //攻击守卫
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardBoss: //攻击Boss
                    ret.animate = { isGuard: true }; ret.shadow = true;
                    break;
                default:
                    ret.animate = false; ret.shadow = false;
                    break;
            }

            return ret;
        }

        /** 点击单元格 */
        private onClickGridItem(btn: component.UIButton): void
        {
            let index = parseInt(btn.name);
            //该单元格的数据
            let gridData = RiskDataMgr.getGuardInfoByGridindex(index) || RiskDataMgr.gridDataList[index];
            if (!gridData || gridData.openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_None || gridData.openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_None)
            {
                TipsUtils.showTipsByLanId("tips_msg37");
                return;
            }
            //已经点过了
            if (gridData.openstate == Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect)
            {
                if (gridData.type == Pb_God._emRiskRefreshType.RiskRefreshType_Shop)  //商店类型比较特殊，是会常驻在格子上的，点过了还能点
                { this.switchByGrid(gridData); }
                return;
            }


            this.switchByGrid(gridData);
        }

        /** 根据不同的事件类型，跳转对应的业务 */
        private switchByGrid(gridData: RiskGuardInfo | Pb_God.PBPlayerRiskGrid): void
        {
            switch (gridData.type)
            {
                case Pb_God._emRiskRefreshType.RiskRefreshType_Gold:  //金币
                case Pb_God._emRiskRefreshType.RiskRefreshType_Rune:  //符文精华
                case Pb_God._emRiskRefreshType.RiskRefreshType_GodStone:  //炼神石
                case Pb_God._emRiskRefreshType.RiskRefreshType_Key:  //钥匙
                case Pb_God._emRiskRefreshType.RiskRefreshType_Skill:  //被动技能
                case Pb_God._emRiskRefreshType.RiskRefreshType_HpDrup:  //生命药剂
                case Pb_God._emRiskRefreshType.RiskRefreshType_KillDrug:  //驱魂药剂
                case Pb_God._emRiskRefreshType.RiskRefreshType_Trader:  //召唤商人次数;
                    this.clickEventReward(gridData.grid);  //直接领奖
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Shop:    //商店;
                    this.clickEventCallShop(gridData as Pb_God.PBPlayerRiskGrid);
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Finger:  //猜拳;
                    this.clickEventGuess(gridData.grid);
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Box: //宝箱;
                    this.clickEventBox(gridData.grid);
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Question:    //答题;
                    this.clickEventAnswer(gridData.grid);
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Dialog:  //对话;
                    this.clickEventDialog(gridData.grid);
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Event:   //神秘事件;
                    this.clickEventMystery(gridData.grid);
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_Transfer:   //传送门（纯前端定义使用）
                    this.clickEventToNext();
                    break;
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardNormal1: //攻击守卫
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardNormal2: //攻击守卫
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardNormal3: //攻击守卫
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardNormal4: //攻击守卫
                case Pb_God._emRiskRefreshType.RiskRefreshType_GuardBoss: //攻击Boss
                    this.clickAttackGuarder(gridData);
                    break;
                default:
                    break;
            }
        }

        /** 事件-通往下一关的入口 */
        private clickEventToNext(): void
        {
            //判断是否已经全部通关
            if (RiskDataMgr.isAllPass())
            {
                TipsUtils.showTipsByLanId("risk_msg18");
                return;
            }
            //二级确认
            let des = Global.getLangStr("risk_msg10"); //进入下一层后，将无法返回该层，是否进入？";
            AlertShow.showConfirmAlert(des, this, () =>
            {
                //向服务器请求进入下一层
                RiskSend.enterNextStage();
            })
        }

        /** 事件，直接领奖（包括领BUFF，道具等） */
        private clickEventReward(grid: number): void
        {
            RiskSend.collectGrid(grid, 0, 0);
        }

        /** 事件-召唤商店 */
        private clickEventCallShop(gridData: Pb_God.PBPlayerRiskGrid): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskCallShop, gridData));
        }

        /** 事件-挑战守卫 */
        private clickAttackGuarder(gridData: RiskGuardInfo | Pb_God.PBPlayerRiskGrid): void
        {
            //判断已方英雄是否还有活的
            for (var hero of RiskDataMgr.getFightHeroList())
            {
                if (hero.curhp.toNumber() > 0)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskPreBattle, gridData));
                    return;
                }
            }
            TipsUtils.showTipsByLanId("tips_msg38");
        }

        /** 事件-猜拳 */
        private clickEventGuess(grid: number): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskEventGuess, grid));
        }

        /** 事件-宝藏箱  */
        private clickEventBox(grid: number): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskEventBox, grid));
        }

        /** 事件-答题 */
        private clickEventAnswer(grid: number): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskEventAnswerReady, grid));
        }

        /** 事件-与老头对话 */
        private clickEventDialog(grid: number): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskEventDialog, grid));
        }

        /** 事件-神秘事件 */
        private clickEventMystery(grid: number): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskEventMystery, grid));
        }

    }
}