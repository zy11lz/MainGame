module Pro
{
    /**
     * 分享气泡处理
     * 
    */
    export class SharePops
    {
        /** 当前显示中的计数 */
        private static _showCount = 0;
        /** 排队等待的队列(数据) */
        private static _waitList: any[] = [];

        /** 缓存池 */
        private static _pools: ProUI.Utils.OuTipsUI[] = [];

        /** 缓存池 */
        private static _queue: ProUI.Utils.OuTipsUI[] = [];

        /** 排队等待的最大数量 */
        private static readonly MAX_WAIT_COUNT = 3;

        // 偏移位置
        private static readonly OFFSET_Y: number = 0;

        // 间隔
        private static readonly INTERVAL: number = 100;

        // 队列容器
        private static _queueLayer: Laya.Box = null;

        // 队列正在上升
        private static _queueUpling: boolean = false;

        private static _parent: any;

    public static showTips(strContent: any[], parent: any): void
        {
            // 开局新手引导时不弹提示框
            if (!strContent)
            {
                return;
            }
            if (this._queueUpling)
            {  //显示已满，存起来
                this._waitList.push(strContent);
                if (this._waitList.length > this.MAX_WAIT_COUNT)
                    this._waitList.shift();
                return;
            }
            this._parent = parent;
            let tipsView = this.getTipsBox();

            this.__showNormalTips(strContent, tipsView);
        }

        private static __showNormalTips(strContent: any[], tipsView: ProUI.Utils.OuTipsUI): void
        {

            if (this._parent.x > this._parent.parent.width >> 1)
            {
                tipsView.bg.scaleX = -1;
                tipsView.x = - 260;
            }
            else
            {
                tipsView.bg.scaleX = 1;
                tipsView.x = 0;
            }

            logE("Pops", strContent);
            tipsView.ouHtml.showText = strContent[0];
            tipsView.nameLbl.text = strContent[1];
            tipsView.alpha = 1;

            // // 出场变形
            // tipsView.scale(2.0, 0.2);
            // Laya.Tween.to(tipsView, { scaleX: 1, scaleY: 1 }, 200);

            // 延迟销毁
            Laya.Tween.to(tipsView, { alpha: 0.1 }, 400, null, Laya.Handler.create(this, this.showComponent, [tipsView]), 2000);

            // 队列往上移动
            Laya.Tween.clearTween(this._queueLayer);
            let beginY = 100;
            this._queueUpling = true;
            this._queueLayer.y = beginY;
            Laya.Tween.to(this._queueLayer, {/* y: beginY - SharePops.INTERVAL */ }, 400, null, Laya.Handler.create(this, this.onUpFinish), 200);
        }


        private static showComponent(view: ProUI.Utils.OuTipsUI): void
        {
            this._showCount--;
            this.backToPools(view);
        }

        private static onUpFinish()
        {
            this._queueUpling = false;
            if (this._waitList.length > 0)
            {
                let view = this.getTipsBox();
                this.__showNormalTips(this._waitList.shift(), view);
            }
        }

        private static getTipsBox(): ProUI.Utils.OuTipsUI
        {
            if (this._queueLayer == null)
            {
                this._queueLayer = new Laya.Box();
                this._parent.addChild(this._queueLayer);
                this._queueLayer.x = 60;
            }

            this._showCount++;
            let ret: ProUI.Utils.OuTipsUI;
            if (this._pools.length > 0)
            {
                ret = this._pools.shift();
            }
            else
            {
                ret = new ProUI.Utils.OuTipsUI();
            }
            ret.anchorY = 1;
            this.addQueue(ret);
            return ret
        }

        private static backToPools(view: ProUI.Utils.OuTipsUI): void
        {
            view.removeSelf();
            this._pools.push(view);
            this.remoeQueue(view);
        }

        private static addQueue(tips: ProUI.Utils.OuTipsUI)
        {
            this._queueLayer.addChild(tips);
            this._queue.splice(0, 0, tips);

            for (let i = 0; i < this._queue.length; ++i)
            {
                // this._queue[i].centerX = 0;
                this._queue[i].y = SharePops.INTERVAL * -i;
            }
        }

        private static remoeQueue(tips: ProUI.Utils.OuTipsUI)
        {
            for (let i = 0; i < this._queue.length; ++i)
            {
                if (this._queue[i] == tips)
                {
                    this._queue.splice(i, 1);
                    break;
                }
            }
        }
    }
}