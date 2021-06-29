module Pro
{
    /**
     * 界面说明： 圣物升级提示
    * @author jason.xu
    */
    export class HeroHolyUpLevelMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroUpSuc.HolyUpLevelUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("heroupsuc"), UrlMgr.getAtlas("rewardpopup")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/battleresult/pic_tiaozhanchenggong.png"];
        }

        public openUI(): void
        {
            SoundMgr.Inst().playSound("levelup");
            this.showPanel(ProUI.Hero.HeroUpSuc.HolyUpLevelUI, 1, BaseAddLayer.TopUI, true);
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

            this.UIPanel.txtOldLv.text = Global.getLangStr("attr_lv1", holyInfo.level - 1);
            this.UIPanel.txtNewLv.text = Global.getLangStr("attr_lv1", holyInfo.level);

            //属性列表
            let oldUpLevelInfo = cfg.HolyUpgradeCfgData.getInfoByTypeAndLv(holyInfo.pettype, holyInfo.level - 1);
            let oldAttrAry = [];
            if (oldUpLevelInfo)
                oldAttrAry = cfg.HolyUpgradeCfgData.getAddAttrAryByIndex(oldUpLevelInfo.id);
            let upLevelInfo = cfg.HolyUpgradeCfgData.getInfoByTypeAndLv(holyInfo.pettype, holyInfo.level);
            let attrAry = cfg.HolyUpgradeCfgData.getAddAttrAryByIndex(upLevelInfo.id);
            this.UIPanel.listAttr.onRefresh(attrAry.length, this, (itemUI: ProUI.Hero.HeroUpSuc.HeroUpSucAttrItemUI, index: number) =>
            {
                let attrInfo = attrAry[index];
                itemUI.txtOldValueSub.visible = true;
                itemUI.txtOldValue.text = cfg.BattleCfgData.getDescByAttrType(attrInfo.type);

                itemUI.txtNewValue.text = attrInfo.value + "";
                itemUI.txtOldValueSub.text = Global.getAtterValue(oldAttrAry, attrInfo.type) + "";
            })
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