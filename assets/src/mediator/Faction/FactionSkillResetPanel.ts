module Pro
{

    /**
    * 公会技能重置确认窗口
    * @author jason.xu
    */
    export class FactionSkillResetPanel extends ProUI.Faction.FactionSkillResetUI
    {
        private _job: number;
        private _needItemId: number;
        private _needItemCount: number;
        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {

        }

        public show(): void
        {
            LayerManager.Inst.topUILayer.addChild(this);
            PopUpManager.popUpUIAction(this, 0);

            this.btnConfirm.disabled = true;
            this._tick = 5;
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }
        private _tick: number;
        private onTimer(): void
        {
            if (this._tick < 0)
            {
                this.btnConfirm.disabled = false;
                this.txtConfirmLabel.text = Global.getLangStr("faction_msg28");//确定重置";
                return;
            }
            this.txtConfirmLabel.text = Global.getLangStr("faction_msg28") + "(" + this._tick + ")";
            this._tick--;
        }

        public closeUI(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private addEvent(): void
        {
            this.btnCancel.onClick(this, this.closeUI);
            this.btnClose.onClick(this, this.closeUI);
            this.btnConfirm.onClick(this, this.onClickConfirm);
        }


        /** 确定重置 */
        private onClickConfirm(): void
        {
            //判断道具是否足够
            if (!Global.isFullRes(this._needItemId, this._needItemCount, true)) return;

            FactionSend.skillReset(this._job);

            this.closeUI();
        }

        public refreshView(job: number)
        {
            this._job = job;
            //当前等级
            let level = FactionDataMgr.getSkillLevel(job);
            //是否首次
            let isFirst = FactionDataMgr.skillResetCount == 0;

            let cfgData = cfg.FactionSkillResetCfgData.getCfgInfoByLevel(level, isFirst);
            let neeItems = cfgData.needItem.split("_");
            this._needItemId = parseInt(neeItems[0]);
            this._needItemCount = parseInt(neeItems[1]);

            //计算所有升级消耗过的道具
            let idMapConsumeCount = new ds.StringMap<number>();
            for (let i = 1; i <= level; i++)
            {
                let itemList = cfg.FactionSkillUpgradeCfgData.getNeedItemAryByLevel(i);
                for (let needItem of itemList)
                {
                    let count = idMapConsumeCount.getValue(needItem.itemid) || 0;
                    idMapConsumeCount.put(needItem.itemid, count + needItem.itemcount);
                }
            }

            //计算返还比率
            let arrReturn = cfgData.returnItem.split(";");
            let arrRetrunContent = [];  //组合文字
            //根据消耗过的道具与返还配置，取得有效的返还道具列表
            let returnItemList: cfg.AddItemInfo[] = [];
            for (let i = 0; i < arrReturn.length; i++)
            {
                if (!arrReturn[i]) continue;
                let elemArr = arrReturn[i].split("_");
                let itemId = parseInt(elemArr[0]);
                let scale = parseInt(elemArr[1]);
                arrRetrunContent[i] = Global.parsePercentNum(scale / 10000) + cfg.ItemCfgData.getNameById(itemId);

                //计算返回的数值
                let consumeCount = idMapConsumeCount.get(itemId);
                if (!consumeCount) continue;
                let addItem = new cfg.AddItemInfo();
                addItem.itemid = itemId;
                addItem.itemcount = Math.floor(consumeCount * scale / 10000);
                returnItemList.push(addItem);
            }

            let needName = cfg.ItemCfgData.getNameById(this._needItemId);
            let jobName = Global.getLangStr("hero_job" + job) + Global.getLangStr("common_job");

            let strAllReturn = arrRetrunContent.join(Global.getLangStr("common_and"));  //x和y
            let strContent = isFirst ? Global.getLangStr("faction_msg29") : Global.getLangStr("faction_msg30"); //首次重置只需要消耗 : 重置需要消耗;
            strContent += "<font color='#009e00'>&#160;" + this._needItemCount + needName + "&#160;</font>";
            strContent += Global.getLangStr("faction_msg31", jobName, strAllReturn);
            this.htmlContent.showText = strContent;

            this.itemListView.onRefresh(returnItemList.length, this, (itemRewardUI: NorItemUI, index: number) =>
            {
                itemRewardUI.setItemInfo(returnItemList[index]);
            });
        }
    }
}