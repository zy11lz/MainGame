
module Pro
{
    /**
     * 战斗中角色管理
     */
    export class BatRoleMgr extends Laya.EventDispatcher
    {

        //---------------------------------------------------------------------------------
        /** 战场管理器 */
        public placeMgr: BatPlaceMgr;

        //------------------------------------------角色列表--------------------------------
        /** 角色列表 */
        private roleList: Array<BaseAtker> = [];

        private roleMap: ds.StringMap<BaseAtker>;

        /** 我方角色的初始信息 */
        private ownPetInfos: Pb_God.PBBattlePetInfo[];

        /** 对方角色的初始信息 */
        private otherPetInfos: Pb_God.PBBattlePetInfo[];

        constructor(placeMgr: BatPlaceMgr)
        {
            super();
            this.placeMgr = placeMgr;
            this.roleMap = new ds.StringMap<BaseAtker>();
        }

        //---------------------------------------------------------------------------------
        // /**
        //  * 最大战斗回合数
        //  */
        // public getMaxTrun(): number
        // {
        //     return this.inMaxTrun;
        // }

        // /**
        //  * 设置最大战斗回合数
        //  */
        // public setMaxTrun(value: number): void
        // {
        //     this.inMaxTrun = value;
        // }

        // /**
        //  * 当前战斗回合数
        //  */
        // public getInTrun(): number
        // {
        //     return this.inTrunNum;
        // }

        /** 获取roleList */
        public getRoleList(): Array<BaseAtker>
        {
            return this.roleList;
        }

        //---------------------------------------------------------------------------------
        /**
         * 角色数据回收
         * @param statue -1表示所有角色，0表示敌方，1表示我方
         *  */
        public reset(statue: number = -1)
        {

            //回收角色资源
            for (let i = this.roleList.length - 1; i >= 0; i--)
            {
                let element = this.roleList[i];
                let tmpStatue = element.roleData.isOwer ? 1 : 0;
                if (statue == -1 || tmpStatue == statue)
                {
                    // element.recycleRes();
                    RoleManager.release(element);
                    this.roleList.splice(i, 1);
                }
            }

            // this.inTrunNum = 0;
            Laya.timer.clearAll(this);
        }

        /**
         * 设置播放速度
         */
        public setActionSpeed(toSpeed: number)
        {
            this.roleList.forEach(elment =>
            {
                elment.actionSpeed = toSpeed;
            });
        }

        /**
         * 设置角色是否显示皮肤
         */
        public setIsWatching(isShow: boolean)
        {
            this.roleList.forEach(elment =>
            {
                elment.setIsWatching(isShow);
            });
        }

        //------------------------------------------------------逻辑循环配合方法--------------------------------------------------
        /**
         * 逻辑循环
         */
        public doRoleLogic()
        {
            //角色循环逻辑
            this.roleLogic(this.roleList);
        }

        /**
         * 是否有一方角色全死亡
         */
        private roleLogic(elment: Array<BaseAtker>): void
        {
            let ownLifeNum = 0;
            let otherLifeNum = 0;
            let tempIndex = 0;
            while (tempIndex < elment.length)
            {
                let baseAtker = elment[tempIndex++] as BaseAtker;
                baseAtker.update()
            }
        }

        /**
         * 当轮战斗完成
         * @param isCherkInAction 是否检测是否有角色在动画表现中
         */
        public role_Turn_Finish(isCherkInAction: boolean, needWaiting: boolean = true)
        {
            this.roleLogic(this.roleList)
            //刷新UI状态
            this.placeMgr.ui_Statue_Change();
            // this.event(BattleEvent.ACTION_COMPLETE);
        }

        /** 获取某方阵营的角色列表 */
        public getRolesWithType(isOwer: boolean): Array<BaseAtker>
        {
            return this.roleList.filter(elment => elment.roleData.isOwer == isOwer);
        }

        /** 获取某方阵营的角色 */
        public getRoleWithStandIndex(isOwer: boolean, standIndex: number): BaseAtker
        {
            let results = this.roleList.filter(elment => elment.roleData.isOwer == isOwer && elment.roleData.standIndex == standIndex);
            return results.length > 0 ? results[0] : null;
        }

