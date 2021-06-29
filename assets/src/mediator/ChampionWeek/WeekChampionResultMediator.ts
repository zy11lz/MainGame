module Pro
{
    /**
    * 
    * 模块：冠军赛结算结果界面
    *
    * @author jason.xu
    * 
    */
    export class WeekChampionResultMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.WeekChampion.WeekChampionResultUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("champion")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/championtop3/jiesuan_guanjun3.png","res/champion/jingji_pic_10.png", "res/champion/jingji_pic_11.png", "res/champion/jingji_pic_12.png", "res/champion/jingji_pic_13.png", "res/champion/jingji_pic_16.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.WeekChampion.WeekChampionResultUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let data = this.UIOpenData.customObject as Pb_God.PBG2CChampionEndResultAck;
            this.UIPanel.txtJoinCount.text = data.fightcount + "";
            this.UIPanel.txtRank.text = data.rank + "";
            this.UIPanel.txtWinCount.text = data.wincount + "";
            this.UIPanel.txtNickname.text = PlayerDataMgr.name;
            this.UIPanel.resultBox.refresh();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {

        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

    }
}