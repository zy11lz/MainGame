module Pro
{
    /**
     * 界面说明： 英雄重生确认窗口
    * @author jason.xu
    */
    export class HeroRebirthMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroDetail.Rebirth.HeroRebirthUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroDetail.Rebirth.HeroRebirthUI, 0, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let hero: Net.hero = this.UIOpenData.customObject;
            //返还道具列表
            let returnItemList = this.getReturnItemList(hero);
            this.UIPanel.itemListView.onRefresh(returnItemList.length, this, (itemRewardUI: NorItemUI, index: number) =>
            {
                itemRewardUI.setItemInfo(returnItemList[index]);
            });

            //描述
            let heroName = cfg.PetSkinCfgData.getFileNameById(hero.useskinid);
            this.UIPanel.htmlContent.showText = Global.getLangStr("heroRebirth_msg02", heroName);
            //剩余次数
            let leftCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_RebornCount) -
                PetDataMgr.rebirthCount;
            this.UIPanel.hboxFee.visible = leftCount <= 0;
            if (leftCount <= 0)
            {
                leftCount = 0;
                //需要购买次数时
                let buyCount = PetDataMgr.buyRebirthCount;
                let needItem = cfg.PetRebornCostCfgData.getNeedItemInfo(buyCount + 1);
                if (!needItem)
                {
                    this.UIPanel.hboxFee.visible = false;
                } else
                {
                    this.UIPanel.txtNeedDiamon.text = needItem.itemcount + "";
                }
            }
            this.UIPanel.htmlCount.showText = Global.getLangStr("heroRebirth_msg03", leftCount);
            // this.UIPanel.btnConfirm.disabled = leftCount <= 0;
        }

        /** 英雄升级与进阶所消耗的材料 */
        private getReturnItemList(hero: Net.hero): cfg.AddItemInfo[]
        {
            let map = {};
            //先收集数量
            //升级消耗
            for (let level = 2; level <= hero.level; level++)
            {
                for (let el of cfg.PetUpgradeCfgData.getNeedItemAryById(level))
                {
                    let count = map[el.itemid] || 0;
                    map[el.itemid] = count + el.itemcount;
                }
            }
            //进阶消耗
            for (let adv = 1; adv <= hero.advance; adv++)
            {
                for (let el of cfg.PetAdvanceCfgData.getNeedItemAryById(adv))
                {
                    let count = map[el.itemid] || 0;
                    map[el.itemid] = count + el.itemcount;
                }
            }

            //再转换成道具列表数组
            let ret: cfg.AddItemInfo[] = [];
            for (var key in map)
            {
                var element = map[key];
                let item = new cfg.AddItemInfo();
                item.itemcount = parseInt(element)
                item.itemid = parseInt(key);
                ret.push(item);
            }
            return ret;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnConfirm.onClick(this, this.onClickConfirm);

            //重生返回(次数，SN)		PBU32U64
            this.addEventMgr(Cmd.S2C_Pet_Reborn.cmdName, this, this.closeUI)
            //购买重生次数返回		PBU32
            this.addEventMgr(Cmd.S2C_Pet_BuyRebornCount.cmdName, this, this.onBuyRebornCount)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }


		/*****
		 *购买重生次数返回		PBU32
		 * @param PBU32
		 */
        protected onBuyRebornCount(value: Pb_God.PBU32): void
        {
            this.requestRebirth();
        }

        /** 确定 */
        private onClickConfirm(): void
        {
            //判断次数
            if (PetDataMgr.rebirthCount < cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_RebornCount))
            {
                this.requestRebirth();
                return;
            }

            //需要购买次数时
            let buyCount = PetDataMgr.buyRebirthCount;
            let needItem = cfg.PetRebornCostCfgData.getNeedItemInfo(buyCount + 1);
            if (!needItem)
            {
                TipsUtils.showTipsByLanId("heroRebirth_msg07"); //次数已用完
                return;
            }
            //二级提示
            let des = Global.getLangStr("heroRebirth_msg06", cfg.ItemCfgData.getNameById(needItem.itemid), needItem.itemcount);
            AlertShow.showConfirmAlert(des, this, () =>
            {
                //向服务器发请求
                PetSend.buyRebornCount();
            });
        }

        /** 发起重生请求 */
        private requestRebirth(): void
        {
            let hero: Net.hero = this.UIOpenData.customObject;
            PetSend.reborn(hero.sn);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}