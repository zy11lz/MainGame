module Pro
{
    /**
     * 圣物详细信息界面
     */
    export class HeroHolyReview extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Hero.HeroHoly.HolyReviewUI;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroHoly.HolyReviewUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            let advanceInfo = this.UIOpenData.customObject as cfg.HolyAdvanceCfgInfo;
            if (!advanceInfo) return;
            this.UIPanel.img_icon.skin = Global.getResHolyIconSkin(advanceInfo.petType, advanceInfo.level);
            this.UIPanel.txt_name.text = cfg.HolyUnlockCfgData.getNameByPetType(advanceInfo.petType) + "Lv." + advanceInfo.level;

            let tempAtterAry = cfg.HolyAdvanceCfgData.getAddAttrAryByIndex(advanceInfo.id);
            this.UIPanel.itemBox.onRefresh(tempAtterAry.length, this, (tmpBox: Laya.Box, index: number) =>
            {
                let tmpAtterID = tempAtterAry[index].type;

                let txt_desc = tmpBox.getChildAt(0) as component.UIHtmlText;
                txt_desc.showText = Global.getLangStr("hero_msg51", cfg.BattleCfgData.getDescByAttrType(tmpAtterID), Global.getAttrValueString(tempAtterAry[index]));
            });
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }
    }
}