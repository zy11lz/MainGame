module Pro
{
    /**
     * 玩家当前所在场景
     */
    export enum SystemSettingType
    {
        Music = 1,  //音乐
        Sound,   //音效
        Voice,   //语音
        Quality,  //高品质
        AttackVerify,  //切蹉无需验证
        BulletChat   //冠军赛弹幕
    }

    /**
     * 系统设置管理器（对应界面为PanelNotify.Open_SystenSetting）
     * 用于保存客户端的基本系统设置保存，以及设置修改之后调度对应的模块修改数据， 比如设置关闭音乐时，调用SoundMgr的处理
     */
    export class SystemSettingMgr
    {
        // 单例对象
        private static _inst: SystemSettingMgr;

        /** 类型对应设置 */
        private _settingDataMap = new ds.StringMap<number>();

        // 单例接口
        public static get Inst(): SystemSettingMgr
        {
            if (SystemSettingMgr._inst == null)
            { SystemSettingMgr._inst = new SystemSettingMgr(); }

            return SystemSettingMgr._inst;
        }

        // 构造函数
        public init()
        {
            //读取本地缓存，将设置信息提取出来
            this.readSetting(SystemSettingType.Music, 1);
            this.readSetting(SystemSettingType.Sound, 1);
            this.readSetting(SystemSettingType.Voice, 1);
            this.readSetting(SystemSettingType.Quality, 1);
            this.readSetting(SystemSettingType.AttackVerify, 1);
        }

        /** 读取配置 */
        private readSetting(type: SystemSettingType, defaultValue: number): void
        {
            //留疑： 是否需要把所有数据全部用一个数据段存储？
            let item: any = Laya.LocalStorage.getItem(EnumLocalStorageKey.SYSTEM_SETTING + type);
            if (item == null || item == "")
            {
                item = defaultValue;
            } else
            {
                item = parseInt(item);
            }
            this.resetSettingValue(type, item, true);
            // this._settingDataMap.put(type, item == null ? defaultValue : parseInt(item));
        }

        /** 获取设置 */
        public getSettingValueByType(type: SystemSettingType): number
        {
            return this._settingDataMap.get(type);
        }

        /** 修改设置 */
        public resetSettingValue(type: SystemSettingType, value: number, isInit: boolean = false): void
        {
            if (this._settingDataMap.get(type) == value) { return; }
            if (!isInit) { Laya.LocalStorage.setItem(EnumLocalStorageKey.SYSTEM_SETTING + type, value + ""); }
            this._settingDataMap.put(type, value);
            switch (type)
            {
                case SystemSettingType.Music:
                    SoundMgr.Inst().musicMute = !value;
                    break;
                case SystemSettingType.Sound:
                    SoundMgr.Inst().soundMute = !value;
                    break;
                case SystemSettingType.Voice: //语音
                    //...
                    break;
                case SystemSettingType.Quality:  //高品质
                    // SoundMgr.Inst().useHeightQuality = !!value;
                    break;
                case SystemSettingType.AttackVerify: //切蹉不需要验证
                    break;
            }
        }

    }
}