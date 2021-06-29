module Pro
{
    /**
    * 个人形象配置界面分页-形象修改
    * @author jason.xu
    */
    export class ShapePageViewShape extends ProUI.Shape.ChildView.PageViewShapeUI implements ITableView
    {

        /** 当前使用的ID， 临时存一份UI上已经显示的项，便于在更新时，取旧值更新相应的item，避免整个列表的刷新 */
        private _curUseId: number = -1;
        /** 当前显示的排序后的列表 */
        private _list: cfg.PetSkinCfgInfo[] = [];
        /** 形象展示 */
        private _sk: SkeletonPlayer;

        /** 打开窗口后，首次显示到此分页时需要拉取一次数据，保证新鲜 */
        private _isPull: boolean = false;
        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._isPull = false;
            this._curUseId = ShapeDataMgr.usetitleid;
            this.listView.selectEnable = true;
            this.listView.onRefresh(0, null, null);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            if (!this._isPull)
            {
                this._isPull = true;
                ShapeSend.openRisk();
            } else
            {
                this.onRefreshList();
            }
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }


        public addEvent(): void
        {
            EventMgr.on(CmdEvent.Shape_SynAllRisk, this, this.onRefreshList);
            EventMgr.on(CmdEvent.Shape_SetRiskAck, this, this.onRefreshList);

            this.listView.on(Laya.Event.CHANGE, this, this.onChangeSelectedIndex);
            this.btnUse.onClick(this, this.onClickUse);
        }

        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Shape_SynAllRisk, this, this.onRefreshList);
            EventMgr.off(CmdEvent.Shape_SetRiskAck, this, this.onRefreshList);
        }

        /** 刷新列表 */
        private onRefreshList(): void
        {
            let allList = cfg.PetSkinCfgData.getShapeList();
            this._list = allList.slice(0);
            this._list.sort((a: cfg.PetSkinCfgInfo, b: cfg.PetSkinCfgInfo): number =>
            {
                return this.getSortIndex(b) - this.getSortIndex(a);
            });
            this.listView.selectedIndex = 0;
            this.listView.onRefresh(this._list.length, this, this.onRefreshItem);
        }

        /** 单个冒险形象数据的显示优先级，即排序号，根据激活状态，激活进度等因素影响 */
        private getSortIndex(cfgData: cfg.PetSkinCfgInfo): number
        {
            //当前已选，则优先级最高
            if (ShapeDataMgr.useRiskShapeId == cfgData.id) { return 10; }
            //已激活，则优先级第二高
            if (ShapeDataMgr.isActiveRiskShape(cfgData.id)) { return 9; }
            let conditionList = ShapeDataMgr.getRiskShapeCondition(cfgData.id);
            //没有任何进度信息, 则优先级最低
            if (!conditionList || conditionList.length == 0) { return 0; }
            return conditionList.length;  //完成的越多优先级越高
        }


        private onRefreshItem(tempUI: ProUI.Shape.ChildView.PageViewIconItemUI, index: number): void
        {
            let cfgData = this._list[index];
            tempUI.icon.skin = Global.getHeadPathWithIconName(cfgData.iconName);
            tempUI.txtName.text = cfgData.fileName;
            tempUI.sel.visible = index == this.listView.selectedIndex;
            tempUI.btn.gray = !ShapeDataMgr.isActiveRiskShape(cfgData.id);
            tempUI.using.visible = cfgData.id == ShapeDataMgr.useRiskShapeId;
        }

        /** 点击使用 */
        private onClickUse(): void
        {
            let cfgData = this._list[this.listView.selectedIndex];
            if (!cfgData) { return; }
            //判断是否激活
            if (!ShapeDataMgr.isActiveRiskShape(cfgData.id))
            { return; }
            ShapeSend.setRisk(cfgData.id);
        }

        private onChangeSelectedIndex(): void
        {
            let index: number = this.listView.selectedIndex;
            let cfgData = this._list[index];

            //激活条件列表
            this.refreshConditionList(cfgData);
            //属性列表
            this.refreshAttribList(cfgData);
            //展示形象
            this.refreshHeroShapeView(cfgData.id);
        }

        /** 刷新激活条件进度 */
        private refreshConditionList(cfgData: cfg.PetSkinCfgInfo): void
        {
            let isActive = ShapeDataMgr.isActiveRiskShape(cfgData.id);
            this.txtIsActivity.visible = isActive;
            if (isActive)
            {
                this.listCondition.onRefresh(0, null, null);
                return;
            }
            //所有条件
            let allConditionList = cfg.PetSkinCfgData.getConditionListByCfgInfo(cfgData);
            //已完成的列表
            let finishList = ShapeDataMgr.getRiskShapeCondition(cfgData.id);
            this.listCondition.onRefresh(allConditionList.length, this, (tempUI: Laya.Box, index: number) =>
            {
                let conditionType = allConditionList[index].value1;
                let conditionValue = allConditionList[index].value2;
                let finish = finishList.indexOf(conditionType) >= 0;
                (tempUI.getChildByName("finish") as Laya.Sprite).visible = finish;
                (tempUI.getChildByName("unfinish") as Laya.Sprite).visible = !finish;
                (tempUI.getChildByName("condition") as Laya.Label).text = this.__getConditionString(cfgData, conditionType, conditionValue);
            })

        }

        /** 根据条件类型与数值组成字符串 */
        private __getConditionString(cfgData: cfg.PetSkinCfgInfo, conditionType: number, conditionValue: number): string
        {
            let ret = "";
            switch (conditionType)
            {
                case Pb_God._emPreCondition.PreCondition_NeedPetID:
                    ret = Global.getLangStr("precondition_1", cfg.PetSkinCfgData.getFileNameById(conditionValue));
                    break;
                case Pb_God._emPreCondition.PreCondition_NeedSkin:
                    ret = Global.getLangStr("precondition_2", cfgData.fileName);
                    break;
                case Pb_God._emPreCondition.PreCondition_NeedStar:
                    ret = Global.getLangStr("precondition_3", cfg.PetSkinCfgData.getFileNameByPetID(cfgData.petID), conditionValue);
                    break;
                case Pb_God._emPreCondition.PreCondition_NeedPlayerLevel:
                    ret = Global.getLangStr("precondition_4", conditionValue);
                    break;
                case Pb_God._emPreCondition.PreCondition_NeedVipLevel:
                    ret = Global.getLangStr("precondition_5", conditionValue);
                    break;
            }
            return ret;
        }

        /** 刷新属性列表 */
        private refreshAttribList(cfgData: cfg.PetSkinCfgInfo): void
        {

            let attrList = cfg.PetSkinCfgData.getAddAttrListByCfgInfo(cfgData);
            if (!attrList || attrList.length <= 0)
            {
                this.txtAttrEmpty.visible = true;
                this.listAttr.onRefresh(0, null, null);
            } else
            {
                this.txtAttrEmpty.visible = false;
                //显示属性
                this.listAttr.onRefresh(attrList.length, this, (label: Laya.Label, nAttr: number) =>
                {
                    let attr = attrList[nAttr];
                    label.text = Global.getFullAttrValueString(attr, "：");
                })
            }
        }

        private onSkStop(e: LayaEvent)
        {
            this._sk.play("standby_loop", true);
        }

        /** 刷新形象显示 */
        private refreshHeroShapeView(resourceID: number): void
        {
            if (!this._sk)
            {
                this._sk = new SkeletonPlayer();
                //获取资源ID
                let skelName = cfg.PetSkinCfgData.getSkelNameById(resourceID);
                let firstAniAction = cfg.PetSkinCfgData.getFirstActById(resourceID);
                this._sk.play(firstAniAction ? firstAniAction : "win_loop", false);
                this._sk.on(LayaEvent.STOPPED, this, this.onSkStop);
                this._sk.pos(this.imgAvatar.width >> 1, this.imgAvatar.height >> 1);
                this._sk.load(UrlMgr.getModelSkUrl(skelName));
                this._sk.alpha = 0;
                this.imgAvatar.addChild(this._sk);
                this.imgAvatar.zOrder = 10;
            }
            var showScale = cfg.PetSkinCfgData.getShowScaleById(resourceID);
            this._sk.scale(showScale, showScale);
            this._sk.alpha = 1;
            let skelName = cfg.PetSkinCfgData.getSkelNameById(resourceID);
            this._sk.setRes(UrlMgr.getModelSkUrl(skelName));
        }
        /** 页签组件销毁 */
        public dispose(): void
        {
            if (this._sk)
            {
                this._sk.off(LayaEvent.STOPPED, this, this.onSkStop);
                this._sk.removeSelf();
                this._sk = null;
            }
        }


    }
}