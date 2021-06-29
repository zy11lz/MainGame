
module Pro
{
	/**
	 * 图鉴成就
	 */
    export class HeroIllustrationAttrMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        UIPanel: ProUI.Hero.HeroIllustration.AttrUI;

        /**保存box位置 */
        private _pos: Laya.Point[];

        /**
         * 宝箱
         */
        private _gifts: Pro.ProgressChestItemUI[];

        /**
         * 正在移动
         */
        private _isMoving: boolean = false;

        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("heroIllustration")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return null;
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroIllustration.AttrUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            this._gifts = [];
            this._pos = [];
            //记录几个box的位置 用于动效
            for (let i = 0; i <= 5; i++)
            {
                let box = this.UIPanel[`giftBox${ i }`];
                this._pos.push(new Laya.Point(box.x, box.y));

                let gift = new Pro.ProgressChestItemUI();
                this.UIPanel.addChild(gift);
                gift.pos(box.x, box.y);
                this._gifts.push(gift);

                //第一个和最后一个先隐藏
                if (i == 0 || i == 5)
                {
                    gift.alpha = 0;
                }
            }
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.UIPanel.closeBtn.onClick(this, this.closeUI);
            this.addEventMgr(CmdEvent.Achieve_IllustrationPowerComplete, this, this.onUpdateAni);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /**
         * 这里需要做一个效果
         * 如果当前显示的箱子都领完了 就要整体向左移动 最左边的渐隐 最右边出现新的可领宝箱
         */
        private onUpdateAni()
        {
            if (this._isMoving)
                return;
            this._isMoving = true;

            if (!IllustrationDataMgr.checkHaveCompleteFourBox() || IllustrationDataMgr.checkHaveCompleteAllBox())
            {
                this._isMoving = false;
                this.updatePower();
            }
            else
            {

                this.updatePower(true);
                for (let i = 1; i <= 5; i++)
                {
                    let itemUI = this.getItemUIByIndex(i);
                    Laya.Tween.to(itemUI, { x: this._pos[i - 1].x, alpha: i == 1 ? 0 : 1 }, 500, null, Laya.Handler.create(this, () =>
                    {
                        i == 1 && (itemUI.x = this._pos[5].x);
                        this._isMoving = false;
                    }))
                }
            }

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            this.updatePower();
            //以下为属性界面
            this.updateAttr();
        }

        private updatePower(isAni: boolean = false)
        {
            let pro = [];
            let realPro = [];
            let infos = IllustrationDataMgr.getShowAttrAchieveInfo();
            for (let i = 1; i <= 4; i++)
            {
                let info = infos[i - 1];
                let addItems = cfg.IllustrationPowerCfgData.getAddItemAryById(info.id);
                let tempUI: Pro.ProgressChestItemUI = this.getItemUIByIndex(isAni ? i + 1 : i);
                let tempIsActive = IllustrationDataMgr.checkIllustrationPowerCanGet(info.id);
                let tempIsHave = IllustrationDataMgr.checkIllustrationPowerHaveGot(info.id);;
                tempUI.setBoxTypeIndex(1);
                tempUI.setText(cfg.IllustrationPowerCfgData.getValueById(info.id));
                tempUI.showBubble(Global.getItemIconById(addItems[0].itemid), addItems[0].itemcount);
                tempUI.index = info.id;
                tempUI.setOpenState(tempIsActive, tempIsHave);
                tempUI.onClick(this, tempIsHave ? null : this.onProgressBoxClick);
                pro.push(info.value);
                realPro.push(this.UIPanel["real" + i].x)
            }

            let currPower = IllustrationDataMgr.getHistoryPower();
            this.UIPanel.powerLbl.text = `${ currPower }/${ infos[3].value }`;

            //进度条要显示当前最大值而不是总值
            Global.setProgressBarMask(this.UIPanel.ProImg, Global.getSpecialProgressValue(currPower, pro, realPro));
        }

        private updateAttr()
        {
            //图鉴属性
            let tmpAtterDic = IllustrationDataMgr.getIllustrationAddAttr();
            this.UIPanel.attrList.onRefresh(tmpAtterDic.keys.length, this, (item: ProUI.Artifact.ShengyinInfo.AttrItemUI, index: number) =>
            {
                item.bg.visible = false;
                let iType = tmpAtterDic.keys[index];
                item.iconType.frame = iType;
                item.txtValue.text = cfg.BattleCfgData.getDescByAttrType(iType) + "+" + tmpAtterDic.get(iType);
            })

            //羁绊属性
            let tmpTrammelAtterDic = IllustrationDataMgr.getIllustrationTrammelAddAttr();
            this.UIPanel.trammelList.onRefresh(tmpTrammelAtterDic.keys.length, this, (item: ProUI.Artifact.ShengyinInfo.AttrItemUI, index: number) =>
            {
                item.bg.visible = false;
                let iType = tmpTrammelAtterDic.keys[index];
                item.iconType.frame = iType;
                item.txtValue.text = cfg.BattleCfgData.getDescByAttrType(iType) + "+" + tmpTrammelAtterDic.get(iType);
            })

        }

        private getItemUIByIndex(index)
        {
            this._gifts.sort((a, b) =>
            {
                return a.x - b.x;
            })
            return this._gifts[index];
        }

        private onProgressBoxClick(tempUI: Pro.ProgressChestItemUI)
        {
            let id = tempUI.index;
            AchieveSend.illustrationPowerComplete(id);
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }
    }
}