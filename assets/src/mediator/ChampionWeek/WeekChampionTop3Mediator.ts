module Pro
{
    /**
    * 模块：周冠军赛前三甲显示
    * @author jason.xu
    */
    export class WeekChampionTop3Mediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.WeekChampion.WeekChampionTop3UI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup"),UrlMgr.getAtlas("championtop3")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/championtop3/txt_cn_arenatop_100.png", "res/championtop3/txt_cn_arenatop_101.png", "res/championtop3/txt_cn_arenatop_102.png", "res/championtop3/txt_cn_arenatop_103.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.WeekChampion.WeekChampionTop3UI, 1, BaseAddLayer.TopUI, true);
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

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {

        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

        /** 模块的刷新方法, 在模块每次被呼出的时候自动调用,  用来同步刷新数据和显示*/
        public refreshUI()
        {
            let data = this.UIOpenData.customObject as Pb_God.PBG2CChampionSynTopResult;
            if (!data) return;
            //比赛时间: 2019-10-10 23:59:59
            this.UIPanel.txtTime.text = Global.getLangStr("champ_msg7") + Global.getFormatTimeString(data.begintime * 1000, 4);
            //前三甲名字
            for (var i = 0; i < 3; i++)
            {
                let box = this.UIPanel.playerHeadList._children[i];
                let txtNickname = box.getChildByName("txtNickname") as component.UILabel;
                let viewPlayerIcon = box.getChildByName("viewPlayerIcon") as Pro.PlayerIconUI;
                let display = data.display[i];
                txtNickname.text = display ? display.playername : Global.getLangStr("common_empty1");
                viewPlayerIcon.setPlayerDisplayInfo(display, false);
            }
        }

    }
}