module Pro
{
    /**
    * 探宝所有概率公示
    * @author jason.xu
    */
    export class TreasureRandomAllTips extends ProUI.Treasure.RandomAllTipsUI
    {

        public static show(type: number): void
        {
            var view = new TreasureRandomAllTips();
            view.initData(type);
            view.show();
        }

        constructor()
        {
            super();
        }


        public show(): void
        {
            LayerManager.Inst.topUILayer.addChild(this);
            //背景添加关闭触发
            let tempCoverSp = PopUpManager.popUpUIAction(this, 0);
            if (tempCoverSp)
            {
                tempCoverSp.on(Laya.Event.CLICK, this, this.close);
            }
        }

        public close(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        public initData(type: number): void
        {
            //根据玩家当前等级，取得对应等级段的group
            let group = cfg.TreasurePoolCfgData.getGroupIdByTypeAndLevel(type, PlayerDataMgr.level);
            let list = cfg.TreasureHuntCfgData.getListByGroup(group);
            let totalWeight = 0; //总权重
            let allMap = new ds.StringMap<any>();
            for (let el of list)
            {
                totalWeight += el.rollChance;
                let randItems = cfg.TreasureHuntCfgData.getAddRandItemArrByInfo(el);
                let childLen = randItems.length;
                for (var additem of randItems)
                {
                    let itemId = additem.itemid;
                    let weight = el.rollChance / childLen;
                    let saveItem = allMap.get(additem.itemid);
                    if (!saveItem)
                    {
                        saveItem = {};
                        saveItem.weight = weight;
                        saveItem.itemid = additem.itemid;
                        allMap.put(itemId, saveItem);
                    } else
                    {
                        saveItem.weight += weight;
                    }
                }
            }
            let keys = allMap.getKeys();
            this.listView.onRefreshWithArray(keys, this, (tempUI: ProUI.Treasure.RandomAllTipsItemUI, index: number) =>
            {
                let data = allMap.get(keys[index]);
                tempUI.txtName.text = cfg.ItemCfgData.getNameById(data.itemid);
                tempUI.txtValue.text = Global.parsePercentNum(data.weight / totalWeight, 2);
            })
        }

    }
}