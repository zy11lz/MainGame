
module Pro
{
	/**
	 * 神装
	 */
    export class HeroDetailGodEquipTabel extends ProUI.Hero.HeroDetail.FunLayer3UI implements ITableView
    {

        private SelectRole: Net.hero;
        private SelectEquipType: number;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            // this.btnSuitMgr.visible = !GlobalData.isRelease;
        }

        /** 页签组件销毁 */
        dispose(): void
        {

        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        addEvent(): void
        {
            this.btnHelp.onClick(this, this.onClickHelp);
            this.btnBook.onClick(this, this.onClickBook);
            this.btnShop.onClick(this, this.onClickShop);
            this.btnPray.onClick(this, this.onClickPray);
            this.btnSuitMgr.onClick(this, this.onClickSuitMgr);
            this.btnTotalValue.onClick(this, this.onClickTotalValue);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        removeEvent(): void
        {

        }
        /** 规则说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "god_des_2");
        }
        /** 神装图鉴 */
        private onClickBook(btn: component.UIButton): void
        {
            if (!this.checkHeavenOpen()) return;
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenGodEquipView));
        }

        /**神装商店 */
        private onClickShop(btn: component.UIButton): void
        {
            if (!this.checkHeavenOpen()) return;
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenGodEquipShopView));
        }

        /**祈祷获取 */
        private onClickPray(btn: component.UIButton): void
        {
            if (!this.checkHeavenOpen()) return;
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenPrayView));
        }

        /** 点击套装管理 */
        private onClickSuitMgr(): void
        {
            if (!this.checkHeavenOpen()) return;
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_GodEquipSuitMgr, this.SelectRole));
        }

        private checkHeavenOpen(): boolean
        {
            if (!PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Heaven))
            {
                TipsUtils.showTipsByLanId("hero_msg25");
                return false;
            }
            return true;
        }

        /** 加成总览 */
        private onClickTotalValue(): void
        {
            //向服务器拉取数据
            PetSend.godEquipPreview(this.SelectRole.sn);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部主动调用,传递参数信息 */
        setData($data: any): void
        {
            this.SelectRole = $data;
            this.refreshUI();
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        show(): void
        {

        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        hide(): void
        {

        }

        /** 刷新状态 */
        public refreshUI()
        {

            let suitIds = [0, 0, 0, 0];
            let idMapIndex = {};

            for (let i = 0; i < this.ItemBox.numChildren; i++)
            {
                let tempUI = this.ItemBox.getChildAt(i) as EquipItemUI;
                tempUI.name = i.toString();
                tempUI.onClick(this, this.onEquipItemClick);
                let tempEquipType = i + 1;
                tempUI.setPetGodWeaponInfo(this.SelectRole, tempEquipType);// Pb_God._emGodEquipType.GodEquipType_Earring + i


                let suitEquipInfo = SuitEquipDataMgr.getSuitMgr(this.SelectRole.sn);
                let tempEquipInfo = suitEquipInfo.getGodEquip(tempEquipType);

                let suitImg = this.suitBox.getChildAt(i) as Laya.Image;
                let starImg = this.starBox.getChildAt(i) as Laya.Image;

                if (tempEquipInfo == null)
                {
                    suitImg.skin = "";
                    starImg.skin = "";
                    suitIds[i] = 0;
                    continue;
                }

                let tempItemInfo = ItemDataMgr.getUsesPBItem(tempEquipInfo.itemsn);
                if (tempItemInfo == null)
                {
                    //服务器通知背包数据先删除，但是，套装数据还没有删除之前，
                    // 刷新此ui,就会找不到tempItemInfo,这个加强判断不导致客户端崩溃就行了，
                    // 服务器稍后就会删除此角色身上对应的装备
                    //之所以有时候报错，有时候不会，是因为执行到此方法时，Laya.timer.callLater延时了两次，当网络慢的时候，就会走到这里
                    suitImg.skin = "";
                    starImg.skin = "";
                    suitIds[i] = 0;


                    continue;
                }
                let itemStar = cfg.ItemCfgData.getStarNumById(tempItemInfo.itemid);
                let suitId = suitIds[i] = parseInt(cfg.ItemCfgData.getUseParamById(tempItemInfo.itemid));
                let godequipSuitType = cfg.GodEquipSuitCfgData.getTypeBySuitID(suitId);

                let arr = idMapIndex[suitId];
                if (!arr) idMapIndex[suitId] = arr = [];
                arr.push(i);

                // suitNums[i] = this.SelectRole.sn != null ? SuitEquipDataMgr.getSuitMgr(this.SelectRole.sn).getActiveSuitGodNum(tempItemInfo.itemsn as Long) : 0;
                suitImg.skin = `res/Unpack/Icon/godequip_suit/${ godequipSuitType }_${ tempEquipType }.png`;
                starImg.skin = `res/Unpack/Icon/godequip_suit_star/${ itemStar }_${ tempEquipType }.png`;
            }

            // 套装激活图标显示比较特殊 详细规则：
            // 1. 当总共只有两件或三件形成1组套装时， 对应显示淡蓝色1
            // 2. 当四件形成完整一组套装时，对应显示紫色3
            // 3. 当有各自两个件形成两组套装时， 一组显示淡蓝色1 一组显示黄色2
            let first = true;
            let suitActIndexs = [0, 0, 0, 0];
            for (const id in idMapIndex)
            {
                const indexArr: number[] = idMapIndex[id];
                let len = indexArr.length;
                let colorIndex = 0;
                if (len == 4)
                    colorIndex = 3;
                else if (len >= 2)
                {
                    colorIndex = first ? 1 : 2;
                    first = false;
                } else continue;
                for (const index of indexArr)
                {
                    suitActIndexs[index] = colorIndex;
                }
            }


            for (let i = 0; i < 4; i++)
            {
                let suitActiveImg = this.suitActiveBox.getChildAt(i) as Laya.Image;
                let actIndex = suitActIndexs[i];
                if (actIndex)
                {
                    suitActiveImg.skin = `res/Unpack/Icon/godequip_suit_active/${ actIndex }_${ i + 1 }.png`;
                }
                else
                {
                    suitActiveImg.skin = "";
                }
            }
        }

        /** 穿/脱装备 */
        private onEquipItemClick(tmpItemUI: EquipItemUI)
        {

            let tempSelectIndex = parseInt(tmpItemUI.name);
            this.SelectEquipType = Pb_God._emGodEquipType.GodEquipType_Earring + tempSelectIndex;
            let tempEquipInfo = SuitEquipDataMgr.getSuitMgr(this.SelectRole.sn).getGodEquip(this.SelectEquipType);
            if (tempEquipInfo == null)
            {
                if (tmpItemUI.RedDotImg.visible)
                {
                    UIManager.Inst.forceOpen(new HeroEquipSuitOpenUIData(this.SelectRole.sn, this.SelectEquipType, PanelNotify.Open_HeroEquipSuitGod));
                }
                else
                {
                    TipsUtils.showTipsByLanId("tips_msg29");
                }
            }
            else
            {
                let tempItemInfo = ItemDataMgr.getUsesPBItem(tempEquipInfo.itemsn as Long);
                UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tempItemInfo, this.SelectRole.sn, true));
            }
        }
    }
}