module Pro
{
    /**
     * 定制礼包
     */
    export class TimeLimitDiyView extends TimeLimitCommonPageView
    {
        private act_id: number; // 活动ID
        
        /** 当前显示的列表 */
        private _list: cfg.CustomGiftCfgInfo[];
        /** 定制信息列表 */
        private _indexdata: Pb_God.PBPlayerActivityIndexData[] = [];

        private _chargeCfgInfo: cfg.ChargeCfgInfo;
        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
          
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            super.addEvent();
            EventMgr.on(EventNotify.DiyGift_Selected,this,this.refreshListCell);
            EventMgr.on(Cmd.S2C_Activity_CustomGiftOrder.cmdName, this, this.onCustomGiftOrder)
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            super.removeEvent();
            EventMgr.off(EventNotify.DiyGift_Selected,this,this.refreshListCell);
            EventMgr.off(Cmd.S2C_Activity_CustomGiftOrder.cmdName, this, this.onCustomGiftOrder)
        }

        /** 刷新列表显示（子类继承） */
        protected refreshListView(): void
        {
            //排序(简单处理： 把已领奖的排后面)
            let finishArr = [];
            let noFinishArr = [];
            this.act_id = this._actIds[0];
            for (let actid of this._actIds)
            {
                let cfgArr = cfg.CustomGiftCfgData.getListByActId(actid);
                for (let el of cfgArr)
                {
                    if (ActivityDataMgr.getActBuyCount(el.activityID, el.index) >= el.limitNum) finishArr.push(el);
                    else noFinishArr.push(el);
                }
            }
            this._list = noFinishArr.concat(finishArr);
            this.itemList.onRefreshWithArray(this._list, this, this.onItemRefresh);
        }


        private onItemRefresh(item: ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI, index: number)
        {
            let act_cfg =  this._list[index];
            let diyinfo:Pb_God.PBPlayerActivityIndexData = this.getIndexData(act_cfg.index);
            let has_get = ActivityDataMgr.getActBuyCount(act_cfg.activityID, act_cfg.index) >= act_cfg.limitNum; //是否已领取   
            item.txt_title.showText = cfg.ChargeCfgData.getNameByID(act_cfg.chargeId) == "" ? Global.getLangStr("activity_chargeMsg5") : cfg.ChargeCfgData.getNameByID(act_cfg.chargeId);
           
            let cur_chargeSting = "<font color='#46af00'>" + ActivityDataMgr.getActBuyCount(act_cfg.activityID, act_cfg.index) + "</font>";
            item.txt_progress.showText = "(" + cur_chargeSting + "/" + act_cfg.limitNum + ")";
            item.img_finish.visible = has_get;
            let customPool = act_cfg.customPool.split(";");
            
            item.itemBox.onRefresh(customPool.length + 1, this, (itemUI: NorItemUI, index1: number) =>
            {
                if(index1 == 0)
                {
                     itemUI.setItemInfo(cfg.AddItemInfo.parse(act_cfg.itemNum)[0]);
                     return;
                }

                // 有定制信息 或 已领取
                if(diyinfo.data.length > 0 || has_get)
                {
                    let cusPoolInfo = cfg.CustomGiftGiftpoolCfgData.getInfoByDoubleKey(diyinfo.data[index1 - 1].key,diyinfo.data[index1 - 1].value);
                    itemUI.setItemInfo(cfg.AddItemInfo.parse(cusPoolInfo.item)[0]);
                }
                else
                {
                    itemUI.setItemInfo(cfg.AddItemInfo.parse("1_1")[0],false,false,false);
                    itemUI.SelectStatueImg.visible = false;
                    itemUI.PlusStatueImg.visible = true;
                }
                if(!has_get)
                {
                    itemUI.onClick(this,() =>{
                        // 前往修改定制
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DiyGiftsView,[diyinfo,index1 - 1]));
                    })
                }
            });

            item.imgGetReddot.visible = cfg.ChargeCfgData.getNeedMoneyByID(act_cfg.chargeId) / 100 < 1
            // 0元礼包默认显示红点
            item.imgGetReddot1.visible = act_cfg.chargeId == 0;
            item.btn_get.onClick(this, () =>
            {
                if(cfg.ChargeCfgData.getNeedMoneyByID(act_cfg.chargeId) / 100 < 1)
                {
                    ActivitySend.drawRewardEx(act_cfg.activityID, act_cfg.index,0,cfg.CustomGiftGiftpoolCfgData.getIndexsBypoolIdAndpoolItemIndex(diyinfo.data));
                }
                else
                {
                    this._chargeCfgInfo = cfg.ChargeCfgData.getInfo(act_cfg.chargeId);
                    ActivitySend.customGiftOrder(act_cfg.activityID, act_cfg.index,cfg.CustomGiftGiftpoolCfgData.getIndexsBypoolIdAndpoolItemIndex(diyinfo.data));
                }
            });
            let lab1 = item.btn_get.getChildAt(1) as Laya.Label;
            lab1.text =  Global.getLangStr("common_money", cfg.ChargeCfgData.getNeedMoneyByID(act_cfg.chargeId) / 100);
            item.btn_get.visible = diyinfo.data.length > 0 && !has_get;
            
            // 前往定制
            item.btn_go.onClick(this, () =>{
                 // 【定制池信息，cell序号】
                 UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DiyGiftsView, [diyinfo]));
            })
            let lab2 = item.btn_go.getChildAt(0) as Laya.Label;
            lab2.text = Global.getLangStr("activity_msg31");    
            item.btn_go.visible = diyinfo.data.length == 0 && !has_get;
        }

        private refreshListCell(_data: Pb_God.PBPlayerActivityIndexData): void
        {
            for (let i = 0; i < this._indexdata.length; i++) {
                if(this._indexdata[i].index == _data.index)
                {
                    this._indexdata[i].data = _data.data;
                    this.refreshListView();
                    return;
                }
            }
            this._indexdata.push(_data);
            this.refreshListView();
        }

        /**
         * 
         * @param index 定制池编号
         */
        private getIndexData(index: number): Pb_God.PBPlayerActivityIndexData
        {
            let activityData = ActivityDataMgr.getActivityDataById(this.act_id);
            let diyInfo: Pb_God.PBPlayerActivityIndexData;
            if(activityData)
            {
                for (let i = 0; i < activityData.indexdata.length; i++) {
                    let diyInfo = activityData.indexdata[i];
                    if(diyInfo.index == index)
                    return diyInfo;
                }
            }
            for (let i = 0; i < this._indexdata.length; i++) {
                if(this._indexdata[i].index == index)
                {
                    return  this._indexdata[i];
                }
            }
            diyInfo = new Pb_God.PBPlayerActivityIndexData();
            diyInfo.index = index;
            diyInfo.data = [];
            return diyInfo;
        }

        // 预选请求后返回拉起充值
        private onCustomGiftOrder(value: Pb_God.PBG2CActivityCustomGiftOrder): void
		{
		    PlatformDataMgr.onChargeRequest(this._chargeCfgInfo);
		}
    }
}