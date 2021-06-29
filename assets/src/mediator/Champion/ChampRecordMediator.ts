module Pro
{
    /**
    * 界面说明： 冠军赛-战斗记录界面
    * @author jason.xu
    */
    export class ChampRecordMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Champion.ChampionRecordUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("champion")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/champion/jingji_pic_10.png", "res/champion/jingji_pic_11.png", "res/champion/jingji_pic_12.png", "res/champion/jingji_pic_13.png", "res/champion/jingji_pic_16.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Champion.ChampionRecordUI, 1);
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
            this.UIPanel.imgEmpty.visible = false;
            this.UIPanel.listView.visible = false;
            this.setRecord(this.UIOpenData.customObject);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

		/*****
		 *我的战斗记录		PBChampionFightRecord
		 * @param PBChampionFightRecord
		 * 		record			PBChampionFightRecordInfo	记录
		 */
        protected setRecord(value: Pb_God.PBChampionFightRecord): void
        {
            let list = value.record;

            this.UIPanel.imgEmpty.visible = list.length <= 0;
            this.UIPanel.listView.visible = true;

            this.UIPanel.listView.onRefresh(list.length, this, (tempUI: ProUI.Champion.ListItems.RecordItemViewUI, index: number) =>
            {
                let data = list[index];
                tempUI.viewPlayerIconAtk.setPlayerDisplayInfo(data.selfdisplay, false, false);
                tempUI.viewPlayerIconDef.setPlayerDisplayInfo(data.tardisplay, false);
                tempUI.txtNicknameAtk.text = data.selfdisplay.playername;
                tempUI.txtNicknameDef.text = data.tardisplay.playername;
                tempUI.txtScoreChange.text = data.addscore >= 0 ? ("+" + data.addscore) : data.addscore.toString();
                tempUI.imgChangeArrow.frame = data.addscore >= 0 ? 1 : 2;
                tempUI.txtScoreChange.color = data.addscore >= 0 ? "#009e00" : "#e60000";
                tempUI.imgChangeArrow.x = tempUI.txtScoreChange.x + tempUI.txtScoreChange.width;
                // Pb_God._emBattleResult
                tempUI.imgWinAck.visible = data.result == Pb_God._emBattleResult.BattleResult_DefenseSuc || data.result == Pb_God._emBattleResult.BattleResult_Sucess;
                tempUI.imgWinDef.visible = !tempUI.imgWinAck.visible;
                tempUI.txtResult.text = Global.getLangStr("champ_bat_result" + data.result);
                tempUI.txtTime.text = Global.getFullTimeString(data.time * 1000);

                //观看战斗按钮
                tempUI.btnWatch.frequencyClickLock = 2000; //控制按钮频繁点击
                tempUI.btnWatch.onClick(this, () =>
                {
                    VideoSend.playSystem(Pb_God._emVideoType.VideoType_Champion, data.battlesn, 0);
                });

            });
        }
    }
}