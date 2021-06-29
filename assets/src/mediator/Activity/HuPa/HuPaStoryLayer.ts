module Pro
{
    export class HuPaStoryLayer extends ProUI.ActivityMain.HuPa.HuPaStoryUI implements ITableView
    {

        /** 页签组件销毁 */
        dispose(): void
        {

        }

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            
			//纵向滚动
			this.panel.vScrollBarSkin = "";
            this.storyHtml.innerHTML = Global.getLangStr("backstory_hupa");
            Laya.timer.frameOnce(1, this, () =>
            {
                this.storyHtml.height = this.storyHtml.htmlDivElement.height;
                this.panel.refresh();
            })
        }

        //-------------------------------------------------------------------------------------------
        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        addEvent(): void
        {
        }
        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        removeEvent(): void
        {
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        show(): void
        {

        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        hide(): void
        {

        }

        setData($data: any): void
        {

        }
    }
}