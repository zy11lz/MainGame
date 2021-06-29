module Pro
{
    /**
     * 天界副本结算界面数据
     */
    export class CrossChallengeResultOpenUIData extends BaseOpenUIData
    {
        /** 战斗结果 */
        public result: Pb_God.PBFightResult;
        constructor()
        {
            super(PanelNotify.Open_CrossChallengeResult);
        }
    }
}