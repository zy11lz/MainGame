module Pro
{
    /**
    * 玩法入口item， 此视图在秘境探险（SecretTravelMediator）与跨服战场（AcrossWarMediator）均有用到
    * 类说明：简化重复代码
    * @author jason.xu
    */
    export class GamesEnterItemView extends ProUI.GamesEnter.GamesEnterItemViewUI
    {
        /** 设置描述显示 */
        public setDescText(value: string): void
        {
            this.txtContent.text = value;
        }
        /** 刷新单个item显示
         * @param systemId Pro.emSystemSwitchType
         * @param prizePreviewId 奖励预览id 对应Constant.xls -> GamesPrizePreview的Id
         * @param reddot 红点是否亮起
         * @param clickCallback 点击回调方法
         */
        public refreshSingleItemView(prizePreviewId: number, bgName: string, reddot: boolean, clickCallback: Function, color?: string)
        {
            this.itemBox1.visible = true;
            this.itemBox2.visible = !this.itemBox1.visible;
            this.txtContent.text = cfg.ConstantGamesPrizePreviewCfgData.getDescById(prizePreviewId);
            this.imgBg.skin = `res/Unpack/games_enter_bg/${ bgName }.jpg`;
            //开启条件
            let systemId = cfg.ConstantGamesPrizePreviewCfgData.getSystemSwitchIdById(prizePreviewId);
            let isOpen =  PlayerDataMgr.checkSystemSwitchOpen(systemId, false);

            this.lock.visible = !isOpen; //黑色蒙板
            this.reddot.visible = isOpen && reddot; //红点

            if (!isOpen)
            {
                //未开启时，显示开启条件
                this.txtOpenCondition.text = cfg.SystemSwitchSystemSwitchCfgData.getUnlockDesByID(systemId);
            }
            let rewards = cfg.ConstantGamesPrizePreviewCfgData.getValueById(prizePreviewId).split(";");
            this.listNorItem.onRefresh(rewards.length, this, (norItemUI: Pro.NorItemUI, rewardIndex: number) =>
            {
                norItemUI.setItemID(parseInt(rewards[rewardIndex]), 0, false, false, isOpen, false, false);
            });

            //点击回调
            this.btn.mouseEnabled = isOpen;
            this.btn.onClick(this, clickCallback);

        }

        /** 刷新左边item显示
         * @param systemId Pro.emSystemSwitchType
         * @param prizePreviewId 奖励预览id 对应Constant.xls -> GamesPrizePreview的Id
         * @param reddot 红点是否亮起
         * @param clickCallback 点击回调方法
         */
        public refreshLeftSingleItemView(prizePreviewId: number, bgName: string, reddot: boolean, clickCallback: Function, color?: string)
        {
            this.itemBox1.visible = false;
            this.itemBox2.visible = !this.itemBox1.visible;
            this.imgBg.skin = `res/Unpack/games_enter_bg/${ bgName }.jpg`;
            this.txtContentLeft.text = cfg.ConstantGamesPrizePreviewCfgData.getDescById(prizePreviewId);
            
            //开启条件
            let systemId = cfg.ConstantGamesPrizePreviewCfgData.getSystemSwitchIdById(prizePreviewId);
            let isOpen =  PlayerDataMgr.checkSystemSwitchOpen(systemId, false);

            this.reddotLeft.visible = isOpen && reddot; //红点
            this.shadeLeft.visible = !isOpen;
            this.txtOpenConditionLeft.visible = this.shadeLeft.visible;
            if (!isOpen)
            {
                //未开启时，显示开启条件
                this.txtOpenConditionLeft.text = cfg.SystemSwitchSystemSwitchCfgData.getUnlockDesByID(systemId);
            }
            let rewards = cfg.ConstantGamesPrizePreviewCfgData.getValueById(prizePreviewId).split(";");
            this.listNorItemLeft.onRefresh(rewards.length, this, (norItemUI: Pro.NorItemUI, rewardIndex: number) =>
            {
                norItemUI.setItemID(parseInt(rewards[rewardIndex]), 0, false, false, isOpen, false, false);
            });

            //点击回调
            this.btnLeft.mouseEnabled = isOpen;
            this.btnLeft.onClick(this, clickCallback);
        }

        /** 刷新右边边item显示
         * @param systemId Pro.emSystemSwitchType
         * @param prizePreviewId 奖励预览id 对应Constant.xls -> GamesPrizePreview的Id
         * @param reddot 红点是否亮起
         * @param clickCallback 点击回调方法
         */
        public refreshRightSingleItemView(prizePreviewId: number, bgName: string, reddot: boolean, clickCallback: Function, color?: string)
        {
            this.itemBox1.visible = false;
            this.itemBox2.visible = !this.itemBox1.visible;
            this.imgBg.skin = `res/Unpack/games_enter_bg/${ bgName }.jpg`;
            this.txtContentRight.text = cfg.ConstantGamesPrizePreviewCfgData.getDescById(prizePreviewId);
            
            //开启条件
            let systemId = cfg.ConstantGamesPrizePreviewCfgData.getSystemSwitchIdById(prizePreviewId);
            let isOpen =  PlayerDataMgr.checkSystemSwitchOpen(systemId, false);
            this.reddotRight.visible = isOpen && reddot; //红点
            this.shadeRight.visible = !isOpen;
            this.txtOpenConditionRight.visible = this.shadeRight.visible;
            if(this.shadeLeft.visible && this.shadeRight.visible)
            {
                this.shadeLeft.visible = this.shadeRight.visible = false;
                this.shadeAll.visible = true
            }
            else
            {
                this.shadeAll.visible = false
            }
            if (!isOpen)
            {
                //未开启时，显示开启条件
                this.txtOpenConditionRight.text = cfg.SystemSwitchSystemSwitchCfgData.getUnlockDesByID(systemId);
            }
            let rewards = cfg.ConstantGamesPrizePreviewCfgData.getValueById(prizePreviewId).split(";");
            this.listNorItemRight.onRefresh(rewards.length, this, (norItemUI: Pro.NorItemUI, rewardIndex: number) =>
            {
                norItemUI.setItemID(parseInt(rewards[rewardIndex]), 0, false, false, isOpen, false, false);
            });

            //点击回调
            this.btnRight.mouseEnabled = isOpen;
            this.btnRight.onClick(this, clickCallback);
        }
    }
}