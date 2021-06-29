module Pro
{
    /**
     * 游戏内跑马灯公告
     */
    export class FloatNoticeUtils
    {
        /** 跑马灯UI */
        private static noticeView: ProUI.Common.FloatNoticeUI;

        /** 缓存中的消息列表 */
        private static waitNoticeList: string[] = [];

        /** 通知移动速度 */
        private static lbl_moveSpeed_ms: number = 100;

        /** 通知播放间隔 */
        private static lbl_showDuration_ms: number = 0;

        /** 是否正在播放公告 */
        private static is_inPlaying: boolean;

        /** 文字初始坐标(右侧遮罩外) */
        private static lbl_basePosX: number = 580;

        private static left_offX: number = 120;

        /** 当前文字动画管理 */
        private static lbl_tweener: Laya.Tween;

        /**
         * 播放跑马灯通知
         * @param content 
         * @param times 
         */
        public static showNoticeForTimes(content: string, times: number = 1): void
        {
            //if (GlobalData.isRelease) return;
            for (let i = 0; i < times; i++)
                this.showNotice(content);
        }

        private static showNotice(content: string): void
        {
            if (!content) return;
            if (this.is_inPlaying)
            {
                this.waitNoticeList.push(content);
            } else
            {
                this.playNotice(content);
            }
        }

        /**
         * 播放公告
         * @param content 
         */
        private static playNotice(content: string): void
        {
            this.is_inPlaying = true;
            let notice = this.getNoticeView();
            notice.txt_desc.htmlDivElement.style.wordWrap = false;
            notice.txt_desc.x = this.lbl_basePosX;
            notice.txt_desc.showText = content;
            let targetPosX = -(notice.txt_desc.contextWidth - this.left_offX);
            let duration = (Math.abs(targetPosX) + this.lbl_basePosX) / this.lbl_moveSpeed_ms;

            notice.txt_desc.htmlDivElement.on(Laya.Event.LINK, this, (data) =>
            {
                LinkUtils.parseHrefFunc(data);
            });

            this.lbl_tweener = Laya.Tween.to(notice.txt_desc, { x: targetPosX }, duration * 1000,
                Laya.Ease.linearIn,
                Laya.Handler.create(this, this.onNoticePlayDone));
        }

        private static OnBackMainUI_Called(arg: any): void
        {
            if (arg == "BackLogin")
            {
                this.Clear();
            }
        }

        private static Clear(): void
        {
            if (this.lbl_tweener)
                this.lbl_tweener.clear();
            if (this.noticeView)
                this.noticeView.visible = false;
            this.is_inPlaying = false;
        }

        /**
         * 一条通知播放完毕
         */
        private static onNoticePlayDone(): void
        {
            this.noticeView.visible = false;
            this.is_inPlaying = false;
            if (this.waitNoticeList.length > 0)
            {
                let content = this.waitNoticeList.pop();
                Laya.timer.once(this.lbl_showDuration_ms, this, () =>
                {
                    this.playNotice(content);
                });
            }
        }

        private static getNoticeView(): ProUI.Common.FloatNoticeUI
        {
            if (!this.noticeView)
            {
                this.noticeView = new ProUI.Common.FloatNoticeUI();
                this.noticeView.anchorX = 0.5;
                this.noticeView.top = 63 + GameConfig.getBangsTop();//初始化位置
                this.noticeView.right = 0;
                this.noticeView.zOrder = 999;
                // let mask = new Laya.Sprite();
                // mask.graphics.drawRect(this.left_offX, 0, this.noticeView.width - this.left_offX, this.noticeView.height, "#FFFFFF");
                // this.noticeView.txt_bg.mask = mask;
                LayerManager.Inst.centerUILayer.addChild(this.noticeView);
                EventMgr.on(EventNotify.Scene_BACK_MAINUI, this, this.OnBackMainUI_Called);
            }

            this.noticeView.visible = true;
            return this.noticeView;
        }
    }
}