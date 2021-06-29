/*
* name;
*/
module Pro
{
    export class SevenDayLoginIco
    {
        private _label: component.UILabel
        constructor(target: component.UILabel)
        {
            this._label = target;
        }

        public refresh(): void
        {
            /* 
            1、若有多天奖励未领取，检测未领取奖励对应的“天数id（或索引id）”，在七日登录的界面图标下优先显示“天数id（或索引id）”排序最靠前的文本提示；比如：还有5天奖励可领取，而第1天和第3天的奖励都已经领取过，则优先显示第2天（未领取）的文本提示。
2、若在活动最后一天前，所有的奖励都已经领取，则显示明天的文本提示；比如：活动共7天，在登录的第5天把所有可领取的奖励都领完，则在界面图标下显示第6天的文本提示。
3、若所有天数的活动奖励都领取完，则取消界面图标的显示。 
*/
            let act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Login,Pb_God._emActivityLoginType.Activity_Login_7Day);
            let actId = act_data.id
            let tmpLoginDay = ActivityDataMgr.getActivity_DataValue(actId, Pb_God._emActivityDataKey.Activity_Key_LoginDays);
            //看是否还有奖励未领完的
            let login_cfg_arr = cfg.ActivityLoginCfgData.getDataArrayByActivityId(actId);
            for (var tmpCfgInfo of login_cfg_arr)
            {
                let tmpHasGet = ActivityDataMgr.isActBoxFinish(actId, tmpCfgInfo.index);
                if (!tmpHasGet)
                {
                    // TODO 七日活动屏蔽奖励
                    // this._label.text = tmpCfgInfo.buttonTips;
                    // return;
                }
            }
            //如果全部领完，看是否还有直购礼包未购买的
            let charge_cfg_arr = PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_7DayLogin);
            for (let chargeCfgInfo of charge_cfg_arr)
            {
                let buyInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
                let hasGet = !!buyInfo && chargeCfgInfo.maxBuyCount != 0 && buyInfo.buycount >= chargeCfgInfo.maxBuyCount;
                if (!hasGet)
                {
                    // TODO 七日活动屏蔽奖励
                    // this._label.text = chargeCfgInfo.name;
                }
            }

            this._label.text = "";
        }
    }
}