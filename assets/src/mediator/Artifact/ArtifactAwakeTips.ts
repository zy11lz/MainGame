module Pro
{

    /**
    * 元灵觉醒tips
    * @author jason.xu
    */
    export class ArtifactAwakeTips extends ProUI.Artifact.Tips.AwakeTipsUI
    {

        public static show(): void
        {
            var view = new ArtifactAwakeTips();
            view.show();
        }

        constructor()
        {
            super();
        }

        private init()
        {
            //属性
            let awakeAddPercents = cfg.ArtifactConstCfgData.getFazhenAwakeAddAttr();
            this.listAttr.onRefresh(awakeAddPercents.length, this, (itemUI: ProUI.Utils.AttrInfoItem2UI, index: number) =>
            {
                let addInfo = awakeAddPercents[index];
                let attrType = addInfo.value1;
                itemUI.imgType.frame = attrType;
                itemUI.txtTitle.text = cfg.BattleCfgData.getDescByAttrType(attrType);
                itemUI.txtValue.text = "+" + Global.parsePercentNum(addInfo.value2 / 10000);
            })
        }

        public show(): void
        {
            this.init();
            LayerManager.Inst.topUILayer.addChild(this);
            //背景添加关闭触发
            let tempCoverSp = PopUpManager.popUpUIAction(this, 0);
            if (tempCoverSp)
            {
                tempCoverSp.on(Laya.Event.CLICK, this, this.closeUI);
            }
        }

        public closeUI(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }
    }
}