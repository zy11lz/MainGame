module Pro
{
    /**
    * 神界冒险中，多个界面用到的英雄操作选择视图。
    * 视图逻辑：从出战列表中，选择其中一个英雄进行操作，比如加生命，出战等，当前选择的英雄，会保存在全局数据段中，所有用到英雄列表之处，都共享选择状态
    * @author jason.xu
    */
    export class RiskOperateHerosListView extends component.UIItemBox
    {

        /** 刷新 */
        public refreshView(): void
        {
            this.refreshDefaultHero();
        }


        /** 选中默认选择的英雄（排除已阵亡的） */
        private refreshDefaultHero(): void
        {
            let list = RiskDataMgr.getFightHeroList();
            let defaultIndex = RiskDataMgr.getOperaHeroIndex();
            let oldIndex = defaultIndex;
            let hero = list[defaultIndex];
            if (!hero || hero.curhp.toNumber() <= 0)
            {
                //当前没有选中的对象，或者已阵亡，循环遍历找一个未阵亡的
                defaultIndex = -1;
                for (var i = 0; i < list.length; i++)
                {
                    if (list[i].curhp.toNumber() > 0)
                    {
                        defaultIndex = i;
                        break;
                    }
                }
            }
            if (oldIndex == defaultIndex) this.refreshHeroList();
            else RiskDataMgr.setOperaHeroIndex(defaultIndex);
        }


        /** 刷新英雄列表 */
        public refreshHeroList(): void
        {
            let heroList = RiskDataMgr.getFightHeroList();
            this.onRefresh(heroList.length, this, this.onRefreshHeroItem);
        }

        /** 刷新英雄 */
        private onRefreshHeroItem(norItem: Pro.NorItemUI, index: number): void
        {
            let hero = RiskDataMgr.getFightHeroList()[index];
            norItem.setPetUI(hero.petdisplay.useskinid, hero.petdisplay.star, false,hero.petdisplay.evolve);
            //显示血量
            let hpProgress = (hero.curhp as Long).toNumber() / (hero.maxhp as Long).toNumber();
            norItem.DieImg.visible = hpProgress <= 0;
            norItem.BloodBgImg.visible = !norItem.DieImg.visible;
            norItem.setBloodProgress(hpProgress);
            norItem.BloodLb.visible = false;
            norItem.LvLb.visible = true;
            norItem.LvLb.text = hero.petdisplay.level.toString();

            norItem.SelectStatueImg.visible = index == RiskDataMgr.getOperaHeroIndex() && hpProgress > 0;

            norItem.onClick(this, () =>
            {
                if (hpProgress <= 0)
                {
                    TipsUtils.showTipsByLanId("tips_msg39");
                    return;
                }
                RiskDataMgr.setOperaHeroIndex(index);
            })

        }

    }
}