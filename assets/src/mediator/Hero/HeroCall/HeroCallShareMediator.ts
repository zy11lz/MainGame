
module Pro
{
	/**
	 * 召唤角色列表
	 */
    export class HeroCallShareMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        UIPanel: ProUI.Hero.HeroCall.Share.MainUI;


        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            let ret = [];
            return ret;
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroCall.Share.MainUI, 0, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            let obj = this.UIOpenData.customObject;
            let name = obj[2];
            this.UIPanel.nameLbl.text = name;
            let head = obj[3];
            let frame = obj[4];
            let ou = obj[1];

            this.UIPanel.ouLbl.text = ou;
            //头像框                   
            Global.setResIconWithItemID(this.UIPanel.PlayerIconImg, CfgID.ResType.Player_Icon, head);
            Global.setResHeadBorder(this.UIPanel.PlayerIconFrameImg, frame);

            let data = obj[0];

            this.UIPanel.ItemBox.visible = data.length > 0;
            this.UIPanel.ItemBox.onRefresh(data.length, this, (itemUI: NorItemUI, index: number) =>
            {
                let petStar = data[index]
                itemUI.setPetStarInfo(petStar);
            });
        }


        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }

    }
}