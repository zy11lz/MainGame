module Pro
{
    /**
     * 精灵自选礼包
     */
    export class GiftHeroPackSelectMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.ItemReview.GiftHeroSelectViewUI;

        // 已选中奖励列表
        private select_groupID_arr: number[] = [];

        /** 礼包英雄列表--当前所属精灵类型 */
        private TmpHeroTypeList: cfg.ItemGiftPackCfgInfo[];

        private gift_arr: cfg.ItemGiftPackCfgInfo[];

        // 最大选中个数
        private max_select_num: number;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ItemReview.GiftHeroSelectViewUI, 1,BaseAddLayer.CenterUI,true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btn_close.onClick(this, this.closeUI);
            this.UIPanel.btn_ok.onClick(this, this.onOkClick);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.select_groupID_arr = [];
            let itemData: Pb_God.PBItem = this.UIOpenData.customObject;
            let itemID: number = itemData.itemid;
            this.gift_arr = cfg.ItemGiftPackCfgData.getGiftInfoArrayByItemID(itemID);
            this.max_select_num = this.gift_arr[0].awardNum;
            if (this.max_select_num <= 0) this.max_select_num = 1;
            this.UIPanel.txt_desc.text = Global.getLangStr("ui_ItemReview_msg10", this.max_select_num);
            let heroTypeNum =  Pb_God._emPetType.PetType_Moon + 1;
            let startTypeIndex = 0;
            this.UIPanel.heroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
            {
                Global.setResPetType(itemUI, startTypeIndex + index);
                itemUI.onClick(this, this.onHeroTypeClick);

                if (index == 0)
                {
                    this.onHeroTypeClick(itemUI);
                }
            });
        }

        /** 选择一个阵营 */
        private onHeroTypeClick(btn: component.UIButton)
        {
            this.UIPanel.heroTypeSelectImg.x = btn.x;
            this.UIPanel.heroTypeSelectImg.y = btn.y;
            let heroType: number = parseInt(btn.name);
            this.TmpHeroTypeList = this.getCurHeroType(heroType);
            this.UIPanel.itemList.onRefresh(this.TmpHeroTypeList.length, this, this.onListItemRefresh); 
        }


        /**当前选中精灵阵营  */
        private getCurHeroType(heroType: number): cfg.ItemGiftPackCfgInfo[]
        {
            if(heroType == 0)return this.gift_arr;
            let petInfoArr: cfg.ItemGiftPackCfgInfo[] = [];
            for (var index = 0; index < this.gift_arr.length; index++) {
                var cfg_info = this.gift_arr[index];
                let rewards = cfg.ItemGiftPackCfgData.getAddItemAryByInfo(cfg_info);
                let petId = parseInt(cfg.ItemCfgData.getInfo(rewards[0].itemid).useParam.split("_")[0]);
                let type = cfg.PetCfgData.getPetTypeByPetID(petId);
                if(heroType == type)
                {
                    petInfoArr.push(cfg_info);
                }
            }
            return petInfoArr;
        }

        /** 刷新精灵栏 */
        private onListItemRefresh(item: ProUI.ItemReview.GiftSelectItemUI, index: number): void
        {
            let cfg_info = this.TmpHeroTypeList[index];
            let rewards = cfg.ItemGiftPackCfgData.getAddItemAryByInfo(cfg_info);
            item.img_select.visible = this.select_groupID_arr.indexOf(cfg_info.id) >= 0;

            item.btn_toggle.onClick(this, () =>
            {
                // 检测是否超出选择上限
                item.img_select.visible = !item.img_select.visible;
                if (item.img_select.visible)//选中
                {
                    this.select_groupID_arr.push(cfg_info.id);
                    if (this.select_groupID_arr.length > this.max_select_num)
                    {
                        let itemId = this.select_groupID_arr.shift();//删除最先选中的那个，并刷新列表
                        this.UIPanel.itemList.refresh();
                    }

                }
                else
                {
                    // 删除元素
                    for (let i = 0; i < this.select_groupID_arr.length; i++)
                    {
                        if (this.select_groupID_arr[i] == cfg_info.id)
                        {
                            this.select_groupID_arr.splice(i, 1);
                            break;
                        }
                    }
                }
            });

            let petId = parseInt(cfg.ItemCfgData.getInfo(rewards[0].itemid).useParam.split("_")[0]);
            item.PetJobLb.text = Global.getResPetJobTypeName(cfg.PetCfgData.getPetJobTypeByPetID(petId));
            let petDesc = cfg.PetCfgData.getDescByPetID(petId);
            if (petDesc)
            {
                item.PetDescLb.text = `[${ petDesc }]`;
                // item.PetDescLb.x = item.PetJobLb.x + item.PetJobLb.width + 5;
            } else
            {
                item.PetDescLb.text = "";
            }
            item.PetDescLb.visible = item.PetJobLb.visible = true;
            item.petBoxLb.refresh();
            item.itemBox.onRefresh(rewards.length, this, (m_item: NorItemUI, index) =>
            {
                m_item.setItemInfo(rewards[index], true);
            });
        }

        /**
         * 
         */
        private onOkClick(): void
        {
            if (this.select_groupID_arr.length < this.max_select_num)
            {
                // 选中数量不足
                TipsUtils.showTips(Global.getLangStr("ui_ItemReview_msg11", this.max_select_num));
                return;
            }

             //判断英雄背包格子
             if (PetDataMgr.getPetList().length + this.max_select_num > PetDataMgr.getSpaceNum())
             {
                 TipsUtils.showTipsByLanId("hero_msg24");
                 this.closeUI();
                 return;
             }

            this.closePanel();
            let itemData: Pb_God.PBItem = this.UIOpenData.customObject;
            ItemSend.bag_Use(itemData.itemsn, 1, this.select_groupID_arr);
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }
    }
}