        //-------------------------------------------------------------创建战斗角色--------------------------------------------------------
        /**
         * 创建战斗双方角色
         */
        public createBatTeam(): void
        {

            //属于继续战斗
            let isConnect = this.roleList.length > 0;
            let isWatching = this.placeMgr.getIsWatching();
            if (isConnect)
            {
                //回收对方资源
                this.reset(0);
                //我方伙伴列表
                let tmpOwnPetInfos = this.placeMgr.getBattlePetInfos(true);
                //同步服务端数据
                if (!BatCfg.UseClientResult)
                {

                    //获取我方阵型属性
                    let tmpOwnFormaAttrs = [];// this.getFormationAttrByTeam(tmpOwnPetInfos);

                    //获取神器属性
                    let tmpOwnArtInfo = this.placeMgr.getBattlePetArtifact(true);
                    let tmpOwnArtAttrs = tmpOwnArtInfo != null ? tmpOwnArtInfo.attr : null;

                    //我方数据刷新
                    for (let i = 0; i < tmpOwnPetInfos.length; i++)
                    {
                        let tmpPetInfo = tmpOwnPetInfos[i] as Pb_God.PBBattlePetInfo;
                        let tmpPetStIndex = GameConfig.AtkStandAry[tmpPetInfo.pos - 1];
                        let tmpRoleInfo = this.getRoleWithStandIndex(true, tmpPetStIndex);
                        if (tmpRoleInfo != null)
                        {
                            tmpRoleInfo.roleData.initBatInfo(tmpPetInfo, this.placeMgr.getBattleType(), true, tmpOwnFormaAttrs, tmpOwnArtAttrs);
                        }
                    }
                }
                else
                {
                    //我方数据刷新
                    for (let i = 0; i < tmpOwnPetInfos.length; i++)
                    {
                        let tmpPetInfo = tmpOwnPetInfos[i] as Pb_God.PBBattlePetInfo;
                        let tmpPetStIndex = GameConfig.AtkStandAry[tmpPetInfo.pos - 1];
                        let tmpRoleInfo = this.getRoleWithStandIndex(true, tmpPetStIndex);
                        if (tmpRoleInfo != null)
                        {
                            tmpRoleInfo.roleData.resetEndlessStatue();
                        }
                    }
                }

                //敌方角色
                this.createTeamWithServer(false, this.placeMgr.getBattlePetInfos(false), isWatching);

                //角色进场动画
                this.startBattleAction(0);
            }
            else
            {

                //我方角色
                this.createTeamWithServer(true, this.placeMgr.getBattlePetInfos(true), isWatching);

                //敌方角色
                this.createTeamWithServer(false, this.placeMgr.getBattlePetInfos(false), isWatching);

                //开场特效
                if (isWatching)
                {
                    FightCommingEffect.showEff_fightComing(this.placeMgr.getBattleType(), this.placeMgr.getBattleID(), this.placeMgr.getAttackName(), this.placeMgr.getDefenseName());
                }

                this.placeMgr.hideFightRole();
                //角色进场动画
                Laya.timer.once(1300, this, () =>
                {
                    this.startBattleAction(-1);
                });
            }
        }

        /**
         * 角色开启战斗前动画表现
         * @param statue -1表示所有角色，0表示敌方，1表示我方
         */
        private startBattleAction(statue: number)
        {
            this.placeMgr.showFightRole();
            let tmpAutoStartRound = true;
            let tmpAutoIsOwner = statue == -1;
            if (this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_Endless)
            {
                tmpAutoStartRound = TrainDataMgr.getEndlessBuffgroup() == 0; //无尽试炼选BUFF时，战斗还要暂停一下。
                // let tmpNeedChoiceBuff = (this.placeMgr.getBattleID() - TrainDataMgr.getEndlessDaybeginstage()) % 5 == 1;
                // tmpAutoStartRound = !tmpNeedChoiceBuff || (tmpNeedChoiceBuff && TrainDataMgr.getEndlessBuffgroup() > 0 && TrainDataMgr.getEndlessSkillIndex() != -1);
            }

            for (let i = 0; i < this.roleList.length; i++)
            {
                let tmpRole = this.roleList[i];
                let tmpStatue = tmpRole.roleData.isOwer ? 1 : 0;
                if (statue == -1 || tmpStatue == statue)
                {
                    let tempPos = Global.getHeroStandPos(tmpRole.roleData.standIndex, tmpRole.roleData.isOwer);
                    tmpRole.x = tempPos.x + (tmpRole.roleData.isOwer ? -1 : 1) * (GameConfig.curWidth() / 2 - 150);
                    tmpRole.y = tempPos.y;

                    if (tmpAutoStartRound && tmpRole.roleData.isOwer == tmpAutoIsOwner)
                    {
                        tmpRole.gotoPosition(tempPos, true);
                        tmpAutoStartRound = false;
                    }
                    else
                    {
                        tmpRole.gotoPosition(tempPos);
                    }
                }
            }
        }

        /** 根据服务器战斗队伍信息创建一个阵营 */
        private createTeamWithServer(isOwer: boolean, petInfos: Pb_God.PBBattlePetInfo[], isWatching: boolean)
        {
            //记录双方队伍状态
            if (isOwer)
            {
                this.ownPetInfos = petInfos;
            }
            else
            {
                this.otherPetInfos = petInfos;
            }

            //获取阵型属性
            let tmpFormaAttrs = []//this.getFormationAttrByTeam(petInfos);

            //获取神器属性
            let tmpArtInfo = this.placeMgr.getBattlePetArtifact(isOwer);
            let tmpArtAttrs = tmpArtInfo != null ? tmpArtInfo.attr : null;

            //数据初始化
            for (let i = 0; i < petInfos.length; i++)
            {
                let tmpBatInfo = petInfos[i] as Pb_God.PBBattlePetInfo;
                let baseAtker: BaseAtker = this.placeMgr.createHero(this.placeMgr.getBattleType(), isOwer);
                //初始数据，清空buff数据
                baseAtker.roleData.initBatInfo(tmpBatInfo, this.placeMgr.getBattleType(), isOwer, tmpFormaAttrs, tmpArtAttrs);
                baseAtker.setIsWatching(isWatching);
                baseAtker.resetRes();
                baseAtker.actionSpeed = BattleMgr.Inst.getActionSpeed();
                //记录索引
                this.roleList.push(baseAtker);
                this.roleMap.put(baseAtker.roleData.unitId, baseAtker);

            }
        }

        //----------------------------------------------------------------------------------------------------------------


        public getBattleRoleByServerIndex(index: number): BaseAtker
        {
            return this.roleMap.get(index);
        }

        toPlayWinAni()
        {
            for (let index = 0; index < this.roleList.length; index++)
            {
                const baseAtker: BaseAtker = this.roleList[index];
                if (baseAtker.roleData.isOwer && baseAtker.roleData.getHp() > 0)
                {
                    baseAtker.playAction(RoleActionStatue.win)
                }
            }
        }

    }
}