module Pro
{
    /*
    * name;
    */
    export class RoleActionStatue
    {

        static actionMap: ds.StringMap<RoleActionStatue>;
        static createStat(name: string, actionName: string, isLoop: boolean, userCache: boolean)
        {
            if (RoleActionStatue.actionMap == null)
            {
                RoleActionStatue.actionMap = new ds.StringMap<RoleActionStatue>();
            }
            var roleActionStatue: RoleActionStatue = new RoleActionStatue(name, actionName, isLoop, userCache);
            this.actionMap.put(actionName, roleActionStatue)
            return roleActionStatue;
        }

        /** 待机 */
        public static stand: RoleActionStatue = RoleActionStatue.createStat("stand", "standby_loop", true, true);
        /**普攻 */
        public static attack: RoleActionStatue = RoleActionStatue.createStat("attack", "attack", false, false);
        /** 技能2 */
        public static skill1: RoleActionStatue = RoleActionStatue.createStat("skill1", "skill1", false, false);
        /** 技能3 */
        public static skill2: RoleActionStatue = RoleActionStatue.createStat("skill2", "skill2", false, false);
        /** 技能4 */
        public static skill1_a: RoleActionStatue = RoleActionStatue.createStat("skill1_a", "skill1_a", false, false);
        /** 技能5 */
        public static skill1_b: RoleActionStatue = RoleActionStatue.createStat("skill1_b", "skill1_b", false, false);
        /** 移动 */
        public static move: RoleActionStatue = RoleActionStatue.createStat("move", "run_loop", true, true);
        /** 受击 */
        public static hurt: RoleActionStatue = RoleActionStatue.createStat("hurt", "hit", false, false);
        /** 胜利循环 */
        public static win_loop: RoleActionStatue = RoleActionStatue.createStat("win_loop", "win_loop", true, false);
        /** 胜利不循环 */
        public static win: RoleActionStatue = RoleActionStatue.createStat("win", "win_loop", false, false);

        actionName: string = "";
        isLoop: boolean = false;
        userCache: boolean = false;
        constructor(name: string, actionName: string, isLoop: boolean, userCache: boolean)
        {
            this.actionName = actionName;
            this.isLoop = isLoop;
            this.userCache = userCache;
        }

        static getAction(actionName: string): RoleActionStatue
        {
            var stat = this.actionMap.get(actionName);
            if (stat == null)
            {
                logE("这是什么动作，", actionName, "未映射", );
                stat = actionName as any;
            }
            return stat;
        }
    }

}