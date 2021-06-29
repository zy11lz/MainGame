module Pro
{
    /**
     * 提示文字
    * @author jason.xu
    */
    export class TipsUtils
    {
        /** 当前显示中的计数 */
        private static _showCount = 0;
        /** 排队等待的队列(数据) */
        private static _waitList: string[] = [];

        /** 缓存池 */
        private static _pools: ProUI.Common.NormalTipsUI[] = [];

        /** 缓存池 */
        private static _queue: ProUI.Common.NormalTipsUI[] = [];

        /** 排队等待的最大数量 */
        private static readonly MAX_WAIT_COUNT = 30;

        // 偏移位置
        private static readonly OFFSET_Y: number = 0;

        // 间隔
        private static readonly INTERVAL: number = 66;

        // 队列容器
        private static _queueLayer: Laya.Box = null;

        // 队列正在上升
        private static _queueUpling: boolean = false;

        public static showTipsByLanId(strLanId: string, ...args): void
        {
            let strContent = Global.getLangStr(strLanId, ...args);
            this.showTips(strContent);
        }

        /** 普通提示文字（可以是html格式, 同时也支持StringFormat） */
        public static showTips(strContent: string): void
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
            let tipsView = this.getTipsBox();
            this.__showNormalTips(strContent, tipsView);
        }

        /** 
         * 显示获得道具集体飘字 
         */
        public static showItemTips(itemId: number, itemCount: number, appendMsg: string = ""): void
        {
            let tempName = cfg.ItemCfgData.getNameById(itemId);
            // let tempColor = Global.getResQuColor(cfg.ItemCfgData.getQualityById(itemId));
            // let tempColor = "#fff21b";
            let getStr = itemCount >= 0 ? Global.getLangStr("bag_msg8") : Global.getLangStr("bag_msg9");
            if (itemCount < 0) itemCount *= -1;
            let strContent = Global.getItemTipsString(itemId, itemCount);
            // let strContent = Global.FormatString("<font color='{0}'>{1}</font>x{2}", tempColor, tempName, itemCount);
            if (appendMsg) strContent += appendMsg;
            TipsUtils.showTips(getStr + strContent);
        }

        private static __showNormalTips(strContent: string, tipsView: ProUI.Common.NormalTipsUI): void
        {
            tipsView.txtContent.showText = strContent;
            tipsView.txtContent.innerHTML = strContent;
            tipsView.alpha = 1;

            // 出场变形
            tipsView.scale(2.0, 0.2);
            Laya.Tween.to(tipsView, { scaleX: 1, scaleY: 1 }, 200);

            // 延迟销毁
            Laya.Tween.to(tipsView, { alpha: 0.1 }, 200, null, Laya.Handler.create(this, this.showComponent, [tipsView]), 1000);

            // 队列往上移动
            Laya.Tween.clearTween(this._queueLayer);
            let beginY = (GameConfig.curHeight() >> 1) + TipsUtils.OFFSET_Y + TipsUtils.INTERVAL-100;
            this._queueUpling = true;
            this._queueLayer.y = beginY;
            Laya.Tween.to(this._queueLayer, { y: beginY - TipsUtils.INTERVAL }, 200, null, Laya.Handler.create(this, this.onUpFinish), 100);
        }


        private static showComponent(view: ProUI.Common.NormalTipsUI): void
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

        private static getTipsBox(): ProUI.Common.NormalTipsUI
        {
            if (this._queueLayer == null)
            {
                this._queueLayer = new Laya.Box();
                LayerManager.Inst.effectLayer.addChild(this._queueLayer);
                this._queueLayer.width = 750;
                this._queueLayer.height = 0;
                this._queueLayer.centerX = 0;
                this._queueLayer.y = (GameConfig.curHeight() >> 1) + TipsUtils.OFFSET_Y;
            }

            this._showCount++;
            let ret: ProUI.Common.NormalTipsUI;
            if (this._pools.length > 0)
            {
                ret = this._pools.shift();
            }
            else
            {
                ret = new ProUI.Common.NormalTipsUI();
            }
            ret.anchorY = 1;
            this.addQueue(ret);
            return ret
        }

        private static backToPools(view: ProUI.Common.NormalTipsUI): void
        {
            view.removeSelf();
            this._pools.push(view);
            this.remoeQueue(view);
        }

        private static addQueue(tips: ProUI.Common.NormalTipsUI)
        {
            this._queueLayer.addChild(tips);
            this._queue.splice(0, 0, tips);

            for (let i = 0; i < this._queue.length; ++i)
            {
                this._queue[i].centerX = 0;
                this._queue[i].y = TipsUtils.INTERVAL * -i;
            }
        }

        private static remoeQueue(tips: ProUI.Common.NormalTipsUI)
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