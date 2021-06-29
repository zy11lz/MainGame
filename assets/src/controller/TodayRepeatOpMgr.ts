module Pro
{
    /**
    * 今日重复操作的记录
    * 用于保存与获取一些今日已经操作过的行为， 比如某些界面的“今日不再提示” 或者记录某些活动入口今日是否已经打开过。等等
    * @author jason.xu
    */
    export class TodayRepeatOpMgr
    {

        private static _inst: TodayRepeatOpMgr;
        public static get Inst(): TodayRepeatOpMgr
        {
            if (TodayRepeatOpMgr._inst == null)
            {
                TodayRepeatOpMgr._inst = new TodayRepeatOpMgr();
            }
            return TodayRepeatOpMgr._inst;
        }
        constructor() { }

        private _dataMap = {};

        public init(): void
        {
            this._dataMap = {};
            //读取最后一次保存的时间
            let lastTime = Public.LStorageMgr.GetInst().getLocalData("TodayRepeatOpLastTime_" + PlayerDataMgr.uid);
            if (lastTime && lastTime == (new Date(Pro.TimeController.currTimer)).setHours(0, 0, 0, 1) + "")
            {  //还在同一天
                let saveDataString = Public.LStorageMgr.GetInst().getLocalData("TodayRepeatOpSaveData_" + PlayerDataMgr.uid);
                if (saveDataString)
                {
                    this._dataMap = JSON.parse(saveDataString);
                }
            } else
            {
                this.cleanUp();
            }
        }

        /** 隔天清理 */
        public cleanUp(): void
        {
            this._dataMap = {};
            let date = new Date(Pro.TimeController.currTimer);
            Public.LStorageMgr.GetInst().setLocalData("TodayRepeatOpLastTime_" + PlayerDataMgr.uid, date.setHours(0, 0, 0, 1) + "");
            Public.LStorageMgr.GetInst().setLocalData("TodayRepeatOpSaveData_" + PlayerDataMgr.uid, "");
        }

        /** 手动清理 */
        public ManualCleaning(key: string): void
        {
            this._dataMap[key] = null;
        }

        /** 判断操作记录 */
        public getTag(key: string): boolean
        {
            return !!this._dataMap[key];
        }

        /** 记录操作 */
        public setTag(key: string): void
        {
            if (this._dataMap[key]) return;
            this._dataMap[key] = 1;
            Public.LStorageMgr.GetInst().setLocalData("TodayRepeatOpSaveData_" + PlayerDataMgr.uid, JSON.stringify(this._dataMap));
            EventMgr.trigger(EventNotify.Op_TodayRepleat, key);
        }

    }
}