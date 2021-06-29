module Pro
{
    /**
     * 界面说明： 圣物进阶提示
    * @author jason.xu
    */
    export class HeroHolyUpAdvanceMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroUpSuc.HolyUpAdvanceUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("heroupsuc"), UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroUpSuc.HolyUpAdvanceUI, 1, BaseAddLayer.TopUI, true);
        }

        public closeUI(): void
        {
            super.closeUI();
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
            let holyInfo: Pb_God.PBPlayerHolyInfo = this.UIOpenData.customObject;
            let holyName = cfg.HolyUnlockCfgData.getNameByPetType(holyInfo.pettype);
            this.UIPanel.txtName.text = holyName;
            this.UIPanel.icon.skin = Global.getResHolyIconSkin(holyInfo.pettype, holyInfo.advance);

            let advanceCfgInfo = cfg.HolyAdvanceCfgData.getInfoByTypeAndLv(holyInfo.pettype, holyInfo.advance);
            let attrAry = cfg.HolyAdvanceCfgData.getAddAttrAryByIndex(advanceCfgInfo.id);
            this.UIPanel.listAttr.onRefresh(attrAry.length, this, (box: Laya.Box, index: number) =>
            {
                let attrInfo = attrAry[index];
                let htmlText = box.getChildAt(1) as component.UIHtmlText;
                htmlText.showText = Global.getLangStr("hero_msg62", holyName,
                    cfg.BattleCfgData.getDescByAttrType(attrInfo.type), Global.getAttrValueString(attrInfo));
            });

            // let listHeight = this.UIPanel.listAttr.getCellTrueHeight();
            // this.UIPanel.imgDesBg.height = listHeight + 18;
            // this.UIPanel.bg.height = this.UIPanel.imgDesBg.height + this.UIPanel.imgDesBg.y + 58;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}