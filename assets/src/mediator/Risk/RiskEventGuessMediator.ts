module Pro
{
    /**
    * 神界冒险-事件:猜拳
    * @author jason.xu
    */
    export class RiskEventGuessMediator extends BaseMediator implements IMediator
    {

        private _isFinish: boolean = false;

        public UIPanel: ProUI.Risk.RiskEventGuessUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("riskevent")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskEventGuessUI, 1, BaseAddLayer.TopUI);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //筹码
            this.UIPanel.listTabJetton.selectEnable = true;
            this.UIPanel.listTabJetton.setDragStatue(false);
            this.UIPanel.listTabJetton.onRefresh(4, this, (btn: component.UIButton, index: number) =>
            {
                let icon = btn.getChildByName("icon") as component.UIFrameImage;
                let txtValue = btn.getChildByName("txtValue") as component.UILabel;
                icon.frame = index * 2 + (index == this.UIPanel.listTabJetton.selectedIndex ? 1 : 2);
                txtValue.text = "" + cfg.RiskFingerPrizeCfgData.getNeedItemInfoBySelectType(index + 1).itemcount;
            });

            //拳头
            this.UIPanel.listTabHand.setDragStatue(false);
            this.UIPanel.listTabHand.selectEnable = true;
            this.UIPanel.listTabHand.onRefresh(3, this, (btn: component.UIButton, index: number) =>
            {
                (btn.getChildByName("icon") as component.UIFrameImage).frame = index + 1;
            });
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.reset();
        }

        /** 重置状态 */
        private reset(): void
        {
            this._isFinish = false;
            this.UIPanel.txtContent.text = Global.getLangStr("risk_quess_des");
            Laya.Tween.clearTween(this.UIPanel.guideArrow);
            this.UIPanel.listTabHand.selectedIndex = -1;
            this.UIPanel.listTabJetton.selectedIndex = -1;
            this.checkState();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Risk_SingleGrid_Update, this, this.onUpdateSingleGrid);

            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.listTabHand.on(Laya.Event.CHANGE, this, this.checkState);
            this.UIPanel.listTabJetton.on(Laya.Event.CHANGE, this, this.checkState);

            Laya.timer.frameLoop(10, this, this.onLoop);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            Laya.timer.clear(this, this.onLoop);
        }

        private _headLoopIndex = 0;
        private onLoop(): void
        {
            if (this._isFinish) return;
            //对方
            this.UIPanel.imgRightHand.frame = this._headLoopIndex % 3 + 1;
            this._headLoopIndex++; //放在中间，让两个拳头错开一下显示
            //已方还没选拳
            if (this.UIPanel.listTabHand.selectedIndex < 0)
            {
                this.UIPanel.imgLeftHand.frame = this._headLoopIndex % 3 + 1
            }
        }

        private onUpdateSingleGrid(index: number): void
        {
            let gridInfo = RiskDataMgr.gridDataList[index];
            if (!gridInfo || gridInfo.grid != this.UIOpenData.customObject) return;
            //展示结果
            this.showResult(gridInfo.param);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 检查当前操作选择的状态
         * 未选筹码时指引筹码， 未出拳时指引出拳， 都选了的话就出示结果
         */
        private checkState(): void
        {
            if (this._isFinish) return;

            Laya.Tween.clearTween(this.UIPanel.guideArrow);
            this.UIPanel.guideArrow.visible = true;

            let jettonIndex = this.UIPanel.listTabJetton.selectedIndex;
            let handIndex = this.UIPanel.listTabHand.selectedIndex;
            if (jettonIndex < 0)
            {
                //还没选筹码
                this.UIPanel.guideArrow.pos(35, 711);
                this.UIPanel.txtGuide.text = Global.getLangStr("risk_msg11"); //请下注";
            } else if (handIndex < 0)
            {
                //选了筹码，还没有选出拳
                Laya.Tween.to(this.UIPanel.guideArrow, { x: 86, y: 903 }, 300);
                this.UIPanel.txtGuide.text = Global.getLangStr("risk_msg12");//请出拳";
            } else
            {
                this.UIPanel.guideArrow.visible = false;
                this.UIPanel.imgLeftHand.frame = handIndex + 1;

                let needItem = cfg.RiskFingerPrizeCfgData.getNeedItemInfoBySelectType(jettonIndex + 1);
                let haveCount = Global.getItemNum(needItem.itemid);
                if (haveCount >= needItem.itemcount)
                {
                    this._isFinish = true;
                    TipsUtils.showItemTips(needItem.itemid, -1 * needItem.itemcount); //转成负数，表示显示扣除
                }
                RiskSend.collectGrid(this.UIOpenData.customObject, handIndex + 1, jettonIndex + 1);
            }
        }

        /** 显示结果
         * @param result 
         */
        private showResult(resultType: Pb_God._emRiskFingerResult): void
        {
            let result = resultType;
            if (resultType == 2) result = -1;    //转成 -1输  0平  1赢   方便计算
            //剪子 石头 布
            this.UIPanel.txtContent.text = Global.getLangStr("risk_quess_des" + (result + 2)); //123
            let selfIndex = this.UIPanel.listTabHand.selectedIndex;
            let enemyIndex = (selfIndex - result + 3) % 3;
            this.UIPanel.imgRightHand.frame = enemyIndex + 1;
            //延时关闭窗口
            Laya.timer.once(2000, this, this.closeUI);
        }

    }
}