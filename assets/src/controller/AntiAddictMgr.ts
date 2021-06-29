module Pro
{
    /**
    * 防沉迷系统管理
    * @author jason.xu
    */
    export class AntiAddictMgr
    {

        private static _inst: AntiAddictMgr;
        public static get Inst(): AntiAddictMgr
        {
            if (AntiAddictMgr._inst == null)
            {
                AntiAddictMgr._inst = new AntiAddictMgr();
            }
            return AntiAddictMgr._inst;
        }
        constructor() { }

        /** 当前实名认证状态 */
        private _isAuthentication = true;
        /** 认证的数据是否为成年人 */
        private _isAdult = true;
        /** 在线时长基数（根据当前时间与累计在线时长计算出来的一个时间点） */
        private _todayOnlineTime = -1;
        private _totalOnlineTime = -1;
        /** 清理 */
        public cleanUp(): void
        {
            Laya.timer.clear(this, this.onTimer);
            this._todayOnlineTime = -1;
        }

        private _isInit = false;

        public init(isAuthentication: boolean, isAdult: boolean, todayOnlineTime: number, totalOnlineTime: number): void
        {
            this._isInit = true;
            this._isAuthentication = isAuthentication;
            this._isAdult = isAdult;
            if (todayOnlineTime < 0) { todayOnlineTime = 0; }
            this._todayOnlineTime = TimeController.currTimer / 1000 - todayOnlineTime;
            if (totalOnlineTime < 0) { totalOnlineTime = 0; }
            this._totalOnlineTime = TimeController.currTimer / 1000 - totalOnlineTime;

            if (!this._isAuthentication)
            { //未认证
                this.popUpAlertWindow("antiAddict_tips1", false);
            } else if (!this._isAdult)
            { //已认证，未成年
                this.popUpAlertWindow("antiAddict_tips2", false);
            }

            this.refreshState();
        }

        /** 刷新当前防沉迷状态处理 */
        private refreshState(): void
        {
            if (!this._isInit) { return; }
            Laya.timer.clear(this, this.onTimer);
            //已认证为成年人
            if (this._isAdult && this._isAuthentication) { return; }
            if (this._todayOnlineTime < 0) { return; } //时间还未初始化
            //判断当前时间是否在22:00-8:00之间
            let currTimer = TimeController.currTimer;
            let date = new Date(currTimer);
            let s2Day = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
            if (s2Day >= 22 * 3600 || s2Day < 8 * 3600)
            {
                if (!this._isAuthentication) { this.popUpAlertWindow("antiAddict_tips3", true); }  //作为未实名用户，您的游戏时间受限，将被强制下线。
                else { this.popUpAlertWindow("antiAddict_tips4", true); }  //作为未成年用户，您的游戏时间受限，将被强制下线。
                return;
            }
            let nextLeftTime = 22 * 3600 - s2Day;
            if (!this._isAuthentication)
            { //未认证
                //未认证时，只能体验1小时
                let leftTime = 1 * 3600 - TimeController.currTimer / 1000 + this._totalOnlineTime;
                if (leftTime <= 0)
                { //时间到
                    this.popUpAlertWindow("antiAddict_tips5", true);  //作为未实名用户，您的体验时长已结束，请实名认证之后再登陆游戏。
                    return;
                }
                if (nextLeftTime > leftTime) { nextLeftTime = leftTime; }
            } else if (!this._isAdult)
            { //已认证，但未成年
                //未成年时，只能体验1.5小时
                let leftTime = 1.5 * 3600 - TimeController.currTimer / 1000 + this._todayOnlineTime;
                if (leftTime <= 0)
                { //时间到
                    this.popUpAlertWindow("antiAddict_tips6", true);  //作为未成年用户，您的体验时间已到，将被强制下线。
                    return;
                }
                if (nextLeftTime > leftTime) { nextLeftTime = leftTime; }
            }
            Laya.timer.once(nextLeftTime * 1000 + 1000, this, this.onTimer);  //等会再来
        }

        private onTimer(): void
        {
            this.refreshState();
        }

        /** 弹出提示 */
        private popUpAlertWindow(langId: string, isExitGame: boolean): void
        {
            let msg = Global.getLangStr(langId);
            let alertPriority = isExitGame ? 201 : 200; //退出游戏的提示优先级更高
            AlertShow.showConfirmAlert(msg, this, () =>
            {
                if (isExitGame)
                {
                    ThirdMgr.gameLogOut();
                }
            }, "common_confirm", null, 0, alertPriority);
        }

    }
}