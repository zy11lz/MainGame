module Pro
{
    /**
    * 界面说明： 冠军赛-我的竞猜界面
    * @author jason.xu
    */
    export class ChampionMyGuessMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Champion.ChampionMyGuessUI;
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
            this.showPanel(ProUI.Champion.ChampionMyGuessUI, 1);
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
            ChampionSend.guessRecordAsk();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            //data event 
            this.addEventMgr(CmdEvent.Champion_GuessRecordAck, this, this.onGuessRecordAck);
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
		 *我的竞猜记录		PBChampionGuessRecord
		 * @param PBChampionGuessRecord
		 * 		record			PBChampionGuessRecordInfo	记录
		 */
        protected onGuessRecordAck(value: Pb_God.PBChampionGuessRecord): void
        {
            let list = value.record;

            this.UIPanel.imgEmpty.visible = list.length <= 0;
            this.UIPanel.listView.visible = true;
            let hasRecording = value.recording != null && value.recording.leftdisplay != null;;
            //如果有当前正在进行中的竞猜，则在第一个显示， 否则按列表正常显示
            this.UIPanel.listView.onRefresh(list.length, this, (tempUI: ProUI.Champion.ListItems.MyGuessListItemUI, index: number) =>
            {
                //有正在竞猜的
                if (index == 0 && hasRecording)
                {
                    var data = value.recording;

                    tempUI.btnWatch.visible = false;
                    tempUI.imgWinAck.visible = false;
                    tempUI.imgWinDef.visible = false;

                    tempUI.viewPlayerIconAtk.setPlayerDisplayInfo(data.leftdisplay, false);
                    tempUI.viewPlayerIconDef.setPlayerDisplayInfo(data.rightdisplay, false);
                    tempUI.txtNicknameAtk.text = data.leftdisplay.playername;
                    tempUI.txtNicknameDef.text = data.rightdisplay.playername;

                    tempUI.txtRound.text = cfg.ChampionRoundCfgData.getNameByRoundID(data.round || ChampionDataMgr.round);

                    //还未出战斗结果时，显示投注的目标。
                    tempUI.txtContent.text = Global.getLangStr("champ_msg4"); //投注:";
                    tempUI.txtGuessTarget.text = data.leftdisplay.playerid == data.playerid ? data.leftdisplay.playername : data.rightdisplay.playername;
                    tempUI.txtTicketValue.text = data.guesscoin + "";
                    tempUI.txtTicketValue.color = "#573820";
                    tempUI.imgJetton.y = 84;
                } else
                {
                    if (hasRecording) index--; //0号位被另外一个数据占了
                    var recordData = list[index];

                    tempUI.btnWatch.visible = true;
                    tempUI.imgWinAck.visible = true;
                    tempUI.imgWinDef.visible = false;

                    tempUI.viewPlayerIconAtk.setPlayerDisplayInfo(recordData.windisplay, false);
                    tempUI.viewPlayerIconDef.setPlayerDisplayInfo(recordData.faildisplay, false);
                    tempUI.txtNicknameAtk.text = recordData.windisplay.playername;
                    tempUI.txtNicknameDef.text = recordData.faildisplay.playername;

                    tempUI.txtRound.text = cfg.ChampionRoundCfgData.getNameByRoundID(recordData.round || 1);

                    //战斗结束时，显示投注结果， 不显示投注目标昵称。
                    tempUI.txtContent.text = recordData.addguesscoin > 0 ? Global.getLangStr("champ_msg5") : Global.getLangStr("champ_msg6");
                    tempUI.txtTicketValue.text = Math.abs(recordData.addguesscoin) + "";
                    tempUI.txtTicketValue.color = recordData.addguesscoin > 0 ? "#009e00" : "#e60000";
                    tempUI.txtGuessTarget.text = "";
                    tempUI.imgJetton.y = 52;
                    //观看战斗按钮
                    tempUI.btnWatch.frequencyClickLock = 2000; //控制按钮频繁点击
                    tempUI.btnWatch.onClick(this, () =>
                    {
                        VideoSend.playSystem(Pb_God._emVideoType.VideoType_Champion, recordData.battlesn, recordData.windisplay.playerid);
                    });
                }
            });
        }
    }
}