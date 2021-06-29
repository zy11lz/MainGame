/**
*
* 通用的规则说明面板。
*
* @author jason.xu
*
*/
module Pro
{
    export class HelpMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Common.HelpUI;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.HelpUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.UIPanel.listPanel.content.removeChildren(0, this.UIPanel.listPanel.content.numChildren - 1);
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //纵向滚动
            this.UIPanel.listPanel.vScrollBarSkin = null;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }

        public refreshUI()
        {
            let strAll: string = this.UIOpenData.customObject;
            let __index = 0;
            // 添加 ----〇 规则说明 〇------
            let title = strAll.split("\npicTitle-");
            if (title.length > 1)
            {
                let itemTitleView = this.UIPanel.listPanel.content.getChildAt(__index++) as ProUI.Utils.HelpItemTitleUI;
                if (!itemTitleView) { itemTitleView = this.UIPanel.listPanel.addChildAt(new ProUI.Utils.HelpItemTitleUI(), 0) as ProUI.Utils.HelpItemTitleUI; }
                this.refreshContentItem(itemTitleView, title[0]);
                strAll = title[1];
            }

            let list = strAll.split("\nbr-");
            // 生成子物体数量根据数组内容长度决定，不在参考子物体数量
            //let len = Math.max(list.length, this.UIPanel.listPanel.content.numChildren);
            let len = list.length;
            for (var i = __index; i < len + __index; i++)
            {
                let strElement = list[i - __index];
                let itemView = this.UIPanel.listPanel.content.getChildAt(i) as ProUI.Utils.HelpItemUI;
                if (!itemView) { itemView = this.UIPanel.listPanel.addChildAt(new ProUI.Utils.HelpItemUI(), i) as ProUI.Utils.HelpItemUI; }
                if (strElement)
                {
                    itemView.visible = true;
                    this.refreshContentItem(itemView, strElement);
                } else
                {
                    itemView.visible = false;
                }
            }

            Laya.timer.callLater(this, () =>
            {
                let offsetPosY: number = 0 + this.getTitleContentHeight(__index);
                for (var i = __index; i < len + __index; i++)
                {
                    let itemView = this.UIPanel.listPanel.content.getChildAt(i) as ProUI.Utils.HelpItemUI;
                    if (itemView)
                    {
                        itemView.height = itemView.txtContent.contextHeight + itemView.txtContent.y;
                        itemView.y = offsetPosY;
                        offsetPosY += itemView.height + 22;
                    }
                }
                this.UIPanel.listPanel.scrollTo(0, 0);
            });

        }


        private getTitleContentHeight(index: number): number
        {
            if (index > 0)
            {
                let itemView = this.UIPanel.listPanel.content.getChildAt(0) as ProUI.Utils.HelpItemUI;
                if (itemView)
                {
                    return itemView.txtContent.contextHeight + itemView.txtContent.y;
                }

            }
            return 0;
        }

        private refreshContentItem(item: ProUI.Utils.HelpItemUI | ProUI.Utils.HelpItemTitleUI, strElement: string)
        {
            let gapIndex = strElement.indexOf("\n");
            let strTitle = strElement.substring(0, gapIndex);
            let strContent = strElement.substring(gapIndex + 1);
            strContent = strContent.replace(/[\n]/g, "<br>"); //换行符替换成html的格式
            // strContent = strContent.replace(/[ ]/g, "&#160;"); //空格替换成html的格式
            item.txtTitle.showText = strTitle;
            let htmlTxt = item.txtContent;
            htmlTxt.showText = strContent;
        }
    }
}