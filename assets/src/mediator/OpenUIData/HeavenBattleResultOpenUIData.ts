module Pro
{
    /**
     * 天界副本结算界面数据
     */
    export class HeavenBattleResultOpenUIData extends BaseOpenUIData
    {
        /** 奖励列表 */
        public ItemList: Array<cfg.AddItemInfo>;
        /** 掉落英雄列表 */
        public PetList: Pb_God.PBPetStar[];
        /** 星星列表 TODO取服务端数据 */
        public StarList: Array<number>;
        /** 关卡id */
        public StageIndex: number;
        /** 战斗结果 */
        public result: Pb_God.PBFightResult;
        constructor()
        {
            super(PanelNotify.Open_HeavenBattleResultView);
        }
    }
}