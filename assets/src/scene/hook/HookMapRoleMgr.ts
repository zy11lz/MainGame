
module Pro
{
    /**
     * 挂机场景的角色管理
     */
    export class HookMapRoleMgr
    {

        public static hookLineNum: number = 3;

        private _hookLineArr: HookFightLine[] = [];
        //----------------------------------节点显示--------------------------

        /** 角色模型层 */
        private _roleModelLayer: Laya.Sprite;

        /** UI状态层 */
        private _statueUILayer: Laya.Sprite;

        /** 角色所在场景 */
        private _inLayer: HookBattleLayer;

        //----------------------------------挂机状态------------------------
        /** 下次挂机生成怪物时间 */
        private _nextCreateMonsterTime = 0;

        //---------------------------------挂机提示--------------------------
        /** 挂机怪物头顶显示提示时间 */
        private _nextTipsTime = 0;
        /** 头顶提示UI */
        private _hookTipsUI: ProUI.Scene.City.Utils.HookTipsUI;

        private _monsterLine: number = -1;

        //----------------------------------------------------------------
        constructor()
        {
            for (let index = 0; index < HookMapRoleMgr.hookLineNum; index++)
            {
                const element = new HookFightLine(index + 1);
                this._hookLineArr.push(element);
            }
        }

        //----------------------------------控制---------------------------
        /** 初始化控制 */
        public startLogic(layer: HookBattleLayer)
        {
            //所在层
            this._inLayer = layer;

            /** 角色模型层 */
            this._roleModelLayer = new Laya.Sprite();
            this._inLayer.addChild(this._roleModelLayer);
            /** UI状态层 */
            this._statueUILayer = new Laya.Sprite();
            this._inLayer.addChild(this._statueUILayer);

            this.adjustScreenPos();

            for (let index = 0; index < HookMapRoleMgr.hookLineNum; index++)
            {
                const element = this._hookLineArr[index];
                element.setLayer(this._roleModelLayer, this._statueUILayer);
            }
        }

        public adjustScreenPos()
        {
            this._roleModelLayer.y = this._statueUILayer.y = Laya.stage.height - GameConfig.WinHeight >> 1;
        }

        /** 移除控制 */
        public stopLogic()
        {
            this.reset();
        }

        /** 重置逻辑 */
        public reset()
        {
            for (let index = 0; index < HookMapRoleMgr.hookLineNum; index++)
            {
                const element = this._hookLineArr[index];
                element.reset();
            }
            this._nextCreateMonsterTime = 0;
            this._nextTipsTime = Laya.timer.currTimer + 2000;
            if (this._hookTipsUI != null)
            {
                Laya.Tween.clearAll(this._hookTipsUI);
                this._hookTipsUI.visible = false;
            }
        }

        /** 是否显示角色层 */
        public controlShow(isShow: boolean)
        {
            // this._roleSDLayer.visible = isShow;
            this._roleModelLayer.visible = isShow;
            this._statueUILayer.visible = isShow;
        }

        //---------------------------------公共逻辑----------------------------
        /** 逻辑循环 */
        public doLogic()
        {
            Global.sortSpriteNode(this._roleModelLayer);

            for (let index = 0; index < HookMapRoleMgr.hookLineNum; index++)
            {
                const element: HookFightLine = this._hookLineArr[index];
                element.update();
            }

            let hasHungMonster = this.isHaveMonster();// false; //场上还有怪物的话，就不需要再创建新的。
            let currTimer = Laya.timer.currTimer;
            if (!hasHungMonster)
            {
                if (currTimer > this._nextCreateMonsterTime)
                {
                    this._nextCreateMonsterTime = currTimer + Global.getRandomNum(8, 16) * 1000;
                    this.createMonster();
                }
            }
        }

        /**
         * 场上是否还有怪物
         */
        isHaveMonster()
        {
            var hasHungMonster = false;
            for (let index = 0; index < HookMapRoleMgr.hookLineNum; index++)
            {
                const element: HookFightLine = this._hookLineArr[index];
                if (!hasHungMonster)
                {
                    hasHungMonster = element.isHaveMonster();
                }
            }
            return hasHungMonster;
        }

        //-----------------------------------------角色对象生成----------------------------------------
        /** 创建初始队伍 */
        public createBaseTeam()
        {
            for (let index = 0; index < HookMapRoleMgr.hookLineNum; index++)
            {
                const element: HookFightLine = this._hookLineArr[index];
                element.createBaseTeam();
            }
        }


        /** 这对应这一行角色前生成一只怪物 */
        private createMonster()
        {
            this._monsterLine++;
            if (this._monsterLine >= HookMapRoleMgr.hookLineNum)
            {
                this._monsterLine = 0;
            }
            for (let index = 0; index < HookMapRoleMgr.hookLineNum; index++)
            {
                var aaaindex = (this._monsterLine + index) % 3;
                const element: HookFightLine = this._hookLineArr[aaaindex];
                if (element.createMonster())
                {
                    this._monsterLine = aaaindex
                    break;
                }
            }
        }
    }
}