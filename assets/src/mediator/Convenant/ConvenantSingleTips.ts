module Pro
{
    /**
    * 单个元素契约弹出TIPS, 可选择属性操作
    * @author jason.xu
    */
    export class ConvenantSingleTips extends ProUI.Convenant.ConvenantTipsUI
    {

        public static show(pos: number): void
        {
            var view = new ConvenantSingleTips();
            view.show(pos);
        }

        constructor()
        {
            super();
        }

        private init(pos: number)
        {
            //是否激活
            let level = ConvenantDataMgr.level;
            //当前选中的位置
            let curPos = ConvenantDataMgr.getPartAttrIndex(pos);
            //如果没有选中的， 则需要循环提示可选状态            
            if (curPos <= 0)
            {
                this.selectTips.visible = true;
                Laya.timer.loop(1000, this, this.onLoopShowSelectTips);
            } else
            {
                this.selectTips.visible = false;
                Laya.timer.clear(this, this.onLoopShowSelectTips);
            }
            let isActive = level > 0;
            let strName = Global.getLangStr("convenant_name_" + pos);
            if (!isActive)
            {
                strName += Global.getLangStr("sail_msg1"); //(未激活)
            }
            this.txtName.text = strName;
            this.txtFightValue.text = ConvenantDataMgr.getFightValue(pos) + "";
            this.imgIcon.frame = pos;
            //属性列表
            let attrList = cfg.ConvenantAttrCfgData.getAttrInfoArrByDoubleKey(pos, isActive ? level : 1);
            this.listItems.onRefresh(attrList.length, this, (itemUI: ProUI.Convenant.TipsAttrItemUI, index: number) =>
            {
                //属性显示
                let attr = attrList[index];
                itemUI.imgType.frame = attr.type;
                itemUI.txtAttrName.text = cfg.BattleCfgData.getDescByAttrType(attr.type);
                if (isActive) itemUI.txtAttrValue.text = Global.getAttrValueString(attr);
                else itemUI.txtAttrValue.text = Global.getLangStr("dragonball_msg5"); //未激活
                //选择状态
                itemUI.imgSel.visible = index == curPos - 1;
                itemUI.btn.visible = !itemUI.imgSel.visible;
                itemUI.btn.onClick(this, () =>
                {
                    if (!isActive)
                    {
                        TipsUtils.showTipsByLanId("convenant_msg6"); //尚未激活不可使用
                        return;
                    }
                    ConvenantSend.attr(pos, index + 1);
                    this.closeUI();
                })
            })
        }

        public show(pos: number): void
        {
            this.init(pos);
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
            Laya.timer.clear(this, this.onLoopShowSelectTips);
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private _selectShowIndex = 0;
        /** 循环提示可选状态 */
        private onLoopShowSelectTips(): void
        {
            if (!this.displayedInStage)
            {
                Laya.timer.clear(this, this.onLoopShowSelectTips);
                return;
            }
            this._selectShowIndex++;
            if (this._selectShowIndex >= 3) this._selectShowIndex = 0;
            this.selectTips.y = this._selectShowIndex * 43-14;
        }
    }
}