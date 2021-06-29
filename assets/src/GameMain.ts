var EventMgr = Public.EventMgr;
var CountShare = new Public.CountShare(100, 100);
var conch = window["conch"] || window["webconch"];

module Pro
{

    export class GameMain
    {
        constructor(mainVersion: number = -1, versionObj: Object = null, strSearch: string = "")
        {
            EnterStepController.start(mainVersion, versionObj, strSearch);
        }

        public setRelease(runTime: number = -1, platFormType = 0, isAudit: boolean = false)
        {
            GameConfig.runTime = runTime;
            logLevel = fly.enums.LogLevel.DEBUG;
            GlobalData.isPringNetMsg = false;
            if (platFormType > 0)
            {
                PlatformData.platformType = platFormType;
            }
            PlatformData.isAudit = isAudit;
        }
    }
}

window["GameMain"] = Pro.GameMain;