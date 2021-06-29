module Pro
{
    /**
     * 神界冒险-事件:对话 单个回答item
     *  有两种回答类型（仅文字答案与带消耗的答案）
    * @author jason.xu
    */
    export class RiskEventDialogAnswerView extends ProUI.Risk.ChildView.RiskEventDialogItemUI
    {

        constructor()
        {
            super();
            this.init();
        }
        private init()
        {

        }

        /** 设置答案描述 */
        public setAnswerDes(des: string, needExpend: string = null): void
        {
            if (!des) return;
            this.txtContent.text = des;

            let showNeedItem = !!needExpend;
            this.txtNeedLeft.visible = showNeedItem;
            this.txtNeedRight.visible = showNeedItem;
            this.imgNeedIcon.visible = showNeedItem;
            if (showNeedItem)
            {
                let needArr = needExpend.split("_");
                this.txtNeedRight.text = needArr[1] + ")";
                Global.setResIconWithItemID(this.imgNeedIcon, CfgID.ResType.Item, parseInt(needArr[0]));
            }

            this.hboxContent.refresh();
        }


        /** 设置答案正确与否
         * @param isResult 是否已经出结果
         * @param isSelect 当前是否为玩家选择的项
         * @param isTrue 当前是否为正确答案
         */
        public setResult(isResult: boolean, isSelect: boolean, isTrue: boolean): void
        {
            this.imgTrue.visible = isResult && isSelect;  //选了就是对的
            // this.imgTrue.visible = isResult && isTrue;
            // this.imgFaild.visible = isResult && !isTrue && isSelect;
        }

    }
}